"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ হয়ে যাবে
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে!");
          setIsOpen(false);
          router.push("/signin");
          router.refresh();
        },
        onError: () => {
          toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
        }
      }
    });
  };

  if (isPending) {
    return <div className="h-10 w-20 animate-pulse bg-gray-100 rounded-lg" />;
  }

  // যদি ইউজার লগইন করা থাকে (फिगমা ডিজাইন অনুযায়ী)
  if (session) {
    const user = session.user;
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 focus:outline-none py-1 px-2 rounded-xl hover:bg-gray-50 transition-colors"
        >
          {/* ইউজার ইমেজ বা ফলব্যাক অবতার */}
          <div className="h-10 w-10 overflow-hidden rounded-xl bg-gray-200 border border-gray-100 flex items-center justify-center font-bold text-gray-700">
            {user.image ? (
              <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              user.name?.charAt(0) || "U"
            )}
          </div>
          <span className="text-sm font-semibold text-gray-900">{user.name}</span>
          {/* ছোট অ্যারো আইকন */}
          <svg className={`h-3.5 w-3.5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* ড্রপডাউন মেনু (ফিগমা ডিজাইন ৭ অনুযায়ী) */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white p-3 shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="border-b border-gray-100 pb-3 px-3 pt-2">
              <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
            </div>

            <div className="py-2">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <span>👤</span> আমার প্রোফাইল
              </Link>
            </div>

            <div className="border-t border-gray-100 pt-1">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
              >
                <span>↪</span> সাইন আউট
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // যদি ইউজার লগইন করা না থাকে তবে দুটি বাটন দেখাবে
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Link href="/signin">
        <Button className="h-10 min-w-0 rounded-md bg-transparent px-3 text-[12px] font-semibold text-gray-900 cursor-pointer">
          সাইন ইন
        </Button>
      </Link>

      <Link href="/signup">
        <Button className="h-10 min-w-0 rounded-lg bg-green-700 px-3 text-[12px] font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:bg-green-800 sm:px-4 cursor-pointer">
          সাইন আপ
        </Button>
      </Link>
    </div>
  );
}