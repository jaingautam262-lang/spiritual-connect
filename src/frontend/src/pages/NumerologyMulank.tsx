import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MULANK_DATA: Record<
  number,
  {
    planet: string;
    personality: string;
    luckyDay: string;
    luckyColor: string;
    compatible: number[];
    hi: {
      planet: string;
      personality: string;
      luckyDay: string;
      luckyColor: string;
    };
  }
> = {
  1: {
    planet: "Sun (Surya)",
    personality:
      "Natural born leaders, confident, independent, self-reliant, ambitious and pioneering.",
    luckyDay: "Sunday",
    luckyColor: "Gold, Orange, Red",
    compatible: [1, 3, 4, 5, 7, 9],
    hi: {
      planet: "सूर्य",
      personality: "जन्मजात नेता, आत्मविश्वासी, स्वतंत्र, महत्वाकांक्षी।",
      luckyDay: "रविवार",
      luckyColor: "सोना, नारंगी, लाल",
    },
  },
  2: {
    planet: "Moon (Chandra)",
    personality:
      "Sensitive, intuitive, emotional, cooperative, and great at understanding others' feelings.",
    luckyDay: "Monday",
    luckyColor: "White, Silver, Cream",
    compatible: [2, 4, 6, 7, 8],
    hi: {
      planet: "चंद्रमा",
      personality: "संवेदनशील, अंतर्ज्ञानी, भावनात्मक, सहयोगी।",
      luckyDay: "सोमवार",
      luckyColor: "सफेद, चांदी, क्रीम",
    },
  },
  3: {
    planet: "Jupiter (Guru)",
    personality:
      "Optimistic, creative, expressive, lucky, and naturally attract good fortune and opportunities.",
    luckyDay: "Thursday",
    luckyColor: "Yellow, Saffron, Purple",
    compatible: [1, 2, 3, 5, 9],
    hi: {
      planet: "बृहस्पति",
      personality: "आशावादी, रचनात्मक, अभिव्यंजक, भाग्यशाली।",
      luckyDay: "गुरुवार",
      luckyColor: "पीला, केसर, बैंगनी",
    },
  },
  4: {
    planet: "Rahu",
    personality:
      "Hardworking, practical, disciplined, methodical, but also prone to unconventional thinking.",
    luckyDay: "Saturday / Sunday",
    luckyColor: "Grey, Dark Blue, Electric Blue",
    compatible: [1, 2, 5, 7, 8],
    hi: {
      planet: "राहु",
      personality: "मेहनती, व्यावहारिक, अनुशासित, अपारंपरिक सोच।",
      luckyDay: "शनिवार/रविवार",
      luckyColor: "ग्रे, गहरा नीला",
    },
  },
  5: {
    planet: "Mercury (Budha)",
    personality:
      "Versatile, quick-thinking, communicative, adventurous and constantly seeking new experiences.",
    luckyDay: "Wednesday",
    luckyColor: "Green, Turquoise, Silver",
    compatible: [1, 3, 4, 5, 6, 7, 9],
    hi: {
      planet: "बुध",
      personality: "बहुमुखी, त्वरित-बुद्धि, संचारी, साहसिक।",
      luckyDay: "बुधवार",
      luckyColor: "हरा, फ़िरोज़ा, चांदी",
    },
  },
  6: {
    planet: "Venus (Shukra)",
    personality:
      "Loving, responsible, harmonious, artistic, and deeply devoted to family and home.",
    luckyDay: "Friday",
    luckyColor: "Pink, Rose, Indigo, White",
    compatible: [1, 2, 3, 6, 9],
    hi: {
      planet: "शुक्र",
      personality: "प्रेमी, जिम्मेदार, सुरीले, कलात्मक, परिवार के प्रति समर्पित।",
      luckyDay: "शुक्रवार",
      luckyColor: "गुलाबी, इंडिगो, सफेद",
    },
  },
  7: {
    planet: "Ketu",
    personality:
      "Mystical, introspective, intellectual, spiritual, and deeply interested in the occult and philosophy.",
    luckyDay: "Sunday / Monday",
    luckyColor: "Violet, Purple, Grey",
    compatible: [1, 2, 5, 6, 7],
    hi: {
      planet: "केतु",
      personality: "रहस्यमय, आत्मनिरीक्षी, बौद्धिक, आध्यात्मिक।",
      luckyDay: "रविवार/सोमवार",
      luckyColor: "बैंगनी, ग्रे",
    },
  },
  8: {
    planet: "Saturn (Shani)",
    personality:
      "Ambitious, disciplined, resilient, practical, and destined for material success through hard work.",
    luckyDay: "Saturday",
    luckyColor: "Black, Dark Blue, Navy, Brown",
    compatible: [2, 4, 6, 8],
    hi: {
      planet: "शनि",
      personality: "महत्वाकांक्षी, अनुशासित, लचीला, व्यावहारिक।",
      luckyDay: "शनिवार",
      luckyColor: "काला, गहरा नीला",
    },
  },
  9: {
    planet: "Mars (Mangal)",
    personality:
      "Energetic, courageous, passionate, idealistic, and driven by strong desire to help humanity.",
    luckyDay: "Tuesday",
    luckyColor: "Red, Crimson, Orange",
    compatible: [1, 2, 3, 5, 6, 9],
    hi: {
      planet: "मंगल",
      personality: "ऊर्जावान, साहसी, भावुक, आदर्शवादी।",
      luckyDay: "मंगलवार",
      luckyColor: "लाल, क्रिमसन, नारंगी",
    },
  },
  11: {
    planet: "Moon / Rahu",
    personality:
      "Highly intuitive, spiritually sensitive, visionary. A master number of illumination.",
    luckyDay: "Monday / Saturday",
    luckyColor: "Silver, White, Indigo",
    compatible: [2, 11, 22],
    hi: {
      planet: "चंद्रमा/राहु",
      personality: "अत्यधिक अंतर्ज्ञानी, आध्यात्मिक रूप से संवेदनशील।",
      luckyDay: "सोमवार/शनिवार",
      luckyColor: "चांदी, सफेद, इंडिगो",
    },
  },
  22: {
    planet: "Uranus / Saturn",
    personality:
      "Master builder energy. Extraordinary practical vision and ability to manifest on a large scale.",
    luckyDay: "Saturday",
    luckyColor: "Earth Tones, Navy, Gold",
    compatible: [4, 11, 22],
    hi: {
      planet: "यूरेनस/शनि",
      personality: "मास्टर बिल्डर ऊर्जा। असाधारण व्यावहारिक दृष्टि।",
      luckyDay: "शनिवार",
      luckyColor: "मिट्टी के रंग, नेवी, सोना",
    },
  },
};

