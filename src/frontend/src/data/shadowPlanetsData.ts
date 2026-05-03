// Shadow Planets (Rahu & Ketu) Educational Data

export interface HouseEffect {
  house: number;
  title: string;
  effect: string;
}

export interface SignEffect {
  sign: string;
  symbol: string;
  effect: string;
}

export interface AxisEffect {
  axis: string;
  houses: string;
  rahuHouse: number;
  ketuHouse: number;
  effect: string;
}

export interface Remedy {
  id: number;
  title: string;
  description: string;
}

// ─── RAHU ───────────────────────────────────────────────────────────────────

export const rahuHouseEffects: HouseEffect[] = [
  {
    house: 1,
    title: "Rahu in 1st House",
    effect:
      "Creates a strong desire for self-expression and recognition. The native often appears magnetic and unconventional, driven by an intense need for identity and public visibility.",
  },
  {
    house: 2,
    title: "Rahu in 2nd House",
    effect:
      "Intensifies desires around wealth, family, and speech. Money comes through unusual sources, and the native may be unconventional in communication or have a complex family history.",
  },
  {
    house: 3,
    title: "Rahu in 3rd House",
    effect:
      "Creates exceptional communication ability and entrepreneurial drive. The native excels in media, writing, or short travels, often succeeding through bold and unconventional methods.",
  },
  {
    house: 4,
    title: "Rahu in 4th House",
    effect:
      "Brings restlessness related to home, property, and emotional roots. The native may live abroad or away from birthplace and may have an unconventional mother or domestic environment.",
  },
  {
    house: 5,
    title: "Rahu in 5th House",
    effect:
      "Amplifies creative intelligence, speculation, and romantic intensity. The native may have unusual children or be drawn to esoteric subjects, and success in stocks or creative fields is possible.",
  },
  {
    house: 6,
    title: "Rahu in 6th House",
    effect:
      "Highly favorable for defeating enemies, overcoming debts, and excelling in competitive fields. The native can succeed in medicine, law, or service-oriented careers through unconventional means.",
  },
  {
    house: 7,
    title: "Rahu in 7th House",
    effect:
      "Creates intense, unusual, or cross-cultural romantic partnerships. Business partnerships may also be with foreign persons. There can be delays or complications in marriage.",
  },
  {
    house: 8,
    title: "Rahu in 8th House",
    effect:
      "Bestows interest in occult, research, and hidden matters. Longevity is often strong, but there may be sudden transformations. Inheritance or spouse's wealth may come unexpectedly.",
  },
  {
    house: 9,
    title: "Rahu in 9th House",
    effect:
      "Draws the native toward foreign philosophy, religion, or teachers. Higher education may involve unconventional paths, and the native may challenge orthodox religious beliefs.",
  },
  {
    house: 10,
    title: "Rahu in 10th House",
    effect:
      "One of the most powerful placements for career success. The native rises through unconventional means or foreign connections, often achieving public fame or political prominence.",
  },
  {
    house: 11,
    title: "Rahu in 11th House",
    effect:
      "Strongly favorable for financial gains, social networks, and fulfillment of desires. Gains come through large organizations, technology, or foreign sources. Elder siblings may play an important role.",
  },
  {
    house: 12,
    title: "Rahu in 12th House",
    effect:
      "Creates interest in foreign lands, spirituality, and hidden realms. The native may spend heavily or live abroad. Moksha-seeking tendencies or work in hospitals, ashrams, or foreign countries.",
  },
];

