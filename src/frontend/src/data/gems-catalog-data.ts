// gems-catalog-data.ts — Complete gemstone catalog: 9 Navratna + 25 semi-precious stones

export interface GemEntry {
  id: string;
  name: string;
  nameHindi: string;
  sanskriName?: string;
  type: "navratna" | "semi-precious";
  rulingPlanet: string;
  chakra: string;
  benefits: string;
  bestFor: string;
  howToWear: {
    metal: string;
    finger: string;
    day: string;
    mantra: string;
    ritual: string;
  };
  priceRange: string;
  imageUrl: string;
  color: string;
  origin: string;
}

export const NAVRATNA_GEMS: GemEntry[] = [
  {
    id: "gem-ruby",
    name: "Ruby",
    nameHindi: "माणिक",
    sanskriName: "Manikya",
    type: "navratna",
    rulingPlanet: "Sun (Surya)",
    chakra: "Sahasrara (Crown)",
    benefits:
      "Ruby (Manik) is the gemstone of the Sun, bestowing leadership, authority, and vitality. It strengthens willpower, improves eyesight, and boosts the immune system. Enhances confidence, courage, and the ability to lead. Removes laziness, depression, and low vitality. Brings recognition, fame, and government favor. Excellent for those in politics, administration, and leadership roles.",
    bestFor:
      "Weak Sun, lack of confidence, leadership roles, government jobs, eye problems, low vitality",
    howToWear: {
      metal: "Gold",
      finger: "Ring finger (right hand)",
      day: "Sunday sunrise",
      mantra: "Om Suryaya Namah | Om Hring Hamsah Suryaya Namah",
      ritual:
        "Wash in Ganga jal, energize with 108 mantra repetitions on Sunday",
    },
    priceRange: "₹3,000 – ₹50,000+ per carat",
    imageUrl: "/assets/images/gems/ruby.jpg",
    color: "Deep red to pinkish-red",
    origin: "Burma, Sri Lanka, Thailand",
  },
  {
    id: "gem-pearl",
    name: "Pearl",
    nameHindi: "मोती",
    sanskriName: "Mukta",
    type: "navratna",
    rulingPlanet: "Moon (Chandra)",
    chakra: "Ajna (Third Eye)",
    benefits:
      "Pearl (Moti) is the gemstone of the Moon, bestowing emotional stability, mental peace, and intuitive wisdom. It calms the mind, reduces anxiety, and improves sleep. Excellent for mothers, emotional healers, and those with anger issues. Strengthens the digestive system, improves complexion, and removes negativity. Brings compassion, patience, and nurturing qualities to the wearer.",
    bestFor:
      "Weak Moon, emotional instability, insomnia, anger issues, digestive problems, mental anxiety",
    howToWear: {
      metal: "Silver",
      finger: "Little finger (right hand)",
      day: "Monday morning",
      mantra: "Om Chandraya Namah | Om Shring Chandramase Namah",
      ritual:
        "Soak in milk overnight, wash with holy water, energize with lunar mantra",
    },
    priceRange: "₹1,500 – ₹20,000+ per carat",
    imageUrl: "/assets/images/gems/pearl.jpg",
    color: "White, cream, pink, golden",
    origin:
      "Natural sea pearls from Sri Lanka, Persian Gulf, freshwater pearls from China",
  },
  {
    id: "gem-coral",
    name: "Red Coral",
    nameHindi: "मूंगा",
    sanskriName: "Praval / Vidruma",
    type: "navratna",
    rulingPlanet: "Mars (Mangal)",
    chakra: "Manipura (Solar Plexus)",
    benefits:
      "Red Coral (Moonga) is the gemstone of Mars (Mangal), providing courage, vitality, and protection. It removes Mangal Dosha, making it highly recommended for marriage. Boosts energy, strengthens blood, and improves physical stamina. Excellent for athletes, military personnel, and surgeons. Provides protection from enemies, accidents, and negative energies. Removes fear and cowardice, bestowing warrior-like confidence.",
    bestFor:
      "Mangal Dosha, weak Mars, lack of energy, delayed marriage, enemies, blood disorders",
    howToWear: {
      metal: "Gold or copper",
      finger: "Ring finger or index finger (right hand)",
      day: "Tuesday morning",
      mantra: "Om Angarakaya Namah | Om Kring Krinaya Namah",
      ritual:
        "Soak in raw cow's milk, energize with Mars mantra 108 times on Tuesday",
    },
    priceRange: "₹800 – ₹15,000+ per carat",
    imageUrl: "/assets/images/gems/coral.jpg",
    color: "Red, orange-red, pink-red",
    origin: "Mediterranean Sea, Japan, Australia",
  },
  {
    id: "gem-emerald",
    name: "Emerald",
    nameHindi: "पन्ना",
    sanskriName: "Marakta",
    type: "navratna",
    rulingPlanet: "Mercury (Budh)",
    chakra: "Anahata (Heart)",
    benefits:
      "Emerald (Panna) is the gemstone of Mercury, enhancing intelligence, communication, and business acumen. It sharpens intellect, improves memory, and bestows eloquence. Excellent for writers, speakers, businessmen, and students. Removes skin diseases, nervous disorders, and speech impediments. Brings success in education, commerce, and intellectual pursuits. Activates the heart chakra, bringing compassion and balanced emotions.",
    bestFor:
      "Weak Mercury, speech problems, business success, intelligence, nervous system, skin diseases",
    howToWear: {
      metal: "Gold",
      finger: "Little finger (right hand)",
      day: "Wednesday morning",
      mantra: "Om Budhaya Namah | Om Bring Budhaya Namah",
      ritual:
        "Soak in honey overnight, wash with Ganga jal, energize on Wednesday",
    },
    priceRange: "₹5,000 – ₹100,000+ per carat",
    imageUrl: "/assets/images/gems/emerald.jpg",
    color: "Green to deep green",
    origin: "Colombia, Zambia, Brazil, Zimbabwe",
  },
  {
    id: "gem-yellow-sapphire",
    name: "Yellow Sapphire",
    nameHindi: "पुखराज",
    sanskriName: "Pushyaraga",
    type: "navratna",
    rulingPlanet: "Jupiter (Guru/Brihaspati)",
    chakra: "Vishuddha (Throat)",
    benefits:
      "Yellow Sapphire (Pukhraj) is the gemstone of Jupiter — the guru of the gods — and is considered one of the most auspicious. It blesses with wisdom, prosperity, children, and spiritual growth. Removes Jupiter dosha, which can affect marriage, progeny, and higher education. Excellent for teachers, philosophers, judges, and spiritual guides. Brings good fortune, divine blessings, and social respect.",
    bestFor:
      "Weak Jupiter, childlessness, delayed marriage, higher education, wisdom, prosperity, spiritual growth",
    howToWear: {
      metal: "Gold",
      finger: "Index finger (right hand)",
      day: "Thursday morning",
      mantra: "Om Gurave Namah | Om Bring Brihaspataye Namah",
      ritual:
        "Soak in ghee or honey, wash with Ganga jal, energize with Guru mantra",
    },
    priceRange: "₹2,000 – ₹40,000+ per carat",
    imageUrl: "/assets/images/gems/yellow-sapphire.jpg",
    color: "Yellow to golden yellow",
    origin: "Sri Lanka, Burma, Thailand, Australia",
  },
  {
    id: "gem-diamond",
    name: "Diamond",
    nameHindi: "हीरा",
    sanskriName: "Vajra",
    type: "navratna",
    rulingPlanet: "Venus (Shukra)",
    chakra: "Svadhisthana (Sacral)",
    benefits:
      "Diamond (Heera) is the gemstone of Venus, bestowing beauty, luxury, creativity, and romantic fulfillment. It attracts love, improves marital life, and enhances artistic talents. Removes Venus dosha, cures kidney and reproductive problems, and brings social recognition. Excellent for those in arts, fashion, luxury goods, and entertainment. Provides longevity, purity of mind, and spiritual clarity.",
    bestFor:
      "Weak Venus, relationship issues, artistic pursuits, luxury and comforts, kidney problems, marital harmony",
    howToWear: {
      metal: "Gold or platinum",
      finger: "Middle finger or ring finger (right hand)",
      day: "Friday morning",
      mantra: "Om Shukraya Namah | Om Shring Shukraya Namah",
      ritual:
        "Soak in rose water, energize with Venus mantra on Friday morning",
    },
    priceRange: "₹15,000 – ₹500,000+ per carat",
    imageUrl: "/assets/images/gems/diamond.jpg",
    color: "Colorless, white, yellow, blue, pink",
    origin: "South Africa, Russia, Botswana, India (Golconda)",
  },
  {
    id: "gem-blue-sapphire",
    name: "Blue Sapphire",
    nameHindi: "नीलम",
    sanskriName: "Indranila",
    type: "navratna",
    rulingPlanet: "Saturn (Shani)",
    chakra: "Ajna (Third Eye)",
    benefits:
      "Blue Sapphire (Neelam) is the most powerful and fastest-acting gemstone, ruled by Saturn. It can instantly transform fortune — for better or worse — so must be worn only after proper astrological consultation. When suitable, it brings immediate wealth, success, and removes Shani's hardships including Sade Sati. Provides discipline, focus, and the ability to work hard towards goals. Recommended for those in law, judiciary, mining, and service industries.",
    bestFor:
      "Strong Saturn placement, Sade Sati management, wealth sudden, discipline, legal profession, mining",
    howToWear: {
      metal: "Gold or silver (as recommended by astrologer)",
      finger: "Middle finger (right hand)",
      day: "Saturday morning",
      mantra:
        "Om Shanaischaraya Namah | Om Pram Prim Prom Sah Shanaischaraya Namah",
      ritual:
        "MUST test for 3-7 days before wearing permanently; consult astrologer first",
    },
    priceRange: "₹5,000 – ₹200,000+ per carat",
    imageUrl: "/assets/images/gems/blue-sapphire.jpg",
    color: "Blue to dark blue, cornflower blue",
    origin: "Kashmir (finest), Sri Lanka, Burma, Australia",
  },
  {
    id: "gem-hessonite",
    name: "Hessonite Garnet",
    nameHindi: "गोमेद",
    sanskriName: "Gomed",
    type: "navratna",
    rulingPlanet: "Rahu",
    chakra: "Muladhara (Root)",
    benefits:
      "Hessonite (Gomed) is the gemstone of Rahu, the shadow planet associated with sudden events, technology, and foreign connections. It removes Rahu's malefic effects including confusion, obsession, and sudden losses. Provides clarity of thought, removes fear and anxiety, and helps in career advancement in technology, research, and foreign dealings. Excellent for those experiencing Rahu Mahadasha. Brings sudden positive changes and unexpected opportunities.",
    bestFor:
      "Rahu Mahadasha, confusion, sudden losses, technology field, foreign connections, anxiety",
    howToWear: {
      metal: "Silver or panchdhatu",
      finger: "Middle finger (right hand)",
      day: "Saturday or Wednesday",
      mantra: "Om Rahave Namah | Om Rang Rahave Namah",
      ritual:
        "Soak in milk overnight, wash with Ganga jal, energize with Rahu mantra",
    },
    priceRange: "₹1,000 – ₹20,000+ per carat",
    imageUrl: "/assets/images/gems/hessonite.jpg",
    color: "Honey-brown, orange-brown, yellowish-red",
    origin: "Sri Lanka, India, Africa, Brazil",
  },
  {
    id: "gem-cats-eye",
    name: "Cat's Eye",
    nameHindi: "लहसुनिया",
    sanskriName: "Vaidurya",
    type: "navratna",
    rulingPlanet: "Ketu",
    chakra: "Vishuddha (Throat) + Sahasrara",
    benefits:
      "Cat's Eye (Lahsuniya) is the gemstone of Ketu — the south node associated with spirituality, past karma, and liberation. It removes Ketu's malefic effects including addictions, accidents, and mental confusion. Provides protection from hidden enemies, evil eye, and black magic. Excellent for spiritual seekers, those in occult sciences, and individuals experiencing Ketu Mahadasha. Brings sudden wealth and unexpected gains while accelerating spiritual evolution.",
    bestFor:
      "Ketu Mahadasha, spiritual evolution, hidden enemies, addictions, black magic protection, past karma",
    howToWear: {
      metal: "Gold or silver (as recommended)",
      finger: "Middle finger or ring finger",
      day: "Tuesday or Saturday",
      mantra: "Om Ketave Namah | Om Kring Ketave Namah",
      ritual:
        "Soak in cow's milk for 3 days, energize with Ketu mantra; consult astrologer",
    },
    priceRange: "₹2,000 – ₹50,000+ per carat",
    imageUrl: "/assets/images/gems/cats-eye.jpg",
    color: "Yellowish-green, golden, grey with moving 'eye'",
    origin: "Sri Lanka, India (Orissa), Brazil",
  },
];

