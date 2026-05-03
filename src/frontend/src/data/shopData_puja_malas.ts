// shopData_puja_malas.ts — Puja Kits and Malas (new additions)

import type { Product } from "../types/backend-types";

export const PUJA_KIT_PRODUCTS: Product[] = [
  {
    id: "kit-satyanarayan",
    name: "सत्यनारायण पूजा किट",
    category: "Puja Kits",
    price: 1299,
    description:
      "सम्पूर्ण सत्यनारायण पूजा किट — कलश, पंचामृत, पीला वस्त्र, केला, पान, सुपारी, कुमकुम, हल्दी, अक्षत, गंगाजल, दीपक, अगरबत्ती, कथा पुस्तक।",
    benefits: "घर में सुख-समृद्धि, भगवान विष्णु कृपा, मनोकामना पूर्ति",
    astrologicalPurpose: "विष्णु, बृहस्पति",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "kit-navratri",
    name: "नवरात्रि पूजा किट",
    category: "Puja Kits",
    price: 1599,
    description:
      "नवरात्रि की सम्पूर्ण पूजा किट — दुर्गा मूर्ति, लाल वस्त्र, चुनरी, नारियल, जौ बोने का पात्र, कुमकुम, सिंदूर, कमल गट्टे, अगरबत्ती, दीपक, माँ का श्रृंगार।",
    benefits: "नवदुर्गा का आशीर्वाद, शक्ति प्राप्ति, पापों से मुक्ति",
    astrologicalPurpose: "दुर्गा, चंद्र",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
  {
    id: "kit-ganesh",
    name: "गणेश पूजा किट",
    category: "Puja Kits",
    price: 999,
    description:
      "गणेश चतुर्थी और विशेष पूजा किट — मिट्टी की मूर्ति, लाल/पीला वस्त्र, मोदक, दूर्वा, जनेऊ, पंचमेवा, कुमकुम, सिंदूर, अगरबत्ती, दीपक।",
    benefits: "विघ्न नाश, नई शुरुआत में सफलता, बुद्धि और समृद्धि",
    astrologicalPurpose: "गणेश, केतु",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "kit-diwali",
    name: "दीपावली पूजा किट",
    category: "Puja Kits",
    price: 1799,
    description:
      "दीपावली लक्ष्मी-गणेश पूजा किट — मूर्ति, दीपमाला, कमल गट्टा, कौड़ी, चांदी का सिक्का, कुमकुम, हल्दी, अक्षत, गंगाजल, धूप, 21 दीपक, आम के पत्ते।",
    benefits: "माँ लक्ष्मी और गणेश का आशीर्वाद, धन-समृद्धि, घर में शुभता",
    astrologicalPurpose: "लक्ष्मी, शुक्र",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  {
    id: "kit-griha-pravesh",
    name: "गृह प्रवेश पूजा किट",
    category: "Puja Kits",
    price: 2199,
    description:
      "सम्पूर्ण गृह प्रवेश किट — नवग्रह पूजन सामग्री, वास्तु दोष निवारण, कलश, नारियल, आम के पत्ते, सात अनाज, कुमकुम, हल्दी, गंगाजल, हवन सामग्री, दीपक, धूप, मंत्र पत्रिका।",
    benefits: "नए घर में शांति, सुख-समृद्धि, वास्तु दोष निवारण",
    astrologicalPurpose: "नवग्रह, सभी देवी-देवता",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
];

export const MALA_PRODUCTS: Product[] = [
  {
    id: "mala-rudraksha-108",
    name: "रुद्राक्ष माला (108 दाने)",
    category: "Malas",
    price: 799,
    description:
      "पंचमुखी रुद्राक्ष की 108 दानों की माला — जप, ध्यान और दैनिक पूजा के लिए। भगवान शिव की विशेष कृपा।",
    benefits: "मानसिक शांति, एकाग्रता, मोक्ष मार्ग",
    astrologicalPurpose: "शिव, बृहस्पति",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  {
    id: "mala-tulsi",
    name: "तुलसी माला (108 दाने)",
    category: "Malas",
    price: 299,
    description:
      "शुद्ध वृंदावनी तुलसी की माला — विष्णु और कृष्ण भक्तों के लिए परम पवित्र। कण्ठी माला के रूप में भी धारण करें।",
    benefits: "विष्णु भक्ति, पवित्रता, पापमोचन",
    astrologicalPurpose: "विष्णु, बृहस्पति",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "mala-sphatik",
    name: "स्फटिक माला (108 दाने)",
    category: "Malas",
    price: 599,
    description:
      "शुद्ध स्फटिक (Crystal Quartz) की माला — माँ सरस्वती और दुर्गा जप के लिए। मन की शांति और नकारात्मकता दूर करती है।",
    benefits: "शांति, सकारात्मकता, देवी कृपा",
    astrologicalPurpose: "शुक्र, चंद्र",
    stock: BigInt(45),
    createdAt: BigInt(0),
  },
  {
    id: "mala-coral",
    name: "लाल मूंगा माला (108 दाने)",
    category: "Malas",
    price: 1499,
    description:
      "प्राकृतिक लाल मूंगे की माला — हनुमान जी और देवी दुर्गा के जप के लिए। साहस और ऊर्जा प्रदान करती है।",
    benefits: "साहस, ऊर्जा, मंगल दोष निवारण",
    astrologicalPurpose: "मंगल, हनुमान",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "mala-rudraksha-sphatik",
    name: "रुद्राक्ष+स्फटिक संयुक्त माला",
    category: "Malas",
    price: 1099,
    description:
      "रुद्राक्ष और स्फटिक का दिव्य संयोग — शिव और शक्ति की एकसाथ उपासना। सभी बाधाएं दूर कर धन-समृद्धि देती है।",
    benefits: "शिव-शक्ति कृपा, बाधा निवारण, धन-समृद्धि",
    astrologicalPurpose: "शिव, शक्ति, सभी ग्रह",
    stock: BigInt(35),
    createdAt: BigInt(0),
  },
];
