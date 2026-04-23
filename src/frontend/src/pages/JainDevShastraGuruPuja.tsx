import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Printer,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Section {
  id: string;
  title: string;
  subtitle: string;
  mantra: string;
  icon: string;
  paragraphs: string[];
}

const pujaMantraColor = "oklch(0.72 0.18 55)";

const sections: Section[] = [
  {
    id: "dev",
    title: "देव पूजा",
    subtitle: "अरिहंत पूजा",
    icon: "🔱",
    mantra: "ॐ ह्रीं अर्हत्परमेष्ठिभ्यो नमः",
    paragraphs: [
      "अरिहंत देव सर्वज्ञ, वीतराग और हितोपदेशी हैं। उन्होंने समस्त घाती कर्मों का नाश कर सर्वज्ञता प्राप्त की और जगत के जीवों को मोक्ष-मार्ग दिखाया।",
      "देव पूजा में हम अष्ट द्रव्यों से भगवान का अभिषेक और पूजन करते हैं — जल, चंदन, अक्षत, पुष्प, नैवेद्य, दीप, धूप और फल। यह बाह्य पूजा आंतरिक श्रद्धा का प्रतीक है।",
      "जल से अभिषेक करते समय भावना करें कि भगवान का यह शुद्ध स्वरूप हमारी आत्मा को भी शुद्ध करे। चंदन लेपन से शीतलता की भावना — रागादि का शमन हो। पुष्प से पंच परमेष्ठी की भक्ति खिले।",
      "अर्पण-मंत्र: जल चढ़ाते समय — जन्मजरामृत्युविनाशनाय। चंदन — संसारतापविनाशनाय। पुष्प — कामबाणविध्वंसनाय। धूप — अष्टकर्मदहनाय। दीप — मोहांधकारनाशनाय।",
    ],
  },
  {
    id: "shastra",
    title: "शास्त्र पूजा",
    subtitle: "जिन-वाणी पूजा",
    icon: "📖",
    mantra: "ॐ ह्रीं श्रुतदेवतायै नमः",
    paragraphs: [
      "जैन शास्त्र वस्तुतः तीर्थंकर की दिव्यध्वनि से उत्पन्न ज्ञान-राशि है। गणधर भगवंतों ने इस दिव्यध्वनि को आगम-ग्रंथों में संकलित किया। इन शास्त्रों में सत्य का साक्षात् दर्शन होता है।",
      "शास्त्र पूजा हमें ज्ञान के प्रति श्रद्धा और विनम्रता सिखाती है। जिस प्रकार भगवान की प्रतिमा उनका साक्षात् प्रतीक है, उसी प्रकार शास्त्र उनकी वाणी का जीवंत रूप है।",
      "पूजन-विधि: शास्त्र को स्वच्छ चौकी पर रखें। चंदन-अक्षत-पुष्प अर्पित करें। श्रुत-देवता को नमन कर स्वाध्याय का संकल्प लें। प्रतिदिन कम से कम एक पृष्ठ का पारायण करें।",
      "मंत्र-जाप: ॐ नमः श्रुतदेवाय। जिनवाणी को ग्रहण करने से पहले हाथ धोएं, शुद्ध आसन पर बैठें और मन को एकाग्र कर पठन करें।",
    ],
  },
  {
    id: "guru",
    title: "गुरु पूजा",
    subtitle: "आचार्य-उपाध्याय-साधु पूजा",
    icon: "🙏",
    mantra: "ॐ ह्रीं आचार्यपरमेष्ठिभ्यो नमः",
    paragraphs: [
      "पंच परमेष्ठी में आचार्य, उपाध्याय और साधु — ये तीनों गुरु-परंपरा के वाहक हैं। आचार्य संघ के नेता हैं जो 36 मूलगुणों का पालन करते हैं।",
      "उपाध्याय शास्त्रों के अध्येता और प्रवचनकर्ता हैं — वे श्रावकों को ज्ञान-दान करते हैं। साधु पंचमहाव्रत का पालन करते हुए विहार करते हैं।",
      "गुरु-पूजा में हम गुरु के चरणों में शीश नवाते हैं, उनके आशीर्वाद की याचना करते हैं और धर्म-मार्ग पर चलने का संकल्प लेते हैं।",
      "मंत्र: ॐ ह्रीं उपाध्यायपरमेष्ठिभ्यो नमः। ॐ ह्रीं साधुपरमेष्ठिभ्यो नमः। नवकार मंत्र के चार पद — तीसरे से पाँचवें — गुरु-परंपरा की वंदना हैं।",
    ],
  },
];

