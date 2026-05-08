// Flat array of all verse data for cross-chapter search
// Aggregated from gitaData.ts for unified search functionality

import type { GitaVerseData } from "./gitaData";
import { gitaData } from "./gitaData";

// Build the flat verse list from all 18 chapters
export const gitaSearchVerses: GitaVerseData[] = gitaData.flatMap(
  (chapter) => chapter.verses,
);

// Search function — returns matching verses sorted by relevance
export function searchGitaVerses(query: string, limit = 20): GitaVerseData[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();

  // Check for chapter.verse format like "2.47"
  const versePattern = /^(\d{1,2})\.(\d{1,2})$/.exec(q);
  if (versePattern) {
    const ch = Number(versePattern[1]);
    const v = Number(versePattern[2]);
    return gitaSearchVerses.filter(
      (verse) => verse.chapter === ch && verse.verse === v,
    );
  }

  // Text search across all fields
  return gitaSearchVerses
    .filter(
      (verse) =>
        verse.english.toLowerCase().includes(q) ||
        verse.hindi.includes(q) ||
        verse.transliteration.toLowerCase().includes(q) ||
        verse.sanskrit.includes(q) ||
        (verse.wordMeaning?.toLowerCase().includes(q) ?? false),
    )
    .slice(0, limit);
}

// Get all verses for a specific chapter
export function getChapterSearchVerses(chapterNumber: number): GitaVerseData[] {
  return gitaSearchVerses.filter((v) => v.chapter === chapterNumber);
}

// Get a specific verse
export function getSearchVerse(
  chapter: number,
  verse: number,
): GitaVerseData | undefined {
  return gitaSearchVerses.find(
    (v) => v.chapter === chapter && v.verse === verse,
  );
}
