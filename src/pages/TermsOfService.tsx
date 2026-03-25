import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logoSvg from "@/assets/logo-icon.svg";

const TermsOfService = () => {
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
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: March 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Agreement to Terms</h2>
            <p>By accessing or using the services provided by Ripple Nexus ("Company"), you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Ripple Nexus, governed by the laws of India, including the Information Technology Act, 2000 and the Indian Contract Act, 1872, alongside applicable international trade and digital commerce regulations.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Services</h2>
            <p>Ripple Nexus provides enterprise SaaS consulting, IT infrastructure solutions, cloud migration, cybersecurity advisory, CRM/ERP implementation, and related technology services. The specific scope of services will be defined in individual Statements of Work (SOW) or service agreements.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Client Obligations</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Provide accurate and complete information as required for service delivery</li>
              <li>Ensure timely feedback and approvals to avoid project delays</li>
              <li>Maintain confidentiality of any proprietary tools, methodologies, or materials shared</li>
              <li>Comply with all applicable laws and regulations in your jurisdiction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property</h2>
            <p>All intellectual property created during the engagement, unless explicitly stated otherwise in the SOW, shall be assigned to the client upon full payment. Pre-existing IP, frameworks, and tools of Ripple Nexus remain the sole property of the Company. Ripple Nexus retains the right to use anonymized project details for portfolio and marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Payment Terms</h2>
            <p>Payment terms, including fees, milestones, and due dates, will be specified in the applicable SOW or invoice. All payments are due within 15 days of invoice date unless otherwise agreed. Late payments may incur interest at 1.5% per month. All fees are exclusive of applicable taxes (GST/VAT) unless stated otherwise.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Confidentiality</h2>
            <p>Both parties agree to maintain the confidentiality of all proprietary information shared during the engagement. This obligation survives the termination of services for a period of 3 years.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, Ripple Nexus shall not be liable for indirect, incidental, consequential, or punitive damages. Our total liability shall not exceed the amount paid by the client for the specific service giving rise to the claim.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Dispute Resolution</h2>
            <p>Any disputes arising from these terms shall be first resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration under the Arbitration and Conciliation Act, 1996 (India), with the seat of arbitration in Noida, Uttar Pradesh, India. The language of arbitration shall be English.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of India. The courts of Noida, Uttar Pradesh shall have exclusive jurisdiction over any matters not subject to arbitration.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Amendments</h2>
            <p>We reserve the right to modify these Terms at any time. Changes become effective upon posting to this page. Continued use of our services after changes constitutes acceptance of the modified terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact</h2>
            <p>
              <strong>Ripple Nexus</strong><br />
              Cospazes, A-116 Urbtech Trade Centre, Sec-132<br />
              Noida — 201304, India<br />
              Email: <a href="mailto:info@theripplenexus.com" className="text-primary hover:underline">info@theripplenexus.com</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
