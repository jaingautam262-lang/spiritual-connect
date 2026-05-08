import { Pause, Play, Square, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TTSAudioPlayerProps {
  text: string;
  language?: string;
  title?: string;
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5] as const;
type Speed = (typeof SPEED_OPTIONS)[number];

export default function TTSAudioPlayer({
  text,
  language = "hi-IN",
  title = "लेख सुनें",
}: TTSAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);
  const [wordIndex, setWordIndex] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const [hindiVoiceAvailable, setHindiVoiceAvailable] = useState<
    boolean | null
  >(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const words = text.split(/\s+/).filter(Boolean);
  const totalWords = words.length;
  const progress =
    totalWords > 0 ? Math.round((wordIndex / totalWords) * 100) : 0;

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setIsSupported(false);
      return;
    }
    // Check hi-IN voice availability (may need delay for voice list to load)
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const hasHindi = voices.some(
          (v) => v.lang.startsWith("hi") || v.lang.startsWith("hi-IN"),
        );
        setHindiVoiceAvailable(hasHindi);
      }
    };
    checkVoices();
    window.speechSynthesis.addEventListener("voiceschanged", checkVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", checkVoices);
      window.speechSynthesis?.cancel();
    };
  }, []);

  function buildUtterance() {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = speed;

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const spoken = text.slice(0, event.charIndex);
        const count = spoken.split(/\s+/).filter(Boolean).length;
        setWordIndex(count);
      }
    };
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setWordIndex(totalWords);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    return utterance;
  }

  function handlePlay() {
    if (!isSupported) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }
    window.speechSynthesis.cancel();
    setWordIndex(0);
    const utterance = buildUtterance();
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  }

  function handlePause() {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  }

  function handleStop() {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setWordIndex(0);
  }

  function handleSpeedChange(newSpeed: Speed) {
    setSpeed(newSpeed);
    if (isPlaying) {
      // Restart with new speed
      const wasPaused = !isPlaying;
      window.speechSynthesis.cancel();
      if (!wasPaused) {
        const utterance = buildUtterance();
        utterance.rate = newSpeed;
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    }
  }

  if (!isSupported) {
    return (
      <div
        className="rounded-xl border p-4 mt-4 flex items-center gap-3"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.07 28), oklch(0.24 0.09 35))",
          borderColor: "oklch(0.60 0.08 55 / 0.35)",
        }}
      >
        <VolumeX
          className="h-5 w-5 flex-shrink-0"
          style={{ color: "oklch(0.60 0.06 55)" }}
        />
        <p
          className="text-sm font-body"
          style={{ color: "oklch(0.65 0.04 55)" }}
        >
          आपके ब्राउज़र में TTS समर्थित नहीं है। कृपया Chrome या Edge उपयोग करें।
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border p-4 mt-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.20 0.07 28), oklch(0.24 0.09 35))",
        borderColor: "oklch(0.78 0.14 75 / 0.25)",
      }}
      data-ocid="tts-player.card"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Volume2
          className="h-4 w-4 flex-shrink-0"
          style={{ color: "oklch(0.78 0.14 75)" }}
        />
        <span
          className="font-heading text-sm font-semibold"
          style={{ color: "oklch(0.88 0.06 70)" }}
        >
          {title}
        </span>
        <div className="ml-auto flex items-center gap-2">
          {language === "hi-IN" && hindiVoiceAvailable === false && (
            <span
              className="text-xs font-body px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(0.55 0.14 38 / 0.2)",
                color: "oklch(0.78 0.12 48)",
                border: "1px solid oklch(0.65 0.10 45 / 0.3)",
              }}
            >
              हिंदी आवाज़ उपलब्ध नहीं
            </span>
          )}
          {language === "hi-IN" && hindiVoiceAvailable === true && (
            <span
              className="text-xs font-body"
              style={{ color: "oklch(0.62 0.14 145)" }}
            >
              🟢 हिंदी
            </span>
          )}
          <span
            className="text-xs font-body"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            AI आवाज़
          </span>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-3">
        {/* Play / Pause */}
        <button
          type="button"
          onClick={isPlaying ? handlePause : handlePlay}
          data-ocid="tts-player.play_button"
          aria-label={isPlaying ? "Pause" : isPaused ? "Resume" : "Play"}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
            boxShadow: isPlaying
              ? "0 0 12px oklch(0.78 0.14 75 / 0.3)"
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
              style={{ color: "oklch(0.18 0.04 30)" }}
            />
          )}
        </button>

        {/* Stop */}
        <button
          type="button"
          onClick={handleStop}
          data-ocid="tts-player.stop_button"
          aria-label="Stop"
          disabled={!isPlaying && !isPaused}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
          style={{ background: "oklch(0.32 0.05 45)" }}
        >
          <Square
            className="h-3.5 w-3.5"
            style={{ color: "oklch(0.70 0.08 55)" }}
          />
        </button>

        {/* Progress */}
        <div className="flex-1 min-w-0">
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: "oklch(0.32 0.05 40)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(to right, oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span
              className="text-xs font-body"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              {isPaused ? "⏸ रुका हुआ" : isPlaying ? "▶ बोल रहा है..." : "तैयार"}
            </span>
            <span
              className="text-xs font-body"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              {wordIndex}/{totalWords} शब्द
            </span>
          </div>
        </div>

        {/* Speed selector */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {SPEED_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSpeedChange(s)}
              data-ocid={`tts-player.speed_${String(s).replace(".", "_")}`}
              className="text-xs px-2 py-1 rounded font-body transition-all duration-150"
              style={{
                background:
                  speed === s
                    ? "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))"
                    : "oklch(0.32 0.05 45)",
                color:
                  speed === s ? "oklch(0.18 0.04 30)" : "oklch(0.65 0.04 55)",
                fontWeight: speed === s ? "700" : "400",
              }}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
