import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { type FAQQAPair, calculatorFAQs } from "../data/calculatorFAQData";
import { calculators, getCalculatorById } from "../data/calculatorIndexData";

type FAQCategory = "all" | FAQQAPair["category"];

const categoryLabels: Record<FAQQAPair["category"], string> = {
  "how-it-works": "How It Works",
  interpretations: "Interpretations",
  remedies: "Remedies & Upaay",
  general: "General",
};

const categoryHindi: Record<FAQQAPair["category"], string> = {
  "how-it-works": "यह कैसे काम करता है",
  interpretations: "व्याख्या",
  remedies: "उपाय",
  general: "सामान्य",
};

function AccordionItem({
  qa,
  index,
  isOpen,
  onToggle,
  lang,
}: {
  qa: FAQQAPair;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  lang: "en" | "hi";
}) {
  const question = lang === "hi" ? qa.questionHindi : qa.question;
  const answer = lang === "hi" ? qa.answerHindi : qa.answer;
  const catLabel =
    lang === "hi" ? categoryHindi[qa.category] : categoryLabels[qa.category];

  return (
    <div
      className="rounded-xl border transition-all duration-200 overflow-hidden"
      style={{
        background: isOpen ? "oklch(0.24 0.06 26)" : "oklch(0.20 0.05 24)",
        borderColor: isOpen
          ? "oklch(0.78 0.14 75 / 0.30)"
          : "oklch(0.78 0.14 75 / 0.12)",
      }}
      data-ocid="faq.accordion_item"
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start gap-3 p-4 text-left transition-colors"
        aria-expanded={isOpen}
        data-ocid="faq.accordion_toggle"
      >
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
          style={{
            background: "oklch(0.68 0.20 48 / 0.15)",
            color: "oklch(0.78 0.14 75)",
          }}
        >
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-heading font-medium leading-snug pr-2"
            style={{ color: "oklch(0.88 0.04 75)" }}
          >
            {question}
          </p>
          <span
            className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.30 0.06 28)",
              color: "oklch(0.65 0.08 60)",
            }}
          >
            {catLabel}
          </span>
        </div>
        {isOpen ? (
          <ChevronDown
            className="flex-shrink-0 h-4 w-4 mt-0.5 transition-transform"
            style={{ color: "oklch(0.78 0.14 75)" }}
          />
        ) : (
          <ChevronRight
            className="flex-shrink-0 h-4 w-4 mt-0.5 transition-transform"
            style={{ color: "oklch(0.55 0.04 50)" }}
          />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pl-13">
          <div className="pl-9">
            <p
              className="text-sm font-body leading-relaxed"
              style={{ color: "oklch(0.72 0.04 60)" }}
            >
              {answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CalculatorFAQPage() {
  const { calculatorId } = useParams({ from: "/calculator-faq/$calculatorId" });
  const navigate = useNavigate();
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [searchQ, setSearchQ] = useState("");
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqEntry = useMemo(
    () => calculatorFAQs.find((f) => f.calculatorId === calculatorId),
    [calculatorId],
  );
  const calcInfo = useMemo(
    () => getCalculatorById(calculatorId),
    [calculatorId],
  );

  const relatedCalcs = useMemo(
    () =>
      calculators
        .filter(
          (c) => c.category === calcInfo?.category && c.id !== calculatorId,
        )
        .slice(0, 4),
    [calcInfo, calculatorId],
  );

  const filteredQA = useMemo(() => {
    if (!faqEntry) return [];
    let list = faqEntry.qaPairs;
    if (activeCategory !== "all")
      list = list.filter((q) => q.category === activeCategory);
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase();
      list = list.filter(
        (qa) =>
          qa.question.toLowerCase().includes(q) ||
          qa.questionHindi.includes(q) ||
          qa.answer.toLowerCase().includes(q),
      );
    }
    return list;
  }, [faqEntry, activeCategory, searchQ]);

  if (!faqEntry || !calcInfo) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.18 0.06 22)" }}
      >
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <p
            className="font-heading text-lg font-semibold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Calculator FAQs not found
          </p>
          <Link
            to="/calculator-index"
            className="text-sm font-body underline"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            ← Back to All Calculators
          </Link>
        </div>
      </div>
    );
  }

  const categories: FAQCategory[] = [
    "all",
    "how-it-works",
    "interpretations",
    "remedies",
    "general",
  ];

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.06 22) 0%, oklch(0.14 0.04 20) 100%)",
      }}
    >
      <div className="container mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs font-body mb-6"
          style={{ color: "oklch(0.55 0.04 50)" }}
        >
          <Link
            to="/calculator-index"
            className="hover:underline"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            All Calculators
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: "oklch(0.70 0.06 60)" }}>
            {calcInfo.name} FAQ
          </span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main FAQ Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calculator Header */}
            <div
              className="rounded-xl p-5 border"
              style={{
                background: "oklch(0.22 0.06 25)",
                borderColor: "oklch(0.78 0.14 75 / 0.18)",
              }}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl leading-none">{calcInfo.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1
                      className="font-heading text-xl font-bold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {calcInfo.name} — FAQ
                    </h1>
                    {/* Lang toggle */}
                    <button
                      type="button"
                      onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
                      className="ml-auto text-xs px-3 py-1 rounded-full font-heading font-semibold transition-colors"
                      style={{
                        background: "oklch(0.68 0.20 48 / 0.15)",
                        color: "oklch(0.78 0.14 75)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                      }}
                      data-ocid="faq.lang_toggle"
                    >
                      {lang === "en" ? "हिंदी" : "English"}
                    </button>
                  </div>
                  <p
                    className="text-sm mt-1 font-body leading-relaxed"
                    style={{ color: "oklch(0.65 0.06 60)" }}
                  >
                    {lang === "hi"
                      ? calcInfo.descriptionHindi
                      : calcInfo.description}
                  </p>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() =>
                        void navigate({ to: calcInfo.route as "/" })
                      }
                      className="text-xs px-4 py-1.5 rounded-lg font-heading font-semibold transition-all hover:opacity-90"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                        color: "white",
                      }}
                      data-ocid="faq.open_calculator"
                    >
                      Open Calculator →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Search + Filters */}
            <div className="space-y-3">
              <div className="relative" data-ocid="faq.search">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                />
                <input
                  type="text"
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-body outline-none"
                  style={{
                    background: "oklch(0.22 0.06 25)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.18)",
                    color: "oklch(0.88 0.04 75)",
                  }}
                  data-ocid="faq.search_input"
                />
                {searchQ && (
                  <button
                    type="button"
                    onClick={() => setSearchQ("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X
                      className="h-4 w-4"
                      style={{ color: "oklch(0.55 0.04 50)" }}
                    />
                  </button>
                )}
              </div>

              {/* Category Filters */}
              <div
                className="flex gap-2 flex-wrap"
                data-ocid="faq.category_filters"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat);
                      setOpenIndex(null);
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-all"
                    style={{
                      background:
                        activeCategory === cat
                          ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                          : "oklch(0.22 0.06 25)",
                      color:
                        activeCategory === cat
                          ? "white"
                          : "oklch(0.65 0.06 60)",
                      border: `1px solid ${activeCategory === cat ? "transparent" : "oklch(0.78 0.14 75 / 0.15)"}`,
                    }}
                    data-ocid="faq.category_tab"
                  >
                    {cat === "all"
                      ? lang === "hi"
                        ? "सभी"
                        : "All"
                      : lang === "hi"
                        ? categoryHindi[cat]
                        : categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Q&A Accordion */}
            {filteredQA.length > 0 ? (
              <div className="space-y-3">
                <p
                  className="text-xs font-body"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  {filteredQA.length} question
                  {filteredQA.length !== 1 ? "s" : ""}
                  {searchQ ? ` matching "${searchQ}"` : ""}
                </p>
                {filteredQA.map((qa, idx) => (
                  <AccordionItem
                    key={`${qa.category}-${idx}`}
                    qa={qa}
                    index={idx}
                    isOpen={openIndex === idx}
                    onToggle={() =>
                      setOpenIndex(openIndex === idx ? null : idx)
                    }
                    lang={lang}
                  />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-12 rounded-xl"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
                data-ocid="faq.empty_state"
              >
                <p className="text-3xl mb-3">🔍</p>
                <p
                  className="font-heading text-sm font-semibold mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  No matching questions
                </p>
                <p
                  className="text-xs font-body"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  Try a different keyword or category
                </p>
              </div>
            )}
          </div>

          {/* Sidebar — Related Calculators */}
          <div className="space-y-4">
            <div
              className="rounded-xl p-4 border sticky top-24"
              style={{
                background: "oklch(0.22 0.06 25)",
                borderColor: "oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              <h3
                className="font-heading text-sm font-semibold mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Related{" "}
                {calcInfo.category === "astrology" ? "Astrology" : "Numerology"}{" "}
                Calculators
              </h3>
              <div className="space-y-2">
                {relatedCalcs.map((rc) => (
                  <div key={rc.id} className="flex items-center gap-3">
                    <span className="text-xl">{rc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-heading font-medium truncate"
                        style={{ color: "oklch(0.82 0.06 70)" }}
                      >
                        {rc.name}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Link
                        to="/calculator-faq/$calculatorId"
                        params={{ calculatorId: rc.id }}
                        className="text-xs px-2 py-1 rounded-lg font-heading transition-colors hover:bg-white/10"
                        style={{
                          color: "oklch(0.68 0.20 48)",
                          border: "1px solid oklch(0.68 0.20 48 / 0.25)",
                        }}
                        data-ocid="faq.related_faq_link"
                      >
                        FAQ
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-4 pt-3"
                style={{ borderTop: "1px solid oklch(0.78 0.14 75 / 0.10)" }}
              >
                <Link
                  to="/calculator-index"
                  className="block w-full text-center text-xs py-2 rounded-lg font-heading font-semibold transition-colors hover:bg-white/10"
                  style={{
                    color: "oklch(0.78 0.14 75)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                  }}
                  data-ocid="faq.all_calculators_link"
                >
                  View All Calculators →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
