import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  MessageSquarePlus,
  X,
} from "lucide-react";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useAskKrishna, useKrishnaHistory } from "../hooks/useQueries";

interface Message {
  id: number;
  role: "user" | "krishna";
  text: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  date: string;
  firstQuestion: string;
  messages: Message[];
}

const SUGGESTED_QUESTIONS_HI = [
  "जीवन का असली उद्देश्य क्या है?",
  "कर्म और उसके फल के बारे में क्या कहती है गीता?",
  "मन की शांति कैसे पाएं?",
  "प्रेम और भक्ति में क्या अंतर है?",
  "कष्ट और दुःख का सामना कैसे करें?",
  "आत्मा क्या है और मृत्यु के बाद क्या होता है?",
  "सफलता और धन के बारे में गीता क्या कहती है?",
  "कर्तव्य निभाने में कठिनाई हो तो क्या करें?",
  "ध्यान और योग का अभ्यास कैसे शुरू करें?",
  "परिवार और रिश्तों में सही व्यवहार क्या है?",
];

const SUGGESTED_QUESTIONS_EN = [
  "What is the true purpose of life?",
  "What does the Gita say about karma and its fruits?",
  "How can I find peace of mind?",
  "What is the difference between love and devotion?",
  "How should I face suffering and pain?",
  "What is the soul and what happens after death?",
  "What does the Gita say about success and wealth?",
  "What to do when fulfilling duty feels difficult?",
  "How to begin the practice of meditation and yoga?",
  "What is righteous behavior in family and relationships?",
];

const SESSIONS_KEY = "krishna_ai_sessions";

function loadSessions(): ChatSession[] {
  try {
    return JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveSessions(sessions: ChatSession[]) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.slice(-20)));
}

let msgIdCounter = 100;
function nextId() {
  return ++msgIdCounter;
}

function buildWelcomeMsg(hi: boolean): Message {
  return {
    id: nextId(),
    role: "krishna",
    text: hi
      ? "🙏 नमस्ते! मैं कृष्ण हूं और भगवद्गीता के शाश्वत ज्ञान से आपका मार्गदर्शन करने के लिए तत्पर हूं। जीवन, कर्म, रिश्ते या आध्यात्म — कुछ भी पूछें। नीचे दिए गए प्रश्नों से शुरू कर सकते हैं।"
      : "🙏 Namaste! I am Krishna, ready to guide you with the timeless wisdom of the Bhagavad Gita. Ask me about life, karma, relationships, or spirituality — or choose a suggested question below.",
    timestamp: new Date(),
  };
}

