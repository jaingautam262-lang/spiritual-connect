export type MehndiStyle =
  | "Bridal"
  | "Festival"
  | "Arabic"
  | "Rajasthani"
  | "Moroccan"
  | "Simple";
export type MehndiComplexity = "Easy" | "Medium" | "Complex";

export interface MehndiDesign {
  id: string;
  name: string;
  nameHindi: string;
  style: MehndiStyle;
  occasion: string;
  complexity: MehndiComplexity;
  description: string;
  tips: string[];
  elements: string[];
  emoji: string;
  timeRequired: string;
}

export const MEHNDI_DESIGNS: MehndiDesign[] = [
  // ── Bridal ────────────────────────────────────────────────────────────────
  {
    id: "b001",
    name: "Full Hand Bridal Mehndi",
    nameHindi: "पूर्ण हस्त दुल्हन मेहंदी",
    style: "Bridal",
    occasion: "Wedding",
    complexity: "Complex",
    description:
      "Traditional full-hand bridal design covering fingers to elbow with intricate paisley motifs, peacock patterns, and the hidden groom's name. Features dense floral latticework with a central mandala.",
    tips: [
      "Apply a day before the wedding for deep dark color",
      "Add lemon juice and sugar to the paste for richer staining",
      "Wrap with tissue paper overnight to retain heat",
      "Avoid washing with soap for the first 12 hours",
    ],
    elements: ["Peacock", "Paisley", "Mandala", "Lotus", "Hidden groom's name"],
    emoji: "👰",
    timeRequired: "4–6 hours",
  },
  {
    id: "b002",
    name: "Rajput Bridal Mehndi",
    nameHindi: "राजपूत दुल्हन मेहंदी",
    style: "Bridal",
    occasion: "Wedding",
    complexity: "Complex",
    description:
      "Inspired by royal Rajput traditions with bold geometric patterns, elephant processions, and intricate dot work. Features the seven-step Saat Phere depicted in a circular narrative design.",
    tips: [
      "Use dark organic henna powder from Rajasthan for best color",
      "Allow 8–10 hours for full staining on hands",
      "Keep skin dry and oil-free before application",
      "Scrape off dried mehndi; never wash it off initially",
    ],
    elements: [
      "Elephants",
      "Geometric borders",
      "Dot work",
      "Seven Pheras",
      "Peacocks",
    ],
    emoji: "🐘",
    timeRequired: "5–7 hours",
  },
  {
    id: "b003",
    name: "South Indian Bridal Mehndi",
    nameHindi: "दक्षिण भारतीय दुल्हन मेहंदी",
    style: "Bridal",
    occasion: "Wedding",
    complexity: "Complex",
    description:
      "Lighter tone design with bold outlines typical of Karnataka, Tamil, and Kerala styles. Features temple motifs, Kolam-inspired geometric patterns, and Goddess Lakshmi depiction.",
    tips: [
      "South Indian style uses thicker paste with bold strokes",
      "Focus on distinctive temple-architecture border patterns",
      "Lemon-sugar sealant keeps design intact longer",
      "Add eucalyptus oil for darker staining",
    ],
    elements: [
      "Temple motifs",
      "Kolam patterns",
      "Goddess Lakshmi",
      "Mango (keri)",
    ],
    emoji: "🏛️",
    timeRequired: "3–5 hours",
  },
  {
    id: "b004",
    name: "Mughal Bridal Mehndi",
    nameHindi: "मुगल दुल्हन मेहंदी",
    style: "Bridal",
    occasion: "Wedding",
    complexity: "Complex",
    description:
      "Exquisite Mughal-style design featuring intricate floral jhaali (latticework), roses, irises, and delicate leafy vines. The fine detailed work mimics Mughal miniature painting style.",
    tips: [
      "Requires fine-nib cone for intricate detailing",
      "Practice jhaali (net pattern) separately before the full design",
      "Use rose water to keep the applied design moist",
      "Best done in cooler temperatures for precision",
    ],
    elements: [
      "Floral jhaali",
      "Roses",
      "Irises",
      "Vines",
      "Mughal arch motifs",
    ],
    emoji: "🌹",
    timeRequired: "5–8 hours",
  },
  {
    id: "b005",
    name: "Contemporary Fusion Bridal",
    nameHindi: "समकालीन संयुक्त दुल्हन मेहंदी",
    style: "Bridal",
    occasion: "Wedding",
    complexity: "Complex",
    description:
      "Modern bridal mehndi blending traditional Indian motifs with contemporary minimalist elements. Features negative space artistry, watercolor-style floral spreads, and glitter accents.",
    tips: [
      "Mix traditional and modern elements for best effect",
      "Leave intentional negative space for contemporary look",
      "Add gold glitter after the mehndi dries",
      "Use white mehndi paste for highlights",
    ],
    elements: [
      "Negative space art",
      "Minimalist florals",
      "Glitter accents",
      "Portrait silhouettes",
    ],
    emoji: "✨",
    timeRequired: "3–5 hours",
  },

  // ── Festival ──────────────────────────────────────────────────────────────
  {
    id: "f001",
    name: "Karva Chauth Mehndi",
    nameHindi: "करवा चौथ मेहंदी",
    style: "Festival",
    occasion: "Karva Chauth",
    complexity: "Medium",
    description:
      "Traditional design for Karva Chauth featuring moon motifs, karva (clay pot) patterns, and a husband-wife silhouette surrounded by flowers and stars.",
    tips: [
      "Apply the night before for richer color on Karva Chauth day",
      "Moon motifs are traditionally placed on the center of palm",
      "Add husband's initials hidden in the design",
      "Keep design on back of hands for easier daily wear",
    ],
    elements: [
      "Moon (Chandra)",
      "Karva pot",
      "Stars",
      "Couple silhouette",
      "Lotus",
    ],
    emoji: "🌙",
    timeRequired: "1–2 hours",
  },
  {
    id: "f002",
    name: "Teej Festival Mehndi",
    nameHindi: "तीज मेहंदी",
    style: "Festival",
    occasion: "Hartalika Teej",
    complexity: "Medium",
    description:
      "Vibrant Rajasthani-style design for Teej festival featuring peacocks, swings (jhula), and marigold flowers. Traditionally worn by married women praying for husband's long life.",
    tips: [
      "Green mehndi mixed with camphor gives more fragrance",
      "Peacock facing right is traditionally auspicious",
      "Swing motif (jhula) represents Teej's festive spirit",
      "Apply on both hands and feet for complete look",
    ],
    elements: [
      "Peacock",
      "Swing (Jhula)",
      "Marigold",
      "Paisley",
      "Leaf borders",
    ],
    emoji: "🦚",
    timeRequired: "1.5–2.5 hours",
  },
  {
    id: "f003",
    name: "Navratri Mehndi",
    nameHindi: "नवरात्रि मेहंदी",
    style: "Festival",
    occasion: "Navratri",
    complexity: "Easy",
    description:
      "Celebratory Navratri design featuring Goddess Durga with lion mount, dandiya sticks, and garba motifs. Light and festive for the nine nights of celebration.",
    tips: [
      "Quick-drying designs work best for Navratri dancing",
      "Back-of-hand designs stay intact during dandiya",
      "Use darker paste for night events",
      "Avoid designs on fingertips that can smear during garba",
    ],
    elements: [
      "Dandiya sticks",
      "Garba pot",
      "Goddess silhouette",
      "Kalash",
      "Marigold",
    ],
    emoji: "🏺",
    timeRequired: "45–90 minutes",
  },
  {
    id: "f004",
    name: "Diwali Mehndi",
    nameHindi: "दीवाली मेहंदी",
    style: "Festival",
    occasion: "Diwali",
    complexity: "Medium",
    description:
      "Festive Diwali design featuring diyas (oil lamps), Goddess Lakshmi footprints, lotus flowers, and firework burst patterns. Perfect for the festival of lights.",
    tips: [
      "Diya motifs on fingertips look stunning",
      "Lakshmi footprints traditionally go from doorstep to puja room — miniaturize for mehndi",
      "Gold glitter applied after drying enhances the festive look",
      "Simple floral borders frame the main diya design beautifully",
    ],
    elements: [
      "Diya lamps",
      "Lotus",
      "Lakshmi footprints",
      "Firework burst",
      "Coin motifs",
    ],
    emoji: "🪔",
    timeRequired: "1–2 hours",
  },
  {
    id: "f005",
    name: "Ganesh Chaturthi Mehndi",
    nameHindi: "गणेश चतुर्थी मेहंदी",
    style: "Festival",
    occasion: "Ganesh Chaturthi",
    complexity: "Medium",
    description:
      "Design celebrating Lord Ganesha with trunk-right Ganesha motif, modak sweets, and geometric Swastika patterns surrounded by lotus and bell designs.",
    tips: [
      "Ganesha with trunk facing right is considered most auspicious",
      "Modak (sweet dumpling) is Ganesha's favorite offering — include it",
      "Create a central portrait of Ganesha on palm for impact",
      "Geometric patterns around the main motif provide structure",
    ],
    elements: ["Ganesha figure", "Modak", "Lotus", "Trishul", "Swastika"],
    emoji: "🐘",
    timeRequired: "1.5–2 hours",
  },

  // ── Arabic ────────────────────────────────────────────────────────────────
  {
    id: "a001",
    name: "Classic Arabic Floral",
    nameHindi: "क्लासिक अरबी पुष्प मेहंदी",
    style: "Arabic",
    occasion: "Any Occasion",
    complexity: "Medium",
    description:
      "Flowing Arabic-style mehndi with bold roses, leaves, and vines that flow naturally across the hand without touching, allowing skin to show between elements. Light, airy, and elegant.",
    tips: [
      "Arabic style deliberately leaves skin showing — do not fill all space",
      "Work from fingertips downward for natural flow",
      "Bold, thick lines are signature of Arabic style",
      "Use smooth, fluid strokes for best results",
    ],
    elements: ["Bold roses", "Vines", "Leaves", "Tulip accents", "Open spaces"],
    emoji: "🌺",
    timeRequired: "30–60 minutes",
  },
  {
    id: "a002",
    name: "Arabic Peacock Design",
    nameHindi: "अरबी मोर मेहंदी",
    style: "Arabic",
    occasion: "Party / Celebration",
    complexity: "Medium",
    description:
      "A bold Arabic design centered on a dramatic peacock with flowing tail feathers, complemented by large open roses and geometric accents in the Arabic tradition.",
    tips: [
      "Sketch peacock body first, then extend feathers naturally",
      "Keep the design on back of hand for maximum impact",
      "Peacock feather tip (eye) adds detailed focal point",
      "Balance bold peacock with open space around it",
    ],
    elements: [
      "Peacock",
      "Feather eyes",
      "Roses",
      "Curved leaves",
      "Geometric accents",
    ],
    emoji: "🦚",
    timeRequired: "45–75 minutes",
  },
  {
    id: "a003",
    name: "Modern Arabic Geometric",
    nameHindi: "आधुनिक अरबी ज्यामितीय मेहंदी",
    style: "Arabic",
    occasion: "Party / Eid",
    complexity: "Easy",
    description:
      "Contemporary Arabic style mixing geometric shapes — diamonds, triangles, and hexagons — with traditional floral elements. Clean, structured, and trend-forward.",
    tips: [
      "Use ruler or template for perfect geometric lines",
      "Mix geometric borders with organic floral centers",
      "This style works well for shorter mehndi sessions",
      "Dots and dashes between shapes add detail without complexity",
    ],
    elements: [
      "Diamonds",
      "Hexagons",
      "Triangles",
      "Dot fillers",
      "Floral accents",
    ],
    emoji: "💎",
    timeRequired: "20–40 minutes",
  },

  // ── Rajasthani ────────────────────────────────────────────────────────────
  {
    id: "r001",
    name: "Traditional Rajasthani Full Hand",
    nameHindi: "परंपरागत राजस्थानी पूर्ण हस्त",
    style: "Rajasthani",
    occasion: "Wedding / Festival",
    complexity: "Complex",
    description:
      "Dense, all-over traditional Rajasthani design with intricate dot work (tikki), fine lines, elephant motifs, and characteristic peacock borders covering the entire hand and forearm.",
    tips: [
      "Rajasthani style fills almost all space with fine patterns",
      "Tikki (dot patterns) are the signature element",
      "Grids and tiny motifs inside motifs add complexity",
      "Natural organic paste gives best results for this style",
    ],
    elements: [
      "Tikki dots",
      "Elephants",
      "Peacocks",
      "Lotuses",
      "Grid patterns",
    ],
    emoji: "🌸",
    timeRequired: "3–5 hours",
  },
  {
    id: "r002",
    name: "Rajasthani Meenakari Style",
    nameHindi: "राजस्थानी मीनाकारी मेहंदी",
    style: "Rajasthani",
    occasion: "Wedding",
    complexity: "Complex",
    description:
      "Inspired by Rajasthani meenakari jewelry, this design uses fine network patterns, jhaali work, and delicate multiple borders resembling enameled jewelry craftsmanship.",
    tips: [
      "This style requires a very fine-tipped cone",
      "Build layers starting from the finest inner detail outward",
      "Patience is key — this style cannot be rushed",
      "Best for brides who love jewelry-inspired mehndi",
    ],
    elements: [
      "Jhaali lattice",
      "Jewelry motifs",
      "Multiple borders",
      "Fine dot work",
    ],
    emoji: "💍",
    timeRequired: "4–6 hours",
  },
  {
    id: "r003",
    name: "Rajasthani Back Hand Pattern",
    nameHindi: "राजस्थानी पीठ हस्त मेहंदी",
    style: "Rajasthani",
    occasion: "Festival / Daily",
    complexity: "Medium",
    description:
      "Characteristic Rajasthani back-of-hand design featuring a central mandala flower with radiating Rajput-style arms, surrounded by tikki borders and leaf detailing.",
    tips: [
      "Central mandala is the anchor — draw it first",
      "Extend symmetric arms from center outward",
      "Fill between arms with tikki dots for texture",
      "Finish with a leaf vine border around the edges",
    ],
    elements: [
      "Central mandala",
      "Rajput arms",
      "Tikki filling",
      "Leaf border",
    ],
    emoji: "🌻",
    timeRequired: "1–2 hours",
  },

  // ── Moroccan ──────────────────────────────────────────────────────────────
  {
    id: "m001",
    name: "Moroccan Geometric Henna",
    nameHindi: "मोरक्कन ज्यामितीय मेहंदी",
    style: "Moroccan",
    occasion: "Any Occasion",
    complexity: "Medium",
    description:
      "Bold North African geometric style featuring Berber tribal motifs, star of David patterns, interlocking triangles, and chevron borders. Clean, structured, and culturally rich.",
    tips: [
      "Moroccan patterns are based on precise geometry",
      "Use ruler and compass-traced templates for accuracy",
      "Heavy lines with bold fill characterize this style",
      "Negative space shapes are as important as filled areas",
    ],
    elements: [
      "Berber symbols",
      "Star patterns",
      "Triangles",
      "Chevrons",
      "Crosshatch fill",
    ],
    emoji: "⭐",
    timeRequired: "1–2 hours",
  },
  {
    id: "m002",
    name: "Moroccan Florals with Berber Accents",
    nameHindi: "मोरक्कन पुष्प मेहंदी",
    style: "Moroccan",
    occasion: "Party / Celebration",
    complexity: "Easy",
    description:
      "A fusion of Moroccan geometric borders and flowing florals, combining North African structure with organic flower and vine elements for a modern global aesthetic.",
    tips: [
      "Start with the geometric border frame",
      "Fill the interior with free-flowing florals",
      "Mix thick geometric lines with thin organic curves",
      "Perfect for beginners who want global-inspired look",
    ],
    elements: [
      "Geometric frame",
      "Roses",
      "Crescent moon",
      "Star accents",
      "Striped fills",
    ],
    emoji: "🌙",
    timeRequired: "45–75 minutes",
  },

  // ── Simple ────────────────────────────────────────────────────────────────
  {
    id: "s001",
    name: "Simple Floral Finger Tips",
    nameHindi: "सरल पुष्प उंगली मेहंदी",
    style: "Simple",
    occasion: "Daily / Casual",
    complexity: "Easy",
    description:
      "Beginner-friendly design with small flowers, hearts, and leaves on fingertips. Perfect for first-time mehndi or quick decorative touch for casual occasions.",
    tips: [
      "Practice dots and teardrops on paper first",
      "Fingertip designs dry quickly — ideal for impatient beginners",
      "Keep cone pressure light and consistent",
      "Pre-packaged ready-mix cones work well for this style",
    ],
    elements: ["Small flowers", "Hearts", "Dots", "Leaves", "Simple vines"],
    emoji: "🌷",
    timeRequired: "15–30 minutes",
  },
  {
    id: "s002",
    name: "Simple Mandala Wrist Band",
    nameHindi: "सरल मंडल कलाई मेहंदी",
    style: "Simple",
    occasion: "Daily / Festive",
    complexity: "Easy",
    description:
      "A clean mandala circle on the inner wrist with a simple bracelet-style border extending on both sides. Minimal, chic, and quick to apply.",
    tips: [
      "Draw the center circle first as anchor",
      "Extend petal shapes evenly around the circle",
      "Simple repeating band on each side of wrist",
      "This style photographs beautifully",
    ],
    elements: ["Mandala circle", "Petals", "Bracelet band", "Dot accents"],
    emoji: "🌼",
    timeRequired: "15–25 minutes",
  },
];

export const MEHNDI_STYLES: MehndiStyle[] = [
  "Bridal",
  "Festival",
  "Arabic",
  "Rajasthani",
  "Moroccan",
  "Simple",
];

export const MEHNDI_OCCASIONS = [
  "All",
  "Wedding",
  "Karva Chauth",
  "Hartalika Teej",
  "Navratri",
  "Diwali",
  "Ganesh Chaturthi",
  "Party / Celebration",
  "Any Occasion",
  "Daily / Casual",
];
