"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ChapterNavProps {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  currentNumber: number;
  totalChapters: number;
}

export default function ChapterNav({ prev, next, currentNumber, totalChapters }: ChapterNavProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > 300);
        ticking = false;
      });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-[#E7E5E4] bg-[#FAF7F2]/90 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {prev ? (
          <Link
            href={`/chapters/${prev.slug}`}
            className="font-ui text-xs text-[#78716C] active:text-[#B45309]"
          >
            <span className="text-[#A8A29E]">&larr;</span> Previous
          </Link>
        ) : (
          <div />
        )}
        <span className="font-ui text-xs text-[#A8A29E]">
          {currentNumber} / {totalChapters}
        </span>
        {next ? (
          <Link
            href={`/chapters/${next.slug}`}
            className="font-ui text-xs text-[#78716C] active:text-[#B45309]"
          >
            Next <span className="text-[#A8A29E]">&rarr;</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
