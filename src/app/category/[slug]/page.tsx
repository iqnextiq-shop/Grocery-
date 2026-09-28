import { notFound } from "next/navigation";
import { categoryData } from "@/data/categories";
import ProductListing from "@/components/ProductListing";
export function generateStaticParams() {
  return categoryData.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `${categoryData.find((c) => c.slug === slug)?.name || "বিভাগ"} | FRESHO`,
  };
}
export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = categoryData.find((c) => c.slug === slug);
  if (!c) return notFound();
  return (
    <ProductListing
      category={slug}
      title={c.name}
      description={`${c.subcategories.join(" · ")} — আপনার পছন্দমতো বেছে নিন।`}
    />
  );
}
