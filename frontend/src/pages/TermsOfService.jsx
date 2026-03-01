import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const TermsOfService = () => {
  const { t, i18n } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = i18n.language === 'de' ? "Nutzungsbedingungen | Optimis AI" : "Terms of Service | Optimis AI";
  }, [i18n.language]);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <div className="min-h-screen bg-[#020617] relative flex flex-col">
      {/* Neural Network Background */}
      <div className="neural-bg" />
      
      <Navigation onContactClick={openContact} />
      
      <main className="flex-grow pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
          <h1 className="text-3xl lg:text-5xl font-bold mb-8 gradient-text text-center lg:text-left">
            {i18n.language === 'de' ? 'Nutzungsbedingungen' : 'Terms of Service'}
          </h1>
          
          <div className="space-y-12 text-slate-300">
            {i18n.language === 'en' ? (
              <>
                <section className="border-b border-white/5 pb-8">
                  <h2 className="text-xl font-bold text-white mb-4">1. Definitions</h2>
                  <div className="space-y-2">
                    <p><span className="text-white font-medium">"Company"</span> refers to Optimis AI.</p>
                    <p><span className="text-white font-medium">"Client"</span> refers to any individual or entity purchasing or using our services.</p>
                  </div>
                </section>
                {/* ... other EN sections ... */}
              </>
            ) : (
              <>
                <section className="border-b border-white/5 pb-8">
                  <h2 className="text-xl font-bold text-white mb-4">1. Definitionen</h2>
                  <div className="space-y-2">
                    <p><span className="text-white font-medium">"Unternehmen"</span> bezieht sich auf Optimis AI.</p>
                    <p><span className="text-white font-medium">"Kunde"</span> bezieht sich auf jede natürliche oder juristische Person, die unsere Dienste erwirbt oder nutzt.</p>
                  </div>
                </section>
                {/* ... other DE sections ... */}
              </>
            )}
            
            <p className="text-sm text-slate-500 pt-8 border-t border-white/10">
              {i18n.language === 'de' ? 'Zuletzt aktualisiert: Februar 2026' : 'Last Updated: February 2026'}
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
