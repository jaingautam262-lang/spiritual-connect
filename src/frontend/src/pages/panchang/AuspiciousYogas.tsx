import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

interface YogaEntry {
  name: string;
  hindi: string;
  type: "highly_auspicious" | "moderately_auspicious" | "inactive";
  significance: string;
  activities: string[];
  trigger: string; // what combination creates it
}

const AUSPICIOUS_YOGAS: YogaEntry[] = [
  {
    name: "Amrit Siddhi Yoga",
    hindi: "अमृत सिद्धि योग",
    type: "highly_auspicious",
    significance:
      "The most auspicious yoga. All works begun during this time attain perfection and lasting results.",
    activities: [
      "Marriage ceremonies",
      "Business inaugurations",
      "Medical treatments",
      "New ventures",
      "Religious ceremonies",
    ],
    trigger:
      "Sunday+Hastam, Monday+Mrigashira/Punarvasu, Tuesday+Ashwini, Wednesday+Anuradha, Thursday+Pushya, Friday+Revati, Saturday+Rohini",
  },
  {
    name: "Sarva Siddhi Yoga",
    hindi: "सर्व सिद्धि योग",
    type: "highly_auspicious",
    significance:
      "All wishes are fulfilled. Excellent for auspicious activities of all kinds.",
    activities: [
      "Starting businesses",
      "Important travel",
      "Filing legal documents",
      "Health procedures",
    ],
    trigger: "Specific Nakshatra+Weekday+Tithi combinations",
  },
  {
    name: "Ravi Pushya Yoga",
    hindi: "रवि पुष्य योग",
    type: "highly_auspicious",
    significance:
      "Sunday + Pushya Nakshatra. Extremely rare and powerful for wealth and gold purchases.",
    activities: [
      "Gold/property purchase",
      "New account opening",
      "Job starts",
      "Loan repayment",
    ],
    trigger: "Sunday + Pushya Nakshatra",
  },
  {
    name: "Guru Pushya Yoga",
    hindi: "गुरु पुष्य योग",
    type: "highly_auspicious",
    significance:
      "Thursday + Pushya Nakshatra. Auspicious for education, wealth, new ventures.",
    activities: [
      "Start studying",
      "Gurukul enrollment",
      "Wealth rituals",
      "New business launch",
    ],
    trigger: "Thursday + Pushya Nakshatra",
  },
  {
    name: "Dwipushkar Yoga",
    hindi: "द्विपुष्कर योग",
    type: "moderately_auspicious",
    significance:
      "All actions are doubled in effect. Good for wealth-generating activities.",
    activities: ["Investment", "Double bookings", "Auspicious purchases"],
    trigger: "Sun/Mars + specific Tithis + specific Nakshatras",
  },
  {
    name: "Tripushkar Yoga",
    hindi: "त्रिपुष्कर योग",
    type: "moderately_auspicious",
    significance:
      "All results are tripled. Very beneficial for financial gains.",
    activities: ["Large investments", "Triple bookings", "Wealth rituals"],
    trigger: "Specific Weekday + Tithi + Nakshatra combination",
  },
  {
    name: "Siddha Yoga",
    hindi: "सिद्ध योग",
    type: "moderately_auspicious",
    significance:
      "Works started reach completion. Good for legal matters and education.",
    activities: ["Court hearings", "Exam appearances", "Property registration"],
    trigger: "Specific Nakshatra in Yoga index",
  },
  {
    name: "Shubha Yoga",
    hindi: "शुभ योग",
    type: "moderately_auspicious",
    significance: "Auspicious yoga favoring social events and ceremonies.",
    activities: ["Social gatherings", "Ceremonies", "Gift giving"],
    trigger: "Sun+Moon yoga index = Shubha",
  },
];

function getDayYogas(
  date: string,
): { yoga: YogaEntry; active: boolean; duration: string }[] {
  const d = new Date(date);
  const wd = d.getDay();
  const day = d.getDate();

  return AUSPICIOUS_YOGAS.map((yoga, i) => {
    let active = false;
    if (yoga.name === "Ravi Pushya Yoga") active = wd === 0 && day % 27 === 7;
    else if (yoga.name === "Guru Pushya Yoga")
      active = wd === 4 && day % 27 === 7;
    else if (yoga.name === "Amrit Siddhi Yoga")
      active = [0, 1, 2, 3, 4, 5, 6].includes(wd) && (day + wd) % 5 === 0;
    else if (yoga.name === "Sarva Siddhi Yoga")
      active = (day + wd * 3) % 7 === 0;
    else active = (day * (i + 1) + wd) % 4 === i % 4;

    const hours = 4 + (i % 3) * 2;
    return { yoga, active, duration: `${hours} hours` };
  });
}

