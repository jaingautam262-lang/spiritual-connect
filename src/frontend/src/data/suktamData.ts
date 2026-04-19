export interface SuktamEntry {
  id: string;
  name: string;
  nameHindi: string;
  deity: string;
  deityHindi: string;
  vedaSource: string;
  shortDescription: string;
  benefits: string;
  transliteration: string;
  totalMantras: number;
}

export const suktamData: SuktamEntry[] = [
  {
    id: "agni-suktam",
    name: "Agni Suktam",
    nameHindi: "अग्नि सूक्तं",
    deity: "Agni",
    deityHindi: "अग्नि",
    vedaSource: "Rigveda",
    shortDescription:
      "The opening hymn of the Rigveda, addressed to Agni, the divine fire. It invokes Agni as the eternal priest, messenger between humans and gods.",
    benefits:
      "Purifies the home and environment. Bestows clarity of mind, removes negativity, and invokes divine protection. Recitation at dawn or dusk is especially auspicious.",
    transliteration:
      "Agnim īḷe purohitaṃ yajñasya devam ṛtvijam | hotāraṃ ratnadhātamam ||",
    totalMantras: 9,
  },
  {
    id: "aano-bhadra-suktam",
    name: "Aano Bhadra Suktam",
    nameHindi: "आनो भद्रः सूक्तं",
    deity: "Vishwadeva",
    deityHindi: "विश्वदेव",
    vedaSource: "Rigveda",
    shortDescription:
      "A universal prayer for noble thoughts from all directions, expressing the Vedic ideal of openness to wisdom. This suktam is among the most oft-quoted Vedic verses.",
    benefits:
      "Opens the mind to right thinking and higher wisdom. Removes prejudice, blesses with discernment, and is ideal for students and seekers.",
    transliteration:
      "Ā no bhadrāḥ kratavo yantu viśvataḥ | adabdhāso aparītāsa udbhidaḥ ||",
    totalMantras: 12,
  },
  {
    id: "indra-suktam",
    name: "Indra Suktam",
    nameHindi: "इंद्रा सूक्त",
    deity: "Indra",
    deityHindi: "इन्द्र",
    vedaSource: "Rigveda",
    shortDescription:
      "Hymns in praise of Indra, the king of gods and lord of rain and thunder. Glorifies his heroic deeds and cosmic sovereignty.",
    benefits:
      "Grants courage, leadership, and victory over enemies. Brings timely rains, abundance, and protection from calamities.",
    transliteration:
      "Indraṃ viśvā avīvṛdhan samudravyacasaṃ giraḥ | rāṭhaṃ rādhasi codaya ||",
    totalMantras: 22,
  },
  {
    id: "uttarnarayan-anuvak",
    name: "Uttarnarayan Anuvak",
    nameHindi: "उत्तर्नारायण अनुवाक",
    deity: "Narayana",
    deityHindi: "नारायण",
    vedaSource: "Yajurveda",
    shortDescription:
      "A continuation of the Narayana Suktam found in the Taittiriya Aranyaka, describing the supreme nature of Narayana as the ultimate reality.",
    benefits:
      "Bestows liberation, spiritual insight, and devotion to Vishnu. Regular recitation leads to freedom from the cycle of rebirth.",
    transliteration:
      "Sahasraśīrṣā puruṣaḥ sahasrākṣaḥ sahasrapāt | sa bhūmiṃ viśvato vṛtvātyatiṣṭhad daśāṅgulam ||",
    totalMantras: 16,
  },
  {
    id: "parjanya-suktam",
    name: "Parjanya Suktam",
    nameHindi: "पर्जन्य सूक्तं",
    deity: "Parjanya",
    deityHindi: "पर्जन्य",
    vedaSource: "Rigveda",
    shortDescription:
      "Dedicated to Parjanya, the rain deity, these hymns invoke the life-giving powers of clouds and rain for agricultural prosperity.",
    benefits:
      "Invokes timely rainfall, good harvest, and removal of drought conditions. Promotes fertility of the earth and abundance of crops.",
    transliteration:
      "Mahāntyasya mahimānaṃ pravo citr asya vṛṣṭayaḥ | parjanyaṃ devam arcata ||",
    totalMantras: 15,
  },
  {
    id: "kumar-suktam",
    name: "Kumar Suktam",
    nameHindi: "कुमार सूक्तं",
    deity: "Kumara / Skanda",
    deityHindi: "कुमार / स्कन्द",
    vedaSource: "Atharvaveda",
    shortDescription:
      "Hymns glorifying Kumara (Skanda/Karttikeya), the divine youth and commander of celestial armies, known for his valor and wisdom.",
    benefits:
      "Blesses children with health, intelligence, and bravery. Protects young ones from illness and evil influences.",
    transliteration:
      "Kumāraṃ mātuḥ pitror bhāgadheyaṃ | viśvāsāṃ janmanā yaśasvantam ||",
    totalMantras: 11,
  },
  {
    id: "pavaman-suktam",
    name: "Pavamana Suktam",
    nameHindi: "पवमान सूक्तं",
    deity: "Soma",
    deityHindi: "सोम",
    vedaSource: "Rigveda",
    shortDescription:
      "Hymns dedicated to purified Soma, the sacred ritual drink. These mantras celebrate Soma flowing through the filter, symbolizing the purification of the soul.",
    benefits:
      "Purifies the mind and body. Brings spiritual clarity, soma energy, and blessings of vitality and bliss.",
    transliteration:
      "Pavamāna ā bhara rayiṃ soma dvibarhasa | asmabhyaṃ viśvacarsaṇe ||",
    totalMantras: 24,
  },
  {
    id: "gau-suktam",
    name: "Gau Suktam",
    nameHindi: "गौ सूक्तं",
    deity: "Cow / Kamadhenu",
    deityHindi: "गाय / कामधेनु",
    vedaSource: "Atharvaveda",
    shortDescription:
      "A sacred hymn in reverence to the cow (Go Mata), considered the embodiment of all divine blessings in Vedic tradition.",
    benefits:
      "Bestows material abundance, cow protection merit, and invokes Kamadhenu's blessings for wish-fulfillment.",
    transliteration: "Gāvo mama mataraḥ | tāsāṃ mama pitaraḥ pitāmahāḥ ||",
    totalMantras: 8,
  },
  {
    id: "pitr-suktam",
    name: "Pitr Suktam",
    nameHindi: "पितृ सूक्तं",
    deity: "Pitrs / Ancestors",
    deityHindi: "पितर",
    vedaSource: "Rigveda",
    shortDescription:
      "Hymns dedicated to the ancestors (Pitrs), invoking their blessings and ensuring their peaceful abode in the spirit realm.",
    benefits:
      "Provides peace to departed ancestors, reduces ancestral karmic debts, and brings family harmony. Ideal for Pitru Paksha.",
    transliteration: "Ime pitaro ye gamanīyāḥ | teṣāṃ priyaṃ pitryeṣu dhehi ||",
    totalMantras: 14,
  },
  {
    id: "gosht-suktam",
    name: "Gosht Suktam",
    nameHindi: "गोष्ट सूक्तं",
    deity: "Indra / Cattle Deities",
    deityHindi: "इन्द्र",
    vedaSource: "Atharvaveda",
    shortDescription:
      "A hymn for the protection and prosperity of cattle and the cowshed, invoking divine blessings for livestock.",
    benefits:
      "Protects cattle from disease and misfortune. Promotes prosperity for farmers and those who depend on livestock.",
    transliteration: "Ye goṣṭhāsa uta dhenuṣaḥ | indra rakṣa su dakshinā ||",
    totalMantras: 7,
  },
  {
    id: "tantrokt-devi-suktam",
    name: "Tantrokt Devi Suktam",
    nameHindi: "तंत्रोक्त्देवी सूक्तं",
    deity: "Devi / Durga",
    deityHindi: "देवी / दुर्गा",
    vedaSource: "Rigveda",
    shortDescription:
      "The Tantric version of Devi's hymn from the Devi Mahatmya, glorifying the Goddess as the supreme power behind all creation.",
    benefits:
      "Invokes the Goddess's fierce protective energy. Removes fear, black magic, and negative forces. Empowers the devotee with Shakti.",
    transliteration:
      "Yā devī sarvabhūteṣu śaktirūpeṇa saṃsthitā | namastasyai namastasyai namastasyai namo namaḥ ||",
    totalMantras: 18,
  },
  {
    id: "bagalamukhi-suktam",
    name: "Bagalamukhi Suktam",
    nameHindi: "बगलामुखी सूक्तं",
    deity: "Bagalamukhi",
    deityHindi: "बगलामुखी",
    vedaSource: "Atharvaveda",
    shortDescription:
      "Hymns in praise of Bagalamukhi Devi, the paralyzing Goddess who stuns enemies and halts negative forces.",
    benefits:
      "Paralyzes enemies and adversaries. Ensures victory in legal battles, court cases, and competitions. Provides protection from evil speech.",
    transliteration:
      "Bagalāmukhi devī śatrūn stambhayati | jagatpālinī namaḥ ||",
    totalMantras: 9,
  },
  {
    id: "devi-suktam",
    name: "Devi Suktam",
    nameHindi: "देवी सूक्तम्",
    deity: "Vak Devi / Ambika",
    deityHindi: "वाक् देवी",
    vedaSource: "Rigveda",
    shortDescription:
      "One of the most profound Vedic hymns where the Goddess herself speaks, declaring her omnipresence as the cosmic force (Vak — Divine Speech).",
    benefits:
      "Awakens divine awareness and self-realization. Bestows eloquence, wisdom, and identification with cosmic consciousness.",
    transliteration:
      "Ahaṃ rudrebhir vasubhiś carāmy aham ādityair uta viśvadevaiḥ ||",
    totalMantras: 8,
  },
  {
    id: "brahmanaspati-suktam",
    name: "Brahmanaspati Suktam",
    nameHindi: "ब्रह्मनास्पति सूक्तं",
    deity: "Brihaspati",
    deityHindi: "बृहस्पति",
    vedaSource: "Rigveda",
    shortDescription:
      "Hymns to Brahmanaspati (Brihaspati), the divine teacher and lord of prayer, who grants wisdom, eloquence, and spiritual power.",
    benefits:
      "Enhances intellectual abilities, academic success, and communication skills. Invokes the guru's grace for students and scholars.",
    transliteration:
      "Brahmaṇaspate tvamiha śreṣṭha uta śravasyasi | yac chamsi tad id astu naḥ ||",
    totalMantras: 16,
  },
  {
    id: "dhruv-suktam",
    name: "Dhruv Suktam",
    nameHindi: "ध्रुव सूक्तम्",
    deity: "Dhruva (Pole Star)",
    deityHindi: "ध्रुव",
    vedaSource: "Atharvaveda",
    shortDescription:
      "A hymn to Dhruva, the pole star, symbolizing steadfastness, devotion, and unwavering commitment to dharma.",
    benefits:
      "Grants stability, steadfastness, and unwavering faith. Ideal for those seeking consistency and determination in their lives.",
    transliteration:
      "Dhruvaṃ madhye sthitaṃ viśvaṃ | acalaṃ nityaṃ dhruvaṃ namaḥ ||",
    totalMantras: 10,
  },
  {
    id: "bhagya-suktam",
    name: "Bhagya Suktam",
    nameHindi: "भाग्य सूक्तं",
    deity: "Bhaga / Fortune",
    deityHindi: "भग",
    vedaSource: "Rigveda",
    shortDescription:
      "Hymns to Bhaga, the deity of fortune and good luck, invoking prosperity, wealth, and marital happiness.",
    benefits:
      "Brings good fortune, wealth, and prosperity. Especially recited during marriages and new ventures for lasting success.",
    transliteration:
      "Bhaga eva bhagatvena jñāyatāṃ | sa naḥ pūṣā viddhi iha ||",
    totalMantras: 11,
  },
  {
    id: "bhu-suktam",
    name: "Bhu Suktam",
    nameHindi: "भू सूक्तं",
    deity: "Bhudevi / Earth",
    deityHindi: "भूदेवी",
    vedaSource: "Yajurveda",
    shortDescription:
      "A hymn to Bhudevi, the Earth Goddess, acknowledging her as the mother and sustainer of all life.",
    benefits:
      "Strengthens the bond with Mother Earth. Promotes environmental harmony, stable foundations, and material security.",
    transliteration:
      "Bhūr bhuvaḥ svaḥ | oṃ tatsaviturvareṇyam bhargo devasya dhīmahi ||",
    totalMantras: 6,
  },
  {
    id: "bhumi-suktam",
    name: "Bhumi Suktam",
    nameHindi: "भूमि सूक्तं",
    deity: "Prithvi / Earth",
    deityHindi: "पृथ्वी",
    vedaSource: "Atharvaveda",
    shortDescription:
      "The famous Prithvi Sukta from the Atharvaveda — one of the earliest ecological hymns, celebrating the Earth as mother of all beings.",
    benefits:
      "Promotes ecological balance, agricultural success, and harmony with nature. Recited during land-related rituals and Bhumi Puja.",
    transliteration:
      "Mātā bhūmiḥ putro'haṃ pṛthivyāḥ | parjanyaḥ pitā sa u naḥ pipṛtu ||",
    totalMantras: 63,
  },
  {
    id: "manyu-suktam",
    name: "Manyu Suktam",
    nameHindi: "मन्यु सूक्तं",
    deity: "Manyu / Divine Wrath",
    deityHindi: "मन्यु",
    vedaSource: "Rigveda",
    shortDescription:
      "Hymns to Manyu, the deity of righteous wrath and valor, invoked for victory, strength, and heroic power.",
    benefits:
      "Grants courage, fighting spirit, and protection in battle. Recited to overcome fear, defeat enemies, and gain inner strength.",
    transliteration:
      "Yo no manyurjagṛbhe yo viveda | sa na indra abhirakṣa śatrubhyaḥ ||",
    totalMantras: 8,
  },
  {
    id: "mritasanjivan-suktam",
    name: "Mritasanjivan Suktam",
    nameHindi: "मृतसंजीवन सूक्तं",
    deity: "Ashvins",
    deityHindi: "अश्विन",
    vedaSource: "Rigveda",
    shortDescription:
      "A powerful healing hymn associated with the Ashvins, the divine physicians of the gods, related to the legendary Mritasanjivani.",
    benefits:
      "Bestows healing energy, recovery from serious illness, and rejuvenation. Recited for those suffering from critical health conditions.",
    transliteration:
      "Aśvinā yajvarīr iṣo dravatpāṇī śubhas patī | purubhujā candrasriyo ||",
    totalMantras: 13,
  },
  {
    id: "medha-suktam",
    name: "Medha Suktam",
    nameHindi: "मेधा सूक्तं",
    deity: "Medha / Intelligence",
    deityHindi: "मेधा",
    vedaSource: "Yajurveda",
    shortDescription:
      "A hymn invoking Medha Devi, the goddess of intellect and memory, for sharp memory, learning ability, and spiritual wisdom.",
    benefits:
      "Sharpens memory and intelligence. Ideal for students and scholars. Recitation before studies enhances retention and comprehension.",
    transliteration:
      "Medhāṃ ma indrā varuṇā mehā devy abhyā suvā | medhāṃ tvā adhi devī medhaśālā mārjayatu ||",
    totalMantras: 7,
  },
  {
    id: "ratri-suktam",
    name: "Ratri Suktam",
    nameHindi: "रात्रि सूक्तम्",
    deity: "Ratri Devi",
    deityHindi: "रात्रि देवी",
    vedaSource: "Rigveda",
    shortDescription:
      "A beautiful hymn to Ratri, the Goddess of Night, who envelops the world in darkness to give rest and renewed life.",
    benefits:
      "Provides protection during night. Helps overcome insomnia and nightmares. Invokes peaceful sleep and divine protection after dark.",
    transliteration:
      "Rātri vy akhyadāyatī purutrā devyakṣabhiḥ | viśvā adhiśriyo adhita ||",
    totalMantras: 8,
  },
  {
    id: "rudra-suktam",
    name: "Rudra Suktam",
    nameHindi: "रूद्र सूक्तं",
    deity: "Rudra / Shiva",
    deityHindi: "रुद्र / शिव",
    vedaSource: "Rigveda",
    shortDescription:
      "Hymns to Rudra, the fierce form of Shiva, seeking his benevolence and protection. Forms the basis of the later Shri Rudram.",
    benefits:
      "Removes obstacles, disease, and misfortune. Invokes Shiva's healing and protective aspects. Dispels fear and grants boons.",
    transliteration:
      "Kadrū neveha no 'sto yo rudrāya dhanvate | trambakāya vahāmahe ||",
    totalMantras: 11,
  },
  {
    id: "rognivaran-suktam",
    name: "Rognivaran Suktam",
    nameHindi: "रोगनिवारण सूक्तं",
    deity: "Ashvins / Rudra",
    deityHindi: "अश्विन / रुद्र",
    vedaSource: "Atharvaveda",
    shortDescription:
      "A therapeutic hymn from the Atharvaveda specifically composed for the removal of diseases and restoration of health.",
    benefits:
      "Powerful remedy for all types of physical ailments. Used in Vedic healing traditions alongside Ayurvedic treatments.",
    transliteration: "Āsau mā yo yakṣmaḥ | agnir ripuḥ sa naśyati pāpma ||",
    totalMantras: 12,
  },
  {
    id: "lakshmi-suktam",
    name: "Lakshmi Suktam",
    nameHindi: "लक्ष्मी सूक्तम्",
    deity: "Lakshmi",
    deityHindi: "लक्ष्मी",
    vedaSource: "Yajurveda",
    shortDescription:
      "A hymn glorifying Shri Lakshmi from the Taittiriya Samhita, inviting the Goddess of wealth and auspiciousness into one's home.",
    benefits:
      "Attracts wealth, prosperity, and abundance. Removes poverty and financial obstacles. Recited on Fridays and during Diwali.",
    transliteration:
      "Hiraṇyavarṇāṃ hariṇīṃ suvarṇarajatasrajām | candrāṃ hiraṇmayīṃ lakṣmīṃ jātavedo ma āvaha ||",
    totalMantras: 16,
  },
  {
    id: "vak-suktam",
    name: "Vak Suktam",
    nameHindi: "वक् सूक्तं",
    deity: "Vak Devi / Saraswati",
    deityHindi: "वाक् देवी / सरस्वती",
    vedaSource: "Rigveda",
    shortDescription:
      "The hymn of divine speech, where Vak (the Goddess of speech) reveals herself as the cosmic power underlying all language and knowledge.",
    benefits:
      "Enhances eloquence, communication, and teaching ability. Invokes Saraswati's grace for mastery of language, writing, and arts.",
    transliteration:
      "Ahaṃ rāṣṭrī saṃgamanī vasūnāṃ cikituṣī prathama yajñiyānām ||",
    totalMantras: 8,
  },
  {
    id: "varun-suktam",
    name: "Varun Suktam",
    nameHindi: "वरुण सूक्तं",
    deity: "Varuna",
    deityHindi: "वरुण",
    vedaSource: "Rigveda",
    shortDescription:
      "Hymns to Varuna, the cosmic lord of moral order (Rita), seeking forgiveness for sins and restoration of cosmic harmony.",
    benefits:
      "Cleanses sins and karmic debts. Restores moral order, brings peace of conscience, and seeks divine forgiveness.",
    transliteration:
      "Kva tyāni dādhiṣe mahi varūtha yāni marthyāḥ | adha smaṃ śiśnathad vṛṣā ||",
    totalMantras: 22,
  },
  {
    id: "vishnu-suktam",
    name: "Vishnu Suktam",
    nameHindi: "विष्णु सूक्तं",
    deity: "Vishnu",
    deityHindi: "विष्णु",
    vedaSource: "Rigveda",
    shortDescription:
      "Hymns celebrating Vishnu's cosmic strides (Trivikrama), his all-pervading nature, and his supreme abode (Paramam Padam).",
    benefits:
      "Invokes Vishnu's all-pervading protection. Bestows spiritual liberation, cosmic consciousness, and preservation of dharma.",
    transliteration:
      "Viṣṇor nu kaṃ vīryāṇi pra vocam | yaḥ pārthivāni vimame rajāṃsi ||",
    totalMantras: 6,
  },
  {
    id: "shri-suktam",
    name: "Shri Suktam",
    nameHindi: "श्री सूक्तम्",
    deity: "Shri Lakshmi",
    deityHindi: "श्री लक्ष्मी",
    vedaSource: "Rigveda",
    shortDescription:
      "One of the most beloved Vedic hymns, appended to the Rigveda, dedicated to Shri — the goddess of beauty, prosperity, and auspiciousness.",
    benefits:
      "Brings wealth, beauty, harmony, and divine grace. Recited to attract Lakshmi into the home and to remove poverty permanently.",
    transliteration:
      "Hiraṇyavarṇāṃ hariṇīṃ suvarṇarajatasrajām | candrāṃ hiraṇmayīṃ lakṣmīṃ jātavedo ma āvaha ||",
    totalMantras: 29,
  },
  {
    id: "samvad-suktam",
    name: "Samvad Suktam",
    nameHindi: "संवाद सूक्तं",
    deity: "Multiple Deities",
    deityHindi: "विविध देव",
    vedaSource: "Rigveda",
    shortDescription:
      "Dialogue hymns in the Rigveda that present philosophical and spiritual truths through conversation between divine figures.",
    benefits:
      "Promotes clarity in communication, resolves misunderstandings, and bestows wisdom in relationships and debates.",
    transliteration:
      "Indra uvāca ya ātmā pravadaty ojas | saḥ tvaṃ bho devā sadā rakṣa ||",
    totalMantras: 18,
  },
  {
    id: "sanyas-suktam",
    name: "Sanyas Suktam",
    nameHindi: "सन्यास सूक्तं",
    deity: "Brahman / Atman",
    deityHindi: "ब्रह्म / आत्मा",
    vedaSource: "Atharvaveda",
    shortDescription:
      "A hymn related to renunciation (Sanyas), guiding the spiritual seeker toward liberation through detachment and self-knowledge.",
    benefits:
      "Supports spiritual renunciation and detachment. Ideal for those on the path of Jnana (knowledge) or contemplating monastic life.",
    transliteration:
      "Yasminn adyā ṛcaḥ sāma | yajuś ca ye prati tiṣṭhanti sarvataḥ ||",
    totalMantras: 9,
  },
  {
    id: "saraswati-suktam",
    name: "Saraswati Suktam",
    nameHindi: "सरस्वती सूक्तं",
    deity: "Saraswati",
    deityHindi: "सरस्वती",
    vedaSource: "Rigveda",
    shortDescription:
      "Hymns praising Saraswati as the divine river of knowledge, creativity, and the flow of wisdom that purifies and illuminates.",
    benefits:
      "Blesses with intelligence, creativity, artistic skill, and scholarly excellence. Recited at the start of education.",
    transliteration:
      "Pāvakā naḥ sarasvatī vājebhir vājinīvatī | yajñaṃ vaṣṭu dhiyāvasuh ||",
    totalMantras: 10,
  },
  {
    id: "sarp-suktam-vedokt",
    name: "Sarp Suktam (Vedokt)",
    nameHindi: "सर्प सुक्तम् (वेदोक्त)",
    deity: "Sarpa / Naga",
    deityHindi: "सर्प / नाग",
    vedaSource: "Atharvaveda",
    shortDescription:
      "A Vedic hymn for protection from serpents, found in the Atharvaveda, invoking the serpent deities for safeguarding against snakebite.",
    benefits:
      "Protection from snakebite and serpent-related fears. Invokes Naga deities for removal of Sarpa Dosha.",
    transliteration:
      "Ye 'ntarikṣe ye divi | ye diśo viṣaye sarpāḥ | teṣāṃ namaḥ ||",
    totalMantras: 14,
  },
  {
    id: "surya-suktam",
    name: "Surya Suktam",
    nameHindi: "सूर्य सूक्तं",
    deity: "Surya",
    deityHindi: "सूर्य",
    vedaSource: "Rigveda",
    shortDescription:
      "Hymns to Surya, the Sun God, celebrating his life-giving light, his daily journey across the sky, and his role as cosmic illuminator.",
    benefits:
      "Dispels darkness and ignorance. Improves health, eyesight, and vitality. Recitation at sunrise is especially powerful.",
    transliteration:
      "Ud u tyaṃ jātavedasaṃ devaṃ vahanti ketavaḥ | driśe viśvāya sūryam ||",
    totalMantras: 20,
  },
  {
    id: "swasti-suktam",
    name: "Swasti Suktam",
    nameHindi: "स्वस्ति सूक्तं",
    deity: "Vishwadeva",
    deityHindi: "विश्वदेव",
    vedaSource: "Rigveda",
    shortDescription:
      "An auspicious hymn recited at the start of all sacred ceremonies, invoking well-being (Swasti) from all quarters and from all gods.",
    benefits:
      "Invokes universal peace and auspiciousness. Removes obstacles and brings divine blessings at the start of any new endeavor.",
    transliteration:
      "Svasti na indro vṛddhaśravāḥ | svasti naḥ pūṣā viśvavedāḥ | svasti nas tārkṣyo ariṣṭanemiḥ | svasti no bṛhaspatir dadhātu ||",
    totalMantras: 6,
  },
  {
    id: "hanuman-suktam",
    name: "Hanuman Suktam",
    nameHindi: "हनुमान सूक्तं",
    deity: "Hanuman",
    deityHindi: "हनुमान",
    vedaSource: "Atharvaveda",
    shortDescription:
      "A Vedic hymn glorifying Hanuman's divine powers, his devotion to Rama, and his role as the destroyer of evil forces.",
    benefits:
      "Grants strength, courage, and devotion. Removes obstacles, evil spirits, and instills fearlessness. Ideal before challenging tasks.",
    transliteration:
      "Añjanā-putram vīraṃ hanumantaṃ ramāntikam | sītā-śoka-vināśārtham namāmi pavana-ātmajaṃ ||",
    totalMantras: 10,
  },
  {
    id: "hiranyagarbha-suktam",
    name: "Hiranyagarbha Suktam",
    nameHindi: "हिरण्यगर्भा सूक्तं",
    deity: "Hiranyagarbha / Brahma",
    deityHindi: "हिरण्यगर्भ / ब्रह्मा",
    vedaSource: "Rigveda",
    shortDescription:
      "One of the profoundest Vedic creation hymns, describing Hiranyagarbha — the Golden Womb — as the source of cosmic creation.",
    benefits:
      "Invokes cosmic creative power and Brahma's blessings. Supports spiritual seekers in understanding the nature of creation and consciousness.",
    transliteration:
      "Hiraṇyagarbhaḥ samavartatāgre | bhūtasya jātaḥ patireka āsīt ||",
    totalMantras: 10,
  },
  {
    id: "narayan-suktam",
    name: "Narayana Suktam",
    nameHindi: "नारायण सूक्तं",
    deity: "Narayana / Vishnu",
    deityHindi: "नारायण / विष्णु",
    vedaSource: "Yajurveda",
    shortDescription:
      "From the Taittiriya Aranyaka, this suktam establishes Narayana as the supreme cosmic being who pervades all of creation.",
    benefits:
      "Grants moksha, divine grace, and liberation from the cycle of rebirth. Recited in Vishnu temples and by Vaishnavas daily.",
    transliteration:
      "Sahasraśīrṣā puruṣaḥ | sahasrākṣaḥ sahasrapāt | sa bhūmiṃ viśvato vṛtvā | atyatiṣṭhad daśāṅgulam ||",
    totalMantras: 13,
  },
  {
    id: "nasdiya-suktam",
    name: "Nasadiya Suktam",
    nameHindi: "नास्दीय सूक्तं",
    deity: "Brahman / Unknown",
    deityHindi: "ब्रह्म",
    vedaSource: "Rigveda",
    shortDescription:
      "The famous 'Hymn of Creation' — a philosophical inquiry into the origin of existence, questioning what was before creation began.",
    benefits:
      "Opens the intellect to the deepest philosophical questions. Recited for philosophical clarity, cosmic awareness, and transcendental wisdom.",
    transliteration:
      "Nāsad āsīn no sad āsīt tadānīm | nāsīd rajo no vyomā paro yat ||",
    totalMantras: 7,
  },
  {
    id: "neel-suktam",
    name: "Neel Suktam",
    nameHindi: "नील सूक्तं",
    deity: "Devi Nila / Durga",
    deityHindi: "नील देवी",
    vedaSource: "Yajurveda",
    shortDescription:
      "Dedicated to Nila Devi, the blue-complexioned Goddess aspect, found in the Krishna Yajurveda tradition.",
    benefits:
      "Invokes protective energy and removal of obstacles. Bestows peace, clarity of thought, and protection from negative forces.",
    transliteration: "Nīlā sarūpā suvratā | devī śaktiṃ pradāyinī | namaḥ ||",
    totalMantras: 9,
  },
  {
    id: "purush-suktam",
    name: "Purusha Suktam",
    nameHindi: "पुरुष सूक्तम्",
    deity: "Purusha / Vishnu",
    deityHindi: "पुरुष / विष्णु",
    vedaSource: "Rigveda",
    shortDescription:
      "The most comprehensive Vedic cosmological hymn, describing the Primordial Being (Purusha) whose sacrifice gave birth to the entire universe.",
    benefits:
      "Connects the devotee to cosmic consciousness. Recited in all major Vedic rituals, yagnas, and temple ceremonies.",
    transliteration:
      "Sahasraśīrṣā puruṣaḥ sahasrākṣaḥ sahasrapāt | sa bhūmiṃ viśvato vṛtvātyatiṣṭhad daśāṅgulam ||",
    totalMantras: 16,
  },
];
