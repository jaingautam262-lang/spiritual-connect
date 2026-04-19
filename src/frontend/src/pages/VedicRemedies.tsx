import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Flame, Info, Star } from "lucide-react";
import { useState } from "react";
import ServiceBookingCard from "../components/ServiceBookingCard";
import ServiceBookingForm from "../components/ServiceBookingForm";
import { useLanguage } from "../contexts/LanguageContext";

interface Remedy {
  id: string;
  icon: string;
  serviceNameEn: string;
  serviceNameHi: string;
  descriptionEn: string;
  descriptionHi: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  badge?: string;
}

const REMEDIES: Remedy[] = [
  {
    id: "homa",
    icon: "🔥",
    serviceNameEn: "Homa (Homam / Yagna)",
    serviceNameHi: "होम / हवन / यज्ञ",
    descriptionEn:
      "Sacred fire rituals to invoke divine blessings and remove obstacles from your life path.",
    descriptionHi:
      "दिव्य आशीर्वाद प्राप्त करने और जीवन की बाधाओं को दूर करने के लिए पवित्र अग्नि अनुष्ठान।",
    duration: "2-3 hours",
    price: 5100,
    rating: 4.9,
    reviewCount: 1248,
    badge: "Most Popular",
  },
  {
    id: "pooja",
    icon: "🙏",
    serviceNameEn: "Pooja",
    serviceNameHi: "पूजा",
    descriptionEn:
      "Personalized deity worship performed by qualified priests with full Vedic rituals.",
    descriptionHi: "योग्य पुजारियों द्वारा संपूर्ण वैदिक विधि से व्यक्तिगत देव पूजा।",
    duration: "1-2 hours",
    price: 2100,
    rating: 4.8,
    reviewCount: 2356,
  },
  {
    id: "abishekam",
    icon: "💧",
    serviceNameEn: "Abishekam (Abhishekam)",
    serviceNameHi: "अभिषेकम",
    descriptionEn:
      "Ritual bathing of deity idols with sacred substances — milk, honey, turmeric — for health and prosperity.",
    descriptionHi:
      "स्वास्थ्य और समृद्धि के लिए दूध, शहद, हल्दी जैसे पवित्र पदार्थों से देव प्रतिमा का अभिषेक।",
    duration: "45-90 min",
    price: 1500,
    rating: 4.7,
    reviewCount: 891,
  },
  {
    id: "tarpanam",
    icon: "🫙",
    serviceNameEn: "Tarpanam",
    serviceNameHi: "तर्पणम",
    descriptionEn:
      "Water libation ceremony for ancestors seeking peace and salvation — performed by Vedic priests.",
    descriptionHi:
      "मोक्ष की कामना करने वाले पूर्वजों के लिए जल तर्पण — वैदिक पुजारियों द्वारा।",
    duration: "30-45 min",
    price: 1100,
    rating: 4.6,
    reviewCount: 543,
  },
  {
    id: "ancestral",
    icon: "🌺",
    serviceNameEn: "Ancestral Services",
    serviceNameHi: "पितृ सेवाएं",
    descriptionEn:
      "Pitru Paksha rituals and Shraddha ceremonies to honor and liberate ancestors from karmic cycles.",
    descriptionHi:
      "पितृ पक्ष अनुष्ठान और श्राद्ध समारोह — पूर्वजों को सम्मान और मोक्ष दिलाने के लिए।",
    duration: "1-2 hours",
    price: 3100,
    rating: 4.8,
    reviewCount: 762,
    badge: "Recommended",
  },
  {
    id: "special-homa",
    icon: "⚡",
    serviceNameEn: "Special Purpose Homas",
    serviceNameHi: "विशेष हवन",
    descriptionEn:
      "Specialized fire rituals: Sudarshana Homa, Mrityunjaya Homa, Ganapathy Homa for specific outcomes.",
    descriptionHi:
      "सुदर्शन होम, मृत्युंजय होम, गणपति होम — विशेष उद्देश्य के लिए अग्नि अनुष्ठान।",
    duration: "3-4 hours",
    price: 7500,
    rating: 4.9,
    reviewCount: 485,
    badge: "Premium",
  },
  {
    id: "birthday-pooja",
    icon: "🎂",
    serviceNameEn: "Birthday Special Poojas",
    serviceNameHi: "जन्मदिन विशेष पूजा",
    descriptionEn:
      "Auspicious poojas on your birthday for health, success, and divine blessings throughout the year.",
    descriptionHi: "जन्मदिन पर स्वास्थ्य, सफलता और दिव्य आशीर्वाद के लिए शुभ पूजा।",
    duration: "1-2 hours",
    price: 2500,
    rating: 4.7,
    reviewCount: 1102,
  },
  {
    id: "anniversary-pooja",
    icon: "💍",
    serviceNameEn: "Special Pooja for Anniversary",
    serviceNameHi: "वर्षगांठ विशेष पूजा",
    descriptionEn:
      "Sacred rituals to bless your marriage anniversary with divine grace, harmony, and longevity.",
    descriptionHi:
      "दिव्य अनुग्रह, सामंजस्य और दीर्घायु के लिए विवाह वर्षगांठ पर पवित्र अनुष्ठान।",
    duration: "1-2 hours",
    price: 3100,
    rating: 4.8,
    reviewCount: 637,
  },
];

