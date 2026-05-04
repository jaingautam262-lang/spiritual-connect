import type { ContentType, MediaTrack } from "../stores/mediaPlayerStore";

// Extended track type with mock audio flag
export interface MockMediaTrack extends MediaTrack {
  hasMockAudio: boolean;
  durationLabel: string;
}

export const MOCK_AUDIO_TRACKS: MockMediaTrack[] = [
  // ── Bhajan (5 tracks) ───────────────────────────────────────────────
  {
    id: "b001",
    title: "Jai Ganesh Jai Ganesh Deva",
    titleHindi: "जय गणेश जय गणेश देवा",
    deity: "Lord Ganesha",
    faith: "Hindu",
    contentType: "bhajan" as ContentType,
    artist: "Traditional",
    audioUrl: "",
    durationLabel: "4:12",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
  {
    id: "b002",
    title: "Om Namah Shivaye",
    titleHindi: "ॐ नमः शिवाय",
    deity: "Lord Shiva",
    faith: "Hindu",
    contentType: "bhajan" as ContentType,
    artist: "Traditional",
    audioUrl: "",
    durationLabel: "5:30",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
  {
    id: "b003",
    title: "Hare Krishna Hare Rama",
    titleHindi: "हरे कृष्ण हरे रामा",
    deity: "Lord Krishna",
    faith: "Hindu",
    contentType: "bhajan" as ContentType,
    artist: "ISKCON",
    audioUrl: "",
    durationLabel: "6:15",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
  {
    id: "b004",
    title: "Hanuman Chalisa Bhajan",
    titleHindi: "हनुमान चालीसा भजन",
    deity: "Lord Hanuman",
    faith: "Hindu",
    contentType: "bhajan" as ContentType,
    artist: "Traditional",
    audioUrl: "",
    durationLabel: "7:45",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
  {
    id: "b005",
    title: "Gayatri Mantra Bhajan",
    titleHindi: "गायत्री मंत्र भजन",
    deity: "Gayatri Devi",
    faith: "Hindu",
    contentType: "bhajan" as ContentType,
    artist: "Traditional",
    audioUrl: "",
    durationLabel: "3:45",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },

  // ── Vrat Katha (3 tracks) ────────────────────────────────────────────
  {
    id: "k001",
    title: "Ekadashi Vrat Katha",
    titleHindi: "एकादशी व्रत कथा",
    deity: "Lord Vishnu",
    faith: "Hindu",
    contentType: "katha" as ContentType,
    artist: "Pandit Ji",
    audioUrl: "",
    durationLabel: "18:20",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
  {
    id: "k002",
    title: "Satyanarayan Katha",
    titleHindi: "सत्यनारायण कथा",
    deity: "Lord Vishnu",
    faith: "Hindu",
    contentType: "katha" as ContentType,
    artist: "Pandit Ji",
    audioUrl: "",
    durationLabel: "24:50",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
  {
    id: "k003",
    title: "Somvar Vrat Katha",
    titleHindi: "सोमवार व्रत कथा",
    deity: "Lord Shiva",
    faith: "Hindu",
    contentType: "katha" as ContentType,
    artist: "Pandit Ji",
    audioUrl: "",
    durationLabel: "12:35",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },

  // ── Aarti (4 tracks) ────────────────────────────────────────────────
  {
    id: "a001",
    title: "Om Jai Jagdish Hare",
    titleHindi: "ॐ जय जगदीश हरे",
    deity: "Lord Vishnu",
    faith: "Hindu",
    contentType: "aarti" as ContentType,
    artist: "Traditional",
    audioUrl: "",
    durationLabel: "3:10",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
  {
    id: "a002",
    title: "Ganesh Aarti – Sukhkarta Dukhharta",
    titleHindi: "सुखकर्ता दुखहर्ता",
    deity: "Lord Ganesha",
    faith: "Hindu",
    contentType: "aarti" as ContentType,
    artist: "Traditional",
    audioUrl: "",
    durationLabel: "4:05",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
  {
    id: "a003",
    title: "Laxmi Aarti – Om Jai Laxmi Mata",
    titleHindi: "ॐ जय लक्ष्मी माता",
    deity: "Goddess Lakshmi",
    faith: "Hindu",
    contentType: "aarti" as ContentType,
    artist: "Traditional",
    audioUrl: "",
    durationLabel: "3:30",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
  {
    id: "a004",
    title: "Shiv Aarti – Om Jai Shiv Omkara",
    titleHindi: "ॐ जय शिव ओंकारा",
    deity: "Lord Shiva",
    faith: "Hindu",
    contentType: "aarti" as ContentType,
    artist: "Traditional",
    audioUrl: "",
    durationLabel: "3:55",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },

  // ── Suktam (3 tracks) ───────────────────────────────────────────────
  {
    id: "s001",
    title: "Purusha Suktam",
    titleHindi: "पुरुष सूक्तम",
    deity: "Lord Vishnu",
    faith: "Hindu",
    contentType: "suktam" as ContentType,
    artist: "Vedic Scholars",
    audioUrl: "",
    durationLabel: "8:45",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
  {
    id: "s002",
    title: "Sri Suktam",
    titleHindi: "श्री सूक्तम",
    deity: "Goddess Lakshmi",
    faith: "Hindu",
    contentType: "suktam" as ContentType,
    artist: "Vedic Scholars",
    audioUrl: "",
    durationLabel: "7:20",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
  {
    id: "s003",
    title: "Devi Suktam",
    titleHindi: "देवी सूक्तम",
    deity: "Goddess Durga",
    faith: "Hindu",
    contentType: "suktam" as ContentType,
    artist: "Vedic Scholars",
    audioUrl: "",
    durationLabel: "9:10",
    thumbnail: "/placeholder-audio.jpg",
    hasMockAudio: true,
  },
];

// Demo format for Bhajan entries (e.g. a Bhajan Library page)
export interface MockBhajanEntry {
  id: string;
  title: string;
  titleHindi: string;
  deity: string;
  faith: string;
  artist: string;
  album?: string;
  durationLabel: string;
  hasMockAudio?: boolean;
}

export const MOCK_BHAJAN_ENTRIES: MockBhajanEntry[] = [
  {
    id: "bh001",
    title: "Jai Ganesh Jai Ganesh Deva",
    titleHindi: "जय गणेश जय गणेश देवा",
    deity: "Lord Ganesha",
    faith: "Hindu",
    artist: "Traditional",
    album: "Ganesh Bhajans",
    durationLabel: "4:12",
    hasMockAudio: true,
  },
  {
    id: "bh002",
    title: "Om Namah Shivaye Bhajan",
    titleHindi: "ॐ नमः शिवाय भजन",
    deity: "Lord Shiva",
    faith: "Hindu",
    artist: "Traditional",
    album: "Shiv Bhajans",
    durationLabel: "5:30",
    hasMockAudio: true,
  },
  {
    id: "bh003",
    title: "Hare Krishna Hare Rama",
    titleHindi: "हरे कृष्ण हरे रामा",
    deity: "Lord Krishna",
    faith: "Hindu",
    artist: "ISKCON",
    album: "Krishna Bhajans",
    durationLabel: "6:15",
    hasMockAudio: true,
  },
  {
    id: "bh004",
    title: "Hanuman Chalisa Bhajan",
    titleHindi: "हनुमान चालीसा भजन",
    deity: "Lord Hanuman",
    faith: "Hindu",
    artist: "Traditional",
    album: "Hanuman Bhajans",
    durationLabel: "7:45",
    hasMockAudio: true,
  },
  {
    id: "bh005",
    title: "Raghupati Raghava Raja Ram",
    titleHindi: "रघुपति राघव राजाराम",
    deity: "Lord Ram",
    faith: "Hindu",
    artist: "Traditional",
    album: "Ram Bhajans",
    durationLabel: "3:55",
    hasMockAudio: true,
  },
];

// Demo format for Katha entries (e.g. a Katha Library page)
export interface MockKathaEntry {
  id: string;
  title: string;
  titleHindi: string;
  deity?: string;
  faith: string;
  narrator: string;
  category: "vrat" | "puran" | "leela" | "other";
  durationLabel: string;
  hasMockAudio?: boolean;
}

export const MOCK_KATHA_ENTRIES: MockKathaEntry[] = [
  {
    id: "kt001",
    title: "Ekadashi Vrat Katha",
    titleHindi: "एकादशी व्रत कथा",
    deity: "Lord Vishnu",
    faith: "Hindu",
    narrator: "Pandit Ji",
    category: "vrat",
    durationLabel: "18:20",
    hasMockAudio: true,
  },
  {
    id: "kt002",
    title: "Satyanarayan Katha",
    titleHindi: "सत्यनारायण कथा",
    deity: "Lord Vishnu",
    faith: "Hindu",
    narrator: "Pandit Ji",
    category: "vrat",
    durationLabel: "24:50",
    hasMockAudio: true,
  },
  {
    id: "kt003",
    title: "Somvar Vrat Katha",
    titleHindi: "सोमवार व्रत कथा",
    deity: "Lord Shiva",
    faith: "Hindu",
    narrator: "Pandit Ji",
    category: "vrat",
    durationLabel: "12:35",
    hasMockAudio: true,
  },
  {
    id: "kt004",
    title: "Shiv Puran Katha",
    titleHindi: "शिव पुराण कथा",
    deity: "Lord Shiva",
    faith: "Hindu",
    narrator: "Pandit Ji",
    category: "puran",
    durationLabel: "35:10",
    hasMockAudio: true,
  },
  {
    id: "kt005",
    title: "Bhagavat Katha – Dasham Skandh",
    titleHindi: "भागवत कथा – दशम स्कंध",
    deity: "Lord Krishna",
    faith: "Hindu",
    narrator: "Pandit Ji",
    category: "leela",
    durationLabel: "42:00",
    hasMockAudio: true,
  },
];
