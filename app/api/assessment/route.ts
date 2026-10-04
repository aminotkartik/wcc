import { NextResponse } from "next/server";
import { assessAllSchemes } from "@/lib/eligibility/engine";
import { generateNaturalExplanation } from "@/lib/ai/prompts";
import { UserProfile, ExtractedDocumentFact } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const profile: UserProfile = body.profile;
    const documents: ExtractedDocumentFact[] = body.documents || [];

    if (!profile || !profile.fullName || profile.age === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required profile fields (fullName, age, state)" },
        { status: 400 }
      );
    }

    // Run deterministic rules engine
    const rawMatches = assessAllSchemes(profile, documents);

    // Augment with explainability summaries
    const enrichedMatches = rawMatches.map(m => ({
      ...m,
      aiExplanation: generateNaturalExplanation(profile, m)
    }));

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      profileSummary: {
        name: profile.fullName,
        age: profile.age,
        state: profile.state,
        income: profile.annualIncome,
        occupation: profile.occupation
      },
      totalEvaluated: enrichedMatches.length,
      highConfidenceMatches: enrichedMatches.filter(m => m.status === "likely_eligible").length,
      results: enrichedMatches
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process assessment" },
      { status: 500 }
    );
  }
}
