import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { nadis } from "@/data/nadiData";
import { Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Layers, Star } from "lucide-react";
import { motion } from "motion/react";

const NADI_GRADIENTS = [
  "linear-gradient(135deg, oklch(0.28 0.12 38 / 0.85), oklch(0.48 0.18 52 / 0.70), oklch(0.68 0.20 62 / 0.50))",
  "linear-gradient(135deg, oklch(0.25 0.14 22 / 0.85), oklch(0.42 0.18 30 / 0.70), oklch(0.58 0.18 45 / 0.50))",
  "linear-gradient(135deg, oklch(0.32 0.14 55 / 0.85), oklch(0.52 0.16 58 / 0.70), oklch(0.72 0.18 70 / 0.50))",
  "linear-gradient(135deg, oklch(0.30 0.15 42 / 0.85), oklch(0.50 0.18 48 / 0.70), oklch(0.65 0.16 55 / 0.50))",
  "linear-gradient(135deg, oklch(0.27 0.13 35 / 0.85), oklch(0.44 0.16 40 / 0.70), oklch(0.60 0.18 50 / 0.50))",
];

const SYMBOLS = ["ॐ", "॥", "☽", "✦", "卐"];

interface NadiCardProps {
  nadi: (typeof nadis)[0];
  index: number;
  language: string;
}

