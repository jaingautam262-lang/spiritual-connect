import Principal "mo:core/Principal";

module {
  public type StripeConfiguration = {
    secretKey : Text;
    allowedCountries : [Text];
  };

  public type ShoppingItem = {
    name : Text;
    price : Float;
    quantity : Nat;
  };

  public type StripeSessionStatus = {
    status : Text;
    paymentStatus : Text;
    customerEmail : Text;
  };

  public func getSessionStatus(
    _config : StripeConfiguration,
    _sessionId : Text,
    _transform : query (TransformInput) -> async TransformOutput,
  ) : async StripeSessionStatus {
    { status = "open"; paymentStatus = "unpaid"; customerEmail = "" };
  };

  public func createCheckoutSession(
    _config : StripeConfiguration,
    _caller : Principal,
    _items : [ShoppingItem],
    _successUrl : Text,
    _cancelUrl : Text,
    _transform : query (TransformInput) -> async TransformOutput,
  ) : async Text {
    "";
  };

  public type TransformInput = {
    context : [Nat8];
    response : HttpResponse;
  };

  public type TransformOutput = {
    response : HttpResponse;
  };

  public type HttpResponse = {
    status : Nat;
    headers : [(Text, Text)];
    body : [Nat8];
  };
};
