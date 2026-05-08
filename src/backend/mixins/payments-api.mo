import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Types "../types/payments";
import PaymentsLib "../lib/payments";
import Stripe "../stripe/stripe";

/// Public Stripe Payments mixin.
/// Receives injected state: purchaseStore, getConfig (returns live Stripe config),
/// and the transform query function for IC http outcalls.
mixin (
  purchaseStore : Map.Map<Principal, List.List<Types.Purchase>>,
  getConfig : () -> Stripe.StripeConfiguration,
  transformFn : query (Stripe.TransformInput) -> async Stripe.TransformOutput
) {

  /// Create a real Stripe Checkout Session for the given product.
  /// productType: "tarot" | "kundli" | "369-book" | "life-report" | "pricing-tier"
  /// Returns the Stripe-hosted checkout URL.
  /// Requires authenticated (non-anonymous) caller.
  public shared ({ caller }) func createStripeSession(
    productType : Text,
    amount : Nat,
    _metadata : Text
  ) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Please log in to create a payment session");
    };
    let cfg = getConfig();
    let productName = PaymentsLib.buildCheckoutBody(productType, amount, "", "", "");
    let item : Stripe.ShoppingItem = {
      name = productName;
      price = amount.toFloat();
      quantity = 1;
    };
    let successUrl = "https://spiritual-connect.app/payment/success?session_id={CHECKOUT_SESSION_ID}";
    let cancelUrl = "https://spiritual-connect.app/payment/cancel";
    await Stripe.createCheckoutSession(cfg, caller, [item], successUrl, cancelUrl, transformFn);
  };

  /// Verify whether a Stripe Checkout Session completed with payment.
  /// Returns true if payment_status == "paid".
  /// On success, records the purchase in the buyer's history.
  /// Requires authenticated (non-anonymous) caller.
  public shared ({ caller }) func verifyStripePayment(sessionId : Text) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Please log in to verify payment");
    };
    let cfg = getConfig();
    let statusResult = await Stripe.getSessionStatus(cfg, sessionId, transformFn);
    let isPaid = statusResult.paymentStatus == "paid";
    if (isPaid) {
      let purchase : Types.Purchase = {
        productType = "verified";
        sessionId;
        amount = 0;
        timestamp = Time.now();
      };
      PaymentsLib.recordPurchase(purchaseStore, caller, purchase);
    };
    isPaid;
  };

  /// Return the caller's list of verified successful purchases.
  /// Requires authenticated (non-anonymous) caller.
  public query ({ caller }) func getUserPurchases() : async [Types.Purchase] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Please log in to view your purchases");
    };
    PaymentsLib.getPurchases(purchaseStore, caller);
  };

};
