export interface VedaOverview {
  id: string;
  name: string;
  nameHindi: string;
  faith: "Hindu";
  language: string;
  author: string;
  period: string;
  significance: string;
  significanceHindi: string;
  structure: string;
  structureHindi: string;
  totalSuktams: number;
  totalMantras: number;
  icon: string;
  color: string;
  keyTopics: string[];
}

export const vedasOverview: VedaOverview[] = [
  {
    id: "rigveda",
    name: "Rigveda",
    nameHindi: "ऋग्वेद",
    faith: "Hindu",
    language: "Vedic Sanskrit",
    author: "Various Rishis (Saptarishis, Angiras, Vishwamitra, Vamadeva)",
    period: "c. 1500–1200 BCE (composed orally, written c. 600 BCE)",
    significance:
      "The oldest and most sacred of the four Vedas, containing 1,028 hymns (Suktams) addressed to Vedic deities. It is the foundational scripture of Hindu civilization and the oldest known religious text in the world. The Rigveda contains profound philosophical hymns including the Nasadiya Suktam on cosmogony and Purusha Suktam on the cosmic being.",
    significanceHindi:
      "चारों वेदों में सबसे प्राचीन और पवित्र, जिसमें वैदिक देवताओं को समर्पित १०२८ सूक्त हैं। यह हिंदू सभ्यता का आधारभूत ग्रंथ है।",
    structure:
      "10 Mandalas (Books), 1,028 Suktas, 10,552 Mantras. Organized by family collections (Mandala 2-7), soma hymns (Mandala 9), and general hymns (Mandala 1, 8, 10).",
    structureHindi:
      "१० मण्डल, १०२८ सूक्त, १०,५५२ मंत्र। पारिवारिक संग्रहों द्वारा व्यवस्थित।",
    totalSuktams: 1028,
    totalMantras: 10552,
    icon: "🔥",
    color: "from-amber-600 to-orange-600",
    keyTopics: [
      "Agni (Fire deity) hymns",
      "Indra (Thunder god) praises",
      "Soma rituals",
      "Creation cosmology (Nasadiya Suktam)",
      "Cosmic Man (Purusha Suktam)",
      "Dawn goddess (Ushas)",
    ],
  },
  {
    id: "samaveda",
    name: "Samaveda",
    nameHindi: "सामवेद",
    faith: "Hindu",
    language: "Vedic Sanskrit",
    author: "Derived from Rigveda; compiled by Rishi Jaimini tradition",
    period: "c. 1200–1000 BCE",
    significance:
      "The Veda of Melodies and Songs. Most of its 1,875 verses are drawn from the Rigveda and set to musical notation (Svaras) for liturgical chanting. Called the 'scripture of chants', it forms the musical basis of Hindu devotional music and classical Hindustani and Carnatic traditions. Krishna declares in the Bhagavad Gita 'among the Vedas, I am the Samaveda.'",
    significanceHindi:
      "गानों का वेद। इसके अधिकांश मंत्र ऋग्वेद से लिए गए हैं। भगवान कृष्ण ने गीता में कहा — 'वेदों में मैं सामवेद हूँ।'",
    structure:
      "2 main parts: Purvarchika (first part, 585 verses) and Uttararchika (second part, 1,225 verses). 3 recensions: Kauthuma, Ranayaniya, Jaiminiya.",
    structureHindi:
      "दो मुख्य भाग: पूर्वार्चिक (५८५ मंत्र) और उत्तरार्चिक (१,२२५ मंत्र)। तीन शाखाएं।",
    totalSuktams: 1875,
    totalMantras: 1875,
    icon: "🎵",
    color: "from-violet-600 to-purple-600",
    keyTopics: [
      "Liturgical melodies (Svaras)",
      "Soma (sacred drink) hymns",
      "Agni (fire) chants",
      "Musical scales (Saptak)",
      "Udgata priest chants",
      "Ritual music framework",
    ],
  },
  {
    id: "yajurveda",
    name: "Yajurveda",
    nameHindi: "यजुर्वेद",
    faith: "Hindu",
    language: "Vedic Sanskrit",
    author:
      "Various Rishis; primarily Vaishampayana and Yajnavalkya traditions",
    period: "c. 1200–900 BCE",
    significance:
      "The Veda of Sacrificial Formulas and prose mantras used in Yajnas (fire rituals). It provides detailed procedures for performing Vedic sacrifices. Contains the Shukla (White) and Krishna (Black) Yajurveda divisions. The Brihadaranyaka and Isha Upanishads, among the most profound philosophical texts, are appendices to this Veda.",
    significanceHindi:
      "यज्ञों में प्रयुक्त मंत्रों का संग्रह। इसमें दो भाग हैं — शुक्ल यजुर्वेद और कृष्ण यजुर्वेद। बृहदारण्यक और ईशा उपनिषद इसके परिशिष्ट हैं।",
    structure:
      "Two recensions: Shukla Yajurveda (Vajasaneyi Samhita, 40 chapters, 1,975 mantras) and Krishna Yajurveda (Taittiriya Samhita, 7 Kandas). Contains both verse (mantra) and prose (brahmana) portions.",
    structureHindi:
      "दो भाग: शुक्ल यजुर्वेद (वाजसनेयी संहिता, ४० अध्याय) और कृष्ण यजुर्वेद (तैत्तिरीय संहिता, ७ काण्ड)।",
    totalSuktams: 1975,
    totalMantras: 1975,
    icon: "🕯️",
    color: "from-emerald-600 to-teal-600",
    keyTopics: [
      "Yajna (fire sacrifice) procedures",
      "Adhvaryu priest duties",
      "Ashwamedha (horse sacrifice)",
      "Rajasuya (royal consecration)",
      "Agnihotra (daily fire ritual)",
      "Isha Upanishad (philosophical)",
    ],
  },
  {
    id: "atharvaveda",
    name: "Atharvaveda",
    nameHindi: "अथर्ववेद",
    faith: "Hindu",
    language: "Vedic Sanskrit",
    author: "Atharva and Angiras Rishis; Brahma tradition",
    period: "c. 1200–1000 BCE (later additions until c. 600 BCE)",
    significance:
      "The Veda of everyday life, medicine, magic, and wisdom. Contains hymns for healing diseases, protection from enemies, long life, love, and domestic rituals. Unique among the Vedas for its focus on practical daily concerns, Ayurveda (medicine), and philosophical speculation. The Mundaka, Mandukya, and Prashna Upanishads belong to this Veda.",
    significanceHindi:
      "दैनिक जीवन, चिकित्सा और रक्षा के मंत्रों का संग्रह। आयुर्वेद का आधार। मुण्डक, माण्डूक्य और प्रश्न उपनिषद इससे संबंधित हैं।",
    structure:
      "20 Kandas (Books), 730 Suktas, approximately 5,987 mantras. Two major recensions: Shaunakiya and Paippalada. Contains both magical/ritual hymns and profound philosophical hymns.",
    structureHindi:
      "२० काण्ड, ७३० सूक्त, लगभग ५,९८७ मंत्र। दो मुख्य शाखाएं: शौनकीय और पैप्पलाद।",
    totalSuktams: 730,
    totalMantras: 5987,
    icon: "🌿",
    color: "from-green-600 to-lime-600",
    keyTopics: [
      "Ayurveda (healing mantras)",
      "Raksha (protection spells)",
      "Prayaschitta (atonement)",
      "Kama (love and fertility)",
      "Brahman philosophy",
      "Mundaka Upanishad wisdom",
    ],
  },
];
