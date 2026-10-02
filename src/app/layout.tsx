import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UyBor — Ishonchli kvartira topish",
  description:
    "O'zbekistondagi eng ishonchli kvartira qidirish platformasi. Tasdiqlangan e'lonlar, dublikatsiz, ko'chib kirish kalkulyatori.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body>
        <div className="min-h-screen bg-gray-50 pb-20">
          <main className="max-w-lg mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
