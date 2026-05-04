import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import {
  type FavouriteItem,
  useFavouritesStore,
} from "../stores/favouritesStore";

interface FavouriteButtonProps {
  item: FavouriteItem;
  className?: string;
}

export default function FavouriteButton({
  item,
  className = "",
}: FavouriteButtonProps) {
  const { toggleFavourite, isFavourite } = useFavouritesStore();
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const favourited = isFavourite(item.id);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    toggleFavourite(item);
    if (favourited) {
      toast(isHindi ? "पसंदीदा से हटाया" : "Removed from Favourites", {
        icon: "💔",
        duration: 2500,
      });
    } else {
      toast(isHindi ? "पसंदीदा में जोड़ा" : "Added to Favourites", {
        icon: "❤️",
        duration: 2500,
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        favourited
          ? isHindi
            ? "पसंदीदा से हटाएँ"
            : "Remove from favourites"
          : isHindi
            ? "पसंदीदा में जोड़ें"
            : "Add to favourites"
      }
      className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${className}`}
      style={{
        background: favourited
          ? "oklch(0.55 0.22 25 / 0.18)"
          : "oklch(0.78 0.14 75 / 0.12)",
        border: `1px solid ${
          favourited
            ? "oklch(0.65 0.22 25 / 0.5)"
            : "oklch(0.78 0.14 75 / 0.25)"
        }`,
      }}
      data-ocid="favourite.toggle"
    >
      <Heart
        className="h-4 w-4 transition-all duration-200"
        style={{
          color: favourited ? "oklch(0.60 0.22 25)" : "oklch(0.78 0.14 75)",
          fill: favourited ? "oklch(0.60 0.22 25)" : "transparent",
        }}
      />
    </button>
  );
}