export const SEMI_PRECIOUS_GEMS: GemEntry[] = [
  {
    id: "sp-amethyst",
    name: "Amethyst",
    nameHindi: "जामुनी स्फटिक",
    type: "semi-precious",
    rulingPlanet: "Saturn / Jupiter",
    chakra: "Ajna (Third Eye) + Sahasrara (Crown)",
    benefits:
      "Amethyst is the stone of spiritual protection and purification. It calms the mind, reduces stress, and enhances meditation. Excellent for those struggling with addictions, anxiety, or insomnia. Opens the third eye, enhances psychic abilities, and accelerates spiritual growth. Protects from negative energies, nightmares, and psychic attacks. Widely used in crystal healing for emotional balance.",
    bestFor:
      "Stress and anxiety, insomnia, addiction recovery, meditation, psychic protection, emotional balance",
    howToWear: {
      metal: "Silver",
      finger: "Any",
      day: "Any day",
      mantra: "Om Shanti",
      ritual: "Cleanse under moonlight, program with intention",
    },
    priceRange: "₹200 – ₹3,000",
    imageUrl: "/assets/images/gems/amethyst.jpg",
    color: "Purple to violet",
    origin: "Brazil, Uruguay, Zambia, India",
  },
  {
    id: "sp-rose-quartz",
    name: "Rose Quartz",
    nameHindi: "गुलाबी स्फटिक",
    type: "semi-precious",
    rulingPlanet: "Venus",
    chakra: "Anahata (Heart)",
    benefits:
      "Rose Quartz is the ultimate stone of unconditional love and heart healing. It attracts romantic love, heals emotional wounds, and fosters self-love. Excellent for those recovering from heartbreak, seeking love, or improving relationships. Opens the heart chakra, brings compassion, and promotes emotional healing. Also beneficial for fertility and improving mother-child relationships.",
    bestFor:
      "Attracting love, emotional healing, self-love, fertility, heart chakra activation, compassion",
    howToWear: {
      metal: "Silver",
      finger: "Ring or little finger",
      day: "Friday",
      mantra: "Om Shukraya Namah",
      ritual: "Soak in rose water, program with love intention",
    },
    priceRange: "₹150 – ₹2,000",
    imageUrl: "/assets/images/gems/rose-quartz.jpg",
    color: "Pink to pale pink",
    origin: "Brazil, Madagascar, USA, India",
  },
  {
    id: "sp-clear-quartz",
    name: "Clear Quartz",
    nameHindi: "स्फटिक (शुद्ध)",
    type: "semi-precious",
    rulingPlanet: "Moon / Venus",
    chakra: "All chakras (master healer)",
    benefits:
      "Clear Quartz is the 'Master Healer' stone that amplifies energy and intentions. It purifies the aura, amplifies prayers and mantras, and enhances clarity of thought. Excellent for meditation, energy healing, and manifesting intentions. Works with all chakras and amplifies the properties of other crystals. Used in Sphatik mala for Goddess Lakshmi puja. Brings mental clarity, spiritual insight, and purifies the environment.",
    bestFor:
      "Amplifying intentions, meditation, clarity of mind, energy healing, all-purpose spiritual work",
    howToWear: {
      metal: "Silver",
      finger: "Any",
      day: "Any",
      mantra: "Om Namah Shivaya",
      ritual: "Cleanse with salt water, program with clear intention",
    },
    priceRange: "₹200 – ₹3,000",
    imageUrl: "/assets/images/gems/clear-quartz.jpg",
    color: "Colorless, transparent",
    origin: "Brazil, Madagascar, USA, Himalayas",
  },
  {
    id: "sp-black-tourmaline",
    name: "Black Tourmaline",
    nameHindi: "काला टूर्मलाइन",
    type: "semi-precious",
    rulingPlanet: "Saturn",
    chakra: "Muladhara (Root)",
    benefits:
      "Black Tourmaline is the most powerful protection stone, creating an energetic shield against negative energies, EMF radiation, and psychic attacks. It grounds excess energy, removes fear, and provides a sense of security. Excellent for empaths, healers, and those in toxic environments. Removes negative thoughts, purifies the aura, and promotes positive thinking. Particularly effective for protection from black magic and evil eye.",
    bestFor:
      "Protection, grounding, EMF protection, black magic, negative environments, fear and anxiety",
    howToWear: {
      metal: "Silver",
      finger: "Any",
      day: "Saturday",
      mantra: "Om Shanaischaraya Namah",
      ritual:
        "Bury in earth for 24 hours, cleanse, program with protection intention",
    },
    priceRange: "₹300 – ₹5,000",
    imageUrl: "/assets/images/gems/black-tourmaline.jpg",
    color: "Black",
    origin: "Brazil, India, Namibia, Sri Lanka",
  },
  {
    id: "sp-tiger-eye",
    name: "Tiger Eye",
    nameHindi: "टाइगर आई",
    type: "semi-precious",
    rulingPlanet: "Sun / Mars",
    chakra: "Manipura (Solar Plexus)",
    benefits:
      "Tiger Eye is the stone of courage, confidence, and personal power. It enhances willpower, reduces fear, and promotes clear thinking under pressure. Excellent for those lacking confidence, procrastinating, or facing career challenges. Protects travelers, brings good luck, and attracts wealth. Activates the solar plexus chakra, boosting self-esteem and the ability to take decisive action.",
    bestFor:
      "Confidence, courage, career growth, travel protection, wealth attraction, clear decision-making",
    howToWear: {
      metal: "Gold or copper",
      finger: "Ring or index finger",
      day: "Sunday or Tuesday",
      mantra: "Om Suryaya Namah",
      ritual: "Energize in sunlight, program with confidence intention",
    },
    priceRange: "₹200 – ₹2,500",
    imageUrl: "/assets/images/gems/tiger-eye.jpg",
    color: "Golden brown with chatoyant bands",
    origin: "South Africa, India, USA, Brazil",
  },
  {
    id: "sp-lapis-lazuli",
    name: "Lapis Lazuli",
    nameHindi: "लाजवर्त",
    type: "semi-precious",
    rulingPlanet: "Saturn / Jupiter",
    chakra: "Ajna (Third Eye) + Vishuddha (Throat)",
    benefits:
      "Lapis Lazuli is the stone of wisdom, truth, and spiritual enlightenment. It enhances intellectual abilities, encourages honest communication, and activates the higher mind. Used since ancient Egypt for royal and spiritual purposes. Excellent for teachers, writers, and spiritual seekers. Provides protection, promotes inner peace, and helps access past-life wisdom. Highly effective for throat and third eye activation.",
    bestFor:
      "Wisdom, communication, spiritual truth, intellectual enhancement, past-life access, inner peace",
    howToWear: {
      metal: "Silver",
      finger: "Index finger",
      day: "Thursday",
      mantra: "Om Gurave Namah",
      ritual: "Cleanse in moonlight, dedicate to Saraswati for wisdom",
    },
    priceRange: "₹500 – ₹8,000",
    imageUrl: "/assets/images/gems/lapis-lazuli.jpg",
    color: "Deep blue with gold pyrite flecks",
    origin: "Afghanistan (finest), Chile, Russia",
  },
  {
    id: "sp-citrine",
    name: "Citrine",
    nameHindi: "सुनहरा स्फटिक",
    type: "semi-precious",
    rulingPlanet: "Sun / Mercury",
    chakra: "Manipura (Solar Plexus)",
    benefits:
      "Citrine is the 'Merchant Stone' — one of the most powerful wealth-attracting crystals. It promotes abundance, prosperity, and business success. Unlike other crystals, it never holds negative energy. Activates the solar plexus chakra, enhancing confidence and positive energy. Removes negativity, dispels fear, and promotes creativity and self-expression. Excellent for entrepreneurs and business owners. Also beneficial for mood enhancement and depression relief.",
    bestFor:
      "Wealth and abundance, business success, positive energy, confidence, depression relief, creativity",
    howToWear: {
      metal: "Gold",
      finger: "Ring finger or index finger",
      day: "Sunday",
      mantra: "Om Hring Hamsah Suryaya Namah",
      ritual: "Place in sunlight for 4 hours, program with abundance intention",
    },
    priceRange: "₹200 – ₹4,000",
    imageUrl: "/assets/images/gems/citrine.jpg",
    color: "Yellow to golden orange",
    origin: "Brazil, USA, Spain, Scotland",
  },
  {
    id: "sp-green-aventurine",
    name: "Green Aventurine",
    nameHindi: "हरा एडवेंचुरिन",
    type: "semi-precious",
    rulingPlanet: "Mercury / Venus",
    chakra: "Anahata (Heart)",
    benefits:
      "Green Aventurine is the 'Stone of Opportunity' and is considered the luckiest of all crystals. It attracts good luck in all new ventures and reinforces leadership qualities. Promotes prosperity, abundance, and career advancement. Calms the nervous system, soothes emotional wounds, and promotes optimism. Excellent for those seeking new opportunities, starting businesses, or making important life changes.",
    bestFor:
      "Luck and opportunity, new ventures, career advancement, heart healing, prosperity, leadership",
    howToWear: {
      metal: "Silver or gold",
      finger: "Ring finger",
      day: "Wednesday or Friday",
      mantra: "Om Budhaya Namah",
      ritual: "Cleanse with Ganga jal, program with luck intention",
    },
    priceRange: "₹150 – ₹2,000",
    imageUrl: "/assets/images/gems/green-aventurine.jpg",
    color: "Green with golden flecks",
    origin: "India, Brazil, Russia",
  },
  {
    id: "sp-labradorite",
    name: "Labradorite",
    nameHindi: "लैब्राडोराइट",
    type: "semi-precious",
    rulingPlanet: "Uranus / Moon",
    chakra: "Ajna (Third Eye) + Throat",
    benefits:
      "Labradorite is the stone of transformation and magical abilities. Known for its stunning iridescent flash (labradorescence), it activates psychic abilities and enhances intuition. Protects the aura from energy leakage, removes illusions, and promotes clarity in spiritual matters. Excellent for spiritual workers, healers, and those undergoing major life transformations. Provides strength during periods of change.",
    bestFor:
      "Transformation, psychic abilities, intuition, aura protection, spiritual work, life changes",
    howToWear: {
      metal: "Silver",
      finger: "Any",
      day: "Monday",
      mantra: "Om Chandraya Namah",
      ritual: "Cleanse under full moon, program with transformation intention",
    },
    priceRange: "₹300 – ₹5,000",
    imageUrl: "/assets/images/gems/labradorite.jpg",
    color: "Grey-green with iridescent blue-green flash",
    origin: "Canada, Finland, Madagascar",
  },
  {
    id: "sp-moonstone",
    name: "Moonstone",
    nameHindi: "चंद्रकांत मणि",
    type: "semi-precious",
    rulingPlanet: "Moon (Chandra)",
    chakra: "Ajna (Third Eye) + Sahasrara",
    benefits:
      "Moonstone is the sacred stone of the Moon, feminine energy, and intuition. It enhances psychic perception, brings emotional balance, and supports feminine cycles. Highly beneficial for women's health, fertility, and pregnancy. Promotes new beginnings, inner growth, and strength. Used in Vedic traditions for Moon-related remedies. Excellent for those with emotional instability or Moon problems in their chart.",
    bestFor:
      "Women's health, fertility, emotional balance, intuition, Moon dosha, new beginnings",
    howToWear: {
      metal: "Silver",
      finger: "Ring or little finger",
      day: "Monday",
      mantra: "Om Chandraya Namah",
      ritual:
        "Soak under full moon light overnight, dedicate to Goddess Parvati",
    },
    priceRange: "₹400 – ₹8,000",
    imageUrl: "/assets/images/gems/moonstone.jpg",
    color: "White to peach with blue adularescence",
    origin: "Sri Lanka, India, Madagascar",
  },
  {
    id: "sp-obsidian",
    name: "Black Obsidian",
    nameHindi: "काला ओब्सीडियन",
    type: "semi-precious",
    rulingPlanet: "Saturn / Pluto",
    chakra: "Muladhara (Root)",
    benefits:
      "Black Obsidian is a volcanic glass stone with powerful protective properties. It creates a strong shield against negativity, psychic attacks, and black magic. Forces confrontation with unresolved issues and shadow aspects of the self for deep healing. Excellent for spiritual protection and truth-seeking. Removes energy blockages, past traumas, and old patterns. Highly effective for aura cleansing and Vastu correction.",
    bestFor:
      "Psychic protection, black magic, aura cleansing, past trauma healing, truth, Vastu correction",
    howToWear: {
      metal: "Silver",
      finger: "Index finger or as pendant",
      day: "Saturday",
      mantra: "Om Shanaischaraya Namah",
      ritual: "Smudge with sage, program with protection intention",
    },
    priceRange: "₹200 – ₹3,000",
    imageUrl: "/assets/images/gems/obsidian.jpg",
    color: "Black, shiny",
    origin: "Mexico, USA, Iceland",
  },
  {
    id: "sp-pyrite",
    name: "Pyrite",
    nameHindi: "पायराइट",
    type: "semi-precious",
    rulingPlanet: "Sun / Mars",
    chakra: "Manipura (Solar Plexus)",
    benefits:
      "Pyrite (Fool's Gold) is a powerful wealth-attracting stone with a golden metallic luster that resembles gold. It attracts abundance, stimulates the intellect, and enhances mental clarity. Protects from negative energies and environmental pollution. Activates the solar plexus chakra, boosting confidence and creative abilities. Excellent for entrepreneurs, businessmen, and those seeking financial growth. Used widely in Feng Shui for wealth corners.",
    bestFor:
      "Wealth attraction, financial growth, confidence, mental clarity, protection, business success",
    howToWear: {
      metal: "Gold or copper",
      finger: "Index finger",
      day: "Sunday",
      mantra: "Om Hring Hamsah Suryaya Namah",
      ritual: "Place in sunlight for activation, keep in wealth corner",
    },
    priceRange: "₹300 – ₹5,000",
    imageUrl: "/assets/images/gems/pyrite.jpg",
    color: "Golden-yellow, metallic",
    origin: "Spain, Peru, Russia",
  },
  {
    id: "sp-hematite",
    name: "Hematite",
    nameHindi: "रक्त मणि",
    type: "semi-precious",
    rulingPlanet: "Mars / Saturn",
    chakra: "Muladhara (Root)",
    benefits:
      "Hematite is an iron-rich stone with powerful grounding and balancing properties. It reduces stress and anxiety, improves focus, and helps organize thoughts. Excellent for studying and working under pressure. Dissolves negativity, provides courage, and improves willpower. Beneficial for blood disorders, anemia, and circulation. Protects the wearer from negative energies and electromagnetic radiation.",
    bestFor:
      "Grounding, stress relief, focus and concentration, blood disorders, anemia, negative energy",
    howToWear: {
      metal: "Silver",
      finger: "Index or middle finger",
      day: "Tuesday or Saturday",
      mantra: "Om Angarakaya Namah",
      ritual: "Bury in earth for 24 hours for activation and grounding",
    },
    priceRange: "₹150 – ₹2,000",
    imageUrl: "/assets/images/gems/hematite.jpg",
    color: "Black, metallic silver-grey",
    origin: "Brazil, USA, UK, Morocco",
  },
  {
    id: "sp-sodalite",
    name: "Sodalite",
    nameHindi: "सोडालाइट",
    type: "semi-precious",
    rulingPlanet: "Mercury",
    chakra: "Ajna (Third Eye) + Vishuddha (Throat)",
    benefits:
      "Sodalite is the stone of logic, rational thought, and objectivity. It enhances communication, self-expression, and the ability to speak truth. Excellent for public speakers, writers, and those in academic fields. Calms the mind during panic attacks, promotes rational thinking, and reduces emotional reactivity. Activates both the throat and third eye chakras for clear, insightful communication.",
    bestFor:
      "Communication, rational thinking, public speaking, emotional balance, Mercury problems, academic fields",
    howToWear: {
      metal: "Silver",
      finger: "Little finger",
      day: "Wednesday",
      mantra: "Om Budhaya Namah",
      ritual: "Cleanse with water, program with communication intention",
    },
    priceRange: "₹200 – ₹3,000",
    imageUrl: "/assets/images/gems/sodalite.jpg",
    color: "Dark blue with white calcite veins",
    origin: "Brazil, Canada, Namibia",
  },
  {
    id: "sp-fluorite",
    name: "Fluorite",
    nameHindi: "फ्लोराइट",
    type: "semi-precious",
    rulingPlanet: "Mercury / Neptune",
    chakra: "Multiple chakras (cleansing)",
    benefits:
      "Fluorite is the 'Genius Stone' for mental clarity, focus, and organization. It absorbs and neutralizes negative energy and stress, making it excellent for studying and focused work. The different colors activate different chakras — green for heart, purple for third eye, clear for crown. Removes confusion, enhances learning, and promotes quick decision-making.",
    bestFor:
      "Mental clarity, studying, organization, stress absorption, decision-making, multi-chakra healing",
    howToWear: {
      metal: "Silver",
      finger: "Any",
      day: "Wednesday",
      mantra: "Om Budhaya Namah",
      ritual: "Cleanse regularly as it absorbs negative energy quickly",
    },
    priceRange: "₹200 – ₹4,000",
    imageUrl: "/assets/images/gems/fluorite.jpg",
    color: "Purple, green, blue, rainbow (multi-color)",
    origin: "China, Mexico, USA, South Africa",
  },
  {
    id: "sp-carnelian",
    name: "Carnelian",
    nameHindi: "लाल स्फटिक",
    type: "semi-precious",
    rulingPlanet: "Sun / Mars",
    chakra: "Svadhisthana (Sacral) + Muladhara (Root)",
    benefits:
      "Carnelian is the stone of creativity, motivation, and courage. It activates and energizes, dispels apathy, and motivates for success. Excellent for artists, singers, and performers. Improves fertility and sexual vitality. Removes fear, awakens hidden talents, and boosts passion for life. In ancient Egypt it was used for protection and to bring good fortune to the dead and living alike.",
    bestFor:
      "Creativity, motivation, fertility, courage, artistic talent, apathy, sexual vitality",
    howToWear: {
      metal: "Gold or copper",
      finger: "Ring or index finger",
      day: "Sunday or Tuesday",
      mantra: "Om Suryaya Namah",
      ritual:
        "Energize in sunlight, program with creative and motivational intention",
    },
    priceRange: "₹200 – ₹3,000",
    imageUrl: "/assets/images/gems/carnelian.jpg",
    color: "Orange-red to reddish-brown",
    origin: "India, Brazil, Germany, Czech Republic",
  },
  {
    id: "sp-jasper",
    name: "Red Jasper",
    nameHindi: "जैस्पर",
    type: "semi-precious",
    rulingPlanet: "Mars",
    chakra: "Muladhara (Root)",
    benefits:
      "Red Jasper is the 'Stone of Endurance' providing sustained energy, stability, and courage. It grounds energy, enhances stamina, and promotes justice. Particularly beneficial for those who feel overwhelmed or who need help keeping their commitments. Activates the base chakra, provides protection, and supports recovering from illness. Promotes passion and increases sexual energy in relationships.",
    bestFor:
      "Stamina, endurance, stability, justice, recovery from illness, grounding, sexual energy",
    howToWear: {
      metal: "Copper",
      finger: "Ring finger",
      day: "Tuesday",
      mantra: "Om Angarakaya Namah",
      ritual: "Bury in earth overnight, energize with fire element",
    },
    priceRange: "₹150 – ₹2,000",
    imageUrl: "/assets/images/gems/jasper.jpg",
    color: "Red, brick-red, terracotta",
    origin: "India, USA, Brazil, Russia",
  },
  {
    id: "sp-malachite",
    name: "Malachite",
    nameHindi: "मैलाकाइट",
    type: "semi-precious",
    rulingPlanet: "Venus",
    chakra: "Anahata (Heart)",
    benefits:
      "Malachite is a powerful transformation stone with deep green color representing growth and abundance. It absorbs negative energies, clears electromagnetic pollution, and guards against radiation. Excellent for business success, clearing emotional blockages, and stimulating the heart chakra. Used in ancient Egypt and medieval Europe for protection. Breaks unwanted ties, outworn patterns, and negative thinking. Amplifies positive and negative energies, so should be used with care.",
    bestFor:
      "Transformation, business success, emotional blockages, protection, heart healing, Venus problems",
    howToWear: {
      metal: "Silver",
      finger: "Ring finger",
      day: "Friday",
      mantra: "Om Shukraya Namah",
      ritual: "Never cleanse in salt water; use sound or moonlight instead",
    },
    priceRange: "₹300 – ₹5,000",
    imageUrl: "/assets/images/gems/malachite.jpg",
    color: "Bright green with dark green bands",
    origin: "Congo, Russia, Zambia, Mexico",
  },
  {
    id: "sp-turquoise",
    name: "Turquoise",
    nameHindi: "फ़िरोज़ा",
    type: "semi-precious",
    rulingPlanet: "Venus / Neptune",
    chakra: "Vishuddha (Throat) + Anahata (Heart)",
    benefits:
      "Turquoise is one of the oldest known healing stones, used by ancient Egyptians, Native Americans, and in Vedic traditions. It provides protection during travel, promotes honest communication, and brings good fortune. Excellent for public speakers, diplomats, and those in leadership. Balances and aligns all chakras, promotes wisdom, and builds courage. In Islamic tradition, it is worn for protection and good luck.",
    bestFor:
      "Travel protection, honest communication, leadership, good fortune, diplomatic relations, wisdom",
    howToWear: {
      metal: "Silver",
      finger: "Index or little finger",
      day: "Friday",
      mantra: "Om Shukraya Namah",
      ritual:
        "Cleanse with gentle water, program with truth and protection intention",
    },
    priceRange: "₹300 – ₹8,000",
    imageUrl: "/assets/images/gems/turquoise.jpg",
    color: "Sky blue to blue-green",
    origin: "Iran (Persian), USA (Arizona), China, Tibet",
  },
  {
    id: "sp-kyanite",
    name: "Blue Kyanite",
    nameHindi: "काईनाइट",
    type: "semi-precious",
    rulingPlanet: "Saturn / Jupiter",
    chakra: "Vishuddha (Throat) + Ajna",
    benefits:
      "Blue Kyanite is one of the very few crystals that never needs cleansing and never holds negative energy. It aligns all chakras automatically, promotes spiritual growth, and enhances communication. Excellent for channeling spiritual information, enhancing meditation, and developing psychic abilities. Bridges the gap between the physical and spiritual worlds. Promotes loyalty, reliability, and calm energy.",
    bestFor:
      "Chakra alignment, meditation, spiritual communication, psychic development, loyalty, calm energy",
    howToWear: {
      metal: "Silver",
      finger: "Any",
      day: "Any",
      mantra: "Om Namah Shivaya",
      ritual: "Does not need cleansing; simply set intention for use",
    },
    priceRange: "₹400 – ₹6,000",
    imageUrl: "/assets/images/gems/kyanite.jpg",
    color: "Blue with silver streaks",
    origin: "Brazil, India, USA, Kenya",
  },
  {
    id: "sp-selenite",
    name: "Selenite",
    nameHindi: "सेलेनाइट",
    type: "semi-precious",
    rulingPlanet: "Moon",
    chakra: "Sahasrara (Crown) + Ajna",
    benefits:
      "Selenite is a high-vibration crystal associated with the Moon and angelic realms. It cleanses and charges other crystals, purifies the aura, and creates a protective grid around the home. Promotes mental clarity, spiritual insight, and connection to higher dimensions. Excellent for meditation rooms and sacred spaces. Removes energy blocks, provides deep peace, and activates the crown chakra for divine connection.",
    bestFor:
      "Aura cleansing, space clearing, other crystals charging, meditation, mental clarity, divine connection",
    howToWear: {
      metal: "N/A (fragile, usually kept as wand or plate)",
      finger: "N/A",
      day: "Full moon",
      mantra: "Om Chandraya Namah",
      ritual: "Charge under full moon; never place in water as it dissolves",
    },
    priceRange: "₹200 – ₹3,000",
    imageUrl: "/assets/images/gems/selenite.jpg",
    color: "White, translucent",
    origin: "Morocco, Mexico, USA",
  },
  {
    id: "sp-aquamarine",
    name: "Aquamarine",
    nameHindi: "एक्वामरीन",
    type: "semi-precious",
    rulingPlanet: "Moon / Neptune",
    chakra: "Vishuddha (Throat)",
    benefits:
      "Aquamarine is the stone of courage and clear communication. Historically worn by sailors for protection at sea, it soothes fears and promotes calm in turbulent situations. Excellent for reducing stress, overcoming phobias, and improving communication in relationships. Activates the throat chakra for clear, compassionate expression. Provides closure in difficult situations and supports those dealing with grief.",
    bestFor:
      "Courage, clear communication, stress reduction, phobias, grief support, emotional clarity",
    howToWear: {
      metal: "Silver",
      finger: "Little finger",
      day: "Monday",
      mantra: "Om Chandraya Namah",
      ritual:
        "Cleanse in ocean water or clear spring water, program with courage intention",
    },
    priceRange: "₹500 – ₹15,000 per carat",
    imageUrl: "/assets/images/gems/aquamarine.jpg",
    color: "Pale blue to sea-green",
    origin: "Brazil, Pakistan, Nigeria, Mozambique",
  },
  {
    id: "sp-garnet",
    name: "Red Garnet",
    nameHindi: "लाल गार्नेट",
    type: "semi-precious",
    rulingPlanet: "Mars",
    chakra: "Muladhara (Root)",
    benefits:
      "Red Garnet is an energizing stone that revitalizes passion, love, and devotion. It stimulates the root and sacral chakras, boosting energy, courage, and stamina. Excellent for improving romantic relationships, overcoming depression, and restoring energy after illness. Used as a talisman for protection during travel. Removes toxins from the blood, improves circulation, and promotes overall vitality.",
    bestFor:
      "Energy restoration, romantic relationships, courage, protection during travel, depression, circulation",
    howToWear: {
      metal: "Gold or silver",
      finger: "Ring finger",
      day: "Tuesday",
      mantra: "Om Angarakaya Namah",
      ritual:
        "Energize under sunlight, program with vitality and love intention",
    },
    priceRange: "₹500 – ₹10,000 per carat",
    imageUrl: "/assets/images/gems/garnet.jpg",
    color: "Deep red, pomegranate red",
    origin: "India, Africa, USA, Brazil",
  },
  {
    id: "sp-sunstone",
    name: "Sunstone",
    nameHindi: "सनस्टोन",
    type: "semi-precious",
    rulingPlanet: "Sun",
    chakra: "Manipura (Solar Plexus) + Sahasrara",
    benefits:
      "Sunstone embodies the power of the Sun, bringing joy, vitality, and positive energy. It removes depression, restores the joy of life, and promotes optimism. Excellent for those who feel unlucky or suffering from seasonal affective disorder. Removes phobias, stress, and fear, replacing them with warmth and enthusiasm. Promotes leadership, independence, and the confidence to follow one's true path.",
    bestFor:
      "Joy and optimism, depression, Sun problems, leadership, confidence, seasonal depression, phobias",
    howToWear: {
      metal: "Gold",
      finger: "Ring or index finger",
      day: "Sunday",
      mantra: "Om Suryaya Namah",
      ritual: "Energize in direct sunlight for 4+ hours",
    },
    priceRange: "₹300 – ₹5,000",
    imageUrl: "/assets/images/gems/sunstone.jpg",
    color: "Orange, golden, pink with glittery sparkle",
    origin: "Norway, India, USA, Canada",
  },
  {
    id: "sp-iolite",
    name: "Iolite",
    nameHindi: "आयोलाइट",
    type: "semi-precious",
    rulingPlanet: "Saturn / Jupiter",
    chakra: "Ajna (Third Eye) + Crown",
    benefits:
      "Iolite is the 'Vision Stone' of spiritual growth and inner knowing. Ancient Vikings used it as a navigational tool, as it polarizes light. It activates the third eye and crown chakras, enhancing inner vision, intuition, and spiritual journeying. Excellent for those on a spiritual path, meditation practitioners, and those experiencing spiritual confusion. Removes discord, promotes responsibility, and helps one find their true spiritual direction.",
    bestFor:
      "Spiritual vision, meditation, inner knowing, spiritual direction, third eye activation, responsibility",
    howToWear: {
      metal: "Silver",
      finger: "Index or middle finger",
      day: "Thursday",
      mantra: "Om Gurave Namah",
      ritual:
        "Cleanse under starlight, program with spiritual vision intention",
    },
    priceRange: "₹400 – ₹8,000 per carat",
    imageUrl: "/assets/images/gems/iolite.jpg",
    color: "Blue-violet to indigo",
    origin: "India, Sri Lanka, Brazil, Mozambique",
  },
];

export const ALL_GEMS_CATALOG = [...NAVRATNA_GEMS, ...SEMI_PRECIOUS_GEMS];