const jayamalaVerses = [
  {
    num: 1,
    text: "जय जय देव! जय जय जिन! जय जय शास्त्र जगदीश!\nजय जय गुरु गुण सागर, जय जय सिद्ध-महीश!",
  },
  {
    num: 2,
    text: "अरिहंत वंदना करते, मन भाव शुद्ध करते।\nराग द्वेष से मुक्ति, सम्यक् दर्शन भरते।",
  },
  {
    num: 3,
    text: "शास्त्र की ज्योति जगाकर, अज्ञान तिमिर हटाकर।\nमोक्ष का मार्ग दिखाते, जैन धर्म अपनाकर।",
  },
  {
    num: 4,
    text: "गुरु के चरण पखारूं, उनका आशीष लूं।\nउनकी करुणा-दृष्टि से, जीवन सफल करूं।",
  },
  {
    num: 5,
    text: "नव-नव भव को त्यागूं, आत्म-ध्यान में लागूं।\nमोक्ष-नगरी जाऊंगा, पंच-परम नित भागूं।",
  },
  {
    num: 6,
    text: "ॐ नमो अरिहंताणं! ॐ नमो सिद्धाणं!\nॐ नमो आइरियाणं! ॐ नमो उवज्झायाणं!\nॐ नमो लोए सव्वसाहूणं!",
    isMantra: true,
  },
  {
    num: 7,
    text: "इस पूजा का फल मिले, मोक्ष-मार्ग खुले।\nजन्म-जन्म की भटकन से, जीव मुक्त हो चले।",
  },
  {
    num: 8,
    text: "जय जय जिनवर! जय जय गुरुवर!\nजय जय शास्त्र-महासागर!\nजीव-जगत के तारक, जय जय जगत-उद्धारक!",
  },
];

