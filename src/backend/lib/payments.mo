import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Types "../types/payments";
import Nat "mo:core/Nat";

module {
  // ── Purchase record helpers ───────────────────────────────────────────────

  /// Return a caller's purchase history as an immutable array.
  public func getPurchases(
    purchaseStore : Map.Map<Principal, List.List<Types.Purchase>>,
    caller : Principal
  ) : [Types.Purchase] {
    switch (purchaseStore.get(caller)) {
      case (null) { [] };
      case (?list) { list.toArray() };
    };
  };

  /// Append a verified purchase to the store.
  public func recordPurchase(
    purchaseStore : Map.Map<Principal, List.List<Types.Purchase>>,
    caller : Principal,
    purchase : Types.Purchase
  ) {
    switch (purchaseStore.get(caller)) {
      case (null) {
        let newList = List.empty<Types.Purchase>();
        newList.add(purchase);
        purchaseStore.add(caller, newList);
      };
      case (?existing) {
        existing.add(purchase);
      };
    };
  };

  // ── Stripe helpers ────────────────────────────────────────────────────────

  /// Build the Stripe Checkout Session creation request body.
  /// productType: "tarot" | "kundli" | "369-book" | "life-report" | "pricing-tier"
  public func buildCheckoutBody(
    productType : Text,
    amount : Nat,
    _metadata : Text,
    _successUrl : Text,
    _cancelUrl : Text
  ) : Text {
    // Returns a descriptive name for the product line item
    let productName = switch (productType) {
      case ("tarot") { "Tarot Reading" };
      case ("kundli") { "Personalised Kundli Report" };
      case ("369-book") { "369 Law of Attraction Book" };
      case ("life-report") { "Vedic Life Report" };
      case ("pricing-tier") { "Spiritual Connect Premium" };
      case (_) { "Spiritual Connect Service" };
    };
    productName # " (Amount: " # amount.toText() # ")";
  };

  /// Parse the checkout session URL from the Stripe API response body.
  public func parseCheckoutUrl(responseBody : Text) : Text {
    // Extract "url":"..." from Stripe session JSON
    let marker = "\"url\":\"";
    var found = false;
    var result = "";
    for (part in responseBody.split(#text marker)) {
      if (found and result == "") {
        switch (part.split(#text "\"").next()) {
          case (null) { result := part };
          case (?u) { result := u };
        };
      };
      found := true;
    };
    result;
  };

  /// Parse the payment status ("paid" | "unpaid" | "no_payment_required")
  /// from a Stripe retrieve-session response.
  public func parsePaymentStatus(responseBody : Text) : Text {
    // Extract "payment_status":"..." from Stripe session JSON
    let marker = "\"payment_status\":\"";
    var found = false;
    var result = "unpaid";
    for (part in responseBody.split(#text marker)) {
      if (found and result == "unpaid") {
        switch (part.split(#text "\"").next()) {
          case (null) { };
          case (?s) { result := s };
        };
      };
      found := true;
    };
    result;
  };
};
