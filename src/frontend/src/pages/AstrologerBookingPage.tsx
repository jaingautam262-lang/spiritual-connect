import { Link, useSearch } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import AppointmentBookingForm from "../components/AppointmentBookingForm";

// Route search params: ?astrologerId=...&astrologerName=...&rate=...
interface BookingSearch {
  astrologerId?: string;
  astrologerName?: string;
  rate?: string;
}

export default function AstrologerBookingPage() {
  const search = (useSearch({ strict: false }) ?? {}) as BookingSearch;

  const astrologerId = search.astrologerId;
  const astrologerName = search.astrologerName
    ? decodeURIComponent(search.astrologerName)
    : undefined;
  const perMinuteRate = search.rate ? Number.parseInt(search.rate, 10) : 20;

  return (
    <div className="min-h-screen bg-background">
      {/* Header band */}
      <div
        className="w-full py-10 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 22), oklch(0.28 0.10 30))",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.68 0.20 48) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10">
          <Link
            to="/astrologer"
            className="inline-flex items-center gap-1.5 text-sm font-body mb-4 transition-opacity hover:opacity-80"
            style={{ color: "oklch(0.78 0.14 75 / 0.8)" }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Astrologers
          </Link>
          <h1
            className="font-decorative text-3xl md:text-4xl font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📅 Book a Consultation
          </h1>
          <p
            className="font-body mt-2"
            style={{ color: "oklch(0.82 0.06 60)" }}
          >
            {astrologerName
              ? `Booking with ${astrologerName}`
              : "Connect with a verified spiritual expert"}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <div
          className="rounded-2xl p-6 md:p-8 border shadow-sm"
          style={{
            background: "var(--card)",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <AppointmentBookingForm
            astrologerId={astrologerId}
            astrologerName={astrologerName}
            perMinuteRate={perMinuteRate}
            onSuccess={() => {
              // optionally navigate away or just show confirmation
            }}
          />
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { icon: "🛡️", label: "Verified Experts" },
            { icon: "🔒", label: "Secure Booking" },
            { icon: "⭐", label: "4.8+ Rated" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="rounded-xl py-3 text-center"
              style={{
                background: "oklch(0.78 0.14 75 / 0.07)",
                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <span className="text-xl block mb-1">{icon}</span>
              <span
                className="text-xs font-heading font-semibold"
                style={{ color: "oklch(0.45 0.12 30)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
