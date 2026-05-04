import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const WHAT_YOU_GET = [
  {
    icon: "📛",
    title: "Numerology-Aligned Names List",
    desc: "Names that resonate with your child's life path number",
  },
  {
    icon: "⭐",
    title: "Vedic Nakshatra-Based Names",
    desc: "Traditional names aligned with birth star (Nakshatra)",
  },
  {
    icon: "📖",
    title: "Meaning & Significance",
    desc: "Deep meaning and spiritual significance for each name",
  },
  {
    icon: "🍀",
    title: "Lucky Letters & Starting Sounds",
    desc: "Auspicious starting letters based on Vedic astrology",
  },
  {
    icon: "📞",
    title: "1:1 Consultation (Optional Add-on)",
    desc: "Personal call to discuss names and finalize with expert guidance",
  },
];

export default function BabyNameReport() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fatherName: "",
    motherName: "",
    babyDob: "",
    birthTime: "",
    birthPlace: "",
    phone: "",
    email: "",
    nameStyle: "",
    language: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fatherName || !form.phone || !form.nameStyle) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitted(true);
    toast.success(
      "Baby Name Report request submitted! Our expert will contact you within 24 hours.",
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.04 30)" }}>
      {/* Hero */}
      <div
        className="py-16 px-4 text-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.15 0.06 30) 0%, oklch(0.20 0.09 40) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-5xl mb-4">👶</div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "Cinzel, serif",
            }}
          >
            Baby Name Report
          </h1>
          <p className="text-lg mb-2" style={{ color: "oklch(0.80 0.05 75)" }}>
            Find the Perfect Name Aligned with Your Child's Stars and Numerology
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span
              className="text-3xl font-bold"
              style={{ color: "oklch(0.62 0.18 48)" }}
            >
              ₹499
            </span>
            <span
              className="text-xl line-through"
              style={{ color: "oklch(0.42 0.04 50)" }}
            >
              ₹1,499
            </span>
            <Badge
              style={{ background: "oklch(0.55 0.22 28)", color: "white" }}
            >
              67% OFF
            </Badge>
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            {!submitted ? (
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
                  Enter Your Details
                </h2>

                <div>
                  <Label style={{ color: "oklch(0.75 0.05 70)" }}>
                    Father's Name *
                  </Label>
                  <Input
                    data-ocid="baby_name.father_input"
                    placeholder="Father's full name"
                    value={form.fatherName}
                    onChange={(e) =>
                      setForm({ ...form, fatherName: e.target.value })
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
                    Mother's Name *
                  </Label>
                  <Input
                    data-ocid="baby_name.mother_input"
                    placeholder="Mother's full name"
                    value={form.motherName}
                    onChange={(e) =>
                      setForm({ ...form, motherName: e.target.value })
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
                    Baby's DOB / Expected Date
                  </Label>
                  <Input
                    data-ocid="baby_name.dob_input"
                    type="date"
                    value={form.babyDob}
                    onChange={(e) =>
                      setForm({ ...form, babyDob: e.target.value })
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
                    Birth Time (if known)
                  </Label>
                  <Input
                    data-ocid="baby_name.time_input"
                    placeholder="e.g. 10:30 AM"
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
                </div>

                <div>
                  <Label style={{ color: "oklch(0.75 0.05 70)" }}>
                    Birth Place
                  </Label>
                  <Input
                    data-ocid="baby_name.place_input"
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
                    Parents' Phone *
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
                      data-ocid="baby_name.phone_input"
                      placeholder="10-digit mobile number"
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
                  <Label style={{ color: "oklch(0.75 0.05 70)" }}>Email</Label>
                  <Input
                    data-ocid="baby_name.email_input"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
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
                    Preferred Name Style *
                  </Label>
                  <Select
                    value={form.nameStyle}
                    onValueChange={(v) => setForm({ ...form, nameStyle: v })}
                  >
                    <SelectTrigger
                      data-ocid="baby_name.style_select"
                      className="mt-1"
                      style={{
                        background: "oklch(0.14 0.04 28)",
                        border: "1px solid oklch(0.32 0.06 35)",
                        color: "oklch(0.88 0.04 75)",
                      }}
                    >
                      <SelectValue placeholder="Choose style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traditional">Traditional</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="sanskrit">Sanskrit</SelectItem>
                      <SelectItem value="both">
                        Both Traditional &amp; Modern
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                      data-ocid="baby_name.language_select"
                      className="mt-1"
                      style={{
                        background: "oklch(0.14 0.04 28)",
                        border: "1px solid oklch(0.32 0.06 35)",
                        color: "oklch(0.88 0.04 75)",
                      }}
                    >
                      <SelectValue placeholder="Choose language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  data-ocid="baby_name.submit_button"
                  size="lg"
                  className="w-full py-5 font-bold rounded-xl text-base"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                    color: "oklch(0.14 0.04 30)",
                  }}
                >
                  Get My Baby Name Report · ₹499
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-8 text-center"
                style={{
                  background: "oklch(0.18 0.06 30)",
                  border: "1px solid oklch(0.55 0.18 140 / 0.4)",
                }}
              >
                <CheckCircle
                  className="mx-auto mb-4"
                  size={56}
                  style={{ color: "oklch(0.62 0.18 140)" }}
                />
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  Request Submitted!
                </h3>
                <p style={{ color: "oklch(0.68 0.04 70)" }}>
                  Our expert will contact you within 24 hours on the phone
                  number you provided.
                </p>
              </motion.div>
            )}
          </div>

          {/* What you get */}
          <div>
            <h2
              className="text-xl font-bold mb-6"
              style={{
                color: "oklch(0.78 0.14 75)",
                fontFamily: "Cinzel, serif",
              }}
            >
              What You Get in Your Report
            </h2>
            <div className="space-y-4">
              {WHAT_YOU_GET.map((item, i) => (
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
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <div
                      className="font-semibold"
                      style={{ color: "oklch(0.88 0.05 75)" }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-sm mt-1"
                      style={{ color: "oklch(0.60 0.04 60)" }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
