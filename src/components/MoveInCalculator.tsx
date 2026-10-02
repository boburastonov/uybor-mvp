"use client";

import { Home, Lock, Handshake, Calculator } from "lucide-react";
import { calculateMoveInCost, formatPrice } from "@/lib/utils";
import type { Listing } from "@/types";

interface Props {
  listing: Listing;
}

export default function MoveInCalculator({ listing }: Props) {
  const cost = calculateMoveInCost(listing);

  return (
    <div className="move-in-highlight">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-5 h-5 text-brand-600" />
        <h3 className="font-bold text-gray-900">Ko'chib kirish narxi</h3>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2 text-gray-600">
            <Home className="w-4 h-4" />
            Oylik ijara
          </span>
          <span className="font-medium">{formatPrice(cost.monthlyRent)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2 text-gray-600">
            <Lock className="w-4 h-4" />
            Depozit
          </span>
          <span className="font-medium">{formatPrice(cost.deposit)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2 text-gray-600">
            <Handshake className="w-4 h-4" />
            Rieltor komissiyasi
          </span>
          <span className="font-medium">
            {formatPrice(cost.realtorCommission)}
          </span>
        </div>

        <div className="border-t border-brand-200 my-2" />

        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900 text-base">
            💰 JAMI ko'chib kirish:
          </span>
          <span className="text-xl font-extrabold text-brand-700">
            {formatPrice(cost.total)}
          </span>
        </div>
      </div>
    </div>
  );
}
