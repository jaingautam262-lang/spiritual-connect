import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Flower2, Music, Star } from "lucide-react";
import { useState } from "react";

type TabId = "stotra" | "chalisa" | "bhajan" | "puja";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "stotra", label: "स्तोत्र", icon: <Star className="w-4 h-4" /> },
  { id: "chalisa", label: "चालीसा", icon: <BookOpen className="w-4 h-4" /> },
  { id: "bhajan", label: "भजन", icon: <Music className="w-4 h-4" /> },
  { id: "puja", label: "पूजा विधि", icon: <Flower2 className="w-4 h-4" /> },
];

const JAIN_STOTRAS = [
  {
    id: "bhaktamar",
    name: "भक्तामर स्तोत्र",
    deity: "आदिनाथ",
    verses: 48,
    type: "स्तोत्र",
    available: true,
    description: "मानतुंग आचार्य रचित — ऋषभदेव की स्तुति में महानतम जैन स्तोत्र।",
  },
  {
    id: "uvasaggaharam",
    name: "उवसग्गहरं स्तोत्र",
    deity: "पार्श्वनाथ",
    verses: 8,
    type: "स्तोत्र",
    available: true,
    description: "भदंत वयरस्वामी रचित — पार्श्वनाथ का प्रसिद्ध उपसर्ग-हारक स्तोत्र।",
  },
  {
    id: "namokar",
    name: "णमोकार महामंत्र विस्तार",
    deity: "पंच परमेष्ठि",
    verses: 35,
    type: "मंत्र",
    available: true,
    description: "नवकार मंत्र का विस्तृत विवेचन और भाव।",
  },
  {
    id: "kalyanmandira",
    name: "कल्याण मंदिर स्तोत्र",
    deity: "पार्श्वनाथ",
    verses: 45,
    type: "स्तोत्र",
    available: false,
    description: "कुमुदचंद्र रचित — पार्श्वनाथ की भव्य स्तुति।",
  },
  {
    id: "mahavir-vandana",
    name: "महावीर वंदना",
    deity: "महावीर स्वामी",
    verses: 21,
    type: "स्तुति",
    available: true,
    description: "चौबीसवें तीर्थंकर भगवान महावीर की वंदना।",
  },
  {
    id: "rishabha-stotra",
    name: "ऋषभदेव स्तोत्र",
    deity: "ऋषभदेव",
    verses: 24,
    type: "स्तोत्र",
    available: false,
    description: "प्रथम तीर्थंकर आदिनाथ की स्तुति।",
  },
  {
    id: "jinastuti",
    name: "जिन स्तुति",
    deity: "चतुर्विंशति तीर्थंकर",
    verses: 24,
    type: "स्तुति",
    available: true,
    description: "चौबीसों तीर्थंकरों की सामूहिक स्तुति।",
  },
  {
    id: "siddhachakra",
    name: "सिद्धचक्र स्तोत्र",
    deity: "नवपद",
    verses: 9,
    type: "स्तोत्र",
    available: false,
    description: "नवपद (अरिहंत, सिद्ध, आचार्य आदि) की स्तुति।",
  },
  {
    id: "dasha-dharma",
    name: "दश धर्म स्तोत्र",
    deity: "धर्म",
    verses: 10,
    type: "स्तोत्र",
    available: false,
    description: "दस उत्तम धर्मों की स्तुति।",
  },
  {
    id: "neminath",
    name: "नेमिनाथ स्तोत्र",
    deity: "नेमिनाथ",
    verses: 18,
    type: "स्तोत्र",
    available: false,
    description: "बाईसवें तीर्थंकर नेमिनाथ की स्तुति।",
  },
];

