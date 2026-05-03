// Festival Calendar 2026 — All 12 months, 9 regional variants
// Format: { name, date (ISO YYYY-MM-DD), region, deity?, significance, colorTag }

export interface FestivalCalendarEntry {
  name: string;
  date: string;
  region: string;
  deity?: string;
  significance: string;
  colorTag: string;
}

// Region keys
export type RegionKey =
  | "allIndia"
  | "tamilNadu"
  | "karnataka"
  | "kerala"
  | "gujarat"
  | "maharashtra"
  | "bengal"
  | "odisha"
  | "punjab"
  | "upBihar";

// ─── January 2026 ─────────────────────────────────────────────────────────────

const jan: FestivalCalendarEntry[] = [
  {
    name: "Lohri",
    date: "2026-01-13",
    region: "punjab",
    deity: "Agni",
    significance: "Harvest bonfire festival marking end of winter solstice",
    colorTag: "fire",
  },
  {
    name: "Makar Sankranti",
    date: "2026-01-14",
    region: "allIndia",
    deity: "Surya",
    significance: "Sun's northward journey; kite flying and til-gur exchange",
    colorTag: "solar",
  },
  {
    name: "Thai Pongal",
    date: "2026-01-14",
    region: "tamilNadu",
    deity: "Surya",
    significance: "Harvest thanksgiving to the Sun God; rice boiled in open",
    colorTag: "solar",
  },
  {
    name: "Uttarayan / Makar Sankranti",
    date: "2026-01-14",
    region: "gujarat",
    deity: "Surya",
    significance: "International Kite Festival; sesame sweets shared",
    colorTag: "solar",
  },
  {
    name: "Mattu Pongal",
    date: "2026-01-15",
    region: "tamilNadu",
    deity: "Nandi",
    significance: "Cattle honored for their role in agriculture",
    colorTag: "earth",
  },
  {
    name: "Kaanum Pongal",
    date: "2026-01-16",
    region: "tamilNadu",
    significance: "Family gatherings and leisure; last day of Pongal",
    colorTag: "festive",
  },
  {
    name: "Maghi",
    date: "2026-01-14",
    region: "punjab",
    deity: "Waheguru",
    significance: "Sikh festival commemorating the martyrdom of Chali Mukte",
    colorTag: "sikh",
  },
  {
    name: "Maghi Purnima",
    date: "2026-01-12",
    region: "upBihar",
    significance: "Sacred bath at Sangam and Ganga during the full moon",
    colorTag: "water",
  },
  {
    name: "Subhash Chandra Bose Jayanti",
    date: "2026-01-23",
    region: "allIndia",
    significance: "Birth anniversary of Netaji Subhash Chandra Bose",
    colorTag: "national",
  },
  {
    name: "Republic Day",
    date: "2026-01-26",
    region: "allIndia",
    significance: "India's constitution came into effect in 1950",
    colorTag: "national",
  },
];

// ─── February 2026 ────────────────────────────────────────────────────────────

const feb: FestivalCalendarEntry[] = [
  {
    name: "Vasant Panchami",
    date: "2026-02-02",
    region: "allIndia",
    deity: "Saraswati",
    significance: "Festival of knowledge; yellow attire, Saraswati puja",
    colorTag: "yellow",
  },
  {
    name: "Guru Ravidas Jayanti",
    date: "2026-02-11",
    region: "punjab",
    deity: "Guru Ravidas",
    significance: "Birth anniversary of Saint Guru Ravidas Ji",
    colorTag: "sikh",
  },
  {
    name: "Maha Shivaratri",
    date: "2026-02-26",
    region: "allIndia",
    deity: "Shiva",
    significance:
      "Night-long vigil, fasting and Shiva worship; sacred lingam abhishek",
    colorTag: "shiva",
  },
  {
    name: "Attukal Pongala",
    date: "2026-02-20",
    region: "kerala",
    deity: "Attukal Amma",
    significance: "World's largest gathering of women; pongala offering",
    colorTag: "shakti",
  },
];

// ─── March 2026 ───────────────────────────────────────────────────────────────

