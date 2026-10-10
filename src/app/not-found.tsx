
import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[#F2F5F0] px-4 py-16 text-center">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/60 blur-3xl" />

      {/* 404 card */}
      <div className="relative w-full max-w-lg rounded-3xl border border-white bg-white p-8 shadow-xl shadow-emerald-900/5 sm:p-12">
        <div className="relative mx-auto mb-7 flex h-32 w-32 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-emerald-200" />

          <div className="absolute inset-3 rounded-full bg-emerald-50" />

          <span className="relative text-5xl font-black tracking-tighter text-[#00873E]">
            404
          </span>

          <span className="absolute -right-1 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#00873E] text-lg font-bold text-white shadow-lg shadow-emerald-900/20">
            ৳
          </span>
        </div>
        <span className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-[#00873E]">
          পেজটি খুঁজে পাওয়া যায়নি
        </span>

        <h1 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          ওহ! এখানে কিছু নেই
        </h1>

        <p className="mx-auto mb-8 max-w-sm text-sm leading-7 text-gray-500">
          মনে হচ্ছে আপনি ভুল ঠিকানায় চলে এসেছেন।
          পেজটি সরিয়ে ফেলা হয়ে থাকতে পারে অথবা লিংকটি সঠিক নয়।
        </p>

        <Link href="/" className="block w-full">
          <Button
            className="h-12 w-full cursor-pointer rounded-xl bg-[#00873E] text-sm font-semibold text-white shadow-md shadow-emerald-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#007032] hover:shadow-lg"
          >
            <span className="mr-2 text-lg">←</span>
            হোম পেজে ফিরে যান
          </Button>
        </Link>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00873E]" />
          <span>
            Bazar Dor — প্রতিদিনের বাজারদর, এক জায়গায়
          </span>
        </div>
      </div>
    </main>
  );
}