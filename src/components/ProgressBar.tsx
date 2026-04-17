"use client";

import { useEffect, useState } from "react";

export default function ProgressBar({ chapterSlug }: { chapterSlug: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const visited = JSON.parse(localStorage.getItem("visited-chapters") || "[]");
    if (!visited.includes(chapterSlug)) {
      localStorage.setItem(
        "visited-chapters",
        JSON.stringify([...visited, chapterSlug])
      );
    }
  }, [chapterSlug]);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed right-3 top-16 z-[55] hidden sm:block"
      style={{ bottom: 16 }}
    >
      <div className="relative h-full w-1 rounded-full bg-[#E7E5E4]">
        <div
          className="absolute top-0 left-0 w-full rounded-full bg-[#B45309] transition-[height] duration-150 ease-out"
          style={{ height: `${progress}%` }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#B45309] shadow-sm transition-[top] duration-150 ease-out"
          style={{ top: `calc(${progress}% - 5px)` }}
        />
      </div>
    </div>
  );
}
