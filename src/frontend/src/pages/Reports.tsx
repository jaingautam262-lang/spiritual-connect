import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  MessageCircle,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  ENHANCED_REPORTS,
  REPORT_CATEGORIES,
  type ReportCatalog,
} from "../data/reportCatalogData";
import { useCreateReportRequest } from "../hooks/useQueries";

const gold = "oklch(0.68 0.20 48)";
const saffron = "oklch(0.62 0.18 48)";
const cardBg = "oklch(0.99 0.008 80)";
const borderColor = "oklch(0.78 0.14 75 / 0.25)";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="h-3.5 w-3.5"
          style={{ fill: s <= rating ? gold : "none", stroke: gold }}
        />
      ))}
    </span>
  );
}

function ReportDetailModal({
  report,
  onClose,
}: { report: ReportCatalog; onClose: () => void }) {
  const { identity } = useInternetIdentity();
  const createReport = useCreateReportRequest();
  const [delivery, setDelivery] = useState<"whatsapp" | "email">("whatsapp");
  const [whatsapp, setWhatsapp] = useState("");
  const [form, setForm] = useState({ name: "", dob: "", tob: "", pob: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) {
      toast.error("Please login to purchase a report");
      return;
    }
    if (!form.name || !form.dob) {
      toast.error("Please fill required fields");
      return;
    }
    const id = `report-${Date.now()}`;
    try {
      await createReport.mutateAsync({
        id,
        userId: identity.getPrincipal(),
        reportType: report.id,
        name: form.name,
        dob: form.dob,
        tob: form.tob,
        pob: form.pob,
        status: "pending",
        content: "",
        createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setConfirmed(true);
      toast.success(`Report purchased! Delivery in ${report.deliveryTime}`);
    } catch {
      toast.error("Failed to process. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 overflow-y-auto">
      <div
        className="w-full max-w-2xl rounded-2xl my-6 shadow-2xl"
        style={{ background: cardBg, border: `1px solid ${borderColor}` }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between p-6 border-b"
          style={{ borderColor }}
        >
          <div className="flex items-start gap-3 min-w-0">
            <span className="text-3xl flex-shrink-0">{report.icon}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  className="font-heading font-bold text-lg"
                  style={{ color: "oklch(0.22 0.08 22)" }}
                >
                  {lang === "en" ? report.title : report.titleHindi}
                </h2>
                {report.popular && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.15)",
                      color: gold,
                    }}
                  >
                    Popular
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span
                  className="font-heading font-bold text-xl"
                  style={{ color: gold }}
                >
                  ₹{report.price}
                </span>
                <span className="text-xs text-muted-foreground">
                  Delivery: {report.deliveryTime}
                </span>
                <button
                  type="button"
                  onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
                  className="text-xs px-2 py-0.5 rounded-full border transition-colors hover:bg-muted"
                  style={{ borderColor }}
                >
                  {lang === "en" ? "हिंदी" : "English"}
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted flex-shrink-0 ml-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {confirmed ? (
            <div className="text-center py-8">
              <CheckCircle
                className="h-14 w-14 mx-auto mb-4"
                style={{ color: "oklch(0.65 0.16 140)" }}
              />
              <h3 className="font-heading font-bold text-lg mb-2">
                Report Purchased!
              </h3>
              <p className="text-sm text-muted-foreground">
                Your {report.title} will be delivered within{" "}
                {report.deliveryTime}.
              </p>
              {delivery === "whatsapp" && whatsapp && (
                <p className="text-sm mt-2" style={{ color: gold }}>
                  Delivery to WhatsApp: {whatsapp}
                </p>
              )}
            </div>
          ) : (
            <>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">
                {lang === "en" ? report.description : report.descriptionHindi}
              </p>

              {/* What You Get */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.06)",
                  border: `1px solid ${borderColor}`,
                }}
              >
                <h3
                  className="font-heading font-bold text-sm mb-3"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  ✅ What You Get
                </h3>
                <ul className="space-y-1.5">
                  {report.whatYouGet.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm font-body"
                    >
                      <span
                        style={{ color: gold }}
                        className="mt-0.5 flex-shrink-0"
                      >
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: "oklch(0.93 0.02 75)",
                  border: `1px solid ${borderColor}`,
                }}
              >
                <h3
                  className="font-heading font-bold text-sm mb-2"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  📄 Sample Preview
                </h3>
                <p className="text-xs font-body text-muted-foreground italic leading-relaxed">
                  {report.sampleContent}
                </p>
              </div>

              {/* Testimonials */}
              <div>
                <h3
                  className="font-heading font-bold text-sm mb-3"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  ⭐ Customer Reviews
                </h3>
                <div className="space-y-3">
                  {report.testimonials.map((t) => (
                    <div
                      key={t.name}
                      className="rounded-lg p-3"
                      style={{
                        background: cardBg,
                        border: `1px solid ${borderColor}`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading font-semibold text-sm">
                          {t.name}
                        </span>
                        <StarRating rating={t.rating} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.review}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3
                  className="font-heading font-bold text-sm mb-3"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  ❓ FAQ
                </h3>
                <div className="space-y-2">
                  {report.faq.map((item, i) => (
                    <div
                      key={item.q}
                      className="rounded-lg overflow-hidden"
                      style={{ border: `1px solid ${borderColor}` }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/30 transition-colors"
                      >
                        <span className="font-body text-sm font-medium pr-2">
                          {item.q}
                        </span>
                        {openFaq === i ? (
                          <ChevronUp className="h-4 w-4 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 flex-shrink-0" />
                        )}
                      </button>
                      {openFaq === i && (
                        <div className="px-3 pb-3">
                          <p className="text-xs text-muted-foreground">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-xl p-4"
                style={{
                  background: "oklch(0.97 0.015 85)",
                  border: `1px solid ${borderColor}`,
                }}
              >
                <h3
                  className="font-heading font-bold text-sm"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  🛒 Order Report
                </h3>
                {!identity && (
                  <div
                    className="text-xs p-2 rounded-lg text-center"
                    style={{
                      background: "oklch(0.78 0.14 75 / 0.1)",
                      color: "oklch(0.55 0.16 60)",
                    }}
                  >
                    Please login to purchase
                  </div>
                )}
                <div>
                  <p
                    className="text-xs font-heading font-semibold mb-2"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    Delivery Method
                  </p>
                  <div className="flex gap-2">
                    {(["whatsapp", "email"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setDelivery(m)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-semibold border transition-all"
                        style={
                          delivery === m
                            ? {
                                background: saffron,
                                color: "white",
                                borderColor: saffron,
                              }
                            : { borderColor }
                        }
                        data-ocid={`reports.delivery.${m}`}
                      >
                        {m === "whatsapp" ? (
                          <MessageCircle className="h-3 w-3" />
                        ) : (
                          <Mail className="h-3 w-3" />
                        )}
                        {m === "whatsapp" ? "WhatsApp" : "Email"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="report-full-name"
                      className="block text-xs font-heading font-semibold mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="report-full-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Your full name"
                      className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none bg-background"
                      style={{ borderColor }}
                      data-ocid="reports.name_input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="report-dob"
                      className="block text-xs font-heading font-semibold mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      Date of Birth *
                    </label>
                    <input
                      id="report-dob"
                      type="date"
                      required
                      value={form.dob}
                      onChange={(e) =>
                        setForm({ ...form, dob: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none bg-background"
                      style={{ borderColor }}
                      data-ocid="reports.dob_input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="report-tob"
                      className="block text-xs font-heading font-semibold mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      Time of Birth
                    </label>
                    <input
                      id="report-tob"
                      type="time"
                      value={form.tob}
                      onChange={(e) =>
                        setForm({ ...form, tob: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none bg-background"
                      style={{ borderColor }}
                      data-ocid="reports.tob_input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="report-pob"
                      className="block text-xs font-heading font-semibold mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      Place of Birth
                    </label>
                    <input
                      id="report-pob"
                      type="text"
                      value={form.pob}
                      onChange={(e) =>
                        setForm({ ...form, pob: e.target.value })
                      }
                      placeholder="City, Country"
                      className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none bg-background"
                      style={{ borderColor }}
                      data-ocid="reports.pob_input"
                    />
                  </div>
                </div>
                {delivery === "whatsapp" && (
                  <div>
                    <label
                      htmlFor="report-whatsapp"
                      className="block text-xs font-heading font-semibold mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      WhatsApp Number
                    </label>
                    <input
                      id="report-whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none bg-background"
                      style={{ borderColor }}
                      data-ocid="reports.whatsapp_input"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between pt-2">
                  <span
                    className="font-heading font-bold text-lg"
                    style={{ color: gold }}
                  >
                    ₹{report.price}
                  </span>
                  <button
                    type="submit"
                    disabled={createReport.isPending || !identity}
                    className="px-6 py-2.5 rounded-full font-heading font-bold text-sm transition-all hover:scale-105 disabled:opacity-50"
                    style={{
                      background: `linear-gradient(135deg, ${gold}, oklch(0.58 0.18 40))`,
                      color: "white",
                    }}
                    data-ocid="reports.submit_button"
                  >
                    {createReport.isPending ? "Processing..." : "🛒 Buy Report"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Reports() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<ReportCatalog | null>(
    null,
  );
  const [lang, setLang] = useState<"en" | "hi">("en");

  const filtered =
    activeCategory === "all"
      ? ENHANCED_REPORTS
      : ENHANCED_REPORTS.filter((r) => r.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: 260 }}>
        <img
          src="/assets/generated/panchang-banner.dim_1200x400.png"
          alt="Reports"
          className="w-full h-64 object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.8))",
          }}
        >
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📋 Astrological Reports
          </h1>
          <p
            className="font-body text-base md:text-lg mb-4"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            {lang === "en"
              ? "Personalized Vedic astrology reports by expert astrologers"
              : "विशेषज्ञ ज्योतिषियों द्वारा व्यक्तिगत वैदिक ज्योतिष रिपोर्ट"}
          </p>
          <button
            type="button"
            onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
            className="text-xs px-4 py-1.5 rounded-full border transition-colors"
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.5)",
              color: "oklch(0.85 0.04 75)",
            }}
          >
            {lang === "en" ? "हिंदी में देखें" : "View in English"}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-3 mb-8"
          data-ocid="reports.filter.tab"
        >
          {REPORT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-heading font-semibold border transition-all whitespace-nowrap"
              style={
                activeCategory === cat.id
                  ? {
                      background: `linear-gradient(135deg, ${gold}, oklch(0.58 0.18 40))`,
                      color: "white",
                      borderColor: gold,
                    }
                  : { background: cardBg, borderColor }
              }
              data-ocid={`reports.category.${cat.id}`}
            >
              {"icon" in cat && <span>{cat.icon}</span>}
              <span>{lang === "en" ? cat.label : cat.labelHindi}</span>
            </button>
          ))}
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((report, idx) => (
            <button
              type="button"
              key={report.id}
              className="rounded-2xl p-5 flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer text-left"
              style={{ background: cardBg, border: `1px solid ${borderColor}` }}
              onClick={() => setSelectedReport(report)}
              data-ocid={`reports.item.${idx + 1}`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{report.icon}</span>
                {report.popular && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.15)",
                      color: gold,
                    }}
                  >
                    Popular
                  </span>
                )}
              </div>
              <h3
                className="font-heading font-bold text-sm mb-1.5 leading-snug"
                style={{ color: "oklch(0.22 0.08 22)" }}
              >
                {lang === "en" ? report.title : report.titleHindi}
              </h3>
              <p className="font-body text-xs text-muted-foreground mb-3 flex-1 line-clamp-3">
                {lang === "en" ? report.description : report.descriptionHindi}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <span>⏱ {report.deliveryTime}</span>
                <span>•</span>
                <span>
                  {report.deliveryMethod === "both"
                    ? "📱 WA / Email"
                    : report.deliveryMethod === "whatsapp"
                      ? "📱 WhatsApp"
                      : "📧 Email"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="font-heading font-bold text-lg"
                  style={{ color: gold }}
                >
                  ₹{report.price}
                </span>
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${gold}, oklch(0.58 0.18 40))`,
                    color: "white",
                  }}
                  data-ocid={`reports.buy_button.${idx + 1}`}
                >
                  Buy Now
                </button>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            className="text-center py-12 text-muted-foreground"
            data-ocid="reports.empty_state"
          >
            <p className="text-4xl mb-3">📋</p>
            <p className="font-body">No reports found in this category.</p>
          </div>
        )}
      </div>

      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}
