import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  History,
  ListMusic,
  Music,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { useMemo, useState } from "react";
import { MOCK_AUDIO_TRACKS } from "../data/mockAudioData";
import type { ContentType, MediaTrack } from "../stores/mediaPlayerStore";
import { useMediaPlayerStore } from "../stores/mediaPlayerStore";

// Use mock audio tracks as the demo dataset
const SAMPLE_TRACKS: MediaTrack[] = MOCK_AUDIO_TRACKS;

const CONTENT_TYPE_ICONS: Record<ContentType, string> = {
  aarti: "🪔",
  chalisa: "📿",
  mantra: "🕉️",
  bhajan: "🎵",
  katha: "📖",
  suktam: "🎶",
};

const CONTENT_TYPE_COLORS: Record<ContentType, string> = {
  aarti: "bg-orange-900/40 text-orange-300 border-orange-700/40",
  chalisa: "bg-amber-900/40 text-amber-300 border-amber-700/40",
  mantra: "bg-purple-900/40 text-purple-300 border-purple-700/40",
  bhajan: "bg-rose-900/40 text-rose-300 border-rose-700/40",
  katha: "bg-blue-900/40 text-blue-300 border-blue-700/40",
  suktam: "bg-green-900/40 text-green-300 border-green-700/40",
};

