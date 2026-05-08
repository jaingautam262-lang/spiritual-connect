import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface JainKatha {
    id: string;
    title: string;
    createdAt: bigint;
    parv: string;
    fullText: string;
    occasion: string;
    significance: string;
}
export interface SuktamEntry {
    id: string;
    hindiMeaning: string;
    nameHindi: string;
    sanskritText: string;
    name: string;
    vedaSource: string;
    transliteration: string;
    englishMeaning: string;
    recitationInstructions: string;
    benefits: string;
    deityHindi: string;
    deity: string;
    benefitsHindi: string;
}
export interface JainQAPair {
    question: string;
    answer: string;
    answerHindi: string;
    questionHindi: string;
}
export interface TransformationOutput {
    response: HttpResponse;
}
export interface PujaEvent {
    id: string;
    date: string;
    slotsAvailable: bigint;
    createdAt: bigint;
    time: string;
    description: string;
    isActive: boolean;
    pujaName: string;
    pujaNameHindi: string;
    slotsBooked: bigint;
    price: bigint;
    deity: string;
    location: string;
}
export interface PrasadDeliveryRequest {
    id: string;
    status: string;
    userId: Principal;
    createdAt: Time;
    mobileNumber: string;
    address: string;
    templeId: string;
}
export interface NewsletterSubscription {
    id: string;
    subscribedAt: bigint;
    source: string;
    name?: string;
    isActive: boolean;
    email: string;
}
export interface BusinessNameRecord {
    id: string;
    result: string;
    userId: Principal;
    createdAt: Time;
    businessName: string;
}
export interface DaanItem {
    value: number;
    item: string;
    quantity: string;
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
export interface ChatMessage {
    question: string;
    answer: string;
    timestamp: bigint;
}
export interface StripeSessionStatus {
    status: string;
    paymentStatus: string;
    customerEmail: string;
}
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface ConsultationBookingRequest {
    id: string;
    status: string;
    topic: string;
    birthDate: string;
    birthTime: string;
    createdAt: bigint;
    fullName: string;
    email: string;
    preferredDateTime: string;
    birthLocation: string;
    specialQuestions: string;
    phone: string;
    consultationMode: string;
}
export interface PujaType {
    id: string;
    descriptionHindi: string;
    duration: string;
    vidhiHindi: string;
    nameHindi: string;
    vidhi: string;
    name: string;
    when: string;
    description: string;
    samagriHindi: Array<string>;
    whenHindi: string;
    samagri: Array<string>;
    imageUrl: string;
    category: string;
    benefits: string;
    deity: string;
    benefitsHindi: string;
}
export interface KundaliMatchInput {
    personBName: string;
    personANakshatra: string;
    grahaMaitriScore: bigint;
    personBTime: string;
    personARashi: string;
    bhakootDosha: boolean;
    personASunSign: string;
    ganaScore: bigint;
    personADob: string;
    personBDob: string;
    personBPlace: string;
    yoniScore: bigint;
    doshaRemedies: string;
    personBSunSign: string;
    personBMarsSign: string;
    totalScore: bigint;
    personAName: string;
    personBRashi: string;
    personATime: string;
    compatibilityPercent: bigint;
    manglikDoshaA: boolean;
    manglikDoshaB: boolean;
    nadiScore: bigint;
    taraScore: bigint;
    personAMarsSign: string;
    personBMoonSign: string;
    personBAscendant: string;
    varnaScore: bigint;
    vasyaScore: bigint;
    bhakootScore: bigint;
    personAMoonSign: string;
    personBNakshatra: string;
    personAAscendant: string;
    nadiDosha: boolean;
    personAPlace: string;
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
export interface JainGlossaryTerm {
    term: string;
    definition: string;
}
export interface StorySlide {
    id: string;
    title: string;
    order: bigint;
    description: string;
    imageUrl: string;
}
export interface ServiceBooking {
    id: string;
    status: string;
    serviceName: string;
    serviceType: string;
    userId: Principal;
    specialRequests: string;
    createdAt: bigint;
    email: string;
    pricing: number;
    preferredDate: string;
    phone: string;
    devoteeName: string;
    location: string;
}
export type ProductType = string;
export interface PalmistryContent {
    id: string;
    title: string;
    locationOnPalm: string;
    descriptionEn: string;
    descriptionHi: string;
    createdAt: bigint;
    benefitsEn: string;
    benefitsHi: string;
    updatedAt: bigint;
    category: string;
    titleHi: string;
    lineOrPalmType: string;
    characteristicsEn: string;
    characteristicsHi: string;
}
export interface FestivalEvent {
    id: string;
    title: string;
    titleHindi: string;
    date: string;
    description: string;
    significance: string;
    deity: string;
    faith: string;
    eventType: string;
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
export interface CalculatorFAQ {
    id: string;
    qaPairs: Array<CalculatorQAPair>;
    calculatorId: string;
    calculatorName: string;
}
export interface ShoppingItem {
    name: string;
    quantity: bigint;
    price: number;
}
export interface PujaReport {
    id: string;
    durationMins: bigint;
    sankalp: string;
    bookingId: string;
    daanItems: Array<DaanItem>;
    performedDate: bigint;
    reportStatus: string;
    userId: Principal;
    pujaType: string;
    deity: string;
    priestName: string;
    intention: string;
    completionNotes: string;
}
export interface PersonalisedProduct {
    id: string;
    mrp?: bigint;
    sku?: string;
    name: string;
    createdAt: bigint;
    description: string;
    imageUrl?: string;
    manualCode?: string;
    category: string;
    price: bigint;
    isPersonalised: boolean;
}
export interface ChadhavaOffering {
    id: string;
    status: string;
    userId: Principal;
    createdAt: Time;
    templeId: string;
    items: Array<string>;
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
export interface PanchangCity {
    id: string;
    latitude: number;
    timezone: string;
    nameHindi: string;
    stateName: string;
    name: string;
    longitude: number;
    utcOffset: number;
}
export interface KundaliMatch {
    id: string;
    personBName: string;
    personANakshatra: string;
    grahaMaitriScore: bigint;
    personBTime: string;
    personARashi: string;
    bhakootDosha: boolean;
    personASunSign: string;
    ganaScore: bigint;
    userId: Principal;
    createdAt: bigint;
    personADob: string;
    personBDob: string;
    personBPlace: string;
    yoniScore: bigint;
    doshaRemedies: string;
    personBSunSign: string;
    personBMarsSign: string;
    totalScore: bigint;
    personAName: string;
    personBRashi: string;
    personATime: string;
    compatibilityPercent: bigint;
    manglikDoshaA: boolean;
    manglikDoshaB: boolean;
    nadiScore: bigint;
    taraScore: bigint;
    personAMarsSign: string;
    personBMoonSign: string;
    personBAscendant: string;
    varnaScore: bigint;
    vasyaScore: bigint;
    bhakootScore: bigint;
    personAMoonSign: string;
    personBNakshatra: string;
    personAAscendant: string;
    nadiDosha: boolean;
    personAPlace: string;
}
export interface CombinedVedicReading {
    id: string;
    sunSign: string;
    palmInsightsJson: string;
    birthDate: string;
    activeDasha: string;
    birthTime: string;
    combinedInsightsText: string;
    userId: Principal;
    palmReadingId: string;
    createdAt: bigint;
    moonSign: string;
    doshasJson: string;
    birthPlace: string;
    remediesText: string;
    lagnaSign: string;
}
export type Time = bigint;
export interface VastuRoomCheck {
    id: string;
    issuesJson: string;
    roomDimensions: string;
    floorPlanUrl: string;
    userId: Principal;
    createdAt: bigint;
    elementBalance: string;
    remediesJson: string;
    entranceDirection: string;
    complianceScore: bigint;
    roomType: string;
}
export interface JainPathshalaEntry {
    id: string;
    title: string;
    content: string;
    createdAt: bigint;
    part: string;
    category: string;
    chapter: string;
}
export interface BlogArticle {
    id: string;
    title: string;
    content: string;
    isPublished: boolean;
    publishDate: bigint;
    createdAt: bigint;
    slug: string;
    tags: Array<string>;
    author: string;
    updatedAt: bigint;
    featuredImageUrl: string;
    category: string;
}
export interface OrderItem {
    productId: string;
    quantity: bigint;
    unitPrice: number;
}
export interface PalmistryReading {
    id: string;
    readingDate: bigint;
    headLine: string;
    userId: Principal;
    traits: Array<string>;
    fateLine: string;
    lifeLine: string;
    summary: string;
    imageUrl: string;
    heartLine: string;
}
export interface BhajanEntry {
    id: string;
    title: string;
    audioBase64: string;
    createdAt: Time;
    lyricsText: string;
    artist: string;
    hasMockAudio: boolean;
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
export interface LifeReportPublic {
    status: string;
    content: string;
    name: string;
    reportType: ReportType;
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
export interface LifeReport {
    id: string;
    dob: string;
    status: string;
    content: string;
    userId: Principal;
    name: string;
    createdAt: bigint;
    reportType: ReportType;
    details: string;
}
export interface VastuContent {
    id: string;
    title: string;
    doshaEn: string;
    doshaHi: string;
    tipsEn: string;
    tipsHi: string;
    effectsEn: string;
    effectsHi: string;
    createdAt: bigint;
    remediesEn: string;
    remediesHi: string;
    planetaryRuler: string;
    planetaryRulerHi: string;
    updatedAt: bigint;
    yantra: string;
    directionOrRoom: string;
    category: string;
    elementsInvolved: string;
    titleHi: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: HttpResponse;
}
export interface MediaPlayerItem {
    id: string;
    title: string;
    duration: bigint;
    contentType: string;
    audioUrl: string;
    deity: string;
    faith: string;
}
export interface WebStory {
    id: string;
    title: string;
    isPublished: boolean;
    createdAt: bigint;
    slides: Array<StorySlide>;
    category: string;
}
export interface Purchase {
    productType: ProductType;
    timestamp: bigint;
    sessionId: string;
    amount: bigint;
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
export interface ProductSubCategory {
    id: string;
    nameCode: string;
    name: string;
    productCount: bigint;
    autoCodePrefix: string;
}
export interface SankalpInput {
    eventId: string;
    email: string;
    specialWishes: string;
    gotra: string;
    mobile: string;
    devoteeName: string;
    birthDetails: string;
}
export interface JainEncyclopediaArticle {
    id: string;
    glossaryTerms: Array<JainGlossaryTerm>;
    contentHindi: string;
    content: string;
    volumeNumber: bigint;
    articleTitleHindi: string;
    qaPairs: Array<JainQAPair>;
    articleTitle: string;
    volumeTitle: string;
    crossLinks: Array<string>;
}
export interface GemstoneProduct {
    sku: string;
    weightRatti: number;
    gemstoneType: string;
    description: string;
    shape: string;
    gsCode?: string;
    priceINR: bigint;
}
export interface AstroChart {
    id: string;
    shadbalaData: string;
    chartData: string;
    chartType: string;
    birthDate: string;
    birthTime: string;
    userId: string;
    createdAt: bigint;
    birthPlace: string;
    dashaInfo: string;
    astroScore: bigint;
    ashtakvargaData: string;
    yogas: Array<string>;
}
export interface ProductVariant {
    variantName: string;
    stock: bigint;
    price: number;
}
export type ReportType = string;
export interface ProductUpdateRequest {
    mrp?: number;
    sku?: string;
    subCategory?: string;
    variantLabel?: string;
    gemstoneType?: string;
    name?: string;
    gemstoneWeightRatti?: number;
    productCode?: string;
    description?: string;
    variants?: Array<ProductVariant>;
    stock?: bigint;
    imageUrl?: string;
    astrologicalPurpose?: string;
    discount?: bigint;
    category?: string;
    benefits?: string;
    price?: number;
    isPersonalised?: boolean;
    gemstoneShape?: string;
}
export interface PathshalaLesson {
    id: string;
    contentHi: string;
    content: string;
    chapterNumber: bigint;
    isPublished: boolean;
    moralLesson: string;
    createdAt: bigint;
    part: string;
    tags: Array<string>;
    moralLessonHi: string;
    summaryHi: string;
    chapterTitleHi: string;
    chapterTitle: string;
    summary: string;
    updatedAt: bigint;
    titleEn: string;
    titleHi: string;
}
export interface CalculatorQAPair {
    question: string;
    answer: string;
    answerHindi: string;
    category: string;
    questionHindi: string;
}
export interface HttpResponse {
    status: bigint;
    body: Uint8Array;
    headers: Array<[string, string]>;
}
export interface PalmPhotoReading {
    id: string;
    readingText: string;
    lineAnnotations: string;
    palmShape: string;
    dominantLine: string;
    userId: Principal;
    createdAt: bigint;
    photoUrl: string;
    luckySigns: string;
    handType: string;
}
export interface Product {
    id: string;
    mrp?: number;
    sku?: string;
    subCategory?: string;
    variantLabel?: string;
    gemstoneType?: string;
    name: string;
    gemstoneWeightRatti?: number;
    createdAt: Time;
    productCode?: string;
    description: string;
    variants?: Array<ProductVariant>;
    stock: bigint;
    imageUrl?: string;
    astrologicalPurpose: string;
    discount?: bigint;
    category: string;
    benefits: string;
    price: number;
    isPersonalised?: boolean;
    gemstoneShape?: string;
}
export interface VratKathaEntry {
    id: string;
    title: string;
    audioBase64: string;
    storyText: string;
    createdAt: Time;
    hasMockAudio: boolean;
    festivalName: string;
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
     * / Admin-only: add a festival event.
     */
    addFestivalEvent(event: FestivalEvent): Promise<void>;
    /**
     * / Admin or productManager: add a gemstone product.
     */
    addGemstoneProduct(entry: GemstoneProduct): Promise<void>;
    /**
     * / Admin-only: add a new holy book entry.
     */
    addHolyBookEntry(entry: HolyBookEntry): Promise<void>;
    /**
     * / Admin-only: add a new Jain encyclopedia article.
     */
    addJainArticle(article: JainEncyclopediaArticle): Promise<void>;
    /**
     * / Admin-only: add a Jain Katha.
     */
    addJainKatha(katha: JainKatha): Promise<void>;
    /**
     * / Admin-only: add a Jain Pathshala entry.
     */
    addJainPathshalaEntry(entry: JainPathshalaEntry): Promise<void>;
    /**
     * / Admin-only: add a media player item.
     */
    addMediaPlayerItem(item: MediaPlayerItem): Promise<void>;
    /**
     * / Public: subscribe to the newsletter. Returns error if email is empty or already subscribed.
     */
    addNewsletterSubscription(email: string, name: string | null, source: string): Promise<{
        __kind__: "ok";
        ok: NewsletterSubscription;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Admin-only: add a panchang city.
     */
    addPanchangCity(city: PanchangCity): Promise<void>;
    /**
     * / Admin-only: add a new Pathshala lesson.
     */
    addPathshalaLesson(lesson: PathshalaLesson): Promise<void>;
    /**
     * / Admin or productManager: add a personalised product.
     */
    addPersonalisedProduct(entry: PersonalisedProduct): Promise<void>;
    /**
     * / Admin-only: add a new suktam entry.
     */
    addSuktam(entry: SuktamEntry): Promise<void>;
    /**
     * / Authenticated users can submit a prasad delivery request for themselves.
     */
    addUserPrasadDeliveryRequest(request: PrasadDeliveryRequest): Promise<void>;
    /**
     * / Admin-only: add a new vrat katha entry.
     */
    addVratKatha(entry: VratKathaEntry): Promise<void>;
    askKrishna(question: string): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    /**
     * / Public: book a slot in a puja event. Returns booking reference or error.
     */
    bookPujaEventSlot(sankalp: SankalpInput): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Admin-only: create an astrologer profile.
     */
    createAstrologerProfile(profile: AstrologerProfile): Promise<void>;
    /**
     * / Admin-only: create a blog article.
     */
    createBlogArticle(article: BlogArticle): Promise<void>;
    /**
     * / Public: anyone can submit a consultation booking request (no login required).
     * / Returns the auto-generated booking reference ID.
     */
    createBookingRequest(fullName: string, email: string, phone: string, birthDate: string, birthTime: string, birthLocation: string, preferredDateTime: string, consultationMode: string, topic: string, specialQuestions: string): Promise<string>;
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
     * / Authenticated user: create a combined vedic reading. Returns the created entry.
     */
    createCombinedVedicReading(palmReadingId: string, birthDate: string, birthTime: string, birthPlace: string, lagnaSign: string, moonSign: string, sunSign: string, activeDasha: string, doshasJson: string, palmInsightsJson: string, combinedInsightsText: string, remediesText: string): Promise<CombinedVedicReading>;
    /**
     * / Authenticated users can book a consultation appointment for themselves.
     */
    createConsultationAppointment(appointment: ConsultationAppointment): Promise<void>;
    /**
     * / Admin-only: create a devotional content entry.
     */
    createDevotionalContent(content: DevotionalContent): Promise<void>;
    createLifeReport(reportType: string, name: string, dob: string, details: string): Promise<string>;
    /**
     * / Authenticated users can create a numerology analysis for themselves.
     */
    createNumerologyRecord(record: NumerologyRecord): Promise<void>;
    /**
     * / Authenticated users can place an order for themselves.
     */
    createOrder(order: Order): Promise<void>;
    /**
     * / Authenticated user: create a palm photo reading. Returns the created entry.
     */
    createPalmPhotoReading(photoUrl: string, handType: string, palmShape: string, lineAnnotations: string, readingText: string, dominantLine: string, luckySigns: string): Promise<PalmPhotoReading>;
    /**
     * / Admin-only: create a new palmistry content entry. Returns the created entry.
     */
    createPalmistryContent(title: string, titleHi: string, category: string, lineOrPalmType: string, descriptionEn: string, descriptionHi: string, characteristicsEn: string, characteristicsHi: string, locationOnPalm: string, benefitsEn: string, benefitsHi: string): Promise<PalmistryContent>;
    /**
     * / Admin or productManager: create a product.
     */
    createProduct(product: Product): Promise<void>;
    /**
     * / Authenticated users can create a puja booking for themselves.
     */
    createPujaBooking(booking: PujaBooking): Promise<void>;
    /**
     * / Admin-only: create a new puja event. Returns the generated id.
     */
    createPujaEvent(pujaName: string, pujaNameHindi: string, date: string, time: string, description: string, price: bigint, slotsAvailable: bigint, location: string, deity: string, isActive: boolean): Promise<string>;
    /**
     * / Admin-only: create a puja report for a completed booking.
     */
    createPujaReport(report: PujaReport): Promise<void>;
    /**
     * / Admin-only: create a puja type.
     */
    createPujaType(pujaType: PujaType): Promise<void>;
    /**
     * / Authenticated users can request a report for themselves.
     */
    createReportRequest(request: ReportRequest): Promise<void>;
    /**
     * / Authenticated users can create a service booking for themselves. Returns the booking id.
     */
    createServiceBooking(booking: ServiceBooking): Promise<string>;
    createStripeSession(productType: string, amount: bigint, _metadata: string): Promise<string>;
    /**
     * / Admin or productManager: create a new product sub-category. Returns the generated id.
     */
    createSubCategory(name: string, nameCode: string, autoCodePrefix: string): Promise<string>;
    /**
     * / Admin-only: create a temple entry.
     */
    createTemple(temple: Temple): Promise<void>;
    /**
     * / Admin-only: create a new vastu content entry. Returns the created entry.
     */
    createVastuContent(title: string, titleHi: string, category: string, directionOrRoom: string, planetaryRuler: string, planetaryRulerHi: string, effectsEn: string, effectsHi: string, doshaEn: string, doshaHi: string, remediesEn: string, remediesHi: string, yantra: string, elementsInvolved: string, tipsEn: string, tipsHi: string): Promise<VastuContent>;
    /**
     * / Authenticated user: create a vastu room check. Returns the created entry.
     */
    createVastuRoomCheck(floorPlanUrl: string, roomType: string, roomDimensions: string, entranceDirection: string, complianceScore: bigint, issuesJson: string, remediesJson: string, elementBalance: string): Promise<VastuRoomCheck>;
    /**
     * / Admin-only: create a web story.
     */
    createWebStory(story: WebStory): Promise<void>;
    /**
     * / Authenticated users can delete their own astro chart.
     */
    deleteAstroChart(id: string): Promise<boolean>;
    /**
     * / Admin-only: delete a bhajan entry.
     */
    deleteBhajan(id: string): Promise<void>;
    /**
     * / Admin-only: delete a blog article.
     */
    deleteBlogArticle(id: string): Promise<void>;
    /**
     * / Authenticated user: delete a combined vedic reading they own. Returns true if deleted.
     */
    deleteCombinedVedicReading(id: string): Promise<boolean>;
    /**
     * / Admin-only: delete a devotional content entry.
     */
    deleteDevotionalContent(id: string): Promise<void>;
    /**
     * / Admin-only: delete a festival event.
     */
    deleteFestivalEvent(id: string): Promise<void>;
    /**
     * / Admin or productManager: delete a gemstone product by sku.
     */
    deleteGemstoneProduct(sku: string): Promise<void>;
    /**
     * / Admin-only: delete a holy book entry.
     */
    deleteHolyBookEntry(id: string): Promise<void>;
    /**
     * / Admin-only: delete a Jain encyclopedia article.
     */
    deleteJainArticle(id: string): Promise<void>;
    /**
     * / Admin-only: delete a Jain Katha.
     */
    deleteJainKatha(id: string): Promise<void>;
    /**
     * / Admin-only: delete a Jain Pathshala entry.
     */
    deleteJainPathshalaEntry(id: string): Promise<void>;
    /**
     * / Authenticated users can delete their own kundali match. Returns true if deleted.
     */
    deleteKundaliMatch(id: string): Promise<boolean>;
    /**
     * / Admin-only: delete a newsletter subscription by email.
     */
    deleteNewsletterSubscription(email: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Authenticated user: delete a palm photo reading they own. Returns true if deleted.
     */
    deletePalmPhotoReading(id: string): Promise<boolean>;
    /**
     * / Admin-only: delete a palmistry content entry. Returns true if deleted, false if not found.
     */
    deletePalmistryContent(id: string): Promise<boolean>;
    /**
     * / Admin-only: delete a panchang city.
     */
    deletePanchangCity(id: string): Promise<void>;
    /**
     * / Admin-only: delete a Pathshala lesson.
     */
    deletePathshalaLesson(id: string): Promise<void>;
    /**
     * / Admin or productManager: delete a personalised product.
     */
    deletePersonalisedProduct(id: string): Promise<void>;
    /**
     * / Admin-only: delete a product.
     */
    deleteProduct(id: string): Promise<void>;
    /**
     * / Admin-only: delete a puja event. Returns true if deleted.
     */
    deletePujaEvent(id: string): Promise<boolean>;
    /**
     * / Admin-only: delete a puja type.
     */
    deletePujaType(id: string): Promise<void>;
    /**
     * / Admin or productManager: delete a product sub-category. Returns true if deleted.
     */
    deleteSubCategory(id: string): Promise<boolean>;
    /**
     * / Admin-only: delete a suktam entry.
     */
    deleteSuktam(id: string): Promise<void>;
    /**
     * / Admin-only: delete a vastu content entry. Returns true if deleted, false if not found.
     */
    deleteVastuContent(id: string): Promise<boolean>;
    /**
     * / Authenticated user: delete a vastu room check they own. Returns true if deleted.
     */
    deleteVastuRoomCheck(id: string): Promise<boolean>;
    /**
     * / Admin-only: delete a vrat katha entry.
     */
    deleteVratKatha(id: string): Promise<void>;
    /**
     * / Admin-only: delete a web story.
     */
    deleteWebStory(id: string): Promise<void>;
    /**
     * / Admin or productManager: generate a product code.
     * / If manualCode is provided, it is returned as-is.
     * / Otherwise auto-generates PS_{PREFIX}_{seq:3-digits-padded}.
     */
    generateProductCode(subCategoryPrefix: string, manualCode: string | null): Promise<string>;
    /**
     * / Public: anyone may browse astrologer profiles.
     */
    getAllAstrologerProfiles(): Promise<Array<AstrologerProfile>>;
    /**
     * / Public: get all blog articles (admin may see unpublished; public sees all).
     */
    getAllBlogArticles(): Promise<Array<BlogArticle>>;
    /**
     * / Admin-only: list all consultation booking requests.
     */
    getAllBookingRequests(): Promise<Array<ConsultationBookingRequest>>;
    /**
     * / Public: get all calculator FAQs.
     */
    getAllCalculatorFAQs(): Promise<Array<CalculatorFAQ>>;
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
     * / Public: get all festival events.
     */
    getAllFestivalEvents(): Promise<Array<FestivalEvent>>;
    /**
     * / Public: get all gemstone products.
     */
    getAllGemstoneProducts(): Promise<Array<GemstoneProduct>>;
    /**
     * / Public: get all Jain encyclopedia articles.
     */
    getAllJainArticles(): Promise<Array<JainEncyclopediaArticle>>;
    /**
     * / Public: get all Jain Kathas.
     */
    getAllJainKathas(): Promise<Array<JainKatha>>;
    /**
     * / Public: get all Jain Pathshala entries.
     */
    getAllJainPathshalaEntries(): Promise<Array<JainPathshalaEntry>>;
    getAllLifeReports(): Promise<Array<LifeReport>>;
    /**
     * / Public: get all panchang cities.
     */
    getAllPanchangCities(): Promise<Array<PanchangCity>>;
    /**
     * / Admin-only: get all Pathshala lessons (published and unpublished).
     */
    getAllPathshalaLessons(): Promise<Array<PathshalaLesson>>;
    /**
     * / Public: get all personalised products.
     */
    getAllPersonalisedProducts(): Promise<Array<PersonalisedProduct>>;
    /**
     * / Admin-only: list all product manager principals.
     */
    getAllProductManagers(): Promise<Array<Principal>>;
    /**
     * / Public: anyone may browse products.
     */
    getAllProducts(): Promise<Array<Product>>;
    /**
     * / Public: get all puja events (active only for non-admins).
     */
    getAllPujaEvents(): Promise<Array<PujaEvent>>;
    /**
     * / Admin-only: get all puja events including inactive.
     */
    getAllPujaEventsAdmin(): Promise<Array<PujaEvent>>;
    /**
     * / Admin-only: get all puja reports.
     */
    getAllPujaReports(): Promise<Array<PujaReport>>;
    /**
     * / Public: anyone may browse puja types.
     */
    getAllPujaTypes(): Promise<Array<PujaType>>;
    /**
     * / Public: anyone may browse temples.
     */
    getAllTemples(): Promise<Array<Temple>>;
    /**
     * / Admin-only: list all user profiles.
     */
    getAllUserProfiles(): Promise<Array<[Principal, UserProfile]>>;
    /**
     * / Public: get all web stories.
     */
    getAllWebStories(): Promise<Array<WebStory>>;
    /**
     * / Authenticated users can get a single astro chart by id (only their own).
     */
    getAstroChart(id: string): Promise<AstroChart | null>;
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
     * / Public: get a blog article by its slug.
     */
    getBlogArticleBySlug(slug: string): Promise<BlogArticle | null>;
    /**
     * / Public: look up a booking by its reference ID (for confirmation page).
     */
    getBookingRequest(refId: string): Promise<ConsultationBookingRequest | null>;
    /**
     * / Public: get the FAQ for a specific calculator by calculatorId.
     */
    getCalculatorFAQ(calculatorId: string): Promise<CalculatorFAQ | null>;
    /**
     * / Get the calling user's own profile.
     */
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    /**
     * / Public: get panchang cities grouped by state name.
     * / Returns an array of (stateName, [PanchangCity]) tuples.
     */
    getCitiesByState(): Promise<Array<[string, Array<PanchangCity>]>>;
    /**
     * / Get a single combined vedic reading by id (owner or admin).
     */
    getCombinedVedicReading(id: string): Promise<CombinedVedicReading | null>;
    /**
     * / Public: get a single devotional content entry.
     */
    getDevotionalContent(id: string): Promise<DevotionalContent | null>;
    /**
     * / Public: get festival events filtered by faith (Hindu/Jain/Sikh/Tamil/Malayalam).
     */
    getFestivalEventsByFaith(faith: string): Promise<Array<FestivalEvent>>;
    /**
     * / Public: get gemstone products filtered by gemstone type (e.g. AMETHYST).
     */
    getGemstoneProductsByType(gemstoneType: string): Promise<Array<GemstoneProduct>>;
    /**
     * / Public: anyone may browse holy book entries, optionally filtered by bookTitle.
     */
    getHolyBookEntries(bookTitle: string): Promise<Array<HolyBookEntry>>;
    /**
     * / Public: get a single holy book entry by id.
     */
    getHolyBookEntryById(id: string): Promise<HolyBookEntry | null>;
    /**
     * / Public: get a single Jain encyclopedia article by id.
     */
    getJainArticleById(id: string): Promise<JainEncyclopediaArticle | null>;
    /**
     * / Public: get all Jain encyclopedia articles for a given volume number.
     */
    getJainArticlesByVolume(volumeNumber: bigint): Promise<Array<JainEncyclopediaArticle>>;
    /**
     * / Public: get Jain Kathas filtered by parv (occasion/festival).
     */
    getJainKathasByParv(parv: string): Promise<Array<JainKatha>>;
    /**
     * / Public: get Jain Pathshala entries filtered by category.
     */
    getJainPathshalaEntriesByCategory(category: string): Promise<Array<JainPathshalaEntry>>;
    getKrishnaHistory(): Promise<Array<ChatMessage>>;
    /**
     * / Authenticated users can retrieve a single kundali match by id (only their own).
     */
    getKundaliMatchById(id: string): Promise<KundaliMatch | null>;
    /**
     * / Authenticated users can retrieve all their own kundali match results, sorted newest first.
     */
    getKundaliMatches(): Promise<Array<KundaliMatch>>;
    getLifeReport(reportId: string): Promise<LifeReportPublic | null>;
    /**
     * / Public: get all media player items.
     */
    getMediaPlayerItems(): Promise<Array<MediaPlayerItem>>;
    /**
     * / Public: get media player items filtered by contentType (aarti/chalisa/mantra/bhajan/katha).
     */
    getMediaPlayerItemsByType(contentType: string): Promise<Array<MediaPlayerItem>>;
    /**
     * / Authenticated user: get all their own combined vedic readings.
     */
    getMyCombinedVedicReadings(): Promise<Array<CombinedVedicReading>>;
    /**
     * / Authenticated user: get all their own palm photo readings.
     */
    getMyPalmPhotoReadings(): Promise<Array<PalmPhotoReading>>;
    /**
     * / Authenticated user: get all their own vastu room checks.
     */
    getMyVastuRoomChecks(): Promise<Array<VastuRoomCheck>>;
    /**
     * / Admin-only: get all newsletter subscriptions.
     */
    getNewsletterSubscriptions(): Promise<Array<NewsletterSubscription>>;
    /**
     * / Get a single palm photo reading by id (owner or admin).
     */
    getPalmPhotoReading(id: string): Promise<PalmPhotoReading | null>;
    /**
     * / Public: get a single palmistry content entry by id.
     */
    getPalmistryContent(id: string): Promise<PalmistryContent | null>;
    /**
     * / Public: anyone may browse all palmistry content entries.
     */
    getPalmistryContents(): Promise<Array<PalmistryContent>>;
    /**
     * / Public: get a single Pathshala lesson by id.
     */
    getPathshalaLesson(id: string): Promise<PathshalaLesson | null>;
    /**
     * / Public: get published Pathshala lessons filtered by part (Bhag-1 or Bhag-2).
     */
    getPathshalaLessonsByPart(part: string): Promise<Array<PathshalaLesson>>;
    /**
     * / Admin-only: list all pending prasad deliveries.
     */
    getPendingPrasadDeliveries(): Promise<Array<PrasadDeliveryRequest>>;
    /**
     * / Public: get a single product.
     */
    getProduct(id: string): Promise<Product | null>;
    /**
     * / Public: get products filtered by category.
     */
    getProductsByCategory(category: string): Promise<Array<Product>>;
    /**
     * / Public: get only published blog articles.
     */
    getPublishedBlogArticles(): Promise<Array<BlogArticle>>;
    /**
     * / Public: get only published Pathshala lessons.
     */
    getPublishedPathshalaLessons(): Promise<Array<PathshalaLesson>>;
    /**
     * / Public: get only published web stories.
     */
    getPublishedWebStories(): Promise<Array<WebStory>>;
    /**
     * / Public: get a single puja type by id.
     */
    getPujaTypeById(id: string): Promise<PujaType | null>;
    /**
     * / Admin-only: get all service bookings for review.
     */
    getServiceBookings(): Promise<Array<ServiceBooking>>;
    /**
     * / Authenticated users can check a Stripe session status (e.g. after checkout).
     */
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    /**
     * / Public: get all product sub-categories.
     */
    getSubCategories(): Promise<Array<ProductSubCategory>>;
    /**
     * / Public: get a single suktam entry by id.
     */
    getSuktamById(id: string): Promise<SuktamEntry | null>;
    /**
     * / Public: anyone may browse suktam entries.
     */
    getSuktams(): Promise<Array<SuktamEntry>>;
    /**
     * / Authenticated users can retrieve their own astro charts.
     */
    getUserAstroCharts(): Promise<Array<AstroChart>>;
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
     * / Authenticated users can retrieve their own palmistry readings.
     */
    getUserPalmistryReadings(): Promise<Array<PalmistryReading>>;
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
     * / Authenticated users can retrieve their own puja reports.
     */
    getUserPujaReports(): Promise<Array<PujaReport>>;
    getUserPurchases(): Promise<Array<Purchase>>;
    /**
     * / Users may only fetch their own report requests; admins may fetch any user's.
     */
    getUserReportRequests(userId: Principal): Promise<Array<ReportRequest>>;
    /**
     * / Authenticated users can retrieve their own service bookings.
     */
    getUserServiceBookings(): Promise<Array<ServiceBooking>>;
    /**
     * / Public: get a single vastu content entry by id.
     */
    getVastuContent(id: string): Promise<VastuContent | null>;
    /**
     * / Public: anyone may browse all vastu content entries.
     */
    getVastuContents(): Promise<Array<VastuContent>>;
    /**
     * / Get a single vastu room check by id (owner or admin).
     */
    getVastuRoomCheck(id: string): Promise<VastuRoomCheck | null>;
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
     * / Returns true if the caller has productManager role.
     */
    isProductManager(): Promise<boolean>;
    /**
     * / Public: check whether Stripe has been configured.
     */
    isStripeConfigured(): Promise<boolean>;
    /**
     * / Authenticated users can add funds to their own wallet (recharge).
     */
    rechargeWallet(userId: Principal, amount: number, transaction: WalletTransaction): Promise<void>;
    /**
     * / Admin-only: remove a media player item.
     */
    removeMediaPlayerItem(id: string): Promise<void>;
    /**
     * / Admin-only: revoke productManager role from a user.
     */
    revokeProductManagerRole(userId: Principal): Promise<void>;
    /**
     * / Authenticated users can save an astrology chart for themselves.
     */
    saveAstroChart(chart: AstroChart): Promise<void>;
    /**
     * / Admin-only: save (create or replace) a calculator FAQ.
     */
    saveCalculatorFAQ(faq: CalculatorFAQ): Promise<void>;
    /**
     * / Save / update the calling user's own profile.
     */
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / Authenticated users can save a kundali match result for themselves.
     */
    saveKundaliMatch(match: KundaliMatchInput): Promise<string>;
    /**
     * / Authenticated users can save a palmistry reading for themselves.
     */
    savePalmistryReading(reading: PalmistryReading): Promise<void>;
    /**
     * / Authenticated users can save their own virtual temple configuration.
     */
    saveVirtualTempleConfig(config: VirtualTempleConfig): Promise<void>;
    /**
     * / Admin-only: grant productManager role to a user.
     */
    setProductManagerRole(userId: Principal): Promise<void>;
    /**
     * / Admin-only: set the Stripe configuration.
     */
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    /**
     * / Public: unsubscribe from the newsletter (sets isActive = false).
     */
    unsubscribeNewsletter(email: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Admin-only: update an existing bhajan entry.
     */
    updateBhajan(entry: BhajanEntry): Promise<void>;
    /**
     * / Admin-only: update an existing blog article.
     */
    updateBlogArticle(article: BlogArticle): Promise<void>;
    /**
     * / Admin-only: update the status of a booking request.
     */
    updateBookingRequestStatus(refId: string, status: string): Promise<void>;
    /**
     * / Admin-only: update an existing calculator FAQ by id.
     */
    updateCalculatorFAQ(id: string, faq: CalculatorFAQ): Promise<void>;
    /**
     * / Authenticated user: update an existing combined vedic reading they own. Returns updated entry or null.
     */
    updateCombinedVedicReading(id: string, palmReadingId: string, birthDate: string, birthTime: string, birthPlace: string, lagnaSign: string, moonSign: string, sunSign: string, activeDasha: string, doshasJson: string, palmInsightsJson: string, combinedInsightsText: string, remediesText: string): Promise<CombinedVedicReading | null>;
    /**
     * / Admin-only: update appointment status and notes.
     */
    updateConsultationAppointment(id: string, status: string, notes: string): Promise<void>;
    /**
     * / Admin-only: update an existing devotional content entry.
     */
    updateDevotionalContent(content: DevotionalContent): Promise<void>;
    /**
     * / Admin-only: update an existing festival event.
     */
    updateFestivalEvent(event: FestivalEvent): Promise<void>;
    /**
     * / Admin or productManager: update a gemstone product (full replace by sku).
     */
    updateGemstoneProduct(entry: GemstoneProduct): Promise<void>;
    /**
     * / Admin-only: update an existing holy book entry.
     */
    updateHolyBookEntry(entry: HolyBookEntry): Promise<void>;
    /**
     * / Admin-only: update an existing Jain encyclopedia article.
     */
    updateJainArticle(article: JainEncyclopediaArticle): Promise<void>;
    /**
     * / Admin-only: update an existing Jain Katha.
     */
    updateJainKatha(katha: JainKatha): Promise<void>;
    /**
     * / Admin-only: update an existing Jain Pathshala entry.
     */
    updateJainPathshalaEntry(entry: JainPathshalaEntry): Promise<void>;
    updateLifeReport(reportId: string, status: string, content: string): Promise<void>;
    /**
     * / Admin-only: update order payment status.
     */
    updateOrderPaymentStatus(id: string, paymentStatus: string, stripePaymentIntentId: string): Promise<void>;
    /**
     * / Authenticated user: update an existing palm photo reading they own. Returns updated entry or null.
     */
    updatePalmPhotoReading(id: string, photoUrl: string, handType: string, palmShape: string, lineAnnotations: string, readingText: string, dominantLine: string, luckySigns: string): Promise<PalmPhotoReading | null>;
    /**
     * / Admin-only: update an existing palmistry content entry. Returns the updated entry or null if not found.
     */
    updatePalmistryContent(id: string, title: string, titleHi: string, category: string, lineOrPalmType: string, descriptionEn: string, descriptionHi: string, characteristicsEn: string, characteristicsHi: string, locationOnPalm: string, benefitsEn: string, benefitsHi: string): Promise<PalmistryContent | null>;
    /**
     * / Admin-only: update an existing panchang city.
     */
    updatePanchangCity(city: PanchangCity): Promise<void>;
    /**
     * / Admin-only: update an existing Pathshala lesson.
     */
    updatePathshalaLesson(id: string, lesson: PathshalaLesson): Promise<void>;
    /**
     * / Admin or productManager: update a personalised product (full replace).
     */
    updatePersonalisedProduct(entry: PersonalisedProduct): Promise<void>;
    /**
     * / Admin-only: update the status of a prasad delivery request.
     */
    updatePrasadDeliveryStatus(id: string, status: string): Promise<void>;
    /**
     * / Admin or productManager: replace a product entirely (backward-compatible full update).
     */
    updateProduct(product: Product): Promise<void>;
    /**
     * / Admin or productManager: partial update — only supplied fields are changed.
     * / Admin or productManager: partial update — only supplied fields are changed.
     */
    updateProductFields(id: string, updates: ProductUpdateRequest): Promise<void>;
    /**
     * / Admin or productManager: update stock for a product.
     */
    updateProductStock(id: string, stock: bigint): Promise<void>;
    /**
     * / Admin or productManager: update only the variants array for a product (gemstone weight variants).
     */
    updateProductVariants(id: string, variants: Array<ProductVariant>): Promise<void>;
    /**
     * / Admin-only: update an existing puja event. Returns true if updated.
     */
    updatePujaEvent(id: string, pujaName: string, pujaNameHindi: string, date: string, time: string, description: string, price: bigint, slotsAvailable: bigint, location: string, deity: string, isActive: boolean): Promise<boolean>;
    /**
     * / Admin-only: update an existing puja report.
     */
    updatePujaReport(id: string, report: PujaReport): Promise<void>;
    /**
     * / Admin-only: update an existing puja type.
     */
    updatePujaType(pujaType: PujaType): Promise<void>;
    /**
     * / Admin-only: update report status and content.
     */
    updateReportRequest(id: string, status: string, content: string): Promise<void>;
    /**
     * / Admin-only: update the status of a service booking.
     */
    updateServiceBookingStatus(id: string, status: string): Promise<void>;
    /**
     * / Admin or productManager: update a product sub-category. Returns true if updated.
     */
    updateSubCategory(id: string, name: string, nameCode: string, autoCodePrefix: string): Promise<boolean>;
    /**
     * / Admin-only: update an existing suktam entry.
     */
    updateSuktam(entry: SuktamEntry): Promise<void>;
    /**
     * / Admin-only: update an existing vastu content entry. Returns the updated entry or null if not found.
     */
    updateVastuContent(id: string, title: string, titleHi: string, category: string, directionOrRoom: string, planetaryRuler: string, planetaryRulerHi: string, effectsEn: string, effectsHi: string, doshaEn: string, doshaHi: string, remediesEn: string, remediesHi: string, yantra: string, elementsInvolved: string, tipsEn: string, tipsHi: string): Promise<VastuContent | null>;
    /**
     * / Authenticated user: update an existing vastu room check they own. Returns updated entry or null.
     */
    updateVastuRoomCheck(id: string, floorPlanUrl: string, roomType: string, roomDimensions: string, entranceDirection: string, complianceScore: bigint, issuesJson: string, remediesJson: string, elementBalance: string): Promise<VastuRoomCheck | null>;
    /**
     * / Admin-only: update an existing vrat katha entry.
     */
    updateVratKatha(entry: VratKathaEntry): Promise<void>;
    /**
     * / Admin-only: update an existing web story.
     */
    updateWebStory(story: WebStory): Promise<void>;
    verifyStripePayment(sessionId: string): Promise<boolean>;
}
