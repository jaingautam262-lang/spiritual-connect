import { Badge } from "@/components/ui/badge";
import { Bus, Hotel, MapPin, Star, Users, Utensils } from "lucide-react";
import { useState } from "react";
import ServiceBookingForm from "../components/ServiceBookingForm";
import { useLanguage } from "../contexts/LanguageContext";

interface YatraData {
  id: string;
  icon: string;
  nameEn: string;
  nameHi: string;
  descriptionEn: string;
  descriptionHi: string;
  duration: string;
  price: number;
  rating: number;
  seatsRemaining: number;
  highlights: string[];
  badge?: string;
}

const YATRA_DATA: YatraData[] = [
  {
    id: "rameshwaram",
    icon: "🌊",
    nameEn: "Rameshwaram Yatra",
    nameHi: "रामेश्वरम यात्रा",
    descriptionEn:
      "Visit the sacred island of Rameshwaram, bathe in 22 holy theerthams, worship at Ramanathaswamy temple — one of the 12 Jyotirlingas.",
    descriptionHi:
      "पवित्र द्वीप रामेश्वरम जाएं, 22 पवित्र तीर्थों में स्नान करें और रामनाथस्वामी मंदिर में दर्शन करें।",
    duration: "5 Days / 4 Nights",
    price: 12999,
    rating: 4.9,
    seatsRemaining: 20,
    highlights: [
      "Agni Theertham",
      "Ramanathaswamy Temple",
      "Dhanushkodi",
      "Pamban Bridge",
    ],
    badge: "Jyotirlinga",
  },
  {
    id: "pancha-bootha",
    icon: "🕉️",
    nameEn: "Pancha Bootha Sthalam Yatra",
    nameHi: "पंच भूत स्थलम यात्रा",
    descriptionEn:
      "Pilgrimage to all 5 sacred Shiva temples representing the five elements: Chidambaram (Space), Thiruvanaikaval (Water), Thiruvannamalai (Fire), Kanchipuram (Earth), Kalahasti (Air).",
    descriptionHi:
      "पांच शिव मंदिरों की यात्रा जो पंचभूतों का प्रतिनिधित्व करते हैं — आकाश, जल, अग्नि, पृथ्वी और वायु।",
    duration: "7 Days / 6 Nights",
    price: 18999,
    rating: 5.0,
    seatsRemaining: 15,
    highlights: [
      "Chidambaram (Akasha)",
      "Thiruvanaikaval (Jal)",
      "Thiruvannamalai (Agni)",
      "Kanchipuram (Prithvi)",
      "Kalahasti (Vayu)",
    ],
    badge: "Most Popular",
  },
  {
    id: "arupadai-murugan",
    icon: "🦚",
    nameEn: "Arupadai Murugan Yatra",
    nameHi: "अरुपदै मुरुगन यात्रा",
    descriptionEn:
      "Visit all 6 sacred abodes of Lord Murugan: Palani, Tiruchendur, Swamimalai, Thiruthani, Pazhamudircholai, and Thiruparamkundram.",
    descriptionHi:
      "भगवान मुरुगन के सभी छह पवित्र धामों की यात्रा — पलनी, तिरुचेंदूर, स्वामिमलई, थिरुथनी, पलमुदिर्चोलाई और थिरुपरमकुंद्रम।",
    duration: "8 Days / 7 Nights",
    price: 21999,
    rating: 4.8,
    seatsRemaining: 12,
    highlights: [
      "Palani Murugan",
      "Tiruchendur Murugan",
      "Swamimalai Murugan",
      "Thiruthani Murugan",
      "Pazhamudircholai",
      "Thiruparamkundram",
    ],
    badge: "Extended Tour",
  },
  {
    id: "navagraha",
    icon: "🪐",
    nameEn: "Navagraha (9 Planets) Temple Yatra",
    nameHi: "नवग्रह मंदिर यात्रा",
    descriptionEn:
      "Visit all 9 Navagraha temples in Tamil Nadu to propitiate the 9 planets and remove planetary doshas from your birth chart.",
    descriptionHi:
      "तमिलनाडु के सभी 9 नवग्रह मंदिरों की यात्रा — ग्रह दोष निवारण और जन्म कुंडली के नवग्रहों की प्रसन्नता के लिए।",
    duration: "6 Days / 5 Nights",
    price: 15999,
    rating: 4.9,
    seatsRemaining: 18,
    highlights: [
      "Surya (Suriyanar Koil)",
      "Chandra (Kailasanathar)",
      "Mangal (Vaitheeswaran Koil)",
      "Budha (Thirunageswaram)",
      "Guru (Alangudi)",
      "Shukra (Kanjanur)",
      "Shani (Thirunallar)",
      "Rahu (Thirunageswaram)",
      "Ketu (Keezhperumpallam)",
    ],
    badge: "Dosha Removal",
  },
];

