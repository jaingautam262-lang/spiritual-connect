import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, Search } from "lucide-react";
import { useState } from "react";
import { divyaGyanArticles } from "../data/divyaGyanData";

const CATEGORIES = [
  "सभी",
  "हनुमान",
  "राधा-कृष्ण",
  "शिव",
  "गणेश",
  "देवी",
  "तीर्थ",
  "मंत्र",
  "ज्योतिर्लिंग",
  "अन्य",
];

export default function DivyaGyanSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("सभी");

  const filtered = divyaGyanArticles.filter((a) => {
    const matchesSearch =
      search === "" ||
      a.titleHindi.toLowerCase().includes(search.toLowerCase()) ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "सभी" || a.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Hero */}
      <div
        className="py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 22), oklch(0.32 0.10 28))",
        }}
      >
        <h1
          className="font-heading text-4xl md:text-5xl font-bold mb-3"
          style={{ color: "oklch(0.95 0.015 85)" }}
        >
          दिव्य ज्ञान
        </h1>
        <p
          className="font-body text-lg"
          style={{ color: "oklch(0.78 0.12 70)" }}
        >
          हिंदू धर्म के दिव्य रहस्य, कथाएं और आध्यात्मिक ज्ञान
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.55 0.04 50)" }}
            />
            <input
              type="text"
              placeholder="लेख खोजें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="divya-gyan.search_input"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border font-body text-sm focus:outline-none focus:ring-2"
              style={{
                background: "oklch(0.99 0.008 80)",
                borderColor: "oklch(0.85 0.04 70)",
                color: "oklch(0.22 0.08 22)",
              }}
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              data-ocid={`divya-gyan.category.${cat}`}
              className="px-4 py-1.5 rounded-full text-sm font-body transition-all duration-200"
              style={{
                background:
                  category === cat
                    ? "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))"
                    : "oklch(0.93 0.02 75)",
                color:
                  category === cat
                    ? "oklch(0.12 0.04 28)"
                    : "oklch(0.45 0.06 38)",
                fontWeight: category === cat ? "600" : "400",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="divya-gyan.empty_state">
            <BookOpen
              className="h-12 w-12 mx-auto mb-4"
              style={{ color: "oklch(0.70 0.10 55)" }}
            />
            <h3
              className="font-heading text-xl font-semibold mb-2"
              style={{ color: "oklch(0.35 0.08 28)" }}
            >
              लेख जल्द आ रहे हैं
            </h3>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              दिव्य ज्ञान के लेख तैयार किए जा रहे हैं। कृपया प्रतीक्षा करें।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, idx) => (
              <Link
                key={article.id}
                to="/divya-gyan/$slug"
                params={{ slug: article.slug }}
                data-ocid={`divya-gyan.article.${idx + 1}`}
                className="group block rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  borderColor: "oklch(0.85 0.04 70)",
                }}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-body"
                      style={{
                        background: "oklch(0.93 0.02 75)",
                        color: "oklch(0.45 0.06 38)",
                      }}
                    >
                      {article.category}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs font-body"
                      style={{ color: "oklch(0.55 0.04 50)" }}
                    >
                      <Clock className="h-3 w-3" /> {article.readTime} मिनट
                    </span>
                  </div>
                  <h3
                    className="font-heading text-lg font-bold mb-2 leading-snug"
                    style={{ color: "oklch(0.22 0.08 22)" }}
                  >
                    {article.titleHindi}
                  </h3>
                  <p
                    className="font-body text-sm line-clamp-3 leading-relaxed"
                    style={{ color: "oklch(0.42 0.04 38)" }}
                  >
                    {article.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
