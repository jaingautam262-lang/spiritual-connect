import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, BookOpen, ChevronRight } from "lucide-react";

interface Chapter {
  number: number;
  sutra: string;
  title: string;
  desc: string;
  topics: string[];
}

const chapters: Chapter[] = [
  {
    number: 1,
    sutra: "सम्यग्दर्शन-ज्ञान-चारित्राणि मोक्षमार्गः",
    title: "मोक्षमार्ग — रत्नत्रय",
    desc: "सम्यक् दर्शन, सम्यक् ज्ञान और सम्यक् चारित्र — ये तीन मिलकर मोक्ष का मार्ग हैं। इस अध्याय में ज्ञान के पाँच भेदों और प्रमाण-नय का वर्णन है।",
    topics: [
      "सम्यक् दर्शन",
      "सम्यक् ज्ञान",
      "सम्यक् चारित्र",
      "पाँच ज्ञान",
      "मति-श्रुत-अवधि-मन:पर्यय-केवल",
    ],
  },
  {
    number: 2,
    sutra: "जीवाजीवास्रवबन्धसंवरनिर्जरामोक्षास्तत्त्वम्",
    title: "नव तत्त्व",
    desc: "जीव, अजीव, आश्रव, बन्ध, संवर, निर्जरा, मोक्ष, पुण्य और पाप — नौ तत्त्वों का विस्तृत विवेचन। इन्हें जानना सम्यक् ज्ञान की नींव है।",
    topics: ["जीव", "अजीव", "आश्रव", "बन्ध", "संवर", "निर्जरा", "मोक्ष"],
  },
  {
    number: 3,
    sutra: "लोकाकाशे जीवानाम् वास:",
    title: "लोक — ब्रह्मांड की संरचना",
    desc: "जैन दर्शन के अनुसार लोक की संरचना — अधोलोक, मध्यलोक और ऊर्ध्वलोक का विस्तृत वर्णन। मेरु पर्वत, द्वीप और समुद्रों का वर्णन।",
    topics: ["अधोलोक", "मध्यलोक", "ऊर्ध्वलोक", "मेरु पर्वत", "नरक लोक"],
  },
  {
    number: 4,
    sutra: "देवाः वैमानिका: मनुष्याश्च नारकाश्च",
    title: "देव-मनुष्य-नारक",
    desc: "देव (स्वर्गीय प्राणी), मनुष्य और नारकी प्राणियों का विस्तृत वर्णन — उनकी आयु, शरीर, और गतियों का वर्णन।",
    topics: ["भवनवासी देव", "व्यन्तर देव", "ज्योतिष देव", "वैमानिक देव", "नरक गतियाँ"],
  },
  {
    number: 5,
    sutra: "अजीवकाया: धर्माधर्माकाशपुद्गला:",
    title: "अजीव — अचेतन पदार्थ",
    desc: "धर्मास्तिकाय, अधर्मास्तिकाय, आकाशास्तिकाय और पुद्गलास्तिकाय — अचेतन पदार्थों के स्वभाव और कार्य का विवेचन।",
    topics: ["धर्मास्तिकाय", "अधर्मास्तिकाय", "आकाशास्तिकाय", "पुद्गल", "परमाणु"],
  },
  {
    number: 6,
    sutra: "कायवाङ्मन:कर्मयोगा: आश्रव:",
    title: "कर्म आश्रव — कर्मों का प्रवेश",
    desc: "काय, वचन और मन के योगों से कर्मों का आत्मा में प्रवेश — आश्रव की विस्तृत व्याख्या और कर्म-बंध के कारण।",
    topics: ["काय योग", "वचन योग", "मन योग", "सावद्य योग", "निरवद्य योग"],
  },
  {
    number: 7,
    sutra: "व्रत-समिति-गुप्ति-धर्मानुप्रेक्षा-परीषहजय-चारित्राणि संवर:",
    title: "संवर-निर्जरा — कर्मों का निरोध",
    desc: "व्रत, समिति, गुप्ति, धर्म, अनुप्रेक्षा, परीषह-जय और चारित्र — इनसे नये कर्मों का प्रवेश रुकता है और पुराने कर्मों की निर्जरा होती है।",
    topics: ["पंच महाव्रत", "पंच समिति", "तीन गुप्ति", "बारह अनुप्रेक्षा", "बारह तप"],
  },
  {
    number: 8,
    sutra: "मिथ्यादर्शनाविरतिप्रमादकषाययोगा बन्धहेतव:",
    title: "बन्ध — कर्म बंधन",
    desc: "मिथ्यादर्शन, अविरति, प्रमाद, कषाय और योग — ये पाँच बन्ध के कारण हैं। कर्मों के प्रकृति-स्थिति-अनुभव-प्रदेश भेद का विवेचन।",
    topics: ["मिथ्यादर्शन", "अविरति", "प्रमाद", "कषाय (4)", "आठ कर्म प्रकृतियाँ"],
  },
  {
    number: 9,
    sutra: "मोक्षस्तेषामन्तक्रिया",
    title: "मोक्ष — आत्यंतिक मुक्ति",
    desc: "समस्त कर्मों के नाश से मोक्ष की प्राप्ति होती है। मुक्त आत्मा के स्वभाव, स्थान और सुख का वर्णन।",
    topics: ["घातिया कर्म नाश", "अघातिया कर्म नाश", "सिद्ध लोक", "सिद्ध के गुण"],
  },
  {
    number: 10,
    sutra: "सिद्धाः सर्वदोषमुक्ताः",
    title: "सिद्ध — मुक्त आत्माएँ",
    desc: "समस्त दोषों से मुक्त सिद्ध परमात्माओं के अनन्त ज्ञान, अनन्त दर्शन, अनन्त सुख और अनन्त वीर्य का वर्णन।",
    topics: ["अनन्त ज्ञान", "अनन्त दर्शन", "अनन्त सुख", "अनन्त वीर्य", "सिद्धशिला"],
  },
];

