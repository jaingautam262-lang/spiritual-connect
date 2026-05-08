import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate } from "@tanstack/react-router";
import { Calculator, Car, Hash, Smartphone, Star, User } from "lucide-react";

const CALCULATORS = [
  {
    id: "name",
    icon: User,
    route: "/numerology/name",
    en: {
      title: "Name Numerology",
      desc: "Discover your Life Path Number from your name using Pythagorean, Chaldean, Sepharial & Modern systems.",
    },
    hi: {
      title: "नाम अंकज्योतिष",
      desc: "पाइथागोरियन, कैल्डियन, सेफेरियल और मॉडर्न सिस्टम से अपना जीवन पथ अंक जानें।",
    },
  },
  {
    id: "vehicle",
    icon: Car,
    route: "/numerology/vehicle",
    en: {
      title: "Vehicle Number",
      desc: "Is your vehicle's registration number lucky? Get favorable/unfavorable assessment with remedies.",
    },
    hi: {
      title: "वाहन अंक",
      desc: "क्या आपके वाहन का नंबर शुभ है? अनुकूल/प्रतिकूल मूल्यांकन और उपाय जानें।",
    },
  },
  {
    id: "mobile",
    icon: Smartphone,
    route: "/numerology/mobile",
    en: {
      title: "Mobile Number",
      desc: "Analyze your 10-digit mobile number and find out if it aligns with your life path energy.",
    },
    hi: {
      title: "मोबाइल अंक",
      desc: "अपना 10-अंकीय मोबाइल नंबर विश्लेषण करें और देखें क्या यह आपकी जीवन पथ ऊर्जा से मेल खाता है।",
    },
  },
  {
    id: "destiny",
    icon: Star,
    route: "/numerology/destiny",
    en: {
      title: "Destiny Number",
      desc: "Your complete date of birth reveals your life mission, karmic lessons, and career guidance.",
    },
    hi: {
      title: "भाग्यांक",
      desc: "आपकी पूर्ण जन्म तारीख आपके जीवन मिशन, कर्म पाठ और करियर मार्गदर्शन को प्रकट करती है।",
    },
  },
  {
    id: "mulank",
    icon: Hash,
    route: "/numerology/mulank",
    en: {
      title: "Mulank (मूलांक)",
      desc: "Your birth day number reveals your ruling planet, personality traits, lucky colors, and compatible numbers.",
    },
    hi: {
      title: "मूलांक",
      desc: "आपकी जन्म तारीख का अंक आपके शासक ग्रह, व्यक्तित्व, शुभ रंग और अनुकूल अंक बताता है।",
    },
  },
];

export default function NumerologySuite() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isHi = language === "hi";

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="numerology-suite.page"
    >
      {/* Hero */}
      <section className="bg-card border-b py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center">
            <Calculator className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            {isHi ? "अंकज्योतिष सूट" : "Numerology Suite"}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            {isHi
              ? "संख्याओं के माध्यम से अपने जीवन पथ को समझें। अंकज्योतिष आपके नाम, जन्म तारीख और रोज़मर्रा के नंबरों में छिपे अर्थ को उजागर करती है।"
              : "Numerology helps you understand your life path through numbers. Discover the hidden meanings in your name, birth date, and everyday numbers."}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <Badge variant="secondary">
              {isHi ? "बिना लॉगिन बेसिक रीडिंग" : "No login for basic reading"}
            </Badge>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {isHi ? "लॉगिन से विस्तृत अंतर्दृष्टि" : "Login for detailed insights"}
            </Badge>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CALCULATORS.map((calc) => {
              const Icon = calc.icon;
              const data = isHi ? calc.hi : calc.en;
              return (
                <Card
                  key={calc.id}
                  className="hover:shadow-md transition-shadow cursor-pointer border-border/60 hover:border-primary/30"
                  data-ocid={`numerology.${calc.id}.card`}
                  onClick={() => navigate({ to: calc.route })}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-base font-semibold font-display">
                        {data.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {data.desc}
                    </p>
                    <Button
                      size="sm"
                      className="w-full"
                      data-ocid={`numerology.${calc.id}.try_button`}
                    >
                      {isHi ? "अभी आज़माएं" : "Try Now"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
