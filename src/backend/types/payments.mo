import Principal "mo:core/Principal";

module {
  /// Valid product types for Stripe checkout.
  /// "tarot" | "kundli" | "369-book" | "life-report" | "pricing-tier"
  public type ProductType = Text;

  /// A recorded successful purchase.
  public type Purchase = {
    productType : ProductType;
    sessionId : Text;
    amount : Nat;
    timestamp : Int;
  };

  /// Internal storage record keyed by caller Principal.
  public type UserPurchases = {
    userId : Principal;
    purchases : [Purchase];
  };
};
