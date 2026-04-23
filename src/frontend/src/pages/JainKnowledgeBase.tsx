import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Calendar,
  Feather,
  Flower2,
  Globe,
  Layers,
  Star,
  Sunrise,
} from "lucide-react";

interface InfoCardProps {
  title: string;
  content: string;
  icon?: string;
}
function InfoCard({ title, content, icon }: InfoCardProps) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: "oklch(0.18 0.05 28 / 0.6)",
        border: "1px solid oklch(0.78 0.14 75 / 0.15)",
      }}
    >
      {icon && <div className="text-2xl mb-3">{icon}</div>}
      <h4 className="font-semibold text-foreground mb-2 text-sm">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
    </div>
  );
}

interface TimelineItemProps {
  year: string;
  event: string;
  detail: string;
}
function TimelineItem({ year, event, detail }: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
          style={{ background: "oklch(0.72 0.18 55)" }}
        />
        <div
          className="w-px flex-1 min-h-[30px]"
          style={{ background: "oklch(0.78 0.14 75 / 0.2)" }}
        />
      </div>
      <div className="pb-6">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-1"
          style={{
            background: "oklch(0.78 0.14 75 / 0.15)",
            color: "oklch(0.78 0.14 75)",
          }}
        >
          {year}
        </span>
        <h4 className="font-semibold text-foreground text-sm">{event}</h4>
        <p className="text-muted-foreground text-xs mt-0.5">{detail}</p>
      </div>
    </div>
  );
}

const mahavratas = [
  {
    name: "अहिंसा",
    desc: "किसी भी जीव को कष्ट न देना — मन, वचन, काया से",
    icon: "🕊️",
  },
  { name: "सत्य", desc: "हमेशा सत्य बोलना और सत्य का अनुसरण करना", icon: "💎" },
  { name: "अस्तेय", desc: "बिना अनुमति के किसी की वस्तु न लेना", icon: "🛡️" },
  {
    name: "ब्रह्मचर्य",
    desc: "इन्द्रियों का संयम — विशेषतः ब्रह्मचर्य का पालन",
    icon: "🌸",
  },
  {
    name: "अपरिग्रह",
    desc: "संग्रह की सीमा — आवश्यकता से अधिक संचय न करना",
    icon: "⚖️",
  },
];

const ratnas = [
  {
    name: "सम्यक् दर्शन",
    desc: "वस्तुस्वरूप का यथार्थ श्रद्धान — सही विश्वास",
    icon: "👁️",
  },
  {
    name: "सम्यक् ज्ञान",
    desc: "जीवादि पदार्थों का यथार्थ ज्ञान — सही बोध",
    icon: "📖",
  },
  {
    name: "सम्यक् चारित्र",
    desc: "पाप-कर्मों का त्याग और धर्म का आचरण — सही आचरण",
    icon: "🌟",
  },
];

const symbols = [
  {
    name: "ॐ",
    meaning: "पंच परमेष्ठी का प्रतीक",
    significance:
      "अरिहंत, सिद्ध, आचार्य, उपाध्याय और साधु — पाँचों परमेष्ठी के नाम के पहले अक्षरों से बना ओंकार।",
    icon: "🔱",
  },
  {
    name: "स्वास्तिक",
    meaning: "चार गतियों का प्रतीक",
    significance:
      "चार गतियाँ — देव, मनुष्य, तिर्यंच और नरक — जीव का भव-भ्रमण। स्वास्तिक मोक्ष-मार्ग का प्रतीक भी है।",
    icon: "卐",
  },
  {
    name: "जैन ध्वज",
    meaning: "पाँच रंगों का ध्वज",
    significance:
      "लाल, पीला, सफेद, हरा और गहरा नीला — पंच परमेष्ठी के पाँच रंग। जैन समुदाय की एकता का प्रतीक।",
    icon: "🚩",
  },
  {
    name: "सिद्ध चक्र",
    meaning: "नव-देवता का चक्र",
    significance:
      "अरिहंत, सिद्ध, आचार्य, उपाध्याय, साधु, दर्शन, ज्ञान, चारित्र और तप — नौ देवताओं का चक्र।",
    icon: "☸️",
  },
  {
    name: "अहिंसा प्रतीक",
    meaning: "हथेली पर चक्र",
    significance:
      "ऊपर उठी हथेली में चक्र — 'अहिंसा' लिखा हुआ। हर जीव के प्रति करुणा और अहिंसा का आह्वान।",
    icon: "🤲",
  },
];

