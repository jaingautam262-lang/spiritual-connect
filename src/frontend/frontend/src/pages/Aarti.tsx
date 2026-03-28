import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useGetAllDevotionalContents } from "../hooks/useQueries";

interface AartiItem {
  id: string;
  titleEn: string;
  titleHi: string;
  deity: string;
  faith: "Hindu" | "Jain" | "Sikh";
  description: string;
  lyricsHi: string;
  lyricsEn: string;
}

const SEED_AARTIS: AartiItem[] = [
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
  {
    id: "aarti-14",
    titleEn: "Rishabhanatha Aarti",
    titleHi: "ऋषभदेव आरती",
    deity: "Rishabhadeva",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Rishabhanatha, the first Tirthankar of Jainism.",
    lyricsHi: `जय ऋषभदेव जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

आदिनाथ तीर्थंकर प्रथम, मोक्षमार्ग के दाता।
संसार सागर से पार कर, हमको मुक्ति मार्ग बताता॥

श्वेत कमल पर विराजत हो, ध्यान में मग्न सदा।
ज्ञान-दर्शन-चारित्र का, पथ दिखाते हैं सदा॥

जय ऋषभदेव जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Rishabhadeva Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

Hail Adinath, the first Tirthankar,
Bestower of the path to liberation.
Crossing the ocean of worldly existence,
Showing us the path to moksha.
Seated on a white lotus in eternal meditation,
Always showing the path of knowledge, vision, and conduct.`,
  },
  {
    id: "aarti-15",
    titleEn: "Mahavira Aarti",
    titleHi: "वर्धमान महावीर आरती",
    deity: "Mahavira",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Mahavira, the 24th and last Tirthankar of the current era.",
    lyricsHi: `जय महावीर जिनेश्वर देवा।
तुमने दिखाई अहिंसा की सेवा॥

चौबीसवें तीर्थंकर जग में आए।
सत्य और अहिंसा का पाठ पढ़ाए॥

वर्धमान नाम था तुम्हारा जगत में।
सब जीव समान हैं तुम्हारी संगत में॥

जय महावीर जिनेश्वर देवा।
तुमने दिखाई अहिंसा की सेवा॥`,
    lyricsEn: `Jai Mahavir Jineshwar Deva.
Tumne dikhayi ahimsa ki seva.

The 24th Tirthankar came into the world,
Teaching the lessons of truth and non-violence.
Your name was Vardhaman in this world,
In your company, all living beings are equal.`,
  },
  {
    id: "aarti-j-3",
    titleEn: "Sambhavanatha Aarti",
    titleHi: "सम्भवनाथ आरती",
    deity: "Sambhavanatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Sambhavanatha, the 3rd Tirthankar of Jainism.",
    lyricsHi: `जय सम्भवनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

तृतीय तीर्थंकर जग में आए, मोक्ष-मार्ग बताया।
श्रावस्ती नगरी में जन्मे, जगत को राह दिखाया॥

ध्यान-धारणा में लीन रहते, ज्ञान का दीप जलाया।
अश्व लांछन धारण किया, त्रिभुवन को है भाया॥

जय सम्भवनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Sambhavanatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 3rd Tirthankar came into the world, showing the path to liberation.
Born in Shravasti city, showing the world the way.

Absorbed in meditation, he lit the lamp of knowledge.
Bearing the horse symbol, pleasing the three worlds.`,
  },
  {
    id: "aarti-j-4",
    titleEn: "Abhinandananatha Aarti",
    titleHi: "अभिनन्दननाथ आरती",
    deity: "Abhinandananatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Abhinandananatha, the 4th Tirthankar of Jainism.",
    lyricsHi: `जय अभिनन्दननाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

चतुर्थ तीर्थंकर अयोध्या में जन्मे, महिमा है अपार।
बन्दर लांछन धारण किया, कर्म का किया संहार॥

पञ्चकल्याणक पावन तेरे, तीनों लोक में छाया।
अहिंसा परमो धर्म का, सन्देश तुमने दिखाया॥

जय अभिनन्दननाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Abhinandananatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 4th Tirthankar born in Ayodhya, of infinite glory.
Bearing the monkey symbol, he destroyed karma.

Your five auspicious events are sacred, spreading across three worlds.
You showed the message of non-violence as the supreme religion.`,
  },
  {
    id: "aarti-j-5",
    titleEn: "Sumatinatha Aarti",
    titleHi: "सुमतिनाथ आरती",
    deity: "Sumatinatha",
    faith: "Jain",
    description: "Aarti of Bhagwan Sumatinatha, the 5th Tirthankar of Jainism.",
    lyricsHi: `जय सुमतिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

पञ्चम तीर्थंकर जग में आए, सुमति का पाठ पढ़ाया।
अयोध्या की धरती पर, ज्ञान का दीप जलाया॥

चकोर पक्षी लांछन तेरा, मति ज्ञान का दाता।
सम्यक् दर्शन मार्ग दिखाते, जग के तुम विधाता॥

जय सुमतिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Sumatinatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 5th Tirthankar came into the world, teaching the lesson of right wisdom.
On the land of Ayodhya, he lit the lamp of knowledge.

Your symbol is the Chakora bird, the giver of right knowledge.
Showing the path of right perception, you are the creator of the world.`,
  },
  {
    id: "aarti-j-6",
    titleEn: "Padmaprabha Aarti",
    titleHi: "पद्मप्रभ आरती",
    deity: "Padmaprabha",
    faith: "Jain",
    description: "Aarti of Bhagwan Padmaprabha, the 6th Tirthankar of Jainism.",
    lyricsHi: `जय पद्मप्रभ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

षष्ठ तीर्थंकर कौशाम्बी में जन्मे, पद्म समान काया।
लाल वर्ण की कमल छटा, जग को है भाया॥

पद्म लांछन धारण किया, भव-सागर से तारा।
जन्म-मरण के बंधन तोड़े, मुक्ति का मार्ग न्यारा॥

जय पद्मप्रभ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Padmaprabha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 6th Tirthankar born in Kaushambi, with a body like a lotus.
The red lotus beauty pleased the world.

Bearing the lotus symbol, he ferried across the ocean of existence.
Breaking the bonds of birth and death, showing the unique path to liberation.`,
  },
  {
    id: "aarti-j-7",
    titleEn: "Suparshvanatha Aarti",
    titleHi: "सुपार्श्वनाथ आरती",
    deity: "Suparshvanatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Suparshvanatha, the 7th Tirthankar of Jainism.",
    lyricsHi: `जय सुपार्श्वनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

सप्तम तीर्थंकर वाराणसी में जन्मे, महिमा है अपार।
स्वस्तिक लांछन धारण किया, शुभ का किया विस्तार॥

हरे वर्ण की दिव्य काया, ज्ञान का दीप जलाया।
सम्यक् चारित्र का मार्ग दिखाते, जग को है भाया॥

जय सुपार्श्वनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Suparshvanatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 7th Tirthankar born in Varanasi, of infinite glory.
Bearing the Swastika symbol, he spread auspiciousness.

His divine form of green color, he lit the lamp of knowledge.
Showing the path of right conduct, pleasing the world.`,
  },
  {
    id: "aarti-j-8",
    titleEn: "Chandraprabha Aarti",
    titleHi: "चन्द्रप्रभ आरती",
    deity: "Chandraprabha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Chandraprabha, the 8th Tirthankar of Jainism.",
    lyricsHi: `जय चन्द्रप्रभ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

अष्टम तीर्थंकर चन्द्रपुरी में जन्मे, चन्द्र समान काया।
श्वेत वर्ण चन्द्र लांछन, जग में प्रकाश फैलाया॥

मोह-ममता को त्याग कर, मुक्ति-पथ दिखाया।
तीनों लोक में तेरी जय-जयकार, जग ने शीश नवाया॥

जय चन्द्रप्रभ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Chandraprabha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 8th Tirthankar born in Chandrapuri, with a moon-like body.
White complexion with moon symbol, spreading light in the world.

Renouncing attachment, he showed the path to liberation.
Victory chants in all three worlds, the world bowed its head.`,
  },
  {
    id: "aarti-j-9",
    titleEn: "Suvidhinatha (Pushpadanta) Aarti",
    titleHi: "सुविधिनाथ आरती",
    deity: "Suvidhinatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Suvidhinatha (Pushpadanta), the 9th Tirthankar of Jainism.",
    lyricsHi: `जय सुविधिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

नवम तीर्थंकर काकन्दी में जन्मे, पुष्पदन्त नाम पाया।
मकर लांछन धारण किया, जग में ज्ञान फैलाया॥

श्वेत वर्ण की दिव्य काया, ध्यान में मग्न रहते।
चार घाति कर्म नष्ट कर, केवल ज्ञान में रहते॥

जय सुविधिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Suvidhinatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 9th Tirthankar born in Kakandi, received the name Pushpadanta.
Bearing the Makara symbol, spreading knowledge in the world.

Divine form of white complexion, always absorbed in meditation.
Destroying the four destructive karmas, residing in omniscience.`,
  },
  {
    id: "aarti-j-10",
    titleEn: "Shitalanatha Aarti",
    titleHi: "शीतलनाथ आरती",
    deity: "Shitalanatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Shitalanatha, the 10th Tirthankar of Jainism.",
    lyricsHi: `जय शीतलनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

दशम तीर्थंकर भद्रिकापुर में जन्मे, शीतल नाम पाया।
श्रीवत्स लांछन धारण किया, मन को शीतल किया॥

सुवर्ण वर्ण की दिव्य काया, तप और त्याग किया।
संसार-सागर से पार कर, मोक्ष-मार्ग दिखाया॥

जय शीतलनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Shitalanatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 10th Tirthankar born in Bhadrikapur, received the name Shitala.
Bearing the Shrivatsa symbol, he cooled the mind.

Divine golden form, performing penance and renunciation.
Ferrying across the ocean of existence, showing the path to liberation.`,
  },
  {
    id: "aarti-j-11",
    titleEn: "Shreyamsanatha Aarti",
    titleHi: "श्रेयांसनाथ आरती",
    deity: "Shreyamsanatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Shreyamsanatha, the 11th Tirthankar of Jainism.",
    lyricsHi: `जय श्रेयांसनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

एकादश तीर्थंकर सिंहपुर में जन्मे, श्रेयांस नाम पाया।
गैंडा लांछन धारण किया, तप का मार्ग दिखाया॥

सुवर्ण वर्ण की दिव्य काया, पञ्च-व्रत का पाठ।
जन्म-जन्म के कर्म काटे, जिनेन्द्र की यही बात॥

जय श्रेयांसनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Shreyamsanatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 11th Tirthankar born in Sinhapur, received the name Shreyansa.
Bearing the rhinoceros symbol, he showed the path of penance.

Divine golden form, the teaching of five vows.
Cutting karma of birth after birth, this is the message of Jinendra.`,
  },
  {
    id: "aarti-j-12",
    titleEn: "Vasupujya Aarti",
    titleHi: "वासुपूज्य आरती",
    deity: "Vasupujya",
    faith: "Jain",
    description: "Aarti of Bhagwan Vasupujya, the 12th Tirthankar of Jainism.",
    lyricsHi: `जय वासुपूज्य जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

द्वादश तीर्थंकर चम्पापुर में जन्मे, वासुपूज्य नाम पाया।
भैंसा लांछन धारण किया, संसार से मुक्ति पाया॥

रक्त वर्ण की दिव्य काया, ध्यान में लीन रहते।
जीव-दया और अहिंसा का, सन्देश सदा देते॥

जय वासुपूज्य जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Vasupujya Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 12th Tirthankar born in Champapura, received the name Vasupujya.
Bearing the buffalo symbol, he attained liberation from the world.

Divine red form, always absorbed in meditation.
Always giving the message of compassion for living beings and non-violence.`,
  },
  {
    id: "aarti-j-13",
    titleEn: "Vimalanatha Aarti",
    titleHi: "विमलनाथ आरती",
    deity: "Vimalanatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Vimalanatha, the 13th Tirthankar of Jainism.",
    lyricsHi: `जय विमलनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

त्रयोदश तीर्थंकर काम्पिलपुर में जन्मे, विमल नाम पाया।
वराह लांछन धारण किया, विमल ज्ञान फैलाया॥

सुवर्ण वर्ण की दिव्य काया, मोह-माया त्यागी।
पञ्च-महाव्रत पालन करके, मुक्ति के अनुरागी॥

जय विमलनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Vimalanatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 13th Tirthankar born in Kampilpura, received the name Vimala.
Bearing the boar symbol, spreading pure knowledge.

Divine golden form, renouncing illusion and attachment.
Observing the five great vows, devoted to liberation.`,
  },
  {
    id: "aarti-j-14",
    titleEn: "Anantanatha Aarti",
    titleHi: "अनन्तनाथ आरती",
    deity: "Anantanatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Anantanatha, the 14th Tirthankar of Jainism.",
    lyricsHi: `जय अनन्तनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

चतुर्दश तीर्थंकर अयोध्या में जन्मे, अनन्त नाम पाया।
बाज लांछन धारण किया, अनन्त ज्ञान का दाया॥

सुवर्ण वर्ण की दिव्य काया, तप में मग्न रहे।
चतुर्गति के बंधन काटे, जग को मार्ग दिखाए॥

जय अनन्तनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Anantanatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 14th Tirthankar born in Ayodhya, received the name Ananta.
Bearing the hawk symbol, he gifted infinite knowledge.

Divine golden form, absorbed in penance.
Cutting the bonds of the four states of existence, showing the way.`,
  },
  {
    id: "aarti-j-15",
    titleEn: "Dharmanatha Aarti",
    titleHi: "धर्मनाथ आरती",
    deity: "Dharmanatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Dharmanatha, the 15th Tirthankar of Jainism.",
    lyricsHi: `जय धर्मनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

पञ्चदश तीर्थंकर रत्नपुर में जन्मे, धर्म-ध्वज फहराया।
वज्र लांछन धारण किया, धर्म का राज जमाया॥

सुवर्ण वर्ण की दिव्य काया, सत्य का मार्ग दिखाया।
अहिंसा सत्य अस्तेय, ब्रह्मचर्य का पाठ पढ़ाया॥

जय धर्मनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Dharmanatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 15th Tirthankar born in Ratnapura, hoisted the flag of dharma.
Bearing the thunderbolt symbol, establishing the reign of dharma.

Divine golden form, showing the path of truth.
Teaching non-violence, truth, non-stealing, and celibacy.`,
  },
  {
    id: "aarti-j-16",
    titleEn: "Shantinatha Aarti",
    titleHi: "शान्तिनाथ आरती",
    deity: "Shantinatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Shantinatha, the 16th Tirthankar of Jainism.",
    lyricsHi: `जय शान्तिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

षोडश तीर्थंकर हस्तिनापुर में जन्मे, शान्ति-सन्देश लाया।
हिरण लांछन धारण किया, जग में शान्ति फैलाया॥

सुवर्ण वर्ण की दिव्य काया, चक्रवर्ती सम्राट।
मोक्ष-पथ पर चल दिए, तोड़ सांसारिक बाट॥

जय शान्तिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Shantinatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 16th Tirthankar born in Hastinapur, bringing the message of peace.
Bearing the deer symbol, spreading peace in the world.

Divine golden form, a Chakravarti emperor.
Walking on the path to liberation, breaking worldly ties.`,
  },
  {
    id: "aarti-j-17",
    titleEn: "Kunthunatha Aarti",
    titleHi: "कुन्थुनाथ आरती",
    deity: "Kunthunatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Kunthunatha, the 17th Tirthankar of Jainism.",
    lyricsHi: `जय कुन्थुनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

सप्तदश तीर्थंकर हस्तिनापुर में जन्मे, शान्ति-मार्ग बताया।
बकरी लांछन धारण किया, जग में दया फैलाया॥

सुवर्ण वर्ण की दिव्य काया, चक्रवर्ती महान।
तप और ध्यान में लीन हो, पाया केवल ज्ञान॥

जय कुन्थुनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Kunthunatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 17th Tirthankar born in Hastinapur, showing the path of peace.
Bearing the goat symbol, spreading compassion in the world.

Divine golden form, a great Chakravarti.
Absorbed in penance and meditation, attained omniscience.`,
  },
  {
    id: "aarti-j-18",
    titleEn: "Aranatha Aarti",
    titleHi: "अरनाथ आरती",
    deity: "Aranatha",
    faith: "Jain",
    description: "Aarti of Bhagwan Aranatha, the 18th Tirthankar of Jainism.",
    lyricsHi: `जय अरनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

अष्टादश तीर्थंकर हस्तिनापुर में जन्मे, अर नाम पाया।
मछली लांछन धारण किया, मुक्ति-मार्ग बताया॥

सुवर्ण वर्ण की दिव्य काया, चक्रवर्ती महान।
संसार-बंधन तोड़ कर, पाया केवल ज्ञान॥

जय अरनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Aranatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 18th Tirthankar born in Hastinapur, received the name Ara.
Bearing the fish symbol, showing the path to liberation.

Divine golden form, a great Chakravarti.
Breaking the bonds of worldly existence, attaining omniscience.`,
  },
  {
    id: "aarti-j-19",
    titleEn: "Mallinatha Aarti",
    titleHi: "मल्लिनाथ आरती",
    deity: "Mallinatha",
    faith: "Jain",
    description: "Aarti of Bhagwan Mallinatha, the 19th Tirthankar of Jainism.",
    lyricsHi: `जय मल्लिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

एकोनविंशम तीर्थंकर मिथिला में जन्मे, मल्लि नाम पाया।
कलश लांछन धारण किया, त्याग का मार्ग दिखाया॥

नीलवर्ण की दिव्य काया, नारी रूप में आए।
षट्खण्ड के राजाओं को, वैराग्य का पाठ पढ़ाए॥

जय मल्लिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Mallinatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 19th Tirthankar born in Mithila, received the name Malli.
Bearing the pot symbol, showing the path of renunciation.

Divine blue form, came in female form.
Teaching the kings of six continents the lesson of dispassion.`,
  },
  {
    id: "aarti-j-20",
    titleEn: "Munisuvrata Aarti",
    titleHi: "मुनिसुव्रत आरती",
    deity: "Munisuvrata",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Munisuvrata, the 20th Tirthankar of Jainism.",
    lyricsHi: `जय मुनिसुव्रत जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

विंशतितम तीर्थंकर कुशाग्रपुर में जन्मे, मुनि व्रत पाया।
कछुआ लांछन धारण किया, अहिंसा राज फैलाया॥

श्याम वर्ण की दिव्य काया, ध्यान में लीन रहे।
तप-त्याग-वैराग्य का, सन्देश सदा देते॥

जय मुनिसुव्रत जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Munisuvrata Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 20th Tirthankar born in Kushagrapura, received the ascetic vow.
Bearing the tortoise symbol, spreading the reign of non-violence.

Divine dark form, always absorbed in meditation.
Always giving the message of penance, renunciation, and dispassion.`,
  },
  {
    id: "aarti-j-21",
    titleEn: "Naminatha Aarti",
    titleHi: "नमिनाथ आरती",
    deity: "Naminatha",
    faith: "Jain",
    description: "Aarti of Bhagwan Naminatha, the 21st Tirthankar of Jainism.",
    lyricsHi: `जय नमिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

एकविंशतिम तीर्थंकर मिथिला में जन्मे, नमि नाम पाया।
नीलकमल लांछन धारण किया, मुक्ति-मार्ग बताया॥

नीलवर्ण की दिव्य काया, संसार से मुक्त भए।
कर्म-बंधन सब काट कर, परमात्मा पद लए॥

जय नमिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Naminatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 21st Tirthankar born in Mithila, received the name Nami.
Bearing the blue lotus symbol, showing the path to liberation.

Divine blue form, became free from worldly existence.
Cutting all karma bonds, attaining the status of the supreme soul.`,
  },
  {
    id: "aarti-j-22",
    titleEn: "Neminatha Aarti",
    titleHi: "नेमिनाथ आरती",
    deity: "Neminatha",
    faith: "Jain",
    description: "Aarti of Bhagwan Neminatha, the 22nd Tirthankar of Jainism.",
    lyricsHi: `जय नेमिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

द्वाविंशतिम तीर्थंकर द्वारका में जन्मे, नेमि नाम पाया।
शंख लांछन धारण किया, त्याग का गुण दिखाया॥

नीलवर्ण की दिव्य काया, श्री कृष्ण के हैं भाई।
राजुल को छोड़ सन्यास लिया, मुक्ति राह पाई॥

जय नेमिनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Neminatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 22nd Tirthankar born in Dwaraka, received the name Nemi.
Bearing the conch symbol, showing the virtue of renunciation.

Divine blue form, brother of Shri Krishna.
Renouncing Rajul, taking asceticism, finding the path to liberation.`,
  },
  {
    id: "aarti-j-23",
    titleEn: "Parshvanatha Aarti",
    titleHi: "पार्श्वनाथ आरती",
    deity: "Parshvanatha",
    faith: "Jain",
    description:
      "Aarti of Bhagwan Parshvanatha, the 23rd Tirthankar of Jainism.",
    lyricsHi: `जय पार्श्वनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥

त्रयोविंशतिम तीर्थंकर वाराणसी में जन्मे, पार्श्व नाम पाया।
सर्प लांछन धारण किया, धर्म का राज जमाया॥

नीलवर्ण की दिव्य काया, धरणेन्द्र ने सेवा की।
कमठ के घात से बचाया, मुक्ति-राह दी सेवी॥

जय पार्श्वनाथ जिनेन्द्र भगवान।
तुमको नमन-नमन करे जन जन॥`,
    lyricsEn: `Jai Parshvanatha Jinendra Bhagwan.
Tumko naman-naman kare jan jan.

The 23rd Tirthankar born in Varanasi, received the name Parshva.
Bearing the serpent symbol, establishing the reign of dharma.

Divine blue form, served by Dharanendra.
Saved from Kamatha's attack, the devotee received the path to liberation.`,
  },
  {
    id: "aarti-16",
    titleEn: "Aarti Sohila (Sikh)",
    titleHi: "ਆਰਤੀ ਸੋਹਿਲਾ",
    deity: "Waheguru",
    faith: "Sikh",
    description:
      "The Sohila Sahib is the evening prayer recited before sleeping and at cremation.",
    lyricsHi: `ਸੋਹਿਲਾ ਵਿਚਿ ਨਾਮੁ ਪਾਰਬ੍ਰਹਮ ਕਾ ਹਰਿ ਨਾਮੁ ਸੁਣਾਵਹੁ ਭਾਈ ।
ਹਰਿ ਨਾਮੁ ਸੁਣਹੁ ਜਸੁ ਗਾਵਹੁ ਕਰਤਾ ਕਾਰਣੁ ਜੋਇ ।

Sohi-la vich naamu Parabrahm da, hari naamu sunaavahu bhaai.
Hari naamu sunahu jas gaavahu, karta kaarana joi.`,
    lyricsEn: `Listen to the Sohi-la prayer in which the Name of the Supreme Being is recited.
Listen to the Name of Hari, sing His praises,
He is the Doer, the Cause of causes.

This is the Kirtan Sohila, recited each night before sleep.
It is a prayer of gratitude, surrender, and longing for the Divine.`,
  },
  {
    id: "aarti-mahavir-om-jai",
    titleEn: "Om Jai Mahaveer Prabhu",
    titleHi: "ॐ जय महावीर प्रभु",
    deity: "Mahavira",
    faith: "Jain",
    description:
      "The devotional aarti to Bhagwan Mahavira, the 24th Tirthankar, in the style of Om Jai form.",
    lyricsHi: `ॐ जय महावीर प्रभु, स्वामी जय महावीर प्रभु।
चौबीसवें तीर्थंकर, भव-भव के संभु।। ॐ जय महावीर...

क्षत्रियकुण्ड नगर में, जन्मे वर्धमान।
पिता सिद्धार्थ राजा, माता त्रिशला महान।। ॐ जय महावीर...

बाल्यकाल से वीरता, दिखलाई अपार।
सांप को नाथा बचपन में, निर्भय अवतार।। ॐ जय महावीर...

तीस वर्ष की आयु में, गृह त्याग किया।
बारह वर्ष की तपस्या से, केवल ज्ञान लिया।। ॐ जय महावीर...

पंचशील का उपदेश, दिया जग को सार।
अहिंसा सत्य अस्तेय, ब्रह्मचर्य अपरिग्रह।। ॐ जय महावीर...

बहत्तर वर्ष की आयु में, पावापुरी धाम।
निर्वाण प्राप्त किया प्रभु, अमर हुआ नाम।। ॐ जय महावीर...

जो नर आरती गावे, महावीर की नित्य।
पाप ताप सब मिटते, मिले सुख अनित्य।। ॐ जय महावीर प्रभु, स्वामी जय महावीर प्रभु।`,
    lyricsEn: `Om Jai Mahaveer Prabhu, Swami Jai Mahaveer Prabhu.
The twenty-fourth Tirthankar, the refuge through all lifetimes.

In the city of Kshatriyakund, Vardhamana was born.
Father King Siddhartha, mother the great Trishala.

From childhood, showed boundless courage.
Tamed a serpent in childhood, the fearless incarnate.

At the age of thirty, renounced the household.
Through twelve years of penance, attained omniscience.

Gave the world the essence of five vows.
Non-violence, truth, non-stealing, celibacy, non-possessiveness.

At the age of seventy-two, in Pavapuri dhama.
The Lord attained Nirvana, the name became immortal.

Those who sing Mahavira's aarti daily,
All sins and sufferings are erased, happiness is attained.`,
  },
  {
    id: "aarti-mahavir-chandanpur",
    titleEn: "Aarti Shri Mahaveerji (Chandanpur)",
    titleHi: "आरती श्री महावीरजी (चन्दनपुर)",
    deity: "Mahavira",
    faith: "Jain",
    description:
      "Aarti of Shri Mahaveerji at Chandanpur, a sacred Jain pilgrimage site in Rajasthan.",
    lyricsHi: `आरती श्री महावीर जी की, करें भक्त मिलकर।
चन्दनपुर धाम पावन, आए हैं घर छोड़कर।।

जय जय महावीर स्वामी, जय अरिहंत महान।
वीर प्रभु के दर्शन से, मिलता मोक्ष निर्वाण।।

चन्दनपुर की शोभा न्यारी, जिनालय अति सुन्दर।
श्वेत वर्ण प्रतिमा विराजे, जगमग करे मन्दर।।

दीप धूप नैवेद्य लेकर, आरती उतारें।
महावीर प्रभु की महिमा, मिलकर हम गायें।।

भक्त जनों की मनोकामना, पूरी करो प्रभु।
चन्दनपुर के वीर प्रभु, चरणों में आए हम।।`,
    lyricsEn: `Devotees perform the aarti of Shri Mahaveerji together.
We have come to the holy Chandanpur Dham, leaving home.

Glory, glory to Mahaveer Swami, glory to the great Arihant.
By the vision of Veer Prabhu, moksha and nirvana are attained.

The beauty of Chandanpur is unique, the Jinalaya is very beautiful.
The white-colored idol sits resplendent, illuminating the temple.

Taking lamp, incense, and offerings, we perform the aarti.
Together we sing the glory of Mahaveer Prabhu.

O Lord, fulfill the wishes of the devotees.
We have come to your feet, O Veer Prabhu of Chandanpur.`,
  },
  {
    id: "aarti-mahavir-chaudas",
    titleEn: "Chaudas Aarti (14th Lunar Day)",
    titleHi: "चौदस आरती",
    deity: "Mahavira",
    faith: "Jain",
    description:
      "The special aarti performed on Chaturdashi (14th lunar day), a sacred tithi in Jainism for Mahavira worship.",
    lyricsHi: `चतुर्दशी की आरती, करें जिन की आज।
चौदस तिथि पावन है, पूरण हो सब काज।।

जय जय वीर महावीर, जय चौबीसवें जिन।
चतुर्दशी के व्रत से, मिटते सब के पाप।।

चन्द्र की चौदहवीं तिथि, पूजन का है दिन।
जिनेन्द्र के दर्शन से, होते पाप क्षीण।।

दीप जलाकर आरती, उतारें जिन की।
महावीर प्रभु की कृपा, बरसे भक्त की।।

चौदस व्रत जो करे, भक्ति से नित्य।
पाप कर्म सब कटते, मिले मोक्ष नित्य।।

जय महावीर प्रभु जय, जय वर्धमान स्वामी।
चौदस की आरती से, मिले मोक्ष धामी।।`,
    lyricsEn: `We perform the aarti of the Jina on Chaturdashi today.
The fourteenth day is sacred, may all work be fulfilled.

Glory, glory to Veer Mahaveer, glory to the twenty-fourth Jina.
All sins are erased by the fast of Chaturdashi.

The fourteenth lunar day is a day of worship.
Sins are diminished by the vision of Jinendra.

Lighting lamps, we perform the aarti of the Jina.
The grace of Mahaveer Prabhu rains upon the devotee.

Those who observe the Chaudas fast with devotion daily,
All sinful karma is cut, liberation is attained.

Glory to Mahaveer Prabhu, glory to Vardhamana Swami.
By the Chaudas aarti, the abode of liberation is attained.`,
  },
  {
    id: "aarti-navgrah-combined",
    titleEn: "Navgrah Aarti (Combined)",
    titleHi: "नवग्रह आरती (संयुक्त)",
    deity: "Navgrah",
    faith: "Hindu" as const,
    description: "Combined aarti for all nine planetary deities (Navgrah).",
    lyricsHi: "श्री नवग्रह आरती। पूर्ण पाठ Admin CMS से जोड़ें।",
    lyricsEn:
      "Full Aarti of Navgrah (Combined). Add complete lyrics via Admin CMS.",
  },
  {
    id: "aarti-surya",
    titleEn: "Surya Dev Aarti",
    titleHi: "सूर्य देव आरती",
    deity: "Surya",
    faith: "Hindu" as const,
    description: "Devotional aarti to Surya Dev, the Sun god.",
    lyricsHi: "श्री सूर्य देव आरती। पूर्ण पाठ Admin CMS से जोड़ें।",
    lyricsEn: "Full Aarti of Surya Dev. Add complete lyrics via Admin CMS.",
  },
  {
    id: "aarti-chandra",
    titleEn: "Chandra Dev Aarti",
    titleHi: "चंद्र देव आरती",
    deity: "Chandra",
    faith: "Hindu" as const,
    description: "Devotional aarti to Chandra Dev, the Moon god.",
    lyricsHi: "श्री चंद्र देव आरती। पूर्ण पाठ Admin CMS से जोड़ें।",
    lyricsEn: "Full Aarti of Chandra Dev. Add complete lyrics via Admin CMS.",
  },
  {
    id: "aarti-mangal",
    titleEn: "Mangal Dev Aarti",
    titleHi: "मंगल देव आरती",
    deity: "Mangal",
    faith: "Hindu" as const,
    description: "Devotional aarti to Mangal Dev, the Mars deity.",
    lyricsHi: "श्री मंगल देव आरती। पूर्ण पाठ Admin CMS से जोड़ें।",
    lyricsEn: "Full Aarti of Mangal Dev. Add complete lyrics via Admin CMS.",
  },
  {
    id: "aarti-budh",
    titleEn: "Budh Dev Aarti",
    titleHi: "बुध देव आरती",
    deity: "Budh",
    faith: "Hindu" as const,
    description: "Devotional aarti to Budh Dev, the Mercury deity.",
    lyricsHi: "श्री बुध देव आरती। पूर्ण पाठ Admin CMS से जोड़ें।",
    lyricsEn: "Full Aarti of Budh Dev. Add complete lyrics via Admin CMS.",
  },
  {
    id: "aarti-guru-brihaspati",
    titleEn: "Guru Brihaspati Aarti",
    titleHi: "गुरु बृहस्पति आरती",
    deity: "Guru (Brihaspati)",
    faith: "Hindu" as const,
    description: "Devotional aarti to Guru Brihaspati, the Jupiter deity.",
    lyricsHi: "श्री गुरु बृहस्पति आरती। पूर्ण पाठ Admin CMS से जोड़ें।",
    lyricsEn:
      "Full Aarti of Guru Brihaspati. Add complete lyrics via Admin CMS.",
  },
  {
    id: "aarti-shukra",
    titleEn: "Shukra Dev Aarti",
    titleHi: "शुक्र देव आरती",
    deity: "Shukra",
    faith: "Hindu" as const,
    description: "Devotional aarti to Shukra Dev, the Venus deity.",
    lyricsHi: "श्री शुक्र देव आरती। पूर्ण पाठ Admin CMS से जोड़ें।",
    lyricsEn: "Full Aarti of Shukra Dev. Add complete lyrics via Admin CMS.",
  },
  {
    id: "aarti-shani",
    titleEn: "Shani Dev Aarti",
    titleHi: "शनि देव आरती",
    deity: "Shani",
    faith: "Hindu" as const,
    description: "Devotional aarti to Shani Dev, the Saturn deity.",
    lyricsHi: "श्री शनि देव आरती। पूर्ण पाठ Admin CMS से जोड़ें।",
    lyricsEn: "Full Aarti of Shani Dev. Add complete lyrics via Admin CMS.",
  },
  {
    id: "aarti-rahu",
    titleEn: "Rahu Dev Aarti",
    titleHi: "राहु देव आरती",
    deity: "Rahu",
    faith: "Hindu" as const,
    description: "Devotional aarti to Rahu Dev, the north lunar node deity.",
    lyricsHi: "श्री राहु देव आरती। पूर्ण पाठ Admin CMS से जोड़ें।",
    lyricsEn: "Full Aarti of Rahu Dev. Add complete lyrics via Admin CMS.",
  },
  {
    id: "aarti-ketu",
    titleEn: "Ketu Dev Aarti",
    titleHi: "केतु देव आरती",
    deity: "Ketu",
    faith: "Hindu" as const,
    description: "Devotional aarti to Ketu Dev, the south lunar node deity.",
    lyricsHi: "श्री केतु देव आरती। पूर्ण पाठ Admin CMS से जोड़ें।",
    lyricsEn: "Full Aarti of Ketu Dev. Add complete lyrics via Admin CMS.",
  },
  {
    id: "aarti-jain-chaubis-mangal",
    titleEn: "Chaubis Tirthankar Bhagwan Ki Mangal Aarti",
    titleHi: "चौबीस तीर्थंकर भगवान की मंगल आरती",
    deity: "Chaubis Tirthankar",
    faith: "Jain" as const,
    description:
      "Mangal aarti praising the holy pilgrimage sites associated with all 24 Tirthankars including Kailash, Champapuri, Girnar, Pavapuri, and Sammed Shikhar.",
    lyricsHi: `मैं तो आरती उतारूं रे चौबीस जिनवर की।
जय जय चौबीस जिनवर, जय जय जय।।टेक.।।

पहली आरती करूं कैलाश, गिरिवर अनुपम की। गिरिवर अनुपम की।।
मुक्ति पाये जहां वृषभेश, नाभि के चन्दन की। नाभि के चंदन की।।
तीथ्र करतार कहे, युग के आधार रहे, महिमा है अपरम्पार।।
हो हो जिनकी महिमा है अपरम्पार।। मैं तो....................।।1।।

दूजी आरती करूं सिद्धक्षेत्र, चम्पापुरिवर की। चम्पापुरिवर की।।
वासुपूज्य जिनेश्वर ध्याय, वसुपूज्य नंदन की।। वसुपूज्य नंदन की।।
भक्ति करूं झूम-झूम, नृत्य करूं घूम-घूम, जीवन सुधारूं रे,
हो प्यारा-प्यारा जीवन सुधारो रे।। मैं तो..................।।2।।

तीजी आरती महागिरिराज, गिरिनार पर्वत की। गिरिनार पर्वत की।।
राहुल त्याग चले नेमिनाथ, सिद्धि को वरने को। सिद्धि को वरने को।।
दीक्षा ले साधु बने, मुक्ति के कांत बने सिद्धि लोक राजे जा,
हो हो सिद्ध लोक विराजे जा।। मैं तो...........................।।3।।

चैथी आरती करूं निर्वाण, पावापुरिवर की। पावापुरिवर की।।
त्रिशलानंदन हैं वीर महावीर, मुक्ति के स्थल की। मुक्ति के स्थल की।
कुण्डलपुर जन्म हुआ, कण-कण पवित्र हुआ, सिद्धार्थ के दरबार।
हो हो राजा सिद्धार्थ के दरबार।। मैं तो................।।4।।

पंचम आरती करूं उस तीर्थ, अद्भुत अनुपम की।। अद्भुत अनुपम की।।
सम्मेदश्खिर सिद्धक्षेत्र, बीस जिनेश्वर की।। बीस जिनेश्वर की।।
'चंदनामति' आशा करूं, मन में विश्वास करूं, भक्ति करूं दिन रात।
हो हो प्रभु भक्ति करूं दिन रात।।मैं तो............................।।5।।`,
    lyricsEn:
      "Main to aarti utaarun re chaubis jinavar ki. Jay jay chaubis jinavar, jay jay jay. This mangal aarti praises the holy pilgrimage sites associated with Rishabhadeva (Kailash), Vasupujya (Champapuri), Neminath (Girnar), Mahavir (Pavapuri), and the twenty Tirthankars (Sammed Shikhar).",
  },
  {
    id: "aarti-jain-chaubis-rishabh",
    titleEn: "Chaubis Tirthankarom Ki Aarti",
    titleHi: "चौबीस तीर्थंकरों की आरती",
    deity: "Chaubis Tirthankar",
    faith: "Jain" as const,
    description:
      "This aarti names all 24 Tirthankars in sequence and offers them collective reverence, praying for freedom from the cycle of birth and death.",
    lyricsHi: `ऋषभ अजित संभव अभिनंदन, सुमति पद्म सुपार्श्व की जय |
महाराज की श्रीजिनराज की, दीनदयाल की आरती की जय ||

चंद्र पुष्प शीतल श्रेयांस, वासुपूज्य महाराज की जय |
महाराज की श्री जिनराज की, दीनदयाल की आरती की जय ||

विमल अनंत धर्म जस उज्ज्वल, शांतिनाथ महाराज की जय |
महाराज की श्री जिनराज की, दीनदयाल की आरती की जय ||

कुंथ अरह और मल्लि मुनिसुव्रत, नमिनाथ महाराज की जय |
महाराज की श्री जिनराज की, दीनदयाल की आरती की जय ||

नेमिनाथ प्रभु पार्श्व जिनेश्वर, वर्द्धमान महाराज की जय |
महाराज की श्री जिनराज की, दीनदयाल की आरती की जय ||

इन चौबीसों की आरती करके, आवागमन-निवार की जय |
महाराज की श्री जिनराज की, दीनदयाल की आरती की जय ||`,
    lyricsEn:
      "Rishabh Ajit Sambhav Abhinandan, Sumati Padma Suparshva ki jay | Maharaj ki Shri Jinaraj ki, Dindayal ki aarti ki jay || Victory to all 24 Tirthankars! This aarti names all 24 Tirthankars in sequence and prays for freedom from the cycle of birth and death.",
  },
  {
    id: "aarti-jain-vardhaman",
    titleEn: "Karo Aarti Vardhaman Ki",
    titleHi: "करो आरती वर्धमान की",
    deity: "Mahavir",
    faith: "Jain" as const,
    description:
      "Aarti of Lord Vardhaman (Mahavir) at the place of his nirvana at Pavapuri. He freed all beings without attachment or aversion.",
    lyricsHi: `करो आरती वर्धमान की, पावापुर निर्वाण थान की |
राग-बिना सब जगजन तारे, द्वेष बिना सब करम विदारे ||
करो आरती वर्धमान की, पावापुर निर्वाण थान की ||
शील-धुरंधर शिव-तीय भोगी, मन-वच-काय न कहिये योगी |
करो आरती वर्धमान की, पावापुर निर्वाण थान की |
रत्नत्रय निधि परिग्रह-हारी, ज्ञान सुधा भोजनव्रत धारी ||
करो आरती वर्धमान की, पावापुर निर्वाण थान की |
लोक अलोक व्यापै निजमाहीं सुखमाय इन्द्रिय सुख-दुःख नहीं ||
करो आरती वर्धमान की, पावापुर निर्वाण थान की |
पंचकल्याणक पूज्य विरागी, विमल दिगम्बर अंबर त्यागी ||
करो आरती वर्धमान की, पावापुर निर्वाण थान की |
गुणमणि-भूषण भूषित स्वामी, जगत उदास जगन्तर स्वामी ||
करो आरती वर्धमान की, पावापुर निर्वाण थान की |
कहै कहाँ लौ तुम सब जानौ, "द्यानत" की अभिलाष प्रमानौ ||
करो आरती वर्धमान की, पावापुर निर्वाण थान की |`,
    lyricsEn:
      "Karo aarti Vardhaman ki, Pavapur nirvan than ki | Raag-bina sab jagjan taare, Dvesh bina sab karm vidaare || Perform the aarti of Vardhaman (Mahavir) at Pavapuri. He holds the three jewels, is free from possessions, and is adorned with virtuous gems.",
  },
  {
    id: "aarti-jain-traikaalik",
    titleEn: "Aarti Karo Re Shri Traikaalik Chaubisi Ki",
    titleHi: "आरती करो रे श्री त्रैकालिक चौबीसी की",
    deity: "Chaubis Tirthankar",
    faith: "Jain" as const,
    description:
      "Aarti of the Traikaalik (three-era) 72 Tirthankars — past 24, present 24, and future 24.",
    lyricsHi: `आरती करो रे…
भूतकाल के चौबीस अयोध्या में जन्मे |
पुन: राज्य वैभव तजकर, नग्न दिगम्बर मुनि बने ||
आरती करो रे… आरती करो रे… आरती करो रे…
केवलज्ञानी तीर्थंकर जिन की आरती करो रे… ||1||
वर्तमान की चौबीसी, पांच अयोध्या में जन्में |
शेष सभी तीर्थंकर, अलग-अलग स्थानों में जन्में ||
आरती करो रे… आरती करो रे… आरती करो रे…
उन सब जिनवर की जन्मभूमि की आरती करो रे… ||2||
भावि काल के सब जिनवर, साकेतपूरी में जन्मेंगे |
धनकुबेर तब रत्नवृष्टि से, नगरी पावन कर देंगे ||
आरती करो रे… आरती करो रे… आरती करो रे…
महापद्म आदि चौबीसों, जिन की आरती करो रे… ||3||
त्रैकालिक चौबीसी की, प्रतिमायें सभी बहत्तर हैं |
धर्मतीर्थ बतलाने से, इनको कहते तीर्थंकर हैं ||
आरती करो रे… आरती करो रे… आरती करो रे…
चेतन व अचेतन सब तीरथ की आरती करो रे ||4||
तीनों संध्याओं में जो जिनवर की आरती करते हैं |
वही भक्त जगत में, तीन रत्न को वरते हैं ||
आरती करो रे… आरती करो रे… आरती करो रे…
रत्नत्रय संयुक्त सब जिनवर की आरती करो रे ||5||`,
    lyricsEn:
      "Aarti karo re… Bhootakaal ke chaubis Ayodhya mein janme | Past 24 Tirthankars were born in Ayodhya; present 24 in various places; future 24 will be born in Saketapuri. Together their 72 images represent all Tirthankars of three eras.",
  },
  {
    id: "aarti-jain-panch-parameshthi",
    titleEn: "Aarti: Panch-Parameshthi",
    titleHi: "आरती: पंच-परमेष्ठी",
    deity: "Panch Parameshthi",
    faith: "Jain" as const,
    description:
      "Auspicious aarti of the five supreme beings — Arihanta, Siddha, Acharya, Upadhyaya, and Sadhu — the Panch Parameshthi.",
    lyricsHi: `इह विधि मंगल आरति कीजे, पंच परमपद भज सुख लीजे |
इह विधि मंगल आरति कीजे, पंच परमपद भज सुख लीजे |

पहली आरति श्रीजिनराजा, भव दधि पार उतार जिहाजा |
इह विधि मंगल आरति कीजे, पंच परमपद भज सुख लीजे |

दूसरी आरति सिद्धन केरी, सुमिरन करत मिटे भव फेरी |
इह विधि मंगल आरति कीजे, पंच परमपद भज सुख लीजे |

तीजी आरति सूरि मुनिंदा, जनम मरन दुःख दूर करिंदा |
इह विधि मंगल आरति कीजे, पंच परमपद भज सुख लीजे |

चौथी आरति श्रीउवझाया, दर्शन देखत पाप पलाया |
इह विधि मंगल आरति कीजे, पंच परमपद भज सुख लीजे |

पाँचमी आरति साधु तिहारी, कुमति विनाशन शिव अधिकारी |
इह विधि मंगल आरति कीजे, पंच परमपद भज सुख लीजे |

छट्ठी ग्यारह प्रतिमाधारी, श्रावक वंदूं आनंदकारी |
इह विधि मंगल आरति कीजे, पंच परमपद भज सुख लीजे |

सातमि आरति श्रीजिनवानी, 'द्यानत' सुरग मुकति सुखदानी |
इह विधि मंगल आरति कीजे, पंच परमपद भज सुख लीजे |`,
    lyricsEn:
      "Iha vidhi mangala arati kije, panca paramapada bhaja sukha lije | First aarti of Jinaraja (Arihanta). Second aarti of Siddhas. Third aarti of Acharyas. Fourth aarti of Upadhyayas. Fifth aarti of Sadhus. Sixth salutation to eleven-vowed Shravakas. Seventh aarti of Jinvani (Jain scriptures).",
  },
  {
    id: "aarti-jain-jinaraja",
    titleEn: "Aarti Shri Jinaraj Ki",
    titleHi: "आरती श्री जिनराज की",
    deity: "Jinaraja",
    faith: "Jain" as const,
    description:
      "Aarti of the Jinaraja — destroyer of karma, benefactor of devotees. Gods, humans, and asuras all serve the Jina.",
    lyricsHi: `आरती श्रीजिनराज तिहारी, करम दलन संतन हितकारी |
आरती श्रीजिनराज तिहारी, करम दलन संतन हितकारी |

सुर नर असुर करत तुम सेवा, तुमही सब देवन के देवा |
आरती श्रीजिनराज तिहारी, करम दलन संतन हितकारी |

पंच महाव्रत दुर्द्धर धारे, राग रोष परिणाम विदारे |
आरती श्रीजिनराज तिहारी, करम दलन संतन हितकारी |

भव भय भीत शरन जे आये, ते परमारथ पंथ लगाये |
आरती श्रीजिनराज तिहारी, करम दलन संतन हितकारी |

जो तुम नाम जपे मनमाँही, जनम मरन भय ताको नाहीं |
आरती श्रीजिनराज तिहारी, करम दलन संतन हितकारी |

समवसरन संपूरन शोभा, जीते क्रोध मान छल लोभा |
आरती श्रीजिनराज तिहारी, करम दलन संतन हितकारी |

तुम गुण हम कैसे करि गावें, गणधर कहत पार नहिं पावें |
आरती श्रीजिनराज तिहारी, करम दलन संतन हितकारी |

करुणासागर करुणा कीजे, 'द्यानत' सेवक को सुख दीजे |
आरती श्रीजिनराज तिहारी, करम दलन संतन हितकारी |`,
    lyricsEn:
      "Arati Shrijinaraja tihuri, karama dalana santana hitakari | Gods, humans, and asuras serve You — You are the God of all gods. You bear the five great vows and transcend attachment and aversion. One who chants Your name has no fear of birth and death. O ocean of compassion, grant peace to Your devotee.",
  },
  {
    id: "aarti-jain-adinath-chandkheri",
    titleEn: "Aarti Bhagwan Adinath (Chandkheri) Ki",
    titleHi: "आरती भगवान् आदिनाथ (चांदखेड़ी) की",
    deity: "Adinath",
    faith: "Jain" as const,
    description:
      "Aarti of Adishvara (Rishabhadeva/Adinath), the first Tirthankar, at the famous Chandkheri pilgrimage site.",
    lyricsHi: `जगमग जगमग आरती कीजे, आदीश्वर भगवान् की |
जगमग जगमग आरती कीजे, आदीश्वर भगवान् की |
प्रथमदेव अवतारी प्यारे, तीर्थंकर गुणवान की ||
जगमग जगमग आरती कीजे, आदीश्वर भगवान् की ||

अवधपुरी में जन्मे स्वामी, राजकुँवर वो प्यारे थे |
मरु-माता बलिहार हुई, जगती के तुम उजियारे थे ||
द्वार-द्वार पे बजी बधाई, जय हो दयानिधान की |
जगमग जगमग आरती कीजे, आदीश्वर भगवान् की ||

बड़े हुए तुम राजा बन गये, अवधपुरी हरषाई थी |
भरत-बाहुबली सुत मतवारे, मंगल-बेला आई थी ||
करें सभी मिल जय जयकारे, भारत-पूत महान् की |
जगमग जगमग आरती कीजे, आदीश्वर भगवान् की ||

नश्वरता को देख प्रभुजी, तुमने दीक्षा धारी थी,
देख तपस्या नाथ तुम्हारी, यह धरती बलिहारी थी |
प्रथमदेव तीर्थंकर की जय, महाबली बलवान की |
जगमग जगमग आरती कीजे, आदीश्वर भगवान् की ||

बारापाटी में तुम प्रकटे, चाँदखेड़ी मन भाई है,
जगह-जगह के आवे यात्री, चरणन शीश झुकाई है |
फैल रही जगती में 'नमजी' महिमा उसके ध्यान की |
जगमग जगमग आरती कीजे, आदीश्वर भगवान् की |`,
    lyricsEn:
      "Jagamaga jagamaga arati kije, adishvara bhagavan ki | Perform the radiant aarti of Adishvara (Rishabhadeva/Adinath), the first Tirthankar! Born as a royal prince in Ayodhya, son of Maru Mata. He grew up as a king with sons Bharat and Bahubali. Seeing the impermanence of life, he took diksha and performed great penance. His famous idol is at Chandkheri pilgrimage site.",
  },
];

