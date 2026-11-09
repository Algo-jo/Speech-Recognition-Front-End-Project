import React from 'react';
import { Volume2, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { WordAnalysis } from '../types';
import { playPhonemeSound, speakText } from '../utils/audio';

interface PhonemeAnalysisProps {
  selectedWord: WordAnalysis;
}

export const PhonemeAnalysis: React.FC<PhonemeAnalysisProps> = ({ selectedWord }) => {
  const handlePlayPhoneme = (symbol: string, isVoiced: boolean) => {
    playPhonemeSound(symbol, isVoiced);
  };

  const handlePlayWord = () => {
    speakText(selectedWord.cleanWord, 0.75);
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-5 sm:p-6">
      {/* Header with Selected Word Details */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-neutral-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Selected Word Phoneme Details
          </span>
          <div className="flex items-center gap-2.5 mt-1">
            <span className="text-xl font-bold text-neutral-900 tracking-tight">
              {selectedWord.word}
            </span>
            <span className="font-mono text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-medium border border-indigo-100">
              {selectedWord.ipa}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePlayWord}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-medium transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>Pronounce word</span>
        </button>
      </div>

      {/* Observation context */}
      <div className="text-xs text-neutral-600 mb-4 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
        <span className="font-semibold text-neutral-800">Observation: </span>
        {selectedWord.feedback}
      </div>

      {/* Phoneme Breakdown Cards */}
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Phoneme Components
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selectedWord.phonemes.map((phoneme, idx) => {
            const isCorrect = phoneme.status === 'correct';
            const isWarning = phoneme.status === 'warning';

            return (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50/40 hover:bg-white transition-colors"
              >
                {/* Symbol, Score & Status badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-bold text-neutral-900">
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
                      title={`Play ${phoneme.symbol} sound`}
                      className="p-1 rounded bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200 transition-colors"
                    >
                      <Volume2 className="w-3 h-3 text-indigo-600" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-semibold tabular-nums text-neutral-700">
                      {phoneme.score}%
                    </span>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Correct
                      </span>
                    ) : isWarning ? (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        <AlertCircle className="w-2.5 h-2.5" /> Partial
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        <XCircle className="w-2.5 h-2.5" /> Incorrect
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs font-medium text-neutral-800 mb-1">
                  {phoneme.label}
                </div>
                <p className="text-[11px] text-neutral-500 mb-2.5 leading-relaxed">
                  {phoneme.tip}
                </p>

                {/* Expected vs Detected Comparison if present */}
                {phoneme.sampleComparison && (
                  <div className="mb-2 p-2 rounded bg-white border border-neutral-200/80 text-[11px] flex items-center justify-between">
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Expected:</span>
                      <span className="font-mono font-medium text-neutral-800">
                        {phoneme.sampleComparison.targetIpa}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-neutral-400 block text-[10px]">Detected:</span>
                      <span className="font-mono font-medium text-rose-700">
                        {phoneme.sampleComparison.userDetectedIpa}
                      </span>
                    </div>
                  </div>
                )}

                {/* Articulatory guide */}
                <div className="text-[11px] text-neutral-600 space-y-0.5 pt-1 border-t border-neutral-100">
                  <div>
                    <span className="font-medium text-neutral-700">Tongue: </span>
                    {phoneme.mouthGuide.tongue}
                  </div>
                  <div>
                    <span className="font-medium text-neutral-700">Lips: </span>
                    {phoneme.mouthGuide.lips}
                  </div>
                  <div>
                    <span className="font-medium text-neutral-700">Vocal cords: </span>
                    <span
                      className={
                        phoneme.mouthGuide.vocalCords.includes('Voiced')
                          ? 'text-indigo-600 font-medium'
                          : 'text-neutral-600'
                      }
                    >
                      {phoneme.mouthGuide.vocalCords}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
