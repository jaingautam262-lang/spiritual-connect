import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

// ─── Fixed grid layout ──────────────────────────────────────────────────────
const GRID_POSITIONS = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
] as const;

// ─── Number metadata ────────────────────────────────────────────────────────
interface NumberData {
  aspects: { en: string; hi: string };
  planet: { en: string; hi: string };
  direction: { en: string; hi: string };
  element: { en: string; hi: string };
  colors: { en: string; hi: string };
  body: { en: string; hi: string };
  merit: { en: string; hi: string };
  family: { en: string; hi: string };
  present: { en: string; hi: string };
  missing: { en: string; hi: string };
  remedy: { en: string; hi: string };
  amplified: { en: string; hi: string };
}

const NUMBER_DATA: Record<number, NumberData> = {
  1: {
    aspects: {
      en: "Career, Success, Communication, Individuality",
      hi: "करियर, सफलता, संचार, व्यक्तित्व",
    },
    planet: { en: "Sun (सूर्य)", hi: "सूर्य" },
    direction: { en: "North", hi: "उत्तर" },
    element: { en: "Water", hi: "जल" },
    colors: { en: "Black, Dark Blue", hi: "काला, गहरा नीला" },
    body: { en: "Kidneys, Ears", hi: "गुर्दे, कान" },
    merit: { en: "Career", hi: "करियर" },
    family: { en: "Middle Son", hi: "मध्य पुत्र" },
    present: {
      en: "Strong communicator, confident, career-oriented, determined leader",
      hi: "मजबूत संचारक, आत्मविश्वासी, करियर-उन्मुख, दृढ़ नेता",
    },
    missing: {
      en: "Hesitant to take initiative, difficulty expressing thoughts, low self-confidence",
      hi: "पहल करने में हिचकिचाहट, विचार व्यक्त करने में कठिनाई, कम आत्मविश्वास",
    },
    remedy: {
      en: "Offer water (Arghya) to the rising Sun daily, wear copper ring, practice journaling and public speaking",
      hi: "प्रतिदिन उगते सूर्य को जल चढ़ाएं, तांबे की अंगूठी पहनें, डायरी लेखन और सार्वजनिक भाषण का अभ्यास करें",
    },
    amplified: {
      en: "Dominant personality, strong leadership drive, can become overly assertive",
      hi: "प्रभावशाली व्यक्तित्व, मजबूत नेतृत्व, अत्यधिक आत्म-केंद्रित हो सकते हैं",
    },
  },
  2: {
    aspects: {
      en: "Marriage, Love, Relationship, Sensitivity, Intuition",
      hi: "विवाह, प्रेम, रिश्ते, संवेदनशीलता, अंतर्ज्ञान",
    },
    planet: { en: "Moon (चंद्र)", hi: "चंद्रमा" },
    direction: { en: "South-West", hi: "दक्षिण-पश्चिम" },
    element: { en: "Earth", hi: "पृथ्वी" },
    colors: { en: "Pink, Red, White", hi: "गुलाबी, लाल, सफेद" },
    body: { en: "Abdomen", hi: "पेट" },
    merit: { en: "Marriage & Relationships", hi: "विवाह और रिश्ते" },
    family: { en: "Mother", hi: "माता" },
    present: {
      en: "Intuitive, empathetic, deeply sensitive, nurturing partner",
      hi: "अंतर्ज्ञानी, सहानुभूतिशील, गहरी संवेदनशीलता, पोषण करने वाले",
    },
    missing: {
      en: "Trouble connecting emotionally, difficulty trusting feelings, relationship challenges",
      hi: "भावनात्मक रूप से जुड़ने में परेशानी, भावनाओं पर भरोसा करने में कठिनाई, रिश्तों में चुनौतियां",
    },
    remedy: {
      en: "Strengthen Moon — observe Monday fast, wear white, meditate near water, chant Chandra mantra",
      hi: "चंद्रमा को मजबूत करें — सोमवार का व्रत रखें, सफेद कपड़े पहनें, पानी के पास ध्यान करें, चंद्र मंत्र जपें",
    },
    amplified: {
      en: "Overly sensitive, emotional extremes, may struggle with boundaries in relationships",
      hi: "अत्यधिक संवेदनशील, भावनात्मक अतिरेक, रिश्तों में सीमाएं तय करने में संघर्ष",
    },
  },
  3: {
    aspects: {
      en: "Health, Planning, Imagination, Family, Wisdom",
      hi: "स्वास्थ्य, योजना, कल्पना, परिवार, ज्ञान",
    },
    planet: { en: "Jupiter (गुरु)", hi: "बृहस्पति (गुरु)" },
    direction: { en: "East", hi: "पूर्व" },
    element: { en: "Hard Wood", hi: "कठोर लकड़ी" },
    colors: { en: "Green, Blue", hi: "हरा, नीला" },
    body: { en: "Feet, Knees, Ankles", hi: "पैर, घुटने, टखने" },
    merit: { en: "Health & Family", hi: "स्वास्थ्य और परिवार" },
    family: { en: "Oldest Son", hi: "सबसे बड़ा पुत्र" },
    present: {
      en: "Intelligent, family-oriented, good planner, imaginative and wise",
      hi: "बुद्धिमान, परिवार-उन्मुख, अच्छे योजनाकार, कल्पनाशील और ज्ञानी",
    },
    missing: {
      en: "Reserved communication, struggles with expressing ideas, may neglect health",
      hi: "संचार में झिझक, विचारों को व्यक्त करने में संघर्ष, स्वास्थ्य की उपेक्षा कर सकते हैं",
    },
    remedy: {
      en: "Worship Jupiter (Brihaspati), wear yellow on Thursday, keep green plants in the East, chant Guru mantra",
      hi: "बृहस्पति की पूजा करें, गुरुवार को पीले कपड़े पहनें, पूर्व दिशा में हरे पौधे रखें, गुरु मंत्र जपें",
    },
    amplified: {
      en: "Overconfident, may over-plan without executing, tendency to intellectualize emotions",
      hi: "अत्यधिक आत्मविश्वासी, बिना क्रियान्वयन के अत्यधिक योजना, भावनाओं को तर्कसंगत बनाने की प्रवृत्ति",
    },
  },
  4: {
    aspects: {
      en: "Luck, Money, Discipline, Self-worth, Power",
      hi: "भाग्य, धन, अनुशासन, आत्म-सम्मान, शक्ति",
    },
    planet: { en: "Rahu (राहु / Uranus)", hi: "राहु" },
    direction: { en: "South-East", hi: "दक्षिण-पूर्व" },
    element: { en: "Soft Wood", hi: "नरम लकड़ी" },
    colors: {
      en: "Purple, Red, Green, Blue, Gold",
      hi: "बैंगनी, लाल, हरा, नीला, सोना",
    },
    body: { en: "Thigh, Liver", hi: "जांघ, यकृत" },
    merit: { en: "Wealth", hi: "धन" },
    family: { en: "Oldest Daughter", hi: "सबसे बड़ी पुत्री" },
    present: {
      en: "Disciplined, self-controlled, financially aware, hardworking and systematic",
      hi: "अनुशासित, आत्म-नियंत्रित, आर्थिक रूप से सजग, मेहनती और व्यवस्थित",
    },
    missing: {
      en: "Lack of consistency and planning, financial instability, difficulty maintaining discipline",
      hi: "निरंतरता और योजना की कमी, वित्तीय अस्थिरता, अनुशासन बनाए रखने में कठिनाई",
    },
    remedy: {
      en: "Strengthen Rahu — wear hessonite garnet (Gomedh), introduce structured daily routine, keep South-East zone organized",
      hi: "राहु को मजबूत करें — गोमेद धारण करें, संरचित दैनिक दिनचर्या अपनाएं, दक्षिण-पूर्व क्षेत्र को व्यवस्थित रखें",
    },
    amplified: {
      en: "Overly rigid or controlling, may become obsessed with money and status, fear of change",
      hi: "अत्यधिक कठोर या नियंत्रण करने वाले, धन और स्थिति के प्रति जुनूनी, परिवर्तन का डर",
    },
  },
  5: {
    aspects: {
      en: "Balance, Stability, Fortune, Mental Health, Freedom",
      hi: "संतुलन, स्थिरता, भाग्य, मानसिक स्वास्थ्य, स्वतंत्रता",
    },
    planet: { en: "Mercury (बुध)", hi: "बुध" },
    direction: { en: "Center", hi: "केंद्र" },
    element: { en: "Earth", hi: "पृथ्वी" },
    colors: { en: "Yellow, Brown, Orange", hi: "पीला, भूरा, नारंगी" },
    body: { en: "Internal Organs", hi: "आंतरिक अंग" },
    merit: { en: "Work Energy", hi: "कार्य ऊर्जा" },
    family: { en: "Whole Family", hi: "पूरा परिवार" },
    present: {
      en: "Versatile, balanced thinker, freedom-loving, emotionally stable and adaptable",
      hi: "बहुमुखी, संतुलित विचारक, स्वतंत्रता-प्रेमी, भावनात्मक रूप से स्थिर और अनुकूलनीय",
    },
    missing: {
      en: "Feels stuck, easily bored, emotional instability, difficulty finding inner balance",
      hi: "अटका हुआ महसूस करना, आसानी से ऊब जाना, भावनात्मक अस्थिरता, आंतरिक संतुलन खोजने में कठिनाई",
    },
    remedy: {
      en: "Balance Mercury — wear green, chant Budha mantra on Wednesdays, try new experiences consciously, keep central home space clear",
      hi: "बुध को संतुलित करें — हरे रंग के कपड़े पहनें, बुधवार को बुध मंत्र जपें, जानबूझकर नए अनुभव करें, घर के केंद्रीय स्थान को खुला रखें",
    },
    amplified: {
      en: "Scattered energy, indecisiveness, emotional overwhelm, may struggle with commitment",
      hi: "बिखरी हुई ऊर्जा, निर्णय न ले पाना, भावनात्मक अभिभूति, प्रतिबद्धता में संघर्ष",
    },
  },
  6: {
    aspects: {
      en: "Friends, Travelling, New Beginnings, Spirituality, Father",
      hi: "मित्र, यात्रा, नई शुरुआत, अध्यात्म, पिता",
    },
    planet: { en: "Venus (शुक्र)", hi: "शुक्र" },
    direction: { en: "North-West", hi: "उत्तर-पश्चिम" },
    element: { en: "Hard Metal", hi: "कठोर धातु" },
    colors: { en: "Gray, Black, White", hi: "ग्रे, काला, सफेद" },
    body: { en: "Head", hi: "सिर" },
    merit: { en: "Friends", hi: "मित्र" },
    family: { en: "Father", hi: "पिता" },
    present: {
      en: "Caring, responsible, creative, strong sense of friendship and family harmony",
      hi: "देखभाल करने वाले, जिम्मेदार, रचनात्मक, मित्रता और पारिवारिक सामंजस्य की मजबूत भावना",
    },
    missing: {
      en: "Avoids responsibility, struggles with commitment in friendships, disconnected from home life",
      hi: "जिम्मेदारी से बचना, मित्रता में प्रतिबद्धता में संघर्ष, घरेलू जीवन से अलगाव",
    },
    remedy: {
      en: "Strengthen Venus — wear diamond or opal, observe Friday fasting, wear white, nurture family relationships consciously",
      hi: "शुक्र को मजबूत करें — हीरा या ओपल पहनें, शुक्रवार का व्रत रखें, सफेद पहनें, परिवार के रिश्तों को जानबूझकर पोषित करें",
    },
    amplified: {
      en: "Overprotective, may smother loved ones, difficulty letting go of relationships",
      hi: "अत्यधिक सुरक्षात्मक, प्रियजनों को दबा सकते हैं, रिश्तों को छोड़ने में कठिनाई",
    },
  },
  7: {
    aspects: {
      en: "Children, Creativity, Entertainment, Future, Disappointment",
      hi: "बच्चे, रचनात्मकता, मनोरंजन, भविष्य",
    },
    planet: { en: "Ketu (केतु / Neptune)", hi: "केतु" },
    direction: { en: "West", hi: "पश्चिम" },
    element: { en: "Soft Metal", hi: "नरम धातु" },
    colors: { en: "White, Silver, Gray, Copper", hi: "सफेद, चांदी, ग्रे, तांबा" },
    body: { en: "Mouth, Lungs", hi: "मुंह, फेफड़े" },
    merit: { en: "Children", hi: "बच्चे" },
    family: { en: "Youngest Daughter", hi: "सबसे छोटी पुत्री" },
    present: {
      en: "Spiritually inclined, introspective, philosophical, learns through loss and surrender",
      hi: "आध्यात्मिक रुझान, आत्म-निरीक्षण, दार्शनिक, हानि और समर्पण के माध्यम से सीखते हैं",
    },
    missing: {
      en: "Avoids introspection, struggles with trust and reflection, materialistic outlook",
      hi: "आत्म-निरीक्षण से बचना, भरोसे और चिंतन में संघर्ष, भौतिकवादी दृष्टिकोण",
    },
    remedy: {
      en: "Strengthen Ketu — wear cat's eye (Lehsunia), develop spiritual practice or journaling, spend time in silence and meditation",
      hi: "केतु को मजबूत करें — लहसुनिया पहनें, आध्यात्मिक अभ्यास या डायरी लेखन विकसित करें, मौन और ध्यान में समय बिताएं",
    },
    amplified: {
      en: "Overly detached, may withdraw socially, tendency toward spiritual escapism",
      hi: "अत्यधिक अलग, सामाजिक रूप से पीछे हट सकते हैं, आध्यात्मिक पलायनवाद की प्रवृत्ति",
    },
  },
  8: {
    aspects: {
      en: "Knowledge, Motivation, Intuition, Organized, Study, Spirituality",
      hi: "ज्ञान, प्रेरणा, अंतर्ज्ञान, संगठन, अध्ययन, अध्यात्म",
    },
    planet: { en: "Saturn (शनि)", hi: "शनि" },
    direction: { en: "North-East", hi: "उत्तर-पूर्व" },
    element: { en: "Earth", hi: "पृथ्वी" },
    colors: { en: "Blue, Black, Green", hi: "नीला, काला, हरा" },
    body: { en: "Hands, Body Weight", hi: "हाथ, शरीर का वजन" },
    merit: { en: "Knowledge", hi: "ज्ञान" },
    family: { en: "Youngest Son", hi: "सबसे छोटा पुत्र" },
    present: {
      en: "Wise, responsible, deeply insightful, disciplined learner with strong intuition",
      hi: "ज्ञानी, जिम्मेदार, गहरी अंतर्दृष्टि, मजबूत अंतर्ज्ञान के साथ अनुशासित शिक्षार्थी",
    },
    missing: {
      en: "Lack of financial focus, poor judgment, difficulty building structured knowledge",
      hi: "वित्तीय ध्यान की कमी, खराब निर्णय, संरचित ज्ञान बनाने में कठिनाई",
    },
    remedy: {
      en: "Strengthen Saturn — wear blue sapphire or amethyst, keep Northeast zone orderly, study systematically, observe Saturday discipline",
      hi: "शनि को मजबूत करें — नीलम या नीलांबर (अमेथिस्ट) पहनें, उत्तर-पूर्व क्षेत्र को व्यवस्थित रखें, व्यवस्थित अध्ययन करें, शनिवार का अनुशासन पालन करें",
    },
    amplified: {
      en: "Overly rigid, judgemental, perfectionist tendencies, may struggle with delegation",
      hi: "अत्यधिक कठोर, आलोचनात्मक, पूर्णतावादी प्रवृत्तियां, काम सौंपने में संघर्ष",
    },
  },
  9: {
    aspects: {
      en: "Prosperity, Fame, Reputation, Humanity, Social Life, Ambition",
      hi: "समृद्धि, प्रसिद्धि, प्रतिष्ठा, मानवता, सामाजिक जीवन, महत्वाकांक्षा",
    },
    planet: { en: "Mars (मंगल)", hi: "मंगल" },
    direction: { en: "South", hi: "दक्षिण" },
    element: { en: "Fire", hi: "अग्नि" },
    colors: { en: "Red", hi: "लाल" },
    body: { en: "Heart, Blood, Eyes", hi: "हृदय, रक्त, आंखें" },
    merit: { en: "Fame", hi: "प्रसिद्धि" },
    family: { en: "Middle Daughter", hi: "मध्य पुत्री" },
    present: {
      en: "Ambitious, compassionate, idealistic, socially recognized and philanthropic",
      hi: "महत्वाकांक्षी, दयालु, आदर्शवादी, सामाजिक रूप से मान्यता प्राप्त और परोपकारी",
    },
    missing: {
      en: "Lacks long-term purpose or empathy, unclear vision, struggles with social recognition",
      hi: "दीर्घकालिक उद्देश्य या सहानुभूति की कमी, अस्पष्ट दृष्टि, सामाजिक मान्यता में संघर्ष",
    },
    remedy: {
      en: "Strengthen Mars — wear red coral (Moonga), worship Hanuman on Tuesday, set meaningful goals, surround yourself with warmth and purpose",
      hi: "मंगल को मजबूत करें — मूंगा पहनें, मंगलवार को हनुमान जी की पूजा करें, सार्थक लक्ष्य निर्धारित करें, गर्मजोशी और उद्देश्य से घिरे रहें",
    },
    amplified: {
      en: "Domineering, aggressive, may sacrifice personal relationships for ambition",
      hi: "प्रभुत्वशाली, आक्रामक, महत्वाकांक्षा के लिए व्यक्तिगत संबंधों की बलि दे सकते हैं",
    },
  },
};

