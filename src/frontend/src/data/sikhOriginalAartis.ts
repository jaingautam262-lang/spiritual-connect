export interface SikhOriginalAarti {
  id: string;
  name: string;
  gurmukhi: string;
  transliteration: string;
  meaningEnglish: string;
  meaningHindi: string;
  faith: "Sikh";
  source: string;
  ragAndMahala?: string;
}

export const sikhOriginalAartis: SikhOriginalAarti[] = [
  {
    id: "sikh-aarti-1",
    name: "Gagan Mai Thaal (Aarti)",
    source: "Guru Granth Sahib Ji",
    ragAndMahala: "Raag Dhanasari, Mahala 1 — Guru Nanak Dev Ji",
    faith: "Sikh",
    gurmukhi: `ਗਗਨ ਮੈ ਥਾਲੁ ਰਵਿ ਚੰਦੁ ਦੀਪਕ ਬਨੇ ਤਾਰਿਕਾ ਮੰਡਲ ਜਨਕ ਮੋਤੀ ॥
ਧੂਪੁ ਮਲਆਨਲੋ ਪਵਣੁ ਚਵਰੋ ਕਰੇ ਸਗਲ ਬਨਰਾਇ ਫੂਲੰਤ ਜੋਤੀ ॥੧॥

ਕੈਸੀ ਆਰਤੀ ਹੋਇ ਭਵ ਖੰਡਨਾ ਤੇਰੀ ਆਰਤੀ ॥
ਅਨਹਤਾ ਸਬਦੁ ਵਾਜੰਤ ਭੇਰੀ ॥੧॥ ਰਹਾਉ ॥

ਸਹਸ ਤਵ ਨੈਨ ਨਨ ਨੈਨ ਹਹਿ ਤੋਹਿ ਕਉ ਸਹਸ ਮੂਰਤਿ ਨਨਾ ਏਕ ਤੋਹੀ ॥
ਸਹਸ ਪਦ ਬਿਮਲ ਨਨ ਏਕ ਪਦ ਗੰਧ ਬਿਨੁ ਸਹਸ ਤਵ ਗੰਧ ਇਵ ਚਲਤ ਮੋਹੀ ॥੨॥

ਸਭ ਮਹਿ ਜੋਤਿ ਜੋਤਿ ਹੈ ਸੋਇ ॥
ਤਿਸ ਦੈ ਚਾਨਣਿ ਸਭ ਮਹਿ ਚਾਨਣੁ ਹੋਇ ॥
ਗੁਰ ਸਾਖੀ ਜੋਤਿ ਪਰਗਟੁ ਹੋਇ ॥
ਜੋ ਤਿਸੁ ਭਾਵੈ ਸੁ ਆਰਤੀ ਹੋਇ ॥੩॥

ਹਰਿ ਚਰਣ ਕਵਲ ਮਕਰੰਦ ਲੋਭਿਤ ਮਨੋ ਅਨਦਿਨੋ ਮੋਹਿ ਆਹੀ ਪਿਆਸਾ ॥
ਕ੍ਰਿਪਾ ਜਲੁ ਦੇਹਿ ਨਾਨਕ ਸਾਰਿੰਗ ਕਉ ਹੋਇ ਜਾ ਤੇ ਤੇਰੈ ਨਾਮਿ ਵਾਸਾ ॥੪॥੩॥`,
    transliteration: `Gagan mai thaal ravi chand deepak bane taarika mandal janak moti.
Dhoop malaaanlo pavan chavro kare sagal banaraai fulant joti. ||1||

Kaisi aarti hoi bhav khandana teri aarti.
Anhata Shabad vaajant bheri. ||1|| Rahao ||

Sahas tav nain nan nain hahi tohi kau sahas moorat nana ek tohi.
Sahas pad bimal nan ek pad gandh bin sahas tav gandh iv chalat mohi. ||2||

Sabh mahi jot jot hai soi.
Tis dai chaanan sabh mahi chaanan hoi.
Gur saakhi jot pargat hoi.
Jo tis bhaavai su aarti hoi. ||3||

Har charan kaval makrand lobhit mano anadino mohi aahi piaasa.
Kripa jal dehi Nanak saaring kau hoi ja te terai Naam vaasa. ||4||3||`,
    meaningHindi:
      "आकाश ही थाली है, सूर्य-चंद्र दीपक हैं, तारों का मंडल मोती हैं। मलय पहाड़ की सुगंध धूप है, वायु चमर कर रही है, सारी वनस्पतियाँ फूलों से सजी ज्योति हैं। हे भव-भय के नाशक! यही तेरी आरती है। अनहद शब्द की भेरी बज रही है।",
    meaningEnglish:
      "Guru Nanak Dev Ji's profound cosmic Aarti: The sky is the platter, the sun and moon are lamps, and the galaxy of stars is adorned with pearls. The fragrance of the Himalayan sandalwood is the incense, the wind is the fan-bearer, and all forests are the flowering lamps. O Destroyer of fear! This is Your Aarti. The unstruck sound of the Shabad is the drum. In all beings there is His Light — by the Guru's teaching that light manifests.",
  },
  {
    id: "sikh-aarti-2",
    name: "Dhanasari Mahala 1 (Tit Ghar Gao)",
    source: "Guru Granth Sahib Ji",
    ragAndMahala: "Raag Dhanasari, Mahala 1",
    faith: "Sikh",
    gurmukhi: `ਤਿਤੁ ਘਰਿ ਜਾਉ ਜਿਤੁ ਘਰਿ ਸਦਾ ਸਦਾ ਸੁਖੁ ਹੋਇ ॥
ਜਿਤੁ ਘਰਿ ਮੰਗਲੁ ਸਦਾ ਸਦਾ ਦੂਖੁ ਨਾਹੀ ਕੋਇ ॥੧॥

ਤਿਤੁ ਘਰਿ ਜਾਉ ਜਿਤੁ ਘਰਿ ਸਦਾ ਸਦਾ ਸੁਖੁ ਹੋਇ ॥

ਘਰਿ ਸਦਾ ਸੁਖੁ ਮੰਗਲ ਸਦਾ ਦੂਖ ਨਾਹੀ ਕੋਇ ॥
ਜਿਸੁ ਘਰਿ ਵਸਿਆ ਕੰਤੁ ਅਪਣਾ ਤਿਸੁ ਘਰਿ ਸਚੁ ਸੋਇ ॥੨॥

ਜਿਸ ਨੋ ਵੇਖੈ ਸੋਇ ਸਚਾ ਤਿਸ ਨੋ ਆਪਿ ਦੇਵੈ ॥
ਨਾਨਕੁ ਤਿਨ ਕੈ ਸਦ ਕੁਰਬਾਣੁ ਜਿਨ ਸਚਿ ਸਚੇ ਸੇਵੈ ॥੩॥੨॥`,
    transliteration: `Tit ghar jaau jit ghar sadaa sadaa sukh hoi.
Jit ghar mangal sadaa sadaa dookh naahi koi. ||1||

Tit ghar jaau jit ghar sadaa sadaa sukh hoi.

Ghar sadaa sukh mangal sadaa dookh naahi koi.
Jis ghar vasiaa kant apna tis ghar sach soi. ||2||

Jis no vekhai soi sachaa tis no aap devai.
Naanak tin kai sad kurbaan jin sach sache sevai. ||3||2||`,
    meaningHindi:
      "मैं उस घर में जाता हूँ जहाँ सदा-सदा सुख होता है, जहाँ मंगल है और कोई दुख नहीं। जिस घर में अपने प्रिय परमात्मा ने निवास किया है, उस घर में सत्य का वास है। नानक उन पर सदा बलिहारी है जो सच्चे प्रभु की सेवा करते हैं।",
    meaningEnglish:
      "I go to that home where there is eternal peace and no sorrow. Where the Lord-Husband has made His abode, Truth resides there. Nanak is ever a sacrifice to those who serve the True Lord. A Shabad of divine longing — seeking the Lord's presence as the source of all joy and peace.",
  },
  {
    id: "sikh-aarti-3",
    name: "Aarti — Bhagat Ravidas Ji",
    source: "Guru Granth Sahib Ji",
    ragAndMahala: "Raag Dhanasari — Bhagat Ravidas Ji",
    faith: "Sikh",
    gurmukhi: `ਨਾਮ ਤੇਰੋ ਆਰਤੀ ਮਜਨੁ ਮੁਰਾਰੇ ॥
ਹਰਿ ਕੇ ਨਾਮ ਬਿਨੁ ਝੂਠੇ ਸਗਲ ਪਾਸਾਰੇ ॥੧॥ ਰਹਾਉ ॥

ਨਾਮੁ ਤੇਰੋ ਆਸਨੋ ਨਾਮੁ ਤੇਰੋ ਉਰਸਾ ॥
ਨਾਮੁ ਤੇਰਾ ਕੇਸਰੋ ਲੇ ਛਿਟਕਾਰੇ ਪਰਸਾ ॥੧॥

ਨਾਮੁ ਤੇਰਾ ਦੀਵਾ ਨਾਮੁ ਤੇਰੋ ਬਾਤੀ ॥
ਨਾਮੁ ਤੇਰੋ ਤੇਲੁ ਲੇ ਮਾਹਿ ਪਸਾਰੇ ਰਾਤੀ ॥੨॥

ਨਾਮ ਤੇਰੋ ਤਾਗਾ ਨਾਮ ਫੂਲ ਮਾਲਾ ॥
ਭਾਰ ਅਠਾਰਹ ਸਗਲ ਜੂਠਾਰਾ ਹਾਰ ਤੁਝਹਿ ਅਰਪਾਲਾ ॥੩॥

ਤੇਰੋ ਕੀਆ ਤੁਝਹਿ ਕਿਆ ਅਰਪਉ ਨਾਮੁ ਤੇਰਾ ਤੁਹੀ ਚੰਗਾ ॥
ਕਹੈ ਰਵਿਦਾਸੁ ਹਲਰੇ ਛਿਲਰੇ ਨੀਚ ਜਾਤਿ ਵਿਧ ਕੰਗਾ ॥੪॥੩॥`,
    transliteration: `Naam tero aarti majan muraare.
Har ke naam bin jhuthe sagal paasaare. ||1|| Rahao ||

Naamu tero aasno naamu tero ursaa.
Naamu tera kesaro le chhitkaare parsaa. ||1||

Naamu tera deeva naamu tero baati.
Naamu tero tel le maahi pasaare raati. ||2||

Naam tero taaga naam phool maalaa.
Bhaar athaara sagal joothaara haar tujhahi arpaalaa. ||3||

Tero keeaa tujhahi kia arpaou naamu tera tuhi changaa.
Kahai Ravidas halaare chhilaare neech jaat bidh kangaa. ||4||3||`,
    meaningHindi:
      "हे मुरारी! तेरा नाम ही मेरी आरती है, तेरा नाम ही स्नान है। हरि के नाम के बिना सारे दिखावे झूठे हैं। तेरा नाम दीपक है, तेरा नाम बाती है, तेरा नाम तेल है। रविदास कहते हैं — तूने जो दिया वही तुझे अर्पण करूँ, तेरा नाम ही श्रेष्ठ है।",
    meaningEnglish:
      "O Lord Murari! Your Name is my Aarti and my bath. Without Your Name, all outward rituals are false. Your Name is the lamp, the wick, and the oil — the eternal light. Ravidas says: I offer back to You what You have given me. Your Name alone is worthy. A profound spiritual re-interpretation of Aarti — external rituals are replaced by inner devotion to the Divine Name.",
  },
  {
    id: "sikh-aarti-4",
    name: "So Dar (Who Is That Gate)",
    source: "Guru Granth Sahib Ji",
    ragAndMahala: "Raag Asa, Mahala 1 — Guru Nanak Dev Ji",
    faith: "Sikh",
    gurmukhi: `ਸੋ ਦਰੁ ਤੇਰਾ ਕੇਹਾ ਸੋ ਘਰੁ ਕੇਹਾ ਜਿਤੁ ਬਹਿ ਸਰਬ ਸਮਾਲੇ ॥
ਵਾਜੇ ਤੇਰੇ ਨਾਦ ਅਨੇਕ ਅਸੰਖਾ ਕੇਤੇ ਤੇਰੇ ਵਾਵਣਹਾਰੇ ॥

ਕੇਤੇ ਤੇਰੇ ਰਾਗ ਪਰੀ ਸਿਉ ਕਹੀਅਹਿ ਕੇਤੇ ਤੇਰੇ ਗਾਵਣਹਾਰੇ ॥
ਗਾਵਨਿ ਤੁਧਨੋ ਪਉਣੁ ਪਾਣੀ ਬੈਸੰਤਰੁ ਗਾਵੈ ਰਾਜਾ ਧਰਮੁ ਦੁਆਰੇ ॥

ਗਾਵਨਿ ਤੁਧਨੋ ਚਿਤੁ ਗੁਪਤੁ ਲਿਖਿ ਜਾਣਨਿ ਲਿਖਿ ਲਿਖਿ ਧਰਮੁ ਵੀਚਾਰੇ ॥
ਗਾਵਨਿ ਤੁਧਨੋ ਈਸਰੁ ਬ੍ਰਹਮਾ ਦੇਵੀ ਸੋਹਨਿ ਤੇਰੇ ਸਦਾ ਸਵਾਰੇ ॥`,
    transliteration: `So dar tera kehaa so ghar kehaa jit behi sarab samaale.
Vaaje tere naad anek asankhaa kete tere vaavanhare.

Kete tere raag pari siu kaheeahi kete tere gaavanhare.
Gaavan tudh no paun paani baisantar gaavai raajaa dharam duaare.

Gaavan tudh no chit gupt likh jaanan likh likh dharam veechaare.
Gaavan tudh no Isar Brahma Devi sohan tere sadaa savaare.`,
    meaningHindi:
      "हे प्रभु! तेरा वह दरवाजा कैसा है, वह घर कैसा है जहाँ बैठकर तू सबकी देखभाल करता है? तेरे असंख्य नाद बज रहे हैं, तेरे अनगिनत गवैये गाते हैं। वायु, जल, अग्नि सब तुझे गाते हैं। चित्र-गुप्त, ईश्वर, ब्रह्मा, देवी सब तेरा गुणगान करते हैं।",
    meaningEnglish:
      "O Lord, how sublime is Your Gate, how wondrous Your Court where You sit and care for all! Countless divine melodies resound, countless are Your singers. The wind, water, fire, and the guardian of righteousness sing Your praises. Chitragupta, Shiva, Brahma, and the Devis all adorn Your eternal praise — a Shabad of cosmic wonder at the Lord's all-pervading presence.",
  },
];
