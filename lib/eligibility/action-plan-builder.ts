import { SchemeMatchResult, CivicFlowActionPlan, ActionPlanStep } from "../types";

export function generateActionPlan(
  topMatches: SchemeMatchResult[],
  userFullName: string
): CivicFlowActionPlan {
  const eligibleMatches = topMatches.filter(m => m.status === "likely_eligible");
  const primaryScheme = eligibleMatches.length > 0 ? eligibleMatches[0] : topMatches[0];

  const steps: ActionPlanStep[] = [];
  let stepCounter = 1;

  // Step 1: Profile Verification
  steps.push({
    id: `step_${stepCounter}`,
    order: stepCounter++,
    title: "Verify Core Eligibility Claims",
    description: `Review your stated profile parameters (State: ${primaryScheme.region}, Income threshold, and Academic/Occupational status) against official ministry guidelines.`,
    category: "VERIFICATION",
    status: "completed",
    estimatedMinutes: 5
  });

  // Step 2: Critical Document Collection (Gather missing documents)
  if (primaryScheme.missingDocuments && primaryScheme.missingDocuments.length > 0) {
    for (const missingDoc of primaryScheme.missingDocuments) {
      steps.push({
        id: `step_${stepCounter}`,
        order: stepCounter++,
        title: `Obtain & Digitize: ${missingDoc.name}`,
        description: `${missingDoc.description}. Ensure this document is official, clearly legible, and under 2MB in PDF/JPEG format.`,
        category: "DOCUMENT_PREP",
        status: "pending",
        estimatedMinutes: 30,
        deadlineWarning: "Obtain before application portal window closing"
      });
    }
  }

  // Step 3: Verified Credentials Review
  if (primaryScheme.verifiedDocuments && primaryScheme.verifiedDocuments.length > 0) {
    steps.push({
      id: `step_${stepCounter}`,
      order: stepCounter++,
      title: `Audit Already Verified Documents (${primaryScheme.verifiedDocuments.join(", ")})`,
      description: "Ensure names, dates of birth, and father's/mother's names match across all certificates exactly without spelling variations.",
      category: "VERIFICATION",
      status: "in_progress",
      estimatedMinutes: 10
    });
  }

  // Step 4: Submission on Official Ministry Portal
  steps.push({
    id: `step_${stepCounter}`,
    order: stepCounter++,
    title: `Submit Online Application on Official Portal`,
    description: `Navigate to ${primaryScheme.sourceMinistry}'s authorized portal. Create your applicant login, complete form fields, and upload all digitized attachments.`,
    category: "ONLINE_APPLICATION",
    status: "pending",
    officialLink: primaryScheme.applicationUrl,
    estimatedMinutes: 25
  });

  // Step 5: Save Acknowledgement & Tracking
  steps.push({
    id: `step_${stepCounter}`,
    order: stepCounter++,
    title: "Download Acknowledgement Receipt & Note Tracking Application ID",
    description: "Save the PDF submission receipt and note the official Application Reference Number for college scrutiny or DBT status tracking.",
    category: "TRACKING",
    status: "pending",
    estimatedMinutes: 5
  });

  // Calculate readiness score
  const totalRequiredDocs = (primaryScheme.verifiedDocuments?.length || 0) + (primaryScheme.missingDocuments?.length || 0);
  const verifiedCount = primaryScheme.verifiedDocuments?.length || 0;
  const docReadiness = totalRequiredDocs > 0 ? Math.round((verifiedCount / totalRequiredDocs) * 100) : 70;

  return {
    id: `plan_${Date.now()}`,
    profileSummary: `Assessment Plan prepared for ${userFullName || "Beneficiary"}`,
    generatedAt: new Date().toISOString(),
    overallReadinessScore: Math.max(25, Math.min(95, docReadiness)),
    topMatchedScheme: primaryScheme.schemeName,
    steps,
    criticalMissingDocuments: (primaryScheme.missingDocuments || []).map(d => d.name),
    disclaimer: "CivicFlow provides an informational eligibility assessment and tactical preparation plan. Final sanction, scholarship disbursement, or subsidy approval is subject to official government scrutiny."
  };
}
