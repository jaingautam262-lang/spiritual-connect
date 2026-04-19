import { useCallback, useEffect, useMemo, useState } from "react";

export type ContentType =
  | "Aarti"
  | "Chalisa"
  | "Mantra"
  | "Stotra"
  | "Kavach"
  | "Ashtakam"
  | "Stuti"
  | "Sahasranama"
  | "Bhajan"
  | "Suktam"
  | "VratKatha"
  | "Temple"
  | "Blog";

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  type: ContentType;
  path: string;
  faith?: string;
  deity?: string;
}

export type FilterFaith = "All" | "Hindu" | "Jain" | "Sikh";

function simpleScore(text: string, query: string): number {
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 60;
  const words = q.split(" ").filter(Boolean);
  const hits = words.filter((w) => t.includes(w)).length;
  if (hits > 0) return (hits / words.length) * 40;
  return 0;
}

function scoreEntry(entry: SearchResult, query: string): number {
  return (
    simpleScore(entry.title, query) * 2 +
    simpleScore(entry.subtitle, query) +
    simpleScore(entry.description ?? "", query) * 0.5
  );
}

function matchesFaith(entry: SearchResult, faith: FilterFaith): boolean {
  if (faith === "All") return true;
  if (!entry.faith) return true;
  return entry.faith.toLowerCase().includes(faith.toLowerCase());
}

const RECENT_SEARCH_KEY = "sc-recent-searches";
const MAX_RECENT = 8;

function loadRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_SEARCH_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string) {
  if (!query.trim() || query.length < 2) return;
  try {
    const prev = loadRecentSearches();
    const updated = [query, ...prev.filter((s) => s !== query)].slice(
      0,
      MAX_RECENT,
    );
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
  } catch {}
}

