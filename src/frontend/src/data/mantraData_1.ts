export interface MantraItem {
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

export const SEED_MANTRAS_1: MantraItem[] = [
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
];
