import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Clock,
  ExternalLink,
  FileText,
  Headphones,
  Mic,
  Users,
} from "lucide-react";
import { useState } from "react";

interface JainScripture {
  id: string;
  titleHindi: string;
  titleSanskrit: string;
  author: string;
  era: string;
  language: string;
  description: string;
  status: "available" | "coming-soon";
  tradition: string;
}

const JAIN_SCRIPTURES: JainScripture[] = [
  {
    id: "tattvartha",
    titleHindi: "तत्त्वार्थसूत्र",
    titleSanskrit: "Tattvārtha Sūtra",
    author: "आचार्य उमास्वामी",
    era: "१-३ शताब्दी CE",
    language: "संस्कृत",
    description:
      "जैन दर्शन का सर्वाधिक मान्य ग्रंथ — सात तत्त्वों का प्रामाणिक विवेचन। दिगंबर और श्वेताम्बर दोनों परंपराओं में मान्य।",
    status: "coming-soon",
    tradition: "दोनों",
  },
  {
    id: "acharanga",
    titleHindi: "आचारांग सूत्र",
    titleSanskrit: "Ācārāṅga Sūtra",
    author: "आगमिक परंपरा",
    era: "४-५ शताब्दी BCE",
    language: "अर्धमागधी",
    description:
      "प्रथम अंग — जैन मुनियों के आचार-विचार का विस्तृत वर्णन। भगवान महावीर के साधना-काल का वर्णन।",
    status: "coming-soon",
    tradition: "श्वेताम्बर",
  },
  {
    id: "sutrakratanga",
    titleHindi: "सूत्रकृतांग सूत्र",
    titleSanskrit: "Sūtrakṛtāṅga Sūtra",
    author: "आगमिक परंपरा",
    era: "४-५ शताब्दी BCE",
    language: "अर्धमागधी",
    description: "द्वितीय अंग — दार्शनिक विवाद, अहिंसा और कर्म-सिद्धांत का विवेचन।",
    status: "coming-soon",
    tradition: "श्वेताम्बर",
  },
  {
    id: "samavayanga",
    titleHindi: "समवायांग सूत्र",
    titleSanskrit: "Samavāyāṅga Sūtra",
    author: "आगमिक परंपरा",
    era: "प्राचीन",
    language: "अर्धमागधी",
    description: "चतुर्थ अंग — संख्यात्मक विवेचन, कोशकीय ग्रंथ।",
    status: "coming-soon",
    tradition: "श्वेताम्बर",
  },
  {
    id: "vyakhyaprajnapti",
    titleHindi: "व्याख्याप्रज्ञप्ति (भगवती)",
    titleSanskrit: "Vyākhyāprajñapti",
    author: "आगमिक परंपरा",
    era: "प्राचीन",
    language: "अर्धमागधी",
    description: "पंचम अंग — संवाद रूप में तत्त्व-विवेचन, ६० हजार प्रश्नोत्तर।",
    status: "coming-soon",
    tradition: "श्वेताम्बर",
  },
  {
    id: "jnatadharmakatha",
    titleHindi: "ज्ञाताधर्मकथा",
    titleSanskrit: "Jñātādharmakathā",
    author: "आगमिक परंपरा",
    era: "प्राचीन",
    language: "अर्धमागधी",
    description: "षष्ठ अंग — नैतिक कथाओं के माध्यम से धर्म-उपदेश।",
    status: "coming-soon",
    tradition: "श्वेताम्बर",
  },
  {
    id: "upasakadhyayana",
    titleHindi: "उपासकाध्ययन",
    titleSanskrit: "Upāsakadaśāḥ",
    author: "आगमिक परंपरा",
    era: "प्राचीन",
    language: "अर्धमागधी",
    description: "सप्तम अंग — श्रावकों के दस आदर्श और उनकी साधना।",
    status: "coming-soon",
    tradition: "श्वेताम्बर",
  },
  {
    id: "antakritdasha",
    titleHindi: "अन्तकृद्दशा",
    titleSanskrit: "Antakṛddaśāḥ",
    author: "आगमिक परंपरा",
    era: "प्राचीन",
    language: "अर्धमागधी",
    description: "अष्टम अंग — ऐसे महापुरुषों की कथाएं जिन्होंने जीवन के अंत में मोक्ष पाया।",
    status: "coming-soon",
    tradition: "श्वेताम्बर",
  },
  {
    id: "anuttaropapadaka",
    titleHindi: "अनुत्तरोपापादकदशा",
    titleSanskrit: "Anuttaropapādakadaśāḥ",
    author: "आगमिक परंपरा",
    era: "प्राचीन",
    language: "अर्धमागधी",
    description: "नवम अंग — अनुत्तर विमान में उत्पन्न होने वाले महात्माओं की कथाएं।",
    status: "coming-soon",
    tradition: "श्वेताम्बर",
  },
  {
    id: "prashnavyakarana",
    titleHindi: "प्रश्नव्याकरण",
    titleSanskrit: "Praśnavyākaraṇa",
    author: "आगमिक परंपरा",
    era: "प्राचीन",
    language: "अर्धमागधी",
    description: "दशम अंग — पाँच अनुव्रतों और उनके आसव-द्वारों का वर्णन।",
    status: "coming-soon",
    tradition: "श्वेताम्बर",
  },
  {
    id: "vipaka",
    titleHindi: "विपाकसूत्र",
    titleSanskrit: "Vipāka Sūtra",
    author: "आगमिक परंपरा",
    era: "प्राचीन",
    language: "अर्धमागधी",
    description: "एकादश अंग — कर्म-फल की कथाएं। पुण्य और पाप के परिणाम।",
    status: "coming-soon",
    tradition: "श्वेताम्बर",
  },
  {
    id: "kalpasutra",
    titleHindi: "कल्पसूत्र",
    titleSanskrit: "Kalpa Sūtra",
    author: "आचार्य भद्रबाहु",
    era: "३ शताब्दी BCE",
    language: "अर्धमागधी",
    description: "चौबीस तीर्थंकरों का संक्षिप्त जीवन-चरित्र। पर्युषण पर्व पर पाठ।",
    status: "available",
    tradition: "श्वेताम्बर",
  },
  {
    id: "bhagavatisutra",
    titleHindi: "भगवती सूत्र",
    titleSanskrit: "Bhagavatī Sūtra",
    author: "आगमिक परंपरा",
    era: "प्राचीन",
    language: "अर्धमागधी",
    description: "व्याख्याप्रज्ञप्ति का विस्तृत रूप — जैन का विशालतम आगम ग्रंथ।",
    status: "coming-soon",
    tradition: "श्वेताम्बर",
  },
  {
    id: "dravyasangraha",
    titleHindi: "द्रव्यसंग्रह",
    titleSanskrit: "Dravyasaṃgraha",
    author: "आचार्य नेमिचंद्र",
    era: "११ शताब्दी CE",
    language: "प्राकृत",
    description: "छः द्रव्यों का संक्षिप्त किंतु प्रामाणिक विवेचन।",
    status: "coming-soon",
    tradition: "दिगंबर",
  },
  {
    id: "niyamasara",
    titleHindi: "नियमसार",
    titleSanskrit: "Niyamasāra",
    author: "आचार्य कुंदकुंद",
    era: "१-३ शताब्दी CE",
    language: "प्राकृत",
    description: "आत्मा की स्वाभाविक शुद्धता और उसकी साधना — परमागमिक ग्रंथ।",
    status: "coming-soon",
    tradition: "दिगंबर",
  },
  {
    id: "panchastikaya",
    titleHindi: "पंचास्तिकाय",
    titleSanskrit: "Pañcāstikāya",
    author: "आचार्य कुंदकुंद",
    era: "१-३ शताब्दी CE",
    language: "प्राकृत",
    description: "पाँच अस्तिकायों (जीव, पुद्गल, धर्म, अधर्म, आकाश) का तत्त्व-विवेचन।",
    status: "coming-soon",
    tradition: "दिगंबर",
  },
];

