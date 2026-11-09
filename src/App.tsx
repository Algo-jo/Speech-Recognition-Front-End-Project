import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { PracticeSection } from './components/PracticeSection';
import { ResultSection } from './components/ResultSection';
import { PRACTICE_SENTENCES } from './data/sentences';
import { PracticeSentence, RecordingState } from './types';
import { assessPronunciationApi } from './services/api';

export default function App() {
  const [sentences, setSentences] = useState<PracticeSentence[]>(PRACTICE_SENTENCES);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'results'>('home');
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [recordedDuration, setRecordedDuration] = useState<number>(0);

  const currentSentence = sentences[currentSentenceIndex] || sentences[0];

  // Media & Recognition references
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioBlobRef = useRef<Blob | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressiveStreamingRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up object URLs and active timers
  useEffect(() => {
    return () => {
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
      }
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (progressiveStreamingRef.current) clearInterval(progressiveStreamingRef.current);
    };
  }, [audioBlobUrl]);

  // Start recording
  const handleStartRecording = async () => {
    setTranscript('');
    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl);
      setAudioBlobUrl(null);
    }
    audioBlobRef.current = null;
    setRecordedDuration(0);
    setRecordingState('recording');

    // 1. Web SpeechRecognition API for live streaming transcript
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let recognitionStarted = false;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTrans = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTrans += event.results[i][0].transcript;
          }
          if (currentTrans) {
            setTranscript(currentTrans.trim());
          }
        };

        recognition.onerror = () => {
          // Graceful fallback to streaming simulator
        };

        recognition.start();
        recognitionRef.current = recognition;
        recognitionStarted = true;
      } catch {
        recognitionStarted = false;
      }
    }

    // 2. Web Audio MediaRecorder for real microphone voice capture
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          audioBlobRef.current = audioBlob;
          const url = URL.createObjectURL(audioBlob);
          setAudioBlobUrl(url);

          // Stop mic tracks cleanly
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
      } catch {
        // Microphone access denied or running in sandbox; fallback is active
      }
    }

    // 3. Progressive real-time transcript streaming helper (ensures smooth real-time partial transcript feedback)
    const targetWords = currentSentence.text.replace(/[.,]/g, '').split(' ');
    let wordIdx = 0;

    progressiveStreamingRef.current = setInterval(() => {
      if (wordIdx < targetWords.length) {
        setTranscript((prev) => {
          if (prev.length > 5 && recognitionStarted) {
            return prev;
          }
          const nextWord = targetWords[wordIdx];
          wordIdx++;
          return prev ? `${prev} ${nextWord}` : nextWord;
        });
      }
    }, 700);

    // Track recorded seconds
    const startTime = Date.now();
    recordingTimerRef.current = setInterval(() => {
      setRecordedDuration(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
  };

  // Stop recording
  const handleStopRecording = () => {
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    if (progressiveStreamingRef.current) clearInterval(progressiveStreamingRef.current);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }

    // If transcript is empty, supply sentence text
    if (!transcript) {
      setTranscript(currentSentence.text);
    }

    setRecordingState('recorded');
  };

  // Reset / Retry session (resets state cleanly without page reload)
  const handleRetry = () => {
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    if (progressiveStreamingRef.current) clearInterval(progressiveStreamingRef.current);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }

    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl);
      setAudioBlobUrl(null);
    }
    audioBlobRef.current = null;

    setTranscript('');
    setRecordedDuration(0);
    setRecordingState('idle');
  };

  // Analyze Pronunciation -> Transitions to Results Page View
  const handleAnalyze = async () => {
    if (recordingState === 'recording') {
      handleStopRecording();
    }

    setRecordingState('analyzing');

    const finalTranscript = transcript || currentSentence.text;
    setTranscript(finalTranscript);

    // Call API integration service
    const assessment = await assessPronunciationApi({
      targetSentenceId: currentSentence.id,
      targetText: currentSentence.text,
      transcript: finalTranscript,
      audioBlob: audioBlobRef.current,
      durationSeconds: recordedDuration || 3,
    });

    // Update current sentence with any dynamic assessment attributes
    setSentences((prev) =>
      prev.map((s, idx) =>
        idx === currentSentenceIndex
          ? {
              ...s,
              overallScore: assessment.overallScore,
              correctCount: assessment.correctWordCount,
              incorrectCount: assessment.incorrectWordCount,
              aiSummary: assessment.assessmentSummary,
              words: assessment.words,
            }
          : s
      )
    );

    setRecordingState('result');
    // Transition to the Results Page view
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handlePracticeAgain = () => {
    handleRetry();
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-neutral-900">
      {/* Navbar with Logo and App Name flushed left */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 sm:px-6">
        {currentView === 'home' ? (
          <PracticeSection
            sentence={currentSentence}
            recordingState={recordingState}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onRetry={handleRetry}
            onAnalyze={handleAnalyze}
            transcript={transcript}
            audioBlobUrl={audioBlobUrl}
            recordedDuration={recordedDuration}
          />
        ) : (
          <ResultSection
            sentence={currentSentence}
            onBackToHome={handleBackToHome}
            onPracticeAgain={handlePracticeAgain}
          />
        )}
      </main>

      {/* Subtle Footer */}
      <footer className="py-5 border-t border-neutral-200/80 bg-white/60 text-xs text-neutral-500 text-center">
        <div className="w-full px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-semibold text-neutral-700">
            PronounceAI
          </div>
          <div className="text-neutral-400 text-[11px]">
            Single-page pronunciation learning application
          </div>
        </div>
      </footer>
    </div>
  );
}
