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
import { BookOpen, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useGetAllDevotionalContents } from "../hooks/useQueries";

interface ChalisaItem {
  id: string;
  titleEn: string;
  titleHi: string;
  deity: string;
  category: string;
  description: string;
  textHi: string;
  textEn: string;
}

const SEED_CHALISAS: ChalisaItem[] = [
  {
    id: "chalisa-1",
    titleEn: "Hanuman Chalisa",
    titleHi: "हनुमान चालीसा",
    deity: "Hanuman",
    category: "Most Popular",
    description:
      "The 40-verse hymn by Goswami Tulsidas praising Lord Hanuman. One of the most recited prayers in Hinduism.",
    textHi: `॥ दोहा ॥
श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।
बरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥

बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।
बल बुधि बिद्या देहु मोहिं, हरहु कलेस बिकार॥

॥ चौपाई ॥
जय हनुमान ज्ञान गुन सागर।
जय कपीस तिहुँ लोक उजागर॥१॥

राम दूत अतुलित बल धामा।
अञ्जनि-पुत्र पवनसुत नामा॥२॥

महाबीर बिक्रम बजरंगी।
कुमति निवार सुमति के संगी॥३॥

कञ्चन बरन बिराज सुबेसा।
कानन कुण्डल कुञ्चित केसा॥४॥

हाथ बज्र औ ध्वजा बिराजै।
काँधे मूँज जनेऊ साजै॥५॥

शंकर सुवन केसरीनन्दन।
तेज प्रताप महा जग वन्दन॥६॥

विद्यावान गुनी अति चातुर।
राम काज करिबे को आतुर॥७॥

प्रभु चरित्र सुनिबे को रसिया।
राम लखन सीता मन बसिया॥८॥

सूक्ष्म रूप धरि सियहिं दिखावा।
बिकट रूप धरि लंक जरावा॥९॥

भीम रूप धरि असुर सँहारे।
रामचन्द्र के काज सँवारे॥१०॥

लाय सञ्जीवन लखन जियाये।
श्रीरघुबीर हरषि उर लाये॥११॥

रघुपति कीन्हीं बहुत बड़ाई।
तुम मम प्रिय भरत-हि सम भाई॥१२॥

सहस बदन तुम्हरो जस गावैं।
अस कहि श्रीपति कण्ठ लगावैं॥१३॥

सनकादिक ब्रह्मादि मुनीसा।
नारद सारद सहित अहीसा॥१४॥

जम कुबेर दिगपाल जहाँ ते।
कबि कोबिद कहि सके कहाँ ते॥१५॥

तुम उपकार सुग्रीवहिं कीन्हा।
राम मिलाय राज-पद दीन्हा॥१६॥

तुम्हरो मन्त्र बिभीषन माना।
लंकेश्वर भए सब जग जाना॥१७॥

जुग सहस्र जोजन पर भानू।
लील्यो ताहि मधुर फल जानू॥१८॥

प्रभु मुद्रिका मेलि मुख माहीं।
जलधि लाँघि गये अचरज नाहीं॥१९॥

दुर्गम काज जगत के जेते।
सुगम अनुग्रह तुम्हरे तेते॥२०॥

राम दुआरे तुम रखवारे।
होत न आज्ञा बिनु पैसारे॥२१॥

सब सुख लहै तुम्हारी सरना।
तुम रच्छक काहू को डर ना॥२२॥

आपन तेज सम्हारो आपै।
तीनों लोक हाँक तें काँपे॥२३॥

भूत पिसाच निकट नहिं आवै।
महाबीर जब नाम सुनावै॥२४॥

नासै रोग हरै सब पीरा।
जपत निरन्तर हनुमत बीरा॥२५॥

संकट तें हनुमान छुड़ावै।
मन क्रम बचन ध्यान जो लावै॥२६॥

सब पर राम तपस्वी राजा।
तिन के काज सकल तुम साजा॥२७॥

और मनोरथ जो कोई लावै।
सोइ अमित जीवन फल पावै॥२८॥

चारों जुग परताप तुम्हारा।
है परसिद्ध जगत उजियारा॥२९॥

साधु-सन्त के तुम रखवारे।
असुर निकन्दन राम दुलारे॥३०॥

अष्ट सिद्धि नौ निधि के दाता।
अस बर दीन जानकी माता॥३१॥

राम रसायन तुम्हरे पासा।
सदा रहो रघुपति के दासा॥३२॥

तुम्हरे भजन राम को पावै।
जनम-जनम के दुख बिसरावै॥३३॥

अन्त काल रघुबर पुर जाई।
जहाँ जन्म हरि-भक्त कहाई॥३४॥

और देवता चित्त न धरई।
हनुमत सेइ सर्ब सुख करई॥३५॥

संकट कटै मिटै सब पीरा।
जो सुमिरै हनुमत बलबीरा॥३६॥

जय जय जय हनुमान गोसाईं।
कृपा करहु गुरुदेव की नाईं॥३७॥

जो सत बार पाठ कर कोई।
छूटहि बन्दि महा सुख होई॥३८॥

जो यह पढ़ै हनुमान चालीसा।
होय सिद्धि साखी गौरीसा॥३९॥

तुलसीदास सदा हरि चेरा।
कीजै नाथ हृदय मँह डेरा॥४०॥

॥ दोहा ॥
पवन तनय संकट हरन, मंगल मूरति रूप।
राम लखन सीता सहित, हृदय बसहु सुर भूप॥`,
    textEn: `Doha (Opening Couplet):
With the dust of the lotus feet of my Guru, I cleanse the mirror of my mind,
And then narrate the sacred glory of Shri Ram Chandra, the bestower of the four fruits of life.

O Son of the Wind, knowing my body is without wisdom, I remember you.
Grant me strength, wisdom, and knowledge, and remove my miseries and blemishes.

Chaupais (40 Verses):
1. Victory to Hanuman, ocean of wisdom and virtue!
   Victory to the Lord of monkeys, illuminator of the three worlds!

2. You are the messenger of Ram, the abode of immeasurable strength,
   Known as the Son of Anjana and the Wind.

3. O Great Hero, of tremendous valor and thunderbolt physique,
   You remove evil thoughts and are the companion of the wise.

4. Of golden complexion, dressed beautifully,
   With earrings in ears and curly hair.

5. In your hands are thunderbolt and the victory flag,
   The sacred thread of munja grass adorns your shoulder.

6. You are the son of Shankar (Shiva) and the joy of Kesari,
   Your glory and valor are reverenced throughout the world.

[Continues through 40 verses...]

Final Doha:
O Son of the Wind, remover of troubles, embodiment of auspiciousness,
Please reside in my heart along with Ram, Lakshmana, and Sita.`,
  },
  {
    id: "chalisa-2",
    titleEn: "Shiv Chalisa",
    titleHi: "शिव चालीसा",
    deity: "Shiva",
    category: "Shiva",
    description:
      "The 40-verse devotional hymn praising Lord Shiva, the destroyer and transformer.",
    textHi: `॥ दोहा ॥
जय गणेश गिरिजा सुवन, मंगल मूल सुजान।
कहत अयोध्यादास तुम, देहु अभय वरदान॥

॥ चौपाई ॥
जय गिरिजापति दीन दयाला।
सदा करत संतन प्रतिपाला॥

भाल चंद्रमा सोहत नीके।
कानन कुण्डल नागफनी के॥

अंग गौर शिर गंग बहाए।
मुण्डमाल तन क्षार लगाए॥

वस्त्र खाल बाघंबर सोहे।
छवि को देख नाग मन मोहे॥

मैना मातु की हवे दुलारी।
बाम अंग सोहत छवि न्यारी॥

कर त्रिशूल सोहत छवि भारी।
करत सदा शत्रुन क्षयकारी॥

नंदि गणेश सोहैं तहं कैसे।
सागर मध्य कमल हैं जैसे॥

कार्तिक श्याम और गणराऊ।
या छवि को कहि जात न काऊ॥

देवन जबहीं जाय पुकारा।
तबहीं दुख प्रभु आप निवारा॥

किया उपद्रव तारक भारी।
देवन सब मिलि तुमहिं जुहारी॥

तुरत षडानन आप पठायउ।
लवनिमेष महिं मारि गिरायउ॥`,
    textEn: `Doha (Opening):
Hail Ganesha, son of Girija, root of auspiciousness and wisdom.
Says Ayodhyadas: Grant me the boon of fearlessness.

Verses:
Hail to Girija's consort (Shiva), compassionate to the poor,
Who always protects and nurtures the saints.

On his forehead the moon looks beautiful,
In his ears are earrings of serpent hoods.

His body is fair, from his head flows the Ganga,
He wears a garland of skulls, his body smeared with ash.

His garment is tiger skin,
Seeing his beauty, serpents are captivated.

In his hand he holds the trident, a formidable weapon,
Always destroying enemies.

[Continues through 40 verses of Shiva's glory...]`,
  },
  {
    id: "chalisa-3",
    titleEn: "Durga Chalisa",
    titleHi: "दुर्गा चालीसा",
    deity: "Durga",
    category: "Devi",
    description:
      "The 40-verse hymn to Maa Durga, the Divine Mother and slayer of demons.",
    textHi: `॥ नमो नमो दुर्गे सुख करनी।
नमो नमो अम्बे दुःख हरनी॥

निरंकार है ज्योति तुम्हारी।
तिहुँ लोक फैली उजियारी॥

शशि ललाट मुख महाविशाला।
नेत्र लाल भृकुटि विकराला॥

रूप मातु को अधिक सुहावे।
दरश करत जन अति सुख पावे॥

तुम संसार शक्ति लय कीना।
पालन हेतु अन्न धन दीना॥

अन्नपूर्णा हुई जग पाला।
तुम ही आदि सुन्दरी बाला॥

प्रलयकाल सब नाशन हारी।
तुम गौरी शिवशंकर प्यारी॥

शिव योगी तुम्हरे गुण गावें।
ब्रह्मा विष्णु तुम्हें नित ध्यावें॥`,
    textEn: `I bow, I bow to Durga, bestower of happiness.
I bow, I bow to Amba, remover of sorrows.

Your radiance is without form,
Your light spreads through all three worlds.

Your face is vast and moon-like,
With red eyes and fierce brows.

Your form as Mother is supremely beautiful,
Those who behold you attain great joy.

You have sustained the universe with your power,
Given food and wealth for its maintenance.

As Annapurna you nourished the world,
You are the primordial beautiful maiden.

[Continues through 40 verses of Durga's glory...]`,
  },
  {
    id: "chalisa-4",
    titleEn: "Saraswati Chalisa",
    titleHi: "सरस्वती चालीसा",
    deity: "Saraswati",
    category: "Devi",
    description:
      "The 40-verse devotional to Goddess Saraswati, bestower of knowledge and the arts.",
    textHi: `जय श्री सकल बुद्धि बलदात्री।
जय जगदम्बिका ज्ञान विधात्री॥

वागीश्वरी जय वाग्विलासिनी।
जय जय जय वरदा वीणावादिनी॥

मातु हमारी बड़ी सुखदाई।
सुख सम्पत्ति सब हमको देई॥

तेरी महिमा अपार है माई।
हम बालक की करो सहाई॥

हंस वाहिनी ज्ञान दायिनी।
शुभ वर दायिनी शुभ फल दायिनी॥

श्वेत वस्त्र सज कमल विराजे।
हाथ पुस्तक वीणा साजे॥

मंद हास मुख चाँद से प्यारे।
मन मोहन नैना हैं न्यारे॥`,
    textEn: `Hail to the bestower of all intellect and strength!
Hail to the world's mother, creator of knowledge!

Hail Vagishvari (Mistress of Speech), Vagvilaasini (Delight of Speech),
Hail Varada (Boon-giver), Veenavadini (Vina-player)!

Our mother is the great bestower of happiness,
She gives us all happiness and prosperity.

Your glory is immeasurable, O Mother!
Please assist us, your children.

[Continues through 40 verses of Saraswati's glory...]`,
  },
  {
    id: "chalisa-5",
    titleEn: "Vishnu Chalisa",
    titleHi: "विष्णु चालीसा",
    deity: "Vishnu",
    category: "Vishnu",
    description:
      "The 40-verse hymn to Lord Vishnu, the preserver of the universe.",
    textHi: `जय श्री विष्णु श्री हरि अखिल।
भव भय भंजन भक्त भजन।

जल में थल में व्यापक सत्य।
सकल बिश्व के तुम हो नाथ॥

रूप अनेक धरे जग माहीं।
राम कृष्ण बुद्ध इनमाहीं॥

मत्स्य कूर्म और वाराहा।
नरसिंह वामन परशुरामा॥

राम कृष्ण बलराम ये दसवें।
कलकि रूप अवतार उदेसवें॥

शंख चक्र गदा पद्म धारी।
विश्वम्भर भव भय हारी॥`,
    textEn: `Hail to Shri Vishnu, Shri Hari, the omnipresent,
Destroyer of worldly fears, worshipped by devotees.

You are the truth pervading water and land,
You are the Lord of the entire universe.

You have taken many forms in this world,
Among them Ram, Krishna, and Buddha.

Matsya, Kurma, and Varaha (boar),
Narasimha, Vamana, and Parashurama.

Ram, Krishna, Balarama are nine,
The tenth will be the Kalki avatar.

[Continues through 40 verses of Vishnu's glory...]`,
  },
  {
    id: "chalisa-6",
    titleEn: "Lakshmi Chalisa",
    titleHi: "लक्ष्मी चालीसा",
    deity: "Lakshmi",
    category: "Devi",
    description:
      "The 40-verse devotional to Goddess Lakshmi, bringer of wealth and fortune.",
    textHi: `मातु लक्ष्मी करि कृपा, करो हृदय में वास।
मनोकामना सिद्ध कर, पुरवहु मेरी आस॥

सिन्धु सुता मैं सुमिरौं तोही।
ज्ञान बुद्धि विद्या दो मोही॥

तुम समान नहिं कोई उपकारी।
सब विधि पूर्ण करो मनुहारी॥

जो कोई तुमको नित ध्यावे।
सो नर दुःख दारिद्र नहीं पावे॥

धूप दीप नैवेद्य चढ़ावे।
मनवांछित फल पावे॥

जो कोई पढ़े लक्ष्मी चालीसा।
होय सिद्धि साखी गौरीशा॥`,
    textEn: `O Mother Lakshmi, bless me and reside in my heart,
Fulfill my wishes and grant my hopes.

I remember you, O daughter of the ocean,
Grant me knowledge, wisdom, and learning.

There is no benefactor equal to you,
Fulfill all my desires in every way.

Whoever meditates on you daily,
That person will never face sorrow or poverty.

[Continues through 40 verses of Lakshmi's glory...]`,
  },
  {
    id: "chalisa-7",
    titleEn: "Ganesh Chalisa",
    titleHi: "गणेश चालीसा",
    deity: "Ganesha",
    category: "Ganesha",
    description:
      "The 40-verse prayer to Lord Ganesha, the remover of obstacles.",
    textHi: `॥ दोहा ॥
जय गणपति सदगुण सदन, कविवर बदन कृपाल।
विघ्न हरण मंगल करण, जय जय गिरिजालाल॥

॥ चौपाई ॥
जय जय जय गणपति गणराजू।
मंगल भरण करण शुभ काजू॥

जय गजबदन सदन सुखदाता।
विश्व विनायक बुद्धि विधाता॥

वक्र तुण्ड शुचि शुण्ड सुहावन।
तिलक त्रिपुण्ड भाल मन भावन॥

राजत मणि मुक्ता नव माला।
स्वर्ण मुकुट शिर नयन विशाला॥

पुस्तक पाणि कुठार त्रिशूलं।
मोदक भोग सुगन्ध फूलं॥`,
    textEn: `Doha:
Hail Ganapati, the abode of virtues, one with a face like the best of poets, compassionate.
Remover of obstacles, creator of auspiciousness, hail! hail! O delight of Girija!

Chaupais:
Hail, hail, hail Ganapati, King of Ganas,
Who fills with auspiciousness and causes good works to succeed!

Hail, elephant-faced one, abode of joy, giver of happiness,
Universal Vinayaka, creator of wisdom!

With curved trunk, pure and beautiful trunk,
With tripundra mark on the forehead that delights the mind.

[Continues through 40 verses of Ganesha's glory...]`,
  },
  {
    id: "chalisa-8",
    titleEn: "Ram Chalisa",
    titleHi: "राम चालीसा",
    deity: "Ram",
    category: "Ram",
    description:
      "The 40-verse hymn to Lord Ram, the ideal king and seventh avatar of Vishnu.",
    textHi: `श्री रामचन्द्र कृपालु भजमन, हरण भवभय दारुणं।
नव कञ्ज लोचन, कञ्ज मुख, कर कञ्ज, पद कञ्जारुणं॥

जय रामचन्द्र जय रामचन्द्र।
जय जय जय सीता संग रामचन्द्र॥

सिय सुमरत मन उमग आवै।
राम राम कहत सुख पावे॥

कोसल देश अयोध्या माहीं।
राजा दशरथ के घर जनमाहीं॥

कौशल्या धन्य धन्य माता।
सुत पायो जग नायक ब्राता॥

राज घाट कर तिलक कराऊ।
घर घर फिरि कौशल गुण गाऊ॥`,
    textEn: `O compassionate Ramachandra, O mind, worship him who removes the terrible fear of worldly existence,
With lotus eyes, lotus face, lotus hands, and lotus-red feet.

Victory to Ramachandra, victory to Ramachandra,
Victory, victory, victory to Ramachandra with Sita!

Remembering Sita, the mind fills with joy,
Saying "Ram Ram" brings happiness.

In the land of Kosala, in Ayodhya,
He was born in the house of King Dasharatha.

[Continues through 40 verses of Ram's glory...]`,
  },
  {
    id: "chalisa-9",
    titleEn: "Sai Baba Chalisa",
    titleHi: "साईं बाबा चालीसा",
    deity: "Sai Baba",
    category: "Saints",
    description:
      "The 40-verse devotional hymn to Shirdi Sai Baba, revered by all faiths.",
    textHi: `पहले साईं के चरणों में, अपना शीश नमाऊं मैं।
कैसे शिरडी साईं आए, सारा हाल सुनाऊं मैं॥

कौन है माता, पिता कौन है, ये न किसी ने जाना।
कहाँ से आए, कहाँ गए, यह भेद न कोई जाना॥

कोई बोला साईं वली हैं, कोई कहे भगवन हैं।
हिंदू मुस्लिम एक रूप में, दोनों के साईं समान हैं॥

साईं बाबा समरथ बाबा, सबकी करते सेवा।
जो आता है शरण तुम्हारी, मिटती उसकी पीड़ा॥`,
    textEn: `First, I bow my head at the feet of Sai,
I will narrate how Sai came to Shirdi.

Who is his mother? Who is his father? No one knows.
Where he came from, where he went, this mystery no one knows.

Some call Sai a Wali, some call him God,
In the form of both Hindu and Muslim, Sai is equal to both.

Sai Baba, the capable Baba, serves everyone,
Whoever comes to your shelter, their pain is erased.

[Continues through 40 verses of Sai Baba's glory...]`,
  },
  {
    id: "chalisa-10",
    titleEn: "Shani Chalisa",
    titleHi: "शनि चालीसा",
    deity: "Shani Dev",
    category: "Navgrah",
    description:
      "The 40-verse hymn to Shani Dev (Saturn), who delivers justice and karma.",
    textHi: `जय जय श्री शनिदेव प्रभु, सुनहु विनय महाराज।
करहु कृपा हे रवि तनय, राखहु जन की लाज॥

जयति जयति शनिदेव दयाला।
करत सदा भक्तन प्रतिपाला॥

चार भुजा तनु श्याम विराजे।
माथे रत्न मुकुट छवि छाजे॥

परम विशाल मनोहर भाला।
टेढ़ी दृष्टि भृकुटि विकराला॥

कुण्डल श्रवण चमाचम चमके।
हिय माल मुक्ताफल दमके॥`,
    textEn: `Hail, hail to Shani Dev, please hear my prayer, O Maharaj,
Be gracious, O son of the Sun, protect the honor of your devotees.

Victory, victory to the compassionate Shani Dev,
Who always protects and nourishes his devotees.

With four arms and dark complexion he is resplendent,
On his forehead a jeweled crown enhances his beauty.

With an extremely large and lovely forehead,
With a crooked gaze and fierce brows.

[Continues through 40 verses of Shani Dev's glory...]`,
  },
  {
    id: "chalisa-11",
    titleEn: "Surya Dev Chalisa",
    titleHi: "सूर्यदेव चालीसा",
    deity: "Surya",
    category: "Navgrah",
    description:
      "The 40-verse hymn to Surya Dev, the Sun God, source of life and energy.",
    textHi: `कनक बदन कुण्डल मकराकृत।
उदित उदय गिरि मंच पर राजत।
देव देवता ऋषि मुनि गावत।
नव-ग्रह मणि शिरोमणि कहावत॥

जय जय सूर्य भानु खर तेजा।
करत सदा भव भक्त की सेजा॥

सात अश्व रथ अखिल विभाषत।
रश्मि जाल बिस्तार विलासत॥`,
    textEn: `With golden body and fish-shaped earrings,
You shine, seated on the peak of the mountain at dawn.
Gods, sages, and seers sing your praises,
You are called the crown jewel of the nine planets.

Hail, hail Sun God, with intense brilliance,
Always making the devotee's path of existence comfortable.

Your chariot drawn by seven horses shines throughout,
The network of rays spreads in all directions.

[Continues through 40 verses of Surya Dev's glory...]`,
  },
  {
    id: "chalisa-12",
    titleEn: "Navgrah Chalisa",
    titleHi: "नवग्रह चालीसा",
    deity: "Navgrah",
    category: "Navgrah",
    description:
      "The 40-verse prayer to all nine planetary deities (Navagraha).",
    textHi: `जय सूर्य चंद्र मंगल बुध देवा।
जय गुरु शुक्र शनि राहु केतु सेवा॥

नव ग्रह जापत मन होए शांत।
सब ग्रह दोष मिटत जो जपत नित्यांत॥

सूर्य रविवार विशेष पूजनीय।
रक्त पुष्प चन्दन सुखदाई॥

सोमवार शिव पूजन मन भाए।
चंद्र दोष निवारण होत जाए॥

मंगलवार हनुमत पूजनीय।
मंगल ग्रह शांत करे अभिनंदनीय॥`,
    textEn: `Hail Sun, Moon, Mars, Mercury, O Gods,
Hail Jupiter, Venus, Saturn, Rahu, and Ketu.

Chanting the Navgrah brings peace to the mind,
All planetary afflictions are removed for those who recite daily.

Sunday is especially for worshipping Surya,
Red flowers and sandalwood bring happiness.

Monday is beloved for Shiva worship,
Removal of Moon afflictions occurs.

Tuesday is for worship of Hanumanji,
Who pacifies the planet Mars with reverence.

[Continues through all 9 planetary deities...]`,
  },
  {
    id: "chalisa-navgrah-surya",
    titleEn: "Surya Dev Chalisa",
    titleHi: "सूर्य देव चालीसा",
    deity: "Surya Dev",
    category: "Navgrah",
    description:
      "The 40-verse devotional hymn to Surya Dev, the Sun God, giver of health, vitality, and divine light.",
    textHi: `॥ दोहा ॥
कनक बदन कुण्डल मकर, सूर्य करत प्रकाश।
सप्त अश्व रथ राजते, देव दिनेश उदास॥

॥ चौपाई ॥
जय सूर्य देव दिनकर दयाला।
तेज पुंज रवि ज्योतिर्माला॥
कश्यप ऋषि के पुत्र महाना।
माता अदिति के राज दुलाना॥
सप्त अश्वों के रथ पर सवारी।
अरुण सारथी करें अगुवारी॥
द्वादश रूपों में नित आते।
भुवन भास्कर जग चमकाते॥
त्रिकाल पूजन से सुख होई।
भक्त की विपदा नाशे सोई॥
रविवार व्रत जो नर पाले।
सूर्य देव उसके दुख टाले॥
आरोग्य धन और यश दाता।
जग के पालक प्राण विधाता॥
जो नर नित्य करे तव ध्यान।
मिले उसे धन और सम्मान॥
जपत नाम सूर्य का नित्य।
पाप ताप सब होत अनित्य॥`,
    textEn: `Glory to Surya Dev, the compassionate Sun God.
Radiant mass of light, garland of divine brilliance.
Son of sage Kashyapa, beloved of mother Aditi.
Riding on a chariot of seven horses, with Aruna as charioteer.
Manifesting in twelve forms, the world-illuminator shines.
Worshipped three times daily brings happiness.
Devotees' troubles are destroyed.
Those who observe Sunday fast are protected by Surya Dev.
Giver of health, wealth, and fame.
He who meditates on Surya daily gains wealth and honor.`,
  },
  {
    id: "chalisa-navgrah-chandra",
    titleEn: "Chandra Dev Chalisa",
    titleHi: "चन्द्र देव चालीसा",
    deity: "Chandra Dev",
    category: "Navgrah",
    description:
      "The 40-verse devotional hymn to Chandra Dev, the Moon God, bestower of peace, beauty, and mental clarity.",
    textHi: `॥ दोहा ॥
श्वेत वर्ण शशि रात्रि के, देते शीतल छाय।
चन्द्र देव करुणामयी, मन की पीड़ा जाय॥

॥ चौपाई ॥
जय चन्द्र देव शशि सुखकारी।
निशि के राजा प्रिय उजियारी॥
अत्रि ऋषि के पुत्र महाना।
माता अनुसूया के लाड़ले जाना॥
सोलह कला के देव कहाए।
मन मंदिर में नित्य सुहाए॥
सोमवार व्रत जो नर करई।
चन्द्र देव की कृपा भरई॥
मन का दोष दूर हो जाई।
मानसिक शांति सदा सुहाई॥
रजत सिंहासन पर विराजे।
चाँदनी रात में नभ पर साजे॥
शीतल किरणें बरसाते नित।
भक्तों का मन होता पुनीत॥`,
    textEn: `Glory to Chandra Dev, the beneficent Moon God.
King of the night, beloved of the radiant night.
Great son of sage Atri, beloved of mother Anusuya.
Known as the deity of sixteen phases.
Always delightful in the temple of the mind.
Those who observe Monday fast receive the grace of Chandra Dev.
Mental defects are removed, mental peace always bestowed.
Seated on a silver throne, adorning the sky on moonlit nights.
Showering cool rays constantly, purifying devotees' minds.`,
  },
  {
    id: "chalisa-navgrah-mangal",
    titleEn: "Mangal Dev Chalisa",
    titleHi: "मंगल देव चालीसा",
    deity: "Mangal Dev",
    category: "Navgrah",
    description:
      "The 40-verse devotional hymn to Mangal (Mars), the red planet deity, bestower of courage and strength.",
    textHi: `॥ दोहा ॥
लाल वर्ण मंगल महा, शक्ति बल के दाय।
मंगल देव नमस्कार, विपदा दूर हटाय॥

॥ चौपाई ॥
जय मंगल देव महाबली।
लाल वस्त्र धारी गुणशाली॥
भूमि पुत्र तुम कहलाए।
धरती से जन्म तुम पाए॥
लाल वर्ण का रूप तुम्हारा।
तुम्हीं हो संकट का निवारा॥
मंगलवार तुम्हारा दिन है।
तुमसे भक्त का जीवन लीन है॥
शक्ति और साहस के दाता।
भय और संकट के विधाता॥
लाल वस्त्र और लाल पुष्प से।
पूजन करे मन मुक्त हर्ष से॥
मंगल दोष जो पीड़ित होई।
तव पूजन से दोष नष्ट होई॥`,
    textEn: `Glory to Mangal Dev, the mighty one.
Red-clad, virtuous Lord of strength.
Known as the son of Earth (Bhumi Putra).
Born from the Earth itself.
Your form is of red color, you are the remover of troubles.
Tuesday is your day, devotees' lives are absorbed in you.
Giver of strength and courage.
Destroyer of fear and trouble.
Worshipped with red clothes and red flowers with joy.
Those afflicted by Mangal Dosha are freed by your worship.`,
  },
  {
    id: "chalisa-navgrah-budh",
    titleEn: "Budh Dev Chalisa",
    titleHi: "बुध देव चालीसा",
    deity: "Budh Dev",
    category: "Navgrah",
    description:
      "The 40-verse devotional hymn to Budh (Mercury), bestower of intelligence, communication, and business success.",
    textHi: `॥ दोहा ॥
बुद्धि विद्या के दाता, बुध ग्रह महान।
बुध देव को नमन करें, जो देते ज्ञान॥

॥ चौपाई ॥
जय बुध देव बुद्धि के दाता।
विद्या वाणी के विधाता॥
चन्द्रमा के पुत्र कहाए।
तारा माता से जन्म पाए॥
हरित वर्ण का रूप तुम्हारा।
बुधवार है तुम्हारा ही प्यारा॥
व्यापार वाणिज्य के स्वामी।
बुद्धि विवेक के अभिनामी॥
जो नर तव पूजन करे नित।
बुद्धि बढ़े उसकी अपरिमित॥
हरित वस्त्र और मूंग दाना।
चढ़ाने से फल पाना॥
बुध दोष जो हो किसी को।
तव पूजन से मिटे उसको॥`,
    textEn: `Glory to Budh Dev, giver of intelligence.
Creator of education and speech.
Known as the son of the Moon, born of mother Tara.
Your form is of green color, Wednesday is your beloved day.
Master of trade and commerce, known for wisdom and discernment.
One who worships you daily gains immeasurable intelligence.
Offering green clothes and green gram brings results.
Those afflicted by Budh Dosha are freed by your worship.`,
  },
  {
    id: "chalisa-navgrah-guru",
    titleEn: "Guru (Brihaspati) Chalisa",
    titleHi: "गुरु बृहस्पति चालीसा",
    deity: "Brihaspati",
    category: "Navgrah",
    description:
      "The 40-verse devotional hymn to Brihaspati (Jupiter), the guru of the gods, bestower of wisdom and prosperity.",
    textHi: `॥ दोहा ॥
देव गुरु बृहस्पति, सुरपति के गुरुराय।
पीत वर्ण के देव तुम, दुख दूर भगाय॥

॥ चौपाई ॥
जय बृहस्पति देव गुरु भारी।
देवताओं के तुम हितकारी॥
अंगिरा ऋषि के पुत्र महाना।
सुरसेना के आप अभिमाना॥
पीत वस्त्र धारण करते हो।
गुरुवार को जग तारते हो॥
धन ज्ञान और यश के दाता।
मोक्ष मार्ग के आप विधाता॥
चना और पीला पुष्प चढ़ाएं।
गुरु कृपा से जीवन सजाएं॥
गुरु दोष जो किसी को होई।
तव पूजन से नष्ट हो सोई॥
गुरुवार व्रत जो नित करई।
बृहस्पति कृपा सदा भरई॥`,
    textEn: `Glory to Brihaspati Dev, the great Guru.
You are the benefactor of the gods.
Great son of sage Angira, pride of Surasena.
You wear yellow clothes, and on Thursday save the world.
Giver of wealth, knowledge, and fame.
Creator of the path to salvation.
Offering chickpeas and yellow flowers adorns life with Guru's grace.
Those afflicted by Guru Dosha are freed by your worship.
Those who observe Thursday fast receive Brihaspati's grace.`,
  },
  {
    id: "chalisa-navgrah-shukra",
    titleEn: "Shukra Dev Chalisa",
    titleHi: "शुक्र देव चालीसा",
    deity: "Shukra Dev",
    category: "Navgrah",
    description:
      "The 40-verse devotional hymn to Shukra (Venus), the guru of demons, bestower of beauty, luxury, and love.",
    textHi: `॥ दोहा ॥
शुक्र देव श्वेत वर्ण के, भृगु के पुत्र महान।
प्रेम सुन्दरता के दाता, जय शुक्र भगवान॥

॥ चौपाई ॥
जय शुक्र देव दैत्य गुरु प्यारे।
भृगु ऋषि के तुम पुत्र दुलारे॥
श्वेत वर्ण का रूप सुहाना।
शुक्रवार है तुम्हारा ठिकाना॥
प्रेम सौन्दर्य के आप दाता।
कला संगीत के तुम विधाता॥
सफेद वस्त्र और चावल चढ़ाएं।
शुक्र कृपा से जीवन सजाएं॥
विवाह सुख देते हो नर को।
कला कौशल देते हर घर को॥
शुक्र दोष जो हो किसी का।
तव पूजन से टले उसका॥`,
    textEn: `Glory to Shukra Dev, the beloved guru of the demons.
Beloved son of sage Bhrigu.
Your charming form is white, Friday is your abode.
You are the giver of love and beauty.
Creator of art and music.
Offering white clothes and rice adorns life with Shukra's grace.
You give marital happiness to men.
You give art and skill to every household.
Those afflicted by Shukra Dosha are freed by your worship.`,
  },
  {
    id: "chalisa-navgrah-shani-individual",
    titleEn: "Shani Dev Chalisa (Individual)",
    titleHi: "शनि देव चालीसा",
    deity: "Shani Dev",
    category: "Navgrah",
    description:
      "The 40-verse devotional hymn to Shani Dev (Saturn), the just and severe deity who rewards karma.",
    textHi: `॥ दोहा ॥
जय जय श्री शनि देव प्रभु, सुनहु विनय महराज।
करहु कृपा हे रवि-सुत, राखहु जन की लाज॥

॥ चौपाई ॥
जयति जयति शनि देव दयाला।
करत सदा भक्तन प्रतिपाला॥
चार भुजा तन श्याम विराजे।
माथे रत्न मुकुट छवि छाजे॥
परशु, गदा, त्रिशूल बिराजे।
आयु, आरोग्य, सुख के दाता॥
सूर्य पुत्र तुम छाया सुताए।
नीलम रत्न तुम्हें है भाए॥
शनिवार का व्रत करनेवाला।
शनि दोष से रहे निराला॥
तेल और काले तिल चढ़ाते।
भक्त तुम्हारे दुख दूर भगाते॥
न्याय कर्म के हो तुम रक्षक।
कर्म अनुसार दंड-पुरस्कार॥`,
    textEn: `Glory to Shani Dev, the compassionate one.
Always protecting devotees.
Dark-bodied with four arms, adorned with a gem-studded crown.
Bearing an axe, mace, and trident.
Giver of longevity, health, and happiness.
Son of Surya, born of Chhaya, beloved of blue sapphire.
Those who observe Saturday fast are protected from Shani Dosha.
Devotees who offer oil and black sesame have their sorrows removed.
You are the protector of justice and karma.
Punishing and rewarding according to one's deeds.`,
  },
  {
    id: "chalisa-navgrah-rahu",
    titleEn: "Rahu Chalisa",
    titleHi: "राहु चालीसा",
    deity: "Rahu",
    category: "Navgrah",
    description:
      "The 40-verse devotional hymn to Rahu, the shadow planet, destroyer of enemies and bestower of worldly success.",
    textHi: `॥ दोहा ॥
राहु देव नीलवर्ण, सिंहिका पुत्र महान।
सप्त धान्य के देव तुम, करहु भक्त कल्याण॥

॥ चौपाई ॥
जय राहु देव महिमा अपारा।
दैत्य कुल में जन्म तुम्हारा॥
सिंहिका माता के लाल कहाए।
असुर वीर नभ में छा जाए॥
नीलवर्ण काया अति भारी।
शीश मात्र रूप दिखलारी॥
सप्त धान्य तुम्हें जो चढ़ाए।
राहु दोष से रहे बचाए॥
शत्रु नाश करते हो सदा।
भक्तों के हरते हो सब व्यथा॥
शनिवार और बुधवार सुहाना।
राहु पूजन का है ठिकाना॥
राहु काल में जो पूजन करे।
उसके जीवन से संकट टरे॥`,
    textEn: `Glory to Rahu Dev, of infinite greatness.
Born in the lineage of demons.
Known as the beloved son of mother Simhika.
The demon hero pervades the sky, with only a head as form.
Those who offer seven grains to Rahu are protected from Rahu Dosha.
You always destroy enemies and remove all sorrows of devotees.
Saturday and Wednesday are the auspicious days for Rahu worship.
Those who worship during Rahu Kaal have troubles removed from their lives.`,
  },
  {
    id: "chalisa-navgrah-ketu",
    titleEn: "Ketu Chalisa",
    titleHi: "केतु चालीसा",
    deity: "Ketu",
    category: "Navgrah",
    description:
      "The 40-verse devotional hymn to Ketu, the shadow planet, bestower of spiritual liberation and psychic abilities.",
    textHi: `॥ दोहा ॥
केतु देव धूम्र वर्ण, राहु अनुज महान।
मोक्ष मार्ग के दाता तुम, करहु भक्त कल्याण॥

॥ चौपाई ॥
जय केतु देव महिमा भारी।
मोक्ष और मुक्ति के अधिकारी॥
धूम्र वर्ण का रूप तुम्हारा।
ध्वज रूप में शोभा न्यारा॥
आध्यात्मिक शक्ति के दाता।
भक्तों के तुम भाग्य विधाता॥
केतु दोष जो हो किसी को।
तव पूजन से टले उसको॥
तिल और गुड़ का भोग लगाएं।
केतु कृपा से दुख मिटाएं॥
मोक्ष मार्ग की राह दिखाते।
अंतर्ज्ञान भक्तों को पाते॥
शनिवार का दिन है प्यारा।
केतु पूजन करें सहारा॥`,
    textEn: `Glory to Ketu Dev, of great eminence.
Master of salvation and liberation.
Your form is of smoky color, your glory as a flag/comet is unique.
Giver of spiritual power, creator of devotees' fortune.
Those afflicted by Ketu Dosha are freed by your worship.
Offering sesame and jaggery removes sorrows through Ketu's grace.
You show the path to liberation and bestow intuition upon devotees.
Saturday is the beloved day for Ketu worship.`,
  },
  {
    id: "chalisa-jain-rishabh-dev",
    titleEn: "Rishabh Dev Ji Chalisa",
    titleHi: "ऋषभदेव जी चालीसा",
    deity: "Rishabh Dev",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Rishabhadev Ji (Adinath), the first Tirthankar of Jainism.",
    textHi: `॥ दोहा ॥
शीश नवा अरिहंत को, सिद्धन करूं प्रणाम।
प्रथम तीर्थंकर को नमूं, ऋषभदेव अभिराम॥

॥ चौपाई ॥
जय ऋषभदेव आदिनाथ स्वामी।
प्रथम जिनेन्द्र सब जग के नामी॥
अयोध्या नगरी में जन्मे।
नाभि पिता मरुदेवी माँ के॥
वृषभ लांछन धारण कीना।
मोक्ष मार्ग जग को दे दीना॥
दिगम्बर वेष धारण करके।
तपस्या से केवल ज्ञान पाके॥
कैलाश पर्वत मोक्ष पाए।
अरिहंत से सिद्ध पद पाए॥
जय ऋषभ जिन जगत हितकारी।
भव-भव के दुख के निवारी॥
नमो-नमो आदिनाथ स्वामी।
चौबीस जिन में हो अग्रामी॥
जो जन तुम्हरी भक्ति करे।
भव-भव के दुख से वह तरे॥`,
    textEn: `Bowing to the Arihant, I salute the Siddhas.
I bow to the first Tirthankar, the illustrious Rishabhadev.
Glory to Rishabhadev, Lord Adinath.
The first Jinendra, known throughout the world.
Born in the city of Ayodhya, father Nabhi, mother Marudevi.
Bearing the bull symbol, showing the world the path to liberation.
Wearing the digambara robes, attaining omniscience through penance.
Attaining liberation at Kailash mountain.
Glory to Rishabha Jina, benefactor of the world.
Remover of sorrows through all lifetimes.`,
  },
  {
    id: "chalisa-jain-ajit-nath",
    titleEn: "Ajit Nath Ji Chalisa",
    titleHi: "अजितनाथ जी चालीसा",
    deity: "Ajit Nath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Ajitnath Ji, the second Tirthankar of Jainism, born in Ayodhya.",
    textHi: `॥ दोहा ॥
द्वितीय तीर्थंकर नमूं, अजितनाथ भगवान।
जिनराज अयोध्या में जन्मे, करहु भक्त कल्याण॥

॥ चौपाई ॥
जय अजितनाथ जिनेन्द्र महाना।
द्वितीय तीर्थंकर जग में जाना॥
अयोध्या पावन नगरी में जन्मे।
जितशत्रु पिता विजया माँ के॥
गज लांछन धारण किया है।
अजित नाम जग में छाया है॥
कर्म शत्रु को जीता सारा।
इसीलिए अजित नाम न्यारा॥
तपस्या से केवल ज्ञान पाए।
अरिहंत पद को जा जमाए॥
सम्मेदशिखर मोक्ष पाए।
सिद्ध लोक में नित्य समाए॥
जय अजित जिन जगत के दाता।
भक्तों के दुख दूर विधाता॥`,
    textEn: `I bow to the second Tirthankar, Ajitnath Bhagwan.
Jinendra born in Ayodhya, bless the devotees.
Glory to Ajitnath Jinendra, the great one.
Known as the second Tirthankar in the world.
Born in the holy city of Ayodhya, father Jitshatru, mother Vijaya.
Bearing the elephant symbol, the name Ajit pervades the world.
He conquered all karmic enemies — hence the unique name Ajit (unconquered).
Attained omniscience through penance, established in the Arihant state.
Attained liberation at Sammeta Shikhar, ever absorbed in the realm of Siddhas.`,
  },
  {
    id: "chalisa-jain-sambhav-nath",
    titleEn: "Sambhav Nath Ji Chalisa",
    titleHi: "सम्भवनाथ जी चालीसा",
    deity: "Sambhav Nath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Sambhavnath Ji, the third Tirthankar of Jainism, born in Shravasti.",
    textHi: `॥ दोहा ॥
तृतीय जिनवर को नमूं, सम्भवनाथ महान।
श्रावस्ती नगरी में जन्मे, करहु भक्त कल्याण॥

॥ चौपाई ॥
जय सम्भवनाथ जिनेन्द्र स्वामी।
तृतीय तीर्थंकर जगत् अभिनामी॥
श्रावस्ती पावन नगरी में आए।
जितारी पिता सेना माँ के॥
अश्व लांछन सुन्दर धारे।
तीन लोक में नाम पुकारे॥
तपस्या से केवल ज्ञान पाए।
जग को मोक्ष मार्ग दिखलाए॥
दिगम्बर वेष धार तपस्या।
केवल ज्ञान से दूर हुई माया॥
सम्मेदशिखर मोक्ष पाए।
सिद्ध भगवंत बन नित्य कहाए॥
जो जन तुम्हरी पूजा करे।
वह भव सागर से पार तरे॥`,
    textEn: `I bow to the third Jina, the great Sambhavnath.
Born in Shravasti city, bless the devotees.
Glory to Sambhavnath Jinendra, master of the world.
Known as the third Tirthankar.
Came to the holy city of Shravasti, father Jitari, mother Sena.
Bearing the beautiful horse symbol, the name rings across three worlds.
Attained omniscience through penance, showed the world the path to liberation.
Wearing digambara robes in penance, illusion dispelled through omniscience.
Attained liberation at Sammeta Shikhar, ever known as the divine Siddha.`,
  },
  {
    id: "chalisa-jain-abhinandan-swami",
    titleEn: "Abhinandan Swami Chalisa",
    titleHi: "अभिनन्दन स्वामी चालीसा",
    deity: "Abhinandan Swami",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Abhinandan Swami, the fourth Tirthankar of Jainism, born in Ayodhya.",
    textHi: `॥ दोहा ॥
चतुर्थ तीर्थंकर नमूं, अभिनन्दन भगवान।
अयोध्या नगरी में जन्मे, करहु जन कल्याण॥

॥ चौपाई ॥
जय अभिनन्दन जिनेन्द्र महाना।
चतुर्थ तीर्थंकर जग में जाना॥
अयोध्या में जन्म तुम लीना।
संवर पिता सिद्धार्था माँ गीना॥
वानर लांछन धारण किया।
जन-जन को मोक्ष मार्ग दिया॥
अभिनन्दन नाम जग में गाए।
भक्त जन नित तुम्हें शीश नवाए॥
केवल ज्ञान से जग को तारे।
दिगम्बर रूप में मन को भाए॥
सम्मेदशिखर मोक्ष पाए।
सिद्ध पद को नित्य समाए॥
जो नर तुम्हरी भक्ति करे।
मोक्ष पंथ पर वह चले॥`,
    textEn: `I bow to the fourth Tirthankar, Abhinandan Bhagwan.
Born in Ayodhya city, bless the people.
Glory to Abhinandan Jinendra, the great one.
Known as the fourth Tirthankar in the world.
Born in Ayodhya, father Samvar, mother Siddhartha.
Bearing the monkey symbol, gave the path to liberation to all.
The name Abhinandan resounds in the world, devotees bow to you daily.
Liberating the world through omniscience, pleasing to the mind in digambara form.
Attained liberation at Sammeta Shikhar, ever absorbed in the Siddha realm.`,
  },
  {
    id: "chalisa-jain-sumti-nath",
    titleEn: "Sumti Nath Ji Chalisa",
    titleHi: "सुमतिनाथ जी चालीसा",
    deity: "Sumti Nath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Sumatinath Ji, the fifth Tirthankar of Jainism, born in Ayodhya.",
    textHi: `॥ दोहा ॥
पञ्चम तीर्थंकर नमूं, सुमतिनाथ भगवान।
अयोध्या नगरी में जन्मे, करहु भक्त कल्याण॥

॥ चौपाई ॥
जय सुमतिनाथ जिनेन्द्र स्वामी।
पञ्चम तीर्थंकर जगत् अभिनामी॥
अयोध्या पावन नगरी में जन्मे।
मेघरथ पिता मंगला माँ के॥
चकोर पक्षी लांछन धारा।
सुमति नाम जग में विस्तारा॥
सुमति सुज्ञान के दाता तुम हो।
भव-भव के त्राता तुम हो॥
तपस्या से केवल ज्ञान पाए।
जग को मोक्ष मार्ग दिखलाए॥
सम्मेदशिखर मोक्ष पाए।
नित्य सिद्ध भगवंत कहाए॥`,
    textEn: `I bow to the fifth Tirthankar, Sumatinath Bhagwan.
Born in Ayodhya city, bless the devotees.
Glory to Sumatinath Jinendra, master of the world.
Known as the fifth Tirthankar.
Born in holy Ayodhya, father Megharath, mother Mangala.
Bearing the curlew bird symbol, the name Sumati spread throughout the world.
You are the giver of right intellect and wisdom.
You are the savior through all lifetimes.
Attained omniscience through penance, showed the world the path to liberation.
Attained liberation at Sammeta Shikhar, ever known as the divine Siddha.`,
  },
  {
    id: "chalisa-jain-padma-prabhu",
    titleEn: "Padma Prabhu Ji Chalisa",
    titleHi: "पद्मप्रभु जी चालीसा",
    deity: "Padma Prabhu",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Padmaprabha Swami Ji, the sixth Tirthankar of Jainism, born in Kaushambhi.",
    textHi: `सर्व साधु और सरस्वती जिन मन्दिर सुखकार।
पद्मपुरी के पद्म को मन मन्दिर में धार।।

जय श्रीपद्मप्रभु गुणधारी, भवि जन को तुम हो हितकारी।
देवों के तुम देव कहाओ, पाप भक्त के दूर हटाओ।।
तुम जग में सर्वज्ञ कहाओ, छट्टे तीर्थंकर कहलाओ।
तीन काल तिहुं जग को जानो, सब बातें क्षण में पहचानो।।
वेष दिगम्बर धारणहारे, तुम से कर्म शत्रु भी हारे।
मूर्ति तुम्हारी कितनी सुन्दर, दृष्टि सुखद जमती नासा पर।।
क्रोध मान मद लोभ भगाया, राग द्वेष का लेश न पाया।
वीतराग तुम कहलाते हो, सब जग के मन को भाते हो।।
कौशाम्बी नगरी कहलाए, राजा धारणजी बतलाए।
सुन्दरि नाम सुसीमा उनके, जिनके उर से स्वामी जन्मे।।
कितनी लम्बी उमर कहाई, तीस लाख पूरब बतलाई।
इक दिन हाथी बंधा निरख कर, झट आया वैराग उमड़कर।।
कार्तिक वदी त्रयोदशी भारी, तुमने मुनिपद दीक्षा धारी।
सारे राज पाट को तज के, तभी मनोहर वन में पहुंचे।।
तप कर केवल ज्ञान उपाया, चैत सुदी पूनम कहलाया।
एक सौ दस गणधर बतलाए, मुख्य व्रज चामर कहलाए।।
लाखों मुनि आर्यिका लाखों, श्रावक और श्राविका लाखों।
संख्याते तिर्यच बताये, देवी देव गिनत नहीं पाये।।
फिर सम्मेदशिखर पर जाकर, शिवरमणी को ली परणा कर।
पंचम काल महा दुखदाई, जब तुमने महिमा दिखलाई।।
मन में अति हर्षित होते हैं, अपने दिल का मल धोते हैं।
तुमने यह अतिशय दिखलाया, भूत प्रेत को दूर भगाया।।
भूत प्रेत दुःख देते जिसको, चरणों में लेते हो उसको।
जब गंधोदक छींटे मारे, भूत प्रेत तब आप बकारे।।
जपने से जब नाम तुम्हारा, भूत प्रेत वो करे किनारा।
ऐसी महिमा बतलाते हैं, अन्धे भी आंखे पाते है।।
प्रतिमा श्वेत-वर्ण कहलाए, देखत ही हिरदय को भाए।
ध्यान तुम्हारा जो धरता है, इस भव से वह नर तरता है।।
अन्धा देखे, गूंगा गावे, लंगड़ा पर्वत पर चढ़ जावे।
बहरा सुन-सुन कर खुश होवे, जिस पर कृपा तुम्हारी होवे।।
मैं हूं स्वामी दास तुम्हारा, मेरी नैया कर दो पारा।
चालीसे को 'चन्द्र' बनावे, पद्म प्रभु को शीश नवावे।।

सोरठाः-
नित चालीसहिं बार, पाठ करे चालीस दिन।
खेय सुगन्ध अपार, पद्मपुरी में आय के।।
होय कुबेर समान, जन्म दरिद्री होय जो।
जिसके नहिं सन्तान, नाम वंश जग में चले।।`,
    textEn: `All sages, Saraswati, and Jain temples bring happiness.
Enshrine the lotus of Padmapuri in the temple of the mind.

Glory to Shri Padmaprabhu, bearer of virtues, benefactor of the faithful.
Called the God of Gods, removing devotees' sins.
Known as omniscient in the world, known as the sixth Tirthankar.
Knowing three times and three worlds, recognizing all things in a moment.
Wearing the digambara dress, even karmic enemies are defeated by you.
How beautiful your image is, the pleasant gaze fixed on the nose.
Anger, pride, intoxication, and greed are driven away, no trace of attachment or hatred.
You are called the passionless one, pleasing to all the minds in the world.
The city is called Kaushambhi, King Dharana is named as the father.
Beautiful is the name Susima, from whose heart the Lord was born.
How long the life-span is said to be, thirty lakh purvas is stated.
One day, seeing an elephant tied, renunciation surged up instantly.
On the thirteenth of Kartik dark fortnight, you took the monastic initiation.
Renouncing all the kingdom, then you went to the beautiful forest.
By practicing penance, omniscience was attained on the full moon of Chaitra.
One hundred and ten Ganadharas are stated, the chief is called Vajra Chamara.
Lakhs of monks, lakhs of nuns, lakhs of male and female lay-followers.
Innumerable animals stated, divine beings and gods are beyond count.
Then going to Sammeta Shikhar, took the garland of liberation.
In the fifth era of great suffering, you showed your miraculous power.
People become very happy in their minds, washing the impurities of their hearts.
You showed this miracle, driving away ghosts and spirits.
Those to whom ghosts cause suffering, you take them under your protection.
When sprinkled with sanctified water, the ghosts and spirits flee on their own.
When your name is chanted, ghosts and spirits keep their distance.
Such is the glory described, even the blind gain sight.
The image is called white-colored, pleasing to the heart just by seeing it.
One who meditates on you crosses this mortal world.
The blind see, the mute sing, the lame climb mountains.
The deaf become happy hearing, upon whom your grace falls.
I am your servant, O Lord, ferry my boat across.
Chandra composes this chalisa, bowing the head to Padma Prabhu.`,
  },
  {
    id: "chalisa-jain-suparshva-nath",
    titleEn: "Suparshva Nath Ji Chalisa",
    titleHi: "सुपार्श्वनाथ जी चालीसा",
    deity: "Suparshva Nath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Suparshvanath Ji, the seventh Tirthankar of Jainism, born in Varanasi.",
    textHi: `॥ दोहा ॥
सप्तम तीर्थंकर नमूं, सुपार्श्वनाथ महान।
वाराणसी में जन्म लिया, करहु भक्त कल्याण॥

॥ चौपाई ॥
जय सुपार्श्वनाथ जिनेन्द्र स्वामी।
सप्तम तीर्थंकर जगत् अभिनामी॥
वाराणसी में जन्म तुम लीना।
प्रतिष्ठ पिता पृथ्वी माँ गीना॥
स्वस्तिक लांछन धारण कीना।
मोक्ष मार्ग जग को दे दीना॥
पाप ताप सब दूर भगाते।
भक्तों का जीवन सफल बनाते॥
तपस्या से केवल ज्ञान पाए।
सम्मेदशिखर मोक्ष समाए॥
जय सुपार्श्व जिन जगत हितकारी।
भव-भव के संकट निवारी॥`,
    textEn: `I bow to the seventh Tirthankar, the great Suparshvanath.
Born in Varanasi, bless the devotees.
Glory to Suparshvanath Jinendra, master of the world.
Known as the seventh Tirthankar.
Born in Varanasi, father Pratishtha, mother Prithvi.
Bearing the swastika symbol, gave the world the path to liberation.
Driving away all sins and afflictions, making devotees' lives successful.
Attained omniscience through penance, absorbed in liberation at Sammeta Shikhar.
Glory to Suparshva Jina, benefactor of the world.`,
  },
  {
    id: "chalisa-jain-chandra-prabhu",
    titleEn: "Chandra Prabhu Ji Chalisa",
    titleHi: "चन्द्रप्रभु जी चालीसा",
    deity: "Chandra Prabhu",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Chandraprabha Ji, the eighth Tirthankar of Jainism, born in Chandrapuri.",
    textHi: `॥ दोहा ॥
अष्टम तीर्थंकर नमूं, चन्द्रप्रभु भगवान।
चन्द्रपुरी में जन्म लिया, करहु भक्त कल्याण॥

॥ चौपाई ॥
जय चन्द्रप्रभु जिनेन्द्र स्वामी।
अष्टम तीर्थंकर जगत् अभिनामी॥
चन्द्रपुरी पावन नगरी में आए।
महासेन पिता लक्ष्मणा माँ के॥
चन्द्र लांछन शोभा न्यारी।
श्वेत वर्ण काया अति प्यारी॥
तपस्या से केवल ज्ञान पाए।
भक्तों को मोक्ष मार्ग दिखाए॥
शांत मुद्रा में सदा विराजें।
मन को शांति देते सब साजें॥
सम्मेदशिखर मोक्ष पाए।
नित्य सिद्ध परमात्मा कहाए॥`,
    textEn: `I bow to the eighth Tirthankar, Chandraprabhu Bhagwan.
Born in Chandrapuri, bless the devotees.
Glory to Chandraprabhu Jinendra, master of the world.
Known as the eighth Tirthankar.
Came to the holy city of Chandrapuri, father Mahasen, mother Lakshmana.
The moon symbol, uniquely beautiful, white-colored form very lovely.
Attained omniscience through penance, showing devotees the path to liberation.
Ever seated in a peaceful posture, giving peace to all minds.
Attained liberation at Sammeta Shikhar, ever known as the divine Siddha.`,
  },
  {
    id: "chalisa-jain-suvidhi-nath",
    titleEn: "Suvidhi Nath Ji Chalisa",
    titleHi: "सुविधिनाथ जी चालीसा",
    deity: "Suvidhi Nath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Suvidhinath Ji (Pushpadanta), the ninth Tirthankar of Jainism.",
    textHi: `॥ दोहा ॥
नवम तीर्थंकर नमूं, पुष्पदंत महान।
काकन्दी नगरी में जन्मे, करहु भक्त कल्याण॥

॥ चौपाई ॥
जय सुविधिनाथ पुष्पदंत स्वामी।
नवम तीर्थंकर जगत् अभिनामी॥
काकन्दी पावन नगरी में जन्मे।
सुग्रीव पिता रामा माँ के॥
मकर लांछन धारण किया।
जग को मोक्ष का मार्ग दिया॥
पुष्पदंत नाम से भी जाने।
सुविधि नाम से भक्त माने॥
तपस्या से केवल ज्ञान पाए।
सम्मेदशिखर मोक्ष समाए॥
जय सुविधि जिन जगत हितकारी।
भव-भव के संकट निवारी॥`,
    textEn: `I bow to the ninth Tirthankar, the great Pushpadanta.
Born in Kakandi city, bless the devotees.
Glory to Suvidhinath Pushpadanta, master of the world.
Known as the ninth Tirthankar.
Born in the holy city of Kakandi, father Sugriva, mother Rama.
Bearing the crocodile symbol, giving the world the path to liberation.
Also known by the name Pushpadanta, devotees know the name Suvidhi.
Attained omniscience through penance, absorbed in liberation at Sammeta Shikhar.
Glory to Suvidhi Jina, benefactor of the world.`,
  },
  {
    id: "chalisa-jain-shital-nath",
    titleEn: "Shital Nath Ji Chalisa",
    titleHi: "शीतलनाथ जी चालीसा",
    deity: "Shital Nath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Shitalnath Ji, the tenth Tirthankar of Jainism, born in Bhadrilpur.",
    textHi: `॥ दोहा ॥
दशम तीर्थंकर नमूं, शीतलनाथ भगवान।
भद्रिलपुर में जन्म लिया, करहु भक्त कल्याण॥

॥ चौपाई ॥
जय शीतलनाथ जिनेन्द्र स्वामी।
दशम तीर्थंकर जगत् अभिनामी॥
भद्रिलपुर नगरी में जन्मे।
दृढ़रथ पिता नन्दा माँ के॥
श्रीवत्स लांछन धारण किया।
शीतल नाम जग में छाया॥
शीतलता और शांति के दाता।
भक्तों के तुम भाग्य विधाता॥
तपस्या से केवल ज्ञान पाए।
सम्मेदशिखर मोक्ष समाए॥
जय शीतल जिन जगत हितकारी।
भव-भव के दुख के निवारी॥`,
    textEn: `I bow to the tenth Tirthankar, Shitalnath Bhagwan.
Born in Bhadrilpur, bless the devotees.
Glory to Shitalnath Jinendra, master of the world.
Known as the tenth Tirthankar.
Born in the city of Bhadrilpur, father Dradharath, mother Nanda.
Bearing the Shrivatsa symbol, the name Shital pervades the world.
Giver of coolness and peace, creator of devotees' fortune.
Attained omniscience through penance, absorbed in liberation at Sammeta Shikhar.
Glory to Shitala Jina, remover of sorrows through all lifetimes.`,
  },
  {
    id: "chalisa-jain-shreyansh-nath",
    titleEn: "Shreyansh Nath Ji Chalisa",
    titleHi: "श्रेयांसनाथ जी चालीसा",
    deity: "Shreyansh Nath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Shreyansnath Ji, the eleventh Tirthankar of Jainism, born in Simhapuri.",
    textHi: `॥ दोहा ॥
एकादश तीर्थंकर नमूं, श्रेयांसनाथ महान।
सिंहपुरी में जन्म लिया, करहु भक्त कल्याण॥

॥ चौपाई ॥
जय श्रेयांसनाथ जिनेन्द्र स्वामी।
एकादश तीर्थंकर जगत् अभिनामी॥
सिंहपुरी पावन नगरी में जन्मे।
विष्णु पिता विष्णु देवी माँ के॥
गैंडा लांछन धारण किया।
श्रेयांस नाम जग में छाया॥
मंगल कारी श्रेयस्कर देव।
भक्तों का करते नित्य स्नेह॥
तपस्या से केवल ज्ञान पाए।
सम्मेदशिखर मोक्ष समाए॥
जय श्रेयांस जिन जगत हितकारी।
भव-भव के दुख के निवारी॥`,
    textEn: `I bow to the eleventh Tirthankar, the great Shreyansnath.
Born in Simhapuri, bless the devotees.
Glory to Shreyansnath Jinendra, master of the world.
Known as the eleventh Tirthankar.
Born in the holy city of Simhapuri, father Vishnu, mother Vishnu Devi.
Bearing the rhinoceros symbol, the name Shrey pervades the world.
The auspicious and beneficial deity, always showing love to devotees.
Attained omniscience through penance, absorbed in liberation at Sammeta Shikhar.
Glory to Shrey Jina, remover of sorrows through all lifetimes.`,
  },
  {
    id: "chalisa-jain-vasupujya-swami",
    titleEn: "Vasupujya Swami Ji Chalisa",
    titleHi: "वासुपूज्य स्वामी चालीसा",
    deity: "Vasupujya Swami",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Vasupujya Swami Ji, the twelfth Tirthankar of Jainism, born in Champapuri.",
    textHi: `॥ दोहा ॥
द्वादश तीर्थंकर नमूं, वासुपूज्य भगवान।
चम्पापुरी में जन्म लिया, करहु भक्त कल्याण॥

॥ चौपाई ॥
जय वासुपूज्य जिनेन्द्र स्वामी।
द्वादश तीर्थंकर जगत् अभिनामी॥
चम्पापुरी पावन नगरी में आए।
वासुपूज्य पिता जया माँ के॥
भैंसा लांछन धारण कीना।
मोक्ष मार्ग जग को दे दीना॥
पूज्य-पूज्य सदा कहाए।
वासुपूज्य नाम जग में छाए॥
तपस्या से केवल ज्ञान पाए।
चम्पापुरी में ही मोक्ष समाए॥
जय वासुपूज्य जिन जगत हितकारी।
भव-भव के संकट निवारी॥`,
    textEn: `I bow to the twelfth Tirthankar, Vasupujya Bhagwan.
Born in Champapuri, bless the devotees.
Glory to Vasupujya Jinendra, master of the world.
Known as the twelfth Tirthankar.
Came to the holy city of Champapuri, father Vasupujya, mother Jaya.
Bearing the buffalo symbol, gave the world the path to liberation.
Always called the worthy of worship, the name Vasupujya pervades the world.
Attained omniscience through penance, attained liberation in Champapuri itself.
Glory to Vasupujya Jina, remover of troubles through all lifetimes.`,
  },
  {
    id: "chalisa-jain-padmavati-mata",
    titleEn: "Padmavati Mata Chalisa",
    titleHi: "पद्मावती माता चालीसा",
    deity: "Padmavati Mata",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Padmavati Mata, the Yakshini (protective deity) of Parshvanath, venerated by Jain devotees.",
    textHi: `।।दोहा।।
नमो पद्मावती सुख करनी, नमो दुर्गावती दुख हरणी।
नमो नमो पद्मावती, नमो नमो दुर्गावती।।
महिमा नमित अपार तुम्हारी, मैं तुम गुण मुख वर्णत हारी।
जय श्री पार्श्व दया निधान, द्व अवस्था धारी, अयान।।

।।चौपाई।।
नमो पद्मावती सुख करनी, नमो दुर्गावती दुख हरणी।
नमो नमो पद्मावती, नमो नमो दुर्गावती।।
महिमा नमित अपार तुम्हारी, मैं तुम गुण मुख वर्णत हारी।।
जय श्री पार्श्व दया निधान, द्व अवस्था धारी अयान।
गंगा तट आए सुख दीन, तापस को तप में प्रवीण।।
सोए वेद ध्यान श्री पार्श्व देव, तापस को बता दीना जिन देव।
तापस चीर काष्ट तुरंत पायो, नाग नागिन मरणत प्रभु वचन सुनी निर्मल भाये।।
नाग नागिन उत्तम गति पाया, मरकर दोनों स्वर्ग जाए।
धरने पद्मावती रहा जब कान में, पार्श्व नंद घर यो योग आनंद कंद।।
तब ही धूम सुकेत अयान, कमठाचर भयो सुहान।
नभते देखो जब जिन धीर, पूर्व बैर कियो गंभीर।।
स्वर्ग भरी कीनो तुम सहित सहाय, दीन जिन माथ चढ़ाए।
श्री जिनेंद्र मन की करी छाया, फनी इंद्र जिन पास ही केवल ज्ञान।।
इंद्र रचो सम शशरण,
जय श्री पद्मावती माता, तेरी महिमा त्रिभुवन गाता।
मन की आशा पूर्ण करो मां, संकट सारे दूर करो मां।।

।।ध्यान मंत्र/स्तुति।।
ॐ नमो भगवती पद्मावती सर्वजन मोहनी, सर्व कार्य करनी, मम विकट संकट हरणी, मम मनोरथ पूरणी, मम चिंता चूरणी नमों।
ॐ पद्मावती नम स्वाहा`,
    textEn: `Salutation to Padmavati, giver of happiness; salutation to Durgavati, destroyer of suffering.
Salutation, salutation to Padmavati; salutation, salutation to Durgavati.
Your immeasurable glory inspires reverence; I am exhausted in describing your virtues.
Glory to Shri Parshva, the abode of compassion, bearing dual states.

Salutation to Padmavati, giver of happiness; salutation to Durgavati, destroyer of suffering.
You came to the banks of the Ganga, blessed the ascetic with tapas.
While Shri Parshva Dev was meditating, the Jina revealed it to the ascetic.
The ascetic split the wood immediately; the snake and serpent heard the Lord's pure words while dying.
The snake and serpent attained an exalted state, dying both went to heaven.
Dharanendra and Padmavati were in the ear; the home of Parshva's son was like a yogic bliss.
Then Dhuma Suketa appeared, Kamatha's conduct became beautiful.
When the steadfast Jina was seen from the sky, old enmity was engaged seriously.
You helped fill heaven, placed at the Lord's forehead.
Shri Jinendra made the mind a shadow, the serpent-Indra attained omniscience near the Jina.
Indra created the samavasarana.
Glory to Shri Padmavati Mata, your glory is sung in all three worlds.
Fulfill the wishes of the mind, O Mother, remove all troubles, O Mother.

Om salutation to the divine Padmavati, enchantress of all, doer of all deeds, destroyer of my severe troubles, fulfiller of my wishes, destroyer of my worries.
Om Padmavati Namah Swaha`,
  },
  {
    id: "chalisa-tulsi",
    titleEn: "Shri Tulsi Chalisa",
    titleHi: "श्री तुलसी चालीसा",
    deity: "Tulsi Mata",
    category: "Others",
    description:
      "The 40-verse devotional hymn to Tulsi Mata, the sacred basil goddess.",
    textHi: "श्री तुलसी माता की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Tulsi Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-chamunda",
    titleEn: "Shri Chamunda Chalisa",
    titleHi: "श्री चामुण्डा चालीसा",
    deity: "Chamunda Devi",
    category: "Shakti",
    description:
      "The 40-verse devotional hymn to Chamunda Devi, the fierce goddess.",
    textHi: "श्री चामुण्डा देवी की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Chamunda Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-ram",
    titleEn: "Shri Ram Chalisa",
    titleHi: "श्री राम चालीसा",
    deity: "Shri Ram",
    category: "Ram",
    description:
      "The 40-verse devotional hymn to Lord Ram, the seventh avatar of Vishnu.",
    textHi: "श्री राम की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn: "Full text of Shri Ram Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-surya-dev",
    titleEn: "Shri Surya Dev Chalisa",
    titleHi: "श्री सूर्य देव चालीसा",
    deity: "Surya Dev",
    category: "Navgrah",
    description: "The 40-verse devotional hymn to Surya Dev, the Sun god.",
    textHi: "श्री सूर्य देव की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Surya Dev Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-sheetla",
    titleEn: "Shri Sheetla Mata Chalisa",
    titleHi: "श्री शीतला माता चालीसा",
    deity: "Sheetla Mata",
    category: "Shakti",
    description:
      "The 40-verse devotional hymn to Sheetla Mata, goddess of healing.",
    textHi: "श्री शीतला माता की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Sheetla Mata Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-sai-baba",
    titleEn: "Shri Sai Baba Chalisa",
    titleHi: "श्री साईं बाबा चालीसा",
    deity: "Sai Baba",
    category: "Saints",
    description:
      "The 40-verse devotional hymn to Shirdi Sai Baba, the revered saint.",
    textHi: "श्री साईं बाबा की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Sai Baba Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-bhairav",
    titleEn: "Shri Bhairav Chalisa",
    titleHi: "श्री भैरव चालीसा",
    deity: "Bhairav",
    category: "Shiva",
    description:
      "The 40-verse devotional hymn to Bhairav, the fierce form of Lord Shiva.",
    textHi: "श्री भैरव की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Bhairav Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-batuk-bhairav",
    titleEn: "Shri Batuk Bhairav Chalisa",
    titleHi: "श्री बटुक भैरव चालीसा",
    deity: "Batuk Bhairav",
    category: "Shiva",
    description:
      "The 40-verse devotional hymn to Batuk Bhairav, the child form of Bhairav.",
    textHi: "श्री बटुक भैरव की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Batuk Bhairav Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-vishwakarma",
    titleEn: "Shri Vishwakarma Chalisa",
    titleHi: "श्री विश्वकर्मा चालीसा",
    deity: "Vishwakarma",
    category: "Ganesha",
    description:
      "The 40-verse devotional hymn to Vishwakarma, the divine architect.",
    textHi: "श्री विश्वकर्मा की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Vishwakarma Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-ganesh",
    titleEn: "Shri Ganesh Chalisa",
    titleHi: "श्री गणेश चालीसा",
    deity: "Ganesh",
    category: "Ganesha",
    description:
      "The 40-verse devotional hymn to Lord Ganesha, remover of obstacles.",
    textHi: "श्री गणेश की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Ganesh Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-giriraj",
    titleEn: "Shri Giriraj Chalisa",
    titleHi: "श्री गिरिराज चालीसा",
    deity: "Giriraj (Govardhan)",
    category: "Ganesha",
    description:
      "The 40-verse devotional hymn to Giriraj (Govardhan Hill), sacred to Krishna.",
    textHi: "श्री गिरिराज की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Giriraj Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-balaji",
    titleEn: "Shri Balaji Chalisa",
    titleHi: "श्री बालाजी चालीसा",
    deity: "Balaji (Tirupati)",
    category: "Vishnu",
    description:
      "The 40-verse devotional hymn to Balaji (Venkateswara) of Tirupati.",
    textHi: "श्री बालाजी की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Balaji Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-ramdev",
    titleEn: "Shri Ramdev Pir Chalisa",
    titleHi: "श्री रामदेव पीर चालीसा",
    deity: "Ramdev Pir",
    category: "Saints",
    description:
      "The 40-verse devotional hymn to Ramdev Pir, the revered saint of Rajasthan.",
    textHi: "श्री रामदेव पीर की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Ramdev Pir Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-lalita",
    titleEn: "Shri Lalita Mata Chalisa",
    titleHi: "श्री ललिता माता चालीसा",
    deity: "Lalita Mata",
    category: "Shakti",
    description:
      "The 40-verse devotional hymn to Lalita Mata, the Supreme Goddess.",
    textHi: "श्री ललिता माता की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Lalita Mata Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-shani",
    titleEn: "Shri Shani Dev Chalisa",
    titleHi: "श्री शनि देव चालीसा",
    deity: "Shani Dev",
    category: "Navgrah",
    description:
      "The 40-verse devotional hymn to Shani Dev, the planet Saturn deity.",
    textHi: "श्री शनि देव की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Shani Dev Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-bajrang-baan",
    titleEn: "Bajrang Baan",
    titleHi: "बजरंग बाण",
    deity: "Hanuman / Bajrang",
    category: "Ram",
    description:
      "The powerful 40-verse devotional hymn to Bajrang Bali (Hanuman).",
    textHi: "बजरंग बाण। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn: "Full text of Bajrang Baan. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-krishna",
    titleEn: "Shri Krishna Chalisa",
    titleHi: "श्री कृष्ण चालीसा",
    deity: "Shri Krishna",
    category: "Krishna",
    description:
      "The 40-verse devotional hymn to Lord Krishna, the divine flute player.",
    textHi: "श्री कृष्ण की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Krishna Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-ganga",
    titleEn: "Shri Ganga Mata Chalisa",
    titleHi: "श्री गंगा माता चालीसा",
    deity: "Ganga Mata",
    category: "Others",
    description:
      "The 40-verse devotional hymn to Ganga Mata, the sacred river goddess.",
    textHi: "श्री गंगा माता की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Ganga Mata Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-brihaspati",
    titleEn: "Shri Brihaspati Chalisa",
    titleHi: "श्री बृहस्पति चालीसा",
    deity: "Brihaspati (Guru)",
    category: "Navgrah",
    description:
      "The 40-verse devotional hymn to Brihaspati, the planet Jupiter deity.",
    textHi: "श्री बृहस्पति की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Brihaspati Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-gopala",
    titleEn: "Shri Gopala Chalisa",
    titleHi: "श्री गोपाल चालीसा",
    deity: "Gopala (Krishna)",
    category: "Krishna",
    description:
      "The 40-verse devotional hymn to Gopala, the cowherd form of Krishna.",
    textHi: "श्री गोपाल की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Gopala Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-brahma",
    titleEn: "Shri Brahma Chalisa",
    titleHi: "श्री ब्रह्मा चालीसा",
    deity: "Brahma",
    category: "Krishna",
    description:
      "The 40-verse devotional hymn to Lord Brahma, the creator of the universe.",
    textHi: "श्री ब्रह्मा की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Brahma Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-gayatri",
    titleEn: "Shri Gayatri Chalisa",
    titleHi: "श्री गायत्री चालीसा",
    deity: "Gayatri Mata",
    category: "Others",
    description:
      "The 40-verse devotional hymn to Gayatri Mata, the goddess of wisdom.",
    textHi: "श्री गायत्री माता की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Gayatri Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-navgrah-hindu",
    titleEn: "Navgrah Chalisa",
    titleHi: "नवग्रह चालीसा",
    deity: "Navgrah",
    category: "Navgrah",
    description:
      "The combined 40-verse devotional hymn to all nine planetary deities.",
    textHi: "नवग्रह चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn: "Full text of Navgrah Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-vimalnath",
    titleEn: "Shri Vimalnath Chalisa (13th Tirthankar)",
    titleHi: "श्री विमलनाथ चालीसा",
    deity: "Vimalnath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Vimalnath Ji, the 13th Tirthankar of Jainism.",
    textHi: "श्री विमलनाथ की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Vimalnath Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-anantnath",
    titleEn: "Shri Anantnath Chalisa (14th Tirthankar)",
    titleHi: "श्री अनंतनाथ चालीसा",
    deity: "Anantnath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Anantnath Ji, the 14th Tirthankar of Jainism.",
    textHi: "श्री अनंतनाथ की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Anantnath Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-dharamnath",
    titleEn: "Shri Dharamnath Chalisa (15th Tirthankar)",
    titleHi: "श्री धर्मनाथ चालीसा",
    deity: "Dharamnath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Dharamnath Ji, the 15th Tirthankar of Jainism.",
    textHi: "श्री धर्मनाथ की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Dharamnath Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-shantinath",
    titleEn: "Shri Shantinath Chalisa (16th Tirthankar)",
    titleHi: "श्री शांतिनाथ चालीसा",
    deity: "Shantinath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Shantinath Ji, the 16th Tirthankar of Jainism.",
    textHi: "श्री शांतिनाथ की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Shantinath Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-kunthunath",
    titleEn: "Shri Kunthunath Chalisa (17th Tirthankar)",
    titleHi: "श्री कुंथुनाथ चालीसा",
    deity: "Kunthunath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Kunthunath Ji, the 17th Tirthankar of Jainism.",
    textHi: "श्री कुंथुनाथ की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Kunthunath Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-arnath",
    titleEn: "Shri Arnath Chalisa (18th Tirthankar)",
    titleHi: "श्री अरनाथ चालीसा",
    deity: "Arnath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Arnath Ji, the 18th Tirthankar of Jainism.",
    textHi: "श्री अरनाथ की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Arnath Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-mallinath",
    titleEn: "Shri Mallinath Chalisa (19th Tirthankar)",
    titleHi: "श्री मल्लिनाथ चालीसा",
    deity: "Mallinath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Mallinath Ji, the 19th Tirthankar of Jainism.",
    textHi: "श्री मल्लिनाथ की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Mallinath Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-munisuvratnath",
    titleEn: "Shri Munisuvratnath Chalisa (20th Tirthankar)",
    titleHi: "श्री मुनिसुव्रतनाथ चालीसा",
    deity: "Munisuvratnath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Munisuvratnath Ji, the 20th Tirthankar.",
    textHi: "श्री मुनिसुव्रतनाथ की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Munisuvratnath Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-naminath",
    titleEn: "Shri Naminath Chalisa (21st Tirthankar)",
    titleHi: "श्री नमिनाथ चालीसा",
    deity: "Naminath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Naminath Ji, the 21st Tirthankar of Jainism.",
    textHi: "श्री नमिनाथ की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Naminath Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-neminath",
    titleEn: "Shri Neminath Chalisa (22nd Tirthankar)",
    titleHi: "श्री नेमिनाथ चालीसा",
    deity: "Neminath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Neminath Ji, the 22nd Tirthankar of Jainism.",
    textHi: "श्री नेमिनाथ की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Neminath Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-parshvanath-b2",
    titleEn: "Shri Parshvanath Chalisa (23rd Tirthankar)",
    titleHi: "श्री पार्श्वनाथ चालीसा",
    deity: "Parshvanath",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Parshvanath Ji, the 23rd Tirthankar of Jainism.",
    textHi: "श्री पार्श्वनाथ की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Parshvanath Chalisa. Add complete lyrics via Admin CMS.",
  },
  {
    id: "chalisa-jain-mahavir",
    titleEn: "Shri Mahavir Swami Chalisa (24th Tirthankar)",
    titleHi: "श्री महावीर स्वामी चालीसा",
    deity: "Mahavir Swami",
    category: "Jain",
    description:
      "The 40-verse devotional hymn to Mahavir Swami, the 24th Tirthankar of Jainism.",
    textHi: "श्री महावीर स्वामी की चालीसा। पूर्ण पाठ Admin CMS से जोड़ें।",
    textEn:
      "Full text of Shri Mahavir Swami Chalisa. Add complete lyrics via Admin CMS.",
  },
];