function TrackRow({
  track,
  onAddToPlaylist,
  onPlayNow,
  isInPlaylist,
  isPlaying,
  noAudio,
}: {
  track: MediaTrack;
  onAddToPlaylist: (t: MediaTrack) => void;
  onPlayNow: (t: MediaTrack) => void;
  isInPlaylist: boolean;
  isPlaying: boolean;
  noAudio: boolean;
}) {
  const [showNoAudioMsg, setShowNoAudioMsg] = useState(false);

  function handlePlayClick() {
    if (noAudio) {
      setShowNoAudioMsg(true);
      setTimeout(() => setShowNoAudioMsg(false), 3000);
      return;
    }
    onPlayNow(track);
  }

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all hover:border-amber-700/40 ${
        isPlaying ? "border-amber-600/40" : "border-transparent"
      }`}
      style={{
        background: isPlaying
          ? "oklch(0.20 0.08 28 / 0.8)"
          : "oklch(0.18 0.06 22 / 0.7)",
      }}
      data-ocid="media_page.track_row"
    >
      <div
        className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0 text-base"
        style={{
          background: "oklch(0.78 0.14 75 / 0.1)",
          border: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        {CONTENT_TYPE_ICONS[track.contentType]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p
            className="text-sm font-heading font-medium truncate"
            style={{
              color: isPlaying ? "oklch(0.78 0.14 75)" : "oklch(0.92 0.06 75)",
            }}
          >
            {track.title}
          </p>
          {noAudio && (
            <span
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-body shrink-0"
              style={{
                background: "oklch(0.45 0.08 55 / 0.25)",
                border: "1px solid oklch(0.60 0.08 55 / 0.3)",
                color: "oklch(0.72 0.08 58)",
              }}
              title="No audio uploaded yet"
            >
              <Upload className="h-2.5 w-2.5" />
              upload pending
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {track.deity && (
            <span
              className="text-xs truncate"
              style={{ color: "oklch(0.60 0.04 55)" }}
            >
              {track.deity}
            </span>
          )}
          {track.faith && (
            <span className="text-xs" style={{ color: "oklch(0.50 0.04 50)" }}>
              • {track.faith}
            </span>
          )}
          {track.durationLabel && (
            <span className="text-xs" style={{ color: "oklch(0.48 0.04 50)" }}>
              • {track.durationLabel}
            </span>
          )}
        </div>
        {showNoAudioMsg && (
          <p
            className="text-xs mt-0.5 font-body"
            style={{ color: "oklch(0.72 0.10 55)" }}
          >
            No audio file uploaded yet
          </p>
        )}
      </div>
      <Badge
        className={`text-xs border hidden sm:flex ${
          CONTENT_TYPE_COLORS[track.contentType]
        }`}
      >
        {track.contentType}
      </Badge>
      <div className="flex items-center gap-1.5 shrink-0">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-xs hover:bg-white/10"
          onClick={handlePlayClick}
          style={{
            color: isPlaying
              ? "oklch(0.78 0.14 75)"
              : noAudio
                ? "oklch(0.52 0.06 55)"
                : "oklch(0.65 0.04 60)",
          }}
          data-ocid="media_page.play_now"
        >
          {isPlaying ? "▶ Playing" : "▶ Play"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-xs hover:bg-white/10"
          onClick={() => onAddToPlaylist(track)}
          disabled={isInPlaylist}
          style={{
            color: isInPlaylist ? "oklch(0.55 0.04 50)" : "oklch(0.78 0.14 75)",
          }}
          data-ocid="media_page.add_to_playlist"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

export default function MediaPlayerPage() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<ContentType | "all">("all");
  const {
    playlist,
    playHistory,
    currentTrack,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    play,
    setPlaylistAndPlay,
  } = useMediaPlayerStore();

  const filtered = useMemo(() => {
    let tracks = SAMPLE_TRACKS;
    if (activeType !== "all")
      tracks = tracks.filter((t) => t.contentType === activeType);
    if (search.trim()) {
      const q = search.toLowerCase();
      tracks = tracks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.deity ?? "").toLowerCase().includes(q),
      );
    }
    return tracks;
  }, [activeType, search]);

  const contentTypes: {
    value: ContentType | "all";
    label: string;
    emoji: string;
  }[] = [
    { value: "all", label: "All", emoji: "🎶" },
    { value: "aarti", label: "Aarti", emoji: "🪔" },
    { value: "chalisa", label: "Chalisa", emoji: "📿" },
    { value: "mantra", label: "Mantra", emoji: "🕉️" },
    { value: "bhajan", label: "Bhajan", emoji: "🎵" },
    { value: "katha", label: "Katha", emoji: "📖" },
    { value: "suktam", label: "Suktam", emoji: "🎶" },
  ];

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "oklch(0.14 0.05 20)" }}
    >
      {/* Hero */}
      <div
        className="py-10 px-4 border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 22) 0%, oklch(0.22 0.10 35) 100%)",
          borderColor: "oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🎶</span>
            <div>
              <h1
                className="text-2xl sm:text-3xl font-heading font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Media Player
              </h1>
              <p
                className="text-sm font-body mt-0.5"
                style={{ color: "oklch(0.65 0.04 60)" }}
              >
                आरती • चालीसा • मंत्र • भजन • कथा • सूक्तम — सभी एक जगह
              </p>
            </div>
          </div>

          {/* Demo Mode banner */}
          <div
            className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm font-body"
            style={{
              background: "oklch(0.55 0.10 55 / 0.12)",
              border: "1px solid oklch(0.65 0.10 55 / 0.30)",
            }}
            data-ocid="media_page.demo_banner"
          >
            <span className="text-base mt-0.5">🎵</span>
            <div>
              <p
                className="font-semibold font-heading"
                style={{ color: "oklch(0.80 0.10 65)" }}
              >
                Demo Mode
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.62 0.06 58)" }}
              >
                Audio player preview — Admin uploads will replace demo tracks.
                All controls are functional; real audio plays once uploaded.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Tabs defaultValue="browse">
          <TabsList className="bg-card border border-border mb-5 h-auto flex flex-wrap gap-1 p-1">
            <TabsTrigger value="browse" data-ocid="media_page.tab_browse">
              <Music className="h-3.5 w-3.5 mr-1.5" /> Browse
            </TabsTrigger>
            <TabsTrigger value="playlist" data-ocid="media_page.tab_playlist">
              <ListMusic className="h-3.5 w-3.5 mr-1.5" /> Playlist (
              {playlist.length})
            </TabsTrigger>
            <TabsTrigger value="history" data-ocid="media_page.tab_history">
              <History className="h-3.5 w-3.5 mr-1.5" /> History (
              {playHistory.length})
            </TabsTrigger>
          </TabsList>

          {/* ─── Browse ───────────────────────────────────────────── */}
          <TabsContent value="browse">
            {/* Content type filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              {contentTypes.map((ct) => (
                <button
                  type="button"
                  key={ct.value}
                  onClick={() => setActiveType(ct.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-heading transition-all border ${
                    activeType === ct.value
                      ? "border-amber-600/60"
                      : "border-transparent hover:border-amber-800/40"
                  }`}
                  style={{
                    background:
                      activeType === ct.value
                        ? "oklch(0.78 0.14 75 / 0.15)"
                        : "oklch(0.18 0.06 22)",
                    color:
                      activeType === ct.value
                        ? "oklch(0.78 0.14 75)"
                        : "oklch(0.65 0.04 60)",
                  }}
                  data-ocid="media_page.type_filter"
                >
                  {ct.emoji} {ct.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.55 0.04 50)" }}
              />
              <Input
                placeholder="Search by title or deity..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-card border-border text-foreground"
                data-ocid="media_page.search"
              />
            </div>

            {/* Play all */}
            {filtered.length > 0 && (
              <div className="flex items-center justify-between mb-3">
                <p
                  className="text-xs font-body"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  {filtered.length} tracks
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs border-amber-700/40 hover:bg-amber-900/20"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                  onClick={() => setPlaylistAndPlay(filtered, 0)}
                  data-ocid="media_page.play_all"
                >
                  ▶ Play All
                </Button>
              </div>
            )}

            <div className="space-y-2">
              {filtered.map((track) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  onAddToPlaylist={addToPlaylist}
                  onPlayNow={play}
                  isInPlaylist={playlist.some((t) => t.id === track.id)}
                  isPlaying={currentTrack?.id === track.id}
                  noAudio={!track.audioUrl || track.audioUrl === ""}
                />
              ))}
            </div>
          </TabsContent>

          {/* ─── Playlist ─────────────────────────────────────────── */}
          <TabsContent value="playlist">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="font-heading font-semibold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Current Playlist ({playlist.length} tracks)
              </h2>
              {playlist.length > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs hover:bg-red-900/20"
                  style={{ color: "oklch(0.65 0.12 20)" }}
                  onClick={clearPlaylist}
                  data-ocid="media_page.clear_playlist"
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Clear All
                </Button>
              )}
            </div>

            {playlist.length === 0 ? (
              <div
                className="rounded-xl p-10 text-center border"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.1)",
                  background: "oklch(0.17 0.06 22)",
                }}
              >
                <span className="text-4xl block mb-3">🎵</span>
                <p
                  className="font-heading font-semibold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  Playlist is empty
                </p>
                <p
                  className="text-sm font-body mt-1"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  Browse tracks and add them to your playlist
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {playlist.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all"
                    style={{
                      background:
                        currentTrack?.id === track.id
                          ? "oklch(0.20 0.08 28)"
                          : "oklch(0.18 0.06 22)",
                      borderColor:
                        currentTrack?.id === track.id
                          ? "oklch(0.78 0.14 75 / 0.3)"
                          : "oklch(0.78 0.14 75 / 0.1)",
                    }}
                    data-ocid="media_page.playlist_item"
                  >
                    <span className="text-xl shrink-0">
                      {CONTENT_TYPE_ICONS[track.contentType]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-heading font-medium truncate"
                        style={{ color: "oklch(0.92 0.06 75)" }}
                      >
                        {track.title}
                      </p>
                      {track.deity && (
                        <p
                          className="text-xs"
                          style={{ color: "oklch(0.60 0.04 55)" }}
                        >
                          {track.deity}
                        </p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs hover:bg-white/10 shrink-0"
                      onClick={() => play(track)}
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      ▶
                    </Button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-red-900/20 shrink-0"
                      onClick={() => removeFromPlaylist(track.id)}
                      aria-label="Remove from playlist"
                      style={{ color: "oklch(0.60 0.12 20)" }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ─── History ──────────────────────────────────────────── */}
          <TabsContent value="history">
            <h2
              className="font-heading font-semibold mb-4"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Play History ({playHistory.length} tracks)
            </h2>

            {playHistory.length === 0 ? (
              <div
                className="rounded-xl p-10 text-center border"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.1)",
                  background: "oklch(0.17 0.06 22)",
                }}
              >
                <span className="text-4xl block mb-3">📭</span>
                <p
                  className="font-heading font-semibold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  No play history yet
                </p>
                <p
                  className="text-sm font-body mt-1"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  Start playing tracks to see your history here
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {playHistory.map((track, i) => (
                  <div
                    key={`${track.id}-hist-${i}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border"
                    style={{
                      background: "oklch(0.18 0.06 22)",
                      borderColor: "oklch(0.78 0.14 75 / 0.08)",
                    }}
                    data-ocid="media_page.history_item"
                  >
                    <span className="text-base shrink-0">
                      {CONTENT_TYPE_ICONS[track.contentType]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-heading font-medium truncate"
                        style={{ color: "oklch(0.88 0.06 75)" }}
                      >
                        {track.title}
                      </p>
                      {track.deity && (
                        <p
                          className="text-xs"
                          style={{ color: "oklch(0.60 0.04 55)" }}
                        >
                          {track.deity}
                        </p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs hover:bg-white/10 shrink-0"
                      onClick={() => play(track)}
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      ▶ Play
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs hover:bg-white/10 shrink-0"
                      onClick={() => addToPlaylist(track)}
                      disabled={playlist.some((t) => t.id === track.id)}
                      style={{
                        color: playlist.some((t) => t.id === track.id)
                          ? "oklch(0.45 0.04 50)"
                          : "oklch(0.65 0.04 60)",
                      }}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
