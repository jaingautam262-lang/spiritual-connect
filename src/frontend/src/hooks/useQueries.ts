import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { PujaEvent, SankalpInput } from "../types/backend-types";
import type {
  AstrologerProfile,
  BhajanEntry,
  BlogArticle,
  BusinessNameRecord,
  CalculatorFAQ,
  ChadhavaOffering,
  ConsultationAppointment,
  DevotionalContent,
  HolyBookEntry,
  KundaliMatch,
  KundaliMatchInput,
  NewsletterSubscription,
  NumerologyRecord,
  Order,
  PalmistryContent,
  PalmistryReading,
  PrasadDeliveryRequest,
  Product,
  PujaBooking,
  PujaReport,
  ReportRequest,
  ServiceBooking,
  ShoppingItem,
  StripeConfiguration,
  SuktamEntry,
  Temple,
  UserProfile,
  VastuContent,
  VastuRoomCheck,
  VirtualTempleConfig,
  VratKathaEntry,
  WalletTransaction,
  WebStory,
} from "../types/backend-types";

// Actor interface matching backend methods
interface BackendActor {
  getCallerUserProfile(): Promise<UserProfile | null>;
  saveCallerUserProfile(profile: UserProfile): Promise<void>;
  getUserProfile(user: Principal): Promise<UserProfile | null>;
  getAllUserProfiles(): Promise<[Principal, UserProfile][]>;
  createTemple(temple: Temple): Promise<void>;
  getAllTemples(): Promise<Temple[]>;
  createPujaBooking(booking: PujaBooking): Promise<void>;
  getUserPujaBookings(userId: Principal): Promise<PujaBooking[]>;
  handlePujaBooking(bookingId: string, status: string): Promise<void>;
  createChadhavaOffering(offering: ChadhavaOffering): Promise<void>;
  getUserChadhavaOfferings(userId: Principal): Promise<ChadhavaOffering[]>;
  addUserPrasadDeliveryRequest(request: PrasadDeliveryRequest): Promise<void>;
  getUserPrasadDeliveryRequests(
    userId: Principal,
  ): Promise<PrasadDeliveryRequest[]>;
  updatePrasadDeliveryStatus(id: string, status: string): Promise<void>;
  getPendingPrasadDeliveries(): Promise<PrasadDeliveryRequest[]>;
  getAllDeliveryRequests(): Promise<
    [[string, PrasadDeliveryRequest][], [string, PujaBooking][]]
  >;
  createAstrologerProfile(profile: AstrologerProfile): Promise<void>;
  getAllAstrologerProfiles(): Promise<AstrologerProfile[]>;
  getAstrologerProfile(id: string): Promise<AstrologerProfile | null>;
  createConsultationAppointment(
    appointment: ConsultationAppointment,
  ): Promise<void>;
  getUserConsultationAppointments(
    userId: Principal,
  ): Promise<ConsultationAppointment[]>;
  getAllConsultationAppointments(): Promise<ConsultationAppointment[]>;
  updateConsultationAppointment(
    id: string,
    status: string,
    notes: string,
  ): Promise<void>;
  createProduct(product: Product): Promise<void>;
  updateProduct(product: Product): Promise<void>;
  deleteProduct(id: string): Promise<void>;
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | null>;
  createOrder(order: Order): Promise<void>;
  getUserOrders(userId: Principal): Promise<Order[]>;
  updateOrderPaymentStatus(
    id: string,
    paymentStatus: string,
    stripePaymentIntentId: string,
  ): Promise<void>;
  getWalletBalance(userId: Principal): Promise<number>;
  rechargeWallet(
    userId: Principal,
    amount: number,
    transaction: WalletTransaction,
  ): Promise<void>;
  getWalletTransactions(userId: Principal): Promise<WalletTransaction[]>;
  createReportRequest(request: ReportRequest): Promise<void>;
  getUserReportRequests(userId: Principal): Promise<ReportRequest[]>;
  updateReportRequest(
    id: string,
    status: string,
    content: string,
  ): Promise<void>;
  createDevotionalContent(content: DevotionalContent): Promise<void>;
  updateDevotionalContent(content: DevotionalContent): Promise<void>;
  deleteDevotionalContent(id: string): Promise<void>;
  getAllDevotionalContents(): Promise<DevotionalContent[]>;
  getDevotionalContent(id: string): Promise<DevotionalContent | null>;
  saveVirtualTempleConfig(config: VirtualTempleConfig): Promise<void>;
  getVirtualTempleConfig(
    userId: Principal,
  ): Promise<VirtualTempleConfig | null>;
  createNumerologyRecord(record: NumerologyRecord): Promise<void>;
  getUserNumerologyRecords(userId: Principal): Promise<NumerologyRecord[]>;
  createBusinessNameRecord(record: BusinessNameRecord): Promise<void>;
  getUserBusinessNameRecords(userId: Principal): Promise<BusinessNameRecord[]>;
  getBhajans(): Promise<BhajanEntry[]>;
  getBhajanById(id: string): Promise<BhajanEntry | null>;
  addBhajan(entry: BhajanEntry): Promise<void>;
  updateBhajan(entry: BhajanEntry): Promise<void>;
  deleteBhajan(id: string): Promise<void>;
  getVratKathas(): Promise<VratKathaEntry[]>;
  getVratKathaById(id: string): Promise<VratKathaEntry | null>;
  addVratKatha(entry: VratKathaEntry): Promise<void>;
  updateVratKatha(entry: VratKathaEntry): Promise<void>;
  deleteVratKatha(id: string): Promise<void>;
  getHolyBookEntries(bookTitle: string): Promise<HolyBookEntry[]>;
  getHolyBookEntryById(id: string): Promise<HolyBookEntry | null>;
  addHolyBookEntry(entry: HolyBookEntry): Promise<void>;
  updateHolyBookEntry(entry: HolyBookEntry): Promise<void>;
  deleteHolyBookEntry(id: string): Promise<void>;
  isStripeConfigured(): Promise<boolean>;
  setStripeConfiguration(config: StripeConfiguration): Promise<void>;
  getStripeSessionStatus(
    sessionId: string,
  ): Promise<{ status: string; paymentStatus: string; customerEmail: string }>;
  createCheckoutSession(
    items: ShoppingItem[],
    successUrl: string,
    cancelUrl: string,
  ): Promise<string>;
  isCallerAdmin(): Promise<boolean>;
  savePalmistryReading(reading: PalmistryReading): Promise<void>;
  getUserPalmistryReadings(): Promise<PalmistryReading[]>;
  getPalmistryContents(): Promise<PalmistryContent[]>;
  getPalmistryContent(id: string): Promise<PalmistryContent | null>;
  createPalmistryContent(
    title: string,
    titleHi: string,
    category: string,
    lineOrPalmType: string,
    descriptionEn: string,
    descriptionHi: string,
    characteristicsEn: string,
    characteristicsHi: string,
    locationOnPalm: string,
    benefitsEn: string,
    benefitsHi: string,
  ): Promise<PalmistryContent>;
  deletePalmistryContent(id: string): Promise<boolean>;
  saveKundaliMatch(input: KundaliMatchInput): Promise<string>;
  getKundaliMatches(): Promise<KundaliMatch[]>;
  deleteKundaliMatch(id: string): Promise<void>;
  getVastuContents(): Promise<VastuContent[]>;
  getVastuContent(id: string): Promise<VastuContent | null>;
  createVastuContent(
    title: string,
    titleHi: string,
    category: string,
    directionOrRoom: string,
    planetaryRuler: string,
    planetaryRulerHi: string,
    effectsEn: string,
    effectsHi: string,
    doshaEn: string,
    doshaHi: string,
    remediesEn: string,
    remediesHi: string,
    yantra: string,
    elementsInvolved: string,
    tipsEn: string,
    tipsHi: string,
  ): Promise<VastuContent>;
  deleteVastuContent(id: string): Promise<boolean>;
  createCombinedVedicReading(
    palmReadingId: string,
    birthDate: string,
    birthTime: string,
    birthPlace: string,
    lagnaSign: string,
    moonSign: string,
    sunSign: string,
    activeDasha: string,
    doshasJson: string,
    palmInsightsJson: string,
    combinedInsightsText: string,
    remediesText: string,
  ): Promise<CombinedVedicReadingRecord>;
  getMyCombinedVedicReadings(): Promise<CombinedVedicReadingRecord[]>;
  getCombinedVedicReading(
    id: string,
  ): Promise<CombinedVedicReadingRecord | null>;
  deleteCombinedVedicReading(id: string): Promise<boolean>;
  addNewsletterSubscription(
    email: string,
    name: [] | [string],
    source: string,
  ): Promise<{ ok: NewsletterSubscription } | { err: string }>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  unsubscribeNewsletter(email: string): Promise<{ ok: null } | { err: string }>;
  createPujaEvent(
    pujaName: string,
    pujaNameHindi: string,
    date: string,
    time: string,
    description: string,
    price: bigint,
    slotsAvailable: bigint,
    location: string,
    deity: string,
    isActive: boolean,
  ): Promise<string>;
  updatePujaEvent(
    id: string,
    pujaName: string,
    pujaNameHindi: string,
    date: string,
    time: string,
    description: string,
    price: bigint,
    slotsAvailable: bigint,
    location: string,
    deity: string,
    isActive: boolean,
  ): Promise<boolean>;
  deletePujaEvent(id: string): Promise<boolean>;
  getAllPujaEvents(): Promise<PujaEvent[]>;
  getAllPujaEventsAdmin(): Promise<PujaEvent[]>;
  bookPujaEventSlot(
    sankalp: SankalpInput,
  ): Promise<{ ok: string } | { err: string }>;
  deleteNewsletterSubscription(
    email: string,
  ): Promise<{ ok: null } | { err: string }>;
}

