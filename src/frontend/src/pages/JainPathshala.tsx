import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  type PathshalaModule,
  pathshalaModules,
} from "../data/jain-pathshala-data";

function ModuleCard({
  module,
  isExpanded,
  onToggle,
}: {
  module: PathshalaModule;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-200"
      data-ocid={`pathshala-module-${module.id}`}
      style={{
        boxShadow: isExpanded
          ? "0 4px 20px oklch(0.62 0.18 48 / 0.10)"
          : "none",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.88 0.055 75))",
            border: "2px solid oklch(0.78 0.14 75 / 0.3)",
          }}
        >
          {module.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant="secondary" className="text-xs">
              {module.part}
            </Badge>
          </div>
          <h3 className="font-display font-semibold text-foreground text-base leading-snug">
            {module.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {module.chapter}
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-border">
          <div className="p-5 bg-muted/20">
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed italic">
              {module.summary}
            </p>
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                सीखने के उद्देश्य
              </p>
              <ul className="space-y-1">
                {module.objectives.map((obj) => (
                  <li
                    key={obj}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <span style={{ color: "oklch(0.68 0.20 48)" }}>✦</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-5">
            <pre
              className="whitespace-pre-wrap text-sm leading-loose text-foreground"
              style={{
                fontFamily: "'Noto Sans Devanagari', 'Lato', serif",
                letterSpacing: "0.01em",
              }}
            >
              {module.content}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default function JainPathshala() {
  const [expandedId, setExpandedId] = useState<string | null>(
    pathshalaModules[0]?.id ?? null,
  );

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
        <div className="text-5xl mb-4">🎓</div>
        <h1
          className="font-display text-3xl md:text-4xl font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          जैन पाठशाला
        </h1>
        <p
          className="text-base max-w-xl mx-auto"
          style={{ color: "oklch(0.78 0.14 75 / 0.75)" }}
        >
          बाल संस्कार सौरभ • बच्चों और जिज्ञासुओं के लिए जैन शिक्षा
        </p>
        <div
          className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm"
          style={{
            background: "oklch(0.78 0.14 75 / 0.12)",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
            color: "oklch(0.78 0.14 75)",
          }}
        >
          {pathshalaModules.length} पाठ उपलब्ध
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            पाठ्यक्रम
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {pathshalaModules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isExpanded={expandedId === module.id}
            onToggle={() =>
              setExpandedId((prev) => (prev === module.id ? null : module.id))
            }
          />
        ))}
      </div>

      {/* Footer note */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div
          className="rounded-xl p-5 text-center"
          style={{
            background: "oklch(0.78 0.14 75 / 0.07)",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <p className="text-sm text-muted-foreground">
            🙏 <strong>जय जिनेन्द्र</strong> — यह पाठशाला जैन बाल-संस्कार की शिक्षा के
            लिए समर्पित है।
          </p>
        </div>
      </div>
    </div>
  );
}
