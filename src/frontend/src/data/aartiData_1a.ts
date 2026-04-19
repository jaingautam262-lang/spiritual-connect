export interface AartiItem {
  id: string;
  titleEn: string;
  titleHi: string;
  deity: string;
  faith: "Hindu" | "Jain" | "Sikh";
  description: string;
  lyricsHi: string;
  lyricsEn: string;
  /** Original Prakrit/Apabhramsha script for Jain aartis */
  prakritText?: string;
  /** Original Gurmukhi script for Sikh aartis */
  gurmukhi?: string;
  /** Roman transliteration for original script (Prakrit or Gurmukhi) */
  originalTranslit?: string;
}

export const SEED_AARTIS_1A: AartiItem[] = [
  {
    id: "aarti-1",
    titleEn: "Ganesh Aarti",
    titleHi: "जय गणेश जय गणेश देवा",
    deity: "Ganesha",
    faith: "Hindu",
    description:
      "The most beloved aarti of Lord Ganesha, sung before any auspicious beginning.",
    lyricsHi: `जय गणेश जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा॥

एक दन्त दयावन्त, चार भुजा धारी।
माथे सिन्दूर सोहे, मूसे की सवारी॥

जय गणेश जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा॥

पान चढ़े फूल चढ़े, और चढ़े मेवा।
लड्डुअन का भोग लागे, सन्त करें सेवा॥

जय गणेश जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा॥

अन्धन को आँख देत, कोढ़िन को काया।
बाँझन को पुत्र देत, निर्धन को माया॥

जय गणेश जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा॥

'सूर' श्याम शरण आए, सफल कीजे सेवा।
माता जाकी पार्वती, पिता महादेवा॥

जय गणेश जय गणेश, जय गणेश देवा।`,
    lyricsEn: `Jai Ganesh Jai Ganesh, Jai Ganesh Deva.
Maata jaaki Parvati, Pita Mahadeva.

Ek dant dayavant, char bhuja dhari.
Mathe sindoor sohe, muse ki savari.

Jai Ganesh Jai Ganesh, Jai Ganesh Deva.
Maata jaaki Parvati, Pita Mahadeva.

Paan chadhe phool chadhe, aur chadhe meva.
Ladduan ka bhog lage, sant kare seva.

Glory to Ganesha, son of Parvati and Shiva,
With one tusk, four arms, adorned with sindoor, riding a mouse.`,
  },
  {
    id: "aarti-2",
    titleEn: "Om Jai Jagdish Hare",
    titleHi: "ॐ जय जगदीश हरे",
    deity: "Vishnu",
    faith: "Hindu",
    description: "The universal aarti sung in all Hindu homes and temples.",
    lyricsHi: `ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।
भक्त जनों के संकट, दास जनों के संकट,
क्षण में दूर करे॥ ॐ जय जगदीश हरे॥

जो ध्यावे फल पावे, दुःख बिनसे मन का।
स्वामी दुःख बिनसे मन का।
सुख सम्पत्ति घर आवे, सुख सम्पत्ति घर आवे,
कष्ट मिटे तन का॥ ॐ जय जगदीश हरे॥

मात पिता तुम मेरे, शरण गहूँ मैं किसकी।
स्वामी शरण गहूँ किसकी।
तुम बिन और न दूजा, तुम बिन और न दूजा,
आस करूँ मैं जिसकी॥ ॐ जय जगदीश हरे॥

तुम पूरण परमात्मा, तुम अन्तर्यामी।
स्वामी तुम अन्तर्यामी।
पारब्रह्म परमेश्वर, पारब्रह्म परमेश्वर,
तुम सब के स्वामी॥ ॐ जय जगदीश हरे॥`,
    lyricsEn: `Om Jai Jagdish Hare, Swami Jai Jagdish Hare.
Bhakt janon ke sankat, das janon ke sankat,
Kshan mein door kare. Om Jai Jagdish Hare.

O Lord of the Universe, destroyer of devotees' troubles,
Instantly removing all pain and sorrow.`,
  },
  {
    id: "aarti-3",
    titleEn: "Shiv Aarti",
    titleHi: "ॐ जय शिव ओंकारा",
    deity: "Shiva",
    faith: "Hindu",
    description: "The sacred aarti of Mahadev, Lord of all creation.",
    lyricsHi: `ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।
ब्रह्मा विष्णु सदाशिव, अर्धांगी धारा॥ ॐ जय शिव॥

एकानन चतुरानन, पञ्चानन राजे।
हंसासन गरूड़ासन, वृषवाहन साजे॥ ॐ जय शिव॥

दो भुज चार चतुर्भुज, दश भुज अति सोहे।
त्रिगुण रूप निरखते, त्रिभुवन जन मोहे॥ ॐ जय शिव॥

अक्षमाला वनमाला, मुण्डमाला धारी।
चन्दन मृगमद सोहे, भाले शशि धारी॥ ॐ जय शिव॥

श्वेताम्बर पीताम्बर, बाघम्बर अंगे।
सनकादिक गरुड़ादिक, भूतादिक संगे॥ ॐ जय शिव॥`,
    lyricsEn: `Om Jai Shiv Omkara, Swami Jai Shiv Omkara.
Brahma Vishnu Sadashiv, Ardhangi Dhara. Om Jai Shiv.

Hail to Shiva, the Omkar,
Brahma, Vishnu, and Shiva in one divine form,
With one face, four faces, and five faces, He reigns supreme.`,
  },
  {
    id: "aarti-4",
    titleEn: "Hanuman Aarti",
    titleHi: "आरती कीजे हनुमान लला की",
    deity: "Hanuman",
    faith: "Hindu",
    description:
      "Devotional aarti of Lord Hanuman, the embodiment of devotion and strength.",
    lyricsHi: `आरती कीजे हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥

जाके बल से गिरिवर काँपे।
रोग दोष जाके निकट न झाँके॥

अञ्जनि पुत्र महा बलदाई।
सन्तन के प्रभु सदा सहाई॥

आरती कीजे हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥

दे बीड़ा रघुपति पठाए।
लंका जारि सिया सुधि लाए॥

लंका सो कोट समुद्र सी खाई।
जात पवनसुत बार न लाई॥

आरती कीजे हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥`,
    lyricsEn: `Aarti kije Hanuman lala ki,
Dusht dalan Raghunath kala ki.

Whose strength makes mountains tremble,
Near whom no disease or misfortune dares approach.

Son of Anjana, the mighty one,
Always a helper to the saints and devotees.`,
  },
  {
    id: "aarti-5",
    titleEn: "Lakshmi Aarti",
    titleHi: "ॐ जय लक्ष्मी माता",
    deity: "Lakshmi",
    faith: "Hindu",
    description: "Aarti of Goddess Lakshmi, bestower of wealth and prosperity.",
    lyricsHi: `ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।
तुमको निशदिन सेवत, हर विष्णु विधाता॥ ॐ जय लक्ष्मी माता॥

उमा रमा ब्रह्माणी, तुम ही जग माता।
सूर्य चन्द्रमा ध्यावत, नारद ऋषि गाता॥ ॐ जय लक्ष्मी माता॥

दुर्गा रूप निरञ्जनी, सुख सम्पत्ति दाता।
जो कोई तुमको ध्यावत, ऋद्धि-सिद्धि धन पाता॥ ॐ जय लक्ष्मी माता॥

तुम पाताल निवासिनी, तुम ही शुभदाता।
कर्म प्रभाव प्रकाशिनी, भवनिधि की त्राता॥ ॐ जय लक्ष्मी माता॥`,
    lyricsEn: `Om Jai Lakshmi Mata, Maiya Jai Lakshmi Mata.
Tumko nishdin sevat, Har Vishnu Vidhata. Om Jai Lakshmi Mata.

Hail to Mother Lakshmi,
Uma, Rama, Brahmani — you are the world's mother,
The sun and moon meditate on you, Narada sings your praises.`,
  },
  {
    id: "aarti-6",
    titleEn: "Saraswati Aarti",
    titleHi: "जय सरस्वती माता",
    deity: "Saraswati",
    faith: "Hindu",
    description:
      "Aarti of Goddess Saraswati, the bestower of knowledge and wisdom.",
    lyricsHi: `जय सरस्वती माता, मैया जय सरस्वती माता।
सद्गुण वैभव शालिनी, त्रिभुवन विख्याता॥ जय सरस्वती माता॥

चन्द्रवदनी पद्मासिनी, द्युति मङ्गलकारी।
सोहे शुभ हंस सवारी, अतुल तेजधारी॥ जय सरस्वती माता॥

बाएं कर में वीणा, दाएं कर माला।
शीश मुकुट मणि सोहे, गल मोतियन माला॥ जय सरस्वती माता॥`,
    lyricsEn: `Jai Saraswati Mata, Maiya Jai Saraswati Mata.
Sadguna vaibhav shalini, Tribhuvan vikhyata. Jai Saraswati Mata.

Moon-faced, seated on a lotus, spreading auspicious light,
Riding a graceful swan, bearer of immense radiance.`,
  },
  {
    id: "aarti-7",
    titleEn: "Durga Aarti",
    titleHi: "जय अम्बे गौरी",
    deity: "Durga",
    faith: "Hindu",
    description: "The powerful aarti of Maa Durga, destroyer of evil.",
    lyricsHi: `जय अम्बे गौरी, मैया जय श्यामा गौरी।
तुमको निशदिन ध्यावत, हरि ब्रह्मा शिवरी॥ जय अम्बे गौरी॥

माँग सिन्दूर विराजत, टीको मृगमद को।
उज्ज्वल से दोऊ नैना, चन्द्रवदन नीको॥ जय अम्बे गौरी॥

कनक समान कलेवर, रक्ताम्बर राजे।
रक्तपुष्प गल माला, कण्ठन पर साजे॥ जय अम्बे गौरी॥`,
    lyricsEn: `Jai Ambe Gauri, Maiya Jai Shyama Gauri.
Tumko nishdin dhyavat, Hari Brahma Shivri. Jai Ambe Gauri.

Hail to Goddess Durga, the golden-complexioned divine mother,
Adorned with sindoor, musk tilak, radiant eyes, and moonlike face.`,
  },
  {
    id: "aarti-8",
    titleEn: "Sai Baba Aarti",
    titleHi: "आरती साईं बाबा की",
    deity: "Sai Baba",
    faith: "Hindu",
    description:
      "Devotional aarti of Shirdi Sai Baba, the saint of all faiths.",
    lyricsHi: `आरती साईं बाबा, सौख्यदाता जीवा।
चरणरजा मज द्या, दयाघना शिवा॥ आरती साईं बाबा॥

जालुनिया अनंग, स्वस्वरूपी राहे।
जनमरण तयांचे, कदी नाही सोसे॥ आरती साईं बाबा॥

ॐ साईं राम, ॐ साईं राम।
ॐ साईं राम, जय जय साईं राम॥`,
    lyricsEn: `Aarti Sai Baba, Soukhyadata Jiva.
Charanraja maja dya, Dayaghana Shiva. Aarti Sai Baba.

O Sai Baba, giver of happiness and welfare,
Please bestow on me the dust of your holy feet.
Om Sai Ram, Om Sai Ram, Jai Jai Sai Ram.`,
  },
  {
    id: "aarti-9",
    titleEn: "Krishna Aarti",
    titleHi: "आरती कुंजबिहारी की",
    deity: "Krishna",
    faith: "Hindu",
    description:
      "Beautiful aarti of Lord Krishna, the divine flute player of Vrindavan.",
    lyricsHi: `आरती कुञ्जबिहारी की, श्री गिरिधर कृष्ण मुरारी की॥

गले में बैजन्ती माला, बजावत वंशी मधुर बाला।
श्रवण में कुण्डल झलकाला, नन्द के आनन्द नन्दलाला॥

গগनसम अंग कान्ति काली, राधिका चमक रही आली।
लतन में ठाढ़े बनमाली, भ्रमर सी अलक, कस्तूरी तिलक, चन्द्र सी झलक लललाल॥

आरती कुञ्जबिहारी की, श्री गिरिधर कृष्ण मुरारी की॥`,
    lyricsEn: `Aarti Kunjbihari ki, Shri Girdhar Krishna Murari ki.

With Vaijayanti garland around his neck, playing the sweet flute,
Earrings glittering on his ears, the joy of Nanda, the beloved Nandlal.

With complexion dark as sky, radiant Radhika by his side,
Standing among the vines, the forest-garland wearer, with dark curls and musk tilak.`,
  },
  {
    id: "aarti-10",
    titleEn: "Ram Aarti",
    titleHi: "श्री रामचन्द्र कृपालु",
    deity: "Ram",
    faith: "Hindu",
    description:
      "Aarti of Lord Ram, the ideal king and embodiment of righteousness.",
    lyricsHi: `श्री रामचन्द्र कृपालु भज मन, हरण भवभय दारुणम्।
नव कञ्ज लोचन, कञ्ज मुख, कर कञ्ज, पद कञ्जारुणम्॥

कन्दर्प अगणित अमित छवि, नव नील नीरद सुन्दरम्।
पट पीत मानहुँ तडित रुचि, शुचि नोमि जनक सुतावरम्॥

भज दीनबन्धु दिनेश दानव, दैत्य-वंश-निकन्दनम्।
रघुनन्द आनन्दकन्द कोशल-चन्द दशरथ-नन्दनम्॥

जय राम सीताराम, जय राम सीताराम।`,
    lyricsEn: `Shri Ramachandra Kripalu bhaj man, Haran bhavabhay darunam.
Nav kanja lochan, kanja mukh, kar kanja, pad kanjarunam.

O mind, worship the compassionate Ramachandra,
Who destroys the terrifying worldly fears,
With lotus eyes, lotus face, lotus hands and lotus-red feet.`,
  },
  {
    id: "aarti-11",
    titleEn: "Surya Dev Aarti",
    titleHi: "जय कश्यप-नन्दन सूर्यदेव",
    deity: "Surya",
    faith: "Hindu",
    description: "Aarti of Surya Dev, the Sun God who illuminates the world.",
    lyricsHi: `जय कश्यप-नन्दन, ओम जय अदिति-नन्दन।
त्रिभुवन-तिमिर-निकन्दन, भक्त-हृदय-चन्दन॥ जय सूर्यदेव॥

सप्तअश्व-रथ राजित, एक चक्रधारी।
दु:खहारी, सुखकारी, मानस-मलहारी॥ जय सूर्यदेव॥`,
    lyricsEn: `Jai Kashyap-nandan, Om jai Aditi-nandan.
Tribhuvan-timir-nikandan, Bhakt-hriday-chandan. Jai Suryadev.

Hail Son of Kashyap, Son of Aditi,
Destroyer of the three worlds' darkness, sandalwood for devotees' hearts.`,
  },
  {
    id: "aarti-12",
    titleEn: "Vishnu Aarti",
    titleHi: "ॐ जय विष्णु देवा",
    deity: "Vishnu",
    faith: "Hindu",
    description:
      "The sacred aarti of Lord Vishnu, the preserver of the universe.",
    lyricsHi: `ॐ जय विष्णु देवा, मायापति देवा।
रमापति त्रिभुवन के आप स्वामी, सब के पालनहारा॥ ॐ जय विष्णु देवा॥

शंख चक्र गदा पद्म, चार भुजा धारी।
मंगलमय मूरत अपनी, कीर्ति बहुत भारी॥ ॐ जय विष्णु देवा॥`,
    lyricsEn: `Om Jai Vishnu Deva, Mayapati Deva.
Ramapati Tribhuvan ke aap Swami, Sab ke Palanhaara. Om Jai Vishnu Deva.

Hail Lord Vishnu, master of Maya, lord of Lakshmi,
Ruler of the three worlds, sustainer of all.`,
  },
  {
    id: "aarti-13",
    titleEn: "Santoshi Mata Aarti",
    titleHi: "जय सन्तोषी माता",
    deity: "Santoshi Mata",
    faith: "Hindu",
    description: "Aarti of Santoshi Mata, bestower of peace and contentment.",
    lyricsHi: `जय सन्तोषी माता, जय सन्तोषी माता।
अपने सेवक जन की, सुख-सम्पत्ति दाता॥ जय सन्तोषी माता॥

सोने का सिंहासन, बैठी महारानी।
चरणों में सेवक के, मनभावन माता॥ जय सन्तोषी माता॥`,
    lyricsEn: `Jai Santoshi Mata, Jai Santoshi Mata.
Apne sewak jan ki, Sukh-sampatti data. Jai Santoshi Mata.

Hail Mother Santoshi, bestower of happiness and wealth,
Seated on a golden throne, O beloved queen mother.`,
  },
  {
    id: "aarti-h-14",
    titleEn: "Shree Jai Shree Aarti (Sukhakarta Dukhharta)",
    titleHi: "सुखकर्ता दुखहर्ता",
    deity: "Ganesha",
    faith: "Hindu",
    description:
      "Marathi Aarti of Lord Ganesha, very popular during Ganesh Chaturthi.",
    lyricsHi: `सुखकर्ता दुःखहर्ता वार्ता विघ्नाची।
नुरवी पुरवी प्रेम कृपा जयाची॥
सर्वांगी सुंदर उटी शेंदुराची।
कंठी झळके माळ मुक्ताफळांची॥

जय देव जय देव जय मंगलमूर्ती।
दर्शनमात्रे मनकामना पूर्ती॥ जय देव जय देव॥

रत्नखचित फरा तुज गौरीकुमरा।
चंदनाची उटी कुमकुम केशरा॥
हिरेजडित मुकुट शोभतो बरा।
रुणझुणती नुपुरे चरणी घागरिया॥ जय देव जय देव॥`,
    lyricsEn: `Sukhakarta Dukhharta Varta Vighnaachi.
Nuravi Puravi Prem Krupa Jayaachi.
Sarvangee Sundar Uti Shendurachee.
Kanthee Jhalake Maal Muktafalanchee.

Jai Dev Jai Dev Jai Mangalmoorti.
Darshanmaatra Mankaamana Poorti. Jai Dev Jai Dev.

O Ganesha, remover of sorrow, giver of joy,
Destroyer of all obstacles, beloved of all.`,
  },
  {
    id: "aarti-h-15",
    titleEn: "Navdurga Aarti",
    titleHi: "नवदुर्गा आरती",
    deity: "Navdurga",
    faith: "Hindu",
    description: "Aarti of the nine forms of Maa Durga, sung during Navaratri.",
    lyricsHi: `जय शैलपुत्री माता, जय ब्रह्मचारिणी माता।
जय चन्द्रघण्टा माँ, कूष्माण्डा सुखदाता॥

स्कन्दमाता पूजित, कात्यायिनी महाराज।
कालरात्रि महागौरी, सिद्धिदात्री कल्याण॥

नव दुर्गा की आरती, जो कोई नर गावे।
जन्म जन्म के पाप सब, दूर हो जावे॥

जय नवदुर्गा माता, जय नवदुर्गा माता।
सब जग की रखवाली, सब सुखों की दाता॥`,
    lyricsEn: `Jai Shailputri Mata, Jai Brahmacharini Mata.
Jai Chandraghanta Ma, Kushmanda Sukhdaata.

Skandamata the worshipped, Katyayini Maharaj,
Kalaratri, Mahagauri, Siddhidatri the auspicious.

The aarti of nine Durgas, whoever sings it,
All sins of many births are washed away.`,
  },
  {
    id: "aarti-h-16",
    titleEn: "Kali Mata Aarti",
    titleHi: "जय काली माता",
    deity: "Kali",
    faith: "Hindu",
    description:
      "Fierce and devotional aarti of Maa Kali, the destroyer of evil.",
    lyricsHi: `जय काली जय काली माता।
सब जग की तू रखवाली, रण में भी है दाता॥ जय काली माता॥

महाकाल की संगिनी, भैरव की है प्यारी।
काशी नगरी में बसे, मुक्तिदायिनी सारी॥ जय काली माता॥

चामुण्डा रूप धरे, शुम्भ निशुम्भ संहारी।
रक्तबीज का नाश किया, दैत्यों की काल भारी॥ जय काली माता॥

नर मुण्ड माल गले, लाल जिह्वा विस्तारी।
चरण में सेवक तेरे, शत-शत नमन तुम्हारी॥ जय काली माता॥`,
    lyricsEn: `Jai Kali Jai Kali Mata.
You guard the entire world, giver even in battle. Jai Kali Mata.

Companion of Mahakala, beloved of Bhairava,
Dwelling in the city of Kashi, granting liberation to all.

In the form of Chamunda, slayer of Shumbha and Nishumbha,
Destroyer of Raktabija, the great killer of demons.`,
  },
  {
    id: "aarti-h-17",
    titleEn: "Vaishno Devi Aarti",
    titleHi: "जय वैष्णो देवी माता",
    deity: "Vaishno Devi",
    faith: "Hindu",
    description:
      "Devotional aarti of Maa Vaishno Devi, the divine mother of Trikuta.",
    lyricsHi: `जय वैष्णो देवी माता।
सब दुखों की हर्ता, भक्तों की दाता॥ जय वैष्णो देवी माता॥

त्रिकूट पर्वत पर विराजे, महाकाली महालक्ष्मी।
महासरस्वती संग तुम, त्रिगुण शक्ति स्वामिनी॥ जय वैष्णो देवी माता॥

भव सागर से पार करो, कर्म बंधन काटो।
भक्त जनों की सुनो पुकार, दर्शन देकर तारो॥ जय वैष्णो देवी माता॥`,
    lyricsEn: `Jai Vaishno Devi Mata.
Remover of all sorrows, giver to devotees. Jai Vaishno Devi Mata.

Residing on Trikuta mountain, Mahakali, Mahalakshmi,
Together with Mahasaraswati, ruler of the three gunas.

Help us cross the ocean of existence, cut the bonds of karma,
Hear the call of your devotees, save them with your darshan.`,
  },
];
