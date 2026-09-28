"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, RotateCcw, Search } from "lucide-react";
import { products, inCategory, Product } from "@/data/products";
import { categoryData } from "@/data/categories";
import ProductCard from "./ProductCard";
import Dialog from "./Dialog";
import { searchProducts } from "@/lib/search";
import { bn, money } from "@/lib/commerce";
type Props = {
  title?: string;
  description?: string;
  category?: string;
  initialQuery?: string;
  budget?: string;
  offerOnly?: boolean;
  freshOnly?: boolean;
  ids?: number[];
};
export default function ProductListing({
  title = "সব পণ্য",
  description = "প্রতিদিনের প্রয়োজন, পছন্দমতো বাজার করুন।",
  category = "",
  initialQuery = "",
  budget = "",
  offerOnly = false,
  freshOnly = false,
  ids,
}: Props) {
  const [q, setQ] = useState(initialQuery),
    [cat, setCat] = useState(category),
    [sort, setSort] = useState("popular"),
    [brand, setBrand] = useState(""),
    [weight, setWeight] = useState(""),
    [unit, setUnit] = useState(""),
    [discount, setDiscount] = useState(offerOnly),
    [available, setAvailable] = useState(false),
    [organic, setOrganic] = useState(false),
    [fresh, setFresh] = useState(freshOnly),
    [maxPrice, setMaxPrice] = useState(2000),
    [filterOpen, setFilterOpen] = useState(false);
  const reset = () => {
    setQ("");
    setCat(category);
    setBrand("");
    setWeight("");
    setUnit("");
    setDiscount(offerOnly);
    setAvailable(false);
    setOrganic(false);
    setFresh(freshOnly);
    setMaxPrice(2000);
  };
  const list = useMemo(() => {
    let result = searchProducts(products, q).filter((p) => {
      const terms =
        `${p.name} ${p.category} ${p.brand} ${p.tags.join(" ")}`.toLowerCase();
      const bounds: Record<string, [number, number]> = {
        "0": [0, 100],
        "1": [100, 300],
        "2": [300, 500],
        "3": [500, 1000],
        "4": [1000, Infinity],
      };
      const b = bounds[budget];
      return (
        (!ids || ids.includes(p.id)) &&
        (!cat || inCategory(p, cat)) &&
        (!q ||
          q
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .every((t) => terms.includes(t))) &&
        (!brand || p.brand === brand) &&
        (!weight || p.variants.some((v) => v.unit === weight)) &&
        (!unit || p.variants.some((v) => v.unit.endsWith(unit))) &&
        (!discount || p.oldPrice) &&
        (!available || p.stock > 0) &&
        (!organic || p.organic) &&
        (!fresh || p.fresh) &&
        p.price <= maxPrice &&
        (!b || (p.price >= b[0] && p.price <= b[1]))
      );
    });
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "new") result.sort((a, b) => b.id - a.id);
    if (sort === "popular")
      result.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    if (sort === "discount")
      result.sort(
        (a, b) =>
          (b.oldPrice ? 1 - b.price / b.oldPrice : 0) -
          (a.oldPrice ? 1 - a.price / a.oldPrice : 0),
      );
    return result;
  }, [
    q,
    cat,
    sort,
    brand,
    weight,
    unit,
    discount,
    available,
    organic,
    fresh,
    maxPrice,
    budget,
    ids,
  ]);
  function renderFilters(prefix: string) {
    return (
      <>
        <div className="filter-title" id={`${prefix}-filter-heading`}>
          <h3>ফিল্টার করুন</h3>
          <button onClick={reset} aria-label={`${prefix} ফিল্টার মুছুন`}>
            <RotateCcw size={15} />
          </button>
        </div>
        <label className="filter-label">
          বিভাগ
          <select
            aria-label={`${prefix} বিভাগ`}
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <option value="">সব বিভাগ</option>
            {categoryData.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
            <option value="combos">সাশ্রয়ী কম্বো</option>
          </select>
        </label>
        <label className="filter-label">
          সর্বোচ্চ দাম: {money(maxPrice)}
          <input
            aria-label={`${prefix} সর্বোচ্চ দাম`}
            type="range"
            min="50"
            max="2000"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
        <label className="filter-label">
          ব্র্যান্ড
          <select
            aria-label={`${prefix} ব্র্যান্ড`}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">সব ব্র্যান্ড</option>
            {Array.from(new Set(products.map((p) => p.brand))).map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
        <label className="filter-label">
          ওজন / প্যাক সাইজ
          <select
            aria-label={`${prefix} ওজন`}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          >
            <option value="">সব ওজন</option>
            {Array.from(
              new Set(products.flatMap((p) => p.variants.map((v) => v.unit))),
            ).map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </label>
        <label className="filter-label">
          একক
          <select
            aria-label={`${prefix} একক`}
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="">সব একক</option>
            {["kg", "g", "ml", "L", "pack", "pcs", "bunch"].map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </label>
        {[
          [discount, setDiscount, "ছাড়ের পণ্য"],
          [available, setAvailable, "স্টকে আছে"],
          [organic, setOrganic, "অর্গানিক · ডেমো"],
          [fresh, setFresh, "তাজা পণ্য"],
        ].map(([checked, set, label]) => (
          <label className="check-label" key={String(label)}>
            <input
              type="checkbox"
              aria-label={`${prefix} ${label as string}`}
              checked={checked as boolean}
              onChange={(e) => (set as (v: boolean) => void)(e.target.checked)}
            />
            {label as string}
          </label>
        ))}
      </>
    );
  }
  return (
    <div className="wrap page">
      <div className="crumb">
        <Link href="/">হোম</Link> / <Link href="/shop">বাজার</Link> / {title}
      </div>
      <div className="page-heading">
        <span className="eyebrow">FRESHO নির্বাচন</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {category && (
        <div className="category-chips">
          {categoryData
            .find((c) => c.slug === category)
            ?.subcategories.map((s) => (
              <button
                className={q === s ? "active" : ""}
                key={s}
                onClick={() => setQ(q === s ? "" : s)}
              >
                {s}
              </button>
            ))}
        </div>
      )}
      <div className="listing">
        <aside className="filters">{renderFilters("ডেস্কটপ")}</aside>
        <div className="listing-content">
          <div className="listtop">
            <div className="listing-search">
              <Search size={16} />
              <input
                aria-label="তালিকায় পণ্য খুঁজুন"
                placeholder="এই তালিকায় খুঁজুন..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <button
              className="mobile-filter btn light"
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal size={16} /> ফিল্টার
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="পণ্য সাজান"
            >
              <option value="popular">জনপ্রিয়</option>
              <option value="new">নতুন</option>
              <option value="low">কম দাম থেকে বেশি</option>
              <option value="high">বেশি দাম থেকে কম</option>
              <option value="discount">সর্বাধিক ডিসকাউন্ট</option>
            </select>
          </div>
          <div className="results-count">
            <button className="reset-filters" onClick={reset}>
              ফিল্টার মুছুন
            </button>
            {bn(list.length)}টি পণ্য পাওয়া গেছে{" "}
            {budget && (
              <Link className="textlink" href="/shop">
                · বাজেট ফিল্টার মুছুন
              </Link>
            )}
          </div>
          {list.length ? (
            <div className="productgrid">
              {list.map((p) => (
                <ProductCard product={p} key={p.id} />
              ))}
            </div>
          ) : (
            <div
              className={`empty empty-results ${q || discount || available || organic || fresh || brand || weight || unit || maxPrice < 2000 ? "has-filters" : ""}`}
            >
              <Search size={44} />
              <h2>দুঃখিত, আপনার খোঁজা পণ্যটি পাওয়া যায়নি।</h2>
              <p>অন্য শব্দ লিখুন অথবা ফিল্টার মুছে আবার চেষ্টা করুন।</p>
              <button className="btn" onClick={reset}>
                ফিল্টার মুছুন
              </button>
              <div className="category-chips">
                {["চাল", "ডিম", "দুধ"].map((s) => (
                  <Link href={`/shop?q=${s}`} key={s}>
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="পণ্য ফিল্টার"
        bottom
      >
        <div className="mobile-filters">{renderFilters("মোবাইল")}</div>
        <button
          className="btn"
          style={{ width: "100%" }}
          onClick={() => setFilterOpen(false)}
        >
          {bn(list.length)}টি পণ্য দেখুন
        </button>
      </Dialog>
    </div>
  );
}
