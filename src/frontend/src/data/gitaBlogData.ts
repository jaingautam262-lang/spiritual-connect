// Krishna's Wisdom Blog — 14 articles with Gita-themed categories
// Categories: bhagavad-gita | relationships | career | peace | marriage | spirituality | meditation

export type GitaBlogCategory =
  | "bhagavad-gita"
  | "relationships"
  | "career"
  | "peace"
  | "marriage"
  | "spirituality"
  | "meditation";

export interface GitaBlogArticle {
  id: string;
  slug: string;
  title: string;
  titleHi: string;
  excerpt: string;
  category: GitaBlogCategory;
  author: string;
  tags: string[];
  publishDate: string;
  readTime: number;
  featuredEmoji: string;
  isPopular?: boolean;
}

export const GITA_BLOG_CATEGORY_META: Record<
  GitaBlogCategory,
  { nameEn: string; nameHi: string; emoji: string; count: number }
> = {
  "bhagavad-gita": {
    nameEn: "Bhagavad Gita",
    nameHi: "भगवद्गीता",
    emoji: "📚",
    count: 5,
  },
  relationships: {
    nameEn: "Relationships",
    nameHi: "रिश्ते",
    emoji: "💕",
    count: 1,
  },
  career: { nameEn: "Career", nameHi: "करियर", emoji: "💼", count: 2 },
  peace: { nameEn: "Peace", nameHi: "शांति", emoji: "☮️", count: 3 },
  marriage: { nameEn: "Marriage", nameHi: "विवाह", emoji: "💍", count: 1 },
  spirituality: {
    nameEn: "Spirituality",
    nameHi: "आध्यात्म",
    emoji: "🌀",
    count: 2,
  },
  meditation: { nameEn: "Meditation", nameHi: "ध्यान", emoji: "🧘", count: 1 },
};

