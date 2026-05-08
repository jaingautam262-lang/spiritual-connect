import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Types "../types/krishna";
import KrishnaLib "../lib/krishna";

/// Public Krishna AI mixin.
/// Receives injected state: chatHistories.
mixin (
  chatHistories : Map.Map<Principal, List.List<Types.ChatMessage>>
) {

  /// Ask Krishna a question.
  /// Uses http-outcalls to call an LLM with a Krishna-wisdom persona.
  /// Falls back to a curated response if the LLM call fails.
  /// Requires authenticated (non-anonymous) caller.
  public shared ({ caller }) func askKrishna(question : Text) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Please log in to speak with Krishna AI");
    };

    let systemPrompt = KrishnaLib.buildSystemPrompt();
    let requestBody = KrishnaLib.buildRequestBody(systemPrompt, question);
    let bodyBytes = requestBody.encodeUtf8();

    // IC management canister for HTTP outcalls — must be declared inside the mixin body
    let IC = actor "aaaaa-aa" : actor {
      http_request : ({
        url : Text;
        max_response_bytes : ?Nat64;
        method : { #get; #head; #post };
        headers : [{ name : Text; value : Text }];
        body : ?Blob;
        transform : ?{
          function : shared query ({
            response : {
              status : Nat;
              headers : [{ name : Text; value : Text }];
              body : Blob;
            };
            context : Blob;
          }) -> async {
            status : Nat;
            headers : [{ name : Text; value : Text }];
            body : Blob;
          };
          context : Blob;
        };
      }) -> async {
        status : Nat;
        headers : [{ name : Text; value : Text }];
        body : Blob;
      };
    };

    let answer = try {
      let response = await IC.http_request({
        url = "https://api.anthropic.com/v1/messages";
        max_response_bytes = ?4096;
        method = #post;
        headers = [
          { name = "content-type"; value = "application/json" },
          { name = "x-api-key"; value = "sk-ant-placeholder" },
          { name = "anthropic-version"; value = "2023-06-01" },
        ];
        body = ?bodyBytes;
        transform = null;
      });
      let rawText = switch (response.body.decodeUtf8()) {
        case (null) { KrishnaLib.fallbackAnswer(question) };
        case (?t) { KrishnaLib.parseResponse(t) };
      };
      rawText;
    } catch (_e) {
      KrishnaLib.fallbackAnswer(question);
    };

    KrishnaLib.recordMessage(chatHistories, caller, question, answer);
    answer;
  };

  /// Return the caller's full chat history with Krishna AI.
  /// Requires authenticated (non-anonymous) caller.
  public query ({ caller }) func getKrishnaHistory() : async [Types.ChatMessage] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Please log in to view Krishna AI history");
    };
    KrishnaLib.getHistory(chatHistories, caller);
  };

};
