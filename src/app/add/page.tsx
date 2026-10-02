"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Send,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import DuplicateWarning from "@/components/DuplicateWarning";
import { checkDuplicate, formatPrice } from "@/lib/utils";
import { DISTRICTS } from "@/types";
import listingsData from "@/data/listings.json";
import type { Listing } from "@/types";

interface FormData {
  title: string;
  description: string;
  district: string;
  address: string;
  landmark: string;
  rooms: number;
  area: number;
  floor: number;
  totalFloors: number;
  monthlyRent: number;
  deposit: number;
  realtorCommission: number;
  phone: string;
  hotWater: boolean;
  gas: boolean;
  heatingType: string;
  internet: boolean;
  elevator: boolean;
  noiseLevel: string;
}

const initialForm: FormData = {
  title: "",
  description: "",
  district: "",
  address: "",
  landmark: "",
  rooms: 1,
  area: 0,
  floor: 1,
  totalFloors: 5,
  monthlyRent: 0,
  deposit: 0,
  realtorCommission: 0,
  phone: "",
  hotWater: false,
  gas: false,
  heatingType: "central",
  internet: false,
  elevator: false,
  noiseLevel: "moderate",
};

export default function AddListingPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [duplicateMatches, setDuplicateMatches] = useState<
    { listing: Listing; score: number; reasons: string[] }[]
  >([]);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const allListings = listingsData as Listing[];

  const updateField = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    const newForm = { ...form, [key]: value };
    setForm(newForm);

    // Auto-check duplicates when key fields change
    if (
      ["district", "rooms", "area", "floor", "totalFloors", "phone"].includes(
        key as string
      )
    ) {
      runDuplicateCheck(newForm);
    }
  };

  const runDuplicateCheck = useCallback(
    (data: FormData) => {
      if (!data.district || !data.rooms || !data.area) return;

      const result = checkDuplicate(
        {
          district: data.district,
          rooms: data.rooms,
          area: data.area,
          floor: data.floor,
          totalFloors: data.totalFloors,
          phone: data.phone,
        } as Partial<Listing>,
        allListings
      );

      setDuplicateMatches(result.matches);
      if (result.isDuplicate) {
        setShowDuplicateWarning(true);
      }
    },
    [allListings]
  );

  const moveInTotal = form.monthlyRent + form.deposit + form.realtorCommission;

  const handleSubmit = () => {
    if (duplicateMatches.length > 0 && !showDuplicateWarning) {
      setShowDuplicateWarning(true);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Header />
        <div className="px-4 py-16 text-center">
          <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-accent-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            E'lon yuborildi!
          </h2>
          <p className="text-sm text-gray-500 mb-1">
            Moderator tekshirganidan keyin e'loningiz chiqadi.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Telegram bot orqali har 7 kunda tasdiqlash so'rovi keladi.
          </p>
          <button onClick={() => router.push("/")} className="btn-primary">
            Bosh sahifaga
          </button>
        </div>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="px-4 py-4 space-y-4 pb-28">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Orqaga
        </button>

        <h1 className="text-xl font-bold text-gray-900">
          ➕ Yangi e'lon qo'shish
        </h1>

        {/* Duplicate Warning */}
        {showDuplicateWarning && duplicateMatches.length > 0 && (
          <DuplicateWarning
            matches={duplicateMatches}
            onProceed={() => {
              setShowDuplicateWarning(false);
              setSubmitted(true);
            }}
            onCancel={() => setShowDuplicateWarning(false)}
          />
        )}

        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">📝 Asosiy ma'lumotlar</h3>

          <div>
            <label className="label">Sarlavha</label>
            <input
              type="text"
              placeholder="Masalan: Zamonaviy 2-xonali kvartira, Yunusobod"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="label">Tavsif</label>
            <textarea
              placeholder="Kvartira haqida batafsil..."
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              className="input-field text-sm resize-none"
            />
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">📍 Joylashuv</h3>

          <div>
            <label className="label">Tuman</label>
            <select
              value={form.district}
              onChange={(e) => updateField("district", e.target.value)}
              className="select-field text-sm"
            >
              <option value="">Tanlang...</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Manzil</label>
            <input
              type="text"
              placeholder="Ko'cha, uy raqami"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="label">Yaqindagi taniqli joy</label>
            <input
              type="text"
              placeholder="Metro, bozor, maktab..."
              value={form.landmark}
              onChange={(e) => updateField("landmark", e.target.value)}
              className="input-field text-sm"
            />
          </div>
        </div>

        {/* Apartment details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">🏠 Kvartira</h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Xonalar soni</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => updateField("rooms", n)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      form.rooms === n
                        ? "bg-brand-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Maydon (m²)</label>
              <input
                type="number"
                value={form.area || ""}
                onChange={(e) => updateField("area", Number(e.target.value))}
                className="input-field text-sm"
                placeholder="m²"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Qavat</label>
              <input
                type="number"
                value={form.floor || ""}
                onChange={(e) => updateField("floor", Number(e.target.value))}
                className="input-field text-sm"
                min={1}
              />
            </div>
            <div>
              <label className="label">Umumiy qavatlar</label>
              <input
                type="number"
                value={form.totalFloors || ""}
                onChange={(e) =>
                  updateField("totalFloors", Number(e.target.value))
                }
                className="input-field text-sm"
                min={1}
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">💰 Narxlar (USD)</h3>

          <div>
            <label className="label">Oylik ijara</label>
            <input
              type="number"
              value={form.monthlyRent || ""}
              onChange={(e) =>
                updateField("monthlyRent", Number(e.target.value))
              }
              className="input-field text-sm"
              placeholder="Masalan: 350"
            />
          </div>

          <div>
            <label className="label">Depozit</label>
            <input
              type="number"
              value={form.deposit || ""}
              onChange={(e) => updateField("deposit", Number(e.target.value))}
              className="input-field text-sm"
              placeholder="Masalan: 350"
            />
          </div>

          <div>
            <label className="label">Rieltor komissiyasi</label>
            <input
              type="number"
              value={form.realtorCommission || ""}
              onChange={(e) =>
                updateField("realtorCommission", Number(e.target.value))
              }
              className="input-field text-sm"
              placeholder="Masalan: 175"
            />
          </div>

          {/* Live move-in preview */}
          {moveInTotal > 0 && (
            <div className="move-in-highlight">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  💰 Jami ko'chib kirish:
                </span>
                <span className="text-lg font-extrabold text-brand-700">
                  {formatPrice(moveInTotal)}
                </span>
              </div>
              <p className="text-[11px] text-brand-500 mt-1">
                Oylik + Depozit + Rieltor = Jami
              </p>
            </div>
          )}
        </div>

        {/* Apartment passport */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">
            🏠 Kvartira pasporti
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "hotWater" as const, label: "🚿 Issiq suv" },
              { key: "gas" as const, label: "🔥 Gaz" },
              { key: "internet" as const, label: "📶 Internet" },
              { key: "elevator" as const, label: "🛗 Lift" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => updateField(item.key, !form[item.key])}
                className={`py-3 px-3 rounded-xl text-sm font-medium transition-all ${
                  form[item.key]
                    ? "bg-accent-100 text-accent-800 border-2 border-accent-300"
                    : "bg-gray-100 text-gray-500 border-2 border-transparent"
                }`}
              >
                {item.label} {form[item.key] ? "✅" : ""}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Isitish turi</label>
              <select
                value={form.heatingType}
                onChange={(e) => updateField("heatingType", e.target.value)}
                className="select-field text-sm"
              >
                <option value="central">Markaziy</option>
                <option value="individual">Individual</option>
                <option value="none">Yo'q</option>
              </select>
            </div>
            <div>
              <label className="label">Shovqin</label>
              <select
                value={form.noiseLevel}
                onChange={(e) => updateField("noiseLevel", e.target.value)}
                className="select-field text-sm"
              >
                <option value="quiet">🤫 Past</option>
                <option value="moderate">🔊 O'rtacha</option>
                <option value="noisy">📢 Baland</option>
              </select>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">📱 Aloqa</h3>
          <div>
            <label className="label">Telefon raqam</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="input-field text-sm"
              placeholder="+998901234567"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              🔒 Raqamingiz yashirin saqlanadi. Bog'lanish bot orqali bo'ladi.
            </p>
          </div>
        </div>

        {/* Duplicate check info */}
        {duplicateMatches.length > 0 && !showDuplicateWarning && (
          <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
            <p className="text-xs text-orange-700">
              ⚠️ {duplicateMatches.length} ta o'xshash e'lon topildi. Yuborishda
              tekshiriladi.
            </p>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={
            !form.title || !form.district || !form.monthlyRent || !form.phone
          }
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all ${
            form.title && form.district && form.monthlyRent && form.phone
              ? "btn-primary"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Send className="w-5 h-5" />
          E'lonni yuborish
        </button>
      </div>

      <BottomNav />
    </>
  );
}