const timeline = [
  {
    year: "~3000 ई.पू.",
    event: "ऋषभदेव (आदिनाथ)",
    detail: "प्रथम तीर्थंकर — इस काल-चक्र के पहले धर्म-प्रवर्तक",
  },
  {
    year: "~600 ई.पू.",
    event: "पार्श्वनाथ",
    detail: "२३वें तीर्थंकर — अहिंसा-सत्य-अस्तेय-अपरिग्रह के प्रवर्तक",
  },
  {
    year: "599 ई.पू.",
    event: "महावीर स्वामी जन्म",
    detail: "वैशाली में जन्म — २४वें और अंतिम तीर्थंकर",
  },
  {
    year: "527 ई.पू.",
    event: "महावीर निर्वाण",
    detail: "पावापुरी में दीपावली की रात — मोक्ष प्राप्ति",
  },
  {
    year: "~300 ई.पू.",
    event: "जैन धर्म का प्रसार",
    detail: "मगध, कलिंग और दक्षिण भारत में जैन धर्म का विस्तार",
  },
  {
    year: "~200 ई.",
    event: "दिगंबर–श्वेतांबर विभाजन",
    detail: "भद्रबाहु और स्थूलभद्र के बाद दो परंपराओं का जन्म",
  },
  {
    year: "मध्यकाल",
    event: "मंदिर निर्माण काल",
    detail: "दिलवाड़ा, रणकपुर, गिरनार — भव्य जैन मंदिरों का निर्माण",
  },
  {
    year: "आधुनिक युग",
    event: "जैन धर्म विश्व में",
    detail: "भारत के अतिरिक्त अमेरिका, ब्रिटेन, अफ्रीका में जैन समुदाय",
  },
];

const literature = [
  {
    category: "12 अंग (द्वादश अंग)",
    items: [
      "आचारांग सूत्र",
      "सूत्रकृतांग",
      "स्थानांग",
      "समवायांग",
      "भगवती सूत्र",
      "ज्ञाताधर्म कथा",
      "उपासकदशांग",
      "अंतकृद्दशांग",
      "अनुत्तरोपादिक दशांग",
      "प्रश्नव्याकरण",
      "विपाकसूत्र",
      "दृष्टिवाद (लुप्त)",
    ],
  },
  {
    category: "12 उपांग",
    items: [
      "औपापातिक",
      "राजप्रश्नीय",
      "जीवाभिगम",
      "प्रज्ञापना",
      "जंबूद्वीपप्रज्ञप्ति",
      "चंद्रप्रज्ञप्ति",
      "सूर्यप्रज्ञप्ति",
      "निरयावलिका",
      "कल्पावतंसिका",
      "पुष्पिका",
      "पुष्पचूलिका",
      "वृष्णिदशा",
    ],
  },
  {
    category: "मूल सूत्र",
    items: ["उत्तराध्ययन सूत्र", "आवश्यक सूत्र", "दशवैकालिक", "पिंडनिर्युक्ति"],
  },
  {
    category: "प्रमुख दर्शन-ग्रंथ",
    items: [
      "तत्त्वार्थसूत्र (उमास्वामी)",
      "समयसार (कुंदकुंद)",
      "नियमसार",
      "पंचास्तिकाय",
      "अष्टपाहुड",
    ],
  },
];

