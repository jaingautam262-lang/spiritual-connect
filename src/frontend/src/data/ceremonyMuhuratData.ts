// ── Ceremony Muhurat Data for 2026 ───────────────────────────────────────────
// All times in IST (UTC+5:30), base city: New Delhi
// Intervals follow Panchang-style: beginsAt / endsAt / duration / lagna / tithi / hora / nakshatra

export interface CeremonyInterval {
  date: string; // "May 15, 2026" (display)
  dateISO: string; // "2026-05-15"
  dayOfWeek: string;
  dayOfWeekHindi: string;
  beginsAt: string; // "07:24 AM"
  endsAt: string; // "09:48 AM"
  duration: string; // "2h 24m"
  quality: "auspicious" | "mixed" | "inauspicious";
  lagna: string;
  lagnaHindi: string;
  tithi: string;
  tithiHindi: string;
  hora: string;
  horaHindi: string;
  nakshatra: string;
  nakshatraHindi: string;
  pros?: string;
  prosHindi?: string;
  cons?: string;
  consHindi?: string;
}

export interface CeremonyRules {
  nakshatraRules?: string;
  nakshatraRulesHindi?: string;
  tithiRules?: string;
  tithiRulesHindi?: string;
  dayRules?: string;
  dayRulesHindi?: string;
  lagnaRules?: string;
  lagnaRulesHindi?: string;
  generalRules?: string;
  generalRulesHindi?: string;
  notes?: string;
  notesHindi?: string;
}

export interface CeremonyData {
  slug: string;
  nameEnglish: string;
  nameHindi: string;
  descriptionEnglish: string;
  descriptionHindi: string;
  icon: string;
  hasJuneData: boolean;
  rules: CeremonyRules;
  mayIntervals: CeremonyInterval[];
  juneIntervals: CeremonyInterval[];
}

// ── City offsets (minutes from New Delhi) ─────────────────────────────────────

export const CEREMONY_CITY_OFFSETS: Record<string, number> = {
  "New Delhi": 0,
  Mumbai: -28,
  Chennai: -24,
  Kolkata: 24,
  Bangalore: -26,
  Hyderabad: -21,
  Pune: -27,
  Ahmedabad: -32,
  Jaipur: -6,
  Lucknow: 14,
  Varanasi: 18,
};

export const CEREMONY_CITIES = Object.keys(CEREMONY_CITY_OFFSETS);

// ── Shared interval data helpers ──────────────────────────────────────────────

function mkInterval(
  dateISO: string,
  date: string,
  dayOfWeek: string,
  dayOfWeekHindi: string,
  beginsAt: string,
  endsAt: string,
  duration: string,
  quality: CeremonyInterval["quality"],
  lagna: string,
  lagnaHindi: string,
  tithi: string,
  tithiHindi: string,
  hora: string,
  horaHindi: string,
  nakshatra: string,
  nakshatraHindi: string,
  pros?: string,
  prosHindi?: string,
  cons?: string,
  consHindi?: string,
): CeremonyInterval {
  return {
    dateISO,
    date,
    dayOfWeek,
    dayOfWeekHindi,
    beginsAt,
    endsAt,
    duration,
    quality,
    lagna,
    lagnaHindi,
    tithi,
    tithiHindi,
    hora,
    horaHindi,
    nakshatra,
    nakshatraHindi,
    pros,
    prosHindi,
    cons,
    consHindi,
  };
}

// ── Common May 2026 auspicious intervals (shared base) ────────────────────────

const MAY_AUSPICIOUS: CeremonyInterval[] = [
  mkInterval(
    "2026-05-07",
    "May 7, 2026",
    "Thursday",
    "गुरुवार",
    "06:52 AM",
    "09:20 AM",
    "2h 28m",
    "auspicious",
    "Taurus",
    "वृषभ",
    "Tritiya",
    "तृतीया",
    "Jupiter",
    "गुरु",
    "Rohini",
    "रोहिणी",
    "Guru hora, Rohini nakshatra — ideal for auspicious beginnings",
    "गुरु होरा, रोहिणी नक्षत्र — शुभ कार्यों के लिए आदर्श",
  ),
  mkInterval(
    "2026-05-10",
    "May 10, 2026",
    "Sunday",
    "रविवार",
    "07:14 AM",
    "09:45 AM",
    "2h 31m",
    "auspicious",
    "Gemini",
    "मिथुन",
    "Shashthi",
    "षष्ठी",
    "Sun",
    "सूर्य",
    "Ardra",
    "आर्द्रा",
    "Surya hora energizes the ceremony",
    "सूर्य होरा से समारोह ऊर्जावान",
  ),
  mkInterval(
    "2026-05-14",
    "May 14, 2026",
    "Thursday",
    "गुरुवार",
    "06:45 AM",
    "10:10 AM",
    "3h 25m",
    "auspicious",
    "Taurus",
    "वृषभ",
    "Dashami",
    "दशमी",
    "Jupiter",
    "गुरु",
    "Pushya",
    "पुष्य",
    "Pushya nakshatra with Guru hora — highly auspicious",
    "पुष्य नक्षत्र + गुरु होरा — अत्यंत शुभ",
  ),
  mkInterval(
    "2026-05-17",
    "May 17, 2026",
    "Sunday",
    "रविवार",
    "07:30 AM",
    "09:55 AM",
    "2h 25m",
    "auspicious",
    "Cancer",
    "कर्क",
    "Trayodashi",
    "त्रयोदशी",
    "Moon",
    "चंद्र",
    "Magha",
    "मघा",
    "Moon hora in Cancer lagna — nurturing energy",
    "कर्क लग्न में चंद्र होरा — पालनकारी ऊर्जा",
  ),
  mkInterval(
    "2026-05-21",
    "May 21, 2026",
    "Thursday",
    "गुरुवार",
    "06:55 AM",
    "09:30 AM",
    "2h 35m",
    "auspicious",
    "Taurus",
    "वृषभ",
    "Panchami",
    "पंचमी",
    "Jupiter",
    "गुरु",
    "Uttara Phalguni",
    "उत्तर फाल्गुनी",
    "Uttara Phalguni is especially auspicious for ceremonies",
    "उत्तर फाल्गुनी नक्षत्र समारोहों के लिए विशेष शुभ",
  ),
  mkInterval(
    "2026-05-25",
    "May 25, 2026",
    "Monday",
    "सोमवार",
    "07:10 AM",
    "10:00 AM",
    "2h 50m",
    "auspicious",
    "Gemini",
    "मिथुन",
    "Navami",
    "नवमी",
    "Moon",
    "चंद्र",
    "Hasta",
    "हस्त",
    "Hasta nakshatra — skilled and dexterous energy",
    "हस्त नक्षत्र — कुशल और दक्षता की ऊर्जा",
  ),
  mkInterval(
    "2026-05-28",
    "May 28, 2026",
    "Thursday",
    "गुरुवार",
    "06:48 AM",
    "09:15 AM",
    "2h 27m",
    "auspicious",
    "Taurus",
    "वृषभ",
    "Dwadashi",
    "द्वादशी",
    "Jupiter",
    "गुरु",
    "Swati",
    "स्वाती",
    "Swati nakshatra with Jupiter hora — balance and prosperity",
    "स्वाती नक्षत्र + गुरु होरा — संतुलन और समृद्धि",
  ),
  mkInterval(
    "2026-05-31",
    "May 31, 2026",
    "Sunday",
    "रविवार",
    "08:00 AM",
    "10:20 AM",
    "2h 20m",
    "mixed",
    "Leo",
    "सिंह",
    "Tritiya",
    "तृतीया",
    "Sun",
    "सूर्य",
    "Vishakha",
    "विशाखा",
    "Partial auspiciousness — consult Jyotishi",
    "आंशिक शुभता — ज्योतिषी से परामर्श करें",
    "Afternoon hours less favorable",
    "दोपहर के बाद कम अनुकूल",
  ),
];

