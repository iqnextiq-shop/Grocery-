"use client";
import { useState } from "react";
import { ArrowRight, Mail, Check } from "lucide-react";
export default function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="wrap newsletter">
      <div className="newsletter-icon">
        <Mail size={31} />
      </div>
      <div>
        <h2>ভালো বাজারের খবর, সবার আগে</h2>
        <p>নতুন পণ্য আর সাশ্রয়ী অফারের আপডেট পেতে সাথে থাকুন।</p>
        <small>ডেমো সাবস্ক্রিপশন · কোনো ইমেইল পাঠানো হবে না</small>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <label className="sr-only" htmlFor="newsletter-email">
          আপনার ইমেইল
        </label>
        <input
          id="newsletter-email"
          placeholder="আপনার ইমেইল ঠিকানা"
          type="email"
          required
          disabled={done}
        />
        <button aria-label="ডেমো সাবস্ক্রিপশন" className="btn" disabled={done}>
          {done ? (
            <>
              <Check size={17} /> যুক্ত হয়েছেন
            </>
          ) : (
            <ArrowRight size={20} />
          )}
        </button>
        {done && (
          <span className="sr-only" role="status">
            ধন্যবাদ! ডেমো সাবস্ক্রিপশন সম্পন্ন হয়েছে। কোনো তথ্য পাঠানো হয়নি।
          </span>
        )}
      </form>
    </section>
  );
}
