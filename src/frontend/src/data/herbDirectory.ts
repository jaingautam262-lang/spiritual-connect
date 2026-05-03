export interface Herb {
  id: string;
  nameHindi: string;
  nameSanskrit: string;
  nameEnglish: string;
  nameBotanical: string;
  pujaUses: string[];
  havanUses: string[];
  healingUses: string[];
  significance: string;
  availability: "Common" | "Moderate" | "Rare";
  description: string;
  uses: ("puja" | "havan" | "healing" | "spiritual")[];
}

export const herbDirectory: Herb[] = [
  {
    id: "tulsi",
    nameHindi: "तुलसी",
    nameSanskrit: "Tulasī",
    nameEnglish: "Holy Basil",
    nameBotanical: "Ocimum tenuiflorum",
    pujaUses: [
      "Offered daily to Lord Vishnu and Krishna; essential in Vishnu puja",
      "Placed in Charnamrit (sacred water) and Panchamrit",
      "Tulsi mala (rosary) used for Vaishnav japa and meditation",
      "Tulsi leaves placed on food offerings (prasad) to sanctify them",
      "Used in Ekadashi and Kartik month special worship",
    ],
    havanUses: [
      "Added to havan kund during Vishnu and Satyanarayan yajnas",
      "Used in Navgraha shanti havan for Surya (Sun) pacification",
      "Essential ingredient in Ashwamedha and Somasrava yajnas",
      "Combined with ghee as ahuti (offering) in daily agnihotra",
    ],
    healingUses: [
      "Powerful adaptogen reducing cortisol and stress hormones",
      "Antiviral and antibacterial — effective against colds, flu, and respiratory infections",
      "Anti-inflammatory; used in Ayurveda for fever, headaches, and arthritis",
      "Supports blood sugar regulation and cardiac health",
      "Used in Ayurveda for skin disorders, wounds, and insect bites",
    ],
    significance:
      "Tulsi is considered the most sacred plant in Hinduism, believed to be the earthly manifestation of Goddess Lakshmi. A home with a Tulsi plant is said to be blessed by Lord Vishnu. Daily worship of Tulsi purifies the atmosphere and wards off negative energies.",
    availability: "Common",
    description:
      "The queen of all sacred herbs, Tulsi is a fragrant perennial found in nearly every Hindu household. Revered as Vrindadevi — the goddess of devotion — she stands as both a spiritual guardian and a potent medicinal plant.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "neem",
    nameHindi: "नीम",
    nameSanskrit: "Nimba",
    nameEnglish: "Indian Lilac / Margosa",
    nameBotanical: "Azadirachta indica",
    pujaUses: [
      "Neem leaves offered to Sheetla Mata (goddess of diseases) on Sheetla Saptami",
      "Used in Durga puja and Navratri rituals as protective offering",
      "Placed at entrances during festivals to ward off evil spirits",
      "Neem flowers offered to Mariamman and other folk goddesses",
    ],
    havanUses: [
      "Used in shanti havan for purifying homes affected by illness or negative energy",
      "Added to Rahu and Ketu graha shanti havan",
      "Used in Rudra abhishek and Mrityunjaya havan for disease cure",
      "Neem wood used as samidha (sacrificial wood) in specific yajna rituals",
    ],
    healingUses: [
      "Broad-spectrum antibacterial, antifungal, and antiparasitic",
      "Effective for skin conditions — acne, eczema, psoriasis, ringworm",
      "Natural blood purifier used in Ayurveda for liver and kidney disorders",
      "Anti-diabetic properties help regulate blood glucose levels",
      "Dental health — neem twigs used as natural toothbrushes (datun)",
    ],
    significance:
      "Neem is associated with Sheetla Mata, the goddess of pox and fevers. Neem is believed to drive away Nirrti (goddess of misfortune) and is planted near homes for protection. In Vedic tradition, neem represents the harsh but purifying aspect of nature.",
    availability: "Common",
    description:
      "Called the 'village pharmacy' of India, Neem is among the most versatile medicinal trees known to Ayurveda. Its bitter taste symbolizes the removal of sins and negative karmas. Every part — leaf, bark, seed, oil — carries therapeutic and spiritual potency.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "ashwagandha",
    nameHindi: "अश्वगंधा",
    nameSanskrit: "Ashwagandha",
    nameEnglish: "Indian Ginseng / Winter Cherry",
    nameBotanical: "Withania somnifera",
    pujaUses: [
      "Root used in Shiva puja as an offering of strength and vitality",
      "Offered to Lord Hanuman for blessing seekers with endurance and power",
      "Used in Shakti puja rituals for empowerment",
    ],
    havanUses: [
      "Roots added to Ayushya havan and Mrityunjaya havan for longevity",
      "Used in Mars (Mangal) graha shanti havan for vitality and courage",
      "Added to havan during Ashwamedha yajna as a strength-imparting herb",
      "Mixed with sesame and barley in fertility-focused yajnas",
    ],
    healingUses: [
      "Premier adaptogen — reduces anxiety, stress, and adrenal fatigue",
      "Significantly boosts testosterone, muscle strength, and endurance",
      "Improves memory, cognitive function, and neurological health",
      "Supports thyroid function and hormonal balance",
      "Anti-inflammatory for arthritis, joint pain, and autoimmune conditions",
    ],
    significance:
      "The name means 'smell of horse' — one who consumes it regularly gains the strength and vitality of a horse. It is one of the most prized Rasayana (rejuvenating) herbs in Ayurveda, used for thousands of years to promote longevity and vitality.",
    availability: "Common",
    description:
      "Ashwagandha is the crown jewel of Ayurvedic medicine — a powerful adaptogenic root that supports the body under all forms of stress. Used in ancient warrior preparations, it remains one of the world's most researched herbs for strength and resilience.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "brahmi",
    nameHindi: "ब्राह्मी",
    nameSanskrit: "Brahmi",
    nameEnglish: "Brahmi / Water Hyssop",
    nameBotanical: "Bacopa monnieri",
    pujaUses: [
      "Offered to Goddess Saraswati for blessings of intelligence and learning",
      "Used in puja by students before examinations for clarity of mind",
      "Brahmi leaves placed at feet of Brahma idol during Brahmotsav",
    ],
    havanUses: [
      "Added to Saraswati havan on Vasant Panchami for intelligence",
      "Used in Mercury (Budh) graha shanti havan for mental clarity",
      "Included in Vidyarambha samskara havan for children beginning education",
    ],
    healingUses: [
      "Powerful neuroprotective herb — enhances memory, learning, and recall",
      "Anti-anxiety and anti-stress adaptogen; supports GABA pathways",
      "Used in Ayurveda for epilepsy, anxiety, ADHD, and Alzheimer's",
      "Promotes hair growth and scalp health when applied as oil",
      "Antioxidant properties protect neurons from oxidative damage",
    ],
    significance:
      "Brahmi is named after Brahma — the creator god — signifying its power to expand consciousness and creative intelligence. It is considered the 'herb of grace' and is among the most sacred plants in the Saraswati tradition.",
    availability: "Common",
    description:
      "A small succulent herb growing near water bodies, Brahmi has been used for over 3,000 years to sharpen intellect and deepen meditation. Ancient scholars and yogis consumed it regularly to retain vast quantities of Vedic scriptures.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "shatavari",
    nameHindi: "शतावरी",
    nameSanskrit: "Shatavari",
    nameEnglish: "Asparagus Root / Wild Asparagus",
    nameBotanical: "Asparagus racemosus",
    pujaUses: [
      "Offered to Goddess Lakshmi and Parvati for blessings of fertility and abundance",
      "Used in Santana Gopala puja and fertility rituals",
      "Root offered in Devi puja during Navratri for womanly strength",
    ],
    havanUses: [
      "Used in fertility havan (Putra Kameshti yajna) for offspring",
      "Added to Stri Shakti havan for women's health and empowerment",
      "Included in Ayushya havan for longevity and vitality",
      "Used in Venus (Shukra) graha shanti havan",
    ],
    healingUses: [
      "Premier women's tonic — supports hormonal balance, PMS, and menopause",
      "Galactagogue — promotes breast milk production in nursing mothers",
      "Adaptogenic — reduces stress and supports immune function",
      "Digestive tonic for IBS, acidity, and gastrointestinal inflammation",
      "Anti-aging Rasayana herb promoting skin glow and cellular health",
    ],
    significance:
      "The name means 'she who has a hundred husbands' — symbolizing Shatavari's capacity to nurture and sustain life abundantly. It is the sacred herb of Goddess Parvati and has been used for centuries in rituals blessing fertility, longevity, and divine grace.",
    availability: "Moderate",
    description:
      "A climbing shrub with needle-like leaves, Shatavari is Ayurveda's foremost herb for women's health and fertility. Its tuberous roots, white and succulent, are considered one of the great Rasayana herbs capable of promoting ojas (vital essence).",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "giloy",
    nameHindi: "गिलोय",
    nameSanskrit: "Guduchi / Amrita",
    nameEnglish: "Heart-leaved Moonseed / Tinospora",
    nameBotanical: "Tinospora cordifolia",
    pujaUses: [
      "Leaves offered in Dhanvantari puja for divine healing blessings",
      "Used in Navratri rituals as protective herb against disease",
      "Offered to Lord Indra and celestial physicians in vedic rites",
    ],
    havanUses: [
      "Used in disease-curing havans (Arogya Kameshti)",
      "Added to Navgraha shanti havan for Saturn (Shani) pacification",
      "Used in Mrityunjaya havan for recovery from chronic illnesses",
    ],
    healingUses: [
      "Potent immunomodulator — stimulates and regulates immune response",
      "Anti-pyretic — highly effective for dengue, malaria, and chronic fevers",
      "Anti-inflammatory and anti-arthritic; reduces joint inflammation",
      "Detoxifying herb used for liver disorders, jaundice, and blood purification",
      "Adaptogenic — reduces stress, anxiety, and mental fatigue",
    ],
    significance:
      "Giloy is called 'Amrita' meaning divine nectar — legend holds that when drops of Amrit fell from heaven during the Samudra Manthan (churning of ocean), Giloy grew where they landed. It is considered the nectar of immortality in plant form.",
    availability: "Common",
    description:
      "A hardy climbing vine often found growing on Neem trees (making it especially potent), Giloy is among Ayurveda's greatest immuno-protective herbs. During COVID-19, it gained worldwide attention for its remarkable immune-boosting properties.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "haldi",
    nameHindi: "हल्दी",
    nameSanskrit: "Haridra",
    nameEnglish: "Turmeric",
    nameBotanical: "Curcuma longa",
    pujaUses: [
      "Applied as tilak (auspicious mark) on forehead during Ganesh and Devi puja",
      "Haldi kumkum ceremony performed during Navratri and festivals",
      "Mixed with water for Ganesh abhishek and Shiva puja",
      "Used in Vivaha (wedding) rituals — haldi ceremony for bride and groom",
      "Haldi paste applied to Ganesha and Gauri idols during festivals",
    ],
    havanUses: [
      "Added to Navgraha shanti havan (Brihaspati/Jupiter graha)",
      "Used in Sarva Kama Siddhi havan for wish fulfillment",
      "Essential in Griha Pravesh (house-warming) havan samagri",
      "Added to Devi havan during Durga Saptashati recitation",
    ],
    healingUses: [
      "Curcumin — among the most potent natural anti-inflammatory compounds",
      "Antioxidant protecting cells from free radical damage",
      "Anti-cancer properties; research shows efficacy in multiple cancer types",
      "Used for digestive disorders, IBS, Crohn's disease, and ulcers",
      "Golden milk (haldi doodh) — traditional remedy for colds, joint pain, and immunity",
    ],
    significance:
      "Called Haridra — the golden one — turmeric is the sacred herb of Devi (the Goddess). It is considered auspicious and purifying in both Vedic and Tantric traditions. Smearing the body with turmeric before sacred ceremonies purifies the aura and invites divine grace.",
    availability: "Common",
    description:
      "Turmeric's vivid golden color mirrors the solar energy it embodies. Equally essential in Indian kitchens and temples, this rhizome has been used for 4,000 years as both a divine offering and a universal medicine. Modern science confirms over 600 health applications for curcumin.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "chandan",
    nameHindi: "चंदन",
    nameSanskrit: "Chandana",
    nameEnglish: "White Sandalwood",
    nameBotanical: "Santalum album",
    pujaUses: [
      "Chandan tilak — sandalwood paste applied to deities and devotees in all Hindu pujas",
      "Mixed with milk for Rudrabhishek and Vishnu abhishek",
      "Chandan paste used to write sacred symbols (Swastik, Om) on ritual items",
      "Burned as incense during yagya, meditation, and daily aarti",
      "Chandan paste applied to Shaligram shila in Vaishnav puja",
    ],
    havanUses: [
      "Chandan wood used as premium samidha in Surya (Sun) graha havan",
      "Sandalwood powder added to havan kund for fragrance and purity",
      "Used in Vishnu yajna and Satyanarayan havan as primary offering",
      "Added to Shanti havan for calming hostile planetary influences",
    ],
    healingUses: [
      "Skin cooling agent; reduces inflammation, redness, and heat eruptions",
      "Antiseptic and anti-bacterial when applied to wounds and skin infections",
      "Mental calming — sandalwood aroma reduces anxiety and promotes meditation",
      "Used in Ayurveda for urinary tract infections and kidney disorders",
      "Anti-aging skin care; chandan paste brightens skin and reduces blemishes",
    ],
    significance:
      "Among all woods, Chandan is considered the most sacred — it is said to be the residence of divinity itself. The fragrance of sandalwood is believed to attract devas (celestial beings) and purify the space. It is one of the Panchamrit components in Vedic tradition.",
    availability: "Moderate",
    description:
      "White sandalwood is the most prized aromatic wood in the world. Its cool, creamy heartwood yields an ethereal fragrance that has been central to Hindu, Buddhist, and Jain worship for millennia. Karnataka's Mysore sandalwood is considered the finest quality globally.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "guggal",
    nameHindi: "गुग्गल",
    nameSanskrit: "Guggulu",
    nameEnglish: "Indian Bdellium / Guggul",
    nameBotanical: "Commiphora wightii",
    pujaUses: [
      "Burned as sacred incense (dhoop) in temples during aarti and puja",
      "Essential in Navgraha puja — each planet has associated guggal type",
      "Offered to Shiva in special Guggal Dhoop aarti on Mondays",
      "Used in Tantric rituals for purifying the ritual space",
    ],
    havanUses: [
      "One of the most important havan ingredients for Navgraha shanti",
      "Added to Saturn (Shani) havan — purifies karmic blockages",
      "Used in Rahu and Ketu dosha nivaran havan",
      "Essential in Vastu dosh nivaran havan to purify home energy",
      "Used in Mrityunjaya havan for protection and healing",
    ],
    healingUses: [
      "Potent lipid-lowering agent — reduces LDL cholesterol and triglycerides",
      "Anti-obesity and metabolism-boosting properties (Medohar Guggul)",
      "Anti-inflammatory for arthritis, gout, and joint disorders (Yogaraj Guggul)",
      "Thyroid support — Kanchanar Guggul used for thyroid nodules and goiter",
      "Antibacterial and wound-healing when applied topically",
    ],
    significance:
      "Guggal is one of the divine substances mentioned in ancient Vedic texts. When burned, its smoke is believed to purify the atmosphere, dispel evil entities, and create a sacred space for divine communication. The Navgraha havan is considered incomplete without Guggal.",
    availability: "Moderate",
    description:
      "A resin extracted from the small thorny Mukul tree, Guggal has been the cornerstone of Ayurvedic medicine and Vedic ritual for over 3,000 years. Its purifying smoke and powerful medicinal properties make it equally valuable in temple dhoop and Ayurvedic formulations.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "loban",
    nameHindi: "लोबान",
    nameSanskrit: "Lobhana",
    nameEnglish: "Frankincense / Benzoin",
    nameBotanical: "Styrax benzoin",
    pujaUses: [
      "Burned as sacred dhoop to purify puja space before worship",
      "Used in evening aarti as Loban dhoop (sambrani cup)",
      "Offered to Shiva, Kali, and protective deities for blessings",
      "Essential in Durga puja and Kali puja as night-time offering",
    ],
    havanUses: [
      "Added to Navgraha havan samagri for overall planetary harmony",
      "Used in Shani (Saturn) havan for removing obstacles",
      "Included in Vastu shanti havan to clear stagnant energy",
      "Essential in Kali and Tantric yajnas for invoking protective energies",
    ],
    healingUses: [
      "Anti-inflammatory — effective for arthritis and respiratory conditions",
      "Antiseptic and skin-healing properties for wounds and eczema",
      "Aromatherapy for anxiety, stress, and promoting meditative states",
      "Anti-cancer research shows promising results against brain tumor cells",
      "Respiratory health — Loban vapor inhaled for bronchitis and asthma",
    ],
    significance:
      "Loban's deep, resinous smoke is believed to carry prayers to the heavens and create a protective barrier against negative influences. Used across Hindu, Buddhist, and Sufi traditions, its fragrance is said to invite angelic presences and dispel malevolent energies.",
    availability: "Common",
    description:
      "One of the oldest sacred resins in the world, Loban has been traded along the ancient incense routes for over 5,000 years. In Hindu temples, the distinctive clouds of Loban dhoop rolling through the sanctum create that unmistakable atmosphere of divine presence.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "kapoor",
    nameHindi: "कपूर",
    nameSanskrit: "Karpura",
    nameEnglish: "Camphor",
    nameBotanical: "Cinnamomum camphora",
    pujaUses: [
      "Burned at the end of every puja during the final aarti",
      "Kapoor aarti — flame offered to deities symbolizing complete surrender (self burning without residue)",
      "Used in Mangal aarti (morning aarti) and Sandhya aarti",
      "Applied in Niranjana ceremony — camphor flame waved before deities",
      "Camphor dissolved in water used for abhishek of Shivalinga",
    ],
    havanUses: [
      "Added to havan kund to accelerate fire and enhance fragrance",
      "Used in Surya (Sun) havan as purifying offering",
      "Essential in Mrityunjaya havan — camphor symbolizes ego dissolution",
      "Added to Devi havan during Navratri for fragrance and purity",
    ],
    healingUses: [
      "Pain-relief balm — reduces muscle aches, joint pain, and arthritis",
      "Antiseptic and antifungal for skin infections and nail fungus",
      "Respiratory relief — camphor oil in steam inhalation for colds",
      "Insect repellent — keeps moths and pests away naturally",
      "Mental clarity and alertness — camphor aroma stimulates the mind",
    ],
    significance:
      "The burning of camphor represents the aspirant's ego dissolving in divine fire — camphor burns completely leaving no residue, symbolizing the ideal spiritual state. Its pure white color represents purity, and the flame represents the light of divine consciousness.",
    availability: "Common",
    description:
      "Camphor is unique among ritual items — it is the only substance burned in puja that leaves no residue, making it the perfect symbol of spiritual self-offering. Whether in a small puja thali at home or the grand aarti at Kashi Vishwanath, camphor's flickering flame and piercing fragrance mark the sacred moment of divine contact.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "belpatra",
    nameHindi: "बेलपत्र",
    nameSanskrit: "Bilva Patra",
    nameEnglish: "Bael / Bengal Quince Leaf",
    nameBotanical: "Aegle marmelos",
    pujaUses: [
      "Most sacred offering to Lord Shiva — trifoliate leaf represents Trimurti (Brahma, Vishnu, Mahesh)",
      "108 Bilva leaves offered to Shivalinga during Shravan Somvar",
      "Essential in Maha Shivaratri puja and Rudrabhishek",
      "Offering even a single Bilva leaf to Shiva is said to equal donating a thousand cows",
      "Used in Pradosh Vrat puja on Trayodashi tithi",
    ],
    havanUses: [
      "Bilva leaves used as ahuti in Rudra yajna (Eka Dasha Rudra)",
      "Added to Shiva havan for disease removal and spiritual liberation",
      "Used in Mrityunjaya havan as primary offering to Lord Shiva",
      "Included in Shanti havan for removing disease and obstacles",
    ],
    healingUses: [
      "Anti-diabetic — bael fruit and leaf regulate blood glucose",
      "Digestive tonic — relieves constipation, diarrhea, and IBS",
      "Anti-inflammatory for ulcers, colitis, and gastritis",
      "Adaptogenic properties support stress and adrenal health",
      "Bael fruit sherbet used as cooling summer drink for digestive health",
    ],
    significance:
      "The Bilva tree is described in the Shiva Purana as the most beloved plant of Shiva. Legend holds that Goddess Lakshmi resides within the Bilva tree. The three-leafed compound leaf represents Shiva's three eyes, his trident (Trishul), and Trimurti.",
    availability: "Common",
    description:
      "The sacred Bael tree is inseparable from the worship of Lord Shiva. Found growing near every Shiva temple in India, its distinctive trifoliate leaves are the singular most important offering in the entire Shiva tradition. No Shiva puja is considered complete without Belpatra.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "durva",
    nameHindi: "दूर्वा",
    nameSanskrit: "Dūrvā",
    nameEnglish: "Bermuda Grass / Doob Grass",
    nameBotanical: "Cynodon dactylon",
    pujaUses: [
      "Most sacred offering to Lord Ganesha — 21 Durva blades offered in Ganesha puja",
      "Used in Ganesh Chaturthi as primary decoration and offering",
      "Offered to Lord Vishnu and Krishna on Ekadashi and special occasions",
      "Durva bundle used for sprinkling holy water (prokshana) during rites",
      "Placed in Kalash (sacred water vessel) during all major pujas",
    ],
    havanUses: [
      "Used in Navgraha shanti havan — represents Ketu energy",
      "Added to Mrityunjaya havan for longevity and long life",
      "Used in yajna as a sacred grass to purify the ritual space",
      "Tied around puja vessels as a sacred binding material",
    ],
    healingUses: [
      "Anti-hemorrhagic — stops bleeding when applied externally",
      "Diuretic and kidney-protective in Ayurvedic formulations",
      "Used for skin disorders, eczema, and allergic conditions",
      "Reduces fever; Durva juice mixed with honey for colds and flu",
      "Traditional remedy for menstrual disorders and uterine bleeding",
    ],
    significance:
      "Durva is intimately associated with Lord Ganesha — legend says that when Analasura (a fire demon) was swallowed by Ganesha and caused him burning discomfort, the 88,000 rishis placed 21 blades of Durva on his head, cooling him immediately. Thus Ganesha declared Durva his most beloved offering.",
    availability: "Common",
    description:
      "One of India's most widespread grasses, Durva holds extraordinary spiritual significance far beyond its humble appearance. Growing abundantly even in arid conditions, Durva represents the indestructibility of the soul and the ever-renewing quality of divine grace.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "ashtagandha",
    nameHindi: "अष्टगंध",
    nameSanskrit: "Ashtagandha",
    nameEnglish: "Eight Fragrant Herbs Blend",
    nameBotanical: "Multi-herb preparation",
    pujaUses: [
      "Sacred paste for deity worship — used to anoint idols and draw sacred symbols",
      "Ashtagandha tilak applied to deities and devotees during festivals",
      "Mixed with water for abhishek of Shivalinga and Vishnu idols",
      "Used in tantra puja for creating sacred ritual boundaries (mandala)",
      "Applied to Bhojpatra inscriptions for mantric blessings",
    ],
    havanUses: [
      "Added to all major yajnas as a comprehensive fragrant offering",
      "Used in Navgraha havan as multi-planetary pacification ingredient",
      "Essential in Shri Yantra puja havan",
      "Added to Rudra yajna for complete planetary harmony",
    ],
    healingUses: [
      "Each component herb carries its own healing properties",
      "Combined formulation is a natural antiseptic and skin protector",
      "Aromatherapy blend reduces anxiety and promotes spiritual calm",
      "Traditional preparation applied to newborns for protection and strength",
    ],
    significance:
      "Ashtagandha is a sacred formulation mentioned in the Vishnu Purana, combining eight sacred aromatic substances (including Chandan, Ashwagandha, Gorochan, Kesar, etc.). It creates a comprehensive fragrant offering that purifies body, mind, and spirit simultaneously.",
    availability: "Moderate",
    description:
      "A traditional sacred preparation blending eight aromatic herbs, Ashtagandha represents completeness and divine harmony. Used across all Hindu schools of worship, this blend is both a spiritual tool and an Ayurvedic formulation with synergistic health benefits.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "gorochan",
    nameHindi: "गोरोचन",
    nameSanskrit: "Gorocana",
    nameEnglish: "Cow Bezoar / Sacred Yellow Stone",
    nameBotanical: "Bos taurus (bovine gallstone)",
    pujaUses: [
      "Highly prized substance for writing sacred mantras on Bhojpatra",
      "Used in Tilak preparation for special tantric puja",
      "Placed in the kalash (sacred vessel) during major havans",
      "Applied as tilak during auspicious ceremonies and Vivaha (wedding) rites",
      "Used in preparing Ashtagandha paste for deity worship",
    ],
    havanUses: [
      "Added to Surya (Sun) havan for glory and divine favor",
      "Used in Vashikaran (attraction) yajna as principal ingredient",
      "Added to Rahu and Ketu graha shanti havan",
      "Used in protective havan for children and during Namakarana ceremony",
    ],
    healingUses: [
      "Used in Ayurveda for liver disorders and digestive complaints",
      "Traditional remedy for epilepsy and convulsive disorders",
      "Anti-toxic properties in Ayurvedic formulations for poison neutralization",
      "Applied to forehead for headaches and migraine relief",
    ],
    significance:
      "Gorochan is considered one of the rarest and most sacred natural substances in Hinduism. A bovine gallstone forming naturally in cows, it is considered extremely auspicious as it comes from the sacred cow (Gau Mata). Writing mantras with Gorochan ink on Bhojpatra is believed to make them extraordinarily powerful.",
    availability: "Rare",
    description:
      "A naturally occurring yellow stone found in the gall bladder of cows, Gorochan is one of the most sought-after substances in Vedic tantra and Ayurveda. Its bright golden-yellow color reflects the solar energy it is believed to carry.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "kush",
    nameHindi: "कुश",
    nameSanskrit: "Kusha",
    nameEnglish: "Darbha Grass / Sacred Grass",
    nameBotanical: "Desmostachya bipinnata",
    pujaUses: [
      "Kusha ring (Pavitri) worn on right hand during all Vedic rituals",
      "Kusha asana (grass mat) used for sitting during yajna and puja",
      "Kusha grass bundle used for sprinkling consecrated water",
      "Offered to ancestors during Pitru tarpan and Shraddha rites",
      "Used in Upanayana (sacred thread) ceremony as sacred grass",
    ],
    havanUses: [
      "Kusha samidha used as sacred firewood in Vedic yajnas",
      "Used in Pitru (ancestors) yajna for ancestral peace",
      "Placed as base layer in havan kund before lighting",
      "Kusha grass woven into protective rings for yajaman (yajna performer)",
    ],
    healingUses: [
      "Kusha grass root used as diuretic in Ayurveda",
      "Anti-inflammatory properties for urinary tract disorders",
      "Used in traditional medicine for fever and skin conditions",
      "Applied topically for snake bites as a first-aid measure",
    ],
    significance:
      "Kusha is considered the most sacred grass in the Vedic tradition. The Bhagavad Gita (Chapter 6) describes the ideal meditation seat as made of Kusha grass covered with deer skin. Lord Rama's sacred seat at Chitrakut was of Kusha, and the bow of Lord Vishnu is called Sharanga — made from Kusha grass.",
    availability: "Moderate",
    description:
      "A tall, sharp-bladed sacred grass, Kusha holds the unique distinction of being described in both the Rigveda and the Bhagavad Gita as essential for worship. Without a Kusha ring on the finger, most Vedic rituals are considered ineffective.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "pachranga",
    nameHindi: "पंचरंगा",
    nameSanskrit: "Pancharanga",
    nameEnglish: "Five-Colored Herb Mix",
    nameBotanical: "Mixed preparation — 5 specified herbs",
    pujaUses: [
      "Used in tantra puja for invoking protection from five directions",
      "Mixed into sacred water for sprinkling during house purification",
      "Offered to Panchadevi (five goddess forms) during Navratri",
      "Used in Bhumi puja (land worship) before construction",
    ],
    havanUses: [
      "Five-herb combination used in Panchopachar yajna",
      "Added to Navgraha shanti havan for complete planetary pacification",
      "Used in Vastu shanti havan for five-directional harmony",
      "Essential in Griha Pravesh havan for new home blessing",
    ],
    healingUses: [
      "Combined herbal formulation for immune strengthening",
      "Traditional remedy for skin disorders and complexion improvement",
      "Used in Ayurvedic preparations for general vitality",
    ],
    significance:
      "Pachranga (five-colored) represents the five elements (Panchamahabhuta) and five pranas. In Tantric tradition, using a five-component herb blend invokes the power of all five directions and their presiding deities simultaneously.",
    availability: "Moderate",
    description:
      "A traditional sacred herb blend of five aromatic substances, Pachranga is used in purification and protective rituals. Each of the five herbs corresponds to a cosmic direction and element, making this blend a complete elemental offering.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "amlaki",
    nameHindi: "आंवला",
    nameSanskrit: "Amalaki",
    nameEnglish: "Indian Gooseberry / Amla",
    nameBotanical: "Phyllanthus emblica",
    pujaUses: [
      "Amlaki Ekadashi — special puja of the Amla tree on Ekadashi in Kartik month",
      "Amla offered to Lord Vishnu on Ekadashi for divine blessings",
      "Amla tree worship during Akshaya Tritiya for prosperity",
      "Amla fruit offered in Satyanarayan puja as Panchamrit component",
    ],
    havanUses: [
      "Amla wood used as samidha in Navgraha havan",
      "Added to Ayushya havan for longevity and robust health",
      "Used in Dhanvantari puja havan for healing blessings",
      "Amla included in Triphala-based havan preparations",
    ],
    healingUses: [
      "Highest natural vitamin C source — powerful antioxidant and immune booster",
      "Promotes hair growth, prevents premature greying, and reduces hair fall",
      "Anti-aging Rasayana herb in Ayurveda — rejuvenates all dhatus (tissues)",
      "Supports liver health, improves digestion, and reduces acidity",
      "Regulates blood sugar and cholesterol; Chyawanprash's primary ingredient",
    ],
    significance:
      "In the Vishnu Purana, the Amlaki tree is described as originating from Vishnu's tears shed during creation. Worshipping the Amla tree is considered equivalent to worshipping all tirthas (sacred pilgrimage sites). Bathing under an Amla tree on Kartik Ekadashi is extremely auspicious.",
    availability: "Common",
    description:
      "One of the most nutrient-dense fruits in nature, Amla is the star ingredient of Chyawanprash — India's ancient superfood preparation. With 20x more vitamin C than oranges, Amla has sustained Indian health and spiritual practices for thousands of years.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "haritaki",
    nameHindi: "हरड़",
    nameSanskrit: "Haritaki",
    nameEnglish: "Chebulic Myrobalan / Harad",
    nameBotanical: "Terminalia chebula",
    pujaUses: [
      "Offered to Lord Shiva as a medicinal fruit representing divine healing power",
      "Used in Dhanvantari puja (physician of the gods) with other healing herbs",
      "Haritaki held in right hand of Lord Dhanvantari iconography",
    ],
    havanUses: [
      "Used in Mercury (Budh) graha shanti havan for intellect",
      "Added to Ayushya havan as a longevity-promoting herb",
      "Included in Triphala-based havan preparations",
      "Used in havan during Dhanvantari Puja for disease prevention",
    ],
    healingUses: [
      "Called 'mother of herbs' in Ayurveda — balances all three doshas",
      "Powerful digestive tonic; relieves constipation and detoxifies colon",
      "Anti-aging Rasayana — promotes longevity and cognitive sharpness",
      "Anti-diabetic; regulates blood glucose effectively",
      "Antimicrobial against H. pylori, E. coli, and MRSA",
    ],
    significance:
      "Haritaki is the most important herb in Tibetan and Ayurvedic medicine. It appears in Lord Dhanvantari's right hand in all iconography. The Charaka Samhita lists Haritaki as the supreme herb, capable of curing all 28 diseases named in Ayurveda.",
    availability: "Common",
    description:
      "One of the three herbs in the legendary Triphala formulation, Haritaki has been called the 'king of medicines' in the Tibetan tradition. Its fruit, resembling a human hand with five fingers, was considered so sacred that touching it was itself a blessing.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "bibhitaki",
    nameHindi: "बहेड़ा",
    nameSanskrit: "Vibhitaka",
    nameEnglish: "Beleric Myrobalan / Bahera",
    nameBotanical: "Terminalia bellirica",
    pujaUses: [
      "Third component of Triphala — offered in Dhanvantari puja",
      "Used in Vedic medicine rituals for disease-freeing ceremonies",
      "Vibhitaka fruit offered to Lord Varuna (god of waters)",
    ],
    havanUses: [
      "Added to Triphala-based havan preparations for longevity",
      "Used in Ayushya havan and Mrityunjaya havan for health",
      "Included in Jupiter (Brihaspati) graha shanti havan",
    ],
    healingUses: [
      "Anti-microbial; especially effective against respiratory infections",
      "Expectorant — used for bronchitis, asthma, and cough in Ayurveda",
      "Eye health — Bibhitaki is beneficial for vision and eye disorders",
      "Anti-parasitic; expels intestinal worms",
      "Skin and hair health when used in Triphala formulations",
    ],
    significance:
      "Bibhitaki's name means 'that which protects from disease' in Sanskrit. As the third component of Triphala (with Amalaki and Haritaki), it completes the sacred triad that Charaka described as the ultimate Rasayana capable of restoring youth and vitality.",
    availability: "Common",
    description:
      "A large deciduous tree of the Indian subcontinent, Bibhitaki forms the essential third member of Triphala — the most widely used formulation in Ayurveda. Its astringent fruit pacifies Kapha dosha and has particular affinity with respiratory and eye health.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "sarpagandha",
    nameHindi: "सर्पगंधा",
    nameSanskrit: "Sarpagandha",
    nameEnglish: "Indian Snakeroot",
    nameBotanical: "Rauvolfia serpentina",
    pujaUses: [
      "Used in Nag puja (snake worship) on Nag Panchami",
      "Offered to Lord Shiva as protector from serpent venom",
      "Used in protective rituals against snake energy and Kalasarpa Dosha",
    ],
    havanUses: [
      "Used in Rahu dosha nivaran havan — Rahu represents serpents",
      "Added to Kalsarpa Yoga nivaran havan",
      "Used in protective yajna for those suffering snake-related dosha",
    ],
    healingUses: [
      "Reserpine alkaloid — one of the first natural antihypertensive drugs",
      "Used in Ayurveda for hypertension, insanity, and epilepsy",
      "Tranquilizing and sedative properties for anxiety and insomnia",
      "Traditionally used as antidote for snake bite venom",
      "Anti-psychotic properties researched for mental disorders",
    ],
    significance:
      "Sarpagandha means 'serpent-scented' — its use in Nag worship connects it directly to the serpent deity tradition. The plant was used by ancient Indian physicians to treat mental illness, earning the name 'Pagal-ki-dawai' (medicine of the mad) in folk medicine.",
    availability: "Moderate",
    description:
      "One of Ayurveda's most pharmacologically significant plants, Sarpagandha yielded reserpine — the first drug used clinically for high blood pressure. Its connection to serpent deities and its potent neurological effects have made it both spiritually significant and medically valuable.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "vacha",
    nameHindi: "वच",
    nameSanskrit: "Vacā",
    nameEnglish: "Sweet Flag / Calamus",
    nameBotanical: "Acorus calamus",
    pujaUses: [
      "Vacha root placed in baby's cradle and worn around infants' necks for protection",
      "Used in Saraswati puja for sharpening intellect and speech",
      "Applied to throat chakra in tantric healing rituals",
      "Used in Devi puja for invoking speech and wisdom blessings",
    ],
    havanUses: [
      "Used in Mercury (Budh) havan for improving communication and intellect",
      "Added to Saraswati yajna on Vasant Panchami",
      "Included in havan for child naming ceremony (Namakarana) for sharp speech",
    ],
    healingUses: [
      "Highly effective for cognitive enhancement — improves memory and speech",
      "Used in Ayurveda for stammering, speech defects, and communication disorders",
      "Neuroprotective; research shows anti-Alzheimer's properties",
      "Digestive stimulant and anti-spasmodic for IBS and gas",
      "Anti-epileptic properties in Ayurvedic pediatric medicine",
    ],
    significance:
      "Vacha is the sacred herb of speech and intelligence. In Ayurveda, it is said to 'open the channels' of the mind and throat. Ancient teachers gave Vacha to students to improve their capacity to memorize and recite lengthy Vedic texts.",
    availability: "Moderate",
    description:
      "A semi-aquatic perennial with sword-shaped leaves, Vacha is the premier Ayurvedic herb for neurological and speech disorders. The aromatic rhizome contains beta-asarone and other compounds that have profound effects on brain chemistry and vocal clarity.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "jatamansi",
    nameHindi: "जटामांसी",
    nameSanskrit: "Jatāmāṃsi",
    nameEnglish: "Spikenard / Musk Root",
    nameBotanical: "Nardostachys jatamansi",
    pujaUses: [
      "Highly prized ingredient in sacred incense preparations for deep meditation",
      "Used in Shiva puja — Lord Shiva's matted hair (jata) is associated with this plant",
      "Offered in tantric rituals for accessing higher states of consciousness",
      "Used in Devi puja and Kali worship for invoking divine wisdom",
    ],
    havanUses: [
      "Used in Saturn (Shani) havan for removing fears and karmic burdens",
      "Added to meditation havan preparations for deepening samadhi states",
      "Included in Navgraha havan for Ketu pacification",
    ],
    healingUses: [
      "Powerful adaptogen and nervine tonic for stress, anxiety, and insomnia",
      "Anti-epileptic and anti-convulsant properties",
      "Promotes hair growth and prevents premature hair loss",
      "Cardiac tonic — regulates heart rate and blood pressure",
      "Used in Ayurveda for liver protection and skin health",
    ],
    significance:
      "Jatamansi is one of the most sacred aromatic herbs in Hindu tradition. Its name ('the herb with matted locks') connects it to Lord Shiva, who is depicted with jata (matted hair) from which the Ganges flows. Used in the most powerful tantric incense preparations.",
    availability: "Rare",
    description:
      "A rare Himalayan herb growing above 3,000 meters elevation, Jatamansi is among the most prized medicinal and sacred herbs. Mentioned in the Bible as 'Nard' — the expensive ointment used to anoint Jesus — it has been treasured across civilizations for its deep grounding and consciousness-expanding properties.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "shankhpushpi",
    nameHindi: "शंखपुष्पी",
    nameSanskrit: "Śaṅkhapuṣpī",
    nameEnglish: "Morning Glory / Bindweed",
    nameBotanical: "Convolvulus pluricaulis",
    pujaUses: [
      "Offered to Goddess Saraswati as it resembles a conch (Shankha)",
      "Used in Saraswati puja and Vidyarambha ceremony",
      "White conch-shaped flowers offered to Lord Vishnu",
      "Used in puja during Brahma Muhurta to enhance spiritual receptivity",
    ],
    havanUses: [
      "Added to Saraswati yajna for enhancing memory and intelligence",
      "Used in Mercury (Budh) havan for improving study and learning",
      "Included in Vidyarambha havan for children starting school",
    ],
    healingUses: [
      "Memory enhancer — one of Ayurveda's top brain-boosting herbs",
      "Reduces anxiety, depression, and promotes quality sleep",
      "Antiepileptic — used for seizures and convulsive disorders",
      "Regulates thyroid function (hyperthyroidism treatment in Ayurveda)",
      "Anti-stress and mental fatigue reduction",
    ],
    significance:
      "Shankhpushpi is considered sacred because its white flowers resemble the Shankha (conch shell) — the divine instrument of Lord Vishnu. The sound of Shankha purifies space; the herb of Shankha purifies the mind. Together, they represent the path to divine knowledge.",
    availability: "Common",
    description:
      "A small blue, white, or pink-flowered creeper with an outsized reputation in Ayurveda, Shankhpushpi is one of the most researched herbs for cognitive enhancement. Its effects on memory and stress are well-documented, and it remains one of Ayurveda's most prescribed brain tonics.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "mulethi",
    nameHindi: "मुलेठी",
    nameSanskrit: "Yashtimadhu",
    nameEnglish: "Licorice Root",
    nameBotanical: "Glycyrrhiza glabra",
    pujaUses: [
      "Offered to Lord Vishnu and Krishna as a sweet, cooling herb",
      "Used in Panchamrit preparation for abhishek",
      "Offered during Satyanarayan puja for sweetness of speech and life",
    ],
    havanUses: [
      "Added to Surya (Sun) and Jupiter (Guru) havans for sweetness and success",
      "Used in Vak-Siddhi (power of speech) havan for eloquence",
      "Included in fertility havans for sweet outcomes",
    ],
    healingUses: [
      "Soothes throat inflammation — anti-tussive and anti-inflammatory for cough",
      "Supports adrenal health and cortisol regulation",
      "Anti-ulcer properties — protects stomach lining from acid damage",
      "Anti-viral; used for treating herpes, hepatitis, and respiratory infections",
      "Mulethi powder promotes oral health and freshens breath naturally",
    ],
    significance:
      "Yashtimadhu ('sweet stick') is the herb of sweetness and success in speech. In Ayurveda, it is said to give Madhura (sweet) quality to voice and relationships. Orators and singers traditionally consumed Mulethi to maintain vocal clarity and sweetness.",
    availability: "Common",
    description:
      "One of the most widely used herbs in both Eastern and Western herbal traditions, Licorice root has been traded along ancient spice routes for millennia. Its naturally sweet, slightly pungent roots deliver remarkable healing power particularly for the respiratory system and adrenal glands.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "kesar",
    nameHindi: "केसर",
    nameSanskrit: "Kunkuma / Kashmira",
    nameEnglish: "Saffron",
    nameBotanical: "Crocus sativus",
    pujaUses: [
      "Kesar tilak applied to deities during special puja for divine glory",
      "Mixed in milk for abhishek of deities (Kesar doodh abhishek)",
      "Used in Panchamrit for its divine fragrance and color",
      "Applied to Shivalinga during Kesar Rudrabhishek",
      "Kesar mixed with sandalwood paste for Vaishnav deity worship",
    ],
    havanUses: [
      "Added to Surya (Sun) havan as the most powerful solar herb",
      "Used in Jupiter (Guru/Brihaspati) havan for wisdom and prosperity",
      "Included in love and marriage havan (Vivaha havan) for happiness",
      "Used in Sarva Kama Siddhi havan for all wish fulfillment",
    ],
    healingUses: [
      "Powerful antidepressant — as effective as fluoxetine in clinical trials",
      "Antioxidant and anti-cancer properties (crocin and safranal)",
      "Enhances memory and protects against Alzheimer's disease",
      "PMS relief — reduces mood swings, cramps, and emotional symptoms",
      "Supports cardiac health by reducing LDL and blood pressure",
    ],
    significance:
      "Saffron is the world's most precious spice by weight and among the most sacred substances in Hindu worship. Its golden-crimson threads represent the rays of divine light and the golden energy of the sun. The Rigveda mentions Kesar in Soma rituals as a divine catalyst for elevated states.",
    availability: "Rare",
    description:
      "Extracted from the hand-picked stigmas of Crocus sativus flowers, Saffron requires 150,000 flowers to produce just 1 kilogram. This extraordinary effort reflects its extraordinary status — revered equally in the royal kitchen and the divine temple as gold in plant form.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "methi",
    nameHindi: "मेथी",
    nameSanskrit: "Methikā",
    nameEnglish: "Fenugreek",
    nameBotanical: "Trigonella foenum-graecum",
    pujaUses: [
      "Methi seeds offered to Saturn (Shani) during Shani puja on Saturdays",
      "Fenugreek offered to Goddess Durga for fertility blessings",
      "Used in folk rituals for attracting prosperity and abundance",
    ],
    havanUses: [
      "Added to Saturn (Shani) graha shanti havan",
      "Used in Navgraha havan as one of the planetary grain offerings",
      "Methi seeds included in Rahu and Ketu dosha pacification havan",
    ],
    healingUses: [
      "Anti-diabetic — significantly lowers blood glucose and improves insulin sensitivity",
      "Increases breast milk production in nursing mothers",
      "Anti-cholesterol; lowers LDL and triglycerides",
      "Anti-inflammatory for arthritis and digestive inflammation",
      "Supports testosterone levels and male fertility",
    ],
    significance:
      "Methi is associated with Saturn (Shani) in Vedic astrology — its bitter taste aligns with Shani's testing nature, and offering it to Shani is said to pacify adverse Saturn transits. In folk tradition, keeping Methi seeds under the bed is said to prevent Shani's malefic effects.",
    availability: "Common",
    description:
      "A staple of Indian cooking and Ayurveda, Fenugreek's bitter seeds carry surprising sweetness when their medicinal potential is understood. From blood sugar control to lactation support, its therapeutic range is as broad as any herb in the Indian pharmacopeia.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "ajwain",
    nameHindi: "अजवाइन",
    nameSanskrit: "Yavanikā",
    nameEnglish: "Carom Seeds / Bishop's Weed",
    nameBotanical: "Trachyspermum ammi",
    pujaUses: [
      "Offered to Lord Hanuman for digestive strength and vitality",
      "Used in Navgraha puja ritual offerings for Mars (Mangal)",
      "Ajwain smoke used for protective fumigation of ritual space",
    ],
    havanUses: [
      "Added to Vata-reducing havan preparations for digestive fire",
      "Used in Mars (Mangal) graha shanti havan",
      "Added to fumigation havan for clearing pathogenic energies",
    ],
    healingUses: [
      "Powerful carminative — instant relief from gas, bloating, and indigestion",
      "Anti-spasmodic for stomach cramps and IBS",
      "Anti-parasitic — ajwain oil effective against intestinal worms",
      "Thymol content makes it a natural antiseptic for wounds",
      "Respiratory support — ajwain steam inhalation for cold and congestion",
    ],
    significance:
      "In Vedic medicine, Ajwain is called the 'cure for all diseases from the stomach.' Its extreme potency — carrying the essence of fire within its tiny seeds — made it a sacred offering to fire-associated deities like Mars. Its smoke is one of the oldest forms of domestic fumigation.",
    availability: "Common",
    description:
      "Tiny but incredibly potent, carom seeds are among the most concentrated sources of thymol in nature. No Indian household kitchen or medicine chest is complete without Ajwain. Its digestive powers work within minutes — making it the go-to herb for immediate relief.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "kalanji",
    nameHindi: "कलौंजी",
    nameSanskrit: "Kṛṣṇajīraka",
    nameEnglish: "Nigella / Black Seed",
    nameBotanical: "Nigella sativa",
    pujaUses: [
      "Offered to Goddess Kali and Shiva as a protective offering",
      "Used in protective folk rituals against evil eye (nazar)",
      "Black seeds scattered at doorways for protection in some traditions",
    ],
    havanUses: [
      "Added to Saturn (Shani) havan for removing obstacles",
      "Used in Kali havan and tantric yajnas for protective energy",
      "Included in Rahu graha shanti havan preparations",
    ],
    healingUses: [
      "Called 'cure for everything except death' — Prophetic medicine",
      "Anti-cancer — Thymoquinone inhibits tumor growth in multiple studies",
      "Powerful immunomodulator and anti-inflammatory",
      "Anti-diabetic, anti-hypertensive, and cardio-protective",
      "Antifungal and antibacterial for respiratory and skin infections",
    ],
    significance:
      "Known as Habbatus Sauda in Islamic medicine and Krishnajiraka in Ayurveda, Black Seed has been called the universal cure. Found in Tutankhamun's tomb, it has been revered for 3,000 years. Its black color associates it with protective planetary energies in Hindu astrology.",
    availability: "Common",
    description:
      "Small but spectacular in its pharmacological range, Nigella sativa seeds contain over 100 compounds including the remarkable Thymoquinone. Modern research has validated ancient claims of its efficacy against cancer, diabetes, hypertension, and immune disorders.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "lal-chandan",
    nameHindi: "लाल चंदन",
    nameSanskrit: "Raktachandana",
    nameEnglish: "Red Sandalwood",
    nameBotanical: "Pterocarpus santalinus",
    pujaUses: [
      "Lal Chandan tilak applied to Ganesha, Durga, and Kali for auspiciousness",
      "Used in Shakti puja and Durga worship as a red-colored sacred paste",
      "Applied to Surya (Sun) in Surya puja for solar blessings",
      "Red sandalwood paste used in Navaratri and Holi rituals",
    ],
    havanUses: [
      "Red sandalwood used as premium samidha for Mars (Mangal) havan",
      "Added to Surya havan for solar energy invocation",
      "Used in Shakti and Tantric yajnas for invoking fiery divine energy",
    ],
    healingUses: [
      "Anti-inflammatory and cooling for skin eruptions and heat conditions",
      "Anti-diabetic properties comparable to regular sandalwood",
      "Hepatoprotective — used in Ayurveda for liver disorders",
      "Antimicrobial for skin infections and wound healing",
      "Used in Ayurveda for bleeding disorders and hemorrhagic conditions",
    ],
    significance:
      "Red Sandalwood is associated with Mars (Mangal) and the fierce Shakti. Its vivid crimson color corresponds to the energy of power and protection. It is believed to activate courage, strength, and protective energy in rituals dedicated to warrior deities.",
    availability: "Moderate",
    description:
      "Not to be confused with aromatic white sandalwood, Red Sandalwood is a dense heartwood prized for its deep crimson dye and medicinal properties. Found primarily in the Eastern Ghats of India, it is a protected species due to its immense value in ritual and medicine.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "peela-chandan",
    nameHindi: "पीला चंदन",
    nameSanskrit: "Pīta Chandana",
    nameEnglish: "Yellow Sandalwood",
    nameBotanical: "Santalum album (yellow heartwood)",
    pujaUses: [
      "Yellow sandalwood paste applied as tilak to Vishnu, Krishna, and Lakshmi",
      "Used in Vishnu abhishek and Satyanarayan puja for golden blessings",
      "Offered to Brihaspati (Jupiter) on Thursdays for wisdom and wealth",
      "Peela Chandan used in drawing sacred Swastika and Om symbols",
    ],
    havanUses: [
      "Used in Jupiter (Brihaspati) havan for prosperity and spiritual growth",
      "Added to Vishnu yajna for happiness and dharmic outcomes",
      "Included in Lakshmi puja havan for financial prosperity",
    ],
    healingUses: [
      "Skin cooling and brightening when applied as paste",
      "Antiseptic for minor wounds and skin disorders",
      "Aromatherapy for anxiety reduction and mental clarity",
      "Anti-inflammatory for headaches when applied to forehead",
    ],
    significance:
      "Yellow sandalwood represents the golden energy of Jupiter (Guru) — wisdom, abundance, and divine grace. In Vaishnav tradition, the Tilak drawn with yellow sandalwood paste is a sacred mark of being a devotee of Lord Vishnu.",
    availability: "Moderate",
    description:
      "The aged heartwood of mature sandalwood trees develops a golden-yellow hue, which is associated with Jupiter's auspicious energy. This premium-quality paste has been used for centuries by Vaishnav acharyas and priests as the sacred mark of divine protection.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "kumkum",
    nameHindi: "कुमकुम",
    nameSanskrit: "Kumkuma",
    nameEnglish: "Sacred Red Powder / Saffron-based Sindoor",
    nameBotanical: "Crocus sativus (saffron-based) or Bixa orellana",
    pujaUses: [
      "Applied as Tilak to deities during all pujas — most especially Devi worship",
      "Kumkum Archana (108 names with Kumkum offering) in Devi puja",
      "Essential in Haldi-Kumkum ceremony — women apply to each other's foreheads",
      "Placed on feet of goddess idols during Navratri",
      "Applied as tilak to devotees at the end of puja as prasad",
    ],
    havanUses: [
      "Added to Devi havan samagri for Mars (Mangal) pacification",
      "Used in Navratri havan as primary offering to the nine Devi forms",
      "Essential in Tripura Sundari and Shodashi puja yajna",
    ],
    healingUses: [
      "Contains saffron compounds — antidepressant and antioxidant when used in small amounts",
      "Applied to forehead at Ajna chakra for headache and migraine relief",
      "Traditional anti-acne preparation when mixed with sandalwood paste",
      "Used as color therapy — red stimulates root chakra (Muladhara)",
    ],
    significance:
      "Kumkum is the most visible mark of Hindu devotional life. The red spot on the forehead represents the third eye and the activation of Ajna chakra. For married women, wearing Kumkum is a sign of Saubhagya (blessed marital life) — it is applied where the skull plates meet, an important marma (vital) point.",
    availability: "Common",
    description:
      "Perhaps the most universally recognizable symbol of Hindu spiritual practice, Kumkum transforms any space, forehead, or offering it touches into a sacred statement. Traditionally made from turmeric mixed with slaked lime (turning red) or genuine saffron powder.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "sindoor",
    nameHindi: "सिंदूर",
    nameSanskrit: "Sindūra",
    nameEnglish: "Vermilion / Cinnabar Red",
    nameBotanical: "Mercury sulfide (traditional) / Turmeric + lime (natural)",
    pujaUses: [
      "Applied to parting of hair by married Hindu women as sacred mark",
      "Smeared on Lord Hanuman's entire body — he covered himself in sindoor for Ram's longevity",
      "Essential offering in Hanuman puja — Sindoor with Chola (saffron cloth)",
      "Applied to Ganesha's forehead in Ganesh puja",
      "Used in Navratri to adorn Devi's hair parting and crown",
    ],
    havanUses: [
      "Used in Mars (Mangal) havan for strength and protection",
      "Added to Hanuman yajna havan preparations",
      "Used in Tantric yajnas for invoking protective energies",
    ],
    healingUses: [
      "Traditional red sindoor worn at crown of head over the Brahmarandhra (fontanel)",
      "Applied at the Sushumna Nadi entry point — said to control blood pressure",
      "Natural sindoor (turmeric-based) has antifungal scalp benefits",
      "Color therapy — red energizes and activates root and sacral chakras",
    ],
    significance:
      "Sindoor marks the most sacred boundary — the Saubhagya (blessed state) of a married woman and the center channel where Kundalini energy ascends. When Sita asked why Parvati wore sindoor, Parvati explained it was for the longevity of Shiva. This same devotion is expressed through the sacred red line.",
    availability: "Common",
    description:
      "From the parting of a bride's hair at Vivaha (wedding) to the vermilion smeared over Lord Hanuman's entire body, Sindoor carries an intensity of devotional meaning unmatched by any other ritual substance in Hinduism.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "dhatura",
    nameHindi: "धतूरा",
    nameSanskrit: "Dhattūra",
    nameEnglish: "Devil's Trumpet / Jimsonweed",
    nameBotanical: "Datura stramonium / Datura metel",
    pujaUses: [
      "Offered exclusively to Lord Shiva — particularly on Maha Shivaratri",
      "Considered one of Shiva's most beloved offerings alongside Belpatra",
      "White Dhatura flowers offered to Shiva represent his wild, untamed nature",
      "Used in specific Tantric Shiva rituals at cremation grounds (Smashan)",
    ],
    havanUses: [
      "Used in Vama (left-hand) Tantric yajna with extreme caution",
      "Offered in Bhairava and Kali yajnas in very small quantities",
      "Seeds used in Shamshan (cremation ground) havan in Aghori tradition",
    ],
    healingUses: [
      "Historically used as anesthetic in surgery (highly toxic — expert use only)",
      "Anti-asthmatic — dhatura leaves in small doses for severe asthma attacks",
      "Topical application for joint pain and swelling (never internal)",
      "Used by Ayurvedic physicians for Parkinson's disease symptoms",
    ],
    significance:
      "Dhatura is the most sacred offering to Shiva precisely because it is deadly — it represents the transformative power of Shiva who is both the supreme healer (Vaidyanath) and the great destroyer (Mahakala). Only the bold and devoted dare to offer it, understanding that Shiva alone can safely handle that which destroys lesser beings.",
    availability: "Common",
    description:
      "Dhatura stands apart from all other sacred herbs — it is beautiful, deadly, and beloved only by Lord Shiva. Its intoxicating, trumpet-shaped white flowers grow abundantly across India. This plant must be offered to Shiva but NEVER consumed.",
    uses: ["puja", "havan", "spiritual"],
  },
  {
    id: "bhaang",
    nameHindi: "भांग",
    nameSanskrit: "Vijaya / Bhanga",
    nameEnglish: "Cannabis / Indian Hemp",
    nameBotanical: "Cannabis sativa",
    pujaUses: [
      "Offered to Lord Shiva as his favorite herb — associated with Shiva's ecstatic states",
      "Bhaang prasad distributed during Maha Shivaratri and Holi",
      "Shiva lingam bathed with Bhaang (cannabis) water in some traditions",
      "Used in Aghori and Tantric Shiva practices for transcendent experiences",
    ],
    havanUses: [
      "Leaves and seeds offered in specific Tantric Shiva yajnas",
      "Used in Kali and Bhairava yajnas in Vama Marga tradition",
      "Offered in Rudra yajna in some Shaiva schools",
    ],
    healingUses: [
      "Used in Ayurveda for pain relief, appetite stimulation, and nausea (under guidance)",
      "Anti-spasmodic for muscle cramps and seizure disorders",
      "Traditional use for anxiety and insomnia in controlled preparations",
      "Hemp seeds (non-psychoactive) are nutritionally rich in omega-3 fatty acids",
    ],
    significance:
      "Called 'Vijaya' (victory) in Sanskrit, Bhaang is considered Shiva's sacred herb — representing the dissolution of ordinary consciousness into divine awareness. The Atharva Veda mentions Bhaang as one of the five sacred plants that 'release from anxiety.' Lord Shiva is often depicted holding a chillum (pipe).",
    availability: "Moderate",
    description:
      "One of the most controversial and simultaneously most sacred herbs in Hinduism, Bhaang occupies a unique space as Shiva's beloved intoxicant. Consumed as a ritual drink during Shivaratri and Holi, it represents the boundary-dissolving nature of Lord Shiva himself.",
    uses: ["puja", "havan", "spiritual"],
  },
  {
    id: "bhojpatra",
    nameHindi: "भोजपत्र",
    nameSanskrit: "Bhūrjapatra",
    nameEnglish: "Himalayan Birch Bark",
    nameBotanical: "Betula utilis",
    pujaUses: [
      "Sacred writing material — Vedic mantras and yantras written on Bhojpatra",
      "Kavach (protective amulet) inscriptions written on Bhojpatra and worn",
      "Shree Yantra and other sacred geometric diagrams drawn on Bhojpatra",
      "Love and attraction spells in tantra traditionally written on Bhojpatra",
    ],
    havanUses: [
      "Bhojpatra with inscribed mantras offered in havan kund",
      "Used in Vashikaran (attraction) havan",
      "Offered in Navgraha havan after writing planetary mantras on it",
    ],
    healingUses: [
      "Anti-inflammatory bark extract for fever and pain",
      "Antibacterial properties in birch bark",
      "Traditional remedy for skin disorders and wounds",
      "Essential oil from bark used in Ayurvedic formulations",
    ],
    significance:
      "Before paper existed, Bhojpatra was the sacred writing material of the ancient world. The great Vedic commentaries, tantric texts, and astronomical treatises were preserved on Bhojpatra for thousands of years. A kavach written on Bhojpatra with Gorochan ink is considered the most powerful protective amulet.",
    availability: "Moderate",
    description:
      "The thin, papery bark of the Himalayan Birch tree — peeling naturally in translucent white sheets — served as India's primary sacred writing material for millennia. Ancient texts discovered in cave monasteries of Ladakh and Nepal were written on Bhojpatra, preserving wisdom across centuries.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "ekakshi-naariyal",
    nameHindi: "एकाक्षी नारियल",
    nameSanskrit: "Ekākṣi Nārikela",
    nameEnglish: "One-Eyed Coconut",
    nameBotanical: "Cocos nucifera (single-eye variant)",
    pujaUses: [
      "Extremely rare coconut with single eye — considered supremely auspicious",
      "Offered to Lord Shiva and placed at Shivalinga for Rudra blessings",
      "Used in Lakshmi puja for extraordinary wealth and prosperity",
      "Kept as a sacred object in puja room for continuous blessings",
    ],
    havanUses: [
      "Offered in Lakshmi and Kubera havan for extraordinary wealth",
      "Used in special Rudra yajna for granting divine boons",
      "Ekakshi Naariyal placed near havan kund as a sacred witness",
    ],
    healingUses: [
      "Coconut water has electrolytic and hydrating properties",
      "Coconut oil — antimicrobial and excellent for skin and hair health",
      "Coconut flesh provides medium-chain triglycerides for brain health",
    ],
    significance:
      "The Ekakshi Naariyal (single-eye coconut) is considered one of the rarest gifts in nature. Found extremely rarely — perhaps one in thousands of coconuts — it represents the singular, all-seeing eye of Lord Shiva (Trinetra). Possessing one is considered like having a divine blessing enshrined in natural form.",
    availability: "Rare",
    description:
      "A naturally occurring rare variant of coconut with only one 'eye' instead of the usual three, the Ekakshi Naariyal is treasured as a sacred curiosity of nature. Temples and collectors prize it for its extreme rarity and the belief that it contains concentrated divine energy.",
    uses: ["puja", "havan", "spiritual"],
  },
  {
    id: "shami-patra",
    nameHindi: "शमी पत्र",
    nameSanskrit: "Śamī Patra",
    nameEnglish: "Shami Tree Leaf",
    nameBotanical: "Prosopis spicigera / Prosopis cineraria",
    pujaUses: [
      "Most sacred offering for Lord Shiva and Saturn (Shani) on Saturdays",
      "Exchanged between people on Dussehra (Vijaya Dashami) for victory",
      "The Pandavas hid their weapons in a Shami tree during incognito year",
      "Shami leaves offered to Shiva for removing Shani dosha",
      "Used in the Simolanghan ceremony on Dussehra",
    ],
    havanUses: [
      "Shami wood samidha used in Saturn (Shani) graha shanti havan",
      "Added to Rahu and Ketu dosha nivaran havan",
      "Used in Pitru (ancestors) yajna for ancestral peace",
    ],
    healingUses: [
      "Antibacterial bark used for tooth ailments in folk medicine",
      "Anti-inflammatory for skin conditions",
      "Pods and leaves used as fodder but also in Ayurvedic preparations",
    ],
    significance:
      "Shami tree represents victory, endurance, and the taming of obstacles. The famous Dussehra tradition of exchanging Shami leaves comes from the Mahabharata story of Arjuna retrieving his divine bow Gandiva hidden in a Shami tree before the Kurukshetra war. Its gold-colored leaves represent prosperity.",
    availability: "Common",
    description:
      "A drought-resistant sacred tree of the Indian plains, the Shami tree holds remarkable significance in both Shaiva and Kshatriya (warrior) traditions. On Vijayadashami, the act of gifting Shami leaves represents gifting the blessings of victory and success.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "aparajita",
    nameHindi: "अपराजिता",
    nameSanskrit: "Aparājitā",
    nameEnglish: "Butterfly Pea",
    nameBotanical: "Clitoria ternatea",
    pujaUses: [
      "Offered to Goddess Durga and Aparajita Devi (an aspect of Devi) on Navami",
      "Blue flowers offered to Lord Shiva and Lord Vishnu",
      "Used in Dussehra (Vijaya Dashami) puja for Aparajita Devi worship",
      "Aparajita puja performed on the 10th day of Navratri for victory",
    ],
    havanUses: [
      "Added to Devi havan for invoking the unconquerable aspect of the goddess",
      "Used in victory havan (Vijaya yajna) before battle or legal cases",
      "Included in Jupiter (Brihaspati) havan for favor and success",
    ],
    healingUses: [
      "Natural blue food dye from flowers — safe and vibrant",
      "Cognitive enhancer — butterfly pea extract improves memory in studies",
      "Anti-anxiety and anti-depressant properties",
      "Anti-inflammatory for fever and skin disorders",
      "Anthocyanin antioxidants protect against cellular aging",
    ],
    significance:
      "Aparajita means 'the unconquerable one' — the flower is dedicated to the aspect of Devi who cannot be defeated. Worshipping Aparajita with these flowers is said to make the devotee similarly invincible. The brilliant blue color represents the sky and divine sovereignty.",
    availability: "Common",
    description:
      "The stunning butterfly-blue flowers of Aparajita have made it a beloved garden plant and ritual herb across India. The same Clitoria ternatea that Hindu priests offer to Devi is now trending globally as a magical color-changing butterfly pea tea.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "juhi",
    nameHindi: "जूही",
    nameSanskrit: "Jūhī",
    nameEnglish: "Jasmine (Indian)",
    nameBotanical: "Jasminum auriculatum",
    pujaUses: [
      "Offered to Lord Shiva on Mondays — Juhi is among his beloved flowers",
      "Used in Shiva puja garlands and decoration",
      "Offered to Goddess Parvati in her aspect as the loving consort of Shiva",
      "Used in abhishek water infused with jasmine for fragrance",
    ],
    havanUses: [
      "Added to havan samagri for fragrance and Venus (Shukra) pacification",
      "Used in love and marriage havan preparations",
      "Included in Shiva yajna as a fragrant offering",
    ],
    healingUses: [
      "Aromatherapy for stress relief, anxiety, and depression",
      "Anti-inflammatory and analgesic properties",
      "Used for skin care — jasmine oil lightens skin and reduces scars",
      "Galactagogue — promotes breast milk in nursing mothers",
    ],
    significance:
      "Juhi is the flower form of devotion to Shiva — its simple five-petaled white flowers represent purity of heart. The marriage of fragrance and simplicity in Juhi mirrors the ideal devotee: pure, unadorned, completely surrendered to the divine.",
    availability: "Common",
    description:
      "One of India's beloved native jasmines, Juhi's small white blooms pack an outsized fragrance. Found in gardens near temples and threaded into garlands for deity worship, it carries the quintessential floral scent of Indian devotional spaces.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "chameli",
    nameHindi: "चमेली",
    nameSanskrit: "Chameli",
    nameEnglish: "Common Jasmine",
    nameBotanical: "Jasminum officinale",
    pujaUses: [
      "Chameli garlands offered to Lord Vishnu, Krishna, and Ram",
      "Chameli ka Tel (jasmine oil) offered to Lord Hanuman on Tuesdays and Saturdays",
      "Chameli flowers used in Lakshmi puja garlands for prosperity",
      "Offered to deities during special vratas (fasting days)",
    ],
    havanUses: [
      "Chameli flowers added to havan samagri for Venus (Shukra) harmony",
      "Used in love havan and marriage-related yajnas",
      "Added to Lakshmi yajna for fragrant, auspicious energy",
    ],
    healingUses: [
      "Chameli oil used for massage — relaxes muscles and relieves stress",
      "Anti-depressant aromatherapy — jasmine scent triggers serotonin release",
      "Antiseptic for skin wounds when diluted",
      "Promotes hair growth and scalp health as hair oil",
    ],
    significance:
      "Chameli is associated with purity and divine love. Offering Chameli to Hanuman is a unique tradition — Lord Hanuman, despite his divine ascetic nature, is said to be pleased by fragrant flowers offered with devotion. Chameli ka Tel applied to Hanuman's idol is a deeply beloved practice across North India.",
    availability: "Common",
    description:
      "The classic white jasmine familiar from perfumeries and Indian temples alike, Chameli is one of the most culturally significant flowers in Indian devotional tradition. Its heavenly fragrance and delicate five-petaled flowers make it a fitting offering to both the gentle and the fierce divine.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "mogra",
    nameHindi: "मोगरा",
    nameSanskrit: "Mallika",
    nameEnglish: "Arabian Jasmine / Garland Jasmine",
    nameBotanical: "Jasminum sambac",
    pujaUses: [
      "Used in Krishna puja garlands and Vrindavan temple worship",
      "Mogra flowers placed in deities' hair in iconography",
      "Offered to Goddess Saraswati and Lakshmi in seasonal worship",
      "Used in Ganesh puja and worn in women's hair during festivals",
    ],
    havanUses: [
      "Added to havan samagri for Moon (Chandra) pacification",
      "Used in love and romance-related yajnas for sweetness",
      "Mogra garlands offered in Satyanarayan havan prasad",
    ],
    healingUses: [
      "Relaxant and antidepressant through aromatherapy",
      "Used for headache and migraine when applied as oil to temples",
      "Anti-inflammatory flower water for skin care",
      "Promotes emotional balance and positive mood",
    ],
    significance:
      "Mallika is described in Sanskrit literature as the flower of Kama (divine love) — worn in the hair of celestial apsaras and beloved by Krishna in Vrindavan. Its intoxicating fragrance is said to attract divine presences and was used in ancient India to perfume royal chambers and temple sanctuaries.",
    availability: "Common",
    description:
      "Perhaps the most beloved jasmine in South Asian culture, Mogra's plump, waxy white flowers are threaded into gajras (hair ornaments), used in wedding decorations, and strewn at the feet of deities across India. Its warm, floral fragrance has come to represent the entire sensory world of Indian devotion.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "kevda",
    nameHindi: "केवड़ा",
    nameSanskrit: "Ketakī",
    nameEnglish: "Screwpine",
    nameBotanical: "Pandanus fascicularis",
    pujaUses: [
      "Notable for being the ONLY flower NOT offered to Lord Shiva — cursed by Shiva for bearing false witness",
      "Offered to Lord Vishnu and is acceptable in Vishnu puja",
      "Used in special summer worship for refreshing fragrance",
      "Kevda water used in Vishnu abhishek preparations",
    ],
    havanUses: [
      "Not used in Shiva-related havans due to the divine curse",
      "Used in Vishnu and Lakshmi havans as aromatic offering",
      "Added to fragrant havan preparations for Saraswati yajna",
    ],
    healingUses: [
      "Anti-inflammatory — kevda leaf extract for headaches and rheumatic pain",
      "Antiseptic properties for skin infections",
      "Cooling properties used in summer preparations",
      "Used in Ayurveda for urinary complaints",
    ],
    significance:
      "Ketaki's story is told in the Shiva Purana — when Brahma and Vishnu contested supremacy, a cosmic Shivalinga appeared. Brahma falsely claimed a Ketaki flower confirmed he had found the top. Shiva's curse on Ketaki has made it the only flower excluded from Shiva worship — a lesson in the consequence of falsehood.",
    availability: "Moderate",
    description:
      "The Screwpine's intensely fragrant cream-colored flowers carry both spiritual significance and historical irony — prized everywhere except in Shiva temples. Its sweet, exotic fragrance made it one of classical India's most valuable aromatic plants for perfumery and ritual.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "palash",
    nameHindi: "पलाश",
    nameSanskrit: "Palāśa",
    nameEnglish: "Flame of the Forest / Butea",
    nameBotanical: "Butea monosperma",
    pujaUses: [
      "Palash flowers used in Holi — red-orange flowers were the original Holi color",
      "Offered to Brahma, Vishnu, and Agni (fire god) as sacred flowers",
      "Used in Saraswati puja and Brahma puja as sacred offerings",
      "Palash samidha (wood) used in Brahmacharya (celibacy) rituals",
    ],
    havanUses: [
      "Palash wood samidha used in Gayatri yajna and Vedic fire rituals",
      "One of the principal nine samidhas in Navgraha havan",
      "Used in Brahma yajna and Vedic student initiation (Upanayana)",
      "Palash represents Brahma among the sacred trees",
    ],
    healingUses: [
      "Palash seeds used as anti-parasitic (roundworm and tapeworm)",
      "Flowers used for eye disorders and night blindness",
      "Bark used as tanning agent and for skin conditions",
      "Anti-inflammatory and diuretic properties of seed preparations",
    ],
    significance:
      "Palash is considered the tree of Brahma and is associated with the sacred Gayatri mantra. The sacred thread of Brahmacharins (students) was traditionally made from Palash fiber. In spring, the tree burns vivid orange-red without leaves — earning its name 'Flame of the Forest' — a symbol of divine fire.",
    availability: "Common",
    description:
      "One of India's most visually spectacular trees, Palash sets entire hillsides ablaze with clusters of brilliant orange-red flowers each spring. This divine fire symbolism made it central to Vedic fire worship traditions, and its wood remains among the most sacred samidhas in yajna.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "peepal-patra",
    nameHindi: "पीपल पत्र",
    nameSanskrit: "Ashvattha Patra",
    nameEnglish: "Sacred Fig / Bodhi Tree Leaf",
    nameBotanical: "Ficus religiosa",
    pujaUses: [
      "Peepal puja on Saturdays for appeasing Saturn (Shani) and ancestors",
      "108 Pradakshina (circumambulation) of Peepal tree on Saturdays",
      "Leaves offered to Lord Vishnu — Peepal is called Ashvattha, Vishnu's tree",
      "Peepal leaves used in water vessel (kalash) during all major havans",
    ],
    havanUses: [
      "Ashvattha samidha used in Saturn (Shani) and Rahu havan",
      "Used in Pitru (ancestors) havan for ancestral blessings",
      "Peepal wood used in special long-life (Ayushya) yajna",
    ],
    healingUses: [
      "Bark used for diabetes, skin disorders, and diarrhea in Ayurveda",
      "Leaves used as natural bandage for wounds in folk medicine",
      "Air purifier — Peepal releases oxygen 24 hours (unique among trees)",
      "Anti-inflammatory bark preparation for arthritis",
    ],
    significance:
      "The Ashvattha (Peepal) is the most sacred tree in India — under it, the Buddha attained enlightenment. In the Bhagavad Gita (10:26), Krishna says 'Among trees, I am the Ashvattha.' It is believed that all 33 crore devas reside in the Peepal tree, and worshipping it on Saturdays is believed to relieve all suffering.",
    availability: "Common",
    description:
      "The Peepal tree is among the world's longest-lived trees and the most spiritually significant in both Hinduism and Buddhism. The Bodhi Tree under which Siddhartha Gautama became the Buddha is a Peepal. Every village in India has a sacred Peepal, around which community life and ritual has revolved for millennia.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "mango-patra",
    nameHindi: "आम पत्र",
    nameSanskrit: "Āmra Patra",
    nameEnglish: "Mango Leaf",
    nameBotanical: "Mangifera indica",
    pujaUses: [
      "Mango leaf garlands hung at entrance during auspicious occasions",
      "Used in Kalash (sacred vessel) as five-leaf covering",
      "Essential in all major pujas and havan preparations",
      "Mango leaves used in Vivaha (wedding) decorations and torana (threshold) decoration",
    ],
    havanUses: [
      "Mango wood (aam ki lakdi) is the primary and most auspicious samidha for all havans",
      "Most widely used firewood in Vedic havan rituals — considered pure and auspicious",
      "Used in Navgraha havan, Griha Pravesh havan, and all domestic ceremonies",
    ],
    healingUses: [
      "Mango leaf tea regulates blood sugar and supports diabetes management",
      "Anti-inflammatory properties for respiratory conditions",
      "Rich in Vitamin C, A, and antioxidants",
      "Tannins in leaves used for diarrhea and dysentery",
    ],
    significance:
      "The mango tree is India's national tree and the tree of divine auspiciousness. Its leaves at entrance doorways signal prosperity and welcome divine blessings. Among all woods, Aam ki Lakdi (mango wood) is considered the purest and most appropriate samidha for Vedic fire rituals.",
    availability: "Common",
    description:
      "The mango — 'King of Fruits' — grants its leaves as equally noble gifts for ritual use. No festival or ceremony in India is complete without mango leaf garlands adorning doorways. From Kashi to Kanyakumari, mango leaves signal that something sacred is taking place.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "lotus",
    nameHindi: "कमल पुष्प",
    nameSanskrit: "Kamala / Padma",
    nameEnglish: "Sacred Lotus",
    nameBotanical: "Nelumbo nucifera",
    pujaUses: [
      "Most sacred flower in Hinduism — primary seat (asana) of Lakshmi, Brahma, Saraswati",
      "Offered in Lakshmi puja and Diwali worship for wealth and prosperity",
      "Kamala Archana — offering 108 lotus flowers to Devi in Navratri",
      "Used in Vishnu puja — Lord Vishnu holds a lotus",
      "Pink lotus placed at feet of Lakshmi, white lotus at Saraswati's feet",
    ],
    havanUses: [
      "Lotus petals added to Lakshmi havan for prosperity",
      "Used in Sri Yantra puja havan as primary offering",
      "Added to Surya (Sun) havan — lotus is the solar flower",
      "Lotus seeds (Makhana) used as havan offering for Venus (Shukra)",
    ],
    healingUses: [
      "Lotus seeds (Makhana) — high protein, antioxidant, and anti-aging",
      "Lotus root is nutritious with digestive benefits",
      "Lotus leaf extract anti-obesity and blood sugar regulating",
      "Anti-anxiety properties — lotus flower extract calms the nervous system",
    ],
    significance:
      "The Lotus is the ultimate symbol of spiritual evolution — rooted in mud yet blooming immaculate above water. It represents the soul's journey from material existence to spiritual liberation. India's national flower, it is the most frequently depicted sacred object in all of Hindu iconography.",
    availability: "Common",
    description:
      "Rising pure and perfect from muddy waters, the Lotus embodies the possibility of complete spiritual beauty emerging from any circumstances of life. From the lotus throne of Brahma to the lotus feet of Vishnu, this flower permeates every layer of Hindu cosmology and symbolism.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "marigold",
    nameHindi: "गेंदा",
    nameSanskrit: "Sthalapushpa",
    nameEnglish: "Marigold",
    nameBotanical: "Tagetes erecta",
    pujaUses: [
      "Most widely used flower in Hindu puja — garlands used in virtually all ceremonies",
      "Used in all Navratri, Diwali, Dussehra, and festive decorations",
      "Marigold garlands offered to all principal deities across Hindu traditions",
      "Used in wedding mandap decorations and prasad offerings",
    ],
    havanUses: [
      "Added to Navgraha havan for general auspiciousness",
      "Used in Griha Pravesh havan as fragrant offering",
      "Marigold petals added to all festive havan samagri",
    ],
    healingUses: [
      "Powerful anti-inflammatory and wound-healing — calendula species used globally",
      "Antifungal and antibacterial for skin conditions, eczema, and infections",
      "Lutein-rich — supports eye health and protects against macular degeneration",
      "Anti-parasitic and digestive support in Ayurvedic formulations",
    ],
    significance:
      "Genda Phool — marigold — is the most democratic of all sacred flowers: affordable, aromatic, and available everywhere. Its brilliant orange and yellow colors represent the solar energy of devotion. The string of marigolds at any door or temple instantly signals divine welcome and auspicious activity.",
    availability: "Common",
    description:
      "The humble marigold punches far above its weight in the hierarchy of sacred flowers. No puja pandal, temple entrance, or wedding mandap in India is complete without cascades of orange and golden marigold garlands. Its vibrant color, strong fragrance, and long-lasting freshness make it the working flower of Hindu worship.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "hibiscus",
    nameHindi: "गुड़हल",
    nameSanskrit: "Japā",
    nameEnglish: "Chinese Hibiscus / Shoe Flower",
    nameBotanical: "Hibiscus rosa-sinensis",
    pujaUses: [
      "Most sacred flower for Goddess Kali, Durga, and Chamunda — red hibiscus offered",
      "Used in Shakti puja and Kali puja as primary offering",
      "Hibiscus Archana — offering 108 Japa flowers to Kali",
      "Red hibiscus used in Tantric rituals for fierce goddess invocation",
    ],
    havanUses: [
      "Added to Kali and Shakti havan as primary flower offering",
      "Used in Mars (Mangal) graha havan for strength and victory",
      "Red hibiscus included in Navratri havan preparations for Durga",
    ],
    healingUses: [
      "Hibiscus tea — powerfully lowers blood pressure (proven in clinical trials)",
      "Anti-cholesterol and anti-obesity properties",
      "Rich in Vitamin C and anthocyanins — strong antioxidant",
      "Promotes hair growth and reduces hair fall (hibiscus hair oil)",
      "Liver protective and detoxifying",
    ],
    significance:
      "Called 'Japa' in Sanskrit — suggesting its repeated offering to the goddess parallels the repetition of mantra. The blood-red hibiscus is the most direct visual representation of Shakti — the fierce, primal, life-giving feminine divine. Offering Gudhal to Kali is one of the most profound acts of Tantric devotion.",
    availability: "Common",
    description:
      "The large, vivid red flowers of Hibiscus are among the most instantly recognizable sacred objects in Hindu worship. Growing abundantly across tropical and subtropical India, Gudhal is always freshly available for the daily Kali puja that is so central to Bengali, South Indian, and Tantric Hindu traditions.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "ashoka-patra",
    nameHindi: "अशोक पत्र",
    nameSanskrit: "Ashoka Patra",
    nameEnglish: "Ashoka Tree Leaf",
    nameBotanical: "Saraca indica / Saraca asoca",
    pujaUses: [
      "Offered to Lord Kama (god of love) and Venus (Shukra) for romance",
      "Used in Ashoka Shasthi puja on the sixth day after Holi",
      "Ashoka garlands used in Rama Navami and Sita puja",
      "Placed in new home decorations for happiness and elimination of grief",
    ],
    havanUses: [
      "Added to Venus (Shukra) havan for love, beauty, and romance",
      "Used in women's health havan preparations",
      "Included in Griha Pravesh havan for domestic harmony",
    ],
    healingUses: [
      "Premier Ayurvedic herb for women's gynecological health",
      "Regulates menstrual cycle and treats dysmenorrhea (painful periods)",
      "Anti-hemorrhagic — stops excessive uterine bleeding",
      "Anti-inflammatory for uterine fibroids and endometriosis",
      "Key ingredient in Ashokarishta — classical Ayurvedic formulation for women",
    ],
    significance:
      "Ashoka means 'without grief' — it is the tree that eliminates sorrow. In the Ramayana, Sita was imprisoned in the Ashoka grove (Ashoka Vatika) in Lanka, and the tree's presence is said to have given her comfort. The Jain 24th Tirthankar Mahavir was born under an Ashoka tree.",
    availability: "Moderate",
    description:
      "The Ashoka tree, with its dense clusters of brilliant orange-red flowers, is one of India's most beautiful and spiritually resonant trees. Its profound association with grief-removal and women's health makes it a tree of comfort and healing — both physically and emotionally.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "audumber",
    nameHindi: "उदुम्बर",
    nameSanskrit: "Udumbara",
    nameEnglish: "Cluster Fig / Goolar",
    nameBotanical: "Ficus racemosa",
    pujaUses: [
      "Sacred tree of Dattatreya — the Udumbara tree is his divine abode",
      "Dattatreya puja performed under or near the Udumbara tree",
      "Used in ancestor (Pitru) puja and Shraddha rites",
      "Figs offered to Lord Vishnu and Indra as sacred fruit",
    ],
    havanUses: [
      "Audumber wood used as samidha in Dattatreya yajna",
      "Used in Pitru yajna for ancestral peace and liberation",
      "Added to Jupiter (Brihaspati) havan for spiritual wisdom",
    ],
    healingUses: [
      "Highly effective anti-diabetic — reduces blood glucose significantly",
      "Anti-diarrheal and digestive tonic in Ayurveda",
      "Rich in antioxidants and iron — treats anemia",
      "Used for skin disorders, hemorrhoids, and menstrual disorders",
      "Bark preparation used for fever and inflammation",
    ],
    significance:
      "The Udumbara tree is considered the physical manifestation of Lord Dattatreya (the Guru deity who is a combined form of Brahma, Vishnu, and Shiva). Its unique fruiting — without visible flowers, the fruit appearing directly on branches — symbolizes the mysterious nature of divine grace that manifests unexpectedly.",
    availability: "Common",
    description:
      "The Cluster Fig's unusual habit of bearing fruit directly on its trunk (without apparent flowers) has made it an object of wonder and sacred contemplation. In the Guru tradition, Dattatreya temples always feature an Udumbara tree, and visiting it on Datta Jayanti is considered a powerful spiritual act.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "banana-flower",
    nameHindi: "केले का फूल",
    nameSanskrit: "Kadali Pushpa",
    nameEnglish: "Banana Flower",
    nameBotanical: "Musa paradisiaca",
    pujaUses: [
      "Banana flower and leaves used in Satyanarayana puja as sacred offering",
      "Banana plants flank entrance of puja pandal at all major ceremonies",
      "Kadali (banana) described in Vedic texts as one of the sacred auspicious plants",
      "Banana leaf used as sacred dining plate for prasad in South Indian temples",
    ],
    havanUses: [
      "Banana flower offered in Satyanarayan havan as auspicious offering",
      "Dried banana included in prosperity havan samagri",
      "Used in Venus (Shukra) havan for abundance and sweetness",
    ],
    healingUses: [
      "Banana flower — regulates menstrual cycle and treats excessive bleeding",
      "Anti-diabetic and antioxidant properties",
      "Prebiotic fiber supports healthy gut bacteria",
      "Anti-ulcer properties for stomach disorders",
      "Rich in iron, potassium, and B6 vitamins",
    ],
    significance:
      "The banana plant is one of the most auspicious plants in Hindu tradition — its flower, leaf, fruit, and stem are all used in ritual. Pairing banana plants at the entrance of puja spaces signals divine welcome. The Kalpavriksha (wish-fulfilling tree) of mythology is sometimes identified with the banana.",
    availability: "Common",
    description:
      "From the fragrant purple flower to the broad emerald leaves used as sacred plates, every part of the banana plant serves ritual and nourishment. No South Indian puja mandap is complete without banana plants flanking the entrance, and no ceremonial meal is authentic without banana leaf as the plate.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "gangajal",
    nameHindi: "गंगाजल",
    nameSanskrit: "Gangā Jala",
    nameEnglish: "Sacred Ganges Water",
    nameBotanical: "Nadi (Sacred River)",
    pujaUses: [
      "Most sacred water in Hinduism — used in all pujas for purification",
      "Gangajal used in Panchamrit and abhishek of all deities",
      "Sprinkled on devotees at the end of puja for divine blessings",
      "Given to the dying for liberation of the soul",
      "Used in all samskara (rites of passage) rituals",
    ],
    havanUses: [
      "Mixed into havan offerings for all major yajnas",
      "Used to consecrate havan kund and ritual implements",
      "Added to Gangajal-infused water for sprinkling during purification rites",
    ],
    healingUses: [
      "Gangajal contains unique bacteriophage compounds preventing microbial growth",
      "Trace minerals from Himalayan glaciers and medicinal herbs",
      "Scientific studies confirm self-purifying properties unlike any other river water",
      "Traditionally consumed for intestinal purification and immune strengthening",
    ],
    significance:
      "The Ganga is not merely a river in Hinduism — it is the liquid form of Goddess Ganga who descended from heaven through Shiva's matted hair to purify the sins of the Sagara kings' ancestors. Every drop of Gangajal is considered to carry infinite purifying and liberating power.",
    availability: "Moderate",
    description:
      "Gangajal transcends the category of 'herb' — it is sacred water, the most potent spiritual substance in Hinduism. Scientists have confirmed what devotees have known for millennia: Gangajal has remarkable self-purifying and antimicrobial properties that ordinary water does not possess.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "gau-mutra",
    nameHindi: "गौमूत्र",
    nameSanskrit: "Gomutra",
    nameEnglish: "Sacred Cow Urine",
    nameBotanical: "Bos taurus (Indian cow)",
    pujaUses: [
      "One of the Panchagavya substances — used in purification rituals",
      "Sprinkled during home purification and Griha Pravesh ceremonies",
      "Used in Gotra (lineage) rituals and sacred cow worship",
      "Essential in Vastu shanti puja for clearing negative energy",
    ],
    havanUses: [
      "Panchagavya (five cow products) used in major havan and yajna purifications",
      "Used in Gomedha yajna (cow-related havan) for purification",
      "Added to Vastu havan for cleansing property-related doshas",
    ],
    healingUses: [
      "Anti-bacterial and anti-fungal compounds proven in scientific studies",
      "Used in Ayurveda for liver disorders, diabetes, and skin diseases",
      "Gomutra Ark (distilled) used as vehicle for other Ayurvedic medicines",
      "Anti-cancer research shows inhibitory effects on cancer cell growth",
      "Immune-modulating properties studied at CSIR laboratories in India",
    ],
    significance:
      "Gomutra is one of the Panchagavya — the five sacred products of the cow (milk, yogurt, ghee, dung, urine) — considered collectively as the most purifying substances in Vedic tradition. The cow (Gau Mata) is considered divine, and all her products carry that divinity.",
    availability: "Moderate",
    description:
      "Part of the sacred Panchagavya tradition that elevates five cow products to ritual status, Gomutra (cow urine) from Indian breed cows holds a distinct position in both Vedic purification rituals and Ayurvedic medicine. Modern research has partially validated traditional claims of its antimicrobial properties.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "dharba-grass",
    nameHindi: "दर्भ घास",
    nameSanskrit: "Darbha",
    nameEnglish: "Darbha Grass / Kusha Grass",
    nameBotanical: "Desmostachya bipinnata",
    pujaUses: [
      "Darbha ring (Pavitri) worn by priest during all Vedic ceremonies",
      "Darbha asana used for sitting during Vedic rites — purifies the practitioner",
      "Used in Shraddha (ancestor rites) — Pitru tarpan performed with Darbha",
      "Darbha grass placed under sacred vessels during puja",
      "Worn in fingers during Navagraha and Rudrabhishek",
    ],
    havanUses: [
      "Foundation grass for havan kund — placed before lighting the fire",
      "Used in Vedic Somasrava yajna as the sacred seating material",
      "Essential in Pitru yajna for ancestral peace",
      "Darbha is the primary purification material for yajna preparation",
    ],
    healingUses: [
      "Kusha root used as a natural diuretic for kidney health",
      "Anti-inflammatory properties for urinary tract infections",
      "Astringent properties used for digestive complaints",
      "Used in fever preparations in traditional medicine",
    ],
    significance:
      "Darbha is essentially the same as Kusha — the sacred grass that forms the foundation of Vedic ritual life. No Vedic ceremony, from the simplest puja to the grandest Ashwamedha yajna, begins without placing Darbha/Kusha grass. It purifies the practitioner and creates a sacred boundary between the mundane and the divine.",
    availability: "Moderate",
    description:
      "Darbha and Kusha refer to the same or closely related species of sacred grass that has been inseparable from Vedic ritual for over 5,000 years. The Rigveda describes it as the purifier; the Bhagavad Gita describes it as the ideal meditation seat. Its role in Shraddha rites makes it particularly vital for ancestor-related ceremonies.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "roli",
    nameHindi: "रोली",
    nameSanskrit: "Raktacandana Tilaka",
    nameEnglish: "Sacred Red Tilak Powder",
    nameBotanical: "Curcuma longa + Slaked Lime (traditional preparation)",
    pujaUses: [
      "Applied as Tilak to deities before every puja for divine blessing",
      "Roli-Akshat (sacred rice) offering made to deities in all rituals",
      "Applied to the forehead of guests at welcoming ceremonies (tika ceremony)",
      "Used in Raksha Bandhan — sister applies Roli tilak to brother's forehead",
      "Essential in all Hindu Shodashopachara (16-step worship) as offering",
    ],
    havanUses: [
      "Mixed with rice (Akshat) for completing havan ahuti",
      "Applied to havan kund pot and ritual vessels before use",
      "Used in Navgraha havan as standard Tilak ingredient",
    ],
    healingUses: [
      "Turmeric base provides anti-inflammatory and antiseptic properties",
      "Applied at Ajna chakra (third eye point) for headache relief",
      "Traditional preparation activates marma points on the forehead",
      "Color therapy — red stimulates energy and vitality",
    ],
    significance:
      "Roli is the domestic sacred red powder used in daily worship across all Hindu homes. Unlike Kumkum which can be saffron-based, Roli is traditionally prepared from turmeric mixed with lime water, turning brilliant red. It represents Shakti's energy in every household puja.",
    availability: "Common",
    description:
      "The bright red powder in every Hindu puja thali, Roli is inseparable from daily worship. Applied to deities, offered with Akshat (rice), and used to mark auspicious moments, it is the most commonly used sacred substance in everyday Hindu religious life.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "harshringar",
    nameHindi: "हारश्रृंगार",
    nameSanskrit: "Parijāta",
    nameEnglish: "Night Jasmine / Coral Jasmine",
    nameBotanical: "Nyctanthes arbor-tristis",
    pujaUses: [
      "Most beloved flower of Lord Krishna — the Parijata tree was brought from heaven by Krishna",
      "Offered to Lord Vishnu and Krishna in Vaishnav worship",
      "Used in Satyanarayana puja and special Vishnu havans",
      "Flowers collected at dawn from the ground — they fall naturally at night as divine offering",
    ],
    havanUses: [
      "Parijata flowers added to Vishnu and Krishna yajna offerings",
      "Used in Venus (Shukra) havan for beauty and divine grace",
      "Added to Moon (Chandra) havan for emotional balance and lunar energy",
    ],
    healingUses: [
      "Leaves highly effective against malaria and intermittent fevers",
      "Anti-arthritic — reduces joint inflammation in Ayurvedic preparations",
      "Anti-diabetic properties in seed preparations",
      "Laxative and digestive tonic for chronic constipation",
      "Anti-anxiety and adaptogenic properties",
    ],
    significance:
      "The Parijata is the divine tree from Indra's paradise (Svarga). According to the Vishnu Purana, when Krishna brought the Parijata tree to earth for Satyabhama, it bloomed eternally and its flowers carpeted the ground every dawn as a divine offering. A home with a Parijata tree is considered blessed by Vishnu.",
    availability: "Common",
    description:
      "One of India's most enchanting small trees, the Night Jasmine drops its fragrant orange-stemmed white flowers each dawn like a natural morning offering. Walking under a blooming Parijata in the early morning, the ground covered in delicate flowers, is one of the most spiritually evocative experiences in nature.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "nagkesar",
    nameHindi: "नागकेसर",
    nameSanskrit: "Nāgakesara",
    nameEnglish: "Ceylon Ironwood / Cobra's Saffron",
    nameBotanical: "Mesua ferrea",
    pujaUses: [
      "Offered to Lord Vishnu and Lakshmi for prosperity and divine grace",
      "Nagkesar flowers used in Lakshmi puja garlands",
      "Sacred to Naga (serpent) deities — offered in Nag Panchami worship",
      "Used in Vishnu abhishek and Satyanarayan puja",
    ],
    havanUses: [
      "Added to Lakshmi and Vishnu havan for wealth attraction",
      "Used in Jupiter (Guru/Brihaspati) havan for wisdom and prosperity",
      "Nagkesar is one of the 10 divine flowers used in Dashapushpam (Kerala tradition)",
    ],
    healingUses: [
      "Anti-hemorrhagic — stops bleeding; used for piles and menorrhagia",
      "Anti-inflammatory for skin disorders and allergies",
      "Antimicrobial and used in Ayurveda for respiratory conditions",
      "Anti-vomiting and digestive settling properties",
      "Aromatic compounds have natural insecticidal properties",
    ],
    significance:
      "Nagkesar connects two powerful divine traditions — the Naga (serpent) deities of primal earth energy and the prosperity goddesses. Its name suggests the saffron of the serpent — a potent convergence of cosmic forces. In Kerala's Dashapushpam tradition, it is among the ten sacred flowers offered during Onam.",
    availability: "Moderate",
    description:
      "The beautiful cream-colored flowers of the Ceylon Ironwood carry an intoxicating fragrance and a complex spiritual lineage connecting serpent worship to Vaishnav tradition. One of the Dasapushpam (ten sacred flowers of Kerala), Nagkesar is prized in both temple worship and Ayurvedic medicine.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "kadamba",
    nameHindi: "कदम्ब",
    nameSanskrit: "Kadamba",
    nameEnglish: "Kadamba Tree / Burflower",
    nameBotanical: "Neolamarckia cadamba",
    pujaUses: [
      "Most sacred tree of Lord Krishna — he played his flute under the Kadamba in Vrindavan",
      "Used in Krishna puja and Radha-Krishna worship as primary offering",
      "Kadamba flowers offered in Janmashtami and Holi celebrations",
      "Krishna temples in Vrindavan maintain sacred Kadamba groves",
    ],
    havanUses: [
      "Kadamba wood used in yajna dedicated to Krishna and Vishnu",
      "Flowers added to Moon (Chandra) and Venus (Shukra) havan for love and devotion",
      "Used in Vasant Panchami and Holi havan preparations",
    ],
    healingUses: [
      "Anti-inflammatory bark preparation for fever and joint disorders",
      "Analgesic properties used for headache and toothache",
      "Antimicrobial for skin infections and wounds",
      "Bark used in Ayurveda for diabetes and blood sugar regulation",
    ],
    significance:
      "The Kadamba tree is the divine tree of love and divine play (Lila). Under its fragrant, round golden flowers, Lord Krishna is eternally young, playing his flute in Vrindavan. The Kadamba grove represents the perfected spiritual world where divine love between Krishna and the Gopis manifests.",
    availability: "Common",
    description:
      "The round, golden-orange flowers of the Kadamba tree drench the air of Vrindavan with their intoxicating fragrance. To this day, the sacred groves of Vrindavan, Nandagram, and Barsana preserve Kadamba trees as living relics of Krishna's divine childhood. Its unique round bloom is instantly recognizable in Krishna iconography.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "bakul",
    nameHindi: "बकुल",
    nameSanskrit: "Vakula",
    nameEnglish: "Spanish Cherry / Medlar",
    nameBotanical: "Mimusops elengi",
    pujaUses: [
      "Offered to Lord Vishnu and used in Vishnu temple worship",
      "Bakul flower garlands adorn deities in South Indian temples",
      "Used in Lakshmi puja for sweetness and prosperity",
      "One of the eight flowers in Ashtamatrka puja",
    ],
    havanUses: [
      "Used in Vishnu yajna and Lakshmi yajna for auspiciousness",
      "Bakul flowers added to Moon (Chandra) havan for emotional wellbeing",
      "Added to havan samagri for Venus (Shukra) pacification",
    ],
    healingUses: [
      "Bark and flowers used for dental health — natural antiseptic for gums",
      "Anti-inflammatory for oral conditions, toothache, and gum disease",
      "Astringent bark used in Ayurveda for diarrhea and dysentery",
      "Anti-parasitic properties for intestinal worms",
      "Flower essential oil has calming and anxiolytic effects",
    ],
    significance:
      "The Bakul tree is considered Vishnu's favorite tree and is found in the sacred groves of Vaishnav temples. Its tiny star-shaped flowers are remarkably fragrant and do not wither for days — symbolizing the enduring nature of divine devotion.",
    availability: "Common",
    description:
      "A medium-sized evergreen tree with lustrous dark leaves and star-shaped cream flowers, the Bakul tree fills Vishnu temple gardens with sweet fragrance. Its remarkable flowers stay fragrant even after falling — making them naturally self-offering. South Indian temples prize Bakul garlands for deity worship.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
  {
    id: "rose",
    nameHindi: "गुलाब",
    nameSanskrit: "Taruni / Satapatri",
    nameEnglish: "Rose",
    nameBotanical: "Rosa damascena / Rosa centifolia",
    pujaUses: [
      "Offered to Goddess Lakshmi — red roses represent her divine love energy",
      "Used in Saraswati puja and Radha-Krishna worship",
      "Rose water (Gulab Jal) used in abhishek and purification of ritual space",
      "Rose garlands offered to Sufi saints and in syncretic devotional traditions",
      "Used in Navratri as fresh floral offering to Devi forms",
    ],
    havanUses: [
      "Rose petals added to Venus (Shukra) havan for love and beauty",
      "Used in Moon (Chandra) havan for emotional harmony",
      "Added to all fragrant havan preparations for divine aroma",
      "Rose flower offerings included in Lakshmi and Saraswati yajna",
    ],
    healingUses: [
      "Rose water — powerful astringent and anti-inflammatory for skin and eyes",
      "Rose hip tea rich in Vitamin C — immune boosting and anti-aging",
      "Anti-anxiety and mood-elevating aromatherapy",
      "Anti-bacterial and antiseptic for minor wounds and skin infections",
      "Rose petal jam (Gulkand) — cooling digestive tonic for summer heat",
    ],
    significance:
      "Rose is the universal flower of divine love across all spiritual traditions. In India, the Gulkand (rose petal preserve) and Gulab Jal (rose water) are as much ritual substances as culinary ones. Rose represents the heart chakra (Anahata) and the highest form of love — divine and unconditional.",
    availability: "Common",
    description:
      "Brought to India by Mughal emperors and quickly absorbed into Hindu devotional life, the Rose now occupies a central position in Indian temple worship. From the garlands of rose flowers at Dargahs to the rose water sprinkled by temple priests, this flower has become thoroughly sacred in the Indian spiritual context.",
    uses: ["puja", "havan", "healing", "spiritual"],
  },
];

// ─── Filter helpers ────────────────────────────────────────────────────────────

export type HerbUseFilter = "all" | "puja" | "havan" | "healing" | "spiritual";
export type AvailabilityFilter = "all" | "Common" | "Moderate" | "Rare";

export function filterHerbs(
  herbs: Herb[],
  useFilter: HerbUseFilter,
  availability: AvailabilityFilter,
  searchQuery: string,
): Herb[] {
  return herbs.filter((herb) => {
    const matchesUse = useFilter === "all" || herb.uses.includes(useFilter);
    const matchesAvailability =
      availability === "all" || herb.availability === availability;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      herb.nameHindi.includes(query) ||
      herb.nameSanskrit.toLowerCase().includes(query) ||
      herb.nameEnglish.toLowerCase().includes(query) ||
      herb.nameBotanical.toLowerCase().includes(query) ||
      herb.description.toLowerCase().includes(query) ||
      herb.significance.toLowerCase().includes(query);
    return matchesUse && matchesAvailability && matchesSearch;
  });
}

export const HERB_USE_LABELS: Record<HerbUseFilter, string> = {
  all: "All Uses",
  puja: "Puja",
  havan: "Havan / Yajna",
  healing: "Healing / Ayurveda",
  spiritual: "Spiritual",
};

export const AVAILABILITY_LABELS: Record<AvailabilityFilter, string> = {
  all: "All Availability",
  Common: "Common",
  Moderate: "Moderate",
  Rare: "Rare",
};
