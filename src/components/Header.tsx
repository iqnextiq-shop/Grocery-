"use client";
import Link from "next/link";
import {
  Search,
  ShoppingBasket,
  Heart,
  UserRound,
  MapPin,
  Menu,
  ChevronDown,
  Grid2X2,
  Tag,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "./StoreProvider";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import { categoryData } from "@/data/categories";
import { bn, money } from "@/lib/commerce";
import Dialog from "./Dialog";
import { searchProducts } from "@/lib/search";
export default function Header() {
  const [query, setQuery] = useState(""),
    [menu, setMenu] = useState(false),
    [locOpen, setLocOpen] = useState(false),
    [searchOpen, setSearchOpen] = useState(false);
  const { cart, location, setLocation } = useStore();
  const path = usePathname();
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const suggestions = searchProducts(products, query).slice(0, 5);
  return (
    <header className="header">
      <div className="wrap headrow">
        <Link href="/" className="brand" aria-label="FRESHO হোম">
          <span className="logo">
            FRESHO
            <span className="logo-leaf">
              <Leaf size={17} fill="currentColor" />
            </span>
          </span>
          <small>{siteConfig.tagline}</small>
        </Link>
        <button className="delivery" onClick={() => setLocOpen(true)}>
          <MapPin size={19} />
          <span>
            ডেলিভারি লোকেশন
            <strong>
              {location} <ChevronDown size={12} />
            </strong>
          </span>
        </button>
        <div className="search-wrap">
          <form
            className="search"
            action="/shop"
            onSubmit={() => setSearchOpen(false)}
          >
            <Search size={18} />
            <input
              id="header-search"
              name="q"
              value={query}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 180)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setSearchOpen(false);
              }}
              placeholder="আপনি কী খুঁজছেন? চাল, ডাল, দুধ..."
              aria-label="পণ্য খুঁজুন"
              autoComplete="off"
            />
            <button aria-label="সার্চ করুন">
              <Search size={19} />
            </button>
          </form>
          {searchOpen && (
            <div className="search-suggestions">
              {query ? (
                <>
                  <small>মিলে যাওয়া পণ্য</small>
                  {suggestions.length ? (
                    suggestions.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={() => setSearchOpen(false)}
                      >
                        {p.name}
                        <span>
                          {money(p.price)} / {p.unit}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p>কোনো পণ্য পাওয়া যায়নি। অন্য শব্দ লিখুন।</p>
                  )}
                  <Link
                    href={`/shop?q=${encodeURIComponent(query)}`}
                    onClick={() => setSearchOpen(false)}
                  >
                    সব ফলাফল দেখুন <ArrowRight size={15} />
                  </Link>
                </>
              ) : (
                <>
                  <small>জনপ্রিয় সার্চ</small>
                  <div className="popular-search">
                    {["চাল", "ডিম", "দুধ", "তেল", "সবজি"].map((q) => (
                      <Link
                        href={`/shop?q=${encodeURIComponent(q)}`}
                        key={q}
                        onClick={() => setSearchOpen(false)}
                      >
                        {q}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="headlinks">
          <Link
            className="iconbtn wishlist-head"
            href="/wishlist"
            aria-label="পছন্দের তালিকা"
          >
            <Heart size={21} />
          </Link>
          <Link className="iconbtn account-head" href="/account">
            <UserRound size={20} />
            <span className="label">অ্যাকাউন্ট</span>
          </Link>
          <Link
            className="cartpill"
            href="/cart"
            aria-label={`কার্ট ${count} পণ্য`}
          >
            <ShoppingBasket size={21} />
            <span className="label">আমার কার্ট</span>
            <b>{bn(count)}</b>
          </Link>
          <button
            className="iconbtn menu-toggle"
            onClick={() => setMenu(true)}
            aria-label="মেনু খুলুন"
          >
            <Menu size={23} />
          </button>
        </div>
      </div>
      <div className="nav-border">
        <nav className="wrap navrow" aria-label="মূল নেভিগেশন">
          <button className="allcategories" onClick={() => setMenu(true)}>
            <Grid2X2 size={16} /> সব ক্যাটাগরি <ChevronDown size={13} />
          </button>
          {[
            ["/", "হোম"],
            ["/shop", "সব পণ্য"],
            ["/fresh", "তাজা বাজার"],
            ["/offers", "আজকের অফার"],
            ["/collections/weekly", "সাশ্রয়ী কম্বো"],
            ["/about", "আমাদের কথা"],
          ].map(([href, label]) => (
            <Link
              href={href}
              key={href}
              className={path === href ? "active" : ""}
            >
              {href === "/offers" && <Tag size={13} />} {label}
            </Link>
          ))}
          <span className="nav-delivery">
            <TruckIcon /> ঘরে বসে বাজার, নিশ্চিন্তে
          </span>
        </nav>
      </div>
      <div className="mobile-location">
        <button onClick={() => setLocOpen(true)}>
          <MapPin size={12} /> ডেলিভারি: {location} <ChevronDown size={12} />
        </button>
        <span>ক্যাশ অন ডেলিভারি</span>
      </div>
      <Dialog
        open={locOpen}
        onClose={() => setLocOpen(false)}
        title="ডেলিভারি লোকেশন"
      >
        <p className="muted">আপনার ডেমো ডেলিভারি এলাকা বেছে নিন।</p>
        {siteConfig.locations.map((l) => (
          <button
            key={l}
            className={`location-option ${l === location ? "selected" : ""}`}
            onClick={() => {
              setLocation(l);
              setLocOpen(false);
            }}
          >
            <MapPin size={18} />
            {l}
            <span>
              {money(
                l === "ঢাকা"
                  ? siteConfig.delivery.insideDhaka
                  : siteConfig.delivery.outsideDhaka,
              )}
            </span>
          </button>
        ))}
        <p className="notice">
          এটি ডেমো এলাকা নির্বাচন। বাস্তব লোকেশন বা কুরিয়ার সংযোগ নেই।
        </p>
      </Dialog>
      <Dialog
        open={menu}
        onClose={() => setMenu(false)}
        title="আপনার বাজারের বিভাগ"
      >
        {categoryData.map((c) => (
          <Link
            className="menu-link"
            href={`/category/${c.slug}`}
            key={c.slug}
            onClick={() => setMenu(false)}
          >
            {c.name}
            <ArrowRight size={15} />
          </Link>
        ))}
        <Link
          className="menu-link"
          href="/contact"
          onClick={() => setMenu(false)}
        >
          যোগাযোগ →
        </Link>
      </Dialog>
    </header>
  );
}
function TruckIcon() {
  return <ShoppingBasket size={14} />;
}