const ARTICLES = [
  {
    id: 1,
    title: "जैन अनेकांतवाद और आधुनिक विज्ञान",
    author: "डॉ. महेश जैन",
    category: "दर्शन",
  },
  {
    id: 2,
    title: "अहिंसा: जैन धर्म का मूल सिद्धांत",
    author: "प्रो. सुमित्रा देवी",
    category: "नैतिकता",
  },
  {
    id: 3,
    title: "पर्युषण पर्व का आध्यात्मिक महत्व",
    author: "मुनिश्री ज्ञानसागर",
    category: "पर्व",
  },
  {
    id: 4,
    title: "जैन कर्म-सिद्धांत: एक समग्र दृष्टि",
    author: "डॉ. रमेश शास्त्री",
    category: "दर्शन",
  },
  {
    id: 5,
    title: "तीर्थंकरों का जीवन और उनकी शिक्षाएं",
    author: "आचार्य विजयसागर",
    category: "इतिहास",
  },
  {
    id: 6,
    title: "जैन ध्यान: समभाव और आत्म-शुद्धि",
    author: "डॉ. प्रभा जैन",
    category: "साधना",
  },
  {
    id: 7,
    title: "स्याद्वाद: सत्य की सापेक्षता",
    author: "प्रो. अनिल गुप्ता",
    category: "दर्शन",
  },
  {
    id: 8,
    title: "जैन जीवनशैली और पर्यावरण संरक्षण",
    author: "डॉ. शांति देवी",
    category: "पर्यावरण",
  },
  {
    id: 9,
    title: "नवकार मंत्र: पाँच परमेष्ठियों की वंदना",
    author: "संग्रह",
    category: "साधना",
  },
  {
    id: 10,
    title: "जैन समाज और समाज-सेवा की परंपरा",
    author: "डॉ. सुरेश जैन",
    category: "समाज",
  },
];

