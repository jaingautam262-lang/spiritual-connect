export interface NumerologyWatch {
  id: string;
  number: number;
  name: string;
  price: number;
  mrp: number;
  description: string;
  luckyColor: string;
  luckyGem: string;
  luckyDays: string[];
  dialColor: string;
  rulingPlanet: string;
  personality: string;
  benefits: string;
  material: string;
  caseSize: string;
  image: string;
  inStock: boolean;
}

export const NUMEROLOGY_WATCHES: NumerologyWatch[] = [
  {
    id: "nw-1",
    number: 1,
    name: "Sun Sovereign — Number 1 Timepiece",
    price: 18000,
    mrp: 24000,
    description:
      "Radiant golden yellow dial channeling the dynamic energy of the Sun. Designed for natural-born leaders who command attention and initiate bold beginnings. The warm hue resonates with solar vitality, amplifying your inherent drive and authority.",
    luckyColor: "Golden Yellow",
    luckyGem: "Ruby (Manik)",
    luckyDays: ["Sunday", "Monday"],
    dialColor: "#D4A017",
    rulingPlanet: "Sun (Surya)",
    personality:
      "You are a trailblazing leader who thrives on independence, originality, and the courage to forge new paths.",
    benefits:
      "Boosts confidence and self-expression. Enhances leadership qualities and decision-making. Attracts recognition, success in career, and new beginnings. Strengthens willpower and vitality.",
    material: "Premium Quartz, Sapphire Crystal Glass",
    caseSize: "40mm",
    image: "/assets/images/watch-placeholder.jpg",
    inStock: true,
  },
  {
    id: "nw-2",
    number: 2,
    name: "Moon Harmony — Number 2 Timepiece",
    price: 12000,
    mrp: 16000,
    description:
      "Soft pearl white dial reflecting the gentle luminescence of the Moon. Crafted for empathic souls who navigate life through emotional intelligence and deep intuition. The serene white tone fosters inner calm and strengthens bonds.",
    luckyColor: "Pearl White",
    luckyGem: "Pearl (Moti) / Moonstone",
    luckyDays: ["Monday"],
    dialColor: "#F5F0E8",
    rulingPlanet: "Moon (Chandra)",
    personality:
      "You are a deeply intuitive empath who finds strength in emotional sensitivity, cooperation, and nurturing relationships.",
    benefits:
      "Cultivates emotional balance and intuitive clarity. Deepens personal and romantic relationships. Supports mental peace and stress relief. Enhances creativity and receptive energy.",
    material: "Premium Quartz, Sapphire Crystal Glass",
    caseSize: "40mm",
    image: "/assets/images/watch-placeholder.jpg",
    inStock: true,
  },
  {
    id: "nw-3",
    number: 3,
    name: "Jupiter Bloom — Number 3 Timepiece",
    price: 15000,
    mrp: 20000,
    description:
      "Majestic royal blue dial embodying Jupiter's expansive wisdom. Made for creative visionaries who radiate joy, communicate with ease, and perpetually seek growth. The deep blue hue resonates with higher knowledge and abundant thinking.",
    luckyColor: "Royal Blue",
    luckyGem: "Yellow Sapphire (Pukhraj)",
    luckyDays: ["Thursday"],
    dialColor: "#1A3A6B",
    rulingPlanet: "Jupiter (Brihaspati)",
    personality:
      "You are a joyful, creative optimist whose natural charisma and expressive gifts inspire everyone around you.",
    benefits:
      "Amplifies creativity, self-expression, and artistic talent. Attracts abundance, luck, and spiritual growth. Enhances communication and social charm. Supports educational and philosophical pursuits.",
    material: "Premium Quartz, Sapphire Crystal Glass",
    caseSize: "40mm",
    image: "/assets/images/watch-placeholder.jpg",
    inStock: true,
  },
  {
    id: "nw-4",
    number: 4,
    name: "Rahu Anchor — Number 4 Timepiece",
    price: 8000,
    mrp: 11000,
    description:
      "Grounded dark grey graphite dial channeling Rahu's transformative, disciplined energy. Built for diligent workers who build lasting foundations through patience and perseverance. The charcoal tone reflects unwavering stability.",
    luckyColor: "Dark Grey / Graphite",
    luckyGem: "Gomed (Hessonite Garnet)",
    luckyDays: ["Saturday"],
    dialColor: "#3A3A3A",
    rulingPlanet: "Rahu",
    personality:
      "You are a methodical, dependable builder whose commitment to hard work and structure creates enduring achievements.",
    benefits:
      "Reinforces discipline, stability, and groundedness. Supports overcoming karmic obstacles and Rahu-related challenges. Enhances focus on long-term goals. Attracts material security and steady progress.",
    material: "Premium Quartz, Sapphire Crystal Glass",
    caseSize: "40mm",
    image: "/assets/images/watch-placeholder.jpg",
    inStock: true,
  },
  {
    id: "nw-5",
    number: 5,
    name: "Mercury Flow — Number 5 Timepiece",
    price: 14000,
    mrp: 18500,
    description:
      "Vibrant emerald green dial pulsing with Mercury's mercurial intelligence. Designed for quick-minded communicators who thrive on change, travel, and versatile thinking. The fresh green hue stimulates mental agility and new opportunities.",
    luckyColor: "Emerald Green",
    luckyGem: "Emerald (Panna)",
    luckyDays: ["Wednesday"],
    dialColor: "#2D6A4F",
    rulingPlanet: "Mercury (Budh)",
    personality:
      "You are a witty, adaptable communicator who thrives in dynamic environments and embraces change as opportunity.",
    benefits:
      "Sharpens intellect, communication, and persuasion skills. Supports business negotiations and commercial success. Enhances travel luck and new experiences. Boosts mental clarity and quick decision-making.",
    material: "Premium Quartz, Sapphire Crystal Glass",
    caseSize: "40mm",
    image: "/assets/images/watch-placeholder.jpg",
    inStock: true,
  },
  {
    id: "nw-6",
    number: 6,
    name: "Venus Grace — Number 6 Timepiece",
    price: 22000,
    mrp: 30000,
    description:
      "Exquisite pink rose gold dial resonating with Venus's divine magnetism. Crafted for lovers of beauty, harmony, and artistic refinement. The rose-gold hue attracts romantic love, aesthetic pleasure, and harmonious home life.",
    luckyColor: "Pink / Rose Gold",
    luckyGem: "Diamond / White Sapphire",
    luckyDays: ["Friday"],
    dialColor: "#C87A8A",
    rulingPlanet: "Venus (Shukra)",
    personality:
      "You are a loving, aesthetically attuned soul who brings beauty and harmony to every relationship and environment you touch.",
    benefits:
      "Magnetizes romantic love and deepens existing relationships. Enhances artistic ability, fashion sense, and aesthetic vision. Attracts luxury, comfort, and social grace. Promotes emotional healing and self-worth.",
    material: "Premium Quartz, Sapphire Crystal Glass",
    caseSize: "40mm",
    image: "/assets/images/watch-placeholder.jpg",
    inStock: true,
  },
  {
    id: "nw-7",
    number: 7,
    name: "Ketu Mystic — Number 7 Timepiece",
    price: 9000,
    mrp: 12500,
    description:
      "Contemplative violet purple dial aligned with Ketu's mystical, otherworldly frequency. Designed for spiritual seekers, researchers, and introverted wisdom-keepers who draw truth from within. The purple hue enhances psychic sensitivity.",
    luckyColor: "Violet / Purple",
    luckyGem: "Cat's Eye (Lahsuniya)",
    luckyDays: ["Saturday"],
    dialColor: "#6B3FA0",
    rulingPlanet: "Ketu",
    personality:
      "You are a deep, introspective seeker whose spiritual wisdom and analytical mind uncover truths others cannot perceive.",
    benefits:
      "Deepens meditation, spiritual practice, and inner wisdom. Enhances psychic intuition and analytical ability. Supports moksha-oriented pursuits and karmic resolution. Protects from hidden enemies and negative energies.",
    material: "Premium Quartz, Sapphire Crystal Glass",
    caseSize: "40mm",
    image: "/assets/images/watch-placeholder.jpg",
    inStock: true,
  },
  {
    id: "nw-8",
    number: 8,
    name: "Saturn Titan — Number 8 Timepiece",
    price: 16000,
    mrp: 22000,
    description:
      "Powerful black charcoal dial channeling Saturn's karmic authority. Designed for high-achievers who transform effort into empire through iron discipline and long-term strategic vision. The deep black dial reflects Saturn's timeless power.",
    luckyColor: "Black / Charcoal",
    luckyGem: "Blue Sapphire (Neelam)",
    luckyDays: ["Saturday"],
    dialColor: "#1A1A1A",
    rulingPlanet: "Saturn (Shani)",
    personality:
      "You are a relentless, disciplined achiever who transforms obstacles into steppingstones toward monumental success.",
    benefits:
      "Amplifies discipline, perseverance, and strategic thinking. Accelerates career success and professional recognition. Harnesses Shani's karmic energy for righteous rewards. Attracts financial abundance through sustained effort.",
    material: "Premium Quartz, Sapphire Crystal Glass",
    caseSize: "40mm",
    image: "/assets/images/watch-placeholder.jpg",
    inStock: true,
  },
  {
    id: "nw-9",
    number: 9,
    name: "Mars Valor — Number 9 Timepiece",
    price: 13000,
    mrp: 17500,
    description:
      "Fierce deep red dial ignited by Mars's warrior energy. Created for courageous fighters, athletes, and humanitarians who act boldly in the service of higher ideals. The deep crimson resonates with passion, bravery, and unstoppable drive.",
    luckyColor: "Deep Red",
    luckyGem: "Red Coral (Moonga)",
    luckyDays: ["Tuesday"],
    dialColor: "#8B0000",
    rulingPlanet: "Mars (Mangal)",
    personality:
      "You are a bold, passionate warrior whose fierce courage and humanitarian heart drive you to fight for justice and transformation.",
    benefits:
      "Ignites courage, willpower, and competitive drive. Supports athletic performance and physical vitality. Enhances leadership in challenging situations. Amplifies passion and helps overcome fear and hesitation.",
    material: "Premium Quartz, Sapphire Crystal Glass",
    caseSize: "40mm",
    image: "/assets/images/watch-placeholder.jpg",
    inStock: true,
  },
  {
    id: "nw-11",
    number: 11,
    name: "Master Illuminator — Number 11 Timepiece",
    price: 24000,
    mrp: 32000,
    description:
      "Transcendent dual-tone silver and gold dial embodying the Master Number 11's divine frequency. The rarest piece in the collection, designed for visionary spiritual leaders and enlightened teachers who bridge the material and divine realms.",
    luckyColor: "Silver + Gold (Dual-Tone)",
    luckyGem: "Clear Quartz (Sphatik)",
    luckyDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    dialColor: "linear-gradient(135deg, #C0C0C0, #FFD700)",
    rulingPlanet: "Moon + Sun (Combined)",
    personality:
      "You are a rare master soul — an intuitive visionary whose heightened spiritual awareness and inspirational gifts illuminate the path for others.",
    benefits:
      "Activates master number energy and heightened intuition. Bridges spiritual and material success simultaneously. Enhances psychic gifts, visionary thinking, and divine inspiration. Ideal for healers, teachers, and spiritual leaders.",
    material: "Premium Quartz, Sapphire Crystal Glass",
    caseSize: "40mm",
    image: "/assets/images/watch-placeholder.jpg",
    inStock: true,
  },
];