// ─── Combined Vedic Reading type ─────────────────────────────────────────────

export interface CombinedVedicReadingRecord {
  id: string;
  userId: string;
  palmReadingId: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  lagnaSign: string;
  moonSign: string;
  sunSign: string;
  activeDasha: string;
  doshasJson: string;
  palmInsightsJson: string;
  combinedInsightsText: string;
  remediesText: string;
  createdAt: bigint;
}

function useBackendActor() {
  const result = useActor(createActor);
  return {
    actor: result.actor as unknown as BackendActor | null,
    isFetching: result.isFetching,
  };
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useBackendActor();
  const query = useQuery<UserProfile | null>({
    queryKey: ["callerUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerUserProfile"] });
    },
  });
}

// ─── Temples ──────────────────────────────────────────────────────────────────

export function useGetAllTemples() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Temple[]>({
    queryKey: ["temples"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTemples();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTemple() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (temple: Temple) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createTemple(temple);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["temples"] }),
  });
}

// ─── Puja Bookings ────────────────────────────────────────────────────────────

export function useCreatePujaBooking() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (booking: PujaBooking) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createPujaBooking(booking);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pujaBookings"] });
    },
  });
}

export function useGetUserPujaBookings(userId: Principal | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PujaBooking[]>({
    queryKey: ["pujaBookings", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getUserPujaBookings(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useHandlePujaBooking() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      bookingId,
      status,
    }: { bookingId: string; status: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.handlePujaBooking(bookingId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pujaBookings"] });
    },
  });
}

// ─── Puja Types (frontend-only, stored in local data) ─────────────────────────

export function useGetAllPujaTypes() {
  return useQuery({
    queryKey: ["pujaTypes"],
    queryFn: async () => {
      const { pujaTypesData } = await import("../data/pujaTypesData");
      return pujaTypesData;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useGetPujaTypeById(id: string) {
  return useQuery({
    queryKey: ["pujaType", id],
    queryFn: async () => {
      const { pujaTypesData } = await import("../data/pujaTypesData");
      return pujaTypesData.find((p) => p.id === id) ?? null;
    },
    enabled: !!id,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useCreatePujaType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_pujaType: unknown) => {
      await Promise.resolve();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pujaTypes"] }),
  });
}

export function useUpdatePujaType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_pujaType: unknown) => {
      await Promise.resolve();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pujaTypes"] }),
  });
}

export function useDeletePujaType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      await Promise.resolve();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pujaTypes"] }),
  });
}

