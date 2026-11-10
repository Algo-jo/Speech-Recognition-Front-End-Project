import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Sparkles } from 'lucide-react';
import { PracticeSentence, WordAnalysis as WordAnalysisType } from '../types';
import { speakText } from '../utils/audio';

interface ResultSectionProps {
  sentence: PracticeSentence;
  onPracticeAgain: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  sentence,
  onPracticeAgain,
}) => {
  const defaultWord =
    sentence.words.find((w) => w.status !== 'correct') || sentence.words[0];
  const [selectedWord, setSelectedWord] = useState<WordAnalysisType>(defaultWord);

  useEffect(() => {
    const nextDefault =
      sentence.words.find((w) => w.status !== 'correct') || sentence.words[0];
    setSelectedWord(nextDefault);
  }, [sentence]);

  const handlePlayWord = (wordText: string) => {
    speakText(wordText, 0.75);
  };

  const getScoreRating = (s: number) => {
    if (s >= 90) return { label: 'Excellent', color: 'text-[#58cc02] bg-[#58cc02]/15 border-[#58cc02]/30' };
    if (s >= 80) return { label: 'Good', color: 'text-[#ffc800] bg-[#ffc800]/15 border-[#ffc800]/30' };
    return { label: 'Need Improvement', color: 'text-[#ff4b4b] bg-[#ff4b4b]/15 border-[#ff4b4b]/30' };
  };

  const rating = getScoreRating(sentence.overallScore);

  return (
    <div className="max-w-5xl w-full mx-auto py-3 sm:py-5 flex flex-col justify-center">
      {/* 2-Column Grid: Kiri Target Sentence + Overall Score; Kanan Word Breakdown + Phonemes + Practice Again */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* KOLOM KIRI: Target Sentence & Overall Score (Simple) */}
        <div className="lg:col-span-5 flex flex-col justify-start gap-4">
          {/* 1. Target Sentence Box */}
          <div className="bg-[#202f36] rounded-3xl border-2 border-[#2b3a42] p-5 sm:p-6 shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <span className="text-xs font-extrabold text-[#afbbcf] uppercase tracking-wider block mb-1">
                  Target Sentence
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  &ldquo;{sentence.text}&rdquo;
                </h2>
              </div>

              <button
                type="button"
                onClick={() => handlePlayWord(sentence.text)}
                className="p-3 bg-[#131f24] hover:bg-[#18272e] border border-[#37464f] text-[#ffc800] rounded-2xl transition-all shadow-sm shrink-0 active:scale-95 cursor-pointer"
                title="Listen sentence"
              >
                <Volume2 className="w-5 h-5 text-[#ffc800]" />
              </button>
            </div>
          </div>

          {/* 2. Overall Score Box (Simple - Anchored to Top) */}
          <div className="bg-[#202f36] rounded-3xl border-2 border-[#2b3a42] p-6 shadow-md flex flex-col justify-start">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#afbbcf]">
                  Overall Score
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${rating.color}`}>
                  {rating.label}
                </span>
              </div>

              <div className="flex items-baseline gap-2 my-2">
                <span className="text-5xl sm:text-6xl font-black text-[#ffc800] tabular-nums">
                  {sentence.overallScore}
                </span>
                <span className="text-lg font-bold text-[#afbbcf]">/ 100</span>
              </div>

              {/* Excellent / Need Improvement Summary */}
              <div className="flex items-center gap-3 my-3 text-xs font-bold">
                <span className="px-3 py-1 rounded-xl bg-[#58cc02]/20 text-[#58cc02] border border-[#58cc02]/40">
                  {sentence.correctCount} Excellent
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#ff4b4b]/20 text-[#ff4b4b] border border-[#ff4b4b]/40">
                  {sentence.incorrectCount} Need Improvement
                </span>
              </div>
            </div>

            {/* FEEDBACK (Tetap di atas, tidak justify ke bawah) */}
            <div className="mt-4 pt-4 border-t border-[#2b3a42]">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#ffc800] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#ffc800]" />
                <span>Feedback</span>
              </div>
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-medium">
                {sentence.aiSummary}
              </p>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Word Breakdown + Phonemes + Tombol Practice Again di Paling Bawah */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          {/* 1. Word-by-Word Breakdown (Tanpa percentage score pada kata) */}
          <div className="bg-[#202f36] rounded-3xl border-2 border-[#2b3a42] p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#afbbcf]">
                Word Breakdown
              </h3>
              {/* Legend: Excellent, Good, Need Improvement */}
              <div className="flex items-center gap-2.5 text-[11px] font-semibold text-[#afbbcf]">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#58cc02]" /> Excellent
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#ff9600]" /> Good
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#ff4b4b]" /> Need Improvement
                </span>
              </div>
            </div>

            {/* Word Chips tanpa percentage */}
            <div className="flex flex-wrap items-center gap-2">
              {sentence.words.map((w) => {
                const isSelected = w.id === selectedWord.id;
                let badgeStyle =
                  w.status === 'correct'
                    ? 'bg-[#58cc02]/20 text-[#58cc02] border-[#58cc02]/40 hover:bg-[#58cc02]/30'
                    : w.status === 'warning'
                    ? 'bg-[#ff9600]/20 text-[#ff9600] border-[#ff9600]/40 hover:bg-[#ff9600]/30'
                    : 'bg-[#ff4b4b]/20 text-[#ff4b4b] border-[#ff4b4b]/40 hover:bg-[#ff4b4b]/30';

                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setSelectedWord(w)}
                    className={`px-4 py-2 rounded-2xl text-sm font-bold border-2 flex items-center gap-2 transition-all cursor-pointer ${badgeStyle} ${
                      isSelected ? 'ring-2 ring-[#ffc800] ring-offset-2 ring-offset-[#202f36] scale-105' : ''
                    }`}
                  >
                    <span>{w.word}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayWord(w.cleanWord);
                      }}
                      className="p-0.5 rounded text-white/70 hover:text-white transition-colors"
                      title={`Pronounce "${w.cleanWord}"`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Phonemes Details: Cukup berupa TIPS, tanpa score, tanpa speaker suara */}
          <div className="bg-[#202f36] rounded-3xl border-2 border-[#2b3a42] p-5 sm:p-6 shadow-md flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#2b3a42]">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-extrabold text-[#afbbcf] uppercase tracking-wider">
                    Selected Word:
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {selectedWord.word}
                  </span>
                  <span className="font-mono text-xs text-[#ffc800] bg-[#ffc800]/15 px-2 py-0.5 rounded-lg font-bold border border-[#ffc800]/30">
                    {selectedWord.ipa}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handlePlayWord(selectedWord.cleanWord)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#131f24] hover:bg-[#18272e] border border-[#37464f] text-[#ffc800] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#ffc800]" />
                  <span>Listen</span>
                </button>
              </div>

              {/* Phonemes Grid (Hanya Simbol, Tips, dan Placement - Tanpa score & tanpa speaker) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedWord.phonemes.map((phoneme, idx) => {
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl border-2 border-[#2b3a42] bg-[#131f24]/70 flex flex-col justify-between"
                    >
                      <div>
                        <div className="mb-1.5">
                          <span className="font-mono text-2xl font-black text-white block">
                            {phoneme.symbol}
                          </span>
                        </div>

                        <p className="text-xs text-[#afbbcf] mb-2 leading-snug">
                          {phoneme.tip}
                        </p>
                      </div>

                      <div className="text-[11px] text-[#afbbcf] pt-1.5 border-t border-[#2b3a42]">
                        <span className="font-bold text-white">Placement: </span>
                        {phoneme.mouthGuide.tongue}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Tombol Practice Again Paling Bawah */}
          <button
            type="button"
            onClick={onPracticeAgain}
            className="w-full py-4 px-6 bg-[#ffc800] hover:bg-[#e5b400] text-[#131f24] text-base font-black uppercase tracking-wider rounded-2xl border-b-6 border-[#cc9f00] active:translate-y-1 active:border-b-2 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Practice Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
