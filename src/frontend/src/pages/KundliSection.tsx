import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const CHARTS = [
  {
    id: "d1",
    label: "D1",
    name: "Lagna / Birth Chart",
    desc: "Core personality & life events",
    color: "bg-primary/10",
  },
  {
    id: "d2",
    label: "D2",
    name: "Hora",
    desc: "Wealth & financial patterns",
    color: "bg-accent/20",
  },
  {
    id: "d3",
    label: "D3",
    name: "Drekkana",
    desc: "Siblings & courage",
    color: "bg-muted/60",
  },
  {
    id: "d4",
    label: "D4",
    name: "Chaturthamsha",
    desc: "Property & fixed assets",
    color: "bg-primary/10",
  },
  {
    id: "d7",
    label: "D7",
    name: "Saptamsha",
    desc: "Children & progeny",
    color: "bg-accent/20",
  },
  {
    id: "d9",
    label: "D9",
    name: "Navamsa",
    desc: "Marriage & dharma",
    color: "bg-primary/10",
  },
  {
    id: "d10",
    label: "D10",
    name: "Dashamsha",
    desc: "Career & profession",
    color: "bg-muted/60",
  },
  {
    id: "d12",
    label: "D12",
    name: "Dwadashamsha",
    desc: "Parents & ancestors",
    color: "bg-accent/20",
  },
  {
    id: "d16",
    label: "D16",
    name: "Shodashamsha",
    desc: "Vehicles & comforts",
    color: "bg-primary/10",
  },
  {
    id: "d20",
    label: "D20",
    name: "Vimshamsha",
    desc: "Spiritual pursuits",
    color: "bg-accent/20",
  },
  {
    id: "d24",
    label: "D24",
    name: "Chaturvimshamsha",
    desc: "Education & knowledge",
    color: "bg-muted/60",
  },
  {
    id: "d27",
    label: "D27",
    name: "Saptavimshamsha",
    desc: "Strength & vitality",
    color: "bg-primary/10",
  },
  {
    id: "d30",
    label: "D30",
    name: "Trimshamsha",
    desc: "Misfortunes & evils",
    color: "bg-accent/20",
  },
  {
    id: "d40",
    label: "D40",
    name: "Khavedamsha",
    desc: "Maternal legacy",
    color: "bg-muted/60",
  },
  {
    id: "d45",
    label: "D45",
    name: "Akshavedamsha",
    desc: "Paternal legacy",
    color: "bg-primary/10",
  },
  {
    id: "d60",
    label: "D60",
    name: "Shashtyamsha",
    desc: "Karma & past lives",
    color: "bg-accent/20",
  },
  {
    id: "moon",
    label: "Moon",
    name: "Moon Chart",
    desc: "Emotional patterns",
    color: "bg-muted/60",
  },
  {
    id: "sun",
    label: "Sun",
    name: "Sun Chart",
    desc: "Soul & life purpose",
    color: "bg-primary/10",
  },
  {
    id: "kp-transit",
    label: "KP Transit",
    name: "KP Transit Chart",
    desc: "KP system transits",
    color: "bg-accent/20",
  },
];

const GROUPS = [
  {
    label: "D1-D12",
    filter: (c: (typeof CHARTS)[0]) =>
      ["d1", "d2", "d3", "d4", "d7", "d9", "d10", "d12"].includes(c.id),
  },
  {
    label: "D16-D30",
    filter: (c: (typeof CHARTS)[0]) =>
      ["d16", "d20", "d24", "d27", "d30"].includes(c.id),
  },
  {
    label: "D40-D60",
    filter: (c: (typeof CHARTS)[0]) => ["d40", "d45", "d60"].includes(c.id),
  },
  {
    label: "Special",
    filter: (c: (typeof CHARTS)[0]) =>
      ["moon", "sun", "kp-transit"].includes(c.id),
  },
  { label: "Tables", filter: () => false },
];

const TABLE_LINKS = [
  { href: "/kundli/planets", label: "Planetary Positions", hi: "ग्रह स्थिति" },
  {
    href: "/kundli/sub-lords",
    label: "KP Sub-Lords Table",
    hi: "KP सब-लॉर्ड तालिका",
  },
  { href: "/kundli/dasha", label: "Vimshottari Dasha", hi: "विंशोत्तरी दशा" },
  { href: "/kundli/shadbala", label: "Shadbala — Six Strengths", hi: "षड्बल" },
  { href: "/kundli/ashtakavarga", label: "Ashtakavarga System", hi: "अष्टकवर्ग" },
];

export default function KundliSection() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isHi = language === "hi";
  const [group, setGroup] = useState("D1-D12");

  const current = GROUPS.find((g) => g.label === group);
  const filtered = current ? CHARTS.filter(current.filter) : [];

  return (
    <div className="min-h-screen bg-background" data-ocid="kundli-section.page">
      <div className="bg-card border-b py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isHi ? "कुंडली विभागीय चार्ट" : "Kundli Divisional Charts"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isHi
              ? "19 विभागीय चार्ट और ग्रह तालिकाएं"
              : "19 divisional charts + planetary tables"}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Tabs */}
        <Tabs value={group} onValueChange={setGroup}>
          <TabsList className="flex flex-wrap h-auto gap-1">
            {GROUPS.map((g) => (
              <TabsTrigger
                key={g.label}
                value={g.label}
                className="text-xs"
                data-ocid={`kundli.tab.${g.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              >
                {g.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {group === "Tables" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TABLE_LINKS.map((t) => (
              <Card
                key={t.href}
                className="cursor-pointer hover:border-primary/40 transition-colors"
                onClick={() => navigate({ to: t.href })}
                data-ocid={`kundli.table.${t.href.split("/").pop()}`}
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <span className="font-medium text-sm">
                    {isHi ? t.hi : t.label}
                  </span>
                  <Badge variant="outline">{isHi ? "तालिका" : "Table"}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((chart) => (
              <Card
                key={chart.id}
                className={`cursor-pointer hover:border-primary/40 transition-colors ${chart.color}`}
                onClick={() => navigate({ to: `/kundli/${chart.id}` })}
                data-ocid={`kundli.chart.${chart.id}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className="text-xs">{chart.label}</Badge>
                  </div>
                  <CardTitle className="text-base font-semibold">
                    {chart.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{chart.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
