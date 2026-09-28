export const siteConfig = {
  name: "FRESHO",
  tagline: "প্রতিদিনের প্রয়োজন, এক জায়গায়",
  email: "hello@fresho.example",
  demoLabel: "CodePixel Web-এর ডেমো · বাস্তব অর্ডার নয়",
  whatsapp: {
    number: "8801876892958",
    displayNumber: "01876892958",
    cta: "এই ধরনের সাইট তৈরি করতে এখনি মেসেজ দিন।",
  },
  delivery: { insideDhaka: 70, outsideDhaka: 130, freeThreshold: 1500 },
  locations: ["ঢাকা", "চট্টগ্রাম", "নারায়ণগঞ্জ", "গাজীপুর"],
  footer: {
    credit: "Website Demo by CodePixel Web",
    hours: "সকাল ৯টা – রাত ১০টা · ডেমো সেবা",
  },
};
export function deliveryFee(subtotal: number, insideDhaka: boolean) {
  return !subtotal || subtotal >= siteConfig.delivery.freeThreshold
    ? 0
    : insideDhaka
      ? siteConfig.delivery.insideDhaka
      : siteConfig.delivery.outsideDhaka;
}
