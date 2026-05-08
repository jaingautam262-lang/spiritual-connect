import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Mail,
  Send,
  Star,
} from "lucide-react";
import { useState } from "react";
import { astroReports } from "../data/reportData";
import { useLanguage } from "../hooks/useLanguage";
import { useCreateStripeSession } from "../hooks/useQueries";

const RELATED_LIMIT = 3;

export default function ReportDetail() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const { language } = useLanguage();
  const navigate = useNavigate();
  const createStripeSession = useCreateStripeSession();

  const [form, setForm] = useState({
    name: "",
    dob: "",
    tob: "",
    pob: "",
    email: "",
    whatsapp: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const report = astroReports.find((r) => r.slug === slug);
  const related = report
    ? astroReports
        .filter((r) => r.slug !== slug && r.category === report.category)
        .slice(0, RELATED_LIMIT)
    : [];

  async function handleBuy(e: React.FormEvent) {
    e.preventDefault();
    if (!report) return;
    setLoading(true);
    try {
      const metadata = JSON.stringify({ ...form, reportTitle: report.title });
      const url = await createStripeSession.mutateAsync({
        productType: "astro_report",
        amount: report.price,
        metadata,
      });
      if (url) {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.click();
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            {language === "hi" ? "रिपोर्ट नहीं मिली" : "Report not found"}
          </p>
          <Button
            className="mt-4"
            onClick={() => void navigate({ to: "/astro-reports" })}
          >
            {language === "hi" ? "वापस जाएं" : "Back to Reports"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="spiritual-gradient py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            type="button"
            data-ocid="report_detail.back_button"
            onClick={() => void navigate({ to: "/astro-reports" })}
            className="flex items-center gap-2 text-sm mb-6 hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.85 0.02 80)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "hi" ? "रिपोर्ट्स पर वापस" : "Back to Reports"}
          </button>
          <Badge className="mb-3 bg-muted/20 text-white/80 border-white/20">
            {report.category}
          </Badge>
          <h1
            className="font-heading text-2xl md:text-4xl font-bold mb-3"
            style={{ color: "oklch(0.99 0.005 80)" }}
          >
            {language === "hi" && report.titleHi
              ? report.titleHi
              : report.title}
          </h1>
          <div className="flex items-center gap-4">
            <span
              className="text-3xl font-heading font-bold"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {report.priceDisplay}
            </span>
            <span
              className="text-sm flex items-center gap-1"
              style={{ color: "oklch(0.85 0.02 80)" }}
            >
              <Clock className="w-4 h-4" />
              {report.deliveryTime}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Details */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Description */}
            <section>
              <p className="text-foreground leading-relaxed">
                {report.description}
              </p>
            </section>

            {/* What You Get */}
            <section className="bg-muted/30 border border-border rounded-xl p-6">
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {language === "hi" ? "आपको क्या मिलेगा" : "What You Get"}
              </h2>
              <ul className="space-y-3">
                {report.whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 mt-0.5 shrink-0"
                      style={{ color: "oklch(0.65 0.16 140)" }}
                    />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Delivery */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2
                className="font-heading font-bold text-lg mb-3"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {language === "hi" ? "डिलिवरी जानकारी" : "Delivery Information"}
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-center gap-3">
                  <Clock
                    className="w-8 h-8 p-1.5 rounded-lg bg-primary/10"
                    style={{ color: "oklch(0.62 0.18 48)" }}
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {language === "hi" ? "समय" : "Delivery Time"}
                    </p>
                    <p className="font-semibold text-sm">
                      {report.deliveryTime}
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <Mail
                    className="w-8 h-8 p-1.5 rounded-lg bg-primary/10"
                    style={{ color: "oklch(0.62 0.18 48)" }}
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {language === "hi" ? "तरीका" : "Via"}
                    </p>
                    <p className="font-semibold text-sm">
                      {report.deliveryMethod}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sample Preview */}
            {report.sampleIncluded && (
              <section className="bg-muted/20 border border-dashed border-border rounded-xl p-8 text-center">
                <p className="font-heading font-semibold text-muted-foreground">
                  {language === "hi"
                    ? "नमूना रिपोर्ट प्रीव्यू"
                    : "Sample Report Preview"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {language === "hi"
                    ? "खरीद करने के बाद नमूना PDF भेजा जाएगा"
                    : "Sample PDF will be sent with your order"}
                </p>
              </section>
            )}

            {/* FAQ */}
            <section>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {language === "hi"
                  ? "अक्सर पूछे जाने वाले सवाल"
                  : "Frequently Asked Questions"}
              </h2>
              <div className="space-y-3">
                {report.faq.map((item, i) => (
                  <div
                    key={item.q}
                    className="bg-card border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      type="button"
                      data-ocid={`report_detail.faq.${i + 1}`}
                      onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                    >
                      <span className="font-medium text-sm">{item.q}</span>
                      {openFAQ === i ? (
                        <ChevronUp className="w-4 h-4 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 shrink-0" />
                      )}
                    </button>
                    {openFAQ === i && (
                      <div className="px-4 pb-4 text-sm text-muted-foreground">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {language === "hi" ? "ग्राहकों की राय" : "What Customers Say"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {report.testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="bg-card border border-border rounded-xl p-4"
                  >
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: t.rating }, (_, starIdx) => (
                        <Star
                          key={`${t.name}-star-${starIdx}`}
                          className="w-3.5 h-3.5 fill-current"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic mb-2">
                      "{t.review}"
                    </p>
                    <p className="text-xs font-semibold">{t.name}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Reports */}
            {related.length > 0 && (
              <section>
                <h2
                  className="font-heading font-bold text-lg mb-4"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {language === "hi" ? "संबंधित रिपोर्ट" : "Related Reports"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() =>
                        void navigate({
                          to: "/astro-reports/$slug",
                          params: { slug: r.slug },
                        })
                      }
                      className="report-card text-left p-4 hover:border-primary/40 transition-colors"
                    >
                      <p
                        className="font-heading font-semibold text-sm mb-1"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        {r.title}
                      </p>
                      <p
                        className="text-lg font-heading font-bold"
                        style={{ color: "oklch(0.62 0.18 48)" }}
                      >
                        {r.priceDisplay}
                      </p>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Purchase form */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
              <div className="text-center mb-6">
                <p
                  className="text-3xl font-heading font-bold"
                  style={{ color: "oklch(0.62 0.18 48)" }}
                >
                  {report.priceDisplay}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "hi" ? "एक-बार की खरीद" : "One-time purchase"}
                </p>
              </div>

              {submitted ? (
                <div
                  data-ocid="report_detail.success_state"
                  className="text-center py-4 space-y-3"
                >
                  <CheckCircle
                    className="w-12 h-12 mx-auto"
                    style={{ color: "oklch(0.65 0.16 140)" }}
                  />
                  <p className="font-heading font-semibold">
                    {language === "hi" ? "आर्डर मिल गया!" : "Order Received!"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "hi"
                      ? `आपकी रिपोर्ट ${report.deliveryTime} के अंदर ${form.email} और ${form.whatsapp} पर भेजी जाएगी`
                      : `Your report will be sent to ${form.email} and WhatsApp ${form.whatsapp} within ${report.deliveryTime}`}
                  </p>
                </div>
              ) : (
                <form
                  data-ocid="report_detail.purchase_form"
                  onSubmit={(e) => void handleBuy(e)}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="rd-name" className="text-xs">
                      {language === "hi" ? "पूरा नाम" : "Full Name"} *
                    </Label>
                    <Input
                      id="rd-name"
                      data-ocid="report_detail.name_input"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rd-dob" className="text-xs">
                      {language === "hi" ? "जन्म तिथि" : "Date of Birth"} *
                    </Label>
                    <Input
                      id="rd-dob"
                      data-ocid="report_detail.dob_input"
                      type="date"
                      required
                      value={form.dob}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, dob: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rd-tob" className="text-xs">
                      {language === "hi" ? "जन्म समय" : "Time of Birth"}
                    </Label>
                    <Input
                      id="rd-tob"
                      data-ocid="report_detail.tob_input"
                      type="time"
                      value={form.tob}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, tob: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rd-pob" className="text-xs">
                      {language === "hi" ? "जन्म स्थान" : "Place of Birth"} *
                    </Label>
                    <Input
                      id="rd-pob"
                      data-ocid="report_detail.pob_input"
                      required
                      value={form.pob}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, pob: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rd-email" className="text-xs">
                      {language === "hi" ? "ईमेल" : "Email"} *
                    </Label>
                    <Input
                      id="rd-email"
                      data-ocid="report_detail.email_input"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rd-wa" className="text-xs">
                      {language === "hi" ? "व्हाट्सएप नंबर" : "WhatsApp Number"} *
                    </Label>
                    <Input
                      id="rd-wa"
                      data-ocid="report_detail.whatsapp_input"
                      type="tel"
                      required
                      value={form.whatsapp}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, whatsapp: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    data-ocid="report_detail.buy_button"
                    disabled={loading}
                    className="w-full btn-spiritual flex items-center gap-2"
                  >
                    {loading ? (
                      <span data-ocid="report_detail.loading_state">
                        {language === "hi" ? "प्रतीक्षा करें..." : "Processing..."}
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {language === "hi"
                          ? `रिपोर्ट खरीदें ${report.priceDisplay}`
                          : `Buy Report ${report.priceDisplay}`}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