type FaithFilter = "All" | "Hindu" | "Jain" | "Sikh";

const FAITH_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Hindu: {
    bg: "oklch(0.68 0.20 48 / 0.15)",
    text: "oklch(0.68 0.20 48)",
    border: "oklch(0.68 0.20 48 / 0.4)",
  },
  Jain: {
    bg: "oklch(0.55 0.18 145 / 0.15)",
    text: "oklch(0.45 0.18 145)",
    border: "oklch(0.55 0.18 145 / 0.4)",
  },
  Sikh: {
    bg: "oklch(0.45 0.15 250 / 0.15)",
    text: "oklch(0.55 0.18 250)",
    border: "oklch(0.45 0.15 250 / 0.4)",
  },
};

export default function Aarti() {
  const [searchQuery, setSearchQuery] = useState("");
  const [faithFilter, setFaithFilter] = useState<FaithFilter>("All");
  const [selectedAarti, setSelectedAarti] = useState<AartiItem | null>(null);
  const [showHindi, setShowHindi] = useState(true);
  const { data: backendContents = [] } = useGetAllDevotionalContents();

  const backendAartis: AartiItem[] = backendContents
    .filter((c) => c.contentType === "aarti")
    .map((c) => ({
      id: c.id,
      titleEn: c.title,
      titleHi: c.title,
      deity: c.deity,
      faith: "Hindu" as const,
      description: `${c.lyrics.slice(0, 120)}...`,
      lyricsHi: c.language === "hi" ? c.lyrics : "",
      lyricsEn: c.language === "en" ? c.lyrics : c.title,
    }));

  const allAartis = useMemo(() => {
    const combined = [...SEED_AARTIS, ...backendAartis];
    const unique = new Map(combined.map((a) => [a.id, a]));
    return Array.from(unique.values());
  }, [backendAartis]);

  const filtered = useMemo(() => {
    return allAartis.filter((a) => {
      const matchesFaith = faithFilter === "All" || a.faith === faithFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        a.titleEn.toLowerCase().includes(q) ||
        a.titleHi.toLowerCase().includes(q) ||
        a.deity.toLowerCase().includes(q);
      return matchesFaith && matchesSearch;
    });
  }, [allAartis, faithFilter, searchQuery]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero Banner */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.10 30) 0%, oklch(0.28 0.12 45) 50%, oklch(0.22 0.10 30) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.68 0.20 48) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="text-6xl mb-4">🪔</div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Aarti Sangrah
          </h1>
          <p
            className="font-body text-xl mb-1"
            style={{ color: "oklch(0.88 0.08 65)" }}
          >
            आरती संग्रह
          </p>
          <p
            className="font-body text-sm mt-3"
            style={{ color: "oklch(0.68 0.06 60)" }}
          >
            {filtered.length} Sacred Aartis — Hindu · Jain · Sikh
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section
        className="sticky top-16 z-30 py-4 px-4 border-b"
        style={{
          background: "oklch(0.18 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.60 0.06 55)" }}
              />
              <Input
                data-ocid="aarti.search_input"
                type="text"
                placeholder="Search by name, deity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border font-body"
                style={{
                  background: "oklch(0.22 0.07 24)",
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.90 0.04 70)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X
                    className="h-4 w-4"
                    style={{ color: "oklch(0.60 0.06 55)" }}
                  />
                </button>
              )}
            </div>
            <Tabs
              value={faithFilter}
              onValueChange={(v) => setFaithFilter(v as FaithFilter)}
            >
              <TabsList style={{ background: "oklch(0.22 0.07 24)" }}>
                {(["All", "Hindu", "Jain", "Sikh"] as FaithFilter[]).map(
                  (f) => (
                    <TabsTrigger
                      key={f}
                      value={f}
                      data-ocid={`aarti.${f.toLowerCase()}.tab`}
                      className="text-xs font-heading"
                    >
                      {f}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div data-ocid="aarti.empty_state" className="text-center py-20">
              <div className="text-5xl mb-4">🪔</div>
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                No aartis found for your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((aarti, idx) => {
                const faithStyle = FAITH_COLORS[aarti.faith];
                return (
                  <button
                    type="button"
                    key={aarti.id}
                    data-ocid={`aarti.item.${idx + 1}`}
                    onClick={() => {
                      setSelectedAarti(aarti);
                      setShowHindi(true);
                    }}
                    className="text-left p-5 rounded-xl border transition-all duration-200 hover:scale-[1.02] group cursor-pointer"
                    style={{
                      background: "oklch(0.20 0.07 24)",
                      borderColor: "oklch(0.78 0.14 75 / 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.78 0.14 75 / 0.45)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 20px oklch(0.78 0.14 75 / 0.10)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.78 0.14 75 / 0.15)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Flame
                        className="h-5 w-5 mt-0.5"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      />
                      <span
                        className="text-xs font-heading font-semibold px-2 py-0.5 rounded-full border"
                        style={{
                          background: faithStyle.bg,
                          color: faithStyle.text,
                          borderColor: faithStyle.border,
                        }}
                      >
                        {aarti.faith}
                      </span>
                    </div>
                    <h3
                      className="font-heading font-bold text-base mb-1 group-hover:underline"
                      style={{ color: "oklch(0.88 0.06 75)" }}
                    >
                      {aarti.titleEn}
                    </h3>
                    <p
                      className="font-body text-sm mb-2"
                      style={{
                        color: "oklch(0.70 0.06 65)",
                        fontFamily: "serif",
                      }}
                    >
                      {aarti.titleHi}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs mb-3 font-body"
                      style={{
                        borderColor: "oklch(0.68 0.20 48 / 0.3)",
                        color: "oklch(0.68 0.20 48)",
                      }}
                    >
                      {aarti.deity}
                    </Badge>
                    <p
                      className="font-body text-xs leading-relaxed line-clamp-2"
                      style={{ color: "oklch(0.60 0.04 55)" }}
                    >
                      {aarti.description}
                    </p>
                    <div
                      className="mt-4 text-xs font-heading font-semibold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      Read Full Aarti →
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog
        open={!!selectedAarti}
        onOpenChange={(open) => !open && setSelectedAarti(null)}
      >
        <DialogContent
          className="max-w-2xl max-h-[85vh] overflow-y-auto"
          data-ocid="aarti.dialog"
          style={{
            background: "oklch(0.18 0.07 22)",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          {selectedAarti && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <DialogTitle
                      className="font-decorative text-xl"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {selectedAarti.titleEn}
                    </DialogTitle>
                    <p
                      className="font-body text-sm mt-1"
                      style={{
                        color: "oklch(0.70 0.06 65)",
                        fontFamily: "serif",
                      }}
                    >
                      {selectedAarti.titleHi}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className="font-body"
                      style={{
                        background: FAITH_COLORS[selectedAarti.faith].bg,
                        color: FAITH_COLORS[selectedAarti.faith].text,
                      }}
                    >
                      {selectedAarti.faith}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-body"
                      style={{
                        borderColor: "oklch(0.68 0.20 48 / 0.4)",
                        color: "oklch(0.68 0.20 48)",
                      }}
                    >
                      {selectedAarti.deity}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex gap-2 mt-2">
                <Button
                  data-ocid="aarti.hindi.toggle"
                  size="sm"
                  variant={showHindi ? "default" : "outline"}
                  onClick={() => setShowHindi(true)}
                  className="font-heading text-xs"
                  style={
                    showHindi
                      ? { background: "oklch(0.68 0.20 48)", color: "white" }
                      : {
                          borderColor: "oklch(0.68 0.20 48 / 0.4)",
                          color: "oklch(0.68 0.20 48)",
                        }
                  }
                >
                  हिंदी
                </Button>
                <Button
                  data-ocid="aarti.english.toggle"
                  size="sm"
                  variant={!showHindi ? "default" : "outline"}
                  onClick={() => setShowHindi(false)}
                  className="font-heading text-xs"
                  style={
                    !showHindi
                      ? { background: "oklch(0.68 0.20 48)", color: "white" }
                      : {
                          borderColor: "oklch(0.68 0.20 48 / 0.4)",
                          color: "oklch(0.68 0.20 48)",
                        }
                  }
                >
                  English
                </Button>
              </div>

              <div
                className="mt-4 p-5 rounded-xl border"
                style={{
                  background: "oklch(0.22 0.07 24)",
                  borderColor: "oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                <pre
                  className="font-body text-sm leading-relaxed whitespace-pre-wrap"
                  style={{
                    color: "oklch(0.88 0.04 70)",
                    fontFamily: showHindi ? "serif" : "inherit",
                  }}
                >
                  {showHindi ? selectedAarti.lyricsHi : selectedAarti.lyricsEn}
                </pre>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  data-ocid="aarti.close_button"
                  variant="outline"
                  onClick={() => setSelectedAarti(null)}
                  className="font-heading text-sm"
                  style={{
                    borderColor: "oklch(0.78 0.14 75 / 0.3)",
                    color: "oklch(0.78 0.14 75)",
                  }}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
