"use client";
import { siteConfig } from "@/config/site";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="wrap page">
      <div className="page-heading">
        <span className="eyebrow">একটি কথায় অনেকটা সহজ</span>
        <h1>আমরা আছি আপনার পাশে</h1>
        <p>ডেমো অভিজ্ঞতা বা আপনার ব্যবসার ওয়েবসাইট নিয়ে কথা বলুন।</p>
      </div>
      <div className="contact-layout">
        <div>
          <div className="contact-card">
            <Phone size={22} />
            <div>
              <h3>CodePixel Web-এর সাথে কথা বলুন</h3>
              <a href={`tel:+${siteConfig.whatsapp.number}`}>
                {siteConfig.whatsapp.displayNumber}
              </a>
              <p>এটি ওয়েবসাইট তৈরির যোগাযোগ, বাস্তব গ্রোসারি সাপোর্ট নয়।</p>
            </div>
          </div>
          <div className="contact-card">
            <MessageCircle size={22} />
            <div>
              <h3>WhatsApp-এ মেসেজ দিন</h3>
              <p>{siteConfig.whatsapp.cta}</p>
              <a
                className="btn small"
                href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.cta)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                মেসেজ দিন
              </a>
            </div>
          </div>
          <div className="contact-card">
            <Mail size={22} />
            <div>
              <h3>ডেমো ইমেইল</h3>
              <p>{siteConfig.email}</p>
              <small>এটি কাল্পনিক ঠিকানা। এখানে ইমেইল পাঠানো যাবে না।</small>
            </div>
          </div>
        </div>
        <form
          className="contact-form formgrid"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h2 className="field full">আপনার কথা লিখুন</h2>
          <div className="field">
            <label htmlFor="contact-name">নাম *</label>
            <input id="contact-name" required placeholder="ডেমো নাম" />
          </div>
          <div className="field">
            <label htmlFor="contact-email">ইমেইল *</label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="name@example.com"
            />
          </div>
          <div className="field full">
            <label htmlFor="contact-message">বার্তা *</label>
            <textarea
              id="contact-message"
              required
              rows={5}
              placeholder="কী জানতে চান?"
            />
          </div>
          <p className="privacy-note field full">
            এটি ফর্মের ডেমো। আপনার বার্তা কোথাও পাঠানো বা সংরক্ষণ করা হবে না।
          </p>
          <button className="btn field full">ডেমো বার্তা জমা দিন</button>
          {sent && (
            <p role="status" className="notice field full">
              ধন্যবাদ! ডেমো বার্তাটি গ্রহণের উদাহরণ দেখানো হলো। বাস্তবে
              যোগাযোগের জন্য WhatsApp ব্যবহার করুন।
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