// ─── Puja Reports (localStorage-backed) ──────────────────────────────────────

const REPORTS_STORAGE_KEY = "puja_reports_v1";

function loadReports(): PujaReport[] {
  try {
    return JSON.parse(localStorage.getItem(REPORTS_STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveReports(reports: PujaReport[]): void {
  localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
}

export function useGetUserPujaReports(userId: string) {
  return useQuery<PujaReport[]>({
    queryKey: ["pujaReports", userId],
    queryFn: async () => {
      const all = loadReports();
      return userId === "admin" ? all : all.filter((r) => r.userId === userId);
    },
    enabled: !!userId,
  });
}

export function useGetAllPujaReports() {
  return useQuery<PujaReport[]>({
    queryKey: ["allPujaReports"],
    queryFn: async () => loadReports(),
  });
}

export function useCreatePujaReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      report: Omit<PujaReport, "id" | "createdAt">,
    ): Promise<PujaReport> => {
      const newReport: PujaReport = {
        ...report,
        id: `PR-${Date.now().toString(36).toUpperCase()}`,
        createdAt: BigInt(Date.now()),
      };
      const existing = loadReports();
      saveReports([...existing, newReport]);
      return newReport;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pujaReports"] });
      queryClient.invalidateQueries({ queryKey: ["allPujaReports"] });
    },
  });
}

export function useUpdatePujaReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: string; status: PujaReport["status"] }) => {
      const existing = loadReports();
      const updated = existing.map((r) => (r.id === id ? { ...r, status } : r));
      saveReports(updated);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pujaReports"] });
      queryClient.invalidateQueries({ queryKey: ["allPujaReports"] });
    },
  });
}

// ─── Chadhava Offerings ───────────────────────────────────────────────────────

export function useCreateChadhavaOffering() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (offering: ChadhavaOffering) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createChadhavaOffering(offering);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chadhavaOfferings"] });
    },
  });
}

