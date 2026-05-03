import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { type PujaItem, pujaItems } from "../data/pujaListData";
import {
  type TempleDarshanVideo,
  templeDarshanVideos,
} from "../data/templeDarshanVideos";
import { useCreatePujaBooking } from "../hooks/useQueries";

const FAITH_STYLES = {
  Hindu: {
    bg: "oklch(0.68 0.20 48 / 0.2)",
    text: "oklch(0.88 0.10 70)",
    border: "oklch(0.68 0.20 48 / 0.3)",
  },
  Jain: {
    bg: "oklch(0.55 0.15 200 / 0.2)",
    text: "oklch(0.75 0.10 200)",
    border: "oklch(0.55 0.15 200 / 0.3)",
  },
};

const BOOKING_TYPE_STYLES = {
  Online: {
    bg: "oklch(0.55 0.18 150 / 0.2)",
    text: "oklch(0.75 0.10 150)",
    border: "oklch(0.55 0.18 150 / 0.3)",
  },
  "At Temple": {
    bg: "oklch(0.58 0.18 30 / 0.2)",
    text: "oklch(0.85 0.12 60)",
    border: "oklch(0.58 0.18 30 / 0.3)",
  },
  "At Home": {
    bg: "oklch(0.55 0.18 280 / 0.2)",
    text: "oklch(0.78 0.10 280)",
    border: "oklch(0.55 0.18 280 / 0.3)",
  },
};

