import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Clock,
  Download,
  Film,
  Music,
  Play,
  Send,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  animatedMovies,
  storyAudios,
  storyBooks,
} from "../data/jainBalVikasData";

const YOUTH_FEATURES = [
  {
    emoji: "📚",
    title: "जैन दर्शन",
    desc: "सत्य, अहिंसा, अनेकांतवाद — युवाओं के लिए",
    link: "/jain-dharma-jnana",
  },
  {
    emoji: "🏛️",
    title: "जैन इतिहास",
    desc: "तीर्थंकरों का इतिहास और जैन समाज का विकास",
    link: "/tirthankars",
  },
  {
    emoji: "🔬",
    title: "जैन विज्ञान",
    desc: "जैन दर्शन और आधुनिक विज्ञान का सामंजस्य",
    link: "/jain-encyclopedia",
  },
  {
    emoji: "🌿",
    title: "जैन नैतिकता",
    desc: "जीव-दया, पर्यावरण और जीवन-शैली",
    link: "/jain-pathshala",
  },
];

interface ContributionForm {
  name: string;
  contact: string;
  type: string;
  description: string;
}

export default function JainBalVikas() {
  const [form, setForm] = useState<ContributionForm>({
    name: "",
    contact: "",
    type: "कहानी",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("आपका योगदान प्राप्त हुआ!", {
        description: "हम शीघ्र ही आपसे संपर्क करेंगे।",
      });
      setForm({ name: "", contact: "", type: "कहानी", description: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="py-14 px-4 relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 30), oklch(0.22 0.07 45), oklch(0.18 0.05 28))",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 60%, oklch(0.78 0.14 75) 0%, transparent 50%), radial-gradient(circle at 70% 30%, oklch(0.68 0.20 48) 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🌸</span>
            <h1
              className="font-display text-3xl md:text-5xl font-bold"
              style={{ color: "oklch(0.88 0.10 75)" }}
            >
              जैन बाल विकास केंद्र
            </h1>
            <span className="text-4xl">🌸</span>
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            बच्चों के लिए जैन ज्ञान, कहानियाँ और शिक्षा
          </p>
          <div className="mt-6 flex items-center justify-center flex-wrap gap-4 text-sm text-muted-foreground">
            <span>🎧 {storyAudios.length} ऑडियो कथाएँ</span>
            <span>•</span>
            <span>🎬 {animatedMovies.length} एनिमेटेड फिल्में</span>
            <span>•</span>
            <span>📚 {storyBooks.length} पुस्तकें</span>
          </div>
        </div>
      </section>

      {/* Section 1: Audio Stories */}
      <section className="py-10 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.28 0.08 45), oklch(0.35 0.10 55))",
                border: "2px solid oklch(0.78 0.14 75 / 0.3)",
              }}
            >
              <Music
                className="w-5 h-5"
                style={{ color: "oklch(0.78 0.14 75)" }}
              />
            </div>
            <div>
              <h2
                className="font-display text-xl font-bold"
                style={{ color: "oklch(0.88 0.10 75)" }}
              >
                जैन कथा ऑडियो
              </h2>
              <p className="text-sm text-muted-foreground">
                बच्चों के लिए जैन कहानियाँ
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {storyAudios.map((audio, i) => (
              <div
                key={audio.id}
                data-ocid={`bal.audio.item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
              >
                <div
                  className="aspect-square rounded-lg flex items-center justify-center text-4xl mb-3"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.22 0.06 45), oklch(0.30 0.09 55))",
                  }}
                >
                  🎧
                </div>
                <Badge variant="secondary" className="text-xs mb-2">
                  {audio.category}
                </Badge>
                <h3 className="font-display font-bold text-sm mb-1 text-foreground leading-snug">
                  {audio.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                  {audio.description}
                </p>
                {audio.narrator && (
                  <p className="text-xs text-muted-foreground italic mb-3">
                    {audio.narrator}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" /> {audio.duration}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled
                    data-ocid={`bal.audio.play_button.${i + 1}`}
                    className="gap-1 text-xs"
                  >
                    <Play className="w-3 h-3" /> शीघ्र
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Animated Movies */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.28 0.08 45), oklch(0.35 0.10 55))",
                border: "2px solid oklch(0.78 0.14 75 / 0.3)",
              }}
            >
              <Film
                className="w-5 h-5"
                style={{ color: "oklch(0.78 0.14 75)" }}
              />
            </div>
            <div>
              <h2
                className="font-display text-xl font-bold"
                style={{ color: "oklch(0.88 0.10 75)" }}
              >
                एनिमेटेड जैन चलचित्र
              </h2>
              <p className="text-sm text-muted-foreground">
                बच्चों के लिए जैन कथाओं पर आधारित फिल्में
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {animatedMovies.map((movie, i) => (
              <div
                key={movie.id}
                data-ocid={`bal.movie.item.${i + 1}`}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
              >
                <div
                  className="aspect-video flex flex-col items-center justify-center gap-3"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.22 0.06 45), oklch(0.30 0.09 55))",
                  }}
                >
                  <span className="text-5xl">🎬</span>
                  <div className="text-center">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "oklch(0.88 0.10 75)" }}
                    >
                      {movie.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {movie.year} • {movie.duration}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className="text-xs flex-shrink-0"
                    >
                      {movie.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs flex-shrink-0 text-muted-foreground"
                    >
                      शीघ्र आ रहा है
                    </Badge>
                  </div>
                  <h3
                    className="font-display font-bold text-base mb-1"
                    style={{ color: "oklch(0.88 0.10 75)" }}
                  >
                    {movie.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {movie.description}
                  </p>
                  {movie.director && (
                    <p className="text-xs text-muted-foreground italic mb-3">
                      {movie.director}
                    </p>
                  )}
                  <Button
                    variant="outline"
                    disabled
                    data-ocid={`bal.movie.watch_button.${i + 1}`}
                    className="gap-2 text-sm"
                  >
                    <Play className="w-4 h-4" /> शीघ्र आ रहा है
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Story Books */}
      <section className="py-10 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.28 0.08 45), oklch(0.35 0.10 55))",
                border: "2px solid oklch(0.78 0.14 75 / 0.3)",
              }}
            >
              <BookOpen
                className="w-5 h-5"
                style={{ color: "oklch(0.78 0.14 75)" }}
              />
            </div>
            <div>
              <h2
                className="font-display text-xl font-bold"
                style={{ color: "oklch(0.88 0.10 75)" }}
              >
                जैन कथा पुस्तकें
              </h2>
              <p className="text-sm text-muted-foreground">
                बच्चों के लिए जैन साहित्य
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {storyBooks.map((book, i) => (
              <div
                key={book.id}
                data-ocid={`bal.book.item.${i + 1}`}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
              >
                <div
                  className="aspect-[3/4] flex items-center justify-center text-5xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.22 0.06 45), oklch(0.30 0.09 55))",
                  }}
                >
                  📚
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {book.ageGroup}
                    </Badge>
                    {book.status === "available" ? (
                      <Badge
                        variant="secondary"
                        className="text-xs text-green-600 border-green-200"
                      >
                        उपलब्ध
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-xs text-muted-foreground"
                      >
                        शीघ्र
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-sm mb-1 text-foreground leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1">
                    {book.author} • {book.pages} पृष्ठ
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {book.description}
                  </p>
                  <Button
                    size="sm"
                    variant={
                      book.status === "available" ? "default" : "outline"
                    }
                    disabled={book.status === "coming-soon"}
                    data-ocid={`bal.book.read_button.${i + 1}`}
                    className="gap-1.5 text-xs w-full"
                  >
                    {book.status === "available" ? (
                      <>
                        <Download className="w-3 h-3" /> पढ़ें / डाउनलोड
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" /> शीघ्र आ रहा है
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Contribution Form */}
      <section className="py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2
              className="font-display text-xl font-bold mb-2"
              style={{ color: "oklch(0.88 0.10 75)" }}
            >
              योगदान करें
            </h2>
            <p className="text-sm text-muted-foreground">
              अपनी जैन कहानी, पुस्तक या सामग्री साझा करें — बच्चों के लिए
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-6 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="contrib-name" className="text-sm">
                  नाम *
                </Label>
                <Input
                  id="contrib-name"
                  data-ocid="contribution.name_input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="आपका नाम"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contrib-contact" className="text-sm">
                  संपर्क (मोबाइल / ईमेल)
                </Label>
                <Input
                  id="contrib-contact"
                  data-ocid="contribution.contact_input"
                  value={form.contact}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, contact: e.target.value }))
                  }
                  placeholder="मोबाइल या ईमेल"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contrib-type" className="text-sm">
                प्रकार
              </Label>
              <select
                id="contrib-type"
                data-ocid="contribution.type_select"
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value }))
                }
                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm text-foreground"
              >
                <option value="कहानी">कहानी</option>
                <option value="पुस्तक">पुस्तक</option>
                <option value="फिल्म">फिल्म / वीडियो</option>
                <option value="अन्य">अन्य</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contrib-desc" className="text-sm">
                विवरण *
              </Label>
              <Textarea
                id="contrib-desc"
                data-ocid="contribution.description_textarea"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="अपनी सामग्री का संक्षिप्त विवरण दें..."
                className="min-h-[100px] resize-none"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={submitting || !form.name || !form.description}
              data-ocid="contribution.submit_button"
              className="w-full gap-2"
            >
              <Send className="w-4 h-4" />
              {submitting ? "भेजा जा रहा है..." : "योगदान भेजें"}
            </Button>
          </form>
        </div>
      </section>

      {/* Section 5: Youth Features */}
      <section className="py-10 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users
              className="w-7 h-7"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <div>
              <h2
                className="font-display text-xl font-bold"
                style={{ color: "oklch(0.88 0.10 75)" }}
              >
                युवाओं के लिए
              </h2>
              <p className="text-sm text-muted-foreground">
                जैन ज्ञान का युवा-अनुकूल संग्रह
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {YOUTH_FEATURES.map((feat, i) => (
              <Link key={feat.title} to={feat.link}>
                <div
                  data-ocid={`bal.youth.item.${i + 1}`}
                  className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary/40 transition-all duration-200 cursor-pointer h-full"
                >
                  <span className="text-4xl block mb-3">{feat.emoji}</span>
                  <h3
                    className="font-display font-bold text-sm mb-2"
                    style={{ color: "oklch(0.88 0.10 75)" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </p>
                  <p
                    className="text-xs mt-3 font-semibold"
                    style={{ color: "oklch(0.72 0.18 55)" }}
                  >
                    देखें →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
