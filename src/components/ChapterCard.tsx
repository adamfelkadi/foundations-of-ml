import Link from "next/link";
import ChapterIcon from "./ChapterIcon";

interface ChapterCardProps {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  readingTime?: number;
}

export default function ChapterCard({
  number,
  slug,
  title,
  subtitle,
  icon,
  readingTime,
}: ChapterCardProps) {
  return (
    <Link
      href={`/chapters/${slug}`}
      className="group block rounded-xl border border-[#e5e7eb] bg-white p-6 transition-all hover:border-[#2563eb]/30 hover:shadow-lg hover:shadow-blue-100/50"
    >
      <div className="mb-4 flex items-start justify-between">
        <ChapterIcon name={icon} size="large" />
        <div className="flex items-center gap-2">
          {readingTime && (
            <span className="text-xs text-[#6b7280]">{readingTime} min</span>
          )}
          <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-xs font-medium text-[#6b7280]">
            Ch. {number}
          </span>
        </div>
      </div>
      <h3 className="mb-1.5 text-lg font-semibold text-[#1a1a1a] group-hover:text-[#2563eb] transition-colors">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[#6b7280]">{subtitle}</p>
    </Link>
  );
}
