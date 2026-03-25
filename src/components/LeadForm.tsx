import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const careerServices = [
  "Career Branding & Resume Services",
  "Career Branding Services",
  "Resume Writing",
  "LinkedIn Optimization",
  "Cover Letters",
];

const challengeOptions = [
  "Website & Digital Presence",
  "App Development (Mobile/Cloud)",
  "Software / SaaS Development",
  "ERP / CMS Systems",
  "AI & Chatbot Solutions",
  "Automation & Process Optimization",
  "Career Branding & Resume Services",
  "Other",
];

const budgetOptions = [
  "Under $500",
  "$500 – $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
];

const LeadForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_code: "+1",
    phone: "",
    company_name: "",
    business_website: "",
    business_stage: "",
    primary_challenge: "",
    budget_range: "",
    timeline: "",
    project_description: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isCareerService = careerServices.includes(formData.primary_challenge);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.full_name.trim()) errs.full_name = "Name is required";
    
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{7,15}$/.test(formData.phone.replace(/[\s-()]/g, ""))) {
      errs.phone = "Enter a valid 7-15 digit phone number";
    }

    if (!isCareerService) {
      if (!formData.company_name.trim()) errs.company_name = "Company name is required";
      if (!formData.business_website.trim()) errs.business_website = "Business website is required";
      else if (!/^https?:\/\/.+\..+/.test(formData.business_website.trim()) && !/^.+\..+/.test(formData.business_website.trim()))
        errs.business_website = "Enter a valid website URL";
      if (!formData.business_stage) errs.business_stage = "Select your business stage";
    }

    if (!formData.primary_challenge) errs.primary_challenge = "Select your primary challenge";
    if (!formData.budget_range) errs.budget_range = "Select your budget range";
    if (!formData.timeline) errs.timeline = "Select your timeline";
    if (formData.project_description.trim().length < 50)
      errs.project_description = "Please provide at least 50 characters describing your project";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    try {
      const payload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: `${formData.phone_code} ${formData.phone.trim()}`,
        company_name: isCareerService ? (formData.company_name.trim() || "N/A — Career Service") : formData.company_name.trim(),
        business_website: isCareerService ? (formData.business_website.trim() || "N/A") : formData.business_website.trim(),
        business_stage: isCareerService ? (formData.business_stage || "Individual") : formData.business_stage,
        primary_challenge: formData.primary_challenge,
        budget_range: formData.budget_range,
        timeline: formData.timeline,
        project_description: formData.project_description.trim(),
      };

      // Natively unified API route for Vercel deployment
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to send email");
      
      setStatus("success");
      setTimeout(() => {
        document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border bg-background text-foreground text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  if (status === "success") {
    return (
      <section id="lead-form" className="section-spacing overflow-hidden min-h-[500px] flex flex-col justify-center">
        <div className="section-padding max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-elevated p-10 text-center max-w-lg mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <CheckCircle size={56} className="text-secondary mx-auto mb-5" />
            </motion.div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-3">Thank You!</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              We've received your request. Our team will review your project details and contact you within <strong className="text-foreground">24 hours</strong>.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="section-spacing overflow-hidden">
      <div className="section-padding max-w-3xl mx-auto w-full">
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-medium text-sm tracking-wide uppercase mb-4"
          >
            Start a Conversation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4"
          >
            Tell Us About Your <span className="text-gradient">Project</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground text-lg"
          >
            We work with businesses ready to grow. Share your project details and we'll get back to you within 24 hours.
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="card-elevated p-6 sm:p-8 space-y-5"
        >
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <input type="text" name="website_url" tabIndex={-1} autoComplete="off" value={formData.honeypot} onChange={(e) => handleChange("honeypot", e.target.value)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
              <input type="text" className={inputClass("full_name")} value={formData.full_name} onChange={(e) => handleChange("full_name", e.target.value)} placeholder="Your full name" maxLength={100} />
              {errors.full_name && <p className="text-destructive text-xs mt-1">{errors.full_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
              <input type="email" className={inputClass("email")} value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="name@company.com" maxLength={255} />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Contact Number *</label>
              <div className="flex gap-2">
                <select 
                  className="w-28 px-2 py-3 rounded-lg border bg-background text-foreground text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 border-border"
                  value={formData.phone_code} 
                  onChange={(e) => handleChange("phone_code", e.target.value)}
                >
                  <option value="+1">US/CA (+1)</option>
                  <option value="+44">UK (+44)</option>
                  <option value="+91">IN (+91)</option>
                  <option value="+61">AU (+61)</option>
                  <option value="+971">UAE (+971)</option>
                  <option value="+65">SG (+65)</option>
                  <option value="+49">DE (+49)</option>
                  <option value="+33">FR (+33)</option>
                  <option value="+39">IT (+39)</option>
                  <option value="+34">ES (+34)</option>
                  <option value="+81">JP (+81)</option>
                  <option value="+82">KR (+82)</option>
                  <option value="+86">CN (+86)</option>
                  <option value="+852">HK (+852)</option>
                  <option value="+886">TW (+886)</option>
                  <option value="+31">NL (+31)</option>
                  <option value="+32">BE (+32)</option>
                  <option value="+41">CH (+41)</option>
                  <option value="+46">SE (+46)</option>
                  <option value="+47">NO (+47)</option>
                  <option value="+45">DK (+45)</option>
                  <option value="+358">FI (+358)</option>
                  <option value="+43">AT (+43)</option>
                  <option value="+353">IE (+353)</option>
                  <option value="+64">NZ (+64)</option>
                  <option value="+27">ZA (+27)</option>
                  <option value="+55">BR (+55)</option>
                  <option value="+52">MX (+52)</option>
                  <option value="+54">AR (+54)</option>
                  <option value="+57">CO (+57)</option>
                  <option value="+56">CL (+56)</option>
                  <option value="+51">PE (+51)</option>
                  <option value="+60">MY (+60)</option>
                  <option value="+62">ID (+62)</option>
                  <option value="+63">PH (+63)</option>
                  <option value="+66">TH (+66)</option>
                  <option value="+84">VN (+84)</option>
                  <option value="+92">PK (+92)</option>
                  <option value="+880">BD (+880)</option>
                  <option value="+94">LK (+94)</option>
                  <option value="+974">QA (+974)</option>
                  <option value="+966">SA (+966)</option>
                  <option value="+48">PL (+48)</option>
                  <option value="+420">CZ (+420)</option>
                  <option value="+40">RO (+40)</option>
                  <option value="+380">UA (+380)</option>
                  <option value="+90">TR (+90)</option>
                  <option value="+20">EG (+20)</option>
                  <option value="+234">NG (+234)</option>
                  <option value="+254">KE (+254)</option>
                  <option value="+">Other (+)</option>
                </select>
                <input 
                  type="text" 
                  className={inputClass("phone")} 
                  value={formData.phone} 
                  onChange={(e) => handleChange("phone", e.target.value.replace(/[^\d\s\-\(\)]/g, ''))} 
                  placeholder="(555) 123-4567" 
                  maxLength={20} 
                />
              </div>
              {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">What Do You Need? *</label>
              <select className={inputClass("primary_challenge")} value={formData.primary_challenge} onChange={(e) => handleChange("primary_challenge", e.target.value)}>
                <option value="">Select service</option>
                {challengeOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
              </select>
              {errors.primary_challenge && <p className="text-destructive text-xs mt-1">{errors.primary_challenge}</p>}
            </div>
          </div>

          {!isCareerService && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Company Name *</label>
                  <input type="text" className={inputClass("company_name")} value={formData.company_name} onChange={(e) => handleChange("company_name", e.target.value)} placeholder="Your company" maxLength={100} />
                  {errors.company_name && <p className="text-destructive text-xs mt-1">{errors.company_name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Business Stage *</label>
                  <select className={inputClass("business_stage")} value={formData.business_stage} onChange={(e) => handleChange("business_stage", e.target.value)}>
                    <option value="">Select stage</option>
                    <option value="Startup">Startup</option>
                    <option value="Growing">Growing</option>
                    <option value="Scaling">Scaling</option>
                    <option value="Established">Established</option>
                  </select>
                  {errors.business_stage && <p className="text-destructive text-xs mt-1">{errors.business_stage}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Business Website *</label>
                <input type="url" className={inputClass("business_website")} value={formData.business_website} onChange={(e) => handleChange("business_website", e.target.value)} placeholder="https://yourcompany.com" maxLength={255} />
                {errors.business_website && <p className="text-destructive text-xs mt-1">{errors.business_website}</p>}
              </div>
            </>
          )}

          {isCareerService && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Current Role / Title</label>
                <input type="text" className={inputClass("company_name")} value={formData.company_name} onChange={(e) => handleChange("company_name", e.target.value)} placeholder="e.g. Marketing Manager" maxLength={100} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">LinkedIn Profile URL</label>
                <input type="url" className={inputClass("business_website")} value={formData.business_website} onChange={(e) => handleChange("business_website", e.target.value)} placeholder="https://linkedin.com/in/yourprofile" maxLength={255} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Budget Range *</label>
              <select className={inputClass("budget_range")} value={formData.budget_range} onChange={(e) => handleChange("budget_range", e.target.value)}>
                <option value="">Select budget</option>
                {budgetOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
              </select>
              {errors.budget_range && <p className="text-destructive text-xs mt-1">{errors.budget_range}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Timeline *</label>
              <select className={inputClass("timeline")} value={formData.timeline} onChange={(e) => handleChange("timeline", e.target.value)}>
                <option value="">Select timeline</option>
                <option value="Immediate">Immediate</option>
                <option value="1-3 months">1–3 months</option>
                <option value="Exploring">Exploring</option>
              </select>
              {errors.timeline && <p className="text-destructive text-xs mt-1">{errors.timeline}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              {isCareerService ? "Tell Us About Your Career Goals *" : "Project Description *"}{" "}
              <span className="text-muted-foreground font-normal">(min 50 characters)</span>
            </label>
            <textarea
              className={`${inputClass("project_description")} min-h-[120px] resize-y`}
              value={formData.project_description}
              onChange={(e) => handleChange("project_description", e.target.value)}
              placeholder={isCareerService ? "Describe your career goals, target roles, industries..." : "Describe your project goals, current challenges, and what success looks like..."}
              maxLength={2000}
            />
            <div className="flex justify-between mt-1">
              {errors.project_description ? <p className="text-destructive text-xs">{errors.project_description}</p> : <span />}
              <span className={`text-xs ${formData.project_description.length >= 50 ? "text-secondary" : "text-muted-foreground"}`}>
                {formData.project_description.length}/50 min
              </span>
            </div>
          </div>

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg"
            >
              <AlertCircle size={16} />
              Something went wrong. Please try again or email us directly at info@theripplenexus.com
            </motion.div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-base whitespace-nowrap hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 shadow-md disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Your Project
                <Send size={18} />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default LeadForm;
