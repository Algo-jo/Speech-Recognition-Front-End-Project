import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, CheckCircle2, AlertCircle, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import { PracticeSentence, WordAnalysis as WordAnalysisType } from '../types';
import { speakText, playPhonemeSound } from '../utils/audio';

interface ResultSectionProps {
  sentence: PracticeSentence;
  onBackToHome: () => void;
  onPracticeAgain: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  sentence,
  onBackToHome,
  onPracticeAgain,
}) => {
  // Focus on the word needing attention (e.g. 'is' in default sentence), or first word
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

  const handlePlayPhoneme = (symbol: string, isVoiced: boolean) => {
    playPhonemeSound(symbol, isVoiced);
  };

  const getScoreRating = (s: number) => {
    if (s >= 90) return { label: 'Excellent', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (s >= 80) return { label: 'Good', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    if (s >= 70) return { label: 'Partially Accurate', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Needs Practice', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const rating = getScoreRating(sentence.overallScore);

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 space-y-6">
      {/* Tombol BACK buat kembali ke HOME */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-50 border border-neutral-200/90 rounded-xl transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-600" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          Pronunciation Assessment
        </span>
      </div>

      {/* Target Sentence Header */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-5 sm:p-6 flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
            Sentence
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
            &ldquo;{sentence.text}&rdquo;
          </h2>
          <span className="text-xs font-mono text-neutral-500 mt-0.5 block">
            {sentence.ipa}
          </span>
        </div>

        <button
          type="button"
          onClick={() => handlePlayWord(sentence.text)}
          className="p-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl transition-colors shrink-0"
          title="Listen sentence"
        >
          <Volume2 className="w-4 h-4 text-indigo-600" />
        </button>
      </div>

      {/* Simplified Overall Score & AI Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Score Box */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Overall Score
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${rating.color}`}>
                {rating.label}
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <span className="text-4xl font-extrabold text-neutral-900 tabular-nums">
                {sentence.overallScore}
              </span>
              <span className="text-sm font-medium text-neutral-400">/ 100</span>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
            <span className="font-medium text-emerald-700">{sentence.correctCount} Correct</span>
            <span className="font-medium text-rose-700">{sentence.incorrectCount} Incorrect</span>
          </div>
        </div>

        {/* AI Feedback Box */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>AI Pronunciation Feedback</span>
            </div>
            <p className="text-sm text-neutral-800 leading-relaxed font-normal">
              {sentence.aiSummary}
            </p>
          </div>

          <div className="pt-3 border-t border-neutral-100 text-xs text-neutral-500">
            Click on any word below to inspect its phonemes and sound guidance.
          </div>
        </div>
      </div>

      {/* Word-by-Word Analysis */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Word-by-Word Breakdown
          </h3>
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

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {sentence.words.map((w) => {
            const isSelected = w.id === selectedWord.id;
            let badgeColor =
              w.status === 'correct'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100/70'
                : w.status === 'warning'
                ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100/70'
                : 'bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100/70';

            return (
              <button
                key={w.id}
                type="button"
                onClick={() => setSelectedWord(w)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${badgeColor} ${
                  isSelected ? 'ring-2 ring-indigo-600 ring-offset-1 font-semibold' : ''
                }`}
              >
                <span>{w.word}</span>
                <span className="font-mono text-[10px] opacity-75 tabular-nums">
                  {w.score}%
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayWord(w.cleanWord);
                  }}
                  className="p-0.5 rounded text-neutral-400 hover:text-neutral-700 transition-colors"
                  title={`Pronounce "${w.cleanWord}"`}
                >
                  <Volume2 className="w-3 h-3" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simplified Phoneme Details for Selected Word */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Selected Word:
            </span>
            <span className="text-xl font-bold text-neutral-900">
              {selectedWord.word}
            </span>
            <span className="font-mono text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-medium border border-indigo-100">
              {selectedWord.ipa}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handlePlayWord(selectedWord.cleanWord)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-medium transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Listen &quot;{selectedWord.cleanWord}&quot;</span>
          </button>
        </div>

        {/* Phonemes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selectedWord.phonemes.map((phoneme, idx) => {
            const isCorrect = phoneme.status === 'correct';
            const isWarning = phoneme.status === 'warning';

            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xl font-bold text-neutral-900">
                        {phoneme.symbol}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handlePlayPhoneme(
                            phoneme.symbol,
                            phoneme.mouthGuide.vocalCords.includes('Voiced')
                          )
                        }
                        className="p-1 rounded bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200"
                        title="Hear phoneme sound"
                      >
                        <Volume2 className="w-3 h-3 text-indigo-600" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold tabular-nums">
                        {phoneme.score}%
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Correct
                        </span>
                      ) : isWarning ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <AlertCircle className="w-3 h-3" /> Partial
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          <XCircle className="w-3 h-3" /> Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 mb-2 leading-relaxed">
                    {phoneme.tip}
                  </p>
                </div>

                <div className="text-[11px] text-neutral-500 pt-2 border-t border-neutral-200/80">
                  <span className="font-semibold text-neutral-700">Articulatory placement: </span>
                  {phoneme.mouthGuide.tongue} · {phoneme.mouthGuide.vocalCords}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions: Practice Again & Back */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-200 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <button
          type="button"
          onClick={onPracticeAgain}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Practice Again</span>
        </button>
      </div>
    </div>
  );
};
