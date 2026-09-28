import { money } from "@/lib/commerce";
import { siteConfig, deliveryFee } from "@/config/site";
export default function OrderSummary({
  subtotal,
  insideDhaka = true,
  savings = 0,
  children,
}: {
  subtotal: number;
  insideDhaka?: boolean;
  savings?: number;
  children?: React.ReactNode;
}) {
  const fee = deliveryFee(subtotal, insideDhaka);
  return (
    <aside className="summary">
      <h3>অর্ডারের সারাংশ</h3>
      <div className="delivery-progress">
        <p>
          {subtotal >= siteConfig.delivery.freeThreshold
            ? "আপনার ডেমো অর্ডারে ডেলিভারি ফ্রি!"
            : `আর মাত্র ${money(siteConfig.delivery.freeThreshold - subtotal)} কিনলে ডেলিভারি ফ্রি।`}
        </p>
        <div
          className="progress"
          role="progressbar"
          aria-label="ফ্রি ডেলিভারির অগ্রগতি"
          aria-valuemin={0}
          aria-valuemax={siteConfig.delivery.freeThreshold}
          aria-valuenow={Math.min(subtotal, siteConfig.delivery.freeThreshold)}
        >
          <div
            style={{
              width: `${Math.min(100, (subtotal / siteConfig.delivery.freeThreshold) * 100)}%`,
            }}
          />
        </div>
        <small>ডেমো সুবিধা · সব নির্বাচিত এলাকায়</small>
      </div>
      <div className="sumline">
        <span>পণ্যের মোট (ছাড়ের আগে)</span>
        <b>{money(subtotal + savings)}</b>
      </div>
      <div className="sumline">
        <span>ডিসকাউন্ট</span>
        <b>− {money(savings)}</b>
      </div>
      <div className="sumline">
        <span>ডেলিভারি চার্জ</span>
        <b>{fee ? money(fee) : "ফ্রি"}</b>
      </div>
      <div className="sumline total">
        <span>সর্বমোট</span>
        <b>{money(subtotal + fee)}</b>
      </div>
      {children}
      <p className="unit">ক্যাশ অন ডেলিভারি · কোনো বাস্তব পেমেন্ট নয়</p>
    </aside>
  );
}
