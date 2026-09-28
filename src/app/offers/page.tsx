import ProductListing from "@/components/ProductListing";
export const metadata = { title: "আজকের সেরা অফার | FRESHO" };
export default function Offers() {
  return (
    <ProductListing
      title="আজকের সেরা অফার"
      offerOnly
      description="পরিষ্কার দাম, সঠিক ওজন, বাড়তি সাশ্রয়। সব অফার প্রদর্শনীমূলক।"
    />
  );
}
