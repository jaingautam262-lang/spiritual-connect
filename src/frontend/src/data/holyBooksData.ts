export type Faith = "Hindu" | "Jain" | "Sikh";

export interface HolyBook {
  id: string;
  title: string;
  titleHindi: string;
  titleOriginal?: string;
  faith: Faith;
  language: string;
  originalLanguage: string;
  author: string;
  period: string;
  significance: string;
  overview: string;
  structure: string;
  keyTeachings: string[];
  notableChapters: string[];
  sectarianNotes: string;
  hasFullText: boolean;
  icon: string;
  category: string;
}

export const holyBooks: HolyBook[] = [
  // ── HINDU SCRIPTURES ──────────────────────────────────────────
  {
    id: "rigveda",
    title: "Rigveda",
    titleHindi: "ऋग्वेद",
    titleOriginal: "Ṛgveda",
    faith: "Hindu",
    language: "Vedic Sanskrit",
    originalLanguage: "Vedic Sanskrit",
    author:
      "Various Rishis — Agastya, Vishwamitra, Vasishtha, Bharadvaja, Gritsamada, Kanva and others",
    period: "c. 1500–1200 BCE (oldest known text of mankind)",
    significance:
      "The Rigveda is the oldest of the four Vedas and the oldest known literary document of human civilization. It contains 1028 hymns (suktas) praising the deities Agni, Indra, Varuna, Surya, Ushas and others. It is the spiritual and philosophical foundation of Sanatana Dharma.",
    overview:
      "The Rigveda (ṛc = praise, veda = knowledge) is a collection of 1028 Vedic Sanskrit hymns organized into 10 books (Mandalas). Each hymn is a prayer addressed to a particular deity, composed by seers (rishis) in moments of divine inspiration. The text represents the earliest stratum of Vedic religion and contains foundational mantras like the Gayatri Mantra and the Purusha Sukta.",
    structure:
      "10 Mandalas (Books), 1028 Suktas (Hymns), 10,552 Richas (Verses). Family books (2–7) are the oldest; Mandalas 1 and 8–10 are later additions.",
    keyTeachings: [
      "Ekam Sat Vipra Bahudha Vadanti — Truth is one, the wise call it by many names (RV 1.164.46)",
      "Purusha Sukta — The cosmic man and the origin of the universe from the primordial sacrifice",
      "Nasadiya Sukta — Hymn of creation questioning the origin of existence",
      "Rita (cosmic order/truth) underpins all creation and moral law",
      "Interconnectedness of all beings through the divine (Vishwamitra's Idam Vishwam)",
    ],
    notableChapters: [
      "Mandala 1 — Agni Sukta: Praise of the sacred fire, first verse of the Rigveda",
      "Mandala 2 — Purusha Sukta (10.90): Origin of the cosmos and varna system",
      "Mandala 7 — Nasadiya Sukta (10.129): Philosophical hymn on creation",
      "Mandala 8 — Gayatri Mantra (3.62.10): The most sacred mantra of Hinduism",
      "Mandala 9 — Pavamana Suktas: Praise of Soma, the divine nectar",
    ],
    sectarianNotes:
      "Sacred to all Hindu traditions. The Rigveda Samhita is recited by Hotri priests during Vedic ceremonies. All four Vedas together form the Shruti — the most authoritative scriptures in Hinduism.",
    hasFullText: false,
    icon: "🕉️",
    category: "Vedas",
  },
  {
    id: "samaveda",
    title: "Samaveda",
    titleHindi: "सामवेद",
    titleOriginal: "Sāmaveda",
    faith: "Hindu",
    language: "Vedic Sanskrit",
    originalLanguage: "Vedic Sanskrit",
    author: "Vedic Rishis — Kauthuma, Jaiminiya and Ranayaniya traditions",
    period: "c. 1200–1000 BCE",
    significance:
      "The Samaveda is the 'Veda of Melodies' and is considered the origin of Indian classical music. Nearly all of its 1549 verses are drawn from the Rigveda but set to musical notations (svara) for chanting during soma yajnas. Bhagavad Gita 10.22 says: 'Among Vedas, I am the Samaveda.'",
    overview:
      "The Samaveda (sāman = melody/song, veda = knowledge) is the liturgical Veda, composed of hymns set to musical notes for ritual singing. The Udgātri priest sings these hymns during Soma sacrifices. It is the source of Indian classical music scales (svaras) and the concept of nāda brahman (sound as the divine).",
    structure:
      "2 main parts: Purvarchika (first chant book) and Uttararchika (later chant book). 1875 mantras in total, of which 1771 are from the Rigveda. 3 major recensions: Kauthuma, Jaiminiya, Ranayaniya.",
    keyTeachings: [
      "Nāda Brahman — The universe originated from divine sound (Om)",
      "Music as the highest form of worship — melody transcends speech",
      "Soma as divine elixir symbolizing the bliss of spiritual realization",
      "Udgātri's chanting as a bridge between human and cosmic consciousness",
      "Every sound (svara) has a sacred vibration that connects to the divine",
    ],
    notableChapters: [
      "Purvarchika — 585 verses for soma rituals organized by deity",
      "Uttararchika — 1225 verses for specific sacrificial ceremonies",
      "Gramageya Gana — Songs to be sung in the village (public ceremonies)",
      "Aranyagana — Songs to be sung in the forest (secret spiritual practices)",
      "Chandogya Upanishad — Attached to Samaveda, discusses music and Brahman",
    ],
    sectarianNotes:
      "The Udgātri priest tradition preserves Samaveda chanting. The Kauthuma recension is most widespread. The Chandogya Upanishad (one of the principal Upanishads) belongs to the Samaveda tradition.",
    hasFullText: false,
    icon: "🎵",
    category: "Vedas",
  },
  {
    id: "yajurveda",
    title: "Yajurveda",
    titleHindi: "यजुर्वेद",
    titleOriginal: "Yajurveda",
    faith: "Hindu",
    language: "Vedic Sanskrit",
    originalLanguage: "Vedic Sanskrit",
    author:
      "Vaishampayana (attributed) for Krishna Yajurveda; Yajnavalkya for Shukla Yajurveda",
    period: "c. 1100–800 BCE",
    significance:
      "The Yajurveda is the 'Veda of Sacrificial Formulas' and contains the prose mantras and procedures for Vedic yajnas. It contains the Mahamrityunjaya Mantra, the Sri Rudram and the Purusha Sukta in its complete ritual context. It is recited by the Adhvaryu priest who performs the physical actions of the yajnas.",
    overview:
      "The Yajurveda (yajus = sacrificial formula, veda = knowledge) is a collection of prose mantras used during Vedic fire sacrifices (yajnas). It exists in two main recensions: the Black (Krishna) Yajurveda with interspersed commentary, and the White (Shukla) Yajurveda with clear text. The Shukla Yajurveda's 40th chapter is the Ishopanishad.",
    structure:
      "2 main recensions: Krishna (Black) Yajurveda — Taittiriya Samhita (7 Kandas); Shukla (White) Yajurveda — Vajasaneyi Samhita (40 Adhyayas). Contains both verse and prose mantras.",
    keyTeachings: [
      "Isha Vasyam Idam Sarvam — All this is pervaded by the Lord (Ishopanishad 1.1)",
      "Mahamrityunjaya Mantra — Victory over death through devotion to Shiva",
      "Sri Rudram — The profound hymn to Lord Rudra/Shiva with Chamakam",
      "Purusha Sukta — Cosmic sacrifice as the origin of the universe",
      "The goal of yajna is the purification of mind and the welfare of all beings",
    ],
    notableChapters: [
      "Taittiriya Samhita 4.5 — Sri Rudram (Namakam and Chamakam)",
      "Vajasaneyi Samhita 40 — Ishopanishad (18 verses on Brahman)",
      "Taittiriya Samhita 7.5 — Mahamrityunjaya Mantra",
      "Shatarudriya — 100 names of Rudra, recited during Mahashivaratri",
      "Purusha Sukta (VS 31) — Foundation of Vedic cosmology",
    ],
    sectarianNotes:
      "The Krishna Yajurveda is prevalent in South India (Shaivite traditions). The Shukla Yajurveda (Madhyandina and Kanva recensions) is more common in North India. Taittiriya Upanishad and Brihadaranyaka Upanishad belong to this Veda.",
    hasFullText: false,
    icon: "🔥",
    category: "Vedas",
  },
  {
    id: "atharvaveda",
    title: "Atharvaveda",
    titleHindi: "अथर्ववेद",
    titleOriginal: "Atharvaveda",
    faith: "Hindu",
    language: "Vedic Sanskrit",
    originalLanguage: "Vedic Sanskrit",
    author: "Atharvan and Angiras Rishis",
    period: "c. 900–700 BCE",
    significance:
      "The Atharvaveda is the 'Veda of Everyday Life' containing hymns for health, prosperity, love, protection and philosophical inquiry. It is unique among the Vedas for including spells, charms, folk traditions and the origins of Ayurveda. The Mundaka and Mandukya Upanishads belong to this tradition.",
    overview:
      "The Atharvaveda (atharvan = ancient fire-priest, veda = knowledge) is the fourth and most diverse of the Vedas. Unlike the first three which focus on yajna, the Atharvaveda addresses the full spectrum of human life — from curing diseases and protecting crops to philosophical inquiries about Brahman. It preserves much of the indigenous folk religion that was integrated into Vedic Hinduism.",
    structure:
      "20 Kandas (books), 731 Suktas (hymns), 5987 Richas (verses). Kandas 1–7: charms for healing; Kandas 8–12: philosophical hymns; Kandas 13–18: longer poems on cosmic topics; Kandas 19–20: appendix with additional hymns.",
    keyTeachings: [
      "Brahmacharya — The importance of celibacy and disciplined student life (Kanda 11.5)",
      "Prithvi Sukta (Bhumisukta) — The Earth is our mother, we are her children (12.1)",
      "Ayurvedic healing through herbs, mantras and nature's medicines",
      "Kama (love) as a cosmic force — the Kama Sukta describes love as divine",
      "Skambha Sukta — The world-pillar (Brahman) that supports all existence",
    ],
    notableChapters: [
      "Kanda 11.5 — Brahmacharyasukta: Life of the ideal student",
      "Kanda 12.1 — Prithvi Sukta (Bhumi Sukta): 63 verses praising Mother Earth",
      "Kanda 19 — Nakshatra Sukta: Stars and astronomical knowledge",
      "Mundaka Upanishad — Two kinds of knowledge: para vidya and apara vidya",
      "Mandukya Upanishad — 12 verses on Om and the four states of consciousness",
    ],
    sectarianNotes:
      "The Atharvaveda was initially not counted among the three main Vedas (Trayi Vidya). Later accepted as the fourth Veda, it is associated with the Brahman priest (supervisor) at yajnas. The Mundaka and Mandukya Upanishads (two of the principal Upanishads) belong to this Veda.",
    hasFullText: false,
    icon: "🌿",
    category: "Vedas",
  },
  {
    id: "upanishads",
    title: "108 Upanishads",
    titleHindi: "उपनिषद् (108)",
    titleOriginal: "Upaniṣad",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author:
      "Various Rishis — Yajnavalkya, Uddalaka Aruni, Shankara (commentator), and others",
    period:
      "c. 800–200 BCE (principal Upanishads); later Upanishads up to 15th century CE",
    significance:
      "The Upanishads are the philosophical culmination of the Vedas (Vedanta). They explore the nature of Brahman (ultimate reality), Atman (individual soul), and their identity. The principal 12 Upanishads form the cornerstone of Hindu philosophy. Adi Shankaracharya's Advaita Vedanta is based entirely on Upanishadic teachings.",
    overview:
      "The Upanishads (upa = near, ni = down, shad = sit — sitting near the teacher) are philosophical dialogues composed at the end of the Vedic period. They move from ritual to philosophical inquiry, exploring questions like 'What is Brahman?', 'What is Atman?' and 'How does liberation occur?'. The 12 principal Upanishads (Mukhya Upanishads) are recognized by Adi Shankaracharya.",
    structure:
      "108 Upanishads in total. 12 Principal (Mukhya) Upanishads: Isha, Kena, Katha, Prashna, Mundaka, Mandukya, Taittiriya, Aitareya, Chandogya, Brihadaranyaka, Kaushitaki, Shvetashvatara. Each attached to a specific Veda.",
    keyTeachings: [
      "Aham Brahmasmi — I am Brahman (Brihadaranyaka Upanishad 1.4.10)",
      "Tat Tvam Asi — Thou art That (Chandogya Upanishad 6.8.7)",
      "Prajnanam Brahma — Consciousness is Brahman (Aitareya Upanishad 3.3)",
      "Ayam Atma Brahma — This Self is Brahman (Mandukya Upanishad 2)",
      "Sarvam Khalvidam Brahma — All this is verily Brahman (Chandogya 3.14.1)",
    ],
    notableChapters: [
      "Brihadaranyaka Upanishad — Yajnavalkya's dialogues; Brahman as the inner controller",
      "Chandogya Upanishad 6 — Uddalaka teaches Shvetaketu: Tat Tvam Asi",
      "Katha Upanishad — Nachiketa's dialogue with Yama (Death) about the Atman",
      "Mandukya Upanishad — 12 verses on Om and the 4 states (jagrat, swapna, sushupti, turiya)",
      "Isha Upanishad — 18 verses reconciling renunciation with active life in the world",
    ],
    sectarianNotes:
      "The Upanishads form the basis of Vedanta philosophy. Adi Shankaracharya (Advaita), Ramanujacharya (Vishishtadvaita) and Madhvacharya (Dvaita) each wrote influential commentaries. The Bhagavad Gita, Brahma Sutras and Upanishads together form the Prasthanatrayi — the three sources of Vedanta.",
    hasFullText: false,
    icon: "📿",
    category: "Vedanta",
  },
  {
    id: "bhagavad-gita",
    title: "Bhagavad Gita",
    titleHindi: "श्रीमद्भगवद्गीता",
    titleOriginal: "Śrīmad Bhagavadgītā",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author:
      "Maharishi Vyasa (within Mahabharata Book 6, Bhishma Parva chapters 23–40)",
    period: "c. 400 BCE–200 CE",
    significance:
      "The Bhagavad Gita is the most widely read Hindu scripture — a 700-verse dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra. It synthesizes karma yoga (path of action), jnana yoga (path of knowledge) and bhakti yoga (path of devotion) into a complete guide to living a meaningful life and attaining liberation.",
    overview:
      "The Bhagavad Gita (The Song of God) occurs in the Mahabharata when Arjuna, overcome by grief at the prospect of fighting his own kinsmen, throws down his bow. Lord Krishna then delivers his divine teachings over 18 chapters, covering duty, the nature of the soul, the cosmos, devotion, meditation and the supreme path of self-surrender (Moksha).",
    structure:
      "18 Adhyayas (chapters), 700 shlokas (verses). Chapters 1–6: Karma Yoga (yoga of action); Chapters 7–12: Bhakti Yoga (yoga of devotion); Chapters 13–18: Jnana Yoga (yoga of knowledge). Part of Mahabharata's Bhishma Parva.",
    keyTeachings: [
      "Nishkama Karma — Do your duty without attachment to results (2.47)",
      "The Atman is eternal, cannot be killed by weapons or fire (2.19–23)",
      "Sarva-dharma-parityaga — Surrender all dharmas to Me alone (18.66)",
      "The three paths to liberation: Karma Yoga, Jnana Yoga, Bhakti Yoga",
      "Vishwaroopa — Krishna's cosmic universal form (Chapter 11)",
    ],
    notableChapters: [
      "Chapter 2 — Sankhya Yoga: Krishna's first teachings on the immortal soul",
      "Chapter 11 — Vishwaroopa Darshan: Arjuna sees Krishna's cosmic universal form",
      "Chapter 12 — Bhakti Yoga: The most direct path to God through love and devotion",
      "Chapter 15 — Purushottama Yoga: The highest Purusha transcends both perishable and imperishable",
      "Chapter 18 — Moksha Sannyasa Yoga: Concluding teachings and the supreme secret",
    ],
    sectarianNotes:
      "The Bhagavad Gita is revered by all Hindu traditions. Adi Shankaracharya, Ramanujacharya, Madhvacharya, Tilak, Aurobindo and Gandhi have all written famous commentaries. It is part of the Prasthanatrayi (three canonical texts of Vedanta).",
    hasFullText: true,
    icon: "🌸",
    category: "Itihasas",
  },
  {
    id: "ramayana",
    title: "Valmiki Ramayana",
    titleHindi: "वाल्मीकि रामायण",
    titleOriginal: "Vālmīki Rāmāyaṇa",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author: "Maharishi Valmiki — the Adi Kavi (first poet)",
    period:
      "c. 700–400 BCE (composed); events dated traditionally to Treta Yuga",
    significance:
      "The Valmiki Ramayana is the Adi Kavya (first poem) of Sanskrit literature and the primary source of Ram Katha. Its 24,000 shlokas describe the life of Maryada Purushottama Shri Ram — the ideal son, husband, king and human being. It defines the ideals of dharma, duty and devotion that permeate Indian culture.",
    overview:
      "The Ramayana (Ram's journey) tells the story of Prince Rama of Ayodhya — his 14-year exile, the abduction of Sita by Ravana, the building of a bridge to Lanka, the great war and Rama's triumphant return to Ayodhya. The 24 syllables of the Gayatri Mantra are said to be embedded as the first letters of every 1000th verse of the original Ramayana.",
    structure:
      "7 Kandas (books): Bala Kanda, Ayodhya Kanda, Aranya Kanda, Kishkindha Kanda, Sundara Kanda, Yuddha Kanda (Lanka Kanda), Uttara Kanda. 24,000 shlokas (verses) in 500 sargas (chapters).",
    keyTeachings: [
      "Maryada Purushottama — Rama as the ideal person who upholds limits and duties",
      "Devotion to one's word — Rama's exile solely to honor his father's promise",
      "Hanuman Bhakti — Selfless devotion to God symbolized by Hanuman",
      "The ideal of Sati Sita — faithfulness, strength and spiritual purity",
      "Dharma must be upheld even at personal cost — Vibhishana's choice of truth over loyalty",
    ],
    notableChapters: [
      "Bala Kanda — Rama's birth, Vishwamitra's hermitage, Sita Swayamvar",
      "Sundara Kanda — Hanuman's journey to Lanka; most auspiciously recited kanda",
      "Yuddha Kanda — The great Lanka war; Ravana's defeat; Sita's Agni Pariksha",
      "Aranya Kanda — Shurpanakha episode; Maricha; Sita's abduction",
      "Uttara Kanda — Sita's exile; Rama's reign (Ram Rajya); final return to Vaikuntha",
    ],
    sectarianNotes:
      "The Valmiki Ramayana is the source text. Tulsidas composed the Ramcharitmanas (Awadhi, 16th century) — the most widely read version in North India. Kamba Ramayana (Tamil) and Ranganatha Ramayana (Telugu) are major regional versions. Revered equally by Vaishnavas and Shaktas.",
    hasFullText: false,
    icon: "🏹",
    category: "Itihasas",
  },
  {
    id: "mahabharata",
    title: "Mahabharata",
    titleHindi: "महाभारत",
    titleOriginal: "Mahābhārata",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author:
      "Maharishi Vyasa (Vedavyasa) — compiler; Ganesha as scribe (traditionally)",
    period:
      "c. 400 BCE–400 CE (written); events traditionally dated to Dwapara Yuga",
    significance:
      "The Mahabharata is the world's longest epic poem with over 100,000 shlokas. It says: 'What is here, is found elsewhere; what is not here, is nowhere.' It contains the Bhagavad Gita, Vishnu Sahasranama, Shiva Sahasranama and the full philosophy of dharma, artha, kama and moksha.",
    overview:
      "The Mahabharata chronicles the great war between the Pandavas and Kauravas for the kingdom of Hastinapura. Beyond the narrative, it contains philosophy, cosmology, mythology, statecraft, ethics and spiritual teachings. The Shanti Parva and Anushasan Parva alone contain thousands of shlokas on dharma and governance.",
    structure:
      "18 Parvas (books) + Harivamsha (appendix). 100,000+ shlokas in 18 books: Adi, Sabha, Vana, Virata, Udyoga, Bhishma, Drona, Karna, Shalya, Sauptika, Stri, Shanti, Anushasan, Ashvamedha, Ashramvasika, Mausala, Mahaprasthanika, Svargarohana Parva.",
    keyTeachings: [
      "Dharmo Rakshati Rakshitah — Dharma protects those who protect it",
      "Bhagavad Gita (Bhishma Parva) — Krishna's complete philosophy of life",
      "Vishnu Sahasranama (Anushasan Parva) — 1000 names of Vishnu by Bhishma",
      "Yudhishthira's Yaksha Prashna — wisdom is the greatest virtue",
      "Yato Dharmas Tato Jayah — Where there is dharma, there is victory",
    ],
    notableChapters: [
      "Bhishma Parva chapters 23–40 — Bhagavad Gita (18 chapters, 700 shlokas)",
      "Anushasan Parva 149 — Vishnu Sahasranama recited by Bhishma on his death-bed",
      "Shanti Parva — Bhishma's teachings on dharma, statecraft and liberation",
      "Vana Parva — Nala-Damayanti, Savitri-Satyavan; stories of devotion and faithfulness",
      "Udyoga Parva — Krishna's peace mission; Vidura Niti on ethics and governance",
    ],
    sectarianNotes:
      "Revered by all Hindu traditions. The Bhagavad Gita has special importance for Vaishnavas, Shaivites and Shaktas alike. The Mahabharata is considered the fifth Veda by some traditions. All 18 Mahapuranas draw their mythology from the Mahabharata framework.",
    hasFullText: false,
    icon: "⚔️",
    category: "Itihasas",
  },
  {
    id: "srimad-bhagavatam",
    title: "Srimad Bhagavatam",
    titleHindi: "श्रीमद्भागवत पुराण",
    titleOriginal: "Śrīmad Bhāgavata Purāṇa",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author: "Maharishi Vedavyasa (final compiler); Suta Goswami (narrator)",
    period: "c. 800–900 CE (final compilation); narratives much older",
    significance:
      "The Srimad Bhagavatam (Maha Purana) is the crown jewel of all Puranas — the 'ripened fruit of the Vedic tree'. Its 12 Skandhas, 18,000 verses describe the divine glory of Vishnu/Narayana with supreme emphasis on bhakti (devotion). The 10th Skandha with Krishna's childhood (Govinda, Gopala, Vrindavan leelas) is the most beloved section.",
    overview:
      "The Bhagavata Purana was narrated by Shuka Maharishi to King Parikshit during the seven days before his death. It opens with the verse 'Satyam Param Dhimahi' (We meditate on the Supreme Truth) and covers the creation of the universe, the 24 avatars of Vishnu, the stories of great devotees (Prahlad, Dhruva, Ambarisha) and culminates in the life of Krishna.",
    structure:
      "12 Skandhas (books), 335 chapters (adhyayas), 18,000 shlokas. Skandha 10 (Krishna's life) is the longest and most revered — 90 chapters. Skandha 11 contains Uddhava Gita (Krishna's final teachings).",
    keyTeachings: [
      "Bhakti as the supreme path — Sa vai pumsam paro dharmo yato bhaktir adhoksaje",
      "Nine forms of bhakti: shravanam, kirtanam, smaranam, pada-sevanam, and others",
      "Krishna's Vrindavan leelas — divine play as the highest expression of love",
      "Stories of Prahlada, Dhruva, Ambarisha demonstrating pure devotion",
      "Uddhava Gita (11th Skandha) — Krishna's final teachings before departure to Vaikuntha",
    ],
    notableChapters: [
      "Skandha 1 — Suta Goswami begins the Bhagavata; Parikshit's question",
      "Skandha 2 — The Bhagavata Purana structure; Brahma's 10 topics",
      "Skandha 10 — Krishna's complete life from birth in Mathura prison to Vrindavan to Dwaraka",
      "Skandha 11 — Uddhava Gita: Krishna's final teachings to Uddhava before Maha-samadhi",
      "Skandha 12 — Kali Yuga description and the final liberation of Parikshit",
    ],
    sectarianNotes:
      "Most sacred to Vaishnavas, particularly Gaudiya Vaishnavas (ISKCON). Considered the 'Paramahansa Samhita' — suitable for those who have transcended material existence. The Srimad Bhagavatam is read continuously (Bhagavata Saptaha) over 7 days as a sacred ritual.",
    hasFullText: false,
    icon: "🦚",
    category: "Mahapuranas",
  },
  {
    id: "vishnu-purana",
    title: "Vishnu Purana",
    titleHindi: "विष्णु पुराण",
    titleOriginal: "Viṣṇu Purāṇa",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author: "Maharishi Parashara (as narrator to Maitreya)",
    period: "c. 400–900 CE",
    significance:
      "The Vishnu Purana is one of the oldest and most important Mahapuranas, dedicated to the glory of Lord Vishnu. It covers cosmology, genealogies of kings, stories of Prahlada and Dhruva, the Vaivasvata Manu era, and the life of Krishna. It is the primary Vaishnava Mahapurana.",
    overview:
      "Narrated by Parashara to his disciple Maitreya, the Vishnu Purana covers the five classical topics of a Mahapurana: sarga (creation), pratisarga (re-creation), vamsha (genealogies), manvantara (cosmic cycles), and vamsanucharita (histories of dynasties). It contains the famous story of Prahlada and Narasimha.",
    structure:
      "6 Amshas (parts), 126 chapters, approximately 23,000 shlokas. Part 1: Cosmology and creation; Part 2: Geography and cosmic structure; Part 3: Vedic tradition and time; Part 4: Dynasties; Part 5: Krishna's life; Part 6: Liberation.",
    keyTeachings: [
      "Vishnu as Brahman, Atman and the ultimate cause of creation",
      "Pancharatra tradition — devotion to Vishnu through image worship",
      "Prahlada's unwavering devotion despite persecution by his own father",
      "The four Purushartha: Dharma, Artha, Kama, Moksha",
      "Vishnu's ten principal avatars (Dashavatara)",
    ],
    notableChapters: [
      "Book 1, Chapter 17–20 — Prahlada's devotion and Narasimha avatar",
      "Book 2 — Cosmology, the seven lokas, sacred rivers and mountains",
      "Book 4 — Dynasties of Solar and Lunar races; Ikshvaku lineage (Rama's ancestors)",
      "Book 5 — Krishna's complete biography from Mathura to Dwaraka",
      "Book 6 — Kali Yuga, dissolution of the universe, path to liberation",
    ],
    sectarianNotes:
      "The Vishnu Purana is the foundational text for Sri Vaishnavism (Ramanuja's tradition) and Pancharatra Agamas. It is one of six Sattvika Puranas (those glorifying Vishnu). Shankaracharya cited it extensively in his Vedanta commentaries.",
    hasFullText: false,
    icon: "🌀",
    category: "Mahapuranas",
  },
  {
    id: "shiva-purana",
    title: "Shiva Purana",
    titleHindi: "शिव पुराण",
    titleOriginal: "Śiva Purāṇa",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author: "Romaharshana (narrator); Vedavyasa (compiler)",
    period: "c. 800–1100 CE",
    significance:
      "The Shiva Purana is the primary Shaiva Mahapurana, containing 24,000 shlokas in 7 Samhitas. It narrates Shiva's cosmic form, his marriage to Parvati, the story of Daksha Yajna, Kartikeya's birth, and the significance of the 12 Jyotirlingas. It is the supreme authority for Shaiva traditions.",
    overview:
      "The Shiva Purana glorifies Lord Shiva (Mahadeva) as the supreme Brahman and describes his divine exploits, his role as the creator-destroyer, his abode on Mount Kailasha, his divine family (Parvati, Ganesh, Kartikeya) and the sacred Shivling worship. The Shiva Sahasranama is one of many gems in this Purana.",
    structure:
      "7 Samhitas: Vidyeshvara, Rudra, Shatarudra, Kotirudra, Uma, Kailasa, Vayaviya. 24,000 shlokas total. Rudra Samhita (Part 2) is the longest and most important, containing Shiva-Parvati's marriage.",
    keyTeachings: [
      "Shiva as the supreme Nirguna Brahman — transcending all qualities",
      "Shivalinga worship — the cosmic pillar of fire with no beginning or end",
      "Panchabhuta — Shiva as lord of the five elements (earth, water, fire, air, space)",
      "Tripura Samhara — Shiva destroys the three demon cities of ego, desire and ignorance",
      "Maha Shivaratri — the night when Shiva's grace is most accessible",
    ],
    notableChapters: [
      "Vidyeshvara Samhita — Shivalinga's cosmic significance; Om and Shiva",
      "Rudra Samhita 2 (Sati Khanda) — Sati's self-immolation at Daksha Yajna",
      "Rudra Samhita 3 (Parvati Khanda) — Parvati's tapasya and marriage to Shiva",
      "Rudra Samhita 4 (Kumara Khanda) — Birth of Kartikeya; defeat of Tarakasura",
      "Kotirudra Samhita — The 12 Jyotirlingas and their sacred significance",
    ],
    sectarianNotes:
      "Sacred to all Shaiva traditions — Kashmir Shaivism, Shaiva Siddhanta, Veerashaivism (Lingayats), Nath tradition. The Shiva Purana's Pancha Puja vidhi (five-fold worship) is standard in Shiva temples across India.",
    hasFullText: false,
    icon: "🔱",
    category: "Mahapuranas",
  },
  {
    id: "devi-bhagavata",
    title: "Devi Bhagavata Purana",
    titleHindi: "देवी भागवत पुराण",
    titleOriginal: "Devī Bhāgavata Purāṇa",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author: "Maharishi Vedavyasa",
    period: "c. 600–1200 CE",
    significance:
      "The Devi Bhagavata Purana is the supreme scripture of the Shakta tradition, glorifying Devi (the Divine Mother) as the ultimate Supreme Being. Its 12 skandhas and 18,000 verses describe the Goddess in her many forms — Durga, Lakshmi, Saraswati, Kali and the primordial Adi Shakti. The Devi Gita (Skandha 7) is its philosophical crown.",
    overview:
      "The Devi Bhagavata narrates the divine exploits of the Goddess, her victory over demons (Mahishasura, Shumbha-Nishumbha, Durgama), the Devi Gita on Brahman as feminine consciousness, and the geography of Shakti Peethas. It establishes the philosophical foundation for Sri Vidya tradition and Tantra.",
    structure:
      "12 Skandhas (books), 318 chapters, 18,000 shlokas. Skandha 7 contains the Devi Gita (32 chapters). Skandha 10 describes 108 Shakti Peethas and Navadurga worship.",
    keyTeachings: [
      "Devi as Para Brahman — the ultimate reality manifesting as the universe",
      "Devi Gita — The Goddess teaches Himalaya about Brahman, consciousness and liberation",
      "Navadurga — the nine forms of Durga worshipped during Navaratri",
      "Shakti Peethas — 108 sacred sites where body parts of Sati fell",
      "Sri Vidya — the sacred geometry (Sri Chakra) of the Goddess",
    ],
    notableChapters: [
      "Skandha 5 — Devi's victory over Mahishasura (parallel to Devi Mahatmya)",
      "Skandha 7 — Devi Gita: The Goddess teaches Himalaya about her cosmic nature",
      "Skandha 10 — The 108 Shakti Peethas; Navadurga worship",
      "Skandha 11 — Dhanvantari, Ayurveda, and the churning of the cosmic ocean",
      "Skandha 12 — The cosmic dissolution and Devi's final promise of protection",
    ],
    sectarianNotes:
      "The primary Purana for Shakta (Devi worshipping) traditions. Some traditions consider the Devi Bhagavata equal in authority to the Srimad Bhagavatam. Sri Vidya practitioners, Kalikula traditions, and the 10 Mahavidya traditions are all rooted in this Purana.",
    hasFullText: false,
    icon: "🌺",
    category: "Mahapuranas",
  },
  {
    id: "garuda-purana",
    title: "Garuda Purana",
    titleHindi: "गरुड़ पुराण",
    titleOriginal: "Garuḍa Purāṇa",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author: "Vedavyasa (compiler); narrated by Vishnu to Garuda",
    period: "c. 800–1000 CE",
    significance:
      "The Garuda Purana contains Lord Vishnu's teachings to his divine eagle mount Garuda about the afterlife, karma, dharma and liberation. It is traditionally recited during death rites and the 13-day mourning period. Its descriptions of the 14 lokas (planes of existence) and 84 lakh yonis are fundamental to Hindu eschatology.",
    overview:
      "The Garuda Purana is unique among Puranas for its comprehensive treatment of the post-death journey of the soul. It describes the journey of the Jiva after death, the 84 lakh species of birth (yoni), the path of Dharmaraj, the 28 narakas (hells) for specific sins, and the ultimate liberation through Vishnu's grace. It also contains Ayurveda, gemology and statecraft.",
    structure:
      "2 sections: Purvakhanda (chapters 1–234) and Uttarakhanda/Pretakhanda (after death section). 279 chapters total, 18,000 shlokas. The Preta Khanda (16 chapters) deals specifically with death rituals.",
    keyTeachings: [
      "Karma and its consequences — every action creates a corresponding future experience",
      "The 84 lakh yonis — 8.4 million life forms the soul passes through before reaching human birth",
      "The Panchabhuta return — the five elements return to their sources at death",
      "Moksha through Vishnu bhakti transcends the cycle of birth and death",
      "Ashta Yoga — the eightfold path to liberation (parallel to Patanjali's system)",
    ],
    notableChapters: [
      "Chapters 1–4 — Vishnu teaches Garuda about the cosmos and Brahman",
      "Chapters 10–16 — The Preta Khanda: journey of the soul after death",
      "Chapter 115 — Dhanvantari's teachings on Ayurveda",
      "Chapters 109–134 — Dharmashastra: duties of different stages of life",
      "Chapter 235 — The Brahma Gita: Vishnu teaches liberation to Brahma",
    ],
    sectarianNotes:
      "The Garuda Purana is recited during Antyesti (last rites) across all Hindu traditions. It is one of the 18 Mahapuranas and considered a Vaishnava Purana (Sattvika category). The Uttara Khanda (Preta Khanda) is the section most commonly recited during death ceremonies.",
    hasFullText: false,
    icon: "🦅",
    category: "Mahapuranas",
  },
  {
    id: "markandeya-purana",
    title: "Markandeya Purana",
    titleHindi: "मार्कण्डेय पुराण",
    titleOriginal: "Mārkaṇḍeya Purāṇa",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author: "Narrated by Markandeya Rishi to Jaimini",
    period: "c. 250–900 CE (one of the oldest Puranas)",
    significance:
      "The Markandeya Purana contains the Devi Mahatmya (Durga Saptashati) — 700 shlokas in praise of Goddess Durga that form the most important scripture of Shakta traditions. The Devi Mahatmya narrates three victories of the Devi over Madhu-Kaitabha, Mahishasura and Shumbha-Nishumbha.",
    overview:
      "One of the oldest Puranas, the Markandeya Purana is narrated by the immortal sage Markandeya who outlives seven cosmic dissolutions. Chapters 81–93 contain the Devi Mahatmya — the most widely recited Shakta text, read during Navaratri and Durga Puja worldwide. It also contains cosmological narratives and the story of Harishchandra.",
    structure:
      "137 chapters, approximately 9,000 shlokas. The Devi Mahatmya occupies chapters 81–93 (13 chapters, 700 verses) and is also called Chandi or Saptashati (700 verses).",
    keyTeachings: [
      "Devi Mahatmya — The Supreme Goddess is the power behind all creation",
      "Mahishasura Mardini — Durga slays the buffalo-demon, symbolizing ego's defeat",
      "Ya Devi Sarva Bhuteshu — The Goddess dwells in all beings in various forms",
      "Stotra to the Devi — Praises the Goddess as Shakti, Buddhi, Nidra, Hunger, Shadow",
      "Harishchandra's story — ultimate truth and righteousness even at extreme cost",
    ],
    notableChapters: [
      "Chapters 81–93 — Devi Mahatmya (Durga Saptashati / Chandi Path): 700 verses",
      "Chapter 81 — First episode: Devi kills Madhu-Kaitabha",
      "Chapter 84 — Second episode: Mahishasura Mardini",
      "Chapters 88–93 — Third episode: Victory over Shumbha-Nishumbha",
      "Chapter 7 — The story of immortal sage Markandeya",
    ],
    sectarianNotes:
      "The Devi Mahatmya is recited daily by Shakta devotees and during all major Devi festivals. It is translated into virtually all Indian languages. The Markandeya Purana is classified as a Rajasa (Brahma) Purana.",
    hasFullText: false,
    icon: "⚡",
    category: "Mahapuranas",
  },
  {
    id: "skanda-purana",
    title: "Skanda Purana",
    titleHindi: "स्कंद पुराण",
    titleOriginal: "Skanda Purāṇa",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author: "Vedavyasa (compiler); narrated by Skanda/Kartikeya",
    period: "c. 600–1200 CE",
    significance:
      "The Skanda Purana is the largest of all 18 Mahapuranas with 81,000+ shlokas. Named after Kartikeya (Skanda), it covers an enormous range of topics — sacred geography, pilgrimage sites (tirthas), temple histories, Shiva legends, Devi stories and the significance of every major sacred site in India.",
    overview:
      "The Skanda Purana is encyclopedic in scope — it is essentially a guide to the sacred geography of India. It contains the Kashi Khanda (about Varanasi), the Avantya Khanda (about Ujjain/Mahakaal), the Reva Khanda (about Narmada river), the Vaishnava Khanda, and many more regional texts. Many famous stotras like the Kashi Vishwanath Stotram are from this Purana.",
    structure:
      "7 Khandas (sections): Maheshvara, Vaishnava, Brahma, Kashi, Avantya, Nagar, Prabhasa. 81,000+ shlokas in 6 to 7 major recensions. The Kashi Khanda alone has 100 chapters.",
    keyTeachings: [
      "Tirtha Mahima — The sacred power of pilgrimage sites to purify the soul",
      "Kashi (Varanasi) as the city of liberation — Shiva whispers the Taraka mantra at death",
      "Kartikeya as the commander of divine forces against demonic tendencies",
      "Sacred rivers as goddesses — Ganga, Narmada, Godavari, Kaveri",
      "Temple worship (agama tradition) as the path to divine communion",
    ],
    notableChapters: [
      "Kashi Khanda — 100 chapters on the glory of Varanasi; Kashi Vishwanath",
      "Avantya Khanda — Mahakaal at Ujjain; Simhastha Kumbha",
      "Reva Khanda — Narmada river's divine glory; Narmada Parikrama",
      "Kumara Khanda — Kartikeya's birth and victory over Tarakasura",
      "Vaishnava Khanda — Vishnu's sacred sites; Badrinath, Dwaraka, Mathura",
    ],
    sectarianNotes:
      "A Shaiva Purana, though it contains extensive Vaishnava and Shakta material. The Skanda Purana is the primary source for most temple traditions in India. Temple priests often cite the Skanda Purana's Sthala Puranas (local sacred histories) for their specific temple traditions.",
    hasFullText: false,
    icon: "🌟",
    category: "Mahapuranas",
  },
  {
    id: "agni-purana",
    title: "Agni Purana",
    titleHindi: "अग्नि पुराण",
    titleOriginal: "Agni Purāṇa",
    faith: "Hindu",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author: "Narrated by Agni (Fire God) to sage Vasishtha",
    period: "c. 800–1100 CE",
    significance:
      "The Agni Purana is unique among Mahapuranas for its encyclopedic coverage of topics beyond mythology — it is a manual covering temple construction, image iconography, Ayurveda, grammar, poetics, military science, and statecraft. It is called the 'Encyclopaedia of Ancient India.'",
    overview:
      "The Agni Purana covers virtually every aspect of ancient Indian knowledge: cosmology, ten avatars of Vishnu, Rama and Krishna stories, Tantric worship, temple construction norms (Vastu Shastra), Ayurvedic medicine, metrics (Chhandas), grammar (Vyakarana), astronomy and judicial procedures. Its 383 chapters make it one of the most comprehensive ancient encyclopedias.",
    structure:
      "383 adhyayas (chapters), approximately 15,000 shlokas. Covers Vaishnava, Shaiva and Shakta material. Unusually encyclopedic — contains sections on Ayurveda, poetics, grammar, astronomy and warfare.",
    keyTeachings: [
      "Dashavatara — The 10 avatars of Vishnu with detailed narratives",
      "Temple construction guidelines — rules for building and consecrating temples",
      "Ayurveda principles — medical knowledge attributed to Dhanvantari",
      "Diksha (initiation) — the importance of proper spiritual initiation",
      "Moksha through the combined path of jnana, bhakti and karma",
    ],
    notableChapters: [
      "Chapters 1–12 — Creation of the universe; Vishnu's avatars",
      "Chapters 25–85 — Rama story; Krishna story",
      "Chapters 91–99 — Tantric worship; mantra science",
      "Chapters 104–150 — Diksha (initiation); Agamic worship; temple rituals",
      "Chapters 270–290 — Ayurveda; medical treatments",
    ],
    sectarianNotes:
      "The Agni Purana is classified as a Vaishnava Purana but contains extensive Shaiva and Shakta material. It is particularly important for temple priests (Agamika tradition), Ayurvedic scholars and Sanskrit grammarians. It is one of the 18 Mahapuranas.",
    hasFullText: false,
    icon: "🔯",
    category: "Mahapuranas",
  },

  // ── JAIN SCRIPTURES ───────────────────────────────────────────
  {
    id: "twelve-angas",
    title: "12 Angas (Jain Canon)",
    titleHindi: "द्वादश अंग (जैन आगम)",
    titleOriginal: "Dvādaśa Aṅga",
    faith: "Jain",
    language: "Ardhamagadhi Prakrit",
    originalLanguage: "Ardhamagadhi Prakrit",
    author:
      "Ganadharas (principal disciples of Mahavira) — Gautama Swami, Sudharma Swami and others",
    period:
      "c. 599–527 BCE (Mahavira's time); compiled over subsequent centuries",
    significance:
      "The 12 Angas are the primary canonical texts of Jainism, believed to contain the direct teachings of Bhagavan Mahavira as recorded by his Ganadharas. They cover conduct, philosophy, cosmology, biography of great souls and Jain ethics. The 12th Anga (Drstivada) is considered lost.",
    overview:
      "The Jain Agamas are the canonical scriptures of Jainism. The Digambara tradition holds that all original Agamas are lost; the Shvetambara tradition preserves 45 canonical texts. The 12 Angas include Acharanga (monks' conduct), Sutrakrtanga (philosophical debates), Bhagavati (cosmic knowledge), Jnata Dharma Kathangas (exemplary stories) and others.",
    structure:
      "12 Angas: 1. Acharanga, 2. Sutrakrtanga, 3. Sthananga, 4. Samavayanga, 5. Bhagavati (Vyakhyaprajnapti), 6. Jnatadharma Kathangas, 7. Upasakadasha, 8. Antakrddasha, 9. Anuttaropapatikadasah, 10. Prashnavyakarana, 11. Vipaka Sutra, 12. Drstivada (considered lost by both sects).",
    keyTeachings: [
      "Ahimsa Paramo Dharma — Non-violence is the supreme religion",
      "Anekantavada — Many-sidedness of truth; no single perspective is complete",
      "Panca Mahavrata — Five great vows: non-violence, truth, non-stealing, celibacy, non-possession",
      "Karma theory — Every action (physical, mental, verbal) creates karmic particles",
      "Moksha through the triple jewels: right faith, right knowledge, right conduct",
    ],
    notableChapters: [
      "Acharanga Sutra 1 — Mahavira's 12-year sadhana and path to enlightenment",
      "Sutrakratanga Sutra 1 — Debates with non-Jain philosophers; the path of knowledge",
      "Bhagavati Sutra — 41 chapters; 36,000 questions answered by Mahavira",
      "Jnatadharma Katha — Stories of the ideal householder (Sravaka dharma)",
      "Upasakadasha — Ten stories of ideal lay followers of Mahavira",
    ],
    sectarianNotes:
      "The Shvetambara tradition preserves the Angas as canonical. The Digambara tradition does not accept them as authentic, holding that the original teachings are lost. Both traditions accept the Tattvartha Sutra as authoritative.",
    hasFullText: false,
    icon: "☸️",
    category: "Jain Agamas",
  },
  {
    id: "acharang-sutra",
    title: "Acharang Sutra",
    titleHindi: "आचारांग सूत्र",
    titleOriginal: "Āyāraṃga Sutta",
    faith: "Jain",
    language: "Ardhamagadhi Prakrit",
    originalLanguage: "Ardhamagadhi Prakrit",
    author: "Ganadharas of Mahavira; Sudharma Swami's lineage",
    period: "c. 400–300 BCE (among the oldest Jain texts)",
    significance:
      "The Acharanga Sutra is the first and oldest of the 12 Angas. It contains the rules of conduct for Jain monks and nuns, and most importantly preserves the description of Mahavira's 12 years of intense penance (sadhana). The second Shruta Skandha describes Mahavira's tapasya in direct and vivid language.",
    overview:
      "The Acharanga (conduct code) has two Shruta Skandhas (scriptural divisions). The first codifies the five great vows, the rules of non-possession, renunciation of food, movement, speech and other monastic disciplines. The second Shruta Skandha (thought to be older) contains biographical episodes of Mahavira's penance — enduring all hardships without complaint.",
    structure:
      "2 Shruta Skandhas (books): Shruta Skandha 1 (9 adhyayas on conduct rules) and Shruta Skandha 2 (16 adhyayas on Mahavira's biography and sadhana). Total: approximately 2,400 sutras.",
    keyTeachings: [
      "Ahimsa — Non-violence extended to all living beings including one-sensed organisms (plants, microbes)",
      "Aparigraha — Complete non-possession; monks must have nothing (Digambara) or minimal possessions (Shvetambara)",
      "Mahavira's sadhana — 12 years of intense tapas without flinching under extreme conditions",
      "Kashaya (passions) — Anger, pride, deceit and greed as the roots of all sin",
      "The ideal monk gives up not just gross possessions but also subtle desires and ego",
    ],
    notableChapters: [
      "Shruta Skandha 1, Adhyaya 1 — The doctrine of Ahimsa: harm to any being is harm to oneself",
      "Shruta Skandha 1, Adhyaya 4 — Complete renunciation: the monk's non-attachment",
      "Shruta Skandha 2 — Mahavira's 12-year tapasya described in vivid detail",
      "Shruta Skandha 2, Adhyaya 15 — Mahavira's attainment of Kevala Jnana",
      "The Bhagavati Aradhana — later text based on Acharanga's conduct rules",
    ],
    sectarianNotes:
      "Accepted by Shvetambara tradition as canonical. The Digambara tradition does not accept the extant Acharanga as authentic. The text is one of the oldest examples of Ardhamagadhi Prakrit literature. Scholars consider its second Shruta Skandha to be an older independent biographical text.",
    hasFullText: false,
    icon: "🌿",
    category: "Jain Agamas",
  },
  {
    id: "sutrakratang-sutra",
    title: "Sutrakratang Sutra",
    titleHindi: "सूत्रकृतांग सूत्र",
    titleOriginal: "Sūyagaḍaṃga Sutta",
    faith: "Jain",
    language: "Ardhamagadhi Prakrit",
    originalLanguage: "Ardhamagadhi Prakrit",
    author: "Ganadharas of Mahavira",
    period: "c. 400–300 BCE",
    significance:
      "The Sutrakratang Sutra (Second Anga) is a philosophical text that critiques non-Jain schools of thought and establishes Jain metaphysics through reasoned debate. It demonstrates Mahavira's teaching by contrasting the Jain path with the teachings of other contemporary schools, emphasizing non-violence and the nature of the soul.",
    overview:
      "The Sutrakratang presents Mahavira's teachings in the form of philosophical arguments, refuting rival schools (Ajivika, Sankhya, Buddhist and other Shramana traditions). It establishes the Jain path of the three jewels and elaborates on the doctrine of karma, the nature of the Jiva (soul) and the harm caused by wrong beliefs and conduct.",
    structure:
      "2 Shruta Skandhas: Shruta Skandha 1 (16 adhyayas) refutes wrong beliefs; Shruta Skandha 2 (7 adhyayas) presents positive Jain philosophy. Contains philosophical dialogues, stories and poetic passages.",
    keyTeachings: [
      "Rebuttal of Niyativada (determinism) — free will and self-effort lead to liberation",
      "Jain critique of Vedic sacrifice — violence in sacrifice creates karma",
      "The Jiva (soul) is capable of liberation through its own pure nature",
      "Nishchay Naya (absolute standpoint) vs. Vyavahar Naya (conventional standpoint)",
      "Mithyadristi (wrong belief) as the root cause of continued bondage",
    ],
    notableChapters: [
      "Shruta Skandha 1.1 — Critique of Ajivikas and fatalism",
      "Shruta Skandha 1.2 — Refutation of eternalism (Vedanta) and nihilism (Buddhist Sunyavada)",
      "Shruta Skandha 1.11 — The 363 philosophical systems and their errors",
      "Shruta Skandha 2.1 — The true nature of the soul (Jiva Tattva)",
      "Shruta Skandha 2.7 — Mahavira's instruction to monks on the path to liberation",
    ],
    sectarianNotes:
      "Shvetambara canonical text. The Sutrakratang is particularly important for understanding Jain philosophical history and the context of Mahavira's teachings in relation to contemporary Indian philosophies.",
    hasFullText: false,
    icon: "💡",
    category: "Jain Agamas",
  },
  {
    id: "tattvartha-sutra",
    title: "Tattvartha Sutra",
    titleHindi: "तत्त्वार्थ सूत्र",
    titleOriginal: "Tattvārtha Sūtra",
    faith: "Jain",
    language: "Sanskrit",
    originalLanguage: "Sanskrit",
    author: "Acharya Umaswati (Umasvami in Digambara tradition)",
    period: "c. 2nd–5th century CE",
    significance:
      "The Tattvartha Sutra is the most authoritative and universally accepted text of Jainism — uniquely accepted by both Digambara and Shvetambara traditions. Also called Mokshashastra, its 357 sutras in 10 chapters provide a complete, systematic summary of all Jain philosophy from the nature of reality to the path of liberation.",
    overview:
      "Umaswati composed the Tattvartha Sutra as a concise, logically structured summary of Jain philosophy in Sanskrit (unlike earlier Prakrit Agamas). It covers ontology (seven tattvas), cosmology, karma theory, ethics and the path to Moksha. Both Digambara and Shvetambara traditions have written major commentaries on it, making it unique in Jain literature.",
    structure:
      "10 Adhyayas (chapters), 357 Sutras (aphorisms). Chapter 1: Right knowledge; Chapters 2–3: Soul tattva; Chapter 4: Heavenly beings; Chapter 5: Non-souls (matter, space, time, motion, rest); Chapters 6–7: Karma theory; Chapters 8–10: Liberation.",
    keyTeachings: [
      "Samyag Darshana, Samyag Jnana, Samyag Charitra — The three jewels are the path to liberation",
      "Seven Tattvas: Jiva, Ajiva, Asrava, Bandha, Samvara, Nirjara, Moksha",
      "Karma as physical particles — karma actually sticks to the soul through activity and passions",
      "Loka (universe) structure — Jain cosmology: 14 Rajlok, Narak, Tirch, Manushya, Dev lokas",
      "Moksha is the natural state of the soul — pure knowledge, bliss and perfect liberation",
    ],
    notableChapters: [
      "Chapter 1 — Samyag Darshana: definition and five types of right knowledge",
      "Chapter 2–3 — The Jiva (soul): its 14 characteristics; the Gunasthanas (stages of spiritual progress)",
      "Chapter 5 — Ajiva (non-soul): Pudgala (matter), Dharma, Adharma, Akasha, Kala",
      "Chapter 6 — Asrava (karma influx): activities that attract karma",
      "Chapter 10 — Moksha: the liberated soul's characteristics; Siddha loka",
    ],
    sectarianNotes:
      "The only Jain text accepted as canonical by both Digambara and Shvetambara traditions. Acharya Pujyapada's Sarvarthasiddhi (Digambara) and Siddhasenagani's Tattvarthadhigama Bhasya (Shvetambara) are the principal commentaries. It is the most important single Jain text for philosophical study.",
    hasFullText: false,
    icon: "⚖️",
    category: "Jain Philosophy",
  },
  {
    id: "kalpa-sutra",
    title: "Kalpa Sutra",
    titleHindi: "कल्प सूत्र",
    titleOriginal: "Kappa Sutta",
    faith: "Jain",
    language: "Ardhamagadhi Prakrit",
    originalLanguage: "Ardhamagadhi Prakrit",
    author: "Acharya Bhadrabahu (c. 367–298 BCE)",
    period: "c. 3rd–4th century BCE",
    significance:
      "The Kalpa Sutra is one of the most important and beloved Jain texts, read aloud during the holy festival of Paryushana (Shvetambara) and Dashalakshana (Digambara). It contains the biographies of the 24 Tirthankaras (especially Mahavira and Parshvanath), the histories of the Jain monk lineages, and rules for Paryushana observance.",
    overview:
      "The Kalpa Sutra was composed by Acharya Bhadrabahu and is celebrated in beautiful illustrated manuscripts (Kalpa Sutra manuscripts from Gujarat are UNESCO World Heritage items). The Jinacharitra section describes Mahavira's five auspicious moments (Pancha Kalyanaka) — conception, birth, initiation, enlightenment and liberation. During Paryushana, it is read publicly to all.",
    structure:
      "3 main sections: Jinacharitra (biographies of Tirthankaras — especially Mahavira, Parshvanath, Nemi and Rishabh), Sthaviravali (lineage of Jain elders), Samachari (rules for Paryushana conduct). Approximately 1100 verses/sutras.",
    keyTeachings: [
      "Mahavira's five Kalyanaka moments — the five auspicious events of a Tirthankara's life",
      "Parshvanath's 24 Danda (penances) before enlightenment",
      "The Jain monk lineage from Sudharma Swami to Bhadrabahu",
      "Paryushana Parva observance — the 8-day sacred festival of repentance",
      "The significance of Kshamavani (seeking and granting forgiveness)",
    ],
    notableChapters: [
      "Jinacharitra — Complete biography of Mahavira: conception, birth, tapas, Kevala Jnana, Nirvana",
      "Parshvanath biography — previous birth stories; 12-year sadhana; enlightenment",
      "Rishabhdeva biography — first Tirthankara's cosmic life and liberation",
      "Sthaviravali — lineage of Jain teachers from Mahavira's Ganadharas to Bhadrabahu",
      "Samachari — Rules for the Paryushana festival observance",
    ],
    sectarianNotes:
      "A Shvetambara canonical text (one of the Chedasutras). The Digambara tradition has its own biographies of Tirthankaras (Adipurana by Jinasena). Illuminated Kalpa Sutra manuscripts (12th–16th century CE) from Gujarat are among the most beautiful examples of Indian manuscript art.",
    hasFullText: true,
    icon: "📜",
    category: "Jain Agamas",
  },
  {
    id: "fourteen-purvas",
    title: "14 Purvas",
    titleHindi: "चतुर्दश पूर्व",
    titleOriginal: "Caturdaśa Pūrva",
    faith: "Jain",
    language: "Ardhamagadhi Prakrit",
    originalLanguage: "Ardhamagadhi Prakrit",
    author:
      "Ganadharas of Mahavira — direct transmission from Mahavira himself",
    period: "c. 600–500 BCE (Mahavira's time); considered lost by both sects",
    significance:
      "The 14 Purvas are the most ancient and sacred Jain texts — pre-canonical texts believed to contain Mahavira's complete original teachings on all subjects. Both Digambara and Shvetambara traditions agree that the Purvas are now essentially lost. Fragments are believed to be preserved within the 12th Anga (Drstivada) which is itself considered lost.",
    overview:
      "The 14 Purvas represent the oldest stratum of Jain knowledge, containing teachings on science, magic, medicine, cosmology, liberation and all fields of knowledge. According to tradition, even the 12 Angas were derived from summaries of the 14 Purvas. Their loss is considered one of the great tragedies in Indian religious history.",
    structure:
      "14 Purvas: Utpada Purva, Agraya Purva, Virya Purva, Asthi Purva, Jnana Purva, Satya Purva, Atma Purva, Karma Purva, Pratyakhyana Purva, Vidya Purva, Avandya Purva, Prana Purva, Kriya Vishal Purva, Loka Bindusara Purva. Believed to contain 50 crore verses.",
    keyTeachings: [
      "Complete knowledge of all 14 subjects including cosmology, science and liberation",
      "The original Agamic teachings as heard directly from Mahavira",
      "Karmagrantha (detailed karma science) — preserved as later Karma Sahitya texts",
      "The purity of the soul in its original state before karma bondage",
      "Teaching that all knowledge is contained within the pure soul itself",
    ],
    notableChapters: [
      "Karma Purva — Detailed treatise on karma theory (elements preserved in Karma Granth literature)",
      "Loka Bindusara — Cosmological descriptions of the Jain universe",
      "Kriya Vishal — Extensive account of spiritual practices and conduct",
      "Utpada Purva — Origin and nature of all substances",
      "Pratyakhyana Purva — Science of renunciation and vows",
    ],
    sectarianNotes:
      "Both Digambara and Shvetambara agree the 14 Purvas are lost. The Digambara tradition holds that the loss of the Purvas began with the great famine during Chandragupta Maurya's time (when Acharya Bhadrabahu migrated to South India with his followers). Later Karma Sahitya literature attempts to reconstruct elements of the Karma Purva.",
    hasFullText: false,
    icon: "📚",
    category: "Jain Agamas",
  },

  // ── SIKH SCRIPTURES ───────────────────────────────────────────
  {
    id: "guru-granth-sahib",
    title: "Sri Guru Granth Sahib Ji",
    titleHindi: "श्री गुरु ग्रंथ साहिब जी",
    titleOriginal: "ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ",
    faith: "Sikh",
    language:
      "Gurmukhi script; multi-lingual (Punjabi, Braj Bhasha, Sanskrit, Persian, Arabic, Marathi)",
    originalLanguage: "Gurmukhi",
    author:
      "Compiled by Guru Arjan Dev Ji (5th Guru, 1563–1606 CE); finalized as eternal Guru by Guru Gobind Singh Ji (10th Guru, 1666–1708 CE)",
    period:
      "1604 CE (first compilation, Adi Granth at Harmandir Sahib); 1708 CE (elevated as eternal Guru)",
    significance:
      "Sri Guru Granth Sahib Ji is the supreme, eternal and living Guru of the Sikh faith. Containing 5894 Shabads (hymns) composed by 6 Sikh Gurus, 15 Bhagats (saints including Kabir, Ravidas, Namdev, Farid, Trilochan, Dhanna) and 11 Bhatts, it is the only scripture in the world that was installed as the living Guru by its compiler. It is written in Gurmukhi script and covers themes of Ik Onkar, Naam, Sewa and Simran.",
    overview:
      "The Sri Guru Granth Sahib Ji (SGGS) is organized by musical ragas — each hymn specifies the raga (musical mode) in which it should be sung. Beginning with the Mul Mantar and Japji Sahib by Guru Nanak Dev Ji, it contains compositions in 31 ragas. The text represents a universal vision of God — Ik Onkar (One Creator) — transcending all religious, caste and gender distinctions.",
    structure:
      "1430 Angs (pages). 31 Ragas organizing the hymns. 5894 Shabads total. Key compositions: Japji Sahib (Guru Nanak), Rehras Sahib, Kirtan Sohila, Sukhmani Sahib (Guru Arjan Dev), Anand Sahib (Guru Amar Das). Contributions from 6 Gurus: Nanak, Angad, Amar Das, Ram Das, Arjan Dev, Tegh Bahadur.",
    keyTeachings: [
      "Ik Onkar — There is One Creator; all creation is Its expression (Mul Mantar)",
      "Naam Simran — Constant remembrance of God's Name as the path to liberation",
      "Sewa (selfless service) — Serving others is serving God",
      "Sangat and Pangat — Spiritual community and langar (community kitchen) as practice",
      "Waheguru — The wondrous Lord, source of all wonder and liberation",
    ],
    notableChapters: [
      "Japji Sahib (Ang 1–8) — Guru Nanak's morning prayer; the philosophical foundation of Sikhism",
      "Sukhmani Sahib (Ang 262–296) — Guru Arjan Dev's 24-canto prayer for peace of mind",
      "Anand Sahib (Ang 917–922) — Guru Amar Das's hymn of bliss; recited at Amrit Sanchar",
      "Rehras Sahib (Ang 8–12) — Evening prayer by Guru Nanak, Guru Ram Das and Guru Arjan Dev",
      "Kirtan Sohila (Ang 12–13) — Bedtime prayer; recited at Antyeshti (funeral rites)",
    ],
    sectarianNotes:
      "SGGS is the universal and eternal Guru of all Sikhs, installed by Guru Gobind Singh Ji at Nanded in 1708. It is treated with the same reverence as a living Guru — placed on a throne (Takht), covered with Rumala Sahib, fanned with Chauri Sahib, and read in continuous Akhand Path (48-hour unbroken recitation). No human Guru can succeed it.",
    hasFullText: true,
    icon: "☬",
    category: "Sikh Granths",
  },
  {
    id: "dasam-granth",
    title: "Dasam Granth Sahib",
    titleHindi: "दसम ग्रंथ साहिब",
    titleOriginal: "ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ",
    faith: "Sikh",
    language: "Braj Bhasha, Punjabi, Sanskrit, Persian, Hindi",
    originalLanguage: "Gurmukhi script (multiple languages)",
    author:
      "Primarily Guru Gobind Singh Ji (10th Guru, 1666–1708 CE); some compositions by court poets",
    period:
      "Late 17th–early 18th century CE; compiled by Bhai Mani Singh Ji after Guru's departure",
    significance:
      "The Dasam Granth (Book of the Tenth Master) contains the spiritual and warrior poetry of Guru Gobind Singh Ji. Four of its compositions — Jaap Sahib, Tav-Prasad Savaiye, Benti Chaupai and Anand Sahib — are part of the Nitnem (daily Sikh prayers). The Baisakhi (creation of the Khalsa) spirit pervades this Granth.",
    overview:
      "The Dasam Granth contains a diverse range of compositions: philosophical texts praising the Akal Purakh (Timeless Lord), retelling of Puranic stories from a Sikh perspective (Chandi Charitar, stories of Vishnu's avatars), the autobiographical Bichitra Natak, and devotional hymns. It represents the warrior-saint (Sant-Sipahi) ideal embodied by Guru Gobind Singh Ji.",
    structure:
      "1428 Angs (pages). Major compositions: Jaap Sahib, Tav-Prasad Savaiye, Benti Chaupai, Anand Sahib, Swayas, Akal Ustat (Praise of the Timeless), Bichitra Natak (autobiography), Chandi Charitar (Durga's battles), Shastra Naam Mala (names of weapons), Charitropakhyan (tales of wisdom and deception), Zafarnama (Epistle of Victory to Aurangzeb).",
    keyTeachings: [
      "Waheguru as Akal Purakh — the Timeless, Formless, All-pervading Creator",
      "Sant-Sipahi ideal — the saint-soldier who combines spiritual wisdom with martial valor",
      "Zafarnama — Guru's letter to Aurangzeb asserting truth and justice over tyranny",
      "Shakti worship — Chandi (divine power) as a metaphor for the liberating force of the Divine",
      "All weapons and human power belong to and are sanctioned by Waheguru",
    ],
    notableChapters: [
      "Jaap Sahib — 199 names of God in multiple languages; morning Nitnem prayer",
      "Tav-Prasad Savaiye — 10 powerful verses accepting only God's grace, rejecting all hypocrisy",
      "Benti Chaupai — Prayer for protection; part of Rehras Sahib evening prayer",
      "Bichitra Natak — Guru Gobind Singh's spiritual autobiography",
      "Zafarnama (Persian) — Guru's bold letter to Emperor Aurangzeb after Battle of Chamkaur",
    ],
    sectarianNotes:
      "The Dasam Granth's authorship and status has been a subject of scholarly and theological debate within Sikhism. The four Nitnem compositions (Jaap Sahib, Savaiye, Chaupai, Anand Sahib) are universally accepted. The Akal Takht (highest Sikh religious seat) has issued proclamations about its status. The Nihang Singh tradition holds it in especially high regard.",
    hasFullText: false,
    icon: "⚔️",
    category: "Sikh Granths",
  },
];

