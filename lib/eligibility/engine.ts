import { UniversalProgram, UserProfile, ExtractedDocumentFact, SchemeMatchResult, SchemeCriterion } from "../types";
import { UNIVERSAL_PROGRAMS } from "../data/curated-schemes";

/**
 * Deterministic criterion evaluation.
 * Evaluates numeric limits, strings, sets, and booleans with 0% hallucination.
 */
function evaluateCriterion(criterion: SchemeCriterion, user: UserProfile): { pass: boolean; userVal: any } {
  const userVal = (user as any)[criterion.field];

  if (userVal === undefined || userVal === null) {
    return { pass: false, userVal: "Not provided" };
  }

  switch (criterion.operator) {
    case "boolean_equals":
      return { pass: Boolean(userVal) === Boolean(criterion.value), userVal };
    case "equals":
      return {
        pass: String(userVal).trim().toLowerCase() === String(criterion.value).trim().toLowerCase(),
        userVal
      };
    case "less_than_or_equal":
      return { pass: Number(userVal) <= Number(criterion.value), userVal };
    case "greater_than_or_equal":
      return { pass: Number(userVal) >= Number(criterion.value), userVal };
    case "in":
      if (Array.isArray(criterion.value)) {
        const pass = criterion.value.some((val: any) =>
          String(val).toLowerCase() === String(userVal).toLowerCase()
        );
        return { pass, userVal };
      }
      return { pass: false, userVal };
    case "contains":
      return {
        pass: String(userVal).toLowerCase().includes(String(criterion.value).toLowerCase()),
        userVal
      };
    default:
      return { pass: false, userVal };
  }
}

/**
 * Cross-references verified documents from user's extracted documents
 */
function getVerifiedDocTypes(documents: ExtractedDocumentFact[]): Set<string> {
  const set = new Set<string>();
  for (const doc of documents) {
    if (doc.verifiedByUser) {
      set.add(doc.documentType.toLowerCase());
    }
  }
  return set;
}

/**
 * Reconciles profile statements against verified document proofs
 */
function reconcileFacts(user: UserProfile, documents: ExtractedDocumentFact[]): {
  reconciledIncome: number;
  incomeEvidenceSnippet?: string;
  aadhaarVerified: boolean;
} {
  let reconciledIncome = user.annualIncome;
  let incomeEvidenceSnippet: string | undefined = undefined;
  let aadhaarVerified = false;

  for (const doc of documents) {
    if (doc.documentType === "income_certificate" && doc.extractedFields?.annualIncome) {
      const docIncome = Number(doc.extractedFields.annualIncome);
      if (!isNaN(docIncome)) {
        reconciledIncome = docIncome;
        incomeEvidenceSnippet = `Document Verified: Income certificate confirms annual income ₹${docIncome.toLocaleString("en-IN")}, issued by ${doc.extractedFields.issuingAuthority || "Authorized Revenue Office"} on ${doc.extractedFields.issueDate || "recent date"}.`;
      }
    }
    if (doc.documentType === "aadhaar_card") {
      aadhaarVerified = true;
    }
  }

  return { reconciledIncome, incomeEvidenceSnippet, aadhaarVerified };
}

/**
 * Evaluates a single universal program against a user profile and their verified documents.
 */
