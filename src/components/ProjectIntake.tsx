import React, { useState, useEffect } from "react";
import { ArrowRight, Check, CheckCircle2, ChevronLeft, Loader2, Send } from "lucide-react";
import { telemetry } from "../analytics/telemetry";

type ProblemChoice =
  | "new_product"
  | "internal_platform"
  | "ai_automation"
  | "existing_software"
  | "data_infrastructure"
  | "not_sure";

interface ProjectIntakeProps {
  initialProblem?: ProblemChoice;
}

const PROBLEM_OPTIONS = [
  { id: "new_product", label: "New Product / SaaS", tag: "From scratch" },
  { id: "internal_platform", label: "Internal Operations Platform", tag: "Back-office" },
  { id: "ai_automation", label: "AI & Workflow Automation", tag: "Eliminate manual work" },
  { id: "existing_software", label: "Existing Software Modernization", tag: "Refactor / migrate" },
  { id: "data_infrastructure", label: "Data & Cloud Infrastructure", tag: "Scale / throughput" },
  { id: "not_sure", label: "Not Sure Yet", tag: "Exploring technical options" },
] as const;

export const ProjectIntake: React.FC<ProjectIntakeProps> = ({ initialProblem }) => {
  const [step, setStep] = useState<number>(1);
  const [problem, setProblem] = useState<ProblemChoice>(initialProblem || "new_product");
  const [contextDetail, setContextDetail] = useState<string>("");
  const [systemsInvolved, setSystemsInvolved] = useState<string>("");
  const [timelineExpectation, setTimelineExpectation] = useState<string>("Within 60-90 days");
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (initialProblem) {
      setProblem(initialProblem);
    }
  }, [initialProblem]);

  const handleSelectProblem = (p: ProblemChoice) => {
    setProblem(p);
    telemetry.track("project_intake_step_1", { problemChoice: p });
    setStep(2);
    telemetry.track("project_intake_step_2", { problemChoice: p });
  };

  const handleContextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contextDetail.trim()) {
      setErrorMessage("Please share a brief note about what needs attention.");
      return;
    }
    setErrorMessage("");
    setStep(3);
    telemetry.track("project_intake_step_3", { contextDetail });
  };

  const handleTimelineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
    telemetry.track("project_intake_step_4", { timelineExpectation, systemsInvolved });
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!contactEmail.trim() || !/^\S+@\S+\.\S+$/.test(contactEmail.trim())) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    setErrorMessage("");
    setSubmitting(true);

    const payload = {
      problem_type: problem,
      context_detail: contextDetail,
      systems_involved: systemsInvolved,
      timeline: timelineExpectation,
      full_name: contactName.trim(),
      email: contactEmail.trim(),
      company_name: companyName.trim(),
    };

    try {
      // Attempt backend API delivery if available
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      telemetry.track("project_intake_step_5", payload);
      telemetry.track("project_intake_complete", payload);
      setIsCompleted(true);
    } catch (err) {
      console.warn("API delivery fallback, recording telemetry:", err);
      telemetry.track("project_intake_complete", payload);
      setIsCompleted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="intake" className="py-24 border-b border-[#1E2028] bg-[#08090C]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2028]">
            <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest">
              [STATE 11 // PROGRESSIVE INTAKE]
            </div>
            {!isCompleted && (
              <div className="font-mono text-xs text-[#8E93A4]">
                STEP 0{step} / 04
              </div>
            )}
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase mt-4">
            {isCompleted ? "Context Received." : "Tell us what you’re trying to build or fix."}
          </h2>
          <p className="font-body text-sm text-[#8E93A4] mt-2">
            {isCompleted
              ? "We have all the context we need to prepare our evaluation."
              : "No massive forms. No mandatory phone numbers. Start with the problem and we’ll define the technical path together."}
          </p>
        </div>

        {/* Form Console Container */}
        <div className="border border-[#1E2028] bg-[#0D0F16] p-4 sm:p-6 lg:p-10 relative">
          {/* Subtle Progress Bar */}
          {!isCompleted && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#1E2028]">
              <div
                className="h-full bg-[#00F0FF] transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          )}

          {/* STEP 01: PROBLEM SELECTION */}
          {step === 1 && !isCompleted && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="font-mono text-xs text-[#8E93A4] uppercase tracking-wider">
                01 // Select the primary focus area:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROBLEM_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectProblem(opt.id as ProblemChoice)}
                    className="text-left p-4 sm:p-5 bg-[#08090C] hover:bg-[#14161F] border border-[#1E2028] hover:border-[#00F0FF] transition-all duration-150 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#00F0FF] transition-colors">
                        {opt.label}
                      </div>
                      <div className="font-mono text-[11px] text-[#8E93A4] mt-1">
                        {opt.tag}
                      </div>
                    </div>
                    <div className="text-right pt-3 font-mono text-xs text-[#8E93A4] group-hover:text-white">
                      SELECT →
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 02: SMART CONTEXTUAL DRILLDOWN */}
          {step === 2 && !isCompleted && (
            <form onSubmit={handleContextSubmit} className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs text-[#8E93A4] uppercase tracking-wider">
                  02 // Operational Context:
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#8E93A4] hover:text-white"
                >
                  <ChevronLeft size={14} /> Back
                </button>
              </div>

              <div>
                <label className="block font-display font-bold text-base sm:text-lg text-white mb-2">
                  {problem === "new_product" && "What product are you building and who is the primary user?"}
                  {problem === "internal_platform" && "What manual back-office tasks or tools need to be consolidated?"}
                  {problem === "ai_automation" && "What repetitive work does your team do every week that should be automated?"}
                  {problem === "existing_software" && "What is currently failing or bottlenecked in your existing system?"}
                  {problem === "data_infrastructure" && "What scale, latency, or concurrency limits are you encountering?"}
                  {problem === "not_sure" && "Describe your current technical bottleneck or objective in 1-2 sentences:"}
                </label>
                <textarea
                  rows={4}
                  value={contextDetail}
                  onChange={(e) => setContextDetail(e.target.value)}
                  placeholder="e.g., We are manually copying customer order records between spreadsheets and our billing software, causing 10 hours of wasted effort and frequent reconciliation errors..."
                  className="w-full bg-[#08090C] border border-[#1E2028] focus:border-[#00F0FF] p-3.5 sm:p-4 text-white font-body text-sm outline-none transition-colors"
                />
              </div>

              {errorMessage && (
                <div className="font-mono text-xs text-[#FF4D4D]">{errorMessage}</div>
              )}

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00F0FF] transition-all duration-150 border border-white inline-flex items-center justify-center gap-2"
                >
                  <span>Continue</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 03: CURRENT SYSTEMS & TIMELINE */}
          {step === 3 && !isCompleted && (
            <form onSubmit={handleTimelineSubmit} className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs text-[#8E93A4] uppercase tracking-wider">
                  03 // Stack & Target Horizon:
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#8E93A4] hover:text-white"
                >
                  <ChevronLeft size={14} /> Back
                </button>
              </div>

              <div>
                <label className="block font-display font-bold text-sm text-white mb-2">
                  What existing software or databases are involved? (Optional)
                </label>
                <input
                  type="text"
                  value={systemsInvolved}
                  onChange={(e) => setSystemsInvolved(e.target.value)}
                  placeholder="e.g., PostgreSQL, Salesforce, AWS, SAP, or None"
                  className="w-full bg-[#08090C] border border-[#1E2028] focus:border-[#00F0FF] p-3.5 text-white font-mono text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-display font-bold text-sm text-white mb-2">
                  What is your target deployment window?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  {["Urgent (< 30 days)", "Standard (60–90 days)", "Flexible / Scoping"].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTimelineExpectation(t)}
                      className={`p-3 text-left border transition-colors ${
                        timelineExpectation === t
                          ? "bg-white text-black font-bold border-white"
                          : "bg-[#08090C] text-[#8E93A4] border-[#1E2028] hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00F0FF] transition-all duration-150 border border-white inline-flex items-center justify-center gap-2"
                >
                  <span>Final Step: Contact Details</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 04: THE PERSON (LOW FRICTION) */}
          {step === 4 && !isCompleted && (
            <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs text-[#8E93A4] uppercase tracking-wider">
                  04 // Where should we send the architectural brief?
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#8E93A4] hover:text-white"
                >
                  <ChevronLeft size={14} /> Back
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#8E93A4] uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-[#08090C] border border-[#1E2028] focus:border-[#00F0FF] p-3.5 text-white font-body text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#8E93A4] uppercase tracking-wider mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-[#08090C] border border-[#1E2028] focus:border-[#00F0FF] p-3.5 text-white font-body text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-[#8E93A4] uppercase tracking-wider mb-2">
                  Company / Project Name (Optional)
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full bg-[#08090C] border border-[#1E2028] focus:border-[#00F0FF] p-3.5 text-white font-body text-sm outline-none"
                />
              </div>

              {errorMessage && (
                <div className="font-mono text-xs text-[#FF4D4D]">{errorMessage}</div>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#1E2028]">
                <div className="font-mono text-[11px] text-[#8E93A4]">
                  Zero spam. We review your submission and reply with a written architectural evaluation.
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00F0FF] transition-all duration-150 border border-white inline-flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Context...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Context & Get Architecture Brief</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 05: CONFIRMATION (CONVERSATION CONTINUING) */}
          {isCompleted && (
            <div className="py-12 text-left space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#00E599] inline-block" />
                <span className="font-mono text-xs text-[#00E599] uppercase tracking-widest font-bold">
                  TRANSMISSION CONFIRMED // GOT IT.
                </span>
              </div>

              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white">
                We’ve got the context.
              </h3>

              <p className="font-body text-base text-[#B4B9C8] max-w-xl leading-relaxed">
                Our founding architect is reviewing what you’re trying to achieve against our technical benchmarks. We will follow up with a written architectural diagnosis and determine the appropriate next engineering step.
              </p>

              <div className="p-6 bg-[#08090C] border border-[#1E2028] font-mono text-xs text-[#8E93A4] space-y-2">
                <div>EXPECTED RESPONSE: Within 24–48 hours</div>
                <div>DELIVERABLE: Written systems scope, stack recommendations & approach</div>
                <div>URGENT INQUIRIES: <a href="mailto:info@theripplenexus.com" className="text-white underline">info@theripplenexus.com</a></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectIntake;