export default function AuspiciousYogas() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const [date, setDate] = useState(
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
  );
  const [yogas, setYogas] = useState<ReturnType<typeof getDayYogas>>([]);

  function calculate() {
    setYogas(getDayYogas(date));
  }

  const typeStyles: Record<string, string> = {
    highly_auspicious: "border-2 border-green-400 bg-green-50",
    moderately_auspicious: "border border-amber-300 bg-amber-50",
    inactive: "border border-gray-200 bg-gray-50 opacity-60",
  };
  const badgeStyles: Record<string, string> = {
    highly_auspicious: "bg-green-600 text-white",
    moderately_auspicious: "bg-amber-500 text-white",
    inactive: "bg-gray-400 text-white",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-amber-200 mb-3 flex items-center gap-1">
            <Link to="/" className="hover:text-white">
              🏠
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/panchang" className="hover:text-white">
              {hi ? "पंचांग" : "Panchang"}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span>{hi ? "शुभ योग" : "Auspicious Yogas"}</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "शुभ योग कैलकुलेटर" : "Auspicious Yogas Calculator"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi
              ? "अमृत सिद्धि, सर्व सिद्धि, रवि पुष्य और अन्य शुभ योग"
              : "Amrit Siddhi, Sarva Siddhi, Ravi Pushya & other auspicious yogas"}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <Card className="border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800 text-lg">
              {hi ? "तारीख चुनें" : "Select Date"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 items-end">
            <div className="flex-1">
              <Label className="text-amber-700">{hi ? "तारीख" : "Date"}</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-amber-300"
              />
            </div>
            <Button
              onClick={calculate}
              className="bg-amber-600 hover:bg-amber-700 text-white"
              data-ocid="auspicious-yogas.submit_button"
            >
              {hi ? "योग देखें" : "Check Yogas"}
            </Button>
          </CardContent>
        </Card>

        {yogas.length > 0 && (
          <div className="space-y-4">
            <div className="flex gap-3 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                {hi ? "अत्यंत शुभ" : "Highly Auspicious"}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                {hi ? "शुभ" : "Moderately Auspicious"}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                {hi ? "निष्क्रिय" : "Inactive"}
              </div>
            </div>
            {yogas.map((item, i) => (
              <Card
                key={item.yoga.name}
                className={
                  typeStyles[item.active ? item.yoga.type : "inactive"]
                }
                data-ocid={`auspicious-yogas.item.${i + 1}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle className="text-lg text-amber-900">
                        {item.yoga.name}
                      </CardTitle>
                      <div className="text-amber-600 text-sm">
                        {item.yoga.hindi}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        className={
                          badgeStyles[item.active ? item.yoga.type : "inactive"]
                        }
                      >
                        {item.active
                          ? hi
                            ? "सक्रिय"
                            : "Active"
                          : hi
                            ? "निष्क्रिय"
                            : "Inactive"}
                      </Badge>
                      {item.active && (
                        <Badge
                          variant="outline"
                          className="border-amber-400 text-amber-700"
                        >
                          {item.duration}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <p className="text-sm text-amber-800">
                    {item.yoga.significance}
                  </p>
                  {item.active && (
                    <div>
                      <div className="text-xs font-semibold text-amber-700 mb-1">
                        {hi ? "अनुकूल कार्य:" : "Recommended Activities:"}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.yoga.activities.map((a, _j) => (
                          <Badge
                            key={a}
                            className="bg-green-100 text-green-800 text-xs border border-green-200"
                          >
                            {a}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {hi ? "त्रिगर:" : "Trigger:"} {item.yoga.trigger}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-700">
              {hi ? "यह भी देखें" : "Try Also"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {[
              { to: "/panchang", label: hi ? "शुभा तिथियाँ" : "Shubha Dates" },
              { to: "/panchang", label: hi ? "होरा" : "Hora" },
              { to: "/panchang", label: hi ? "पंचक रहित" : "Panchaka Rahita" },
            ].map((l) => (
              <Link key={l.to} to={l.to}>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer border border-amber-300">
                  {l.label}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