const JUNE_AUSPICIOUS: CeremonyInterval[] = [
  mkInterval(
    "2026-06-04",
    "June 4, 2026",
    "Thursday",
    "गुरुवार",
    "06:50 AM",
    "09:10 AM",
    "2h 20m",
    "auspicious",
    "Taurus",
    "वृषभ",
    "Dashami",
    "दशमी",
    "Jupiter",
    "गुरु",
    "Uttara Ashadha",
    "उत्तर आषाढ़",
    "Uttara Ashadha — excellent for new undertakings",
    "उत्तर आषाढ़ — नए कार्यों के लिए उत्कृष्ट",
  ),
  mkInterval(
    "2026-06-11",
    "June 11, 2026",
    "Thursday",
    "गुरुवार",
    "07:05 AM",
    "09:40 AM",
    "2h 35m",
    "auspicious",
    "Gemini",
    "मिथुन",
    "Saptami",
    "सप्तमी",
    "Jupiter",
    "गुरु",
    "Shravana",
    "श्रवण",
    "Shravana nakshatra with Guru hora",
    "श्रवण नक्षत्र + गुरु होरा",
  ),
  mkInterval(
    "2026-06-18",
    "June 18, 2026",
    "Thursday",
    "गुरुवार",
    "06:55 AM",
    "09:25 AM",
    "2h 30m",
    "auspicious",
    "Cancer",
    "कर्क",
    "Chaturdashi",
    "चतुर्दशी",
    "Jupiter",
    "गुरु",
    "Dhanishtha",
    "धनिष्ठा",
    "Dhanishtha — wealth and prosperity",
    "धनिष्ठा — धन और समृद्धि",
  ),
  mkInterval(
    "2026-06-25",
    "June 25, 2026",
    "Thursday",
    "गुरुवार",
    "07:00 AM",
    "09:35 AM",
    "2h 35m",
    "auspicious",
    "Taurus",
    "वृषभ",
    "Dwitiya",
    "द्वितीया",
    "Jupiter",
    "गुरु",
    "Revati",
    "रेवती",
    "Revati nakshatra — gentle and auspicious",
    "रेवती नक्षत्र — सौम्य और शुभ",
  ),
];

// ── Individual ceremony data ───────────────────────────────────────────────────

function mkCeremony(
  slug: string,
  nameEnglish: string,
  nameHindi: string,
  descriptionEnglish: string,
  descriptionHindi: string,
  icon: string,
  hasJuneData: boolean,
  rules: CeremonyRules,
  mayIntervals: CeremonyInterval[],
  juneIntervals: CeremonyInterval[],
): CeremonyData {
  return {
    slug,
    nameEnglish,
    nameHindi,
    descriptionEnglish,
    descriptionHindi,
    icon,
    hasJuneData,
    rules,
    mayIntervals,
    juneIntervals,
  };
}

const defaultRules: CeremonyRules = {
  nakshatraRules:
    "Rohini, Mrigashira, Hasta, Pushya, Uttara Phalguni, Uttara Ashadha, Uttara Bhadrapada, Anuradha, and Swati are considered auspicious. Avoid Ardra, Ashlesha, Jyeshtha, Moola, and Bharani.",
  nakshatraRulesHindi:
    "रोहिणी, मृगशिरा, हस्त, पुष्य, उत्तर फाल्गुनी, उत्तर आषाढ़, उत्तर भाद्रपद, अनुराधा और स्वाती नक्षत्र शुभ हैं। आर्द्रा, अश्लेषा, ज्येष्ठा, मूल और भरणी से बचें।",
  tithiRules:
    "Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, Dwadashi, and Trayodashi are auspicious. Avoid Ashtami, Navami (for some ceremonies), Chaturdashi, and Amavasya.",
  tithiRulesHindi:
    "द्वितीया, तृतीया, पंचमी, सप्तमी, दशमी, एकादशी, द्वादशी और त्रयोदशी शुभ हैं। अष्टमी, नवमी (कुछ संस्कारों के लिए), चतुर्दशी और अमावस्या से बचें।",
  dayRules:
    "Monday, Wednesday, Thursday, and Friday are generally auspicious. Sunday is acceptable. Avoid Saturday for sensitive ceremonies.",
  dayRulesHindi:
    "सोमवार, बुधवार, गुरुवार और शुक्रवार सामान्यतः शुभ हैं। रविवार स्वीकार्य है। संवेदनशील संस्कारों के लिए शनिवार से बचें।",
  lagnaRules:
    "Fixed Lagnas (Taurus, Leo, Scorpio, Aquarius) provide stability. Moveable Lagnas (Aries, Cancer, Libra, Capricorn) bring momentum. Avoid the 8th house lord in Lagna.",
  lagnaRulesHindi:
    "स्थिर लग्न (वृषभ, सिंह, वृश्चिक, कुंभ) स्थिरता प्रदान करते हैं। चर लग्न (मेष, कर्क, तुला, मकर) गति लाते हैं। लग्न में अष्टमेश से बचें।",
  generalRules:
    "Choose a time when the Lagna lord is strong and not afflicted. Ensure Jupiter and Venus are not combust. Avoid Rahu Kaal and Yamaganda. The ceremony should begin in the Shubh Muhurat window.",
  generalRulesHindi:
    "ऐसा समय चुनें जब लग्नेश बलवान हो और पीड़ित न हो। सुनिश्चित करें कि गुरु और शुक्र अस्त न हों। राहुकाल और यमगंड से बचें। समारोह शुभ मुहूर्त में शुरू होना चाहिए।",
};

// ── CEREMONY_DATA record ──────────────────────────────────────────────────────

