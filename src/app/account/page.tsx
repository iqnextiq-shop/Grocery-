"use client";
import Link from "next/link";
import { ShoppingBasket, Heart, Package, UserRound } from "lucide-react";
import { useStore } from "@/components/StoreProvider";
import { money } from "@/lib/commerce";
export default function Account() {
  const { order, ready } = useStore();
  return (
    <div className="wrap page">
      <div className="account-welcome">
        <UserRound size={40} />
        <h1>আপনার নিজের বাজারের জায়গা</h1>
        <p>অ্যাকাউন্ট ছাড়াই বাজার করুন। পছন্দ ও কার্ট এই ব্রাউজারে রাখা হয়।</p>
      </div>
      <div className="account-grid">
        <Link href="/wishlist">
          <Heart size={28} />
          <h2>পছন্দের তালিকা</h2>
          <p>পরে কিনতে সংরক্ষণ করা পণ্য →</p>
        </Link>
        <Link href="/cart">
          <ShoppingBasket size={28} />
          <h2>আমার কার্ট</h2>
          <p>অসম্পূর্ণ বাজার গুছিয়ে নিন →</p>
        </Link>
        <Link href={order ? "/order-confirmation" : "/shop"}>
          <Package size={28} />
          <h2>সর্বশেষ ডেমো অর্ডার</h2>
          <p>
            {ready && order
              ? `#${order.id} · ${money(order.total)} →`
              : "এখনো কোনো ডেমো অর্ডার নেই। বাজার শুরু করুন →"}
          </p>
        </Link>
      </div>
      <p className="notice">
        বাস্তব লগইন, নিবন্ধন বা অ্যাকাউন্ট এখানে নেই। অর্ডারের ব্যক্তিগত তথ্য
        শুধু এই ব্রাউজার ট্যাবের session storage-এ থাকে।
      </p>
    </div>
  );
}
