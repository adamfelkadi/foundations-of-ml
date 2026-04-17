"use client";

import { useState, useCallback } from "react";
import type { MatchingPair } from "@/data/quizzes";

const MATCH_COLORS = [
  { border: "border-[#B45309]",  bg: "bg-[#FFFBEB]",  text: "text-[#92400E]",  dot: "bg-[#B45309]" },
  { border: "border-[#0F766E]",  bg: "bg-[#F0FDFA]",  text: "text-[#134E4A]",  dot: "bg-[#0F766E]" },
  { border: "border-[#7C3AED]",  bg: "bg-[#F5F3FF]",  text: "text-[#4C1D95]",  dot: "bg-[#7C3AED]" },
  { border: "border-[#2563EB]",  bg: "bg-[#EFF6FF]",  text: "text-[#1E3A8A]",  dot: "bg-[#2563EB]" },
  { border: "border-[#DB2777]",  bg: "bg-[#FDF2F8]",  text: "text-[#831843]",  dot: "bg-[#DB2777]" },
  { border: "border-[#059669]",  bg: "bg-[#ECFDF5]",  text: "text-[#064E3B]",  dot: "bg-[#059669]" },
  { border: "border-[#DC2626]",  bg: "bg-[#FEF2F2]",  text: "text-[#7F1D1D]",  dot: "bg-[#DC2626]" },
  { border: "border-[#CA8A04]",  bg: "bg-[#FEFCE8]",  text: "text-[#713F12]",  dot: "bg-[#CA8A04]" },
];

export default function MatchingExercise({
  pairs,
}: {
  pairs: MatchingPair[];
}) {
  const [shuffledDefs] = useState(() =>
    [...pairs.map((p, i) => ({ text: p.definition, originalIndex: i }))]
      .sort(() => Math.random() - 0.5)
  );
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const matchOrder: number[] = [];
  const seen = new Set<number>();
  Object.keys(matches).forEach((k) => {
    const termIdx = Number(k);
    if (!seen.has(termIdx)) {
      matchOrder.push(termIdx);
      seen.add(termIdx);
    }
  });

  function getMatchColorIndex(termIndex: number): number {
    const idx = matchOrder.indexOf(termIndex);
    return idx === -1 ? 0 : idx % MATCH_COLORS.length;
  }

  function getDefMatchedTerm(defIndex: number): number | null {
    const entry = Object.entries(matches).find(([, v]) => v === defIndex);
    return entry ? Number(entry[0]) : null;
  }

  const handleTermClick = useCallback(
    (termIndex: number) => {
      if (checked) return;
      setSelectedTerm(termIndex === selectedTerm ? null : termIndex);
    },
    [checked, selectedTerm]
  );

  const handleDefClick = useCallback(
    (defIndex: number) => {
      if (checked || selectedTerm === null) return;
      setMatches((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          if (next[Number(key)] === defIndex) delete next[Number(key)];
        });
        next[selectedTerm] = defIndex;
        return next;
      });
      setSelectedTerm(null);
    },
    [checked, selectedTerm]
  );

  const allMatched = Object.keys(matches).length === pairs.length;

  function getTermStatus(termIndex: number) {
    if (!checked) return null;
    const defIndex = matches[termIndex];
    if (defIndex === undefined) return null;
    return shuffledDefs[defIndex].originalIndex === termIndex
      ? "correct"
      : "incorrect";
  }

  function getDefStatus(defIndex: number) {
    if (!checked) return null;
    const matchedTerm = Object.entries(matches).find(
      ([, v]) => v === defIndex
    );
    if (!matchedTerm) return null;
    return shuffledDefs[defIndex].originalIndex === Number(matchedTerm[0])
      ? "correct"
      : "incorrect";
  }

  const score = checked
    ? Object.entries(matches).filter(
        ([termIdx, defIdx]) =>
          shuffledDefs[defIdx].originalIndex === Number(termIdx)
      ).length
    : 0;

  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl font-medium text-[#1C1917]">
        Match the Concepts
      </h3>
      <p className="font-ui text-sm text-[#78716C]">
        Click a term on the left, then click its matching definition on the
        right. Each pair gets its own color.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          {pairs.map((pair, i) => {
            const status = getTermStatus(i);
            const isSelected = selectedTerm === i;
            const isMatched = matches[i] !== undefined;
            const color = isMatched ? MATCH_COLORS[getMatchColorIndex(i)] : null;

            let classes =
              "w-full rounded-lg border px-4 py-3 text-left font-ui text-sm transition-all flex items-center gap-2";
            if (status === "correct") {
              classes += " border-emerald-400 bg-emerald-50 text-emerald-900";
            } else if (status === "incorrect") {
              classes += " border-red-300 bg-red-50 text-red-900";
            } else if (isSelected) {
              classes += " border-[#1C1917] bg-[#F5F5F4] text-[#1C1917] ring-1 ring-[#1C1917]";
            } else if (isMatched && color) {
              classes += ` ${color.border} ${color.bg} ${color.text}`;
            } else {
              classes +=
                " border-[#E7E5E4] bg-white text-[#44403C] hover:border-[#78716C] cursor-pointer";
            }

            return (
              <button
                key={i}
                onClick={() => handleTermClick(i)}
                disabled={checked}
                className={classes}
              >
                {isMatched && !checked && color && (
                  <span className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${color.dot}`} />
                )}
                <span className="font-medium">{pair.term}</span>
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {shuffledDefs.map((def, i) => {
            const status = getDefStatus(i);
            const matchedTerm = getDefMatchedTerm(i);
            const isMatched = matchedTerm !== null;
            const color = isMatched ? MATCH_COLORS[getMatchColorIndex(matchedTerm)] : null;

            let classes =
              "w-full rounded-lg border px-4 py-3 text-left font-ui text-sm transition-all flex items-center gap-2";
            if (status === "correct") {
              classes += " border-emerald-400 bg-emerald-50 text-emerald-900";
            } else if (status === "incorrect") {
              classes += " border-red-300 bg-red-50 text-red-900";
            } else if (isMatched && color) {
              classes += ` ${color.border} ${color.bg} ${color.text}`;
            } else {
              classes +=
                " border-[#E7E5E4] bg-white text-[#44403C] hover:border-[#78716C] cursor-pointer";
            }

            return (
              <button
                key={i}
                onClick={() => handleDefClick(i)}
                disabled={checked || selectedTerm === null}
                className={classes}
              >
                {isMatched && !checked && color && (
                  <span className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${color.dot}`} />
                )}
                <span>{def.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {allMatched && !checked && (
          <button
            onClick={() => setChecked(true)}
            className="font-ui rounded-lg bg-[#1C1917] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B45309]"
          >
            Check Matches
          </button>
        )}
        {checked && (
          <p
            className={`font-ui text-sm font-medium ${
              score === pairs.length ? "text-emerald-700" : "text-[#44403C]"
            }`}
          >
            {score === pairs.length
              ? "Perfect! All matches correct."
              : `${score} of ${pairs.length} correct. Green = correct, red = wrong match.`}
          </p>
        )}
        {checked && (
          <button
            onClick={() => {
              setMatches({});
              setChecked(false);
              setSelectedTerm(null);
            }}
            className="font-ui rounded-lg border border-[#E7E5E4] bg-white px-4 py-2 text-sm font-medium text-[#78716C] transition-colors hover:text-[#1C1917]"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
