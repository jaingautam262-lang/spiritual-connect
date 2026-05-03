export type GuruFaith = "Hindu" | "Jain" | "Sikh";

export interface Guru {
  id: string;
  name: string;
  nameHindi: string;
  faith: GuruFaith;
  period: string;
  tradition: string;
  known_for: string;
  teachings: string[];
  biography: string;
  birth_place: string;
  emoji: string;
}

export const HINDU_GURUS: Guru[] = [
  {
    id: "h001",
    name: "Adi Shankaracharya",
    nameHindi: "आदि शंकराचार्य",
    faith: "Hindu",
    period: "788–820 CE",
    tradition: "Advaita Vedanta",
    known_for:
      "Consolidation of Advaita Vedanta philosophy; established 4 mathas",
    teachings: [
      "Brahman alone is real; the world is illusion (maya)",
      "Jiva (soul) and Brahman are ultimately one",
      "Liberation through Jnana (knowledge)",
      "Bhakti as a path to purify the mind",
    ],
    biography:
      "Born in Kalady, Kerala, Adi Shankaracharya was a philosopher and theologian who consolidated the Advaita Vedanta doctrine. At age 8 he mastered the Vedas and at 16 wrote his famous commentaries. He traveled across India debating scholars, established four monastic centers (Char Dhams), and revived Hinduism in a time of decline.",
    birth_place: "Kalady, Kerala",
    emoji: "🕉️",
  },
  {
    id: "h002",
    name: "Ramanujacharya",
    nameHindi: "रामानुजाचार्य",
    faith: "Hindu",
    period: "1017–1137 CE",
    tradition: "Vishishtadvaita (Sri Vaishnavism)",
    known_for: "Vishishtadvaita philosophy; champion of Bhakti and Prapatti",
    teachings: [
      "God (Brahman), souls (jivas), and matter are distinct but inseparable",
      "Bhakti (devotion) is the highest path to liberation",
      "Prapatti (surrender) to Vishnu grants moksha",
      "Equality of all devotees regardless of caste",
    ],
    biography:
      "Ramanujacharya was a South Indian theologian who founded the Vishishtadvaita school of Vedanta. He challenged Shankara's non-dualism by arguing that God, souls, and the world are real and distinct. His works include Sri Bhashya and Gita Bhashya, which remain foundational texts of Sri Vaishnavism.",
    birth_place: "Sriperumbudur, Tamil Nadu",
    emoji: "🪷",
  },
  {
    id: "h003",
    name: "Madhvacharya",
    nameHindi: "मध्वाचार्य",
    faith: "Hindu",
    period: "1238–1317 CE",
    tradition: "Dvaita Vedanta",
    known_for: "Dvaita (dualism) philosophy; Tattvavada school",
    teachings: [
      "God (Vishnu) and souls are eternally distinct — Dvaita (dualism)",
      "Devotion to Vishnu as the supreme path",
      "The world and souls are real (tattvavada)",
      "Liberation is experiencing eternal bliss in Vishnu's presence",
    ],
    biography:
      "Madhvacharya was a Karnataka-born philosopher who established the Dvaita (Dualism) school of Vedanta, firmly rejecting Advaita. He emphasized the eternal distinction between God and the individual soul. His 37 works, including commentaries on Upanishads and Bhagavad Gita, form the basis of the Udupi Vaishnavism tradition.",
    birth_place: "Pajaka, Karnataka",
    emoji: "🔱",
  },
  {
    id: "h004",
    name: "Kabir Das",
    nameHindi: "कबीर दास",
    faith: "Hindu",
    period: "1440–1518 CE",
    tradition: "Nirguna Bhakti, Kabir Panth",
    known_for:
      "Dohas (couplets) bridging Hindu-Muslim spirituality; Sant tradition",
    teachings: [
      "God is formless (nirguna) and beyond religion",
      "True devotion is in the heart, not in rituals",
      "Brotherhood of all humanity irrespective of religion",
      "Direct experience of the Divine through meditation",
    ],
    biography:
      "Kabir Das was a 15th-century mystic poet born to a Muslim weaver family in Varanasi but raised with Hindu influences. His dohas (couplets) sharply criticized empty religious ritual and preached the unity of God. His verses are found in the Guru Granth Sahib and form the Bijak of Kabir Panth, influencing both Hindu and Sikh traditions.",
    birth_place: "Varanasi, Uttar Pradesh",
    emoji: "✨",
  },
  {
    id: "h005",
    name: "Tulsidas",
    nameHindi: "तुलसीदास",
    faith: "Hindu",
    period: "1532–1623 CE",
    tradition: "Vaishnava Bhakti (Ramanandi Sampradaya)",
    known_for: "Ramcharitmanas — Hindi retelling of Ramayana",
    teachings: [
      "Devotion to Rama as the supreme deity",
      "Dharma, Karma, and selfless service",
      "Accessible spirituality for common people through vernacular poetry",
      "The Ramcharitmanas as a guide for righteous living",
    ],
    biography:
      "Tulsidas was a great Hindi-language poet and saint who is best known for composing the Ramcharitmanas, the Avadhi-language retelling of Valmiki's Sanskrit Ramayana. His work made the story of Rama accessible to ordinary people. He also wrote Hanuman Chalisa, Vinay Patrika, and numerous other devotional works.",
    birth_place: "Rajapur, Uttar Pradesh",
    emoji: "🙏",
  },
  {
    id: "h006",
    name: "Mirabai",
    nameHindi: "मीराबाई",
    faith: "Hindu",
    period: "1498–1546 CE",
    tradition: "Vaishnava Bhakti (Krishna devotion)",
    known_for: "Devotional songs (bhajans) to Lord Krishna; female saint-poet",
    teachings: [
      "Complete surrender to Krishna (Atma-nivedana)",
      "Love for God transcends social convention",
      "The devotee and God are eternal lovers (Madhurya Bhakti)",
      "Liberation through divine love alone",
    ],
    biography:
      "Mirabai was a 16th-century Rajput princess who became one of India's most celebrated bhakti poets. She renounced royal life to devote herself entirely to Krishna, composing thousands of bhajans that remain deeply popular. Her life exemplifies the power of divine love in overcoming worldly attachment and social barriers.",
    birth_place: "Merta City, Rajasthan",
    emoji: "💛",
  },
  {
    id: "h007",
    name: "Surdas",
    nameHindi: "सूरदास",
    faith: "Hindu",
    period: "1478–1583 CE",
    tradition: "Pushti Marg (Vallabha Sampradaya)",
    known_for:
      "Sursagar — devotional poetry on Krishna's childhood (Bal Leela)",
    teachings: [
      "Pure love (Shuddha Bhakti) as the highest form of devotion",
      "Celebration of Krishna's divine childhood (Bal Leela)",
      "The Pushti Marg path of grace (anugraha)",
      "Poetry as a vehicle for spiritual experience",
    ],
    biography:
      "Surdas was a blind poet-saint of the Bhakti movement devoted to Krishna. Though blind from birth (or early life), he composed some of the most vivid descriptions of Krishna's childhood exploits in his monumental Sursagar. He was a disciple of Vallabhacharya and one of the eight poets (Ashtachhap) of the Pushti Marg tradition.",
    birth_place: "Sihi village, Haryana",
    emoji: "🎵",
  },
  {
    id: "h008",
    name: "Swami Vivekananda",
    nameHindi: "स्वामी विवेकानंद",
    faith: "Hindu",
    period: "1863–1902 CE",
    tradition: "Ramakrishna Mission, Vedanta",
    known_for:
      "1893 Parliament of Religions speech; founding Ramakrishna Mission",
    teachings: [
      "Practical Vedanta — serve humanity as God (Shiva jnane jiva seva)",
      "Harmony of all religions",
      "Strength and fearlessness as spiritual virtues",
      "Education as key to India's revival",
    ],
    biography:
      "Swami Vivekananda was born Narendranath Datta in Kolkata and became the chief disciple of Ramakrishna Paramhansa. His electrifying speech at the 1893 Parliament of World's Religions in Chicago introduced Vedanta and Yoga to the Western world. He founded the Ramakrishna Mission devoted to serving God in man.",
    birth_place: "Kolkata, West Bengal",
    emoji: "🦁",
  },
  {
    id: "h009",
    name: "Ramakrishna Paramhansa",
    nameHindi: "रामकृष्ण परमहंस",
    faith: "Hindu",
    period: "1836–1886 CE",
    tradition: "Shakta Tantra, Vedanta, Vaishnavism",
    known_for:
      "Direct experience of God through multiple paths; guru of Vivekananda",
    teachings: [
      "All religions are different paths to the same God",
      "Direct experience of the Divine (Samadhi) is possible",
      "The world is a manifestation of the Mother Goddess (Kali)",
      "Purity of heart and renunciation of lust and gold",
    ],
    biography:
      "Sri Ramakrishna Paramhansa was a mystic and saint who had direct spiritual experiences of various deities including Kali, Rama, Krishna, and even attained samadhi in Christian and Islamic practices. Serving as a priest at Dakshineswar Kali Temple, his life demonstrated that all religions lead to the same truth.",
    birth_place: "Kamarpukur, West Bengal",
    emoji: "🌸",
  },
  {
    id: "h010",
    name: "Paramahansa Yogananda",
    nameHindi: "परमहंस योगानंद",
    faith: "Hindu",
    period: "1893–1952 CE",
    tradition: "Kriya Yoga (Self-Realization Fellowship)",
    known_for: "Autobiography of a Yogi; bringing Kriya Yoga to the West",
    teachings: [
      "Kriya Yoga as the fastest path to self-realization",
      "Unity of all true religions in their search for God",
      "God is Joy (Sat-Chit-Ananda)",
      "Practical techniques of meditation for modern seekers",
    ],
    biography:
      "Paramahansa Yogananda was an Indian yogi who came to America in 1920 and introduced millions of Westerners to Kriya Yoga and meditation. His Autobiography of a Yogi is considered one of the most important spiritual classics of the 20th century. He founded the Self-Realization Fellowship and the Yogoda Satsanga Society of India.",
    birth_place: "Gorakhpur, Uttar Pradesh",
    emoji: "☀️",
  },
  {
    id: "h011",
    name: "Osho (Bhagwan Rajneesh)",
    nameHindi: "ओशो (भगवान रजनीश)",
    faith: "Hindu",
    period: "1931–1990 CE",
    tradition: "Neo-Sannyas (contemporary spiritual movement)",
    known_for:
      "Dynamic meditation; prolific discourses on spirituality and psychology",
    teachings: [
      "Meditation as the foundation of all spiritual growth",
      "Synthesis of Eastern mysticism and Western psychology",
      "Celebration of life (Zorba the Buddha concept)",
      "Individual consciousness over organized religion",
    ],
    biography:
      "Osho, born Chandra Mohan Jain in Kuchwada, was a controversial but influential spiritual teacher. He delivered over 600 volumes of discourses on all major world religions, mystical traditions, and psychological approaches. He created dynamic meditation techniques for modern seekers and founded the Osho International Meditation Resort in Pune.",
    birth_place: "Kuchwada, Madhya Pradesh",
    emoji: "🌀",
  },
  {
    id: "h012",
    name: "Sri Aurobindo",
    nameHindi: "श्री अरबिंदो",
    faith: "Hindu",
    period: "1872–1950 CE",
    tradition: "Integral Yoga",
    known_for:
      "Integral Yoga; vision of Supramental transformation of humanity",
    teachings: [
      "Integral Yoga — transformation of all aspects of human life",
      "Supramental consciousness will descend to earth",
      "Evolution of consciousness is the purpose of existence",
      "The Divine Mother as the executive power of transformation",
    ],
    biography:
      "Sri Aurobindo was a philosopher, yogi, poet, and nationalist. After participating in India's independence movement, he received a profound spiritual experience in Alipore jail and withdrew from politics to pursue spiritual realization in Pondicherry. With the Mother (Mirra Alfassa) he developed Integral Yoga and founded the Sri Aurobindo Ashram.",
    birth_place: "Kolkata, West Bengal",
    emoji: "🌟",
  },
  {
    id: "h013",
    name: "Sadhguru (Jaggi Vasudev)",
    nameHindi: "सद्गुरु जग्गी वासुदेव",
    faith: "Hindu",
    period: "1957–present",
    tradition: "Isha Yoga",
    known_for: "Isha Foundation; contemporary Yoga and inner engineering",
    teachings: [
      "Inner Engineering — transformation through yogic tools",
      "Consciousness is the nature of all existence",
      "Ecological consciousness and Save Soil movement",
      "The body, mind, and energy as tools for liberation",
    ],
    biography:
      "Sadhguru Jaggi Vasudev is a contemporary yogi and visionary from Mysore. After a profound mystical experience on Chamundi Hill at age 25, he committed to spreading yoga and inner science. He founded the Isha Foundation, created Inner Engineering programs, and launched the international Save Soil movement reaching 3.9 billion people.",
    birth_place: "Mysore, Karnataka",
    emoji: "🌿",
  },
  {
    id: "h014",
    name: "Sri Sri Ravi Shankar",
    nameHindi: "श्री श्री रवि शंकर",
    faith: "Hindu",
    period: "1956–present",
    tradition: "Art of Living Foundation",
    known_for: "Sudarshan Kriya breathing technique; Art of Living Foundation",
    teachings: [
      "Sudarshan Kriya — rhythmic breathing for stress relief",
      "Service, spirituality, and wisdom go hand in hand",
      "Peace begins within each individual",
      "Multicultural harmony through ancient wisdom",
    ],
    biography:
      "Sri Sri Ravi Shankar is a humanitarian and spiritual leader who founded the Art of Living Foundation in 1981. He developed the Sudarshan Kriya, a unique breathing technique that has helped millions manage stress worldwide. His organization operates in 180+ countries providing stress relief workshops, youth programs, and post-conflict rehabilitation.",
    birth_place: "Papanasam, Tamil Nadu",
    emoji: "💫",
  },
  {
    id: "h015",
    name: "Swami Dayananda Saraswati",
    nameHindi: "स्वामी दयानंद सरस्वती",
    faith: "Hindu",
    period: "1824–1883 CE",
    tradition: "Arya Samaj",
    known_for:
      "Founding Arya Samaj; promoting Vedic reform and women's education",
    teachings: [
      "Vedas as the source of all true knowledge",
      "Rejection of idol worship and caste discrimination",
      "Shuddhi (purification/reconversion) movement",
      "Women's right to education and Vedic study",
    ],
    biography:
      "Swami Dayananda Saraswati was the founder of the Arya Samaj social reform movement. A Sanskrit scholar who mastered Vedic texts, he campaigned against idol worship, caste discrimination, and religious superstition. His Satyarth Prakash (Light of Truth) remains the foundational text of Arya Samaj and influenced India's independence movement.",
    birth_place: "Tankara, Gujarat",
    emoji: "📜",
  },
];