const INCLUSIONS = [
  { icon: <Hotel className="h-5 w-5" />, label: "Accommodation", hi: "आवास" },
  {
    icon: <Utensils className="h-5 w-5" />,
    label: "Sattvic Meals",
    hi: "सात्विक भोजन",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Expert Guide",
    hi: "अनुभवी गाइड",
  },
  { icon: <Bus className="h-5 w-5" />, label: "AC Transport", hi: "एसी वाहन" },
  {
    icon: <span className="text-lg">🪔</span>,
    label: "Puja Materials",
    hi: "पूजा सामग्री",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "All Temple Entry",
    hi: "मंदिर प्रवेश",
  },
];

const STAR_INDICES = [0, 1, 2, 3, 4];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {STAR_INDICES.map((i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5"
          style={{
            color:
              i < Math.floor(rating)
                ? "oklch(0.68 0.20 48)"
                : "oklch(0.82 0.04 80)",
            fill:
              i < Math.floor(rating) ? "oklch(0.68 0.20 48)" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

interface YatraCardProps {
  yatra: YatraData;
  language: "en" | "hi";
  onBookNow: () => void;
}

function YatraCard({ yatra, language, onBookNow }: YatraCardProps) {
  const isHi = language === "hi";

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
      style={{
        background: "oklch(0.99 0.008 80)",
        border: "1px solid oklch(0.78 0.14 75 / 0.25)",
        boxShadow: "0 2px 12px oklch(0.68 0.20 48 / 0.08)",
      }}
      data-ocid={`yatra.card.${yatra.id}`}
    >
      {/* Card Header */}
      <div
        className="p-5 flex items-start gap-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.10), oklch(0.78 0.14 75 / 0.06))",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <span
          className="text-3xl shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl"
          style={{ background: "oklch(0.68 0.20 48 / 0.14)" }}
          aria-hidden="true"
        >
          {yatra.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3
              className="font-heading font-bold text-base leading-snug"
              style={{ color: "oklch(0.22 0.10 25)" }}
            >
              {isHi ? yatra.nameHi : yatra.nameEn}
            </h3>
            {yatra.badge && (
              <Badge
                className="shrink-0 text-xs font-heading font-semibold"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.15)",
                  color: "oklch(0.38 0.16 40)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.30)",
                }}
              >
                {yatra.badge}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <StarRow rating={yatra.rating} />
            <span
              className="text-xs font-body"
              style={{ color: "oklch(0.50 0.08 48)" }}
            >
              {yatra.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        <p
          className="text-sm font-body leading-relaxed"
          style={{ color: "oklch(0.42 0.06 48)" }}
        >
          {isHi ? yatra.descriptionHi : yatra.descriptionEn}
        </p>

        {/* Highlights */}
        <div>
          <p
            className="text-xs font-heading font-semibold mb-2 uppercase tracking-wide"
            style={{ color: "oklch(0.55 0.12 45)" }}
          >
            {isHi ? "मंदिर शामिल हैं" : "Temples Included"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {yatra.highlights.map((h) => (
              <span
                key={h}
                className="px-2.5 py-1 rounded-full text-xs font-body"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.08)",
                  color: "oklch(0.40 0.12 42)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.20)",
                }}
              >
                🛕 {h}
              </span>
            ))}
          </div>
        </div>

        {/* Duration + Seats */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-medium"
            style={{
              background: "oklch(0.55 0.16 220 / 0.08)",
              color: "oklch(0.38 0.12 220)",
              border: "1px solid oklch(0.55 0.16 220 / 0.2)",
            }}
          >
            🗓️ {yatra.duration}
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-medium"
            style={{
              background:
                yatra.seatsRemaining <= 12
                  ? "oklch(0.62 0.18 22 / 0.10)"
                  : "oklch(0.55 0.18 145 / 0.08)",
              color:
                yatra.seatsRemaining <= 12
                  ? "oklch(0.45 0.16 22)"
                  : "oklch(0.38 0.14 145)",
              border:
                yatra.seatsRemaining <= 12
                  ? "1px solid oklch(0.62 0.18 22 / 0.25)"
                  : "1px solid oklch(0.55 0.18 145 / 0.2)",
            }}
          >
            👥 {yatra.seatsRemaining} {isHi ? "सीटें शेष" : "seats left"}
          </div>
        </div>

        {/* Price + CTA */}
        <div
          className="flex items-center justify-between pt-4 mt-auto border-t"
          style={{ borderColor: "oklch(0.78 0.14 75 / 0.18)" }}
        >
          <div>
            <div
              className="font-heading font-bold text-2xl"
              style={{ color: "oklch(0.32 0.14 28)" }}
            >
              ₹{yatra.price.toLocaleString("en-IN")}
            </div>
            <div
              className="text-xs font-body"
              style={{ color: "oklch(0.58 0.06 50)" }}
            >
              {isHi ? "प्रति व्यक्ति" : "per person"}
            </div>
          </div>
          <button
            type="button"
            onClick={onBookNow}
            className="font-heading font-bold text-sm px-6 py-2.5 rounded-full transition-all hover:scale-105 hover:shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.18 38))",
              color: "white",
            }}
            data-ocid={`yatra.book_button.${yatra.id}`}
          >
            {isHi ? "बुकिंग करें" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TempleToursYatra() {
  const { language } = useLanguage();
  const [bookingYatra, setBookingYatra] = useState<YatraData | null>(null);
  const isHi = language === "hi";

  return (
    <div data-ocid="yatra.page">
      {/* Hero Banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "300px" }}
      >
        <div
          className="w-full h-72 md:h-80"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.18 0.06 25) 0%, oklch(0.22 0.10 38) 50%, oklch(0.16 0.04 22) 100%)",
          }}
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.12 0.05 22 / 0.3), oklch(0.10 0.04 20 / 0.55))",
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-heading font-semibold mb-4"
            style={{
              background: "oklch(0.68 0.20 48 / 0.2)",
              border: "1px solid oklch(0.68 0.20 48 / 0.4)",
              color: "oklch(0.88 0.12 72)",
            }}
          >
            🛕 Spiritual Connect — Sacred Yatras
          </div>
          <h1
            className="font-heading text-3xl md:text-5xl font-bold mb-3 leading-tight"
            style={{ color: "oklch(0.88 0.14 72)" }}
          >
            {isHi ? "तीर्थ यात्रा" : "Temple Tours & Holy Yatra"}
          </h1>
          <p
            className="font-body text-base md:text-lg max-w-2xl"
            style={{ color: "oklch(0.82 0.06 68)" }}
          >
            {isHi
              ? "अनुभवी आध्यात्मिक मार्गदर्शकों के साथ भारत के सबसे शक्तिशाली मंदिरों की पवित्र यात्रा पर निकलें"
              : "Embark on sacred pilgrimages to the most powerful temples in India, guided by experienced spiritual conductors"}
          </p>
          {/* Quick Stats */}
          <div className="flex items-center gap-6 mt-6">
            {[
              { value: "4", label: isHi ? "यात्रा पैकेज" : "Yatra Packages" },
              { value: "500+", label: isHi ? "तीर्थयात्री" : "Pilgrims" },
              { value: "4.9★", label: isHi ? "औसत रेटिंग" : "Avg Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-heading font-bold text-xl"
                  style={{ color: "oklch(0.78 0.18 68)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-body text-xs"
                  style={{ color: "oklch(0.72 0.06 60)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold mb-2"
            style={{ color: "oklch(0.28 0.12 28)" }}
          >
            {isHi ? "पवित्र यात्रा पैकेज" : "Sacred Yatra Packages"}
          </h2>
          <p
            className="font-body text-sm md:text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.50 0.06 50)" }}
          >
            {isHi
              ? "सभी प्रमुख दक्षिण भारतीय तीर्थ स्थलों की संगठित और आध्यात्मिक यात्रा"
              : "Organized spiritual journeys to all major South Indian pilgrimage destinations"}
          </p>
        </div>

        {/* Yatra Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14"
          data-ocid="yatra.cards_grid"
        >
          {YATRA_DATA.map((yatra) => (
            <YatraCard
              key={yatra.id}
              yatra={yatra}
              language={language as "en" | "hi"}
              onBookNow={() => setBookingYatra(yatra)}
            />
          ))}
        </div>

        {/* What's Included Section */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-14"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.05), oklch(0.78 0.14 75 / 0.03))",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
          data-ocid="yatra.inclusions.section"
        >
          <div className="text-center mb-7">
            <h2
              className="font-heading text-2xl font-bold mb-1"
              style={{ color: "oklch(0.28 0.12 28)" }}
            >
              {isHi ? "क्या शामिल है" : "What's Included"}
            </h2>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.52 0.06 50)" }}
            >
              {isHi
                ? "प्रत्येक यात्रा पैकेज में शामिल सुविधाएं"
                : "Everything included in every yatra package"}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {INCLUSIONS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center gap-2 p-4 rounded-xl"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.18)",
                }}
                data-ocid={`yatra.inclusion.${item.label.toLowerCase().replace(/\s+/g, "_")}`}
              >
                <span
                  className="p-2.5 rounded-full"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.12)",
                    color: "oklch(0.45 0.18 42)",
                  }}
                >
                  {item.icon}
                </span>
                <span
                  className="text-xs font-heading font-semibold leading-tight"
                  style={{ color: "oklch(0.38 0.10 38)" }}
                >
                  {isHi ? item.hi : item.label}
                </span>
              </div>
            ))}
          </div>
          <div
            className="mt-6 p-4 rounded-xl text-center"
            style={{ background: "oklch(0.68 0.20 48 / 0.07)" }}
          >
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.42 0.10 42)" }}
            >
              ✅{" "}
              {isHi
                ? "पूर्ण आयोजन, पूजा संकल्प, और व्यक्तिगत आध्यात्मिक मार्गदर्शन सहित"
                : "Full itinerary, puja sankalp, and personal spiritual guidance included"}
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-14" data-ocid="yatra.why_us.section">
          <div className="text-center mb-7">
            <h2
              className="font-heading text-2xl font-bold mb-1"
              style={{ color: "oklch(0.28 0.12 28)" }}
            >
              {isHi ? "हमें क्यों चुनें" : "Why Choose Spiritual Connect"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🙏",
                titleEn: "Expert Pandits",
                titleHi: "अनुभवी पंडित",
                descEn:
                  "Qualified Vedic priests perform rituals at each temple with proper vidhi and mantras.",
                descHi: "प्रत्येक मंदिर में योग्य वैदिक पुजारी विधिपूर्वक अनुष्ठान करते हैं।",
              },
              {
                icon: "🛡️",
                titleEn: "Safe & Comfortable",
                titleHi: "सुरक्षित एवं आरामदायक",
                descEn:
                  "AC coaches, hygienic meals, vetted hotels — comfort on every sacred mile.",
                descHi:
                  "एसी वाहन, स्वच्छ भोजन, चयनित होटल — हर पवित्र मील पर आराम।",
              },
              {
                icon: "📿",
                titleEn: "Spiritual Immersion",
                titleHi: "आध्यात्मिक अनुभव",
                descEn:
                  "Morning meditations, evening bhajans, personal sankalp — a complete pilgrimage experience.",
                descHi:
                  "प्रातःकालीन ध्यान, सांध्य भजन, व्यक्तिगत संकल्प — पूर्ण तीर्थ अनुभव।",
              },
            ].map((item) => (
              <div
                key={item.titleEn}
                className="flex flex-col items-center text-center p-6 rounded-2xl"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                  boxShadow: "0 2px 8px oklch(0.68 0.20 48 / 0.05)",
                }}
              >
                <span className="text-4xl mb-3">{item.icon}</span>
                <h3
                  className="font-heading font-bold text-base mb-2"
                  style={{ color: "oklch(0.30 0.12 28)" }}
                >
                  {isHi ? item.titleHi : item.titleEn}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.50 0.06 50)" }}
                >
                  {isHi ? item.descHi : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.30 0.14 35), oklch(0.22 0.10 28))",
            border: "1px solid oklch(0.68 0.20 48 / 0.25)",
          }}
          data-ocid="yatra.cta.section"
        >
          <div className="text-4xl mb-3" role="img" aria-label="Sacred Om">
            🕉️
          </div>
          <h2
            className="font-heading text-2xl md:text-3xl font-bold mb-2"
            style={{ color: "oklch(0.88 0.14 72)" }}
          >
            {isHi
              ? "अभी यात्रा बुक करें और सीमित सीटें सुरक्षित करें"
              : "Book Your Yatra Now & Secure Your Seat"}
          </h2>
          <p
            className="font-body text-sm mb-6 max-w-lg mx-auto"
            style={{ color: "oklch(0.75 0.06 62)" }}
          >
            {isHi
              ? "प्रत्येक यात्रा में सीटें सीमित हैं। अपनी पसंदीदा यात्रा अभी बुक करें।"
              : "Seats are limited on every yatra. Book your preferred pilgrimage today."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {YATRA_DATA.slice(0, 2).map((y) => (
              <button
                key={y.id}
                type="button"
                onClick={() => setBookingYatra(y)}
                className="font-heading font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 hover:shadow-lg min-w-40"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.18 38))",
                  color: "white",
                }}
                data-ocid={`yatra.cta_book_button.${y.id}`}
              >
                {isHi ? y.nameHi : y.nameEn.split(" ").slice(0, 2).join(" ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {bookingYatra && (
        <ServiceBookingForm
          isOpen={true}
          onClose={() => setBookingYatra(null)}
          serviceName={isHi ? bookingYatra.nameHi : bookingYatra.nameEn}
          price={bookingYatra.price}
          serviceType="Temple Yatra"
          showParticipants={true}
          onSubmitSuccess={() => setBookingYatra(null)}
        />
      )}
    </div>
  );
}