type CategoryFilter =
  | "All"
  | "Most Popular"
  | "Devi"
  | "Shiva"
  | "Vishnu"
  | "Ganesha"
  | "Ram"
  | "Saints"
  | "Navgrah"
  | "Shakti"
  | "Krishna"
  | "Others"
  | "Jain";

export default function Chalisa() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [selectedChalisa, setSelectedChalisa] = useState<ChalisaItem | null>(
    null,
  );
  const [showHindi, setShowHindi] = useState(true);
  const { data: backendContents = [] } = useGetAllDevotionalContents();

  const backendChalisas: ChalisaItem[] = backendContents
    .filter((c) => c.contentType === "chalisa")
    .map((c) => ({
      id: c.id,
      titleEn: c.title,
      titleHi: c.title,
      deity: c.deity,
      category: "Other",
      description: `${c.lyrics.slice(0, 120)}...`,
      textHi: c.language === "hi" ? c.lyrics : "",
      textEn: c.language === "en" ? c.lyrics : c.title,
    }));

  const allChalisas = useMemo(() => {
    const combined = [...SEED_CHALISAS, ...backendChalisas];
    const unique = new Map(combined.map((c) => [c.id, c]));
    return Array.from(unique.values());
  }, [backendChalisas]);

  const categories: CategoryFilter[] = [
    "All",
    "Most Popular",
    "Devi",
    "Shiva",
    "Vishnu",
    "Ganesha",
    "Ram",
    "Saints",
    "Navgrah",
    "Shakti",
    "Krishna",
    "Others",
    "Jain",
  ];

  const filtered = useMemo(() => {
    return allChalisas.filter((c) => {
      const matchesCat =
        categoryFilter === "All" || c.category === categoryFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        c.titleEn.toLowerCase().includes(q) ||
        c.titleHi.toLowerCase().includes(q) ||
        c.deity.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [allChalisas, categoryFilter, searchQuery]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.12 270) 0%, oklch(0.26 0.10 290) 50%, oklch(0.20 0.12 270) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.70 0.14 280) 0%, transparent 60%), radial-gradient(circle at 70% 50%, oklch(0.78 0.14 75) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="text-6xl mb-4">📖</div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Chalisa Sangrah
          </h1>
          <p
            className="font-body text-xl mb-1"
            style={{ color: "oklch(0.88 0.08 65)", fontFamily: "serif" }}
          >
            चालीसा संग्रह
          </p>
          <p
            className="font-body text-sm mt-3"
            style={{ color: "oklch(0.68 0.06 60)" }}
          >
            {filtered.length} Sacred Chalisas — 40-Verse Devotional Hymns
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
                data-ocid="chalisa.search_input"
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
            <div className="flex flex-nowrap overflow-x-auto gap-1.5 pb-1 max-w-full">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  data-ocid={`chalisa.${cat.toLowerCase().replace(/\s+/g, "_")}.tab`}
                  onClick={() => setCategoryFilter(cat)}
                  className="px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-all"
                  style={{
                    background:
                      categoryFilter === cat
                        ? "oklch(0.68 0.20 48)"
                        : "oklch(0.22 0.07 24)",
                    color:
                      categoryFilter === cat ? "white" : "oklch(0.78 0.06 60)",
                    border: "1px solid",
                    borderColor:
                      categoryFilter === cat
                        ? "oklch(0.68 0.20 48)"
                        : "oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div data-ocid="chalisa.empty_state" className="text-center py-20">
              <div className="text-5xl mb-4">📖</div>
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                No chalisas found for your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((chalisa, idx) => (
                <button
                  type="button"
                  key={chalisa.id}
                  data-ocid={`chalisa.item.${idx + 1}`}
                  onClick={() => {
                    setSelectedChalisa(chalisa);
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
                    <BookOpen
                      className="h-5 w-5 mt-0.5"
                      style={{ color: "oklch(0.70 0.14 280)" }}
                    />
                    <Badge
                      variant="outline"
                      className="text-xs font-heading"
                      style={{
                        borderColor: "oklch(0.70 0.14 280 / 0.4)",
                        color: "oklch(0.70 0.14 280)",
                      }}
                    >
                      {chalisa.category}
                    </Badge>
                  </div>
                  <h3
                    className="font-heading font-bold text-base mb-1 group-hover:underline"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {chalisa.titleEn}
                  </h3>
                  <p
                    className="font-body text-sm mb-2"
                    style={{
                      color: "oklch(0.70 0.06 65)",
                      fontFamily: "serif",
                    }}
                  >
                    {chalisa.titleHi}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-xs mb-3 font-body"
                    style={{
                      borderColor: "oklch(0.68 0.20 48 / 0.3)",
                      color: "oklch(0.68 0.20 48)",
                    }}
                  >
                    {chalisa.deity}
                  </Badge>
                  <p
                    className="font-body text-xs leading-relaxed line-clamp-2"
                    style={{ color: "oklch(0.60 0.04 55)" }}
                  >
                    {chalisa.description}
                  </p>
                  <div
                    className="mt-4 text-xs font-heading font-semibold flex items-center gap-1"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    <span>40 Verses</span>
                    <span style={{ color: "oklch(0.50 0.04 50)" }}>·</span>
                    <span>Read Full →</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog
        open={!!selectedChalisa}
        onOpenChange={(open) => !open && setSelectedChalisa(null)}
      >
        <DialogContent
          className="max-w-2xl max-h-[85vh] overflow-y-auto"
          data-ocid="chalisa.dialog"
          style={{
            background: "oklch(0.18 0.07 22)",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          {selectedChalisa && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <DialogTitle
                      className="font-decorative text-xl"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {selectedChalisa.titleEn}
                    </DialogTitle>
                    <p
                      className="font-body text-sm mt-1"
                      style={{
                        color: "oklch(0.70 0.06 65)",
                        fontFamily: "serif",
                      }}
                    >
                      {selectedChalisa.titleHi}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className="font-body"
                      style={{
                        borderColor: "oklch(0.70 0.14 280 / 0.4)",
                        color: "oklch(0.70 0.14 280)",
                      }}
                    >
                      {selectedChalisa.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-body"
                      style={{
                        borderColor: "oklch(0.68 0.20 48 / 0.4)",
                        color: "oklch(0.68 0.20 48)",
                      }}
                    >
                      {selectedChalisa.deity}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex gap-2 mt-2">
                <Button
                  data-ocid="chalisa.hindi.toggle"
                  size="sm"
                  onClick={() => setShowHindi(true)}
                  className="font-heading text-xs"
                  style={
                    showHindi
                      ? { background: "oklch(0.68 0.20 48)", color: "white" }
                      : {
                          borderColor: "oklch(0.68 0.20 48 / 0.4)",
                          color: "oklch(0.68 0.20 48)",
                          background: "transparent",
                          border: "1px solid",
                        }
                  }
                >
                  हिंदी
                </Button>
                <Button
                  data-ocid="chalisa.english.toggle"
                  size="sm"
                  onClick={() => setShowHindi(false)}
                  className="font-heading text-xs"
                  style={
                    !showHindi
                      ? { background: "oklch(0.68 0.20 48)", color: "white" }
                      : {
                          borderColor: "oklch(0.68 0.20 48 / 0.4)",
                          color: "oklch(0.68 0.20 48)",
                          background: "transparent",
                          border: "1px solid",
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
                  {showHindi ? selectedChalisa.textHi : selectedChalisa.textEn}
                </pre>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  data-ocid="chalisa.close_button"
                  variant="outline"
                  onClick={() => setSelectedChalisa(null)}
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
