import { useState, useEffect } from "react";
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
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

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
        <CaseStudiesSection />
        <WhyUsSection />
        <PricingSection onContactClick={openContact} />
        <FAQSection />
        <CTASection onContactClick={openContact} />
      </main>

      <Footer />

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
