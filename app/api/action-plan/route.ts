import { NextResponse } from "next/server";
import { generateActionPlan } from "@/lib/eligibility/action-plan-builder";
import { SchemeMatchResult } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const matches: SchemeMatchResult[] = body.matches;
    const userFullName: string = body.userFullName || "Beneficiary";

    if (!matches || matches.length === 0) {
      return NextResponse.json(
        { success: false, error: "Requires at least one scheme match result" },
        { status: 400 }
      );
    }

    const actionPlan = generateActionPlan(matches, userFullName);

    return NextResponse.json({
      success: true,
      data: actionPlan
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to generate action plan" },
      { status: 500 }
    );
  }
}
