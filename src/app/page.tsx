"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Building2, MapPin } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ListingCard from "@/components/ListingCard";
import SearchFilters from "@/components/SearchFilters";
import { filterListings } from "@/lib/utils";
import { initTelegramApp } from "@/lib/telegram";
import listingsData from "@/data/listings.json";
import type { Listing, SearchFilters as FiltersType } from "@/types";

export default function HomePage() {
  const [filters, setFilters] = useState<FiltersType>({});
  const allListings = listingsData as Listing[];
  const filtered = filterListings(allListings, filters);

  const stats = {
    total: allListings.filter((l) => !l.isDuplicate).length,
    verified: allListings.filter(
      (l) => l.verificationStatus === "active" && !l.isDuplicate,
    ).length,
    districts: new Set(allListings.map((l) => l.district)).size,
  };

  useEffect(() => {
    initTelegramApp();
  }, []);

  return (
    <>
      <Header />

      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="text-center py-5">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-2xl mb-3">
            <Building2 className="w-8 h-8 text-brand-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Uy izlash — <span className="text-brand-600">Uy bor!</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1.5 max-w-xs mx-auto">
            O'zbekistondagi eng ishonchli kvartira topish platformasi
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
            <p className="text-xl font-bold text-brand-600">{stats.total}</p>
            <p className="text-[11px] text-gray-500">E'lonlar</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
            <p className="text-xl font-bold text-accent-600">
              {stats.verified}
            </p>
            <p className="text-[11px] text-gray-500">Tasdiqlangan</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
            <p className="text-xl font-bold text-gray-700">{stats.districts}</p>
            <p className="text-[11px] text-gray-500">Tuman</p>
          </div>
        </div>

        {/* MVP Features Banner */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-4 text-white">
          <h3 className="font-bold text-sm mb-2">🚀 Nima uchun UyBor?</h3>
          <div className="space-y-1.5 text-xs text-brand-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent-300 flex-shrink-0" />
              <span>
                <b className="text-white">Jonli tasdiq</b> — har 7 kunda uy
                egasi tasdiqlaydi
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-accent-300 flex-shrink-0" />
              <span>
                <b className="text-white">Bitta kvartira = bitta e'lon</b> —
                dublikatlar aniqlanadi
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-300 flex-shrink-0" />
              <span>
                <b className="text-white">Ko'chib kirish narxi</b> — jami to'lov
                darhol ko'rinadi
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <SearchFilters
          filters={filters}
          onChange={setFilters}
          resultCount={filtered.length}
        />

        {/* Listings */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title text-lg">Kvartiralar</h2>
            <span className="text-xs text-gray-500">
              {filtered.length} ta topildi
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-8 h-8 text-gray-400" />
              </div>
              <p className="font-medium text-gray-700">Hech narsa topilmadi</p>
              <p className="text-sm text-gray-500 mt-1">
                Filtrlarni o'zgartirib ko'ring
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </>
  );
}
