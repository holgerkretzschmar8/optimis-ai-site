import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 gradient-text text-center lg:text-left">Privacy Policy</h1>
          <p className="text-slate-400 mb-8 text-center lg:text-left">Effective Date: 28.02.2026</p>
          
          <div className="space-y-12 text-slate-300">
            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">1. Controller Information (Art. 13 GDPR)</h2>
              <div className="space-y-2">
                <p>Controller within the meaning of the General Data Protection Regulation (GDPR):</p>
                <div className="bg-white/5 p-4 rounded-xl mt-2">
                  <p className="text-white font-bold">Optimis AI</p>
                  <p>Geschäftsführer: Holger Kretzschmar</p>
                  <p>Fichtenstr. 6</p>
                  <p>82178 Puchheim</p>
                  <p>Germany</p>
                  <p className="mt-2">Email: info@optimis-ai.com</p>
                  <p>Phone: +49 157 57111880</p>
                </div>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">2. General Information on Data Processing</h2>
              <div className="space-y-4">
                <p>We process personal data in accordance with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Regulation (EU) 2016/679 (General Data Protection Regulation – GDPR)</li>
                  <li>German Federal Data Protection Act (BDSG)</li>
                  <li>Applicable telecommunications and digital services laws</li>
                </ul>
                <p>Personal data means any information relating to an identified or identifiable natural person. We process personal data only to the extent necessary to provide our services, operate our website, and fulfill contractual obligations.</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">3. Data Collected When Visiting Our Website</h2>
              <div className="space-y-4">
                <p>When you visit our website, our hosting provider automatically collects:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm md:text-base grid md:grid-cols-2 gap-x-4">
                  <li>IP address</li>
                  <li>Date and time of access</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referrer URL</li>
                  <li>Accessed pages</li>
                </ul>
                <p><span className="text-white font-medium">Legal basis:</span> Art. 6(1)(f) GDPR (legitimate interest in secure and stable operation of the website).</p>
                <p>Log files are stored for security reasons and automatically deleted after a standardized period.</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">4. Contact Forms and Email Communication</h2>
              <div className="space-y-4">
                <p>If you contact us via contact form or email, we process:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Company name (if provided)</li>
                  <li>Message content</li>
                </ul>
                <p><span className="text-white font-medium">Legal basis:</span> Art. 6(1)(b) GDPR (pre-contractual measures) and Art. 6(1)(f) GDPR (legitimate interest in communication).</p>
                <p>Data is deleted once the request is resolved unless statutory retention obligations apply.</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">5. Processing of Client Data (AI Services)</h2>
              <div className="space-y-4">
                <p>When providing AI voice agents, chatbots, or automation services, we may process personal data on behalf of our clients. This may include:</p>
                <ul className="list-disc pl-6 space-y-2 grid md:grid-cols-2 gap-x-4">
                  <li>Call recordings</li>
                  <li>Voice data</li>
                  <li>Transcripts</li>
                  <li>Customer names and contact details</li>
                  <li>CRM data</li>
                  <li>Support inquiries</li>
                </ul>
                <p>In such cases, the client is the data controller, and we act as data processor under Art. 28 GDPR. A separate Data Processing Agreement (DPA) is concluded.</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">6. Use of AI Systems</h2>
              <div className="space-y-4">
                <p>Our services may involve AI systems that process input data to generate automated responses. AI processing may include natural language processing, voice recognition, text-to-speech generation, and automated workflow execution.</p>
                <p><span className="text-white font-medium">Legal basis:</span> Art. 6(1)(b) GDPR (contract performance) and Art. 6(1)(f) GDPR (legitimate business interests).</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">7. Use of Third-Party Service Providers</h2>
              <div className="space-y-4">
                <p>We use third-party service providers for hosting, cloud infrastructure, AI models, telecommunications, and email services. Where required, Data Processing Agreements are concluded, and data transfers outside the EU are safeguarded by Standard Contractual Clauses (Art. 46 GDPR).</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">8. Cookies and Tracking Technologies</h2>
              <div className="space-y-4">
                <p>Our website may use cookies. Categories include essential (necessary for operation), analytics, and marketing (only with consent).</p>
                <p><span className="text-white font-medium">Legal basis:</span> § 25 TTDSG and Art. 6(1)(a) GDPR (consent).</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">9. Data Retention</h2>
              <p>We store personal data only as long as necessary for contract fulfillment, legal retention obligations, or legitimate business purposes. Statutory retention periods may require storage for up to 10 years.</p>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">10. Data Transfers Outside the EU</h2>
              <p>If personal data is transferred to countries outside the EU/EEA, this is done only if an adequacy decision exists (Art. 45 GDPR) or Standard Contractual Clauses are implemented (Art. 46 GDPR).</p>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">11. Data Subject Rights (Art. 15–22 GDPR)</h2>
              <div className="space-y-4">
                <p>Individuals have the right to access, rectification, erasure, restriction of processing, data portability, and to object to processing. Where processing is based on consent, it may be withdrawn at any time.</p>
                <p>Requests can be sent to: <a href="mailto:info@optimis-ai.com" className="text-cyan-400 hover:underline">info@optimis-ai.com</a></p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">12. Right to Lodge a Complaint</h2>
              <p>You have the right to lodge a complaint with a supervisory authority. For Germany, the competent authority is generally the data protection authority of your federal state (Bundesland).</p>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">13. Data Security</h2>
              <p>We implement appropriate technical and organizational measures (TOMs) in accordance with Art. 32 GDPR, including encryption, access controls, and secure hosting infrastructure.</p>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">14. Automated Decision-Making</h2>
              <p>Unless explicitly stated in a separate agreement, we do not conduct fully automated decision-making within the meaning of Art. 22 GDPR that produces legal effects.</p>
            </section>

            <section className="pb-8">
              <h2 className="text-xl font-bold text-white mb-4">15. Changes to This Privacy Policy</h2>
              <p>We reserve the right to update this Privacy Policy to reflect legal or technical changes.</p>
            </section>
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

export default PrivacyPolicy;