const AUDIOBOOKS = [
  {
    id: 1,
    title: "भगवान महावीर का जीवन-चरित्र",
    narrator: "स्वर: अनुराग जैन",
    duration: "3 घंटे",
    status: "coming-soon",
  },
  {
    id: 2,
    title: "तत्त्वार्थसूत्र — श्रव्य पाठ",
    narrator: "स्वर: संग्रह",
    duration: "4 घंटे",
    status: "coming-soon",
  },
  {
    id: 3,
    title: "कल्पसूत्र — पर्युषण पाठ",
    narrator: "स्वर: परंपरागत",
    duration: "2 घंटे",
    status: "coming-soon",
  },
  {
    id: 4,
    title: "जैन बाल कथाएं",
    narrator: "स्वर: साधना मिश्रा",
    duration: "1 घंटा",
    status: "coming-soon",
  },
  {
    id: 5,
    title: "णमोकार मंत्र का विस्तृत अर्थ",
    narrator: "स्वर: आचार्य संग्रह",
    duration: "30 मिनट",
    status: "coming-soon",
  },
];

const SAMPLE_BOOKS = [
  { id: 1, title: "जैन बाल कथाएं — भाग 1", ageGroup: "6-10 वर्ष" },
  { id: 2, title: "तीर्थंकर कथाएं (बाल संस्करण)", ageGroup: "8-14 वर्ष" },
  { id: 3, title: "अहिंसा की कहानियाँ", ageGroup: "5-9 वर्ष" },
];

type TabId = "shastra" | "lekh" | "audio" | "bal" | "yuva";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "shastra", label: "शास्त्र ग्रंथ", icon: <BookOpen className="w-4 h-4" /> },
  { id: "lekh", label: "लेख", icon: <FileText className="w-4 h-4" /> },
  { id: "audio", label: "ऑडियो बुक्स", icon: <Headphones className="w-4 h-4" /> },
  { id: "bal", label: "बाल विभाग", icon: <Users className="w-4 h-4" /> },
  {
    id: "yuva",
    label: "युवा विभाग",
    icon: <ExternalLink className="w-4 h-4" />,
  },
];

