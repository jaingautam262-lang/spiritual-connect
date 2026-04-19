export interface Stotra {
  id: string;
  title: string;
  deity: string;
  faith: string;
  type: string;
  description?: string;
  fullText: string;
  meaning?: string;
  benefits?: string;
  language?: string;
}

export const stotraData: Stotra[] = [
  {
    id: "navagraha-stotram",
    title: "Navagraha Stotram",
    deity: "Navagraha",
    faith: "Hindu",
    type: "Stotram",
    description:
      "Ancient hymn composed by Sage Vyasa praising all nine planetary deities. Reciting this stotra removes obstacles, destroys bad dreams, and bestows prosperity and good health.",
    fullText: `॥ नवग्रह स्तोत्रम् ॥
जपाकुसुम संकाशं काश्यपेयं महद्युतिम्।
तमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥१॥

दधिशङ्खतुषाराभं क्षीरोदार्णवसंभवम्।
नमामि शशिनं सोमं शम्भोर्मुकुटभूषणम्॥२॥

धरणीगर्भसम्भूतं विद्युत्कान्तिसमप्रभम्।
कुमारं शक्तिहस्तं तं मङ्गलं प्रणम्याम्यहम्॥३॥

प्रियंगुकलिकाश्यामं रूपेणाप्रतिमं बुधम्।
सौम्यं सौम्यगुणोपेतं तं बुधं प्रणमाम्यहम्॥४॥

देवानां च ऋषीणां च गुरुं काञ्चनसन्निभम्।
बुद्धिभूतं त्रिलोकेशं तं नमामि बृहस्पतिम्॥५॥

हिमकुन्दमृणालाभं दैत्यानां परमं गुरुम्।
सर्वशास्त्रप्रवक्तारं भार्गवं प्रणमाम्यहम्॥६॥

नीलाञ्जनसमाभासं रविपुत्रं यमाग्रजम्।
छायामार्तण्डसम्भूतं तं नमामि शनैश्चरम्॥७॥

अर्धकायं महावीर्यं चन्द्रादित्यविमर्दनम्।
सिंहिकागर्भसम्भूतं तं राहुं प्रणमाम्यहम्॥८॥

पलाशपुष्पसंकाशं तारकाग्रहमस्तकम्।
रौद्रं रौद्रात्मकं घोरं तं केतुं प्रणमाम्यहम्॥९॥

इति व्यासमुखोद्गीतं यः पठेत् सुसमाहितः।
दिवा वा यदि वा रात्रौ विघ्नशान्तिर्भविष्यति॥
नरनारीनृपाणां च भवेद् दुःस्वप्ननाशनम्।
ऐश्वर्यमतुलं तेषामारोग्यं पुष्टिवर्धनम्॥`,
    meaning:
      "This stotra praises each of the nine planets — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu — with a verse each, describing their appearance and divine qualities.",
    benefits:
      "Removes planetary obstacles, destroys nightmares, bestows unparalleled wealth and good health. Regular recitation pacifies all nine planetary doshas.",
  },
  {
    id: "shiva-ashtakam",
    title: "Shiva Ashtakam",
    deity: "Shiva",
    faith: "Hindu",
    type: "Ashtakam",
    description:
      "Eight-verse hymn in praise of Lord Shiva composed by Adi Shankaracharya. Each verse describes a different aspect of Shiva's divine glory.",
    fullText: `॥ शिव अष्टकम् ॥
प्रभुं प्राणनाथं विभुं विश्वनाथं जगन्नाथनाथं सदानन्दभाजम्।
भवद्भव्यभूतेश्वरं भूतनाथं शिवं शङ्करं शम्भुमीशानमीडे॥१॥

गले रुण्डमालं तनौ सर्पजालं महाकालकालं गणेशादिपालम्।
जटाजूटगङ्गोत्तरंगैर्विशालं शिवं शङ्करं शम्भुमीशानमीडे॥२॥

मुदामाकरं मण्डनं मण्डयन्तं महामण्डलं भस्मभूषाधरं तम्।
अनादिह्यपारं महामोहमारं शिवं शङ्करं शम्भुमीशानमीडे॥३॥

वटाधोनिवासं महाट्टाट्टहासं महापापनाशं सदा सुप्रकाशम्।
गिरीशं गणेशं सुरेशं महेशं शिवं शङ्करं शम्भुमीशानमीडे॥४॥

गिरीन्द्रात्मजासंगृहीतार्धदेहं गिरौ संस्थितं सर्वदापन्नगेहम्।
परब्रह्मब्रह्माधिपं मुक्तिदेहं शिवं शङ्करं शम्भुमीशानमीडे॥५॥

कपालं त्रिशूलं कराभ्यां दधानं पदाम्भोजनम्राय कामं ददानम्।
बलीवर्दयानं सुराणां प्रधानं शिवं शङ्करं शम्भुमीशानमीडे॥६॥

शरच्चन्द्रगात्रं गुणानन्दपात्रं त्रिनेत्रं पवित्रं धनेशस्य मित्रम्।
अपर्णाकलत्रं सदा सच्चरित्रं शिवं शङ्करं शम्भुमीशानमीडे॥७॥

हरं सर्पहारं चिताभस्मसारं भवं भव्यभूतं भवानीश्वरं तम्।
भवाब्धावजं भावनाभव्यरूपं शिवं शङ्करं शम्भुमीशानमीडे॥८॥

इदमाष्टकं श्री शिवस्याभिरामं पठेद्यः प्रभाते नरः शुद्धचित्तः।
स सर्वात्मना योगसिद्धिं प्रयाति स पूजार्हभाजां वरं वेद तत्त्वम्॥`,
    meaning:
      "Each of the 8 verses praises Shiva with divine epithets — Lord of life, the cosmos-illuminating one, destroyer of great sins, who dwells under the banyan tree, half of whose form is Parvati.",
    benefits:
      "One who recites these 8 verses daily with a pure mind attains Yoga-siddhi, spiritual perfection, and liberation from the cycle of birth and death.",
  },
  {
    id: "ram-raksha-stotra",
    title: "Ram Raksha Stotra",
    deity: "Ram",
    faith: "Hindu",
    type: "Stotra",
    description:
      "Ram Raksha Stotra is a powerful protection hymn in praise of Lord Rama, composed by Sage Budhakaushika. It provides divine protection to the devotee from all forms of evil.",
    fullText: `॥ श्री राम रक्षा स्तोत्रम् ॥
अस्य श्रीरामरक्षास्तोत्रमन्त्रस्य।
बुधकौशिक ऋषिः। श्री सीतारामचन्द्रो देवता।
अनुष्टुप् छन्दः। सीता शक्तिः।
श्रीमानहनुमान् कीलकम्।
श्री सीतारामचन्द्रप्रीत्यर्थे जपे विनियोगः॥

ध्यानम्
ध्यायेदाजानुबाहुं धृतशरधनुषं बद्धपद्मासनस्थं
पीतं वासो वसानं नवकमलदलस्पर्धिनेत्रं प्रसन्नम्।
वामाङ्कारूढसीतामुखकमलमिलल्लोचनं नीरदाभं
नानालङ्कारदीप्तं दधतमुरुजटामण्डलं रामचन्द्रम्॥

चरितं रघुनाथस्य शतकोटिप्रविस्तरम्।
एकैकमक्षरं पुंसां महापातकनाशनम्॥१॥

ध्यात्वा नीलोत्पलश्यामं रामं राजीवलोचनम्।
जानकीलक्ष्मणोपेतं जटामुकुटमण्डितम्॥२॥

सासितूणधनुर्बाणपाणिं नक्तञ्चरान्तकम्।
स्वलीलया जगत्त्रातुमाविर्भूतमजं विभुम्॥३॥

रामरक्षां पठेत्प्राज्ञः पापघ्नीं सर्वकामदाम्।
शिरो मे राघवः पातु भालं दशरथात्मजः॥४॥

कौसल्येयो दृशौ पातु विश्वामित्रप्रियः श्रुती।
घ्राणं पातु मखत्राता मुखं सौमित्रिवत्सलः॥५॥

जिह्वां विद्यानिधिः पातु कण्ठं भरतवन्दितः।
स्कन्धौ दिव्यायुधः पातु भुजौ भग्नेशकार्मुकः॥६॥

करौ सीतापतिः पातु हृदयं जामदग्न्यजित्।
मध्यं पातु खरध्वंसी नाभिं जाम्बवदाश्रयः॥७॥

सुग्रीवेशः कटी पातु सक्थिनी हनुमत्प्रभुः।
ऊरू रघूत्तमः पातु रक्षःकुलविनाशकृत्॥८॥

जानुनी सेतुकृत्पातु जङ्घे दशमुखान्तकः।
पादौ बिभीषणश्रेष्ठः पातु रामोऽखिलं वपुः॥९॥

एतां रामबलोपेतां रक्षां यः सुकृती पठेत्।
स चिरायुः सुखी पुत्री विजयी विनयी भवेत्॥१०॥

पातालभूतलव्योम चारिणश्छद्मचारिणः।
न द्रष्टुमपि शक्तास्ते रक्षितं रामनामभिः॥११॥

रामेति रामभद्रेति रामचन्द्रेति वा स्मरन्।
नरो न लिप्यते पापैर्भुक्तिं मुक्तिं च विन्दति॥१२॥

जगज्जेत्रैकमन्त्रेण रामनाम्नाभिरक्षितम्।
यः कण्ठे धारयेत्तस्य करस्थाः सर्वसिद्धयः॥१३॥

वज्रपञ्जरनामेदं यो रामकवचं स्मरेत्।
अव्याहताज्ञः सर्वत्र लभते जयमङ्गलम्॥१४॥

आदिष्टवान्यथा स्वप्ने रामरक्षामिमां हरः।
तथा लिखितवान् प्रातः प्रबुद्धो बुधकौशिकः॥१५॥

आरामः कल्पवृक्षाणां विरामः सकलापदाम्।
अभिरामस्त्रिलोकानां रामः श्रीमानसः स नः॥१६॥

तरुणौ रूपसम्पन्नौ सुकुमारौ महाबलौ।
पुण्डरीकविशालाक्षौ चीरकृष्णाजिनाम्बरौ॥१७॥

फलमूलाशिनौ दान्तौ तापसौ ब्रह्मचारिणौ।
पुत्रौ दशरथस्यैतौ भ्रातरौ रामलक्ष्मणौ॥१८॥

शरण्यौ सर्वसत्त्वानां श्रेष्ठौ सर्वधनुष्मताम्।
रक्षःकुलनिहन्तारौ त्रायेतां नो रघूत्तमौ॥१९॥

आत्तसज्जधनुषाविषुस्पृशावक्षयाशुगनिषङ्गसङ्गिनौ।
रक्षणाय मम रामलक्ष्मणावग्रतः पथि सदैव गच्छताम्॥२०॥

सन्नद्धः कवची खड्गी चापबाणधरो युवा।
गच्छन् मनोरथान्नश्येद् दृष्ट्वा रामः सरावणः॥२१॥

रामाय रामभद्राय रामचन्द्राय वेधसे।
रघुनाथाय नाथाय सीतायाः पतये नमः॥२२॥

श्री राम राम रघुनन्दन राम राम
श्री राम राम भरताग्रज राम राम।
श्री राम राम रणकर्कश राम राम
श्री राम राम शरणं भव राम राम॥२३॥

श्री रामचन्द्रचरणौ मनसा स्मरामि
श्री रामचन्द्रचरणौ वचसा गृणामि।
श्री रामचन्द्रचरणौ शिरसा नमामि
श्री रामचन्द्रचरणौ शरणं प्रपद्ये॥२४॥

माता रामो मत्पिता रामचन्द्रः
स्वामी रामो मत्सखा रामचन्द्रः।
सर्वस्वं मे रामचन्द्रो दयालु
र्नान्यं जाने नैव जाने न जाने॥२५॥

दक्षिणे लक्ष्मणो यस्य वामे तु जनकात्मजा।
पुरतो मारुतिर्यस्य तं वन्दे रघुनन्दनम्॥२६॥

लोकाभिरामं रणरङ्गधीरं राजीवनेत्रं रघुवंशनाथम्।
कारुण्यरूपं करुणाकरं तं श्रीरामचन्द्रं शरणं प्रपद्ये॥२७॥

मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।
वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥२८॥

कूजन्तं राम रामेति मधुरं मधुराक्षरम्।
आरुह्य कविताशाखां वन्दे वाल्मीकिकोकिलम्॥२९॥

आपदामपहर्तारं दातारं सर्वसम्पदाम्।
लोकाभिरामं श्री रामं भूयो भूयो नमाम्यहम्॥३०॥

भर्जनं भवबीजानामर्जनं सुखसम्पदाम्।
तर्जनं यमदूतानां राम रामेति गर्जनम्॥३१॥

रामो राजमणिः सदा विजयते रामं रमेशं भजे
रामेणाभिहता निशाचरचमू रामाय तस्मै नमः।
रामान्नास्ति परायणं परतरं रामस्य दासोऽस्म्यहं
रामे चित्तलयः सदा भवतु मे भो राम मामुद्धर॥३२॥`,
    meaning:
      "Ram Raksha Stotra is a complete kavach (armor) of protection. Each verse asks a different form of Lord Rama to protect a specific part of the body, from head to foot.",
    benefits:
      "Provides complete divine protection from all evil forces, negative energies, and dangers. Regular recitation brings long life, happiness, victory, and liberation.",
  },
  {
    id: "mahalakshmi-ashtakam",
    title: "Mahalakshmi Ashtakam",
    deity: "Lakshmi",
    faith: "Hindu",
    type: "Ashtakam",
    description:
      "Eight-verse hymn in praise of Goddess Mahalakshmi, composed by Indra. This stotra is recited for prosperity, wealth, and divine blessings.",
    fullText: `॥ महालक्ष्मी अष्टकम् ॥
नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते।
शङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥१॥

नमस्ते गरुडारूढे कोलासुरभयङ्करि।
सर्वपापहरे देवि महालक्ष्मि नमोऽस्तु ते॥२॥

सर्वज्ञे सर्ववरदे सर्वदुष्टभयङ्करि।
सर्वदुःखहरे देवि महालक्ष्मि नमोऽस्तु ते॥३॥

सिद्धिबुद्धिप्रदे देवि भुक्तिमुक्तिप्रदायिनि।
मन्त्रमूर्ते सदा देवि महालक्ष्मि नमोऽस्तु ते॥४॥

आद्यन्तरहिते देवि आद्यशक्तिमहेश्वरि।
योगजे योगसम्भूते महालक्ष्मि नमोऽस्तु ते॥५॥

स्थूलसूक्ष्ममहारौद्रे महाशक्तिमहोदरे।
महापापहरे देवि महालक्ष्मि नमोऽस्तु ते॥६॥

पद्मासनस्थिते देवि परब्रह्मस्वरूपिणि।
परमेशि जगन्माते महालक्ष्मि नमोऽस्तु ते॥७॥

श्वेताम्बरधरे देवि नानालङ्कारभूषिते।
जगत्स्थिते जगन्माते महालक्ष्मि नमोऽस्तु ते॥८॥

महालक्ष्म्यष्टकं स्तोत्रं यः पठेद्भक्तिमान्नरः।
सर्वसिद्धिमवाप्नोति राज्यं प्राप्नोति सर्वदा॥
एककाले पठेन्नित्यं महापापविनाशनम्।
द्विकालं यः पठेन्नित्यं धनधान्यसमन्वितः॥
त्रिकालं यः पठेन्नित्यं महाशत्रुविनाशनम्।
महालक्ष्मीर्भवेन्नित्यं प्रसन्ना वरदा शुभा॥`,
    meaning:
      "The eight verses describe Mahalakshmi as seated on Garuda, holding conch-wheel-mace, destroyer of Kola demon, the all-knowing giver of liberation, the primal Shakti seated on a lotus throne.",
    benefits:
      "Reciting once daily destroys great sins. Twice daily brings wealth and grain. Three times daily destroys great enemies. Mahalakshmi herself becomes pleased and grants blessings.",
  },
  {
    id: "rudra-ashtakam",
    title: "Rudra Ashtakam",
    deity: "Shiva",
    faith: "Hindu",
    type: "Ashtakam",
    description:
      "Eight-verse hymn composed by Goswami Tulsidas in praise of Lord Rudra (Shiva). From the Ramcharitmanas, this stotra describes Shiva as the supreme protector and destroyer of evils.",
    fullText: `॥ रुद्राष्टकम् ॥
(तुलसीदास कृत)

नमामीशमीशान निर्वाणरूपं विभुं व्यापकं ब्रह्मवेदस्वरूपम्।
निजं निर्गुणं निर्विकल्पं निरीहं चिदाकाशमाकाशवासं भजेऽहम्॥१॥

निराकारमोंकारमूलं तुरीयं गिराज्ञानगोतीतमीशं गिरीशम्।
करालं महाकालकालं कृपालुं गुणागारसंसारसारं नतोऽहम्॥२॥

तुषाराद्रिसंकाशगौरं गभीरं मनोभूतकोटिप्रभाश्री शरीरम्।
स्फुरन्मौलिकल्लोलिनी चारुगंगा लसद्भालबालेन्दु कण्ठे भुजंगा॥३॥

चलत्कुण्डलं भ्रूसुनेत्रं विशालं प्रसन्नाननं नीलकण्ठं दयालम्।
मृगाधीशचर्माम्बरं मुण्डमालं प्रियं शंकरं सर्वनाथं भजामि॥४॥

प्रचण्डं प्रकृष्टं प्रगल्भं परेशं अखण्डं अजं भानुकोटिप्रकाशम्।
त्रयः शूलनिर्मूलनं शूलपाणिं भजेऽहं भवानीपतिं भावगम्यम्॥५॥

कलातीतकल्याण कल्पान्तकारी सदा सज्जनानंददाता पुरारी।
चिदानंदसंदोह मोहापहारी प्रसीद प्रसीद प्रभो मन्मथारी॥६॥

न यावद् उमानाथपादारविन्दं भजंतीह लोके परे वा नराणाम्।
न तावत्सुखं शान्ति सन्तापनाशं प्रसीद प्रभो सर्वभूताधिवासम्॥७॥

न जानामि योगं जपं नैव पूजां नतोऽहं सदा सर्वदा शम्भुतुभ्यम्।
जरा जन्म दुःखौघ तातप्यमानं प्रभो पाहि आपन्नमामीश शम्भो॥८॥

रुद्राष्टकमिदं प्रोक्तं विप्रेण हरतोषये।
ये पठन्ति नरा भक्त्या तेषां शम्भुः प्रसीदति॥`,
    meaning:
      "Tulsidas glorifies Rudra as the formless absolute (brahman), the root of Om, beyond speech and mind, snow-white like Himalaya, adorned with Ganga, crescent moon and serpents, the destroyer of three types of suffering.",
    benefits:
      "Those who recite Rudrashtakam with devotion receive the grace of Lord Shambhu. Destroys fears, sorrows, poverty, and all afflictions. Grants liberation.",
  },
  // ====== PART 5 — BATCH 2 ======
  {
    id: "durga-saptashloki",
    title: "Durga Saptashloki",
    deity: "Durga",
    faith: "Hindu",
    type: "Stotra",
    description:
      "Seven essential shlokas from Devi Mahatmyam (Durga Saptashati), composed by Sage Markandeya. These seven verses are the essence of the entire Saptashati and are considered extremely powerful for protection and blessings.",
    fullText: `॥ दुर्गा सप्तश्लोकी ॥

ॐ ज्ञानिनामपि चेतांसि देवी भगवती हि सा।
बलादाकृष्य मोहाय महामाया प्रयच्छति॥१॥

दुर्गे स्मृता हरसि भीतिमशेषजन्तोः
स्वस्थैः स्मृता मतिमतीव शुभां ददासि।
दारिद्र्यदुःखभयहारिणि का त्वदन्या
सर्वोपकारकरणाय सदार्द्रचित्ता॥२॥

सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।
शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥३॥

शरणागतदीनार्तपरित्राणपरायणे।
सर्वस्यार्तिहरे देवि नारायणि नमोऽस्तु ते॥४॥

सर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते।
भयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते॥५॥

रोगानशेषानपहंसि तुष्टा रुष्टा तु कामान् सकलानभीष्टान्।
त्वामाश्रितानां न विपन्नराणां त्वामाश्रिता ह्याश्रयतां प्रयान्ति॥६॥

सर्वाबाधाप्रशमनं त्रैलोक्यस्याखिलेश्वरि।
एवमेव त्वया कार्यमस्मद्वैरिविनाशनम्॥७॥`,
    meaning:
      "These seven verses from Devi Mahatmyam describe Durga as the supreme Mahamaya who controls even the minds of the wise, the remover of all fears and poverty, the all-auspicious Narayani, protector of the surrendered, and destroyer of all obstacles.",
    benefits:
      "Reciting these 7 shlokas is equivalent to reading the entire Durga Saptashati (700 verses). Provides divine protection, removes diseases, destroys enemies, and grants all auspicious blessings.",
  },
  {
    id: "kaal-bhairav-ashtak",
    title: "Kaal Bhairav Ashtak",
    deity: "Kaal Bhairav",
    faith: "Hindu",
    type: "Ashtakam",
    description:
      "Eight-verse hymn in praise of Kaal Bhairav, the fierce form of Lord Shiva who is the Lord of Time and the guardian of Kashi (Varanasi). Composed by Adi Shankaracharya.",
    fullText: `॥ काल भैरव अष्टकम् ॥
देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं
व्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्।
नारदादियोगिवृन्दवन्दितं दिगम्बरं
काशिकापुराधिनाथकालभैरवं भजे॥१॥

भानुकोटिभास्वरं भवाब्धितारकं परं
नीलकण्ठमीप्सितार्थदायकं त्रिलोचनम्।
कालकालमम्बुजाक्षमक्षशूलमक्षरं
काशिकापुराधिनाथकालभैरवं भजे॥२॥

शूलटङ्कपाशदण्डपाणिमादिकारणं
श्यामकायमादिदेवमक्षरं निरामयम्।
भीमविक्रमं प्रभुं विचित्रताण्डवप्रियं
काशिकापुराधिनाथकालभैरवं भजे॥३॥

भुक्तिमुक्तिदायिनं विशालनेत्रमावना।
त्रिभुवनस्य पालनं क्षमावता परं गुरुं
भक्तवत्सलं स्थिरं समस्तलोकविग्रहं
काशिकापुराधिनाथकालभैरवं भजे॥४॥

दर्शनात् भवाब्धिपारदर्शनं सुरेश्वरं
कर्मनाशनं प्रभुं कलादिपुण्यवर्धनं।
योगिनां च योगसिद्धिदायकं स्वभावतः
काशिकापुराधिनाथकालभैरवं भजे॥५॥

राजराजसेवनीयमक्षराधिपं सुरं
नित्यमद्वितीयमिष्टदैवतं निरञ्जनम्।
मृत्युदर्पनाशनं करालदंष्ट्रमोक्षदं
काशिकापुराधिनाथकालभैरवं भजे॥६॥

अट्टहासभिन्नपद्मजाण्डकोशसंस्थितं
दृष्टिपातनष्टपापजालमुग्रशासनम्।
अष्टसिद्धिदायकं कपालमालिकाधरं
काशिकापुराधिनाथकालभैरवं भजे॥७॥

भूतसङ्घनायकं विशालकीर्तिदायकं
काशिवासलोकपुण्यपापशोधकं विभुम्।
नीतिमार्गकोविदं पुरातनं जगत्पतिं
काशिकापुराधिनाथकालभैरवं भजे॥८॥

कालभैरवाष्टकं पठन्ति येऽत्र मानवाः
विभक्तकामसम्पदः सुभक्तिसिद्धिसाधकाः।
ते निरन्तरं सुखी भवन्ति मुक्तभागिनो
ज्ञाननिष्ठसर्वलोकभावनस्य पाश्वतः॥`,
    meaning:
      "Shankaracharya glorifies Kaal Bhairav as the Lord of Kashi, worshipped by Indra himself, whose lotus feet purify all; who shines like crores of suns, who conquers even Kaal (death), who dissolves the universe at the end of time.",
    benefits:
      "Those who recite Kaal Bhairav Ashtakam are freed from the bondage of karma, attain devotion and liberation, and live in continuous happiness. Destroys all sins merely by sight.",
  },
  {
    id: "dwadash-jyotirlinga-stotram",
    title: "Dwadash Jyotirlinga Stotram",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotram",
    description:
      "This stotra names and glorifies all twelve Jyotirlinga shrines of Lord Shiva — the most sacred abodes of the divine light of Shiva. Reciting this stotra is equivalent to visiting all 12 Jyotirlinga pilgrimage sites.",
    fullText: `॥ द्वादश ज्योतिर्लिंग स्तोत्रम् ॥

सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम्।
उज्जयिन्यां महाकालमोंकारममलेश्वरम्॥१॥

परल्यां वैजनाथं च डाकिन्यां भीमशंकरम्।
सेतुबन्धे तु रामेशं नागेशं दारुकावने॥२॥

वाराणस्यां तु विश्वेशं त्र्यम्बकं गौतमीतटे।
हिमालये तु केदारं घुश्मेशं च शिवालये॥३॥

एतानि ज्योतिर्लिङ्गानि सायं प्रातः पठेन्नरः।
सप्तजन्मकृतं पापं स्मरणेन विनश्यति॥४॥

एतेशां दर्शनादेव पातकं नाशमेष्यति।
पुनर्जन्म न चैवास्ति पुनर्जन्म न चैवास्ति॥५॥`,
    meaning:
      "The stotra names the 12 sacred Jyotirlingas: Somnath (Saurashtra), Mallikarjuna (Srishaila), Mahakaal (Ujjain), Omkareshwar, Vaidyanath (Parali), Bhimashankar (Dakini), Rameswaram, Nageshwar (Darukavan), Vishweshwar (Varanasi), Trimbak (Godavari), Kedarnath (Himalaya), and Grishneshwar (Shivalaya).",
    benefits:
      "Reciting this morning and evening destroys sins of seven lifetimes. Seeing or remembering these shrines destroys all sins and ends the cycle of rebirth.",
  },
  {
    id: "sankat-nashak-ganesh-stotra",
    title: "Sankat Nashak Ganesh Stotra",
    deity: "Ganesh",
    faith: "Hindu",
    type: "Stotra",
    description:
      "This powerful stotra is dedicated to Lord Ganesha as the destroyer of all obstacles and distress (Sankat = distress, Nashak = destroyer). Reciting it removes all difficulties and sorrows from life.",
    fullText: `॥ संकट नाशक गणेश स्तोत्र ॥

नारद उवाच:
प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम्।
भक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये॥१॥

प्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम्।
तृतीयं कृष्णपिङ्गाक्षं गजवक्त्रं चतुर्थकम्॥२॥

लम्बोदरं पञ्चमं च षष्ठं विकटमेव च।
सप्तमं विघ्नराजेन्द्रं धूम्रवर्णं तथाष्टमम्॥३॥

नवमं भालचन्द्रं च दशमं तु विनायकम्।
एकादशं गणपतिं द्वादशं तु गजाननम्॥४॥

द्वादशैतानि नामानि त्रिसन्ध्यं यः पठेन्नरः।
न च विघ्नभयं तस्य सर्वसिद्धिर्भवेत् तदा॥५॥

विद्यार्थी लभते विद्यां धनार्थी लभते धनम्।
पुत्रार्थी लभते पुत्रान् मोक्षार्थी लभते गतिम्॥६॥

जपेद्गणपतिस्तोत्रं षड्भिर्मासैः फलं लभेत्।
संवत्सरेण सिद्धिं च लभते नात्र संशयः॥७॥

अष्टभ्यो ब्राह्मणेभ्यश्च लिखित्वा यः समर्पयेत्।
तस्य विद्या भवेत् सर्वा गणेशस्य प्रसादतः॥८॥`,
    meaning:
      "Narada recites the twelve names of Ganesha: Vakratunda, Ekadanta, Krishnapingaksha, Gajavaktra, Lambodara, Vikata, Vighnarajendra, Dhumravarna, Bhalchandra, Vinayaka, Ganapati, Gajanana — each a different divine form.",
    benefits:
      "Reciting these 12 names thrice daily removes all obstacles. Students get education, the poor get wealth, the childless get children, seekers get liberation. Six months of recitation grants fruit; one year brings Siddhi.",
  },
  {
    id: "laxmi-narayan-stotra",
    title: "Laxmi Narayan Stotra",
    deity: "Vishnu",
    faith: "Hindu",
    type: "Stotra",
    description:
      "A devotional hymn praising the divine couple Lakshmi and Narayana together. This stotra invokes both the goddess of wealth (Lakshmi) and the lord of preservation (Vishnu/Narayana) for prosperity, protection, and liberation.",
    fullText: `॥ लक्ष्मी नारायण स्तोत्र ॥

नमः कमलनाभाय नमस्ते जलशायिने।
नमस्ते केशवानन्त वासुदेव नमोऽस्तु ते॥१॥

त्वमेव माता च पिता त्वमेव त्वमेव बन्धुश्च सखा त्वमेव।
त्वमेव विद्या द्रविणं त्वमेव त्वमेव सर्वं मम देवदेव॥२॥

शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम्
विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्।
लक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं
वन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्॥३॥

क्षीरसागरसम्भूते लक्ष्मि देवि नमोऽस्तु ते।
पद्मपत्रविशालाक्षि विष्णुवक्षस्थले स्थिते॥४॥

यस्याः कटाक्षसमुपासनाविधिं सेवन्ते सर्वसुरपुङ्गवाः।
सा माश्रयेत् करुणया भगवती भार्गवी भवतु मे वरदा॥५॥

श्रियः कान्तं श्रीमतां वन्दनीयं श्रियमात्राप्यनुगतं नमामि।
श्रियो देवीं श्री नारायणं तं नमामि देवं परमेश्वरं तम्॥६॥

सर्वमङ्गलमाङ्गल्ये विष्णुवक्षस्थलस्थिते।
सर्वदुःखप्रशमनी महालक्ष्मि नमोऽस्तु ते॥७॥

लक्ष्मीनारायणाभ्यां च नमः श्रीपतये नमः।
सर्वपापहराभ्यां च नमस्त्रैलोक्यपालने॥८॥`,
    meaning:
      "The stotra praises Narayana as the lotus-naveled one resting on the cosmic serpent, the father-mother of all creation; and Lakshmi as born from the ocean of milk, residing on Vishnu's chest, the giver of all auspiciousness.",
    benefits:
      "Grants wealth, prosperity, liberation from poverty, removal of all sins, and the combined grace of both Lakshmi and Narayana. Ensures protection across all three worlds.",
  },
  {
    id: "pitru-stotra",
    title: "Pitru Stotra",
    deity: "Pitru (Ancestors)",
    faith: "Hindu",
    type: "Stotra",
    description:
      "A sacred stotra recited to honor and appease the ancestral souls (Pitrus). Reciting this stotra during Pitru Paksha, Shraddha ceremonies, or any auspicious occasion ensures the peace and liberation of departed ancestors.",
    fullText: `॥ पितृ स्तोत्र ॥

अर्चितानाममूर्तानां पितृणां दीप्ततेजसाम्।
नमस्याम्यहमेकाग्रो नित्यमेव सदा च तान्॥१॥

अभ्यतीतांस्तु ये पूर्वे तांश्च योऽभ्येत्य यास्यति।
तेषां नमस्करोम्यग्रे पश्चाच्च मुनिपुङ्गवाः॥२॥

नमो वः पितरः सोम्या नमो वः पितर उग्राः।
नमो वः पितरः सूर्याः नमो वः पितर एकेभ्यः॥३॥

नमो वः पितरः प्राच्यो नमो वः पितर उदीच्याः।
नमो वः पितरः प्रतीच्यो नमो वः पितर दक्षिणाः॥४॥

ये वो देवाः ये च पितरः परेषां श्रेयसि स्थिताः।
तेभ्यो नमस्करोम्यग्रे तान् विप्रान् श्रद्धया नमे॥५॥

आयान्तु पितरः सर्वे देवाश्च भुवि संस्थिताः।
इमं श्राद्धं मया दत्तमन्नं तृप्ताः पिबन्तु ते॥६॥

पितृभ्यः स्वधा नमः पितामहेभ्यः स्वधा नमः।
प्रपितामहेभ्यः स्वधा नमः अक्षय्यं स्वधास्तु वः॥७॥

पितृन् अर्चयत उद्दिश्य यः स्वधावान् कृतकृत्यवान्।
मोदमानानां पितृणां प्रीतस्ते प्रीतिमावहेत्॥८॥

देवाश्च पितरः सर्वे यान् पश्याम्यहमन्तरा।
तेभ्यः श्रद्धाप्रयुक्ताय सर्वस्मै वः प्रतिष्ठितम्॥९॥

ये केचित् पितरः सन्ति अस्माकं कुलगोत्रजाः।
ते गृह्णन्तु मया दत्तमेतत् श्राद्धमनन्तरम्॥१०॥`,
    meaning:
      "The Pitru Stotra offers salutations to all ancestral souls — those who are peaceful (Somya) or fierce (Ugra), those in the sun, those in the east-west-north-south directions. It invites them to accept the Shraddha offering and be satisfied.",
    benefits:
      "Reciting this during Pitru Paksha or Shraddha ceremonies ensures complete peace (Shanti) for departed ancestors, frees them from any lingering attachments, and blesses the family with prosperity and freedom from ancestral curses.",
  },
];

export const stotraTypes = [
  "All",
  "Stotram",
  "Ashtakam",
  "Stotra",
  "Kavach",
  "Stuti",
  "Sahasranama",
  "Sahasranam",
];
