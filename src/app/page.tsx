import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Truck, Tag } from "lucide-react";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";
import { money } from "@/lib/commerce";
import {
  CategorySection,
  Needs,
  ProductSection,
  FreshBanner,
  Bundles,
  Trust,
  Reviews,
  FAQ,
} from "@/components/Sections";
import RepeatPurchase from "@/components/RepeatPurchase";
import Newsletter from "@/components/Newsletter";
export default function Home() {
  return (
    <>
      <div className="wrap">
        <section className="hero">
          <div className="hero-image">
            <Image
              src="/images/fresho-hero.webp"
              fill
              sizes="(max-width:600px) 100vw, 750px"
              alt="টাটকা সবজি, ফল ও দুধভর্তি বাজারের ব্যাগ"
              priority
            />
          </div>
          <div className="herotext">
            <span className="hero-kicker">
              <Leaf size={14} /> সতেজতায় শুরু, স্বস্তিতে বাজার
            </span>
            <h1>
              প্রতিদিনের প্রয়োজন,
              <br />
              এখন <em>আরও সহজ।</em>
            </h1>
            <p>
              তাজা খাবার, নিত্যপ্রয়োজনীয় পণ্য ও পরিবারের প্রয়োজনীয়
              <br className="desktop-break" /> সবকিছু—অর্ডার করুন ঘরে বসেই।
            </p>
            <div className="heroactions">
              <Link className="btn" href="/shop">
                এখনই কেনাকাটা করুন <ArrowRight size={17} />
              </Link>
              <Link className="hero-secondary" href="/offers">
                আজকের অফার দেখুন <ArrowRight size={15} />
              </Link>
            </div>
            <div className="hero-points">
              <span>
                <ShieldCheck size={15} /> বাছাই করা পণ্য
              </span>
              <span>
                <Truck size={16} /> সহজ হোম ডেলিভারি
              </span>
            </div>
          </div>
          <div className="hero-note">
            <span className="hero-note-icon">
              <Leaf size={20} />
            </span>
            <span>
              <strong>ভালো বাজার, ভালো দিন</strong>
              <small>আপনার পরিবারের জন্য</small>
            </span>
          </div>
          <span className="hero-counter">
            <b>01</b> / 01 <i />
          </span>
        </section>
        <div className="mini-benefits">
          <span>
            <Truck size={18} />
            {money(siteConfig.delivery.freeThreshold)} থেকে ডেলিভারি ফ্রি{" "}
            <small>· ডেমো</small>
          </span>
          <span>
            <ShieldCheck size={17} />
            ক্যাশ অন ডেলিভারি
          </span>
          <span>
            <Leaf size={17} />
            প্রতিদিনের প্রয়োজন, এক জায়গায়
          </span>
        </div>
      </div>
      <CategorySection />
      <Needs />
      <section className="deal-container">
        <div className="wrap deal-heading">
          <span className="offer-kicker">
            <Tag size={13} /> একটু কমে, একটু বেশি
          </span>
          <span className="demo-badge">বিশেষ ডেমো অফার</span>
        </div>
        <ProductSection
          title="আজকের সেরা অফার"
          subtitle="আপনার চেনা বাজারে, বাড়তি সাশ্রয়"
          items={[1, 4, 12, 33, 29].map((id) =>
            products.find((p) => p.id === id)!,
          )}
          link="/offers"
        />
      </section>
      <FreshBanner />
      <ProductSection
        title="সবচেয়ে বেশি কেনা হচ্ছে"
        subtitle="প্রতিদিনের বাজারে সবার পছন্দ"
        items={products.filter((p) => p.bestseller)}
      />
      <Bundles />
      <ProductSection
        title="নতুন এসেছে"
        subtitle="বাজারের তালিকায় নতুন কিছু যোগ হোক"
        items={products.filter((p) => p.newArrival)}
      />
      <section className="wrap section budget-section">
        <div>
          <span className="eyebrow">বাজেট থাকুক আপনার হাতে</span>
          <h2>আপনার বাজেট অনুযায়ী</h2>
        </div>
        <div className="budget-options">
          {[
            "৳১০০-এর মধ্যে",
            "৳১০০–৳৩০০",
            "৳৩০০–৳৫০০",
            "৳৫০০–৳১,০০০",
            "৳১,০০০+",
          ].map((x, i) => (
            <Link href={`/shop?budget=${i}`} key={x}>
              {x}
              <ArrowRight size={14} />
            </Link>
          ))}
        </div>
      </section>
      <ProductSection
        title="স্বাস্থ্যকর পছন্দ"
        subtitle="বাদাম, মধু ও দিনের ভালো লাগার নাশতা"
        items={products.filter((p) =>
          ["nuts", "honey", "dates", "oats"].includes(p.subCategory),
        )}
        link="/category/healthy"
      />
      <RepeatPurchase />
      <Trust />
      <Reviews />
      <FAQ />
      <Newsletter />
    </>
  );
}
