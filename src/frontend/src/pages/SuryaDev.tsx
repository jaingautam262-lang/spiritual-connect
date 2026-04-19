import { Link } from "@tanstack/react-router";
import { ExternalLink, Sun } from "lucide-react";

const suryaFestivals = [
  {
    name: "Makar Sankranti",
    emoji: "🪁",
    desc: "Sun's transit into Capricorn (Makar Rashi). Most popular Sankranti, celebrated as Pongal, Uttarayana, and Lohri across India.",
    path: "/festival-calendar",
  },
  {
    name: "Chhath Puja",
    emoji: "🌅",
    desc: "Dedicated entirely to Surya Dev and Chhathi Maiya. Devotees stand in water offering Arghya at sunrise and sunset.",
    path: "/festival-calendar",
  },
  {
    name: "Ratha Saptami",
    emoji: "☀️",
    desc: "Celebrated on Magha Shukla Saptami — the day Lord Surya first drove his golden chariot across the sky, inaugurating creation.",
    path: "/festival-calendar",
  },
  {
    name: "Mesha Sankranti",
    emoji: "♈",
    desc: "Sun's transit into Aries (Mesha). Marks the Solar New Year in most regional Hindu calendars.",
    path: "/festival-calendar",
  },
];

const quickLinks = [
  {
    label: "Surya Deva Aarti",
    emoji: "🙏",
    desc: "Jai Kashyap-Nandan, Om Jai Aditi-Nandan…",
    path: "/aarti",
  },
  {
    label: "108 Names of Surya Dev",
    emoji: "🌞",
    desc: "Ashtottara Shatanamavali with meaning and video",
    path: "/sahasranam",
  },
  {
    label: "Surya Deva Chalisa",
    emoji: "📖",
    desc: "Jai Savita Jai Jayati Divakara — 40 verses",
    path: "/chalisa",
  },
];

const relatedPages = [
  { label: "🌺 Tamil Festivals", path: "/festival-calendar" },
  { label: "🪔 Malayalam Festivals", path: "/festival-calendar" },
  { label: "🧘 Gurus and Saints", path: "/divine-info" },
  { label: "📅 Hindu Calendar", path: "/hindu-calendar" },
];

