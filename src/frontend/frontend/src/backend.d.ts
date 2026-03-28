import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: string;
    name: string;
    createdAt: Time;
    description: string;
    stock: bigint;
    astrologicalPurpose: string;
    category: string;
    benefits: string;
    price: number;
}
export interface UserProfile {
    birthDate: string;
    birthTime: string;
    name: string;
    createdAt: Time;
    birthPlace: string;
    email: string;
    gotra: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface PrasadDeliveryRequest {
    id: string;
    status: string;
    userId: Principal;
    createdAt: Time;
    mobileNumber: string;
    address: string;
    templeId: string;
}
export interface OrderItem {
    productId: string;
    quantity: bigint;
    unitPrice: number;
}
export interface BusinessNameRecord {
    id: string;
    result: string;
    userId: Principal;
    createdAt: Time;
    businessName: string;
}
export interface BhajanEntry {
    id: string;
    title: string;
    audioBase64: string;
    createdAt: Time;
    lyricsText: string;
    artist: string;
    deity: string;
}
export interface WalletTransaction {
    id: string;
    transactionType: string;
    userId: Principal;
    createdAt: Time;
    description: string;
    amount: number;
}
export interface AstrologerProfile {
    id: string;
    bio: string;
    name: string;
    createdAt: Time;
    languages: Array<string>;
    experienceYears: bigint;
    perMinuteRate: number;
    rating: number;
    specializations: Array<string>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface DevotionalContent {
    id: string;
    title: string;
    lyrics: string;
    contentType: string;
    createdAt: Time;
    language: string;
    deity: string;
}
export interface NumerologyRecord {
    id: string;
    dob: string;
    result: string;
    userId: Principal;
    name: string;
    createdAt: Time;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface VirtualTempleConfig {
    background: string;
    decorStyle: string;
    userId: Principal;
    updatedAt: Time;
    items: Array<string>;
    deity: string;
}
export interface HolyBookEntry {
    id: string;
    bookTitle: string;
    shlokaText: string;
    bookCategory: string;
    audioBase64: string;
    trackNumber: bigint;
    createdAt: Time;
    chapterTitle: string;
}
export interface ConsultationAppointment {
    id: string;
    status: string;
    topic: string;
    astrologerId: string;
    userId: Principal;
    createdAt: Time;
    preferredDateTime: string;
    notes: string;
    specialQuestions: string;
}
export interface Temple {
    id: string;
    name: string;
    createdAt: Time;
    description: string;
    deity: string;
    location: string;
}
export interface ReportRequest {
    id: string;
    dob: string;
    pob: string;
    tob: string;
    status: string;
    content: string;
    userId: Principal;
    name: string;
    createdAt: Time;
    reportType: string;
}
export interface Order {
    id: string;
    total: number;
    paymentStatus: string;
    userId: Principal;
    createdAt: Time;
    stripePaymentIntentId: string;
    items: Array<OrderItem>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface ChadhavaOffering {
    id: string;
    status: string;
    userId: Principal;
    createdAt: Time;
    templeId: string;
    items: Array<string>;
}
export interface VratKathaEntry {
    id: string;
    title: string;
    audioBase64: string;
    storyText: string;
    createdAt: Time;
    festivalName: string;
}
export interface PujaBooking {
    id: string;
    status: string;
    userId: Principal;
    createdAt: Time;
    pujaType: string;
    specialWishes: string;
    gotra: string;
    preferredDate: string;
    templeId: string;
    devoteeName: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    /**
     * / Admin-only: add a new bhajan entry.
     */
    addBhajan(entry: BhajanEntry): Promise<void>;
    /**
     * / Admin-only: add a new holy book entry.
     */
    addHolyBookEntry(entry: HolyBookEntry): Promise<void>;
    /**
     * / Authenticated users can submit a prasad delivery request for themselves.
     */
    addUserPrasadDeliveryRequest(request: PrasadDeliveryRequest): Promise<void>;
    /**
     * / Admin-only: add a new vrat katha entry.
     */
    addVratKatha(entry: VratKathaEntry): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    /**
     * / Admin-only: create an astrologer profile.
     */
    createAstrologerProfile(profile: AstrologerProfile): Promise<void>;
    /**
     * / Authenticated users can create a business name analysis for themselves.
     */
    createBusinessNameRecord(record: BusinessNameRecord): Promise<void>;
    /**
     * / Authenticated users can submit a chadhava offering for themselves.
     */
    createChadhavaOffering(offering: ChadhavaOffering): Promise<void>;
    /**
     * / Authenticated users can create a Stripe checkout session (e.g. for payment).
     */
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    /**
     * / Authenticated users can book a consultation appointment for themselves.
     */
    createConsultationAppointment(appointment: ConsultationAppointment): Promise<void>;
    /**
     * / Admin-only: create a devotional content entry.
     */
    createDevotionalContent(content: DevotionalContent): Promise<void>;
    /**
     * / Authenticated users can create a numerology analysis for themselves.
     */
    createNumerologyRecord(record: NumerologyRecord): Promise<void>;
    /**
     * / Authenticated users can place an order for themselves.
     */
    createOrder(order: Order): Promise<void>;
    /**
     * / Admin-only: create a product.
     */
    createProduct(product: Product): Promise<void>;
    /**
     * / Authenticated users can create a puja booking for themselves.
     */
    createPujaBooking(booking: PujaBooking): Promise<void>;
    /**
     * / Authenticated users can request a report for themselves.
     */
    createReportRequest(request: ReportRequest): Promise<void>;
    /**
     * / Admin-only: create a temple entry.
     */
    createTemple(temple: Temple): Promise<void>;
    /**
     * / Admin-only: delete a bhajan entry.
     */
    deleteBhajan(id: string): Promise<void>;
    /**
     * / Admin-only: delete a devotional content entry.
     */
    deleteDevotionalContent(id: string): Promise<void>;
    /**
     * / Admin-only: delete a holy book entry.
     */
    deleteHolyBookEntry(id: string): Promise<void>;
    /**
     * / Admin-only: delete a product.
     */
    deleteProduct(id: string): Promise<void>;
    /**
     * / Admin-only: delete a vrat katha entry.
     */
    deleteVratKatha(id: string): Promise<void>;
    /**
     * / Public: anyone may browse astrologer profiles.
     */
    getAllAstrologerProfiles(): Promise<Array<AstrologerProfile>>;
    /**
     * / Admin-only: list all appointments (for astrologer/admin dashboard).
     */
    getAllConsultationAppointments(): Promise<Array<ConsultationAppointment>>;
    /**
     * / Admin-only: get all delivery requests and puja bookings.
     */
    getAllDeliveryRequests(): Promise<[Array<[string, PrasadDeliveryRequest]>, Array<[string, PujaBooking]>]>;
    /**
     * / Public: anyone may browse devotional content.
     */
    getAllDevotionalContents(): Promise<Array<DevotionalContent>>;
    /**
     * / Public: anyone may browse products.
     */
    getAllProducts(): Promise<Array<Product>>;
    /**
     * / Public: anyone may browse temples.
     */
    getAllTemples(): Promise<Array<Temple>>;
    /**
     * / Admin-only: list all user profiles.
     */
    getAllUserProfiles(): Promise<Array<[Principal, UserProfile]>>;
    /**
     * / Public: get a single astrologer profile by id.
     */
    getAstrologerProfile(id: string): Promise<AstrologerProfile | null>;
    /**
     * / Public: get a single bhajan entry by id.
     */
    getBhajanById(id: string): Promise<BhajanEntry | null>;
    /**
     * / Public: anyone may browse bhajan entries.
     */
    getBhajans(): Promise<Array<BhajanEntry>>;
    /**
     * / Get the calling user's own profile.
     */
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    /**
     * / Public: get a single devotional content entry.
     */
    getDevotionalContent(id: string): Promise<DevotionalContent | null>;
    /**
     * / Public: anyone may browse holy book entries, optionally filtered by bookTitle.
     */
    getHolyBookEntries(bookTitle: string): Promise<Array<HolyBookEntry>>;
    /**
     * / Public: get a single holy book entry by id.
     */
    getHolyBookEntryById(id: string): Promise<HolyBookEntry | null>;
    /**
     * / Admin-only: list all pending prasad deliveries.
     */
    getPendingPrasadDeliveries(): Promise<Array<PrasadDeliveryRequest>>;
    /**
     * / Public: get a single product.
     */
    getProduct(id: string): Promise<Product | null>;
    /**
     * / Authenticated users can check a Stripe session status (e.g. after checkout).
     */
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    /**
     * / Users may only fetch their own business name records; admins may fetch any.
     */
    getUserBusinessNameRecords(userId: Principal): Promise<Array<BusinessNameRecord>>;
    /**
     * / Users may only fetch their own offerings; admins may fetch any user's offerings.
     */
    getUserChadhavaOfferings(userId: Principal): Promise<Array<ChadhavaOffering>>;
    /**
     * / Users may only fetch their own appointments; admins may fetch any user's.
     */
    getUserConsultationAppointments(userId: Principal): Promise<Array<ConsultationAppointment>>;
    /**
     * / Users may only fetch their own numerology records; admins may fetch any.
     */
    getUserNumerologyRecords(userId: Principal): Promise<Array<NumerologyRecord>>;
    /**
     * / Users may only fetch their own orders; admins may fetch any user's.
     */
    getUserOrders(userId: Principal): Promise<Array<Order>>;
    /**
     * / Users may only fetch their own delivery requests; admins may fetch any.
     */
    getUserPrasadDeliveryRequests(userId: Principal): Promise<Array<PrasadDeliveryRequest>>;
    /**
     * / Fetch another user's profile. Users may only fetch their own; admins may fetch any.
     */
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    /**
     * / Users may only fetch their own bookings; admins may fetch any user's bookings.
     */
    getUserPujaBookings(userId: Principal): Promise<Array<PujaBooking>>;
    /**
     * / Users may only fetch their own report requests; admins may fetch any user's.
     */
    getUserReportRequests(userId: Principal): Promise<Array<ReportRequest>>;
    /**
     * / Users may only fetch their own temple config; admins may fetch any.
     */
    getVirtualTempleConfig(userId: Principal): Promise<VirtualTempleConfig | null>;
    /**
     * / Public: get a single vrat katha entry by id.
     */
    getVratKathaById(id: string): Promise<VratKathaEntry | null>;
    /**
     * / Public: anyone may browse vrat katha entries.
     */
    getVratKathas(): Promise<Array<VratKathaEntry>>;
    /**
     * / Authenticated users can get their own wallet balance; admins can get any.
     */
    getWalletBalance(userId: Principal): Promise<number>;
    /**
     * / Authenticated users can get their own transaction history; admins can get any.
     */
    getWalletTransactions(userId: Principal): Promise<Array<WalletTransaction>>;
    /**
     * / Admin-only: update the status of a puja booking.
     */
    handlePujaBooking(bookingId: string, status: string): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    /**
     * / Public: check whether Stripe has been configured.
     */
    isStripeConfigured(): Promise<boolean>;
    /**
     * / Authenticated users can add funds to their own wallet (recharge).
     */
    rechargeWallet(userId: Principal, amount: number, transaction: WalletTransaction): Promise<void>;
    /**
     * / Save / update the calling user's own profile.
     */
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / Authenticated users can save their own virtual temple configuration.
     */
    saveVirtualTempleConfig(config: VirtualTempleConfig): Promise<void>;
    /**
     * / Admin-only: set the Stripe configuration.
     */
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    /**
     * / Admin-only: update an existing bhajan entry.
     */
    updateBhajan(entry: BhajanEntry): Promise<void>;
    /**
     * / Admin-only: update appointment status and notes.
     */
    updateConsultationAppointment(id: string, status: string, notes: string): Promise<void>;
    /**
     * / Admin-only: update an existing devotional content entry.
     */
    updateDevotionalContent(content: DevotionalContent): Promise<void>;
    /**
     * / Admin-only: update an existing holy book entry.
     */
    updateHolyBookEntry(entry: HolyBookEntry): Promise<void>;
    /**
     * / Admin-only: update order payment status.
     */
    updateOrderPaymentStatus(id: string, paymentStatus: string, stripePaymentIntentId: string): Promise<void>;
    /**
     * / Admin-only: update the status of a prasad delivery request.
     */
    updatePrasadDeliveryStatus(id: string, status: string): Promise<void>;
    /**
     * / Admin-only: update a product.
     */
    updateProduct(product: Product): Promise<void>;
    /**
     * / Admin-only: update report status and content.
     */
    updateReportRequest(id: string, status: string, content: string): Promise<void>;
    /**
     * / Admin-only: update an existing vrat katha entry.
     */
    updateVratKatha(entry: VratKathaEntry): Promise<void>;
}
