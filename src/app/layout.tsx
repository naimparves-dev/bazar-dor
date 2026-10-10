
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Marquee from "@/components/Shared/Marquee";
import { Suspense } from "react";
import Footer from "@/components/Shared/Footer";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের সর্বশেষ দর জানুন।",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${hindSiliguri.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense
          fallback={
            <div className="h-20 border-b border-gray-200" />
          }
        >
          <Navbar />
        </Suspense>
        <Suspense fallback={<div className="h-8" />}>
          <Marquee />
        </Suspense>
        {children}
        <Footer></Footer>
        <Toaster />
      </body>
    </html>
  );
}
