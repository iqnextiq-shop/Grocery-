"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  Home,
  Grid2X2,
  Search,
  ShoppingBasket,
  UserRound,
  MessageCircle,
  Leaf,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Banknote,
} from "lucide-react";
import { useStore } from "./StoreProvider";
import { bn, money } from "@/lib/commerce";
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footgrid">
          <div>
            <Link href="/" className="brand">
              <span className="logo">
                {siteConfig.name}
                <Leaf size={16} fill="currentColor" />
              </span>
              <small>{siteConfig.tagline}</small>
            </Link>
            <p className="footer-description">
              পরিবারের জন্য ভালো বাজার। তাজা পণ্য থেকে
              <br />
              নিত্যপ্রয়োজনীয় সবকিছু, যত্নে বেছে এক জায়গায়।
            </p>
            <span className="footer-payment">
              <Banknote size={19} /> ক্যাশ অন ডেলিভারি
            </span>
          </div>
          <div>
            <h4>কেনাকাটা</h4>
            <Link href="/shop">সব পণ্য</Link>
            <Link href="/fresh">তাজা বাজার</Link>
            <Link href="/offers">আজকের অফার</Link>
            <Link href="/collections/combos">সাশ্রয়ী কম্বো</Link>
            <Link href="/wishlist">পছন্দের তালিকা</Link>
          </div>
          <div>
            <h4>জেনে নিন</h4>
            <Link href="/about">আমাদের কথা</Link>
            <Link href="/faq">সাধারণ জিজ্ঞাসা</Link>
            <Link href="/contact">যোগাযোগ</Link>
            <Link href="/policies">ডেলিভারি ও রিটার্ন</Link>
            <Link href="/policies#privacy">গোপনীয়তা ও ডেমো তথ্য</Link>
          </div>
          <div>
            <h4>যোগাযোগ</h4>
            <a href={`tel:+${siteConfig.whatsapp.number}`}>
              <Phone size={14} /> {siteConfig.whatsapp.displayNumber}
            </a>
            <p>
              <Mail size={14} /> {siteConfig.email} <small>(ডেমো)</small>
            </p>
            <p>
              <MapPin size={14} /> ঢাকা, বাংলাদেশ · কাল্পনিক স্টোর
            </p>
            <small>{siteConfig.footer.hours}</small>
            <p className="delivery-footer">
              ঢাকার ভিতরে {money(siteConfig.delivery.insideDhaka)}
              <br />
              ঢাকার বাইরে {money(siteConfig.delivery.outsideDhaka)} · ডেমো
            </p>
          </div>
        </div>
        <div className="footbottom">
          <span>
            © 2026 {siteConfig.name} · সকল পণ্য, অফার ও ছবি প্রদর্শনীমূলক
          </span>
          <span>
            {siteConfig.footer.credit} <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </footer>
  );
}
export function WhatsApp() {
  return (
    <a
      className="whatsapp"
      href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.cta)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={siteConfig.whatsapp.cta}
    >
      <MessageCircle size={22} />
      <span>{siteConfig.whatsapp.cta}</span>
      <ArrowUpRight size={14} />
    </a>
  );
}
export function MobileNav() {
  const { cart } = useStore();
  const path = usePathname();
  const n = Object.values(cart).reduce((a, b) => a + b, 0);
  const items = [
    { href: "/", Icon: Home, label: "হোম" },
    { href: "/shop", Icon: Grid2X2, label: "ক্যাটাগরি" },
    { href: "/shop?search=1", Icon: Search, label: "সার্চ" },
    {
      href: "/cart",
      Icon: ShoppingBasket,
      label: `কার্ট${n ? ` (${bn(n)})` : ""}`,
    },
    { href: "/account", Icon: UserRound, label: "অ্যাকাউন্ট" },
  ];
  return (
    <nav className="mobilebar" aria-label="মোবাইল নেভিগেশন">
      {items.map(({ href, Icon, label }) => (
        <Link
          href={href}
          key={label}
          className={path === href ? "active" : ""}
          onClick={(e) => {
            if (label === "সার্চ") {
              e.preventDefault();
              document.getElementById("header-search")?.focus();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Icon size={20} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
