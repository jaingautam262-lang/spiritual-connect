import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  bookingWorkflowSteps,
  chadhavaSevas,
  chiefAdvisor,
  flowerMalaProducts,
  homePujas,
  priests,
  pujaItems,
  sankalpaSevas,
  subscriptionPackages,
} from "../data/pujaKaroData";
import { useCartStore } from "../stores/cartStore";

type Lang = "en" | "hi";

const SECTIONS = [
  { id: "sankalp", label: "Sankalp Seva", labelHi: "संकल्प सेवा" },
  { id: "chadhava", label: "Chadhava Seva", labelHi: "चढ़ावा सेवा" },
  { id: "home-poojas", label: "Home Poojas", labelHi: "घर पूजा" },
  { id: "puja-items", label: "Puja Items", labelHi: "पूजा सामग्री" },
  { id: "flowers", label: "Flowers & Mala", labelHi: "फूल और माला" },
];

export default function PoojaKaro() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeSection, setActiveSection] = useState("sankalp");
  const addItem = useCartStore((s) => s.addItem);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const sec of SECTIONS) {
        const el = sectionRefs.current[sec.id];
        if (el && el.offsetTop <= scrollPos) setActiveSection(sec.id);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="bg-gradient-to-br from-orange-900 via-amber-800 to-saffron-600 text-white py-12 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #7c2d12, #b45309, #d97706)",
        }}
      >
        <Badge className="bg-white/20 text-orange-100 border border-white/30 mb-3">
          🙏 PoojaKaro — Trusted Puja Services
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          {lang === "hi" ? "पूजा करो" : "PoojaKaro"}
        </h1>
        <p className="text-orange-100 text-lg mb-1">
          {lang === "hi"
            ? "देवता से जुड़ें, जीवन को सशक्त बनाएं"
            : "Connect with the Divine. Empower Your Life."}
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => setLang("en")}
            data-ocid="pujakaro.lang_toggle"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
              lang === "en"
                ? "bg-white text-amber-800"
                : "border border-white/50 text-white"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("hi")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
              lang === "hi"
                ? "bg-white text-amber-800"
                : "border border-white/50 text-white"
            }`}
          >
            हिं
          </button>
        </div>
      </div>

      {/* Sticky nav */}
      <nav className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto flex gap-1.5 py-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              data-ocid={`pujakaro.nav.${s.id}`}
              onClick={() => scrollTo(s.id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeSection === s.id
                  ? "bg-amber-600 text-white shadow"
                  : "border border-border text-foreground hover:bg-muted"
              }`}
            >
              {lang === "hi" ? s.labelHi : s.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        {/* Section 1 — Sankalp Seva */}
        <section
          id="sankalp"
          ref={(el) => {
            sectionRefs.current.sankalp = el;
          }}
          data-ocid="pujakaro.sankalp.section"
        >
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {lang === "hi" ? "संकल्प सेवा" : "Sankalp Seva"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {lang === "hi"
              ? "प्रमुख मंदिरों में आपके नाम के साथ पूजा"
              : "Puja performed at renowned temples in your name with complete Sankalp"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sankalpaSevas.map((seva, i) => (
              <Card key={seva.id} data-ocid={`pujakaro.sankalp.item.${i + 1}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-foreground">
                        {lang === "hi" ? seva.templeNameHindi : seva.templeName}
                      </h3>
                      <p className="text-sm text-amber-600 font-medium">
                        {lang === "hi" ? seva.deityHindi : seva.deity}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {seva.location}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-foreground text-lg">
                        ₹{seva.price.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {seva.duration} · {seva.priests} priests
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {(lang === "hi" ? seva.benefitsHindi : seva.benefits).map(
                      (b) => (
                        <li
                          key={b}
                          className="text-xs text-foreground flex items-center gap-1.5"
                        >
                          <span className="text-amber-500">✦</span> {b}
                        </li>
                      ),
                    )}
                  </ul>
                  <Button
                    type="button"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    data-ocid={`pujakaro.sankalp.book_button.${i + 1}`}
                    onClick={() => {
                      addItem({
                        id: seva.id,
                        name: `${seva.templeName} Seva`,
                        price: seva.price,
                        category: "Puja Seva",
                        type: "service",
                      });
                      toast.success(`${seva.templeName} Seva booked!`);
                    }}
                  >
                    {lang === "hi" ? "अभी बुक करें" : "Book Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 2 — Chadhava Seva */}
        <section
          id="chadhava"
          ref={(el) => {
            sectionRefs.current.chadhava = el;
          }}
          data-ocid="pujakaro.chadhava.section"
        >
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {lang === "hi" ? "चढ़ावा सेवा" : "Chadhava Seva"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {lang === "hi"
              ? "भगवान को प्रसाद और भोग अर्पण करें"
              : "Offer sacred items to the deity at the temple"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {chadhavaSevas.map((seva, i) => (
              <Card
                key={seva.id}
                data-ocid={`pujakaro.chadhava.item.${i + 1}`}
                className="border-amber-200"
              >
                <CardContent className="p-5">
                  <div className="flex justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-foreground">
                        {lang === "hi"
                          ? seva.offeringTypeHindi
                          : seva.offeringType}
                      </h3>
                      <p className="text-sm text-amber-600">
                        {lang === "hi" ? seva.templeHindi : seva.temple}
                      </p>
                    </div>
                    <p className="font-bold text-foreground text-lg flex-shrink-0">
                      ₹{seva.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {lang === "hi" ? seva.significanceHindi : seva.significance}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {seva.items.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-amber-500 text-amber-700 hover:bg-amber-50"
                    data-ocid={`pujakaro.chadhava.offer_button.${i + 1}`}
                    onClick={() => {
                      addItem({
                        id: seva.id,
                        name: seva.offeringType,
                        price: seva.price,
                        category: "Chadhava",
                        type: "service",
                      });
                      toast.success(`${seva.offeringType} added!`);
                    }}
                  >
                    {lang === "hi" ? "अभी अर्पण करें" : "Offer Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 3 — Home Poojas */}
        <section
          id="home-poojas"
          ref={(el) => {
            sectionRefs.current["home-poojas"] = el;
          }}
          data-ocid="pujakaro.home_poojas.section"
        >
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {lang === "hi" ? "घर पर पूजाएं" : "Popular Poojas at Home"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {lang === "hi"
              ? "अनुभवी पुजारियों द्वारा घर पर पूजा"
              : "Experienced priests come to your home. All samagri included."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {homePujas.map((puja, i) => (
              <Card
                key={puja.id}
                data-ocid={`pujakaro.home_puja.item.${i + 1}`}
              >
                <CardContent className="p-5">
                  <div className="flex justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-foreground">
                        {lang === "hi" ? puja.pujaNameHindi : puja.pujaName}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {puja.duration} · {puja.priests}{" "}
                        {lang === "hi" ? "पुजारी" : "priest(s)"}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-foreground">
                        ₹{puja.price.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] text-amber-700">
                        or ₹{Math.ceil(puja.price / 12)}/mo | EMI &gt;
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {(lang === "hi" ? puja.featuresHindi : puja.features).map(
                      (f) => (
                        <li
                          key={f}
                          className="text-xs text-foreground flex items-center gap-1.5"
                        >
                          <span className="text-green-500">✓</span> {f}
                        </li>
                      ),
                    )}
                  </ul>
                  <Button
                    type="button"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    data-ocid={`pujakaro.home_puja.book_button.${i + 1}`}
                    onClick={() => {
                      addItem({
                        id: puja.id,
                        name: puja.pujaName,
                        price: puja.price,
                        category: "Home Puja",
                        type: "service",
                      });
                      toast.success(`${puja.pujaName} booked!`);
                    }}
                  >
                    {lang === "hi" ? "अभी बुक करें" : "Book Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Booking Workflow */}
        <section
          className="bg-muted/40 rounded-2xl p-6"
          data-ocid="pujakaro.workflow.section"
        >
          <h2 className="text-xl font-bold text-foreground mb-5">
            {lang === "hi" ? "बुकिंग कैसे काम करती है?" : "How Booking Works"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bookingWorkflowSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl mx-auto mb-2">
                  {step.icon}
                </div>
                <p className="text-xs font-bold text-foreground">
                  {lang === "hi" ? step.titleHindi : step.title}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Chief Advisor + Priests */}
        <section data-ocid="pujakaro.priests.section">
          <h2 className="text-2xl font-bold text-foreground mb-5">
            {lang === "hi" ? "हमारे विशेषज्ञ" : "Our Expert Priests"}
          </h2>
          {/* Chief Advisor */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-5 flex items-start gap-4">
            <span className="text-5xl">🧙</span>
            <div>
              <Badge className="bg-amber-600 text-white mb-1">
                Chief Advisor
              </Badge>
              <h3 className="font-bold text-foreground text-lg">
                {lang === "hi" ? chiefAdvisor.nameHindi : chiefAdvisor.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {chiefAdvisor.experience} · {chiefAdvisor.qualification}
              </p>
              <p className="text-sm text-amber-700 italic mt-2">
                "{lang === "hi" ? chiefAdvisor.quoteHindi : chiefAdvisor.quote}"
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {priests.map((p, i) => (
              <div
                key={p.id}
                data-ocid={`pujakaro.priest.item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-4 text-center"
              >
                <span className="text-4xl">{p.imageEmoji}</span>
                <h4 className="font-semibold text-foreground text-sm mt-2">
                  {p.name}
                </h4>
                <p className="text-xs text-muted-foreground">{p.experience}</p>
                <p className="text-xs text-amber-600 mt-1 line-clamp-2">
                  {p.specialization}
                </p>
                <div className="flex items-center justify-center gap-0.5 mt-2">
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
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 — Puja Items */}
        <section
          id="puja-items"
          ref={(el) => {
            sectionRefs.current["puja-items"] = el;
          }}
          data-ocid="pujakaro.puja_items.section"
        >
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {lang === "hi" ? "पूजा सामग्री" : "Puja Items Shop"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {lang === "hi"
              ? "घर पूजा के लिए सब कुछ"
              : "Everything you need for your home puja"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {pujaItems.map((item, i) => (
              <div
                key={item.id}
                data-ocid={`pujakaro.puja_item.item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-3 text-center hover:shadow-sm transition-shadow"
              >
                <span className="text-3xl">{item.emoji}</span>
                <p className="text-xs font-semibold text-foreground mt-1 line-clamp-2">
                  {lang === "hi" ? item.nameHindi : item.name}
                </p>
                <p className="text-sm font-bold text-foreground mt-1">
                  ₹{item.price}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {item.description}
                </p>
                <Button
                  type="button"
                  size="sm"
                  className="mt-2 h-7 w-full text-[10px] bg-amber-600 hover:bg-amber-700 text-white"
                  data-ocid={`pujakaro.puja_item.add_button.${i + 1}`}
                  onClick={() => {
                    addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      category: "Puja Item",
                    });
                    toast.success(`${item.name} added!`);
                  }}
                >
                  <ShoppingCart size={10} className="mr-1" /> Add
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 — Flowers & Mala */}
        <section
          id="flowers"
          ref={(el) => {
            sectionRefs.current.flowers = el;
          }}
          data-ocid="pujakaro.flowers.section"
        >
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {lang === "hi" ? "फूल और माला सेवा" : "Flowers & Mala"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {lang === "hi"
              ? "ताज़े और सूखे फूल, माला, और सदस्यता पैकेज"
              : "Fresh flowers, dried flowers, and subscription packages for daily puja"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {flowerMalaProducts.map((fm, i) => (
              <div
                key={fm.id}
                data-ocid={`pujakaro.flower.item.${i + 1}`}
                className={`bg-card border rounded-xl p-3 hover:shadow-sm transition-shadow ${
                  fm.type === "fresh"
                    ? "border-green-200 bg-green-50/50"
                    : "border-amber-200 bg-amber-50/50"
                }`}
              >
                <Badge
                  variant="outline"
                  className={`text-[9px] mb-1 ${fm.type === "fresh" ? "border-green-400 text-green-700" : "border-amber-400 text-amber-700"}`}
                >
                  {fm.type === "fresh" ? "Fresh" : "Dry"}
                </Badge>
                <p className="text-xs font-semibold text-foreground line-clamp-2">
                  {lang === "hi" ? fm.nameHindi : fm.name}
                </p>
                <p className="text-sm font-bold text-foreground mt-1">
                  ₹{fm.price}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {lang === "hi" ? fm.descriptionHindi : fm.description}
                </p>
                <Button
                  type="button"
                  size="sm"
                  className="mt-2 h-7 w-full text-[10px] bg-green-700 hover:bg-green-800 text-white"
                  data-ocid={`pujakaro.flower.add_button.${i + 1}`}
                  onClick={() => {
                    addItem({
                      id: fm.id,
                      name: fm.name,
                      price: fm.price,
                      category: "Flower & Mala",
                    });
                    toast.success(`${fm.name} added!`);
                  }}
                >
                  <ShoppingCart size={10} className="mr-1" /> Add
                </Button>
              </div>
            ))}
          </div>

          {/* Subscription Packages */}
          <h3 className="text-lg font-bold text-foreground mb-3">
            {lang === "hi" ? "सदस्यता पैकेज" : "Subscription Packages"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionPackages.map((pkg, i) => (
              <div
                key={pkg.id}
                data-ocid={`pujakaro.subscription.item.${i + 1}`}
                className={`border rounded-2xl p-5 relative ${
                  pkg.popular
                    ? "border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md"
                    : "border-border bg-card"
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white">
                    Most Popular
                  </Badge>
                )}
                <h4 className="font-bold text-foreground">
                  {lang === "hi" ? pkg.nameHindi : pkg.name}
                </h4>
                <p className="text-2xl font-bold text-foreground mt-1">
                  ₹{pkg.price.toLocaleString("en-IN")}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}
                    /{pkg.period}
                  </span>
                </p>
                <ul className="mt-3 space-y-1">
                  {pkg.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-foreground flex items-center gap-1.5"
                    >
                      <span className="text-green-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  className={`w-full mt-4 ${
                    pkg.popular
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                  data-ocid={`pujakaro.subscription.subscribe_button.${i + 1}`}
                  onClick={() =>
                    toast.info(
                      "Contact us on WhatsApp to subscribe: +91 99999 00000",
                    )
                  }
                >
                  {lang === "hi" ? "सदस्यता लें" : "Subscribe"}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Post */}
        <section data-ocid="pujakaro.blog.section">
          <Separator className="mb-8" />
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <Badge className="bg-amber-100 text-amber-800 border-amber-300 mb-3">
              📖 Featured Article
            </Badge>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {lang === "hi"
                ? "मूल मंत्र जाप के फायदे"
                : "Benefits of Mool Mantra Jaap"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {lang === "hi"
                ? "मूल मंत्र जाप एक शक्तिशाली आध्यात्मिक अभ्यास है जो मन को शांत करता है, आत्मा को जागृत करता है और जीवन में सकारात्मक ऊर्जा लाता है।"
                : "Mool Mantra Jaap is a powerful spiritual practice that calms the mind, awakens the soul, and brings positive energy into your life. Daily chanting for 108 times creates a divine shield around the practitioner."}
            </p>
            <Button
              type="button"
              variant="outline"
              className="border-amber-500 text-amber-700 hover:bg-amber-100"
              data-ocid="pujakaro.blog.read_button"
              onClick={() => {
                window.location.href = "/blog";
              }}
            >
              {lang === "hi" ? "पूरा पढ़ें →" : "Read Full Article →"}
            </Button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-amber-950 text-white py-6 px-4 text-center mt-8">
        <p className="text-amber-300 font-semibold">
          PoojaKaro — Divine Services
        </p>
        <p className="text-xs text-amber-200/70 mt-1">
          {lang === "hi"
            ? "पूजा बुकिंग के लिए व्हाट्सएप: +91 99999 00000"
            : "For puja bookings, WhatsApp: +91 99999 00000"}
        </p>
        <p className="text-xs text-amber-200/50 mt-1">
          All rituals performed as per Vedic tradition by experienced priests
        </p>
      </div>
    </div>
  );
}
