
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Marquee from "@/components/Shared/Marquee";
import { Suspense } from "react";
import Footer from "@/components/Shared/Footer";

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
      className={`${hindSiliguri.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <Suspense fallback={<div className="h-8" />}>
          <Marquee />
        </Suspense>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
