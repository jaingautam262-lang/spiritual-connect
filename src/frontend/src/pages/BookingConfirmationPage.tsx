import { Button } from "@/components/ui/button";
import { Link, useSearch } from "@tanstack/react-router";
import { motion } from "motion/react";

interface ConfirmSearch {
  ref?: string;
}

const WHAT_TO_EXPECT = [
  {
    icon: "📖",
    text: "Our astrologer will review your birth chart before the session",
  },
  {
    icon: "📱",
    text: "You'll receive a call/chat/video link at your preferred time",
  },
  {
    icon: "💰",
    text: "Consultation is ₹20–35 per minute based on your chosen astrologer",
  },
];

export default function BookingConfirmationPage() {
  const rawSearch = (useSearch({ strict: false }) ?? {}) as ConfirmSearch;
  const ref = rawSearch.ref ? decodeURIComponent(rawSearch.ref) : "SC-PENDING";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg text-center"
        data-ocid="booking-confirmation.page"
      >
        {/* Gold checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          style={{ background: "oklch(0.62 0.18 48)" }}
        >
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
            aria-label="Booking confirmed checkmark"
            role="img"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-display text-3xl font-bold text-foreground mb-2"
        >
          Booking Confirmed! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="font-body text-muted-foreground text-base mb-6"
        >
          Your consultation request has been received.
        </motion.p>

        {/* Booking Reference */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl border px-6 py-5 mb-6 inline-block w-full"
          data-ocid="booking-confirmation.reference.card"
          style={{
            background: "oklch(0.62 0.18 48 / 0.06)",
            borderColor: "oklch(0.62 0.18 48 / 0.3)",
          }}
        >
          <p className="text-xs text-muted-foreground font-body mb-1">
            Booking Reference
          </p>
          <p
            className="font-mono text-xl font-bold tracking-widest"
            style={{ color: "oklch(0.45 0.16 38)" }}
          >
            {ref}
          </p>
          <p className="text-xs text-muted-foreground font-body mt-2 leading-relaxed">
            We will contact you within <strong>24 hours</strong> to confirm your
            consultation slot. Please keep your phone handy.
          </p>
        </motion.div>

        {/* What to expect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="rounded-2xl border bg-card p-5 mb-8 text-left"
          style={{ borderColor: "oklch(0.85 0.04 70)" }}
        >
          <h2 className="font-display font-semibold text-foreground text-sm mb-3">
            What to Expect
          </h2>
          <ul className="space-y-3">
            {WHAT_TO_EXPECT.map((item) => (
              <li
                key={item.text}
                className="flex items-start gap-3 font-body text-sm text-muted-foreground"
              >
                <span className="text-base flex-shrink-0 mt-0.5">
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            asChild
            data-ocid="booking-confirmation.calculators.link"
            variant="outline"
            className="font-body font-semibold"
            style={{ borderColor: "oklch(0.62 0.18 48 / 0.4)" }}
          >
            <Link to="/calculator-index">🔢 Explore Free Calculators</Link>
          </Button>
          <Button
            asChild
            data-ocid="booking-confirmation.home.link"
            className="font-body font-semibold"
            style={{ background: "oklch(0.62 0.18 48)", color: "white" }}
          >
            <Link to="/">🏠 Go to Home</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
