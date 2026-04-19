import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  type MediaTrack,
  useMediaPlayerStore,
} from "../stores/mediaPlayerStore";

interface SuktamMiniPlayerProps {
  /** Unique ID for this suktam — used to detect if this track is active */
  suktamId: string;
  suktamName: string;
  suktamNameHindi?: string;
  deity?: string;
  /** Optional estimated duration in seconds (used for display only) */
  estimatedDuration?: number;
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function SuktamMiniPlayer({
  suktamId,
  suktamName,
  suktamNameHindi,
  deity,
  estimatedDuration = 195,
}: SuktamMiniPlayerProps) {
  const { currentTrack, isPlaying, play, pause, resume, currentTime } =
    useMediaPlayerStore();

  const isThisTrack = currentTrack?.id === `suktam-${suktamId}`;
  const isActive = isThisTrack && isPlaying;

  // Simulated local progress when this track is "playing"
  const [localTime, setLocalTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isThisTrack) {
      setLocalTime(currentTime);
    }
  }, [isThisTrack, currentTime]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setLocalTime((t) => {
          const next = t + 1;
          return next >= estimatedDuration ? 0 : next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, estimatedDuration]);

  const handlePlayPause = () => {
    if (!isThisTrack) {
      const track: MediaTrack = {
        id: `suktam-${suktamId}`,
        title: suktamName,
        titleHindi: suktamNameHindi,
        deity: deity,
        contentType: "suktam",
        audioUrl: `suktam-${suktamId}`,
        duration: estimatedDuration,
      };
      play(track);
      setLocalTime(0);
    } else if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const displayTime = isThisTrack ? localTime : 0;
  const progress =
    estimatedDuration > 0 ? (displayTime / estimatedDuration) * 100 : 0;

  return (
    <div
      className="rounded-xl p-3 flex items-center gap-3"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.24 0.14 38 / 0.95), oklch(0.20 0.12 30 / 0.95))",
        border: isActive
          ? "1px solid oklch(0.78 0.14 75 / 0.50)"
          : "1px solid oklch(0.78 0.14 75 / 0.20)",
        boxShadow: isActive ? "0 0 12px oklch(0.68 0.20 48 / 0.20)" : "none",
        transition: "all 0.3s ease",
      }}
      data-ocid="suktam.mini_player"
    >
      {/* Play/Pause Button */}
      <button
        type="button"
        aria-label={isActive ? "Pause" : "Play"}
        onClick={handlePlayPause}
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
        style={{
          background: isActive
            ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.18 40))"
            : "linear-gradient(135deg, oklch(0.60 0.18 48 / 0.80), oklch(0.50 0.15 40 / 0.80))",
          boxShadow: isActive ? "0 2px 8px oklch(0.68 0.20 48 / 0.40)" : "none",
        }}
        data-ocid="suktam.mini_player.play_pause"
      >
        {isActive ? (
          <Pause className="h-4 w-4 fill-white" style={{ color: "white" }} />
        ) : (
          <Play
            className="h-4 w-4 fill-white"
            style={{ color: "white", transform: "translateX(1px)" }}
          />
        )}
      </button>

      {/* Track Info + Seek */}
      <div className="flex-1 min-w-0">
        {/* Title row */}
        <div className="flex items-center justify-between gap-1 mb-1">
          <span
            className="text-xs font-semibold truncate"
            style={{ color: "oklch(0.88 0.08 75)" }}
          >
            {isThisTrack ? "♪ Now Playing" : "▷ Play Audio"}
          </span>
          <span
            className="text-xs font-mono shrink-0"
            style={{ color: "oklch(0.65 0.05 55)" }}
          >
            {formatTime(displayTime)} / {formatTime(estimatedDuration)}
          </span>
        </div>

        <p
          className="text-xs truncate mb-1.5"
          style={{ color: "oklch(0.72 0.10 60)" }}
        >
          {suktamNameHindi ?? suktamName}
        </p>

        {/* Progress bar */}
        <div
          className="relative h-1.5 rounded-full overflow-hidden"
          style={{ background: "oklch(0.30 0.06 30)" }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
            style={{
              width: `${progress}%`,
              background: isActive
                ? "linear-gradient(90deg, oklch(0.68 0.20 48), oklch(0.78 0.14 75))"
                : "oklch(0.55 0.12 48 / 0.60)",
            }}
          />
          {isActive && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
              style={{
                left: `calc(${progress}% - 5px)`,
                background: "oklch(0.78 0.14 75)",
                boxShadow: "0 0 4px oklch(0.78 0.14 75 / 0.80)",
                transition: "left 1s linear",
              }}
            />
          )}
        </div>
      </div>

      {/* Volume icon (decorative) */}
      <Volume2
        className="h-4 w-4 shrink-0"
        style={{ color: "oklch(0.55 0.08 50)" }}
        aria-hidden="true"
      />
    </div>
  );
}
