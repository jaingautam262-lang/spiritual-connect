import { useCallback, useEffect, useRef, useState } from "react";

interface VoiceSearchState {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  error: string | null;
}

interface VoiceSearchHook extends VoiceSearchState {
  startListening: () => void;
  stopListening: () => void;
}

// Use unknown to handle varying browser SpeechRecognition implementations
interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognitionInstance) => void) | null;
  onend: ((this: SpeechRecognitionInstance) => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvt) => void) | null;
}

interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionSingleResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionResultItem;
}

interface SpeechRecognitionResultEvent {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: SpeechRecognitionSingleResult;
  };
}

interface SpeechRecognitionErrorEvt {
  error: string;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function getSpeechRecognitionClass(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function useVoiceSearch(language = "hi-IN"): VoiceSearchHook {
  const SpeechRecognitionClass = getSpeechRecognitionClass();
  const isSupported = !!SpeechRecognitionClass;

  const [state, setState] = useState<VoiceSearchState>({
    isListening: false,
    transcript: "",
    isSupported,
    error: null,
  });

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    if (!SpeechRecognitionClass) return;

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setState((prev) => ({ ...prev, isListening: true, error: null }));
    };

    recognition.onresult = (event: SpeechRecognitionResultEvent) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setState((prev) => ({
        ...prev,
        transcript: finalTranscript || interimTranscript,
      }));
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvt) => {
      const errorMessages: Record<string, string> = {
        "not-allowed":
          "Microphone access denied. Please allow microphone permissions.",
        "no-speech": "No speech detected. Please try again.",
        network: "Network error. Check your internet connection.",
        aborted: "",
      };
      const msg =
        errorMessages[event.error] ??
        `Speech recognition error: ${event.error}`;
      setState((prev) => ({
        ...prev,
        isListening: false,
        error: msg || null,
      }));
    };

    recognition.onend = () => {
      setState((prev) => ({ ...prev, isListening: false }));
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [SpeechRecognitionClass, language]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) return;
    setState((prev) => ({ ...prev, transcript: "", error: null }));
    try {
      recognitionRef.current.start();
    } catch {
      // Recognition already started — stop and restart
      recognitionRef.current.stop();
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
  };
}
