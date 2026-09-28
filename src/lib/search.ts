import { Product } from "@/data/products";
export function searchProducts(products: Product[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  const terms = q.split(/\s+/);
  const includes = (s: string) =>
    terms.every((t) => s.toLowerCase().includes(t));
  const direct = products.filter((p) => includes(p.name));
  if (direct.length) return direct;
  return products.filter((p) =>
    includes(`${p.name} ${p.category} ${p.brand} ${p.tags.join(" ")}`),
  );
}
