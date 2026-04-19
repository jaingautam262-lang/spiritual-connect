import ServiceBookingCard from "@/components/ServiceBookingCard";
import ServiceBookingForm from "@/components/ServiceBookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Cake, Heart, Sparkles, Star, Users } from "lucide-react";
import { useState } from "react";

interface Ritual {
  id: string;
  icon: string;
  serviceNameEn: string;
  serviceNameHi: string;
  subtitleEn: string;
  subtitleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  badge?: string;
}

const RITUALS: Ritual[] = [
  {
    id: "baby-1st",
    icon: "👶",
    serviceNameEn: "Baby's 1st Birthday Package",
    serviceNameHi: "शिशु प्रथम जन्मदिन पैकेज",
    subtitleEn: "Choroonu / Annaprashan",
    subtitleHi: "चोरोनु / अन्नप्राशन",
    descriptionEn:
      "Sacred first rice-feeding ceremony for your baby's first birthday with blessings for health and intelligence",
    descriptionHi:
      "शिशु के प्रथम जन्मदिन पर पवित्र अन्नप्राशन संस्कार — स्वास्थ्य एवं बुद्धि के लिए दिव्य आशीर्वाद",
    duration: "2–3 hours",
    price: 5100,
    rating: 5.0,
    reviewCount: 312,
    badge: "Most Loved",
  },
  {
    id: "vijaya-ratha",
    icon: "🌟",
    serviceNameEn: "50+ Year Package",
    serviceNameHi: "50+ वर्ष पैकेज",
    subtitleEn: "Vijaya Ratha Shanti",
    subtitleHi: "विजय रथ शांति",
    descriptionEn:
      "Entering the golden years: Vedic fire ritual marking the 50th year with prayers for continued health and success",
    descriptionHi:
      "स्वर्णिम युग में प्रवेश — 50वें वर्ष का वैदिक अग्नि अनुष्ठान, दीर्घायु एवं सफलता के लिए प्रार्थनाएं",
    duration: "3–4 hours",
    price: 11000,
    rating: 4.9,
    reviewCount: 187,
  },
  {
    id: "ugra-ratha",
    icon: "🪔",
    serviceNameEn: "60+ Year Package",
    serviceNameHi: "60+ वर्ष पैकेज",
    subtitleEn: "Ugra Ratha Shanti (Shastiabdapoorthi)",
    subtitleHi: "उग्र रथ शांति (षष्ट्यब्दपूर्ति)",
    descriptionEn:
      "Grand Shastiabdapoorthi ritual celebrating 60 years with family, prayers, and Vedic blessings",
    descriptionHi:
      "षष्ट्यब्दपूर्ति — 60 वर्ष पूर्ण होने पर परिवार सहित भव्य वैदिक अनुष्ठान एवं पूजा",
    duration: "4 hours",
    price: 15000,
    rating: 4.9,
    reviewCount: 143,
    badge: "Popular",
  },
  {
    id: "bheema-ratha",
    icon: "🔱",
    serviceNameEn: "70+ Year Package",
    serviceNameHi: "70+ वर्ष पैकेज",
    subtitleEn: "Bheema Ratha Shanti (Saptathi)",
    subtitleHi: "भीम रथ शांति (सप्तति)",
    descriptionEn:
      "Saptathi ceremony celebrating 70 years — full Vedic rites with Rudrabhishekam and Ayush Homa",
    descriptionHi:
      "सप्तति महोत्सव — 70 वर्ष पर रुद्राभिषेकम् एवं आयुष होम के साथ सम्पूर्ण वैदिक अनुष्ठान",
    duration: "4–5 hours",
    price: 18000,
    rating: 5.0,
    reviewCount: 98,
  },
  {
    id: "sahasra-chandra",
    icon: "🌕",
    serviceNameEn: "80+ Year Package",
    serviceNameHi: "80+ वर्ष पैकेज",
    subtitleEn: "Sahasra Chandra Darshana Shanti",
    subtitleHi: "सहस्र चंद्र दर्शन शांति",
    descriptionEn:
      "Celebrating 1000th full moon — the most auspicious milestone with elaborate pujas and community feast",
    descriptionHi:
      "1000वां पूर्णिमा दर्शन — सर्वाधिक शुभ पड़ाव, विस्तृत पूजाएं एवं सामुदायिक भोज के साथ",
    duration: "Full day",
    price: 25000,
    rating: 5.0,
    reviewCount: 62,
    badge: "Grand Ceremony",
  },
  {
    id: "navaroha",
    icon: "🙏",
    serviceNameEn: "90+ Year Package",
    serviceNameHi: "90+ वर्ष पैकेज",
    subtitleEn: "Navaroha Shanti",
    subtitleHi: "नवारोह शांति",
    descriptionEn:
      "Veneration of the 90+ elder with complete Vedic honors, ancestral prayers, and family blessings ceremony",
    descriptionHi:
      "90+ वर्षीय पूज्य वरिष्ठ का सम्पूर्ण वैदिक सम्मान — पितृ प्रार्थनाएं एवं परिवार आशीर्वाद समारोह",
    duration: "Full day",
    price: 31000,
    rating: 5.0,
    reviewCount: 34,
    badge: "Sacred Honor",
  },
];

