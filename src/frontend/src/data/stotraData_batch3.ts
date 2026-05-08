/**
 * stotraData_batch3.ts — Batch 3 Stotras
 *
 * These stotras live in stotraData.ts (canonical source) and are
 * re-exported here as stotraDataBatch3 for consumers that import by batch.
 *
 * Stotras included:
 *   1. Surya Raksha Ashtakam     (surya-raksha-ashtakam)
 *   2. Annapurna Ashtakam        (annapurna-ashtakam)
 *   3. Kalika Ashtakam           (kalika-ashtakam)
 *   4. Lalita Sahasranama        (lalita-sahasranama-stotram)
 *   5. Ganga Stotram             (ganga-stotram)
 */
import { stotraData } from "./stotraData";
import type { Stotra } from "./stotraData";

const BATCH3_IDS = new Set([
  "surya-raksha-ashtakam",
  "annapurna-ashtakam",
  "kalika-ashtakam",
  "lalita-sahasranama-stotram",
  "ganga-stotram",
]);

export const stotraDataBatch3: Stotra[] = stotraData.filter((s) =>
  BATCH3_IDS.has(s.id),
);

// Legacy export kept for backward compatibility
const _legacy: Stotra[] = [
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
      "The hymn systematically invokes Surya (Sun God) by his many names — Aditya, Bhaskar, Martand, Dinakar, Savita, Bhanu, Hari, Pooshan, Vivaswaan, Prabhakara — to protect every limb of the devotee's body and all four directions. Final verses ask Surya to grant health, longevity, wisdom, and destroy sins, nightmares, and enemies.",
    benefits:
      "Provides complete divine protection of body and soul. Bestows long life, good health, wealth, and intelligence. Destroys all sins, evil dreams, enemies, and planetary afflictions caused by a weak Sun (Surya dosha). Best recited at sunrise facing east.",
  },
  {
    id: "annapurna-ashtakam",
    title: "Annapurna Ashtakam",
    deity: "Annapurna",
    faith: "Hindu",
    type: "Ashtakam",
    description:
      "Eight-verse hymn by Adi Shankaracharya in praise of Goddess Annapurna — the divine provider of food and nourishment. She is the form of Parvati who feeds the entire universe. Reciting this stotra ensures that devotees never suffer from hunger or poverty.",
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

यदा स्मर्यसे देवि सर्वबाधानिवारणी
तदा भवति सम्पत्ति सर्वानन्दकरी प्रभो।
अन्नपूर्णे सदापूर्णे शंकरप्राणवल्लभे
ज्ञानवैराग्यसिद्ध्यर्थं भिक्षां देहि च पार्वति॥८॥

माता च पार्वती देवी पिता देवो महेश्वरः।
बान्धवाः शिवभक्ताश्च स्वदेशो भुवनत्रयम्॥`,
    meaning:
      "Shankaracharya praises Annapurna as the eternally blissful, ever-compassionate Goddess of Kashi who provides alms (bhiksha). She is the beloved of Shankara, the embodiment of all knowledge, the one who purifies the lineage of Himalaya, and whose grace removes all distress. The final verse declares: 'Mother is Parvati, Father is Maheshwara, kinsmen are Shiva-devotees, and the homeland is all three worlds.'",
    benefits:
      "Ensures freedom from hunger, poverty, and material want. Grants food, nourishment, and prosperity. Particularly beneficial for those facing financial hardship. Reciting this stotra with devotion in Kashi or any Devi temple ensures the grace of Annapurna and Sadashiva together.",
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
      "The eight verses salute Kalika by her fearsome epithets: the terrifying-faced one with great fangs, the skull-garland wearer, holding sword and shield, the naked sky-clad one dwelling in cremation grounds, seated on a corpse, the slayer of Chanda-Munda and Shumbha-Nishumbha demons. She is worshipped even by Brahma, Vishnu, and Shiva, yet destroys the fears of her devotees.",
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
      "The Lalita Sahasranama contains 1000 divine names of Goddess Lalita Tripurasundari — the supreme Devi — from the Brahmanda Purana, revealed by Hayagriva to Agastya Muni. The first 50 names are presented here as a stotram, each name being a complete mantra in itself.",
    fullText: `॥ श्री ललिता सहस्रनाम स्तोत्रम् ॥
(प्रथम पचास नाम)

ॐ ऐं ह्रीं श्रीं ललिताम्बिकायै नमः।

श्री माता श्री महाराज्ञी श्रीमत् सिंहासनेश्वरी।
चिदग्निकुण्डसम्भूता देवकार्यसमुद्यता॥१॥

उद्यद्भानुसहस्राभा चतुर्बाहुसमन्विता।
रागस्वरूपापाशाढ्या क्रोधाकाराङ्कुशोज्ज्वला॥२॥

मनोरूपेक्षुकोदण्डा पञ्चतन्मात्रसायका।
निजारुणप्रभापूरमज्जद्ब्रह्माण्डमण्डला॥३॥

चम्पकाशोकपुन्नागसौगन्धिकलसत्कचा।
कुरुविन्दमणिश्रेणीकनत्कोटीरमण्डिता॥४॥

अष्टमीचन्द्रविभ्राजदलिकस्थलशोभिता।
मुखचन्द्रकलङ्काभमृगनाभिविशेषका॥५॥

वदनस्मरमाङ्गल्यगृहतोरणचिल्लिका।
वक्त्रलक्ष्मीपरीवाहचलन्मीनाभलोचना॥६॥

नवचम्पकपुष्पाभनासादण्डविराजिता।
ताराकान्तितिरस्कारिनासाभरणभासुरा॥७॥

कदम्बमञ्जरीक्लृप्तकर्णपूरमनोहरा।
ताटङ्कयुगलीभूततपनोडुपमण्डला॥८॥

पद्मरागशिलादर्शपरिभाविकपोलभूः।
नवविद्रुमबिम्बश्रीन्यक्कारिरदनच्छदा॥९॥

शुद्धविद्याङ्कुराकारद्विजपङ्क्तिद्वयोज्ज्वला।
कर्पूरवीटिकामोदसमाकर्षद्दिगन्तरा॥१०॥

निजसल्लापमाधुर्यविनिर्भर्त्सितकच्छपी।
मन्दस्मितप्रभापूरमज्जत्कामेशमानसा॥११॥

अनाकलितसादृश्यचिबुकश्रीविराजिता।
कामेशबद्धमाङ्गल्यसूत्रशोभितकन्धरा॥१२॥

कनकाङ्गदकेयूरकमनीयभुजान्विता।
रत्नग्रैवेयचिन्ताकलोलमुक्ताफलान्विता॥१३॥

कामेश्वरप्रेमरत्नमणिप्रतिपणस्तनी।
नाभ्यालवालरोमालिलताफलकुचद्वयी॥१४॥

लक्ष्यरोमलताधारतासमुन्नेयमध्यमा।
स्तनभारदलन्मध्यपट्टबन्धवलित्रया॥१५॥

अरुणारुणकौसुम्भवस्त्रभास्वत्कटीतटी।
रत्नकिङ्किणिकारम्यरशनादामभूषिता॥१६॥

कामेशज्ञातसौभाग्यमार्दवोरुद्वयान्विता।
माणिक्यमुकुटाकारजानुद्वयविराजिता॥१७॥

इन्द्रगोपरिभाश्श्रोणीजङ्घिका कूर्मपृष्ठजा।
गूढगुल्फा कूर्मपृष्ठजयिष्णुप्रपदान्विता॥१८॥

नखदीधितिसञ्छन्ननमज्जनतमोगुणा।
पदद्वयप्रभाजालपराकृतसरोरुहा॥१९॥

शिञ्जानमणिमञ्जीरमण्डितश्रीपदाम्बुजा।
मरालीमन्दगमना महालावण्यशेवधिः॥२०॥

सर्वारुणाऽनवद्याङ्गी सर्वाभरणभूषिता।
शिवकामेश्वराङ्कस्था शिवा स्वाधीनवल्लभा॥२१॥

सुमेरुमध्यशृङ्गस्था श्रीमन्नगरनायिका।
चिन्तामणिगृहान्तःस्था पञ्चब्रह्मासनस्थिता॥२२॥

महापद्माटवीसंस्था कदम्बवनवासिनी।
सुधासागरमध्यस्था कामाक्षी कामदायिनी॥२३॥

देवर्षिगणसङ्घातस्तूयमानात्मवैभवा।
भण्डासुरवधोद्युक्तशक्तिसेनासमन्विता॥२४॥

सम्पत्करीसमारूढसिन्दूरद्युतिपाटला।
अश्वारूढाधिष्ठितास्वकोटिकोटिभिरावृता॥२५॥

चक्रराजरथारूढसर्वायुधपरिष्कृता।
गेयचक्ररथारूढमन्त्रिण्यां परिसेविता॥२६॥

किरिचक्ररथारूढदण्डनाथापुरस्कृता।
ज्वालामालिनिकाक्षिप्तवह्निप्राकारमध्यगा॥२७॥

भण्डसैन्यवधोद्युक्तशक्तिविक्रमहर्षिता।
नित्यापराक्रमाटोपनिरीक्षणसमुत्सुका॥२८॥

भण्डपुत्रवधोद्युक्तबालाविक्रमनन्दिता।
मन्त्रिण्यम्बाविरचितविषङ्गवधतोषिता॥२९॥

विशुक्रप्राणहरणवाराहीवीर्यनन्दिता।
कामेश्वरमुखालोककल्पितश्रीगणेश्वरा॥३०॥

महागणेशनिर्भिन्नविघ्नयन्त्रप्रहर्षिता।
भण्डासुरेन्द्रनिर्मुक्तशस्त्रप्रत्यस्त्रवर्षिणी॥३१॥

कराङ्गुलिनखोत्पन्ननारायणदशाकृतिः।
महापाशुपतास्त्राग्निनिर्दग्धासुरसैनिका॥३२॥

कामेश्वरास्त्रनिर्दग्धसभण्डासुरशून्यका।
ब्रह्मोपेन्द्रमहेन्द्रादिदेवसंस्तुतवैभवा॥३३॥

हरनेत्राग्निसन्दग्धकामसञ्जीवनौषधिः।
श्रीमद्वाग्भवकूटैकस्वरूपमुखपङ्कजा॥३४॥

कण्ठाधःकटिपर्यन्तमध्यकूटस्वरूपिणी।
शक्तिकूटैकतापन्नकट्यधोभागधारिणी॥३५॥

मूलमन्त्रात्मिका मूलकूटत्रयकलेबरा।
कुलामृतैकरसिका कुलसंकेतपालिनी॥३६॥

कुलाङ्गना कुलान्तःस्था कौलिनी कुलयोगिनी।
अकुला समयान्तःस्था समयाचारतत्परा॥३७॥

मूलाधारैकनिलया ब्रह्मग्रन्थिविभेदिनी।
मणिपूरान्तरुदिता विष्णुग्रन्थिविभेदिनी॥३८॥

आज्ञाचक्रान्तरालस्था रुद्रग्रन्थिविभेदिनी।
सहस्राराम्बुजारूढा सुधासाराभिवर्षिणी॥३९॥

तटिल्लतासमरुचिः षट्चक्रोपरिसंस्थिता।
महासक्तिः कुण्डलिनी बिसतन्तुतनीयसी॥४०॥

भवानी भावनागम्या भवारण्यकुठारिका।
भद्रप्रिया भद्रमूर्तिर्भक्तसौभाग्यदायिनी॥४१॥

भक्तिप्रिया भक्तिगम्या भक्तिवश्या भयापहा।
शाम्भवी शारदाराध्या शर्वाणी शर्मदायिनी॥४२॥

शाङ्करी श्रीकरी साध्वी शरच्चन्द्रनिभानना।
शातोदरी शान्तिमती निराधारा निरञ्जना॥४३॥

निर्लेपा निर्मला नित्या निराकारा निराकुला।
निर्गुणा नित्यनिर्मुक्ता निर्विकारा निरीश्वरा॥४४॥

निरागा रागमथनी निर्मदा मदनाशिनी।
निश्चिन्ता निरहङ्कारा निर्मोहा मोहनाशिनी॥४५॥

निर्ममा ममतहन्त्री निष्पापा पापनाशिनी।
निष्क्रोधा क्रोधशमनी निर्लोभा लोभनाशिनी॥४६॥

निःसंशया संशयघ्नी निर्भवा भवनाशिनी।
निर्विकल्पा निराबाधा निर्भेदा भेदनाशिनी॥४७॥

निर्नाशा मृत्युमथनी निष्क्रिया निष्परिग्रहा।
निस्तुला नीलचिकुरा निरपाया निरत्यया॥४८॥

दुर्लभा दुर्गमा दुर्गा दुःखहन्त्री सुखप्रदा।
दुष्टदूरा दुराचारशमनी दोषवर्जिता॥४९॥

सर्वज्ञा सान्द्रकरुणा समानाधिकवर्जिता।
सर्वशक्तिमयी सर्वमङ्गला सद्गतिप्रदा॥५०॥

ॐ नमो भगवत्यै श्री ललिताम्बिकायै नमः।`,
    meaning:
      "The Lalita Sahasranama describes the Goddess from head to toe in meticulous poetic detail, then proceeds to describe her cosmic attributes: She sits on the Shri Yantra (Chakraraja Ratham), wields the sugarcane bow (mind) with flower arrows (senses), destroyed the demon Bhandhasura, encompasses all six chakras from Muladhara to Sahasrara, and embodies both nirguna (attributeless) and saguna (with attributes) Brahman.",
    benefits:
      "Reciting even the first 50 names grants removal of sins, destruction of enemies, attainment of wealth and prosperity, liberation from the cycle of birth and death. The full 1000-name recitation is considered the highest Devi upasana. Particularly powerful for Shakti devotees and those on the Tantric spiritual path.",
  },
  {
    id: "ganga-stotram",
    title: "Ganga Stotram",
    deity: "Ganga",
    faith: "Hindu",
    type: "Stotra",
    description:
      "A devotional hymn praising Goddess Ganga — the sacred river personified as a divine mother. Ganga is believed to flow from Vishnu's feet through Shiva's matted locks to purify the earth. This stotra, recited by the banks of the Ganga or at home, destroys sins accumulated over many lifetimes.",
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

कल्पलतामिव फलदां लोके
प्रणमति यस्त्वां न पतति शोके।
पारावारविहारिणि गंगे
विमुखयुवतिकृततरलापांगे॥६॥

तव चरणं प्रणमामि देवि
गंगे हर मम पापं सर्वम्।
त्रिभुवनसारे वसुधाहारे
त्वमसि गतिर्मम खलु संसारे॥७॥

अलकनन्दे सुखदे सुन्दरि
मङ्गलदायिनि सुरतरुवरि।
विमलकरण्डुपरिपूर्णसुधे
पापापहे मम मतिरास्तां त्वयि॥८॥

गंगास्तोत्रमिदं भक्त्या पठेद्यः
सुखं लभते नात्र संशयः।
सर्वपापविनिर्मुक्तः स्नात्वा
गंगासिन्धौ विमुक्तिं लभते॥`,
    meaning:
      "The stotra hails Ganga as the divine goddess who flows from Shiva's matted locks, the daughter of Bhagiratha, the mother of Bhishma, a sage's daughter, and the destroyer of the burden of sins. She is described as crystal-white like snow and moonlight, whose mere sight/touch/drinking purifies the soul. Devotees of Ganga cannot be touched even by Yama (the god of death).",
    benefits:
      "Reciting this stotra brings the merit of bathing in the Ganga. Removes sins of many lifetimes, protects from untimely death, and leads to ultimate liberation (mukti). Best recited on Ganga Dashami, Ganga Saptami, or any day near a river. Even imagining the Ganga while reciting this gives spiritual benefit.",
  },
];
export { _legacy as stotraDataBatch3Legacy };
