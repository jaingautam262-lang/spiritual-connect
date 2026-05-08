import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function reduceToSingle(n: number): number {
  let v = n;
  while (v > 9)
    v = String(v)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  return v;
}

const MOBILE_DATA: Record<
  number,
  {
    good: boolean[];
    label: string;
    note: string;
    hi: { label: string; note: string };
  }
> = {
  1: {
    good: [1, 3, 5, 9],
    label: "Power Number",
    note: "Excellent for leaders, entrepreneurs. Boosts confidence and authority.",
    hi: {
      label: "पावर नंबर",
      note: "नेताओं और उद्यमियों के लिए उत्कृष्ट। आत्मविश्वास बढ़ाता है।",
    },
  } as never,
  2: {
    good: [2, 6, 8],
    label: "Harmony Number",
    note: "Best for partnerships and relationships. Promotes diplomacy.",
    hi: {
      label: "सामंजस्य नंबर",
      note: "साझेदारी के लिए सर्वश्रेष्ठ। कूटनीति को बढ़ावा देता है।",
    },
  } as never,
  3: {
    good: [1, 3, 9],
    label: "Creative Number",
    note: "Great for artists, teachers, and communicators. Energizes expression.",
    hi: {
      label: "रचनात्मक नंबर",
      note: "कलाकारों और शिक्षकों के लिए बढ़िया। अभिव्यक्ति को ऊर्जा देता है।",
    },
  } as never,
  4: {
    good: [4, 6, 8],
    label: "Rahu Number",
    note: "Can bring unexpected changes. Works well for those with Rahu prominent in chart.",
    hi: {
      label: "राहु नंबर",
      note: "अप्रत्याशित बदलाव ला सकता है। राहु-प्रधान कुंडली वालों के लिए ठीक।",
    },
  } as never,
  5: {
    good: [1, 5, 7],
    label: "Mercury Number",
    note: "Excellent for business, trading, and communication. Brings versatility.",
    hi: { label: "बुध नंबर", note: "व्यापार और संचार के लिए उत्कृष्ट।" },
  } as never,
  6: {
    good: [2, 4, 6],
    label: "Venus Number",
    note: "Brings luxury, love, and harmony. Best for relationships and creative fields.",
    hi: { label: "शुक्र नंबर", note: "विलासिता, प्रेम और सद्भाव लाता है।" },
  } as never,
  7: {
    good: [1, 5, 7],
    label: "Spiritual Number",
    note: "Deeply spiritual. Excellent for researchers, spiritualists, and healers.",
    hi: {
      label: "आध्यात्मिक नंबर",
      note: "गहरा आध्यात्मिक। शोधकर्ताओं और आध्यात्मिकों के लिए उत्कृष्ट।",
    },
  } as never,
  8: {
    good: [2, 4, 6, 8],
    label: "Saturn Number",
    note: "Powerful for discipline and ambition. May bring delays but ultimate success.",
    hi: { label: "शनि नंबर", note: "अनुशासन और महत्वाकांक्षा के लिए शक्तिशाली।" },
  } as never,
  9: {
    good: [1, 3, 6, 9],
    label: "Mars Number",
    note: "Dynamic, energetic. Excellent for athletes, military, and leaders.",
    hi: {
      label: "मंगल नंबर",
      note: "गतिशील, ऊर्जावान। एथलीट और नेताओं के लिए उत्कृष्ट।",
    },
  } as never,
};

export default function NumerologyMobile() {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const [mobile, setMobile] = useState("");
  const [lifePath, setLifePath] = useState("");
  const [result, setResult] = useState<{
    mobileNum: number;
    alignment: boolean;
  } | null>(null);

  function handleCalculate() {
    const digits = mobile
      .replace(/[^0-9]/g, "")
      .split("")
      .map(Number);
    if (digits.length !== 10) {
      toast.error(
        isHi ? "10 अंकों का मोबाइल नंबर डालें" : "Enter 10-digit mobile number",
      );
      return;
    }
    const total = digits.reduce((a, b) => a + b, 0);
    const mobileNum = reduceToSingle(total);
    const lp = lifePath ? reduceToSingle(Number(lifePath)) : null;
    const mData = MOBILE_DATA[mobileNum] as {
      good: number[];
    } & (typeof MOBILE_DATA)[1];
    const alignment = lp ? mData.good.includes(lp) : true;
    setResult({ mobileNum, alignment });
  }

  const data = result
    ? (MOBILE_DATA[result.mobileNum] as (typeof MOBILE_DATA)[1])
    : null;

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="numerology-mobile.page"
    >
      <div className="bg-card border-b py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isHi ? "मोबाइल नंबर अंकज्योतिष" : "Mobile Number Numerology"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isHi
              ? "क्या आपका मोबाइल नंबर आपके लिए अनुकूल है?"
              : "Is your mobile number good for you?"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {isHi ? "विवरण दर्ज करें" : "Enter Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>
                  {isHi ? "मोबाइल नंबर (10 अंक)" : "Mobile Number (10 digits)"}
                </Label>
                <Input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9876543210"
                  maxLength={10}
                  data-ocid="numerology-mobile.input"
                />
              </div>
              <div className="space-y-2">
                <Label>
                  {isHi
                    ? "आपका जीवन पथ अंक (वैकल्पिक)"
                    : "Your Life Path Number (optional)"}
                </Label>
                <Input
                  value={lifePath}
                  onChange={(e) => setLifePath(e.target.value)}
                  placeholder="1-9"
                  maxLength={2}
                  data-ocid="numerology-mobile.lifepath_input"
                />
              </div>
              <Button
                className="w-full"
                onClick={handleCalculate}
                data-ocid="numerology-mobile.submit_button"
              >
                {isHi ? "विश्लेषण करें" : "Analyze"}
              </Button>
            </CardContent>
          </Card>

          {result && data ? (
            <Card className="border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <div className="text-7xl font-display font-bold text-primary mb-2">
                    {result.mobileNum}
                  </div>
                  <Badge>{isHi ? data.hi.label : data.label}</Badge>
                </div>
                {lifePath && (
                  <Badge
                    className={`w-full justify-center py-1 ${result.alignment ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {result.alignment
                      ? isHi
                        ? "✓ आपके जीवन पथ के साथ संरेखित"
                        : "✓ Aligned with your Life Path"
                      : isHi
                        ? "⚠ आपके जीवन पथ के साथ मिश्रित"
                        : "⚠ Mixed alignment with your Life Path"}
                  </Badge>
                )}
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  {isHi ? data.hi.note : data.note}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success(isHi ? "लिंक कॉपी!" : "Copied!");
                  }}
                  data-ocid="numerology-mobile.share_button"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  {isHi ? "शेयर करें" : "Share"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center text-muted-foreground">
                <div className="text-4xl mb-3">📱</div>
                <p className="text-sm">
                  {isHi ? "मोबाइल नंबर डालें" : "Enter mobile number"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
