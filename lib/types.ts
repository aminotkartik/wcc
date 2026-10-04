export type ProgramType =
  | "Scholarship"
  | "Fellowship"
  | "Grant"
  | "Subsidy"
  | "Welfare Scheme"
  | "Skill Program"
  | "Entrepreneurship";

export interface UserProfile {
  id?: string;
  fullName: string;
  age: number;
  gender?: string;
  state: string; // e.g. "Maharashtra", "Karnataka", "Delhi", "All India"
  occupation: string; // "Student", "Self-Employed", "Farmer", "Unemployed", "Salaried Professional", "Artisan"
  studentStatus: boolean;
  educationLevel: string; // "Undergraduate", "Postgraduate", "High School", "Diploma", "None/Basic"
  course?: string; // e.g. "Engineering", "Arts", "Medicine", "Skill Diploma"
  institutionType?: string;
  annualIncome: number; // in INR e.g. 240000
  category?: string; // "General", "General / EWS", "OBC", "SC", "ST"
  goalOrNeed?: string; // e.g. "Tuition waiver", "Seed capital loan", "Skill stipend"
  disabilityStatus?: boolean;
  minorityStatus?: boolean;
  ruralArea?: boolean;
}

export interface ExtractedDocumentFact {
  documentType: string;
  fileName: string;
  confidence: number;
  extractedFields: Record<string, any>;
  verifiedByUser: boolean;
  uploadedAt: string;
}

export type CriterionOperator =
  | "equals"
  | "less_than_or_equal"
  | "greater_than_or_equal"
  | "in"
  | "contains"
  | "boolean_equals";

export interface SchemeCriterion {
  field: string;
  operator: CriterionOperator;
  value: any;
  label: string;
  mandatory: boolean;
}

export interface UniversalProgram {
  id: string;
  name: string;
  type: ProgramType;
  provider: string; // Ministry, Foundation, or Department
  country: string; // "India"
  state: string; // Specific State or "All India"
  description: string;
  targetUsers: string;
  benefitAmount: string;
  benefitDescription: string;
  eligibilityCriteria: SchemeCriterion[];
  requiredDocuments: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  applicationProcess: "Online Portal" | "Direct Benefit Transfer (DBT)" | "University Desk" | "Common Service Center (CSC)";
  applicationUrl: string;
  sourceUrl: string;
  sourceName: string;
  lastVerifiedAt: string;
  status: "Active" | "Upcoming";
  importantNotes?: string[];
}

export interface SchemeMatchResult {
  schemeId: string;
  schemeName: string;
  programType: ProgramType;
  provider: string;
  benefitAmount: string;
  region: string;
  matchScore: number; // 0 - 100
  confidenceLabel: "HIGH" | "MEDIUM" | "LOW";
  status: "likely_eligible" | "borderline" | "unlikely";
  matchedCriteria: Array<{ label: string; userValue: any; requiredValue: any }>;
  unmetCriteria: Array<{ label: string; userValue: any; requiredValue: any }>;
  uncertainCriteria: Array<{ label: string; reason: string }>;
  verifiedDocuments: string[];
  missingDocuments: Array<{ id: string; name: string; description: string }>;
  reasoningSummary: string;
  aiExplanation?: string;
  evidenceSnippets: string[];
  applicationUrl: string;
  sourceName: string;
  lastVerifiedDate: string;
}

export interface ActionPlanStep {
  id: string;
  order: number;
  title: string;
  description: string;
  category: "DOCUMENT_PREP" | "VERIFICATION" | "ONLINE_APPLICATION" | "TRACKING";
  status: "pending" | "in_progress" | "completed";
  estimatedMinutes?: number;
  officialLink?: string;
  deadlineWarning?: string;
}

export interface CivicFlowActionPlan {
  id: string;
  profileSummary: string;
  generatedAt: string;
  overallReadinessScore: number;
  topMatchedScheme: string;
  topProgramType: ProgramType;
  steps: ActionPlanStep[];
  criticalMissingDocuments: string[];
  disclaimer: string;
}
