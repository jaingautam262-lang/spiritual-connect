import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  Package,
  Star,
  Video,
} from "lucide-react";
import { useState } from "react";
import PujaBookingForm from "../components/PujaBookingForm";
import { pujaProducts } from "../data/pujaData";

const PROCESS_STEPS = [
  { icon: "📱", label: "Book Online", desc: "Fill the booking form" },
  {
    icon: "✅",
    label: "Receive Confirmation",
    desc: "Booking ID emailed to you",
  },
  {
    icon: "📹",
    label: "Pandit Connects on Video",
    desc: "Live stream on your device",
  },
  {
    icon: "🪔",
    label: "Puja with Your Sankalp",
    desc: "Pandit reads your wishes",
  },
  { icon: "🎁", label: "Receive Prasad", desc: "Shipped to your door" },
];

export default function PujaDetail() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const puja = pujaProducts.find((p) => p.id === id);

  if (!puja) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4">🔍</p>
          <h1
            className="font-heading font-bold text-2xl mb-2"
            style={{ color: "oklch(0.22 0.08 22)" }}
          >
            Puja Not Found
          </h1>
          <p
            className="font-body text-sm mb-6"
            style={{ color: "oklch(0.50 0.05 45)" }}
          >
            The puja you are looking for does not exist or may have been
            removed.
          </p>
          <Link to="/pujas-catalog">
            <Button
              className="font-heading font-semibold text-white rounded-full px-6"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                border: "none",
              }}
            >
              ← Back to Puja Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(((puja.mrp - puja.price) / puja.mrp) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-1.5 text-sm font-body flex-wrap">
          <Link
            to="/"
            className="hover:text-primary transition-colors"
            style={{ color: "oklch(0.55 0.06 50)" }}
          >
            Home
          </Link>
          <ChevronRight
            className="h-3.5 w-3.5 shrink-0"
            style={{ color: "oklch(0.70 0.04 60)" }}
          />
          <Link
            to="/pujas-catalog"
            className="hover:text-primary transition-colors"
            style={{ color: "oklch(0.55 0.06 50)" }}
          >
            Puja Catalog
          </Link>
          <ChevronRight
            className="h-3.5 w-3.5 shrink-0"
            style={{ color: "oklch(0.70 0.04 60)" }}
          />
          <span
            className="font-semibold line-clamp-1"
            style={{ color: "oklch(0.30 0.10 30)" }}
          >
            {puja.title}
          </span>
        </div>
      </div>

      {/* Hero */}
      <section
        className="py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 22) 0%, oklch(0.30 0.10 28) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <Link
            to="/pujas-catalog"
            className="inline-flex items-center gap-1.5 text-sm font-body mb-5 hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.78 0.08 65)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Catalog
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <Badge
                className="mb-3 font-heading font-semibold text-xs"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.2)",
                  color: "oklch(0.90 0.10 70)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.4)",
                }}
              >
                {puja.category}
              </Badge>

              <h1
                className="font-heading text-2xl md:text-3xl font-bold mb-3 leading-snug"
                style={{ color: "oklch(0.96 0.015 85)" }}
              >
                {puja.title}
              </h1>

              <p
                className="font-body text-sm mb-4"
                style={{ color: "oklch(0.78 0.06 65)" }}
              >
                🪔 {puja.deity}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm font-body">
                <span
                  className="flex items-center gap-1.5"
                  style={{ color: "oklch(0.88 0.12 70)" }}
                >
                  <Star
                    className="h-4 w-4 fill-current"
                    style={{ color: "oklch(0.78 0.18 75)" }}
                  />
                  <strong>{puja.rating}</strong>
                  <span style={{ color: "oklch(0.70 0.04 65)" }}>
                    ({puja.reviewCount} reviews)
                  </span>
                </span>
                <span
                  className="flex items-center gap-1.5"
                  style={{ color: "oklch(0.78 0.06 65)" }}
                >
                  <Clock className="h-4 w-4" />
                  {puja.duration}
                </span>
                <span
                  className="flex items-center gap-1.5"
                  style={{ color: "oklch(0.78 0.06 65)" }}
                >
                  <Video className="h-4 w-4" />
                  Live Video
                </span>
              </div>
            </div>

            {/* Price + CTA card */}
            <div
              className="shrink-0 rounded-2xl p-5 w-full md:w-72"
              style={{
                background: "oklch(0.99 0.008 80)",
                border: "1px solid oklch(0.78 0.14 75 / 0.25)",
              }}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="font-heading font-bold text-2xl"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  ₹{puja.price.toLocaleString("en-IN")}
                </span>
                {puja.mrp > puja.price && (
                  <span
                    className="text-sm font-body line-through"
                    style={{ color: "oklch(0.65 0.04 50)" }}
                  >
                    ₹{puja.mrp.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p
                  className="text-xs font-heading font-semibold mb-4"
                  style={{ color: "oklch(0.48 0.18 145)" }}
                >
                  {discount}% off — Save ₹
                  {(puja.mrp - puja.price).toLocaleString("en-IN")}
                </p>
              )}

              <Button
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-5 rounded-full font-heading font-bold text-base text-white mb-3"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.16 35))",
                  border: "none",
                }}
                data-ocid="puja.detail.book_now_btn"
              >
                🙏 Book Now
              </Button>
              <p
                className="text-xs font-body text-center"
                style={{ color: "oklch(0.60 0.05 50)" }}
              >
                ✓ Verified pandits &nbsp;|&nbsp; ✓ Live video stream
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <section>
            <h2
              className="font-heading font-bold text-lg mb-3 flex items-center gap-2"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              <span style={{ color: "oklch(0.68 0.20 48)" }}>📖</span>
              About This Puja
            </h2>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.38 0.06 35)" }}
            >
              {puja.description}
            </p>
          </section>

          {/* Benefits */}
          <section>
            <h2
              className="font-heading font-bold text-lg mb-3 flex items-center gap-2"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              <span style={{ color: "oklch(0.68 0.20 48)" }}>✨</span>
              Key Benefits
            </h2>
            <ul className="space-y-2">
              {puja.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-sm font-body"
                  style={{ color: "oklch(0.38 0.06 35)" }}
                >
                  <CheckCircle2
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.55 0.18 145)" }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </section>

          {/* What's Included */}
          <section>
            <h2
              className="font-heading font-bold text-lg mb-3 flex items-center gap-2"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              <Package
                className="h-5 w-5"
                style={{ color: "oklch(0.68 0.20 48)" }}
              />
              What's Included
            </h2>
            <ul className="space-y-2">
              {puja.included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm font-body"
                  style={{ color: "oklch(0.38 0.06 35)" }}
                >
                  <span
                    className="text-base mt-0.5 shrink-0"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    🔸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Process */}
          <section>
            <h2
              className="font-heading font-bold text-lg mb-5 flex items-center gap-2"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              <span style={{ color: "oklch(0.68 0.20 48)" }}>🔄</span>
              Puja Process
            </h2>
            <div className="relative">
              <div
                className="absolute left-6 top-6 bottom-6 w-0.5"
                style={{ background: "oklch(0.78 0.14 75 / 0.3)" }}
              />
              <div className="space-y-5">
                {PROCESS_STEPS.map((step, stepIdx) => (
                  <div
                    key={step.label}
                    className="flex gap-4 items-start relative"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg shrink-0 z-10"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.12), oklch(0.78 0.14 75 / 0.1))",
                        border: "2px solid oklch(0.68 0.20 48 / 0.3)",
                      }}
                    >
                      {step.icon}
                    </div>
                    <div className="pt-2">
                      <p
                        className="font-heading font-semibold text-sm"
                        style={{ color: "oklch(0.28 0.10 28)" }}
                      >
                        {stepIdx + 1}. {step.label}
                      </p>
                      <p
                        className="text-xs font-body mt-0.5"
                        style={{ color: "oklch(0.55 0.05 45)" }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Quick info */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "oklch(0.99 0.008 80)",
              border: "1px solid oklch(0.78 0.14 75 / 0.25)",
            }}
          >
            <h3
              className="font-heading font-bold text-sm mb-4"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Puja Details
            </h3>
            {[
              { label: "Deity", value: puja.deity },
              { label: "Duration", value: puja.duration },
              { label: "Category", value: puja.category },
              {
                label: "Rating",
                value: `${puja.rating} ★ (${puja.reviewCount} reviews)`,
              },
              { label: "Mode", value: "Live Video + In-Home" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-start gap-2 py-2 border-b last:border-0"
                style={{ borderColor: "oklch(0.85 0.03 70 / 0.5)" }}
              >
                <span
                  className="text-xs font-heading font-semibold w-24 shrink-0 pt-0.5"
                  style={{ color: "oklch(0.60 0.08 50)" }}
                >
                  {label}
                </span>
                <span
                  className="text-xs font-body"
                  style={{ color: "oklch(0.30 0.08 30)" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Book sticky CTA */}
          <div
            className="rounded-2xl p-5 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.05), oklch(0.78 0.14 75 / 0.08))",
              border: "1px solid oklch(0.68 0.20 48 / 0.2)",
            }}
          >
            <p className="text-2xl mb-2">🙏</p>
            <p
              className="font-heading font-bold text-base mb-1"
              style={{ color: "oklch(0.28 0.10 28)" }}
            >
              Ready to Book?
            </p>
            <p
              className="font-body text-xs mb-4"
              style={{ color: "oklch(0.55 0.05 48)" }}
            >
              Experienced pandits available 7 days a week
            </p>
            <Button
              onClick={() => setIsBookingOpen(true)}
              className="w-full rounded-full font-heading font-bold text-sm text-white py-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.16 35))",
                border: "none",
              }}
              data-ocid="puja.detail.sidebar_book_btn"
            >
              Book Now — ₹{puja.price.toLocaleString("en-IN")}
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-0"
          style={{ background: "oklch(0.97 0.015 85)" }}
          data-ocid="puja.detail.booking_modal"
        >
          <DialogHeader className="p-5 pb-0">
            <DialogTitle
              className="font-heading text-lg font-bold"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              Book — {puja.title}
            </DialogTitle>
          </DialogHeader>
          <div className="p-5 pt-3">
            <PujaBookingForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
