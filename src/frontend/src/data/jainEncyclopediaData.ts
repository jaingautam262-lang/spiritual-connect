export interface QAPair {
  question: string;
  answer: string;
  relatedTopics?: string[];
}

export interface EncyclopediaVolume {
  id: string;
  volumeNumber: number;
  titleEn: string;
  titleHi: string;
  description: string;
  icon: string;
  qaPairs: QAPair[];
}

export const jainEncyclopediaData: EncyclopediaVolume[] = [
  {
    id: "basics",
    volumeNumber: 1,
    titleEn: "Basics of Jainism",
    titleHi: "जैन धर्म की मूल बातें",
    description: "जैन धर्म के मूलभूत सिद्धांत, दर्शन और शिक्षाओं का परिचय।",
    icon: "🕊️",
    qaPairs: [
      {
        question: "What is Jainism? जैन धर्म क्या है?",
        answer:
          "Jainism is one of the world's oldest religions, originating in ancient India. It is a non-theistic religion that teaches the path to spiritual purity and enlightenment through disciplined non-violence (Ahimsa), truth (Satya), and renunciation. Jains believe that every living soul (Jiva) has the potential to achieve liberation (Moksha) by freeing itself from karma through right knowledge (Samyak Gyan), right faith (Samyak Darshan), and right conduct (Samyak Charitra) — known as the Three Jewels (Ratnatraya).\n\nजैन धर्म विश्व के सबसे प्राचीन धर्मों में से एक है, जो प्राचीन भारत में उद्भूत हुआ। यह एक अनीश्वरवादी धर्म है जो अहिंसा, सत्य और संयम के माध्यम से आत्मा की शुद्धि और मोक्ष का मार्ग सिखाता है।",
        relatedTopics: ["Three Jewels", "Moksha", "Karma", "Ahimsa"],
      },
      {
        question: "Who are Jains? जैन कौन होते हैं?",
        answer:
          "Jains are followers of Jainism who believe in the teachings of the Tirthankaras — the liberated souls who have crossed the ocean of worldly existence and shown others the path. Today there are approximately 4–6 million Jains worldwide, primarily in India (Maharashtra, Gujarat, Rajasthan, Karnataka). Jains are known for their strict vegetarianism, ethical business practices, and philanthropic activities.\n\nजैन वे लोग हैं जो तीर्थंकरों की शिक्षाओं में आस्था रखते हैं। विश्व में लगभग 40–60 लाख जैन हैं, मुख्यतः भारत में।",
        relatedTopics: ["Tirthankaras", "Vegetarianism", "Ahimsa"],
      },
      {
        question: "What is Jain Philosophy? जैन दर्शन क्या है?",
        answer:
          "Jain philosophy is built on several unique pillars: (1) Syadvada — the doctrine of conditional predication; (2) Anekantavada — the doctrine of many-sidedness of truth; (3) Nayavada — the theory of partial standpoints. Jain metaphysics recognizes two eternal categories: Jiva (soul) and Ajiva (non-soul). There are six Dravyas (substances): Jiva, Pudgala (matter), Dharma (medium of motion), Adharma (medium of rest), Akash (space), and Kala (time).\n\nजैन दर्शन स्याद्वाद, अनेकान्तवाद और नयवाद पर आधारित है। यह जीव और अजीव दो शाश्वत तत्वों को मानता है।",
        relatedTopics: ["Anekantavada", "Syadvada", "Six Dravyas", "Jiva"],
      },
      {
        question:
          "What are the core teachings of Jainism? जैन धर्म की मूल शिक्षाएं क्या हैं?",
        answer:
          "The core teachings of Jainism include: (1) Ahimsa — Non-violence in thought, word, and deed; (2) Satya — Truthfulness; (3) Asteya — Non-stealing; (4) Brahmacharya — Celibacy/chastity; (5) Aparigraha — Non-possessiveness. These five vows (Pancha Mahavrata) are observed by monks and nuns in their complete form and by laypeople (Anuvratas) in a limited form.\n\nजैन धर्म की पाँच मूल शिक्षाएं हैं: अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य और अपरिग्रह। ये पंच महाव्रत मुनियों द्वारा पूर्ण रूप से पालन किए जाते हैं।",
        relatedTopics: ["Pancha Mahavrata", "Ahimsa", "Aparigraha"],
      },
      {
        question: "What is Ahimsa in Jainism? जैन धर्म में अहिंसा क्या है?",
        answer:
          "Ahimsa (non-violence) is the supreme principle of Jainism — 'Ahimsa Paramo Dharma' (Non-violence is the highest religion). Jains believe in non-violence towards all living beings — from the smallest microorganism to humans. This includes avoiding harm through action, speech, and thought. Ahimsa is practiced through strict vegetarianism, reverence for all life, and avoiding unnecessary harm to any living being.\n\nअहिंसा जैन धर्म का सर्वोच्च सिद्धांत है। 'अहिंसा परमो धर्मः' — जैन सभी जीवों के प्रति हिंसा से बचते हैं, चाहे वह कार्य में हो, वचन में हो या मन में।",
        relatedTopics: ["Pancha Mahavrata", "Vegetarianism", "Compassion"],
      },
      {
        question: "What is Anekantavada? अनेकान्तवाद क्या है?",
        answer:
          "Anekantavada (the doctrine of many-sidedness) is one of the most important contributions of Jainism to world philosophy. It states that reality has infinite aspects and no single perspective can capture the complete truth. This leads to intellectual tolerance and respect for different viewpoints. It is closely related to Syadvada (conditional predication using 'maybe') and Nayavada (theory of partial standpoints).\n\nअनेकान्तवाद जैन दर्शन का अनूठा सिद्धांत है जो कहता है कि सत्य के अनंत पहलू होते हैं और कोई भी एक दृष्टिकोण सम्पूर्ण सत्य नहीं है। यह बौद्धिक सहिष्णुता का आधार है।",
        relatedTopics: ["Syadvada", "Nayavada", "Philosophy", "Truth"],
      },
      {
        question: "What is Karma in Jainism? जैन धर्म में कर्म क्या है?",
        answer:
          "In Jainism, karma is a subtle form of matter (Pudgala) that flows into and binds the soul due to actions, thoughts, and speech. There are 8 types of karma: Gyanavaraniya (knowledge-obscuring), Darshanavarniya (perception-obscuring), Vedaniya (feeling-producing), Mohaniya (deluding), Ayu (life-span-determining), Nam (body-determining), Gotra (status-determining), and Antaraya (obstructing). Liberation (Moksha) is achieved when all karma is shed.\n\nजैन धर्म में कर्म एक सूक्ष्म द्रव्य है जो आत्मा से चिपकता है। कर्म के 8 प्रकार हैं। मोक्ष तब प्राप्त होता है जब सभी कर्म नष्ट हो जाते हैं।",
        relatedTopics: ["Eight Karmas", "Moksha", "Soul", "Liberation"],
      },
    ],
  },
  {
    id: "ganadharas",
    volumeNumber: 2,
    titleEn: "Ganadharas",
    titleHi: "गणधर",
    description: "भगवान महावीर के प्रमुख शिष्य गणधरों का परिचय और उनकी भूमिका।",
    icon: "📖",
    qaPairs: [
      {
        question: "Who were the Ganadharas? गणधर कौन थे?",
        answer:
          "Ganadharas were the chief disciples of a Tirthankara who directly heard the divine speech (Divyadhwani) of the Tirthankara and composed the Agamas (Jain scriptures). They were enlightened souls (Shrutakevalis) who could comprehend the omniscient knowledge of the Tirthankara and convert it into structured scriptural teachings for the benefit of all. The Ganadharas were the first Acharyas (heads) of the Jain Sangha.\n\nगणधर तीर्थंकर के प्रमुख शिष्य थे जिन्होंने तीर्थंकर की दिव्यध्वनि को सुनकर आगमों की रचना की। ये श्रुतकेवली थे और जैन संघ के प्रथम आचार्य थे।",
        relatedTopics: ["Agamas", "Tirthankaras", "Jain Sangha"],
      },
      {
        question: "How many Ganadharas did Mahavir have? महावीर के कितने गणधर थे?",
        answer:
          "Lord Mahavir had 11 Ganadharas. Their names are: (1) Indrabhuti Gautam, (2) Agnibhuti Gautam, (3) Vayubhuti Gautam, (4) Vyakta Bharadwaj, (5) Sudharma Swami, (6) Manditvyas (Mandita), (7) Mauryaputra, (8) Akampita, (9) Achalabhraata, (10) Metarya, (11) Prabhasa. Of these, Indrabhuti Gautam was the chief Ganadhar and the most prominent disciple.\n\nभगवान महावीर के 11 गणधर थे। उनमें इंद्रभूति गौतम, अग्निभूति, वायुभूति, व्यक्त भारद्वाज, सुधर्मस्वामी, मंडित, मौर्यपुत्र, अकम्पित, अचलभ्राता, मेतार्य और प्रभास प्रमुख हैं।",
        relatedTopics: ["Indrabhuti Gautam", "Mahavir", "Agamas"],
      },
      {
        question: "What was the role of Ganadharas? गणधरों की क्या भूमिका थी?",
        answer:
          "The Ganadharas played three key roles: (1) Scriptural Composition — They composed the 12 Angas (primary scriptures) based on the Tirthankara's teachings; (2) Institutional Leadership — They led the four-fold Jain Sangha (monks, nuns, laymen, laywomen); (3) Teaching — They propagated the Tirthankara's teachings throughout society. After the Tirthankara, the senior-most Ganadhar became the head of the Sangha.\n\nगणधरों की तीन प्रमुख भूमिकाएं थीं: 1) आगम-रचना, 2) संघ-नेतृत्व, 3) धर्म-प्रचार। तीर्थंकर के बाद वरिष्ठ गणधर संघ के प्रमुख बनते थे।",
        relatedTopics: ["12 Angas", "Jain Sangha", "Agamas"],
      },
      {
        question: "Who was Indrabhuti Gautam? इंद्रभूति गौतम कौन थे?",
        answer:
          "Indrabhuti Gautam was the chief Ganadhar of Lord Mahavir and one of the most beloved disciples in Jain history. Before meeting Mahavir, he was a learned Brahmin scholar with 500 students. Upon hearing Mahavir's divine speech, he attained right knowledge and became Mahavir's first Ganadhar. He was known for his deep attachment to Mahavir (Raga). He attained Kevalgyan (omniscience) on the very night of Mahavir's Nirvana. He is also known as Gautam Swami.\n\nइंद्रभूति गौतम भगवान महावीर के प्रमुख गणधर थे। वे पहले 500 शिष्यों के गुरु ब्राह्मण पंडित थे। महावीर की दिव्यध्वनि सुनकर उन्हें सम्यक्त्व प्राप्त हुआ। महावीर निर्वाण की रात्रि को उन्हें केवलज्ञान हुआ।",
        relatedTopics: ["Mahavir Swami", "Kevalgyan", "Nirvana"],
      },
    ],
  },
  {
    id: "praman-charitra",
    volumeNumber: 3,
    titleEn: "Praman & Charitra",
    titleHi: "प्रमाण और चारित्र",
    description: "जैन ज्ञानमीमांसा (प्रमाण) और आचार (चारित्र) के सिद्धांत।",
    icon: "⚖️",
    qaPairs: [
      {
        question: "What is Praman (valid knowledge)? प्रमाण क्या है?",
        answer:
          "Praman in Jain philosophy means valid or authoritative knowledge — knowledge that accurately represents reality. Jains classify all valid cognition into two broad types: Pratyaksha (direct cognition) and Paroksha (indirect cognition). Pratyaksha includes Mati (sense-based cognition), Shruta (scriptural knowledge), Avadhi (clairvoyance), Manahparyay (telepathy), and Kevalgyan (omniscience). Paroksha includes inference, comparison, and testimony.\n\nजैन दर्शन में प्रमाण का अर्थ है यथार्थ ज्ञान। इसके दो भेद हैं: प्रत्यक्ष (साक्षात्) और परोक्ष (अनुमान आदि)। मति, श्रुत, अवधि, मनःपर्यय और केवलज्ञान — ये पाँच प्रमाण हैं।",
        relatedTopics: ["Five Jnanas", "Kevalgyan", "Epistemology"],
      },
      {
        question: "What are the types of Praman? प्रमाण के प्रकार क्या हैं?",
        answer:
          "Jainism recognizes five types of knowledge (Jnana/Praman): (1) Matijnan — sensory and mental knowledge; (2) Shrutajnan — scriptural knowledge derived from studying Agamas; (3) Avadhijnan — clairvoyance, direct knowledge of physical objects without sensory aid; (4) Manahparyayjnan — mind-reading, direct knowledge of others' thoughts; (5) Kevalajnan — omniscience, perfect and complete knowledge of all substances, all times.\n\nप्रमाण के पाँच प्रकार: 1) मतिज्ञान, 2) श्रुतज्ञान, 3) अवधिज्ञान, 4) मनःपर्ययज्ञान, 5) केवलज्ञान। केवलज्ञान सर्वोच्च अवस्था है।",
        relatedTopics: ["Kevalgyan", "Agamas", "Omniscience"],
      },
      {
        question: "What is Charitra (conduct)? चारित्र क्या है?",
        answer:
          "Charitra (right conduct) is the third of the Three Jewels (Ratnatraya) of Jainism. It means living in accordance with the ethical principles laid down by the Tirthankaras. For monks and nuns, complete Charitra involves observing the Five Mahavratas (great vows), the Five Samitis (regulations), and the Three Guptis (restraints). For laypeople, it involves observing the Anuvratas (minor vows) and twelve Shravak duties.\n\nचारित्र रत्नत्रय का तीसरा रत्न है। यह तीर्थंकरों द्वारा निर्धारित आचार-संहिता के अनुसार जीवन जीने को कहते हैं। मुनियों के लिए पंच महाव्रत, पाँच समितियाँ और तीन गुप्तियाँ चारित्र का आधार हैं।",
        relatedTopics: ["Three Jewels", "Pancha Mahavrata", "Samiti", "Gupti"],
      },
      {
        question: "What are the 5 Samitis? पाँच समितियाँ क्या हैं?",
        answer:
          "The Five Samitis (regulations for careful movement/activity) are: (1) Irya Samiti — careful walking to avoid harming small beings; (2) Bhasha Samiti — careful and righteous speech; (3) Eshaana Samiti — careful acceptance of food/alms; (4) Adaan-Nikshep Samiti — careful picking up and putting down objects; (5) Utsarg Samiti — careful disposal of body waste in places free from living beings.\n\nपाँच समितियाँ: 1) ईर्या समिति (सावधानी से चलना), 2) भाषा समिति (सावधानी से बोलना), 3) एषणा समिति (शुद्ध आहार ग्रहण), 4) आदान-निक्षेप समिति (वस्तु रखने में सावधानी), 5) उत्सर्ग समिति (मल-मूत्र त्याग में सावधानी)।",
        relatedTopics: ["Charitra", "Monks", "Ahimsa"],
      },
      {
        question: "What is Gupti? गुप्ति क्या है?",
        answer:
          "Gupti means restraint or control of the three channels of activity — mind, speech, and body. There are three Guptis: (1) Man Gupti — control of the mind, avoiding impure thoughts; (2) Vachan Gupti — control of speech, maintaining silence or speaking only what is necessary and true; (3) Kaya Gupti — control of body activity, remaining still in meditation. The Three Guptis help a monk/nun advance towards liberation.\n\nगुप्ति का अर्थ है मन, वचन और काय की गतिविधियों पर नियंत्रण। मन-गुप्ति, वचन-गुप्ति और काया-गुप्ति — ये तीन गुप्तियाँ मोक्षमार्ग में सहायक हैं।",
        relatedTopics: ["Charitra", "Samiti", "Meditation", "Liberation"],
      },
    ],
  },
  {
    id: "pooja",
    volumeNumber: 4,
    titleEn: "Pooja (Worship)",
    titleHi: "पूजा",
    description: "जैन पूजा-पद्धति, अष्टप्रकारी पूजा और पूजन-विधि का विस्तृत विवेचन।",
    icon: "🪔",
    qaPairs: [
      {
        question: "What is Puja in Jainism? जैन धर्म में पूजा क्या है?",
        answer:
          "Puja in Jainism is the worship of the Panch Parmesthi (five supreme beings: Arihant, Siddha, Acharya, Upadhyay, Sadhu). The most important form of worship is the Arihant/Tirthankara Puja. Jain Puja is unique because Jains do not ask the Tirthankaras for material blessings (since liberated souls cannot intervene in worldly affairs). Instead, the purpose of Puja is self-purification — to imbibe the qualities of the worshipped being.\n\nजैन पूजा पंच परमेष्ठी की भक्ति है। जैन पूजा में तीर्थंकरों से सांसारिक वरदान नहीं माँगे जाते, क्योंकि मुक्त आत्माएं लौकिक कार्यों में हस्तक्षेप नहीं करतीं। पूजा आत्मशुद्धि के लिए होती है।",
        relatedTopics: ["Panch Parmesthi", "Tirthankaras", "Devdravya"],
      },
      {
        question:
          "What are the 8 parts of Ashtaprakari Puja? अष्टप्रकारी पूजा के 8 अंग क्या हैं?",
        answer:
          "Ashtaprakari Puja (eight-fold worship) consists of: (1) Jal Puja — water worship (bathing the idol, symbolizing washing away sins); (2) Chandan Puja — sandalwood worship (applying sandal paste to feet/chest/forehead); (3) Pushpa Puja — flower worship (offering flowers to Tirthankaras); (4) Dhoop Puja — incense worship; (5) Deep Puja — lamp worship (lighting flames); (6) Akshat Puja — rice worship (offering unbroken rice); (7) Naivedhya Puja — food offering (fruits and sweets symbolically); (8) Fal Puja — fruit worship.\n\nअष्टप्रकारी पूजा के 8 अंग: जल पूजा, चंदन पूजा, पुष्प पूजा, धूप पूजा, दीप पूजा, अक्षत पूजा, नैवेद्य पूजा, और फल पूजा।",
        relatedTopics: ["Abhishek", "Puja Materials", "Devdravya"],
      },
      {
        question: "How is Abhishek performed? अभिषेक कैसे होता है?",
        answer:
          "Abhishek is the sacred bathing ritual of the Jina idol. It is performed with panchamrit (five nectars): water, milk, curd, ghee, and sugarcane juice. The devotee first bathes, wears clean clothes, and enters the temple. The idol is placed on a special vessel (Panchdhara kalash). The devotee pours the five liquids over the idol while reciting mantras. The used liquid (nirmalya) is considered sacred. Abhishek symbolizes bathing the Jina's feet with reverence.\n\nअभिषेक जिनेंद्र प्रतिमा का पावन स्नान है। यह पंचामृत (जल, दूध, दही, घी, ईख रस) से किया जाता है। स्वच्छ वस्त्र पहनकर, मंत्रोच्चार के साथ पंचधारा कलश से अभिषेक होता है।",
        relatedTopics: ["Panchamrit", "Jain Temple", "Devdravya"],
      },
      {
        question: "What is Devdravya? देवद्रव्य क्या है?",
        answer:
          "Devdravya refers to the wealth/materials dedicated to the deity (Jina) for the purpose of worship. It includes all offerings made to the Jina — flowers, food items, money, gold, etc. Devdravya is considered sacred and must only be used for worship purposes (building temples, buying puja materials, performing festivals). Using Devdravya for personal use is considered a serious transgression in Jainism.\n\nदेवद्रव्य जिनेंद्र को अर्पित की गई संपत्ति है। पूजा में चढ़ाया गया धन, सोना, पुष्प आदि देवद्रव्य है। इसका उपयोग केवल पूजा, मंदिर-निर्माण और धार्मिक उत्सवों के लिए ही होना चाहिए।",
        relatedTopics: ["Jain Temple", "Puja", "Ashtaprakari"],
      },
    ],
  },
  {
    id: "tirthankaras",
    volumeNumber: 5,
    titleEn: "Tirthankaras",
    titleHi: "तीर्थंकर",
    description: "जैन धर्म के 24 तीर्थंकरों का परिचय, उनके जीवन और पंचकल्याणक।",
    icon: "🏔️",
    qaPairs: [
      {
        question: "Who are the Tirthankaras? तीर्थंकर कौन होते हैं?",
        answer:
          "Tirthankaras (literally 'ford-makers') are omniscient beings who have attained enlightenment and established the 'tirtha' (four-fold community of monks, nuns, laymen, and laywomen). They are the highest spiritual teachers in Jainism. Unlike gods in other religions, Tirthankaras do not create, maintain, or destroy the universe — they simply teach the path to liberation. After liberation, they reside in Siddha Loka (abode of liberated souls).\n\nतीर्थंकर वे सर्वज्ञ, वीतरागी पुरुष हैं जिन्होंने संसार-सागर को पार कर चातुर्वर्ण संघ (साधु, साध्वी, श्रावक, श्राविका) की स्थापना की। ये ब्रह्माण्ड के कर्ता-धर्ता नहीं, केवल मोक्षमार्ग के प्रणेता हैं।",
        relatedTopics: [
          "24 Tirthankaras",
          "Moksha",
          "Siddha Loka",
          "Jain Sangha",
        ],
      },
      {
        question: "How many Tirthankaras are there? कितने तीर्थंकर होते हैं?",
        answer:
          "In the current time cycle (Avasarpini), there are 24 Tirthankaras. The first was Rishabhadev (Adinath) and the last was Mahavir Swami. In each half time-cycle (Avasarpini and Utsarpini), there are exactly 24 Tirthankaras. The 24 names are: Rishabhadev, Ajitnath, Sambhavanath, Abhinandannath, Sumatinath, Padmaprabhu, Suparshvanath, Chandraprabhu, Suvidhinath, Shitalnath, Shreyansnath, Vasupujya, Vimalnath, Anantnath, Dharmanath, Shantinath, Kunthunath, Aranath, Mallinath, Munisuvratnath, Naminath, Neminath, Parshvanath, Mahavir.\n\nवर्तमान अवसर्पिणी में 24 तीर्थंकर हुए हैं। पहले ऋषभदेव (आदिनाथ) और अंतिम महावीर स्वामी थे।",
        relatedTopics: ["Rishabhadev", "Mahavir", "Avasarpini"],
      },
      {
        question: "Who was the first Tirthankara? प्रथम तीर्थंकर कौन थे?",
        answer:
          "Rishabhadev (also known as Adinath) was the first Tirthankara of the current time cycle. According to Jain scriptures, he was born to King Nabhi and Queen Marudevi in Ayodhya. He taught humans the basic skills of civilization — agriculture (Asi), writing (Masi), and trade (Kri). He established the four-fold Sangha and attained Kevalgyan under an Ashoka tree. His symbol is the Bull (Vrisha). He is also mentioned in the Rigveda and Bhagavat Purana.\n\nऋषभदेव (आदिनाथ) वर्तमान काल के प्रथम तीर्थंकर थे। उनका जन्म अयोध्या में राजा नाभि और रानी मरुदेवी के घर हुआ। उन्होंने मानव सभ्यता को कृषि, लेखन और व्यापार सिखाया।",
        relatedTopics: ["Adinath", "Ayodhya", "Kevalgyan", "Kalyanaks"],
      },
      {
        question: "Who was Mahavir Swami? महावीर स्वामी कौन थे?",
        answer:
          "Vardhamana Mahavira (599–527 BCE) was the 24th and last Tirthankara of the current time cycle. He was born in Kundagrama (near Vaishali, Bihar) to King Siddhartha and Queen Trishala. At age 30, he renounced royal life and became an ascetic. After 12.5 years of intense penance, he attained Kevalgyan (omniscience) at Jrimbhikagrama. He preached for 30 years and attained Nirvana (liberation) at Pavapuri at age 72.\n\nवर्धमान महावीर (599–527 ईपू) वर्तमान काल के 24वें और अंतिम तीर्थंकर थे। वैशाली के पास कुंडग्राम में जन्मे, 30 वर्ष में दीक्षा ली, 12.5 वर्ष की कठोर तपस्या के बाद केवलज्ञान प्राप्त किया और 72 वर्ष की आयु में पावापुरी में निर्वाण प्राप्त किया।",
        relatedTopics: ["Kevalgyan", "Nirvana", "Pavapuri", "Ganadharas"],
      },
      {
        question:
          "What are the 4 special events (Kalyanaks)? 4 विशेष घटनाएं (कल्याणक) क्या हैं?",
        answer:
          "Actually, there are 5 Kalyanaks (auspicious events) in a Tirthankara's life: (1) Chyavana Kalyanak — the soul descends from heaven into the mother's womb; (2) Janma Kalyanak — birth of the Tirthankara; (3) Diksha Kalyanak — renunciation of worldly life; (4) Kevalgyan Kalyanak — attainment of omniscience; (5) Moksha/Nirvan Kalyanak — final liberation. These are celebrated with great devotion as the Panch Kalyanak Puja.\n\nतीर्थंकर के जीवन में 5 कल्याणक होते हैं: च्यवन, जन्म, दीक्षा, केवलज्ञान और मोक्ष। इन्हें पंचकल्याणक पूजा के रूप में बड़े उत्साह से मनाया जाता है।",
        relatedTopics: ["Five Kalyanaks", "Pancha Kalyanak Puja", "Moksha"],
      },
    ],
  },
  {
    id: "bhavanas",
    volumeNumber: 6,
    titleEn: "Bhavanas (Reflections)",
    titleHi: "भावनाएँ (अनुप्रेक्षा)",
    description: "आत्म-चिंतन की 12 भावनाएँ जो आत्मिक उन्नति में सहायक हैं।",
    icon: "🧘",
    qaPairs: [
      {
        question: "What are the 12 Bhavanas? 12 भावनाएँ क्या हैं?",
        answer:
          "The 12 Bhavanas (reflections/anupreksha) are themes for deep meditation to detach oneself from the world and progress towards liberation. They are: (1) Anitya — impermanence; (2) Asharan — no refuge; (3) Samsara — the cycle of rebirth; (4) Ekatva — aloneness; (5) Anyatva — separateness; (6) Ashuchi — impurity of body; (7) Asrava — influx of karma; (8) Samvar — stoppage of karma; (9) Nirjara — shedding of karma; (10) Loka — nature of the universe; (11) Bodhi Durlabha — rarity of right knowledge; (12) Dharma Durlabha — rarity of true religion.\n\n12 भावनाएँ: अनित्य, अशरण, संसार, एकत्व, अन्यत्व, अशुचि, आस्रव, संवर, निर्जरा, लोक, बोधिदुर्लभ और धर्मदुर्लभ।",
        relatedTopics: ["Meditation", "Karma", "Liberation"],
      },
      {
        question: "What is Anitya Bhavana? अनित्य भावना क्या है?",
        answer:
          "Anitya Bhavana (impermanence reflection) is the contemplation that all worldly things — wealth, youth, relationships, health, and life itself — are transient and will not last. Nothing in the material world is permanent. By meditating on impermanence, a spiritual seeker develops detachment from worldly objects and reduces their craving for material possessions, thereby reducing karma.\n\nअनित्य भावना में यह चिंतन किया जाता है कि संसार की सभी वस्तुएं — धन, यौवन, संबंध, स्वास्थ्य और जीवन — क्षणभंगुर हैं। इस भावना से वैराग्य उत्पन्न होता है और कर्म-बंध कम होता है।",
        relatedTopics: ["Vairagya", "Karma", "Detachment"],
      },
      {
        question: "What is Asharan Bhavana? अशरण भावना क्या है?",
        answer:
          "Asharan Bhavana (the reflection on the absence of refuge) is the contemplation that in times of true adversity — especially at the time of death — no worldly person or thing can protect us. Wealth, family, power — none can be our true refuge. The only true refuge is the dharma (religion), the Panch Parmesthi (five supreme beings), and one's own soul. This reflection motivates seeking the true path of liberation.\n\nअशरण भावना में विचार किया जाता है कि मृत्यु के समय धन, परिवार, शक्ति — कोई भी रक्षा नहीं कर सकता। एकमात्र सच्ची शरण पंच परमेष्ठी, धर्म और अपनी आत्मा है।",
        relatedTopics: ["Panch Parmesthi", "Moksha", "Dharma"],
      },
      {
        question:
          "How do Bhavanas help in spiritual progress? भावनाएँ आत्मिक उन्नति में कैसे सहायक हैं?",
        answer:
          "The 12 Bhavanas serve as antidotes to the attachments and passions that bind the soul to the cycle of rebirth. By regularly meditating on these themes, a practitioner: (1) develops detachment (vairagya) from worldly pleasures; (2) reduces the influx of new karma (asrava); (3) burns away old karma (nirjara); (4) gradually stabilizes the mind in equanimity (samata); (5) prepares the soul for higher states of meditation (Dhyana) and ultimately liberation (Moksha).\n\nभावनाएँ आत्मा को संसार-बंधन से मुक्त करने में सहायक हैं। नियमित भावनाओं से वैराग्य बढ़ता है, नए कर्म का आस्रव रुकता है, पुराने कर्म की निर्जरा होती है और मोक्ष का मार्ग प्रशस्त होता है।",
        relatedTopics: ["Asrava", "Nirjara", "Samvar", "Dhyana"],
      },
    ],
  },
  {
    id: "kalyanaks",
    volumeNumber: 7,
    titleEn: "Kalyanaks (Auspicious Events)",
    titleHi: "कल्याणक",
    description: "तीर्थंकरों के जीवन की पाँच शुभ घटनाएँ और उनका महत्व।",
    icon: "✨",
    qaPairs: [
      {
        question: "What are the 5 Kalyanaks? 5 कल्याणक क्या हैं?",
        answer:
          "The five Kalyanaks are the five most auspicious events in the life of every Tirthankara: (1) Chyavana — descent of soul from heaven into the mother's womb; (2) Janma — birth; (3) Diksha — renunciation/initiation into ascetic life; (4) Kevalgyan — attainment of omniscience; (5) Moksha/Nirvan — attainment of final liberation. All five events are celebrated by gods (Indra and other deities) with great festivities. These 5 events are collectively honored in the Pancha Kalyanak Puja.\n\n5 कल्याणक: 1) च्यवन, 2) जन्म, 3) दीक्षा, 4) केवलज्ञान, 5) मोक्ष/निर्वाण। इन पाँचों घटनाओं पर देव-देवियाँ उत्सव मनाते हैं।",
        relatedTopics: ["Tirthankaras", "Pancha Kalyanak Puja"],
      },
      {
        question: "What is Chyavana Kalyanaka? च्यवन कल्याणक क्या है?",
        answer:
          "Chyavana Kalyanaka is the first of the five auspicious events — the descent of the Tirthankara's soul from Sarvarthasiddhi (highest heaven) into the womb of his mother. This event is celebrated with festivities in all three worlds (Triloka). The mother experiences 14 auspicious dreams (Swapna) at the time of Chyavana. These dreams foretell the birth of a great Tirthankara. The earth is said to tremble gently and flowers rain from the heavens.\n\nच्यवन कल्याणक वह घटना है जब तीर्थंकर की आत्मा सर्वार्थसिद्धि से माता के गर्भ में अवतरित होती है। इस समय माता 14 शुभ स्वप्न देखती हैं। त्रिलोक में उत्सव होता है।",
        relatedTopics: ["14 Dreams", "Tirthankaras", "Sarvarthasiddhi"],
      },
      {
        question: "What is Janma Kalyanaka? जन्म कल्याणक क्या है?",
        answer:
          "Janma Kalyanaka is the birth of the Tirthankara. At the time of birth, Indra (king of gods) comes down with a retinue of 56 Dikumaris (celestial maidens) and 64 Indras, and performs the Abhishek (bath) of the newborn Tirthankara on Mount Sumeru. This ceremony is called 'Meru Abhishek' or 'Janma Abhishek'. The whole universe rejoices. The birth place becomes a pilgrimage site (Janam Bhumi).\n\nजन्म कल्याणक में तीर्थंकर का जन्म होता है। इंद्र 56 दिक्कुमारियों और 64 इंद्रों के साथ आकर मेरु पर्वत पर जिनेंद्र का जन्माभिषेक करते हैं। जन्मभूमि तीर्थक्षेत्र बन जाती है।",
        relatedTopics: ["Indra", "Meru Abhishek", "Pilgrimage"],
      },
      {
        question: "What is Diksha Kalyanaka? दीक्षा कल्याणक क्या है?",
        answer:
          "Diksha Kalyanaka is the renunciation of worldly life by the Tirthankara. The Tirthankara gives up his kingdom, family, and all possessions to become an ascetic (Muni). On the day of Diksha, the future Tirthankara sits in the Palanquin (Palana) carried by Indra and gods, goes to a garden/forest, plucks out his hair in five handfuls (Panchmushthi loch), and accepts complete asceticism. From this day, he wanders naked (in Digambar tradition) or in white clothes.\n\nदीक्षा कल्याणक में तीर्थंकर राज्य, परिवार और सारी संपत्ति छोड़कर मुनि दीक्षा ग्रहण करते हैं। पंचमुष्टि लोच करके नग्न अवस्था में तपस्या आरम्भ करते हैं।",
        relatedTopics: ["Renunciation", "Panchmushthi", "Digambar"],
      },
      {
        question: "What is Kevalgyan Kalyanaka? केवलज्ञान कल्याणक क्या है?",
        answer:
          "Kevalgyan Kalyanaka is the attainment of omniscience (Kevalgyan) by the Tirthankara after intense meditation and complete destruction of the four Ghati karmas. At this moment, the Tirthankara becomes an Arihant (worthy of worship) — all-knowing (Sarvagyan) and all-seeing (Sarvadarshi). A divine Samavasaran (divine assembly hall) is created by the gods where the Tirthankara preaches the dharma for the benefit of all living beings.\n\nकेवलज्ञान कल्याणक में तीर्थंकर को घातिकर्मों के नाश से केवलज्ञान प्राप्त होता है। देव समवसरण की रचना करते हैं जहाँ तीर्थंकर सर्वजीवों के हित के लिए धर्म का उपदेश देते हैं।",
        relatedTopics: ["Samavasaran", "Arihant", "Four Ghati Karmas"],
      },
      {
        question: "What is Moksha Kalyanaka? मोक्ष कल्याणक क्या है?",
        answer:
          "Moksha Kalyanaka (also called Nirvan Kalyanaka) is the final liberation of the Tirthankara's soul from all karma and the cycle of birth and death. At this time, the remaining four Aghati karmas are shed, the physical body falls away, and the pure soul (Siddha) ascends to Siddha Loka (Moksha), the abode of all liberated souls at the top of the universe. The soul remains in eternal, infinite bliss, knowledge, and consciousness.\n\nमोक्ष कल्याणक (निर्वाण कल्याणक) में तीर्थंकर की आत्मा सभी कर्मों से मुक्त होकर सिद्धलोक को प्राप्त होती है। वहाँ आत्मा अनंत ज्ञान, दर्शन, शक्ति और आनंद के साथ शाश्वत रूप से विराजती है।",
        relatedTopics: ["Siddha Loka", "Liberation", "Aghati Karmas"],
      },
    ],
  },
  {
    id: "universe",
    volumeNumber: 8,
    titleEn: "The Universe (Loka)",
    titleHi: "ब्रह्माण्ड (लोक)",
    description: "जैन ब्रह्माण्डविज्ञान — लोक, अलोक और षड्द्रव्य का विस्तृत विवेचन।",
    icon: "🌌",
    qaPairs: [
      {
        question:
          "What is the Jain cosmological view of the universe? जैन ब्रह्माण्डविज्ञान क्या है?",
        answer:
          "In Jain cosmology, the universe (Loka) is eternal, self-existing, and uncreated. It exists in a definite shape (like a cosmic man/Purusha standing with feet apart) and has finite extent. The Loka is divided into: Adholok (lower world with 7 hells), Madhyalok (middle world including earth), and Urdhvalok (upper world with heavens). Beyond the Loka is the Aloka — infinite, empty space with no living beings or matter.\n\nजैन ब्रह्माण्डविज्ञान में ब्रह्माण्ड (लोक) शाश्वत, स्वयंभू और अनादि है। यह एक पुरुष के आकार का है। अधोलोक (7 नरक), मध्यलोक (पृथ्वी आदि) और ऊर्ध्वलोक (स्वर्ग) — तीन भागों में विभक्त है। लोक के बाहर अलोक है।",
        relatedTopics: ["Adholok", "Madhyalok", "Urdhvalok", "Siddha Loka"],
      },
      {
        question: "What is Lok and Alok? लोक और अलोक क्या है?",
        answer:
          "Loka is the inhabited universe containing all six Dravyas (substances) including souls, matter, space, time, medium of motion, and medium of rest. It is finite in size. Aloka is the infinite space beyond the Loka, which contains only Akasha (space) — no matter, no souls, no time, and no motion/rest. Liberated souls (Siddhas) reside at the very top of the Loka (Siddha Shila), which is the boundary between Loka and Aloka.\n\nलोक वह जगत है जिसमें सभी षड्द्रव्य (आत्मा, पुद्गल, धर्म, अधर्म, आकाश, काल) विद्यमान हैं। अलोक केवल आकाश है — अनंत और शून्य। सिद्ध आत्माएं लोक के शिखर (सिद्धशिला) पर निवास करती हैं।",
        relatedTopics: ["Six Dravyas", "Siddha Loka", "Akasha"],
      },
      {
        question: "What are the 6 types of Dravyas? 6 प्रकार के द्रव्य क्या हैं?",
        answer:
          "The six eternal substances (Shadravya or Shat Dravya) in Jain metaphysics are: (1) Jiva — conscious living souls; (2) Pudgala — non-conscious matter (atoms and aggregates); (3) Dharma Dravya — medium that facilitates motion; (4) Adharma Dravya — medium that facilitates rest; (5) Akasha — space that accommodates all other substances; (6) Kala — time, which helps in change/transformation. The first is animate (Chetan), the remaining five are inanimate (Achetan).\n\nषड् द्रव्य: 1) जीव, 2) पुद्गल, 3) धर्म द्रव्य, 4) अधर्म द्रव्य, 5) आकाश, 6) काल। जीव चेतन है, शेष पाँच अचेतन हैं।",
        relatedTopics: ["Jiva", "Pudgala", "Ajiva"],
      },
      {
        question: "What is Jiva and Ajiva? जीव और अजीव क्या है?",
        answer:
          "Jiva (soul/living being) is the fundamental conscious substance — it is characterized by consciousness (Chetan), knowledge, perception, and bliss. Each Jiva is unique and eternal. Ajiva comprises the five non-conscious substances: Pudgala (matter), Dharma, Adharma, Akasha, and Kala. The entire universe is explained in terms of the interaction between Jiva and Ajiva — especially between the soul and Pudgala (karma matter).\n\nजीव चेतन तत्व है — ज्ञान, दर्शन और चेतना इसके लक्षण हैं। प्रत्येक जीव अनादि-अनंत है। अजीव में पाँच अचेतन द्रव्य (पुद्गल, धर्म, अधर्म, आकाश, काल) आते हैं।",
        relatedTopics: ["Six Dravyas", "Karma", "Liberation"],
      },
    ],
  },
  {
    id: "panch-parmesthi",
    volumeNumber: 9,
    titleEn: "Panch Parmesthi",
    titleHi: "पंच परमेष्ठी",
    description: "जैन धर्म के पाँच परम आराध्य — अरिहंत, सिद्ध, आचार्य, उपाध्याय और साधु।",
    icon: "🙏",
    qaPairs: [
      {
        question: "Who are the Panch Parmesthi? पंच परमेष्ठी कौन हैं?",
        answer:
          "The Panch Parmesthi (five supreme beings) are the five categories of souls worthy of highest reverence in Jainism: (1) Arihant — omniscient beings still in the body who preach the path; (2) Siddha — liberated souls residing in Moksha; (3) Acharya — heads of ascetic orders who guide the Sangha; (4) Upadhyay — ascetic teachers who teach the scriptures; (5) Sadhu — monks and nuns who follow the ascetic path. Collectively they are venerated in the Namokar Mantra.\n\nपंच परमेष्ठी: 1) अरिहंत, 2) सिद्ध, 3) आचार्य, 4) उपाध्याय, 5) साधु। ये पाँचों जैन धर्म के सर्वोच्च आराध्य हैं और नमोकार मंत्र में इनकी वंदना की जाती है।",
        relatedTopics: ["Namokar Mantra", "Arihant", "Siddha", "Moksha"],
      },
      {
        question: "What is Namokar Mantra? नमोकार मंत्र क्या है?",
        answer:
          "The Namokar Mantra (also Navkar Mantra) is the most important prayer in Jainism. It salutes the five supreme beings: 'Namo Arihantanam' (I bow to Arihantas), 'Namo Siddhanam' (I bow to Siddhas), 'Namo Ayariyanam' (I bow to Acharyas), 'Namo Uvajjhayanam' (I bow to Upadhyayas), 'Namo Loe Savva Sahunam' (I bow to all Sadhus). The mantra does not ask for anything — it is an expression of reverence for the qualities of these beings.\n\nनमोकार मंत्र जैन धर्म का सर्वोच्च मंत्र है। यह पंच परमेष्ठी को नमस्कार करता है। इस मंत्र में कुछ माँगा नहीं जाता — केवल महापुरुषों के गुणों की वंदना होती है।",
        relatedTopics: ["Panch Parmesthi", "Arihant", "Devotion"],
      },
      {
        question:
          "Why are the Panch Parmesthi revered? पंच परमेष्ठी की पूजा क्यों होती है?",
        answer:
          "The Panch Parmesthi are revered not because they grant boons or protect devotees from worldly troubles (liberated souls cannot interfere), but because meditating on their qualities purifies the devotee's own soul. By remembering their qualities — omniscience, non-attachment, non-violence, equanimity — the devotee develops those same qualities. The act of reverence (bhakti) itself destroys karmas and purifies the soul.\n\nपंच परमेष्ठी की भक्ति इसलिए नहीं होती कि वे वरदान देंगे, बल्कि इसलिए होती है कि उनके गुणों के चिंतन से भक्त की आत्मा शुद्ध होती है। उनके गुण — सर्वज्ञता, वीतरागता, अहिंसा — का ध्यान करने से कर्म नष्ट होते हैं।",
        relatedTopics: ["Karma", "Bhakti", "Liberation"],
      },
    ],
  },
  {
    id: "tapasya",
    volumeNumber: 10,
    titleEn: "Tapasya (Austerity)",
    titleHi: "तपस्या",
    description: "जैन तपस्या के 12 प्रकार, पर्युषण पर्व और संवत्सरी प्रतिक्रमण का महत्व।",
    icon: "🔥",
    qaPairs: [
      {
        question: "What is Tapasya in Jainism? जैन धर्म में तपस्या क्या है?",
        answer:
          "Tapasya (austerity) is the deliberate acceptance of physical and mental hardship for the purpose of burning away past karmas (Nirjara) and preventing the influx of new karmas (Samvar). In Jainism, Tapa is one of the six essential duties (Avashyak) and one of the Ten Dharmas. It is divided into Bahya Tapa (external austerities) related to the body, and Abhyantar Tapa (internal austerities) related to the mind and emotions.\n\nतपस्या जैन धर्म में पुराने कर्मों की निर्जरा और नए कर्मों के संवर के लिए स्वीकार की गई शारीरिक और मानसिक कठिनाई है। बाह्य तप और आभ्यंतर तप — दो प्रकार के तप होते हैं।",
        relatedTopics: ["Nirjara", "Samvar", "Karma", "Dharma"],
      },
      {
        question: "What are the 12 types of Tapa? 12 प्रकार के तप क्या हैं?",
        answer:
          "There are 6 Bahya (external) and 6 Abhyantar (internal) Tapas totaling 12: External: (1) Anashan — fasting; (2) Unodarita — eating less than desired; (3) Vritti Sankshep — limiting number of food items; (4) Rasa Parityag — giving up tasty foods; (5) Kaya Klesha — bodily hardship; (6) Pratisanlinata — remaining in isolated meditation. Internal: (7) Prayashchit — repentance; (8) Vinay — humility; (9) Vaiyavritya — service to elders; (10) Swadhyaya — scriptural study; (11) Dhyana — meditation; (12) Vyutsarga — giving up bodily attachment.\n\n12 तप: 6 बाह्य (अनशन, ऊनोदरिता, वृत्तिसंक्षेप, रसत्याग, कायक्लेश, प्रतिसंलीनता) और 6 आभ्यंतर (प्रायश्चित्त, विनय, वैयावृत्त्य, स्वाध्याय, ध्यान, व्युत्सर्ग)।",
        relatedTopics: ["Fasting", "Meditation", "Karma Nirjara"],
      },
      {
        question: "What is Paryushana? पर्युषण क्या है?",
        answer:
          "Paryushana is the most important festival of Jainism, observed during the monsoon season (Bhadrapada month). For Shvetambara Jains, it lasts 8 days (Ashtanika); for Digambara Jains, 10 days (Dash Lakshan). During Paryushana, Jains observe strict fasting, perform religious rites, attend discourses, read the Kalpa Sutra (for Shvetambaras) or Tattvartha Sutra, and practice forgiving others. The last day — Samvatsari/Kshamavani — is the day of universal forgiveness.\n\nपर्युषण जैन धर्म का सर्वोच्च पर्व है जो भाद्रपद मास में मनाया जाता है। श्वेतांबर 8 दिन (अष्टाहनिका) और दिगंबर 10 दिन (दशलक्षण) मनाते हैं। उपवास, स्वाध्याय, प्रवचन और क्षमाभाव इस पर्व की विशेषताएं हैं।",
        relatedTopics: ["Samvatsari", "Kshamavani", "Kalpa Sutra", "Fasting"],
      },
      {
        question: "What is Samvatsari Pratikraman? संवत्सरी प्रतिक्रमण क्या है?",
        answer:
          "Samvatsari Pratikraman is the annual repentance ritual performed on the last day of Paryushana. 'Pratikraman' means to turn back from sin — to reflect on all transgressions committed during the past year (in thought, word, and deed) and to seek forgiveness for them. The ritual includes reciting specific prayers and sutras, acknowledging faults, and vowing to avoid such faults in future. After Pratikraman, Jains greet each other with 'Michhami Dukkadam' — 'May all my offenses be forgiven.'\n\nसंवत्सरी प्रतिक्रमण पर्युषण के अंतिम दिन किया जाने वाला वार्षिक प्रायश्चित्त है। वर्ष भर के पाप-कर्मों की क्षमायाचना और आत्म-शुद्धि इसका उद्देश्य है। इसके बाद 'मिच्छामि दुक्कडम्' कहकर सबसे क्षमा माँगी जाती है।",
        relatedTopics: ["Paryushana", "Kshamavani", "Repentance"],
      },
    ],
  },
];
