"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/Shared/ProductCard";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

function CategoryContent() {
  const params = useParams();
  const id = params?.id as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    if (!id) return;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${id}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-low") {
      return a.today - b.today;
    } else if (sortOption === "price-high") {
      return b.today - a.today;
    }
    return 0; 
  });

  const categoryNameBn = products[0]?.categoryNameBn || id;
  const categoryIcon = products[0]?.categoryIcon || "📦";
  const totalProducts = products.length;

  if (loading) {
    return (
      <main className="min-h-screen pb-12">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-500">
          লোড হচ্ছে...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-12">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        
        {/* ১. ক্যাটাগরি হেডার সেকশন */}
        <div className="mb-6 rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gray-50 text-2xl sm:text-3xl shrink-0">
              {categoryIcon}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{categoryNameBn}</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {totalProducts}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {/* ২. ফিল্টার এবং সর্টিং বার */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-gray-100 gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-600">
            মোট <span className="font-semibold text-gray-900">{totalProducts}</span>টি পণ্য দেখানো হচ্ছে
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs sm:text-sm text-gray-500">সাজান</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* ৩. রেসপনসিভ গ্রিড প্রোডাক্ট কার্ড সেকশন */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 text-sm">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        )}

      </div>
    </main>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen pb-12">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-500">
          লোড হচ্ছে...
        </div>
      </main>
    }>
      <CategoryContent />
    </Suspense>
  );
}