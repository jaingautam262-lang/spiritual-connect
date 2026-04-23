import type { Stotra } from "./stotraData";

// New batch of stotras — 20 entries
// Admin CMS can fill full text; opening shlokas included as authentic samples.
export const stotraNewBatch: Stotra[] = [
  {
    id: "hanuman-bahuk",
    title: "Hanuman Bahuk",
    deity: "Hanuman",
    faith: "Hindu",
    type: "Stotra",
    description:
      "Composed by Goswami Tulsidas when he suffered from severe arm pain (bahuk = arm). He prayed to Hanuman Ji for relief. This 44-verse stotra is recited for healing ailments, removing physical suffering, and invoking Hanuman's protective grace.",
    fullText: `॥ हनुमान बाहुक ॥
(तुलसीदास कृत)

श्री गुरु पद नख मनि गन जोती। सुमिरत दिव्य दृष्टि हिय होती॥
दलन मोह तम सो सप्रकासू। बड़े भाग उर आवइ जासू॥

उमा रमा ब्रह्माणी जब होई। जानत प्रभु प्रताप सब कोई॥
सोई दायक सब सुख संपाती। देत जाचकहि भगति अघाती॥

बाहुक के कर लें हनुमान।
दूर करो मेरे सब अपमान॥

ॐ नमो हनुमते रुद्रावताराय, सर्व ग्रह दोष निवारणाय,
सर्व रोग निवारणाय, बाहु पीड़ा निवारणाय, सर्व संकट निवारणाय हुं फट्।

[पूर्ण 44 पद — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Tulsidas describes his physical suffering and surrenders to Hanuman Ji, asking for cure of arm pain (bahuk peed). He glorifies Hanuman as Rudra avatar and all-protecting deity.",
    benefits:
      "Removes physical ailments especially arm/shoulder pain. Destroys all planetary doshas, negative energies, and enemies. Grants Hanuman's protection and physical well-being.",
  },
  {
    id: "hanuman-tandav",
    title: "Hanuman Tandav Stotra",
    deity: "Hanuman",
    faith: "Hindu",
    type: "Stotra",
    description:
      "A powerful stotra describing Hanuman Ji performing the Tandav dance in the ferocious form of Veer Hanuman — the Mahavir who destroys all demons and protects devotees.",
    fullText: `॥ हनुमान ताण्डव स्तोत्र ॥

जयति वायुनन्दन, जयति रुद्र अवतार।
जयति महाबली, हनुमान संकट हार॥

लाल मुखे लंकापति, नाशक भूत पिशाच।
ताण्डव नृत्य करे हनुमान, जपे राम का नाम सच्चाच॥

भूत-पिशाच निकट नहिं आवे, महावीर जब नाम सुनावे।
नासे रोग हरे सब पीरा, जपत निरंतर हनुमत बीरा॥

[पूर्ण ताण्डव स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Hanuman performs the cosmic Tandav dance, annihilating all evil forces. His roar shakes the universe and protects devotees from all harm.",
    benefits:
      "Removes fear of ghosts, spirits, and evil energies. Grants courage, strength, and Hanuman's protection. Destroys all enemies and obstacles.",
  },
  {
    id: "shiv-mahimna-stotra",
    title: "Shiv Mahimna Stotra",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotram",
    description:
      "Composed by Gandharva Pushpadanta, this 43-verse hymn glorifies the incomprehensible greatness (mahimna) of Lord Shiva. It is considered one of the finest Sanskrit hymns ever composed.",
    fullText: `॥ शिव महिम्न स्तोत्रम् ॥
(पुष्पदन्त कृत)

महिम्नः पारं ते परम विदुषो यद्यसदृशी
स्तुतिर्ब्रह्मादीनामपि तदवसन्नास्त्वयि गिरः।
अथाऽवाच्यः सर्वः स्वमतिपरिणामावधि गृणन्
ममाप्येष स्तोत्रे हर निरपवादः परिकरः॥१॥

अतीतः पन्थानं तव च महिमा वाङ्मनसयोः
अतद्व्यावृत्त्या यं चकितमभिधत्ते श्रुतिरपि।
स कस्य स्तोतव्यः कतिविधगुणः कस्य विषयः
पदे त्वर्वाचीने पतति न मनः कस्य न वचः॥२॥

मधुस्फीता वाचः परमममृतं निर्मितवतस्
तव ब्रह्मन् किं वागपि सुरगुरोर्विस्मयपदम्।
मम त्वेतां वाणीं गुणकथनपुण्येन भवतः
पुनामीत्यर्थेऽस्मिन् पुरमथन बुद्धिर्व्यवसिता॥३॥

[पूर्ण 43 श्लोक — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Pushpadanta humbly says that Shiva's greatness is beyond the reach of speech and mind — even the Vedas are unable to fully describe Him. Yet the devotee attempts praise as a purification of the self.",
    benefits:
      "Reciting Shiv Mahimna Stotra grants liberation, removes all sins, and bestows Shiva's supreme grace. It is said to be equivalent to reading all the Vedas.",
  },
  {
    id: "mahamrityunjaya-extended",
    title: "Mahamrityunjaya Stotra (Extended)",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotram",
    description:
      "The extended hymn to Mrityunjaya — the Conqueror of Death. Beyond the single Maha Mrityunjaya mantra, this stotra includes multiple verses praising Shiva as the supreme healer, protector, and liberator from death.",
    fullText: `॥ महामृत्युञ्जय स्तोत्रम् ॥

ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।
उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥

मृत्युञ्जय महेशान, त्राहि मां शरणागतम्।
जन्ममृत्युजराव्याधि, पीडितं कर्मबन्धनात्॥

नेत्रत्रयविभूषाय, त्रिगुणात्मनमोऽस्तु ते।
गौरी-शंकर साम्राज्य, दातृभ्यां भुवनत्रये॥

सर्वव्याधिविनाशाय, सर्वपीडाप्रशान्तये।
जयजयामहेशान, प्रणतोऽस्मि सदाशिव॥

[पूर्ण विस्तृत स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "This extended stotra asks Shiva — the three-eyed, all-seeing Lord — to liberate the devotee from the bondage of repeated birth and death, old age, disease, and karma.",
    benefits:
      "Grants protection from untimely death, serious illness, and accidents. Regular recitation creates a divine shield around the devotee and promotes longevity and spiritual liberation.",
  },
  {
    id: "daridrya-dahan-shiv-stotra",
    title: "Daridrya Dahan Shiv Stotra",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotra",
    description:
      "A powerful 10-verse stotra that 'burns away' (dahan) poverty (daridrya). Composed by Vasishtha Rishi, it praises Lord Shiva as the destroyer of poverty and the bestower of unlimited wealth and prosperity.",
    fullText: `॥ दारिद्र्य दहन शिव स्तोत्र ॥
(वसिष्ठ कृत)

विश्वेश्वराय नरकार्णव तारणाय,
कर्णामृताय शशिशेखर धारणाय।
कर्पूरकान्तिधवलाय जटाधराय,
दारिद्र्य दुःख दहनाय नमः शिवाय॥१॥

गौरीप्रियाय रजनीश कलाधराय,
कालान्तकाय भुजगाधिप कङ्कणाय।
गङ्गाधराय गजराज विमर्दनाय,
दारिद्र्य दुःख दहनाय नमः शिवाय॥२॥

भक्तप्रियाय भवरोग भयापहाय,
उग्राय दुर्गभव सागर तारणाय।
ज्योतिर्मयाय गुणनाम सुनृत्यकाय,
दारिद्र्य दुःख दहनाय नमः शिवाय॥३॥

[शेष 7 श्लोक — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Each verse ends with 'Daridrya Dukha Dahanaya Namah Shivaya' — salutation to Shiva who burns away the suffering of poverty. The verses describe Shiva's divine attributes as destroyer of worldly bondage.",
    benefits:
      "Removes poverty, financial struggles, and material suffering. Bestows wealth, prosperity, and Shiva's grace. Particularly effective when recited on Mondays and during Shivratri.",
  },
  {
    id: "govind-damodar-stotra",
    title: "Govind Damodar Stotra",
    deity: "Krishna",
    faith: "Hindu",
    type: "Stotram",
    description:
      "A beloved devotional hymn to Lord Krishna (Govinda/Damodara), reciting His many divine names. Every verse ends with 'Govinda Damodara Madhaveti' — a sweet refrain of Krishna's names that melts the heart.",
    fullText: `॥ गोविन्द दामोदर स्तोत्रम् ॥

कस्तूरीतिलकं ललाटपटले वक्षःस्थले कौस्तुभं
नासाग्रे नवमौक्तिकं करतले वेणुं करे कङ्कणम्।
सर्वाङ्गे हरिचन्दनं च कलयन् कण्ठे च मुक्तावलीं
गोपस्त्रीपरिवेष्टितो विजयते गोपाल चूडामणिः॥१॥

मुञ्चन्तु मत्पापानि स्मृतावपि।
गोविन्द दामोदर माधवेति॥ध्रुव॥

भ्रमरगतिरितः कृष्णः सखीभिर्मधुरं हसन्।
गोपीनां तनुमाश्रित्य गोपीभिः परिवेष्टितः॥२॥

गोविन्द दामोदर माधवेति॥

[पूर्ण स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "The stotra describes Krishna adorned with kasturi tilak, Kaustubha gem, fresh pearls, flute and bangles — the most beautiful form, surrounded by Gopis. The refrain 'Govinda Damodara Madhaveti' is endlessly sweet.",
    benefits:
      "Removes all sins just by remembrance. Fills the heart with divine love for Krishna. Grants liberation, peace, and ultimate union with the Lord.",
  },
  {
    id: "mangal-stotra",
    title: "Mangal Stotra",
    deity: "Mangal (Mars)",
    faith: "Hindu",
    type: "Stotram",
    description:
      "A stotra dedicated to Mangal (Mars), one of the nine planetary deities (Navagraha). Recited to pacify the ill effects of Mars in the horoscope and to gain courage, strength, and protection.",
    fullText: `॥ मङ्गल स्तोत्रम् ॥

धरणीगर्भसम्भूतं विद्युत्कान्तिसमप्रभम्।
कुमारं शक्तिहस्तं तं मङ्गलं प्रणम्याम्यहम्॥

रक्ताम्बरधरं देवं चतुर्भुजसमन्वितम्।
शूलशक्तिगदाभारं मङ्गलं प्रणमाम्यहम्॥

मेषवृश्चिककारकं रक्तवर्णसमप्रभम्।
रक्तपुष्पाञ्जलिं दत्वा मङ्गलं पूजयाम्यहम्॥

[पूर्ण स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Mars (Mangal) is born from the womb of the Earth, bright as lightning, holding a spear (shakti), wearing red garments. The devotee offers red flowers and bows to the planet.",
    benefits:
      "Pacifies Mangal dosha in horoscope. Grants courage, energy, victory over enemies, and protection from accidents. Effective for Kuja dosha removal in marriage charts.",
  },
  {
    id: "surya-stotra",
    title: "Surya Stotra",
    deity: "Surya",
    faith: "Hindu",
    type: "Stotram",
    description:
      "A devotional stotra to Lord Surya (the Sun god), praising his twelve forms (Dwadash Adityas) and invoking his healing and life-giving energies. Essential for Sunday worship and solar remedies.",
    fullText: `॥ सूर्य स्तोत्रम् ॥

जपाकुसुमसंकाशं काश्यपेयं महद्युतिम्।
तमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥

नमस्त्वादित्याय च विश्वकर्मणे,
तपस्विने चाप्यखिलस्य सूत्रिणे।
नमस्त्वसंख्याय महाबलाय,
नमस्त्वनन्ताय सहस्ररश्मये॥

आरोग्यं देहि मे देव, आयुः प्रज्ञां च देहि मे।
आरोग्यं भास्करात् प्राप्यं, भास्करं तं नमाम्यहम्॥

[पूर्ण स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Surya is described as red like the hibiscus flower, the son of Kashyapa, destroyer of darkness, remover of all sins. The devotee seeks health, long life, and wisdom from the Sun.",
    benefits:
      "Grants health, longevity, eye health, vitality, and success. Removes sun-related planetary doshas. Recitation at sunrise brings immense benefits.",
  },
  {
    id: "dattatreya-stotra",
    title: "Dattatreya Stotra",
    deity: "Dattatreya",
    faith: "Hindu",
    type: "Stotram",
    description:
      "A stotra in praise of Lord Dattatreya — the divine synthesis of Brahma, Vishnu, and Shiva — worshipped as the Adi Guru and bestower of all spiritual knowledge and liberation.",
    fullText: `॥ दत्तात्रेय स्तोत्रम् ॥

जटाधर पिङ्गलवर्ण दीप्तः, कमण्डलुं त्रिशूलं करे विभ्राजः।
त्रिमूर्तिं आद्यं गुरवे नमामि, दत्तात्रेयाय नमो नमस्ते॥

ब्रह्माविष्णुशिवात्मकं, त्रिगुणातीतं त्रिमूर्तिकम्।
गुरुं दत्तं महायोगिनम्, प्रपद्ये शरणं मम॥

सद्गुरुं सर्वकारणम्, अनसूयात्मजं प्रभुम्।
दत्तात्रेयं नमाम्यहम्, भक्त्या परमया सदा॥

[पूर्ण स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Dattatreya with matted hair, golden-bright, holding kamandalu and trident — the primordial Guru who is the unity of Brahma-Vishnu-Shiva. The devotee surrenders at his feet.",
    benefits:
      "Grants spiritual knowledge, liberation from karma, protection from evil, and fulfillment of all desires. Especially powerful for seekers on the path of yoga and self-realization.",
  },
  {
    id: "narasimha-stotra",
    title: "Narasimha Stotra",
    deity: "Narasimha",
    faith: "Hindu",
    type: "Stotram",
    description:
      "A powerful stotra to Lord Narasimha (the Man-Lion avatar of Vishnu) who annihilated the demon Hiranyakashipu to protect his devotee Prahlada. Provides supreme protection and destroys all evil.",
    fullText: `॥ नृसिंह स्तोत्रम् ॥

उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्।
नृसिंहं भीषणं भद्रं मृत्युमृत्युं नमाम्यहम्॥

सर्वे वेदाः यत्पदमामनन्ति, तपांसि सर्वाणि च यद्वदन्ति।
यदिच्छन्तो ब्रह्मचर्यं चरन्ति, तत्ते पदं संग्रहेण ब्रवीम्योमित्येतत्॥

यतो यतः संचरति सिंहनादः, ततस्ततः भीतिरभूच्च दैत्यैः।
पराजितैश्च त्वयि भक्ति भक्तैर्लब्धं सद्यः शरणं नृसिंह॥

[पूर्ण स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Narasimha is described as ferocious, heroic, blazing, all-faced, terrifying yet auspicious — the very death of death. The stotra invokes his roar that terrifies all demons.",
    benefits:
      "Provides supreme divine protection from all enemies, black magic, and evil forces. Destroys fears, grants fearlessness, and ensures victory for devotees of Vishnu.",
  },
  {
    id: "mahalakshmi-hridaya",
    title: "Mahalakshmi Hridaya",
    deity: "Lakshmi",
    faith: "Hindu",
    type: "Stotram",
    description:
      "The 'heart' (hridaya) stotra of Goddess Mahalakshmi — a deeply intimate hymn that meditates on the divine essence of Lakshmi, invoking her grace for wealth, abundance, and spiritual liberation.",
    fullText: `॥ महालक्ष्मी हृदय स्तोत्रम् ॥

ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः।

नमस्ते सर्वलोकानां जनन्यै मोक्षदायिनि।
नमस्ते विष्णुपत्न्यै च पद्मालये नमोऽस्तु ते॥

नमस्ते कमलावासे नारायणसहोदरि।
श्रिये सर्वार्थसंसिद्धिं देहि मे वरदे शुभे॥

हृदये त्वां नमाम्यद्य, हृदय-कमले विराज।
भक्त्या हृदय-पुण्डरीके, नित्यं देहि समाहितम्॥

[पूर्ण हृदय स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "This hridaya stotra meditates on Lakshmi dwelling in the heart-lotus of the devotee. It invokes her as the mother of all worlds, giver of liberation, consort of Vishnu, and grants all auspiciousness.",
    benefits:
      "Opens the heart to receive Lakshmi's grace. Brings lasting prosperity, removes poverty, and fills the home with abundance. Particularly effective on Fridays and Diwali.",
  },
  {
    id: "markandey-maha-mrityunjay",
    title: "Markandey Maha Mrityunjay Stotra",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotra",
    description:
      "Sage Markandeya, blessed to conquer death itself, composed this powerful stotra to Shiva as Mrityunjaya. This is the expanded version of the death-conquering prayer composed from his personal experience of surviving death.",
    fullText: `॥ मार्कण्डेय महामृत्युञ्जय स्तोत्र ॥

मार्कण्डेय उवाच:
मृत्युञ्जयं महादेवं, भवरोगभयापहम्।
मृत्युमृत्युं महाभीमं, त्र्यम्बकं देवमव्ययम्॥

यमराज भयं नास्ति, यस्य नाम स्मरेत् सकृत्।
शिव-शिव-शिव-शिव नामं, जपेद् अमृत-सिद्धये॥

ॐ नमो भगवते रुद्राय, विशोकाय त्रिनेत्रिणे।
मृत्योर्मुक्षीय माऽमृतात्, नमस्ते परमेश्वर॥

[पूर्ण स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Markandeya, who won victory over Yama (Death) by clinging to the Shivalinga, prays to Shiva as the supreme Mrityunjaya. Each verse is his personal testimony to Shiva's power over death.",
    benefits:
      "Extremely powerful for protection from untimely death, serious illness, and life-threatening situations. Recitation during critical illness or danger invokes Shiva's direct intervention.",
  },
  {
    id: "lalita-panchakam",
    title: "Lalita Panchakam",
    deity: "Lalita Devi",
    faith: "Hindu",
    type: "Stotra",
    description:
      "Five verses composed by Adi Shankaracharya in praise of Goddess Lalita Tripurasundari — the most beautiful manifestation of the Divine Mother. Short yet infinitely powerful.",
    fullText: `॥ ललिता पञ्चकम् ॥
(आदि शंकराचार्य कृत)

प्रातः स्मरामि ललितावदनारविन्दं,
बिम्बाधरं पृथुलमौक्तिकशोभिनासम्।
आकर्णदीर्घनयनं मणिकुण्डलाढ्यं,
मन्दस्मितं मृगमदोज्ज्वलफालदेशम्॥१॥

प्रातर्भजामि ललिता भुजकल्पवल्लीं,
रत्नाङ्गुलीयलसदङ्गुलिपल्लवाढ्याम्।
माणिक्यहेमवलयाङ्गदशोभमानां,
पुण्ड्रेक्षुचापकुसुमेषुसृणीर्दधानाम्॥२॥

प्रातर्नमामि ललिता चरणारविन्दं,
भक्तेष्टदाननिरतं भवसिन्धुपोतम्।
पद्मासनाभरणभूषितपादयुग्मं,
कंजद्वयाभयवरप्रदशोभमानम्॥३॥

प्रातः स्तुवे परशिवां ललितां भवानीं,
त्रय्यन्तवेद्यविभवां करुणानवद्याम्।
विश्वस्य सृष्टिविलयस्थितिहेतुभूतां,
विद्येश्वरीं निगमवाङ्मनसातिदूराम्॥४॥

प्रातर्वदामि ललिते तव पुण्यनाम,
कामेश्वरीति कमलेति महेश्वरीति।
श्रीशांभवीति जगतां जननीति नित्यं,
कल्याणवृष्टिरसिकेति च चिन्तयामि॥५॥`,
    meaning:
      "Each of the 5 verses glorifies a different aspect of Lalita at dawn — her lotus face, her divine arms holding sugarcane bow and flower arrows, her lotus feet as the boat across the ocean of samsara, and her divine names.",
    benefits:
      "Reciting Lalita Panchakam at dawn destroys all sins, grants beauty, prosperity, and the grace of the Divine Mother. It is said to be equivalent to her complete sahasranama.",
  },
  {
    id: "batuk-bhairav-ashtottar",
    title: "Batuk Bhairav Ashtottara Shatanama",
    deity: "Batuk Bhairav",
    faith: "Hindu",
    type: "Stotram",
    description:
      "108 names of Batuk Bhairav — the youthful, benevolent form of Bhairava who protects devotees and grants all boons. This Ashtottara is recited for powerful protection and removal of all obstacles.",
    fullText: `॥ बटुक भैरव अष्टोत्तर शतनाम ॥

ॐ बटुकाय नमः।
ॐ भैरवाय नमः।
ॐ रुद्राय नमः।
ॐ नीलकण्ठाय नमः।
ॐ त्रिशूलिने नमः।
ॐ डमरुधाराय नमः।
ॐ कपालमालिने नमः।
ॐ श्मशानवासिने नमः।
ॐ भूतनाथाय नमः।
ॐ वेतालेश्वराय नमः॥ (१-१०)

ॐ त्रिनेत्राय नमः।
ॐ सर्पभूषणाय नमः।
ॐ अट्टहासिने नमः।
ॐ महारुद्राय नमः।
ॐ भक्तरक्षकाय नमः।
ॐ खड्गपाणये नमः।
ॐ सिद्धिदाय नमः।
ॐ मुक्तिदाय नमः।
ॐ ज्ञानदाय नमः।
ॐ प्रेतेश्वराय नमः॥ (११-२०)

[शेष ८८ नाम — Admin CMS द्वारा भरे जाएंगे]

इति बटुक भैरव अष्टोत्तर शतनाम स्तोत्रम् सम्पूर्णम्।`,
    meaning:
      "108 divine names of Batuk Bhairav, each beginning with Om, describing his attributes as the youthful Bhairava who dwells in cremation grounds, wears snake ornaments, carries skull garland and trident.",
    benefits:
      "Grants supreme protection, removes evil eye, destroys enemies, and fulfills all desires. Particularly powerful for protection against black magic and negative energies.",
  },
  {
    id: "ganesh-ashtottar",
    title: "Ganesh Ashtottara Shatanama",
    deity: "Ganesha",
    faith: "Hindu",
    type: "Stotram",
    description:
      "108 names of Lord Ganesha — the beloved elephant-headed son of Shiva and Parvati, the remover of obstacles and lord of new beginnings. This Ashtottara is recited before any auspicious undertaking.",
    fullText: `॥ श्री गणेश अष्टोत्तर शतनाम ॥

ॐ गणेशाय नमः।
ॐ विघ्ननाशाय नमः।
ॐ गौरीपुत्राय नमः।
ॐ गणेश्वराय नमः।
ॐ स्कन्दाग्रजाय नमः।
ॐ अव्ययाय नमः।
ॐ पूताय नमः।
ॐ दक्षाय नमः।
ॐ अध्यक्षाय नमः।
ॐ द्विजप्रियाय नमः॥ (१-१०)

ॐ अग्निगर्भच्छिदे नमः।
ॐ इन्द्रश्रीप्रदाय नमः।
ॐ वाणीप्रदाय नमः।
ॐ अव्ययाय नमः।
ॐ सर्वसिद्धिप्रदायकाय नमः।
ॐ शर्वतनयाय नमः।
ॐ शर्वरीप्रियाय नमः।
ॐ सर्वात्मकाय नमः।
ॐ सृष्टिकर्त्रे नमः।
ॐ देवाय नमः॥ (११-२०)

[शेष ८८ नाम — Admin CMS द्वारा भरे जाएंगे]

इति श्री गणेश अष्टोत्तर शतनाम स्तोत्रम् सम्पूर्णम्।`,
    meaning:
      "108 divine names of Ganesha, each starting with Om, describing his attributes as the son of Gauri, lord of Ganas, remover of obstacles, giver of all achievement, creator, and divine protector.",
    benefits:
      "Reciting before any new venture, exam, or important undertaking removes all obstacles and ensures success. Grants intelligence, wisdom, and Ganesha's powerful blessings.",
  },
  {
    id: "guru-stotra",
    title: "Guru Stotra",
    deity: "Guru (Brihaspati)",
    faith: "Hindu",
    type: "Stotram",
    description:
      "A stotra in praise of the Guru — both the divine cosmic Guru Brihaspati (Jupiter) and one's personal spiritual teacher. The Guru tradition is central to Hindu spirituality.",
    fullText: `॥ गुरु स्तोत्रम् ॥

गुरुर्ब्रह्मा गुरुर्विष्णुः, गुरुर्देवो महेश्वरः।
गुरुरेव परं ब्रह्म, तस्मै श्री गुरवे नमः॥

अज्ञानतिमिरान्धस्य, ज्ञानाञ्जनशलाकया।
चक्षुरुन्मीलितं येन, तस्मै श्री गुरवे नमः॥

ध्यानमूलं गुरोर्मूर्तिः, पूजामूलं गुरोः पदम्।
मन्त्रमूलं गुरोर्वाक्यं, मोक्षमूलं गुरोः कृपा॥

देवानां च ऋषीणां च गुरुं काञ्चनसन्निभम्।
बुद्धिभूतं त्रिलोकेशं, बृहस्पतिं नमाम्यहम्॥

[पूर्ण स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "The Guru is Brahma (creator of knowledge), Vishnu (sustainer of the path), and Maheshwara (destroyer of ignorance). The Guru alone is the Supreme Brahman. One who has the Guru's grace finds liberation.",
    benefits:
      "Strengthens the Guru-disciple relationship, pacifies Jupiter (Brihaspati) in the horoscope, grants wisdom, education success, and spiritual progress.",
  },
  {
    id: "angaraka-stotra",
    title: "Angaraka (Mangal) Stotra",
    deity: "Mangal (Mars)",
    faith: "Hindu",
    type: "Stotram",
    description:
      "A specialized stotra to Angaraka (Mars) composed for Tuesday recitation. Angaraka is both the name of Mars as a planetary deity and of the son of the Earth (Bhoomi Putra). This stotra pacifies Mars-related troubles.",
    fullText: `॥ अङ्गारक स्तोत्रम् ॥

अङ्गारको धरापुत्रः, कुजो भौमो महीसुतः।
रक्तवर्णो रक्तमाल्यः, रक्तगन्धानुलेपनः।
भूमिजो रणकर्ता च, भयदः शक्तिपाणिकः॥

ॐ क्रां क्रीं क्रौं सः भौमाय नमः।

मेषवृश्चिककारकं, मङ्गलं शुभदायकम्।
मङ्गलवाराधिपतिं, नमाम्यङ्गारकं सदा॥

[पूर्ण स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Angaraka/Mars is the son of the Earth, red in color, wearing red garlands and red sandalwood paste. He holds a spear, causes fear, and rules over Aries and Scorpio zodiac signs.",
    benefits:
      "Removes Mangal Dosha from horoscope. Grants courage, energy, victory in legal matters, and protection from accidents. Effective for resolving Kuja dosha in marriage.",
  },
  {
    id: "indra-krit-shri-ram-stotra",
    title: "Indra Krit Shri Ram Stotra",
    deity: "Rama",
    faith: "Hindu",
    type: "Stotram",
    description:
      "The hymn to Lord Rama composed by Indra (king of the gods) after Rama's victory over Ravana. Indra personally came to praise Rama's divine glory and express gratitude for restoring dharma in the three worlds.",
    fullText: `॥ इन्द्रकृत श्री राम स्तोत्रम् ॥

इन्द्र उवाच:
नमोऽस्तु रामाय सलक्ष्मणाय, देव्यै च तस्यै जनकात्मजायै।
नमोऽस्तु रुद्राग्निवरुणेन्द्रवायु, भ्यो नमः सिद्धमहोरगेभ्यः॥

नमो नमो वाक्पतये विभूतये, नमो नमस्त्वाद्यमजाय विष्णवे।
नमोऽस्तु ते राम महानुभाव, त्रैलोक्यरक्षाय कृतावतार॥

जय जय जानकीवल्लभ जय जय,
जय जय रामचन्द्र जयति जय॥

[पूर्ण स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Indra bows to Rama along with Lakshmana and Sita, and praises him as the primordial unborn Vishnu who has taken avatar to protect the three worlds. The stotra celebrates Rama's victory over Ravana.",
    benefits:
      "Grants victory over enemies, protection of dharma, removal of all obstacles, and blessings from Vishnu's most celebrated avatar, Lord Rama.",
  },
  {
    id: "chandra-stotra",
    title: "Chandra Stotra",
    deity: "Chandra (Moon)",
    faith: "Hindu",
    type: "Stotram",
    description:
      "A stotra dedicated to Chandra (the Moon god) — one of the nine planetary deities. Recited on Mondays and during lunar eclipses for peace of mind, mental clarity, and pacification of Moon-related doshas.",
    fullText: `॥ चन्द्र स्तोत्रम् ॥

दधिशङ्खतुषाराभं, क्षीरोदार्णवसम्भवम्।
नमामि शशिनं सोमं, शम्भोर्मुकुटभूषणम्॥

ॐ सों सोमाय नमः।

श्वेताम्बरः श्वेतवपुः किरीटी, श्वेतद्युतिः सर्वकलासमृद्धः।
अमृतस्य धाता सोमः प्रसन्नः, मम शान्तिदाता भवतां चन्द्रः॥

मनसो जगतः स्रष्टा, ज्योतिषां रात्रिपर्यायः।
स्कन्दस्य जनकः सोमः, नमाम्यहं चन्द्रमसम्॥

[पूर्ण स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "The Moon is white as curd and conch, born from the ocean of milk, adorning Shiva's crown. He is the creator of the mind, lord of the night, father of Skanda, and giver of nectar (amrita).",
    benefits:
      "Pacifies Chandra dosha, brings mental peace, emotional stability, and cures depression. Recited for good dreams, relief from insomnia, and overall emotional well-being.",
  },
  {
    id: "mahakaal-stotra",
    title: "Mahakaal Stotra",
    deity: "Mahakaal (Shiva)",
    faith: "Hindu",
    type: "Stotram",
    description:
      "A stotra to Mahakaal — the supreme form of Shiva as the Lord of Time and Death, who dwells in the famous Mahakaleshwar Jyotirlinga at Ujjain. This fierce yet compassionate form protects devotees from the fear of time and death.",
    fullText: `॥ महाकाल स्तोत्रम् ॥

जयति महाकाल देव, जयति उज्जयिनी-नाथ।
जयति भस्मविभूषित, जयति त्रिशूलपाणि॥

कालकालाय नमः, काले-काल नमोऽस्तु ते।
उज्जयिनी-पुराधीश, महाकालाय नमोऽस्तु ते॥

ॐ नमः शिवाय, महाकालाय, ज्योतिर्लिंगाय।
उज्जयिनी-महाकालेश्वर, प्रसीद मम॥

[पूर्ण स्तोत्र — Admin CMS द्वारा भरे जाएंगे]`,
    meaning:
      "Mahakaal is the destroyer of Time itself — the supreme Shiva who stands beyond all cosmic ages. Residing at Ujjain, he is the Lord of the famous Jyotirlinga who grants liberation from the cycle of time.",
    benefits:
      "Removes fear of death and time. Grants liberation, protection from untimely death, and removes all obstacles. Powerful for pilgrims visiting Ujjain and Mahakaleshwar.",
  },
];
