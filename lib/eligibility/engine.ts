import { Scheme, UserProfile, ExtractedDocumentFact, SchemeMatchResult, SchemeCriterion } from "../types";
import { CURATED_SCHEMES } from "../data/curated-schemes";

/**
 * Deterministic criterion evaluation.
 * Code handles numeric comparisons, sets, booleans, and string constraints.
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
 * Maps verified document types from user's extracted documents
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
 * Cross-references profile claims with document facts (e.g. income in profile vs income on certificate)
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
        incomeEvidenceSnippet = `Document Verified: Income certificate confirms annual income ₹${docIncome.toLocaleString("en-IN")}, issued by ${doc.extractedFields.issuingAuthority || "Competent Authority"} on ${doc.extractedFields.issueDate || "recent date"}.`;
      }
    }
    if (doc.documentType === "aadhaar_card") {
      aadhaarVerified = true;
    }
  }

  return { reconciledIncome, incomeEvidenceSnippet, aadhaarVerified };
}

/**
 * Evaluates a single scheme against a user profile and their verified documents.
 */
export function evaluateSchemeEligibility(
  scheme: Scheme,
  user: UserProfile,
  documents: ExtractedDocumentFact[] = []
): SchemeMatchResult {
  const { reconciledIncome, incomeEvidenceSnippet } = reconcileFacts(user, documents);
  const activeUser = { ...user, annualIncome: reconciledIncome };

  const matchedCriteria: Array<{ label: string; userValue: any; requiredValue: any }> = [];
  const unmetCriteria: Array<{ label: string; userValue: any; requiredValue: any }> = [];
  const uncertainCriteria: Array<{ label: string; reason: string }> = [];

  // Regional eligibility pre-check
  if (scheme.region !== "All India" && scheme.region.toLowerCase() !== user.state.toLowerCase()) {
    unmetCriteria.push({
      label: `State Residency Requirement (${scheme.region})`,
      userValue: user.state,
      requiredValue: scheme.region
    });
  }

  // Evaluate each criterion
  for (const crit of scheme.eligibilityCriteria) {
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

  for (const reqDoc of scheme.requiredDocuments) {
    if (verifiedDocTypes.has(reqDoc.id.toLowerCase())) {
      verifiedDocIds.push(reqDoc.name);
    } else {
      missingDocs.push(reqDoc);
    }
  }

  // Deterministic Scoring
  const totalCriteria = scheme.eligibilityCriteria.length + (scheme.region !== "All India" ? 1 : 0);
  const passedCriteriaCount = matchedCriteria.length;
  const unmetCount = unmetCriteria.length;

  let baseScore = 0;
  if (unmetCount > 0) {
    // If mandatory criteria fail
    baseScore = Math.max(10, Math.round((passedCriteriaCount / (totalCriteria + 1)) * 40));
  } else {
    // Exact jurisdiction specificity boost (local state welfare gets +8 points when matching domiciled citizen)
    const stateSpecificityBoost = scheme.region !== "All India" && scheme.region.toLowerCase() === user.state.toLowerCase() ? 8 : 0;
    // Category specificity boost (e.g. SC specific schemes when user is SC)
    const categorySpecificityBoost = scheme.eligibilityCriteria.some(c => c.field === "category" && c.value === user.category) ? 6 : 0;

    const critRatio = passedCriteriaCount / totalCriteria;
    baseScore = Math.round(60 + critRatio * 25 + stateSpecificityBoost + categorySpecificityBoost);
  }

  // Document readiness bonus/penalty (+5 points if critical docs already uploaded)
  if (verifiedDocIds.length > 0 && unmetCount === 0) {
    baseScore = Math.min(99, baseScore + Math.round((verifiedDocIds.length / scheme.requiredDocuments.length) * 5));
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
  evidenceSnippets.push(`Program Source: ${scheme.sourceMinistry} (Registry Verified ${scheme.lastVerifiedDate})`);
  if (scheme.importantNotes && scheme.importantNotes.length > 0) {
    evidenceSnippets.push(`Policy Caveat: ${scheme.importantNotes[0]}`);
  }

  // Reasoning summary
  let reasoningSummary = "";
  if (status === "likely_eligible") {
    reasoningSummary = `You satisfy all ${matchedCriteria.length} primary eligibility conditions for ${scheme.name}. ` +
      (missingDocs.length > 0
        ? `However, ${missingDocs.length} required application document(s) (${missingDocs.map(d => d.name).join(", ")}) still need to be gathered.`
        : `All required verification proofs are accounted for.`);
  } else if (status === "borderline") {
    reasoningSummary = `You meet several criteria (${matchedCriteria.length} satisfied), but ${unmetCriteria[0]?.label || "one key requirement"} requires adjustment or exemption check.`;
  } else {
    reasoningSummary = `Currently does not match due to unmet constraints: ${unmetCriteria.map(u => u.label).join("; ")}.`;
  }

  return {
    schemeId: scheme.id,
    schemeName: scheme.name,
    category: scheme.category,
    benefitAmount: scheme.benefitAmount,
    benefitType: scheme.benefitType,
    region: scheme.region,
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
    applicationUrl: scheme.applicationUrl,
    sourceMinistry: scheme.sourceMinistry,
    lastVerifiedDate: scheme.lastVerifiedDate
  };
}

/**
 * Runs eligibility assessment across all schemes in repository
 */
export function assessAllSchemes(
  user: UserProfile,
  documents: ExtractedDocumentFact[] = []
): SchemeMatchResult[] {
  const results = CURATED_SCHEMES.map(scheme => evaluateSchemeEligibility(scheme, user, documents));
  // Sort by matchScore descending, then by status
  return results.sort((a, b) => b.matchScore - a.matchScore);
}