const SIGNIFICANCE = [
  {
    icon: "🔥",
    titleEn: "Homa & Yagna",
    titleHi: "होम और यज्ञ",
    textEn:
      "Fire is the divine messenger (Agni) that carries your prayers to the cosmos. Homas purify the environment and invoke specific deities for blessings.",
    textHi:
      "अग्नि दिव्य दूत है जो आपकी प्रार्थनाओं को ब्रह्मांड तक पहुंचाती है। होम पर्यावरण को शुद्ध करते हैं।",
  },
  {
    icon: "💧",
    titleEn: "Abhishekam",
    titleHi: "अभिषेकम",
    textEn:
      "The bathing ritual symbolizes purification of the soul. Each sacred substance — milk, honey, rose water — carries specific vibrational healing.",
    textHi:
      "अभिषेक आत्मा की शुद्धि का प्रतीक है। दूध, शहद, गुलाब जल — प्रत्येक पदार्थ विशिष्ट उपचार शक्ति रखता है।",
  },
  {
    icon: "🌺",
    titleEn: "Pitru / Ancestral Rites",
    titleHi: "पितृ / पूर्वज संस्कार",
    textEn:
      "Honoring ancestors through Tarpanam and Shraddha removes Pitru Dosha, bestows blessings, and ensures spiritual progress for your lineage.",
    textHi:
      "तर्पण और श्राद्ध से पूर्वजों को सम्मान देने से पितृ दोष दूर होता है और वंश की उन्नति होती है।",
  },
  {
    icon: "🙏",
    titleEn: "Personalized Pooja",
    titleHi: "व्यक्तिगत पूजा",
    textEn:
      "Vedic priests perform rituals tailored to your birth chart, gotra, and specific desires — ensuring maximum cosmic alignment.",
    textHi: "वैदिक पुजारी आपकी जन्मपत्री, गोत्र और विशेष इच्छाओं के अनुसार अनुष्ठान करते हैं।",
  },
];

const STEPS = [
  {
    step: "01",
    icon: "📅",
    titleEn: "Book & Confirm",
    titleHi: "बुक करें और पुष्टि करें",
    textEn:
      "Select your service, choose a date, and complete checkout. You'll receive an instant confirmation.",
    textHi: "सेवा चुनें, तिथि चुनें और चेकआउट पूरा करें। तुरंत पुष्टि मिलेगी।",
  },
  {
    step: "02",
    icon: "🧑‍🦳",
    titleEn: "Priest Assigned",
    titleHi: "पुजारी नियुक्त",
    textEn:
      "A qualified Vedic priest is assigned based on your ritual requirements and preferred language.",
    textHi: "आपकी अनुष्ठान आवश्यकताओं के अनुसार योग्य वैदिक पुजारी नियुक्त किया जाता है।",
  },
  {
    step: "03",
    icon: "📹",
    titleEn: "Ritual + Video Evidence",
    titleHi: "अनुष्ठान + वीडियो प्रमाण",
    textEn:
      "The ritual is performed on your chosen date and you receive a video recording as sacred evidence.",
    textHi:
      "चुनी हुई तिथि पर अनुष्ठान किया जाता है और आपको वीडियो रिकॉर्डिंग भेजी जाती है।",
  },
];

