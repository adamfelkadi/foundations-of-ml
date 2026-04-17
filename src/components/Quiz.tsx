"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/data/quizzes";

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  function handleSelect(questionIndex: number, optionIndex: number) {
    if (revealed[questionIndex]) return;
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  }

  function handleCheck(questionIndex: number) {
    setRevealed((prev) => ({ ...prev, [questionIndex]: true }));
  }

  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl font-medium text-[#1C1917]">
        Test Your Understanding
      </h3>
      {questions.map((q, qi) => {
        const selected = answers[qi];
        const isRevealed = revealed[qi];
        const isCorrect = selected === q.correctIndex;

        return (
          <div
            key={qi}
            className="rounded-xl border border-[#E7E5E4] bg-white p-5"
          >
            <p className="mb-4 font-body font-medium text-[#1C1917]">
              <span className="mr-2 font-ui text-sm text-[#A8A29E]">{qi + 1}.</span>
              {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option, oi) => {
                let borderColor = "border-[#E7E5E4]";
                let bgColor = "bg-white";
                let textColor = "text-[#44403C]";

                if (isRevealed) {
                  if (oi === q.correctIndex) {
                    borderColor = "border-emerald-400";
                    bgColor = "bg-emerald-50";
                    textColor = "text-emerald-900";
                  } else if (oi === selected && !isCorrect) {
                    borderColor = "border-red-300";
                    bgColor = "bg-red-50";
                    textColor = "text-red-900";
                  }
                } else if (selected === oi) {
                  borderColor = "border-[#B45309]";
                  bgColor = "bg-[#FFFBEB]";
                  textColor = "text-[#92400E]";
                }

                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(qi, oi)}
                    disabled={isRevealed}
                    className={`w-full rounded-lg border ${borderColor} ${bgColor} px-4 py-3 text-left font-ui text-sm ${textColor} transition-all ${
                      !isRevealed
                        ? "hover:border-[#B45309]/50 hover:bg-[#FFFBEB]/50 cursor-pointer"
                        : ""
                    }`}
                  >
                    <span className="mr-2 font-medium text-[#A8A29E]">
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-3">
              {!isRevealed && selected !== undefined && (
                <button
                  onClick={() => handleCheck(qi)}
                  className="font-ui rounded-lg bg-[#1C1917] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B45309]"
                >
                  Check Answer
                </button>
              )}
              {isRevealed && (
                <div
                  className={`flex-1 rounded-lg px-4 py-3 font-body text-sm ${
                    isCorrect
                      ? "bg-emerald-50 text-emerald-900"
                      : "bg-red-50 text-red-900"
                  }`}
                >
                  <p className="font-medium">
                    {isCorrect ? "Correct!" : "Not quite."}
                  </p>
                  <p className="mt-1 opacity-80">{q.explanation}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
