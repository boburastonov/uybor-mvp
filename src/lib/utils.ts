import { type Listing, type MoveInCost, type SearchFilters } from "@/types";

// ==========================================
// Narx formatlash
// ==========================================

export function formatPrice(amount: number, currency: string = "USD"): string {
  if (currency === "UZS") {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
  }
  return "$" + new Intl.NumberFormat("en-US").format(amount);
}

// ==========================================
// Sana formatlash
// ==========================================

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Bugun";
  if (diffDays === 1) return "Kecha";
  if (diffDays < 7) return `${diffDays} kun oldin`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta oldin`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} oy oldin`;
  return date.toLocaleDateString("uz-UZ");
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ==========================================
// Ko'chib kirish narxi kalkulyatori
// ==========================================

export function calculateMoveInCost(listing: Listing): MoveInCost {
  const total = listing.monthlyRent + listing.deposit + listing.realtorCommission;
  return {
    monthlyRent: listing.monthlyRent,
    deposit: listing.deposit,
    realtorCommission: listing.realtorCommission,
    total,
  };
}

// ==========================================
// Tasdiqlash statusi
// ==========================================

export function getVerificationDaysLeft(lastVerifiedAt: string): number {
  const lastDate = new Date(lastVerifiedAt);
  const now = new Date();
  const diffMs = now.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, 7 - diffDays);
}

export function isVerificationExpired(lastVerifiedAt: string): boolean {
  return getVerificationDaysLeft(lastVerifiedAt) <= 0;
}

export function getVerificationLabel(status: string): { text: string; color: string } {
  switch (status) {
    case "active":
      return { text: "✅ Tasdiqlangan", color: "badge-verified" };
    case "pending":
      return { text: "⏳ Kutilmoqda", color: "badge-pending" };
    case "expired":
      return { text: "⚠️ Muddati o'tgan", color: "badge-expired" };
    default:
      return { text: "Noma'lum", color: "badge-pending" };
  }
}

// ==========================================
// Narx adolati — median bilan solishtirish
// ==========================================

export function calculatePriceFairness(
  listing: Listing,
  allListings: Listing[]
): { percentage: number; label: string; color: string } {
  const sameDistrict = allListings.filter(
    (l) =>
      l.district === listing.district &&
      l.rooms === listing.rooms &&
      l.id !== listing.id &&
      !l.isDuplicate
  );

  if (sameDistrict.length < 2) {
    return { percentage: 0, label: "Ma'lumot yetarli emas", color: "text-gray-500" };
  }

  const prices = sameDistrict.map((l) => l.monthlyRent).sort((a, b) => a - b);
  const median = prices[Math.floor(prices.length / 2)];
  const diff = ((listing.monthlyRent - median) / median) * 100;
  const rounded = Math.round(diff);

  if (rounded > 15) {
    return { percentage: rounded, label: `O'xshashlardan ${rounded}% qimmat`, color: "text-red-600" };
  }
  if (rounded > 5) {
    return { percentage: rounded, label: `O'xshashlardan ${rounded}% qimmat`, color: "text-orange-600" };
  }
  if (rounded < -15) {
    return {
      percentage: rounded,
      label: `O'xshashlardan ${Math.abs(rounded)}% arzon`,
      color: "text-green-600",
    };
  }
  if (rounded < -5) {
    return {
      percentage: rounded,
      label: `O'xshashlardan ${Math.abs(rounded)}% arzon`,
      color: "text-green-600",
    };
  }
  return { percentage: rounded, label: "Bozor narxiga yaqin", color: "text-blue-600" };
}

// ==========================================
// Filtrlash va saralash
// ==========================================

