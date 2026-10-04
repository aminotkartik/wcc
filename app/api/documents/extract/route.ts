import { NextResponse } from "next/server";
import { extractDocumentFacts } from "@/lib/ai/document-extractor";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileName, fileType, rawHint } = body;

    if (!fileName) {
      return NextResponse.json(
        { success: false, error: "fileName is required" },
        { status: 400 }
      );
    }

    const extracted = extractDocumentFacts(fileName, fileType || "application/pdf", rawHint);

    return NextResponse.json({
      success: true,
      data: extracted
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to extract document" },
      { status: 500 }
    );
  }
}
