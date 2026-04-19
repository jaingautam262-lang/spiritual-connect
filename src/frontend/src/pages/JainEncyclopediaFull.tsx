import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type JainVolume, jainVolumes } from "@/data/jainEncyclopediaVolumes";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

const jainLearningHubLinks = [
  {
    path: "/jain-pathshala",
    icon: "🎓",
    label: "जैन पाठशाला",
    labelEn: "Jain Pathshala",
    desc: "बाल संस्कार सौरभ — कषाय, व्यसन, प्रार्थना, णमोकार महिमा",
  },
  {
    path: "/jain-dharma-jnana",
    icon: "🔮",
    label: "धर्म ज्ञान",
    labelEn: "Dharma Jnana Q&A",
    desc: "पंच परमेष्ठी — अरिहंत, सिद्ध, आचार्य, उपाध्याय, साधु",
  },
  {
    path: "/jain-kathayen",
    icon: "📜",
    label: "जैन कथाएँ",
    labelEn: "Jain Kathayen",
    desc: "महापुरुषों की प्रेरक जीवन-कथाएँ",
  },
  {
    path: "/jain-stotra-sangrah",
    icon: "🕉️",
    label: "स्तोत्र संग्रह",
    labelEn: "Stotra Sangrah",
    desc: "प्रतिक्रमण सूत्र, लोगस्स, शत्रुंजय महात्म्य",
  },
  {
    path: "/jain-stuti-sangrah",
    icon: "🙏",
    label: "स्तुति संग्रह",
    labelEn: "Stuti Sangrah",
    desc: "प्रात:कालीन वंदना, मंगलाष्टक, तीर्थंकर स्तुतियाँ",
  },
  {
    path: "/jain-parv-calendar",
    icon: "📅",
    label: "पर्व कैलेंडर",
    labelEn: "Parv Calendar 2026",
    desc: "चौबीस तीर्थंकर कल्याणक + जैन पर्व २०२६",
  },
  {
    path: "/jain-pujan",
    icon: "🌸",
    label: "जैन पूजन",
    labelEn: "Jain Pujan Sangrah",
    desc: "अष्टद्रव्य पूजन, स्तवन, जयमाला",
  },
  {
    path: "/jain-vrat-kathas",
    icon: "📿",
    label: "व्रत कथाएँ",
    labelEn: "Jain Vrat Kathas",
    desc: "जैन व्रत-विधि और कथा संग्रह",
  },
];

const volumeArticles: Record<
  number,
  { title: string; titleHindi: string; body: string; bodyHindi: string }[]
