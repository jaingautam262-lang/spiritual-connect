import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Clock, Star, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  type AstroReport,
  astroReports,
  reportCategories,
} from "../data/reportData";
import { useLanguage } from "../hooks/useLanguage";

export default function ReportsCatalog() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortByPrice, setSortByPrice] = useState(false);

  let filtered = astroReports.filter(
    (r) => activeCategory === "All" || r.category === activeCategory,
  );
  if (sortByPrice) {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }

  function goToReport(slug: string) {
    void navigate({ to: "/astro-reports/$slug", params: { slug } });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="spiritual-gradient py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {language === "hi" ? "व्यक्तिगत" : "Personalized"}
          </p>
          <h1
            className="font-heading text-3xl md:text-5xl font-bold"
            style={{ color: "oklch(0.99 0.005 80)" }}
          >
            {language === "hi"
              ? "व्यक्तिगत ज्योतिष रिपोर्ट"
              : "Personalized Astrology Reports"}
          </h1>
          <p className="mt-3 text-sm" style={{ color: "oklch(0.85 0.02 80)" }}>
            {language === "hi"
              ? "आपकी जन्म कुंडली पर आधारित व्यक्तिगत विश्लेषण"
              : "In-depth analyses crafted personally from your birth chart"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {reportCategories.map((cat) => (
              <button
                type="button"
                key={cat}
                data-ocid={`reports.category_tab.${cat.toLowerCase().replace(/ /g, "_").replace("&", "and")}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  activeCategory === cat
                    ? "btn-spiritual border-transparent"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {cat === "All" ? (language === "hi" ? "सभी" : "All") : cat}
              </button>
            ))}
          </div>
          <button
            type="button"
            data-ocid="reports.sort_price_toggle"
            onClick={() => setSortByPrice((v) => !v)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm border transition-all ${
              sortByPrice
                ? "btn-gold border-transparent"
                : "bg-card border-border text-muted-foreground"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            {language === "hi" ? "कीमत अनुसार" : "Sort by Price"}
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((report, i) => (
            <ReportCard
              key={report.id}
              report={report}
              index={i + 1}
              language={language}
              onView={goToReport}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportCard({
  report,
  index,
  language,
  onView,
}: {
  report: AstroReport;
  index: number;
  language: string;
  onView: (slug: string) => void;
}) {
  return (
    <div
      data-ocid={`reports.item.${index}`}
      className={`report-card flex flex-col ${
        report.featured ? "ring-2 ring-[oklch(0.78_0.14_75)]" : ""
      }`}
    >
      {report.featured && (
        <div
          className="flex items-center gap-1.5 mb-3 text-xs font-semibold"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          {language === "hi" ? "सबसे लोकप्रिय" : "Most Popular"}
        </div>
      )}
      <div className="flex-1">
        <Badge className="text-xs mb-2 bg-muted text-muted-foreground border-border">
          {report.category}
        </Badge>
        <h3
          className="font-heading font-bold text-base mb-1"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          {language === "hi" && report.titleHi ? report.titleHi : report.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
          {report.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Clock className="w-3 h-3" />
          {report.deliveryTime}
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span
          className="text-xl font-heading font-bold"
          style={{ color: "oklch(0.62 0.18 48)" }}
        >
          {report.priceDisplay}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            data-ocid={`reports.view_button.${index}`}
            onClick={() => onView(report.slug)}
            className="text-xs h-8"
          >
            {language === "hi" ? "विवरण" : "View"}
          </Button>
          <Button
            size="sm"
            data-ocid={`reports.buy_button.${index}`}
            onClick={() => onView(report.slug)}
            className="btn-spiritual text-xs h-8 px-3"
          >
            {language === "hi" ? "खरीदें" : "Buy"}
          </Button>
        </div>
      </div>
    </div>
  );
}