const mar: FestivalCalendarEntry[] = [
  {
    name: "Holika Dahan",
    date: "2026-03-13",
    region: "allIndia",
    deity: "Vishnu",
    significance: "Bonfire celebrating victory of Prahlad; evil burnt to ashes",
    colorTag: "fire",
  },
  {
    name: "Holi",
    date: "2026-03-14",
    region: "allIndia",
    deity: "Krishna",
    significance: "Festival of colors; spring celebration and joy",
    colorTag: "holi",
  },
  {
    name: "Ugadi",
    date: "2026-03-22",
    region: "karnataka",
    significance: "Kannada New Year; neem flower and jaggery consumed",
    colorTag: "festive",
  },
  {
    name: "Gudi Padwa",
    date: "2026-03-22",
    region: "maharashtra",
    significance: "Maharashtrian New Year; Gudi hoisted at doorway",
    colorTag: "festive",
  },
  {
    name: "Vishu",
    date: "2026-04-14",
    region: "kerala",
    deity: "Vishnu",
    significance: "Malayalam New Year; Vishukkani auspicious first sight",
    colorTag: "solar",
  },
  {
    name: "Cheti Chand",
    date: "2026-03-22",
    region: "allIndia",
    deity: "Jhulelal",
    significance: "Sindhi New Year and birth of Jhulelal",
    colorTag: "water",
  },
];

// ─── April 2026 ───────────────────────────────────────────────────────────────

const apr: FestivalCalendarEntry[] = [
  {
    name: "Ram Navami",
    date: "2026-04-06",
    region: "allIndia",
    deity: "Ram",
    significance: "Birth anniversary of Lord Rama; fasting and Ram Katha",
    colorTag: "rama",
  },
  {
    name: "Baisakhi",
    date: "2026-04-14",
    region: "punjab",
    deity: "Waheguru",
    significance:
      "Sikh New Year; founding of Khalsa Panth by Guru Gobind Singh in 1699",
    colorTag: "sikh",
  },
  {
    name: "Puthandu",
    date: "2026-04-14",
    region: "tamilNadu",
    significance: "Tamil New Year; kani darshan and new beginnings",
    colorTag: "festive",
  },
  {
    name: "Hanuman Jayanti",
    date: "2026-04-12",
    region: "allIndia",
    deity: "Hanuman",
    significance:
      "Birth anniversary of Lord Hanuman; Hanuman Chalisa recitation",
    colorTag: "hanuman",
  },
  {
    name: "Mahavir Jayanti",
    date: "2026-04-17",
    region: "allIndia",
    deity: "Mahavir",
    significance:
      "Birth anniversary of Lord Mahavir, 24th Tirthankara of Jainism",
    colorTag: "jain",
  },
  {
    name: "Good Friday",
    date: "2026-04-03",
    region: "allIndia",
    significance: "Crucifixion of Jesus Christ remembered",
    colorTag: "christian",
  },
  {
    name: "Easter Sunday",
    date: "2026-04-05",
    region: "allIndia",
    significance: "Resurrection of Jesus Christ celebrated",
    colorTag: "christian",
  },
  {
    name: "Akshaya Tritiya",
    date: "2026-04-30",
    region: "allIndia",
    deity: "Vishnu",
    significance:
      "Auspicious day for new beginnings, gold purchases, and charity",
    colorTag: "gold",
  },
];

// ─── May 2026 ─────────────────────────────────────────────────────────────────

const may: FestivalCalendarEntry[] = [
  {
    name: "Buddha Purnima",
    date: "2026-05-12",
    region: "allIndia",
    deity: "Gautama Buddha",
    significance: "Birth, enlightenment, and mahaparinirvana of Gautama Buddha",
    colorTag: "buddhist",
  },
  {
    name: "Thrissur Pooram",
    date: "2026-05-07",
    region: "kerala",
    deity: "Vadakkunnathan",
    significance:
      "Grand temple festival with elephant processions and fireworks",
    colorTag: "kerala",
  },
  {
    name: "Shankaracharya Jayanti",
    date: "2026-05-08",
    region: "allIndia",
    deity: "Shankara",
    significance:
      "Birth anniversary of Adi Shankaracharya, Advaita Vedanta proponent",
    colorTag: "vedic",
  },
];

// ─── June 2026 ────────────────────────────────────────────────────────────────