function getMulank(day: number): number {
  if ([11, 22].includes(day)) return day;
  let v = day;
  while (v > 9)
    v = String(v)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  return v;
}

export default function NumerologyMulank() {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function handleCalculate() {
    if (!dob) return;
    const day = new Date(dob).getDate();
    setResult(getMulank(day));
  }

  const data = result ? (MULANK_DATA[result] ?? MULANK_DATA[1]) : null;

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="numerology-mulank.page"
    >
      <div className="bg-card border-b py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isHi ? "मूलांक (Mulank)" : "Mulank Calculator"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isHi
              ? "अपनी जन्म तारीख से मूलांक जानें"
              : "Find your Mulank from your birth date"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {isHi ? "जन्म तिथि" : "Birth Date"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dob-mulank">
                  {isHi ? "जन्म तारीख" : "Date of Birth"}
                </Label>
                <Input
                  id="dob-mulank"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  data-ocid="numerology-mulank.input"
                />
              </div>
              <Button
                className="w-full"
                onClick={handleCalculate}
                data-ocid="numerology-mulank.submit_button"
              >
                {isHi ? "मूलांक जानें" : "Find Mulank"}
              </Button>
            </CardContent>
          </Card>

          {result && data ? (
            <Card className="border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <div className="text-7xl font-display font-bold text-primary mb-2">
                    {result}
                  </div>
                  <div className="font-semibold text-sm text-foreground">
                    {isHi ? "आपका मूलांक" : "Your Mulank"}
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-primary/10 rounded-lg flex justify-between">
                    <span className="font-semibold">
                      {isHi ? "शासक ग्रह" : "Ruling Planet"}
                    </span>
                    <span>{isHi ? data.hi.planet : data.planet}</span>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {isHi ? "व्यक्तित्व" : "Personality"}
                    </div>
                    <div>{isHi ? data.hi.personality : data.personality}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-xs text-muted-foreground uppercase mb-1">
                        {isHi ? "शुभ दिन" : "Lucky Day"}
                      </div>
                      <div className="text-xs">
                        {isHi ? data.hi.luckyDay : data.luckyDay}
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-xs text-muted-foreground uppercase mb-1">
                        {isHi ? "शुभ रंग" : "Lucky Color"}
                      </div>
                      <div className="text-xs">
                        {isHi ? data.hi.luckyColor : data.luckyColor}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <div className="font-semibold text-xs text-muted-foreground uppercase mb-1">
                      {isHi ? "अनुकूल मूलांक" : "Compatible Mulank Numbers"}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {data.compatible.map((n) => (
                        <Badge key={n} variant="outline">
                          {n}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Copied!");
                  }}
                  data-ocid="numerology-mulank.share_button"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  {isHi ? "शेयर करें" : "Share"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center text-muted-foreground">
                <div className="text-4xl mb-3">#</div>
                <p className="text-sm">
                  {isHi ? "जन्म तारीख डालें" : "Enter your birth date"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
