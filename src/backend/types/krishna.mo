import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  /// A single turn in the Krishna AI chat history.
  public type ChatMessage = {
    question : Text;
    answer : Text;
    timestamp : Int;
  };

  /// Internal storage record keyed by caller Principal.
  public type ChatHistory = {
    userId : Principal;
    messages : [ChatMessage];
  };
};
