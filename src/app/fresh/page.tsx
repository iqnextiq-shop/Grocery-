import ProductListing from "@/components/ProductListing";
export const metadata = { title: "তাজা বাজার | FRESHO" };
export default function Fresh() {
  return (
    <ProductListing
      title="ফ্রেশ কালেকশন"
      freshOnly
      description="মৌসুমি ফল, সবজি, মাছ, মাংস ও ডিম। ‘তাজা সংগ্রহ’ লেবেলটি ডেমো, বাস্তব সময়ের দাবি নয়।"
    />
  );
}
