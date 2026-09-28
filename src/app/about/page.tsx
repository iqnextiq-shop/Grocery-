import Link from "next/link";
import Image from "next/image";
import { Trust } from "@/components/Sections";
import { siteConfig } from "@/config/site";
export const metadata = { title: "আমাদের কথা | FRESHO" };
export default function About() {
  return (
    <>
      <div className="wrap page">
        <div className="crumb">
          <Link href="/">হোম</Link> / আমাদের কথা
        </div>
        <div className="detail-layout">
          <div className="detail-copy">
            <span className="eyebrow">পরিবারের ভালোবাসায় বাজার</span>
            <h1>
              প্রতিদিনের বাজার,
              <br />
              একটু সহজ, একটু নিজের
            </h1>
            <p className="muted">
              {siteConfig.tagline}—এই ভাবনাতেই FRESHO। ব্যস্ত দিনের মাঝেও
              পরিবারের জন্য ভালো বাজার যেন কঠিন না হয়।
            </p>
            <p className="muted">
              চাল-ডাল থেকে তাজা ফল, দৈনন্দিন যত্ন থেকে ঘর পরিষ্কার—বিভাগ অনুযায়ী
              পণ্য খুঁজুন, প্রয়োজনের ওজন বেছে নিন। একবারেই গুছিয়ে ফেলুন সপ্তাহের
              বাজার।
            </p>
            <p className="notice">
              FRESHO একটি কাল্পনিক বাংলাদেশি গ্রোসারি ব্র্যান্ড। এটি CodePixel
              Web-এর তৈরি সম্পূর্ণ frontend ডেমো, কোনো বাস্তব গ্রোসারি ব্যবসা
              নয়।
            </p>
            <div className="heroactions">
              <Link className="btn" href="/shop">
                বাজার ঘুরে দেখুন
              </Link>
              <Link className="textlink" href="/contact">
                কথা বলুন →
              </Link>
            </div>
          </div>
          <div className="detail-image">
            <Image
              src="/images/fresho-hero.webp"
              alt="যত্নে বেছে নেওয়া বাজারের ব্যাগ"
              fill
              priority
              sizes="(max-width:600px) 90vw, 550px"
              style={{ objectFit: "cover", padding: 0 }}
            />
          </div>
        </div>
      </div>
      <Trust />
    </>
  );
}
