import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { MessageCircle, RefreshCw, Share2, Sparkles } from "lucide-react";
import { useState } from "react";
import WhatsAppShare from "../components/WhatsAppShare";
import {
  type TarotCard,
  drawThreeCards,
  getSynthesis,
} from "../data/tarotDeckData";
import { useLanguage } from "../hooks/useLanguage";
import { useCartStore } from "../stores/cartStore";

function tx(en: string, hi: string, language: string) {
  return language === "hi" ? hi : en;
}

const POSITIONS = [
  {
    label: "PAST",
    labelHi: "भूत",
    color: "from-amber-900/30 to-amber-800/20",
    border: "border-amber-700/40",
  },
  {
    label: "PRESENT",
    labelHi: "वर्तमान",
    color: "from-primary/20 to-accent/20",
    border: "border-primary/50",
  },
  {
    label: "FUTURE",
    labelHi: "भविष्य",
    color: "from-purple-900/30 to-purple-800/20",
    border: "border-purple-700/40",
  },
];

function FaceDownCard({ index }: { index: number }) {
  return (
    <div
      className="relative w-full aspect-[2/3] rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 flex flex-col items-center justify-center gap-2 shadow-lg overflow-hidden"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 8px, oklch(0.62 0.18 48 / 0.15) 8px, oklch(0.62 0.18 48 / 0.15) 10px)",
        }}
      />
      <div className="text-4xl animate-pulse">🃏</div>
      <p className="text-xs text-muted-foreground font-body">ॐ</p>
    </div>
  );
}

