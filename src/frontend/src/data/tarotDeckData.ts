export type TarotSuit = "major" | "wands" | "cups" | "swords" | "pentacles";

export interface TarotCard {
  id: string;
  name: string;
  suit: TarotSuit;
  emoji: string;
  keywordUpright: string;
  keywordReversed: string;
  gitaMeaning: string;
  pastMeaning: string;
  presentMeaning: string;
  futureMeaning: string;
  gitaVerse?: string;
  gitaVerseTranslation?: string;
}

const MAJOR_ARCANA: TarotCard[] = [
  {
    id: "major-0",
    name: "The Seeker",
    suit: "major",
    emoji: "🌅",
    keywordUpright: "New beginnings, divine faith, cosmic journey",
    keywordReversed: "Recklessness, ignoring dharma, lost path",
    gitaMeaning:
      "Like Arjuna stepping onto Kurukshetra, The Seeker represents the soul embarking on its cosmic journey. Krishna tells Arjuna in Chapter 4: 'Even if you were the most sinful of sinners, you could cross the ocean of sin by the boat of knowledge.' Your journey begins now — trust the divine plan.",
    pastMeaning:
      "A bold beginning shaped your path. You once took a leap of faith that opened doors previously unseen.",
    presentMeaning:
      "You stand at the threshold of something entirely new. The universe is calling you forward — step boldly.",
    futureMeaning:
      "A new chapter approaches with infinite potential. Embrace it with innocence and divine trust.",
    gitaVerse: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्",
    gitaVerseTranslation:
      "Lift yourself by your own efforts; do not let yourself fall. (6.5)",
  },
  {
    id: "major-1",
    name: "The Yogi",
    suit: "major",
    emoji: "🧘",
    keywordUpright: "Mastery, divine will, manifestation",
    keywordReversed: "Misuse of power, manipulation, illusion",
    gitaMeaning:
      "The Yogi commands the five elements — earth, water, fire, air, and space — just as Krishna reveals in Chapter 7 that all material nature is under His divine will. True mastery comes not from ego but from aligning one's will with the Supreme. You have the tools to create your reality.",
    pastMeaning:
      "A period of focused mastery shaped your current abilities. Your past efforts in developing a skill now serve you.",
    presentMeaning:
      "All resources are at your disposal. Your willpower and skill can transform any situation right now.",
    futureMeaning:
      "A time of confident manifestation lies ahead. You will demonstrate remarkable capacity and influence.",
    gitaVerse: "यो मामजमनादिं च वेत्ति लोकमहेश्वरम्",
    gitaVerseTranslation:
      "One who knows Me as unborn and beginningless, the Supreme Lord — that person is free of all delusion. (10.3)",
  },
  {
    id: "major-2",
    name: "Radha's Wisdom",
    suit: "major",
    emoji: "🌸",
    keywordUpright: "Intuition, mystery, inner knowing, divine feminine",
    keywordReversed: "Hidden motives, blocked intuition, secrets",
    gitaMeaning:
      "Radha embodies the highest form of divine feminine intuition — she knew Krishna's truth beyond all logic or scripture. Chapter 10 of the Gita speaks of this: 'Among women I am fame, prosperity, speech, memory, intelligence, steadfastness, and forgiveness.' Trust the wisdom that arises from silent knowing.",
    pastMeaning:
      "Your intuitive understanding in a past situation led you in the right direction, even when you couldn't explain why.",
    presentMeaning:
      "Something important lies beneath the surface. Your inner wisdom knows the answer — listen deeply.",
    futureMeaning:
      "A revelation will emerge from silence. Trust the quiet knowing that will arise within you.",
    gitaVerse: "ज्ञानं तेऽहं सविज्ञानमिदं वक्ष्याम्यशेषतः",
    gitaVerseTranslation:
      "I shall now declare unto you this knowledge with full wisdom; knowing it, nothing more shall remain to be known. (7.2)",
  },
  {
    id: "major-3",
    name: "Prakriti",
    suit: "major",
    emoji: "🌿",
    keywordUpright: "Abundance, creativity, nature's bounty, fertility",
    keywordReversed: "Neglect, creative block, disconnection from nature",
    gitaMeaning:
      "Prakriti is the divine Mother — all of material creation. Krishna declares in Chapter 14: 'My womb is the great Brahman. In it I place the seed of life.' All abundance flows from Prakriti's grace. This card speaks to the fertile ground of your life.",
    pastMeaning:
      "A period of growth and creative abundance in your past formed the foundation of what you have today.",
    presentMeaning:
      "You are in a phase of natural expansion. Nurture what you are growing — it will bear rich fruit.",
    futureMeaning:
      "Prosperity and creative fulfillment will flourish. A time of beautiful growth and harvest approaches.",
    gitaVerse: "सर्वभूतानि कौन्तेय प्रकृतिं यान्ति मामिकाम्",
    gitaVerseTranslation:
      "All beings, O Arjuna, go into My prakriti at the end of each cycle of time. (9.7)",
  },
  {
    id: "major-4",
    name: "Dharmaraja",
    suit: "major",
    emoji: "👑",
    keywordUpright: "Authority, structure, divine order, stability",
    keywordReversed: "Rigidity, abuse of power, loss of control",
    gitaMeaning:
      "Dharmaraja upholds cosmic order — the sacred law that governs all existence. As Krishna tells Arjuna in Chapter 3: 'Let the scriptures be your authority in determining what ought and ought not to be done.' True authority comes from dharma, not from force or ego.",
    pastMeaning:
      "Structure and discipline in your past — perhaps a father figure or institution — shaped your character and values.",
    presentMeaning:
      "It is time to establish order and take authority over your life. Lead with wisdom, not force.",
    futureMeaning:
      "A position of influence and stability approaches. You will be called to lead with dharmic clarity.",
    gitaVerse: "चातुर्वर्ण्यं मया सृष्टं गुणकर्मविभागशः",
    gitaVerseTranslation:
      "The four divisions of society were created by Me according to qualities and action. (4.13)",
  },
  {
    id: "major-5",
    name: "The Guru",
    suit: "major",
    emoji: "🪷",
    keywordUpright: "Sacred wisdom, tradition, spiritual guidance, initiation",
    keywordReversed: "False teachers, blind conformity, dogma",
    gitaMeaning:
      "The Guru is the sacred transmission lineage — parampara. Krishna Himself is the Supreme Guru, telling Arjuna in Chapter 4: 'Just try to learn the truth by approaching a spiritual master. Inquire from him submissively and render service unto him.' Seek wisdom from one who has walked the path.",
    pastMeaning:
      "A teacher, mentor, or teaching profoundly shaped your understanding in the past — consciously or not.",
    presentMeaning:
      "Guidance is available to you now. Seek a wise teacher, or look inward to the guru within.",
    futureMeaning:
      "You will encounter a teacher or teaching that shifts your understanding at a deep level.",
    gitaVerse: "तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया",
    gitaVerseTranslation:
      "Learn this by humble reverence, inquiry, and service — the wise who know the truth will instruct you. (4.34)",
  },
  {
    id: "major-6",
    name: "Radha-Krishna",
    suit: "major",
    emoji: "💑",
    keywordUpright:
      "Union, conscious love, divine partnership, soul recognition",
    keywordReversed: "Separation, misaligned values, unfulfilled longing",
    gitaMeaning:
      "Radha-Krishna represent the supreme union — not just human love but the merging of the individual soul with the Divine. This is the love that transcends desire. As Krishna says in Chapter 10: 'Among all unions, I am the union of love.' When two souls meet in dharma, they uplift each other toward moksha.",
    pastMeaning:
      "A significant union or relationship in your past — romantic, spiritual, or platonic — shaped your heart profoundly.",
    presentMeaning:
      "A significant connection is at the center of your life now. It calls for conscious choice and commitment.",
    futureMeaning:
      "A union of souls approaches — a meaningful bond that will elevate both parties toward their highest selves.",
    gitaVerse: "मयि चानन्ययोगेन भक्तिरव्यभिचारिणी",
    gitaVerseTranslation:
      "By unwavering, exclusive devotion — through this knowledge, truly knowing Me, one enters into Me. (13.11)",
  },
  {
    id: "major-7",
    name: "Arjuna's Chariot",
    suit: "major",
    emoji: "⚡",
    keywordUpright:
      "Victory, determination, focus, conquest through discipline",
    keywordReversed: "Aggression, lack of direction, losing control",
    gitaMeaning:
      "The divine chariot on Kurukshetra symbolizes the disciplined human soul moving toward its highest goal. Krishna as the charioteer represents the divine guide within. Chapter 6 teaches: 'Let a man lift himself by his own Self alone; let him not lower himself.' Victory comes through controlled will, not brute force.",
    pastMeaning:
      "A time of intense focus and willpower in your past led to a significant achievement or breakthrough.",
    presentMeaning:
      "You are in the midst of a challenge that requires focus and determination. Keep your eyes on the goal.",
    futureMeaning:
      "Victory is approaching, but it requires continued discipline. The chariot of your effort will reach its destination.",
    gitaVerse: "असंशयं महाबाहो मनो दुर्निग्रहं चलम्",
    gitaVerseTranslation:
      "Undoubtedly, O mighty-armed one, the mind is restless and difficult to control — but by practice and detachment, it can be controlled. (6.35)",
  },
  {
    id: "major-8",
    name: "Hanuman's Devotion",
    suit: "major",
    emoji: "🙏",
    keywordUpright: "Courage, inner strength, compassion, gentle power",
    keywordReversed: "Self-doubt, weakness hidden by pride, misuse of strength",
    gitaMeaning:
      "Hanuman's devotion to Ram shows that true strength is born from love, not fear. This mirrors the Gita's teaching in Chapter 9: 'Those who worship Me with devotion, they are in Me and I am in them.' Inner strength is not aggression — it is the calm power of one deeply aligned with the Divine.",
    pastMeaning:
      "You drew on a deep inner reservoir of strength in the past — perhaps not recognized at the time — that carried you through difficulty.",
    presentMeaning:
      "Your true strength is greater than you realize. Face your current challenge with gentle but unshakeable courage.",
    futureMeaning:
      "A time of testing will reveal inner capacities you didn't know you possessed. You are stronger than you think.",
    gitaVerse: "भयाद्रणादुपरतं मंस्यन्ते त्वां महारथाः",
    gitaVerseTranslation:
      "The great chariot fighters will think you fled the battle out of fear, and those who esteemed you will lose respect. (2.35)",
  },
  {
    id: "major-9",
    name: "Sage in Meditation",
    suit: "major",
    emoji: "🏔️",
    keywordUpright: "Introspection, solitude, inner light, seeking truth",
    keywordReversed: "Isolation, withdrawal, refusing guidance",
    gitaMeaning:
      "The solitary sage with his inner light represents the atman — the indwelling Self that is the ultimate guide. Krishna teaches in Chapter 13: 'He who sees the Supersoul equally present in all beings, and who does not destroy the Self by the self, thereby attains the highest goal.' Look within for all true answers.",
    pastMeaning:
      "A period of solitude and self-reflection in your past — though perhaps lonely — was actually a time of deep spiritual development.",
    presentMeaning:
      "Step back from external noise. The answers you seek require withdrawal into silence and inner inquiry.",
    futureMeaning:
      "A period of meaningful solitude and spiritual deepening awaits. In that stillness, profound clarity will arise.",
    gitaVerse: "यदा विनियतं चित्तमात्मन्येवावतिष्ठते",
    gitaVerseTranslation:
      "When the mind is restrained from all other activity and rests in the Self alone — one is said to be in yoga. (6.18)",
  },
  {
    id: "major-10",
    name: "Karma Chakra",
    suit: "major",
    emoji: "☸️",
    keywordUpright: "Destiny, cycles, turning point, synchronicity",
    keywordReversed: "Bad luck, resistance to change, clinging to the past",
    gitaMeaning:
      "The Wheel of Karma is the great cycle of action and consequence — samsara. Krishna explains in Chapter 8: 'From the highest planet in the universe down to the lowest — all are places of misery where repeated birth and death take place.' Yet He also offers the path beyond the wheel through devotion and knowledge.",
    pastMeaning:
      "The cycles of karma set in motion long ago are now bearing fruit. Events in your past were seeds of today.",
    presentMeaning:
      "A turning point is here. The wheel is moving in your favor if you act with conscious awareness.",
    futureMeaning:
      "A new karmic cycle begins. The seeds you plant now will determine the harvest of years to come.",
    gitaVerse: "यज्ञशिष्टाशिनः सन्तो मुच्यन्ते सर्वकिल्बिषैः",
    gitaVerseTranslation:
      "The devotees of the Lord are released from all kinds of sins because they eat food which is offered first for sacrifice. (3.13)",
  },
  {
    id: "major-11",
    name: "Dharma",
    suit: "major",
    emoji: "⚖️",
    keywordUpright: "Justice, truth, cause and effect, integrity",
    keywordReversed: "Unfairness, dishonesty, avoiding consequences",
    gitaMeaning:
      "Dharma is cosmic justice — the natural law that ensures right action is rewarded and adharma is corrected. As Krishna declares in Chapter 4: 'Whenever there is a decline of dharma and rise of adharma, I manifest Myself.' Trust that the universe is fundamentally just, even when outcomes seem delayed.",
    pastMeaning:
      "A karmic imbalance in the past — either justice you received or justice you rendered — has shaped your current situation.",
    presentMeaning:
      "Act with integrity now. The cosmic scales are finely balanced, and your choices carry real weight.",
    futureMeaning:
      "Justice will be served — whether as reward for right action or correction of imbalance. Truth will prevail.",
    gitaVerse: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत",
    gitaVerseTranslation:
      "Whenever there is decline of righteousness and rise of unrighteousness, O Arjuna, then I manifest Myself. (4.7)",
  },
  {
    id: "major-12",
    name: "Surrender",
    suit: "major",
    emoji: "🌊",
    keywordUpright: "Letting go, new perspective, sacrifice, suspension",
    keywordReversed: "Stalling, clinging, refusal to sacrifice",
    gitaMeaning:
      "True surrender — sharanagati — is not weakness but the highest wisdom. Krishna's final teaching in Chapter 18 is: 'Abandon all varieties of dharma and just surrender unto Me. I shall deliver you from all sinful reactions.' The one who surrenders their attachment to outcomes receives divine grace in return.",
    pastMeaning:
      "You were once forced into a period of waiting and surrender. What seemed like loss was actually preparation.",
    presentMeaning:
      "It is time to release control and trust divine timing. The willingness to wait is itself a form of wisdom.",
    futureMeaning:
      "A period of apparent stillness will yield a profound transformation. What you release will free you.",
    gitaVerse: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज",
    gitaVerseTranslation:
      "Abandon all varieties of dharma and just surrender unto Me; I shall deliver you from all sinful reactions, do not fear. (18.66)",
  },
  {
    id: "major-13",
    name: "Transformation",
    suit: "major",
    emoji: "🌀",
    keywordUpright: "Endings, transformation, rebirth, necessary change",
    keywordReversed: "Resistance to change, clinging to the past, stagnation",
    gitaMeaning:
      "The Mahamrityunjaya mantra — the great victory over death — teaches that what appears to be ending is simply transformation. Krishna assures in Chapter 2: 'The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being.' What is ending is only the form, not the essence.",
    pastMeaning:
      "Something significant ended in your past that, while painful, made space for something greater to emerge.",
    presentMeaning:
      "You are in the midst of a profound transformation. Don't resist it — let what needs to die, die.",
    futureMeaning:
      "A complete transformation approaches — the end of one chapter and the beginning of something entirely new.",
    gitaVerse: "नासतो विद्यते भावो नाभावो विद्यते सतः",
    gitaVerseTranslation:
      "The non-existent has no being; the existent has no cessation. This truth has been seen by seers of the Absolute. (2.16)",
  },
  {
    id: "major-14",
    name: "Balance",
    suit: "major",
    emoji: "🌺",
    keywordUpright: "Harmony, patience, integration, the middle path",
    keywordReversed: "Imbalance, excess, impatience, disharmony",
    gitaMeaning:
      "The three gunas — Sattva, Rajas, and Tamas — must be balanced for the soul to progress. As Krishna teaches in Chapter 14: 'When one rises above the three modes of material nature, one can become free from birth, death, old age and their distresses and can enjoy nectar even in this life.' Seek the sattvic center.",
    pastMeaning:
      "A time of seeking balance in the past — perhaps between two extremes — taught you the value of the middle path.",
    presentMeaning:
      "Moderation and measured action serve you best now. Blend patience with consistent effort.",
    futureMeaning:
      "You will find a harmonious equilibrium — a beautiful integration of opposites that creates lasting stability.",
    gitaVerse: "निर्द्वन्द्वो नित्यसत्त्वस्थो निर्योगक्षेम आत्मवान्",
    gitaVerseTranslation:
      "Free from dualities, always firm in truth, free from acquisition and preservation, self-possessed. (2.45)",
  },
  {
    id: "major-15",
    name: "Maya",
    suit: "major",
    emoji: "🎭",
    keywordUpright: "Illusion, bondage, materialism, shadow self",
    keywordReversed:
      "Breaking free, releasing attachment, seeing through illusion",
    gitaMeaning:
      "Maya is the cosmic veil of illusion that binds the soul to the material world. Krishna reveals in Chapter 7: 'This divine energy of Mine, consisting of the three modes of material nature, is difficult to overcome. But those who have surrendered unto Me can easily cross beyond it.' Recognize what is real and what is mere attachment.",
    pastMeaning:
      "An attachment or illusion in your past — perhaps a belief, person, or desire — kept you bound longer than necessary.",
    presentMeaning:
      "Something in your life is not what it appears. Question your attachments and examine what truly serves your soul.",
    futureMeaning:
      "A powerful illusion will be pierced. What you believed was necessary will be revealed as a limitation.",
    gitaVerse: "दैवी ह्येषा गुणमयी मम माया दुरत्यया",
    gitaVerseTranslation:
      "This divine energy of Mine, consisting of the three modes, is difficult to overcome — but those who surrender to Me cross over it easily. (7.14)",
  },
  {
    id: "major-16",
    name: "Destruction of Ego",
    suit: "major",
    emoji: "⚡",
    keywordUpright:
      "Sudden change, liberation, breakdown leading to breakthrough",
    keywordReversed:
      "Resisting necessary change, averting disaster, delaying the inevitable",
    gitaMeaning:
      "The tower of ego must fall before liberation is possible. When Arjuna saw the Vishwarupa in Chapter 11, he was shaken to his core — his small self dissolved before the infinite. Sometimes the divine destroys our carefully constructed identities to reveal the eternal truth beneath. What falls was never your real foundation.",
    pastMeaning:
      "An unexpected upheaval in your past — though devastating at the time — broke open something that needed to be released.",
    presentMeaning:
      "Something built on false foundations is crumbling. Though jarring, this clearing is divinely orchestrated.",
    futureMeaning:
      "A sudden shift will upend existing structures. After the storm, remarkable clarity and freedom will emerge.",
    gitaVerse: "कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः",
    gitaVerseTranslation:
      "I am mighty Time, the destroyer of all things, fully engaged in destroying all people. (11.32)",
  },
  {
    id: "major-17",
    name: "Dhruva's Star",
    suit: "major",
    emoji: "⭐",
    keywordUpright: "Hope, renewal, divine guidance, serenity",
    keywordReversed: "Despair, disconnection, lost hope",
    gitaMeaning:
      "Dhruva, the devoted child prince, received Krishna's blessing and was placed as the polestar — an eternal guide for all navigation. The Gita echoes this in Chapter 9: 'Those who worship Me with devotion, I carry what they lack and preserve what they have.' Divine guidance is always available to the sincere seeker.",
    pastMeaning:
      "A moment of hope or divine grace in a dark period of your past sustained you and guided you forward.",
    presentMeaning:
      "After difficulty, renewal is here. Open to the quiet guiding light that has never left you.",
    futureMeaning:
      "A period of hope, serenity, and renewed faith approaches. The stars align in your favor.",
    gitaVerse: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते",
    gitaVerseTranslation:
      "For those who worship Me with devotion — meditating on My transcendental form — I carry what they lack and preserve what they have. (9.22)",
  },
  {
    id: "major-18",
    name: "Chandra's Dream",
    suit: "major",
    emoji: "🌙",
    keywordUpright: "Intuition, subconscious, illusion, the dream realm",
    keywordReversed: "Confusion, fear, deception, hidden enemies",
    gitaMeaning:
      "Chandra, the Moon god, governs the realm of emotions, dreams, and the unconscious mind. The Gita speaks of this in Chapter 15: 'Entering into the earth, I sustain all beings by My energy; I become the moon and thereby supply the juice of life to all vegetables.' What lies in your unconscious now seeks the light of awareness.",
    pastMeaning:
      "Unconscious patterns or fears from your past have been quietly influencing your choices without your full awareness.",
    presentMeaning:
      "Pay attention to your dreams and subtle feelings. Something important is attempting to surface from the depths.",
    futureMeaning:
      "Hidden matters will be brought to light. Trust your intuition more than logic in the time ahead.",
    gitaVerse: "पुष्णामि चौषधीः सर्वाः सोमो भूत्वा रसात्मकः",
    gitaVerseTranslation:
      "I become the moon and thereby supply the juice of life to all vegetables. (15.13)",
  },
  {
    id: "major-19",
    name: "Surya's Glory",
    suit: "major",
    emoji: "☀️",
    keywordUpright: "Joy, vitality, enlightenment, success, clarity",
    keywordReversed: "Temporary setback, blocked success, ego inflation",
    gitaMeaning:
      "Surya, the Sun god, illuminates all darkness and is the source of all life. Krishna declares in Chapter 15: 'I am the light of the sun and moon.' The Sun card represents the triumphant soul that has moved through darkness into full realization. Joy, success, and radiant clarity flow naturally from alignment with the Divine.",
    pastMeaning:
      "A period of joyful success and radiant energy in your past gave you the confidence you carry today.",
    presentMeaning:
      "You are in or entering a golden period — a time of vitality, clarity, and natural success.",
    futureMeaning:
      "Shining success and illuminated joy approaches. A period of radiant, effortless flourishing is coming.",
    gitaVerse: "ज्योतिषां रविरंशुमान्",
    gitaVerseTranslation: "Among lights, I am the radiant sun. (10.21)",
  },
  {
    id: "major-20",
    name: "Karma's Call",
    suit: "major",
    emoji: "🔔",
    keywordUpright: "Awakening, dharma's call, renewal, reckoning",
    keywordReversed: "Self-doubt, ignoring the call, refusing to evolve",
    gitaMeaning:
      "Karma's Call is the moment of awakening — when the soul recognizes its dharma and rises to answer it. This is Arjuna's journey in the Gita itself: from paralysis to clarity. Krishna says in Chapter 18: 'Performing your own duty imperfectly is better than performing another's duty perfectly.' Rise and fulfill your unique dharma.",
    pastMeaning:
      "A call to action or awakening in your past — perhaps a crisis or revelation — set you on your current path.",
    presentMeaning:
      "You are being called to rise. Something in your life demands a response — and the response must come from you.",
    futureMeaning:
      "An awakening to your deeper purpose approaches. When the call comes, be ready to answer it fully.",
    gitaVerse: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्",
    gitaVerseTranslation:
      "Better is one's own dharma, though imperfectly performed, than the dharma of another well performed. (3.35)",
  },
  {
    id: "major-21",
    name: "Liberation (Moksha)",
    suit: "major",
    emoji: "🪷",
    keywordUpright:
      "Fulfillment, integration, completion, union with the Divine",
    keywordReversed: "Incompletion, stagnation, unfinished karma",
    gitaMeaning:
      "Moksha is the ultimate goal of all spiritual practice — liberation from the cycle of birth and death, and union with the Supreme. Krishna's final promise in Chapter 18 is: 'By surrendering to Me, you will cross over all obstacles of conditioned life by My grace.' This card marks the completion of a great cycle and the achievement of one's highest potential.",
    pastMeaning:
      "A cycle of learning has come to its natural conclusion. Past struggles were preparing you for this moment of integration.",
    presentMeaning:
      "You are experiencing or approaching completion. Celebrate how far you have come on your sacred journey.",
    futureMeaning:
      "Complete fulfillment and liberation approaches — a state of wholeness and union that transcends all limitation.",
    gitaVerse: "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु",
    gitaVerseTranslation:
      "Always think of Me and become My devotee, worship Me and offer your homage unto Me — thus you will come to Me. (18.65)",
  },
];

