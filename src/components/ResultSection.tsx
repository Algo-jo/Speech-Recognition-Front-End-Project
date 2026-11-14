import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Sparkles, BookOpen } from 'lucide-react';
import { PracticeSentence, WordAnalysis as WordAnalysisType } from '../types';
import { speakText } from '../utils/audio';

interface ResultSectionProps {
  sentence: PracticeSentence;
  onPracticeAgain: () => void;
  onNavigateHome: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  sentence,
  onPracticeAgain,
  onNavigateHome,
}) => {
  const defaultWord =
    sentence.words.find((w) => w.status !== 'correct') || sentence.words[0];
  const [selectedWord, setSelectedWord] = useState<WordAnalysisType>(defaultWord);
  const [isPlayingSentence, setIsPlayingSentence] = useState(false);

  useEffect(() => {
    const nextDefault =
      sentence.words.find((w) => w.status !== 'correct') || sentence.words[0];
    setSelectedWord(nextDefault);
  }, [sentence]);

  const handlePlaySentence = async () => {
    setIsPlayingSentence(true);
    await speakText(sentence.text, 0.85);
    setIsPlayingSentence(false);
  };

  const handlePlayWord = (wordText: string) => {
    speakText(wordText, 0.75);
  };

  return (
    <div className="max-w-4xl w-full mx-auto py-8 sm:py-14 flex flex-col items-center gap-10 sm:gap-14 text-center">
      {/* 1. Target Sentence (Tengah Atas - Justify Middle, Tanpa Box, Serupa Mic Input Page) */}
      <div className="w-full text-center flex items-center justify-center gap-3 sm:gap-4 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          {sentence.text}
        </h1>

        {/* Speaker Audio Button */}
        <button
          type="button"
          onClick={handlePlaySentence}
          className="p-2.5 sm:p-3 bg-[#18272e] hover:bg-[#202f36] border-2 border-[#37464f] text-[#ffc800] rounded-2xl transition-all shadow-md cursor-pointer shrink-0 active:scale-95"
          title="Listen to native model audio"
          aria-label="Listen audio"
        >
          <Volume2 className={`w-5 h-5 sm:w-6 sm:h-6 ${isPlayingSentence ? 'animate-bounce' : ''}`} />
        </button>
      </div>

      {/* 2. Score Gede (Cukup angka skornya saja tanpa /100, diperbesar, Tanpa Box Background) */}
      <div className="w-full flex flex-col items-center justify-center text-center my-2 sm:my-3">
        <div className="flex items-center justify-center">
          <span className="text-8xl sm:text-9xl md:text-[10.5rem] font-black text-[#ffc800] tracking-tight tabular-nums leading-none drop-shadow-xl select-none">
            {sentence.overallScore}
          </span>
        </div>

        {/* Excellent / Need Improvement Summary Tags */}
        <div className="flex items-center justify-center gap-3 mt-4 sm:mt-5 text-xs sm:text-sm font-bold">
          <span className="px-3.5 py-1.5 rounded-xl bg-[#58cc02]/20 text-[#58cc02] border border-[#58cc02]/40">
            {sentence.correctCount} Excellent
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-[#ff4b4b]/20 text-[#ff4b4b] border border-[#ff4b4b]/40">
            {sentence.incorrectCount} Need Improvement
          </span>
        </div>
      </div>

      {/* 3. Feedback (Bawahnya Baru Feedback, Spaced Out, Tanpa Box Background) */}
      <div className="w-full max-w-2xl px-4 flex flex-col items-center justify-center text-center my-2 sm:my-3">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#ffc800] mb-3">
          <Sparkles className="w-4 h-4 text-[#ffc800]" />
          <span>Feedback</span>
        </div>
        <p className="text-lg sm:text-2xl font-bold text-white/95 leading-relaxed">
          &ldquo;{sentence.aiSummary}&rdquo;
        </p>
      </div>

      {/* 4. Word Breakdown Beserta Tips Pengucapan Per Karakter (Spaced Out, Tanpa Box Background) */}
      <div className="w-full max-w-3xl flex flex-col items-center gap-7 sm:gap-9 px-4 my-3 sm:my-4">
        {/* Word Breakdown Title & Legend */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#202f36] pb-3.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#afbbcf]">
            Word Breakdown
          </span>
          {/* Legend */}
          <div className="flex items-center gap-3.5 text-xs font-semibold text-[#afbbcf]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#58cc02]" /> Excellent
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff9600]" /> Good
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff4b4b]" /> Need Improvement
            </span>
          </div>
        </div>

        {/* Word Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5">
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
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-base font-bold border-2 transition-all cursor-pointer ${badgeStyle} ${
                  isSelected ? 'ring-2 ring-[#ffc800] ring-offset-2 ring-offset-[#131f24] scale-105' : ''
                }`}
              >
                <span>{w.word}</span>
              </button>
            );
          })}
        </div>

        {/* Tips Pengucapan Per Karakter / Phonemes (Langsung di Background Tanpa Box) */}
        <div className="w-full mt-3 flex flex-col items-center">
          {/* Selected Word Header */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
            <span className="text-xs sm:text-sm font-extrabold text-[#afbbcf] uppercase tracking-wider">
              Selected Word:
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white">
              {selectedWord.word}
            </span>
            <span className="font-mono text-sm text-[#ffc800] bg-[#ffc800]/15 px-3 py-0.5 rounded-xl font-bold border border-[#ffc800]/30">
              {selectedWord.ipa}
            </span>
            <button
              type="button"
              onClick={() => handlePlayWord(selectedWord.cleanWord)}
              className="p-2 sm:p-2.5 bg-[#18272e] hover:bg-[#202f36] border-2 border-[#37464f] text-[#ffc800] rounded-xl transition-all shadow-sm cursor-pointer active:scale-95 flex items-center justify-center"
              title={`Pronounce "${selectedWord.cleanWord}"`}
              aria-label="Listen word"
            >
              <Volume2 className="w-4 h-4 text-[#ffc800]" />
            </button>
          </div>

          {/* Character / Phoneme Pronunciation Tips Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {selectedWord.phonemes.map((phoneme, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl border-2 border-[#2b3a42] bg-[#18272e]/60 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-[#ffc800]">
                      {phoneme.symbol}
                    </span>
                    <span className="text-[11px] font-bold text-[#afbbcf] uppercase tracking-wider">
                      {phoneme.label}
                    </span>
                  </div>
                  <p className="text-sm text-white/90 mb-3 leading-relaxed font-medium">
                    {phoneme.tip}
                  </p>
                </div>

                <div className="text-xs text-[#afbbcf] pt-2 border-t border-[#2b3a42]">
                  <span className="font-bold text-white">Mouth & Tongue: </span>
                  {phoneme.mouthGuide.tongue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom Actions: Kiri Try Again, Kanan Try Another Sentence (Balik ke Home / Sentence Options) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-6">
        {/* Tombol Bagian Kiri: Try Again */}
        <button
          type="button"
          onClick={onPracticeAgain}
          className="w-full sm:w-auto min-w-[240px] px-8 py-4.5 rounded-2xl text-sm sm:text-base font-black uppercase tracking-wider bg-[#ffc800] hover:bg-[#e5b400] text-[#131f24] border-b-6 border-[#cc9f00] active:translate-y-1.5 active:border-b-2 cursor-pointer transition-all shadow-xl flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-5 h-5 shrink-0" />
          <span>Try Again</span>
        </button>

        {/* Tombol Bagian Kanan: Try Another Sentence */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="w-full sm:w-auto min-w-[240px] px-8 py-4.5 rounded-2xl text-sm sm:text-base font-black uppercase tracking-wider bg-[#202f36] hover:bg-[#283942] text-white border-2 border-[#37464f] border-b-6 border-[#18272e] active:translate-y-1.5 active:border-b-2 cursor-pointer transition-all shadow-xl flex items-center justify-center gap-3"
        >
          <BookOpen className="w-5 h-5 text-[#ffc800] shrink-0" />
          <span>Try Another Sentence</span>
        </button>
      </div>
    </div>
  );
};