const philosophy = [
  {
    title: "जीव-अजीव (चेतन-अचेतन)",
    desc: "जीव = चेतन, ज्ञान-दर्शन-सुख स्वभावी। अजीव = जड़ — पुद्गल, धर्म, अधर्म, आकाश, काल। दोनों अनादि और नित्य हैं।",
    icon: "☯️",
  },
  {
    title: "कर्म सिद्धांत",
    desc: "कर्म सूक्ष्म पुद्गल कण हैं जो आत्मा से चिपकते हैं। राग-द्वेष से आस्रव होता है, संयम से संवर होता है, तप से निर्जरा होती है।",
    icon: "⚙️",
  },
  {
    title: "मोक्ष",
    desc: "समस्त कर्मों के क्षय से आत्मा लोकाग्र (सिद्धशिला) पर पहुँचती है। वहाँ अनंत ज्ञान, अनंत दर्शन, अनंत सुख और अनंत वीर्य की प्राप्ति होती है।",
    icon: "🌟",
  },
  {
    title: "अनेकांतवाद",
    desc: "कोई भी वस्तु अनेक धर्मों से युक्त है। एकांगी दृष्टि से सत्य का पूर्ण बोध नहीं होता। सत्य सापेक्ष और बहुआयामी है।",
    icon: "🔮",
  },
  {
    title: "स्याद्वाद",
    desc: "'स्यात्' = 'किसी दृष्टि से'। प्रत्येक कथन सापेक्ष है। सप्तभंगी नय — सात प्रकार से वस्तु का वर्णन संभव।",
    icon: "⚖️",
  },
  {
    title: "रत्नत्रय",
    desc: "सम्यक् दर्शन + सम्यक् ज्ञान + सम्यक् चारित्र — ये तीनों मिलकर मोक्ष-मार्ग बनाते हैं। इनमें से एक के बिना मोक्ष संभव नहीं।",
    icon: "💎",
  },
];

const festivals = [
  {
    name: "पर्युषण पर्व",
    timing: "भाद्रपद शुक्ल पंचमी से (श्वेतांबर 8 दिन, दिगंबर 10 दिन)",
    significance:
      "वर्ष का सबसे पवित्र पर्व — आत्मशोधन, क्षमापना, उपवास और प्रवचन का पर्व",
    rituals: "उपवास / एकाशन, प्रवचन श्रवण, क्षमापना (मिच्छामि दुक्कडम), संवत्सरी पर्व",
  },
  {
    name: "महावीर जयंती",
    timing: "चैत्र शुक्ल त्रयोदशी",
    significance: "२४वें तीर्थंकर भगवान महावीर का जन्मोत्सव — अहिंसा और समता का संदेश",
    rituals: "जिन-पूजन, रथयात्रा, प्रभातफेरी, प्रवचन, निर्धन-सेवा",
  },
  {
    name: "दीपावली (महावीर निर्वाण)",
    timing: "कार्तिक कृष्ण अमावस्या",
    significance: "महावीर स्वामी के निर्वाण (मोक्ष) की स्मृति में — जैनों का नव वर्षारंभ",
    rituals: "जिन-पूजन, दीपदान, लक्ष्मी-पूजन, ऋषभदेव की विशेष पूजा",
  },
  {
    name: "अक्षय तृतीया (अखातीज)",
    timing: "वैशाख शुक्ल तृतीया",
    significance:
      "आदिनाथ (ऋषभदेव) ने एक वर्ष के तप के बाद पहला आहार गन्ने के रस से ग्रहण किया",
    rituals: "इक्षु-रस दान, जिन-पूजन, वर्षीतप उद्यापन, दान-पुण्य",
  },
];

const panch_kalyanak = [
  {
    name: "गर्भ कल्याणक",
    desc: "जब तीर्थंकर की आत्मा माँ के गर्भ में आती है — देव-देवियाँ उत्सव मनाते हैं।",
    mahavir: "महावीर: आश्विन कृष्ण पंचमी, वैशाली (विदेह जनपद)",
    icon: "🌙",
  },
  {
    name: "जन्म कल्याणक",
    desc: "तीर्थंकर का जन्म — इंद्र मेरु पर्वत पर अभिषेक करते हैं। देवलोक में आनंद छाता है।",
    mahavir: "महावीर: चैत्र शुक्ल त्रयोदशी, वैशाली के कुंडग्राम में",
    icon: "🌟",
  },
  {
    name: "दीक्षा कल्याणक",
    desc: "तीर्थंकर का राजसिंहासन और संसार त्याग — मुनि-दीक्षा ग्रहण। महान विरक्ति का क्षण।",
    mahavir: "महावीर: मार्गशीर्ष कृष्ण दशमी, ज्ञातृखण्ड वन (वैशाली के निकट)",
    icon: "🕊️",
  },
  {
    name: "केवल-ज्ञान कल्याणक",
    desc: "घाती कर्मों के क्षय पर सर्वज्ञता की प्राप्ति — अनंत ज्ञान, दर्शन। समोशरण की रचना होती है।",
    mahavir: "महावीर: वैशाख शुक्ल दशमी, जृम्भिका (ऋजुवालुका नदी तट पर)",
    icon: "☀️",
  },
  {
    name: "निर्वाण / मोक्ष कल्याणक",
    desc: "समस्त कर्मों के क्षय पर परम-मुक्ति — सिद्धशिला पर अनंत काल के लिए विराजमान।",
    mahavir: "महावीर: कार्तिक कृष्ण अमावस्या, पावापुरी (नालंदा, बिहार)",
    icon: "🌺",
  },
];

