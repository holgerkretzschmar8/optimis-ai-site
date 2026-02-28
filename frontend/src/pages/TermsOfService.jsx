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
          <h1 className="text-3xl lg:text-5xl font-bold mb-8 gradient-text">Terms of Service</h1>
          
          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Optimis AI's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Description of Service</h2>
              <p>
                Optimis AI provides AI-powered voice agents and automation systems. We reserve the right to modify, suspend, or discontinue any part of the service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. User Responsibilities</h2>
              <p>
                Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to use our services only for lawful purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Intellectual Property</h2>
              <p>
                All content, trademarks, and data on this website are the property of Optimis AI or its licensors and are protected by intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Limitation of Liability</h2>
              <p>
                Optimis AI shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">6. Changes to Terms</h2>
              <p>
                We may update these terms from time to time. Your continued use of the service after any changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">7. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at info@optimis-ai.com.
              </p>
            </section>

            <p className="text-sm text-slate-500 pt-8">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {isContactOpen && (
        <ContactModal isOpen={isContactOpen} onClose={closeContact} />
      )}
    </div>
  );
};

export default TermsOfService;
