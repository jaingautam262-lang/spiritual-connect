export interface CityAstrologer {
  slug: string;
  nameEn: string;
  nameHi: string;
  state: string;
  stateHi: string;
  region: "north" | "west" | "south" | "east" | "central";
  localTradition: string;
  faqItems: Array<{ question: string; answer: string }>;
}

export const CITIES: CityAstrologer[] = [
  // ----------- NORTH INDIA -----------
  {
    slug: "agra",
    nameEn: "Agra",
    nameHi: "\u0906\u0917\u0930\u093e",
    state: "Uttar Pradesh",
    stateHi:
      "\u0909\u0924\u094d\u0924\u0930 \u092a\u094d\u0930\u0926\u0947\u0936",
    region: "north",
    localTradition:
      "The city of Taj Mahal with deep Brijbhoomi connection (Krishna region) and strong ties to Vaishnava and Vedic astrology. Agra pandits are known for their expertise in relationship and marriage muhurta.",
    faqItems: [
      {
        question: "What is the astrology tradition in Agra?",
        answer:
          "Agra is part of Brajbhoomi the land of Lord Krishna. The city has a rich Vaishnava tradition with pandits who specialise in muhurta for marriages, griha pravesh, and naming ceremonies.",
      },
      {
        question: "Is online astrology as accurate as in-person in Agra?",
        answer:
          "Yes. Spiritual Connect uses the same Parashari Jyotish principles followed by local Agra pandits, available 24/7 without scheduling delays.",
      },
      {
        question: "What topics do Agra seekers usually ask about?",
        answer:
          "Relationship guidance, marriage muhurta, and business decisions are the most common queries from Agra seekers, given the city Vaishnava heritage.",
      },
    ],
  },
  {
    slug: "amritsar",
    nameEn: "Amritsar",
    nameHi: "\u0905\u092e\u0943\u0924\u0938\u0930",
    state: "Punjab",
    stateHi: "\u092a\u0902\u091c\u093e\u092c",
    region: "north",
    localTradition:
      "Punjab spiritual heart, home to the Golden Temple. Punjabi culture values astrological consultation for marriage and business decisions. Sikh and Hindu Vedic traditions coexist here.",
    faqItems: [
      {
        question: "Do Sikhs consult astrologers in Amritsar?",
        answer:
          "While the Sikh faith de-emphasises superstition, many Punjabi families in Amritsar consult Vedic astrologers for practical guidance on marriage matching, business timing, and naming newborns.",
      },
      {
        question: "What makes Amritsar astrology tradition unique?",
        answer:
          "The coexistence of Sikh and Hindu traditions creates a unique blend of Parashari Jyotish and Punjabi folk wisdom, especially around muhurta for weddings and new ventures.",
      },
      {
        question: "Can I get a Kundli consultation in Punjabi?",
        answer:
          "Spiritual Connect offers guidance in Hindi, which is widely understood in Amritsar. Local context is always factored into the reading.",
      },
    ],
  },
  {
    slug: "chandigarh",
    nameEn: "Chandigarh",
    nameHi: "\u091a\u0902\u0921\u0940\u0917\u0922\u093c",
    state: "Chandigarh",
    stateHi: "\u091a\u0902\u0921\u0940\u0917\u0922\u093c",
    region: "north",
    localTradition:
      "The planned capital of Punjab and Haryana with a cosmopolitan Punjabi-Haryanvi-Hindi urban culture, active astrology consultations for career and marriage.",
    faqItems: [
      {
        question: "Why do Chandigarh professionals seek astrology guidance?",
        answer:
          "Chandigarh educated urban workforce often turns to Vedic astrology for career decisions, marriage timing, and work-life balance, blending modern thinking with traditional wisdom.",
      },
      {
        question: "Is there a strong astrology community in Chandigarh?",
        answer:
          "Yes. Despite being a planned city, Chandigarh has a strong base of Punjabi and Haryanvi families who regularly consult Jyotishis for key life events.",
      },
      {
        question:
          "How is online astrology priced vs local Chandigarh astrologers?",
        answer:
          "Local astrologers typically charge Rs 500 to Rs 2,000 per session. Spiritual Connect offers the same depth at Rs 20 per chat, with 5 free messages to start.",
      },
    ],
  },
  {
    slug: "dehradun",
    nameEn: "Dehradun",
    nameHi: "\u0926\u0947\u0939\u0930\u093e\u0926\u0942\u0928",
    state: "Uttarakhand",
    stateHi: "\u0909\u0924\u094d\u0924\u0930\u093e\u0916\u0902\u0921",
    region: "north",
    localTradition:
      "Uttarakhand capital at the foothills of the Himalayas, gateway to the spiritual circuit and seat of Vedic learning. Strong tradition of Vedic astrology and Himalayan wisdom.",
    faqItems: [
      {
        question: "What spiritual traditions are strong in Dehradun?",
        answer:
          "Dehradun is a gateway to the Char Dham spiritual circuit. The city has a strong Shaivite and Vaishnava tradition with many Vedic scholars who practice Parashari and Jaimini astrology.",
      },
      {
        question: "Can Dehradun seekers access astrology at night?",
        answer:
          "Yes. Spiritual Connect is available 24/7 so whether in Dehradun or anywhere in Uttarakhand, guidance is instant.",
      },
      {
        question: "What life topics are most common for Dehradun seekers?",
        answer:
          "Career transitions, spiritual path guidance, and marriage decisions are the most frequent topics for Dehradun-based seekers.",
      },
    ],
  },
  {
    slug: "delhi",
    nameEn: "Delhi",
    nameHi: "\u0926\u093f\u0932\u094d\u0932\u0940",
    state: "Delhi",
    stateHi: "\u0926\u093f\u0932\u094d\u0932\u0940",
    region: "north",
    localTradition:
      "India capital with deep roots in Vedic astrology, home to some of the oldest Brahmin astrologer lineages and famed spiritual centers. Delhi seekers consult for career, marriage, and business decisions.",
    faqItems: [
      {
        question: "Why is Delhi a major astrology hub?",
        answer:
          "Delhi has been India political and cultural capital for centuries. Its dense population of Brahmin lineages, proximity to major spiritual centers, and diverse seeker base make it one of India busiest astrology markets.",
      },
      {
        question: "What are Delhi most prominent astrology traditions?",
        answer:
          "Delhi hosts practitioners of Parashari, Jaimini, and Krishnamurti Paddhati (KP) systems. Many famous Jyotishis from UP and Rajasthan have established practices here.",
      },
      {
        question: "How does Spiritual Connect serve Delhi seekers?",
        answer:
          "Delhi seekers get instant AI-powered guidance rooted in Gita wisdom and classical Jyotish, available at 2 AM before an interview or on a Sunday before a big family decision.",
      },
      {
        question: "Are consultations available in Hindi for Delhi users?",
        answer:
          "Yes. Hindi is fully supported and Spiritual Connect responses are culturally attuned to North Indian seekers.",
      },
    ],
  },
  {
    slug: "faridabad",
    nameEn: "Faridabad",
    nameHi: "\u092b\u0930\u0940\u0926\u093e\u092c\u093e\u0926",
    state: "Haryana",
    stateHi: "\u0939\u0930\u093f\u092f\u093e\u0923\u093e",
    region: "north",
    localTradition:
      "A major Delhi NCR industrial city with Haryanvi cultural roots. Residents seek astrology for business, family, and career guidance.",
    faqItems: [
      {
        question: "What topics do Faridabad residents ask astrologers about?",
        answer:
          "Business muhurta, career decisions, family disputes, and marriage matching are the most common queries from Faridabad industrial and business community.",
      },
      {
        question: "Is there a tradition of Vedic astrology in Haryana?",
        answer:
          "Yes. Haryana has deep ties to Kurukshetra, the battlefield of the Bhagavad Gita. Vedic wisdom and astrology are woven into Haryanvi culture.",
      },
      {
        question:
          "How quickly can I get an astrology consultation in Faridabad?",
        answer:
          "Immediately with Spiritual Connect. No waiting rooms, no travel. Start with 5 free messages, no credit card required.",
      },
    ],
  },
  {
    slug: "gurgaon",
    nameEn: "Gurgaon",
    nameHi: "\u0917\u0941\u0921\u093c\u0917\u093e\u0902\u0935",
    state: "Haryana",
    stateHi: "\u0939\u0930\u093f\u092f\u093e\u0923\u093e",
    region: "north",
    localTradition:
      "India corporate capital, home to Fortune 500 employees seeking modern spiritual guidance for stressful careers and life decisions.",
    faqItems: [
      {
        question: "Why do Gurgaon professionals seek astrology?",
        answer:
          "Gurgaon high-pressure corporate culture, late nights, job changes, startup risk, and work-life imbalance, drives many professionals toward Vedic astrology for perspective and timing insights.",
      },
      {
        question: "What is the most common question from Gurgaon seekers?",
        answer:
          "Career timing (Is this the right time to switch jobs?), financial decisions, and marriage compatibility are the top three questions from Gurgaon-based seekers.",
      },
      {
        question: "Can I access Spiritual Connect during office hours?",
        answer:
          "Yes, Spiritual Connect works on any device, any time. Many Gurgaon users chat during lunch breaks or late evenings.",
      },
    ],
  },
  {
    slug: "haridwar",
    nameEn: "Haridwar",
    nameHi: "\u0939\u0930\u093f\u0926\u094d\u0935\u093e\u0930",
    state: "Uttarakhand",
    stateHi: "\u0909\u0924\u094d\u0924\u0930\u093e\u0916\u0902\u0921",
    region: "north",
    localTradition:
      "One of the seven holiest cities (sapta puri), the gateway of Lord Vishnu where the Ganga enters the plains, a Kumbh Mela city with deep Vedic tradition.",
    faqItems: [
      {
        question: "Why is Haridwar especially significant for astrology?",
        answer:
          "Haridwar is one of the seven sacred cities (sapta puri) and a major Kumbh Mela location. It is home to thousands of pandits, ashrams, and Vedic schools, making it one of the densest concentrations of Jyotish knowledge in India.",
      },
      {
        question:
          "What role does the Ganga play in Haridwar spiritual tradition?",
        answer:
          "The Ganga entering the plains at Haridwar is considered deeply auspicious. Many pilgrims combine astrological consultations with Ganga snan for holistic guidance.",
      },
      {
        question: "Can I get a pitra dosha remedy from an online astrologer?",
        answer:
          "Yes. Spiritual Connect provides guidance on pitra dosha, remedies, and Gita-rooted perspectives, without upselling expensive rituals.",
      },
    ],
  },
  {
    slug: "jaipur",
    nameEn: "Jaipur",
    nameHi: "\u091c\u092f\u092a\u0941\u0930",
    state: "Rajasthan",
    stateHi: "\u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928",
    region: "north",
    localTradition:
      "The Pink City with ancient Jantar Mantar observatory. Jaipur is a historic center for Vedic astronomy and Rajasthani astrology traditions.",
    faqItems: [
      {
        question: "What makes Jaipur an astrology hub?",
        answer:
          "Maharaja Jai Singh II built the Jantar Mantar astronomical observatory in Jaipur in the 18th century. The city has a centuries-old tradition of combining Vedic astronomy with classical Jyotish.",
      },
      {
        question: "What are Rajasthani astrology traditions?",
        answer:
          "Rajasthani Jyotishis are known for their expertise in muhurta, Prashna (horary astrology), and Marwari business astrology. Gemstone recommendations are also highly trusted in this tradition.",
      },
      {
        question: "Is business astrology popular in Jaipur?",
        answer:
          "Yes. Jaipur Marwari and Rajput business community has a long tradition of consulting astrologers before major business decisions, investments, and property transactions.",
      },
    ],
  },
  {
    slug: "jodhpur",
    nameEn: "Jodhpur",
    nameHi: "\u091c\u094b\u0927\u092a\u0941\u0930",
    state: "Rajasthan",
    stateHi: "\u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928",
    region: "north",
    localTradition:
      "The Blue City of Rajasthan. Marwari trading community with deep trust in astrology for business muhurta and family decisions.",
    faqItems: [
      {
        question: "Why is astrology so trusted in Jodhpur?",
        answer:
          "Jodhpur Marwari trading community has historically consulted astrologers for business muhurta, investments, and marriage compatibility. This trust runs across generations.",
      },
      {
        question: "What does Jodhpur blue city connection mean spiritually?",
        answer:
          "The blue-painted Brahmin homes of old Jodhpur reflect a Brahmin-dominated historical quarter. Vedic learning, including astrology, has been central to Brahmin households here for centuries.",
      },
      {
        question:
          "Can I get guidance on family disputes from an online astrologer?",
        answer:
          "Yes. Spiritual Connect provides Gita-based wisdom on family harmony, relationship challenges, and dharmic decision-making, available instantly.",
      },
    ],
  },
  {
    slug: "kanpur",
    nameEn: "Kanpur",
    nameHi: "\u0915\u093e\u0928\u092a\u0941\u0930",
    state: "Uttar Pradesh",
    stateHi:
      "\u0909\u0924\u094d\u0924\u0930 \u092a\u094d\u0930\u0926\u0947\u0936",
    region: "north",
    localTradition:
      "An industrial city with a traditional North Indian spiritual fabric, home to many seekers looking for career, business, and family guidance.",
    faqItems: [
      {
        question: "Is astrology popular in Kanpur?",
        answer:
          "Yes. Despite being an industrial city, Kanpur has a strong North Indian spiritual culture. Many families consult pandits for naming ceremonies, marriage matching, and business muhurta.",
      },
      {
        question: "What are the main astrology concerns for Kanpur residents?",
        answer:
          "Career transitions, business investment timing, marriage guidance, and health concerns are the most common topics for Kanpur-based seekers.",
      },
      {
        question: "How does online astrology save time for Kanpur residents?",
        answer:
          "Kanpur busy industrial pace means residents prefer quick, reliable guidance. Spiritual Connect delivers instant answers without scheduling appointments.",
      },
    ],
  },
  {
    slug: "lucknow",
    nameEn: "Lucknow",
    nameHi: "\u0932\u0916\u0928\u090a",
    state: "Uttar Pradesh",
    stateHi:
      "\u0909\u0924\u094d\u0924\u0930 \u092a\u094d\u0930\u0926\u0947\u0936",
    region: "north",
    localTradition:
      "Awadhi cultural capital with Nawabi heritage and strong Brahmin astrologer lineages. UP seekers come to Lucknow for life guidance.",
    faqItems: [
      {
        question: "What is the astrology culture in Lucknow?",
        answer:
          "Lucknow blends Nawabi refinement with deep Brahmin astrological lineages. The city is home to respected Jyotishis who specialize in Prashna, Muhurta, and Kundali reading.",
      },
      {
        question: "Does the Awadhi tradition influence astrology here?",
        answer:
          "Yes. Lucknow refined Awadhi culture values measured, thoughtful consultation. Lucknawi astrologers are known for nuanced, detailed chart analysis rather than quick predictions.",
      },
      {
        question: "What topics do Lucknow seekers most commonly ask about?",
        answer:
          "Marriage compatibility, career in government or law, real estate timing, and family harmony are top queries from Lucknow-based seekers.",
      },
    ],
  },
  {
    slug: "ludhiana",
    nameEn: "Ludhiana",
    nameHi: "\u0932\u0941\u0927\u093f\u092f\u093e\u0928\u093e",
    state: "Punjab",
    stateHi: "\u092a\u0902\u091c\u093e\u092c",
    region: "north",
    localTradition:
      "Punjab industrial hub with a strong Sikh and Punjabi Hindu community. Families actively consult astrologers for business and marriage decisions.",
    faqItems: [
      {
        question: "What drives astrology consultations in Ludhiana?",
        answer:
          "Ludhiana thriving business community in textiles, manufacturing, and trade drives demand for muhurta consultations, business partnership analysis, and NRI family decisions.",
      },
      {
        question: "Is astrology common among Punjabi Hindus in Ludhiana?",
        answer:
          "Very much so. Punjabi Hindu families in Ludhiana regularly consult astrologers for marriage matching, naming newborns, and major business events.",
      },
      {
        question: "How can Ludhiana NRI families use Spiritual Connect?",
        answer:
          "Spiritual Connect works globally. NRI family members abroad can consult the same AI their family in Ludhiana trusts, at any hour, in Hindi or English.",
      },
    ],
  },
  {
    slug: "mathura",
    nameEn: "Mathura",
    nameHi: "\u092e\u0925\u0941\u0930\u093e",
    state: "Uttar Pradesh",
    stateHi:
      "\u0909\u0924\u094d\u0924\u0930 \u092a\u094d\u0930\u0926\u0947\u0936",
    region: "north",
    localTradition:
      "Lord Krishna birthplace, the beating spiritual heart of Spiritual Connect dharmic foundation. Central to Vaishnava astrology traditions.",
    faqItems: [
      {
        question:
          "Why is Mathura especially significant for Spiritual Connect?",
        answer:
          "Mathura is Lord Krishna birthplace, the same Krishna who delivered the Bhagavad Gita. Spiritual Connect entire AI framework is rooted in Gita wisdom, making Mathura the spiritual home of this platform.",
      },
      {
        question: "What is the astrology tradition in Mathura?",
        answer:
          "Mathura Vaishnava pandits specialise in devotional astrology, connecting planetary influences to one relationship with Krishna, dharmic purpose, and bhakti path.",
      },
      {
        question: "Can I learn about my spiritual path through astrology?",
        answer:
          "Yes. Spiritual Connect integrates Vedic astrology with Bhagavad Gita wisdom to reveal your dharmic path, purpose, and inner strengths, not just predictions.",
      },
    ],
  },
  {
    slug: "meerut",
    nameEn: "Meerut",
    nameHi: "\u092e\u0947\u0930\u0920",
    state: "Uttar Pradesh",
    stateHi:
      "\u0909\u0924\u094d\u0924\u0930 \u092a\u094d\u0930\u0926\u0947\u0936",
    region: "north",
    localTradition:
      "Historic North Indian city with traditional Brahmin astrologer communities and a strong affinity for Vedic ritual guidance.",
    faqItems: [
      {
        question: "What is the astrology tradition in Meerut?",
        answer:
          "Meerut has an old Brahmin scholarly community. Local Jyotishis are known for their expertise in Vedic rituals, muhurta, and Saturn-related remedies (Shani shanti).",
      },
      {
        question: "What concerns bring Meerut residents to astrologers?",
        answer:
          "Career decisions, delayed marriage, health issues, and business growth are top topics for Meerut-based seekers.",
      },
      {
        question: "Is Spiritual Connect available in Meerut dialect?",
        answer:
          "Spiritual Connect communicates in standard Hindi, fully understood in Meerut and Western UP, alongside English.",
      },
    ],
  },
  {
    slug: "noida",
    nameEn: "Noida",
    nameHi: "\u0928\u094b\u090f\u0921\u093e",
    state: "Uttar Pradesh",
    stateHi:
      "\u0909\u0924\u094d\u0924\u0930 \u092a\u094d\u0930\u0926\u0947\u0936",
    region: "north",
    localTradition:
      "Delhi NCR planned city, packed with IT professionals and young families looking for career, marriage, and financial guidance.",
    faqItems: [
      {
        question:
          "What kind of astrology questions do Noida IT professionals ask?",
        answer:
          "Job switches, startup timing, promotion prospects, work-life balance, and marriage compatibility are the top queries from Noida tech community.",
      },
      {
        question:
          "Is astrology relevant for young urban professionals in Noida?",
        answer:
          "Increasingly yes. Many Noida millennials combine data-driven careers with a curiosity about Vedic wisdom, seeking perspective on major life decisions.",
      },
      {
        question:
          "How is Spiritual Connect different from traditional astrologers in Noida?",
        answer:
          "Spiritual Connect gives instant, judgment-free guidance rooted in the Bhagavad Gita, not fear-based predictions or expensive remedy upsells.",
      },
    ],
  },
  {
    slug: "prayagraj",
    nameEn: "Prayagraj",
    nameHi: "\u092a\u094d\u0930\u092f\u093e\u0917\u0930\u093e\u091c",
    state: "Uttar Pradesh",
    stateHi:
      "\u0909\u0924\u094d\u0924\u0930 \u092a\u094d\u0930\u0926\u0947\u0936",
    region: "north",
    localTradition:
      "Sangam of Ganga-Yamuna-Saraswati, Kumbh Mela epicenter and ancient seat of Sanskrit and astrological learning.",
    faqItems: [
      {
        question: "Why is Prayagraj considered an astrology capital?",
        answer:
          "Prayagraj (ancient Prayag) is the Triveni Sangam, the holiest confluence in Hinduism. The city hosts the world largest gathering (Kumbh Mela) and has been a seat of Sanskrit and Jyotish learning for thousands of years.",
      },
      {
        question: "What is the Kumbh Mela connection to astrology?",
        answer:
          "Kumbh Mela itself is astronomically timed based on planetary positions of Jupiter, Sun, and Moon. Prayagraj astrologers are deeply versed in this astronomical-astrological tradition.",
      },
      {
        question: "What types of readings are Prayagraj pandits known for?",
        answer:
          "Kundali analysis, pitra dosha remedies, Kaal Sarp Dosha shanti, and pilgrimage timing guidance are specialties of Prayagraj Jyotishis.",
      },
    ],
  },
  {
    slug: "rishikesh",
    nameEn: "Rishikesh",
    nameHi: "\u090b\u0937\u093f\u0915\u0947\u0936",
    state: "Uttarakhand",
    stateHi: "\u0909\u0924\u094d\u0924\u0930\u093e\u0916\u0902\u0921",
    region: "north",
    localTradition:
      "World yoga capital on the banks of Ganga. Spiritual seekers from across the world come here for Jyotisha, yoga, and meditation.",
    faqItems: [
      {
        question: "Why do international seekers visit Rishikesh for astrology?",
        answer:
          "Rishikesh ashram culture attracts seekers from every country. Many combine yoga retreats with Jyotish readings to understand their dharmic path and spiritual karmas.",
      },
      {
        question: "What makes Rishikesh astrology different?",
        answer:
          "Rishikesh astrologers often integrate Vedic wisdom with yoga philosophy. The reading is less about prediction and more about inner transformation and life purpose.",
      },
      {
        question:
          "Can I get a spiritual-path reading online instead of traveling to Rishikesh?",
        answer:
          "Yes. Spiritual Connect delivers Gita-rooted guidance on your spiritual path, dharma, and purpose from anywhere in the world.",
      },
    ],
  },
  {
    slug: "srinagar",
    nameEn: "Srinagar",
    nameHi: "\u0936\u094d\u0930\u0940\u0928\u0917\u0930",
    state: "Jammu & Kashmir",
    stateHi:
      "\u091c\u092e\u094d\u092e\u0942 & \u0915\u0936\u094d\u092e\u0940\u0930",
    region: "north",
    localTradition:
      "The summer capital of J&K, rich in Kashmiri Shaivite and Pandit astrology traditions, home of the Shaiva Trika school.",
    faqItems: [
      {
        question: "What is the Kashmiri Shaivite astrology tradition?",
        answer:
          "Kashmiri Pandits are custodians of the Shaiva Trika school, an ancient non-dual philosophy that integrates astrology with Tantric and Shaivite knowledge. This tradition is distinct from mainstream Parashari Jyotish.",
      },
      {
        question:
          "Are Kashmiri Pandits still practising astrology in Srinagar?",
        answer:
          "The Kashmiri Pandit community, despite displacement, has preserved their astrological traditions. Many practitioners are now in Delhi, Jammu, and online.",
      },
      {
        question: "What topics are most important for Srinagar-based seekers?",
        answer:
          "Family stability, career abroad (NRI guidance), and peace-related life decisions are common topics for seekers connected to Srinagar.",
      },
    ],
  },
  {
    slug: "udaipur",
    nameEn: "Udaipur",
    nameHi: "\u0909\u0926\u092f\u092a\u0941\u0930",
    state: "Rajasthan",
    stateHi: "\u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928",
    region: "north",
    localTradition:
      "The City of Lakes. Mewar royal heritage with Vaishnava Sampradaya and strong Rajasthani astrology traditions.",
    faqItems: [
      {
        question: "What is Udaipur connection to Vaishnava tradition?",
        answer:
          "Udaipur Mewar royals were devoted Vaishnavas. The city has deep ties to the Eklingi temple and Nathwara, a major Krishna pilgrimage site. Vaishnava pandits here integrate devotion with Jyotish.",
      },
      {
        question:
          "What do Udaipur seekers typically consult astrologers about?",
        answer:
          "Marriage guidance, business decisions, property purchases, and spiritual direction are top topics for Udaipur Rajput and Marwari community.",
      },
      {
        question: "Is Udaipur astrology tradition influenced by royalty?",
        answer:
          "Yes. The Mewar royal court maintained court astrologers for centuries. This royal patronage created a highly refined Rajasthani Jyotish tradition.",
      },
    ],
  },
  {
    slug: "varanasi",
    nameEn: "Varanasi",
    nameHi: "\u0935\u093e\u0930\u093e\u0923\u0938\u0940",
    state: "Uttar Pradesh",
    stateHi:
      "\u0909\u0924\u094d\u0924\u0930 \u092a\u094d\u0930\u0926\u0947\u0936",
    region: "north",
    localTradition:
      "Kashi, the spiritual capital of India, one of the oldest continuously inhabited cities and the epicenter of Vedic and Jyotish learning.",
    faqItems: [
      {
        question: "Why is Varanasi India most important astrology city?",
        answer:
          "Kashi (Varanasi) is where Lord Shiva is said to personally grant moksha. The city has been a seat of Sanskrit, Vedic, and Jyotish learning for 5,000+ years. Virtually every classical astrology lineage traces roots to Kashi.",
      },
      {
        question: "What makes Kashi Jyotishis unique?",
        answer:
          "Kashi Jyotishis are trained in classical texts including Brihat Parashara Hora Shastra, Jataka Parijata, and Saravali. They are known for their precision in dasha timing and moksha-related readings.",
      },
      {
        question: "Can I get moksha-timing guidance online?",
        answer:
          "Spiritual Connect integrates Gita wisdom on liberation, duty, and the nature of the soul, the closest digital equivalent to a Kashi-style Vedic reading.",
      },
    ],
  },
  {
    slug: "vrindavan",
    nameEn: "Vrindavan",
    nameHi: "\u0935\u0943\u0902\u0926\u093e\u0935\u0928",
    state: "Uttar Pradesh",
    stateHi:
      "\u0909\u0924\u094d\u0924\u0930 \u092a\u094d\u0930\u0926\u0947\u0936",
    region: "north",
    localTradition:
      "The sacred forest where Krishna spent his childhood, the spiritual capital of Vaishnavism and ISKCON, visited by millions.",
    faqItems: [
      {
        question:
          "What is the spiritual significance of Vrindavan for astrology?",
        answer:
          "Vrindavan is where Lord Krishna cosmic leelas unfolded. Vaishnava astrologers here integrate bhakti yoga with Jyotish. The goal is not just prediction but spiritual alignment with Krishna divine will.",
      },
      {
        question: "Does ISKCON in Vrindavan offer astrological guidance?",
        answer:
          "ISKCON incorporates Vedic principles including Jyotish in its broader spiritual curriculum. Vrindavan Vaishnava community generally values astrology as a tool for dharmic understanding.",
      },
      {
        question: "How is Spiritual Connect connected to Vrindavan tradition?",
        answer:
          "Spiritual Connect AI is rooted in Krishna teachings from the Bhagavad Gita, making it an extension of the Vrindavan tradition emphasis on Gita-centric guidance.",
      },
    ],
  },

  // ----------- WEST INDIA -----------
  {
    slug: "ahmedabad",
    nameEn: "Ahmedabad",
    nameHi: "\u0905\u0939\u092e\u0926\u093e\u092c\u093e\u0926",
    state: "Gujarat",
    stateHi: "\u0917\u0941\u091c\u0930\u093e\u0924",
    region: "west",
    localTradition:
      "Gujarat commercial capital with strong Jain and Vaishnava influences. Gujaratis have a long tradition of consulting astrologers for business decisions.",
    faqItems: [
      {
        question:
          "Why is astrology so trusted in Ahmedabad business community?",
        answer:
          "Ahmedabad Gujarati and Jain business communities have a centuries-old tradition of consulting Jyotishis for muhurta, business partnerships, and property decisions.",
      },
      {
        question: "Is Jain astrology different from Hindu Vedic astrology?",
        answer:
          "Jain tradition generally de-emphasises astrology, but many Jain businesspeople in Ahmedabad consult Vedic astrologers for practical muhurta guidance, separate from religious practice.",
      },
      {
        question: "What are typical questions from Ahmedabad seekers?",
        answer:
          "Business launch timing, financial investment, marriage matching, and naming children are the most common topics for Ahmedabad-based seekers.",
      },
    ],
  },
  {
    slug: "mumbai",
    nameEn: "Mumbai",
    nameHi: "\u092e\u0941\u0902\u092c\u0908",
    state: "Maharashtra",
    stateHi: "\u092e\u0939\u093e\u0930\u093e\u0937\u094d\u091f\u094d\u0930",
    region: "west",
    localTradition:
      "India financial capital with a diverse mix of Marathi, Gujarati, Jain, and Parsi astrology traditions. Home to some of India most respected Jyotishis.",
    faqItems: [
      {
        question: "Why is Mumbai an important astrology center?",
        answer:
          "Mumbai cosmopolitan mix of Marathi, Gujarati, Jain, Sindhi, and Parsi communities creates a rich mosaic of astrology traditions. The city is home to renowned Jyotishis, Tarot readers, and numerologists.",
      },
      {
        question: "Is Bollywood connected to astrology in Mumbai?",
        answer:
          "Yes. Many film industry professionals in Mumbai are known to consult astrologers for project launch timing, career direction, and muhurta for major life events.",
      },
      {
        question: "How does Spiritual Connect serve Mumbai diverse community?",
        answer:
          "Spiritual Connect AI understands the diverse Mumbai seeker whether Marathi, Gujarati, or NRI, and delivers Gita-rooted guidance in Hindi and English.",
      },
      {
        question: "Can I consult at midnight in Mumbai?",
        answer:
          "Yes. Spiritual Connect is available 24/7. Whether you are finishing a late-night shift or in a BKC office, guidance is instant.",
      },
    ],
  },
  {
    slug: "nagpur",
    nameEn: "Nagpur",
    nameHi: "\u0928\u093e\u0917\u092a\u0941\u0930",
    state: "Maharashtra",
    stateHi: "\u092e\u0939\u093e\u0930\u093e\u0937\u094d\u091f\u094d\u0930",
    region: "west",
    localTradition:
      "The orange city at India geographic center. Nagpur combines Marathi and Vidarbha astrology traditions with a rising digital spiritual community.",
    faqItems: [
      {
        question: "What is Nagpur position in Indian astrology?",
        answer:
          "Nagpur sits at India geographic center. Its Marathi and Vidarbha communities have deep ties to Shaivite traditions, and the city has an active community of Vedic astrologers.",
      },
      {
        question: "Is there a strong online astrology trend in Nagpur?",
        answer:
          "Yes. Nagpur growing IT sector and educated urban population have created demand for online astrology platforms that combine classical depth with modern accessibility.",
      },
      {
        question: "What are common topics for Nagpur seekers?",
        answer:
          "Career growth, marriage decisions, Vastu for new homes, and financial guidance are the most requested topics from Nagpur-based seekers.",
      },
    ],
  },
  {
    slug: "nashik",
    nameEn: "Nashik",
    nameHi: "\u0928\u093e\u0938\u093f\u0915",
    state: "Maharashtra",
    stateHi: "\u092e\u0939\u093e\u0930\u093e\u0937\u094d\u091f\u094d\u0930",
    region: "west",
    localTradition:
      "One of the four Kumbh Mela cities on the Godavari river, a sacred spiritual center with strong Vedic and Puranic astrology tradition.",
    faqItems: [
      {
        question: "Why is Nashik spiritually significant?",
        answer:
          "Nashik hosts the Simhastha Kumbh Mela on the Godavari river and is the site of the Trimbakeshwar Jyotirlinga. This sacred geography has nurtured a powerful Vedic tradition for thousands of years.",
      },
      {
        question: "Are Nashik astrologers known for a specific specialisation?",
        answer:
          "Yes. Nashik Jyotishis are particularly respected for Kaal Sarp Dosha shanti, as the Trimbakeshwar temple is the primary location for this ritual.",
      },
      {
        question: "Can I get Kaal Sarp Dosha analysis online?",
        answer:
          "Yes. Spiritual Connect provides a clear Kaal Sarp Dosha analysis from your birth chart, with Gita-based remedies and practical guidance.",
      },
    ],
  },
  {
    slug: "navi-mumbai",
    nameEn: "Navi Mumbai",
    nameHi: "\u0928\u0935\u0940 \u092e\u0941\u0902\u092c\u0908",
    state: "Maharashtra",
    stateHi: "\u092e\u0939\u093e\u0930\u093e\u0937\u094d\u091f\u094d\u0930",
    region: "west",
    localTradition:
      "Mumbai planned sister city with a growing population and active demand for online astrology consultations.",
    faqItems: [
      {
        question: "Is there an astrology tradition in Navi Mumbai?",
        answer:
          "Navi Mumbai residents come from across India, Maharashtrian, Gujarati, UP, and South Indian communities all bring their astrology traditions with them, creating a diverse seeker base.",
      },
      {
        question: "What is the most common request from Navi Mumbai seekers?",
        answer:
          "Career guidance, new home Vastu, and marriage compatibility are top topics, reflecting Navi Mumbai young family-oriented demographic.",
      },
      {
        question: "Can I access Spiritual Connect from Navi Mumbai suburbs?",
        answer:
          "Yes. Spiritual Connect works on any internet connection, Kharghar, Vashi, Belapur, or anywhere in the MMR area.",
      },
    ],
  },
  {
    slug: "pune",
    nameEn: "Pune",
    nameHi: "\u092a\u0941\u0923\u0947",
    state: "Maharashtra",
    stateHi: "\u092e\u0939\u093e\u0930\u093e\u0937\u094d\u091f\u094d\u0930",
    region: "west",
    localTradition:
      "The cultural heart of Maharashtra, known for Jyotisha scholars and a blend of traditional Marathi wisdom with modern technology.",
    faqItems: [
      {
        question: "Why is Pune an important Jyotisha center?",
        answer:
          "Pune has a rich Brahmin scholarly tradition. The Peshwa period saw court astrologers with significant influence. Today Pune hosts several Jyotish institutions and respected practitioners.",
      },
      {
        question: "How do Pune tech professionals use astrology?",
        answer:
          "Pune large IT and startup community uses astrology for career timing, entrepreneurship decisions, and work-life balance. Many combine yogic practice with Jyotish for a holistic approach.",
      },
      {
        question: "What distinguishes Marathi astrology in Pune?",
        answer:
          "Pune Chitpavan Brahmin community has a deep Parashari tradition. The city also has practitioners of Jaimini and KP (Krishnamurti) systems, offering a richer diversity of approaches.",
      },
    ],
  },
  {
    slug: "rajkot",
    nameEn: "Rajkot",
    nameHi: "\u0930\u093e\u091c\u0915\u094b\u091f",
    state: "Gujarat",
    stateHi: "\u0917\u0941\u091c\u0930\u093e\u0924",
    region: "west",
    localTradition:
      "Saurashtra main city with strong Gujarati Vaishnava and Swaminarayan influence, deeply trusting of astrology for marriage and business.",
    faqItems: [
      {
        question: "What is the spiritual tradition in Rajkot?",
        answer:
          "Rajkot is a major center of the Swaminarayan Sampraday and Vaishnava traditions in Saurashtra. While Swaminarayan followers prioritize devotion over astrology, Vedic astrology remains widely practised for muhurta and family decisions.",
      },
      {
        question: "How do Rajkot business families use astrology?",
        answer:
          "Gujarati business families in Rajkot consult astrologers for new venture timing, partnership analysis, and investment decisions, often combined with Vastu advice.",
      },
      {
        question: "Is Spiritual Connect available for Saurashtra communities?",
        answer:
          "Yes. Spiritual Connect serves all of Gujarat communities, in Hindi and English, with cultural sensitivity to both Vaishnava and Jain traditions.",
      },
    ],
  },
  {
    slug: "surat",
    nameEn: "Surat",
    nameHi: "\u0938\u0942\u0930\u0924",
    state: "Gujarat",
    stateHi: "\u0917\u0941\u091c\u0930\u093e\u0924",
    region: "west",
    localTradition:
      "A booming diamond and textile city with deep Gujarati Vaishnava roots. Suratis consult astrologers for business decisions.",
    faqItems: [
      {
        question: "Why do Surat diamond traders use astrology?",
        answer:
          "Surat diamond industry involves enormous capital decisions. Gujarati traders have a long tradition of consulting astrologers for muhurta before major transactions, partnerships, and market decisions.",
      },
      {
        question: "What role does numerology play in Surat business culture?",
        answer:
          "Surat business community actively uses numerology alongside Jyotish for business name selection, mobile numbers, and property decisions.",
      },
      {
        question: "Can Spiritual Connect help with business muhurta in Surat?",
        answer:
          "Yes. Spiritual Connect provides guidance on auspicious timing for business launches, agreements, and major purchases, based on your Vedic birth chart.",
      },
    ],
  },
  {
    slug: "thane",
    nameEn: "Thane",
    nameHi: "\u0920\u093e\u0923\u0947",
    state: "Maharashtra",
    stateHi: "\u092e\u0939\u093e\u0930\u093e\u0937\u094d\u091f\u094d\u0930",
    region: "west",
    localTradition:
      "MMR twin city with Marathi roots and metro accessibility. Residents seek astrology for city life balance.",
    faqItems: [
      {
        question: "What is the astrology culture in Thane?",
        answer:
          "Thane has a diverse population of Maharashtrian, Gujarati, and North Indian families. Its proximity to Mumbai means seekers expect the same quality of astrology consultation, faster.",
      },
      {
        question: "What are common topics for Thane seekers?",
        answer:
          "New home Vastu, career guidance in Mumbai financial sector, marriage compatibility, and family harmony are top topics for Thane-based seekers.",
      },
      {
        question: "Can I chat with Spiritual Connect during my Thane commute?",
        answer:
          "Yes. Spiritual Connect is fully mobile-optimized, perfect for a quick consultation during a commute on the Thane-Mumbai train.",
      },
    ],
  },
  {
    slug: "vadodara",
    nameEn: "Vadodara",
    nameHi: "\u0935\u0921\u094b\u0926\u0930\u093e",
    state: "Gujarat",
    stateHi: "\u0917\u0941\u091c\u0930\u093e\u0924",
    region: "west",
    localTradition:
      "Also known as Baroda, a cultural city where Gujarati and Marwari traditions meet, with strong Swaminarayan spiritual influence.",
    faqItems: [
      {
        question:
          "What makes Vadodara (Baroda) culturally significant for astrology?",
        answer:
          "Baroda was the seat of the Gaekwad royal family, who were great patrons of art, learning, and Vedic tradition. The city has a refined cultural tradition that values Jyotish as classical knowledge.",
      },
      {
        question:
          "Are there specific traditions practiced in Vadodara astrology community?",
        answer:
          "Vadodara has practitioners of both Parashari and Jaimini systems. Marwari traders bring Rajasthani Jyotish traditions, while Gujarati Brahmins maintain their own classical lineage.",
      },
      {
        question: "What topics do Vadodara seekers most often ask about?",
        answer:
          "Marriage guidance, education and career for children, property purchases, and business decisions are the most common topics for Vadodara-based seekers.",
      },
    ],
  },

  // ----------- SOUTH INDIA -----------
  {
    slug: "bangalore",
    nameEn: "Bangalore",
    nameHi: "\u092c\u0947\u0902\u0917\u0932\u0941\u0930\u0941",
    state: "Karnataka",
    stateHi: "\u0915\u0930\u094d\u0928\u093e\u091f\u0915",
    region: "south",
    localTradition:
      "India tech capital with a growing appetite for online astrology among young professionals seeking career, marriage, and life guidance.",
    faqItems: [
      {
        question:
          "Why is astrology growing in Bangalore despite it being a tech hub?",
        answer:
          "Bangalore stressful startup culture, career uncertainty, and relationship challenges have driven a significant rise in astrology consultations among young professionals, especially via online platforms.",
      },
      {
        question:
          "What South Indian astrology traditions are practiced in Bangalore?",
        answer:
          "Bangalore has Karnataka Madhwa Brahmin tradition, which has a strong Jyotish lineage. It also hosts North Indian practitioners and practitioners of Tamil Nadi Jyotish.",
      },
      {
        question: "Can I consult in Kannada?",
        answer:
          "Spiritual Connect currently serves in Hindi and English. Bangalore English-proficient population is well served, and Hindi-speaking communities are also addressed.",
      },
      {
        question: "Is astrology used for job decisions in Bangalore IT sector?",
        answer:
          "Yes. Many Bangalore IT professionals consult astrologers for timing of job changes, startup launches, product releases, and major career moves.",
      },
    ],
  },
  {
    slug: "chennai",
    nameEn: "Chennai",
    nameHi: "\u091a\u0947\u0928\u094d\u0928\u0908",
    state: "Tamil Nadu",
    stateHi: "\u0924\u092e\u093f\u0932\u0928\u093e\u0921\u0941",
    region: "south",
    localTradition:
      "A stronghold of traditional South Indian Vedic astrology (Nadi Jyotish, Parasara, and Tamil Siddha traditions) with deep spiritual roots.",
    faqItems: [
      {
        question: "What is Nadi Jyotish and is it from Chennai?",
        answer:
          "Nadi Jyotish is an ancient form of astrology preserved on palm-leaf manuscripts. While originating in Tamil Nadu, Nadi readers are concentrated in Vaitheeswaran Koil and Chennai, offering destiny readings from ancient sages writings.",
      },
      {
        question: "How is South Indian astrology different from North Indian?",
        answer:
          "South Indian charts use a square grid format (not the diamond format of the North). Tamil and Karnataka traditions place greater emphasis on Prashna (horary), Tajika (annual), and Nadi readings.",
      },
      {
        question: "Can Spiritual Connect handle South Indian astrology styles?",
        answer:
          "Spiritual Connect AI integrates classical Parashari Jyotish which is common across all traditions. South Indian-specific nuances can be explored through the chat.",
      },
    ],
  },
  {
    slug: "coimbatore",
    nameEn: "Coimbatore",
    nameHi: "\u0915\u094b\u092f\u0902\u092c\u091f\u0942\u0930",
    state: "Tamil Nadu",
    stateHi: "\u0924\u092e\u093f\u0932\u0928\u093e\u0921\u0941",
    region: "south",
    localTradition:
      "Tamil Nadu second-largest city with strong Tamil Siddha and Nadi astrology traditions.",
    faqItems: [
      {
        question: "What is the astrology tradition in Coimbatore?",
        answer:
          "Coimbatore is deeply connected to Tamil Siddha traditions and Shaivaite spirituality. The city has a strong base of Jyotishis trained in South Indian classical systems.",
      },
      {
        question:
          "Is Isha Foundation presence in Coimbatore relevant to astrology?",
        answer:
          "Isha inner engineering programs attract a spiritually curious population in Coimbatore who may combine yogic practice with Vedic astrology for holistic self-understanding.",
      },
      {
        question: "What topics do Coimbatore seekers ask about?",
        answer:
          "Marriage compatibility, career in manufacturing and textiles, health guidance, and spiritual purpose are popular topics for Coimbatore-based seekers.",
      },
    ],
  },
  {
    slug: "hyderabad",
    nameEn: "Hyderabad",
    nameHi: "\u0939\u0948\u0926\u0930\u093e\u092c\u093e\u0926",
    state: "Telangana",
    stateHi: "\u0924\u0947\u0932\u0902\u0917\u093e\u0928\u093e",
    region: "south",
    localTradition:
      "A historic city where Telugu and Urdu cultures meet, with strong astrological traditions and a thriving IT workforce.",
    faqItems: [
      {
        question: "What makes Hyderabad astrology tradition unique?",
        answer:
          "Hyderabad blends Telugu Hindu Vedic astrology with Nawabi cultural influences. The city diverse population, Brahmin scholars, IT professionals, and old-city traders, creates diverse astrology needs.",
      },
      {
        question: "Is astrology popular among Hyderabad tech workforce?",
        answer:
          "Very much so. Hyderabad HITEC City IT professionals are among India most active online astrology users, seeking guidance on career moves, US visa timing, and marriage decisions.",
      },
      {
        question: "Can I get guidance on US visa or immigration timing?",
        answer:
          "Yes. Spiritual Connect can analyze your chart for foreign travel timing, career abroad prospects, and practical life decisions, with Gita-based perspective on dharmic choices.",
      },
    ],
  },
  {
    slug: "kochi",
    nameEn: "Kochi",
    nameHi: "\u0915\u094b\u091a\u094d\u091a\u093f",
    state: "Kerala",
    stateHi: "\u0915\u0947\u0930\u0932",
    region: "south",
    localTradition:
      "Kerala commercial capital. Malayali astrology traditions blend Parashari Jyotish with Tantric and Nambudiri Brahmin practices.",
    faqItems: [
      {
        question: "What makes Kerala Nambudiri Brahmin astrology unique?",
        answer:
          "Kerala Nambudiri Brahmins are considered custodians of the Rigveda and maintain some of the most rigorous Vedic astrology traditions in India. Kerala Jyotish is known for precise birth time rectification and detailed longevity analysis.",
      },
      {
        question: "Is Tantric influence visible in Kochi astrology tradition?",
        answer:
          "Yes. Kerala blends Parashari Jyotish with Tantric traditions. Muhurta for temple festivals (Utsavams), deity propitiation, and Prashna Marga (the Kerala horary text) are unique to this tradition.",
      },
      {
        question: "How do Kochi Gulf NRI families use astrology?",
        answer:
          "Kerala has large Gulf NRI communities. Many Kochi-based families consult astrologers for children education abroad, marriage matching, and property investments, making online access essential.",
      },
    ],
  },
  {
    slug: "madurai",
    nameEn: "Madurai",
    nameHi: "\u092e\u0926\u0941\u0930\u0948",
    state: "Tamil Nadu",
    stateHi: "\u0924\u092e\u093f\u0932\u0928\u093e\u0921\u0941",
    region: "south",
    localTradition:
      "Ancient Tamil city of Meenakshi Amman, a seat of Tamil Saiva and astrological learning for 2,500+ years.",
    faqItems: [
      {
        question: "Why is Madurai historically important for astrology?",
        answer:
          "Madurai is one of the oldest continuously inhabited cities in the world. Its Meenakshi Amman temple has been a spiritual and astrological center for over 2,500 years, with Tamil Siddha and Saiva traditions deeply embedded.",
      },
      {
        question: "What is the Tamil Siddha tradition approach to astrology?",
        answer:
          "Tamil Siddhas viewed astrology as part of a holistic system that includes yoga, siddha medicine, and spiritual alchemy. Their approach is less predictive and more transformative.",
      },
      {
        question: "What topics are most important for Madurai seekers?",
        answer:
          "Marriage matching, health guidance, devotional path selection, and family decisions are the most common topics for Madurai-based seekers.",
      },
    ],
  },
  {
    slug: "mysore",
    nameEn: "Mysore",
    nameHi: "\u092e\u0948\u0938\u0942\u0930",
    state: "Karnataka",
    stateHi: "\u0915\u0930\u094d\u0928\u093e\u091f\u0915",
    region: "south",
    localTradition:
      "The royal city of Karnataka with deep Vedic, Sanskrit, and Madhwa astrological scholarship traditions.",
    faqItems: [
      {
        question: "What is the Madhwa astrology tradition in Mysore?",
        answer:
          "Mysore was the seat of the Wodeyar kings, great patrons of Sanskrit learning. The Madhwa (Dvaita Vedanta) tradition maintains rigorous Jyotish scholarship, especially around Kaal Nirnaya (determining auspicious time).",
      },
      {
        question: "Is Mysore known for a particular astrology specialisation?",
        answer:
          "Mysore Sanskrit scholars are particularly respected for classical text interpretation including Brihat Jataka, Phala Deepika, and Jataka Parijata. The city has a high-quality academic astrology tradition.",
      },
      {
        question: "What do Mysore seekers typically ask about?",
        answer:
          "Education and career for students, marriage timing, spiritual guidance, and Mysore Dasara festival muhurta are popular topics for local seekers.",
      },
    ],
  },
  {
    slug: "tirupati",
    nameEn: "Tirupati",
    nameHi: "\u0924\u093f\u0930\u0941\u092a\u0924\u093f",
    state: "Andhra Pradesh",
    stateHi:
      "\u0906\u0902\u0927\u094d\u0930 \u092a\u094d\u0930\u0926\u0947\u0936",
    region: "south",
    localTradition:
      "Home of Lord Venkateswara, the most visited Hindu temple in the world, a major pilgrimage and astrological consultation center.",
    faqItems: [
      {
        question: "Why do pilgrims seek astrology when visiting Tirupati?",
        answer:
          "Tirupati attracts 50,000 to 100,000 pilgrims daily. Many combine their Balaji darshan with consultations from local Jyotishis, especially for wish fulfillment analysis, marriage blessings, and career guidance.",
      },
      {
        question: "What is Lord Venkateswara astrological significance?",
        answer:
          "Lord Venkateswara is associated with Venus (Shukra) and Jupiter (Guru), planets of prosperity and wisdom. Tirupati astrologers specialize in readings related to wealth, career, and spiritual merit (punya).",
      },
      {
        question:
          "Can I get a virtual consultation instead of visiting Tirupati?",
        answer:
          "Yes. Spiritual Connect provides Gita-rooted guidance on your spiritual path, past life karma insights, and practical life decisions, without requiring a physical pilgrimage.",
      },
    ],
  },
  {
    slug: "visakhapatnam",
    nameEn: "Visakhapatnam",
    nameHi:
      "\u0935\u093f\u0936\u093e\u0916\u093e\u092a\u0924\u094d\u0924\u0928\u092e",
    state: "Andhra Pradesh",
    stateHi:
      "\u0906\u0902\u0927\u094d\u0930 \u092a\u094d\u0930\u0926\u0947\u0936",
    region: "south",
    localTradition:
      "Vizag, AP coastal port city with Telugu Vaishnava and traditional South Indian astrology influence.",
    faqItems: [
      {
        question: "What is Vizag astrology tradition?",
        answer:
          "Visakhapatnam Telugu community maintains strong Vaishnava traditions. Local Jyotishis are trained in Telugu-language classical texts and specialise in naval and maritime-related life events, reflecting the city port heritage.",
      },
      {
        question: "Are there specific concerns for Vizag naval community?",
        answer:
          "Yes. Visakhapatnam Navy and defense community often consults astrologers for posting timing, overseas deployment, promotion prospects, and marriage decisions.",
      },
      {
        question:
          "Can Spiritual Connect handle queries about defense career timing?",
        answer:
          "Yes. Career timing, promotion prospects, and transfer timing can all be analyzed through your Vedic birth chart, with Gita-based perspective on dharmic service.",
      },
    ],
  },

  // ----------- EAST INDIA -----------
  {
    slug: "bhubaneswar",
    nameEn: "Bhubaneswar",
    nameHi: "\u092d\u0941\u0935\u0928\u0947\u0936\u094d\u0935\u0930",
    state: "Odisha",
    stateHi: "\u0913\u0921\u093f\u0936\u093e",
    region: "east",
    localTradition:
      "City of temples with over 700 ancient Shiva temples and active Odiya astrology community. Odisha capital.",
    faqItems: [
      {
        question: "Why is Bhubaneswar called the city of temples?",
        answer:
          "Bhubaneswar once had over 7,000 Shiva temples, around 700 remain. This extraordinary concentration of Shaivite sacred architecture reflects a deep Vedic tradition that includes sophisticated Jyotish practice.",
      },
      {
        question: "What is the Odiya astrology tradition?",
        answer:
          "Odisha has a strong Orissan Jyotish tradition influenced by the Jagannath (Vishnu) bhakti cult and Shaivite lineages. Local Jyotishis are respected for Prashna and remedial guidance.",
      },
      {
        question: "What topics do Bhubaneswar seekers ask about?",
        answer:
          "Government job timing, marriage matching, new home Vastu, and spiritual guidance are popular topics for Bhubaneswar-based seekers.",
      },
    ],
  },
  {
    slug: "guwahati",
    nameEn: "Guwahati",
    nameHi: "\u0917\u0941\u0935\u093e\u0939\u093e\u091f\u0940",
    state: "Assam",
    stateHi: "\u0905\u0938\u092e",
    region: "east",
    localTradition:
      "Assam gateway city, home to Kamakhya, one of the most powerful Shakti peethas and a historic astrological center.",
    faqItems: [
      {
        question: "Why is Kamakhya temple significant for astrology?",
        answer:
          "Kamakhya, on Nilachal hill above Guwahati, is one of the 51 Shakti peethas and one of India most powerful Tantric centers. Astrologers here specialize in Shakta-Tantric readings, especially for life challenges and spiritual power.",
      },
      {
        question: "What is the Assamese astrology tradition?",
        answer:
          "Assam astrology blends Parashari Jyotish with Tantric and tribal wisdom traditions unique to Northeast India. Kamakhya-trained pandits are especially sought for difficult life situations.",
      },
      {
        question: "What are common topics for Guwahati seekers?",
        answer:
          "Career opportunities in government and tea industries, marriage guidance, health issues, and guidance for Northeast India unique geopolitical uncertainties are common topics.",
      },
    ],
  },
  {
    slug: "kolkata",
    nameEn: "Kolkata",
    nameHi: "\u0915\u094b\u0932\u0915\u093e\u0924\u093e",
    state: "West Bengal",
    stateHi:
      "\u092a\u0936\u094d\u091a\u093f\u092e \u092c\u0902\u0917\u093e\u0932",
    region: "east",
    localTradition:
      "Cultural capital of India with rich Bengali Vaishnava and Shakta traditions. Kolkata is home to many revered astrologers.",
    faqItems: [
      {
        question: "What makes Kolkata a major astrology center?",
        answer:
          "Kolkata is India intellectual and cultural capital. Bengali Brahmins maintain two powerful traditions, Vaishnava (Chaitanya-inspired) and Shakta (Kali worship). Both traditions have deep Jyotish lineages, making Kolkata home to some of India most respected astrologers.",
      },
      {
        question: "Is Kali worship connected to astrology in Kolkata?",
        answer:
          "Yes. Kolkata Shakta tradition integrates astrology with Kali puja. Readings often focus on karma, obstacles (Graha pida), and transformative life events. Durga Puja timing is itself astronomically determined.",
      },
      {
        question: "What topics do Kolkata seekers most commonly ask about?",
        answer:
          "Career in arts, academics, or civil services, marriage decisions, health guidance, and questions about karma and spiritual destiny are the most popular topics for Kolkata-based seekers.",
      },
      {
        question: "Can I get a Bengali-language consultation?",
        answer:
          "Spiritual Connect currently serves in Hindi and English. Bengali-speaking seekers in Kolkata are well-served in English, and Hindi is widely understood.",
      },
    ],
  },
  {
    slug: "patna",
    nameEn: "Patna",
    nameHi: "\u092a\u091f\u0928\u093e",
    state: "Bihar",
    stateHi: "\u092c\u093f\u0939\u093e\u0930",
    region: "east",
    localTradition:
      "Ancient Pataliputra, Bihar capital with a long tradition of Maithili, Bhojpuri, and Sanskrit astrological learning.",
    faqItems: [
      {
        question: "What is Bihar astrology heritage?",
        answer:
          "Bihar is the land of the Mahabodhi temple (Buddha enlightenment), the ancient Nalanda university, and countless Vedic scholars. Maithili Brahmins of North Bihar are among India most respected Jyotish practitioners.",
      },
      {
        question: "Are Maithili Brahmins known for astrology?",
        answer:
          "Yes. Maithili Brahmins from the Mithila region of North Bihar are custodians of a very rigorous Vedic tradition. Many families have maintained Jyotish as hereditary knowledge for dozens of generations.",
      },
      {
        question: "What are common queries from Patna seekers?",
        answer:
          "Government job (sarkari naukri) timing, UPSC and competitive exam success, marriage matching, and land and property decisions are the most common topics for Bihar-based seekers.",
      },
    ],
  },
  {
    slug: "puri",
    nameEn: "Puri",
    nameHi: "\u092a\u0941\u0930\u0940",
    state: "Odisha",
    stateHi: "\u0913\u0921\u093f\u0936\u093e",
    region: "east",
    localTradition:
      "One of the Char Dham, home of Lord Jagannath. Odiya Vaishnava and Madhwa astrology traditions thrive here.",
    faqItems: [
      {
        question: "Why is Puri one of the four Char Dhams?",
        answer:
          "Puri is the eastern Char Dham, home of Lord Jagannath (a form of Vishnu). Pilgrims travel here for the famous Rath Yatra festival, and the city pandas (priests) maintain detailed genealogical records connecting astrology with pilgrimage.",
      },
      {
        question: "What is the Panda tradition in Puri?",
        answer:
          "Puri pandas (hereditary priests) maintain meticulous family records spanning generations. Many also practice Jyotish, specializing in Shadbala (planetary strength), Navamsa (marriage chart), and Dasha timing.",
      },
      {
        question: "Can I get Rath Yatra muhurta guidance online?",
        answer:
          "Spiritual Connect provides guidance on auspicious timing, pilgrimages, and spiritual decisions, rooted in Gita wisdom that complements the Jagannath tradition.",
      },
    ],
  },
  {
    slug: "ranchi",
    nameEn: "Ranchi",
    nameHi: "\u0930\u093e\u0902\u091a\u0940",
    state: "Jharkhand",
    stateHi: "\u091d\u093e\u0930\u0916\u0902\u0921",
    region: "east",
    localTradition:
      "Capital of Jharkhand, a tribal and Hindi belt city where traditional astrology meets growing digital seekers.",
    faqItems: [
      {
        question: "What is the astrology culture in Ranchi?",
        answer:
          "Ranchi blends Hindi belt North Indian Vedic traditions with tribal Jharkhand spiritual practices. The city growing educated professional class is increasingly turning to online astrology.",
      },
      {
        question: "What are common questions from Ranchi seekers?",
        answer:
          "Government and mining sector career timing, marriage matching, and practical life guidance are common topics for Ranchi-based seekers.",
      },
      {
        question:
          "Is Spiritual Connect relevant for Jharkhand tribal spiritual traditions?",
        answer:
          "Spiritual Connect focuses on Vedic and Gita-based wisdom, which complements but is distinct from tribal traditions. Seekers from Ranchi can find universal Gita guidance applicable to all backgrounds.",
      },
    ],
  },

  // ----------- CENTRAL INDIA -----------
  {
    slug: "bhopal",
    nameEn: "Bhopal",
    nameHi: "\u092d\u094b\u092a\u093e\u0932",
    state: "Madhya Pradesh",
    stateHi: "\u092e\u0927\u094d\u092f\u092a\u094d\u0930\u0926\u0947\u0936",
    region: "central",
    localTradition:
      "MP capital, the city of lakes. Blends Bundelkhandi and Hindi-Urdu astrology cultures with a growing urban spiritual community.",
    faqItems: [
      {
        question: "What is Bhopal astrology tradition?",
        answer:
          "Bhopal diverse heritage, Nawabi, Bundelkhandi, and modern urban, creates a unique astrology culture. The city has Hindu and Muslim communities who both seek guidance from Vedic Jyotishis.",
      },
      {
        question: "What topics do Bhopal seekers ask about most?",
        answer:
          "Government career (MPPSC, civil services), marriage decisions, real estate timing, and family harmony are the most common topics for Bhopal-based seekers.",
      },
      {
        question: "Is online astrology accepted in Bhopal educated community?",
        answer:
          "Yes. Bhopal universities and government institutions create an educated seeker base comfortable with online consultations, especially via platforms like Spiritual Connect.",
      },
    ],
  },
  {
    slug: "indore",
    nameEn: "Indore",
    nameHi: "\u0907\u0902\u0926\u094c\u0930",
    state: "Madhya Pradesh",
    stateHi: "\u092e\u0927\u094d\u092f\u092a\u094d\u0930\u0926\u0947\u0936",
    region: "central",
    localTradition:
      "MP commercial hub. Indore residents have strong Marwari and Malwa astrology traditions, seeking guidance on business and marriage.",
    faqItems: [
      {
        question: "Why is Indore an important commercial astrology center?",
        answer:
          "Indore is MP commercial capital and consistently ranks among India cleanest cities. Its Marwari and Malwa business communities actively consult astrologers for muhurta, partnerships, and investment timing.",
      },
      {
        question: "What is the Malwa astrology tradition?",
        answer:
          "Malwa (the plateau region around Indore, Ujjain, and Mandsaur) has a rich Vedic tradition shaped by its proximity to Ujjain, the ancient prime meridian of Indian astrology.",
      },
      {
        question:
          "Can Spiritual Connect help with business astrology for Indore traders?",
        answer:
          "Yes. Spiritual Connect provides guidance on auspicious timing, partnerships, and financial decisions, with Gita-based perspective on dharmic business conduct.",
      },
    ],
  },
  {
    slug: "ujjain",
    nameEn: "Ujjain",
    nameHi: "\u0909\u091c\u094d\u091c\u0948\u0928",
    state: "Madhya Pradesh",
    stateHi: "\u092e\u0927\u094d\u092f\u092a\u094d\u0930\u0926\u0947\u0936",
    region: "central",
    localTradition:
      "One of the seven holiest cities, seat of Mahakaleshwar Jyotirlinga, Simhastha Kumbh, and the prime meridian of ancient Indian astrology.",
    faqItems: [
      {
        question:
          "Why is Ujjain called the prime meridian of Indian astrology?",
        answer:
          "In ancient India, the prime meridian (zero longitude) passed through Ujjain. All classical Indian astronomical calculations, including the Surya Siddhanta, used Ujjain as the reference point. This makes Ujjain the birthplace of Indian astronomical astrology.",
      },
      {
        question:
          "What is the Mahakaleshwar Jyotirlinga significance for astrologers?",
        answer:
          "Mahakal (Lord Shiva as the Lord of Time) is worshipped in Ujjain. Time itself is sacred here. Astrologers from across India come to Ujjain for advanced training and to seek blessings from Mahakal for their practice.",
      },
      {
        question: "Is Ujjain Simhastha Kumbh important for astrology?",
        answer:
          "Yes. Simhastha Kumbh in Ujjain (held every 12 years when Jupiter is in Leo) draws millions of seekers and thousands of Jyotishis, making it the world largest gathering of astrology practitioners.",
      },
      {
        question: "Can I learn about my dharma through astrology?",
        answer:
          "Yes. Spiritual Connect connects Vedic astrological insights with Bhagavad Gita wisdom, helping you understand your dharmic path, purpose, and inner calling, in the tradition of Ujjain deep Shiva-wisdom.",
      },
    ],
  },
];

