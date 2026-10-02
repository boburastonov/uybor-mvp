"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Maximize,
  Building2,
  Eye,
  Calendar,
  Phone,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import VerificationBadge from "@/components/VerificationBadge";
import MoveInCalculator from "@/components/MoveInCalculator";
import ApartmentPassport from "@/components/ApartmentPassport";
import {
  formatPrice,
  formatDate,
  calculatePriceFairness,
} from "@/lib/utils";
import listingsData from "@/data/listings.json";
import type { Listing } from "@/types";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);

  const allListings = listingsData as Listing[];
  const listing = allListings.find((l) => l.id === params.id);

  const fairness = useMemo(() => {
    if (!listing) return null;
    return calculatePriceFairness(listing, allListings);
  }, [listing, allListings]);

  if (!listing) {
    return (
      <>
        <Header />
        <div className="px-4 py-12 text-center">
          <p className="text-gray-500">E'lon topilmadi</p>
          <button onClick={() => router.push("/")} className="btn-primary mt-4">
            Bosh sahifaga
          </button>
        </div>
        <BottomNav />
      </>
    );
  }

  const images = listing.images.length > 0 ? listing.images : [];

  return (
    <>
      <Header />

      <div className="pb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Orqaga
        </button>

        {images.length > 0 && (
          <div className="relative h-56 bg-gray-200">
            <img
              src={images[currentImage]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImage(
                      (currentImage - 1 + images.length) % images.length
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImage((currentImage + 1) % images.length)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i === currentImage ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="px-4 space-y-4 mt-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{listing.title}</h1>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <MapPin className="w-4 h-4" />
              {listing.district} · {listing.address}
            </div>
            {listing.landmark && (
              <p className="text-xs text-gray-400 mt-0.5 ml-5">
                📍 {listing.landmark}
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Oylik ijara
                </p>
                <p className="text-3xl font-extrabold text-brand-700">
                  {formatPrice(listing.monthlyRent)}
                  <span className="text-sm font-normal text-gray-400">
                    /oy
                  </span>
                </p>
              </div>
              {fairness && fairness.label !== "Ma'lumot yetarli emas" && (
                <div className={`flex items-center gap-1 text-sm font-medium ${fairness.color}`}>
                  {fairness.percentage > 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : fairness.percentage < 0 ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : (
                    <Minus className="w-4 h-4" />
                  )}
                  <span className="text-xs">{fairness.label}</span>
                </div>
              )}
            </div>
          </div>

          <VerificationBadge
            status={listing.verificationStatus}
            lastVerifiedAt={listing.lastVerifiedAt}
            variant="large"
          />

          <MoveInCalculator listing={listing} />

          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="font-bold text-gray-900 mb-3">📋 Kvartira haqida</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <BedDouble className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{listing.rooms}</p>
                <p className="text-[11px] text-gray-500">Xona</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <Maximize className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{listing.area}</p>
                <p className="text-[11px] text-gray-500">m²</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <Building2 className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">
                  {listing.floor}/{listing.totalFloors}
                </p>
                <p className="text-[11px] text-gray-500">Qavat</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="font-bold text-gray-900 mb-2">📝 Tavsif</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {listing.description}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <ApartmentPassport passport={listing.passport} />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(listing.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {listing.viewCount} ko'rish
            </span>
          </div>

          <button
            onClick={() =>
              alert(
                "📱 Telegram bot orqali bog'laning!\n\nUy egasining raqami himoyalangan. Bot orqali anonim aloqa qiling."
              )
            }
            className="btn-primary w-full flex items-center justify-center gap-2 text-base"
          >
            <Phone className="w-5 h-5" />
            Bog'lanish
          </button>
        </div>
      </div>

      <BottomNav />
    </>
  );
}