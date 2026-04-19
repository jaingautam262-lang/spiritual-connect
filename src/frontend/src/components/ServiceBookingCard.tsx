import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ServiceBookingCardProps {
  serviceName: string;
  description: string;
  duration: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  icon?: string;
  badge?: string;
  onBookNow: () => void;
  language?: "en" | "hi";
}

const STAR_INDICES = [0, 1, 2, 3, 4];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {STAR_INDICES.map((i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5"
          style={{
            color:
              i < Math.floor(rating)
                ? "oklch(0.68 0.20 48)"
                : "oklch(0.82 0.04 80)",
            fill:
              i < Math.floor(rating) ? "oklch(0.68 0.20 48)" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

export default function ServiceBookingCard({
  serviceName,
  description,
  duration,
  price,
  rating,
  reviewCount,
  icon,
  badge,
  onBookNow,
  language = "en",
}: ServiceBookingCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        background: "oklch(0.99 0.008 80)",
        border: "1px solid oklch(0.78 0.14 75 / 0.2)",
      }}
      data-ocid="service.card"
    >
      {/* Card Header */}
      <div
        className="p-4 flex items-start gap-3"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.08), oklch(0.78 0.14 75 / 0.05))",
        }}
      >
        {icon && (
          <span
            className="text-3xl shrink-0 w-12 h-12 flex items-center justify-center rounded-xl"
            style={{ background: "oklch(0.68 0.20 48 / 0.12)" }}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-heading font-bold text-base leading-snug"
              style={{ color: "oklch(0.25 0.10 25)" }}
            >
              {serviceName}
            </h3>
            {badge && (
              <Badge
                className="shrink-0 text-xs font-heading font-semibold"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.15)",
                  color: "oklch(0.40 0.16 40)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.3)",
                }}
              >
                {badge}
              </Badge>
            )}
          </div>

          {rating !== undefined && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={rating} />
              <span
                className="text-xs font-body"
                style={{ color: "oklch(0.55 0.06 50)" }}
              >
                {rating.toFixed(1)}
                {reviewCount !== undefined && (
                  <span> ({reviewCount.toLocaleString("en-IN")})</span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        <p
          className="text-sm font-body leading-relaxed line-clamp-3"
          style={{ color: "oklch(0.45 0.06 50)" }}
        >
          {description}
        </p>

        <div className="flex items-center gap-3 mt-auto">
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading"
            style={{
              background: "oklch(0.55 0.16 220 / 0.08)",
              color: "oklch(0.38 0.12 220)",
              border: "1px solid oklch(0.55 0.16 220 / 0.2)",
            }}
          >
            🕐 {duration}
          </div>
        </div>

        {/* Price + CTA */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: "oklch(0.78 0.14 75 / 0.15)" }}
        >
          <div>
            <span
              className="font-heading font-bold text-xl"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              ₹{price.toLocaleString("en-IN")}
            </span>
            <span
              className="text-xs font-body ml-1"
              style={{ color: "oklch(0.60 0.04 50)" }}
            >
              onwards
            </span>
          </div>

          <Button
            onClick={onBookNow}
            className="font-heading font-semibold text-sm px-5 py-2 rounded-full transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              border: "none",
            }}
            data-ocid="service.book_now_button"
          >
            {language === "hi" ? "अभी बुक करें" : "Book Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
