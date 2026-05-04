import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Heart, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useFavouritesStore } from "../stores/favouritesStore";
import type { FavouriteItem } from "../stores/favouritesStore";

type FilterTab =
  | "all"
  | "prayers"
  | "kavachAshtakam"
  | "stutiSahasranam"
  | "product"
  | "blog";

const TYPE_ICONS: Record<FavouriteItem["type"], string> = {
  aarti: "🙏",
  chalisa: "📖",
  mantra: "🔔",
  stotra: "📜",
  kavach: "🛡️",
  ashtakam: "🕉️",
  stuti: "✨",
  sahasranam: "📿",
  product: "🛍️",
  blog: "✍️",
};

const TYPE_LABELS: Record<FavouriteItem["type"], string> = {
  aarti: "Aarti",
  chalisa: "Chalisa",
  mantra: "Mantra",
  stotra: "Stotra",
  kavach: "Kavach",
  ashtakam: "Ashtakam",
  stuti: "Stuti",
  sahasranam: "Sahasranam",
  product: "Product",
  blog: "Blog",
};

const PRAYER_TYPES: FavouriteItem["type"][] = [
  "aarti",
  "chalisa",
  "mantra",
  "stotra",
];
const KAVACH_TYPES: FavouriteItem["type"][] = ["kavach", "ashtakam"];
const STUTI_TYPES: FavouriteItem["type"][] = ["stuti", "sahasranam"];

const GROUP_META: {
  key: FilterTab;
  emoji: string;
  label: string;
  types: FavouriteItem["type"][];
}[] = [
  { key: "prayers", emoji: "🙏", label: "Prayers", types: PRAYER_TYPES },
  {
    key: "kavachAshtakam",
    emoji: "🛡️",
    label: "Kavach & Protection",
    types: KAVACH_TYPES,
  },
  {
    key: "stutiSahasranam",
    emoji: "📿",
    label: "Stuti & Sahasranam",
    types: STUTI_TYPES,
  },
  { key: "product", emoji: "🛍️", label: "Products", types: ["product"] },
  { key: "blog", emoji: "✍️", label: "Blog", types: ["blog"] },
];

function getGroupKey(type: FavouriteItem["type"]): FilterTab {
  if (PRAYER_TYPES.includes(type)) return "prayers";
  if (KAVACH_TYPES.includes(type)) return "kavachAshtakam";
  if (STUTI_TYPES.includes(type)) return "stutiSahasranam";
  if (type === "product") return "product";
  return "blog";
}

const TABS: { key: FilterTab; label: string; labelHi: string }[] = [
  { key: "all", label: "All", labelHi: "सभी" },
  { key: "prayers", label: "Prayers", labelHi: "प्रार्थनाएं" },
  {
    key: "kavachAshtakam",
    label: "Kavach & Ashtakam",
    labelHi: "कवच और अष्टकम",
  },
  {
    key: "stutiSahasranam",
    label: "Stuti & Sahasranam",
    labelHi: "स्तुति और सहस्रनाम",
  },
  { key: "product", label: "Products", labelHi: "उत्पाद" },
  { key: "blog", label: "Blog", labelHi: "ब्लॉग" },
];

