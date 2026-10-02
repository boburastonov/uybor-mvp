"use client";

import { getPassportItems } from "@/lib/utils";
import type { Listing } from "@/types";

interface Props {
  passport: Listing["passport"];
}

export default function ApartmentPassport({ passport }: Props) {
  const items = getPassportItems(passport);

  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-3">🏠 Kvartira pasporti</h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm ${
              item.value
                ? "bg-accent-50 text-accent-800"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <div>
              <span className="font-medium">{item.label}</span>
              {item.detail && (
                <span className="text-xs block opacity-75">{item.detail}</span>
              )}
            </div>
            <span className="ml-auto">
              {item.label === "Shovqin" ? "" : item.value ? "✅" : "❌"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
