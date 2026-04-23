import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Set "mo:core/Set";
import _Storage "mo:caffeineai-object-storage/Storage";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import AccessControl "mo:caffeineai-authorization/access-control";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import List "mo:core/List";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();

  // ─── Product Manager Role ─────────────────────────────────────────────────────
  // Stored separately from the authorization extension (which only supports admin/user/guest).
  // Product managers can do full CRUD on products/categories/pricing/variants/stock.
  // They CANNOT access blog, bhajan, puja reports, or other admin-only features.

  let productManagerPrincipals = Set.empty<Principal>();

  func _isProductManager(p : Principal) : Bool {
    productManagerPrincipals.contains(p)
  };

  func _isAdminOrProductManager(p : Principal) : Bool {
    AccessControl.isAdmin(accessControlState, p) or _isProductManager(p)
  };

  /// Admin-only: grant productManager role to a user.
  public shared ({ caller }) func setProductManagerRole(userId : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can assign product manager role");
    };
    productManagerPrincipals.add(userId);
  };

  /// Admin-only: revoke productManager role from a user.
  public shared ({ caller }) func revokeProductManagerRole(userId : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can revoke product manager role");
    };
    productManagerPrincipals.remove(userId);
  };

  /// Returns true if the caller has productManager role.
  public query ({ caller }) func isProductManager() : async Bool {
    _isProductManager(caller)
  };

  /// Admin-only: list all product manager principals.
  public query ({ caller }) func getAllProductManagers() : async [Principal] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list product managers");
    };
    productManagerPrincipals.toArray()
  };

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

  // ─── Consultation Booking Requests (public, no auth required) ───────────────

  public type ConsultationBookingRequest = {
    id : Text;              // auto-generated booking reference
    fullName : Text;
    email : Text;
    phone : Text;
    birthDate : Text;
    birthTime : Text;       // empty string if not provided
    birthLocation : Text;
    preferredDateTime : Text;
    consultationMode : Text; // call | chat | video
    topic : Text;            // may be pre-filled with gemstone name
    specialQuestions : Text;
    status : Text;           // pending | confirmed | cancelled
    createdAt : Int;
  };

  let consultationBookingRequests = Map.empty<Text, ConsultationBookingRequest>();
  var consultationBookingCounter : Nat = 0;

  /// Public: anyone can submit a consultation booking request (no login required).
  /// Returns the auto-generated booking reference ID.
  public shared func createBookingRequest(
    fullName : Text,
    email : Text,
    phone : Text,
    birthDate : Text,
    birthTime : Text,
    birthLocation : Text,
    preferredDateTime : Text,
    consultationMode : Text,
    topic : Text,
    specialQuestions : Text
  ) : async Text {
    let now = Time.now();
    consultationBookingCounter += 1;
    let refId = "SC-" # now.toText() # "-" # consultationBookingCounter.toText();
    let request : ConsultationBookingRequest = {
      id = refId;
      fullName;
      email;
      phone;
      birthDate;
      birthTime;
      birthLocation;
      preferredDateTime;
      consultationMode;
      topic;
      specialQuestions;
      status = "pending";
      createdAt = now;
    };
    consultationBookingRequests.add(refId, request);
    refId;
  };

  /// Public: look up a booking by its reference ID (for confirmation page).
  public query func getBookingRequest(refId : Text) : async ?ConsultationBookingRequest {
    consultationBookingRequests.get(refId);
  };

  /// Admin-only: list all consultation booking requests.
  public query ({ caller }) func getAllBookingRequests() : async [ConsultationBookingRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all booking requests");
    };
    consultationBookingRequests.values().toArray();
  };

  /// Admin-only: update the status of a booking request.
  public shared ({ caller }) func updateBookingRequestStatus(refId : Text, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update booking request status");
    };
    switch (consultationBookingRequests.get(refId)) {
      case (null) { Runtime.trap("Booking request not found with id: " # refId) };
      case (?existing) {
        consultationBookingRequests.add(refId, { existing with status });
      };
    };
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

  public type ProductVariant = {
    variantName : Text; // e.g. "3-4 Ratti", "5-6 Ratti"
    price : Float;
    stock : Nat;
  };

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
    // Extended fields for gemstone weight variants and pricing
    variants : ?[ProductVariant];       // optional weight/size variants
    variantLabel : ?Text;               // e.g. "Select Weight (Ratti)"
    mrp : ?Float;                       // crossed-out original price
    discount : ?Nat;                    // discount percentage (0–100)
    sku : ?Text;                        // stock-keeping unit code
  };

  /// Partial update request — only provided fields are changed.
  public type ProductUpdateRequest = {
    name : ?Text;
    category : ?Text;
    price : ?Float;
    description : ?Text;
    benefits : ?Text;
    astrologicalPurpose : ?Text;
    stock : ?Nat;
    variants : ?[ProductVariant];
    variantLabel : ?Text;
    mrp : ?Float;
    discount : ?Nat;
    sku : ?Text;
  };

  let products = Map.empty<Text, Product>();

  /// Admin or productManager: create a product.
  public shared ({ caller }) func createProduct(product : Product) : async () {
    if (not _isAdminOrProductManager(caller)) {
      Runtime.trap("Unauthorized: Only admins or product managers can create products");
    };
    switch (products.get(product.id)) {
      case (?_) { Runtime.trap("Product already exists with id: " # product.id) };
      case (null) { products.add(product.id, product) };
    };
  };

  /// Admin or productManager: replace a product entirely (backward-compatible full update).
  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not _isAdminOrProductManager(caller)) {
      Runtime.trap("Unauthorized: Only admins or product managers can update products");
    };
    switch (products.get(product.id)) {
      case (null) { Runtime.trap("Product not found with id: " # product.id) };
      case (?_) { products.add(product.id, product) };
    };
  };

  /// Admin or productManager: partial update — only supplied fields are changed.
  public shared ({ caller }) func updateProductFields(id : Text, updates : ProductUpdateRequest) : async () {
    if (not _isAdminOrProductManager(caller)) {
      Runtime.trap("Unauthorized: Only admins or product managers can update products");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found with id: " # id) };
      case (?existing) {
        let updated : Product = {
          existing with
          name              = switch (updates.name)              { case (?v) v; case null existing.name };
          category          = switch (updates.category)          { case (?v) v; case null existing.category };
          price             = switch (updates.price)             { case (?v) v; case null existing.price };
          description       = switch (updates.description)       { case (?v) v; case null existing.description };
          benefits          = switch (updates.benefits)          { case (?v) v; case null existing.benefits };
          astrologicalPurpose = switch (updates.astrologicalPurpose) { case (?v) v; case null existing.astrologicalPurpose };
          stock             = switch (updates.stock)             { case (?v) v; case null existing.stock };
          variants          = switch (updates.variants)          { case (?v) ?v; case null existing.variants };
          variantLabel      = switch (updates.variantLabel)      { case (?v) ?v; case null existing.variantLabel };
          mrp               = switch (updates.mrp)               { case (?v) ?v; case null existing.mrp };
          discount          = switch (updates.discount)          { case (?v) ?v; case null existing.discount };
          sku               = switch (updates.sku)               { case (?v) ?v; case null existing.sku };
        };
        products.add(id, updated);
      };
    };
  };

  /// Admin or productManager: update only the variants array for a product (gemstone weight variants).
  public shared ({ caller }) func updateProductVariants(id : Text, variants : [ProductVariant]) : async () {
    if (not _isAdminOrProductManager(caller)) {
      Runtime.trap("Unauthorized: Only admins or product managers can update product variants");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found with id: " # id) };
      case (?existing) {
        products.add(id, { existing with variants = ?variants });
      };
    };
  };

  /// Admin or productManager: update stock for a product.
  public shared ({ caller }) func updateProductStock(id : Text, stock : Nat) : async () {
    if (not _isAdminOrProductManager(caller)) {
      Runtime.trap("Unauthorized: Only admins or product managers can update product stock");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found with id: " # id) };
      case (?existing) {
        products.add(id, { existing with stock });
      };
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

  /// Public: get products filtered by category.
  public query func getProductsByCategory(category : Text) : async [Product] {
    let result = List.empty<Product>();
    for ((_, p) in products.entries()) {
      if (p.category == category) { result.add(p) };
    };
    result.toArray()
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

  // ─── Kundali Matching ────────────────────────────────────────────────────────

  public type KundaliMatchInput = {
    personAName : Text;
    personADob : Text;
    personATime : Text;
    personAPlace : Text;
    personANakshatra : Text;
    personARashi : Text;
    personASunSign : Text;
    personAMoonSign : Text;
    personAAscendant : Text;
    personAMarsSign : Text;
    personBName : Text;
    personBDob : Text;
    personBTime : Text;
    personBPlace : Text;
    personBNakshatra : Text;
    personBRashi : Text;
    personBSunSign : Text;
    personBMoonSign : Text;
    personBAscendant : Text;
    personBMarsSign : Text;
    varnaScore : Nat;
    vasyaScore : Nat;
    taraScore : Nat;
    yoniScore : Nat;
    grahaMaitriScore : Nat;
    ganaScore : Nat;
    bhakootScore : Nat;
    nadiScore : Nat;
    totalScore : Nat;
    compatibilityPercent : Nat;
    nadiDosha : Bool;
    bhakootDosha : Bool;
    manglikDoshaA : Bool;
    manglikDoshaB : Bool;
    doshaRemedies : Text;
  };

  public type KundaliMatch = {
    id : Text;
    userId : Principal;
    createdAt : Int;
    personAName : Text;
    personADob : Text;
    personATime : Text;
    personAPlace : Text;
    personANakshatra : Text;
    personARashi : Text;
    personASunSign : Text;
    personAMoonSign : Text;
    personAAscendant : Text;
    personAMarsSign : Text;
    personBName : Text;
    personBDob : Text;
    personBTime : Text;
    personBPlace : Text;
    personBNakshatra : Text;
    personBRashi : Text;
    personBSunSign : Text;
    personBMoonSign : Text;
    personBAscendant : Text;
    personBMarsSign : Text;
    varnaScore : Nat;
    vasyaScore : Nat;
    taraScore : Nat;
    yoniScore : Nat;
    grahaMaitriScore : Nat;
    ganaScore : Nat;
    bhakootScore : Nat;
    nadiScore : Nat;
    totalScore : Nat;
    compatibilityPercent : Nat;
    nadiDosha : Bool;
    bhakootDosha : Bool;
    manglikDoshaA : Bool;
    manglikDoshaB : Bool;
    doshaRemedies : Text;
  };

  let kundaliMatches = Map.empty<Text, KundaliMatch>();

  /// Authenticated users can save a kundali match result for themselves.
  public shared ({ caller }) func saveKundaliMatch(match : KundaliMatchInput) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save kundali matches");
    };
    let now = Time.now();
    let id = caller.toText() # "-" # now.toText();
    let record : KundaliMatch = {
      id;
      userId = caller;
      createdAt = now;
      personAName = match.personAName;
      personADob = match.personADob;
      personATime = match.personATime;
      personAPlace = match.personAPlace;
      personANakshatra = match.personANakshatra;
      personARashi = match.personARashi;
      personASunSign = match.personASunSign;
      personAMoonSign = match.personAMoonSign;
      personAAscendant = match.personAAscendant;
      personAMarsSign = match.personAMarsSign;
      personBName = match.personBName;
      personBDob = match.personBDob;
      personBTime = match.personBTime;
      personBPlace = match.personBPlace;
      personBNakshatra = match.personBNakshatra;
      personBRashi = match.personBRashi;
      personBSunSign = match.personBSunSign;
      personBMoonSign = match.personBMoonSign;
      personBAscendant = match.personBAscendant;
      personBMarsSign = match.personBMarsSign;
      varnaScore = match.varnaScore;
      vasyaScore = match.vasyaScore;
      taraScore = match.taraScore;
      yoniScore = match.yoniScore;
      grahaMaitriScore = match.grahaMaitriScore;
      ganaScore = match.ganaScore;
      bhakootScore = match.bhakootScore;
      nadiScore = match.nadiScore;
      totalScore = match.totalScore;
      compatibilityPercent = match.compatibilityPercent;
      nadiDosha = match.nadiDosha;
      bhakootDosha = match.bhakootDosha;
      manglikDoshaA = match.manglikDoshaA;
      manglikDoshaB = match.manglikDoshaB;
      doshaRemedies = match.doshaRemedies;
    };
    kundaliMatches.add(id, record);
    id;
  };

  /// Authenticated users can retrieve all their own kundali match results, sorted newest first.
  public query ({ caller }) func getKundaliMatches() : async [KundaliMatch] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view kundali matches");
    };
    let result = List.empty<KundaliMatch>();
    for ((_, m) in kundaliMatches.entries()) {
      if (Principal.equal(m.userId, caller)) { result.add(m) };
    };
    let arr = result.toArray();
    arr.sort(func(a : KundaliMatch, b : KundaliMatch) : Order.Order {
      Int.compare(b.createdAt, a.createdAt)
    });
  };

  /// Authenticated users can retrieve a single kundali match by id (only their own).
  public query ({ caller }) func getKundaliMatchById(id : Text) : async ?KundaliMatch {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view kundali matches");
    };
    switch (kundaliMatches.get(id)) {
      case (null) { null };
      case (?m) {
        if (Principal.equal(m.userId, caller)) { ?m } else { null };
      };
    };
  };

  /// Authenticated users can delete their own kundali match. Returns true if deleted.
  public shared ({ caller }) func deleteKundaliMatch(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can delete kundali matches");
    };
    switch (kundaliMatches.get(id)) {
      case (null) { false };
      case (?m) {
        if (Principal.equal(m.userId, caller)) {
          kundaliMatches.remove(id);
          true;
        } else {
          false;
        };
      };
    };
  };

  // ─── Palmistry Readings ──────────────────────────────────────────────────────

  public type PalmistryReading = {
    id : Text;
    userId : Principal;
    imageUrl : Text;
    lifeLine : Text;
    headLine : Text;
    heartLine : Text;
    fateLine : Text;
    traits : [Text];
    readingDate : Int;
    summary : Text;
  };

  let palmistryReadings = Map.empty<Text, PalmistryReading>();

  /// Authenticated users can save a palmistry reading for themselves.
  public shared ({ caller }) func savePalmistryReading(reading : PalmistryReading) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save palmistry readings");
    };
    if (caller != reading.userId) {
      Runtime.trap("Unauthorized: Cannot save a palmistry reading for another user");
    };
    palmistryReadings.add(reading.id, reading);
  };

  /// Authenticated users can retrieve their own palmistry readings.
  public query ({ caller }) func getUserPalmistryReadings() : async [PalmistryReading] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view palmistry readings");
    };
    let result = List.empty<PalmistryReading>();
    for ((_, r) in palmistryReadings.entries()) {
      if (Principal.equal(r.userId, caller)) { result.add(r) };
    };
    result.toArray();
  };

  // ─── Puja Types ──────────────────────────────────────────────────────────────

  public type PujaType = {
    id : Text;
    name : Text;
    nameHindi : Text;
    category : Text;
    deity : Text;
    description : Text;
    descriptionHindi : Text;
    vidhi : Text;
    vidhiHindi : Text;
    samagri : [Text];
    samagriHindi : [Text];
    duration : Text;
    benefits : Text;
    benefitsHindi : Text;
    when : Text;
    whenHindi : Text;
    imageUrl : Text;
  };

  let pujaTypes = Map.empty<Text, PujaType>();

  /// Admin-only: create a puja type.
  public shared ({ caller }) func createPujaType(pujaType : PujaType) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create puja types");
    };
    switch (pujaTypes.get(pujaType.id)) {
      case (?_) { Runtime.trap("Puja type already exists with id: " # pujaType.id) };
      case (null) { pujaTypes.add(pujaType.id, pujaType) };
    };
  };

  /// Admin-only: update an existing puja type.
  public shared ({ caller }) func updatePujaType(pujaType : PujaType) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update puja types");
    };
    switch (pujaTypes.get(pujaType.id)) {
      case (null) { Runtime.trap("Puja type not found with id: " # pujaType.id) };
      case (?_) { pujaTypes.add(pujaType.id, pujaType) };
    };
  };

  /// Admin-only: delete a puja type.
  public shared ({ caller }) func deletePujaType(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete puja types");
    };
    switch (pujaTypes.get(id)) {
      case (null) { Runtime.trap("Puja type not found with id: " # id) };
      case (?_) { pujaTypes.remove(id) };
    };
  };

  /// Public: anyone may browse puja types.
  public query func getAllPujaTypes() : async [PujaType] {
    pujaTypes.values().toArray();
  };

  /// Public: get a single puja type by id.
  public query func getPujaTypeById(id : Text) : async ?PujaType {
    pujaTypes.get(id);
  };

  // ─── Puja Reports ─────────────────────────────────────────────────────────────

  public type DaanItem = {
    item : Text;
    quantity : Text;
    value : Float;
  };

  public type PujaReport = {
    id : Text;
    bookingId : Text;
    userId : Principal;
    sankalp : Text;
    pujaType : Text;
    deity : Text;
    intention : Text;
    performedDate : Int;
    priestName : Text;
    durationMins : Int;
    daanItems : [DaanItem];
    completionNotes : Text;
    reportStatus : Text;
  };

  let pujaReports = Map.empty<Text, PujaReport>();

  /// Admin-only: create a puja report for a completed booking.
  public shared ({ caller }) func createPujaReport(report : PujaReport) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create puja reports");
    };
    switch (pujaReports.get(report.id)) {
      case (?_) { Runtime.trap("Puja report already exists with id: " # report.id) };
      case (null) { pujaReports.add(report.id, report) };
    };
  };

  /// Authenticated users can retrieve their own puja reports.
  public query ({ caller }) func getUserPujaReports() : async [PujaReport] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view puja reports");
    };
    let result = List.empty<PujaReport>();
    for ((_, r) in pujaReports.entries()) {
      if (Principal.equal(r.userId, caller)) { result.add(r) };
    };
    result.toArray();
  };

  /// Admin-only: get all puja reports.
  public query ({ caller }) func getAllPujaReports() : async [PujaReport] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all puja reports");
    };
    pujaReports.values().toArray();
  };

  /// Admin-only: update an existing puja report.
  public shared ({ caller }) func updatePujaReport(id : Text, report : PujaReport) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update puja reports");
    };
    switch (pujaReports.get(id)) {
      case (null) { Runtime.trap("Puja report not found with id: " # id) };
      case (?_) { pujaReports.add(id, report) };
    };
  };

  // ─── Suktam Entries ───────────────────────────────────────────────────────────

  public type SuktamEntry = {
    id : Text;
    name : Text;
    nameHindi : Text;
    deity : Text;
    deityHindi : Text;
    sanskritText : Text;
    transliteration : Text;
    hindiMeaning : Text;
    englishMeaning : Text;
    benefits : Text;
    benefitsHindi : Text;
    recitationInstructions : Text;
    vedaSource : Text;
  };

  let suktamEntries = Map.empty<Text, SuktamEntry>();

  /// Public: anyone may browse suktam entries.
  public query func getSuktams() : async [SuktamEntry] {
    suktamEntries.values().toArray();
  };

  /// Public: get a single suktam entry by id.
  public query func getSuktamById(id : Text) : async ?SuktamEntry {
    suktamEntries.get(id);
  };

  /// Admin-only: add a new suktam entry.
  public shared ({ caller }) func addSuktam(entry : SuktamEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add suktam entries");
    };
    switch (suktamEntries.get(entry.id)) {
      case (?_) { Runtime.trap("Suktam entry already exists with id: " # entry.id) };
      case (null) { suktamEntries.add(entry.id, entry) };
    };
  };

  /// Admin-only: update an existing suktam entry.
  public shared ({ caller }) func updateSuktam(entry : SuktamEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update suktam entries");
    };
    switch (suktamEntries.get(entry.id)) {
      case (null) { Runtime.trap("Suktam entry not found with id: " # entry.id) };
      case (?_) { suktamEntries.add(entry.id, entry) };
    };
  };

  /// Admin-only: delete a suktam entry.
  public shared ({ caller }) func deleteSuktam(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete suktam entries");
    };
    switch (suktamEntries.get(id)) {
      case (null) { Runtime.trap("Suktam entry not found with id: " # id) };
      case (?_) { suktamEntries.remove(id) };
    };
  };

  // ─── Jain Encyclopedia Articles ───────────────────────────────────────────────

  public type JainQAPair = {
    question : Text;
    answer : Text;
    questionHindi : Text;
    answerHindi : Text;
  };

  public type JainGlossaryTerm = {
    term : Text;
    definition : Text;
  };

  public type JainEncyclopediaArticle = {
    id : Text;
    volumeNumber : Int;
    volumeTitle : Text;
    articleTitle : Text;
    articleTitleHindi : Text;
    content : Text;
    contentHindi : Text;
    qaPairs : [JainQAPair];
    glossaryTerms : [JainGlossaryTerm];
    crossLinks : [Text];
  };

  let jainEncyclopediaArticles = Map.empty<Text, JainEncyclopediaArticle>();

  /// Public: get all Jain encyclopedia articles.
  public query func getAllJainArticles() : async [JainEncyclopediaArticle] {
    jainEncyclopediaArticles.values().toArray();
  };

  /// Public: get all Jain encyclopedia articles for a given volume number.
  public query func getJainArticlesByVolume(volumeNumber : Int) : async [JainEncyclopediaArticle] {
    let result = List.empty<JainEncyclopediaArticle>();
    for ((_, a) in jainEncyclopediaArticles.entries()) {
      if (a.volumeNumber == volumeNumber) { result.add(a) };
    };
    result.toArray();
  };

  /// Public: get a single Jain encyclopedia article by id.
  public query func getJainArticleById(id : Text) : async ?JainEncyclopediaArticle {
    jainEncyclopediaArticles.get(id);
  };

  /// Admin-only: add a new Jain encyclopedia article.
  public shared ({ caller }) func addJainArticle(article : JainEncyclopediaArticle) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add Jain encyclopedia articles");
    };
    switch (jainEncyclopediaArticles.get(article.id)) {
      case (?_) { Runtime.trap("Jain article already exists with id: " # article.id) };
      case (null) { jainEncyclopediaArticles.add(article.id, article) };
    };
  };

  /// Admin-only: update an existing Jain encyclopedia article.
  public shared ({ caller }) func updateJainArticle(article : JainEncyclopediaArticle) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update Jain encyclopedia articles");
    };
    switch (jainEncyclopediaArticles.get(article.id)) {
      case (null) { Runtime.trap("Jain article not found with id: " # article.id) };
      case (?_) { jainEncyclopediaArticles.add(article.id, article) };
    };
  };

  /// Admin-only: delete a Jain encyclopedia article.
  public shared ({ caller }) func deleteJainArticle(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete Jain encyclopedia articles");
    };
    switch (jainEncyclopediaArticles.get(id)) {
      case (null) { Runtime.trap("Jain article not found with id: " # id) };
      case (?_) { jainEncyclopediaArticles.remove(id) };
    };
  };

  // ─── Calculator FAQs ──────────────────────────────────────────────────────────

  public type CalculatorQAPair = {
    question : Text;
    answer : Text;
    questionHindi : Text;
    answerHindi : Text;
    category : Text;
  };

  public type CalculatorFAQ = {
    id : Text;
    calculatorId : Text;
    calculatorName : Text;
    qaPairs : [CalculatorQAPair];
  };

  let calculatorFAQs = Map.empty<Text, CalculatorFAQ>();

  /// Admin-only: save (create or replace) a calculator FAQ.
  public shared ({ caller }) func saveCalculatorFAQ(faq : CalculatorFAQ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can save calculator FAQs");
    };
    calculatorFAQs.add(faq.id, faq);
  };

  /// Public: get the FAQ for a specific calculator by calculatorId.
  public query func getCalculatorFAQ(calculatorId : Text) : async ?CalculatorFAQ {
    var found : ?CalculatorFAQ = null;
    for ((_, f) in calculatorFAQs.entries()) {
      if (f.calculatorId == calculatorId) { found := ?f };
    };
    found;
  };

  /// Public: get all calculator FAQs.
  public query func getAllCalculatorFAQs() : async [CalculatorFAQ] {
    calculatorFAQs.values().toArray();
  };

  /// Admin-only: update an existing calculator FAQ by id.
  public shared ({ caller }) func updateCalculatorFAQ(id : Text, faq : CalculatorFAQ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update calculator FAQs");
    };
    switch (calculatorFAQs.get(id)) {
      case (null) { Runtime.trap("Calculator FAQ not found with id: " # id) };
      case (?_) { calculatorFAQs.add(id, faq) };
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

  // ─── Blog Articles ────────────────────────────────────────────────────────────

  public type BlogArticle = {
    id : Text;
    title : Text;
    content : Text;
    category : Text;
    author : Text;
    tags : [Text];
    featuredImageUrl : Text;
    publishDate : Int;
    isPublished : Bool;
    slug : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  let blogArticles = Map.empty<Text, BlogArticle>();

  /// Admin-only: create a blog article.
  public shared ({ caller }) func createBlogArticle(article : BlogArticle) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create blog articles");
    };
    switch (blogArticles.get(article.id)) {
      case (?_) { Runtime.trap("Blog article already exists with id: " # article.id) };
      case (null) { blogArticles.add(article.id, article) };
    };
  };

  /// Admin-only: update an existing blog article.
  public shared ({ caller }) func updateBlogArticle(article : BlogArticle) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update blog articles");
    };
    switch (blogArticles.get(article.id)) {
      case (null) { Runtime.trap("Blog article not found with id: " # article.id) };
      case (?_) { blogArticles.add(article.id, article) };
    };
  };

  /// Admin-only: delete a blog article.
  public shared ({ caller }) func deleteBlogArticle(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete blog articles");
    };
    switch (blogArticles.get(id)) {
      case (null) { Runtime.trap("Blog article not found with id: " # id) };
      case (?_) { blogArticles.remove(id) };
    };
  };

  /// Public: get all blog articles (admin may see unpublished; public sees all).
  public query func getAllBlogArticles() : async [BlogArticle] {
    blogArticles.values().toArray();
  };

  /// Public: get a blog article by its slug.
  public query func getBlogArticleBySlug(slug : Text) : async ?BlogArticle {
    var found : ?BlogArticle = null;
    for ((_, a) in blogArticles.entries()) {
      if (a.slug == slug) { found := ?a };
    };
    found;
  };

  /// Public: get only published blog articles.
  public query func getPublishedBlogArticles() : async [BlogArticle] {
    let result = List.empty<BlogArticle>();
    for ((_, a) in blogArticles.entries()) {
      if (a.isPublished) { result.add(a) };
    };
    result.toArray();
  };

  // ─── Web Stories ──────────────────────────────────────────────────────────────

  public type StorySlide = {
    id : Text;
    imageUrl : Text;
    title : Text;
    description : Text;
    order : Nat;
  };

  public type WebStory = {
    id : Text;
    title : Text;
    category : Text;
    slides : [StorySlide];
    isPublished : Bool;
    createdAt : Int;
  };

  let webStories = Map.empty<Text, WebStory>();

  /// Admin-only: create a web story.
  public shared ({ caller }) func createWebStory(story : WebStory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create web stories");
    };
    switch (webStories.get(story.id)) {
      case (?_) { Runtime.trap("Web story already exists with id: " # story.id) };
      case (null) { webStories.add(story.id, story) };
    };
  };

  /// Admin-only: update an existing web story.
  public shared ({ caller }) func updateWebStory(story : WebStory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update web stories");
    };
    switch (webStories.get(story.id)) {
      case (null) { Runtime.trap("Web story not found with id: " # story.id) };
      case (?_) { webStories.add(story.id, story) };
    };
  };

  /// Admin-only: delete a web story.
  public shared ({ caller }) func deleteWebStory(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete web stories");
    };
    switch (webStories.get(id)) {
      case (null) { Runtime.trap("Web story not found with id: " # id) };
      case (?_) { webStories.remove(id) };
    };
  };

  /// Public: get all web stories.
  public query func getAllWebStories() : async [WebStory] {
    webStories.values().toArray();
  };

  /// Public: get only published web stories.
  public query func getPublishedWebStories() : async [WebStory] {
    let result = List.empty<WebStory>();
    for ((_, s) in webStories.entries()) {
      if (s.isPublished) { result.add(s) };
    };
    result.toArray();
  };

  // ─── Festival Events ──────────────────────────────────────────────────────────

  public type FestivalEvent = {
    id : Text;
    title : Text;
    titleHindi : Text;
    date : Text;
    faith : Text;
    eventType : Text;
    description : Text;
    significance : Text;
    deity : Text;
  };

  let festivalEvents = Map.empty<Text, FestivalEvent>();

  /// Admin-only: add a festival event.
  public shared ({ caller }) func addFestivalEvent(event : FestivalEvent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add festival events");
    };
    switch (festivalEvents.get(event.id)) {
      case (?_) { Runtime.trap("Festival event already exists with id: " # event.id) };
      case (null) { festivalEvents.add(event.id, event) };
    };
  };

  /// Admin-only: update an existing festival event.
  public shared ({ caller }) func updateFestivalEvent(event : FestivalEvent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update festival events");
    };
    switch (festivalEvents.get(event.id)) {
      case (null) { Runtime.trap("Festival event not found with id: " # event.id) };
      case (?_) { festivalEvents.add(event.id, event) };
    };
  };

  /// Admin-only: delete a festival event.
  public shared ({ caller }) func deleteFestivalEvent(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete festival events");
    };
    switch (festivalEvents.get(id)) {
      case (null) { Runtime.trap("Festival event not found with id: " # id) };
      case (?_) { festivalEvents.remove(id) };
    };
  };

  /// Public: get all festival events.
  public query func getAllFestivalEvents() : async [FestivalEvent] {
    festivalEvents.values().toArray();
  };

  /// Public: get festival events filtered by faith (Hindu/Jain/Sikh/Tamil/Malayalam).
  public query func getFestivalEventsByFaith(faith : Text) : async [FestivalEvent] {
    let result = List.empty<FestivalEvent>();
    for ((_, e) in festivalEvents.entries()) {
      if (e.faith == faith) { result.add(e) };
    };
    result.toArray();
  };

  // ─── Media Player Items ───────────────────────────────────────────────────────

  public type MediaPlayerItem = {
    id : Text;
    title : Text;
    contentType : Text;
    audioUrl : Text;
    deity : Text;
    faith : Text;
    duration : Int;
  };

  let mediaPlayerItems = Map.empty<Text, MediaPlayerItem>();

  /// Admin-only: add a media player item.
  public shared ({ caller }) func addMediaPlayerItem(item : MediaPlayerItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add media player items");
    };
    switch (mediaPlayerItems.get(item.id)) {
      case (?_) { Runtime.trap("Media player item already exists with id: " # item.id) };
      case (null) { mediaPlayerItems.add(item.id, item) };
    };
  };

  /// Admin-only: remove a media player item.
  public shared ({ caller }) func removeMediaPlayerItem(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove media player items");
    };
    switch (mediaPlayerItems.get(id)) {
      case (null) { Runtime.trap("Media player item not found with id: " # id) };
      case (?_) { mediaPlayerItems.remove(id) };
    };
  };

  /// Public: get all media player items.
  public query func getMediaPlayerItems() : async [MediaPlayerItem] {
    mediaPlayerItems.values().toArray();
  };

  /// Public: get media player items filtered by contentType (aarti/chalisa/mantra/bhajan/katha).
  public query func getMediaPlayerItemsByType(contentType : Text) : async [MediaPlayerItem] {
    let result = List.empty<MediaPlayerItem>();
    for ((_, i) in mediaPlayerItems.entries()) {
      if (i.contentType == contentType) { result.add(i) };
    };
    result.toArray();
  };

  // ─── Astrology Charts (All 16 Divisional Charts + AstroScore + Yogas) ─────────

  public type AstroChart = {
    id : Text;
    userId : Text;
    birthDate : Text;
    birthTime : Text;
    birthPlace : Text;
    chartType : Text;
    chartData : Text;
    astroScore : Int;
    yogas : [Text];
    dashaInfo : Text;
    shadbalaData : Text;
    ashtakvargaData : Text;
    createdAt : Int;
  };

  let astroCharts = Map.empty<Text, AstroChart>();

  /// Authenticated users can save an astrology chart for themselves.
  public shared ({ caller }) func saveAstroChart(chart : AstroChart) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save astro charts");
    };
    if (chart.userId != caller.toText()) {
      Runtime.trap("Unauthorized: Cannot save an astro chart for another user");
    };
    switch (astroCharts.get(chart.id)) {
      case (?_) { astroCharts.add(chart.id, chart) };
      case (null) { astroCharts.add(chart.id, chart) };
    };
  };

  /// Authenticated users can retrieve their own astro charts.
  public query ({ caller }) func getUserAstroCharts() : async [AstroChart] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view astro charts");
    };
    let result = List.empty<AstroChart>();
    for ((_, c) in astroCharts.entries()) {
      if (c.userId == caller.toText()) { result.add(c) };
    };
    result.toArray();
  };

  /// Authenticated users can get a single astro chart by id (only their own).
  public query ({ caller }) func getAstroChart(id : Text) : async ?AstroChart {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view astro charts");
    };
    switch (astroCharts.get(id)) {
      case (null) { null };
      case (?c) {
        if (c.userId == caller.toText()) { ?c } else { null };
      };
    };
  };

  /// Authenticated users can delete their own astro chart.
  public shared ({ caller }) func deleteAstroChart(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can delete astro charts");
    };
    switch (astroCharts.get(id)) {
      case (null) { false };
      case (?c) {
        if (c.userId == caller.toText()) {
          astroCharts.remove(id);
          true;
        } else {
          false;
        };
      };
    };
  };

  // ─── Jain Pathshala Entries ───────────────────────────────────────────────────

  public type JainPathshalaEntry = {
    id : Text;
    title : Text;
    part : Text;
    chapter : Text;
    content : Text;
    category : Text;
    createdAt : Int;
  };

  let jainPathshalaEntries = Map.empty<Text, JainPathshalaEntry>();

  /// Admin-only: add a Jain Pathshala entry.
  public shared ({ caller }) func addJainPathshalaEntry(entry : JainPathshalaEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add Jain Pathshala entries");
    };
    switch (jainPathshalaEntries.get(entry.id)) {
      case (?_) { Runtime.trap("Jain Pathshala entry already exists with id: " # entry.id) };
      case (null) { jainPathshalaEntries.add(entry.id, entry) };
    };
  };

  /// Admin-only: update an existing Jain Pathshala entry.
  public shared ({ caller }) func updateJainPathshalaEntry(entry : JainPathshalaEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update Jain Pathshala entries");
    };
    switch (jainPathshalaEntries.get(entry.id)) {
      case (null) { Runtime.trap("Jain Pathshala entry not found with id: " # entry.id) };
      case (?_) { jainPathshalaEntries.add(entry.id, entry) };
    };
  };

  /// Admin-only: delete a Jain Pathshala entry.
  public shared ({ caller }) func deleteJainPathshalaEntry(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete Jain Pathshala entries");
    };
    switch (jainPathshalaEntries.get(id)) {
      case (null) { Runtime.trap("Jain Pathshala entry not found with id: " # id) };
      case (?_) { jainPathshalaEntries.remove(id) };
    };
  };

  /// Public: get all Jain Pathshala entries.
  public query func getAllJainPathshalaEntries() : async [JainPathshalaEntry] {
    jainPathshalaEntries.values().toArray();
  };

  /// Public: get Jain Pathshala entries filtered by category.
  public query func getJainPathshalaEntriesByCategory(category : Text) : async [JainPathshalaEntry] {
    let result = List.empty<JainPathshalaEntry>();
    for ((_, e) in jainPathshalaEntries.entries()) {
      if (e.category == category) { result.add(e) };
    };
    result.toArray();
  };

  // ─── Jain Kathas ──────────────────────────────────────────────────────────────

  public type JainKatha = {
    id : Text;
    title : Text;
    parv : Text;
    fullText : Text;
    significance : Text;
    occasion : Text;
    createdAt : Int;
  };

  let jainKathas = Map.empty<Text, JainKatha>();

  /// Admin-only: add a Jain Katha.
  public shared ({ caller }) func addJainKatha(katha : JainKatha) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add Jain Kathas");
    };
    switch (jainKathas.get(katha.id)) {
      case (?_) { Runtime.trap("Jain Katha already exists with id: " # katha.id) };
      case (null) { jainKathas.add(katha.id, katha) };
    };
  };

  /// Admin-only: update an existing Jain Katha.
  public shared ({ caller }) func updateJainKatha(katha : JainKatha) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update Jain Kathas");
    };
    switch (jainKathas.get(katha.id)) {
      case (null) { Runtime.trap("Jain Katha not found with id: " # katha.id) };
      case (?_) { jainKathas.add(katha.id, katha) };
    };
  };

  /// Admin-only: delete a Jain Katha.
  public shared ({ caller }) func deleteJainKatha(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete Jain Kathas");
    };
    switch (jainKathas.get(id)) {
      case (null) { Runtime.trap("Jain Katha not found with id: " # id) };
      case (?_) { jainKathas.remove(id) };
    };
  };

  /// Public: get all Jain Kathas.
  public query func getAllJainKathas() : async [JainKatha] {
    jainKathas.values().toArray();
  };

  /// Public: get Jain Kathas filtered by parv (occasion/festival).
  public query func getJainKathasByParv(parv : Text) : async [JainKatha] {
    let result = List.empty<JainKatha>();
    for ((_, k) in jainKathas.entries()) {
      if (k.parv == parv) { result.add(k) };
    };
    result.toArray();
  };

  // ─── Pathshala Lessons (Bal Sanskar Saurabh) ─────────────────────────────────

  public type PathshalaLesson = {
    id : Text;
    titleEn : Text;
    titleHi : Text;
    part : Text; // "Bhag-1" or "Bhag-2"
    chapterNumber : Nat;
    chapterTitle : Text;
    chapterTitleHi : Text;
    summary : Text;
    summaryHi : Text;
    content : Text;
    contentHi : Text;
    moralLesson : Text;
    moralLessonHi : Text;
    tags : [Text];
    isPublished : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  let pathshalaLessons = Map.empty<Text, PathshalaLesson>();

  // Seed Bal Sanskar Saurabh lessons on first load
  do {
    let seedLessons : [PathshalaLesson] = [
      {
        id = "psl-bhag1-01";
        titleEn = "Namaste - The Art of Respectful Greeting";
        titleHi = "नमस्ते — आदरपूर्ण अभिवादन की कला";
        part = "Bhag-1";
        chapterNumber = 1;
        chapterTitle = "Greetings and Respect";
        chapterTitleHi = "अभिवादन और आदर";
        summary = "Learn how to greet elders and guests with folded hands and the significance of Namaste in Hindu culture.";
        summaryHi = "बड़ों और मेहमानों को हाथ जोड़कर अभिवादन करना और हिंदू संस्कृति में नमस्ते के महत्व को जानें।";
        content = "Namaste is a traditional Hindu greeting performed by pressing palms together and bowing slightly. The word Namaste comes from Sanskrit meaning I bow to you. It acknowledges the divine in each person. When we greet our elders, teachers, and guests with Namaste, we show respect and humility. This simple gesture carries deep spiritual meaning — the hands pressed together symbolize the meeting of two souls. Children should practice greeting their parents, grandparents, and teachers with Namaste every morning and evening.";
        contentHi = "नमस्ते एक पारंपरिक हिंदू अभिवादन है जो हथेलियों को जोड़कर और हल्का झुककर किया जाता है। नमस्ते शब्द संस्कृत से आया है जिसका अर्थ है मैं आपको प्रणाम करता हूँ। यह प्रत्येक व्यक्ति में दिव्यता को स्वीकार करता है। जब हम अपने बड़ों, शिक्षकों और मेहमानों को नमस्ते से अभिवादन करते हैं तो हम सम्मान और विनम्रता दिखाते हैं। बच्चों को प्रत्येक सुबह और शाम अपने माता-पिता, दादा-दादी और शिक्षकों को नमस्ते से अभिवादन करने का अभ्यास करना चाहिए।";
        moralLesson = "Respect your elders and greet everyone with love and humility.";
        moralLessonHi = "अपने बड़ों का सम्मान करें और सभी को प्रेम और विनम्रता से अभिवादन करें।";
        tags = ["namaste", "greetings", "respect", "culture", "Sanskrit"];
        isPublished = true;
        createdAt = 1700000000000000000;
        updatedAt = 1700000000000000000;
      },
      {
        id = "psl-bhag1-02";
        titleEn = "Truthfulness - The Foundation of Good Character";
        titleHi = "सत्यनिष्ठा — अच्छे चरित्र की नींव";
        part = "Bhag-1";
        chapterNumber = 2;
        chapterTitle = "Truth and Honesty";
        chapterTitleHi = "सत्य और ईमानदारी";
        summary = "Understanding why speaking the truth is important and stories of great souls who followed the path of truth.";
        summaryHi = "सत्य बोलना क्यों महत्वपूर्ण है यह समझना और उन महान आत्माओं की कहानियाँ जिन्होंने सत्य के पथ का अनुसरण किया।";
        content = "Truth is the greatest virtue in Hindu dharma. Our scriptures say Satyam Vada Dharmam Chara — Speak truth, follow dharma. King Harishchandra is celebrated for never speaking a lie even when he faced immense hardships. When we speak the truth, we build trust with others and our conscience remains peaceful. A child who speaks the truth is loved and respected by all. Even when truth seems difficult, it always leads to good outcomes in the end.";
        contentHi = "हिंदू धर्म में सत्य सबसे बड़ा गुण है। हमारे शास्त्र कहते हैं सत्यं वद धर्मं चर — सत्य बोलो, धर्म का पालन करो। राजा हरिश्चंद्र को कभी झूठ न बोलने के लिए मनाया जाता है, यहाँ तक कि जब उन्होंने भारी कठिनाइयों का सामना किया। जब हम सत्य बोलते हैं तो हम दूसरों के साथ विश्वास बनाते हैं और हमारा अंतःकरण शांत रहता है। सत्य बोलने वाले बच्चे को सभी प्यार करते हैं और सम्मान देते हैं।";
        moralLesson = "Always speak the truth, even when it is difficult.";
        moralLessonHi = "हमेशा सत्य बोलो, चाहे कितना भी कठिन क्यों न हो।";
        tags = ["truth", "honesty", "character", "dharma", "Harishchandra"];
        isPublished = true;
        createdAt = 1700000000000000000;
        updatedAt = 1700000000000000000;
      },
      {
        id = "psl-bhag1-03";
        titleEn = "Service to Parents - Matru Devo Bhava";
        titleHi = "माता-पिता की सेवा — मातृ देवो भव";
        part = "Bhag-1";
        chapterNumber = 3;
        chapterTitle = "Devotion to Parents";
        chapterTitleHi = "माता-पिता के प्रति भक्ति";
        summary = "The sacred duty of children towards their parents and the teaching of Shravan Kumar who served his blind parents.";
        summaryHi = "बच्चों का माता-पिता के प्रति पवित्र कर्तव्य और श्रवण कुमार की शिक्षा जिन्होंने अपने अंधे माता-पिता की सेवा की।";
        content = "Our scriptures teach us: Matru Devo Bhava, Pitru Devo Bhava — Let your mother be your God, let your father be your God. Parents sacrifice everything for their children. Shravan Kumar, a celebrated figure in the Ramayana, carried his blind parents on a kavad (palanquin) on a pilgrimage. Children must obey their parents, help them with chores, speak politely to them, and take care of them when they are old or unwell. Serving parents is equal to serving God.";
        contentHi = "हमारे शास्त्र सिखाते हैं: मातृ देवो भव, पितृ देवो भव — माता को देव मानो, पिता को देव मानो। माता-पिता अपने बच्चों के लिए सब कुछ त्याग देते हैं। रामायण में प्रसिद्ध श्रवण कुमार ने अपने अंधे माता-पिता को एक कावड़ में तीर्थयात्रा पर ले जाया। बच्चों को अपने माता-पिता की आज्ञा का पालन करना चाहिए, घर के कामों में मदद करनी चाहिए, उनसे विनम्रता से बात करनी चाहिए और बुढ़ापे या बीमारी में उनकी देखभाल करनी चाहिए।";
        moralLesson = "Honor and serve your parents as they are your first God.";
        moralLessonHi = "माता-पिता का सम्मान और सेवा करो क्योंकि वे तुम्हारे पहले देव हैं।";
        tags = ["parents", "service", "Shravan Kumar", "dharma", "devotion"];
        isPublished = true;
        createdAt = 1700000000000000000;
        updatedAt = 1700000000000000000;
      },
      {
        id = "psl-bhag1-04";
        titleEn = "Cleanliness - Shuchita in Daily Life";
        titleHi = "स्वच्छता — दैनिक जीवन में शुचिता";
        part = "Bhag-1";
        chapterNumber = 4;
        chapterTitle = "Cleanliness and Purity";
        chapterTitleHi = "स्वच्छता और पवित्रता";
        summary = "The importance of physical and mental cleanliness as a spiritual discipline in Hindu tradition.";
        summaryHi = "हिंदू परंपरा में आध्यात्मिक अनुशासन के रूप में शारीरिक और मानसिक स्वच्छता का महत्व।";
        content = "Cleanliness is next to godliness. In Hindu tradition, shuchi (purity) is considered essential for spiritual progress. We start each day with bathing and brushing our teeth. We wash hands before and after meals. We keep our home, school, and surroundings clean. A clean body houses a clean mind, and a clean mind is close to God. Mahatma Gandhi taught us about Swachh Bharat — a clean India begins with every individual keeping their surroundings clean.";
        contentHi = "स्वच्छता ईश्वर के समीप होना है। हिंदू परंपरा में शुचि (पवित्रता) को आध्यात्मिक प्रगति के लिए आवश्यक माना जाता है। हम प्रत्येक दिन स्नान और दाँत साफ करके शुरू करते हैं। हम भोजन से पहले और बाद में हाथ धोते हैं। हम अपने घर, विद्यालय और आसपास को स्वच्छ रखते हैं। स्वच्छ शरीर में स्वच्छ मन बसता है, और स्वच्छ मन ईश्वर के निकट है।";
        moralLesson = "Keep your body, mind, and surroundings clean every day.";
        moralLessonHi = "प्रतिदिन अपने शरीर, मन और आसपास को स्वच्छ रखें।";
        tags = ["cleanliness", "purity", "shuchi", "health", "discipline"];
        isPublished = true;
        createdAt = 1700000000000000000;
        updatedAt = 1700000000000000000;
      },
      {
        id = "psl-bhag1-05";
        titleEn = "Morning Prayer and Daily Routine";
        titleHi = "प्रातः प्रार्थना और दैनिक दिनचर्या";
        part = "Bhag-1";
        chapterNumber = 5;
        chapterTitle = "Daily Discipline";
        chapterTitleHi = "दैनिक अनुशासन";
        summary = "The significance of waking up early, praying, and following a structured daily routine for children.";
        summaryHi = "बच्चों के लिए जल्दी उठने, प्रार्थना करने और व्यवस्थित दैनिक दिनचर्या का पालन करने का महत्व।";
        content = "Brahma Muhurta — the auspicious time between 4 and 6 AM — is considered the best time to wake up and pray. Our saints and sages rose early to meditate and seek blessings. A child who wakes up early gets more time to study, exercise, and prepare for the day. Morning prayers like Karagre Vasate Lakshmi set a positive tone for the day. After waking up, one should touch the earth with gratitude, recite morning prayers, brush teeth and bathe, eat breakfast with family, and go to school with a fresh and peaceful mind.";
        contentHi = "ब्रह्म मुहूर्त — सुबह 4 से 6 बजे का शुभ समय — उठने और प्रार्थना करने का सबसे अच्छा समय माना जाता है। हमारे संत और ऋषि ध्यान करने और आशीर्वाद लेने के लिए जल्दी उठते थे। जो बच्चा जल्दी उठता है उसे पढ़ाई, व्यायाम और दिन की तैयारी के लिए अधिक समय मिलता है। उठने के बाद कृतज्ञता से पृथ्वी को स्पर्श करना, प्रातः प्रार्थनाएँ पढ़ना, दाँत साफ करना और स्नान करना, परिवार के साथ नाश्ता करना और शांत मन से विद्यालय जाना चाहिए।";
        moralLesson = "Wake up early, pray, and follow a disciplined daily routine.";
        moralLessonHi = "जल्दी उठो, प्रार्थना करो और अनुशासित दैनिक दिनचर्या का पालन करो।";
        tags = ["morning prayer", "daily routine", "discipline", "Brahma Muhurta", "habits"];
        isPublished = true;
        createdAt = 1700000000000000000;
        updatedAt = 1700000000000000000;
      },
      {
        id = "psl-bhag2-01";
        titleEn = "Compassion for All Living Beings - Ahimsa";
        titleHi = "सभी जीवों के प्रति करुणा — अहिंसा";
        part = "Bhag-2";
        chapterNumber = 1;
        chapterTitle = "Non-Violence and Compassion";
        chapterTitleHi = "अहिंसा और करुणा";
        summary = "Understanding ahimsa as a core value of Indian civilization and how to practice it in daily life.";
        summaryHi = "अहिंसा को भारतीय सभ्यता के मूल मूल्य के रूप में समझना और इसे दैनिक जीवन में कैसे अपनाएं।";
        content = "Ahimsa Paramo Dharma — Non-violence is the highest religion. This is one of the most important teachings upheld by Mahatma Gandhi, Mahavir Swami, and the Buddha. Ahimsa means not hurting any living being — not just humans but animals, birds, and even insects — through thought, word, or deed. We can practice ahimsa by not hurting others in our speech, not killing insects unnecessarily, being kind to stray animals, feeding birds, and resolving conflicts with love and dialogue rather than violence.";
        contentHi = "अहिंसा परमो धर्म — अहिंसा सर्वोच्च धर्म है। यह भारतीय सभ्यता की सबसे महत्वपूर्ण शिक्षाओं में से एक है जिसे महात्मा गांधी, महावीर स्वामी और बुद्ध ने बनाए रखा। अहिंसा का अर्थ है किसी भी जीव को विचार, वचन या कर्म से चोट न पहुँचाना। हम अहिंसा का अभ्यास बोलने में दूसरों को चोट न पहुँचाकर, कीड़ों को बिना कारण न मारकर, आवारा पशुओं के प्रति दयालु होकर और प्रेम से संघर्षों को सुलझाकर कर सकते हैं।";
        moralLesson = "Be kind to all living beings and never hurt anyone through thought, word, or action.";
        moralLessonHi = "सभी जीवों के प्रति दयालु रहें और विचार, वचन या कर्म से किसी को कभी चोट न पहुँचाएं।";
        tags = ["ahimsa", "non-violence", "compassion", "Gandhi", "Mahavir"];
        isPublished = true;
        createdAt = 1700000000000000000;
        updatedAt = 1700000000000000000;
      },
      {
        id = "psl-bhag2-02";
        titleEn = "Sharing and Generosity - Dana and Seva";
        titleHi = "साझा करना और उदारता — दान और सेवा";
        part = "Bhag-2";
        chapterNumber = 2;
        chapterTitle = "Giving and Service";
        chapterTitleHi = "दान और सेवा";
        summary = "The joy of giving and how dana (charity) and seva (service) strengthen our connection to the community and God.";
        summaryHi = "देने का आनंद और कैसे दान और सेवा हमारे समुदाय और ईश्वर से संबंध को मजबूत करते हैं।";
        content = "Dana (charitable giving) and Seva (selfless service) are pillars of Hindu dharma. The Bhagavad Gita teaches that we should act without attachment to rewards — this is Nishkama Karma. Even small acts of sharing make a big difference: sharing lunch with a hungry friend, helping an elderly neighbor, donating old clothes to the needy, planting a tree, or cleaning a public space. Swami Vivekananda said: The poor man face is God face. When we serve others, we serve God.";
        contentHi = "दान और सेवा हिंदू धर्म के स्तंभ हैं। भगवद गीता सिखाती है कि हमें पुरस्कारों की आसक्ति के बिना कार्य करना चाहिए — यही निष्काम कर्म है। साझा करने के छोटे कार्य भी बड़ा अंतर डालते हैं: भूखे मित्र के साथ भोजन साझा करना, बुजुर्ग पड़ोसी की मदद करना, जरूरतमंदों को पुराने कपड़े दान करना, पेड़ लगाना। जब हम दूसरों की सेवा करते हैं तो हम ईश्वर की सेवा करते हैं।";
        moralLesson = "Share what you have and serve others selflessly — this is true dharma.";
        moralLessonHi = "जो है वो बाँटो और निःस्वार्थ भाव से दूसरों की सेवा करो — यही सच्चा धर्म है।";
        tags = ["dana", "seva", "generosity", "service", "karma"];
        isPublished = true;
        createdAt = 1700000000000000000;
        updatedAt = 1700000000000000000;
      },
      {
        id = "psl-bhag2-03";
        titleEn = "Respect for Teachers - Guru Mahima";
        titleHi = "गुरु का सम्मान — गुरु महिमा";
        part = "Bhag-2";
        chapterNumber = 3;
        chapterTitle = "The Greatness of Guru";
        chapterTitleHi = "गुरु की महानता";
        summary = "Understanding the role of the guru in Hindu tradition and how to honor and respect our teachers.";
        summaryHi = "हिंदू परंपरा में गुरु की भूमिका को समझना और अपने शिक्षकों का सम्मान कैसे करें।";
        content = "Guru Brahma Guru Vishnu Guru Devo Maheshwara — The teacher is Brahma, Vishnu, and Maheshwara. This ancient shloka shows the highest reverence given to teachers in India. Eklavya, a tribal boy, worshipped a clay idol of Dronacharya as his guru and became one of the greatest archers. Chanakya teachings shaped the mighty Chandragupta Maurya. A true student always arrives on time, listens attentively, does homework, respects the teacher wisdom, and maintains classroom discipline. Teachers light the lamp of knowledge in our hearts.";
        contentHi = "गुरु ब्रह्मा गुरु विष्णु गुरु देवो महेश्वरा — शिक्षक ब्रह्मा, विष्णु और महेश्वर है। यह प्राचीन श्लोक भारत में शिक्षकों को दिए गए उच्चतम सम्मान को दर्शाता है। एकलव्य ने द्रोणाचार्य की मिट्टी की मूर्ति की पूजा अपने गुरु के रूप में की और महानतम तीरंदाजों में से एक बन गया। एक सच्चा छात्र हमेशा समय पर विद्यालय आता है, ध्यान से सुनता है, गृहकार्य करता है और कक्षा में अनुशासन बनाए रखता है।";
        moralLesson = "Respect your teachers as they are your guides on the path of knowledge.";
        moralLessonHi = "अपने शिक्षकों का सम्मान करें क्योंकि वे ज्ञान के पथ पर आपके मार्गदर्शक हैं।";
        tags = ["guru", "teacher", "respect", "Eklavya", "education"];
        isPublished = true;
        createdAt = 1700000000000000000;
        updatedAt = 1700000000000000000;
      },
      {
        id = "psl-bhag2-04";
        titleEn = "Love for the Nation - Desh Bhakti";
        titleHi = "देश के प्रति प्रेम — देश भक्ति";
        part = "Bhag-2";
        chapterNumber = 4;
        chapterTitle = "Patriotism and National Pride";
        chapterTitleHi = "देशभक्ति और राष्ट्रीय गर्व";
        summary = "Inspiring children to love and serve their country by learning about great national heroes and their sacrifices.";
        summaryHi = "महान राष्ट्रीय नायकों और उनके बलिदानों के बारे में सीखकर बच्चों को अपने देश से प्यार करने के लिए प्रेरित करना।";
        content = "Bharat Mata Ki Jai — Victory to Mother India! Our country is one of the oldest civilizations in the world. Great patriots like Bhagat Singh, Subhash Chandra Bose, Rani Laxmibai, and Mangal Pandey gave their lives for our freedom. Today, we can serve our nation by studying hard to become good citizens, keeping our environment clean, respecting our national symbols — the flag, anthem, and emblem — and treating every fellow Indian with respect regardless of their religion or state.";
        contentHi = "भारत माता की जय! हमारा देश विश्व की सबसे पुरानी सभ्यताओं में से एक है। भगत सिंह, सुभाष चंद्र बोस, रानी लक्ष्मीबाई और मंगल पांडेय जैसे महान देशभक्तों ने हमारी आजादी के लिए अपने प्राण दिए। आज हम राष्ट्र की सेवा अच्छे नागरिक बनने के लिए कड़ी मेहनत से पढ़ाई करके, पर्यावरण को स्वच्छ रखकर और राष्ट्रीय प्रतीकों का सम्मान करके कर सकते हैं।";
        moralLesson = "Love your country and strive to make it better with your knowledge and character.";
        moralLessonHi = "अपने देश से प्यार करो और अपने ज्ञान और चरित्र से इसे बेहतर बनाने का प्रयास करो।";
        tags = ["patriotism", "nation", "Bharat", "freedom fighters", "citizenship"];
        isPublished = true;
        createdAt = 1700000000000000000;
        updatedAt = 1700000000000000000;
      },
      {
        id = "psl-bhag2-05";
        titleEn = "Environmental Stewardship - Prakriti Puja";
        titleHi = "पर्यावरण की देखभाल — प्रकृति पूजा";
        part = "Bhag-2";
        chapterNumber = 5;
        chapterTitle = "Worship of Nature";
        chapterTitleHi = "प्रकृति की पूजा";
        summary = "How Hindu culture has always revered nature and what children can do today to protect the environment.";
        summaryHi = "हिंदू संस्कृति ने हमेशा प्रकृति को कैसे पूजा है और बच्चे आज पर्यावरण की रक्षा के लिए क्या कर सकते हैं।";
        content = "In Hindu culture, we worship the sun through Surya Namaskar, rivers like Ganga Mata and Yamuna, trees like Peepal and Tulsi, and animals like Gau Mata. This ancient wisdom teaches us that nature is sacred. Our forests, rivers, mountains, and all living beings are part of one divine family. We can help protect nature by planting trees, avoiding plastic bags, saving water, turning off lights when not needed, and keeping our surroundings clean. Chipko Movement hero Sunderlal Bahuguna hugged trees to stop their cutting — that is true devotion to nature.";
        contentHi = "हिंदू संस्कृति में हम सूर्य नमस्कार, गंगा माता और यमुना जैसी नदियों, पीपल और तुलसी जैसे पेड़ों और गौ माता की पूजा करते हैं। यह प्राचीन ज्ञान हमें सिखाता है कि प्रकृति पवित्र है। हम पेड़ लगाकर, प्लास्टिक बैग से बचकर, पानी बचाकर, जरूरत न होने पर रोशनी बंद करके और आसपास को स्वच्छ रखकर प्रकृति की रक्षा में मदद कर सकते हैं।";
        moralLesson = "Respect and protect nature as it is the gift of God to all living beings.";
        moralLessonHi = "प्रकृति का सम्मान करें और उसकी रक्षा करें क्योंकि यह ईश्वर का सभी जीवों को उपहार है।";
        tags = ["nature", "environment", "prakriti", "trees", "sustainability"];
        isPublished = true;
        createdAt = 1700000000000000000;
        updatedAt = 1700000000000000000;
      },
    ];
    for (lesson in seedLessons.vals()) {
      if (pathshalaLessons.get(lesson.id) == null) {
        pathshalaLessons.add(lesson.id, lesson);
      };
    };
  };

  /// Admin-only: add a new Pathshala lesson.
  public shared ({ caller }) func addPathshalaLesson(lesson : PathshalaLesson) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add Pathshala lessons");
    };
    switch (pathshalaLessons.get(lesson.id)) {
      case (?_) { Runtime.trap("Pathshala lesson already exists with id: " # lesson.id) };
      case (null) { pathshalaLessons.add(lesson.id, lesson) };
    };
  };

  /// Admin-only: update an existing Pathshala lesson.
  public shared ({ caller }) func updatePathshalaLesson(id : Text, lesson : PathshalaLesson) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update Pathshala lessons");
    };
    switch (pathshalaLessons.get(id)) {
      case (null) { Runtime.trap("Pathshala lesson not found with id: " # id) };
      case (?_) { pathshalaLessons.add(id, lesson) };
    };
  };

  /// Admin-only: delete a Pathshala lesson.
  public shared ({ caller }) func deletePathshalaLesson(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete Pathshala lessons");
    };
    switch (pathshalaLessons.get(id)) {
      case (null) { Runtime.trap("Pathshala lesson not found with id: " # id) };
      case (?_) { pathshalaLessons.remove(id) };
    };
  };

  /// Admin-only: get all Pathshala lessons (published and unpublished).
  public query ({ caller }) func getAllPathshalaLessons() : async [PathshalaLesson] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all Pathshala lessons");
    };
    pathshalaLessons.values().toArray();
  };

  /// Public: get only published Pathshala lessons.
  public query func getPublishedPathshalaLessons() : async [PathshalaLesson] {
    let result = List.empty<PathshalaLesson>();
    for ((_, l) in pathshalaLessons.entries()) {
      if (l.isPublished) { result.add(l) };
    };
    result.toArray();
  };

  /// Public: get published Pathshala lessons filtered by part (Bhag-1 or Bhag-2).
  public query func getPathshalaLessonsByPart(part : Text) : async [PathshalaLesson] {
    let result = List.empty<PathshalaLesson>();
    for ((_, l) in pathshalaLessons.entries()) {
      if (l.isPublished and l.part == part) { result.add(l) };
    };
    result.toArray();
  };

  /// Public: get a single Pathshala lesson by id.
  public query func getPathshalaLesson(id : Text) : async ?PathshalaLesson {
    pathshalaLessons.get(id);
  };

  // ─── Service Bookings ─────────────────────────────────────────────────────────
  // Supports all new service categories:
  //   prediction / vedic-remedy / doorstep-pandit / temple-tour / birthday-ritual

  public type ServiceBooking = {
    id : Text;
    userId : Principal;
    serviceType : Text; // prediction / vedic-remedy / doorstep-pandit / temple-tour / birthday-ritual
    serviceName : Text;
    devoteeName : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    location : Text;
    specialRequests : Text;
    pricing : Float;
    status : Text; // pending / confirmed / completed
    createdAt : Int;
  };

  let serviceBookings = Map.empty<Text, ServiceBooking>();

  /// Authenticated users can create a service booking for themselves. Returns the booking id.
  public shared ({ caller }) func createServiceBooking(booking : ServiceBooking) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create service bookings");
    };
    if (caller != booking.userId) {
      Runtime.trap("Unauthorized: Cannot create a service booking for another user");
    };
    switch (serviceBookings.get(booking.id)) {
      case (?_) { Runtime.trap("Service booking already exists with id: " # booking.id) };
      case (null) {
        serviceBookings.add(booking.id, booking);
        booking.id;
      };
    };
  };

  /// Admin-only: get all service bookings for review.
  public query ({ caller }) func getServiceBookings() : async [ServiceBooking] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all service bookings");
    };
    serviceBookings.values().toArray();
  };

  /// Authenticated users can retrieve their own service bookings.
  public query ({ caller }) func getUserServiceBookings() : async [ServiceBooking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their service bookings");
    };
    let result = List.empty<ServiceBooking>();
    for ((_, b) in serviceBookings.entries()) {
      if (Principal.equal(b.userId, caller)) { result.add(b) };
    };
    result.toArray();
  };

   /// Admin-only: update the status of a service booking.
  public shared ({ caller }) func updateServiceBookingStatus(id : Text, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update service booking status");
    };
    switch (serviceBookings.get(id)) {
      case (null) { Runtime.trap("Service booking not found with id: " # id) };
      case (?existing) {
        serviceBookings.add(id, { existing with status });
      };
    };
  };

  // ─── Palmistry Content ───────────────────────────────────────────────────────

  public type PalmistryContent = {
    id : Text;
    title : Text;
    titleHi : Text;
    category : Text; // "palm_type" | "major_line" | "minor_line" | "characteristics"
    lineOrPalmType : Text;
    descriptionEn : Text;
    descriptionHi : Text;
    characteristicsEn : Text;
    characteristicsHi : Text;
    locationOnPalm : Text;
    benefitsEn : Text;
    benefitsHi : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  let palmistryContents = Map.empty<Text, PalmistryContent>();

  /// Admin-only: create a new palmistry content entry. Returns the created entry.
  public shared ({ caller }) func createPalmistryContent(
    title : Text,
    titleHi : Text,
    category : Text,
    lineOrPalmType : Text,
    descriptionEn : Text,
    descriptionHi : Text,
    characteristicsEn : Text,
    characteristicsHi : Text,
    locationOnPalm : Text,
    benefitsEn : Text,
    benefitsHi : Text,
  ) : async PalmistryContent {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create palmistry content");
    };
    let now = Time.now();
    let id = "palmistry-" # now.toText();
    let entry : PalmistryContent = {
      id;
      title;
      titleHi;
      category;
      lineOrPalmType;
      descriptionEn;
      descriptionHi;
      characteristicsEn;
      characteristicsHi;
      locationOnPalm;
      benefitsEn;
      benefitsHi;
      createdAt = now;
      updatedAt = now;
    };
    palmistryContents.add(id, entry);
    entry;
  };

  /// Admin-only: update an existing palmistry content entry. Returns the updated entry or null if not found.
  public shared ({ caller }) func updatePalmistryContent(
    id : Text,
    title : Text,
    titleHi : Text,
    category : Text,
    lineOrPalmType : Text,
    descriptionEn : Text,
    descriptionHi : Text,
    characteristicsEn : Text,
    characteristicsHi : Text,
    locationOnPalm : Text,
    benefitsEn : Text,
    benefitsHi : Text,
  ) : async ?PalmistryContent {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update palmistry content");
    };
    switch (palmistryContents.get(id)) {
      case (null) { null };
      case (?existing) {
        let updated : PalmistryContent = {
          existing with
          title;
          titleHi;
          category;
          lineOrPalmType;
          descriptionEn;
          descriptionHi;
          characteristicsEn;
          characteristicsHi;
          locationOnPalm;
          benefitsEn;
          benefitsHi;
          updatedAt = Time.now();
        };
        palmistryContents.add(id, updated);
        ?updated;
      };
    };
  };

  /// Admin-only: delete a palmistry content entry. Returns true if deleted, false if not found.
  public shared ({ caller }) func deletePalmistryContent(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete palmistry content");
    };
    switch (palmistryContents.get(id)) {
      case (null) { false };
      case (?_) {
        palmistryContents.remove(id);
        true;
      };
    };
  };

  /// Public: anyone may browse all palmistry content entries.
  public query func getPalmistryContents() : async [PalmistryContent] {
    palmistryContents.values().toArray();
  };

  /// Public: get a single palmistry content entry by id.
  public query func getPalmistryContent(id : Text) : async ?PalmistryContent {
    palmistryContents.get(id);
  };

  // ─── Vastu Content ───────────────────────────────────────────────────────────

  public type VastuContent = {
    id : Text;
    title : Text;
    titleHi : Text;
    category : Text; // "direction" | "room" | "element" | "brahma_sthana"
    directionOrRoom : Text;
    planetaryRuler : Text;
    planetaryRulerHi : Text;
    effectsEn : Text;
    effectsHi : Text;
    doshaEn : Text;
    doshaHi : Text;
    remediesEn : Text;
    remediesHi : Text;
    yantra : Text;
    elementsInvolved : Text;
    tipsEn : Text;
    tipsHi : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  let vastuContents = Map.empty<Text, VastuContent>();

  /// Admin-only: create a new vastu content entry. Returns the created entry.
  public shared ({ caller }) func createVastuContent(
    title : Text,
    titleHi : Text,
    category : Text,
    directionOrRoom : Text,
    planetaryRuler : Text,
    planetaryRulerHi : Text,
    effectsEn : Text,
    effectsHi : Text,
    doshaEn : Text,
    doshaHi : Text,
    remediesEn : Text,
    remediesHi : Text,
    yantra : Text,
    elementsInvolved : Text,
    tipsEn : Text,
    tipsHi : Text,
  ) : async VastuContent {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create vastu content");
    };
    let now = Time.now();
    let id = "vastu-" # now.toText();
    let entry : VastuContent = {
      id;
      title;
      titleHi;
      category;
      directionOrRoom;
      planetaryRuler;
      planetaryRulerHi;
      effectsEn;
      effectsHi;
      doshaEn;
      doshaHi;
      remediesEn;
      remediesHi;
      yantra;
      elementsInvolved;
      tipsEn;
      tipsHi;
      createdAt = now;
      updatedAt = now;
    };
    vastuContents.add(id, entry);
    entry;
  };

  /// Admin-only: update an existing vastu content entry. Returns the updated entry or null if not found.
  public shared ({ caller }) func updateVastuContent(
    id : Text,
    title : Text,
    titleHi : Text,
    category : Text,
    directionOrRoom : Text,
    planetaryRuler : Text,
    planetaryRulerHi : Text,
    effectsEn : Text,
    effectsHi : Text,
    doshaEn : Text,
    doshaHi : Text,
    remediesEn : Text,
    remediesHi : Text,
    yantra : Text,
    elementsInvolved : Text,
    tipsEn : Text,
    tipsHi : Text,
  ) : async ?VastuContent {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update vastu content");
    };
    switch (vastuContents.get(id)) {
      case (null) { null };
      case (?existing) {
        let updated : VastuContent = {
          existing with
          title;
          titleHi;
          category;
          directionOrRoom;
          planetaryRuler;
          planetaryRulerHi;
          effectsEn;
          effectsHi;
          doshaEn;
          doshaHi;
          remediesEn;
          remediesHi;
          yantra;
          elementsInvolved;
          tipsEn;
          tipsHi;
          updatedAt = Time.now();
        };
        vastuContents.add(id, updated);
        ?updated;
      };
    };
  };

  /// Admin-only: delete a vastu content entry. Returns true if deleted, false if not found.
  public shared ({ caller }) func deleteVastuContent(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete vastu content");
    };
    switch (vastuContents.get(id)) {
      case (null) { false };
      case (?_) {
        vastuContents.remove(id);
        true;
      };
    };
  };

  /// Public: anyone may browse all vastu content entries.
  public query func getVastuContents() : async [VastuContent] {
    vastuContents.values().toArray();
  };

  /// Public: get a single vastu content entry by id.
  public query func getVastuContent(id : Text) : async ?VastuContent {
    vastuContents.get(id);
  };

  // ─── Palm Photo Reading ───────────────────────────────────────────────────────

  public type PalmPhotoReading = {
    id : Text;
    userId : Principal;
    photoUrl : Text;
    handType : Text;
    palmShape : Text;
    lineAnnotations : Text;
    readingText : Text;
    dominantLine : Text;
    luckySigns : Text;
    createdAt : Int;
  };

  let palmPhotoReadings = Map.empty<Text, PalmPhotoReading>();

  /// Authenticated user: create a palm photo reading. Returns the created entry.
  public shared ({ caller }) func createPalmPhotoReading(
    photoUrl : Text,
    handType : Text,
    palmShape : Text,
    lineAnnotations : Text,
    readingText : Text,
    dominantLine : Text,
    luckySigns : Text,
  ) : async PalmPhotoReading {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create palm photo readings");
    };
    let now = Time.now();
    let id = "palmreading-" # now.toText() # "-" # caller.toText();
    let entry : PalmPhotoReading = {
      id;
      userId = caller;
      photoUrl;
      handType;
      palmShape;
      lineAnnotations;
      readingText;
      dominantLine;
      luckySigns;
      createdAt = now;
    };
    palmPhotoReadings.add(id, entry);
    entry;
  };

  /// Authenticated user: update an existing palm photo reading they own. Returns updated entry or null.
  public shared ({ caller }) func updatePalmPhotoReading(
    id : Text,
    photoUrl : Text,
    handType : Text,
    palmShape : Text,
    lineAnnotations : Text,
    readingText : Text,
    dominantLine : Text,
    luckySigns : Text,
  ) : async ?PalmPhotoReading {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update palm photo readings");
    };
    switch (palmPhotoReadings.get(id)) {
      case (null) { null };
      case (?existing) {
        if (existing.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You can only update your own palm photo readings");
        };
        let updated : PalmPhotoReading = {
          existing with
          photoUrl;
          handType;
          palmShape;
          lineAnnotations;
          readingText;
          dominantLine;
          luckySigns;
        };
        palmPhotoReadings.add(id, updated);
        ?updated;
      };
    };
  };

  /// Authenticated user: delete a palm photo reading they own. Returns true if deleted.
  public shared ({ caller }) func deletePalmPhotoReading(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can delete palm photo readings");
    };
    switch (palmPhotoReadings.get(id)) {
      case (null) { false };
      case (?existing) {
        if (existing.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You can only delete your own palm photo readings");
        };
        palmPhotoReadings.remove(id);
        true;
      };
    };
  };

  /// Authenticated user: get all their own palm photo readings.
  public query ({ caller }) func getMyPalmPhotoReadings() : async [PalmPhotoReading] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can get their palm photo readings");
    };
    palmPhotoReadings.values().filter(func(r) { r.userId == caller }).toArray();
  };

  /// Get a single palm photo reading by id (owner or admin).
  public query ({ caller }) func getPalmPhotoReading(id : Text) : async ?PalmPhotoReading {
    switch (palmPhotoReadings.get(id)) {
      case (null) { null };
      case (?entry) {
        if (entry.userId == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?entry;
        } else {
          Runtime.trap("Unauthorized: You can only view your own palm photo readings");
        };
      };
    };
  };

  // ─── Vastu Room Check ─────────────────────────────────────────────────────────

  public type VastuRoomCheck = {
    id : Text;
    userId : Principal;
    floorPlanUrl : Text;
    roomType : Text;
    roomDimensions : Text;
    entranceDirection : Text;
    complianceScore : Nat;
    issuesJson : Text;
    remediesJson : Text;
    elementBalance : Text;
    createdAt : Int;
  };

  let vastuRoomChecks = Map.empty<Text, VastuRoomCheck>();

  /// Authenticated user: create a vastu room check. Returns the created entry.
  public shared ({ caller }) func createVastuRoomCheck(
    floorPlanUrl : Text,
    roomType : Text,
    roomDimensions : Text,
    entranceDirection : Text,
    complianceScore : Nat,
    issuesJson : Text,
    remediesJson : Text,
    elementBalance : Text,
  ) : async VastuRoomCheck {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create vastu room checks");
    };
    let now = Time.now();
    let id = "vastucheck-" # now.toText() # "-" # caller.toText();
    let entry : VastuRoomCheck = {
      id;
      userId = caller;
      floorPlanUrl;
      roomType;
      roomDimensions;
      entranceDirection;
      complianceScore;
      issuesJson;
      remediesJson;
      elementBalance;
      createdAt = now;
    };
    vastuRoomChecks.add(id, entry);
    entry;
  };

  /// Authenticated user: update an existing vastu room check they own. Returns updated entry or null.
  public shared ({ caller }) func updateVastuRoomCheck(
    id : Text,
    floorPlanUrl : Text,
    roomType : Text,
    roomDimensions : Text,
    entranceDirection : Text,
    complianceScore : Nat,
    issuesJson : Text,
    remediesJson : Text,
    elementBalance : Text,
  ) : async ?VastuRoomCheck {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update vastu room checks");
    };
    switch (vastuRoomChecks.get(id)) {
      case (null) { null };
      case (?existing) {
        if (existing.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You can only update your own vastu room checks");
        };
        let updated : VastuRoomCheck = {
          existing with
          floorPlanUrl;
          roomType;
          roomDimensions;
          entranceDirection;
          complianceScore;
          issuesJson;
          remediesJson;
          elementBalance;
        };
        vastuRoomChecks.add(id, updated);
        ?updated;
      };
    };
  };

  /// Authenticated user: delete a vastu room check they own. Returns true if deleted.
  public shared ({ caller }) func deleteVastuRoomCheck(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can delete vastu room checks");
    };
    switch (vastuRoomChecks.get(id)) {
      case (null) { false };
      case (?existing) {
        if (existing.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You can only delete your own vastu room checks");
        };
        vastuRoomChecks.remove(id);
        true;
      };
    };
  };

  /// Authenticated user: get all their own vastu room checks.
  public query ({ caller }) func getMyVastuRoomChecks() : async [VastuRoomCheck] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can get their vastu room checks");
    };
    vastuRoomChecks.values().filter(func(r) { r.userId == caller }).toArray();
  };

  /// Get a single vastu room check by id (owner or admin).
  public query ({ caller }) func getVastuRoomCheck(id : Text) : async ?VastuRoomCheck {
    switch (vastuRoomChecks.get(id)) {
      case (null) { null };
      case (?entry) {
        if (entry.userId == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?entry;
        } else {
          Runtime.trap("Unauthorized: You can only view your own vastu room checks");
        };
      };
    };
  };

  // ─── Combined Vedic Reading ───────────────────────────────────────────────────

  public type CombinedVedicReading = {
    id : Text;
    userId : Principal;
    palmReadingId : Text;
    birthDate : Text;
    birthTime : Text;
    birthPlace : Text;
    lagnaSign : Text;
    moonSign : Text;
    sunSign : Text;
    activeDasha : Text;
    doshasJson : Text;
    palmInsightsJson : Text;
    combinedInsightsText : Text;
    remediesText : Text;
    createdAt : Int;
  };

  let combinedVedicReadings = Map.empty<Text, CombinedVedicReading>();

  /// Authenticated user: create a combined vedic reading. Returns the created entry.
  public shared ({ caller }) func createCombinedVedicReading(
    palmReadingId : Text,
    birthDate : Text,
    birthTime : Text,
    birthPlace : Text,
    lagnaSign : Text,
    moonSign : Text,
    sunSign : Text,
    activeDasha : Text,
    doshasJson : Text,
    palmInsightsJson : Text,
    combinedInsightsText : Text,
    remediesText : Text,
  ) : async CombinedVedicReading {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create combined vedic readings");
    };
    let now = Time.now();
    let id = "combinedvedic-" # now.toText() # "-" # caller.toText();
    let entry : CombinedVedicReading = {
      id;
      userId = caller;
      palmReadingId;
      birthDate;
      birthTime;
      birthPlace;
      lagnaSign;
      moonSign;
      sunSign;
      activeDasha;
      doshasJson;
      palmInsightsJson;
      combinedInsightsText;
      remediesText;
      createdAt = now;
    };
    combinedVedicReadings.add(id, entry);
    entry;
  };

  /// Authenticated user: update an existing combined vedic reading they own. Returns updated entry or null.
  public shared ({ caller }) func updateCombinedVedicReading(
    id : Text,
    palmReadingId : Text,
    birthDate : Text,
    birthTime : Text,
    birthPlace : Text,
    lagnaSign : Text,
    moonSign : Text,
    sunSign : Text,
    activeDasha : Text,
    doshasJson : Text,
    palmInsightsJson : Text,
    combinedInsightsText : Text,
    remediesText : Text,
  ) : async ?CombinedVedicReading {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update combined vedic readings");
    };
    switch (combinedVedicReadings.get(id)) {
      case (null) { null };
      case (?existing) {
        if (existing.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You can only update your own combined vedic readings");
        };
        let updated : CombinedVedicReading = {
          existing with
          palmReadingId;
          birthDate;
          birthTime;
          birthPlace;
          lagnaSign;
          moonSign;
          sunSign;
          activeDasha;
          doshasJson;
          palmInsightsJson;
          combinedInsightsText;
          remediesText;
        };
        combinedVedicReadings.add(id, updated);
        ?updated;
      };
    };
  };

  /// Authenticated user: delete a combined vedic reading they own. Returns true if deleted.
  public shared ({ caller }) func deleteCombinedVedicReading(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can delete combined vedic readings");
    };
    switch (combinedVedicReadings.get(id)) {
      case (null) { false };
      case (?existing) {
        if (existing.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You can only delete your own combined vedic readings");
        };
        combinedVedicReadings.remove(id);
        true;
      };
    };
  };

  /// Authenticated user: get all their own combined vedic readings.
  public query ({ caller }) func getMyCombinedVedicReadings() : async [CombinedVedicReading] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can get their combined vedic readings");
    };
    combinedVedicReadings.values().filter(func(r) { r.userId == caller }).toArray();
  };

  /// Get a single combined vedic reading by id (owner or admin).
  public query ({ caller }) func getCombinedVedicReading(id : Text) : async ?CombinedVedicReading {
    switch (combinedVedicReadings.get(id)) {
      case (null) { null };
      case (?entry) {
        if (entry.userId == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?entry;
        } else {
          Runtime.trap("Unauthorized: You can only view your own combined vedic readings");
        };
      };
    };
  };

  // ─── Newsletter Subscriptions ─────────────────────────────────────────────────

  public type NewsletterSubscription = {
    id : Text;
    email : Text;
    name : ?Text;
    subscribedAt : Int;
    source : Text; // "popup-load" | "popup-scroll" | "blog-inline" | "newsletter-page"
    isActive : Bool;
  };

  // Keyed by email for fast duplicate detection.
  let newsletterSubscriptions = Map.empty<Text, NewsletterSubscription>();

  /// Public: subscribe to the newsletter. Returns error if email is empty or already subscribed.
  public shared func addNewsletterSubscription(email : Text, name : ?Text, source : Text) : async { #ok : NewsletterSubscription; #err : Text } {
    if (email == "") {
      return #err("Email address cannot be empty");
    };
    switch (newsletterSubscriptions.get(email)) {
      case (?existing) {
        if (existing.isActive) {
          return #err("This email is already subscribed");
        };
        // Re-activate a previously unsubscribed email
        let reactivated : NewsletterSubscription = { existing with isActive = true; subscribedAt = Time.now(); source };
        newsletterSubscriptions.add(email, reactivated);
        return #ok(reactivated);
      };
      case (null) {};
    };
    let sub : NewsletterSubscription = {
      id = email # "-" # Time.now().toText();
      email;
      name;
      subscribedAt = Time.now();
      source;
      isActive = true;
    };
    newsletterSubscriptions.add(email, sub);
    #ok(sub);
  };

  /// Admin-only: get all newsletter subscriptions.
  public query ({ caller }) func getNewsletterSubscriptions() : async [NewsletterSubscription] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view newsletter subscriptions");
    };
    newsletterSubscriptions.values().toArray();
  };

  /// Admin-only: delete a newsletter subscription by email.
  public shared ({ caller }) func deleteNewsletterSubscription(email : Text) : async { #ok; #err : Text } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete newsletter subscriptions");
    };
    switch (newsletterSubscriptions.get(email)) {
      case (null) { #err("Subscription not found for email: " # email) };
      case (?_) {
        newsletterSubscriptions.remove(email);
        #ok;
      };
    };
  };

  /// Public: unsubscribe from the newsletter (sets isActive = false).
  public shared func unsubscribeNewsletter(email : Text) : async { #ok; #err : Text } {
    switch (newsletterSubscriptions.get(email)) {
      case (null) { #err("Subscription not found for email: " # email) };
      case (?existing) {
        newsletterSubscriptions.add(email, { existing with isActive = false });
        #ok;
      };
    };
  };
};
