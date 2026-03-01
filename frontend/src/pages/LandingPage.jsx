import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import IndustriesSection from "@/components/IndustriesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import WhyUsSection from "@/components/WhyUsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import LeadPopup from "@/components/LeadPopup";

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    // Update Document Title and Meta Description
    document.title = i18n.language === 'de'
      ? "Optimis AI | KI-Automatisierungsagentur für Umsatz & Effizienz"
      : "Optimis AI | AI Automation Agency for Revenue & Efficiency";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', i18n.language === 'de'
        ? "Optimis AI entwickelt fortschrittliche KI-Automatisierungssysteme, die Umsatz, Workflows und die betriebliche Effizienz moderner Unternehmen optimieren."
        : "Optimis AI builds advanced AI automation systems that optimize revenue, workflows, and operational efficiency for modern businesses.");
    }
  }, [i18n.language, i18n]);

  useEffect(() => {
    const handleScroll = () => {
      if (hasShownPopup) return;

      const whyUsSection = document.getElementById('why-us');
      if (whyUsSection) {
        const rect = whyUsSection.getBoundingClientRect();
        // Trigger when the section bottom enters the view (user has scrolled past the main content of Why Us)
        if (rect.bottom < window.innerHeight) {
          setShowLeadPopup(true);
          setHasShownPopup(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShownPopup]);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);
  const handleShowPopup = () => {
    if (!hasShownPopup) {
      setShowLeadPopup(true);
      setHasShownPopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] relative">
      {/* Neural Network Background */}
      <div className="neural-bg" />

      <Navigation onContactClick={openContact} />

      <main>
        <HeroSection onContactClick={openContact} />
        <SocialProofSection />
        <ServicesSection />
        <HowItWorksSection />
        <IndustriesSection />
        <WhyUsSection onShowPopup={handleShowPopup} />
        <PricingSection onContactClick={openContact} />
        <FAQSection />
        <CTASection onContactClick={openContact} />
      </main>

      <Footer onContactClick={openContact} />

      <ContactModal isOpen={isContactOpen} onClose={closeContact} />

      <LeadPopup isOpen={showLeadPopup} onClose={() => setShowLeadPopup(false)} />
    </div>
  );
};

export default LandingPage;
