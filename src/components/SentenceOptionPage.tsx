import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { PracticeSentence } from '../types';
import { speakText } from '../utils/audio';

interface SentenceOptionPageProps {
  sentences: PracticeSentence[];
  onSelectSentence: (sentence: PracticeSentence) => void;
}

export const SentenceOptionPage: React.FC<SentenceOptionPageProps> = ({
  sentences,
  onSelectSentence,
}) => {
  const [playingSentenceId, setPlayingSentenceId] = useState<string | null>(null);

  const handlePlayAudio = async (e: React.MouseEvent, sentence: PracticeSentence) => {
    e.stopPropagation();
    setPlayingSentenceId(sentence.id);
    await speakText(sentence.text, 0.85);
    setPlayingSentenceId(null);
  };

  const categories: Array<{
    key: 'Easy' | 'Medium' | 'Hard';
    label: string;
    titleColor: string;
  }> = [
    {
      key: 'Easy',
      label: 'Easy',
      titleColor: 'text-[#58cc02]',
    },
    {
      key: 'Medium',
      label: 'Medium',
      titleColor: 'text-[#ff9600]',
    },
    {
      key: 'Hard',
      label: 'Hard',
      titleColor: 'text-[#ff4b4b]',
    },
  ];

  return (
    <div className="max-w-4xl w-full mx-auto py-6 sm:py-10 flex flex-col gap-8 sm:gap-10">
      {/* Title only */}
      <div className="text-left px-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
          Select Target Sentence
        </h1>
      </div>

      {/* 3 Difficulty Categories */}
      <div className="flex flex-col gap-8 sm:gap-10">
        {categories.map((cat) => {
          const categorySentences = sentences.filter((s) => s.difficulty === cat.key);

          return (
            <div key={cat.key} className="flex flex-col gap-1">
              {/* Category Header: Difficulty Name Only */}
              <div className="pb-2 border-b border-[#202f36]">
                <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${cat.titleColor}`}>
                  {cat.label}
                </h2>
              </div>

              {/* Sentences List directly on background without box */}
              <div className="flex flex-col divide-y divide-[#202f36]">
                {categorySentences.map((s) => {
                  const isPlaying = playingSentenceId === s.id;

                  return (
                    <div
                      key={s.id}
                      onClick={() => onSelectSentence(s)}
                      className="py-3.5 sm:py-4 flex items-center justify-between gap-4 group cursor-pointer hover:bg-white/[0.02] px-1 sm:px-2 rounded-xl transition-colors"
                    >
                      {/* 1. Sentence */}
                      <span className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-[#ffc800] transition-colors leading-snug">
                        {s.text}
                      </span>

                      {/* 2. Speaker Button Only */}
                      <div className="shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handlePlayAudio(e, s)}
                          className="p-2 sm:p-2.5 bg-[#18272e] hover:bg-[#202f36] border border-[#37464f] text-[#ffc800] rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                          title="Listen sentence"
                          aria-label="Listen preview"
                        >
                          <Volume2 className={`w-4 h-4 sm:w-5 sm:h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
