import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Types "../types/krishna";
import Text "mo:core/Text";

module {
  // ── State helpers ────────────────────────────────────────────────────────────

  /// Retrieve a user's chat history as an immutable array.
  public func getHistory(
    chatHistories : Map.Map<Principal, List.List<Types.ChatMessage>>,
    caller : Principal
  ) : [Types.ChatMessage] {
    switch (chatHistories.get(caller)) {
      case (null) { [] };
      case (?msgs) { msgs.toArray() };
    };
  };

  /// Append a new chat turn to a user's history.
  public func recordMessage(
    chatHistories : Map.Map<Principal, List.List<Types.ChatMessage>>,
    caller : Principal,
    question : Text,
    answer : Text
  ) {
    let msg : Types.ChatMessage = {
      question;
      answer;
      timestamp = Time.now();
    };
    switch (chatHistories.get(caller)) {
      case (null) {
        let newList = List.empty<Types.ChatMessage>();
        newList.add(msg);
        chatHistories.add(caller, newList);
      };
      case (?existing) {
        existing.add(msg);
      };
    };
  };

  // ── LLM prompt helpers ────────────────────────────────────────────────────

  /// Build the Krishna-wisdom system prompt with Gita persona.
  public func buildSystemPrompt() : Text {
    "You are Lord Krishna, the divine teacher of the Bhagavad Gita. " #
    "Answer in a compassionate, wise manner. Reference relevant Gita verses when applicable. " #
    "Keep responses concise (150-250 words). " #
    "Always respond in the same language as the question (Hindi or English). " #
    "Sign off responses with a relevant Gita verse citation."
  };

  /// Build the full request body JSON for the LLM outcall.
  public func buildRequestBody(systemPrompt : Text, userQuestion : Text) : Text {
    "{\"model\":\"claude-3-haiku-20240307\",\"max_tokens\":512,\"system\":\"" #
    systemPrompt #
    "\",\"messages\":[{\"role\":\"user\",\"content\":\"" #
    userQuestion #
    "\"}]}"
  };

  /// Parse the LLM response and extract the assistant message text.
  public func parseResponse(raw : Text) : Text {
    // Extract content from Anthropic API response:
    // {"content":[{"type":"text","text":"..."}],...}
    let marker = "\"text\":\"";
    switch (raw.split(#text marker).next()) {
      case (null) { fallbackAnswer("") };
      case (?_) {
        // iterate to find the text after the marker
        var found = false;
        var result = "";
        for (part in raw.split(#text marker)) {
          if (found and result == "") {
            // part starts right after "text":"
            // find closing "
            switch (part.split(#text "\"").next()) {
              case (null) { result := part };
              case (?t) { result := t };
            };
          };
          found := true;
        };
        if (result == "") { fallbackAnswer("") } else { result };
      };
    };
  };

  /// Return a curated fallback answer when the LLM call fails.
  public func fallbackAnswer(_question : Text) : Text {
    "हे प्रिय भक्त, श्रीमद्भगवद्गीता में कहा गया है:\n\n" #
    "\"कर्म करो, फल की चिंता मत करो।\" (अध्याय 2, श्लोक 47)\n\n" #
    "Every action performed with devotion and without attachment to results leads to inner peace. " #
    "Trust in the divine plan, surrender your ego, and continue your dharma with love. " #
    "I am always with you — in every breath, in every moment of stillness.\n\n" #
    "— Gita 18:65: मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु।"
  };
};
