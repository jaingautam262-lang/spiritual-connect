import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

interface Tirthankar {
  no: number;
  name: string;
  nameHi: string;
  father: string;
  mother: string;
  birthPlace: string;
  symbol: string;
}

const PRESENT_TIRTHANKARS: Tirthankar[] = [
  {
    no: 1,
    name: "Rishabhadev Ji (Adinath Ji)",
    nameHi: "ऋषभदेव जी (आदिनाथ जी)",
    father: "Nabhi",
    mother: "Maru Devi",
    birthPlace: "Ayodhya",
    symbol: "Bull",
  },
  {
    no: 2,
    name: "Ajitnath Ji",
    nameHi: "अजितनाथ जी",
    father: "JitSatru",
    mother: "Vijaya",
    birthPlace: "Ayodhya",
    symbol: "Elephant",
  },
  {
    no: 3,
    name: "Sambhavnath Ji",
    nameHi: "सम्भवनाथ जी",
    father: "Jitari",
    mother: "Sena",
    birthPlace: "Shravasti",
    symbol: "Horse",
  },
  {
    no: 4,
    name: "Abhinandan Swami Ji",
    nameHi: "अभिनन्दन स्वामी जी",
    father: "Samvar",
    mother: "Siddhartha",
    birthPlace: "Ayodhya",
    symbol: "Monkey",
  },
  {
    no: 5,
    name: "Sumatinath Ji",
    nameHi: "सुमतिनाथ जी",
    father: "Megharath",
    mother: "Mangla Devi",
    birthPlace: "Ayodhya",
    symbol: "Curlew Bird",
  },
  {
    no: 6,
    name: "Padmaprabha Swami Ji",
    nameHi: "पद्मप्रभु स्वामी जी",
    father: "Shridhar",
    mother: "Susima Devi",
    birthPlace: "Kaushambhi",
    symbol: "Lotus",
  },
  {
    no: 7,
    name: "Suparshvanath Ji",
    nameHi: "सुपार्श्वनाथ जी",
    father: "Pratishtha",
    mother: "Prithvi Devi",
    birthPlace: "Varanasi",
    symbol: "Svastika",
  },
  {
    no: 8,
    name: "Chandraprabha Ji",
    nameHi: "चन्द्रप्रभु जी",
    father: "Mahasen",
    mother: "Lakshmana",
    birthPlace: "Chandrapuri",
    symbol: "Moon",
  },
  {
    no: 9,
    name: "Suvidhinath Ji (Pushpadanta)",
    nameHi: "सुविधिनाथ जी (पुष्पदंत)",
    father: "Sugriva",
    mother: "Rama Rani",
    birthPlace: "Kakandi",
    symbol: "Crocodile",
  },
  {
    no: 10,
    name: "Shitalnath Ji",
    nameHi: "शीतलनाथ जी",
    father: "Dradharath",
    mother: "Nanda Rani",
    birthPlace: "Bhadrilpur",
    symbol: "Shrivatsa",
  },
  {
    no: 11,
    name: "Shreyansnath Ji",
    nameHi: "श्रेयांसनाथ जी",
    father: "Vishnu",
    mother: "Vishnu Devi",
    birthPlace: "Simhapuri",
    symbol: "Rhinoceros",
  },
  {
    no: 12,
    name: "Vasupujya Swami Ji",
    nameHi: "वासुपूज्य स्वामी जी",
    father: "Vasupujya",
    mother: "Jaya Devi",
    birthPlace: "Champapuri",
    symbol: "Buffalo",
  },
  {
    no: 13,
    name: "Vimalnath Ji",
    nameHi: "विमलनाथ जी",
    father: "Krutavarma",
    mother: "Shyama Devi",
    birthPlace: "Kampilyapur",
    symbol: "Boar",
  },
  {
    no: 14,
    name: "Anantnath Ji",
    nameHi: "अनंतनाथ जी",
    father: "Simhasen",
    mother: "Suyasha",
    birthPlace: "Ayodhya",
    symbol: "Bear / Hawk",
  },
  {
    no: 15,
    name: "Dhramnath Ji",
    nameHi: "धर्मनाथ जी",
    father: "Bhanu",
    mother: "Suvrata",
    birthPlace: "Ratnapur",
    symbol: "Vajra (Thunderbolt)",
  },
  {
    no: 16,
    name: "Shantinath Ji",
    nameHi: "शांतिनाथ जी",
    father: "Vishvasen",
    mother: "Achira",
    birthPlace: "Hastinapur",
    symbol: "Deer",
  },
  {
    no: 17,
    name: "Kunthunath Ji",
    nameHi: "कुन्थुनाथ जी",
    father: "Surasen",
    mother: "Shree Devi",
    birthPlace: "Hastinapur",
    symbol: "Goat",
  },
  {
    no: 18,
    name: "Arahnath Ji",
    nameHi: "अरहनाथ जी",
    father: "Sudarshan",
    mother: "Devi Rani",
    birthPlace: "Hastinapur",
    symbol: "Fish",
  },
  {
    no: 19,
    name: "Mallinath Ji",
    nameHi: "मल्लिनाथ जी",
    father: "Kumbha",
    mother: "Prabhavati",
    birthPlace: "Mithila",
    symbol: "Kalash (Pot)",
  },
  {
    no: 20,
    name: "Munisuvrat Swami Ji",
    nameHi: "मुनिसुव्रत स्वामी जी",
    father: "Sumitra",
    mother: "Padmavati",
    birthPlace: "Rajgruhi",
    symbol: "Tortoise",
  },
  {
    no: 21,
    name: "Naminath Ji",
    nameHi: "नमिनाथ जी",
    father: "Vijay",
    mother: "Vipra",
    birthPlace: "Mithila",
    symbol: "Blue Lotus",
  },
  {
    no: 22,
    name: "Arishtanemi Ji (Neminath)",
    nameHi: "अरिष्टनेमि जी (नेमिनाथ)",
    father: "Samudravijay",
    mother: "Shiva Devi",
    birthPlace: "Dwarka",
    symbol: "Conch",
  },
  {
    no: 23,
    name: "Parshvanath Ji",
    nameHi: "पार्श्वनाथ जी",
    father: "Ashvasen",
    mother: "Vama Devi",
    birthPlace: "Varanasi",
    symbol: "Snake",
  },
  {
    no: 24,
    name: "Mahavir Swami Ji",
    nameHi: "महावीर स्वामी जी",
    father: "Siddharatha",
    mother: "Trishala",
    birthPlace: "Kshatriya Kund",
    symbol: "Lion",
  },
];

