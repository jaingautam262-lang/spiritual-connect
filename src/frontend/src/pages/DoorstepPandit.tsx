import ServiceBookingCard from "@/components/ServiceBookingCard";
import ServiceBookingForm from "@/components/ServiceBookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, CheckCircle, Home, Star, Users } from "lucide-react";
import { useState } from "react";

interface Service {
  serviceName: string;
  serviceNameHi: string;
  description: string;
  descriptionHi: string;
  duration: string;
  price: number;
  rating: number;
  icon: string;
}

const SERVICES: Service[] = [
  {
    serviceName: "Ganapathy Homa",
    serviceNameHi: "गणपति होम",
    description:
      "Remove obstacles and invite Lord Ganesha's blessings at your home. Sacred fire ritual with Vedic chanting for a prosperous new beginning.",
    descriptionHi:
      "अपने घर पर भगवान गणेश की कृपा प्राप्त करें और बाधाओं को दूर करें। शुभ नई शुरुआत के लिए वैदिक मंत्रोच्चारण के साथ पवित्र अग्नि अनुष्ठान।",
    duration: "2 hours",
    price: 5100,
    rating: 4.9,
    icon: "🪔",
  },
  {
    serviceName: "Navgraha Shanthi Homa",
    serviceNameHi: "नवग्रह शांति होम",
    description:
      "Propitiate all nine planets to remove doshas and invite cosmic harmony. Powerful ritual to neutralize malefic planetary influences.",
    descriptionHi:
      "सभी नव ग्रहों की शांति के लिए दोष निवारण और ब्रह्मांडीय सामंजस्य के लिए शक्तिशाली अनुष्ठान।",
    duration: "3 hours",
    price: 7500,
    rating: 4.8,
    icon: "🌙",
  },
  {
    serviceName: "House Warming (Grihapravesh)",
    serviceNameHi: "गृह प्रवेश",
    description:
      "Sacred purification rituals for your new home with Vastu blessings. Invite divine protection and prosperity into every corner of your abode.",
    descriptionHi:
      "वास्तु आशीर्वाद के साथ नए घर के लिए पवित्र शुद्धिकरण अनुष्ठान। अपने घर के हर कोने में दैवीय सुरक्षा और समृद्धि का आह्वान करें।",
    duration: "3–4 hours",
    price: 11000,
    rating: 5.0,
    icon: "🏠",
  },
  {
    serviceName: "60th Marriage Anniversary (Shastiabdapoorthi)",
    serviceNameHi: "षष्ट्याब्दपूर्ति (60वीं वर्षगांठ)",
    description:
      "Grand ritual celebration for 60th wedding anniversary — the golden milestone. Honour the blessed union with traditional Vedic ceremonies.",
    descriptionHi:
      "60वीं शादी की सालगिरह के लिए भव्य अनुष्ठान उत्सव — सुनहरा मील का पत्थर। पारंपरिक वैदिक समारोहों के साथ इस पवित्र मिलन का सम्मान करें।",
    duration: "4 hours",
    price: 15000,
    rating: 4.9,
    icon: "💛",
  },
  {
    serviceName: "Naming Ceremony (Naamakarana)",
    serviceNameHi: "नामकरण संस्कार",
    description:
      "Vedic naming ceremony for the newborn with horoscope and auspicious name selection. Welcome the child into the world with divine blessings.",
    descriptionHi:
      "जन्मपत्री और शुभ नाम चयन के साथ नवजात के लिए वैदिक नामकरण संस्कार। दैवीय आशीर्वाद के साथ शिशु का स्वागत करें।",
    duration: "1–2 hours",
    price: 4100,
    rating: 4.9,
    icon: "👶",
  },
];

const BENEFITS = [
  {
    icon: <Home className="h-6 w-6" />,
    title: "At Your Doorstep",
    titleHi: "आपके द्वार पर",
    desc: "Experienced pandits travel to your home or venue — no need to visit a temple.",
    descHi: "अनुभवी पंडित आपके घर या स्थान पर आते हैं — मंदिर जाने की जरूरत नहीं।",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Vedic Scholars",
    titleHi: "वैदिक विद्वान",
    desc: "All pandits are rigorously trained in Vedic scriptures with 10+ years of experience.",
    descHi: "सभी पंडित 10+ वर्षों के अनुभव के साथ वैदिक शास्त्रों में कठोर प्रशिक्षित हैं।",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Family-Friendly",
    titleHi: "परिवार के अनुकूल",
    desc: "Rituals explained in Hindi & English so every family member understands and participates.",
    descHi:
      "हिंदी और अंग्रेजी में समझाए गए अनुष्ठान ताकि परिवार का हर सदस्य समझे और भाग ले।",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Flexible Scheduling",
    titleHi: "लचीला समय-निर्धारण",
    desc: "Book on your preferred auspicious date (muhurta). We confirm within 2 hours.",
    descHi: "अपनी पसंदीदा शुभ तिथि (मुहूर्त) पर बुक करें। हम 2 घंटे के भीतर पुष्टि करते हैं।",
  },
];

