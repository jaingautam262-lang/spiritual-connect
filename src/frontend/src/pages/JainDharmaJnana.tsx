import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  type DharmaCategory,
  dharmaJnanaCategories,
} from "../data/jain-dharma-jnana-data";

function QACard({
  question,
  answer,
  idx,
}: { question: string; answer: string; idx: number }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div
      className="rounded-xl overflow-hidden border border-border transition-all duration-200"
      data-ocid={`dharma-qa-${idx}`}
      style={{
        boxShadow: open ? "0 2px 12px oklch(0.62 0.18 48 / 0.07)" : "none",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/20"
        style={{
          background: open ? "oklch(0.96 0.015 82)" : "var(--color-card)",
        }}
      >
        <span className="font-display font-semibold text-sm text-foreground leading-snug flex-1">
          {question}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        )}
      </button>
      {open && (
        <div className="px-5 py-4 border-t border-border bg-background">
          <pre
            className="whitespace-pre-wrap text-sm leading-loose text-foreground"
            style={{
              fontFamily: "'Noto Sans Devanagari', 'Lato', serif",
              letterSpacing: "0.01em",
            }}
          >
            {answer}
          </pre>
        </div>
      )}
    </div>
  );
}

function CategorySection({ cat }: { cat: DharmaCategory }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="mb-10" data-ocid={`dharma-category-${cat.id}`}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 mb-4 text-left"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.88 0.055 75))",
            border: "2px solid oklch(0.78 0.14 75 / 0.3)",
          }}
        >
          {cat.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-xl font-bold text-foreground">
            {cat.title}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {cat.description}
          </p>
        </div>
        <Badge variant="outline" className="text-xs flex-shrink-0">
          {cat.items.length} प्रश्न
        </Badge>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {expanded && (
        <div className="space-y-3 pl-14">
          {cat.items.map((qa, i) => (
            <QACard
              key={qa.id}
              question={qa.question}
              answer={qa.answer}
              idx={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function JainDharmaJnana() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-12 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 60%, oklch(0.30 0.10 35) 100%)",
        }}
      >
        <div className="text-5xl mb-4">🔮</div>
        <h1
          className="font-display text-3xl md:text-4xl font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          जैन धर्म ज्ञान
        </h1>
        <p
          className="text-base max-w-xl mx-auto"
          style={{ color: "oklch(0.78 0.14 75 / 0.75)" }}
        >
          पंच परमेष्ठी — अरिहंत, सिद्ध, आचार्य, उपाध्याय, साधु • प्रश्नोत्तर रूप में
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div
          className="rounded-xl p-4 mb-8 flex items-start gap-3"
          style={{
            background: "oklch(0.78 0.14 75 / 0.07)",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <span className="text-xl">ℹ️</span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>णमो अरिहंताणं।</strong> जैन धर्म में पंच परमेष्ठी की आराधना सर्वोच्च है।
            इस खंड में उनके स्वरूप, गुण और महत्त्व को प्रश्नोत्तर रूप में समझाया गया है।
          </p>
        </div>

        {dharmaJnanaCategories.map((cat) => (
          <CategorySection key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}