export default function AskKrishna() {
  const { language } = useLanguage();
  const hi = language === "hi";

  const [messages, setMessages] = useState<Message[]>(() => [
    buildWelcomeMsg(hi),
  ]);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>(loadSessions);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentSessionId = useRef(
    `session-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );

  const askKrishna = useAskKrishna();
  const { data: historyData } = useKrishnaHistory();
  const isTyping = askKrishna.isPending;
  const isFirstLoad = messages.length === 1 && messages[0].role === "krishna";

  const suggestedQuestions = hi
    ? SUGGESTED_QUESTIONS_HI
    : SUGGESTED_QUESTIONS_EN;

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  // Persist session whenever messages change (and there's been at least one user msg)
  useEffect(() => {
    const userMsgs = messages.filter((m) => m.role === "user");
    if (userMsgs.length === 0) return;
    const session: ChatSession = {
      id: currentSessionId.current,
      date: new Date().toLocaleDateString(hi ? "hi-IN" : "en-IN"),
      firstQuestion: userMsgs[0].text,
      messages,
    };
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== currentSessionId.current);
      const updated = [session, ...filtered];
      saveSessions(updated);
      return updated;
    });
  }, [messages, hi]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;
      const userMsg: Message = {
        id: nextId(),
        role: "user",
        text: text.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      askKrishna.mutate(text.trim(), {
        onSuccess: (reply) => {
          setMessages((prev) => [
            ...prev,
            {
              id: nextId(),
              role: "krishna",
              text: reply,
              timestamp: new Date(),
            },
          ]);
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            {
              id: nextId(),
              role: "krishna",
              text: "__error__",
              timestamp: new Date(),
            },
          ]);
        },
      });
    },
    [isTyping, askKrishna],
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage(input);
    inputRef.current?.focus();
  }

  function handleSuggestionClick(q: string) {
    setInput(q);
    inputRef.current?.focus();
  }

  function handleNewChat() {
    currentSessionId.current = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setMessages([buildWelcomeMsg(hi)]);
    setInput("");
    askKrishna.reset();
    setSidebarOpen(false);
  }

  function handleLoadSession(session: ChatSession) {
    // Restore session messages (revive Date objects)
    const restored = session.messages.map((m) => ({
      ...m,
      timestamp: new Date(m.timestamp),
    }));
    currentSessionId.current = session.id;
    setMessages(restored);
    setSidebarOpen(false);
  }

  function handleCopy(text: string, id: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  function handleRetry(question: string) {
    setMessages((prev) => prev.filter((m) => m.text !== "__error__"));
    sendMessage(question);
  }

  const lastUserQuestion =
    [...messages].reverse().find((m) => m.role === "user")?.text ?? "";

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🕉️</span>
              <h1 className="text-3xl font-display font-bold text-primary">
                {hi ? "कृष्ण AI" : "Krishna AI"}
              </h1>
            </div>
            <p className="text-muted-foreground max-w-lg text-sm">
              {hi
                ? "भगवान कृष्ण से दिव्य मार्गदर्शन प्राप्त करें। भगवद्गीता का अमर ज्ञान अनुभव करें।"
                : "Seek divine guidance from Lord Krishna. Experience the timeless wisdom of the Bhagavad Gita."}
            </p>
            <Badge variant="secondary" className="text-xs font-medium">
              ✨{" "}
              {hi
                ? "दिव्य ज्ञान और AI द्वारा संचालित"
                : "Powered by divine wisdom & AI"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6 items-start relative">
          {/* ===== SESSION HISTORY SIDEBAR ===== */}
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
              role="presentation"
            />
          )}
          <aside
            className={`
              fixed top-0 left-0 h-full w-72 bg-card border-r border-border shadow-xl z-40 flex flex-col transition-transform duration-300
              lg:static lg:h-auto lg:w-64 lg:shadow-none lg:z-auto lg:translate-x-0 lg:flex lg:flex-shrink-0 lg:rounded-2xl lg:border lg:border-border
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-display font-semibold text-foreground text-sm">
                {hi ? "सत्र इतिहास" : "Session History"}
              </h3>
              <div className="flex gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleNewChat}
                  data-ocid="chat.new_chat_button"
                  className="flex items-center gap-1 text-xs h-7 px-2"
                >
                  <MessageSquarePlus className="w-3 h-3" />
                  {hi ? "नया" : "New"}
                </Button>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1 rounded hover:bg-muted transition-colors"
                  aria-label="Close sidebar"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-3">
              {sessions.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-8 px-3">
                  {hi
                    ? "अभी कोई सत्र नहीं। कृष्ण से बात करें!"
                    : "No sessions yet. Start chatting with Krishna!"}
                </p>
              ) : (
                <div className="space-y-1.5" data-ocid="sidebar.sessions_list">
                  {sessions.map((session, idx) => (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => handleLoadSession(session)}
                      data-ocid={`sidebar.session.${idx + 1}`}
                      className={`w-full text-left p-3 rounded-xl transition-colors hover:bg-primary/10 ${
                        session.id === currentSessionId.current
                          ? "bg-primary/10 border border-primary/30"
                          : "border border-transparent"
                      }`}
                    >
                      <p className="text-xs text-muted-foreground mb-0.5">
                        {session.date}
                      </p>
                      <p className="text-sm text-foreground line-clamp-2 leading-snug">
                        {session.firstQuestion}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </aside>

          {/* ===== MAIN CHAT AREA ===== */}
          <div className="flex-1 min-w-0">
            {/* Mobile: toggle sidebar + new chat buttons */}
            <div className="flex items-center gap-2 mb-3 lg:hidden">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                data-ocid="chat.open_sidebar_button"
                className="flex items-center gap-1.5 text-xs"
              >
                <ChevronRight className="w-3.5 h-3.5" />
                {hi ? "सत्र इतिहास" : "Sessions"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleNewChat}
                data-ocid="chat.new_chat_mobile_button"
                className="flex items-center gap-1.5 text-xs"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                {hi ? "नयी चैट" : "New Chat"}
              </Button>
            </div>

            {/* Chat box */}
            <div
              className="bg-card rounded-2xl border border-border shadow-sm flex flex-col"
              style={{ height: "70vh" }}
            >
              {/* Chat messages */}
              <ScrollArea
                className="flex-1 p-4"
                ref={scrollRef as React.RefObject<HTMLDivElement>}
              >
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      data-ocid={
                        msg.role === "krishna"
                          ? `chat.krishna_message.${msg.id}`
                          : `chat.user_message.${msg.id}`
                      }
                      className={`flex gap-3 ${
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg ${
                          msg.role === "krishna"
                            ? "bg-primary/10 border border-primary/30"
                            : "bg-accent/20 border border-accent/40"
                        }`}
                      >
                        {msg.role === "krishna" ? "🙏" : "👤"}
                      </div>

                      {/* Bubble */}
                      <div className="flex flex-col gap-1 max-w-[75%]">
                        {msg.text === "__error__" ? (
                          <div
                            className="rounded-2xl px-4 py-3 text-sm bg-destructive/10 border border-destructive/30 text-destructive"
                            data-ocid="chat.error_state"
                          >
                            <p>
                              😔{" "}
                              {hi
                                ? "अभी जवाब नहीं मिला। कृपया पुनः प्रयास करें।"
                                : "No response received. Please try again."}
                            </p>
                            <button
                              type="button"
                              onClick={() => handleRetry(lastUserQuestion)}
                              data-ocid="chat.retry_button"
                              className="mt-2 text-xs text-primary underline hover:no-underline"
                            >
                              🔄 {hi ? "पुनः प्रयास करें" : "Retry"}
                            </button>
                          </div>
                        ) : (
                          <div
                            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                              msg.role === "krishna"
                                ? "bg-primary/5 border border-primary/20 text-foreground"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words">
                              {msg.text}
                            </p>
                            <div
                              className={`flex items-center justify-between mt-1.5 gap-2 ${
                                msg.role === "user" ? "flex-row-reverse" : ""
                              }`}
                            >
                              <p
                                className={`text-xs opacity-60 ${
                                  msg.role === "user"
                                    ? "text-primary-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {msg.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                              {/* Copy button on Krishna messages */}
                              {msg.role === "krishna" && (
                                <button
                                  type="button"
                                  onClick={() => handleCopy(msg.text, msg.id)}
                                  data-ocid={`chat.copy_button.${msg.id}`}
                                  aria-label="Copy message"
                                  className="opacity-60 hover:opacity-100 transition-opacity p-0.5 rounded"
                                >
                                  {copiedId === msg.id ? (
                                    <Check className="w-3.5 h-3.5 text-green-500" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div
                      className="flex gap-3 flex-row"
                      data-ocid="chat.loading_state"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg bg-primary/10 border border-primary/30">
                        🙏
                      </div>
                      <div className="bg-primary/5 border border-primary/20 rounded-2xl px-4 py-3">
                        <div className="flex gap-2 items-center">
                          <span className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                                style={{
                                  animationDelay: `${i * 0.15}s`,
                                }}
                              />
                            ))}
                          </span>
                          <span className="text-xs text-muted-foreground italic">
                            {hi
                              ? "कृष्ण जी विचार कर रहे हैं..."
                              : "Krishna is contemplating..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Suggested Questions (shown when chat is fresh) */}
              {isFirstLoad && (
                <div className="px-4 pb-3 border-t border-border/50 pt-3">
                  <p className="text-xs text-muted-foreground mb-2">
                    {hi
                      ? "एक प्रश्न चुनें या खुद लिखें"
                      : "Choose a question or type your own"}
                  </p>
                  <div
                    className="flex flex-wrap gap-2"
                    data-ocid="chat.suggested_questions"
                  >
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleSuggestionClick(q)}
                        data-ocid={`chat.suggestion.${i + 1}`}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/40 bg-primary/5 text-primary hover:bg-primary/15 hover:border-primary/60 transition-colors duration-200 font-medium cursor-pointer text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Bar */}
              <div className="p-4 border-t border-border">
                <form
                  onSubmit={handleSubmit}
                  className="flex gap-2"
                  data-ocid="chat.input_form"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      hi ? "कृष्ण से कुछ भी पूछें..." : "Ask Krishna anything..."
                    }
                    disabled={isTyping}
                    data-ocid="chat.input"
                    className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 transition-colors"
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    data-ocid="chat.submit_button"
                    className="px-5 rounded-xl shrink-0"
                  >
                    {hi ? "भेजें" : "Send"}
                  </Button>
                </form>

                {/* Actions below input */}
                <div className="flex items-center justify-between mt-3">
                  <button
                    type="button"
                    onClick={handleNewChat}
                    data-ocid="chat.new_conversation_button"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <MessageSquarePlus className="w-3 h-3" />
                    {hi ? "नयी बातचीत" : "New Chat"}
                  </button>
                  <Link
                    to="/hindi-blog"
                    data-ocid="chat.blog_link"
                    className="text-xs text-primary hover:underline font-medium transition-colors"
                  >
                    🕉️ {hi ? "दिव्य ज्ञान लेख पढ़ें →" : "Read Divya Gyan Articles →"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT SIDEBAR (desktop) ===== */}
          <aside className="hidden lg:flex flex-col gap-6 w-64 flex-shrink-0">
            {/* Nav Links */}
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                {hi ? "कृष्ण AI" : "Krishna AI"}
              </h3>
              <nav className="space-y-1">
                {(
                  [
                    {
                      en: "Bhagavad Gita",
                      hi: "भगवद्गीता",
                      to: "/bhagavad-gita",
                    },
                    {
                      en: "Hindi Articles",
                      hi: "दिव्य ज्ञान लेख",
                      to: "/hindi-blog",
                    },
                    { en: "Blog", hi: "ब्लॉग", to: "/blog" },
                    {
                      en: "Holy Books",
                      hi: "पवित्र ग्रंथ",
                      to: "/holy-books",
                    },
                    {
                      en: "Mantra Library",
                      hi: "मंत्र संग्रह",
                      to: "/mantra",
                    },
                  ] as {
                    en: string;
                    hi: string;
                    to:
                      | "/bhagavad-gita"
                      | "/hindi-blog"
                      | "/blog"
                      | "/holy-books"
                      | "/mantra";
                  }[]
                ).map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    data-ocid={`sidebar.nav_${item.to.replace("/", "")}_link`}
                    className="block text-sm text-muted-foreground hover:text-primary px-2 py-1.5 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    {hi ? item.hi : item.en}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Backend history */}
            {historyData && historyData.length > 0 && (
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                  {hi ? "पिछले प्रश्न" : "Recent Questions"}
                </h3>
                <div className="space-y-2">
                  {historyData.slice(0, 4).map((item, idx) => (
                    <div
                      key={item.question.slice(0, 20)}
                      data-ocid={`sidebar.history_item.${idx + 1}`}
                    >
                      <p className="text-xs text-foreground line-clamp-2">
                        {item.question}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-0.5">
                        {new Date(
                          Number(item.timestamp) / 1_000_000,
                        ).toLocaleDateString(hi ? "hi-IN" : "en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