const JAIN_CHALISAS = [
  {
    id: "rishabh-chalisa",
    name: "ऋषभदेव चालीसा",
    deity: "ऋषभदेव / आदिनाथ",
    available: true,
  },
  {
    id: "ajit-chalisa",
    name: "अजितनाथ चालीसा",
    deity: "अजितनाथ",
    available: true,
  },
  {
    id: "sambhav-chalisa",
    name: "संभवनाथ चालीसा",
    deity: "संभवनाथ",
    available: true,
  },
  {
    id: "abhinandan-chalisa",
    name: "अभिनंदन चालीसा",
    deity: "अभिनंदन",
    available: true,
  },
  {
    id: "sumati-chalisa",
    name: "सुमतिनाथ चालीसा",
    deity: "सुमतिनाथ",
    available: true,
  },
  {
    id: "padma-chalisa",
    name: "पद्मप्रभु चालीसा",
    deity: "पद्मप्रभु",
    available: true,
  },
  {
    id: "suparshva-chalisa",
    name: "सुपार्श्वनाथ चालीसा",
    deity: "सुपार्श्वनाथ",
    available: true,
  },
  {
    id: "chandra-chalisa",
    name: "चंद्रप्रभु चालीसा",
    deity: "चंद्रप्रभु",
    available: true,
  },
  {
    id: "suvidhi-chalisa",
    name: "सुविधिनाथ चालीसा",
    deity: "सुविधिनाथ",
    available: true,
  },
  {
    id: "sheetala-chalisa",
    name: "शीतलनाथ चालीसा",
    deity: "शीतलनाथ",
    available: true,
  },
  {
    id: "shreyansa-chalisa",
    name: "श्रेयांसनाथ चालीसा",
    deity: "श्रेयांसनाथ",
    available: true,
  },
  {
    id: "vasupujya-chalisa",
    name: "वासुपूज्य चालीसा",
    deity: "वासुपूज्य",
    available: true,
  },
  {
    id: "vimala-chalisa",
    name: "विमलनाथ चालीसा",
    deity: "विमलनाथ",
    available: true,
  },
  {
    id: "ananta-chalisa",
    name: "अनंतनाथ चालीसा",
    deity: "अनंतनाथ",
    available: true,
  },
  {
    id: "dharma-chalisa",
    name: "धर्मनाथ चालीसा",
    deity: "धर्मनाथ",
    available: true,
  },
  {
    id: "shanti-chalisa",
    name: "शांतिनाथ चालीसा",
    deity: "शांतिनाथ",
    available: true,
  },
  {
    id: "kunthu-chalisa",
    name: "कुंथुनाथ चालीसा",
    deity: "कुंथुनाथ",
    available: true,
  },
  { id: "ara-chalisa", name: "अरनाथ चालीसा", deity: "अरनाथ", available: true },
  {
    id: "malli-chalisa",
    name: "मल्लिनाथ चालीसा",
    deity: "मल्लिनाथ",
    available: true,
  },
  {
    id: "muni-chalisa",
    name: "मुनिसुव्रत चालीसा",
    deity: "मुनिसुव्रतनाथ",
    available: true,
  },
  {
    id: "nami-chalisa",
    name: "नमिनाथ चालीसा",
    deity: "नमिनाथ",
    available: true,
  },
  {
    id: "nemi-chalisa",
    name: "नेमिनाथ चालीसा",
    deity: "नेमिनाथ",
    available: true,
  },
  {
    id: "parshva-chalisa",
    name: "पार्श्वनाथ चालीसा (अहिच्छत्र)",
    deity: "पार्श्वनाथ",
    available: true,
  },
  {
    id: "mahavir-chalisa",
    name: "महावीर स्वामी चालीसा",
    deity: "महावीर स्वामी",
    available: true,
  },
];

const JAIN_BHAJANS = [
  { id: "jb-1", name: "जय जिनेंद्र भजन", deity: "तीर्थंकर", type: "भजन" },
  { id: "jb-2", name: "महावीर स्तुति भजन", deity: "महावीर स्वामी", type: "भजन" },
  { id: "jb-3", name: "णमोकार मंत्र भजन", deity: "पंच परमेष्ठि", type: "मंत्र-भजन" },
  { id: "jb-4", name: "आदिनाथ भजन", deity: "ऋषभदेव", type: "भजन" },
  { id: "jb-5", name: "पार्श्वनाथ भजन", deity: "पार्श्वनाथ", type: "भजन" },
  { id: "jb-6", name: "सिद्धचक्र भजन", deity: "नवपद", type: "भजन" },
  { id: "jb-7", name: "चंदनबाला भजन", deity: "साध्वी चंदनबाला", type: "भक्ति-भजन" },
  { id: "jb-8", name: "बाहुबली भजन", deity: "बाहुबली", type: "भजन" },
  { id: "jb-9", name: "पर्युषण पर्व भजन", deity: "धर्म", type: "पर्व-भजन" },
  { id: "jb-10", name: "क्षमावाणी भजन", deity: "धर्म", type: "पर्व-भजन" },
];

