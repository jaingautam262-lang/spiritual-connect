import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  CheckCircle,
  Edit,
  Eye,
  EyeOff,
  FileText,
  Gem,
  Lock,
  Music,
  Package,
  Plus,
  ShoppingBag,
  Tags,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { BhajanEntry, HolyBookEntry, VratKathaEntry } from "../backend";
import { type Ashtakam, ashtakamDataA } from "../data/ashtakamDataA";
import { ashtakamDataB } from "../data/ashtakamDataB";
import { ashtakamDataC } from "../data/ashtakamDataC";
import type { FestivalEvent } from "../data/festival-calendar-data";
import { kavachBatch2025 } from "../data/kavachBatch2025";
import { type Kavach, kavachDataA } from "../data/kavachDataA";
import { kavachDataB } from "../data/kavachDataB";
import { kavachData_C } from "../data/kavachData_C";
import { pujaTypesData } from "../data/pujaTypesData";
import { sahasranamaData } from "../data/sahasranamaData";
import type { ProductVariant, ProductWithMRP } from "../data/shopData_new";
import { ALL_NEW_PRODUCTS } from "../data/shopData_new";
import type { Stotra } from "../data/stotraData";
import { type Stuti, stutiData } from "../data/stutiData";
import {
  useAddBhajan,
  useAddFestivalEvent,
  useAddHolyBookEntry,
  useAddVratKatha,
  useBhajans,
  useBlogArticles,
  useCreateBlogArticle,
  useCreatePalmistryContent,
  useCreatePujaEvent,
  useCreateVastuContent,
  useCreateWebStory,
  useDeleteBhajan,
  useDeleteBlogArticle,
  useDeleteFestivalEvent,
  useDeleteHolyBookEntry,
  useDeletePalmistryContent,
  useDeletePujaEvent,
  useDeleteVastuContent,
  useDeleteVratKatha,
  useDeleteWebStory,
  useFestivalEvents,
  useGetAllPujaEventsAdmin,
  useGetAllPujaReports,
  useHolyBookEntries,
  usePalmistryContents,
  useUpdatePujaEvent,
  useUpdatePujaReport,
  useVastuContents,
  useVratKathas,
  useWebStories,
} from "../hooks/useQueries";
import type { BlogArticle, PujaReport, WebStory } from "../types/backend-types";

// ─── All kavach/ashtakam/stuti/sahasranama data combined ─────────────────────
const ALL_KAVACHS: Kavach[] = [
  ...kavachDataA,
  ...kavachDataB,
  ...kavachData_C,
  ...kavachBatch2025,
];

const ALL_ASHTAKAMS: Ashtakam[] = [
  ...ashtakamDataA,
  ...ashtakamDataB,
  ...ashtakamDataC,
];

const ALL_STUTIS: Stuti[] = [...stutiData];
const ALL_SAHASRANAMAS: Stotra[] = [...sahasranamaData];

// ─── Generic read-only content management tab ────────────────────────────────
interface ContentEntry {
  id: string;
  name?: string;
  title?: string;
  deity?: string;
  faith?: string;
  benefits?: string;
  meaning?: string;
}

interface StaticContentManagementProps {
  label: string;
  icon: string;
  entries: ContentEntry[];
  fields: { key: keyof ContentEntry; label: string }[];
  ocidPrefix: string;
}

