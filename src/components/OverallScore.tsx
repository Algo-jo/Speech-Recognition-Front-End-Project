import React from 'react';
import { Check, X } from 'lucide-react';
import { PracticeSentence } from '../types';

interface OverallScoreProps {
  sentence: PracticeSentence;
  isMockFallback?: boolean;
}

export const OverallScore: React.FC<OverallScoreProps> = ({
  sentence,
  isMockFallback = true,
}) => {
  const score = sentence.overallScore;

  const getScoreRating = (s: number) => {
    if (s >= 90) return { label: 'Excellent', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (s >= 80) return { label: 'Good', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    if (s >= 70) return { label: 'Partially Accurate', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Needs Practice', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const rating = getScoreRating(score);

  return (
    <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Overall Pronunciation Score
          </span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${rating.color}`}>
            {rating.label}
          </span>
        </div>

        {/* Big Score Display */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 tabular-nums">
            {score}
          </span>
          <span className="text-base text-neutral-400 font-medium">/ 100</span>
        </div>

        {/* Clean Linear Progress Indicator */}
        <div className="w-full bg-neutral-100 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              score >= 85
                ? 'bg-emerald-500'
                : score >= 75
                ? 'bg-indigo-600'
                : 'bg-amber-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Short AI-generated Assessment */}
        <p className="text-xs text-neutral-600 leading-relaxed mb-4">
          {score >= 85
            ? 'Strong overall clarity with minor phoneme variance. Most word codas were pronounced with accurate vocal voicing.'
            : 'Good foundational rhythm. A few voiced fricatives and ending consonants deviated from native benchmark.'}
        </p>
      </div>

      {/* Word Statistics: Correct and Incorrect */}
      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
          <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-emerald-600" />
          </span>
          <span>{sentence.correctCount} Correct Words</span>
        </div>

        <div className="flex items-center gap-1.5 text-rose-700 font-medium">
          <span className="w-4 h-4 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center">
            <X className="w-2.5 h-2.5 text-rose-600" />
          </span>
          <span>{sentence.incorrectCount} Needs Work</span>
        </div>
      </div>
    </div>
  );
};
