import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Award, Clock, Languages, Star } from "lucide-react";
import { useState } from "react";
import type { AstrologerProfile as AstrologerProfileType } from "../backend";
import AppointmentBookingForm from "../components/AppointmentBookingForm";
import { useGetAstrologerProfile } from "../hooks/useQueries";

const PLACEHOLDER_PROFILES: Record<string, AstrologerProfileType> = {
  "ast-1": {
    id: "ast-1",
    name: "Pandit Rajesh Sharma",
    specializations: ["Vedic Astrology", "Kundli", "Vastu"],
    bio: "Pandit Rajesh Sharma is a renowned Vedic astrologer with over 20 years of experience. He has helped thousands of people navigate life challenges through the ancient wisdom of Jyotish. His expertise spans birth chart analysis, career guidance, marriage compatibility, and Vastu Shastra.",
    experienceYears: BigInt(20),
    rating: 4.9,
    perMinuteRate: 25,
    languages: ["Hindi", "English"],
    createdAt: BigInt(0),
  },
  "ast-2": {
    id: "ast-2",
    name: "Dr. Priya Nair",
    specializations: ["Tarot", "Numerology", "Palmistry"],
    bio: "Dr. Priya Nair is a certified tarot reader and numerologist who blends modern psychology with ancient divination arts. With 15 years of practice, she offers insightful readings that help clients understand their life patterns and make empowered decisions.",
    experienceYears: BigInt(15),
    rating: 4.8,
    perMinuteRate: 20,
    languages: ["English", "Malayalam"],
    createdAt: BigInt(0),
  },
  "ast-8": {
    id: "ast-8",
    name: "Ankit Batra",
    specializations: ["Numerology", "Business Numerology", "Lo Shu Grid"],
    bio: "Ankit Batra specializes in Business and Name Numerology, utilizing Chaldean methods, Lo Shu Grid analysis, and King & Queen Numbers (Moolank & Bhagyank) to improve career, business, and personal life. He offers personalized name corrections, mobile number analysis, and Lo Shu grid remedies.",
    experienceYears: BigInt(10),
    rating: 4.7,
    perMinuteRate: 18,
    languages: ["Hindi", "English"],
    createdAt: BigInt(0),
  },
};

export default function AstrologerProfile() {
  const { id } = useParams({ from: "/astrologer/$id" });
  const { data: profile, isLoading } = useGetAstrologerProfile(id);
  const [showBooking, setShowBooking] = useState(false);

  const displayProfile =
    profile || PLACEHOLDER_PROFILES[id] || PLACEHOLDER_PROFILES["ast-1"];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Skeleton className="h-64 rounded-2xl mb-6" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Link
        to="/astrologer"
        className="inline-flex items-center gap-2 text-sm font-heading mb-6 hover:underline"
        style={{ color: "oklch(0.68 0.20 48)" }}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Astrologers
      </Link>

      <div className="ornamental-border rounded-2xl p-6 md:p-8 bg-card mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div
            className="h-24 w-24 rounded-full flex items-center justify-center text-4xl flex-shrink-0 mx-auto md:mx-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.2), oklch(0.78 0.14 75 / 0.2))",
            }}
          >
            🧘
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1
              className="font-heading font-bold text-2xl mb-2"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              {displayProfile.name}
            </h1>
            <div className="flex items-center gap-1 justify-center md:justify-start mb-3">
              {Array.from({ length: 5 }, (_, i) => i).map((i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  style={{
                    fill:
                      i < Math.floor(displayProfile.rating)
                        ? "oklch(0.78 0.14 75)"
                        : "transparent",
                    color: "oklch(0.78 0.14 75)",
                  }}
                />
              ))}
              <span
                className="text-sm font-heading font-semibold ml-1"
                style={{ color: "oklch(0.55 0.16 60)" }}
              >
                {displayProfile.rating.toFixed(1)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              {displayProfile.specializations.map((s) => (
                <span
                  key={s}
                  className="text-xs px-3 py-1 rounded-full font-heading"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.1)",
                    color: "oklch(0.55 0.16 48)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm font-body text-muted-foreground">
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4" />{" "}
                {Number(displayProfile.experienceYears)} years experience
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> ₹{displayProfile.perMinuteRate}
                /min
              </span>
              <span className="flex items-center gap-1">
                <Languages className="h-4 w-4" />{" "}
                {displayProfile.languages.join(", ")}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setShowBooking(true)}
              className="px-8 py-3 rounded-full font-heading font-bold text-sm tracking-wide transition-all hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              📅 Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <h2
          className="font-heading font-bold text-lg mb-3"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          About
        </h2>
        <p
          className="font-body text-sm leading-relaxed"
          style={{ color: "oklch(0.30 0.06 30)" }}
        >
          {displayProfile.bio}
        </p>
      </div>

      {showBooking && (
        <div className="ornamental-border rounded-2xl p-6 bg-card">
          <h2
            className="font-heading font-bold text-lg mb-4"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            📅 Book Appointment with {displayProfile.name}
          </h2>
          <AppointmentBookingForm
            astrologerId={id}
            astrologerName={displayProfile.name}
            onSuccess={() => setShowBooking(false)}
          />
        </div>
      )}
    </div>
  );
}
