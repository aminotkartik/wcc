import { NextResponse } from "next/server";
import { CURATED_SCHEMES } from "@/lib/data/curated-schemes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const state = searchParams.get("state");
  const search = searchParams.get("q");

  let filtered = [...CURATED_SCHEMES];

  if (category && category !== "all") {
    filtered = filtered.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }

  if (state && state !== "all") {
    filtered = filtered.filter(s => s.region.toLowerCase() === state.toLowerCase() || s.region === "All India");
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.shortDescription.toLowerCase().includes(q) ||
      s.targetAudience.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered
  });
}
