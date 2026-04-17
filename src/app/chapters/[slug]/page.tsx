import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters } from "@/data/chapters";
import { chapterActivities } from "@/data/quizzes";
import { getReadingTime } from "@/data/reading-time";
import ProgressBar from "@/components/ProgressBar";
import Quiz from "@/components/Quiz";
import MatchingExercise from "@/components/MatchingExercise";
import SVMVisualization from "@/components/SVMVisualization";
import ScrollReveal from "@/components/ScrollReveal";
import ChapterNav from "@/components/ChapterNav";

export function generateStaticParams() {
  return chapters.map((ch) => ({ slug: ch.slug }));
}

function formatText(text: string): string {
  return text
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong>$1</strong>'
    )
    .replace(
      /`(.+?)`/g,
      '<code>$1</code>'
    );
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = chapters.findIndex((ch) => ch.slug === slug);
  if (index === -1) notFound();

  const chapter = chapters[index];
  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;
  const readingTime = getReadingTime(slug);
  const activities = chapterActivities[slug];

  return (
    <>
      <ProgressBar chapterSlug={slug} />

      <article className="mx-auto max-w-2xl px-6 sm:px-8 pt-12 sm:pt-16 pb-24">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-1.5 font-ui text-xs text-[#A8A29E] hover:text-[#B45309] transition-colors"
        >
          <span>&larr;</span> All Chapters
        </Link>

        <header className="mb-16 sm:mb-20">
          <span className="font-display text-[5rem] sm:text-[7rem] font-light leading-none text-[#E7E5E4] select-none">
            {String(chapter.number).padStart(2, "0")}
          </span>
          <div className="mt-[-1rem] sm:mt-[-1.5rem]">
            <div className="mb-4 flex items-center gap-3 font-ui text-xs text-[#A8A29E]">
              <span>Chapter {chapter.number}</span>
              <span className="text-[#D6D3D1]">/</span>
              <span>{readingTime} min read</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1C1917] leading-[1.15]">
              {chapter.title}
            </h1>
            <p className="mt-3 font-body text-lg text-[#78716C] leading-relaxed">
              {chapter.subtitle}
            </p>
          </div>
        </header>

        <div className="space-y-16 sm:space-y-20">
          {chapter.sections.map((section, i) => (
            <ScrollReveal key={i}>
              <section>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-display text-sm font-medium text-[#B45309] shrink-0">
                    {chapter.number}.{i + 1}
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-medium text-[#1C1917] tracking-tight">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-5 reading-text">
                  {section.content.split("\n\n").map((paragraph, j) => (
                    <p
                      key={j}
                      dangerouslySetInnerHTML={{
                        __html: formatText(paragraph),
                      }}
                    />
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        {slug === "support-vector-machines" && (
          <ScrollReveal>
            <div className="mt-16 rounded-xl border border-[#E7E5E4] bg-white p-6">
              <SVMVisualization />
            </div>
          </ScrollReveal>
        )}

        {activities && (
          <div className="mt-20 space-y-10 border-t border-[#E7E5E4] pt-12">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E7E5E4]" />
              <span className="font-ui text-xs font-medium uppercase tracking-[0.15em] text-[#A8A29E]">
                Practice
              </span>
              <div className="h-px flex-1 bg-[#E7E5E4]" />
            </div>

            {activities.matching && (
              <ScrollReveal>
                <MatchingExercise pairs={activities.matching} />
              </ScrollReveal>
            )}

            {activities.quiz && (
              <ScrollReveal>
                <Quiz questions={activities.quiz} />
              </ScrollReveal>
            )}
          </div>
        )}

        <nav className="mt-20 hidden sm:grid grid-cols-2 gap-6 border-t border-[#E7E5E4] pt-10">
          {prev ? (
            <Link
              href={`/chapters/${prev.slug}`}
              className="group"
            >
              <span className="font-ui text-xs text-[#A8A29E]">&larr; Previous</span>
              <p className="mt-1 font-display text-base font-medium text-[#1C1917] group-hover:text-[#B45309] transition-colors">
                {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/chapters/${next.slug}`}
              className="group text-right"
            >
              <span className="font-ui text-xs text-[#A8A29E]">Next &rarr;</span>
              <p className="mt-1 font-display text-base font-medium text-[#1C1917] group-hover:text-[#B45309] transition-colors">
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>

      <ChapterNav
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
        next={next ? { slug: next.slug, title: next.title } : null}
        currentNumber={chapter.number}
        totalChapters={chapters.length}
      />
    </>
  );
}
