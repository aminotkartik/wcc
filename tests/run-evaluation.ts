import { assessAllPrograms } from "../lib/eligibility/engine";
import { UNIVERSAL_PROGRAMS, DEMO_PERSONAS } from "../lib/data/curated-schemes";
import { generateActionPlan } from "../lib/eligibility/action-plan-builder";
import { extractDocumentFacts } from "../lib/ai/document-extractor";

interface EvaluationCase {
  id: string;
  description: string;
  personaIndex: number;
  expectedTopSchemeId: string;
  expectedMinScore: number;
  expectedMissingDocsCount: number;
  expectedStatus: "likely_eligible" | "borderline" | "unlikely";
}

const EVALUATION_TEST_CASES: EvaluationCase[] = [
  {
    id: "TC-01",
    description: "Maharashtra B.Tech student with ₹2.4L income qualifies for Higher Degree Scholarship",
    personaIndex: 0,
    expectedTopSchemeId: "prog_002",
    expectedMinScore: 85,
    expectedMissingDocsCount: 1,
    expectedStatus: "likely_eligible"
  },
  {
    id: "TC-02",
    description: "Karnataka rural college scholar qualifies for Karnataka Vidyasiri Welfare Grant",
    personaIndex: 1,
    expectedTopSchemeId: "prog_009",
    expectedMinScore: 75,
    expectedMissingDocsCount: 2,
    expectedStatus: "likely_eligible"
  },
  {
    id: "TC-03",
    description: "Maharashtra SC Master's student qualifies for Swadhar Social Justice Welfare Scheme",
    personaIndex: 2,
    expectedTopSchemeId: "prog_010",
    expectedMinScore: 85,
    expectedMissingDocsCount: 2,
    expectedStatus: "likely_eligible"
  },
  {
    id: "TC-04",
    description: "Self-employed micro youth artisan qualifies for PM SVANidhi Subsidy & Micro-Credit",
    personaIndex: 3,
    expectedTopSchemeId: "prog_007",
    expectedMinScore: 80,
    expectedMissingDocsCount: 1,
    expectedStatus: "likely_eligible"
  },
  {
    id: "TC-05",
    description: "Smallholder farmer matches PM-KISAN Direct Farmer Income Support Grant",
    personaIndex: 4,
    expectedTopSchemeId: "prog_006",
    expectedMinScore: 80,
    expectedMissingDocsCount: 3,
    expectedStatus: "likely_eligible"
  }
];

export function runFullEvaluation() {
  let passed = 0;
  const total = EVALUATION_TEST_CASES.length;

  for (const tc of EVALUATION_TEST_CASES) {
    const persona = DEMO_PERSONAS[tc.personaIndex];
    const results = assessAllPrograms(persona.profile, persona.sampleExtractedDocs);
    const topResult = results[0];

    const matchSchemeOk = topResult.schemeId === tc.expectedTopSchemeId;
    const scoreOk = topResult.matchScore >= tc.expectedMinScore;
    const statusOk = topResult.status === tc.expectedStatus;

    if (matchSchemeOk && scoreOk && statusOk) {
      passed++;
    }
  }

  const incomeExtracted = extractDocumentFacts("Tahsildar_Income_Cert.pdf", "application/pdf");
  const incomeOk = incomeExtracted.documentType === "income_certificate" && incomeExtracted.confidence >= 0.9;

  const testResults = assessAllPrograms(DEMO_PERSONAS[0].profile, DEMO_PERSONAS[0].sampleExtractedDocs);
  const plan = generateActionPlan(testResults, "Aarav Sharma");
  const planOk = plan.steps.length >= 4 && plan.overallReadinessScore > 50;

  return { passed, total, planOk, incomeOk };
}
