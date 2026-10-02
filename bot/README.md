# UyBor Telegram Bot

This is the Telegram Bot for UyBor — an apartment rental platform for Uzbekistan.

## Setup Instructions / O'rnatish bo'yicha ko'rsatmalar

### 1. Bot yaratish / Create a bot
- Telegram'da @BotFather ga kiring.
- `/newbot` buyrug'ini yuboring.
- Bot uchun ism va username tanlang.
- Olingan tokenni nusxalab oling.

### 2. Environment Variables / Muhit o'zgaruvchilari
- `.env.example` faylini nusxalab `.env` nomli fayl yarating.
- `BOT_TOKEN` ga o'zingizning tokeringizni yozing.
- `MINI_APP_URL` ga Mini App URL manzilini kiriting (masalan, `https://uybor.vercel.app`).

### 3. Ilovani ishga tushirish / Run the application
Botni ishga tushirish uchun quyidagi buyruqni kiriting:
```bash
npm run bot:dev
```

## Architecture Overview
- `src/index.ts`: Main entry point, sets up the bot.
- `src/commands.ts`: Command handlers (`/start`, `/help`, `/mylistings`).
- `src/verification.ts`: Jonli Tasdiq (Live Verification) system for verifying property availability.
- `src/data.ts`: Mock data access layer (reads from main project JSON).
- `src/types.ts`: Bot specific types.