export const faithStats = {
  Hindu: holyBooks.filter((b) => b.faith === "Hindu").length,
  Jain: holyBooks.filter((b) => b.faith === "Jain").length,
  Sikh: holyBooks.filter((b) => b.faith === "Sikh").length,
  total: holyBooks.length,
  withFullText: holyBooks.filter((b) => b.hasFullText).length,
};

export const faithColors: Record<Faith, string> = {
  Hindu: "bg-orange-100 text-orange-800 border-orange-200",
  Jain: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Sikh: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export const faithBg: Record<Faith, string> = {
  Hindu: "from-orange-50 to-amber-50 border-orange-100",
  Jain: "from-emerald-50 to-teal-50 border-emerald-100",
  Sikh: "from-yellow-50 to-amber-50 border-yellow-100",
};

// ── ALIAS EXPORTS (canonical names for new pages) ─────────────────────────────
// holyBooks is the primary data array; HOLY_BOOKS_OVERVIEW is an alias for convenience
export const HOLY_BOOKS_OVERVIEW = holyBooks;

// ── TEMPLE DIRECTORY ──────────────────────────────────────────────────────────
// Canonical Temple type matching page requirements
export interface Temple {
  id: string;
  name: string;
  location: string;
  state: string;
  city: string;
  faith: "Hindu" | "Jain" | "Sikh";
  deity: string;
  history: string;
  visitingHours: string;
  bestTime: string;
  tags: string[];
}

export const TEMPLE_DIRECTORY: Temple[] = [
  // ── HINDU TEMPLES ─────────────────────────────────────────────────────────
  {
    id: "vaishno-devi",
    name: "Vaishno Devi Temple",
    location: "Katra, Jammu & Kashmir",
    state: "Jammu & Kashmir",
    city: "Katra",
    faith: "Hindu",
    deity: "Maa Vaishno Devi",
    history:
      "Perched at 5,200 feet in the Trikuta Mountains, Vaishno Devi is one of the most sacred Shakti shrines in India visited by over 8 million pilgrims annually. The cave temple houses the natural rock formation of Tridevi — Mahalakshmi, Mahasaraswati and Mahakali as pindis (natural rock formations).",
    visitingHours: "Open 24 hours",
    bestTime: "March–April & October–November",
    tags: [
      "Shakti Peetha",
      "Cave Temple",
      "Pilgrimage",
      "Tridevi",
      "Himalayan",
    ],
  },
  {
    id: "tirupati",
    name: "Tirupati Balaji Temple",
    location: "Tirupati, Andhra Pradesh",
    state: "Andhra Pradesh",
    city: "Tirupati",
    faith: "Hindu",
    deity: "Lord Venkateswara",
    history:
      "Situated atop Tirumala Hill at 853 metres, this Divya Desam Vaishnava temple is the world's most visited and wealthiest religious institution. Lord Venkateswara (Balaji) is worshipped here as the fulfiller of all desires. The temple's laddoo prasadam has received a GI tag.",
    visitingHours: "2:30 AM – 1:30 AM (next day)",
    bestTime: "September–February",
    tags: [
      "Divya Desam",
      "Vaishnava",
      "Pilgrimage",
      "Wealthy Temple",
      "South India",
    ],
  },
  {
    id: "shirdi",
    name: "Shirdi Sai Baba Temple",
    location: "Shirdi, Maharashtra",
    state: "Maharashtra",
    city: "Shirdi",
    faith: "Hindu",
    deity: "Sai Baba of Shirdi",
    history:
      "Sai Baba of Shirdi lived here from around 1858 until his mahasamadhi in 1918. Revered by Hindus and Muslims alike, his teachings of Sabka Malik Ek transcend religious boundaries. The Samadhi Mandir is the focal point of this vast pilgrimage complex receiving 25,000–100,000 visitors daily.",
    visitingHours: "4:00 AM – 11:00 PM",
    bestTime: "October–March",
    tags: ["Interfaith", "Miracle", "Sai Baba", "Maharashtra", "Devotion"],
  },
  {
    id: "golden-temple",
    name: "Golden Temple (Harmandir Sahib)",
    location: "Amritsar, Punjab",
    state: "Punjab",
    city: "Amritsar",
    faith: "Sikh",
    deity: "Sri Guru Granth Sahib Ji",
    history:
      "Founded by Guru Ram Das Ji and completed by Guru Arjan Dev Ji in 1604, the Harmandir Sahib is sheathed in 750 kg of pure gold. The Amrit Sarovar (nectar pool) surrounds it. The world's largest free community kitchen (langar) serves 100,000+ people daily without distinction of religion, caste or status.",
    visitingHours: "Open 24 hours",
    bestTime: "October–March",
    tags: ["Akal Takht", "Langar", "Sikh Tirth", "Gold Temple", "Amritsar"],
  },
  {
    id: "somnath",
    name: "Somnath Temple",
    location: "Prabhas Patan, Gujarat",
    state: "Gujarat",
    city: "Prabhas Patan",
    faith: "Hindu",
    deity: "Lord Shiva (Somnath Jyotirlinga)",
    history:
      "The first of the 12 Jyotirlingas, Somnath has been destroyed and rebuilt 17 times — a testament to Hindu resilience. The current temple was rebuilt in 1951 under Sardar Vallabhbhai Patel. It stands at the Triveni Sangam where the Kapila, Hiran and Saraswati rivers meet the Arabian Sea.",
    visitingHours: "6:00 AM – 9:30 PM",
    bestTime: "October–February",
    tags: ["Jyotirlinga", "Char Dham", "Gujarat", "Resilience", "Arabian Sea"],
  },
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath Temple",
    location: "Varanasi, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Varanasi",
    faith: "Hindu",
    deity: "Lord Shiva (Vishweshwara Jyotirlinga)",
    history:
      "One of the 12 Jyotirlingas and the most sacred Shiva temple on the Ganges in the eternal city of Varanasi. The current temple was built by Rani Ahilyabai Holkar in 1780. The Kashi Vishwanath Corridor was inaugurated in 2022, dramatically enhancing the pilgrimage experience. It is said that Lord Shiva whispers the Taraka mantra to souls departing in Kashi.",
    visitingHours: "4:00 AM – 11:00 PM",
    bestTime: "October–March",
    tags: ["Jyotirlinga", "Varanasi", "Moksha", "Ganga", "Shiva"],
  },
  {
    id: "ram-mandir-ayodhya",
    name: "Ram Mandir Ayodhya",
    location: "Ayodhya, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Ayodhya",
    faith: "Hindu",
    deity: "Lord Ram (Ram Lalla)",
    history:
      "Consecrated on January 22, 2024, the Shri Ram Janmabhoomi Mandir is built at the precise birthplace of Maryada Purushottam Lord Ram. The grand Nagara-style temple spreads across 70 acres. Ram Lalla's idol in the Garbhagriha faces east, blessing all of Ayodhya — the eternal sacred city on the Sarayu river.",
    visitingHours: "7:00 AM – 11:00 PM",
    bestTime: "October–March (avoid peak summer)",
    tags: [
      "Ram Birthplace",
      "Ayodhya",
      "New Temple",
      "Saptapuri",
      "Pilgrimage",
    ],
  },
  {
    id: "jagannath-puri",
    name: "Jagannath Temple Puri",
    location: "Puri, Odisha",
    state: "Odisha",
    city: "Puri",
    faith: "Hindu",
    deity: "Lord Jagannath (Vishnu)",
    history:
      "One of the Char Dham sites and India's oldest Vaishnava temples (12th century, reconstructed), the Puri Jagannath Temple is famous for its annual Rath Yatra where three massive chariots carry Jagannath, Balabhadra and Subhadra through the streets. The Mahaprasad (temple food) is considered the most sacred in the world.",
    visitingHours: "5:00 AM – 9:00 PM",
    bestTime: "October–February",
    tags: ["Char Dham", "Rath Yatra", "Odisha", "Mahaprasad", "Vaishnava"],
  },
  {
    id: "meenakshi",
    name: "Meenakshi Amman Temple",
    location: "Madurai, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Madurai",
    faith: "Hindu",
    deity: "Goddess Meenakshi (Parvati) & Lord Sundareshwar",
    history:
      "The 2,500-year-old temple complex in Madurai is one of India's architectural wonders with 14 gopurams (gateway towers), the tallest standing 52 metres. The 33,000 sculptures covering its towers and mandapams are a UNESCO tentative list site. The Meenakshi Thirukalyanam (divine wedding) festival draws lakhs of pilgrims.",
    visitingHours: "5:00 AM – 9:30 PM",
    bestTime: "January–March",
    tags: [
      "Dravidian Architecture",
      "Shakti",
      "Gopuram",
      "Madurai",
      "Tamil Nadu",
    ],
  },
  {
    id: "siddhivinayak",
    name: "Siddhivinayak Temple",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    city: "Mumbai",
    faith: "Hindu",
    deity: "Lord Ganesha (Siddhivinayak)",
    history:
      "Built in 1801 by Laxman Vithu and Deubai Patil, Siddhivinayak is the most revered Ganesha temple in Mumbai. The unique left-trunk Ganesha idol is believed to be swayambhu (self-manifested). The temple receives massive crowds on Tuesdays (Ganesh's day) and during Ganesh Chaturthi.",
    visitingHours: "5:30 AM – 10:00 PM",
    bestTime: "Year-round (avoid Tuesday crowds)",
    tags: ["Ganesha", "Mumbai", "Wish Fulfilment", "Obstacles", "Maharashtra"],
  },
  {
    id: "dilwara",
    name: "Dilwara Jain Temples",
    location: "Mount Abu, Rajasthan",
    state: "Rajasthan",
    city: "Mount Abu",
    faith: "Jain",
    deity: "Rishabhanatha & Neminatha",
    history:
      "Built between the 11th and 13th centuries by Vimal Shah and Tejpal, these five marble temples are among the finest examples of Indian temple architecture in the world. Every inch of white marble is intricately carved — the Vimal Vasahi (1031 CE) and Luna Vasahi (1230 CE) are masterpieces. Non-Jain visitors are allowed for a fee.",
    visitingHours: "12:00 PM – 6:00 PM",
    bestTime: "November–March",
    tags: [
      "Marble Temple",
      "Jain Art",
      "Heritage",
      "Rajasthan",
      "Architecture",
    ],
  },
  {
    id: "ranakpur",
    name: "Ranakpur Jain Temple",
    location: "Ranakpur, Rajasthan",
    state: "Rajasthan",
    city: "Ranakpur",
    faith: "Jain",
    deity: "Adinath (Rishabhanatha)",
    history:
      "Built in the 15th century by Dhanna Shah, the Ranakpur Adinath temple is one of the five sacred dhams of Jainism. Its 1,444 uniquely designed marble pillars — no two alike — support 29 halls and 80 domes. The four-faced Adinath idol stands in the centre. The temple complex sits in a serene forest valley.",
    visitingHours: "12:00 PM – 5:00 PM",
    bestTime: "October–March",
    tags: [
      "Panch Tirth",
      "Marble Pillars",
      "Jain Dham",
      "Forest Temple",
      "15th Century",
    ],
  },
  {
    id: "palitana",
    name: "Palitana Jain Temples",
    location: "Palitana, Gujarat",
    state: "Gujarat",
    city: "Palitana",
    faith: "Jain",
    deity: "Adinath (First Tirthankar)",
    history:
      "Atop Shatrunjaya Hill (612m) in Gujarat, Palitana is home to 900+ Jain temples built over 900 years by Jain pilgrims, making it the world's only city dedicated entirely to temples. The climb involves 3,950 steps. The hill is considered so sacred that no one is permitted to spend the night — all must descend by sunset.",
    visitingHours: "First light to Sunset (descent by 6:00 PM)",
    bestTime: "November–February",
    tags: [
      "Panch Tirth",
      "900+ Temples",
      "Shatrunjaya",
      "Gujarat",
      "Pilgrimage",
    ],
  },
  {
    id: "brihadeeswarar",
    name: "Brihadeeswarar Temple",
    location: "Thanjavur, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Thanjavur",
    faith: "Hindu",
    deity: "Lord Shiva (Brihadeesvara)",
    history:
      "Built by Emperor Raja Raja Chola I in 1010 CE, the Brihadeesvara temple (Big Temple) is a UNESCO World Heritage Site and masterpiece of Chola architecture. Its 216-foot vimana (tower) casts no shadow at noon. The massive Nandi statue (6m × 2.5m) is carved from a single rock. The 63 Nayanmars (Shaiva saints) are depicted in murals.",
    visitingHours: "6:00 AM – 8:30 PM",
    bestTime: "October–March",
    tags: [
      "UNESCO",
      "Chola Architecture",
      "Tamil Nadu",
      "Big Temple",
      "Jyotirlinga",
    ],
  },
  {
    id: "badrinath",
    name: "Badrinath Temple",
    location: "Chamoli, Uttarakhand",
    state: "Uttarakhand",
    city: "Chamoli",
    faith: "Hindu",
    deity: "Lord Vishnu (Badrinarayan)",
    history:
      "One of the Char Dham sites and Chota Char Dham, Badrinath is situated at 3,133 metres between Nar and Narayan mountain peaks in Uttarakhand. The temple is believed to have been established by Adi Shankaracharya in the 8th century. The hot spring (Tapt Kund) near the temple maintains a constant temperature of 55°C.",
    visitingHours: "Late April to November (seasonal)",
    bestTime: "May–June",
    tags: [
      "Char Dham",
      "Vishnu",
      "Uttarakhand",
      "Himalayan",
      "Chota Char Dham",
    ],
  },
  {
    id: "kedarnath",
    name: "Kedarnath Temple",
    location: "Rudraprayag, Uttarakhand",
    state: "Uttarakhand",
    city: "Rudraprayag",
    faith: "Hindu",
    deity: "Lord Shiva (Kedarnath Jyotirlinga)",
    history:
      "One of the 12 Jyotirlingas and part of Char Dham, Kedarnath stands at 3,583 metres. The existing temple structure dates to the 8th century (restored by Adi Shankaracharya). The temple remarkably survived the 2013 Uttarakhand flood disaster while surrounded by debris. The hump of the sacred bull (Nandi) is worshipped here as the Jyotirlinga.",
    visitingHours: "May to November only",
    bestTime: "May–June, September–October",
    tags: ["Jyotirlinga", "Char Dham", "Himalayan", "Shiva", "High Altitude"],
  },
  {
    id: "gangotri",
    name: "Gangotri Temple",
    location: "Uttarkashi, Uttarakhand",
    state: "Uttarakhand",
    city: "Uttarkashi",
    faith: "Hindu",
    deity: "Goddess Ganga",
    history:
      "One of the Char Dham sites, Gangotri is the origin of the sacred Ganga river at 3,048 metres. The temple was built by Amar Singh Thapa in the 18th century. The actual source (Gaumukh glacier) is 18 km upward. The water from the Bhagirathi river (Ganga's original name) at Gangotri is considered most sacred.",
    visitingHours: "May to November only",
    bestTime: "May–June",
    tags: [
      "Char Dham",
      "Ganga Origin",
      "Chota Char Dham",
      "Glacier",
      "Uttarakhand",
    ],
  },
  {
    id: "yamunotri",
    name: "Yamunotri Temple",
    location: "Uttarkashi, Uttarakhand",
    state: "Uttarakhand",
    city: "Uttarkashi",
    faith: "Hindu",
    deity: "Goddess Yamuna",
    history:
      "The westernmost Char Dham site, Yamunotri is the source of the sacred Yamuna river at 3,293 metres. The original temple was built by Narendra Shah of Tehri Garhwal in the 19th century. The main idol is of silver. The natural hot water springs (Surya Kund) adjacent to the temple allow pilgrims to cook rice and potatoes as prasad.",
    visitingHours: "May to November only",
    bestTime: "May–June",
    tags: [
      "Char Dham",
      "Yamuna Origin",
      "Chota Char Dham",
      "Hot Springs",
      "Uttarakhand",
    ],
  },
  {
    id: "dwarka",
    name: "Dwarkadhish Temple",
    location: "Dwarka, Gujarat",
    state: "Gujarat",
    city: "Dwarka",
    faith: "Hindu",
    deity: "Lord Krishna (Dwarkadhish)",
    history:
      "One of the Char Dham sites and Saptapuri (seven sacred cities), Dwarka is the legendary kingdom of Lord Krishna. The main temple (Jagat Mandir) dates to the 5th century. Its 78.3-metre spire (dwaja stambha) is visible from miles away. The city is a 7,000-year-old UNESCO candidate city submerged in the Gulf of Khambhat.",
    visitingHours: "6:30 AM – 9:30 PM",
    bestTime: "October–March",
    tags: ["Char Dham", "Saptapuri", "Krishna", "Gujarat", "Ancient City"],
  },
  {
    id: "rameshwaram",
    name: "Ramanathaswamy Temple",
    location: "Rameswaram, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Rameswaram",
    faith: "Hindu",
    deity: "Lord Shiva (Ramanathaswamy Jyotirlinga)",
    history:
      "One of the Char Dham sites and 12 Jyotirlingas, Rameshwaram is linked to Lord Ram's Lanka campaign. The temple has India's longest corridor (197 metres). The 22 theerthams (holy wells) within the temple compound have water of different tastes. Pilgrims traditionally bathe in Agnitheertham sea before entering the temple.",
    visitingHours: "5:00 AM – 9:00 PM",
    bestTime: "October–April",
    tags: ["Char Dham", "Jyotirlinga", "Ram", "Tamil Nadu", "Long Corridor"],
  },
  {
    id: "mathura",
    name: "Krishna Janmabhoomi Temple",
    location: "Mathura, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Mathura",
    faith: "Hindu",
    deity: "Lord Krishna",
    history:
      "The birthplace of Lord Krishna in the sacred Saptapuri city of Mathura, Uttar Pradesh. The prison cell where Krishna was born is enshrined within the complex. Janmashtami celebrations here draw hundreds of thousands and are among India's grandest religious festivals. The city has over 1,000 temples.",
    visitingHours: "5:00 AM – 9:30 PM",
    bestTime: "October–March (Janmashtami is grandest)",
    tags: ["Saptapuri", "Krishna Birthplace", "Janmashtami", "Braj", "UP"],
  },
  {
    id: "vrindavan",
    name: "Banke Bihari Temple",
    location: "Vrindavan, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Vrindavan",
    faith: "Hindu",
    deity: "Lord Krishna (Banke Bihari)",
    history:
      "Established in 1864 by Goswami Vishwanath, Banke Bihari is the most beloved temple in Vrindavan. The black idol is of Tribhanga posture (three-bends) — Krishna as the eternal youth. The curtain (parda) is periodically drawn to prevent devotees from falling into trance at the intense darshan. Holi celebrations here are legendary.",
    visitingHours: "7:45 AM – 12:00 PM, 5:30 PM – 9:30 PM",
    bestTime: "October–March (Holi is extraordinary)",
    tags: ["Vrindavan", "Braj", "Krishna Bhakti", "Holi", "Pushti Marg"],
  },
  {
    id: "iskcon-vrindavan",
    name: "ISKCON Vrindavan",
    location: "Vrindavan, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Vrindavan",
    faith: "Hindu",
    deity: "Radha Shyamsundar",
    history:
      "Established by ISKCON founder Srila Prabhupada, this grand temple complex features Radha Shyamsundar, Gaura Nitai and Krishna Balaram deities. Built in 1975 in Chandragupta Maurya era architecture, it is the spiritual headquarters for thousands of devotees worldwide. The temple offers prasadam and Bhagavad Gita study.",
    visitingHours: "4:30 AM – 9:00 PM",
    bestTime: "October–March",
    tags: [
      "ISKCON",
      "Gaudiya Vaishnava",
      "Prabhupada",
      "Vrindavan",
      "International",
    ],
  },
  {
    id: "akshardham-delhi",
    name: "Swaminarayan Akshardham Delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    faith: "Hindu",
    deity: "Swaminarayan (Bhagwan Swaminarayan)",
    history:
      "Inaugurated in 2005, Akshardham is the world's largest Hindu temple complex (Guinness record). Built in 11 years by 11,000 artisans using traditional methods — no steel, no concrete, only pink sandstone and white marble. The central monument features 234 carved pillars, 9 domes and 20,000 carved figures.",
    visitingHours: "10:00 AM – 6:30 PM (closed Monday)",
    bestTime: "October–March",
    tags: [
      "UNESCO Candidate",
      "Swaminarayan",
      "Modern Wonder",
      "Delhi",
      "Architecture",
    ],
  },
  {
    id: "pushkar-brahma",
    name: "Brahma Temple Pushkar",
    location: "Pushkar, Rajasthan",
    state: "Rajasthan",
    city: "Pushkar",
    faith: "Hindu",
    deity: "Lord Brahma",
    history:
      "One of the very few temples dedicated to Brahma (the Creator), Pushkar is sacred across all Hindu traditions. The legend says that a lotus petal dropped from Brahma's hand created the Pushkar Lake. The 14th-century temple has a distinctive red spire. The Pushkar Fair (Kartik month) is one of the world's largest camel fairs.",
    visitingHours: "6:30 AM – 8:30 PM",
    bestTime: "October–March (Pushkar Fair: Nov)",
    tags: ["Brahma Temple", "Rare", "Pushkar Lake", "Camel Fair", "Rajasthan"],
  },
  {
    id: "hemkund-sahib",
    name: "Hemkund Sahib",
    location: "Chamoli, Uttarakhand",
    state: "Uttarakhand",
    city: "Chamoli",
    faith: "Sikh",
    deity: "Waheguru",
    history:
      "At 4,329 metres, Hemkund Sahib is one of the highest Gurdwaras in the world, beside a glacial lake surrounded by seven snow-capped peaks. Guru Gobind Singh Ji meditated here in a previous life as Dusht Daman according to the Dasam Granth. The Valley of Flowers National Park (UNESCO) lies nearby.",
    visitingHours: "June to October only",
    bestTime: "July–August",
    tags: [
      "Sikh Tirth",
      "Himalayan",
      "Glacier Lake",
      "High Altitude",
      "Guru Gobind Singh",
    ],
  },
  {
    id: "patna-sahib",
    name: "Takht Sri Patna Sahib",
    location: "Patna, Bihar",
    state: "Bihar",
    city: "Patna",
    faith: "Sikh",
    deity: "Waheguru",
    history:
      "Takht Sri Harmandir Ji Patna Sahib is one of the five Takhts (thrones) of Sikhism — marking the birthplace of Guru Gobind Singh Ji (1666 CE). The white marble Gurdwara houses sacred relics including Guru Gobind Singh Ji's birth room, his iron quoit (chakkar) and his palkhi (palanquin). Prakash Parv draws millions.",
    visitingHours: "Open 24 hours",
    bestTime: "October–March (Prakash Parv: December)",
    tags: [
      "Takht",
      "Guru Gobind Singh Birthplace",
      "Bihar",
      "Sacred Relics",
      "Sikh",
    ],
  },
  {
    id: "anandpur-sahib",
    name: "Anandpur Sahib",
    location: "Ropar, Punjab",
    state: "Punjab",
    city: "Anandpur Sahib",
    faith: "Sikh",
    deity: "Waheguru",
    history:
      "The holy city of Anandpur Sahib (City of Bliss) was founded by Guru Tegh Bahadur Ji in 1665 CE. The Khalsa was created here on Baisakhi 1699 CE by Guru Gobind Singh Ji. The Takht Sri Kesgarh Sahib is the central Gurdwara, housing the Panj Pyare's weapons. Hola Mohalla festival draws hundreds of thousands.",
    visitingHours: "Open 24 hours",
    bestTime: "October–March (Hola Mohalla: March)",
    tags: [
      "Takht Kesgarh",
      "Khalsa Birthplace",
      "Guru Gobind Singh",
      "Hola Mohalla",
      "Punjab",
    ],
  },
  {
    id: "mukambika",
    name: "Mookambika Temple",
    location: "Kollur, Karnataka",
    state: "Karnataka",
    city: "Kollur",
    faith: "Hindu",
    deity: "Goddess Mookambika (Saraswati/Parvati)",
    history:
      "Situated in the Western Ghats at Kollur, the Mookambika temple is one of the most powerful Shakti shrines in South India. Adi Shankaracharya is said to have meditated here and received divine revelation. The jyotirlingam here is unique — it is both Shiva and Shakti combined in one deity.",
    visitingHours: "5:30 AM – 9:30 PM",
    bestTime: "October–February",
    tags: [
      "Shakti",
      "Shankaracharya",
      "Karnataka",
      "Western Ghats",
      "Saraswati",
    ],
  },
  {
    id: "udupi-krishna",
    name: "Udupi Sri Krishna Temple",
    location: "Udupi, Karnataka",
    state: "Karnataka",
    city: "Udupi",
    faith: "Hindu",
    deity: "Lord Krishna (Kanakana Kindi)",
    history:
      "Established by Madhvacharya in the 13th century, Udupi Sri Krishna Matha is the headquarters of the Dvaita Vedanta tradition. The unique custom of viewing Krishna through a window of nine-holes (navagraha) was started by the saint-poet Kanakadasa. The temple has eight mathas managing puja on a rotational basis.",
    visitingHours: "6:00 AM – 8:45 PM",
    bestTime: "Year-round",
    tags: [
      "Madhvacharya",
      "Dvaita Vedanta",
      "Karnataka",
      "Kanakadasa",
      "Krishna",
    ],
  },
  {
    id: "sabarimala",
    name: "Sabarimala Temple",
    location: "Pathanamthitta, Kerala",
    state: "Kerala",
    city: "Pathanamthitta",
    faith: "Hindu",
    deity: "Lord Ayyappa (Manikandan)",
    history:
      "One of the world's largest annual pilgrimages (50–100 million), Sabarimala is accessible after a 5 km forest trek and climbing 18 sacred steps. Devotees observe 41-day vrat (Mandala Deeksha) and wear black before visiting. Only celibate males and post-menopausal women were traditionally allowed (a rule that has since been legally challenged).",
    visitingHours: "Mandala season and Makar Vilakku only",
    bestTime: "November–January (Mandala season)",
    tags: [
      "Ayyappa",
      "Forest Trek",
      "Kerala",
      "Celibacy Vow",
      "Largest Pilgrimage",
    ],
  },
  {
    id: "guruvayur",
    name: "Guruvayur Temple",
    location: "Thrissur, Kerala",
    state: "Kerala",
    city: "Thrissur",
    faith: "Hindu",
    deity: "Lord Krishna (Guruvayurappan)",
    history:
      "Called Dwarka of the South, Guruvayur temple is the most sacred Vaishnava temple in Kerala. The idol of Guruvayurappan is worshipped as a four-armed Vishnu holding the discus, conch, lotus and mace. The temple's sacred elephants (now at Punnathur Kotta) are a unique feature. Non-Hindus are not permitted inside.",
    visitingHours: "3:00 AM – 9:15 PM",
    bestTime: "November–February",
    tags: [
      "Vaishnava",
      "Kerala",
      "Divya Desam",
      "Sacred Elephants",
      "Krishnanattam",
    ],
  },
  {
    id: "chidambaram",
    name: "Thillai Nataraja Temple",
    location: "Chidambaram, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Chidambaram",
    faith: "Hindu",
    deity: "Lord Shiva (Nataraja)",
    history:
      "One of the Pancha Bhuta Stalas (Akasha — space), Thillai Nataraja temple is believed to be the cosmic centre of the universe. The golden-roofed Chit Sabha houses the famous Nataraja dance posture. The Chidambara Rahasyam (Divine Secret) is an akasha (empty space) behind a curtain, representing the formless Brahman.",
    visitingHours: "6:00 AM – 12:00 PM, 5:00 PM – 10:00 PM",
    bestTime: "November–February",
    tags: [
      "Pancha Bhuta Stala",
      "Nataraja",
      "Cosmic Centre",
      "Tamil Nadu",
      "Space Element",
    ],
  },
  {
    id: "mahalakshmi-kolhapur",
    name: "Mahalakshmi Temple Kolhapur",
    location: "Kolhapur, Maharashtra",
    state: "Maharashtra",
    city: "Kolhapur",
    faith: "Hindu",
    deity: "Goddess Mahalakshmi (Ambabai)",
    history:
      "One of the 18 Shaktipeethas, the Kolhapur Mahalakshmi (Ambabai) temple is considered so powerful that Vishnu himself built a rest-house (Vishnu Prasada) nearby. The unique sunlight darshan twice a year — sun rays fall directly on the main idol on March 21 and September 21. Over 5,000 years old, the present structure dates to 7th century CE.",
    visitingHours: "4:30 AM – 10:00 PM",
    bestTime: "March–April, September–October",
    tags: [
      "Shakti Peetha",
      "Mahalakshmi",
      "Maharashtra",
      "Solar Darshan",
      "Ancient",
    ],
  },
  {
    id: "trimbakeshwar",
    name: "Trimbakeshwar Temple",
    location: "Nashik, Maharashtra",
    state: "Maharashtra",
    city: "Nashik",
    faith: "Hindu",
    deity: "Lord Shiva (Trimbakeshwar Jyotirlinga)",
    history:
      "One of the 12 Jyotirlingas at the source of the sacred Godavari river in Nashik district. Unique among Jyotirlingas, it has a three-faced linga representing Brahma, Vishnu and Shiva. The Simhastha Kumbh Mela (every 12 years) here is among the largest human gatherings. Nashik is one of the four Kumbh Mela sites.",
    visitingHours: "5:30 AM – 9:00 PM",
    bestTime: "October–March",
    tags: [
      "Jyotirlinga",
      "Godavari Source",
      "Kumbh Mela",
      "Maharashtra",
      "Three-Faced Linga",
    ],
  },
  {
    id: "kamakhya",
    name: "Kamakhya Temple",
    location: "Guwahati, Assam",
    state: "Assam",
    city: "Guwahati",
    faith: "Hindu",
    deity: "Goddess Kamakhya (Adi Shakti)",
    history:
      "One of the most powerful Shakti Peethas, Kamakhya is worshipped as the yoni of Sati. The sanctum contains no idol — only a naturally shaped cleft in a rock fills with water symbolizing the goddess. The Ambubachi Mela (June) celebrates the annual menstruation of the goddess. Tantric sadhanas and siddhis are performed here.",
    visitingHours: "5:30 AM – 10:00 PM",
    bestTime: "October–March",
    tags: ["Shakti Peetha", "Tantric", "Assam", "Ambubachi Mela", "Adi Shakti"],
  },
  {
    id: "vindhyavasini",
    name: "Vindhyavasini Temple",
    location: "Mirzapur, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Mirzapur",
    faith: "Hindu",
    deity: "Goddess Vindhyavasini (Durga)",
    history:
      "Situated on the banks of the Ganges at the Vindhya mountains in Mirzapur, this is one of the three major Shaktipeethas in UP. The goddess here is worshipped as the original Adi Shakti who destroyed Mahishasura. The Navaratri celebrations here draw lakhs of devotees. The Ashtabhuja temple and Kali Khoh are nearby.",
    visitingHours: "5:00 AM – 10:00 PM",
    bestTime: "Navaratri (March & October)",
    tags: ["Shakti Peetha", "Vindhya Mountains", "Ganga", "UP", "Navaratri"],
  },
  {
    id: "jwala-devi",
    name: "Jwala Devi Temple",
    location: "Kangra, Himachal Pradesh",
    state: "Himachal Pradesh",
    city: "Kangra",
    faith: "Hindu",
    deity: "Goddess Jwala Devi (Flame Goddess)",
    history:
      "One of the 51 Shakti Peethas — Sati's tongue fell here. The temple enshrines naturally burning blue flames of gas (no oil or wick needed) as the goddess's living presence. The phenomenon has defied scientific explanation. Akbar is said to have tried to extinguish the flames with an iron cap, only to see them burn around it.",
    visitingHours: "5:00 AM – 10:00 PM",
    bestTime: "March–May, September–November",
    tags: [
      "Shakti Peetha",
      "Eternal Flame",
      "Himachal",
      "Sati",
      "Natural Phenomenon",
    ],
  },
  {
    id: "konark",
    name: "Konark Sun Temple",
    location: "Konark, Odisha",
    state: "Odisha",
    city: "Konark",
    faith: "Hindu",
    deity: "Surya Dev (Sun God)",
    history:
      "A UNESCO World Heritage Site built by King Narasimhadeva I of the Eastern Ganga dynasty in 1250 CE. Designed as a colossal chariot of the Sun with 24 elaborately carved stone wheels (each 3 metres in diameter) and 7 horses. The erotic sculptures are thought to represent Tantric spiritual symbolism. The structure is partially ruined but remains awe-inspiring.",
    visitingHours: "6:00 AM – 8:00 PM",
    bestTime: "October–February",
    tags: [
      "UNESCO World Heritage",
      "Surya Temple",
      "Chariot Architecture",
      "Odisha",
      "13th Century",
    ],
  },
  {
    id: "takht-hazur-sahib",
    name: "Takht Sri Hazur Sahib",
    location: "Nanded, Maharashtra",
    state: "Maharashtra",
    city: "Nanded",
    faith: "Sikh",
    deity: "Waheguru",
    history:
      "Takht Sachkhand Sri Hazur Abchalnagar Sahib is the most sacred site in Sikhism after Harmandir Sahib — the final resting place of Guru Gobind Singh Ji (1708 CE). It is here that Guru Gobind Singh Ji declared Sri Guru Granth Sahib Ji as the eternal Guru. The Sach Khand Gurdwara houses the Guru's personal weapons (shastra darsham).",
    visitingHours: "Open 24 hours",
    bestTime: "October–March",
    tags: [
      "Takht",
      "Guru Gobind Singh",
      "Eternal Guru",
      "Shastra Darsham",
      "Sikh",
    ],
  },
  {
    id: "pandharpur-vitthal",
    name: "Pandharpur Vitthal Mandir",
    location: "Pandharpur, Maharashtra",
    state: "Maharashtra",
    city: "Pandharpur",
    faith: "Hindu",
    deity: "Vitthal (Vithoba/Pandurang)",
    history:
      "The holiest temple of the Varkari sect, Pandharpur enshrines Vitthal — a unique form of Vishnu/Krishna standing on a brick with hands on hips. The biennial Ashadhi and Kartiki Ekadashi waris (pilgrimages) draw 1–2 million Varkari devotees on foot from across Maharashtra. Sant Dnyaneshwar, Tukaram and Namdev sang abhangas here.",
    visitingHours: "4:00 AM – 11:00 PM",
    bestTime: "Ashadhi Ekadashi (July) & Kartiki Ekadashi (Nov)",
    tags: [
      "Varkari",
      "Maharashtra",
      "Wari Pilgrimage",
      "Bhakti Movement",
      "Vitthal",
    ],
  },
  {
    id: "bhimashankar",
    name: "Bhimashankar Temple",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    city: "Pune",
    faith: "Hindu",
    deity: "Lord Shiva (Bhimashankar Jyotirlinga)",
    history:
      "One of the 12 Jyotirlingas, Bhimashankar is located in the Sahyadri (Western Ghats) hills at 3,250 feet, surrounded by the Bhimashankar Wildlife Sanctuary. The origin of the Bhima river is here. The temple's massive Shiva lingam inside is self-manifested (swayambhu). The ghunghroo bells gifted by the Peshwa Chimaji Appa are unique.",
    visitingHours: "4:30 AM – 9:30 PM",
    bestTime: "October–May",
    tags: [
      "Jyotirlinga",
      "Maharashtra",
      "Sahyadri",
      "Wildlife Sanctuary",
      "Bhima River",
    ],
  },
  {
    id: "grishneshwar",
    name: "Grishneshwar Temple",
    location: "Aurangabad, Maharashtra",
    state: "Maharashtra",
    city: "Aurangabad",
    faith: "Hindu",
    deity: "Lord Shiva (Ghrishneshwar Jyotirlinga)",
    history:
      "The 12th and last of the Jyotirlingas, Grishneshwar is located near the Ellora Caves UNESCO World Heritage Site. The red sandstone temple was rebuilt by Rani Ahilyabai Holkar in the 18th century. Uniquely, the lingam here is half-submerged. The Ellora cave temples (Hindu, Buddhist, Jain) are a short walk away.",
    visitingHours: "5:30 AM – 9:30 PM",
    bestTime: "October–March",
    tags: [
      "12th Jyotirlinga",
      "Ellora Caves",
      "Maharashtra",
      "Ahilyabai Holkar",
      "Last Jyotirlinga",
    ],
  },
  {
    id: "kapaleeshwarar-chennai",
    name: "Kapaleeshwarar Temple",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Chennai",
    faith: "Hindu",
    deity: "Lord Shiva (Kapaleeshwarar) & Goddess Karpagambal",
    history:
      "A Dravidian-style temple with a 37-metre gopuram, Kapaleeshwarar is the oldest temple in Chennai (Mylapore), originally built on the seashore before the Portuguese era. The peacock presides as the temple's sacred animal. The legend says that Parvati worshipped Shiva here in the form of a peacock — hence Mylapore (Mayil = peacock).",
    visitingHours: "5:00 AM – 12:00 PM, 4:00 PM – 10:00 PM",
    bestTime: "December–March",
    tags: ["Tamil Nadu", "Dravidian", "Gopuram", "Mylapore", "Peacock Temple"],
  },
  {
    id: "tiruvannamalai",
    name: "Arunachaleswarar Temple",
    location: "Tiruvannamalai, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Tiruvannamalai",
    faith: "Hindu",
    deity: "Lord Shiva (Arunachala as Agni-Fire Linga)",
    history:
      "One of the five Pancha Bhuta Stalas (Agni — fire element), this temple at the base of Arunachala Hill is one of the largest temple complexes in India (10+ hectares). Sri Ramana Maharshi attained enlightenment on Arunachala Hill and lived here for 54 years. The annual Karthigai Deepam festival lights a huge beacon atop the hill.",
    visitingHours: "5:30 AM – 10:00 PM",
    bestTime: "November–March (Karthigai Deepam: Dec)",
    tags: [
      "Pancha Bhuta Stala",
      "Ramana Maharshi",
      "Arunachala",
      "Fire Linga",
      "Tamil Nadu",
    ],
  },
  {
    id: "palani-murugan",
    name: "Palani Murugan Temple",
    location: "Palani, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Palani",
    faith: "Hindu",
    deity: "Lord Murugan (Dhandayuthapani)",
    history:
      "Atop Sivagiri Hill, Palani is one of the Arupadaiveedu (six abodes of Murugan). The deity Dhandayuthapani is made of an unusual compound of nine poisonous herbs (navapashanam). The famous Thaipusam festival brings millions of Kavadi-bearers. The rope-car and electric winch carry pilgrims up 693 steps.",
    visitingHours: "4:30 AM – 9:15 PM",
    bestTime: "January–March (Thaipusam: Feb)",
    tags: ["Murugan", "Arupadaiveedu", "Kavadi", "Thaipusam", "Tamil Nadu"],
  },
  {
    id: "tiruchendur",
    name: "Tiruchendur Subramania Temple",
    location: "Thoothukudi, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Thoothukudi",
    faith: "Hindu",
    deity: "Lord Murugan (Senthil Andavar)",
    history:
      "One of the six Arupadaiveedu (Six Abodes of Murugan), Tiruchendur is the only one of the six situated on the seashore — the Bay of Bengal. The legend says Murugan defeated the demon Soorapadman here. The mandapams (halls) and gopurams (towers) of this ancient temple extend right to the sea.",
    visitingHours: "5:30 AM – 9:30 PM",
    bestTime: "December–March",
    tags: [
      "Murugan",
      "Arupadaiveedu",
      "Seashore Temple",
      "Tamil Nadu",
      "Bay of Bengal",
    ],
  },
  {
    id: "ramanathaswamy",
    name: "Ramanathaswamy Jyotirlinga",
    location: "Rameswaram, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Rameswaram",
    faith: "Hindu",
    deity: "Lord Shiva (Ramanathaswamy)",
    history:
      "This entry specifically highlights the Ramanathaswamy temple as a standalone Jyotirlinga. The two lingas here — Ramalingam (established by Rama) and Vishwalingam (brought by Hanuman from Kashi) — represent the union of Shaiva and Vaishnava traditions. The temple's 22 theerthams ritual bathing is unique among all Indian temples.",
    visitingHours: "5:00 AM – 9:00 PM",
    bestTime: "November–March",
    tags: ["Jyotirlinga", "Char Dham", "Rama", "22 Sacred Wells", "Tamil Nadu"],
  },
];
