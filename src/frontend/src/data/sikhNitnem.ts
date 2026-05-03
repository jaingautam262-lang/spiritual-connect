export interface NitnemVerse {
  num: number;
  gurmukhi: string;
  romanTransliteration: string;
  english: string;
}

export interface NitnemEntry {
  id: string;
  title: string;
  type: "Nitnem";
  faith: "Sikh";
  author: string;
  significance: string;
  bestTime: string;
  verses: NitnemVerse[];
}

export const SIKH_NITNEM: NitnemEntry[] = [
  {
    id: "japji-sahib",
    title: "Japji Sahib",
    type: "Nitnem",
    faith: "Sikh",
    author: "Guru Nanak Dev Ji",
    significance:
      "Japji Sahib is the first Bani in the Guru Granth Sahib and is considered the essence of all Sikh scripture. Composed by Guru Nanak Dev Ji, it contains the Mool Mantar followed by 38 pauris (stanzas) and a salok (epilogue). It is the morning prayer recited at Amrit Vela (before dawn).",
    bestTime: "Amrit Vela — before sunrise (3 AM to 6 AM)",
    verses: [
      {
        num: 0,
        gurmukhi:
          "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥",
        romanTransliteration:
          "Ik Oankaar Sat Naam Kartaa Purakh Nirbhau Nirvair Akaal Moorat Ajooni Saibhan Gur Prasaad.",
        english:
          "One Universal Creator God. The Name Is Truth. Creative Being Personified. No Fear. No Hatred. Image Of The Undying. Beyond Birth. Self-Existent. By Guru's Grace.",
      },
      {
        num: 1,
        gurmukhi: "ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥ ਹੈ ਭੀ ਸਚੁ ਨਾਨਕ ਹੋਸੀ ਭੀ ਸਚੁ ॥੧॥",
        romanTransliteration:
          "Aad sach jugaad sach. Hai bhi sach Nanak hosi bhi sach. ||1||",
        english:
          "True in the Primal Beginning. True throughout the Ages. True Here and Now. O Nanak, Forever and Ever True. ||1||",
      },
      {
        num: 2,
        gurmukhi:
          "ਸੋਚੈ ਸੋਚਿ ਨ ਹੋਵਈ ਜੇ ਸੋਚੀ ਲਖ ਵਾਰ ॥ ਚੁਪੈ ਚੁਪ ਨ ਹੋਵਈ ਜੇ ਲਾਇ ਰਹਾ ਲਿਵ ਤਾਰ ॥ ਭੁਖਿਆ ਭੁਖ ਨ ਉਤਰੀ ਜੇ ਬੰਨਾ ਪੁਰੀਆ ਭਾਰ ॥ ਸਹਸ ਸਿਆਣਪਾ ਲਖ ਹੋਹਿ ਤ ਇਕ ਨ ਚਲੈ ਨਾਲਿ ॥ ਕਿਵ ਸਚਿਆਰਾ ਹੋਈਐ ਕਿਵ ਕੂੜੈ ਤੁਟੈ ਪਾਲਿ ॥ ਹੁਕਮਿ ਰਜਾਈ ਚਲਣਾ ਨਾਨਕ ਲਿਖਿਆ ਨਾਲਿ ॥੧॥",
        romanTransliteration:
          "Sochai soch na hovai je sochi lakh vaar. Chupai chup na hovai je laai rahaa liv taar. Bhukhiaa bhukh na utri je bannaa puriaa bhaar. Sahas siaanpaa lakh hohi ta ik na chalai naal. Kiv sachiaara hoiai kiv koorai tutai paal. Hukam razaai chalnaa Nanak likhiaa naal. ||1||",
        english:
          "By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times. By remaining silent, inner silence is not obtained, even by remaining lovingly absorbed deep within. The hunger of the hungry is not appeased, even by piling up loads of worldly goods. Hundreds of thousands of clever tricks, but not even one of them will go along with you in the end. So how can you become truthful? And how can the veil of illusion be torn away? O Nanak, it is written that you shall obey the Hukam of His Command, and walk in the Way of His Will. ||1||",
      },
      {
        num: 9,
        gurmukhi:
          "ਸੁਣਿਐ ਈਸਰੁ ਬਰਮਾ ਇੰਦੁ ॥ ਸੁਣਿਐ ਮੁਖਿ ਸਾਲਾਹਣ ਮੰਦੁ ॥ ਸੁਣਿਐ ਜੋਗ ਜੁਗਤਿ ਤਨਿ ਭੇਦ ॥ ਸੁਣਿਐ ਸਾਸਤ ਸਿਮ੍ਰਿਤਿ ਵੇਦ ॥ ਨਾਨਕ ਭਗਤਾ ਸਦਾ ਵਿਗਾਸੁ ॥ ਸੁਣਿਐ ਦੂਖ ਪਾਪ ਕਾ ਨਾਸੁ ॥੯॥",
        romanTransliteration:
          "Suniai eesar barmaa indu. Suniai mukh saalaahan mandu. Suniai jog jugat tan bhed. Suniai saasat simrit ved. Nanak bhagtaa sadaa vigaas. Suniai dookh paap kaa naas. ||9||",
        english:
          "Listening — Shiva, Brahma and Indra. Listening — even foul-mouthed people praise Him. Listening — the technology of Yoga and the secrets of the body. Listening — the Shastras, the Simritees and the Vedas. O Nanak, the devotees are forever in bliss. Listening — pain and sin are erased. ||9||",
      },
      {
        num: 38,
        gurmukhi:
          "ਜਤੁ ਪਾਹਾਰਾ ਧੀਰਜੁ ਸੁਨਿਆਰੁ ॥ ਅਹਰਣਿ ਮਤਿ ਵੇਦੁ ਹਥੀਆਰੁ ॥ ਭਉ ਖਲਾ ਅਗਨਿ ਤਪ ਤਾਉ ॥ ਭਾਂਡਾ ਭਾਉ ਅੰਮ੍ਰਿਤੁ ਤਿਤੁ ਢਾਲਿ ॥ ਘੜੀਐ ਸਬਦੁ ਸਚੀ ਟਕਸਾਲ ॥ ਜਿਨ ਕਉ ਨਦਰਿ ਕਰਮੁ ਤਿਨ ਕਾਰ ॥ ਨਾਨਕ ਨਦਰੀ ਨਦਰਿ ਨਿਹਾਲ ॥੩੮॥",
        romanTransliteration:
          "Jat paahaaraa dheeraj suniaar. Ahran mat ved hathiaar. Bhau khalaa agan tap taau. Bhaandaa bhaau amrit tit dhaal. Gharhiai sabad sachi taksaal. Jin kau nadar karam tin kaar. Nanak nadri nadar nihaal. ||38||",
        english:
          "Let self-control be the furnace, and patience the goldsmith. Let understanding be the anvil, and spiritual wisdom the tools. With the Fear of God as the bellows, fan the flames of tapa, the body's inner heat. In the crucible of love, melt the Nectar of the Name, and mint the True Coin of the Shabad, the Word of God. Such is the karma of those upon whom He has cast His Glance of Grace. O Nanak, the Merciful Lord, by His Grace, uplifts and exalts them. ||38||",
      },
    ],
  },
  {
    id: "chaupai-sahib",
    title: "Chaupai Sahib",
    type: "Nitnem",
    faith: "Sikh",
    author: "Guru Gobind Singh Ji",
    significance:
      "Chaupai Sahib is a prayer of protection and supplication composed by Guru Gobind Singh Ji in the Charitar Upakhyan of the Dasam Granth. It is recited as part of the evening prayer (Rehras Sahib) and at the end of Amrit Sanchar. It is a plea to the Almighty for protection and shelter.",
    bestTime: "Evening (Rehras time) or any time for protection",
    verses: [
      {
        num: 1,
        gurmukhi:
          "ਹਮਰੀ ਕਰੋ ਹਾਥ ਦੈ ਰੱਛਾ ॥ ਪੂਰਨ ਹੋਇ ਚਿੱਤ ਕੀ ਇੱਛਾ ॥ ਤਵ ਚਰਣਨਿ ਮਨ ਰਹੈ ਹਮਾਰਾ ॥ ਅਪਨਾ ਜਾਨ ਕਰੋ ਪ੍ਰਤਿਪਾਰਾ ॥੧॥",
        romanTransliteration:
          "Hamri karo haath dai rachha. Pooran hoi chitt ki ichha. Tav charnan man rahai hamaara. Apnaa jaan karo pratipaara. ||1||",
        english:
          "Protect me with Your hands. May the desires of my mind be fulfilled. May my mind remain at Your feet. Considering me as Your own, please nourish and support me. ||1||",
      },
      {
        num: 2,
        gurmukhi:
          "ਹਮਰੇ ਦੁਸਟ ਸਭੈ ਤੁਮ ਘਾਵਹੁ ॥ ਆਪੁ ਹਾਥ ਦੈ ਮੋਹਿ ਬਚਾਵਹੁ ॥ ਸੁਖੀ ਬਸੈ ਮੋਰੋ ਪਰਿਵਾਰਾ ॥ ਸੇਵਕ ਸਿੱਖ ਸਭੈ ਕਰਤਾਰਾ ॥੨॥",
        romanTransliteration:
          "Hamare dushat sabhai tum ghaavahu. Aap haath dai mohi bachaavahu. Sukhi basai moro parivaara. Sevak sikh sabhai kartaara. ||2||",
        english:
          "Destroy all our enemies. With Your own hands protect me. May my family live in happiness. May all the servants and Sikhs be blessed, O Creator. ||2||",
      },
      {
        num: 3,
        gurmukhi:
          "ਮੋ ਰੱਛਾ ਨਿਜ ਕਰ ਦੈ ਕਰੀਜੈ ॥ ਸਭਿ ਮੇਦਨੀ ਮੈ ਤੁਮਹਿ ਸੁ ਭੀਜੈ ॥ ਤੁਮਹਿ ਛਾਡਿ ਕੋਈ ਅਵਰ ਨ ਧਿਆਊ ॥ ਜੋ ਵਰੁ ਚਾਹੌ ਸੋਈ ਪਾਊ ॥੩॥",
        romanTransliteration:
          "Mo rachha nij kar dai kareejai. Sabhi medani mai tumahi su bheejai. Tumahi chhaad koi avar na dhiaao. Jo var chahou soee paao. ||3||",
        english:
          "Protect me with Your own hand. In the whole world, I am drenched with Your grace. I will not meditate on anyone except You. Whatever blessing I seek, may I obtain it. ||3||",
      },
      {
        num: 5,
        gurmukhi:
          "ਤੁਮਹਿ ਛਾਡਿ ਕੋਈ ਅਵਰ ਨ ਚੀਤਾਰਉ ॥ ਜੋ ਬਰੁ ਚਾਹੋਂ ਸੋਈ ਪਾਰਉ ॥ ਸੇਵਕ ਸਿੱਖ ਹਮਾਰੇ ਤਾਰੀਅਹਿ ॥ ਚੁਨ ਚੁਨ ਸ਼ਤ੍ਰ ਹਮਾਰੇ ਮਾਰੀਅਹਿ ॥੫॥",
        romanTransliteration:
          "Tumahi chhaad koi avar na cheetarau. Jo bar chaahon soee paarau. Sevak sikh hamaare taariah. Chun chun shatr hamaare maariah. ||5||",
        english:
          "I will not think of anyone except You. Whatever I desire, may I obtain it. Save all our servants and Sikhs. Pick out and destroy our enemies one by one. ||5||",
      },
      {
        num: 10,
        gurmukhi:
          "ਆਪੇ ਹਾਥ ਦਿਨੋ ਜਿਨਿ ਬਿਰਦ ਸੰਭਾਰਿਓ ॥ ਮੋ ਕਹੁੰ ਕਾਜੁ ਸੁ ਆਪੇ ਸਵਾਰਿਓ ॥ ਦੁਸਮਨ ਦੇਖਿ ਸੋਚ ਮਨ ਖਾਈ ॥ ਹਰਿ ਜੀ ਅਪੁਨੀ ਅਭੈ ਪਦ ਦਾਈ ॥੧੦॥",
        romanTransliteration:
          "Aape haath dino jin birad sambhaario. Mo kahun kaaj su aape savaario. Dusman dekhi soch man khaai. Har ji apuni abhai pad daai. ||10||",
        english:
          "The one who remembered His ancient promise, He extended His hand. He Himself arranged my work. Seeing the enemies, the mind was distressed. The Lord gave me the status of fearlessness. ||10||",
      },
    ],
  },
  {
    id: "anand-sahib",
    title: "Anand Sahib",
    type: "Nitnem",
    faith: "Sikh",
    author: "Guru Amar Das Ji",
    significance:
      "Anand Sahib (Song of Bliss) is composed by Guru Amar Das Ji in Ramkali Raag and is the 5th prayer in the Guru Granth Sahib. It contains 40 pauris and is recited at all Sikh ceremonies. The Chhand-form captures divine joy and is considered the highest expression of spiritual bliss.",
    bestTime: "Evening prayer (Rehras Sahib) or at all ceremonies",
    verses: [
      {
        num: 1,
        gurmukhi:
          "ਅਨੰਦੁ ਭਇਆ ਮੇਰੀ ਮਾਏ ਸਤਿਗੁਰੂ ਮੈ ਪਾਇਆ ॥ ਸਤਿਗੁਰੁ ਤ ਪਾਇਆ ਸਹਜ ਸੇਤੀ ਮਨਿ ਵਜੀਆ ਵਾਧਾਈਆ ॥ ਰਾਗ ਰਤਨ ਪਰਵਾਰ ਪਰੀਆ ਸਬਦ ਗਾਵਣ ਆਈਆ ॥ ਸਬਦੋ ਤ ਗਾਵਹੁ ਹਰੀ ਕੇਰਾ ਮਨਿ ਜਿਨੀ ਵਸਾਇਆ ॥ ਕਹੈ ਨਾਨਕੁ ਅਨੰਦੁ ਹੋਆ ਸਤਿਗੁਰੂ ਮੈ ਪਾਇਆ ॥੧॥",
        romanTransliteration:
          "Anand bhaiaa meri maae satiguroo mai paaiaa. Satigur ta paaiaa sahaj seti man vajiaa vaadhaaiaa. Raag ratan parvaar pariaa sabad gaavan aaiaa. Shabdo ta gaavahu hari keraa man jini vasaaiaa. Kahai Naanak anand hoaa satiguroo mai paaiaa. ||1||",
        english:
          "I am in ecstasy, O my mother, for I have found my True Guru. I have found the True Guru, with intuitive ease, and my mind vibrates with the music of bliss. The jewelled melodies and their related celestial harmonies have come to sing the Word of the Shabad. The Lord's Word has brought me to sing of the Lord; He has installed it within my mind. Says Nanak, I am in ecstasy, for I have found my True Guru. ||1||",
      },
      {
        num: 5,
        gurmukhi:
          "ਏ ਮਨ ਮੇਰਿਆ ਤੂ ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥ ਹਰਿ ਨਾਲਿ ਰਹੁ ਤੂ ਮੰਨ ਮੇਰੇ ਦੂਖ ਸਭਿ ਵਿਸਾਰਣਾ ॥ ਅੰਗੀਕਾਰੁ ਓਹੁ ਕਰੇ ਤੇਰਾ ਕਾਰਜ ਸਭਿ ਸਵਾਰਣਾ ॥ ਸਭਨਾ ਗਲਾ ਸਮਰਥੁ ਸੁਆਮੀ ਸੋ ਕਿਉ ਮਨਹੁ ਵਿਸਾਰੇ ॥ ਕਹੈ ਨਾਨਕੁ ਮੰਨ ਮੇਰੇ ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥੫॥",
        romanTransliteration:
          "E man meriaa too sadaa rahu hari naale. Hari naal rahu too mann mere dookh sabh visaaranaa. Angikaar ohu kare teraa kaaraj sabh savaaranaa. Sabhnaa galaa samarath suaami so kio manahu visaare. Kahai Naanak mann mere sadaa rahu hari naale. ||5||",
        english:
          "O my mind, remain always with the Lord. Remaining with the Lord, O my mind, all sorrows are forgotten. He will take you into His care, and all your affairs shall be resolved. The Master is all-powerful to do everything — why forget Him from your mind? Says Nanak, O my mind, remain always with the Lord. ||5||",
      },
      {
        num: 8,
        gurmukhi:
          "ਏ ਸਰੀਰਾ ਮੇਰਿਆ ਇਸੁ ਜਗ ਮਹਿ ਆਇ ਕੈ ਕਿਆ ਤੁਧੁ ਕਰਮ ਕਮਾਇਆ ॥ ਕਿ ਕਰਮ ਕਮਾਇਆ ਤੁਧੁ ਸਰੀਰਾ ਜਾ ਤੂ ਜਗ ਮਹਿ ਆਇਆ ॥ ਜਿਨਿ ਹਰਿ ਤੇਰਾ ਰਚਨੁ ਰਚਿਆ ਸੋ ਹਰਿ ਮਨਿ ਨ ਵਸਾਇਆ ॥ ਗੁਰ ਪਰਸਾਦੀ ਹਰਿ ਮੰਨਿ ਵਸਿਆ ਪੂਰਬਿ ਲਿਖਿਆ ਪਾਇਆ ॥ ਕਹੈ ਨਾਨਕੁ ਏਹੁ ਸਰੀਰੁ ਪਰਵਾਣੁ ਹੋਆ ਜਿਨਿ ਸਤਿਗੁਰ ਨਾਲਿ ਚਿਤੁ ਲਾਇਆ ॥੮॥",
        romanTransliteration:
          "E sareeraa meriaa is jag mahi aai kai kiaa tudhu karam kamaaiaa. Ki karam kamaaiaa tudhu sareeraa jaa too jag mahi aaaiaa. Jin hari teraa rachan rachiaa so hari man na vasaaiaa. Gur parasaadi hari manni vasiaa poorab likhiaa paaiaa. Kahai Naanak ehu sareer parvaan hoaa jin satigur naal chit laaiaa. ||8||",
        english:
          "O my body, why have you come into this world? What actions have you performed? What actions have you performed, O body, since you came into this world? You did not enshrine in your mind the Lord who created you. By Guru's Grace, the Lord abides in the mind; this is the pre-ordained destiny. Says Nanak, this body has been rendered pure, which has focused its consciousness on the True Guru. ||8||",
      },
      {
        num: 27,
        gurmukhi:
          "ਬਾਬਾ ਜਿਸੁ ਤੂ ਦੇਹਿ ਸੋਈ ਜਨੁ ਪਾਵੈ ॥ ਪਾਵੈ ਤ ਸੋ ਜਨੁ ਦੇਹਿ ਜਿਸ ਨੋ ਹੋਰਿ ਕਿਆ ਕਰਹਿ ਵੇਚਾਰਿਆ ॥ ਇਕਿ ਭਰਮਿ ਭੂਲੇ ਫਿਰਹਿ ਦਹ ਦਿਸਿ ਇਕਿ ਨਾਮਿ ਲਾਗਿ ਸਵਾਰਿਆ ॥ ਗੁਰ ਪਰਸਾਦੀ ਜੀਵਤੁ ਮਰੈ ਹੁਕਮੈ ਬੂਝੈ ਸੋਈ ॥ ਕਹੈ ਨਾਨਕੁ ਜਿਸੁ ਤੂ ਦੇਹਿ ਬਾਬਾ ਸੋਈ ਜਨੁ ਪਾਵੈ ॥੨੭॥",
        romanTransliteration:
          "Baabaa jis too dehi soee jan paavai. Paavai ta so jan dehi jis no hor kiaa karahi vechaariaa. Iki bharam bhoole phirahi dah dis iki naam laagi savaariaa. Gur parasaadi jeevat marai hukmai boojhai soee. Kahai Naanak jis too dehi baabaa soee jan paavai. ||27||",
        english:
          "O Father, only that humble being obtains it, to whom You give it. They alone obtain it, whom You give it; what can the poor wretches do otherwise? Some wander lost in doubt in the ten directions; others are adorned by being attached to the Name. By Guru's Grace, one dies while yet alive, and understands the Hukam of the Lord's Command. Says Nanak, O Father, only that humble being obtains it, to whom You give it. ||27||",
      },
      {
        num: 40,
        gurmukhi:
          "ਏਹੁ ਸੋਹਿਲਾ ਸਬਦੁ ਸੁਹਾਵਾ ॥ ਸਤਿਗੁਰੂ ਨੇ ਸਚੁ ਸੁਣਾਵਾ ॥ ਸੁਣਿ ਸੁਣਿ ਆਨੰਦੁ ਹੋਆ ਮੇਰੇ ਭਾਈ ਹਰਿ ਨਾਮੁ ਮਨਿ ਵਸਾਇਆ ॥ ਜਨ ਨਾਨਕ ਅਨੰਦੁ ਹੋਆ ਸਤਿਗੁਰੂ ਮੈ ਪਾਇਆ ॥੪੦॥੧॥",
        romanTransliteration:
          "Ehu sohilaa sabad suhaavaa. Satiguroo ne sach sunaavaa. Sun sun aanand hoaa mere bhaaee har naam man vasaaiaa. Jan Naanak anand hoaa satiguroo mai paaiaa. ||40||1||",
        english:
          "This Song of Bliss, the Word of the Shabad, is so beautiful. The True Guru has proclaimed the Truth. Hearing it again and again, I am in bliss, O my Siblings of Destiny; the Lord's Name is enshrined in my mind. Servant Nanak is in ecstasy; I have found the True Guru. ||40||1||",
      },
    ],
  },
  {
    id: "rehras-sahib",
    title: "Rehras Sahib",
    type: "Nitnem",
    faith: "Sikh",
    author:
      "Guru Nanak Dev Ji, Guru Amar Das Ji, Guru Ram Das Ji, Guru Arjan Dev Ji, Guru Gobind Singh Ji",
    significance:
      "Rehras Sahib is the evening prayer recited at sunset. It is a collection of hymns from multiple Gurus — Guru Nanak, Guru Amar Das, Guru Ram Das, Guru Arjan Dev, and Guru Gobind Singh Ji. It is an expression of gratitude to God for the day's blessings and a prayer for protection through the night.",
    bestTime: "Sunset time (approximately 6 PM)",
    verses: [
      {
        num: 1,
        gurmukhi:
          "ਸੋ ਦਰੁ ਤੇਰਾ ਕੇਹਾ ਸੋ ਘਰੁ ਕੇਹਾ ਜਿਤੁ ਬਹਿ ਸਰਬ ਸਮਾਲੇ ॥ ਵਾਜੇ ਤੇਰੇ ਨਾਦ ਅਨੇਕ ਅਸੰਖਾ ਕੇਤੇ ਤੇਰੇ ਵਾਵਣਹਾਰੇ ॥ ਕੇਤੇ ਤੇਰੇ ਰਾਗ ਪਰੀ ਸਿਉ ਕਹੀਅਹਿ ਕੇਤੇ ਤੇਰੇ ਗਾਵਣਹਾਰੇ ॥ ਗਾਵਨਿ ਤੁਧਨੋ ਪਵਣੁ ਪਾਣੀ ਬੈਸੰਤਰੁ ਗਾਵੈ ਰਾਜਾ ਧਰਮੁ ਦੁਆਰੇ ॥ ਗਾਵਨਿ ਤੁਧਨੋ ਚਿਤੁ ਗੁਪਤੁ ਲਿਖਿ ਜਾਣਨਿ ਲਿਖਿ ਲਿਖਿ ਧਰਮੁ ਵੀਚਾਰੇ ॥",
        romanTransliteration:
          "So dar teraa kehaa so ghar kehaa jit behi sarab samaale. Vaaje tere naad anek asankhaa kete tere vaavanhaaare. Kete tere raag pari sio kaheeahi kete tere gaavanhaare. Gaavan tudhno pavan paani baisantar gaavai raajaa dharam duaare. Gaavan tudhno chit gupat likh jaanan likh likh dharam veechaare.",
        english:
          "What is that gate of Yours, and what is that house, where You sit and take care of all? The sound of Your Naad resonates there in so many ways; so many are the musicians there. So many Ragas, so many musicians singing there. Air, water and fire sing of You; the Righteous Judge of Dharma sings at Your door. Chitr and Gupt, who record actions and past deeds, sing; they write and consider Dharma.",
      },
      {
        num: 2,
        gurmukhi:
          "ਸੁਣਿ ਵਡਾ ਆਖੈ ਸਭੁ ਕੋਇ ॥ ਕੇਵਡੁ ਵਡਾ ਡੀਠਾ ਹੋਇ ॥ ਕੀਮਤਿ ਪਾਇ ਨ ਕਹਿਆ ਜਾਇ ॥ ਕਹਣੈ ਵਾਲੇ ਤੇਰੇ ਰਹੇ ਸਮਾਇ ॥ ਵਡਾ ਸਾਹਿਬੁ ਵਡੀ ਨਾਈ ਕੀਤਾ ਜਾ ਕਾ ਹੋਵੈ ॥ ਨਾਨਕ ਜੇ ਕੋ ਆਪੌ ਜਾਣੈ ਅਗੈ ਗਇਆ ਨ ਸੋਹੈ ॥੨੧॥",
        romanTransliteration:
          "Sun vadaa aakhai sabh koe. Kevad vadaa deethaa hoe. Keemat paai na kahiaa jaai. Kahnaai vaale tere rahe samaai. Vadaa saahib vadee naaee keetaa jaa kaa hovai. Nanak je ko aapou jaanai agai gaiaa na sohai. ||21||",
        english:
          "Hearing of Your Greatness, everyone calls You Great. But how great You are, only he sees who has been blessed with Your Vision. Your Value cannot be estimated; nothing can be said about it. Those who try to describe You are absorbed and immersed in You. O Great Lord, Great is Your Name. Whatever happens is by Your Will. O Nanak, one who claims to know everything shall not be honoured in the world hereafter. ||21||",
      },
      {
        num: 3,
        gurmukhi:
          "ਆਪੇ ਭਾਂਡੇ ਸਾਜਿਅਨੁ ਆਪੇ ਪੂਰਣੁ ਦੇਇ ॥ ਇਕਨੀ ਦੁਧੁ ਸਮਾਈਐ ਇਕਿ ਚੁਲ੍ਹੈ ਰਹਨਿ ਚੜੇ ॥ ਇਕਿ ਹੋਵਨਿ ਰਾਜ ਮਹਲ ਬਹਿ ਰਾਜ ਕਰੇਨਿ ॥ ਇਕਿ ਭੀਖ ਮੰਗਾਇ ਖਾਹਿ ਤਿਨਾ ਭੀ ਤੇਰਾ ਦੇਇ ॥ ਸਭਿ ਤੇਰੇ ਜੰਤ ਤੂ ਸੰਮਾਲਿ ਵੇਖਹਿ ਸੁਣਿਆ ਤੇਰਾ ਨਾਉ ਕਰੇ ॥੨੩॥",
        romanTransliteration:
          "Aape bhaande saajianu aape pooran dei. Ikni dudhu samaaiie ik chulai rahan charre. Ik hovan raaj mahal behi raaj kareni. Ik bheekh mangaai khaahi tinaa bhi teraa dei. Sabhi tere jant too sammaali vekhehi suniaa teraa naao kare. ||23||",
        english:
          "You Yourself fashion the vessels, and You Yourself fill them. Some are filled with milk, while others remain on the fire. Some sit in palaces on thrones, ruling as kings. Others beg and eat whatever alms they receive — this too is Your gift. All are Your creatures; You watch over them and take care of them. Hearing Your Name, people act. ||23||",
      },
      {
        num: 4,
        gurmukhi:
          "ਨਾਨਕ ਤਿਨ ਕੈ ਸਦ ਬਲਿਹਾਰੈ ਜਿਨ ਇਕ ਮਨਿ ਹਰਿ ਧਿਆਇਆ ॥ ਜਿਨ ਗੁਰਮੁਖਿ ਨਾਮੁ ਧਿਆਇਆ ਤਿਨ੍ਹਾ ਕਾ ਜਨਮੁ ਸਵਾਰਿਆ ॥ ਜਿਨ ਨਾਮੁ ਧਿਆਇਆ ਤਿਨ੍ਹਾ ਕੇ ਦੁਖ ਬਿਨਸੇ ਸੁਖ ਵਸੇ ਮਨਿ ਆਇਆ ॥",
        romanTransliteration:
          "Nanak tin kai sad balihaarai jin ik man har dhiaaiaa. Jin gurmukh naam dhiaaiaa tinhaa kaa janam svaariaa. Jin naam dhiaaiaa tinhaa ke dukh binase sukh vase man aaiaa.",
        english:
          "Nanak is forever a sacrifice to those who, with one-pointed mind, meditate on the Lord. Those who, as Gurmukh, meditate on the Naam — their lives are adorned. Those who meditate on the Naam — their pain is dispelled, and peace comes to dwell in their minds.",
      },
      {
        num: 5,
        gurmukhi:
          "ਤੂ ਠਾਕੁਰੁ ਤੁਮ ਪਹਿ ਅਰਦਾਸਿ ॥ ਜੀਉ ਪਿੰਡੁ ਸਭੁ ਤੇਰੀ ਰਾਸਿ ॥ ਤੁਮ ਮਾਤ ਪਿਤਾ ਹਮ ਬਾਰਿਕ ਤੇਰੇ ॥ ਤੁਮਰੀ ਕ੍ਰਿਪਾ ਮਹਿ ਸੂਖ ਘਨੇਰੇ ॥ ਕੋਇ ਨ ਜਾਨੈ ਤੁਮਰਾ ਅੰਤੁ ॥ ਊਚੇ ਤੇ ਊਚਾ ਭਗਵੰਤੁ ॥ ਸਗਲ ਸਮਗ੍ਰੀ ਤੁਮਰੈ ਸੂਤ੍ਰਿ ਧਾਰੀ ॥ ਤੁਮ ਤੇ ਹੋਇ ਸੁ ਆਗਿਆਕਾਰੀ ॥ ਤੁਮਰੀ ਗਤਿ ਮਿਤਿ ਤੁਮ ਹੀ ਜਾਣੀ ॥ ਨਾਨਕ ਦਾਸ ਸਦਾ ਕੁਰਬਾਣੀ ॥੮॥੪॥",
        romanTransliteration:
          "Too thaakur tum peh ardaas. Jeeo pind sabhu teri raas. Tum maat pitaa ham baarik tere. Tumri kirpaa mahi sookh ghanere. Koe na jaanai tumraa ant. Uche te uchaa bhagavant. Sagal samagri tumrai sootri dhaari. Tum te hoe su aagiakaari. Tumri gat mit tum hi jaani. Nanak daas sadaa kurbaani. ||8||4||",
        english:
          "You are our Lord and Master; to You, I offer this prayer. This body and soul are all Your property. You are our Mother and Father; we are Your children. In Your Grace, there are so many joys. No one knows Your Limit. You are the Highest of the High, Most Fortunate Lord God. The entire creation is strung on Your thread. Those who come from You are obedient to You. Your state and extent are known only to You. Servant Nanak is forever a sacrifice to You. ||8||4||",
      },
    ],
  },
  {
    id: "sukhmani-sahib",
    title: "Sukhmani Sahib",
    type: "Nitnem",
    faith: "Sikh",
    author: "Guru Arjan Dev Ji",
    significance:
      "Sukhmani Sahib (Jewel of Peace / Peace of Mind) is composed by Guru Arjan Dev Ji in Raag Gauri and is one of the most beloved compositions in Sikh literature. It consists of 24 ashtpadis (8-stanza compositions), each preceded by a salok. Reciting it brings peace of mind, success in worldly affairs, and liberation.",
    bestTime: "Morning after Japji Sahib, or any time during the day",
    verses: [
      {
        num: 1,
        gurmukhi:
          "ਆਦਿ ਗੁਰਏ ਨਮਹ ॥ ਜੁਗਾਦਿ ਗੁਰਏ ਨਮਹ ॥ ਸਤਿਗੁਰਏ ਨਮਹ ॥ ਸ੍ਰੀ ਗੁਰਦੇਵਏ ਛੰਦ ॥ ਸਲੋਕੁ ॥ ਸਿਮਰਉ ਸਿਮਰਿ ਸਿਮਰਿ ਸੁਖੁ ਪਾਵਉ ॥ ਕਲਿ ਕਲੇਸ ਤਨ ਮਾਹਿ ਮਿਟਾਵਉ ॥ ਸਿਮਰਉ ਜਾਸੁ ਬਿਮਲ ਜਸੁ ਨਾਮੀ ॥ ਸਰਬ ਸ੍ਰੇਸਟ ਊਚੇ ਸਭ ਊਚੇ ਸਭ ਕੇ ਅੰਤਰਜਾਮੀ ॥ ਜਿਸ ਸਿਮਰਤ ਆਵੈ ਪੂਰਾ ਨਾਦੁ ॥ ਦੁਖੁ ਦਰਦੁ ਭਵਜਲੁ ਭੈ ਜਾਇ ਸਾਦੁ ॥",
        romanTransliteration:
          "Aad gure namah. Jugaad gure namah. Satigure namah. Shri gurdev namah. Salok. Simarau simar simar sukhu paavou. Kal kales tan maahi mitaavou. Simarau jaas bimal jas naami. Sarab sresth uche sab ke antarjaami. Jis simrat aavai pooraa naad. Dukh darad bhavajal bhai jaai saad.",
        english:
          "I bow to the Primal Guru. I bow to the Guru of the Ages. I bow to the True Guru. I bow to the Great, Divine Guru. Salok: Remembering, remembering, remembering God in meditation, I find peace. The pains and afflictions of this body are eliminated. Remember in meditation the One whose Praise and Name is Spotless and Pure. The Most Excellent, the Most High, the Inner-knower of all. Remembering whom, the Perfect Melody wells up. Pain, suffering, the world-ocean of fear — all depart with bliss.",
      },
      {
        num: 5,
        gurmukhi:
          "ਸੁਖਮਨੀ ਸੁਖ ਅੰਮ੍ਰਿਤ ਪ੍ਰਭ ਨਾਮੁ ॥ ਭਗਤ ਜਨਾ ਕੈ ਮਨਿ ਬਿਸ੍ਰਾਮੁ ॥ ਰਹਾਉ ॥ ਪ੍ਰਭ ਕੈ ਸਿਮਰਨਿ ਗਰਭਿ ਨ ਬਸੈ ॥ ਪ੍ਰਭ ਕੈ ਸਿਮਰਨਿ ਦੁਖੁ ਜਮੁ ਨਸੈ ॥ ਪ੍ਰਭ ਕੈ ਸਿਮਰਨਿ ਕਾਲੁ ਪਰਹਰੈ ॥ ਪ੍ਰਭ ਕੈ ਸਿਮਰਨਿ ਦੁਸਮਨੁ ਟਰੈ ॥ ਪ੍ਰਭ ਸਿਮਰਤ ਕਛੁ ਬਿਘਨੁ ਨ ਲਾਗੈ ॥ ਪ੍ਰਭ ਕੈ ਸਿਮਰਨਿ ਅਨਦਿਨੁ ਜਾਗੈ ॥ ਪ੍ਰਭ ਕੈ ਸਿਮਰਨਿ ਭਉ ਨ ਬਿਆਪੈ ॥ ਪ੍ਰਭ ਕੈ ਸਿਮਰਨਿ ਦੁਖੁ ਨ ਸੰਤਾਪੈ ॥ ਪ੍ਰਭ ਕਾ ਸਿਮਰਨੁ ਸਾਧ ਕੈ ਸੰਗਿ ॥ ਨਾਨਕ ਪ੍ਰਭ ਕਾ ਸਿਮਰਨੁ ਜਿਸੁ ਮਸਤਕਿ ਭਾਗੁ ॥੧॥",
        romanTransliteration:
          "Sukhmani sukh amrit Prabh naam. Bhagat janaa kai man bisraam. Rahao. Prabh kai simran garabh na basai. Prabh kai simran dukh jam nasai. Prabh kai simran kaal parharai. Prabh kai simran dusaman tarai. Prabh simrat kachhu bighan na laagai. Prabh kai simran andin jaagai. Prabh kai simran bhau na biaapai. Prabh kai simran dukhu na santaapai. Prabh kaa simran saadh kai sang. Nanak Prabh kaa simran jis mastak bhaag. ||1||",
        english:
          "Sukhmani: Peace of mind; the Nectar of God's Name is the soul's peace. It is the resting place in the minds of the devotees. Pause. Meditating on God, one is not reborn. Meditating on God, the painful Messenger of Death flees. Meditating on God, death is defeated. Meditating on God, enemies are repelled. Meditating on God, no obstacle blocks your path. Meditating on God, one remains awake day and night. Meditating on God, fear does not grip you. Meditating on God, suffering does not afflict you. God's meditation comes in the company of the Holy. O Nanak, God's meditation — blessed is the one with such good fortune written on their forehead. ||1||",
      },
      {
        num: 12,
        gurmukhi:
          "ਜਾ ਕੈ ਮਨਿ ਗੁਰ ਕੀ ਪਰਤੀਤਿ ॥ ਤਿਸੁ ਜਨ ਆਵੈ ਹਰਿ ਪ੍ਰਭੁ ਚੀਤਿ ॥ ਭਗਤੁ ਭਗਤੁ ਸੁਨੀਐ ਤਿਹੁ ਲੋਇ ॥ ਜਾ ਕੈ ਹਿਰਦੈ ਏਕੋ ਹੋਇ ॥ ਆਤਮ ਰਸੁ ਜਿਨਿ ਜਾਣਿਆ ॥ ਸੋ ਗੁਰਮੁਖਿ ਨਾਨਕ ਸਿਆਣਿਆ ॥੮॥੧੨॥",
        romanTransliteration:
          "Jaa kai man gur ki parteeti. Tis jan aavai har Prabh cheeti. Bhagat bhagat suneeai tihu loe. Jaa kai hirdai eko hoe. Aatam ras jin jaaniaa. So gurmukh Nanak siaaniaa. ||8||12||",
        english:
          "One who has faith in the Guru in his mind — that person remembers the Lord God. That person is called a devotee, a devotee, throughout the three worlds, in whose heart the One Lord abides. One who knows the sublime essence of the soul — O Nanak, that Gurmukh is wise. ||8||12||",
      },
    ],
  },
];
