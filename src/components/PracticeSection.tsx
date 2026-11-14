import React, { useState } from 'react';
import { Volume2, ArrowRight, Loader2 } from 'lucide-react';
import { PracticeSentence, RecordingState } from '../types';
import { RecordingPanel } from './RecordingPanel';
import { LiveTranscript } from './LiveTranscript';
import { speakText } from '../utils/audio';

interface PracticeSectionProps {
  sentence: PracticeSentence;
  recordingState: RecordingState;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onRetry: () => void;
  onAnalyze: () => void;
  transcript: string;
  audioBlobUrl: string | null;
  recordedDuration: number;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  sentence,
  recordingState,
  onStartRecording,
  onStopRecording,
  onRetry,
  onAnalyze,
  transcript,
  audioBlobUrl,
  recordedDuration,
}) => {
  const [isPlayingModel, setIsPlayingModel] = useState(false);

  const handlePlayModel = async () => {
    setIsPlayingModel(true);
    await speakText(sentence.text, 0.85);
    setIsPlayingModel(false);
  };

  // Analyze Pronunciation button hanya bekerja / bisa ditekan ketika kita sudah menekan tombol Stop Recording
  const isReadyToAnalyze = recordingState === 'recorded';

  return (
    <div className="w-full py-5 sm:py-8 flex flex-col items-center gap-6 sm:gap-8">
      {/* 1. Target Sentence (Tengah Atas - Tanpa Box, Tanpa Label, Tanpa Tanda Petik, Ukuran Besar) */}
      <div className="max-w-4xl w-full text-center flex items-center justify-center gap-3 sm:gap-4 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          {sentence.text}
        </h1>

        {/* Speaker Audio Button */}
        <button
          type="button"
          onClick={handlePlayModel}
          className="p-2.5 sm:p-3 bg-[#18272e] hover:bg-[#202f36] border-2 border-[#37464f] text-[#ffc800] rounded-2xl transition-all shadow-md cursor-pointer shrink-0 active:scale-95"
          title="Listen to native model audio"
          aria-label="Listen audio"
        >
          <Volume2 className={`w-5 h-5 sm:w-6 sm:h-6 ${isPlayingModel ? 'animate-bounce' : ''}`} />
        </button>
      </div>

      {/* 2. Tombol Mikrofon di Tengah dengan Gelombang Suara Sejajar Logo di Kiri dan Mirror di Kanan */}
      <div className="w-full">
        <RecordingPanel
          recordingState={recordingState}
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
          onRetry={onRetry}
          audioBlobUrl={audioBlobUrl}
          recordedDuration={recordedDuration}
        />
      </div>

      {/* 3. Live Speech Transcript (Langsung di Bawah Fitur Mic Tanpa Box) */}
      <div className="max-w-4xl w-full">
        <LiveTranscript
          transcript={transcript}
          recordingState={recordingState}
        />
      </div>

      {/* 4. Tombol Analyze Pronunciation (Diperpanjang agar teks tidak bertumpuk) */}
      <div className="w-full flex justify-center pt-2">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!isReadyToAnalyze}
          className={`min-w-[280px] sm:min-w-[340px] px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl text-sm sm:text-base font-black uppercase tracking-wider flex items-center justify-center gap-3 text-center transition-all shadow-2xl whitespace-nowrap ${
            isReadyToAnalyze
              ? 'bg-[#ffc800] hover:bg-[#e5b400] text-[#131f24] border-b-6 border-[#cc9f00] active:translate-y-1.5 active:border-b-2 cursor-pointer'
              : 'bg-[#2b3a42] text-[#6f828e] border-b-4 border-[#1f2b31] cursor-not-allowed opacity-60'
          }`}
        >
          {recordingState === 'analyzing' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-[#131f24] shrink-0" />
              <span>Analyzing Speech...</span>
            </>
          ) : (
            <>
              <span>Analyze Pronunciation</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
