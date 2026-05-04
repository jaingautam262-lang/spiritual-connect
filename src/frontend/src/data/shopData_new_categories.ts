import type { ProductWithMRP } from "./shopData_new";

// ─── Energized Gemstones ───────────────────────────────────────────────────
export const ENERGIZED_GEMSTONES: ProductWithMRP[] = [
  // ── Amethyst ─────────────────────────────────────────────────────────────
  {
    id: "gem-001",
    name: "Natural Amethyst Gemstone (4-5 Ratti)",
    category: "Energized Gemstones",
    price: 799,
    mrp: 1499,
    description:
      "100% natural Amethyst certified and energized with Shani mantras for 108 hours. Ideal for Saturn-related issues, stress relief and spiritual awakening. Each stone comes with a lab authenticity certificate.",
    benefits:
      "Stress relief, Spiritual growth, Saturn pacification, Mental clarity",
    astrologicalPurpose:
      "Saturn (Shani) — Shani Ratna for Capricorn and Aquarius",
    stock: BigInt(50),
    createdAt: BigInt(0),
    variants: [
      { id: "gem-001-a", name: "3-4 Ratti", price: 599, stock: 30 },
      { id: "gem-001-b", name: "4-5 Ratti", price: 799, stock: 30 },
      { id: "gem-001-c", name: "5-6 Ratti", price: 1099, stock: 20 },
      { id: "gem-001-d", name: "7-8 Ratti", price: 1499, stock: 15 },
    ],
  },
  // ── Blue Sapphire (Neelam) ────────────────────────────────────────────────
  {
    id: "gem-002",
    name: "Blue Sapphire Neelam (3-4 Ratti)",
    category: "Energized Gemstones",
    price: 3999,
    mrp: 7999,
    description:
      "Certified original Blue Sapphire Neelam, energized with Shani beej mantra. Known as one of the fastest acting gemstones, bringing prosperity and removing obstacles when suitable for the wearer. Comes with GIA/IGI lab certificate.",
    benefits:
      "Rapid success, Obstacle removal, Saturn blessing, Wealth & promotion",
    astrologicalPurpose:
      "Saturn (Shani) — primary Navratna gemstone for Saturn",
    stock: BigInt(20),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-002-a",
        name: "SKU BS17050001 | 3-4 Ratti",
        price: 3999,
        stock: 10,
      },
      {
        id: "gem-002-b",
        name: "SKU BS17050002 | 4-5 Ratti",
        price: 5499,
        stock: 8,
      },
      {
        id: "gem-002-c",
        name: "SKU BS17050003 | 5-6 Ratti",
        price: 7499,
        stock: 5,
      },
      {
        id: "gem-002-d",
        name: "SKU BS17050004 | 6-7 Ratti",
        price: 9999,
        stock: 4,
      },
      {
        id: "gem-002-e",
        name: "SKU BS17050005 | 7-8 Ratti",
        price: 13999,
        stock: 3,
      },
      {
        id: "gem-002-f",
        name: "SKU BS17050006 | 8-9 Ratti",
        price: 17999,
        stock: 2,
      },
      {
        id: "gem-002-g",
        name: "SKU BS17050007 | 9-10 Ratti",
        price: 21999,
        stock: 2,
      },
      {
        id: "gem-002-h",
        name: "SKU BS17050008 | 10-11 Ratti",
        price: 26999,
        stock: 1,
      },
      {
        id: "gem-002-i",
        name: "SKU BS17050009 | Above 11 Ratti",
        price: 33999,
        stock: 1,
      },
      {
        id: "gem-002-j",
        name: "SKU BS17050010 | Cushion Cut",
        price: 4499,
        stock: 5,
      },
      {
        id: "gem-002-k",
        name: "SKU BS17050011 | Oval Cut",
        price: 5999,
        stock: 5,
      },
    ],
  },
  // ── Blue Spinel (Neeli) ───────────────────────────────────────────────────
  {
    id: "gem-003",
    name: "Blue Spinel Gemstone — Neeli Stone",
    category: "Energized Gemstones",
    price: 4123,
    mrp: 4740,
    description:
      "Natural Blue Spinel (Neeli), an affordable substitute for Blue Sapphire, energized for Saturn's blessings. Prana-Pratishtha certified, available in multiple oval-cut specimens.",
    benefits:
      "Saturn pacification, Career discipline, Focus enhancement, Affordable Neelam substitute",
    astrologicalPurpose: "Saturn (Shani) — upratna substitute for Neelam",
    stock: BigInt(40),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-003-a",
        name: "SKU BP17050001 | Oval Shape",
        price: 4123,
        stock: 15,
      },
      {
        id: "gem-003-b",
        name: "SKU BP17050002 | Oval Shape",
        price: 5325,
        stock: 12,
      },
      {
        id: "gem-003-c",
        name: "SKU BP17050006 | Oval Shape",
        price: 4250,
        stock: 13,
      },
    ],
  },
  // ── Coral (Moonga) ────────────────────────────────────────────────────────
  {
    id: "gem-004",
    name: "Italian Coral Gemstone — Moonga (मूंगा)",
    category: "Energized Gemstones",
    price: 3650,
    mrp: 4200,
    description:
      "Certified Italian and Sri Lanka origin natural red Coral (Moonga), energized with Mangal mantras in Prana-Pratishtha ceremony. Available in Capsule and Triangle shapes. Lab-tested, Government of India certified.",
    benefits:
      "Courage boost, Mars affliction remedy, Blood disorder relief, Energy enhancement",
    astrologicalPurpose: "Mars (Mangal) — primary ratna for Aries & Scorpio",
    stock: BigInt(50),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-004-a",
        name: "SKU CO17050001 | Capsule Shape",
        price: 3650,
        stock: 8,
      },
      {
        id: "gem-004-b",
        name: "SKU CO17050002 | Triangle Shape (16% off)",
        price: 8785,
        stock: 5,
      },
      {
        id: "gem-004-c",
        name: "SKU CO17050003 | Triangle Shape",
        price: 8785,
        stock: 5,
      },
      {
        id: "gem-004-d",
        name: "SKU CO17050004 | Triangle Shape (14% off)",
        price: 8586,
        stock: 5,
      },
      {
        id: "gem-004-e",
        name: "SKU CO17050005 | Triangle Shape (13% off)",
        price: 8650,
        stock: 4,
      },
      {
        id: "gem-004-f",
        name: "SKU CO17050006 | Triangle Shape (17% off)",
        price: 8500,
        stock: 4,
      },
      {
        id: "gem-004-g",
        name: "SKU CO17050007 | Triangle Shape",
        price: 8400,
        stock: 4,
      },
      {
        id: "gem-004-h",
        name: "SKU CO17050008 | Triangle Shape",
        price: 9020,
        stock: 4,
      },
      {
        id: "gem-004-i",
        name: "SKU CO17050009 | Capsule Shape",
        price: 4365,
        stock: 5,
      },
      {
        id: "gem-004-j",
        name: "SKU CO17050010 | Capsule Shape",
        price: 7650,
        stock: 4,
      },
      {
        id: "gem-004-k",
        name: "SKU CO17050011 | Triangle Shape (11% off)",
        price: 8750,
        stock: 4,
      },
      {
        id: "gem-004-l",
        name: "SKU CO17050012 | Triangle Shape (15% off)",
        price: 8400,
        stock: 3,
      },
      {
        id: "gem-004-m",
        name: "SKU CO17050013 | Sri Lanka Coral, Capsule",
        price: 6240,
        stock: 4,
      },
      {
        id: "gem-004-n",
        name: "SKU CO17050014 | Sri Lanka Coral, Capsule",
        price: 7140,
        stock: 3,
      },
      {
        id: "gem-004-o",
        name: "SKU CO17050015 | Sri Lanka Coral, Capsule",
        price: 5150,
        stock: 4,
      },
    ],
  },
  // ── Crystal (Sphatik) ─────────────────────────────────────────────────────
  {
    id: "gem-005",
    name: "Crystal Gemstone — Sphatik Stone (स्फटिक)",
    category: "Energized Gemstones",
    price: 1047,
    mrp: 1204,
    description:
      "Pure Sphatik (Crystal) gemstone in Oval shape, energized with Venus mantras. Ideal for puja, meditation and attracting positive energy, peace and clarity into the home. Lab-certified and Prana-Pratishtha activated.",
    benefits: "Home peace, Positive energy, Venus blessings, Meditation aid",
    astrologicalPurpose: "Venus (Shukra) — clarity and spiritual purification",
    stock: BigInt(60),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-005-a",
        name: "SKU CR17050001 | Oval Shape",
        price: 1988,
        stock: 25,
      },
      {
        id: "gem-005-b",
        name: "SKU CR17050002 | Oval Shape",
        price: 1047,
        stock: 25,
      },
    ],
  },
  // ── Cat's Eye (Lahsuniya) ─────────────────────────────────────────────────
  {
    id: "gem-006",
    name: "Cat's Eye Gemstone — Lehsunia (लेसुनिया)",
    category: "Energized Gemstones",
    price: 2633,
    mrp: 3028,
    description:
      "Original Ceylon Cat's Eye Chrysoberyl (Lehsunia), energized with Ketu mantras in Prana-Pratishtha ceremony. Available in Round and Oval shapes. Provides protection from occult influences and brings spiritual insight.",
    benefits:
      "Ketu pacification, Occult protection, Spiritual intuition, Sudden loss prevention",
    astrologicalPurpose:
      "Ketu — shadow planet gemstone for spirituality and liberation",
    stock: BigInt(20),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-006-a",
        name: "SKU CT17050001 | Round Shape (14% off)",
        price: 7475,
        stock: 8,
      },
      {
        id: "gem-006-b",
        name: "SKU CT17050002 | Oval Shape",
        price: 2633,
        stock: 12,
      },
    ],
  },
  // ── Emerald (Panna/Zambian) ───────────────────────────────────────────────
  {
    id: "gem-007",
    name: "Emerald Gemstone — Zambian Panna (पन्ना)",
    category: "Energized Gemstones",
    price: 53900,
    mrp: 61985,
    description:
      "Zambian origin certified Panna Emerald in Oval shape, energized with Budh mantras for Mercury's blessings. Lab-tested, Government of India certified. Excellent for communication, intellect and business acumen.",
    benefits:
      "Intelligence boost, Business communication, Mercury blessings, Memory enhancement",
    astrologicalPurpose: "Mercury (Budh) — primary ratna for Gemini & Virgo",
    stock: BigInt(20),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-007-a",
        name: "SKU EM17050001 | Oval Shape",
        price: 53900,
        stock: 5,
      },
    ],
  },
  // ── Green Tourmaline ──────────────────────────────────────────────────────
  {
    id: "gem-008",
    name: "Green Tourmaline Gemstone — Peridot/Verdelite",
    category: "Energized Gemstones",
    price: 5273,
    mrp: 6064,
    description:
      "Natural Green Tourmaline (Peridot/Verdelite), an excellent Mercury substitute, energized for success in business and communication. Oval shape, lab-certified. Known for attracting prosperity and creative inspiration.",
    benefits:
      "Mercury benefits, Creative inspiration, Business success, Heart chakra healing",
    astrologicalPurpose: "Mercury (Budh) — Panna upratna substitute",
    stock: BigInt(40),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-008-a",
        name: "SKU GT17050001 | Oval Shape",
        price: 5273,
        stock: 20,
      },
    ],
  },
  // ── Hessonite (Gomed) ─────────────────────────────────────────────────────
  {
    id: "gem-009",
    name: "Hessonite Gemstone — Gomed (गोमेद)",
    category: "Energized Gemstones",
    price: 2700,
    mrp: 3105,
    description:
      "Certified Ceylon Gomed Hessonite Garnet in Cushion, Oval and Radiant Cut shapes, energized with Rahu mantras. Removes confusion, fear and legal problems. Multiple sizes available — lab-tested and Prana-Pratishtha activated.",
    benefits:
      "Rahu pacification, Confusion removal, Career focus, Legal trouble relief",
    astrologicalPurpose: "Rahu (North Node) — primary gemstone for Rahu",
    stock: BigInt(40),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-009-a",
        name: "SKU HE17050001 | Cushion Shape",
        price: 4290,
        stock: 8,
      },
      {
        id: "gem-009-b",
        name: "SKU HE17050002 | Oval Shape",
        price: 10160,
        stock: 4,
      },
      {
        id: "gem-009-c",
        name: "SKU HE17050003 | Radiant Cut Shape",
        price: 5576,
        stock: 5,
      },
      {
        id: "gem-009-d",
        name: "SKU HE17050004 | Oval Shape",
        price: 2700,
        stock: 8,
      },
      {
        id: "gem-009-e",
        name: "SKU HE17050005 | Oval Shape",
        price: 4212,
        stock: 6,
      },
      {
        id: "gem-009-f",
        name: "SKU HE17050006 | Oval Shape",
        price: 2907,
        stock: 7,
      },
      {
        id: "gem-009-g",
        name: "SKU HE17050007 | Cushion Shape",
        price: 4140,
        stock: 6,
      },
      {
        id: "gem-009-h",
        name: "SKU HE17050008 | Cushion Shape",
        price: 18170,
        stock: 3,
      },
      {
        id: "gem-009-i",
        name: "SKU HE17050009 | Cushion Shape",
        price: 17365,
        stock: 3,
      },
      {
        id: "gem-009-j",
        name: "SKU HE17050010 | Cushion Shape",
        price: 19440,
        stock: 2,
      },
    ],
  },
  // ── Pearl (Moti) ─────────────────────────────────────────────────────────
  {
    id: "gem-010",
    name: "Pearl Gemstone — Saccha Moti (मोती)",
    category: "Energized Gemstones",
    price: 2750,
    mrp: 3163,
    description:
      "Original Saccha Moti (Pearl) in Round shape, energized with Chandra mantras. Calms emotions, strengthens the mind and improves relationships. Multiple specimens available, lab-certified and Prana-Pratishtha activated.",
    benefits:
      "Emotional stability, Moon blessings, Relationship harmony, Cancer ascendant support",
    astrologicalPurpose: "Moon (Chandra) — primary ratna for Cancer ascendant",
    stock: BigInt(30),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-010-a",
        name: "SKU PE17050001 | Round Shape",
        price: 2800,
        stock: 5,
      },
      {
        id: "gem-010-b",
        name: "SKU PE17050002 | Round Shape",
        price: 3135,
        stock: 5,
      },
      {
        id: "gem-010-c",
        name: "SKU PE17050003 | Round Shape",
        price: 2900,
        stock: 5,
      },
      {
        id: "gem-010-d",
        name: "SKU PE17050004 | Round Shape",
        price: 4059,
        stock: 4,
      },
      {
        id: "gem-010-e",
        name: "SKU PE17050005 | Round Shape",
        price: 4225,
        stock: 4,
      },
      {
        id: "gem-010-f",
        name: "SKU PE17050006 | Round Shape",
        price: 2888,
        stock: 4,
      },
      {
        id: "gem-010-g",
        name: "SKU PE17050007 | Round Shape",
        price: 2750,
        stock: 5,
      },
    ],
  },
  // ── Ruby (Manikya) ────────────────────────────────────────────────────────
  {
    id: "gem-011",
    name: "Ruby Gemstone — Natural Manikya (माणिक्य)",
    category: "Energized Gemstones",
    price: 2880,
    mrp: 9999,
    description:
      "Natural Manikya Ruby in Oval shape, energized with Surya mantras. The king of gemstones — brings authority, leadership, government favor and vitality. Multiple quality specimens from premium sources. Lab-certified.",
    benefits:
      "Leadership & authority, Sun blessings, Government favor, Vitality boost",
    astrologicalPurpose: "Sun (Surya) — primary ratna for Leo ascendant",
    stock: BigInt(15),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-011-a",
        name: "SKU RU17050001 | Oval Shape",
        price: 3200,
        stock: 2,
      },
      {
        id: "gem-011-b",
        name: "SKU RU17050002 | Oval Shape",
        price: 3400,
        stock: 2,
      },
      {
        id: "gem-011-c",
        name: "SKU RU17050003 | Oval Shape",
        price: 3600,
        stock: 2,
      },
      {
        id: "gem-011-d",
        name: "SKU RU17050004 | Oval Shape",
        price: 9700,
        stock: 3,
      },
      {
        id: "gem-011-e",
        name: "SKU RU17050005 | Oval Shape",
        price: 4200,
        stock: 2,
      },
      {
        id: "gem-011-f",
        name: "SKU RU17050006 | Oval Shape",
        price: 4500,
        stock: 2,
      },
      {
        id: "gem-011-g",
        name: "SKU RU17050007 | Oval Shape",
        price: 5000,
        stock: 2,
      },
      {
        id: "gem-011-h",
        name: "SKU RU17050008 | Oval Shape",
        price: 5500,
        stock: 2,
      },
      {
        id: "gem-011-i",
        name: "SKU RU17050009 | Oval Shape",
        price: 2880,
        stock: 3,
      },
      {
        id: "gem-011-j",
        name: "SKU RU17050010 | Oval Shape",
        price: 12650,
        stock: 2,
      },
      {
        id: "gem-011-k",
        name: "SKU RU17050011 | Oval Shape",
        price: 2926,
        stock: 3,
      },
      {
        id: "gem-011-l",
        name: "SKU RU17050012 | Oval Shape",
        price: 5005,
        stock: 2,
      },
      {
        id: "gem-011-m",
        name: "SKU RU17050013 | Oval Shape",
        price: 5966,
        stock: 2,
      },
      {
        id: "gem-011-n",
        name: "SKU RU17050014 | Oval Shape",
        price: 10170,
        stock: 2,
      },
      {
        id: "gem-011-o",
        name: "SKU RU17050015 | Oval Shape",
        price: 4940,
        stock: 2,
      },
      {
        id: "gem-011-p",
        name: "SKU RU17050016 | Oval Shape",
        price: 7280,
        stock: 2,
      },
      {
        id: "gem-011-q",
        name: "SKU RU17050017 | Oval Shape",
        price: 9360,
        stock: 2,
      },
    ],
  },
  // ── Sulemani Hakik ────────────────────────────────────────────────────────
  {
    id: "gem-012",
    name: "Sulemani Hakik Gemstone — Black Agate",
    category: "Energized Gemstones",
    price: 7500,
    mrp: 8625,
    description:
      "Original Sulemani Hakik (Black Sulemani Agate) in Oval and Round shapes, energized for protection against evil eye, negativity and black magic. Lab-tested. Widely used in Islamic and Hindu traditions for protective amulets.",
    benefits:
      "Evil eye protection, Negativity removal, Black magic shield, Spiritual protection",
    astrologicalPurpose: "Saturn, Rahu — protective and grounding stone",
    stock: BigInt(80),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-012-a",
        name: "SKU SH17050001 | Oval Shape",
        price: 7200,
        stock: 10,
      },
      {
        id: "gem-012-b",
        name: "SKU SH17050002 | Round Shape",
        price: 7500,
        stock: 10,
      },
    ],
  },
  // ── Yellow Topaz (Sunehla) ────────────────────────────────────────────────
  {
    id: "gem-013",
    name: "Topaz Gemstone — Sunehla / Yellow Topaz (सुनेहेला)",
    category: "Energized Gemstones",
    price: 2310,
    mrp: 4999,
    description:
      "Natural Yellow Topaz (Sunela) in Oval shape, a powerful Jupiter substitute energized with Guru mantras. Multiple specimens available with Prana-Pratishtha activation. Brings wisdom, wealth and marital bliss.",
    benefits:
      "Jupiter benefits, Wisdom & knowledge, Marital happiness, Wealth attraction",
    astrologicalPurpose: "Jupiter (Guru) — Pukhraj upratna substitute",
    stock: BigInt(30),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-013-a",
        name: "SKU TO17050001 | Oval Shape",
        price: 2600,
        stock: 3,
      },
      {
        id: "gem-013-b",
        name: "SKU TO17050002 | Oval Shape",
        price: 2860,
        stock: 4,
      },
      {
        id: "gem-013-c",
        name: "SKU TO17050003 | Oval Shape",
        price: 3658,
        stock: 3,
      },
      {
        id: "gem-013-d",
        name: "SKU TO17050004 | Oval Shape",
        price: 2475,
        stock: 4,
      },
      {
        id: "gem-013-e",
        name: "SKU TO17050005 | Oval Shape",
        price: 2700,
        stock: 3,
      },
      {
        id: "gem-013-f",
        name: "SKU TO17050006 | Oval Shape",
        price: 2850,
        stock: 3,
      },
      {
        id: "gem-013-g",
        name: "SKU TO17050007 | Oval Shape",
        price: 3000,
        stock: 3,
      },
      {
        id: "gem-013-h",
        name: "SKU TO17050008 | Oval Shape",
        price: 2668,
        stock: 3,
      },
      {
        id: "gem-013-i",
        name: "SKU TO17050009 | Oval Shape",
        price: 2310,
        stock: 4,
      },
      {
        id: "gem-013-j",
        name: "SKU TO17050010 | Oval Shape",
        price: 2393,
        stock: 3,
      },
      {
        id: "gem-013-k",
        name: "SKU TO17050011 | Oval Shape",
        price: 2833,
        stock: 3,
      },
      {
        id: "gem-013-l",
        name: "SKU TO17050012 | Oval Shape",
        price: 3383,
        stock: 3,
      },
      {
        id: "gem-013-m",
        name: "SKU TO17050013 | Oval Shape",
        price: 3276,
        stock: 3,
      },
      {
        id: "gem-013-n",
        name: "SKU TO17050014 | Oval Shape",
        price: 7095,
        stock: 2,
      },
      {
        id: "gem-013-o",
        name: "SKU TO17050015 | Oval Shape",
        price: 2750,
        stock: 3,
      },
    ],
  },
  // ── Yellow Sapphire (Pukhraj) ─────────────────────────────────────────────
  {
    id: "gem-014",
    name: "Yellow Sapphire Pukhraj (3-4 Ratti)",
    category: "Energized Gemstones",
    price: 5999,
    mrp: 11999,
    description:
      "Premium Ceylon Yellow Sapphire Pukhraj, the most auspicious Jupiter gemstone, energized with Brihaspati mantras. Blesses the wearer with wisdom, prosperity, marriage and children.",
    benefits:
      "Supreme Jupiter blessing, Marriage timing, Wealth prosperity, Children & wisdom",
    astrologicalPurpose:
      "Jupiter (Guru/Brihaspati) — primary ratna for Sagittarius & Pisces",
    stock: BigInt(15),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-014-a",
        name: "SKU YS17050001 | Oval Shape",
        price: 24500,
        stock: 2,
      },
      {
        id: "gem-014-b",
        name: "SKU YS17050002 | Oval Shape",
        price: 22123,
        stock: 2,
      },
      {
        id: "gem-014-c",
        name: "SKU YS17050003 | Oval Shape",
        price: 15340,
        stock: 2,
      },
      {
        id: "gem-014-d",
        name: "SKU YS17050004 | Oval Shape",
        price: 12760,
        stock: 2,
      },
      {
        id: "gem-014-e",
        name: "SKU YS17050005 | Square Shape",
        price: 173000,
        stock: 1,
      },
      {
        id: "gem-014-f",
        name: "SKU YS17050006 | Oval Shape",
        price: 39000,
        stock: 1,
      },
      {
        id: "gem-014-g",
        name: "SKU YS17050007 | Oval Shape",
        price: 64800,
        stock: 1,
      },
      {
        id: "gem-014-h",
        name: "SKU YS17050008 | Oval Shape",
        price: 19800,
        stock: 2,
      },
      {
        id: "gem-014-i",
        name: "SKU YS17050009 | Oval Shape",
        price: 99000,
        stock: 1,
      },
      {
        id: "gem-014-j",
        name: "SKU YS17050010 | Oval Shape",
        price: 97590,
        stock: 1,
      },
      {
        id: "gem-014-k",
        name: "SKU YS17050011 | Cushion Shape",
        price: 12330,
        stock: 2,
      },
      {
        id: "gem-014-l",
        name: "SKU YS17050012 | Square Shape",
        price: 79200,
        stock: 1,
      },
      {
        id: "gem-014-m",
        name: "SKU YS17050013 | Oval Shape",
        price: 152500,
        stock: 1,
      },
      {
        id: "gem-014-n",
        name: "SKU YS17050014 | Oval Shape",
        price: 21000,
        stock: 2,
      },
      {
        id: "gem-014-o",
        name: "SKU YS17050015 | Octagon Shape",
        price: 189750,
        stock: 1,
      },
      {
        id: "gem-014-p",
        name: "SKU YS17050016 | Oval Shape",
        price: 51000,
        stock: 1,
      },
      {
        id: "gem-014-q",
        name: "SKU YS17050017 | Round Shape",
        price: 87500,
        stock: 1,
      },
      {
        id: "gem-014-r",
        name: "SKU YS17050018 | Oval Shape",
        price: 18750,
        stock: 2,
      },
      {
        id: "gem-014-s",
        name: "SKU YS17050019 | Oval Shape",
        price: 24360,
        stock: 2,
      },
      {
        id: "gem-014-t",
        name: "SKU YS17050020 | Oval Shape",
        price: 27495,
        stock: 2,
      },
    ],
  },
  // ── Lapis Lazuli (Lajward) ───────────────────────────────────────────────
  {
    id: "gem-015",
    name: "Lapis Lazuli Gemstone — Lajward Stone",
    category: "Energized Gemstones",
    price: 1885,
    mrp: 3288,
    description:
      "Natural Lapis Lazuli (Lajward) in Oval, Rectangle and Square shapes, energized for Saturn's blessings. Enhances intuition, opens the third eye chakra and brings mental clarity. Multiple specimens available, all Prana-Pratishtha activated.",
    benefits:
      "Third eye activation, Wisdom & truth, Mental clarity, Saturn pacification",
    astrologicalPurpose: "Saturn, Venus — wisdom and creativity stone",
    stock: BigInt(50),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-015-a",
        name: "SKU LA17050002 | Oval Shape",
        price: 3195,
        stock: 6,
      },
      {
        id: "gem-015-b",
        name: "SKU LA17050003 | Oval Shape",
        price: 1885,
        stock: 6,
      },
      {
        id: "gem-015-c",
        name: "SKU LA17050004 | Rectangle Shape",
        price: 2200,
        stock: 5,
      },
      {
        id: "gem-015-d",
        name: "SKU LA17050005 | Oval Shape",
        price: 2100,
        stock: 5,
      },
      {
        id: "gem-015-e",
        name: "SKU LA17050006 | Rectangle Shape",
        price: 2206,
        stock: 5,
      },
      {
        id: "gem-015-f",
        name: "SKU LA17050007 | Oval Shape",
        price: 2050,
        stock: 5,
      },
      {
        id: "gem-015-g",
        name: "SKU LA17050008 | Oval Shape",
        price: 1966,
        stock: 6,
      },
      {
        id: "gem-015-h",
        name: "SKU LA17050009 | Oval Shape",
        price: 3204,
        stock: 5,
      },
      {
        id: "gem-015-i",
        name: "SKU LA17050010 | Oval Shape",
        price: 2915,
        stock: 5,
      },
      {
        id: "gem-015-j",
        name: "SKU LA17050011 | Oval Shape",
        price: 2593,
        stock: 5,
      },
      {
        id: "gem-015-k",
        name: "SKU LA17050012 | Square Shape",
        price: 2738,
        stock: 5,
      },
      {
        id: "gem-015-l",
        name: "SKU LA17050013 | Square Shape",
        price: 2352,
        stock: 5,
      },
    ],
  },
  // ── Yemeni Hakik ─────────────────────────────────────────────────────────
  {
    id: "gem-016",
    name: "Yemeni Hakik Stone — Yemeni Agate",
    category: "Energized Gemstones",
    price: 10688,
    mrp: 12291,
    description:
      "Authentic Yemeni Hakik agate (Oval shape) sourced from Yemen, energized for protection and good fortune. Lab-tested and Prana-Pratishtha activated. Traditionally worn as a protective amulet in Islamic and Hindu traditions.",
    benefits:
      "Premium protection, Good fortune, Authentic Yemeni origin, Traditional amulet",
    astrologicalPurpose: "Saturn, Rahu — protective amulet stone",
    stock: BigInt(60),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-016-a",
        name: "SKU YH17050001 | Oval Shape",
        price: 13088,
        stock: 10,
      },
      {
        id: "gem-016-b",
        name: "SKU YH17050002 | Oval Shape",
        price: 10688,
        stock: 10,
      },
      {
        id: "gem-016-c",
        name: "SKU YH17050003 | Oval Shape",
        price: 14025,
        stock: 8,
      },
      {
        id: "gem-016-d",
        name: "SKU YH17050004 | Oval Shape",
        price: 20103,
        stock: 6,
      },
    ],
  },
  // ── Unakite (Jarmoda) ─────────────────────────────────────────────────────
  {
    id: "gem-017",
    name: "Unakite Gemstone — Jarmoda Stone (उनाकाइट)",
    category: "Energized Gemstones",
    price: 4275,
    mrp: 4916,
    description:
      "Natural Unakite (Jarmoda/Epidote) stone in Oval and Pear-Cut shapes, known for emotional healing, balance and heart chakra activation. Prana-Pratishtha activated. Helps with recovery and fosters positive outlook.",
    benefits:
      "Emotional healing, Heart chakra balance, Recovery support, Grounding energy",
    astrologicalPurpose: "Venus, Earth — heart chakra and emotional healing",
    stock: BigInt(70),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-017-a",
        name: "SKU UN17050001 | Oval Shape",
        price: 4313,
        stock: 15,
      },
      {
        id: "gem-017-b",
        name: "SKU UN17050002 | Oval Shape",
        price: 4275,
        stock: 15,
      },
      {
        id: "gem-017-c",
        name: "SKU UN17050003 | Pear Cut Shape (16% off)",
        price: 9928,
        stock: 10,
      },
    ],
  },
  // ── Diamond (Heera) ───────────────────────────────────────────────────────
  {
    id: "gem-018",
    name: "Diamond Gemstone — Heera (हीरा)",
    category: "Energized Gemstones",
    price: 51000,
    mrp: 58650,
    description:
      "Certified Diamond (Heera) in Cushion shape, energized with Shukra mantras for Venus blessings. Lab-tested and Prana-Pratishtha activated. The most precious of gemstones for supreme Venus energy.",
    benefits:
      "Venus blessings, Luxury & prosperity, Beauty enhancement, Marital harmony",
    astrologicalPurpose: "Venus (Shukra) — primary ratna for Taurus & Libra",
    stock: BigInt(5),
    createdAt: BigInt(0),
    variants: [
      {
        id: "gem-018-a",
        name: "SKU DA25110001 | Cushion Shape",
        price: 51000,
        stock: 5,
      },
    ],
  },
];