export default function SuryaDev() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 20)" }}>
      {/* Hero */}
      <div
        className="py-14 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.10 40) 0%, oklch(0.30 0.14 55) 50%, oklch(0.22 0.10 40) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.78 0.14 75 / 0.12) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto max-w-3xl relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sun
              className="h-12 w-12"
              style={{ color: "oklch(0.82 0.18 65)" }}
            />
            <span className="text-5xl">☀️</span>
          </div>
          <h1
            className="text-3xl sm:text-5xl font-heading font-bold mb-3 leading-tight"
            style={{ color: "oklch(0.82 0.18 65)" }}
          >
            Lord Surya — The Sun God
          </h1>
          <p
            className="text-lg font-heading mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🙏 Jai Surya Narayan 🙏
          </p>
          <p
            className="text-base font-body max-w-xl mx-auto"
            style={{ color: "oklch(0.75 0.06 60)" }}
          >
            सूर्य देव — जीवन-दाता, ऊर्जा के स्रोत और ज्योतिष के नायक
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-10 space-y-10">
        {/* Introduction */}
        <section
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.18 0.07 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.18)",
          }}
        >
          <h2
            className="text-xl font-heading font-bold mb-3 flex items-center gap-2"
            style={{ color: "oklch(0.82 0.18 65)" }}
          >
            ☀️ About Lord Surya
          </h2>
          <p
            className="text-sm font-body leading-relaxed mb-3"
            style={{ color: "oklch(0.75 0.05 58)" }}
          >
            Lord Surya (सूर्य देव) is the Sun God in Hinduism — the supreme source
            of light, warmth, and life on Earth. He is the visible manifestation
            of the Divine and is worshipped daily by millions as the eye of the
            cosmos (<em>जगत्चक्षु</em>). Surya Dev is the son of Sage Kashyapa and
            Aditi, making him the progenitor of the solar dynasty (
            <em>Suryavansha</em>) — the lineage of Lord Rama himself.
          </p>
          <p
            className="text-sm font-body leading-relaxed mb-3"
            style={{ color: "oklch(0.75 0.05 58)" }}
          >
            He rides a golden chariot (<em>Ratham</em>) drawn by seven white
            horses, representing the seven colors of the visible spectrum. He
            carries a lotus in each hand, symbolizing purity, enlightenment, and
            the cycle of creation. His divine consorts are Sanjna and Chhaya.
            Among his sons are Yama (god of death), Yami, Ashwini Kumaras, and
            the great warrior Karna.
          </p>
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.75 0.05 58)" }}
          >
            The Vedas glorify Surya Dev extensively — the Gayatri Mantra is a
            direct invocation to the Solar Divine. His 108 names (Ashtottara
            Shatanamavali) describe his cosmic qualities: Arun (the radiant),
            Bhaskara (the illuminator), Bhanu (the luminous), Martanda (born
            from the cosmic egg), and Vivasvat (the brilliant one).
          </p>
        </section>

        {/* Significance in Vedic Tradition */}
        <section
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.17 0.06 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <h2
            className="text-xl font-heading font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🔮 Significance in Vedic Tradition & Astrology
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🌟",
                title: "Navagraha — King of Planets",
                desc: "Surya is the first and most powerful of the nine Navagrahas. A strong Sun in one's birth chart bestows leadership, confidence, vitality, and government patronage.",
              },
              {
                icon: "📅",
                title: "Panchang & Sankranti",
                desc: "The Hindu Panchang's entire structure is based on the Sun's position. Each Sankranti (solar transit) marks an auspicious turning point in the year.",
              },
              {
                icon: "🕉️",
                title: "Gayatri Mantra",
                desc: '"Om Bhur Bhuvaḥ Svaḥ, Tat Savitur Vareṇyam..." — the most sacred Vedic mantra, addressed directly to Surya Dev as divine illuminator of the intellect.',
              },
              {
                icon: "🌿",
                title: "Health & Healing",
                desc: "Worshipping Surya Dev is considered one of the most potent remedies for health problems, eye disorders, and to overcome a weak Sun in one's Kundali.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-4 border"
                style={{
                  background: "oklch(0.20 0.08 28 / 0.5)",
                  borderColor: "oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3
                  className="font-heading font-semibold text-sm mb-1"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs font-body leading-relaxed"
                  style={{ color: "oklch(0.65 0.04 58)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2
            className="text-xl font-heading font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🙏 Devotional Resources
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {quickLinks.map((ql) => (
              <Link
                key={ql.label}
                to={ql.path}
                className="rounded-2xl p-5 border group transition-all hover:border-amber-500/40 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.20 0.08 35) 0%, oklch(0.18 0.07 28) 100%)",
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                }}
                data-ocid="suryadev.quick_link"
              >
                <div className="text-3xl mb-2">{ql.emoji}</div>
                <h3
                  className="font-heading font-semibold text-sm mb-1"
                  style={{ color: "oklch(0.82 0.14 70)" }}
                >
                  {ql.label}
                </h3>
                <p
                  className="text-xs font-body italic"
                  style={{ color: "oklch(0.60 0.04 55)" }}
                >
                  {ql.desc}
                </p>
                <div
                  className="mt-3 text-xs font-heading font-semibold flex items-center gap-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  Read / Listen <ExternalLink className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Surya in Festivals */}
        <section>
          <h2
            className="text-xl font-heading font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🎉 Surya Dev in Festivals
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {suryaFestivals.map((f) => (
              <Link
                key={f.name}
                to={f.path}
                className="rounded-xl p-5 border flex gap-4 items-start transition-all hover:border-amber-500/40 group"
                style={{
                  background: "oklch(0.18 0.06 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.15)",
                }}
                data-ocid="suryadev.festival_card"
              >
                <span className="text-3xl flex-shrink-0">{f.emoji}</span>
                <div className="min-w-0">
                  <h3
                    className="font-heading font-semibold text-base mb-1 group-hover:underline"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {f.name}
                  </h3>
                  <p
                    className="text-xs font-body leading-relaxed"
                    style={{ color: "oklch(0.65 0.04 58)" }}
                  >
                    {f.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Sankranti Link Card */}
        <Link
          to="/festival-calendar"
          className="block rounded-2xl p-6 border transition-all hover:border-amber-500/50"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.10 40 / 0.6) 0%, oklch(0.18 0.07 30) 100%)",
            borderColor: "oklch(0.82 0.18 65 / 0.3)",
          }}
          data-ocid="suryadev.sankranti_link"
        >
          <div className="flex items-start gap-4">
            <span className="text-4xl">🌞</span>
            <div>
              <h3
                className="font-heading font-bold text-lg mb-1"
                style={{ color: "oklch(0.82 0.18 65)" }}
              >
                Sankranti Festivals
              </h3>
              <p
                className="text-sm font-body"
                style={{ color: "oklch(0.70 0.05 58)" }}
              >
                The transit of the Sun from one zodiac sign to another is called
                Sankranti. According to religious beliefs, charity and good
                deeds done on this day are hundreds of times more fruitful. A
                list of all the festivals related to Sankranti and their
                auspicious times are available here.
              </p>
              <span
                className="inline-block mt-2 text-xs font-heading font-semibold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                View All Sankranti Festivals →
              </span>
            </div>
          </div>
        </Link>

        {/* Hindu Calendar Link Card */}
        <Link
          to="/hindu-calendar"
          className="block rounded-2xl p-6 border transition-all hover:border-amber-500/50"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.18 0.07 30) 0%, oklch(0.22 0.08 35 / 0.6) 100%)",
            borderColor: "oklch(0.78 0.14 75 / 0.25)",
          }}
          data-ocid="suryadev.hindu_calendar_link"
        >
          <div className="flex items-start gap-4">
            <span className="text-4xl">📅</span>
            <div>
              <h3
                className="font-heading font-bold text-lg mb-1"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Hindu Calendar — Month-wise Festivals
              </h3>
              <p
                className="text-sm font-body"
                style={{ color: "oklch(0.70 0.05 58)" }}
              >
                Complete list of all Hindu festivals and celebrations. The
                position of Sun and Moon determines the date and time of the
                Hindu festivals. Browse festivals month by month from Chaitra to
                Phalguna.
              </p>
              <span
                className="inline-block mt-2 text-xs font-heading font-semibold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                View Hindu Calendar →
              </span>
            </div>
          </div>
        </Link>

        {/* Bottom Navigation */}
        <section>
          <h2
            className="text-base font-heading font-semibold mb-3"
            style={{ color: "oklch(0.65 0.04 58)" }}
          >
            Related Pages
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedPages.map((rp) => (
              <Link
                key={rp.label}
                to={rp.path}
                className="px-4 py-2 rounded-full text-sm font-heading font-medium transition-all hover:bg-white/10 border"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.88 0.06 75)",
                  background: "oklch(0.18 0.06 22)",
                }}
                data-ocid="suryadev.related_link"
              >
                {rp.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
