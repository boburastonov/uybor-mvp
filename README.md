# 🏠 UyBor MVP

O'zbekistondagi eng ishonchli kvartira qidirish platformasi. Ushbu loyiha **Telegram Bot + Next.js Mini App** gibrid arxitekturasi asosida qurilgan.

## 🌟 Asosiy imkoniyatlar (MVP)

1. **✅ Jonli Tasdiq (Live Verification)**
   - Telegram bot har 7 kunda uy egasiga eslatma yuboradi.
   - Uy egasi e'lon dolzarbligini bir tugma bilan tasdiqlaydi.
   - Javob olinmasa, e'lon avtomatik yashiriladi.
2. **🔍 Bitta kvartira = bitta e'lon**
   - E'lon qo'shish jarayonida dublikatlarni aniqlash tizimi ishlaydi.
   - Joylashuv, xona soni, maydon va boshqa parametrlari orqali (≥60% o'xshashlik) takroriy e'lonlar aniqlanadi.
3. **💰 Ko'chib kirish narxi kalkulyatori**
   - Oylik ijara + Depozit + Rieltor komissiyasi yig'indisi.
   - Foydalanuvchi jami qancha pul bilan ko'chib kirishini aniq biladi va shu asosida filtrlash imkoniga ega.

## 🛠 Texnologiyalar

- **Frontend:** Next.js 14, React, Tailwind CSS, Lucide Icons
- **Telegram Bot:** grammY (TypeScript)
- **Deployment:** Vercel (Next.js uchun)

## 🚀 Mahalliy (Local) kompyuterda ishga tushirish

### 1. Mini App (Frontend)

Loyihani yuklab olgach, quyidagi komandalarni terminalda ishlating:

```bash
# Paketlarni o'rnatish
npm install

# Dasturni ishga tushirish (http://localhost:3000)
npm run dev
```

### 2. Telegram Bot

Telegram botni ishga tushirish uchun:

1. [@BotFather](https://t.me/BotFather) orqali bot yarating va `BOT_TOKEN` oling.
2. Loyiha asosiy papkasida va `bot/` papkasida joylashgan `.env` faylga token va web app linkini joylang:
   ```env
   BOT_TOKEN=sizning_token_shu_yerda
   MINI_APP_URL=http://localhost:3000 (yoki Vercel havolasi)
   ```
3. Botni ishga tushiring:
   ```bash
   npm run bot
   ```

## 🌐 Vercel-ga joylash (Deploy)

1. Loyihani o'zingizning GitHub hisobingizga yuklang.
2. [Vercel](https://vercel.com) panelidan GitHub repozitoriyni tanlab `Import` qiling.
3. Hech qanday qo'shimcha sozlamalarsiz `Deploy` tugmasini bosing.
4. Vercel bergan linkni (masalan: `https://uybor.vercel.app`) olib, botning `.env` faylidagi `MINI_APP_URL` ga joylang va @BotFather orqali bot menyusiga web app qilib qo'shing.

---
*UyBor - Kvartira topish endi juda oson!*