export function useGetUserChadhavaOfferings(userId: Principal | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ChadhavaOffering[]>({
    queryKey: ["chadhavaOfferings", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getUserChadhavaOfferings(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

// ─── Prasad Delivery ──────────────────────────────────────────────────────────

export function useAddPrasadDeliveryRequest() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: PrasadDeliveryRequest) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addUserPrasadDeliveryRequest(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prasadDeliveries"] });
    },
  });
}

// Alias for backward compatibility
export const useAddUserPrasadDeliveryRequest = useAddPrasadDeliveryRequest;

export function useGetUserPrasadDeliveries(userId: Principal | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PrasadDeliveryRequest[]>({
    queryKey: ["prasadDeliveries", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getUserPrasadDeliveryRequests(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

// Alias for backward compatibility
export const useGetUserPrasadDeliveryRequests = useGetUserPrasadDeliveries;

// ─── Astrologers ──────────────────────────────────────────────────────────────

export function useGetAllAstrologers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AstrologerProfile[]>({
    queryKey: ["astrologers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAstrologerProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

// Alias
export const useGetAllAstrologerProfiles = useGetAllAstrologers;

export function useGetAstrologerProfile(id: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AstrologerProfile | null>({
    queryKey: ["astrologer", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAstrologerProfile(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateAstrologerProfile() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: AstrologerProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createAstrologerProfile(profile);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["vastuContents"] }),
  });
}

// ─── Palm Photo Readings ──────────────────────────────────────────────────────

export interface PalmPhotoReadingRecord {
  id: string;
  userId: unknown;
  photoUrl: string;
  handType: string;
  palmShape: string;
  lineAnnotations: string;
  readingText: string;
  dominantLine: string;
  luckySigns: string;
  createdAt: bigint;
}

export function useCreatePalmPhotoReading() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      photoUrl: string;
      handType: string;
      palmShape: string;
      lineAnnotations: string;
      readingText: string;
      dominantLine: string;
      luckySigns: string;
    }): Promise<PalmPhotoReadingRecord> => {
      if (!actor) throw new Error("Actor not available");
      const actorWithPalmPhoto = actor as unknown as {
        createPalmPhotoReading(
          photoUrl: string,
          handType: string,
          palmShape: string,
          lineAnnotations: string,
          readingText: string,
          dominantLine: string,
          luckySigns: string,
        ): Promise<PalmPhotoReadingRecord>;
      };
      return actorWithPalmPhoto.createPalmPhotoReading(
        args.photoUrl,
        args.handType,
        args.palmShape,
        args.lineAnnotations,
        args.readingText,
        args.dominantLine,
        args.luckySigns,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["vastuContents"] }),
  });
}

// ─── Combined Vedic Readings ──────────────────────────────────────────────────

const COMBINED_VEDIC_KEY = "combined_vedic_readings_v1";

function loadCombinedVedicReadings(): CombinedVedicReadingRecord[] {
  try {
    return JSON.parse(localStorage.getItem(COMBINED_VEDIC_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveCombinedVedicReadings(
  records: CombinedVedicReadingRecord[],
): void {
  localStorage.setItem(COMBINED_VEDIC_KEY, JSON.stringify(records));
}

export function useCreateCombinedVedicReading() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      args: Omit<CombinedVedicReadingRecord, "id" | "userId" | "createdAt">,
    ): Promise<CombinedVedicReadingRecord> => {
      const newRecord: CombinedVedicReadingRecord = {
        ...args,
        id: `CVR-${Date.now().toString(36).toUpperCase()}`,
        userId: "local",
        createdAt: BigInt(Date.now() * 1_000_000),
      };
      const existing = loadCombinedVedicReadings();
      saveCombinedVedicReadings([newRecord, ...existing]);
      return newRecord;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["combinedVedicReadings"] });
    },
  });
}

export function useGetMyCombinedVedicReadings() {
  return useQuery<CombinedVedicReadingRecord[]>({
    queryKey: ["combinedVedicReadings"],
    queryFn: async () => loadCombinedVedicReadings(),
  });
}

export function useDeleteCombinedVedicReading() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<boolean> => {
      const existing = loadCombinedVedicReadings();
      const filtered = existing.filter((r) => r.id !== id);
      if (filtered.length === existing.length) return false;
      saveCombinedVedicReadings(filtered);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["combinedVedicReadings"] });
    },
  });
}

export function useGetMyPalmPhotoReadings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PalmPhotoReadingRecord[]>({
    queryKey: ["myPalmPhotoReadings"],
    queryFn: async () => {
      if (!actor) return [];
      const actorWithPalmPhoto = actor as unknown as {
        getMyPalmPhotoReadings(): Promise<PalmPhotoReadingRecord[]>;
      };
      return actorWithPalmPhoto.getMyPalmPhotoReadings();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Consultation Appointments ────────────────────────────────────────────────

export function useCreateConsultationAppointment() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (appointment: ConsultationAppointment) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createConsultationAppointment(appointment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

export function useGetUserAppointments(userId: Principal | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ConsultationAppointment[]>({
    queryKey: ["appointments", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getUserConsultationAppointments(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetAllAppointments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ConsultationAppointment[]>({
    queryKey: ["allAppointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllConsultationAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateConsultationAppointment() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      notes,
    }: { id: string; status: string; notes: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateConsultationAppointment(id, status, notes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

// ─── Products ─────────────────────────────────────────────────────────────────

export function useGetAllProducts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProduct(id: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateProduct() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createProduct(product);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProduct(product);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProduct(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export function useCreateOrder() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order: Order) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createOrder(order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useGetUserOrders(userId: Principal | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Order[]>({
    queryKey: ["orders", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getUserOrders(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

// ─── Wallet ───────────────────────────────────────────────────────────────────

export function useGetWalletBalance(userId: Principal | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<number>({
    queryKey: ["walletBalance", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return 0;
      return actor.getWalletBalance(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetWalletTransactions(userId: Principal | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<WalletTransaction[]>({
    queryKey: ["walletTransactions", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getWalletTransactions(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useRechargeWallet() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      amount,
      transaction,
    }: {
      userId: Principal;
      amount: number;
      transaction: WalletTransaction;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.rechargeWallet(userId, amount, transaction);
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["walletBalance", vars.userId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["walletTransactions", vars.userId.toString()],
      });
    },
  });
}

// ─── Reports ──────────────────────────────────────────────────────────────────

export function useCreateReportRequest() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: ReportRequest) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createReportRequest(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportRequests"] });
    },
  });
}

export function useGetUserReportRequests(userId: Principal | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ReportRequest[]>({
    queryKey: ["reportRequests", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getUserReportRequests(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

// ─── Devotional Content ───────────────────────────────────────────────────────

export function useGetAllDevotionalContents() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<DevotionalContent[]>({
    queryKey: ["devotionalContents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDevotionalContents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetDevotionalContent(id: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<DevotionalContent | null>({
    queryKey: ["devotionalContent", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDevotionalContent(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateDevotionalContent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content: DevotionalContent) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createDevotionalContent(content);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["devotionalContents"] }),
  });
}

export function useUpdateDevotionalContent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content: DevotionalContent) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateDevotionalContent(content);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["devotionalContents"] }),
  });
}

export function useDeleteDevotionalContent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteDevotionalContent(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["devotionalContents"] }),
  });
}

// ─── Virtual Temple ───────────────────────────────────────────────────────────

export function useGetVirtualTempleConfig(userId: Principal | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<VirtualTempleConfig | null>({
    queryKey: ["virtualTempleConfig", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getVirtualTempleConfig(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useSaveVirtualTempleConfig() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (config: VirtualTempleConfig) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveVirtualTempleConfig(config);
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["virtualTempleConfig", vars.userId.toString()],
      });
    },
  });
}

// ─── Numerology Records ───────────────────────────────────────────────────────

export function useCreateNumerologyRecord() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (record: NumerologyRecord) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createNumerologyRecord(record);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["numerologyRecords"] });
    },
  });
}

// ─── Business Name Records ────────────────────────────────────────────────────

export function useCreateBusinessNameRecord() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (record: BusinessNameRecord) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createBusinessNameRecord(record);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessNameRecords"] });
    },
  });
}

// ─── Stripe ───────────────────────────────────────────────────────────────────

export function useIsStripeConfigured() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<boolean>({
    queryKey: ["stripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (config: StripeConfiguration) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stripeConfigured"] });
    },
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async ({
      items,
      successUrl,
      cancelUrl,
    }: {
      items: ShoppingItem[];
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createCheckoutSession(
        items,
        successUrl,
        cancelUrl,
      );
      const session = JSON.parse(result) as { id: string; url: string };
      if (!session?.url) throw new Error("Stripe session missing url");
      return session;
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Bhajan Entries ───────────────────────────────────────────────────────────

export function useBhajans() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BhajanEntry[]>({
    queryKey: ["bhajans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBhajans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBhajan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: BhajanEntry) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addBhajan(entry);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bhajans"] }),
  });
}

export function useUpdateBhajan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: BhajanEntry) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateBhajan(entry);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bhajans"] }),
  });
}

