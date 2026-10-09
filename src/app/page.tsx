
import AllProducts from "@/components/Homepage/AllProducts";
import Hero from "@/components/Homepage/Hero";
import TodayDown from "@/components/Homepage/TodayDown";
import TodayUp from "@/components/Homepage/TodayUp";
import type { Product } from "@/components/Shared/Marquee";

export default async function Home() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  const UpProducts = products.filter(
    (product) => product.change.dir === "up"
  );

  const downProducts = products.filter(
    (product) => product.change.dir === "down"
  );

  return (
    <div>
      <Hero />
      <TodayUp UpProducts={UpProducts} />
      <TodayDown downProducts={downProducts} />
      <AllProducts products={products} />
    </div>
  );
}
