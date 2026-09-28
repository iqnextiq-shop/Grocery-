import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetail from "@/components/ProductDetail";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return {
    title: p ? `${p.name} — ${p.unit} | FRESHO` : "পণ্য পাওয়া যায়নি | FRESHO",
    description: p?.description,
    openGraph: { images: p?.images },
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return notFound();
  return <ProductDetail product={p} />;
}
