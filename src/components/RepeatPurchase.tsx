"use client";
import { useState, useEffect } from "react";
import { products } from "@/data/products";
import { ProductSection } from "./Sections";
export default function RepeatPurchase() {
  const [ids, setIds] = useState<number[]>([]);
  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("fresho-purchased") || "[]",
      );
      if (Array.isArray(stored)) setIds(stored);
    } catch {}
  }, []);
  return (
    <ProductSection
      title="আবার কিনুন"
      subtitle={
        ids.length
          ? "আপনার সর্বশেষ ডেমো অর্ডারের পছন্দগুলো"
          : "নিয়মিত বাজারের পছন্দ · ডেমো তালিকা"
      }
      items={
        ids.length
          ? products.filter((p) => ids.includes(p.id))
          : products.filter((p) => [1, 4, 12, 29, 33].includes(p.id))
      }
    />
  );
}
