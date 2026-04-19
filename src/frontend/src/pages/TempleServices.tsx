import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  MapPin,
  Video,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PrasadDeliveryForm from "../components/PrasadDeliveryForm";
import PujaBookingForm from "../components/PujaBookingForm";
import VirtualAarti from "../components/VirtualAarti";
import VirtualChadhava from "../components/VirtualChadhava";

const PUJA_SERVICES = [
  {
    id: "satyanarayan",
    name: "Satyanarayan Puja",
    hindi: "सत्यनारायण पूजा",
    deity: "Vishnu",
    icon: "🙏",
    duration: "3-4 घंटे",
    cost: "₹2,100 – ₹5,100",
    benefits: "सुख, समृद्धि, मनोकामना पूर्ति, घर में शांति",
    description:
      "भगवान सत्यनारायण की पूजा — नई शुरुआत, गृह प्रवेश, विवाह और मनोकामना पूर्ति के लिए।",
    occasion: "नई शुरुआत, पूर्णिमा",
  },
  {
    id: "ganesh",
    name: "Ganesh Puja",
    hindi: "गणेश पूजा",
    deity: "Ganesh",
    icon: "🐘",
    duration: "1-2 घंटे",
    cost: "₹1,100 – ₹3,100",
    benefits: "विघ्न नाश, बुद्धि, नई शुरुआत में सफलता",
    description: "शुभ कार्यों की शुरुआत, परीक्षा, व्यापार और नई शुरुआत से पहले।",
    occasion: "किसी भी शुभ कार्य से पहले",
  },
  {
    id: "navgraha",
    name: "Navgraha Puja",
    hindi: "नवग्रह पूजा",
    deity: "नवग्रह",
    icon: "🪐",
    duration: "3-5 घंटे",
    cost: "₹3,100 – ₹7,100",
    benefits: "ग्रह दोष निवारण, शनि-राहु-केतु शांति, भाग्योदय",
    description: "नौ ग्रहों की पूजा और हवन — कुंडली दोष, साढ़ेसाती, कालसर्प दोष के लिए।",
    occasion: "ग्रह दोष, साढ़ेसाती",
  },
  {
    id: "rudrabhishek",
    name: "Rudrabhishek",
    hindi: "रुद्राभिषेक",
    deity: "Shiva",
    icon: "🔱",
    duration: "2-3 घंटे",
    cost: "₹2,100 – ₹5,100",
    benefits: "स्वास्थ्य, दीर्घायु, शिव कृपा, बाधा निवारण",
    description:
      "पंचामृत अभिषेक, रुद्री पाठ और हवन — महाशिवरात्रि और सोमवार पर विशेष।",
    occasion: "सोमवार, महाशिवरात्रि",
  },
  {
    id: "griha-pravesh",
    name: "Griha Pravesh",
    hindi: "गृह प्रवेश",
    deity: "वास्तु देव",
    icon: "🏠",
    duration: "4-6 घंटे",
    cost: "₹5,100 – ₹11,000",
    benefits: "गृह शांति, वास्तु दोष निवारण, समृद्धि",
    description: "नए घर में प्रवेश — शुभ मुहूर्त, वास्तु पूजा, हवन और गणेश पूजा सहित।",
    occasion: "नए घर में प्रवेश",
  },
  {
    id: "vivah-muhurta",
    name: "Vivah Muhurta",
    hindi: "विवाह मुहूर्त",
    deity: "ब्रह्मा",
    icon: "💍",
    duration: "2-3 घंटे",
    cost: "₹3,100 – ₹8,100",
    benefits: "शुभ विवाह, दांपत्य सुख, पारिवारिक सुख",
    description: "कुंडली मिलान, शुभ मुहूर्त निर्धारण और विवाह संस्कार।",
    occasion: "विवाह पूर्व",
  },
  {
    id: "naming-ceremony",
    name: "Naming Ceremony",
    hindi: "नामकरण संस्कार",
    deity: "ब्रह्मा, सरस्वती",
    icon: "👶",
    duration: "1-2 घंटे",
    cost: "₹1,100 – ₹2,500",
    benefits: "शिशु का दीर्घायु, बुद्धि, परमात्मा का आशीर्वाद",
    description: "शिशु के जन्म के 11वें दिन नामकरण संस्कार — जन्म नक्षत्र और राशि अनुसार।",
    occasion: "जन्म के 11वें दिन",
  },
  {
    id: "mundan",
    name: "Mundan Ceremony",
    hindi: "मुंडन संस्कार",
    deity: "सूर्य देव",
    icon: "✂️",
    duration: "1-2 घंटे",
    cost: "₹1,500 – ₹3,100",
    benefits: "बच्चे का स्वास्थ्य, बुद्धि और आध्यात्मिक शुद्धि",
    description: "प्रथम केश मुंडन — बच्चे के जीवन का महत्वपूर्ण संस्कार।",
    occasion: "1-3 वर्ष की आयु में",
  },
  {
    id: "annaprashan",
    name: "Annaprashan",
    hindi: "अन्नप्राशन",
    deity: "अन्नपूर्णा देवी",
    icon: "🍚",
    duration: "1-2 घंटे",
    cost: "₹1,100 – ₹2,100",
    benefits: "बच्चे का स्वास्थ्य, पोषण और दीर्घायु",
    description: "पहला अन्न ग्रहण संस्कार — 6-8 माह के शिशु के लिए।",
    occasion: "6-8 माह की आयु",
  },
  {
    id: "shradh",
    name: "Shradh Puja",
    hindi: "श्राद्ध पूजा",
    deity: "पितृ देव",
    icon: "🙏",
    duration: "2-3 घंटे",
    cost: "₹2,100 – ₹5,100",
    benefits: "पितृ दोष निवारण, पूर्वजों की आत्मा की शांति",
    description: "पितृ पक्ष में पिंडदान, तर्पण और ब्राह्मण भोजन — पूर्वजों की शांति के लिए।",
    occasion: "पितृ पक्ष, श्राद्ध तिथि",
  },
  {
    id: "kali",
    name: "Kali Puja",
    hindi: "काली पूजा",
    deity: "मां काली",
    icon: "🌑",
    duration: "3-4 घंटे",
    cost: "₹3,100 – ₹7,100",
    benefits: "शत्रु नाश, नकारात्मकता नाश, शक्ति प्राप्ति",
    description: "दीपावली की रात विशेष काली पूजा — तांत्रिक विधि से शक्ति साधना।",
    occasion: "दीपावली, अमावस्या",
  },
  {
    id: "durga",
    name: "Durga Puja",
    hindi: "दुर्गा पूजा",
    deity: "मां दुर्गा",
    icon: "🌺",
    duration: "3-5 घंटे",
    cost: "₹3,100 – ₹11,000",
    benefits: "शक्ति, रक्षा, शत्रु विजय, संतान सुख",
    description: "नवरात्रि में विशेष — दुर्गा सप्तशती पाठ, हवन और दुर्गा महाआरती।",
    occasion: "नवरात्रि, शक्ति पर्व",
  },
];

