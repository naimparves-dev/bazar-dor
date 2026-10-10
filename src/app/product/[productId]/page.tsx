import Link from "next/link";
import { Suspense } from "react";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductDetails {
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
  markets: Market[];
}

interface ProductDetailsProps {
  params: Promise<{
    productId: string;
  }>;
}

// ডেটা ফেচিং ও রেন্ডারিংয়ের মূল কন্টেন্ট কম্পোনেন্ট
async function ProductDetailsContent({ params }: ProductDetailsProps) {
  const { productId } = await params;

  const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${productId}`);
  const product: ProductDetails = await res.json();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        কোনো পণ্য পাওয়া যায়নি।
      </div>
    );
  }

  const allMins = product.markets.map((m) => m.min);
  const allMaxs = product.markets.map((m) => m.max);
  const lowestPrice = Math.min(...allMins);
  const highestPrice = Math.max(...allMaxs);

  const lowestMarket = product.markets.find((m) => m.min === lowestPrice)?.market || "";
  const highestMarket = product.markets.find((m) => m.max === highestPrice)?.market || "";

  const priceDiff = product.today - product.yesterday;
  let changeText = "দাম অপরিবর্তিত রয়েছে";
  if (priceDiff > 0) {
    changeText = `গতকালের তুলনায় আজ দাম বেড়েছে ${priceDiff} টাকা`;
  } else if (priceDiff < 0) {
    changeText = `গতকালের তুলনায় আজ দাম কমেছে ${Math.abs(priceDiff)} টাকা`;
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* ব্রেডক্রাম্ব */}
      <div className="mb-6 text-xs text-gray-500 flex items-center gap-1.5">
        <Link href="/" className="hover:underline">হোম</Link>
        <span>›</span>
        <Link href={`/catagory/${product.category}`} className="hover:underline">{product.categoryNameBn}</Link>
        <span>›</span>
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </div>

      {/* ১. শীর্ষ প্রধান কার্ড */}
      <div className="mb-8 rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F4F7F4] text-4xl shadow-inner">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{product.nameBn}</h1>
            <p className="text-xs sm:text-sm text-gray-500">
              প্রতি {product.unit === "kg" ? "কেজি" : product.unit} · {product.nameBn}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
              {changeText}
            </p>
          </div>
        </div>

        {/* আজকের দাম কার্ড */}
        <div className="w-full md:w-auto bg-[#F9FBF9] border border-gray-100 rounded-2xl p-4 text-center md:text-right min-w-[180px]">
          <p className="text-xs text-gray-400 mb-1">আজকের দাম</p>
          <p className="text-2xl sm:text-3xl font-black text-gray-900">
            ৳ {product.today}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">টাকা / {product.unit === "kg" ? "কেজি" : product.unit}</p>
          <div className="mt-2 flex items-center justify-center md:justify-end gap-1 text-xs font-semibold">
            {product.change.dir === "up" && <span className="text-red-600">▲ {product.change.pct}%</span>}
            {product.change.dir === "down" && <span className="text-emerald-600">▼ {product.change.pct}%</span>}
            {product.change.dir === "flat" && <span className="text-gray-500">▬ {product.change.pct}%</span>}
          </div>
        </div>
      </div>

      {/* ২. দামের সারসংক্ষেপ */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">সর্বনিম্ন দাম</p>
            <p className="text-xl font-bold text-emerald-600">৳ {lowestPrice} টাকা</p>
            <p className="text-xs text-gray-400 mt-2 truncate">সবচেয়ে কম বাজার: {lowestMarket}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">সর্বোচ্চ দাম</p>
            <p className="text-xl font-bold text-red-500">৳ {highestPrice} টাকা</p>
            <p className="text-xs text-gray-400 mt-2 truncate">সবচেয়ে বেশি বাজার: {highestMarket}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">গড় দাম</p>
            <p className="text-xl font-bold text-gray-900">৳ {product.today} টাকা</p>
            <p className="text-xs text-gray-400 mt-2">প্রতি {product.unit === "kg" ? "কেজি" : product.unit}-এর হিসাবে</p>
          </div>
        </div>
      </div>

      {/* ৩. বাজারভিত্তিক আজকের দাম টেবিল */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-6">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs sm:text-sm text-gray-400 font-medium">
                <th className="pb-3 px-2">বাজার</th>
                <th className="pb-3 px-2">বিভাগ</th>
                <th className="pb-3 px-2">সর্বনিম্ন</th>
                <th className="pb-3 px-2">সর্বোচ্চ</th>
                <th className="pb-3 px-2 text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {product.markets.map((item, index) => {
                const avgMarketPrice = ((item.min + item.max) / 2).toFixed(1);
                return (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-2 font-medium text-gray-900">{item.market}</td>
                    <td className="py-4 px-2 text-gray-500">{item.division}</td>
                    <td className="py-4 px-2 text-gray-800">{item.min} টাকা</td>
                    <td className="py-4 px-2 text-gray-800">{item.max} টাকা</td>
                    <td className="py-4 px-2 text-right font-semibold text-gray-900">
                      {avgMarketPrice} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// মূল পেজ যেখানে Suspense বাউন্ডারি ব্যবহার করা হয়েছে
export default function ProductDetailsPage({ params }: ProductDetailsProps) {
  return (
    <main className="min-h-screen bg-[#F2F5F0] px-4 py-8">
      <Suspense fallback={
        <div className="mx-auto max-w-6xl py-20 text-center text-gray-500">
          প্রোডাক্টের তথ্য লোড হচ্ছে...
        </div>
      }>
        <ProductDetailsContent params={params} />
      </Suspense>
    </main>
  );
}