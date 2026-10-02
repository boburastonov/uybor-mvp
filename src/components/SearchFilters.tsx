"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { DISTRICTS } from "@/types";
import type { SearchFilters as Filters } from "@/types";

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  resultCount: number;
}

export default function SearchFilters({ filters, onChange, resultCount }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const update = (partial: Partial<Filters>) => {
    onChange({ ...filters, ...partial });
  };

  const clearAll = () => {
    onChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== "" && v !== false
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Search bar */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tuman, manzil, landmark..."
            value={filters.query || ""}
            onChange={(e) => update({ query: e.target.value || undefined })}
            className="input-field pl-10 pr-4 py-2.5 text-sm"
          />
        </div>
      </div>

      {/* Toggle filters */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 border-t border-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filtrlar
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-brand-500 rounded-full" />
          )}
        </span>
        <span className="flex items-center gap-2 text-xs text-gray-500">
          {resultCount} ta natija
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      </button>

      {/* Filter panel */}
      {isOpen && (
        <div className="p-4 border-t border-gray-100 space-y-4">
          {/* District */}
          <div>
            <label className="label">Tuman</label>
            <select
              value={filters.district || ""}
              onChange={(e) =>
                update({ district: e.target.value || undefined })
              }
              className="select-field text-sm"
            >
              <option value="">Barcha tumanlar</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Rooms */}
          <div>
            <label className="label">Xonalar soni</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() =>
                    update({
                      minRooms: filters.minRooms === n ? undefined : n,
                      maxRooms: filters.maxRooms === n ? undefined : n,
                    })
                  }
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.minRooms === n
                      ? "bg-brand-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() =>
                  update({
                    minRooms: filters.minRooms === 5 ? undefined : 5,
                    maxRooms: undefined,
                  })
                }
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.minRooms === 5
                    ? "bg-brand-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                5+
              </button>
            </div>
          </div>

          {/* Price range */}
          <div>
            <label className="label">Oylik narx (USD)</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="dan"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  update({
                    minPrice: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="input-field text-sm flex-1"
              />
              <input
                type="number"
                placeholder="gacha"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  update({
                    maxPrice: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="input-field text-sm flex-1"
              />
            </div>
          </div>

          {/* Move-in cost filter — KEY FEATURE */}
          <div>
            <label className="label">
              💰 Maks. ko'chib kirish narxi (USD)
            </label>
            <input
              type="number"
              placeholder="Masalan: 1000"
              value={filters.maxMoveInCost || ""}
              onChange={(e) =>
                update({
                  maxMoveInCost: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className="input-field text-sm"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Oylik ijara + depozit + rieltor komissiyasi
            </p>
          </div>

          {/* Verified only */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              ✅ Faqat tasdiqlangan
            </label>
            <button
              onClick={() => update({ verifiedOnly: !filters.verifiedOnly })}
              className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                filters.verifiedOnly ? "bg-brand-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  filters.verifiedOnly ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Passport quick filters */}
          <div>
            <label className="label">Kvartira sharoitlari</label>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "internet" as const, label: "📶 Internet" },
                { key: "elevator" as const, label: "🛗 Lift" },
                { key: "hotWater" as const, label: "🚿 Issiq suv" },
                { key: "gas" as const, label: "🔥 Gaz" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() =>
                    update({ [item.key]: !filters[item.key] || undefined })
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filters[item.key]
                      ? "bg-accent-100 text-accent-800 border border-accent-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="label">Saralash</label>
            <select
              value={filters.sortBy || "newest"}
              onChange={(e) =>
                update({
                  sortBy: (e.target.value as Filters["sortBy"]) || undefined,
                })
              }
              className="select-field text-sm"
            >
              <option value="newest">🕐 Eng yangi</option>
              <option value="price_asc">💰 Arzon → Qimmat</option>
              <option value="price_desc">💰 Qimmat → Arzon</option>
              <option value="movein_asc">📦 Ko'chib kirish (arzon)</option>
              <option value="movein_desc">📦 Ko'chib kirish (qimmat)</option>
              <option value="area_desc">📐 Eng katta</option>
            </select>
          </div>

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
              Filtrlarni tozalash
            </button>
          )}
        </div>
      )}
    </div>
  );
}
