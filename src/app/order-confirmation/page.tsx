"use client";
import Link from "next/link";
import { Check, Package } from "lucide-react";
import { useStore } from "@/components/StoreProvider";
import { money } from "@/lib/commerce";
export default function Confirmation() {
  const { order: o, ready } = useStore();
  if (!ready) return <div className="wrap page">অর্ডার লোড হচ্ছে…</div>;
  return (
    <div className="wrap page">
      {!o ? (
        <div className="empty">
          <Package size={45} />
          <h1>অর্ডারের তথ্য পাওয়া যায়নি</h1>
          <p>এই ব্রাউজার ট্যাবে একটি ডেমো অর্ডার তৈরি করুন।</p>
          <Link href="/shop" className="btn">
            কেনাকাটা শুরু করুন
          </Link>
        </div>
      ) : (
        <div className="orderbox">
          <div className="success-mark">
            <Check size={32} />
          </div>
          <span className="eyebrow">ধন্যবাদ, {o.name}</span>
          <h1>আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে!</h1>
          <p>
            আপনার ডেমো অর্ডারটি তৈরি হয়েছে। বাস্তবে কোনো পণ্য পাঠানো হবে না।
          </p>
          <h2>#{o.id}</h2>
          <p>
            {new Date(o.createdAt).toLocaleDateString("bn-BD")} ·{" "}
            {money(o.total)}
          </p>
          <details className="order-details" open>
            <summary>অর্ডারের বিস্তারিত দেখুন</summary>
            <div className="sumline">
              <span>গ্রাহক</span>
              <b>{o.name}</b>
            </div>
            <div className="sumline">
              <span>মোবাইল</span>
              <b>{o.phone}</b>
            </div>
            <div className="sumline">
              <span>ঠিকানা</span>
              <b>
                {o.address}, {o.area}, {o.district}, {o.division}
              </b>
            </div>
            {o.items.map((x, i) => (
              <div className="sumline" key={i}>
                <span>
                  {x.name} · {x.unit} × {x.quantity}
                </span>
                <b>{money(x.price * x.quantity)}</b>
              </div>
            ))}
            <div className="sumline">
              <span>ডেলিভারি · {o.location}</span>
              <b>{money(o.delivery)}</b>
            </div>
            <div className="sumline total">
              <span>সর্বমোট</span>
              <b>{money(o.total)}</b>
            </div>
            <div className="sumline">
              <span>পেমেন্ট</span>
              <b>{o.payment}</b>
            </div>
          </details>
          <div className="heroactions">
            <Link className="btn" href="/shop">
              আরও কেনাকাটা করুন
            </Link>
            <Link className="btn light" href="/">
              হোমে ফিরে যান
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
