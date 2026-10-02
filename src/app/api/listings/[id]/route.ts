import { NextResponse } from "next/server";
import listingsData from "@/data/listings.json";
import type { Listing } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const allListings = listingsData as Listing[];
  const listing = allListings.find((l) => l.id === params.id);

  if (!listing) {
    return NextResponse.json({ error: "E'lon topilmadi" }, { status: 404 });
  }

  return NextResponse.json(listing);
}
