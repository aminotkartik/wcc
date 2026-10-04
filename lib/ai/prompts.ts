import { UserProfile, SchemeMatchResult } from "../types";

export const PROMPTS = {
  profileNormalizer: `
You are the CivicFlow Profile Normalizer.
Given messy, unstructured user conversational answers or form fragments, convert the information into a strict, validated JSON user profile.
Schema required:
{
  "fullName": string,
  "age": number,
  "state": string,
  "occupation": string,
  "studentStatus": boolean,
  "educationLevel": string,
  "course": string,
  "annualIncome": number,
  "category": string
}
Rule: Never invent values not supported by user context. When uncertain, mark as null or reasonable defaults.
  `,

  documentExtractor: `
You are the CivicFlow Safe Document Extractor.
Extract only visible and verifiable facts from the provided government/educational document text or image.
Rules:
1. Never invent values.
2. Maintain strict distinction between verified dates vs guesses.
3. Output confidence score (0.00 to 1.00).
4. Identify any discrepancies between claimed name and document name.
  `,

  eligibilityReasoner: `
You are the CivicFlow Eligibility Reasoner.
Compare the normalized user profile and verified document facts against official scheme criteria.
You must NOT override deterministic rule criteria (e.g., if income exceeds the threshold, you cannot declare it eligible).
Provide clear, transparent, evidence-backed justification in plain language.
Never guarantee government approval; use "likely eligible", "borderline", or "unmet requirements".
  `,

  actionPlanGenerator: `
You are the CivicFlow Tactical Action Plan Architect.
Convert verified eligibility results and missing document lists into a 4 to 5 step sequential checklist.
Order of operations:
1. Verify profile credentials.
2. Procure missing required certificates.
3. Inspect verified documents for alignment.
4. Apply on the official authorized portal.
5. Track application reference ID.
  `
};

/**
 * Generates an LLM-grade natural language explanation summarizing why
 * the user matched this specific scheme, grounded in facts.
 */
export function generateNaturalExplanation(
  user: UserProfile,
  match: SchemeMatchResult
): string {
  if (match.status === "likely_eligible") {
    const matchedList = match.matchedCriteria.map(c => c.label).join(", ");
    let text = `You strongly match ${match.schemeName} because your stated parameters satisfy the core criteria: ${matchedList}. `;
    if (match.missingDocuments.length > 0) {
      text += `Before applying via the official portal, make sure to obtain the missing ${match.missingDocuments.map(d => d.name).join(" and ")}.`;
    } else {
      text += `You have all essential verification documents ready to proceed directly to the portal.`;
    }
    return text;
  }

  if (match.status === "borderline") {
    return `You satisfy ${match.matchedCriteria.length} conditions, but have an unmet condition: ${match.unmetCriteria.map(u => u.label).join(", ")}. Review whether you qualify for standard category exemptions.`;
  }

  return `Currently ineligible because key requirements were not met: ${match.unmetCriteria.map(u => u.label).join("; ")}.`;
}