export function useDeleteBhajan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteBhajan(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bhajans"] }),
  });
}

// ─── Vrat Katha Entries ───────────────────────────────────────────────────────

export function useVratKathas() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<VratKathaEntry[]>({
    queryKey: ["vratKathas"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVratKathas();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddVratKatha() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: VratKathaEntry) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addVratKatha(entry);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["vratKathas"] }),
  });
}

export function useUpdateVratKatha() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: VratKathaEntry) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateVratKatha(entry);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["vratKathas"] }),
  });
}

export function useDeleteVratKatha() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteVratKatha(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["vratKathas"] }),
  });
}

// ─── Holy Book Entries ────────────────────────────────────────────────────────

export function useHolyBookEntries(bookTitle: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<HolyBookEntry[]>({
    queryKey: ["holyBookEntries", bookTitle],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHolyBookEntries(bookTitle);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddHolyBookEntry() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: HolyBookEntry) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addHolyBookEntry(entry);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["holyBookEntries"] }),
  });
}

export function useUpdateHolyBookEntry() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: HolyBookEntry) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateHolyBookEntry(entry);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["holyBookEntries"] }),
  });
}

export function useDeleteHolyBookEntry() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteHolyBookEntry(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["holyBookEntries"] }),
  });
}

// ─── Kundali Matching ─────────────────────────────────────────────────────────

export function useSaveKundaliMatch() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: KundaliMatchInput): Promise<string> => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveKundaliMatch(input);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["kundaliMatches"] }),
  });
}

export function useGetKundaliMatches() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<KundaliMatch[]>({
    queryKey: ["kundaliMatches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getKundaliMatches();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteKundaliMatch() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteKundaliMatch(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["kundaliMatches"] }),
  });
}

// ─── Palmistry Readings ───────────────────────────────────────────────────────

export function useSavePalmistryReading() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reading: PalmistryReading) => {
      if (!actor) throw new Error("Actor not available");
      return actor.savePalmistryReading(reading);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["vastuContents"] }),
  });
}

// ─── Vastu Room Checks (localStorage-backed) ──────────────────────────────────

const VASTU_ROOM_CHECKS_KEY = "vastu_room_checks_v1";

function loadVastuRoomChecks(): VastuRoomCheck[] {
  try {
    return JSON.parse(localStorage.getItem(VASTU_ROOM_CHECKS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveVastuRoomChecks(checks: VastuRoomCheck[]): void {
  localStorage.setItem(VASTU_ROOM_CHECKS_KEY, JSON.stringify(checks));
}

export function useGetMyVastuRoomChecks() {
  return useQuery<VastuRoomCheck[]>({
    queryKey: ["vastuRoomChecks"],
    queryFn: async () => loadVastuRoomChecks(),
  });
}

export function useCreateVastuRoomCheck() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: Omit<VastuRoomCheck, "id" | "userId" | "createdAt">,
    ): Promise<VastuRoomCheck> => {
      const newCheck: VastuRoomCheck = {
        ...data,
        id: `VRC-${Date.now().toString(36).toUpperCase()}`,
        userId: "local",
        createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      };
      const existing = loadVastuRoomChecks();
      saveVastuRoomChecks([newCheck, ...existing]);
      return newCheck;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vastuRoomChecks"] });
    },
  });
}

