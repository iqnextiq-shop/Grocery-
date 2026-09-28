"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Truck, ShieldCheck, ArrowRight, Check } from "lucide-react";
import { Product, getVariant, products } from "@/data/products";
import { useStore } from "./StoreProvider";
import Quantity from "./ProductQuantityControl";
import { money } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import ProductCard from "./ProductCard";
export default function ProductDetail({ product: p }: { product: Product }) {
  const [q, setQ] = useState(1),
    [vid, setVid] = useState("base"),
    [image, setImage] = useState(p.image);
  const { add, wishlist, toggleWish, location } = useStore(),
    router = useRouter();
  const v = getVariant(p, vid);
  const order = () => {
    add(p.id, vid, q);
    router.push("/checkout");
  };
  return (
    <div className="wrap page">
      <div className="crumb">
        <Link href="/">হোম</Link> / <Link href="/shop">বাজার</Link> / {p.name}
      </div>
      <div className="detail-layout">
        <div>
          <div className="detail-image">
            <Image
              src={image}
              alt={p.name}
              fill
              sizes="(max-width:700px) 90vw, 550px"
              priority
            />
            {v.comparePrice && (
              <span className="discount">
                সাশ্রয় {money(v.comparePrice - v.price)}
              </span>
            )}
            <button
              className="heart"
              aria-label="পছন্দের তালিকা"
              aria-pressed={wishlist.includes(p.id)}
              onClick={() => toggleWish(p.id)}
            >
              <Heart
                size={20}
                fill={wishlist.includes(p.id) ? "currentColor" : "none"}
              />
            </button>
          </div>
          {p.images.length > 1 && (
            <div className="thumbnails">
              {p.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setImage(img)}
                  aria-label={`কম্বোর ছবি ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`কম্বোর পণ্য ${i + 1}`}
                    width={75}
                    height={75}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="detail-copy">
          <span className="eyebrow">
            {p.category} · {p.brand}
          </span>
          <h1>{p.name}</h1>
          <div className="stock-line">
            {v.stock ? (
              <>
                <Check size={15} /> স্টকে আছে
              </>
            ) : (
              "স্টকে নেই"
            )}{" "}
            <span>SKU: FRS-{p.id}</span>
          </div>
          <div className="price detail-price">
            {money(v.price)} <span className="priceunit">/ {v.unit}</span>
            {v.comparePrice && (
              <span className="old">{money(v.comparePrice)}</span>
            )}
          </div>
          <p className="muted">{p.description}</p>
          <fieldset className="variants">
            <legend>ওজন / প্যাক সাইজ নির্বাচন করুন</legend>
            {p.variants.map((v) => (
              <button
                className={v.id === vid ? "selected" : ""}
                type="button"
                aria-pressed={v.id === vid}
                onClick={() => {
                  setVid(v.id);
                  setQ(1);
                }}
                key={v.id}
              >
                <strong>{v.unit}</strong>
                <span>{money(v.price)}</span>
              </button>
            ))}
          </fieldset>
          <div className="detail-quantity">
            <b>পরিমাণ</b>
            <Quantity
              quantity={q}
              onChange={(n) => setQ(Math.max(1, n))}
              max={v.stock}
              label="পণ্যের পরিমাণ"
            />
          </div>
          <div className="detail-actions">
            <button
              className="btn"
              disabled={!v.stock}
              onClick={() => add(p.id, vid, q)}
            >
              কার্টে যোগ করুন <ArrowRight size={17} />
            </button>
            <button className="btn light" disabled={!v.stock} onClick={order}>
              এখনই অর্ডার করুন
            </button>
          </div>
          <div className="detail-service">
            <Truck size={22} />
            <div>
              <b>{location}-এ ডেলিভারি</b>
              <p>
                ঢাকার ভিতরে {money(siteConfig.delivery.insideDhaka)} · বাইরে{" "}
                {money(siteConfig.delivery.outsideDhaka)}।{" "}
                {money(siteConfig.delivery.freeThreshold)} থেকে ডেলিভারি ফ্রি।
                সবই ডেমো চার্জ।
              </p>
            </div>
          </div>
          <div className="detail-service">
            <ShieldCheck size={22} />
            <div>
              <b>ক্যাশ অন ডেলিভারি</b>
              <p>অ্যাকাউন্ট ছাড়াই অর্ডার। কোনো বাস্তব লেনদেন হবে না।</p>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-info">
        <h2>পণ্যের বিস্তারিত</h2>
        <dl>
          {Object.entries(p.info).map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <details>
          <summary>ডেলিভারি তথ্য</summary>
          <p>
            ডেমোতে {siteConfig.locations.join(", ")} নির্বাচন করা যায়। এলাকা
            অনুযায়ী আনুমানিক ১–৩ দিনের ডেমো সেবা; এটি বাস্তব সময়ের প্রতিশ্রুতি
            নয়।
          </p>
        </details>
        <details>
          <summary>রিটার্ন / রিফান্ড তথ্য</summary>
          <p>
            বাস্তব দোকানে পণ্য গ্রহণের সময় যাচাই করুন। এই ডেমোতে কোনো টাকা কাটা
            বা ফেরত দেওয়া হয় না। বিস্তারিত জানতে{" "}
            <Link href="/contact">যোগাযোগ</Link> করুন।
          </p>
        </details>
      </div>
      <section className="section">
        <div className="sectionhead">
          <h2>সাথে নিতে পারেন</h2>
          <Link className="textlink" href="/shop">
            সব দেখুন →
          </Link>
        </div>
        <div className="productgrid">
          {products
            .filter((x) => x.categorySlug === p.categorySlug && x.id !== p.id)
            .slice(0, 5)
            .map((x) => (
              <ProductCard product={x} key={x.id} />
            ))}
        </div>
      </section>
    </div>
  );
}