function PujaSection({ section }: { section: Section }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.18 0.05 28 / 0.6)",
        border: "1px solid oklch(0.78 0.14 75 / 0.2)",
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        data-ocid={`dev-shastra-guru.${section.id}.toggle`}
        className="w-full flex items-center justify-between gap-3 px-6 py-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{section.icon}</span>
          <div>
            <h3 className="font-display font-bold text-foreground text-base">
              {section.title}
            </h3>
            <p className="text-xs text-muted-foreground">{section.subtitle}</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-6 pb-6">
          {/* Mantra box */}
          <div
            className="rounded-xl px-5 py-4 mb-5 text-center"
            style={{
              background: "oklch(0.62 0.18 48 / 0.12)",
              border: "1px solid oklch(0.62 0.18 48 / 0.3)",
            }}
          >
            <p
              className="font-display font-semibold text-base leading-relaxed tracking-wide"
              style={{ color: pujaMantraColor }}
            >
              {section.mantra}
            </p>
          </div>

          <div className="space-y-3">
            {section.paragraphs.map((p) => (
              <p
                key={p.slice(0, 30)}
                className="text-muted-foreground text-sm leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function JainDevShastraGuruPuja() {
  const handlePrint = () => window.print();
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "देव शास्त्र गुरु पूजा", url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("लिंक कॉपी हो गया!");
    }
  };

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
        <div className="text-4xl mb-4">🙏</div>
        <h1
          className="text-3xl md:text-4xl font-display font-bold mb-3"
          style={{ color: "oklch(0.92 0.06 75)" }}
        >
          देव शास्त्र गुरु पूजा
        </h1>
        <p className="text-base text-white/60 max-w-md mx-auto mb-6">
          जैन त्रिरत्न की भावनापूर्वक पूजा
        </p>
        <p className="text-sm text-white/45 max-w-xl mx-auto mb-6">
          जैन धर्म में देव (अरिहंत-सिद्ध), शास्त्र (जिन-वाणी) और गुरु (आचार्य-उपाध्याय-साधु) —
          ये तीनों त्रिरत्न हैं जिनकी उपासना से आत्मशुद्धि होती है और मोक्ष-मार्ग प्रशस्त होता
          है।
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrint}
            data-ocid="dev-shastra-guru.print_button"
            className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent text-xs"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5" /> प्रिंट करें
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleShare}
            data-ocid="dev-shastra-guru.share_button"
            className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent text-xs"
          >
            <Share2 className="w-3.5 h-3.5 mr-1.5" /> शेयर करें
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Intro */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "oklch(0.62 0.18 48 / 0.08)",
            border: "1px solid oklch(0.62 0.18 48 / 0.2)",
          }}
        >
          <div className="flex items-start gap-3">
            <BookOpen
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              style={{ color: pujaMantraColor }}
            />
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                पूजा का परिचय
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                देव-शास्त्र-गुरु पूजा जैन साधना का अभिन्न अंग है। इसमें हम अरिहंत भगवान (देव),
                जिन-वाणी (शास्त्र) और पंच-परमेष्ठी की गुरु-परंपरा (गुरु) की त्रिवेणी वंदना
                करते हैं। यह पूजा श्रद्धा, ज्ञान और चारित्र — तीनों के समन्वय की भावना से की
                जाती है।
              </p>
            </div>
          </div>
        </div>

        {/* Three sections */}
        {sections.map((s) => (
          <PujaSection key={s.id} section={s} />
        ))}

        <Separator className="border-border/40" />

        {/* Jayamala */}
        <div
          className="rounded-2xl overflow-hidden"
          data-ocid="dev-shastra-guru.jayamala.section"
          style={{
            background: "oklch(0.18 0.05 28 / 0.6)",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <div className="px-6 py-5 flex items-center gap-3">
            <span className="text-2xl">🎶</span>
            <div>
              <h3 className="font-display font-bold text-foreground text-base">
                जयमाला
              </h3>
              <p className="text-xs text-muted-foreground">पंच परमेष्ठी की स्तुति</p>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            {jayamalaVerses.map((v) => (
              <div
                key={`jayamala-verse-${v.num}`}
                data-ocid={`dev-shastra-guru.jayamala.verse.${v.num}`}
                className="flex gap-3"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.15)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                    color: "oklch(0.78 0.14 75)",
                  }}
                >
                  {v.num}
                </div>
                <p
                  className={`text-sm leading-loose whitespace-pre-line ${
                    (v as { isMantra?: boolean }).isMantra
                      ? "font-display font-semibold"
                      : "text-foreground"
                  }`}
                  style={
                    (v as { isMantra?: boolean }).isMantra
                      ? { color: pujaMantraColor }
                      : undefined
                  }
                >
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div
          className="rounded-2xl p-5 text-center"
          style={{
            background: "oklch(0.62 0.18 48 / 0.1)",
            border: "1px solid oklch(0.62 0.18 48 / 0.2)",
          }}
        >
          <p
            className="font-display font-semibold text-lg mb-1"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            णमो अरिहंताणं
          </p>
          <p className="text-muted-foreground text-xs">
            इस देव-शास्त्र-गुरु पूजा के पुण्य से सम्यक् दर्शन की प्राप्ति हो और मोक्ष-मार्ग प्रशस्त
            हो।
          </p>
        </div>
      </div>
    </div>
  );
}