export function useGetUserPalmistryReadings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PalmistryReading[]>({
    queryKey: ["palmistryReadings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserPalmistryReadings();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Calculator FAQ (local static data, no backend required) ──────────────────

import {
  calculatorFAQs,
  getFAQsByCalculatorId,
} from "../data/calculatorFAQData";

function toCalculatorFAQ(
  entry: ReturnType<typeof getFAQsByCalculatorId>,
): CalculatorFAQ | null {
  if (!entry) return null;
  return {
    id: entry.calculatorId,
    calculatorId: entry.calculatorId,
    calculatorName: entry.calculatorName,
    qaPairs: entry.qaPairs.map((qa) => ({
      question: qa.question,
      answer: qa.answer,
      questionHindi: qa.questionHindi,
      answerHindi: qa.answerHindi,
      category: qa.category,
    })),
    updatedAt: BigInt(Date.now()),
  };
}

export function useSaveCalculatorFAQ() {
  return useMutation({
    mutationFn: async (faq: CalculatorFAQ): Promise<CalculatorFAQ> => {
      return Promise.resolve(faq);
    },
  });
}

export function useGetCalculatorFAQ(calculatorId: string) {
  return useQuery<CalculatorFAQ | null>({
    queryKey: ["calculatorFAQ", calculatorId],
    queryFn: async () => toCalculatorFAQ(getFAQsByCalculatorId(calculatorId)),
    enabled: !!calculatorId,
  });
}

export function useGetAllCalculatorFAQs() {
  return useQuery<CalculatorFAQ[]>({
    queryKey: ["allCalculatorFAQs"],
    queryFn: async () => calculatorFAQs.map((entry) => toCalculatorFAQ(entry)!),
  });
}

export function useUpdateCalculatorFAQ() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (faq: CalculatorFAQ): Promise<CalculatorFAQ> => {
      return Promise.resolve(faq);
    },
    onSuccess: (_, faq) => {
      queryClient.invalidateQueries({
        queryKey: ["calculatorFAQ", faq.calculatorId],
      });
      queryClient.invalidateQueries({ queryKey: ["allCalculatorFAQs"] });
    },
  });
}

// ─── Suktam Entries (local static data) ──────────────────────────────────────

export function useGetSuktams() {
  return useQuery<SuktamEntry[]>({
    queryKey: ["suktams"],
    queryFn: async () => {
      const { suktamData } = await import("../data/suktamData");
      return suktamData;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useGetSuktamById(id: string) {
  return useQuery<SuktamEntry | null>({
    queryKey: ["suktam", id],
    queryFn: async () => {
      const { suktamData } = await import("../data/suktamData");
      return suktamData.find((s) => s.id === id) ?? null;
    },
    enabled: !!id,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useAddSuktam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_entry: SuktamEntry) => {
      await Promise.resolve();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["suktams"] }),
  });
}

export function useUpdateSuktam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_entry: SuktamEntry) => {
      await Promise.resolve();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["suktams"] }),
  });
}

export function useDeleteSuktam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      await Promise.resolve();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["suktams"] }),
  });
}

// ─── User Numerology Records ─────────────────────────────────────────────────

export function useGetUserNumerologyRecords(userId: Principal | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<NumerologyRecord[]>({
    queryKey: ["numerologyRecords", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getUserNumerologyRecords(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

// ─── Festival Events (local static data) ─────────────────────────────────────

import type { FaithType, FestivalEvent } from "../data/festival-calendar-data";

export function useFestivalEvents() {
  return useQuery<FestivalEvent[]>({
    queryKey: ["festivalEvents"],
    queryFn: async () => {
      const { allFestivalEvents } = await import(
        "../data/festival-calendar-data"
      );
      return allFestivalEvents;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useFestivalEventsByFaith(faith: FaithType | "All") {
  return useQuery<FestivalEvent[]>({
    queryKey: ["festivalEvents", faith],
    queryFn: async () => {
      const { allFestivalEvents, getEventsByFaith } = await import(
        "../data/festival-calendar-data"
      );
      if (faith === "All") return allFestivalEvents;
      return getEventsByFaith(allFestivalEvents, faith);
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useAddFestivalEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_event: FestivalEvent) => {
      await Promise.resolve();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["festivalEvents"] }),
  });
}

export function useUpdateFestivalEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_event: FestivalEvent) => {
      await Promise.resolve();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["festivalEvents"] }),
  });
}

export function useDeleteFestivalEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      await Promise.resolve();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["festivalEvents"] }),
  });
}

// ─── Blog Articles ────────────────────────────────────────────────────────────