export default function MyFavourites() {
  const { language } = useLanguage();
  const { favourites, removeFavourite, clearFavourites } = useFavouritesStore();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [confirmClear, setConfirmClear] = useState(false);

  const filtered =
    activeTab === "all"
      ? favourites
      : favourites.filter((f) => getGroupKey(f.type) === activeTab);

  // Group filtered items by their group key
  const grouped: { meta: (typeof GROUP_META)[0]; items: FavouriteItem[] }[] =
    GROUP_META.map((meta) => ({
      meta,
      items: filtered.filter((f) => meta.types.includes(f.type)),
    })).filter((g) => g.items.length > 0);

  const handleWhatsApp = () => {
    const lines = favourites
      .slice(0, 10)
      .map((f) => `${TYPE_ICONS[f.type]} ${f.title}`);
    const text = [
      language === "hi" ? "मेरी आध्यात्मिक संग्रह:" : "My spiritual collection:",
      ...lines,
      favourites.length > 10 ? `...and ${favourites.length - 10} more` : "",
      `\n🙏 SpiritualConnect — ${window.location.origin}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleClearAll = () => {
    if (confirmClear) {
      clearFavourites();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1
                className="text-3xl font-decorative font-bold mb-1"
                style={{ color: "oklch(0.78 0.14 75)" }}
                data-ocid="favourites.page"
              >
                {language === "hi" ? "मेरे पसंदीदा" : "My Favourites"}
              </h1>
              <p
                className="text-sm font-body"
                style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
              >
                {language === "hi"
                  ? "आपकी सभी सहेजी गई प्रार्थनाएं, सामग्री और उत्पाद एक स्थान पर।"
                  : "All your saved prayers, content, and products in one place."}
              </p>
            </div>
            {favourites.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-80"
                  style={{
                    background: "#25D366",
                    color: "white",
                  }}
                  data-ocid="favourites.whatsapp_button"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  {language === "hi" ? "शेयर करें" : "Share"}
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:opacity-90"
                  style={{
                    background: confirmClear
                      ? "oklch(0.60 0.22 25)"
                      : "transparent",
                    borderColor: "oklch(0.60 0.22 25 / 0.5)",
                    color: confirmClear ? "white" : "oklch(0.70 0.14 25)",
                  }}
                  data-ocid="favourites.clear_button"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {confirmClear
                    ? language === "hi"
                      ? "पक्का करें?"
                      : "Confirm?"
                    : language === "hi"
                      ? "सभी हटाएं"
                      : "Clear All"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Filter Tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide"
          data-ocid="favourites.filter_tabs"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-heading font-medium transition-all"
              style={{
                background:
                  activeTab === tab.key
                    ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                    : "oklch(0.22 0.06 25 / 0.6)",
                color: activeTab === tab.key ? "white" : "oklch(0.70 0.06 55)",
                border:
                  activeTab === tab.key
                    ? "1px solid oklch(0.78 0.14 75 / 0.4)"
                    : "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
              data-ocid={`favourites.tab.${tab.key}`}
            >
              {language === "hi" ? tab.labelHi : tab.label}
              {tab.key === "all" && favourites.length > 0 && (
                <span
                  className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.2)",
                    color: "oklch(0.78 0.14 75)",
                  }}
                >
                  {favourites.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {favourites.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24 rounded-2xl"
            style={{
              background: "oklch(0.22 0.06 25 / 0.4)",
              border: "1px dashed oklch(0.78 0.14 75 / 0.2)",
            }}
            data-ocid="favourites.empty_state"
          >
            <div
              className="text-7xl mb-6 select-none"
              style={{
                filter: "drop-shadow(0 0 12px oklch(0.78 0.14 75 / 0.3))",
              }}
            >
              🤍
            </div>
            <h2
              className="text-xl font-decorative font-bold mb-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {language === "hi"
                ? "अभी तक कोई पसंदीदा नहीं"
                : "No favourites yet"}
            </h2>
            <p
              className="text-sm font-body text-center max-w-xs mb-6"
              style={{ color: "oklch(0.65 0.05 55)" }}
            >
              {language === "hi"
                ? "किसी भी प्रार्थना, सामग्री या उत्पाद पर ♡ दबाएं और यहाँ सहेजें।"
                : "Tap the heart ♡ on any prayer, content, or product to save it here."}
            </p>
            <Link to="/aarti">
              <Button
                className="px-6 py-2 rounded-full font-heading font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                  border: "none",
                }}
                data-ocid="favourites.explore_button"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {language === "hi"
                  ? "आरती पुस्तकालय देखें"
                  : "Explore Aarti Library"}
              </Button>
            </Link>
          </div>
        )}

        {/* Filtered Empty State */}
        {favourites.length > 0 && filtered.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-16 rounded-2xl"
            style={{
              background: "oklch(0.22 0.06 25 / 0.3)",
              border: "1px dashed oklch(0.78 0.14 75 / 0.15)",
            }}
            data-ocid="favourites.filtered_empty_state"
          >
            <p className="text-4xl mb-3">🔍</p>
            <p
              className="text-sm font-body"
              style={{ color: "oklch(0.60 0.05 55)" }}
            >
              {language === "hi"
                ? "इस श्रेणी में कोई पसंदीदा नहीं"
                : "No favourites in this category"}
            </p>
          </div>
        )}

        {/* Grouped Favourites */}
        {grouped.map(({ meta, items }) => (
          <section
            key={meta.key}
            className="mb-10"
            data-ocid={`favourites.group.${meta.key}`}
          >
            <h2
              className="text-base font-heading font-semibold mb-4 flex items-center gap-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              <span>{meta.emoji}</span>
              <span>
                {language === "hi"
                  ? (TABS.find((t) => t.key === meta.key)?.labelHi ??
                    meta.label)
                  : meta.label}
              </span>
              <span
                className="ml-1 px-2 py-0.5 rounded-full text-xs font-normal"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.12)",
                  color: "oklch(0.65 0.08 65)",
                }}
              >
                {items.length}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, idx) => (
                <FavouriteCard
                  key={item.id}
                  item={item}
                  index={idx + 1}
                  onRemove={() => removeFavourite(item.id)}
                  language={language}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Share Bottom Section */}
        {favourites.length > 0 && (
          <div
            className="mt-12 p-6 rounded-2xl text-center"
            style={{
              background: "oklch(0.22 0.06 25 / 0.5)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
            data-ocid="favourites.share_section"
          >
            <p className="text-2xl mb-2">🙏</p>
            <h3
              className="font-decorative font-bold text-lg mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {language === "hi"
                ? "अपनी आध्यात्मिक संग्रह शेयर करें"
                : "Share your spiritual collection"}
            </h3>
            <p
              className="text-xs font-body mb-4"
              style={{ color: "oklch(0.60 0.05 55)" }}
            >
              {language === "hi"
                ? "अपने प्रिय लोगों के साथ अपनी पसंदीदा प्रार्थनाएं और सामग्री साझा करें।"
                : "Share your favourite prayers and content with loved ones."}
            </p>
            <button
              type="button"
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-heading font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#25D366", color: "white" }}
              data-ocid="favourites.whatsapp_share_button"
            >
              <Share2 className="h-4 w-4" />
              {language === "hi" ? "WhatsApp पर शेयर करें" : "Share on WhatsApp"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface FavouriteCardProps {
  item: FavouriteItem;
  index: number;
  onRemove: () => void;
  language: string;
}

function FavouriteCard({
  item,
  index,
  onRemove,
  language,
}: FavouriteCardProps) {
  const icon = item.icon ?? TYPE_ICONS[item.type];
  const typeLabel = TYPE_LABELS[item.type];

  return (
    <div
      className="relative flex flex-col gap-3 p-4 rounded-xl transition-all"
      style={{
        background: "oklch(0.22 0.06 25 / 0.7)",
        border: "1px solid oklch(0.78 0.14 75 / 0.12)",
      }}
      data-ocid={`favourites.item.${index}`}
    >
      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-3 right-3 p-1 rounded-full transition-all hover:bg-red-500/20 group"
        aria-label={language === "hi" ? "हटाएं" : "Remove from favourites"}
        data-ocid={`favourites.delete_button.${index}`}
      >
        <Heart
          className="h-4 w-4 transition-colors group-hover:text-red-500"
          style={{ color: "oklch(0.70 0.18 25)", fill: "oklch(0.70 0.18 25)" }}
        />
      </button>

      {/* Icon + Title */}
      <div className="flex items-start gap-3 pr-6">
        <span
          className="text-2xl leading-none flex-shrink-0"
          role="img"
          aria-hidden="true"
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p
            className="font-heading font-semibold text-sm leading-snug truncate"
            style={{ color: "oklch(0.88 0.06 75)" }}
          >
            {item.title}
          </p>
          {item.subtitle && (
            <p
              className="text-xs font-body mt-0.5 truncate"
              style={{ color: "oklch(0.60 0.05 55)" }}
            >
              {item.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        <Badge
          variant="outline"
          className="text-[10px] px-2 py-0.5 font-body"
          style={{
            borderColor: "oklch(0.78 0.14 75 / 0.25)",
            color: "oklch(0.65 0.08 65)",
            background: "oklch(0.78 0.14 75 / 0.06)",
          }}
        >
          {typeLabel}
        </Badge>
        <Link
          to={item.path as "/"}
          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-heading font-semibold transition-all hover:opacity-80"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
          }}
          data-ocid={`favourites.visit_link.${index}`}
        >
          {language === "hi" ? "देखें" : "Visit"}
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