export const JAIN_ACHARYAS: Guru[] = [
  {
    id: "j001",
    name: "Acharya Mahaprajna",
    nameHindi: "आचार्य महाप्रज्ञ",
    faith: "Jain",
    period: "1920–2010 CE",
    tradition: "Terapanth (Jain)",
    known_for: "Preksha Meditation; Anuvrat movement; prolific Jain literature",
    teachings: [
      "Preksha Dhyana — science-based meditation technique",
      "Anuvrat — small vows for ethical living by common people",
      "Ahimsa (non-violence) as the basis of all ethics",
      "Integration of science and spirituality",
    ],
    biography:
      "Acharya Mahaprajna was the 10th Acharya of the Jain Terapanth sect. Born Nathmall in Tamkor, Rajasthan, he took initiation under Acharya Tulsi and developed Preksha Meditation, now practiced by millions worldwide. He authored over 150 books and championed the Anuvrat Movement promoting ethical values for modern life.",
    birth_place: "Tamkor, Rajasthan",
    emoji: "🧘",
  },
  {
    id: "j002",
    name: "Acharya Tulsi",
    nameHindi: "आचार्य तुलसी",
    faith: "Jain",
    period: "1914–1997 CE",
    tradition: "Terapanth (Jain)",
    known_for:
      "Anuvrat Movement; Jain Vishva Bharati University; peace initiatives",
    teachings: [
      "Anuvrat — personal ethical codes for householders",
      "Ahimsa in thought, word, and deed",
      "Tolerance, coexistence, and religious harmony",
      "Education as vehicle for moral transformation",
    ],
    biography:
      "Acharya Tulsi was the 9th Acharya of Jain Terapanth and one of the most influential Jain leaders of the 20th century. He established the Anuvrat Movement in 1949 to promote small personal vows for ethical living, launched Jain Vishva Bharati University in Ladnun, and worked tirelessly for peace, non-violence, and social harmony.",
    birth_place: "Ladnun, Rajasthan",
    emoji: "☮️",
  },
  {
    id: "j003",
    name: "Acharya Vidyanand",
    nameHindi: "आचार्य विद्यानंद",
    faith: "Jain",
    period: "1931–present",
    tradition: "Digambara Jain",
    known_for:
      "Digambara Jain scholarship; Jinvani propagation; scriptural commentary",
    teachings: [
      "Complete renunciation (mahatyaga) as the supreme Jain path",
      "Syadvada (conditional predication) as the key to truth",
      "Tattvartha Sutra as the essence of Jain philosophy",
      "Anekantavada — many-sidedness of truth",
    ],
    biography:
      "Acharya Vidyanand is a renowned Digambara Jain ascetic and scholar who has dedicated his life to propagating Jain philosophy. He has authored commentaries on major Jain texts and worked to establish Jain educational institutions across India. His scholarly contributions to Jain literature and scriptural interpretation are widely respected.",
    birth_place: "Rajasthan",
    emoji: "📚",
  },
  {
    id: "j004",
    name: "Acharya Ratnasundar",
    nameHindi: "आचार्य रत्नसुंदर",
    faith: "Jain",
    period: "20th–21st Century",
    tradition: "Sthanakvasi Jain",
    known_for:
      "Jain literature; scriptural discourses; Sthanakvasi Jain tradition",
    teachings: [
      "Jain Agamas as the supreme guide for liberation",
      "Pratikraman (daily repentance) as essential practice",
      "Paryushana as the highest festival of self-purification",
      "Samayik — equanimity meditation as daily practice",
    ],
    biography:
      "Acharya Ratnasundar is a distinguished Jain Sthanakvasi ascetic known for his erudition in Jain scriptures and his ability to make complex Jain philosophy accessible. Through his discourses and writings, he has inspired thousands of householders to adopt Jain values and ethical living in modern times.",
    birth_place: "Rajasthan",
    emoji: "✨",
  },
  {
    id: "j005",
    name: "Acharya Nanesh",
    nameHindi: "आचार्य नानेश",
    faith: "Jain",
    period: "20th Century",
    tradition: "Sthanakvasi Jain",
    known_for:
      "Sthanakvasi Jain literary tradition; discourses; youth inspiration",
    teachings: [
      "Ahimsa and Aparigraha as daily practice",
      "The Jain way of life as completely natural and scientific",
      "Samayik and meditation for inner peace",
      "Community service and compassion",
    ],
    biography:
      "Acharya Nanesh was a prominent Sthanakvasi Jain ascetic who was renowned for his profound knowledge of Jain Agamas and his inspiring discourses. He initiated many individuals into Jain monkhood and worked extensively to preserve Jain oral traditions. His teachings continue to inspire Jain communities across Rajasthan and Gujarat.",
    birth_place: "Rajasthan",
    emoji: "🌸",
  },
];