const jun: FestivalCalendarEntry[] = [
  {
    name: "Vat Savitri Puja",
    date: "2026-06-14",
    region: "maharashtra",
    deity: "Savitri",
    significance: "Women fast for husband's longevity under banyan tree",
    colorTag: "shakti",
  },
  {
    name: "Raja Parba",
    date: "2026-06-15",
    region: "odisha",
    significance:
      "Odia festival celebrating womanhood and earth's menstruation",
    colorTag: "earth",
  },
  {
    name: "Rath Yatra",
    date: "2026-06-27",
    region: "odisha",
    deity: "Jagannath",
    significance:
      "Chariot procession of Lord Jagannath, Balabhadra, and Subhadra at Puri",
    colorTag: "jagannath",
  },
  {
    name: "Ashadhi Ekadashi",
    date: "2026-06-27",
    region: "maharashtra",
    deity: "Vitthala",
    significance: "Warkari pilgrims reach Pandharpur; Chaturmas begins",
    colorTag: "vaishnava",
  },
];

// ─── July 2026 ────────────────────────────────────────────────────────────────

const jul: FestivalCalendarEntry[] = [
  {
    name: "Guru Purnima",
    date: "2026-07-10",
    region: "allIndia",
    deity: "Vyasa",
    significance: "Reverence to spiritual and academic teachers; Vyasa Puja",
    colorTag: "guru",
  },
  {
    name: "Jagannath Rath Yatra Return",
    date: "2026-07-04",
    region: "odisha",
    deity: "Jagannath",
    significance: "Bahuda Yatra — return chariot procession of Lord Jagannath",
    colorTag: "jagannath",
  },
];

// ─── August 2026 ──────────────────────────────────────────────────────────────

const aug: FestivalCalendarEntry[] = [
  {
    name: "Nag Panchami",
    date: "2026-08-01",
    region: "allIndia",
    deity: "Nag Devata",
    significance: "Serpent worship; milk offering to snake idols",
    colorTag: "shakti",
  },
  {
    name: "Raksha Bandhan",
    date: "2026-08-09",
    region: "allIndia",
    significance: "Sister ties rakhi on brother's wrist; bond of protection",
    colorTag: "festive",
  },
  {
    name: "Independence Day",
    date: "2026-08-15",
    region: "allIndia",
    significance: "India's independence from British rule in 1947",
    colorTag: "national",
  },
  {
    name: "Janmashtami",
    date: "2026-08-16",
    region: "allIndia",
    deity: "Krishna",
    significance: "Birth of Lord Krishna; midnight celebration, Dahi Handi",
    colorTag: "krishna",
  },
  {
    name: "Onam",
    date: "2026-08-27",
    region: "kerala",
    deity: "Mahabali",
    significance: "Kerala's harvest festival; King Mahabali's annual visit",
    colorTag: "kerala",
  },
  {
    name: "Ganesh Chaturthi",
    date: "2026-08-28",
    region: "maharashtra",
    deity: "Ganesha",
    significance:
      "Elephant-headed god's birthday; 10-day festival with immersion",
    colorTag: "ganesha",
  },
  {
    name: "Ganesh Chaturthi",
    date: "2026-08-28",
    region: "allIndia",
    deity: "Ganesha",
    significance: "Vinayaka Chaturthi; Ganesh puja and modak offering",
    colorTag: "ganesha",
  },
  {
    name: "Nuakhai",
    date: "2026-08-30",
    region: "odisha",
    significance:
      "New rice festival of western Odisha; first crop offered to goddess",
    colorTag: "harvest",
  },
  {
    name: "Aadi Perukku",
    date: "2026-08-03",
    region: "tamilNadu",
    deity: "Kaveri",
    significance: "Worship of rivers; water-related rituals on banks of Kaveri",
    colorTag: "water",
  },
  {
    name: "Poila Boishakh",
    date: "2026-04-15",
    region: "bengal",
    significance: "Bengali New Year; sweets shared, shops opened with puja",
    colorTag: "festive",
  },
];

// ─── September 2026 ───────────────────────────────────────────────────────────

