import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function extractDigits(vehicleNum: string): number[] {
  return vehicleNum
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);
}

function reduceToSingle(n: number): number {
  let v = n;
  while (v > 9)
    v = String(v)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  return v;
}

const VEHICLE_MEANINGS: Record<
  number,
  {
    favorable: boolean;
    meaning: string;
    remedy: string;
    hi: { meaning: string; remedy: string };
  }
> = {
  1: {
    favorable: true,
    meaning:
      "Number 1 vehicles bring leadership energy. Ideal for entrepreneurs and executives.",
    remedy:
      "Keep fresh flowers in the car. Face East when starting the vehicle.",
    hi: {
      meaning: "अंक 1 के वाहन नेतृत्व ऊर्जा लाते हैं। उद्यमियों के लिए आदर्श।",
      remedy: "कार में ताज़े फूल रखें। वाहन शुरू करते समय पूर्व की ओर मुंह करें।",
    },
  },
  2: {
    favorable: true,
    meaning:
      "Number 2 vehicles offer protection and balance. Great for family use and long journeys.",
    remedy: "Keep a white cloth or silver coin in the glove box.",
    hi: {
      meaning: "अंक 2 के वाहन सुरक्षा और संतुलन प्रदान करते हैं। परिवार के लिए बढ़िया।",
      remedy: "ग्लव बॉक्स में सफेद कपड़ा या चांदी का सिक्का रखें।",
    },
  },
  3: {
    favorable: true,
    meaning:
      "Number 3 vehicles are lucky and bring joy, social interactions, and positive outcomes.",
    remedy: "Hang a yellow talisman or Lord Ganesh idol in the vehicle.",
    hi: {
      meaning: "अंक 3 के वाहन भाग्यशाली होते हैं और आनंद लाते हैं।",
      remedy: "वाहन में पीला तावीज़ या गणेश जी की मूर्ति लगाएं।",
    },
  },
  4: {
    favorable: false,
    meaning:
      "Number 4 is associated with Rahu. May bring unexpected situations. Drive carefully.",
    remedy:
      "Perform Rahu puja. Keep a black or dark blue cloth in the vehicle.",
    hi: {
      meaning: "अंक 4 राहु से जुड़ा है। अप्रत्याशित स्थितियां आ सकती हैं। सावधानी से चलाएं।",
      remedy: "राहु पूजा करें। वाहन में काला या गहरा नीला कपड़ा रखें।",
    },
  },
  5: {
    favorable: true,
    meaning:
      "Number 5 vehicles ruled by Mercury bring versatility, frequent travel, and business success.",
    remedy: "Keep a green or emerald stone in the vehicle.",
    hi: {
      meaning: "अंक 5 के वाहन बुध द्वारा शासित हैं। यात्रा और व्यापार में सफलता देते हैं।",
      remedy: "वाहन में हरा या पन्ना पत्थर रखें।",
    },
  },
  6: {
    favorable: true,
    meaning:
      "Number 6 vehicles bring comfort, luxury feelings, and harmony to relationships during travel.",
    remedy: "Keep rose quartz or a picture of Goddess Lakshmi in the vehicle.",
    hi: {
      meaning: "अंक 6 के वाहन आराम और सद्भाव लाते हैं।",
      remedy: "वाहन में रोज़ क्वार्ट्ज़ या लक्ष्मी जी की तस्वीर रखें।",
    },
  },
  7: {
    favorable: true,
    meaning:
      "Number 7 vehicles are spiritually charged and protect the driver during journeys.",
    remedy:
      "Keep a crystal or amethyst stone. Chant Mahamrityunjaya before travelling.",
    hi: {
      meaning: "अंक 7 के वाहन आध्यात्मिक रूप से चार्ज हैं और यात्राओं में सुरक्षा करते हैं।",
      remedy: "स्फटिक या अमेथिस्ट रखें। यात्रा से पहले महामृत्युंजय मंत्र जपें।",
    },
  },
  8: {
    favorable: false,
    meaning:
      "Number 8 vehicles ruled by Saturn may bring delays or obstacles. Be cautious in traffic.",
    remedy:
      "Donate black sesame seeds on Saturdays. Keep an iron nail under the seat.",
    hi: {
      meaning: "अंक 8 के वाहन शनि द्वारा शासित हैं। देरी हो सकती है।",
      remedy: "शनिवार को काले तिल का दान करें। सीट के नीचे लोहे की कील रखें।",
    },
  },
  9: {
    favorable: true,
    meaning:
      "Number 9 vehicles bring courage, energy and Mars-like protection. Great for travel.",
    remedy:
      "Keep a red cloth or copper coin in the vehicle. Drive on Tuesdays for auspiciousness.",
    hi: {
      meaning: "अंक 9 के वाहन साहस और मंगल जैसी सुरक्षा प्रदान करते हैं।",
      remedy: "वाहन में लाल कपड़ा या तांबे का सिक्का रखें।",
    },
  },
};

