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
    "An accessible, interactive guide to the foundations of machine learning by Adam El-Kadi. Based on the textbook by Mohri, Rostamizadeh & Talwalkar. Plain English, no PhD required.",
  authors: [{ name: "Adam El-Kadi", url: "https://adamfelkadi.com" }],
  creator: "Adam F. El-Kadi",
  openGraph: {
    title: "Foundations of Machine Learning",
    description:
      "The mathematical backbone of machine learning, explained in plain English. 17 interactive chapters — no PhD required.",
    siteName: "Foundations of Machine Learning",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foundations of Machine Learning",
    description:
      "The mathematical backbone of machine learning, explained in plain English. 17 interactive chapters — no PhD required.",
  },
  other: {
    "article:author": "Adam F. El-Kadi",
  },
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