export default function JainKnowledgeBase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 22) 0%, oklch(0.24 0.08 40) 100%)",
        }}
      >
        <div className="text-4xl mb-4">☸️</div>
        <h1
          className="text-3xl md:text-4xl font-display font-bold mb-3"
          style={{ color: "oklch(0.92 0.06 75)" }}
        >
          जैन ज्ञानकोश
        </h1>
        <p className="text-base text-white/60 max-w-lg mx-auto mb-6">
          जैन धर्म — पूर्ण परिचय
        </p>
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {[
            { value: "4.9M+", label: "अनुयायी विश्वभर" },
            { value: "24", label: "तीर्थंकर" },
            { value: "2", label: "प्रमुख सम्प्रदाय" },
            { value: "5,000+", label: "वर्ष पुरानी परंपरा" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-2xl font-bold font-display"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {s.value}
              </div>
              <div className="text-xs text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Tabs defaultValue="intro" data-ocid="jain-kb.tabs">
          <TabsList className="flex flex-wrap h-auto gap-1.5 bg-card border border-border rounded-xl p-2 mb-8 overflow-x-auto">
            {[
              { value: "intro", label: "परिचय", Icon: Globe },
              { value: "fundamentals", label: "मूलभूत", Icon: Star },
              { value: "symbols", label: "प्रतीक", Icon: Flower2 },
              { value: "history", label: "इतिहास", Icon: Sunrise },
              { value: "literature", label: "साहित्य", Icon: BookOpen },
              { value: "philosophy", label: "दर्शन", Icon: Feather },
              { value: "festivals", label: "पर्व", Icon: Calendar },
              { value: "kalyanak", label: "पंच कल्याणक", Icon: Layers },
            ].map(({ value, label, Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                data-ocid={`jain-kb.tab.${value}`}
                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab 1 — परिचय */}
          <TabsContent value="intro" data-ocid="jain-kb.intro.section">
            <h2
              className="text-xl font-display font-bold mb-6"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              जैन धर्म का परिचय
            </h2>
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              <InfoCard
                icon="🌍"
                title="उत्पत्ति एवं विस्तार"
                content="जैन धर्म अनादिकालीन है — इसका आरंभ कोई एक व्यक्ति या घटना से नहीं हुआ। प्रत्येक काल-चक्र में 24 तीर्थंकर धर्म को पुनर्जीवित करते हैं। वर्तमान अवसर्पिणी काल के 24वें और अंतिम तीर्थंकर भगवान महावीर (599–527 ई.पू.) थे।"
              />
              <InfoCard
                icon="🕊️"
                title="मूल संदेश"
                content="अहिंसा परमो धर्मः — जैन धर्म का मूल सूत्र। किसी भी जीव को मन-वचन-काया से कष्ट न देना सबसे बड़ा धर्म है। इसके साथ सत्य, अस्तेय, ब्रह्मचर्य और अपरिग्रह — ये पाँच महाव्रत धर्म की नींव हैं।"
              />
              <InfoCard
                icon="📚"
                title="दो प्रमुख सम्प्रदाय"
                content="दिगंबर: मुनि निर्वस्त्र रहते हैं, मानते हैं कि मूल आगम लुप्त हो गए। श्वेतांबर: मुनि श्वेत वस्त्र धारण करते हैं, आगम-साहित्य मानते हैं। दोनों में मूल सिद्धांत एक हैं।"
              />
              <InfoCard
                icon="🌐"
                title="विश्व में जैन"
                content="विश्वभर में लगभग 49 लाख जैन अनुयायी हैं। भारत में गुजरात, राजस्थान, कर्नाटक, महाराष्ट्र में प्रमुख जैन समुदाय। अमेरिका, ब्रिटेन, कनाडा, अफ्रीका और ऑस्ट्रेलिया में भी जैन समुदाय सक्रिय है।"
              />
            </div>
            <div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(0.62 0.18 48 / 0.1)",
                border: "1px solid oklch(0.62 0.18 48 / 0.2)",
              }}
            >
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                🙏 नवकार महामंत्र
              </h3>
              <p className="text-foreground font-display leading-loose text-base">
                णमो अरिहंताणं। णमो सिद्धाणं। णमो आइरियाणं। णमो उवज्झायाणं। णमो लोए
                सव्वसाहूणं।
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                एसो पंच नमुक्कारो, सव्वपावप्पणासणो। मंगलाणं च सव्वेसिं, पढमं हवइ मंगलं।।
              </p>
            </div>
          </TabsContent>

          {/* Tab 2 — मूलभूत सिद्धांत */}
          <TabsContent
            value="fundamentals"
            data-ocid="jain-kb.fundamentals.section"
          >
            <h2
              className="text-xl font-display font-bold mb-6"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              मूलभूत सिद्धांत
            </h2>
            <h3 className="font-semibold text-foreground mb-4 text-base">
              पाँच महाव्रत
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {mahavratas.map((v) => (
                <div
                  key={v.name}
                  className="rounded-xl p-4 flex gap-3 items-start"
                  style={{
                    background: "oklch(0.18 0.05 28 / 0.6)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  }}
                >
                  <span className="text-2xl">{v.icon}</span>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {v.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {v.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="font-semibold text-foreground mb-4 text-base">
              त्रिरत्न (रत्नत्रय)
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {ratnas.map((r) => (
                <div
                  key={r.name}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: "oklch(0.62 0.18 48 / 0.1)",
                    border: "1px solid oklch(0.62 0.18 48 / 0.25)",
                  }}
                >
                  <div className="text-3xl mb-2">{r.icon}</div>
                  <div className="font-semibold text-foreground text-sm mb-1">
                    {r.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{r.desc}</div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard
                icon="🔮"
                title="अनेकांतवाद"
                content="कोई भी वस्तु अनेक धर्मों से युक्त है। एकांगी दृष्टि से सत्य का पूर्ण बोध नहीं होता। हर व्यक्ति का दृष्टिकोण अपनी जगह सही हो सकता है — इसलिए दूसरों के मत का सम्मान करना जैन धर्म की शिक्षा है।"
              />
              <InfoCard
                icon="⚖️"
                title="स्याद्वाद (सप्तभंगी)"
                content="'स्यात्' अर्थात् 'किसी दृष्टि से'। प्रत्येक कथन सापेक्ष होता है। सात प्रकार — स्यादस्ति, स्यान्नास्ति, स्यादस्तिनास्ति, स्यादवक्तव्यम्, स्यादस्तिच अवक्तव्यं, स्यान्नास्तिच अवक्तव्यं, स्यादस्तिनास्ति अवक्तव्यम्।"
              />
            </div>
          </TabsContent>

          {/* Tab 3 — जैन प्रतीक */}
          <TabsContent value="symbols" data-ocid="jain-kb.symbols.section">
            <h2
              className="text-xl font-display font-bold mb-6"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              जैन प्रतीक
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {symbols.map((s, i) => (
                <div
                  key={s.name}
                  data-ocid={`jain-kb.symbol.item.${i + 1}`}
                  className="rounded-2xl p-5"
                  style={{
                    background: "oklch(0.18 0.05 28 / 0.6)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  <div className="text-5xl mb-4 text-center">{s.icon}</div>
                  <h4 className="font-display font-bold text-foreground text-lg text-center mb-1">
                    {s.name}
                  </h4>
                  <Badge className="mx-auto block w-fit mb-3 text-xs bg-primary/15 text-primary border-primary/25">
                    {s.meaning}
                  </Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed text-center">
                    {s.significance}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tab 4 — इतिहास */}
          <TabsContent value="history" data-ocid="jain-kb.history.section">
            <h2
              className="text-xl font-display font-bold mb-6"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              जैन इतिहास — कालरेखा
            </h2>
            <div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(0.18 0.05 28 / 0.6)",
                border: "1px solid oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              {timeline.map((t) => (
                <TimelineItem
                  key={t.year}
                  year={t.year}
                  event={t.event}
                  detail={t.detail}
                />
              ))}
            </div>
          </TabsContent>

          {/* Tab 5 — साहित्य */}
          <TabsContent
            value="literature"
            data-ocid="jain-kb.literature.section"
          >
            <h2
              className="text-xl font-display font-bold mb-6"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              जैन साहित्य
            </h2>
            <div className="space-y-5">
              {literature.map((cat) => (
                <div
                  key={cat.category}
                  className="rounded-2xl p-5"
                  style={{
                    background: "oklch(0.18 0.05 28 / 0.6)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  }}
                >
                  <h3
                    className="font-semibold mb-3 text-sm"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tab 6 — दर्शन */}
          <TabsContent
            value="philosophy"
            data-ocid="jain-kb.philosophy.section"
          >
            <h2
              className="text-xl font-display font-bold mb-6"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              जैन दर्शन
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {philosophy.map((p) => (
                <InfoCard
                  key={p.title}
                  icon={p.icon}
                  title={p.title}
                  content={p.desc}
                />
              ))}
            </div>
          </TabsContent>

          {/* Tab 7 — पर्व */}
          <TabsContent value="festivals" data-ocid="jain-kb.festivals.section">
            <h2
              className="text-xl font-display font-bold mb-6"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              जैन पर्व
            </h2>
            <div className="space-y-5">
              {festivals.map((f, i) => (
                <div
                  key={f.name}
                  data-ocid={`jain-kb.festival.item.${i + 1}`}
                  className="rounded-2xl p-5"
                  style={{
                    background: "oklch(0.18 0.05 28 / 0.6)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                    <h3 className="font-display font-bold text-foreground text-base">
                      {f.name}
                    </h3>
                    <Badge className="text-xs bg-primary/15 text-primary border-primary/25 whitespace-nowrap">
                      📅 {f.timing}
                    </Badge>
                  </div>
                  <p className="text-foreground text-sm mb-2">
                    {f.significance}
                  </p>
                  <div
                    className="rounded-lg px-3 py-2 text-xs text-muted-foreground"
                    style={{ background: "oklch(0.22 0.06 30 / 0.5)" }}
                  >
                    🪔 {f.rituals}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tab 8 — पंच कल्याणक */}
          <TabsContent value="kalyanak" data-ocid="jain-kb.kalyanak.section">
            <h2
              className="text-xl font-display font-bold mb-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              पंच कल्याणक
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              प्रत्येक तीर्थंकर के जीवन में पाँच अत्यंत पवित्र घटनाएं होती हैं जिन्हें कल्याणक कहते
              हैं।
            </p>
            <div className="space-y-4">
              {panch_kalyanak.map((k, i) => (
                <div
                  key={k.name}
                  data-ocid={`jain-kb.kalyanak.item.${i + 1}`}
                  className="rounded-2xl p-5 flex gap-4"
                  style={{
                    background: "oklch(0.18 0.05 28 / 0.6)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  }}
                >
                  <div className="text-3xl flex-shrink-0">{k.icon}</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                      <span
                        className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                        style={{
                          background: "oklch(0.78 0.14 75 / 0.2)",
                          color: "oklch(0.78 0.14 75)",
                        }}
                      >
                        {i + 1}
                      </span>
                      {k.name}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-2">
                      {k.desc}
                    </p>
                    <div
                      className="rounded-lg px-3 py-2 text-xs"
                      style={{
                        background: "oklch(0.62 0.18 48 / 0.1)",
                        border: "1px solid oklch(0.62 0.18 48 / 0.2)",
                        color: "oklch(0.78 0.12 60)",
                      }}
                    >
                      ⚡ {k.mahavir}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