function makeMinorCard(
  suit: TarotSuit,
  name: string,
  emoji: string,
  up: string,
  down: string,
  gita: string,
  past: string,
  present: string,
  future: string,
  verse?: string,
  verseTranslation?: string,
): TarotCard {
  return {
    id: `${suit}-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    name,
    suit,
    emoji,
    keywordUpright: up,
    keywordReversed: down,
    gitaMeaning: gita,
    pastMeaning: past,
    presentMeaning: present,
    futureMeaning: future,
    gitaVerse: verse,
    gitaVerseTranslation: verseTranslation,
  };
}

const WANDS: TarotCard[] = [
  makeMinorCard(
    "wands",
    "Ace of Wands",
    "🔥",
    "New inspiration, creative spark, passion",
    "Delays, blocked energy, hesitation",
    "The Ace of Wands carries the divine fire of creative initiation — the spark of the sacred that ignites all action. Krishna's teaching on nishkama karma begins here: act from inspiration, not compulsion.",
    "A burst of creative energy or inspired beginning in your past set something significant in motion.",
    "Creative fire is available to you right now. Seize the inspiration before it passes.",
    "A powerful new creative or professional opportunity will soon ignite your passion and purpose.",
  ),
  makeMinorCard(
    "wands",
    "Two of Wands",
    "🗺️",
    "Planning, vision, future possibilities",
    "Fear of the unknown, lack of planning",
    "Like the moment before Arjuna drew his bow — surveying the field and choosing one's direction with courage and clarity. The future belongs to those who plan in alignment with dharma.",
    "You surveyed your options wisely in the past, setting the strategic direction that brought you here.",
    "You stand at a crossroads of possibility. Choose your path with boldness and long-range vision.",
    "Your plans will crystallize and you will embark on an expansive journey toward your chosen horizon.",
  ),
  makeMinorCard(
    "wands",
    "Three of Wands",
    "⛵",
    "Progress, foresight, expansion",
    "Obstacles, delays, frustration",
    "Your ships have set sail — your efforts have been launched into the world. Krishna teaches in Chapter 3 that action (karma) initiated in dharma naturally expands and bears fruit over time.",
    "Efforts you launched in the past are now bearing the first fruits of a long-term vision.",
    "Your plans are already in motion and beginning to show results. Maintain your foresight.",
    "Your ventures will expand and grow. The seeds planted will flourish into something substantial.",
  ),
  makeMinorCard(
    "wands",
    "Four of Wands",
    "🎉",
    "Celebration, harmony, homecoming",
    "Instability, conflict at home",
    "The four-pillared celebration of dharmic achievement — a moment to pause and honor milestones. Chapter 9 speaks of devotees who offer their fruits to Krishna and celebrate sacred completion.",
    "A moment of celebration or homecoming in your past created a foundation of joy and belonging.",
    "Celebrate your achievements! You have reached a significant milestone worthy of recognition.",
    "Joy, stability, and celebration approach. A harmonious gathering or milestone completion is coming.",
  ),
  makeMinorCard(
    "wands",
    "Five of Wands",
    "⚔️",
    "Competition, challenge, dynamic conflict",
    "Avoiding conflict, inner struggle",
    "Temporary conflict and friction are part of the field of karma — not to be feared but navigated with skill. As Krishna tells Arjuna: do not retreat from the field of action out of confusion.",
    "A period of competition or conflict in your past, though stressful, sharpened your skills.",
    "You are navigating a field of competing forces. Stay grounded in your dharma rather than reacting.",
    "A period of dynamic competition approaches. Your skill and dharmic alignment will determine the outcome.",
  ),
  makeMinorCard(
    "wands",
    "Six of Wands",
    "🏆",
    "Victory, recognition, public success",
    "Fall from grace, ego, delays",
    "Victory through righteous action — the triumph that comes when effort aligns with dharma. Krishna promises in Chapter 18 that the devoted soul achieves complete fulfillment through dharmic excellence.",
    "A past victory or recognition validated your efforts and built the confidence you carry today.",
    "Recognition and success are flowing toward you. Accept your achievements with grace and humility.",
    "Public recognition and victory approach. Your sustained effort will be honored and celebrated.",
  ),
  makeMinorCard(
    "wands",
    "Seven of Wands",
    "🛡️",
    "Defense, conviction, standing firm",
    "Overwhelm, backing down, self-doubt",
    "Stand firm in dharma even when challenged from all sides. Arjuna had to stand his ground on Kurukshetra. Chapter 2 reminds us that the warrior who stands firm in righteousness earns eternal merit.",
    "You held your ground in the face of opposition in the past — that courage earned you your current position.",
    "You are being challenged to defend your position or values. Hold firm with dharmic conviction.",
    "A test of your convictions approaches. Your willingness to stand firm will determine your trajectory.",
  ),
  makeMinorCard(
    "wands",
    "Eight of Wands",
    "💨",
    "Swift action, speed, communication, momentum",
    "Delays, chaos, scattered energy",
    "Swift movement of karmic energy — like arrows released from Arjuna's bow. When circumstances align and direction is clear, act with swift decisiveness as the Gita advocates.",
    "A rapid sequence of events in your past accelerated your journey beyond what you thought possible.",
    "Things are moving quickly. Embrace the pace — communication and action align perfectly now.",
    "Rapid movement and swift progress approach. An exciting acceleration is imminent.",
  ),
  makeMinorCard(
    "wands",
    "Nine of Wands",
    "🔋",
    "Resilience, persistence, last effort",
    "Exhaustion, paranoia, stubbornness",
    "Nearly there — but requiring one last act of courage. Krishna's teaching on persistence in Chapter 18: 'That understanding which knows when to act and when not to act — that is understanding in the mode of goodness.'",
    "You persisted through a difficult period in the past, building a resilience that now defines you.",
    "You are close to your goal but need one final push. Draw on your deep reserves of strength.",
    "Sustained effort through final challenges will bring you to your destination. Don't give up now.",
  ),
  makeMinorCard(
    "wands",
    "Ten of Wands",
    "🎒",
    "Burden, responsibility, overload",
    "Dropping burdens, releasing, delegating",
    "The devotee carries heavy responsibilities — but Krishna offers this: 'Cast all your burdens upon Me.' Chapter 18 speaks of the wise person who carries dharmic duties without complaint but also knows when to surrender the burden to the Divine.",
    "A heavy burden you carried in the past — taken on out of duty — shaped your character but also drained you.",
    "You may be carrying more than is healthy. Examine what can be released or delegated.",
    "A heavy responsibility is approaching. Approach it with dharmic equanimity and ask for divine support.",
  ),
  makeMinorCard(
    "wands",
    "Page of Wands",
    "🌟",
    "Enthusiasm, new ideas, discovery",
    "Lack of direction, scattered fire",
    "The young student of the sacred fire — full of enthusiasm but not yet seasoned. Krishna appreciates the sincere seeker who brings childlike curiosity to the path of knowledge.",
    "Youthful enthusiasm and a willingness to learn shaped the beginning of an important journey in your past.",
    "Approach your current situation with enthusiasm and a beginner's mind. A new adventure beckons.",
    "A message of creative opportunity or the arrival of an enthusiastic new energy in your life approaches.",
  ),
  makeMinorCard(
    "wands",
    "Knight of Wands",
    "🏇",
    "Action, adventure, impulsiveness, passion",
    "Recklessness, hot-headedness, delays",
    "The knight charges into action with fire and passion. While Arjuna's courage is admired, Krishna tempers it with wisdom — action must be purposeful and guided by dharma to be truly powerful.",
    "A period of adventurous, passionate action in your past broke open new territories in your life.",
    "Act boldly and decisively, but temper passion with dharmic wisdom. The time for action is now.",
    "A passionate, fast-moving energy will charge into your life — exciting but requiring grounded direction.",
  ),
  makeMinorCard(
    "wands",
    "Queen of Wands",
    "👸",
    "Confidence, courage, independence, charisma",
    "Jealousy, insecurity, demanding attention",
    "The queen of sacred fire — she who holds inner authority and radiates natural leadership. This is the energy of Durga: fierce, confident, and wholly devoted to dharmic purpose.",
    "A confident, inspiring figure or energy in your past helped awaken your own inner authority.",
    "Stand in your natural confidence. Your presence and charisma serve the people around you now.",
    "Your confidence will shine and draw people and opportunities to you in a significant way.",
  ),
  makeMinorCard(
    "wands",
    "King of Wands",
    "👑",
    "Leadership, vision, entrepreneurship, mastery",
    "Impulsiveness, ruthlessness, poor decisions",
    "The wise king who has mastered creative fire — he leads with vision and inspires through his own example. This reflects the Gita's ideal of the dharmic ruler who governs for the people's wellbeing.",
    "A visionary leader or period of masterful leadership in your past modeled the kind of authority you now embody.",
    "Lead with vision, integrity, and dharmic purpose. Your natural authority is needed right now.",
    "A time of inspired leadership and masterful achievement approaches. Step fully into your power.",
  ),
];

const CUPS: TarotCard[] = [
  makeMinorCard(
    "cups",
    "Ace of Cups",
    "💧",
    "New love, spiritual beginnings, joy, intuition",
    "Blocked emotions, repressed feelings",
    "The sacred cup of Amrit — divine nectar of love and bliss. This is the bhakti seed: the first stirring of pure love for the Divine. Chapter 12 speaks of this overflowing love as the highest of all yogas.",
    "The opening of your heart in the past — to love, to creativity, or to spirit — set the emotional tone for your journey.",
    "Emotional abundance and spiritual love are flowing toward you. Open your heart fully.",
    "A new emotional beginning approaches — a profound opening of the heart to love, beauty, and joy.",
  ),
  makeMinorCard(
    "cups",
    "Two of Cups",
    "💑",
    "Partnership, attraction, mutual love",
    "Imbalance, broken connection, tension",
    "Two souls recognizing each other in the light of dharma. This mirrors Radha-Krishna's mutual recognition — a love that elevates both souls. The Gita teaches that relationships based on shared dharma are the most enduring.",
    "A meaningful partnership or connection in your past created a bond that continues to shape your emotional life.",
    "A significant connection is forming or deepening. Honor it with presence and mutual respect.",
    "A beautiful partnership or union of souls approaches — one that will elevate both of you.",
  ),
  makeMinorCard(
    "cups",
    "Three of Cups",
    "🥂",
    "Celebration, friendship, community, joy",
    "Overindulgence, gossip, isolation",
    "The celebration of the sangha — the sacred community that supports the spiritual path. Krishna joyfully celebrated with the gopas and gopis. Community and shared joy are divine gifts to be treasured.",
    "Joyful community and deep friendships in your past gave your journey warmth and emotional nourishment.",
    "Celebrate with your people. Shared joy and community support your wellbeing now.",
    "A joyful gathering or celebration of community approaches. Connection and belonging await you.",
  ),
  makeMinorCard(
    "cups",
    "Four of Cups",
    "🌊",
    "Contemplation, apathy, re-evaluation",
    "Renewed motivation, accepting an offer",
    "The soul in contemplation, perhaps missing an offered cup. Beware of attachment to disappointment. The Gita teaches in Chapter 2: 'Let not the fruit of action be your motive.' Open your eyes to the divine gifts already present.",
    "A period of emotional withdrawal or apathy in your past led to missing opportunities that were genuinely available.",
    "Look carefully at what is being offered to you — you may be so focused inward that you're missing divine gifts.",
    "After a period of reflection, you will emerge with renewed clarity and readiness to receive what life offers.",
  ),
  makeMinorCard(
    "cups",
    "Five of Cups",
    "😢",
    "Loss, grief, regret, disappointment",
    "Moving forward, acceptance, forgiveness",
    "Grief is honored in the Gita — Arjuna's tears at Kurukshetra are never mocked. But Krishna gently redirects attention from the three spilled cups to the two still standing. Look toward what remains.",
    "A loss or disappointment in your past carries grief that still needs acknowledgment and gentle release.",
    "Allow yourself to grieve what has been lost, but do not forget what remains. Focus slowly shifts forward.",
    "After grief comes acceptance. You will find the strength to honor loss while embracing what still stands.",
  ),
  makeMinorCard(
    "cups",
    "Six of Cups",
    "🌸",
    "Nostalgia, childhood, innocence, gifts",
    "Living in the past, unrealistic",
    "The sweetness of pure-hearted memory — the innocence of a soul before the complications of worldly life. Krishna's childhood in Vrindavan represents this divine innocence that must be remembered and honored.",
    "A gift from the past — a memory, a connection, or an old kindness — is still influencing your present.",
    "Revisit the past with gentleness. An old connection or childhood gift may be relevant now.",
    "Something from your past will return with beauty and relevance — an old joy rekindled or a gift remembered.",
  ),
  makeMinorCard(
    "cups",
    "Seven of Cups",
    "🌈",
    "Choices, fantasy, illusion, wishful thinking",
    "Alignment, right choice, clarity",
    "Too many cups floating in the clouds of maya — dreams without grounding. The Gita teaches discernment: 'Use your intelligence to understand what ought to be done and what ought not to be done.' Dream big, but ground in dharmic reality.",
    "A period of scattered desires or illusory choices in the past may have caused confusion or wasted energy.",
    "You face multiple possibilities — some real, some illusory. Apply dharmic discernment to choose wisely.",
    "Clarity will emerge from current confusion. You will identify the one true path among the many options.",
  ),
  makeMinorCard(
    "cups",
    "Eight of Cups",
    "🚶",
    "Abandonment, walking away, searching for higher truth",
    "Fear of moving on, unfinished business",
    "The spiritual pilgrim who walks away from emotional fulfillment in search of higher truth. This is the renunciant's path — the soul that has tasted the material world and turns toward the divine. Chapter 6 speaks of the sincere seeker who renounces comfort for clarity.",
    "Leaving behind something emotionally comfortable in your past — though painful — set you on the right path.",
    "Something no longer serves your soul's growth. The courage to walk away may be exactly what's needed.",
    "A significant departure approaches — walking away from what was toward what must be. Trust the inner call.",
  ),
  makeMinorCard(
    "cups",
    "Nine of Cups",
    "✨",
    "Contentment, wishes fulfilled, satisfaction",
    "Complacency, greed, dissatisfaction",
    "The wish card — contentment and fulfillment manifest. Chapter 9 promises that the devoted soul receives what they lack. This card signals that heartfelt intentions held in alignment with dharma will be fulfilled.",
    "A time of true contentment and wishes fulfilled in your past showed you what authentic happiness feels like.",
    "Your wishes are manifesting. Receive this abundance with gratitude and without grasping.",
    "A period of beautiful fulfillment approaches — your deepest heartfelt wishes will be answered.",
  ),
  makeMinorCard(
    "cups",
    "Ten of Cups",
    "🌅",
    "Harmony, joy, divine love, lasting happiness",
    "Broken harmony, disconnection, conflict",
    "The rainbow of divine love and harmonious family — the highest emotional fulfillment. This mirrors the householder's dharma honored in the Gita: a life of devotion, family, and joyful service to all beings.",
    "A period of genuine happiness and harmonious connection in your past showed you what lasting joy feels like.",
    "Emotional fulfillment and harmonious connection surround you. Be present and grateful for this blessing.",
    "Lasting happiness and harmonious completion approaches — the fulfillment of your heart's deepest longing.",
  ),
  makeMinorCard(
    "cups",
    "Page of Cups",
    "🐟",
    "Intuitive messages, creative beginnings, innocence",
    "Emotional immaturity, blocked intuition",
    "The young dreamer who receives unexpected intuitive messages — like the fish whispering from the cup. The sincere heart receives divine communication in surprising ways. Be open to the unexpected message.",
    "An unexpected intuitive message or creative beginning in the past opened an emotional or spiritual door.",
    "Pay attention to unexpected messages, dreams, and intuitive impressions. Something is trying to reach you.",
    "An unexpected message of emotional significance will arrive — perhaps from within, perhaps from without.",
  ),
  makeMinorCard(
    "cups",
    "Knight of Cups",
    "🏰",
    "Romance, charm, imagination, following the heart",
    "Moodiness, unrealistic, escapism",
    "The romantic knight following his heart — beautiful and inspiring but needing wisdom to complete the quest. Follow your heart, but let dharmic discernment be your compass alongside emotional truth.",
    "A romantic or emotionally driven pursuit in your past brought beauty and meaning to your journey.",
    "Follow your heart, but ground the vision in dharmic reality. The romantic impulse serves you now.",
    "A beautiful, heart-led journey approaches — one that will bring romance, inspiration, and emotional depth.",
  ),
  makeMinorCard(
    "cups",
    "Queen of Cups",
    "🌺",
    "Compassion, emotional intelligence, intuition, healing",
    "Codependency, emotional manipulation",
    "The compassionate queen who holds the sacred chalice of empathy and healing. She mirrors the divine mother energy — the unconditional love that heals all wounds, as described in the Bhagavatam's glorification of divine grace.",
    "A compassionate figure or a time of emotional healing in your past helped restore your capacity for love.",
    "Your emotional intelligence and compassion are your greatest gifts right now. Lead with your heart.",
    "Healing, deep compassion, and emotional wisdom will flow to and through you in significant ways.",
  ),
  makeMinorCard(
    "cups",
    "King of Cups",
    "👑",
    "Emotional mastery, wisdom, balance, diplomacy",
    "Emotional manipulation, moodiness, instability",
    "The king who has mastered the waters of emotion without suppressing them. This mirrors the ideal of the enlightened householder in the Gita — one who loves deeply while remaining inwardly free and unattached.",
    "Emotional wisdom and compassionate leadership in your past showed others a model of balanced, loving strength.",
    "Lead with emotional wisdom and compassionate authority. Balance is your greatest strength now.",
    "Emotional mastery and wise leadership will bring stability and deep fulfillment to your relationships.",
  ),
];

const SWORDS: TarotCard[] = [
  makeMinorCard(
    "swords",
    "Ace of Swords",
    "⚔️",
    "Clarity, breakthrough, truth, new idea",
    "Confusion, chaos, false clarity",
    "The sacred sword of discrimination — viveka — that cuts through maya to reveal truth. Chapter 4 of the Gita declares: 'The fire of knowledge reduces all karma to ashes.' One clear truth held firmly can transform an entire life.",
    "A moment of piercing clarity or a breakthrough insight in your past cut through confusion and changed your direction.",
    "Clarity is available to you — a new perspective or powerful truth that clears away confusion.",
    "A breakthrough in thinking or understanding approaches — a liberating insight that changes everything.",
  ),
  makeMinorCard(
    "swords",
    "Two of Swords",
    "🙈",
    "Indecision, stalemate, avoidance",
    "Seeing clearly, making a decision",
    "The soul that refuses to look — blindfolded before the truth it fears to see. The Gita teaches in Chapter 16 that refusing to face truth is a quality of tamas. Courage to see clearly is the first step toward dharmic action.",
    "A decision you avoided in the past created a stalemate that required resolution before progress was possible.",
    "You are avoiding a decision or truth. The stalemate will only resolve when you choose to see clearly.",
    "A period of forced clarity approaches. The decision that seems impossible now will become unavoidable and clear.",
  ),
  makeMinorCard(
    "swords",
    "Three of Swords",
    "💔",
    "Heartbreak, grief, sorrow, painful truth",
    "Recovery, releasing grief, forgiveness",
    "The three swords piercing the heart — grief that must be fully experienced to be transcended. Arjuna's weeping at Kurukshetra is honored by Krishna, who then gently redirects it. Grief acknowledged is grief transformed.",
    "A heartbreak or painful truth in your past left a wound that still requires gentle healing and compassion.",
    "Pain is present — acknowledge it with compassion. What hurts is asking to be seen, not avoided.",
    "After the piercing of illusion comes the healing. An honest reckoning with pain opens the door to recovery.",
  ),
  makeMinorCard(
    "swords",
    "Four of Swords",
    "😴",
    "Rest, contemplation, recovery, stillness",
    "Restlessness, burnout, ignoring recovery",
    "The rest of the sage — deliberate withdrawal for renewal and inner contemplation. Even great warriors rest between battles. Chapter 6 describes the discipline of meditation and conscious withdrawal as essential for sustained dharmic action.",
    "A necessary period of rest or recovery in your past allowed you to heal and rebuild your inner resources.",
    "Rest is not laziness — it is strategic withdrawal for renewal. Honor your need for stillness now.",
    "A needed period of rest and contemplation approaches. This stillness will restore your power for future action.",
  ),
  makeMinorCard(
    "swords",
    "Five of Swords",
    "😈",
    "Conflict, hollow victory, defeat, betrayal",
    "Reconciliation, moving on, forgiving defeat",
    "A victory that leaves everyone feeling depleted — the adharmic triumph that costs more than it gains. The Gita teaches that victory achieved through deception or dharma-violation ultimately brings its own defeat. Choose integrity over cleverness.",
    "A conflict in your past — whether won or lost — left unresolved residue that still influences your trust.",
    "Examine whether a current conflict is truly worth its cost. A hollow victory serves no one's dharma.",
    "A conflict will resolve, but consider whether the methods and aftermath truly align with your values.",
  ),
  makeMinorCard(
    "swords",
    "Six of Swords",
    "⛵",
    "Transition, moving on, mental clarity after difficulty",
    "Stagnation, resisting transition",
    "The boat crossing troubled waters toward calmer shores — the soul moving through difficulty toward equilibrium. Chapter 2 speaks of the sage whose mind remains steady even in the midst of turbulence and transition.",
    "Moving through a difficult period in your past required surrender and trust in the transition process.",
    "You are in transition — leaving turbulence behind and moving toward calmer, clearer conditions.",
    "A significant transition will bring you from current difficulties into greater mental clarity and peace.",
  ),
  makeMinorCard(
    "swords",
    "Seven of Swords",
    "🦊",
    "Strategy, deception, acting alone, cunning",
    "Honesty, clear conscience, returning to truth",
    "Beware of operating from deception or excessive cleverness. The Gita's teaching on truth in Chapter 16 is clear: 'Truthfulness, absence of anger, renunciation — these are the divine qualities.' Strategy is dharmic; deception is not.",
    "A time when you or another acted with hidden intentions in your past created a situation that still requires resolution.",
    "Examine whether your current strategy is fully transparent and dharmic. Are you being completely honest?",
    "The truth will emerge from clever strategy. Either honesty will restore trust or deception will be unmasked.",
  ),
  makeMinorCard(
    "swords",
    "Eight of Swords",
    "⛓️",
    "Restriction, victim mentality, trapped thoughts",
    "Freedom, new perspective, releasing restrictions",
    "The mind that has imprisoned itself — not through external chains but through limiting belief. The Gita teaches in Chapter 6 that the mind can be either your greatest ally or your greatest enemy. Freedom begins with the decision to see differently.",
    "A mental restriction or self-imposed limitation in your past kept you bound longer than necessary.",
    "You have more freedom than you realize. Examine what mental stories are keeping you in place.",
    "The mental restrictions of the present will dissolve as a new perspective liberates your thinking.",
  ),
  makeMinorCard(
    "swords",
    "Nine of Swords",
    "😰",
    "Anxiety, worry, fear, nightmares",
    "Hope, finding help, releasing anxiety",
    "The suffering that lives in the mind at 3 AM — the torment of worry and worst-case thinking. Krishna addresses this directly in Chapter 18: the restless mind that will not rest even in sleep. Surrender your fears to the Divine and choose equanimity.",
    "A period of anxiety or mental suffering in your past — though dark — eventually revealed your resilience.",
    "The mind is tormenting itself with fears. Practice surrender and return to present-moment awareness.",
    "This period of mental darkness will give way to light. What frightens you now will lose its power.",
  ),
  makeMinorCard(
    "swords",
    "Ten of Swords",
    "🌅",
    "Painful ending, rock bottom, release, surrender",
    "Resistance, recovery, cannot make it worse",
    "The absolute end of a cycle — total dissolution of an ego position, a plan, or a chapter of life. But notice: the sun rises on the horizon even here. The Gita teaches that every ending is a beginning in disguise, and that which is real can never be destroyed.",
    "A painful ending or rock-bottom moment in your past — though devastating — ultimately freed you for something greater.",
    "You are at or near the end of a difficult chapter. This is the darkest moment before dawn.",
    "After this period of ending and release, a new dawn rises. The worst is passing; the new begins.",
  ),
  makeMinorCard(
    "swords",
    "Page of Swords",
    "🔍",
    "Curiosity, mental agility, new ideas",
    "Deception, gossip, poor communication",
    "The young thinker with sharp mind and quick observation — full of analytical energy. The sincere student of the Gita approaches scripture with sharp, questioning mind: 'What does this mean? How does this apply?' Intellectual curiosity is the beginning of jnana yoga.",
    "Your keen intellectual curiosity in the past opened doors that slower or less questioning minds might have missed.",
    "Apply your mental sharpness and curiosity to your current situation. Think clearly and observe carefully.",
    "A new idea or piece of information will arrive that changes your understanding of the situation.",
  ),
  makeMinorCard(
    "swords",
    "Knight of Swords",
    "⚡",
    "Action, ambition, drive, fearlessness",
    "Recklessness, harsh words, impulsive action",
    "The passionate thinker who charges forward with mental fire. Brilliant but potentially destructive if not tempered with wisdom. The Gita's ideal: be fierce in pursuit of truth but compassionate in communication.",
    "Your intellectual passion and drive in the past achieved breakthroughs — though perhaps also created some friction.",
    "Mental energy is high. Channel it constructively and pause before speaking to ensure words are dharmic.",
    "A rapid intellectual breakthrough or assertive action approaches. Lead with wisdom as well as speed.",
  ),
  makeMinorCard(
    "swords",
    "Queen of Swords",
    "🦅",
    "Clear thinking, direct communication, independence, truth",
    "Cruelty, coldness, manipulation",
    "The queen of clear discernment — she sees truth without flinching. She mirrors the Gita's ideal of truthfulness: 'Speak truth that is pleasant; do not speak unpleasant truth and do not speak pleasant untruth.' Truth delivered with compassion is the highest communication.",
    "A clear-eyed, direct figure or your own discerning mind in the past cut through confusion and revealed truth.",
    "Apply clear discernment and speak your truth directly but with compassion. Clarity is your superpower now.",
    "Perceptive clarity and honest communication will guide you through the situation that approaches.",
  ),
  makeMinorCard(
    "swords",
    "King of Swords",
    "⚔️",
    "Intellectual mastery, authority, truth, discipline",
    "Tyranny, abuse of power, cold logic",
    "The master of mind and language — the dharmic judge who applies truth and logic with precision and fairness. This mirrors the ideal of the learned king who governs by clear understanding of shastra and never by whim.",
    "Intellectual authority and clear-minded leadership in your past established your current credibility.",
    "Lead with intellectual clarity and dharmic authority. Your capacity for clear, fair judgment is needed now.",
    "Intellectual mastery and authoritative clarity will shape a situation where truth must prevail.",
  ),
];

const PENTACLES: TarotCard[] = [
  makeMinorCard(
    "pentacles",
    "Ace of Pentacles",
    "💰",
    "New opportunity, material beginnings, prosperity",
    "Missed opportunity, poor planning, scarcity",
    "The seed of material manifestation — an opportunity in the physical world that, when properly cultivated, yields lasting abundance. The Gita teaches that material life engaged with dharmic intent is sacred work, not spiritual compromise.",
    "A new material opportunity in the past — perhaps a seed investment, job, or project — planted the foundation of your current prosperity.",
    "A material opportunity is present or arriving. This seed, if planted wisely and with dharmic intent, will yield real fruit.",
    "A significant material opportunity approaches — one with the potential for lasting, stable prosperity.",
  ),
  makeMinorCard(
    "pentacles",
    "Two of Pentacles",
    "🎪",
    "Balance, adaptability, juggling priorities",
    "Imbalance, overwhelm, poor financial choices",
    "The art of balancing material demands — work, finances, health, and relationship — with grace. The Gita's teaching on yukta-vairagya: balanced engagement with the world, neither grasping nor rejecting what is needed.",
    "A period of juggling multiple material priorities in the past developed your capacity for practical adaptability.",
    "You are balancing multiple demands on your resources and time. Maintain flexibility and grace.",
    "A period of juggling priorities approaches. Your adaptability and balanced judgment will determine the outcome.",
  ),
  makeMinorCard(
    "pentacles",
    "Three of Pentacles",
    "🏛️",
    "Teamwork, skill, craftsmanship, collaboration",
    "Poor collaboration, lack of effort",
    "The master craftsperson working with others to create something greater than any could alone. This mirrors the Gita's honored ideal of skilled work offered as sacrifice: 'Work done with devotion becomes a form of worship.' Excellence in craft is a divine offering.",
    "Skilled collaboration and craftsmanship in the past built something of lasting value and reputation.",
    "Collaborate. Your skills combined with others' will create something excellent. Honor the craft.",
    "Recognition for skilled work and meaningful collaboration approaches. Your expertise will be honored.",
  ),
  makeMinorCard(
    "pentacles",
    "Four of Pentacles",
    "🏦",
    "Security, stability, possessiveness, conservation",
    "Generosity, letting go, releasing control",
    "The soul clinging to material security — neither wrong nor right, but potentially limiting spiritual expansion. The Gita teaches the householder to provide wisely while holding material goods lightly. True security comes from dharmic alignment, not from hoarding.",
    "A period of conservation and holding tight in the past provided stability, though perhaps at the cost of growth.",
    "Examine your relationship with security and control. Is your caution serving you or limiting your dharma?",
    "Material stability consolidates, but be mindful of where conservatism becomes constriction.",
  ),
  makeMinorCard(
    "pentacles",
    "Five of Pentacles",
    "❄️",
    "Financial hardship, poverty consciousness, isolation",
    "Recovery, asking for help, returning stability",
    "The devotee in hardship — yet the light of the temple is always present nearby. The Gita reminds: 'The Lord is equal to all beings, and no one is dear or hateful to Me' — He does not abandon us in hardship. Turn toward the divine light even in material difficulty.",
    "A period of material hardship or lack in your past taught you resilience and revealed who truly supported you.",
    "Lean on your community and turn toward the divine for support. You are not as alone as you feel.",
    "Current hardship will give way to recovery. Help is available — open yourself to receive it with gratitude.",
  ),
  makeMinorCard(
    "pentacles",
    "Six of Pentacles",
    "💝",
    "Generosity, charity, giving and receiving",
    "Debt, inequality, strings attached",
    "The dharmic gift — dana — given without expectation of return. Chapter 17 teaches three types of charity: sattvic (given freely to the deserving), rajasic (given for reciprocity), and tamasic (given at wrong time or place). Practice sattvic giving.",
    "Generosity you gave or received in the past created a karma of goodwill that continues to flow back to you.",
    "Be open to both giving and receiving with equal grace. Generous circulation of resources serves dharma.",
    "A meaningful exchange of generosity approaches — either giving or receiving a significant material gift.",
  ),
  makeMinorCard(
    "pentacles",
    "Seven of Pentacles",
    "🌱",
    "Patient investment, long-term vision, assessment",
    "Impatience, lack of growth, re-evaluation",
    "The farmer pausing to assess the growing crop — wisdom knows when to act and when to wait for natural ripening. The Gita teaches that karma-phala (the fruit of action) arrives in its own time. Nourish and wait; do not pluck before ripening.",
    "Patient investment of time, energy, or resources in the past is now beginning to show meaningful returns.",
    "Your long-term investment is growing. Pause, assess, and trust the process — it is working.",
    "Your patient investment will yield tangible results. The harvest you have been cultivating is nearly ready.",
  ),
  makeMinorCard(
    "pentacles",
    "Eight of Pentacles",
    "🔨",
    "Diligence, skill development, mastery, craft",
    "Perfectionism, lack of focus, poor quality",
    "The devoted student of craft — practicing until skill becomes second nature. This is karma yoga in its purest material expression: excellence through repetition, devotion, and complete presence. Work performed with total attention is a form of worship.",
    "A dedicated period of skill development and disciplined practice in the past built the expertise you now carry.",
    "Master your craft through diligent, focused practice. Excellence achieved through devotion is a sacred act.",
    "A period of dedicated skill-building approaches. Patient mastery will yield lasting expertise and recognition.",
  ),
  makeMinorCard(
    "pentacles",
    "Nine of Pentacles",
    "🌻",
    "Abundance, independence, luxury, self-sufficiency",
    "Dependence, overspending, isolation",
    "The self-sufficient being who has cultivated their garden of abundance — enjoying the fruits of disciplined effort. This reflects the Gita's ideal of the nishkama karma devotee: one who works with excellence and receives abundance as a natural result, not as grasped goal.",
    "Independent abundance cultivated through discipline and patience in the past now gives you freedom.",
    "You stand in or near a state of graceful self-sufficiency and abundance. Appreciate and enjoy it.",
    "Material abundance and elegant self-sufficiency approach — a beautiful harvest of your devoted efforts.",
  ),
  makeMinorCard(
    "pentacles",
    "Ten of Pentacles",
    "🏠",
    "Wealth, legacy, family, lasting security",
    "Family conflicts, loss of legacy, instability",
    "The legacy of dharma passed through generations — the wealth that is spiritual, cultural, and material all at once. The Gita's teaching on duty to family and community honors this generational transmission of wisdom and prosperity.",
    "A foundation of family stability and material inheritance — tangible or intangible — shapes who you are today.",
    "Build with the long view. Your current choices become the legacy that shapes future generations.",
    "Lasting security, family harmony, and meaningful legacy approaches — the fullness of dharmic prosperity.",
  ),
  makeMinorCard(
    "pentacles",
    "Page of Pentacles",
    "📚",
    "Study, practical skills, opportunity, manifestation",
    "Lack of focus, procrastination, poor investment",
    "The young student of material wisdom — curious, practical, and beginning to understand how the physical world works. The Gita honors the student who approaches practical wisdom with the same devotion as spiritual study.",
    "A period of practical learning and skill acquisition in the past laid the groundwork for your current material competence.",
    "Apply practical focus and willingness to learn in your current material situation. An opportunity awaits patient attention.",
    "A practical opportunity for learning, growth, or new material beginning approaches. Pursue it diligently.",
  ),
  makeMinorCard(
    "pentacles",
    "Knight of Pentacles",
    "🌾",
    "Responsibility, reliability, hard work, patience",
    "Boredom, stubbornness, perfectionism",
    "The dependable, diligent knight who moves slowly but never fails to deliver. The Gita's karma yoga ideal: steadfast, methodical action performed without shortcuts or complaint. Reliability is itself a spiritual practice.",
    "Your steadfast reliability and patient hard work in the past built the trust and stability you now enjoy.",
    "Show up consistently and work with methodical diligence. Your reliability is your greatest asset.",
    "Steady, reliable progress approaches through patient, methodical effort. Slow and steady wins this race.",
  ),
  makeMinorCard(
    "pentacles",
    "Queen of Pentacles",
    "🌿",
    "Nurturing, abundance, practicality, security",
    "Self-neglect, materialism, smothering",
    "The queen of the earth — she who tends both the material realm and the wellbeing of all who depend upon her. This is the ideal of the dharmic homemaker: practical wisdom, abundant generosity, and grounded spiritual presence.",
    "A nurturing, practically wise figure or time in your past provided the material and emotional security that shaped you.",
    "Ground yourself in practical wisdom and abundant generosity. Your capacity to nurture serves all around you.",
    "Grounded abundance and nurturing generosity will flow to and through you in deeply meaningful ways.",
  ),
  makeMinorCard(
    "pentacles",
    "King of Pentacles",
    "🏔️",
    "Wealth, business acumen, leadership, abundance",
    "Materialism, stubbornness, financial failure",
    "The king who has mastered the material realm through discipline, wisdom, and dharmic leadership. He gives generously from his abundance and builds structures that support generations. This is the ideal of the dharmic businessman: wealth in service of the greater good.",
    "Masterful material leadership and earned abundance in your past created the stable foundation you stand on today.",
    "Your practical mastery and financial wisdom are at their most powerful now. Lead with dharmic generosity.",
    "Material mastery and lasting abundance approach — earned through discipline and offered in service to the world.",
  ),
];

export const FULL_DECK: TarotCard[] = [
  ...MAJOR_ARCANA,
  ...WANDS,
  ...CUPS,
  ...SWORDS,
  ...PENTACLES,
];

export function drawThreeCards(): [TarotCard, TarotCard, TarotCard] {
  const shuffled = [...FULL_DECK].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1], shuffled[2]];
}

export function getSynthesis(
  past: TarotCard,
  present: TarotCard,
  future: TarotCard,
): string {
  return `Your journey begins in the realm of ${past.name} — ${past.keywordUpright.split(",")[0].trim()}. This energy from your past has laid the foundation of everything you now experience. The seeds planted there — whether of courage, love, discipline, or surrender — are the karma you carry into your present moment.\n\nNow, in the present, you stand beneath the influence of ${present.name}. ${present.presentMeaning} This is the crossroads where your awareness matters most. Krishna whispers from the Gita: "Act according to your dharma, not your fear." What you choose to do — or be — right now shapes the trajectory ahead.\n\nLooking toward your future, ${future.name} illuminates the horizon. ${future.futureMeaning} This is not a fixed fate — it is a divine invitation. As all three cards weave together, they tell a story of ${past.keywordUpright.split(",")[0].trim()} evolving through ${present.keywordUpright.split(",")[0].trim()} toward ${future.keywordUpright.split(",")[0].trim()}. Trust this sacred unfolding.`;
}
