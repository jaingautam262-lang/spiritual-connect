import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AstrologerProfile,
  BhajanEntry,
  BusinessNameRecord,
  ChadhavaOffering,
  ConsultationAppointment,
  DevotionalContent,
  HolyBookEntry,
  NumerologyRecord,
  Order,
  PrasadDeliveryRequest,
  Product,
  PujaBooking,
  ReportRequest,
  ShoppingItem,
  StripeConfiguration,
  Temple,
  UserProfile,
  VirtualTempleConfig,
  VratKathaEntry,
  WalletTransaction,
} from "../backend";
import { useActor } from "./useActor";

// ─── User Profile ─────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
  return useQuery<PujaBooking[]>({
    queryKey: ["pujaBookings", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getUserPujaBookings(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

// ─── Chadhava Offerings ───────────────────────────────────────────────────────

export function useCreateChadhavaOffering() {
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: AstrologerProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createAstrologerProfile(profile);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["astrologers"] }),
  });
}

// ─── Consultation Appointments ────────────────────────────────────────────────

export function useCreateConsultationAppointment() {
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