export function useBlogArticles() {
  return useQuery<BlogArticle[]>({
    queryKey: ["blogArticles"],
    queryFn: async () => {
      const { blogArticles } = await import("../data/blog-data");
      return blogArticles;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function usePublishedBlogArticles() {
  return useQuery<BlogArticle[]>({
    queryKey: ["publishedBlogArticles"],
    queryFn: async () => {
      const { blogArticles } = await import("../data/blog-data");
      return blogArticles.filter((a) => a.isPublished);
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useBlogArticleBySlug(slug: string) {
  return useQuery<BlogArticle | null>({
    queryKey: ["blogArticle", slug],
    queryFn: async () => {
      const { blogArticles } = await import("../data/blog-data");
      return blogArticles.find((a) => a.slug === slug) ?? null;
    },
    enabled: !!slug,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useCreateBlogArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_article: BlogArticle) => {
      await Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogArticles"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogArticles"] });
    },
  });
}

export function useUpdateBlogArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_article: BlogArticle) => {
      await Promise.resolve();
    },
    onSuccess: (_data, article) => {
      queryClient.invalidateQueries({ queryKey: ["blogArticles"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogArticles"] });
      queryClient.invalidateQueries({
        queryKey: ["blogArticle", article.slug],
      });
    },
  });
}

export function useDeleteBlogArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      await Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogArticles"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogArticles"] });
    },
  });
}

// ─── Web Stories ─────────────────────────────────────────────────────────────

export function useWebStories() {
  return useQuery<WebStory[]>({
    queryKey: ["webStories"],
    queryFn: async () => {
      const { webStoriesData } = await import("../data/web-stories-data");
      return webStoriesData;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function usePublishedWebStories() {
  return useQuery<WebStory[]>({
    queryKey: ["publishedWebStories"],
    queryFn: async () => {
      const { webStoriesData } = await import("../data/web-stories-data");
      return webStoriesData.filter((s) => s.isPublished);
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useCreateWebStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_story: WebStory) => {
      await Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webStories"] });
      queryClient.invalidateQueries({ queryKey: ["publishedWebStories"] });
    },
  });
}

export function useUpdateWebStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_story: WebStory) => {
      await Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webStories"] });
      queryClient.invalidateQueries({ queryKey: ["publishedWebStories"] });
    },
  });
}

export function useDeleteWebStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      await Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webStories"] });
      queryClient.invalidateQueries({ queryKey: ["publishedWebStories"] });
    },
  });
}

// ─── Astro Charts (localStorage-backed, frontend-only) ────────────────────────

export interface AstroChart {
  id: string;
  userId: string;
  name: string;
  dob: string;
  tob: string;
  pob: string;
  notes: string;
  createdAt: bigint;
}

const ASTRO_CHARTS_KEY = "astro_charts_v1";

function loadAstroCharts(): AstroChart[] {
  try {
    return JSON.parse(localStorage.getItem(ASTRO_CHARTS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveAstroCharts(charts: AstroChart[]): void {
  localStorage.setItem(ASTRO_CHARTS_KEY, JSON.stringify(charts));
}

export function useGetUserAstroCharts(userId: string) {
  return useQuery<AstroChart[]>({
    queryKey: ["astroCharts", userId],
    queryFn: async () => {
      const all = loadAstroCharts();
      return userId === "admin" ? all : all.filter((c) => c.userId === userId);
    },
    enabled: !!userId,
  });
}

export function useGetAstroChart(id: string) {
  return useQuery<AstroChart | null>({
    queryKey: ["astroChart", id],
    queryFn: async () => {
      const all = loadAstroCharts();
      return all.find((c) => c.id === id) ?? null;
    },
    enabled: !!id,
  });
}

export function useSaveAstroChart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      chart: Omit<AstroChart, "id" | "createdAt">,
    ): Promise<AstroChart> => {
      const newChart: AstroChart = {
        ...chart,
        id: `AC-${Date.now().toString(36).toUpperCase()}`,
        createdAt: BigInt(Date.now()),
      };
      const existing = loadAstroCharts();
      saveAstroCharts([...existing, newChart]);
      return newChart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["astroCharts"] });
    },
  });
}

export function useDeleteAstroChart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<boolean> => {
      const existing = loadAstroCharts();
      const filtered = existing.filter((c) => c.id !== id);
      if (filtered.length === existing.length) return false;
      saveAstroCharts(filtered);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["astroCharts"] });
    },
  });
}

// ─── Jain Pathshala (local static data) ─────────────────────────────────────

import type { PathshalaModule } from "../data/jain-pathshala-data";

export function useJainPathshalaEntries() {
  return useQuery<PathshalaModule[]>({
    queryKey: ["jainPathshalaEntries"],
    queryFn: async () => {
      const { pathshalaModules } = await import("../data/jain-pathshala-data");
      return pathshalaModules;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useAddJainPathshalaEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: PathshalaModule): Promise<PathshalaModule> => {
      return entry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jainPathshalaEntries"] });
    },
  });
}

// ─── Jain Kathayen (local static data) ───────────────────────────────────────

import type { JainKatha } from "../data/jain-kathayen-data";

