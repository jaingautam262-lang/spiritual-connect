import { Link } from "@tanstack/react-router";
import { Share2 } from "lucide-react";

export interface FestivalSubLink {
  label: string;
}

export interface RankedFestival {
  rank: string;
  name: string;
  emoji: string;
  subLinks: FestivalSubLink[];
}

export const TOP_25_FESTIVALS: RankedFestival[] = [
  {
    rank: "1",
    name: "Diwali",
    emoji: "🪔",
    subLinks: [
      { label: "About Diwali" },
      { label: "Deepavali Muhurat" },
      { label: "Deepavali Summary" },
    ],
  },
  {
    rank: "2",
    name: "Holi",
    emoji: "🎨",
    subLinks: [
      { label: "About Holi" },
      { label: "Holika Muhurat" },
      { label: "Holi Summary" },
      { label: "Holika Dahan Summary" },
    ],
  },
  {
    rank: "3",
    name: "Raksha Bandhan",
    emoji: "🪢",
    subLinks: [
      { label: "About Rakhi" },
      { label: "Rakhi Muhurat" },
      { label: "Raksha Bandhan Summary" },
    ],
  },
  {
    rank: "4",
    name: "Dussehra",
    emoji: "🏹",
    subLinks: [
      { label: "About Dussehra" },
      { label: "Dussehra Muhurat" },
      { label: "Vijayadashmi Summary" },
    ],
  },
  {
    rank: "5.1",
    name: "Durga Puja",
    emoji: "🔱",
    subLinks: [
      { label: "About Durga Puja" },
      { label: "Sandhi Puja Muhurat" },
      { label: "Durga Puja Summary" },
    ],
  },
  {
    rank: "5.2",
    name: "Navratri",
    emoji: "🙏",
    subLinks: [
      { label: "About Navratri" },
      { label: "Navami Homa Muhurat" },
      { label: "Navratri Summary" },
    ],
  },
  {
    rank: "6",
    name: "Ganesha Chaturthi",
    emoji: "🐘",
    subLinks: [
      { label: "About Ganesha Chaturthi" },
      { label: "Chaturthi Muhurat" },
      { label: "Ganesha Chaturthi Summary" },
    ],
  },
  {
    rank: "7",
    name: "Rama Navami",
    emoji: "🏹",
    subLinks: [
      { label: "About Rama Navami" },
      { label: "Rama Navami Muhurat" },
      { label: "Rama Navami Summary" },
    ],
  },
  {
    rank: "8",
    name: "Janmashtami",
    emoji: "🦚",
    subLinks: [
      { label: "About Janmashtami" },
      { label: "Janmashtami Muhurat" },
      { label: "Krishna Janmashtami Summary" },
    ],
  },
  {
    rank: "9",
    name: "Maha Shivaratri",
    emoji: "🕉️",
    subLinks: [
      { label: "About Maha Shivaratri" },
      { label: "Maha Shivaratri Muhurat" },
      { label: "Maha Shivaratri Summary" },
    ],
  },
  {
    rank: "10",
    name: "Makar Sankranti",
    emoji: "🪁",
    subLinks: [
      { label: "About Makar Sankranti" },
      { label: "Makar Sankranti Muhurat" },
      { label: "Makar Sankranti Summary" },
    ],
  },
  {
    rank: "11",
    name: "Karwa Chauth",
    emoji: "🌕",
    subLinks: [
      { label: "About Karwa Chauth" },
      { label: "Karwa Chauth Muhurat" },
      { label: "Karwa Chauth Summary" },
    ],
  },
  {
    rank: "12",
    name: "Vasant Panchami",
    emoji: "🌼",
    subLinks: [
      { label: "About Vasant Panchami" },
      { label: "Vasant Panchami Muhurat" },
      { label: "Vasant Panchami Summary" },
    ],
  },
  {
    rank: "13.1",
    name: "Gudi Padwa | Marathi New Year",
    emoji: "🏮",
    subLinks: [
      { label: "About Gudi Padwa" },
      { label: "Gudi Padwa Muhurat" },
      { label: "Gudi Padwa Summary" },
    ],
  },
  {
    rank: "13.2",
    name: "Ugadi | Telugu New Year",
    emoji: "🌿",
    subLinks: [
      { label: "About Ugadi" },
      { label: "Ugadi Muhurat" },
      { label: "Ugadi Summary" },
    ],
  },
  {
    rank: "14",
    name: "Akshaya Tritiya",
    emoji: "💰",
    subLinks: [
      { label: "About Akshaya Tritiya" },
      { label: "Akshaya Tritiya Muhurat" },
      { label: "Akshaya Tritiya Summary" },
    ],
  },
  {
    rank: "15",
    name: "Dhantrayodashi",
    emoji: "✨",
    subLinks: [
      { label: "Dhanteras Puja" },
      { label: "Dhanvantari Trayodashi" },
      { label: "Dhanvantari Puja Vidhi" },
    ],
  },
  {
    rank: "16",
    name: "Govardhan Puja",
    emoji: "🌄",
    subLinks: [{ label: "Govardhan Puja Vidhi" }],
  },
  {
    rank: "17",
    name: "Onam",
    emoji: "🌸",
    subLinks: [{ label: "Thiruvonam" }, { label: "Onam Calendar" }],
  },
  {
    rank: "18",
    name: "Vat Savitri | Vat Purnima",
    emoji: "🌳",
    subLinks: [
      { label: "Vat Savitri" },
      { label: "Vat Purnima" },
      { label: "Vat Savitri Puja Vidhi" },
    ],
  },
  {
    rank: "19",
    name: "Bhai Dooj | Yama Dwitiya",
    emoji: "🤝",
    subLinks: [
      { label: "About Bhai Dooj" },
      { label: "Bhai Dooj Tika Muhurat" },
      { label: "Yama Dwitiya" },
    ],
  },
  {
    rank: "20",
    name: "Hanuman Jayanti",
    emoji: "🐒",
    subLinks: [
      { label: "About Hanuman Jayanti" },
      { label: "Hanuman Jayanti Muhurat" },
      { label: "Hanuman Jayanti Summary" },
    ],
  },
  {
    rank: "21",
    name: "Kojagara Puja",
    emoji: "🌕",
    subLinks: [
      { label: "Kojagara Puja Muhurat" },
      { label: "Maha Lakshmi Mantra" },
      { label: "Shree Suktam" },
    ],
  },
  {
    rank: "22",
    name: "Nag Panchami",
    emoji: "🐍",
    subLinks: [
      { label: "Nag Panchami Muhurat" },
      { label: "Nag Pancham in Gujarat" },
    ],
  },
  {
    rank: "23",
    name: "Chhath Puja",
    emoji: "🌅",
    subLinks: [
      { label: "Chhath Puja Muhurat" },
      { label: "Chhath Puja Calendar" },
    ],
  },
  { rank: "24", name: "Rath Yatra", emoji: "🎡", subLinks: [] },
  {
    rank: "25",
    name: "Solar New Year",
    emoji: "☀️",
    subLinks: [
      { label: "Mesha Sankranti" },
      { label: "Vaisakhi" },
      { label: "Puthandu" },
    ],
  },
];

