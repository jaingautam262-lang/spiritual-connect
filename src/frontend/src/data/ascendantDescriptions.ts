// Ascendant (Lagna) descriptions for all 12 signs

export interface AscendantDescription {
  sign: number;
  name: string;
  nameHi: string;
  physicalAppearance: { en: string; hi: string };
  health: { en: string; hi: string };
  temperament: { en: string; hi: string };
}

export const ASCENDANT_DESCRIPTIONS: AscendantDescription[] = [
  {
    sign: 1,
    name: "Aries",
    nameHi: "मेष लग्न",
    physicalAppearance: {
      en: "Aries ascendants typically have a lean, athletic build with a medium to tall frame. Their face is long and angular with a prominent forehead and strong brow ridges. The eyes are sharp and alert, often hazel or light brown, projecting an intense and energetic gaze. The nose is medium-length and slightly pointed. Hair tends to be thick, often reddish or dark, and the complexion is reddish or ruddy. The overall impression is one of vitality, restlessness, and assertive confidence — people often sense the energy before they even speak.",
      hi: "मेष लग्न के जातकों का शरीर पतला और फुर्तीला होता है, कद मध्यम से लंबा। चेहरा लंबा और कोणीय होता है, माथा चौड़ा और आंखें तीखी और सतर्क, अक्सर हल्के भूरे रंग की। नाक मध्यम लंबाई और थोड़ी नुकीली। बाल घने और अक्सर लाल या गहरे रंग के। रंग लाल-सा या गहरा होता है। कुल मिलाकर इनकी छवि ऊर्जावान, साहसी और आत्मविश्वासी होती है।",
    },
    health: {
      en: "Prone to headaches, migraines, and head injuries. The face, head, and brain are the vulnerable areas. They may suffer from fever, high blood pressure, and inflammatory conditions. Regular exercise is essential as they tend toward excess heat in the body. A cooling diet and stress management help maintain balance.",
      hi: "सिरदर्द, माइग्रेन और सिर की चोटों की संभावना रहती है। बुखार, उच्च रक्तचाप और सूजन संबंधी बीमारियां हो सकती हैं। नियमित व्यायाम जरूरी है। ठंडा आहार और तनाव प्रबंधन स्वास्थ्य बनाए रखने में मदद करता है।",
    },
    temperament: {
      en: "Bold, impulsive, and fiercely independent. Natural leaders who act first and think later. High enthusiasm and competitive spirit, but may struggle with patience and follow-through. Honest to the point of bluntness, and quick to forgive.",
      hi: "साहसी, आवेगी और स्वतंत्र। प्राकृतिक नेता जो पहले कार्य करते हैं, बाद में सोचते हैं। उत्साह और प्रतिस्पर्धा की भावना तेज होती है, लेकिन धैर्य की कमी हो सकती है। स्पष्टवादी और जल्दी क्षमा करने वाले।",
    },
  },
  {
    sign: 2,
    name: "Taurus",
    nameHi: "वृषभ लग्न",
    physicalAppearance: {
      en: "Taurus ascendants have a sturdy, well-built physique with a stocky or medium frame. The neck is characteristically strong and well-proportioned — a classic Taurus trait. The face is round or square with a broad forehead, large expressive eyes (often dark and luminous), and full, sensual lips. The complexion is clear and often fair or wheatish, with a naturally healthy glow. Hair is typically thick and lustrous. They carry themselves with quiet dignity and a grounded, unhurried presence that exudes stability and earthly charm.",
      hi: "वृषभ लग्न के जातकों का शरीर मजबूत और सुगठित होता है। गर्दन विशेष रूप से मजबूत और आकर्षक होती है। चेहरा गोल या चौकोर, माथा चौड़ा, आंखें बड़ी और चमकदार, होंठ भरे हुए। रंग साफ और गेहुंआ, बाल घने और चमकीले। इनकी चाल शांत और धरातल से जुड़ी होती है।",
    },
    health: {
      en: "The throat, neck, and thyroid are vulnerable areas. Prone to throat infections, tonsillitis, and thyroid imbalances. Taurus ascendants tend toward weight gain and sluggish metabolism. Overindulgence in food and comfort can lead to issues. Regular movement and a balanced diet are critical for wellbeing.",
      hi: "गला, गर्दन और थायरॉइड कमजोर क्षेत्र हैं। गले में संक्रमण, टॉन्सिल और थायरॉइड असंतुलन की संभावना। वजन बढ़ने और धीमी चयापचय की प्रवृत्ति। नियमित व्यायाम और संतुलित आहार जरूरी है।",
    },
    temperament: {
      en: "Patient, reliable, and deeply sensual. Taurus rising individuals appreciate beauty, luxury, and comfort. They are slow to anger but when pushed, their stubbornness is legendary. Extremely loyal and devoted in relationships, with a practical approach to life.",
      hi: "धैर्यवान, विश्वसनीय और संवेदनशील। सुंदरता, विलासिता और आराम की सराहना। गुस्सा धीरे आता है लेकिन जिद्दी स्वभाव। रिश्तों में बेहद वफादार और व्यावहारिक दृष्टिकोण।",
    },
  },
  {
    sign: 3,
    name: "Gemini",
    nameHi: "मिथुन लग्न",
    physicalAppearance: {
      en: "Gemini ascendants are typically tall and slender with a youthful, quick-moving energy. The face is expressive and animated, with bright, curious eyes that dart and sparkle with intelligence — often light grey or blue. Hands are often long and expressive, reflecting the Mercury influence. The complexion tends to be fair or medium, and the overall appearance remains young-looking well into later years. Their gestures are frequent and communicative, and they rarely sit still — always giving an impression of restless intellectual energy.",
      hi: "मिथुन लग्न के जातक लंबे और पतले होते हैं, चेहरे पर जवानी और चंचलता झलकती है। आंखें चमकदार और जिज्ञासु। हाथ लंबे और भावपूर्ण। रंग गोरा या मध्यम। देर तक युवा दिखने की प्रवृत्ति। चेहरा हमेशा भावनाओं से भरा रहता है।",
    },
    health: {
      en: "Vulnerable areas include the lungs, shoulders, arms, and nervous system. Prone to respiratory issues, anxiety, and nervous exhaustion. Mental overstimulation is a key concern. Regular breathing exercises, meditation, and adequate sleep are beneficial.",
      hi: "फेफड़े, कंधे, हाथ और तंत्रिका तंत्र कमजोर। श्वसन समस्याएं, चिंता और तंत्रिका थकान की संभावना। मानसिक अत्यधिक उत्तेजना प्रमुख चिंता। प्राणायाम और पर्याप्त नींद फायदेमंद।",
    },
    temperament: {
      en: "Witty, curious, and adaptable. Gemini rising individuals are natural communicators who love variety. They can be indecisive and scattered but bring lightness and humor to every situation. Highly social and intellectually driven.",
      hi: "चतुर, जिज्ञासु और अनुकूलनशील। प्राकृतिक संवादकर्ता जो विविधता प्रेमी हैं। निर्णय लेने में अस्थिर हो सकते हैं लेकिन हर स्थिति में हल्कापन लाते हैं।",
    },
  },
  {
    sign: 4,
    name: "Cancer",
    nameHi: "कर्क लग्न",
    physicalAppearance: {
      en: "Cancer ascendants often have a round, soft face with a wide forehead and prominent cheekbones. The eyes are large, liquid, and deeply expressive — often dark brown — giving an impression of emotional depth and sensitivity. The body is medium-built and tends toward fullness, particularly around the chest. The complexion is pale or fair with a silvery sheen under moonlight. Their movements are careful and slightly sideways, like the crab that rules their sign. The overall impression is nurturing, gentle, and deeply intuitive.",
      hi: "कर्क लग्न के जातकों का चेहरा गोल और कोमल होता है, माथा चौड़ा और गाल उठे हुए। आंखें बड़ी, भावपूर्ण और गहरी। शरीर मध्यम और छाती की ओर भरा हुआ। रंग गोरा या पीला। हरकतें सावधान। कुल मिलाकर संवेदनशील और पोषण करने वाली छवि।",
    },
    health: {
      en: "The chest, breasts, and stomach are sensitive areas. Prone to digestive issues, gastric problems, and hormonal imbalances. Emotional states directly affect physical health. Depression and anxiety can manifest as physical ailments. A calm routine and emotional wellness practices are vital.",
      hi: "छाती, स्तन और पेट कमजोर क्षेत्र। पाचन समस्याएं, गैस्ट्रिक और हार्मोनल असंतुलन। भावनाएं सीधे स्वास्थ्य को प्रभावित करती हैं। शांत दिनचर्या और भावनात्मक स्वास्थ्य अभ्यास जरूरी।",
    },
    temperament: {
      en: "Deeply emotional, nurturing, and fiercely protective of loved ones. Cancer rising individuals have powerful intuition and long memory. They can be moody and withdrawn when hurt, but their loyalty is unmatched. Home and family are their ultimate sanctuary.",
      hi: "गहरी भावनाओं वाले, पोषण करने वाले और प्रियजनों के रक्षक। शक्तिशाली अंतर्ज्ञान और तेज याददाश्त। आहत होने पर उदास और बंद हो जाते हैं, लेकिन वफादारी अनुपम होती है।",
    },
  },
  {
    sign: 5,
    name: "Leo",
    nameHi: "सिंह लग्न",
    physicalAppearance: {
      en: "Leo ascendants are often tall and well-proportioned with a commanding, regal bearing. The face is broad with a prominent, lion-like mane of thick hair — often golden, auburn, or richly colored. The eyes are large and expressive, often golden-brown or amber, radiating warmth and authority. The back is characteristically strong. The complexion is typically warm and golden-toned. Leo ascendants dress with flair and naturally draw attention wherever they go, projecting an aura of leadership, pride, and confident charm.",
      hi: "सिंह लग्न के जातक लंबे और आकर्षक होते हैं, शाही भाव के साथ। चेहरा चौड़ा और बाल घने, अक्सर सुनहरे। आंखें बड़ी, गर्म और प्रभावशाली। पीठ मजबूत। रंग गर्म और सुनहरा। जहां भी जाएं, ध्यान खींचते हैं।",
    },
    health: {
      en: "The heart, spine, and upper back are the sensitive areas. Leo ascendants may suffer from cardiac issues, spinal problems, and overexertion. Their vitality is strong but they push themselves too hard. Regular rest, heart health monitoring, and avoiding excessive pride-driven stress are important.",
      hi: "हृदय, रीढ़ और पीठ के ऊपरी हिस्से कमजोर। हृदय रोग, रीढ़ की समस्याएं और अत्यधिक परिश्रम की संभावना। नियमित आराम और हृदय स्वास्थ्य निगरानी जरूरी।",
    },
    temperament: {
      en: "Magnanimous, creative, and born to lead. Leo rising individuals command respect naturally. They are generous but can be arrogant. They need appreciation to thrive and wilt under criticism. Drama and self-expression are natural tendencies.",
      hi: "उदार, रचनात्मक और नेतृत्व के लिए जन्मे। स्वाभाविक रूप से सम्मान पाते हैं। उदार लेकिन कभी-कभी अहंकारी। प्रशंसा में खिलते हैं और आलोचना में मुरझाते हैं।",
    },
  },
  {
    sign: 6,
    name: "Virgo",
    nameHi: "कन्या लग्न",
    physicalAppearance: {
      en: "Virgo ascendants typically have a medium height with a neat, well-groomed appearance. The face is delicate and refined with sharp, analytical eyes — often grey or hazel — that miss nothing. The nose is straight and precise. The complexion is clear and often pale or olive-toned. They tend to carry themselves with a slightly reserved, modest demeanor. Their clothing and style are typically neat and understated rather than flashy. An air of intelligence, precision, and quiet confidence defines the Virgo ascendant.",
      hi: "कन्या लग्न के जातक मध्यम कद के साथ व्यवस्थित और साफ-सुथरे होते हैं। चेहरा सुंदर और परिष्कृत, आंखें तीखी और विश्लेषणात्मक। नाक सीधी। रंग साफ और अक्सर पीला या जैतून जैसा। विनम्र और संयमित व्यवहार। बुद्धि और सटीकता इनकी पहचान है।",
    },
    health: {
      en: "The digestive system, intestines, and nervous system are vulnerable. Prone to irritable bowel syndrome, food intolerances, and anxiety-driven physical symptoms. Virgo ascendants are prone to hypochondria. A clean diet, probiotics, and regular digestion-supporting herbs are beneficial.",
      hi: "पाचन तंत्र, आंत और तंत्रिका तंत्र कमजोर। IBS, खाद्य असहिष्णुता और चिंता से उत्पन्न लक्षण। स्वच्छ आहार और पाचन सहायक जड़ी-बूटियां फायदेमंद।",
    },
    temperament: {
      en: "Analytical, practical, and service-oriented. Virgo rising individuals are perfectionists who notice every detail. They can be overly critical of themselves and others. Deeply loyal and helpful, they express love through acts of service rather than grand gestures.",
      hi: "विश्लेषणात्मक, व्यावहारिक और सेवा-उन्मुख। परफेक्शनिस्ट जो हर विवरण नोटिस करते हैं। खुद और दूसरों के प्रति अत्यधिक आलोचनात्मक हो सकते हैं। सेवा के माध्यम से प्रेम व्यक्त करते हैं।",
    },
  },
  {
    sign: 7,
    name: "Libra",
    nameHi: "तुला लग्न",
    physicalAppearance: {
      en: "Libra ascendants are often strikingly beautiful or handsome with symmetrical, balanced facial features. The face is oval or round with a well-defined jawline, dimples being a common feature. The eyes are charming and alluring — often blue or soft brown — and the smile is their most memorable attribute. The complexion is typically fair and smooth. They are usually well-dressed with an innate sense of style and elegance. The overall impression is one of grace, beauty, and diplomatic charm that makes everyone feel at ease.",
      hi: "तुला लग्न के जातक अक्सर सुंदर और आकर्षक होते हैं, चेहरे पर संतुलन और सममिति। चेहरा अंडाकार, जबड़ा सुगठित, गड्ढे सामान्य। आंखें मनमोहक। मुस्कान सबसे यादगार विशेषता। रंग साफ और मुलायम। फैशन और शैली की सहज समझ।",
    },
    health: {
      en: "The kidneys, lower back, and skin are vulnerable areas. Prone to kidney issues, lower back pain, and skin conditions. Libra ascendants need to maintain fluid balance and avoid excess sugar and sweets. Social exhaustion can also affect their health.",
      hi: "गुर्दे, पीठ के निचले हिस्से और त्वचा कमजोर। गुर्दे की समस्याएं, पीठ दर्द और त्वचा विकार। तरल संतुलन बनाए रखें, मिठाई से बचें।",
    },
    temperament: {
      en: "Charming, diplomatic, and justice-oriented. Libra rising individuals seek harmony in all things and often find it difficult to make decisions. They are deeply social and thrive in partnership. They can be indecisive but their fairness and grace are admired by all.",
      hi: "आकर्षक, कूटनीतिक और न्यायप्रिय। हर चीज में सद्भाव की तलाश, निर्णय लेने में कठिनाई। सामाजिक रूप से सक्रिय, साझेदारी में पनपते हैं।",
    },
  },
  {
    sign: 8,
    name: "Scorpio",
    nameHi: "वृश्चिक लग्न",
    physicalAppearance: {
      en: "Scorpio ascendants have a sturdy, powerful build with wide, strong shoulders and a commanding square face. The eyes are their most striking feature — penetrating, magnetic, and intense, often dark brown or black with a hypnotic depth that seems to look straight through a person. The lips are sensual and full. The hair is typically thick, dark, and lustrous. The complexion tends toward medium or dusky, with an inherent glow. The overall impression is one of latent power, mystery, magnetic charm, and a barely contained intensity that makes Scorpio ascendants unforgettable.",
      hi: "वृश्चिक लग्न के जातकों का शरीर मजबूत और शक्तिशाली होता है, कंधे चौड़े और मजबूत। आंखें सबसे आकर्षक — गहरी, चुंबकीय और तीव्र, अक्सर गहरे भूरे या काले रंग की। होंठ भरे हुए। बाल घने और काले। रंग मध्यम या गहरा। कुल मिलाकर शक्ति, रहस्य और चुंबकीय आकर्षण की छवि।",
    },
    health: {
      en: "The reproductive organs, bladder, and colon are vulnerable. Prone to reproductive health issues, urinary tract infections, and elimination problems. Scorpio ascendants may have intense psychosomatic responses. Emotional detox and regular sexual health care are important.",
      hi: "प्रजनन अंग, मूत्राशय और बड़ी आंत कमजोर। प्रजनन स्वास्थ्य समस्याएं, मूत्र पथ संक्रमण। भावनात्मक डिटॉक्स जरूरी।",
    },
    temperament: {
      en: "Intense, secretive, and profoundly transformative. Scorpio rising individuals feel everything deeply and never forget. They are fiercely loyal but can hold grudges. Their intuition borders on psychic and they are drawn to life's deeper mysteries. Power and control are strong themes in their lives.",
      hi: "तीव्र, गुप्त और परिवर्तनकारी। सब कुछ गहराई से महसूस करते हैं और कभी नहीं भूलते। वफादार लेकिन शत्रुता भी याद रखते हैं। अंतर्ज्ञान लगभग मानसिक। शक्ति और नियंत्रण प्रमुख विषय।",
    },
  },
  {
    sign: 9,
    name: "Sagittarius",
    nameHi: "धनु लग्न",
    physicalAppearance: {
      en: "Sagittarius ascendants tend to be tall and athletic with a broad, open face and a bright, friendly smile that puts everyone at ease. The forehead is high and prominent. The eyes are lively, often hazel or light-colored, with a far-sighted quality — always looking toward the horizon. The body is well-proportioned and may lean toward leanness or athletic musculature. The complexion is typically warm and olive or tawny. Their movement is characteristically energetic and expansive, giving an impression of freedom, adventure, and boundless optimism.",
      hi: "धनु लग्न के जातक लंबे और एथलेटिक होते हैं, चेहरा खुला और मुस्कुराता हुआ। माथा ऊंचा। आंखें जीवंत और हल्की। शरीर सुडौल। रंग गर्म और जैतून जैसा। हरकतें ऊर्जावान और उन्मुक्त।",
    },
    health: {
      en: "Hips, thighs, liver, and sciatic nerve are the vulnerable areas. Prone to sports injuries, hip problems, liver issues, and sciatic pain. Sagittarius ascendants may overextend themselves. A balanced diet that supports liver health and regular stretching helps.",
      hi: "कूल्हे, जांघें, जिगर और सायटिक नर्व कमजोर। खेल चोटें, कूल्हे और जिगर की समस्याएं। संतुलित आहार और नियमित स्ट्रेचिंग फायदेमंद।",
    },
    temperament: {
      en: "Philosophical, optimistic, and freedom-loving. Sagittarius rising individuals are truth-seekers who can be brutally honest. They are adventurous, generous, and enthusiastic, but can be tactless and restless. Higher education and philosophy are natural interests.",
      hi: "दार्शनिक, आशावादी और स्वतंत्रता-प्रेमी। सत्य के खोजी, कभी-कभी बेरहम ईमानदारी। साहसी, उदार और उत्साही, लेकिन बेतुके और बेचैन भी हो सकते हैं।",
    },
  },
  {
    sign: 10,
    name: "Capricorn",
    nameHi: "मकर लग्न",
    physicalAppearance: {
      en: "Capricorn ascendants often have a lean, angular physique with a serious, dignified bearing. The face is long and structured with prominent cheekbones and a strong, well-defined jaw. The eyes are deep-set and serious, often dark brown or grey, projecting an air of depth, calculation, and quiet ambition. The complexion is typically medium or olive-toned. They are known for looking younger than their age as they get older. Their overall appearance is understated yet authoritative — classic rather than trendy, always looking put-together.",
      hi: "मकर लग्न के जातकों का शरीर दुबला और कोणीय, गंभीर और गरिमामय। चेहरा लंबा, गाल उठे हुए, जबड़ा मजबूत। आंखें गहरी और गंभीर। रंग मध्यम या जैतून जैसा। उम्र के साथ जवान दिखते हैं। शांत लेकिन आधिकारिक छवि।",
    },
    health: {
      en: "Knees, bones, joints, skin, and teeth are vulnerable. Prone to arthritis, bone density issues, skin conditions, and dental problems. Capricorn ascendants often push through pain, which can worsen conditions. Regular bone health supplements and dental care are essential.",
      hi: "घुटने, हड्डियां, जोड़, त्वचा और दांत कमजोर। गठिया, हड्डी घनत्व समस्याएं, त्वचा विकार। नियमित हड्डी स्वास्थ्य पूरक और दंत देखभाल जरूरी।",
    },
    temperament: {
      en: "Disciplined, ambitious, and deeply responsible. Capricorn rising individuals are natural administrators who work hard and plan carefully. They can be cold or reserved but are deeply loyal. Success and status are major motivators. They improve with age, becoming wiser and more open over time.",
      hi: "अनुशासित, महत्वाकांक्षी और जिम्मेदार। कड़ी मेहनत और सावधान योजना। ठंडे या संयमित लग सकते हैं लेकिन गहरी वफादारी। सफलता और प्रतिष्ठा प्रमुख प्रेरक।",
    },
  },
  {
    sign: 11,
    name: "Aquarius",
    nameHi: "कुंभ लग्न",
    physicalAppearance: {
      en: "Aquarius ascendants often have a unique, distinctive appearance that sets them apart from the crowd. The build is typically medium to tall with an intellectual, slightly unconventional bearing. The face is broad with a high, prominent forehead — a hallmark of intellectual Aquarian energy. The eyes are clear, often light-colored (grey, blue, or green), and project a detached yet deeply observant quality. The complexion tends to be fair. They often have an individualistic style that mixes classic and bohemian elements. Their presence is magnetic precisely because they don't try to conform.",
      hi: "कुंभ लग्न के जातकों की उपस्थिति अनोखी और विशिष्ट होती है। शरीर मध्यम से लंबा, बौद्धिक। चेहरा चौड़ा, माथा ऊंचा और उभरा। आंखें साफ और अक्सर हल्के रंग की। रंग गोरा। शैली व्यक्तिगत और क्लासिक-बोहेमियन मिश्रण।",
    },
    health: {
      en: "Ankles, calves, circulatory system, and nervous system are vulnerable. Prone to varicose veins, circulatory disorders, and neurological conditions. Aquarius ascendants need to ground themselves physically — yoga, walking, and pranayama help significantly.",
      hi: "टखने, पिंडलियां, परिसंचरण और तंत्रिका तंत्र कमजोर। वैरिकोज वेन्स, परिसंचरण विकार। योग, चलना और प्राणायाम बहुत फायदेमंद।",
    },
    temperament: {
      en: "Humanitarian, innovative, and intellectually driven. Aquarius rising individuals are ahead of their time with visionary ideas. They prize freedom above all and can be emotionally detached. They care deeply about humanity as a whole but may struggle with close personal intimacy.",
      hi: "मानवतावादी, नवाचारी और बौद्धिक। समय से आगे सोचने वाले। स्वतंत्रता सर्वोपरि, भावनात्मक रूप से अलग। मानवता की गहरी परवाह लेकिन व्यक्तिगत अंतरंगता में कठिनाई।",
    },
  },
  {
    sign: 12,
    name: "Pisces",
    nameHi: "मीन लग्न",
    physicalAppearance: {
      en: "Pisces ascendants often have a gentle, ethereal beauty with soft, dreamy features. The body tends to be medium height with a somewhat fluid or soft quality — often rounder in shape. The eyes are the most distinctive feature: large, deep, luminous, and slightly unfocused — often blue, sea-green, or deep brown — giving a perpetually dreamy, otherworldly appearance. The feet are often notably large or wide. The complexion is typically pale or fair with a translucent quality. Their movements are gentle and flowing, and their overall impression is one of softness, sensitivity, compassion, and mystical depth.",
      hi: "मीन लग्न के जातकों में कोमल और अलौकिक सुंदरता होती है। शरीर मध्यम कद का, मुलायम। आंखें सबसे विशिष्ट — बड़ी, गहरी और स्वप्निल। पैर अक्सर बड़े। रंग पीला या गोरा, पारदर्शी गुण। हरकतें कोमल। कुल मिलाकर कोमलता, संवेदनशीलता और रहस्यमय गहराई।",
    },
    health: {
      en: "The feet, lymphatic system, and immune system are vulnerable. Prone to foot problems, immune weakness, infections, and substance sensitivities. Pisces ascendants absorb environmental energies and need regular cleansing practices — salt baths, fresh air, and energy clearing rituals help significantly.",
      hi: "पैर, लसीका तंत्र और प्रतिरक्षा प्रणाली कमजोर। पैरों की समस्याएं, प्रतिरक्षा कमजोरी। पर्यावरणीय ऊर्जाएं अवशोषित करते हैं — नमक स्नान और ऊर्जा शुद्धि अनुष्ठान फायदेमंद।",
    },
    temperament: {
      en: "Empathetic, artistic, and deeply spiritual. Pisces rising individuals are the mystics and dreamers of the zodiac. They absorb the emotions of those around them and need regular time alone to recharge. Boundaries can be a challenge, but their compassion and spiritual insight are extraordinary gifts.",
      hi: "सहानुभूतिशील, कलात्मक और गहरे आध्यात्मिक। राशिचक्र के रहस्यवादी और स्वप्नदृष्टा। आसपास के लोगों की भावनाएं अवशोषित करते हैं, एकांत की जरूरत। सीमाएं निर्धारित करना कठिन, लेकिन करुणा और आध्यात्मिक अंतर्दृष्टि असाधारण।",
    },
  },
];
