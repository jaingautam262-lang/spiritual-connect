import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HinduDeity {
  name: string;
  nameHi: string;
  father: string;
  mother: string;
  faith: "Hindu" | "Jain";
  description: string;
}

interface SikhGuru {
  no: number;
  name: string;
  father: string;
  mother: string;
  dob: string;
  birthPlace: string;
}

const HINDU_DEITIES: HinduDeity[] = [
  {
    name: "Ganesha",
    nameHi: "गणेश",
    father: "Shiva",
    mother: "Parvati",
    faith: "Hindu",
    description:
      "Lord of beginnings, remover of obstacles, patron of arts and sciences",
  },
  {
    name: "Kartikeya (Murugan)",
    nameHi: "कार्तिकेय (मुरुगन)",
    father: "Shiva",
    mother: "Parvati",
    faith: "Hindu",
    description: "God of war, supreme commander of the army of the gods",
  },
  {
    name: "Rama",
    nameHi: "राम",
    father: "Dasharatha",
    mother: "Kaushalya",
    faith: "Hindu",
    description:
      "7th avatar of Vishnu, ideal king of Ayodhya, hero of the Ramayana",
  },
  {
    name: "Krishna",
    nameHi: "कृष्ण",
    father: "Vasudeva",
    mother: "Devaki",
    faith: "Hindu",
    description:
      "8th avatar of Vishnu, divine statesman, philosopher, speaker of Bhagavad Gita",
  },
  {
    name: "Hanuman",
    nameHi: "हनुमान",
    father: "Kesari (Vayu Dev)",
    mother: "Anjana",
    faith: "Hindu",
    description:
      "Devoted disciple of Rama, symbol of boundless strength, courage, and devotion",
  },
  {
    name: "Saraswati",
    nameHi: "सरस्वती",
    father: "Brahma",
    mother: "(Manifested from Brahma)",
    faith: "Hindu",
    description: "Goddess of knowledge, learning, wisdom, music, and the arts",
  },
  {
    name: "Lakshmi",
    nameHi: "लक्ष्मी",
    father: "Sage Bhrigu / Samudra Manthan",
    mother: "Khyati",
    faith: "Hindu",
    description: "Goddess of wealth, fortune, beauty, and prosperity",
  },
  {
    name: "Parvati",
    nameHi: "पार्वती",
    father: "Himavan (Parvata)",
    mother: "Mena",
    faith: "Hindu",
    description:
      "Goddess of power, fertility, love, and devotion; consort of Shiva",
  },
  {
    name: "Durga",
    nameHi: "दुर्गा",
    father: "Himavan (Parvata)",
    mother: "Mena",
    faith: "Hindu",
    description:
      "Divine mother warrior goddess, destroyer of evil and demonic forces",
  },
  {
    name: "Kali",
    nameHi: "काली",
    father: "Himavan (Parvata)",
    mother: "Mena",
    faith: "Hindu",
    description:
      "Goddess of time, change, and liberation; fierce form of the Divine Mother",
  },
  {
    name: "Radha",
    nameHi: "राधा",
    father: "Vrishabhanu",
    mother: "Kirti",
    faith: "Hindu",
    description:
      "Consort of Krishna, supreme devotee, goddess of love and compassion",
  },
  {
    name: "Sita",
    nameHi: "सीता",
    father: "Janaka (adopted)",
    mother: "Bhumi Devi (Earth)",
    faith: "Hindu",
    description:
      "Consort of Rama, daughter of Mother Earth, ideal of feminine virtue",
  },
  {
    name: "Brahma",
    nameHi: "ब्रह्मा",
    father: "Vishnu (born from lotus)",
    mother: "(From cosmic lotus)",
    faith: "Hindu",
    description:
      "Creator of the universe, head of the Hindu trinity (Trimurti)",
  },
  {
    name: "Vishnu",
    nameHi: "विष्णु",
    father: "(Primordial Supreme)",
    mother: "(Primordial Supreme)",
    faith: "Hindu",
    description:
      "Preserver and protector of the universe, takes avatars to restore dharma",
  },
  {
    name: "Shiva",
    nameHi: "शिव",
    father: "(Swayambhu — self-manifested)",
    mother: "(Swayambhu)",
    faith: "Hindu",
    description:
      "Destroyer and transformer of the universe, third of the Trimurti",
  },
  {
    name: "Surya Dev",
    nameHi: "सूर्य देव",
    father: "Kashyapa",
    mother: "Aditi",
    faith: "Hindu",
    description:
      "Sun god, giver of life, light, and energy; one of the Navagrahas",
  },
  {
    name: "Chandra Dev",
    nameHi: "चन्द्र देव",
    father: "Atri",
    mother: "Anusuya",
    faith: "Hindu",
    description:
      "Moon god, lord of night, bestower of coolness and mental peace",
  },
  {
    name: "Indra",
    nameHi: "इन्द्र",
    father: "Kashyapa",
    mother: "Aditi",
    faith: "Hindu",
    description:
      "King of the gods, lord of heaven (Svarga), god of thunder and rain",
  },
  {
    name: "Varuna",
    nameHi: "वरुण",
    father: "Kashyapa",
    mother: "Aditi",
    faith: "Hindu",
    description: "God of water, oceans, celestial order, and cosmic law (Rta)",
  },
  {
    name: "Gayatri Mata",
    nameHi: "गायत्री माता",
    father: "(Vedic Manifestation)",
    mother: "(Vedic Manifestation)",
    faith: "Hindu",
    description:
      "Goddess of the Vedic Gayatri Mantra, consort of Brahma, mother of the Vedas",
  },
  {
    name: "Santoshi Mata",
    nameHi: "संतोषी माता",
    father: "Ganesha",
    mother: "Riddhi / Siddhi",
    faith: "Hindu",
    description:
      "Goddess of satisfaction and contentment, fulfiller of devotees' wishes",
  },
  {
    name: "Sheetla Mata",
    nameHi: "शीतला माता",
    father: "(Manifestation of Shakti)",
    mother: "(Manifestation of Shakti)",
    faith: "Hindu",
    description:
      "Goddess of healing, protectress against disease, especially smallpox",
  },
  {
    name: "Padmavati Mata (Jain)",
    nameHi: "पद्मावती माता (जैन)",
    father: "Yaksha Dharanendra (consort)",
    mother: "(Yakshini of Parshvanath)",
    faith: "Jain",
    description:
      "Yakshini (protective deity) of the 23rd Tirthankar Parshvanath in Jain tradition",
  },
];

