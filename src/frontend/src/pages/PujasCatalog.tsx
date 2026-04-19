import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Clock, Search, Star } from "lucide-react";
import { useState } from "react";
import PujaBookingForm from "../components/PujaBookingForm";
import { type PujaProduct, pujaProducts } from "../data/pujaData";

const CATEGORIES = [
  "All",
  "Grah Shanti",
  "Havan",
  "Vrat & Puja",
  "Sanskaar",
  "Dosh Nivaran",
  "Manokamna",
];

const FAQ_ITEMS = [
  {
    q: "What items do I need to arrange for the puja?",
    a: "Our pandit brings all necessary samagri. You just need a clean space and a lamp (diya).",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 3 days in advance for regular pujas, 7 days for havans.",
  },
  {
    q: "Can I reschedule?",
    a: "Yes, rescheduling is allowed up to 24 hours before the scheduled time.",
  },
  {
    q: "Do you perform pujas outside listed cities?",
    a: "We perform online pujas across India and globally via video stream.",
  },
  {
    q: "How experienced are your pandits?",
    a: "All our pandits have 10+ years of experience in Vedic rituals.",
  },
];

function PujaCard({
  puja,
  onBookNow,
}: {
  puja: PujaProduct;
  onBookNow: (p: PujaProduct) => void;
}) {
  return (
    <Card
      className="group flex flex-col overflow-hidden border-border hover:shadow-md transition-shadow duration-200"
      data-ocid={`puja.catalog.card.${puja.id}`}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.68 0.20 48), oklch(0.78 0.14 75))",
        }}
      />

      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Badge + title */}
        <div>
          <Badge
            className="mb-2 text-xs font-heading font-semibold"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              color: "oklch(0.45 0.16 42)",
              border: "1px solid oklch(0.68 0.20 48 / 0.3)",
            }}
          >
            {puja.category}
          </Badge>
          <h3
            className="font-heading font-bold text-base leading-snug line-clamp-2"
            style={{ color: "oklch(0.22 0.08 22)" }}
          >
            {puja.title}
          </h3>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs font-body">
          <span
            className="flex items-center gap-1"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-semibold">{puja.rating}</span>
            <span style={{ color: "oklch(0.60 0.04 50)" }}>
              ({puja.reviewCount})
            </span>
          </span>
          <span
            className="flex items-center gap-1"
            style={{ color: "oklch(0.55 0.06 50)" }}
          >
            <Clock className="h-3.5 w-3.5" />
            {puja.duration}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm font-body leading-relaxed flex-1 line-clamp-2"
          style={{ color: "oklch(0.45 0.05 40)" }}
        >
          {puja.shortDescription}
        </p>

        {/* Deity */}
        <p
          className="text-xs font-heading font-medium"
          style={{ color: "oklch(0.58 0.12 48)" }}
        >
          🪔 {puja.deity}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span
            className="font-heading font-bold text-lg"
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

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Link
            to="/pujas-catalog/$id"
            params={{ id: puja.id }}
            className="flex-1"
            data-ocid={`puja.catalog.know_more.${puja.id}`}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full font-heading text-xs gap-1 border-border hover:border-primary hover:text-primary transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Know More
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={() => onBookNow(puja)}
            className="flex-1 font-heading font-semibold text-xs text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              border: "none",
            }}
            data-ocid={`puja.catalog.book_now.${puja.id}`}
          >
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function PujasCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookingPuja, setBookingPuja] = useState<PujaProduct | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = pujaProducts.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.deity.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleBookNow = (puja: PujaProduct) => {
    setBookingPuja(puja);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 22) 0%, oklch(0.30 0.10 28) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-sm font-heading font-semibold"
            style={{
              background: "oklch(0.68 0.20 48 / 0.2)",
              color: "oklch(0.88 0.12 70)",
            }}
          >
            🙏 Online Puja Services
          </div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "oklch(0.94 0.025 80)" }}
          >
            Online Puja &amp; Yajna Services
          </h1>
          <p
            className="font-body text-base max-w-2xl mx-auto"
            style={{ color: "oklch(0.78 0.04 70)" }}
          >
            Book sacred rituals performed by experienced pandits from the
            comfort of your home
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mt-6">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.68 0.20 48)" }}
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search puja, deity, or category..."
              className="pl-11 h-11 rounded-full border-0 bg-card font-body text-sm shadow-md"
              style={{ color: "oklch(0.25 0.08 25)" }}
              data-ocid="puja.catalog.search_input"
            />
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {[
              { label: "Pujas Available", value: `${pujaProducts.length}+` },
              { label: "Expert Pandits", value: "50+" },
              { label: "Happy Devotees", value: "10,000+" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-heading font-bold text-xl"
                  style={{ color: "oklch(0.88 0.14 70)" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs font-body"
                  style={{ color: "oklch(0.70 0.04 65)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div
        className="sticky top-0 z-10 bg-card border-b border-border shadow-sm"
        data-ocid="puja.catalog.category_filter"
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-4 py-1.5 rounded-full font-heading font-semibold text-sm transition-all"
              style={{
                background:
                  activeCategory === cat
                    ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                    : "transparent",
                color: activeCategory === cat ? "white" : "oklch(0.45 0.10 40)",
                border: `1.5px solid ${activeCategory === cat ? "transparent" : "oklch(0.78 0.14 75 / 0.4)"}`,
              }}
              data-ocid={`puja.catalog.filter.${cat.replace(/\s+/g, "_").toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-5">
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.55 0.06 50)" }}
          >
            <span
              className="font-semibold"
              style={{ color: "oklch(0.30 0.10 30)" }}
            >
              {filtered.length}
            </span>{" "}
            {activeCategory === "All" ? "services" : `${activeCategory} pujas`}{" "}
            found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div
            className="text-center py-20"
            data-ocid="puja.catalog.empty_state"
          >
            <p className="text-4xl mb-4">🙏</p>
            <p
              className="font-heading font-semibold text-lg"
              style={{ color: "oklch(0.35 0.10 30)" }}
            >
              No pujas found
            </p>
            <p
              className="font-body text-sm mt-2"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              Try a different search term or category
            </p>
            <Button
              variant="outline"
              className="mt-4 font-heading"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((puja) => (
              <PujaCard key={puja.id} puja={puja} onBookNow={handleBookNow} />
            ))}
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-heading font-bold text-2xl text-center mb-8"
            style={{ color: "oklch(0.22 0.08 22)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, faqIdx) => (
              <div
                key={item.q}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.25)" }}
                data-ocid={`puja.catalog.faq.${faqIdx}`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-4 text-left font-heading font-semibold text-sm"
                  style={{
                    color: "oklch(0.28 0.10 28)",
                    background: "oklch(0.99 0.008 80)",
                  }}
                  onClick={() => setOpenFaq(openFaq === faqIdx ? null : faqIdx)}
                  aria-expanded={openFaq === faqIdx}
                >
                  <span>{item.q}</span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 transition-transform duration-200"
                    style={{
                      color: "oklch(0.68 0.20 48)",
                      transform: openFaq === faqIdx ? "rotate(90deg)" : "none",
                    }}
                  />
                </button>
                {openFaq === faqIdx && (
                  <div
                    className="px-4 pb-4 text-sm font-body leading-relaxed"
                    style={{
                      color: "oklch(0.45 0.05 45)",
                      background: "oklch(0.97 0.012 80)",
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section className="py-12 px-4 bg-background">
        <div
          className="max-w-2xl mx-auto text-center rounded-2xl p-8 border"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 22 / 0.03), oklch(0.68 0.20 48 / 0.06))",
            borderColor: "oklch(0.68 0.20 48 / 0.25)",
          }}
        >
          <p className="text-2xl mb-3">🕉️</p>
          <h2
            className="font-heading font-bold text-xl mb-2"
            style={{ color: "oklch(0.22 0.08 22)" }}
          >
            Need a Custom Puja Package?
          </h2>
          <p
            className="font-body text-sm mb-6 leading-relaxed"
            style={{ color: "oklch(0.50 0.05 45)" }}
          >
            We can arrange customized puja services for special occasions,
            corporate events, or specific requirements. Our expert pandits can
            guide you through the process.
          </p>
          <a
            href="mailto:pujas@spiritualconnect.in"
            data-ocid="puja.catalog.custom_cta"
          >
            <Button
              className="font-heading font-bold px-8 py-5 rounded-full text-white"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.16 35))",
                border: "none",
              }}
            >
              Contact Us for Custom Packages
            </Button>
          </a>
        </div>
      </section>

      {/* Booking Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-0"
          style={{ background: "oklch(0.97 0.015 85)" }}
          data-ocid="puja.catalog.booking_modal"
        >
          <DialogHeader className="p-5 pb-0">
            <DialogTitle
              className="font-heading text-lg font-bold"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              {bookingPuja ? `Book — ${bookingPuja.title}` : "Book a Puja"}
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
