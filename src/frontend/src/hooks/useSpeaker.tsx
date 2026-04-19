// useSpeaker — Web Speech API synthesis hook + SpeakerButton component

import { useCallback, useRef, useState } from "react";

export interface UseSpeakerReturn {
  speak: (text: string, lang?: "en-IN" | "hi-IN") => void;
  stop: () => void;
  isSpeaking: boolean;
}

export function useSpeaker(): UseSpeakerReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    utteranceRef.current = null;
  }, []);

  const speak = useCallback(
    (text: string, lang: "en-IN" | "hi-IN" = "en-IN") => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;

      // Toggle off if already speaking
      if (isSpeaking) {
        stop();
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSpeaking, stop],
  );

  return { speak, stop, isSpeaking };
}

// ─── SpeakerButton Component ──────────────────────────────────────────────────

import React from "react";

interface SpeakerButtonProps {
  text: string;
  lang?: "en-IN" | "hi-IN";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SpeakerButton({
  text,
  lang = "en-IN",
  className = "",
  size = "md",
}: SpeakerButtonProps) {
  const { speak, isSpeaking } = useSpeaker();

  const sizeClasses: Record<string, string> = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <button
      type="button"
      onClick={() => speak(text, lang)}
      aria-label={isSpeaking ? "Stop speaking" : "Listen"}
      title={isSpeaking ? "Stop" : "Listen"}
      className={[
        "relative inline-flex items-center justify-center rounded-full",
        "bg-[#D4AF37] text-white shadow-md",
        "hover:bg-[#FF9933] transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] focus-visible:ring-offset-2",
        sizeClasses[size],
        isSpeaking ? "ring-2 ring-[#FF9933] ring-offset-2" : "",
        className,
      ].join(" ")}
    >
      {isSpeaking ? (
        <>
          {/* Animated wave bars */}
          <span className="absolute inset-0 flex items-center justify-center gap-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-0.5 bg-white rounded-full"
                style={{
                  height: "40%",
                  animation: `speakerWave 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                }}
              />
            ))}
          </span>
          <style>{`
            @keyframes speakerWave {
              from { transform: scaleY(0.4); }
              to   { transform: scaleY(1.2); }
            }
          `}</style>
        </>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      )}
    </button>
  );
}