export const gitaBlogArticles: GitaBlogArticle[] = [
  {
    id: "gb-001",
    slug: "bhagavad-gita-overcoming-fear",
    title: "What the Bhagavad Gita Teaches About Overcoming Fear",
    titleHi: "भगवद्गीता के अनुसार भय का सामना कैसे करें",
    excerpt:
      "Arjuna stood paralyzed on the battlefield, overwhelmed by fear and doubt. Krishna's response in Chapter 2 offers a timeless framework for conquering the fears that hold us back in life.",
    category: "bhagavad-gita",
    author: "Spiritual Connect",
    tags: ["Fear", "Chapter 2", "Courage", "Arjuna"],
    publishDate: "2026-04-10",
    readTime: 5,
    featuredEmoji: "📚",
    isPopular: true,
  },
  {
    id: "gb-002",
    slug: "krishna-life-purpose-swadharma",
    title: "Krishna's Advice on Finding Your Life Purpose",
    titleHi: "कृष्ण की जीवन उद्देश्य खोजने की सलाह",
    excerpt:
      "Feeling lost in your career? Krishna's teaching on Swadharma in Chapter 3 of the Gita offers a surprisingly practical framework for discovering what you're truly meant to do.",
    category: "career",
    author: "Spiritual Connect",
    tags: ["Swadharma", "Chapter 3", "Career", "Purpose"],
    publishDate: "2026-04-07",
    readTime: 5,
    featuredEmoji: "🎯",
    isPopular: true,
  },
  {
    id: "gb-003",
    slug: "krishna-relationship-struggles",
    title: "How Krishna Guides Us Through Relationship Struggles",
    titleHi: "रिश्तों की कठिनाइयों में कृष्ण की राह",
    excerpt:
      "From the divine love of Radha and Krishna to the practical wisdom of the Gita, discover how Krishna's teachings can transform the way you navigate relationships.",
    category: "relationships",
    author: "Spiritual Connect",
    tags: ["Radha Krishna", "Love", "Relationships", "Detachment"],
    publishDate: "2026-04-04",
    readTime: 5,
    featuredEmoji: "💕",
  },
  {
    id: "gb-004",
    slug: "inner-peace-bhagavad-gita",
    title: "Finding Inner Peace: Lessons from the Bhagavad Gita",
    titleHi: "भगवद्गीता से आंतरिक शांति की सीख",
    excerpt:
      "Chapter 6 of the Gita is a masterclass on meditation and inner stillness. Here's how Krishna's ancient teachings on Dhyana Yoga can help you find peace in a noisy world.",
    category: "peace",
    author: "Spiritual Connect",
    tags: ["Peace", "Chapter 6", "Dhyana Yoga", "Meditation"],
    publishDate: "2026-03-30",
    readTime: 5,
    featuredEmoji: "☮️",
  },
  {
    id: "gb-005",
    slug: "krishna-marriage-divine-wisdom",
    title: "Krishna on Marriage: Divine Wisdom for Modern Couples",
    titleHi: "विवाह पर कृष्ण की दिव्य शिक्षा",
    excerpt:
      "The marriage of Rukmini and Krishna offers a beautiful model for modern partnerships — one built on dharma, mutual respect, and conscious choice. Here's what we can learn.",
    category: "marriage",
    author: "Spiritual Connect",
    tags: ["Rukmini", "Krishna", "Marriage", "Dharma"],
    publishDate: "2026-03-25",
    readTime: 5,
    featuredEmoji: "💍",
  },
  {
    id: "gb-006",
    slug: "understanding-karma-krishna",
    title: "Understanding Karma: What Krishna Really Taught",
    titleHi: "कर्म को समझना: कृष्ण ने वास्तव में क्या सिखाया",
    excerpt:
      "Karma is one of the most misunderstood concepts in spirituality. Krishna's teaching in Chapter 3 of the Gita reveals a far more nuanced and empowering truth than 'what goes around comes around.'",
    category: "bhagavad-gita",
    author: "Spiritual Connect",
    tags: ["Karma", "Chapter 3", "Karma Yoga", "Action"],
    publishDate: "2026-03-20",
    readTime: 5,
    featuredEmoji: "🔄",
  },
  {
    id: "gb-007",
    slug: "dealing-with-anger-krishna",
    title: "Dealing with Anger: Krishna's Timeless Wisdom",
    titleHi: "क्रोध से निपटना: कृष्ण की शाश्वत शिक्षा",
    excerpt:
      "In just two verses of the Gita, Krishna maps the entire chain from desire to destruction. Understanding this chain is the first step to mastering your anger.",
    category: "peace",
    author: "Spiritual Connect",
    tags: ["Anger", "Krodha", "Chapter 2", "Self-Control"],
    publishDate: "2026-03-15",
    readTime: 5,
    featuredEmoji: "🔥",
  },
  {
    id: "gb-008",
    slug: "krishna-modern-anxiety",
    title: "What Would Krishna Say About Modern Anxiety?",
    titleHi: "आधुनिक चिंता पर कृष्ण क्या कहते?",
    excerpt:
      "Anxiety disorders affect millions worldwide. While Krishna never used the word 'anxiety,' His teachings on surrender, present-moment awareness, and trust offer a profound complement to modern approaches.",
    category: "peace",
    author: "Spiritual Connect",
    tags: ["Anxiety", "Surrender", "Present Moment", "Chapter 2"],
    publishDate: "2026-03-10",
    readTime: 6,
    featuredEmoji: "🧘",
  },
  {
    id: "gb-009",
    slug: "bhagavad-gita-quotes-students",
    title: "15 Bhagavad Gita Quotes Every Student Needs to Hear",
    titleHi: "हर छात्र के लिए ज़रूरी गीता के 15 श्लोक",
    excerpt:
      "Exam stress, career confusion, comparison anxiety — students face immense pressure today. These 15 Gita quotes from Krishna offer wisdom that no textbook teaches.",
    category: "bhagavad-gita",
    author: "Spiritual Connect",
    tags: ["Students", "Exam", "Quotes", "Inspiration"],
    publishDate: "2026-04-12",
    readTime: 7,
    featuredEmoji: "📜",
    isPopular: true,
  },
  {
    id: "gb-010",
    slug: "how-to-read-bhagavad-gita-beginners",
    title:
      "How to Start Reading the Bhagavad Gita: A Beginner's Complete Guide",
    titleHi: "गीता पढ़ना कैसे शुरू करें: शुरुआती लोगों के लिए मार्गदर्शिका",
    excerpt:
      "Curious about the Gita but don't know where to start? This practical guide tells you exactly which chapter to read first, which translation to pick, and how to apply the teachings to your daily life.",
    category: "spirituality",
    author: "Spiritual Connect",
    tags: ["Beginners", "Guide", "Reading", "Translation"],
    publishDate: "2026-04-11",
    readTime: 6,
    featuredEmoji: "🌀",
  },
  {
    id: "gb-011",
    slug: "krishna-teachings-working-professionals",
    title: "5 Krishna Teachings Every Working Professional Needs",
    titleHi: "हर कार्यरत व्यक्ति को ज़रूरी कृष्ण की 5 शिक्षाएं",
    excerpt:
      "Burnout, toxic bosses, office politics, work-life balance — the modern workplace is a battlefield. Here are 5 teachings from Krishna that will transform how you approach your career.",
    category: "career",
    author: "Spiritual Connect",
    tags: ["Career", "Burnout", "Workplace", "Karma Yoga"],
    publishDate: "2026-04-09",
    readTime: 6,
    featuredEmoji: "💼",
  },
  {
    id: "gb-012",
    slug: "bhagavad-gita-meditation-chapter-6",
    title: "Bhagavad Gita Meditation: Krishna's Step-by-Step Guide (Chapter 6)",
    titleHi: "गीता ध्यान: कृष्ण की चरणदर अध्याय 6 में विधि",
    excerpt:
      "The Bhagavad Gita Chapter 6 contains one of the oldest and most detailed meditation guides ever written. Here's Krishna's exact technique, modernized for today.",
    category: "meditation",
    author: "Spiritual Connect",
    tags: ["Meditation", "Chapter 6", "Dhyana", "Technique"],
    publishDate: "2026-04-08",
    readTime: 7,
    featuredEmoji: "🧘",
    isPopular: true,
  },
  {
    id: "gb-013",
    slug: "krishna-told-arjuna-to-fight",
    title:
      "Why Did Krishna Tell Arjuna to Fight? The Real Meaning Behind the War",
    titleHi: "कृष्ण ने अर्जुन को युद्ध करने क्यों कहा? युद्ध के पीछे का सच्चा अर्थ",
    excerpt:
      "The Bhagavad Gita is set on a battlefield. Krishna tells Arjuna to fight. But this is not a glorification of war — it is the most profound teaching on duty, courage, and standing up for what is right.",
    category: "bhagavad-gita",
    author: "Spiritual Connect",
    tags: ["Kurukshetra", "Dharma", "Duty", "Courage"],
    publishDate: "2026-04-06",
    readTime: 6,
    featuredEmoji: "⚔️",
  },
  {
    id: "gb-014",
    slug: "hare-krishna-mantra-guide",
    title:
      "Hare Krishna Mantra: Complete Guide to Meaning, Benefits & How to Chant",
    titleHi: "हरे कृष्ण महामंत्र: अर्थ, लाभ और जाप विधिका संपूर्ण गाइड",
    excerpt:
      "The Hare Krishna Maha Mantra is the most recommended mantra for the current age. Here's everything you need to know — its meaning, history, scientific benefits, and a step-by-step guide to chanting.",
    category: "spirituality",
    author: "Spiritual Connect",
    tags: ["Hare Krishna", "Mantra", "Chanting", "Benefits"],
    publishDate: "2026-04-05",
    readTime: 7,
    featuredEmoji: "📣",
  },
];
