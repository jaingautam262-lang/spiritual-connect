export interface JainStotraVerse {
  number: number;
  text: string;
  meaning?: string;
  benefit?: string;
}

export interface YantraCell {
  value: string;
}

export interface JainNewStotra {
  id: string;
  title: string;
  language: string;
  description?: string;
  intro?: string;
  verses: JainStotraVerse[];
  yantraGrid?: YantraCell[][];
  closingMantra?: string;
  status?: "available" | "coming-soon";
}

export const jainNewStotraData: JainNewStotra[] = [
  {
    id: "tijaypahutt-stotra",
    title: "तिजयपहुत्त स्तोत्र",
    language: "Prakrit",
    description:
      "70 Tirthankaras of all three regions and their yantra mandala. This stotra is chanted for protection from all calamities and to invoke the blessings of all Jinas.",
    verses: [
      {
        number: 1,
        text: "तिजयपहुत्त पयासय, अट्ठमहापाडिहेर-जुत्ताणं।\nसमयक्खित्तठिआणं, सरेमि चक्कं जिणिंदाणं।।",
        meaning:
          "I meditate on the wheel of the Jinas — those who are endowed with eight great miracles (Mahapratihariyas) and who are established in the realm of beings.",
      },
      {
        number: 2,
        text: "जय जय! निसम्म जिणवर-भासियं, परमत्थमिच्छंतो।\nतिय-वित्थरे य लोए, जहारियं झाइ-पासंतो।",
        meaning:
          "Victory! Victory! Hearing the words of the Jinavar with devotion, seeking the ultimate truth, I meditate in the three-wide world as it truly is.",
      },
      {
        number: 3,
        text: "जय! जय! अणंत-गुण-गण-संजुत्त, संसार-पारग।\nभव-भव-संतत्त, दुहट्ट, जगंत-पत्थड-उरग।",
        meaning:
          "Victory! To the one endowed with infinite qualities, who has crossed the ocean of transmigration, who has escaped the sorrow of repeated births, the Lord whose feet are worshipped by the world.",
      },
      {
        number: 4,
        text: "जय! जय! सुर-सम-सुहड, सव्व-सत्त-हिअ-चिंत्तिय।\nअत्था-उवलंभ-कर, पायपर-पाय-सुर-पणिअ।",
        meaning:
          "Victory! To the one praised by gods and men alike, thought of in the hearts of all beings, the giver of great attainments, at whose lotus feet the gods bow their heads.",
      },
      {
        number: 5,
        text: "जय! जय! उव-सग्ग-हरा, निसुम्म-वयण-अमिअ-रस।\nहु-अवह-निहाण-सोहिय, मोक्ख-लच्छी-आलय-अ।",
        meaning:
          "Victory! O Remover of all afflictions, whose words are nectar when heard, whose refuge is the abode of the Goddess of Liberation.",
      },
      {
        number: 6,
        text: "जय! जय! सव्व-वि-सव्व-विण्णाण-मय-जिणवर।\nलोय-अलोय-विहायर, तिगुत्त-जुत्त-जिणेसर।",
        meaning:
          "Victory! O Jinavar whose consciousness is the consciousness of all, who pervades the cosmos and beyond, the Lord of Jinas endowed with the three protections.",
      },
      {
        number: 7,
        text: "जय! जय! सव्व-भव्व-रक्खण-कर, परमंत-जिण-सत्थर।\nरयण-तय-उ-वलंभ-कर, संसार-जलहि-तित्थर।",
        meaning:
          "Victory! O protector of all auspicious souls, the supreme guide and teacher of the Jinas, the giver of the Three Jewels, the ford across the ocean of transmigration.",
      },
      {
        number: 8,
        text: "जय! जय! पह-रविउग्ग-सूरिए, उद्दय-पत्थिव-गाम।\nसंखित्त-विलय-कर-जुत्त, तव-तेय-तेय-संकाम।",
        meaning:
          "Victory! Like the rising morning sun, illuminating all directions, the destroyer of karmas with the power of austerity, blazing with the splendour of radiance.",
      },
      {
        number: 9,
        text: "जय! जय! मोत्तूण-सव्व-दोसे, सुद्ध-जिण-वर-सद्दहणं।\nतिय-वित्थरे य लोए, करेमि जिण-वर-वंदणं।",
        meaning:
          "Victory! Abandoning all faults, with pure belief in the great Jina, I offer my salutations to the Jinavar across the three worlds.",
      },
      {
        number: 10,
        text: "जय! जय! मोत्तूण-सव्व-दोसे, सुद्ध-जिण-वर-सद्दहणं।\nतिय-लोय-थ्थिय-सव्वे, नमंसमि सव्व-जिण।",
        meaning:
          "Victory! Abandoning all faults, with pure belief in the great Jina, I bow to all the Jinas established in the three worlds.",
      },
      {
        number: 11,
        text: "जय! जय! णमो अरिहंत-जिण, वद्धमाण-सुय-विग्गह।\nकिण्णर-कुमार-सम-रूव, विद्दय-जलहि-णिग्गह।",
        meaning:
          "Victory! Salutations to Arihantas the Jinas, to Vardhaman with the perfection of wisdom, beautiful as a Kinnara prince, the subjugator of the ocean of knowledge.",
      },
      {
        number: 12,
        text: "जय! जय! धम्म-विधि-देसिय, पंचहं च णमोक्कारं।\nलोयुत्तम-सरण-पव्वय्य-मि, जिण-सासण-मरि-हारं।",
        meaning:
          "Victory! The Namokar to the five taught in the way of Dharma; I take refuge in the highest in the world — the destroyer of enemies, the teaching of the Jina.",
      },
      {
        number: 13,
        text: "जय! जय! सव्व-वि-सव्व-जिणाणं, चउव्विह-संघ-णिग्गह।\nकामाइ-रिउ-भव-सायर-तिण्ण, जिण-धम्म-वर-विग्गह।",
        meaning:
          "Victory! The subjugator of the fourfold Sangha of all Jinas, who has crossed the ocean of rebirth with the enemy of passion, the great body of Jain Dharma.",
      },
      {
        number: 14,
        text: "जय! जय! सिद्ध-बुद्ध-सासण-हर, जिण-वर-चरण-पणय-करं।\nणमो-अ-सिद्ध-बुद्धाणं, णमो-कारि-हर्ट-हर्ट-गड।",
        meaning:
          "Victory! The bearer of the teaching of the Siddhas and Buddhas, bowing at the feet of the great Jina. Salutations to the Siddhas and Buddhas; with joy we offer our Namokar.",
      },
    ],
    yantraGrid: [
      [
        { value: "25-Ha" },
        { value: "80-Ra" },
        { value: "Kshi" },
        { value: "15-Hun" },
        { value: "50-Hah" },
      ],
      [
        { value: "20-Sa" },
        { value: "45-Ra" },
        { value: "Pa" },
        { value: "30-Su" },
        { value: "75-Sah" },
      ],
      [
        { value: "Kshi" },
        { value: "Pa" },
        { value: "Aum" },
        { value: "Swa" },
        { value: "Ha" },
      ],
      [
        { value: "70-Ha" },
        { value: "35-Ra" },
        { value: "Swa" },
        { value: "60-Hun" },
        { value: "5-Hah" },
      ],
      [
        { value: "55-Sa" },
        { value: "10-Ra" },
        { value: "Ha" },
        { value: "65-Su" },
        { value: "40-Sah" },
      ],
    ],
  },
  {
    id: "vajrapanjara-stotra",
    title: "श्री वज्रपञ्जर स्तोत्रम्",
    language: "Sanskrit",
    intro: "सांसारिक विपत्तिओ दूर करी आध्यात्मिक संपत्ति प्रदान करनारी",
    description:
      "The Vajrapanjara Stotra is a protective armor (kavach) of Jain tradition. Reciting this daily creates an impenetrable spiritual shield formed by the Panch Parameshti in all directions.",
    verses: [
      {
        number: 1,
        text: "ॐ परमेष्ठि नमस्कारं, सारं नवपदात्मकं।\nआत्मरक्षाकरं वज्र-पञ्जराभं स्मराम्यहम्।",
        meaning:
          "I remember the Navapada-natured salutation to the Parameshti — it is the essence, the protector of the self, like a cage of thunderbolts.",
      },
      {
        number: 2,
        text: "ॐ ह्रीं अर्हन्त-परमेष्ठी, पूर्वे माम् रक्षतु स्वयम्।\nआत्म-रक्षाकरं वज्र-पञ्जराभं स्मराम्यहम्।",
        meaning:
          "Om Hreem — may the Arhat Parameshti protect me from the East. I remember the self-protecting thunderbolt cage.",
      },
      {
        number: 3,
        text: "ॐ ह्रीं सिद्ध-परमेष्ठी, दक्षिणे माम् रक्षतु स्वयम्।\nआत्म-रक्षाकरं वज्र-पञ्जराभं स्मराम्यहम्।",
        meaning:
          "Om Hreem — may the Siddha Parameshti protect me from the South. I remember the self-protecting thunderbolt cage.",
      },
      {
        number: 4,
        text: "ॐ ह्रीं आचार्य-परमेष्ठी, पश्चिमे माम् रक्षतु स्वयम्।\nआत्म-रक्षाकरं वज्र-पञ्जराभं स्मराम्यहम्।",
        meaning:
          "Om Hreem — may the Acharya Parameshti protect me from the West. I remember the self-protecting thunderbolt cage.",
      },
      {
        number: 5,
        text: "ॐ ह्रीं उपाध्याय-परमेष्ठी, उत्तरे माम् रक्षतु स्वयम्।\nआत्म-रक्षाकरं वज्र-पञ्जराभं स्मराम्यहम्।",
        meaning:
          "Om Hreem — may the Upadhyaya Parameshti protect me from the North. I remember the self-protecting thunderbolt cage.",
      },
      {
        number: 6,
        text: "ॐ ह्रीं साधु-परमेष्ठी, ऊर्ध्वे माम् रक्षतु स्वयम्।\nआत्म-रक्षाकरं वज्र-पञ्जराभं स्मराम्यहम्।",
        meaning:
          "Om Hreem — may the Sadhu Parameshti protect me from Above. I remember the self-protecting thunderbolt cage.",
      },
      {
        number: 7,
        text: "ॐ ह्रीं पंच-परमेष्ठी सर्वतो, माम् रक्षन्तु सर्वदा।\nआत्म-रक्षाकरं वज्र-पञ्जराभं स्मराम्यहम्।",
        meaning:
          "Om Hreem — may the five Parameshti protect me from all directions at all times. I remember the self-protecting thunderbolt cage.",
      },
      {
        number: 8,
        text: "इत्येकाग्र-मना नित्यं, वज्र-पञ्जरं पठेत्।\nसर्व-विघ्न-विनाशाय, सर्व-सिद्धि-प्रदायकम्।",
        meaning:
          "One who recites the Vajrapanjara with a concentrated mind every day — it destroys all obstacles and grants all supernatural accomplishments.",
      },
    ],
  },
  {
    id: "mangalashtak-stotra",
    title: "श्री मंगलाष्टक स्तोत्र",
    language: "Sanskrit+Hindi",
    description:
      "Eight auspicious verses invoking the blessings of the Jain dharma. Recited at the beginning of all auspicious ceremonies.",
    verses: [
      {
        number: 1,
        text: "मंगलं भगवान् वीरो, मंगलं गौतम प्रभुः।\nमंगलं कुन्दकुन्दाद्यो, जैन धर्मोऽस्तु मंगलम्।",
        meaning:
          "भगवान महावीर मंगलमय हों, गौतम प्रभु मंगलमय हों, कुन्दकुन्दाचार्य आदि मंगलमय हों, जैन धर्म मंगलमय हो।",
      },
      {
        number: 2,
        text: "मंगलं सिद्ध-सुक्षेत्रं, मंगलं जिन-मन्दिरम्।\nमंगलं साधु-सन्तश्च, जैन धर्मोऽस्तु मंगलम्।",
        meaning:
          "सिद्ध क्षेत्र मंगलमय हो, जिन मंदिर मंगलमय हो, साधु-सन्त मंगलमय हों, जैन धर्म मंगलमय हो।",
      },
      {
        number: 3,
        text: "मंगलं नवकारश्च, मंगलं जिन-शासनम्।\nमंगलं अहिंसा-धर्मो, जैन धर्मोऽस्तु मंगलम्।",
        meaning:
          "नवकार मंत्र मंगलमय हो, जिन शासन मंगलमय हो, अहिंसा धर्म मंगलमय हो, जैन धर्म मंगलमय हो।",
      },
      {
        number: 4,
        text: "मंगलं रत्नत्रय-धारी, मंगलं संयम-व्रतम्।\nमंगलं तप-प्रधान-स्थम्, जैन धर्मोऽस्तु मंगलम्।",
        meaning:
          "रत्नत्रयधारी मंगलमय हों, संयम-व्रत मंगलमय हो, तप प्रधान स्थान मंगलमय हो, जैन धर्म मंगलमय हो।",
      },
      {
        number: 5,
        text: "मंगलं भव्य-जीवानां, मंगलं मोक्ष-मार्गकम्।\nमंगलं परमागमश्च, जैन धर्मोऽस्तु मंगलम्।",
        meaning:
          "भव्य जीवों का मंगल हो, मोक्ष मार्ग मंगलमय हो, परमागम (जैन शास्त्र) मंगलमय हो, जैन धर्म मंगलमय हो।",
      },
      {
        number: 6,
        text: "मंगलं समभाव-दृष्टिः, मंगलं वीतरागता।\nमंगलं केवल-ज्ञानश्च, जैन धर्मोऽस्तु मंगलम्।",
        meaning:
          "समभाव दृष्टि मंगलमय हो, वीतरागता मंगलमय हो, केवलज्ञान मंगलमय हो, जैन धर्म मंगलमय हो।",
      },
      {
        number: 7,
        text: "मंगलं कर्म-विनाशाय, मंगलं मुक्ति-प्राप्तये।\nमंगलं सिद्ध-पद-प्राप्त्यै, जैन धर्मोऽस्तु मंगलम्।",
        meaning:
          "कर्म विनाश के लिए मंगल हो, मुक्ति प्राप्ति के लिए मंगल हो, सिद्धपद प्राप्ति के लिए मंगल हो, जैन धर्म मंगलमय हो।",
      },
      {
        number: 8,
        text: "मंगलं चतुर्विध-संघः, मंगलं श्रावक-व्रतम्।\nमंगलं जिन-स्तुति-गानं, जैन धर्मोऽस्तु मंगलम्।",
        meaning:
          "चतुर्विध संघ मंगलमय हो, श्रावक व्रत मंगलमय हो, जिन स्तुति गायन मंगलमय हो, जैन धर्म मंगलमय हो।",
      },
      {
        number: 9,
        text: "मंगलं श्रेयो-ग्रहणं, मंगलं हेय-वर्जनम्।\nमंगलं सम्यक्-दर्शनं, जैन धर्मोऽस्तु मंगलम्।",
        meaning:
          "श्रेय ग्रहण करना मंगलमय हो, हेय का वर्जन मंगलमय हो, सम्यक् दर्शन मंगलमय हो, जैन धर्म मंगलमय हो।",
      },
      {
        number: 10,
        text: "इदं मंगलकं स्तोत्रं, पठनात् सर्व-मंगलम्।\nजायते नात्र सन्देहः, जैन धर्मोऽस्तु मंगलम्।",
        meaning:
          "यह मंगलक स्तोत्र पढ़ने से सभी मंगल होते हैं, इसमें कोई संदेह नहीं, जैन धर्म मंगलमय हो।",
      },
    ],
  },
  {
    id: "aradhana-stotra",
    title: "आराधना स्तोत्र",
    language: "Sanskrit+Hindi",
    intro:
      "This stotra bestows 8 types of Riddhi (supernatural accomplishments) to devoted practitioners.",
    description:
      "The Aradhana Stotra is a comprehensive invocation of the Panch Parameshti. Its sincere practice is said to bestow the Ashtamaha Riddhi — eight great supernatural powers — upon the devotee.",
    verses: [
      {
        number: 1,
        text: "ॐ ह्रीं अर्हत्-सिद्ध-आचार्य-उपाध्याय-साधु-पञ्च-परमेष्ठिभ्यो नमः।",
        benefit: "Worship of Panch Parameshti destroys all karmas.",
        meaning:
          "Salutations to the five supreme beings — the Arhat, the Siddha, the Acharya, the Upadhyaya, and the Sadhu.",
      },
      {
        number: 2,
        text: "पंच-परमेष्ठि-नमस्कारात्, सर्व-पाप-प्रणाशनम्।\nमंगलानां च सर्वेषां, प्रथमं हवति मंगलम्।",
        benefit: "All sins are destroyed; all auspicious things begin.",
        meaning:
          "By the salutation to the five Parameshti, all sins are destroyed. Among all auspicious things, this is said to be the foremost auspicious thing.",
      },
      {
        number: 3,
        text: "नमो जिणाणं जियभय-भयाणं।\nनमो पढम-जिणिंद-भगवंताणं।",
        benefit: "Fear is conquered; Jina Bhagwanta are honored.",
        meaning:
          "Salutations to the Jinas who have conquered fear. Salutations to the first Jinendra Bhagwanta.",
      },
      {
        number: 4,
        text: "अरिहंत-वचन-नमस्कारेण, सर्व-दोष-विनाशनम्।",
        benefit: "All flaws and obstacles are removed.",
        meaning:
          "By offering salutation to the words of the Arihantas, all faults and defects are destroyed.",
      },
      {
        number: 5,
        text: "साधु-संघ-प्रसादेन, मोक्ष-मार्गः प्रशस्यते।",
        benefit: "The path to liberation is praised and attained.",
        meaning:
          "By the grace of the Sadhu Sangha (community of monks), the path of liberation is glorified and attained.",
      },
    ],
    closingMantra: "ॐ ह्रीं श्रीं क्लीं ऐं अर्हं नमः",
  },
  {
    id: "padmavati-mantra-stotra",
    title: "राज राजेश्वरी श्री पद्मावति माता मंत्र स्तोत्र",
    language: "Sanskrit+Hindi",
    intro:
      "Padmavati Mata is the Yakshini/protector of Parshvanath Bhagwan. This stotra is chanted for protection, prosperity and removal of obstacles.",
    description:
      "Padmavati Devi is the presiding Yakshini of the 23rd Tirthankar Parshvanath. She is depicted with lotus, citrus fruit, noose, and goad in her four hands. Her blessings remove obstacles and grant material and spiritual prosperity.",
    verses: [
      {
        number: 1,
        text: "ॐ ह्रीं श्रीं पद्मावति-देव्यै नमः।",
        meaning: "Padmavati Devi को नमस्कार।",
      },
      {
        number: 2,
        text: "राज-राजेश्वरि त्वं हि, पद्मावति-सुर-प्रिये।\nपार्श्वनाथ-प्रिये देवि, नमामि भवतीं सदा।",
        meaning:
          "हे राज राजेश्वरी, देवताओं की प्रिय पद्मावती, पार्श्वनाथ की प्रिया देवी, मैं सदा आपको प्रणाम करता हूं।",
      },
      {
        number: 3,
        text: "कमला-वर्णा सुप्रभा, हस्त-कमल-धारिणी।\nविघ्न-नाशिनि देव्यै च, नमामि शिरसा सदा।",
        meaning:
          "कमल के समान कांति वाली, हाथ में कमल धारण करने वाली, विघ्ननाशिनी देवी को सिर झुकाकर नमन।",
      },
      {
        number: 4,
        text: "धन-धान्य-प्रदे देवि, सर्व-कार्य-सिद्धि-दे।\nसर्व-रोग-विनाशिनि, पद्मावति नमोस्तु ते।",
        meaning:
          "धन-धान्य देने वाली, सभी कार्यों में सफलता देने वाली, सभी रोगों का नाश करने वाली पद्मावती को नमन।",
      },
      {
        number: 5,
        text: "भक्त-वत्सले देव्यै च, कृपा-दृष्टि-विधायिनि।\nशरण-प्राप्त-जने नित्यं, पद्मावति नमोस्तु ते।",
        meaning:
          "भक्तों से प्रेम करने वाली, कृपादृष्टि देने वाली, शरण में आए लोगों की रक्षा करने वाली पद्मावती को नमन।",
      },
      {
        number: 6,
        text: "त्वं ब्रह्मा त्वं च विष्णुश्च, त्वमेव परमेश्वरी।\nसर्व-शक्ति-स्वरूपा त्वं, पद्मावति नमोस्तु ते।",
        meaning:
          "आप ब्रह्मा हैं, आप विष्णु हैं, आप ही परमेश्वरी हैं, सर्व शक्ति स्वरूपा पद्मावती को नमन।",
      },
      {
        number: 7,
        text: "पार्श्व-शासन-दिव्यस्य, रक्षिका परमेश्वरी।\nह्रीं श्रीं क्लीं पद्मावत्यै, नमः सर्व-सिद्धि-दे।",
        meaning:
          "पार्श्व शासन की दिव्य रक्षिका परमेश्वरी, ह्रीं श्रीं क्लीं — पद्मावती को नमन, सभी सिद्धियां प्रदान करने वाली।",
      },
      {
        number: 8,
        text: "इदं स्तोत्रं पठेत् नित्यं, भक्तिभावेन चेतसा।\nसर्व-मनोरथ-सिद्धिः स्यात्, पद्मावति-प्रसादतः।",
        meaning:
          "यह स्तोत्र प्रतिदिन भक्तिभाव से पढ़ने से पद्मावती की कृपा से सभी मनोकामनाएं पूर्ण होती हैं।",
      },
    ],
  },
  {
    id: "paras-iktisa-bhajan",
    title: "श्री पारस इक्तिसा",
    language: "Hindi+Rajasthani",
    description:
      "31-verse bhajan to Parshvanath Bhagwan — a devotional masterpiece sung in the Rajasthani tradition at Nakoda and other Parshvanath shrines.",
    verses: [
      {
        number: 1,
        text: "पारस पहाड़ पे बिराजे, ईश्वर तुम्हारो नाम।\nपारस पहाड़ पे बिराजे, पार करो तुम काम।\nनित निर्मल निष्काम, तारो भव के पार॥",
      },
      {
        number: 2,
        text: "नाकोडा क्षेत्र के राजा, भैरव तुम्हारे द्वार।\nजो आवे तेरे शरण में, पाए शांति अपार।",
      },
      {
        number: 3,
        text: "चौबीस तीर्थंकर में तुम, सत्रहवें भगवान।\nपार्श्व नाम से जग में, हो विख्यात महान।",
      },
      {
        number: 4,
        text: "काव्यमुखी हो जन्मस्थान, वाराणसी में राज।\nचारू तुम्हारी कांति, छाया जग में साज।",
      },
      {
        number: 5,
        text: "माता वामा पिता अश्वसेन, राजा तुम्हारे नाम।\nतुम विरागी बने जगत में, छोड़ा राज तमाम।",
      },
      {
        number: 6,
        text: "दीक्षा ली जंगल में जाकर, अहिंसा का पाठ।\nजीव जगत के रक्षक तुम, निभाया अपना ठाठ।",
      },
      {
        number: 7,
        text: "चंद्रप्रभ की ध्यानमग्न, अग्नि से बचाया तुमने।\nकमठ के क्रोध को सहकर, मुक्ति का मार्ग पाया तुमने।",
      },
      {
        number: 8,
        text: "अष्ट पदों में तुम विराजे, धरण यक्ष तुम्हारे संग।\nपद्मावती भी साथ चलती, मिला आशीष अनंग।",
      },
      {
        number: 9,
        text: "तुम्हारी भक्ति से मिलती, शांति सुख समृद्धि।\nजो भजे मन से तुम्हें, पाए अष्ट सिद्धि।",
      },
      {
        number: 10,
        text: "सम्मेद शिखर पे आरूढ़ होकर, पाई मुक्ति निश्चल।\nनिर्वाण दिवस पर तुम्हारा, जग को मिला मंगल।",
      },
      {
        number: 11,
        text: "जल की धारा से अभिषेक, करता हूं तेरे पाव।\nतन मन धन सब अर्पित, प्रभु मेरे भव नाव।",
      },
      {
        number: 12,
        text: "पुष्प चंदन और अक्षत, लेकर आया तेरे पास।\nनैवेद्य दीप धूप सहित, हर लो मेरे विकास।",
      },
      {
        number: 13,
        text: "अर्घ्य चढ़ाता हूं प्रभु को, दिल में भक्ति भाव।\nतुम्हारी चरण-वंदना से, कटे जन्म-जन्म का पाव।",
      },
      {
        number: 14,
        text: "तेरा नाम जपत हूं नित दिन, जागत और सोत।\nॐ ह्रीं पार्श्वनाथाय नमः, यही है मेरी ओत।",
      },
      {
        number: 15,
        text: "चार ज्ञान के धारी तुम हो, मन पर्याय वाले।\nकेवलज्ञान से देखते हो, जग के सब उजाले।",
      },
      {
        number: 16,
        text: "आष्टांगिक मार्ग बताया, धर्म का नया द्वार।\nसम्यक् दर्शन ज्ञान चारित्र, भव का किया उद्धार।",
      },
      {
        number: 17,
        text: "चतुर्गति के बंधन से, जो जन मुक्त हो।\nतुम्हारे शरण में आकर, जीव सभी सुखी हो।",
      },
      {
        number: 18,
        text: "सर्पों के फण से तुमको, धरण ने रक्षा दी।\nकमठ ने किया उपद्रव, शांति तुमने ही की।",
      },
      {
        number: 19,
        text: "ध्यान मग्न तुम रहे नित, काल का भय न करते।\nकर्म की जंजीरें काटी, सिद्धि की ओर बढ़ते।",
      },
      {
        number: 20,
        text: "पारस पत्थर सा तुम्हारा, स्पर्श सोना करे।\nपापों का नाश होता, पुण्य की वर्षा परे।",
      },
      {
        number: 21,
        text: "फाल्गुन कृष्ण में जन्मे, पौष में दीक्षा ली।\nआषाढ़ में केवलज्ञान, श्रावण में मुक्ति मिली।",
      },
      {
        number: 22,
        text: "सौ वर्षों की आयु थी, कर्म-क्षय का काम।\nसम्मेद गिरि के शीर्ष पर, पाया परम विश्राम।",
      },
      {
        number: 23,
        text: "नाकोडा में तुम्हारी प्रतिमा, जगत को करे अभय।\nभैरव बाबा की भक्ति से, दूर होता भय।",
      },
      {
        number: 24,
        text: "इक्कीस चमत्कार है तेरे, हर भक्त को मिला।\nजो भजे सच्चे मन से, दर्शन उसका हिला।",
      },
      {
        number: 25,
        text: "बीमारी दुख दारिद्र्य, दूर होवे सब।\nजो लगाये ध्यान तुझमें, मिले सुख अब।",
      },
      {
        number: 26,
        text: "प्रभु तेरी जयकार से, मन को मिले चैन।\nजो सुनाता है यह स्तुति, पाए अनहद सैन।",
      },
      {
        number: 27,
        text: "तुम्हारे नाम की माला, जपता हूं हर पल।\nपार्श्व प्रभु की भक्ति से, मिले जीवन में बल।",
      },
      {
        number: 28,
        text: "धर्म की सच्ची नाव पर, बैठ भव सागर पार।\nपार्श्व की शरण में जाकर, मिले मुक्ति का द्वार।",
      },
      {
        number: 29,
        text: "सौम्य मूर्ति और शांत नयन, तुम्हारे चरण में आस।\nभक्त की आराधना से, दूर हो मन का त्रास।",
      },
      {
        number: 30,
        text: "इक्तिसा (31) पद की माला, गाया है हर्षाय।\nजो नित पढ़े इस स्तोत्र को, भव सागर से तरपाय।",
      },
      {
        number: 31,
        text: "ॐ ह्रीं श्रीं पार्श्वनाथाय नमः, इही है महा मंत्र।\nइस मंत्र की शरण में, भक्त होवे स्वतंत्र।",
      },
    ],
  },
  {
    id: "nakoda-bhairav-prarthana",
    title: "श्री नाकोडा भैरव प्रार्थना",
    language: "Hindi",
    description:
      "Nakoda Bhairav is the devoted guardian of Parshvanath at the Nakoda Tirth in Rajasthan. This prayer is offered before approaching the Parshvanath idol.",
    verses: [
      {
        number: 1,
        text: "नाकोडा पर्वत राजे, भैरव तेरा नाम।\nजय जय नाकोडा भैरव, सफल करो हर काम।",
      },
      {
        number: 2,
        text: "पार्श्वनाथ के द्वारपाल, तुम हो भैरव देव।\nतेरे बिना अधूरी है, पार्श्व प्रभु की सेव।",
      },
      {
        number: 3,
        text: "भक्त जो आवे तेरे पास, मन में सच्ची आस।\nतू पूरा कर देता है, हर भक्त की प्यास।",
      },
      {
        number: 4,
        text: "तेरे नाम की महिमा, जग में है अपार।\nजो जन लेवे तेरा नाम, होवे बेड़ापार।",
      },
      {
        number: 5,
        text: "धन दौलत सुख समृद्धि, तू ही दाता है।\nजो तेरी शरण में आवे, भाग्य उसका जागता है।",
      },
      {
        number: 6,
        text: "रोग दोष दुख दारिद्र्य, दूर कर मेरे।\nनाकोडा भैरव देव, मेरे मन को हेरे।",
      },
      {
        number: 7,
        text: "ॐ ह्रीं नाकोडाय भैरवाय नमः, यह मंत्र है पावन।\nइसके जप से भय टले, मन होवे पावन।",
      },
      {
        number: 8,
        text: "तेरे चरण की धूल से, होता कल्याण।\nनाकोडा भैरव देव को, शत शत प्रणाम।",
      },
    ],
  },
  // Placeholder stotras — coming soon
  {
    id: "santi-karam-stotra",
    title: "सन्तिकरम् स्तोत्र",
    language: "Sanskrit",
    description: "शांति प्रदान करने वाला प्राचीन जैन स्तोत्र — शीघ्र उपलब्ध होगा।",
    status: "coming-soon",
    verses: [],
  },
  {
    id: "jin-sahasranam-stotra",
    title: "जिन सहस्रनाम स्तोत्र",
    language: "Sanskrit",
    description: "भगवान जिनेंद्र के एक हजार नामों का स्तोत्र — शीघ्र उपलब्ध होगा।",
    status: "coming-soon",
    verses: [],
  },
  {
    id: "shakrastava-stotra",
    title: "शक्रस्तव",
    language: "Sanskrit",
    description: "इंद्र द्वारा रचित भगवान जिनेंद्र की स्तुति — शीघ्र उपलब्ध होगा।",
    status: "coming-soon",
    verses: [],
  },
];