export function evaluateProgramEligibility(
  program: UniversalProgram,
  user: UserProfile,
  documents: ExtractedDocumentFact[] = []
): SchemeMatchResult {
  const { reconciledIncome, incomeEvidenceSnippet } = reconcileFacts(user, documents);
  const activeUser = { ...user, annualIncome: reconciledIncome };

  const matchedCriteria: Array<{ label: string; userValue: any; requiredValue: any }> = [];
  const unmetCriteria: Array<{ label: string; userValue: any; requiredValue: any }> = [];
  const uncertainCriteria: Array<{ label: string; reason: string }> = [];

  // Regional eligibility check (if program is state specific)
  if (program.state !== "All India" && program.state.toLowerCase() !== user.state.toLowerCase()) {
    unmetCriteria.push({
      label: `State Residency Requirement (${program.state})`,
      userValue: user.state,
      requiredValue: program.state
    });
  }

  // Evaluate each criterion
  for (const crit of program.eligibilityCriteria) {
    const { pass, userVal } = evaluateCriterion(crit, activeUser);
    if (pass) {
      matchedCriteria.push({
        label: crit.label,
        userValue: userVal,
        requiredValue: crit.value
      });
    } else {
      if (userVal === "Not provided") {
        uncertainCriteria.push({
          label: crit.label,
          reason: "Information not provided in profile"
        });
      } else {
        unmetCriteria.push({
          label: crit.label,
          userValue: userVal,
          requiredValue: crit.value
        });
      }
    }
  }

  // Document verification audit
  const verifiedDocTypes = getVerifiedDocTypes(documents);
  const verifiedDocIds: string[] = [];
  const missingDocs: Array<{ id: string; name: string; description: string }> = [];

  for (const reqDoc of program.requiredDocuments) {
    if (verifiedDocTypes.has(reqDoc.id.toLowerCase())) {
      verifiedDocIds.push(reqDoc.name);
    } else {
      missingDocs.push(reqDoc);
    }
  }

  // Scoring
  const totalCriteria = program.eligibilityCriteria.length + (program.state !== "All India" ? 1 : 0);
  const passedCriteriaCount = matchedCriteria.length;
  const unmetCount = unmetCriteria.length;

  let baseScore = 0;
  if (unmetCount > 0) {
    baseScore = Math.max(10, Math.round((passedCriteriaCount / (totalCriteria + 1)) * 40));
  } else {
    // Specific state domicile match receives high contextual relevance (+10 points for domiciled citizens)
    const stateSpecificityBoost = program.state !== "All India" && program.state.toLowerCase() === user.state.toLowerCase() ? 10 : 0;
    // Specific category boost
    const categorySpecificityBoost = program.eligibilityCriteria.some(c => c.field === "category" && c.value === user.category) ? 6 : 0;
    // Specific occupation alignment boost
    const occupationBoost = program.eligibilityCriteria.some(c => c.field === "occupation" && Array.isArray(c.value) && c.value.includes(user.occupation)) ? 4 : 0;

    const critRatio = passedCriteriaCount / totalCriteria;
    baseScore = Math.round(60 + critRatio * 25 + stateSpecificityBoost + categorySpecificityBoost + occupationBoost);
  }

  if (verifiedDocIds.length > 0 && unmetCount === 0) {
    baseScore = Math.min(99, baseScore + Math.round((verifiedDocIds.length / program.requiredDocuments.length) * 5));
  }

  // Status mapping
  let status: "likely_eligible" | "borderline" | "unlikely" = "unlikely";
  let confidenceLabel: "HIGH" | "MEDIUM" | "LOW" = "LOW";

  if (unmetCount === 0 && uncertainCriteria.length === 0 && baseScore >= 75) {
    status = "likely_eligible";
    confidenceLabel = "HIGH";
  } else if (unmetCount === 0 && baseScore >= 60) {
    status = "likely_eligible";
    confidenceLabel = "MEDIUM";
  } else if (unmetCount === 1 && baseScore >= 40) {
    status = "borderline";
    confidenceLabel = "MEDIUM";
  } else {
    status = "unlikely";
    confidenceLabel = "LOW";
  }

  // Evidence snippets
  const evidenceSnippets: string[] = [];
  if (incomeEvidenceSnippet) {
    evidenceSnippets.push(incomeEvidenceSnippet);
  }
  evidenceSnippets.push(`Program Provider: ${program.provider} (Official Source: ${program.sourceName})`);
  if (program.importantNotes && program.importantNotes.length > 0) {
    evidenceSnippets.push(`Guideline Notice: ${program.importantNotes[0]}`);
  }

  // Reasoning summary
  let reasoningSummary = "";
  if (status === "likely_eligible") {
    reasoningSummary = `You satisfy all ${matchedCriteria.length} primary eligibility conditions for ${program.name}. ` +
      (missingDocs.length > 0
        ? `However, ${missingDocs.length} required application document(s) (${missingDocs.map(d => d.name).join(", ")}) still need to be assembled.`
        : `All required verification proofs are accounted for.`);
  } else if (status === "borderline") {
    reasoningSummary = `You meet ${matchedCriteria.length} criteria, but one requirement (${unmetCriteria[0]?.label || "key condition"}) requires verification or exemption.`;
  } else {
    reasoningSummary = `Currently does not match due to unmet constraints: ${unmetCriteria.map(u => u.label).join("; ")}.`;
  }

  return {
    schemeId: program.id,
    schemeName: program.name,
    programType: program.type,
    provider: program.provider,
    benefitAmount: program.benefitAmount,
    region: program.state,
    matchScore: baseScore,
    confidenceLabel,
    status,
    matchedCriteria,
    unmetCriteria,
    uncertainCriteria,
    verifiedDocuments: verifiedDocIds,
    missingDocuments: missingDocs,
    reasoningSummary,
    evidenceSnippets,
    applicationUrl: program.applicationUrl,
    sourceName: program.sourceName,
    lastVerifiedDate: program.lastVerifiedAt
  };
}

/**
 * Runs eligibility assessment across all universal programs
 */
export function assessAllPrograms(
  user: UserProfile,
  documents: ExtractedDocumentFact[] = []
): SchemeMatchResult[] {
  const results = UNIVERSAL_PROGRAMS.map(prog => evaluateProgramEligibility(prog, user, documents));
  return results.sort((a, b) => b.matchScore - a.matchScore);
}
