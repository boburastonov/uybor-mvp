import { NextResponse } from "next/server";
import listingsData from "@/data/listings.json";
import type { Listing } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const allListings = listingsData as Listing[];

  let result = allListings.filter((l) => !l.isDuplicate);

  const district = searchParams.get("district");
  if (district) {
    result = result.filter((l) => l.district === district);
  }

  const verifiedOnly = searchParams.get("verifiedOnly");
  if (verifiedOnly === "true") {
    result = result.filter((l) => l.verificationStatus === "active");
  }

  const minPrice = searchParams.get("minPrice");
  if (minPrice) {
    result = result.filter((l) => l.monthlyRent >= Number(minPrice));
  }

  const maxPrice = searchParams.get("maxPrice");
  if (maxPrice) {
    result = result.filter((l) => l.monthlyRent <= Number(maxPrice));
  }

  const rooms = searchParams.get("rooms");
  if (rooms) {
    result = result.filter((l) => l.rooms === Number(rooms));
  }

  return NextResponse.json({
    count: result.length,
    listings: result,
  });
}