> = {
  1: [
    {
      title: "What is Jainism?",
      titleHindi: "जैन धर्म क्या है?",
      body: "Jainism is one of the world's oldest religions, founded on Ahimsa (non-violence), Satya (truth), and Aparigraha (non-possessiveness). It teaches that every soul is divine and capable of attaining liberation through right knowledge, right faith, and right conduct.",
      bodyHindi:
        "जैन धर्म विश्व के प्राचीनतम धर्मों में से एक है, जो अहिंसा, सत्य और अपरिग्रह पर आधारित है। यह सिखाता है कि प्रत्येक आत्मा दिव्य है और सम्यग् ज्ञान, दर्शन और चारित्र से मोक्ष प्राप्त कर सकती है।",
    },
    {
      title: "Key Principles of Jainism",
      titleHindi: "जैन धर्म के मूल सिद्धांत",
      body: "The key principles include Ahimsa (non-violence in thought, word, and deed), Anekantavada (many-sidedness of truth), and Aparigraha (non-possessiveness). These form the ethical and philosophical foundation of Jain Dharma.",
      bodyHindi:
        "मुख्य सिद्धांतों में अहिंसा (मन, वचन और कर्म से), अनेकांतवाद (सत्य की अनेकता) और अपरिग्रह (अनासक्ति) शामिल हैं। ये जैन धर्म की नींव हैं।",
    },
    {
      title: "Form of God in Jainism",
      titleHindi: "जैन धर्म में ईश्वर का स्वरूप",
      body: "Jainism does not believe in a creator God. Instead, it reveres Arihantas and Siddhas — liberated souls who have destroyed all karmas. They are role models showing the path to liberation, not controllers of destiny.",
      bodyHindi:
        "जैन धर्म सृष्टिकर्ता ईश्वर में विश्वास नहीं रखता। अरिहंत और सिद्ध — सर्वकर्म-क्षयी आत्माएं — आदर्श हैं जो मोक्ष मार्ग दिखाते हैं, भाग्य के नियंत्रक नहीं।",
    },
  ],
  5: [
    {
      title: "Who are Tirthankaras?",
      titleHindi: "तीर्थंकर कौन हैं?",
      body: "Tirthankaras are souls who have attained Keval Gyan (omniscience) after destroying all karmas. They reintroduce the dharma-tirtha in each cosmic cycle. This era has 24 Tirthankaras, from Adinath Rishabhdev to Mahavira Swami.",
      bodyHindi:
        "तीर्थंकर वे आत्माएं हैं जिन्होंने समस्त कर्मों को नष्ट कर केवलज्ञान प्राप्त किया। वे प्रत्येक काल-चक्र में धर्म-तीर्थ का पुनः प्रवर्तन करते हैं। इस युग में 24 तीर्थंकर हुए — आदिनाथ से महावीर स्वामी तक।",
    },
    {
      title: "Divine Qualities of Tirthankaras",
      titleHindi: "तीर्थंकरों के दिव्य गुण",
      body: "Every Tirthankara possesses four infinite qualities: Anant Gyan (infinite knowledge), Anant Darshan (infinite perception), Anant Sukh (infinite bliss), and Anant Virya (infinite power). These emerge naturally upon complete karma-destruction.",
      bodyHindi:
        "प्रत्येक तीर्थंकर में चार अनंत गुण होते हैं: अनंत ज्ञान, अनंत दर्शन, अनंत सुख और अनंत वीर्य। ये गुण सम्पूर्ण कर्मक्षय होने पर स्वतः प्रकट होते हैं।",
    },
    {
      title: "Why Only 24 Tirthankaras?",
      titleHindi: "केवल 24 तीर्थंकर क्यों?",
      body: "According to Jain cosmology, each time-cycle (Kalchakra) has exactly 24 Tirthankaras. This is the natural law of the universe. Just as humans have 32 teeth by nature, each cosmic era has 24 path-revealers by cosmic design.",
      bodyHindi:
        "जैन ब्रह्मांड विज्ञान के अनुसार प्रत्येक काल-चक्र में ठीक 24 तीर्थंकर होते हैं। यह ब्रह्मांड का स्वाभाविक नियम है। जैसे मनुष्य के 32 दाँत स्वभाव से हैं, वैसे ही प्रत्येक युग में 24 तीर्थंकर।",
    },
  ],
  9: [
    {
      title: "The Five Supreme Beings",
      titleHindi: "पाँच परमेष्ठी",
      body: "The Panch Parmesthi are: Arihant (destroyer of inner enemies), Siddha (liberated soul), Acharya (spiritual head of monks), Upadhyaya (teacher of scriptures), and Sadhu (ascetic monk). The Namokar Mantra pays homage to all five.",
      bodyHindi:
        "पंच परमेष्ठी हैं: अरिहंत (अंतरी शत्रुओं का नाश करने वाले), सिद्ध (मुक्त आत्मा), आचार्य (मुनि-संघ के प्रमुख), उपाध्याय (शास्त्र-शिक्षक) और साधु (त्यागी मुनि)। नमोकार मंत्र इन पाँचों को प्रणाम करता है।",
    },
    {
      title: "Namokar Mantra Explained",
      titleHindi: "नमोकार मंत्र का अर्थ",
      body: "The Namokar Mantra is the supreme Jain prayer. 'Namo Arihantanam' bows to the living omniscients. 'Namo Siddhanam' to liberated souls. 'Namo Ayariyanam' to the Acharyas. 'Namo Uvajjhayanam' to the teachers. 'Namo Loe Savva-Sahunam' to all monks.",
      bodyHindi:
        "नमोकार मंत्र जैन धर्म की सर्वोच्च प्रार्थना है। 'णमो अरिहंताणं' — जीवित सर्वज्ञों को। 'णमो सिद्धाणं' — मुक्त आत्माओं को। 'णमो आयरियाणं' — आचार्यों को। 'णमो उवज्झायाणं' — उपाध्यायों को। 'णमो लोए सव्व-साहूणं' — सभी साधुओं को।",
    },
    {
      title: "Path to Becoming Siddha",
      titleHindi: "सिद्ध बनने का मार्ग",
      body: "A Siddha is a soul that has completely freed itself from all karmic matter and resides at the apex of the universe (Siddha-shila). Any soul — regardless of birth, caste, or gender — can become a Siddha by following the three jewels of Jainism.",
      bodyHindi:
        "सिद्ध वह आत्मा है जो समस्त कार्मिक पुद्गल से मुक्त होकर लोकाग्र (सिद्धशिला) पर निवास करती है। कोई भी आत्मा — जाति, कुल या लिंग से निरपेक्ष — रत्नत्रय का पालन करके सिद्ध बन सकती है।",
    },
  ],
};