export const rahuSignEffects: SignEffect[] = [
  {
    sign: "Aries",
    symbol: "♈",
    effect:
      "Rahu in Aries gives bold ambition and a pioneering spirit, but also impulsive decisions and aggressive pursuit of goals.",
  },
  {
    sign: "Taurus",
    symbol: "♉",
    effect:
      "Rahu in Taurus (exalted) brings strong desires for material comfort, luxury, and sensual pleasures. Financial gains through persistence.",
  },
  {
    sign: "Gemini",
    symbol: "♊",
    effect:
      "Rahu in Gemini creates exceptional communicative abilities. The native may be skilled in multiple languages, writing, or media-related fields.",
  },
  {
    sign: "Cancer",
    symbol: "♋",
    effect:
      "Rahu in Cancer creates complex emotional needs and attachment to home and family. The native may feel foreign or different within their own family.",
  },
  {
    sign: "Leo",
    symbol: "♌",
    effect:
      "Rahu in Leo brings an intense desire for recognition, power, and authority. Success in politics, entertainment, or leadership roles.",
  },
  {
    sign: "Virgo",
    symbol: "♍",
    effect:
      "Rahu in Virgo gives analytical sharpness and drive for perfection. The native may excel in healthcare, research, or technical fields.",
  },
  {
    sign: "Libra",
    symbol: "♎",
    effect:
      "Rahu in Libra creates diplomatic charm and desire for partnerships. The native may engage in foreign business alliances or unconventional relationships.",
  },
  {
    sign: "Scorpio",
    symbol: "♏",
    effect:
      "Rahu in Scorpio gives deep interest in occult, sexuality, and transformation. The native can be intensely secretive with powerful regenerative energy.",
  },
  {
    sign: "Sagittarius",
    symbol: "♐",
    effect:
      "Rahu in Sagittarius creates a philosophical adventurer drawn to foreign cultures, higher knowledge, and spiritual exploration.",
  },
  {
    sign: "Capricorn",
    symbol: "♑",
    effect:
      "Rahu in Capricorn (some consider this exalted) gives strong career ambitions and slow but sure rise to power through hard work and strategic alliances.",
  },
  {
    sign: "Aquarius",
    symbol: "♒",
    effect:
      "Rahu in Aquarius fosters interest in technology, social reform, and humanitarian causes. The native may be ahead of their time in thought.",
  },
  {
    sign: "Pisces",
    symbol: "♓",
    effect:
      "Rahu in Pisces creates spiritual confusion but also mystical insights. The native may be drawn to healing arts, foreign travel, or esoteric practices.",
  },
];

// ─── KETU ───────────────────────────────────────────────────────────────────

export const ketuHouseEffects: HouseEffect[] = [
  {
    house: 1,
    title: "Ketu in 1st House",
    effect:
      "Creates a spiritually inclined personality with detachment from physical appearance and body consciousness. The native may have mystical experiences or be uninterested in self-promotion.",
  },
  {
    house: 2,
    title: "Ketu in 2nd House",
    effect:
      "Indicates past-life mastery of speech and material matters, leading to some detachment from wealth accumulation. The native may have a non-materialistic view toward family assets.",
  },
  {
    house: 3,
    title: "Ketu in 3rd House",
    effect:
      "Brings intuitive communication and detachment from siblings or neighbors. The native may prefer solitary pursuits and show less interest in short journeys or conventional media.",
  },
  {
    house: 4,
    title: "Ketu in 4th House",
    effect:
      "Creates detachment from home, mother, or emotional security. The native may have had an unconventional upbringing and seeks emotional stability through inner spiritual work.",
  },
  {
    house: 5,
    title: "Ketu in 5th House",
    effect:
      "Indicates past-life intelligence that manifests as intuitive creativity. There may be unusual relationship with children or a preference for spiritual over recreational pursuits.",
  },
  {
    house: 6,
    title: "Ketu in 6th House",
    effect:
      "Highly favorable for healing abilities and overcoming enemies through spiritual strength. The native may have had health issues that led to spiritual awakening.",
  },
  {
    house: 7,
    title: "Ketu in 7th House",
    effect:
      "Creates detachment in partnerships and marriage. The native may be spiritually evolved in relationships but find conventional partnership less fulfilling.",
  },
  {
    house: 8,
    title: "Ketu in 8th House",
    effect:
      "Gives strong occult abilities and past-life mastery of hidden knowledge. The native may have strong intuition about death, transformation, and hidden matters.",
  },
  {
    house: 9,
    title: "Ketu in 9th House",
    effect:
      "Indicates past-life religious mastery leading to detachment from dogmatic religion. The native follows an inner spiritual path and may challenge orthodox traditions.",
  },
  {
    house: 10,
    title: "Ketu in 10th House",
    effect:
      "Creates a complex relationship with career and public life. The native may be highly capable professionally yet feel detached from worldly success or recognition.",
  },
  {
    house: 11,
    title: "Ketu in 11th House",
    effect:
      "Reduces attachment to material gains and social networks, often indicating past-life fulfillment of worldly desires. Gains come through spiritual service rather than ambition.",
  },
  {
    house: 12,
    title: "Ketu in 12th House",
    effect:
      "Highly spiritual placement indicating past-life isolation or renunciation. The native is naturally inclined toward moksha, foreign lands, or ashram life.",
  },
];

