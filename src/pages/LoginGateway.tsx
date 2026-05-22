import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Key } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import logoMark from "@/assets/logo-icon-mark.svg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoginGateway = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "sso" | "error">("email");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate discovering the enterprise workspace
    setTimeout(() => {
      setIsLoading(false);
      setStep("sso");
    }, 1200);
  };

  const handleSSOSubmit = () => {
    setIsLoading(true);
    // Simulate auth check failure (since this is a facade for unauthenticated users)
    setTimeout(() => {
      setIsLoading(false);
      setStep("error");
    }, 1500);
  };

  const getDomain = () => {
    try {
      return email.split("@")[1].split(".")[0].toUpperCase();
    } catch {
      return "ENTERPRISE";
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title="Sign In | Ripple Nexus Control Plane"
        description="Access your operational intelligence systems and dashboards."
        canonical="https://www.theripplenexus.com/login"
      />

      {/* Top Navigation Bar for Login */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-body transition-colors" style={{ color: "var(--graphite-400)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--pearl)"} onMouseLeave={e => e.currentTarget.style.color = "var(--graphite-400)"}>
          <ArrowLeft size={16} />
          Return to public site
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-10">
          <img src={logoMark} alt="Ripple Nexus" className="w-12 h-12 mb-6" />
          <h1 className="font-display font-semibold text-2xl mb-2 text-center" style={{ color: "var(--pearl)" }}>
            {step === "email" ? "Sign in to Control Plane" : `Sign in to ${getDomain()} Workspace`}
          </h1>
          <p className="font-body text-sm text-center" style={{ color: "var(--graphite-400)" }}>
            {step === "email" ? "Enter your enterprise email to continue." : "Your organization requires Single Sign-On."}
          </p>
        </div>

        {/* Login Form Box */}
        <div className="p-8 rounded-xl shadow-2xl relative overflow-hidden" style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}>
          <AnimatePresence mode="wait">
            {step === "email" && (
              <motion.form 
                key="email-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleEmailSubmit} 
                className="flex flex-col gap-5"
              >
                <div>
                  <label htmlFor="email" className="block font-body text-xs font-semibold mb-2" style={{ color: "var(--graphite-300)" }}>
                    Enterprise Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent font-body text-sm px-4 py-3 rounded-lg outline-none transition-all duration-200"
                    style={{
                      border: "1px solid var(--graphite-600)",
                      color: "var(--pearl)",
                    }}
                    placeholder="name@company.com"
                    onFocus={e => e.currentTarget.style.borderColor = "var(--nexus-violet)"}
                    onBlur={e => e.currentTarget.style.borderColor = "var(--graphite-600)"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full font-body font-semibold text-sm py-3 rounded-lg transition-all duration-200 mt-2 flex justify-center items-center h-12"
                  style={{
                    background: "var(--pearl)",
                    color: "var(--obsidian)",
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-[var(--obsidian)] animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </motion.form>
            )}

            {step === "sso" && (
              <motion.div
                key="sso-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3 p-3 rounded bg-black/20 border border-white/5 mb-2">
                  <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} style={{ color: "var(--quantum-lime)" }} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-body text-[11px] uppercase tracking-wider" style={{ color: "var(--graphite-500)" }}>SSO Provider Found</p>
                    <p className="font-body text-sm truncate" style={{ color: "var(--pearl)" }}>{email}</p>
                  </div>
                </div>

                <button
                  onClick={handleSSOSubmit}
                  disabled={isLoading}
                  className="w-full font-body font-semibold text-sm py-3 rounded-lg transition-all duration-200 flex justify-center items-center h-12 gap-2"
                  style={{
                    background: "#0052CC", // Okta-ish blue
                    color: "white",
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
                  ) : (
                    <>Sign in with Identity Provider</>
                  )}
                </button>

                <button
                  onClick={() => setStep("email")}
                  className="w-full font-body text-xs py-2 mt-2"
                  style={{ color: "var(--graphite-400)" }}
                >
                  Sign in with a different account
                </button>
              </motion.div>
            )}

            {step === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-4 py-4"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(239, 68, 68, 0.1)" }}>
                  <Key size={20} className="text-red-400" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-2" style={{ color: "var(--pearl)" }}>Access Denied</h3>
                  <p className="font-body text-sm mb-6" style={{ color: "var(--graphite-400)" }}>
                    You do not have an active session for the <strong>{getDomain()}</strong> workspace. Please contact your internal Nexus Administrator to provision an Enterprise license.
                  </p>
                  <button
                    onClick={() => {
                      setStep("email");
                      setEmail("");
                    }}
                    className="font-body text-sm font-medium px-6 py-2 rounded-lg"
                    style={{ background: "var(--graphite-600)", color: "var(--pearl)" }}
                  >
                    Return to Sign In
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom text */}
        <div className="mt-8 text-center">
          <p className="font-body text-[11px] tracking-wider uppercase" style={{ color: "var(--graphite-500)" }}>
            Protected by Ripple Nexus Zero-Trust Architecture
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginGateway;