function CardReveal({
  card,
  position,
  positionIndex,
}: {
  card: TarotCard;
  position: (typeof POSITIONS)[0];
  positionIndex: number;
}) {
  const { language } = useLanguage();
  return (
    <div
      className={`rounded-xl border-2 ${position.border} bg-gradient-to-br ${position.color} p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700`}
      style={{ animationDelay: `${positionIndex * 0.2}s` }}
      data-ocid={`tarot.card_reveal.${positionIndex + 1}`}
    >
      {/* Position label */}
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className="text-xs font-display tracking-widest border-primary/50 text-primary"
        >
          {position.label}
        </Badge>
        <span className="text-xs text-muted-foreground font-body">
          ({position.labelHi})
        </span>
      </div>

      {/* Card face */}
      <div className="flex items-center gap-4">
        <div className="text-5xl shrink-0 w-16 h-16 flex items-center justify-center rounded-lg bg-card/60 border border-border/40 shadow">
          {card.emoji}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-body">
            {card.suit === "major"
              ? tx("Major Arcana", "मुख्य आर्काना", language)
              : tx(
                  `Suit of ${card.suit.charAt(0).toUpperCase() + card.suit.slice(1)}`,
                  `${card.suit} राशि`,
                  language,
                )}
          </p>
          <h3 className="text-lg font-display text-primary leading-tight">
            {card.name}
          </h3>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            {card.keywordUpright}
          </p>
        </div>
      </div>

      {/* Krishna's interpretation */}
      <div className="space-y-3">
        <div className="text-sm text-foreground/90 font-body leading-relaxed border-l-2 border-primary/40 pl-3">
          {card.gitaMeaning}
        </div>

        {card.gitaVerse && (
          <div className="bg-card/60 rounded-lg p-3 space-y-1">
            <p className="text-sm font-display text-primary/90 leading-relaxed">
              {card.gitaVerse}
            </p>
            <p className="text-xs text-muted-foreground font-body italic">
              {card.gitaVerseTranslation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TarotReading() {
  const { language } = useLanguage();
  const t = (en: string, hi: string) => tx(en, hi, language);
  const addItem = useCartStore((s) => s.addItem);

  const [intention, setIntention] = useState("");
  const [showPayModal, setShowPayModal] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [cards, setCards] = useState<[TarotCard, TarotCard, TarotCard] | null>(
    null,
  );
  const [readingDone, setReadingDone] = useState(false);

  function handleShuffleClick() {
    setShowPayModal(true);
  }

  function handlePay() {
    setShowPayModal(false);
    addItem({
      id: `tarot-reading-${Date.now()}`,
      name: t("Krishna's Tarot Reading", "कृष्ण की तारोट रीडिंग"),
      price: 100,
      category: "service",
      type: "service",
    });
    setIsShuffling(true);
    setTimeout(() => {
      const drawn = drawThreeCards();
      setCards(drawn);
      setIsShuffling(false);
      setReadingDone(true);
    }, 1500);
  }

  function handleDrawAgain() {
    setCards(null);
    setReadingDone(false);
    setIntention("");
    setShowPayModal(true);
  }

  const synthesis = cards ? getSynthesis(cards[0], cards[1], cards[2]) : "";
  const shareTitle = cards
    ? `✨ Krishna's Tarot Reading — My 3-Card Spread: ${cards[0].name} (Past), ${cards[1].name} (Present), ${cards[2].name} (Future). Seek your own guidance at Spiritual Connect!`
    : "Krishna's Tarot Reading — Spiritual Connect";

  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="bg-gradient-to-b from-card via-card/80 to-background border-b border-border/40 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 text-sm text-primary font-display">
            <Sparkles className="w-4 h-4" />
            {t("Krishna's Divine Guidance", "कृष्ण का दिव्य मार्गदर्शन")}
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-primary leading-tight">
            {t("Krishna's Tarot Reading", "कृष्ण की तारोट रीडिंग")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            {t(
              "Draw three cards from a full 78-card deck. Krishna will read your Past, Present, and Future — weaving them into a story of your journey.",
              "78-कार्ड डेक से तीन कार्ड निकालें। कृष्ण आपके भूत, वर्तमान और भविष्य को पढ़ेंगे।",
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground font-body">
            <span className="flex items-center gap-1.5">
              <span className="text-primary">🃏</span>{" "}
              {t("78 Cards", "78 कार्ड")}
            </span>
            <span className="text-primary/40">✦</span>
            <span className="flex items-center gap-1.5">
              <span className="text-primary">✦</span>{" "}
              {t("3-Card Spread", "3-कार्ड स्प्रेड")}
            </span>
            <span className="text-primary/40">✦</span>
            <span className="flex items-center gap-1.5">
              <span className="text-primary">ॐ</span>{" "}
              {t("Krishna's Interpretation", "कृष्ण की व्याख्या")}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
        {!readingDone && !isShuffling && (
          <section className="space-y-6" data-ocid="tarot.input_section">
            {/* Intention field */}
            <div className="space-y-2">
              <label
                className="block text-sm font-display text-foreground/80"
                htmlFor="intention"
              >
                {t(
                  "What's on your mind? (optional)",
                  "आपके मन में क्या है? (वैकल्पिक)",
                )}
              </label>
              <Textarea
                id="intention"
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                placeholder={t(
                  "e.g., Will I get the promotion? Is this relationship right for me?",
                  "जैसे, क्या मुझे पदोन्नति मिलेगी? क्या यह रिश्ता मेरे लिए सही है?",
                )}
                rows={3}
                className="bg-card border-border/60 font-body resize-none"
                data-ocid="tarot.intention_input"
              />
            </div>

            {/* Payment info + CTA */}
            <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground font-body">
                  {t(
                    "₹100 per reading • Secure payment via Razorpay",
                    "₹100 प्रति रीडिंग • Razorpay से सुरक्षित भुगतान",
                  )}
                </p>
                <p className="text-xs text-muted-foreground/70 font-body mt-0.5">
                  {t(
                    "Full 78-card Vedic Tarot • Krishna's interpretation of each card",
                    "पूरा 78-कार्ड वैदिक तारोट • प्रत्येक कार्ड की कृष्ण व्याख्या",
                  )}
                </p>
              </div>
              <Button
                type="button"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display px-8 shadow-lg"
                onClick={handleShuffleClick}
                data-ocid="tarot.shuffle_button"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {t("Shuffle & Draw Cards", "शफल करें और कार्ड निकालें")}
              </Button>
            </div>
          </section>
        )}

        {/* Shuffle animation — 3 face-down cards */}
        {isShuffling && (
          <section className="space-y-6" data-ocid="tarot.shuffling_state">
            <div className="text-center space-y-2">
              <div
                className="text-3xl animate-spin"
                style={{ animationDuration: "2s" }}
              >
                ☸️
              </div>
              <p className="text-muted-foreground font-body">
                {t(
                  "Krishna is drawing your cards…",
                  "कृष्ण आपके कार्ड निकाल रहे हैं…",
                )}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <FaceDownCard key={i} index={i} />
              ))}
            </div>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground font-body">
              {POSITIONS.map((p) => (
                <div key={p.label} className="text-center">
                  <p className="font-display text-primary text-xs tracking-widest">
                    {p.label}
                  </p>
                  <p className="text-xs">{p.labelHi}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reading results */}
        {readingDone && cards && (
          <>
            {/* 3-card spread */}
            <section className="space-y-5" data-ocid="tarot.reading_section">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-display text-primary">
                  {t("Your Reading", "आपकी रीडिंग")}
                </h2>
                {intention && (
                  <p className="text-sm text-muted-foreground font-body italic">
                    {t(`Regarding: "${intention}"`, `विषय: "${intention}"`)}
                  </p>
                )}
              </div>

              <div className="grid gap-5">
                {cards.map((card, idx) => (
                  <CardReveal
                    key={card.id}
                    card={card}
                    position={POSITIONS[idx]}
                    positionIndex={idx}
                  />
                ))}
              </div>
            </section>

            {/* Synthesis */}
            <section
              className="bg-gradient-to-br from-primary/10 via-accent/5 to-background rounded-xl border border-primary/30 p-6 space-y-4"
              data-ocid="tarot.synthesis_section"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">ॐ</span>
                <h2 className="text-xl font-display text-primary">
                  {t(
                    "Krishna's Story of Your Journey",
                    "कृष्ण की आपकी यात्रा की कहानी",
                  )}
                </h2>
              </div>
              <div className="space-y-4">
                {synthesis.split("\n\n").map((para, i) => (
                  <p
                    // biome-ignore lint/suspicious/noArrayIndexKey: paragraph order is stable
                    key={i}
                    className="text-sm text-foreground/90 font-body leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* Footer CTAs */}
            <section
              className="flex flex-col sm:flex-row gap-3 flex-wrap"
              data-ocid="tarot.cta_section"
            >
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-primary/40 text-primary hover:bg-primary/5 font-display"
                onClick={handleDrawAgain}
                data-ocid="tarot.draw_again_button"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("Draw Again (₹100)", "फिर से निकालें (₹100)")}
              </Button>

              <Link to="/ask-krishna" className="flex-1">
                <Button
                  type="button"
                  variant="default"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display"
                  data-ocid="tarot.ask_krishna_button"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t(
                    "Ask Krishna About Your Reading",
                    "रीडिंग के बारे में कृष्ण से पूछें",
                  )}
                </Button>
              </Link>

              <div className="flex-1">
                <WhatsAppShare title={shareTitle} className="w-full" />
              </div>
            </section>
          </>
        )}
      </div>

      {/* Payment Modal */}
      <Dialog open={showPayModal} onOpenChange={setShowPayModal}>
        <DialogContent
          className="max-w-sm w-full p-6 space-y-6"
          data-ocid="tarot.payment_dialog"
        >
          <div className="text-center space-y-3">
            <div className="text-5xl">🃏</div>
            <h2 className="text-xl font-display text-primary">
              {t("Krishna's Tarot Reading", "कृष्ण की तारोट रीडिंग")}
            </h2>
            <p className="text-3xl font-display text-foreground">₹100</p>
            <p className="text-sm text-muted-foreground font-body">
              {t(
                "Full 78-card spread • Past / Present / Future • Krishna's Gita-rooted interpretation",
                "पूरा 78-कार्ड स्प्रेड • भूत / वर्तमान / भविष्य • कृष्ण की गीता-आधारित व्याख्या",
              )}
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-border/60 font-body"
              onClick={() => setShowPayModal(false)}
              data-ocid="tarot.payment_cancel_button"
            >
              {t("Cancel", "रद्द करें")}
            </Button>
            <Button
              type="button"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-display"
              onClick={handlePay}
              data-ocid="tarot.payment_confirm_button"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {t("Pay ₹100", "₹100 भुगतान करें")}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground font-body">
            {t(
              "Secure payment via Razorpay • 7-day money-back guarantee",
              "Razorpay से सुरक्षित भुगतान • 7 दिन की मनी-बैक गारंटी",
            )}
          </p>
        </DialogContent>
      </Dialog>
    </main>
  );
}
