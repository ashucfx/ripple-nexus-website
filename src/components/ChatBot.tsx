import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Message = { role: "user" | "assistant"; content: string; action?: { label: string; path: string } };

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      setLoading(true);
      setTimeout(() => {
        setMessages([
          { 
            role: "assistant", 
            content: "Hello. I am Navik, the Ripple Nexus intelligence core. Are you looking to architect a new platform, scale an existing system, or speak directly with our engineering team?" 
          }
        ]);
        setLoading(false);
      }, 600);
    }
  }, [open, greeted]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // The Deterministic FSM Engine for Intent Detection
  const detectIntent = (text: string): Message => {
    const lower = text.toLowerCase();
    
    // 1. Tech Stack Intent
    if (/(react|node|python|aws|cloud|next\.?js|typescript|infrastructure|database|backend|frontend)/.test(lower)) {
      return {
        role: "assistant",
        content: "Our architectures utilize React/Next.js for extreme frontend performance, Node/Python for robust backends, and AWS for infinitely scalable cloud infrastructure.",
        action: { label: "Explore Capabilities", path: "/services" }
      };
    }

    // 2. AI / ML Intent
    if (/(llm|chatbot|machine learning|deep learning|nlp|generative|gpt|agent|artificial intelligence|ai)/.test(lower)) {
      return {
        role: "assistant",
        content: "We engineer highly secure, custom Generative AI solutions, autonomous logic agents, and private RAG pipelines perfectly integrated into your corporate data ecosystem.",
        action: { label: "Explore Capabilities", path: "/services" }
      };
    }

    // 3. Mobile App Intent
    if (/(ios|android|mobile|react native|swift|kotlin|smartphone)/.test(lower)) {
      return {
        role: "assistant",
        content: "We build native-performance iOS and Android applications. Our mobile architectures are perfectly synced to scalable backend infrastructures.",
        action: { label: "Explore Capabilities", path: "/services" }
      };
    }

    // 4. Contact / Booking Intent
    if (/(contact|call|book|meeting|talk|sales|schedule|hire|meet)/.test(lower)) {
      return {
        role: "assistant",
        content: "I can coordinate a technical strategy session for you right now.",
        action: { label: "Book a Consultation", path: "/contact" }
      };
    }
    
    // 5. General Services Intent
    if (/(service|app|software|website|web|build|development|system|platform)/.test(lower)) {
      return {
        role: "assistant",
        content: "We engineer highly scalable enterprise software and complex platforms. Our core focus is building systems that do not break under scale.",
        action: { label: "Explore Capabilities", path: "/services" }
      };
    }
    
    // 6. Pricing / Budget Intent
    if (/(price|cost|budget|cheap|expensive|how much|quote)/.test(lower)) {
      return {
        role: "assistant",
        content: "We do not compete on price; we compete on absolute engineering quality. Every architecture we build is custom-scoped to your business requirements.",
        action: { label: "Get a Technical Quote", path: "/contact" }
      };
    }

    // 7. Portfolio / Case Studies Intent
    if (/(portfolio|case study|case studies|examples|past work|clients|proof|results)/.test(lower)) {
      return {
        role: "assistant",
        content: "Our architectures run everything from global logistics platforms to medical IoT applications. I can show you exactly how we've scaled our partners.",
        action: { label: "View Case Studies", path: "/case-studies" }
      };
    }

    // 8. Timelines / Speed Intent
    if (/(how long|timeline|duration|fast|speed|months|weeks|days)/.test(lower)) {
      return {
        role: "assistant",
        content: "Enterprise builds typically range from 4 to 12 weeks depending on architectural complexity. We deploy rapidly through continuous integration.",
        action: { label: "Speak to an Architect", path: "/contact" }
      };
    }

    // 9. Location / Team Intent
    if (/(where are you|based|located|location|india|usa|uk|offshore|onshore|team)/.test(lower)) {
      return {
        role: "assistant",
        content: "We are a globally distributed engineering team with core operations in Noida, India, serving $100M+ enterprises worldwide."
      };
    }

    // 10. Jobs / Career Intent
    if (/(job|hiring|career|internship|fresher|salary)/.test(lower)) {
      return {
        role: "assistant",
        content: "Navik AI is strictly focused on routing enterprise clients. If you are an engineer looking to join us, please check our LinkedIn for open positions."
      };
    }

    // 11. Generalized / Hinglish Greeting
    if (/(hi|hello|hey|namaste|kaise ho|kya chal|greetings)/.test(lower)) {
      return {
        role: "assistant",
        content: "Namaste! I am Navik. Are you looking to explore our enterprise capabilities or get in touch with our engineers?"
      };
    }

    // 6. Fallback Catch-All
    return {
      role: "assistant",
      content: "I understand. Given the technical nature of enterprise builds, the fastest way to get exact answers is to interface directly with our lead architects.",
      action: { label: "Speak to an Architect", path: "/contact" }
    };
  };

  const handleAction = (path: string) => {
    setOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  const send = () => {
    if (!input.trim() || loading) return;
    
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Simulate Network Latency for realism
    setTimeout(() => {
      const botResponse = detectIntent(userMsg.content);
      setMessages([...newMessages, botResponse]);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300"
            style={{
              background: "var(--nexus-violet)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(124,92,255,0.4)",
            }}
            aria-label="Open routing agent"
          >
            <MessageSquare size={22} className="fill-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-6rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--graphite-600)", background: "var(--obsidian)" }}>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center relative"
                  style={{ background: "rgba(124,92,255,0.1)", border: "1px solid rgba(124,92,255,0.25)" }}
                >
                  <Bot size={18} style={{ color: "var(--nexus-violet)" }} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full" style={{ border: "2px solid var(--obsidian)" }}></span>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-white tracking-wide">Navik AI</p>
                  <p className="text-[12px] font-medium tracking-wider uppercase mt-0.5" style={{ color: "var(--graphite-400)" }}>System Online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="hover:text-white transition-colors" style={{ color: "var(--graphite-400)" }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-6" style={{ background: "var(--ink)" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                     <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: "rgba(124,92,255,0.1)", border: "1px solid rgba(124,92,255,0.2)" }}>
                      <Bot size={14} style={{ color: "var(--nexus-violet)" }} />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 max-w-[80%]">
                    <div
                      className={`px-4 py-3 text-[14px] leading-relaxed shadow-sm rounded-2xl ${
                        msg.role === "user"
                          ? "rounded-tr-sm font-medium"
                          : "rounded-tl-sm font-light"
                      }`}
                      style={
                        msg.role === "user"
                          ? { background: "var(--nexus-violet)", color: "#fff" }
                          : { background: "rgba(124,92,255,0.06)", border: "1px solid rgba(124,92,255,0.15)", color: "var(--graphite-200, var(--pearl))" }
                      }
                    >
                      {msg.content}
                    </div>
                    
                    {/* Bot Action Button Injection */}
                    {msg.action && (
                      <button
                        onClick={() => handleAction(msg.action!.path)}
                        className="group flex items-center justify-between bg-primary/20 hover:bg-primary/30 border border-primary/30 px-4 py-2.5 rounded-xl transition-all duration-300 mt-1 text-left"
                      >
                        <span className="text-[13px] font-semibold text-white">{msg.action.label}</span>
                        <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,92,255,0.1)", border: "1px solid rgba(124,92,255,0.2)" }}>
                    <Bot size={14} style={{ color: "var(--nexus-violet)" }} />
                  </div>
                  <div className="px-5 py-4 rounded-2xl rounded-tl-sm" style={{ background: "rgba(124,92,255,0.06)", border: "1px solid rgba(124,92,255,0.15)" }}>
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--graphite-400)", animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--graphite-400)", animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--graphite-400)", animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-4" style={{ background: "var(--obsidian)", borderTop: "1px solid var(--graphite-600)" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-3 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none transition-all font-light placeholder:text-[var(--graphite-400)]"
                  style={{
                    background: "rgba(124,92,255,0.05)",
                    border: "1px solid var(--graphite-600)",
                    color: "var(--pearl)",
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(124,92,255,0.4)"; e.currentTarget.style.background = "rgba(124,92,255,0.08)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "var(--graphite-600)"; e.currentTarget.style.background = "rgba(124,92,255,0.05)"; }}
                  maxLength={150}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center hover:scale-105 transition-all disabled:opacity-0"
                  style={{ background: "var(--nexus-violet)", color: "#fff" }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
