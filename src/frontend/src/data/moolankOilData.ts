export interface MoolankOil {
  id: string;
  name: string;
  nameHindi: string;
  moolankNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  planet: string;
  planetHindi: string;
  energyTagline: string;
  energyTaglineHindi: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  emiAmount: number;
  reviewCount: number;
  rashi: string[];
  imageEmoji: string;
  description: string;
  benefits: string[];
}

export const moolankOils: MoolankOil[] = [
  {
    id: "moolank-oil-1",
    name: "Moolank 1 Oil",
    nameHindi: "मूलांक 1 तेल",
    moolankNumber: 1,
    planet: "Sun",
    planetHindi: "सूर्य",
    energyTagline: "Sun energy and confidence",
    energyTaglineHindi: "सूर्य ऊर्जा और आत्मविश्वास",
    price: 999,
    originalPrice: 1300,
    discountPercent: 23,
    emiAmount: 250,
    reviewCount: 117,
    rashi: ["Leo", "Aries", "Sagittarius"],
    imageEmoji: "☀️",
    description:
      "Moolank 1 Oil is specially formulated for those born with birth number 1. Infused with solar energy herbs, this sacred oil enhances leadership, confidence, and personal power. Apply daily on pulse points or use in meditation to harness the Sun's positive vibrations.",
    benefits: [
      "Boosts confidence and self-esteem",
      "Enhances leadership qualities",
      "Attracts success and recognition",
      "Balances ego and pride",
      "Supports heart and bone health",
    ],
  },
  {
    id: "moolank-oil-2",
    name: "Moolank 2 Oil",
    nameHindi: "मूलांक 2 तेल",
    moolankNumber: 2,
    planet: "Moon",
    planetHindi: "चंद्र",
    energyTagline: "Moon energy and emotional balance",
    energyTaglineHindi: "चंद्र ऊर्जा और भावनात्मक संतुलन",
    price: 999,
    originalPrice: 1300,
    discountPercent: 23,
    emiAmount: 250,
    reviewCount: 110,
    rashi: ["Cancer", "Pisces", "Scorpio"],
    imageEmoji: "🌙",
    description:
      "Moolank 2 Oil channels the gentle yet powerful energy of the Moon. Crafted with calming lunar herbs, this oil promotes emotional harmony, intuition, and inner peace. Ideal for meditation, stress relief, and nurturing deeper relationships.",
    benefits: [
      "Calms emotional turbulence",
      "Enhances intuition and empathy",
      "Promotes better sleep",
      "Strengthens relationships",
      "Balances hormonal rhythms",
    ],
  },
  {
    id: "moolank-oil-3",
    name: "Moolank 3 Oil",
    nameHindi: "मूलांक 3 तेल",
    moolankNumber: 3,
    planet: "Jupiter",
    planetHindi: "गुरु/बृहस्पति",
    energyTagline: "Jupiter energy and wisdom",
    energyTaglineHindi: "गुरु ऊर्जा और बुद्धि",
    price: 999,
    originalPrice: 1300,
    discountPercent: 23,
    emiAmount: 250,
    reviewCount: 95,
    rashi: ["Sagittarius", "Pisces"],
    imageEmoji: "🪐",
    description:
      "Moolank 3 Oil is infused with the expansive wisdom of Jupiter. This sacred blend enhances knowledge, optimism, and spiritual growth. Ideal for students, teachers, and seekers of higher wisdom who wish to expand their consciousness.",
    benefits: [
      "Sharpens intelligence and memory",
      "Attracts abundance and prosperity",
      "Enhances optimism and joy",
      "Supports spiritual advancement",
      "Promotes generosity of spirit",
    ],
  },
  {
    id: "moolank-oil-4",
    name: "Moolank 4 Oil",
    nameHindi: "मूलांक 4 तेल",
    moolankNumber: 4,
    planet: "Rahu",
    planetHindi: "राहु",
    energyTagline: "Rahu grounding and stability",
    energyTaglineHindi: "राहु स्थिरता और भूमि संपर्क",
    price: 999,
    originalPrice: 1300,
    discountPercent: 23,
    emiAmount: 250,
    reviewCount: 94,
    rashi: ["Gemini", "Virgo", "Aquarius"],
    imageEmoji: "🌑",
    description:
      "Moolank 4 Oil works with the transformative energy of Rahu to bring grounding, stability, and material success. This powerful oil helps channel Rahu's unconventional energy constructively, supporting breakthrough thinking and innovation.",
    benefits: [
      "Grounds restless energy",
      "Enhances focus and concentration",
      "Supports innovative thinking",
      "Provides stability in turbulent times",
      "Reduces negative Rahu effects",
    ],
  },
  {
    id: "moolank-oil-5",
    name: "Moolank 5 Oil",
    nameHindi: "मूलांक 5 तेल",
    moolankNumber: 5,
    planet: "Mercury",
    planetHindi: "बुध",
    energyTagline: "Mercury energy and communication",
    energyTaglineHindi: "बुध ऊर्जा और संचार शक्ति",
    price: 999,
    originalPrice: 1300,
    discountPercent: 23,
    emiAmount: 250,
    reviewCount: 95,
    rashi: ["Gemini", "Virgo"],
    imageEmoji: "💫",
    description:
      "Moolank 5 Oil harnesses the quick, communicative energy of Mercury. Formulated with herbs that stimulate mental clarity and eloquence, this oil is perfect for speakers, writers, traders, and anyone who relies on sharp wit and effective communication.",
    benefits: [
      "Enhances communication skills",
      "Sharpens analytical thinking",
      "Supports business acumen",
      "Improves learning speed",
      "Balances nervous energy",
    ],
  },
  {
    id: "moolank-oil-6",
    name: "Moolank 6 Oil",
    nameHindi: "मूलांक 6 तेल",
    moolankNumber: 6,
    planet: "Venus",
    planetHindi: "शुक्र",
    energyTagline: "Venus energy and love harmony",
    energyTaglineHindi: "शुक्र ऊर्जा और प्रेम सौहार्द",
    price: 999,
    originalPrice: 1300,
    discountPercent: 23,
    emiAmount: 250,
    reviewCount: 96,
    rashi: ["Taurus", "Libra"],
    imageEmoji: "💕",
    description:
      "Moolank 6 Oil channels the loving, artistic energy of Venus. This beautifully fragrant blend promotes love, beauty, harmony, and creative expression. Ideal for those seeking deeper romantic connections, artistic inspiration, and domestic bliss.",
    benefits: [
      "Attracts love and romance",
      "Enhances beauty and charm",
      "Promotes harmony in relationships",
      "Stimulates creativity and artistry",
      "Brings luxurious abundance",
    ],
  },
  {
    id: "moolank-oil-7",
    name: "Moolank 7 Oil",
    nameHindi: "मूलांक 7 तेल",
    moolankNumber: 7,
    planet: "Ketu",
    planetHindi: "केतु",
    energyTagline: "Ketu intuition and spirituality",
    energyTaglineHindi: "केतु अंतर्ज्ञान और आध्यात्मिकता",
    price: 999,
    originalPrice: 1300,
    discountPercent: 23,
    emiAmount: 250,
    reviewCount: 92,
    rashi: ["Scorpio", "Pisces"],
    imageEmoji: "🔮",
    description:
      "Moolank 7 Oil works with the mystical energy of Ketu to deepen intuition, spiritual insight, and psychic awareness. This sacred blend is crafted for seekers, meditators, and those on the path of moksha and liberation.",
    benefits: [
      "Deepens meditation and intuition",
      "Enhances spiritual perception",
      "Supports past-life healing",
      "Promotes detachment from materialism",
      "Awakens inner wisdom",
    ],
  },
  {
    id: "moolank-oil-8",
    name: "Moolank 8 Oil",
    nameHindi: "मूलांक 8 तेल",
    moolankNumber: 8,
    planet: "Saturn",
    planetHindi: "शनि",
    energyTagline: "Saturn power and discipline",
    energyTaglineHindi: "शनि शक्ति और अनुशासन",
    price: 999,
    originalPrice: 1300,
    discountPercent: 23,
    emiAmount: 250,
    reviewCount: 96,
    rashi: ["Capricorn", "Aquarius"],
    imageEmoji: "🪐",
    description:
      "Moolank 8 Oil channels the powerful, disciplined energy of Saturn. This grounding blend supports perseverance, karmic healing, and long-term success. Ideal for those facing Shani's challenges or seeking to build lasting foundations in life.",
    benefits: [
      "Builds discipline and resilience",
      "Supports karmic resolution",
      "Enhances patience and endurance",
      "Promotes long-term financial stability",
      "Reduces Saturn's malefic effects",
    ],
  },
  {
    id: "moolank-oil-9",
    name: "Moolank 9 Oil",
    nameHindi: "मूलांक 9 तेल",
    moolankNumber: 9,
    planet: "Mars",
    planetHindi: "मंगल",
    energyTagline: "Mars energy and courage",
    energyTaglineHindi: "मंगल ऊर्जा और साहस",
    price: 999,
    originalPrice: 1300,
    discountPercent: 23,
    emiAmount: 250,
    reviewCount: 96,
    rashi: ["Aries", "Scorpio"],
    imageEmoji: "🔥",
    description:
      "Moolank 9 Oil harnesses the fierce, courageous energy of Mars. Formulated with warrior herbs and sacred essences, this oil ignites passion, drives ambition, and builds the courage to overcome life's greatest challenges.",
    benefits: [
      "Ignites courage and confidence",
      "Drives ambition and motivation",
      "Protects against enemies",
      "Enhances physical vitality",
      "Supports competitive success",
    ],
  },
];

