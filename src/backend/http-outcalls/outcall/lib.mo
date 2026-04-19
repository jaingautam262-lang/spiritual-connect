module {
  public type HttpResponse = {
    status : Nat;
    headers : [(Text, Text)];
    body : [Nat8];
  };

  public type TransformationInput = {
    context : [Nat8];
    response : HttpResponse;
  };

  public type TransformationOutput = {
    response : HttpResponse;
  };

  public func transform(input : TransformationInput) : TransformationOutput {
    { response = input.response };
  };
};
