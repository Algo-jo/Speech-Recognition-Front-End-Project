import { PracticeSentence, WordAnalysis, PhonemeItem } from '../types';

// Helper to create detailed word data with phoneme tips
function buildWord(
  id: string,
  word: string,
  cleanWord: string,
  ipa: string,
  score: number,
  status: 'correct' | 'warning' | 'incorrect',
  feedback: string,
  phonemes: PhonemeItem[]
): WordAnalysis {
  return { id, word, cleanWord, ipa, score, status, feedback, phonemes };
}

export const PRACTICE_SENTENCES: PracticeSentence[] = [
  // ================= EASY CATEGORY (Max 7 words, simple vowels, everyday vocabulary) =================
  {
    id: 'easy-1',
    title: 'She reads a good book today.',
    text: 'She reads a good book today.',
    ipa: '/ʃiː riːdz ə ɡʊd bʊk təˈdeɪ/',
    category: 'Easy',
    difficulty: 'Easy',
    targetFocus: 'Long vowel /iː/, short vowel /ʊ/, and alveolar stop /d/',
    overallScore: 89,
    correctCount: 5,
    incorrectCount: 1,
    fluencyScore: 91,
    paceWpm: 120,
    aiSummary:
      'Clear phrasing and steady pace. Focus slightly on the voiced /z/ at the end of "reads" and keep the /ʊ/ in "book" relaxed.',
    drills: [
      {
        title: 'High Front Vowel /iː/ Drill',
        instruction: 'Smile gently and raise the tongue high in the front of your mouth.',
        exampleWords: ['she', 'reads', 'see', 'meet'],
      },
    ],
    words: [
      buildWord('e1-w1', 'She', 'She', '/ʃiː/', 94, 'correct', 'Clear voiceless postalveolar fricative /ʃ/.', [
        {
          symbol: '/ʃ/',
          score: 95,
          status: 'correct',
          label: 'Voiceless postalveolar fricative',
          tip: 'Flare lips slightly and direct steady air across the tongue blade.',
          mouthGuide: { tongue: 'Curled near postalveolar arch', lips: 'Gently rounded', vocalCords: 'No Vibration (Voiceless)' },
        },
        {
          symbol: '/iː/',
          score: 93,
          status: 'correct',
          label: 'Close front unrounded vowel',
          tip: 'Raise the front of the tongue high and keep lips spread in a mild smile.',
          mouthGuide: { tongue: 'High front palate', lips: 'Spread unrounded', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e1-w2', 'reads', 'reads', '/riːdz/', 84, 'warning', 'Ensure the final /dz/ cluster maintains gentle vocal cord vibration.', [
        {
          symbol: '/r/',
          score: 88,
          status: 'correct',
          label: 'Alveolar approximant',
          tip: 'Curl tongue tip slightly backward without touching the roof of the mouth.',
          mouthGuide: { tongue: 'Curled back retroflex', lips: 'Slightly rounded', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/z/',
          score: 80,
          status: 'warning',
          label: 'Voiced alveolar fricative',
          tip: 'Keep vocal cords humming to avoid turning /z/ into an unvoiced /s/.',
          mouthGuide: { tongue: 'Behind upper teeth ridge', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e1-w3', 'a', 'a', '/ə/', 96, 'correct', 'Natural weak schwa reduction.', [
        {
          symbol: '/ə/',
          score: 96,
          status: 'correct',
          label: 'Mid central vowel (Schwa)',
          tip: 'Keep jaw completely relaxed in a neutral rest position.',
          mouthGuide: { tongue: 'Dead center relaxed', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e1-w4', 'good', 'good', '/ɡʊd/', 91, 'correct', 'Good short vowel duration.', [
        {
          symbol: '/ɡ/',
          score: 92,
          status: 'correct',
          label: 'Voiced velar stop',
          tip: 'Back of tongue contacts soft palate with vocal voicing.',
          mouthGuide: { tongue: 'Back raised to velum', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/ʊ/',
          score: 90,
          status: 'correct',
          label: 'Near-close near-back rounded vowel',
          tip: 'Lips relaxed and slightly puckered, not as tight as /uː/.',
          mouthGuide: { tongue: 'Near back elevated', lips: 'Mildly rounded', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e1-w5', 'book', 'book', '/bʊk/', 92, 'correct', 'Crisp final voiceless velar stop /k/.', [
        {
          symbol: '/b/',
          score: 95,
          status: 'correct',
          label: 'Voiced bilabial stop',
          tip: 'Press lips together firmly and release with voicing.',
          mouthGuide: { tongue: 'Resting flat', lips: 'Pressed together', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/k/',
          score: 89,
          status: 'correct',
          label: 'Voiceless velar stop',
          tip: 'Release clean puff of air from back of the tongue.',
          mouthGuide: { tongue: 'Back raised to soft palate', lips: 'Parted', vocalCords: 'No Vibration (Voiceless)' },
        },
      ]),
      buildWord('e1-w6', 'today.', 'today', '/təˈdeɪ/', 93, 'correct', 'Clean diphthong glide from /e/ to /ɪ/.', [
        {
          symbol: '/t/',
          score: 94,
          status: 'correct',
          label: 'Voiceless alveolar stop',
          tip: 'Tap tongue tip crisply against the alveolar ridge.',
          mouthGuide: { tongue: 'Tip at alveolar ridge', lips: 'Parted', vocalCords: 'No Vibration (Voiceless)' },
        },
        {
          symbol: '/eɪ/',
          score: 92,
          status: 'correct',
          label: 'Closing diphthong',
          tip: 'Glide jaw upward smoothly from /e/ to /ɪ/.',
          mouthGuide: { tongue: 'Gliding upward towards palate', lips: 'Spreading wider', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
    ],
  },
  {
    id: 'easy-2',
    title: 'The bright sun warms the earth.',
    text: 'The bright sun warms the earth.',
    ipa: '/ðə braɪt sʌn wɔːrmz ðiː ɜːrθ/',
    category: 'Easy',
    difficulty: 'Easy',
    targetFocus: 'Voiced /ð/ and voiceless dental fricative /θ/',
    overallScore: 88,
    correctCount: 5,
    incorrectCount: 1,
    fluencyScore: 88,
    paceWpm: 118,
    aiSummary:
      'Natural flow and great energy. Practice the final sound of "earth" so the tip of the tongue gently peeks between your front teeth.',
    drills: [
      {
        title: 'Dental Fricative Contrast',
        instruction: 'Compare "the" (voiced /ð/) with "earth" (voiceless /θ/).',
        exampleWords: ['the', 'earth', 'this', 'breath'],
      },
    ],
    words: [
      buildWord('e2-w1', 'The', 'The', '/ðə/', 92, 'correct', 'Solid voiced dental start.', [
        {
          symbol: '/ð/',
          score: 93,
          status: 'correct',
          label: 'Voiced dental fricative',
          tip: 'Tongue tip between teeth with vocal humming.',
          mouthGuide: { tongue: 'Between teeth edges', lips: 'Relaxed', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e2-w2', 'bright', 'bright', '/braɪt/', 89, 'correct', 'Clean /br/ blend and crisp /t/ stop.', [
        {
          symbol: '/br/',
          score: 90,
          status: 'correct',
          label: 'Consonant cluster',
          tip: 'Release bilabial /b/ right into rhotic /r/.',
          mouthGuide: { tongue: 'Curl back immediately after lips part', lips: 'Parted from press', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/aɪ/',
          score: 88,
          status: 'correct',
          label: 'Open front diphthong',
          tip: 'Open mouth wide for /a/ then glide up to /ɪ/.',
          mouthGuide: { tongue: 'Low to high front', lips: 'Open to spread', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e2-w3', 'sun', 'sun', '/sʌn/', 93, 'correct', 'Crisp sibilant and nasal /n/ ending.', [
        {
          symbol: '/s/',
          score: 94,
          status: 'correct',
          label: 'Voiceless alveolar fricative',
          tip: 'Direct sharp, cool air down the groove of the tongue.',
          mouthGuide: { tongue: 'Groove at alveolar ridge', lips: 'Neutral', vocalCords: 'No Vibration (Voiceless)' },
        },
        {
          symbol: '/ʌ/',
          score: 92,
          status: 'correct',
          label: 'Open-mid back unrounded vowel',
          tip: 'Drop jaw slightly with neutral tongue.',
          mouthGuide: { tongue: 'Mid-back low', lips: 'Unrounded', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e2-w4', 'warms', 'warms', '/wɔːrmz/', 85, 'correct', 'Notice the voiced ending /z/.', [
        {
          symbol: '/w/',
          score: 90,
          status: 'correct',
          label: 'Voiced labio-velar approximant',
          tip: 'Round lips tightly into a small circle.',
          mouthGuide: { tongue: 'Back raised toward velum', lips: 'Tightly rounded', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/z/',
          score: 80,
          status: 'warning',
          label: 'Voiced alveolar fricative',
          tip: 'Maintain voicing right through the final consonant.',
          mouthGuide: { tongue: 'Near tooth ridge', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e2-w5', 'the', 'the', '/ðiː/', 94, 'correct', 'Clear prevocalic "the" as /ðiː/.', [
        {
          symbol: '/ð/',
          score: 95,
          status: 'correct',
          label: 'Voiced dental fricative',
          tip: 'Gently touch teeth with tongue tip.',
          mouthGuide: { tongue: 'Between teeth', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e2-w6', 'earth.', 'earth', '/ɜːrθ/', 78, 'warning', 'Make sure final /θ/ is breathy without voicing or turning into /s/.', [
        {
          symbol: '/ɜːr/',
          score: 84,
          status: 'correct',
          label: 'Nurse vowel (r-colored)',
          tip: 'Keep tongue elevated in center with steady airflow.',
          mouthGuide: { tongue: 'Mid-central elevated', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/θ/',
          score: 72,
          status: 'warning',
          label: 'Voiceless dental fricative',
          tip: 'Push gentle voiceless breath over tongue tip between upper and lower teeth.',
          mouthGuide: { tongue: 'Between incisors', lips: 'Relaxed', vocalCords: 'No Vibration (Voiceless)' },
        },
      ]),
    ],
  },
  {
    id: 'easy-3',
    title: 'We love to drink cold water.',
    text: 'We love to drink cold water.',
    ipa: '/wiː lʌv tə drɪŋk koʊld ˈwɔːtər/',
    category: 'Easy',
    difficulty: 'Easy',
    targetFocus: 'Liquid /l/, stop /d/, and velar nasal /ŋ/',
    overallScore: 90,
    correctCount: 6,
    incorrectCount: 0,
    fluencyScore: 92,
    paceWpm: 122,
    aiSummary:
      'Very pleasant rhythm! All 6 words articulated with high intelligibility and clean syllable transitions.',
    drills: [
      {
        title: 'Light /l/ to Vowel Linking',
        instruction: 'Lift tongue tip firmly for "love", then release straight into /ʌ/.',
        exampleWords: ['love', 'like', 'light', 'cold'],
      },
    ],
    words: [
      buildWord('e3-w1', 'We', 'We', '/wiː/', 95, 'correct', 'Clean lip rounding to high front vowel.', [
        {
          symbol: '/w/',
          score: 96,
          status: 'correct',
          label: 'Voiced labio-velar approximant',
          tip: 'Round lips and glide forward.',
          mouthGuide: { tongue: 'Back raised', lips: 'Small circular opening', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e3-w2', 'love', 'love', '/lʌv/', 91, 'correct', 'Voiced labiodental /v/ finished cleanly.', [
        {
          symbol: '/l/',
          score: 92,
          status: 'correct',
          label: 'Alveolar lateral approximant',
          tip: 'Tip touches ridge behind top teeth, air escapes at sides.',
          mouthGuide: { tongue: 'Tip at alveolar ridge', lips: 'Parted', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/v/',
          score: 90,
          status: 'correct',
          label: 'Voiced labiodental fricative',
          tip: 'Top teeth touch bottom lip with vocal hum.',
          mouthGuide: { tongue: 'Flat', lips: 'Upper teeth on lower lip', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e3-w3', 'to', 'to', '/tə/', 94, 'correct', 'Natural reduced weak form.', [
        {
          symbol: '/t/',
          score: 95,
          status: 'correct',
          label: 'Voiceless alveolar stop',
          tip: 'Crisp tongue tap.',
          mouthGuide: { tongue: 'Alveolar ridge tap', lips: 'Neutral', vocalCords: 'No Vibration (Voiceless)' },
        },
      ]),
      buildWord('e3-w4', 'drink', 'drink', '/drɪŋk/', 87, 'correct', 'Good /dr/ onset and /ŋk/ cluster coda.', [
        {
          symbol: '/dr/',
          score: 88,
          status: 'correct',
          label: 'Voiced affricate-like cluster',
          tip: 'Start at /d/ and roll smoothly into retroflex /r/.',
          mouthGuide: { tongue: 'Alveolar tap then curled back', lips: 'Slightly rounded', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/ŋk/',
          score: 86,
          status: 'correct',
          label: 'Velar nasal plus stop',
          tip: 'Block air with back of tongue, release with crisp /k/.',
          mouthGuide: { tongue: 'Back sealed to soft palate', lips: 'Open', vocalCords: 'Voiced then Voiceless' },
        },
      ]),
      buildWord('e3-w5', 'cold', 'cold', '/koʊld/', 88, 'correct', 'Good dark /l/ before final /d/.', [
        {
          symbol: '/oʊ/',
          score: 90,
          status: 'correct',
          label: 'Closing diphthong',
          tip: 'Round lips as you glide to /ʊ/.',
          mouthGuide: { tongue: 'Mid back to high back', lips: 'Progressively rounded', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/ld/',
          score: 86,
          status: 'correct',
          label: 'Consonant cluster',
          tip: 'Raise back of tongue for dark L then tap tip for /d/.',
          mouthGuide: { tongue: 'Back raised, tip to alveolar', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('e3-w6', 'water.', 'water', '/ˈwɔːtər/', 92, 'correct', 'Natural American flap or clean aspirated /t/.', [
        {
          symbol: '/ɔː/',
          score: 93,
          status: 'correct',
          label: 'Open-mid back rounded vowel',
          tip: 'Lower jaw with rounded lips.',
          mouthGuide: { tongue: 'Low back', lips: 'Open oval shape', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/tər/',
          score: 91,
          status: 'correct',
          label: 'Unstressed rhotic coda',
          tip: 'Light tap with gentle r-coloration.',
          mouthGuide: { tongue: 'Quick flap to retroflex', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
    ],
  },

  // ================= MEDIUM CATEGORY (Max 7 words, consonant clusters, rhythm, 'th' contrast) =================
  {
    id: 'medium-1',
    title: 'Think through these three clear things.',
    text: 'Think through these three clear things.',
    ipa: '/θɪŋk θruː ðiːz θriː klɪər θɪŋz/',
    category: 'Medium',
    difficulty: 'Medium',
    targetFocus: 'Voiceless /θ/ vs voiced /ð/ and /θr/ consonant cluster',
    overallScore: 82,
    correctCount: 4,
    incorrectCount: 2,
    fluencyScore: 84,
    paceWpm: 108,
    aiSummary:
      'Challenging dental workout! Watch "these" /ðiːz/ which requires voicing, contrasting with the voiceless /θ/ in "think", "through", and "three".',
    drills: [
      {
        title: '/θ/ and /θr/ Precision Drill',
        instruction: 'Stick tongue tip out between teeth for /θ/, pull back instantly into /r/ for "through" and "three".',
        exampleWords: ['think', 'through', 'three', 'things'],
      },
    ],
    words: [
      buildWord('m1-w1', 'Think', 'Think', '/θɪŋk/', 86, 'correct', 'Accurate voiceless dental /θ/.', [
        {
          symbol: '/θ/',
          score: 88,
          status: 'correct',
          label: 'Voiceless dental fricative',
          tip: 'Tongue tip between teeth without vocal vibration.',
          mouthGuide: { tongue: 'Between teeth', lips: 'Parted', vocalCords: 'No Vibration (Voiceless)' },
        },
      ]),
      buildWord('m1-w2', 'through', 'through', '/θruː/', 79, 'warning', 'Quickly pull tongue back from teeth to palate for the /r/.', [
        {
          symbol: '/θr/',
          score: 76,
          status: 'warning',
          label: 'Dental-rhotic cluster',
          tip: 'Start with tongue between teeth, slide instantly backward into retroflex /r/.',
          mouthGuide: { tongue: 'Between teeth sliding back', lips: 'Neutral to rounded', vocalCords: 'Voiceless into Voiced' },
        },
        {
          symbol: '/uː/',
          score: 82,
          status: 'correct',
          label: 'Close back rounded vowel',
          tip: 'Tightly round lips with tongue pulled back.',
          mouthGuide: { tongue: 'High back', lips: 'Tight circle', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('m1-w3', 'these', 'these', '/ðiːz/', 74, 'incorrect', 'Do not make this sound like "teeth" or "cheese". Keep it voiced: /ð/ and ending /z/.', [
        {
          symbol: '/ð/',
          score: 75,
          status: 'warning',
          label: 'Voiced dental fricative',
          tip: 'Vibrate vocal cords while tongue is between teeth.',
          mouthGuide: { tongue: 'Between front teeth', lips: 'Relaxed', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/z/',
          score: 73,
          status: 'incorrect',
          label: 'Voiced alveolar sibilant',
          tip: 'Do not de-voice to /s/. Feel the buzzing hum in your throat.',
          mouthGuide: { tongue: 'Tip at alveolar ridge', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('m1-w4', 'three', 'three', '/θriː/', 85, 'correct', 'Good cluster separation, distinct from "tree".', [
        {
          symbol: '/θr/',
          score: 84,
          status: 'correct',
          label: 'Dental-rhotic cluster',
          tip: 'Do not use a stop /t/; blow air gently between teeth before the /r/.',
          mouthGuide: { tongue: 'Between teeth gliding back', lips: 'Relaxed', vocalCords: 'Voiceless into Voiced' },
        },
      ]),
      buildWord('m1-w5', 'clear', 'clear', '/klɪər/', 89, 'correct', 'Sharp voiceless velar stop into lateral /l/.', [
        {
          symbol: '/kl/',
          score: 89,
          status: 'correct',
          label: 'Velar-lateral cluster',
          tip: 'Release /k/ directly into tongue tip touching upper ridge for /l/.',
          mouthGuide: { tongue: 'Back release then tip lift', lips: 'Parted', vocalCords: 'Voiceless into Voiced' },
        },
      ]),
      buildWord('m1-w6', 'things.', 'things', '/θɪŋz/', 82, 'warning', 'Ensure final /z/ has sustained vocal cord vibration.', [
        {
          symbol: '/θ/',
          score: 87,
          status: 'correct',
          label: 'Voiceless dental fricative',
          tip: 'Gentle air across tongue tip.',
          mouthGuide: { tongue: 'Between teeth', lips: 'Neutral', vocalCords: 'No Vibration (Voiceless)' },
        },
        {
          symbol: '/ŋz/',
          score: 77,
          status: 'warning',
          label: 'Velar nasal with voiced sibilant',
          tip: 'Hum in the nose for /ŋ/ then buzz with /z/.',
          mouthGuide: { tongue: 'Back raised then tip to ridge', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
    ],
  },
  {
    id: 'medium-2',
    title: 'Blue flowers bloom beside green trees.',
    text: 'Blue flowers bloom beside green trees.',
    ipa: '/bluː ˈflaʊərz bluːm bɪˈsaɪd ɡriːn triːz/',
    category: 'Medium',
    difficulty: 'Medium',
    targetFocus: 'Consonant blends /bl/, /fl/, /gr/, /tr/ and diphthong /aʊ/',
    overallScore: 84,
    correctCount: 5,
    incorrectCount: 1,
    fluencyScore: 86,
    paceWpm: 114,
    aiSummary:
      'Great musicality! Pay attention to "trees" /triːz/ so the /tr/ sounds crisp without sliding into a "ch" sound.',
    drills: [
      {
        title: 'Initial Blend Agility',
        instruction: 'Move quickly between labial and alveolar positions for /bl/, /fl/, and /tr/.',
        exampleWords: ['blue', 'flowers', 'bloom', 'green', 'trees'],
      },
    ],
    words: [
      buildWord('m2-w1', 'Blue', 'Blue', '/bluː/', 88, 'correct', 'Crisp /bl/ release into rounded /uː/.', [
        {
          symbol: '/bl/',
          score: 89,
          status: 'correct',
          label: 'Bilabial-lateral cluster',
          tip: 'Release lips with tongue tip already moving to top teeth ridge.',
          mouthGuide: { tongue: 'Tip to alveolar ridge', lips: 'Parted from press', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('m2-w2', 'flowers', 'flowers', '/ˈflaʊərz/', 85, 'correct', 'Rich diphthong /aʊ/ and smooth /r/ color.', [
        {
          symbol: '/fl/',
          score: 88,
          status: 'correct',
          label: 'Labiodental-lateral cluster',
          tip: 'Upper teeth on lower lip, air hisses then tongue lifts.',
          mouthGuide: { tongue: 'Tip lifts for /l/', lips: 'Upper teeth on lower lip', vocalCords: 'Voiceless into Voiced' },
        },
        {
          symbol: '/aʊ/',
          score: 83,
          status: 'correct',
          label: 'Opening to closing diphthong',
          tip: 'Start with open jaw /a/ and round lips into /ʊ/.',
          mouthGuide: { tongue: 'Low front to high back', lips: 'Open to rounded', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('m2-w3', 'bloom', 'bloom', '/bluːm/', 86, 'correct', 'Good sustained bilabial nasal /m/.', [
        {
          symbol: '/m/',
          score: 89,
          status: 'correct',
          label: 'Bilabial nasal',
          tip: 'Close lips completely and let voice resonate through nose.',
          mouthGuide: { tongue: 'Resting flat', lips: 'Closed tightly', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('m2-w4', 'beside', 'beside', '/bɪˈsaɪd/', 87, 'correct', 'Clean unstressed initial syllable /bɪ/.', [
        {
          symbol: '/saɪd/',
          score: 87,
          status: 'correct',
          label: 'Stressed syllable with diphthong',
          tip: 'Sharp /s/ into open /aɪ/ and light /d/ finish.',
          mouthGuide: { tongue: 'Ridge to low to ridge', lips: 'Neutral to open', vocalCords: 'Voiceless to Voiced' },
        },
      ]),
      buildWord('m2-w5', 'green', 'green', '/ɡriːn/', 89, 'correct', 'Strong velar /ɡ/ into retroflex /r/.', [
        {
          symbol: '/ɡr/',
          score: 90,
          status: 'correct',
          label: 'Velar-rhotic cluster',
          tip: 'Back of tongue releases /ɡ/ while tip curls back.',
          mouthGuide: { tongue: 'Back release with curled tip', lips: 'Slightly flared', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('m2-w6', 'trees.', 'trees', '/triːz/', 74, 'warning', 'Keep /tr/ distinct without making it sound like "cheese" /tʃiːz/.', [
        {
          symbol: '/tr/',
          score: 73,
          status: 'warning',
          label: 'Alveolar-rhotic cluster',
          tip: 'Do not add friction like "ch". Tap /t/ cleanly into curled /r/.',
          mouthGuide: { tongue: 'Alveolar tap into retroflex', lips: 'Slightly rounded', vocalCords: 'Voiceless into Voiced' },
        },
        {
          symbol: '/z/',
          score: 75,
          status: 'warning',
          label: 'Voiced alveolar sibilant',
          tip: 'Vibrate vocal cords until the sound fades.',
          mouthGuide: { tongue: 'Alveolar ridge', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
    ],
  },
  {
    id: 'medium-3',
    title: 'Fresh bread smells wonderful every morning.',
    text: 'Fresh bread smells wonderful every morning.',
    ipa: '/frɛʃ brɛd smɛlz ˈwʌndərfʊl ˈɛvri ˈmɔːrnɪŋ/',
    category: 'Medium',
    difficulty: 'Medium',
    targetFocus: 'Clusters /fr/, /br/, /sm/ and multisyllabic stress balance',
    overallScore: 85,
    correctCount: 5,
    incorrectCount: 1,
    fluencyScore: 87,
    paceWpm: 116,
    aiSummary:
      'Great cadence and vocabulary pronunciation! Keep the final /z/ in "smells" buzzed and articulate both syllables of "every" naturally.',
    drills: [
      {
        title: 'Initial Sibilant-Nasal /sm/ Drill',
        instruction: 'Glide smoothly from hiss /s/ to hum /m/ without inserting a vowel between them.',
        exampleWords: ['smells', 'small', 'smart', 'smile'],
      },
    ],
    words: [
      buildWord('m3-w1', 'Fresh', 'Fresh', '/frɛʃ/', 88, 'correct', 'Voiceless postalveolar /ʃ/ finished cleanly.', [
        {
          symbol: '/fr/',
          score: 89,
          status: 'correct',
          label: 'Labiodental-rhotic cluster',
          tip: 'Teeth on lip for /f/ then curl tongue back for /r/.',
          mouthGuide: { tongue: 'Curl back retroflex', lips: 'Upper teeth on lower lip', vocalCords: 'Voiceless into Voiced' },
        },
      ]),
      buildWord('m3-w2', 'bread', 'bread', '/brɛd/', 89, 'correct', 'Short vowel /ɛ/ and voiced stop /d/.', [
        {
          symbol: '/ɛ/',
          score: 90,
          status: 'correct',
          label: 'Open-mid front unrounded vowel',
          tip: 'Drop jaw halfway with tongue flat in front.',
          mouthGuide: { tongue: 'Mid-front elevated', lips: 'Relaxed unrounded', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('m3-w3', 'smells', 'smells', '/smɛlz/', 79, 'warning', 'Watch for vocal cord vibration on the final /z/.', [
        {
          symbol: '/sm/',
          score: 84,
          status: 'correct',
          label: 'Sibilant-nasal cluster',
          tip: 'Hiss /s/ then immediately close lips for /m/.',
          mouthGuide: { tongue: 'Alveolar groove to resting', lips: 'Neutral to closed', vocalCords: 'Voiceless into Voiced' },
        },
        {
          symbol: '/lz/',
          score: 75,
          status: 'warning',
          label: 'Lateral plus voiced fricative',
          tip: 'Keep voice humming while moving from /l/ to /z/.',
          mouthGuide: { tongue: 'Ridge contact', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('m3-w4', 'wonderful', 'wonderful', '/ˈwʌndərfʊl/', 88, 'correct', 'Clear three-syllable rhythm with stress on first syllable.', [
        {
          symbol: '/ˈwʌn/',
          score: 90,
          status: 'correct',
          label: 'Primary stressed syllable',
          tip: 'Stronger burst of breath on the first syllable.',
          mouthGuide: { tongue: 'Low mid-back', lips: 'Rounded to neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('m3-w5', 'every', 'every', '/ˈɛvri/', 87, 'correct', 'Natural two-syllable contraction (/ˈɛv.ri/).', [
        {
          symbol: '/vr/',
          score: 86,
          status: 'correct',
          label: 'Voiced fricative into rhotic',
          tip: 'Keep vocal cords vibrating continuously through /v/ and /r/.',
          mouthGuide: { tongue: 'Curl back after lip contact', lips: 'Teeth on lip', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('m3-w6', 'morning.', 'morning', '/ˈmɔːrnɪŋ/', 89, 'correct', 'Resonant rhotic vowel and velar nasal /ŋ/.', [
        {
          symbol: '/ŋ/',
          score: 90,
          status: 'correct',
          label: 'Velar nasal',
          tip: 'Keep mouth slightly open and seal back of tongue to soft palate.',
          mouthGuide: { tongue: 'Back raised to velum', lips: 'Neutral parted', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
    ],
  },

  // ================= HARD CATEGORY (Max 7 words, rare clusters, dark L, alternating rhotic/lateral, multisyllabic) =================
  {
    id: 'hard-1',
    title: 'Rural lawyers regularly solve complex disputes.',
    text: 'Rural lawyers regularly solve complex disputes.',
    ipa: '/ˈrʊərəl ˈlɔːjərz ˈrɛɡjələrli sɒlv ˈkɒmplɛks dɪˈspjuːts/',
    category: 'Hard',
    difficulty: 'Hard',
    targetFocus: 'Alternating rhotic /r/ and lateral /l/ in "rural" and "regularly"',
    overallScore: 78,
    correctCount: 4,
    incorrectCount: 2,
    fluencyScore: 80,
    paceWpm: 104,
    aiSummary:
      'Exceptional challenge! The alternating transitions between retroflex /r/ and lateral /l/ in "rural" and "regularly" require deliberate tongue muscle agility.',
    drills: [
      {
        title: 'Rhotic /r/ vs Lateral /l/ Toggle Drill',
        instruction: 'Alternate tongue curling back for /r/ and touching behind front teeth for /l/.',
        exampleWords: ['rural', 'regularly', 'lawyers', 'solve'],
      },
    ],
    words: [
      buildWord('h1-w1', 'Rural', 'Rural', '/ˈrʊərəl/', 73, 'warning', 'Famous phonetic challenge! Keep /r/ curled and /l/ touching the tooth ridge.', [
        {
          symbol: '/rʊər/',
          score: 72,
          status: 'warning',
          label: 'Rhotic-centered syllable',
          tip: 'Do not let tongue touch the roof of your mouth; curl it backward in mid-air.',
          mouthGuide: { tongue: 'Curled backward (retroflex)', lips: 'Slightly flared', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/əl/',
          score: 74,
          status: 'warning',
          label: 'Dark lateral syllabic /l/',
          tip: 'Bring tongue tip forward to press the upper gum ridge.',
          mouthGuide: { tongue: 'Tip at alveolar ridge, back raised', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('h1-w2', 'lawyers', 'lawyers', '/ˈlɔːjərz/', 84, 'correct', 'Smooth glide through /j/ with voiced ending /z/.', [
        {
          symbol: '/l/',
          score: 86,
          status: 'correct',
          label: 'Light lateral onset',
          tip: 'Firm tongue tip contact.',
          mouthGuide: { tongue: 'Tip on upper ridge', lips: 'Parted', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('h1-w3', 'regularly', 'regularly', '/ˈrɛɡjələrli/', 74, 'incorrect', 'Four rapid syllables alternating /r/ and /l/: /ˈrɛɡ.jə.lər.li/.', [
        {
          symbol: '/r/',
          score: 75,
          status: 'warning',
          label: 'Initial rhotic',
          tip: 'Curl tongue back without touching the roof.',
          mouthGuide: { tongue: 'Retroflex curl', lips: 'Slightly rounded', vocalCords: 'Vibrating (Voiced)' },
        },
        {
          symbol: '/lərli/',
          score: 71,
          status: 'incorrect',
          label: 'Alternating lateral-rhotic-lateral ending',
          tip: 'Slow down and practice: "lər" then "li". Feel tongue tip move up, back, then up again.',
          mouthGuide: { tongue: 'Tip touch -> curl back -> tip touch', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('h1-w4', 'solve', 'solve', '/sɒlv/', 84, 'correct', 'Dark /l/ gliding into voiced labiodental /v/.', [
        {
          symbol: '/lv/',
          score: 83,
          status: 'correct',
          label: 'Lateral-fricative cluster',
          tip: 'Back of tongue elevated for dark /l/, bottom lip touches teeth for /v/.',
          mouthGuide: { tongue: 'Velarized lateral', lips: 'Teeth on lower lip', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('h1-w5', 'complex', 'complex', '/ˈkɒmplɛks/', 82, 'correct', 'Final /ks/ cluster pronounced crisply without dropping the /s/.', [
        {
          symbol: '/ks/',
          score: 82,
          status: 'correct',
          label: 'Voiceless stop plus sibilant',
          tip: 'Release /k/ immediately into sharp hiss /s/.',
          mouthGuide: { tongue: 'Back release into alveolar groove', lips: 'Neutral', vocalCords: 'No Vibration (Voiceless)' },
        },
      ]),
      buildWord('h1-w6', 'disputes.', 'disputes', '/dɪˈspjuːts/', 85, 'correct', 'Palatal glide /j/ before /uː/ in /pjuːts/.', [
        {
          symbol: '/pj/',
          score: 86,
          status: 'correct',
          label: 'Labial with palatal glide',
          tip: 'Release /p/ directly into /j/ like "pyoo".',
          mouthGuide: { tongue: 'Arched high near palate', lips: 'Pressed then parted', vocalCords: 'Voiceless into Voiced' },
        },
      ]),
    ],
  },
  {
    id: 'hard-2',
    title: 'Specific statistics thoroughly justify our theory.',
    text: 'Specific statistics thoroughly justify our theory.',
    ipa: '/spəˈsɪfɪk stəˈtɪstɪks ˈθʌrəli ˈdʒʌstɪfaɪ aʊər ˈθɪəri/',
    category: 'Hard',
    difficulty: 'Hard',
    targetFocus: 'Sibilant clusters /sp/ vs /st/ and dental fricative /θ/ in "thoroughly"',
    overallScore: 76,
    correctCount: 4,
    incorrectCount: 2,
    fluencyScore: 78,
    paceWpm: 102,
    aiSummary:
      'High difficulty phoneme sequence! Switching rapidly from sibilant clusters "specific statistics" to dental "thoroughly" tests tongue tip precision.',
    drills: [
      {
        title: 'Sibilant Cluster Differentiation',
        instruction: 'Emphasize the difference between lip-closing /sp/ and tongue-tapping /st/.',
        exampleWords: ['specific', 'statistics', 'thoroughly', 'theory'],
      },
    ],
    words: [
      buildWord('h2-w1', 'Specific', 'Specific', '/spəˈsɪfɪk/', 77, 'warning', 'Do not insert an extra vowel before "sp". Start directly with /s/.', [
        {
          symbol: '/sp/',
          score: 76,
          status: 'warning',
          label: 'Voiceless cluster onset',
          tip: 'Start hissing with /s/ then close lips firmly for /p/.',
          mouthGuide: { tongue: 'Alveolar groove', lips: 'Neutral then closed', vocalCords: 'No Vibration (Voiceless)' },
        },
      ]),
      buildWord('h2-w2', 'statistics', 'statistics', '/stəˈtɪstɪks/', 75, 'warning', 'Multiple /st/ clusters and /ks/ coda: /stə.ˈtɪs.tɪks/.', [
        {
          symbol: '/st/',
          score: 74,
          status: 'warning',
          label: 'Sibilant-alveolar stop cluster',
          tip: 'Hiss into a sharp tooth-ridge tap.',
          mouthGuide: { tongue: 'Groove then firm tap', lips: 'Neutral', vocalCords: 'No Vibration (Voiceless)' },
        },
        {
          symbol: '/tɪks/',
          score: 76,
          status: 'warning',
          label: 'Final syllable cluster',
          tip: 'Maintain clear /t/ followed by /ɪ/ and finished with /ks/.',
          mouthGuide: { tongue: 'Alveolar tap to back release', lips: 'Parted', vocalCords: 'No Vibration (Voiceless)' },
        },
      ]),
      buildWord('h2-w3', 'thoroughly', 'thoroughly', '/ˈθʌrəli/', 72, 'incorrect', 'Distinct /θ/ into vowel followed by lateral /l/.', [
        {
          symbol: '/θ/',
          score: 70,
          status: 'incorrect',
          label: 'Voiceless dental fricative',
          tip: 'Push tongue tip out between teeth. Do not substitute /t/ or /s/.',
          mouthGuide: { tongue: 'Between teeth edges', lips: 'Relaxed', vocalCords: 'No Vibration (Voiceless)' },
        },
        {
          symbol: '/rəl/',
          score: 74,
          status: 'warning',
          label: 'Rhotic-lateral transition',
          tip: 'Glide from curled /r/ into tap /l/.',
          mouthGuide: { tongue: 'Curled back then moving to ridge', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('h2-w4', 'justify', 'justify', '/ˈdʒʌstɪfaɪ/', 86, 'correct', 'Clean voiced affricate /dʒ/ and final diphthong /aɪ/.', [
        {
          symbol: '/dʒ/',
          score: 87,
          status: 'correct',
          label: 'Voiced postalveolar affricate',
          tip: 'Vibrate vocal cords as tongue releases from ridge like "j".',
          mouthGuide: { tongue: 'Blade at postalveolar ridge', lips: 'Slightly rounded', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('h2-w5', 'our', 'our', '/aʊər/', 88, 'correct', 'Smooth triphthong-like vowel flow.', [
        {
          symbol: '/aʊər/',
          score: 88,
          status: 'correct',
          label: 'Rhotic diphthong',
          tip: 'Glide from open /a/ through rounded /ʊ/ to curled /r/.',
          mouthGuide: { tongue: 'Low to high back to retroflex', lips: 'Open to rounded', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('h2-w6', 'theory.', 'theory', '/ˈθɪəri/', 82, 'correct', 'Voiceless /θ/ into centering diphthong /ɪə/.', [
        {
          symbol: '/θ/',
          score: 84,
          status: 'correct',
          label: 'Voiceless dental fricative',
          tip: 'Place tongue tip between teeth for a clean unvoiced whisper.',
          mouthGuide: { tongue: 'Between teeth', lips: 'Neutral', vocalCords: 'No Vibration (Voiceless)' },
        },
      ]),
    ],
  },
  {
    id: 'hard-3',
    title: 'Sixth enthusiastic youths meticulously articulated syllables.',
    text: 'Sixth enthusiastic youths meticulously articulated syllables.',
    ipa: '/sɪksθ ɪnˌθuːziˈæstɪk juːðz məˈtɪkjələsli ɑːrˈtɪkjəleɪtɪd ˈsɪləbəlz/',
    category: 'Hard',
    difficulty: 'Hard',
    targetFocus: 'Triple coda /ksθ/ in "sixth" and multisyllabic stress control',
    overallScore: 74,
    correctCount: 4,
    incorrectCount: 2,
    fluencyScore: 76,
    paceWpm: 98,
    aiSummary:
      'The ultimate phonetic workout! "Sixth" /sɪksθ/ contains one of English’s rarest consonant clusters, followed by intricate dental and multisyllabic rhythm.',
    drills: [
      {
        title: 'Triple Consonant Coda /ksθ/ Drill',
        instruction: 'Pronounce "six" /sɪks/ then gently push tongue tip out between teeth for /θ/.',
        exampleWords: ['six', 'sixth', 'youths', 'syllables'],
      },
    ],
    words: [
      buildWord('h3-w1', 'Sixth', 'Sixth', '/sɪksθ/', 68, 'incorrect', 'Extreme consonant cluster /ksθ/: /k/ + /s/ + /θ/ in rapid succession.', [
        {
          symbol: '/ksθ/',
          score: 66,
          status: 'incorrect',
          label: 'Triple voiceless coda cluster',
          tip: 'Do not drop the /θ/. Stop air at /k/, hiss through /s/, then poke tongue tip out for /θ/.',
          mouthGuide: { tongue: 'Velum stop -> alveolar hiss -> dental protrusion', lips: 'Parted', vocalCords: 'No Vibration (Voiceless)' },
        },
      ]),
      buildWord('h3-w2', 'enthusiastic', 'enthusiastic', '/ɪnˌθuːziˈæstɪk/', 78, 'warning', 'Five syllables with dental fricative /θ/ and sibilant /z/: /ɪn.ˌθuː.zi.ˈæs.tɪk/.', [
        {
          symbol: '/θ/',
          score: 76,
          status: 'warning',
          label: 'Voiceless dental fricative',
          tip: 'Keep tongue tip between teeth after the nasal /n/.',
          mouthGuide: { tongue: 'Move from gum ridge to teeth', lips: 'Neutral', vocalCords: 'No Vibration (Voiceless)' },
        },
      ]),
      buildWord('h3-w3', 'youths', 'youths', '/juːðz/', 75, 'warning', 'Voiced dental followed by voiced sibilant: /ðz/.', [
        {
          symbol: '/ðz/',
          score: 74,
          status: 'warning',
          label: 'Voiced dental-sibilant cluster',
          tip: 'Keep vocal cords vibrating continuously through the ending.',
          mouthGuide: { tongue: 'Between teeth then ridge', lips: 'Relaxed', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('h3-w4', 'meticulously', 'meticulously', '/məˈtɪkjələsli/', 79, 'correct', 'Six syllables articulated cleanly with unstressed schwas.', [
        {
          symbol: '/kjə/',
          score: 80,
          status: 'correct',
          label: 'Palatalized velar onset',
          tip: 'Back of tongue contacts velum then arches high for /j/.',
          mouthGuide: { tongue: 'Velum into palate arch', lips: 'Neutral', vocalCords: 'Voiceless to Voiced' },
        },
      ]),
      buildWord('h3-w5', 'articulated', 'articulated', '/ɑːrˈtɪkjəleɪtɪd/', 82, 'correct', 'Distinct primary stress on second syllable.', [
        {
          symbol: '/ɑːr/',
          score: 84,
          status: 'correct',
          label: 'Open back rhotic vowel',
          tip: 'Drop jaw wide open and curl tongue slightly.',
          mouthGuide: { tongue: 'Low back retroflex', lips: 'Open unrounded', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
      buildWord('h3-w6', 'syllables.', 'syllables', '/ˈsɪləbəlz/', 84, 'correct', 'Light initial /s/ and syllabic dark lateral with voiced /z/.', [
        {
          symbol: '/bəlz/',
          score: 83,
          status: 'correct',
          label: 'Final syllable with dark /l/ and /z/',
          tip: 'Finish with a soft hum and buzz.',
          mouthGuide: { tongue: 'Ridge contact', lips: 'Neutral', vocalCords: 'Vibrating (Voiced)' },
        },
      ]),
    ],
  },
];

// Fallback generator for custom sentence input
export function generateCustomSentencePractice(rawText: string): PracticeSentence {
  const clean = rawText.trim();
  const rawWords = clean.split(/\s+/).filter(Boolean);

  const words: WordAnalysis[] = rawWords.map((rawWord, idx) => {
    const cleanWord = rawWord.replace(/[^a-zA-Z]/g, '');
    const score = Math.floor(82 + (idx * 6) % 16);
    const status = score >= 88 ? 'correct' : score >= 75 ? 'warning' : 'incorrect';

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
            vocalCords: 'Vibrating (Voiced)',
          },
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
            vocalCords: 'Vibrating (Voiced)',
          },
        },
      ],
    };
  });

  const totalScore = Math.round(words.reduce((acc, w) => acc + w.score, 0) / (words.length || 1));
  const correctCount = words.filter((w) => w.status === 'correct').length;
  const incorrectCount = words.length - correctCount;

  return {
    id: `custom-${Date.now()}`,
    title: clean.slice(0, 36) + (clean.length > 36 ? '...' : ''),
    text: clean,
    ipa: `/${clean.toLowerCase().replace(/[^a-z\s]/g, '')}/`,
    category: 'Easy',
    difficulty: clean.length > 50 ? 'Hard' : clean.length > 25 ? 'Medium' : 'Easy',
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
        exampleWords: ['read aloud', 'is open', 'this evening'],
      },
    ],
    words,
  };
}
