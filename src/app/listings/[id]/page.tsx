"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, BedDouble, Maximize, Building2, Eye, Calendar, Phone, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import VerificationBadge from "@/components/VerificationBadge";
import MoveInCalculator from "@/components/MoveInCalculator";
import ApartmentPassport from "@/components/ApartmentPassport";
import { formatPrice, formatDate, calculatePriceFairness } from "@/lib/utils";
import listingsData from "@/data/listings.json";
import type { Listing } from "@/types";

export default function ListingDetailPage() {  const params = useParams();  const router = useRouter();  const [currentImage, setCurrentImage] = useState(0);  const allListings = listingsData as Listing[];  const listing = allListings.find((l) => l.id === params.id);  const fairness = useMemo(() => { if (!listing) return null; return calculatePriceFairness(listing, allListings); }, [listing, allListings]);  if (!listing) return <div>Topilmadi</div>;  const images = listing.images.length > 0 ? listing.images : [];  return ( <> <Header />  <div className="p-4">  <button onClick={() => router.back()}>Orqaga</button> <h1 className="text-xl font-bold mt-4">{listing.title}</h1> <p>{listing.district}</p> <VerificationBadge status={listing.verificationStatus} lastVerifiedAt={listing.lastVerifiedAt} variant="large" /> <MoveInCalculator listing={listing} /> <div className="mt-4"><ApartmentPassport passport={listing.passport} /></div>  </div> <BottomNav /> </> );
}