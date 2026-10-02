export interface BotUser {
  telegramId: number;
  username?: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  registeredAt: string;
  isOwner: boolean;
}

export interface VerificationRecord {
  listingId: string;
  ownerTelegramId: string;
  sentAt: string;
  respondedAt?: string;
  response?: 'available' | 'unavailable';
  status: 'sent' | 'responded' | 'expired';
}
