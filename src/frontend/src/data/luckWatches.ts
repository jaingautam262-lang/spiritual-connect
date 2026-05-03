export interface LuckWatch {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  availability: "in-stock" | "pre-order" | "sold-out";
  gender: "unisex" | "female" | "male";
  dialColor: string;
  strapColor: string;
  romanNumerals: "full" | "half" | "numeric" | "none";
  description: string;
  numerologyNumbers: number[];
  luckyFor: string[];
  image: string;
  tags: string[];
  productType: string[];
}

export const LUCK_WATCHES: LuckWatch[] = [
  {
    id: "green-golden-female",
    name: "The Green Dial – Golden Strap Watch (Female)",
    price: 24000,
    availability: "in-stock",
    gender: "female",
    dialColor: "green",
    strapColor: "golden",
    romanNumerals: "none",
    description:
      "A stunning feminine timepiece featuring a vibrant green dial paired with an elegant golden strap. Green resonates with Mercury energy, amplifying creativity, communication, and growth for Moolank 3, 6, and 9.",
    numerologyNumbers: [3, 6, 9],
    luckyFor: [
      "Moolank 3",
      "Moolank 6",
      "Moolank 9",
      "Bhagyank 3",
      "Bhagyank 6",
      "Bhagyank 9",
    ],
    image: "/assets/images/luck-watch-green-golden-female.jpg",
    tags: ["female watches", "Luck Watch", "Watch"],
    productType: ["female watches", "Luck Watch", "Watch"],
  },
  {
    id: "green-full-roman",
    name: "Green Luck Watch – Full Roman",
    price: 24000,
    availability: "in-stock",
    gender: "unisex",
    dialColor: "green",
    strapColor: "green",
    romanNumerals: "full",
    description:
      "A bold all-green statement watch with full Roman numerals on the dial. Harnesses the power of Mercury's green frequency to attract abundance, intellect, and harmonious relationships for numbers 3, 6, and 9.",
    numerologyNumbers: [3, 6, 9],
    luckyFor: [
      "Moolank 3",
      "Moolank 6",
      "Moolank 9",
      "Bhagyank 3",
      "Bhagyank 6",
      "Bhagyank 9",
    ],
    image: "/assets/images/luck-watch-green-full-roman.jpg",
    tags: ["Luck Watch", "Watch", "#BATRAATBN"],
    productType: ["Luck Watch", "Watch"],
  },
  {
    id: "green-dual-tone-female",
    name: "Green With Dual Tone Strap Watch (Female)",
    price: 24000,
    availability: "in-stock",
    gender: "female",
    dialColor: "green",
    strapColor: "dual-tone",
    romanNumerals: "none",
    description:
      "A graceful feminine watch with a green dial and dual-tone strap blending two metals. The combination balances earthy and celestial energies, making it ideal for women governed by Venus and Mercury vibrations.",
    numerologyNumbers: [3, 6, 9],
    luckyFor: [
      "Moolank 3",
      "Moolank 6",
      "Moolank 9",
      "Bhagyank 6",
      "Bhagyank 9",
    ],
    image: "/assets/images/luck-watch-green-dual-tone-female.jpg",
    tags: ["female watches", "Luck Watch", "Watch"],
    productType: ["female watches", "Luck Watch", "Watch"],
  },
  {
    id: "green-half-roman",
    name: "Green Luck Watch – Half Roman",
    price: 24000,
    availability: "in-stock",
    gender: "unisex",
    dialColor: "green",
    strapColor: "green",
    romanNumerals: "half",
    description:
      "An elegant unisex watch with a green dial featuring half Roman numerals for a modern aesthetic. Balances traditional numerological wisdom with contemporary style, channeling Mercury's intelligence and prosperity.",
    numerologyNumbers: [3, 6, 9],
    luckyFor: [
      "Moolank 3",
      "Moolank 6",
      "Moolank 9",
      "Bhagyank 3",
      "Bhagyank 6",
    ],
    image: "/assets/images/luck-watch-green-half-roman.jpg",
    tags: ["Luck Watch", "Watch", "#BATRATBN"],
    productType: ["Luck Watch", "Watch"],
  },
  {
    id: "white-dual-tone-female",
    name: "The White Dial – Dual Tone Strap Watch (Female)",
    price: 24000,
    availability: "in-stock",
    gender: "female",
    dialColor: "white",
    strapColor: "dual-tone",
    romanNumerals: "none",
    description:
      "A pristine white dial watch with a dual-tone strap exuding purity and elegance. White embodies Moon and Sun vibrations, making it powerfully auspicious for those with Moolank 1, 2, and 4 seeking clarity and success.",
    numerologyNumbers: [1, 2, 4],
    luckyFor: [
      "Moolank 1",
      "Moolank 2",
      "Moolank 4",
      "Bhagyank 1",
      "Bhagyank 2",
      "Bhagyank 4",
    ],
    image: "/assets/images/luck-watch-white-dual-tone-female.jpg",
    tags: ["female watches", "Luck Watch", "Watch"],
    productType: ["female watches", "Luck Watch", "Watch"],
  },
  {
    id: "white-full-roman",
    name: "White Luck Watch – Full Roman",
    price: 24000,
    availability: "in-stock",
    gender: "unisex",
    dialColor: "white",
    strapColor: "white",
    romanNumerals: "full",
    description:
      "A clean, all-white unisex watch with full Roman numerals — the embodiment of lunar purity and solar strength. Activates leadership energy and intuitive power for numbers aligned with Sun, Moon, and Rahu vibrations.",
    numerologyNumbers: [1, 2, 4],
    luckyFor: [
      "Moolank 1",
      "Moolank 2",
      "Moolank 4",
      "Bhagyank 1",
      "Bhagyank 2",
    ],
    image: "/assets/images/luck-watch-white-full-roman.jpg",
    tags: ["Luck Watch", "Watch"],
    productType: ["Luck Watch", "Watch"],
  },
  {
    id: "golden-silver-full-roman",
    name: "Golden Silver Luck Watch – Full Roman",
    price: 24000,
    availability: "pre-order",
    gender: "unisex",
    dialColor: "silver",
    strapColor: "golden",
    romanNumerals: "full",
    description:
      "An exquisite pre-order watch combining a silver dial with a golden strap and full Roman numerals. The golden-silver fusion channels Sun and Saturn energy — perfect for those seeking wealth manifestation and karmic balance with numbers 1, 4, and 8.",
    numerologyNumbers: [1, 4, 8],
    luckyFor: [
      "Moolank 1",
      "Moolank 4",
      "Moolank 8",
      "Bhagyank 1",
      "Bhagyank 4",
      "Bhagyank 8",
    ],
    image: "/assets/images/luck-watch-golden-silver-full-roman.jpg",
    tags: ["Luck Watch", "Watch", "pre-order"],
    productType: ["Luck Watch", "Watch", "pre-order"],
  },
  {
    id: "gold-full-roman-white",
    name: "Gold Luck Watch – Full Roman (White Dial)",
    price: 24000,
    availability: "in-stock",
    gender: "unisex",
    dialColor: "white",
    strapColor: "gold",
    romanNumerals: "full",
    description:
      "A prestigious watch featuring a white dial with full Roman numerals on a rich gold strap. The white-gold combination amplifies Sun and Saturn energies, drawing in authority, discipline, and material abundance for numbers 1, 4, and 8.",
    numerologyNumbers: [1, 4, 8],
    luckyFor: [
      "Moolank 1",
      "Moolank 4",
      "Moolank 8",
      "Bhagyank 4",
      "Bhagyank 8",
    ],
    image: "/assets/images/luck-watch-gold-full-roman-white.jpg",
    tags: ["Luck Watch", "Watch"],
    productType: ["Luck Watch", "Watch"],
  },
  {
    id: "golden-full-roman",
    name: "Golden Luck Watch – Full Roman",
    price: 24000,
    availability: "sold-out",
    gender: "unisex",
    dialColor: "gold",
    strapColor: "golden",
    romanNumerals: "full",
    description:
      "The ultimate all-gold numerology watch with full Roman numerals — commanding wealth, power, and solar authority. This sold-out masterpiece channels pure Sun energy, making it supremely auspicious for Moolank and Bhagyank 1, 4, and 8.",
    numerologyNumbers: [1, 4, 8],
    luckyFor: [
      "Moolank 1",
      "Moolank 4",
      "Moolank 8",
      "Bhagyank 1",
      "Bhagyank 8",
    ],
    image: "/assets/images/luck-watch-golden-full-roman.jpg",
    tags: ["Luck Watch", "Watch"],
    productType: ["Luck Watch", "Watch"],
  },
  {
    id: "white-numeric",
    name: "White Luck Watch – Numeric",
    price: 6000,
    originalPrice: 24000,
    availability: "sold-out",
    gender: "unisex",
    dialColor: "white",
    strapColor: "white",
    romanNumerals: "numeric",
    description:
      "A minimalist all-white watch with clean numeric markers — the purest expression of lunar clarity and simplicity. Ideal for those with numbers 1, 2, and 4 who value understated elegance and Moon-aligned energy in everyday life.",
    numerologyNumbers: [1, 2, 4],
    luckyFor: [
      "Moolank 1",
      "Moolank 2",
      "Moolank 4",
      "Bhagyank 2",
      "Bhagyank 4",
    ],
    image: "/assets/images/luck-watch-white-numeric.jpg",
    tags: ["Luck Watch", "Watch"],
    productType: ["Luck Watch", "Watch"],
  },
];

