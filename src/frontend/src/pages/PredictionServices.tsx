import { useState } from "react";
import ServiceBookingCard from "../components/ServiceBookingCard";
import ServiceBookingForm from "../components/ServiceBookingForm";
import { useLanguage } from "../contexts/LanguageContext";

interface PredictionService {
  id: string;
  nameEn: string;
  nameHi: string;
  descEn: string;
  descHi: string;
  duration: string;
  price: number;
  rating: number;
  icon: string;
  badge?: string;
}

const SERVICES: PredictionService[] = [
  {
    id: "nadi-astrology",
    nameEn: "Nadi Astrology",
    nameHi: "नाड़ी ज्योतिष",
    descEn:
      "Discover your destiny through ancient palm leaf manuscripts written by Tamil Sages thousands of years ago.",
    descHi:
      "हजारों वर्ष पूर्व तमिल ऋषियों द्वारा लिखी गई प्राचीन ताड़पत्र पांडुलिपियों से अपना भाग्य जानें।",
    duration: "60 min",
    price: 2100,
    rating: 4.9,
    icon: "📜",
    badge: "Ancient",
  },
  {
    id: "live-astrology",
    nameEn: "Live Astrology Consultation",
    nameHi: "लाइव ज्योतिष परामर्श",
    descEn:
      "Real-time birth chart reading by experienced Vedic astrologers for personalized life guidance.",
    descHi:
      "अनुभवी वैदिक ज्योतिषियों द्वारा जन्म कुंडली का वास्तविक समय में पठन और व्यक्तिगत मार्गदर्शन।",
    duration: "45 min",
    price: 1500,
    rating: 4.8,
    icon: "🔭",
  },
  {
    id: "palmistry",
    nameEn: "Palmistry Reading",
    nameHi: "हस्तरेखा विज्ञान",
    descEn:
      "Unveil life secrets through detailed analysis of your hand lines by trained palmistry experts.",
    descHi:
      "प्रशिक्षित हस्तरेखा विशेषज्ञों द्वारा आपकी हस्तरेखाओं के विस्तृत विश्लेषण से जीवन के रहस्य उजागर करें।",
    duration: "30 min",
    price: 999,
    rating: 4.7,
    icon: "✋",
  },
  {
    id: "agastya-nadi",
    nameEn: "Agastya Jeeva Nadi",
    nameHi: "अगस्त्य जीव नाड़ी",
    descEn:
      "Divine messages from Sage Agastya channeled through specially trained Nadi readers for profound spiritual guidance.",
    descHi: "विशेष रूप से प्रशिक्षित नाड़ी वाचकों के माध्यम से महर्षि अगस्त्य के दिव्य संदेश।",
    duration: "90 min",
    price: 3500,
    rating: 5.0,
    icon: "🌿",
    badge: "Divine",
  },
  {
    id: "varahi-amman",
    nameEn: "Varahi Amman Arul Vaaku",
    nameHi: "वाराही अम्मन अरुल वाक्कु",
    descEn:
      "Sacred oracle from Goddess Varahi for divine guidance, protection, and removal of obstacles in life.",
    descHi:
      "देवी वाराही का पवित्र दैवोक्ति — जीवन में दिव्य मार्गदर्शन, सुरक्षा और बाधाओं के निवारण के लिए।",
    duration: "60 min",
    price: 2500,
    rating: 4.9,
    icon: "🐗",
  },
  {
    id: "angali-amman",
    nameEn: "Angali Amman Arul Vaaku",
    nameHi: "अंगाली अम्मन अरुल वाक्कु",
    descEn:
      "Divine blessings and guidance from Goddess Angali Amman for healing, protection, and spiritual awakening.",
    descHi:
      "देवी अंगाली अम्मन के दिव्य आशीर्वाद — उपचार, सुरक्षा और आध्यात्मिक जागृति के लिए।",
    duration: "60 min",
    price: 2500,
    rating: 4.8,
    icon: "🌺",
  },
  {
    id: "karuppasamy",
    nameEn: "Karuppasamy Arul Vaaku",
    nameHi: "करुप्पसामी अरुल वाक्कु",
    descEn:
      "Powerful oracle from Lord Karuppasamy — guardian deity of Tamil Nadu — for protection and justice.",
    descHi:
      "तमिलनाडु के संरक्षक देवता भगवान करुप्पसामी का शक्तिशाली दैवोक्ति — सुरक्षा और न्याय के लिए।",
    duration: "60 min",
    price: 2500,
    rating: 4.9,
    icon: "⚔️",
  },
];