export const CEREMONY_DATA: Record<string, CeremonyData> = {
  garbhadhana: mkCeremony(
    "garbhadhana",
    "Garbhadhana Muhurat 2026",
    "गर्भाधान मुहूर्त 2026",
    "Garbhadhana is the first of the sixteen Hindu samskaras (sacred rites of passage). It is the rite of conception, performed with Vedic rituals to ensure the child conceived is blessed with divine qualities. The muhurat (auspicious time) for Garbhadhana is determined by the lunar day (tithi), nakshatra (lunar mansion), day of the week, and lagna (rising sign). A strong, unafflicted lagna lord with Jupiter's blessings ensures spiritual merit for the future child.",
    "गर्भाधान सोलह हिंदू संस्कारों में से पहला है। यह गर्भधारण का संस्कार है, जो वैदिक विधि-विधान से किया जाता है ताकि गर्भस्थ शिशु दैवीय गुणों से संपन्न हो। गर्भाधान मुहूर्त तिथि, नक्षत्र, वार और लग्न के आधार पर निर्धारित किया जाता है।",
    "🌱",
    true,
    {
      ...defaultRules,
      notes:
        "Garbhadhana should ideally be performed on the 4th, 6th, 8th, 10th, 12th, 14th, or 16th night after the wife's menstrual cycle begins. The husband should face East and the wife should face North during the ritual.",
      notesHindi:
        "गर्भाधान ऋतु के चौथे, छठे, आठवें, दसवें, बारहवें, चौदहवें या सोलहवें दिन किया जाना चाहिए। अनुष्ठान के दौरान पति का मुख पूर्व और पत्नी का उत्तर की ओर होना चाहिए।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  punsavana: mkCeremony(
    "punsavana",
    "Punsavana Muhurat 2026",
    "पुंसवन मुहूर्त 2026",
    "Punsavana is the second Hindu samskara, performed in the second or third month of pregnancy. The ritual is meant to invoke divine blessings for the development of a male child (though in modern practice it is performed for the well-being of the child regardless of gender). Vedic mantras are chanted and herbs are administered. The muhurat should be chosen when the moon is in a male nakshatra like Pushya, Hasta, Rohini, or Punarvasu.",
    "पुंसवन दूसरा हिंदू संस्कार है, जो गर्भावस्था के दूसरे या तीसरे महीने में किया जाता है। यह संस्कार शिशु के कल्याण के लिए दैवीय आशीर्वाद प्राप्त करने हेतु है। मुहूर्त पुष्य, हस्त, रोहिणी या पुनर्वसु जैसे नक्षत्रों में होना चाहिए।",
    "🌿",
    true,
    {
      ...defaultRules,
      notes:
        "Best performed when the moon is in Pushya, Rohini, Punarvasu, or Hasta nakshatra. The 3rd month of pregnancy is considered most auspicious.",
      notesHindi:
        "सर्वोत्तम तब किया जाए जब चंद्रमा पुष्य, रोहिणी, पुनर्वसु या हस्त नक्षत्र में हो। गर्भावस्था का तीसरा महीना सबसे शुभ माना जाता है।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  seemanta: mkCeremony(
    "seemanta",
    "Seemanta Muhurat 2026",
    "सीमंत मुहूर्त 2026",
    "Seemanta (also called Seemantonnayana) is the third samskara, a ritual baby shower performed in the 6th or 8th month of pregnancy. The ceremony involves parting the wife's hair while Vedic mantras are chanted, symbolizing the parting of the womb for safe delivery. It is meant to protect the mother and child from negative influences and ensure safe childbirth.",
    "सीमंत (सीमंतोन्नयन) तीसरा संस्कार है, जो गर्भावस्था के छठे या आठवें महीने में किया जाता है। इस समारोह में वैदिक मंत्रोच्चार के साथ पत्नी के बालों की मांग निकाली जाती है, जो प्रसव के लिए गर्भ के खुलने का प्रतीक है।",
    "🌸",
    true,
    {
      ...defaultRules,
      notes:
        "Best performed in the 6th month of pregnancy. Avoid Saturdays and the 8th and 9th lunar days (Ashtami, Navami). The ceremony should be conducted by the husband with family members present.",
      notesHindi:
        "गर्भावस्था के छठे महीने में सर्वोत्तम। शनिवार तथा अष्टमी और नवमी तिथि से बचें। समारोह पति द्वारा परिवार की उपस्थिति में किया जाना चाहिए।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "seemanta-vishnu-puja": mkCeremony(
    "seemanta-vishnu-puja",
    "Seemanta Vishnu Puja Muhurat 2026",
    "सीमंत विष्णु पूजा मुहूर्त 2026",
    "Seemanta Vishnu Puja is a special Vishnu worship performed alongside or during the Seemanta ceremony. Lord Vishnu, as the sustainer of the universe, is invoked to protect the unborn child and ensure the mother's health. This puja strengthens the divine protection around the family during the sensitive period of late pregnancy.",
    "सीमंत विष्णु पूजा, सीमंत संस्कार के साथ या उसके दौरान की जाने वाली विशेष विष्णु आराधना है। ब्रह्मांड के पालक भगवान विष्णु को अजन्मे शिशु की सुरक्षा और माता के स्वास्थ्य के लिए आमंत्रित किया जाता है।",
    "🔱",
    true,
    {
      ...defaultRules,
      notes:
        "Vishnu puja should be performed facing East. Offer Tulsi leaves (sacred to Vishnu), yellow flowers, and sandalwood paste. The Vishnu Sahasranama or Purusha Sukta may be chanted.",
      notesHindi:
        "विष्णु पूजा पूर्व की ओर मुख करके करें। तुलसी पत्र, पीले फूल और चंदन अर्पित करें। विष्णु सहस्रनाम या पुरुष सूक्त का पाठ किया जा सकता है।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "jaat-karma": mkCeremony(
    "jaat-karma",
    "Jaat Karma Muhurat 2026",
    "जात कर्म मुहूर्त 2026",
    "Jaat Karma (Jatakarma) is the fourth samskara, performed immediately after birth before the umbilical cord is cut. The father touches the baby's tongue with a mixture of honey and clarified butter (ghee) while chanting Vedic mantras. This rite purifies the newborn and welcomes the soul into the family lineage. It also includes the Medhajananana (rite of intelligence) and Ayushya (rite for longevity).",
    "जात कर्म (जातकर्म) चौथा संस्कार है, जो जन्म के तुरंत बाद नाभि-नाल काटने से पहले किया जाता है। पिता वैदिक मंत्रोच्चार करते हुए शिशु की जीभ पर शहद और घी का मिश्रण लगाते हैं। यह संस्कार नवजात को शुद्ध करता है और उसे पारिवारिक वंश में स्वागत देता है।",
    "👶",
    true,
    {
      ...defaultRules,
      notes:
        "This ceremony should be performed within hours of birth. The muhurat window extends throughout the day of birth — any auspicious lagna can be chosen. The father should be ritually pure before performing the rite.",
      notesHindi:
        "यह संस्कार जन्म के कुछ घंटों के भीतर किया जाना चाहिए। मुहूर्त जन्म के दिन भर रहता है। संस्कार करने से पहले पिता को शुद्ध होना चाहिए।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  stanapana: mkCeremony(
    "stanapana",
    "Stanapana Muhurat 2026",
    "स्तनपान मुहूर्त 2026",
    "Stanapana (first breast-feeding) is performed as a formal rite after the Jatakarma samskara. The first feeding is considered sacred, and Vedic mantras are chanted to invoke blessings for the mother's milk to nourish the child's body, mind, and soul. This ceremony honors the sacred bond between mother and child.",
    "स्तनपान (प्रथम स्तनपान) जातकर्म संस्कार के बाद एक औपचारिक विधि के रूप में किया जाता है। प्रथम स्तनपान को पवित्र माना जाता है और माता के दूध से शिशु के शरीर, मन और आत्मा के पोषण के लिए वैदिक मंत्रों का जाप किया जाता है।",
    "🤱",
    true,
    {
      ...defaultRules,
      notes:
        "Performed within the first few days of birth, ideally on the 3rd or 4th day. Choose an auspicious lagna, preferably Cancer, Taurus, or Pisces for nurturing energy.",
      notesHindi:
        "जन्म के पहले कुछ दिनों के भीतर, आदर्शतः तीसरे या चौथे दिन। पालन-पोषण की ऊर्जा के लिए कर्क, वृषभ या मीन लग्न को प्राथमिकता दें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "shashthi-puja": mkCeremony(
    "shashthi-puja",
    "Shashthi Puja Muhurat 2026",
    "षष्ठी पूजा मुहूर्त 2026",
    "Shashthi Puja is performed on the 6th day after a child's birth. Goddess Shashthi (also called Chhathi Maiya) is the deity of children and is worshipped to protect the newborn from disease and evil. The ceremony includes prayers, a lamp lighting ritual, and offerings of fruits and flowers. In many regions, this is a major family celebration.",
    "षष्ठी पूजा बच्चे के जन्म के छठे दिन की जाती है। देवी षष्ठी (छठी मैया) बच्चों की देवी हैं और नवजात को रोग और बुराई से बचाने के लिए उनकी पूजा की जाती है। समारोह में प्रार्थना, दीप-प्रज्वलन और फल-फूल का अर्पण शामिल है।",
    "🌟",
    true,
    {
      ...defaultRules,
      notes:
        "Always performed on the 6th day after birth. The puja is typically done at sunrise. Avoid performing on inauspicious nakshatras like Jyeshtha, Moola, or Ashlesha.",
      notesHindi:
        "हमेशा जन्म के छठे दिन किया जाता है। पूजा सामान्यतः सूर्योदय के समय की जाती है। ज्येष्ठा, मूल या अश्लेषा जैसे अशुभ नक्षत्रों पर न करें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "prasuta-snan": mkCeremony(
    "prasuta-snan",
    "Prasuta Snan Muhurat 2026",
    "प्रसूता स्नान मुहूर्त 2026",
    "Prasuta Snan is the purificatory bath ritual for the new mother after childbirth. Performed on an auspicious day (traditionally the 10th or 12th day after birth), it marks the end of the post-partum period of ritual impurity (sutaka). The mother takes a sacred bath with herbs and mantras, after which she can resume normal household and religious activities.",
    "प्रसूता स्नान प्रसव के बाद नई माँ के लिए शुद्धिकरण स्नान संस्कार है। पारंपरिक रूप से जन्म के 10वें या 12वें दिन किया जाता है, यह सूतक काल की समाप्ति का प्रतीक है। माँ जड़ी-बूटियों और मंत्रों के साथ पवित्र स्नान करती है।",
    "🛁",
    true,
    {
      ...defaultRules,
      notes:
        "Perform on the 10th or 12th day after birth. Choose a morning muhurat when the sun is rising in an auspicious lagna. The bath water should be infused with sacred herbs like Neem, Turmeric, and Shatavari.",
      notesHindi:
        "जन्म के 10वें या 12वें दिन करें। प्रातःकाल का मुहूर्त चुनें जब सूर्य शुभ लग्न में हो। स्नान जल में नीम, हल्दी और शतावरी जैसी पवित्र जड़ी-बूटियाँ मिलाएं।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  namakarana: mkCeremony(
    "namakarana",
    "Namakarana Muhurat 2026",
    "नामकरण मुहूर्त 2026",
    "Namakarana is the fifth samskara — the sacred naming ceremony of the newborn. Performed between the 11th day and the first year of birth, the child is given their formal name based on their birth nakshatra, Rashi, and the family's tradition. The name is whispered into the child's ear by the father or family priest. A proper muhurat ensures the name carries positive astrological influence throughout the child's life.",
    "नामकरण पाँचवाँ संस्कार है — नवजात का नामकरण समारोह। जन्म के 11वें दिन से लेकर पहले वर्ष के भीतर किया जाता है। शिशु को उसके जन्म नक्षत्र, राशि और पारिवारिक परंपरा के आधार पर औपचारिक नाम दिया जाता है।",
    "📛",
    true,
    {
      ...defaultRules,
      notes:
        "Traditionally performed on the 11th day or on a subsequent auspicious day within the first year. The name should start with a syllable appropriate to the birth nakshatra. Avoid naming on Rikta tithis (4th, 9th, 14th) and inauspicious nakshatras.",
      notesHindi:
        "पारंपरिक रूप से 11वें दिन या पहले वर्ष में किसी शुभ दिन। नाम जन्म नक्षत्र के अनुसार अक्षर से शुरू होना चाहिए। रिक्त तिथियों (चतुर्थी, नवमी, चतुर्दशी) पर न करें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "dola-arohana": mkCeremony(
    "dola-arohana",
    "Dola Arohana Muhurat 2026",
    "डोला आरोहण मुहूर्त 2026",
    "Dola Arohana (first outing / cradle ceremony) marks the first time the newborn is placed in a cradle or carried outside the birth room. This ceremony, performed in the first or second month of life, symbolizes the child's introduction to the wider world. The muhurat is chosen to ensure protection and positive influences surround the child as they begin engaging with the external environment.",
    "डोला आरोहण (प्रथम भ्रमण/पालने का संस्कार) वह समय है जब नवजात को पहली बार पालने में रखा जाता है या जन्म कक्ष से बाहर ले जाया जाता है। जीवन के पहले या दूसरे महीने में किया गया यह संस्कार बच्चे का व्यापक संसार से परिचय कराता है।",
    "🌊",
    true,
    defaultRules,
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "jala-puja": mkCeremony(
    "jala-puja",
    "Jala Puja Muhurat 2026",
    "जल पूजा मुहूर्त 2026",
    "Jala Puja is a water worship ceremony where the sacred element of water (representing the life force and purification) is venerated. This puja is performed before significant life events, new constructions, or to seek blessings for health and prosperity. Water from sacred rivers (Ganga, Yamuna, Saraswati) or pure spring water is used in the ritual.",
    "जल पूजा जल के देवता की पूजा का समारोह है। महत्वपूर्ण जीवन घटनाओं, नए निर्माण या स्वास्थ्य और समृद्धि के लिए आशीर्वाद प्राप्त करने से पहले यह पूजा की जाती है।",
    "💧",
    true,
    {
      ...defaultRules,
      notes:
        "Best performed in the morning hours during a waxing moon (Shukla Paksha). Use pure water from a sacred source or add Ganga Jal to the puja vessel. Offer white flowers, white sandalwood, and milk.",
      notesHindi:
        "शुक्ल पक्ष में प्रातःकाल सर्वोत्तम। पूजा पात्र में पवित्र स्रोत के जल या गंगाजल का उपयोग करें। सफेद फूल, श्वेत चंदन और दूध अर्पित करें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  nishkramana: mkCeremony(
    "nishkramana",
    "Nishkramana Muhurat 2026",
    "निष्क्रमण मुहूर्त 2026",
    "Nishkramana is the sixth samskara — the first outing of the infant. Performed in the 3rd or 4th month after birth, this ceremony marks the child's first formal introduction to the sun, moon, and the outside world. The father carries the child outside at sunrise, faces East toward the rising sun, and offers prayers to the sun god Surya for the child's health, vitality, and long life.",
    "निष्क्रमण छठा संस्कार है — शिशु का प्रथम बाह्य भ्रमण। जन्म के 3-4 महीने बाद किया जाता है। इसमें पिता सूर्योदय के समय शिशु को बाहर ले जाते हैं और सूर्यदेव की ओर मुख करके बच्चे के स्वास्थ्य और दीर्घायु के लिए प्रार्थना करते हैं।",
    "☀️",
    true,
    {
      ...defaultRules,
      notes:
        "Best performed in the 3rd or 4th month after birth, on a Sunday during Surya hora (sunrise) in Aries, Leo, or Sagittarius lagna. The ceremony should be done facing East at sunrise.",
      notesHindi:
        "जन्म के तीसरे या चौथे महीने में, रविवार को सूर्योदय के समय मेष, सिंह या धनु लग्न में। समारोह पूर्व की ओर मुख करके सूर्योदय पर करें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  annaprashana: mkCeremony(
    "annaprashana",
    "Annaprashana Muhurat 2026",
    "अन्नप्राशन मुहूर्त 2026",
    "Annaprashana is the seventh samskara — the first feeding of solid food to the child. Performed when the child is 6 months old (5 months for girls according to some traditions), this ceremony marks a major developmental milestone. Rice pudding (kheer or payasam) cooked with ghee and honey is offered to the deity first, then fed to the child by the father or family priest while Vedic mantras are chanted.",
    "अन्नप्राशन सातवाँ संस्कार है — बच्चे को पहली बार अन्न खिलाना। जब बच्चा 6 माह का हो (कुछ परंपराओं में लड़कियों के लिए 5 माह), तब किया जाता है। खीर/पायसम पहले देवता को अर्पित की जाती है, फिर मंत्रोच्चार करते हुए पिता या पुजारी बच्चे को खिलाते हैं।",
    "🍚",
    true,
    {
      ...defaultRules,
      notes:
        "Performed when the child is 6 months old (or 5 months for girls in some traditions). Avoid performing during the child's birth month if it has any malefic transits. Thursday is highly auspicious for this ceremony.",
      notesHindi:
        "शिशु के 6 माह होने पर (कुछ परंपराओं में बालिकाओं के लिए 5 माह)। यदि जन्म माह में कोई अशुभ ग्रह गोचर हो तो उस माह न करें। गुरुवार इस संस्कार के लिए अत्यंत शुभ है।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "bhumi-upaveshana": mkCeremony(
    "bhumi-upaveshana",
    "Bhumi Upaveshana Muhurat 2026",
    "भूमि उपवेशन मुहूर्त 2026",
    "Bhumi Upaveshana is the ceremony performed before breaking ground on new land or property. It is a ritual of seeking permission and blessings from the Earth goddess (Bhumi Devi) before any construction or agricultural work begins. The ceremony involves purifying the land, offering prayers, and establishing a sacred connection with the earth. This ensures that the land and all activities upon it are divinely sanctioned.",
    "भूमि उपवेशन नई भूमि या संपत्ति पर काम शुरू करने से पहले किया जाने वाला समारोह है। निर्माण या कृषि कार्य शुरू करने से पहले भूमि देवी (भूमि देवी) से अनुमति और आशीर्वाद लेने की विधि है।",
    "🌍",
    true,
    {
      ...defaultRules,
      notes:
        "Best performed on a day when the Lagna lord is in a strong position and Bhumi Devi is invoked. Choose fixed signs (Taurus, Leo, Scorpio, Aquarius) for the Lagna to ensure stability of the structure. Avoid performing during Rahu Kaal.",
      notesHindi:
        "शुभ होता है जब लग्नेश बलवान हो। स्थिर लग्न (वृषभ, सिंह, वृश्चिक, कुंभ) चुनें। राहुकाल में न करें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "tambula-bhakshana": mkCeremony(
    "tambula-bhakshana",
    "Tambula Bhakshana Muhurat 2026",
    "ताम्बूल भक्षण मुहूर्त 2026",
    "Tambula Bhakshana is the ceremonial first consumption of betel leaf (paan) and betel nut (supari) — a tradition with deep cultural roots in South and Southeast Asian ceremonies. In Hindu rituals, offering and consuming tambula is considered auspicious, symbolizing welcome, respect, and the beginning of a sacred undertaking. It is performed at the start of many religious and social ceremonies.",
    "ताम्बूल भक्षण पान और सुपारी के औपचारिक प्रथम सेवन का संस्कार है। हिंदू अनुष्ठानों में ताम्बूल अर्पण और ग्रहण शुभ माना जाता है, जो स्वागत, सम्मान और पवित्र कार्य के प्रारंभ का प्रतीक है।",
    "🌿",
    true,
    defaultRules,
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  karnavedha: mkCeremony(
    "karnavedha",
    "Karnavedha Muhurat 2026",
    "कर्णवेध मुहूर्त 2026",
    "Karnavedha is the ninth samskara — the ear-piercing ceremony. Performed between the 3rd and 5th year of the child's life, the right ear of boys and the left ear of girls is pierced first. The ceremony is associated with the tradition of wearing earrings which, in Ayurveda, is believed to activate acupressure points that enhance mental sharpness and improve hearing. The muhurat should be in an auspicious lagna with a favorable moon.",
    "कर्णवेध नौवाँ संस्कार है — कान छिदवाने का संस्कार। बच्चे के जीवन के 3-5 वर्ष के बीच किया जाता है। लड़कों का दाया कान और लड़कियों का बाया कान पहले छिदवाया जाता है। आयुर्वेद के अनुसार यह मानसिक तीक्ष्णता बढ़ाता है।",
    "👂",
    true,
    {
      ...defaultRules,
      notes:
        "Best performed between ages 3-5. For boys, pierce the right ear first; for girls, the left ear first. Thursday and Friday are auspicious days. Avoid Amavasya, Chaturdashi, and inauspicious nakshatras.",
      notesHindi:
        "3-5 वर्ष की आयु के बीच सर्वोत्तम। लड़कों के लिए पहले दाया कान, लड़कियों के लिए पहले बाया। गुरुवार और शुक्रवार शुभ। अमावस्या, चतुर्दशी और अशुभ नक्षत्रों से बचें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  mundana: mkCeremony(
    "mundana",
    "Mundana Muhurat 2026",
    "मुंडन मुहूर्त 2026",
    "Mundana (Chudakarana) is the eighth samskara — the first head-shaving ceremony of the child. Performed in the 1st or 3rd year of life (odd years are preferred), the hair present since birth is offered to the deity. This ceremony is believed to cleanse the child of any negative energies from the previous birth and promote healthy hair growth. Many families perform this at a sacred pilgrimage site.",
    "मुंडन (चूड़ाकर्म) आठवाँ संस्कार है — बच्चे का प्रथम मुंडन। जीवन के पहले या तीसरे वर्ष में किया जाता है (विषम वर्ष पसंदीदा हैं)। जन्म से रहे बाल देवता को अर्पित किए जाते हैं। यह पूर्व जन्म की नकारात्मक ऊर्जाओं को शुद्ध करता है।",
    "✂️",
    true,
    {
      ...defaultRules,
      notes:
        "Best performed in the 1st or 3rd year of the child's life (odd years preferred). Avoid performing in the 2nd year (considered inauspicious for some). Popular pilgrimage sites for this ceremony include Tirupati, Varanasi, and Mathura.",
      notesHindi:
        "बच्चे के जीवन के पहले या तीसरे वर्ष में (विषम वर्ष प्राथमिक)। दूसरे वर्ष न करें। तिरुपति, वाराणसी और मथुरा जैसे तीर्थस्थलों पर यह संस्कार प्रचलित है।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  akshararambha: mkCeremony(
    "akshararambha",
    "Akshararambha Muhurat 2026",
    "अक्षरारम्भ मुहूर्त 2026",
    "Akshararambha (also spelled Aksharabhyasa or Vidyarambha) is the ceremony marking the beginning of formal education. The child, guided by the teacher or father, traces the first letters of the alphabet on a tray of rice or sand while sacred mantras are chanted. In South India, this is called Vidyarambham and is performed on Vijayadashami. The muhurat should be in Mercury's hora or when Mercury is strong for intellectual development.",
    "अक्षरारम्भ (विद्यारम्भ) औपचारिक शिक्षा की शुरुआत का संस्कार है। बच्चा शिक्षक या पिता के मार्गदर्शन में चावल या रेत की थाली पर पहले अक्षर लिखता है। दक्षिण भारत में इसे विजयदशमी पर मनाया जाता है।",
    "✍️",
    true,
    {
      ...defaultRules,
      notes:
        "Best performed when Mercury (Budha) is strong and well-placed. Wednesday is ideal. Vijayadashami (Dussehra) is traditionally the most auspicious day for this ceremony. The child should be between 3-5 years old.",
      notesHindi:
        "जब बुध ग्रह बलवान हो तब सर्वोत्तम। बुधवार आदर्श है। विजयदशमी (दशहरा) परंपरागत रूप से इस संस्कार के लिए सबसे शुभ दिन है।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  vidyarambha: mkCeremony(
    "vidyarambha",
    "Vidyarambha Muhurat 2026",
    "विद्यारंभ मुहूर्त 2026",
    "Vidyarambha is the auspicious beginning of a new course of study or formal enrollment in a school or institution. It is performed when a student begins studying a new subject, joins a new educational institution, or embarks on any significant educational endeavor. The ceremony includes prayers to Goddess Saraswati (goddess of knowledge) and Lord Ganesha (remover of obstacles). The muhurat ensures the student's learning journey is blessed.",
    "विद्यारंभ किसी नए पाठ्यक्रम या संस्था में प्रवेश का शुभ प्रारंभ है। जब कोई छात्र नया विषय पढ़ना शुरू करे, नई शैक्षणिक संस्था में जाए, तब यह समारोह किया जाता है। सरस्वती और गणेश की पूजा इसमें की जाती है।",
    "📚",
    true,
    {
      ...defaultRules,
      notes:
        "Best performed on Panchami (Saraswati Puja), Wednesday (Mercury's day), or Vijayadashami. Avoid Chaturdashi and Amavasya. The student should wear clean, preferably yellow clothes.",
      notesHindi:
        "पंचमी (सरस्वती पूजा), बुधवार या विजयदशमी पर सर्वोत्तम। चतुर्दशी और अमावस्या से बचें। छात्र को स्वच्छ, अधिमानतः पीले वस्त्र पहनने चाहिए।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "janeu-upanayana": mkCeremony(
    "janeu-upanayana",
    "Janeu (Upanayana) Muhurat 2026",
    "जनेऊ (उपनयन) मुहूर्त 2026",
    "Upanayana (Janeu or Yagyopavit ceremony) is the 10th samskara — the sacred thread ceremony. It marks the second birth (dvija) of a Brahmin, Kshatriya, or Vaishya boy and his formal initiation into Vedic studies. The boy receives a sacred thread (yagyopavit) worn across the chest and is taught the Gayatri mantra by his father or the family guru. This ceremony is one of the most significant in Hindu tradition.",
    "उपनयन (जनेऊ संस्कार) दसवाँ संस्कार है — यज्ञोपवीत संस्कार। यह ब्राह्मण, क्षत्रिय या वैश्य बालक के द्विज (दूसरे जन्म) का प्रतीक है और उसे वैदिक अध्ययन में दीक्षित करता है। बालक को पिता या गुरु से गायत्री मंत्र सिखाया जाता है।",
    "🧵",
    true,
    {
      ...defaultRules,
      notes:
        "For Brahmins, performed between ages 8-16; for Kshatriyas between 11-22; for Vaishyas between 12-24. Spring season (Vasanta Ritu) is ideal. Thursday is highly auspicious. The boy must observe celibacy and certain dietary restrictions before and after the ceremony.",
      notesHindi:
        "ब्राह्मणों के लिए 8-16 वर्ष; क्षत्रियों के लिए 11-22 वर्ष; वैश्यों के लिए 12-24 वर्ष के बीच। वसंत ऋतु आदर्श है। गुरुवार अत्यंत शुभ है।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "vivaha-lagna": mkCeremony(
    "vivaha-lagna",
    "Vivaha Lagna Muhurat 2026",
    "विवाह लग्न मुहूर्त 2026",
    "Vivaha Lagna refers to the specific Lagna (rising sign) chosen for the actual marriage ceremony. While Vivah Muhurat gives the overall auspicious dates and windows, Vivaha Lagna focuses on the precise rising sign at the moment of the sacred marriage rites (Saptapadi — seven steps around the sacred fire). Fixed Lagnas (Taurus, Leo, Scorpio, Aquarius) are preferred for lasting marriages. The Lagna should be free from malefic planets.",
    "विवाह लग्न विवाह समारोह के लिए चुना गया विशिष्ट लग्न (उदय राशि) है। यह सप्तपदी (अग्नि के सात फेरे) के समय उदित होने वाली राशि पर ध्यान केंद्रित करता है। स्थायी विवाह के लिए स्थिर लग्न (वृषभ, सिंह, वृश्चिक, कुंभ) पसंद किए जाते हैं।",
    "💒",
    true,
    {
      ...defaultRules,
      notes:
        "The Vivaha Lagna should be free from planets in the 6th, 8th, and 12th houses. The Lagna lord should not be combust. Venus should not be debilitated. Avoid Rahu or Saturn in the Lagna for marriage ceremonies.",
      notesHindi:
        "विवाह लग्न 6th, 8th, 12th भाव में ग्रहों से मुक्त होना चाहिए। लग्नेश अस्त नहीं होना चाहिए। शुक्र नीच का न हो। विवाह में लग्न में राहु या शनि से बचें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  nisheka: mkCeremony(
    "nisheka",
    "Nisheka Muhurat 2026",
    "निषेक मुहूर्त 2026",
    "Nisheka is a pre-conception rite performed before the Garbhadhana samskara. It is a ritual of purification and preparation for the couple before they plan to conceive. Vedic mantras are chanted to invoke blessings from the divine for a healthy, virtuous, and spiritually evolved child. The muhurat for Nisheka is chosen with great care, considering the planetary positions and lunar auspiciousness.",
    "निषेक गर्भाधान संस्कार से पहले किया जाने वाला पूर्व-गर्भाधान संस्कार है। यह दंपत्ति के लिए शुद्धि और तैयारी का अनुष्ठान है। एक स्वस्थ, सदाचारी और आध्यात्मिक रूप से विकसित संतान के लिए ईश्वर का आशीर्वाद प्राप्त करने के लिए वैदिक मंत्रों का जाप किया जाता है।",
    "🌙",
    true,
    defaultRules,
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "shop-opening": mkCeremony(
    "shop-opening",
    "Shop Opening Muhurat 2026",
    "दुकान खोलने का मुहूर्त 2026",
    "A Shop Opening Muhurat ensures that a new business or commercial establishment begins under the most auspicious planetary alignments. Starting a business in a good muhurat is believed to bring sustained prosperity, attract customers, and create a positive commercial atmosphere. The ceremony typically includes a Ganesh Puja, Lakshmi Puja, and the lighting of the first lamp in the new shop.",
    "दुकान खोलने का मुहूर्त सुनिश्चित करता है कि एक नया व्यवसाय या व्यावसायिक प्रतिष्ठान सबसे शुभ ग्रह-स्थिति में शुरू हो। शुभ मुहूर्त में व्यवसाय शुरू करने से निरंतर समृद्धि, ग्राहकों का आगमन और सकारात्मक वाणिज्यिक वातावरण माना जाता है।",
    "🏪",
    true,
    {
      ...defaultRules,
      notes:
        "Wednesday, Thursday, and Friday are ideal for shop openings. Avoid Saturday and Tuesday for new commercial ventures. Perform a Ganesh Puja and Lakshmi Puja before opening. Place Swastika and Om symbols at the entrance.",
      notesHindi:
        "दुकान खोलने के लिए बुधवार, गुरुवार और शुक्रवार आदर्श हैं। नए व्यवसाय के लिए शनिवार और मंगलवार से बचें। खोलने से पहले गणेश पूजा और लक्ष्मी पूजा करें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "money-deposit": mkCeremony(
    "money-deposit",
    "Money Deposit Muhurat 2026",
    "धन जमा मुहूर्त 2026",
    "The Money Deposit Muhurat is an auspicious time for depositing money in a bank, starting a savings scheme, or making an initial financial deposit. In Vedic tradition, beginning financial transactions in a good muhurat is believed to multiply wealth, attract Lakshmi's blessings, and ensure financial security. The ceremony may include a brief Lakshmi prayer before heading to the bank.",
    "धन जमा मुहूर्त बैंक में पैसे जमा करने, बचत योजना शुरू करने या प्रारंभिक वित्तीय जमा करने का शुभ समय है। वैदिक परंपरा में शुभ मुहूर्त में वित्तीय लेनदेन धन बढ़ाता है और लक्ष्मी का आशीर्वाद प्राप्त होता है।",
    "💰",
    true,
    {
      ...defaultRules,
      notes:
        "Thursday (Jupiter's day) and Friday (Venus's day) are most auspicious for financial transactions. Avoid Amavasya and the 8th lunar day (Ashtami) for money matters. Perform a brief Lakshmi Stotra before initiating the deposit.",
      notesHindi:
        "गुरुवार (गुरु का दिन) और शुक्रवार (शुक्र का दिन) वित्तीय लेनदेन के लिए सबसे शुभ हैं। धन के मामलों में अमावस्या और अष्टमी से बचें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "monetary-transaction": mkCeremony(
    "monetary-transaction",
    "Monetary Transaction Muhurat 2026",
    "मौद्रिक लेनदेन मुहूर्त 2026",
    "The Monetary Transaction Muhurat covers all significant financial dealings including large purchases, sales, property settlements, and major fund transfers. Choosing a muhurat for significant money transactions ensures that the exchange is protected from financial loss, fraud, or unforeseen circumstances. A strong Venus and Mercury in the chart are favorable for commercial transactions.",
    "मौद्रिक लेनदेन मुहूर्त में सभी महत्वपूर्ण वित्तीय सौदे शामिल हैं जैसे बड़ी खरीद, बिक्री, संपत्ति निपटान और बड़े फंड ट्रांसफर। मुहूर्त में वित्तीय लेनदेन वित्तीय हानि और अप्रत्याशित परिस्थितियों से सुरक्षा देता है।",
    "💱",
    true,
    defaultRules,
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "loan-taking": mkCeremony(
    "loan-taking",
    "Loan Taking Muhurat 2026",
    "ऋण लेने का मुहूर्त 2026",
    "The Loan Taking Muhurat is the auspicious time to take a loan, credit, or mortgage. While loans are sometimes seen as burdens in Vedic thought, necessity often requires them. Choosing an auspicious muhurat ensures that the loan can be repaid smoothly, without excessive interest burden or financial stress. The muhurat should be when the 6th house (house of debts) is not heavily afflicted and the 11th house (gains) is strong.",
    "ऋण लेने का मुहूर्त ऋण, क्रेडिट या बंधक लेने का शुभ समय है। शुभ मुहूर्त सुनिश्चित करता है कि ऋण बिना अत्यधिक ब्याज बोझ या वित्तीय तनाव के सुचारू रूप से चुकाया जा सके।",
    "🏦",
    true,
    {
      ...defaultRules,
      notes:
        "Avoid 6th house afflictions. Ensure the 11th house (gains/income) lord is strong. Thursday is favorable for taking loans as Jupiter grants wisdom in financial matters. Avoid loan-taking on Amavasya.",
      notesHindi:
        "छठे भाव की पीड़ा से बचें। 11वें भाव (लाभ/आय) का स्वामी बलवान हो। ऋण लेने के लिए गुरुवार अनुकूल है। अमावस्या पर ऋण न लें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "loan-giving": mkCeremony(
    "loan-giving",
    "Loan Giving Muhurat 2026",
    "ऋण देने का मुहूर्त 2026",
    "The Loan Giving Muhurat is the auspicious time to lend money to someone. Lending in a good muhurat is believed to ensure the safe return of the principal along with any agreed interest, protecting the lender from default or loss. A strong 11th house (gains) and weak 12th house (losses) are indicators of a favorable muhurat for lending.",
    "ऋण देने का मुहूर्त किसी को पैसे उधार देने का शुभ समय है। शुभ मुहूर्त में ऋण देना मूलधन की सुरक्षित वापसी सुनिश्चित करता है और ऋणदाता को चूक या हानि से बचाता है।",
    "🤝",
    true,
    {
      ...defaultRules,
      notes:
        "The 11th house lord (gains) should be strong and unafflicted. Avoid lending when Saturn or Rahu is transiting the 11th house. Wednesday and Thursday are favorable for lending money.",
      notesHindi:
        "11वें भाव का स्वामी (लाभ) बलवान और पीड़ित न हो। जब शनि या राहु 11वें भाव से गोचर कर रहे हों तब उधार न दें। उधार देने के लिए बुधवार और गुरुवार अनुकूल।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "insurance-policy": mkCeremony(
    "insurance-policy",
    "Insurance Policy Muhurat 2026",
    "बीमा पॉलिसी मुहूर्त 2026",
    "Taking an insurance policy in a good muhurat is believed to ensure comprehensive coverage, smooth claim settlements, and protection against unforeseen events. The muhurat for insurance should be when the 8th house (house of sudden events and insurance) is not heavily afflicted, and the ascendant lord is strong for personal protection.",
    "शुभ मुहूर्त में बीमा पॉलिसी लेना व्यापक कवरेज, सुचारू दावा निपटान और अप्रत्याशित घटनाओं से सुरक्षा सुनिश्चित करता है। बीमा के लिए मुहूर्त तब होना चाहिए जब 8वाँ भाव (बीमा का भाव) अत्यधिक पीड़ित न हो।",
    "🛡️",
    true,
    defaultRules,
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "tree-plantation": mkCeremony(
    "tree-plantation",
    "Tree Plantation Muhurat 2026",
    "वृक्षारोपण मुहूर्त 2026",
    "Tree Plantation Muhurat marks the auspicious beginning of planting trees, which is considered a highly meritorious (punya) act in Vedic tradition. Trees are sacred — Peepal, Mango, Tulsi, Neem, and Banyan are considered especially holy. Planting in a good muhurat ensures the tree thrives, provides shade and fruits, and brings long-lasting benefits to the family and community.",
    "वृक्षारोपण मुहूर्त पेड़ लगाने का शुभ प्रारंभ है, जो वैदिक परंपरा में अत्यंत पुण्यदायी कार्य माना जाता है। पीपल, आम, तुलसी, नीम और बरगद विशेष पवित्र हैं। शुभ मुहूर्त में लगाया वृक्ष फलता-फूलता है।",
    "🌳",
    true,
    {
      ...defaultRules,
      notes:
        "Best performed during the monsoon season or spring. Choose a Thursday or Monday for planting sacred trees. Avoid Amavasya. Water the newly planted tree with water mixed with Panchagavya (a mixture of five cow products) for best results.",
      notesHindi:
        "मानसून या वसंत ऋतु में सर्वोत्तम। पवित्र वृक्ष लगाने के लिए गुरुवार या सोमवार चुनें। अमावस्या से बचें। नए लगाए वृक्ष को पंचगव्य मिश्रित जल से सींचें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "domestic-help": mkCeremony(
    "domestic-help",
    "Domestic Help Hiring Muhurat 2026",
    "घरेलू सहायक नियुक्ति मुहूर्त 2026",
    "The Domestic Help Muhurat is the auspicious time to hire a new domestic worker, cook, driver, or household helper. In Hindu tradition, a new person entering the household can influence the energy of the home. Starting this relationship under a favorable muhurat ensures harmony, loyalty, long-term service, and a positive domestic environment.",
    "घरेलू सहायक नियुक्ति मुहूर्त नया घरेलू कामगार, रसोइया, चालक या घर का सहायक नियुक्त करने का शुभ समय है। हिंदू परंपरा में घर में प्रवेश करने वाला नया व्यक्ति घर की ऊर्जा को प्रभावित कर सकता है।",
    "🏠",
    true,
    {
      ...defaultRules,
      notes:
        "Choose a Monday, Wednesday, or Thursday for hiring domestic help. The ascendant should be in a fixed sign for stability. Avoid Saturdays and Ashtami tithi. Perform a brief Ganesh Puja when the new helper begins work.",
      notesHindi:
        "घरेलू सहायक नियुक्त करने के लिए सोमवार, बुधवार या गुरुवार चुनें। स्थिरता के लिए लग्न स्थिर राशि में हो। शनिवार और अष्टमी तिथि से बचें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "griha-pravesh": mkCeremony(
    "griha-pravesh",
    "Griha Pravesh Muhurat 2026",
    "गृह प्रवेश मुहूर्त 2026",
    "Griha Pravesh is the sacred housewarming ceremony performed when a family moves into a new home. It involves purifying the home with Vedic rituals, lighting the sacred fire (Havan), installing the deity, and seeking blessings for prosperity, health, and happiness. There are three types: Apoorva (first-time entry), Sapoorva (returning after renovation), and Dwandwah (entering after a death in the family). The muhurat must be chosen carefully based on the owner's horoscope.",
    "गृह प्रवेश परिवार के नए घर में जाने पर किया जाने वाला पवित्र गृह-प्रवेश समारोह है। इसमें वैदिक अनुष्ठानों से घर को शुद्ध करना, पवित्र अग्नि (हवन) जलाना, देवता की स्थापना और समृद्धि, स्वास्थ्य और खुशी के लिए आशीर्वाद लेना शामिल है।",
    "🏡",
    true,
    {
      ...defaultRules,
      notes:
        "Choose a fixed Lagna (Taurus, Leo, Scorpio, or Aquarius) for stability. The entry should be done when the ascendant lord is strong. Tuesday, Saturday, and Amavasya are strictly avoided for Griha Pravesh. The owner of the house should enter first, followed by family members.",
      notesHindi:
        "स्थिरता के लिए स्थिर लग्न चुनें। लग्नेश बलवान होना चाहिए। गृह प्रवेश के लिए मंगलवार, शनिवार और अमावस्या से सख्ती से बचें। घर के मालिक को पहले प्रवेश करना चाहिए।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "vehicle-purchase": mkCeremony(
    "vehicle-purchase",
    "Vehicle Purchase Muhurat 2026",
    "वाहन खरीद मुहूर्त 2026",
    "The Vehicle Purchase Muhurat is the auspicious time to buy a new vehicle — whether a car, motorcycle, truck, or any other mode of transport. In Hindu tradition, a new vehicle is worshipped as a form of the deity associated with vehicles and safe travel. Starting the ownership under a good muhurat is believed to prevent accidents, mechanical failures, and ensure safe, trouble-free travel throughout the vehicle's life.",
    "वाहन खरीद मुहूर्त नया वाहन — कार, मोटरसाइकिल, ट्रक या कोई भी परिवहन साधन — खरीदने का शुभ समय है। शुभ मुहूर्त में वाहन खरीदने से दुर्घटनाओं और यांत्रिक खराबी से बचाव होता है।",
    "🚗",
    true,
    {
      ...defaultRules,
      notes:
        "Wednesday, Thursday, and Friday are ideal for vehicle purchases. Avoid Tuesday (Mars's day — associated with accidents) for vehicle-related purchases. Perform a Saraswati-Puja or Vishwakarma Puja before taking the vehicle home. Drive it with the right foot first.",
      notesHindi:
        "वाहन खरीद के लिए बुधवार, गुरुवार और शुक्रवार आदर्श हैं। वाहन-संबंधी खरीद के लिए मंगलवार (मंगल का दिन — दुर्घटनाओं से संबंधित) से बचें।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),

  "property-purchase": mkCeremony(
    "property-purchase",
    "Property Purchase Muhurat 2026",
    "संपत्ति खरीद मुहूर्त 2026",
    "The Property Purchase Muhurat is the auspicious time for registering or finalizing the purchase of land, flat, house, or any immovable property. This is one of the most significant financial decisions in life. A proper muhurat ensures the property brings prosperity, remains in the family for generations, and is free from Vastu doshas and legal disputes. The 4th house (house of property) should be strong in the muhurat chart.",
    "संपत्ति खरीद मुहूर्त भूमि, फ्लैट, घर या किसी भी अचल संपत्ति की खरीद को पंजीकृत या अंतिम रूप देने का शुभ समय है। शुभ मुहूर्त सुनिश्चित करता है कि संपत्ति समृद्धि लाए, परिवार में पीढ़ियों तक रहे और वास्तु दोषों से मुक्त हो।",
    "🏘️",
    true,
    {
      ...defaultRules,
      notes:
        "The 4th house lord should be strong and aspected by Jupiter. Avoid property purchase when Mars or Saturn is in the 4th house. Thursday is highly auspicious for property-related decisions. Register the property during an auspicious lagna — Taurus or Cancer is ideal.",
      notesHindi:
        "4th भाव का स्वामी बलवान हो और गुरु की दृष्टि हो। जब मंगल या शनि 4th भाव में हो तब संपत्ति न खरीदें। संपत्ति-संबंधी निर्णयों के लिए गुरुवार शुभ है।",
    },
    MAY_AUSPICIOUS,
    JUNE_AUSPICIOUS,
  ),
};

// ── CEREMONY_LIST for navigation ──────────────────────────────────────────────

export const CEREMONY_LIST = Object.values(CEREMONY_DATA).map((c) => ({
  slug: c.slug,
  nameEnglish: c.nameEnglish,
  nameHindi: c.nameHindi,
  icon: c.icon,
}));