const UPCOMING_EVENTS = [
  {
    date: "14 अप्रैल 2026",
    event: "श्री राम नवमी — विशेष राम अभिषेक",
    type: "हिन्दू",
    icon: "🏹",
  },
  {
    date: "18 अप्रैल 2026",
    event: "हनुमान जयंती — सुंदरकांड पाठ",
    type: "हिन्दू",
    icon: "🐒",
  },
  {
    date: "26 अप्रैल 2026",
    event: "अक्षय तृतीया — लक्ष्मी पूजन",
    type: "हिन्दू",
    icon: "💰",
  },
  {
    date: "4 मई 2026",
    event: "बुद्ध पूर्णिमा — सत्यनारायण पूजा",
    type: "सार्वजनिक",
    icon: "☸️",
  },
  {
    date: "22 मई 2026",
    event: "नारद जयंती — भजन-कीर्तन",
    type: "हिन्दू",
    icon: "🎵",
  },
  {
    date: "6 जून 2026",
    event: "विट गेकारस — जैन पर्यूषण पर्व",
    type: "जैन",
    icon: "🕉️",
  },
  {
    date: "2 जुलाई 2026",
    event: "गुरु पूर्णिमा — गुरु पूजन विशेष",
    type: "सार्वजनिक",
    icon: "🙏",
  },
  {
    date: "18 जुलाई 2026",
    event: "हरियाली तीज — पार्वती पूजन",
    type: "हिन्दू",
    icon: "🌿",
  },
  {
    date: "24 जुलाई 2026",
    event: "नागपंचमी — नाग पूजा",
    type: "हिन्दू",
    icon: "🐍",
  },
  {
    date: "9 अगस्त 2026",
    event: "रक्षाबंधन — राखी पूजन",
    type: "हिन्दू",
    icon: "🪢",
  },
  {
    date: "20 अगस्त 2026",
    event: "जन्माष्टमी — कृष्ण अभिषेक",
    type: "हिन्दू",
    icon: "🦚",
  },
  {
    date: "25 अगस्त 2026",
    event: "गणेश चतुर्थी — गणेश स्थापना",
    type: "हिन्दू",
    icon: "🐘",
  },
  {
    date: "13 सितंबर 2026",
    event: "पितृ पक्ष आरंभ — श्राद्ध",
    type: "हिन्दू",
    icon: "🙏",
  },
  {
    date: "28 सितंबर 2026",
    event: "शारदीय नवरात्रि — दुर्गा पूजा",
    type: "हिन्दू",
    icon: "🌺",
  },
  {
    date: "10 अक्टूबर 2026",
    event: "दशहरा — विजयादशमी",
    type: "हिन्दू",
    icon: "🏹",
  },
  {
    date: "20 अक्टूबर 2026",
    event: "दीपावली — लक्ष्मी-गणेश पूजन",
    type: "हिन्दू",
    icon: "🪔",
  },
  {
    date: "21 अक्टूबर 2026",
    event: "काली पूजा (दीपावली रात)",
    type: "हिन्दू",
    icon: "🌑",
  },
  {
    date: "5 नवंबर 2026",
    event: "देव उठानी एकादशी — सत्यनारायण",
    type: "हिन्दू",
    icon: "🌺",
  },
  {
    date: "24 नवंबर 2026",
    event: "गुरु नानक जयंती — अरदास",
    type: "सिख",
    icon: "🙏",
  },
  {
    date: "7 दिसंबर 2026",
    event: "मोक्षदा एकादशी — विष्णु पूजन",
    type: "हिन्दू",
    icon: "🔱",
  },
];