export default function VedicRemedies() {
  const { language } = useLanguage();
  const hi = language === "hi";

  const [bookingService, setBookingService] = useState<{
    name: string;
    price: number;
  } | null>(null);

  return (
    <div data-ocid="vedic-remedies.page">
      {/* Hero Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 25), oklch(0.28 0.12 35), oklch(0.22 0.10 30))",
          minHeight: "260px",
        }}
      >
        {/* Decorative flame dots */}
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.68 0.20 48) 0%, transparent 50%), radial-gradient(circle at 80% 30%, oklch(0.78 0.14 75) 0%, transparent 40%)",
          }}
        />
        <div className="relative flex flex-col items-center justify-center text-center px-4 py-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 font-heading text-xs font-semibold"
            style={{
              background: "oklch(0.68 0.20 48 / 0.2)",
              border: "1px solid oklch(0.68 0.20 48 / 0.4)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            <Flame className="h-3.5 w-3.5" />
            {hi ? "वैदिक अनुष्ठान सेवाएं" : "Vedic Ritual Services"}
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.82 0.16 70)" }}
          >
            {hi ? "वैदिक उपाय" : "Vedic Remedies"}
          </h1>
          <p
            className="font-body text-base md:text-lg max-w-xl"
            style={{ color: "oklch(0.78 0.06 65)" }}
          >
            {hi
              ? "हजारों वर्षों की वैदिक परंपरा — प्रमाणित पुजारियों द्वारा संपूर्ण विधि से"
              : "Thousands of years of Vedic tradition — performed with complete ritual integrity by verified priests"}
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              {
                icon: "✅",
                textEn: "Verified Priests",
                textHi: "प्रमाणित पुजारी",
              },
              {
                icon: "📹",
                textEn: "Video Evidence",
                textHi: "वीडियो प्रमाण",
              },
              {
                icon: "🔒",
                textEn: "Secure Checkout",
                textHi: "सुरक्षित भुगतान",
              },
              {
                icon: "🌟",
                textEn: "4.8★ Rated",
                textHi: "4.8★ रेटिंग",
              },
            ].map((b) => (
              <span
                key={b.textEn}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-body text-xs"
                style={{
                  background: "oklch(0.99 0.008 80 / 0.1)",
                  border: "1px solid oklch(0.82 0.08 70 / 0.25)",
                  color: "oklch(0.88 0.08 70)",
                }}
              >
                {b.icon} {hi ? b.textHi : b.textEn}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-7xl">
        {/* ── How It Works ── */}
        <section
          className="mb-12 rounded-2xl p-6 md:p-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.06), oklch(0.78 0.14 75 / 0.04))",
            border: "1px solid oklch(0.68 0.20 48 / 0.18)",
          }}
          data-ocid="vedic-remedies.how-it-works.section"
        >
          <div className="text-center mb-7">
            <h2
              className="font-heading text-2xl font-bold mb-1"
              style={{ color: "oklch(0.30 0.12 25)" }}
            >
              {hi ? "यह कैसे काम करता है?" : "How It Works"}
            </h2>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.55 0.06 50)" }}
            >
              {hi
                ? "तीन सरल चरणों में आपका अनुष्ठान संपन्न"
                : "Your sacred ritual completed in three simple steps"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, idx) => (
              <div
                key={s.step}
                className="relative flex flex-col items-center text-center"
              >
                {idx < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-0.5"
                    style={{ background: "oklch(0.68 0.20 48 / 0.25)" }}
                    aria-hidden="true"
                  />
                )}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3 relative z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.15), oklch(0.78 0.14 75 / 0.10))",
                    border: "2px solid oklch(0.68 0.20 48 / 0.35)",
                  }}
                >
                  {s.icon}
                </div>
                <span
                  className="font-heading font-bold text-xs mb-1"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  STEP {s.step}
                </span>
                <h3
                  className="font-heading font-bold text-base mb-1"
                  style={{ color: "oklch(0.28 0.10 25)" }}
                >
                  {hi ? s.titleHi : s.titleEn}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.50 0.06 50)" }}
                >
                  {hi ? s.textHi : s.textEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="mb-12" data-ocid="vedic-remedies.services.section">
          <div className="text-center mb-7">
            <h2
              className="font-heading text-2xl md:text-3xl font-bold mb-2"
              style={{ color: "oklch(0.28 0.12 25)" }}
            >
              {hi ? "हमारी वैदिक सेवाएं" : "Our Vedic Services"}
            </h2>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.55 0.06 50)" }}
            >
              {hi
                ? "8 पवित्र सेवाएं — अभी बुक करें, पूर्ण वैदिक विधि से"
                : "8 sacred services — book now, performed with complete Vedic authenticity"}
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="vedic-remedies.services.list"
          >
            {REMEDIES.map((remedy, idx) => (
              <div
                key={remedy.id}
                data-ocid={`vedic-remedies.services.item.${idx + 1}`}
              >
                <ServiceBookingCard
                  serviceName={hi ? remedy.serviceNameHi : remedy.serviceNameEn}
                  description={hi ? remedy.descriptionHi : remedy.descriptionEn}
                  duration={remedy.duration}
                  price={remedy.price}
                  rating={remedy.rating}
                  reviewCount={remedy.reviewCount}
                  icon={remedy.icon}
                  badge={remedy.badge}
                  onBookNow={() =>
                    setBookingService({
                      name: hi ? remedy.serviceNameHi : remedy.serviceNameEn,
                      price: remedy.price,
                    })
                  }
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── Significance Section ── */}
        <section
          className="mb-12 rounded-2xl p-6 md:p-8"
          style={{
            background: "oklch(0.98 0.010 78)",
            border: "1px solid oklch(0.78 0.14 75 / 0.18)",
          }}
          data-ocid="vedic-remedies.significance.section"
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="p-2.5 rounded-xl"
              style={{ background: "oklch(0.68 0.20 48 / 0.12)" }}
            >
              <Info
                className="h-5 w-5"
                style={{ color: "oklch(0.50 0.16 40)" }}
              />
            </div>
            <div>
              <h2
                className="font-heading text-xl font-bold"
                style={{ color: "oklch(0.28 0.10 25)" }}
              >
                {hi ? "प्रत्येक उपाय का महत्व" : "Significance of Each Remedy"}
              </h2>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.55 0.06 50)" }}
              >
                {hi
                  ? "वैदिक परंपरा और आध्यात्मिक विज्ञान"
                  : "Vedic tradition and spiritual science explained"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SIGNIFICANCE.map((s) => (
              <div
                key={s.titleEn}
                className="flex gap-4 p-4 rounded-xl"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <span
                  className="text-3xl shrink-0 w-12 h-12 flex items-center justify-center rounded-xl"
                  style={{ background: "oklch(0.68 0.20 48 / 0.10)" }}
                  aria-hidden="true"
                >
                  {s.icon}
                </span>
                <div>
                  <h3
                    className="font-heading font-bold text-base mb-1"
                    style={{ color: "oklch(0.30 0.12 25)" }}
                  >
                    {hi ? s.titleHi : s.titleEn}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "oklch(0.50 0.06 48)" }}
                  >
                    {hi ? s.textHi : s.textEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section
          className="rounded-2xl p-6 md:p-8 mb-2"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 25), oklch(0.30 0.12 35))",
          }}
          data-ocid="vedic-remedies.why-us.section"
        >
          <h2
            className="font-heading text-xl font-bold text-center mb-6"
            style={{ color: "oklch(0.82 0.14 70)" }}
          >
            {hi ? "हमें क्यों चुनें?" : "Why Choose Spiritual Connect?"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                icon: <CheckCircle className="h-5 w-5" />,
                titleEn: "Certified Pandits",
                titleHi: "प्रमाणित पंडित",
                textEn: "All priests are Vedic-trained and background-verified",
                textHi: "सभी पुजारी वैदिक प्रशिक्षित और सत्यापित हैं",
              },
              {
                icon: <Star className="h-5 w-5" />,
                titleEn: "4.8★ Average Rating",
                titleHi: "4.8★ औसत रेटिंग",
                textEn: "Trusted by 10,000+ devotees across India",
                textHi: "भारत भर में 10,000+ भक्तों का विश्वास",
              },
              {
                icon: <Clock className="h-5 w-5" />,
                titleEn: "Flexible Scheduling",
                titleHi: "लचीला समय",
                textEn: "Book at your preferred muhurta and time",
                textHi: "अपने पसंदीदा मुहूर्त और समय पर बुक करें",
              },
            ].map((w) => (
              <div
                key={w.titleEn}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: "oklch(0.99 0.008 80 / 0.06)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <span
                  style={{ color: "oklch(0.78 0.14 75)" }}
                  aria-hidden="true"
                >
                  {w.icon}
                </span>
                <div>
                  <p
                    className="font-heading font-bold text-sm mb-0.5"
                    style={{ color: "oklch(0.85 0.10 70)" }}
                  >
                    {hi ? w.titleHi : w.titleEn}
                  </p>
                  <p
                    className="font-body text-xs leading-relaxed"
                    style={{ color: "oklch(0.68 0.06 60)" }}
                  >
                    {hi ? w.textHi : w.textEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-7">
            <Badge
              className="font-heading text-sm px-4 py-1.5"
              style={{
                background: "oklch(0.68 0.20 48 / 0.2)",
                color: "oklch(0.82 0.14 70)",
                border: "1px solid oklch(0.68 0.20 48 / 0.4)",
              }}
            >
              🙏{" "}
              {hi
                ? "हर सेवा वैदिक विधि से संपन्न — वीडियो प्रमाण सहित"
                : "Every ritual performed authentically — with video evidence"}
            </Badge>
          </div>
        </section>
      </div>

      {/* Booking Form Modal */}
      {bookingService && (
        <ServiceBookingForm
          isOpen={!!bookingService}
          onClose={() => setBookingService(null)}
          serviceName={bookingService.name}
          price={bookingService.price}
          serviceType="vedic-remedy"
          showLocation={false}
          showParticipants={true}
          onSubmitSuccess={() => setBookingService(null)}
        />
      )}
    </div>
  );
}
