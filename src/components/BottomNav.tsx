"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle } from "lucide-react";

const navItems = [
  { href: "/", label: "Bosh sahifa", icon: Home },
  { href: "/add", label: "E'lon qo'shish", icon: PlusCircle },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-lg mx-auto flex">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${
                isActive
                  ? "text-brand-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon
                className={`w-5 h-5 mb-1 ${
                  isActive ? "text-brand-600" : "text-gray-400"
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
