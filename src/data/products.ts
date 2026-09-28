import { categoryData } from "./categories";
export type Variant = {
  id: string;
  unit: string;
  price: number;
  comparePrice?: number;
  stock: number;
};
export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  subCategory: string;
  brand: string;
  image: string;
  images: string[];
  price: number;
  oldPrice?: number;
  unit: string;
  weight: string;
  description: string;
  tags: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  fresh: boolean;
  organic: boolean;
  stock: number;
  deliveryAvailable: boolean;
  variants: Variant[];
  info: Record<string, string>;
  bundleItems?: number[];
};
const rows: [
  string,
  string,
  string,
  string,
  number,
  string,
  number?,
  string[]?,
][] = [
  [
    "মিনিকেট চাল",
    "চাল ও ডাল",
    "rice",
    "photo-1586201375761-83865001e31c",
    420,
    "5 kg",
    480,
    ["জনপ্রিয়"],
  ],
  [
    "নাজিরশাইল চাল",
    "চাল ও ডাল",
    "rice",
    "photo-1586201375761-83865001e31c",
    390,
    "5 kg",
  ],
  [
    "বাসমতি চাল",
    "চাল ও ডাল",
    "rice",
    "photo-1586201375761-83865001e31c",
    260,
    "1 kg",
  ],
  [
    "মসুর ডাল",
    "চাল ও ডাল",
    "lentil",
    "photo-1515543904379-3d757afe72e4",
    135,
    "1 kg",
    150,
  ],
  [
    "মুগ ডাল",
    "চাল ও ডাল",
    "lentil",
    "photo-1515543904379-3d757afe72e4",
    160,
    "1 kg",
  ],
  [
    "ছোলা",
    "চাল ও ডাল",
    "lentil",
    "photo-1515543904379-3d757afe72e4",
    95,
    "500 g",
  ],
  ["আটা", "চাল ও ডাল", "flour", "photo-1627485937980-221c88ac04f9", 75, "1 kg"],
  [
    "ময়দা",
    "চাল ও ডাল",
    "flour",
    "photo-1627485937980-221c88ac04f9",
    70,
    "1 kg",
  ],
  [
    "সুজি",
    "চাল ও ডাল",
    "flour",
    "photo-1627485937980-221c88ac04f9",
    55,
    "500 g",
  ],
  [
    "চিনি",
    "চাল ও ডাল",
    "sugar",
    "photo-1581441363689-1f3c3c414635",
    120,
    "1 kg",
  ],
  [
    "আয়োডিন লবণ",
    "চাল ও ডাল",
    "salt",
    "photo-1604908176997-125f25cc6f3d",
    38,
    "1 kg",
  ],
  [
    "সয়াবিন তেল",
    "তেল ও মসলা",
    "oil",
    "photo-1474979266404-7eaacbcd87c5",
    175,
    "1 L",
    195,
  ],
  [
    "সরিষার তেল",
    "তেল ও মসলা",
    "oil",
    "photo-1474979266404-7eaacbcd87c5",
    210,
    "500 ml",
  ],
  [
    "হলুদ গুঁড়া",
    "তেল ও মসলা",
    "spice",
    "photo-1596040033229-a9821ebd058d",
    48,
    "100 g",
  ],
  [
    "মরিচ গুঁড়া",
    "তেল ও মসলা",
    "spice",
    "photo-1596040033229-a9821ebd058d",
    55,
    "100 g",
  ],
  [
    "জিরা গুঁড়া",
    "তেল ও মসলা",
    "spice",
    "photo-1596040033229-a9821ebd058d",
    85,
    "100 g",
  ],
  [
    "ধনিয়া গুঁড়া",
    "তেল ও মসলা",
    "spice",
    "photo-1596040033229-a9821ebd058d",
    42,
    "100 g",
  ],
  [
    "গরম মসলা",
    "তেল ও মসলা",
    "spice",
    "photo-1596040033229-a9821ebd058d",
    75,
    "50 g",
  ],
  [
    "দেশি আলু",
    "তাজা বাজার",
    "vegetable",
    "photo-1518977676601-b53f82aba655",
    55,
    "1 kg",
    undefined,
    ["আজকের তাজা সংগ্রহ"],
  ],
  [
    "লাল টমেটো",
    "তাজা বাজার",
    "vegetable",
    "photo-1546094096-0df4bcaaa337",
    65,
    "1 kg",
  ],
  [
    "দেশি পেঁয়াজ",
    "তাজা বাজার",
    "vegetable",
    "photo-1508747703725-719777637510",
    80,
    "1 kg",
  ],
  [
    "গাজর",
    "তাজা বাজার",
    "vegetable",
    "photo-1445282768818-728615cc910a",
    90,
    "500 g",
  ],
  [
    "পালং শাক",
    "তাজা বাজার",
    "vegetable",
    "photo-1576045057995-568f588f82fb",
    35,
    "1 bunch",
  ],
  [
    "কাঁচা মরিচ",
    "তাজা বাজার",
    "vegetable",
    "photo-1588252303782-cb80119abd6d",
    30,
    "250 g",
  ],
  ["কমলা", "তাজা বাজার", "fruit", "photo-1547514701-42782101795e", 220, "1 kg"],
  [
    "কলা",
    "তাজা বাজার",
    "fruit",
    "photo-1571771894821-ce9b6c11b08e",
    80,
    "12 pcs",
  ],
  ["আপেল", "তাজা বাজার", "fruit", "photo-1560806887-1e4cd0b6cbd6", 260, "1 kg"],
  ["আম", "তাজা বাজার", "fruit", "photo-1553279768-865429fa0078", 180, "1 kg"],
  [
    "দেশি ডিম",
    "তাজা বাজার",
    "eggs",
    "photo-1506976785307-8732e854ad03",
    145,
    "12 pcs",
  ],
  [
    "মুরগি",
    "তাজা বাজার",
    "meat",
    "photo-1587593810167-a84920ea0781",
    295,
    "1 kg",
  ],
  [
    "রুই মাছ",
    "তাজা বাজার",
    "fish",
    "photo-1510130387422-82bed34b37e9",
    380,
    "1 kg",
  ],
  [
    "গরুর মাংস",
    "তাজা বাজার",
    "meat",
    "photo-1607623814075-e51df1bdc82f",
    750,
    "1 kg",
  ],
  [
    "ফ্রেশ দুধ",
    "দুধ ও ডিম",
    "dairy",
    "photo-1550583724-b2692b85b150",
    90,
    "1 L",
  ],
  [
    "টক দই",
    "দুধ ও ডিম",
    "dairy",
    "photo-1488477181946-6428a0291777",
    80,
    "500 g",
  ],
  [
    "পনির",
    "দুধ ও ডিম",
    "dairy",
    "photo-1631452180519-c014fe946bc7",
    180,
    "200 g",
  ],
  [
    "মাখন",
    "দুধ ও ডিম",
    "dairy",
    "photo-1589985270826-4b7bb135bc9d",
    150,
    "200 g",
  ],
  [
    "চিজ স্লাইস",
    "দুধ ও ডিম",
    "dairy",
    "photo-1486297678162-eb2a19b0a32d",
    220,
    "10 pcs",
  ],
  [
    "স্যান্ডউইচ ব্রেড",
    "বেকারি",
    "bakery",
    "photo-1509440159596-0249088772ff",
    65,
    "400 g",
  ],
  [
    "বাটার কুকিজ",
    "বেকারি",
    "bakery",
    "photo-1558961363-fa8fdf82db35",
    95,
    "250 g",
  ],
  [
    "চকলেট কেক",
    "বেকারি",
    "bakery",
    "photo-1578985545062-69928b1d9587",
    280,
    "500 g",
  ],
  [
    "মিল্ক বান",
    "বেকারি",
    "bakery",
    "photo-1509440159596-0249088772ff",
    45,
    "4 pcs",
  ],
  [
    "আলুর চিপস",
    "স্ন্যাকস",
    "snack",
    "photo-1566478989037-eec170784d0b",
    35,
    "50 g",
  ],
  [
    "ঝাল চানাচুর",
    "স্ন্যাকস",
    "snack",
    "photo-1599490659213-e2b9527bd087",
    60,
    "200 g",
  ],
  [
    "কাজুবাদাম",
    "স্বাস্থ্যকর পছন্দ",
    "nuts",
    "photo-1505576399274-565b52d4ac71",
    340,
    "250 g",
  ],
  [
    "ডার্ক চকোলেট",
    "স্ন্যাকস",
    "snack",
    "photo-1548907040-4d42bfc2c1c6",
    120,
    "100 g",
  ],
  [
    "কমলার জুস",
    "পানীয়",
    "drink",
    "photo-1622597467836-f3285f2131b8",
    110,
    "1 L",
  ],
  [
    "লেবু পানি",
    "পানীয়",
    "drink",
    "photo-1622597467836-f3285f2131b8",
    45,
    "500 ml",
  ],
  ["চা পাতা", "পানীয়", "tea", "photo-1544787219-7f47ccb76574", 180, "200 g"],
  ["কফি", "পানীয়", "coffee", "photo-1442512595331-e89e73853f31", 320, "100 g"],
  [
    "মধু",
    "স্বাস্থ্যকর পছন্দ",
    "honey",
    "photo-1587049352846-4a222e784d38",
    290,
    "250 g",
    undefined,
    ["স্বাস্থ্যকর পছন্দ"],
  ],
  [
    "খেজুর",
    "স্বাস্থ্যকর পছন্দ",
    "dates",
    "photo-1601493700631-2b16ec4b4716",
    240,
    "500 g",
  ],
  [
    "ওটস",
    "স্বাস্থ্যকর পছন্দ",
    "oats",
    "photo-1517673132405-a56a62b18caf",
    185,
    "500 g",
  ],
  [
    "শিশুখাদ্য সিরিয়াল",
    "শিশু ও যত্ন",
    "baby",
    "photo-1516627145497-ae6968895b74",
    390,
    "300 g",
  ],
  [
    "ডায়াপার প্যাক",
    "শিশু ও যত্ন",
    "baby",
    "photo-1516627145497-ae6968895b74",
    650,
    "20 pcs",
  ],
  [
    "বেবি ওয়াশ",
    "শিশু ও যত্ন",
    "baby",
    "photo-1608571423902-eed4a5ad8108",
    250,
    "200 ml",
  ],
  [
    "হারবাল শ্যাম্পু",
    "ব্যক্তিগত যত্ন",
    "care",
    "photo-1620916566398-39f1143ab7be",
    220,
    "200 ml",
  ],
  [
    "সুগন্ধি সাবান",
    "ব্যক্তিগত যত্ন",
    "care",
    "photo-1600857544200-b2f666a9a2ec",
    55,
    "100 g",
  ],
  [
    "টুথপেস্ট",
    "ব্যক্তিগত যত্ন",
    "care",
    "photo-1609840114035-3c981b782dfe",
    110,
    "150 g",
  ],
  [
    "ফেস ক্রিম",
    "ব্যক্তিগত যত্ন",
    "care",
    "photo-1608248543803-ba4f8c70ae0b",
    280,
    "50 g",
  ],
  [
    "কাপড় কাচার পাউডার",
    "ঘর পরিষ্কার",
    "home",
    "photo-1585421514738-01798e348b17",
    190,
    "1 kg",
  ],
  [
    "ডিশওয়াশ",
    "ঘর পরিষ্কার",
    "home",
    "photo-1585421514738-01798e348b17",
    95,
    "500 ml",
  ],
  [
    "টিস্যু বক্স",
    "ঘর পরিষ্কার",
    "home",
    "photo-1583947215259-38e31be8751f",
    75,
    "1 pack",
  ],
  [
    "ফ্লোর ক্লিনার",
    "ঘর পরিষ্কার",
    "home",
    "photo-1585421514738-01798e348b17",
    160,
    "1 L",
  ],
  [
    "মশা তাড়ানোর কয়েল",
    "ঘর পরিষ্কার",
    "home",
    "photo-1585421514738-01798e348b17",
    65,
    "10 pcs",
  ],
];

