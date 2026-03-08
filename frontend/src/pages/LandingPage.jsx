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
import StudyInvitePopup from "@/components/StudyInvitePopup";

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [showStudyPopup, setShowStudyPopup] = useState(false);
  const [hasShownStudyPopup, setHasShownStudyPopup] = useState(false);

  useEffect(() => {
    // Update Document Title and Meta Tags
    document.title = t('common.siteTitle');

    const updateMetaTag = (selector, content) => {
      const tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute('content', content);
      }
    };

    updateMetaTag('meta[name="description"]', t('common.siteDescription'));
    updateMetaTag('meta[name="keywords"]', t('common.keywords'));
    updateMetaTag('meta[property="og:title"]', t('common.ogTitle'));
    updateMetaTag('meta[property="og:description"]', t('common.ogDescription'));
    updateMetaTag('meta[name="twitter:title"]', t('common.ogTitle'));
    updateMetaTag('meta[name="twitter:description"]', t('common.ogDescription'));

    // Ensure Robots Tag is index, follow for production pages
    const robotsTag = document.querySelector('meta[name="robots"]');
    if (robotsTag &&
       (window.location.hostname.indexOf("optimis-ai.com") !== -1 ||
        window.location.hostname.indexOf("builder.io") !== -1)) {
      robotsTag.setAttribute('content', 'index, follow');
    }

    // Update Hreflang Tags
    const updateLinkTag = (selector, attr, content) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', 'alternate');
        if (selector.indexOf('hreflang') !== -1) {
          const lang = selector.match(/hreflang="([^"]+)"/)[1];
          tag.setAttribute('hreflang', lang);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute(attr, content);
    };

    updateLinkTag('link[hreflang="en"]', 'href', 'https://www.optimis-ai.com');
    updateLinkTag('link[hreflang="de"]', 'href', 'https://www.optimis-ai.com/de');
    updateLinkTag('link[hreflang="x-default"]', 'href', 'https://www.optimis-ai.com');

    // Update Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    const canonicalUrl = i18n.language === 'de'
      ? 'https://www.optimis-ai.com/de'
      : 'https://www.optimis-ai.com';
    canonicalTag.setAttribute('href', canonicalUrl);

    // Update HTML lang attribute
    document.documentElement.lang = i18n.language;
  }, [i18n.language, i18n, t]);

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

  useEffect(() => {
    // Show study popup after 10 seconds for German users
    if (i18n.language === 'de' && !hasShownStudyPopup) {
      const timer = setTimeout(() => {
        // Only show if lead popup is not already showing
        if (!showLeadPopup) {
          setShowStudyPopup(true);
          setHasShownStudyPopup(true);
        }
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [i18n.language, hasShownStudyPopup, showLeadPopup]);

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

      <StudyInvitePopup isOpen={showStudyPopup} onClose={() => setShowStudyPopup(false)} />
    </div>
  );
};

export default LandingPage;
