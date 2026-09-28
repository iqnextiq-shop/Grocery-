import Link from "next/link";
import { Search } from "lucide-react";
export default function NotFound() {
  return (
    <div className="wrap page empty">
      <Search size={45} />
      <h1>এই পাতাটি খুঁজে পাওয়া যায়নি</h1> <p>নতুন করে বাজার ঘুরে দেখুন।</p>
      <Link href="/shop" className="btn">
        সব পণ্য দেখুন
      </Link>
    </div>
  );
}
