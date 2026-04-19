// Lo Shu Grid Utility Functions

export interface PlaneAnalysis {
  name: string;
  nameHi: string;
  numbers: number[];
  status: "COMPLETE" | "PARTIAL" | "MISSING";
  meaning: string;
  meaningHi: string;
  positions: [number, number][];
}

export interface NumberMeaning {
  number: number;
  planet: string;
  planetHi: string;
  color: string;
  description: string;
  descriptionHi: string;
}

// Lo Shu Grid layout: [[4,9,2],[3,5,7],[8,1,6]]
const LO_SHU_LAYOUT: number[][] = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

// Position lookup: number -> [row, col]
const NUMBER_POSITIONS: Record<number, [number, number]> = {
  4: [0, 0],
  9: [0, 1],
  2: [0, 2],
  3: [1, 0],
  5: [1, 1],
  7: [1, 2],
  8: [2, 0],
  1: [2, 1],
  6: [2, 2],
};

const PLANES: Array<{
  name: string;
  nameHi: string;
  numbers: number[];
  type: string;
  meaning: string;
  meaningHi: string;
}> = [
  {
    name: "Mental Plane",
    nameHi: "मानसिक तल",
    numbers: [4, 9, 2],
    type: "row",
    meaning:
      "Intellectual abilities, analytical thinking, memory, and mental clarity",
    meaningHi: "बौद्धिक क्षमताएं, विश्लेषणात्मक सोच, स्मरण शक्ति और मानसिक स्पष्टता",
  },
  {
    name: "Emotional Plane",
    nameHi: "भावनात्मक तल",
    numbers: [3, 5, 7],
    type: "row",
    meaning:
      "Emotional balance, sensitivity, intuition, and artistic expression",
    meaningHi: "भावनात्मक संतुलन, संवेदनशीलता, अंतर्ज्ञान और कलात्मक अभिव्यक्ति",
  },
  {
    name: "Practical Plane",
    nameHi: "व्यावहारिक तल",
    numbers: [8, 1, 6],
    type: "row",
    meaning:
      "Material world, physical activities, work ethic, and financial matters",
    meaningHi: "भौतिक संसार, शारीरिक गतिविधियां, कार्य नैतिकता और वित्तीय मामले",
  },
  {
    name: "Thought Plane",
    nameHi: "विचार तल",
    numbers: [4, 3, 8],
    type: "col",
    meaning:
      "Goal-setting, planning, determination, and manifestation of ideas",
    meaningHi: "लक्ष्य निर्धारण, योजना बनाना, दृढ़ संकल्प और विचारों का मूर्त रूप",
  },
  {
    name: "Will Plane",
    nameHi: "इच्छाशक्ति तल",
    numbers: [9, 5, 1],
    type: "col",
    meaning: "Willpower, discipline, focus, and personal determination",
    meaningHi: "इच्छाशक्ति, अनुशासन, एकाग्रता और व्यक्तिगत दृढ़ता",
  },
  {
    name: "Action Plane",
    nameHi: "क्रिया तल",
    numbers: [2, 7, 6],
    type: "col",
    meaning:
      "Action-oriented energy, practical application, and results-focused thinking",
    meaningHi: "क्रिया-उन्मुख ऊर्जा, व्यावहारिक अनुप्रयोग और परिणाम-केंद्रित सोच",
  },
  {
    name: "Spiritual Plane",
    nameHi: "आध्यात्मिक तल",
    numbers: [4, 5, 6],
    type: "diag",
    meaning:
      "Spiritual growth, higher wisdom, metaphysical understanding, and soul purpose",
    meaningHi: "आध्यात्मिक विकास, उच्च ज्ञान, आध्यात्मिक समझ और आत्मा का उद्देश्य",
  },
  {
    name: "Arrow of Prosperity",
    nameHi: "समृद्धि का तीर",
    numbers: [2, 5, 8],
    type: "diag",
    meaning:
      "Material prosperity, wealth attraction, financial abundance, and business success",
    meaningHi: "भौतिक समृद्धि, धन आकर्षण, वित्तीय प्रचुरता और व्यावसायिक सफलता",
  },
];