export const ketuSignEffects: SignEffect[] = [
  {
    sign: "Aries",
    symbol: "♈",
    effect:
      "Ketu in Aries brings past-life warrior energy with present-life tendency toward introspection rather than aggression.",
  },
  {
    sign: "Taurus",
    symbol: "♉",
    effect:
      "Ketu in Taurus indicates detachment from material accumulation. The native may be naturally frugal or disinterested in luxury despite having the capacity to acquire it.",
  },
  {
    sign: "Gemini",
    symbol: "♊",
    effect:
      "Ketu in Gemini gives deep introspective thought processes. The native may prefer silence over chatter and possess intuitive over analytical intelligence.",
  },
  {
    sign: "Cancer",
    symbol: "♋",
    effect:
      "Ketu in Cancer (debilitated by some accounts) creates emotional detachment and difficulty connecting to nurturing energy, driving the native toward spiritual mothering of others.",
  },
  {
    sign: "Leo",
    symbol: "♌",
    effect:
      "Ketu in Leo creates detachment from power and fame. The native may quietly possess natural leadership but shun public recognition.",
  },
  {
    sign: "Virgo",
    symbol: "♍",
    effect:
      "Ketu in Virgo gives healing intuition and service-oriented spirituality. The native may excel in alternative healing or spiritual service.",
  },
  {
    sign: "Libra",
    symbol: "♎",
    effect:
      "Ketu in Libra creates detachment from relationships and partnerships. The native finds balance through inner stillness rather than external relationships.",
  },
  {
    sign: "Scorpio",
    symbol: "♏",
    effect:
      "Ketu in Scorpio (exalted) gives exceptional occult wisdom and mastery of hidden sciences. The native has powerful spiritual transformation abilities.",
  },
  {
    sign: "Sagittarius",
    symbol: "♐",
    effect:
      "Ketu in Sagittarius indicates past-life mastery of philosophy. The native has natural wisdom but may feel detached from organized religion or formal higher education.",
  },
  {
    sign: "Capricorn",
    symbol: "♑",
    effect:
      "Ketu in Capricorn gives past-life career mastery. The native may find conventional career less meaningful and gravitates toward meaningful service.",
  },
  {
    sign: "Aquarius",
    symbol: "♒",
    effect:
      "Ketu in Aquarius creates detachment from social causes and group activities despite genuine humanitarian instincts from past lives.",
  },
  {
    sign: "Pisces",
    symbol: "♓",
    effect:
      "Ketu in Pisces (debilitated) creates confusion around spirituality. The native may over-idealize spiritual teachers or be prone to self-deception until grounded.",
  },
];

// ─── RAHU-KETU AXIS EFFECTS ──────────────────────────────────────────────────

export const axisEffects: AxisEffect[] = [
  {
    axis: "1-7 Axis",
    houses: "1st & 7th",
    rahuHouse: 1,
    ketuHouse: 7,
    effect:
      "Rahu in 1st / Ketu in 7th: Strong personal ambition drives the native forward while relationships feel karmically draining or overly complex. The soul evolves from dependence on partnerships (Ketu-7) toward independent self-expression (Rahu-1).",
  },
  {
    axis: "2-8 Axis",
    houses: "2nd & 8th",
    rahuHouse: 2,
    ketuHouse: 8,
    effect:
      "Rahu in 2nd / Ketu in 8th: Karma around wealth and occult knowledge. The native builds material security in this life (Rahu-2) while releasing deep psychological patterns and past-life transformative experiences (Ketu-8).",
  },
  {
    axis: "3-9 Axis",
    houses: "3rd & 9th",
    rahuHouse: 3,
    ketuHouse: 9,
    effect:
      "Rahu in 3rd / Ketu in 9th: Communication skills and courage develop in this life while past-life religious or philosophical authority is released. The native moves from dogma toward practical communication and entrepreneurship.",
  },
  {
    axis: "4-10 Axis",
    houses: "4th & 10th",
    rahuHouse: 4,
    ketuHouse: 10,
    effect:
      "Rahu in 4th / Ketu in 10th: Karma around home versus career. Past-life career mastery (Ketu-10) is released while the soul seeks emotional rootedness, property, and domestic happiness in this life (Rahu-4).",
  },
  {
    axis: "5-11 Axis",
    houses: "5th & 11th",
    rahuHouse: 5,
    ketuHouse: 11,
    effect:
      "Rahu in 5th / Ketu in 11th: Creativity and children are this life's focus while detachment from social networks and large-scale gains characterizes the Ketu side. The native blossoms through individual creative expression.",
  },
  {
    axis: "6-12 Axis",
    houses: "6th & 12th",
    rahuHouse: 6,
    ketuHouse: 12,
    effect:
      "Rahu in 6th / Ketu in 12th: Service, competition, and health are karmic growth areas while past-life spiritual retreat (Ketu-12) is released. The native is meant to solve practical problems in this incarnation.",
  },
];

