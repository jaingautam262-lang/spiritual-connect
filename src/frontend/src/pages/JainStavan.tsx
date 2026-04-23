import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Flame, Music, Star } from "lucide-react";

const stavantypes = [
  {
    title: "पदस्तवन",
    desc: "श्लोक रूप में स्तुति — संस्कृत या प्राकृत में रचित पद्य स्तुति",
    icon: "📜",
  },
  {
    title: "प्रभातिया",
    desc: "प्रातःकाल गाई जाने वाली स्तुति — भोर के समय की भावपूर्ण स्तुति",
    icon: "🌅",
  },
  {
    title: "चेइतवंदण",
    desc: "जिन चैत्य की वंदना — मंदिर में प्रतिष्ठित जिनबिम्ब की विशेष स्तुति",
    icon: "🛕",
  },
  {
    title: "थुई",
    desc: "संक्षिप्त स्तुति पद — छोटे किंतु भावपूर्ण स्तुति-पद",
    icon: "🌸",
  },
  {
    title: "गुर्जर स्तवन",
    desc: "गुजराती भाषा में स्तवन — मध्ययुगीन गुजराती भक्त कवियों द्वारा रचित",
    icon: "🎵",
  },
  {
    title: "हिंदी स्तवन",
    desc: "हिंदी में गाए जाने वाले स्तवन — आधुनिक भक्ति संगीत परंपरा",
    icon: "🙏",
  },
];

const significance = [
  {
    icon: "🔱",
    title: "भक्ति की नींव",
    desc: "स्तवन जैन भक्ति परंपरा की आत्मा है — यह केवल पूजा नहीं, बल्कि आत्मशुद्धि का मार्ग है।",
  },
  {
    icon: "🧘",
    title: "ध्यान का माध्यम",
    desc: "स्तवन गाने से मन एकाग्र होता है और तीर्थंकर के गुणों का चिंतन होता है।",
  },
  {
    icon: "🌺",
    title: "समाज का बंधन",
    desc: "सामूहिक स्तवन सांघिक जीवन को मजबूत करता है और समुदाय में भावनात्मक एकता लाता है।",
  },
  {
    icon: "📖",
    title: "ज्ञान का वाहन",
    desc: "अनेक स्तवन जैन दर्शन और सिद्धांतों को सुंदर काव्य रूप में प्रस्तुत करते हैं।",
  },
];

const traditionalStavans = [
  "भक्तामर स्तोत्र — मानतुंगाचार्य",
  "कल्याण मंदिर स्तोत्र — सिद्धसेन दिवाकर",
  "उवसग्गहरं स्तोत्र — भद्रबाहु स्वामी",
  "नमिउण स्तवन — आनंदघन जी",
  "ऋषभ जिनेश्वर तुझे नमन — आनंदघन जी",
  "पार्श्वनाथ स्तवन — यशोविजय उपाध्याय",
  "चिंतामणि पार्श्व स्तवन — पद्मविजय जी",
  "मोहन मेरे मन में वसो — देवचंद्रजी",
  "तुम चिन्ता मत करो — आधुनिक स्तवन",
  "सम्यक् दर्शन स्तवन — कवि दीपविजय",
];

export default function JainStavan() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="relative py-16 px-4 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 35) 0%, oklch(0.22 0.08 45) 50%, oklch(0.18 0.05 30) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none flex items-center justify-center text-[18rem] leading-none">
          🎵
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-primary/30 bg-primary/10">
            <Music className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-primary font-medium tracking-wide">
              जैन भक्ति परंपरा
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-display font-bold mb-4"
            style={{ color: "oklch(0.88 0.12 75)" }}
          >
            जैन स्तवन
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            तीर्थंकर भगवान की गुण-स्तुति — भक्ति और आत्मशुद्धि का पवित्र मार्ग
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* What is Stavan */}
        <section data-ocid="stavan.intro.section">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">
              स्तवन क्या है?
            </h2>
          </div>
          <Card className="p-6 border-border bg-card">
            <p className="text-base text-foreground leading-relaxed font-body mb-4">
              स्तवन जैन धर्म में भक्ति का एक महत्वपूर्ण स्वरूप है। यह भगवान जिनेंद्र की गुण-स्तुति
              है जो प्रार्थना के रूप में गाई जाती है।
            </p>
            <p className="text-base text-muted-foreground leading-relaxed font-body mb-4">
              जैन स्तवन परंपरा हजारों वर्ष पुरानी है। संस्कृत, प्राकृत, अपभ्रंश, गुजराती और
              हिंदी — सभी भाषाओं में अनगिनत स्तवनों की रचना हुई है। स्तवन केवल बाह्य उपासना
              नहीं, बल्कि भगवान के गुणों को अपने भीतर उतारने का साधन है।
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed font-body">
              स्तवन में भगवान की अहिंसा, वीतरागता, सर्वज्ञता और करुणा का गुणगान किया
              जाता है। इन्हें गाने से साधक उन्हीं गुणों को आत्मसात करने का संकल्प लेता है।
            </p>
          </Card>
        </section>

        {/* Types of Stavan */}
        <section data-ocid="stavan.types.section">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">
              स्तवन के प्रकार
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stavantypes.map((type, idx) => (
              <Card
                key={type.title}
                className="p-5 border-border bg-card hover:border-primary/40 transition-colors duration-200"
                data-ocid={`stavan.type.item.${idx + 1}`}
              >
                <div className="text-3xl mb-3">{type.icon}</div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {type.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {type.desc}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Significance */}
        <section
          data-ocid="stavan.significance.section"
          className="bg-muted/30 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">
              स्तवन का महत्त्व
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {significance.map((item, i) => (
              <div
                key={item.title}
                className="flex gap-4"
                data-ocid={`stavan.significance.item.${i + 1}`}
              >
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Traditional Stavans */}
        <section data-ocid="stavan.traditional.section">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">
              प्रसिद्ध परंपरागत स्तवन
            </h2>
          </div>
          <Card className="p-6 border-border bg-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {traditionalStavans.map((stavan, i) => (
                <div
                  key={stavan}
                  className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0"
                  data-ocid={`stavan.traditional.item.${i + 1}`}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{
                      background: "oklch(0.62 0.18 48 / 0.15)",
                      color: "oklch(0.62 0.18 48)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">
                    {stavan}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Links */}
        <section data-ocid="stavan.links.section">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">
              और स्तवन देखें
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/jain-stotra-sangrah" data-ocid="stavan.goto-stotra.link">
              <Card className="p-5 border-border bg-card hover:border-primary/40 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    जैन स्तोत्र संग्रह
                  </h3>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">
                  भक्तामर, उवसग्गहरं, तिजयपहुत्त आदि स्तोत्र पढ़ें
                </p>
              </Card>
            </Link>
            <Link to="/bhajan-library" data-ocid="stavan.goto-bhajan.link">
              <Card className="p-5 border-border bg-card hover:border-primary/40 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 mb-2">
                  <Flame className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">भजन लाइब्रेरी</h3>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">
                  जैन भजन और स्तवन संगीत सुनें
                </p>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