// ─── Planes & Arrows data ────────────────────────────────────────────────────
const PLANES = [
  {
    nums: [4, 9, 2],
    type: "Horizontal",
    name: { en: "Mental Plane", hi: "मानसिक तल" },
    meaning: {
      en: "Logic, clarity, creative ideas. When complete: sharp intellect and emotional awareness.",
      hi: "तर्क, स्पष्टता, रचनात्मक विचार। पूर्ण होने पर: तीव्र बुद्धि और भावनात्मक जागरूकता।",
    },
    missing: {
      en: "Confusion, indecision, lack of mental clarity",
      hi: "भ्रम, अनिर्णय, मानसिक स्पष्टता की कमी",
    },
  },
  {
    nums: [3, 5, 7],
    type: "Horizontal",
    name: { en: "Emotional Plane", hi: "भावनात्मक तल" },
    meaning: {
      en: "Empathy, intuition, creativity. When complete: deeply feeling, balanced emotional intelligence.",
      hi: "सहानुभूति, अंतर्ज्ञान, रचनात्मकता। पूर्ण होने पर: गहरी भावना, संतुलित भावनात्मक बुद्धि।",
    },
    missing: {
      en: "Emotional block, detachment, creative stagnation",
      hi: "भावनात्मक अवरोध, अलगाव, रचनात्मक ठहराव",
    },
  },
  {
    nums: [8, 1, 6],
    type: "Horizontal",
    name: { en: "Practical Plane", hi: "व्यावहारिक तल" },
    meaning: {
      en: "Discipline, focus, stability in material world. When complete: grounded and productive.",
      hi: "अनुशासन, ध्यान, भौतिक संसार में स्थिरता। पूर्ण होने पर: जमीन से जुड़े और उत्पादक।",
    },
    missing: {
      en: "Laziness, distraction, lack of practical follow-through",
      hi: "आलस्य, ध्यान भटकना, व्यावहारिक अनुसरण की कमी",
    },
  },
  {
    nums: [4, 3, 8],
    type: "Vertical",
    name: { en: "Thought Arrow", hi: "विचार तीर" },
    meaning: {
      en: "Insight, analysis, deep logical thinking. When complete: strong analytical mind.",
      hi: "अंतर्दृष्टि, विश्लेषण, गहरी तार्किक सोच। पूर्ण होने पर: मजबूत विश्लेषणात्मक मन।",
    },
    missing: { en: "Scattered mind, confusion", hi: "बिखरा हुआ मन, भ्रम" },
  },
  {
    nums: [9, 5, 1],
    type: "Vertical",
    name: { en: "Will Power Arrow", hi: "इच्छाशक्ति तीर" },
    meaning: {
      en: "Willpower, strength, determination. When complete: unstoppable drive and resilience.",
      hi: "इच्छाशक्ति, शक्ति, दृढ़ संकल्प। पूर्ण होने पर: अदम्य इच्छाशक्ति और लचीलापन।",
    },
    missing: {
      en: "Weak will, inconsistency, self-doubt",
      hi: "कमजोर इच्छाशक्ति, असंगति, आत्म-संदेह",
    },
  },
  {
    nums: [2, 7, 6],
    type: "Vertical",
    name: { en: "Action Arrow", hi: "क्रिया तीर" },
    meaning: {
      en: "Action, courage, decisive results. When complete: ability to execute and achieve.",
      hi: "क्रिया, साहस, निर्णायक परिणाम। पूर्ण होने पर: क्रियान्वयन और उपलब्धि की क्षमता।",
    },
    missing: {
      en: "Procrastination, delay, difficulty completing projects",
      hi: "टालमटोल, देरी, परियोजनाएं पूरी करने में कठिनाई",
    },
  },
  {
    nums: [4, 5, 6],
    type: "Diagonal",
    name: { en: "Silver Success Arrow", hi: "रजत सफलता तीर" },
    meaning: {
      en: "Growth, wealth, stability. When complete: steady material and spiritual growth.",
      hi: "विकास, धन, स्थिरता। पूर्ण होने पर: स्थिर भौतिक और आध्यात्मिक विकास।",
    },
    missing: {
      en: "Instability, financial imbalance",
      hi: "अस्थिरता, वित्तीय असंतुलन",
    },
  },
  {
    nums: [2, 5, 8],
    type: "Diagonal",
    name: { en: "Golden Success Arrow", hi: "स्वर्ण सफलता तीर" },
    meaning: {
      en: "Fame, success, fortune. When complete: recognition, prosperity, and social prestige.",
      hi: "प्रसिद्धि, सफलता, भाग्य। पूर्ण होने पर: मान्यता, समृद्धि और सामाजिक प्रतिष्ठा।",
    },
    missing: {
      en: "Self-doubt, struggle for recognition",
      hi: "आत्म-संदेह, मान्यता के लिए संघर्ष",
    },
  },
];

