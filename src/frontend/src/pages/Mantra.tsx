import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bell, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useGetAllDevotionalContents } from "../hooks/useQueries";

interface MantraItem {
  id: string;
  titleEn: string;
  titleHi: string;
  deity: string;
  faith: "Hindu" | "Jain" | "Sikh";
  mantraText: string;
  transliteration: string;
  meaning: string;
  description: string;
}

const SEED_MANTRAS: MantraItem[] = [
  {
    id: "mantra-1",
    titleEn: "Gayatri Mantra",
    titleHi: "गायत्री मंत्र",
    deity: "Surya / Savitr",
    faith: "Hindu",
    mantraText: `ॐ भूर्भुवः स्वः
तत्सवितुर्वरेण्यं
भर्गो देवस्य धीमहि
धियो यो नः प्रचोदयात्॥`,
    transliteration: `Om Bhur Bhuvah Svah
Tat Savitur Varenyam
Bhargo Devasya Dhimahi
Dhiyo Yo Nah Prachodayat`,
    meaning: `Om - The primordial sound, the universe
Bhur - The physical world (earth)
Bhuvah - The vital energies/air
Svah - The celestial world/ether
Tat - That (Divine Reality)
Savitur - Of the Sun (Savitr, the solar deity)
Varenyam - Most excellent, adorable
Bhargo - Radiance, effulgence, spiritual light
Devasya - Divine
Dhimahi - We meditate upon
Dhiyo - Our intellect, understanding
Yo - Who
Nah - Our
Prachodayat - Inspire, stimulate, guide

Full meaning: We meditate upon the divine light of the Sun (the ultimate reality), may that divine light illuminate and guide our intellect.`,
    description:
      "The most sacred Vedic mantra from the Rigveda. A prayer to the Sun deity to illuminate the mind and inspire wisdom.",
  },
  {
    id: "mantra-2",
    titleEn: "Maha Mrityunjaya Mantra",
    titleHi: "महामृत्युञ्जय मंत्र",
    deity: "Shiva",
    faith: "Hindu",
    mantraText: `ॐ त्र्यम्बकं यजामहे
सुगन्धिं पुष्टिवर्धनम्।
उर्वारुकमिव बन्धनान्
मृत्योर्मुक्षीय माऽमृतात्॥`,
    transliteration: `Om Tryambakam Yajamahe
Sugandhim Pushtivardhanam
Urvarukamiva Bandhanat
Mrityor Mukshiya Maamritat`,
    meaning: `We worship the three-eyed one (Lord Shiva),
Who is fragrant and nourishes all beings.
May He liberate us from the bondage of death (and worldly attachment),
Just as a ripe cucumber is severed from its vine,
And not from immortality (moksha).`,
    description:
      "The great death-conquering mantra addressed to Shiva. Considered extremely powerful for healing, protection from accidents and untimely death.",
  },
  {
    id: "mantra-3",
    titleEn: "Om Namah Shivaya",
    titleHi: "ॐ नमः शिवाय",
    deity: "Shiva",
    faith: "Hindu",
    mantraText: "ॐ नमः शिवाय",
    transliteration: "Om Namah Shivaya",
    meaning: `Om - The primordial sound
Na - Earth element
Ma - Water element
Shi - Fire element
Va - Air element
Ya - Space/Ether element

"I bow to Shiva" or "I bow to the auspicious one"
The five syllables Na-Ma-Shi-Va-Ya represent the five elements of creation.
Shiva is the consciousness within all of creation.`,
    description:
      "The Panchakshara mantra of Lord Shiva. One of the most powerful and widely recited mantras in Shaivism.",
  },
  {
    id: "mantra-4",
    titleEn: "Ganesh Mantra",
    titleHi: "गणेश मंत्र",
    deity: "Ganesha",
    faith: "Hindu",
    mantraText: `ॐ गं गणपतये नमः।
ॐ एकदन्ताय विद्महे
वक्रतुण्डाय धीमहि।
तन्नो दन्ती प्रचोदयात्॥`,
    transliteration: `Om Gam Ganapataye Namah
Om Ekadantaya Vidmahe
Vakratundaya Dhimahi
Tanno Dantih Prachodayat`,
    meaning: `Om Gam Ganapataye Namah:
"Om, salutations to Ganapati (Ganesha) with the Gam seed sound."

Ganesha Gayatri:
"We know the single-tusked one (Ganesha),
We meditate on the curved-trunk one,
May that tusked one inspire us."`,
    description:
      "The primary mantra for invoking Lord Ganesha, the remover of obstacles. Recited before beginning any important work.",
  },
  {
    id: "mantra-5",
    titleEn: "Hanuman Moola Mantra",
    titleHi: "हनुमान मूल मंत्र",
    deity: "Hanuman",
    faith: "Hindu",
    mantraText: `ॐ हं हनुमते नमः।
ॐ नमो भगवते हनुमते
नमो नमः।
ॐ हं हनुमते रुद्रात्मकाय हुं फट्।`,
    transliteration: `Om Ham Hanumate Namah
Om Namo Bhagavate Hanumate
Namo Namah
Om Ham Hanumate Rudratmakaya Hum Phat`,
    meaning: `Om Ham Hanumate Namah: "Salutations to Lord Hanuman with the seed sound Ham."

The powerful Hanuman mantra for protection, courage, and devotion.
Rudratmakaya = embodiment of Rudra (Shiva's fierce form)
This mantra is recited for protection from negative energies.`,
    description:
      "The root mantra of Lord Hanuman. Invoking Hanuman for strength, protection, courage, and devotion to Rama.",
  },
  {
    id: "mantra-6",
    titleEn: "Lakshmi Mantra",
    titleHi: "लक्ष्मी मंत्र",
    deity: "Lakshmi",
    faith: "Hindu",
    mantraText: `ॐ श्रीं ह्रीं श्रीं
कमले कमलालये प्रसीद प्रसीद
श्रीं ह्रीं श्रीं ॐ
महालक्ष्म्यै नमः॥`,
    transliteration: `Om Shrim Hrim Shrim
Kamale Kamalaalaye Prasida Prasida
Shrim Hrim Shrim Om
Mahalakshmyai Namah`,
    meaning: `Shrim - The seed mantra of Lakshmi (wealth, abundance)
Hrim - The seed mantra of the divine mother (illusion, energy)
Kamale - O lotus-seated one
Kamalaalaye - O dweller in the lotus
Prasida Prasida - Please be gracious, be gracious
Mahalakshmyai Namah - Salutations to Mahalakshmi`,
    description:
      "The most powerful mantra for invoking Goddess Lakshmi to bless with wealth, prosperity, and abundance.",
  },
  {
    id: "mantra-7",
    titleEn: "Saraswati Mantra",
    titleHi: "सरस्वती मंत्र",
    deity: "Saraswati",
    faith: "Hindu",
    mantraText: `ॐ ऐं सरस्वत्यै नमः।
ॐ ऐं ह्रीं क्लीं
महासरस्वत्यै नमः॥`,
    transliteration: `Om Aim Saraswatyai Namah
Om Aim Hrim Klim
Mahasaraswatyai Namah`,
    meaning: `Aim - The seed sound of Saraswati (knowledge, speech, wisdom)
Hrim - The energy of the divine mother
Klim - The seed of attraction and fulfillment
Mahasaraswatyai - To the great Saraswati

Meaning: "Salutations to Goddess Saraswati, bestower of knowledge and wisdom."`,
    description:
      "The primary mantra for Goddess Saraswati, invoked for blessings in education, arts, music, and wisdom.",
  },
  {
    id: "mantra-8",
    titleEn: "Durga Mantra",
    titleHi: "दुर्गा मंत्र",
    deity: "Durga",
    faith: "Hindu",
    mantraText: `ॐ दुं दुर्गायै नमः।
ॐ ह्रीं दुं दुर्गायै नमः।
सर्वाबाधा विनिर्मुक्तो,
धन धान्य सुतान्वितः।
मनुष्यो मत्प्रसादेन,
भविष्यति न संशयः॥`,
    transliteration: `Om Dum Durgayai Namah
Om Hrim Dum Durgayai Namah
Sarvabadha Vinirmukto
Dhana Dhanya Sutanvitah
Manushyo Matprasadena
Bhavishyati Na Samshayah`,
    meaning: `Dum - The seed sound of Durga (protection, power)
Hrim - The divine mother's energy

"Freed from all obstacles and afflictions,
Endowed with wealth, grain, and progeny,
By the grace of this Devi (Durga),
Man shall be (thus blessed), there is no doubt."`,
    description:
      "The powerful mantra of Maa Durga for protection from evil, fear, and obstacles. Invoked for courage and divine protection.",
  },
  {
    id: "mantra-9",
    titleEn: "Krishna Beej Mantra",
    titleHi: "कृष्ण बीज मंत्र",
    deity: "Krishna",
    faith: "Hindu",
    mantraText: `ॐ क्लीं कृष्णाय नमः।
ॐ क्लीं कृष्णाय गोविन्दाय
गोपीजनवल्लभाय स्वाहा॥
हरे कृष्ण हरे कृष्ण
कृष्ण कृष्ण हरे हरे।
हरे राम हरे राम
राम राम हरे हरे॥`,
    transliteration: `Om Klim Krishnaya Namah
Om Klim Krishnaya Govindaya
Gopijanavallabhaya Svaha
Hare Krishna Hare Krishna
Krishna Krishna Hare Hare
Hare Rama Hare Rama
Rama Rama Hare Hare`,
    meaning: `Klim - Seed mantra of Lord Krishna (attraction, love, fulfillment)
Govindaya - To the protector of cows
Gopijanavallabhaya - To the beloved of the Gopis

The Hare Krishna Mahamantra:
Hare = O Hari (the enchanting one)
Krishna = the dark one, the all-attractive
Rama = the source of all pleasure
This mantra is the Maha Mantra for the current age (Kali Yuga).`,
    description:
      "The seed mantra and Maha Mantra of Lord Krishna for love, devotion, and liberation.",
  },
  {
    id: "mantra-10",
    titleEn: "Navkar Mantra",
    titleHi: "नवकार मंत्र",
    deity: "Panch Parmeshthi",
    faith: "Jain",
    mantraText: ` णमो अरिहंताणं।
णमो सिद्धाणं।
णमो आयरियाणं।
णमो उवज्झायाणं।
णमो लोए सव्वसाहूणं।

एसो पंच णमुक्कारो।
सव्वपावप्पणासणो।
मंगलाणं च सव्वेसिं।
पढमं हवइ मंगलं॥`,
    transliteration: `Namo Arihantanam
Namo Siddhanam
Namo Ayariyanam
Namo Uvajjhayanam
Namo Loe Savvasahunam
Eso Panch Namukkaro
Savvapavappanasano
Mangalanam Cha Savvesim
Padhamam Havai Mangalam`,
    meaning: `I bow to the Arihantas (enlightened souls who have conquered inner enemies).
I bow to the Siddhas (liberated souls).
I bow to the Acharyas (spiritual leaders).
I bow to the Upadhyayas (teachers of scriptures).
I bow to all the Sadhus (ascetics) in the world.

This fivefold obeisance destroys all sins.
Amongst all auspicious things,
This is the most auspicious.`,
    description:
      "The supreme Jain mantra and the most important prayer in Jainism. A salutation to all enlightened beings.",
  },
  {
    id: "mantra-11",
    titleEn: "Mool Mantar (Sikh)",
    titleHi: "ਮੂਲ ਮੰਤਰ",
    deity: "Waheguru",
    faith: "Sikh",
    mantraText: `ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ
ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ
ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥`,
    transliteration: `Ik Onkar
Sat Naam Karta Purkh
Nirbhau Nirvair Akal Murat
Ajooni Saibhan Gur Prasad`,
    meaning: `Ik Onkar - One God, One Universal Creator
Sat Naam - Truth is His Name
Karta Purkh - He is the Creator
Nirbhau - Without fear
Nirvair - Without hatred
Akal Murat - Timeless form
Ajooni - Beyond birth and death
Saibhan - Self-illuminated
Gur Prasad - Realized by the Guru's grace

This is the foundational statement of Sikh philosophy, opening the Guru Granth Sahib.`,
    description:
      "The foundational statement of Sikh theology from the Guru Granth Sahib. Composed by Guru Nanak Dev Ji.",
  },
  {
    id: "mantra-12",
    titleEn: "Navagraha Mantra",
    titleHi: "नवग्रह मंत्र",
    deity: "Nine Planets",
    faith: "Hindu",
    mantraText: `ॐ ब्रह्मा मुरारिस्त्रिपुरान्तकारी
भानुः शशी भूमिसुतो बुधश्च।
गुरुश्च शुक्रः शनिराहुकेतवः
सर्वे ग्रहाः शांतिकरा भवन्तु॥

सूर्याय नमः। चन्द्राय नमः।
मंगलाय नमः। बुधाय नमः।
बृहस्पतये नमः। शुक्राय नमः।
शनये नमः। राहवे नमः।
केतवे नमः।`,
    transliteration: `Om Brahma Muraris-tripurantakari
Bhanuh Shashi Bhumisuto Budhashcha
Gurushcha Shukraha Shanirahuketa-vaha
Sarve Grahaha Shantikarah Bhavantu

Suryaya Namah. Chandraya Namah.
Mangalaya Namah. Budhaya Namah.
Brihaspataye Namah. Shukraya Namah.
Shanaye Namah. Rahave Namah.
Ketave Namah.`,
    meaning: `May Brahma, the destroyer of Tripura (Shiva), the Sun, the Moon, Mars (son of the Earth), Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu — all the nine planets — bring peace.

Individual salutations to each planet:
Sun (Surya), Moon (Chandra), Mars (Mangala), Mercury (Budha), Jupiter (Brihaspati), Venus (Shukra), Saturn (Shani), Rahu, and Ketu.`,
    description:
      "The comprehensive Navagraha mantra for peace and balance of all nine planetary energies in the birth chart.",
  },
  {
    id: "mantra-13",
    titleEn: "Shani Mantra",
    titleHi: "शनि मंत्र",
    deity: "Shani Dev",
    faith: "Hindu",
    mantraText: `ॐ शं शनैश्चराय नमः।
नीलांजनसमाभासं रविपुत्रं यमाग्रजम्।
छायामार्तण्डसम्भूतं तं नमामि शनैश्चरम्॥`,
    transliteration: `Om Sham Shanaishcharaya Namah
Nilanjanasamabhasam Raviputram Yamagrajam
Chayamartandasambhutam Tam Namami Shanaishcharam`,
    meaning: `Sham - The seed mantra of Saturn (Shani)

"I bow to Shanaishchara (Saturn),
Who has the appearance of blue collyrium,
Who is the son of the Sun (Ravi),
The elder brother of Yama (god of death),
Born from Chaya (shadow) and Martanda (the Sun).
I bow to Shanaishchara."`,
    description:
      "The primary mantra to propitiate Shani Dev (Saturn). Recited on Saturdays to mitigate the effects of Sade Sati and other Saturn-related challenges.",
  },
  {
    id: "mantra-14",
    titleEn: "Surya Mantra",
    titleHi: "सूर्य मंत्र",
    deity: "Surya",
    faith: "Hindu",
    mantraText: `ॐ सूर्याय नमः।
ॐ ह्रीं ह्रीं सूर्याय नमः।
जपाकुसुमसंकाशं काश्यपेयं महाद्युतिम्।
तमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥`,
    transliteration: `Om Suryaya Namah
Om Hrim Hrim Suryaya Namah
Japaakusumasamkaasham Kaashyapeyam Mahaadyutim
Tamo'rim Sarvapaapagnam Pranato'smi Divakaram`,
    meaning: `Hrim - The seed mantra of the divine mother/sun
Suryaya Namah - Salutations to the Sun

"I bow to the Sun, whose appearance resembles the hibiscus flower,
Who is the son of Kashyapa, who is of great brilliance,
Enemy of darkness, destroyer of all sins,
I bow to the day-maker (Surya)."`,
    description:
      "The primary mantra for Surya Dev, the Sun God. Recited during Surya Namaskar and on Sundays for vitality and clarity.",
  },
  {
    id: "mantra-15",
    titleEn: "Kali Mantra",
    titleHi: "काली मंत्र",
    deity: "Kali",
    faith: "Hindu",
    mantraText: `ॐ क्रीं काल्यै नमः।
ॐ ह्रीं श्रीं क्रीं
परमेश्वरि कालिके
स्वाहा॥
क्रीं क्रीं क्रीं ह्रीं ह्रीं
हुं हुं दक्षिणे कालिके
क्रीं क्रीं क्रीं ह्रीं ह्रीं हुं हुं स्वाहा॥`,
    transliteration: `Om Krim Kalikaye Namah
Om Hrim Shrim Krim
Parameshvari Kalike
Svaha
Krim Krim Krim Hrim Hrim
Hum Hum Daksine Kalike
Krim Krim Krim Hrim Hrim Hum Hum Svaha`,
    meaning: `Krim - Seed mantra of Kali (time, transformation, liberation)
Parameshvari - Supreme Goddess
Daksine - Of the south (Dakshinakali, the benevolent form)

This is a powerful Tantric mantra for Maa Kali, the goddess of time, transformation, and liberation from ego and illusion. She destroys fear and grants liberation.`,
    description:
      "The powerful mantra of Maa Kali, the fierce form of the Divine Mother. Invoked for protection from evil and liberation from fear.",
  },
  {
    id: "hindu-mantra-016",
    titleEn: "Ram Moola Mantra",
    titleHi: "राम मूल मंत्र",
    deity: "Ram",
    faith: "Hindu" as const,
    mantraText: "ॐ रां रामाय नमः",
    transliteration: "Om Raam Raamaaya Namah",
    meaning:
      "I bow to Lord Ram. This mantra invokes the divine grace of Lord Ram for righteousness and protection.",
    description:
      "The seed mantra of Lord Ram, chanted for protection, righteousness, and peace.",
  },
  {
    id: "hindu-mantra-017",
    titleEn: "Vishnu Moola Mantra",
    titleHi: "विष्णु मूल मंत्र",
    deity: "Vishnu",
    faith: "Hindu" as const,
    mantraText: "ॐ नमो नारायणाय",
    transliteration: "Om Namo Naaraayanaaya",
    meaning:
      "I bow to Lord Narayana (Vishnu). This mantra invokes the sustaining and preserving energy of the universe.",
    description:
      "The eight-syllable Ashtakshara mantra of Lord Vishnu, one of the most sacred Vaishnava mantras.",
  },
  {
    id: "hindu-mantra-018",
    titleEn: "Om Namo Bhagavate Vasudevaya",
    titleHi: "ॐ नमो भगवते वासुदेवाय",
    deity: "Krishna",
    faith: "Hindu" as const,
    mantraText: "ॐ नमो भगवते वासुदेवाय",
    transliteration: "Om Namo Bhagavate Vasudevaaya",
    meaning:
      "I bow to the Lord who dwells in all beings (Vasudeva/Krishna). This 12-syllable mantra is the Dvadasakshara mantra.",
    description:
      "One of the most powerful Vaishnava mantras, dedicated to Lord Krishna as Vasudeva, son of Vasudeva.",
  },
  {
    id: "hindu-mantra-019",
    titleEn: "Shiva Panchakshara Mantra",
    titleHi: "शिव पंचाक्षर मंत्र",
    deity: "Shiva",
    faith: "Hindu" as const,
    mantraText: "नमः शिवाय",
    transliteration: "Namah Shivaaya",
    meaning:
      "I bow to Shiva. The five syllables Na-Ma-Shi-Va-Ya represent the five elements: earth, water, fire, air, and space.",
    description:
      "The Panchakshara (five-syllable) mantra is the most fundamental mantra of Lord Shiva, found in the Shri Rudram.",
  },
  {
    id: "hindu-mantra-020",
    titleEn: "Baglamukhi Mantra",
    titleHi: "बगलामुखी मंत्र",
    deity: "Baglamukhi",
    faith: "Hindu" as const,
    mantraText:
      "ॐ ह्लीं बगलामुखी सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा",
    transliteration:
      "Om Hleem Bagalamukhee Sarvadushtaanaam Vaacham Mukham Padam Stambhaya Jihvaam Keelaya Buddhim Vinaashaya Hleem Om Svaahaa",
    meaning:
      "O Baglamukhi, paralyze the speech, mouth, feet of all evil doers, pin down their tongue, destroy their intellect.",
    description:
      "Maa Baglamukhi is the 8th of the 10 Mahavidyas. This mantra is chanted for victory over enemies and protection.",
  },
  {
    id: "hindu-mantra-021",
    titleEn: "Dhanvantari Mantra",
    titleHi: "धन्वन्तरि मंत्र",
    deity: "Dhanvantari",
    faith: "Hindu" as const,
    mantraText:
      "ॐ नमो भगवते वासुदेवाय धन्वन्तरये अमृतकलश हस्ताय सर्वामय विनाशाय त्रैलोक्यनाथाय श्री महाविष्णवे नमः",
    transliteration:
      "Om Namo Bhagavate Vasudevaaya Dhanvantaraye Amritakalasha Hastaaya Sarvaamaya Vinaashaaya Trailokyanaathaaya Shri Mahavishnaave Namah",
    meaning:
      "I bow to Lord Dhanvantari, who holds the pot of nectar, who destroys all diseases, the lord of the three worlds.",
    description:
      "Lord Dhanvantari is the physician of the gods and the god of Ayurvedic medicine. Chanted for healing and good health.",
  },
  {
    id: "hindu-mantra-022",
    titleEn: "Hreem Beej Mantra",
    titleHi: "ह्रीं बीज मंत्र",
    deity: "Durga / Shakti",
    faith: "Hindu" as const,
    mantraText: "ह्रीं",
    transliteration: "Hreem",
    meaning:
      "The Maya Beeja or the seed syllable of the Divine Mother. It represents the creative power of consciousness.",
    description:
      "Hreem is the Shakti Beeja mantra, the seed sound of Maa Bhuvaneshwari. It invokes cosmic energy and illusion.",
  },
  {
    id: "hindu-mantra-023",
    titleEn: "Shreem Beej Mantra",
    titleHi: "श्रीं बीज मंत्र",
    deity: "Lakshmi",
    faith: "Hindu" as const,
    mantraText: "श्रीं",
    transliteration: "Shreem",
    meaning:
      "The Lakshmi Beeja or seed syllable of Goddess Lakshmi. It attracts abundance, prosperity, and grace.",
    description:
      "Shreem is the bija mantra of Goddess Lakshmi. Chanting it 108 times daily is said to bring wealth and good fortune.",
  },
  {
    id: "hindu-mantra-024",
    titleEn: "Kleem Beej Mantra",
    titleHi: "क्लीं बीज मंत्र",
    deity: "Krishna / Kama",
    faith: "Hindu" as const,
    mantraText: "क्लीं",
    transliteration: "Kleem",
    meaning:
      "The Kama Beeja or attraction seed syllable. It represents the power of love, attraction, and fulfillment of desires.",
    description:
      "Kleem is the beeja mantra of Lord Krishna and Kamadeva. Chanted for attraction, love, and desire fulfillment.",
  },
  {
    id: "hindu-mantra-025",
    titleEn: "Aim Beej Mantra",
    titleHi: "ऐं बीज मंत्र",
    deity: "Saraswati",
    faith: "Hindu" as const,
    mantraText: "ऐं",
    transliteration: "Aim",
    meaning:
      "The Vagbhava Beeja or seed syllable of Goddess Saraswati. It enhances intelligence, knowledge, and speech.",
    description:
      "Aim is the bija mantra of Goddess Saraswati. Chanting it improves memory, concentration, and creative expression.",
  },
  {
    id: "hindu-mantra-026",
    titleEn: "Gam Ganesh Beej Mantra",
    titleHi: "गं गणेश बीज मंत्र",
    deity: "Ganesh",
    faith: "Hindu" as const,
    mantraText: "ॐ गं गणपतये नमः",
    transliteration: "Om Gam Ganapataye Namah",
    meaning:
      "I bow to Lord Ganesha using His seed syllable Gam. This mantra removes obstacles and invites success.",
    description:
      "The most popular mantra of Lord Ganesha. Chanted before starting any new venture or task.",
  },
  {
    id: "hindu-mantra-027",
    titleEn: "Hanumate Mantra",
    titleHi: "हनुमते नमः मंत्र",
    deity: "Hanuman",
    faith: "Hindu" as const,
    mantraText:
      "ॐ नमो हनुमते रुद्रावताराय विश्वरूपाय अमितविक्रमाय प्रकटपराक्रमाय महाबलाय सूर्यकोटिसमप्रभाय रामदूताय स्वाहा",
    transliteration:
      "Om Namo Hanumate Rudraavataraaya Vishvarupaaya Amitavikramaaya Prakataparaakaramaaya Mahaabalaaya Suryakotisamaprabhaaya Raamaduutaaya Svaahaa",
    meaning:
      "I bow to Hanuman, the avatar of Rudra, of universal form, of immeasurable valor, of manifest prowess, of great strength, brilliant as a crore suns, the messenger of Ram.",
    description:
      "A powerful mantra invoking the full divine qualities of Lord Hanuman for strength and protection.",
  },
  {
    id: "hindu-mantra-028",
    titleEn: "Shri Ram Jay Ram Jay Jay Ram",
    titleHi: "श्री राम जय राम जय जय राम",
    deity: "Ram",
    faith: "Hindu" as const,
    mantraText: "श्री राम जय राम जय जय राम",
    transliteration: "Shri Raam Jaya Raam Jaya Jaya Raam",
    meaning:
      "Victory to Lord Ram! Victory to Lord Ram! Victory, victory to Lord Ram!",
    description:
      "A beloved mantra popularized by Sant Tukdoji Maharaj. Chanting it 108 times is said to be equivalent to reading the Ramayana.",
  },
  {
    id: "hindu-mantra-029",
    titleEn: "Chamunda Mantra",
    titleHi: "चामुण्डा मंत्र",
    deity: "Chamunda",
    faith: "Hindu" as const,
    mantraText: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
    transliteration: "Om Aim Hreem Kleem Chaamundaayai Vicche",
    meaning:
      "Invocation of Maa Chamunda with her three seed syllables. This mantra destroys negative forces and evil.",
    description:
      "Maa Chamunda is a fierce form of Durga. This mantra is chanted in Navratri for protection and power.",
  },
  {
    id: "hindu-mantra-030",
    titleEn: "Surya Beej Mantra",
    titleHi: "सूर्य बीज मंत्र",
    deity: "Surya",
    faith: "Hindu" as const,
    mantraText: "ॐ ह्रीं ह्रीं सूर्याय नमः",
    transliteration: "Om Hreem Hreem Suryaaya Namah",
    meaning:
      "I bow to the Sun God using His seed syllable. Chanting this mantra brings health, vitality, and success.",
    description:
      "The Surya Beej Mantra is chanted at sunrise for good health, clarity of mind, and removal of obstacles.",
  },
  {
    id: "hindu-mantra-031",
    titleEn: "Chandra Beej Mantra",
    titleHi: "चंद्र बीज मंत्र",
    deity: "Chandra",
    faith: "Hindu" as const,
    mantraText: "ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः",
    transliteration: "Om Shraam Shreem Shraum Sah Chandramasay Namah",
    meaning:
      "I bow to the Moon God. This mantra calms the mind and enhances peace, intuition, and emotional balance.",
    description:
      "The Chandra (Moon) Beej Mantra pacifies the moon in one's horoscope and brings mental peace.",
  },
  {
    id: "hindu-mantra-032",
    titleEn: "Mangal (Mars) Beej Mantra",
    titleHi: "मंगल बीज मंत्र",
    deity: "Mangal",
    faith: "Hindu" as const,
    mantraText: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
    transliteration: "Om Kraam Kreem Kraum Sah Bhaumaaya Namah",
    meaning:
      "I bow to Mars. Chanting this mantra reduces the malefic effects of Mars and builds courage and strength.",
    description:
      "The Mars Beej Mantra is chanted to appease planet Mars and to overcome Mangal Dosha in the horoscope.",
  },
  {
    id: "hindu-mantra-033",
    titleEn: "Budh (Mercury) Beej Mantra",
    titleHi: "बुध बीज मंत्र",
    deity: "Budh",
    faith: "Hindu" as const,
    mantraText: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
    transliteration: "Om Braam Breem Braum Sah Budhaaya Namah",
    meaning:
      "I bow to Mercury. This mantra enhances intelligence, communication skills, and business acumen.",
    description:
      "The Budha (Mercury) Beej Mantra is chanted to strengthen Mercury in the horoscope and improve intellect.",
  },
  {
    id: "hindu-mantra-034",
    titleEn: "Guru (Jupiter) Beej Mantra",
    titleHi: "गुरु बीज मंत्र",
    deity: "Guru",
    faith: "Hindu" as const,
    mantraText: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
    transliteration: "Om Graam Greem Graum Sah Gurave Namah",
    meaning:
      "I bow to Jupiter. This mantra brings wisdom, prosperity, children, and spiritual knowledge.",
    description:
      "The Guru (Jupiter) Beej Mantra is chanted to strengthen Jupiter and gain blessings of wisdom and fortune.",
  },
  {
    id: "hindu-mantra-035",
    titleEn: "Shukra (Venus) Beej Mantra",
    titleHi: "शुक्र बीज मंत्र",
    deity: "Shukra",
    faith: "Hindu" as const,
    mantraText: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
    transliteration: "Om Draam Dreem Draum Sah Shukraaya Namah",
    meaning:
      "I bow to Venus. This mantra brings love, beauty, luxury, and artistic talents.",
    description:
      "The Shukra (Venus) Beej Mantra improves relationships, brings material comfort, and enhances creative talents.",
  },
  {
    id: "hindu-mantra-036",
    titleEn: "Rahu Beej Mantra",
    titleHi: "राहु बीज मंत्र",
    deity: "Rahu",
    faith: "Hindu" as const,
    mantraText: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः",
    transliteration: "Om Bhraam Bhreem Bhraum Sah Raahave Namah",
    meaning:
      "I bow to Rahu. This mantra pacifies Rahu and reduces confusion, fear, and sudden misfortunes.",
    description:
      "The Rahu Beej Mantra is chanted to reduce malefic effects of Rahu and Rahu dasha in one's life.",
  },
  {
    id: "hindu-mantra-037",
    titleEn: "Ketu Beej Mantra",
    titleHi: "केतु बीज मंत्र",
    deity: "Ketu",
    faith: "Hindu" as const,
    mantraText: "ॐ स्त्रां स्त्रीं स्त्रौं सः केतवे नमः",
    transliteration: "Om Straam Streem Straum Sah Ketave Namah",
    meaning:
      "I bow to Ketu. This mantra pacifies Ketu and brings spiritual insight and liberation.",
    description:
      "The Ketu Beej Mantra is chanted to reduce malefic Ketu effects and for spiritual awakening.",
  },
  {
    id: "hindu-mantra-038",
    titleEn: "Mahalakshmi Mantra",
    titleHi: "महालक्ष्मी मंत्र",
    deity: "Mahalakshmi",
    faith: "Hindu" as const,
    mantraText:
      "ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः",
    transliteration:
      "Om Shreem Hreem Shreem Kamale Kamalaalaye Praseeda Praseeda Om Shreem Hreem Shreem Mahaalakshmyai Namah",
    meaning:
      "O Mahalakshmi who dwells in the lotus, be pleased, be pleased. I bow to the great Lakshmi.",
    description:
      "A powerful mantra of Goddess Mahalakshmi chanted for wealth, prosperity, and divine grace.",
  },
  {
    id: "hindu-mantra-039",
    titleEn: "Saraswati Moola Mantra",
    titleHi: "सरस्वती मूल मंत्र",
    deity: "Saraswati",
    faith: "Hindu" as const,
    mantraText: "ॐ ऐं सरस्वत्यै नमः",
    transliteration: "Om Aim Sarasvatyai Namah",
    meaning:
      "I bow to Goddess Saraswati using her seed syllable Aim. Brings knowledge, arts, and speech.",
    description:
      "The Saraswati Moola Mantra is chanted for excellence in education, arts, music, and speech.",
  },
  {
    id: "hindu-mantra-040",
    titleEn: "Parvati Mantra",
    titleHi: "पार्वती मंत्र",
    deity: "Parvati",
    faith: "Hindu" as const,
    mantraText: "ॐ उमायै नमः",
    transliteration: "Om Umaayai Namah",
    meaning:
      "I bow to Uma (Parvati). This mantra invokes the gentle, nurturing aspect of the Divine Mother.",
    description:
      "Chanted to invoke Goddess Parvati for marital harmony, love, and family well-being.",
  },
  {
    id: "hindu-mantra-041",
    titleEn: "Radha Mantra",
    titleHi: "राधा मंत्र",
    deity: "Radha",
    faith: "Hindu" as const,
    mantraText: "ॐ राधिकायै नमः",
    transliteration: "Om Raadhikaayai Namah",
    meaning:
      "I bow to Radhika (Radha). Invokes the divine love and devotion personified by Radha.",
    description:
      "Chanted for unconditional love, devotion, and spiritual union with the divine.",
  },
  {
    id: "hindu-mantra-042",
    titleEn: "Tulsi Mantra",
    titleHi: "तुलसी मंत्र",
    deity: "Tulsi",
    faith: "Hindu" as const,
    mantraText: "ॐ श्री तुलस्यै नमः",
    transliteration: "Om Shri Tulasyai Namah",
    meaning:
      "I bow to the sacred Tulsi plant, beloved of Lord Vishnu. Invokes purification and divine grace.",
    description:
      "Chanted while watering or worshipping the Tulsi plant. Brings peace, purification, and Vishnu's blessings.",
  },
  {
    id: "hindu-mantra-043",
    titleEn: "Ganga Mantra",
    titleHi: "गंगा मंत्र",
    deity: "Ganga",
    faith: "Hindu" as const,
    mantraText: "ॐ नमः शिवायै नारायण्यै दशभुजायै महागौर्यै नमोनमः",
    transliteration:
      "Om Namah Shivaayai Naaraaanyai Dashbhujaayai Mahaagauryai Namo Namah",
    meaning:
      "I repeatedly bow to the great Gauri (Ganga), the ten-armed one, the divine.",
    description:
      "Chanted when taking a dip in the Ganga or performing Ganga puja for purification and blessings.",
  },
  {
    id: "jain-mantra-001",
    titleEn: "Rishabhadeva (Adinath) Mantra",
    titleHi: "ऋषभदेव (आदिनाथ) मंत्र",
    deity: "Rishabhadeva",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं ऋषभदेवाय नमः",
    transliteration: "Om Hreem Shreem Rishabhadevaya Namah",
    meaning:
      "I bow to Lord Rishabhadeva, the first Tirthankar. May He bestow liberation and peace upon us.",
    description:
      "The mantra of the first Jain Tirthankar Rishabhadeva (Adinath), born in Ayodhya. Chanted for spiritual awakening.",
  },
  {
    id: "jain-mantra-002",
    titleEn: "Ajitnath Mantra",
    titleHi: "अजितनाथ मंत्र",
    deity: "Ajitnath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं अजितनाथाय नमः",
    transliteration: "Om Hreem Shreem Ajitnaathaaya Namah",
    meaning:
      "I bow to Lord Ajitnath, the second Tirthankar, the unconquerable one.",
    description:
      "Mantra of the second Jain Tirthankar Ajitnath. Chanted for strength and overcoming all obstacles.",
  },
  {
    id: "jain-mantra-003",
    titleEn: "Sambhavnath Mantra",
    titleHi: "सम्भवनाथ मंत्र",
    deity: "Sambhavnath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं सम्भवनाथाय नमः",
    transliteration: "Om Hreem Shreem Sambhavnaathaaya Namah",
    meaning:
      "I bow to Lord Sambhavnath, the third Tirthankar, in whom all possibilities arise.",
    description:
      "Mantra of the third Jain Tirthankar Sambhavnath, born in Shravasti. Chanted for auspiciousness.",
  },
  {
    id: "jain-mantra-004",
    titleEn: "Abhinandan Swami Mantra",
    titleHi: "अभिनंदन स्वामी मंत्र",
    deity: "Abhinandan Swami",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं अभिनंदनस्वामिने नमः",
    transliteration: "Om Hreem Shreem Abhinandanasvamine Namah",
    meaning:
      "I bow to Lord Abhinandan Swami, the fourth Tirthankar, who is worthy of salutation.",
    description:
      "Mantra of the fourth Jain Tirthankar Abhinandan Swami, born in Ayodhya.",
  },
  {
    id: "jain-mantra-005",
    titleEn: "Sumatinath Mantra",
    titleHi: "सुमतिनाथ मंत्र",
    deity: "Sumatinath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं सुमतिनाथाय नमः",
    transliteration: "Om Hreem Shreem Sumatinnathaaya Namah",
    meaning:
      "I bow to Lord Sumatinath, the fifth Tirthankar, the lord of right understanding.",
    description:
      "Mantra of Sumatinath, the fifth Tirthankar. Chanted for wisdom, right understanding, and intellect.",
  },
  {
    id: "jain-mantra-006",
    titleEn: "Padmaprabha Swami Mantra",
    titleHi: "पद्मप्रभ स्वामी मंत्र",
    deity: "Padmaprabha",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं पद्मप्रभाय नमः",
    transliteration: "Om Hreem Shreem Padmaprabhaaya Namah",
    meaning:
      "I bow to Lord Padmaprabha, the sixth Tirthankar, who is radiant like a lotus.",
    description:
      "Mantra of Padmaprabha Swami, the sixth Tirthankar, born in Kaushambhi. Associated with lotus radiance.",
  },
  {
    id: "jain-mantra-007",
    titleEn: "Suparshvanath Mantra",
    titleHi: "सुपार्श्वनाथ मंत्र",
    deity: "Suparshvanath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं सुपार्श्वनाथाय नमः",
    transliteration: "Om Hreem Shreem Suparshvanaathaaya Namah",
    meaning:
      "I bow to Lord Suparshvanath, the seventh Tirthankar, of auspicious sides.",
    description:
      "Mantra of the seventh Jain Tirthankar Suparshvanath, born in Varanasi.",
  },
  {
    id: "jain-mantra-008",
    titleEn: "Chandraprabha Mantra",
    titleHi: "चंद्रप्रभ मंत्र",
    deity: "Chandraprabha",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं चंद्रप्रभाय नमः",
    transliteration: "Om Hreem Shreem Chandraprabhaaya Namah",
    meaning:
      "I bow to Lord Chandraprabha, the eighth Tirthankar, who is radiant like the moon.",
    description:
      "Mantra of Chandraprabha Ji, the eighth Tirthankar, born in Chandrapuri. Chanted for peace and purity.",
  },
  {
    id: "jain-mantra-009",
    titleEn: "Suvidhinath (Pushpadanta) Mantra",
    titleHi: "सुविधिनाथ (पुष्पदंत) मंत्र",
    deity: "Suvidhinath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं सुविधिनाथाय नमः",
    transliteration: "Om Hreem Shreem Suvidhinaathaaya Namah",
    meaning:
      "I bow to Lord Suvidhinath (Pushpadanta), the ninth Tirthankar, who shows the path of right conduct.",
    description:
      "Mantra of the ninth Tirthankar Suvidhinath (also called Pushpadanta), born in Kakandi.",
  },
  {
    id: "jain-mantra-010",
    titleEn: "Shitalnath Mantra",
    titleHi: "शीतलनाथ मंत्र",
    deity: "Shitalnath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं शीतलनाथाय नमः",
    transliteration: "Om Hreem Shreem Sheetalanaathaaya Namah",
    meaning:
      "I bow to Lord Shitalnath, the tenth Tirthankar, the cool and soothing one.",
    description:
      "Mantra of the tenth Tirthankar Shitalnath, born in Bhadrilpur. Chanted for peace and mental coolness.",
  },
  {
    id: "jain-mantra-011",
    titleEn: "Shreyansnath Mantra",
    titleHi: "श्रेयांसनाथ मंत्र",
    deity: "Shreyansnath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं श्रेयांसनाथाय नमः",
    transliteration: "Om Hreem Shreem Shreyaansanaathaaya Namah",
    meaning:
      "I bow to Lord Shreyansnath, the eleventh Tirthankar, who brings prosperity and well-being.",
    description:
      "Mantra of the eleventh Tirthankar Shreyansnath, born in Simhapuri.",
  },
  {
    id: "jain-mantra-012",
    titleEn: "Vasupujya Swami Mantra",
    titleHi: "वासुपूज्य स्वामी मंत्र",
    deity: "Vasupujya",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं वासुपूज्यस्वामिने नमः",
    transliteration: "Om Hreem Shreem Vaasupujyasvamine Namah",
    meaning:
      "I bow to Lord Vasupujya Swami, the twelfth Tirthankar, worshipped by all.",
    description:
      "Mantra of the twelfth Tirthankar Vasupujya Swami, born in Champapuri.",
  },
  {
    id: "jain-mantra-013",
    titleEn: "Vimalnath Mantra",
    titleHi: "विमलनाथ मंत्र",
    deity: "Vimalnath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं विमलनाथाय नमः",
    transliteration: "Om Hreem Shreem Vimalanaathaaya Namah",
    meaning:
      "I bow to Lord Vimalnath, the thirteenth Tirthankar, the pure and spotless one.",
    description:
      "Mantra of the thirteenth Tirthankar Vimalnath, born in Kampilyapur. Chanted for purity.",
  },
  {
    id: "jain-mantra-014",
    titleEn: "Anantnath Mantra",
    titleHi: "अनंतनाथ मंत्र",
    deity: "Anantnath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं अनंतनाथाय नमः",
    transliteration: "Om Hreem Shreem Anantanaathaaya Namah",
    meaning:
      "I bow to Lord Anantnath, the fourteenth Tirthankar, the infinite and boundless one.",
    description:
      "Mantra of the fourteenth Tirthankar Anantnath, born in Ayodhya.",
  },
  {
    id: "jain-mantra-015",
    titleEn: "Dharamnath Mantra",
    titleHi: "धर्मनाथ मंत्र",
    deity: "Dharamnath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं धर्मनाथाय नमः",
    transliteration: "Om Hreem Shreem Dharmanaathaaya Namah",
    meaning:
      "I bow to Lord Dharamnath, the fifteenth Tirthankar, the lord of righteousness.",
    description:
      "Mantra of the fifteenth Tirthankar Dharamnath, born in Ratnapur.",
  },
  {
    id: "jain-mantra-016",
    titleEn: "Shantinath Mantra",
    titleHi: "शांतिनाथ मंत्र",
    deity: "Shantinath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं शांतिनाथाय नमः",
    transliteration: "Om Hreem Shreem Shaantinnathaaya Namah",
    meaning:
      "I bow to Lord Shantinath, the sixteenth Tirthankar, the lord of peace.",
    description:
      "Mantra of Shantinath, the sixteenth Tirthankar, born in Hastinapur. Widely chanted for peace.",
  },
  {
    id: "jain-mantra-017",
    titleEn: "Kunthunath Mantra",
    titleHi: "कुंथुनाथ मंत्र",
    deity: "Kunthunath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं कुंथुनाथाय नमः",
    transliteration: "Om Hreem Shreem Kunthunnathaaya Namah",
    meaning:
      "I bow to Lord Kunthunath, the seventeenth Tirthankar, the remover of hardships.",
    description:
      "Mantra of the seventeenth Tirthankar Kunthunath, born in Hastinapur.",
  },
  {
    id: "jain-mantra-018",
    titleEn: "Arahnath Mantra",
    titleHi: "अरहनाथ मंत्र",
    deity: "Arahnath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं अरहनाथाय नमः",
    transliteration: "Om Hreem Shreem Arhannaathaaya Namah",
    meaning:
      "I bow to Lord Arahnath, the eighteenth Tirthankar, the worthy one.",
    description:
      "Mantra of the eighteenth Tirthankar Arahnath, born in Hastinapur.",
  },
  {
    id: "jain-mantra-019",
    titleEn: "Mallinath Mantra",
    titleHi: "मल्लिनाथ मंत्र",
    deity: "Mallinath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं मल्लिनाथाय नमः",
    transliteration: "Om Hreem Shreem Mallinnathaaya Namah",
    meaning:
      "I bow to Lord Mallinath, the nineteenth Tirthankar, depicted as female in Shvetambara tradition.",
    description:
      "Mantra of the nineteenth Tirthankar Mallinath, born in Mithila. Unique Tirthankar considered female by Shvetambaras.",
  },
  {
    id: "jain-mantra-020",
    titleEn: "Munisuvratnath Mantra",
    titleHi: "मुनिसुव्रतनाथ मंत्र",
    deity: "Munisuvratnath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं मुनिसुव्रतनाथाय नमः",
    transliteration: "Om Hreem Shreem Munisuvratanaathaaya Namah",
    meaning:
      "I bow to Lord Munisuvratnath, the twentieth Tirthankar, who has taken the great vow.",
    description:
      "Mantra of the twentieth Tirthankar Munisuvratnath, born in Rajgruhi.",
  },
  {
    id: "jain-mantra-021",
    titleEn: "Naminath Mantra",
    titleHi: "नमिनाथ मंत्र",
    deity: "Naminath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं नमिनाथाय नमः",
    transliteration: "Om Hreem Shreem Naminathaaya Namah",
    meaning:
      "I bow to Lord Naminath, the twenty-first Tirthankar, who is bowed to by all.",
    description:
      "Mantra of the twenty-first Tirthankar Naminath, born in Mithila.",
  },
  {
    id: "jain-mantra-022",
    titleEn: "Neminath Mantra",
    titleHi: "नेमिनाथ मंत्र",
    deity: "Neminath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं नेमिनाथाय नमः",
    transliteration: "Om Hreem Shreem Neminathaaya Namah",
    meaning:
      "I bow to Lord Neminath (Arishtanemi), the twenty-second Tirthankar, who attained liberation on Girnar.",
    description:
      "Mantra of Neminath, the twenty-second Tirthankar, born in Dwarka. He was cousin of Lord Krishna.",
  },
  {
    id: "jain-mantra-023",
    titleEn: "Parshvanath Mantra",
    titleHi: "पार्श्वनाथ मंत्र",
    deity: "Parshvanath",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं पार्श्वनाथाय नमः",
    transliteration: "Om Hreem Shreem Parshvanaathaaya Namah",
    meaning:
      "I bow to Lord Parshvanath, the twenty-third Tirthankar, protector of all beings.",
    description:
      "Mantra of Parshvanath, the twenty-third Tirthankar, born in Varanasi. Protected by Dharanendra and Padmavati.",
  },
  {
    id: "jain-mantra-024",
    titleEn: "Mahavir Swami Mantra",
    titleHi: "महावीर स्वामी मंत्र",
    deity: "Mahavir",
    faith: "Jain" as const,
    mantraText: "ॐ ह्रीं श्रीं वर्धमानाय नमः",
    transliteration: "Om Hreem Shreem Vardhamanaaya Namah",
    meaning:
      "I bow to Lord Vardhaman (Mahavir), the twenty-fourth and last Tirthankar of this era.",
    description:
      "Mantra of Mahavir Swami, the twenty-fourth Tirthankar, born in Kshatriya Kund. The most recent Tirthankar.",
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

export default function Mantra() {
  const [searchQuery, setSearchQuery] = useState("");
  const [faithFilter, setFaithFilter] = useState<FaithFilter>("All");
  const [selectedMantra, setSelectedMantra] = useState<MantraItem | null>(null);
  const [activeTab, setActiveTab] = useState<
    "mantra" | "transliteration" | "meaning"
  >("mantra");
  const { data: backendContents = [] } = useGetAllDevotionalContents();

  const backendMantras: MantraItem[] = backendContents
    .filter((c) => c.contentType === "mantra")
    .map((c) => ({
      id: c.id,
      titleEn: c.title,
      titleHi: c.title,
      deity: c.deity,
      faith: "Hindu" as const,
      mantraText: c.lyrics,
      transliteration: "",
      meaning: "",
      description: `${c.lyrics.slice(0, 120)}...`,
    }));

  const allMantras = useMemo(() => {
    const combined = [...SEED_MANTRAS, ...backendMantras];
    const unique = new Map(combined.map((m) => [m.id, m]));
    return Array.from(unique.values());
  }, [backendMantras]);

  const filtered = useMemo(() => {
    return allMantras.filter((m) => {
      const matchesFaith = faithFilter === "All" || m.faith === faithFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        m.titleEn.toLowerCase().includes(q) ||
        m.titleHi.toLowerCase().includes(q) ||
        m.deity.toLowerCase().includes(q);
      return matchesFaith && matchesSearch;
    });
  }, [allMantras, faithFilter, searchQuery]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.12 170) 0%, oklch(0.24 0.10 155) 50%, oklch(0.18 0.12 170) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, oklch(0.65 0.18 160) 0%, transparent 60%), radial-gradient(circle at 75% 50%, oklch(0.78 0.14 75) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="text-6xl mb-4">🔔</div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Mantra Sangrah
          </h1>
          <p
            className="font-body text-xl mb-1"
            style={{ color: "oklch(0.88 0.08 65)", fontFamily: "serif" }}
          >
            मंत्र संग्रह
          </p>
          <p
            className="font-body text-sm mt-3"
            style={{ color: "oklch(0.68 0.06 60)" }}
          >
            {filtered.length} Sacred Mantras — Sanskrit text, transliteration &
            meaning
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
                data-ocid="mantra.search_input"
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
            <div className="flex gap-1.5">
              {(["All", "Hindu", "Jain", "Sikh"] as FaithFilter[]).map((f) => (
                <button
                  type="button"
                  key={f}
                  data-ocid={`mantra.${f.toLowerCase()}.tab`}
                  onClick={() => setFaithFilter(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-all"
                  style={{
                    background:
                      faithFilter === f
                        ? "oklch(0.55 0.18 160)"
                        : "oklch(0.22 0.07 24)",
                    color: faithFilter === f ? "white" : "oklch(0.78 0.06 60)",
                    border: "1px solid",
                    borderColor:
                      faithFilter === f
                        ? "oklch(0.55 0.18 160)"
                        : "oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  {f}
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
            <div data-ocid="mantra.empty_state" className="text-center py-20">
              <div className="text-5xl mb-4">🔔</div>
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                No mantras found for your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((mantra, idx) => {
                const faithStyle = FAITH_COLORS[mantra.faith];
                return (
                  <button
                    type="button"
                    key={mantra.id}
                    data-ocid={`mantra.item.${idx + 1}`}
                    onClick={() => {
                      setSelectedMantra(mantra);
                      setActiveTab("mantra");
                    }}
                    className="text-left p-5 rounded-xl border transition-all duration-200 hover:scale-[1.02] group cursor-pointer"
                    style={{
                      background: "oklch(0.20 0.07 24)",
                      borderColor: "oklch(0.78 0.14 75 / 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.55 0.18 160 / 0.45)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 20px oklch(0.55 0.18 160 / 0.10)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.78 0.14 75 / 0.15)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Bell
                        className="h-5 w-5 mt-0.5"
                        style={{ color: "oklch(0.55 0.18 160)" }}
                      />
                      <span
                        className="text-xs font-heading font-semibold px-2 py-0.5 rounded-full border"
                        style={{
                          background: faithStyle.bg,
                          color: faithStyle.text,
                          borderColor: faithStyle.border,
                        }}
                      >
                        {mantra.faith}
                      </span>
                    </div>
                    <h3
                      className="font-heading font-bold text-base mb-1 group-hover:underline"
                      style={{ color: "oklch(0.88 0.06 75)" }}
                    >
                      {mantra.titleEn}
                    </h3>
                    <p
                      className="font-body text-sm mb-2"
                      style={{
                        color: "oklch(0.70 0.06 65)",
                        fontFamily: "serif",
                      }}
                    >
                      {mantra.titleHi}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs mb-3 font-body"
                      style={{
                        borderColor: "oklch(0.55 0.18 160 / 0.3)",
                        color: "oklch(0.55 0.18 160)",
                      }}
                    >
                      {mantra.deity}
                    </Badge>
                    {/* Mantra preview */}
                    <div
                      className="p-3 rounded-lg mb-3"
                      style={{
                        background: "oklch(0.24 0.07 26)",
                        borderLeft: "3px solid oklch(0.55 0.18 160 / 0.5)",
                      }}
                    >
                      <p
                        className="font-body text-xs leading-relaxed line-clamp-3"
                        style={{
                          color: "oklch(0.75 0.04 65)",
                          fontFamily: "serif",
                        }}
                      >
                        {mantra.mantraText.split("\n").slice(0, 2).join("\n")}
                        ...
                      </p>
                    </div>
                    <p
                      className="font-body text-xs leading-relaxed line-clamp-2"
                      style={{ color: "oklch(0.60 0.04 55)" }}
                    >
                      {mantra.description}
                    </p>
                    <div className="mt-4 flex gap-3 text-xs font-heading">
                      <span style={{ color: "oklch(0.55 0.18 160)" }}>
                        Sanskrit
                      </span>
                      <span style={{ color: "oklch(0.50 0.04 50)" }}>·</span>
                      <span style={{ color: "oklch(0.55 0.18 160)" }}>
                        Transliteration
                      </span>
                      <span style={{ color: "oklch(0.50 0.04 50)" }}>·</span>
                      <span style={{ color: "oklch(0.55 0.18 160)" }}>
                        Meaning →
                      </span>
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
        open={!!selectedMantra}
        onOpenChange={(open) => !open && setSelectedMantra(null)}
      >
        <DialogContent
          className="max-w-2xl max-h-[85vh] overflow-y-auto"
          data-ocid="mantra.dialog"
          style={{
            background: "oklch(0.18 0.07 22)",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          {selectedMantra && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <DialogTitle
                      className="font-decorative text-xl"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {selectedMantra.titleEn}
                    </DialogTitle>
                    <p
                      className="font-body text-sm mt-1"
                      style={{
                        color: "oklch(0.70 0.06 65)",
                        fontFamily: "serif",
                      }}
                    >
                      {selectedMantra.titleHi}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className="font-body"
                      style={{
                        background: FAITH_COLORS[selectedMantra.faith].bg,
                        color: FAITH_COLORS[selectedMantra.faith].text,
                      }}
                    >
                      {selectedMantra.faith}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-body"
                      style={{
                        borderColor: "oklch(0.55 0.18 160 / 0.4)",
                        color: "oklch(0.55 0.18 160)",
                      }}
                    >
                      {selectedMantra.deity}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <p
                className="font-body text-sm mt-2"
                style={{ color: "oklch(0.65 0.04 55)" }}
              >
                {selectedMantra.description}
              </p>

              {/* Tab buttons */}
              <div className="flex gap-2 mt-3">
                {[
                  { key: "mantra", label: "मंत्र (Sanskrit)" },
                  { key: "transliteration", label: "Transliteration" },
                  { key: "meaning", label: "Meaning" },
                ].map((tab) => (
                  <Button
                    key={tab.key}
                    data-ocid={`mantra.${tab.key}.tab`}
                    size="sm"
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className="font-heading text-xs"
                    style={
                      activeTab === tab.key
                        ? { background: "oklch(0.55 0.18 160)", color: "white" }
                        : {
                            borderColor: "oklch(0.55 0.18 160 / 0.4)",
                            color: "oklch(0.55 0.18 160)",
                            background: "transparent",
                            border: "1px solid",
                          }
                    }
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>

              <div
                className="mt-4 p-5 rounded-xl border"
                style={{
                  background: "oklch(0.22 0.07 24)",
                  borderColor: "oklch(0.55 0.18 160 / 0.20)",
                }}
              >
                <pre
                  className="font-body text-sm leading-relaxed whitespace-pre-wrap"
                  style={{
                    color: "oklch(0.88 0.04 70)",
                    fontFamily: activeTab === "mantra" ? "serif" : "inherit",
                    fontSize: activeTab === "mantra" ? "1.05rem" : "0.875rem",
                  }}
                >
                  {activeTab === "mantra" && selectedMantra.mantraText}
                  {activeTab === "transliteration" &&
                    (selectedMantra.transliteration ||
                      "Transliteration not available.")}
                  {activeTab === "meaning" &&
                    (selectedMantra.meaning || "Meaning not available.")}
                </pre>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  data-ocid="mantra.close_button"
                  variant="outline"
                  onClick={() => setSelectedMantra(null)}
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