export function useJainKathas() {
  return useQuery<JainKatha[]>({
    queryKey: ["jainKathas"],
    queryFn: async () => {
      const { jainKathayen } = await import("../data/jain-kathayen-data");
      return jainKathayen;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useAddJainKatha() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (katha: JainKatha): Promise<JainKatha> => {
      return katha;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jainKathas"] });
    },
  });
}

// ─── Service Bookings (localStorage-backed, frontend-only) ───────────────────

const SERVICE_BOOKINGS_KEY = "service_bookings_v1";

function loadServiceBookings(): ServiceBooking[] {
  try {
    return JSON.parse(localStorage.getItem(SERVICE_BOOKINGS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveServiceBookings(bookings: ServiceBooking[]): void {
  localStorage.setItem(SERVICE_BOOKINGS_KEY, JSON.stringify(bookings));
}

export function useCreateServiceBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      booking: Omit<ServiceBooking, "id" | "createdAt">,
    ): Promise<ServiceBooking> => {
      const newBooking: ServiceBooking = {
        ...booking,
        id: `SB-${Date.now().toString(36).toUpperCase()}`,
        createdAt: BigInt(Date.now()),
      };
      const existing = loadServiceBookings();
      saveServiceBookings([...existing, newBooking]);
      return newBooking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceBookings"] });
    },
  });
}

export function useGetUserServiceBookings(userId: string) {
  return useQuery<ServiceBooking[]>({
    queryKey: ["serviceBookings", userId],
    queryFn: async () => {
      const all = loadServiceBookings();
      return userId === "admin" ? all : all.filter((b) => b.userId === userId);
    },
    enabled: !!userId,
  });
}

// ─── Palmistry Contents (admin CRUD) ─────────────────────────────────────────

export function usePalmistryContents() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PalmistryContent[]>({
    queryKey: ["palmistryContents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPalmistryContents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePalmistryContent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
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
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createPalmistryContent(
        args.title,
        args.titleHi,
        args.category,
        args.lineOrPalmType,
        args.descriptionEn,
        args.descriptionHi,
        args.characteristicsEn,
        args.characteristicsHi,
        args.locationOnPalm,
        args.benefitsEn,
        args.benefitsHi,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["palmistryContents"] }),
  });
}

export function useDeletePalmistryContent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePalmistryContent(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["palmistryContents"] }),
  });
}

// ─── Vastu Contents ────────────────────────────────────────────────────────────

export function useVastuContents() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<VastuContent[]>({
    queryKey: ["vastuContents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVastuContents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateVastuContent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
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
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createVastuContent(
        args.title,
        args.titleHi,
        args.category,
        args.directionOrRoom,
        args.planetaryRuler,
        args.planetaryRulerHi,
        args.effectsEn,
        args.effectsHi,
        args.doshaEn,
        args.doshaHi,
        args.remediesEn,
        args.remediesHi,
        args.yantra,
        args.elementsInvolved,
        args.tipsEn,
        args.tipsHi,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["vastuContents"] }),
  });
}

export function useDeleteVastuContent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteVastuContent(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["vastuContents"] }),
  });
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export function useAddNewsletterSubscription() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      email: string;
      name?: string;
      source: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const nameOpt: [] | [string] = args.name ? [args.name] : [];
      const result = await actor.addNewsletterSubscription(
        args.email,
        nameOpt,
        args.source,
      );
      if ("err" in result) throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["newsletterSubscriptions"] }),
  });
}

export function useUnsubscribeNewsletter() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.unsubscribeNewsletter(email);
      if ("err" in result) throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["newsletterSubscriptions"] }),
  });
}

// ─── Puja Events ─────────────────────────────────────────────────────────────

export function useGetAllPujaEvents() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PujaEvent[]>({
    queryKey: ["pujaEvents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPujaEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPujaEventsAdmin() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PujaEvent[]>({
    queryKey: ["pujaEventsAdmin"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPujaEventsAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePujaEvent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event: {
      pujaName: string;
      pujaNameHindi: string;
      date: string;
      time: string;
      description: string;
      price: number;
      slotsAvailable: number;
      location: string;
      deity: string;
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createPujaEvent(
        event.pujaName,
        event.pujaNameHindi,
        event.date,
        event.time,
        event.description,
        BigInt(event.price),
        BigInt(event.slotsAvailable),
        event.location,
        event.deity,
        event.isActive,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pujaEvents"] });
      queryClient.invalidateQueries({ queryKey: ["pujaEventsAdmin"] });
    },
  });
}

export function useUpdatePujaEvent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event: {
      id: string;
      pujaName: string;
      pujaNameHindi: string;
      date: string;
      time: string;
      description: string;
      price: number;
      slotsAvailable: number;
      location: string;
      deity: string;
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePujaEvent(
        event.id,
        event.pujaName,
        event.pujaNameHindi,
        event.date,
        event.time,
        event.description,
        BigInt(event.price),
        BigInt(event.slotsAvailable),
        event.location,
        event.deity,
        event.isActive,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pujaEvents"] });
      queryClient.invalidateQueries({ queryKey: ["pujaEventsAdmin"] });
    },
  });
}

export function useDeletePujaEvent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePujaEvent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pujaEvents"] });
      queryClient.invalidateQueries({ queryKey: ["pujaEventsAdmin"] });
    },
  });
}

export function useBookPujaEventSlot() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sankalp: SankalpInput) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.bookPujaEventSlot(sankalp);
      if ("err" in result) throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["pujaEvents"] }),
  });
}

export function useGetNewsletterSubscriptions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<NewsletterSubscription[]>({
    queryKey: ["newsletterSubscriptions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNewsletterSubscriptions();
    },
    enabled: !!actor && !isFetching,
  });
}
