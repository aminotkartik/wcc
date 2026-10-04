import { NextResponse } from "next/server";
import { UNIVERSAL_PROGRAMS } from "@/lib/data/curated-schemes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const state = searchParams.get("state");
  const search = searchParams.get("q");

  let filtered = [...UNIVERSAL_PROGRAMS];

  if (type && type !== "all") {
    filtered = filtered.filter(p => p.type.toLowerCase() === type.toLowerCase());
  }

  if (state && state !== "all") {
    filtered = filtered.filter(p => p.state.toLowerCase() === state.toLowerCase() || p.state === "All India");
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.targetUsers.toLowerCase().includes(q) ||
      p.provider.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered
  });
}
