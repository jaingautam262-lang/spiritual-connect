export interface BusinessPurpose {
  id: string;
  name: string;
  favorableNumbers: number[];
  keywords: string[];
  description: string;
}

export const BUSINESS_PURPOSES: BusinessPurpose[] = [
  {
    id: "Wealth",
    name: "Wealth & Prosperity",
    favorableNumbers: [1, 5, 6, 8],
    keywords: [
      "Dhan",
      "Lakshmi",
      "Samridhi",
      "Artha",
      "Vridhi",
      "Kosh",
      "Nidhi",
      "Dhana",
    ],
    description:
      "For businesses focused on financial growth, investments, and material prosperity.",
  },
  {
    id: "Fame",
    name: "Fame & Recognition",
    favorableNumbers: [1, 3, 9],
    keywords: [
      "Yash",
      "Kirti",
      "Prabhav",
      "Gaurav",
      "Pratap",
      "Tej",
      "Khyati",
      "Prasiddhi",
    ],
    description:
      "For businesses in entertainment, media, arts, and public-facing industries.",
  },
  {
    id: "Stability",
    name: "Stability & Security",
    favorableNumbers: [4, 6, 8],
    keywords: [
      "Sthir",
      "Dhruv",
      "Nishtha",
      "Adhar",
      "Mool",
      "Stambh",
      "Dridh",
      "Suraksha",
    ],
    description:
      "For businesses requiring long-term stability, real estate, and infrastructure.",
  },
  {
    id: "Creativity",
    name: "Creativity & Innovation",
    favorableNumbers: [3, 5, 6],
    keywords: [
      "Srijan",
      "Kala",
      "Rachna",
      "Nava",
      "Udaya",
      "Pratibha",
      "Kalpana",
      "Naveen",
    ],
    description:
      "For creative industries, design, arts, technology, and innovation.",
  },
  {
    id: "Leadership",
    name: "Leadership & Power",
    favorableNumbers: [1, 8, 9],
    keywords: [
      "Neta",
      "Agra",
      "Pramukh",
      "Shreshtha",
      "Uttam",
      "Shikhar",
      "Adhipati",
      "Sarvottam",
    ],
    description:
      "For businesses in management, consulting, politics, and leadership roles.",
  },
  {
    id: "Healing",
    name: "Healing & Wellness",
    favorableNumbers: [2, 6, 7],
    keywords: [
      "Arogya",
      "Swasth",
      "Chikitsa",
      "Aushadh",
      "Jeevan",
      "Prana",
      "Shakti",
      "Sanjivani",
    ],
    description:
      "For healthcare, wellness, spiritual, and healing-focused businesses.",
  },
];
