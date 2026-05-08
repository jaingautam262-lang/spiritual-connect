import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  dhwaniAstroCollections,
  dhwaniFeaturedProducts,
  dhwaniTestimonials,
  dhwaniTrustPillars,
} from "../data/dhwaniAstroPageData";
import { useCartStore } from "../stores/cartStore";

type Lang = "en" | "hi";

export default function DhwaniAstroLanding() {
  const [lang, setLang] = useState<Lang>("en");
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (p: {
    id: string;
    name: string;
    price: number;
    category: string;
  }) => {
    addItem({ id: p.id, name: p.name, price: p.price, category: p.category });
    toast.success(`${p.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        data-ocid="dhwani.hero"
        className="relative bg-gradient-to-br from-amber-950 via-orange-900 to-amber-800 text-white py-20 px-4 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="bg-amber-400/20 text-amber-200 border border-amber-400/30 mb-4">
            🔮 Dhwani Astro — Exclusive Store
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-3">
            {lang === "hi" ? "ध्वनि एस्ट्रो" : "Dhwani Astro"}
          </h1>
          <p className="text-xl text-amber-200 mb-1">
            {lang === "hi"
              ? "क्रिस्टल एनर्जी फॉर लाइफ"
              : "Crystal Energy for Life"}
          </p>
          <p className="text-amber-300/80 text-base mb-6">
            {lang === "hi"
              ? "प्राण प्रतिष्ठित उत्पाद | असली पत्थर | तेज़ डिलीवरी"
              : "Pran Pratistha Energized Products · Real Stones · Fast Delivery"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8"
              data-ocid="dhwani.hero_cta"
              onClick={() => {
                window.location.href = "/dhwani-shop";
              }}
            >
              {lang === "hi" ? "अभी खरीदें" : "Shop All Products"}
            </Button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLang("en")}
                data-ocid="dhwani.lang_toggle"
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  lang === "en"
                    ? "bg-white text-amber-800"
                    : "border border-white/50 text-white hover:bg-white/10"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  lang === "hi"
                    ? "bg-white text-amber-800"
                    : "border border-white/50 text-white hover:bg-white/10"
                }`}
              >
                हिं
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust pillars */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {dhwaniTrustPillars.map((p) => (
            <div key={p.title} className="flex items-start gap-2">
              <span className="text-2xl">{p.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground leading-tight">
                  {lang === "hi" ? p.titleHindi : p.title}
                </p>
                <p className="text-[10px] text-muted-foreground leading-snug">
                  {lang === "hi" ? p.descHindi : p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">
        {/* Collections Grid */}
        <section data-ocid="dhwani.collections.section">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {lang === "hi" ? "हमारे संग्रह" : "Our Collections"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {lang === "hi"
              ? "हर जीवन पहलू के लिए क्रिस्टल ऊर्जा"
              : "Crystal energy for every aspect of life"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {dhwaniAstroCollections.map((col, i) => (
              <a
                key={col.id}
                href={`/dhwani-shop?category=${col.categoryParam}`}
                data-ocid={`dhwani.collection.item.${i + 1}`}
                className={`bg-gradient-to-br ${col.color} border border-border rounded-2xl p-4 text-center hover:shadow-md transition-shadow cursor-pointer group`}
              >
                <span className="text-3xl block mb-2">{col.emoji}</span>
                <p className="text-xs font-semibold text-foreground leading-tight">
                  {lang === "hi" ? col.nameHindi : col.name}
                </p>
                <Badge variant="secondary" className="mt-2 text-[10px] px-1">
                  {col.count} {lang === "hi" ? "उत्पाद" : "items"}
                </Badge>
                <p className="text-[10px] text-amber-700 font-medium mt-1 group-hover:underline">
                  {lang === "hi" ? "देखें →" : "Explore →"}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section data-ocid="dhwani.featured.section">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {lang === "hi" ? "चुनिंदा उत्पाद" : "Featured Products"}
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            {lang === "hi"
              ? "ग्राहकों की पसंदीदा चीज़ें"
              : "Customer favourites — shop our best-sellers"}
          </p>
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
              {dhwaniFeaturedProducts.map((p, i) => (
                <div
                  key={p.id}
                  data-ocid={`dhwani.featured.item.${i + 1}`}
                  className="w-48 flex-shrink-0 bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 h-28 flex items-center justify-center relative">
                    <span className="text-4xl">{p.emoji}</span>
                    {p.badge && (
                      <Badge className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[9px] px-1.5">
                        {p.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">
                      {lang === "hi" ? p.nameHindi : p.name}
                    </p>
                    <div className="flex items-center gap-0.5">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star
                          key={s}
                          size={10}
                          className={
                            s < Math.floor(p.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground/30"
                          }
                        />
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {p.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-foreground">
                        ₹{p.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] text-muted-foreground line-through">
                        ₹{p.mrp.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="w-full h-7 text-[10px] bg-amber-600 hover:bg-amber-700 text-white"
                      data-ocid={`dhwani.featured.add_button.${i + 1}`}
                      onClick={() => handleAdd(p)}
                    >
                      <ShoppingCart size={10} className="mr-1" /> Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section data-ocid="dhwani.testimonials.section">
          <h2 className="text-2xl font-bold text-foreground mb-5">
            {lang === "hi" ? "ग्राहक समीक्षाएं" : "What Our Customers Say"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dhwaniTestimonials.map((t, i) => (
              <Card key={t.id} data-ocid={`dhwani.review.item.${i + 1}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-0.5 mb-2">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star
                        key={s}
                        size={13}
                        className={
                          s < t.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground italic mb-3">
                    "{t.review}"
                  </p>
                  <Separator className="mb-2" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {t.city} · {t.date}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {t.product}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Contact Footer */}
      <div className="bg-amber-950 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-amber-300 mb-2">📍 Contact Us</h3>
            <p className="text-sm text-amber-100">
              Dhwani Astro — Crystal Energy for Life
            </p>
            <p className="text-xs text-amber-200/70 mt-1">📞 +91 99999 00000</p>
            <p className="text-xs text-amber-200/70">✉️ info@dhwaniastro.com</p>
            <p className="text-xs text-amber-200/70">⏰ Mon–Sat: 9 AM – 7 PM</p>
          </div>
          <div>
            <h3 className="font-bold text-amber-300 mb-2">🔗 Quick Links</h3>
            <div className="space-y-1">
              {[
                "All Products",
                "Vastu Products",
                "Crystal Trees",
                "Sacred Yantras",
                "About Us",
              ].map((l) => (
                <a
                  key={l}
                  href="/dhwani-shop"
                  className="block text-xs text-amber-200/70 hover:text-amber-200 transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-amber-300 mb-2">💬 WhatsApp Us</h3>
            <p className="text-xs text-amber-200/70 mb-3">
              For order queries, consultations, and custom products
            </p>
            <Button
              type="button"
              data-ocid="dhwani.whatsapp_button"
              className="bg-green-600 hover:bg-green-500 text-white text-sm"
              onClick={() =>
                window.open("https://wa.me/919999900000", "_blank")
              }
            >
              📱 WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