const STEPS = [
  {
    step: "01",
    titleEn: "Book Your Session",
    titleHi: "सत्र बुक करें",
    descEn:
      "Select your preferred service, fill in your details, and add to cart for checkout.",
    descHi: "अपनी पसंदीदा सेवा चुनें, विवरण भरें, और चेकआउट के लिए कार्ट में जोड़ें।",
    icon: "📅",
  },
  {
    step: "02",
    titleEn: "Receive Session Details",
    titleHi: "सत्र विवरण प्राप्त करें",
    descEn:
      "Our team will contact you within 24 hours via email or WhatsApp to confirm time and send preparation instructions.",
    descHi: "हमारी टीम 24 घंटे के भीतर ईमेल या व्हाट्सएप द्वारा आपसे संपर्क करेगी।",
    icon: "📬",
  },
  {
    step: "03",
    titleEn: "Get Your Reading",
    titleHi: "अपनी भविष्यवाणी प्राप्त करें",
    descEn:
      "Connect with your expert at the scheduled time for a detailed reading, insights, and remedial guidance.",
    descHi:
      "निर्धारित समय पर अपने विशेषज्ञ से जुड़ें और विस्तृत रीडिंग, अंतर्दृष्टि और उपाय प्राप्त करें।",
    icon: "🔮",
  },
];