export const REGIONS = [
  {
    id: "north" as const,
    label: "North India",
    labelHi: "\u0909\u0924\u094d\u0924\u0930 \u092d\u093e\u0930\u0924",
    tagline:
      "From Delhi Brahmin lineages to Varanasi 3,000-year Vedic tradition",
    emoji: "\u{1F3D4}\uFE0F",
  },
  {
    id: "west" as const,
    label: "West India",
    labelHi: "\u092a\u0936\u094d\u091a\u093f\u092e \u092d\u093e\u0930\u0924",
    tagline:
      "Mumbai financial pulse, Pune Jyotisha scholars, Gujarat Vaishnava trust",
    emoji: "\u{1F30A}",
  },
  {
    id: "south" as const,
    label: "South India",
    labelHi: "\u0926\u0915\u094d\u0937\u093f\u0923 \u092d\u093e\u0930\u0924",
    tagline:
      "Nadi Jyotish of Tamil Nadu, Karnataka Madhwa lineage, Kerala Nambudiri traditions",
    emoji: "\u{1F334}",
  },
  {
    id: "east" as const,
    label: "East India",
    labelHi: "\u092a\u0942\u0930\u094d\u0935 \u092d\u093e\u0930\u0924",
    tagline:
      "Kolkata Vaishnava-Shakta traditions, Bihar Maithili scholarship, Odisha Jagannath legacy",
    emoji: "\u{1F305}",
  },
  {
    id: "central" as const,
    label: "Central India",
    labelHi: "\u092e\u0927\u094d\u092f \u092d\u093e\u0930\u0924",
    tagline:
      "Ujjain Mahakaleshwar, Indore Marwari heritage, Bhopal Bundelkhandi culture",
    emoji: "\u{1F5FF}",
  },
];
