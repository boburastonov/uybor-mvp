import { Bot, InlineKeyboard } from 'grammy';
import { getListingsByOwner } from './data';
import { sendVerificationPing } from './verification';

export function registerCommands(bot: Bot) {
  bot.command('start', async (ctx) => {
    const miniAppUrl = process.env.MINI_APP_URL || 'https://uybor.vercel.app';
    const text = "🏠 UyBor ga xush kelibsiz!\n\nO'zbekistondagi eng ishonchli kvartira qidirish platformasi.\n\n✅ Faqat tasdiqlangan e'lonlar\n🔍 Dublikat e'lonlarsiz\n💰 Ko'chib kirish narxi kalkulyatori";
    
    const keyboard = new InlineKeyboard()
      .webApp("🔍 Kvartira qidirish", miniAppUrl).row()
      .webApp("➕ E'lon qo'shish", `${miniAppUrl}/add`).row()
      .text("📋 Mening e'lonlarim", 'my_listings').row()
      .text("❓ Yordam", 'help');

    await ctx.reply(text, { reply_markup: keyboard });
  });

  bot.command('help', async (ctx) => {
    const text = "Buyruqlar:\n/start - Botni boshlash\n/help - Yordam\n/mylistings - E'lonlarimni ko'rish\n\nJonli Tasdiq qanday ishlaydi: Bot sizga vaqti-vaqti bilan xabar yuborib, kvartirangiz hali ham bo'sh yoki yo'qligini so'raydi.";
    await ctx.reply(text);
  });

  bot.command('mylistings', async (ctx) => {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) return;

    // MVP: Get from JSON
    const listings = getListingsByOwner(telegramId);
    
    if (listings.length === 0) {
      await ctx.reply("Sizda e'lonlar yo'q.");
      return;
    }

    await ctx.reply("Sizning e'lonlaringiz:");
    
    for (const listing of listings) {
      const text = `🏠 *${listing.title}*\nHolat: ${listing.verificationStatus}\nOxirgi tasdiq: ${listing.lastVerifiedAt}`;
      const keyboard = new InlineKeyboard().text("♻️ Hozir tasdiqlash", `verify_now_${listing.id}`);
      await ctx.reply(text, { parse_mode: 'Markdown', reply_markup: keyboard });
    }
  });

  bot.callbackQuery('help', async (ctx) => {
    const text = "Buyruqlar:\n/start - Botni boshlash\n/help - Yordam\n/mylistings - E'lonlarimni ko'rish\n\nJonli Tasdiq qanday ishlaydi: Bot sizga vaqti-vaqti bilan xabar yuborib, kvartirangiz hali ham bo'sh yoki yo'qligini so'raydi.";
    await ctx.reply(text);
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery('my_listings', async (ctx) => {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) return;

    const listings = getListingsByOwner(telegramId);
    
    if (listings.length === 0) {
      await ctx.reply("Sizda e'lonlar yo'q.");
      await ctx.answerCallbackQuery();
      return;
    }

    await ctx.reply("Sizning e'lonlaringiz:");
    
    for (const listing of listings) {
      const text = `🏠 *${listing.title}*\nHolat: ${listing.verificationStatus}\nOxirgi tasdiq: ${listing.lastVerifiedAt}`;
      const keyboard = new InlineKeyboard().text("♻️ Hozir tasdiqlash", `verify_now_${listing.id}`);
      await ctx.reply(text, { parse_mode: 'Markdown', reply_markup: keyboard });
    }
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/verify_now_(.+)/, async (ctx) => {
    const id = ctx.match[1];
    await ctx.reply(`E'lon ${id} tasdiqlash so'raldi (MVP mock).`);
    await ctx.answerCallbackQuery();
  });
}
