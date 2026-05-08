import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Loader2, RefreshCcw, Shield, Star, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import { useCreateStripeSession } from "../hooks/useQueries";

const trustBadges = [
  { icon: RefreshCcw, en: "7-day money-back", hi: "7 दिन रिफंड" },
  { icon: Zap, en: "Cancel anytime", hi: "कभी भी रद्द करें" },
  { icon: Shield, en: "Instant access", hi: "तत्काल पहुँच" },
  { icon: Star, en: "4.8/5 from 1,247 seekers", hi: "4.8/5 · 1,247 साधकों से" },
];

const freeFeatures = [
  { en: "1 conversation with Krishna", hi: "कृष्ण से 1 वार्तालाप" },
  { en: "5 personalized messages", hi: "5 व्यक्तिगत संदेश" },
  { en: "Nakshatra-based insights", hi: "नक्षत्र आधारित अंतर्दृष्टि" },
  { en: "No credit card required", hi: "क्रेडिट कार्ड की जरूरत नहीं" },
];

const ekPrashnFeatures = [
  { en: "1 deep conversation (20 messages)", hi: "1 गहरी बातचीत (20 संदेश)" },
  { en: "Personalized birth-chart guidance", hi: "व्यक्तिगत कुंडली मार्गदर्शन" },
  { en: "Scriptural remedies revealed", hi: "शास्त्रीय उपाय बताए जाएंगे" },
  { en: "Chat saved forever", hi: "चैट हमेशा के लिए सुरक्षित" },
];

const maasikFeatures = [
  { en: "Unlimited conversations", hi: "असीमित वार्तालाप" },
  { en: "Deep, multi-turn dialogues", hi: "गहरे, बहु-चरण संवाद" },
  { en: "Priority responses", hi: "प्राथमिकता प्रतिक्रिया" },
  { en: "Chat history & bookmarks", hi: "चैट इतिहास और बुकमार्क" },
  { en: "Cancel anytime", hi: "कभी भी रद्द करें" },
];

const vivahFeatures = [
  { en: "Comprehensive kundali analysis", hi: "व्यापक कुंडली विश्लेषण" },
  { en: "Marriage timing & compatibility", hi: "विवाह समय और अनुकूलता" },
  { en: "Vedic remedies for marriage", hi: "विवाह के लिए वैदिक उपाय" },
  { en: "Detailed written guidance", hi: "विस्तृत लिखित मार्गदर्शन" },
];

const paymentMethods = [
  { label: "UPI", emoji: "📱" },
  { label: "GPay", emoji: "🅖" },
  { label: "PhonePe", emoji: "💜" },
  { label: "Paytm", emoji: "🔵" },
  { label: "Visa", emoji: "💳" },
  { label: "Mastercard", emoji: "🔴" },
  { label: "RuPay", emoji: "🇮🇳" },
  { label: "Net Banking", emoji: "🏦" },
];