const SIKH_GURUS: SikhGuru[] = [
  {
    no: 1,
    name: "Guru Nanak Dev Ji",
    father: "Mehta Kalu Ji",
    mother: "Mata Tripta Ji",
    dob: "15 April 1469",
    birthPlace: "Nankana Sahib (now Pakistan)",
  },
  {
    no: 2,
    name: "Guru Angad Dev Ji",
    father: "Pheru Ji",
    mother: "Mata Ramo Ji",
    dob: "31 March 1504",
    birthPlace: "Harike, Punjab",
  },
  {
    no: 3,
    name: "Guru Amar Das Ji",
    father: "Tej Bhan Ji",
    mother: "Mata Sulakhni Ji",
    dob: "5 May 1479",
    birthPlace: "Basarke, Amritsar",
  },
  {
    no: 4,
    name: "Guru Ram Das Ji",
    father: "Hari Das Ji",
    mother: "Mata Daya Kaur Ji",
    dob: "24 September 1534",
    birthPlace: "Lahore (now Pakistan)",
  },
  {
    no: 5,
    name: "Guru Arjan Dev Ji",
    father: "Guru Ram Das Ji",
    mother: "Mata Bhani Ji",
    dob: "15 April 1563",
    birthPlace: "Goindval, Punjab",
  },
  {
    no: 6,
    name: "Guru Hargobind Sahib Ji",
    father: "Guru Arjan Dev Ji",
    mother: "Mata Ganga Ji",
    dob: "19 June 1595",
    birthPlace: "Vadali, Amritsar",
  },
  {
    no: 7,
    name: "Guru Har Rai Ji",
    father: "Baba Gurdita Ji",
    mother: "Mata Nihal Kaur Ji",
    dob: "16 January 1630",
    birthPlace: "Kiratpur Sahib, Punjab",
  },
  {
    no: 8,
    name: "Guru Har Krishan Sahib Ji",
    father: "Guru Har Rai Ji",
    mother: "Mata Krishan Kaur Ji",
    dob: "7 July 1656",
    birthPlace: "Kiratpur Sahib, Punjab",
  },
  {
    no: 9,
    name: "Guru Tegh Bahadur Ji",
    father: "Guru Hargobind Sahib Ji",
    mother: "Mata Nanki Ji",
    dob: "1 April 1621",
    birthPlace: "Amritsar, Punjab",
  },
  {
    no: 10,
    name: "Guru Gobind Singh Ji",
    father: "Guru Tegh Bahadur Ji",
    mother: "Mata Gujri Ji",
    dob: "22 December 1666",
    birthPlace: "Patna Sahib, Bihar",
  },
];

const FAITH_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Hindu: {
    bg: "oklch(0.25 0.10 45)",
    text: "oklch(0.78 0.14 75)",
    border: "oklch(0.78 0.14 75 / 0.4)",
  },
  Jain: {
    bg: "oklch(0.20 0.10 200)",
    text: "oklch(0.68 0.14 200)",
    border: "oklch(0.68 0.14 200 / 0.4)",
  },
  Sikh: {
    bg: "oklch(0.20 0.10 160)",
    text: "oklch(0.65 0.15 160)",
    border: "oklch(0.65 0.15 160 / 0.4)",
  },
};

