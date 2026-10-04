import { UserProfile, SchemeMatchResult } from "../types";
import { callGroqChat } from "./groq";

export const PROMPTS = {
  profileParser: `
You are the CivicFlow Universal Profile Understanding AI.
Given a user's natural language self-description, extract their structured profile fields into a strict JSON object.
Output JSON schema:
{
  "fullName": string,
  "age": number,
  "state": string,
  "occupation": string, // "Student", "Self-Employed", "Farmer", "Unemployed", "Salaried Professional", "Artisan"
  "studentStatus": boolean,
  "educationLevel": string, // "Undergraduate", "Postgraduate", "High School", "Diploma", "None/Basic"
  "course": string,
  "annualIncome": number,
  "category": string, // "General", "General / EWS", "OBC", "SC", "ST"
  "goalOrNeed": string // e.g. "Tuition waiver", "Seed capital loan", "Skill stipend", "Farmer grant"
}

Rules:
1. Never fabricate details not stated or reasonably inferred.
2. If annual income is mentioned in Lakhs (e.g. "2.4 lakh" or "2.4L"), convert to integer INR (240000).
3. If age is unspecified, default to 21.
4. Output ONLY valid JSON, no markdown backticks.
  `,

  explanationGenerator: `
You are the CivicFlow Evidence & Explanation Generator.
Given a user's verified facts and a public program (scholarship, grant, subsidy, fellowship, or welfare scheme) that they match, explain why they qualify, what is verified, what documents are missing, and what to do next.
Rules:
1. Never guarantee government approval or sanction; always use "potentially eligible" or "appears to satisfy".
2. Cite the exact provider and ground truth.
3. Keep the tone warm, empowering, and precise.
  `
};

/**
 * Uses Groq to parse natural-language statements into structured profiles
 */
export async function parseNaturalLanguageProfile(
  rawText: string
): Promise<{ profile: Partial<UserProfile>; source: "groq" | "fallback" }> {
  const result = await callGroqChat(
    [
      { role: "system", content: PROMPTS.profileParser },
      { role: "user", content: `User description:\n"${rawText}"` }
    ],
    { jsonMode: true }
  );

  if (result.success && result.content) {
    try {
      const parsed = JSON.parse(result.content);
      return { profile: parsed, source: "groq" };
    } catch {
      // Fall through to deterministic heuristics
    }
  }

  // Graceful rule-based heuristic extraction if Groq is offline or key unset
  const lower = rawText.toLowerCase();
  const parsedFallback: Partial<UserProfile> = {
    fullName: "Applicant",
    age: 21,
    studentStatus: lower.includes("student") || lower.includes("college") || lower.includes("study") || lower.includes("engineering"),
    occupation: lower.includes("farmer") ? "Farmer" : lower.includes("business") || lower.includes("self") ? "Self-Employed" : lower.includes("student") ? "Student" : "Student",
    educationLevel: lower.includes("master") || lower.includes("m.sc") || lower.includes("postgrad") ? "Postgraduate" : "Undergraduate",
    course: lower.includes("engineering") ? "Engineering" : lower.includes("biotech") ? "Biotechnology" : "Higher Education",
    state: lower.includes("karnataka") ? "Karnataka" : lower.includes("pune") || lower.includes("maharashtra") ? "Maharashtra" : "All India",
    annualIncome: lower.includes("2.5") || lower.includes("2.4") ? 240000 : lower.includes("1.8") ? 180000 : 250000,
    category: lower.includes("sc") ? "SC" : lower.includes("obc") ? "OBC" : "General / EWS",
    goalOrNeed: lower.includes("loan") ? "Working capital loan" : lower.includes("farmer") ? "Farm grant" : "Financial assistance"
  };

  return { profile: parsedFallback, source: "fallback" };
}

/**
 * Generates an evidence-backed explanation grounded in retrieved facts
 */
export function generateNaturalExplanation(
  user: UserProfile,
  match: SchemeMatchResult
): string {
  if (match.status === "likely_eligible") {
    const matchedList = match.matchedCriteria.map(c => c.label).join(", ");
    let text = `You satisfy the core criteria for ${match.schemeName} (${match.programType}): ${matchedList}. `;
    if (match.missingDocuments.length > 0) {
      text += `Before submitting through ${match.sourceName}, secure the missing ${match.missingDocuments.map(d => d.name).join(" and ")}.`;
    } else {
      text += `All essential verification documents are already attached to proceed directly to application.`;
    }
    return text;
  }

  if (match.status === "borderline") {
    return `You meet ${match.matchedCriteria.length} conditions, but have an unverified condition: ${match.unmetCriteria.map(u => u.label).join(", ")}. Review whether you qualify for standard category exemptions.`;
  }

  return `Currently ineligible because key requirements were not met: ${match.unmetCriteria.map(u => u.label).join("; ")}.`;
}
