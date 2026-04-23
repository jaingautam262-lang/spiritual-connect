// ─── Jain Bal Vikas (Child Development) Data ─────────────────────────────────

export interface StoryAudio {
  id: string;
  title: string;
  duration: string;
  category: string;
  status: "available" | "coming-soon";
  description: string;
  narrator?: string;
}

export interface AnimatedMovie {
  id: string;
  title: string;
  year: string;
  duration: string;
  category: string;
  status: "available" | "coming-soon";
  description: string;
  director?: string;
}

export interface StoryBook {
  id: string;
  title: string;
  author: string;
  pages: number;
  ageGroup: string;
  status: "available" | "coming-soon";
  description: string;
  coverPlaceholder?: string;
}

// ─── Story Audios ─────────────────────────────────────────────────────────────

export const storyAudios: StoryAudio[] = [
  {
    id: "story-1",
    title: "महावीर स्वामी की बाल कथा",
    duration: "5:30",
    category: "Tirthankar Stories",
    status: "coming-soon",
    description: "भगवान महावीर के बचपन की प्रेरणादायक कहानी।",
    narrator: "स्वर: साधना मिश्रा",
  },
  {
    id: "story-2",
    title: "भक्त श्रेणिक की कथा",
    duration: "4:45",
    category: "Devotee Stories",
    status: "coming-soon",
    description: "राजा श्रेणिक की भक्ति और आस्था की कहानी।",
    narrator: "स्वर: रमेश शर्मा",
  },
  {
    id: "story-3",
    title: "आदिनाथ और भरत चक्रवर्ती",
    duration: "6:15",
    category: "Tirthankar Stories",
    status: "coming-soon",
    description: "प्रथम तीर्थंकर आदिनाथ और उनके पुत्र भरत की कहानी।",
  },
  {
    id: "story-4",
    title: "सती चंदनबाला",
    duration: "7:00",
    category: "Sadhvi Stories",
    status: "coming-soon",
    description: "साध्वी चंदनबाला की करुणामयी कहानी।",
  },
  {
    id: "story-5",
    title: "अहिंसा परमो धर्मः",
    duration: "3:30",
    category: "Values Stories",
    status: "coming-soon",
    description: "अहिंसा के महत्व को समझाती एक मनोरम बाल कथा।",
  },
  {
    id: "story-6",
    title: "नेमिनाथ और राजीमती",
    duration: "8:00",
    category: "Tirthankar Stories",
    status: "coming-soon",
    description: "बाईसवें तीर्थंकर नेमिनाथ और राजीमती की कथा।",
  },
  {
    id: "story-7",
    title: "उगादित्य मुनि की कथा",
    duration: "5:00",
    category: "Muni Stories",
    status: "coming-soon",
    description: "एक महान मुनि की वैराग्य और तपस्या की कहानी।",
  },
];

// ─── Animated Movies ──────────────────────────────────────────────────────────

export const animatedMovies: AnimatedMovie[] = [
  {
    id: "movie-1",
    title: "भगवान महावीर — एनिमेटेड",
    year: "2019",
    duration: "45 min",
    category: "Tirthankar",
    status: "coming-soon",
    description: "भगवान महावीर के जीवन पर आधारित एनिमेटेड फिल्म।",
    director: "निर्देशक: अनिल जैन",
  },
  {
    id: "movie-2",
    title: "आदिनाथ — प्रथम तीर्थंकर",
    year: "2021",
    duration: "38 min",
    category: "Tirthankar",
    status: "coming-soon",
    description: "प्रथम तीर्थंकर ऋषभदेव के जीवन की एनिमेटेड कहानी।",
    director: "निर्देशक: प्रकाश श्रेयांस",
  },
];

// ─── Story Books ──────────────────────────────────────────────────────────────

export const storyBooks: StoryBook[] = [
  {
    id: "book-1",
    title: "जैन बाल कथाएँ — भाग 1",
    author: "संग्रह",
    pages: 120,
    ageGroup: "6-10 वर्ष",
    status: "available",
    description: "बच्चों के लिए जैन नैतिक कहानियों का संग्रह।",
    coverPlaceholder: "/assets/images/placeholder.svg",
  },
  {
    id: "book-2",
    title: "तीर्थंकर कथाएँ",
    author: "संग्रह",
    pages: 200,
    ageGroup: "8-14 वर्ष",
    status: "available",
    description: "चौबीस तीर्थंकरों की सरल हिंदी में कहानियाँ।",
    coverPlaceholder: "/assets/images/placeholder.svg",
  },
  {
    id: "book-3",
    title: "अहिंसा की कहानियाँ",
    author: "आचार्य संग्रह",
    pages: 80,
    ageGroup: "5-9 वर्ष",
    status: "coming-soon",
    description: "अहिंसा और करुणा की बाल कहानियाँ।",
    coverPlaceholder: "/assets/images/placeholder.svg",
  },
  {
    id: "book-4",
    title: "मुनि की कहानियाँ",
    author: "संग्रह",
    pages: 150,
    ageGroup: "10-16 वर्ष",
    status: "available",
    description: "जैन मुनियों के त्याग और तपस्या की कहानियाँ।",
    coverPlaceholder: "/assets/images/placeholder.svg",
  },
  {
    id: "book-5",
    title: "जैन पर्व और उत्सव",
    author: "संग्रह",
    pages: 100,
    ageGroup: "6-12 वर्ष",
    status: "coming-soon",
    description: "जैन पर्वों और उत्सवों का बच्चों के लिए परिचय।",
    coverPlaceholder: "/assets/images/placeholder.svg",
  },
];
