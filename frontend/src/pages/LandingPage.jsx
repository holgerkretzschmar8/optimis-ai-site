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
      ? "Optimis AI | Enterprise KI-Automatisierungsagentur"
      : "Optimis AI | Enterprise AI Automation Agency";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', i18n.language === 'de'
        ? "Optimis AI hilft Unternehmen bei der Skalierung mit maßgeschneiderten KI-Voice-Agents, Chatbots und Workflow-Automatisierung."
        : "Optimis AI helps businesses scale with custom AI voice agents, chatbots, and workflow automation.");
    }
  }, [i18n.language]);

  useEffect(() => {
    const handleScroll = () => {
      if (hasShownPopup) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = (scrollPosition / scrollHeight) * 100;

      if (scrollPercentage >= 50) {
        setShowLeadPopup(true);
        setHasShownPopup(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShownPopup]);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

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
        <WhyUsSection onShowPopup={() => setShowLeadPopup(true)} />
        <PricingSection onContactClick={openContact} />
        <FAQSection />
        <CTASection onContactClick={openContact} />
      </main>

      <Footer onContactClick={openContact} />

      {isContactOpen && (
        <ContactModal isOpen={isContactOpen} onClose={closeContact} />
      )}
      
      {showLeadPopup && (
        <LeadPopup onClose={() => setShowLeadPopup(false)} />
      )}
    </div>
  );
};

export default LandingPage;