const PAST_TIRTHANKARS = [
  "Shree Keval Gyani Ji",
  "Shree Nirvani Ji",
  "Shree Sagar Swami Ji",
  "Shree Mahayas Prabhu Ji",
  "Shree Vimal Nath Ji",
  "Shree Sarvanubhuti Ji",
  "Shree Shreedhar Nath Ji",
  "Shree Datt Prabhu Ji",
  "Shree Damodar Nath Ji",
  "Shree Sutej Bhagwan Ji",
  "Shree Swami Nath Ji",
  "Shree Munisuvrat Nath Ji",
  "Shree Sumti Nath Ji",
  "Shree Shiv Gati Ji",
  "Shree Astag Nath Ji",
  "Shree Namishwer Bhagvan Ji",
  "Shree Anil Prabhu Ji",
  "Shree Yasodhar Nath Ji",
  "Shree Krutarth Nath Ji",
  "Shree Jineshwer Nath Ji",
  "Shree Suddh Mati Ji",
  "Shree Shivankar Nath Ji",
  "Shree Spandan Prabh Swami Ji",
  "Shree Sampratti Prabhu Ji",
];

const FUTURE_TIRTHANKARS = [
  "Shree Padmanabh Prabhu Ji",
  "Shree Surdev Nath Ji",
  "Shree Suparshva Nath Ji",
  "Shree Swayamprabh Nath Ji",
  "Shree Sarvanubhuti Swami Ji",
  "Shree Devshruti Prabhu Ji",
  "Shree Uday Nath Ji",
  "Shree Pedhal Swami Ji",
  "Shree Pottil Nath Ji",
  "Shree Satkirti Prabhu Ji",
  "Shree Suvrat Nath Ji",
  "Shree Amam Nath Ji",
  "Shree Nishkashay Nath Ji",
  "Shree Nishpulak Nath Ji",
  "Shree Nirmam Swami Ji",
  "Shree Chitragupt Prabhu Ji",
  "Shree Samadhi Prabhu Ji",
  "Shree Sanvar Prabhu Ji",
  "Shree Yasodhar Swami Ji",
  "Shree Vijay Nath Ji",
  "Shree Malli Nath Ji",
  "Shree Dev Prabhu Ji",
  "Shree Anant Virya Prabhu Ji",
  "Shree Bhadrankar Prabhu Ji",
];