export const SIKH_GURUS: Guru[] = [
  {
    id: "s001",
    name: "Guru Nanak Dev Ji",
    nameHindi: "गुरु नानक देव जी",
    faith: "Sikh",
    period: "1469–1539 CE",
    tradition: "Sikhism (Founder)",
    known_for: "Founder of Sikhism; Japji Sahib; concept of Ik Onkar (One God)",
    teachings: [
      "Ik Onkar — One Universal Creator God",
      "Naam Japna — meditation on God's Name",
      "Kirat Karna — honest labor",
      "Vand Chhakna — sharing with others",
    ],
    biography:
      "Guru Nanak Dev Ji was born in Rai Bhoi di Talvandi (now Nankana Sahib, Pakistan) and founded the Sikh faith. After receiving divine revelation, he undertook four major journeys (Udasis) across India, Sri Lanka, Mecca, and Central Asia, preaching the message of one God and human brotherhood. He established Kartarpur, the first Sikh community.",
    birth_place: "Rai Bhoi di Talvandi (Nankana Sahib), Punjab",
    emoji: "🪯",
  },
  {
    id: "s002",
    name: "Guru Angad Dev Ji",
    nameHindi: "गुरु अंगद देव जी",
    faith: "Sikh",
    period: "1504–1552 CE",
    tradition: "Sikhism (2nd Guru)",
    known_for: "Standardization of Gurmukhi script; Langar tradition",
    teachings: [
      "Service (seva) as the highest form of devotion",
      "Physical fitness as part of spiritual life",
      "Humility as the foundation of greatness",
      "Education through Gurmukhi script",
    ],
    biography:
      "Guru Angad Dev Ji was born Bhai Lehna and was chosen by Guru Nanak as his successor. He standardized the Gurmukhi script, making it easier to record the Guru's hymns. He promoted Langar (community kitchen) as an institution and established a tradition of wrestling and physical education alongside spiritual practice.",
    birth_place: "Harike, Punjab",
    emoji: "✍️",
  },
  {
    id: "s003",
    name: "Guru Amar Das Ji",
    nameHindi: "गुरु अमर दास जी",
    faith: "Sikh",
    period: "1479–1574 CE",
    tradition: "Sikhism (3rd Guru)",
    known_for: "Abolishing purdah system; Anand Sahib; 22 Manjis (dioceses)",
    teachings: [
      "Equality of all — no caste or gender discrimination",
      "Anand (divine bliss) through Naam meditation",
      "Langar must be eaten before seeking audience",
      "Opposition to sati and purdah",
    ],
    biography:
      "Guru Amar Das Ji became the third Sikh Guru at the age of 73. He strongly opposed the caste system and purdah, insisting that no one could see him without eating in the Langar first regardless of their status. He established 22 Manjis to spread Sikhism and composed the Anand Sahib prayer recited at all Sikh ceremonies.",
    birth_place: "Basarke, Punjab",
    emoji: "🌺",
  },
  {
    id: "s004",
    name: "Guru Ram Das Ji",
    nameHindi: "गुरु राम दास जी",
    faith: "Sikh",
    period: "1534–1581 CE",
    tradition: "Sikhism (4th Guru)",
    known_for:
      "Founding Amritsar (Ramdaspur); Lavan (Anand Karaj marriage ceremony)",
    teachings: [
      "Humility and service as the path to God",
      "The Sarovar (sacred pool) as place of spiritual cleansing",
      "Lavan — four rounds of sacred marriage ceremony",
      "The Guru's word as the bridge to liberation",
    ],
    biography:
      "Guru Ram Das Ji founded the city of Ramdaspur, now known as Amritsar, and excavated the sacred Amrit Sarovar (Pool of Nectar). He composed the Lavan, the four stanzas recited during the Sikh wedding ceremony (Anand Karaj). He also composed a beautiful hymn on the Sikh way of life (Sikhism's daily routine).",
    birth_place: "Lahore, Punjab",
    emoji: "💧",
  },
  {
    id: "s005",
    name: "Guru Arjan Dev Ji",
    nameHindi: "गुरु अर्जन देव जी",
    faith: "Sikh",
    period: "1563–1606 CE",
    tradition: "Sikhism (5th Guru)",
    known_for:
      "Compilation of Adi Granth; construction of Harmandir Sahib (Golden Temple)",
    teachings: [
      "The Adi Granth as the living word of God",
      "Martyrdom for truth and righteousness",
      "All paths lead to the one God",
      "The Guru Granth Sahib as guide for all humanity",
    ],
    biography:
      "Guru Arjan Dev Ji compiled the first edition of the Adi Granth (later Guru Granth Sahib), incorporating hymns from earlier Gurus and saints of other faiths. He also completed the Harmandir Sahib (Golden Temple) at Amritsar, giving it four doors to welcome all people. He was the first Sikh martyr, executed by Mughal Emperor Jahangir in 1606.",
    birth_place: "Goindval, Punjab",
    emoji: "📖",
  },
  {
    id: "s006",
    name: "Guru Hargobind Ji",
    nameHindi: "गुरु हरगोबिंद जी",
    faith: "Sikh",
    period: "1595–1644 CE",
    tradition: "Sikhism (6th Guru)",
    known_for: "Miri-Piri doctrine (spiritual + temporal power); Akal Takht",
    teachings: [
      "Miri-Piri — the Guru wields both spiritual and temporal swords",
      "Sikhs must be prepared to defend righteousness by force if necessary",
      "Band Chhor Divas — freeing 52 kings from Gwalior Fort",
      "The Akal Takht as seat of temporal authority",
    ],
    biography:
      "Guru Hargobind Ji transformed the Sikh community from a pacifist movement to one capable of armed self-defense. He wore two swords symbolizing Miri (temporal) and Piri (spiritual) authority and established the Akal Takht opposite the Golden Temple. He was imprisoned in Gwalior Fort by Mughal Emperor Jahangir and freed 52 Hindu kings upon his release.",
    birth_place: "Wadali, Punjab",
    emoji: "⚔️",
  },
  {
    id: "s007",
    name: "Guru Har Rai Ji",
    nameHindi: "गुरु हर राय जी",
    faith: "Sikh",
    period: "1630–1661 CE",
    tradition: "Sikhism (7th Guru)",
    known_for:
      "Healing ministry; harmony with Mughal prince Dara Shikoh; nature lover",
    teachings: [
      "Compassion for all living beings",
      "The Guru's medicine heals both body and soul",
      "Living in harmony with nature",
      "Maintaining Sikh army for protection, not aggression",
    ],
    biography:
      "Guru Har Rai Ji was known for his compassionate nature and love for animals and birds. He maintained a large zoo and medical dispensary, healing people of all faiths. He kept a 2,200-strong cavalry to maintain Sikh strength without initiating conflicts. He aided Mughal prince Dara Shikoh who later consulted him on spiritual matters.",
    birth_place: "Kiratpur Sahib, Punjab",
    emoji: "🕊️",
  },
  {
    id: "s008",
    name: "Guru Har Krishan Ji",
    nameHindi: "गुरु हर कृष्ण जी",
    faith: "Sikh",
    period: "1656–1664 CE",
    tradition: "Sikhism (8th Guru)",
    known_for:
      "Youngest Guru (age 5); selfless service during smallpox epidemic; Bal Guru",
    teachings: [
      "The Guru's power resides in humility and selfless service",
      "God's grace transcends all human knowledge and age",
      "'Baba Bakale' — pointed to his successor from deathbed",
      "The truly wise are known by their deeds of service",
    ],
    biography:
      "Guru Har Krishan Ji became Sikh Guru at age 5, making him the youngest. Called to Delhi by Mughal Emperor Aurangzeb, he served the sick and dying during a smallpox and cholera epidemic, personally caring for patients. He contracted smallpox himself and passed away at age 8. His last words 'Baba Bakale' directed Sikhs to find his successor in Bakala village.",
    birth_place: "Kiratpur Sahib, Punjab",
    emoji: "👶",
  },
  {
    id: "s009",
    name: "Guru Tegh Bahadur Ji",
    nameHindi: "गुरु तेग बहादुर जी",
    faith: "Sikh",
    period: "1621–1675 CE",
    tradition: "Sikhism (9th Guru)",
    known_for:
      "Martyrdom for protection of Hindu Kashmiri Pandits' religious freedom",
    teachings: [
      "Religious freedom as a universal right",
      "Hind ki Chadar — shield of India",
      "Fearlessness in the face of tyranny",
      "Service, sacrifice, and surrender to God's will",
    ],
    biography:
      "Guru Tegh Bahadur Ji was the ninth Sikh Guru who made the supreme sacrifice to protect the religious freedom of Kashmiri Pandits facing forced conversion under Mughal Emperor Aurangzeb. He traveled across India spreading the message of love and devotion. Refusing to convert, he was publicly executed in Chandni Chowk, Delhi, earning the title 'Hind ki Chadar.'",
    birth_place: "Amritsar, Punjab",
    emoji: "🛡️",
  },
  {
    id: "s010",
    name: "Guru Gobind Singh Ji",
    nameHindi: "गुरु गोबिंद सिंह जी",
    faith: "Sikh",
    period: "1666–1708 CE",
    tradition: "Sikhism (10th Guru)",
    known_for:
      "Creation of Khalsa Panth; Panj Kakars; Dasam Granth; Guru Granth Sahib as eternal Guru",
    teachings: [
      "Waheguru Ji ka Khalsa, Waheguru Ji ki Fateh",
      "The Khalsa — saint-soldiers who stand for truth and justice",
      "Panj Kakars (5 Ks) as the Sikh identity",
      "Guru Granth Sahib is the eternal living Guru after him",
    ],
    biography:
      "Guru Gobind Singh Ji, born Gobind Rai in Patna Sahib, was the last of the ten human Sikh Gurus. He founded the Khalsa Panth in 1699, creating the order of saint-soldiers with the Panj Kakars as their identity. He authored the Dasam Granth and declared the Guru Granth Sahib as the eternal, living Guru. Four of his sons (Sahibzadas) were martyred fighting Mughal oppression.",
    birth_place: "Patna Sahib, Bihar",
    emoji: "🔱",
  },
];

export const ALL_GURUS: Guru[] = [
  ...HINDU_GURUS,
  ...JAIN_ACHARYAS,
  ...SIKH_GURUS,
];

export function getGurusByFaith(faith: GuruFaith): Guru[] {
  return ALL_GURUS.filter((g) => g.faith === faith);
}
