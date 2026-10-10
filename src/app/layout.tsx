
import type { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Navlinks from "@/components/Navlinks";
import DateDisplay from "@/components/DateDisplay";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর | প্রতিদিনের বাজারমূল্য",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে দেখুন।",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-emerald-50">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-emerald-100">
          <Header
            date={<DateDisplay />}
            navlinks={
              <Suspense
                fallback={
                  <div
                    className="h-12"
                    aria-hidden="true"
                  />
                }
              >
                <Navlinks />
              </Suspense>
            }
            marquee={
              <Suspense
                fallback={
                  <div
                    className="h-10 border-b border-gray-200"
                    aria-hidden="true"
                  />
                }
              >
                <Marquee />
              </Suspense>
            }
          />
        </div>

        {/* Main Content */}
        <main className="w-full min-w-0 flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
          toastStyle={{
            maxWidth: "calc(100vw - 2rem)",
            overflowWrap: "anywhere",
          }}
        />
      </body>
    </html>
  );
}
