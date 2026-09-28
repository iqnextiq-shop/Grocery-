import { notFound } from "next/navigation";
import { collections } from "@/data/content";
import { products } from "@/data/products";
import ProductListing from "@/components/ProductListing";
import { Bundles } from "@/components/Sections";
export function generateStaticParams() {
  return [...collections.map((c) => ({ slug: c.slug })), { slug: "combos" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `${collections.find((c) => c.slug === slug)?.name || "সাশ্রয়ী কম্বো"} | FRESHO`,
  };
}
export default async function Collection({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "combos")
    return (
      <ProductListing
        title="সাশ্রয়ী কম্বো"
        ids={products.filter((p) => p.bundleItems).map((p) => p.id)}
        description="একসাথে নিন, সাশ্রয় করুন। সব মূল্য ও অফার ডেমো।"
      />
    );
  const c = collections.find((c) => c.slug === slug);
  if (!c) return notFound();
  return (
    <>
      <ProductListing
        title={c.name}
        ids={c.comboId ? [c.comboId, ...c.ids] : c.ids}
        description="আপনার প্রয়োজন অনুযায়ী বেছে রাখা বাজার। আলাদা পণ্য বা কম্বো, যেটি ভালো লাগে।"
      />
    </>
  );
}