const PUJA_METHODS = [
  {
    id: "pm-1",
    name: "षट्खंड पूजन",
    description: "जिनेंद्र की षट्खंड पूजा — जल, चंदन, पुष्प, धूप, दीप, नैवेद्य से",
    route: "/jain-pujan",
    available: true,
  },
  {
    id: "pm-2",
    name: "अभिषेक पूजा",
    description: "पंचामृत अभिषेक विधि — दूध, दही, घी, शहद, जल से",
    route: "/jain-pujan",
    available: true,
  },
  {
    id: "pm-3",
    name: "अष्ट प्रकारी पूजा",
    description: "आठ प्रकार की सामग्री से जिन-पूजन की विधि",
    route: "/jain-pujan",
    available: true,
  },
  {
    id: "pm-4",
    name: "नवपद (सिद्धचक्र) पूजा",
    description: "नौ पदों की पूजा — विशेष अर्घ्य और मंत्रों के साथ",
    route: "/jain-pujan",
    available: true,
  },
  {
    id: "pm-5",
    name: "सोलह कारण व्रत पूजा",
    description: "षोडशकारण भावनाओं की पूजा-विधि",
    route: "/jain-pujan",
    available: true,
  },
  {
    id: "pm-6",
    name: "दशलक्षण पर्व पूजा",
    description: "दस उत्तम धर्मों पर आधारित पर्युषण पूजन",
    route: "/jain-pujan",
    available: true,
  },
  {
    id: "pm-7",
    name: "तीर्थंकर अभिषेक",
    description: "चौबीस तीर्थंकरों का विधिपूर्वक अभिषेक",
    route: "/jain-pujan",
    available: true,
  },
  {
    id: "pm-8",
    name: "श्रुतस्कंध पूजा",
    description: "श्रुत (जिनवाणी) की पूजा-विधि",
    route: "/jain-pujan",
    available: false,
  },
];

