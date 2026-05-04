export interface LifeGuidanceSection {
  heading: string;
  text: string;
  verse?: string;
  verseTranslation?: string;
}

export interface LifeGuidanceContent {
  intro: string;
  sections: LifeGuidanceSection[];
  keyPractices: string[];
  cta: string;
}

export interface LifeGuidanceTopic {
  id: string;
  slug: string;
  emoji: string;
  title: string;
  titleHindi: string;
  subtitle: string;
  subtitleHindi: string;
  gitaChaptersRef: string[];
  content: LifeGuidanceContent;
}

export const lifeGuidanceTopics: LifeGuidanceTopic[] = [
  {
    id: "career",
    slug: "career",
    emoji: "💼",
    title: "Krishna's Guidance for Career & Professional Life",
    titleHindi: "करियर के लिए कृष्ण का मार्गदर्शन",
    subtitle: "Stuck in your career? Feeling lost about your purpose?",
    subtitleHindi: "करियर में अटके हैं? अपने उद्देश्य को लेकर भ्रमित हैं?",
    gitaChaptersRef: ["Chapter 3 (Karma Yoga)", "Chapter 18 (Svadharma)"],
    content: {
      intro:
        "Krishna's teachings on Swadharma and Karma Yoga offer the most practical career framework ever created — 5,000 years before LinkedIn.",
      sections: [
        {
          heading: "What is Swadharma?",
          text: "In Chapter 18, Krishna reveals the highest secret: your Swadharma — your unique duty aligned with your nature (Svabhava). It is not the role society assigns you, but the path your soul was born to walk. When your work aligns with your inner nature, effort becomes effortless and excellence becomes natural. Krishna says it is better to do your own duty imperfectly than to do another's perfectly — because misaligned work creates inner conflict, dissipation of energy, and ultimately a life lived for someone else's approval.",
          verse: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् |",
          verseTranslation:
            "Better is one's own dharma, though imperfectly performed, than the dharma of another well performed. — Bhagavad Gita 18.47",
        },
        {
          heading: "Nishkama Karma at Work",
          text: "Chapter 3 introduces Nishkama Karma — action without attachment to results. This is not indifference to outcomes. It is the liberation of pouring 100% of your energy into the quality of your work, without the paralysis of fear about results. Modern psychology calls this 'flow state.' Krishna called it Yoga. When you stop obsessing over promotion timelines, salary comparisons, and recognition — and redirect that energy into the depth of your craft — your work transforms. The results follow, but they no longer control you.",
          verse: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |",
          verseTranslation:
            "You have the right to perform your actions, but never to the fruits of your actions. — Bhagavad Gita 2.47",
        },
        {
          heading: "How to Find Your Dharma",
          text: "Krishna gives practical tools: introspect on what activities make you lose track of time. Notice what comes naturally to you that others struggle with. Examine your Lagna (ascendant) and the 10th house of your birth chart — these reveal your Svabhava and natural career directions. The intersection of your natural abilities, your deepest values, and the world's genuine need is where your Swadharma lives. It is already within you. Clarity comes from stillness — and that stillness is the first act of Yoga.",
        },
      ],
      keyPractices: [
        "Start each workday with 5 minutes of Sankalpa — a clear, conscious intention for the day's work",
        "Evaluate every career decision by asking: 'Is this aligned with my natural strengths?'",
        "Practice Karma Yoga by giving 100% to the process, while holding the outcome lightly",
        "Read Bhagavad Gita Chapter 3 once weekly — note which verse speaks to your current challenge",
        "Perform a quarterly 'Dharma audit' — which parts of your work energize you vs. drain you?",
      ],
      cta: "Talk to Krishna about your career",
    },
  },
  {
    id: "love",
    slug: "love",
    emoji: "💕",
    title: "Krishna's Wisdom for Love & Relationships",
    titleHindi: "प्रेम और रिश्तों के लिए कृष्ण की शिक्षा",
    subtitle:
      "Struggling in a relationship? Krishna's wisdom illuminates the path to conscious love.",
    subtitleHindi: "रिश्ते में संघर्ष? कृष्ण की शिक्षा सचेत प्रेम का मार्ग दिखाती है।",
    gitaChaptersRef: ["Chapter 9 (Raja Vidya)", "Chapter 12 (Bhakti Yoga)"],
    content: {
      intro:
        "Radha-Krishna is not just mythology — it is the highest model of conscious love: unconditional, devotional, and free from the ego's need to possess. Struggling in a relationship? Krishna's wisdom illuminates the path.",
      sections: [
        {
          heading: "The Radha-Krishna Model of Love",
          text: "Radha's love for Krishna is the purest form of divine love (Prema Bhakti) in the Vaishnava tradition. It is characterised by total offering — nothing held back — yet without possessiveness, jealousy, or demands. This is not weakness. It is the highest strength. Most human relationships suffer because love is conditional: 'I love you IF you behave a certain way.' Krishna teaches that true love transcends conditions. When you love unconditionally — not out of need, but out of overflow — relationships transform.",
          verse: "ananyāś cintayanto māṁ ye janāḥ paryupāsate",
          verseTranslation:
            "Those who worship Me with devotion, meditating on My transcendental form — I carry what they lack and preserve what they have. — Bhagavad Gita 9.22",
        },
        {
          heading: "Healthy Detachment vs. Emotional Distance",
          text: "One of the most misunderstood Gita teachings is 'detachment.' Many use it to justify emotional unavailability. Krishna's Vairagya is not coldness — it is freedom from the ego's grip. True detachment means you love fully, without making your peace dependent on the other person's behaviour. You remain centered in yourself. This is the difference between love and addiction: love gives freedom, addiction creates chains. When you are internally whole, you can love without controlling.",
        },
        {
          heading: "Communication as a Spiritual Practice",
          text: "Chapter 17 of the Gita describes Sattvic speech: truthful, beneficial, gentle, not causing distress. In relationships, how we speak is as important as what we speak. Krishna himself never raised his voice in the Bhagavad Gita — he asked questions, offered perspectives, and respected Arjuna's free will. Every difficult conversation in a relationship is an opportunity to practice Sattvic communication.",
        },
      ],
      keyPractices: [
        "Practise loving without agenda for one week — give without expecting reciprocation",
        "When a relationship conflict arises, ask: 'Am I responding from my centre or from my fear?'",
        "Meditate on the Radha-Krishna ideal daily — visualise love as a natural overflow, not a transaction",
        "Apply Sattvic speech: before speaking, ask — is it true? Is it beneficial? Is it the right time?",
        "Recite Bhagavad Gita 12.13-14 (qualities of a devotee) as a morning intention",
      ],
      cta: "Talk to Krishna about your relationships",
    },
  },
  {
    id: "marriage",
    slug: "marriage",
    emoji: "💍",
    title: "Krishna's Divine Wisdom for Marriage & Partnership",
    titleHindi: "विवाह के लिए कृष्ण का दिव्य मार्गदर्शन",
    subtitle:
      "Looking for marriage guidance? The Rukmini-Krishna model offers a timeless blueprint.",
    subtitleHindi:
      "विवाह में मार्गदर्शन चाहते हैं? रुक्मिणी-कृष्ण का आदर्श एक कालातीत खाका देता है।",
    gitaChaptersRef: ["Chapter 3 (Duty)", "Chapter 7 (Divine Nature)"],
    content: {
      intro:
        "The Rukmini-Krishna marriage and Gita teachings on dharma, selfless love, and partnership offer a timeless blueprint for building a conscious, lasting marriage.",
      sections: [
        {
          heading: "The Rukmini-Krishna Marriage: A Conscious Partnership",
          text: "Rukmini chose Krishna not for his wealth or power, but because she recognised his divine nature and felt aligned at the soul level. She wrote him a letter — an act of conscious agency — expressing her desire and asking him to receive her. Krishna responded with equal respect, honouring her choice. This is the Gita's model: marriage as a conscious, dharmic partnership between two souls who see the divine in each other. Not a transaction, not family pressure, not social obligation.",
        },
        {
          heading: "Astrological Indicators of Marriage",
          text: "In Vedic astrology, the 7th house and its lord reveal the nature of partnerships. Venus (Shukra) as the planet of relationships shows the quality of love you attract. The Navamsa chart (D9) is called the 'soul of the horoscope' and is the primary tool for marriage compatibility analysis. A strong Venus in the 7th, Navamsa alignment, and compatible Nakshatras create the astrological foundation for a harmonious marriage. But astrology shows tendencies — conscious choice and Karma Yoga determine the outcome.",
          verse: "यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः",
          verseTranslation:
            "Work done as a sacrifice for Vishnu has to be performed, otherwise work causes bondage in this material world. — Bhagavad Gita 3.9",
        },
        {
          heading: "Building a Marriage That Grows",
          text: "Krishna and Rukmini's marriage endured and deepened because it was rooted in dharma — each served the other's highest growth. The Gita's principle of selfless action applies directly to marriage: when both partners focus on serving each other rather than extracting from each other, the relationship ascends. Daily spiritual practice together — chanting, meditation, reading the Gita — creates a shared sacred space that protects the relationship from the erosion of time and routine.",
        },
      ],
      keyPractices: [
        "Create a 'Dharma Statement' for your marriage — why are you together? What is your shared purpose?",
        "Do Kundali matching beyond Guna Milan — examine 7th house, Navamsa, and Venus placement",
        "Practise one act of selfless service for your partner daily — no expectation, no announcement",
        "Read Bhagavad Gita Chapter 3 together monthly — discuss how duty applies to your relationship",
        "Celebrate the divine in your partner: see them as a soul on a journey, not a role to be filled",
      ],
      cta: "Talk to Krishna about your marriage",
    },
  },
  {
    id: "anxiety",
    slug: "anxiety",
    emoji: "🧘",
    title: "Krishna's Teaching on Overcoming Anxiety & Stress",
    titleHindi: "चिंता और तनाव से मुक्ति — कृष्ण की शिक्षा",
    subtitle:
      "Anxiety is the defining mental health challenge of our time. Krishna addressed its root causes in the Gita.",
    subtitleHindi:
      "चिंता आज के समय की सबसे बड़ी मानसिक चुनौती है। कृष्ण ने गीता में इसके मूल कारणों का समाधान दिया।",
    gitaChaptersRef: ["Chapter 2 (Sankhya Yoga)", "Chapter 6 (Dhyana Yoga)"],
    content: {
      intro:
        "Anxiety is the defining mental health challenge of our time. Krishna addressed its root causes in the Bhagavad Gita with extraordinary precision — thousands of years before we had a clinical name for it.",
      sections: [
        {
          heading: "The Root of Anxiety: Attachment to Outcomes",
          text: "Chapter 2, verse 47 is the most quoted verse in the Gita — and its implications for anxiety are profound. Anxiety arises when we become attached to specific outcomes and then fear losing them. We catastrophise: 'What if I fail the exam? What if they leave me? What if I can't pay the bills?' Krishna's diagnosis: the suffering is not in the situation — it is in the mind's attachment to a specific future. The antidote is not indifference, but shifting your investment from results to process.",
          verse:
            "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन | मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||",
          verseTranslation:
            "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to inaction. — Bhagavad Gita 2.47",
        },
        {
          heading: "The Anxiety Chain: Gita 2.62-63",
          text: "Krishna maps the chain reaction that leads from thought to suffering. A desired object creates attachment (Sangah). Attachment creates desire (Kama). Frustrated desire creates anger (Krodha). Anger creates confusion (Sammoha). Confusion destroys memory of what matters. Destroyed memory destroys the faculty of reason. And destroyed reason leads to total ruin. Understanding this chain is the first step to interrupting it. Every anxiety spiral begins with an attachment — often something small.",
          verse: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते |",
          verseTranslation:
            "While contemplating on the objects of the senses, a person develops attachment for them. — Bhagavad Gita 2.62",
        },
        {
          heading: "Practical Gita Techniques for Anxiety",
          text: "Chapter 6 prescribes specific practices: Pranayama (breath regulation) to calm the nervous system, Dhyana (meditation) to observe the anxious mind without merging with it, Mantra recitation to interrupt anxious thought loops, and Seva (service) to shift focus from self-absorption to contribution. Modern neuroscience confirms all four practices reduce cortisol and activate the parasympathetic nervous system. Krishna prescribed them 5,000 years ago.",
        },
      ],
      keyPractices: [
        "Whenever anxiety arises, trace it to its source: 'What am I attached to right now?'",
        "Practice Bhagavad Gita 2.47 as a daily mantra — repeat it when anxiety peaks",
        "10 minutes of Anulom Vilom (alternate nostril breathing) at dawn and dusk",
        "Set a 'Worry Window' — 15 minutes per day to consciously process concerns; outside this window, redirect attention",
        "Recite the Bhagavad Gita Chapter 2 summary daily as a reminder of the soul's eternal, unharmed nature",
      ],
      cta: "Talk to Krishna about anxiety",
    },
  },
  {
    id: "inner-peace",
    slug: "inner-peace",
    emoji: "☮️",
    title: "Finding Inner Peace Through Krishna's Teachings",
    titleHindi: "कृष्ण की शिक्षाओं से आंतरिक शांति",
    subtitle:
      "Peace is not something you acquire — it is your natural state, obscured by the restless mind.",
    subtitleHindi:
      "शांति कोई अर्जित करने की चीज़ नहीं — यह आपकी स्वाभाविक अवस्था है, जो चंचल मन से ढकी है।",
    gitaChaptersRef: ["Chapter 6 (Dhyana Yoga)", "Chapter 2 (Sankhya Yoga)"],
    content: {
      intro:
        "Chapter 6 of the Bhagavad Gita is a 5,000-year-old masterclass on meditation and inner stillness. Krishna teaches that peace is not something you acquire — it is your natural state, obscured by the restless mind.",
      sections: [
        {
          heading: "Peace is Your Nature, Not Your Goal",
          text: "Krishna's teaching reverses the common assumption: most people believe peace is something they will achieve once circumstances improve — once they get the job, find the partner, resolve the conflict. Krishna says the opposite: peace (Shanti) is the natural state of the Atman. It is not earned or achieved; it is uncovered. The restless mind — running between past regrets and future fears — is the only veil over it. Your practice is not to create peace but to remove what obscures it.",
          verse: "शनैः शनैरुपरमेद्बुद्ध्या धृतिगृहीतया |",
          verseTranslation:
            "Gradually, step by step, one should become situated in trance by means of intelligence sustained by full conviction, and thus the mind should be fixed on the self alone, and should think of nothing else. — Bhagavad Gita 6.25",
        },
        {
          heading: "Krishna's Step-by-Step Meditation Guide",
          text: "Chapter 6 contains one of the oldest and most detailed meditation guides ever written. Krishna prescribes: choose a clean, firm seat in a quiet place; sit with spine straight, neck erect, gaze at the tip of the nose; steady the mind by gently withdrawing it from distractions, again and again — this is the practice. Not the absence of thoughts, but the gentle, patient return. Krishna acknowledges the mind is 'restless, turbulent, obstinate' (6.34) — and prescribes practice (Abhyasa) and detachment (Vairagya) as the solution.",
        },
        {
          heading: "Equanimity: Peace in All Conditions",
          text: "The Gita's highest vision is Samatvam — equipoise. Not the absence of experience, but the absence of being controlled by experience. A person established in Samatvam is not moved by sorrow or elated by joy (2.56); they are not disturbed even by the greatest misfortune (6.22). This is not suppression of emotion — it is a depth of being from which all experience can be met with clarity. This is the peace that, as Krishna says in 6.28, 'surpasses all understanding.'",
        },
      ],
      keyPractices: [
        "Create a consistent 15-minute morning sit — same time, same place, every day",
        "Recite Bhagavad Gita 2.70 (ocean analogy for peace) as a daily evening reflection",
        "When disturbed, ask: 'Am I this experience, or am I the one who is aware of this experience?'",
        "Reduce information input: one hour before bed, no screens, no news, no social media",
        "Practise Pratyahara (sense withdrawal): 5 minutes daily of conscious silence and stillness",
      ],
      cta: "Talk to Krishna about inner peace",
    },
  },
  {
    id: "anger",
    slug: "anger",
    emoji: "🔥",
    title: "Dealing with Anger: Krishna's Timeless Framework",
    titleHindi: "क्रोध पर नियंत्रण — कृष्ण की शिक्षा",
    subtitle:
      "In just two verses, Krishna maps the entire chain from desire to destruction.",
    subtitleHindi:
      "केवल दो श्लोकों में कृष्ण ने इच्छा से विनाश तक की पूरी श्रृंखला का मानचित्र बना दिया।",
    gitaChaptersRef: ["Chapter 2 (Verses 62-63)", "Chapter 3 (Kama)"],
    content: {
      intro:
        "In just two verses (2.62-63), Krishna maps the entire chain from desire to destruction with surgical precision. Understanding this chain is the first step to mastering your anger.",
      sections: [
        {
          heading: "The Six-Step Chain of Destruction",
          text: "Krishna's map of anger is the most precise psychological framework for understanding rage ever constructed. Step 1: Thinking about sense objects creates attachment. Step 2: Attachment creates desire. Step 3: Frustrated desire creates anger. Step 4: Anger creates delusion (Sammohah). Step 5: Delusion destroys memory of what matters (what you value, what your relationships mean, what your purpose is). Step 6: With memory destroyed, intelligence is destroyed — and when intelligence fails, the person is lost. This six-step chain explains every anger-driven regret.",
          verse:
            "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः | स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ||",
          verseTranslation:
            "From anger comes delusion; from delusion, loss of memory; from loss of memory, destruction of intelligence; and from destruction of intelligence, one is ruined. — Bhagavad Gita 2.63",
        },
        {
          heading: "Kama (Desire) Is the True Enemy",
          text: "In Chapter 3 (verse 37), Krishna names the root cause of all anger: Kama — unfulfilled desire. 'It is lust (Kama), it is anger (Krodha), born of Rajas guna — all-consuming and most sinful.' Anger is downstream of desire. To manage anger, you must trace it upstream to the desire that was frustrated. This is why anger management techniques that focus only on expression or suppression fail — they treat the symptom. The Gita treats the root.",
          verse: "काम एष क्रोध एष रजोगुणसमुद्भवः |",
          verseTranslation:
            "It is lust, it is anger, born of the mode of passion — know this as the sinful, all-devouring enemy in this world. — Bhagavad Gita 3.37",
        },
        {
          heading: "The Practical Mastery of Anger",
          text: "Krishna prescribes three practical tools. First: Viveka (discrimination) — the capacity to distinguish between the emotion of anger and the Self that observes it. Second: Titiksha (tolerance) — not suppression, but the strength to bear discomfort without reacting. Chapter 2 verse 14 says 'these come and go like winter and summer — bear them patiently.' Third: Dhyana (meditation) — creating a gap between stimulus and response. Victor Frankl called this gap 'the last human freedom.' The Gita calls it Yoga.",
        },
      ],
      keyPractices: [
        "When angry, trace the chain backward: what desire was frustrated? Can you release that attachment?",
        "Practise the 'STOP' technique: Stop, Take a breath, Observe the feeling, Proceed with intention",
        "Memorise Gita 2.62-63 — recite it when you feel anger building to interrupt the chain early",
        "Daily Pranayama practice (especially Bhramari/humming breath) lowers baseline reactivity",
        "Weekly reflection: 'Where did I react from anger this week? What desire was at the root?'",
      ],
      cta: "Talk to Krishna about managing anger",
    },
  },
  {
    id: "life-purpose",
    slug: "life-purpose",
    emoji: "🎯",
    title: "Finding Your Life Purpose with Krishna's Guidance",
    titleHindi: "जीवन का उद्देश्य — कृष्ण का मार्गदर्शन",
    subtitle:
      "Feeling lost? The Bhagavad Gita's concept of Swadharma is the most powerful framework for finding your purpose.",
    subtitleHindi:
      "खोया हुआ महसूस कर रहे हैं? भगवद्गीता का स्वधर्म का सिद्धांत उद्देश्य खोजने का सबसे शक्तिशाली ढाँचा है।",
    gitaChaptersRef: ["Chapter 18 (Moksha Sanyasa)", "Chapter 3 (Karma Yoga)"],
    content: {
      intro:
        "Feeling lost? The Bhagavad Gita's concept of Swadharma is the most powerful framework for finding your unique purpose. Krishna teaches that your path is already within you — you just need the clarity to see it.",
      sections: [
        {
          heading: "Swadharma: Your Unique Soul Signature",
          text: "Chapter 18 reveals the ultimate secret: every soul is born with a unique Svabhava (essential nature) — a combination of qualities, capacities, and tendencies that is unlike any other soul. From this Svabhava flows your Swadharma — your unique duty and path. It is not about career titles or social roles. It is about the specific contribution only you can make, expressed through whatever form your life takes. A teacher's Swadharma is to illuminate. A warrior's is to protect. A healer's is to restore. What is yours?",
          verse: "स्वे स्वे कर्मण्यभिरतः संसिद्धिं लभते नरः |",
          verseTranslation:
            "By devotion to one's own duty, a person attains perfection. — Bhagavad Gita 18.45",
        },
        {
          heading: "Your Birth Chart as a Purpose Map",
          text: "Vedic astrology's Lagna (ascendant) reveals your soul's instrument in this birth — the 'vehicle' through which your Swadharma will be expressed. The Sun sign reveals your core identity and life force. The 10th house and its lord (Karma Bhava) reveals your public purpose and natural life direction. Atmakaraka — the planet with the highest degree in your chart — reveals the deepest soul desire. Together, these four markers give you the astrological map to your purpose. But the map requires your conscious engagement to activate.",
        },
        {
          heading: "Your Path Is Already Within You",
          text: "The most liberating teaching in the Gita is that purpose is not 'out there' waiting to be found. It is uncovered from within. This is why Krishna says 'better to do your own duty imperfectly than another's perfectly.' Even your current confusion is part of the path. Arjuna's confusion on the battlefield — his inability to see clearly — was the very condition required for Krishna's teaching. Your moment of not knowing your purpose may be the most important moment of your spiritual journey. Stay with the question.",
        },
      ],
      keyPractices: [
        "Write the answer to: 'What activities make me forget time?' — this is your first Swadharma clue",
        "Get your Vedic birth chart read — examine Lagna, Sun, 10th house lord, and Atmakaraka",
        "Practise 'Purpose Meditation': sit quietly, ask 'What did I come here to do?' and listen without judging",
        "Read Bhagavad Gita Chapter 18 verses 40-48 weekly — note which category (Brahmin/Kshatriya/Vaishya/Shudra quality) resonates most",
        "Take one small action daily that expresses your deepest values — purpose grows through action, not just contemplation",
      ],
      cta: "Talk to Krishna about your life purpose",
    },
  },
];

export function findTopicBySlug(slug: string): LifeGuidanceTopic | undefined {
  return lifeGuidanceTopics.find((t) => t.slug === slug);
}
