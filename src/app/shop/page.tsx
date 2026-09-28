import ProductListing from "@/components/ProductListing";
export const metadata = { title: "সব পণ্য | FRESHO" };
export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; budget?: string }>;
}) {
  const { q = "", budget = "" } = await searchParams;
  return (
    <ProductListing
      key={`${q}-${budget}`}
      initialQuery={q}
      budget={budget}
      title={q ? `“${q}” এর ফলাফল` : "আপনার প্রতিদিনের বাজার"}
    />
  );
}
