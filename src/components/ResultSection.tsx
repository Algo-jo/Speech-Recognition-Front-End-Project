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
    <div className="max-w-4xl w-full mx-auto py-5 sm:py-8 px-4 sm:px-6 flex flex-col items-center gap-7 sm:gap-9">
      {/* 1. Target Sentence (Tengah Atas - Tanpa Box, Tanpa Label, Tanpa Tanda Petik, Sama Persis dengan Mic Input Page) */}
      <div className="w-full text-center flex items-center justify-center gap-3 sm:gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          {sentence.text}
        </h1>

        <button
          type="button"
          onClick={() => handlePlayWord(sentence.text)}
          className="p-2.5 sm:p-3 bg-[#18272e] hover:bg-[#202f36] border-2 border-[#37464f] text-[#ffc800] rounded-2xl transition-all shadow-md cursor-pointer shrink-0 active:scale-95"
          title="Listen sentence"
          aria-label="Listen sentence"
        >
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffc800]" />
        </button>
      </div>

      {/* 2. Big Score / 100 (Tanpa judul "Overall Score", Tanpa Box) */}
      <div className="w-full flex flex-col items-center text-center">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-6xl sm:text-7xl font-black text-[#ffc800] tabular-nums leading-none">
            {sentence.overallScore}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-[#afbbcf]">/ 100</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3 text-xs font-bold">
          <span className={`px-3 py-1 rounded-xl border ${rating.color}`}>
            {rating.label}
          </span>
          <span className="px-3 py-1 rounded-xl bg-[#58cc02]/15 text-[#58cc02] border border-[#58cc02]/30">
            {sentence.correctCount} Excellent
          </span>
          <span className="px-3 py-1 rounded-xl bg-[#ff4b4b]/15 text-[#ff4b4b] border border-[#ff4b4b]/30">
            {sentence.incorrectCount} Need Improvement
          </span>
        </div>
      </div>

      {/* 3. Feedback (Langsung di bawah Score, Tanpa Box) */}
      <div className="max-w-2xl w-full text-center flex flex-col items-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#ffc800] mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#ffc800]" />
          <span>Feedback</span>
        </div>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
          {sentence.aiSummary}
        </p>
      </div>

      {/* 4. Word Breakdown & Tips Pengucapan per Karakter (Tanpa Box Background) */}
      <div className="w-full flex flex-col items-center pt-4 border-t border-[#2b3a42]">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#afbbcf]">
            Word Breakdown
          </h3>
          <div className="flex items-center gap-3 text-[11px] font-semibold text-[#afbbcf]">
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

        {/* Interactive Word Chips (Tanpa percentage) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-7">
          {sentence.words.map((w) => {
            const isSelected = w.id === selectedWord.id;
            const badgeStyle =
              w.status === 'correct'
                ? 'bg-[#58cc02]/15 text-[#58cc02] border-[#58cc02]/40 hover:bg-[#58cc02]/25'
                : w.status === 'warning'
                ? 'bg-[#ff9600]/15 text-[#ff9600] border-[#ff9600]/40 hover:bg-[#ff9600]/25'
                : 'bg-[#ff4b4b]/15 text-[#ff4b4b] border-[#ff4b4b]/40 hover:bg-[#ff4b4b]/25';

            return (
              <button
                key={w.id}
                type="button"
                onClick={() => setSelectedWord(w)}
                className={`px-4 py-2 rounded-2xl text-sm sm:text-base font-bold border-2 flex items-center gap-2 transition-all cursor-pointer ${badgeStyle} ${
                  isSelected ? 'ring-2 ring-[#ffc800] ring-offset-2 ring-offset-[#131f24] scale-105' : ''
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

        {/* Selected Word & Tips Pengucapan per Karakter (Tanpa Box Background) */}
        <div className="w-full pt-5 border-t border-[#2b3a42]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-black text-white">
                {selectedWord.word}
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#ffc800] bg-[#ffc800]/10 px-2.5 py-0.5 rounded-lg font-bold border border-[#ffc800]/30">
                {selectedWord.ipa}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handlePlayWord(selectedWord.cleanWord)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#18272e] hover:bg-[#202f36] border border-[#37464f] text-[#ffc800] rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#ffc800]" />
              <span>Listen</span>
            </button>
          </div>

          {/* Phonemes / Character Pronunciation Tips without boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {selectedWord.phonemes.map((phoneme, idx) => (
              <div
                key={idx}
                className="pl-4 border-l-2 border-[#ffc800]/60 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-black text-white block mb-1">
                    {phoneme.symbol}
                  </span>
                  <p className="text-xs sm:text-sm text-[#afbbcf] mb-2 leading-relaxed">
                    {phoneme.tip}
                  </p>
                </div>

                <div className="text-xs text-[#afbbcf]/90">
                  <span className="font-bold text-white">Placement: </span>
                  {phoneme.mouthGuide.tongue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Tombol Practice Again Paling Bawah */}
      <div className="w-full flex justify-center pt-2">
        <button
          type="button"
          onClick={onPracticeAgain}
          className="min-w-[280px] sm:min-w-[340px] px-8 sm:px-10 py-4 sm:py-4.5 bg-[#ffc800] hover:bg-[#e5b400] text-[#131f24] text-sm sm:text-base font-black uppercase tracking-wider rounded-2xl border-b-6 border-[#cc9f00] active:translate-y-1.5 active:border-b-2 transition-all shadow-2xl flex items-center justify-center gap-3 cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-5 h-5 shrink-0" />
          <span>Practice Again</span>
        </button>
      </div>
    </div>
  );
};
