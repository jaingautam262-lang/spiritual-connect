export interface TempleDarshanVideo {
  id: string;
  templeName: string;
  deity: string;
  location: string;
  region: string;
  youtubeVideoId: string;
  description: string;
  isLive: boolean;
}

export const templeDarshanVideos: TempleDarshanVideo[] = [
  {
    id: "kashi-vishwanath",
    templeName: "Kashi Vishwanath",
    deity: "Lord Shiva",
    location: "Varanasi, Uttar Pradesh",
    region: "North India",
    youtubeVideoId: "ZVAn8gp2B0o",
    description:
      "Live darshan from the sacred Kashi Vishwanath Jyotirlinga — one of the twelve Jyotirlingas and the holiest Shiva temple.",
    isLive: true,
  },
  {
    id: "tirupati-balaji",
    templeName: "Tirupati Balaji",
    deity: "Lord Venkateswara",
    location: "Tirumala, Andhra Pradesh",
    region: "South India",
    youtubeVideoId: "CXEJOFWkSAM",
    description:
      "TTD live darshan from the sacred Tirumala hills — the world's most visited pilgrimage site.",
    isLive: true,
  },
  {
    id: "mahakaleshwar",
    templeName: "Mahakaleshwar",
    deity: "Lord Shiva (Mahakal)",
    location: "Ujjain, Madhya Pradesh",
    region: "Central India",
    youtubeVideoId: "e7RMSB3vt9g",
    description:
      "Watch the famous Bhasma Aarti and live darshan from Mahakaleshwar — the only south-facing Jyotirlinga.",
    isLive: true,
  },
  {
    id: "iskcon-delhi",
    templeName: "ISKCON Temple",
    deity: "Radha Parthasarathi",
    location: "New Delhi",
    region: "North India",
    youtubeVideoId: "vPiLt7hsPiw",
    description:
      "Live aarti and darshan from ISKCON Delhi — one of India's largest and most beautiful Hare Krishna temples.",
    isLive: true,
  },
  {
    id: "shirdi-sai-baba",
    templeName: "Shirdi Sai Baba Mandir",
    deity: "Sai Baba of Shirdi",
    location: "Shirdi, Maharashtra",
    region: "West India",
    youtubeVideoId: "f7-0bSvAJh8",
    description:
      "Live darshan from Shirdi — the sacred abode of Sai Baba, visited by millions of devotees each year.",
    isLive: true,
  },
  {
    id: "golden-temple",
    templeName: "Golden Temple",
    deity: "Sri Harmandir Sahib",
    location: "Amritsar, Punjab",
    region: "North India",
    youtubeVideoId: "zGqRxP1aTwY",
    description:
      "SGPC live darshan from the Golden Temple — the holiest Gurdwara and spiritual center of Sikhism.",
    isLive: true,
  },
  // ─── 24 Additional Temples ──────────────────────────────────────────────────
  {
    id: "vaishno-devi",
    templeName: "Vaishno Devi",
    deity: "Mata Vaishno Devi",
    location: "Katra, Jammu",
    region: "North India",
    youtubeVideoId: "F8qnMAnKQ7o",
    description:
      "Sacred darshan of Mata Vaishno Devi in the Trikuta mountains — one of the most revered Shakti peethas.",
    isLive: false,
  },
  {
    id: "kedarnath",
    templeName: "Kedarnath",
    deity: "Lord Shiva",
    location: "Kedarnath, Uttarakhand",
    region: "North India",
    youtubeVideoId: "VsIK-0FWS6I",
    description:
      "High-altitude Jyotirlinga darshan in the Himalayas — one of the Char Dham pilgrimage sites.",
    isLive: false,
  },
  {
    id: "badrinath",
    templeName: "Badrinath",
    deity: "Lord Vishnu",
    location: "Badrinath, Uttarakhand",
    region: "North India",
    youtubeVideoId: "rVVSHcKLGXo",
    description:
      "Sacred abode of Lord Vishnu nestled in the Himalayas — a key Char Dham destination.",
    isLive: false,
  },
  {
    id: "somnath",
    templeName: "Somnath Mandir",
    deity: "Lord Shiva (Jyotirlinga)",
    location: "Somnath, Gujarat",
    region: "West India",
    youtubeVideoId: "9M4zzHNiDAY",
    description:
      "First among the twelve Jyotirlingas — the eternal Somnath on the shores of the Arabian Sea.",
    isLive: false,
  },
  {
    id: "dwarka",
    templeName: "Dwarkadheesh Temple",
    deity: "Lord Krishna",
    location: "Dwarka, Gujarat",
    region: "West India",
    youtubeVideoId: "7m9Y9RhqCBY",
    description:
      "Ancient kingdom of Lord Krishna — one of the four Char Dham pilgrimage sites in India.",
    isLive: false,
  },
  {
    id: "jagannath-puri",
    templeName: "Jagannath Puri",
    deity: "Lord Jagannath",
    location: "Puri, Odisha",
    region: "East India",
    youtubeVideoId: "CqOlIW5KJTE",
    description:
      "Sacred abode of Lord Jagannath — one of the four Char Dhams, famous for the grand Rath Yatra.",
    isLive: false,
  },
  {
    id: "rameshwaram",
    templeName: "Rameshwaram Temple",
    deity: "Lord Shiva (Jyotirlinga)",
    location: "Rameswaram, Tamil Nadu",
    region: "South India",
    youtubeVideoId: "TZMdP0O8cFw",
    description:
      "Southernmost Char Dham — the Ramanathaswamy Jyotirlinga where Lord Rama worshipped Shiva.",
    isLive: false,
  },
  {
    id: "meenakshi-amman",
    templeName: "Meenakshi Amman",
    deity: "Goddess Meenakshi",
    location: "Madurai, Tamil Nadu",
    region: "South India",
    youtubeVideoId: "pf6Lr4f3Ri4",
    description:
      "Magnificent Dravidian temple of Goddess Meenakshi — a UNESCO World Heritage candidate.",
    isLive: false,
  },
  {
    id: "siddhivinayak-mumbai",
    templeName: "Siddhivinayak Mumbai",
    deity: "Lord Ganesha",
    location: "Mumbai, Maharashtra",
    region: "West India",
    youtubeVideoId: "ZtWwvzRHBL4",
    description:
      "Most visited Ganesha temple in Mumbai — the wish-fulfilling Siddhivinayak blesses millions.",
    isLive: false,
  },
  {
    id: "akshardham-delhi",
    templeName: "Akshardham Delhi",
    deity: "Swaminarayan",
    location: "New Delhi",
    region: "North India",
    youtubeVideoId: "HpB4m0XkrZA",
    description:
      "World's largest Hindu temple complex — a breathtaking monument of devotion and artistry.",
    isLive: false,
  },
  {
    id: "trimbakeshwar",
    templeName: "Trimbakeshwar",
    deity: "Lord Shiva (Jyotirlinga)",
    location: "Nashik, Maharashtra",
    region: "West India",
    youtubeVideoId: "1uM2Ynm7OuM",
    description:
      "One of the twelve Jyotirlingas at the source of the sacred Godavari river near Nashik.",
    isLive: false,
  },
  {
    id: "omkareshwar",
    templeName: "Omkareshwar",
    deity: "Lord Shiva (Jyotirlinga)",
    location: "Khandwa, Madhya Pradesh",
    region: "Central India",
    youtubeVideoId: "nMH6NLxe_a4",
    description:
      "Jyotirlinga on an island shaped like OM in the Narmada river — a deeply sacred site.",
    isLive: false,
  },
  {
    id: "bhimashankar",
    templeName: "Bhimashankar",
    deity: "Lord Shiva (Jyotirlinga)",
    location: "Pune, Maharashtra",
    region: "West India",
    youtubeVideoId: "LDxKn_7OPK4",
    description:
      "Jyotirlinga shrine in the Sahyadri hills — source of the Bhima river and a lush sanctuary.",
    isLive: false,
  },
  {
    id: "grishneshwar",
    templeName: "Grishneshwar",
    deity: "Lord Shiva (Jyotirlinga)",
    location: "Aurangabad, Maharashtra",
    region: "West India",
    youtubeVideoId: "8v01s0gCLbY",
    description:
      "The twelfth and last Jyotirlinga near the Ellora Caves — also called Ghushme-shwar.",
    isLive: false,
  },
  {
    id: "sabarimala",
    templeName: "Sabarimala",
    deity: "Lord Ayyappa",
    location: "Sabarimala, Kerala",
    region: "South India",
    youtubeVideoId: "eFVmjUX9H_g",
    description:
      "Hilltop shrine of Lord Ayyappa in the Western Ghats — one of the largest annual pilgrimages in the world.",
    isLive: false,
  },
  {
    id: "guruvayur",
    templeName: "Guruvayur Temple",
    deity: "Lord Krishna",
    location: "Guruvayur, Kerala",
    region: "South India",
    youtubeVideoId: "xFQSExT7EL4",
    description:
      "The Dwaraka of South India — a divine Krishna temple renowned for its strict rituals and sacred elephants.",
    isLive: false,
  },
  {
    id: "padmanabhaswamy",
    templeName: "Padmanabhaswamy Temple",
    deity: "Lord Vishnu",
    location: "Thiruvananthapuram, Kerala",
    region: "South India",
    youtubeVideoId: "MiH8LtyRiWg",
    description:
      "Ancient temple of reclining Vishnu — one of 108 Divya Desams and among India's wealthiest temples.",
    isLive: false,
  },
  {
    id: "palani-murugan",
    templeName: "Palani Murugan",
    deity: "Lord Murugan",
    location: "Palani, Tamil Nadu",
    region: "South India",
    youtubeVideoId: "2Mk3Yjvq3WI",
    description:
      "Hilltop abode of Lord Murugan (Dhandayuthapani) — one of the six abodes of Murugan in Tamil Nadu.",
    isLive: false,
  },
  {
    id: "chamundeshwari",
    templeName: "Chamundeshwari Temple",
    deity: "Goddess Chamundeshwari",
    location: "Mysore, Karnataka",
    region: "South India",
    youtubeVideoId: "RLLRvt0YMXQ",
    description:
      "Atop Chamundi Hills overlooking Mysore city — the presiding deity of the Wadiyar royal family.",
    isLive: false,
  },
  {
    id: "kollur-mookambika",
    templeName: "Kollur Mookambika",
    deity: "Goddess Mookambika",
    location: "Kollur, Karnataka",
    region: "South India",
    youtubeVideoId: "GxbHk2rJKbE",
    description:
      "Sacred shakti shrine of Goddess Mookambika — a major pilgrimage site in coastal Karnataka.",
    isLive: false,
  },
  {
    id: "varadaraja-perumal",
    templeName: "Varadaraja Perumal",
    deity: "Lord Vishnu",
    location: "Kanchipuram, Tamil Nadu",
    region: "South India",
    youtubeVideoId: "D8fH2P_eRHk",
    description:
      "One of the 108 Divya Desams in Kanchipuram — the city of thousand temples, Lord Vishnu's sacred abode.",
    isLive: false,
  },
  {
    id: "tiruvannamalai-annamalai",
    templeName: "Annamalai Temple",
    deity: "Lord Shiva",
    location: "Tiruvannamalai, Tamil Nadu",
    region: "South India",
    youtubeVideoId: "Y_XxvmfZ89w",
    description:
      "The fire element Shiva linga at the base of Arunachala hill — site of the famous Karthigai Deepam festival.",
    isLive: false,
  },
  {
    id: "nataraja-chidambaram",
    templeName: "Nataraja Chidambaram",
    deity: "Lord Nataraja (Shiva)",
    location: "Chidambaram, Tamil Nadu",
    region: "South India",
    youtubeVideoId: "hQMvs8gJbrQ",
    description:
      "The cosmic dance of Shiva as Nataraja — the ether element shrine, one of Pancha Bhuta Stalas.",
    isLive: false,
  },
  {
    id: "vrindavan-iskcon",
    templeName: "ISKCON Vrindavan",
    deity: "Lord Krishna",
    location: "Vrindavan, Uttar Pradesh",
    region: "North India",
    youtubeVideoId: "GqW09K_JrOg",
    description:
      "Krishna Balaram Mandir in the land of Lord Krishna's divine pastimes — a global Vaishnava pilgrimage center.",
    isLive: false,
  },
];