const bottomNav = [
  { label: "🏆 Top 25 Hindu Festivals", path: "/top-hindu-festivals" },
  { label: "Top 20 Hindu Festivals", path: "/top-hindu-festivals-20" },
  { label: "Top 10 Hindu Festivals", path: "/top-hindu-festivals-10" },
  { label: "📅 Hindu Calendar (month-wise)", path: "/hindu-calendar" },
  { label: "🌺 Tamil Festivals", path: "/festival-calendar" },
  { label: "🪔 Malayalam Festivals", path: "/festival-calendar" },
  { label: "🧘 Gurus and Saints", path: "/divine-info" },
];

function FestivalCard({ festival }: { festival: RankedFestival }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: festival.name,
          text: `Learn about ${festival.name} — SpiritualConnect`,
          url: window.location.href,
        })
        .catch(() => null);
    } else {
      navigator.clipboard
        .writeText(`${festival.name} — ${window.location.href}`)
        .catch(() => null);
    }
  };

  return (
    <div
      className="rounded-2xl border p-5 flex gap-5 hover:border-amber-500/30 transition-all"
      style={{
        background: "oklch(0.18 0.07 22)",
        borderColor: "oklch(0.78 0.14 75 / 0.15)",
      }}
      data-ocid="top_festivals.festival_card"
    >
      {/* Rank */}
      <div
        className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-extrabold text-lg"
        style={{
          background: "oklch(0.78 0.14 75 / 0.12)",
          border: "2px solid oklch(0.78 0.14 75 / 0.25)",
          color: "oklch(0.82 0.18 65)",
        }}
      >
        {festival.rank}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3
            className="font-heading font-bold text-base flex items-center gap-2"
            style={{ color: "oklch(0.92 0.06 75)" }}
          >
            <span>{festival.emoji}</span>
            <span>{festival.name}</span>
          </h3>
          <button
            type="button"
            onClick={handleShare}
            title="Share on WhatsApp / Copy link"
            className="flex-shrink-0 p-2 rounded-full transition-all hover:bg-white/10"
            style={{ color: "oklch(0.65 0.08 130)" }}
            aria-label="Share festival"
            data-ocid="top_festivals.share_button"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
        {festival.subLinks.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {festival.subLinks.map((sl) => (
              <Link
                key={sl.label}
                to="/festival-calendar"
                className="px-3 py-1 rounded-full text-xs font-heading border transition-all hover:bg-white/10"
                style={{
                  borderColor: "oklch(0.68 0.12 58 / 0.4)",
                  color: "oklch(0.75 0.08 62)",
                  background: "oklch(0.20 0.07 30)",
                }}
                data-ocid="top_festivals.sub_link"
              >
                {sl.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface TopHinduFestivalsLayoutProps {
  count: 10 | 20 | 25;
  festivals: RankedFestival[];
  extraNote?: React.ReactNode;
}

export function TopHinduFestivalsLayout({
  count,
  festivals,
  extraNote,
}: TopHinduFestivalsLayoutProps) {
  const handleShareAll = () => {
    const text = `Top ${count} Hindu Festivals — SpiritualConnect\n${window.location.href}`;
    if (navigator.share) {
      navigator
        .share({ title: `Top ${count} Hindu Festivals`, text })
        .catch(() => null);
    } else {
      navigator.clipboard.writeText(text).catch(() => null);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 20)" }}>
      {/* Hero */}
      <div
        className="py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 22) 0%, oklch(0.22 0.10 35) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center font-heading font-black text-2xl"
              style={{
                background: "oklch(0.78 0.14 75 / 0.15)",
                border: "2px solid oklch(0.82 0.18 65 / 0.4)",
                color: "oklch(0.82 0.18 65)",
              }}
            >
              {count}
            </div>
            <div className="flex-1">
              <h1
                className="text-2xl sm:text-3xl font-heading font-bold mb-2"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Top {count} Hindu Festivals
              </h1>
              <p
                className="text-sm font-body"
                style={{ color: "oklch(0.65 0.04 60)" }}
              >
                This list has been created after analyzing the popularity of
                Hindu festivals. It can also be used as the latest trend on the
                popularity of traditional festivals in modern India.
              </p>
              <button
                type="button"
                onClick={handleShareAll}
                className="mt-3 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-semibold border transition-all hover:bg-white/10"
                style={{
                  borderColor: "oklch(0.65 0.08 130 / 0.4)",
                  color: "oklch(0.65 0.08 130)",
                }}
                data-ocid="top_festivals.share_all_button"
              >
                <Share2 className="h-3.5 w-3.5" /> Share this list
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
        {extraNote && (
          <div
            className="rounded-xl p-5 border text-sm font-body leading-relaxed"
            style={{
              background: "oklch(0.18 0.07 22)",
              borderColor: "oklch(0.78 0.14 75 / 0.15)",
              color: "oklch(0.70 0.04 58)",
            }}
          >
            {extraNote}
          </div>
        )}

        {/* Festival list */}
        <div className="space-y-3">
          {festivals.map((f) => (
            <FestivalCard key={f.rank + f.name} festival={f} />
          ))}
        </div>

        {/* Cross navigation */}
        <div
          className="rounded-2xl p-5 border"
          style={{
            background: "oklch(0.17 0.06 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <h3
            className="text-sm font-heading font-semibold mb-3"
            style={{ color: "oklch(0.65 0.04 58)" }}
          >
            Related Lists
          </h3>
          <div className="flex flex-wrap gap-2">
            {bottomNav.map((nav) => (
              <Link
                key={nav.label}
                to={nav.path}
                className="px-3 py-1.5 rounded-full text-xs font-heading border transition-all hover:bg-white/10"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.88 0.06 75)",
                  background: "oklch(0.20 0.07 28)",
                }}
                data-ocid="top_festivals.nav_link"
              >
                {nav.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
