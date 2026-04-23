import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { useState } from "react";
import { type JainPuja, jainPujanData } from "../data/jainPujanData";

const deityIcons: Record<string, string> = {
  चंद्रप्रभु: "🌙",
  "आचार्य ज्ञान सागर": "📖",
  "महावीर स्वामी": "🕊️",
  "आदिनाथ (ऋषभदेव)": "🏔️",
  "निर्वाण क्षेत्र": "🗻",
  नमिनाथ: "🌺",
  "सोलह कारण": "✨",
  "पंच परमेष्ठी": "🙏",
  "सम्यक् चारित्र": "⚖️",
  षोडशकारण: "🌟",
};

const sectionIcons: Record<string, string> = {
  स्तवन: "🎵",
  स्तुति: "🙏",
  "जल पूजा": "💧",
  "चंदन पूजा": "🌿",
  "पुष्प पूजा": "🌸",
  "अक्षत पूजा": "🌾",
  "नैवेद्य पूजा": "🍯",
  "दीप पूजा": "🪔",
  "धूप पूजा": "🌫️",
  "फल पूजा": "🍎",
  अर्घ्य: "🏺",
  जयमाला: "🎶",
  "मंगलाचरण (श्लोक १–८)": "🙏",
  "जिन महिमा (श्लोक ९–१६)": "✨",
  "ऋद्धि-सिद्धि वर्णन (श्लोक १७–२४)": "🌟",
  "भय-निवारक प्रभाव (श्लोक २५–३६)": "🛡️",
  "स्तुति-प्रार्थना (श्लोक ३७–४४)": "🙌",
  "समापन अर्घ (श्लोक ४५–४८ + अर्घ्य)": "🏺",
  "दोहा एवं आवाहन": "📿",
  "अष्टद्रव्य पूजा": "🏺",
  "प्रत्येक भावना के अर्घ्य (सवैया तेईसा)": "📜",
  "जाप्य मंत्र": "🔱",
  आशीर्वाद: "✨",
  "अर्थ एवं विवेचन": "📖",
  "चत्तारी मंगलं (मूल पाठ)": "📿",
  "आवाहन एवं प्रारम्भिक स्तवन": "🙏",
  "समुच्चय जयमाला": "🎶",
};

function PujanCard({
  puja,
  index,
  onClick,
}: {
  puja: JainPuja;
  index: number;
  onClick: () => void;
}) {
  const icon = deityIcons[puja.deity] ?? "🙏";
  return (
    <button
      type="button"
      data-ocid={`jain_pujan.item.${index + 1}`}
      onClick={onClick}
      className="w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden group focus:outline-none focus-visible:ring-2"
      style={{
        background: "oklch(0.99 0.008 80)",
        borderColor: "oklch(0.85 0.04 70)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = "oklch(0.78 0.14 75 / 0.6)";
        el.style.boxShadow =
          "0 8px 28px oklch(0.62 0.18 48 / 0.12), 0 0 0 1px oklch(0.78 0.14 75 / 0.2)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = "oklch(0.85 0.04 70)";
        el.style.boxShadow = "";
        el.style.transform = "";
      }}
    >
      <div
        className="h-1.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.68 0.20 48), oklch(0.78 0.14 75), oklch(0.72 0.18 60), oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
        }}
      />
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div
            className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.89 0.055 75))",
              border: "2px solid oklch(0.78 0.14 75 / 0.4)",
            }}
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-heading font-bold text-lg leading-snug mb-1"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              {puja.title}
            </h3>
            <p
              className="text-sm font-body"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              {puja.deity}
            </p>
          </div>
          <span
            className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-heading"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              color: "oklch(0.45 0.18 40)",
              border: "1px solid oklch(0.68 0.20 48 / 0.3)",
            }}
          >
            जैन पूजन
          </span>
        </div>

        <p
          className="text-sm font-body leading-relaxed line-clamp-2 mb-4"
          style={{ color: "oklch(0.40 0.04 40)" }}
        >
          {puja.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {puja.sections.slice(0, 6).map((sec) => (
            <span
              key={sec.name}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-heading"
              style={{
                background: "oklch(0.94 0.025 80)",
                color: "oklch(0.45 0.06 45)",
                border: "1px solid oklch(0.88 0.04 70)",
              }}
            >
              {sectionIcons[sec.name] ?? "◦"} {sec.name}
            </span>
          ))}
          {puja.sections.length > 6 && (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-heading"
              style={{
                background: "oklch(0.78 0.14 75 / 0.1)",
                color: "oklch(0.50 0.12 60)",
              }}
            >
              +{puja.sections.length - 6} और
            </span>
          )}
        </div>

        <div
          className="pt-3 border-t flex items-center justify-between"
          style={{ borderColor: "oklch(0.88 0.04 70)" }}
        >
          <span
            className="text-xs font-heading tracking-wide"
            style={{ color: "oklch(0.60 0.04 50)" }}
          >
            {puja.sections.length} अनुभाग
          </span>
          <span
            className="text-xs font-heading font-semibold flex items-center gap-1"
            style={{ color: "oklch(0.55 0.18 48)" }}
          >
            पूजन पढ़ें <BookOpen className="h-3 w-3" />
          </span>
        </div>
      </div>
    </button>
  );
}

