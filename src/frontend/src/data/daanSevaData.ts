export type DaanFaith = "Hindu" | "Jain" | "Sikh";
export type DaanType =
  | "Daan"
  | "Dana"
  | "Seva"
  | "Simran"
  | "Sangat"
  | "Kar Seva";

export interface DaanSevaEntry {
  id: string;
  name: string;
  nameHindi: string;
  faith: DaanFaith;
  type: DaanType;
  significance: string;
  benefits: string[];
  tithi_occasion: string;
  how_to_perform: string[];
  emoji: string;
  scripturalRef?: string;
}

export const DAAN_SEVA_DATA: DaanSevaEntry[] = [
  // ── Hindu Daan (10 types) ──────────────────────────────────────────────────
  {
    id: "hd001",
    name: "Anna Daan",
    nameHindi: "अन्न दान",
    faith: "Hindu",
    type: "Daan",
    significance:
      "Food donation is considered the highest form of charity in Hindu dharma. As the scriptures say 'Anna hi Brahma' — food is God. Feeding the hungry nourishes the soul of both giver and receiver.",
    benefits: [
      "Removes sins and negative karma",
      "Brings blessings of Annapurna Devi",
      "Ensures food abundance for the donor's family",
      "Earns merit that helps in this life and the next",
    ],
    tithi_occasion:
      "Ekadashi, Amavasya, Purnima, Navratri, Diwali, solar/lunar eclipses, Shraddha days",
    how_to_perform: [
      "Prepare pure vegetarian food with devotion (no onion/garlic for religious occasions)",
      "Distribute to Brahmins, sadhus, poor, or feed at a temple or dharamsala",
      "Offer some food first to God and then distribute — this is called Prasad distribution",
    ],
    emoji: "🍚",
    scripturalRef:
      "Taittiriya Upanishad 3.7: 'Annam na nindyat' — Never disrespect food",
  },
  {
    id: "hd002",
    name: "Vastra Daan",
    nameHindi: "वस्त्र दान",
    faith: "Hindu",
    type: "Daan",
    significance:
      "Donation of clothing protects the recipient from cold and hardship. It is associated with the blessings of Lord Vishnu and is especially meritorious when given to the needy on religious occasions.",
    benefits: [
      "Brings prosperity and removal of planetary afflictions",
      "Strengthens the body and protects from disease",
      "Pleases Saturn (Shani) — reduces Sade Sati effects",
      "Earns merit equal to performing a yajna",
    ],
    tithi_occasion:
      "Makar Sankranti, Diwali, Holi, Saturdays for Shani relief, Navratri, charity drives",
    how_to_perform: [
      "Clean and fold clothes before donation — never give torn or dirty clothes",
      "Best donated to elderly, children, or those in genuine need",
      "For Shani daan: donate black or dark blue clothing on Saturday evening",
    ],
    emoji: "👗",
    scripturalRef:
      "Manusmriti: Clothing the naked is among the highest forms of charity",
  },
  {
    id: "hd003",
    name: "Vidya Daan",
    nameHindi: "विद्या दान",
    faith: "Hindu",
    type: "Daan",
    significance:
      "Knowledge donation is considered superior to all material gifts. As Chanakya declared: 'Vidya Daan sarva daanon mein shreshtha' — Education is the greatest gift as it empowers the recipient for a lifetime.",
    benefits: [
      "Brings blessings of Goddess Saraswati",
      "Improves intelligence and learning ability of the donor",
      "Generates the highest spiritual merit",
      "Helps society progress and removes ignorance",
    ],
    tithi_occasion:
      "Basant Panchami, Guru Purnima, Diwali (Goddess Saraswati puja), any auspicious day",
    how_to_perform: [
      "Sponsor a child's education through a legitimate charity or school",
      "Teach a skill to someone who cannot afford to learn it",
      "Donate books, school supplies, or study materials to underprivileged students",
    ],
    emoji: "📚",
    scripturalRef:
      "Chanakya Niti: 'Knowledge shared is knowledge multiplied, not diminished'",
  },
  {
    id: "hd004",
    name: "Go Daan",
    nameHindi: "गो दान",
    faith: "Hindu",
    type: "Daan",
    significance:
      "Cow donation is one of the Maha Daan (great gifts) in Hindu tradition. All 33 crore devas are said to reside in the cow. Donating a cow with calf on proper occasions grants liberation (moksha).",
    benefits: [
      "Considered equivalent to tirtha yatra (pilgrimage)",
      "Removes all sins accumulated over lifetimes",
      "Grants moksha (liberation) to ancestors",
      "Brings blessings of all 33 crore devas",
    ],
    tithi_occasion:
      "Death anniversary (shraddha), Kartik Purnima, Solar/Lunar eclipse, Makar Sankranti, last rites",
    how_to_perform: [
      "Donate a healthy cow with calf to a Brahmin or worthy caretaker",
      "If a live cow is not possible, donate to a registered Gaushal (cow shelter)",
      "Recite the Go Daan mantra and apply tilak to the cow before donation",
    ],
    emoji: "🐄",
    scripturalRef:
      "Skanda Purana: 'Gavah sarveshu lokesu pujyante' — Cows are worshipped in all worlds",
  },
  {
    id: "hd005",
    name: "Bhu Daan",
    nameHindi: "भू दान",
    faith: "Hindu",
    type: "Daan",
    significance:
      "Land donation is among the Maha Daan, as land provides sustenance for generations. The Bhu Daan movement led by Vinoba Bhave in modern India revived this tradition as a path to social equality.",
    benefits: [
      "Generates immense punya (merit) that lasts for generations",
      "Frees one from land-related legal disputes and obstacles",
      "Fulfills the donor's ancestors' wishes for charitable deeds",
      "Ensures prosperity and security of the donor's lineage",
    ],
    tithi_occasion:
      "Vaisakha Shukla Navami, solar eclipse, Shraddha Paksha, Akshaya Tritiya",
    how_to_perform: [
      "Transfer land legally with proper documentation to a legitimate charitable institution",
      "For symbolic observance, donate to an institution that works with landless farmers",
      "Perform a simple puja before the formal transfer deed",
    ],
    emoji: "🌍",
    scripturalRef:
      "Matsya Purana: Land donation is the foremost of all material gifts",
  },
  {
    id: "hd006",
    name: "Jal Daan",
    nameHindi: "जल दान",
    faith: "Hindu",
    type: "Daan",
    significance:
      "Water donation is particularly meritorious in summer months and in arid regions. Installing a pyau (water kiosk) is a traditional form of service. Water is sacred — offered to the sun, deities, and ancestors daily.",
    benefits: [
      "Removes thirst-related bad karma from past lives",
      "Protects from disease and brings health",
      "Particularly effective for pacifying Sun and Mars",
      "Daily Tarpan (water offering to ancestors) liberates ancestors",
    ],
    tithi_occasion:
      "Daily (Tarpan to sun), Grishma Ritu (summer months), Shraddha Paksha, solar eclipse",
    how_to_perform: [
      "Set up a seasonal water kiosk (pyau) at a visible location near your home",
      "Offer water to the Sun (Surya Arghya) daily at sunrise as a minimum practice",
      "During Shraddha Paksha, offer Tarpan (water with black sesame seeds) to ancestors",
    ],
    emoji: "💧",
    scripturalRef:
      "Rigveda 10.9.3: 'Water is the source of all life and healing'",
  },
  {
    id: "hd007",
    name: "Aushadhi Daan",
    nameHindi: "औषधि दान",
    faith: "Hindu",
    type: "Daan",
    significance:
      "Medicine donation relieves suffering and is associated with Lord Dhanvantari (deity of medicine). Donating medicine to the sick earns merit equal to saving a life, and is especially powerful during eclipses and Navratri.",
    benefits: [
      "Removes disease-related karma and brings good health",
      "Earns blessings of Lord Dhanvantari",
      "Helps pacify malefic Mercury (Budh) and Rahu",
      "Considered among the most compassionate acts",
    ],
    tithi_occasion:
      "Dhanvantari Jayanti (Navratri 2nd day), solar/lunar eclipse, Dhanteras, hospitals on any day",
    how_to_perform: [
      "Donate medicines to charitable hospitals, government dispensaries, or elderly care homes",
      "Contribute to medicine banks run by temples or NGOs",
      "On Dhanteras, buy and donate medicines along with gold/silver purchases",
    ],
    emoji: "💊",
    scripturalRef:
      "Charaka Samhita: 'He who helps the sick helps all creation'",
  },
  {
    id: "hd008",
    name: "Kanya Daan",
    nameHindi: "कन्या दान",
    faith: "Hindu",
    type: "Daan",
    significance:
      "The donation of a daughter in a proper Hindu wedding (Vivah Sanskara) is considered the greatest gift a father can give. It is the final and most sacred of the Shodasha Samskaras.",
    benefits: [
      "Considered the highest form of Maha Daan for the father",
      "Liberates seven generations of ancestors",
      "Fulfills the father's dharmic duty",
      "Brings divine blessings for the entire family",
    ],
    tithi_occasion:
      "Muhurta-auspicious wedding dates: Vivah Panchami, Akshaya Tritiya, Diwali",
    how_to_perform: [
      "Performed at the time of daughter's marriage with proper Vedic ceremony",
      "Father holds daughter's right hand and gives it into the groom's right hand",
      "Pandit recites the Kanya Daan mantra while father makes the formal offering",
    ],
    emoji: "💒",
    scripturalRef:
      "Manusmriti 3.21: 'There is no gift greater than the gift of a daughter'",
  },
  {
    id: "hd009",
    name: "Bhumi Daan (Land for Sacred Purpose)",
    nameHindi: "भूमि दान (पवित्र प्रयोजन हेतु)",
    faith: "Hindu",
    type: "Daan",
    significance:
      "Donating land specifically for temple construction, ashram, or dharamsala (pilgrim rest house) is among the highest acts of piety. It creates a permanent spiritual resource for countless devotees.",
    benefits: [
      "Creates karmic merit for hundreds of generations",
      "Equivalent to performing 1000 Ashwamedha Yajnas",
      "Ensures the donor's name lives in spiritual history",
      "Brings divine protection and blessing to entire family lineage",
    ],
    tithi_occasion:
      "Bhoomi Puja ceremony before temple construction, auspicious dates set by astrologer",
    how_to_perform: [
      "Identify a need for a temple, ashram, or dharamsala in an underserved area",
      "Formally transfer land with proper Bhoomi Daan ceremony with priests",
      "Ensure ongoing maintenance arrangements are secured at time of donation",
    ],
    emoji: "🛕",
    scripturalRef:
      "Vishnu Purana: Donating land for a temple earns merit equaling all other donations combined",
  },
  {
    id: "hd010",
    name: "Swarna Daan",
    nameHindi: "स्वर्ण दान",
    faith: "Hindu",
    type: "Daan",
    significance:
      "Gold donation is associated with the Sun (Surya) and Goddess Lakshmi. Donating gold to temples or worthy priests is said to remove solar afflictions, strengthen one's destiny, and invite divine abundance.",
    benefits: [
      "Strengthens the Sun in one's horoscope",
      "Removes financial obstacles and attracts prosperity",
      "Removes the sin of hoarding wealth",
      "Brings divine grace of Goddess Lakshmi",
    ],
    tithi_occasion:
      "Dhanteras, Akshaya Tritiya, Diwali, Makar Sankranti, Sunday (for Sun), solar eclipse",
    how_to_perform: [
      "Donate a gold coin or gold ornament to a reputable temple deity",
      "Have the donation blessed by a priest with appropriate mantra",
      "If gold is not available, donate saffron (kesar) — which is considered the gold of herbs",
    ],
    emoji: "🥇",
    scripturalRef:
      "Rig Veda: 'Gold is the light of the sun preserved in the earth'",
  },

  // ── Jain Dana (4 types) ───────────────────────────────────────────────────
  {
    id: "jd001",
    name: "Aahaar Daan",
    nameHindi: "आहार दान",
    faith: "Jain",
    type: "Dana",
    significance:
      "Food donation to Jain monks and nuns (sadhus and sadhvis) is the highest form of Jain Dana. The merit earned from this act purifies the soul and brings immense spiritual benefit. This is called 'Labh' (sacred gain).",
    benefits: [
      "Highest punya-earning act in Jain dharma",
      "Earns the special merit called Panchamrit Labh",
      "Purifies the consciousness of the householder",
      "Creates a direct karmic bond with enlightened souls",
    ],
    tithi_occasion:
      "Daily (when Jain sadhus are on Gochari — their daily alms round), Paryushana, Mahavir Jayanti",
    how_to_perform: [
      "Invite Jain sadhus/sadhvis for Gochari (alms giving) to your home",
      "Offer Ahimsa-compliant pure food (no root vegetables, no insects visible, boiled water)",
      "Recite 'Tatha Astu' (So be it) as the offering — a form of blessing exchange",
    ],
    emoji: "🍱",
    scripturalRef:
      "Tattvartha Sutra: Dana is first among the four-fold path of the householder",
  },
  {
    id: "jd002",
    name: "Aushadhi Daan",
    nameHindi: "औषधि दान",
    faith: "Jain",
    type: "Dana",
    significance:
      "Medicine donation to sick Jain ascetics and to the poor is a sacred obligation. Since Jain monks cannot easily access hospitals, providing medicines is considered an act of deep compassion and service.",
    benefits: [
      "Removes disease-causing karma (Vyadhi karma)",
      "Earns compassion merit (Karuna punya)",
      "Strengthens the body and extends healthy life",
      "Reduces suffering in this and future births",
    ],
    tithi_occasion:
      "Paryushana, Das Lakshana, Akshaya Tritiya, Mahavir Jayanti",
    how_to_perform: [
      "Donate medicines approved by Jain ascetics (Ayurvedic/vegetarian-based)",
      "Contribute to Jain charitable hospitals (Jain Samaaj Hospitals)",
      "Ensure medications contain no animal ingredients (gelatin capsules must be avoided)",
    ],
    emoji: "💊",
    scripturalRef:
      "Uttaradhyayana Sutra: 'Medicine to the sick is medicine to the soul'",
  },
  {
    id: "jd003",
    name: "Abhay Daan",
    nameHindi: "अभय दान",
    faith: "Jain",
    type: "Dana",
    significance:
      "The gift of fearlessness — protecting a living being from death or harm — is considered the supreme Jain Dana. Releasing a caged bird, saving an animal from slaughter, or protecting an insect all count as Abhay Daan.",
    benefits: [
      "Generates the highest merit in Jain karma theory",
      "Destroys fear-causing karma (Bhaya karma)",
      "Attracts divine protection and fearlessness",
      "Moves the donor toward liberation (Moksha)",
    ],
    tithi_occasion:
      "Paryushana (especially Samvatsari day), Mahavir Jayanti, any day when an opportunity presents",
    how_to_perform: [
      "Release caged birds, fish in tanks, or other animals at Jain Pinjrapole (animal shelters)",
      "Stop a killing that you witness — even preventing harm to insects counts",
      "Donate to Panjrapole (animal shelters run by Jain community)",
    ],
    emoji: "🕊️",
    scripturalRef:
      "Acharanga Sutra 1.4: 'To all breathing, existing beings, no harm should be given'",
  },
  {
    id: "jd004",
    name: "Shastra Daan",
    nameHindi: "शास्त्र दान",
    faith: "Jain",
    type: "Dana",
    significance:
      "Donating Jain scriptures, texts, or supporting their preservation is a sacred duty. Knowledge that leads to liberation (Moksha Marg) is the greatest gift to the soul. This tradition preserves Jain heritage for future generations.",
    benefits: [
      "Earns the merit of preserving dharma itself",
      "Destroys knowledge-obscuring karma (Jnana-avaraniya karma)",
      "Benefits countless souls who will read the texts",
      "Considered superior to building temples (by some Jain scholars)",
    ],
    tithi_occasion:
      "Jnana Panchami (Kartik Shukla Panchami), Paryushana, Mahavir Jayanti",
    how_to_perform: [
      "Donate Jain Agama texts to libraries, pathshalas, or temples",
      "Sponsor printing of Jain religious texts for free distribution",
      "Support digitization projects that make Jain scriptures accessible online",
    ],
    emoji: "📖",
    scripturalRef:
      "Tattvarthsutra: Knowledge is the lamp that illuminates the path to liberation",
  },

  // ── Sikh Seva (4 types) ───────────────────────────────────────────────────
  {
    id: "ss001",
    name: "Langar Seva",
    nameHindi: "लंगर सेवा",
    faith: "Sikh",
    type: "Seva",
    significance:
      "Langar (community kitchen) is the most visible expression of Sikh Seva. Established by Guru Nanak, it feeds everyone — regardless of religion, caste, or social status — as equals sitting in Pangat (rows). Harmandir Sahib serves 100,000 free meals daily.",
    benefits: [
      "Direct expression of Waheguru's blessing through service",
      "Destroys ego and pride through humble service",
      "Earns the highest form of Sikh merit (Naam and Seva together)",
      "Creates unity and breaks social barriers",
    ],
    tithi_occasion:
      "Gurpurabs (Guru's birthdays/martyrdom days), Baisakhi, Hola Mohalla, weekly at Gurudwara (Sunday/Sangrand)",
    how_to_perform: [
      "Arrive at Gurudwara, wash hands, and join the Langar kitchen volunteers",
      "Contribute by cooking, serving, or cleaning — all roles are equally sacred",
      "Donate Langar samagri (groceries: flour, dal, rice, sugar, oil) to Gurudwara",
    ],
    emoji: "🍲",
    scripturalRef: "Guru Granth Sahib: 'Vand Chhakna — Share what you have'",
  },
  {
    id: "ss002",
    name: "Kar Seva",
    nameHindi: "कार सेवा",
    faith: "Sikh",
    type: "Kar Seva",
    significance:
      "Kar Seva is physical labor donated for the construction or maintenance of Gurudwaras and sacred sites. Historically, Kar Seva was performed for rebuilding the Golden Temple. Even sweeping Gurudwara floors is considered the highest honor.",
    benefits: [
      "Removes ego (Haumai) through physical humble service",
      "Earns blessings of all 10 Gurus",
      "Creates community bonds and social harmony",
      "Fulfills the Sikh ideal of the Saint-Servant (Sant-Sipahi)",
    ],
    tithi_occasion:
      "Baisakhi (founding of Khalsa), Gurpurabs, scheduled Gurudwara renovation projects",
    how_to_perform: [
      "Contact local Gurudwara Prabandhak Committee for scheduled Kar Seva projects",
      "Bring simple tools (brooms, buckets, cleaning supplies) and join willingly",
      "Accept tasks assigned by the Sevadar — no task is beneath a Sikh",
    ],
    emoji: "🧹",
    scripturalRef:
      "Sri Guru Granth Sahib: 'Ghar mahi thakur nale vasai, Sevadar soi jo sev karai'",
  },
  {
    id: "ss003",
    name: "Sangat",
    nameHindi: "संगत",
    faith: "Sikh",
    type: "Sangat",
    significance:
      "Sangat (holy congregation) is itself a form of Seva. By being in the presence of the Guru's word (Gurbani) and the company of the pious (Sadh Sangat), one's consciousness is elevated. The Guru Granth Sahib declares: 'In Sangat, the Name of the Lord is obtained.'",
    benefits: [
      "Purifies the mind through Gurbani and holy company",
      "Provides support network for the Sikh community",
      "Amplifies individual prayer through collective consciousness",
      "Protects from negative influences and loneliness",
    ],
    tithi_occasion:
      "Every day at Gurudwara (Amritvela/early morning is most auspicious), Gurpurabs, Saptah (seven-day akhand path)",
    how_to_perform: [
      "Attend Gurudwara Diwan (morning/evening prayers) regularly",
      "Listen attentively to Gurbani and Katha (spiritual discourse)",
      "Participate in Ardas (collective prayer) with full concentration",
    ],
    emoji: "🙏",
    scripturalRef:
      "Guru Granth Sahib, Ang 72: 'In Sadh Sangat the Naam of the Lord is obtained'",
  },
  {
    id: "ss004",
    name: "Simran Seva",
    nameHindi: "सिमरन सेवा",
    faith: "Sikh",
    type: "Simran",
    significance:
      "Simran (remembrance of God's Name) is the inner form of Seva. By continuously meditating on Waheguru, the Sikh serves God within. Guru Nanak taught that Naam Simran is the most direct path to Waheguru.",
    benefits: [
      "Unites the individual soul with Waheguru",
      "Removes the five vices (Kaam, Krodh, Lobh, Moh, Ahankar)",
      "Brings mental peace and divine protection",
      "Fulfills the ultimate purpose of human life in Sikh teaching",
    ],
    tithi_occasion:
      "Amritvela (3-6 AM daily), throughout day as continuous practice, special emphasis during Gurpurabs",
    how_to_perform: [
      "Rise in Amritvela (pre-dawn) and recite Japji Sahib, Jaap Sahib, and Tav Prasad Savaiye",
      "During the day, mentally repeat 'Waheguru' with every breath",
      "Evening: recite Rehras Sahib at sunset and Kirtan Sohila at bedtime",
    ],
    emoji: "🕯️",
    scripturalRef: "Guru Granth Sahib, Ang 295: 'Simro simar simar sukh pao'",
  },
];

export function getDaanByFaith(faith: DaanFaith): DaanSevaEntry[] {
  return DAAN_SEVA_DATA.filter((d) => d.faith === faith);
}

export const DAAN_FAITH_TABS: {
  value: DaanFaith | "All";
  label: string;
  emoji: string;
}[] = [
  { value: "All", label: "सभी / All", emoji: "🕉️" },
  { value: "Hindu", label: "हिंदू / Hindu", emoji: "🔱" },
  { value: "Jain", label: "जैन / Jain", emoji: "☸️" },
  { value: "Sikh", label: "सिख / Sikh", emoji: "🪯" },
];
