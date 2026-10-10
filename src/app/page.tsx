import { Suspense } from "react";
import Hero from "@/components/Homepage/Hero";
import ProductsSection from "@/components/Homepage/ProductsSection";

export default function Home() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-5">
            <div className="h-[228px] animate-pulse rounded-[22px] bg-gray-100" />
          </div>
        }
      >
        <Hero />
      </Suspense>

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-10">
            পণ্যের তথ্য লোড হচ্ছে...
          </div>
        }
      >
        <ProductsSection />
      </Suspense>
    </main>
  );
}