function StaticContentManagement({
  label,
  icon,
  entries,
  fields,
  ocidPrefix,
}: StaticContentManagementProps) {
  const [localHidden, setLocalHidden] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  const visible = entries
    .filter((e) => !localHidden.has(e.id))
    .filter((e) => {
      const q = search.toLowerCase();
      if (!q) return true;
      return (
        (e.name || e.title || "").toLowerCase().includes(q) ||
        (e.deity || "").toLowerCase().includes(q)
      );
    })
    .slice(0, 20);

  const handleAdd = (ev: React.FormEvent) => {
    ev.preventDefault();
    toast.success(
      `${label} entry noted (frontend state only — data file update required to persist)`,
    );
    setShowForm(false);
    setForm({});
  };

  return (
    <div className="space-y-6">
      {/* Info banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm text-foreground">
        <span className="font-semibold">ℹ️ Note:</span> Content stored in
        frontend data files. Contact developer to update data files. Entries
        added here exist in local state only and will reset on reload.
      </div>

      {/* Stats */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            {icon} {label}
            <Badge variant="secondary" className="ml-1">
              {entries.length - localHidden.size} entries
            </Badge>
          </h2>
          <Button
            size="sm"
            onClick={() => setShowForm((v) => !v)}
            data-ocid={`${ocidPrefix}.toggle_form_button`}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Entry
          </Button>
        </div>

        {/* Search */}
        <Input
          placeholder={`Search ${label.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
          data-ocid={`${ocidPrefix}.search_input`}
        />

        {/* Add form */}
        {showForm && (
          <form
            onSubmit={handleAdd}
            className="bg-muted/40 rounded-lg p-4 mb-4 space-y-3 border border-border"
          >
            <h3 className="font-semibold text-sm text-foreground">
              Add New {label} Entry
            </h3>
            {fields.map((f) => (
              <div key={f.key}>
                <Label className="text-sm mb-1 block">{f.label}</Label>
                {f.key === "benefits" || f.key === "meaning" ? (
                  <Textarea
                    value={form[f.key] || ""}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                    }
                    rows={2}
                    placeholder={f.label}
                  />
                ) : (
                  <Input
                    value={form[f.key] || ""}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                    }
                    placeholder={f.label}
                  />
                )}
              </div>
            ))}
            <Textarea
              placeholder="Full text / content"
              rows={4}
              value={form.fullText || ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, fullText: e.target.value }))
              }
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                size="sm"
                data-ocid={`${ocidPrefix}.submit_button`}
              >
                <CheckCircle className="w-4 h-4 mr-1" /> Save (Local)
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowForm(false);
                  setForm({});
                }}
                data-ocid={`${ocidPrefix}.cancel_button`}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* List */}
        <div className="space-y-2">
          {visible.map((entry, i) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border"
              data-ocid={`${ocidPrefix}.item.${i + 1}`}
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-foreground truncate">
                  {entry.name || entry.title || entry.id}
                </p>
                {entry.deity && (
                  <p className="text-xs text-muted-foreground">
                    {entry.deity}
                    {entry.faith ? ` · ${entry.faith}` : ""}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10 shrink-0"
                onClick={() =>
                  setLocalHidden((prev) => new Set([...prev, entry.id]))
                }
                aria-label="Hide entry"
                data-ocid={`${ocidPrefix}.delete_button.${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {visible.length === 0 && (
            <p
              className="text-center text-muted-foreground text-sm py-4"
              data-ocid={`${ocidPrefix}.empty_state`}
            >
              No entries found.
            </p>
          )}
          {entries.length > 20 && (
            <p className="text-xs text-muted-foreground text-center pt-2">
              Showing first 20 of {entries.length} entries
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Kavach Management Tab ────────────────────────────────────────────────────
function KavachManagement() {
  return (
    <StaticContentManagement
      label="Kavach"
      icon="🛡️"
      entries={ALL_KAVACHS.map((k) => ({
        id: k.id,
        name: k.name,
        deity: k.deity,
        faith: k.faith,
        benefits: k.benefits,
      }))}
      fields={[
        { key: "name", label: "Title (English)" },
        { key: "deity", label: "Deity" },
        { key: "faith", label: "Faith" },
        { key: "benefits", label: "Benefits" },
      ]}
      ocidPrefix="admin.kavach"
    />
  );
}

// ─── Ashtakam Management Tab ──────────────────────────────────────────────────
function AshtakamManagement() {
  return (
    <StaticContentManagement
      label="Ashtakam"
      icon="🔔"
      entries={ALL_ASHTAKAMS.map((a) => ({
        id: a.id,
        name: a.name,
        deity: a.deity,
        faith: "Hindu",
        benefits: a.benefits,
        meaning: a.meaning,
      }))}
      fields={[
        { key: "name", label: "Title (English)" },
        { key: "deity", label: "Deity" },
        { key: "faith", label: "Faith" },
        { key: "meaning", label: "Meaning" },
        { key: "benefits", label: "Benefits" },
      ]}
      ocidPrefix="admin.ashtakam"
    />
  );
}

// ─── Stuti Management Tab ─────────────────────────────────────────────────────
function StutiManagement() {
  return (
    <StaticContentManagement
      label="Stuti"
      icon="🙏"
      entries={ALL_STUTIS.map((s) => ({
        id: s.id,
        name: s.name,
        deity: s.deity,
        faith: s.faith,
        benefits: s.benefits,
        meaning: s.meaning,
      }))}
      fields={[
        { key: "name", label: "Title (English)" },
        { key: "deity", label: "Deity" },
        { key: "faith", label: "Faith" },
        { key: "meaning", label: "Meaning" },
        { key: "benefits", label: "Benefits" },
      ]}
      ocidPrefix="admin.stuti"
    />
  );
}

// ─── Sahasranam Management Tab ────────────────────────────────────────────────
function SahasranamManagement() {
  return (
    <StaticContentManagement
      label="Sahasranam"
      icon="📿"
      entries={ALL_SAHASRANAMAS.map((s) => ({
        id: s.id,
        name: s.title,
        deity: s.deity,
        faith: s.faith,
      }))}
      fields={[
        { key: "name", label: "Title (English)" },
        { key: "deity", label: "Deity" },
        { key: "faith", label: "Faith" },
        { key: "meaning", label: "Meaning" },
        { key: "benefits", label: "Benefits" },
      ]}
      ocidPrefix="admin.sahasranam"
    />
  );
}

const ADMIN_PASSWORD = "admin123";
const PM_PASSWORD = "pm123";

const BOOK_OPTIONS = [
  "Bhagavad Gita",
  "Ramcharitmanas",
  "Shrimad Bhagavatam",
  "Rigveda",
  "Samaveda",
  "Yajurveda",
  "Atharvaveda",
  "Hanuman Chalisa",
  "Sundarkand",
  "Durga Saptashati",
  "Vishnu Sahasranama",
  "Shiva Mahimna Stotram",
];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve((reader.result as string).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Bhajan Management Tab ────────────────────────────────────────────────────

function BhajanManagement() {
  const { data: bhajans = [], isLoading } = useBhajans();
  const addBhajan = useAddBhajan();
  const deleteBhajan = useDeleteBhajan();

  const [form, setForm] = useState({
    title: "",
    deity: "",
    artist: "",
    lyricsText: "",
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.deity) {
      toast.error("Title and deity are required");
      return;
    }
    let audioBase64 = "";
    if (audioFile) audioBase64 = await fileToBase64(audioFile);
    const entry: BhajanEntry = {
      id: `bhajan-${Date.now()}`,
      title: form.title,
      deity: form.deity,
      artist: form.artist,
      lyricsText: form.lyricsText,
      audioBase64,
      hasMockAudio: false,
      createdAt: BigInt(Date.now()),
    };
    addBhajan.mutate(entry, {
      onSuccess: () => {
        toast.success("Bhajan added successfully!");
        setForm({ title: "", deity: "", artist: "", lyricsText: "" });
        setAudioFile(null);
        if (fileRef.current) fileRef.current.value = "";
      },
      onError: (err) => toast.error(`Error: ${err.message}`),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Add New Bhajan
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="b-title">Title *</Label>
              <Input
                id="b-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Bhajan title"
              />
            </div>
            <div>
              <Label htmlFor="b-deity">Deity *</Label>
              <Input
                id="b-deity"
                value={form.deity}
                onChange={(e) =>
                  setForm((f) => ({ ...f, deity: e.target.value }))
                }
                placeholder="e.g. Ganesh, Shiva"
              />
            </div>
            <div>
              <Label htmlFor="b-artist">Artist</Label>
              <Input
                id="b-artist"
                value={form.artist}
                onChange={(e) =>
                  setForm((f) => ({ ...f, artist: e.target.value }))
                }
                placeholder="Artist name"
              />
            </div>
            <div>
              <Label htmlFor="b-audio">Audio File (MP3/WAV)</Label>
              <Input
                id="b-audio"
                type="file"
                accept="audio/*"
                ref={fileRef}
                onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="b-lyrics">Lyrics Text</Label>
            <Textarea
              id="b-lyrics"
              value={form.lyricsText}
              onChange={(e) =>
                setForm((f) => ({ ...f, lyricsText: e.target.value }))
              }
              placeholder="Enter lyrics..."
              rows={4}
            />
          </div>
          <Button
            type="submit"
            disabled={addBhajan.isPending}
            className="w-full sm:w-auto"
          >
            {addBhajan.isPending ? (
              "Adding..."
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Add Bhajan
              </>
            )}
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">
          Existing Bhajans ({bhajans.length})
        </h3>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <div className="space-y-2">
            {bhajans.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No bhajans yet. Add one above.
              </p>
            )}
            {bhajans.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {b.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {b.artist} • {b.deity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {b.audioBase64 && (
                    <Badge variant="outline" className="text-xs">
                      <Music className="w-3 h-3 mr-1" />
                      Audio
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() =>
                      deleteBhajan.mutate(b.id, {
                        onSuccess: () => toast.success("Bhajan deleted"),
                        onError: (err) => toast.error(err.message),
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Vrat Katha Management Tab ────────────────────────────────────────────────

function VratKathaManagement() {
  const { data: kathas = [], isLoading } = useVratKathas();
  const addKatha = useAddVratKatha();
  const deleteKatha = useDeleteVratKatha();

  const [form, setForm] = useState({
    title: "",
    festivalName: "",
    storyText: "",
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.festivalName) {
      toast.error("Title and festival name are required");
      return;
    }
    let audioBase64 = "";
    if (audioFile) audioBase64 = await fileToBase64(audioFile);
    const entry: VratKathaEntry = {
      id: `katha-${Date.now()}`,
      title: form.title,
      festivalName: form.festivalName,
      storyText: form.storyText,
      audioBase64,
      hasMockAudio: false,
      createdAt: BigInt(Date.now()),
    };
    addKatha.mutate(entry, {
      onSuccess: () => {
        toast.success("Vrat Katha added successfully!");
        setForm({ title: "", festivalName: "", storyText: "" });
        setAudioFile(null);
        if (fileRef.current) fileRef.current.value = "";
      },
      onError: (err) => toast.error(`Error: ${err.message}`),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Add New Vrat Katha
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="vk-title">Title *</Label>
              <Input
                id="vk-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Katha title"
              />
            </div>
            <div>
              <Label htmlFor="vk-festival">Festival Name *</Label>
              <Input
                id="vk-festival"
                value={form.festivalName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, festivalName: e.target.value }))
                }
                placeholder="e.g. Navratri, Ekadashi"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="vk-audio">Audio File (MP3/WAV)</Label>
              <Input
                id="vk-audio"
                type="file"
                accept="audio/*"
                ref={fileRef}
                onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="vk-story">Story Text</Label>
            <Textarea
              id="vk-story"
              value={form.storyText}
              onChange={(e) =>
                setForm((f) => ({ ...f, storyText: e.target.value }))
              }
              placeholder="Enter the katha story..."
              rows={6}
            />
          </div>
          <Button
            type="submit"
            disabled={addKatha.isPending}
            className="w-full sm:w-auto"
          >
            {addKatha.isPending ? (
              "Adding..."
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Add Katha
              </>
            )}
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">
          Existing Kathas ({kathas.length})
        </h3>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <div className="space-y-2">
            {kathas.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No kathas yet. Add one above.
              </p>
            )}
            {kathas.map((k) => (
              <div
                key={k.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {k.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {k.festivalName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {k.audioBase64 && (
                    <Badge variant="outline" className="text-xs">
                      <Music className="w-3 h-3 mr-1" />
                      Audio
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() =>
                      deleteKatha.mutate(k.id, {
                        onSuccess: () => toast.success("Katha deleted"),
                        onError: (err) => toast.error(err.message),
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Holy Books Management Tab ────────────────────────────────────────────────

function HolyBooksManagement() {
  const [selectedBook, setSelectedBook] = useState("Bhagavad Gita");
  const { data: entries = [], isLoading } = useHolyBookEntries(selectedBook);
  const addEntry = useAddHolyBookEntry();
  const deleteEntry = useDeleteHolyBookEntry();

  const [form, setForm] = useState({
    bookTitle: "Bhagavad Gita",
    chapterTitle: "",
    shlokaText: "",
    bookCategory: "",
    trackNumber: "1",
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.bookTitle || !form.chapterTitle) {
      toast.error("Book title and chapter title are required");
      return;
    }
    let audioBase64 = "";
    if (audioFile) audioBase64 = await fileToBase64(audioFile);
    const entry: HolyBookEntry = {
      id: `holy-${Date.now()}`,
      bookTitle: form.bookTitle,
      chapterTitle: form.chapterTitle,
      shlokaText: form.shlokaText,
      audioBase64,
      bookCategory: form.bookCategory,
      trackNumber: BigInt(Number.parseInt(form.trackNumber) || 1),
      createdAt: BigInt(Date.now()),
    };
    addEntry.mutate(entry, {
      onSuccess: () => {
        toast.success("Holy book entry added!");
        setForm((f) => ({
          ...f,
          chapterTitle: "",
          shlokaText: "",
          trackNumber: "1",
        }));
        setAudioFile(null);
        if (fileRef.current) fileRef.current.value = "";
      },
      onError: (err) => toast.error(`Error: ${err.message}`),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Add Holy Book Chapter
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="hb-book">Book Title *</Label>
              <select
                id="hb-book"
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                value={form.bookTitle}
                onChange={(e) => {
                  setForm((f) => ({ ...f, bookTitle: e.target.value }));
                  setSelectedBook(e.target.value);
                }}
              >
                {BOOK_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="hb-chapter">Chapter Title *</Label>
              <Input
                id="hb-chapter"
                value={form.chapterTitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, chapterTitle: e.target.value }))
                }
                placeholder="Chapter/section title"
              />
            </div>
            <div>
              <Label htmlFor="hb-category">Book Category</Label>
              <Input
                id="hb-category"
                value={form.bookCategory}
                onChange={(e) =>
                  setForm((f) => ({ ...f, bookCategory: e.target.value }))
                }
                placeholder="e.g. Veda, Purana, Stotra"
              />
            </div>
            <div>
              <Label htmlFor="hb-track">Track Number</Label>
              <Input
                id="hb-track"
                type="number"
                min="1"
                value={form.trackNumber}
                onChange={(e) =>
                  setForm((f) => ({ ...f, trackNumber: e.target.value }))
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="hb-audio">Audio File (MP3/WAV)</Label>
              <Input
                id="hb-audio"
                type="file"
                accept="audio/*"
                ref={fileRef}
                onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="hb-shloka">Shloka / Text</Label>
            <Textarea
              id="hb-shloka"
              value={form.shlokaText}
              onChange={(e) =>
                setForm((f) => ({ ...f, shlokaText: e.target.value }))
              }
              placeholder="Enter shloka or text content..."
              rows={5}
            />
          </div>
          <Button
            type="submit"
            disabled={addEntry.isPending}
            className="w-full sm:w-auto"
          >
            {addEntry.isPending ? (
              "Adding..."
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Add Chapter
              </>
            )}
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">
            Entries for: {selectedBook} ({entries.length})
          </h3>
          <select
            className="border border-input rounded-md px-2 py-1 text-xs bg-background text-foreground"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            {BOOK_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <div className="space-y-2">
            {entries.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No entries for this book yet.
              </p>
            )}
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {entry.chapterTitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Track {entry.trackNumber.toString()} • {entry.bookCategory}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {entry.audioBase64 && (
                    <Badge variant="outline" className="text-xs">
                      <Music className="w-3 h-3 mr-1" />
                      Audio
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() =>
                      deleteEntry.mutate(entry.id, {
                        onSuccess: () => toast.success("Entry deleted"),
                        onError: (err) => toast.error(err.message),
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Puja Types Management Tab ────────────────────────────────────────────────

function PujaTypesManagement() {
  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" /> Puja Types Directory
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {pujaTypesData.length} puja types loaded from data file. Edit{" "}
          <code className="bg-muted px-1 rounded text-xs">
            src/data/pujaTypesData.ts
          </code>{" "}
          to add or modify puja types.
        </p>
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {pujaTypesData.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{p.imageEmoji}</span>
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {p.nameHindi}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {p.name} • {p.category} • {p.deity}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs shrink-0">
                {p.duration}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Puja Reports Management Tab ──────────────────────────────────────────────

const STATUS_COLORS: Record<PujaReport["status"], string> = {
  Pending: "oklch(0.70 0.18 55)",
  Completed: "oklch(0.55 0.18 145)",
  Verified: "oklch(0.55 0.16 220)",
};

function PujaReportsManagement() {
  const { data: reports = [], isLoading } = useGetAllPujaReports();
  const updateReport = useUpdatePujaReport();

  const handleStatus = (id: string, status: PujaReport["status"]) => {
    updateReport.mutate(
      { id, status },
      {
        onSuccess: () => toast.success(`Status → ${status}`),
        onError: () => toast.error("Update failed"),
      },
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" /> All Puja Reports (
          {reports.length})
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Manage status of all submitted puja reports
        </p>

        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : reports.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No puja reports submitted yet.
          </p>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {reports.map((r) => (
              <div key={r.id} className="p-4 bg-muted/30 rounded-lg space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {r.pujaType}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.userName} • {r.deity} • {r.datePerformed}
                    </p>
                    {r.intention && (
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        "{r.intention}"
                      </p>
                    )}
                  </div>
                  <Badge
                    className="text-xs shrink-0"
                    style={{
                      background: `${STATUS_COLORS[r.status]}/15`,
                      color: STATUS_COLORS[r.status],
                    }}
                  >
                    {r.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {(
                    [
                      "Pending",
                      "Completed",
                      "Verified",
                    ] as PujaReport["status"][]
                  ).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleStatus(r.id, s)}
                      disabled={r.status === s}
                      className="flex-1 py-1.5 rounded-md text-xs font-semibold transition-all disabled:opacity-40"
                      style={{
                        background:
                          r.status === s
                            ? `${STATUS_COLORS[s]}/20`
                            : "transparent",
                        color: STATUS_COLORS[s],
                        border: `1px solid ${STATUS_COLORS[s]}/30`,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Blog Management Tab ──────────────────────────────────────────────────────

function BlogManagement() {
  const { data: articles = [], isLoading } = useBlogArticles();
  const createArticle = useCreateBlogArticle();
  const deleteArticle = useDeleteBlogArticle();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "Spirituality",
    author: "",
    tags: "",
    imageUrl: "",
    publishDate: new Date().toISOString().split("T")[0],
    isPublished: false,
  });

  const BLOG_CATEGORIES = [
    "Spirituality",
    "Astrology",
    "Numerology",
    "Vastu",
    "Rudraksha",
    "Gemstones",
    "Festivals",
    "Mantras",
    "Meditation",
    "Ayurveda",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error("Title and content are required");
      return;
    }
    const article: BlogArticle = {
      id: `blog-${Date.now()}`,
      title: form.title,
      titleHindi: form.title,
      content: form.content,
      contentHindi: "",
      category: "spiritual-articles",
      author: form.author || "Spiritual Connect",
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featuredImageUrl: form.imageUrl,
      publishDate: form.publishDate,
      isPublished: form.isPublished,
      slug: form.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      excerpt: form.content.slice(0, 120),
      excerptHindi: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    createArticle.mutate(article, {
      onSuccess: () => {
        toast.success("Blog article saved!");
        setForm({
          title: "",
          content: "",
          category: "Spirituality",
          author: "",
          tags: "",
          imageUrl: "",
          publishDate: new Date().toISOString().split("T")[0],
          isPublished: false,
        });
      },
      onError: () => toast.error("Failed to save article"),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> New Blog Article
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <Label htmlFor="blog-title">Title *</Label>
              <Input
                id="blog-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Article title"
              />
            </div>
            <div>
              <Label htmlFor="blog-category">Category</Label>
              <select
                id="blog-category"
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="blog-author">Author</Label>
              <Input
                id="blog-author"
                value={form.author}
                onChange={(e) =>
                  setForm((f) => ({ ...f, author: e.target.value }))
                }
                placeholder="Author name"
              />
            </div>
            <div>
              <Label htmlFor="blog-tags">Tags (comma separated)</Label>
              <Input
                id="blog-tags"
                value={form.tags}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tags: e.target.value }))
                }
                placeholder="shiva, mantras, meditation"
              />
            </div>
            <div>
              <Label htmlFor="blog-image">Featured Image URL</Label>
              <Input
                id="blog-image"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="blog-date">Publish Date</Label>
              <Input
                id="blog-date"
                type="date"
                value={form.publishDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, publishDate: e.target.value }))
                }
              />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="blog-published"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isPublished: e.target.checked }))
                }
              />
              <Label htmlFor="blog-published">Publish immediately</Label>
            </div>
          </div>
          <div>
            <Label htmlFor="blog-content">Content *</Label>
            <Textarea
              id="blog-content"
              value={form.content}
              onChange={(e) =>
                setForm((f) => ({ ...f, content: e.target.value }))
              }
              placeholder="Write article content in Hindi or English..."
              rows={8}
            />
          </div>
          <Button type="submit" disabled={createArticle.isPending}>
            {createArticle.isPending ? (
              "Saving..."
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" /> Save Article
              </>
            )}
          </Button>
        </form>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">
          Blog Articles ({articles.length})
        </h3>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : articles.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No articles yet. Create one above.
          </p>
        ) : (
          <div className="space-y-2">
            {articles.map((a, idx) => (
              <div
                key={`article-${a.id ?? idx}`}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {a.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {a.category} • {a.author}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {a.isPublished ? "✓ Published" : "Draft"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() =>
                      deleteArticle.mutate(a.id ?? "", {
                        onSuccess: () => toast.success("Article deleted"),
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Web Stories Management Tab ───────────────────────────────────────────────

function WebStoriesManagement() {
  const { data: stories = [], isLoading } = useWebStories();
  const createStory = useCreateWebStory();
  const deleteStory = useDeleteWebStory();

  const [form, setForm] = useState({
    title: "",
    category: "Spiritual",
    slides: [
      {
        id: `s-${Date.now()}`,
        imageUrl: "",
        title: "",
        description: "",
        order: 1,
      },
    ],
  });

  const addSlide = () => {
    setForm((f) => ({
      ...f,
      slides: [
        ...f.slides,
        {
          id: `s-${Date.now()}-${f.slides.length}`,
          imageUrl: "",
          title: "",
          description: "",
          order: f.slides.length + 1,
        },
      ],
    }));
  };

  const removeSlide = (idx: number) => {
    setForm((f) => ({ ...f, slides: f.slides.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || form.slides.length === 0) {
      toast.error("Title and at least one slide are required");
      return;
    }
    const story: WebStory = {
      id: `story-${Date.now()}`,
      title: form.title,
      titleHindi: form.title,
      category: "festivals",
      thumbnail: form.slides[0]?.imageUrl ?? "",
      bgColor: "#1a0a00",
      isPublished: false,
      slides: form.slides.map((s, i) => ({
        id: s.id,
        imageUrl: s.imageUrl,
        title: s.title,
        titleHindi: s.title,
        description: s.description,
        descriptionHindi: s.description,
        bgColor: "#1a0a00",
        order: i,
      })),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    createStory.mutate(story, {
      onSuccess: () => {
        toast.success("Web story saved!");
        setForm({
          title: "",
          category: "Spiritual",
          slides: [
            {
              id: `s-new-${Date.now()}`,
              imageUrl: "",
              title: "",
              description: "",
              order: 1,
            },
          ],
        });
      },
      onError: () => toast.error("Failed to save story"),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> New Web Story
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="ws-title">Story Title *</Label>
              <Input
                id="ws-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Story title"
              />
            </div>
            <div>
              <Label htmlFor="ws-category">Category</Label>
              <Input
                id="ws-category"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                placeholder="Spiritual, Astrology..."
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Slides ({form.slides.length})</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSlide}
              >
                <Plus className="w-3 h-3 mr-1" /> Add Slide
              </Button>
            </div>
            {form.slides.map((slide, idx) => (
              <div
                key={`slide-${slide.order}-${idx}-${form.title}`}
                className="p-3 bg-muted/30 rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Slide {idx + 1}
                  </span>
                  {form.slides.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeSlide(idx)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <Input
                  placeholder="Image URL"
                  value={slide.imageUrl}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      slides: f.slides.map((s, i) =>
                        i === idx ? { ...s, imageUrl: e.target.value } : s,
                      ),
                    }))
                  }
                />
                <Input
                  placeholder="Slide title"
                  value={slide.title}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      slides: f.slides.map((s, i) =>
                        i === idx ? { ...s, title: e.target.value } : s,
                      ),
                    }))
                  }
                />
                <Input
                  placeholder="Description"
                  value={slide.description}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      slides: f.slides.map((s, i) =>
                        i === idx ? { ...s, description: e.target.value } : s,
                      ),
                    }))
                  }
                />
              </div>
            ))}
          </div>
          <Button type="submit" disabled={createStory.isPending}>
            {createStory.isPending ? (
              "Saving..."
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" /> Save Story
              </>
            )}
          </Button>
        </form>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">
          Web Stories ({stories.length})
        </h3>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : stories.length === 0 ? (
          <p className="text-muted-foreground text-sm">No stories yet.</p>
        ) : (
          <div className="space-y-2">
            {stories.map((s, idx) => (
              <div
                key={`story-${s.id ?? idx}`}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.category} • {s.slides?.length ?? 0} slides
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() =>
                    deleteStory.mutate(s.id ?? "", {
                      onSuccess: () => toast.success("Story deleted"),
                    })
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Festival Events Management Tab ──────────────────────────────────────────

// ─── Puja Event Management ─────────────────────────────────────────────────────────────

function PujaEventManagement() {
  const { data: events = [], isLoading } = useGetAllPujaEventsAdmin();
  const createEvent = useCreatePujaEvent();
  const updateEvent = useUpdatePujaEvent();
  const deleteEvent = useDeletePujaEvent();

  const emptyForm = {
    pujaName: "",
    pujaNameHindi: "",
    date: "",
    time: "",
    description: "",
    price: "",
    slotsAvailable: "11",
    location: "",
    deity: "",
    isActive: true,
  };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const setField = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const loadForEdit = (ev: (typeof events)[0]) => {
    setForm({
      pujaName: ev.pujaName,
      pujaNameHindi: ev.pujaNameHindi,
      date: ev.date,
      time: ev.time,
      description: ev.description,
      price: String(Number(ev.price)),
      slotsAvailable: String(Number(ev.slotsAvailable)),
      location: ev.location,
      deity: ev.deity,
      isActive: ev.isActive,
    });
    setEditingId(ev.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.pujaName || !form.date || !form.time) {
      toast.error("Puja name, date and time are required");
      return;
    }
    const payload = {
      pujaName: form.pujaName,
      pujaNameHindi: form.pujaNameHindi,
      date: form.date,
      time: form.time,
      description: form.description,
      price: Number(form.price) || 0,
      slotsAvailable: Number(form.slotsAvailable) || 11,
      location: form.location,
      deity: form.deity,
      isActive: form.isActive,
    };
    if (editingId) {
      updateEvent.mutate(
        { id: editingId, ...payload },
        {
          onSuccess: () => {
            toast.success("Puja event updated!");
            resetForm();
          },
          onError: () => toast.error("Update failed"),
        },
      );
    } else {
      createEvent.mutate(payload, {
        onSuccess: () => {
          toast.success("Puja event created!");
          resetForm();
        },
        onError: () => toast.error("Create failed"),
      });
    }
  };

  const _inputCls =
    "w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground";

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" />
          {editingId ? "Edit Puja Event" : "Add New Puja Event"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="pe-name">Puja Name (English) *</Label>
              <Input
                id="pe-name"
                value={form.pujaName}
                onChange={(e) => setField("pujaName", e.target.value)}
                placeholder="Rudrabhishek"
                data-ocid="admin.puja_event.name_input"
              />
            </div>
            <div>
              <Label htmlFor="pe-hindi">पूजा नाम (हिंदी)</Label>
              <Input
                id="pe-hindi"
                value={form.pujaNameHindi}
                onChange={(e) => setField("pujaNameHindi", e.target.value)}
                placeholder="रुद्राभिषेक"
                data-ocid="admin.puja_event.hindi_input"
              />
            </div>
            <div>
              <Label htmlFor="pe-date">Date *</Label>
              <Input
                id="pe-date"
                type="date"
                value={form.date}
                onChange={(e) => setField("date", e.target.value)}
                data-ocid="admin.puja_event.date_input"
              />
            </div>
            <div>
              <Label htmlFor="pe-time">Time *</Label>
              <Input
                id="pe-time"
                value={form.time}
                onChange={(e) => setField("time", e.target.value)}
                placeholder="6:00 AM"
                data-ocid="admin.puja_event.time_input"
              />
            </div>
            <div>
              <Label htmlFor="pe-price">Price (₹)</Label>
              <Input
                id="pe-price"
                type="number"
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
                placeholder="2100"
                data-ocid="admin.puja_event.price_input"
              />
            </div>
            <div>
              <Label htmlFor="pe-slots">Slots Available</Label>
              <Input
                id="pe-slots"
                type="number"
                value={form.slotsAvailable}
                onChange={(e) => setField("slotsAvailable", e.target.value)}
                placeholder="11"
                data-ocid="admin.puja_event.slots_input"
              />
            </div>
            <div>
              <Label htmlFor="pe-deity">Deity</Label>
              <Input
                id="pe-deity"
                value={form.deity}
                onChange={(e) => setField("deity", e.target.value)}
                placeholder="Shiva, Lakshmi..."
                data-ocid="admin.puja_event.deity_input"
              />
            </div>
            <div>
              <Label htmlFor="pe-location">Location</Label>
              <Input
                id="pe-location"
                value={form.location}
                onChange={(e) => setField("location", e.target.value)}
                placeholder="Kashi Vishwanath, Varanasi"
                data-ocid="admin.puja_event.location_input"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="pe-desc">Description</Label>
            <Textarea
              id="pe-desc"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Describe the puja ceremony, benefits..."
              rows={3}
              data-ocid="admin.puja_event.description_textarea"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pe-active"
              checked={form.isActive}
              onChange={(e) => setField("isActive", e.target.checked)}
              className="rounded border-input"
              data-ocid="admin.puja_event.active_checkbox"
            />
            <Label htmlFor="pe-active">Active (visible to devotees)</Label>
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={createEvent.isPending || updateEvent.isPending}
              data-ocid="admin.puja_event.submit_button"
            >
              {editingId ? "Update Event" : "Add Event"}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                data-ocid="admin.puja_event.cancel_button"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">
          All Puja Events ({events.length})
        </h3>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : events.length === 0 ? (
          <div
            className="text-center py-8"
            data-ocid="admin.puja_events.empty_state"
          >
            <p className="text-sm text-muted-foreground">कोई पूजा इवेंट नहीं है</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((ev, i) => (
              <div
                key={ev.id}
                className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border"
                data-ocid={`admin.puja_events.item.${i + 1}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-foreground truncate">
                      {ev.pujaName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {ev.pujaNameHindi}
                    </span>
                    <Badge
                      variant={ev.isActive ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {ev.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    📅 {ev.date}  ⏰ {ev.time}  📍 {ev.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ₹{Number(ev.price).toLocaleString("en-IN")}  • {" "}
                    {Number(ev.slotsAvailable)} slots
                  </p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => loadForEdit(ev)}
                    data-ocid={`admin.puja_events.edit_button.${i + 1}`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      deleteEvent.mutate(ev.id, {
                        onSuccess: () => toast.success("Deleted"),
                        onError: () => toast.error("Delete failed"),
                      })
                    }
                    data-ocid={`admin.puja_events.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FestivalEventsManagement() {
  const { data: events = [], isLoading } = useFestivalEvents();
  const createEvent = useAddFestivalEvent();
  const deleteEvent = useDeleteFestivalEvent();

  const [form, setForm] = useState({
    title: "",
    titleHindi: "",
    date: "",
    faith: "Hindu" as "Hindu" | "Jain" | "Sikh" | "Tamil" | "Malayalam",
    eventType: "Festival",
    description: "",
    deity: "",
  });

  const FAITH_OPTIONS: Array<
    "Hindu" | "Jain" | "Sikh" | "Tamil" | "Malayalam"
  > = ["Hindu", "Jain", "Sikh", "Tamil", "Malayalam"];
  const EVENT_TYPES = [
    "Festival",
    "Ekadashi",
    "Purnima",
    "Amavasya",
    "Jayanti",
    "Navratri",
    "Puja",
    "Vrat",
    "Utsav",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      toast.error("Title and date are required");
      return;
    }
    const event: FestivalEvent = {
      id: `festival-${Date.now()}`,
      title: form.title,
      titleHindi: form.titleHindi,
      date: form.date,
      faith: form.faith,
      description: form.description,
      significance: form.description,
    };
    createEvent.mutate(event, {
      onSuccess: () => {
        toast.success("Festival event added!");
        setForm({
          title: "",
          titleHindi: "",
          date: "",
          faith: "Hindu",
          eventType: "Festival",
          description: "",
          deity: "",
        });
      },
      onError: () => toast.error("Failed to add event"),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Add Festival / Event
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="fe-title">Title (English) *</Label>
              <Input
                id="fe-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Diwali, Navratri..."
              />
            </div>
            <div>
              <Label htmlFor="fe-hindi">Title (Hindi)</Label>
              <Input
                id="fe-hindi"
                value={form.titleHindi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, titleHindi: e.target.value }))
                }
                placeholder="दीपावली, नवरात्रि..."
              />
            </div>
            <div>
              <Label htmlFor="fe-date">Date *</Label>
              <Input
                id="fe-date"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="fe-faith">Faith</Label>
              <select
                id="fe-faith"
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                value={form.faith}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    faith: e.target.value as
                      | "Hindu"
                      | "Jain"
                      | "Sikh"
                      | "Tamil"
                      | "Malayalam",
                  }))
                }
              >
                {FAITH_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="fe-type">Event Type</Label>
              <select
                id="fe-type"
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                value={form.eventType}
                onChange={(e) =>
                  setForm((f) => ({ ...f, eventType: e.target.value }))
                }
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="fe-deity">Deity</Label>
              <Input
                id="fe-deity"
                value={form.deity}
                onChange={(e) =>
                  setForm((f) => ({ ...f, deity: e.target.value }))
                }
                placeholder="Shiva, Lakshmi..."
              />
            </div>
          </div>
          <div>
            <Label htmlFor="fe-desc">Description</Label>
            <Textarea
              id="fe-desc"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Festival significance and details..."
              rows={3}
            />
          </div>
          <Button type="submit" disabled={createEvent.isPending}>
            {createEvent.isPending ? (
              "Adding..."
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" /> Add Event
              </>
            )}
          </Button>
        </form>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">
          Festival Events ({events.length})
        </h3>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No events yet. Add one above.
          </p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {events.slice(0, 20).map((ev) => (
              <div
                key={ev.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {ev.title} {ev.titleHindi && `— ${ev.titleHindi}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ev.date} • {ev.faith} • {ev.description?.slice(0, 60)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() =>
                    deleteEvent.mutate(ev.id ?? "", {
                      onSuccess: () => toast.success("Event deleted"),
                    })
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Palmistry Content Management Tab ────────────────────────────────────────

function PalmistryManagement() {
  const { data: entries = [], isLoading } = usePalmistryContents();
  const createEntry = useCreatePalmistryContent();
  const deleteEntry = useDeletePalmistryContent();

  const PALMISTRY_CATEGORIES = [
    "palm_type",
    "major_line",
    "minor_line",
    "characteristics",
  ];

  const [form, setForm] = useState({
    title: "",
    titleHi: "",
    category: "major_line",
    lineOrPalmType: "",
    descriptionEn: "",
    descriptionHi: "",
    characteristicsEn: "",
    characteristicsHi: "",
    locationOnPalm: "",
    benefitsEn: "",
    benefitsHi: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title is required");
      return;
    }
    createEntry.mutate(form, {
      onSuccess: () => {
        toast.success("Palmistry entry added!");
        setForm({
          title: "",
          titleHi: "",
          category: "major_line",
          lineOrPalmType: "",
          descriptionEn: "",
          descriptionHi: "",
          characteristicsEn: "",
          characteristicsHi: "",
          locationOnPalm: "",
          benefitsEn: "",
          benefitsHi: "",
        });
      },
      onError: (err) => toast.error(`Error: ${err.message}`),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Add Palmistry Content
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="palm-title">Title (English) *</Label>
              <Input
                id="palm-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g. Heart Line"
                data-ocid="palmistry.title_input"
              />
            </div>
            <div>
              <Label htmlFor="palm-titlehi">Title (Hindi)</Label>
              <Input
                id="palm-titlehi"
                value={form.titleHi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, titleHi: e.target.value }))
                }
                placeholder="e.g. हृदय रेखा"
                data-ocid="palmistry.titlehi_input"
              />
            </div>
            <div>
              <Label htmlFor="palm-category">Category</Label>
              <select
                id="palm-category"
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                data-ocid="palmistry.category_select"
              >
                {PALMISTRY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="palm-type">Line / Palm Type</Label>
              <Input
                id="palm-type"
                value={form.lineOrPalmType}
                onChange={(e) =>
                  setForm((f) => ({ ...f, lineOrPalmType: e.target.value }))
                }
                placeholder="e.g. Heart Line, Air Hand"
              />
            </div>
            <div>
              <Label htmlFor="palm-location">Location on Palm</Label>
              <Input
                id="palm-location"
                value={form.locationOnPalm}
                onChange={(e) =>
                  setForm((f) => ({ ...f, locationOnPalm: e.target.value }))
                }
                placeholder="e.g. Below fingers, runs horizontally"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="palm-desc-en">Description (English)</Label>
              <Textarea
                id="palm-desc-en"
                value={form.descriptionEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, descriptionEn: e.target.value }))
                }
                placeholder="English description..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="palm-desc-hi">Description (Hindi)</Label>
              <Textarea
                id="palm-desc-hi"
                value={form.descriptionHi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, descriptionHi: e.target.value }))
                }
                placeholder="हिंदी विवरण..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="palm-char-en">Characteristics (English)</Label>
              <Textarea
                id="palm-char-en"
                value={form.characteristicsEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, characteristicsEn: e.target.value }))
                }
                placeholder="Characteristics in English..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="palm-char-hi">Characteristics (Hindi)</Label>
              <Textarea
                id="palm-char-hi"
                value={form.characteristicsHi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, characteristicsHi: e.target.value }))
                }
                placeholder="हिंदी में विशेषताएं..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="palm-ben-en">Benefits (English)</Label>
              <Textarea
                id="palm-ben-en"
                value={form.benefitsEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, benefitsEn: e.target.value }))
                }
                placeholder="Benefits in English..."
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="palm-ben-hi">Benefits (Hindi)</Label>
              <Textarea
                id="palm-ben-hi"
                value={form.benefitsHi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, benefitsHi: e.target.value }))
                }
                placeholder="हिंदी में लाभ..."
                rows={2}
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={createEntry.isPending}
            className="w-full sm:w-auto"
            data-ocid="palmistry.submit_button"
          >
            {createEntry.isPending ? (
              "Adding..."
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Add Entry
              </>
            )}
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">
          Palmistry Entries ({entries.length})
        </h3>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <div className="space-y-2" data-ocid="palmistry.list">
            {entries.length === 0 && (
              <p
                className="text-muted-foreground text-sm"
                data-ocid="palmistry.empty_state"
              >
                No entries yet. Add one above.
              </p>
            )}
            {entries.map((entry, idx) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                data-ocid={`palmistry.item.${idx + 1}`}
              >
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {entry.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {entry.titleHi} • {entry.lineOrPalmType}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {entry.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    data-ocid={`palmistry.delete_button.${idx + 1}`}
                    onClick={() =>
                      deleteEntry.mutate(entry.id, {
                        onSuccess: () => toast.success("Entry deleted"),
                        onError: (err) => toast.error(err.message),
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Vastu Content Management Tab ─────────────────────────────────────────────

function VastuManagement() {
  const { data: entries = [], isLoading } = useVastuContents();
  const createEntry = useCreateVastuContent();
  const deleteEntry = useDeleteVastuContent();

  const VASTU_CATEGORIES = ["direction", "room", "element", "brahma_sthana"];

  const [form, setForm] = useState({
    title: "",
    titleHi: "",
    category: "direction",
    directionOrRoom: "",
    planetaryRuler: "",
    planetaryRulerHi: "",
    effectsEn: "",
    effectsHi: "",
    doshaEn: "",
    doshaHi: "",
    remediesEn: "",
    remediesHi: "",
    yantra: "",
    elementsInvolved: "",
    tipsEn: "",
    tipsHi: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title is required");
      return;
    }
    createEntry.mutate(form, {
      onSuccess: () => {
        toast.success("Vastu entry added!");
        setForm({
          title: "",
          titleHi: "",
          category: "direction",
          directionOrRoom: "",
          planetaryRuler: "",
          planetaryRulerHi: "",
          effectsEn: "",
          effectsHi: "",
          doshaEn: "",
          doshaHi: "",
          remediesEn: "",
          remediesHi: "",
          yantra: "",
          elementsInvolved: "",
          tipsEn: "",
          tipsHi: "",
        });
      },
      onError: (err) => toast.error(`Error: ${err.message}`),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Add Vastu Content
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="vastu-title">Title (English) *</Label>
              <Input
                id="vastu-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g. North Direction"
                data-ocid="vastu.title_input"
              />
            </div>
            <div>
              <Label htmlFor="vastu-titlehi">Title (Hindi)</Label>
              <Input
                id="vastu-titlehi"
                value={form.titleHi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, titleHi: e.target.value }))
                }
                placeholder="e.g. उत्तर दिशा"
                data-ocid="vastu.titlehi_input"
              />
            </div>
            <div>
              <Label htmlFor="vastu-category">Category</Label>
              <select
                id="vastu-category"
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                data-ocid="vastu.category_select"
              >
                {VASTU_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="vastu-dir">Direction / Room</Label>
              <Input
                id="vastu-dir"
                value={form.directionOrRoom}
                onChange={(e) =>
                  setForm((f) => ({ ...f, directionOrRoom: e.target.value }))
                }
                placeholder="e.g. North, Kitchen, Bedroom"
              />
            </div>
            <div>
              <Label htmlFor="vastu-planet">Planetary Ruler (English)</Label>
              <Input
                id="vastu-planet"
                value={form.planetaryRuler}
                onChange={(e) =>
                  setForm((f) => ({ ...f, planetaryRuler: e.target.value }))
                }
                placeholder="e.g. Mercury"
              />
            </div>
            <div>
              <Label htmlFor="vastu-planethi">Planetary Ruler (Hindi)</Label>
              <Input
                id="vastu-planethi"
                value={form.planetaryRulerHi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, planetaryRulerHi: e.target.value }))
                }
                placeholder="e.g. बुध"
              />
            </div>
            <div>
              <Label htmlFor="vastu-yantra">Yantra</Label>
              <Input
                id="vastu-yantra"
                value={form.yantra}
                onChange={(e) =>
                  setForm((f) => ({ ...f, yantra: e.target.value }))
                }
                placeholder="e.g. Budh Yantra"
              />
            </div>
            <div>
              <Label htmlFor="vastu-elements">Elements Involved</Label>
              <Input
                id="vastu-elements"
                value={form.elementsInvolved}
                onChange={(e) =>
                  setForm((f) => ({ ...f, elementsInvolved: e.target.value }))
                }
                placeholder="e.g. Water, Earth"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="vastu-eff-en">Effects (English)</Label>
              <Textarea
                id="vastu-eff-en"
                value={form.effectsEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, effectsEn: e.target.value }))
                }
                placeholder="Effects in English..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vastu-eff-hi">Effects (Hindi)</Label>
              <Textarea
                id="vastu-eff-hi"
                value={form.effectsHi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, effectsHi: e.target.value }))
                }
                placeholder="हिंदी में प्रभाव..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vastu-dosha-en">Dosha (English)</Label>
              <Textarea
                id="vastu-dosha-en"
                value={form.doshaEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, doshaEn: e.target.value }))
                }
                placeholder="Dosha description in English..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vastu-dosha-hi">Dosha (Hindi)</Label>
              <Textarea
                id="vastu-dosha-hi"
                value={form.doshaHi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, doshaHi: e.target.value }))
                }
                placeholder="हिंदी में दोष..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vastu-rem-en">Remedies (English)</Label>
              <Textarea
                id="vastu-rem-en"
                value={form.remediesEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, remediesEn: e.target.value }))
                }
                placeholder="Remedies in English..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vastu-rem-hi">Remedies (Hindi)</Label>
              <Textarea
                id="vastu-rem-hi"
                value={form.remediesHi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, remediesHi: e.target.value }))
                }
                placeholder="हिंदी में उपाय..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vastu-tips-en">Tips (English)</Label>
              <Textarea
                id="vastu-tips-en"
                value={form.tipsEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tipsEn: e.target.value }))
                }
                placeholder="Tips in English..."
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="vastu-tips-hi">Tips (Hindi)</Label>
              <Textarea
                id="vastu-tips-hi"
                value={form.tipsHi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tipsHi: e.target.value }))
                }
                placeholder="हिंदी में सुझाव..."
                rows={2}
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={createEntry.isPending}
            className="w-full sm:w-auto"
            data-ocid="vastu.submit_button"
          >
            {createEntry.isPending ? (
              "Adding..."
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Add Entry
              </>
            )}
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">
          Vastu Entries ({entries.length})
        </h3>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <div className="space-y-2" data-ocid="vastu.list">
            {entries.length === 0 && (
              <p
                className="text-muted-foreground text-sm"
                data-ocid="vastu.empty_state"
              >
                No entries yet. Add one above.
              </p>
            )}
            {entries.map((entry, idx) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                data-ocid={`vastu.item.${idx + 1}`}
              >
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {entry.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {entry.titleHi} • {entry.directionOrRoom} •{" "}
                    {entry.planetaryRuler}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {entry.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    data-ocid={`vastu.delete_button.${idx + 1}`}
                    onClick={() =>
                      deleteEntry.mutate(entry.id, {
                        onSuccess: () => toast.success("Entry deleted"),
                        onError: (err) => toast.error(err.message),
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Puja Sub-Categories Tab ────────────────────────────────────────────────

interface PujaSubCategory {
  id: string;
  nameCode: string;
  name: string;
  nameHindi: string;
  productCount: number;
  prefix: string;
}

const INITIAL_PUJA_SUBCATS: PujaSubCategory[] = [
  {
    id: "ps-1",
    nameCode: "AASAN",
    name: "Aasan",
    nameHindi: "आसन",
    productCount: 12,
    prefix: "PS_AASAN",
  },
  {
    id: "ps-2",
    nameCode: "DIYA",
    name: "Diya",
    nameHindi: "दीया",
    productCount: 8,
    prefix: "PS_DIYA",
  },
  {
    id: "ps-3",
    nameCode: "INCENSE",
    name: "Incense & Dhoop",
    nameHindi: "धूप अगरबत्ती",
    productCount: 15,
    prefix: "PS_INCENSE",
  },
  {
    id: "ps-4",
    nameCode: "KALASH",
    name: "Kalash",
    nameHindi: "कलश",
    productCount: 6,
    prefix: "PS_KALASH",
  },
  {
    id: "ps-5",
    nameCode: "THALI",
    name: "Puja Thali",
    nameHindi: "पूजा थाली",
    productCount: 9,
    prefix: "PS_THALI",
  },
  {
    id: "ps-6",
    nameCode: "BELL",
    name: "Puja Bell",
    nameHindi: "घंटी",
    productCount: 5,
    prefix: "PS_BELL",
  },
];

function PujaSubCategoriesManagement() {
  const [categories, setCategories] =
    useState<PujaSubCategory[]>(INITIAL_PUJA_SUBCATS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", nameHindi: "", nameCode: "" });
  const [editForm, setEditForm] = useState({
    name: "",
    nameHindi: "",
    nameCode: "",
  });

  const codePreview = form.nameCode
    ? `PS_${form.nameCode.toUpperCase()}_001`
    : "PS_XXXX_001";

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.nameCode) {
      toast.error("Name and Name Code are required");
      return;
    }
    const code = form.nameCode.toUpperCase().replace(/\s+/g, "_");
    const newCat: PujaSubCategory = {
      id: `ps-${Date.now()}`,
      nameCode: code,
      name: form.name,
      nameHindi: form.nameHindi,
      productCount: 0,
      prefix: `PS_${code}`,
    };
    setCategories((prev) => [newCat, ...prev]);
    setForm({ name: "", nameHindi: "", nameCode: "" });
    setShowAddForm(false);
    toast.success(`Sub-category PS_${code}_001 created!`);
  };

  const handleEdit = (cat: PujaSubCategory) => {
    setEditingId(cat.id);
    setEditForm({
      name: cat.name,
      nameHindi: cat.nameHindi,
      nameCode: cat.nameCode,
    });
  };

  const handleSaveEdit = (id: string) => {
    const code = editForm.nameCode.toUpperCase().replace(/\s+/g, "_");
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              name: editForm.name,
              nameHindi: editForm.nameHindi,
              nameCode: code,
              prefix: `PS_${code}`,
            }
          : c,
      ),
    );
    setEditingId(null);
    toast.success("Sub-category updated!");
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Sub-category deleted");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Puja Sub-Categories</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Codes auto-generated as PS_&#123;NAMECODE&#125;_001,
            PS_&#123;NAMECODE&#125;_002...
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          data-ocid="puja-subcats.add_button"
        >
          <Plus className="w-4 h-4 mr-1" />
          {showAddForm ? "Cancel" : "Add Sub-Category"}
        </Button>
      </div>

      {showAddForm && (
        <div
          className="bg-card border border-border rounded-xl p-5"
          data-ocid="puja-subcats.add_form"
        >
          <h4 className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
            <Tags className="w-4 h-4 text-primary" /> New Sub-Category
          </h4>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="psc-name">Name (English) *</Label>
                <Input
                  id="psc-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g. Aasan"
                  data-ocid="puja-subcats.name_input"
                />
              </div>
              <div>
                <Label htmlFor="psc-hindi">Name (Hindi)</Label>
                <Input
                  id="psc-hindi"
                  value={form.nameHindi}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nameHindi: e.target.value }))
                  }
                  placeholder="e.g. आसन"
                  data-ocid="puja-subcats.hindi_input"
                />
              </div>
              <div>
                <Label htmlFor="psc-code">Name Code *</Label>
                <Input
                  id="psc-code"
                  value={form.nameCode}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      nameCode: e.target.value
                        .toUpperCase()
                        .replace(/\s+/g, "_"),
                    }))
                  }
                  placeholder="e.g. AASAN"
                  data-ocid="puja-subcats.namecode_input"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Preview:{" "}
                  <span
                    className="font-mono font-semibold"
                    style={{ color: "oklch(0.55 0.17 48)" }}
                  >
                    {codePreview}
                  </span>
                </p>
              </div>
            </div>
            <Button
              type="submit"
              size="sm"
              data-ocid="puja-subcats.submit_button"
            >
              <Plus className="w-4 h-4 mr-1" /> Save Sub-Category
            </Button>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide">
                  Code Prefix
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide">
                  Hindi Name
                </th>
                <th className="text-right px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide">
                  Products
                </th>
                <th className="text-right px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr
                  key={cat.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  data-ocid={`puja-subcats.item.${idx + 1}`}
                >
                  <td className="px-4 py-3">
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded-md font-semibold"
                      style={{
                        background: "oklch(0.68 0.20 48 / 0.1)",
                        color: "oklch(0.45 0.16 40)",
                      }}
                    >
                      {cat.prefix}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {editingId === cat.id ? (
                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, name: e.target.value }))
                        }
                        className="h-7 text-xs w-32"
                      />
                    ) : (
                      <span className="font-medium text-foreground">
                        {cat.name}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === cat.id ? (
                      <Input
                        value={editForm.nameHindi}
                        onChange={(e) =>
                          setEditForm((f) => ({
                            ...f,
                            nameHindi: e.target.value,
                          }))
                        }
                        className="h-7 text-xs w-28"
                      />
                    ) : (
                      <span className="text-muted-foreground">
                        {cat.nameHindi}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant="outline" className="text-xs">
                      {cat.productCount}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {editingId === cat.id ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs px-2"
                            onClick={() => handleSaveEdit(cat.id)}
                            data-ocid={`puja-subcats.save_button.${idx + 1}`}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs px-2"
                            onClick={() => setEditingId(null)}
                            data-ocid={`puja-subcats.cancel_button.${idx + 1}`}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleEdit(cat)}
                            data-ocid={`puja-subcats.edit_button.${idx + 1}`}
                            aria-label="Edit sub-category"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(cat.id)}
                            data-ocid={`puja-subcats.delete_button.${idx + 1}`}
                            aria-label="Delete sub-category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {categories.length === 0 && (
          <div
            className="py-10 text-center"
            data-ocid="puja-subcats.empty_state"
          >
            <Tags className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No sub-categories yet. Add one above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Gemstone Products Tab ────────────────────────────────────────────────────

interface GemstoneProduct {
  id: string;
  sku: string;
  type: string;
  hindiName: string;
  shape: string;
  weightRatti?: number;
  price: number;
  mrp?: number;
  gsCode?: string;
  description: string;
  inStock: boolean;
}

const GEMSTONE_TYPES = [
  "Ruby",
  "Blue Sapphire",
  "Yellow Sapphire",
  "Emerald",
  "Diamond",
  "Pearl",
  "Red Coral",
  "Hessonite (Gomed)",
  "Cat's Eye (Lehsunia)",
  "Opal",
  "Amethyst",
  "Turquoise (Feroza)",
  "Moonstone",
  "Citrine",
  "Rose Quartz",
  "Tiger Eye",
  "Green Jade",
  "Pyrite",
];

const GEM_SHAPES = [
  "Oval",
  "Round",
  "Pear Cut",
  "Cushion",
  "Octagon",
  "Square",
  "Triangle",
  "Baguette",
];

const INITIAL_GEM_PRODUCTS: GemstoneProduct[] = [
  {
    id: "gem-1",
    sku: "RUB-OV-3R",
    type: "Ruby",
    hindiName: "माणिक्य",
    shape: "Oval",
    weightRatti: 3,
    price: 4500,
    mrp: 5500,
    gsCode: "GS001",
    description: "Natural Burma Ruby, certified",
    inStock: true,
  },
  {
    id: "gem-2",
    sku: "SAP-OV-4R",
    type: "Blue Sapphire",
    hindiName: "नीलम",
    shape: "Oval",
    weightRatti: 4,
    price: 8500,
    mrp: 10000,
    gsCode: "GS002",
    description: "Ceylon Blue Sapphire, AAA quality",
    inStock: true,
  },
  {
    id: "gem-3",
    sku: "YSP-CU-3R",
    type: "Yellow Sapphire",
    hindiName: "पुखराज",
    shape: "Cushion",
    weightRatti: 3,
    price: 6000,
    gsCode: "GS003",
    description: "Sri Lanka Yellow Sapphire",
    inStock: true,
  },
  {
    id: "gem-4",
    sku: "EMR-OV-2R",
    type: "Emerald",
    hindiName: "पन्ना",
    shape: "Oval",
    weightRatti: 2.5,
    price: 5200,
    mrp: 6000,
    gsCode: "GS004",
    description: "Colombian Emerald, natural",
    inStock: false,
  },
  {
    id: "gem-5",
    sku: "PRL-RD-5R",
    type: "Pearl",
    hindiName: "मोती",
    shape: "Round",
    weightRatti: 5,
    price: 2800,
    description: "South Sea Pearl, lustre grade A",
    inStock: true,
  },
  {
    id: "gem-6",
    sku: "COR-OV-6R",
    type: "Red Coral",
    hindiName: "मूंगा",
    shape: "Oval",
    weightRatti: 6,
    price: 3200,
    mrp: 3800,
    gsCode: "GS005",
    description: "Italian Red Coral, certified",
    inStock: true,
  },
];

function GemstoneProductsManagement() {
  const [products, setProducts] =
    useState<GemstoneProduct[]>(INITIAL_GEM_PRODUCTS);
  const [filterType, setFilterType] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [assigningCodeId, setAssigningCodeId] = useState<string | null>(null);
  const [inlineGsCode, setInlineGsCode] = useState("");
  const [form, setForm] = useState({
    sku: "",
    type: "Ruby",
    hindiName: "",
    shape: "Oval",
    weightRatti: "",
    price: "",
    mrp: "",
    gsCode: "",
    description: "",
  });

  const GS_CODE_REGEX = /^GS[0-9]{3}$/;

  const filtered =
    filterType === "All"
      ? products
      : products.filter((p) => p.type === filterType);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sku || !form.type || !form.price) {
      toast.error("SKU, type, and price are required");
      return;
    }
    if (form.gsCode && !GS_CODE_REGEX.test(form.gsCode)) {
      toast.error("GS Code must be in format GS001–GS200");
      return;
    }
    setProducts((prev) => [
      {
        id: `gem-${Date.now()}`,
        sku: form.sku,
        type: form.type,
        hindiName: form.hindiName,
        shape: form.shape,
        weightRatti: form.weightRatti ? Number(form.weightRatti) : undefined,
        price: Number(form.price),
        mrp: form.mrp ? Number(form.mrp) : undefined,
        gsCode: form.gsCode || undefined,
        description: form.description,
        inStock: true,
      },
      ...prev,
    ]);
    setForm({
      sku: "",
      type: "Ruby",
      hindiName: "",
      shape: "Oval",
      weightRatti: "",
      price: "",
      mrp: "",
      gsCode: "",
      description: "",
    });
    setShowAddForm(false);
    toast.success("Gemstone product added!");
  };

  const handleAssignCode = (id: string) => {
    if (!GS_CODE_REGEX.test(inlineGsCode)) {
      toast.error("GS Code must match format GS001–GS200");
      return;
    }
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, gsCode: inlineGsCode } : p)),
    );
    setAssigningCodeId(null);
    setInlineGsCode("");
    toast.success(`GS Code ${inlineGsCode} assigned!`);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
            data-ocid="gemstone.type_filter"
          >
            <option value="All">All Types ({products.length})</option>
            {GEMSTONE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t} ({products.filter((p) => p.type === t).length})
              </option>
            ))}
          </select>
        </div>
        <Button
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          data-ocid="gemstone.add_button"
        >
          <Plus className="w-4 h-4 mr-1" />
          {showAddForm ? "Cancel" : "Add Gemstone Product"}
        </Button>
      </div>

      {showAddForm && (
        <div
          className="bg-card border border-border rounded-xl p-5"
          data-ocid="gemstone.add_form"
        >
          <h4 className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
            <Gem className="w-4 h-4 text-primary" /> Add Gemstone Product
          </h4>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="gem-type">Gemstone Type *</Label>
                <select
                  id="gem-type"
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value }))
                  }
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                  data-ocid="gemstone.type_select"
                >
                  {GEMSTONE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="gem-sku">SKU *</Label>
                <Input
                  id="gem-sku"
                  value={form.sku}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, sku: e.target.value }))
                  }
                  placeholder="e.g. RUB-OV-3R"
                  data-ocid="gemstone.sku_input"
                />
              </div>
              <div>
                <Label htmlFor="gem-hindi">Hindi Name</Label>
                <Input
                  id="gem-hindi"
                  value={form.hindiName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, hindiName: e.target.value }))
                  }
                  placeholder="e.g. माणिक्य"
                  data-ocid="gemstone.hindi_input"
                />
              </div>
              <div>
                <Label htmlFor="gem-shape">Shape</Label>
                <select
                  id="gem-shape"
                  value={form.shape}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, shape: e.target.value }))
                  }
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                  data-ocid="gemstone.shape_select"
                >
                  {GEM_SHAPES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="gem-weight">Weight (Ratti)</Label>
                <Input
                  id="gem-weight"
                  type="number"
                  step="0.5"
                  value={form.weightRatti}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, weightRatti: e.target.value }))
                  }
                  placeholder="e.g. 3.5"
                  data-ocid="gemstone.weight_input"
                />
              </div>
              <div>
                <Label htmlFor="gem-price">Price INR *</Label>
                <Input
                  id="gem-price"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  placeholder="e.g. 4500"
                  data-ocid="gemstone.price_input"
                />
              </div>
              <div>
                <Label htmlFor="gem-mrp">MRP (optional)</Label>
                <Input
                  id="gem-mrp"
                  type="number"
                  value={form.mrp}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, mrp: e.target.value }))
                  }
                  placeholder="e.g. 5500"
                  data-ocid="gemstone.mrp_input"
                />
              </div>
              <div>
                <Label htmlFor="gem-gscode">
                  GS Code{" "}
                  <span className="text-muted-foreground text-xs">
                    (GS001–GS200)
                  </span>
                </Label>
                <Input
                  id="gem-gscode"
                  value={form.gsCode}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      gsCode: e.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="e.g. GS007"
                  data-ocid="gemstone.gscode_input"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="gem-desc">Description</Label>
              <Textarea
                id="gem-desc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={2}
                placeholder="Brief description of the gemstone product..."
                data-ocid="gemstone.description_input"
              />
            </div>
            <Button type="submit" size="sm" data-ocid="gemstone.submit_button">
              <Gem className="w-4 h-4 mr-1" /> Add Product
            </Button>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  SKU
                </th>
                <th className="text-left px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Type
                </th>
                <th className="text-left px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Hindi
                </th>
                <th className="text-left px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Shape
                </th>
                <th className="text-right px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Ratti
                </th>
                <th className="text-right px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Price
                </th>
                <th className="text-center px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  GS Code
                </th>
                <th className="text-right px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => (
                <tr
                  key={p.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  data-ocid={`gemstone.item.${idx + 1}`}
                >
                  <td className="px-3 py-3">
                    <span className="font-mono text-xs">{p.sku}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-medium text-foreground text-xs">
                      {p.type}
                    </div>
                    {!p.inStock && (
                      <Badge
                        variant="outline"
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.55 0.18 25)" }}
                      >
                        Out of Stock
                      </Badge>
                    )}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground text-xs">
                    {p.hindiName}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground text-xs">
                    {p.shape}
                  </td>
                  <td className="px-3 py-3 text-right text-xs text-muted-foreground">
                    {p.weightRatti ? `${p.weightRatti}R` : "—"}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span
                      className="font-semibold text-xs"
                      style={{ color: "oklch(0.45 0.16 40)" }}
                    >
                      ₹{p.price.toLocaleString()}
                    </span>
                    {p.mrp && (
                      <div className="text-xs text-muted-foreground line-through">
                        ₹{p.mrp.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {assigningCodeId === p.id ? (
                      <div className="flex items-center gap-1 justify-center">
                        <Input
                          value={inlineGsCode}
                          onChange={(e) =>
                            setInlineGsCode(e.target.value.toUpperCase())
                          }
                          className="h-6 w-20 text-xs font-mono text-center"
                          placeholder="GS001"
                          data-ocid={`gemstone.gscode_inline.${idx + 1}`}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-xs px-2"
                          onClick={() => handleAssignCode(p.id)}
                          data-ocid={`gemstone.gscode_save.${idx + 1}`}
                        >
                          OK
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs px-1"
                          onClick={() => {
                            setAssigningCodeId(null);
                            setInlineGsCode("");
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    ) : p.gsCode ? (
                      <button
                        type="button"
                        className="font-mono text-xs px-2 py-0.5 rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                        style={{
                          background: "oklch(0.55 0.15 145 / 0.12)",
                          color: "oklch(0.40 0.14 145)",
                        }}
                        onClick={() => {
                          setAssigningCodeId(p.id);
                          setInlineGsCode(p.gsCode ?? "");
                        }}
                        data-ocid={`gemstone.gscode_badge.${idx + 1}`}
                        title="Click to change GS code"
                      >
                        {p.gsCode}
                      </button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs px-2"
                        onClick={() => {
                          setAssigningCodeId(p.id);
                          setInlineGsCode("");
                        }}
                        data-ocid={`gemstone.assign_code_button.${idx + 1}`}
                      >
                        Assign GS
                      </Button>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(p.id)}
                        data-ocid={`gemstone.delete_button.${idx + 1}`}
                        aria-label="Delete gemstone product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-10 text-center" data-ocid="gemstone.empty_state">
            <Gem className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No gemstone products found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Personalised Products Tab ────────────────────────────────────────────────

interface PersonalisedProduct {
  id: string;
  name: string;
  nameHindi: string;
  category: string;
  price: number;
  mrp?: number;
  manualCode: string;
  description: string;
  customisationNote: string;
  inStock: boolean;
}

const PERSONALISED_CATEGORIES = [
  "Pendant",
  "Kada",
  "Pen",
  "Ring",
  "Bracelet",
  "Necklace",
  "Keychain",
  "Locket",
  "Other",
];

const INITIAL_PERSONALISED: PersonalisedProduct[] = [
  {
    id: "pp-1",
    name: "Name Engraved Pendant",
    nameHindi: "नाम अंकित लॉकेट",
    category: "Pendant",
    price: 1499,
    mrp: 1999,
    manualCode: "PP-PEND-001",
    description: "Silver pendant with custom name engraving",
    customisationNote: "Please provide name in English/Hindi",
    inStock: true,
  },
  {
    id: "pp-2",
    name: "Kundali Inscribed Ring",
    nameHindi: "कुंडली अंकित अंगूठी",
    category: "Ring",
    price: 2499,
    manualCode: "PP-RING-001",
    description: "Gold-plated ring with birth chart inscription",
    customisationNote: "Requires DOB, time and place of birth",
    inStock: true,
  },
  {
    id: "pp-3",
    name: "Name Mantra Kada",
    nameHindi: "नाम मंत्र कड़ा",
    category: "Kada",
    price: 1999,
    mrp: 2499,
    manualCode: "PP-KADA-001",
    description: "Brass kada with personalised mantra engraving",
    customisationNote: "Specify deity preference",
    inStock: false,
  },
];

function PersonalisedProductsManagement() {
  const [products, setProducts] =
    useState<PersonalisedProduct[]>(INITIAL_PERSONALISED);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PersonalisedProduct | null>(null);
  const [form, setForm] = useState({
    name: "",
    nameHindi: "",
    category: "Pendant",
    price: "",
    mrp: "",
    manualCode: "",
    description: "",
    customisationNote: "",
    inStock: true,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.manualCode) {
      toast.error("Name, price, and manual code are required");
      return;
    }
    setProducts((prev) => [
      {
        id: `pp-${Date.now()}`,
        name: form.name,
        nameHindi: form.nameHindi,
        category: form.category,
        price: Number(form.price),
        mrp: form.mrp ? Number(form.mrp) : undefined,
        manualCode: form.manualCode,
        description: form.description,
        customisationNote: form.customisationNote,
        inStock: form.inStock,
      },
      ...prev,
    ]);
    setForm({
      name: "",
      nameHindi: "",
      category: "Pendant",
      price: "",
      mrp: "",
      manualCode: "",
      description: "",
      customisationNote: "",
      inStock: true,
    });
    setShowAddForm(false);
    toast.success("Personalised product added!");
  };

  const handleEdit = (p: PersonalisedProduct) => {
    setEditingId(p.id);
    setEditForm({ ...p });
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === editForm.id ? editForm : p)),
    );
    setEditingId(null);
    setEditForm(null);
    toast.success("Product updated!");
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  return (
    <div className="space-y-5">
      <div
        className="rounded-xl p-3 flex items-start gap-2 border"
        style={{
          background: "oklch(0.68 0.20 48 / 0.08)",
          borderColor: "oklch(0.68 0.20 48 / 0.25)",
        }}
        data-ocid="personalised.info_banner"
      >
        <User
          className="w-4 h-4 mt-0.5 shrink-0"
          style={{ color: "oklch(0.50 0.18 48)" }}
        />
        <p className="text-sm" style={{ color: "oklch(0.40 0.14 48)" }}>
          <strong>Note:</strong> These products have no GS code. Assign any
          custom code in the <strong>Manual Code</strong> field — admin freely
          assigns codes.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          Personalised Products ({products.length})
        </h3>
        <Button
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          data-ocid="personalised.add_button"
        >
          <Plus className="w-4 h-4 mr-1" />
          {showAddForm ? "Cancel" : "Add Personalised Product"}
        </Button>
      </div>

      {showAddForm && (
        <div
          className="bg-card border border-border rounded-xl p-5"
          data-ocid="personalised.add_form"
        >
          <h4 className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Add Personalised Product
          </h4>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="pp-name">Name (English) *</Label>
                <Input
                  id="pp-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g. Name Engraved Pendant"
                  data-ocid="personalised.name_input"
                />
              </div>
              <div>
                <Label htmlFor="pp-hindi">Name (Hindi)</Label>
                <Input
                  id="pp-hindi"
                  value={form.nameHindi}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nameHindi: e.target.value }))
                  }
                  placeholder="e.g. नाम अंकित लॉकेट"
                  data-ocid="personalised.hindi_input"
                />
              </div>
              <div>
                <Label htmlFor="pp-cat">Category</Label>
                <select
                  id="pp-cat"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                  data-ocid="personalised.category_select"
                >
                  {PERSONALISED_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="pp-code">
                  Manual Code *{" "}
                  <span className="text-muted-foreground text-xs">
                    (admin assigns freely)
                  </span>
                </Label>
                <Input
                  id="pp-code"
                  value={form.manualCode}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, manualCode: e.target.value }))
                  }
                  placeholder="e.g. PP-PEND-001"
                  data-ocid="personalised.code_input"
                />
              </div>
              <div>
                <Label htmlFor="pp-price">Price (₹) *</Label>
                <Input
                  id="pp-price"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  placeholder="e.g. 1499"
                  data-ocid="personalised.price_input"
                />
              </div>
              <div>
                <Label htmlFor="pp-mrp">MRP (₹)</Label>
                <Input
                  id="pp-mrp"
                  type="number"
                  value={form.mrp}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, mrp: e.target.value }))
                  }
                  placeholder="Optional"
                  data-ocid="personalised.mrp_input"
                />
              </div>
              <div className="flex items-center gap-3 pt-5">
                <input
                  type="checkbox"
                  id="pp-stock"
                  checked={form.inStock}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, inStock: e.target.checked }))
                  }
                  data-ocid="personalised.stock_toggle"
                />
                <Label htmlFor="pp-stock">In Stock</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="pp-desc">Description</Label>
              <Textarea
                id="pp-desc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={2}
                placeholder="Product description..."
                data-ocid="personalised.description_input"
              />
            </div>
            <div>
              <Label htmlFor="pp-note">Customisation Note</Label>
              <Textarea
                id="pp-note"
                value={form.customisationNote}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customisationNote: e.target.value }))
                }
                rows={2}
                placeholder="Instructions for customer customisation..."
                data-ocid="personalised.customisation_input"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              data-ocid="personalised.submit_button"
            >
              <User className="w-4 h-4 mr-1" /> Add Product
            </Button>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Code
                </th>
                <th className="text-left px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Name
                </th>
                <th className="text-left px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Category
                </th>
                <th className="text-right px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Price
                </th>
                <th className="text-center px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Stock
                </th>
                <th className="text-right px-3 py-3 font-semibold text-xs uppercase tracking-wide text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr
                  key={p.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  data-ocid={`personalised.item.${idx + 1}`}
                >
                  {editingId === p.id && editForm ? (
                    <td colSpan={6} className="px-3 py-3">
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          <div>
                            <Label className="text-xs">Name</Label>
                            <Input
                              value={editForm.name}
                              onChange={(e) =>
                                setEditForm((f) =>
                                  f ? { ...f, name: e.target.value } : f,
                                )
                              }
                              className="h-7 text-xs"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Hindi</Label>
                            <Input
                              value={editForm.nameHindi}
                              onChange={(e) =>
                                setEditForm((f) =>
                                  f ? { ...f, nameHindi: e.target.value } : f,
                                )
                              }
                              className="h-7 text-xs"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Manual Code</Label>
                            <Input
                              value={editForm.manualCode}
                              onChange={(e) =>
                                setEditForm((f) =>
                                  f ? { ...f, manualCode: e.target.value } : f,
                                )
                              }
                              className="h-7 text-xs font-mono"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Price ₹</Label>
                            <Input
                              type="number"
                              value={editForm.price}
                              onChange={(e) =>
                                setEditForm((f) =>
                                  f
                                    ? { ...f, price: Number(e.target.value) }
                                    : f,
                                )
                              }
                              className="h-7 text-xs"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">MRP ₹</Label>
                            <Input
                              type="number"
                              value={editForm.mrp ?? ""}
                              onChange={(e) =>
                                setEditForm((f) =>
                                  f
                                    ? {
                                        ...f,
                                        mrp: e.target.value
                                          ? Number(e.target.value)
                                          : undefined,
                                      }
                                    : f,
                                )
                              }
                              className="h-7 text-xs"
                              placeholder="Optional"
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-4">
                            <input
                              type="checkbox"
                              checked={editForm.inStock}
                              onChange={(e) =>
                                setEditForm((f) =>
                                  f ? { ...f, inStock: e.target.checked } : f,
                                )
                              }
                            />
                            <Label className="text-xs">In Stock</Label>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            data-ocid={`personalised.save_button.${idx + 1}`}
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingId(null);
                              setEditForm(null);
                            }}
                            data-ocid={`personalised.cancel_button.${idx + 1}`}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="px-3 py-3">
                        <span
                          className="font-mono text-xs px-2 py-0.5 rounded-md"
                          style={{
                            background: "oklch(0.60 0.12 260 / 0.10)",
                            color: "oklch(0.40 0.12 260)",
                          }}
                        >
                          {p.manualCode}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <p className="font-medium text-foreground text-xs">
                          {p.name}
                        </p>
                        {p.nameHindi && (
                          <p className="text-muted-foreground text-xs">
                            {p.nameHindi}
                          </p>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <Badge variant="outline" className="text-xs">
                          {p.category}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <span
                          className="font-semibold text-xs"
                          style={{ color: "oklch(0.45 0.16 40)" }}
                        >
                          ₹{p.price.toLocaleString()}
                        </span>
                        {p.mrp && (
                          <div className="text-xs text-muted-foreground line-through">
                            ₹{p.mrp.toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={
                            p.inStock
                              ? {
                                  background: "oklch(0.55 0.15 145 / 0.10)",
                                  color: "oklch(0.40 0.14 145)",
                                  border:
                                    "1px solid oklch(0.55 0.15 145 / 0.30)",
                                }
                              : {
                                  background: "oklch(0.60 0.18 25 / 0.10)",
                                  color: "oklch(0.45 0.16 25)",
                                  border:
                                    "1px solid oklch(0.60 0.18 25 / 0.30)",
                                }
                          }
                        >
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleEdit(p)}
                            data-ocid={`personalised.edit_button.${idx + 1}`}
                            aria-label="Edit personalised product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(p.id)}
                            data-ocid={`personalised.delete_button.${idx + 1}`}
                            aria-label="Delete personalised product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div
            className="py-10 text-center"
            data-ocid="personalised.empty_state"
          >
            <User className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No personalised products yet. Add one above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Product Manager Tab ─────────────────────────────────────────────────────

interface ManagedProduct extends ProductWithMRP {
  localPrice: number;
  localMrp?: number;
  localStock: number;
  localVariants: ProductVariant[];
}

function ProductManagerDashboard() {
  const [products, setProducts] = useState<ManagedProduct[]>(() =>
    ALL_NEW_PRODUCTS.map((p) => ({
      ...p,
      localPrice: p.price,
      localMrp: p.mrp,
      localStock: Number(p.stock),
      localVariants: p.variants ? [...p.variants] : [],
    })),
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Gemstones",
    price: "",
    mrp: "",
    description: "",
    benefits: "",
    stock: "50",
  });
  const [newVariants, setNewVariants] = useState<
    { name: string; price: string; stock: string }[]
  >([]);

  const categories = [
    "All",
    ...Array.from(new Set(ALL_NEW_PRODUCTS.map((p) => p.category))),
  ];

  const filtered = products.filter((p) => {
    const matchCat = filterCategory === "All" || p.category === filterCategory;
    const matchQ =
      !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  const handleSaveEdit = (id: string, patch: Partial<ManagedProduct>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );
    setEditingId(null);
    toast.success("Product updated!");
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product removed from local catalog");
  };

  const handleAddVariant = () =>
    setNewVariants((v) => [...v, { name: "", price: "", stock: "" }]);
  const handleRemoveVariant = (i: number) =>
    setNewVariants((v) => v.filter((_, idx) => idx !== i));

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      toast.error("Name and price are required");
      return;
    }
    const id = `custom-${Date.now()}`;
    const variants: ProductVariant[] = newVariants
      .filter((v) => v.name && v.price)
      .map((v, i) => ({
        id: `${id}-v${i}`,
        name: v.name,
        price: Number(v.price),
        stock: Number(v.stock) || 0,
      }));
    const product: ManagedProduct = {
      id,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      mrp: newProduct.mrp ? Number(newProduct.mrp) : undefined,
      description: newProduct.description,
      benefits: newProduct.benefits,
      astrologicalPurpose: "",
      stock: BigInt(Number(newProduct.stock)),
      createdAt: BigInt(Date.now()),
      variants,
      localPrice: Number(newProduct.price),
      localMrp: newProduct.mrp ? Number(newProduct.mrp) : undefined,
      localStock: Number(newProduct.stock),
      localVariants: variants,
    };
    setProducts((prev) => [product, ...prev]);
    setNewProduct({
      name: "",
      category: "Gemstones",
      price: "",
      mrp: "",
      description: "",
      benefits: "",
      stock: "50",
    });
    setNewVariants([]);
    setShowAddForm(false);
    toast.success("Product added to catalog!");
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48"
            data-ocid="pm.search_input"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
            data-ocid="pm.category_filter"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          size="sm"
          data-ocid="pm.add_product_button"
        >
          <Plus className="w-4 h-4 mr-1" />
          {showAddForm ? "Cancel" : "Add Product"}
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div
          className="bg-card border border-border rounded-xl p-5"
          data-ocid="pm.add_product_form"
        >
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" /> Add New Product
          </h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="np-name">Product Name *</Label>
                <Input
                  id="np-name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label htmlFor="np-category">Category</Label>
                <select
                  id="np-category"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, category: e.target.value }))
                  }
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <Label htmlFor="np-price">Price (₹) *</Label>
                <Input
                  id="np-price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, price: e.target.value }))
                  }
                  placeholder="e.g. 499"
                />
              </div>
              <div>
                <Label htmlFor="np-mrp">MRP / Original Price (₹)</Label>
                <Input
                  id="np-mrp"
                  type="number"
                  value={newProduct.mrp}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, mrp: e.target.value }))
                  }
                  placeholder="e.g. 999 (optional)"
                />
              </div>
              <div>
                <Label htmlFor="np-stock">Stock Quantity</Label>
                <Input
                  id="np-stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, stock: e.target.value }))
                  }
                  placeholder="50"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="np-desc">Description</Label>
              <Textarea
                id="np-desc"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
                placeholder="Product description..."
              />
            </div>
            <div>
              <Label htmlFor="np-benefits">Benefits</Label>
              <Input
                id="np-benefits"
                value={newProduct.benefits}
                onChange={(e) =>
                  setNewProduct((p) => ({ ...p, benefits: e.target.value }))
                }
                placeholder="e.g. Wealth, protection, clarity"
              />
            </div>

            {/* Gemstone Weight Variants */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Weight / Size Variants (for gemstones)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddVariant}
                  data-ocid="pm.add_variant_button"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Variant
                </Button>
              </div>
              {newVariants.map((v, i) => (
                <div
                  key={`new-variant-row-${v.name}-${i}`}
                  className="flex gap-2 mb-2 items-center"
                >
                  <Input
                    placeholder="e.g. 3-4 Ratti / 50g"
                    value={v.name}
                    onChange={(e) =>
                      setNewVariants((prev) =>
                        prev.map((x, j) =>
                          j === i ? { ...x, name: e.target.value } : x,
                        ),
                      )
                    }
                    className="flex-1"
                    data-ocid={`pm.variant_name.${i}`}
                  />
                  <Input
                    placeholder="Price ₹"
                    type="number"
                    value={v.price}
                    onChange={(e) =>
                      setNewVariants((prev) =>
                        prev.map((x, j) =>
                          j === i ? { ...x, price: e.target.value } : x,
                        ),
                      )
                    }
                    className="w-24"
                    data-ocid={`pm.variant_price.${i}`}
                  />
                  <Input
                    placeholder="Stock"
                    type="number"
                    value={v.stock}
                    onChange={(e) =>
                      setNewVariants((prev) =>
                        prev.map((x, j) =>
                          j === i ? { ...x, stock: e.target.value } : x,
                        ),
                      )
                    }
                    className="w-20"
                    data-ocid={`pm.variant_stock.${i}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveVariant(i)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              <ShoppingBag className="w-4 h-4 mr-2" /> Add to Catalog
            </Button>
          </form>
        </div>
      )}

      {/* Product count */}
      <p className="text-sm text-muted-foreground font-body">
        Showing{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        of {products.length} products
      </p>

      {/* Product list */}
      <div className="space-y-3" data-ocid="pm.product_list">
        {filtered.map((product) => (
          <ProductManagerRow
            key={product.id}
            product={product}
            isEditing={editingId === product.id}
            onEdit={() =>
              setEditingId(editingId === product.id ? null : product.id)
            }
            onSave={(patch) => handleSaveEdit(product.id, patch)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12" data-ocid="pm.empty_state">
            <Package className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground font-body">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductManagerRow({
  product,
  isEditing,
  onEdit,
  onSave,
  onDelete,
}: {
  product: ManagedProduct;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (patch: Partial<ManagedProduct>) => void;
  onDelete: () => void;
}) {
  const [editPrice, setEditPrice] = useState(String(product.localPrice));
  const [editMrp, setEditMrp] = useState(String(product.localMrp ?? ""));
  const [editStock, setEditStock] = useState(String(product.localStock));
  const [editVariants, setEditVariants] = useState<ProductVariant[]>(
    product.localVariants,
  );

  const handleSave = () => {
    onSave({
      localPrice: Number(editPrice),
      price: Number(editPrice),
      localMrp: editMrp ? Number(editMrp) : undefined,
      mrp: editMrp ? Number(editMrp) : undefined,
      localStock: Number(editStock),
      stock: BigInt(Number(editStock)),
      localVariants: editVariants,
      variants: editVariants,
    });
  };

  return (
    <div
      className="bg-card border border-border rounded-xl p-4"
      data-ocid={`pm.product_row.${product.id}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-semibold text-sm text-foreground truncate">
              {product.name}
            </p>
            <Badge variant="outline" className="text-xs shrink-0">
              {product.category}
            </Badge>
            {product.localVariants.length > 0 && (
              <Badge className="text-xs shrink-0 bg-primary/10 text-primary border-0">
                {product.localVariants.length} variant
                {product.localVariants.length > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          {!isEditing ? (
            <div className="flex items-center gap-3 text-sm">
              <span
                className="font-heading font-bold"
                style={{ color: "oklch(0.45 0.16 40)" }}
              >
                ₹{product.localPrice.toLocaleString()}
              </span>
              {product.localMrp && (
                <span className="text-muted-foreground line-through text-xs">
                  ₹{product.localMrp.toLocaleString()}
                </span>
              )}
              <span className="text-muted-foreground text-xs">
                Stock: {product.localStock}
              </span>
            </div>
          ) : (
            <div className="space-y-3 mt-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs">Price (₹)</Label>
                  <Input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="h-8 text-sm"
                    data-ocid="pm.edit_price_input"
                  />
                </div>
                <div>
                  <Label className="text-xs">MRP (₹)</Label>
                  <Input
                    type="number"
                    value={editMrp}
                    onChange={(e) => setEditMrp(e.target.value)}
                    placeholder="Optional"
                    className="h-8 text-sm"
                    data-ocid="pm.edit_mrp_input"
                  />
                </div>
                <div>
                  <Label className="text-xs">Stock</Label>
                  <Input
                    type="number"
                    value={editStock}
                    onChange={(e) => setEditStock(e.target.value)}
                    className="h-8 text-sm"
                    data-ocid="pm.edit_stock_input"
                  />
                </div>
              </div>

              {/* Variant editing */}
              {editVariants.length > 0 && (
                <div>
                  <Label className="text-xs mb-1 block">
                    Weight / Size Variants
                  </Label>
                  {editVariants.map((v, i) => (
                    <div key={v.id} className="flex gap-2 mb-1.5 items-center">
                      <Input
                        value={v.name}
                        onChange={(e) =>
                          setEditVariants((prev) =>
                            prev.map((x, j) =>
                              j === i ? { ...x, name: e.target.value } : x,
                            ),
                          )
                        }
                        placeholder="Variant name"
                        className="flex-1 h-7 text-xs"
                        data-ocid={`pm.edit_variant_name.${i}`}
                      />
                      <Input
                        type="number"
                        value={v.price}
                        onChange={(e) =>
                          setEditVariants((prev) =>
                            prev.map((x, j) =>
                              j === i
                                ? { ...x, price: Number(e.target.value) }
                                : x,
                            ),
                          )
                        }
                        placeholder="₹"
                        className="w-20 h-7 text-xs"
                        data-ocid={`pm.edit_variant_price.${i}`}
                      />
                      <Input
                        type="number"
                        value={v.stock}
                        onChange={(e) =>
                          setEditVariants((prev) =>
                            prev.map((x, j) =>
                              j === i
                                ? { ...x, stock: Number(e.target.value) }
                                : x,
                            ),
                          )
                        }
                        placeholder="Stock"
                        className="w-16 h-7 text-xs"
                        data-ocid={`pm.edit_variant_stock.${i}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  data-ocid="pm.save_button"
                >
                  <CheckCircle className="w-3.5 h-3.5 mr-1" /> Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onEdit}
                  data-ocid="pm.cancel_edit_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="h-8 w-8"
              data-ocid="pm.edit_button"
              aria-label="Edit product"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-8 w-8 text-destructive hover:text-destructive"
              data-ocid="pm.delete_button"
              aria-label="Delete product"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main AdminCMS Page ───────────────────────────────────────────────────────

export default function AdminCMS() {
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "pm" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginMode, setLoginMode] = useState<"admin" | "pm">("admin");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMode === "admin" && password === ADMIN_PASSWORD) {
      setRole("admin");
      setError("");
    } else if (loginMode === "pm" && password === PM_PASSWORD) {
      setRole("pm");
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm shadow-xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              {loginMode === "pm" ? (
                <ShoppingBag className="w-8 h-8 text-primary" />
              ) : (
                <Lock className="w-8 h-8 text-primary" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {loginMode === "pm" ? "Product Manager" : "Admin CMS"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {loginMode === "pm"
                ? "Product Management Portal"
                : "Content Management System"}
            </p>
          </div>

          <div className="flex gap-2 mb-5">
            <button
              type="button"
              onClick={() => {
                setLoginMode("admin");
                setError("");
                setPassword("");
              }}
              data-ocid="login.admin_mode_button"
              className="flex-1 py-2 rounded-lg text-sm font-heading font-semibold border transition-all"
              style={{
                background:
                  loginMode === "admin"
                    ? "oklch(0.68 0.20 48 / 0.1)"
                    : "transparent",
                borderColor:
                  loginMode === "admin"
                    ? "oklch(0.68 0.20 48 / 0.4)"
                    : "oklch(0.85 0.03 75)",
                color:
                  loginMode === "admin"
                    ? "oklch(0.45 0.16 40)"
                    : "oklch(0.50 0.04 60)",
              }}
            >
              🔐 Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMode("pm");
                setError("");
                setPassword("");
              }}
              data-ocid="login.pm_mode_button"
              className="flex-1 py-2 rounded-lg text-sm font-heading font-semibold border transition-all"
              style={{
                background:
                  loginMode === "pm"
                    ? "oklch(0.68 0.20 48 / 0.1)"
                    : "transparent",
                borderColor:
                  loginMode === "pm"
                    ? "oklch(0.68 0.20 48 / 0.4)"
                    : "oklch(0.85 0.03 75)",
                color:
                  loginMode === "pm"
                    ? "oklch(0.45 0.16 40)"
                    : "oklch(0.50 0.04 60)",
              }}
            >
              🛍️ Product Manager
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="cms-password">
                {loginMode === "pm"
                  ? "Product Manager Password"
                  : "Admin Password"}
              </Label>
              <div className="relative mt-1">
                <Input
                  id="cms-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    loginMode === "pm"
                      ? "Enter PM password"
                      : "Enter admin password"
                  }
                  className="pr-10"
                  data-ocid="login.password_input"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              className="w-full"
              data-ocid="login.submit_button"
            >
              <Lock className="w-4 h-4 mr-2" />
              {loginMode === "pm" ? "Access Product Manager" : "Access CMS"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (role === "pm") {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary" />
              <h1 className="font-bold text-foreground">
                Spiritual Connect Mall — Product Manager
              </h1>
              <Badge variant="outline" className="text-xs">
                PM Role
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setRole(null);
                setPassword("");
              }}
              data-ocid="pm.logout_button"
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <ProductManagerDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <h1 className="font-bold text-foreground">
              Admin CMS — Content Management
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setRole(null);
              setPassword("");
            }}
            data-ocid="admin.logout_button"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Tabs defaultValue="bhajans">
          <TabsList className="mb-6 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="bhajans" className="flex items-center gap-1.5">
              <Music className="w-4 h-4" /> Bhajan Library
            </TabsTrigger>
            <TabsTrigger
              value="vrat-katha"
              className="flex items-center gap-1.5"
            >
              📿 Vrat Katha
            </TabsTrigger>
            <TabsTrigger
              value="holy-books"
              className="flex items-center gap-1.5"
            >
              📖 Holy Books
            </TabsTrigger>
            <TabsTrigger
              value="palmistry"
              className="flex items-center gap-1.5"
              data-ocid="admin.palmistry_tab"
            >
              🖐️ हस्तरेखा
            </TabsTrigger>
            <TabsTrigger
              value="vastu"
              className="flex items-center gap-1.5"
              data-ocid="admin.vastu_tab"
            >
              🏛️ वास्तु
            </TabsTrigger>
            <TabsTrigger
              value="puja-types"
              className="flex items-center gap-1.5"
            >
              🛕 Puja Types
            </TabsTrigger>
            <TabsTrigger
              value="puja-reports"
              className="flex items-center gap-1.5"
            >
              📋 Puja Reports
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Blog
            </TabsTrigger>
            <TabsTrigger
              value="web-stories"
              className="flex items-center gap-1.5"
            >
              📱 Web Stories
            </TabsTrigger>
            <TabsTrigger
              value="puja-events"
              className="flex items-center gap-1.5"
              data-ocid="admin.puja_events_tab"
            >
              🕉️ Puja Events
            </TabsTrigger>
            <TabsTrigger
              value="festivals"
              className="flex items-center gap-1.5"
            >
              <Edit className="w-4 h-4" /> Festivals
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" /> Products
            </TabsTrigger>
            <TabsTrigger
              value="puja-subcats"
              className="flex items-center gap-1.5"
              data-ocid="admin.puja_subcats_tab"
            >
              <Tags className="w-4 h-4" /> Puja Sub-Categories
            </TabsTrigger>
            <TabsTrigger
              value="gemstone-products"
              className="flex items-center gap-1.5"
              data-ocid="admin.gemstone_products_tab"
            >
              <Gem className="w-4 h-4" /> Gemstone Products
            </TabsTrigger>
            <TabsTrigger
              value="personalised"
              className="flex items-center gap-1.5"
              data-ocid="admin.personalised_tab"
            >
              <User className="w-4 h-4" /> Personalised Products
            </TabsTrigger>
            <TabsTrigger
              value="kavach"
              className="flex items-center gap-1.5"
              data-ocid="admin.kavach_tab"
            >
              🛡️ Kavach
            </TabsTrigger>
            <TabsTrigger
              value="ashtakam"
              className="flex items-center gap-1.5"
              data-ocid="admin.ashtakam_tab"
            >
              🔔 Ashtakam
            </TabsTrigger>
            <TabsTrigger
              value="stuti"
              className="flex items-center gap-1.5"
              data-ocid="admin.stuti_tab"
            >
              🙏 Stuti
            </TabsTrigger>
            <TabsTrigger
              value="sahasranam"
              className="flex items-center gap-1.5"
              data-ocid="admin.sahasranam_tab"
            >
              📿 Sahasranam
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bhajans">
            <BhajanManagement />
          </TabsContent>
          <TabsContent value="vrat-katha">
            <VratKathaManagement />
          </TabsContent>
          <TabsContent value="holy-books">
            <HolyBooksManagement />
          </TabsContent>
          <TabsContent value="palmistry">
            <PalmistryManagement />
          </TabsContent>
          <TabsContent value="vastu">
            <VastuManagement />
          </TabsContent>
          <TabsContent value="puja-types">
            <PujaTypesManagement />
          </TabsContent>
          <TabsContent value="puja-reports">
            <PujaReportsManagement />
          </TabsContent>
          <TabsContent value="blogs">
            <BlogManagement />
          </TabsContent>
          <TabsContent value="web-stories">
            <WebStoriesManagement />
          </TabsContent>
          <TabsContent value="puja-events">
            <PujaEventManagement />
          </TabsContent>
          <TabsContent value="festivals">
            <FestivalEventsManagement />
          </TabsContent>
          <TabsContent value="products">
            <ProductManagerDashboard />
          </TabsContent>
          <TabsContent value="puja-subcats">
            <PujaSubCategoriesManagement />
          </TabsContent>
          <TabsContent value="gemstone-products">
            <GemstoneProductsManagement />
          </TabsContent>
          <TabsContent value="personalised">
            <PersonalisedProductsManagement />
          </TabsContent>
          <TabsContent value="kavach">
            <KavachManagement />
          </TabsContent>
          <TabsContent value="ashtakam">
            <AshtakamManagement />
          </TabsContent>
          <TabsContent value="stuti">
            <StutiManagement />
          </TabsContent>
          <TabsContent value="sahasranam">
            <SahasranamManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
