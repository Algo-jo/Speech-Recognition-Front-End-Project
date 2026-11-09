import React from 'react';
import { Sparkles, RotateCcw, Volume2, ArrowRight } from 'lucide-react';
import { PracticeSentence } from '../types';
import { speakText } from '../utils/audio';

interface FeedbackCardProps {
  sentence: PracticeSentence;
  onPracticeAgain: () => void;
  onNextSentence?: () => void;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  sentence,
  onPracticeAgain,
  onNextSentence,
}) => {
  const handlePlayWord = (word: string) => {
    speakText(word, 0.8);
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Actionable Pronunciation Feedback
          </h3>
        </div>

        {/* Primary AI Recommendation */}
        <div className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-100 mb-4">
          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
            {sentence.aiSummary}
          </p>
        </div>

        {/* Focused Sound Drills */}
        {sentence.drills && sentence.drills.length > 0 && (
          <div className="space-y-2.5 mb-4">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
              Target Sound Practice
            </span>
            {sentence.drills.map((drill, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-neutral-200 text-xs bg-neutral-50/50"
              >
                <div className="font-semibold text-neutral-800 mb-1">
                  {drill.title}
                </div>
                <p className="text-[11px] text-neutral-600 mb-2 leading-normal">
                  {drill.instruction}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-neutral-400 font-medium">Examples:</span>
                  {drill.exampleWords.map((word, wIdx) => (
                    <button
                      key={wIdx}
                      type="button"
                      onClick={() => handlePlayWord(word)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-white hover:bg-neutral-100 border border-neutral-200 rounded text-[11px] text-neutral-700 transition-colors"
                      title={`Listen to "${word}"`}
                    >
                      <span>{word}</span>
                      <Volume2 className="w-2.5 h-2.5 text-neutral-400" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accessible Try Again Button */}
      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPracticeAgain}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-colors shadow-2xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>

        {onNextSentence && (
          <button
            type="button"
            onClick={onNextSentence}
            className="inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
          >
            <span>Next exercise</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
