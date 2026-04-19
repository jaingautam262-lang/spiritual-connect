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

export const SEED_AARTIS_1: AartiItem[] = [
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

গগনसम अंग कान्ति काली, राधिका चमक रही आली।
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
  {
    id: "aarti-h-18",
    titleEn: "Tulsi Mata Aarti",
    titleHi: "जय जय तुलसी माता",
    deity: "Tulsi Mata",
    faith: "Hindu",
    description:
      "Sacred aarti of Tulsi Mata, the holy basil plant revered in Hindu homes.",
    lyricsHi: `जय जय तुलसी माता, जय जय तुलसी माता।
सब जग की तू रखवाली, भक्तों की दाता॥ जय तुलसी माता॥

विष्णुप्रिया वृंदा देवी, तुलसी महारानी।
शालिग्राम के संग रहती, करती कल्याणी॥ जय तुलसी माता॥

हरि के चरणों में रहती, परम पवित्र काया।
जो तुलसी का सेवन करे, मिटती भवभाया॥ जय तुलसी माता॥`,
    lyricsEn: `Jai Jai Tulsi Mata, Jai Jai Tulsi Mata.
Guardian of the whole world, bestower on devotees. Jai Tulsi Mata.

Beloved of Vishnu, Goddess Vrinda, Queen Tulsi,
Dwelling with Shaligram, always auspicious.

Residing at the feet of Hari, her body supremely pure,
Whoever takes refuge in Tulsi, their worldly fears are removed.`,
  },
  {
    id: "aarti-h-19",
    titleEn: "Narmada Aarti",
    titleHi: "जय नर्मदे माता",
    deity: "Narmada Mata",
    faith: "Hindu",
    description:
      "Aarti of the sacred Narmada river, worshipped as a divine mother.",
    lyricsHi: `जय नर्मदे माता, मैया जय नर्मदे माता।
पर्वत से निकल बही, भक्तों की भवत्राता॥ जय नर्मदे माता॥

रेवा शंकरी अमरकण्टक, विमल नीर तेरा।
पाप ताप भय को हरो, करो भव से उबारा॥ जय नर्मदे माता॥`,
    lyricsEn: `Jai Narmade Mata, Maiya Jai Narmade Mata.
Flowing from the mountain, savior of devotees from worldly ocean. Jai Narmade Mata.

Rewa, Shankari, Amarkantak, your water is pure,
Remove sin, sorrow and fear, rescue from worldly existence.`,
  },
  {
    id: "aarti-h-20",
    titleEn: "Ganga Mata Aarti",
    titleHi: "जय गंगे माता",
    deity: "Ganga Mata",
    faith: "Hindu",
    description: "Sacred aarti of Mother Ganga, the holiest river in Hinduism.",
    lyricsHi: `जय गंगे माता, मैया जय गंगे माता।
जो नर तुमको ध्यावत, मनवांछित फल पाता॥ जय गंगे माता॥

चन्द्र सी उज्ज्वल काया, दिव्य रूप तेरा।
हिमालय से उतरी तू, तीनों लोक तेरा॥ जय गंगे माता॥

ब्रह्मा के कमण्डल से, भगीरथ के तप से।
धरती पर आई माँ, धन्य भयी जन सब से॥ जय गंगे माता॥`,
    lyricsEn: `Jai Gange Mata, Maiya Jai Gange Mata.
Whoever meditates on you, obtains desired blessings. Jai Gange Mata.

Body bright as the moon, your form divine,
You descended from Himalayas, all three worlds are yours.

From Brahma's kamandal, through Bhagirath's penance,
You came to earth, O Mother, blessed are all people.`,
  },
  {
    id: "aarti-h-21",
    titleEn: "Yamuna Aarti",
    titleHi: "जय यमुना माता",
    deity: "Yamuna Mata",
    faith: "Hindu",
    description:
      "Aarti of Yamuna Mata, the sacred river associated with Lord Krishna.",
    lyricsHi: `जय यमुना माता, मैया जय यमुना माता।
श्री यमुना जी, कालिंदी कहलाती, कृष्ण प्रिया विख्याती॥ जय यमुना माता॥

सूर्य की बेटी, यम की बहन।
वृंदावन में करती निवास, जहाँ खेले नंदनंदन॥ जय यमुना माता॥`,
    lyricsEn: `Jai Yamuna Mata, Maiya Jai Yamuna Mata.
Shri Yamuna Ji, called Kalindi, famous as beloved of Krishna. Jai Yamuna Mata.

Daughter of the Sun, sister of Yama,
Residing in Vrindavan where Nandanandan played.`,
  },
  {
    id: "aarti-h-22",
    titleEn: "Mata Rani Aarti",
    titleHi: "माता रानी की आरती",
    deity: "Mata Rani",
    faith: "Hindu",
    description:
      "Aarti of Mata Rani, the divine mother worshipped across North India.",
    lyricsHi: `माता की आरती, जो कोई जन गावे।
जन्म जन्म के पापड़े, सब दूर हो जावे॥

शेरों पर सवार, होके आ माता।
दुष्टों का संहार करे, भक्तों की भवत्राता॥

ॐ जय माता दी, माँ जय माता दी।
ॐ जय माता दी, माँ जय माता दी॥`,
    lyricsEn: `The aarti of Mata Rani, whoever sings it,
All sins of birth after birth are washed away.

Riding on lions, come O Mother,
Destroyer of the wicked, savior of devotees from worldly existence.

Om Jai Mata Di, Maa Jai Mata Di.`,
  },
  {
    id: "aarti-h-23",
    titleEn: "Sheetala Mata Aarti",
    titleHi: "जय शीतला माता",
    deity: "Sheetala Mata",
    faith: "Hindu",
    description:
      "Aarti of Sheetala Mata, goddess of health and disease prevention.",
    lyricsHi: `जय शीतला माता, मैया जय शीतला माता।
आदि ज्वर हरणी, दुःख दारिद्र हर्ता॥ जय शीतला माता॥

रंग भरी झोली लेके, करो जग कल्याणी।
गधे पर सवार हो, मटकी जल वाली॥ जय शीतला माता॥`,
    lyricsEn: `Jai Sheetala Mata, Maiya Jai Sheetala Mata.
Destroyer of fever from the beginning, remover of pain and poverty. Jai Sheetala Mata.

With a colorful bag, do good to the world,
Riding a donkey, carrying a pot of water.`,
  },
  {
    id: "aarti-h-24",
    titleEn: "Annapurna Mata Aarti",
    titleHi: "जय अन्नपूर्णा माता",
    deity: "Annapurna Mata",
    faith: "Hindu",
    description:
      "Aarti of Annapurna Mata, the goddess of food and nourishment.",
    lyricsHi: `जय अन्नपूर्णा माता, मैया जय अन्नपूर्णा माता।
काशी में विराजे, भूखों की भाग्यदाता॥ जय अन्नपूर्णा माता॥

सोने के कड़ाही में, पकाती भोजन।
शिव जी को भी परोसे, माँ का है आँगन॥ जय अन्नपूर्णा माता॥`,
    lyricsEn: `Jai Annapurna Mata, Maiya Jai Annapurna Mata.
Residing in Kashi, provider of fortune to the hungry. Jai Annapurna Mata.

In a golden cauldron, she cooks the food,
Even Lord Shiva is served in Mother's courtyard.`,
  },
  {
    id: "aarti-h-25",
    titleEn: "Baglamukhi Mata Aarti",
    titleHi: "जय बगलामुखी माता",
    deity: "Baglamukhi Mata",
    faith: "Hindu",
    description:
      "Aarti of Baglamukhi Mata, one of the ten Mahavidyas who paralyzes enemies.",
    lyricsHi: `जय बगलामुखी माता, जय बगलामुखी माता।
शत्रु स्तम्भन करने वाली, भक्तों की जग दाता॥ जय बगलामुखी माता॥

पीले वस्त्र धारण करके, पीले सिंहासन पर।
पीले फूलों से सजी तुम, दिव्य शक्ति घर पर॥ जय बगलामुखी माता॥`,
    lyricsEn: `Jai Baglamukhi Mata, Jai Baglamukhi Mata.
Paralyzer of enemies, giver to devotees of the world. Jai Baglamukhi Mata.

Wearing yellow garments, on a yellow throne,
Adorned with yellow flowers, divine power in the home.`,
  },
  {
    id: "aarti-h-26",
    titleEn: "Chandi Mata Aarti",
    titleHi: "जय चण्डी माता",
    deity: "Chandi Mata",
    faith: "Hindu",
    description: "Aarti of Chandi Mata, the fierce form of the divine mother.",
    lyricsHi: `जय चण्डी जय चण्डी, जय चण्डी माता।
महिषासुर मर्दिनी, भव भय हर्ता॥ जय चण्डी माता॥

अष्टभुजा धारणी, खड्ग चक्र धारी।
सिंह पर सवार हो, दुर्गा रूप प्यारी॥ जय चण्डी माता॥`,
    lyricsEn: `Jai Chandi Jai Chandi, Jai Chandi Mata.
Slayer of Mahishasura, destroyer of worldly fears. Jai Chandi Mata.

Eight-armed bearer, holding sword and discus,
Riding a lion, the beloved form of Durga.`,
  },
  {
    id: "aarti-h-27",
    titleEn: "Mahalakshmi Aarti",
    titleHi: "महालक्ष्मी की आरती",
    deity: "Mahalakshmi",
    faith: "Hindu",
    description:
      "Aarti of Goddess Mahalakshmi, the supreme form of the goddess of wealth.",
    lyricsHi: `जय महालक्ष्मी माता, जय महालक्ष्मी माता।
सत्युग त्रेता द्वापर कलियुग, सदा रहो सुखदाता॥

क्षीर सागर पर विराजत, शेषशायी संग।
चार भुजा कमल धारी, दिव्य मनोहर रंग॥

जय महालक्ष्मी माता, जय महालक्ष्मी माता।
धन धान्य सुख समृद्धि दो, हर लो दुख-आपदा॥`,
    lyricsEn: `Jai Mahalakshmi Mata, Jai Mahalakshmi Mata.
In Satyuga, Treta, Dwapara and Kaliyuga, always be the giver of happiness.

Residing on the milky ocean, with the serpent-reclining Lord,
Four-armed, bearing lotus, of divine and pleasing color.

Give wealth, grain, happiness and prosperity, remove sorrows and calamities.`,
  },
  {
    id: "aarti-h-28",
    titleEn: "Radha Rani Aarti",
    titleHi: "राधा रानी की आरती",
    deity: "Radha Rani",
    faith: "Hindu",
    description:
      "Devotional aarti of Shri Radha Rani, the beloved of Lord Krishna.",
    lyricsHi: `जय राधा रानी, जय जय राधा रानी।
बरसाने की लाडली, कृष्ण की मनमानी॥ जय राधा रानी॥

नंदगाँव के नटखट, राधिका के दीवाने।
वृंदावन की गलियों में, दोनों के अफसाने॥ जय राधा रानी॥

राधे राधे बोलो, मन होगा निर्मल।
गोपी के संग खेले, वृंदावन विमल॥ जय राधा रानी॥`,
    lyricsEn: `Jai Radha Rani, Jai Jai Radha Rani.
Darling of Barsana, beloved of Krishna's heart. Jai Radha Rani.

The mischievous one of Nandgaon, devoted to Radhika,
In the lanes of Vrindavan, the tales of both lovers.

Chant Radhe Radhe, the mind will become pure,
Playing with the Gopis, Vrindavan is pristine.`,
  },
  {
    id: "aarti-h-29",
    titleEn: "Sita Ram Aarti",
    titleHi: "जय सीताराम",
    deity: "Sita Ram",
    faith: "Hindu",
    description: "Aarti of Bhagwan Shri Ram and Maa Sita together.",
    lyricsHi: `जय सीताराम जय जय राम।
अयोध्या पति, जनकनन्दिनी, कौसल्या के दुलारे राम॥

दशरथ नंदन, रघुकुल भूषण, लक्ष्मण सहित विराजे।
हनुमत सेवित, सुग्रीव सखा, वानर सेना साजे॥

जय सीताराम जय जय राम।
भरत शत्रुघ्न, संग में, आनंदित हो सब काम॥`,
    lyricsEn: `Jai Sitaram Jai Jai Ram.
Lord of Ayodhya, daughter of Janaka, beloved son of Kaushalya, O Ram.

Son of Dasharatha, ornament of Raghu's clan, seated with Lakshmana,
Served by Hanuman, friend of Sugriva, with the monkey army arrayed.

Jai Sitaram Jai Jai Ram.
With Bharata and Shatrughna, all work is done joyfully.`,
  },
  {
    id: "aarti-h-30",
    titleEn: "Vitthal Aarti",
    titleHi: "जय विठ्ठला पाण्डुरंगा",
    deity: "Vitthal (Pandurang)",
    faith: "Hindu",
    description:
      "The beloved aarti of Bhagwan Vitthal of Pandharpur, central deity of Maharashtra.",
    lyricsHi: `जय विठ्ठला पाण्डुरंगा, हरि विठ्ठला पाण्डुरंगा।
पुण्डलिक वरदा हरि विठ्ठला, श्री विठ्ठला पाण्डुरंगा॥

भीमाकाठी उभा राहिला, विटेवरी पाय।
चिंतन मग्न भक्त पुण्डलिक, त्याचा घेतो हाय॥

जय विठ्ठला पाण्डुरंगा।`,
    lyricsEn: `Jai Vitthal Panduranga, Hari Vitthal Panduranga.
Pundalikavarda Hari Vitthal, Shri Vitthal Panduranga.

He stands at the banks of Bhima, feet on a brick,
In deep meditation the devotee Pundalika, He takes his call.`,
  },
  {
    id: "aarti-h-31",
    titleEn: "Tirupati Balaji Aarti",
    titleHi: "जय जय वेंकटेशा",
    deity: "Venkatesha (Balaji)",
    faith: "Hindu",
    description:
      "Aarti of Lord Venkateswara of Tirupati, one of the most visited temples in the world.",
    lyricsHi: `जय जय वेंकटेशा, श्री वेंकटेशा।
तिरुपति पर्वत वासी, भक्त-हृदय-निवासी॥

शेष गिरि पर राजे, लक्ष्मी संग सोहे।
चतुर्भुज कमलधारी, मन सबका मोहे॥

जय जय वेंकटेशा, श्री वेंकटेशा।
तिरुमला तिरुपति वासी, करो कल्याण महेशा॥`,
    lyricsEn: `Jai Jai Venkatesha, Shri Venkatesha.
Resident of Tirupati mountain, dwelling in devotees' hearts.

Reigning on Sesha Giri, glorious with Lakshmi,
Four-armed, bearing lotus, enchanting all minds.`,
  },
  {
    id: "aarti-h-32",
    titleEn: "Rameshwar Aarti",
    titleHi: "जय रामेश्वर देवा",
    deity: "Rameshwar (Shiva)",
    faith: "Hindu",
    description:
      "Aarti of Bhagwan Rameshwar, the Shiva Jyotirlinga established by Lord Ram.",
    lyricsHi: `जय रामेश्वर देवा, जय रामेश्वर देवा।
समुद्र तट पर विराजत, राम की सेवा॥

द्वादश ज्योतिर्लिंग में, तुम हो महादेव।
राम जी ने स्थापित किया, करते हैं सेवा॥

जय रामेश्वर देवा, जय रामेश्वर देवा।`,
    lyricsEn: `Jai Rameshwar Deva, Jai Rameshwar Deva.
Residing on the seashore, in service of Lord Ram.

Among the twelve Jyotirlingas, you are Mahadeva,
Established by Lord Ram, who worships you with devotion.`,
  },
  {
    id: "aarti-h-33",
    titleEn: "Somnath Aarti",
    titleHi: "जय सोमनाथ देवा",
    deity: "Somnath (Shiva)",
    faith: "Hindu",
    description:
      "Aarti of Bhagwan Somnath, the first and most sacred of the twelve Jyotirlingas.",
    lyricsHi: `जय सोमनाथ देवा, जय सोमनाथ देवा।
प्रथम ज्योतिर्लिंग तुम, सौराष्ट्र पथ-निवासी॥

चन्द्र ने तप करके, तुम्हें प्रसन्न किया।
सोमनाथ नाम पाया, शिव ने वरदान दिया॥

जय सोमनाथ देवा, जय सोमनाथ देवा।`,
    lyricsEn: `Jai Somnath Deva, Jai Somnath Deva.
You are the first Jyotirlinga, residing in the Saurashtra path.

The Moon performed penance and pleased you,
Obtained the name Somnath, Shiva granted the boon.`,
  },
  {
    id: "aarti-h-34",
    titleEn: "Mahakaleshwar Aarti",
    titleHi: "जय महाकालेश्वर देवा",
    deity: "Mahakaleshwar (Shiva)",
    faith: "Hindu",
    description:
      "Aarti of Mahakaleshwar, the Jyotirlinga at Ujjain, god of time and death.",
    lyricsHi: `जय महाकालेश्वर देवा, जय महाकाल शिवा।
उज्जयिनी पुरी में बसे, भस्म आरती शिवा॥

काल के भी काल तुम, महाकाल महेशा।
भक्तों की सुनो पुकार, दो अभय-निवेशा॥

जय महाकालेश्वर देवा, जय महाकाल शिवा।`,
    lyricsEn: `Jai Mahakaleshwar Deva, Jai Mahakala Shiva.
Residing in the city of Ujjayini, the Bhasma Aarti Shiva.

You are the death of death, Mahakala, Mahesha,
Hear the call of devotees, grant fearlessness.`,
  },
  {
    id: "aarti-h-35",
    titleEn: "Dwarkadheesh Aarti",
    titleHi: "जय द्वारकाधीश",
    deity: "Dwarkadheesh (Krishna)",
    faith: "Hindu",
    description:
      "Aarti of Lord Dwarkadheesh, the king of Dwarka, worshipped at the Dwarkadhish temple.",
    lyricsHi: `जय द्वारकाधीश, भव सागर तारण।
कुन्ती पुत्र सहायक, पाण्डव रण कारण॥

द्वारका नगरी में विराजत, रुक्मिणी के संग।
गोपियों के प्रिय तुम, रास रचाते रंग॥

जय द्वारकाधीश, जय द्वारकाधीश।`,
    lyricsEn: `Jai Dwarkadheesh, rescuer in the ocean of worldly existence,
Helper of Kunti's sons, the cause of the Pandava war.

Residing in the city of Dwarka, with Rukmini by his side,
Beloved of the Gopis, creating the colors of the Rasa Lila.`,
  },
  {
    id: "aarti-h-36",
    titleEn: "Jagannath Aarti",
    titleHi: "जय जगन्नाथ देवा",
    deity: "Jagannath",
    faith: "Hindu",
    description:
      "Aarti of Lord Jagannath of Puri, one of the four sacred dhams.",
    lyricsHi: `जय जगन्नाथ देवा, जय जगन्नाथ देवा।
पुरी धाम के स्वामी, सब जग के सेवा॥

बलभद्र सुभद्रा संग, रथयात्रा राजे।
नीलाचल पर्वत पर, दिव्य मूर्ति साजे॥

जय जगन्नाथ देवा, जय जगन्नाथ देवा।`,
    lyricsEn: `Jai Jagannath Deva, Jai Jagannath Deva.
Lord of the Puri Dham, servant of the whole world.

With Balabhadra and Subhadra, glorious in the Ratha Yatra,
On Nilachala mountain, the divine idol is adorned.`,
  },
  {
    id: "aarti-h-37",
    titleEn: "Kedarnath Aarti",
    titleHi: "जय केदारनाथ देवा",
    deity: "Kedarnath (Shiva)",
    faith: "Hindu",
    description:
      "Aarti of Bhagwan Kedarnath, the Jyotirlinga in the Himalayas.",
    lyricsHi: `जय केदारनाथ देवा, जय केदारनाथ देवा।
हिमालय पर विराजत, भक्तों की भवत्राता॥

पाँचों पाण्डव ने तप किया, प्रगट हुए शंकर।
केदारनाथ नाम पाया, प्रसन्न हुए मनभर॥

जय केदारनाथ देवा, जय केदारनाथ देवा।`,
    lyricsEn: `Jai Kedarnath Deva, Jai Kedarnath Deva.
Residing in the Himalayas, savior of devotees. 

The five Pandavas performed penance, Shankar appeared,
Obtained the name Kedarnath, pleased them fully.`,
  },
  {
    id: "aarti-h-38",
    titleEn: "Badrinath Aarti",
    titleHi: "जय बद्रीनाथ देवा",
    deity: "Badrinath (Vishnu)",
    faith: "Hindu",
    description:
      "Aarti of Lord Badrinath, one of the four dhams and the abode of Lord Vishnu in the Himalayas.",
    lyricsHi: `जय बद्रीनाथ देवा, जय बद्रीनाथ देवा।
हिमालय पर विराजत, नर-नारायण सेवा॥

अलकनंदा के तट पर, दिव्य ज्योति जलती।
बद्री की माला फूलों से, सजती नित रहती॥

जय बद्रीनाथ देवा, जय बद्रीनाथ देवा।`,
    lyricsEn: `Jai Badrinath Deva, Jai Badrinath Deva.
Residing in the Himalayas, in service of Nara-Narayana.

On the banks of Alaknanda, the divine flame burns,
The garland of Badri flowers adorns perpetually.`,
  },
  {
    id: "aarti-h-39",
    titleEn: "Kashi Vishwanath Aarti",
    titleHi: "जय काशी विश्वनाथ देवा",
    deity: "Kashi Vishwanath (Shiva)",
    faith: "Hindu",
    description:
      "Aarti of Bhagwan Kashi Vishwanath, the Jyotirlinga at Varanasi.",
    lyricsHi: `जय काशी विश्वनाथ, स्वामी जय काशी विश्वनाथ।
मृत्युंजय महादेव, भक्तों के साथ॥ जय काशी विश्वनाथ॥

गंगा तट पर विराजे, ज्योतिर्लिंग महेश।
भभूत भस्म लगाए, विश्वनाथ महेश॥ जय काशी विश्वनाथ॥`,
    lyricsEn: `Jai Kashi Vishwanath, Swami Jai Kashi Vishwanath.
Mrityunjaya Mahadeva, always with devotees. Jai Kashi Vishwanath.

Residing on the banks of Ganga, the Jyotirlinga Mahesha,
Wearing ash and bhasma, Vishwanath Mahesha.`,
  },
  {
    id: "aarti-h-40",
    titleEn: "Murugan (Kartikeya) Aarti",
    titleHi: "जय कार्तिकेय देवा",
    deity: "Kartikeya (Murugan)",
    faith: "Hindu",
    description:
      "Aarti of Lord Kartikeya (Murugan), the son of Shiva and commander of divine forces.",
    lyricsHi: `जय कार्तिकेय देवा, जय षणमुख देवा।
कुमार स्वामी सुब्रह्मण्य, शक्तिधर स्वामी॥

मोर वाहन पर सवार हो, शक्ति हाथ लेकर।
तारकासुर वध किया, देवों को जिता कर॥

जय कार्तिकेय देवा, जय षणमुख देवा।`,
    lyricsEn: `Jai Kartikeya Deva, Jai Shanmukha Deva.
Kumara Swami, Subrahmanya, bearer of the Shakti spear.

Riding on a peacock, holding the Shakti weapon,
Slew Tarakasura, bringing victory to the gods.`,
  },
  {
    id: "aarti-h-41",
    titleEn: "Ayappa Aarti",
    titleHi: "जय अयप्पा देवा",
    deity: "Ayyappa",
    faith: "Hindu",
    description:
      "Aarti of Lord Ayyappa of Sabarimala, born of Shiva and Vishnu's union.",
    lyricsHi: `जय अयप्पा देवा, शबरी नाथ देवा।
शिव विष्णु के सुत हो, भक्त-हृदय-निवासी॥

शबरी मला पर्वत पर, दिव्य ज्योति जलाई।
अठारह सीढ़ियाँ चढ़कर, दर्शन पाए जन भाई॥

जय अयप्पा देवा, शबरी नाथ देवा।`,
    lyricsEn: `Jai Ayyappa Deva, Sabarinath Deva.
Son of Shiva and Vishnu, dwelling in devotees' hearts.

On Sabarimala mountain, the divine flame is lit,
Climbing eighteen steps, devotees get darshan.`,
  },
  {
    id: "aarti-h-42",
    titleEn: "Navgrah Aarti",
    titleHi: "नवग्रह आरती",
    deity: "Navgraha",
    faith: "Hindu",
    description:
      "Aarti of the nine planetary deities who govern astrological influences.",
    lyricsHi: `जय जय नवग्रह देवा, जय जय नवग्रह देवा।
सूर्य चन्द्र मंगल बुध, गुरु शुक्र शनि देवा॥

राहु केतु के संग मिल, नव गृह सजे।
पूजत ग्रह के भक्त, दुखों से उबरे॥

जय जय नवग्रह देवा, जय जय नवग्रह देवा।`,
    lyricsEn: `Jai Jai Navgrah Deva, Jai Jai Navgrah Deva.
Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn.

Together with Rahu and Ketu, the nine planets are adorned,
Devotees who worship the planets, rise above their sorrows.`,
  },
  {
    id: "aarti-h-43",
    titleEn: "Parvati Mata Aarti",
    titleHi: "जय पार्वती माता",
    deity: "Parvati",
    faith: "Hindu",
    description:
      "Aarti of Goddess Parvati, consort of Shiva and divine mother of the universe.",
    lyricsHi: `जय पार्वती माता, जय पार्वती माता।
ब्रह्म सनातन देवी, शुभ फल की दाता॥ जय पार्वती माता॥

अरिकुल पद्मा देवी, जग मे ख्याती।
देव वंदिता दुर्गा, विष्णु कल्याणी॥ जय पार्वती माता॥

शिव शिव भोले भाले, भोले की भवानी।
करती आनन्द नित्य, सुखदा कल्याणी॥ जय पार्वती माता॥`,
    lyricsEn: `Jai Parvati Mata, Jai Parvati Mata.
Brahma's eternal goddess, giver of auspicious fruits. Jai Parvati Mata.

Lotus-goddess, renowned in the world,
Worshipped by gods, Durga, auspicious to Vishnu.

Shiva Shiva, the simple-hearted Bhavani of Bhola,
Perpetually joyful, giver of happiness, auspicious.`,
  },
  {
    id: "aarti-h-44",
    titleEn: "Mangala Gauri Aarti",
    titleHi: "जय मंगला गौरी",
    deity: "Mangala Gauri",
    faith: "Hindu",
    description:
      "Aarti of Mangala Gauri, a form of Parvati worshipped by women for the well-being of their husbands.",
    lyricsHi: `जय मंगला गौरी, जय जय गौरी माता।
सौभाग्यदायिनी देवी, भक्तों की भवत्राता॥

सोलह मंगलवार के व्रत में, माँ की महिमा भारी।
पति की रक्षा करती हो, सुहागिन हित प्यारी॥

जय मंगला गौरी, जय जय गौरी माता।`,
    lyricsEn: `Jai Mangala Gauri, Jai Jai Gauri Mata.
Goddess bestowing good fortune, savior of devotees. 

In the sixteen Tuesday fasts, the glory of Mother is great,
She protects the husband, dear to the welfare of wives.`,
  },
  {
    id: "aarti-h-45",
    titleEn: "Bhairav Baba Aarti",
    titleHi: "जय भैरव बाबा",
    deity: "Bhairav",
    faith: "Hindu",
    description:
      "Aarti of Kaal Bhairav, the fierce protector of Kashi and guardian of Shiva.",
    lyricsHi: `जय भैरव बाबा, जय काल भैरव।
काशी के कोतवाल, शिव के भैरव॥

कुत्ते की सवारी, डमरू बजाते।
भक्तों की रक्षा में, शीघ्र चले आते॥

जय भैरव बाबा, जय काल भैरव।`,
    lyricsEn: `Jai Bhairav Baba, Jai Kala Bhairava.
Police chief of Kashi, Bhairava of Shiva.

Riding a dog, playing the Damaru drum,
Coming quickly in protection of devotees.`,
  },
  {
    id: "aarti-h-46",
    titleEn: "Nandi Aarti",
    titleHi: "जय नन्दी देवा",
    deity: "Nandi",
    faith: "Hindu",
    description:
      "Aarti of Nandi, the sacred bull and devoted gatekeeper of Lord Shiva.",
    lyricsHi: `जय नन्दी देवा, जय नंदीश्वर।
शिव के वाहन हो, द्वारपाल ईश्वर॥

कैलास पर विराजे, महादेव सेवक।
शिव भक्ति में डूबे, परम पावन सेवक॥

जय नन्दी देवा, जय नंदीश्वर।`,
    lyricsEn: `Jai Nandi Deva, Jai Nandishwar.
You are Shiva's vehicle, gatekeeper of God.

Residing on Kailash, servant of Mahadeva,
Immersed in Shiva's devotion, supremely holy servant.`,
  },
  {
    id: "aarti-h-47",
    titleEn: "Dattatreya Aarti",
    titleHi: "जय दत्त दिगम्बर",
    deity: "Dattatreya",
    faith: "Hindu",
    description:
      "Aarti of Lord Dattatreya, the combined form of Brahma, Vishnu, and Shiva.",
    lyricsHi: `जय दत्त दिगम्बर, दत्त दिगम्बर, श्री गुरुदेव दत्त॥

आवो माझ्या घरा, दत्त दिगंबर।
द्विज नामाचा, भिल्ल भक्त देव॥

अविनाश अनंत, अद्भुत स्वरूप।
ब्रह्मा विष्णु शिव, त्रिगुण स्वरूप॥

जय दत्त दिगम्बर, दत्त दिगम्बर, श्री गुरुदेव दत्त॥`,
    lyricsEn: `Jai Datt Digambar, Datt Digambar, Shri Gurudev Datt.

Come to my home, Datt Digambar,
God of the Dvija name, Bhil devotee.

Imperishable, infinite, wonderful form,
Brahma, Vishnu, Shiva, the form of the three gunas.`,
  },
  {
    id: "aarti-h-48",
    titleEn: "Hanuman Chalisa Aarti",
    titleHi: "हनुमान की आरती (विशेष)",
    deity: "Hanuman",
    faith: "Hindu",
    description:
      "Special concluding aarti of Hanuman, sung after Hanuman Chalisa recitation.",
    lyricsHi: `आरती की जय हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥

जाके बल से गिरिवर काँपे।
रोग दोष जाके निकट न झाँके॥

अञ्जनिपुत्र महाबलदाई।
संतन के प्रभु सदा सहाई॥

देबीड़ा रघुपति पठाए।
लंका जारि सिया सुधि लाई॥`,
    lyricsEn: `Aarti ki jai Hanuman Lala ki,
Dusht dalan Raghunath kala ki.

Whose strength makes mountains tremble,
Near whom no disease or misfortune dares approach.

Son of Anjana, the mighty one,
Always a helper to the saints.

Sent by Raghupati, burnt Lanka, and brought news of Sita.`,
  },
  {
    id: "aarti-h-49",
    titleEn: "Ramdevji (Baba Ramdev) Aarti",
    titleHi: "जय रामदेव बाबा",
    deity: "Baba Ramdev",
    faith: "Hindu",
    description:
      "Aarti of Baba Ramdevji, a folk deity widely worshipped in Rajasthan.",
    lyricsHi: `जय रामदेव बाबा, जय रामदेव बाबा।
रुणिचे धाम में विराजे, भक्तों के भाग्यदाता॥

काली-बाई की रक्षा की, डाली मुक्ति धारा।
दलित दीन के उद्धारक, सबका है सहारा॥

जय रामदेव बाबा, जय रामदेव बाबा।`,
    lyricsEn: `Jai Ramdev Baba, Jai Ramdev Baba.
Residing in Runicha dham, bestower of fortune to devotees.

Protected Kali-bai, granted the stream of liberation,
Savior of the oppressed and poor, support of all.`,
  },
  {
    id: "aarti-h-50",
    titleEn: "Mehandipur Balaji Aarti",
    titleHi: "जय मेहंदीपुर बालाजी",
    deity: "Mehandipur Balaji (Hanuman)",
    faith: "Hindu",
    description:
      "Aarti of Mehandipur Balaji, a powerful form of Hanuman worshipped in Rajasthan.",
    lyricsHi: `जय मेहंदीपुर बालाजी, जय बालाजी महाराज।
रोग दोष भूत-प्रेत से, करो निर्मल काज॥

भीमगढ़ की घाटी में, बालाजी विराजत।
त्रेता का सिंहासन तेरा, सबका मन हर्षित॥

जय मेहंदीपुर बालाजी, जय बालाजी महाराज।`,
    lyricsEn: `Jai Mehandipur Balaji, Jai Balaji Maharaj.
From disease, afflictions, and evil spirits, cleanse and purify.

In the valleys of Bhimgarh, Balaji is seated,
Your throne from Treta age, everyone's heart is joyous.`,
  },
  {
    id: "aarti-h-51",
    titleEn: "Salasar Balaji Aarti",
    titleHi: "जय सालासर बालाजी",
    deity: "Salasar Balaji (Hanuman)",
    faith: "Hindu",
    description:
      "Aarti of Salasar Balaji, the famous Hanuman temple in Rajasthan.",
    lyricsHi: `जय सालासर बालाजी, हे हनुमान प्रभु।
सालासर धाम में, विराजे दिव्य विभु॥

दाड़ी-मूँछ वाले बालाजी, अनोखी पहचान।
भक्त आते दर्शन को, लेते आशीर्वाद॥

जय सालासर बालाजी, हे हनुमान प्रभु।`,
    lyricsEn: `Jai Salasar Balaji, O Hanuman Prabhu.
In Salasar Dham, the divine all-pervading One is seated.

Balaji with beard and mustache, unique identity,
Devotees come for darshan, receiving blessings.`,
  },
  {
    id: "aarti-h-52",
    titleEn: "Khatu Shyam Aarti",
    titleHi: "जय खाटू श्याम बाबा",
    deity: "Khatu Shyam (Krishna/Barbarika)",
    faith: "Hindu",
    description:
      "Aarti of Khatu Shyam, the benevolent deity of Rajasthan, form of Barbarika.",
    lyricsHi: `जय खाटू श्याम हारे का सहारा।
श्याम बाबा की आरती उतारो॥

बर्बरीक की कथा सुनाई।
तीन बाण लेकर, वीरता दिखाई॥

हारे का सहारा, बेड़ा पार करना।
खाटू धाम में दर्शन करना॥

जय खाटू श्याम हारे का सहारा।`,
    lyricsEn: `Jai Khatu Shyam, support of the defeated,
Perform the aarti of Shyam Baba.

The story of Barbarika is told,
With three arrows, he showed his valor.

Support of the losing side, cross the boat,
Take darshan in Khatu Dham.`,
  },
  {
    id: "aarti-h-53",
    titleEn: "Brihaspati (Guru) Dev Aarti",
    titleHi: "जय बृहस्पति देवा",
    deity: "Brihaspati (Jupiter)",
    faith: "Hindu",
    description:
      "Aarti of Brihaspati Dev, the planet Jupiter and guru of the gods.",
    lyricsHi: `जय बृहस्पति देवा, ॐ जय बृहस्पति देवा।
छिन छिन भोग लगाऊँ, कदली फल मेवा॥ ॐ जय बृहस्पति देवा॥

तुम पूरण परमात्मा, तुम अन्तर्यामी।
जगत पिता विश्वम्भर, स्वामी तुम स्वामी॥ ॐ जय बृहस्पति देवा॥`,
    lyricsEn: `Jai Brihaspati Deva, Om Jai Brihaspati Deva.
Every moment I offer banana fruit and food. Om Jai Brihaspati Deva.

You are the complete supreme soul, the inner knower,
Father of the world, Vishwambhar, you are the master of all.`,
  },
  {
    id: "aarti-h-54",
    titleEn: "Shani Dev Aarti",
    titleHi: "जय जय शनि देवा",
    deity: "Shani Dev",
    faith: "Hindu",
    description:
      "Aarti of Shani Dev, the planet Saturn and deity of karmic justice.",
    lyricsHi: `जय जय शनि देवा, ॐ जय शनि देवा।
सूर्य पुत्र कृपालु, दीनन के देवा॥ ॐ जय शनि देवा॥

छाया मात के नन्दन, मंद गति स्वामी।
नीलाम्बर धारी तुम, कर्म फल दाता॥ ॐ जय शनि देवा॥`,
    lyricsEn: `Jai Jai Shani Deva, Om Jai Shani Deva.
Merciful son of the Sun, god of the poor and humble. Om Jai Shani Deva.

Son of Chhaya (Shani's mother), the slow-moving lord,
Wearing dark blue garments, giver of karma's fruits.`,
  },
  {
    id: "aarti-h-55",
    titleEn: "Rahu Dev Aarti",
    titleHi: "जय राहु देवा",
    deity: "Rahu",
    faith: "Hindu",
    description:
      "Aarti of Rahu, the shadow planet that causes eclipses in Hindu astrology.",
    lyricsHi: `जय राहु देवा, जय राहु देवा।
अंधकार के स्वामी, भक्तों के सेवा॥

राहु काल में पूजत, पाप दूर जाते।
सूर्य चन्द्र को ग्रसत, जग को भयभीत॥

जय राहु देवा, जय राहु देवा।`,
    lyricsEn: `Jai Rahu Deva, Jai Rahu Deva.
Master of darkness, in service of devotees.

Worshipped during Rahu Kaal, sins are washed away,
Swallowing sun and moon, making the world fearful.`,
  },
  {
    id: "aarti-h-56",
    titleEn: "Kuber Dev Aarti",
    titleHi: "जय कुबेर देवा",
    deity: "Kuber",
    faith: "Hindu",
    description:
      "Aarti of Kuber Dev, the god of wealth and treasurer of the gods.",
    lyricsHi: `जय कुबेर देवा, जय धन के स्वामी।
नित्य करो कृपा, धन-लक्ष्मी अंतर्यामी॥

उत्तर दिशा के स्वामी, यक्षों के राजा।
अलकापुरी में बसे, धन का भंडार छाजा॥

जय कुबेर देवा, जय धन के स्वामी।`,
    lyricsEn: `Jai Kuber Deva, Jai master of wealth.
Bestow grace always, inner knower of wealth-Lakshmi.

Master of the north direction, king of Yakshas,
Residing in Alakapuri, overflowing treasury of wealth.`,
  },
  {
    id: "aarti-h-57",
    titleEn: "Indra Dev Aarti",
    titleHi: "जय इन्द्र देवा",
    deity: "Indra Dev",
    faith: "Hindu",
    description:
      "Aarti of Indra Dev, king of the gods and lord of rain and thunder.",
    lyricsHi: `जय इन्द्र देवा, जय इन्द्र देवा।
देवताओं के राजा, मेघ-पति सेवा॥

वज्र धारण करके, असुरों को हारा।
स्वर्गलोक में राजत, सबका रखवाला॥

जय इन्द्र देवा, जय इन्द्र देवा।`,
    lyricsEn: `Jai Indra Deva, Jai Indra Deva.
King of the gods, serving as lord of clouds.

Wielding the thunderbolt, he defeated the demons,
Reigning in the heaven world, protector of all.`,
  },
  {
    id: "aarti-h-58",
    titleEn: "Varun Dev Aarti",
    titleHi: "जय वरुण देवा",
    deity: "Varun Dev",
    faith: "Hindu",
    description:
      "Aarti of Varun Dev, the Vedic god of waters, oceans, and cosmic order.",
    lyricsHi: `जय वरुण देवा, जल के स्वामी।
सात समुद्र के राजा, ऋत के अन्तर्यामी॥

पाश हाथ में लेकर, पाप को दण्ड दो।
भक्त जनों पर करुणा, अमृत जल छिड़को॥

जय वरुण देवा, जल के स्वामी।`,
    lyricsEn: `Jai Varun Deva, master of water.
King of the seven seas, inner knower of cosmic order.

Holding a noose, punish the sinners,
Have compassion on devotees, sprinkle nectar water.`,
  },
  {
    id: "aarti-h-59",
    titleEn: "Agni Dev Aarti",
    titleHi: "जय अग्नि देवा",
    deity: "Agni Dev",
    faith: "Hindu",
    description:
      "Aarti of Agni Dev, the Vedic god of fire who accepts sacrificial offerings.",
    lyricsHi: `जय अग्नि देवा, ज्वाला के स्वामी।
यज्ञ-हवि के ग्राहक, देवों के अन्तर्यामी॥

पवित्र अग्नि जलाओ, पाप नाश करो।
हव्यवाहन देवेश, शुभ आशीर्वाद दो॥

जय अग्नि देवा, ज्वाला के स्वामी।`,
    lyricsEn: `Jai Agni Deva, master of flames.
Receiver of yajna offerings, inner knower of the gods.

Light the sacred fire, destroy sins,
O Havyavahana Devesh, give auspicious blessings.`,
  },
  {
    id: "aarti-h-60",
    titleEn: "Gayatri Mata Aarti",
    titleHi: "जय गायत्री माता",
    deity: "Gayatri Mata",
    faith: "Hindu",
    description:
      "Aarti of Gayatri Mata, embodiment of the sacred Gayatri Mantra and Vedic wisdom.",
    lyricsHi: `जय गायत्री माता, मैया जय गायत्री माता।
सावित्री सत्यवती, वेद-मात ख्याता॥ जय गायत्री माता॥

ब्रह्म तेज की देवी, बुद्धि प्रदायिनी।
ब्रह्मा की प्रिया हो तुम, विद्या-विधायिनी॥ जय गायत्री माता॥`,
    lyricsEn: `Jai Gayatri Mata, Maiya Jai Gayatri Mata.
Savitri, Satyavati, renowned as mother of the Vedas. Jai Gayatri Mata.

Goddess of Brahma's radiance, giver of intelligence,
You are Brahma's beloved, creator of knowledge.`,
  },
  {
    id: "aarti-h-61",
    titleEn: "Karva Chauth Mata Aarti",
    titleHi: "जय करवा माता",
    deity: "Karva Mata",
    faith: "Hindu",
    description:
      "Aarti of Karva Mata, worshipped by married women on Karva Chauth for husbands' long life.",
    lyricsHi: `जय करवा माता, जय करवा माता।
सुहागिनों की माता, पति की रक्षक दाता॥

रात को चाँद देखकर, व्रत का पारण होता।
पति की दीर्घायु के लिए, प्रण लेती सुहागिन नाता॥

जय करवा माता, जय करवा माता।`,
    lyricsEn: `Jai Karva Mata, Jai Karva Mata.
Mother of married women, protector and giver for husbands.

Seeing the moon at night, the fast is broken,
For the long life of the husband, the wife makes her vow.`,
  },
  {
    id: "aarti-h-62",
    titleEn: "Bhumi Mata Aarti",
    titleHi: "जय भूमि माता",
    deity: "Bhumi Mata (Earth)",
    faith: "Hindu",
    description: "Aarti of Bhumi Mata (Mother Earth), who sustains all life.",
    lyricsHi: `जय भूमि माता, जय भूमि माता।
सब जीवों की पालनकर्ता, सबकी है दाता॥

पर्वत नदी वन उपजाती, अन्न देती भारी।
विष्णुप्रिया वसुन्धरा, सबसे प्यारी॥

जय भूमि माता, जय भूमि माता।`,
    lyricsEn: `Jai Bhumi Mata, Jai Bhumi Mata.
Sustainer of all living beings, giver to all.

Producing mountains, rivers, forests, giving abundant food,
Vasundhara, beloved of Vishnu, dearest of all.`,
  },
  {
    id: "aarti-h-63",
    titleEn: "Akhand Jyoti Aarti",
    titleHi: "जय अखण्ड ज्योति",
    deity: "Akhand Jyoti (Divine Light)",
    faith: "Hindu",
    description:
      "Aarti of the eternal, unbroken divine flame that symbolizes God's presence.",
    lyricsHi: `जय अखण्ड ज्योति, जय अखण्ड ज्योति।
घर घर में जले, भगवान की ज्योति॥

नित्य जले दीपक, तिमिर मिटाता।
ब्रह्म ज्योति स्वरूपी, मोक्ष दिलाता॥

जय अखण्ड ज्योति, जय अखण्ड ज्योति।`,
    lyricsEn: `Jai Akhand Jyoti, Jai Akhand Jyoti.
God's flame burns in every home.

The lamp burns perpetually, removing darkness,
In the form of Brahma's light, granting liberation.`,
  },
  {
    id: "aarti-h-64",
    titleEn: "Pitru Dev Aarti",
    titleHi: "जय पितृदेव",
    deity: "Pitru Dev",
    faith: "Hindu",
    description:
      "Aarti of Pitru Dev, the ancestral deities, worshipped during Pitru Paksha.",
    lyricsHi: `जय पितृदेव, जय पितृदेव।
पितर तर्पण से प्रसन्न हो, दो शुभ सेवा॥

श्राद्ध में आओ पितृगण, भोजन स्वीकारो।
सन्तान को आशीर्वाद दे, भव से उबारो॥

जय पितृदेव, जय पितृदेव।`,
    lyricsEn: `Jai Pitru Dev, Jai Pitru Dev.
Be pleased with the offering to ancestors, grant auspicious service.

Come O ancestors during Shraddha, accept the food offerings,
Give blessings to your descendants, save them from worldly existence.`,
  },
  {
    id: "aarti-h-65",
    titleEn: "Panchdev Aarti (Panch Devata)",
    titleHi: "पञ्चदेव आरती",
    deity: "Panch Devata",
    faith: "Hindu",
    description:
      "Aarti of the five principal deities: Ganesha, Vishnu, Shiva, Devi, and Surya.",
    lyricsHi: `जय गणपति, जय विष्णु, जय शिव शंकर।
जय जगदम्बे, जय सूर्यदेव भास्कर॥

पञ्चदेव की पूजा करो, घर में सुख-शान्ति आवे।
जो करे पूजन प्रतिदिन, भव सागर से तर जावे॥

जय पञ्चदेव, जय पञ्चदेव।`,
    lyricsEn: `Jai Ganapati, Jai Vishnu, Jai Shiva Shankar.
Jai Jagadamba, Jai Surya Dev Bhaskar.

Worship the five deities, happiness and peace come to the home,
Whoever worships daily, crosses the ocean of worldly existence.`,
  },
  {
    id: "aarti-h-66",
    titleEn: "Mangal Aarti (Morning Aarti)",
    titleHi: "मंगल आरती",
    deity: "Ishwar (God)",
    faith: "Hindu",
    description:
      "The auspicious morning aarti sung at dawn to welcome the day with divine blessings.",
    lyricsHi: `मंगल भवन अमंगल हारी।
द्रवउ सो दशरथ अजिर बिहारी॥

मंगल करो अमंगल हारो।
भक्तन को आनन्द उजियारो॥

जय मंगल आरती, जय मंगल आरती।
प्रभु की जय जयकारी, आनन्दित हो सारी॥`,
    lyricsEn: `Mangal Bhavan Amangal Hari.
May He who destroys the inauspicious, Dasharatha's son who wanders the courtyard, grant grace.

Create auspiciousness, remove inauspiciousness,
Bring light and joy to devotees.

Jai Mangal Aarti, Jai Mangal Aarti.
Victory to the Lord, may all be filled with joy.`,
  },
];
