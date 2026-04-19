export interface FAQQAPair {
  question: string;
  answer: string;
  questionHindi: string;
  answerHindi: string;
  category: "how-it-works" | "interpretations" | "remedies" | "general";
}

export interface CalculatorFAQEntry {
  calculatorId: string;
  calculatorName: string;
  qaPairs: FAQQAPair[];
}

export const calculatorFAQs: CalculatorFAQEntry[] = [
  // ─── Name Numerology ─────────────────────────────────────────────────────────
  {
    calculatorId: "name-calculator",
    calculatorName: "Name Numerology",
    qaPairs: [
      {
        question: "How is the numerological value of a name calculated?",
        answer:
          "Each letter is assigned a number (A=1, B=2 … Z=26 in Pythagorean; different mapping in Chaldean). All digit values are summed, then reduced to a single digit (or master number 11/22/33) by repeatedly adding digits.",
        questionHindi: "नाम का अंक विज्ञान मूल्य कैसे निकाला जाता है?",
        answerHindi:
          "पाइथागोरियन पद्धति में प्रत्येक अक्षर को 1–9 का मान दिया जाता है। सभी अंकों का योग कर एकल अंक (या मास्टर नंबर 11/22/33) में घटाया जाता है।",
        category: "how-it-works",
      },
      {
        question:
          "What is the difference between Pythagorean and Chaldean systems?",
        answer:
          "Pythagorean assigns letters sequentially (A=1 … I=9, then repeats). Chaldean assigns values based on the sound vibration of letters (no value 9 for letters). Chaldean is older and often considered more spiritually accurate.",
        questionHindi: "पाइथागोरियन और कैल्डियन पद्धति में क्या अंतर है?",
        answerHindi:
          "पाइथागोरियन में अक्षरों को क्रमानुसार 1–9 दिया जाता है। कैल्डियन में अक्षरों के ध्वनि कंपन के आधार पर मान दिए जाते हैं — इसे अधिक आध्यात्मिक रूप से सटीक माना जाता है।",
        category: "how-it-works",
      },
      {
        question:
          "Should I use my full birth name or the name I currently use?",
        answer:
          "Use your full birth name (as on birth certificate) for core numerology readings. Your current name reveals current energy vibrations. Both are analyzed for a complete picture.",
        questionHindi: "क्या मुझे जन्म का पूरा नाम या वर्तमान नाम उपयोग करना चाहिए?",
        answerHindi:
          "मुख्य अंक विज्ञान के लिए जन्म प्रमाणपत्र पर लिखा पूरा नाम उपयोग करें। वर्तमान नाम वर्तमान ऊर्जा कंपन को दर्शाता है।",
        category: "general",
      },
      {
        question: "What does a name number 1 mean?",
        answer:
          "Number 1 represents leadership, independence, and originality. People with this name number are natural leaders, self-starters, and innovators with strong willpower.",
        questionHindi: "नाम संख्या 1 का क्या अर्थ है?",
        answerHindi:
          "अंक 1 नेतृत्व, स्वतंत्रता एवं मौलिकता का प्रतिनिधित्व करता है। इस नाम संख्या वाले लोग प्राकृतिक नेता एवं नवप्रवर्तक होते हैं।",
        category: "interpretations",
      },
      {
        question: "What is the significance of master numbers 11, 22, and 33?",
        answer:
          "Master numbers carry intensified vibrations. 11 is the Intuitive Master, 22 the Master Builder, and 33 the Master Teacher. They are not reduced to single digits and indicate high spiritual potential.",
        questionHindi: "मास्टर नंबर 11, 22, और 33 का क्या महत्व है?",
        answerHindi:
          "मास्टर नंबर तीव्र कंपन वाले होते हैं। 11 अंतर्ज्ञानी मास्टर, 22 मास्टर बिल्डर, और 33 मास्टर टीचर हैं। इन्हें एकल अंक में नहीं घटाया जाता।",
        category: "interpretations",
      },
      {
        question: "Can changing my name improve my luck?",
        answer:
          "Numerologists believe aligning your name vibration with your birth number or life path number can positively shift energy. Even small spelling changes (adding/removing a letter) can alter the number.",
        questionHindi: "क्या नाम बदलने से भाग्य सुधर सकता है?",
        answerHindi:
          "अंक शास्त्रियों का मानना है कि नाम कंपन को जन्म अंक से मिलाने पर ऊर्जा सकारात्मक रूप से बदल सकती है। छोटे-छोटे वर्तनी परिवर्तन भी अंक बदल सकते हैं।",
        category: "remedies",
      },
      {
        question: "What remedies are suggested for an unlucky name number?",
        answer:
          "Remedies include: spelling adjustment (adding/dropping a letter), adding a lucky initial, chanting the ruling planet's mantra of the desired number, wearing the corresponding gemstone.",
        questionHindi: "अशुभ नाम संख्या के लिए क्या उपाय हैं?",
        answerHindi:
          "उपाय: वर्तनी समायोजन, भाग्यशाली अक्षर जोड़ना, वांछित अंक के स्वामी ग्रह का मंत्र जाप, तथा संबंधित रत्न धारण करना।",
        category: "remedies",
      },
      {
        question: "How reliable is name numerology for baby naming?",
        answer:
          "Many Indian families use numerology alongside Nakshatra-based naming. It is considered highly reliable when the name number harmonizes with the birth number (Mulank) and destiny number (Bhagyank).",
        questionHindi: "बच्चे के नामकरण में नाम अंक विज्ञान कितना विश्वसनीय है?",
        answerHindi:
          "कई भारतीय परिवार नक्षत्र के साथ-साथ अंक विज्ञान का भी उपयोग करते हैं। जब नाम संख्या मूलांक और भाग्यांक से मेल खाती है, तो इसे अत्यंत विश्वसनीय माना जाता है।",
        category: "general",
      },
      {
        question: "Does numerology work for Hindi or Sanskrit names?",
        answer:
          "Yes. For Devanagari names, the Chaldean or modified Indian numerology systems map Hindi letters to their sound-vibration values. Our calculator supports transliterated Hindi names.",
        questionHindi: "क्या हिंदी या संस्कृत नामों के लिए अंक विज्ञान काम करता है?",
        answerHindi:
          "हाँ। देवनागरी नामों के लिए भारतीय अंक विज्ञान प्रणाली हिंदी अक्षरों के ध्वनि-कंपन मान उपयोग करती है।",
        category: "how-it-works",
      },
    ],
  },

  // ─── Vehicle Number ───────────────────────────────────────────────────────────
  {
    calculatorId: "vehicle-calculator",
    calculatorName: "Vehicle Number Analysis",
    qaPairs: [
      {
        question: "How is vehicle number numerology calculated?",
        answer:
          "The digits in your vehicle's registration number are added together and reduced to a single digit. For example, MH 01 AB 1234 → 1+2+3+4 = 10 → 1+0 = 1.",
        questionHindi: "वाहन नंबर अंक विज्ञान कैसे निकाला जाता है?",
        answerHindi:
          "वाहन पंजीकरण के सभी अंकों को जोड़कर एकल अंक में घटाया जाता है। उदाहरण: 1234 → 1+2+3+4=10 → 1+0=1।",
        category: "how-it-works",
      },
      {
        question: "Which vehicle numbers are considered lucky?",
        answer:
          "Numbers 1, 5, and 6 are generally considered most auspicious for vehicles. Number 1 brings success, 5 brings protection, and 6 brings comfort and wealth.",
        questionHindi: "कौन से वाहन नंबर शुभ माने जाते हैं?",
        answerHindi:
          "सामान्यतः 1, 5 और 6 वाहनों के लिए सर्वाधिक शुभ माने जाते हैं। 1 सफलता, 5 सुरक्षा और 6 सुख-संपत्ति लाता है।",
        category: "interpretations",
      },
      {
        question: "Which vehicle numbers should be avoided?",
        answer:
          "Number 8 is associated with Saturn and can bring delays or accidents. Number 9 (Mars) can lead to aggression on road. Number 4 (Rahu) is considered unstable for vehicles.",
        questionHindi: "कौन से वाहन नंबर से बचना चाहिए?",
        answerHindi:
          "8 शनि से जुड़ा है और देरी या दुर्घटना ला सकता है। 9 (मंगल) सड़क पर आक्रामकता बढ़ा सकता है। 4 (राहु) वाहन के लिए अस्थिर माना जाता है।",
        category: "interpretations",
      },
      {
        question: "Does the vehicle number need to match my birth number?",
        answer:
          "Ideally yes. A vehicle number that matches or is friendly to your Mulank (birth number) enhances safety and harmony. Friendly pairs: 1-4, 2-7, 3-9, 5-6.",
        questionHindi: "क्या वाहन नंबर मेरे जन्मांक से मेलना जरूरी है?",
        answerHindi:
          "आदर्श रूप से हाँ। जो वाहन नंबर आपके मूलांक से मेल खाता है, वह सुरक्षा और सामंजस्य बढ़ाता है। मैत्री जोड़े: 1-4, 2-7, 3-9, 5-6।",
        category: "general",
      },
      {
        question: "What remedy if my vehicle number is unfavorable?",
        answer:
          "Place a small Swastika or Om symbol inside the vehicle, hang a black cloth or lemon-chili (nazar battu), and regularly offer mustard oil on Saturdays if number 8.",
        questionHindi: "यदि वाहन नंबर अशुभ हो तो उपाय क्या हैं?",
        answerHindi:
          "वाहन में छोटा स्वस्तिक या ॐ चिह्न लगाएं, काले कपड़े या नींबू-मिर्च टांगें, और यदि अंक 8 हो तो शनिवार को सरसों के तेल का दीपक जलाएं।",
        category: "remedies",
      },
      {
        question: "Can I choose a specific vehicle number from the RTO?",
        answer:
          "Yes, in India you can apply for a preferred (VIP/Fancy) registration number at the RTO. Numerologists often suggest specific numbers based on your birth chart.",
        questionHindi: "क्या मैं RTO से विशेष वाहन नंबर चुन सकता हूँ?",
        answerHindi:
          "हाँ, भारत में आप RTO में पसंदीदा (VIP/Fancy) पंजीकरण नंबर के लिए आवेदन कर सकते हैं। अंक शास्त्री जन्मकुंडली के आधार पर नंबर सुझाते हैं।",
        category: "general",
      },
      {
        question: "Does color of vehicle matter in numerology?",
        answer:
          "Yes. Each number has a ruling planet with a corresponding color. For Number 1 (Sun), gold/orange is ideal. For Number 6 (Venus), white or silver is best.",
        questionHindi: "क्या वाहन का रंग अंक विज्ञान में मायने रखता है?",
        answerHindi:
          "हाँ। प्रत्येक अंक का स्वामी ग्रह होता है जिसका संबंधित रंग होता है। अंक 1 (सूर्य) के लिए सुनहरा/नारंगी और अंक 6 (शुक्र) के लिए सफेद या चांदी आदर्श है।",
        category: "interpretations",
      },
      {
        question:
          "Should the purchase date of the vehicle also be numerologically correct?",
        answer:
          "Many numerologists recommend aligning the purchase date with the vehicle number. Purchase on a date whose total matches the vehicle number for maximum harmony.",
        questionHindi: "क्या वाहन की खरीद तिथि भी अंक विज्ञान के अनुसार होनी चाहिए?",
        answerHindi:
          "कई अंक शास्त्री खरीद तिथि को वाहन नंबर के साथ मिलाने की सलाह देते हैं — जिस तिथि का योग वाहन संख्या से मेल खाए।",
        category: "general",
      },
    ],
  },

  // ─── Mobile Number ─────────────────────────────────────────────────────────
  {
    calculatorId: "mobile-calculator",
    calculatorName: "Mobile Number Analysis",
    qaPairs: [
      {
        question: "How is the numerology of a mobile number calculated?",
        answer:
          "Add all digits of your mobile number and reduce to a single digit. For 9876543210: 9+8+7+6+5+4+3+2+1+0 = 45 → 4+5 = 9.",
        questionHindi: "मोबाइल नंबर का अंक विज्ञान कैसे निकाला जाता है?",
        answerHindi:
          "मोबाइल नंबर के सभी अंकों को जोड़कर एकल अंक तक घटाएं। 9876543210: 9+8+7+6+5+4+3+2+1+0 = 45 → 4+5 = 9।",
        category: "how-it-works",
      },
      {
        question: "Which mobile number is best for business?",
        answer:
          "Numbers 1, 5, and 8 are favorable for business. 1 attracts clients, 5 brings opportunities, and 8 (if well-placed in your chart) brings wealth and authority.",
        questionHindi: "व्यापार के लिए कौन सा मोबाइल नंबर सबसे अच्छा है?",
        answerHindi:
          "1, 5 और 8 व्यापार के लिए अनुकूल हैं। 1 ग्राहक आकर्षित करता है, 5 अवसर लाता है, और 8 (यदि कुंडली में ठीक हो) धन एवं अधिकार देता है।",
        category: "interpretations",
      },
      {
        question:
          "What happens if my mobile number doesn't match my birth number?",
        answer:
          "A mismatched mobile number can subtly drain energy — causing miscommunications, missed opportunities, and restlessness. It's advisable to change SIM if the mismatch is severe.",
        questionHindi: "यदि मोबाइल नंबर जन्मांक से मेल न खाए तो क्या होता है?",
        answerHindi:
          "असंगत मोबाइल नंबर सूक्ष्म ऊर्जा क्षय कर सकता है — गलतफहमी, अवसर चूकना और बेचैनी हो सकती है।",
        category: "general",
      },
      {
        question: "Is mobile number 8 always bad?",
        answer:
          "No. Number 8 is powerful — it's ruled by Saturn. If Saturn is well-placed in your horoscope, mobile number 8 can bring great success. It's risky only for Saturn-afflicted charts.",
        questionHindi: "क्या मोबाइल नंबर 8 हमेशा बुरा होता है?",
        answerHindi:
          "नहीं। 8 शक्तिशाली है — शनि द्वारा शासित। यदि आपकी कुंडली में शनि बलवान हो, तो मोबाइल 8 बड़ी सफलता दे सकता है।",
        category: "interpretations",
      },
      {
        question: "What is the remedy for an unfavorable mobile number?",
        answer:
          "Change the SIM if possible, or balance the energy by keeping the phone number active at auspicious times. Chanting the ruling planet's mantra of your desired number also helps.",
        questionHindi: "अशुभ मोबाइल नंबर का उपाय क्या है?",
        answerHindi:
          "यदि संभव हो तो SIM बदलें। ऊर्जा संतुलन के लिए शुभ समय पर नंबर सक्रिय रखें तथा वांछित अंक के स्वामी ग्रह का मंत्र जाप करें।",
        category: "remedies",
      },
      {
        question:
          "Should different family members have different mobile number vibrations?",
        answer:
          "Ideally each family member should have a mobile number aligned to their own birth number. However, if using a family/shared number, align it to the head of household.",
        questionHindi: "क्या परिवार के अलग-अलग सदस्यों के मोबाइल नंबर अलग होने चाहिए?",
        answerHindi:
          "आदर्श रूप से हाँ। प्रत्येक सदस्य का मोबाइल उनके अपने जन्मांक से मेल खाना चाहिए।",
        category: "general",
      },
      {
        question:
          "Does a mobile number with repeating digits have special significance?",
        answer:
          "Yes. Repeating digits amplify the energy. 9999999999 would be pure Mars energy (9). 8888888888 extreme Saturn influence. This doubles both the benefits and the risks.",
        questionHindi: "क्या दोहराए गए अंकों वाले मोबाइल नंबर का विशेष महत्व है?",
        answerHindi:
          "हाँ। दोहराए गए अंक ऊर्जा को बढ़ाते हैं। जैसे 9999 पूर्ण मंगल ऊर्जा और 8888 अत्यधिक शनि प्रभाव दर्शाता है।",
        category: "interpretations",
      },
      {
        question: "How to choose a lucky mobile number before porting?",
        answer:
          "Calculate your Mulank and Bhagyank first. Then choose a mobile number whose total matches your Mulank or is friendly to it. Also consider the day you activate the SIM.",
        questionHindi: "पोर्टिंग से पहले भाग्यशाली मोबाइल नंबर कैसे चुनें?",
        answerHindi:
          "पहले अपना मूलांक और भाग्यांक निकालें। फिर ऐसा मोबाइल नंबर चुनें जिसका योग मूलांक से मेल खाए। SIM सक्रिय करने का दिन भी विचार करें।",
        category: "general",
      },
    ],
  },

  // ─── Destiny Number ────────────────────────────────────────────────────────
  {
    calculatorId: "destiny-calculator",
    calculatorName: "Destiny Number",
    qaPairs: [
      {
        question: "What is the Destiny Number and how is it calculated?",
        answer:
          "The Destiny Number (Expression Number) is derived from the full birth name. Each letter is assigned a numerical value, all values are summed, then reduced to a single digit or master number.",
        questionHindi: "भाग्यांक क्या है और इसे कैसे निकालते हैं?",
        answerHindi:
          "भाग्यांक (अभिव्यक्ति अंक) पूरे जन्म नाम से निकाला जाता है। प्रत्येक अक्षर के मान जोड़कर एकल अंक में घटाया जाता है।",
        category: "how-it-works",
      },
      {
        question:
          "What is the difference between Life Path and Destiny Number?",
        answer:
          "Life Path comes from DOB and represents the path you're on. Destiny Number comes from your name and represents what you're meant to achieve — your purpose and potential.",
        questionHindi: "जीवन पथ और भाग्यांक में क्या अंतर है?",
        answerHindi:
          "जीवन पथ जन्म तिथि से और भाग्यांक नाम से आता है। जीवन पथ आपकी दिशा है, भाग्यांक आपका लक्ष्य और संभावना है।",
        category: "how-it-works",
      },
      {
        question: "What does a Destiny Number 1 signify?",
        answer:
          "Destiny 1 people are born leaders meant to pioneer new paths. They're driven toward independence, innovation, and achieving firsts. Ideal careers: entrepreneur, CEO, pioneer roles.",
        questionHindi: "भाग्यांक 1 का क्या अर्थ है?",
        answerHindi:
          "भाग्यांक 1 वाले जन्मजात नेता होते हैं जो नए मार्ग प्रशस्त करने के लिए बने हैं। उद्यमी, CEO जैसे पद आदर्श हैं।",
        category: "interpretations",
      },
      {
        question: "What careers suit Destiny Number 7?",
        answer:
          "Destiny 7 is the seeker of truth. Best careers: researcher, analyst, philosopher, spiritual teacher, scientist, detective. They excel where deep thought and solitude are valued.",
        questionHindi: "भाग्यांक 7 के लिए कौन से करियर उपयुक्त हैं?",
        answerHindi:
          "भाग्यांक 7 सत्य का साधक है। शोधकर्ता, विश्लेषक, दार्शनिक, आध्यात्मिक गुरु, वैज्ञानिक जैसे क्षेत्र आदर्श हैं।",
        category: "interpretations",
      },
      {
        question: "Can my Destiny Number conflict with my Life Path?",
        answer:
          "Yes. If they're incompatible numbers (e.g., 4 and 5), you may feel inner tension between stability and freedom. The remedy is to consciously balance both energies in daily life.",
        questionHindi: "क्या भाग्यांक जीवन पथ से टकरा सकता है?",
        answerHindi:
          "हाँ। यदि दोनों असंगत हैं (जैसे 4 और 5), तो स्थिरता और स्वतंत्रता के बीच आंतरिक तनाव हो सकता है। दोनों ऊर्जाओं को सचेत रूप से संतुलित करें।",
        category: "general",
      },
      {
        question: "What is the destiny of someone with number 9?",
        answer:
          "Destiny 9 is the humanitarian. They're meant to serve humanity, work in philanthropy, healing arts, or social service. Letting go of ego is their spiritual lesson.",
        questionHindi: "भाग्यांक 9 वाले का भविष्य क्या होता है?",
        answerHindi:
          "भाग्यांक 9 मानवतावादी है। ये परोपकार, उपचार कला या सामाजिक सेवा में जीवन को अर्थ देते हैं। अहंकार त्यागना इनका आध्यात्मिक पाठ है।",
        category: "interpretations",
      },
      {
        question: "How can I align my life with my Destiny Number?",
        answer:
          "Study the ruling planet of your Destiny Number and strengthen it through its gemstone, mantra, and charity. Choose career, relationships, and residence that vibrate with your number.",
        questionHindi: "मैं अपने जीवन को भाग्यांक के अनुसार कैसे संरेखित करूं?",
        answerHindi:
          "अपने भाग्यांक के स्वामी ग्रह का अध्ययन करें और रत्न, मंत्र एवं दान से उसे बलवान बनाएं।",
        category: "remedies",
      },
      {
        question: "Is the Destiny Number fixed for life?",
        answer:
          "The Destiny Number from your birth name is fixed. However, if you legally change your name, the new name creates a new Expression Number that overlays your original one.",
        questionHindi: "क्या भाग्यांक जीवनभर स्थिर रहता है?",
        answerHindi:
          "जन्म नाम का भाग्यांक स्थिर है। यदि नाम कानूनी रूप से बदला जाए, तो नया अभिव्यक्ति अंक मूल के साथ काम करता है।",
        category: "general",
      },
    ],
  },

  // ─── Mulank Calculator ────────────────────────────────────────────────────
  {
    calculatorId: "mulank-calculator",
    calculatorName: "Mulank Calculator",
    qaPairs: [
      {
        question: "What is Mulank (Root Number)?",
        answer:
          "Mulank is the single digit derived from your birth date. Born on the 28th → 2+8 = 10 → 1+0 = 1. Born on the 7th → Mulank 7. It governs your core personality and instincts.",
        questionHindi: "मूलांक क्या होता है?",
        answerHindi:
          "मूलांक जन्म तिथि के एकल अंक से निकलता है। 28 को → 2+8=10 → 1+0=1। यह आपके मूल स्वभाव एवं प्रवृत्ति को नियंत्रित करता है।",
        category: "how-it-works",
      },
      {
        question: "What is the difference between Mulank and Bhagyank?",
        answer:
          "Mulank = birth date digit (day only). Bhagyank = sum of complete date of birth (day + month + year). Mulank reveals innate nature; Bhagyank reveals destiny and karmic path.",
        questionHindi: "मूलांक और भाग्यांक में क्या अंतर है?",
        answerHindi:
          "मूलांक = जन्म तिथि का अंक (केवल दिन)। भाग्यांक = पूर्ण जन्म तिथि (दिन + माह + वर्ष) का योग। मूलांक जन्मजात स्वभाव और भाग्यांक कर्म पथ बताता है।",
        category: "how-it-works",
      },
      {
        question: "What does Mulank 6 indicate?",
        answer:
          "Mulank 6 (ruled by Venus) indicates a nurturing, artistic, and harmonious personality. These individuals are family-oriented, aesthetically gifted, and excel in creative or counseling roles.",
        questionHindi: "मूलांक 6 क्या दर्शाता है?",
        answerHindi:
          "मूलांक 6 (शुक्र द्वारा शासित) पोषणकारी, कलात्मक और सामंजस्यपूर्ण व्यक्तित्व दर्शाता है। ये पारिवारिक, सौंदर्यप्रिय और रचनात्मक भूमिकाओं में उत्कृष्ट होते हैं।",
        category: "interpretations",
      },
      {
        question: "What is the lucky day, color, and gemstone for Mulank 3?",
        answer:
          "Mulank 3 (Jupiter): Lucky day is Thursday. Lucky color is yellow or golden. Gemstone is Yellow Sapphire (Pukhraj). These enhance Jupiter's positive influence.",
        questionHindi: "मूलांक 3 के लिए भाग्यशाली दिन, रंग और रत्न क्या हैं?",
        answerHindi:
          "मूलांक 3 (बृहस्पति): भाग्यशाली दिन गुरुवार। रंग पीला या सुनहरा। रत्न पुखराज। ये बृहस्पति के सकारात्मक प्रभाव को बढ़ाते हैं।",
        category: "interpretations",
      },
      {
        question: "Which Mulank pairs are most compatible in marriage?",
        answer:
          "Most compatible pairs: 1-4, 1-7, 2-7, 3-9, 4-8, 5-6, 6-9. Less compatible but manageable: 1-8, 2-4, 3-6. Most challenging: 2-9, 4-5.",
        questionHindi: "विवाह के लिए कौन से मूलांक जोड़े सबसे अनुकूल हैं?",
        answerHindi:
          "सर्वाधिक अनुकूल: 1-4, 1-7, 2-7, 3-9, 4-8, 5-6, 6-9। कम अनुकूल: 1-8, 2-4, 3-6। सबसे चुनौतीपूर्ण: 2-9, 4-5।",
        category: "interpretations",
      },
      {
        question: "What remedy is suggested for Mulank 8 challenges?",
        answer:
          "Mulank 8 (Saturn): Wear an iron or steel ring on the middle finger, chant 'Om Sham Shanaischaraya Namah', light sesame oil lamp on Saturdays, and donate black sesame seeds.",
        questionHindi: "मूलांक 8 की चुनौतियों का उपाय क्या है?",
        answerHindi:
          "मूलांक 8 (शनि): मध्यमा उंगली में लोहे की अंगूठी पहनें, 'ॐ शं शनैश्चराय नमः' का जाप करें, शनिवार को तिल के तेल का दीपक जलाएं।",
        category: "remedies",
      },
      {
        question: "Can Mulank be a double-digit master number?",
        answer:
          "No — Mulank is derived from a single date digit (1–31). If born on 11, the Mulank is 1+1=2. Master numbers apply to full Life Path calculations, not Mulank.",
        questionHindi: "क्या मूलांक दो अंकों का मास्टर नंबर हो सकता है?",
        answerHindi:
          "नहीं — मूलांक एकल तिथि अंक (1–31) से निकलता है। 11 को जन्मे का मूलांक 1+1=2 होगा। मास्टर नंबर पूर्ण जीवन पथ गणना पर लागू होते हैं।",
        category: "how-it-works",
      },
      {
        question: "What is the spiritual significance of Mulank 9?",
        answer:
          "Mulank 9 (Mars) represents completion, universal love, and spiritual completion. These souls have often lived many lives and carry ancient wisdom. They are compassionate humanitarians.",
        questionHindi: "मूलांक 9 का आध्यात्मिक महत्व क्या है?",
        answerHindi:
          "मूलांक 9 (मंगल) पूर्णता, सार्वभौमिक प्रेम एवं आध्यात्मिक समापन का प्रतिनिधित्व करता है। ये आत्माएं प्राचीन ज्ञान की वाहक करुणामय मानवतावादी होती हैं।",
        category: "interpretations",
      },
    ],
  },

  // ─── Lucky Number ─────────────────────────────────────────────────────────
  {
    calculatorId: "lucky-number",
    calculatorName: "Lucky Number / Color / Gem",
    qaPairs: [
      {
        question: "How are lucky numbers determined in numerology?",
        answer:
          "Lucky numbers are primarily derived from your Mulank, Bhagyank, and Name Number. Secondary lucky numbers come from your ruling planet's favorable periods (Dasha cycles).",
        questionHindi: "अंक विज्ञान में भाग्यशाली संख्याएं कैसे निर्धारित की जाती हैं?",
        answerHindi:
          "भाग्यशाली संख्याएं मुख्यतः मूलांक, भाग्यांक और नाम संख्या से निकलती हैं। स्वामी ग्रह की दशा काल में द्वितीयक भाग्यशाली संख्याएं बदलती रहती हैं।",
        category: "how-it-works",
      },
      {
        question: "What gemstone is recommended for Life Path 5?",
        answer:
          "Life Path 5 is ruled by Mercury. The primary gemstone is Emerald (Panna) — worn on the little finger in gold or silver. It enhances communication, intellect, and opportunity.",
        questionHindi: "जीवन पथ 5 के लिए कौन सा रत्न अनुशंसित है?",
        answerHindi:
          "जीवन पथ 5 बुध द्वारा शासित है। प्राथमिक रत्न पन्ना है — सोने या चांदी में कनिष्ठिका में पहना जाता है। यह संचार, बुद्धि एवं अवसरों को बढ़ाता है।",
        category: "interpretations",
      },
      {
        question: "What colors should be avoided for Mulank 4?",
        answer:
          "Mulank 4 (Rahu): Avoid dark red and black in daily wear. These colors amplify Rahu's restlessness. Prefer earthy tones — brown, khaki, and greens.",
        questionHindi: "मूलांक 4 के लिए कौन से रंग से बचना चाहिए?",
        answerHindi:
          "मूलांक 4 (राहु): रोज़मर्रा में गहरे लाल और काले रंग से बचें। ये राहु की बेचैनी बढ़ाते हैं। भूरे, खाकी और हरे रंग पसंद करें।",
        category: "interpretations",
      },
      {
        question: "How does wearing a gemstone activate numerological energy?",
        answer:
          "Gemstones vibrate at specific frequencies aligned with planetary energies. Wearing the correct stone on the correct finger and day allows the planet's positive energy to flow into your life.",
        questionHindi: "रत्न पहनने से अंक विज्ञान ऊर्जा कैसे सक्रिय होती है?",
        answerHindi:
          "रत्न विशिष्ट आवृत्तियों पर ग्रहीय ऊर्जाओं के साथ कंपन करते हैं। सही उंगली एवं दिन पर सही रत्न पहनने से ग्रह की सकारात्मक ऊर्जा जीवन में प्रवाहित होती है।",
        category: "how-it-works",
      },
      {
        question: "Can I wear multiple gemstones at once?",
        answer:
          "With caution. Some planets are friendly (Sun-Mars-Jupiter: compatible), while others conflict (Saturn-Sun, Jupiter-Mercury, Mars-Venus). Wearing conflicting stones simultaneously can create imbalance.",
        questionHindi: "क्या मैं एक साथ कई रत्न पहन सकता हूँ?",
        answerHindi:
          "सावधानी के साथ। कुछ ग्रह मित्र हैं (सूर्य-मंगल-बृहस्पति), जबकि कुछ शत्रु (शनि-सूर्य, बृहस्पति-बुध)। विरोधी रत्न एक साथ पहनने से असंतुलन हो सकता है।",
        category: "general",
      },
      {
        question:
          "What is the lucky color for someone born on the 2nd of any month?",
        answer:
          "Mulank 2 (Moon): Lucky colors are white, silver, cream, and light blue. These colors enhance Moon's qualities — intuition, emotional intelligence, and calm.",
        questionHindi: "किसी भी माह की 2 तारीख को जन्मे का भाग्यशाली रंग क्या है?",
        answerHindi:
          "मूलांक 2 (चंद्रमा): भाग्यशाली रंग सफेद, चांदी, क्रीम और हल्का नीला। ये रंग चंद्रमा के गुणों — अंतर्ज्ञान, भावनात्मक बुद्धि और शांति को बढ़ाते हैं।",
        category: "interpretations",
      },
      {
        question: "How often should lucky number predictions be updated?",
        answer:
          "Personal year numbers change annually (add your birth day + month + current year). So yearly review is recommended. During major Dasha changes, a full reading is advised.",
        questionHindi: "भाग्यशाली अंक की भविष्यवाणी कितनी बार अपडेट होनी चाहिए?",
        answerHindi:
          "व्यक्तिगत वर्ष संख्या वार्षिक बदलती है (जन्म दिन + माह + वर्तमान वर्ष जोड़ें)। बड़ी दशा परिवर्तन पर पूर्ण पठन की सलाह दी जाती है।",
        category: "general",
      },
      {
        question: "What remedies strengthen a weak lucky number?",
        answer:
          "Remedies: Chant the ruling planet's beej mantra 108 times on its day (Sun=Sunday, Moon=Monday…), donate corresponding item (Sun: wheat, Moon: rice, Saturn: black sesame), wear the gemstone.",
        questionHindi: "कमज़ोर भाग्यशाली अंक को मज़बूत करने के उपाय क्या हैं?",
        answerHindi:
          "उपाय: स्वामी ग्रह के दिन बीज मंत्र 108 बार जाप करें, संबंधित वस्तु दान करें (सूर्य: गेहूं, चंद्र: चावल, शनि: काले तिल), रत्न पहनें।",
        category: "remedies",
      },
    ],
  },

  // ─── Kundali Matching ─────────────────────────────────────────────────────
  {
    calculatorId: "kundali-matching",
    calculatorName: "Kundali Matching",
    qaPairs: [
      {
        question: "What is Ashtakoot Guna Milan?",
        answer:
          "Ashtakoot Guna Milan is the traditional Vedic system of 8 compatibility tests totaling 36 points. Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi are the 8 koots.",
        questionHindi: "अष्टकूट गुण मिलान क्या है?",
        answerHindi:
          "अष्टकूट गुण मिलान 8 अनुकूलता परीक्षणों की वैदिक प्रणाली है जिसका कुल 36 अंक है। वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट और नाड़ी 8 कूट हैं।",
        category: "how-it-works",
      },
      {
        question: "How many Gunas are sufficient for marriage?",
        answer:
          "Traditionally 18+ Gunas out of 36 are considered minimum for marriage. 24+ is good, 28+ is excellent. However, Nadi and Bhakoot doshas must be checked separately even with high score.",
        questionHindi: "विवाह के लिए कितने गुण पर्याप्त हैं?",
        answerHindi:
          "पारंपरिक रूप से 36 में से 18+ गुण विवाह के लिए न्यूनतम माने जाते हैं। 24+ अच्छा, 28+ उत्कृष्ट। लेकिन नाड़ी और भकूट दोष की जांच अलग से जरूरी है।",
        category: "how-it-works",
      },
      {
        question: "What is Nadi Dosha and how serious is it?",
        answer:
          "Nadi Dosha occurs when both partners have the same Nadi (Aadi, Madhya, or Antya). It is considered one of the most serious doshas — linked to health issues and progeny problems. Nadi carries 8 of 36 points.",
        questionHindi: "नाड़ी दोष क्या है और यह कितना गंभीर है?",
        answerHindi:
          "नाड़ी दोष तब होता है जब दोनों की नाड़ी एक समान हो (आदि, मध्य, या अंत्य)। यह सबसे गंभीर दोषों में से एक है — स्वास्थ्य एवं संतान समस्याओं से जुड़ा है।",
        category: "interpretations",
      },
      {
        question: "Can Kundali Dosha be cancelled or remedied?",
        answer:
          "Yes. Mangal Dosha, Nadi Dosha, and Bhakoot Dosha can be partially cancelled by certain planetary conditions (e.g., both having the same dosha). Pujas and gemstones also reduce impact.",
        questionHindi: "क्या कुंडली दोष रद्द या दूर हो सकता है?",
        answerHindi:
          "हाँ। मंगल दोष, नाड़ी दोष और भकूट दोष कुछ ग्रह स्थितियों से आंशिक रूप से रद्द हो सकते हैं। पूजा और रत्न भी प्रभाव कम करते हैं।",
        category: "remedies",
      },
      {
        question: "Is Kundali matching mandatory for love marriages?",
        answer:
          "Not mandatory, but strongly recommended by Vedic tradition. Even in love marriages, checking for Mangal Dosha, Nadi Dosha, and the 7th house lord can identify long-term challenges.",
        questionHindi: "क्या प्रेम विवाह में कुंडली मिलान अनिवार्य है?",
        answerHindi:
          "अनिवार्य नहीं, लेकिन वैदिक परंपरा में दृढ़ता से अनुशंसित है। प्रेम विवाह में भी मंगल दोष, नाड़ी दोष और सप्तम भाव की जांच दीर्घकालिक चुनौतियां बता सकती है।",
        category: "general",
      },
      {
        question: "What is Mangal Dosha and which chart positions create it?",
        answer:
          "Mangal Dosha (Kuja Dosha) occurs when Mars (Mangal) is in the 1st, 2nd, 4th, 7th, 8th, or 12th house of the Lagna, Moon, or Venus chart. It affects marriage harmony.",
        questionHindi: "मंगल दोष क्या है और किन ग्रह स्थितियों से बनता है?",
        answerHindi:
          "मंगल दोष तब बनता है जब लग्न, चंद्र या शुक्र कुंडली में मंगल प्रथम, द्वितीय, चतुर्थ, सप्तम, अष्टम या द्वादश भाव में हो।",
        category: "interpretations",
      },
      {
        question:
          "What is the difference between North Indian and South Indian Kundali styles?",
        answer:
          "North Indian charts use diamond-shaped houses with fixed positions. South Indian use square charts with zodiac signs fixed. Both show same planetary data, just in different visual formats.",
        questionHindi: "उत्तर और दक्षिण भारतीय कुंडली शैली में क्या अंतर है?",
        answerHindi:
          "उत्तर भारतीय कुंडली हीरे के आकार की होती है (निश्चित स्थान)। दक्षिण भारतीय वर्गाकार (निश्चित राशि)। दोनों में ग्रह डेटा समान होता है।",
        category: "how-it-works",
      },
      {
        question: "Can same-Nakshatra couples marry?",
        answer:
          "It depends on the Nakshatra. Same Nakshatra with different Padas (quarters) may be acceptable. Many Nakshatras have specific rules. Consult an astrologer for case-specific advice.",
        questionHindi: "क्या एक नक्षत्र के जोड़े विवाह कर सकते हैं?",
        answerHindi:
          "यह नक्षत्र पर निर्भर करता है। एक ही नक्षत्र लेकिन अलग-अलग पाद स्वीकार्य हो सकते हैं। मामले-विशेष सलाह के लिए ज्योतिषी से परामर्श करें।",
        category: "general",
      },
      {
        question: "What Kundali Dosha remedies are most effective?",
        answer:
          "Effective remedies: Kumbh Vivah (for Mangal Dosha), reciting Navagraha Stotra, wearing red coral for Mangal, conducting Mahamrityunjaya Japa, visiting specific temples like Kuja Temple in Vaitheeswaran Koil.",
        questionHindi: "कौन से कुंडली दोष निवारण सबसे प्रभावी हैं?",
        answerHindi:
          "प्रभावी उपाय: मंगल दोष के लिए कुंभ विवाह, नवग्रह स्तोत्र पाठ, मंगल के लिए लाल मूंगा धारण, महामृत्युंजय जाप, वैद्यीश्वरन कोइल जैसे मंदिर जाना।",
        category: "remedies",
      },
    ],
  },

  // ─── Nakshatra ─────────────────────────────────────────────────────────────
  {
    calculatorId: "nakshatra-calculator",
    calculatorName: "Nakshatra Calculator",
    qaPairs: [
      {
        question: "What are the 27 Nakshatras in Vedic astrology?",
        answer:
          "The 27 Nakshatras are lunar mansions spanning 360° of the zodiac (13°20' each). They are: Ashwini, Bharani, Krittika, Rohini, Mrigashira, Ardra, Punarvasu, Pushya, Ashlesha, Magha, Purva Phalguni, Uttara Phalguni, Hasta, Chitra, Swati, Vishakha, Anuradha, Jyeshtha, Mula, Purva Ashadha, Uttara Ashadha, Shravana, Dhanishtha, Shatabhisha, Purva Bhadrapada, Uttara Bhadrapada, Revati.",
        questionHindi: "वैदिक ज्योतिष में 27 नक्षत्र कौन से हैं?",
        answerHindi:
          "27 नक्षत्र चंद्र मंडल के भाग हैं, प्रत्येक 13°20'। अश्विनी, भरणी, कृत्तिका, रोहिणी, मृगशिरा, आर्द्रा, पुनर्वसु, पुष्य, आश्लेषा, मघा, पूर्वाफाल्गुनी, उत्तराफाल्गुनी, हस्त, चित्रा, स्वाति, विशाखा, अनुराधा, ज्येष्ठा, मूला, पूर्वाषाढ़ा, उत्तराषाढ़ा, श्रवण, धनिष्ठा, शतभिषा, पूर्वभाद्रपद, उत्तरभाद्रपद, रेवती।",
        category: "how-it-works",
      },
      {
        question: "How does birth Nakshatra influence personality?",
        answer:
          "Each Nakshatra has a ruling deity, ruling planet, symbol, and energy quality. Rohini Nakshatra (Moon-ruled) gives artistic, sensual, and nurturing qualities. Ardra (Rahu) gives sharp intellect but emotional turbulence.",
        questionHindi: "जन्म नक्षत्र व्यक्तित्व को कैसे प्रभावित करता है?",
        answerHindi:
          "प्रत्येक नक्षत्र की देवता, स्वामी ग्रह, प्रतीक और ऊर्जा गुण होते हैं। रोहिणी (चंद्र) कलात्मक और पोषणकारी गुण देती है। आर्द्रा (राहु) तीव्र बुद्धि किंतु भावनात्मक उथल-पुथल देती है।",
        category: "interpretations",
      },
      {
        question: "What is the significance of Nakshatra Pada (quarter)?",
        answer:
          "Each Nakshatra is divided into 4 Padas of 3°20' each. Each Pada corresponds to a Navamsha sign and has a specific quality. The Pada significantly modifies the Nakshatra's general traits.",
        questionHindi: "नक्षत्र पाद का क्या महत्व है?",
        answerHindi:
          "प्रत्येक नक्षत्र 4 पादों में विभाजित होता है। प्रत्येक पाद एक नवमांश राशि से संबंधित है। पाद नक्षत्र के सामान्य गुणों को महत्वपूर्ण रूप से संशोधित करता है।",
        category: "how-it-works",
      },
      {
        question: "Which Nakshatras are most auspicious for starting new work?",
        answer:
          "Pushya, Rohini, Hasta, Uttara Phalguni, Uttara Ashadha, Uttara Bhadrapada, Shravana, Revati, and Ashwini are considered most auspicious for new beginnings.",
        questionHindi: "नया काम शुरू करने के लिए कौन से नक्षत्र सर्वाधिक शुभ हैं?",
        answerHindi:
          "पुष्य, रोहिणी, हस्त, उत्तराफाल्गुनी, उत्तराषाढ़ा, उत्तरभाद्रपद, श्रवण, रेवती और अश्विनी नए कार्यारंभ के लिए सर्वाधिक शुभ माने जाते हैं।",
        category: "interpretations",
      },
      {
        question:
          "What is the Nadi of a Nakshatra and why does it matter in marriage?",
        answer:
          "Each Nakshatra belongs to one of three Nadis: Aadi (Vata), Madhya (Pitta), Antya (Kapha). Same-Nadi couples score 0 in Nadi Koot (out of 8), considered inauspicious for health and progeny.",
        questionHindi: "नक्षत्र की नाड़ी क्या है और विवाह में इसका महत्व क्यों है?",
        answerHindi:
          "प्रत्येक नक्षत्र तीन नाड़ियों में से एक से संबंधित है: आदि, मध्य, अंत्य। समान नाड़ी जोड़े नाड़ी कूट में 0 अंक पाते हैं जो स्वास्थ्य एवं संतान के लिए अशुभ माना जाता है।",
        category: "interpretations",
      },
      {
        question:
          "How is the ruling deity of a Nakshatra relevant to spiritual practice?",
        answer:
          "The Nakshatra deity is the presiding divine energy. Worshipping your birth Nakshatra's deity (e.g., Ashwini Nakshatra → Ashwini Kumars) on your Nakshatra day enhances health and prosperity.",
        questionHindi: "नक्षत्र के अधिष्ठात्री देवता का आध्यात्मिक अभ्यास में क्या महत्व है?",
        answerHindi:
          "नक्षत्र देवता प्रमुख दिव्य ऊर्जा है। जन्म नक्षत्र के नक्षत्र दिन पर अपने देवता की पूजा (जैसे अश्विनी → अश्विनी कुमार) स्वास्थ्य एवं समृद्धि बढ़ाती है।",
        category: "remedies",
      },
      {
        question:
          "What is Janma Nakshatra and how is it different from Lagna Nakshatra?",
        answer:
          "Janma Nakshatra is the Nakshatra in which the Moon was placed at birth — the most commonly used. Lagna Nakshatra is based on the Ascendant degree. Both are important in Vedic analysis.",
        questionHindi: "जन्म नक्षत्र और लग्न नक्षत्र में क्या अंतर है?",
        answerHindi:
          "जन्म नक्षत्र जन्म के समय चंद्रमा की स्थिति से (सबसे सामान्य)। लग्न नक्षत्र लग्न डिग्री से। दोनों वैदिक विश्लेषण में महत्वपूर्ण हैं।",
        category: "how-it-works",
      },
      {
        question: "What remedies are best for a malefic birth Nakshatra?",
        answer:
          "Chant the Beej Mantra of the Nakshatra's ruling planet. Perform Nakshatra Shanti Puja. Wear the corresponding gemstone. Donate items related to the ruling planet on its day.",
        questionHindi: "अशुभ जन्म नक्षत्र के लिए कौन से उपाय सर्वोत्तम हैं?",
        answerHindi:
          "नक्षत्र के स्वामी ग्रह का बीज मंत्र जाप करें। नक्षत्र शांति पूजा करवाएं। संबंधित रत्न पहनें। स्वामी ग्रह के दिन उससे संबंधित वस्तु दान करें।",
        category: "remedies",
      },
    ],
  },

  // ─── Dasha Calculator ─────────────────────────────────────────────────────
  {
    calculatorId: "dasha-calculator",
    calculatorName: "Dasha Calculator",
    qaPairs: [
      {
        question: "What is Vimshottari Dasha?",
        answer:
          "Vimshottari Dasha is the most widely used Vedic planetary period system, spanning 120 years total across 9 planets. The sequence is: Sun (6), Moon (10), Mars (7), Rahu (18), Jupiter (16), Saturn (19), Mercury (17), Ketu (7), Venus (20) years.",
        questionHindi: "विंशोत्तरी दशा क्या है?",
        answerHindi:
          "विंशोत्तरी दशा सबसे व्यापक रूप से उपयोग की जाने वाली वैदिक ग्रह काल प्रणाली है जो 9 ग्रहों में कुल 120 वर्ष तक चलती है।",
        category: "how-it-works",
      },
      {
        question: "How is the starting Dasha determined?",
        answer:
          "The starting Dasha is determined by the Moon's position at birth in a particular Nakshatra. Each Nakshatra has a ruling planet whose Dasha begins at birth.",
        questionHindi: "प्रारंभिक दशा कैसे निर्धारित होती है?",
        answerHindi:
          "प्रारंभिक दशा जन्म के समय चंद्रमा की नक्षत्र स्थिति से निर्धारित होती है। प्रत्येक नक्षत्र का स्वामी ग्रह जन्म के समय दशा शुरू करता है।",
        category: "how-it-works",
      },
      {
        question: "What happens during Saturn Mahadasha (Sade Sati overlap)?",
        answer:
          "Saturn Mahadasha lasts 19 years and is transformative. When it coincides with Sade Sati (Saturn transiting 3 signs around Moon), it intensifies challenges but also deepens spiritual growth.",
        questionHindi: "शनि महादशा (साढ़े साती ओवरलैप) में क्या होता है?",
        answerHindi:
          "शनि महादशा 19 वर्ष तक चलती है और परिवर्तनकारी होती है। साढ़े साती के साथ मिलकर यह चुनौतियां तीव्र करती है लेकिन आध्यात्मिक विकास भी गहरा करती है।",
        category: "interpretations",
      },
      {
        question: "What is Antardasha (sub-period) and how does it work?",
        answer:
          "Each Mahadasha is subdivided into 9 Antardashas (sub-periods) ruled by each of the 9 planets. The Antardasha of the same planet as the Mahadasha is most powerful.",
        questionHindi: "अंतर्दशा (उप-काल) क्या है और यह कैसे काम करती है?",
        answerHindi:
          "प्रत्येक महादशा 9 अंतर्दशाओं में विभाजित होती है। महादशा के समान ग्रह की अंतर्दशा सबसे शक्तिशाली होती है।",
        category: "how-it-works",
      },
      {
        question: "Which Dasha periods are generally most favorable?",
        answer:
          "Jupiter Dasha (16 years) and Venus Dasha (20 years) are generally most favorable for growth, relationships, and prosperity. However, the result depends on each planet's placement in the natal chart.",
        questionHindi: "कौन सी दशा काल सामान्यतः सबसे अनुकूल होती है?",
        answerHindi:
          "बृहस्पति दशा (16 वर्ष) और शुक्र दशा (20 वर्ष) सामान्यतः विकास, संबंध एवं समृद्धि के लिए सर्वाधिक अनुकूल हैं।",
        category: "interpretations",
      },
      {
        question: "How can I survive a difficult Dasha period?",
        answer:
          "Remedies during difficult Dashas: strengthen the planet through its gemstone, chant its mantra 108 times daily, perform its associated charity, and fast on its weekday. Spiritual practices enhance resilience.",
        questionHindi: "कठिन दशा काल में कैसे उबरें?",
        answerHindi:
          "उपाय: ग्रह का रत्न पहनें, मंत्र 108 बार जाप करें, संबंधित दान करें और उसके वार को उपवास करें। आध्यात्मिक अभ्यास धैर्य बढ़ाता है।",
        category: "remedies",
      },
      {
        question: "Can Dasha predict marriage timing?",
        answer:
          "Yes. Marriage most commonly occurs during Venus, 7th lord, or Jupiter Dashas and their favorable Antardashas. The transit of Jupiter over the natal 7th house further confirms timing.",
        questionHindi: "क्या दशा विवाह का समय बता सकती है?",
        answerHindi:
          "हाँ। विवाह सामान्यतः शुक्र, सप्तमेश या बृहस्पति दशा और अनुकूल अंतर्दशाओं में होता है। जन्मकुंडली के सप्तम भाव पर बृहस्पति का गोचर समय की पुष्टि करता है।",
        category: "interpretations",
      },
      {
        question:
          "What is the difference between Vimshottari and Yogini Dasha systems?",
        answer:
          "Vimshottari uses 9 planets over 120 years and is most universal. Yogini Dasha uses 8 Yoginis over 36 years and is considered more precise for short-term predictions in some traditions.",
        questionHindi: "विंशोत्तरी और योगिनी दशा प्रणालियों में क्या अंतर है?",
        answerHindi:
          "विंशोत्तरी 9 ग्रहों पर 120 वर्ष में और अत्यधिक सार्वभौमिक है। योगिनी दशा 8 योगिनियों पर 36 वर्ष में चलती है — कुछ परंपराओं में अल्पकालिक भविष्यवाणियों में अधिक सटीक।",
        category: "how-it-works",
      },
    ],
  },

  // ─── Muhurta Calculator ───────────────────────────────────────────────────
  {
    calculatorId: "muhurta-calculator",
    calculatorName: "Muhurta Calculator",
    qaPairs: [
      {
        question: "What is Muhurta in Vedic astrology?",
        answer:
          "Muhurta is an auspicious time period calculated from the Panchang (Tithi, Vara, Nakshatra, Yoga, Karana). Starting any important event in a good Muhurta enhances success probability.",
        questionHindi: "वैदिक ज्योतिष में मुहूर्त क्या है?",
        answerHindi:
          "मुहूर्त पंचांग (तिथि, वार, नक्षत्र, योग, करण) से गणना की गई शुभ समय अवधि है। अच्छे मुहूर्त में महत्वपूर्ण कार्य शुरू करने से सफलता की संभावना बढ़ती है।",
        category: "how-it-works",
      },
      {
        question: "Which Nakshatras are best for marriage Muhurta?",
        answer:
          "Best marriage Nakshatras: Rohini, Uttara Phalguni, Uttara Ashadha, Uttara Bhadrapada, Hasta, Mrigashira, Anuradha, Magha, Revati. Avoid Bharani, Krittika, Ashlesha, Jyeshtha, Moola.",
        questionHindi: "विवाह मुहूर्त के लिए कौन से नक्षत्र सर्वोत्तम हैं?",
        answerHindi:
          "विवाह के लिए उत्तम नक्षत्र: रोहिणी, उत्तराफाल्गुनी, उत्तराषाढ़ा, उत्तरभाद्रपद, हस्त, मृगशिरा, अनुराधा, मघा, रेवती। भरणी, कृत्तिका, आश्लेषा, ज्येष्ठा, मूला से बचें।",
        category: "interpretations",
      },
      {
        question:
          "What is Rahu Kalam and should all events be avoided during it?",
        answer:
          "Rahu Kalam is a 1.5-hour inauspicious period daily, different each weekday. Critical events (surgery, property purchase, travel) should be avoided. Minor activities are generally fine.",
        questionHindi: "राहु काल क्या है और क्या इस दौरान सभी कार्य टाले जाने चाहिए?",
        answerHindi:
          "राहु काल दैनिक 1.5 घंटे का अशुभ काल है, प्रत्येक वार पर अलग। शल्य चिकित्सा, संपत्ति खरीद, यात्रा जैसे महत्वपूर्ण कार्य टालें। सामान्य गतिविधियां सामान्यतः ठीक हैं।",
        category: "interpretations",
      },
      {
        question: "What is Choghadiya and how is it used for Muhurta?",
        answer:
          "Choghadiya divides the day into 8 time blocks of ~1.5 hours each. Each block is ruled by a planet. Amrit, Shubh, Labh, and Char are auspicious. Rog, Kaal, Udveg are inauspicious.",
        questionHindi: "चौघड़िया क्या है और मुहूर्त के लिए इसका उपयोग कैसे होता है?",
        answerHindi:
          "चौघड़िया दिन को ~1.5 घंटे के 8 ब्लॉकों में बांटता है। अमृत, शुभ, लाभ और चर शुभ हैं। रोग, काल, उद्वेग अशुभ हैं।",
        category: "how-it-works",
      },
      {
        question: "What are the best months for Griha Pravesh (house warming)?",
        answer:
          "Best months for Griha Pravesh: Vaishakha, Jyeshtha, Magha, Phalguna. Avoid Ashadha, Bhadrapada, Ashwina, Kartika for major entry. Entry during the owner's Nakshatra day is especially auspicious.",
        questionHindi: "गृहप्रवेश के लिए सर्वोत्तम महीने कौन से हैं?",
        answerHindi:
          "गृहप्रवेश के लिए उत्तम माह: वैशाख, ज्येष्ठ, माघ, फाल्गुन। आषाढ़, भाद्रपद, आश्विन, कार्तिक में मुख्य प्रवेश टालें।",
        category: "interpretations",
      },
      {
        question:
          "Can Muhurta overcome bad planetary placements in a natal chart?",
        answer:
          "Muhurta cannot fully override a severely afflicted chart but can significantly reduce obstacles. It acts as a favorable 'wind' — it won't make a ship sail if broken, but it helps a good ship sail faster.",
        questionHindi: "क्या मुहूर्त जन्मकुंडली की खराब ग्रह स्थितियों को पार कर सकता है?",
        answerHindi:
          "मुहूर्त गंभीर रूप से पीड़ित कुंडली को पूरी तरह से नहीं बदल सकता, लेकिन बाधाएं काफी कम कर सकता है।",
        category: "general",
      },
      {
        question: "What are the best Muhurtas for starting a business?",
        answer:
          "Business start: Pushya, Rohini, Hasta, Uttara Nakshatras on Wednesday (Mercury), Thursday (Jupiter) or Friday (Venus). Avoid Sundays and Tuesdays for new ventures.",
        questionHindi: "व्यापार शुरू करने के लिए सर्वोत्तम मुहूर्त कौन से हैं?",
        answerHindi:
          "व्यापार: पुष्य, रोहिणी, हस्त, उत्तरा नक्षत्र पर बुधवार, गुरुवार या शुक्रवार। नए उद्यम के लिए रविवार और मंगलवार टालें।",
        category: "interpretations",
      },
      {
        question: "What remedy if you missed a good Muhurta?",
        answer:
          "If you missed a Muhurta, the next best option is: perform a Ganesh Puja before starting, begin the activity during an Amrit/Shubh Choghadiya, and mentally set a clear Sankalp (intention).",
        questionHindi: "यदि शुभ मुहूर्त चूक गए तो उपाय क्या है?",
        answerHindi:
          "अगला सर्वोत्तम विकल्प: प्रारंभ से पहले गणेश पूजा करें, अमृत/शुभ चौघड़िया में कार्य प्रारंभ करें, और स्पष्ट संकल्प करें।",
        category: "remedies",
      },
    ],
  },

  // ─── Palmistry ─────────────────────────────────────────────────────────────
  {
    calculatorId: "palmistry",
    calculatorName: "Palmistry Reading",
    qaPairs: [
      {
        question: "Which hand is read in palmistry — left or right?",
        answer:
          "Traditionally, the dominant hand (right for right-handers) shows your current life path and choices. The non-dominant hand reveals your inherited potential and past karma. Both are read for a complete analysis.",
        questionHindi: "हस्तरेखा में कौन सा हाथ देखा जाता है — बायां या दायां?",
        answerHindi:
          "पारंपरिक रूप से प्रमुख हाथ (दाएं हाथ वालों के लिए दायां) वर्तमान जीवन पथ दिखाता है। गैर-प्रमुख हाथ विरासत में मिली क्षमता और पूर्वकर्म प्रकट करता है।",
        category: "how-it-works",
      },
      {
        question: "What does the Life Line reveal?",
        answer:
          "The Life Line doesn't predict lifespan — it reveals vitality, life energy, and major life changes. A long, deep Life Line indicates robust energy. Breaks indicate life disruptions; islands indicate health concerns.",
        questionHindi: "जीवन रेखा क्या बताती है?",
        answerHindi:
          "जीवन रेखा आयु नहीं — जीवन शक्ति, ऊर्जा और प्रमुख जीवन परिवर्तन बताती है। लंबी, गहरी जीवन रेखा मजबूत ऊर्जा दर्शाती है। टूटना व्यवधान, द्वीप स्वास्थ्य चिंता दर्शाते हैं।",
        category: "interpretations",
      },
      {
        question: "What is the Heart Line and what does it predict?",
        answer:
          "The Heart Line runs across the top of the palm. It governs emotional life, romantic relationships, and heart health. A long, clear Heart Line indicates emotional expressiveness; a chained line shows emotional instability.",
        questionHindi: "हृदय रेखा क्या है और यह क्या बताती है?",
        answerHindi:
          "हृदय रेखा हथेली के ऊपरी भाग में चलती है। यह भावनात्मक जीवन, प्रेम संबंध और हृदय स्वास्थ्य को नियंत्रित करती है।",
        category: "interpretations",
      },
      {
        question: "What does a broken Fate Line mean?",
        answer:
          "A broken Fate Line indicates major career or life direction changes. The break shows a transition period — one path ends, another begins. It doesn't mean failure, just transformation.",
        questionHindi: "टूटी हुई भाग्य रेखा का क्या अर्थ है?",
        answerHindi:
          "टूटी भाग्य रेखा करियर या जीवन दिशा में प्रमुख बदलाव दर्शाती है। यह असफलता नहीं, बल्कि परिवर्तन है।",
        category: "interpretations",
      },
      {
        question: "How accurate is AI-based palmistry reading?",
        answer:
          "AI palmistry analyzes image patterns (line clarity, length, depth, spacing) using trained models. It provides good general guidance but cannot replace a trained palmist's intuitive analysis of the full hand.",
        questionHindi: "AI आधारित हस्तरेखा पठन कितना सटीक है?",
        answerHindi:
          "AI हस्तरेखा प्रशिक्षित मॉडलों का उपयोग करके रेखा स्पष्टता, लंबाई, गहराई का विश्लेषण करती है। यह अच्छा सामान्य मार्गदर्शन देती है लेकिन प्रशिक्षित हस्तरेखाविद की जगह नहीं ले सकती।",
        category: "general",
      },
      {
        question: "What do the mounts on the palm indicate?",
        answer:
          "Each mount is named after a planet: Mount of Jupiter (ambition), Saturn (discipline), Apollo/Sun (creativity), Mercury (communication), Mars (courage/aggression), Venus (love/sensuality), Moon (intuition/imagination).",
        questionHindi: "हथेली के पर्वत क्या दर्शाते हैं?",
        answerHindi:
          "प्रत्येक पर्वत एक ग्रह के नाम पर है: बृहस्पति पर्वत (महत्वाकांक्षा), शनि (अनुशासन), सूर्य (रचनात्मकता), बुध (संचार), मंगल (साहस), शुक्र (प्रेम), चंद्र (अंतर्ज्ञान)।",
        category: "interpretations",
      },
      {
        question: "What remedies are suggested based on palmistry findings?",
        answer:
          "Remedies vary by line: Weak Life Line → strengthen Sun (red coral, Surya mantra). Broken Heart Line → Venus remedies (diamond/opal, Shukra mantra). Missing Fate Line → Saturn worship (blue sapphire if suitable).",
        questionHindi: "हस्तरेखा निष्कर्षों के आधार पर कौन से उपाय सुझाए जाते हैं?",
        answerHindi:
          "उपाय रेखा अनुसार: कमज़ोर जीवन रेखा → सूर्य बलवान करें। टूटी हृदय रेखा → शुक्र उपाय। भाग्य रेखा नहीं → शनि पूजा।",
        category: "remedies",
      },
      {
        question: "Can palmistry lines change over time?",
        answer:
          "Yes — palmistry lines do subtly change with major life shifts, health changes, and spiritual evolution. Reading the same hand at different life stages can reveal transformation in your path.",
        questionHindi: "क्या हस्तरेखाएं समय के साथ बदलती हैं?",
        answerHindi:
          "हाँ — प्रमुख जीवन परिवर्तन, स्वास्थ्य बदलाव और आध्यात्मिक विकास के साथ रेखाएं सूक्ष्म रूप से बदलती हैं।",
        category: "general",
      },
    ],
  },
];

export function getFAQsByCalculatorId(
  id: string,
): CalculatorFAQEntry | undefined {
  return calculatorFAQs.find((f) => f.calculatorId === id);
}