const sep: FestivalCalendarEntry[] = [
  {
    name: "Onam Thiruvonam",
    date: "2026-09-05",
    region: "kerala",
    deity: "Mahabali",
    significance:
      "Grand feast day of Onam; Pookkalam floral carpet, Vallam Kali",
    colorTag: "kerala",
  },
  {
    name: "Ganesh Visarjan",
    date: "2026-09-07",
    region: "maharashtra",
    deity: "Ganesha",
    significance:
      "Immersion of Ganesh idol on Anant Chaturdashi; end of festival",
    colorTag: "ganesha",
  },
  {
    name: "Anant Chaturdashi",
    date: "2026-09-07",
    region: "allIndia",
    deity: "Vishnu",
    significance: "Fourteen-knot thread tied for Lord Vishnu's blessings",
    colorTag: "vaishnava",
  },
  {
    name: "Pitru Paksha begins",
    date: "2026-09-13",
    region: "allIndia",
    significance: "16-day period of ancestral offerings (Shraddha)",
    colorTag: "ancestral",
  },
  {
    name: "Mahalaya",
    date: "2026-09-28",
    region: "bengal",
    deity: "Durga",
    significance:
      "Invocation of Goddess Durga; dawn radio broadcast of Mahishasura Mardini",
    colorTag: "durga",
  },
];

// ─── October 2026 ─────────────────────────────────────────────────────────────

const oct: FestivalCalendarEntry[] = [
  {
    name: "Navratri begins",
    date: "2026-10-02",
    region: "allIndia",
    deity: "Durga",
    significance: "Nine nights of Goddess worship; Garba in Gujarat, fasting",
    colorTag: "navratri",
  },
  {
    name: "Navratri / Dasara",
    date: "2026-10-02",
    region: "karnataka",
    deity: "Chamundeshwari",
    significance: "Mysuru Dasara — grand royal procession; elephant tableau",
    colorTag: "navratri",
  },
  {
    name: "Durga Puja begins",
    date: "2026-10-07",
    region: "bengal",
    deity: "Durga",
    significance: "Five-day celebration of Goddess Durga; artistic pandals",
    colorTag: "durga",
  },
  {
    name: "Dussehra / Vijayadashami",
    date: "2026-10-11",
    region: "allIndia",
    deity: "Rama",
    significance: "Victory of Ram over Ravana; burning of Ravan effigy",
    colorTag: "rama",
  },
  {
    name: "Kojagari Purnima",
    date: "2026-10-12",
    region: "bengal",
    deity: "Lakshmi",
    significance: "Lakshmi Puja on full moon; all-night vigil for wealth",
    colorTag: "lakshmi",
  },
  {
    name: "Valmiki Jayanti",
    date: "2026-10-12",
    region: "allIndia",
    deity: "Maharishi Valmiki",
    significance: "Birth anniversary of Maharishi Valmiki, author of Ramayana",
    colorTag: "vedic",
  },
  {
    name: "Dhanteras",
    date: "2026-10-18",
    region: "allIndia",
    deity: "Lakshmi",
    significance:
      "Purchase of gold/silver on auspicious 13th lunar day; Dhanwantari puja",
    colorTag: "gold",
  },
  {
    name: "Naraka Chaturdashi",
    date: "2026-10-19",
    region: "allIndia",
    deity: "Krishna",
    significance:
      "Chhoti Diwali; lamp lighting, crackers, Krishna's victory over Narakasura",
    colorTag: "diwali",
  },
  {
    name: "Diwali",
    date: "2026-10-20",
    region: "allIndia",
    deity: "Lakshmi",
    significance:
      "Festival of Lights; Lakshmi puja, diyas, fireworks, family celebration",
    colorTag: "diwali",
  },
  {
    name: "Diwali Padwa / Balipratipada",
    date: "2026-10-21",
    region: "maharashtra",
    deity: "Vishnu",
    significance:
      "First day of New Year in Vikram Samvat; King Bali remembered",
    colorTag: "diwali",
  },
  {
    name: "Diwali Padwa / Annakut",
    date: "2026-10-21",
    region: "gujarat",
    deity: "Krishna",
    significance:
      "Gujarati New Year; Annakut — mountain of food offered to Krishna",
    colorTag: "diwali",
  },
  {
    name: "Bhai Dooj",
    date: "2026-10-22",
    region: "allIndia",
    significance: "Sister applies tika on brother's forehead; bond of love",
    colorTag: "festive",
  },
  {
    name: "Chhath Puja begins",
    date: "2026-10-25",
    region: "upBihar",
    deity: "Surya",
    significance:
      "Sun God worship; rigorous four-day fast by devotees in rivers",
    colorTag: "solar",
  },
  {
    name: "Chhath Puja — Sandhya Arghya",
    date: "2026-10-28",
    region: "upBihar",
    deity: "Surya",
    significance:
      "Evening offering to setting sun at riverbanks; thousands gather",
    colorTag: "solar",
  },
];

