import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavouriteItem {
  id: string;
  type:
    | "aarti"
    | "chalisa"
    | "mantra"
    | "stotra"
    | "kavach"
    | "ashtakam"
    | "stuti"
    | "sahasranam"
    | "product"
    | "blog";
  title: string;
  subtitle?: string;
  path: string;
  icon?: string;
}

interface FavouritesState {
  favourites: FavouriteItem[];
  addFavourite: (item: FavouriteItem) => void;
  removeFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  toggleFavourite: (item: FavouriteItem) => void;
  clearFavourites: () => void;
}

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favourites: [],

      addFavourite: (item) => {
        const { favourites } = get();
        if (!favourites.find((f) => f.id === item.id)) {
          set({ favourites: [...favourites, item] });
        }
      },

      removeFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.filter((f) => f.id !== id),
        })),

      isFavourite: (id) => get().favourites.some((f) => f.id === id),

      toggleFavourite: (item) => {
        const { isFavourite, addFavourite, removeFavourite } = get();
        if (isFavourite(item.id)) {
          removeFavourite(item.id);
        } else {
          addFavourite(item);
        }
      },

      clearFavourites: () => set({ favourites: [] }),
    }),
    {
      name: "spiritual-connect-favourites",
    },
  ),
);
