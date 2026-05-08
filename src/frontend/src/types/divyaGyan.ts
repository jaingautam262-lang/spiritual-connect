export interface DivyaGyanSection {
  heading?: string;
  text: string;
  type: "intro" | "section" | "list" | "quote" | "conclusion";
}

export interface DivyaGyanArticle {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: string;
  tags: string[];
  summary: string;
  content: DivyaGyanSection[];
  readTime: number;
  publishDate: string;
  audioUrl?: string;
}