const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    number: 1,
    planet: "Sun",
    planetHi: "सूर्य",
    color: "#FF9933",
    description:
      "Leadership, individuality, and new beginnings. The Sun's energy empowers self-expression.",
    descriptionHi:
      "नेतृत्व, व्यक्तित्व और नई शुरुआत। सूर्य की ऊर्जा आत्म-अभिव्यक्ति को शक्ति देती है।",
  },
  2: {
    number: 2,
    planet: "Moon",
    planetHi: "चंद्र",
    color: "#C0C0C0",
    description:
      "Sensitivity, cooperation, and emotional depth. Moon energy enhances intuition.",
    descriptionHi:
      "संवेदनशीलता, सहयोग और भावनात्मक गहराई। चंद्र ऊर्जा अंतर्ज्ञान को बढ़ाती है।",
  },
  3: {
    number: 3,
    planet: "Jupiter",
    planetHi: "गुरु",
    color: "#FFD700",
    description:
      "Creativity, expansion, and optimism. Jupiter blesses with wisdom and abundance.",
    descriptionHi:
      "रचनात्मकता, विस्तार और आशावाद। गुरु ज्ञान और समृद्धि से आशीर्वाद देते हैं।",
  },
  4: {
    number: 4,
    planet: "Rahu",
    planetHi: "राहु",
    color: "#4B0082",
    description:
      "Discipline, stability, and hard work. Rahu energy drives ambition and transformation.",
    descriptionHi:
      "अनुशासन, स्थिरता और कठिन परिश्रम। राहु ऊर्जा महत्वाकांक्षा और परिवर्तन को प्रेरित करती है।",
  },
  5: {
    number: 5,
    planet: "Mercury",
    planetHi: "बुध",
    color: "#00A86B",
    description:
      "Freedom, versatility, and communication. Mercury sharpens the intellect.",
    descriptionHi: "स्वतंत्रता, बहुमुखी प्रतिभा और संचार। बुध बुद्धि को तेज करता है।",
  },
  6: {
    number: 6,
    planet: "Venus",
    planetHi: "शुक्र",
    color: "#FF69B4",
    description:
      "Love, harmony, and beauty. Venus brings grace, art, and relationships.",
    descriptionHi: "प्रेम, सद्भाव और सुंदरता। शुक्र अनुग्रह, कला और संबंध लाता है।",
  },
  7: {
    number: 7,
    planet: "Ketu",
    planetHi: "केतु",
    color: "#8B4513",
    description:
      "Spirituality, introspection, and mysticism. Ketu guides toward liberation.",
    descriptionHi:
      "अध्यात्म, आत्म-अवलोकन और रहस्यवाद। केतु मुक्ति की ओर मार्गदर्शन करता है।",
  },
  8: {
    number: 8,
    planet: "Saturn",
    planetHi: "शनि",
    color: "#1C1C1C",
    description:
      "Power, karma, and material mastery. Saturn teaches through discipline and effort.",
    descriptionHi:
      "शक्ति, कर्म और भौतिक महारत। शनि अनुशासन और प्रयास के माध्यम से सिखाता है।",
  },
  9: {
    number: 9,
    planet: "Mars",
    planetHi: "मंगल",
    color: "#FF0000",
    description:
      "Courage, energy, and completion. Mars drives ambition and final achievement.",
    descriptionHi:
      "साहस, ऊर्जा और पूर्णता। मंगल महत्वाकांक्षा और अंतिम उपलब्धि को आगे बढ़ाता है।",
  },
};

export function extractLoShuNumbers(dob: string): number[] {
  return dob
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number)
    .filter((n) => n >= 1 && n <= 9);
}

export function buildGrid(numbers: number[]): number[][] {
  const presence = new Set(numbers);
  return LO_SHU_LAYOUT.map((row) => row.map((n) => (presence.has(n) ? n : 0)));
}

export function getNumberFrequency(numbers: number[]): Record<number, number> {
  const freq: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) freq[i] = 0;
  for (const n of numbers) {
    if (n >= 1 && n <= 9) freq[n] = (freq[n] || 0) + 1;
  }
  return freq;
}

export function analyzePlanes(numbers: number[]): PlaneAnalysis[] {
  const presence = new Set(numbers);
  return PLANES.map((plane) => {
    const presentCount = plane.numbers.filter((n) => presence.has(n)).length;
    let status: "COMPLETE" | "PARTIAL" | "MISSING";
    if (presentCount === plane.numbers.length) status = "COMPLETE";
    else if (presentCount > 0) status = "PARTIAL";
    else status = "MISSING";
    return {
      name: plane.name,
      nameHi: plane.nameHi,
      numbers: plane.numbers,
      status,
      meaning: plane.meaning,
      meaningHi: plane.meaningHi,
      positions: plane.numbers.map((n) => NUMBER_POSITIONS[n]).filter(Boolean),
    };
  });
}

export function getNumberMeaning(num: number): NumberMeaning {
  return NUMBER_MEANINGS[num] || NUMBER_MEANINGS[1];
}

export function getPlaneRemedies(planeName: string, status: string): string[] {
  if (status === "COMPLETE")
    return [
      `Your ${planeName} is fully activated — channel this strength wisely.`,
    ];
  const remedies: Record<string, string[]> = {
    "Mental Plane": [
      "Practice daily meditation",
      "Read spiritual texts",
      "Do brain exercises and puzzles",
    ],
    "Emotional Plane": [
      "Keep a gratitude journal",
      "Practice heart-opening yoga poses",
      "Wear rose quartz",
    ],
    "Practical Plane": [
      "Follow a structured routine",
      "Keep accounts balanced",
      "Plant in soil for grounding",
    ],
    "Thought Plane": [
      "Write goals every morning",
      "Visualize success before sleep",
      "Use Sandalwood tilak",
    ],
    "Will Plane": [
      "Chant Surya mantra at sunrise",
      "Practice Surya Namaskar",
      "Wear ruby or garnet",
    ],
    "Action Plane": [
      "Start each day with action, not planning",
      "Wear copper bracelet",
      "Recite Hanuman Chalisa",
    ],
    "Spiritual Plane": [
      "Practice Om chanting",
      "Visit temple regularly",
      "Keep Sphatik mala",
    ],
    "Arrow of Prosperity": [
      "Place Kuber Yantra at home",
      "Donate on Fridays",
      "Wear green jade bracelet",
    ],
  };
  return (
    remedies[planeName] || [
      "Consult a Vedic numerologist for personalized remedies",
    ]
  );
}
