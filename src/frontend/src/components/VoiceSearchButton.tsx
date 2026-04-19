import { Mic, MicOff } from "lucide-react";
import { useEffect } from "react";
import { useVoiceSearch } from "../hooks/useVoiceSearch";

interface VoiceSearchButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
  language?: string;
}

export default function VoiceSearchButton({
  onTranscript,
  className = "",
  language = "hi-IN",
}: VoiceSearchButtonProps) {
  const {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
  } = useVoiceSearch(language);

  // Notify parent when transcript updates
  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
    }
  }, [transcript, onTranscript]);

  if (!isSupported) {
    return (
      <button
        type="button"
        disabled
        title="Voice search not supported in this browser"
        className={`p-2 rounded-full opacity-40 cursor-not-allowed ${className}`}
        style={{ color: "oklch(0.60 0.04 50)" }}
        aria-label="Voice search not supported"
        data-ocid="voice_search.unsupported_button"
      >
        <MicOff className="h-4 w-4" />
      </button>
    );
  }

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        title={
          error
            ? error
            : isListening
              ? "Stop listening"
              : "Voice search — tap and speak"
        }
        className={`p-2 rounded-full transition-all duration-200 ${className}`}
        style={{
          color: isListening
            ? "white"
            : error
              ? "oklch(0.60 0.20 30)"
              : "oklch(0.68 0.20 48)",
          background: isListening
            ? "oklch(0.58 0.22 25)"
            : error
              ? "oklch(0.60 0.20 30 / 0.10)"
              : "oklch(0.68 0.20 48 / 0.10)",
        }}
        aria-label={isListening ? "Stop voice search" : "Start voice search"}
        aria-pressed={isListening}
        data-ocid="voice_search.toggle_button"
      >
        {/* Pulsing ring when active */}
        {isListening && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-40"
            style={{ background: "oklch(0.58 0.22 25)" }}
            aria-hidden="true"
          />
        )}
        <Mic
          className={`h-4 w-4 relative z-10 ${isListening ? "animate-pulse" : ""}`}
        />
      </button>
    </div>
  );
}
