import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logoSvg from "@/assets/logo-icon.svg";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: March 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>Ripple Nexus ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services. This policy is governed by the Information Technology Act, 2000 (India) and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, as well as applicable international data protection standards including GDPR where applicable.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <p><strong>Personal Data:</strong> Name, email address, phone number, company name, business website, and any information you voluntarily provide through our lead forms or consultations.</p>
            <p><strong>Usage Data:</strong> Browser type, IP address, pages visited, time spent, referring URLs, and device information — collected automatically via cookies and analytics tools.</p>
            <p><strong>Business Data:</strong> Project descriptions, budget ranges, timelines, and business challenges shared during engagement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To respond to your inquiries and provide requested services</li>
              <li>To process and manage client engagements</li>
              <li>To improve our website, services, and user experience</li>
              <li>To send relevant communications about our services (with consent)</li>
              <li>To comply with legal obligations under Indian and international law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Sharing & Disclosure</h2>
            <p>We do not sell, trade, or rent your personal data. We may share information with trusted third-party service providers (hosting, analytics, CRM) who assist in operating our business, subject to strict confidentiality agreements. We may disclose data when required by law or to protect our legal rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Security</h2>
            <p>We implement industry-standard security measures including encryption, access controls, and regular security audits. While no method of transmission over the internet is 100% secure, we strive to protect your personal information using commercially acceptable means in compliance with IS/ISO 27001 standards.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Data Retention</h2>
            <p>We retain personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law. You may request deletion of your data at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Your Rights</h2>
            <p>Under applicable Indian and international laws, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw consent for data processing</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Cookies</h2>
            <p>Our website uses cookies to enhance your browsing experience. You can control cookie preferences through your browser settings. Disabling cookies may affect certain website functionalities.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Third-Party Links</h2>
            <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact Us</h2>
            <p>For privacy-related inquiries or to exercise your data rights:</p>
            <p className="mt-2">
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

export default PrivacyPolicy;