export default function JainBooksLibrary() {
  const [activeTab, setActiveTab] = useState<TabId>("shastra");

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
              "radial-gradient(circle at 70% 40%, oklch(0.78 0.14 75) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BookOpen
              className="w-8 h-8"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <h1
              className="font-display text-3xl md:text-5xl font-bold"
              style={{ color: "oklch(0.88 0.10 75)" }}
            >
              जैन पुस्तक संग्रह
            </h1>
          </div>
          <p className="text-base text-muted-foreground">
            जैन शास्त्र, लेख, ऑडियो बुक्स और बाल-युवा साहित्य का संग्रह
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
                data-ocid={`books.tab.${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
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
          {/* Tab: Shastra */}
          {activeTab === "shastra" && (
            <div>
              <p className="text-sm text-muted-foreground mb-6">
                {JAIN_SCRIPTURES.length} प्रमुख जैन शास्त्र ग्रंथ
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {JAIN_SCRIPTURES.map((s, i) => (
                  <div
                    key={s.id}
                    data-ocid={`books.shastra.item.${i + 1}`}
                    className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3
                          className="font-display font-bold text-base"
                          style={{ color: "oklch(0.88 0.10 75)" }}
                        >
                          {s.titleHindi}
                        </h3>
                        <p className="text-xs text-muted-foreground italic">
                          {s.titleSanskrit}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs flex-shrink-0"
                        style={{
                          borderColor: "oklch(0.72 0.18 55 / 0.4)",
                          color: "oklch(0.72 0.18 55)",
                        }}
                      >
                        {s.tradition}
                      </Badge>
                    </div>
                    <div className="flex gap-3 mb-3 text-xs text-muted-foreground flex-wrap">
                      <span>✍️ {s.author}</span>
                      <span>🗓️ {s.era}</span>
                      <span>🔤 {s.language}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {s.description}
                    </p>
                    <Button
                      size="sm"
                      variant={s.status === "available" ? "default" : "outline"}
                      disabled={s.status === "coming-soon"}
                      data-ocid={`books.shastra.read_button.${i + 1}`}
                      className="gap-1.5 text-xs"
                    >
                      {s.status === "available" ? (
                        <>
                          <BookOpen className="w-3 h-3" /> पढ़ें
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" /> शीघ्र आ रहा है
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Lekh */}
          {activeTab === "lekh" && (
            <div>
              <p className="text-sm text-muted-foreground mb-6">
                जैन दर्शन, नैतिकता और समाज पर विद्वानों के लेख
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ARTICLES.map((a, i) => (
                  <div
                    key={a.id}
                    data-ocid={`books.article.item.${i + 1}`}
                    className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                  >
                    <Badge variant="secondary" className="text-xs mb-2">
                      {a.category}
                    </Badge>
                    <h3 className="font-display font-bold text-sm mb-1 text-foreground">
                      {a.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {a.author}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled
                      className="text-xs gap-1"
                    >
                      <Clock className="w-3 h-3" /> शीघ्र आ रहा है
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Audio */}
          {activeTab === "audio" && (
            <div>
              <p className="text-sm text-muted-foreground mb-6">
                जैन शास्त्रों और कथाओं का श्रव्य संग्रह
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AUDIOBOOKS.map((ab, i) => (
                  <div
                    key={ab.id}
                    data-ocid={`books.audio.item.${i + 1}`}
                    className="bg-card border border-border rounded-xl p-5 flex items-start gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.28 0.08 45), oklch(0.35 0.10 55))",
                        border: "2px solid oklch(0.78 0.14 75 / 0.3)",
                      }}
                    >
                      <Mic
                        className="w-5 h-5"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-sm mb-1 text-foreground">
                        {ab.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {ab.narrator}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {ab.duration}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="mt-2 text-xs gap-1"
                      >
                        <Clock className="w-3 h-3" /> शीघ्र आ रहा है
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Bal */}
          {activeTab === "bal" && (
            <div className="space-y-8">
              <div
                className="p-6 rounded-xl border border-border text-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.20 0.06 45), oklch(0.25 0.07 55))",
                }}
              >
                <span className="text-5xl block mb-3">🌸</span>
                <h3
                  className="font-display text-xl font-bold mb-2"
                  style={{ color: "oklch(0.88 0.10 75)" }}
                >
                  जैन बाल विकास केंद्र
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  बच्चों के लिए जैन कथाएं, ऑडियो और पुस्तकें
                </p>
                <Link to="/jain-bal-vikas">
                  <Button data-ocid="books.bal.goto_button" className="gap-2">
                    बाल विकास केंद्र देखें →
                  </Button>
                </Link>
              </div>
              <div>
                <h3
                  className="font-display font-bold text-base mb-4"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  नमूना पुस्तकें
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {SAMPLE_BOOKS.map((b, i) => (
                    <div
                      key={b.id}
                      data-ocid={`books.bal.sample.${i + 1}`}
                      className="bg-card border border-border rounded-xl overflow-hidden"
                    >
                      <div
                        className="aspect-[3/4] flex items-center justify-center text-4xl"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.22 0.06 45), oklch(0.30 0.09 55))",
                        }}
                      >
                        📚
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold text-foreground">
                          {b.title}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {b.ageGroup}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Yuva */}
          {activeTab === "yuva" && (
            <div className="space-y-6">
              <div
                className="p-6 rounded-xl border border-border text-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.20 0.06 45), oklch(0.25 0.07 55))",
                }}
              >
                <span className="text-5xl block mb-3">🔥</span>
                <h3
                  className="font-display text-xl font-bold mb-2"
                  style={{ color: "oklch(0.88 0.10 75)" }}
                >
                  युवा विभाग — शीघ्र आ रहा है
                </h3>
                <p className="text-sm text-muted-foreground">
                  युवाओं के लिए जैन दर्शन, करियर मार्गदर्शन और प्रेरणादायक सामग्री
                </p>
              </div>
              {[
                {
                  emoji: "💡",
                  title: "जैन दर्शन और आधुनिक जीवन",
                  desc: "व्यावहारिक जीवन में जैन मूल्यों का अनुप्रयोग",
                },
                {
                  emoji: "🌱",
                  title: "जैन जीवनशैली और स्वास्थ्य",
                  desc: "जैन आहार, योग और स्वास्थ्य सिद्धांत",
                },
                {
                  emoji: "🌍",
                  title: "अहिंसा और सामाजिक न्याय",
                  desc: "अहिंसा का सामाजिक और राजनैतिक आयाम",
                },
                {
                  emoji: "📱",
                  title: "डिजिटल युग में जैन साधना",
                  desc: "आधुनिक तकनीक और जैन जीवन-शैली का सामंजस्य",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  data-ocid={`books.yuva.item.${i + 1}`}
                  className="bg-card border border-border rounded-xl p-5 flex items-start gap-4"
                >
                  <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                  <div>
                    <h4 className="font-display font-bold text-sm mb-1 text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled
                      className="mt-2 text-xs gap-1"
                    >
                      <Clock className="w-3 h-3" /> शीघ्र आ रहा है
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
