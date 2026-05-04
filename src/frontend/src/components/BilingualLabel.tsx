/**
 * BilingualLabel.tsx
 * Renders a string in the correct language based on the active language from
 * LanguageContext. Zero visual chrome — it is a transparent text primitive.
 *
 * Usage:
 *   <BilingualLabel en="Filter" hi="फ़िल्टर" />
 *   <BilingualLabel en="All" hi="सभी" className="font-heading text-sm" />
 */
import { useLanguage } from "../contexts/LanguageContext";

interface BilingualLabelProps {
  en: string;
  hi: string;
  /** Optional className passed to the wrapping <span> */
  className?: string;
  /** aria-label for screen readers (defaults to the English value) */
  ariaLabel?: string;
}

export function BilingualLabel({
  en,
  hi,
  className,
  ariaLabel,
}: BilingualLabelProps) {
  const { language } = useLanguage();
  const text = language === "hi" ? hi : en;

  return (
    <span
      className={className}
      aria-label={ariaLabel ?? en}
      lang={language === "hi" ? "hi" : "en"}
    >
      {text}
    </span>
  );
}

export default BilingualLabel;
