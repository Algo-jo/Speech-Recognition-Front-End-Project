export type PronunciationStatus = 'correct' | 'warning' | 'incorrect';

export interface PhonemeItem {
  symbol: string;
  score: number;
  status: PronunciationStatus;
  label: string;
  tip: string;
  mouthGuide: {
    tongue: string;
    lips: string;
    vocalCords:
      | 'Vibrating (Voiced)'
      | 'No Vibration (Voiceless)'
      | 'Voiceless to Voiced'
      | 'Voiceless into Voiced'
      | 'Vibrating then silent'
      | 'Vibrating to voiceless'
      | 'Voiceless then Voiced'
      | string;
  };
  sampleComparison?: {
    targetIpa: string;
    userDetectedIpa: string;
  };
}

export interface WordAnalysis {
  id: string;
  word: string;
  cleanWord: string;
  ipa: string;
  score: number;
  status: PronunciationStatus;
  phonemes: PhonemeItem[];
  feedback: string;
}

export interface PracticeSentence {
  id: string;
  title: string;
  text: string;
  ipa: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Beginner' | 'Intermediate' | 'Advanced';
  targetFocus: string;
  words: WordAnalysis[];
  overallScore: number;
  correctCount: number;
  incorrectCount: number;
  fluencyScore: number;
  paceWpm: number;
  aiSummary: string;
  drills: {
    title: string;
    instruction: string;
    exampleWords: string[];
  }[];
}

export type RecordingState = 'idle' | 'recording' | 'recorded' | 'analyzing' | 'result';
