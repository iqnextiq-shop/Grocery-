"use client";
import { useStore } from "@/components/StoreProvider";
import { deliveryFee, siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Banknote, ShieldCheck } from "lucide-react";
import { cartLines, money, Order } from "@/lib/commerce";
import OrderSummary from "@/components/OrderSummary";
export default function Checkout() {
  const { cart, ready, location, placeOrder } = useStore(),
    router = useRouter();
  const [inside, setInside] = useState(location === "ঢাকা"),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  useEffect(() => setInside(location === "ঢাকা"), [location]);
  const lines = cartLines(cart),
    subtotal = lines.reduce((s, l) => s + l.variant.price * l.quantity, 0),
    fee = deliveryFee(subtotal, inside),
    savings = lines.reduce(
      (s, l) =>
        s +
        ((l.variant.comparePrice || l.variant.price) - l.variant.price) *
          l.quantity,
      0,
    );
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    const value = (name: string) => String(fd.get(name) || "").trim();
    const phone = value("phone")
      .replace(/[০-৯]/g, (c) => String("০১২৩৪৫৬৭৮৯".indexOf(c)))
      .replace(/[\s-]/g, "")
      .replace(/^\+88/, "");
    if (!/^01[3-9]\d{8}$/.test(phone)) {
      setError("সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর লিখুন।");
      return;
    }
    if (
      ["name", "district", "area", "address"].some((k) => value(k).length < 2)
    ) {
      setError("নাম ও ঠিকানার সব তথ্য সম্পূর্ণ লিখুন।");
      return;
    }
    setBusy(true);
    const order: Order = {
      id: `FRS-${Date.now().toString(36).slice(-6).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      name: value("name"),
      phone,
      division: value("division"),
      district: value("district"),
      area: value("area"),
      address: value("address"),
      location: inside ? "ঢাকার ভিতরে" : "ঢাকার বাইরে",
      items: lines.map((l) => ({
        id: l.product.id,
        name: l.product.name,
        unit: l.variant.unit,
        quantity: l.quantity,
        price: l.variant.price,
        image: l.product.image,
      })),
      subtotal,
      delivery: fee,
      total: subtotal + fee,
      payment: "ক্যাশ অন ডেলিভারি",
    };
    placeOrder(order);
    router.push("/order-confirmation");
  }
  if (!ready) return <div className="wrap page">কার্ট লোড হচ্ছে…</div>;
  if (!lines.length && !busy)
    return (
      <div className="wrap page empty">
        <h1>আপনার কার্টে কোনো পণ্য নেই</h1>
        <Link className="btn" href="/shop">
          কেনাকাটা শুরু করুন
        </Link>
      </div>
    );
  return (
    <div className="wrap page">
      <div className="crumb">
        <Link href="/cart">কার্ট</Link> / অর্ডার সম্পন্ন করুন
      </div>
      <h1>অর্ডার সম্পন্ন করুন</h1>
      <p className="checkout-notice">
        <ShieldCheck size={18} /> অ্যাকাউন্ট লাগবে না। এটি ডেমো—তথ্য কোথাও
        পাঠানো হবে না। আসল ব্যক্তিগত তথ্য ব্যবহার না করাই ভালো।
      </p>
      <div className="cartlayout">
        <form className="formgrid checkout-form" onSubmit={submit}>
          <h2 className="field full">গ্রাহকের তথ্য</h2>
          <div className="field">
            <label htmlFor="name">নাম *</label>
            <input
              id="name"
              name="name"
              required
              minLength={2}
              autoComplete="name"
              placeholder="আপনার নাম"
            />
          </div>
          <div className="field">
            <label htmlFor="phone">মোবাইল নম্বর *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              required
              autoComplete="tel"
              placeholder="01XXXXXXXXX"
            />
          </div>
          <h2 className="field full">ডেলিভারি ঠিকানা</h2>
          <div className="field">
            <label htmlFor="division">বিভাগ *</label>
            <select
              id="division"
              name="division"
              defaultValue={location === "চট্টগ্রাম" ? "চট্টগ্রাম" : "ঢাকা"}
              required
            >
              {[
                "ঢাকা",
                "চট্টগ্রাম",
                "রাজশাহী",
                "খুলনা",
                "বরিশাল",
                "সিলেট",
                "রংপুর",
                "ময়মনসিংহ",
              ].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="district">জেলা *</label>
            <input
              id="district"
              name="district"
              required
              defaultValue={location}
              autoComplete="address-level2"
            />
          </div>
          <div className="field">
            <label htmlFor="area">এলাকা *</label>
            <input
              id="area"
              name="area"
              required
              placeholder="এলাকা / থানা"
              autoComplete="address-level3"
            />
          </div>
          <div className="field">
            <label htmlFor="delivery-area">ডেলিভারি এলাকা *</label>
            <select
              id="delivery-area"
              value={inside ? "inside" : "outside"}
              onChange={(e) => setInside(e.target.value === "inside")}
            >
              <option value="inside">
                ঢাকার ভিতরে · {money(siteConfig.delivery.insideDhaka)}
              </option>
              <option value="outside">
                ঢাকার বাইরে · {money(siteConfig.delivery.outsideDhaka)}
              </option>
            </select>
          </div>
          <div className="field full">
            <label htmlFor="address">সম্পূর্ণ ঠিকানা *</label>
            <textarea
              id="address"
              name="address"
              required
              minLength={5}
              rows={3}
              autoComplete="street-address"
              placeholder="বাড়ি/রোড নম্বর, পরিচিত স্থান"
            />
          </div>
          <h2 className="field full">পেমেন্ট পদ্ধতি</h2>
          <label className="payment-option field full">
            <input type="radio" name="payment" value="cod" defaultChecked />
            <Banknote size={25} />
            <span>
              <b>ক্যাশ অন ডেলিভারি</b>
              <small>পণ্য হাতে পেয়ে মূল্য পরিশোধ · ডেমো</small>
            </span>
          </label>
          {error && (
            <p className="form-error field full" role="alert">
              {error}
            </p>
          )}
          <p className="field full privacy-note">
            ডেমো অর্ডারের তথ্য এই ব্রাউজার ট্যাবের session storage-এ থাকে। ট্যাব
            বন্ধ করলে তা মুছে যায়।
          </p>
          <button
            className="btn field full confirm-button"
            type="submit"
            disabled={busy}
          >
            {busy
              ? "অর্ডার তৈরি হচ্ছে…"
              : `অর্ডার নিশ্চিত করুন · ${money(subtotal + fee)}`}
          </button>
        </form>
        <div>
          <div className="checkout-items">
            <h3>আপনার পণ্য</h3>
            {lines.map((l) => (
              <div className="sumline" key={l.key}>
                <span>
                  {l.product.name}
                  <small>
                    {l.variant.unit} × {l.quantity}
                  </small>
                </span>
                <b>{money(l.variant.price * l.quantity)}</b>
              </div>
            ))}
          </div>
          <OrderSummary
            subtotal={subtotal}
            savings={savings}
            insideDhaka={inside}
          />
        </div>
      </div>
    </div>
  );
}
