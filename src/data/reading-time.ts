import { chapters } from "./chapters";

const WORDS_PER_MINUTE = 220;

export function getReadingTime(chapterSlug: string): number {
  const chapter = chapters.find((ch) => ch.slug === chapterSlug);
  if (!chapter) return 0;
  const wordCount = chapter.sections.reduce(
    (sum, section) => sum + section.content.split(/\s+/).length,
    0
  );
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

export function getTotalReadingTime(): number {
  return chapters.reduce((sum, ch) => sum + getReadingTime(ch.slug), 0);
}

export function getChapterWordCount(chapterSlug: string): number {
  const chapter = chapters.find((ch) => ch.slug === chapterSlug);
  if (!chapter) return 0;
  return chapter.sections.reduce(
    (sum, section) => sum + section.content.split(/\s+/).length,
    0
  );
}
