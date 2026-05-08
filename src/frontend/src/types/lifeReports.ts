export type LifeReportType =
  | "daily-horoscope"
  | "love-compatibility"
  | "career"
  | "financial"
  | "marriage"
  | "health"
  | "childbirth"
  | "job-vs-business"
  | "personality"
  | "transit-impact";

export interface LifeReportConfig {
  id: LifeReportType;
  title: string;
  titleHindi: string;
  description: string;
  icon: string;
  price: number;
  formFields: string[];
  includedSections: string[];
}

export const LIFE_REPORT_CONFIGS: LifeReportConfig[] = [
  {
    id: "daily-horoscope",
    title: "Daily Horoscope",
    titleHindi: "दैनिक राशिफल",
    description:
      "आज का विस्तृत राशिफल — ग्रहों की स्थिति के अनुसार आपके दिन का मार्गदर्शन।",
    icon: "☀️",
    price: 99,
    formFields: ["name", "dob", "rashi", "whatsapp"],
    includedSections: [
      "ग्रह स्थिति",
      "शुभ समय",
      "रंग और दिशा",
      "दिन का मंत्र",
      "सावधानी",
    ],
  },
  {
    id: "love-compatibility",
    title: "Love Compatibility",
    titleHindi: "प्रेम अनुकूलता",
    description: "दो जातकों की कुंडली मिलान से प्रेम, विवाह और रिश्ते की गहन जानकारी।",
    icon: "💕",
    price: 299,
    formFields: ["name", "dob", "partnerName", "partnerDob", "whatsapp"],
    includedSections: [
      "गुण मिलान",
      "मांगलिक दोष",
      "रिश्ते की संभावना",
      "शुभ समय",
      "उपाय",
    ],
  },
  {
    id: "career",
    title: "Career Report",
    titleHindi: "करियर रिपोर्ट",
    description:
      "आपकी कुंडली के अनुसार सर्वोत्तम करियर, पदोन्नति का समय और व्यावसायिक सफलता।",
    icon: "💼",
    price: 499,
    formFields: ["name", "dob", "tob", "pob", "currentJob", "whatsapp"],
    includedSections: [
      "कार्यक्षेत्र विश्लेषण",
      "दशा-अंतर्दशा",
      "उन्नति योग",
      "चुनौतियाँ",
      "उपाय",
    ],
  },
  {
    id: "financial",
    title: "Financial Report",
    titleHindi: "वित्त रिपोर्ट",
    description: "धन, संपत्ति और आर्थिक उन्नति के ज्योतिषीय संकेत और निवेश का शुभ समय।",
    icon: "💰",
    price: 499,
    formFields: ["name", "dob", "tob", "pob", "whatsapp"],
    includedSections: [
      "धन भाव विश्लेषण",
      "लाभ-हानि काल",
      "निवेश शुभ समय",
      "संपत्ति योग",
      "उपाय",
    ],
  },
  {
    id: "marriage",
    title: "Marriage Report",
    titleHindi: "विवाह रिपोर्ट",
    description:
      "विवाह का शुभ समय, जीवनसाथी के गुण और वैवाहिक जीवन की संपूर्ण जानकारी।",
    icon: "💍",
    price: 499,
    formFields: ["name", "dob", "tob", "pob", "gender", "whatsapp"],
    includedSections: [
      "विवाह योग",
      "शुभ मुहूर्त",
      "जीवनसाथी विवरण",
      "दाम्पत्य सुख",
      "उपाय",
    ],
  },
  {
    id: "health",
    title: "Health Report",
    titleHindi: "स्वास्थ्य रिपोर्ट",
    description: "ग्रहों के अनुसार स्वास्थ्य संकेत, सावधानी के काल और आयुर्वेदिक उपाय।",
    icon: "🏥",
    price: 399,
    formFields: ["name", "dob", "tob", "pob", "healthConcern", "whatsapp"],
    includedSections: ["स्वास्थ्य भाव", "रोग काल", "सुरक्षा उपाय", "शुभ रत्न", "मंत्र"],
  },
  {
    id: "childbirth",
    title: "Childbirth Report",
    titleHindi: "संतान रिपोर्ट",
    description:
      "संतान प्राप्ति का समय, पुत्र/पुत्री योग और संतान सुख की विस्तृत जानकारी।",
    icon: "👶",
    price: 399,
    formFields: ["name", "dob", "tob", "pob", "partnerDob", "whatsapp"],
    includedSections: [
      "संतान भाव",
      "प्राप्ति काल",
      "लिंग संभावना",
      "दोष निवारण",
      "उपाय",
    ],
  },
  {
    id: "job-vs-business",
    title: "Job vs Business",
    titleHindi: "नौकरी या व्यापार",
    description:
      "आपकी कुंडली बताती है — नौकरी में सफलता होगी या व्यापार में? सही राह चुनें।",
    icon: "🏢",
    price: 299,
    formFields: ["name", "dob", "tob", "pob", "currentStatus", "whatsapp"],
    includedSections: [
      "दशम भाव विश्लेषण",
      "व्यापार योग",
      "नौकरी योग",
      "उत्तम क्षेत्र",
      "उपाय",
    ],
  },
  {
    id: "personality",
    title: "Personality Report",
    titleHindi: "व्यक्तित्व रिपोर्ट",
    description:
      "आपकी जन्म कुंडली के अनुसार आपके स्वभाव, शक्तियों और कमजोरियों का विश्लेषण।",
    icon: "🧠",
    price: 299,
    formFields: ["name", "dob", "tob", "pob", "whatsapp"],
    includedSections: [
      "लग्न विश्लेषण",
      "चंद्र-सूर्य स्वभाव",
      "शक्तियाँ",
      "चुनौतियाँ",
      "विकास उपाय",
    ],
  },
  {
    id: "transit-impact",
    title: "Transit Impact",
    titleHindi: "गोचर प्रभाव",
    description:
      "वर्तमान ग्रह गोचर आपके जीवन को कैसे प्रभावित कर रहे हैं — माह दर माह विश्लेषण।",
    icon: "🪐",
    price: 399,
    formFields: ["name", "dob", "tob", "pob", "period", "whatsapp"],
    includedSections: ["गोचर ग्रह", "शनि गोचर", "राहु-केतु", "शुभ-अशुभ काल", "उपाय"],
  },
];