const faqItems = [
  {
    q: { en: "What plans are available?", hi: "कौन सी योजनाएं उपलब्ध हैं?" },
    a: {
      en: "Three plans: Free Trial (5 messages), Ek Prashn (₹20 per chat, 20 messages), and Maasik Seva (₹4,999/year for unlimited guidance). One-time specialty reports like Vivah Margdarshan (₹999) are also available.",
      hi: "तीन योजनाएं: निःशुल्क परीक्षण (5 संदेश), एक प्रश्न (₹20 प्रति चैट, 20 संदेश), और मासिक सेवा (₹4,999/वर्ष असीमित मार्गदर्शन)। विवाह मार्गदर्शन (₹999) जैसी एकमुश्त विशेष रिपोर्ट भी उपलब्ध हैं।",
    },
  },
  {
    q: { en: "Is there a money-back guarantee?", hi: "क्या मनी-बैक गारंटी है?" },
    a: {
      en: "Yes. If Krishna's guidance doesn't feel personal and useful within 7 days of any paid plan, email us — we'll refund you in full. No questions asked.",
      hi: "हाँ। यदि कृष्ण का मार्गदर्शन किसी भी भुगतान योजना के 7 दिनों के भीतर व्यक्तिगत और उपयोगी नहीं लगता, तो हमें ईमेल करें — हम पूरी राशि वापस करेंगे।",
    },
  },
  {
    q: { en: "How does payment work?", hi: "भुगतान कैसे काम करता है?" },
    a: {
      en: "All payments are processed securely via Razorpay. We accept UPI, GPay, PhonePe, Paytm, Visa, Mastercard, RuPay, and Net Banking. PCI-DSS compliant and fully encrypted.",
      hi: "सभी भुगतान Razorpay के माध्यम से सुरक्षित रूप से संसाधित किए जाते हैं। हम UPI, GPay, PhonePe, Paytm, Visa, Mastercard, RuPay और Net Banking स्वीकार करते हैं।",
    },
  },
  {
    q: {
      en: "Can I cancel my subscription?",
      hi: "क्या मैं अपनी सदस्यता रद्द कर सकता हूँ?",
    },
    a: {
      en: "Yes, cancel anytime from your account settings. Your access continues until the end of the billing period. No cancellation fees.",
      hi: "हाँ, अपनी खाता सेटिंग से कभी भी रद्द करें। बिलिंग अवधि के अंत तक आपकी पहुँच जारी रहती है।",
    },
  },
  {
    q: { en: "Is my conversation private?", hi: "क्या मेरी बातचीत निजी है?" },
    a: {
      en: "Completely. All chats are encrypted and tied only to your account. No one else can access your conversations — not even our team.",
      hi: "बिल्कुल। सभी चैट एन्क्रिप्टेड हैं और केवल आपके खाते से जुड़ी हैं। हमारी टीम भी आपकी बातचीत तक नहीं पहुँच सकती।",
    },
  },
  {
    q: { en: "What can I ask about?", hi: "मैं किसके बारे में पूछ सकता हूँ?" },
    a: {
      en: "Anything rooted in your life — career, relationships, marriage, health timing, spiritual path, anxiety, life purpose, and more. Krishna's answers are grounded in the Bhagavad Gita and classical Vedic astrology.",
      hi: "आपके जीवन से जुड़ी कोई भी बात — करियर, रिश्ते, विवाह, स्वास्थ्य, आध्यात्मिक मार्ग, चिंता, जीवन उद्देश्य आदि। कृष्ण के उत्तर भगवद गीता और वैदिक ज्योतिष पर आधारित हैं।",
    },
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly",
  );
  const { language } = useLanguage();
  const hi = language === "hi";
  const createStripeSession = useCreateStripeSession();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  async function handleStripe(tier: string, amount: number, label: string) {
    setLoadingTier(tier);
    try {
      const url = await createStripeSession.mutateAsync({
        productType: "pricing-tier",
        amount,
        metadata: label,
      });
      window.location.href = url;
    } catch {
      toast.error(
        hi
          ? "भुगतान में समस्या आई, पुनः प्रयास करें"
          : "Payment failed, please try again",
      );
    } finally {
      setLoadingTier(null);
    }
  }

  const handleEkPrashn = () =>
    handleStripe("ek-prashn", 20, "Ek Prashn - Single Question");

  const handleMaasik = () => {
    const price = billingCycle === "yearly" ? 4999 : 499;
    const label =
      billingCycle === "yearly"
        ? "Maasik - Yearly Plan"
        : "Maasik - Monthly Plan";
    handleStripe("maasik", price, label);
  };

  const handleVivah = () =>
    handleStripe("vivah", 999, "Vivah - Marriage Consultation");

  const maasikPrice = billingCycle === "yearly" ? "₹4,999/year" : "₹499/month";
  const maasikSub =
    billingCycle === "yearly"
      ? "Just ₹417/mo · billed yearly"
      : "Billed monthly";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section
        className="py-16 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 60%, oklch(0.22 0.06 25) 100%)",
        }}
        data-ocid="pricing.section"
      >
        <p
          className="text-sm font-body uppercase tracking-widest mb-3"
          style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
        >
          ॐ
        </p>
        <h1
          className="font-decorative text-3xl md:text-5xl font-bold mb-4"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          {hi ? "अपना मार्ग चुनें" : "Choose Your Path"}
        </h1>
        <p
          className="font-body text-base md:text-lg max-w-xl mx-auto mb-8"
          style={{ color: "oklch(0.88 0.06 75 / 0.8)" }}
        >
          {hi
            ? "निःशुल्क शुरू करें। तभी अपग्रेड करें जब कृष्ण का मार्गदर्शन आपको मूल्यवान लगे।"
            : "Start free. Upgrade only when Krishna's guidance proves valuable to you."}
        </p>

        {/* Trust badges */}
        <div
          className="flex flex-wrap justify-center gap-3"
          data-ocid="pricing.trust_badges"
        >
          {trustBadges.map(({ icon: Icon, en, hi: hiLabel }) => (
            <span
              key={en}
              className="flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-full border"
              style={{
                background: "oklch(0.78 0.14 75 / 0.08)",
                borderColor: "oklch(0.78 0.14 75 / 0.25)",
                color: "oklch(0.88 0.06 75)",
              }}
            >
              <Icon
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.78 0.14 75)" }}
              />
              {hi ? hiLabel : en}
            </span>
          ))}
        </div>
      </section>

      {/* Billing Toggle */}
      <section
        className="py-8 px-4 flex justify-center"
        data-ocid="pricing.billing_toggle"
      >
        <div
          className="inline-flex rounded-full p-1 gap-1"
          style={{
            background: "oklch(0.22 0.06 28)",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className="px-6 py-2 rounded-full text-sm font-heading font-semibold transition-all"
            style={
              billingCycle === "monthly"
                ? {
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                  }
                : { color: "oklch(0.88 0.06 75 / 0.7)" }
            }
            data-ocid="pricing.monthly_tab"
          >
            {hi ? "मासिक" : "Monthly"}
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("yearly")}
            className="px-6 py-2 rounded-full text-sm font-heading font-semibold transition-all flex items-center gap-2"
            style={
              billingCycle === "yearly"
                ? {
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                  }
                : { color: "oklch(0.88 0.06 75 / 0.7)" }
            }
            data-ocid="pricing.yearly_tab"
          >
            {hi ? "वार्षिक" : "Yearly"}
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold"
              style={{
                background: "oklch(0.62 0.16 120 / 0.25)",
                color: "oklch(0.62 0.16 120)",
                border: "1px solid oklch(0.62 0.16 120 / 0.4)",
              }}
            >
              {hi ? "₹989 बचाएं" : "Save ₹989"}
            </span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section
        className="py-4 px-4 max-w-5xl mx-auto"
        data-ocid="pricing.tiers_section"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Trial */}
          <Card
            className="relative flex flex-col p-6 border"
            style={{
              background: "oklch(0.22 0.06 28)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
            }}
            data-ocid="pricing.free_card"
          >
            <p
              className="text-xs font-body uppercase tracking-widest mb-1"
              style={{ color: "oklch(0.78 0.14 75 / 0.6)" }}
            >
              {hi ? "निःशुल्क" : "Free Trial"}
            </p>
            <h2
              className="font-decorative text-2xl font-bold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {hi ? "निःशुल्क" : "Free"}
            </h2>
            <p
              className="text-sm font-body mb-6"
              style={{ color: "oklch(0.70 0.04 60)" }}
            >
              {hi ? "कृष्ण के साथ यात्रा शुरू करें" : "Start your journey with Krishna"}
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map(({ en, hi: hiLabel }) => (
                <li
                  key={en}
                  className="flex items-start gap-2 text-sm font-body"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  <Check
                    className="h-4 w-4 shrink-0 mt-0.5"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  />
                  {hi ? hiLabel : en}
                </li>
              ))}
            </ul>
            <Button
              type="button"
              variant="outline"
              className="w-full font-heading font-semibold"
              style={{
                borderColor: "oklch(0.68 0.20 48 / 0.6)",
                color: "oklch(0.78 0.14 75)",
                background: "transparent",
              }}
              onClick={() => {
                window.location.href = "/ask-krishna";
              }}
            >
              {hi ? "निःशुल्क शुरू करें" : "Start Free"}
            </Button>
          </Card>

          {/* Ek Prashn */}
          <Card
            className="relative flex flex-col p-6 border"
            style={{
              background: "oklch(0.22 0.06 28)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
            }}
            data-ocid="pricing.ek_prashn_card"
          >
            <p
              className="text-xs font-body uppercase tracking-widest mb-1"
              style={{ color: "oklch(0.78 0.14 75 / 0.6)" }}
            >
              {hi ? "एक प्रश्न" : "Ek Prashn"}
            </p>
            <h2
              className="font-decorative text-2xl font-bold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              ₹20
            </h2>
            <p
              className="text-xs font-body mb-1"
              style={{ color: "oklch(0.70 0.04 60)" }}
            >
              {hi ? "प्रति चैट" : "per chat"}
            </p>
            <p
              className="text-sm font-body mb-6"
              style={{ color: "oklch(0.70 0.04 60)" }}
            >
              {hi ? "कृष्ण से एक गहरा प्रश्न पूछें" : "Ask Krishna one deep question"}
            </p>
            <ul className="space-y-3 mb-6 flex-1">
              {ekPrashnFeatures.map(({ en, hi: hiLabel }) => (
                <li
                  key={en}
                  className="flex items-start gap-2 text-sm font-body"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  <Check
                    className="h-4 w-4 shrink-0 mt-0.5"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  />
                  {hi ? hiLabel : en}
                </li>
              ))}
            </ul>
            <Button
              type="button"
              className="w-full font-heading font-semibold mb-2"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
              onClick={handleEkPrashn}
              disabled={loadingTier === "ek-prashn"}
              data-ocid="pricing.ek_prashn_cta"
            >
              {loadingTier === "ek-prashn" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {hi ? "भुगतान प्रक्रिया में..." : "Processing..."}
                </>
              ) : hi ? (
                "अभी खरीदें"
              ) : (
                "Buy Now"
              )}
            </Button>
            <p
              className="text-center text-xs"
              style={{ color: "oklch(0.60 0.04 55)" }}
            >
              {hi
                ? "7 दिन मनी-बैक · कभी भी रद्द करें"
                : "7-day money-back · Cancel anytime"}
            </p>
          </Card>

          {/* Maasik Seva — Most Popular */}
          <Card
            className="relative flex flex-col p-6 border"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.24 0.08 28) 0%, oklch(0.20 0.06 25) 100%)",
              borderColor: "oklch(0.68 0.20 48 / 0.5)",
              boxShadow: "0 0 32px oklch(0.68 0.20 48 / 0.15)",
            }}
            data-ocid="pricing.maasik_card"
          >
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span
                className="text-xs font-heading font-bold px-4 py-1 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
              >
                {hi ? "★ सबसे लोकप्रिय" : "★ Most Popular"}
              </span>
            </div>
            <p
              className="text-xs font-body uppercase tracking-widest mb-1 mt-2"
              style={{ color: "oklch(0.78 0.14 75 / 0.6)" }}
            >
              {hi ? "मासिक सेवा" : "Maasik Seva"}
            </p>
            <h2
              className="font-decorative text-2xl font-bold mb-0.5"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {maasikPrice}
            </h2>
            <p
              className="text-xs font-body mb-1"
              style={{ color: "oklch(0.62 0.16 120)" }}
            >
              {hi
                ? billingCycle === "yearly"
                  ? "सिर्फ ₹417/माह · वार्षिक बिल"
                  : "मासिक बिल"
                : maasikSub}
            </p>
            <p
              className="text-sm font-body mb-6"
              style={{ color: "oklch(0.70 0.04 60)" }}
            >
              {hi ? "असीमित मासिक मार्गदर्शन" : "Unlimited monthly guidance"}
            </p>
            <ul className="space-y-3 mb-6 flex-1">
              {maasikFeatures.map(({ en, hi: hiLabel }) => (
                <li
                  key={en}
                  className="flex items-start gap-2 text-sm font-body"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  <Check
                    className="h-4 w-4 shrink-0 mt-0.5"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  />
                  {hi ? hiLabel : en}
                </li>
              ))}
            </ul>
            <Button
              type="button"
              className="w-full font-heading font-semibold mb-2 text-sm"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
                color: "oklch(0.18 0.04 25)",
                fontWeight: 700,
              }}
              onClick={handleMaasik}
              disabled={loadingTier === "maasik"}
              data-ocid="pricing.maasik_cta"
            >
              {loadingTier === "maasik" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {hi ? "भुगतान प्रक्रिया में..." : "Processing..."}
                </>
              ) : billingCycle === "yearly" ? (
                hi ? (
                  "वार्षिक सदस्यता लें"
                ) : (
                  "Subscribe Yearly"
                )
              ) : hi ? (
                "मासिक सदस्यता लें"
              ) : (
                "Subscribe Monthly"
              )}
            </Button>
            <p
              className="text-center text-xs"
              style={{ color: "oklch(0.60 0.04 55)" }}
            >
              {hi
                ? "7 दिन मनी-बैक · कभी भी रद्द करें"
                : "7-day money-back · Cancel anytime"}
            </p>
          </Card>
        </div>
      </section>

      {/* Payment Methods */}
      <section
        className="py-12 px-4"
        style={{ background: "oklch(0.96 0.01 80)" }}
        data-ocid="pricing.payment_section"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {paymentMethods.map(({ label, emoji }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-sm font-body px-4 py-2 rounded-lg border bg-card"
                style={{ borderColor: "oklch(0.85 0.04 70)" }}
              >
                <span>{emoji}</span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.30 0.06 30)" }}
                >
                  {label}
                </span>
              </span>
            ))}
          </div>
          <div
            className="flex flex-wrap justify-center gap-4 text-xs font-body"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" />{" "}
              {hi ? "Stripe एन्क्रिप्टेड" : "Stripe encrypted"}
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-3 w-3" /> PCI-DSS compliant
            </span>
            <span className="flex items-center gap-1">
              <RefreshCcw className="h-3 w-3" />{" "}
              {hi ? "7 दिन मनी-बैक" : "7-day money-back"}
            </span>
          </div>
        </div>
      </section>

      {/* Specialty Reports */}
      <section className="py-16 px-4" data-ocid="pricing.specialty_section">
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs font-body uppercase tracking-widest text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            {hi ? "विशेष रिपोर्ट" : "Specialty Reports"}
          </p>
          <h2
            className="font-decorative text-2xl md:text-3xl text-center font-bold mb-3"
            style={{ color: "oklch(0.22 0.08 28)" }}
          >
            {hi ? "एकमुश्त गहरी रीडिंग" : "One-time Deep-dive Readings"}
          </h2>
          <p
            className="text-center text-sm font-body mb-8"
            style={{ color: "oklch(0.48 0.04 40)" }}
          >
            {hi
              ? "जीवन के विशेष पलों के लिए समर्पित मार्गदर्शन"
              : "For specific life moments that deserve dedicated guidance."}
          </p>

          <Card
            className="p-8 border"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.06 28), oklch(0.20 0.08 22))",
              borderColor: "oklch(0.78 0.14 75 / 0.3)",
            }}
            data-ocid="pricing.vivah_card"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <p
                  className="text-xs font-body uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.78 0.14 75 / 0.6)" }}
                >
                  {hi ? "विवाह मार्गदर्शन" : "Vivah Margdarshan"}
                </p>
                <h3
                  className="font-decorative text-xl font-bold mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {hi ? "विवाह मार्गदर्शन" : "Vivah Margdarshan"}
                </h3>
                <p
                  className="text-sm font-body mb-4"
                  style={{ color: "oklch(0.70 0.04 60)" }}
                >
                  {hi
                    ? "संपूर्ण विवाह मार्गदर्शन और कुंडली मिलान"
                    : "Complete marriage guidance & kundli matching"}
                </p>
                <ul className="space-y-2.5">
                  {vivahFeatures.map(({ en, hi: hiLabel }) => (
                    <li
                      key={en}
                      className="flex items-start gap-2 text-sm font-body"
                      style={{ color: "oklch(0.88 0.06 75)" }}
                    >
                      <Check
                        className="h-4 w-4 shrink-0 mt-0.5"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      />
                      {hi ? hiLabel : en}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:text-right flex flex-col items-start md:items-end gap-3">
                <div>
                  <p
                    className="text-3xl font-decorative font-bold"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    ₹999
                  </p>
                  <p
                    className="text-xs font-body"
                    style={{ color: "oklch(0.60 0.04 55)" }}
                  >
                    {hi ? "एकमुश्त" : "one-time"}
                  </p>
                </div>
                <Button
                  type="button"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                  }}
                  className="font-heading font-semibold"
                  onClick={handleVivah}
                  disabled={loadingTier === "vivah"}
                  data-ocid="pricing.vivah_cta"
                >
                  {loadingTier === "vivah" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {hi ? "भुगतान प्रक्रिया में..." : "Processing..."}
                    </>
                  ) : hi ? (
                    "यह रीडिंग प्राप्त करें"
                  ) : (
                    "Get this reading"
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Money-back Guarantee */}
      <section
        className="py-12 px-4"
        style={{ background: "oklch(0.96 0.01 80)" }}
        data-ocid="pricing.guarantee_section"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              background: "oklch(0.62 0.16 120 / 0.12)",
              border: "2px solid oklch(0.62 0.16 120 / 0.3)",
            }}
          >
            <Shield
              className="h-7 w-7"
              style={{ color: "oklch(0.62 0.16 120)" }}
            />
          </div>
          <h2
            className="font-decorative text-xl md:text-2xl font-bold mb-3"
            style={{ color: "oklch(0.22 0.08 28)" }}
          >
            {hi ? "7 दिन मनी-बैक गारंटी" : "7-Day Money-Back Guarantee"}
          </h2>
          <p
            className="font-body text-sm md:text-base max-w-lg mx-auto"
            style={{ color: "oklch(0.40 0.04 35)" }}
          >
            {hi
              ? "यदि कृष्ण का मार्गदर्शन किसी भी भुगतान योजना के 7 दिनों के भीतर व्यक्तिगत और उपयोगी नहीं लगता, तो हमें ईमेल करें — हम पूरी राशि वापस करेंगे। बिना कोई सवाल पूछे।"
              : "If Krishna's guidance does not feel personal and useful within 7 days of any paid plan, email us — we will refund you in full. No questions asked."}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-16 px-4 max-w-2xl mx-auto"
        data-ocid="pricing.faq_section"
      >
        <h2
          className="font-decorative text-2xl text-center font-bold mb-8"
          style={{ color: "oklch(0.22 0.08 28)" }}
        >
          {hi ? "प्रश्न" : "Questions"}
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={item.q.en}
              value={`faq-${i}`}
              className="border rounded-xl px-4"
              style={{ borderColor: "oklch(0.85 0.04 70)" }}
              data-ocid={`pricing.faq.item.${i + 1}`}
            >
              <AccordionTrigger
                className="text-sm font-heading font-semibold text-left hover:no-underline py-4"
                style={{ color: "oklch(0.25 0.06 30)" }}
              >
                {hi ? item.q.hi : item.q.en}
              </AccordionTrigger>
              <AccordionContent
                className="text-sm font-body pb-4"
                style={{ color: "oklch(0.45 0.04 40)" }}
              >
                {hi ? item.a.hi : item.a.en}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Separator style={{ background: "oklch(0.85 0.04 70)" }} />
    </div>
  );
}
