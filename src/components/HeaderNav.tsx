"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function HeaderNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="group flex items-center gap-3">
            <span className="font-display text-2xl font-medium italic text-[#B45309]">f</span>
            <span className="font-display text-base font-medium tracking-tight text-[#1C1917] group-hover:text-[#B45309] transition-colors hidden sm:block">
              Foundations of ML
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/"
              className={`font-ui text-sm px-3 py-1.5 rounded-md transition-colors ${
                isHome
                  ? "text-[#1C1917] bg-[#E7E5E4]/50"
                  : "text-[#78716C] hover:text-[#1C1917] hover:bg-[#E7E5E4]/30"
              }`}
            >
              Home
            </Link>
            <Link
              href="/chapters/introduction"
              className={`font-ui text-sm px-3 py-1.5 rounded-md transition-colors ${
                !isHome
                  ? "text-[#1C1917] bg-[#E7E5E4]/50"
                  : "text-[#78716C] hover:text-[#1C1917] hover:bg-[#E7E5E4]/30"
              }`}
            >
              Read
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden flex flex-col gap-[5px] p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-[#1C1917] transition-all duration-200 origin-center ${
                menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[#1C1917] transition-all duration-200 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[#1C1917] transition-all duration-200 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>

        <div
          className={`sm:hidden overflow-hidden transition-all duration-200 ${
            menuOpen ? "max-h-40 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 border-t border-[#E7E5E4] pt-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-ui text-sm px-3 py-2 rounded-md text-[#44403C] hover:bg-[#E7E5E4]/30 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/chapters/introduction"
              onClick={() => setMenuOpen(false)}
              className="font-ui text-sm px-3 py-2 rounded-md text-[#44403C] hover:bg-[#E7E5E4]/30 transition-colors"
            >
              Start Reading
            </Link>
          </div>
        </div>
      </div>
      <div className="h-px bg-[#E7E5E4]" />
    </header>
  );
}
