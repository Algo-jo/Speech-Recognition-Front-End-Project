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

  // Dual Canvas Refs for Left & Right sound waves
  const canvasLeftRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRightRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Web Audio Analyser references
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Timer logic
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

  // Audio stream setup
  useEffect(() => {
    let active = true;

    if (recordingState === 'recording') {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            if (!active) {
              stream.getTracks().forEach((t) => t.stop());
              return;
            }
            mediaStreamRef.current = stream;
            try {
              const AudioCtx =
                window.AudioContext ||
                (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
              const ctx = new AudioCtx();
              audioContextRef.current = ctx;
              const source = ctx.createMediaStreamSource(stream);
              const analyser = ctx.createAnalyser();
              analyser.fftSize = 256;
              source.connect(analyser);
              analyserRef.current = analyser;
            } catch {
              // fallback
            }
          })
          .catch(() => {
            // fallback
          });
      }
    } else {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      analyserRef.current = null;
    }

    return () => {
      active = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [recordingState]);

  // Resize observer to ensure canvases stretch edge-to-edge with crisp resolution
  useEffect(() => {
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      if (canvasLeftRef.current) {
        const rect = canvasLeftRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          canvasLeftRef.current.width = Math.round(rect.width * dpr);
          canvasLeftRef.current.height = Math.round(rect.height * dpr);
        }
      }
      if (canvasRightRef.current) {
        const rect = canvasRightRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          canvasRightRef.current.width = Math.round(rect.width * dpr);
          canvasRightRef.current.height = Math.round(rect.height * dpr);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dual Canvas animation render loop
  useEffect(() => {
    let phase = 0;
    const dataArray = new Uint8Array(128);

    const render = () => {
      const isRecording = recordingState === 'recording';

      // Determine voice activity
      let hasVoiceInput = false;
      let volume = 0;

      if (isRecording) {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          if (avg > 12) {
            hasVoiceInput = true;
            volume = Math.min(1, avg / 55);
          }
        } else {
          // Simulation fallback: pulses rhythmically as voice input
          const simTime = (Date.now() / 600) % 3;
          if (simTime > 0.8) {
            hasVoiceInput = true;
            volume = 0.75;
          }
        }
      }

      // Draw helper function for a canvas
      const drawWave = (canvas: HTMLCanvasElement | null, isLeft: boolean) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const centerY = height / 2;
        const dpr = window.devicePixelRatio || 1;

        ctx.clearRect(0, 0, width, height);

        if (isRecording && hasVoiceInput) {
          // Dynamic sound wave moving when voice input is active
          ctx.strokeStyle = '#ffc800';
          ctx.lineWidth = 3.5 * dpr;
          ctx.lineCap = 'round';
          ctx.beginPath();

          for (let x = 0; x < width; x += 2) {
            const normalizedX = x / width;
            // Envelope: tapers towards edges and microphone
            const envelope = isLeft
              ? Math.sin(normalizedX * Math.PI * 0.85 + 0.15)
              : Math.sin((1 - normalizedX) * Math.PI * 0.85 + 0.15);

            const wave =
              Math.sin(phase + (isLeft ? -x : x) * 0.05) * 0.6 +
              Math.cos(phase * 1.3 + x * 0.03) * 0.4;
            const y = centerY + wave * (height * 0.38 * volume) * envelope;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        } else {
          // DIEM GARIS LURUS jika tidak ada suara input
          ctx.strokeStyle = isRecording ? '#37464f' : '#2b3a42';
          ctx.lineWidth = 3 * dpr;
          ctx.beginPath();
          ctx.moveTo(0, centerY);
          ctx.lineTo(width, centerY);
          ctx.stroke();
        }
      };

      drawWave(canvasLeftRef.current, true);
      drawWave(canvasRightRef.current, false);

      if (isRecording && hasVoiceInput) {
        phase += 0.18;
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
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

  const handleMainButtonClick = () => {
    if (recordingState === 'idle') {
      onStartRecording();
    } else if (recordingState === 'recording') {
      onStopRecording();
    } else if (hasRecorded) {
      onRetry();
    }
  };

  const displayTimer = isRecording
    ? formatTimer(seconds)
    : hasRecorded && recordedDuration > 0
    ? formatTimer(recordedDuration)
    : null;

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2 sm:py-4">
      {/* Horizontal Row: Waveform Kiri (dari ujung kiri) --- Tombol Mikrofon Gede (Tengah) --- Waveform Kanan (ke ujung kanan) */}
      <div className="w-full flex items-center justify-between gap-4 sm:gap-8">
        {/* Waveform Kiri Canvas: terlentang dari kiri */}
        <div className="flex-1 h-24 flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasLeftRef}
            className="w-full h-20 block"
          />
        </div>

        {/* Tombol Mikrofon Gede di Tengah (diperbesar sesuai instruksi) */}
        <div className="shrink-0 flex items-center justify-center">
          {recordingState === 'idle' && (
            <button
              type="button"
              onClick={handleMainButtonClick}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#ffc800] hover:bg-[#e5b400] text-[#131f24] flex items-center justify-center transition-all shadow-2xl border-b-8 border-[#cc9f00] active:translate-y-1.5 active:border-b-2 cursor-pointer focus:outline-none"
              aria-label="Click to Start Recording"
            >
              <Mic className="w-16 h-16 sm:w-20 sm:h-20 text-[#131f24]" />
            </button>
          )}

          {recordingState === 'recording' && (
            <button
              type="button"
              onClick={handleMainButtonClick}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#ff4b4b] hover:bg-[#ea2b2b] text-white flex items-center justify-center transition-all shadow-2xl border-b-8 border-[#d32f2f] active:translate-y-1.5 active:border-b-2 cursor-pointer focus:outline-none ring-8 ring-[#ff4b4b]/20 animate-pulse"
              aria-label="Click to Stop Recording"
            >
              <Square className="w-14 h-14 sm:w-18 sm:h-18 fill-white" />
            </button>
          )}

          {hasRecorded && (
            <button
              type="button"
              onClick={handleMainButtonClick}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#ffc800] hover:bg-[#e5b400] text-[#131f24] flex items-center justify-center transition-all shadow-2xl border-b-8 border-[#cc9f00] active:translate-y-1.5 active:border-b-2 cursor-pointer focus:outline-none"
              aria-label="Click to Try Again"
            >
              <RotateCcw className="w-16 h-16 sm:w-20 sm:h-20 text-[#131f24]" />
            </button>
          )}
        </div>

        {/* Waveform Kanan Canvas: terlentang ke kanan */}
        <div className="flex-1 h-24 flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRightRef}
            className="w-full h-20 block"
          />
        </div>
      </div>

      {/* Teks di Bawah Tombol Mikrofon (Tidak tabrakan dengan gelombang suara) */}
      <div className="mt-5 text-center flex flex-col items-center">
        <span className="text-base sm:text-xl font-extrabold text-white tracking-wide block">
          {recordingState === 'idle'
            ? 'Click to Start Recording'
            : isRecording
            ? 'Click to Stop Recording'
            : 'Click to Try Again'}
        </span>

        {/* Durasi / Timer (HANYA MUNCUL SAAT KLIK / RECORDING ATAU SUDAH TEREKAM) */}
        {displayTimer && (
          <div className="mt-2.5 font-mono text-xs sm:text-sm font-bold text-[#ffc800] bg-[#131f24] border-2 border-[#37464f] px-4 py-1 rounded-full inline-block tabular-nums shadow-inner">
            {displayTimer}
          </div>
        )}

        {/* Replay Voice Button saat sudah terekam */}
        {hasRecorded && audioBlobUrl && (
          <div className="mt-3">
            <button
              type="button"
              onClick={handleTogglePlayAudio}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#18272e] hover:bg-[#202f36] border-2 border-[#37464f] rounded-2xl text-xs font-bold text-[#ffc800] transition-colors cursor-pointer"
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#ffc800]" />
                  <span>Pause Voice</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#ffc800] fill-[#ffc800]" />
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
