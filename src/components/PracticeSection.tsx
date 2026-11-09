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

  const isReadyToAnalyze =
    recordingState === 'recorded' ||
    (recordingState === 'recording' && recordedDuration >= 1) ||
    transcript.trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8">
      {/* Target Sentence Area */}
      <div className="text-center mb-8">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
          Target Sentence
        </span>

        <div className="flex items-center justify-center gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight text-balance leading-snug">
            &ldquo;{sentence.text}&rdquo;
          </h1>
          <button
            type="button"
            onClick={handlePlayModel}
            className="p-2 text-neutral-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-colors shadow-2xs shrink-0"
            title="Listen to native audio"
          >
            <Volume2 className={`w-5 h-5 ${isPlayingModel ? 'text-indigo-600 animate-pulse' : ''}`} />
          </button>
        </div>

        <p className="mt-2 text-sm text-neutral-500 font-mono">
          {sentence.ipa}
        </p>

        <p className="mt-2 text-xs sm:text-sm text-neutral-500">
          Read the sentence aloud clearly into your microphone.
        </p>
      </div>

      {/* Two Columns: Left Voice Recording + Right Live Speech Transcript */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <RecordingPanel
          recordingState={recordingState}
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
          onRetry={onRetry}
          audioBlobUrl={audioBlobUrl}
          recordedDuration={recordedDuration}
        />

        <LiveTranscript
          transcript={transcript}
          recordingState={recordingState}
        />
      </div>

      {/* Tombol Analyze Pronunciation di bawahnya */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!isReadyToAnalyze || recordingState === 'analyzing'}
          className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-semibold rounded-xl transition-all shadow-sm ${
            isReadyToAnalyze && recordingState !== 'analyzing'
              ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white cursor-pointer shadow-indigo-200'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {recordingState === 'analyzing' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span>Analyzing Pronunciation...</span>
            </>
          ) : (
            <>
              <span>Analyze Pronunciation</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
