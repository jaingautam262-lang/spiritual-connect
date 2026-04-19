import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ContentType =
  | "aarti"
  | "chalisa"
  | "mantra"
  | "bhajan"
  | "katha"
  | "suktam";

export interface MediaTrack {
  id: string;
  title: string;
  titleHindi?: string;
  deity?: string;
  faith?: string;
  contentType: ContentType;
  audioUrl?: string;
  duration?: number; // seconds
  thumbnail?: string;
  lyrics?: string;
}

interface MediaPlayerState {
  currentTrack: MediaTrack | null;
  playlist: MediaTrack[];
  playHistory: MediaTrack[];
  isPlaying: boolean;
  isExpanded: boolean;
  isVisible: boolean;
  volume: number; // 0-1
  currentTime: number; // seconds
  duration: number; // seconds
  isShuffled: boolean;
  isRepeating: boolean;

  // Actions
  play: (track: MediaTrack) => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  addToPlaylist: (track: MediaTrack) => void;
  removeFromPlaylist: (id: string) => void;
  clearPlaylist: () => void;
  setPlaylistAndPlay: (tracks: MediaTrack[], startIndex?: number) => void;
  setVolume: (vol: number) => void;
  seek: (time: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (dur: number) => void;
  toggleExpand: () => void;
  show: () => void;
  hide: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

export const useMediaPlayerStore = create<MediaPlayerState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      playlist: [],
      playHistory: [],
      isPlaying: false,
      isExpanded: false,
      isVisible: false,
      volume: 0.8,
      currentTime: 0,
      duration: 0,
      isShuffled: false,
      isRepeating: false,

      play: (track) => {
        const { currentTrack, playHistory } = get();
        const newHistory = currentTrack
          ? [currentTrack, ...playHistory.slice(0, 19)]
          : playHistory;
        set({
          currentTrack: track,
          isPlaying: true,
          isVisible: true,
          currentTime: 0,
          playHistory: newHistory,
        });
      },

      pause: () => set({ isPlaying: false }),

      resume: () => set({ isPlaying: true }),

      togglePlay: () => {
        const { isPlaying, currentTrack } = get();
        if (!currentTrack) return;
        set({ isPlaying: !isPlaying });
      },

      next: () => {
        const { playlist, currentTrack, isShuffled } = get();
        if (!playlist.length) return;
        const idx = playlist.findIndex((t) => t.id === currentTrack?.id);
        let nextIdx: number;
        if (isShuffled) {
          nextIdx = Math.floor(Math.random() * playlist.length);
        } else {
          nextIdx = idx < playlist.length - 1 ? idx + 1 : 0;
        }
        const next = playlist[nextIdx];
        if (next) get().play(next);
      },

      previous: () => {
        const { currentTime, playHistory } = get();
        if (currentTime > 3) {
          set({ currentTime: 0 });
          return;
        }
        if (playHistory.length > 0) {
          const [prev, ...rest] = playHistory;
          set({
            currentTrack: prev,
            isPlaying: true,
            currentTime: 0,
            playHistory: rest,
          });
        }
      },

      addToPlaylist: (track) => {
        const { playlist } = get();
        if (!playlist.find((t) => t.id === track.id)) {
          set({ playlist: [...playlist, track], isVisible: true });
        }
      },

      removeFromPlaylist: (id) =>
        set((state) => ({
          playlist: state.playlist.filter((t) => t.id !== id),
        })),

      clearPlaylist: () => set({ playlist: [] }),

      setPlaylistAndPlay: (tracks, startIndex = 0) => {
        const track = tracks[startIndex];
        if (track) {
          set({ playlist: tracks });
          get().play(track);
        }
      },

      setVolume: (vol) => set({ volume: Math.max(0, Math.min(1, vol)) }),

      seek: (time) => set({ currentTime: time }),

      setCurrentTime: (time) => set({ currentTime: time }),

      setDuration: (dur) => set({ duration: dur }),

      toggleExpand: () => set((s) => ({ isExpanded: !s.isExpanded })),

      show: () => set({ isVisible: true }),

      hide: () => set({ isVisible: false, isPlaying: false }),

      toggleShuffle: () => set((s) => ({ isShuffled: !s.isShuffled })),

      toggleRepeat: () => set((s) => ({ isRepeating: !s.isRepeating })),
    }),
    {
      name: "spiritual-media-player",
      partialize: (state) => ({
        volume: state.volume,
        isShuffled: state.isShuffled,
        isRepeating: state.isRepeating,
        playlist: state.playlist,
        playHistory: state.playHistory.slice(0, 10),
      }),
    },
  ),
);
