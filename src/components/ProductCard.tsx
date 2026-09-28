"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import { Product, getVariant } from "@/data/products";
import { useStore } from "./StoreProvider";
import Quantity from "./ProductQuantityControl";
import { cartKey, money, bn } from "@/lib/commerce";
export default function ProductCard({ product: p }: { product: Product }) {
  const { cart, add, setQty, wishlist, toggleWish } = useStore();
  const [vid, setVid] = useState("base");
  const v = getVariant(p, vid),
    key = cartKey(p.id, vid),
    q = cart[key] || 0;
  return (
    <article className="product">
      <Link href={`/product/${p.slug}`} className="pimage">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width:600px) 45vw, (max-width:1000px) 25vw, 220px"
        />
        {v.comparePrice && (
          <span className="discount">
            {bn(Math.round((1 - v.price / v.comparePrice) * 100))}% ছাড়
          </span>
        )}
      </Link>
      <button
        className={`heart ${wishlist.includes(p.id) ? "saved" : ""}`}
        onClick={() => toggleWish(p.id)}
        aria-pressed={wishlist.includes(p.id)}
        aria-label={`${p.name} পছন্দের তালিকায় ${wishlist.includes(p.id) ? "থেকে সরান" : "যোগ করুন"}`}
      >
        <Heart
          size={16}
          fill={wishlist.includes(p.id) ? "currentColor" : "none"}
        />
      </button>
      <div className="product-meta">
        {p.stock ? (
          <span>
            {p.bestseller
              ? "জনপ্রিয় পছন্দ"
              : p.fresh
                ? "তাজা সংগ্রহ · ডেমো"
                : "স্টকে আছে"}
          </span>
        ) : (
          <span className="outstock">স্টকে নেই</span>
        )}
      </div>
      <Link href={`/product/${p.slug}`}>
        <h3 className="pname">{p.name}</h3>
      </Link>
      <select
        className="variant-select"
        value={vid}
        onChange={(e) => setVid(e.target.value)}
        aria-label={`${p.name} ওজন`}
        disabled={p.variants.length === 1}
      >
        {p.variants.map((v) => (
          <option key={v.id} value={v.id}>
            {v.unit}
          </option>
        ))}
      </select>
      <div className="price">
        {money(v.price)} <span className="priceunit">/ {v.unit}</span>
        {v.comparePrice && <span className="old">{money(v.comparePrice)}</span>}
      </div>
      {q ? (
        <Quantity
          quantity={q}
          max={v.stock}
          onChange={(n) => setQty(key, n)}
          label={p.name}
        />
      ) : (
        <button
          className="add"
          disabled={!v.stock}
          onClick={() => add(p.id, vid)}
        >
          <Plus size={15} /> {v.stock ? "কার্টে যোগ করুন" : "স্টকে নেই"}
        </button>
      )}
      <Link href={`/product/${p.slug}?order=1`} className="quick-order">
        এখনই অর্ডার করুন →
      </Link>
    </article>
  );
}
