
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import Navlink from "./Navlink";
import { Suspense } from "react";
import { connection } from "next/server";
import UserMenu from "./UserMenu";

const Navbar = async() => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

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
            {date}
            <p className="text-[10px] leading-4 text-gray-600" />
          </div>
        </Link>

        <UserMenu />
      </div>

      {/* Full-width border + contained category navbar */}
      <div className="w-full border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          {/* <Suspense fallback={<div className="h-[52px]" />}>
            <Navlink />
          </Suspense> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
