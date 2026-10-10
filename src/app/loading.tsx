
export default function LoadingPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F2F5F0] px-4 py-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-green-100/70 blur-3xl" />

      {/* Loading card */}
      <div className="relative w-full max-w-sm rounded-3xl border border-white bg-white p-8 text-center shadow-xl shadow-emerald-900/5 sm:p-10">
        {/* Animated logo */}
        <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-r-[#00873E] border-t-[#00873E]" />

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00873E] text-3xl font-bold text-white shadow-lg shadow-emerald-900/20">
            ৳
          </div>
        </div>

        {/* Brand */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00873E]" />
          <span className="text-xs font-bold tracking-widest text-[#00873E]">
            BAZAR DOR
          </span>
        </div>

        {/* Loading text */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          লোড হচ্ছে...
        </h1>

        <p className="mx-auto max-w-65 text-sm leading-6 text-gray-500">
          আপনার জন্য বাজারদরের সর্বশেষ তথ্য প্রস্তুত করা হচ্ছে।
          দয়া করে একটু অপেক্ষা করুন।
        </p>

        {/* Tailwind loading indicator */}
        <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-emerald-50">
          <div className="h-full w-full origin-left animate-pulse rounded-full bg-[#00873E]" />
        </div>

        <p className="mt-5 text-xs text-gray-400">
          প্রতিদিনের বাজারদর, এক জায়গায়
        </p>
      </div>
    </main>
  );
}