// ─── MAHADASHA ───────────────────────────────────────────────────────────────

export const rahuMahadasha = {
  duration: "18 Years",
  nature:
    "Rahu Mahadasha is a period of intense worldly ambition, foreign connections, rapid material advancement, and unexpected opportunities. It amplifies whatever house and sign Rahu occupies in the birth chart.",
  phases: [
    {
      phase: "Years 1-6",
      effect:
        "Sudden rise in career or social status. Unconventional methods bring success. Foreign travel or connections become prominent.",
    },
    {
      phase: "Years 7-12",
      effect:
        "The illusions of Rahu begin to be tested. Relationships and health may require attention. Spiritual lessons emerge through material challenges.",
    },
    {
      phase: "Years 13-18",
      effect:
        "Gradual clarity as Rahu lessons are integrated. The native begins moving toward more meaningful pursuits as the period winds down.",
    },
  ],
  positiveEffects: [
    "Rapid career advancement",
    "Foreign travel and gains",
    "Fame and public recognition",
    "Technological or innovative success",
    "Unconventional wealth accumulation",
  ],
  challenges: [
    "Illusion and self-deception",
    "Relationship instability",
    "Health issues (especially head, nervous system)",
    "Overambition leading to burnout",
    "Association with morally complex situations",
  ],
};

export const ketuMahadasha = {
  duration: "7 Years",
  nature:
    "Ketu Mahadasha is a period of spiritual intensity, introspection, and release of karmic baggage. It often brings detachment from worldly affairs and can trigger profound spiritual awakening.",
  phases: [
    {
      phase: "Years 1-2",
      effect:
        "Sudden changes, endings of old structures, and unexpected separations. The native feels disoriented as familiar supports dissolve.",
    },
    {
      phase: "Years 3-5",
      effect:
        "Deepening spiritual insight and turning inward. Psychic sensitivity increases. Old karma resolves through acceptance and surrender.",
    },
    {
      phase: "Years 6-7",
      effect:
        "Spiritual clarity and liberation from past patterns. The native emerges lighter and more evolved, ready for the next planetary cycle.",
    },
  ],
  positiveEffects: [
    "Deep spiritual awakening",
    "Release of karmic burdens",
    "Enhanced psychic and intuitive abilities",
    "Liberation from toxic patterns",
    "Moksha-oriented consciousness",
  ],
  challenges: [
    "Sudden loss or separation",
    "Physical weakness or mysterious illnesses",
    "Depression or existential confusion",
    "Isolation and social withdrawal",
    "Lack of direction in material affairs",
  ],
};

// ─── REMEDIES ───────────────────────────────────────────────────────────────