// ─── Rings ─────────────────────────────────────────────────────────────────
export const RINGS_PRODUCTS: ProductWithMRP[] = [
  {
    id: "ring-001",
    name: "Amethyst Jamunia Ring Silver",
    category: "Rings",
    price: 899,
    mrp: 1799,
    description:
      "Sterling silver ring set with a natural Amethyst Jamunia gemstone, energized with Saturn mantras. Ideal for those seeking stress relief, mental clarity and Saturn's blessings.",
    benefits:
      "Saturn blessing, Stress relief, Mental clarity, Elegant silver setting",
    astrologicalPurpose: "Saturn (Shani) — Amethyst for Capricorn and Aquarius",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "ring-002",
    name: "Blue Sapphire Neelam Ring",
    category: "Rings",
    price: 3499,
    mrp: 6999,
    description:
      "Certified Blue Sapphire set in a silver Panchdhatu ring, energized with Shani mantras. One of the most powerful planetary rings for Saturn's blessing and rapid life transformation.",
    benefits:
      "Rapid transformation, Saturn grace, Career acceleration, Obstacle removal",
    astrologicalPurpose:
      "Saturn (Shani) — Neelam ring for maximum Saturn effect",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "ring-003",
    name: "Coral Moonga Ring Silver",
    category: "Rings",
    price: 1299,
    mrp: 2499,
    description:
      "Natural Italian Coral set in a sterling silver ring, energized with Mangal mantras. Strengthens Mars energy, courage, vitality and helps overcome blood-related disorders.",
    benefits:
      "Mars strengthening, Courage & vitality, Blood health, Protection",
    astrologicalPurpose: "Mars (Mangal) — Moonga ring for Aries and Scorpio",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "ring-004",
    name: "Cat's Eye Ring Silver",
    category: "Rings",
    price: 1999,
    mrp: 3999,
    description:
      "Chrysoberyl Cat's Eye set in silver, energized with Ketu mantras. Provides spiritual protection, enhances intuition and guards against sudden accidents and occult influences.",
    benefits:
      "Ketu protection, Accident prevention, Spiritual intuition, Occult shield",
    astrologicalPurpose: "Ketu — Cat's Eye ring for shadow planet pacification",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ring-005",
    name: "Emerald Panna Ring",
    category: "Rings",
    price: 2499,
    mrp: 4999,
    description:
      "Colombian Emerald Panna set in silver, energized with Budh mantras. Enhances intelligence, eloquence, business acumen and helps students excel academically.",
    benefits:
      "Intelligence boost, Business success, Academic excellence, Mercury blessings",
    astrologicalPurpose: "Mercury (Budh) — Panna ring for Gemini and Virgo",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ring-006",
    name: "Hessonite Gomed Ring",
    category: "Rings",
    price: 1199,
    mrp: 2499,
    description:
      "Certified Hessonite Garnet Gomed set in silver, energized with Rahu mantras. Removes confusion, enhances focus and brings clarity of thought and career success.",
    benefits:
      "Rahu pacification, Clarity & focus, Career success, Confusion removal",
    astrologicalPurpose: "Rahu (North Node) — Gomed ring for Rahu afflictions",
    stock: BigInt(35),
    createdAt: BigInt(0),
  },
  {
    id: "ring-007",
    name: "Lajward Lapis Lazuli Ring",
    category: "Rings",
    price: 799,
    mrp: 1599,
    description:
      "Natural Lapis Lazuli set in an oxidized silver ring, energized for wisdom and protection. Activates the third eye chakra, enhancing intuition and spiritual awareness.",
    benefits:
      "Third eye activation, Wisdom & truth, Spiritual awareness, Saturn support",
    astrologicalPurpose: "Saturn, Venus — wisdom ring",
    stock: BigInt(45),
    createdAt: BigInt(0),
  },
  {
    id: "ring-008",
    name: "Navratna Ring Gold Plated",
    category: "Rings",
    price: 1499,
    mrp: 2999,
    description:
      "Gold-plated Navratna ring featuring all 9 planetary gemstones in a traditional setting. Energized for complete planetary harmony and overall life balance and prosperity.",
    benefits:
      "All 9 planetary blessings, Complete harmony, Overall prosperity, Traditional design",
    astrologicalPurpose:
      "All 9 planets — Navratna for complete planetary balance",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "ring-009",
    name: "Opal Ring Silver",
    category: "Rings",
    price: 999,
    mrp: 1999,
    description:
      "Natural Opal set in sterling silver, energized with Venus mantras. Enhances creativity, artistic talent, love and brings the blessings of Venus for beauty and relationships.",
    benefits:
      "Venus blessing, Creativity boost, Love & beauty, Artistic talent",
    astrologicalPurpose: "Venus (Shukra) — Opal as Venus upratna",
    stock: BigInt(45),
    createdAt: BigInt(0),
  },
  {
    id: "ring-010",
    name: "Pearl Moti Ring Silver",
    category: "Rings",
    price: 1799,
    mrp: 3499,
    description:
      "Natural South Sea Pearl set in silver, energized with Chandra mantras. Calms the mind, improves emotional stability and relationships, especially beneficial for Cancer ascendants.",
    benefits:
      "Emotional balance, Moon blessings, Relationship harmony, Calm mind",
    astrologicalPurpose: "Moon (Chandra) — Moti ring for Cancer ascendant",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
  {
    id: "ring-011",
    name: "Ruby Manik Ring Silver",
    category: "Rings",
    price: 4499,
    mrp: 8999,
    description:
      "Certified Burma Ruby Manik set in silver, energized with Surya mantras. Brings leadership, authority, government favor and strong Sun energy to Leo ascendants.",
    benefits:
      "Leadership & authority, Sun blessings, Government favor, Vitality",
    astrologicalPurpose: "Sun (Surya) — Manik ring for Leo ascendant",
    stock: BigInt(15),
    createdAt: BigInt(0),
  },
  {
    id: "ring-012",
    name: "Topaz Ring Silver",
    category: "Rings",
    price: 2199,
    mrp: 4399,
    description:
      "Yellow Topaz set in silver, energized with Jupiter mantras. Brings wisdom, wealth, prosperity, happiness in marriage and the complete blessings of Guru Brihaspati.",
    benefits:
      "Jupiter blessing, Wisdom & wealth, Marital happiness, Prosperity",
    astrologicalPurpose: "Jupiter (Guru) — Yellow Topaz as Pukhraj upratna",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
  {
    id: "ring-013",
    name: "Turquoise Firoza Ring Silver",
    category: "Rings",
    price: 899,
    mrp: 1799,
    description:
      "Natural Turquoise Firoza set in silver, a stone of protection, communication and travel safety. Energized with Jupiter and Venus mantras for positivity and good fortune.",
    benefits: "Travel safety, Communication boost, Positive energy, Protection",
    astrologicalPurpose: "Jupiter, Venus — Turquoise for positive fortune",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "ring-014",
    name: "Yellow Sapphire Ring Silver",
    category: "Rings",
    price: 5499,
    mrp: 10999,
    description:
      "Premium Ceylon Yellow Sapphire set in silver Panchdhatu ring, energized with Brihaspati mantras. The most auspicious Jupiter ring for wisdom, marriage blessings and prosperity.",
    benefits:
      "Supreme Jupiter blessing, Marriage & children, Wealth & wisdom, Premium certified gem",
    astrologicalPurpose:
      "Jupiter (Brihaspati) — Yellow Sapphire for Sagittarius and Pisces",
    stock: BigInt(15),
    createdAt: BigInt(0),
  },
  {
    id: "ring-015",
    name: "Zircon Ring Silver",
    category: "Rings",
    price: 699,
    mrp: 1399,
    description:
      "Natural Zircon set in sterling silver, a powerful Venus upratna stone. Brings beauty, charm, creativity, love and financial abundance to the wearer.",
    benefits:
      "Venus upratna benefits, Beauty & charm, Love & creativity, Affordable option",
    astrologicalPurpose: "Venus (Shukra) — Zircon as Diamond substitute",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  {
    id: "ring-016",
    name: "Religious Om Ring Silver",
    category: "Rings",
    price: 399,
    mrp: 799,
    description:
      "Sterling silver ring engraved with the sacred Om symbol, energized through Vedic rituals. A universal spiritual ring bringing peace, protection and divine connection.",
    benefits:
      "Universal protection, Peace of mind, Divine connection, Spiritual symbol",
    astrologicalPurpose: "All deities — universal sacred Om symbol",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Religious Yantras ──────────────────────────────────────────────────────
export const YANTRAS_PRODUCTS: ProductWithMRP[] = [
  {
    id: "yantra-001",
    name: "Astro Yantra Copper Engraved",
    category: "Religious Yantras",
    price: 499,
    mrp: 999,
    description:
      "Custom copper-engraved Astro Yantra energized based on your birth chart's planetary needs. Placed in the home or office for continuous astrological protection and positive energy.",
    benefits:
      "Custom planetary remedy, Home protection, Positive energy, Astrological balance",
    astrologicalPurpose:
      "Personalized — based on natal chart planetary positions",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-002",
    name: "Baglamukhi Yantra Gold Plated",
    category: "Religious Yantras",
    price: 699,
    mrp: 1499,
    description:
      "Gold-plated Baglamukhi Yantra, the most powerful yantra for defeating enemies, court cases and competition. Energized through Baglamukhi Sadhana by trained tantric priests.",
    benefits:
      "Enemy defeat, Court case victory, Competition success, Obstacle removal",
    astrologicalPurpose: "Baglamukhi — one of the Das Mahavidyas for victory",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-003",
    name: "Bhairavi Yantra Copper",
    category: "Religious Yantras",
    price: 499,
    mrp: 999,
    description:
      "Copper-engraved Tripura Bhairavi Yantra, a powerful protective yantra against black magic, tantric attacks and negative energies. Energized through traditional Bhairavi puja.",
    benefits:
      "Black magic protection, Tantric shield, Negative energy removal, Fearlessness",
    astrologicalPurpose: "Tripura Bhairavi — Mahavidya for fierce protection",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-004",
    name: "Chowki Yantra Silver Plated",
    category: "Religious Yantras",
    price: 599,
    mrp: 1199,
    description:
      "Silver-plated puja chowki with yantra engravings for daily worship. Used as the sacred platform during rituals, energized for overall auspiciousness and positive energy in the home.",
    benefits:
      "Puja platform, Home auspiciousness, Ritual use, Silver plated durability",
    astrologicalPurpose: "All deities — universal puja yantra chowki",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-005",
    name: "Durga Yantra Gold Plated",
    category: "Religious Yantras",
    price: 699,
    mrp: 1399,
    description:
      "Gold-plated Durga Yantra energized through Navratri Sadhana by Shakti upasaks. Provides divine protection, destroys negativity and blesses devotees with strength and success.",
    benefits:
      "Divine protection, Strength & courage, Negativity destruction, Shakti blessings",
    astrologicalPurpose:
      "Durga Mata — Shakti yantra for protection and victory",
    stock: BigInt(45),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-006",
    name: "Ganesh Yantra Copper Plate",
    category: "Religious Yantras",
    price: 499,
    mrp: 999,
    description:
      "Copper Ganesh Yantra energized with Ganesh Chaturthi rituals. Removes obstacles, brings success in new ventures and ensures auspicious beginnings for all endeavors.",
    benefits:
      "Obstacle removal, New venture success, Auspicious beginnings, Ganesh blessings",
    astrologicalPurpose: "Lord Ganesha — Vighneshwara, remover of obstacles",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-007",
    name: "Guru Yantra Copper",
    category: "Religious Yantras",
    price: 449,
    mrp: 899,
    description:
      "Copper Guru Yantra dedicated to Jupiter (Brihaspati), energized with Jupiter mantras on Thursday. Enhances wisdom, spiritual knowledge and brings the blessings of Guru-Jupiter.",
    benefits:
      "Wisdom & knowledge, Jupiter blessings, Spiritual growth, Teacher's grace",
    astrologicalPurpose:
      "Jupiter (Brihaspati/Guru) — Guru yantra for Jupiter enhancement",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-008",
    name: "Hanuman Yantra Gold Plated",
    category: "Religious Yantras",
    price: 599,
    mrp: 1199,
    description:
      "Gold-plated Hanuman Yantra energized on Tuesday with Hanuman Chalisa recitation. Provides strength, removes fear, pacifies Mars and protects against black magic.",
    benefits:
      "Strength & fearlessness, Mars pacification, Black magic protection, Hanuman blessings",
    astrologicalPurpose: "Mars (Mangal) — Hanuman yantra for Mars and Ketu",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-009",
    name: "Kuber Yantra Gold Plated Large",
    category: "Religious Yantras",
    price: 799,
    mrp: 1599,
    description:
      "Large-format gold-plated Kuber Yantra, the sacred wealth magnet of Lord Kubera. Energized on Dhanteras and Diwali for maximum prosperity, placed in cash lockers and offices.",
    benefits:
      "Wealth attraction, Prosperity magnet, Business success, Kubera blessings",
    astrologicalPurpose:
      "Lord Kubera — deity of wealth, North direction yantra",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-010",
    name: "Kali Yantra Copper Engraved",
    category: "Religious Yantras",
    price: 499,
    mrp: 999,
    description:
      "Copper-engraved Kali Yantra energized through Kali Sadhana on Amavasya nights. Destroys all forms of negativity, fear and evil, providing fierce protection to the devotee.",
    benefits:
      "Fierce protection, Fear removal, Evil destruction, Kali Maa blessings",
    astrologicalPurpose: "Maa Kali — destroyer of evil, Saturn and Ketu Shakti",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-011",
    name: "Mahavidya Yantra Set of 10",
    category: "Religious Yantras",
    price: 2999,
    mrp: 5999,
    description:
      "Complete set of 10 Das Mahavidya Yantras — Kali, Tara, Tripura Sundari, Bhuvaneshwari, Bhairavi, Chhinnamasta, Dhumavati, Baglamukhi, Matangi and Kamalatmika. Energized by trained Tantric priests.",
    benefits:
      "Complete Mahavidya protection, All 10 Shakti blessings, Tantric power set, Rare complete collection",
    astrologicalPurpose: "All 10 Mahavidyas — complete Shakti yantra set",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-012",
    name: "Maha Lakshmi Yantra Gold Plated",
    category: "Religious Yantras",
    price: 799,
    mrp: 1599,
    description:
      "Gold-plated Maha Lakshmi Yantra energized on Diwali and Shukravara. The primary yantra for wealth, abundance and Lakshmi's grace in the home and business.",
    benefits:
      "Maha Lakshmi blessings, Wealth & abundance, Business prosperity, Home prosperity",
    astrologicalPurpose: "Maa Lakshmi — Venus, wealth and prosperity deity",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-013",
    name: "Laxmi Yantra Silver Plated Frame",
    category: "Religious Yantras",
    price: 699,
    mrp: 1399,
    description:
      "Silver-plated Lakshmi Yantra in a decorative wall-hanging frame, energized for home wealth attraction. Elegant design suitable for living rooms, offices and puja rooms.",
    benefits:
      "Wall-hanging display, Home wealth, Elegant design, Lakshmi grace",
    astrologicalPurpose: "Maa Lakshmi — Venus, wealth yantra for home display",
    stock: BigInt(45),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-014",
    name: "Navagraha Yantra Copper",
    category: "Religious Yantras",
    price: 699,
    mrp: 1399,
    description:
      "Copper Navagraha Yantra featuring all 9 planetary squares in one sacred diagram. Energized to harmonize all planetary influences and provide complete astrological balance.",
    benefits:
      "All 9 planets balanced, Complete astrological harmony, Graha shanti, Single yantra solution",
    astrologicalPurpose:
      "All 9 planets (Navagrahas) — complete planetary yantra",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-015",
    name: "Saraswati Yantra Copper",
    category: "Religious Yantras",
    price: 499,
    mrp: 999,
    description:
      "Copper Saraswati Yantra energized on Vasant Panchami for education, knowledge and artistic excellence. Ideal for students, artists, writers and those seeking divine wisdom.",
    benefits:
      "Education success, Artistic talent, Knowledge blessing, Saraswati grace",
    astrologicalPurpose: "Maa Saraswati — Mercury, education and wisdom deity",
    stock: BigInt(55),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-016",
    name: "Vastu Yantra Copper",
    category: "Religious Yantras",
    price: 599,
    mrp: 1199,
    description:
      "Copper Vastu Yantra used to correct Vastu doshas in the home or office without any structural changes. Energized to harmonize directional energies and remove Vastu afflictions.",
    benefits:
      "Vastu dosha correction, Directional harmony, No structural changes needed, Home peace",
    astrologicalPurpose:
      "All directions — Vastu Purusha yantra for spatial harmony",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-017",
    name: "Frame Yantra Wall Hanging Gold",
    category: "Religious Yantras",
    price: 999,
    mrp: 1999,
    description:
      "Premium gold-framed decorative yantra for wall display in puja rooms, living rooms and offices. Energized with Lakshmi-Ganesh mantras for auspiciousness and prosperity.",
    benefits:
      "Elegant wall display, Premium gold frame, Home auspiciousness, Gift-worthy design",
    astrologicalPurpose:
      "Lakshmi-Ganesh — prosperity and obstacle removal yantra",
    stock: BigInt(35),
    createdAt: BigInt(0),
  },
  {
    id: "yantra-018",
    name: "Silver Yantra Sheet Premium",
    category: "Religious Yantras",
    price: 1499,
    mrp: 2999,
    description:
      "Premium silver sheet yantra engraved with Shree Yantra, Kuber Yantra or custom combinations. A prestigious item for worship with pure silver purity and energized through Vedic rituals.",
    benefits:
      "Pure silver material, Premium quality, Shree Yantra power, Prestigious gift option",
    astrologicalPurpose: "Lakshmi-Kubera — premium silver Shree Yantra",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
];

// ─── Puja Items ─────────────────────────────────────────────────────────────
export const PUJA_ITEMS_PRODUCTS: ProductWithMRP[] = [
  {
    id: "puja-001",
    name: "Brass Ganesha Puja Idol 4 inch",
    category: "Puja Items",
    price: 699,
    mrp: 1499,
    description:
      "Pure brass Ganesha idol, 4 inches tall, crafted by traditional artisans. Energized with Ganesh mantra recitation for 21 days before dispatch. Perfect for home puja rooms.",
    benefits:
      "Obstacle removal, Auspicious beginnings, Home blessings, Traditional craftsmanship",
    astrologicalPurpose: "Lord Ganesha — Vighneshwara, auspicious first deity",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "puja-002",
    name: "Puja Photo Frame Ram Darbar",
    category: "Puja Items",
    price: 499,
    mrp: 999,
    description:
      "High-quality laminated photo frame of Ram Darbar featuring Shri Ram, Sita, Lakshman and Hanuman. Gold-bordered frame suitable for home mandir and puja rooms.",
    benefits:
      "Ram Darbar blessings, Home mandir décor, High-quality print, Gold border frame",
    astrologicalPurpose: "Lord Ram — Sun deity, dharma and righteousness",
    stock: BigInt(80),
    createdAt: BigInt(0),
  },
  {
    id: "puja-003",
    name: "Premium Brass Puja Thali Set",
    category: "Puja Items",
    price: 899,
    mrp: 1799,
    description:
      "Complete brass puja thali set with diya, kalash, incense holder, bell and aarti stand. Beautifully crafted with traditional engravings, ideal for daily aarti and special pujas.",
    benefits:
      "Complete aarti set, Traditional engravings, Daily puja use, Gift-ready presentation",
    astrologicalPurpose: "All deities — universal puja thali",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "puja-004",
    name: "Roli Tilak Chawal Set",
    category: "Puja Items",
    price: 99,
    mrp: 199,
    description:
      "Sacred Roli (kumkum), tilak powder and akshat (rice) combo for daily puja rituals. Pure and natural ingredients used in traditional Hindu worship and festivals.",
    benefits:
      "Essential puja ingredients, Natural & pure, Festival use, Affordable daily use",
    astrologicalPurpose:
      "Sun, Mars — Tilak for forehead activation and protection",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "puja-005",
    name: "Goumukhi Jaap Bag Cotton",
    category: "Puja Items",
    price: 125,
    mrp: 250,
    description:
      "Traditional cow-mouth shaped cotton jaap bag for performing mantra japa in privacy. Keeps the mala concealed during chanting as per Tantric and Vedic tradition.",
    benefits:
      "Mala protection during japa, Traditional practice, Cotton material, Pocket-sized",
    astrologicalPurpose:
      "All planets — used during planetary mantra japa practice",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "puja-006",
    name: "Premium Dhoop Agarbatti Set",
    category: "Puja Items",
    price: 149,
    mrp: 299,
    description:
      "Premium-quality dhoop and agarbatti set with varieties including rose, sandalwood and Guggul. Made from natural ingredients without harmful chemicals for pure puja ambiance.",
    benefits:
      "Pure natural fragrances, Positive puja atmosphere, Multiple fragrance varieties, Chemical-free",
    astrologicalPurpose:
      "All deities — fragrance for deity invocation and puja",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "puja-007",
    name: "Cotton Puja Asana Red/Yellow",
    category: "Puja Items",
    price: 199,
    mrp: 399,
    description:
      "Handwoven cotton puja asana (meditation mat) in auspicious red and yellow colors. Used for sitting during meditation, mantra japa and puja rituals for spiritual grounding.",
    benefits:
      "Puja & meditation use, Auspicious colors, Cotton hand-woven, Spiritual grounding",
    astrologicalPurpose:
      "All deities — asana for energy containment during puja",
    stock: BigInt(80),
    createdAt: BigInt(0),
  },
  {
    id: "puja-008",
    name: "Brass Puja Diya Set of 5",
    category: "Puja Items",
    price: 349,
    mrp: 699,
    description:
      "Set of 5 handcrafted brass diyas of varying sizes for aarti, Diwali and daily worship. Traditional designs with deep bowls for longer burning, bringing auspiciousness into the home.",
    benefits:
      "Five diya sizes, Diwali & daily use, Long-burning design, Home auspiciousness",
    astrologicalPurpose: "Sun — fire element, divine light in the home",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  {
    id: "puja-009",
    name: "Wooden Puja Chowki",
    category: "Puja Items",
    price: 599,
    mrp: 1199,
    description:
      "Hand-carved wooden puja chowki (platform) with auspicious designs for placing idols and yantra during worship. Made from sheesham (rosewood) for durability and sacred beauty.",
    benefits:
      "Solid sheesham wood, Sacred idol platform, Auspicious carved designs, Durable quality",
    astrologicalPurpose: "All deities — sacred platform for deity worship",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "puja-010",
    name: "Copper Hawan Kund Small",
    category: "Puja Items",
    price: 599,
    mrp: 899,
    description:
      "Pure copper small Hawan Kund for home rituals, yagnas and fire ceremonies. Traditional pyramid shape for maximum spiritual energy generation during fire oblations.",
    benefits:
      "Pure copper material, Home yagna use, Pyramid shape design, Fire ritual purification",
    astrologicalPurpose:
      "Agni — fire deity, planetary appeasement through yagna",
    stock: BigInt(45),
    createdAt: BigInt(0),
  },
  {
    id: "puja-011",
    name: "Hawan Samagri Premium Pack",
    category: "Puja Items",
    price: 299,
    mrp: 599,
    description:
      "Premium hawan samagri blend of 21 sacred herbs including Guggul, Loban, Camphor, Til and medicinal plants for home fire rituals. Pure and chemical-free formulation.",
    benefits:
      "21-herb pure blend, Chemical-free formulation, Home hawan use, Planetary appeasement",
    astrologicalPurpose: "All planets — Navagraha hawan samagri blend",
    stock: BigInt(70),
    createdAt: BigInt(0),
  },
];

// ─── Books ──────────────────────────────────────────────────────────────────
export const BOOKS_PRODUCTS: ProductWithMRP[] = [
  {
    id: "book-001",
    name: "Rigveda Complete (Hindi)",
    category: "Books",
    price: 599,
    mrp: 999,
    description:
      "Complete Hindi translation of the Rigveda, the oldest of the four Vedas. Contains all 10 mandalas with Sanskrit text, Hindi transliteration and detailed commentary by scholars.",
    benefits:
      "Complete Rigveda text, Sanskrit with Hindi commentary, Scholar annotations, Ancient wisdom",
    astrologicalPurpose:
      "Sun, Agni — oldest Vedic hymns dedicated to nature deities",
    stock: BigInt(50),
    createdAt: BigInt(0),
    variantLabel: "Category",
    variants: [
      { id: "book-cat-1", name: "Ancient Books", price: 599, stock: 20 },
    ],
  },
  {
    id: "book-002",
    name: "Bhagavad Gita with Commentary (Hindi)",
    category: "Books",
    price: 299,
    mrp: 499,
    description:
      "Popular Hindi edition of the Bhagavad Gita with verse-by-verse Sanskrit text, transliteration and detailed commentary. One of the most important texts in Hindu philosophy.",
    benefits:
      "Verse-by-verse explanation, Sanskrit text included, Popular Hindi edition, Life guidance wisdom",
    astrologicalPurpose: "Jupiter, Sun — dharma and self-realization scripture",
    stock: BigInt(80),
    createdAt: BigInt(0),
    variantLabel: "Category",
    variants: [
      { id: "book-cat-2", name: "Ancient Books", price: 299, stock: 40 },
    ],
  },
  {
    id: "book-003",
    name: "Brihat Parashara Hora Shastra (Astrology)",
    category: "Books",
    price: 799,
    mrp: 1499,
    description:
      "The foundational text of Vedic astrology by Maharshi Parashara. Covers all aspects of Jyotish including planetary characteristics, house meanings, yogas and predictive techniques.",
    benefits:
      "Foundational Jyotish text, Planetary yoga system, Predictive techniques, Serious astrology study",
    astrologicalPurpose: "All 9 planets — the root text of Vedic astrology",
    stock: BigInt(40),
    createdAt: BigInt(0),
    variantLabel: "Category",
    variants: [
      { id: "book-cat-3", name: "Astrology Books", price: 799, stock: 20 },
    ],
  },
  {
    id: "book-004",
    name: "Lal Kitab Original",
    category: "Books",
    price: 399,
    mrp: 699,
    description:
      "The original Lal Kitab (Red Book), the unique Urdu-script astrology text with unconventional remedies. Contains the complete original text with Hindi translation and practical remedy guide.",
    benefits:
      "Original Lal Kitab text, Unconventional remedies, Hindi translation, Unique remedy system",
    astrologicalPurpose:
      "All 9 planets — unique Lal Kitab planetary remedy system",
    stock: BigInt(50),
    createdAt: BigInt(0),
    variantLabel: "Category",
    variants: [
      { id: "book-cat-4", name: "Astrology Books", price: 399, stock: 25 },
    ],
  },
  {
    id: "book-005",
    name: "Charaka Samhita Ayurveda (Hindi)",
    category: "Books",
    price: 699,
    mrp: 1299,
    description:
      "Hindi translation of the Charaka Samhita, the primary Ayurvedic text covering diet, medicine, treatment and holistic healing principles compiled by the sage Charaka.",
    benefits:
      "Primary Ayurveda text, Dosha diagnosis guide, Treatment principles, Holistic health wisdom",
    astrologicalPurpose: "Moon, Mercury — Ayurvedic health and healing science",
    stock: BigInt(35),
    createdAt: BigInt(0),
    variantLabel: "Category",
    variants: [
      { id: "book-cat-5", name: "Ayurveda Books", price: 699, stock: 15 },
    ],
  },
  {
    id: "book-006",
    name: "Vastu Shastra Illustrated Guide",
    category: "Books",
    price: 349,
    mrp: 599,
    description:
      "Comprehensive illustrated guide to Vastu Shastra covering home design, room placement, directional significance and practical correction tips for existing spaces.",
    benefits:
      "Illustrated Vastu diagrams, Room-wise guidance, Dosha correction tips, Easy to apply",
    astrologicalPurpose:
      "All planets — directional Vastu alignment with planetary energies",
    stock: BigInt(60),
    createdAt: BigInt(0),
    variantLabel: "Category",
    variants: [
      { id: "book-cat-6", name: "Vastu Books", price: 349, stock: 30 },
    ],
  },
  {
    id: "book-007",
    name: "Tantra Mantra Yantra Complete",
    category: "Books",
    price: 499,
    mrp: 999,
    description:
      "Complete guide to Tantra, Mantra and Yantra traditions with authentic texts, yantra diagrams, mantra systems and practical sadhana instructions for serious practitioners.",
    benefits:
      "Authentic Tantric texts, Yantra diagrams, Mantra systems, Practical sadhana guide",
    astrologicalPurpose:
      "All planets and Mahavidyas — Tantric planetary and deity practices",
    stock: BigInt(40),
    createdAt: BigInt(0),
    variantLabel: "Category",
    variants: [
      { id: "book-cat-7", name: "Tantra Books", price: 499, stock: 20 },
    ],
  },
  {
    id: "book-008",
    name: "Numerology Guide Pythagorean",
    category: "Books",
    price: 249,
    mrp: 449,
    description:
      "Comprehensive Pythagorean numerology guide covering name numbers, destiny numbers, personal year cycles and lucky number calculations with interpretation guide.",
    benefits:
      "Pythagorean method, Name & destiny numbers, Personal year cycles, Lucky number guide",
    astrologicalPurpose:
      "All planets — numerological planetary number correspondences",
    stock: BigInt(70),
    createdAt: BigInt(0),
    variantLabel: "Category",
    variants: [
      { id: "book-cat-8", name: "Numerology Books", price: 249, stock: 35 },
    ],
  },
  {
    id: "book-009",
    name: "Yoga Sutras Patanjali",
    category: "Books",
    price: 199,
    mrp: 399,
    description:
      "Classic translation and commentary of Patanjali's Yoga Sutras, the foundational text of Raja Yoga. Covers all four chapters on samadhi, sadhana, vibhuti and kaivalya.",
    benefits:
      "Patanjali's original sutras, Four chapters commentary, Raja Yoga guide, Enlightenment path",
    astrologicalPurpose:
      "Jupiter, Saturn — Yoga sadhana and spiritual liberation",
    stock: BigInt(70),
    createdAt: BigInt(0),
    variantLabel: "Category",
    variants: [{ id: "book-cat-9", name: "Yoga Books", price: 199, stock: 35 }],
  },
  {
    id: "book-010",
    name: "Religious Ramayana Illustrated",
    category: "Books",
    price: 449,
    mrp: 799,
    description:
      "Beautifully illustrated Ramayana edition with full Sanskrit text, Hindi translation and colorful illustrations depicting major scenes from Valmiki's original composition.",
    benefits:
      "Full illustrated edition, Sanskrit & Hindi text, Colorful artwork, Family-friendly",
    astrologicalPurpose:
      "Sun — Lord Ram's story, dharma and righteousness epic",
    stock: BigInt(60),
    createdAt: BigInt(0),
    variantLabel: "Category",
    variants: [
      { id: "book-cat-10", name: "Ancient Books", price: 449, stock: 30 },
    ],
  },
];

// ─── Crystals ───────────────────────────────────────────────────────────────
export const CRYSTALS_PRODUCTS: ProductWithMRP[] = [
  {
    id: "crystal-001",
    name: "Clear Quartz Crystal Ball 40mm",
    category: "Crystals",
    price: 499,
    mrp: 999,
    description:
      "40mm clear quartz sphere, the master healer of all crystals. Amplifies energy, clarifies intention, enhances intuition and charges all other crystals placed near it.",
    benefits:
      "Energy amplification, Intention setting, Intuition enhancement, Master healer",
    astrologicalPurpose:
      "Sun, Moon — universal crystal for all planetary amplification",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "crystal-002",
    name: "Rose Quartz Tumbled Stone 100g",
    category: "Crystals",
    price: 299,
    mrp: 599,
    description:
      "Natural rose quartz tumbled stones, the crystal of unconditional love. Opens the heart chakra, attracting love, healing emotional wounds and promoting self-acceptance.",
    benefits:
      "Heart chakra healing, Love attraction, Emotional healing, Self-acceptance",
    astrologicalPurpose: "Venus (Shukra) — love and relationship crystal",
    stock: BigInt(70),
    createdAt: BigInt(0),
  },
  {
    id: "crystal-003",
    name: "Amethyst Cluster Natural",
    category: "Crystals",
    price: 799,
    mrp: 1599,
    description:
      "Natural amethyst cluster specimen with multiple crystal points, radiating calming and protective energy. Ideal for meditation spaces, bedrooms and spiritual corners.",
    benefits:
      "Calming energy, Spiritual protection, Sleep improvement, Meditation space enhancer",
    astrologicalPurpose:
      "Saturn — spiritual purification and psychic protection",
    stock: BigInt(35),
    createdAt: BigInt(0),
  },
  {
    id: "crystal-004",
    name: "Black Tourmaline Protection",
    category: "Crystals",
    price: 349,
    mrp: 699,
    description:
      "Raw black tourmaline crystal, the most powerful protective stone. Creates an energetic shield against negative energies, EMF radiation and psychic attacks.",
    benefits:
      "EMF protection, Psychic shield, Negative energy block, Grounding stone",
    astrologicalPurpose: "Saturn, Rahu — protection and grounding stone",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  {
    id: "crystal-005",
    name: "Selenite Wand 10cm",
    category: "Crystals",
    price: 399,
    mrp: 799,
    description:
      "Polished selenite wand, the crystal of divine light and clarity. Cleanses and charges other crystals, clears stagnant energy and connects to higher consciousness.",
    benefits:
      "Crystal cleansing, Aura clearing, Divine connection, Mental clarity",
    astrologicalPurpose: "Moon — lunar crystal for clarity and cleansing",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "crystal-006",
    name: "Citrine Crystal Natural",
    category: "Crystals",
    price: 499,
    mrp: 999,
    description:
      "Natural citrine crystal, the merchant's stone and stone of abundance. Manifests wealth, boosts confidence, enhances creativity and brings solar energy and positivity.",
    benefits:
      "Wealth manifestation, Confidence boost, Creativity enhancement, Solar positivity",
    astrologicalPurpose: "Sun, Jupiter — abundance and success crystal",
    stock: BigInt(55),
    createdAt: BigInt(0),
  },
  {
    id: "crystal-007",
    name: "Tiger Eye Tumbled 50g",
    category: "Crystals",
    price: 249,
    mrp: 499,
    description:
      "Golden tiger eye tumbled stones, the stone of courage and personal power. Protects against negativity, boosts confidence, enhances willpower and mental focus.",
    benefits:
      "Courage & willpower, Personal power, Negativity protection, Mental focus",
    astrologicalPurpose: "Sun, Mars — personal power and protection crystal",
    stock: BigInt(70),
    createdAt: BigInt(0),
  },
  {
    id: "crystal-008",
    name: "Green Aventurine 100g",
    category: "Crystals",
    price: 299,
    mrp: 599,
    description:
      "Natural green aventurine tumbled stones, the stone of opportunity and luck. Opens the heart chakra for prosperity, brings good fortune and is especially powerful for business.",
    benefits:
      "Good fortune & luck, Business opportunity, Heart chakra, Prosperity stone",
    astrologicalPurpose: "Venus, Mercury — opportunity and abundance crystal",
    stock: BigInt(65),
    createdAt: BigInt(0),
  },
];

// ─── Herbs ──────────────────────────────────────────────────────────────────
export const HERBS_PRODUCTS: ProductWithMRP[] = [
  {
    id: "herb-001",
    name: "Ashwagandha Powder 100g",
    category: "Herbs",
    price: 199,
    mrp: 349,
    description:
      "Pure Ashwagandha (Withania somnifera) root powder from certified organic farms. The premier adaptogen in Ayurveda for stress management, vitality and immunity.",
    benefits:
      "Stress reduction, Vitality boost, Immunity support, Hormone balance",
    astrologicalPurpose: "Mars — strength, vitality and physical power herb",
    stock: BigInt(80),
    createdAt: BigInt(0),
  },
  {
    id: "herb-002",
    name: "Brahmi Powder 100g",
    category: "Herbs",
    price: 149,
    mrp: 299,
    description:
      "Pure Brahmi (Bacopa monnieri) powder for memory enhancement, concentration and mental clarity. The traditional Ayurvedic brain tonic used for students and meditation practitioners.",
    benefits:
      "Memory enhancement, Concentration boost, Mental clarity, Meditation support",
    astrologicalPurpose: "Mercury, Moon — intelligence and mind herb",
    stock: BigInt(80),
    createdAt: BigInt(0),
  },
  {
    id: "herb-003",
    name: "Shatavari Powder 100g",
    category: "Herbs",
    price: 199,
    mrp: 399,
    description:
      "Pure Shatavari (Asparagus racemosus) root powder, the primary female tonic in Ayurveda. Balances hormones, supports reproductive health and builds Ojas (vital energy).",
    benefits:
      "Female hormone balance, Reproductive health, Ojas building, Fertility support",
    astrologicalPurpose: "Moon, Venus — female vitality and nourishing herb",
    stock: BigInt(70),
    createdAt: BigInt(0),
  },
  {
    id: "herb-004",
    name: "Triphala Churna 100g",
    category: "Herbs",
    price: 149,
    mrp: 299,
    description:
      "Classic Ayurvedic Triphala blend of Amalaki, Bibhitaki and Haritaki. The universal detoxifier supporting digestion, elimination, eye health and overall rejuvenation.",
    benefits:
      "Digestive health, Detoxification, Eye health support, Overall rejuvenation",
    astrologicalPurpose: "Sun, Moon, Jupiter — tridoshic balancing herb",
    stock: BigInt(90),
    createdAt: BigInt(0),
  },
  {
    id: "herb-005",
    name: "Tulsi Leaves Dried 50g",
    category: "Herbs",
    price: 99,
    mrp: 199,
    description:
      "Sun-dried Holy Basil (Tulsi) leaves for teas, puja rituals and medicinal use. The most sacred plant in Hinduism, offering immunity, respiratory health and spiritual protection.",
    benefits:
      "Immunity support, Respiratory health, Spiritual protection, Sacred puja herb",
    astrologicalPurpose:
      "Sun, Jupiter — sacred herb for Vishnu and solar energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "herb-006",
    name: "Neem Powder 100g",
    category: "Herbs",
    price: 129,
    mrp: 249,
    description:
      "Pure Neem (Azadirachta indica) leaf powder for skin health, blood purification and anti-bacterial uses. A cornerstone of Ayurvedic medicine for skin and systemic detoxification.",
    benefits: "Skin health, Blood purification, Anti-bacterial, Detoxification",
    astrologicalPurpose: "Saturn — purification and detoxification herb",
    stock: BigInt(90),
    createdAt: BigInt(0),
  },
  {
    id: "herb-007",
    name: "Haritaki Powder 100g",
    category: "Herbs",
    price: 149,
    mrp: 299,
    description:
      "Pure Haritaki (Terminalia chebula) powder, the king of Ayurvedic herbs. Used for digestion, longevity, anti-aging and as a powerful rejuvenator in Chyawanprash formulations.",
    benefits:
      "Longevity support, Digestive health, Anti-aging properties, Rejuvenating herb",
    astrologicalPurpose: "Saturn — longevity and rejuvenation herb",
    stock: BigInt(80),
    createdAt: BigInt(0),
  },
  {
    id: "herb-008",
    name: "Kesar Saffron 1g",
    category: "Herbs",
    price: 199,
    mrp: 399,
    description:
      "Premium A-grade Kashmiri Kesar saffron threads, the most valuable spice used in Ayurveda, puja rituals and medicine. Boosts mood, memory and is a premium dietary supplement.",
    benefits:
      "Mood enhancement, Memory boost, Premium puja use, Ayurvedic supplement",
    astrologicalPurpose: "Sun, Jupiter — solar energy and divine grace herb",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
];

// ─── Conch & Shankh ─────────────────────────────────────────────────────────
export const SHANKH_PRODUCTS: ProductWithMRP[] = [
  {
    id: "shankh-001",
    name: "Original Dakshinavarta Shankh (Rare)",
    category: "Conch & Shankh",
    price: 2999,
    mrp: 5999,
    description:
      "Extremely rare Dakshinavarta (right-turning) Shankh, one of the most sacred and auspicious items in Hindu tradition. Associated with Lakshmi and Vishnu, said to attract immense wealth and remove Vastu doshas.",
    benefits:
      "Extreme wealth attraction, Vastu dosha removal, Lakshmi blessings, Rare collector's item",
    astrologicalPurpose:
      "Vishnu, Lakshmi — right-turning conch for supreme blessings",
    stock: BigInt(10),
    createdAt: BigInt(0),
  },
  {
    id: "shankh-002",
    name: "Natural Puja Shankh Medium",
    category: "Conch & Shankh",
    price: 499,
    mrp: 999,
    description:
      "Natural medium-sized puja shankh for daily aarti and worship. Blown at the beginning and end of puja to purify the environment and ward off negative energies.",
    benefits:
      "Daily puja use, Environment purification, Sound healing, Traditional worship",
    astrologicalPurpose: "Moon, Jupiter — Vishnu's shankh for purification",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  {
    id: "shankh-003",
    name: "Moti Shankh Pearl White",
    category: "Conch & Shankh",
    price: 799,
    mrp: 1599,
    description:
      "Beautiful pearl-white Moti Shankh with natural shine, used for offering water and milk to deities. Associated with Lakshmi worship and bringing prosperity and purity to the home.",
    benefits:
      "Deity water offering, Pearl-white beauty, Lakshmi association, Home prosperity",
    astrologicalPurpose: "Moon, Venus — pearl-like shankh for Lakshmi puja",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "shankh-004",
    name: "Vaijanti Shankh Set of 3",
    category: "Conch & Shankh",
    price: 699,
    mrp: 1299,
    description:
      "Set of 3 small Vaijanti Shankh shells, sacred to Lord Vishnu. Placed in puja rooms and cash lockers for wealth, protection and Vishnu's blessings.",
    benefits:
      "Set of 3 value, Vishnu blessings, Cash locker placement, Wealth protection",
    astrologicalPurpose: "Vishnu, Jupiter — Vaijanti mala and puja sacred set",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "shankh-005",
    name: "Brahma Shankh",
    category: "Conch & Shankh",
    price: 1499,
    mrp: 2999,
    description:
      "Sacred Brahma Shankh associated with Lord Brahma, the creator deity. Used for special rituals, Havans and ceremonies to invoke creative energy and divine blessings.",
    benefits:
      "Creator deity blessings, Special ritual use, Havan ceremonies, Divine creation energy",
    astrologicalPurpose: "Jupiter, Mercury — Brahma for knowledge and creation",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "shankh-006",
    name: "Small Shankh Set of 5",
    category: "Conch & Shankh",
    price: 399,
    mrp: 799,
    description:
      "Set of 5 small decorative shankhs for home mandir decor, Vastu placement and gifting. Each shankh is natural and auspicious, suitable for various ritual and decorative purposes.",
    benefits:
      "Set of 5 value, Gifting option, Mandir decor, Vastu corner placement",
    astrologicalPurpose:
      "Vishnu — shankh collection for home and puja decoration",
    stock: BigInt(70),
    createdAt: BigInt(0),
  },
];

// ─── Gutika ─────────────────────────────────────────────────────────────────
export const GUTIKA_PRODUCTS: ProductWithMRP[] = [
  {
    id: "gutika-001",
    name: "Sphatik Crystal Gutika 21 beads",
    category: "Gutika",
    price: 699,
    mrp: 1399,
    description:
      "Set of 21 pure Sphatik crystal beads (gutika) for japa, meditation and healing. Each bead is energized with Venus mantras and polished to a smooth sphere finish.",
    benefits:
      "Japa & meditation use, Venus energy, Crystal healing, 21-bead set",
    astrologicalPurpose:
      "Venus (Shukra) — Sphatik for clarity and positive energy",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "gutika-002",
    name: "Parad Mercury Gutika 1 bead",
    category: "Gutika",
    price: 999,
    mrp: 1999,
    description:
      "Single solidified mercury (Parad) gutika bead, one of the most powerful items in Tantric and Vedic tradition. Energized for Shiva's blessings, disease removal and spiritual protection.",
    benefits:
      "Shiva's supreme blessing, Disease removal, Spiritual protection, Tantric potency",
    astrologicalPurpose:
      "Shiva, Mercury — Parad for Shiva worship and purification",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
  {
    id: "gutika-003",
    name: "Sandalwood Gutika 21 beads",
    category: "Gutika",
    price: 499,
    mrp: 999,
    description:
      "21 natural sandalwood (Chandan) gutika beads for japa, meditation and fragrant puja use. The cooling and calming properties of sandalwood enhance spiritual practices.",
    benefits: "Cooling & calming, Japa meditation, Fragrant puja, Mental peace",
    astrologicalPurpose:
      "Moon, Venus — sandalwood for peace and deity offerings",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  {
    id: "gutika-004",
    name: "Rudraksha Gutika 11 beads",
    category: "Gutika",
    price: 799,
    mrp: 1499,
    description:
      "11 original 5-mukhi Rudraksha beads selected for japa, mantra counting and spiritual protection. Energized with Panchakshara mantra for Shiva's complete blessings.",
    benefits:
      "Shiva blessings, Mantra japa use, Spiritual protection, 5-mukhi Rudraksha",
    astrologicalPurpose:
      "Jupiter, Shiva — Rudraksha for spiritual growth and protection",
    stock: BigInt(45),
    createdAt: BigInt(0),
  },
  {
    id: "gutika-005",
    name: "Haldi Turmeric Gutika",
    category: "Gutika",
    price: 299,
    mrp: 599,
    description:
      "Sacred Haldi (Turmeric) gutika beads used in Ganesha and Goddess puja. A traditional item for Ganesh Chaturthi rituals and is believed to bring auspiciousness and remove obstacles.",
    benefits:
      "Ganesha puja use, Obstacle removal, Auspiciousness, Traditional ritual item",
    astrologicalPurpose: "Jupiter — Haldi as Jupiter's sacred herb in puja",
    stock: BigInt(70),
    createdAt: BigInt(0),
  },
  {
    id: "gutika-006",
    name: "Neem Gutika",
    category: "Gutika",
    price: 249,
    mrp: 499,
    description:
      "Natural Neem wood gutika beads for healing, protection and purification practices. Used in Saturn-related remedies and Shani puja rituals for appeasing Saturn's energy.",
    benefits:
      "Saturn remedy, Shani puja use, Purification properties, Healing protection",
    astrologicalPurpose:
      "Saturn (Shani) — Neem for Saturn pacification rituals",
    stock: BigInt(70),
    createdAt: BigInt(0),
  },
];

// ─── Parad Items ─────────────────────────────────────────────────────────────
export const PARAD_PRODUCTS: ProductWithMRP[] = [
  {
    id: "parad-001",
    name: "Original Parad Shivling 50g",
    category: "Parad Items",
    price: 1299,
    mrp: 1858,
    description:
      "Authentic 50g solidified Parad (mercury) Shivling, the supreme Shiva worship item in Tantric tradition. Worshipping a Parad Shivling is believed to be equal to visiting all 12 Jyotirlingas.",
    benefits:
      "Equal to 12 Jyotirlinga worship, Supreme Shiva blessing, Disease removal, Liberation path",
    astrologicalPurpose:
      "Shiva, Mercury — supreme Shivling for Moksha and blessings",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "parad-002",
    name: "Pure Parad Laxmi Ganesh Set",
    category: "Parad Items",
    price: 1965,
    mrp: 2358,
    description:
      "Set of Parad Lakshmi and Ganesh idols, energized for maximum wealth and obstacle removal. Worshipping this duo brings Lakshmi's wealth and Ganesha's success simultaneously.",
    benefits:
      "Wealth & success combination, Lakshmi-Ganesh duo, Diwali puja, Obstacle removal + wealth",
    astrologicalPurpose: "Lakshmi-Ganesh — Venus and Jupiter deity combination",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "parad-003",
    name: "Parad Gutika 1 bead",
    category: "Parad Items",
    price: 999,
    mrp: 1999,
    description:
      "Single pure Parad (solidified mercury) gutika bead. Worn or kept during puja, it is believed to grant immunity from diseases, remove negative planetary effects and bless with Shiva's grace.",
    benefits:
      "Disease immunity, Negative planet removal, Shiva's grace, Tantric power bead",
    astrologicalPurpose:
      "Shiva, Mercury — Parad bead for health and spiritual power",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
  {
    id: "parad-004",
    name: "Parad Rosary 108 beads",
    category: "Parad Items",
    price: 3999,
    mrp: 7999,
    description:
      "108-bead Parad mala rosary for Shiva mantra japa. Wearing or using a Parad mala is said to multiply the potency of mantras and provide extraordinary spiritual and material benefits.",
    benefits:
      "108-bead Shiva mala, Mantra multiplication, Extraordinary spiritual power, Premium collector item",
    astrologicalPurpose:
      "Shiva, Mercury — Parad mala for supreme mantra potency",
    stock: BigInt(10),
    createdAt: BigInt(0),
  },
  {
    id: "parad-005",
    name: "Parad Pyramid",
    category: "Parad Items",
    price: 799,
    mrp: 1599,
    description:
      "Pure Parad mercury pyramid for Vastu correction, energy amplification and protection. Pyramids made of Parad are considered uniquely powerful for generating positive energy fields.",
    benefits:
      "Vastu energy correction, Energy amplification, Protection field, Unique Parad material",
    astrologicalPurpose: "Mercury, Shiva — Parad pyramid for spatial energy",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "parad-006",
    name: "Parad Sudarshana Chakra",
    category: "Parad Items",
    price: 599,
    mrp: 1199,
    description:
      "Parad (mercury) Sudarshana Chakra disc, the sacred weapon of Lord Vishnu. Kept in the home for divine protection, enemy defeat and the removal of all negative influences.",
    benefits:
      "Vishnu divine protection, Enemy defeat, Negative influence removal, Sudarshana blessings",
    astrologicalPurpose:
      "Vishnu, Sun — Sudarshana Chakra for divine protection",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
];

// ─── Zodiac Bracelets ────────────────────────────────────────────────────────
export const ZODIAC_BRACELETS: ProductWithMRP[] = [
  {
    id: "zbrac-001",
    name: "Aries (Mesh) Natural Stone Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    mrp: 999,
    description:
      "Natural stone bracelet with Bloodstone and Red Jasper gemstones tailored for Aries (Mesh) rashi. Energized to boost Mars energy, courage, leadership and physical vitality.",
    benefits:
      "Mars energy boost, Courage & leadership, Physical vitality, Aries rashi bracelet",
    astrologicalPurpose: "Mars (Mangal) — Aries / Mesh rashi patron planet",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "zbrac-002",
    name: "Taurus (Vrishabh) Stone Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    mrp: 999,
    description:
      "Natural Rose Quartz and Green Aventurine bracelet for Taurus (Vrishabh) rashi. Enhances Venus energy, stability, material abundance and emotional harmony.",
    benefits:
      "Venus enhancement, Material stability, Emotional harmony, Abundance attraction",
    astrologicalPurpose:
      "Venus (Shukra) — Taurus / Vrishabh rashi patron planet",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "zbrac-003",
    name: "Gemini (Mithun) Dual Stone Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    mrp: 999,
    description:
      "Dual-stone Citrine and Clear Quartz bracelet for Gemini (Mithun) rashi. Boosts Mercury energy for communication, intelligence, business acumen and mental agility.",
    benefits:
      "Mercury boost, Communication skills, Intelligence enhancement, Business acumen",
    astrologicalPurpose: "Mercury (Budh) — Gemini / Mithun rashi patron planet",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "zbrac-004",
    name: "Cancer (Kark) Pearl Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    mrp: 999,
    description:
      "Natural pearl and moonstone bracelet for Cancer (Kark) rashi. Calms emotions, enhances intuition, improves family relationships and strengthens Moon energy.",
    benefits: "Emotional calm, Intuition boost, Family harmony, Moon energy",
    astrologicalPurpose: "Moon (Chandra) — Cancer / Kark rashi patron planet",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "zbrac-005",
    name: "Leo (Simha) Ruby Stone Bracelet",
    category: "Zodiac Bracelets",
    price: 699,
    mrp: 1199,
    description:
      "Natural Ruby and Sunstone bracelet for Leo (Simha) rashi. Amplifies Sun energy for leadership, authority, creativity and confidence in the wearer.",
    benefits:
      "Sun energy amplification, Leadership & authority, Creativity, Confidence boost",
    astrologicalPurpose: "Sun (Surya) — Leo / Simha rashi patron planet",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "zbrac-006",
    name: "Virgo (Kanya) Emerald Bracelet",
    category: "Zodiac Bracelets",
    price: 699,
    mrp: 1199,
    description:
      "Natural Emerald and Green Tourmaline bracelet for Virgo (Kanya) rashi. Enhances Mercury's analytical energy for precision, health, service and intellectual perfection.",
    benefits:
      "Analytical precision, Health focus, Mercury energy, Intellectual perfection",
    astrologicalPurpose: "Mercury (Budh) — Virgo / Kanya rashi patron planet",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "zbrac-007",
    name: "Libra (Tula) Opal Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    mrp: 999,
    description:
      "Natural Opal and Rose Quartz bracelet for Libra (Tula) rashi. Enhances Venus energy for harmony, balance, creativity, relationships and aesthetic beauty.",
    benefits:
      "Relationship harmony, Creative inspiration, Balance & beauty, Venus blessings",
    astrologicalPurpose: "Venus (Shukra) — Libra / Tula rashi patron planet",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "zbrac-008",
    name: "Scorpio (Vrishchik) Red Coral Bracelet",
    category: "Zodiac Bracelets",
    price: 699,
    mrp: 1199,
    description:
      "Natural Red Coral and Obsidian bracelet for Scorpio (Vrishchik) rashi. Channels Mars energy for depth, transformation, protection and emotional intensity.",
    benefits:
      "Mars power, Transformation support, Deep protection, Emotional strength",
    astrologicalPurpose:
      "Mars (Mangal) — Scorpio / Vrishchik rashi patron planet",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "zbrac-009",
    name: "Sagittarius (Dhanu) Yellow Sapphire Bracelet",
    category: "Zodiac Bracelets",
    price: 799,
    mrp: 1499,
    description:
      "Natural Yellow Sapphire and Citrine bracelet for Sagittarius (Dhanu) rashi. Amplifies Jupiter energy for wisdom, spiritual growth, higher learning and expansion.",
    benefits:
      "Jupiter amplification, Wisdom & knowledge, Spiritual growth, Higher learning",
    astrologicalPurpose:
      "Jupiter (Guru) — Sagittarius / Dhanu rashi patron planet",
    stock: BigInt(35),
    createdAt: BigInt(0),
  },
  {
    id: "zbrac-010",
    name: "Capricorn (Makar) Blue Sapphire Bracelet",
    category: "Zodiac Bracelets",
    price: 799,
    mrp: 1499,
    description:
      "Natural Blue Sapphire and Lapis Lazuli bracelet for Capricorn (Makar) rashi. Enhances Saturn energy for discipline, career advancement, long-term success and structure.",
    benefits:
      "Career advancement, Discipline & focus, Saturn energy, Long-term success",
    astrologicalPurpose:
      "Saturn (Shani) — Capricorn / Makar rashi patron planet",
    stock: BigInt(35),
    createdAt: BigInt(0),
  },
  {
    id: "zbrac-011",
    name: "Aquarius (Kumbh) Amethyst Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    mrp: 999,
    description:
      "Natural Amethyst and Sodalite bracelet for Aquarius (Kumbh) rashi. Enhances Saturn and Rahu energy for innovation, humanitarian pursuits, spiritual insight and originality.",
    benefits:
      "Innovation boost, Spiritual insight, Humanitarian energy, Originality",
    astrologicalPurpose: "Saturn, Rahu — Aquarius / Kumbh rashi patron planets",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "zbrac-012",
    name: "Pisces (Meen) Yellow Topaz Bracelet",
    category: "Zodiac Bracelets",
    price: 699,
    mrp: 1199,
    description:
      "Natural Yellow Topaz and Aquamarine bracelet for Pisces (Meen) rashi. Channels Jupiter energy for compassion, spirituality, creative intuition and divine connection.",
    benefits:
      "Jupiter compassion, Spiritual intuition, Creative flow, Divine connection",
    astrologicalPurpose: "Jupiter (Guru) — Pisces / Meen rashi patron planet",
    stock: BigInt(45),
    createdAt: BigInt(0),
  },
];

// ─── Kada Bracelets ──────────────────────────────────────────────────────────
export const KADA_BRACELETS: ProductWithMRP[] = [
  {
    id: "kada-001",
    name: "Om Namah Shivaya Copper Kada",
    category: "Kada Bracelets",
    price: 349,
    mrp: 699,
    description:
      "Pure copper kada engraved with 'Om Namah Shivaya' mantra, energized with Shiva mantras. Copper harnesses Mars and Saturn energy while the Shiva mantra provides divine protection.",
    benefits:
      "Shiva protection, Copper healing, Mars-Saturn balance, Spiritual mantra",
    astrologicalPurpose:
      "Shiva, Mars, Saturn — Panchakshara mantra copper kada",
    stock: BigInt(70),
    createdAt: BigInt(0),
  },
  {
    id: "kada-002",
    name: "Navgrah Copper Kada",
    category: "Kada Bracelets",
    price: 449,
    mrp: 899,
    description:
      "Copper kada engraved with symbols and mantras of all 9 Navagrahas. Energized to harmonize all planetary influences simultaneously and provide complete astrological protection.",
    benefits:
      "All 9 planets harmonized, Complete protection, Astrological balance, Copper healing",
    astrologicalPurpose: "All 9 planets (Navagrahas) — complete planetary kada",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  {
    id: "kada-003",
    name: "Silver-Plated Shiv Kada",
    category: "Kada Bracelets",
    price: 599,
    mrp: 1199,
    description:
      "Silver-plated kada featuring Shiva's Trishul, Damru and Nandi engravings. Energized through Mahashivratri puja for Shiva's blessings, protection and spiritual growth.",
    benefits:
      "Shiva blessings, Silver healing properties, Spiritual growth, Trishul protection",
    astrologicalPurpose:
      "Shiva — Trishul and Damru symbolism for divine protection",
    stock: BigInt(55),
    createdAt: BigInt(0),
  },
  {
    id: "kada-004",
    name: "Mahakal Gold-Plated Kada",
    category: "Kada Bracelets",
    price: 699,
    mrp: 1399,
    description:
      "Premium gold-plated Mahakal (Kaal Bhairav) kada with fierce deity engravings. Energized for protection against black magic, time-related fears and negative forces.",
    benefits:
      "Mahakal fierce protection, Black magic shield, Time mastery, Gold-plated premium",
    astrologicalPurpose:
      "Saturn, Shiva — Kaal Bhairav for time and protection mastery",
    stock: BigInt(45),
    createdAt: BigInt(0),
  },
  {
    id: "kada-005",
    name: "Stainless Steel Om Kada",
    category: "Kada Bracelets",
    price: 299,
    mrp: 599,
    description:
      "Durable stainless steel kada with Om symbol engraving. A modern, rust-free everyday spiritual bracelet providing universal divine protection and positive energy.",
    benefits:
      "Rust-free durability, Daily wear comfort, Universal Om protection, Affordable",
    astrologicalPurpose: "All deities — universal Om symbol protection",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "kada-006",
    name: "Brass Rudraksha Kada",
    category: "Kada Bracelets",
    price: 499,
    mrp: 999,
    description:
      "Brass kada embedded with natural Rudraksha beads and Om engravings. Combines the healing power of brass with the spiritual potency of Rudraksha for holistic protection.",
    benefits:
      "Rudraksha healing, Brass conductivity, Combined spiritual power, Shiva-Jupiter blessings",
    astrologicalPurpose: "Jupiter, Shiva — Rudraksha and brass combination",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  {
    id: "kada-007",
    name: "Copper 7 Chakra Kada",
    category: "Kada Bracelets",
    price: 399,
    mrp: 799,
    description:
      "Pure copper kada with 7 chakra crystal inlays — from root to crown. Energized to balance and activate all chakras, promoting physical, emotional and spiritual well-being.",
    benefits:
      "7 chakra activation, Full energy balance, Copper healing, Crystal inlays",
    astrologicalPurpose:
      "All planets — 7 chakras correspond to 7 classical planets",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  {
    id: "kada-008",
    name: "Panchdhatu Kada",
    category: "Kada Bracelets",
    price: 799,
    mrp: 1599,
    description:
      "Premium Panchdhatu (five metals: gold, silver, copper, brass, iron) kada, a sacred alloy used in Vedic traditions. Energized to balance all five elements and planetary metals simultaneously.",
    benefits:
      "Five metal synergy, All planetary metals balanced, Five element harmony, Premium Vedic alloy",
    astrologicalPurpose:
      "All 9 planets — five sacred metals for complete planetary balance",
    stock: BigInt(35),
    createdAt: BigInt(0),
  },
];

// ─── 3D Lamps ─────────────────────────────────────────────────────────────────
export const LAMPS_3D: ProductWithMRP[] = [
  {
    id: "lamp-001",
    name: "Radhe Krishna 3D Lamp",
    category: "3D Lamps",
    price: 699,
    description:
      "Beautiful 3D illuminated Radhe Krishna lamp for home decor and puja.",
    benefits: "Divine blessings, love, home decor",
    astrologicalPurpose: "Krishna blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "lamp-002",
    name: "Hanuman Ji 3D Lamp",
    category: "3D Lamps",
    price: 699,
    description: "Powerful Hanuman Ji 3D lamp, brings courage and protection.",
    benefits: "Courage, protection, divine energy",
    astrologicalPurpose: "Hanuman blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "lamp-003",
    name: "Laxmi Ganesh 3D Lamp",
    category: "3D Lamps",
    price: 699,
    description:
      "Auspicious Laxmi Ganesh 3D lamp for prosperity and blessings.",
    benefits: "Prosperity, blessings, wealth",
    astrologicalPurpose: "Lakshmi-Ganesha blessings",
    stock: BigInt(0),
    createdAt: BigInt(0),
  },
  {
    id: "lamp-004",
    name: "Ma Amba 3D Lamp",
    category: "3D Lamps",
    price: 699,
    description:
      "Divine Ma Amba 3D lamp, brings divine blessings of the mother goddess.",
    benefits: "Divine mother's blessings, protection, strength",
    astrologicalPurpose: "Amba/Durga blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Spiritual Necklaces ───────────────────────────────────────────────────────
export const SPIRITUAL_NECKLACES: ProductWithMRP[] = [
  {
    id: "neck-001",
    name: "24K Gold Plated OM Necklace",
    category: "Necklaces",
    price: 399,
    description:
      "24K gold plated OM necklace, spiritually energized for peace and divine connection.",
    benefits: "Spiritual peace, divine connection, positivity",
    astrologicalPurpose: "Universal divine energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-002",
    name: "Silver Plated Hanuman Locket",
    category: "Necklaces",
    price: 299,
    description:
      "Silver plated Hanuman locket for courage, strength, and protection.",
    benefits: "Courage, strength, protection from evil",
    astrologicalPurpose: "Hanuman/Mars blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-003",
    name: "Gold Plated Trishool Rudraksha Necklace",
    category: "Necklaces",
    price: 499,
    description:
      "Gold plated Trishool with Rudraksha necklace — Shiva's blessing for strength.",
    benefits: "Shiva blessings, strength, obstacle removal",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-004",
    name: "Divine Hanuman Locket",
    category: "Necklaces",
    price: 299,
    description:
      "Divine Hanuman locket with devotional finish for everyday protection.",
    benefits: "Protection, devotion, courage",
    astrologicalPurpose: "Hanuman blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-005",
    name: "Karungali Mala",
    category: "Necklaces",
    price: 599,
    description:
      "Sacred Karungali (Ebony wood) mala for meditation and spiritual protection.",
    benefits: "Meditation, spiritual protection, negative energy removal",
    astrologicalPurpose: "Saturn/Shani blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-006",
    name: "Gold Plated Ram Naam Necklace",
    category: "Necklaces",
    price: 499,
    description:
      "Gold plated Ram Naam necklace — Rama's sacred name for protection and grace.",
    benefits: "Divine protection, righteousness, peace",
    astrologicalPurpose: "Rama blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-007",
    name: "Mahabali Hanuman Necklace",
    category: "Necklaces",
    price: 299,
    description:
      "Mahabali Hanuman necklace for immense strength and fearlessness.",
    benefits: "Immense strength, fearlessness, protection",
    astrologicalPurpose: "Hanuman/Mars blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-008",
    name: "Maha Mrityunjaya Mantra Necklace",
    category: "Necklaces",
    price: 499,
    description:
      "Maha Mrityunjaya mantra inscribed necklace for health and longevity.",
    benefits: "Health, longevity, protection from disease",
    astrologicalPurpose: "Shiva/Mahamrityunjaya",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-009",
    name: "Silver Plated Gada Pendant",
    category: "Necklaces",
    price: 299,
    description:
      "Silver plated Gada (mace) pendant — Vishnu's divine weapon for protection.",
    benefits: "Divine protection, strength, Vishnu blessings",
    astrologicalPurpose: "Vishnu blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-010",
    name: "Mahadev Locket with Rudraksha Mala",
    category: "Necklaces",
    price: 299,
    description:
      "Mahadev locket with authentic Rudraksha mala — Shiva's complete blessing.",
    benefits: "Shiva blessings, meditation, spiritual growth",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-011",
    name: "Divine Mahadev Locket",
    category: "Necklaces",
    price: 399,
    description: "Premium divine Mahadev locket with detailed Shiva imagery.",
    benefits: "Shiva blessings, protection, spiritual energy",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-012",
    name: "Ganesha Pendant",
    category: "Necklaces",
    price: 299,
    description:
      "Auspicious Ganesha pendant — removes obstacles and brings success.",
    benefits: "Obstacle removal, success, new beginnings",
    astrologicalPurpose: "Ganesha blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-013",
    name: "Silver Krishna Necklace",
    category: "Necklaces",
    price: 299,
    description:
      "Silver Krishna necklace with divine flute motif for love and joy.",
    benefits: "Divine love, joy, spiritual bliss",
    astrologicalPurpose: "Krishna blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-014",
    name: "Divine Mahadev With Trishul",
    category: "Necklaces",
    price: 599,
    description:
      "Premium Mahadev with Trishul pendant — powerful Shiva energy for transformation.",
    benefits: "Transformation, power, protection, liberation",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-015",
    name: "Divine Krishna Necklace",
    category: "Necklaces",
    price: 599,
    description: "Premium divine Krishna necklace with detailed craftsmanship.",
    benefits: "Divine grace, love, spiritual wisdom",
    astrologicalPurpose: "Krishna blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-016",
    name: "Divine Bahubali Necklace",
    category: "Necklaces",
    price: 599,
    description:
      "Powerful Bahubali Hanuman necklace for immense strength and victory.",
    benefits: "Strength, victory, fearlessness, protection",
    astrologicalPurpose: "Hanuman blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-017",
    name: "Durga Mata Locket",
    category: "Necklaces",
    price: 399,
    description:
      "Durga Mata locket for divine feminine protection and strength.",
    benefits: "Protection, strength, divine feminine energy",
    astrologicalPurpose: "Durga blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-018",
    name: "Shiv Locket",
    category: "Necklaces",
    price: 299,
    description:
      "Classic Shiv locket — Shiva's blessings for peace, protection, and liberation.",
    benefits: "Peace, protection, liberation",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-019",
    name: "Saraswati Pendant",
    category: "Necklaces",
    price: 299,
    description:
      "Saraswati pendant for knowledge, learning, and artistic inspiration.",
    benefits: "Knowledge, learning, creativity, wisdom",
    astrologicalPurpose: "Saraswati blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-020",
    name: "Lakshmi Pendant",
    category: "Necklaces",
    price: 399,
    description:
      "Shri Lakshmi pendant for wealth, prosperity, and divine grace.",
    benefits: "Wealth, prosperity, abundance",
    astrologicalPurpose: "Lakshmi blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-021",
    name: "Radha Krishna Pendant",
    category: "Necklaces",
    price: 499,
    description:
      "Divine Radha Krishna pendant symbolizing eternal love and devotion.",
    benefits: "Divine love, devotion, relationship harmony",
    astrologicalPurpose: "Krishna blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-022",
    name: "Om Namah Shivay Locket",
    category: "Necklaces",
    price: 299,
    description:
      "Om Namah Shivay mantra locket — continuous Shiva energy and protection.",
    benefits: "Shiva protection, peace, spiritual energy",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-023",
    name: "Gayatri Yantra Pendant",
    category: "Necklaces",
    price: 399,
    description:
      "Gayatri Yantra pendant for divine light, wisdom, and spiritual illumination.",
    benefits: "Divine light, wisdom, spiritual growth",
    astrologicalPurpose: "Gayatri/Surya blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-024",
    name: "Rudraksha Om Pendant",
    category: "Necklaces",
    price: 499,
    description:
      "Rudraksha with OM symbol pendant — Shiva's sacred seed for spiritual power.",
    benefits: "Spiritual power, peace, Shiva blessings",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-025",
    name: "Navdurga Pendant",
    category: "Necklaces",
    price: 499,
    description:
      "Nine forms of Durga pendant — complete divine feminine protection.",
    benefits: "Complete divine protection, power, courage",
    astrologicalPurpose: "Navdurga blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-026",
    name: "Trishul Pendant",
    category: "Necklaces",
    price: 299,
    description:
      "Shiva's Trishul pendant for protection, strength, and divine power.",
    benefits: "Protection, strength, Shiva's divine power",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-027",
    name: "Shree Ram Locket",
    category: "Necklaces",
    price: 299,
    description:
      "Shree Ram locket for righteous living, protection, and divine grace.",
    benefits: "Divine grace, righteousness, protection",
    astrologicalPurpose: "Rama blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-028",
    name: "Vishnu Chakra Pendant",
    category: "Necklaces",
    price: 399,
    description:
      "Vishnu's Sudarshana Chakra pendant for divine protection and justice.",
    benefits: "Divine protection, justice, spiritual power",
    astrologicalPurpose: "Vishnu blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-029",
    name: "Sudarshana Pendant",
    category: "Necklaces",
    price: 499,
    description:
      "Sudarshana Chakra pendant — Vishnu's divine disc for complete protection.",
    benefits: "Complete protection, divine grace, obstacle removal",
    astrologicalPurpose: "Vishnu blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-030",
    name: "Sai Baba Locket",
    category: "Necklaces",
    price: 299,
    description:
      "Sai Baba locket for peace, healing, and divine guidance in life.",
    benefits: "Peace, healing, divine guidance",
    astrologicalPurpose: "Sai Baba blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "neck-031",
    name: "Panchmukhi Hanuman Pendant",
    category: "Necklaces",
    price: 499,
    description:
      "Five-faced Hanuman pendant — ultimate protection against all negative forces.",
    benefits: "Ultimate protection, all-round blessings, fearlessness",
    astrologicalPurpose: "Panchmukhi Hanuman blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Gold Jewellery ────────────────────────────────────────────────────────────
export const GOLD_JEWELLERY: ProductWithMRP[] = [
  {
    id: "gold-001",
    name: "24K Gold OM Necklace",
    category: "Gold Jewellery",
    price: 399,
    description:
      "24K gold plated OM necklace — divine symbol for spiritual connection.",
    benefits: "Spiritual connection, peace, divine energy",
    astrologicalPurpose: "Universal divine energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "gold-002",
    name: "Carved Om Gold Bracelet",
    category: "Gold Jewellery",
    price: 699,
    description:
      "Elegantly carved OM symbol gold bracelet for daily spiritual practice.",
    benefits: "Spiritual energy, protection, divine connection",
    astrologicalPurpose: "Universal divine energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "gold-003",
    name: "Gold Ram Naam Necklace",
    category: "Gold Jewellery",
    price: 499,
    description:
      "Gold Ram Naam necklace — sacred name of Lord Rama for constant divine grace.",
    benefits: "Divine grace, protection, righteousness",
    astrologicalPurpose: "Rama blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "gold-004",
    name: "Gold Trisul Pendant",
    category: "Gold Jewellery",
    price: 499,
    description:
      "Gold Trisul (Trishul) pendant — Shiva's divine weapon for power and protection.",
    benefits: "Power, protection, Shiva blessings",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "gold-005",
    name: "Santino Mens Bracelet",
    category: "Gold Jewellery",
    price: 699,
    description:
      "Stylish Santino men's bracelet with spiritual motif for strength and confidence.",
    benefits: "Confidence, strength, style",
    astrologicalPurpose: "Sun blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "gold-006",
    name: "Gold Om Ram Necklace Buy1Get1",
    category: "Gold Jewellery",
    price: 499,
    description:
      "Special Buy 1 Get 1 offer on Gold Om Ram Necklace — double the divine blessing.",
    benefits: "Divine blessing, protection, value offer",
    astrologicalPurpose: "OM and Rama blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "gold-007",
    name: "Shree Ram Gold Bracelet",
    category: "Gold Jewellery",
    price: 499,
    description:
      "Shree Ram inscribed gold bracelet for constant divine protection.",
    benefits: "Divine protection, righteousness, peace",
    astrologicalPurpose: "Rama blessings",
    stock: BigInt(0),
    createdAt: BigInt(0),
  },
  {
    id: "gold-008",
    name: "Shiva Om Gold Bracelet",
    category: "Gold Jewellery",
    price: 499,
    description:
      "Shiva OM gold bracelet — Mahadeva's divine energy for liberation and peace.",
    benefits: "Liberation, peace, Shiva energy",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(0),
    createdAt: BigInt(0),
  },
  {
    id: "gold-009",
    name: "Gold Trishool Pendant",
    category: "Gold Jewellery",
    price: 499,
    description:
      "Premium gold Trishool pendant with intricate Shiva detailing.",
    benefits: "Shiva blessings, power, protection",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(0),
    createdAt: BigInt(0),
  },
  {
    id: "gold-010",
    name: "Gold Ganesh Bracelet",
    category: "Gold Jewellery",
    price: 599,
    description:
      "Gold Ganesha bracelet — the remover of obstacles for success and new beginnings.",
    benefits: "Obstacle removal, success, prosperity",
    astrologicalPurpose: "Ganesha blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Idols ─────────────────────────────────────────────────────────────────────
export const IDOLS_PRODUCTS: ProductWithMRP[] = [
  {
    id: "idol-001",
    name: "Pyrite Tortoise",
    category: "Idols",
    price: 499,
    description:
      "Feng Shui pyrite tortoise for wealth, stability, and positive energy at home.",
    benefits: "Wealth, stability, positive Feng Shui energy",
    astrologicalPurpose: "Vishnu/Kuber blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "idol-002",
    name: "Radhe Krishna Lamp Idol",
    category: "Idols",
    price: 699,
    description:
      "3D lamp idol of Radhe Krishna — divine love and devotion for home shrine.",
    benefits: "Divine love, devotion, home blessings",
    astrologicalPurpose: "Krishna blessings",
    stock: BigInt(0),
    createdAt: BigInt(0),
  },
  {
    id: "idol-003",
    name: "Wooden Hanuman Car Dashboard",
    category: "Idols",
    price: 499,
    description:
      "Beautifully carved wooden Hanuman idol for car dashboard — travel protection.",
    benefits: "Travel protection, courage, Hanuman blessings",
    astrologicalPurpose: "Hanuman blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "idol-004",
    name: "Adiyogi Car Dashboard",
    category: "Idols",
    price: 499,
    description:
      "Shiva Adiyogi idol for car dashboard — brings peace and divine presence on the road.",
    benefits: "Peace, divine presence, safe travel",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "idol-005",
    name: "Bahubali Hanuman Idol",
    category: "Idols",
    price: 499,
    description:
      "Powerful Bahubali Hanuman idol for home or office — immense strength and protection.",
    benefits: "Immense strength, protection, fearlessness",
    astrologicalPurpose: "Hanuman blessings",
    stock: BigInt(0),
    createdAt: BigInt(0),
  },
];

// ─── Rings (non-gemstone) ──────────────────────────────────────────────────────
export const RINGS_NON_GEM: ProductWithMRP[] = [
  {
    id: "ring-001",
    name: "Om Silver Ring",
    category: "Rings",
    price: 599,
    description:
      "925 silver Om ring for spiritual connection and peace of mind.",
    benefits: "Spiritual connection, peace, divine energy",
    astrologicalPurpose: "Universal divine energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "ring-002",
    name: "Trishul Ring",
    category: "Rings",
    price: 699,
    description:
      "Trishul design ring — Shiva's divine weapon for protection and strength.",
    benefits: "Protection, strength, Shiva blessings",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "ring-003",
    name: "Navratna Ring",
    category: "Rings",
    price: 999,
    description:
      "Nine gemstone Navratna ring representing all nine planets for all-round blessings.",
    benefits: "All-round planetary blessings, balance, prosperity",
    astrologicalPurpose: "All nine planets",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "ring-004",
    name: "Ganesh Ring",
    category: "Rings",
    price: 599,
    description: "Ganesh design ring for obstacle removal and new beginnings.",
    benefits: "Obstacle removal, success, new beginnings",
    astrologicalPurpose: "Ganesha blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "ring-005",
    name: "Shiv Shakti Ring",
    category: "Rings",
    price: 799,
    description:
      "Shiv Shakti ring — combined energy of Shiva and Parvati for harmony and power.",
    benefits: "Harmony, power, divine union, protection",
    astrologicalPurpose: "Shiva-Shakti blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "ring-006",
    name: "Ram Navami Ring",
    category: "Rings",
    price: 699,
    description:
      "Shree Ram ring for righteousness, protection, and divine grace.",
    benefits: "Righteousness, divine grace, protection",
    astrologicalPurpose: "Rama blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "ring-007",
    name: "Durga Ring",
    category: "Rings",
    price: 699,
    description: "Durga Mata ring for divine feminine protection and courage.",
    benefits: "Divine protection, courage, strength",
    astrologicalPurpose: "Durga blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "ring-008",
    name: "Sai Baba Ring",
    category: "Rings",
    price: 599,
    description:
      "Sai Baba ring for peace, healing, and divine guidance in daily life.",
    benefits: "Peace, healing, divine guidance",
    astrologicalPurpose: "Sai Baba blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "ring-009",
    name: "Silver Lotus Ring",
    category: "Rings",
    price: 499,
    description:
      "Elegant silver lotus ring — symbol of purity and spiritual awakening.",
    benefits: "Purity, spiritual awakening, elegance",
    astrologicalPurpose: "Lakshmi blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "ring-010",
    name: "Gold Plated Om Ring",
    category: "Rings",
    price: 599,
    description:
      "Gold plated Om ring for spiritual fashion and divine connection.",
    benefits: "Spiritual fashion, divine connection, peace",
    astrologicalPurpose: "Universal divine energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "ring-011",
    name: "Rudraksha Band Ring",
    category: "Rings",
    price: 399,
    description:
      "Rudraksha bead band ring for spiritual protection and Shiva's blessings.",
    benefits: "Spiritual protection, Shiva blessings, meditation",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "ring-012",
    name: "Hamsa Ring",
    category: "Rings",
    price: 499,
    description: "Hamsa hand ring for protection, luck, and divine blessings.",
    benefits: "Protection, luck, divine blessings",
    astrologicalPurpose: "Divine protection",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Gemstone Rings with Ratti Variants ───────────────────────────────────────
export const GEMSTONE_RINGS: ProductWithMRP[] = [
  {
    id: "ring-gem-001",
    name: "Ruby Ring (Manik)",
    category: "Rings",
    price: 2999,
    description:
      "Natural certified Ruby (Manik) ring for Sun energy — success, leadership, and vitality.",
    benefits: "Sun energy, success, leadership, vitality, confidence",
    astrologicalPurpose: "Sun (Surya) gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
    variants: [
      { id: "ring-gem-001-a", name: "3-4 Ratti", price: 2999, stock: 100 },
      { id: "ring-gem-001-b", name: "4-5 Ratti", price: 4999, stock: 100 },
      { id: "ring-gem-001-c", name: "5-6 Ratti", price: 6999, stock: 100 },
      { id: "ring-gem-001-d", name: "7-8 Ratti", price: 9499, stock: 50 },
      { id: "ring-gem-001-e", name: "10-11 Ratti", price: 14999, stock: 20 },
    ],
  },
  {
    id: "ring-gem-002",
    name: "Emerald Ring (Panna)",
    category: "Rings",
    price: 2499,
    description:
      "Natural certified Emerald (Panna) ring for Mercury — intelligence, communication, business.",
    benefits: "Mercury energy, intelligence, communication, business success",
    astrologicalPurpose: "Mercury (Budh) gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
    variants: [
      { id: "ring-gem-002-a", name: "3-4 Ratti", price: 2499, stock: 100 },
      { id: "ring-gem-002-b", name: "4-5 Ratti", price: 3999, stock: 100 },
      { id: "ring-gem-002-c", name: "5-6 Ratti", price: 5499, stock: 100 },
      { id: "ring-gem-002-d", name: "7-8 Ratti", price: 7999, stock: 50 },
      { id: "ring-gem-002-e", name: "10-11 Ratti", price: 12999, stock: 20 },
    ],
  },
  {
    id: "ring-gem-003",
    name: "Blue Sapphire Ring (Neelam)",
    category: "Rings",
    price: 3499,
    description:
      "Natural certified Blue Sapphire (Neelam) ring for Saturn — discipline and success.",
    benefits: "Saturn energy, discipline, success, karmic resolution",
    astrologicalPurpose: "Saturn (Shani) gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
    variants: [
      { id: "ring-gem-003-a", name: "3-4 Ratti", price: 3499, stock: 100 },
      { id: "ring-gem-003-b", name: "4-5 Ratti", price: 5999, stock: 100 },
      { id: "ring-gem-003-c", name: "5-6 Ratti", price: 8499, stock: 80 },
      { id: "ring-gem-003-d", name: "7-8 Ratti", price: 11999, stock: 50 },
      { id: "ring-gem-003-e", name: "10-11 Ratti", price: 17999, stock: 15 },
    ],
  },
  {
    id: "ring-gem-004",
    name: "Yellow Sapphire Ring (Pukhraj)",
    category: "Rings",
    price: 2999,
    description:
      "Natural certified Yellow Sapphire (Pukhraj) ring for Jupiter — wisdom and fortune.",
    benefits: "Jupiter energy, wisdom, fortune, marriage, spiritual growth",
    astrologicalPurpose: "Jupiter (Guru) gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
    variants: [
      { id: "ring-gem-004-a", name: "3-4 Ratti", price: 2999, stock: 100 },
      { id: "ring-gem-004-b", name: "4-5 Ratti", price: 4999, stock: 100 },
      { id: "ring-gem-004-c", name: "5-6 Ratti", price: 6999, stock: 80 },
      { id: "ring-gem-004-d", name: "7-8 Ratti", price: 9999, stock: 50 },
      { id: "ring-gem-004-e", name: "10-11 Ratti", price: 14999, stock: 20 },
    ],
  },
];

// ─── Bracelets (general) ───────────────────────────────────────────────────────
export const BRACELETS_GENERAL: ProductWithMRP[] = [
  {
    id: "brac-001",
    name: "Om Beads Bracelet",
    category: "Bracelets",
    price: 399,
    description:
      "Om beads bracelet for daily spiritual protection and positive energy.",
    benefits: "Spiritual protection, positive energy, peace",
    astrologicalPurpose: "Universal divine energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "brac-002",
    name: "Rudraksha Stretch Bracelet",
    category: "Bracelets",
    price: 499,
    description:
      "5 Mukhi Rudraksha stretch bracelet for health and spiritual growth.",
    benefits: "Health, spiritual growth, positive energy",
    astrologicalPurpose: "Shiva/Jupiter blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "brac-003",
    name: "7 Chakra Bracelet",
    category: "Bracelets",
    price: 599,
    description:
      "Seven chakra crystal bracelet for energy balancing and spiritual alignment.",
    benefits: "Chakra balancing, spiritual alignment, energy healing",
    astrologicalPurpose: "All seven chakras",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "brac-004",
    name: "Tiger Eye Bracelet",
    category: "Bracelets",
    price: 699,
    description:
      "Natural Tiger Eye bracelet for courage, confidence, and abundance.",
    benefits: "Courage, confidence, abundance, protection",
    astrologicalPurpose: "Sun/Mars energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "brac-005",
    name: "Crystal Bead Bracelet",
    category: "Bracelets",
    price: 399,
    description:
      "Natural crystal bead bracelet for positive energy and stylish spiritual wear.",
    benefits: "Positive energy, spiritual clarity, style",
    astrologicalPurpose: "Crystal healing",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "brac-006",
    name: "Lotus Charm Bracelet",
    category: "Bracelets",
    price: 499,
    description:
      "Silver lotus charm bracelet symbolizing purity and divine grace.",
    benefits: "Purity, grace, spiritual beauty",
    astrologicalPurpose: "Lakshmi blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "brac-007",
    name: "Amethyst Bracelet",
    category: "Bracelets",
    price: 699,
    description:
      "Natural Amethyst bracelet for spiritual protection and inner peace.",
    benefits: "Spiritual protection, inner peace, intuition",
    astrologicalPurpose: "Jupiter/Saturn gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "brac-008",
    name: "Rose Quartz Bracelet",
    category: "Bracelets",
    price: 599,
    description:
      "Natural Rose Quartz bracelet for love, compassion, and emotional healing.",
    benefits: "Love, compassion, emotional healing, relationships",
    astrologicalPurpose: "Venus gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "brac-009",
    name: "Stainless Steel Om Kada",
    category: "Bracelets",
    price: 799,
    description:
      "Stainless steel Om Kada for strength, spiritual energy, and modern style.",
    benefits: "Strength, spiritual energy, durability",
    astrologicalPurpose: "Universal divine energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "brac-010",
    name: "Copper Kada",
    category: "Bracelets",
    price: 599,
    description:
      "Pure copper Kada for health benefits and Mars energy enhancement.",
    benefits: "Health benefits, Mars energy, joint pain relief",
    astrologicalPurpose: "Mars (Mangal) energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "brac-011",
    name: "5 Mukhi Rudraksha Bracelet",
    category: "Bracelets",
    price: 599,
    description:
      "5 Mukhi Rudraksha bracelet — most popular bead for health and spiritual growth.",
    benefits: "Health, spiritual growth, Jupiter blessings",
    astrologicalPurpose: "Jupiter/Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "brac-012",
    name: "Panch Mukhi Bracelet",
    category: "Bracelets",
    price: 799,
    description:
      "Premium Panch Mukhi Rudraksha bracelet, Abhimantrit for maximum benefit.",
    benefits: "Health, prosperity, spiritual protection, Shiva blessings",
    astrologicalPurpose: "Jupiter/Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Pendants (general) ────────────────────────────────────────────────────────
export const PENDANTS_GENERAL: ProductWithMRP[] = [
  {
    id: "pend-001",
    name: "Om Pendant",
    category: "Pendants",
    price: 299,
    description:
      "Sacred OM pendant for spiritual connection and divine energy.",
    benefits: "Spiritual connection, divine energy, peace",
    astrologicalPurpose: "Universal divine energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "pend-002",
    name: "Trishul Pendant",
    category: "Pendants",
    price: 299,
    description:
      "Silver Trishul pendant — Shiva's divine weapon for protection and strength.",
    benefits: "Protection, strength, Shiva blessings",
    astrologicalPurpose: "Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "pend-003",
    name: "Amethyst Pendant",
    category: "Pendants",
    price: 499,
    description:
      "Natural Amethyst pendant for spiritual protection, intuition, and calm.",
    benefits: "Spiritual protection, intuition, calming energy",
    astrologicalPurpose: "Jupiter/Saturn gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "pend-004",
    name: "Citrine Pendant",
    category: "Pendants",
    price: 399,
    description:
      "Natural Citrine pendant — the merchant's stone for wealth and abundance.",
    benefits: "Wealth, abundance, positivity, success",
    astrologicalPurpose: "Sun/Mercury gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "pend-005",
    name: "Lotus Pendant",
    category: "Pendants",
    price: 299,
    description:
      "Lotus pendant — symbol of purity, enlightenment, and divine grace.",
    benefits: "Purity, enlightenment, divine grace",
    astrologicalPurpose: "Lakshmi blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "pend-006",
    name: "Hamsa Pendant",
    category: "Pendants",
    price: 399,
    description:
      "Hamsa hand pendant for protection against evil eye and good luck.",
    benefits: "Protection, good luck, positive energy",
    astrologicalPurpose: "Divine protection",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "pend-007",
    name: "Aries Zodiac Pendant",
    category: "Pendants",
    price: 399,
    description:
      "Aries gold plated zodiac pendant for courage, energy, and leadership.",
    benefits: "Courage, energy, leadership, assertiveness",
    astrologicalPurpose: "Aries/Mars energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "pend-008",
    name: "Leo Zodiac Pendant",
    category: "Pendants",
    price: 399,
    description:
      "Leo gold plated zodiac pendant for confidence, creativity, and leadership.",
    benefits: "Confidence, creativity, leadership, charisma",
    astrologicalPurpose: "Leo/Sun energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "pend-009",
    name: "Horseshoe Pendant",
    category: "Pendants",
    price: 299,
    description:
      "Lucky horseshoe pendant for good luck, fortune, and protection.",
    benefits: "Good luck, fortune, positive energy",
    astrologicalPurpose: "Saturn/luck energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "pend-010",
    name: "Evil Eye Pendant",
    category: "Pendants",
    price: 299,
    description:
      "Evil eye pendant for protection against negative energies and bad luck.",
    benefits: "Protection from evil eye, negative energy shield",
    astrologicalPurpose: "Protective energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "pend-011",
    name: "Four Leaf Clover Pendant",
    category: "Pendants",
    price: 299,
    description:
      "Four leaf clover lucky charm pendant for fortune and positive outcomes.",
    benefits: "Luck, fortune, happiness, positive outcomes",
    astrologicalPurpose: "Lucky energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Zodiac Sign Coins ────────────────────────────────────────────────────────
export const ZODIAC_COINS: ProductWithMRP[] = [
  {
    id: "zcoin-001",
    name: "Aries Zodiac Sign Coin – Abhimantrit Astrology Coin for Courage & Energy",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Aries zodiac coin, Abhimantrit for courage and vital energy.",
    benefits: "Courage, vital energy, leadership, confidence",
    astrologicalPurpose: "Aries/Mars energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zcoin-002",
    name: "Taurus Zodiac Sign Coin – Abhimantrit Astrology Coin for Stability",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Taurus zodiac coin, Abhimantrit for stability and material success.",
    benefits: "Stability, material success, abundance, grounding",
    astrologicalPurpose: "Taurus/Venus energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zcoin-003",
    name: "Gemini Zodiac Sign Coin – Abhimantrit Astrology Coin for Communication",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Gemini zodiac coin, Abhimantrit for communication and intellect.",
    benefits: "Communication, intellect, adaptability, wit",
    astrologicalPurpose: "Gemini/Mercury energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zcoin-004",
    name: "Cancer Zodiac Sign Coin – Abhimantrit Astrology Coin for Emotional Strength",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Cancer zodiac coin, Abhimantrit for emotional strength.",
    benefits: "Emotional strength, nurturing, intuition, family harmony",
    astrologicalPurpose: "Cancer/Moon energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zcoin-005",
    name: "Leo Zodiac Sign Coin – Abhimantrit Astrology Coin for Confidence",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Leo zodiac coin, Abhimantrit for confidence and leadership.",
    benefits: "Confidence, leadership, charisma, success",
    astrologicalPurpose: "Leo/Sun energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zcoin-006",
    name: "Virgo Zodiac Sign Coin – Abhimantrit Astrology Coin for Stability & Growth",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Virgo zodiac coin, Abhimantrit for stability and growth.",
    benefits: "Stability, growth, precision, health",
    astrologicalPurpose: "Virgo/Mercury energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zcoin-007",
    name: "Libra Zodiac Sign Coin – Abhimantrit Astrology Coin for Balance & Relationships",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Libra zodiac coin, Abhimantrit for balance and relationships.",
    benefits: "Balance, relationship harmony, justice, diplomacy",
    astrologicalPurpose: "Libra/Venus energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zcoin-008",
    name: "Scorpio Zodiac Sign Coin – Abhimantrit Astrology Coin for Protection",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Scorpio zodiac coin, Abhimantrit for protection and transformation.",
    benefits: "Protection, transformation, intuition, depth",
    astrologicalPurpose: "Scorpio/Mars energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zcoin-009",
    name: "Sagittarius Zodiac Sign Coin – Abhimantrit Astrology Coin for Luck",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Sagittarius zodiac coin, Abhimantrit for luck and expansion.",
    benefits: "Luck, expansion, wisdom, optimism",
    astrologicalPurpose: "Sagittarius/Jupiter energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zcoin-010",
    name: "Capricorn Zodiac Sign Coin – Abhimantrit Astrology Coin for Stability",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Capricorn zodiac coin, Abhimantrit for stability and ambition.",
    benefits: "Stability, ambition, discipline, success",
    astrologicalPurpose: "Capricorn/Saturn energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zcoin-011",
    name: "Aquarius Zodiac Sign Coin – Abhimantrit Astrology Coin for Innovation",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Aquarius zodiac coin, Abhimantrit for innovation and vision.",
    benefits: "Innovation, vision, humanitarian energy, originality",
    astrologicalPurpose: "Aquarius/Saturn-Uranus energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zcoin-012",
    name: "Pisces Zodiac Sign Coin – Abhimantrit Astrology Coin for Peace",
    category: "Zodiac Coins",
    price: 499,
    description:
      "Black tourmaline Pisces zodiac coin, Abhimantrit for peace and spiritual depth.",
    benefits: "Peace, spirituality, compassion, intuition",
    astrologicalPurpose: "Pisces/Jupiter energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Zodiac Sign Pendants ─────────────────────────────────────────────────────
export const ZODIAC_SIGN_PENDANTS: ProductWithMRP[] = [
  {
    id: "zsp-001",
    name: "Aries Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Aries zodiac pendant, Abhimantrit for courage and energy.",
    benefits: "Courage, energy, confidence",
    astrologicalPurpose: "Aries/Mars",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsp-002",
    name: "Taurus Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Taurus zodiac pendant for stability and abundance.",
    benefits: "Stability, abundance, grounding",
    astrologicalPurpose: "Taurus/Venus",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsp-003",
    name: "Gemini Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Gemini zodiac pendant for communication and wit.",
    benefits: "Communication, intellect, adaptability",
    astrologicalPurpose: "Gemini/Mercury",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsp-004",
    name: "Cancer Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Cancer zodiac pendant for emotional strength.",
    benefits: "Emotional strength, intuition, nurturing",
    astrologicalPurpose: "Cancer/Moon",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsp-005",
    name: "Leo Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Leo zodiac pendant for confidence and leadership.",
    benefits: "Confidence, leadership, charisma",
    astrologicalPurpose: "Leo/Sun",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsp-006",
    name: "Virgo Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Virgo zodiac pendant for precision and health.",
    benefits: "Precision, health, growth, stability",
    astrologicalPurpose: "Virgo/Mercury",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsp-007",
    name: "Libra Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Libra zodiac pendant for balance and relationships.",
    benefits: "Balance, harmony, relationships",
    astrologicalPurpose: "Libra/Venus",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsp-008",
    name: "Scorpio Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Scorpio zodiac pendant for protection and transformation.",
    benefits: "Protection, transformation, depth",
    astrologicalPurpose: "Scorpio/Mars",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsp-009",
    name: "Sagittarius Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Sagittarius zodiac pendant for luck and wisdom.",
    benefits: "Luck, wisdom, expansion, optimism",
    astrologicalPurpose: "Sagittarius/Jupiter",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsp-010",
    name: "Capricorn Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Capricorn zodiac pendant for ambition and discipline.",
    benefits: "Ambition, discipline, success",
    astrologicalPurpose: "Capricorn/Saturn",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsp-011",
    name: "Aquarius Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Aquarius zodiac pendant for innovation and vision.",
    benefits: "Innovation, vision, originality",
    astrologicalPurpose: "Aquarius/Saturn-Uranus",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsp-012",
    name: "Pisces Zodiac Sign Gold Plated Pendant",
    category: "Zodiac Pendants",
    price: 599,
    description:
      "24K gold plated Pisces zodiac pendant for peace and spiritual depth.",
    benefits: "Peace, spirituality, compassion, intuition",
    astrologicalPurpose: "Pisces/Jupiter",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Zodiac Sign Bracelets (new detailed set) ─────────────────────────────────
export const ZODIAC_SIGN_BRACELETS: ProductWithMRP[] = [
  {
    id: "zsb-001",
    name: "Aries Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Aries zodiac bracelet for everyday wear.",
    benefits: "Courage, energy, style",
    astrologicalPurpose: "Aries/Mars",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-002",
    name: "Aries Zodiac Bracelet – Natural Multi Stone for Courage – Abhimantrit",
    category: "Zodiac Bracelets",
    price: 1199,
    description:
      "Natural multi-stone Aries zodiac bracelet, Abhimantrit & Certified for courage.",
    benefits: "Courage, vitality, leadership",
    astrologicalPurpose: "Aries/Mars",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-003",
    name: "Taurus Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Taurus zodiac bracelet.",
    benefits: "Stability, grounding, style",
    astrologicalPurpose: "Taurus/Venus",
    stock: BigInt(0),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-004",
    name: "Taurus Zodiac Bracelet – Natural Multi Stone – Abhimantrit & Energized",
    category: "Zodiac Bracelets",
    price: 1099,
    description:
      "Natural multi-stone Taurus zodiac bracelet, Abhimantrit & Energized.",
    benefits: "Stability, abundance, grounding",
    astrologicalPurpose: "Taurus/Venus",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-005",
    name: "Gemini Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Gemini zodiac bracelet.",
    benefits: "Communication, adaptability, wit",
    astrologicalPurpose: "Gemini/Mercury",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-006",
    name: "Gemini Zodiac Sign Bracelet – Abhimantrit & Certified",
    category: "Zodiac Bracelets",
    price: 1099,
    description:
      "Gemini zodiac natural multi-stone bracelet, Abhimantrit & Certified.",
    benefits: "Communication, intellect, adaptability",
    astrologicalPurpose: "Gemini/Mercury",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-007",
    name: "Cancer Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Cancer zodiac bracelet.",
    benefits: "Emotional strength, nurturing",
    astrologicalPurpose: "Cancer/Moon",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-008",
    name: "Cancer Zodiac Bracelet – Natural Multi Stone for Emotional Balance – Abhimantrit",
    category: "Zodiac Bracelets",
    price: 1099,
    description:
      "Natural multi-stone Cancer zodiac bracelet for emotional balance.",
    benefits: "Emotional balance, intuition, nurturing",
    astrologicalPurpose: "Cancer/Moon",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-009",
    name: "Leo Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Leo zodiac bracelet.",
    benefits: "Confidence, leadership, charisma",
    astrologicalPurpose: "Leo/Sun",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-010",
    name: "Virgo Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Virgo zodiac bracelet.",
    benefits: "Precision, health, stability",
    astrologicalPurpose: "Virgo/Mercury",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-011",
    name: "Virgo Zodiac Bracelet – Natural Multi Stone – Abhimantrit & Energized",
    category: "Zodiac Bracelets",
    price: 1099,
    description: "Natural multi-stone Virgo zodiac bracelet.",
    benefits: "Precision, growth, health",
    astrologicalPurpose: "Virgo/Mercury",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-012",
    name: "Libra Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Libra zodiac bracelet.",
    benefits: "Balance, harmony, relationships",
    astrologicalPurpose: "Libra/Venus",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-013",
    name: "Libra Zodiac Bracelet – Natural Multi Stone for Balance – Abhimantrit",
    category: "Zodiac Bracelets",
    price: 1099,
    description: "Natural multi-stone Libra zodiac bracelet for balance.",
    benefits: "Balance, harmony, justice",
    astrologicalPurpose: "Libra/Venus",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-014",
    name: "Scorpio Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Scorpio zodiac bracelet.",
    benefits: "Protection, transformation, depth",
    astrologicalPurpose: "Scorpio/Mars",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-015",
    name: "Sagittarius Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Sagittarius zodiac bracelet.",
    benefits: "Luck, wisdom, optimism",
    astrologicalPurpose: "Sagittarius/Jupiter",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-016",
    name: "Sagittarius Zodiac Bracelet – Natural Multi Stone for Luck, Wisdom & Growth – Abhimantrit",
    category: "Zodiac Bracelets",
    price: 1099,
    description:
      "Natural multi-stone Sagittarius bracelet for luck, wisdom and growth.",
    benefits: "Luck, wisdom, expansion, optimism",
    astrologicalPurpose: "Sagittarius/Jupiter",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-017",
    name: "Capricorn Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Capricorn zodiac bracelet.",
    benefits: "Ambition, discipline, success",
    astrologicalPurpose: "Capricorn/Saturn",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-018",
    name: "Capricorn Zodiac Bracelet – Natural Multi Stone for Stability – Abhimantrit",
    category: "Zodiac Bracelets",
    price: 1099,
    description: "Natural multi-stone Capricorn bracelet for stability.",
    benefits: "Stability, ambition, discipline",
    astrologicalPurpose: "Capricorn/Saturn",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-019",
    name: "Aquarius Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Aquarius zodiac bracelet.",
    benefits: "Innovation, vision, originality",
    astrologicalPurpose: "Aquarius/Saturn",
    stock: BigInt(0),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-020",
    name: "Aquarius Zodiac Bracelet – Natural Multi Stone for Creativity – Abhimantrit",
    category: "Zodiac Bracelets",
    price: 1099,
    description: "Natural multi-stone Aquarius zodiac bracelet for creativity.",
    benefits: "Creativity, innovation, vision",
    astrologicalPurpose: "Aquarius/Saturn",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-021",
    name: "Pisces Leather Bracelet",
    category: "Zodiac Bracelets",
    price: 599,
    description: "Genuine leather Pisces zodiac bracelet.",
    benefits: "Peace, spirituality, compassion",
    astrologicalPurpose: "Pisces/Jupiter",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "zsb-022",
    name: "Pisces Zodiac Bracelet – Natural Multi Stone for Intuition – Abhimantrit",
    category: "Zodiac Bracelets",
    price: 1099,
    description: "Natural multi-stone Pisces zodiac bracelet for intuition.",
    benefits: "Intuition, peace, spiritual depth",
    astrologicalPurpose: "Pisces/Jupiter",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Elephant Category ────────────────────────────────────────────────────────
export const ELEPHANTS: ProductWithMRP[] = [
  {
    id: "eleph-001",
    name: "Pure Brass Vastu Elephant",
    category: "Elephants",
    price: 599,
    description:
      "Pure brass Vastu elephant for positive energy flow and home prosperity.",
    benefits: "Positive energy, prosperity, Vastu harmony",
    astrologicalPurpose: "Ganesha/Vastu energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "eleph-002",
    name: "Rose Quartz Crystal Painted Elephant",
    category: "Elephants",
    price: 1999,
    description:
      "Natural rose quartz crystal elephant with hand-painted detailing for love.",
    benefits: "Love, compassion, emotional healing, positive relationships",
    astrologicalPurpose: "Venus gemstone energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "eleph-003",
    name: "Rose Quartz Crystal Elephant",
    category: "Elephants",
    price: 1499,
    description:
      "Natural rose quartz crystal elephant for love energy and emotional healing.",
    benefits: "Love, emotional healing, compassion",
    astrologicalPurpose: "Venus gemstone energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "eleph-004",
    name: "Green Jade Crystal Painted Elephant",
    category: "Elephants",
    price: 1999,
    description:
      "Natural green jade crystal elephant with painted detailing for wealth.",
    benefits: "Wealth, good luck, abundance, harmony",
    astrologicalPurpose: "Mercury/Jupiter gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "eleph-005",
    name: "Elephant Evil Eye with 3 Bells Hanging",
    category: "Elephants",
    price: 799,
    description:
      "Elephant with evil eye and 3 bells hanging — protection from negative energy.",
    benefits: "Protection from evil eye, positive vibrations, good luck",
    astrologicalPurpose: "Protective energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "eleph-006",
    name: "Green Jade Crystal Elephant",
    category: "Elephants",
    price: 2499,
    description:
      "Premium natural green jade crystal elephant for wealth, harmony, and abundance.",
    benefits: "Wealth, harmony, abundance, luck",
    astrologicalPurpose: "Mercury/Jupiter gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Kamdhenu Cow Category ────────────────────────────────────────────────────
export const KAMDHENU_COWS: ProductWithMRP[] = [
  {
    id: "cow-001",
    name: "Kam Dhenu Cow",
    category: "Kamdhenu Cow",
    price: 3599,
    description:
      "Sacred Kamdhenu cow — divine wish-fulfilling cow for home shrine and prosperity.",
    benefits: "Wish fulfillment, prosperity, divine blessings, abundance",
    astrologicalPurpose: "Cow/Kamdhenu blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "cow-002",
    name: "Brass Kaam Dhenu Cow With Calf (Stonework)",
    category: "Kamdhenu Cow",
    price: 3599,
    description:
      "Brass Kamdhenu cow with calf and intricate stonework — divine wish-fulfilling idol.",
    benefits: "Wish fulfillment, maternal blessings, prosperity",
    astrologicalPurpose: "Kamdhenu/Cow blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "cow-003",
    name: "Brass Kamdhenu Cow Plain",
    category: "Kamdhenu Cow",
    price: 1499,
    description:
      "Simple and elegant brass Kamdhenu cow for daily puja and home decor.",
    benefits: "Prosperity, purity, divine blessings",
    astrologicalPurpose: "Kamdhenu/Cow blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "cow-004",
    name: "Brass Kaam Dhenu Cow with Om and Swastik",
    category: "Kamdhenu Cow",
    price: 3499,
    description:
      "Brass Kamdhenu cow with Om and Swastik symbols — auspicious and protective.",
    benefits: "Auspiciousness, protection, prosperity, divine blessings",
    astrologicalPurpose: "Kamdhenu/Cow blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "cow-005",
    name: "Brass Kamdhenu Cow",
    category: "Kamdhenu Cow",
    price: 4099,
    description:
      "Premium brass Kamdhenu cow — the divine wish-granting cow of heaven.",
    benefits: "Divine wish fulfillment, prosperity, all-round blessings",
    astrologicalPurpose: "Kamdhenu/Cow blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Tree Category ────────────────────────────────────────────────────────────
export const CRYSTAL_TREES: ProductWithMRP[] = [
  {
    id: "tree-001",
    name: "7 Chakra Crystal Tree – Balance, Healing & Positive Energy",
    category: "Crystal Trees",
    price: 499,
    description:
      "Crystal tree with seven colored stones representing the 7 Chakra system for balance and healing.",
    benefits: "Chakra balance, healing, positive energy, spiritual alignment",
    astrologicalPurpose: "All seven chakras",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-002",
    name: "Rose Quartz Tree – Improve Love, Relationship & Emotional Connection",
    category: "Crystal Trees",
    price: 1649,
    description:
      "Rose quartz crystal tree on wooden base for love, relationships, and emotional healing.",
    benefits: "Love, relationships, emotional connection, heart healing",
    astrologicalPurpose: "Venus gemstone energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-003",
    name: "Green Jade Tree – Promotes Wealth Attraction & Money Growth",
    category: "Crystal Trees",
    price: 1649,
    description:
      "Green jade crystal tree for wealth attraction, money growth, and abundance.",
    benefits: "Wealth attraction, money growth, abundance, good luck",
    astrologicalPurpose: "Mercury/Jupiter gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-004",
    name: "Yellow Citrine Tree – Abhimantrit Crystal Tree for Abundance, Prosperity & Growth",
    category: "Crystal Trees",
    price: 1649,
    description:
      "Abhimantrit yellow citrine crystal tree for abundance, prosperity, and personal growth.",
    benefits: "Abundance, prosperity, personal growth, positivity",
    astrologicalPurpose: "Sun/Mercury gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-005",
    name: "Pyrite Tree – Wealth, Protection & Business Growth",
    category: "Crystal Trees",
    price: 1499,
    description:
      "Pyrite crystal tree for wealth attraction, protection, and business growth.",
    benefits: "Wealth, protection, business growth, confidence",
    astrologicalPurpose: "Sun/Mars energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-006",
    name: "Brass Kalpavriksh Tree – Wish Fulfilling Tree",
    category: "Crystal Trees",
    price: 1599,
    description:
      "Sacred brass Kalpavriksh (wish-fulfilling) tree for prosperity and divine blessings.",
    benefits: "Wish fulfillment, prosperity, divine blessings",
    astrologicalPurpose: "Divine abundance energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-007",
    name: "7 Chakra Tree Wall Hanging",
    category: "Crystal Trees",
    price: 1199,
    description:
      "7 Chakra crystal tree wall hanging for harmonizing energy at home or office.",
    benefits: "Energy harmony, chakra balance, positive vibes",
    astrologicalPurpose: "All seven chakras",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-008",
    name: "Clear Quartz Crystal Tree – Removes Depression, Anger & Anxiety",
    category: "Crystal Trees",
    price: 1499,
    description:
      "Clear quartz crystal tree for removing depression, anger, and anxiety.",
    benefits: "Clarity, removes negativity, stress relief, mental calm",
    astrologicalPurpose: "Universal crystal energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-009",
    name: "Evil Eye Tree – Protection from Negative Energy & Nazar",
    category: "Crystal Trees",
    price: 899,
    description:
      "Evil eye crystal tree for protection from negative energy and nazar.",
    benefits: "Protection from evil eye, nazar removal, positive energy",
    astrologicalPurpose: "Protective energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-010",
    name: "Money Magnet Tree – Wealth Attraction, Income Growth & Prosperity",
    category: "Crystal Trees",
    price: 1499,
    description:
      "Abhimantrit money magnet crystal tree for wealth attraction and income growth.",
    benefits: "Wealth attraction, income growth, prosperity, abundance",
    astrologicalPurpose: "Kuber/Lakshmi energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-011",
    name: "Amethyst Tree – Attract Luck, Enhance Intuition, Improve Health & Skin",
    category: "Crystal Trees",
    price: 1749,
    description:
      "Amethyst crystal tree for luck, intuition, health, and skin improvement.",
    benefits: "Luck, intuition, health, spiritual protection",
    astrologicalPurpose: "Jupiter/Saturn gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-012",
    name: "Tiger Eye Tree – Abhimantrit Crystal Tree for Confidence, Courage",
    category: "Crystal Trees",
    price: 1649,
    description:
      "Abhimantrit Tiger Eye crystal tree for confidence, courage, and willpower.",
    benefits: "Confidence, courage, willpower, abundance",
    astrologicalPurpose: "Sun/Mars energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-013",
    name: "Red Carnelian Crystal Tree – Motivation, Confidence & Career Growth",
    category: "Crystal Trees",
    price: 1599,
    description:
      "Red Carnelian crystal tree for motivation, confidence, and career growth.",
    benefits: "Motivation, confidence, career growth, vitality",
    astrologicalPurpose: "Mars/Sun energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-014",
    name: "Gomti Chakra & Rudraksh Tree – Protection, Stability & Positive Energy",
    category: "Crystal Trees",
    price: 1499,
    description:
      "Gomti Chakra with Rudraksha tree for protection, stability, and positive energy.",
    benefits: "Protection, stability, positive energy, Vishnu blessings",
    astrologicalPurpose: "Vishnu/Shiva blessings",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-015",
    name: "Mix Gemstone Tree",
    category: "Crystal Trees",
    price: 1799,
    description:
      "Mix gemstone crystal tree combining multiple crystal energies for all-round benefits.",
    benefits: "All-round crystal energy, balance, prosperity",
    astrologicalPurpose: "Multi-planetary energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-016",
    name: "Moonstone Crystal Tree – Mental Stress Relief & Confidence",
    category: "Crystal Trees",
    price: 1499,
    description:
      "Moonstone crystal tree for mental stress relief and confidence building.",
    benefits: "Stress relief, confidence, emotional balance, intuition",
    astrologicalPurpose: "Moon gemstone energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-017",
    name: "Lapis Lazuli Crystal Tree – Wisdom, Communication & Confidence",
    category: "Crystal Trees",
    price: 1649,
    description:
      "Lapis Lazuli crystal tree for wisdom, communication, and confidence.",
    benefits: "Wisdom, communication, confidence, truth",
    astrologicalPurpose: "Jupiter/Saturn gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-018",
    name: "Green Aventurine Tree – Promotes Wealth Attraction & Money Growth",
    category: "Crystal Trees",
    price: 1649,
    description:
      "Green Aventurine crystal tree for wealth attraction and money growth.",
    benefits: "Wealth, money growth, opportunity, abundance",
    astrologicalPurpose: "Mercury/Venus gemstone",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-019",
    name: "Brass Tree Sculpture",
    category: "Crystal Trees",
    price: 1399,
    description:
      "Decorative brass tree sculpture for home decor and Vastu harmony.",
    benefits: "Vastu harmony, prosperity, home decor",
    astrologicalPurpose: "Earth energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-020",
    name: "Brass Kalpavriksh Tree Wall Hanging (for wealth and good fortune)",
    category: "Crystal Trees",
    price: 2999,
    description:
      "Brass Kalpavriksh tree wall hanging for wealth, good fortune, and divine blessings.",
    benefits: "Wealth, good fortune, divine blessings, prosperity",
    astrologicalPurpose: "Divine abundance energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "tree-021",
    name: "Brass Banana Tree",
    category: "Crystal Trees",
    price: 1799,
    description:
      "Sacred brass banana tree — symbol of abundance and prosperity in Vastu.",
    benefits: "Abundance, prosperity, Vastu harmony",
    astrologicalPurpose: "Jupiter/Vishnu energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Stationery Category ──────────────────────────────────────────────────────
export const STATIONERY: ProductWithMRP[] = [
  {
    id: "stat-001",
    name: "Pyrite Pen – Abhimantrit for Wealth, Confidence & Business Success",
    category: "Stationery",
    price: 699,
    description:
      "Decorative pyrite pen by Spiritual Connect, Abhimantrit for wealth, confidence, and business success.",
    benefits:
      "Wealth, confidence, business success, positive energy in writing",
    astrologicalPurpose: "Sun/Mars energy — success and confidence",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "stat-002",
    name: "Powerful Seven Chakra Diary – Manifestation & Healing Journal",
    category: "Stationery",
    price: 1599,
    description:
      "Seven Chakra design manifestation and healing journal — align all chakras while writing your intentions.",
    benefits: "Chakra alignment, manifestation, healing, intention setting",
    astrologicalPurpose: "All seven chakras",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "stat-003",
    name: "Crystal Pen",
    category: "Stationery",
    price: 699,
    description:
      "Beautiful crystal pen for spiritual writing and daily journaling with positive energy.",
    benefits: "Positive energy in writing, clarity, spiritual focus",
    astrologicalPurpose: "Crystal healing energy",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "stat-004",
    name: "Pyrite Gold Pen – Abhimantrit for Success, Luxury & Confidence",
    category: "Stationery",
    price: 799,
    description:
      "Premium gold pyrite pen by Spiritual Connect, Abhimantrit for success, luxury, and confidence.",
    benefits: "Success, luxury, confidence, wealth attraction",
    astrologicalPurpose: "Sun energy — authority and leadership",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "stat-005",
    name: "Dhanyog Pen – Abhimantrit Crystal Pen for Confidence, Creativity & Focus",
    category: "Stationery",
    price: 699,
    description:
      "Abhimantrit crystal Dhanyog pen for confidence, creativity, and focused thinking.",
    benefits: "Confidence, creativity, focus, mental clarity",
    astrologicalPurpose: "Mercury energy — communication and intellect",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "stat-006",
    name: "Amethyst Pen",
    category: "Stationery",
    price: 599,
    description:
      "Natural amethyst crystal pen for spiritual writing, intuition, and mental calm.",
    benefits: "Spiritual writing, intuition, mental calm, clarity",
    astrologicalPurpose: "Jupiter/Saturn — wisdom and protection",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "stat-007",
    name: "Malachite Amethyst Crystal Pen – Abhimantrit for Energy & Protection",
    category: "Stationery",
    price: 599,
    description:
      "Malachite and amethyst combination crystal pen, Abhimantrit for energy and protection.",
    benefits: "Energy, protection, transformation, spiritual writing",
    astrologicalPurpose: "Venus/Jupiter — transformation and wisdom",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];

// ─── Combined export ─────────────────────────────────────────────────────────
export const ALL_NEW_CATEGORY_PRODUCTS = [
  ...ENERGIZED_GEMSTONES,
  ...RINGS_PRODUCTS,
  ...YANTRAS_PRODUCTS,
  ...PUJA_ITEMS_PRODUCTS,
  ...BOOKS_PRODUCTS,
  ...CRYSTALS_PRODUCTS,
  ...HERBS_PRODUCTS,
  ...SHANKH_PRODUCTS,
  ...GUTIKA_PRODUCTS,
  ...PARAD_PRODUCTS,
  ...ZODIAC_BRACELETS,
  ...KADA_BRACELETS,
  ...LAMPS_3D,
  ...SPIRITUAL_NECKLACES,
  ...GOLD_JEWELLERY,
  ...IDOLS_PRODUCTS,
  ...RINGS_NON_GEM,
  ...GEMSTONE_RINGS,
  ...BRACELETS_GENERAL,
  ...PENDANTS_GENERAL,
  ...ZODIAC_COINS,
  ...ZODIAC_SIGN_PENDANTS,
  ...ZODIAC_SIGN_BRACELETS,
  ...ELEPHANTS,
  ...KAMDHENU_COWS,
  ...CRYSTAL_TREES,
  ...STATIONERY,
];
