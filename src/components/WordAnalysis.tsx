import React from 'react';
import { Volume2 } from 'lucide-react';
import { WordAnalysis as WordAnalysisType } from '../types';
import { speakText } from '../utils/audio';

interface WordAnalysisProps {
  words: WordAnalysisType[];
  selectedWordId: string;
  onSelectWord: (word: WordAnalysisType) => void;
}

export const WordAnalysis: React.FC<WordAnalysisProps> = ({
  words,
  selectedWordId,
  onSelectWord,
}) => {
  const handlePlayWord = (e: React.MouseEvent, cleanWord: string) => {
    e.stopPropagation();
    speakText(cleanWord, 0.75);
  };

  const getWordBadgeClass = (status: string, isSelected: boolean) => {
    let classes =
      'group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ';

    if (isSelected) {
      classes += 'ring-2 ring-indigo-500 ring-offset-1 font-semibold ';
    }

    if (status === 'correct') {
      return (
        classes +
        'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/70'
      );
    }
    if (status === 'warning') {
      return (
        classes +
        'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100/70'
      );
    }
    return (
      classes +
      'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100/70'
    );
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-5 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Word-by-Word Analysis
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Select any word to inspect phoneme breakdown and target pronunciation.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-neutral-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Correct
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Partial
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Incorrect
          </span>
        </div>
      </div>

      {/* Words Flow */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {words.map((w) => {
          const isSelected = w.id === selectedWordId;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => onSelectWord(w)}
              className={getWordBadgeClass(w.status, isSelected)}
              aria-pressed={isSelected}
            >
              <span>{w.word}</span>
              <span className="font-mono text-[10px] opacity-75 tabular-nums">
                {w.score}%
              </span>
              <span
                onClick={(e) => handlePlayWord(e, w.cleanWord)}
                className="p-0.5 rounded text-neutral-400 hover:text-neutral-700 transition-colors"
                title={`Hear "${w.cleanWord}"`}
              >
                <Volume2 className="w-3 h-3" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
