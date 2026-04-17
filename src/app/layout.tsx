import type { Metadata } from "next";
import { Newsreader, Source_Serif_4, DM_Sans, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Foundations of Machine Learning",
  description:
    "An accessible guide to the foundations of machine learning, based on the textbook by Mohri, Rostamizadeh & Talwalkar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${sourceSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <HeaderNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
