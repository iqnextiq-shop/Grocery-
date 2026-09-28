"use client";
import { useStore } from "@/components/StoreProvider";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
export default function Wishlist() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <div className="wrap page">
      <div className="crumb">
        <Link href="/">হোম</Link> / পছন্দের তালিকা
      </div>
      <h1>আপনার পছন্দের পণ্য</h1>
      {items.length ? (
        <div className="productgrid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <div className="emptyicon">♡</div>
          <h2>আপনার পছন্দের পণ্যগুলো এখানে সংরক্ষণ করুন।</h2>
          <Link className="btn" href="/shop">
            পণ্য দেখুন
          </Link>
        </div>
      )}
    </div>
  );
}
