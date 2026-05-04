import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Filter, Phone, Search, Sparkles, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  PERSONALISED_CATEGORY_INFO,
  PERSONALISED_PRODUCTS,
  type PersonalisedCategory,
  type PersonalisedProduct,
} from "../data/personalisedProductsData";

const ALL_CATEGORIES: PersonalisedCategory[] = [
  "PENDANT",
  "KADA",
  "BRACELET",
  "PEN",
  "RING",
  "NECKLACE",
  "LOCKET",
  "KEYCHAIN",
  "OTHER",
];

function ProductCard({
  product,
  index,
}: { product: PersonalisedProduct; index: number }) {
  const catInfo = PERSONALISED_CATEGORY_INFO[product.category];
  const discount = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.07 }}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
      data-ocid={`personalised.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-muted/40 aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f5e9d0'/%3E%3Ctext x='50%25' y='45%25' text-anchor='middle' dominant-baseline='middle' font-size='52'%3E%E2%9C%A8%3C/text%3E%3Ctext x='50%25' y='63%25' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23b5651d'%3EPersonalised Gift%3C/text%3E%3C/svg%3E";
          }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-primary-foreground font-semibold text-base tracking-wide flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Personalise This
          </span>
        </div>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5">
              {discount}% OFF
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="outline" className="bg-card/90 text-xs">
              Out of Stock
            </Badge>
          )}
        </div>
        {product.manualCode && (
          <div className="absolute top-2 right-2">
            <Badge
              className="bg-amber-500/90 text-white text-xs flex items-center gap-1 px-2"
              data-ocid={`personalised.manual_code.${index + 1}`}
            >
              <Tag className="w-3 h-3" />
              {product.manualCode}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <Badge
          variant="secondary"
          className="self-start text-xs font-medium border border-primary/20 bg-primary/10 text-primary"
        >
          {catInfo.emoji} {catInfo.label}
        </Badge>

        <div>
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
            {product.name}
          </h3>
          {product.nameHindi && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {product.nameHindi}
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Customisation note */}
        <div className="bg-accent/30 border border-primary/10 rounded-lg p-2.5 text-xs text-foreground/80">
          <span className="font-medium text-primary">✏️ Customise:</span>{" "}
          {product.customisationNote}
        </div>

        {/* Price + CTA */}
        <div className="flex items-baseline gap-1.5 mt-auto">
          <span className="text-lg font-bold text-primary">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.mrp && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <Button
          type="button"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-semibold"
          disabled={!product.inStock}
          data-ocid={`personalised.customise_button.${index + 1}`}
        >
          <Sparkles className="w-4 h-4" />
          {product.inStock ? "Customise & Order" : "Out of Stock"}
        </Button>
      </div>
    </motion.div>
  );
}

export default function PersonalisedProducts() {
  const [activeCategory, setActiveCategory] = useState<
    PersonalisedCategory | "ALL"
  >("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = PERSONALISED_PRODUCTS;
    if (activeCategory !== "ALL")
      list = list.filter((p) => p.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.nameHindi ?? "").includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative bg-card border-b border-border overflow-hidden"
        data-ocid="personalised.hero_section"
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,currentColor 0,currentColor 1px,transparent 0,transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative container mx-auto px-4 py-14 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              <Sparkles className="w-4 h-4" />
              Handcrafted & Energised Just for You
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-3">
              Personalised
              <span className="text-primary"> Spiritual Gifts</span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-semibold mb-2">
              आपके लिए, आपकी ऊर्जा के साथ
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Each piece is personally customised, abhimantrit and energised
              with your name, intention and sacred symbols — making it uniquely
              yours.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-2 text-sm">
              <Tag className="w-4 h-4" />
              <span>
                Codes assigned by admin —{" "}
                <a
                  href="tel:+916366526901"
                  className="font-semibold underline underline-offset-2"
                >
                  contact us for custom orders
                </a>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-0 z-20 bg-card/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search personalised products…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 border-border"
                data-ocid="personalised.search_input"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveCategory("ALL")}
              className={`flex-none px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                activeCategory === "ALL"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
              data-ocid="personalised.filter.all"
            >
              ✨ All
            </button>
            {ALL_CATEGORIES.map((cat) => {
              const info = PERSONALISED_CATEGORY_INFO[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-none px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                  data-ocid={`personalised.filter.${cat.toLowerCase()}`}
                >
                  {info.emoji} {info.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-muted/30 min-h-[60vh]">
        <div className="container mx-auto px-4 py-8">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-4 text-center"
              data-ocid="personalised.empty_state"
            >
              <span className="text-6xl">🔍</span>
              <h2 className="text-xl font-semibold text-foreground">
                No products found
              </h2>
              <p className="text-muted-foreground text-sm max-w-sm">
                Try a different category or search term, or contact us for a
                fully custom creation.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setActiveCategory("ALL");
                  setQuery("");
                }}
                data-ocid="personalised.clear_filter_button"
              >
                Clear filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Separator />

      {/* How It Works */}
      <section
        className="bg-background py-14"
        data-ocid="personalised.how_it_works"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Your personalised spiritual gift in 4 simple steps
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(
              [
                {
                  step: "01",
                  icon: "🛒",
                  title: "Choose Product",
                  desc: "Browse and select the product you wish to personalise.",
                },
                {
                  step: "02",
                  icon: "✏️",
                  title: "Share Details",
                  desc: "Provide your name, photo, mantra, size, or other customisation details.",
                },
                {
                  step: "03",
                  icon: "🙏",
                  title: "Energisation",
                  desc: "Our expert performs abhimantrit puja with your name & sankalp.",
                },
                {
                  step: "04",
                  icon: "📦",
                  title: "Delivered to You",
                  desc: "Your personalised piece is beautifully packed and delivered.",
                },
              ] as const
            ).map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-xs font-bold text-primary mb-1">
                  STEP {item.step}
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        className="bg-primary/10 border-t border-primary/20 py-12"
        data-ocid="personalised.contact_cta"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Need a Fully Custom Creation?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Product codes are assigned by our admin team. Reach out to us and
              we will create something truly one-of-a-kind for you or your loved
              ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                type="button"
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                data-ocid="personalised.contact_button"
                asChild
              >
                <a href="tel:+916366526901">
                  <Phone className="w-4 h-4" />
                  Call Us: +91-6366526901
                </a>
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="gap-2"
                data-ocid="personalised.whatsapp_button"
                asChild
              >
                <a
                  href="https://wa.me/916366526901?text=I+want+to+order+a+personalised+product"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