const SIGNIFICANCE = [
  {
    icon: <Star className="h-5 w-5" />,
    titleEn: "Cosmic Alignment",
    titleHi: "ब्रह्मांडीय संरेखण",
    textEn:
      "Each milestone aligns with a specific solar-lunar cycle that amplifies divine energies for the celebrant.",
    textHi:
      "प्रत्येक पड़ाव एक विशिष्ट सौर-चंद्र चक्र के साथ संरेखित होता है जो उत्सव मनाने वाले की दिव्य ऊर्जाओं को बढ़ाता है।",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    titleEn: "Ayush Vriddhi",
    titleHi: "आयुष वृद्धि",
    textEn:
      "Vedic age-milestone rituals (Shantis) are prescribed in the scriptures to remove doshas and enhance longevity.",
    textHi:
      "वैदिक आयु मील के पत्थर के अनुष्ठान (शांतियां) शास्त्रों में दोषों को दूर करने और दीर्घायु बढ़ाने के लिए निर्धारित हैं।",
  },
  {
    icon: <Users className="h-5 w-5" />,
    titleEn: "Family Bonding",
    titleHi: "पारिवारिक बंधन",
    textEn:
      "These ceremonies unite generations, passing on sacred traditions and invoking ancestral blessings for the entire family lineage.",
    textHi:
      "ये समारोह पीढ़ियों को एकजुट करते हैं, पवित्र परंपराओं को आगे बढ़ाते हैं और पूरे परिवार वंश के लिए पितृ आशीर्वाद का आह्वान करते हैं।",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    titleEn: "Vedic Sanction",
    titleHi: "वैदिक अनुमोदन",
    textEn:
      "Each ritual is meticulously performed by qualified Vedic pandits following prescribed Shastra vidhi.",
    textHi:
      "प्रत्येक अनुष्ठान योग्य वैदिक पंडितों द्वारा निर्धारित शास्त्र विधि के अनुसार सावधानीपूर्वक किया जाता है।",
  },
];

