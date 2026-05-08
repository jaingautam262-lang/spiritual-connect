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
  // ====== BATCH 2 (Parts 5-6) ======
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
  // ====== BATCH 3 (Part 6) ======
  {
    id: "surya-raksha-ashtakam",
    title: "Surya Raksha Ashtakam",
    deity: "Surya",
    faith: "Hindu",
    type: "Ashtakam",
    description:
      "Eight-verse protective hymn to Lord Surya (the Sun God). Each verse invokes Surya to guard a specific part of the body and life, granting health, vitality, and divine protection.",
    fullText: `॥ सूर्य रक्षा अष्टकम् ॥

सूर्यः शिरो मे रक्षतु ललाटं रक्षतु प्रभुः।
नेत्रे रक्षतु आदित्यो नासिकां भास्करः सदा॥१॥

मुखं रक्षतु मार्तण्डः कण्ठं रक्षतु दिनकरः।
स्कन्धौ रक्षतु सविता भुजौ रक्षतु भानुमान्॥२॥

हृदयं रक्षतु हरिः नाभिं रक्षतु तेजसाम्।
कटिं रक्षतु सूर्यश्च ऊरू रक्षतु पूषणः॥३॥

जानुनी रक्षतु ध्वान्तघ्नः जङ्घे रक्षतु त्वष्टा।
पादौ रक्षतु विवस्वान् सर्वाङ्गं रक्षतु प्रभाकरः॥४॥

प्राचि दिशि रक्षतु मां सूर्यः प्रतीच्यां च विभावसुः।
उदीच्यां रक्षतु द्युमान् दक्षिणे रक्षतु ग्रहः॥५॥

आरोग्यं देहि देवेश आयुः प्रज्ञां च देहि मे।
श्रेयः प्रदेहि देवेश लोकालोकप्रदीपन॥६॥

दोषान् नाशय सर्वान् मे दुःस्वप्नान् च विनाशय।
पापान् नाशय मे सर्वान् शत्रून् नाशय सर्वतः॥७॥

या तव अर्चिर्मही भामा सूर्यमण्डलवासिनी।
तस्यां मां पालय देव सर्वपापविनाशन॥८॥

सूर्यरक्षाष्टकमिदं पठेद्यः प्रयतो नरः।
दीर्घायुरारोग्यसम्पत् तस्य स्याद् धनसम्पदा॥`,
    meaning:
      "Invokes Surya by many names — Aditya, Bhaskar, Martand, Dinakar, Savita, Bhanu, Hari, Pooshan, Vivaswaan, Prabhakara — to protect every limb of the devotee and all four directions. Final verses ask Surya to grant health, longevity, wisdom, and destroy sins, nightmares, and enemies.",
    benefits:
      "Provides complete divine protection of body and soul. Bestows long life, good health, wealth, and intelligence. Destroys all sins, evil dreams, enemies, and planetary afflictions caused by a weak Sun. Best recited at sunrise facing east.",
  },
  {
    id: "annapurna-ashtakam",
    title: "Annapurna Ashtakam",
    deity: "Annapurna",
    faith: "Hindu",
    type: "Ashtakam",
    description:
      "Eight-verse hymn by Adi Shankaracharya in praise of Goddess Annapurna — the divine provider of food and nourishment. She is the form of Parvati who feeds the entire universe. Reciting this stotra ensures devotees never suffer from hunger or poverty.",
    fullText: `॥ अन्नपूर्णा अष्टकम् ॥
(श्रीमदाद्यशंकराचार्य विरचितम्)

नित्यानन्दकरी वराभयकरी सौन्दर्यरत्नाकरी
निर्धूताखिलघोरपावनकरी प्रत्यक्षमाहेश्वरी।
प्रालेयाचलवंशपावनकरी काशीपुराधीश्वरी
भिक्षां देहि कृपावलम्बनकरी मातान्नपूर्णेश्वरी॥१॥

नानारत्नविचित्रभूषणकरी हेमाम्बराडम्बरी
मुक्ताहारविडम्बमानविलसद्वक्षोजकुम्भान्तरी।
काश्मीरागरुवासिता रुचिकरी काशीपुराधीश्वरी
भिक्षां देहि कृपावलम्बनकरी मातान्नपूर्णेश्वरी॥२॥

योगानन्दकरी रिपुक्षयकरी धर्मार्थनिष्ठाकरी
चन्द्रार्कानलभासमानलहरी त्रैलोक्यरक्षाकरी।
सर्वैश्वर्यसमस्तवाञ्छितकरी काशीपुराधीश्वरी
भिक्षां देहि कृपावलम्बनकरी मातान्नपूर्णेश्वरी॥३॥

कैलासाचलकन्दरालयकरी गौरी ह्युमा शङ्करी
कौमारी निगमार्थगोचरकरी ओंकारबीजाक्षरी।
मोक्षद्वारकवाटपाटनकरी काशीपुराधीश्वरी
भिक्षां देहि कृपावलम्बनकरी मातान्नपूर्णेश्वरी॥४॥

दृश्यादृश्यविभूतिवाहनकरी ब्रह्माण्डभाण्डोदरी
लीलानाटकसूत्रभेदनकरी विज्ञानदीपाङ्कुरी।
श्रीविश्वेशमनःप्रसादनकरी काशीपुराधीश्वरी
भिक्षां देहि कृपावलम्बनकरी मातान्नपूर्णेश्वरी॥५॥

उर्वीसर्वजनेश्वरी भगवती माताऽन्नपूर्णेश्वरी
वेणीनीलसमानकुन्तलधरी नित्यान्नदानेश्वरी।
सर्वानन्दकरी सदाशिवकरी काशीपुराधीश्वरी
भिक्षां देहि कृपावलम्बनकरी मातान्नपूर्णेश्वरी॥६॥

आदिक्षान्तसमस्तवर्णनकरी शम्भोस्त्रिनेत्राद्रि सा
काशीत्रिपुरभैरवी त्रिभुवनी माताऽन्नपूर्णेश्वरी।
सर्वानन्दकरी देवी भवतु मे काशीपुराधीश्वरी
भिक्षां देहि कृपावलम्बनकरी मातान्नपूर्णेश्वरी॥७॥

अन्नपूर्णे सदापूर्णे शंकरप्राणवल्लभे
ज्ञानवैराग्यसिद्ध्यर्थं भिक्षां देहि च पार्वति॥८॥

माता च पार्वती देवी पिता देवो महेश्वरः।
बान्धवाः शिवभक्ताश्च स्वदेशो भुवनत्रयम्॥`,
    meaning:
      "Shankaracharya praises Annapurna as the eternally blissful Goddess of Kashi who provides alms (bhiksha). She is the beloved of Shankara, the embodiment of all knowledge, who purifies the lineage of Himalaya. The final verse: 'Mother is Parvati, Father is Maheshwara, kinsmen are Shiva-devotees, and the homeland is all three worlds.'",
    benefits:
      "Ensures freedom from hunger, poverty, and material want. Grants food, nourishment, and prosperity. Particularly beneficial for those facing financial hardship. Reciting with devotion in Kashi or any Devi temple ensures the grace of Annapurna and Sadashiva together.",
  },
  {
    id: "kalika-ashtakam",
    title: "Kalika Ashtakam",
    deity: "Kali",
    faith: "Hindu",
    type: "Ashtakam",
    description:
      "Eight powerful verses in praise of Goddess Kalika (Kali), the fierce, time-transcending form of the Divine Mother. This stotra glorifies her terrifying yet compassionate nature as the destroyer of all evil and the liberator of devotees.",
    fullText: `॥ कालिका अष्टकम् ॥

कालि कालि महाकालि कालिके परमेश्वरि।
सर्वानन्दकरि देवि नमस्ते कालभैरवि॥१॥

करालवक्त्रे महादंष्ट्रे कराली मुण्डमालिनि।
खड्गखेटकरे घोरे महाकालि नमोऽस्तु ते॥२॥

विकटालोचने देवि विशालाक्षि त्रिलोचने।
विकीर्णकेशि घोराक्षि महाकालि नमोऽस्तु ते॥३॥

मसानवासिने देवि नग्नरूपे दिगम्बरि।
प्रेतासनसमासीने महाकालि नमोऽस्तु ते॥४॥

नरमुण्डकरे देवि महाघोरविनाशिनि।
कराली विकराली च महाकालि नमोऽस्तु ते॥५॥

चण्डमुण्डविनाशि त्वं शुम्भनिशुम्भघातिनि।
रक्तबीजवधे देवि महाकालि नमोऽस्तु ते॥६॥

ब्रह्माविष्णुशिवाद्यानां पूज्यपाद नमोऽस्तु ते।
भक्तानां भयहन्त्री च महाकालि नमोऽस्तु ते॥७॥

कालिकाष्टकमेतद्धि भक्तिभावसमन्वितः।
पठेद्यः प्रयतो मर्त्यः स सिद्धिं लभते ध्रुवम्॥८॥

सर्वपापविनिर्मुक्तः सर्वशत्रुविनाशकम्।
मोक्षं प्राप्नोति भक्तश्च कालिकाप्रसादतः॥`,
    meaning:
      "The eight verses salute Kalika by her fearsome epithets: the terrifying-faced one with great fangs, skull-garland wearer, sky-clad one of the cremation grounds, slayer of Chanda-Munda and Shumbha-Nishumbha. She is worshipped even by Brahma, Vishnu, and Shiva, yet destroys the fears of her devotees.",
    benefits:
      "Destroys all sins, defeats enemies, removes fear, and ultimately grants liberation (moksha). Particularly powerful for overcoming black magic, evil spirits, and deeply rooted fear. Those who recite with devotion receive Kalika's direct grace and attain spiritual perfection (Siddhi).",
  },
  {
    id: "lalita-sahasranama-stotram",
    title: "Lalita Sahasranama (First 50 Names)",
    deity: "Lalita Devi",
    faith: "Hindu",
    type: "Stotram",
    description:
      "The Lalita Sahasranama contains 1000 divine names of Goddess Lalita Tripurasundari from the Brahmanda Purana, revealed by Hayagriva to Agastya Muni. The first 50 names are presented here, each being a complete mantra in itself.",
    fullText: `॥ श्री ललिता सहस्रनाम स्तोत्रम् ॥
(प्रथम पचास नाम)

ॐ ऐं ह्रीं श्रीं ललिताम्बिकायै नमः।

श्री माता श्री महाराज्ञी श्रीमत् सिंहासनेश्वरी।
चिदग्निकुण्डसम्भूता देवकार्यसमुद्यता॥१॥

उद्यद्भानुसहस्राभा चतुर्बाहुसमन्विता।
रागस्वरूपापाशाढ्या क्रोधाकाराङ्कुशोज्ज्वला॥२॥

मनोरूपेक्षुकोदण्डा पञ्चतन्मात्रसायका।
निजारुणप्रभापूरमज्जद्ब्रह्माण्डमण्डला॥३॥

सर्वारुणाऽनवद्याङ्गी सर्वाभरणभूषिता।
शिवकामेश्वराङ्कस्था शिवा स्वाधीनवल्लभा॥२१॥

मूलाधारैकनिलया ब्रह्मग्रन्थिविभेदिनी।
मणिपूरान्तरुदिता विष्णुग्रन्थिविभेदिनी॥३८॥

भवानी भावनागम्या भवारण्यकुठारिका।
भद्रप्रिया भद्रमूर्तिर्भक्तसौभाग्यदायिनी॥४१॥

निर्लेपा निर्मला नित्या निराकारा निराकुला।
निर्गुणा नित्यनिर्मुक्ता निर्विकारा निरीश्वरा॥४४॥

दुर्लभा दुर्गमा दुर्गा दुःखहन्त्री सुखप्रदा।
दुष्टदूरा दुराचारशमनी दोषवर्जिता॥४९॥

सर्वज्ञा सान्द्रकरुणा समानाधिकवर्जिता।
सर्वशक्तिमयी सर्वमङ्गला सद्गतिप्रदा॥५०॥

ॐ नमो भगवत्यै श्री ललिताम्बिकायै नमः।`,
    meaning:
      "The Lalita Sahasranama describes the Goddess from head to toe, then proceeds to cosmic attributes: She sits on the Shri Yantra, wields the sugarcane bow with flower arrows, encompasses all six chakras from Muladhara to Sahasrara, and embodies both nirguna (attributeless) and saguna (with attributes) Brahman.",
    benefits:
      "Reciting even the first 50 names grants removal of sins, destruction of enemies, attainment of wealth. The full 1000-name recitation is considered the highest Devi upasana. Particularly powerful for Shakti devotees and those on the Tantric spiritual path.",
  },
  {
    id: "ganga-stotram",
    title: "Ganga Stotram",
    deity: "Ganga",
    faith: "Hindu",
    type: "Stotra",
    description:
      "A devotional hymn praising Goddess Ganga — the sacred river personified as a divine mother who flows from Vishnu's feet through Shiva's matted locks to purify the earth. This stotra destroys sins accumulated over many lifetimes.",
    fullText: `॥ श्री गंगा स्तोत्रम् ॥

देवि सुरेश्वरि भगवति गंगे
त्रिभुवनतारिणि तरलतरंगे।
शंकरमौलिविहारिणि विमले
मम मतिरास्तां तव पदकमले॥१॥

भागीरथिसुखदायिनि मातस्तव
जलमहिमा निगमे ख्यातः।
नाहं जाने तव महिमानं
पाहि कृपामयि मामज्ञानम्॥२॥

हरिपदपाद्यतरंगिणि गंगे
हिमविधुमुक्ताधवलतरंगे।
दूरीकुरु मम दुष्कृतिभारं
कुरु कृपया भवसागरपारम्॥३॥

तव जलममलं येन निपीतं
परमपदं खलु तेन गृहीतम्।
मातर्गंगे त्वयि यो भक्तः
किल तं द्रष्टुं न यमः शक्तः॥४॥

पतितोद्धारिणि जाह्नवि गंगे
खण्डितगिरिवरमण्डितभंगे।
भीष्मजननि हे मुनिवरकन्ये
पतितनिवारिणि त्रिभुवनधन्ये॥५॥

तव चरणं प्रणमामि देवि
गंगे हर मम पापं सर्वम्।
त्रिभुवनसारे वसुधाहारे
त्वमसि गतिर्मम खलु संसारे॥७॥

गंगास्तोत्रमिदं भक्त्या पठेद्यः
सुखं लभते नात्र संशयः।
सर्वपापविनिर्मुक्तः स्नात्वा
गंगासिन्धौ विमुक्तिं लभते॥`,
    meaning:
      "The stotra hails Ganga as the divine goddess who flows from Shiva's matted locks, daughter of Bhagiratha, mother of Bhishma, destroyer of the burden of sins. She is crystal-white like snow and moonlight; devotees of Ganga cannot be touched even by Yama (god of death).",
    benefits:
      "Reciting this stotra brings the merit of bathing in the Ganga. Removes sins of many lifetimes, protects from untimely death, and leads to ultimate liberation (mukti). Best recited on Ganga Dashami, Ganga Saptami, or any day near a river.",
  },
  // ====== BATCH 4 (Part 7) ======
  {
    id: "devi-kavacham",
    title: "Devi Kavacham",
    deity: "Durga",
    faith: "Hindu",
    type: "Kavach",
    description:
      "The divine armor (Kavach) of Goddess Durga, from the Devi Mahatmyam (Markandeya Purana). Brahma revealed this to sage Markandeya. Each verse invokes a specific form of the Devi to protect a specific part of the body — creating a complete shield of divine protection.",
    fullText: `॥ देवी कवचम् ॥
(मार्कण्डेय पुराणान्तर्गत श्री दुर्गा सप्तशत्याः अङ्गभूत)

ॐ नमश्चण्डिकायै।

ब्रह्मोवाच —
अस्ति गुह्यतमं विप्र सर्वभूतोपकारकम्।
देव्यास्तु कवचं पुण्यं तच्छृणुष्व महामुने॥

प्रथमं शैलपुत्री च द्वितीयं ब्रह्मचारिणी।
तृतीयं चन्द्रघण्टेति कूष्माण्डेति चतुर्थकम्॥

पञ्चमं स्कन्दमातेति षष्ठं कात्यायनीति च।
सप्तमं कालरात्रिश्च महागौरीति चाष्टमम्॥

नवमं सिद्धिदात्री च नवदुर्गाः प्रकीर्तिताः।

शिरो मे दीप्तपद्माभा ललाटे च शुलेश्वरी।
नासिकां च सरस्वती रक्षेच्च कर्णयोर्द्वयम्।
मुखं चण्डी प्रपायात् मां ग्रीवां च जयदायिनी॥

भुजौ स्कन्दमहाशक्तिः हस्तौ दुर्गा प्रपायात्।
हृदयं गह्वरेशानी उदरं रक्षतु प्रभो॥

नाभिं पातु महादेवी कटिं रक्षतु चण्डिका।
जङ्घे महाबला पातु पादौ पातालवासिनी।
सर्वाङ्गं पातु देवेशी सर्वायुधधारिणी॥

इदं तु कवचं देव्याः पठेद्यः प्रयतः शुचिः।
तस्य रक्षां करोत्येव सर्वत्र विजयं ददेत्॥`,
    meaning:
      "Brahma narrates to Markandeya that this Devi Kavacham is the greatest secret, benefiting all beings. It names the nine Durgas (Navadurgas) and systematically invokes specific forms of Devi to protect every part of the body — from the radiant lotus-like head to the feet protected by Patalavashini.",
    benefits:
      "The Devi Kavacham is the most powerful protection prayer. Wearing or reciting this removes all obstacles in battle, danger, poison, fire, and difficult situations. Destroys sins and grants victory over all enemies. Purifies the soul and leads to liberation. Part of the daily Chandi Path recitation.",
  },
  {
    id: "argala-stotram",
    title: "Argala Stotram",
    deity: "Durga",
    faith: "Hindu",
    type: "Stotra",
    description:
      "The Argala Stotram ('Bolt' prayer) is recited as part of the Devi Mahatmyam along with the Kavacham and Keelakam. 'Argala' means bolt — this prayer removes all blockages and opens the door to divine grace. It glorifies Durga's victories and asks for abundance, beauty, victory, and fame.",
    fullText: `॥ अर्गला स्तोत्रम् ॥

जयन्ती मङ्गला काली भद्रकाली कपालिनी।
दुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते॥१॥

मधुकैटभविद्राविविधातृवरदायिनि।
रूपं देहि जयं देहि यशो देहि द्विषो जहि॥२॥

महिषासुरनिर्नाशि भक्तानां सुखदायिनि।
रूपं देहि जयं देहि यशो देहि द्विषो जहि॥३॥

रक्तबीजवधे देवि चण्डमुण्डविनाशिनि।
रूपं देहि जयं देहि यशो देहि द्विषो जहि॥४॥

शुम्भस्यैव निशुम्भस्य धूम्राक्षस्य च मर्दिनि।
रूपं देहि जयं देहि यशो देहि द्विषो जहि॥५॥

देहि सौभाग्यमारोग्यं देहि मे परमं सुखम्।
रूपं देहि जयं देहि यशो देहि द्विषो जहि॥११॥

विद्यावन्तं यशस्वन्तं लक्ष्मीवन्तं जनं कुरु।
रूपं देहि जयं देहि यशो देहि द्विषो जहि॥१५॥

इदं स्तोत्रं पठित्वा तु महास्तोत्रं पठेन्नरः।
स तु सप्तशतीसंख्यां वाञ्छितां प्राप्नुयाद् ध्रुवम्॥`,
    meaning:
      "Argala Stotram glorifies Chandika by her heroic deeds — slaying Madhu-Kaitabha, Mahishasura, Raktabija, Chanda-Munda, Shumbha-Nishumbha. The refrain 'Rupam dehi, jayam dehi, yasho dehi, dviso jahi' (Grant me beauty, victory, fame, destroy my enemies) is repeated throughout.",
    benefits:
      "Reciting Argala Stotram grants beauty, fame, victory, good fortune, and health. Destroys enemies and removes diseases. Reading this before the Saptashati multiplies its effect. Fulfills all righteous wishes of the devotee.",
  },
  {
    id: "keelakam-atha-kilakam",
    title: "Keelakam (Atha Kilakam)",
    deity: "Durga",
    faith: "Hindu",
    type: "Stotra",
    description:
      "The Keelakam (also called Kilakam or 'Pin/Key') is the third preparatory stotram of the Devi Mahatmyam, composed by Shiva himself. It is recited after the Kavacham and Argala Stotram. 'Keela' means pin — this prayer unlocks the full power of the Chandi Path recitation.",
    fullText: `॥ अथ कीलकम् ॥

विशुद्धज्ञानदेहाय त्रिवेदीदिव्यचक्षुषे।
श्रेयःप्राप्तिनिमित्ताय नमः सोमार्धधारिणे॥१॥

सर्वमेतद्विजानीयान्मन्त्राणामपि कीलकम्।
सोऽपि क्षेमं समाप्नोति सततं जप्यतत्परः॥२॥

सिद्ध्यन्त्युच्चाटनादीनि वस्तूनि सकलान्यपि।
एतेन स्तुवतां देवीं स्तोत्रमात्रेण सिद्ध्यति॥३॥

न मन्त्रो नौषधं तत्र न किञ्चिदपि विद्यते।
विना जप्येन सिद्ध्येत सर्वमुच्चाटनादिकम्॥४॥

स्तोत्रं वै चण्डिकायास्तु तच्च गुह्यं चकार सः।
समाप्तिर्न भवेत्तस्य पठनाद्यस्य कीलकम्॥५॥

एकवारं त्रिवारं वा पठेत् स्तोत्रमिदं शुभम्।
तदा सम्पूर्णतामेति चण्डीपाठफलं नृणाम्॥६॥

ॐ क्षमा करोतु देवी मां मम सर्वत्र रक्षतु।
सर्वसिद्धिं च मे देहि चण्डिके देवि नमोऽस्तु ते॥`,
    meaning:
      "Shiva composed this Keelakam to remove the 'pin' blocking the full spiritual power of the Chandi recitation. Without the Keelakam, reciting the Saptashati remains incomplete. The Keelakam teaches that no separate mantra or remedy is needed — the Chandi Path itself, when properly unlocked, accomplishes everything.",
    benefits:
      "The Keelakam 'unlocks' the full power of the Devi Mahatmyam. Reciting it ensures the Chandi Path gives complete results. Grants all siddhis and removes obstacles from all spiritual practices. Must be recited before beginning the full Saptashati reading.",
  },
  {
    id: "dasha-ratha-krit-shani-stotra",
    title: "Dasha Ratha Krit Shani Stotra",
    deity: "Shani",
    faith: "Hindu",
    type: "Stotra",
    description:
      "This powerful Shani Stotra was composed by King Dasharatha (father of Lord Rama) to appease Lord Shani (Saturn) when Saturn was about to enter Rohini Nakshatra — an event feared to bring terrible calamities. Dasharatha's prayer moved Shani, who agreed to spare his kingdom.",
    fullText: `॥ दशरथकृत शनि स्तोत्रम् ॥

नमः कृष्णाय नीलाय शिखिपिच्छनिभाय च।
नमो नीलमयूखाय नीलोत्पलनिभाय च॥१॥

नमो निर्मांसदेहाय दीर्घश्मश्रुजटाय च।
नमः पिङ्गलनेत्राय दीर्घाय कृशकाय च॥२॥

नमः श्रुतिधराय ध्वान्ते तिलपुष्पसमप्रभ।
त्वं सूर्यपुत्रो देवेश क्षमस्व भगवन् शने॥३॥

नमस्त्रिदशाधीश त्वामहं शरणं गतः।
सूर्यसुत महाभाग शने मां परिपालय॥४॥

नीलाञ्जनसमाभास रविपुत्र यमाग्रज।
छायामार्तण्डसम्भूत नमस्ते भगवन् शने॥५॥

कोणस्थः पिङ्गलो बभ्रुः कृष्णो रौद्रोऽन्तको यमः।
सौरिः शनैश्चरो मन्दः पिप्पलाद स एव हि॥६॥

एतानि दश नामानि प्रातरुत्थाय यः पठेत्।
शनैश्चरकृता पीडा न भवेत् तस्य सर्वदा॥७॥

सर्वव्याधिविनाशाय सर्वापत्तिनिवारणे।
शनिस्तोत्रमिदं देव पठनाद्विजयी भवेत्॥`,
    meaning:
      "King Dasharatha addresses Shani with 10 sacred names: Krishnaya (the dark one), Nilaya (the blue one), Shikhi-piccha-nibhaya (resembling peacock feathers), Pingala-netraya (tawny-eyed), and praises him as the son of Surya, elder to Yama (god of death), born of Chaya and Martanda.",
    benefits:
      "Reciting the ten names of Shani every morning completely neutralizes the ill effects of Shani's affliction. Protects from Sade Sati, Shani Dasha, and all Saturn-related problems. Removes diseases, calamities, and grants victory. Particularly effective on Saturdays and during Shani Jayanti.",
  },
  {
    id: "shri-chitragupt-stuti",
    title: "Shri Chitragupt Stuti",
    deity: "Chitragupt",
    faith: "Hindu",
    type: "Stotra",
    description:
      "A stuti (hymn of praise) to Lord Chitragupta — the divine accountant and record-keeper of Dharmaraja Yama's court. Chitragupta maintains the record of every being's karmas. He is the deity of the Kayastha community and is worshipped on Chitragupta Puja (the day after Diwali).",
    fullText: `॥ श्री चित्रगुप्त स्तुति ॥

ॐ नमो भगवते चित्रगुप्ताय।

चित्रगुप्त नमस्तुभ्यं लेखनी पुस्तकं करे।
लेखको यमराजस्य नमस्ते चित्रगुप्तक॥१॥

ब्रह्मणो मानसोत्पन्न काया-वापरायण।
धर्मराजस्य कार्याणि कुरुष्व प्रभो सदा॥२॥

सूर्यसेवक देवाद्य ज्ञानिनां शिरोमणे।
समस्तगुणसम्पन्न नमस्ते चित्रगुप्तक॥३॥

यमराजस्य यो दूतो धर्मार्थी नित्यसंस्थितः।
सत्यकर्मप्रकाशाय नमस्ते चित्रगुप्तक॥४॥

सर्वप्राणिनां कर्माणि लिखते यः सदा शुचिः।
पापनाशाय पुण्यार्थी नमस्ते चित्रगुप्तक॥५॥

जगत्कर्मफलं दाता धर्मराजस्य सेवकः।
चित्रगुप्त नमस्तुभ्यं पापनाशं कुरुष्व मे॥६॥

नमस्ते देवदेवेश नमस्ते धर्मरक्षक।
कलमकागजधारी मे नमस्ते ज्ञानदायक॥७॥

जय चित्रगुप्त देव। ॐ चित्रगुप्ताय नमः।`,
    meaning:
      "The stuti praises Chitragupta as born from Brahma's mind and body (hence Kayastha — 'born from the body'), holding pen and book (lekhani and pustaka), as the scribe of Dharmaraja (Yama). He is the sun-devotee, jewel among the wise, repository of all virtues, and revealer of true karma.",
    benefits:
      "Worshipping Chitragupta with this stuti purifies past karmic records and destroys accumulated sins. Grants clarity, intelligence, success in writing, legal matters, and government. Particularly beneficial for students, writers, lawyers, and accountants. Must be recited on Chitragupta Puja day and Yama Dwitiya (Bhai Dooj).",
  },
  {
    id: "bhaktamar-stotra-jain",
    title: "Bhaktamar Stotra (Jain)",
    deity: "Rishabhanatha (Adinath)",
    faith: "Jain",
    type: "Stotram",
    description:
      "The Bhaktamar Stotra is one of the most celebrated Jain devotional texts, composed by Acharya Manatunga (circa 7th century CE) in praise of the first Tirthankar Rishabhanatha (Adinath). The name 'Bhaktamar' means 'worshipped by devotees.' It consists of 48 verses in the Vasantatilaka metre. Tradition holds that Manatunga composed this while in chains — as he recited each verse, one of his 48 chains broke.",
    fullText: `॥ भक्तामर स्तोत्र ॥
(आचार्य मानतुंग विरचित)

भक्तामरप्रणतमौलिमणिप्रभाणाम्
उद्द्योतकं दलितपापतमोवितानम्।
सम्यक्प्रणम्य जिनपादयुगं युगादौ
आलम्बनं भवजले पततां जनानाम्॥१॥

यः संस्तुतः सकलवाङ्मयतत्त्वबोधात्
उद्भूतबुद्धिपटुभिः सुरलोकनाथैः।
स्तोत्रैर्जगत्त्रितयचित्तहरैरुदारैः
स्तोष्ये किलाहमपि तं प्रथमं जिनेन्द्रम्॥२॥

बुद्ध्या विनापि विबुधार्चितपादपीठ!
स्तोतुं समुद्यतमतिर्विगतत्रपोऽहम्।
बालं विहाय जलसंस्थितमिन्दुबिम्बम्
अन्यः क इच्छति जनः सहसाऽवगन्तुम्॥३॥

वक्तुं गुणान् गुणसमुद्र! शशाङ्ककान्ते!
धत्ते धियं तव किमीश! मतिर्मदीया।
मन्दाकिनीसलिलबिन्दुपरीक्षणाय
मन्दो मतिश्च किल मेऽपि विभावयामि॥४॥

सोऽहं तथापि तव भक्तिवशान्मुनीश!
कर्तुं स्तवं विगतशक्तिरपि प्रवृत्तः।
आस्तां तव स्तवनमस्तसमस्तदोष
त्वत्संकथापि जगतां दुरितानि हन्ति॥५॥

दृष्ट्वा भवन्तमनिमेषविलोकनीयं
नान्यत्र तोषमुपयाति मनो मदीयम्।
पीत्वा पयः शशिकरद्युतिसोमसारं
क्षारं जलं जलनिधेरसितुं क इच्छेत्॥६॥

यैः शान्तरागरुचिभिः परमाणुभिस्त्वं
निर्मापितस्त्रिभुवनैकललामभूत।
तावन्त एव खलु तेऽप्यणवः पृथिव्यां
यत्ते समानमपरं न हि रूपमस्ति॥७॥

वक्त्रं क्व ते सुरनरोरगनेत्रहारि
निःशेषनिर्जितजगत्त्रितयोपमानम्।
बिम्बं कलंकमलिनं क्व निशाकरस्य
यद्वासरे भवति पाण्डुपलाशकल्पम्॥८॥

इति भक्तामर स्तोत्रम् (प्रथम अष्ट श्लोकाः)॥`,
    meaning:
      "The first eight verses establish the devotional framework: (1) Salutation to Rishabhanatha's feet, the shelter for those drowning in the ocean of existence; (2) Even Indra and the gods sing his praises — Manatunga aspires to do the same; (3-4) Like a child reflecting the moon in water, Manatunga humbly attempts to praise the Supreme; (5) Even speaking of the Tirthankar destroys all sins — the sun dispels darkness from afar; (6-8) The mind that has seen the Tirthankar seeks no other beauty — his body is unique in all three worlds.",
    benefits:
      "Reciting Bhaktamar Stotra is believed to break the chains of karma as it broke Manatunga's physical chains. Provides protection from all dangers, cures diseases, grants success in all undertakings, and liberates devotees from worldly suffering. The 48 verses correspond to 48 types of divine protection. Particularly powerful when recited in Jain temples.",
  },
  {
    id: "uvasaggaharam-stotra-jain",
    title: "Uvasaggaharam Stotra (Jain)",
    deity: "Parshvanath",
    faith: "Jain",
    type: "Stotram",
    description:
      "The Uvasaggaharam Stotra is an ancient Jain devotional text composed by Bhadrabahu Swami in praise of Lord Parshvanatha, the 23rd Tirthankar. 'Uvasaggaharam' means 'remover of afflictions and distress.' This stotra is traditionally recited to protect against disease, evil, and calamity.",
    fullText: `॥ उवसग्गहरं स्तोत्र ॥
(श्रीभद्रबाहुस्वामिविरचितम् — प्राकृत)

उवसग्गहरं पासं, पासं वंदामि कम्मघणमुक्कं।
विसहरविसनिन्नासं, मंगलकल्लाणआवासं॥१॥

विसहर-फुलिंग-मंतं, कंठे धारेइ जो सया मणुओ।
तस्स गह-रोग-मारी, दुट्ठ-जरा जंति उवसामं॥२॥

चिट्ठउ दूरे मंतो, तुज्झ पणामो वि बहुफलो होइ।
नर-तिरिएसु वि जीवा, पावंति न दुक्खदोगच्चं॥३॥

तुह समत्थ-पासा, देव दिज्जउ मज्झ निच्च-कालं तु।
दुक्ख-दरिद्द-विनासो, होउ मम तुह समत्थए॥४॥

एवं मए थुओ देवो, चउव्विसं पि जिण-वराणं।
इह लोए जम्मि जम्मि, सव्व-संपय-पत्तियाए॥५॥

(हिन्दी भावार्थ)
मैं पार्श्वनाथ को वंदन करता हूँ जो उपसर्गों को हरते हैं,
जिन्होंने कर्मों के समूह का नाश किया है।
जो सर्पविष का नाश करते हैं और मंगल के आवास हैं॥१॥

जो मनुष्य इस मंत्र को कंठ में धारण करता है,
उसके ग्रह-रोग-महामारी, और दुष्ट ज्वर शांत हो जाते हैं॥२॥`,
    meaning:
      "Bhadrabahu Swami composed this stotra in Ardhamagadhi Prakrit — the ancient language of Jain scriptures. The stotra praises Parshvanatha as the remover of all afflictions, the destroyer of karma and snake-venom, and the abode of all auspiciousness. Even merely bowing to him brings great benefit to all beings.",
    benefits:
      "Traditionally recited for protection from serpent bites, epidemics, malefic planetary influences, and all forms of disease and calamity. Destroys sins, removes poverty, and grants all-round prosperity across many lifetimes. One of the most powerful Jain protective prayers.",
  },
  {
    id: "namokar-stotra-extended-jain",
    title: "Namokar Stotra — Extended Commentary (Jain)",
    deity: "Panch Parameshthi",
    faith: "Jain",
    type: "Stotram",
    description:
      "The Namokar Mantra (also called Navkar Mantra or Panchparmesthi Mantra) is the supreme prayer of Jainism. This extended commentary explains the deep meaning of each pada (phrase) of the five-fold salutation to the Panch Parameshthi — the five supreme spiritual beings: Arihant, Siddha, Acharya, Upadhyaya, and Sadhu.",
    fullText: `॥ णमोकार महामंत्र — विस्तृत व्याख्या ॥

मूल मंत्र —
णमो अरिहंताणं।
णमो सिद्धाणं।
णमो आयरियाणं।
णमो उवज्झायाणं।
णमो लोए सव्वसाहूणं।
एसो पंच णमोक्कारो, सव्वपावप्पणासणो।
मंगलाणं च सव्वेसिं, पढमं हवइ मंगलं।

—— पद-दर-पद व्याख्या ——

णमो अरिहंताणं — अरिहंतों को नमस्कार
अरिहंत = जिन्होंने 'अरि' (शत्रु — काम, क्रोध, लोभ, मोह, अहंकार) को 'हन्त' (नष्ट) किया।
वे केवलज्ञान (omniscience), केवलदर्शन, अनंतसुख, और अनंतवीर्य प्राप्त करते हैं।
उनके 34 अतिशय (divine qualities) और 8 महाप्रातिहार्य होते हैं।

णमो सिद्धाणं — सिद्धों को नमस्कार
सिद्ध = जिन्होंने आठों कर्मों का पूर्णतः क्षय किया।
वे लोकाकाश के शिखर पर सिद्धशिला पर विराजमान हैं।
उनकी आत्मा में अनंत ज्ञान, दर्शन, सुख, और शक्ति प्रकट हैं।

णमो आयरियाणं — आचार्यों को नमस्कार
आचार्य = जो स्वयं सम्यक् आचरण करते हैं और दूसरों को मार्ग दिखाते हैं।
पाँच आचार पालन: ज्ञानाचार, दर्शनाचार, चारित्राचार, तपाचार, वीर्याचार।
36 गुणों के धारक।

णमो उवज्झायाणं — उपाध्यायों को नमस्कार
उपाध्याय = जो साधु-साध्वियों को आगम का अध्ययन कराते हैं।
25 गुणों के धारक, 46 आगमों के ज्ञाता।

णमो लोए सव्वसाहूणं — सभी साधुओं को नमस्कार
साधु = जो 5 महाव्रतों के पालक हैं।
पाँच महाव्रत: अहिंसा, सत्य, अचौर्य, ब्रह्मचर्य, अपरिग्रह।

—— महिमा ——
एसो पंच णमोक्कारो — यह पंच-नमस्कार
सव्वपावप्पणासणो — सभी पापों का नाशक है
मंगलाणं च सव्वेसिं — सभी मंगलों में
पढमं हवइ मंगलं — यह प्रथम (सर्वोच्च) मंगल है

यह मंत्र किसी व्यक्ति या मूर्ति को नहीं, बल्कि उन गुणों को नमस्कार करता है जो Parameshthi में विद्यमान हैं।
यह मंत्र अनादि-निधन है — किसी ने इसकी रचना नहीं की, यह सनातन सत्य है।`,
    meaning:
      "This extended commentary explains each pada of the Namokar Mantra in depth. The five salutations are not to individuals but to the spiritual qualities of the five supreme beings. The concluding verse declares this the foremost auspiciousness among all auspiciousness.",
    benefits:
      "The Namokar Mantra is the most powerful Jain prayer. Reciting it at the start of every activity brings success, protection, and peace. Its recitation at the time of death ensures liberation. Daily 108-time recitation purifies karma, grants mental peace, and accelerates spiritual progress.",
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
