import React from 'react';
import { RecordingState } from '../types';

interface LiveTranscriptProps {
  transcript: string;
  recordingState: RecordingState;
}

export const LiveTranscript: React.FC<LiveTranscriptProps> = ({
  transcript,
  recordingState,
}) => {
  const isRecording = recordingState === 'recording';

  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-2">
      {/* Listening status indicator when recording */}
      {isRecording && (
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#ffc800] font-bold mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ffc800] animate-pulse" />
          <span>Listening...</span>
        </div>
      )}

      {/* Transcript Text without box */}
      <div className="min-h-[48px] flex items-center justify-center px-4">
        {transcript ? (
          <p
            className={`text-xl sm:text-2xl font-bold leading-relaxed ${
              isRecording ? 'text-white/95' : 'text-white'
            }`}
          >
            &ldquo;{transcript}&rdquo;
            {isRecording && (
              <span className="inline-block w-2 h-5 ml-1.5 bg-[#ffc800] animate-pulse align-middle" />
            )}
          </p>
        ) : (
          <p className="text-base sm:text-lg text-[#afbbcf]/80 italic">
            Waiting for your input...
          </p>
        )}
      </div>
    </div>
  );
};
