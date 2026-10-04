import { NextResponse } from "next/server";
import { CURATED_SCHEMES } from "@/lib/data/curated-schemes";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const scheme = CURATED_SCHEMES.find(s => s.id === params.id);
  if (!scheme) {
    return NextResponse.json({ success: false, error: "Scheme not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: scheme });
}