export default function DoorstepPandit() {
  const { language } = useLanguage();
  const isHi = language === "hi";

  const [activeService, setActiveService] = useState<Service | null>(null);

  const openForm = (svc: Service) => setActiveService(svc);
  const closeForm = () => setActiveService(null);

  return (
    <>
      {/* Hero */}
      <section
        className="py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.68 0.20 48 / 0.10), oklch(0.78 0.14 75 / 0.06), oklch(0.99 0.008 80))",
        }}
        data-ocid="doorstep_pandit.hero.section"
      >
        <div className="max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-heading font-semibold mb-5"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              color: "oklch(0.40 0.16 40)",
              border: "1px solid oklch(0.68 0.20 48 / 0.25)",
            }}
          >
            🙏 {isHi ? "वैदिक अनुष्ठान सेवाएं" : "Vedic Ritual Services"}
          </div>
          <h1
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4"
            style={{ color: "oklch(0.25 0.10 25)" }}
            data-ocid="doorstep_pandit.hero.title"
          >
            {isHi ? "द्वारपद पंडित सेवाएं" : "Doorstep Pandit Services"}
          </h1>
          <p
            className="font-body text-base sm:text-lg leading-relaxed"
            style={{ color: "oklch(0.48 0.07 50)" }}
          >
            {isHi
              ? "विद्वान पंडितों को आपके घर या स्थान पर पवित्र अनुष्ठान करने के लिए बुक करें"
              : "Book a learned pandit to perform sacred rituals at your home or venue"}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section
        className="py-12 px-4 bg-background"
        data-ocid="doorstep_pandit.services.section"
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-heading font-bold text-2xl sm:text-3xl mb-8 text-center"
            style={{ color: "oklch(0.28 0.10 25)" }}
          >
            {isHi ? "हमारी सेवाएं" : "Our Services"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, idx) => (
              <div
                key={svc.serviceName}
                data-ocid={`doorstep_pandit.service.item.${idx + 1}`}
              >
                <ServiceBookingCard
                  serviceName={isHi ? svc.serviceNameHi : svc.serviceName}
                  description={isHi ? svc.descriptionHi : svc.description}
                  duration={svc.duration}
                  price={svc.price}
                  rating={svc.rating}
                  icon={svc.icon}
                  onBookNow={() => openForm(svc)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        className="py-14 px-4"
        style={{ background: "oklch(0.97 0.012 80)" }}
        data-ocid="doorstep_pandit.benefits.section"
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-heading font-bold text-2xl sm:text-3xl mb-10 text-center"
            style={{ color: "oklch(0.28 0.10 25)" }}
          >
            {isHi
              ? "हमारी द्वारपद पंडित सेवा क्यों चुनें?"
              : "Why choose our Doorstep Pandit service?"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENEFITS.map((b, idx) => (
              <div
                key={b.title}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.18)",
                }}
                data-ocid={`doorstep_pandit.benefit.item.${idx + 1}`}
              >
                <span
                  className="shrink-0 p-2.5 rounded-xl"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.12)",
                    color: "oklch(0.45 0.16 42)",
                  }}
                >
                  {b.icon}
                </span>
                <div>
                  <h3
                    className="font-heading font-bold text-base mb-1"
                    style={{ color: "oklch(0.28 0.10 25)" }}
                  >
                    {isHi ? b.titleHi : b.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "oklch(0.50 0.06 50)" }}
                  >
                    {isHi ? b.descHi : b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section
        className="py-8 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.16 35))",
        }}
        data-ocid="doorstep_pandit.trust.section"
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {[
            { icon: "✅", label: isHi ? "वैदिक विशेषज्ञ" : "Vedic Scholars" },
            { icon: "🏠", label: isHi ? "घर पर सेवा" : "Home Service" },
            {
              icon: "📿",
              label: isHi ? "सभी सामग्री शामिल" : "All Materials Included",
            },
            { icon: "⭐", label: isHi ? "4.9+ रेटिंग" : "4.9+ Rated" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-white font-heading font-semibold text-sm"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* Booking confirmation note */}
      <section
        className="py-10 px-4 bg-background"
        data-ocid="doorstep_pandit.note.section"
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="flex items-start gap-4 p-5 rounded-2xl"
            style={{
              background: "oklch(0.55 0.18 145 / 0.06)",
              border: "1px solid oklch(0.55 0.18 145 / 0.20)",
            }}
          >
            <CheckCircle
              className="h-6 w-6 shrink-0 mt-0.5"
              style={{ color: "oklch(0.50 0.16 145)" }}
            />
            <div>
              <p
                className="font-heading font-semibold text-sm mb-1"
                style={{ color: "oklch(0.30 0.10 140)" }}
              >
                {isHi ? "बुकिंग कैसे काम करती है" : "How Booking Works"}
              </p>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.45 0.06 50)" }}
              >
                {isHi
                  ? "सेवा चुनें और अपना विवरण दर्ज करें। हम 2 घंटे के भीतर शुभ मुहूर्त की पुष्टि करेंगे। पंडित सभी पूजा सामग्री के साथ आपके द्वार पर आएंगे।"
                  : "Choose a service and enter your details. We'll confirm the auspicious muhurta within 2 hours. The pandit arrives at your door with all puja materials included."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {activeService && (
        <ServiceBookingForm
          isOpen={!!activeService}
          onClose={closeForm}
          serviceName={
            isHi ? activeService.serviceNameHi : activeService.serviceName
          }
          price={activeService.price}
          serviceType="doorstep-pandit"
          showLocation={true}
          showParticipants={true}
          onSubmitSuccess={closeForm}
        />
      )}
    </>
  );
}