const defaultArticles = [
  {
    title: "Introduction",
    titleHindi: "परिचय",
    body: "This volume covers detailed aspects of Jain philosophy and practice from canonical Agam scriptures and scholarly commentary.",
    bodyHindi:
      "यह खंड जैन आगम ग्रंथों और विद्वानों की टिप्पणियों से जैन दर्शन और साधना के विस्तृत पहलुओं को कवर करता है।",
  },
  {
    title: "Key Concepts",
    titleHindi: "प्रमुख अवधारणाएं",
    body: "Core doctrines of this subject area are examined through the lens of Digambara and Shvetambara traditions, offering a comprehensive understanding.",
    bodyHindi:
      "इस विषय की मूल शिक्षाओं को दिगंबर और श्वेतांबर परंपराओं के दृष्टिकोण से परखा गया है।",
  },
  {
    title: "Practical Application",
    titleHindi: "व्यावहारिक उपयोग",
    body: "How these principles apply to daily life, spiritual progress, and the path toward ultimate liberation (Moksha) according to Jain scripture.",
    bodyHindi:
      "ये सिद्धांत दैनिक जीवन, आध्यात्मिक उन्नति और जैन शास्त्र के अनुसार मोक्ष-मार्ग में कैसे लागू होते हैं।",
  },
];

