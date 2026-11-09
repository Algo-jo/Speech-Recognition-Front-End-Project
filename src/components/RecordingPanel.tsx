import React, { useEffect, useState, useRef } from 'react';
import { Mic, Square, RotateCcw, Play, Pause } from 'lucide-react';
import { RecordingState } from '../types';

interface RecordingPanelProps {
  recordingState: RecordingState;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onRetry: () => void;
  audioBlobUrl: string | null;
  recordedDuration: number;
}

export const RecordingPanel: React.FC<RecordingPanelProps> = ({
  recordingState,
  onStartRecording,
  onStopRecording,
  onRetry,
  audioBlobUrl,
  recordedDuration,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Timer: starts only when recording
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (recordingState === 'recording') {
      setSeconds(0);
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (recordingState === 'idle') {
      setSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [recordingState]);

  const handleTogglePlayAudio = () => {
    if (!audioRef.current && audioBlobUrl) {
      audioRef.current = new Audio(audioBlobUrl);
      audioRef.current.onended = () => setIsPlayingAudio(false);
    }

    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play();
        setIsPlayingAudio(true);
      }
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isRecording = recordingState === 'recording';
  const hasRecorded = recordingState === 'recorded' || recordingState === 'result';
  const displayTimer = isRecording
    ? formatTimer(seconds)
    : hasRecorded && recordedDuration > 0
    ? formatTimer(recordedDuration)
    : null;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6 flex flex-col items-center justify-center min-h-[260px] relative">
      {/* Top right Retry button (only visible when recording or recorded) */}
      {(isRecording || hasRecorded) && (
        <button
          type="button"
          onClick={onRetry}
          title="Reset"
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}

      {/* Satu Tombol Microfone Gede */}
      {!isRecording ? (
        <button
          type="button"
          onClick={onStartRecording}
          className="w-24 h-24 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white flex items-center justify-center transition-all shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 cursor-pointer"
          aria-label="Click to Start"
        >
          <Mic className="w-10 h-10" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onStopRecording}
          className="w-24 h-24 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white flex items-center justify-center transition-all shadow-md focus:outline-none focus:ring-4 focus:ring-rose-200 ring-4 ring-rose-100 animate-pulse cursor-pointer"
          aria-label="Click to Stop"
        >
          <Square className="w-9 h-9 fill-white" />
        </button>
      )}

      {/* Tulisan di bawah tombol */}
      <div className="mt-4 text-center">
        <span className="text-sm font-semibold text-neutral-800 block">
          {isRecording ? 'Click to Stop' : 'Click to Start'}
        </span>

        {/* Durasi / Timer (HANYA MUNCUL SAAT MENEKAN CLICK / RECORDING ATAU SUDAH TEREKAM) */}
        {displayTimer && (
          <div className="mt-2 font-mono text-xs font-semibold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full inline-block tabular-nums">
            {displayTimer}
          </div>
        )}

        {/* Audio Replay shortcut when recorded */}
        {hasRecorded && audioBlobUrl && (
          <div className="mt-3">
            <button
              type="button"
              onClick={handleTogglePlayAudio}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg text-xs font-medium text-neutral-700 transition-colors"
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-3 h-3 text-indigo-600" />
                  <span>Pause Voice</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-indigo-600 fill-indigo-600" />
                  <span>Listen Voice</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
