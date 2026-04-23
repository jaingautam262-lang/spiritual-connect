import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

interface IndexCard {
  icon: string;
  title: string;
  desc: string;
  link: string;
  badge?: string;
}

interface IndexSection {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  cards: IndexCard[];
}

const sections: IndexSection[] = [
  {
    id: "aarti",
    title: "आरती",
    subtitle: "जिन भगवान और जैन देवियों की आरती",
    emoji: "🪔",
    cards: [
      {
        icon: "🙏",
        title: "ओम जय महावीर प्रभु",
        desc: "महावीर स्वामी की आरती",
        link: "/aarti",
      },
      {
        icon: "🕯️",
        title: "चंद्रपुरिया की आरती",
        desc: "चंद्रपुरिया पार्श्वनाथ की आरती",
        link: "/aarti",
      },
      {
        icon: "🌺",
        title: "चौदस की आरती",
        desc: "चतुर्दशी विशेष जैन आरती",
        link: "/aarti",
      },
      {
        icon: "✨",
        title: "पद्मावती माता आरती",
        desc: "जैन देवी पद्मावती की आरती",
        link: "/aarti",
      },
      {
        icon: "📿",
        title: "पंच परमेष्ठी आरती",
        desc: "पंच परमेष्ठी की विशेष आरती",
        link: "/aarti",
      },
      {
        icon: "💫",
        title: "आदिनाथ भगवान आरती",
        desc: "प्रथम तीर्थंकर ऋषभदेव की आरती",
        link: "/aarti",
      },
    ],
  },
  {
    id: "chalisa",
    title: "चालीसा",
    subtitle: "24 तीर्थंकर और जैन देवियों की चालीसा",
    emoji: "📖",
    cards: [
      {
        icon: "🏔️",
        title: "ऋषभदेव चालीसा",
        desc: "प्रथम तीर्थंकर की 40 छंदों में स्तुति",
        link: "/chalisa",
      },
      {
        icon: "🌙",
        title: "चंद्रप्रभु चालीसा",
        desc: "8वें तीर्थंकर चंद्रप्रभु की चालीसा",
        link: "/chalisa",
      },
      {
        icon: "🌺",
        title: "पार्श्वनाथ चालीसा",
        desc: "23वें तीर्थंकर पार्श्वनाथ की चालीसा",
        link: "/chalisa",
      },
      {
        icon: "☮️",
        title: "महावीर स्वामी चालीसा",
        desc: "24वें तीर्थंकर महावीर की चालीसा",
        link: "/chalisa",
      },
      {
        icon: "🕊️",
        title: "चौबीस तीर्थंकर चालीसा",
        desc: "24 तीर्थंकरों की संयुक्त चालीसा",
        link: "/chalisa",
      },
      {
        icon: "✨",
        title: "अहिच्छत्र पार्श्वनाथ चालीसा",
        desc: "विशेष तीर्थ की चालीसा",
        link: "/chalisa",
      },
    ],
  },
  {
    id: "stotra",
    title: "स्तोत्र / मंत्र",
    subtitle: "जैन स्तोत्र, मंत्र और स्तुतियाँ",
    emoji: "🔱",
    cards: [
      {
        icon: "📜",
        title: "भक्तामर स्तोत्र",
        desc: "मानतुंगाचार्य रचित — 48 श्लोक",
        link: "/jain-stotra-sangrah",
        badge: "प्रसिद्ध",
      },
      {
        icon: "🛡️",
        title: "उवसग्गहरं स्तोत्र",
        desc: "पार्श्वनाथ का सुरक्षा स्तोत्र",
        link: "/jain-stotra-sangrah",
      },
      {
        icon: "🌸",
        title: "तिजयपहुत्त स्तोत्र",
        desc: "70 तीर्थंकरों का यंत्र मंडल",
        link: "/jain-stotra-sangrah",
      },
      {
        icon: "⚡",
        title: "वज्रपञ्जर स्तोत्रम्",
        desc: "पंच परमेष्ठी का रक्षा कवच",
        link: "/jain-stotra-sangrah",
      },
      {
        icon: "🔮",
        title: "नवकार मंत्र",
        desc: "जैन धर्म का मूल मंत्र",
        link: "/mantra",
      },
      {
        icon: "💎",
        title: "मंगलाष्टक स्तोत्र",
        desc: "8 मंगल श्लोकों का स्तोत्र",
        link: "/jain-stotra-sangrah",
      },
    ],
  },
  {
    id: "puja",
    title: "पूजा विधि",
    subtitle: "जैन पूजा, अभिषेक और विधि-विधान",
    emoji: "🏺",
    cards: [
      {
        icon: "🌊",
        title: "जैन पूजन",
        desc: "अष्टद्रव्य पूजा, जल-चंदन-पुष्प आदि",
        link: "/jain-pujan",
      },
      {
        icon: "🙏",
        title: "मेरी भावना",
        desc: "11 भावना श्लोक — प्रतिदिन पाठ",
        link: "/jain-meri-bhavna",
      },
      {
        icon: "🏺",
        title: "महा अर्घ्य",
        desc: "20 जैन तीर्थों को अर्घ्य अर्पण",
        link: "/jain-meri-bhavna",
      },
      {
        icon: "⭐",
        title: "षोडशकारण पूजा",
        desc: "16 कारण भावना की पूजा",
        link: "/jain-pujan",
      },
      {
        icon: "📿",
        title: "नवग्रहशांति व्रत पूजा",
        desc: "जैन विधि से नवग्रह शांति",
        link: "/jain-meri-bhavna",
      },
      {
        icon: "🌟",
        title: "नंदीश्वर व्रत विधि",
        desc: "नंदीश्वर पर्व की विशेष पूजा",
        link: "/jain-meri-bhavna",
      },
    ],
  },
  {
    id: "katha",
    title: "कथाएँ / व्रत",
    subtitle: "जैन व्रत कथाएँ, वृत्तांत और नीति कथाएँ",
    emoji: "📚",
    cards: [
      {
        icon: "📖",
        title: "जैन व्रत कथाएँ",
        desc: "पर्युषण, दशलक्षण आदि व्रतों की कथाएँ",
        link: "/jain-vrat-kathas",
        badge: "नया",
      },
      {
        icon: "🗺️",
        title: "144 व्रत सूची",
        desc: "समस्त जैन व्रतों की सूची",
        link: "/jain-vrat-144-list",
      },
      {
        icon: "🌟",
        title: "षोडशकारण व्रत कथा",
        desc: "16 कारण भावना की विशेष कथा",
        link: "/jain-vrat-kathas",
      },
      {
        icon: "✨",
        title: "दशलक्षण व्रत कथा",
        desc: "दश धर्म की कथा",
        link: "/jain-vrat-kathas",
      },
      {
        icon: "📜",
        title: "जैन कथाएँ",
        desc: "नीति और प्रेरणादायक जैन कथाएँ",
        link: "/jain-kathayen",
      },
      {
        icon: "🔔",
        title: "श्रुतस्कन्ध व्रत कथा",
        desc: "ज्ञान की महिमा की कथा",
        link: "/jain-vrat-kathas",
      },
    ],
  },
  {
    id: "jnana",
    title: "ज्ञान",
    subtitle: "जैन दर्शन, विश्वकोश और शिक्षा",
    emoji: "💡",
    cards: [
      {
        icon: "🌐",
        title: "जैन विश्वकोश",
        desc: "A–Z जैन शब्दावली और व्याख्या",
        link: "/jain-encyclopedia",
        badge: "विस्तृत",
      },
      {
        icon: "📚",
        title: "जैनीपीडिया",
        desc: "जैन धर्म का सम्पूर्ण ज्ञानकोश",
        link: "/jainipedia",
      },
      {
        icon: "🏛️",
        title: "तत्त्वार्थसूत्र",
        desc: "उमास्वाति रचित — 10 अध्याय",
        link: "/tattvartha-sutra",
        badge: "नया",
      },
      {
        icon: "🎓",
        title: "जैन धर्म ज्ञान",
        desc: "जैन सिद्धांत और दर्शन",
        link: "/jain-dharma-jnana",
      },
      {
        icon: "📿",
        title: "तीर्थंकर परिचय",
        desc: "24 तीर्थंकरों का जीवन परिचय",
        link: "/tirthankars",
      },
      {
        icon: "🏫",
        title: "जैन पाठशाला",
        desc: "जैन शिक्षा और बाल विकास",
        link: "/jain-pathshala",
      },
    ],
  },
];