function SectionPanel({
  section,
  defaultOpen = false,
}: { section: { name: string; text: string }; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const icon = sectionIcons[section.name] ?? "◦";

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        border: "1px solid oklch(0.85 0.04 70)",
        boxShadow: open ? "0 2px 12px oklch(0.62 0.18 48 / 0.06)" : "none",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 transition-colors"
        style={{
          background: open
            ? "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.91 0.045 75))"
            : "oklch(0.96 0.015 82)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <span
            className="font-heading font-semibold text-sm"
            style={{ color: "oklch(0.28 0.10 25)" }}
          >
            {section.name}
          </span>
        </div>
        {open ? (
          <ChevronUp
            className="h-4 w-4 flex-shrink-0"
            style={{ color: "oklch(0.55 0.12 50)" }}
          />
        ) : (
          <ChevronDown
            className="h-4 w-4 flex-shrink-0"
            style={{ color: "oklch(0.55 0.12 50)" }}
          />
        )}
      </button>

      {open && (
        <div
          className="px-5 py-5"
          style={{ background: "oklch(0.99 0.006 82)" }}
        >
          <pre
            className="whitespace-pre-wrap font-body text-base leading-loose"
            style={{
              color: "oklch(0.22 0.06 28)",
              fontFamily: "'Noto Sans Devanagari', 'Lato', serif",
              letterSpacing: "0.01em",
            }}
          >
            {section.text}
          </pre>
        </div>
      )}
    </div>
  );
}

function DetailView({
  puja,
  onBack,
}: {
  puja: JainPuja;
  onBack: () => void;
}) {
  const icon = deityIcons[puja.deity] ?? "🙏";
  return (
    <div className="max-w-3xl mx-auto">
      <button
        type="button"
        data-ocid="jain_pujan.back_button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-heading font-semibold transition-colors hover:opacity-80"
        style={{ color: "oklch(0.55 0.18 48)" }}
      >
        <ArrowLeft className="h-4 w-4" />
        वापस जाएँ
      </button>

      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
          border: "1px solid oklch(0.78 0.14 75 / 0.3)",
          boxShadow: "0 8px 32px oklch(0.62 0.18 48 / 0.15)",
        }}
      >
        <div
          className="h-1.5"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.68 0.20 48), oklch(0.78 0.14 75), oklch(0.72 0.18 60), oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
          }}
        />
        <div className="p-8 flex items-center gap-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
            style={{
              background: "oklch(0.78 0.14 75 / 0.15)",
              border: "2px solid oklch(0.78 0.14 75 / 0.4)",
            }}
          >
            {icon}
          </div>
          <div>
            <h1
              className="font-heading text-2xl md:text-3xl font-bold mb-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {puja.title}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <span
                className="text-sm font-body"
                style={{ color: "oklch(0.70 0.06 60)" }}
              >
                देवता: {puja.deity}
              </span>
              <span
                className="text-sm font-body"
                style={{ color: "oklch(0.70 0.06 60)" }}
              >
                आस्था: {puja.faith}
              </span>
              <span
                className="text-sm font-body"
                style={{ color: "oklch(0.70 0.06 60)" }}
              >
                {puja.sections.length} अनुभाग
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-5 mb-6"
        style={{
          background: "oklch(0.78 0.14 75 / 0.07)",
          border: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <p
          className="text-sm font-body leading-relaxed"
          style={{ color: "oklch(0.35 0.06 35)" }}
        >
          {puja.description}
        </p>
      </div>

      <div className="space-y-3">
        {puja.sections.map((section, idx) => (
          <SectionPanel
            key={section.name}
            section={section}
            defaultOpen={idx === 0}
          />
        ))}
      </div>
    </div>
  );
}

