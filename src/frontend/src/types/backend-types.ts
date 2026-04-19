// Local type definitions mirroring backend Motoko types
// These match the public types defined in src/backend/main.mo

import type { Principal } from "@icp-sdk/core/principal";

export interface UserProfile {
  name: string;
  email: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  gotra: string;
  createdAt: bigint;
}

export interface Temple {
  id: string;
  name: string;
  location: string;
  deity: string;
  description: string;
  createdAt: bigint;
}

export interface PujaBooking {
  id: string;
  userId: Principal;
  templeId: string;
  devoteeName: string;
  gotra: string;
  pujaType: string;
  preferredDate: string;
  specialWishes: string;
  status: string;
  createdAt: bigint;
}

export interface ChadhavaOffering {
  id: string;
  userId: Principal;
  templeId: string;
  items: string[];
  status: string;
  createdAt: bigint;
}

export interface PrasadDeliveryRequest {
  id: string;
  userId: Principal;
  templeId: string;
  address: string;
  mobileNumber: string;
  status: string;
  createdAt: bigint;
}

export interface AstrologerProfile {
  id: string;
  name: string;
  specializations: string[];
  bio: string;
  experienceYears: bigint;
  rating: number;
  perMinuteRate: number;
  languages: string[];
  createdAt: bigint;
}

export interface ConsultationAppointment {
  id: string;
  userId: Principal;
  astrologerId: string;
  preferredDateTime: string;
  topic: string;
  specialQuestions: string;
  status: string;
  notes: string;
  createdAt: bigint;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  benefits: string;
  astrologicalPurpose: string;
  stock: bigint;
  createdAt: bigint;
}

export interface OrderItem {
  productId: string;
  quantity: bigint;
  unitPrice: number;
}

export interface Order {
  id: string;
  userId: Principal;
  items: OrderItem[];
  total: number;
  paymentStatus: string;
  stripePaymentIntentId: string;
  createdAt: bigint;
}

export interface WalletTransaction {
  id: string;
  userId: Principal;
  amount: number;
  transactionType: string;
  description: string;
  createdAt: bigint;
}

export interface ReportRequest {
  id: string;
  userId: Principal;
  reportType: string;
  name: string;
  dob: string;
  tob: string;
  pob: string;
  status: string;
  content: string;
  createdAt: bigint;
}

export interface DevotionalContent {
  id: string;
  title: string;
  deity: string;
  contentType: string;
  lyrics: string;
  language: string;
  createdAt: bigint;
}

export interface VirtualTempleConfig {
  userId: Principal;
  deity: string;
  decorStyle: string;
  background: string;
  items: string[];
  updatedAt: bigint;
}

export interface NumerologyRecord {
  id: string;
  userId: Principal;
  name: string;
  dob: string;
  result: string;
  createdAt: bigint;
}

export interface BusinessNameRecord {
  id: string;
  userId: Principal;
  businessName: string;
  result: string;
  createdAt: bigint;
}

export interface BhajanEntry {
  id: string;
  title: string;
  deity: string;
  artist: string;
  lyricsText: string;
  audioBase64: string;
  createdAt: bigint;
}

export interface VratKathaEntry {
  id: string;
  title: string;
  festivalName: string;
  storyText: string;
  audioBase64: string;
  createdAt: bigint;
}

export interface HolyBookEntry {
  id: string;
  bookTitle: string;
  chapterTitle: string;
  shlokaText: string;
  audioBase64: string;
  bookCategory: string;
  trackNumber: bigint;
  createdAt: bigint;
}

export interface ShoppingItem {
  name: string;
  price: number;
  quantity: bigint;
}

export interface StripeConfiguration {
  secretKey: string;
  allowedCountries: string[];
}

// ── Palmistry Reading Types ───────────────────────────────────────────────────

