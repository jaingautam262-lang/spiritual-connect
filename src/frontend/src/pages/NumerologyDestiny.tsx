import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function reduceToSingle(n: number, master = [11, 22, 33]): number {
  let v = n;
  while (v > 9 && !master.includes(v))
    v = String(v)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  return v;
}

const DESTINY_DATA: Record<
  number,
  {
    mission: string;
    career: string;
    karmic: string;
    compatible: number[];
    hi: { mission: string; career: string; karmic: string };
  }
> = {
  1: {
    mission: "To lead and pioneer new paths for others",
    career: "Entrepreneurship, management, politics, military",
    karmic: "Learn humility and collaboration",
    compatible: [1, 3, 5],
    hi: {
      mission: "दूसरों के लिए नए रास्ते खोलना",
      career: "उद्यमिता, प्रबंधन, राजनीति, सेना",
      karmic: "विनम्रता और सहयोग सीखें",
    },
  },
  2: {
    mission: "To bring peace, harmony and understanding",
    career: "Diplomacy, counseling, healthcare, arts",
    karmic: "Develop self-confidence and decision-making",
    compatible: [2, 6, 8],
    hi: {
      mission: "शांति, सामंजस्य और समझ लाना",
      career: "कूटनीति, परामर्श, स्वास्थ्य, कला",
      karmic: "आत्मविश्वास और निर्णय लेना विकसित करें",
    },
  },
  3: {
    mission: "To inspire, create and communicate beauty",
    career: "Writing, performing arts, teaching, media",
    karmic: "Focus and follow-through on commitments",
    compatible: [1, 3, 9],
    hi: {
      mission: "प्रेरित करना, रचना करना, सौंदर्य संवाद करना",
      career: "लेखन, कला, शिक्षण, मीडिया",
      karmic: "ध्यान और प्रतिबद्धताओं पर अनुसरण",
    },
  },
  4: {
    mission: "To build stable foundations for society",
    career: "Engineering, accounting, architecture, real estate",
    karmic: "Embrace change and flexibility",
    compatible: [2, 4, 8],
    hi: {
      mission: "समाज के लिए स्थिर नींव बनाना",
      career: "इंजीनियरिंग, लेखा, वास्तुकला",
      karmic: "परिवर्तन और लचीलापन अपनाएं",
    },
  },
  5: {
    mission: "To promote freedom and progressive change",
    career: "Travel, media, sales, adventure, politics",
    karmic: "Develop commitment and responsibility",
    compatible: [1, 5, 7],
    hi: {
      mission: "स्वतंत्रता और प्रगतिशील परिवर्तन को बढ़ावा देना",
      career: "यात्रा, मीडिया, बिक्री, राजनीति",
      karmic: "प्रतिबद्धता और जिम्मेदारी विकसित करें",
    },
  },
  6: {
    mission: "To serve, nurture and create harmony in family",
    career: "Healthcare, education, social work, design",
    karmic: "Let go of perfectionism and accept others",
    compatible: [2, 6, 9],
    hi: {
      mission: "परिवार में सेवा, पोषण और सद्भाव बनाना",
      career: "स्वास्थ्य, शिक्षा, सामाजिक कार्य, डिज़ाइन",
      karmic: "पूर्णतावाद छोड़ें और दूसरों को स्वीकार करें",
    },
  },
  7: {
    mission: "To seek truth, spiritual wisdom and inner knowledge",
    career: "Research, spirituality, science, philosophy",
    karmic: "Open up to others and share your wisdom",
    compatible: [1, 5, 7],
    hi: {
      mission: "सत्य, आध्यात्मिक ज्ञान की खोज",
      career: "अनुसंधान, आध्यात्मिकता, विज्ञान, दर्शन",
      karmic: "दूसरों के प्रति खुलें और अपना ज्ञान साझा करें",
    },
  },
  8: {
    mission: "To achieve material success and empower others",
    career: "Finance, business, law, real estate, banking",
    karmic: "Balance material and spiritual aspects",
    compatible: [2, 4, 8],
    hi: {
      mission: "भौतिक सफलता प्राप्त करना और दूसरों को सशक्त करना",
      career: "वित्त, व्यापार, कानून, बैंकिंग",
      karmic: "भौतिक और आध्यात्मिक पहलुओं को संतुलित करें",
    },
  },
  9: {
    mission: "To serve humanity and complete karmic cycles",
    career: "Philanthropy, arts, healing, education",
    karmic: "Release attachments and forgive past wounds",
    compatible: [3, 6, 9],
    hi: {
      mission: "मानवता की सेवा करना और कर्म चक्र पूरा करना",
      career: "परोपकार, कला, उपचार, शिक्षा",
      karmic: "आसक्ति छोड़ें और पुराने घावों को माफ करें",
    },
  },
  11: {
    mission: "To enlighten and inspire through higher wisdom",
    career: "Spiritual teaching, counseling, arts, healing",
    karmic: "Ground yourself and trust the practical path",
    compatible: [2, 11, 22],
    hi: {
      mission: "उच्चतर ज्ञान से प्रबुद्ध और प्रेरित करना",
      career: "आध्यात्मिक शिक्षण, परामर्श, कला, उपचार",
      karmic: "खुद को स्थिर करें",
    },
  },
  22: {
    mission: "To manifest large-scale positive change in the world",
    career: "Large organizations, government, global projects",
    karmic: "Use your power responsibly for collective good",
    compatible: [4, 11, 22],
    hi: {
      mission: "दुनिया में बड़े पैमाने पर सकारात्मक परिवर्तन लाना",
      career: "बड़े संगठन, सरकार, वैश्विक परियोजनाएं",
      karmic: "सामूहिक भलाई के लिए अपनी शक्ति का जिम्मेदारी से उपयोग करें",
    },
  },
};

