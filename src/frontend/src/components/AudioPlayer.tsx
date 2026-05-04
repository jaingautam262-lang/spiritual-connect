import { ExternalLink, Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  title: string;
  audioUrl?: string;
  /** If provided, shown as a "Listen on YouTube" button when no audioUrl */
  youtubeSearchQuery?: string;
  /** Mark as demo/mock track — shows different styling and banner */
  hasMockAudio?: boolean;
  /** Human-readable mock duration e.g. '3:45' shown when no real audio */
  durationLabel?: string;
}

export default function AudioPlayer({
  title,
  audioUrl,
  youtubeSearchQuery,
  hasMockAudio = false,
  durationLabel,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [noAudioMsg, setNoAudioMsg] = useState(false);

  const hasRealAudio = !!(audioUrl && audioUrl.trim() !== "");
  const searchQuery = youtubeSearchQuery ?? `${title} aarti`;
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

  useEffect(() => {
    if (!hasRealAudio) return;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration > 0)
        setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
      setIsPlaying(false);
      setProgress(0);
    };
  }, [audioUrl, hasRealAudio]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  function togglePlay() {
    if (!hasRealAudio) {
      setNoAudioMsg(true);
      setTimeout(() => setNoAudioMsg(false), 3000);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const pct = Number(e.target.value);
    audio.currentTime = (pct / 100) * audio.duration;
    setProgress(pct);
  }

  function formatTime(secs: number) {
    if (!secs || Number.isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  const currentTime = duration > 0 ? (progress / 100) * duration : 0;

  return (
    <div
      className="rounded-xl border p-4 mt-4"
      style={{
        background:
          hasMockAudio && !hasRealAudio
            ? "linear-gradient(135deg, oklch(0.18 0.05 25), oklch(0.22 0.06 30))"
            : "linear-gradient(135deg, oklch(0.20 0.07 28), oklch(0.24 0.09 35))",
        borderColor:
          hasMockAudio && !hasRealAudio
            ? "oklch(0.60 0.08 55 / 0.35)"
            : "oklch(0.78 0.14 75 / 0.25)",
      }}
      data-ocid="audio-player.card"
    >
      {/* Demo mode banner for mock tracks */}
      {hasMockAudio && !hasRealAudio && (
        <div
          className="flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-lg text-xs font-body"
          style={{
            background: "oklch(0.55 0.10 55 / 0.15)",
            border: "1px solid oklch(0.65 0.10 55 / 0.25)",
            color: "oklch(0.78 0.10 60)",
          }}
        >
          <span>🎵</span>
          <span>Audio coming soon — admin upload pending</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Play / Pause button */}
        <button
          type="button"
          onClick={togglePlay}
          data-ocid="audio-player.toggle"
          aria-label={isPlaying ? "Pause" : "Play"}
          title={
            hasRealAudio ? (isPlaying ? "Pause" : "Play") : "Audio coming soon"
          }
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: hasRealAudio
              ? "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))"
              : "oklch(0.32 0.05 45)",
            cursor: "pointer",
            boxShadow:
              hasRealAudio && isPlaying
                ? "0 0 0 0 oklch(0.78 0.14 75 / 0.4), 0 0 12px oklch(0.78 0.14 75 / 0.3)"
                : "none",
          }}
        >
          {isPlaying ? (
            <Pause
              className="h-4 w-4"
              style={{ color: "oklch(0.18 0.04 30)" }}
            />
          ) : (
            <Play
              className="h-4 w-4 ml-0.5"
              style={{
                color: hasRealAudio
                  ? "oklch(0.18 0.04 30)"
                  : "oklch(0.60 0.06 55)",
              }}
            />
          )}
        </button>

        {/* Track info + progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p
              className="font-heading text-sm font-semibold truncate"
              style={{ color: "oklch(0.88 0.06 70)" }}
            >
              {title}
            </p>
            {hasRealAudio && duration > 0 ? (
              <span
                className="text-xs font-body flex-shrink-0 ml-2"
                style={{ color: "oklch(0.65 0.04 55)" }}
              >
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            ) : durationLabel ? (
              <span
                className="text-xs font-body flex-shrink-0 ml-2"
                style={{ color: "oklch(0.50 0.04 50)" }}
              >
                {durationLabel}
              </span>
            ) : (
              <span
                className="text-xs font-body flex-shrink-0 ml-2 flex items-center gap-1"
                style={{ color: "oklch(0.55 0.04 50)" }}
              >
                <Volume2 className="h-3 w-3" />
                Coming Soon
              </span>
            )}
          </div>

          {/* Progress bar */}
          {hasRealAudio ? (
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={handleSeek}
              aria-label="Seek"
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, oklch(0.78 0.14 75) ${progress}%, oklch(0.35 0.05 40) ${progress}%)`,
                outline: "none",
              }}
            />
          ) : (
            <div
              className="w-full h-1.5 rounded-full relative overflow-hidden"
              style={{ background: "oklch(0.28 0.04 40)", opacity: 0.6 }}
            >
              {/* Subtle animated shimmer for demo tracks */}
              {hasMockAudio && (
                <div
                  className="absolute inset-y-0 left-0 w-1/3 animate-pulse"
                  style={{ background: "oklch(0.50 0.06 55 / 0.4)" }}
                />
              )}
            </div>
          )}

          {/* No audio message (on click) */}
          {noAudioMsg && (
            <p
              className="text-xs mt-1 font-body"
              style={{ color: "oklch(0.72 0.12 55)" }}
            >
              No audio file uploaded yet
            </p>
          )}
        </div>
      </div>

      {/* YouTube search button when no audio */}
      {!hasRealAudio && (
        <div className="mt-3 flex items-center gap-3">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="audio-player.youtube_button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "oklch(0.97 0.015 85)",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
              boxShadow: "0 2px 8px oklch(0.62 0.18 48 / 0.3)",
            }}
          >
            <ExternalLink className="h-3.5 w-3.5" />🎵 Listen on YouTube
          </a>
          <span
            className="text-xs font-body"
            style={{ color: "oklch(0.50 0.04 50)" }}
          >
            Opens a search for this devotional
          </span>
        </div>
      )}
    </div>
  );
}