export default function DivineInfo() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.10 45) 0%, oklch(0.24 0.12 55) 50%, oklch(0.20 0.10 45) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.78 0.14 75) 0%, transparent 60%), radial-gradient(circle at 70% 50%, oklch(0.65 0.15 160) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="text-5xl mb-4">✨</div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Divine Knowledge
          </h1>
          <p
            className="font-body text-xl mb-1"
            style={{ color: "oklch(0.88 0.08 65)", fontFamily: "serif" }}
          >
            देव-देवी परिचय • सिख गुरु परिचय
          </p>
          <p
            className="font-body text-sm mt-3"
            style={{ color: "oklch(0.65 0.06 60)" }}
          >
            Genealogy and biographies of Hindu deities and the ten Sikh Gurus
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="hindu">
          <TabsList
            className="w-full mb-8"
            style={{
              background: "oklch(0.20 0.07 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <TabsTrigger
              value="hindu"
              data-ocid="divine.hindu.tab"
              className="flex-1 font-heading"
            >
              🕉️ Hindu Deities
            </TabsTrigger>
            <TabsTrigger
              value="sikh"
              data-ocid="divine.sikh.tab"
              className="flex-1 font-heading"
            >
              ☬ Sikh Gurus
            </TabsTrigger>
          </TabsList>

          {/* Hindu Deities Tab */}
          <TabsContent value="hindu">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HINDU_DEITIES.map((deity, idx) => {
                const colors = FAITH_COLORS[deity.faith];
                return (
                  <Card
                    key={deity.name}
                    data-ocid={`divine.hindu.item.${idx + 1}`}
                    className="transition-all hover:-translate-y-0.5"
                    style={{
                      background: "oklch(0.18 0.06 22)",
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle
                            className="font-heading text-base"
                            style={{ color: "oklch(0.88 0.06 65)" }}
                          >
                            {deity.name}
                          </CardTitle>
                          <p
                            className="text-sm mt-0.5"
                            style={{
                              color: "oklch(0.65 0.05 60)",
                              fontFamily: "serif",
                            }}
                          >
                            {deity.nameHi}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs shrink-0"
                          style={{
                            background: colors.bg,
                            borderColor: colors.border,
                            color: colors.text,
                          }}
                        >
                          {deity.faith}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div
                        className="space-y-1 text-xs mb-3"
                        style={{ color: "oklch(0.65 0.05 55)" }}
                      >
                        <div className="flex gap-1">
                          <span
                            className="font-heading"
                            style={{ color: "oklch(0.55 0.05 55)" }}
                          >
                            Father:
                          </span>
                          <span>{deity.father || "—"}</span>
                        </div>
                        <div className="flex gap-1">
                          <span
                            className="font-heading"
                            style={{ color: "oklch(0.55 0.05 55)" }}
                          >
                            Mother:
                          </span>
                          <span>{deity.mother || "—"}</span>
                        </div>
                      </div>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "oklch(0.72 0.04 60)" }}
                      >
                        {deity.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Sikh Gurus Tab */}
          <TabsContent value="sikh">
            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: "oklch(0.65 0.15 160 / 0.3)" }}
            >
              {/* Header */}
              <div
                className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-heading uppercase tracking-wider"
                style={{
                  background: "oklch(0.22 0.10 160)",
                  color: "oklch(0.65 0.15 160)",
                }}
              >
                <div className="col-span-1">No.</div>
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Father</div>
                <div className="col-span-2">Mother</div>
                <div className="col-span-2">Date of Birth</div>
                <div className="col-span-2">Birth Place</div>
              </div>

              {SIKH_GURUS.map((guru, idx) => (
                <div
                  key={guru.no}
                  data-ocid={`divine.sikh.item.${idx + 1}`}
                  className="grid grid-cols-12 gap-2 px-4 py-3 text-sm border-t transition-colors"
                  style={{
                    background:
                      idx % 2 === 0
                        ? "oklch(0.18 0.06 22)"
                        : "oklch(0.16 0.05 22)",
                    borderColor: "oklch(0.65 0.15 160 / 0.08)",
                    color: "oklch(0.82 0.04 65)",
                  }}
                >
                  <div className="col-span-1">
                    <Badge
                      variant="outline"
                      className="text-xs font-heading"
                      style={{
                        borderColor: "oklch(0.65 0.15 160 / 0.5)",
                        color: "oklch(0.65 0.15 160)",
                      }}
                    >
                      {guru.no}
                    </Badge>
                  </div>
                  <div className="col-span-3">
                    <div
                      className="font-heading text-sm"
                      style={{ color: "oklch(0.88 0.06 65)" }}
                    >
                      {guru.name}
                    </div>
                  </div>
                  <div className="col-span-2 font-body text-xs flex items-center">
                    {guru.father}
                  </div>
                  <div className="col-span-2 font-body text-xs flex items-center">
                    {guru.mother}
                  </div>
                  <div className="col-span-2 font-body text-xs flex items-center">
                    {guru.dob}
                  </div>
                  <div className="col-span-2 font-body text-xs flex items-center">
                    {guru.birthPlace}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
