import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const TermsOfService = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <div className="min-h-screen bg-[#020617] relative flex flex-col">
      {/* Neural Network Background */}
      <div className="neural-bg" />
      
      <Navigation onContactClick={openContact} />
      
      <main className="flex-grow pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
          <h1 className="text-3xl lg:text-5xl font-bold mb-8 gradient-text text-center lg:text-left">Terms of Service</h1>
          
          <div className="space-y-12 text-slate-300">
            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">1. Definitions</h2>
              <div className="space-y-2">
                <p><span className="text-white font-medium">"Company"</span> refers to Optimis AI.</p>
                <p><span className="text-white font-medium">"Client"</span> refers to any individual or entity purchasing or using our services.</p>
                <p><span className="text-white font-medium">"Services"</span> include AI voice agents, chatbots, automation systems, and related consulting or development work.</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">2. Description of Services</h2>
              <div className="space-y-4">
                <p>The Company provides AI-powered automation solutions including voice agents, chatbots, workflow automations, and integrations with third-party platforms.</p>
                <p>The Company reserves the right to modify, suspend, or discontinue any Service at its discretion.</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">3. Use of Services</h2>
              <div className="space-y-4">
                <p>Client agrees to use the Services only for lawful purposes and in compliance with all applicable laws, including data protection and telecommunications laws.</p>
                <p>Client is solely responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The legality of collected data</li>
                  <li>Obtaining proper user consent</li>
                  <li>The content processed by AI systems</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">4. AI-Specific Disclaimer</h2>
              <div className="space-y-4">
                <p>Client acknowledges that AI systems:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>May generate inaccurate or incomplete outputs</li>
                  <li>May produce unintended responses</li>
                  <li>Require human supervision</li>
                </ul>
                <p>The Company does not guarantee accuracy, reliability, or suitability of AI-generated outputs.</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">5. Fees and Payment</h2>
              <div className="space-y-4">
                <p>All fees are outlined in separate proposals or agreements.</p>
                <p>Unless otherwise agreed:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payments are due within 14 days</li>
                  <li>Fees are non-refundable</li>
                  <li>Late payments may incur interest</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">6. Intellectual Property</h2>
              <div className="space-y-4">
                <p>Unless otherwise agreed in writing:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Custom solutions remain property of the Company until fully paid</li>
                  <li>The Company retains rights to underlying frameworks and know-how</li>
                  <li>Client retains ownership of their own data</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">7. Third-Party Services</h2>
              <div className="space-y-4">
                <p>Services may rely on third-party providers including but not limited to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cloud hosting providers</li>
                  <li>AI model providers</li>
                  <li>Telecommunication services</li>
                </ul>
                <p>The Company is not responsible for outages, API limitations, or changes by third-party providers.</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">8. Data Protection & GDPR</h2>
              <p>If the Company processes personal data on behalf of the Client, a separate Data Processing Agreement (DPA) shall apply in accordance with Article 28 GDPR. Client remains the data controller unless otherwise agreed.</p>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">9. Confidentiality</h2>
              <p>Both parties agree to keep confidential information strictly confidential and not disclose it to third parties.</p>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">10. Warranties Disclaimer</h2>
              <p>Services are provided "as is" and "as available" without warranties of any kind.</p>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">11. Limitation of Liability</h2>
              <div className="space-y-4">
                <p>To the maximum extent permitted by law:</p>
                <p>The Company's total liability shall not exceed the total amount paid by the Client in the preceding 12 months. The Company shall not be liable for indirect, incidental, or consequential damages.</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">12. Indemnification</h2>
              <div className="space-y-4">
                <p>Client agrees to indemnify and hold harmless the Company from claims arising from:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unlawful use of Services</li>
                  <li>Violation of data protection laws</li>
                  <li>Improper AI deployment</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">13. Termination</h2>
              <div className="space-y-4">
                <p>Either party may terminate the agreement with written notice.</p>
                <p>Upon termination:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access to Services may be suspended</li>
                  <li>Outstanding fees remain payable</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">14. Governing Law</h2>
              <p>These Terms shall be governed by the laws of Germany.</p>
            </section>

            <section className="pb-8">
              <h2 className="text-xl font-bold text-white mb-4">15. Changes</h2>
              <p>The Company may update these Terms from time to time. Continued use constitutes acceptance.</p>
            </section>

            <p className="text-sm text-slate-500 pt-8 border-t border-white/10">
              Last Updated: February 2026
            </p>
          </div>
        </div>
      </main>

      <Footer onContactClick={openContact} />

      {isContactOpen && (
        <ContactModal isOpen={isContactOpen} onClose={closeContact} />
      )}
    </div>
  );
};

export default TermsOfService;