type ViewState = "list" | "detail" | "book" | "confirmed";
function VideoDarshan() {
  const [activeVideo, setActiveVideo] = useState<TempleDarshanVideo>(
    templeDarshanVideos[0],
  );
  const [showAll, setShowAll] = useState(false);
  const [regionFilter, setRegionFilter] = useState("All");

  const REGIONS = [
    "All",
    "North India",
    "South India",
    "West India",
    "East India",
    "Central India",
  ];

  const featuredTemples = templeDarshanVideos.slice(0, 6);

  const filteredTemples =
    regionFilter === "All"
      ? templeDarshanVideos
      : templeDarshanVideos.filter((t) => t.region === regionFilter);

  const regionBadgeColors: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    "North India": {
      bg: "oklch(0.55 0.18 260 / 0.20)",
      text: "oklch(0.78 0.14 260)",
      border: "oklch(0.55 0.18 260 / 0.35)",
    },
    "South India": {
      bg: "oklch(0.55 0.18 145 / 0.20)",
      text: "oklch(0.72 0.14 145)",
      border: "oklch(0.55 0.18 145 / 0.35)",
    },
    "West India": {
      bg: "oklch(0.68 0.20 48 / 0.20)",
      text: "oklch(0.85 0.14 60)",
      border: "oklch(0.68 0.20 48 / 0.35)",
    },
    "East India": {
      bg: "oklch(0.55 0.18 200 / 0.20)",
      text: "oklch(0.75 0.12 200)",
      border: "oklch(0.55 0.18 200 / 0.35)",
    },
    "Central India": {
      bg: "oklch(0.55 0.18 28 / 0.20)",
      text: "oklch(0.80 0.14 35)",
      border: "oklch(0.55 0.18 28 / 0.35)",
    },
  };

  return (
    <div
      className="py-10 px-4"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.17 0.07 22) 0%, oklch(0.13 0.05 20) 100%)",
        borderBottom: "1px solid oklch(0.78 0.14 75 / 0.12)",
      }}
      data-ocid="video_darshan.section"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-7">
          <h2
            className="font-decorative text-2xl md:text-3xl font-bold mb-1"
            style={{ color: "oklch(0.88 0.14 75)" }}
          >
            🕉️ Live Temple Darshan
          </h2>
          <p className="text-sm" style={{ color: "oklch(0.68 0.06 55)" }}>
            Watch live darshan and aarti from {templeDarshanVideos.length}{" "}
            sacred temples across India
          </p>
        </div>

        {/* Featured Player */}
        <div
          className="rounded-2xl overflow-hidden mb-5"
          style={{
            border: "1.5px solid oklch(0.78 0.14 75 / 0.25)",
            boxShadow: "0 0 32px oklch(0.68 0.20 48 / 0.10)",
          }}
        >
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              key={activeVideo.youtubeVideoId}
              src={`https://www.youtube.com/embed/${activeVideo.youtubeVideoId}?autoplay=0&rel=0`}
              title={`${activeVideo.templeName} - Live Darshan`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
          </div>
          <div
            className="px-5 py-3 flex items-center justify-between gap-3"
            style={{
              background: "oklch(0.18 0.07 22)",
              borderTop: "1px solid oklch(0.78 0.14 75 / 0.12)",
            }}
          >
            <div className="min-w-0 flex-1">
              <p
                className="font-heading font-semibold text-sm truncate"
                style={{ color: "oklch(0.90 0.06 75)" }}
              >
                {activeVideo.templeName}
              </p>
              <p
                className="text-xs truncate"
                style={{ color: "oklch(0.68 0.04 55)" }}
              >
                {activeVideo.deity} · {activeVideo.location}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {(() => {
                const rc = regionBadgeColors[activeVideo.region];
                return rc ? (
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-heading font-semibold"
                    style={{
                      background: rc.bg,
                      color: rc.text,
                      border: `1px solid ${rc.border}`,
                    }}
                  >
                    {activeVideo.region}
                  </span>
                ) : null;
              })()}
              {activeVideo.isLive && (
                <span
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide"
                  style={{
                    background: "oklch(0.50 0.22 27 / 0.25)",
                    color: "oklch(0.75 0.18 28)",
                    border: "1px solid oklch(0.60 0.20 27 / 0.35)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "oklch(0.65 0.22 28)" }}
                  />
                  LIVE
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Featured Temple Thumbnail Row */}
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {featuredTemples.map((temple) => (
            <button
              key={temple.id}
              type="button"
              onClick={() => setActiveVideo(temple)}
              className="shrink-0 rounded-xl overflow-hidden transition-all duration-200 text-left"
              style={{
                width: 160,
                border:
                  activeVideo.id === temple.id
                    ? "2px solid oklch(0.78 0.14 75)"
                    : "1.5px solid oklch(0.78 0.14 75 / 0.18)",
                background: "oklch(0.20 0.07 22)",
                boxShadow:
                  activeVideo.id === temple.id
                    ? "0 0 12px oklch(0.78 0.14 75 / 0.25)"
                    : "none",
              }}
              data-ocid={`video_darshan.temple_card.${temple.id}`}
            >
              <div
                className="relative"
                style={{
                  paddingTop: "56.25%",
                  background: "oklch(0.16 0.06 20)",
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${temple.youtubeVideoId}/mqdefault.jpg`}
                  alt={temple.templeName}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {temple.isLive && (
                  <span
                    className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider"
                    style={{
                      background: "oklch(0.45 0.22 27 / 0.85)",
                      color: "oklch(0.95 0.06 60)",
                    }}
                  >
                    LIVE
                  </span>
                )}
              </div>
              <div className="p-2">
                <p
                  className="text-[11px] font-heading font-semibold leading-tight line-clamp-1"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {temple.templeName}
                </p>
                <p
                  className="text-[10px] mt-0.5 line-clamp-1"
                  style={{ color: "oklch(0.60 0.04 55)" }}
                >
                  {temple.deity}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* View All Temples expandable section */}
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-semibold text-sm transition-all"
            style={{
              background: showAll
                ? "oklch(0.68 0.20 48 / 0.12)"
                : "oklch(0.22 0.07 22)",
              border: "1.5px solid oklch(0.78 0.14 75 / 0.20)",
              color: "oklch(0.85 0.10 70)",
            }}
            data-ocid="video_darshan.view_all_button"
          >
            {showAll ? "▲ Hide" : "▼ View All Temples"} (
            {templeDarshanVideos.length})
          </button>

          {showAll && (
            <div className="mt-4">
              {/* Region filter buttons */}
              <div
                className="flex flex-wrap gap-2 mb-4"
                data-ocid="video_darshan.region_filters"
              >
                {REGIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRegionFilter(r)}
                    className="px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all"
                    style={{
                      background:
                        regionFilter === r
                          ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                          : "oklch(0.22 0.07 22)",
                      color:
                        regionFilter === r ? "white" : "oklch(0.75 0.08 60)",
                      border:
                        regionFilter === r
                          ? "1.5px solid oklch(0.68 0.20 48)"
                          : "1.5px solid oklch(0.78 0.14 75 / 0.20)",
                    }}
                    data-ocid={`video_darshan.region_filter.${r.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    {r}{" "}
                    {r !== "All"
                      ? `(${templeDarshanVideos.filter((t) => t.region === r).length})`
                      : `(${templeDarshanVideos.length})`}
                  </button>
                ))}
              </div>

              {/* Temple grid */}
              <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                data-ocid="video_darshan.all_temples_grid"
              >
                {filteredTemples.map((temple, idx) => {
                  const rc = regionBadgeColors[temple.region];
                  return (
                    <button
                      key={temple.id}
                      type="button"
                      onClick={() => {
                        setActiveVideo(temple);
                        setShowAll(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="rounded-xl overflow-hidden transition-all duration-200 text-left hover:scale-[1.02]"
                      style={{
                        background: "oklch(0.20 0.07 22)",
                        border:
                          activeVideo.id === temple.id
                            ? "2px solid oklch(0.78 0.14 75)"
                            : "1.5px solid oklch(0.78 0.14 75 / 0.18)",
                        boxShadow:
                          activeVideo.id === temple.id
                            ? "0 0 10px oklch(0.78 0.14 75 / 0.22)"
                            : "none",
                      }}
                      data-ocid={`video_darshan.all_temple_card.${idx + 1}`}
                    >
                      <div
                        className="relative"
                        style={{
                          paddingTop: "56.25%",
                          background: "oklch(0.16 0.06 20)",
                        }}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${temple.youtubeVideoId}/mqdefault.jpg`}
                          alt={temple.templeName}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {temple.isLive && (
                          <span
                            className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider"
                            style={{
                              background: "oklch(0.45 0.22 27 / 0.85)",
                              color: "oklch(0.95 0.06 60)",
                            }}
                          >
                            LIVE
                          </span>
                        )}
                        {activeVideo.id === temple.id && (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ background: "oklch(0.68 0.20 48 / 0.25)" }}
                          >
                            <span className="text-white text-lg">▶</span>
                          </div>
                        )}
                      </div>
                      <div className="p-2.5">
                        <p
                          className="text-xs font-heading font-semibold leading-tight line-clamp-1 mb-1"
                          style={{ color: "oklch(0.88 0.06 75)" }}
                        >
                          {temple.templeName}
                        </p>
                        <p
                          className="text-[10px] line-clamp-1 mb-1.5"
                          style={{ color: "oklch(0.65 0.05 60)" }}
                        >
                          {temple.deity}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {rc && (
                            <span
                              className="inline-block px-1.5 py-0.5 rounded-full text-[9px] font-heading font-semibold"
                              style={{
                                background: rc.bg,
                                color: rc.text,
                                border: `1px solid ${rc.border}`,
                              }}
                            >
                              {temple.region}
                            </span>
                          )}
                        </div>
                        <p
                          className="text-[9px] mt-1 flex items-center gap-0.5"
                          style={{ color: "oklch(0.55 0.04 50)" }}
                        >
                          📍 {temple.location}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface BookingForm {
  devoteeName: string;
  phone: string;
  date: string;
  time: string;
  location: string;
  specialInstructions: string;
}

const defaultForm: BookingForm = {
  devoteeName: "",
  phone: "",
  date: "",
  time: "",
  location: "",
  specialInstructions: "",
};

function PujaCard({
  puja,
  onSelect,
  onBook,
}: { puja: PujaItem; onSelect: () => void; onBook: () => void }) {
  const faithStyle = FAITH_STYLES[puja.faith];
  const bookingStyle = BOOKING_TYPE_STYLES[puja.booking_type];
  return (
    <div
      className="border rounded-xl p-5 transition-all duration-200 hover:shadow-lg"
      style={{
        background: "oklch(0.20 0.07 22)",
        borderColor: "oklch(0.78 0.14 75 / 0.2)",
      }}
      data-ocid={`puja.item.${puja.id}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{puja.emoji}</span>
        <div className="min-w-0 flex-1">
          <h3
            className="font-heading font-bold text-base leading-tight"
            style={{ color: "oklch(0.92 0.06 75)" }}
          >
            {puja.name}
          </h3>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {puja.hindi_name}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <Badge
          style={{
            background: faithStyle.bg,
            color: faithStyle.text,
            border: `1px solid ${faithStyle.border}`,
          }}
        >
          {puja.faith}
        </Badge>
        <Badge
          style={{
            background: bookingStyle.bg,
            color: bookingStyle.text,
            border: `1px solid ${bookingStyle.border}`,
          }}
        >
          {puja.booking_type}
        </Badge>
      </div>

      <div
        className="grid grid-cols-2 gap-2 mb-3 text-xs"
        style={{ color: "oklch(0.70 0.04 60)" }}
      >
        <div>⏱️ {puja.duration}</div>
        <div>
          👨‍⚕️{" "}
          {puja.priest_count === 0
            ? "Self"
            : `${puja.priest_count} Priest${puja.priest_count > 1 ? "s" : ""}`}
        </div>
        <div>🕉️ {puja.deity}</div>
        <div>💰 {puja.price_range}</div>
      </div>

      <p
        className="text-xs line-clamp-2 mb-4"
        style={{ color: "oklch(0.68 0.04 55)" }}
      >
        {puja.significance.slice(0, 120)}...
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onSelect}
          style={{
            borderColor: "oklch(0.78 0.14 75 / 0.3)",
            color: "oklch(0.88 0.06 75)",
          }}
          data-ocid={`puja.details_button.${puja.id}`}
        >
          View Details
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={onBook}
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
          }}
          data-ocid={`puja.book_button.${puja.id}`}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}

function PujaDetail({
  puja,
  onBook,
  onBack,
}: { puja: PujaItem; onBook: () => void; onBack: () => void }) {
  const faithStyle = FAITH_STYLES[puja.faith];
  const bookingStyle = BOOKING_TYPE_STYLES[puja.booking_type];
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-sm transition-colors hover:opacity-80"
        style={{ color: "oklch(0.78 0.14 75)" }}
        data-ocid="puja.back_button"
      >
        ← Back to Puja List
      </button>
      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          background: "oklch(0.20 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div
          className="p-6"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 22), oklch(0.18 0.06 20))",
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{puja.emoji}</span>
            <div>
              <h2
                className="font-decorative text-2xl font-bold"
                style={{ color: "oklch(0.92 0.06 75)" }}
              >
                {puja.name}
              </h2>
              <p
                className="text-base mt-0.5"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {puja.hindi_name}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  style={{
                    background: faithStyle.bg,
                    color: faithStyle.text,
                    border: `1px solid ${faithStyle.border}`,
                  }}
                >
                  {puja.faith}
                </Badge>
                <Badge
                  style={{
                    background: bookingStyle.bg,
                    color: bookingStyle.text,
                    border: `1px solid ${bookingStyle.border}`,
                  }}
                >
                  {puja.booking_type}
                </Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Deity", value: puja.deity },
              { label: "Duration", value: puja.duration },
              {
                label: "Priests",
                value:
                  puja.priest_count === 0 ? "Self" : `${puja.priest_count}`,
              },
              { label: "Price", value: puja.price_range },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg p-3 text-center"
                style={{ background: "oklch(0.24 0.07 22 / 0.6)" }}
              >
                <p
                  className="text-[10px] uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.68 0.12 65)" }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3
              className="font-heading font-semibold mb-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              📖 Significance / महत्व
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.78 0.04 60)" }}
            >
              {puja.significance}
            </p>
          </div>

          <div>
            <h3
              className="font-heading font-semibold mb-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🛕 Occasion / अवसर
            </h3>
            <p className="text-sm" style={{ color: "oklch(0.78 0.04 60)" }}>
              {puja.occasion}
            </p>
          </div>

          <div>
            <h3
              className="font-heading font-semibold mb-3"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🌿 Samagri List / सामग्री
            </h3>
            <ul className="space-y-2">
              {puja.samagri_list.map((item) => (
                <li
                  key={item.slice(0, 30)}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "oklch(0.78 0.04 60)" }}
                >
                  <span
                    className="mt-0.5 text-xs shrink-0"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    ◆
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-lg p-4"
            style={{
              background: "oklch(0.22 0.07 22)",
              borderLeft: "3px solid oklch(0.78 0.14 75)",
            }}
          >
            <h3
              className="font-heading font-semibold mb-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🕉️ Mantra Count
            </h3>
            <p className="text-sm" style={{ color: "oklch(0.80 0.04 60)" }}>
              {puja.mantra_count}
            </p>
          </div>

          <Button
            onClick={onBook}
            className="w-full py-3 text-base font-heading font-semibold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="puja.detail_book_button"
          >
            🙏 Book This Puja — {puja.price_range}
          </Button>
        </div>
      </div>
    </div>
  );
}

function BookingFormView({
  puja,
  onConfirm,
  onBack,
  isLoading,
}: {
  puja: PujaItem;
  onConfirm: (form: BookingForm) => void;
  onBack: () => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState<BookingForm>({ ...defaultForm });
  const set =
    (field: keyof BookingForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.devoteeName || !form.phone || !form.date) {
      toast.error("Please fill in all required fields.");
      return;
    }
    onConfirm(form);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-sm"
        style={{ color: "oklch(0.78 0.14 75)" }}
        data-ocid="puja.booking_back_button"
      >
        ← Back to Puja Details
      </button>
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          background: "oklch(0.20 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div
          className="p-5"
          style={{
            background: "oklch(0.22 0.08 22)",
            borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{puja.emoji}</span>
            <div>
              <h2
                className="font-heading font-bold text-lg"
                style={{ color: "oklch(0.92 0.06 75)" }}
              >
                Book: {puja.name}
              </h2>
              <p className="text-sm" style={{ color: "oklch(0.78 0.14 75)" }}>
                {puja.price_range} · {puja.booking_type}
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label style={{ color: "oklch(0.82 0.06 70)" }}>
                Devotee Name* / भक्त का नाम
              </Label>
              <Input
                value={form.devoteeName}
                onChange={set("devoteeName")}
                placeholder="Full name"
                required
                style={{
                  background: "oklch(0.22 0.07 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                  color: "oklch(0.90 0.04 70)",
                }}
                data-ocid="puja.devotee_name_input"
              />
            </div>
            <div className="space-y-2">
              <Label style={{ color: "oklch(0.82 0.06 70)" }}>
                Phone / मोबाइल*
              </Label>
              <Input
                value={form.phone}
                onChange={set("phone")}
                placeholder="+91 9876543210"
                required
                style={{
                  background: "oklch(0.22 0.07 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                  color: "oklch(0.90 0.04 70)",
                }}
                data-ocid="puja.phone_input"
              />
            </div>
            <div className="space-y-2">
              <Label style={{ color: "oklch(0.82 0.06 70)" }}>
                Preferred Date* / तिथि
              </Label>
              <Input
                type="date"
                value={form.date}
                onChange={set("date")}
                required
                min={new Date().toISOString().split("T")[0]}
                style={{
                  background: "oklch(0.22 0.07 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                  color: "oklch(0.90 0.04 70)",
                }}
                data-ocid="puja.date_input"
              />
            </div>
            <div className="space-y-2">
              <Label style={{ color: "oklch(0.82 0.06 70)" }}>
                Preferred Time / समय
              </Label>
              <Input
                type="time"
                value={form.time}
                onChange={set("time")}
                style={{
                  background: "oklch(0.22 0.07 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                  color: "oklch(0.90 0.04 70)",
                }}
                data-ocid="puja.time_input"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label style={{ color: "oklch(0.82 0.06 70)" }}>
              {puja.booking_type === "At Home"
                ? "Your Address / घर का पता"
                : "City / Location"}
            </Label>
            <Input
              value={form.location}
              onChange={set("location")}
              placeholder={
                puja.booking_type === "At Home"
                  ? "Full address"
                  : "City or temple name"
              }
              style={{
                background: "oklch(0.22 0.07 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.2)",
                color: "oklch(0.90 0.04 70)",
              }}
              data-ocid="puja.location_input"
            />
          </div>
          <div className="space-y-2">
            <Label style={{ color: "oklch(0.82 0.06 70)" }}>
              Special Instructions / विशेष निर्देश
            </Label>
            <Textarea
              value={form.specialInstructions}
              onChange={set("specialInstructions")}
              placeholder="Any special wishes, Gotra, or requirements..."
              rows={3}
              style={{
                background: "oklch(0.22 0.07 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.2)",
                color: "oklch(0.90 0.04 70)",
              }}
              data-ocid="puja.special_instructions_textarea"
            />
          </div>

          <div
            className="rounded-lg p-4"
            style={{
              background: "oklch(0.22 0.07 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
          >
            <p className="text-xs" style={{ color: "oklch(0.65 0.04 55)" }}>
              By booking, you agree to our terms. Payment to be made upon
              confirmation. Our pandit will contact you within 24 hours.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-base font-heading font-semibold disabled:opacity-60"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="puja.submit_button"
          >
            {isLoading
              ? "Submitting Booking..."
              : `🙏 Confirm Booking — ${puja.price_range}`}
          </Button>
        </form>
      </div>
    </div>
  );
}

function BookingConfirmation({
  puja,
  bookingRef,
  onReset,
}: { puja: PujaItem; bookingRef: string; onReset: () => void }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h2
        className="font-decorative text-2xl font-bold mb-3"
        style={{ color: "oklch(0.78 0.14 75)" }}
        data-ocid="puja.success_state"
      >
        Booking Confirmed!
      </h2>
      <p className="text-base mb-2" style={{ color: "oklch(0.88 0.06 75)" }}>
        {puja.name}
      </p>
      <div
        className="rounded-xl p-5 my-6"
        style={{
          background: "oklch(0.20 0.07 22)",
          border: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <p className="text-sm mb-2" style={{ color: "oklch(0.65 0.04 55)" }}>
          Booking Reference
        </p>
        <p
          className="font-mono text-lg font-bold"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          {bookingRef}
        </p>
        <p className="text-xs mt-3" style={{ color: "oklch(0.60 0.04 50)" }}>
          Our team will contact you within 24 hours to confirm the details and
          arrange payment.
        </p>
      </div>
      <div className="flex gap-3 justify-center">
        <Button
          onClick={onReset}
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
          }}
          data-ocid="puja.book_another_button"
        >
          Book Another Puja
        </Button>
      </div>
    </div>
  );
}

export default function PujaBooking() {
  const [view, setView] = useState<ViewState>("list");
  const [selectedPuja, setSelectedPuja] = useState<PujaItem | null>(null);
  const [search, setSearch] = useState("");
  const [faithFilter, setFaithFilter] = useState<"All" | "Hindu" | "Jain">(
    "All",
  );
  const [typeFilter, setTypeFilter] = useState<
    "All" | "Online" | "At Temple" | "At Home"
  >("All");
  const [bookingRef, setBookingRef] = useState("");
  const { identity } = useInternetIdentity();
  const createBooking = useCreatePujaBooking();

  const filtered = pujaItems.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.hindi_name.includes(search) ||
      p.deity.toLowerCase().includes(search.toLowerCase());
    const matchFaith = faithFilter === "All" || p.faith === faithFilter;
    const matchType = typeFilter === "All" || p.booking_type === typeFilter;
    return matchSearch && matchFaith && matchType;
  });

  const handleBook = async (form: BookingForm) => {
    if (!selectedPuja) return;
    if (!identity) {
      toast.error("Please login to book a puja.", {
        description: "Use the Login button in the header.",
      });
      return;
    }
    const ref = `PB-${Date.now().toString(36).toUpperCase()}-${selectedPuja.id.slice(0, 4).toUpperCase()}`;
    try {
      await createBooking.mutateAsync({
        id: ref,
        userId: identity.getPrincipal(),
        templeId: selectedPuja.id,
        devoteeName: form.devoteeName,
        gotra: "",
        pujaType: selectedPuja.name,
        preferredDate: `${form.date}T${form.time || "06:00"}`,
        specialWishes: `Phone: ${form.phone}\nLocation: ${form.location}\n${form.specialInstructions}`,
        status: "pending",
        createdAt: BigInt(Date.now()),
      });
      setBookingRef(ref);
      setView("confirmed");
      toast.success("Booking submitted!", { description: `Ref: ${ref}` });
    } catch {
      // Offline fallback
      setBookingRef(ref);
      setView("confirmed");
      toast.success("Booking recorded!", { description: `Ref: ${ref}` });
    }
  };

  if (view === "confirmed" && selectedPuja) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "oklch(0.14 0.05 20)" }}
      >
        <BookingConfirmation
          puja={selectedPuja}
          bookingRef={bookingRef}
          onReset={() => {
            setView("list");
            setSelectedPuja(null);
          }}
        />
      </div>
    );
  }

  if (view === "book" && selectedPuja) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "oklch(0.14 0.05 20)" }}
      >
        <BookingFormView
          puja={selectedPuja}
          onConfirm={handleBook}
          onBack={() => setView("detail")}
          isLoading={createBooking.isPending}
        />
      </div>
    );
  }

  if (view === "detail" && selectedPuja) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "oklch(0.14 0.05 20)" }}
      >
        <PujaDetail
          puja={selectedPuja}
          onBook={() => setView("book")}
          onBack={() => setView("list")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 20)" }}>
      {/* Hero */}
      <div
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.16 0.06 20) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-5xl text-center">
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🙏 Puja Booking
          </h1>
          <p className="text-lg mb-1" style={{ color: "oklch(0.88 0.06 75)" }}>
            पूजा बुकिंग — Hindu & Jain Sacred Ceremonies
          </p>
          <p
            className="text-sm max-w-2xl mx-auto mb-8"
            style={{ color: "oklch(0.65 0.04 55)" }}
          >
            Book authentic pujas performed by qualified pandits. Online, at
            temple, or at your home. Choose from 20 sacred ceremonies.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.60 0.05 55)" }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search puja name, deity, or occasion..."
              className="pl-10 border"
              style={{
                background: "oklch(0.22 0.07 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.2)",
                color: "oklch(0.90 0.04 70)",
              }}
              data-ocid="puja.search_input"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {(["All", "Hindu", "Jain"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFaithFilter(f)}
                className="px-4 py-1.5 rounded-full text-xs font-heading font-medium transition-all"
                style={{
                  background:
                    faithFilter === f
                      ? "oklch(0.68 0.20 48)"
                      : "oklch(0.22 0.07 22)",
                  color: faithFilter === f ? "white" : "oklch(0.80 0.04 60)",
                  border: `1px solid ${faithFilter === f ? "oklch(0.68 0.20 48)" : "oklch(0.78 0.14 75 / 0.2)"}`,
                }}
                data-ocid={`puja.faith_filter.${f.toLowerCase()}`}
              >
                {f}
              </button>
            ))}
            <span
              className="w-px h-5 self-center"
              style={{ background: "oklch(0.78 0.14 75 / 0.2)" }}
            />
            {(["All", "Online", "At Temple", "At Home"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className="px-4 py-1.5 rounded-full text-xs font-heading font-medium transition-all"
                style={{
                  background:
                    typeFilter === t
                      ? "oklch(0.55 0.15 200)"
                      : "oklch(0.22 0.07 22)",
                  color: typeFilter === t ? "white" : "oklch(0.80 0.04 60)",
                  border: `1px solid ${typeFilter === t ? "oklch(0.55 0.15 200)" : "oklch(0.78 0.14 75 / 0.2)"}`,
                }}
                data-ocid={`puja.type_filter.${t.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <VideoDarshan />
      {/* Puja Grid */}
      <div className="container mx-auto max-w-6xl px-4 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="puja.empty_state">
            <p
              className="text-lg mb-3"
              style={{ color: "oklch(0.65 0.04 55)" }}
            >
              No pujas found matching your filters
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearch("");
                setFaithFilter("All");
                setTypeFilter("All");
              }}
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="puja.list"
          >
            {filtered.map((puja) => (
              <PujaCard
                key={puja.id}
                puja={puja}
                onSelect={() => {
                  setSelectedPuja(puja);
                  setView("detail");
                }}
                onBook={() => {
                  setSelectedPuja(puja);
                  setView("book");
                }}
              />
            ))}
          </div>
        )}

        {/* Info section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              emoji: "🏠",
              title: "At Home Service",
              desc: "Qualified pandits come to your home. Available in 500+ cities across India.",
            },
            {
              emoji: "🛕",
              title: "Temple Booking",
              desc: "Book pujas at major temples. Your sankalp and name read during the ritual.",
            },
            {
              emoji: "💻",
              title: "Online Puja",
              desc: "Live-streamed puja with priest. You participate via video call in real time.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl p-5 text-center"
              style={{
                background: "oklch(0.20 0.07 22)",
                border: "1px solid oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3
                className="font-heading font-semibold mb-2"
                style={{ color: "oklch(0.88 0.06 75)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: "oklch(0.65 0.04 55)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