export default function TattvarthaSutra() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-16 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 35), oklch(0.22 0.08 45), oklch(0.20 0.07 38))",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">📜</div>
          <h1
            className="text-4xl md:text-6xl font-display font-bold mb-3"
            style={{ color: "oklch(0.88 0.12 75)" }}
            data-ocid="tattvartha.hero.title"
          >
            तत्त्वार्थसूत्र
          </h1>
          <p className="text-lg mb-1" style={{ color: "oklch(0.75 0.1 70)" }}>
            श्री उमास्वाति आचार्य विरचित
          </p>
          <p className="text-sm text-muted-foreground">
            लगभग ५वीं शताब्दी | जैन दर्शन का सर्वोच्च ग्रन्थ
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        {/* Intro */}
        <Card
          className="p-6 border-border bg-card"
          data-ocid="tattvartha.intro.section"
        >
          <p className="text-base text-foreground leading-relaxed font-body mb-3">
            तत्त्वार्थसूत्र जैन दर्शन का सर्वाधिक महत्त्वपूर्ण और प्रामाणिक ग्रन्थ है। इसे श्री
            उमास्वाति आचार्य ने लगभग ५वीं शताब्दी में रचा था।
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed font-body">
            यह ग्रन्थ 10 अध्यायों और 344–357 सूत्रों में जैन दर्शन के समस्त मूलभूत सिद्धांतों को
            संक्षेप में प्रस्तुत करता है। दिगम्बर और श्वेतांबर — दोनों संप्रदायों में इसे मान्यता
            प्राप्त है।
          </p>
        </Card>

        {/* Status Banner */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl border"
          style={{
            background: "oklch(0.62 0.18 48 / 0.08)",
            borderColor: "oklch(0.62 0.18 48 / 0.3)",
          }}
          data-ocid="tattvartha.status.banner"
        >
          <AlertCircle
            className="h-5 w-5 flex-shrink-0 mt-0.5"
            style={{ color: "oklch(0.62 0.18 48)" }}
          />
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.62 0.18 48)" }}
          >
            <strong>शीघ्र आ रहा है:</strong> यह ग्रन्थ शीघ्र ही पूर्ण रूप से उपलब्ध होगा।
            तब तक प्रत्येक अध्याय का परिचय देखें।
          </p>
        </div>

        {/* Chapter Cards */}
        <section data-ocid="tattvartha.chapters.section">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">
              10 अध्याय
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {chapters.map((ch) => (
              <Card
                key={ch.number}
                className="p-5 border-border bg-card hover:border-primary/30 transition-colors duration-200"
                data-ocid={`tattvartha.chapter.item.${ch.number}`}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.52 0.15 45))",
                      color: "oklch(0.97 0.01 80)",
                    }}
                  >
                    {ch.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-foreground text-sm mb-1">
                      {ch.title}
                    </h3>
                    <p
                      className="text-xs font-mono leading-relaxed italic"
                      style={{ color: "oklch(0.65 0.12 70)" }}
                    >
                      {ch.sutra}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {ch.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {ch.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {ch.topics.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{ch.topics.length - 3}
                    </Badge>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="w-full text-xs"
                  data-ocid={`tattvartha.chapter.read.${ch.number}`}
                >
                  <BookOpen className="h-3 w-3 mr-1.5" />
                  पढ़ें (शीघ्र आ रहा है)
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
