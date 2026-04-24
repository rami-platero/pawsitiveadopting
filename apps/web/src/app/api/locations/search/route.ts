import { searchLocations } from "@/shared/lib/geocoding";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  const suggestions = await searchLocations(query, 5);
  return NextResponse.json(suggestions);
}
