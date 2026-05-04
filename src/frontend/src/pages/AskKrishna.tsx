import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@tanstack/react-router";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

interface Message {
  id: number;
  role: "user" | "krishna";
  text: string;
  timestamp: Date;
}

const QUICK_TOPICS = [
  "Sarkari naukri kab milegi?",
  "Meri shaadi kab hogi?",
  "Yeh rishta tikega ya nahi?",
  "Bache kab honge?",
  "Paisa kab badhega?",
  "Mera 2026 kaisa hoga?",
  "Exam pass hoga ya nahi?",
  "Mera life ka purpose kya hai?",
  "Videsh ka yog hai mera?",
  "Kuch aur poochna hai",
];

const TOPIC_RESPONSES: Record<string, string> = {
  "Sarkari naukri kab milegi?":
    "प्रिय साधक, कर्म योग में श्रीकृष्ण कहते हैं — 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।' अपने परिश्रम पर ध्यान दें, फल की चिंता मत करें। आपकी मेहनत ही आपका धर्म है। सरकारी नौकरी के लिए शनि और सूर्य का बल महत्वपूर्ण है। अपना जन्म विवरण दें — मैं आपकी कुंडली में कर्म भाव देखकर मार्गदर्शन दूंगा।",
  "Meri shaadi kab hogi?":
    "प्रिय साधक, विवाह जीवन का पवित्र बंधन है। भगवद्गीता में कृष्ण ने रुक्मिणी के साथ अपने विवाह से सिखाया — जो संबंध धर्म पर आधारित हो, वही टिकता है। सातवें भाव और शुक्र की स्थिति विवाह का समय बताती है। आपकी DOB और birth time दें ताकि मैं आपकी कुंडली देख सकूं।",
  "Yeh rishta tikega ya nahi?":
    "प्रिय साधक, श्रीकृष्ण कहते हैं — 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।' जो संबंध पारस्परिक सम्मान, प्रेम और धर्म पर टिका हो, वह टिकता है। आपकी कुंडली और साथी की कुंडली की अष्टकूट मिलान से स्पष्टता मिलेगी। अपने और अपने साथी का जन्म विवरण साझा करें।",
  "Bache kab honge?":
    "प्रिय साधक, संतान सुख ईश्वर का महान आशीर्वाद है। गीता में कृष्ण कहते हैं — 'यदच्छालाभसंतुष्टो द्वन्द्वातीतो विमत्सरः।' पंचम भाव, बृहस्पति और शुक्र की स्थिति संतान योग का निर्धारण करती है। अपनी जन्म तिथि और जन्म स्थान दें — मैं आपकी कुंडली में संतान भाव देखूंगा।",
  "Paisa kab badhega?":
    "धन के बारे में श्रीकृष्ण कहते हैं — 'योगः कर्मसु कौशलम्।' कुशलतापूर्वक किया गया कार्य ही धन लाता है। द्वितीय भाव (धन) और एकादश भाव (लाभ) की ग्रह दशा देखना जरूरी है। बृहस्पति का गोचर और शुक्र की दशा धन वृद्धि के मुख्य कारक हैं।",
  "Mera 2026 kaisa hoga?":
    "2026 के लिए श्रीकृष्ण का संदेश — 'उद्धरेदात्मनात्मानम्' — स्वयं को ऊपर उठाओ। 2026 में शनि कुंभ राशि में है और बृहस्पति वृषभ से मिथुन में जाएगा। आपकी व्यक्तिगत राशि के अनुसार प्रभाव अलग होगा। अपनी जन्म तिथि बताएं।",
  "Exam pass hoga ya nahi?":
    "ज्ञान के लिए श्रीकृष्ण कहते हैं — 'नैव किंचित्करोमीति युक्तो मन्येत तत्त्ववित्।' पूरे मन से तैयारी करें। बुध और पंचम भाव विद्या के कारक हैं। सरस्वती मंत्र का जाप करें — 'ॐ ऐं सरस्वत्यै नमः'। आपकी परीक्षा की तिथि और जन्म विवरण दें।",
  "Mera life ka purpose kya hai?":
    "स्वधर्म के बारे में श्रीकृष्ण कहते हैं — 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।' अपना अपूर्ण धर्म भी दूसरे के पूर्ण धर्म से श्रेष्ठ है। आपका जीवन उद्देश्य आपकी जन्म कुंडली के लग्न, सूर्य और दशम भाव में छुपा है। अपना जन्म विवरण दें।",
  "Videsh ka yog hai mera?":
    "प्रिय साधक, विदेश यात्रा के लिए कुंडली में द्वादश भाव, नवम भाव और राहु की स्थिति महत्वपूर्ण है। श्रीकृष्ण कहते हैं — 'गच्छ पार्थ यथेच्छसि' — वही मार्ग अपनाओ जो तुम्हारे धर्म के अनुकूल हो। अपनी जन्म कुंडली का विवरण दें ताकि मैं विदेश योग की गणना कर सकूं।",
  "Kuch aur poochna hai":
    "नमस्ते प्रिय साधक! श्रीकृष्ण आपके हर प्रश्न का उत्तर देने के लिए तत्पर हैं। गीता के 18 अध्यायों में जीवन के हर पहलू — करियर, विवाह, धन, स्वास्थ्य, आध्यात्म — का समाधान है। अपना प्रश्न निःसंकोच पूछें। मैं आपकी सेवा में उपस्थित हूं। 🙏",
};