export function useUnifiedSearch() {
  const [rawQuery, setRawQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [faithFilter, setFaithFilter] = useState<FilterFaith>("All");
  const [recentSearches, setRecentSearches] =
    useState<string[]>(loadRecentSearches);
  const [allData, setAllData] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(rawQuery), 300);
    return () => clearTimeout(timer);
  }, [rawQuery]);

  // Lazy-load all search data
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    async function loadData() {
      const entries: SearchResult[] = [];

      // Aarti — uses AartiItem: { id, titleEn, titleHi, deity, faith }
      try {
        const mod = await import("../data/aartiData");
        const arr = (mod.SEED_AARTIS ?? []) as Array<{
          id: string;
          titleEn: string;
          titleHi: string;
          deity: string;
          faith: string;
        }>;
        for (const a of arr) {
          entries.push({
            id: `aarti-${a.id}`,
            title: `${a.titleEn} / ${a.titleHi}`,
            subtitle: a.deity ?? "",
            type: "Aarti",
            path: "/aarti",
            faith: a.faith,
            deity: a.deity,
          });
        }
      } catch {}

      // Chalisa — uses ChalisaItem: { id, titleEn, titleHi, deity, description }
      try {
        const mod = await import("../data/chalisaData");
        const arr = (mod.SEED_CHALISAS ?? []) as Array<{
          id: string;
          titleEn: string;
          titleHi: string;
          deity: string;
          description?: string;
          faith?: string;
        }>;
        for (const c of arr) {
          entries.push({
            id: `chalisa-${c.id}`,
            title: `${c.titleEn} / ${c.titleHi}`,
            subtitle: c.deity ?? "",
            description: c.description,
            type: "Chalisa",
            path: "/chalisa",
            faith: c.faith ?? "Hindu",
            deity: c.deity,
          });
        }
      } catch {}

      // Mantra — uses MantraItem
      try {
        const mod = await import("../data/mantraData");
        const arr = (mod.SEED_MANTRAS ?? []) as Array<{
          id: string;
          titleEn?: string;
          titleHi?: string;
          title?: string;
          deity?: string;
          description?: string;
          faith?: string;
        }>;
        for (const m of arr) {
          const title =
            m.title ?? `${m.titleEn ?? ""} ${m.titleHi ?? ""}`.trim();
          entries.push({
            id: `mantra-${m.id}`,
            title,
            subtitle: m.deity ?? "",
            description: m.description,
            type: "Mantra",
            path: "/mantra",
            faith: m.faith ?? "Hindu",
            deity: m.deity,
          });
        }
      } catch {}

      // Stotra — uses Stotra: { id, title, deity, faith, description }
      try {
        const mod = await import("../data/stotraData");
        const arr = (mod.stotraData ?? []) as Array<{
          id: string;
          title: string;
          deity: string;
          faith: string;
          description?: string;
        }>;
        for (const s of arr) {
          entries.push({
            id: `stotra-${s.id}`,
            title: s.title,
            subtitle: s.deity ?? "",
            description: s.description,
            type: "Stotra",
            path: "/stotra",
            faith: s.faith,
            deity: s.deity,
          });
        }
      } catch {}

      // Kavach
      try {
        const modA = await import("../data/kavachDataA");
        const modB = await import("../data/kavachDataB");
        const arr = [
          ...(modA.kavachDataA ?? []),
          ...(modB.kavachDataB ?? []),
        ] as Array<{
          id: string;
          name: string;
          deity: string;
          faith: string;
          benefits?: string;
        }>;
        for (const k of arr) {
          entries.push({
            id: `kavach-${k.id}`,
            title: k.name,
            subtitle: k.deity ?? "",
            description: k.benefits,
            type: "Kavach",
            path: "/kavach",
            faith: k.faith,
            deity: k.deity,
          });
        }
      } catch {}

      // Ashtakam
      try {
        const modA = await import("../data/ashtakamDataA");
        const modB = await import("../data/ashtakamDataB");
        const modC = await import("../data/ashtakamDataC");
        const arr = [
          ...(modA.ashtakamDataA ?? []),
          ...(modB.ashtakamDataB ?? []),
          ...(modC.ashtakamDataC ?? []),
        ] as Array<{
          id: string;
          name: string;
          deity: string;
          benefits?: string;
        }>;
        for (const a of arr) {
          entries.push({
            id: `ashtakam-${a.id}`,
            title: a.name,
            subtitle: a.deity ?? "",
            description: a.benefits,
            type: "Ashtakam",
            path: "/ashtakam",
            faith: "Hindu",
            deity: a.deity,
          });
        }
      } catch {}

      // Stuti
      try {
        const mod = await import("../data/stutiData");
        const arr = (mod.stutiData ?? []) as Array<{
          id: string;
          name: string;
          deity: string;
          faith?: string;
          benefits?: string;
        }>;
        for (const s of arr) {
          entries.push({
            id: `stuti-${s.id}`,
            title: s.name,
            subtitle: s.deity ?? "",
            description: s.benefits,
            type: "Stuti",
            path: "/stuti",
            faith: s.faith ?? "Hindu",
            deity: s.deity,
          });
        }
      } catch {}

      // Sahasranama
      try {
        const mod = await import("../data/sahasranamaData");
        const arr = (mod.sahasranamaData ?? []) as Array<{
          id: string;
          title: string;
          deity: string;
          faith: string;
          description?: string;
        }>;
        for (const s of arr) {
          entries.push({
            id: `sahasranam-${s.id}`,
            title: s.title,
            subtitle: s.deity ?? "",
            description: s.description,
            type: "Sahasranama",
            path: "/sahasranam",
            faith: s.faith,
            deity: s.deity,
          });
        }
      } catch {}

      // Bhajan — uses BhajanEntry: { id, title, deity, artist }
      try {
        const mod = await import("../data/bhajanData");
        const arr = (mod.MOCK_BHAJANS ?? []) as Array<{
          id: string;
          title: string;
          deity: string;
          artist: string;
        }>;
        for (const b of arr) {
          entries.push({
            id: `bhajan-${b.id}`,
            title: b.title,
            subtitle: b.artist ?? "",
            type: "Bhajan",
            path: "/bhajan-library",
            faith: "Hindu",
            deity: b.deity,
          });
        }
      } catch {}

      if (!cancelled) {
        setAllData(entries);
        setIsLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo<Record<ContentType, SearchResult[]>>(() => {
    const empty: Record<ContentType, SearchResult[]> = {
      Aarti: [],
      Chalisa: [],
      Mantra: [],
      Stotra: [],
      Kavach: [],
      Ashtakam: [],
      Stuti: [],
      Sahasranama: [],
      Bhajan: [],
      Suktam: [],
      VratKatha: [],
      Temple: [],
      Blog: [],
    };

    if (!debouncedQuery.trim() || debouncedQuery.length < 2) return empty;

    const scored = allData
      .filter((e) => matchesFaith(e, faithFilter))
      .map((e) => ({ entry: e, score: scoreEntry(e, debouncedQuery) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    const grouped = { ...empty };
    for (const { entry } of scored) {
      if (grouped[entry.type].length < 10) {
        grouped[entry.type].push(entry);
      }
    }
    return grouped;
  }, [debouncedQuery, allData, faithFilter]);

  const totalCount = useMemo(
    () => Object.values(results).reduce((sum, arr) => sum + arr.length, 0),
    [results],
  );

  const handleSearch = useCallback((q: string) => {
    setRawQuery(q);
  }, []);

  const commitSearch = useCallback((q: string) => {
    if (q.trim().length >= 2) saveRecentSearch(q.trim());
    setRecentSearches(loadRecentSearches());
  }, []);

  const clearRecent = useCallback(() => {
    try {
      localStorage.removeItem(RECENT_SEARCH_KEY);
    } catch {}
    setRecentSearches([]);
  }, []);

  return {
    query: rawQuery,
    setQuery: handleSearch,
    commitSearch,
    faithFilter,
    setFaithFilter,
    results,
    totalCount,
    isLoading,
    recentSearches,
    clearRecent,
    hasQuery: debouncedQuery.trim().length >= 2,
  };
}