// ─── November 2026 ────────────────────────────────────────────────────────────

const nov: FestivalCalendarEntry[] = [
  {
    name: "Chhath Puja — Usha Arghya",
    date: "2026-10-29",
    region: "upBihar",
    deity: "Surya",
    significance: "Dawn offering to rising sun; fast broken after sunrise",
    colorTag: "solar",
  },
  {
    name: "Guru Nanak Jayanti",
    date: "2026-11-05",
    region: "punjab",
    deity: "Guru Nanak Dev Ji",
    significance:
      "Birth anniversary of first Sikh Guru; Prabhat Pheris, Akhand Path",
    colorTag: "sikh",
  },
  {
    name: "Guru Nanak Jayanti",
    date: "2026-11-05",
    region: "allIndia",
    deity: "Guru Nanak Dev Ji",
    significance:
      "Gurpurab celebrated across India with processions and langar",
    colorTag: "sikh",
  },
  {
    name: "Kali Puja",
    date: "2026-10-20",
    region: "bengal",
    deity: "Kali",
    significance: "Coincides with Diwali; Goddess Kali worshipped on Amavasya",
    colorTag: "kali",
  },
  {
    name: "Dev Diwali",
    date: "2026-11-04",
    region: "upBihar",
    deity: "Ganga",
    significance: "Thousands of diyas lit at Varanasi ghats on Kartik Purnima",
    colorTag: "diwali",
  },
  {
    name: "Kartik Purnima",
    date: "2026-11-04",
    region: "allIndia",
    deity: "Vishnu",
    significance: "Holy bath day; Tripuri Purnima, lamp offering to Vishnu",
    colorTag: "festive",
  },
  {
    name: "Karthigai Deepam",
    date: "2026-11-27",
    region: "tamilNadu",
    deity: "Shiva",
    significance:
      "Festival of lights at Tiruvannamalai; beacon lamp on Annamalai hill",
    colorTag: "shiva",
  },
  {
    name: "Rajyotsava",
    date: "2026-11-01",
    region: "karnataka",
    significance: "Karnataka Statehood Day — formation of Karnataka in 1956",
    colorTag: "national",
  },
  {
    name: "Vivah Panchami",
    date: "2026-11-26",
    region: "allIndia",
    deity: "Ram",
    significance:
      "Divine wedding of Lord Rama and Sita; celebrated in Ayodhya and Janakpur",
    colorTag: "rama",
  },
  {
    name: "Guru Tegh Bahadur Shaheedi Diwas",
    date: "2026-11-24",
    region: "punjab",
    deity: "Guru Tegh Bahadur Ji",
    significance: "Martyrdom day of the ninth Sikh Guru",
    colorTag: "sikh",
  },
];

// ─── December 2026 ────────────────────────────────────────────────────────────

const dec: FestivalCalendarEntry[] = [
  {
    name: "Gita Jayanti",
    date: "2026-12-18",
    region: "allIndia",
    deity: "Krishna",
    significance:
      "Day Lord Krishna imparted the Bhagavad Gita to Arjuna on Kurukshetra",
    colorTag: "krishna",
  },
  {
    name: "Vaikuntha Ekadashi",
    date: "2026-12-27",
    region: "allIndia",
    deity: "Vishnu",
    significance:
      "Most sacred Ekadashi; Vaikuntha gates open; fasting and Vishnu worship",
    colorTag: "vaishnava",
  },
  {
    name: "Christmas",
    date: "2026-12-25",
    region: "allIndia",
    significance: "Birth of Jesus Christ; celebrated across India",
    colorTag: "christian",
  },
  {
    name: "Dattatreya Jayanti",
    date: "2026-12-17",
    region: "allIndia",
    deity: "Dattatreya",
    significance:
      "Birth anniversary of Lord Dattatreya — trinity of Brahma, Vishnu, Mahesh",
    colorTag: "vedic",
  },
  {
    name: "Dhanu Sankranti",
    date: "2026-12-16",
    region: "odisha",
    deity: "Surya",
    significance: "Sun enters Sagittarius; special manda pitha sweets made",
    colorTag: "solar",
  },
];

