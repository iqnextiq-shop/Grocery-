import { FAQ } from "@/components/Sections";
export const metadata = { title: "সাধারণ জিজ্ঞাসা | FRESHO" };
export default function FAQPage() {
  return (
    <div className="page">
      <div className="wrap">
        <h1>সাধারণ জিজ্ঞাসা</h1>
      </div>
      <FAQ />
    </div>
  );
}