export default function JainPujan() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<JainPuja | null>(null);

  const filtered = jainPujanData.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.deity.toLowerCase().includes(search.toLowerCase()),
  );

  if (selected) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "oklch(0.97 0.015 85)" }}
      >
        <div className="container mx-auto px-4 py-8">
          <DetailView puja={selected} onBack={() => setSelected(null)} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      <div
        className="relative py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 60%, oklch(0.30 0.10 35) 100%)",
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
          style={{ background: "oklch(0.78 0.14 75)" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10"
          style={{ background: "oklch(0.68 0.20 48)" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-5xl mb-4">🕊️</div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            जैन पूजन संग्रह
          </h1>
          <p
            className="font-body text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            जैन तीर्थंकरों और महापुरुषों की अष्टद्रव्य पूजन — स्तवन, जयमाला और पंचकल्याणक पूजन
            का पावन संग्रह
          </p>
          <div
            className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-heading"
            style={{
              background: "oklch(0.78 0.14 75 / 0.12)",
              border: "1px solid oklch(0.78 0.14 75 / 0.25)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            {jainPujanData.length} पूजन • जैन धर्म
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.55 0.04 50)" }}
            />
            <Input
              data-ocid="jain_pujan.search_input"
              placeholder="पूजन या देवता से खोजें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 font-body"
              style={{
                background: "oklch(0.99 0.008 80)",
                borderColor: "oklch(0.85 0.04 70)",
                color: "oklch(0.22 0.06 28)",
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-ocid="jain_pujan.filter.tab"
              className="px-4 py-1.5 rounded-full text-sm font-heading font-medium transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "oklch(0.99 0.005 80)",
                border: "1px solid oklch(0.68 0.20 48)",
              }}
            >
              जैन पूजन
            </button>
          </div>
        </div>

        <p
          className="text-sm font-body mb-6"
          style={{ color: "oklch(0.55 0.04 50)" }}
        >
          {filtered.length} पूजन उपलब्ध
        </p>

        {filtered.length === 0 ? (
          <div
            data-ocid="jain_pujan.empty_state"
            className="text-center py-20 rounded-2xl border"
            style={{
              background: "oklch(0.99 0.008 80)",
              borderColor: "oklch(0.85 0.04 70)",
            }}
          >
            <div className="text-5xl mb-4">🔍</div>
            <p
              className="font-heading text-lg"
              style={{ color: "oklch(0.40 0.04 40)" }}
            >
              कोई पूजन नहीं मिला
            </p>
            <p
              className="font-body text-sm mt-1"
              style={{ color: "oklch(0.60 0.04 50)" }}
            >
              अलग शब्द से खोजें
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((puja, i) => (
              <PujanCard
                key={puja.id}
                puja={puja}
                index={i}
                onClick={() => setSelected(puja)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