export default function NumerologyVehicle() {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const [vehicleNum, setVehicleNum] = useState("");
  const [result, setResult] = useState<{
    num: number;
    digits: number[];
  } | null>(null);

  function handleCalculate() {
    const digits = extractDigits(vehicleNum);
    if (!digits.length) return;
    const total = digits.reduce((a, b) => a + b, 0);
    const num = reduceToSingle(total);
    setResult({ num, digits });
  }

  const data = result ? VEHICLE_MEANINGS[result.num] : null;

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="numerology-vehicle.page"
    >
      <div className="bg-card border-b py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isHi ? "वाहन संख्या अंकज्योतिष" : "Vehicle Number Numerology"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isHi
              ? "अपने वाहन का नंबर जांचें"
              : "Check if your vehicle number is lucky"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {isHi ? "वाहन नंबर" : "Vehicle Number"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{isHi ? "पंजीकरण नंबर" : "Registration Number"}</Label>
                <Input
                  value={vehicleNum}
                  onChange={(e) => setVehicleNum(e.target.value.toUpperCase())}
                  placeholder="MH01AB1234"
                  data-ocid="numerology-vehicle.input"
                />
                <p className="text-xs text-muted-foreground">
                  {isHi ? "उदाहरण: MH01AB1234" : "Example: MH01AB1234"}
                </p>
              </div>
              <Button
                className="w-full"
                onClick={handleCalculate}
                data-ocid="numerology-vehicle.submit_button"
              >
                {isHi ? "जांचें" : "Check"}
              </Button>
            </CardContent>
          </Card>

          {result && data ? (
            <Card
              className={`border-${data.favorable ? "primary" : "destructive"}/30`}
            >
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <div className="text-7xl font-display font-bold text-primary mb-2">
                    {result.num}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {vehicleNum} → digits: [{result.digits.join("+")}] ={" "}
                    {result.digits.reduce((a, b) => a + b, 0)} → {result.num}
                  </div>
                </div>
                <Badge
                  className={`w-full justify-center py-1 ${data.favorable ? "bg-green-100 text-green-800" : "bg-destructive/10 text-destructive"}`}
                >
                  {data.favorable
                    ? isHi
                      ? "✓ शुभ वाहन नंबर"
                      : "✓ Favorable Vehicle Number"
                    : isHi
                      ? "⚠ अशुभ वाहन नंबर"
                      : "⚠ Unfavorable Vehicle Number"}
                </Badge>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  {isHi ? data.hi.meaning : data.meaning}
                </div>
                <div className="p-3 bg-accent/20 rounded-lg">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    {isHi ? "उपाय" : "Remedy"}
                  </div>
                  <div className="text-sm">
                    {isHi ? data.hi.remedy : data.remedy}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success(isHi ? "लिंक कॉपी हो गया!" : "Copied!");
                  }}
                  data-ocid="numerology-vehicle.share_button"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  {isHi ? "शेयर करें" : "Share"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center text-muted-foreground">
                <div className="text-4xl mb-3">🚗</div>
                <p className="text-sm">
                  {isHi ? "वाहन नंबर डालें" : "Enter vehicle number"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