const GITA_RESPONSES = [
  "श्रीकृष्ण भगवद्गीता 2.47 में कहते हैं — 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।' आपका अधिकार केवल कर्म पर है, फल पर नहीं। यह सत्य आपके प्रश्न के उत्तर में छुपा है। अपना जन्म विवरण साझा करें और मैं आपको व्यक्तिगत मार्गदर्शन दूंगा।",
  "गीता 6.5 में कृष्ण कहते हैं — 'उद्धरेदात्मनात्मानम्।' स्वयं को स्वयं से ऊपर उठाओ — अपना सबसे अच्छा मित्र भी तुम हो और सबसे बड़ा शत्रु भी। आपकी परिस्थिति में यही शिक्षा सबसे उपयुक्त है। कुंडली विश्लेषण के लिए जन्म विवरण दें।",
  "भगवद्गीता 3.19 — 'तस्मादसक्तः सततं कार्यं कर्म समाचर।' बिना आसक्ति के निरंतर कर्म करना ही श्रेष्ठ जीवन का मार्ग है। श्रीकृष्ण का यह संदेश आपके जीवन में सफलता का द्वार खोलेगा। विस्तृत परामर्श के लिए अपनी जन्म कुंडली दें।",
  "गीता 9.22 में कृष्ण वचन देते हैं — 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्।' जो मुझमें पूर्ण श्रद्धा रखते हैं, उनका योग-क्षेम मैं स्वयं वहन करता हूं। 🙏",
  "भगवद्गीता 4.7-8 — 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत...' जब-जब धर्म की हानि होती है, तब-तब कृष्ण अवतरित होते हैं। आपके जीवन में भी यही दिव्य शक्ति कार्य कर रही है। अपना जन्म विवरण दें, मैं ज्योतिष और गीता के माध्यम से मार्गदर्शन दूंगा।",
  "गीता 18.66 — 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।' सभी चिंताओं को छोड़कर मुझ पर भरोसा करो। यह गीता का सबसे महान वचन है। आपकी परेशानी चाहे जो भी हो, समाधान है। जन्म कुंडली विवरण दें ताकि व्यक्तिगत मार्गदर्शन मिल सके।",
  "श्रीकृष्ण गीता 2.14 में कहते हैं — 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।' सुख-दुःख तो आते-जाते हैं — इन्हें सहन करना सीखो। यह अनित्य हैं। जीवन की चुनौतियों में ही आपका विकास छुपा है। ज्योतिषीय दृष्टि से आपकी स्थिति देखने के लिए DOB दें।",
  "गीता 12.13-14 में कृष्ण भक्त के लक्षण बताते हैं — 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।' जो सबके प्रति प्रेम रखे, करुणावान हो — वही मुझे प्रिय है। आपके जीवन में सकारात्मक बदलाव लाने के लिए कुंडली विश्लेषण उपयोगी होगा।",
  "भगवद्गीता 5.29 — 'सुहृदं सर्वभूतानां ज्ञात्वा मां शान्तिमृच्छति।' मुझे सभी प्राणियों का मित्र जानकर शांति प्राप्त होती है। आपके मन में जो प्रश्न है, उसका उत्तर गीता में है। विस्तार से जानने के लिए जन्म विवरण साझा करें।",
  "गीता 13.28 — 'समं सर्वेषु भूतेषु तिष्ठन्तं परमेश्वरम्।' सभी प्राणियों में समान रूप से परमेश्वर को देखो। यही ज्ञान आपको आपके प्रश्न का उत्तर देगा। व्यक्तिगत ज्योतिष परामर्श के लिए जन्म तिथि, समय और स्थान बताएं।",
];