export default function JainPoojasSangreh() {
  const [activeTab, setActiveTab] = useState<TabId>("stotra");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="py-12 px-4 relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 30), oklch(0.22 0.07 45), oklch(0.18 0.05 28))",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, oklch(0.78 0.14 75) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Flower2
              className="w-8 h-8"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <h1
              className="font-display text-3xl md:text-5xl font-bold"
              style={{ color: "oklch(0.88 0.10 75)" }}
            >
              जैन पूजा संग्रह
            </h1>
          </div>
          <p className="text-base text-muted-foreground">
            स्तोत्र, चालीसा, भजन और पूजा विधियों का संग्रह
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                data-ocid={`puja.tab.${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
                style={
                  activeTab === tab.id
                    ? { background: "oklch(0.72 0.18 55)" }
                    : {}
                }
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Stotra Tab */}
          {activeTab === "stotra" && (
            <div>
              <p className="text-sm text-muted-foreground mb-6">
                {JAIN_STOTRAS.length} जैन स्तोत्र
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {JAIN_STOTRAS.map((s, i) => (
                  <div
                    key={s.id}
                    data-ocid={`puja.stotra.item.${i + 1}`}
                    className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.88 0.055 75))",
                          border: "2px solid oklch(0.78 0.14 75 / 0.3)",
                        }}
                      >
                        🙏
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {s.type}
                          </Badge>
                          {s.available && (
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{
                                borderColor: "oklch(0.62 0.16 140 / 0.4)",
                                color: "oklch(0.62 0.16 140)",
                              }}
                            >
                              उपलब्ध
                            </Badge>
                          )}
                        </div>
                        <h3
                          className="font-display font-bold text-base leading-snug"
                          style={{ color: "oklch(0.88 0.10 75)" }}
                        >
                          {s.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          देवता: {s.deity} • {s.verses} पद्य
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {s.description}
                    </p>
                    <Link to="/jain-stotra-sangrah">
                      <Button
                        size="sm"
                        variant={s.available ? "default" : "outline"}
                        data-ocid={`puja.stotra.read_button.${i + 1}`}
                        className="gap-1.5 text-xs"
                      >
                        <BookOpen className="w-3 h-3" />
                        {s.available ? "पढ़ें" : "शीघ्र आ रहा है"}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chalisa Tab */}
          {activeTab === "chalisa" && (
            <div>
              <p className="text-sm text-muted-foreground mb-6">
                {JAIN_CHALISAS.length} जैन चालीसा — चौबीस तीर्थंकर
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {JAIN_CHALISAS.map((c, i) => (
                  <div
                    key={c.id}
                    data-ocid={`puja.chalisa.item.${i + 1}`}
                    className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors flex items-center gap-3"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.88 0.055 75))",
                        border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                      }}
                    >
                      <span
                        className="text-sm font-bold"
                        style={{ color: "oklch(0.55 0.15 48)" }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        {c.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{c.deity}</p>
                    </div>
                    <Link to="/chalisa">
                      <Button
                        size="sm"
                        variant="ghost"
                        data-ocid={`puja.chalisa.link.${i + 1}`}
                        className="flex-shrink-0 p-1.5"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bhajan Tab */}
          {activeTab === "bhajan" && (
            <div>
              <p className="text-sm text-muted-foreground mb-6">
                {JAIN_BHAJANS.length} जैन भजन
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {JAIN_BHAJANS.map((b, i) => (
                  <div
                    key={b.id}
                    data-ocid={`puja.bhajan.item.${i + 1}`}
                    className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors flex items-center gap-3"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.22 0.06 45), oklch(0.30 0.09 55))",
                        border: "2px solid oklch(0.78 0.14 75 / 0.3)",
                      }}
                    >
                      🎵
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {b.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {b.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {b.deity}
                        </span>
                      </div>
                    </div>
                    <Link to="/bhajan-library">
                      <Button
                        size="sm"
                        variant="ghost"
                        data-ocid={`puja.bhajan.link.${i + 1}`}
                        className="flex-shrink-0 p-1.5"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link to="/bhajan-library">
                  <Button
                    variant="outline"
                    data-ocid="puja.bhajan.library_button"
                    className="gap-2"
                  >
                    <Music className="w-4 h-4" /> सम्पूर्ण भजन पुस्तकालय →
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Puja Tab */}
          {activeTab === "puja" && (
            <div>
              <p className="text-sm text-muted-foreground mb-6">
                {PUJA_METHODS.length} पूजा विधियाँ
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {PUJA_METHODS.map((p, i) => (
                  <div
                    key={p.id}
                    data-ocid={`puja.vidhi.item.${i + 1}`}
                    className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.88 0.055 75))",
                          border: "2px solid oklch(0.78 0.14 75 / 0.3)",
                        }}
                      >
                        🌺
                      </div>
                      <div>
                        <h3
                          className="font-display font-bold text-base"
                          style={{ color: "oklch(0.88 0.10 75)" }}
                        >
                          {p.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                    <Link to="/jain-pujan">
                      <Button
                        size="sm"
                        variant={p.available ? "default" : "outline"}
                        disabled={!p.available}
                        data-ocid={`puja.vidhi.link.${i + 1}`}
                        className="gap-1.5 text-xs"
                      >
                        <Flower2 className="w-3 h-3" />
                        {p.available ? "पूजा विधि देखें" : "शीघ्र आ रहा है"}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link to="/jain-pujan">
                  <Button
                    variant="outline"
                    data-ocid="puja.goto_pujan_button"
                    className="gap-2"
                  >
                    <Flower2 className="w-4 h-4" /> सम्पूर्ण जैन पूजन →
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