// ─── Compiled festival list ───────────────────────────────────────────────────

export const ALL_FESTIVALS_2026: FestivalCalendarEntry[] = [
  ...jan,
  ...feb,
  ...mar,
  ...apr,
  ...may,
  ...jun,
  ...jul,
  ...aug,
  ...sep,
  ...oct,
  ...nov,
  ...dec,
].sort((a, b) => a.date.localeCompare(b.date));

// ─── Helper: get festivals by region ─────────────────────────────────────────

export function getFestivalsByRegion(
  region: RegionKey,
): FestivalCalendarEntry[] {
  return ALL_FESTIVALS_2026.filter(
    (f) => f.region === region || f.region === "allIndia",
  );
}

export function getFestivalsByMonth(month: number): FestivalCalendarEntry[] {
  const mm = String(month).padStart(2, "0");
  return ALL_FESTIVALS_2026.filter((f) => f.date.startsWith(`2026-${mm}`));
}

export function getFestivalsByDateRange(
  from: string,
  to: string,
): FestivalCalendarEntry[] {
  return ALL_FESTIVALS_2026.filter((f) => f.date >= from && f.date <= to);
}

// ─── Color tag → display class map ───────────────────────────────────────────

export const COLOR_TAG_MAP: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  solar: { bg: "bg-amber-100", text: "text-amber-800", label: "Sun / Surya" },
  fire: { bg: "bg-orange-100", text: "text-orange-800", label: "Agni" },
  festive: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Festival" },
  national: { bg: "bg-green-100", text: "text-green-800", label: "National" },
  sikh: { bg: "bg-sky-100", text: "text-sky-800", label: "Sikh" },
  water: { bg: "bg-blue-100", text: "text-blue-800", label: "Water / Jal" },
  shiva: { bg: "bg-indigo-100", text: "text-indigo-800", label: "Shiva" },
  shakti: { bg: "bg-rose-100", text: "text-rose-800", label: "Shakti" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-900", label: "Saraswati" },
  rama: { bg: "bg-teal-100", text: "text-teal-800", label: "Rama" },
  krishna: { bg: "bg-purple-100", text: "text-purple-800", label: "Krishna" },
  hanuman: { bg: "bg-orange-100", text: "text-orange-900", label: "Hanuman" },
  jain: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Jain" },
  christian: { bg: "bg-slate-100", text: "text-slate-700", label: "Christian" },
  buddhist: { bg: "bg-amber-100", text: "text-amber-900", label: "Buddhist" },
  gold: { bg: "bg-yellow-200", text: "text-yellow-900", label: "Auspicious" },
  holi: { bg: "bg-pink-100", text: "text-pink-800", label: "Holi" },
  kerala: { bg: "bg-green-100", text: "text-green-900", label: "Kerala" },
  harvest: { bg: "bg-lime-100", text: "text-lime-800", label: "Harvest" },
  jagannath: { bg: "bg-amber-200", text: "text-amber-900", label: "Jagannath" },
  guru: { bg: "bg-orange-100", text: "text-orange-800", label: "Guru" },
  durga: { bg: "bg-red-100", text: "text-red-800", label: "Durga" },
  navratri: { bg: "bg-red-100", text: "text-red-900", label: "Navratri" },
  diwali: { bg: "bg-yellow-200", text: "text-yellow-900", label: "Diwali" },
  ganesha: { bg: "bg-orange-100", text: "text-orange-900", label: "Ganesha" },
  lakshmi: { bg: "bg-yellow-100", text: "text-yellow-900", label: "Lakshmi" },
  ancestral: { bg: "bg-stone-100", text: "text-stone-700", label: "Pitru" },
  vaishnava: {
    bg: "bg-violet-100",
    text: "text-violet-800",
    label: "Vaishnava",
  },
  earth: { bg: "bg-lime-100", text: "text-lime-900", label: "Earth" },
  vedic: { bg: "bg-amber-100", text: "text-amber-800", label: "Vedic" },
  kali: { bg: "bg-gray-900", text: "text-yellow-300", label: "Kali" },
};
