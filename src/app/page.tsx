import Link from "next/link";
import { chapters } from "@/data/chapters";
import { getReadingTime, getTotalReadingTime } from "@/data/reading-time";

export default function Home() {
  const totalTime = getTotalReadingTime();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-20">
      <section className="mb-20 sm:mb-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div className="max-w-xl">
            <p className="mb-5 text-xs font-ui font-medium uppercase tracking-[0.15em] text-[#78716C]">
              Based on Mohri, Rostamizadeh &amp; Talwalkar
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-[#1C1917]">
              Foundations of
              <br />
              <em className="text-[#B45309]">Machine Learning</em>
            </h1>
            <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-[#57534E]">
              The mathematical backbone of machine learning, explained in plain
              English. No PhD required.
            </p>
          </div>
          <div className="flex flex-row sm:flex-col items-baseline sm:items-end gap-4 sm:gap-1 text-right">
            <span className="font-display text-5xl sm:text-7xl font-light text-[#D6D3D1]">
              {chapters.length}
            </span>
            <div className="font-ui text-xs text-[#78716C]">
              <p>chapters</p>
              <p>{totalTime} min total</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/chapters/introduction"
            className="font-ui rounded-lg bg-[#1C1917] px-6 py-3 text-sm font-medium text-[#FAF7F2] transition-all hover:bg-[#B45309]"
          >
            Start Reading
          </Link>
          <a
            href="#chapters"
            className="font-ui text-sm font-medium text-[#78716C] transition-colors hover:text-[#1C1917]"
          >
            Browse chapters &darr;
          </a>
        </div>
      </section>

      <section id="chapters">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-medium tracking-tight">Table of Contents</h2>
          <span className="font-ui text-xs text-[#A8A29E]">{totalTime} min</span>
        </div>

        <div className="divide-y divide-[#E7E5E4]">
          {chapters.map((chapter) => {
            const time = getReadingTime(chapter.slug);
            return (
              <Link
                key={chapter.slug}
                href={`/chapters/${chapter.slug}`}
                className="group flex items-baseline gap-4 sm:gap-6 py-5 transition-colors hover:bg-[#F5F5F4]/50 -mx-4 px-4 rounded-lg"
              >
                <span className="font-display text-2xl sm:text-3xl font-light text-[#D6D3D1] group-hover:text-[#B45309] transition-colors w-8 sm:w-10 shrink-0 tabular-nums">
                  {String(chapter.number).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base sm:text-lg font-medium text-[#1C1917] group-hover:text-[#B45309] transition-colors truncate">
                    {chapter.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-[#78716C] truncate hidden sm:block">
                    {chapter.subtitle}
                  </p>
                </div>
                <span className="font-ui text-xs text-[#A8A29E] shrink-0">
                  {time} min
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="mt-24 border-t border-[#E7E5E4] pt-8 text-center font-ui text-xs text-[#A8A29E]">
        <p>
          Based on{" "}
          <em className="font-body">Foundations of Machine Learning, 2nd Edition</em>{" "}
          by Mohri, Rostamizadeh &amp; Talwalkar (MIT Press, 2018).
        </p>
        <p className="mt-1.5">
          Content rewritten for accessibility. Not affiliated with the authors or MIT Press.
        </p>
        <p className="mt-3">
          A project by{" "}
          <a
            href="https://adamfelkadi.com"
            className="text-[#78716C] underline underline-offset-2 hover:text-[#B45309] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adam El-Kadi
          </a>.
        </p>
      </footer>
    </div>
  );
}
