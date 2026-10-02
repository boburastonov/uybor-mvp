"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, BedDouble, Maximize, Building2 } from "lucide-react";
import VerificationBadge from "./VerificationBadge";
import { formatPrice, calculateMoveInCost } from "@/lib/utils";
import type { Listing } from "@/types";

interface Props {
  listing: Listing;
}

export default function ListingCard({ listing }: Props) {
  const moveIn = calculateMoveInCost(listing);

  const passportQuick = [
    { icon: "🚿", ok: listing.passport.hotWater },
    { icon: "📶", ok: listing.passport.internet },
    { icon: "🛗", ok: listing.passport.elevator },
    { icon: "🔥", ok: listing.passport.gas },
  ];

  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="card group">
        {/* Image */}
        <div className="relative h-44 bg-gray-200 overflow-hidden">
          {listing.images[0] ? (
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Building2 className="w-12 h-12" />
            </div>
          )}
          {/* Verification badge overlay */}
          <div className="absolute top-2 right-2">
            <VerificationBadge
              status={listing.verificationStatus}
              lastVerifiedAt={listing.lastVerifiedAt}
              variant="small"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 mb-1">
            {listing.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="line-clamp-1">
              {listing.district} · {listing.landmark}
            </span>
          </div>

          {/* Details */}
          <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5" />
              {listing.rooms} xona
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5" />
              {listing.area} m²
            </span>
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {listing.floor}/{listing.totalFloors}
            </span>
          </div>

          {/* Passport quick icons */}
          <div className="flex items-center gap-1.5 mb-3">
            {passportQuick.map((p, i) => (
              <span
                key={i}
                className={`text-sm ${p.ok ? "opacity-100" : "opacity-30"}`}
                title={p.ok ? "Mavjud" : "Yo'q"}
              >
                {p.icon}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-bold text-brand-700">
                {formatPrice(listing.monthlyRent)}
                <span className="text-xs font-normal text-gray-500">/oy</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                Ko'chib kirish
              </p>
              <p className="text-sm font-bold text-brand-600">
                {formatPrice(moveIn.total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