const EVENT_TYPE_COLORS: Record<string, string> = {
  हिन्दू: "oklch(0.68 0.20 48)",
  जैन: "oklch(0.55 0.18 145)",
  सिख: "oklch(0.55 0.16 220)",
  सार्वजनिक: "oklch(0.60 0.10 280)",
};

const VIDEO_DARSHAN = [
  {
    id: "somnath",
    title: "Somnath Mandir Aarti",
    temple: "Somnath, Gujarat",
    type: "Live Aarti",
    icon: "🔱",
    thumb: "https://img.youtube.com/vi/7g3l2VHqGl4/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=7g3l2VHqGl4",
    timing: "प्रतिदिन 7:00 AM, 12:00 PM, 7:00 PM",
  },
  {
    id: "kashi",
    title: "Kashi Vishwanath Aarti",
    temple: "Varanasi, Uttar Pradesh",
    type: "Ganga Aarti",
    icon: "🕉️",
    thumb: "https://img.youtube.com/vi/L2YCCVBXoG0/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=L2YCCVBXoG0",
    timing: "प्रतिदिन सायं 7:00 PM (Ganga Aarti)",
  },
  {
    id: "tirupati",
    title: "Tirupati Balaji Darshan",
    temple: "Tirupati, Andhra Pradesh",
    type: "Venkateswara Darshan",
    icon: "🙏",
    thumb: "https://img.youtube.com/vi/r8Hq5j5X8Ow/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=r8Hq5j5X8Ow",
    timing: "प्रतिदिन 5:30 AM – 10:00 PM",
  },
  {
    id: "shirdi",
    title: "Shirdi Sai Baba Aarti",
    temple: "Shirdi, Maharashtra",
    type: "Kakad Aarti / Dhup Aarti",
    icon: "✨",
    thumb: "https://img.youtube.com/vi/9IFPJhJEoQE/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=9IFPJhJEoQE",
    timing: "प्रतिदिन 5:15 AM, 12:00 PM, 8:45 PM",
  },
];

