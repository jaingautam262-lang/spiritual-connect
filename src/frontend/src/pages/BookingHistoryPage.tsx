import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useGetUserPujaBookings } from "../hooks/useQueries";

// ─── Status helpers ────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  pending:
    "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300",
  confirmed:
    "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300",
  completed:
    "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300",
  cancelled:
    "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "⏳ Pending",
  confirmed: "✅ Confirmed",
  completed: "🎉 Completed",
  cancelled: "❌ Cancelled",
};

function StatusBadge({ status }: { status: string }) {
  const cls =
    STATUS_STYLES[status.toLowerCase()] ??
    "bg-muted text-muted-foreground border-border";
  const label =
    STATUS_LABELS[status.toLowerCase()] ??
    status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <Badge variant="outline" className={`text-xs font-semibold border ${cls}`}>
      {label}
    </Badge>
  );
}

function formatDate(val: string | bigint): string {
  if (typeof val === "bigint") {
    const ms = Number(val / 1_000_000n);
    return new Date(ms).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return val;
}

// ─── Filter tabs ───────────────────────────────────────────────────────────────

const FILTERS = [
  { id: "all", label: "सभी / All" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

// ─── Skeleton loader ───────────────────────────────────────────────────────────

function BookingCardSkeleton() {
  return (
    <div
      className="rounded-2xl border p-5 space-y-3"
      style={{ borderColor: "oklch(0.78 0.14 75 / 0.18)" }}
    >
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-3 w-64" />
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-6 w-24 rounded-full" />
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function BookingHistoryPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const [activeFilter, setActiveFilter] = useState("all");

  const principal = identity?.getPrincipal() ?? null;
  const { data: bookings = [], isLoading } = useGetUserPujaBookings(principal);

  // Sort by createdAt descending
  const sorted = [...bookings].sort((a, b) => {
    const aTime =
      typeof a.createdAt === "bigint"
        ? Number(a.createdAt)
        : Number(a.createdAt);
    const bTime =
      typeof b.createdAt === "bigint"
        ? Number(b.createdAt)
        : Number(b.createdAt);
    return bTime - aTime;
  });

  const filtered =
    activeFilter === "all"
      ? sorted
      : sorted.filter(
          (b) => b.status.toLowerCase() === activeFilter.toLowerCase(),
        );

  // ── Not logged in ────────────────────────────────────────────────────────────

  if (!identity) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div
          className="text-center rounded-3xl p-10 max-w-md w-full border shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.97 0.02 75), oklch(0.96 0.03 50))",
            borderColor: "oklch(0.78 0.14 75 / 0.3)",
          }}
        >
          <div className="text-6xl mb-5">🔐</div>
          <h2
            className="font-heading text-2xl font-bold mb-3"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Login Required
          </h2>
          <p
            className="font-body text-base mb-2"
            style={{ color: "oklch(0.45 0.06 40)" }}
          >
            अपनी बुकिंग देखने के लिए लॉगिन करें
          </p>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Please log in to view your booking history.
          </p>
          <Button
            data-ocid="booking-history.login_button"
            onClick={login}
            disabled={loginStatus === "logging-in"}
            className="w-full py-3 rounded-full font-heading font-bold text-base"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              border: "none",
            }}
          >
            {loginStatus === "logging-in"
              ? "Connecting..."
              : "🔐 Login with Internet Identity"}
          </Button>
        </div>
      </div>
    );
  }

  // ── Authenticated ────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div
        className="border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-2xl">🙏</span>
            <span
              className="text-sm tracking-widest font-semibold uppercase font-heading"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              My Bookings
            </span>
            <span className="text-2xl">🙏</span>
          </div>
          <h1
            className="font-heading font-bold text-3xl sm:text-4xl mb-3"
            style={{ color: "oklch(0.90 0.06 75)" }}
          >
            बुकिंग इतिहास
          </h1>
          <p
            className="font-body text-base"
            style={{ color: "oklch(0.75 0.06 65 / 0.8)" }}
          >
            Booking History — View all your puja seva bookings
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Filter bar */}
        <div
          className="flex items-center gap-2 flex-wrap mb-8 p-1.5 rounded-2xl border"
          style={{
            background: "oklch(0.97 0.02 75 / 0.5)",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
          }}
          data-ocid="booking-history.filter_tabs"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              data-ocid={`booking-history.filter.${f.id}`}
              onClick={() => setActiveFilter(f.id)}
              className="flex-1 min-w-fit px-4 py-2 rounded-xl text-sm font-heading font-semibold transition-all duration-200"
              style={{
                background:
                  activeFilter === f.id
                    ? "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.15), oklch(0.78 0.14 75 / 0.1))"
                    : "transparent",
                color:
                  activeFilter === f.id
                    ? "oklch(0.68 0.20 48)"
                    : "oklch(0.55 0.06 45)",
                border:
                  activeFilter === f.id
                    ? "1px solid oklch(0.68 0.20 48 / 0.35)"
                    : "1px solid transparent",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="space-y-4" data-ocid="booking-history.loading_state">
            {["sk1", "sk2", "sk3"].map((k) => (
              <BookingCardSkeleton key={k} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div
            data-ocid="booking-history.empty_state"
            className="text-center py-20 flex flex-col items-center gap-5"
          >
            <span className="text-6xl">🙏</span>
            <div>
              <h3
                className="font-heading text-xl font-bold mb-2"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {activeFilter === "all"
                  ? "आपने अभी कोई पूजा बुक नहीं की है"
                  : `No ${activeFilter} bookings found`}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {activeFilter === "all"
                  ? "You haven't booked any puja yet. Start your spiritual journey today!"
                  : "Try selecting a different filter to view your bookings."}
              </p>
            </div>
            {activeFilter === "all" ? (
              <Link to="/puja-booking">
                <Button
                  data-ocid="booking-history.book_puja_button"
                  className="px-8 py-2.5 rounded-full font-heading font-bold text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                    border: "none",
                  }}
                >
                  🙏 Book a Puja Now
                </Button>
              </Link>
            ) : (
              <button
                type="button"
                data-ocid="booking-history.clear_filter_button"
                onClick={() => setActiveFilter("all")}
                className="text-sm font-heading underline"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                View all bookings
              </button>
            )}
          </div>
        )}

        {/* Bookings list */}
        {!isLoading && filtered.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm font-body text-muted-foreground mb-4">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              booking{filtered.length !== 1 ? "s" : ""}
              {activeFilter !== "all" && ` · ${activeFilter}`}
            </p>

            {filtered.map((booking, idx) => (
              <div
                key={booking.id}
                data-ocid={`booking-history.item.${idx + 1}`}
                className="rounded-2xl border p-5 bg-card transition-all duration-200 hover:shadow-md"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.18)" }}
              >
                {/* Top accent */}
                <div
                  className="h-0.5 rounded-full mb-4"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.68 0.20 48), oklch(0.78 0.14 75))",
                  }}
                />

                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0 space-y-1.5">
                    {/* Puja type */}
                    <h3
                      className="font-heading font-bold text-base truncate"
                      style={{ color: "oklch(0.22 0.08 22)" }}
                    >
                      🙏 {booking.pujaType}
                    </h3>

                    {/* Temple + date */}
                    <p className="text-sm font-body text-muted-foreground">
                      🛕 Temple:{" "}
                      <span
                        className="font-medium"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        {booking.templeId}
                      </span>
                    </p>
                    <p className="text-sm font-body text-muted-foreground">
                      📅 Preferred Date:{" "}
                      <span className="font-medium text-foreground">
                        {booking.preferredDate}
                      </span>
                    </p>
                    <p className="text-sm font-body text-muted-foreground">
                      👤 Devotee:{" "}
                      <span className="font-medium text-foreground">
                        {booking.devoteeName}
                      </span>
                    </p>
                    {booking.specialWishes && (
                      <p className="text-xs font-body text-muted-foreground italic">
                        💬 &quot;{booking.specialWishes}&quot;
                      </p>
                    )}
                  </div>

                  {/* Status + date column */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <StatusBadge status={booking.status} />
                    <p className="text-xs text-muted-foreground font-body">
                      Booked: {formatDate(booking.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA footer */}
        <div
          className="mt-12 p-6 rounded-2xl border text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.97 0.02 75 / 0.6), oklch(0.96 0.03 50 / 0.4))",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <p
            className="font-heading font-semibold text-base mb-1"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            🌟 Book More Puja Sevas
          </p>
          <p className="text-sm text-muted-foreground font-body mb-4">
            Choose from a wide variety of puja sevas for health, wealth,
            prosperity, and peace.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/puja-booking">
              <Button
                data-ocid="booking-history.book_another_button"
                size="sm"
                className="rounded-full font-heading font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                  border: "none",
                }}
              >
                🙏 Book a Puja
              </Button>
            </Link>
            <Link to="/chadhava">
              <Button
                data-ocid="booking-history.chadhava_button"
                variant="outline"
                size="sm"
                className="rounded-full font-heading font-semibold"
                style={{
                  borderColor: "oklch(0.68 0.20 48 / 0.4)",
                  color: "oklch(0.68 0.20 48)",
                }}
              >
                🪔 Chadhava Offerings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