export default function NumerologyDestiny() {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function handleCalculate() {
    if (!dob) return;
    const digits = dob
      .replace(/[^0-9]/g, "")
      .split("")
      .map(Number);
    const total = digits.reduce((a, b) => a + b, 0);
    setResult(reduceToSingle(total));
  }

  const data = result ? (DESTINY_DATA[result] ?? DESTINY_DATA[9]) : null;

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="numerology-destiny.page"
    >
      <div className="bg-card border-b py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isHi ? "भाग्यांक (Destiny Number)" : "Destiny Number"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isHi
              ? "जन्म तिथि से जीवन मिशन जानें"
              : "Discover your life mission from date of birth"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {isHi ? "जन्म तिथि" : "Date of Birth"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dob-destiny">
                  {isHi ? "पूरी जन्म तारीख" : "Full Date of Birth"}
                </Label>
                <Input
                  id="dob-destiny"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  data-ocid="numerology-destiny.input"
                />
              </div>
              <Button
                className="w-full"
                onClick={handleCalculate}
                data-ocid="numerology-destiny.submit_button"
              >
                {isHi ? "भाग्यांक जानें" : "Find Destiny Number"}
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
                    {isHi ? "आपका भाग्यांक" : "Your Destiny Number"}
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {isHi ? "जीवन मिशन" : "Life Mission"}
                    </div>
                    <div>{isHi ? data.hi.mission : data.mission}</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {isHi ? "करियर मार्गदर्शन" : "Career Guidance"}
                    </div>
                    <div>{isHi ? data.hi.career : data.career}</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {isHi ? "कर्म पाठ" : "Karmic Lesson"}
                    </div>
                    <div>{isHi ? data.hi.karmic : data.karmic}</div>
                  </div>
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {isHi ? "अनुकूल अंक" : "Compatible Numbers"}
                    </div>
                    <div className="flex gap-1">
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
                  data-ocid="numerology-destiny.share_button"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  {isHi ? "शेयर करें" : "Share"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center text-muted-foreground">
                <div className="text-4xl mb-3">⭐</div>
                <p className="text-sm">
                  {isHi ? "जन्म तिथि डालें" : "Enter your date of birth"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
