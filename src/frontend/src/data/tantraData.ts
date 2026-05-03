export interface TantraRemedy {
  type: "Mantra" | "Yantra" | "Ritual" | "Gemstone";
  description: string;
}

export interface TantraProblem {
  id: string;
  name: string;
  nameHindi: string;
  category: string;
  emoji: string;
  color: string; // tailwind-compatible class hint
  ethical_note: string;
  overview: string;
  signs: string[];
  remedies: TantraRemedy[];
  expert_consultation_recommended: boolean;
}

export const TANTRA_PROBLEMS: TantraProblem[] = [
  {
    id: "kala-jadu",
    name: "Kala Jadu (Black Magic)",
    nameHindi: "काला जादू",
    category: "Negative Energy",
    emoji: "🕯️",
    color: "red",
    ethical_note:
      "This section provides protective knowledge only. Black magic is universally condemned in all dharmic traditions. Information here is for educational awareness and protection.",
    overview:
      "Kala Jadu refers to the alleged practice of using supernatural forces for harmful purposes. Authentic dharmic traditions universally forbid such practices. This section focuses on detection and protection.",
    signs: [
      "Sudden unexplained illness or physical weakness",
      "Persistent bad luck despite sincere efforts",
      "Seeing strange objects (lime, lemon, black thread) near your home",
      "Animals behaving strangely around you",
      "Recurring nightmares or disturbed sleep",
      "Financial losses without apparent cause",
      "Sudden personality changes — aggression, depression, isolation",
      "Feeling watched or presence of negative energy",
      "Hair loss, skin problems without medical reason",
      "Relationships breaking without reason",
    ],
    remedies: [
      {
        type: "Mantra",
        description:
          "Recite Hanuman Chalisa 11 times on Tuesday/Saturday for protection. Also chant 'Om Namo Bhagavate Rudraya' 108 times daily.",
      },
      {
        type: "Yantra",
        description:
          "Install Buri Nazar Nivaran Yantra or Sudarshana Yantra at the entrance of your home after proper energization.",
      },
      {
        type: "Ritual",
        description:
          "Perform Navagraha homa or Sudarshana homa through a qualified priest. Keep rock salt and neem leaves at home entry points.",
      },
      {
        type: "Gemstone",
        description:
          "Wear Cats Eye (Lehsunia) or Hessonite (Gomed) after consultation with an astrologer to strengthen protective planetary energies.",
      },
      {
        type: "Ritual",
        description:
          "On Saturday evening, light a mustard oil lamp before Lord Hanuman and pray for protection. Donate black sesame seeds.",
      },
    ],
    expert_consultation_recommended: true,
  },
  {
    id: "nazar-dosh",
    name: "Nazar Dosh (Evil Eye)",
    nameHindi: "नज़र दोष",
    category: "Energy Imbalance",
    emoji: "👁️",
    color: "amber",
    ethical_note:
      "Evil eye is a widely recognized concept across cultures. These remedies are traditional folk practices. Consult a qualified spiritual advisor for persistent problems.",
    overview:
      "Nazar Dosh occurs when intense jealousy, envy, or ill-will directed at a person causes negative energy to affect them. It is recognized in Hindu, Jain, and Sikh traditions as a real phenomenon.",
    signs: [
      "Sudden illness in children after being praised by others",
      "Crying of infants without visible cause",
      "Business or work stagnation after public success",
      "Headache and lethargy after social events",
      "Salt water or mustard test shows positive indicators",
      "Milk turning sour quickly in the house",
      "Black marks appearing on walls mysteriously",
    ],
    remedies: [
      {
        type: "Ritual",
        description:
          "Nazar Utarna ritual: wave 3 dry red chilies and mustard seeds over the person clockwise 7 times, then burn them. If they smell bad, nazar was present.",
      },
      {
        type: "Mantra",
        description:
          "Chant 'Om Mahashaktiyai Namah' 108 times or recite Mahamrityunjaya Mantra 11 times for protection from negative energies.",
      },
      {
        type: "Yantra",
        description:
          "Hang a Nazar Suraksha Yantra (evil eye protector) at the entrance of your home or business.",
      },
      {
        type: "Ritual",
        description:
          "Prepare a small black thread with 7 knots while chanting protective mantras and tie around the wrist or ankle of the affected person.",
      },
    ],
    expert_consultation_recommended: false,
  },
  {
    id: "vastu-dosh",
    name: "Vastu Dosh",
    nameHindi: "वास्तु दोष",
    category: "Space Energy",
    emoji: "🏠",
    color: "blue",
    ethical_note:
      "Vastu Shastra is an ancient Indian science of space and energy flow. Most Vastu issues can be corrected without demolition through simple remedies.",
    overview:
      "Vastu Dosh refers to energy imbalances in living or working spaces caused by incorrect placement of rooms, directions, or structural elements. It can affect health, wealth, and relationships.",
    signs: [
      "Persistent financial problems despite hard work",
      "Health issues concentrated in specific family members",
      "Frequent arguments and lack of harmony at home",
      "Difficulty in selling or renting the property",
      "Stagnant career or business growth",
      "Difficulty in conceiving children",
      "Sleep disorders in occupants",
    ],
    remedies: [
      {
        type: "Yantra",
        description:
          "Place a Vastu Yantra or Sri Yantra in the Brahmasthan (center) of your home. A Vastu Pyramid grid placed at NE, NW, SE, SW corners balances energy.",
      },
      {
        type: "Ritual",
        description:
          "Perform Vastu Shanti Puja with Navagraha invocation to cleanse and re-energize the space. Use rock salt water to mop floors.",
      },
      {
        type: "Gemstone",
        description:
          "Place natural crystals (clear quartz) in the NE corner and black tourmaline in the SW corner to balance yin-yang energies.",
      },
      {
        type: "Ritual",
        description:
          "Hang a Vastu Swastika with Om symbol at the main entrance. Use wind chimes in the NW to activate beneficial air element.",
      },
    ],
    expert_consultation_recommended: true,
  },
  {
    id: "pret-badha",
    name: "Pret Badha (Spirit Disturbance)",
    nameHindi: "प्रेत बाधा",
    category: "Spiritual Interference",
    emoji: "🌙",
    color: "purple",
    ethical_note:
      "References to spirit-related phenomena appear in many religious traditions. This section provides traditional protective practices. Seek professional mental health support alongside spiritual remedies.",
    overview:
      "Pret Badha refers to interference from disembodied souls (pretas) or negative energies that haven't found peace. Dharmic traditions offer specific prayers and rituals for such situations.",
    signs: [
      "Feeling of a presence in the house",
      "Objects moving or disappearing",
      "Family member speaking or acting strangely",
      "Foul odors without source",
      "Animals (especially dogs) reacting to invisible presence",
      "Sounds at night — footsteps, knocking, voices",
      "Feeling of being touched or held during sleep (sleep paralysis)",
    ],
    remedies: [
      {
        type: "Mantra",
        description:
          "Recite Pitru Stotra and perform Pitra Tarpan on Amavasya. Chant 'Om Aim Hreem Kleem Chamundaye Vichche' for protective energy.",
      },
      {
        type: "Ritual",
        description:
          "Perform Navagraha Shanti Puja and Pitru Dosh Nivaran Puja. Burn camphor and incense of frankincense in each room.",
      },
      {
        type: "Ritual",
        description:
          "Read Ramcharitmanas Sundarkand aloud at home for 7 consecutive days. Keep Hanuman image at the main entrance.",
      },
      {
        type: "Yantra",
        description:
          "Install a Hanuman Yantra or Baglamukhi Yantra in the home after proper energization by a qualified priest.",
      },
    ],
    expert_consultation_recommended: true,
  },
  {
    id: "badhak-graha",
    name: "Badhak Graha",
    nameHindi: "बाधक ग्रह",
    category: "Astrological Obstacle",
    emoji: "🪐",
    color: "amber",
    ethical_note:
      "Badhak Graha is a concept in Vedic Jyotish. These remedies are traditional astrological recommendations. Consult a qualified Jyotishi for personalized assessment.",
    overview:
      "Badhak Graha (obstruction planet) is a Vedic astrology concept where a specific planet becomes the primary obstructor for each lagna (ascendant). It creates persistent obstacles in life until propitiated.",
    signs: [
      "Persistent obstacles despite sincerity and effort",
      "Success coming and then being taken away suddenly",
      "Recurring patterns of failure in the same area of life",
      "Feeling blocked or stagnant for extended periods",
      "Specific period of Badhak Dasha or Antardasha active",
    ],
    remedies: [
      {
        type: "Mantra",
        description:
          "Chant the Beej Mantra of the Badhak planet 108 times daily. For Shani as Badhak: 'Om Pram Preem Praum Sah Shanishcharaya Namah'.",
      },
      {
        type: "Ritual",
        description:
          "Perform Badhak Graha Shanti Puja on the day ruled by that planet. Donate items associated with the planet.",
      },
      {
        type: "Gemstone",
        description:
          "Wear the gemstone of the Badhak planet ONLY after consultation with a qualified astrologer — in some cases it may not be advisable.",
      },
    ],
    expert_consultation_recommended: true,
  },
  {
    id: "grahan-dosh",
    name: "Grahan Dosh (Eclipse Defect)",
    nameHindi: "ग्रहण दोष",
    category: "Birth Chart Dosha",
    emoji: "🌑",
    color: "slate",
    ethical_note:
      "Grahan Dosh is a birth chart concept. It is not a curse but an astrological indication requiring specific remedies. This information is educational.",
    overview:
      "Grahan Dosh occurs when Sun or Moon is conjunct Rahu or Ketu at birth, indicating an eclipse alignment. This can bring specific life challenges related to the Sun-Moon (self, mind, parents) axis.",
    signs: [
      "Sun-Moon afflicted by Rahu/Ketu in birth chart",
      "Issues with father (Sun with Rahu/Ketu) or mother (Moon with Rahu/Ketu)",
      "Health issues related to head, eyes, or mental clarity",
      "Confusion in self-identity and life direction",
      "Career obstacles in government or authority roles",
    ],
    remedies: [
      {
        type: "Mantra",
        description:
          "Chant Aditya Hridayam daily for Sun Grahan Dosh. For Moon, recite Chandra Kavach and Shiva Panchaakshari Stotram.",
      },
      {
        type: "Ritual",
        description:
          "Perform Rahu-Ketu Shanti Puja or Navagraha Homa. On solar/lunar eclipses, chant Maha Mrityunjaya Mantra 108 times.",
      },
      {
        type: "Gemstone",
        description:
          "For Sun Grahan: Ruby (Manik) in gold. For Moon Grahan: Pearl (Moti) in silver — only after astrological consultation.",
      },
    ],
    expert_consultation_recommended: true,
  },
  {
    id: "shrapit-dosh",
    name: "Shrapit Dosh",
    nameHindi: "श्रापित दोष",
    category: "Karmic Debt",
    emoji: "⚖️",
    color: "amber",
    ethical_note:
      "Shrapit Dosh is a karmic concept in Vedic astrology related to past-life deeds. The remedies focus on positive karma and service, which benefit anyone regardless of specific chart placements.",
    overview:
      "Shrapit Dosh (cursed affliction) occurs in Vedic astrology when Saturn and Rahu are conjunct in the birth chart. It indicates karmic debts from previous lifetimes that manifest as obstacles in this life.",
    signs: [
      "Saturn and Rahu conjunction in birth chart (especially in 1, 5, 7, 9, 10)",
      "Repeated failures despite talent and hard work",
      "Difficulties in relationships and marriage",
      "Late success or blocked progress",
      "Health challenges related to Shani (bones, nervous system)",
    ],
    remedies: [
      {
        type: "Mantra",
        description:
          "Chant Shani Chalisa on Saturdays and recite 'Om Sham Shanishcharaya Namah' 108 times. Also chant Rahu Beej Mantra.",
      },
      {
        type: "Ritual",
        description:
          "Perform Shrapit Dosh Nivaran Puja on Saturday, preferably at a Shani Shingnapur temple. Donate black sesame, oil, iron to Shani.",
      },
      {
        type: "Ritual",
        description:
          "Serve the underprivileged, elders, and disabled persons regularly to release karmic debt. Feed crows on Saturdays.",
      },
    ],
    expert_consultation_recommended: true,
  },
  {
    id: "mangal-dosh",
    name: "Mangal Dosh (Kuja Dosha)",
    nameHindi: "मंगल दोष",
    category: "Marriage Dosha",
    emoji: "🔴",
    color: "red",
    ethical_note:
      "Mangal Dosh affects approximately 50% of all birth charts in some form. Modern astrologers note its effects are often overstated. Consult a qualified astrologer before making marriage decisions.",
    overview:
      "Mangal Dosh occurs when Mars is placed in the 1st, 2nd, 4th, 7th, 8th, or 12th house in the birth chart. It is considered significant in marriage matching (Kundali Milan) in Hindu tradition.",
    signs: [
      "Mars in 1, 2, 4, 7, 8, or 12th house in birth chart",
      "Delay in marriage or failed engagements",
      "Conflicts and arguments in married life",
      "Accidents or injuries recurring",
      "High energy and sometimes excessive aggression",
    ],
    remedies: [
      {
        type: "Mantra",
        description:
          "Chant Mangal Beej Mantra 'Om Kram Kreem Kraum Sah Bhaumaya Namah' 108 times on Tuesdays for 40 days.",
      },
      {
        type: "Ritual",
        description:
          "Perform Mangal Shanti Puja on Tuesday. Marry a Manglik partner, or symbolically marry a Peepal tree or Vishnu idol first (Kumbha Vivah).",
      },
      {
        type: "Gemstone",
        description:
          "Wear Red Coral (Moonga) in gold ring on ring finger of right hand on Tuesday, after consultation with a qualified astrologer.",
      },
    ],
    expert_consultation_recommended: true,
  },
  {
    id: "kaal-sarp-dosh",
    name: "Kaal Sarp Dosh",
    nameHindi: "काल सर्प दोष",
    category: "Birth Chart Dosha",
    emoji: "🐍",
    color: "green",
    ethical_note:
      "Kaal Sarp Dosh is a widely discussed concept in Vedic astrology. Note that many successful individuals have this placement. Consult a qualified Jyotishi for personalized analysis.",
    overview:
      "Kaal Sarp Dosh occurs when all planets are hemmed between Rahu and Ketu in the birth chart. There are 12 types based on which houses Rahu-Ketu occupy, each with distinct effects.",
    signs: [
      "All planets positioned between Rahu and Ketu axis",
      "Recurring dreams of snakes",
      "Feeling of being stuck or blocked in progress",
      "Relationship issues and loneliness",
      "Health challenges especially after 40",
      "Ancestors seen in dreams — may indicate Pitru connection",
    ],
    remedies: [
      {
        type: "Ritual",
        description:
          "Perform Kaal Sarp Dosh Nivaran Puja at Tryambakeshwar (Nashik), Ujjain Mahakaleshwar, or Trimbakeshwar Jyotirlinga.",
      },
      {
        type: "Mantra",
        description:
          "Recite Mahamrityunjaya Mantra 108 times daily and chant 'Om Namah Shivaya' 1008 times on Nagpanchami.",
      },
      {
        type: "Yantra",
        description:
          "Keep Kaal Sarp Yantra in your puja room, energized on Nag Panchami for maximum effect.",
      },
      {
        type: "Ritual",
        description:
          "On Nag Panchami, offer milk to a live snake at a temple or pour milk at anthills. Feed Brahmins on this day.",
      },
    ],
    expert_consultation_recommended: true,
  },
  {
    id: "pitra-dosh",
    name: "Pitra Dosh (Ancestral Karma)",
    nameHindi: "पितृ दोष",
    category: "Ancestral Karma",
    emoji: "🌿",
    color: "amber",
    ethical_note:
      "Pitra Dosh is related to ancestral karma in Vedic tradition. The remedies focus on honoring ancestors, which is a noble practice in any tradition regardless of astrological factors.",
    overview:
      "Pitra Dosh arises from unresolved karma of deceased ancestors. It manifests in the birth chart through specific planetary positions and can affect multiple generations until propitiated.",
    signs: [
      "Sun or Moon afflicted by Rahu/Ketu in 9th house",
      "Recurring family issues across generations",
      "Difficulty in having children or child health issues",
      "Seeing dead ancestors in dreams requesting food or help",
      "Persistent financial instability despite efforts",
      "Property disputes within family",
    ],
    remedies: [
      {
        type: "Ritual",
        description:
          "Perform Pitru Tarpan (offering water to ancestors) on Amavasya and during Pitru Paksha. Feed crows and cows on these days.",
      },
      {
        type: "Ritual",
        description:
          "Perform Shraddha ceremony (annual ancestral rites) with proper Brahmin pandits according to your family tradition.",
      },
      {
        type: "Mantra",
        description:
          "Recite Pitru Stotra and Garuda Purana passages. Chant 'Om Pitrubhyah Namah' 108 times on Amavasya.",
      },
      {
        type: "Ritual",
        description:
          "Donate food, clothing, and items to the poor and Brahmins in the name of your ancestors. Plant Peepal tree or Tulsi in memory.",
      },
    ],
    expert_consultation_recommended: false,
  },
  {
    id: "vashikaran",
    name: "Vashikaran — Ethical Discussion",
    nameHindi: "वशीकरण — नैतिक चर्चा",
    category: "Ethical Education",
    emoji: "⚠️",
    color: "orange",
    ethical_note:
      "IMPORTANT DISCLAIMER: Vashikaran practices that violate another person's free will are strictly condemned by all dharmic traditions and are ethically wrong. This section is for educational awareness and protection only.",
    overview:
      "Vashikaran (Sanskrit: Vashi = control, Karan = method) refers to practices claiming to influence another person's mind or will. Authentic dharmic teachers universally condemn coercive practices. Protection against such practices is legitimate.",
    signs: [
      "Sudden unexplained attraction or obsession toward a specific person",
      "Loss of independent thinking or decision-making",
      "Feeling compelled to act against your values",
      "Being given suspicious food or drink items",
      "Finding objects with turmeric, vermilion, or hair at your doorstep",
    ],
    remedies: [
      {
        type: "Mantra",
        description:
          "Chant 'Om Namo Bhagavate Vasudevaya' 108 times daily and recite Vishnu Sahasranama to strengthen your aura and will.",
      },
      {
        type: "Yantra",
        description:
          "Keep Sudarshana Yantra or Baglamukhi Yantra after proper energization for protection of mind and will.",
      },
      {
        type: "Ritual",
        description:
          "Regularly bathe in water with rock salt and neem leaves. Burn camphor in your home. Maintain strong personal boundaries.",
      },
    ],
    expert_consultation_recommended: true,
  },
  {
    id: "sade-sati",
    name: "Sade Sati (7.5 Year Saturn Transit)",
    nameHindi: "साढ़े साती",
    category: "Planetary Transit",
    emoji: "🪐",
    color: "blue",
    ethical_note:
      "Sade Sati is a predictable planetary transit, not a curse. Many highly successful people have achieved great things during Sade Sati. This is an educational guide to understanding and navigating this period.",
    overview:
      "Sade Sati refers to the 7.5-year period when Saturn (Shani) transits through the 12th house, 1st house, and 2nd house from the natal Moon sign. It occurs approximately every 30 years in a person's life.",
    signs: [
      "Saturn currently transiting 12th, 1st, or 2nd from your Moon sign (Rashi)",
      "Phase 1 (12th from Moon): expenses, travel, isolation tendencies",
      "Phase 2 (1st — Moon sign): career/health challenges, major life changes",
      "Phase 3 (2nd from Moon): family/financial pressure, job changes",
      "Increased workload and responsibilities",
      "Testing of relationships and values",
    ],
    remedies: [
      {
        type: "Mantra",
        description:
          "Recite Shani Chalisa and 'Om Sham Shanishcharaya Namah' 108 times on Saturdays. Read Shani Stotra at Shani temples.",
      },
      {
        type: "Ritual",
        description:
          "On Saturdays, donate black sesame, iron items, oil, black cloth, and food to the poor. Light mustard oil lamp at Shani temple.",
      },
      {
        type: "Gemstone",
        description:
          "Blue Sapphire (Neelam) can be worn if Saturn is favorable in your chart — ONLY after thorough consultation with a Jyotishi.",
      },
      {
        type: "Ritual",
        description:
          "Serve the elderly, workers, and underprivileged. Practice discipline, patience, and karma yoga — Saturn rewards genuine effort.",
      },
    ],
    expert_consultation_recommended: false,
  },
];
