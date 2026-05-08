export interface BlogArticle {
  id: string;
  title: string;
  titleHindi: string;
  content: string;
  contentHindi: string;
  category:
    | "spiritual-articles"
    | "puja-guides"
    | "astrology-tips"
    | "festival-guides"
    | "health-spirituality";
  author: string;
  tags: string[];
  featuredImageUrl: string;
  publishDate: string;
  isPublished: boolean;
  slug: string;
  excerpt: string;
  excerptHindi: string;
  createdAt: number;
  updatedAt: number;
  audioUrl?: string;
}

export const blogArticles: BlogArticle[] = [
  // ── Spiritual Articles ────────────────────────────────────────────────────
  {
    id: "sa-001",
    title: "The Power of the Navkar Mantra: A Gateway to Liberation",
    titleHindi: "नवकार मंत्र की शक्ति: मुक्ति का द्वार",
    slug: "navkar-mantra-power-liberation",
    category: "spiritual-articles",
    author: "Pandit Suresh Sharma",
    tags: ["Jain", "Mantra", "Liberation", "Spirituality"],
    featuredImageUrl: "/assets/blog/navkar-mantra.jpg",
    publishDate: "2026-03-15",
    isPublished: true,
    excerpt:
      "The Navkar Mantra, also known as Namokar Mantra, is the most sacred mantra in Jainism. Discover how its 35 syllables can transform your consciousness and bring peace.",
    excerptHindi:
      "नवकार मंत्र, जिसे नमोकार मंत्र भी कहते हैं, जैन धर्म का सबसे पवित्र मंत्र है। जानिए कैसे इसके 35 अक्षर आपकी चेतना को बदल सकते हैं।",
    content: `<h2>नवकार मंत्र का महत्व</h2>
<p>The Navkar Mantra is the fundamental prayer of Jainism, revered by millions worldwide. Unlike many other mantras that invoke specific deities, the Navkar Mantra pays homage to the qualities of liberated souls — Arihantas, Siddhas, Acharyas, Upadhyayas, and all Sadhus.</p>
<h3>The Five Salutations</h3>
<p>Namo Arihantanam — I bow to the Arihantas (perfected souls)<br/>
Namo Siddhanam — I bow to the Siddhas (liberated souls)<br/>
Namo Ayariyanam — I bow to the Acharyas (religious teachers)<br/>
Namo Uvajjhayanam — I bow to the Upadhyayas (spiritual guides)<br/>
Namo Loe Savva Sahunam — I bow to all Sadhus (monks and nuns)</p>
<h3>Daily Practice</h3>
<p>Reciting the Navkar Mantra 108 times daily at dawn brings clarity of mind, purification of karma, and gradual progress on the spiritual path. The mantra creates positive vibrations that resonate with the cosmos.</p>
<h3>Scientific Perspective</h3>
<p>Modern neuroscience confirms that repetitive chanting creates measurable changes in brainwave patterns, shifting from beta (active thinking) to alpha (relaxed focus) and theta (deep meditation) states. The 35 syllables of the Navkar Mantra are particularly effective in inducing this meditative shift.</p>`,
    contentHindi: `<h2>नवकार मंत्र का परिचय</h2>
<p>नवकार मंत्र जैन धर्म की सबसे महत्वपूर्ण प्रार्थना है। यह किसी विशेष देव की नहीं, बल्कि उन गुणों की वंदना करता है जिनसे आत्मा मुक्ति पाती है।</p>
<h3>पंच परमेष्ठी को नमन</h3>
<p>इस मंत्र में अरिहंत, सिद्ध, आचार्य, उपाध्याय और साधु — इन पांचों को प्रणाम किया जाता है। प्रतिदिन 108 बार इस मंत्र का जाप करने से कर्मों का क्षय होता है।</p>`,
    createdAt: 1742000000000,
    updatedAt: 1742000000000,
  },
  {
    id: "sa-002",
    title: "108: The Sacred Number That Connects Heaven and Earth",
    titleHindi: "108: वह पवित्र संख्या जो स्वर्ग और पृथ्वी को जोड़ती है",
    slug: "108-sacred-number-heaven-earth",
    category: "spiritual-articles",
    author: "Dr. Ananya Joshi",
    tags: ["Sacred Numbers", "Numerology", "Hinduism", "Cosmos"],
    featuredImageUrl: "/assets/blog/number-108.jpg",
    publishDate: "2026-03-20",
    isPublished: true,
    excerpt:
      "From the distance of the Sun to the number of Upanishads, 108 appears everywhere in Hindu and Jain traditions. Explore the cosmic significance of this divine number.",
    excerptHindi:
      "सूर्य की दूरी से लेकर उपनिषदों की संख्या तक, 108 हर जगह प्रकट होता है। इस दिव्य संख्या के ब्रह्मांडीय महत्व को जानें।",
    content: `<h2>The Cosmic Significance of 108</h2>
<p>The number 108 holds profound significance across multiple spiritual traditions. In Hinduism, the distance between the Earth and Sun is approximately 108 times the Sun's diameter. The diameter of the Sun is 108 times Earth's diameter.</p>
<h3>In Sanskrit Traditions</h3>
<p>There are 108 Upanishads, 108 names of major deities, 108 sacred sites (Shakti Peethas and Jyotirlingas combined), and 108 beads in a mala (prayer necklace).</p>
<h3>In Jain Philosophy</h3>
<p>The number 108 represents the combination of enlightened qualities: 12 types of enlightened conduct × 9 types of restraints = 108. This is why 108-bead malas are used across traditions.</p>
<h3>Mathematical Harmony</h3>
<p>108 = 1¹ × 2² × 3³. This unique mathematical property (1 to the power 1, times 2 to the power 2, times 3 to the power 3) suggests a profound cosmic order embedded in this number.</p>`,
    contentHindi: `<h2>108 का ब्रह्मांडीय महत्व</h2>
<p>पृथ्वी और सूर्य के बीच की दूरी सूर्य के व्यास की 108 गुना है। 108 उपनिषद हैं, 108 देवनामावलियाँ हैं, और माला में 108 मनके होते हैं।</p>
<p>गणितीय रूप से भी 108 अद्वितीय है: 1¹ × 2² × 3³ = 108। यह ब्रह्मांडीय व्यवस्था का प्रतीक है।</p>`,
    createdAt: 1742100000000,
    updatedAt: 1742100000000,
  },
  {
    id: "sa-003",
    title: "Ahimsa Paramo Dharma: The Supreme Principle of Non-Violence",
    titleHindi: "अहिंसा परमो धर्म: अहिंसा का सर्वोच्च सिद्धांत",
    slug: "ahimsa-paramo-dharma-non-violence",
    category: "spiritual-articles",
    author: "Acharya Ramesh Muni",
    tags: ["Ahimsa", "Jain", "Hindu", "Ethics", "Dharma"],
    featuredImageUrl: "/assets/blog/ahimsa.jpg",
    publishDate: "2026-04-01",
    isPublished: true,
    excerpt:
      "Ahimsa is the cornerstone of both Jain and Hindu philosophy. Discover how practising non-violence at the mental, verbal, and physical levels transforms every aspect of life.",
    excerptHindi:
      "अहिंसा जैन और हिंदू दोनों दर्शनों की आधारशिला है। मानसिक, वाचिक और कायिक स्तर पर अहिंसा का पालन जीवन को कैसे बदलता है — जानें।",
    content: `<h2>What Is Ahimsa?</h2>
<p>Ahimsa, meaning non-harm or non-violence, is considered the highest duty (Paramo Dharma) in Jainism and is central to Hindu ethics. Lord Mahavira taught that all living beings, from the smallest microorganism to the largest animal, possess a soul and deserve respect.</p>
<h3>Three Levels of Ahimsa</h3>
<p><strong>Manas (Mental):</strong> Avoiding violent thoughts and wishes of harm to others.<br/>
<strong>Vachan (Verbal):</strong> Refraining from harsh, hurtful, or violent speech.<br/>
<strong>Kaya (Physical):</strong> Not harming any living being through actions.</p>
<h3>Ahimsa in Daily Life</h3>
<p>Practising ahimsa means choosing a vegetarian or vegan diet, using eco-friendly products, resolving conflicts through dialogue, and cultivating compassion for all beings. The Jain tradition takes this further with practices like filtering water and walking carefully to avoid harming small insects.</p>
<h3>Gandhi and Ahimsa</h3>
<p>Mahatma Gandhi's philosophy of non-violent resistance (Satyagraha) was directly inspired by the Jain principle of Ahimsa. He demonstrated how this ancient wisdom could be applied to resist colonial oppression and achieve political freedom.</p>`,
    contentHindi: `<h2>अहिंसा क्या है?</h2>
<p>भगवान महावीर ने कहा: "सव्वे जीवा वि इच्छंति, जीविउं न मरिज्जिउं" — सभी जीव जीना चाहते हैं, मरना नहीं। अहिंसा का अर्थ है मन, वचन और काय से किसी को भी कष्ट न देना।</p>
<p>गांधीजी ने इसी सिद्धांत से सत्याग्रह की नींव रखी और भारत को स्वतंत्रता दिलाई।</p>`,
    createdAt: 1742200000000,
    updatedAt: 1742200000000,
  },

  // ── Puja Guides ───────────────────────────────────────────────────────────
  {
    id: "pg-001",
    title: "Complete Guide to Satyanarayan Puja: Vidhi, Samagri & Benefits",
    titleHindi: "सत्यनारायण पूजा की सम्पूर्ण विधि: विधि, सामग्री और लाभ",
    slug: "satyanarayan-puja-complete-guide",
    category: "puja-guides",
    author: "Pandit Krishan Gopal",
    tags: ["Puja", "Vishnu", "Satyanarayan", "Vidhi", "Guide"],
    featuredImageUrl: "/assets/blog/satyanarayan-puja.jpg",
    publishDate: "2026-03-10",
    isPublished: true,
    excerpt:
      "Satyanarayan Puja is one of the most popular Hindu rituals, performed for prosperity and blessings of Lord Vishnu. Here is the complete step-by-step guide with all materials.",
    excerptHindi:
      "सत्यनारायण पूजा हिंदू धर्म की सबसे लोकप्रिय पूजाओं में से एक है। भगवान विष्णु की कृपा के लिए इस पूजा की सम्पूर्ण विधि यहाँ पढ़ें।",
    content: `<h2>Introduction to Satyanarayan Puja</h2>
<p>Satyanarayan Puja is dedicated to Lord Vishnu in his form as Satyanarayan (the Lord of Truth). This puja is performed on full moon days (Purnima), on auspicious occasions like house-warming, marriages, and business launches.</p>
<h3>Puja Samagri (Materials Required)</h3>
<ul>
<li>Yellow cloth for altar</li>
<li>Idol or picture of Lord Satyanarayan</li>
<li>Panchamrit (milk, curd, honey, ghee, sugar)</li>
<li>Panchameva (5 dry fruits)</li>
<li>Tulsi leaves (sacred basil)</li>
<li>Yellow flowers, especially marigold</li>
<li>Incense sticks, camphor, lamp (diya)</li>
<li>Banana leaves and coconut</li>
<li>Wheat flour (for Prasad)</li>
</ul>
<h3>Step-by-Step Puja Vidhi</h3>
<p><strong>Step 1 — Purification:</strong> Begin with a bath, wear clean clothes, and sit facing East.<br/>
<strong>Step 2 — Sankalp:</strong> State your intention (Sankalp) — name, gotra, date, and purpose.<br/>
<strong>Step 3 — Kalash Sthapana:</strong> Set up the sacred water pot (Kalash) with mango leaves.<br/>
<strong>Step 4 — Ganesh Puja:</strong> First invoke Lord Ganesh to remove obstacles.<br/>
<strong>Step 5 — Satyanarayan Puja:</strong> Offer flowers, incense, lamp, and Panchamrit to the deity.<br/>
<strong>Step 6 — Katha:</strong> Listen to all five chapters of the Satyanarayan Katha.<br/>
<strong>Step 7 — Aarti:</strong> Perform Satyanarayan Aarti.<br/>
<strong>Step 8 — Prasad Distribution:</strong> Distribute the sacred Prasad (sheera/halwa).</p>
<h3>Benefits</h3>
<p>Regular performance of this puja brings peace of mind, financial stability, removal of obstacles, fulfilment of desires, and blessings of Lord Vishnu for the entire family.</p>`,
    contentHindi: `<h2>सत्यनारायण पूजा का परिचय</h2>
<p>पूर्णिमा या किसी शुभ अवसर पर सत्यनारायण पूजा की जाती है। इस पूजा में पंचामृत, पंचमेवा, तुलसी, पीले फूल और केले के पत्ते चाहिए।</p>
<p>संकल्प लेकर, कलश स्थापना करके, गणेश वंदना करके फिर सत्यनारायण पूजा शुरू करें। पांचों अध्यायों की कथा सुनें और अंत में प्रसाद वितरण करें।</p>`,
    createdAt: 1741900000000,
    updatedAt: 1741900000000,
  },
  {
    id: "pg-002",
    title: "Navratri Puja Vidhi: 9 Days of Divine Feminine Worship",
    titleHindi: "नवरात्रि पूजा विधि: नौ दिन दैवीय शक्ति की उपासना",
    slug: "navratri-puja-vidhi-9-days",
    category: "puja-guides",
    author: "Sadhvi Madhuri Devi",
    tags: ["Navratri", "Durga", "Devi", "Puja Vidhi", "Nine Days"],
    featuredImageUrl: "/assets/blog/navratri-puja.jpg",
    publishDate: "2026-03-25",
    isPublished: true,
    excerpt:
      "Navratri honours the nine forms of Goddess Durga over nine sacred nights. Learn the specific puja for each day, the colours to wear, and how to observe the Navratri fast.",
    excerptHindi:
      "नवरात्रि में देवी दुर्गा के नौ रूपों की पूजा की जाती है। प्रत्येक दिन की विशेष पूजा विधि, रंग और व्रत नियम यहाँ जानें।",
    content: `<h2>The Nine Forms of Durga</h2>
<p>Each of the nine days of Navratri is dedicated to a specific form of Goddess Durga. Understanding these forms deepens the spiritual experience of the festival.</p>
<h3>Day-by-Day Guide</h3>
<p><strong>Day 1 — Shailputri:</strong> Wear Yellow. Offer jasmine flowers. She is the daughter of the Himalayas.<br/>
<strong>Day 2 — Brahmacharini:</strong> Wear Green. Offer sugar and panchamrit. She represents austerity.<br/>
<strong>Day 3 — Chandraghanta:</strong> Wear Grey. Offer milk sweets. She has a crescent moon on her forehead.<br/>
<strong>Day 4 — Kushmanda:</strong> Wear Orange. Offer malpua (sweet pancakes). She created the universe with her smile.<br/>
<strong>Day 5 — Skandamata:</strong> Wear White. Offer banana. She is the mother of Lord Kartikeya.<br/>
<strong>Day 6 — Katyayani:</strong> Wear Red. Offer honey. She is the warrior goddess.<br/>
<strong>Day 7 — Kaalratri:</strong> Wear Royal Blue. Offer jaggery. She is the fiercest form.<br/>
<strong>Day 8 — Mahagauri:</strong> Wear Pink. Offer coconut. She is the purest form.<br/>
<strong>Day 9 — Siddhidatri:</strong> Wear Purple. Offer sesame seeds. She grants all supernatural powers.</p>
<h3>Fasting Rules</h3>
<p>During Navratri, devotees typically eat only once a day, avoiding grains, non-vegetarian food, onion, and garlic. Permissible foods include fruits, dairy, buckwheat flour (kuttu), and water chestnut flour (singhara).</p>`,
    contentHindi: `<h2>नौ देवियाँ — नौ दिन</h2>
<p>नवरात्रि में प्रतिदिन अलग देवी की पूजा होती है — शैलपुत्री से शुरू होकर सिद्धिदात्री तक। प्रत्येक दिन का रंग, फूल और भोग अलग होता है।</p>
<p>व्रत में अनाज, प्याज-लहसुन और मांस वर्जित है। फल, दूध, कुट्टू और सिंघाड़े का आटा खाया जा सकता है।</p>`,
    createdAt: 1742050000000,
    updatedAt: 1742050000000,
  },
  {
    id: "pg-003",
    title: "Rudra Abhishek: The Sacred Bath of Lord Shiva — A Complete Guide",
    titleHindi: "रुद्राभिषेक: भगवान शिव का पवित्र अभिषेक — सम्पूर्ण गाइड",
    slug: "rudra-abhishek-lord-shiva-complete-guide",
    category: "puja-guides",
    author: "Pandit Shyamlal Tiwari",
    tags: ["Shiva", "Rudra Abhishek", "Puja", "Mahashivratri"],
    featuredImageUrl: "/assets/blog/rudra-abhishek.jpg",
    publishDate: "2026-04-05",
    isPublished: true,
    excerpt:
      "Rudra Abhishek is one of the most powerful Shiva rituals, performed by bathing the Shivling with sacred substances. Learn the 11 types of abhishek and their specific benefits.",
    excerptHindi:
      "रुद्राभिषेक भगवान शिव के सबसे शक्तिशाली अनुष्ठानों में से एक है। 11 प्रकार के अभिषेक और उनके विशेष लाभ यहाँ जानें।",
    content: `<h2>What Is Rudra Abhishek?</h2>
<p>Rudra Abhishek is the ritual of bathing Lord Shiva's Shivling with sacred substances while chanting the Rudra Sukta from the Yajurveda. It is considered one of the most powerful forms of Shiva worship.</p>
<h3>The 11 Types of Abhishek and Their Benefits</h3>
<p><strong>1. Jal (Water):</strong> For rain and general blessings<br/>
<strong>2. Dudh (Milk):</strong> For prosperity and long life<br/>
<strong>3. Dahi (Curd):</strong> For progeny and family happiness<br/>
<strong>4. Shahad (Honey):</strong> For sweet relationships and charm<br/>
<strong>5. Ghee (Clarified Butter):</strong> For health and vitality<br/>
<strong>6. Sugarcane Juice:</strong> For wealth and success<br/>
<strong>7. Coconut Water:</strong> For moksha and liberation<br/>
<strong>8. Gangajal (Ganges Water):</strong> For purification of all sins<br/>
<strong>9. Panchamrit:</strong> For fulfillment of all desires<br/>
<strong>10. Saffron Water:</strong> For knowledge and wisdom<br/>
<strong>11. Til Oil:</strong> For protection from black magic</p>
<h3>Best Timing</h3>
<p>Pradosh Kaal (1.5 hours before sunset) on Mondays and Mahashivratri are the most auspicious times for Rudra Abhishek. Shravan month is especially powerful.</p>`,
    contentHindi: `<h2>रुद्राभिषेक का महत्व</h2>
<p>यजुर्वेद के रुद्री सूक्त का पाठ करते हुए शिवलिंग पर विभिन्न द्रव्यों से अभिषेक किया जाता है। जल, दूध, दही, शहद, घी, गन्ने का रस, नारियल का पानी, गंगाजल, पंचामृत, केसर जल और तिल तेल — प्रत्येक अभिषेक का अलग लाभ है।</p>
<p>सोमवार के प्रदोष काल और महाशिवरात्रि पर यह अभिषेक सर्वाधिक फलदायी होता है।</p>`,
    createdAt: 1742300000000,
    updatedAt: 1742300000000,
  },

  // ── Astrology Tips ────────────────────────────────────────────────────────
  {
    id: "at-001",
    title: "Saturn's Transit: How Shani Sade Sati Affects Your Life",
    titleHindi: "शनि का गोचर: साढ़े साती आपके जीवन को कैसे प्रभावित करती है",
    slug: "saturn-transit-shani-sade-sati",
    category: "astrology-tips",
    author: "Jyotishi Vikram Bhandari",
    tags: ["Saturn", "Shani", "Sade Sati", "Vedic Astrology", "Remedies"],
    featuredImageUrl: "/assets/blog/shani-sade-sati.jpg",
    publishDate: "2026-03-12",
    isPublished: true,
    excerpt:
      "Shani Sade Sati is a 7.5-year period when Saturn transits through the 12th, 1st, and 2nd houses from your Moon sign. Learn what to expect and powerful remedies.",
    excerptHindi:
      "शनि साढ़े साती एक 7.5 साल की अवधि है जब शनि आपकी चंद्र राशि से 12वें, 1ले और 2रे भाव से गुजरता है। क्या उम्मीद करें और शक्तिशाली उपाय जानें।",
    content: `<h2>Understanding Shani Sade Sati</h2>
<p>Sade Sati is considered one of the most challenging astrological periods in Vedic astrology. It occurs three times in a person's life, each lasting 7.5 years. However, its effects vary significantly based on natal chart positions.</p>
<h3>Three Phases of Sade Sati</h3>
<p><strong>Phase 1 (Rising Phase):</strong> Saturn transits the 12th house from Moon — relates to losses, expenses, and spiritual awakening.<br/>
<strong>Phase 2 (Peak Phase):</strong> Saturn transits the 1st house (Moon sign) — this is the most intense phase, affecting health and personal life.<br/>
<strong>Phase 3 (Setting Phase):</strong> Saturn transits the 2nd house — affects finances and family relationships.</p>
<h3>Current Sade Sati (2024-2031)</h3>
<p>Saturn entered Aquarius in January 2023 and will be in Pisces from March 2025 to May 2027, then Aries from May 2027 to 2030. Currently under Sade Sati: Capricorn, Aquarius, and Pisces Moon signs.</p>
<h3>Powerful Remedies</h3>
<p>1. Worship Lord Shani every Saturday with sesame oil lamp<br/>
2. Recite Shani Chalisa and Shani Kavach<br/>
3. Donate black sesame seeds, mustard oil, and black clothes on Saturdays<br/>
4. Feed crows (considered sacred to Shani)<br/>
5. Wear Blue Sapphire (Neelam) after proper consultation<br/>
6. Observe fast on Saturdays</p>`,
    contentHindi: `<h2>साढ़े साती की तीन अवस्थाएं</h2>
<p>शनि जब चंद्र राशि से 12वें, 1ले और 2रे भाव में भ्रमण करता है तो साढ़े साती होती है। यह तीन चरणों में 7.5 वर्ष तक चलती है। वर्तमान में मकर, कुंभ और मीन राशि वाले इसके प्रभाव में हैं।</p>
<p>उपाय: शनिवार को तिल के तेल का दीपक, शनि चालीसा, काला तिल और सरसों का तेल दान, कौवों को भोजन।</p>`,
    createdAt: 1741950000000,
    updatedAt: 1741950000000,
  },
  {
    id: "at-002",
    title: "Rahu-Ketu Axis: The Dragon's Head and Tail in Your Horoscope",
    titleHindi: "राहु-केतु अक्ष: आपकी जन्म कुंडली में अजगर का सिर और पूंछ",
    slug: "rahu-ketu-axis-horoscope",
    category: "astrology-tips",
    author: "Astrologer Priya Mishra",
    tags: ["Rahu", "Ketu", "Shadow Planets", "Vedic Astrology", "Karma"],
    featuredImageUrl: "/assets/blog/rahu-ketu.jpg",
    publishDate: "2026-04-02",
    isPublished: true,
    excerpt:
      "Rahu and Ketu, the shadow planets, reveal your karmic axis — where you've come from (Ketu) and where you're headed (Rahu). Understand their placement in your birth chart.",
    excerptHindi:
      "राहु और केतु, छाया ग्रह, आपके कर्म अक्ष को प्रकट करते हैं — आप कहाँ से आए हैं (केतु) और कहाँ जा रहे हैं (राहु)। अपनी कुंडली में इनकी स्थिति समझें।",
    content: `<h2>The Mystery of Shadow Planets</h2>
<p>Rahu (North Node) and Ketu (South Node) are mathematical points where the Moon's orbit intersects the ecliptic. In Vedic astrology, they are treated as shadow planets (Chhaya Grahas) that reveal past life karma and future soul direction.</p>
<h3>Rahu: The Head of the Dragon</h3>
<p>Rahu represents worldly desires, material ambitions, foreign connections, technology, and illusion (Maya). Its house placement shows where you're being pulled toward in this life — your karmic mission. Strong Rahu can bring sudden fame and extraordinary success.</p>
<h3>Ketu: The Tail of the Dragon</h3>
<p>Ketu represents past life expertise, spiritual detachment, isolation, and enlightenment. Its house placement shows your past life mastery — what comes naturally but may feel hollow. Ketu is the planet of moksha.</p>
<h3>The 18-Month Cycle</h3>
<p>Rahu and Ketu change signs every 18 months in retrograde motion. Currently (2024-2025), Rahu is in Pisces and Ketu is in Virgo, emphasising spiritual growth, health matters, and service.</p>
<h3>Remedies for Rahu-Ketu</h3>
<p>For Rahu: Donate blue or multicolored items on Saturdays. Chant Rahu Beej Mantra. Donate to leprosy patients.<br/>
For Ketu: Worship Lord Ganesh. Donate blankets on Tuesdays. Fast on Tuesdays. Chant Ketu Beej Mantra.</p>`,
    contentHindi: `<h2>राहु-केतु का रहस्य</h2>
<p>राहु सांसारिक महत्वाकांक्षाओं का प्रतिनिधित्व करता है — इस जीवन का कर्म लक्ष्य। केतु पिछले जन्म की विशेषज्ञता और आध्यात्मिक मोक्ष का प्रतीक है।</p>
<p>वर्तमान में राहु मीन राशि में और केतु कन्या राशि में हैं। उपाय: राहु के लिए राहु बीज मंत्र, केतु के लिए गणेश पूजा।</p>`,
    createdAt: 1742250000000,
    updatedAt: 1742250000000,
  },
  {
    id: "at-003",
    title: "Yogas in Your Kundali: When Stars Align for Greatness",
    titleHindi: "आपकी कुंडली में योग: जब सितारे महानता के लिए संरेखित होते हैं",
    slug: "yogas-kundali-stars-align-greatness",
    category: "astrology-tips",
    author: "Jyotishi Narayan Das",
    tags: ["Yogas", "Raj Yoga", "Gajakesari", "Kundali", "Vedic Astrology"],
    featuredImageUrl: "/assets/blog/kundali-yogas.jpg",
    publishDate: "2026-04-08",
    isPublished: true,
    excerpt:
      "Special planetary combinations called Yogas can dramatically alter your destiny. From Raj Yoga to Gajakesari, learn about the most powerful yogas and how to activate them.",
    excerptHindi:
      "योग विशेष ग्रह संयोजन हैं जो आपके भाग्य को नाटकीय रूप से बदल सकते हैं। राज योग से गजकेसरी तक — सबसे शक्तिशाली योग और उन्हें सक्रिय करने के उपाय।",
    content: `<h2>What Are Astrological Yogas?</h2>
<p>Yogas are specific planetary combinations in the birth chart that produce particular results. A single birth chart can contain dozens of yogas, and their activation depends on planetary dashas (time periods).</p>
<h3>Pancha Mahapurusha Yogas</h3>
<p>These five great yogas are formed when the five planets (Mars, Mercury, Jupiter, Venus, Saturn) occupy their own or exaltation signs in angular houses (1st, 4th, 7th, 10th):<br/>
<strong>Ruchaka:</strong> Mars — physical strength, military success<br/>
<strong>Bhadra:</strong> Mercury — intelligence, business acumen<br/>
<strong>Hamsa:</strong> Jupiter — wisdom, spiritual authority<br/>
<strong>Malavya:</strong> Venus — luxury, artistic success<br/>
<strong>Shasha:</strong> Saturn — administrative power, justice</p>
<h3>Raj Yoga</h3>
<p>When lords of Kendra (angular) and Kona (trine) houses combine, a Raj Yoga forms. This is one of the most powerful combinations for worldly success, conferring leadership and prosperity.</p>
<h3>Gajakesari Yoga</h3>
<p>Formed when Jupiter is in angular position from the Moon. This yoga blesses the native with intelligence, fame, and a life like a lion (Kesari). Many successful people have this yoga.</p>
<h3>Activating Your Yogas</h3>
<p>Yogas are activated during the dasha (period) of the planets involved. Regular spiritual practice, charity, and wearing appropriate gemstones can help manifest the positive potential of your yogas.</p>`,
    contentHindi: `<h2>ज्योतिषीय योग क्या हैं?</h2>
<p>पंच महापुरुष योग: मंगल, बुध, गुरु, शुक्र या शनि अपनी या उच्च राशि में केंद्र भाव में हों तो क्रमशः रुचक, भद्र, हंस, मालव्य और शश योग बनते हैं।</p>
<p>केंद्र और कोण भावों के स्वामियों के मेल से राज योग, और गुरु का चंद्र से केंद्र में होने से गजकेसरी योग बनता है। दशा-अंतर्दशा में ये योग फलित होते हैं।</p>`,
    createdAt: 1742350000000,
    updatedAt: 1742350000000,
  },

  // ── Festival Guides ───────────────────────────────────────────────────────
  {
    id: "fg-001",
    title: "Diwali 2026: A Complete Guide to the Festival of Lights",
    titleHindi: "दीपावली 2026: दीपों के त्योहार की सम्पूर्ण गाइड",
    slug: "diwali-2026-complete-guide-festival-lights",
    category: "festival-guides",
    author: "Puja Editor",
    tags: ["Diwali", "Lakshmi Puja", "Festival", "Lights", "2026"],
    featuredImageUrl: "/assets/blog/diwali-2026.jpg",
    publishDate: "2026-02-20",
    isPublished: true,
    excerpt:
      "Diwali 2026 falls on October 20th. Discover the five days of celebration, the significance of Lakshmi Puja, how to perform Chopda Puja, and the spiritual meaning behind lighting diyas.",
    excerptHindi:
      "दीपावली 2026 में 20 अक्टूबर को मनाई जाएगी। पाँच दिनों का उत्सव, लक्ष्मी पूजा का महत्व, चोपड़ा पूजन और दीपक जलाने का आध्यात्मिक अर्थ जानें।",
    content: `<h2>Diwali 2026: Dates and Significance</h2>
<p>Diwali, the Festival of Lights, is the most celebrated Hindu festival. In 2026, the five-day celebration runs from October 17 to 21, with the main Diwali night (Amavasya) on October 20.</p>
<h3>Five Days of Diwali</h3>
<p><strong>Day 1 — Dhanteras (Oct 17):</strong> Worship Lord Dhanvantari and Goddess Lakshmi. Buy gold, silver, or utensils for prosperity.<br/>
<strong>Day 2 — Choti Diwali / Narak Chaturdashi (Oct 18):</strong> Celebrate Krishna's victory over Narakasura. Light 14 earthen lamps.<br/>
<strong>Day 3 — Diwali / Lakshmi Puja (Oct 20):</strong> The main day. Perform Lakshmi Puja at night during Pradosh Kaal.<br/>
<strong>Day 4 — Govardhan Puja / Annakut (Oct 21):</strong> Worship Lord Krishna and the Govardhan mountain.<br/>
<strong>Day 5 — Bhai Dooj (Oct 22):</strong> Brothers and sisters celebrate their bond.</p>
<h3>Lakshmi Puja Muhurat 2026</h3>
<p>The auspicious time for Lakshmi Puja on Diwali 2026 is expected to be between 6:30 PM and 8:30 PM IST. Check your local panchang for precise timings.</p>
<h3>Chopda Puja (Business Account Book Worship)</h3>
<p>Traders and businessmen perform Chopda Puja — the ritual of worshipping new account books (bahi-khata) to invite Lakshmi's blessings for the coming financial year. This is especially important in Jain and Marwari communities.</p>`,
    contentHindi: `<h2>दीपावली 2026 कब है?</h2>
<p>दीपावली 2026 में 17-22 अक्टूबर तक पांच दिन मनाई जाएगी। धनतेरस (17 अक्टूबर), छोटी दीपावली (18), दीपावली लक्ष्मी पूजन (20), गोवर्धन पूजा (21), भाई दूज (22)।</p>
<p>व्यापारी वर्ग चोपड़ा पूजन करता है — नई बही-खाता का पूजन। लक्ष्मी पूजा का मुहूर्त संध्या 6:30 से 8:30 बजे के बीच रहेगा।</p>`,
    createdAt: 1740000000000,
    updatedAt: 1740000000000,
  },
  {
    id: "fg-002",
    title: "Mahavir Jayanti 2026: Celebrating the Birth of the 24th Tirthankar",
    titleHindi: "महावीर जयंती 2026: 24वें तीर्थंकर के जन्म का उत्सव",
    slug: "mahavir-jayanti-2026-24th-tirthankar",
    category: "festival-guides",
    author: "Muni Sagaranand",
    tags: ["Mahavir Jayanti", "Jain", "Tirthankar", "Mahavir", "2026"],
    featuredImageUrl: "/assets/blog/mahavir-jayanti.jpg",
    publishDate: "2026-03-01",
    isPublished: true,
    excerpt:
      "Mahavir Jayanti 2026 falls on March 30th. The birth anniversary of Lord Mahavira, the 24th Tirthankar, is one of the most important Jain festivals. Learn about rituals and celebrations.",
    excerptHindi:
      "महावीर जयंती 2026 में 30 मार्च को मनाई जाएगी। 24वें तीर्थंकर भगवान महावीर की जन्म जयंती पर अनुष्ठान और उत्सव के बारे में जानें।",
    content: `<h2>About Lord Mahavira</h2>
<p>Lord Mahavira, born as Vardhamana, was the 24th and last Tirthankar of the present cosmic cycle. He was born on the 13th day of the bright half of Chaitra month (around 599 BCE) in Kundagrama (modern Bihar). In 2026, Mahavir Jayanti is celebrated on March 30.</p>
<h3>The Five Kalyanaks of Lord Mahavira</h3>
<p><strong>Garbha Kalyanak:</strong> 19 July (Ashadha Shukla Saptami)<br/>
<strong>Janma Kalyanak:</strong> 30 March (Chaitra Shukla Trayodashi) — Mahavir Jayanti<br/>
<strong>Diksha Kalyanak:</strong> Margashirsha Shukla Dashami<br/>
<strong>Kevalgyan Kalyanak:</strong> 26 April (Vaishakh Shukla Dashami)<br/>
<strong>Moksha Kalyanak:</strong> 9 November (Kartik Krishna Amavasya) — Diwali</p>
<h3>Celebrations Worldwide</h3>
<p>On Mahavir Jayanti, Jain temples hold special abhishek (sacred bathing of Mahavira's idol), processions (Shobha Yatra), discourses (pravachans), and charitable activities. Many devotees observe complete fasting (Upvas).</p>
<h3>The Five Principles</h3>
<p>Lord Mahavira taught five fundamental principles (Pancha Mahavrata) for a righteous life: Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (celibacy/chastity), and Aparigraha (non-possessiveness).</p>`,
    contentHindi: `<h2>भगवान महावीर का परिचय</h2>
<p>भगवान महावीर वर्तमान अवसर्पिणी काल के 24वें और अंतिम तीर्थंकर हैं। उनका जन्म चैत्र शुक्ल त्रयोदशी को वैशाली के कुंडग्राम में हुआ था। 2026 में उनकी जयंती 30 मार्च को है।</p>
<p>पांच महाव्रत: अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य और अपरिग्रह — भगवान महावीर की शिक्षाओं का मूल।</p>`,
    createdAt: 1740500000000,
    updatedAt: 1740500000000,
  },
  {
    id: "fg-003",
    title: "Paryushana Parva: The Eight Days of Jain Self-Reflection",
    titleHindi: "पर्युषण पर्व: जैन आत्म-चिंतन के आठ दिन",
    slug: "paryushana-parva-jain-self-reflection",
    category: "festival-guides",
    author: "Muni Deepanshu",
    tags: ["Paryushana", "Jain", "Samvatsari", "Kshamavani", "Fasting"],
    featuredImageUrl: "/assets/blog/paryushana-parva.jpg",
    publishDate: "2026-03-18",
    isPublished: true,
    excerpt:
      "Paryushana Parva is the most sacred Jain festival, a period of deep fasting, meditation, and forgiveness. The eight days culminate in Samvatsari — the day of universal forgiveness.",
    excerptHindi:
      "पर्युषण पर्व सबसे पवित्र जैन त्योहार है — गहन उपवास, ध्यान और क्षमा की अवधि। आठ दिन संवत्सरी के साथ समाप्त होते हैं — सार्वभौमिक क्षमा का दिन।",
    content: `<h2>What Is Paryushana Parva?</h2>
<p>Paryushana Parva is the most important festival in the Jain calendar, observed in the month of Bhadrapada (August-September). Shvetambara Jains observe it for 8 days, while Digambara Jains observe Das Lakshana for 10 days.</p>
<h3>Eight Days of Paryushana (Shvetambara)</h3>
<p><strong>Day 1:</strong> Listening to Kalpa Sutra recitation<br/>
<strong>Day 2:</strong> Kalpa Sutra discourse continues<br/>
<strong>Day 3:</strong> Janma Kalyanak of Lord Mahavira<br/>
<strong>Day 4-7:</strong> Deep meditation, fasting, study of scriptures<br/>
<strong>Day 8 (Samvatsari):</strong> The holiest day — universal forgiveness</p>
<h3>Samvatsari — Micchami Dukkadam</h3>
<p>On the final day of Paryushana, Jains seek forgiveness from all living beings for any knowingly or unknowingly caused harm during the past year. The phrase "Micchami Dukkadam" (Prakrit) or "Uttam Kshama" means "May all the evil done be forgiven."</p>
<h3>Fasting Practices</h3>
<p>Many Jains observe Atthai (8-day fast with only boiled water) during Paryushana. Others do Ekasana (eating only once a day) or Nivi (eating before sunset). Even non-practitioners typically abstain from green vegetables during this period.</p>`,
    contentHindi: `<h2>पर्युषण पर्व का परिचय</h2>
<p>श्वेतांबर जैन 8 दिन और दिगंबर जैन 10 दिन (दशलक्षण) का पर्युषण मनाते हैं। अंतिम दिन संवत्सरी पर "मिच्छामि दुक्कड़म" कहकर सभी से क्षमा माँगी जाती है।</p>
<p>अट्ठाई उपवास: 8 दिन केवल उबला पानी। एकासन: दिन में एक बार भोजन। सूर्यास्त के बाद भोजन वर्जित।</p>`,
    createdAt: 1741800000000,
    updatedAt: 1741800000000,
  },

  // ── Health & Spirituality ─────────────────────────────────────────────────
  {
    id: "hs-001",
    title: "Sattvic Diet: The Yogic Way to Eat for Mental Clarity and Peace",
    titleHindi: "सात्विक आहार: मानसिक स्पष्टता और शांति के लिए योगिक आहार शैली",
    slug: "sattvic-diet-yogic-mental-clarity-peace",
    category: "health-spirituality",
    author: "Ayurveda Expert Savita Nair",
    tags: ["Sattvic Diet", "Ayurveda", "Yoga", "Health", "Vegetarian"],
    featuredImageUrl: "/assets/blog/sattvic-diet.jpg",
    publishDate: "2026-03-28",
    isPublished: true,
    excerpt:
      "The Sattvic diet from Ayurveda and yoga traditions promotes mental clarity, compassion, and spiritual development. Learn which foods enhance Sattva Guna and which to avoid.",
    excerptHindi:
      "आयुर्वेद और योग परंपरा का सात्विक आहार मानसिक स्पष्टता, करुणा और आध्यात्मिक विकास को बढ़ावा देता है। कौन से खाद्य पदार्थ सत्व गुण बढ़ाते हैं — जानें।",
    content: `<h2>What Is the Sattvic Diet?</h2>
<p>Ayurveda classifies food according to the three Gunas (qualities): Sattva (purity), Rajas (activity), and Tamas (inertia). The Sattvic diet consists of pure, fresh, light foods that calm the mind, enhance clarity, and support spiritual practice.</p>
<h3>Sattvic Foods to Include</h3>
<ul>
<li><strong>Fruits:</strong> All fresh sweet fruits — especially mangoes, bananas, pomegranates, grapes, dates</li>
<li><strong>Vegetables:</strong> Most vegetables especially leafy greens, sweet potatoes, beets, cucumbers</li>
<li><strong>Grains:</strong> Rice, wheat, oats, barley</li>
<li><strong>Legumes:</strong> Mung beans, lentils (fresh cooked, not canned)</li>
<li><strong>Dairy:</strong> Fresh milk, ghee, paneer, lassi (not aged cheese)</li>
<li><strong>Nuts and Seeds:</strong> Almonds (soaked), coconut, sesame</li>
<li><strong>Natural Sweeteners:</strong> Honey, jaggery (in moderation)</li>
<li><strong>Spices:</strong> Turmeric, cumin, coriander, cardamom, saffron, ginger (in small quantities)</li>
</ul>
<h3>Foods to Avoid</h3>
<p><strong>Rajasic:</strong> Onion, garlic, coffee, tea, excess spices, pickles<br/>
<strong>Tamasic:</strong> Meat, fish, eggs, alcohol, processed foods, stale food, mushrooms</p>
<h3>Benefits of Sattvic Eating</h3>
<p>A consistent Sattvic diet leads to: enhanced concentration and memory, emotional stability, reduced aggression and anxiety, deeper sleep, better digestion, and an increased capacity for meditation and spiritual practice.</p>`,
    contentHindi: `<h2>सात्विक आहार क्या है?</h2>
<p>आयुर्वेद में भोजन को सात्विक, राजसिक और तामसिक में बाँटा गया है। सात्विक आहार में ताजे फल, हरी सब्जियाँ, अनाज, दालें, घी, दूध और सौम्य मसाले शामिल हैं।</p>
<p>प्याज, लहसुन, अत्यधिक मसाले (राजसिक) और मांस, शराब, बासी भोजन (तामसिक) से परहेज करें। नियमित सात्विक भोजन से एकाग्रता, भावनात्मक स्थिरता और ध्यान-क्षमता बढ़ती है।</p>`,
    createdAt: 1742150000000,
    updatedAt: 1742150000000,
  },
  {
    id: "hs-002",
    title: "Pranayama: Ancient Breathing Techniques for Modern Stress",
    titleHindi: "प्राणायाम: आधुनिक तनाव के लिए प्राचीन श्वास-तकनीक",
    slug: "pranayama-breathing-techniques-modern-stress",
    category: "health-spirituality",
    author: "Yoga Guru Prakash Kumar",
    tags: ["Pranayama", "Yoga", "Breathing", "Stress Relief", "Meditation"],
    featuredImageUrl: "/assets/blog/pranayama.jpg",
    publishDate: "2026-04-06",
    isPublished: true,
    excerpt:
      "Pranayama, the yogic science of breath control, has been shown by modern science to reduce cortisol, lower blood pressure, and improve mental health. Learn 5 essential techniques.",
    excerptHindi:
      "प्राणायाम, श्वास नियंत्रण का योगिक विज्ञान, आधुनिक विज्ञान द्वारा भी प्रमाणित है। कोर्टिसोल कम करने, रक्तचाप घटाने के लिए 5 आवश्यक प्रणालियाँ सीखें।",
    content: `<h2>The Science Behind Pranayama</h2>
<p>Modern research confirms what yogis have known for millennia: conscious breathing profoundly affects the autonomic nervous system. Pranayama activates the parasympathetic (rest-and-digest) system, countering the stress response.</p>
<h3>Five Essential Pranayama Techniques</h3>
<p><strong>1. Anulom Vilom (Alternate Nostril Breathing):</strong><br/>
Close right nostril, inhale through left (4 counts). Hold (16 counts). Close left, exhale through right (8 counts). Repeat other side. Benefits: balances brain hemispheres, reduces anxiety.</p>
<p><strong>2. Bhramari (Humming Bee Breath):</strong><br/>
Inhale deeply. Plug ears with thumbs. Exhale with humming sound. 5-10 rounds. Benefits: immediate stress relief, reduces blood pressure.</p>
<p><strong>3. Kapalabhati (Skull Shining Breath):</strong><br/>
Rapid forced exhalations (1 per second), passive inhalation. 60-120 repetitions. Benefits: detoxifies lungs, energizes mind, strengthens core.</p>
<p><strong>4. Bhastrika (Bellows Breath):</strong><br/>
Rapid deep breaths in and out. 20 rounds. Benefits: oxygenates blood, clears mental fog.</p>
<p><strong>5. Ujjayi (Ocean Breath):</strong><br/>
Inhale deeply through nose. Exhale with slight constriction in throat (like fogging a mirror). Benefits: reduces insomnia, calms the nervous system.</p>
<h3>Daily Practice Recommendation</h3>
<p>15-20 minutes of pranayama daily, preferably at dawn on an empty stomach, provides maximum benefits. Combine with 5-10 minutes of silent meditation for optimal results.</p>`,
    contentHindi: `<h2>प्राणायाम की पाँच तकनीकें</h2>
<p>1. अनुलोम-विलोम: एक-एक नासिका से श्वास — मस्तिष्क संतुलन के लिए<br/>
2. भ्रामरी: भँवरे जैसी गुनगुनाहट — तत्काल तनाव राहत<br/>
3. कपालभाति: तेज झटकेदार साँसें — फेफड़ों की शुद्धि<br/>
4. भस्त्रिका: तेज गहरी साँसें — रक्त में ऑक्सीजन<br/>
5. उज्जायी: समुद्री ध्वनि के साथ साँस — अनिद्रा में लाभकारी</p>
<p>प्रतिदिन भोर में खाली पेट 15-20 मिनट प्राणायाम करें।</p>`,
    createdAt: 1742400000000,
    updatedAt: 1742400000000,
  },
  {
    id: "hs-003",
    title: "Jal Neti and Sutra Neti: Yogic Cleansing for Sinus and Mind",
    titleHindi: "जल नेति और सूत्र नेति: नाक और मन की योगिक सफाई",
    slug: "jal-neti-sutra-neti-yogic-cleansing",
    category: "health-spirituality",
    author: "Naturopathy Expert Meera Vaidya",
    tags: ["Jal Neti", "Shatkarma", "Yoga", "Sinus", "Cleansing"],
    featuredImageUrl: "/assets/blog/jal-neti.jpg",
    publishDate: "2026-04-10",
    isPublished: true,
    excerpt:
      "Jal Neti (nasal irrigation) and Sutra Neti are Shatkarma (six purification) practices from Hatha Yoga. Modern ENT specialists recommend nasal irrigation for chronic sinus and allergies.",
    excerptHindi:
      "जल नेति और सूत्र नेति हठ योग के षट्कर्म में शामिल हैं। आधुनिक ENT विशेषज्ञ भी दीर्घकालिक साइनस और एलर्जी के लिए नाक की सफाई की सलाह देते हैं।",
    content: `<h2>What Is Jal Neti?</h2>
<p>Jal Neti (nasal irrigation with saline water) is one of the six Shatkarma purification practices in Hatha Yoga. The Hatha Yoga Pradipika describes it as beneficial for clairvoyance and removal of diseases above the shoulders.</p>
<h3>How to Practise Jal Neti</h3>
<p>1. Prepare saline solution: 1 tsp salt per litre of lukewarm water (body temperature, ~37°C).<br/>
2. Fill a Neti pot with this solution.<br/>
3. Tilt head sideways over sink. Insert neti pot spout into upper nostril.<br/>
4. Breathe through mouth as water flows through nasal cavity and exits from lower nostril.<br/>
5. Repeat on other side.<br/>
6. Dry nasal passages with Kapalabhati breathing (crucial step).</p>
<h3>Benefits Confirmed by Research</h3>
<p>Clinical studies published in major ENT journals confirm: reduced frequency of sinusitis episodes, improved nasal airflow, relief from seasonal allergies, better sleep quality, and reduced need for nasal decongestants.</p>
<h3>Spiritual Benefits</h3>
<p>In yogic tradition, clear nasal passages are essential for pranayama practice. Neti cleanses the Ajna Chakra (third eye) and is said to enhance clarity of perception, concentration, and meditation depth.</p>
<h3>Precautions</h3>
<p>Do not practise with perforated eardrum. Always use previously boiled or distilled water. Do not practise with active ear infection. Consult a doctor if you have nasal polyps.</p>`,
    contentHindi: `<h2>जल नेति कैसे करें</h2>
<p>1 लीटर गुनगुने पानी में 1 चम्मच नमक मिलाएं (शरीर के तापमान के बराबर)। नेति पॉट से एक नाक में पानी डालें और दूसरी से बाहर निकालें। बाद में कपालभाति से नाक सुखाएं।</p>
<p>शोध में साबित हुआ है कि नियमित जल नेति से साइनस, एलर्जी, और नींद की समस्या में लाभ होता है। योगिक दृष्टि से यह आज्ञा चक्र की शुद्धि करता है।</p>`,
    createdAt: 1742450000000,
    updatedAt: 1742450000000,
  },
];