export const rahuRemedies: Remedy[] = [
  {
    id: 1,
    title: "Rahu Beej Mantra",
    description:
      "Chant 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः' (Om Bhraam Bhreem Bhraum Sah Rahave Namah) 18,000 times during Rahu Mahadasha or on Saturdays.",
  },
  {
    id: 2,
    title: "Hessonite (Gomed) Gemstone",
    description:
      "Wear a natural Hessonite (Gomed) of at least 5-7 carats in silver on the middle finger of the right hand on a Saturday.",
  },
  {
    id: 3,
    title: "Durga Puja & Navarna Mantra",
    description:
      "Worship Goddess Durga and recite the Navarna Mantra 'ऐं ह्रीं क्लीं चामुण्डायै विच्चे' regularly to balance Rahu's turbulent energy.",
  },
  {
    id: 4,
    title: "Feeding & Charity",
    description:
      "Donate black sesame seeds, black blankets, or iron items on Saturdays. Feeding crows on Rahu Kaal is also considered highly beneficial.",
  },
  {
    id: 5,
    title: "Saraswati Puja",
    description:
      "Rahu governs intellect and illusion. Regular worship of Goddess Saraswati helps channelize Rahu's mental energy toward wisdom rather than confusion.",
  },
];

export const ketuRemedies: Remedy[] = [
  {
    id: 1,
    title: "Ketu Beej Mantra",
    description:
      "Chant 'ॐ स्त्रां स्त्रीं स्त्रौं सः केतवे नमः' (Om Straam Streem Straum Sah Ketave Namah) 7,000 times during Ketu Mahadasha or on Tuesdays.",
  },
  {
    id: 2,
    title: "Cat's Eye (Lahsuniya) Gemstone",
    description:
      "Wear a natural Cat's Eye (Vaiduryam/Lahsuniya) of at least 5 carats in gold or panchdhatu on the middle finger of the right hand.",
  },
  {
    id: 3,
    title: "Ganesha Worship",
    description:
      "Lord Ganesha is the ruling deity of Ketu. Regular Ganesha puja and recitation of 'ॐ गं गणपतये नमः' helps mitigate Ketu's disconnecting influence.",
  },
  {
    id: 4,
    title: "Charity for Ketu",
    description:
      "Donate multi-colored blankets, sesame oil lamps, or brown/grey colored items on Tuesdays. Serving dogs and helping street animals is highly effective.",
  },
  {
    id: 5,
    title: "Bhairav Upasana",
    description:
      "Worship of Kaal Bhairav or Bhairon Baba is a powerful remedy for Ketu. Light mustard oil lamps and offer black sesame at Bhairav temples.",
  },
];

// ─── SADE SATI vs RAHU-KETU ──────────────────────────────────────────────────

export const sadeSatiVsRahuKetu = [
  {
    aspect: "Duration",
    sadeSati: "7.5 years (Shani transits 3 signs around natal Moon)",
    rahuKetu:
      "Rahu: 18-year Mahadasha; Ketu: 7-year Mahadasha; Transit: ~1.5 years per sign",
  },
  {
    aspect: "Planet Involved",
    sadeSati:
      "Saturn (Shani) — planet of karma, discipline, delays, and life lessons",
    rahuKetu:
      "Rahu (North Node) or Ketu (South Node) — shadow planets, karmic nodes",
  },
  {
    aspect: "Primary Effect",
    sadeSati:
      "Tests patience, imposes discipline, and forces life restructuring through hardship and delay. Primarily related to Saturn's karma.",
    rahuKetu:
      "Rahu creates obsessive desire and illusion; Ketu brings detachment and spiritual release. Both relate to past and future karmic direction.",
  },
  {
    aspect: "Predictability",
    sadeSati:
      "Highly predictable — occurs roughly every 29-30 years based on Saturn's transit cycle. Every person experiences it in a known pattern.",
    rahuKetu:
      "Less predictable in intensity — depends heavily on natal chart placement, conjunctions, and the house/sign Rahu and Ketu occupy.",
  },
  {
    aspect: "Positive Potential",
    sadeSati:
      "If Saturn is well-placed, Sade Sati can bring discipline-driven success. It rewards hard work and punishes shortcuts.",
    rahuKetu:
      "Rahu Mahadasha can produce rapid worldly success; Ketu Mahadasha can produce profound spiritual awakening and liberation.",
  },
  {
    aspect: "Remedies Focus",
    sadeSati:
      "Saturn remedies: oil donations on Saturdays, Shani Chalisa, blue sapphire, Hanuman worship, Shani Mantra, helping the poor.",
    rahuKetu:
      "Rahu: Hessonite, Durga puja, feeding crows. Ketu: Cat's Eye, Ganesha worship, Bhairav upasana, serving animals.",
  },
];
