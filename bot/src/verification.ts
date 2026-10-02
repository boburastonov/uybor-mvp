import { Bot, InlineKeyboard } from 'grammy';
import { Listing } from '../../src/types/index';
import { getListingsNeedingVerification, getListingById } from './data';

export function sendVerificationPing(bot: Bot, listing: Listing) {
  const text = `🏠 *${listing.title}*\n📍 ${listing.district}, ${listing.address}\n💰 ${listing.monthlyRent}$/oy\n\n❓ Bu kvartira hali bo'shmi?`;
  
  const keyboard = new InlineKeyboard()
    .text("✅ Ha, hali bo'sh", `verify_yes_${listing.id}`)
    .text("❌ Yo'q, band bo'ldi", `verify_no_${listing.id}`).row()
    .text("✏️ Narxni yangilash", `verify_update_${listing.id}`);

  bot.api.sendMessage(listing.ownerTelegramId, text, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  }).then(() => {
    console.log(`Ping sent to ${listing.ownerTelegramId} for listing ${listing.id}`);
  }).catch((err) => {
    console.error(`Failed to send ping to ${listing.ownerTelegramId} for listing ${listing.id}:`, err);
  });
}

export function registerVerificationHandlers(bot: Bot) {
  bot.callbackQuery(/verify_yes_(.+)/, async (ctx) => {
    const id = ctx.match[1];
    // In MVP, we just send a response and don't write to JSON
    await ctx.reply("✅ E'loningiz tasdiqlandi! Keyingi so'rov 7 kundan keyin.");
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/verify_no_(.+)/, async (ctx) => {
    const id = ctx.match[1];
    await ctx.reply("📝 E'loningiz yashirildi. Qayta faollashtirish uchun /mylistings buyrug'idan foydalaning.");
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/verify_update_(.+)/, async (ctx) => {
    const id = ctx.match[1];
    await ctx.reply("Yangi narxni kiriting:");
    await ctx.answerCallbackQuery();
  });
}

export function startVerificationScheduler(bot: Bot) {
  console.log('Starting verification scheduler (MVP mock)...');
  const listings = getListingsNeedingVerification();
  for (const listing of listings) {
    sendVerificationPing(bot, listing);
  }
}
