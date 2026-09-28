"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBasket, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/components/StoreProvider";
import { cartLines, money } from "@/lib/commerce";
import Quantity from "@/components/ProductQuantityControl";
import OrderSummary from "@/components/OrderSummary";
import { siteConfig } from "@/config/site";
export default function Cart() {
  const { cart, setQty, remove, ready, location, setLocation } = useStore();
  const lines = cartLines(cart),
    subtotal = lines.reduce((s, l) => s + l.variant.price * l.quantity, 0),
    savings = lines.reduce(
      (s, l) =>
        s +
        ((l.variant.comparePrice || l.variant.price) - l.variant.price) *
          l.quantity,
      0,
    );
  return (
    <div className="wrap page">
      <div className="crumb">
        <Link href="/">হোম</Link> / কার্ট
      </div>
      <h1>আপনার বাজারের ঝুড়ি</h1>
      {!ready ? (
        <p>আপনার কার্ট লোড হচ্ছে…</p>
      ) : !lines.length ? (
        <div className="empty">
          <ShoppingBasket size={50} />
          <h2>আপনার কার্ট এখনো খালি।</h2>
          <p>প্রতিদিনের প্রয়োজনীয় পণ্যগুলো বেছে বাজার শুরু করুন।</p>
          <Link className="btn" href="/shop">
            কেনাকাটা শুরু করুন <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="cartlayout">
          <div>
            {lines.map(({ key, product: p, variant: v, quantity: q }) => (
              <div className="cartrow" key={key}>
                <Link href={`/product/${p.slug}`}>
                  <Image src={p.image} alt={p.name} width={86} height={86} />
                </Link>
                <div className="cartinfo">
                  <Link href={`/product/${p.slug}`}>
                    <b>{p.name}</b>
                  </Link>
                  <div className="unit">
                    {v.unit} · {money(v.price)} / {v.unit}
                  </div>
                  <div className="price">{money(v.price * q)}</div>
                </div>
                <Quantity
                  quantity={q}
                  onChange={(n) => setQty(key, n)}
                  max={v.stock}
                  label={p.name}
                />
                <button
                  className="iconbtn remove"
                  onClick={() => remove(key)}
                  aria-label={`${p.name} সরান`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
            <div className="cart-location">
              <label htmlFor="cart-location">ডেলিভারি এলাকা</label>
              <select
                id="cart-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {siteConfig.locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <Link href="/shop" className="textlink">
              ← আরও বাজার করুন
            </Link>
          </div>
          <OrderSummary
            subtotal={subtotal}
            savings={savings}
            insideDhaka={location === "ঢাকা"}
          >
            <Link className="btn full-width" href="/checkout">
              অর্ডার সম্পন্ন করুন <ArrowRight size={17} />
            </Link>
          </OrderSummary>
        </div>
      )}
    </div>
  );
}
