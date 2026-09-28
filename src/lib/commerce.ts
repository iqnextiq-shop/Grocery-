import { products, getVariant } from "@/data/products";
export type Cart = Record<string, number>;
export type Order = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  division: string;
  district: string;
  area: string;
  address: string;
  location: string;
  items: {
    id: number;
    name: string;
    unit: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  subtotal: number;
  delivery: number;
  total: number;
  payment: string;
};
export const cartKey = (id: number, variant = "base") => `${id}:${variant}`;
export function cartLines(cart: Cart) {
  return Object.entries(cart)
    .flatMap(([key, quantity]) => {
      const [id, vid = "base"] = key.split(":");
      const product = products.find((p) => p.id === Number(id));
      if (
        !product ||
        !Number.isInteger(quantity) ||
        quantity <= 0 ||
        !product.variants.some((v) => v.id === vid)
      )
        return [];
      const variant = getVariant(product, vid);
      return [
        { key, product, variant, quantity: Math.min(quantity, variant.stock) },
      ];
    })
    .filter((l) => l.quantity > 0);
}
export const money = (n: number) =>
  `৳${new Intl.NumberFormat("bn-BD").format(n)}`;
export const bn = (n: number) => new Intl.NumberFormat("bn-BD").format(n);