export default function PredictionServices() {
  const { language } = useLanguage();
  const isHi = language === "hi";

  const [activeService, setActiveService] = useState<PredictionService | null>(
    null,
  );

  const t = {
    heading: isHi ? "भविष्यवाणी सेवाएं" : "Prediction Services",
    subheading: isHi
      ? "प्राचीन भारतीय ज्ञान से भविष्य का मार्गदर्शन"
      : "Ancient Wisdom, Divine Guidance",
    intro: isHi
      ? "नाड़ी ज्योतिष एक प्राचीन तमिल भविष्यवाणी पद्धति है जिसमें हजारों वर्ष पूर्व ऋषियों द्वारा ताड़पत्रों पर लिखी गई आत्माओं की नियति संग्रहीत है। हमारी भविष्यवाणी सेवाएं नाड़ी ज्योतिष, हस्तरेखा विज्ञान, लाइव ज्योतिष परामर्श और पवित्र दैवोक्ति सेवाओं का अद्वितीय संगम प्रदान करती हैं।"
      : "Nadi Astrology is an ancient Tamil prediction science where the destinies of souls were inscribed on palm leaves by Sages thousands of years ago. Our prediction services bring together Nadi Astrology, Palmistry, Live Vedic consultations, and sacred oracle services — a unique confluence of divine wisdom to illuminate your life path.",
    howItWorks: isHi ? "सेवाएं कैसे काम करती हैं?" : "How It Works",
    servicesTitle: isHi ? "हमारी भविष्यवाणी सेवाएं" : "Our Prediction Services",
    divider: isHi
      ? "ॐ नमः शिवाय • ॐ शक्ति • ॐ गणेशाय नमः"
      : "ॐ Namo Namah • Ancient Wisdom • Divine Oracle • Sacred Guidance",
  };

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="prediction_services.page"
    >
      {/* Hero Section */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.18 0.08 30) 0%, oklch(0.22 0.10 35) 50%, oklch(0.16 0.06 25) 100%)",
        }}
        data-ocid="prediction_services.hero_section"
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.68 0.20 48) 0%, transparent 50%), radial-gradient(circle at 80% 30%, oklch(0.78 0.14 75) 0%, transparent 40%)",
          }}
        />
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-5xl opacity-10 pointer-events-none select-none">
          ☸
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-heading font-semibold tracking-widest uppercase mb-6"
            style={{
              background: "oklch(0.68 0.20 48 / 0.15)",
              border: "1px solid oklch(0.68 0.20 48 / 0.40)",
              color: "oklch(0.85 0.16 72)",
            }}
          >
            ✦ {isHi ? "प्राचीन विज्ञान" : "Ancient Science"} ✦
          </div>
          <h1
            className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-4"
            style={{ color: "oklch(0.92 0.10 75)" }}
            data-ocid="prediction_services.heading"
          >
            {t.heading}
          </h1>
          <p
            className="font-heading text-lg md:text-xl font-medium mb-6"
            style={{ color: "oklch(0.78 0.14 72)" }}
          >
            {t.subheading}
          </p>
          <p
            className="font-body text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.72 0.05 60)" }}
          >
            {t.intro}
          </p>
        </div>
      </section>

      {/* Decorative Divider */}
      <div
        className="py-3 text-center text-xs font-heading tracking-widest"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.68 0.20 48 / 0.08), oklch(0.68 0.20 48 / 0.18), oklch(0.68 0.20 48 / 0.08))",
          borderTop: "1px solid oklch(0.68 0.20 48 / 0.20)",
          borderBottom: "1px solid oklch(0.68 0.20 48 / 0.20)",
          color: "oklch(0.50 0.14 45)",
        }}
      >
        {t.divider}
      </div>

      {/* How It Works */}
      <section
        className="py-14 md:py-16"
        style={{ background: "oklch(0.97 0.012 75)" }}
        data-ocid="prediction_services.how_it_works_section"
      >
        <div className="container mx-auto px-4">
          <h2
            className="font-heading font-bold text-2xl md:text-3xl text-center mb-2"
            style={{ color: "oklch(0.28 0.10 25)" }}
          >
            {t.howItWorks}
          </h2>
          <div
            className="w-16 h-0.5 mx-auto mb-10 rounded-full"
            style={{ background: "oklch(0.68 0.20 48)" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {STEPS.map((s, idx) => (
              <div
                key={s.step}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                }}
                data-ocid={`prediction_services.step.item.${idx + 1}`}
              >
                {/* Step number badge */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white shadow"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.16 35))",
                  }}
                >
                  {s.step}
                </div>
                <span className="text-4xl mt-2 mb-3" aria-hidden="true">
                  {s.icon}
                </span>
                <h3
                  className="font-heading font-bold text-base mb-2"
                  style={{ color: "oklch(0.28 0.10 25)" }}
                >
                  {isHi ? s.titleHi : s.titleEn}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.50 0.06 50)" }}
                >
                  {isHi ? s.descHi : s.descEn}
                </p>
                {/* Connector arrow — hide on last */}
                {idx < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-lg z-10"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                    aria-hidden="true"
                  >
                    ›
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.68 0.20 48 / 0.30), transparent)",
        }}
      />

      {/* Services Grid */}
      <section
        className="py-14 md:py-16 bg-background"
        data-ocid="prediction_services.services_section"
      >
        <div className="container mx-auto px-4">
          <h2
            className="font-heading font-bold text-2xl md:text-3xl text-center mb-2"
            style={{ color: "oklch(0.28 0.10 25)" }}
          >
            {t.servicesTitle}
          </h2>
          <div
            className="w-16 h-0.5 mx-auto mb-10 rounded-full"
            style={{ background: "oklch(0.68 0.20 48)" }}
          />

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
            data-ocid="prediction_services.services_list"
          >
            {SERVICES.map((svc, idx) => (
              <div
                key={svc.id}
                data-ocid={`prediction_services.services_list.item.${idx + 1}`}
              >
                <ServiceBookingCard
                  serviceName={isHi ? svc.nameHi : svc.nameEn}
                  description={isHi ? svc.descHi : svc.descEn}
                  duration={svc.duration}
                  price={svc.price}
                  rating={svc.rating}
                  icon={svc.icon}
                  badge={svc.badge}
                  onBookNow={() => setActiveService(svc)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section
        className="py-10"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.06), oklch(0.78 0.14 75 / 0.04))",
          borderTop: "1px solid oklch(0.68 0.20 48 / 0.15)",
        }}
        data-ocid="prediction_services.trust_section"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: "🔒", label: isHi ? "100% गोपनीय" : "100% Confidential" },
              {
                icon: "🙏",
                label: isHi ? "प्रमाणित विशेषज्ञ" : "Certified Experts",
              },
              {
                icon: "⭐",
                label: isHi ? "हजारों संतुष्ट ग्राहक" : "Thousands Satisfied",
              },
              { icon: "📞", label: isHi ? "24/7 सहायता" : "24/7 Support" },
              { icon: "💳", label: isHi ? "सुरक्षित भुगतान" : "Secure Payment" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm font-heading font-semibold"
                style={{ color: "oklch(0.42 0.12 40)" }}
              >
                <span className="text-xl" aria-hidden="true">
                  {badge.icon}
                </span>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {activeService && (
        <ServiceBookingForm
          isOpen={!!activeService}
          onClose={() => setActiveService(null)}
          serviceName={isHi ? activeService.nameHi : activeService.nameEn}
          price={activeService.price}
          serviceType="prediction"
          onSubmitSuccess={() => setActiveService(null)}
        />
      )}
    </div>
  );
}
