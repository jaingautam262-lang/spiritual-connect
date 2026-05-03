import { ExternalLink, Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  title: string;
  audioUrl?: string;
  /** If provided, shown as a "Listen on YouTube" button when no audioUrl */
  youtubeSearchQuery?: string;
}

export default function AudioPlayer({
  title,
  audioUrl,
  youtubeSearchQuery,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const hasAudio = !!audioUrl;
  const searchQuery = youtubeSearchQuery ?? `${title} aarti`;
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

  useEffect(() => {
    if (!hasAudio) return;
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
  }, [audioUrl, hasAudio]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  function togglePlay() {
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
          "linear-gradient(135deg, oklch(0.20 0.07 28), oklch(0.24 0.09 35))",
        borderColor: "oklch(0.78 0.14 75 / 0.25)",
      }}
      data-ocid="audio-player.card"
    >
      <div className="flex items-center gap-3">
        {/* Play / Pause button */}
        <button
          type="button"
          onClick={hasAudio ? togglePlay : undefined}
          data-ocid="audio-player.toggle"
          aria-label={isPlaying ? "Pause" : "Play"}
          title={
            hasAudio ? (isPlaying ? "Pause" : "Play") : "Audio coming soon"
          }
          disabled={!hasAudio}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: hasAudio
              ? "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))"
              : "oklch(0.35 0.04 50)",
            cursor: hasAudio ? "pointer" : "not-allowed",
            boxShadow:
              hasAudio && isPlaying
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
                color: hasAudio ? "oklch(0.18 0.04 30)" : "oklch(0.55 0.04 50)",
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
            {hasAudio && duration > 0 ? (
              <span
                className="text-xs font-body flex-shrink-0 ml-2"
                style={{ color: "oklch(0.65 0.04 55)" }}
              >
                {formatTime(currentTime)} / {formatTime(duration)}
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
          {hasAudio ? (
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
              className="w-full h-1.5 rounded-full"
              style={{ background: "oklch(0.35 0.05 40)", opacity: 0.5 }}
            />
          )}
        </div>
      </div>

      {/* YouTube search button when no audio */}
      {!hasAudio && (
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
