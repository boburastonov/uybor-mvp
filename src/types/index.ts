// ==========================================
// UyBor — Type Definitions
// ==========================================

export type HeatingType = "central" | "individual" | "none";
export type NoiseLevel = "quiet" | "moderate" | "noisy";
export type VerificationStatus = "active" | "pending" | "expired";
export type Currency = "USD" | "UZS";

/** Kvartira pasporti — texnik xususiyatlar */
export interface ApartmentPassport {
  hotWater: boolean;
  gas: boolean;
  heatingType: HeatingType;
  electricityStable: boolean;
  waterStable: boolean;
  internet: boolean;
  noiseLevel: NoiseLevel;
  elevator: boolean;
}

/** Asosiy e'lon modeli */
export interface Listing {
  id: string;
  title: string;
  description: string;

  // Joylashuv
  district: string;
  address: string;
  landmark: string;
  lat: number;
  lng: number;

  // Kvartira ma'lumotlari
  rooms: number;
  area: number; // m²
  floor: number;
  totalFloors: number;

  // Narxlar
  monthlyRent: number;
  deposit: number;
  realtorCommission: number;
  currency: Currency;

  // Pasport
  passport: ApartmentPassport;

  // Rasmlar
  images: string[];

  // Tasdiqlash
  isVerified: boolean;
  lastVerifiedAt: string; // ISO 8601
  verificationStatus: VerificationStatus;

  // Uy egasi
  ownerId: string;
  ownerName: string;
  ownerTelegramId: string;
  phone: string; // faqat admin ko'radi

  // Metadata
  createdAt: string;
  updatedAt: string;
  viewCount: number;

  // Dublikat aniqlash
  isDuplicate: boolean;
  duplicateOf?: string;
}

/** Qidiruv filtrlari */
export interface SearchFilters {
  query?: string;
  district?: string;
  minRooms?: number;
  maxRooms?: number;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  maxMoveInCost?: number;
  verifiedOnly?: boolean;
  sortBy?: "price_asc" | "price_desc" | "movein_asc" | "movein_desc" | "newest" | "area_desc";
  // Pasport filtrlari
  hotWater?: boolean;
  gas?: boolean;
  elevator?: boolean;
  internet?: boolean;
}

/** Ko'chib kirish narxi */
export interface MoveInCost {
  monthlyRent: number;
  deposit: number;
  realtorCommission: number;
  total: number;
}

/** Dublikat tekshiruv natijasi */
export interface DuplicateCheckResult {
  isDuplicate: boolean;
  matchedListings: {
    listing: Listing;
    matchScore: number;
    matchReasons: string[];
  }[];
}

/** Telegram bot orqali tasdiqlash */
export interface VerificationPing {
  listingId: string;
  ownerTelegramId: string;
  sentAt: string;
  respondedAt?: string;
  isAvailable?: boolean;
}

/** Toshkent tumanlari */
export const DISTRICTS = [
  "Bektemir",
  "Chilonzor",
  "Mirobod",
  "Mirzo Ulug'bek",
  "Olmazor",
  "Sergeli",
  "Shayxontohur",
  "Uchtepa",
  "Yakkasaroy",
  "Yashnobod",
  "Yunusobod",
] as const;

export type District = (typeof DISTRICTS)[number];