const SIDEBAR_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

const CITY_HINDI: Record<string, string> = {
  Mumbai: "मुंबई",
  Delhi: "दिल्ली",
  Bangalore: "बेंगलुरु",
  Hyderabad: "हैदराबाद",
  Chennai: "चेन्नई",
  Kolkata: "कोलकाता",
  Pune: "पुणे",
  Ahmedabad: "अहमदाबाद",
  Jaipur: "जयपुर",
  Lucknow: "लखनऊ",
};

let msgIdCounter = 0;
function nextId() {
  return ++msgIdCounter;
}

const welcomeMessage: Message = {
  id: nextId(),
  role: "krishna",
  text: "🙏 Namaste! How can I guide you today? I am Krishna, and I speak through the timeless wisdom of the Bhagavad Gita. Ask me anything about life, career, relationships, or your destiny — or choose a topic below.",
  timestamp: new Date(),
};

export default function AskKrishna() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFirstLoad = messages.length === 1 && messages[0].role === "krishna";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []); // scroll on any state change — exhaustive-deps false positive

  function getKrishnaResponse(question: string): string {
    const topicResponse = TOPIC_RESPONSES[question];
    if (topicResponse) return topicResponse;
    const idx = Math.floor(Math.random() * GITA_RESPONSES.length);
    return GITA_RESPONSES[idx];
  }

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: nextId(),
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(
      () => {
        const reply = getKrishnaResponse(text.trim());
        const krishnaMsg: Message = {
          id: nextId(),
          role: "krishna",
          text: reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, krishnaMsg]);
        setIsTyping(false);
      },
      1200 + Math.random() * 800,
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleTopicClick(topic: string) {
    sendMessage(topic);
    inputRef.current?.focus();
  }

  function handleNewConversation() {
    setMessages([{ ...welcomeMessage, id: nextId(), timestamp: new Date() }]);
    setInput("");
    setIsTyping(false);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🕉️</span>
              <h1 className="text-3xl font-display font-bold text-primary">
                talkKrishna
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
        <div className="flex gap-8 items-start">
          {/* Main Chat Area */}
          <div className="flex-1 min-w-0">
            <div
              className="bg-card rounded-2xl border border-border shadow-sm flex flex-col"
              style={{ height: "70vh" }}
            >
              {/* Chat History */}
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
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg ${
                          msg.role === "krishna"
                            ? "bg-primary/10 border border-primary/30"
                            : "bg-accent/20 border border-accent/40"
                        }`}
                      >
                        {msg.role === "krishna" ? "🕉️" : "👤"}
                      </div>
                      {/* Bubble */}
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.role === "krishna"
                            ? "bg-primary/5 border border-primary/20 text-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                        <p
                          className={`text-xs mt-1 opacity-60 ${
                            msg.role === "user"
                              ? "text-right text-primary-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
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
                        🕉️
                      </div>
                      <div className="bg-primary/5 border border-primary/20 rounded-2xl px-4 py-3">
                        <div className="flex gap-1 items-center h-5">
                          <span
                            className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Topic Buttons — shown only on fresh chat */}
              {isFirstLoad && (
                <div className="px-4 pb-3 border-t border-border/50 pt-3">
                  <p className="text-xs text-muted-foreground mb-2">
                    {hi
                      ? "नीचे एक विषय चुनें या नई बातचीत शुरू करें"
                      : "Choose a topic below or start a new conversation"}
                  </p>
                  <div
                    className="flex flex-wrap gap-2"
                    data-ocid="chat.quick_topics"
                  >
                    {QUICK_TOPICS.map((topic, i) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => handleTopicClick(topic)}
                        data-ocid={`chat.quick_topic.${i + 1}`}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/40 bg-primary/5 text-primary hover:bg-primary/15 hover:border-primary/60 transition-colors duration-200 font-medium cursor-pointer"
                      >
                        {topic}
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
                      hi
                        ? "कृष्ण से कुछ भी पूछें..."
                        : "Ask Krishna anything... career, love, purpose, health"
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
                    onClick={handleNewConversation}
                    data-ocid="chat.new_conversation_button"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    🔄 {hi ? "नई बातचीत शुरू करें" : "Start New Conversation"}
                  </button>
                  <Link
                    to="/shop"
                    data-ocid="chat.tarot_cta_link"
                    className="text-xs text-primary hover:underline font-medium transition-colors"
                  >
                    🔮{" "}
                    {hi
                      ? "कृष्ण का टैरो रीडिंग आज़माएं →"
                      : "Try Krishna's Tarot Reading →"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex flex-col gap-6 w-72 flex-shrink-0">
            {/* Nav Links */}
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                talkKrishna
              </h3>
              <nav className="space-y-1">
                {(
                  [
                    { en: "Free Kundli", hi: "मुफ़्त कुंडली", to: "/free-kundli" },
                    {
                      en: "Kundli Matching",
                      hi: "कुंडली मिलान",
                      to: "/kundali-matching",
                    },
                    {
                      en: "Bhajan Library",
                      hi: "भजन संग्रह",
                      to: "/bhajan-library",
                    },
                    { en: "Holy Books", hi: "पवित्र ग्रंथ", to: "/holy-books" },
                    { en: "Blog", hi: "ब्लॉग", to: "/blog" },
                  ] as {
                    en: string;
                    hi: string;
                    to:
                      | "/"
                      | "/free-kundli"
                      | "/kundali-matching"
                      | "/bhajan-library"
                      | "/holy-books"
                      | "/blog";
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

            {/* Astrologers Across India */}
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                {hi ? "भारत भर के ज्योतिषी" : "Astrologers Across India"}
              </h3>
              <div className="space-y-1">
                {SIDEBAR_CITIES.map((city) => (
                  <Link
                    key={city}
                    to="/astrologer"
                    data-ocid={`sidebar.city_${city.toLowerCase()}_link`}
                    className="block text-sm text-muted-foreground hover:text-primary px-2 py-1 rounded hover:bg-primary/5 transition-colors"
                  >
                    {hi
                      ? `${CITY_HINDI[city] ?? city} में ज्योतिषी`
                      : `Astrologer in ${city}`}
                  </Link>
                ))}
                <Link
                  to="/astrologer"
                  data-ocid="sidebar.view_all_cities_link"
                  className="block text-xs text-primary font-medium px-2 py-1.5 mt-1 hover:underline"
                >
                  {hi ? "सभी 50+ शहर देखें →" : "View All 50+ Cities →"}
                </Link>
              </div>
            </div>

            {/* Free Tools */}
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                {hi ? "मुफ़्त उपकरण" : "Free Tools"}
              </h3>
              <div className="space-y-1">
                {(
                  [
                    { en: "Free Kundli", hi: "मुफ़्त कुंडली", to: "/free-kundli" },
                    {
                      en: "Kundli Matching",
                      hi: "कुंडली मिलान",
                      to: "/kundali-matching",
                    },
                    {
                      en: "Gemstone Calculator",
                      hi: "रत्न कैलकुलेटर",
                      to: "/gemstone-calculator",
                    },
                    {
                      en: "Rudraksha Calculator",
                      hi: "रुद्राक्ष कैलकुलेटर",
                      to: "/rudraksha-calculator",
                    },
                    { en: "Panchang Today", hi: "आज का पंचांग", to: "/panchang" },
                  ] as {
                    en: string;
                    hi: string;
                    to:
                      | "/free-kundli"
                      | "/kundali-matching"
                      | "/gemstone-calculator"
                      | "/rudraksha-calculator"
                      | "/panchang";
                  }[]
                ).map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    data-ocid={`sidebar.tool_${item.to.replace("/", "").replace("-", "_")}_link`}
                    className="block text-sm text-muted-foreground hover:text-primary px-2 py-1.5 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    {hi ? item.hi : item.en}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile bottom section */}
        <div className="lg:hidden mt-8">
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3 text-sm">
              {hi ? "भारत भर के ज्योतिषी" : "Astrologers Across India"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {SIDEBAR_CITIES.map((city) => (
                <Link
                  key={city}
                  to="/astrologer"
                  data-ocid={`mobile.city_${city.toLowerCase()}_link`}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted/30 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  {hi ? (CITY_HINDI[city] ?? city) : city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