const imageMap: Record<number, string> = {
  1: "pantry-1",
  2: "pantry-1",
  3: "pantry-1",
  4: "pantry-2",
  5: "pantry-2",
  6: "pantry-2",
  7: "essentials-1",
  8: "essentials-1",
  9: "essentials-1",
  10: "essentials-3",
  11: "essentials-3",
  12: "pantry-3",
  13: "pantry-3",
  14: "essentials-2",
  15: "essentials-2",
  16: "essentials-2",
  17: "essentials-2",
  18: "essentials-2",
  19: "pantry-8",
  20: "pantry-7",
  21: "fresh-1",
  22: "pantry-9",
  23: "fresh-3",
  24: "fresh-2",
  25: "pantry-10",
  26: "pantry-6",
  27: "pantry-11",
  28: "fresh-4",
  29: "pantry-5",
  30: "fresh-5",
  31: "fresh-6",
  32: "fresh-7",
  33: "pantry-4",
  34: "fresh-9",
  35: "fresh-8",
  36: "pantry-14",
  37: "fresh-10",
  38: "pantry-13",
  39: "fresh-12",
  40: "fresh-11",
  41: "pantry-13",
  42: "fresh-13",
  43: "fresh-14",
  44: "pantry-16",
  45: "fresh-15",
  46: "essentials-6",
  47: "essentials-6",
  48: "essentials-4",
  49: "essentials-5",
  50: "pantry-15",
  51: "essentials-7",
  52: "essentials-8",
  53: "essentials-8",
  54: "essentials-9",
  55: "essentials-10",
  56: "essentials-11",
  57: "essentials-12",
  58: "essentials-13",
  59: "fresh-16",
  60: "essentials-14",
  61: "essentials-15",
  62: "essentials-16",
  63: "essentials-15",
  64: "essentials-16",
};
function makeVariants(
  unit: string,
  price: number,
  oldPrice?: number,
  stock = 25,
): Variant[] {
  const choices: Record<string, [string, number][]> = {
    "5 kg": [
      ["1 kg", 0.22],
      ["10 kg", 1.96],
    ],
    "1 kg": [
      ["500 g", 0.54],
      ["2 kg", 1.96],
    ],
    "500 g": [
      ["250 g", 0.54],
      ["1 kg", 1.95],
    ],
    "250 g": [
      ["100 g", 0.44],
      ["500 g", 1.96],
    ],
    "100 g": [["250 g", 2.4]],
    "1 L": [
      ["500 ml", 0.54],
      ["2 L", 1.96],
    ],
    "500 ml": [
      ["250 ml", 0.54],
      ["1 L", 1.95],
    ],
    "12 pcs": [["6 pcs", 0.52]],
  };
  return [
    { id: "base", unit, price, comparePrice: oldPrice, stock },
    ...(choices[unit] || []).map(([u, f], i) => ({
      id: `v${i + 1}`,
      unit: u,
      price: Math.round(price * f),
      comparePrice: oldPrice ? Math.round(oldPrice * f) : undefined,
      stock,
    })),
  ];
}
export const products: Product[] = rows.map((r, i): Product => {
  const cat = categoryData.find((c) => c.groups.includes(r[2]))!;
  const fresh = r[1] === "তাজা বাজার";
  const brand = fresh
    ? "সবুজবেলা"
    : r[1] === "চাল ও ডাল"
      ? "ধানসিঁড়ি"
      : r[2] === "home" || r[2] === "care"
        ? "স্নিগ্ধা"
        : "FRESHO নির্বাচন";
  const price = r[4];
  const oldPrice =
    r[6] ||
    ([28, 32].includes(i)
      ? Math.round(price * 1.12)
      : i % 7 === 4
        ? Math.round(price * 1.15)
        : undefined);
  const image = `/images/${imageMap[i + 1]}.webp`;
  const stock = i === 58 ? 0 : 25;
  return {
    id: i + 1,
    name: r[0],
    slug: `product-${i + 1}`,
    category: cat.name,
    categorySlug: cat.slug,
    subCategory: r[2],
    brand,
    image,
    images: [image],
    price,
    oldPrice,
    unit: r[5],
    weight: r[5],
    description: `পরিবারের প্রতিদিনের বাজারে ${r[0]}। পছন্দের ওজন বেছে আপনার তালিকায় যোগ করুন। এই পণ্য, প্যাকেট ও মূল্য প্রদর্শনীমূলক।`,
    tags: [...(r[7] || []), r[2], cat.name],
    featured: i < 16,
    bestseller: [0, 3, 11, 18, 28, 32, 37].includes(i),
    newArrival: i >= 48,
    fresh,
    organic: ["honey", "oats"].includes(r[2]),
    stock,
    deliveryAvailable: true,
    variants: makeVariants(r[5], price, oldPrice, stock),
    info: fresh
      ? {
          উৎস: "বাংলাদেশ (ডেমো)",
          সংরক্ষণ:
            "সবজি ও ফল পরিষ্কার, শীতল স্থানে রাখুন। মাছ, মাংস ও দুধ ফ্রিজে রাখুন।",
          সতেজতা: "তাজা সংগ্রহ লেবেলটি ডেমো; বাস্তব সময়ের দাবি নয়।",
        }
      : {
          "প্যাক সাইজ": r[5],
          সংরক্ষণ: "প্যাকেটের নির্দেশনা অনুযায়ী সংরক্ষণ করুন।",
          মেয়াদ: "আসল পণ্য কেনার সময় প্যাকেটের মেয়াদ যাচাই করুন।",
        },
  };
});
// Explicit everyday sugar pricing, shared by cards, detail, cart and checkout.
products[9].variants = [
  { id: "base", unit: "1 kg", price: 120, stock: 25 },
  { id: "v1", unit: "500 g", price: 65, stock: 25 },
  { id: "v2", unit: "2 kg", price: 235, stock: 25 },
];
const combos = [
  {
    id: 101,
    name: "পরিবারের সাপ্তাহিক বাজার",
    items: [1, 4, 12, 11],
    saving: 70,
  },
  { id: 102, name: "নাস্তার কম্বো", items: [38, 36, 29, 33], saving: 55 },
  { id: 103, name: "রান্নাঘর কম্বো", items: [12, 14, 15, 4], saving: 45 },
];
for (const c of combos) {
  const parts = c.items.map((id) => products.find((p) => p.id === id)!);
  const total = parts.reduce((s, p) => s + p.price, 0);
  const p: Product = {
    ...parts[0],
    id: c.id,
    slug: `combo-${c.id}`,
    name: c.name,
    category: "সাশ্রয়ী কম্বো",
    categorySlug: "combos",
    subCategory: "combo",
    brand: "FRESHO নির্বাচন",
    unit: "1 pack",
    weight: "1 pack",
    price: total - c.saving,
    oldPrice: total,
    variants: [
      {
        id: "base",
        unit: "1 pack",
        price: total - c.saving,
        comparePrice: total,
        stock: 20,
      },
    ],
    stock: 20,
    bundleItems: c.items,
    images: parts.map((p) => p.image),
    description: parts.map((p) => `${p.name} (${p.unit})`).join(" + "),
    tags: ["কম্বো", "সাশ্রয়"],
    featured: false,
    bestseller: false,
    newArrival: false,
    fresh: false,
    organic: false,
    info: {
      "কম্বোর পণ্য": parts.map((p) => `${p.name} · ${p.unit}`).join(", "),
      মূল্য: "আলাদা পণ্যের বর্তমান মূল্য থেকে কম্বো সাশ্রয় বাদ দেওয়া হয়েছে।",
    },
  };
  products.push(p);
}
export const categories = categoryData.map((c) => [c.name, c.slug]);
export function getVariant(p: Product, id = "base") {
  return p.variants.find((v) => v.id === id) || p.variants[0];
}
export function inCategory(p: Product, slug: string) {
  return (
    p.categorySlug === slug ||
    (slug === "fresh" && p.fresh) ||
    (slug === "healthy" &&
      ["nuts", "honey", "dates", "oats"].includes(p.subCategory))
  );
}