export interface WatchFilterConfig {
  availabilityOptions: Array<{ value: string; label: string; count: number }>;
  priceRange: { min: number; max: number };
  productTypes: Array<{ value: string; label: string; count: number }>;
}

export const WATCH_FILTER_CONFIG: WatchFilterConfig = {
  availabilityOptions: [
    {
      value: "in-stock",
      label: "In stock",
      count: LUCK_WATCHES.filter((w) => w.availability === "in-stock").length,
    },
    {
      value: "pre-order",
      label: "Pre-order",
      count: LUCK_WATCHES.filter((w) => w.availability === "pre-order").length,
    },
    {
      value: "sold-out",
      label: "Out of stock",
      count: LUCK_WATCHES.filter((w) => w.availability === "sold-out").length,
    },
  ],
  priceRange: { min: 0, max: 24000 },
  productTypes: Array.from(
    LUCK_WATCHES.reduce((acc, watch) => {
      for (const type of watch.productType) {
        acc.set(type, (acc.get(type) ?? 0) + 1);
      }
      return acc;
    }, new Map<string, number>()),
  ).map(([value, count]) => ({ value, label: value, count })),
};

/**
 * Returns all Luck Watches whose numerologyNumbers include the given Moolank or Bhagyank number.
 */
export function getLuckWatchesForNumber(moolank: number): LuckWatch[] {
  return LUCK_WATCHES.filter((watch) =>
    watch.numerologyNumbers.includes(moolank),
  );
}
