"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [name, setName] = useState(() => session?.user?.name || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }

    setLoading(true);

    await authClient.updateUser(
      {
        name: name,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
          setLoading(false);
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "আপডেট করতে সমস্যা হয়েছে।");
          setLoading(false);
        },
      }
    );
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে!");
          router.push("/signin");
          router.refresh();
        },
        onError: () => {
          toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F5F0]">
        <p className="text-gray-500 text-sm">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F5F0] gap-4">
        <p className="text-gray-700">এই পেজটি দেখতে হলে আপনাকে আগে সাইন ইন করতে হবে।</p>
        <button
          onClick={() => router.push("/signin")}
          className="rounded-xl bg-[#00873E] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#007032] transition-colors"
        >
          সাইন ইন করুন
        </button>
      </div>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-[#F2F5F0] px-4 py-12">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">আমার প্রোফাইল</h1>
          <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও পরিবর্তন করুন।</p>
        </div>

        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-2xl bg-gray-200 border border-gray-100 flex items-center justify-center font-bold text-xl text-gray-700">
              {user.image && user.image.startsWith("http") ? (
                <Image
                  src={user.image}
                  alt={user.name || "User profile"}
                  width={64}
                  height={64}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{user.name?.charAt(0).toUpperCase() || "U"}</span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <span>↪</span> সাইন আউট
          </button>
        </div>

        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-6">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">নাম</label>
              <input
                type="text"
                defaultValue={user.name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00873E] bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#00873E] py-3.5 text-sm font-medium text-white hover:bg-[#007032] transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}