export const faqData = [
  {
    question: "What is Moolank Oil?",
    questionHindi: "मूलांक तेल क्या है?",
    answer:
      "Moolank Oil is a specially formulated astrology remedy oil aligned with your birth number (Moolank). Each oil is crafted using natural herbs, essential oils, and sacred ingredients that resonate with the planetary energy of your birth number. Spiritual Connect's Moolank Oils are designed to balance your core energy, enhance personal growth, and support everyday wellness.",
    answerHindi:
      "मूलांक तेल एक विशेष रूप से तैयार किया गया ज्योतिष उपाय तेल है जो आपके मूलांक (जन्म संख्या) के अनुरूप है। प्रत्येक तेल प्राकृतिक जड़ी-बूटियों, आवश्यक तेलों और पवित्र सामग्री से बनाया जाता है।",
  },
  {
    question: "How do Moolank Oils work?",
    questionHindi: "मूलांक तेल कैसे काम करते हैं?",
    answer:
      "Moolank Oils work by aligning your body's energy field with the vibrational frequency of your ruling planet. When applied to pulse points or used in meditation, the natural ingredients interact with your bio-energy, helping to strengthen positive planetary influences and reduce negative effects. The oils work on a subtle energetic level, supporting mental clarity, emotional balance, and spiritual growth.",
    answerHindi:
      "मूलांक तेल आपके शरीर के ऊर्जा क्षेत्र को आपके स्वामी ग्रह की कंपन आवृत्ति के साथ संरेखित करके काम करते हैं। नाड़ी बिंदुओं पर लगाने पर या ध्यान में उपयोग करने पर, प्राकृतिक तत्व आपकी जैव-ऊर्जा के साथ इंटरैक्ट करते हैं।",
  },
  {
    question: "Who should use Moolank Oil?",
    questionHindi: "मूलांक तेल किसे उपयोग करना चाहिए?",
    answer:
      "Moolank Oils are ideal for anyone interested in Vedic astrology, numerology, or holistic wellness. They are particularly beneficial for those experiencing challenges related to their ruling planet — such as career setbacks (Sun), emotional imbalance (Moon), financial struggles (Jupiter/Saturn), or relationship issues (Venus). Both beginners and experienced practitioners can benefit from these oils.",
    answerHindi:
      "मूलांक तेल वैदिक ज्योतिष, अंकज्योतिष, या समग्र स्वास्थ्य में रुचि रखने वाले किसी भी व्यक्ति के लिए आदर्श हैं। ये उन लोगों के लिए विशेष रूप से फायदेमंद हैं जो अपने शासक ग्रह से संबंधित चुनौतियों का सामना कर रहे हैं।",
  },
  {
    question: "How do you use Moolank Oil daily?",
    questionHindi: "मूलांक तेल को रोज़ाना कैसे उपयोग करें?",
    answer:
      "For daily use, apply 2-3 drops of Moolank Oil to your pulse points — wrists, neck, and temples — preferably in the morning after bathing. You can also add a few drops to your bath water, use it in a diffuser during meditation, or apply it to your third eye chakra before spiritual practice. For best results, use consistently on the auspicious day associated with your ruling planet.",
    answerHindi:
      "दैनिक उपयोग के लिए, स्नान के बाद सुबह अपने नाड़ी बिंदुओं — कलाई, गर्दन, और मंदिरों — पर 2-3 बूंद मूलांक तेल लगाएं। आप इसे अपने स्नान के पानी में भी मिला सकते हैं, ध्यान के दौरान डिफ्यूज़र में उपयोग कर सकते हैं।",
  },
];