export function filterListings(listings: Listing[], filters: SearchFilters): Listing[] {
  let result = listings.filter((l) => !l.isDuplicate);

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.district.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        l.landmark.toLowerCase().includes(q)
    );
  }

  if (filters.district) {
    result = result.filter((l) => l.district === filters.district);
  }

  if (filters.minRooms) {
    result = result.filter((l) => l.rooms >= filters.minRooms!);
  }

  if (filters.maxRooms) {
    result = result.filter((l) => l.rooms <= filters.maxRooms!);
  }

  if (filters.minPrice) {
    result = result.filter((l) => l.monthlyRent >= filters.minPrice!);
  }

  if (filters.maxPrice) {
    result = result.filter((l) => l.monthlyRent <= filters.maxPrice!);
  }

  if (filters.minArea) {
    result = result.filter((l) => l.area >= filters.minArea!);
  }

  if (filters.maxArea) {
    result = result.filter((l) => l.area <= filters.maxArea!);
  }

  if (filters.maxMoveInCost) {
    result = result.filter((l) => {
      const cost = calculateMoveInCost(l);
      return cost.total <= filters.maxMoveInCost!;
    });
  }

  if (filters.verifiedOnly) {
    result = result.filter((l) => l.verificationStatus === "active");
  }

  // Pasport filtrlari
  if (filters.hotWater) result = result.filter((l) => l.passport.hotWater);
  if (filters.gas) result = result.filter((l) => l.passport.gas);
  if (filters.elevator) result = result.filter((l) => l.passport.elevator);
  if (filters.internet) result = result.filter((l) => l.passport.internet);

  // Saralash
  switch (filters.sortBy) {
    case "price_asc":
      result.sort((a, b) => a.monthlyRent - b.monthlyRent);
      break;
    case "price_desc":
      result.sort((a, b) => b.monthlyRent - a.monthlyRent);
      break;
    case "movein_asc":
      result.sort((a, b) => calculateMoveInCost(a).total - calculateMoveInCost(b).total);
      break;
    case "movein_desc":
      result.sort((a, b) => calculateMoveInCost(b).total - calculateMoveInCost(a).total);
      break;
    case "newest":
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case "area_desc":
      result.sort((a, b) => b.area - a.area);
      break;
    default:
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return result;
}

// ==========================================
// Dublikat aniqlash
// ==========================================

export function checkDuplicate(
  newListing: Partial<Listing>,
  existingListings: Listing[]
): { isDuplicate: boolean; matches: { listing: Listing; score: number; reasons: string[] }[] } {
  const matches: { listing: Listing; score: number; reasons: string[] }[] = [];

  for (const existing of existingListings) {
    let score = 0;
    const reasons: string[] = [];

    // Telefon raqami bir xil
    if (newListing.phone && existing.phone && newListing.phone === existing.phone) {
      score += 30;
      reasons.push("Telefon raqami bir xil");
    }

    // Tuman bir xil
    if (newListing.district && existing.district && newListing.district === existing.district) {
      score += 10;
      reasons.push("Bir xil tuman");
    }

    // Xonalar soni bir xil
    if (newListing.rooms && existing.rooms && newListing.rooms === existing.rooms) {
      score += 15;
      reasons.push("Xonalar soni bir xil");
    }

    // Maydon yaqin (±5 m²)
    if (newListing.area && existing.area) {
      const areaDiff = Math.abs(newListing.area - existing.area);
      if (areaDiff <= 5) {
        score += 20;
        reasons.push(`Maydon juda yaqin (farq: ${areaDiff} m²)`);
      }
    }

    // Qavat bir xil
    if (newListing.floor && existing.floor && newListing.floor === existing.floor) {
      score += 15;
      reasons.push("Qavat bir xil");
    }

    // Etaj soni bir xil
    if (
      newListing.totalFloors &&
      existing.totalFloors &&
      newListing.totalFloors === existing.totalFloors
    ) {
      score += 10;
      reasons.push("Umumiy qavatlar soni bir xil");
    }

    // 60% dan oshsa — dublikat deb hisoblanadi
    if (score >= 60) {
      matches.push({ listing: existing, score, reasons });
    }
  }

  matches.sort((a, b) => b.score - a.score);

  return {
    isDuplicate: matches.length > 0,
    matches,
  };
}

// ==========================================
// Passport yorliqlari
// ==========================================

export function getPassportItems(passport: Listing["passport"]) {
  return [
    { label: "Issiq suv", value: passport.hotWater, icon: "🚿" },
    { label: "Gaz", value: passport.gas, icon: "🔥" },
    {
      label: "Isitish",
      value: passport.heatingType !== "none",
      detail:
        passport.heatingType === "central"
          ? "Markaziy"
          : passport.heatingType === "individual"
            ? "Individual"
            : "Yo'q",
      icon: "🌡️",
    },
    { label: "Elektr barqaror", value: passport.electricityStable, icon: "⚡" },
    { label: "Suv barqaror", value: passport.waterStable, icon: "💧" },
    { label: "Internet", value: passport.internet, icon: "📶" },
    {
      label: "Shovqin",
      value: true,
      detail:
        passport.noiseLevel === "quiet"
          ? "Past"
          : passport.noiseLevel === "moderate"
            ? "O'rtacha"
            : "Baland",
      icon: passport.noiseLevel === "quiet" ? "🤫" : passport.noiseLevel === "moderate" ? "🔊" : "📢",
    },
    { label: "Lift", value: passport.elevator, icon: "🛗" },
  ];
}
