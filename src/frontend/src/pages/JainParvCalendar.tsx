import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  type JainParvEvent,
  jainFestivals2026,
  jainParv2026,
} from "../data/jain-parv-data";

type KalyanakFilter = "All" | "Garbha" | "Janma" | "Tapa" | "Jnana" | "Moksha";

const kalyanakLabels: Record<KalyanakFilter, string> = {
  All: "सभी",
  Garbha: "गर्भ",
  Janma: "जन्म",
  Tapa: "तप",
  Jnana: "ज्ञान",
  Moksha: "मोक्ष",
};

const kalyanakColors: Record<string, string> = {
  Garbha: "oklch(0.62 0.18 280)",
  Janma: "oklch(0.62 0.18 120)",
  Tapa: "oklch(0.68 0.20 48)",
  Jnana: "oklch(0.62 0.18 200)",
  Moksha: "oklch(0.72 0.18 60)",
  Festival: "oklch(0.62 0.18 350)",
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthNamesHindi: Record<string, string> = {
  January: "जनवरी",
  February: "फरवरी",
  March: "मार्च",
  April: "अप्रैल",
  May: "मई",
  June: "जून",
  July: "जुलाई",
  August: "अगस्त",
  September: "सितम्बर",
  October: "अक्टूबर",
  November: "नवम्बर",
  December: "दिसम्बर",
};

function EventRow({ event }: { event: JainParvEvent }) {
  const color = kalyanakColors[event.kalyanakType] ?? "oklch(0.62 0.18 48)";
  return (
    <div
      className="flex items-start gap-3 py-3 border-b border-border last:border-0"
      data-ocid={`parv-event-${event.id}`}
    >
      <div className="flex-shrink-0 text-right w-20">
        <div className="text-xs font-semibold text-foreground">
          {event.displayDate.split(" ")[0]} {event.displayDate.split(" ")[1]}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5 leading-tight">
          {event.tithiHindi}
        </div>
      </div>
      <div
        className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
        style={{ background: color }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <span className="text-sm font-semibold text-foreground leading-snug">
            {event.tirthankarName}
          </span>
          <Badge
            variant="outline"
            className="text-xs flex-shrink-0"
            style={{ borderColor: `${color}/0.4`, color, fontSize: "10px" }}
          >
            {event.kalyanakHindi}
          </Badge>
          {event.tirthankarNumber > 0 && (
            <Badge
              variant="secondary"
              className="text-xs flex-shrink-0"
              style={{ fontSize: "10px" }}
            >
              #{event.tirthankarNumber}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
}

function FestivalCard({
  name,
  nameHindi,
  date,
  description,
  icon,
  duration,
}: {
  name: string;
  nameHindi: string;
  date: string;
  description: string;
  icon: string;
  duration?: string;
}) {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const displayDate = d.toLocaleDateString("hi-IN", options);
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-start gap-4">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.88 0.055 75))",
          border: "2px solid oklch(0.78 0.14 75 / 0.3)",
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-foreground text-sm leading-snug">
          {nameHindi}
        </h3>
        <p className="text-xs text-muted-foreground italic mt-0.5">{name}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs" style={{ color: "oklch(0.55 0.18 48)" }}>
            {displayDate}
          </span>
          {duration && (
            <Badge variant="secondary" className="text-xs">
              {duration}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function JainParvCalendar() {
  const [activeFilter, setActiveFilter] = useState<KalyanakFilter>("All");
  const [activeTirthankar, setActiveTirthankar] = useState("सभी");
  const [activeTab, setActiveTab] = useState<"kalyanaks" | "festivals">(
    "kalyanaks",
  );

  const tirthankarNames = [
    "सभी",
    ...Array.from(new Set(jainParv2026.map((e) => e.tirthankarName))).sort(),
  ];

  const filtered = jainParv2026.filter((e) => {
    const matchFilter =
      activeFilter === "All" || e.kalyanakType === activeFilter;
    const matchTirthankar =
      activeTirthankar === "सभी" || e.tirthankarName === activeTirthankar;
    return matchFilter && matchTirthankar;
  });

  const byMonth = months.reduce<Record<string, JainParvEvent[]>>((acc, m) => {
    const events = filtered.filter((e) => e.month === m);
    if (events.length > 0) acc[m] = events;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-12 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22), oklch(0.26 0.08 28) 60%, oklch(0.30 0.10 35))",
        }}
      >
        <div className="text-5xl mb-4">📅</div>
        <h1
          className="font-display text-3xl md:text-4xl font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          जैन पर्व कैलेंडर २०२६
        </h1>
        <p
          className="text-base max-w-xl mx-auto"
          style={{ color: "oklch(0.78 0.14 75 / 0.75)" }}
        >
          चौबीस तीर्थंकरों के कल्याणक • जैन पर्व • तिथि अनुसार क्रमबद्ध
        </p>
        <div
          className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm"
          style={{
            background: "oklch(0.78 0.14 75 / 0.12)",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
            color: "oklch(0.78 0.14 75)",
          }}
        >
          {jainParv2026.length} कल्याणक • {jainFestivals2026.length} पर्व
        </div>
      </div>

      {/* Tab */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "kalyanaks" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("kalyanaks")}
            data-ocid="tab-kalyanaks"
          >
            ✨ कल्याणक
          </Button>
          <Button
            variant={activeTab === "festivals" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("festivals")}
            data-ocid="tab-festivals"
          >
            🎉 पर्व
          </Button>
        </div>

        {activeTab === "festivals" ? (
          <div className="space-y-4 pb-12">
            {jainFestivals2026.map((f) => (
              <FestivalCard key={f.id} {...f} />
            ))}
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(Object.keys(kalyanakLabels) as KalyanakFilter[]).map((k) => (
                <Button
                  key={k}
                  variant={activeFilter === k ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(k)}
                  className="text-xs"
                  data-ocid={`filter-kalyanaka-${k}`}
                >
                  {kalyanakLabels[k]}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {tirthankarNames.slice(0, 13).map((name) => (
                <Button
                  key={name}
                  variant={activeTirthankar === name ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTirthankar(name)}
                  className="text-xs h-7 px-2"
                  data-ocid={`filter-tirthankar-${name}`}
                >
                  {name === "सभी" ? "सभी तीर्थंकर" : name.replace("Shri ", "")}
                </Button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {filtered.length} कल्याणक
            </p>

            {/* Calendar by month */}
            <div className="space-y-6 pb-12">
              {Object.entries(byMonth).map(([month, events]) => (
                <div
                  key={month}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  <div
                    className="px-5 py-3 flex items-center gap-3"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.94 0.035 80), oklch(0.91 0.025 82))",
                      borderBottom: "1px solid oklch(0.88 0.04 75)",
                    }}
                  >
                    <span className="font-display font-bold text-foreground">
                      {monthNamesHindi[month]} {month} 2026
                    </span>
                    <Badge variant="secondary" className="text-xs ml-auto">
                      {events.length} कल्याणक
                    </Badge>
                  </div>
                  <div className="px-5 py-2">
                    {events.map((event) => (
                      <EventRow key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div
                  className="text-center py-16 rounded-xl border border-border"
                  data-ocid="parv-empty"
                >
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-muted-foreground">कोई कल्याणक नहीं मिला</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