function VideoDarshanSection() {
  return (
    <section
      className="rounded-2xl p-6"
      style={{
        background: "oklch(0.55 0.16 220 / 0.04)",
        border: "1px solid oklch(0.55 0.16 220 / 0.15)",
      }}
      data-ocid="temple.video_darshan.section"
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "oklch(0.55 0.16 220 / 0.12)" }}
        >
          <Video
            className="h-5 w-5"
            style={{ color: "oklch(0.55 0.16 220)" }}
          />
        </div>
        <div>
          <h2
            className="font-heading text-xl font-bold"
            style={{ color: "oklch(0.25 0.10 30)" }}
          >
            Video Darshan | वीडियो दर्शन
          </h2>
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.55 0.06 50)" }}
          >
            Watch live and recorded pujas from temples across India
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VIDEO_DARSHAN.map((v) => (
          <a
            key={v.id}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl overflow-hidden flex flex-col transition-all hover:scale-[1.02] hover:shadow-lg"
            style={{
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              background: "oklch(0.99 0.008 80)",
            }}
            data-ocid={`temple.video_darshan.card.${v.id}`}
          >
            {/* Thumbnail */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={v.thumb}
                alt={v.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/generated/puja-banner.dim_1200x400.png";
                }}
              />
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "oklch(0.55 0.16 220 / 0.9)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-5 h-5 ml-0.5"
                    role="img"
                    aria-hidden="true"
                  >
                    <title>Play video</title>
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
              <div
                className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-heading font-semibold"
                style={{
                  background: "oklch(0.55 0.16 220 / 0.9)",
                  color: "white",
                }}
              >
                {v.type}
              </div>
            </div>

            {/* Info */}
            <div className="p-3 flex-1 flex flex-col">
              <h3
                className="font-heading font-bold text-sm mb-1 leading-snug"
                style={{ color: "oklch(0.25 0.08 25)" }}
              >
                {v.icon} {v.title}
              </h3>
              <div className="flex items-start gap-1.5 mb-2">
                <MapPin
                  className="h-3 w-3 shrink-0 mt-0.5"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                />
                <span
                  className="text-xs font-body"
                  style={{ color: "oklch(0.55 0.06 50)" }}
                >
                  {v.temple}
                </span>
              </div>
              <div className="flex items-start gap-1.5 mb-3">
                <Clock
                  className="h-3 w-3 shrink-0 mt-0.5"
                  style={{ color: "oklch(0.55 0.08 45)" }}
                />
                <span
                  className="text-xs font-body"
                  style={{ color: "oklch(0.55 0.06 50)" }}
                >
                  {v.timing}
                </span>
              </div>
              <div
                className="mt-auto flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-heading font-semibold"
                style={{
                  background: "oklch(0.55 0.16 220 / 0.1)",
                  color: "oklch(0.40 0.14 220)",
                }}
              >
                <ExternalLink className="h-3 w-3" />
                Watch Now
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function TempleServices() {
  const [activeTab, setActiveTab] = useState("pujas");

  return (
    <div>
      {/* Banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "280px" }}
      >
        <img
          src="/assets/generated/puja-banner.dim_1200x400.png"
          alt="Temple Services"
          className="w-full h-72 object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.75))",
          }}
        >
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🛕 पवित्र पूजा सेवाएं
          </h1>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            Book Sacred Puja Ceremonies — घर या मंदिर में, Online Video Darshan
            सहित
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className="w-full max-w-3xl mx-auto grid grid-cols-5 mb-10 h-auto p-1 rounded-xl"
            style={{ background: "oklch(0.22 0.08 22)" }}
          >
            {[
              { value: "pujas", label: "🛕 पूजा सूची" },
              { value: "booking", label: "📅 बुकिंग" },
              { value: "events", label: "📆 कैलेंडर" },
              { value: "chadhava", label: "🌸 चढ़ावा" },
              { value: "aarti", label: "🪔 आरती" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="font-heading text-xs font-semibold py-2 rounded-lg data-[state=active]:text-white transition-all"
                style={{ color: "oklch(0.70 0.04 60)" }}
                data-ocid={`temple.tab.${tab.value}`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Puja Services Grid */}
          <TabsContent value="pujas">
            <div className="mb-6 text-center">
              <h2
                className="font-heading text-2xl font-bold mb-2"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                उपलब्ध पूजा सेवाएं
              </h2>
              <p className="font-body text-muted-foreground">
                {PUJA_SERVICES.length} पूजाएं उपलब्ध — विधिपूर्वक, अनुभवी पुजारियों
                द्वारा
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {PUJA_SERVICES.map((puja) => (
                <div
                  key={puja.id}
                  className="rounded-2xl p-5 flex flex-col"
                  style={{
                    background: "oklch(0.99 0.008 80)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                    boxShadow: "0 1px 6px oklch(0.68 0.20 48 / 0.06)",
                  }}
                  data-ocid={`temple.puja.card.${puja.id}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{puja.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-heading font-bold text-base"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        {puja.hindi}
                      </h3>
                      <p
                        className="font-body text-xs"
                        style={{ color: "oklch(0.55 0.04 50)" }}
                      >
                        {puja.name}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mb-3 flex-1">
                    {puja.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: "oklch(0.68 0.20 48)" }}
                      />
                      <span
                        className="text-xs font-body"
                        style={{ color: "oklch(0.50 0.06 45)" }}
                      >
                        {puja.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-heading font-bold"
                        style={{ color: "oklch(0.68 0.20 48)" }}
                      >
                        {puja.cost}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin
                        className="h-3.5 w-3.5 shrink-0 mt-0.5"
                        style={{ color: "oklch(0.55 0.16 220)" }}
                      />
                      <span
                        className="text-xs font-body"
                        style={{ color: "oklch(0.50 0.06 45)" }}
                      >
                        {puja.occasion}
                      </span>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div
                    className="p-2 rounded-lg mb-3"
                    style={{ background: "oklch(0.68 0.20 48 / 0.07)" }}
                  >
                    <p
                      className="text-xs font-body"
                      style={{ color: "oklch(0.45 0.10 40)" }}
                    >
                      ✨ {puja.benefits}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("booking")}
                    className="w-full py-2 rounded-full font-heading text-xs font-semibold transition-all hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                      color: "white",
                    }}
                    data-ocid={`temple.puja.book_button.${puja.id}`}
                  >
                    🙏 बुकिंग करें
                  </button>
                </div>
              ))}
            </div>

            {/* Video Darshan Section */}
            <VideoDarshanSection />
          </TabsContent>

          {/* Booking Form Tab — enhanced PujaBookingForm */}
          <TabsContent value="booking">
            <div className="mb-6 text-center">
              <h2
                className="font-heading text-2xl font-bold mb-2"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                📅 पूजा बुकिंग
              </h2>
              <p className="font-body text-muted-foreground text-sm">
                पूजा बुक करें — दान/भेट, संकल्प, और शुभ तिथि चुनें
              </p>
            </div>
            <PujaBookingForm />

            {/* Prasad Delivery section below booking */}
            <div className="mt-10">
              <div className="text-center mb-5">
                <h3
                  className="font-heading text-xl font-bold"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  🌸 प्रसाद डिलीवरी
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Temple prasad delivered to your doorstep
                </p>
              </div>
              <PrasadDeliveryForm />
            </div>
          </TabsContent>

          {/* Event Calendar Tab */}
          <TabsContent value="events">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <h2
                  className="font-heading text-2xl font-bold mb-2"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  <Calendar
                    className="h-6 w-6 inline mr-2"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  />
                  पूजा पर्व कैलेंडर 2026
                </h2>
                <p className="font-body text-muted-foreground text-sm">
                  आगामी विशेष पूजा तिथियां — अभी बुकिंग करें
                </p>
              </div>

              <div className="space-y-3">
                {UPCOMING_EVENTS.map((ev) => (
                  <div
                    key={ev.event}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{
                      background: "oklch(0.99 0.008 80)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                    }}
                    data-ocid={`temple.event.row.${ev.date.replace(/\s/g, "_")}`}
                  >
                    <div
                      className="shrink-0 w-16 h-14 rounded-lg flex flex-col items-center justify-center text-center"
                      style={{ background: "oklch(0.68 0.20 48 / 0.1)" }}
                    >
                      <span className="text-lg">{ev.icon}</span>
                      <span
                        className="text-xs font-heading font-bold"
                        style={{ color: "oklch(0.45 0.14 40)" }}
                      >
                        {ev.date.split(" ")[0]}
                      </span>
                      <span
                        className="text-xs font-body"
                        style={{ color: "oklch(0.55 0.06 50)" }}
                      >
                        {ev.date.split(" ").slice(1).join(" ")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-heading font-semibold text-sm truncate"
                        style={{ color: "oklch(0.25 0.08 25)" }}
                      >
                        {ev.event}
                      </p>
                      <Badge
                        className="text-xs mt-1"
                        style={{
                          background: `${EVENT_TYPE_COLORS[ev.type] ?? "oklch(0.60 0.10 280)"}/15`,
                          color:
                            EVENT_TYPE_COLORS[ev.type] ??
                            "oklch(0.60 0.10 280)",
                        }}
                      >
                        {ev.type}
                      </Badge>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("booking")}
                      className="shrink-0 px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                        color: "white",
                      }}
                      data-ocid={`temple.event.book_button.${ev.date.replace(/\s/g, "_")}`}
                    >
                      बुकिंग
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Chadhava Tab */}
          <TabsContent value="chadhava">
            <VirtualChadhava />
          </TabsContent>

          {/* Aarti Tab */}
          <TabsContent value="aarti">
            <VirtualAarti />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
