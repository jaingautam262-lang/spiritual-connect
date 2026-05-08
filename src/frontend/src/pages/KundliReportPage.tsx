import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { Check, Loader2, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateStripeSession } from "../hooks/useQueries";

const STEPS = [
  {
    n: 1,
    title: "Enter your information",
    desc: "Fill the form with your birth details",
  },
  {
    n: 2,
    title: "Experts create your Kundli",
    desc: "Our Vedic astrologers prepare your report",
  },
  {
    n: 3,
    title: "Receive on WhatsApp",
    desc: "Get your Kundli report in 2 days",
  },
];

const WHAT_INSIDE = [
  {
    icon: "🔍",
    title: "Analysis of flaws and periods",
    desc: "Identify major flaws, period durations, and simple remedies",
  },
  {
    icon: "🌟",
    title: "All yoga reports",
    desc: "Discover the yogas in your kundli that affect wealth, career, and relationships",
  },
  {
    icon: "💎",
    title: "Gemstone recommendations",
    desc: "Personalised gemstone guidance based on your kundli report",
  },
  {
    icon: "🕎",
    title: "Puja recommendations",
    desc: "Suggestions for pujas and rituals to balance planetary influences",
  },
  {
    icon: "📅",
    title: "Monthly predictions (1 year)",
    desc: "Month-by-month guidance for the coming year",
  },
  {
    icon: "📊",
    title: "Strength graph",
    desc: "Visual charts showing the strength and influence of the planets",
  },
];

const WHO_SHOULD = [
  {
    n: 1,
    label: "Students",
    desc: "Who want clarity on their strengths, academic path, and future career direction",
  },
  {
    n: 2,
    label: "Job seekers",
    desc: "Who are struggling to find the right opportunity or succeed in competitive exams",
  },
  {
    n: 3,
    label: "Business owners",
    desc: "Who are facing losses, uncertain decisions, or confusion about the right timing",
  },
  {
    n: 4,
    label: "Couples",
    desc: "Who are dealing with relationship challenges or delays in marriage",
  },
  {
    n: 5,
    label: "Parents",
    desc: "Who want clarity on their child's future, strengths, and right direction",
  },
];

const WHY = [
  {
    icon: "⏰",
    title: "Right Time & Perfect Timing",
    desc: "Know when to act for the best outcomes — marriage, career, or key life decisions",
  },
  {
    icon: "🔄",
    title: "Break the Cycle of Setbacks",
    desc: "Understand the real reasons behind repeated failures and move forward with clarity",
  },
  {
    icon: "💎",
    title: "Right Gemstone, Right Remedies",
    desc: "Avoid guesswork — discover what truly works through your birth chart",
  },
];

const PLAN_FEATURES = [
  "Key Life Predictions",
  "Remedies like Gemstone, Rudraksha & Mantras",
  "Written in Simple, Easy-to-Understand Language",
  "Ask 1 Personal Question to Expert",
  "Get Real-Time Guidance & Remedies Tailored to Birth Chart",
  "1-on-1 Private Consultation (20 min)",
  "Priority Support (Post-Consultation)",
];

const PLANS = [
  {
    id: "basic",
    name: "Premium Personalized Kundali",
    price: 299,
    original: 1100,
    delivery: "PDF Report (Email + WhatsApp)",
    features: [true, true, true, false, false, false, false],
  },
  {
    id: "premium",
    name: "Premium Kundali + 1:1 Consultation",
    price: 1399,
    original: 5699,
    delivery: "PDF Report + Live Consultation",
    features: [true, true, true, true, true, true, true],
  },
];

