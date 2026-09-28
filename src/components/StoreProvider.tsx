"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { products, getVariant } from "@/data/products";
import { Cart, Order, cartKey, cartLines } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
type Store = {
  cart: Cart;
  wishlist: number[];
  ready: boolean;
  location: string;
  setLocation: (s: string) => void;
  add: (id: number, variant?: string, quantity?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, q: number) => void;
  toggleWish: (id: number) => void;
  notify: (s: string, cartLink?: boolean) => void;
  clearCart: () => void;
  order: Order | null;
  placeOrder: (o: Order) => void;
};
const C = createContext<Store | null>(null);
export function useStore() {
  const v = useContext(C);
  if (!v) throw new Error("Store provider missing");
  return v;
}
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart>({}),
    [wishlist, setWishlist] = useState<number[]>([]),
    [ready, setReady] = useState(false),
    [location, setLocation] = useState("ঢাকা"),
    [order, setOrder] = useState<Order | null>(null),
    [toast, setToast] = useState({ text: "", cartLink: false });
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("fresho-store-v2") || "{}",
      );
      setCart(
        Object.fromEntries(
          cartLines(
            stored.cart && typeof stored.cart === "object" ? stored.cart : {},
          ).map((l) => [l.key, l.quantity]),
        ),
      );
      setWishlist(
        Array.isArray(stored.wishlist)
          ? stored.wishlist.filter((id: number) =>
              products.some((p) => p.id === id),
            )
          : [],
      );
      if (siteConfig.locations.includes(stored.location))
        setLocation(stored.location);
      const saved = JSON.parse(
        sessionStorage.getItem("fresho-order") || "null",
      );
      if (
        saved &&
        Array.isArray(saved.items) &&
        typeof saved.total === "number"
      )
        setOrder(saved);
    } catch {
      /* Storage is optional for demo shopping. */
    }
    setReady(true);
    return () => clearTimeout(timer.current);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem(
          "fresho-store-v2",
          JSON.stringify({ cart, wishlist, location }),
        );
      } catch {}
  }, [cart, wishlist, location, ready]);
  const notify = (text: string, cartLink = false) => {
    clearTimeout(timer.current);
    setToast({ text, cartLink });
    timer.current = setTimeout(
      () => setToast({ text: "", cartLink: false }),
      2800,
    );
  };
  const setQty = (key: string, q: number) => {
    const [id, vid] = key.split(":");
    const p = products.find((x) => x.id === Number(id));
    if (!p) return;
    const v = getVariant(p, vid);
    setCart((old) => {
      const n = { ...old };
      if (q <= 0) delete n[key];
      else n[key] = Math.min(q, v.stock);
      return n;
    });
  };
  const add = (id: number, variant = "base", quantity = 1) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    const v = getVariant(p, variant);
    if (!v.stock) {
      notify("পণ্যটি এই মুহূর্তে স্টকে নেই।");
      return;
    }
    const key = cartKey(id, variant);
    setCart((old) => ({
      ...old,
      [key]: Math.min(v.stock, (old[key] || 0) + quantity),
    }));
    notify("পণ্যটি কার্টে যোগ হয়েছে।", true);
  };
  const toggleWish = (id: number) => {
    setWishlist((old) =>
      old.includes(id) ? old.filter((n) => n !== id) : [...old, id],
    );
  };
  const placeOrder = (o: Order) => {
    setOrder(o);
    setCart({});
    try {
      sessionStorage.setItem("fresho-order", JSON.stringify(o));
      localStorage.setItem(
        "fresho-purchased",
        JSON.stringify(o.items.map((i) => i.id)),
      );
    } catch {}
  };
  return (
    <C.Provider
      value={{
        cart,
        wishlist,
        ready,
        location,
        setLocation,
        add,
        remove: (key) => setQty(key, 0),
        setQty,
        toggleWish,
        notify,
        clearCart: () => setCart({}),
        order,
        placeOrder,
      }}
    >
      {children}
      <div aria-live="polite" aria-atomic="true">
        {toast.text && (
          <div className="toast">
            ✓ {toast.text}
            {toast.cartLink && <Link href="/cart">কার্ট দেখুন →</Link>}
          </div>
        )}
      </div>
    </C.Provider>
  );
}
