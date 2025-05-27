import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hacklab - Blog",
  description: "Blog personal creado con Next.js + Sanity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${dmSans.variable} antialiased bg-gradient-to-br from-gray-950 via-gray-950 to-black text-white font-sans`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Hero />
          <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
