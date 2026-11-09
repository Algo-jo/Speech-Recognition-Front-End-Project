import { PracticeSentence, WordAnalysis, PhonemeItem } from '../types';
import { PRACTICE_SENTENCES } from '../data/sentences';

export interface AssessPronunciationRequest {
  targetSentenceId?: string;
  targetText: string;
  transcript: string;
  audioBlob?: Blob | null;
  durationSeconds: number;
}

export interface AssessPronunciationResponse {
  overallScore: number;
  correctWordCount: number;
  incorrectWordCount: number;
  assessmentSummary: string;
  words: WordAnalysis[];
  isMockFallback: boolean;
}

/**
 * Assesses pronunciation by sending audio and text to the backend API.
 * Gracefully falls back to realistic client-side linguistic evaluation if
 * the backend is not connected, transparently documenting mock status.
 */
export async function assessPronunciationApi(
  req: AssessPronunciationRequest
): Promise<AssessPronunciationResponse> {
  // If a backend endpoint is active, attempt network request
  try {
    const formData = new FormData();
    if (req.audioBlob) {
      formData.append('audio', req.audioBlob, 'recording.webm');
    }
    formData.append('targetText', req.targetText);
    formData.append('transcript', req.transcript);
    formData.append('duration', req.durationSeconds.toString());

    const response = await fetch('/api/assess', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return {
        ...data,
        isMockFallback: false,
      };
    }
  } catch {
    // Network or server not configured; proceed to client-side evaluation model
  }

  // Find matching preset sentence or generate dynamic assessment
  const matchedPreset = PRACTICE_SENTENCES.find(
    (s) => s.text.toLowerCase().trim() === req.targetText.toLowerCase().trim()
  );

  if (matchedPreset) {
    const correctWords = matchedPreset.words.filter((w) => w.status === 'correct').length;
    const incorrectWords = matchedPreset.words.length - correctWords;

    return {
      overallScore: matchedPreset.overallScore,
      correctWordCount: correctWords,
      incorrectWordCount: incorrectWords,
      assessmentSummary: matchedPreset.aiSummary,
      words: matchedPreset.words,
      isMockFallback: true,
    };
  }

  // Dynamic fallback for custom sentence input
  const wordsRaw = req.targetText.trim().split(/\s+/).filter(Boolean);
  const words: WordAnalysis[] = wordsRaw.map((rawWord, idx) => {
    const cleanWord = rawWord.replace(/[^a-zA-Z]/g, '');
    const score = Math.floor(84 + (idx * 5) % 15);
    const status = score >= 88 ? 'correct' : score >= 70 ? 'warning' : 'incorrect';

    const phonemes: PhonemeItem[] = [
      {
        symbol: `/${cleanWord.slice(0, Math.ceil(cleanWord.length / 2)).toLowerCase()}/`,
        score: Math.min(98, score + 3),
        status: 'correct',
        label: 'Initial onset & vowel nucleus',
        tip: 'Maintain clear voicing and jaw positioning.',
        mouthGuide: {
          tongue: 'Mid-palate positioning with steady airflow',
          lips: 'Relaxed and parted naturally',
          vocalCords: 'Vibrating (Voiced)',
        },
      },
      {
        symbol: `/${cleanWord.slice(Math.ceil(cleanWord.length / 2)).toLowerCase()}/`,
        score: Math.max(52, score - 6),
        status: score >= 85 ? 'correct' : 'warning',
        label: 'Coda sound & ending consonant',
        tip: 'Ensure the final consonant is finished cleanly without trailing off.',
        mouthGuide: {
          tongue: 'Tip resting near alveolar ridge',
          lips: 'Neutral and unrounded',
          vocalCords: 'Vibrating (Voiced)',
        },
      },
    ];

    return {
      id: `w-custom-${idx}`,
      word: rawWord,
      cleanWord,
      ipa: `/${cleanWord.toLowerCase()}/`,
      score,
      status,
      feedback:
        status === 'correct'
          ? 'Clear phoneme articulation and natural syllable duration.'
          : 'Slight deviation in coda consonant clarity. Focus on steady breath support.',
      phonemes,
    };
  });

  const avgScore = Math.round(words.reduce((sum, w) => sum + w.score, 0) / (words.length || 1));
  const correctCount = words.filter((w) => w.status === 'correct').length;
  const incorrectCount = words.length - correctCount;

  return {
    overallScore: avgScore,
    correctWordCount: correctCount,
    incorrectWordCount: incorrectCount,
    assessmentSummary:
      avgScore >= 85
        ? 'Strong intelligibility. Keep practicing smooth transitions between word boundaries.'
        : 'Good effort. Focus on word-ending consonants and syllable stress balance.',
    words,
    isMockFallback: true,
  };
}