// ─── Calculation logic ───────────────────────────────────────────────────────
function reduceSingle(n: number): number {
  let x = n;
  while (x > 9) {
    x = String(x)
      .split("")
      .reduce((s, c) => s + Number.parseInt(c, 10), 0);
  }
  return x;
}

function calcLoShu(day: number, month: number, year: number) {
  const dobStr = `${String(day).padStart(2, "0")}${String(month).padStart(2, "0")}${year}`;
  const allDigits = dobStr
    .split("")
    .map(Number)
    .filter((d) => d >= 1 && d <= 9);

  const driver = reduceSingle(
    String(day)
      .split("")
      .reduce((s, c) => s + Number.parseInt(c, 10), 0),
  );
  const conductor = reduceSingle(
    dobStr.split("").reduce((s, c) => s + Number.parseInt(c, 10), 0),
  );

  const presentDigits = [...allDigits, driver, conductor];

  const freq: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) freq[i] = 0;
  for (const d of presentDigits) {
    if (d >= 1 && d <= 9) freq[d]++;
  }

  const missing = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => freq[n] === 0);
  const repeated = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => freq[n] > 1);

  return { freq, driver, conductor, missing, repeated };
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function SectionTitle({
  en,
  hi,
  lang,
}: { en: string; hi: string; lang: string }) {
  return (
    <h2
      className="font-heading text-xl md:text-2xl font-bold mb-4"
      style={{ color: "oklch(0.78 0.14 75)" }}
    >
      {lang === "hi" ? hi : en}
    </h2>
  );
}