function SectionCard({ card, idx }: { card: IndexCard; idx: number }) {
  return (
    <Link to={card.link} data-ocid={`jain-index.card.${idx + 1}`}>
      <Card className="p-4 border-border bg-card hover:border-primary/40 hover:bg-card/80 transition-all duration-200 cursor-pointer group h-full">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.88 0.055 75))",
              border: "1px solid oklch(0.78 0.14 75 / 0.25)",
            }}
          >
            {card.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className="font-semibold text-foreground text-sm leading-snug truncate">
                {card.title}
              </h4>
              {card.badge && (
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 flex-shrink-0"
                >
                  {card.badge}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {card.desc}
            </p>
          </div>
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Card>
    </Link>
  );
}

export default function JainContentIndex() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 35), oklch(0.22 0.08 45), oklch(0.18 0.05 30))",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">☸️</div>
          <h1
            className="text-3xl md:text-5xl font-display font-bold mb-3"
            style={{ color: "oklch(0.88 0.12 75)" }}
          >
            जैन सामग्री सूचकांक
          </h1>
          <p className="text-muted-foreground text-base">
            सम्पूर्ण जैन आध्यात्मिक सामग्री — एक स्थान पर
          </p>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto px-4 py-12 space-y-14"
        data-ocid="jain-index.page"
      >
        {sections.map((section) => (
          <section
            key={section.id}
            data-ocid={`jain-index.${section.id}.section`}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{section.emoji}</span>
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">
                  {section.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {section.subtitle}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.cards.map((card, i) => (
                <SectionCard key={card.title} card={card} idx={i} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
