import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  ChevronDown,
  ChevronUp,
  List,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useMediaPlayerStore } from "../stores/mediaPlayerStore";

function formatTime(seconds: number): string {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const CONTENT_TYPE_COLORS: Record<string, string> = {
  aarti: "bg-orange-900/50 text-orange-300",
  chalisa: "bg-amber-900/50 text-amber-300",
  mantra: "bg-purple-900/50 text-purple-300",
  bhajan: "bg-rose-900/50 text-rose-300",
  katha: "bg-blue-900/50 text-blue-300",
  suktam: "bg-green-900/50 text-green-300",
};

export default function UnifiedMediaPlayer() {
  const {
    currentTrack,
    playlist,
    isPlaying,
    isExpanded,
    isVisible,
    volume,
    currentTime,
    duration,
    isShuffled,
    isRepeating,
    pause,
    resume,
    next,
    previous,
    setVolume,
    seek,
    setCurrentTime,
    setDuration,
    toggleExpand,
    hide,
    toggleShuffle,
    toggleRepeat,
    removeFromPlaylist,
    play,
  } = useMediaPlayerStore();

  const audioRef = useRef<HTMLAudioElement>(null);

  // Sync audio with store state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentTrack?.audioUrl) {
      if (audio.src !== currentTrack.audioUrl) {
        audio.src = currentTrack.audioUrl;
        audio.load();
      }
      if (isPlaying) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        next();
      }
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, [isRepeating, next, setCurrentTime, setDuration]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  if (!isVisible || !currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.16 0.07 22) 0%, oklch(0.20 0.09 28) 100%)",
        borderTop: "1px solid oklch(0.78 0.14 75 / 0.25)",
        boxShadow: "0 -4px 32px oklch(0 0 0 / 0.5)",
      }}
      data-ocid="media_player.container"
    >
      <audio ref={audioRef}>
        <track kind="captions" />
      </audio>

      {/* Progress bar at top */}
      <div
        className="w-full h-1 bg-white/10 relative cursor-pointer"
        role="slider"
        aria-label="Playback progress"
        aria-valuenow={currentTime}
        aria-valuemin={0}
        aria-valuemax={duration}
        tabIndex={0}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          const newTime = ratio * duration;
          if (audioRef.current) audioRef.current.currentTime = newTime;
          seek(newTime);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") seek(Math.min(duration, currentTime + 5));
          if (e.key === "ArrowLeft") seek(Math.max(0, currentTime - 5));
        }}
        data-ocid="media_player.progress_bar"
      >
        <div
          className="h-full transition-all"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, oklch(0.68 0.20 48), oklch(0.78 0.14 75))",
          }}
        />
      </div>

      {/* Expanded Playlist Panel */}
      {isExpanded && (
        <div
          className="border-b overflow-y-auto"
          style={{
            maxHeight: "220px",
            borderColor: "oklch(0.78 0.14 75 / 0.15)",
          }}
          data-ocid="media_player.playlist"
        >
          {playlist.length === 0 ? (
            <div
              className="px-4 py-3 text-center text-sm"
              style={{ color: "oklch(0.65 0.04 60)" }}
            >
              Playlist is empty — add tracks from Aarti, Chalisa, Bhajan
              sections
            </div>
          ) : (
            <div
              className="divide-y"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.08)" }}
            >
              {playlist.map((track, i) => (
                <button
                  type="button"
                  key={`${track.id}-${i}`}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-white/5 ${currentTrack?.id === track.id ? "bg-white/8" : ""}`}
                  onClick={() => play(track)}
                  data-ocid="media_player.playlist_item"
                >
                  <span
                    className="text-xs w-4 shrink-0"
                    style={{ color: "oklch(0.55 0.04 50)" }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-medium truncate"
                      style={{
                        color:
                          currentTrack?.id === track.id
                            ? "oklch(0.78 0.14 75)"
                            : "oklch(0.88 0.06 75)",
                      }}
                    >
                      {track.title}
                    </p>
                    {track.deity && (
                      <p
                        className="text-xs truncate"
                        style={{ color: "oklch(0.55 0.04 50)" }}
                      >
                        {track.deity}
                      </p>
                    )}
                  </div>
                  <Badge
                    className={`text-xs ${CONTENT_TYPE_COLORS[track.contentType] ?? ""} border-0`}
                  >
                    {track.contentType}
                  </Badge>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromPlaylist(track.id);
                    }}
                    className="p-1 rounded hover:bg-white/10 shrink-0"
                    aria-label="Remove from playlist"
                    style={{ color: "oklch(0.55 0.04 50)" }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main player bar */}
      <div className="flex items-center gap-3 px-4 py-2.5">
        {/* Track info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0 text-lg"
            style={{
              background: "oklch(0.78 0.14 75 / 0.15)",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            {currentTrack.contentType === "aarti"
              ? "🪔"
              : currentTrack.contentType === "chalisa"
                ? "📿"
                : currentTrack.contentType === "mantra"
                  ? "🕉️"
                  : currentTrack.contentType === "bhajan"
                    ? "🎵"
                    : currentTrack.contentType === "katha"
                      ? "📖"
                      : "🎶"}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-sm font-semibold truncate"
              style={{ color: "oklch(0.92 0.06 75)" }}
            >
              {currentTrack.title}
            </p>
            <div className="flex items-center gap-2">
              {currentTrack.deity && (
                <span
                  className="text-xs truncate"
                  style={{ color: "oklch(0.65 0.05 60)" }}
                >
                  {currentTrack.deity}
                </span>
              )}
              {!currentTrack.audioUrl && (
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  (Lyrics only)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Time */}
        <div
          className="hidden sm:flex items-center gap-1 text-xs shrink-0"
          style={{ color: "oklch(0.55 0.04 50)" }}
        >
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={toggleShuffle}
            className={`p-1.5 rounded-lg transition-colors hover:bg-white/10 hidden sm:flex ${isShuffled ? "text-amber-400" : ""}`}
            aria-label="Shuffle"
            style={{
              color: isShuffled ? "oklch(0.78 0.14 75)" : "oklch(0.65 0.04 60)",
            }}
            data-ocid="media_player.shuffle"
          >
            <Shuffle className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={previous}
            className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
            aria-label="Previous"
            style={{ color: "oklch(0.78 0.10 75)" }}
            data-ocid="media_player.previous"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={isPlaying ? pause : resume}
            className="h-9 w-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
            data-ocid="media_player.play_pause"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 text-white ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={next}
            className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
            aria-label="Next"
            style={{ color: "oklch(0.78 0.10 75)" }}
            data-ocid="media_player.next"
          >
            <SkipForward className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={toggleRepeat}
            className="p-1.5 rounded-lg transition-colors hover:bg-white/10 hidden sm:flex"
            aria-label="Repeat"
            style={{
              color: isRepeating
                ? "oklch(0.78 0.14 75)"
                : "oklch(0.65 0.04 60)",
            }}
            data-ocid="media_player.repeat"
          >
            <Repeat className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 w-24 shrink-0">
          <Volume2
            className="h-3.5 w-3.5 shrink-0"
            style={{ color: "oklch(0.65 0.04 60)" }}
          />
          <Slider
            value={[volume * 100]}
            onValueChange={([v]) => setVolume((v ?? 80) / 100)}
            min={0}
            max={100}
            step={1}
            className="flex-1"
            data-ocid="media_player.volume"
          />
        </div>

        {/* Expand/Collapse playlist */}
        <button
          type="button"
          onClick={toggleExpand}
          className="p-1.5 rounded-lg transition-colors hover:bg-white/10 hidden sm:flex items-center gap-1"
          aria-label="Toggle playlist"
          style={{
            color: isExpanded ? "oklch(0.78 0.14 75)" : "oklch(0.65 0.04 60)",
          }}
          data-ocid="media_player.playlist_toggle"
        >
          <List className="h-4 w-4" />
          {playlist.length > 0 && (
            <span className="text-xs">{playlist.length}</span>
          )}
        </button>

        {isExpanded ? (
          <button
            type="button"
            onClick={toggleExpand}
            className="p-1.5 rounded-lg hover:bg-white/10"
            style={{ color: "oklch(0.65 0.04 60)" }}
            aria-label="Collapse"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleExpand}
            className="p-1.5 rounded-lg hover:bg-white/10 sm:hidden"
            style={{ color: "oklch(0.65 0.04 60)" }}
            aria-label="Expand"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        )}

        {/* Close */}
        <button
          type="button"
          onClick={hide}
          className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
          aria-label="Close player"
          style={{ color: "oklch(0.55 0.04 50)" }}
          data-ocid="media_player.close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Export helper to add tracks to player
export { useMediaPlayerStore };