export default function KundliReportPage() {
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [submitted, _setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
    birthTime: "",
    birthPlace: "",
    language: "",
  });
  const createStripeSession = useCreateStripeSession();

  // Detect ?success=true return from Stripe
  const searchParams = new URLSearchParams(window.location.search);
  const isPaymentSuccess = searchParams.get("success") === "true";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.dob) {
      toast.error("Please fill all required fields");
      return;
    }
    const plan = PLANS.find((p) => p.id === selectedPlan);
    const amount = plan?.price ?? 499;
    try {
      const url = await createStripeSession.mutateAsync({
        productType: "kundli",
        amount,
        metadata: JSON.stringify({ ...form, plan: selectedPlan }),
      });
      window.location.href = url;
    } catch {
      toast.error("भुगतान में समस्या आई, पुनः प्रयास करें");
    }
  }

  // Show success confirmation if returned from Stripe with ?success=true
  if (isPaymentSuccess || submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "oklch(0.12 0.04 30)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-10 text-center max-w-md w-full"
          style={{
            background: "oklch(0.18 0.06 30)",
            border: "1px solid oklch(0.55 0.18 140 / 0.4)",
          }}
          data-ocid="kundli.success_state"
        >
          <div className="text-6xl mb-4">🌟</div>
          <h3
            className="text-2xl font-bold mb-3"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "Cinzel, serif",
            }}
          >
            भुगतान सफल!
          </h3>
          <p className="text-lg mb-2" style={{ color: "oklch(0.65 0.04 65)" }}>
            आपकी कुंडली 2 दिनों में WhatsApp पर भेजी जाएगी
          </p>
          <p className="text-sm" style={{ color: "oklch(0.50 0.04 55)" }}>
            हमारे वैदिक ज्योतिषी आपकी रिपोर्ट तैयार कर रहे हैं। धन्यवाद!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.04 30)" }}>
      {/* Hero */}
      <div
        className="py-16 px-4 text-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.16 0.07 28) 0%, oklch(0.20 0.09 40) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-5xl mb-4">🌌</div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "Cinzel, serif",
            }}
          >
            Premium Personalised Kundli Report
          </h1>
          <p className="text-lg mb-6" style={{ color: "oklch(0.70 0.05 70)" }}>
            Expert-crafted Janam Kundli delivered to your WhatsApp in 2 days
          </p>
          {/* 3 Steps */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="rounded-xl p-4 text-center"
                style={{
                  background: "oklch(0.18 0.07 30)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2"
                  style={{ background: "oklch(0.62 0.18 48)", color: "white" }}
                >
                  {s.n}
                </div>
                <div
                  className="text-xs font-semibold mb-1"
                  style={{ color: "oklch(0.82 0.05 75)" }}
                >
                  {s.title}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.04 60)" }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Form + What inside */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-6 space-y-5"
              style={{
                background: "oklch(0.18 0.06 30)",
                border: "1px solid oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              <h2
                className="text-xl font-bold"
                style={{
                  color: "oklch(0.78 0.14 75)",
                  fontFamily: "Cinzel, serif",
                }}
              >
                Enter Your Information
              </h2>

              <div>
                <Label style={{ color: "oklch(0.75 0.05 70)" }}>
                  Full Name *
                </Label>
                <Input
                  data-ocid="kundli.name_input"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1"
                  style={{
                    background: "oklch(0.14 0.04 28)",
                    border: "1px solid oklch(0.32 0.06 35)",
                    color: "oklch(0.88 0.04 75)",
                  }}
                />
              </div>

              <div>
                <Label style={{ color: "oklch(0.75 0.05 70)" }}>
                  Phone Number *
                </Label>
                <div className="flex gap-2 mt-1">
                  <div
                    className="flex items-center px-3 rounded-lg text-sm"
                    style={{
                      background: "oklch(0.14 0.04 28)",
                      border: "1px solid oklch(0.32 0.06 35)",
                      color: "oklch(0.72 0.04 65)",
                    }}
                  >
                    +91
                  </div>
                  <Input
                    data-ocid="kundli.phone_input"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    style={{
                      background: "oklch(0.14 0.04 28)",
                      border: "1px solid oklch(0.32 0.06 35)",
                      color: "oklch(0.88 0.04 75)",
                    }}
                  />
                </div>
              </div>

              <div>
                <Label style={{ color: "oklch(0.75 0.05 70)" }}>Gender *</Label>
                <RadioGroup
                  data-ocid="kundli.gender_radio"
                  value={form.gender}
                  onValueChange={(v) => setForm({ ...form, gender: v })}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label
                      htmlFor="male"
                      style={{ color: "oklch(0.75 0.05 70)" }}
                    >
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label
                      htmlFor="female"
                      style={{ color: "oklch(0.75 0.05 70)" }}
                    >
                      Female
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label style={{ color: "oklch(0.75 0.05 70)" }}>
                  Date of Birth *
                </Label>
                <Input
                  data-ocid="kundli.dob_input"
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="mt-1"
                  style={{
                    background: "oklch(0.14 0.04 28)",
                    border: "1px solid oklch(0.32 0.06 35)",
                    color: "oklch(0.88 0.04 75)",
                  }}
                />
              </div>

              <div>
                <Label style={{ color: "oklch(0.75 0.05 70)" }}>
                  Birth Time
                </Label>
                <Input
                  data-ocid="kundli.time_input"
                  placeholder="HH:MM AM/PM"
                  value={form.birthTime}
                  onChange={(e) =>
                    setForm({ ...form, birthTime: e.target.value })
                  }
                  className="mt-1"
                  style={{
                    background: "oklch(0.14 0.04 28)",
                    border: "1px solid oklch(0.32 0.06 35)",
                    color: "oklch(0.88 0.04 75)",
                  }}
                />
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.50 0.04 55)" }}
                >
                  Don't know your exact birth time? We can analyze with 80%
                  accuracy
                </p>
              </div>

              <div>
                <Label style={{ color: "oklch(0.75 0.05 70)" }}>
                  Birth Place *
                </Label>
                <Input
                  data-ocid="kundli.place_input"
                  placeholder="City, State"
                  value={form.birthPlace}
                  onChange={(e) =>
                    setForm({ ...form, birthPlace: e.target.value })
                  }
                  className="mt-1"
                  style={{
                    background: "oklch(0.14 0.04 28)",
                    border: "1px solid oklch(0.32 0.06 35)",
                    color: "oklch(0.88 0.04 75)",
                  }}
                />
              </div>

              <div>
                <Label style={{ color: "oklch(0.75 0.05 70)" }}>
                  Report Language
                </Label>
                <Select
                  value={form.language}
                  onValueChange={(v) => setForm({ ...form, language: v })}
                >
                  <SelectTrigger
                    data-ocid="kundli.language_select"
                    className="mt-1"
                    style={{
                      background: "oklch(0.14 0.04 28)",
                      border: "1px solid oklch(0.32 0.06 35)",
                      color: "oklch(0.88 0.04 75)",
                    }}
                  >
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Hindi",
                      "English",
                      "Telugu",
                      "Tamil",
                      "Kannada",
                      "Gujarati",
                      "Marathi",
                    ].map((l) => (
                      <SelectItem key={l} value={l.toLowerCase()}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                data-ocid="kundli.submit_button"
                size="lg"
                className="w-full py-5 font-bold rounded-xl text-base"
                disabled={createStripeSession.isPending}
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                  color: "oklch(0.14 0.04 30)",
                }}
              >
                {createStripeSession.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    रिपोर्ट तैयार हो रही है...
                  </>
                ) : (
                  `Get my detailed Kundli — ₹${PLANS.find((p) => p.id === selectedPlan)?.price ?? 299} →`
                )}
              </Button>
            </form>
          </div>

          {/* What you'll find */}
          <div>
            <h2
              className="text-xl font-bold mb-6"
              style={{
                color: "oklch(0.78 0.14 75)",
                fontFamily: "Cinzel, serif",
              }}
            >
              What Will You Find in Your Kundli?
            </h2>
            <div className="space-y-4">
              {WHAT_INSIDE.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex gap-4 rounded-xl p-4"
                  style={{
                    background: "oklch(0.18 0.06 30)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.88 0.05 75)" }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "oklch(0.58 0.04 60)" }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Who Should Get It */}
        <section className="mb-16">
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "Cinzel, serif",
            }}
          >
            Who Should Get a Janam Kundli Made?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHO_SHOULD.map((w, i) => (
              <motion.div
                key={w.n}
                className="rounded-xl p-5"
                style={{
                  background: "oklch(0.18 0.06 30)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3"
                  style={{
                    background: "oklch(0.62 0.18 48 / 0.2)",
                    color: "oklch(0.78 0.14 75)",
                  }}
                >
                  {w.n}
                </div>
                <div
                  className="font-semibold mb-1"
                  style={{ color: "oklch(0.88 0.05 75)" }}
                >
                  {w.label}
                </div>
                <div
                  className="text-sm"
                  style={{ color: "oklch(0.58 0.04 60)" }}
                >
                  {w.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Get It */}
        <section className="mb-16">
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "Cinzel, serif",
            }}
          >
            Why Should You Get Your Kundli Made?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {WHY.map((w, i) => (
              <motion.div
                key={w.title}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: "oklch(0.18 0.06 30)",
                  border: "1px solid oklch(0.62 0.18 48 / 0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="text-4xl mb-4">{w.icon}</div>
                <h3
                  className="font-bold mb-2"
                  style={{ color: "oklch(0.82 0.06 70)" }}
                >
                  {w.title}
                </h3>
                <p className="text-sm" style={{ color: "oklch(0.58 0.04 60)" }}>
                  {w.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Table */}
        <section className="mb-16">
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "Cinzel, serif",
            }}
          >
            Choose Your Perfect Premium Kundli Package
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {PLANS.map((plan) => (
              <motion.div
                key={plan.id}
                data-ocid={`kundli.plan_${plan.id}`}
                className="rounded-2xl p-6 cursor-pointer"
                style={{
                  background:
                    selectedPlan === plan.id
                      ? "oklch(0.20 0.08 35)"
                      : "oklch(0.18 0.06 30)",
                  border: `2px solid ${
                    selectedPlan === plan.id
                      ? "oklch(0.62 0.18 48)"
                      : "oklch(0.30 0.07 35)"
                  }`,
                }}
                onClick={() => setSelectedPlan(plan.id)}
                whileHover={{ scale: 1.02 }}
              >
                {plan.id === "premium" && (
                  <Badge
                    className="mb-3"
                    style={{
                      background: "oklch(0.62 0.18 48)",
                      color: "white",
                    }}
                  >
                    BEST VALUE
                  </Badge>
                )}
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: "oklch(0.88 0.05 75)" }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "oklch(0.68 0.2 48)" }}
                  >
                    ₹{plan.price.toLocaleString()}
                  </span>
                  <span
                    className="text-base line-through"
                    style={{ color: "oklch(0.40 0.04 50)" }}
                  >
                    ₹{plan.original.toLocaleString()}
                  </span>
                </div>
                <p
                  className="text-xs mb-4"
                  style={{ color: "oklch(0.55 0.04 60)" }}
                >
                  {plan.delivery}
                </p>
                <Separator
                  className="mb-4"
                  style={{ background: "oklch(0.30 0.06 35)" }}
                />
                <ul className="space-y-2">
                  {PLAN_FEATURES.map((feat, fi) => (
                    <li key={feat} className="flex items-center gap-2 text-sm">
                      {plan.features[fi] ? (
                        <Check
                          size={14}
                          style={{ color: "oklch(0.62 0.18 140)" }}
                        />
                      ) : (
                        <X size={14} style={{ color: "oklch(0.45 0.12 28)" }} />
                      )}
                      <span
                        style={{
                          color: plan.features[fi]
                            ? "oklch(0.78 0.05 75)"
                            : "oklch(0.45 0.04 50)",
                        }}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Button
              type="button"
              data-ocid="kundli.buy_now_button"
              size="lg"
              className="px-12 py-5 text-lg font-bold rounded-xl hover:scale-105 transition-transform"
              disabled={createStripeSession.isPending}
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                color: "oklch(0.12 0.04 25)",
              }}
              onClick={async () => {
                if (!form.name || !form.phone || !form.dob) {
                  toast.error("Please fill all required fields");
                  return;
                }
                const plan = PLANS.find((p) => p.id === selectedPlan);
                const amount = plan?.price ?? 299;
                try {
                  const url = await createStripeSession.mutateAsync({
                    productType: "kundli",
                    amount,
                    metadata: JSON.stringify({ ...form, plan: selectedPlan }),
                  });
                  window.location.href = url;
                } catch {
                  toast.error("भुगतान में समस्या आई, पुनः प्रयास करें");
                }
              }}
            >
              {createStripeSession.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  रिपोर्ट तैयार हो रही है...
                </>
              ) : (
                `BUY NOW — ₹${PLANS.find((p) => p.id === selectedPlan)?.price ?? 299} ➜`
              )}
            </Button>
          </div>
        </section>

        {/* Baby Name CTA */}
        <section className="pb-16 text-center">
          <div
            className="rounded-2xl p-6 inline-block"
            style={{
              background: "oklch(0.18 0.06 30)",
              border: "1px solid oklch(0.55 0.18 200 / 0.3)",
            }}
          >
            <div className="text-3xl mb-2">👶</div>
            <p
              className="font-semibold mb-3"
              style={{ color: "oklch(0.78 0.05 75)" }}
            >
              Also looking for a lucky name for your baby?
            </p>
            <Link to="/baby-name-report">
              <Button
                type="button"
                data-ocid="kundli.baby_name_link"
                variant="outline"
                className="rounded-xl"
                style={{
                  borderColor: "oklch(0.55 0.18 200 / 0.5)",
                  color: "oklch(0.65 0.15 200)",
                }}
              >
                Get Baby Name Report
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
