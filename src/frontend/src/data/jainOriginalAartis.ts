export interface JainOriginalAarti {
  id: string;
  name: string;
  deity: string;
  originalScript: "Prakrit" | "Sanskrit" | "Apabhramsha";
  text: string;
  textRoman: string;
  meaningHindi: string;
  meaningEnglish: string;
  faith: "Jain";
}

export const jainOriginalAartis: JainOriginalAarti[] = [
  {
    id: "jain-aarti-1",
    name: "ॐ जय महावीर प्रभु",
    deity: "Bhagwan Mahavira",
    originalScript: "Prakrit",
    faith: "Jain",
    text: `ॐ जय महावीर प्रभु, जय महावीर प्रभु।
सत्य अहिंसा तुम्हारी, जग के शिरोमणि।
।। ॐ जय महावीर प्रभु ।।

चौबीसवें तीर्थंकर तुम, वर्धमान कहाए।
कुण्डलपुर में जन्मे, जग को ज्ञान दिखाए।
अहिंसा परमो धर्मः, यह सन्देश सुनाए।
।। ॐ जय महावीर प्रभु ।।

त्याग तपस्या वैराग्य, यह था तुम्हारा भाव।
साढ़े बारह वर्ष तपे, छोड़ा सब अनुभाव।
केवलज्ञान को पाया, दिखाया मुक्ति-स्वभाव।
।। ॐ जय महावीर प्रभु ।।

पञ्चमहाव्रत के धारी, निग्रंथ कहलाए।
दिगम्बर निर्ग्रंथ रूप, जिन-पथ दिखलाए।
सर्वज्ञ सर्वदर्शी तुम, मोक्ष-मार्ग बताए।
।। ॐ जय महावीर प्रभु ।।`,
    textRoman: `Om Jai Mahaveer Prabhu, Jai Mahaveer Prabhu.
Satya Ahimsa tumhari, jag ke shiromani.

Chauveesvein Tirthankar tum, Vardhaman kahaaye.
Kundalpur mein janme, jag ko gyaan dikhaaye.
Ahimsa paramo dharmah, yeh sandesh sunaaye.

Tyaag tapasya vairaagya, yeh tha tumhara bhaav.
Saadhe baarah varsh tape, choda sab anubhaav.
Keval-gyaan ko paaya, dikhaaya mukti-swabhaav.

Panch-mahavrat ke dhaari, Nigranth kehlaaye.
Digambar Nirganth roop, Jin-path dikhlaaaye.
Sarvagya sarvadarshi tum, moksha-maarg bataaye.`,
    meaningHindi:
      "भगवान महावीर की आरती — सत्य, अहिंसा और मोक्षमार्ग के प्रतीक, चौबीसवें तीर्थंकर वर्धमान महावीर की स्तुति जो पाँच महाव्रत और केवलज्ञान के धारक हैं।",
    meaningEnglish:
      "Aarti of Lord Mahavira — Praise of the 24th Tirthankara, Vardhaman Mahavira, the embodiment of truth and non-violence, who attained Keval Gyana (omniscience) through 12.5 years of austerity and showed the path of liberation.",
  },
  {
    id: "jain-aarti-2",
    name: "चौबीस तीर्थंकर आरती",
    deity: "Chaubis Tirthankar",
    originalScript: "Prakrit",
    faith: "Jain",
    text: `चौबीस तीर्थंकर की आरती उतारूँ,
जिन-शासन की महिमा गाऊँ।
।। चौबीस तीर्थंकर ।।

ऋषभदेव आदिनाथ प्रथम, धर्म-धुरंधर ज्ञानी।
अजितनाथ संभवनाथ, अभिनंदन गुणखानी।
सुमतिनाथ पद्मप्रभ, सुपार्श्व जग के दानी।
।। चौबीस तीर्थंकर ।।

चंद्रप्रभु पुष्पदंत सुविधि, शीतलनाथ महान।
श्रेयांसनाथ वासुपूज्य, विमलनाथ भगवान।
अनंतनाथ धर्मनाथ, शांतिनाथ कल्याण।
।। चौबीस तीर्थंकर ।।

कुंथुनाथ अरनाथ मल्लि, मुनिसुव्रत स्वामी।
नमिनाथ नेमिनाथ पार्श्व, महावीर अंतर्यामी।
चौबीसों तीर्थंकर वंदूँ, प्रभु मेरे स्वामी।
।। चौबीस तीर्थंकर ।।`,
    textRoman: `Chauvees Tirthankar ki aarti utaarun,
Jin-shaasan ki mahima gaaun.

Rishabdev Adinath pratham, dharm-dhurandhar gyaani.
Ajitnaath Sambhavnaath, Abhinandan gun-khaani.
Sumatinath Padmaprabh, Suparshv jag ke daani.

Chandraprabhu Pushpadant Suvidhi, Sheetalnaath mahaan.
Shreyaansnaath Vaasupujya, Vimalnaath Bhagwaan.
Anantnaath Dharmanath, Shaantinath kalyaan.

Kunthunaath Arnaath Malli, Munisuvrat Swami.
Naminaath Neminaath Parshv, Mahaveer Antaryaami.
Chauveesson Tirthankar vandum, Prabhu mere Swami.`,
    meaningHindi:
      "जैन धर्म के चौबीस तीर्थंकरों की सामूहिक आरती — ऋषभदेव से महावीर तक सभी तीर्थंकरों का स्मरण और वंदना।",
    meaningEnglish:
      "Collective Aarti of the 24 Jain Tirthankaras — A devotional hymn remembering all 24 Ford-makers of Jainism from Rishabhdeva (Adinath) to Mahavira, invoking their blessings and guidance on the path of liberation.",
  },
  {
    id: "jain-aarti-3",
    name: "पञ्च परमेष्ठी नामावली",
    deity: "Panch Parameshti",
    originalScript: "Prakrit",
    faith: "Jain",
    text: `णमो अरिहंताणं — नमो अरिहंताणं
णमो सिद्धाणं — नमो सिद्धाणं
णमो आयरियाणं — नमो आचार्याणं
णमो उवज्झायाणं — नमो उपाध्यायाणं
णमो लोए सव्व साहूणं — नमो लोके सर्व साधूणां

एसो पञ्च णमोक्कारो,
सव्व पावप्पणासणो।
मङ्गलाणं च सव्वेसिं,
पढमं हवइ मङ्गलं।।

पञ्च परमेष्ठी वंदना —
अरिहंत सिद्ध आचार्य, उपाध्याय साधु जग के।
इन पाँचों को नमस्कार, दुःख हरें हर पल के।
णमोकार महामंत्र यह, जग में सर्वोच्च।
पापों का नाश करे, दे मुक्ति निश्चित।`,
    textRoman: `Namo Arihantanam — Salutation to the Arihantas
Namo Siddhanam — Salutation to the Siddhas
Namo Ayariyanam — Salutation to the Acharyas
Namo Uvajjhayanam — Salutation to the Upadhyayas
Namo Loe Savva Sahunam — Salutation to all Sadhus

Eso Panch Namokkaro,
Savva Pavappanasano.
Mangalanam cha Savvesim,
Padhamam havai Mangalam.

Panch Parameshti Vandana —
Arihant Siddh Acharya, Upadhyaya Sadhu jag ke.
In pachon ko namaskar, dukh haren har pal ke.
Namokar Mahamantra yeh, jag mein sarvochch.
Papon ka naash kare, de mukti nishchit.`,
    meaningHindi:
      "पञ्च परमेष्ठी (पाँच परम आत्माओं) की वंदना — अरिहंत, सिद्ध, आचार्य, उपाध्याय और साधु को नमस्कार। णमोकार महामंत्र जैन धर्म का सर्वोच्च मंत्र है जो समस्त पापों का नाश करता है।",
    meaningEnglish:
      "Salutation to the Five Supreme Beings (Panch Parameshti) — Arihantas (enlightened souls), Siddhas (liberated souls), Acharyas (spiritual leaders), Upadhyayas (teachers), and Sadhus (monks). The Namokar Mahamantra is the supreme mantra of Jainism that destroys all sins.",
  },
  {
    id: "jain-aarti-4",
    name: "भक्तामर मंगलाचरण",
    deity: "Bhagwan Rishabhdeva",
    originalScript: "Sanskrit",
    faith: "Jain",
    text: `भक्तामर-प्रणत-मौलि-मणि-प्रभाणाम्
उद्द्योतकं दलित-पाप-तमोवितानम्।
सम्यक् प्रणम्य जिन-पाद-युगं युगादा-
वालम्बनं भव-जले पततां जनानाम्।।१।।

यः संस्तुतः सकल-वाङ्मय-तत्त्व-बोधा-
दुद्भूत-बुद्धि-पटुभिः सुर-लोक-नाथैः।
स्तोत्रैर्जगत्-त्रितय-चित्त-हरैर्उदारैः
स्तोष्ये किलाहमपि तं प्रथमं जिनेन्द्रम्।।२।।

बुद्ध्या विना न खलु भक्तिरतद्गुणज्ञे
नालं गुणज्ञ-रहितस्य च भक्तिरेव।
तस्मात् स्तुते प्रभु तवाऽऽदरतो जनस्य
ज्ञानं स्वतो भवति तत्र किमद्भुतं तत्।।३।।`,
    textRoman: `Bhaktamar-pranata-mauli-mani-prabhanam
Uddyotakam dalita-papa-tamovitanam.
Samyak pranamya jina-pada-yugam yugadav-
alambanam bhava-jale patatam jananam. ||1||

Yah samstutah sakala-vangmaya-tattva-bodhadud-
bhuta-buddhi-patubhih sura-loka-nataih.
Stotair-jagat-tritaya-chitta-harair-udaraih
stoshye kilaham api tam prathamam Jinendram. ||2||

Buddhya vina na khalu bhaktir-atad-gunaghne
nalam guna-gna-rahitasya cha bhaktireva.
Tasmaat stute prabhu tavadarato janasya
gyanam svato bhavati tatra kim-adbhutam tat. ||3||`,
    meaningHindi:
      "भक्तामर स्तोत्र का मंगलाचरण — भगवान ऋषभदेव (आदिनाथ) की स्तुति में रचित आचार्य मानतुंग की दिव्य रचना। भक्त के मस्तक पर पड़ने वाली प्रकाश-किरणों की तरह, भगवान के चरण-कमल पापों के अंधेरे को नष्ट करते हैं।",
    meaningEnglish:
      "Opening verses of Bhaktamar Stotra — Divine composition by Acharya Mantung in praise of Lord Rishabhdeva (Adinath), the first Tirthankara. Like rays of light on a devotee's crown, the Lord's lotus feet dispel the darkness of sins and illuminate the path to liberation.",
  },
];
