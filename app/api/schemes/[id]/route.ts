import { NextResponse } from "next/server";
import { UNIVERSAL_PROGRAMS } from "@/lib/data/curated-schemes";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const program = UNIVERSAL_PROGRAMS.find(p => p.id === params.id);
  if (!program) {
    return NextResponse.json({ success: false, error: "Program not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: program });
}
