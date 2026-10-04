import { NextResponse } from "next/server";
import { parseNaturalLanguageProfile } from "@/lib/ai/prompts";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid 'text' prompt field." },
        { status: 400 }
      );
    }

    const { profile, source } = await parseNaturalLanguageProfile(text);

    return NextResponse.json({
      success: true,
      source,
      profile
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to parse natural language profile" },
      { status: 500 }
    );
  }
}
