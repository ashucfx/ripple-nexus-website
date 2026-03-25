import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logoSvg from "@/assets/logo-icon.svg";

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoSvg} alt="Ripple Nexus" className="w-9 h-9" />
            <span className="font-display font-extrabold text-lg tracking-tight text-foreground">
              Ripple<span className="text-primary"> Nexus</span>
            </span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Cancellation & Refund Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: March 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Overview</h2>
            <p>This Cancellation & Refund Policy applies to all services provided by Ripple Nexus. This policy is compliant with the Consumer Protection Act, 2019 (India) and applicable e-commerce regulations, as well as international fair trade standards.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Cancellation by Client</h2>
            <p><strong>Before Project Commencement:</strong> If a client cancels before the project kickoff date, a full refund of any advance payment will be processed within 15 business days, minus any non-refundable consultation fees (if applicable).</p>
            <p><strong>After Project Commencement:</strong> Cancellation after project work has begun will be subject to pro-rata billing. The client will be charged for all work completed up to the date of cancellation, including any third-party costs incurred.</p>
            <p><strong>Notice Period:</strong> A minimum of 7 business days written notice is required for any cancellation request. Cancellation requests must be sent via email to <a href="mailto:info@theripplenexus.com" className="text-primary hover:underline">info@theripplenexus.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Cancellation by Ripple Nexus</h2>
            <p>We reserve the right to cancel or suspend services if:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>The client fails to make payments as per the agreed schedule</li>
              <li>The client breaches the Terms of Service or any applicable SOW</li>
              <li>Continued service delivery becomes impractical due to circumstances beyond our control (force majeure)</li>
            </ul>
            <p>In such cases, any unused advance payments (minus work completed) will be refunded within 15 business days.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Refund Process</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Refunds will be processed to the original payment method</li>
              <li>Refund processing time: 7–15 business days from approval</li>
              <li>All refunds are subject to deduction of work already completed and any non-recoverable third-party expenses</li>
              <li>GST/tax adjustments will be handled as per applicable law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Non-Refundable Items</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Discovery/consultation sessions that have been completed</li>
              <li>Third-party software licenses, cloud infrastructure costs, or domain registrations procured on behalf of the client</li>
              <li>Custom development work that has been delivered and approved</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Dispute Resolution</h2>
            <p>If you are dissatisfied with a refund decision, you may raise a dispute within 30 days. We will review all disputes in good faith and aim to resolve them within 15 business days. Unresolved disputes will be subject to the arbitration provisions outlined in our Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Contact Us</h2>
            <p>
              <strong>Ripple Nexus</strong><br />
              Cospazes, A-116 Urbtech Trade Centre, Sec-132<br />
              Noida — 201304, India<br />
              Email: <a href="mailto:info@theripplenexus.com" className="text-primary hover:underline">info@theripplenexus.com</a><br />
              Phone: <a href="tel:+917599756826" className="text-primary hover:underline">+91 7599 756 826</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CancellationPolicy;
