import type { Metadata } from "next";
import { Geist, Source_Serif_4 as Source_Serif_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/home/navbar/navbar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Source_Serif_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "e-book platform",
  description: "e-book platform built with MERN stack and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${serif.variable}`}>
      <body className="font-sans antialiased">
        <div className="max-w-5xl mx-auto my-0">
          <Navbar />
          {children}
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
