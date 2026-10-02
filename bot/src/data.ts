import * as fs from 'fs';
import * as path from 'path';
import { Listing } from '../../src/types/index';

const LISTINGS_PATH = path.join(__dirname, '../../src/data/listings.json');

export function loadListings(): Listing[] {
  try {
    const data = fs.readFileSync(LISTINGS_PATH, 'utf-8');
    return JSON.parse(data) as Listing[];
  } catch (error) {
    console.error('Error loading listings:', error);
    return [];
  }
}

export function getListingById(id: string): Listing | undefined {
  const listings = loadListings();
  return listings.find(l => l.id === id);
}

export function getListingsByOwner(telegramId: string): Listing[] {
  const listings = loadListings();
  return listings.filter(l => l.ownerTelegramId === telegramId);
}

export function getListingsNeedingVerification(): Listing[] {
  const listings = loadListings();
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const now = new Date().getTime();
  
  return listings.filter(l => {
    const lastVerified = new Date(l.lastVerifiedAt).getTime();
    return (now - lastVerified) > SEVEN_DAYS_MS;
  });
}
