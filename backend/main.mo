import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import List "mo:core/List";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // ─── User Profile (Principal-keyed, required by instructions) ───────────────

  public type UserProfile = {
    name : Text;
    email : Text;
    birthDate : Text;
    birthTime : Text;
    birthPlace : Text;
    gotra : Text;
    createdAt : Time.Time;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  /// Get the calling user's own profile.
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can get their profile");
    };
    userProfiles.get(caller);
  };

  /// Save / update the calling user's own profile.
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save their profile");
    };
    userProfiles.add(caller, profile);
  };

  /// Fetch another user's profile. Users may only fetch their own; admins may fetch any.
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  /// Admin-only: list all user profiles.
  public query ({ caller }) func getAllUserProfiles() : async [(Principal, UserProfile)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can list all user profiles");
    };
    userProfiles.toArray();
  };

  // ─── Temple ──────────────────────────────────────────────────────────────────

  public type Temple = {
    id : Text;
    name : Text;
    location : Text;
    deity : Text;
    description : Text;
    createdAt : Time.Time;
  };

  let temples = Map.empty<Text, Temple>();

  /// Admin-only: create a temple entry.
  public shared ({ caller }) func createTemple(temple : Temple) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create temples");
    };
    switch (temples.get(temple.id)) {
      case (?_) { Runtime.trap("Temple already exists with id: " # temple.id) };
      case (null) { temples.add(temple.id, temple) };
    };
  };

  /// Public: anyone may browse temples.
  public query func getAllTemples() : async [Temple] {
    let arr = temples.values().toArray();
    arr.sort(func(a : Temple, b : Temple) : Order.Order { Text.compare(a.id, b.id) });
  };

  // ─── Puja Bookings ───────────────────────────────────────────────────────────

  public type PujaBooking = {
    id : Text;
    userId : Principal;
    templeId : Text;
    devoteeName : Text;
    gotra : Text;
    pujaType : Text;
    preferredDate : Text;
    specialWishes : Text;
    status : Text;
    createdAt : Time.Time;
  };

  let pujaBookings = Map.empty<Text, PujaBooking>();

  /// Authenticated users can create a puja booking for themselves.
  public shared ({ caller }) func createPujaBooking(booking : PujaBooking) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create puja bookings");
    };
    if (caller != booking.userId) {
      Runtime.trap("Unauthorized: Cannot create a booking for another user");
    };
    switch (pujaBookings.get(booking.id)) {
      case (?_) { Runtime.trap("Puja booking already exists with id: " # booking.id) };
      case (null) { pujaBookings.add(booking.id, booking) };
    };
  };

  /// Users may only fetch their own bookings; admins may fetch any user's bookings.
  public query ({ caller }) func getUserPujaBookings(userId : Principal) : async [PujaBooking] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own puja bookings");
    };
    let result = List.empty<PujaBooking>();
    for ((_, b) in pujaBookings.entries()) {
      if (b.userId == userId) { result.add(b) };
    };
    result.toArray();
  };

  /// Admin-only: update the status of a puja booking.
  public shared ({ caller }) func handlePujaBooking(bookingId : Text, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can handle puja bookings");
    };
    switch (pujaBookings.get(bookingId)) {
      case (null) { Runtime.trap("Puja booking not found with id: " # bookingId) };
      case (?existingBooking) {
        let updatedBooking : PujaBooking = { existingBooking with status };
        pujaBookings.add(bookingId, updatedBooking);
      };
    };
  };

  // ─── Chadhava Offerings ──────────────────────────────────────────────────────

  public type ChadhavaOffering = {
    id : Text;
    userId : Principal;
    templeId : Text;
    items : [Text];
    status : Text;
    createdAt : Time.Time;
  };

  let chadhavaOfferings = Map.empty<Text, ChadhavaOffering>();

  /// Authenticated users can submit a chadhava offering for themselves.
  public shared ({ caller }) func createChadhavaOffering(offering : ChadhavaOffering) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create chadhava offerings");
    };
    if (caller != offering.userId) {
      Runtime.trap("Unauthorized: Cannot create an offering for another user");
    };
    switch (chadhavaOfferings.get(offering.id)) {
      case (?_) { Runtime.trap("Chadhava offering already exists with id: " # offering.id) };
      case (null) { chadhavaOfferings.add(offering.id, offering) };
    };
  };

  /// Users may only fetch their own offerings; admins may fetch any user's offerings.
  public query ({ caller }) func getUserChadhavaOfferings(userId : Principal) : async [ChadhavaOffering] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own chadhava offerings");
    };
    let result = List.empty<ChadhavaOffering>();
    for ((_, o) in chadhavaOfferings.entries()) {
      if (o.userId == userId) { result.add(o) };
    };
    result.toArray();
  };

  // ─── Prasad Delivery Requests ────────────────────────────────────────────────

  public type PrasadDeliveryRequest = {
    id : Text;
    userId : Principal;
    templeId : Text;
    address : Text;
    mobileNumber : Text;
    status : Text;
    createdAt : Time.Time;
  };

  let prasadDeliveryRequests = Map.empty<Text, PrasadDeliveryRequest>();

  /// Authenticated users can submit a prasad delivery request for themselves.
  public shared ({ caller }) func addUserPrasadDeliveryRequest(request : PrasadDeliveryRequest) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can request prasad delivery");
    };
    if (caller != request.userId) {
      Runtime.trap("Unauthorized: Cannot create a delivery request for another user");
    };
    switch (prasadDeliveryRequests.get(request.id)) {
      case (?_) { Runtime.trap("Prasad delivery request already exists with id: " # request.id) };
      case (null) { prasadDeliveryRequests.add(request.id, request) };
    };
  };

  /// Users may only fetch their own delivery requests; admins may fetch any.
  public query ({ caller }) func getUserPrasadDeliveryRequests(userId : Principal) : async [PrasadDeliveryRequest] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own prasad delivery requests");
    };
    let result = List.empty<PrasadDeliveryRequest>();
    for ((_, r) in prasadDeliveryRequests.entries()) {
      if (r.userId == userId) { result.add(r) };
    };
    result.toArray();
  };

  /// Admin-only: update the status of a prasad delivery request.
  public shared ({ caller }) func updatePrasadDeliveryStatus(id : Text, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update prasad delivery status");
    };
    switch (prasadDeliveryRequests.get(id)) {
      case (null) { Runtime.trap("Prasad delivery request not found with id: " # id) };
      case (?existingRequest) {
        let updatedRequest : PrasadDeliveryRequest = { existingRequest with status };
        prasadDeliveryRequests.add(id, updatedRequest);
      };
    };
  };

  /// Admin-only: list all pending prasad deliveries.
  public query ({ caller }) func getPendingPrasadDeliveries() : async [PrasadDeliveryRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view pending prasad deliveries");
    };
    let result = List.empty<PrasadDeliveryRequest>();
    for ((_, r) in prasadDeliveryRequests.entries()) {
      if (r.status == "pending") { result.add(r) };
    };
    result.toArray();
  };

  /// Admin-only: get all delivery requests and puja bookings.
  public query ({ caller }) func getAllDeliveryRequests() : async ([(Text, PrasadDeliveryRequest)], [(Text, PujaBooking)]) {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all delivery requests");
    };
    (prasadDeliveryRequests.toArray(), pujaBookings.toArray());
  };

  // ─── Astrologer Profiles ─────────────────────────────────────────────────────

  public type AstrologerProfile = {
    id : Text;
    name : Text;
    specializations : [Text];
    bio : Text;
    experienceYears : Nat;
    rating : Float;
    perMinuteRate : Float;
    languages : [Text];
    createdAt : Time.Time;
  };

  let astrologerProfiles = Map.empty<Text, AstrologerProfile>();

  /// Admin-only: create an astrologer profile.
  public shared ({ caller }) func createAstrologerProfile(profile : AstrologerProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create astrologer profiles");
    };
    switch (astrologerProfiles.get(profile.id)) {
      case (?_) { Runtime.trap("Astrologer profile already exists with id: " # profile.id) };
      case (null) { astrologerProfiles.add(profile.id, profile) };
    };
  };

  /// Public: anyone may browse astrologer profiles.
  public query func getAllAstrologerProfiles() : async [AstrologerProfile] {
    astrologerProfiles.values().toArray();
  };

  /// Public: get a single astrologer profile by id.
  public query func getAstrologerProfile(id : Text) : async ?AstrologerProfile {
    astrologerProfiles.get(id);
  };

  // ─── Consultation Appointments ───────────────────────────────────────────────

  public type ConsultationAppointment = {
    id : Text;
    userId : Principal;
    astrologerId : Text;
    preferredDateTime : Text;
    topic : Text;
    specialQuestions : Text;
    status : Text; // pending / confirmed / cancelled
    notes : Text;
    createdAt : Time.Time;
  };

  let consultationAppointments = Map.empty<Text, ConsultationAppointment>();

  /// Authenticated users can book a consultation appointment for themselves.
  public shared ({ caller }) func createConsultationAppointment(appointment : ConsultationAppointment) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can book consultations");
    };
    if (caller != appointment.userId) {
      Runtime.trap("Unauthorized: Cannot book an appointment for another user");
    };
    switch (consultationAppointments.get(appointment.id)) {
      case (?_) { Runtime.trap("Appointment already exists with id: " # appointment.id) };
      case (null) { consultationAppointments.add(appointment.id, appointment) };
    };
  };

  /// Users may only fetch their own appointments; admins may fetch any user's.
  public query ({ caller }) func getUserConsultationAppointments(userId : Principal) : async [ConsultationAppointment] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own consultation appointments");
    };
    let result = List.empty<ConsultationAppointment>();
    for ((_, a) in consultationAppointments.entries()) {
      if (a.userId == userId) { result.add(a) };
    };
    result.toArray();
  };

  /// Admin-only: list all appointments (for astrologer/admin dashboard).
  public query ({ caller }) func getAllConsultationAppointments() : async [ConsultationAppointment] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all consultation appointments");
    };
    consultationAppointments.values().toArray();
  };

  /// Admin-only: update appointment status and notes.
  public shared ({ caller }) func updateConsultationAppointment(id : Text, status : Text, notes : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update consultation appointments");
    };
    switch (consultationAppointments.get(id)) {
      case (null) { Runtime.trap("Appointment not found with id: " # id) };
      case (?existing) {
        let updated : ConsultationAppointment = { existing with status; notes };
        consultationAppointments.add(id, updated);
      };
    };
  };

  // ─── Spiritual Shop Products ─────────────────────────────────────────────────

  public type Product = {
    id : Text;
    name : Text;
    category : Text;
    price : Float;
    description : Text;
    benefits : Text;
    astrologicalPurpose : Text;
    stock : Nat;
    createdAt : Time.Time;
  };

  let products = Map.empty<Text, Product>();

  /// Admin-only: create a product.
  public shared ({ caller }) func createProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    switch (products.get(product.id)) {
      case (?_) { Runtime.trap("Product already exists with id: " # product.id) };
      case (null) { products.add(product.id, product) };
    };
  };

  /// Admin-only: update a product.
  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(product.id)) {
      case (null) { Runtime.trap("Product not found with id: " # product.id) };
      case (?_) { products.add(product.id, product) };
    };
  };

  /// Admin-only: delete a product.
  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found with id: " # id) };
      case (?_) { products.remove(id) };
    };
  };

  /// Public: anyone may browse products.
  public query func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  /// Public: get a single product.
  public query func getProduct(id : Text) : async ?Product {
    products.get(id);
  };

  // ─── Orders ──────────────────────────────────────────────────────────────────

  public type OrderItem = {
    productId : Text;
    quantity : Nat;
    unitPrice : Float;
  };

  public type Order = {
    id : Text;
    userId : Principal;
    items : [OrderItem];
    total : Float;
    paymentStatus : Text; // pending / paid / failed
    stripePaymentIntentId : Text;
    createdAt : Time.Time;
  };

  let orders = Map.empty<Text, Order>();

  /// Authenticated users can place an order for themselves.
  public shared ({ caller }) func createOrder(order : Order) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can place orders");
    };
    if (caller != order.userId) {
      Runtime.trap("Unauthorized: Cannot place an order for another user");
    };
    switch (orders.get(order.id)) {
      case (?_) { Runtime.trap("Order already exists with id: " # order.id) };
      case (null) { orders.add(order.id, order) };
    };
  };

  /// Users may only fetch their own orders; admins may fetch any user's.
  public query ({ caller }) func getUserOrders(userId : Principal) : async [Order] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own orders");
    };
    let result = List.empty<Order>();
    for ((_, o) in orders.entries()) {
      if (o.userId == userId) { result.add(o) };
    };
    result.toArray();
  };

  /// Admin-only: update order payment status.
  public shared ({ caller }) func updateOrderPaymentStatus(id : Text, paymentStatus : Text, stripePaymentIntentId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order payment status");
    };
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found with id: " # id) };
      case (?existing) {
        let updated : Order = { existing with paymentStatus; stripePaymentIntentId };
        orders.add(id, updated);
      };
    };
  };

  // ─── Wallet ──────────────────────────────────────────────────────────────────

  public type WalletTransaction = {
    id : Text;
    userId : Principal;
    amount : Float;
    transactionType : Text; // credit / debit
    description : Text;
    createdAt : Time.Time;
  };

  let walletBalances = Map.empty<Principal, Float>();
  let walletTransactions = Map.empty<Text, WalletTransaction>();

  /// Authenticated users can get their own wallet balance; admins can get any.
  public query ({ caller }) func getWalletBalance(userId : Principal) : async Float {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own wallet balance");
    };
    switch (walletBalances.get(userId)) {
      case (null) { 0.0 };
      case (?bal) { bal };
    };
  };

  /// Authenticated users can add funds to their own wallet (recharge).
  public shared ({ caller }) func rechargeWallet(userId : Principal, amount : Float, transaction : WalletTransaction) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can recharge wallet");
    };
    if (caller != userId) {
      Runtime.trap("Unauthorized: Cannot recharge wallet for another user");
    };
    let currentBalance = switch (walletBalances.get(userId)) {
      case (null) { 0.0 };
      case (?bal) { bal };
    };
    walletBalances.add(userId, currentBalance + amount);
    walletTransactions.add(transaction.id, transaction);
  };

  /// Authenticated users can get their own transaction history; admins can get any.
  public query ({ caller }) func getWalletTransactions(userId : Principal) : async [WalletTransaction] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own wallet transactions");
    };
    let result = List.empty<WalletTransaction>();
    for ((_, t) in walletTransactions.entries()) {
      if (t.userId == userId) { result.add(t) };
    };
    result.toArray();
  };

  // ─── Report Requests ─────────────────────────────────────────────────────────

  public type ReportRequest = {
    id : Text;
    userId : Principal;
    reportType : Text;
    name : Text;
    dob : Text;
    tob : Text;
    pob : Text;
    status : Text; // pending / completed
    content : Text;
    createdAt : Time.Time;
  };

  let reportRequests = Map.empty<Text, ReportRequest>();

  /// Authenticated users can request a report for themselves.
  public shared ({ caller }) func createReportRequest(request : ReportRequest) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can request reports");
    };
    if (caller != request.userId) {
      Runtime.trap("Unauthorized: Cannot request a report for another user");
    };
    switch (reportRequests.get(request.id)) {
      case (?_) { Runtime.trap("Report request already exists with id: " # request.id) };
      case (null) { reportRequests.add(request.id, request) };
    };
  };

  /// Users may only fetch their own report requests; admins may fetch any user's.
  public query ({ caller }) func getUserReportRequests(userId : Principal) : async [ReportRequest] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own report requests");
    };
    let result = List.empty<ReportRequest>();
    for ((_, r) in reportRequests.entries()) {
      if (r.userId == userId) { result.add(r) };
    };
    result.toArray();
  };

  /// Admin-only: update report status and content.
  public shared ({ caller }) func updateReportRequest(id : Text, status : Text, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update report requests");
    };
    switch (reportRequests.get(id)) {
      case (null) { Runtime.trap("Report request not found with id: " # id) };
      case (?existing) {
        let updated : ReportRequest = { existing with status; content };
        reportRequests.add(id, updated);
      };
    };
  };

  // ─── Devotional Content ──────────────────────────────────────────────────────

  public type DevotionalContent = {
    id : Text;
    title : Text;
    deity : Text;
    contentType : Text; // bhajan / aarti / mantra / chalisa
    lyrics : Text;
    language : Text;
    createdAt : Time.Time;
  };

  let devotionalContents = Map.empty<Text, DevotionalContent>();

  /// Admin-only: create a devotional content entry.
  public shared ({ caller }) func createDevotionalContent(content : DevotionalContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create devotional content");
    };
    switch (devotionalContents.get(content.id)) {
      case (?_) { Runtime.trap("Devotional content already exists with id: " # content.id) };
      case (null) { devotionalContents.add(content.id, content) };
    };
  };

  /// Admin-only: update an existing devotional content entry.
  public shared ({ caller }) func updateDevotionalContent(content : DevotionalContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update devotional content");
    };
    switch (devotionalContents.get(content.id)) {
      case (null) { Runtime.trap("Devotional content not found with id: " # content.id) };
      case (?_) { devotionalContents.add(content.id, content) };
    };
  };

  /// Admin-only: delete a devotional content entry.
  public shared ({ caller }) func deleteDevotionalContent(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete devotional content");
    };
    switch (devotionalContents.get(id)) {
      case (null) { Runtime.trap("Devotional content not found with id: " # id) };
      case (?_) { devotionalContents.remove(id) };
    };
  };

  /// Public: anyone may browse devotional content.
  public query func getAllDevotionalContents() : async [DevotionalContent] {
    devotionalContents.values().toArray();
  };

  /// Public: get a single devotional content entry.
  public query func getDevotionalContent(id : Text) : async ?DevotionalContent {
    devotionalContents.get(id);
  };

  // ─── Virtual Home Temple Configuration ──────────────────────────────────────

  public type VirtualTempleConfig = {
    userId : Principal;
    deity : Text;
    decorStyle : Text;
    background : Text;
    items : [Text];
    updatedAt : Time.Time;
  };

  let virtualTempleConfigs = Map.empty<Principal, VirtualTempleConfig>();

  /// Authenticated users can save their own virtual temple configuration.
  public shared ({ caller }) func saveVirtualTempleConfig(config : VirtualTempleConfig) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save temple configurations");
    };
    if (caller != config.userId) {
      Runtime.trap("Unauthorized: Cannot save temple configuration for another user");
    };
    virtualTempleConfigs.add(caller, config);
  };

  /// Users may only fetch their own temple config; admins may fetch any.
  public query ({ caller }) func getVirtualTempleConfig(userId : Principal) : async ?VirtualTempleConfig {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own virtual temple configuration");
    };
    virtualTempleConfigs.get(userId);
  };

  // ─── Numerology & Business Name Analysis Records ─────────────────────────────

  public type NumerologyRecord = {
    id : Text;
    userId : Principal;
    name : Text;
    dob : Text;
    result : Text;
    createdAt : Time.Time;
  };

  let numerologyRecords = Map.empty<Text, NumerologyRecord>();

  /// Authenticated users can create a numerology analysis for themselves.
  public shared ({ caller }) func createNumerologyRecord(record : NumerologyRecord) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create numerology records");
    };
    if (caller != record.userId) {
      Runtime.trap("Unauthorized: Cannot create a numerology record for another user");
    };
    switch (numerologyRecords.get(record.id)) {
      case (?_) { Runtime.trap("Numerology record already exists with id: " # record.id) };
      case (null) { numerologyRecords.add(record.id, record) };
    };
  };

  /// Users may only fetch their own numerology records; admins may fetch any.
  public query ({ caller }) func getUserNumerologyRecords(userId : Principal) : async [NumerologyRecord] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own numerology records");
    };
    let result = List.empty<NumerologyRecord>();
    for ((_, r) in numerologyRecords.entries()) {
      if (r.userId == userId) { result.add(r) };
    };
    result.toArray();
  };

  public type BusinessNameRecord = {
    id : Text;
    userId : Principal;
    businessName : Text;
    result : Text;
    createdAt : Time.Time;
  };

  let businessNameRecords = Map.empty<Text, BusinessNameRecord>();

  /// Authenticated users can create a business name analysis for themselves.
  public shared ({ caller }) func createBusinessNameRecord(record : BusinessNameRecord) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create business name records");
    };
    if (caller != record.userId) {
      Runtime.trap("Unauthorized: Cannot create a business name record for another user");
    };
    switch (businessNameRecords.get(record.id)) {
      case (?_) { Runtime.trap("Business name record already exists with id: " # record.id) };
      case (null) { businessNameRecords.add(record.id, record) };
    };
  };

  /// Users may only fetch their own business name records; admins may fetch any.
  public query ({ caller }) func getUserBusinessNameRecords(userId : Principal) : async [BusinessNameRecord] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own business name records");
    };
    let result = List.empty<BusinessNameRecord>();
    for ((_, r) in businessNameRecords.entries()) {
      if (r.userId == userId) { result.add(r) };
    };
    result.toArray();
  };

  // ─── Bhajan Entries ──────────────────────────────────────────────────────────

  public type BhajanEntry = {
    id : Text;
    title : Text;
    deity : Text;
    artist : Text;
    lyricsText : Text;
    audioBase64 : Text;
    createdAt : Time.Time;
  };

  let bhajanEntries = Map.empty<Text, BhajanEntry>();

  /// Public: anyone may browse bhajan entries.
  public query func getBhajans() : async [BhajanEntry] {
    bhajanEntries.values().toArray();
  };

  /// Public: get a single bhajan entry by id.
  public query func getBhajanById(id : Text) : async ?BhajanEntry {
    bhajanEntries.get(id);
  };

  /// Admin-only: add a new bhajan entry.
  public shared ({ caller }) func addBhajan(entry : BhajanEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add bhajan entries");
    };
    switch (bhajanEntries.get(entry.id)) {
      case (?_) { Runtime.trap("Bhajan entry already exists with id: " # entry.id) };
      case (null) { bhajanEntries.add(entry.id, entry) };
    };
  };

  /// Admin-only: update an existing bhajan entry.
  public shared ({ caller }) func updateBhajan(entry : BhajanEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update bhajan entries");
    };
    switch (bhajanEntries.get(entry.id)) {
      case (null) { Runtime.trap("Bhajan entry not found with id: " # entry.id) };
      case (?_) { bhajanEntries.add(entry.id, entry) };
    };
  };

  /// Admin-only: delete a bhajan entry.
  public shared ({ caller }) func deleteBhajan(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete bhajan entries");
    };
    switch (bhajanEntries.get(id)) {
      case (null) { Runtime.trap("Bhajan entry not found with id: " # id) };
      case (?_) { bhajanEntries.remove(id) };
    };
  };

  // ─── Vrat Katha Entries ──────────────────────────────────────────────────────

  public type VratKathaEntry = {
    id : Text;
    title : Text;
    festivalName : Text;
    storyText : Text;
    audioBase64 : Text;
    createdAt : Time.Time;
  };

  let vratKathaEntries = Map.empty<Text, VratKathaEntry>();

  /// Public: anyone may browse vrat katha entries.
  public query func getVratKathas() : async [VratKathaEntry] {
    vratKathaEntries.values().toArray();
  };

  /// Public: get a single vrat katha entry by id.
  public query func getVratKathaById(id : Text) : async ?VratKathaEntry {
    vratKathaEntries.get(id);
  };

  /// Admin-only: add a new vrat katha entry.
  public shared ({ caller }) func addVratKatha(entry : VratKathaEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add vrat katha entries");
    };
    switch (vratKathaEntries.get(entry.id)) {
      case (?_) { Runtime.trap("Vrat katha entry already exists with id: " # entry.id) };
      case (null) { vratKathaEntries.add(entry.id, entry) };
    };
  };

  /// Admin-only: update an existing vrat katha entry.
  public shared ({ caller }) func updateVratKatha(entry : VratKathaEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update vrat katha entries");
    };
    switch (vratKathaEntries.get(entry.id)) {
      case (null) { Runtime.trap("Vrat katha entry not found with id: " # entry.id) };
      case (?_) { vratKathaEntries.add(entry.id, entry) };
    };
  };

  /// Admin-only: delete a vrat katha entry.
  public shared ({ caller }) func deleteVratKatha(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete vrat katha entries");
    };
    switch (vratKathaEntries.get(id)) {
      case (null) { Runtime.trap("Vrat katha entry not found with id: " # id) };
      case (?_) { vratKathaEntries.remove(id) };
    };
  };

  // ─── Holy Book Entries ───────────────────────────────────────────────────────

  public type HolyBookEntry = {
    id : Text;
    bookTitle : Text;
    chapterTitle : Text;
    shlokaText : Text;
    audioBase64 : Text;
    bookCategory : Text;
    trackNumber : Nat;
    createdAt : Time.Time;
  };

  let holyBookEntries = Map.empty<Text, HolyBookEntry>();

  /// Public: anyone may browse holy book entries, optionally filtered by bookTitle.
  public query func getHolyBookEntries(bookTitle : Text) : async [HolyBookEntry] {
    let result = List.empty<HolyBookEntry>();
    for ((_, e) in holyBookEntries.entries()) {
      if (bookTitle == "" or e.bookTitle == bookTitle) {
        result.add(e);
      };
    };
    result.toArray();
  };

  /// Public: get a single holy book entry by id.
  public query func getHolyBookEntryById(id : Text) : async ?HolyBookEntry {
    holyBookEntries.get(id);
  };

  /// Admin-only: add a new holy book entry.
  public shared ({ caller }) func addHolyBookEntry(entry : HolyBookEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add holy book entries");
    };
    switch (holyBookEntries.get(entry.id)) {
      case (?_) { Runtime.trap("Holy book entry already exists with id: " # entry.id) };
      case (null) { holyBookEntries.add(entry.id, entry) };
    };
  };

  /// Admin-only: update an existing holy book entry.
  public shared ({ caller }) func updateHolyBookEntry(entry : HolyBookEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update holy book entries");
    };
    switch (holyBookEntries.get(entry.id)) {
      case (null) { Runtime.trap("Holy book entry not found with id: " # entry.id) };
      case (?_) { holyBookEntries.add(entry.id, entry) };
    };
  };

  /// Admin-only: delete a holy book entry.
  public shared ({ caller }) func deleteHolyBookEntry(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete holy book entries");
    };
    switch (holyBookEntries.get(id)) {
      case (null) { Runtime.trap("Holy book entry not found with id: " # id) };
      case (?_) { holyBookEntries.remove(id) };
    };
  };

  // ─── Stripe ──────────────────────────────────────────────────────────────────

  var stripeConfig : ?Stripe.StripeConfiguration = null;

  /// Public: check whether Stripe has been configured.
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  /// Admin-only: set the Stripe configuration.
  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  /// Authenticated users can check a Stripe session status (e.g. after checkout).
  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can check Stripe session status");
    };
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  /// Authenticated users can create a Stripe checkout session (e.g. for payment).
  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create a Stripe checkout session");
    };
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
