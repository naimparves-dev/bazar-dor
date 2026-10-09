
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import Navlink from "./Navlink";
import { Suspense } from "react";

const Navbar = () => {
  return (
    <header className="w-full bg-[#fafcf9]">
      {/* Top Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-5">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            width={30}
            height={30}
            priority
            className="h-[30px] w-[30px] rounded-lg object-contain"
          />

          <div className="flex flex-col">
            <h1 className="text-base font-bold leading-5 text-gray-900">
              বাজার দর
            </h1>
            <p className="text-[10px] leading-4 text-gray-600" />
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/sign-in">
            <Button className="h-10 min-w-0 rounded-md bg-transparent px-3 text-[12px] font-semibold text-gray-900">
              সাইন ইন
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="h-10 min-w-0 rounded-lg bg-green-700 px-3 text-[12px] font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:bg-green-800 sm:px-4">
              সাইন আপ
            </Button>
          </Link>
        </div>
      </div>

      {/* Full-width border + contained category navbar */}
      <div className="w-full border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <Suspense fallback={<div className="h-[52px]" />}>
            <Navlink />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
