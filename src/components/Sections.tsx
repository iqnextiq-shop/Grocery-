import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Leaf,
  Package,
  Truck,
  HeartHandshake,
  Sun,
  ChefHat,
  ShoppingBasket,
  House,
  Salad,
  Coffee,
  Star,
  Quote,
} from "lucide-react";
import { products } from "@/data/products";
import { categoryData } from "@/data/categories";
import { collections, reviews, faqs } from "@/data/content";
import { money } from "@/lib/commerce";
import ProductCard from "./ProductCard";
export function CategorySection() {
  return (
    <section className="section wrap">
      <div className="sectionhead">
        <div>
          <h2>ক্যাটাগরি অনুযায়ী কিনুন</h2>
          <p>যা প্রয়োজন, খুঁজে নিন সহজেই</p>
        </div>
        <Link className="textlink" href="/shop">
          সব ক্যাটাগরি <ArrowRight size={15} />
        </Link>
      </div>
      <div className="catgrid">
        {categoryData.slice(0, 12).map((c) => (
          <Link className="cat" href={`/category/${c.slug}`} key={c.slug}>
            <div className="category-image">
              <Image src={c.image} width={90} height={80} alt={c.name} />
            </div>
            <span>{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
export function Needs() {
  const icons = [Sun, ChefHat, ShoppingBasket, House, Salad, Coffee];
  return (
    <section className="section wrap">
      <div className="sectionhead">
        <h2>কী কিনতে চান?</h2>
        <p className="section-side-note">আপনার দিনের সঙ্গে মানানসই বাজার</p>
      </div>
      <div className="needs">
        {[
          collections[1],
          collections[2],
          collections[0],
          ...collections.slice(3),
        ].map((c, i) => {
          const Icon = icons[i];
          return (
            <Link
              className={`need need-${i}`}
              href={`/collections/${c.slug}`}
              key={c.slug}
            >
              <Icon size={25} strokeWidth={1.4} />
              <span>
                {c.name === "পরিবারের সাপ্তাহিক বাজার"
                  ? "সপ্তাহের বাজার"
                  : c.name}
              </span>
              <ArrowRight size={14} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
export function ProductSection({
  title,
  subtitle,
  items,
  link = "/shop",
  tone = "",
}: {
  title: string;
  subtitle?: string;
  items: typeof products;
  link?: string;
  tone?: string;
}) {
  return (
    <section className={`section ${tone}`}>
      <div className="wrap">
        <div className="sectionhead">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <Link className="textlink" href={link}>
            সব দেখুন <ArrowRight size={15} />
          </Link>
        </div>
        <div className="productgrid">
          {items.slice(0, 5).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
export function FreshBanner() {
  return (
    <section className="section wrap">
      <div className="freshbanner">
        <div className="freshcopy">
          <span className="eyebrow">
            <Leaf size={15} /> মাটির ঘ্রাণে, সতেজতার টানে
          </span>
          <h2>
            তাজা বাজার,
            <br />
            পরিবারের ভালোবাসায়
          </h2>
          <p>
            মৌসুমি ফল, সবজি, মাছ ও মাংস।
            <br />
            প্রতিদিনের খাবারে থাকুক তাজা স্বাদের ছোঁয়া।
          </p>
          <Link className="btn" href="/fresh">
            তাজা বাজার দেখুন <ArrowRight size={16} />
          </Link>
          <small>তাজা সংগ্রহের লেবেল ও ছবি ডেমো</small>
        </div>
        <div className="freshphoto">
          <Image
            src="/images/fresho-hero.webp"
            fill
            sizes="(max-width:600px) 90vw, 600px"
            alt="ব্যাগভর্তি মৌসুমি সবজি ও ফল"
          />
        </div>
      </div>
    </section>
  );
}
export function Bundles() {
  return (
    <section className="section wrap">
      <div className="sectionhead">
        <div>
          <h2>একসাথে কিনুন, বেশি বাঁচান</h2>
          <p>পরিবারের জন্য সাশ্রয়ী কম্বো · ডেমো অফার</p>
        </div>
        <Link className="textlink" href="/collections/combos">
          সব কম্বো <ArrowRight size={15} />
        </Link>
      </div>
      <div className="bundles">
        {products
          .filter((p) => p.bundleItems)
          .map((p, i) => (
            <article className={`bundle bundle-${i}`} key={p.id}>
              <div className="bundle-top">
                <span className="eyebrow">FRESHO কম্বো</span>
                <span className="saving">
                  সাশ্রয় {money((p.oldPrice || 0) - p.price)}
                </span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="bundle-images">
                {p.images.map((image, i) => (
                  <Image
                    key={i}
                    src={image}
                    width={75}
                    height={80}
                    alt={
                      products.find((x) => x.id === p.bundleItems?.[i])?.name ||
                      "কম্বোর পণ্য"
                    }
                  />
                ))}
              </div>
              <div className="bundle-bottom">
                <div className="price">
                  {money(p.price)}{" "}
                  <span className="old">{money(p.oldPrice || 0)}</span>
                  <small>/ 1 pack</small>
                </div>
                <Link className="btn small" href={`/product/${p.slug}`}>
                  কম্বো নিন <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
export function Trust() {
  const items = [
    { Icon: Leaf, title: "যত্নে বাছাই", text: "প্রয়োজনীয় পণ্যের সংগ্রহ" },
    { Icon: Package, title: "নিরাপদ প্যাকেজিং", text: "গুছিয়ে পৌঁছানোর যত্ন" },
    { Icon: Truck, title: "সহজ ডেলিভারি", text: "আপনার দোরগোড়ায় বাজার" },
    {
      Icon: HeartHandshake,
      title: "সহজ সহায়তা",
      text: "প্রশ্ন থাকলে পাশে আছি",
    },
  ];
  return (
    <section className="section wrap">
      <div className="trustgrid">
        {items.map(({ Icon, title, text }) => (
          <div className="trust" key={title}>
            <span className="trusticon">
              <Icon size={23} strokeWidth={1.5} />
            </span>
            <div>
              <b>{title}</b>
              <small>{text}</small>
            </div>
          </div>
        ))}
      </div>
      <p className="trust-demo">FRESHO-এর প্রস্তাবিত ডেমো সেবার বৈশিষ্ট্য</p>
    </section>
  );
}
export function Reviews() {
  return (
    <section className="section wrap">
      <div className="sectionhead">
        <div>
          <h2>ভালো লাগার কিছু কথা</h2>
          <p>যেমন হতে পারে আপনার বাজারের অভিজ্ঞতা</p>
        </div>
        <span className="demo-badge">কাল্পনিক ডেমো রিভিউ</span>
      </div>
      <div className="reviewgrid">
        {reviews.map((r) => (
          <article className="review" key={r.name}>
            <div className="stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
            <p>“{r.text}”</p>
            <div className="review-person">
              <span>{r.initial}</span>
              <div>
                <b>{r.name}</b>
                <small>{r.area} · ডেমো</small>
              </div>
              <Quote size={23} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function FAQ() {
  return (
    <section className="section wrap faq-section">
      <div className="faq-intro">
        <span className="eyebrow">একটু জেনে নিন</span>
        <h2>
          আপনার প্রশ্ন,
          <br />
          আমাদের উত্তর
        </h2>
        <p>
          কেনাকাটা হোক আরও সহজ।
          <br />
          প্রয়োজনে আমরা আছি পাশে।
        </p>
        <Link className="textlink" href="/contact">
          আমাদের সাথে কথা বলুন <ArrowRight size={15} />
        </Link>
      </div>
      <div className="faq">
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span>+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
