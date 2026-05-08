import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  Lock,
  Star,
} from "lucide-react";
import { useState } from "react";
import {
  useCreateLifeReport,
  useCreateStripeSession,
} from "../hooks/useQueries";
import type { LifeReportConfig } from "../types/lifeReports";

interface TestimonialData {
  name: string;
  city: string;
  text: string;
  rating: number;
}

interface FAQItem {
  q: string;
  a: string;
}

export interface ExtraField {
  id: string;
  label: string;
  type: "text" | "date" | "time" | "select";
  options?: string[];
  required?: boolean;
}

export interface LifeReportPageProps {
  config: LifeReportConfig;
  testimonials: TestimonialData[];
  faqs: FAQItem[];
  extraFields?: ExtraField[];
  samplePreview: string;
}

const BASE_FIELD_META: Record<
  string,
  { label: string; type: string; required: boolean }
> = {
  name: { label: "पूरा नाम", type: "text", required: true },
  dob: { label: "जन्म तिथि", type: "date", required: true },
  tob: { label: "जन्म समय (वैकल्पिक)", type: "time", required: false },
  pob: { label: "जन्म स्थान", type: "text", required: true },
  gender: { label: "लिंग", type: "select", required: false },
  whatsapp: { label: "WhatsApp नंबर", type: "tel", required: true },
  rashi: { label: "राशि", type: "text", required: false },
  currentJob: { label: "वर्तमान नौकरी / पद", type: "text", required: false },
  healthConcern: {
    label: "स्वास्थ्य समस्या (यदि कोई)",
    type: "text",
    required: false,
  },
  currentStatus: {
    label: "वर्तमान व्यवसाय / नौकरी",
    type: "text",
    required: false,
  },
  period: { label: "रिपोर्ट की अवधि", type: "text", required: false },
  partnerName: { label: "साथी का नाम", type: "text", required: false },
  partnerDob: { label: "साथी की जन्म तिथि", type: "date", required: false },
};

const GENDER_OPTIONS = ["पुरुष", "महिला", "अन्य"];

function StarRating({ count }: { count: number }) {
  const stars = [1, 2, 3, 4, 5].slice(0, count);
  return (
    <span className="flex gap-0.5">
      {stars.map((n) => (
        <Star
          key={n}
          className="h-3.5 w-3.5 fill-current"
          style={{ color: "oklch(0.78 0.14 75)" }}
        />
      ))}
    </span>
  );
}