export default function BirthdayRituals() {
  const { language } = useLanguage();
  const hi = language === "hi";

  const [activeBooking, setActiveBooking] = useState<Ritual | null>(null);

  const pageTitle = hi ? "जन्मदिन विशेष अनुष्ठान" : "Special Birthday Rituals";
  const pageSubtitle = hi
    ? "जीवन के हर महत्वपूर्ण पड़ाव को पवित्र वैदिक अनुष्ठानों से मनाएं — दीर्घायु, स्वास्थ्य और समृद्धि के लिए दिव्य आशीर्वाद पाएं"
    : "Celebrate life milestones with sacred Vedic rituals that invoke divine blessings for long life, health, and prosperity";

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative py-14 px-4 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 30) 0%, oklch(0.30 0.10 35) 50%, oklch(0.22 0.06 30) 100%)",
        }}
        data-ocid="birthday_rituals.hero_section"
      >
        {/* Decorative petals */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.68 0.20 48) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.78 0.14 75) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cake
              className="h-8 w-8"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <span
              className="font-heading text-sm font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {hi ? "जीवन उत्सव" : "Life Celebrations"}
            </span>
            <Cake
              className="h-8 w-8"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
          </div>

          <h1
            className="font-heading text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "oklch(0.95 0.02 80)" }}
          >
            {pageTitle}
          </h1>
          <p
            className="font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.82 0.04 70)" }}
          >
            {pageSubtitle}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div
              className="h-px w-16"
              style={{ background: "oklch(0.68 0.20 48 / 0.6)" }}
            />
            <Sparkles
              className="h-4 w-4"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <div
              className="h-px w-16"
              style={{ background: "oklch(0.68 0.20 48 / 0.6)" }}
            />
          </div>
        </div>
      </section>

      {/* Milestone Banner */}
      <section
        className="py-4 px-4 text-center"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.68 0.20 48 / 0.12), oklch(0.78 0.14 75 / 0.18), oklch(0.68 0.20 48 / 0.12))",
          borderTop: "1px solid oklch(0.68 0.20 48 / 0.2)",
          borderBottom: "1px solid oklch(0.68 0.20 48 / 0.2)",
        }}
      >
        <p
          className="font-heading font-semibold text-sm md:text-base tracking-wide"
          style={{ color: "oklch(0.38 0.14 40)" }}
          data-ocid="birthday_rituals.banner"
        >
          🌸{" "}
          {hi
            ? "प्रत्येक मील के पत्थर को दिव्य आशीर्वाद के साथ मनाएं"
            : "Celebrate Every Milestone with Divine Blessings"}{" "}
          🌸
        </p>
      </section>

      {/* Service Cards Grid */}
      <section
        className="py-12 px-4 bg-background"
        data-ocid="birthday_rituals.packages_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="font-heading text-2xl md:text-3xl font-bold mb-2"
              style={{ color: "oklch(0.25 0.10 25)" }}
            >
              {hi ? "आयु मील के पत्थर पैकेज" : "Age Milestone Packages"}
            </h2>
            <p
              className="font-body text-sm md:text-base"
              style={{ color: "oklch(0.50 0.06 50)" }}
            >
              {hi
                ? "अपनी आयु के अनुसार उचित वैदिक अनुष्ठान चुनें"
                : "Choose the right Vedic ritual suited to your life milestone"}
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="birthday_rituals.packages_list"
          >
            {RITUALS.map((ritual, index) => (
              <div
                key={ritual.id}
                data-ocid={`birthday_rituals.package.item.${index + 1}`}
              >
                {/* Subtitle chip above the card */}
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="text-xs font-heading font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.1)",
                      color: "oklch(0.42 0.14 42)",
                      border: "1px solid oklch(0.68 0.20 48 / 0.25)",
                    }}
                  >
                    {hi ? ritual.subtitleHi : ritual.subtitleEn}
                  </span>
                </div>
                <ServiceBookingCard
                  icon={ritual.icon}
                  serviceName={hi ? ritual.serviceNameHi : ritual.serviceNameEn}
                  description={hi ? ritual.descriptionHi : ritual.descriptionEn}
                  duration={ritual.duration}
                  price={ritual.price}
                  rating={ritual.rating}
                  reviewCount={ritual.reviewCount}
                  badge={ritual.badge}
                  onBookNow={() => setActiveBooking(ritual)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Rituals Matter */}
      <section
        className="py-12 px-4"
        style={{ background: "oklch(0.96 0.012 78)" }}
        data-ocid="birthday_rituals.significance_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="font-heading text-2xl md:text-3xl font-bold mb-3"
              style={{ color: "oklch(0.25 0.10 25)" }}
            >
              {hi
                ? "ये अनुष्ठान क्यों महत्वपूर्ण हैं?"
                : "Why Are These Rituals Important?"}
            </h2>
            <p
              className="font-body text-sm md:text-base max-w-2xl mx-auto"
              style={{ color: "oklch(0.50 0.06 50)" }}
            >
              {hi
                ? "वैदिक शास्त्रों में वर्णित आयु-विशेष शांति अनुष्ठानों का गहरा आध्यात्मिक एवं वैज्ञानिक महत्व है"
                : "Age-specific Shanti rituals described in Vedic scriptures carry profound spiritual and cosmic significance"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SIGNIFICANCE.map((item, sigIdx) => (
              <div
                key={item.titleEn}
                className="flex gap-4 p-5 rounded-2xl"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                }}
                data-ocid={`birthday_rituals.significance.item.${sigIdx + 1}`}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.12)",
                    color: "oklch(0.45 0.16 42)",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    className="font-heading font-semibold text-base mb-1"
                    style={{ color: "oklch(0.28 0.10 28)" }}
                  >
                    {hi ? item.titleHi : item.titleEn}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "oklch(0.50 0.06 50)" }}
                  >
                    {hi ? item.textHi : item.textEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section
        className="py-10 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.25 0.08 30), oklch(0.32 0.12 38))",
        }}
        data-ocid="birthday_rituals.cta_section"
      >
        <div className="max-w-2xl mx-auto">
          <h3
            className="font-heading text-xl md:text-2xl font-bold mb-3"
            style={{ color: "oklch(0.95 0.02 80)" }}
          >
            {hi
              ? "आज ही बुक करें — सीमित तिथियां उपलब्ध"
              : "Book Today — Limited Dates Available"}
          </h3>
          <p
            className="font-body text-sm mb-5"
            style={{ color: "oklch(0.80 0.04 72)" }}
          >
            {hi
              ? "अनुभवी वैदिक पंडितों द्वारा परंपरागत विधि से किए जाने वाले अनुष्ठान — घर या मंदिर दोनों जगह"
              : "Performed by experienced Vedic pandits following traditional vidhi — at your home or temple"}
          </p>
          <button
            type="button"
            className="font-heading font-bold text-sm px-8 py-3 rounded-full transition-all hover:scale-105 hover:shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            onClick={() => setActiveBooking(RITUALS[0])}
            data-ocid="birthday_rituals.cta_button"
          >
            🙏 {hi ? "अभी बुक करें" : "Book a Ritual Now"}
          </button>
        </div>
      </section>

      {/* Booking Form Modal */}
      {activeBooking && (
        <ServiceBookingForm
          isOpen={!!activeBooking}
          onClose={() => setActiveBooking(null)}
          serviceName={
            hi ? activeBooking.serviceNameHi : activeBooking.serviceNameEn
          }
          price={activeBooking.price}
          serviceType="birthday-ritual"
          showParticipants
          onSubmitSuccess={() => setActiveBooking(null)}
        />
      )}
    </>
  );
}