export default function Tirthankars() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPresent = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return PRESENT_TIRTHANKARS;
    return PRESENT_TIRTHANKARS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.nameHi.includes(q) ||
        t.father.toLowerCase().includes(q) ||
        t.mother.toLowerCase().includes(q) ||
        t.birthPlace.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.10 55) 0%, oklch(0.22 0.12 45) 50%, oklch(0.18 0.10 55) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.78 0.14 75) 0%, transparent 60%), radial-gradient(circle at 70% 50%, oklch(0.68 0.20 48) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <div className="text-5xl mb-4">🕉️</div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            24 Tirthankaras of Jainism
          </h1>
          <p
            className="font-body text-xl mb-2"
            style={{ color: "oklch(0.88 0.08 65)", fontFamily: "serif" }}
          >
            चौबीस तीर्थंकर — अतीत, वर्तमान, अनागत
          </p>
          <p
            className="font-body text-sm mt-3 max-w-2xl mx-auto"
            style={{ color: "oklch(0.65 0.06 60)" }}
          >
            Tirthankaras are enlightened beings who have attained omniscience
            and show the path to liberation. In Jain cosmology, 24 Tirthankaras
            appear in each cosmic time cycle — Past (Ateet), Present (Vartaman),
            and Future (Anagat).
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="present">
          <TabsList
            className="w-full mb-6"
            style={{
              background: "oklch(0.20 0.07 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <TabsTrigger
              value="present"
              data-ocid="tirthankars.present.tab"
              className="flex-1 font-heading text-sm"
            >
              🟡 Present (Vartaman)
            </TabsTrigger>
            <TabsTrigger
              value="past"
              data-ocid="tirthankars.past.tab"
              className="flex-1 font-heading text-sm"
            >
              ⬅️ Past (Ateet)
            </TabsTrigger>
            <TabsTrigger
              value="future"
              data-ocid="tirthankars.future.tab"
              className="flex-1 font-heading text-sm"
            >
              ➡️ Future (Anagat)
            </TabsTrigger>
          </TabsList>

          {/* Present Tab */}
          <TabsContent value="present">
            {/* Search */}
            <div className="relative mb-6 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.60 0.06 55)" }}
              />
              <Input
                data-ocid="tirthankars.search_input"
                placeholder="Search Tirthankaras..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-body text-sm"
                style={{
                  background: "oklch(0.20 0.06 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.88 0.04 70)",
                }}
              />
            </div>

            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.2)" }}
            >
              {/* Table header */}
              <div
                className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-heading uppercase tracking-wider"
                style={{
                  background: "oklch(0.22 0.12 45)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                <div className="col-span-1">No.</div>
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Father</div>
                <div className="col-span-2">Mother</div>
                <div className="col-span-2">Birth Place</div>
                <div className="col-span-2">Symbol</div>
              </div>

              {filteredPresent.length === 0 ? (
                <div
                  data-ocid="tirthankars.empty_state"
                  className="py-12 text-center"
                  style={{ color: "oklch(0.55 0.05 55)" }}
                >
                  No Tirthankaras found.
                </div>
              ) : (
                filteredPresent.map((t, idx) => (
                  <div
                    key={t.no}
                    data-ocid={`tirthankars.item.${idx + 1}`}
                    className="grid grid-cols-12 gap-2 px-4 py-3 text-sm border-t transition-colors"
                    style={{
                      background:
                        idx % 2 === 0
                          ? "oklch(0.18 0.06 22)"
                          : "oklch(0.16 0.05 22)",
                      borderColor: "oklch(0.78 0.14 75 / 0.08)",
                      color: "oklch(0.85 0.04 70)",
                    }}
                  >
                    <div className="col-span-1">
                      <Badge
                        variant="outline"
                        className="text-xs font-heading"
                        style={{
                          borderColor: "oklch(0.78 0.14 75 / 0.4)",
                          color: "oklch(0.78 0.14 75)",
                        }}
                      >
                        {t.no}
                      </Badge>
                    </div>
                    <div className="col-span-3">
                      <div
                        className="font-heading text-sm"
                        style={{ color: "oklch(0.88 0.06 65)" }}
                      >
                        {t.name}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{
                          color: "oklch(0.65 0.05 60)",
                          fontFamily: "serif",
                        }}
                      >
                        {t.nameHi}
                      </div>
                    </div>
                    <div className="col-span-2 font-body text-xs flex items-center">
                      {t.father}
                    </div>
                    <div className="col-span-2 font-body text-xs flex items-center">
                      {t.mother}
                    </div>
                    <div className="col-span-2 font-body text-xs flex items-center">
                      {t.birthPlace}
                    </div>
                    <div className="col-span-2 font-body text-xs flex items-center">
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: "oklch(0.60 0.15 145 / 0.4)",
                          color: "oklch(0.65 0.15 145)",
                        }}
                      >
                        {t.symbol}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
            <p
              className="text-xs mt-3 text-center"
              style={{ color: "oklch(0.50 0.04 55)" }}
            >
              Showing {filteredPresent.length} of {PRESENT_TIRTHANKARS.length}{" "}
              Tirthankaras
            </p>
          </TabsContent>

          {/* Past Tab */}
          <TabsContent value="past">
            <div
              className="rounded-xl p-2 border"
              style={{
                background: "oklch(0.17 0.06 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              <div
                className="px-4 py-3 mb-2 rounded-lg"
                style={{ background: "oklch(0.22 0.10 50)" }}
              >
                <h2
                  className="font-heading text-lg"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  Ateet Tirthankar — Past Era
                </h2>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.60 0.05 55)" }}
                >
                  24 Tirthankaras of the previous cosmic time cycle
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
                {PAST_TIRTHANKARS.map((name, idx) => (
                  <div
                    key={name}
                    data-ocid={`tirthankars.past.item.${idx + 1}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                    style={{
                      background: "oklch(0.20 0.07 22)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.10)",
                    }}
                  >
                    <span
                      className="text-xs font-heading w-6 text-center"
                      style={{ color: "oklch(0.60 0.10 55)" }}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className="font-body text-sm"
                      style={{ color: "oklch(0.82 0.04 65)" }}
                    >
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Future Tab */}
          <TabsContent value="future">
            <div
              className="rounded-xl p-2 border"
              style={{
                background: "oklch(0.17 0.06 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              <div
                className="px-4 py-3 mb-2 rounded-lg"
                style={{ background: "oklch(0.20 0.10 270)" }}
              >
                <h2
                  className="font-heading text-lg"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  Anagat Tirthankar — Future Era
                </h2>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.60 0.05 55)" }}
                >
                  24 Tirthankaras of the upcoming cosmic time cycle
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
                {FUTURE_TIRTHANKARS.map((name, idx) => (
                  <div
                    key={name}
                    data-ocid={`tirthankars.future.item.${idx + 1}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                    style={{
                      background: "oklch(0.20 0.07 22)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.10)",
                    }}
                  >
                    <span
                      className="text-xs font-heading w-6 text-center"
                      style={{ color: "oklch(0.65 0.12 270)" }}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className="font-body text-sm"
                      style={{ color: "oklch(0.82 0.04 65)" }}
                    >
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