export interface PalmistryContent {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  lineOrPalmType: string;
  descriptionEn: string;
  descriptionHi: string;
  characteristicsEn: string;
  characteristicsHi: string;
  locationOnPalm: string;
  benefitsEn: string;
  benefitsHi: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface PalmistryReading {
  id: string;
  userId: string;
  imageUrl: string;
  handType: string;
  lifeLine: string;
  headLine: string;
  heartLine: string;
  fateLine: string;
  traits: string[];
  summary: string;
  luckyNumbers: string[];
  gemstone: string;
  mantra: string;
  readingDate: bigint;
}

// ── Kundali Matching Types ────────────────────────────────────────────────────

export interface KundaliMatchInput {
  personAName: string;
  personBName: string;
  personADob: string;
  personBDob: string;
  totalScore: number;
  compatibilityPct: number;
  savedAt: bigint;
}

export interface KundaliMatch {
  id: string;
  personAName: string;
  personBName: string;
  personADob: string;
  personBDob: string;
  totalScore: number;
  compatibilityPct: number;
  savedAt: bigint;
}

// ── Calculator FAQ Types ───────────────────────────────────────────────────────

export interface CalculatorFAQQAPair {
  question: string;
  answer: string;
  questionHindi: string;
  answerHindi: string;
  category: "how-it-works" | "interpretations" | "remedies" | "general";
}

export interface CalculatorFAQ {
  id: string;
  calculatorId: string;
  calculatorName: string;
  qaPairs: CalculatorFAQQAPair[];
  updatedAt: bigint;
}

// ── Puja Type (Frontend-only, stored in data file) ────────────────────────────

export interface PujaType {
  id: string;
  name: string;
  nameHindi: string;
  category: string;
  deity: string;
  deityHindi: string;
  description: string;
  descriptionHindi: string;
  vidhi: string[];
  vidhiHindi: string[];
  samagri: string[];
  samagriHindi: string[];
  duration: string;
  benefits: string[];
  benefitsHindi: string[];
  when: string;
  whenHindi: string;
  imageEmoji: string;
}

// ── Suktam Entry (Frontend-only, stored in data file) ────────────────────────

export interface SuktamEntry {
  id: string;
  name: string;
  nameHindi: string;
  deity: string;
  deityHindi: string;
  vedaSource: string;
  shortDescription: string;
  benefits: string;
  transliteration: string;
  totalMantras: number;
}

// ── Puja Report Types ─────────────────────────────────────────────────────────

export interface DaanItem {
  item: string;
  quantity: string;
  value: string;
}

export interface PujaReport {
  id: string;
  userId: string;
  userName: string;
  pujaType: string;
  deity: string;
  intention: string;
  datePerformed: string;
  priestName: string;
  duration: string;
  daanItems: DaanItem[];
  completionNotes: string;
  status: "Pending" | "Completed" | "Verified";
  createdAt: bigint;
}

// ── Blog Article Type ─────────────────────────────────────────────────────────

export interface BlogArticle {
  id: string;
  title: string;
  titleHindi: string;
  content: string;
  contentHindi: string;
  category:
    | "spiritual-articles"
    | "puja-guides"
    | "astrology-tips"
    | "festival-guides"
    | "health-spirituality";
  author: string;
  tags: string[];
  featuredImageUrl: string;
  publishDate: string;
  isPublished: boolean;
  slug: string;
  excerpt: string;
  excerptHindi: string;
  createdAt: number;
  updatedAt: number;
}

// ── Service Booking Type ──────────────────────────────────────────────────────

export interface ServiceBooking {
  id: string;
  userId: string;
  serviceType: string;
  serviceName: string;
  devoteeName: string;
  email: string;
  phone: string;
  preferredDate: string;
  location: string;
  specialRequests: string;
  pricing: number;
  status: "pending" | "confirmed" | "completed";
  createdAt: bigint;
}

// ── Web Story Types ────────────────────────────────────────────────────────────

export interface StorySlide {
  id: string;
  imageUrl: string;
  bgColor: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
}

export interface WebStory {
  id: string;
  title: string;
  titleHindi: string;
  category: "festivals" | "deities" | "mantras" | "vrat";
  thumbnail: string;
  bgColor: string;
  isPublished: boolean;
  slides: StorySlide[];
  createdAt: number;
  updatedAt: number;
}

// ── Vastu Room Check Type (localStorage-backed) ───────────────────────────────

export interface VastuRoomCheck {
  id: string;
  userId: string;
  floorPlanUrl: string;
  roomType: string;
  roomDimensions: string;
  entranceDirection: string;
  complianceScore: number | bigint;
  issuesJson: string;
  remediesJson: string;
  elementBalance: string;
  createdAt: bigint;
}

export interface VastuContent {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  directionOrRoom: string;
  planetaryRuler: string;
  planetaryRulerHi: string;
  effectsEn: string;
  effectsHi: string;
  doshaEn: string;
  doshaHi: string;
  remediesEn: string;
  remediesHi: string;
  yantra: string;
  elementsInvolved: string;
  tipsEn: string;
  tipsHi: string;
  createdAt: bigint;
  updatedAt: bigint;
}
