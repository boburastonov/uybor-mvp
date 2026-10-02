"use client";

import { AlertTriangle, ExternalLink, X } from "lucide-react";
import type { Listing } from "@/types";
import { formatPrice } from "@/lib/utils";

interface DuplicateMatch {
  listing: Listing;
  score: number;
  reasons: string[];
}

interface Props {
  matches: DuplicateMatch[];
  onProceed: () => void;
  onCancel: () => void;
}

export default function DuplicateWarning({
  matches,
  onProceed,
  onCancel,
}: Props) {
  if (matches.length === 0) return null;

  return (
    <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h3 className="font-bold text-orange-900">
            ⚠️ O'xshash e'lon topildi!
          </h3>
          <p className="text-sm text-orange-700 mt-1">
            Bu kvartira allaqachon platformada mavjud bo'lishi mumkin. Iltimos,
            tekshiring.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {matches.map((match) => (
          <div
            key={match.listing.id}
            className="bg-white rounded-xl p-3 border border-orange-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">
                  {match.listing.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {match.listing.district} · {match.listing.rooms} xona ·{" "}
                  {match.listing.area} m² · {match.listing.floor}-qavat
                </p>
                <p className="text-sm font-medium text-brand-600 mt-1">
                  {formatPrice(match.listing.monthlyRent)}/oy
                </p>
              </div>
              <span className="badge-duplicate">
                {match.score}% o'xshash
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {match.reasons.map((reason, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full"
                >
                  {reason}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-orange-600 text-white rounded-xl font-medium text-sm hover:bg-orange-700 transition-colors"
        >
          <X className="w-4 h-4" />
          Bekor qilish
        </button>
        <button
          onClick={onProceed}
          className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-orange-700 border border-orange-300 rounded-xl font-medium text-sm hover:bg-orange-50 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Baribir qo'shish
        </button>
      </div>
    </div>
  );
}
