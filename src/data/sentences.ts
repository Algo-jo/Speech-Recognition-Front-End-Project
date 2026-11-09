import { PracticeSentence, WordAnalysis } from '../types';

export const PRACTICE_SENTENCES: PracticeSentence[] = [
  {
    id: 'weather-today',
    title: 'The weather is beautiful today',
    text: 'The weather is beautiful today.',
    ipa: '/ðə ˈwɛðər ɪz ˈbjuːtɪfʊl təˈdeɪ/',
    category: 'Daily',
    difficulty: 'Beginner',
    targetFocus: 'Voiced dental /ð/ and alveolar /z/',
    overallScore: 87,
    correctCount: 10,
    incorrectCount: 2,
    fluencyScore: 89,
    paceWpm: 128,
    aiSummary:
      'Improve the final voiced /z/ sound. Notice how your vocal cords should vibrate at the end of "is", avoiding a sharp unvoiced /s/ sound.',
    drills: [
      {
        title: 'Voiced /z/ Buzzing Drill',
        instruction: 'Place your hand on your throat. Feel the hum while holding the "zzzz" sound.',
        exampleWords: ['is', 'his', 'was', 'these', 'rose']
      },
      {
        title: 'Smooth Dental Transition',
        instruction: 'Transition gently from "The" /ðə/ directly into "weather" without stopping airflow.',
        exampleWords: ['the weather', 'the other', 'this mother']
      }
    ],
    words: [
      {
        id: 'w-1',
        word: 'The',
        cleanWord: 'The',
        ipa: '/ðə/',
        score: 96,
        status: 'correct',
        feedback: 'Accurate voiced dental fricative /ð/. Tongue position was spot on.',
        phonemes: [
          {
            symbol: '/ð/',
            score: 97,
            status: 'correct',
            label: 'Voiced dental fricative',
            tip: 'Tip of tongue gently between teeth with vocal cords vibrating.',
            mouthGuide: {
              tongue: 'Between upper and lower front teeth',
              lips: 'Relaxed and parted',
              vocalCords: 'Vibrating (Voiced)'
            },
            sampleComparison: {
              targetIpa: '/ð/',
              userDetectedIpa: '/ð/'
            }
          },
          {
            symbol: '/ə/',
            score: 95,
            status: 'correct',
            label: 'Schwa (Neutral central vowel)',
            tip: 'Completely relaxed mouth, short and quiet.',
            mouthGuide: {
              tongue: 'Resting in mid-center of mouth',
              lips: 'Completely neutral',
              vocalCords: 'Vibrating (Voiced)'
            },
            sampleComparison: {
              targetIpa: '/ə/',
              userDetectedIpa: '/ə/'
            }
          }
        ]
      },
      {
        id: 'w-2',
        word: 'weather',
        cleanWord: 'weather',
        ipa: '/ˈwɛðər/',
        score: 92,
        status: 'correct',
        feedback: 'Great rhythm and stress on the first syllable "wea-".',
        phonemes: [
          {
            symbol: '/w/',
            score: 94,
            status: 'correct',
            label: 'Voiced labio-velar approximant',
            tip: 'Round your lips tightly like sipping through a straw.',
            mouthGuide: {
              tongue: 'Back of tongue raised toward soft palate',
              lips: 'Tightly rounded then opened',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/ɛ/',
            score: 91,
            status: 'correct',
            label: 'Open-mid front unrounded vowel',
            tip: 'Jaw lowered slightly from /e/, tongue mid-front.',
            mouthGuide: {
              tongue: 'Mid-front position',
              lips: 'Unrounded and relaxed',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/ð/',
            score: 90,
            status: 'correct',
            label: 'Voiced dental fricative',
            tip: 'Keep vocal vibration active between syllables.',
            mouthGuide: {
              tongue: 'Lightly touching behind upper incisors',
              lips: 'Neutral open',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/ər/',
            score: 93,
            status: 'correct',
            label: 'R-colored central vowel',
            tip: 'Curl tongue tip slightly back or bunch tongue body without touching roof.',
            mouthGuide: {
              tongue: 'Retracted slightly with retroflex tip',
              lips: 'Slightly flared',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 'w-3',
        word: 'is',
        cleanWord: 'is',
        ipa: '/ɪz/',
        score: 73,
        status: 'warning',
        feedback: 'The vowel /ɪ/ is clear, but the ending sound was pronounced as unvoiced /s/ instead of voiced /z/.',
        phonemes: [
          {
            symbol: '/ɪ/',
            score: 95,
            status: 'correct',
            label: 'Near-close near-front unrounded vowel',
            tip: 'Short and relaxed. Lower and further back than the "ee" in "feet".',
            mouthGuide: {
              tongue: 'Front of tongue raised just below roof',
              lips: 'Relaxed unrounded',
              vocalCords: 'Vibrating (Voiced)'
            },
            sampleComparison: {
              targetIpa: '/ɪ/',
              userDetectedIpa: '/ɪ/'
            }
          },
          {
            symbol: '/z/',
            score: 52,
            status: 'incorrect',
            label: 'Voiced alveolar fricative',
            tip: 'Do not pronounce this as /s/. Your vocal cords must vibrate like a buzzing bee.',
            mouthGuide: {
              tongue: 'Tip close to alveolar ridge (roof behind front teeth)',
              lips: 'Slight smile, air channeled down groove',
              vocalCords: 'Vibrating (Voiced)'
            },
            sampleComparison: {
              targetIpa: '/z/ (vocal buzz)',
              userDetectedIpa: '/s/ (whispered hiss)'
            }
          }
        ]
      },
      {
        id: 'w-4',
        word: 'beautiful',
        cleanWord: 'beautiful',
        ipa: '/ˈbjuːtɪfʊl/',
        score: 89,
        status: 'correct',
        feedback: 'Clear stress on the first syllable and smooth transition through the diphthong.',
        phonemes: [
          {
            symbol: '/b/',
            score: 95,
            status: 'correct',
            label: 'Voiced bilabial plosive',
            tip: 'Lips pressed together firmly then released with voice.',
            mouthGuide: {
              tongue: 'Neutral resting on mouth floor',
              lips: 'Both lips fully pressed together',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/juː/',
            score: 88,
            status: 'correct',
            label: 'Palatal approximant + close back vowel',
            tip: 'Glide smoothly from "y" into a rounded "oo".',
            mouthGuide: {
              tongue: 'Arching high towards hard palate',
              lips: 'Transition to firmly rounded',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/tɪ/',
            score: 86,
            status: 'correct',
            label: 'Alveolar flap / light t with vowel',
            tip: 'Quick light tap of the tongue tip behind upper front teeth.',
            mouthGuide: {
              tongue: 'Light tap against alveolar ridge',
              lips: 'Neutral',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/fʊl/',
            score: 87,
            status: 'correct',
            label: 'Voiceless labiodental fricative + dark l',
            tip: 'Upper teeth on lower lip for /f/, back of tongue raised for dark /l/.',
            mouthGuide: {
              tongue: 'Back of tongue elevated for dark l',
              lips: 'Upper teeth gently rest on inner lower lip',
              vocalCords: 'Voiceless into Voiced'
            }
          }
        ]
      },
      {
        id: 'w-5',
        word: 'today',
        cleanWord: 'today',
        ipa: '/təˈdeɪ/',
        score: 94,
        status: 'correct',
        feedback: 'Excellent secondary stress and clean diphthong /eɪ/ ending.',
        phonemes: [
          {
            symbol: '/tə/',
            score: 93,
            status: 'correct',
            label: 'Voiceless alveolar stop + weak schwa',
            tip: 'Keep the first syllable unstressed and brisk.',
            mouthGuide: {
              tongue: 'Tongue tip taps alveolar ridge',
              lips: 'Neutral relaxed',
              vocalCords: 'Voiceless to Voiced'
            }
          },
          {
            symbol: '/deɪ/',
            score: 95,
            status: 'correct',
            label: 'Voiced alveolar stop + closing diphthong',
            tip: 'Gliding from /e/ upward toward /ɪ/, jaw closing slightly.',
            mouthGuide: {
              tongue: 'Tongue moves up and forward',
              lips: 'Spread into a soft smile',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'coffee-cup',
    title: 'I would like a cup of coffee, please',
    text: 'I would like a cup of coffee, please.',
    ipa: '/aɪ wʊd laɪk ə kʌp əv ˈkɔːfi pliːz/',
    category: 'Daily',
    difficulty: 'Beginner',
    targetFocus: 'Vowel contrasts /ʊ/ vs /ʌ/ and polite ending /z/',
    overallScore: 91,
    correctCount: 14,
    incorrectCount: 1,
    fluencyScore: 93,
    paceWpm: 132,
    aiSummary:
      'Very natural sentence cadence. Watch out for the final sound in "please"—ensure it ends with a vibrating /z/ rather than /s/.',
    drills: [
      {
        title: '/ʊ/ in "would" vs /uː/ in "food"',
        instruction: 'Keep the lips relaxed for /wʊd/, do not push lips out as far as in "food".',
        exampleWords: ['would', 'could', 'should', 'book', 'look']
      }
    ],
    words: [
      {
        id: 'c-1',
        word: 'I',
        cleanWord: 'I',
        ipa: '/aɪ/',
        score: 98,
        status: 'correct',
        feedback: 'Clean diphthong pronunciation.',
        phonemes: [
          {
            symbol: '/aɪ/',
            score: 98,
            status: 'correct',
            label: 'Wide open diphthong',
            tip: 'Open wide on /a/ and glide up smoothly.',
            mouthGuide: {
              tongue: 'Low to high front',
              lips: 'Open to unrounded spread',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 'c-2',
        word: 'would',
        cleanWord: 'would',
        ipa: '/wʊd/',
        score: 92,
        status: 'correct',
        feedback: 'Silent "l" pronounced properly without vocal interference.',
        phonemes: [
          {
            symbol: '/wʊd/',
            score: 92,
            status: 'correct',
            label: 'Near-close near-back rounded vowel with stop',
            tip: 'The "l" is completely silent in "would".',
            mouthGuide: {
              tongue: 'Back raised moderately',
              lips: 'Softly rounded',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 'c-3',
        word: 'like',
        cleanWord: 'like',
        ipa: '/laɪk/',
        score: 94,
        status: 'correct',
        feedback: 'Crisp final voiceless velar stop /k/.',
        phonemes: [
          {
            symbol: '/laɪ/',
            score: 95,
            status: 'correct',
            label: 'Lateral approximant with diphthong',
            tip: 'Tongue tip on alveolar ridge for /l/.',
            mouthGuide: {
              tongue: 'Tip to alveolar ridge',
              lips: 'Neutral to spread',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/k/',
            score: 93,
            status: 'correct',
            label: 'Voiceless velar plosive',
            tip: 'Back of tongue seals against soft palate then releases air.',
            mouthGuide: {
              tongue: 'Back pressed to soft palate',
              lips: 'Neutral open',
              vocalCords: 'No Vibration (Voiceless)'
            }
          }
        ]
      },
      {
        id: 'c-4',
        word: 'a',
        cleanWord: 'a',
        ipa: '/ə/',
        score: 97,
        status: 'correct',
        feedback: 'Proper weak vowel reduction.',
        phonemes: [
          {
            symbol: '/ə/',
            score: 97,
            status: 'correct',
            label: 'Schwa',
            tip: 'Keep it short and effortless.',
            mouthGuide: {
              tongue: 'Center rest',
              lips: 'Relaxed',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 'c-5',
        word: 'cup',
        cleanWord: 'cup',
        ipa: '/kʌp/',
        score: 90,
        status: 'correct',
        feedback: 'Good open-mid back vowel /ʌ/.',
        phonemes: [
          {
            symbol: '/kʌp/',
            score: 90,
            status: 'correct',
            label: 'Open-mid back unrounded vowel with bilabial stop',
            tip: 'Jaw opens moderately, tongue relaxed low.',
            mouthGuide: {
              tongue: 'Lowered in back of mouth',
              lips: 'Neutral open, closes on /p/',
              vocalCords: 'Vibrating then silent'
            }
          }
        ]
      },
      {
        id: 'c-6',
        word: 'of',
        cleanWord: 'of',
        ipa: '/əv/',
        score: 89,
        status: 'correct',
        feedback: 'Pronounced as /əv/ with voiced /v/, not /f/.',
        phonemes: [
          {
            symbol: '/əv/',
            score: 89,
            status: 'correct',
            label: 'Voiced labiodental fricative',
            tip: 'Upper teeth touch lower lip while vocal cords hum.',
            mouthGuide: {
              tongue: 'Resting',
              lips: 'Upper teeth on lower lip',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 'c-7',
        word: 'coffee',
        cleanWord: 'coffee',
        ipa: '/ˈkɔːfi/',
        score: 93,
        status: 'correct',
        feedback: 'Crisp /f/ sound and clear open /ɔː/ vowel.',
        phonemes: [
          {
            symbol: '/kɔː/',
            score: 94,
            status: 'correct',
            label: 'Open-mid back rounded vowel',
            tip: 'Slightly rounded lips with jaw dropped.',
            mouthGuide: {
              tongue: 'Low in mouth',
              lips: 'Rounded oval',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/fi/',
            score: 92,
            status: 'correct',
            label: 'Voiceless labiodental fricative with high vowel',
            tip: 'Gentle continuous air between teeth and lip.',
            mouthGuide: {
              tongue: 'High front for /i/',
              lips: 'Teeth on lower lip',
              vocalCords: 'Voiceless to Voiced'
            }
          }
        ]
      },
      {
        id: 'c-8',
        word: 'please',
        cleanWord: 'please',
        ipa: '/pliːz/',
        score: 79,
        status: 'warning',
        feedback: 'Long /iː/ vowel was excellent, but the final consonant drifted towards /s/ instead of voiced /z/.',
        phonemes: [
          {
            symbol: '/pliː/',
            score: 96,
            status: 'correct',
            label: 'Voiced bilabial blend + close front vowel',
            tip: 'Crisp release from /p/ into /l/ and clean "ee".',
            mouthGuide: {
              tongue: 'High front near hard palate',
              lips: 'Spread into a smile',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/z/',
            score: 62,
            status: 'warning',
            label: 'Voiced alveolar fricative',
            tip: 'Vibrate vocal cords until the very end of the word.',
            mouthGuide: {
              tongue: 'Close to upper alveolar ridge',
              lips: 'Slight smile',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'seashells-twister',
    title: 'She sells seashells by the seashore',
    text: 'She sells seashells by the seashore.',
    ipa: '/ʃiː sɛlz ˈsiːʃɛlz baɪ ðə ˈsiːʃɔːr/',
    category: 'Tongue Twister',
    difficulty: 'Advanced',
    targetFocus: 'Differentiating /ʃ/ (sh) vs /s/ (s)',
    overallScore: 82,
    correctCount: 16,
    incorrectCount: 3,
    fluencyScore: 80,
    paceWpm: 115,
    aiSummary:
      'Careful with rapid switches between /s/ (grooved tongue against roof) and /ʃ/ (flared lips with flatter tongue).',
    drills: [
      {
        title: 'S vs SH Alternating Drill',
        instruction: 'Say "see" - "she" - "see" - "she" slowly 5 times, noticing lip rounding.',
        exampleWords: ['sea / she', 'sell / shell', 'so / show', 'sip / ship']
      }
    ],
    words: [
      {
        id: 's-1',
        word: 'She',
        cleanWord: 'She',
        ipa: '/ʃiː/',
        score: 91,
        status: 'correct',
        feedback: 'Rounded lips and correct post-alveolar friction.',
        phonemes: [
          {
            symbol: '/ʃ/',
            score: 92,
            status: 'correct',
            label: 'Voiceless postalveolar fricative',
            tip: 'Flare lips slightly and arch tongue behind alveolar ridge.',
            mouthGuide: {
              tongue: 'Blade of tongue behind tooth ridge',
              lips: 'Slightly flared/pursed outward',
              vocalCords: 'No Vibration (Voiceless)'
            }
          },
          {
            symbol: '/iː/',
            score: 90,
            status: 'correct',
            label: 'Close front unrounded vowel',
            tip: 'Keep the vowel long and tense.',
            mouthGuide: {
              tongue: 'High front position',
              lips: 'Spread smile',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 's-2',
        word: 'sells',
        cleanWord: 'sells',
        ipa: '/sɛlz/',
        score: 75,
        status: 'warning',
        feedback: 'Starting /s/ was sharp, but the ending /z/ was truncated.',
        phonemes: [
          {
            symbol: '/s/',
            score: 91,
            status: 'correct',
            label: 'Voiceless alveolar fricative',
            tip: 'Narrow groove down tongue center.',
            mouthGuide: {
              tongue: 'Tip near alveolar ridge',
              lips: 'Neutral unrounded',
              vocalCords: 'No Vibration (Voiceless)'
            }
          },
          {
            symbol: '/ɛl/',
            score: 88,
            status: 'correct',
            label: 'Open-mid front vowel + lateral',
            tip: 'Clear tongue touch for the "l".',
            mouthGuide: {
              tongue: 'Tip to upper ridge',
              lips: 'Relaxed',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/z/',
            score: 55,
            status: 'incorrect',
            label: 'Voiced alveolar fricative',
            tip: 'Keep voice active through the final consonant.',
            mouthGuide: {
              tongue: 'Tip at alveolar ridge',
              lips: 'Slight smile',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 's-3',
        word: 'seashells',
        cleanWord: 'seashells',
        ipa: '/ˈsiːʃɛlz/',
        score: 78,
        status: 'warning',
        feedback: 'The quick switch between /s/ and /ʃ/ in the middle blended together.',
        phonemes: [
          {
            symbol: '/siː/',
            score: 93,
            status: 'correct',
            label: 'Alveolar fricative + tense vowel',
            tip: 'Keep the tongue tip forward for the "sea" part.',
            mouthGuide: {
              tongue: 'Forward high',
              lips: 'Spread',
              vocalCords: 'Voiceless to Voiced'
            }
          },
          {
            symbol: '/ʃɛl/',
            score: 68,
            status: 'warning',
            label: 'Postalveolar transition',
            tip: 'Move the tongue further back and round your lips for the "shell" syllable.',
            mouthGuide: {
              tongue: 'Retracted slightly behind alveolar ridge',
              lips: 'Rounded forward',
              vocalCords: 'Voiceless to Voiced'
            }
          },
          {
            symbol: '/z/',
            score: 74,
            status: 'warning',
            label: 'Voiced ending',
            tip: 'Hold the vocal cord vibration.',
            mouthGuide: {
              tongue: 'Ridge position',
              lips: 'Neutral',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 's-4',
        word: 'by',
        cleanWord: 'by',
        ipa: '/baɪ/',
        score: 95,
        status: 'correct',
        feedback: 'Strong bilabial burst and wide diphthong.',
        phonemes: [
          {
            symbol: '/baɪ/',
            score: 95,
            status: 'correct',
            label: 'Voiced bilabial plosive + diphthong',
            tip: 'Full lip closure.',
            mouthGuide: {
              tongue: 'Low to high glide',
              lips: 'Closed then open',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 's-5',
        word: 'the',
        cleanWord: 'the',
        ipa: '/ðə/',
        score: 94,
        status: 'correct',
        feedback: 'Accurate voiced dental fricative.',
        phonemes: [
          {
            symbol: '/ðə/',
            score: 94,
            status: 'correct',
            label: 'Voiced dental fricative + schwa',
            tip: 'Tongue gently touches upper incisors.',
            mouthGuide: {
              tongue: 'Between teeth',
              lips: 'Neutral',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 's-6',
        word: 'seashore',
        cleanWord: 'seashore',
        ipa: '/ˈsiːʃɔːr/',
        score: 82,
        status: 'correct',
        feedback: 'Solid distinction between first /s/ and medial /ʃ/.',
        phonemes: [
          {
            symbol: '/siː/',
            score: 92,
            status: 'correct',
            label: 'Front alveolar cluster',
            tip: 'High front tongue.',
            mouthGuide: {
              tongue: 'High front',
              lips: 'Spread',
              vocalCords: 'Voiceless to Voiced'
            }
          },
          {
            symbol: '/ʃɔːr/',
            score: 80,
            status: 'correct',
            label: 'Postalveolar + rhotic open-mid back vowel',
            tip: 'Keep lips rounded throughout "shore".',
            mouthGuide: {
              tongue: 'Back curled slightly',
              lips: 'Rounded funnel',
              vocalCords: 'Voiceless to Voiced'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'innovation-sentence',
    title: 'World-class technological innovation requires persistent curiosity',
    text: 'World-class technological innovation requires persistent curiosity.',
    ipa: '/wɜːrld klæs ˌtɛknəˈlɒdʒɪkəl ˌɪnəˈveɪʃən rɪˈkwaɪərz pərˈsɪstənt ˌkjʊəriˈɒsɪti/',
    category: 'Business',
    difficulty: 'Advanced',
    targetFocus: 'Multi-syllable rhythm, primary stress & word linking',
    overallScore: 88,
    correctCount: 22,
    incorrectCount: 2,
    fluencyScore: 86,
    paceWpm: 122,
    aiSummary:
      'Great multi-syllabic pacing on "technological" and "innovation". Pay extra attention to the voiced /z/ in "requires" and clear schwa reduction in "curiosity".',
    drills: [
      {
        title: 'Polysyllabic Word Stress',
        instruction: 'Emphasize the primary stressed syllable: tech-no-LOG-i-cal, in-no-VA-tion.',
        exampleWords: ['technological', 'innovation', 'curiosity', 'persistent']
      }
    ],
    words: [
      {
        id: 'b-1',
        word: 'World-class',
        cleanWord: 'World-class',
        ipa: '/wɜːrld klæs/',
        score: 90,
        status: 'correct',
        feedback: 'Strong rhotic vowel /ɜːr/ and clean consonant blend /kl/.',
        phonemes: [
          {
            symbol: '/wɜːrld/',
            score: 89,
            status: 'correct',
            label: 'Voiced velar + rhotic central vowel',
            tip: 'Curl tongue body up without touching teeth.',
            mouthGuide: {
              tongue: 'Curled back body',
              lips: 'Slightly rounded to open',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/klæs/',
            score: 91,
            status: 'correct',
            label: 'Velar-lateral cluster + open front vowel',
            tip: 'Clean release from k into l.',
            mouthGuide: {
              tongue: 'Back to alveolar tap',
              lips: 'Unrounded open',
              vocalCords: 'Voiceless to Voiced'
            }
          }
        ]
      },
      {
        id: 'b-2',
        word: 'technological',
        cleanWord: 'technological',
        ipa: '/ˌtɛknəˈlɒdʒɪkəl/',
        score: 87,
        status: 'correct',
        feedback: 'Good stress on the third syllable "log".',
        phonemes: [
          {
            symbol: '/tɛk/',
            score: 92,
            status: 'correct',
            label: 'Alveolar stop + front vowel + velar',
            tip: 'Quick voiceless burst.',
            mouthGuide: {
              tongue: 'Tip to alveolar, back to velum',
              lips: 'Neutral',
              vocalCords: 'Voiceless to Voiced'
            }
          },
          {
            symbol: '/nəˈlɒdʒ/',
            score: 84,
            status: 'correct',
            label: 'Affricate /dʒ/ with open back vowel',
            tip: 'Make sure the /dʒ/ sound is voiced like in "judge".',
            mouthGuide: {
              tongue: 'Tongue blade presses behind upper teeth then friction',
              lips: 'Slightly pursed',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/ɪkəl/',
            score: 88,
            status: 'correct',
            label: 'Unstressed suffix with dark l',
            tip: 'Quick and reduced.',
            mouthGuide: {
              tongue: 'Elevated back for dark l',
              lips: 'Neutral',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 'b-3',
        word: 'innovation',
        cleanWord: 'innovation',
        ipa: '/ˌɪnəˈveɪʃən/',
        score: 93,
        status: 'correct',
        feedback: 'Natural rhythm and primary stress on "va".',
        phonemes: [
          {
            symbol: '/ɪnə/',
            score: 94,
            status: 'correct',
            label: 'Front vowel + nasal + schwa',
            tip: 'Smooth glide without hard separation.',
            mouthGuide: {
              tongue: 'Front to ridge to center',
              lips: 'Neutral',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/ˈveɪʃən/',
            score: 92,
            status: 'correct',
            label: 'Voiced labiodental + diphthong + suffix',
            tip: 'Firm teeth on lip for /v/, then soft /ʃ/.',
            mouthGuide: {
              tongue: 'Glide /eɪ/ into /ʃ/ post-alveolar',
              lips: 'Upper teeth on lower lip to flared',
              vocalCords: 'Vibrating to voiceless'
            }
          }
        ]
      },
      {
        id: 'b-4',
        word: 'requires',
        cleanWord: 'requires',
        ipa: '/rɪˈkwaɪərz/',
        score: 76,
        status: 'warning',
        feedback: 'Remember the final consonant is a voiced /z/, not an unvoiced /s/.',
        phonemes: [
          {
            symbol: '/rɪˈkwaɪər/',
            score: 92,
            status: 'correct',
            label: 'Approximant + velar-labial glide + triphthong',
            tip: 'Keep airflow continuous.',
            mouthGuide: {
              tongue: 'Curled then opening into diphthong',
              lips: 'Rounded for /w/',
              vocalCords: 'Vibrating (Voiced)'
            }
          },
          {
            symbol: '/z/',
            score: 58,
            status: 'incorrect',
            label: 'Voiced alveolar fricative',
            tip: 'Buzz your vocal cords at the end of the word.',
            mouthGuide: {
              tongue: 'Near alveolar ridge',
              lips: 'Spread',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      },
      {
        id: 'b-5',
        word: 'persistent',
        cleanWord: 'persistent',
        ipa: '/pərˈsɪstənt/',
        score: 89,
        status: 'correct',
        feedback: 'Crisp /st/ consonant cluster in the stressed syllable.',
        phonemes: [
          {
            symbol: '/pər/',
            score: 90,
            status: 'correct',
            label: 'Plosive + rhotic unstressed vowel',
            tip: 'Keep first syllable light.',
            mouthGuide: {
              tongue: 'Slightly curled',
              lips: 'Pressed then neutral',
              vocalCords: 'Voiceless to Voiced'
            }
          },
          {
            symbol: '/ˈsɪstənt/',
            score: 88,
            status: 'correct',
            label: 'Stressed syllable with nasal stop coda',
            tip: 'Clean dental tap on final /t/.',
            mouthGuide: {
              tongue: 'Tip to ridge',
              lips: 'Neutral',
              vocalCords: 'Voiceless then Voiced'
            }
          }
        ]
      },
      {
        id: 'b-6',
        word: 'curiosity',
        cleanWord: 'curiosity',
        ipa: '/ˌkjʊəriˈɒsɪti/',
        score: 91,
        status: 'correct',
        feedback: 'Great distinction between vowels across all five syllables.',
        phonemes: [
          {
            symbol: '/ˌkjʊəri/',
            score: 90,
            status: 'correct',
            label: 'Velar + palatal glide + near-close vowel',
            tip: 'Glide smoothly from k into y.',
            mouthGuide: {
              tongue: 'High back to high front',
              lips: 'Rounded',
              vocalCords: 'Voiceless to Voiced'
            }
          },
          {
            symbol: '/ˈɒsɪti/',
            score: 92,
            status: 'correct',
            label: 'Primary stress open back vowel into light t',
            tip: 'Stress the "os" syllable distinctly.',
            mouthGuide: {
              tongue: 'Low back then high front',
              lips: 'Open unrounded',
              vocalCords: 'Vibrating (Voiced)'
            }
          }
        ]
      }
    ]
  }
];

// Helper to generate dynamic practice items when a user types a custom sentence
export function generateCustomPractice(text: string): PracticeSentence {
  const clean = text.trim();
  const rawWords = clean.split(/\s+/).filter(Boolean);
  
  const words: WordAnalysis[] = rawWords.map((rawWord, idx) => {
    const cleanWord = rawWord.replace(/[^a-zA-Z]/g, '');
    const isCapital = cleanWord[0] === cleanWord[0]?.toUpperCase();
    const isShort = cleanWord.length <= 3;
    const score = Math.floor(82 + (idx * 7) % 17);
    const status = score >= 90 ? 'correct' : score >= 75 ? 'warning' : 'incorrect';
    
    return {
      id: `custom-w-${idx}`,
      word: rawWord,
      cleanWord,
      ipa: `/${cleanWord.toLowerCase()}/`,
      score,
      status,
      feedback:
        score >= 90
          ? 'Great clarity and syllable timing.'
          : 'Focus on tongue placement and vowel elongation.',
      phonemes: [
        {
          symbol: `/${cleanWord.slice(0, Math.ceil(cleanWord.length / 2)).toLowerCase()}/`,
          score: Math.min(98, score + 4),
          status: 'correct',
          label: 'Initial onset syllable',
          tip: 'Hold clear vowel and crisp consonant release.',
          mouthGuide: {
            tongue: 'Elevated according to syllable structure',
            lips: 'Neutral and parted',
            vocalCords: 'Vibrating (Voiced)'
          }
        },
        {
          symbol: `/${cleanWord.slice(Math.ceil(cleanWord.length / 2)).toLowerCase()}/`,
          score: Math.max(50, score - 8),
          status: score >= 85 ? 'correct' : 'warning',
          label: 'Coda sound & termination',
          tip: 'Ensure the final consonant or vowel is clearly finished without trailing off.',
          mouthGuide: {
            tongue: 'Resting against tooth ridge',
            lips: 'Relaxed',
            vocalCords: 'Vibrating (Voiced)'
          }
        }
      ]
    };
  });

  const totalScore = Math.round(words.reduce((acc, w) => acc + w.score, 0) / (words.length || 1));
  const correctCount = words.reduce((acc, w) => acc + (w.status === 'correct' ? 2 : 1), 0);
  const incorrectCount = words.reduce((acc, w) => acc + (w.status !== 'correct' ? 1 : 0), 0);

  return {
    id: `custom-${Date.now()}`,
    title: clean.slice(0, 36) + (clean.length > 36 ? '...' : ''),
    text: clean,
    ipa: `/${clean.toLowerCase().replace(/[^a-z\s]/g, '')}/`,
    category: 'Daily',
    difficulty: clean.length > 50 ? 'Advanced' : clean.length > 25 ? 'Intermediate' : 'Beginner',
    targetFocus: 'Fluency and conversational articulation',
    overallScore: totalScore,
    correctCount,
    incorrectCount,
    fluencyScore: Math.min(96, totalScore + 3),
    paceWpm: 125,
    aiSummary:
      totalScore >= 85
        ? 'Solid overall pronunciation. Continue practicing smooth connected speech between words.'
        : 'Good effort. Pay attention to ending consonants and stress patterns on multi-syllable words.',
    drills: [
      {
        title: 'Word Boundary Linking',
        instruction: 'Link consonant endings smoothly into following vowel beginnings.',
        exampleWords: ['read aloud', 'is open', 'this evening']
      }
    ],
    words
  };
}
