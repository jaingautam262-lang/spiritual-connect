import { useCallback, useEffect, useRef, useState } from "react";
import type { WebStory } from "../data/web-stories-data";

interface StoryViewerProps {
  stories: WebStory[];
  initialStoryIndex?: number;
  lang: "en" | "hi";
  onClose: () => void;
}

const SLIDE_DURATION = 5000; // ms

export default function StoryViewer({
  stories,
  initialStoryIndex = 0,
  lang,
  onClose,
}: StoryViewerProps) {
  const [storyIdx, setStoryIdx] = useState(initialStoryIndex);
  const [slideIdx, setSlideIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const progressAtPauseRef = useRef<number>(0);

  const story = stories[storyIdx];
  const slide = story?.slides[slideIdx];
  const totalSlides = story?.slides.length ?? 0;

  // Reset slide when story changes (intentionally only runs on storyIdx change)
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — reset only when story changes
  useEffect(() => {
    setSlideIdx(0);
    setProgress(0);
  }, [storyIdx]);

  const advanceSlide = useCallback(() => {
    setSlideIdx((prev) => {
      const curStory = stories[storyIdx];
      if (prev < (curStory?.slides.length ?? 0) - 1) {
        return prev + 1;
      }
      if (storyIdx < stories.length - 1) {
        setStoryIdx((si) => si + 1);
      } else {
        onClose();
      }
      return 0;
    });
  }, [storyIdx, stories, onClose]);

  // Auto-advance timer
  useEffect(() => {
    if (paused || !story) return;
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed =
        Date.now() -
        startTimeRef.current +
        progressAtPauseRef.current * SLIDE_DURATION;
      const newProgress = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(newProgress);

      if (newProgress >= 1) {
        progressAtPauseRef.current = 0;
        setProgress(0);
        advanceSlide();
      }
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, story, advanceSlide]);

  const goBack = useCallback(() => {
    progressAtPauseRef.current = 0;
    setProgress(0);
    if (slideIdx > 0) {
      setSlideIdx((p) => p - 1);
    } else if (storyIdx > 0) {
      setStoryIdx((p) => p - 1);
    }
  }, [slideIdx, storyIdx]);

  const goForward = useCallback(() => {
    progressAtPauseRef.current = 0;
    setProgress(0);
    if (slideIdx < totalSlides - 1) {
      setSlideIdx((p) => p + 1);
    } else if (storyIdx < stories.length - 1) {
      setStoryIdx((p) => p + 1);
    } else {
      onClose();
    }
  }, [slideIdx, totalSlides, storyIdx, stories.length, onClose]);

  // Touch handling for swipe
  const touchStartX = useRef(0);
  const touchStartTime = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
    setPaused(true);
    progressAtPauseRef.current = progress;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dt = Date.now() - touchStartTime.current;
    setPaused(false);

    if (Math.abs(dx) > 50 && dt < 300) {
      if (dx < 0) goForward();
      else goBack();
    } else if (dt < 200 && Math.abs(dx) < 10) {
      const tapX = e.changedTouches[0].clientX;
      if (tapX < window.innerWidth / 2) goBack();
      else goForward();
    }
  };

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goForward();
      if (e.key === "ArrowLeft") goBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goForward, goBack]);

  if (!story || !slide) return null;

  const displayTitle = lang === "hi" ? slide.titleHindi : slide.title;
  const displayDesc =
    lang === "hi" ? slide.descriptionHindi : slide.description;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
    >
      {/* Story card */}
      <div
        className="relative w-full max-w-sm h-[90vh] max-h-[700px] rounded-2xl overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={() => {
          setPaused(true);
          progressAtPauseRef.current = progress;
        }}
        onMouseUp={() => setPaused(false)}
        style={{ background: slide.bgColor }}
      >
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3 pb-0">
          {story.slides.map((s, i) => (
            <div
              key={s.id}
              className="flex-1 h-0.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.3)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: "oklch(0.78 0.14 75)",
                  width:
                    i < slideIdx
                      ? "100%"
                      : i === slideIdx
                        ? `${progress * 100}%`
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-4 left-0 right-0 z-20 flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "oklch(0.68 0.18 48 / 0.8)" }}
            >
              {story.category === "festivals"
                ? "🎉"
                : story.category === "deities"
                  ? "🛕"
                  : story.category === "mantras"
                    ? "🕉️"
                    : "🙏"}
            </div>
            <span className="text-xs font-semibold text-white/90">
              {lang === "hi" ? story.titleHindi : story.title}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close story"
            data-ocid="story_viewer.close"
          >
            ✕
          </button>
        </div>

        {/* Tap zones (desktop) */}
        <button
          type="button"
          onClick={goBack}
          className="absolute left-0 top-0 h-full w-1/3 z-10 cursor-pointer"
          aria-label="Previous slide"
          data-ocid="story_viewer.prev"
        />
        <button
          type="button"
          onClick={goForward}
          className="absolute right-0 top-0 h-full w-2/3 z-10 cursor-pointer"
          aria-label="Next slide"
          data-ocid="story_viewer.next"
        />

        {/* Slide image */}
        {slide.imageUrl && (
          <img
            src={slide.imageUrl}
            alt={displayTitle}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)",
          }}
        />

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <h2 className="text-xl font-heading font-bold text-white leading-tight mb-2">
            {displayTitle}
          </h2>
          <p className="text-sm leading-relaxed text-white/80">{displayDesc}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-white/50">
              {slideIdx + 1} / {totalSlides}
            </span>
          </div>
        </div>
      </div>

      {/* Side navigation (desktop) */}
      <button
        type="button"
        onClick={() => storyIdx > 0 && setStoryIdx((p) => p - 1)}
        disabled={storyIdx === 0}
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 text-2xl"
        aria-label="Previous story"
        data-ocid="story_viewer.prev_story"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() =>
          storyIdx < stories.length - 1 ? setStoryIdx((p) => p + 1) : onClose()
        }
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-2xl"
        aria-label="Next story"
        data-ocid="story_viewer.next_story"
      >
        ›
      </button>
    </div>
  );
}
