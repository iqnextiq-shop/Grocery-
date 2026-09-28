import type { Metadata } from "next";
import "@fontsource/hind-siliguri/400";
import "@fontsource/hind-siliguri/500";
import "@fontsource/hind-siliguri/600";
import "@fontsource/hind-siliguri/700";
import "@fontsource/dm-sans/400";
import "@fontsource/dm-sans/600";
import "@fontsource/dm-sans/700";
import "@fontsource/dm-sans/800";
import "./globals.css";
import { siteConfig } from "@/config/site";
import StoreProvider from "@/components/StoreProvider";
import Header from "@/components/Header";
import { Footer, WhatsApp, MobileNav } from "@/components/Chrome";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://fresho.example",
  ),
  title: "FRESHO — অনলাইন গ্রোসারি | প্রতিদিনের প্রয়োজন, এক জায়গায়",
  description:
    "তাজা খাবার, নিত্যপ্রয়োজনীয় পণ্য ও পরিবারের প্রয়োজনীয় সবকিছু—অর্ডার করুন ঘরে বসেই। CodePixel Web-এর বাংলা গ্রোসারি ডেমো।",
  openGraph: {
    title: "FRESHO — প্রতিদিনের প্রয়োজন, এক জায়গায়",
    description: "আপনার পরিবারের জন্য সহজ অনলাইন বাজার · CodePixel Web ডেমো",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/images/fresho-hero.webp",
        width: 1264,
        height: 848,
        alt: "FRESHO বাজারের ব্যাগ",
      },
    ],
  },
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>
        <a className="skip-link" href="#main-content">
          মূল বিষয়ে যান
        </a>
        <StoreProvider>
          <div className="topline">
            <div className="wrap">
              <span>একটু যত্ন, একটু সতেজতা—আপনার প্রতিদিনের বাজারে।</span>
              <span>
                {siteConfig.demoLabel} <span className="top-dot">•</span>{" "}
                <a href="/contact">সাহায্য প্রয়োজন?</a>
              </span>
            </div>
          </div>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsApp />
          <MobileNav />
        </StoreProvider>
      </body>
    </html>
  );
}
