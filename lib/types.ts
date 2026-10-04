export interface UserProfile {
  id?: string;
  fullName: string;
  age: number;
  gender?: string;
  state: string; // e.g. "Maharashtra", "Karnataka", "All India"
  occupation: string; // "Student", "Self-Employed", "Farmer", "Unemployed", "Salaried"
  studentStatus: boolean;
  educationLevel: string; // "Undergraduate", "Postgraduate", "High School", "Diploma"
  course?: string; // e.g. "B.Tech Engineering", "Arts", "Medicine"
  institutionType?: string; // "Government", "Private Recognized", "Autonomous"
  annualIncome: number; // in INR e.g. 240000
  category?: string; // "General", "OBC", "SC", "ST", "EWS"
  disabilityStatus?: boolean;
  minorityStatus?: boolean;
  ruralArea?: boolean;
}

export interface ExtractedDocumentFact {
  documentType: string; // "income_certificate", "student_id", "aadhaar_card", "caste_certificate", "bonafide_certificate"
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

export interface Scheme {
  id: string;
  name: string;
  category: "Education & Scholarships" | "Skill & Employment" | "Agriculture & Rural" | "Social Welfare" | "Entrepreneurship";
  shortDescription: string;
  fullDescription: string;
  benefitAmount: string;
  benefitType: "Direct Financial Grant" | "Tuition Fee Waiver" | "Subsidized Loan" | "Monthly Stipend" | "Skill Voucher";
  targetAudience: string;
  region: string; // State or "All India"
  eligibilityCriteria: SchemeCriterion[];
  requiredDocuments: Array<{
    id: string;
    name: string;
    description: string;
    sampleHint?: string;
  }>;
  applicationMethod: "Online Portal" | "Direct Benefit Transfer (DBT)" | "University Desk" | "Common Service Center (CSC)";
  applicationUrl: string;
  sourceMinistry: string;
  lastVerifiedDate: string;
  isDemoReference: boolean;
  importantNotes?: string[];
}

export interface SchemeMatchResult {
  schemeId: string;
  schemeName: string;
  category: string;
  benefitAmount: string;
  benefitType: string;
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
  evidenceSnippets: string[];
  applicationUrl: string;
  sourceMinistry: string;
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
  overallReadinessScore: number; // e.g. 78%
  topMatchedScheme: string;
  steps: ActionPlanStep[];
  criticalMissingDocuments: string[];
  disclaimer: string;
}