function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div
          key={`faq-${faq.q.slice(0, 30)}`}
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid oklch(0.85 0.04 70)" }}
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 font-body text-sm font-semibold text-left"
            style={{
              color: "oklch(0.22 0.08 22)",
              background: "oklch(0.99 0.008 80)",
            }}
            data-ocid={`life-report.faq.${i + 1}`}
          >
            {faq.q}
            {open === i ? (
              <ChevronUp className="h-4 w-4 shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0" />
            )}
          </button>
          {open === i && (
            <div
              className="px-5 pb-4 font-body text-sm leading-relaxed"
              style={{
                background: "oklch(0.97 0.012 82)",
                color: "oklch(0.38 0.04 35)",
              }}
            >
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function LifeReportPage({
  config,
  testimonials,
  faqs,
  extraFields = [],
  samplePreview,
}: LifeReportPageProps) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const createReport = useCreateLifeReport();
  const createSession = useCreateStripeSession();
  const isLoading = createReport.isPending || createSession.isPending;

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    try {
      const details = JSON.stringify({ ...form });
      const reportId = await createReport.mutateAsync({
        reportType: config.id,
        name: form.name ?? "",
        dob: form.dob ?? "",
        details,
      });
      const stripeUrl = await createSession.mutateAsync({
        productType: "life-report",
        amount: config.price,
        metadata: reportId,
      });
      window.location.href = stripeUrl;
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "कुछ गड़बड़ी हुई, कृपया दोबारा प्रयास करें।",
      );
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Hero */}
      <div
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.07 22), oklch(0.30 0.10 30))",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            to="/life-reports"
            className="inline-flex items-center gap-2 text-sm font-body mb-6 opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: "oklch(0.78 0.12 70)" }}
          >
            <ArrowLeft className="h-4 w-4" /> सभी रिपोर्ट्स
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0"
              style={{
                background: "oklch(0.28 0.08 28)",
                boxShadow: "0 4px 24px oklch(0.10 0.05 20 / 0.5)",
              }}
            >
              {config.icon}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1
                  className="font-heading text-3xl md:text-4xl font-bold"
                  style={{ color: "oklch(0.96 0.01 80)" }}
                >
                  {config.titleHindi}
                </h1>
                <span
                  className="px-3 py-1 rounded-full font-heading font-bold text-sm"
                  style={{
                    background: "oklch(0.78 0.14 75)",
                    color: "oklch(0.12 0.04 28)",
                  }}
                >
                  ₹{config.price}
                </span>
              </div>
              <p
                className="font-body text-sm mb-2"
                style={{ color: "oklch(0.62 0.05 55)" }}
              >
                {config.title}
              </p>
              <p className="font-body" style={{ color: "oklch(0.75 0.08 65)" }}>
                {config.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* What's included */}
        <section>
          <h2
            className="font-heading text-xl font-bold mb-5"
            style={{ color: "oklch(0.22 0.08 22)" }}
          >
            इस रिपोर्ट में क्या मिलेगा?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {config.includedSections.map((s, i) => (
              <div
                key={s}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  border: "1px solid oklch(0.87 0.03 72)",
                }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center font-heading font-bold text-xs shrink-0"
                  style={{
                    background: "oklch(0.93 0.04 75)",
                    color: "oklch(0.50 0.12 42)",
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="font-body text-sm"
                  style={{ color: "oklch(0.28 0.06 28)" }}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Sample preview blurred */}
        <section>
          <h2
            className="font-heading text-xl font-bold mb-5"
            style={{ color: "oklch(0.22 0.08 22)" }}
          >
            रिपोर्ट का नमूना
          </h2>
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ border: "1px solid oklch(0.85 0.04 70)" }}
          >
            <div
              className="p-6 font-body text-sm leading-relaxed select-none"
              style={{
                background: "oklch(0.99 0.008 80)",
                color: "oklch(0.30 0.05 30)",
                filter: "blur(5px)",
              }}
            >
              {samplePreview}
            </div>
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              style={{ background: "oklch(0.99 0.008 80 / 0.80)" }}
            >
              <Lock
                className="h-8 w-8"
                style={{ color: "oklch(0.60 0.15 48)" }}
              />
              <p
                className="font-heading font-semibold"
                style={{ color: "oklch(0.22 0.08 22)" }}
              >
                भुगतान के बाद पूरी रिपोर्ट मिलेगी
              </p>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.50 0.04 40)" }}
              >
                24–48 घंटे में WhatsApp / Email पर
              </p>
            </div>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-6"
              style={{
                background: "oklch(0.99 0.008 80)",
                border: "1px solid oklch(0.85 0.04 70)",
              }}
              data-ocid={`life-report.${config.id}.form`}
            >
              <h2
                className="font-heading text-lg font-bold mb-6"
                style={{ color: "oklch(0.22 0.08 22)" }}
              >
                जन्म विवरण भरें
              </h2>
              <div className="space-y-4">
                {config.formFields.map((fieldId) => {
                  const meta = BASE_FIELD_META[fieldId];
                  if (!meta) return null;
                  if (fieldId === "gender") {
                    return (
                      <div key={fieldId}>
                        <label
                          className="block text-sm font-body mb-1"
                          style={{ color: "oklch(0.38 0.05 35)" }}
                          htmlFor={fieldId}
                        >
                          {meta.label}
                        </label>
                        <select
                          id={fieldId}
                          value={form[fieldId] ?? ""}
                          onChange={(e) =>
                            handleChange(fieldId, e.target.value)
                          }
                          data-ocid={`life-report.${config.id}.gender_select`}
                          className="w-full px-4 py-2.5 rounded-xl border font-body text-sm focus:outline-none focus:ring-2"
                          style={{
                            background: "oklch(0.97 0.015 85)",
                            borderColor: "oklch(0.85 0.04 70)",
                            color: "oklch(0.22 0.08 22)",
                          }}
                        >
                          <option value="">चुनें…</option>
                          {GENDER_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }
                  return (
                    <div key={fieldId}>
                      <label
                        className="block text-sm font-body mb-1"
                        style={{ color: "oklch(0.38 0.05 35)" }}
                        htmlFor={fieldId}
                      >
                        {meta.label}
                        {meta.required && (
                          <span style={{ color: "oklch(0.55 0.20 25)" }}>
                            {" "}
                            *
                          </span>
                        )}
                      </label>
                      <input
                        id={fieldId}
                        type={meta.type}
                        value={form[fieldId] ?? ""}
                        onChange={(e) => handleChange(fieldId, e.target.value)}
                        required={meta.required}
                        data-ocid={`life-report.${config.id}.${fieldId}_input`}
                        className="w-full px-4 py-2.5 rounded-xl border font-body text-sm focus:outline-none focus:ring-2"
                        style={{
                          background: "oklch(0.97 0.015 85)",
                          borderColor: "oklch(0.85 0.04 70)",
                          color: "oklch(0.22 0.08 22)",
                        }}
                      />
                    </div>
                  );
                })}

                {/* Extra report-specific fields */}
                {extraFields.map((ef) => (
                  <div key={ef.id}>
                    <label
                      className="block text-sm font-body mb-1"
                      style={{ color: "oklch(0.38 0.05 35)" }}
                      htmlFor={ef.id}
                    >
                      {ef.label}
                      {ef.required && (
                        <span style={{ color: "oklch(0.55 0.20 25)" }}> *</span>
                      )}
                    </label>
                    {ef.type === "select" ? (
                      <select
                        id={ef.id}
                        value={form[ef.id] ?? ""}
                        onChange={(e) => handleChange(ef.id, e.target.value)}
                        required={ef.required}
                        data-ocid={`life-report.${config.id}.${ef.id}_select`}
                        className="w-full px-4 py-2.5 rounded-xl border font-body text-sm focus:outline-none focus:ring-2"
                        style={{
                          background: "oklch(0.97 0.015 85)",
                          borderColor: "oklch(0.85 0.04 70)",
                          color: "oklch(0.22 0.08 22)",
                        }}
                      >
                        <option value="">चुनें…</option>
                        {(ef.options ?? []).map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={ef.id}
                        type={ef.type}
                        value={form[ef.id] ?? ""}
                        onChange={(e) => handleChange(ef.id, e.target.value)}
                        required={ef.required}
                        data-ocid={`life-report.${config.id}.${ef.id}_input`}
                        className="w-full px-4 py-2.5 rounded-xl border font-body text-sm focus:outline-none focus:ring-2"
                        style={{
                          background: "oklch(0.97 0.015 85)",
                          borderColor: "oklch(0.85 0.04 70)",
                          color: "oklch(0.22 0.08 22)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {submitError && (
                <p
                  className="mt-4 text-sm font-body text-center px-3 py-2 rounded-xl"
                  style={{
                    background: "oklch(0.95 0.04 22)",
                    color: "oklch(0.40 0.15 22)",
                  }}
                  data-ocid={`life-report.${config.id}.error_state`}
                >
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                data-ocid={`life-report.${config.id}.submit_button`}
                className="w-full mt-6 py-3.5 rounded-full font-heading font-bold text-base transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  background: isLoading
                    ? "oklch(0.75 0.10 72)"
                    : "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.65 0.22 48))",
                  color: "oklch(0.12 0.04 28)",
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> प्रोसेस हो रहा है…
                  </>
                ) : (
                  <>रिपोर्ट प्राप्त करें — ₹{config.price}</>
                )}
              </button>
              <p
                className="mt-3 text-center font-body text-xs"
                style={{ color: "oklch(0.55 0.04 50)" }}
              >
                🔒 Stripe द्वारा सुरक्षित भुगतान · 24–48 घंटे में डिलीवरी
              </p>
            </form>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-2">
            <div
              className="rounded-2xl p-5 sticky top-6"
              style={{
                background: "oklch(0.99 0.008 80)",
                border: "1px solid oklch(0.85 0.04 70)",
              }}
            >
              <h3
                className="font-heading text-sm font-bold mb-3 uppercase tracking-wider"
                style={{ color: "oklch(0.60 0.12 48)" }}
              >
                शामिल विश्लेषण
              </h3>
              <ul className="space-y-2 mb-5">
                {config.includedSections.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 font-body text-sm"
                    style={{ color: "oklch(0.32 0.05 32)" }}
                  >
                    <CheckCircle
                      className="h-4 w-4 shrink-0"
                      style={{ color: "oklch(0.55 0.18 140)" }}
                    />
                    {s}
                  </li>
                ))}
              </ul>
              <div
                className="py-4 text-center rounded-xl"
                style={{
                  background: "oklch(0.94 0.03 75)",
                  border: "1px solid oklch(0.85 0.06 70)",
                }}
              >
                <p
                  className="font-heading text-3xl font-bold"
                  style={{ color: "oklch(0.55 0.18 42)" }}
                >
                  ₹{config.price}
                </p>
                <p
                  className="font-body text-xs mt-1"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  एकमुश्त शुल्क
                </p>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  "विशेषज्ञ ज्योतिषी द्वारा",
                  "WhatsApp / Email डिलीवरी",
                  "100% गोपनीय",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 font-body text-xs"
                    style={{ color: "oklch(0.42 0.04 38)" }}
                  >
                    <Star
                      className="h-3 w-3"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2
            className="font-heading text-xl font-bold mb-5"
            style={{ color: "oklch(0.22 0.08 22)" }}
          >
            भक्तों के अनुभव
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="rounded-2xl p-5"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  border: "1px solid oklch(0.87 0.03 72)",
                }}
                data-ocid={`life-report.${config.id}.testimonial.item.${i + 1}`}
              >
                <StarRating count={t.rating} />
                <p
                  className="font-body text-sm leading-relaxed mt-3 mb-4"
                  style={{ color: "oklch(0.35 0.04 35)" }}
                >
                  "{t.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-sm"
                    style={{
                      background: "oklch(0.88 0.06 72)",
                      color: "oklch(0.40 0.12 40)",
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className="font-body text-sm font-semibold"
                      style={{ color: "oklch(0.25 0.06 28)" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="font-body text-xs"
                      style={{ color: "oklch(0.55 0.04 50)" }}
                    >
                      {t.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2
            className="font-heading text-xl font-bold mb-5"
            style={{ color: "oklch(0.22 0.08 22)" }}
          >
            अक्सर पूछे जाने वाले प्रश्न
          </h2>
          <FAQAccordion faqs={faqs} />
        </section>
      </div>
    </div>
  );
}