function NadiCard({ nadi, index, language }: NadiCardProps) {
  const isHi = language === "hi";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      data-ocid={`nadi.item.${index + 1}`}
    >
      {/* Decorative thumbnail */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: NADI_GRADIENTS[index] }}
      >
        <div className="absolute inset-0 opacity-10">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={`row-${i}`}
              className="absolute text-foreground text-xs font-mono opacity-30"
              style={{ top: `${10 + i * 11}%`, left: `${5 + i * 12}%` }}
            >
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <span key={`cell-${i}-${j}`}>
                  {String.fromCharCode(0x0b80 + ((i * 6 + j) % 80))}
                </span>
              ))}
            </div>
          ))}
        </div>
        <span
          className="relative text-7xl select-none"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}
        >
          {SYMBOLS[index]}
        </span>
        <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-semibold border-0">
          12 Kandams
        </Badge>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3
          className="font-display text-lg font-semibold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors"
          data-ocid={`nadi.item.${index + 1}.name`}
        >
          {isHi ? nadi.nameHi : nadi.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-1 font-medium">
          {isHi ? nadi.sageHi : nadi.sage}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {isHi ? nadi.descriptionHi : nadi.description}
        </p>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge
            variant="secondary"
            className="text-xs flex items-center gap-1"
          >
            <Layers className="w-3 h-3" />
            {isHi ? "12 अध्याय" : "12 Chapters"}
          </Badge>
          <Badge
            variant="outline"
            className="text-xs border-primary/40 text-primary"
          >
            <Star className="w-3 h-3 mr-1" />
            {isHi ? "प्राचीन ज्ञान" : "Ancient Wisdom"}
          </Badge>
        </div>

        <Link to="/nadi/$nadiId" params={{ nadiId: nadi.id }}>
          <Button
            variant="default"
            size="sm"
            className="w-full group/btn"
            data-ocid={`nadi.item.${index + 1}.explore_button`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {isHi ? "अन्वेषण करें" : "Explore"}
            <ChevronRight className="w-4 h-4 ml-auto transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function NadiCollection() {
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-4xl mb-4 select-none">📜</span>
            <h1
              className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4"
              data-ocid="nadi_collection.page"
            >
              {isHi ? "नाड़ी संग्रह" : "Nadi Collection"}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {isHi
                ? "प्राचीन ऋषियों द्वारा ताड़पत्रों पर लिखी गई ब्रह्मांडीय नाड़ी ज्योतिष की पांच महान शाखाएं — जो आपके पिछले जन्मों, वर्तमान जीवन और भविष्य का पूर्ण विवरण देती हैं।"
                : "Five great branches of cosmic Nadi Astrology inscribed on palm leaves by ancient sages — revealing the complete blueprint of your past lives, present journey, and destined future."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is Nadi Astrology */}
      <section className="bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                {isHi ? "नाड़ी ज्योतिष क्या है?" : "What is Nadi Astrology?"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {isHi
                  ? "नाड़ी ज्योतिष दक्षिण भारत, मुख्यतः तमिलनाडु की एक प्राचीन भविष्यवाणी कला है। हजारों वर्ष पूर्व, महान सिद्ध ऋषियों ने अपनी दिव्य दृष्टि से भविष्य में जन्म लेने वाली आत्माओं के जीवन को ताड़पत्रों पर लिखा। प्रत्येक ताड़पत्र एक अद्वितीय आत्मा के लिए है।"
                  : "Nadi Astrology is an ancient predictive art from South India, primarily Tamil Nadu. Thousands of years ago, great Siddha sages inscribed the destinies of souls yet to be born onto palm leaves using their divine vision. Each palm leaf belongs to a unique soul who is destined to find it."}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {isHi
                  ? "साधक अपने अंगूठे की छाप लेकर नाड़ी पाठन केंद्र जाता है। पाठक छाप के आधार पर सही बंडल ढूंढता है और साधक की पहचान, जन्म विवरण और जीवन की घटनाओं का सटीक वर्णन करता है। यह पुष्टि होने पर, 12 कांडम (अध्याय) पढ़े जाते हैं।"
                  : "A seeker visits a Nadi reading centre with their thumbprint. The reader searches for the correct bundle and recites precise details of the seeker's identity, birth, and life events. Once confirmed, the 12 Kandams (chapters) are read aloud, revealing karma, destiny, and remedies."}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  label: isHi ? "प्राचीन ग्रंथ" : "Ancient Texts",
                  value: isHi ? "5,000+ वर्ष" : "5,000+ Years",
                  icon: "📜",
                },
                {
                  label: isHi ? "सिद्ध ऋषि" : "Siddha Sages",
                  value: isHi ? "18 महर्षि" : "18 Maharishis",
                  icon: "🙏",
                },
                {
                  label: isHi ? "कांडम अध्याय" : "Kandam Chapters",
                  value: "12",
                  icon: "📖",
                },
                {
                  label: isHi ? "मूल स्थान" : "Origin",
                  value: isHi ? "तमिलनाडु" : "Tamil Nadu",
                  icon: "🪷",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-lg p-4 text-center"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="font-display font-bold text-foreground text-base">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nadi Cards */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center"
            data-ocid="nadi_collection.section"
          >
            {isHi ? "पाँच नाड़ियाँ" : "The Five Nadis"}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nadis.map((nadi, i) => (
              <NadiCard
                key={nadi.id}
                nadi={nadi}
                index={i}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-muted/30 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
            {isHi ? "नाड़ी पठन कैसे कार्य करता है?" : "How Nadi Reading Works"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                en: "Thumbprint",
                hi: "अंगूठे की छाप",
                desc_en:
                  "Provide your right thumb impression for identification",
                desc_hi: "पहचान के लिए अपना दाहिना अंगूठा प्रदान करें",
              },
              {
                step: "02",
                en: "Bundle Search",
                hi: "बंडल खोज",
                desc_en: "Reader locates your leaf from thousands of bundles",
                desc_hi: "पाठक हजारों बंडलों से आपकी पत्ती ढूंढता है",
              },
              {
                step: "03",
                en: "Identity Confirmation",
                hi: "पहचान की पुष्टि",
                desc_en: "Sage recites your name, family and birth details",
                desc_hi: "ऋषि आपका नाम, परिवार और जन्म विवरण सुनाते हैं",
              },
              {
                step: "04",
                en: "12 Kandams",
                hi: "12 कांडम",
                desc_en:
                  "All 12 chapters are read revealing your complete destiny",
                desc_hi: "12 अध्याय पढ़े जाते हैं जो आपकी पूर्ण नियति प्रकट करते हैं",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-5 text-center"
              >
                <div className="font-display text-3xl font-bold text-primary mb-3">
                  {item.step}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {isHi ? item.hi : item.en}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isHi ? item.desc_hi : item.desc_en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
