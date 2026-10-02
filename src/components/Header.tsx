"use client";

import Link from "next/link";
import { Home as HomeIcon, Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
            <HomeIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
              UyBor
            </h1>
            <p className="text-[10px] text-gray-500 leading-tight -mt-0.5">
              Ishonchli kvartira
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-1 text-xs text-accent-700 bg-accent-50 px-2.5 py-1.5 rounded-full">
          <Shield className="w-3.5 h-3.5" />
          <span className="font-medium">Tasdiqlangan</span>
        </div>
      </div>
    </header>
  );
}
