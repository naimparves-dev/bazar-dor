"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setLoading(true);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("স্বাগতম! সফলভাবে সাইন ইন হয়েছে।");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে।");
          setLoading(false);
        },
      }
    );
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F2F5F0] px-4 py-8 sm:py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
        
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">সাইন ইন</h1>
          <p className="text-xs sm:text-sm text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
        </div>

        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "দয়া করে একটি সঠিক ইমেইল ঠিকানা দিন";
              }
              return null;
            }}
          >
            <Label className="block text-sm font-medium text-gray-700 mb-1.5">ইমেইল</Label>
            <Input
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00873E] bg-white"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label className="block text-sm font-medium text-gray-700 mb-1.5">পাসওয়ার্ড</Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00873E] bg-white"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full mt-2 rounded-xl bg-[#00873E] py-3.5 text-sm font-medium text-white hover:bg-[#007032] transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </Button>
        </Form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-400">অথবা</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span>🌐</span> Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span>💻</span> GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-[#00873E] font-medium hover:underline">
            সাইন আপ করুন
          </Link>
        </p>

      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}