function InfoCard({
  children,
  alternate,
}: { children: React.ReactNode; alternate?: boolean }) {
  return (
    <section
      className="rounded-2xl p-6"
      style={{
        background: alternate
          ? "oklch(0.21 0.055 25 / 0.7)"
          : "oklch(0.20 0.05 25 / 0.6)",
        border: "1px solid oklch(0.78 0.14 75 / 0.12)",
      }}
    >
      {children}
    </section>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function LoShuGrid() {
  const { language } = useLanguage();
  const l = language;

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcLoShu> | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<
    "present" | "missing" | "repeated" | "planes"
  >("present");

  const canCalc = day !== "" && month !== "" && year !== "";

  const handleCalculate = () => {
    if (!canCalc) return;
    setResult(calcLoShu(Number(day), Number(month), Number(year)));
    setActiveTab("present");
  };

  const inputStyle = {
    background: "oklch(0.18 0.04 25)",
    borderColor: "oklch(0.35 0.08 25)",
    color: "oklch(0.90 0.04 60)",
  };
  const currentYear = new Date().getFullYear();
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months =
    l === "hi"
      ? [
          "जनवरी",
          "फरवरी",
          "मार्च",
          "अप्रैल",
          "मई",
          "जून",
          "जुलाई",
          "अगस्त",
          "सितंबर",
          "अक्टूबर",
          "नवंबर",
          "दिसंबर",
        ]
      : [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const t = {
    title:
      l === "hi" ? "लो शू ग्रिड अंक ज्योतिष" : "Lo Shu Grid Numerology Calculator",
    subtitle:
      l === "hi"
        ? "अपनी जन्म तिथि से लो शू ग्रिड बनाएं — खोएं हुए नंबरों का अर्थ और उपाय जानें"
        : "Generate your Lo Shu Grid from your date of birth — discover missing numbers, meanings, and remedies",
    enterDob: l === "hi" ? "जन्म तिथि दर्ज करें" : "Enter Date of Birth",
    day: l === "hi" ? "दिन" : "Day",
    month: l === "hi" ? "माह" : "Month",
    year: l === "hi" ? "वर्ष" : "Year",
    calculate: l === "hi" ? "लो शू ग्रिड बनाएं" : "Generate Lo Shu Grid",
    driver: l === "hi" ? "चालक अंक" : "Driver Number",
    conductor: l === "hi" ? "संचालक अंक" : "Conductor Number",
    driverDesc:
      l === "hi" ? "(जन्म दिन के अंकों का योग)" : "(sum of birth day digits)",
    conductorDesc:
      l === "hi" ? "(पूर्ण जन्म तिथि के अंकों का योग)" : "(sum of all DOB digits)",
    presentTab: l === "hi" ? "उपस्थित अंक" : "Present Numbers",
    missingTab: l === "hi" ? "अनुपस्थित अंक" : "Missing Numbers",
    repeatedTab: l === "hi" ? "दोहराए गए अंक" : "Repeated Numbers",
    planesTab: l === "hi" ? "तल और तीर" : "Planes & Arrows",
    noMissing:
      l === "hi"
        ? "🎉 सभी 9 अंक उपस्थित हैं — पूर्ण ऊर्जा क्षेत्र!"
        : "🎉 All 9 numbers present — complete energetic field!",
    noRepeated:
      l === "hi"
        ? "कोई दोहराए गए अंक नहीं — सभी ऊर्जाएं संतुलित हैं।"
        : "No repeated numbers — all energies balanced.",
    gridFor: l === "hi" ? "ग्रिड आपकी जन्म तिथि के अनुसार" : "Lo Shu Grid for",
    yourDob: l === "hi" ? "जन्म तिथि" : "Date of Birth",
    present: l === "hi" ? "उपस्थित" : "Present",
    missing: l === "hi" ? "अनुपस्थित" : "Missing",
    remedy: l === "hi" ? "उपाय" : "Remedy",
    amplified: l === "hi" ? "प्रभावित ऊर्जा" : "Amplified Energy",
    planet: l === "hi" ? "ग्रह" : "Planet",
    direction: l === "hi" ? "दिशा" : "Direction",
    element: l === "hi" ? "तत्व" : "Element",
    colors: l === "hi" ? "रंग" : "Colors",
    bodyPart: l === "hi" ? "शरीर का भाग" : "Body Part",
    family: l === "hi" ? "परिवार" : "Family",
    timesPresent: l === "hi" ? "बार" : "times",
    planeComplete: l === "hi" ? "पूर्ण" : "Complete",
    planeIncomplete: l === "hi" ? "अपूर्ण" : "Incomplete",
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.14 0.04 22)" }}
      data-ocid="lo-shu-grid.page"
    >
      {/* Hero */}
      <div
        className="py-10 px-4 text-center"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.18 0.06 22) 0%, oklch(0.14 0.04 22) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <span
            className="font-heading text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.60 0.08 60)" }}
          >
            {l === "hi"
              ? "चीनी फेंग शुई अंक ज्योतिष"
              : "Chinese Feng Shui Numerology"}
          </span>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-3"
            style={{ color: "oklch(0.92 0.10 75)" }}
          >
            {t.title}
          </h1>
          <p
            className="font-body text-sm leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.68 0.05 60)" }}
          >
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Input Card */}
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{
            background: "oklch(0.20 0.05 25)",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
          data-ocid="lo-shu-grid.form"
        >
          <h2
            className="font-heading text-lg font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t.enterDob}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="px-3 py-2.5 rounded-lg text-sm font-body outline-none border"
              style={inputStyle}
              data-ocid="lo-shu-grid.day_select"
            >
              <option value="">{t.day}</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="px-3 py-2.5 rounded-lg text-sm font-body outline-none border"
              style={inputStyle}
              data-ocid="lo-shu-grid.month_select"
            >
              <option value="">{t.month}</option>
              {months.map((mo, i) => (
                <option key={mo} value={i + 1}>
                  {mo}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-3 py-2.5 rounded-lg text-sm font-body outline-none border"
              style={inputStyle}
              data-ocid="lo-shu-grid.year_select"
            >
              <option value="">{t.year}</option>
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleCalculate}
            disabled={!canCalc}
            className="w-full py-3 rounded-xl font-heading font-bold text-sm tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
              boxShadow: "0 4px 16px oklch(0.62 0.18 48 / 0.25)",
            }}
            data-ocid="lo-shu-grid.calculate_button"
          >
            {t.calculate}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6" data-ocid="lo-shu-grid.result">
            {/* Driver & Conductor */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: t.driver,
                  desc: t.driverDesc,
                  value: result.driver,
                  ocid: "lo-shu-grid.driver_number",
                },
                {
                  label: t.conductor,
                  desc: t.conductorDesc,
                  value: result.conductor,
                  ocid: "lo-shu-grid.conductor_number",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl p-5 text-center"
                  style={{
                    background: "oklch(0.20 0.06 26)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                  }}
                  data-ocid={item.ocid}
                >
                  <div
                    className="font-heading text-5xl font-bold mb-1"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {item.value}
                  </div>
                  <div
                    className="font-heading text-sm font-semibold"
                    style={{ color: "oklch(0.85 0.08 70)" }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="font-body text-xs mt-0.5"
                    style={{ color: "oklch(0.55 0.04 55)" }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* 3×3 Grid */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(0.19 0.06 26)",
                border: "2px solid oklch(0.78 0.14 75 / 0.30)",
              }}
            >
              <p
                className="font-heading text-xs text-center uppercase tracking-widest mb-5"
                style={{ color: "oklch(0.60 0.08 60)" }}
              >
                {l === "hi"
                  ? "चीनी फेंग शुई लो शू ग्रिड चार्ट"
                  : "Chinese Feng Shui Lo Shu Grid Chart"}
              </p>
              <div className="flex justify-center">
                <table
                  className="border-collapse w-full max-w-sm"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.20)" }}
                >
                  <tbody>
                    {GRID_POSITIONS.map((row) => (
                      <tr key={`row-${row[0]}-${row[1]}-${row[2]}`}>
                        {row.map((num) => {
                          const count = result.freq[num] ?? 0;
                          const isMissing = count === 0;
                          const isStrong = count > 1;
                          const data = NUMBER_DATA[num];
                          return (
                            <td
                              key={`cell-${num}`}
                              className="text-center align-middle p-1.5 sm:p-2"
                              style={{
                                border:
                                  "1.5px solid oklch(0.78 0.14 75 / 0.20)",
                                background: isMissing
                                  ? "oklch(0.17 0.03 24)"
                                  : isStrong
                                    ? "oklch(0.68 0.20 48 / 0.18)"
                                    : "oklch(0.22 0.06 26)",
                                width: "33.33%",
                                height: "90px",
                              }}
                            >
                              <div
                                className="font-heading font-bold text-xl sm:text-2xl leading-none mb-0.5"
                                style={{
                                  color: isMissing
                                    ? "oklch(0.38 0.04 38)"
                                    : isStrong
                                      ? "oklch(0.72 0.20 52)"
                                      : "oklch(0.78 0.14 75)",
                                }}
                              >
                                {isMissing
                                  ? "—"
                                  : num.toString().repeat(Math.min(count, 3))}
                              </div>
                              <div
                                className="font-heading font-semibold text-xs"
                                style={{
                                  color: isMissing
                                    ? "oklch(0.38 0.04 38)"
                                    : "oklch(0.65 0.07 62)",
                                }}
                              >
                                {num}
                              </div>
                              <div
                                className="font-body leading-tight mt-0.5 hidden sm:block"
                                style={{
                                  color: isMissing
                                    ? "oklch(0.36 0.03 38)"
                                    : "oklch(0.52 0.05 56)",
                                  fontSize: "0.58rem",
                                }}
                              >
                                {l === "hi" ? data.merit.hi : data.merit.en}
                              </div>
                              <div
                                className="font-body mt-0.5 hidden sm:block"
                                style={{
                                  color: "oklch(0.46 0.04 50)",
                                  fontSize: "0.52rem",
                                }}
                              >
                                {l === "hi"
                                  ? data.direction.hi
                                  : data.direction.en}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Legend */}
              <div
                className="flex flex-wrap gap-4 justify-center mt-5 text-xs font-body"
                style={{ color: "oklch(0.60 0.04 55)" }}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded"
                    style={{
                      background: "oklch(0.22 0.06 26)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                    }}
                  />
                  {l === "hi" ? "उपस्थित" : "Present"}
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.18)",
                      border: "1px solid oklch(0.72 0.20 52 / 0.5)",
                    }}
                  />
                  {l === "hi" ? "दोहराया" : "Repeated"}
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded"
                    style={{
                      background: "oklch(0.17 0.03 24)",
                      border: "1px solid oklch(0.38 0.04 38 / 0.5)",
                    }}
                  />
                  {l === "hi" ? "अनुपस्थित" : "Missing"}
                </span>
              </div>
            </div>

            {/* Tab nav */}
            <div className="flex flex-wrap gap-2" role="tablist">
              {(["present", "missing", "repeated", "planes"] as const).map(
                (tab) => {
                  const labels = {
                    present: t.presentTab,
                    missing: t.missingTab,
                    repeated: t.repeatedTab,
                    planes: t.planesTab,
                  };
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab}
                      onClick={() => setActiveTab(tab)}
                      className="px-4 py-2 rounded-lg font-heading text-xs font-semibold transition-all duration-200"
                      style={{
                        background:
                          activeTab === tab
                            ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                            : "oklch(0.20 0.05 25)",
                        color:
                          activeTab === tab ? "white" : "oklch(0.65 0.06 60)",
                        border:
                          activeTab === tab
                            ? "none"
                            : "1px solid oklch(0.78 0.14 75 / 0.20)",
                      }}
                      data-ocid={`lo-shu-grid.tab.${tab}`}
                    >
                      {labels[tab]}
                    </button>
                  );
                },
              )}
            </div>

            {/* Tab: Present Numbers */}
            {activeTab === "present" && (
              <div
                className="space-y-4"
                data-ocid="lo-shu-grid.present_section"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9]
                  .filter((n) => result.freq[n] > 0)
                  .map((num, idx) => {
                    const d = NUMBER_DATA[num];
                    return (
                      <div
                        key={`present-${num}`}
                        className="rounded-2xl p-5"
                        style={{
                          background: "oklch(0.20 0.05 25)",
                          border: "1px solid oklch(0.78 0.14 75 / 0.18)",
                        }}
                        data-ocid={`lo-shu-grid.present.item.${idx + 1}`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-heading text-xl font-bold"
                            style={{
                              background: "oklch(0.68 0.20 48 / 0.20)",
                              color: "oklch(0.78 0.14 75)",
                              border: "1px solid oklch(0.78 0.14 75 / 0.30)",
                            }}
                          >
                            {num}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span
                                className="font-heading text-sm font-bold"
                                style={{ color: "oklch(0.85 0.08 72)" }}
                              >
                                {l === "hi" ? d.aspects.hi : d.aspects.en}
                              </span>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-heading"
                                style={{
                                  background: "oklch(0.68 0.20 48 / 0.15)",
                                  color: "oklch(0.75 0.12 56)",
                                }}
                              >
                                ×{result.freq[num]} {t.timesPresent}
                              </span>
                            </div>
                            <p
                              className="font-body text-xs leading-relaxed mb-3"
                              style={{ color: "oklch(0.68 0.04 60)" }}
                            >
                              {l === "hi" ? d.present.hi : d.present.en}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {[
                                {
                                  label: t.planet,
                                  value: l === "hi" ? d.planet.hi : d.planet.en,
                                },
                                {
                                  label: t.direction,
                                  value:
                                    l === "hi"
                                      ? d.direction.hi
                                      : d.direction.en,
                                },
                                {
                                  label: t.element,
                                  value:
                                    l === "hi" ? d.element.hi : d.element.en,
                                },
                                {
                                  label: t.colors,
                                  value: l === "hi" ? d.colors.hi : d.colors.en,
                                },
                                {
                                  label: t.bodyPart,
                                  value: l === "hi" ? d.body.hi : d.body.en,
                                },
                                {
                                  label: t.family,
                                  value: l === "hi" ? d.family.hi : d.family.en,
                                },
                              ].map((item) => (
                                <div
                                  key={item.label}
                                  className="rounded-lg px-3 py-2"
                                  style={{
                                    background: "oklch(0.17 0.04 24)",
                                    border:
                                      "1px solid oklch(0.78 0.14 75 / 0.10)",
                                  }}
                                >
                                  <div
                                    className="font-heading text-xs"
                                    style={{
                                      color: "oklch(0.55 0.06 55)",
                                      fontSize: "0.6rem",
                                    }}
                                  >
                                    {item.label}
                                  </div>
                                  <div
                                    className="font-body text-xs font-medium mt-0.5"
                                    style={{ color: "oklch(0.75 0.06 65)" }}
                                  >
                                    {item.value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Tab: Missing Numbers */}
            {activeTab === "missing" && (
              <div
                className="space-y-4"
                data-ocid="lo-shu-grid.missing_section"
              >
                {result.missing.length === 0 ? (
                  <div
                    className="rounded-2xl p-8 text-center"
                    style={{
                      background: "oklch(0.20 0.05 25)",
                      border: "1px solid oklch(0.65 0.16 140 / 0.30)",
                    }}
                  >
                    <p
                      className="font-heading text-lg font-bold"
                      style={{ color: "oklch(0.72 0.12 140)" }}
                    >
                      {t.noMissing}
                    </p>
                  </div>
                ) : (
                  result.missing.map((num, idx) => {
                    const d = NUMBER_DATA[num];
                    return (
                      <div
                        key={`missing-${num}`}
                        className="rounded-2xl p-5"
                        style={{
                          background: "oklch(0.19 0.04 24)",
                          border: "1px solid oklch(0.55 0.10 30 / 0.30)",
                        }}
                        data-ocid={`lo-shu-grid.missing.item.${idx + 1}`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-heading text-xl font-bold"
                            style={{
                              background: "oklch(0.22 0.05 26)",
                              color: "oklch(0.50 0.08 45)",
                              border: "1px solid oklch(0.40 0.06 35 / 0.40)",
                            }}
                          >
                            {num}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="font-heading text-sm font-bold mb-1"
                              style={{ color: "oklch(0.80 0.08 65)" }}
                            >
                              {l === "hi" ? d.aspects.hi : d.aspects.en}
                            </div>
                            <p
                              className="font-body text-xs leading-relaxed mb-3"
                              style={{ color: "oklch(0.60 0.04 55)" }}
                            >
                              {l === "hi" ? d.missing.hi : d.missing.en}
                            </p>
                            <div
                              className="rounded-xl p-3"
                              style={{
                                background: "oklch(0.68 0.20 48 / 0.10)",
                                border: "1px solid oklch(0.68 0.20 48 / 0.25)",
                              }}
                            >
                              <div
                                className="font-heading text-xs font-semibold mb-1"
                                style={{
                                  color: "oklch(0.78 0.14 75)",
                                  fontSize: "0.65rem",
                                }}
                              >
                                {l === "hi" ? "✦ उपाय (Remedy)" : "✦ Remedy"}
                              </div>
                              <p
                                className="font-body text-xs leading-relaxed"
                                style={{ color: "oklch(0.72 0.06 65)" }}
                              >
                                {l === "hi" ? d.remedy.hi : d.remedy.en}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Tab: Repeated Numbers */}
            {activeTab === "repeated" && (
              <div
                className="space-y-4"
                data-ocid="lo-shu-grid.repeated_section"
              >
                {result.repeated.length === 0 ? (
                  <div
                    className="rounded-2xl p-8 text-center"
                    style={{
                      background: "oklch(0.20 0.05 25)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                    }}
                  >
                    <p
                      className="font-heading text-base"
                      style={{ color: "oklch(0.68 0.06 60)" }}
                    >
                      {t.noRepeated}
                    </p>
                  </div>
                ) : (
                  result.repeated.map((num, idx) => {
                    const d = NUMBER_DATA[num];
                    return (
                      <div
                        key={`repeated-${num}`}
                        className="rounded-2xl p-5"
                        style={{
                          background: "oklch(0.20 0.06 26)",
                          border: "1px solid oklch(0.68 0.20 48 / 0.28)",
                        }}
                        data-ocid={`lo-shu-grid.repeated.item.${idx + 1}`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-heading text-xl font-bold"
                            style={{
                              background: "oklch(0.68 0.20 48 / 0.22)",
                              color: "oklch(0.78 0.14 75)",
                              border: "1px solid oklch(0.78 0.14 75 / 0.40)",
                            }}
                          >
                            {num
                              .toString()
                              .repeat(Math.min(result.freq[num], 3))}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="font-heading text-sm font-bold"
                                style={{ color: "oklch(0.85 0.08 72)" }}
                              >
                                {l === "hi" ? d.aspects.hi : d.aspects.en}
                              </span>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-heading"
                                style={{
                                  background: "oklch(0.68 0.20 48 / 0.20)",
                                  color: "oklch(0.78 0.14 75)",
                                }}
                              >
                                ×{result.freq[num]}
                              </span>
                            </div>
                            <p
                              className="font-body text-xs leading-relaxed mb-2"
                              style={{ color: "oklch(0.68 0.04 60)" }}
                            >
                              {l === "hi" ? d.amplified.hi : d.amplified.en}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {[
                                {
                                  label: t.planet,
                                  value: l === "hi" ? d.planet.hi : d.planet.en,
                                },
                                {
                                  label: t.direction,
                                  value:
                                    l === "hi"
                                      ? d.direction.hi
                                      : d.direction.en,
                                },
                                {
                                  label: t.element,
                                  value:
                                    l === "hi" ? d.element.hi : d.element.en,
                                },
                              ].map((item) => (
                                <div
                                  key={item.label}
                                  className="rounded-lg px-3 py-2"
                                  style={{
                                    background: "oklch(0.17 0.04 24)",
                                    border:
                                      "1px solid oklch(0.78 0.14 75 / 0.10)",
                                  }}
                                >
                                  <div
                                    className="font-heading text-xs"
                                    style={{
                                      color: "oklch(0.55 0.06 55)",
                                      fontSize: "0.6rem",
                                    }}
                                  >
                                    {item.label}
                                  </div>
                                  <div
                                    className="font-body text-xs font-medium mt-0.5"
                                    style={{ color: "oklch(0.75 0.06 65)" }}
                                  >
                                    {item.value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Tab: Planes & Arrows */}
            {activeTab === "planes" && (
              <div className="space-y-4" data-ocid="lo-shu-grid.planes_section">
                {PLANES.map((plane, idx) => {
                  const isComplete = plane.nums.every(
                    (n) => (result.freq[n] ?? 0) > 0,
                  );
                  const planeKey = `${plane.type}-${plane.nums.join("-")}`;
                  return (
                    <div
                      key={planeKey}
                      className="rounded-2xl p-5"
                      style={{
                        background: isComplete
                          ? "oklch(0.20 0.06 26)"
                          : "oklch(0.19 0.04 24)",
                        border: isComplete
                          ? "1px solid oklch(0.68 0.20 48 / 0.30)"
                          : "1px solid oklch(0.45 0.06 30 / 0.25)",
                      }}
                      data-ocid={`lo-shu-grid.plane.item.${idx + 1}`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div
                            className="font-heading text-sm font-bold"
                            style={{ color: "oklch(0.82 0.10 70)" }}
                          >
                            {l === "hi" ? plane.name.hi : plane.name.en}
                            <span
                              className="font-body text-xs ml-2"
                              style={{ color: "oklch(0.55 0.04 55)" }}
                            >
                              ({plane.nums.join("-")})
                            </span>
                          </div>
                          <div
                            className="font-body text-xs mt-0.5"
                            style={{ color: "oklch(0.55 0.04 50)" }}
                          >
                            {plane.type}
                          </div>
                        </div>
                        <span
                          className="shrink-0 px-2.5 py-1 rounded-full font-heading text-xs font-semibold"
                          style={{
                            background: isComplete
                              ? "oklch(0.65 0.16 140 / 0.20)"
                              : "oklch(0.35 0.08 30 / 0.20)",
                            color: isComplete
                              ? "oklch(0.72 0.12 140)"
                              : "oklch(0.58 0.08 45)",
                          }}
                        >
                          {isComplete ? t.planeComplete : t.planeIncomplete}
                        </span>
                      </div>
                      <div className="flex gap-2 mb-3">
                        {plane.nums.map((n) => {
                          const present = (result.freq[n] ?? 0) > 0;
                          return (
                            <span
                              key={`pn-${n}`}
                              className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-sm"
                              style={{
                                background: present
                                  ? "oklch(0.68 0.20 48 / 0.20)"
                                  : "oklch(0.18 0.03 24)",
                                color: present
                                  ? "oklch(0.78 0.14 75)"
                                  : "oklch(0.38 0.04 38)",
                                border: `1px solid ${present ? "oklch(0.78 0.14 75 / 0.30)" : "oklch(0.35 0.04 35 / 0.30)"}`,
                              }}
                            >
                              {n}
                            </span>
                          );
                        })}
                      </div>
                      <p
                        className="font-body text-xs leading-relaxed"
                        style={{
                          color: isComplete
                            ? "oklch(0.70 0.05 62)"
                            : "oklch(0.58 0.04 52)",
                        }}
                      >
                        {isComplete
                          ? l === "hi"
                            ? plane.meaning.hi
                            : plane.meaning.en
                          : l === "hi"
                            ? plane.missing.hi
                            : plane.missing.en}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Informational sections ── */}
        <InfoCard>
          <SectionTitle
            en="What is a Lo Shu Grid?"
            hi="लो शू ग्रिड क्या है?"
            lang={l}
          />
          <div
            className="font-body text-sm leading-relaxed space-y-3"
            style={{ color: "oklch(0.70 0.04 62)" }}
          >
            <p>
              {l === "hi"
                ? "लो शू ग्रिड चीन में एक बुद्धिमान राजा द्वारा उत्पन्न हुई। यह चीनी अंक ज्योतिष 3×3 के जादुई वर्ग पर आधारित है जिसमें अंकों का स्थान नहीं बदलता और इसका योग हमेशा 15 होता है। इसमें देखा जाता है कि कौन सा अंक उपस्थित है और कौन सा अनुपस्थित, और किसी अंक की कितनी बार पुनरावृत्ति हुई है।"
                : "Lo Shu Grid numerology originated in ancient China, based on a 3×3 magic square where the rows, columns, and diagonals always sum to 15. By placing the digits of your birth date into the grid, it reveals which energies are strong, absent, or amplified in your life."}
            </p>
            <p>
              {l === "hi"
                ? "लो शू ग्रिड को फेंग शुई अंक ज्योतिष भी कहा जाता है। पाँच तत्व और मुख्यतः आठ दिशाएं इस ग्रिड में विशेष महत्व रखती हैं। 1 से 9 तक के प्रत्येक अंक का एक निश्चित तत्व, दिशा और ग्रह होता है।"
                : "Also known as Feng Shui numerology, the Lo Shu Grid assigns each number 1–9 a fixed element, direction, ruling planet, color, and body correspondence. The five elements and eight directions hold special significance in this system."}
            </p>
          </div>
        </InfoCard>

        <InfoCard alternate>
          <SectionTitle
            en="How to Calculate Your Lo Shu Grid"
            hi="लो शू ग्रिड की गणना कैसे करें"
            lang={l}
          />
          <div
            className="font-body text-sm leading-relaxed space-y-3"
            style={{ color: "oklch(0.70 0.04 62)" }}
          >
            <p>
              {l === "hi"
                ? "उदाहरण के लिए जन्म तिथि 15/03/1977 के लिए:"
                : "Example: For D.O.B 15/03/1977:"}
            </p>
            <ol className="space-y-2 list-none pl-0">
              {[
                {
                  en: "Extract all digits from the full date: 1, 5, 0, 3, 1, 9, 7, 7 → remove 0s → [1, 5, 3, 1, 9, 7, 7]",
                  hi: "पूर्ण तिथि से सभी अंक निकालें: 1, 5, 0, 3, 1, 9, 7, 7 → 0 हटाएं → [1, 5, 3, 1, 9, 7, 7]",
                },
                {
                  en: "Driver Number = sum day digits to single digit: 1+5 = 6",
                  hi: "चालक अंक = दिन के अंकों का एकल अंक तक योग: 1+5 = 6",
                },
                {
                  en: "Conductor Number = sum all DOB digits to single digit: 1+5+0+3+1+9+7+7 = 33 → 3+3 = 6",
                  hi: "संचालक अंक = सभी DOB अंकों का एकल अंक तक योग: 1+5+0+3+1+9+7+7 = 33 → 3+3 = 6",
                },
                {
                  en: "Add Driver (6) and Conductor (6) to the array: [1,5,3,1,9,7,7,6,6]",
                  hi: "चालक (6) और संचालक (6) को सरणी में जोड़ें: [1,5,3,1,9,7,7,6,6]",
                },
                {
                  en: "Count frequency of each digit 1–9. Missing = those with 0 count. Repeated = those with 2+ count.",
                  hi: "1–9 प्रत्येक अंक की आवृत्ति गिनें। अनुपस्थित = शून्य गणना वाले। दोहराए गए = 2+ गणना वाले।",
                },
              ].map((step, i) => (
                <li key={step.en} className="flex gap-3">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-heading font-bold text-xs"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.20)",
                      color: "oklch(0.78 0.14 75)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span>{l === "hi" ? step.hi : step.en}</span>
                </li>
              ))}
            </ol>
          </div>
        </InfoCard>

        <InfoCard>
          <SectionTitle
            en="The Five Elements in Lo Shu Grid"
            hi="लो शू ग्रिड में पाँच तत्व"
            lang={l}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                element: { en: "Water (जल)", hi: "जल (Water)" },
                nums: "1",
                color: "oklch(0.55 0.12 220)",
                desc: {
                  en: "Career, communication, flow of life",
                  hi: "करियर, संचार, जीवन प्रवाह",
                },
              },
              {
                element: { en: "Hard Wood (कठोर लकड़ी)", hi: "कठोर लकड़ी" },
                nums: "3",
                color: "oklch(0.60 0.14 140)",
                desc: {
                  en: "Health, family, planning, wisdom",
                  hi: "स्वास्थ्य, परिवार, योजना, ज्ञान",
                },
              },
              {
                element: { en: "Soft Wood (नरम लकड़ी)", hi: "नरम लकड़ी" },
                nums: "4",
                color: "oklch(0.65 0.16 145)",
                desc: {
                  en: "Wealth, discipline, self-worth",
                  hi: "धन, अनुशासन, आत्म-सम्मान",
                },
              },
              {
                element: { en: "Fire (अग्नि)", hi: "अग्नि (Fire)" },
                nums: "9",
                color: "oklch(0.62 0.18 30)",
                desc: {
                  en: "Fame, passion, social recognition",
                  hi: "प्रसिद्धि, जुनून, सामाजिक मान्यता",
                },
              },
              {
                element: { en: "Earth (पृथ्वी)", hi: "पृथ्वी (Earth)" },
                nums: "2, 5, 8",
                color: "oklch(0.68 0.12 60)",
                desc: {
                  en: "Stability, intuition, knowledge, balance",
                  hi: "स्थिरता, अंतर्ज्ञान, ज्ञान, संतुलन",
                },
              },
              {
                element: { en: "Hard Metal (कठोर धातु)", hi: "कठोर धातु" },
                nums: "6",
                color: "oklch(0.65 0.06 210)",
                desc: {
                  en: "Friendship, travel, new beginnings",
                  hi: "मित्रता, यात्रा, नई शुरुआत",
                },
              },
              {
                element: { en: "Soft Metal (नरम धातु)", hi: "नरम धातु" },
                nums: "7",
                color: "oklch(0.72 0.04 200)",
                desc: {
                  en: "Creativity, children, spiritual learning",
                  hi: "रचनात्मकता, बच्चे, आध्यात्मिक शिक्षा",
                },
              },
            ].map((item) => (
              <div
                key={item.nums}
                className="flex gap-3 items-start rounded-xl p-3"
                style={{
                  background: "oklch(0.17 0.04 24)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.08)",
                }}
              >
                <span
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-xs"
                  style={{
                    background: `${item.color} / 0.2`,
                    color: item.color,
                    border: `1px solid ${item.color} / 0.30`,
                  }}
                >
                  {item.nums}
                </span>
                <div>
                  <div
                    className="font-heading text-xs font-semibold"
                    style={{ color: "oklch(0.78 0.06 68)" }}
                  >
                    {l === "hi" ? item.element.hi : item.element.en}
                  </div>
                  <div
                    className="font-body text-xs mt-0.5"
                    style={{ color: "oklch(0.60 0.04 55)" }}
                  >
                    {l === "hi" ? item.desc.hi : item.desc.en}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard alternate>
          <SectionTitle en="The Eight Directions" hi="आठ दिशाएं" lang={l} />
          <div className="overflow-x-auto">
            <table
              className="w-full text-xs font-body"
              style={{ borderCollapse: "separate", borderSpacing: "0 4px" }}
            >
              <thead>
                <tr>
                  {[
                    l === "hi" ? "अंक" : "Number",
                    l === "hi" ? "दिशा" : "Direction",
                    l === "hi" ? "ग्रह" : "Planet",
                    l === "hi" ? "रंग" : "Colors",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 font-heading font-semibold"
                      style={{
                        color: "oklch(0.65 0.08 62)",
                        fontSize: "0.7rem",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
                  const d = NUMBER_DATA[n];
                  return (
                    <tr
                      key={`dir-${n}`}
                      style={{ background: "oklch(0.17 0.04 24)" }}
                    >
                      <td
                        className="px-3 py-2 rounded-l-lg font-heading font-bold"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {n}
                      </td>
                      <td
                        className="px-3 py-2"
                        style={{ color: "oklch(0.70 0.05 62)" }}
                      >
                        {l === "hi" ? d.direction.hi : d.direction.en}
                      </td>
                      <td
                        className="px-3 py-2"
                        style={{ color: "oklch(0.68 0.06 62)" }}
                      >
                        {l === "hi" ? d.planet.hi : d.planet.en}
                      </td>
                      <td
                        className="px-3 py-2 rounded-r-lg"
                        style={{ color: "oklch(0.62 0.05 58)" }}
                      >
                        {l === "hi" ? d.colors.hi : d.colors.en}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </InfoCard>

        <InfoCard>
          <SectionTitle
            en="Missing Numbers — Tendencies & Growth Tips"
            hi="अनुपस्थित अंक — प्रवृत्तियां और विकास सुझाव"
            lang={l}
          />
          <p
            className="font-body text-sm mb-4"
            style={{ color: "oklch(0.68 0.04 60)" }}
          >
            {l === "hi"
              ? "अनुपस्थित अंकों का अर्थ कुछ नकारात्मक नहीं है — वे विकास के अवसर दर्शाते हैं। जब कोई अंक ग्रिड में नहीं होता, तो उससे जुड़े क्षेत्रों में ऊर्जा की कमी होती है।"
              : "Missing numbers don't imply negative fate — they show growth opportunities. When a number is absent, there may be a deficiency in that life area which conscious effort and targeted remedies can balance."}
          </p>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
              const d = NUMBER_DATA[num];
              return (
                <div
                  key={`tip-${num}`}
                  className="flex gap-3 items-start rounded-xl p-3"
                  style={{ background: "oklch(0.17 0.04 24)" }}
                >
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-heading font-bold text-sm"
                    style={{
                      background: "oklch(0.25 0.06 26)",
                      color: "oklch(0.65 0.10 52)",
                      border: "1px solid oklch(0.45 0.06 35 / 0.35)",
                    }}
                  >
                    {num}
                  </span>
                  <div>
                    <span
                      className="font-heading text-xs font-semibold"
                      style={{ color: "oklch(0.75 0.07 65)" }}
                    >
                      {l === "hi"
                        ? d.missing.hi.split(",")[0]
                        : d.missing.en.split(",")[0]}
                    </span>
                    <span
                      className="font-body text-xs ml-1.5"
                      style={{ color: "oklch(0.58 0.04 52)" }}
                    >
                      —{" "}
                      {l === "hi"
                        ? d.remedy.hi.split("—")[0] || d.remedy.hi.split(",")[0]
                        : d.remedy.en.split("—")[0] ||
                          d.remedy.en.split(",")[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </InfoCard>

        {/* CTA */}
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.20 0.07 28) 0%, oklch(0.17 0.06 24) 100%)",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
          data-ocid="lo-shu-grid.cta"
        >
          <h2
            className="font-heading text-xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {l === "hi"
              ? "व्यक्तिगत लो शू ग्रिड विश्लेषण पाएं"
              : "Get Personalized Lo Shu Grid Analysis"}
          </h2>
          <p
            className="font-body text-sm mb-5 max-w-lg mx-auto"
            style={{ color: "oklch(0.65 0.05 60)" }}
          >
            {l === "hi"
              ? "हमारे अनुभवी ज्योतिषी आपकी पूर्ण जन्म कुंडली के साथ लो शू ग्रिड का गहन विश्लेषण करेंगे।"
              : "Our expert astrologers will provide an in-depth Lo Shu Grid analysis along with your complete birth chart and personalized Vedic remedies."}
          </p>
          <a
            href="/astrologer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-bold text-sm transition-all duration-200 hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
            data-ocid="lo-shu-grid.consult_link"
          >
            {l === "hi" ? "ज्योतिषी से बात करें" : "Talk to Astrologer →"}
          </a>
        </div>
      </div>
    </div>
  );
}