export default function JainEncyclopediaFull() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [modal, setModal] = useState<{ title: string; body: string } | null>(
    null,
  );

  const getArticles = (vol: number) => volumeArticles[vol] ?? defaultArticles;

  const handleArticleClick = (vol: number, idx: number) => {
    const art = getArticles(vol)[idx];
    setModal(
      lang === "en"
        ? { title: art.title, body: art.body }
        : { title: art.titleHindi, body: art.bodyHindi },
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-8 text-center">
        <div className="flex justify-end max-w-5xl mx-auto mb-4">
          <button
            type="button"
            onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
            className="text-xs border border-border rounded-full px-3 py-1 text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="lang-toggle"
          >
            {lang === "en" ? "हिन्दी" : "English"}
          </button>
        </div>
        <div className="text-4xl mb-3">📚</div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">
          {lang === "en" ? "Jain Encyclopedia" : "जैन विश्वकोश"}
        </h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          {lang === "en"
            ? "10 volumes of authentic Jain philosophy, history, and practice — drawn from Agam scriptures and scholarly tradition."
            : "जैन दर्शन, इतिहास और साधना के 10 खंड — आगम ग्रंथों और विद्वत् परंपरा पर आधारित।"}
        </p>
      </div>

      {/* Volume Grid */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jainVolumes.map((vol: JainVolume) => (
            <VolumeCard
              key={vol.volumeNumber}
              vol={vol}
              lang={lang}
              isExpanded={expanded === vol.volumeNumber}
              onToggle={() =>
                setExpanded((prev) =>
                  prev === vol.volumeNumber ? null : vol.volumeNumber,
                )
              }
              onArticleClick={(idx) =>
                handleArticleClick(vol.volumeNumber, idx)
              }
            />
          ))}
        </div>
      </div>

      {/* Jain Learning Hub */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div
          className="rounded-2xl p-6"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          <div className="text-center mb-6">
            <div className="text-3xl mb-2">🕊️</div>
            <h2
              className="font-display text-xl font-bold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {lang === "en" ? "Jain Learning Hub" : "जैन लर्निंग हब"}
            </h2>
            <p
              className="text-sm"
              style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
            >
              {lang === "en"
                ? "Explore all Jain sections — Pathshala, Dharma Jnana, Kathayen, Stotras, Stutis, and Festivals"
                : "पाठशाला, धर्म ज्ञान, कथाएँ, स्तोत्र, स्तुति और पर्व कैलेंडर — सभी जैन विभाग"}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {jainLearningHubLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path as Parameters<typeof Link>[0]["to"]}
                className="group rounded-xl p-3 flex flex-col items-center text-center hover:opacity-90 transition-opacity"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.10)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                }}
                data-ocid={`learning-hub-${item.path.replace("/", "")}`}
              >
                <span className="text-2xl mb-2">{item.icon}</span>
                <span
                  className="font-display text-xs font-semibold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {lang === "en" ? item.labelEn : item.label}
                </span>
                <span
                  className="text-xs mt-1 line-clamp-2 leading-relaxed"
                  style={{ color: "oklch(0.78 0.14 75 / 0.6)" }}
                >
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4 m-0 max-w-none w-full h-full border-0"
          data-ocid="article-modal-backdrop"
        >
          <div className="bg-card border border-border rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
                {modal.title}
              </h3>
              <button
                type="button"
                onClick={() => setModal(null)}
                onKeyDown={(e) => e.key === "Escape" && setModal(null)}
                className="ml-3 text-muted-foreground hover:text-foreground text-xl leading-none"
                aria-label="Close"
                data-ocid="modal-close"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {modal.body}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setModal(null)}
            >
              {lang === "en" ? "Close" : "बंद करें"}
            </Button>
          </div>
        </dialog>
      )}
    </div>
  );
}

function VolumeCard({
  vol,
  lang,
  isExpanded,
  onToggle,
  onArticleClick,
}: {
  vol: JainVolume;
  lang: "en" | "hi";
  isExpanded: boolean;
  onToggle: () => void;
  onArticleClick: (idx: number) => void;
}) {
  const articles = volumeArticles[vol.volumeNumber] ?? defaultArticles;
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 hover:border-primary/40 transition-colors"
      data-ocid={`volume-card-${vol.volumeNumber}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{vol.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="secondary" className="text-xs font-mono">
              Vol. {vol.volumeNumber}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {vol.articleCount} {lang === "en" ? "articles" : "लेख"}
            </Badge>
          </div>
          <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
            {lang === "en" ? vol.volumeTitle : vol.volumeTitleHindi}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {lang === "en" ? vol.description : vol.descriptionHindi}
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs"
        onClick={onToggle}
        data-ocid={`volume-read-more-${vol.volumeNumber}`}
      >
        {isExpanded
          ? lang === "en"
            ? "▲ Collapse"
            : "▲ छुपाएं"
          : lang === "en"
            ? "▼ Read More"
            : "▼ अधिक पढ़ें"}
      </Button>

      {isExpanded && (
        <div
          className="border-t border-border pt-3 flex flex-col gap-2"
          data-ocid={`volume-articles-${vol.volumeNumber}`}
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {lang === "en" ? "Articles" : "लेख"}
          </p>
          {articles.map((art) => (
            <button
              type="button"
              key={art.title}
              onClick={() => onArticleClick(articles.indexOf(art))}
              onKeyDown={(e) =>
                e.key === "Enter" && onArticleClick(articles.indexOf(art))
              }
              className="text-left text-sm text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-colors py-0.5"
              data-ocid={`article-link-${vol.volumeNumber}-${art.title.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {lang === "en" ? art.title : art.titleHindi}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
