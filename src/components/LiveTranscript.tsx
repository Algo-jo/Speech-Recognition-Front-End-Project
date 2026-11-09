import React from 'react';
import { RecordingState } from '../types';

interface LiveTranscriptProps {
  transcript: string;
  recordingState: RecordingState;
  targetSentence?: string;
}

export const LiveTranscript: React.FC<LiveTranscriptProps> = ({
  transcript,
  recordingState,
}) => {
  const isRecording = recordingState === 'recording';

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6 flex flex-col justify-between min-h-[260px]">
      {/* Clean Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Live Speech Transcript
        </h3>
        {isRecording && (
          <span className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            Listening...
          </span>
        )}
      </div>

      {/* Spoken Text Display */}
      <div className="my-auto py-4">
        {transcript ? (
          <p
            className={`text-lg sm:text-xl leading-relaxed ${
              isRecording ? 'text-neutral-700' : 'text-neutral-900 font-medium'
            }`}
          >
            {transcript}
            {isRecording && (
              <span className="inline-block w-1.5 h-5 ml-1 bg-indigo-600 animate-pulse align-middle" />
            )}
          </p>
        ) : (
          <p className="text-sm text-neutral-400 italic text-center py-6">
            Speech transcript will appear here...
          </p>
        )}
      </div>

      {/* Subtle indicator */}
      <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-100 flex items-center justify-between">
        <span>Real-time recognition</span>
        {transcript && (
          <span className="font-mono text-neutral-600 tabular-nums">
            {transcript.split(' ').filter(Boolean).length} words
          </span>
        )}
      </div>
    </div>
  );
};
