import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
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

    const robotsTag = document.querySelector('meta[name="robots"]');
    if (
      robotsTag &&
      (window.location.hostname.indexOf("optimis-ai.com") !== -1 ||
        window.location.hostname.indexOf("builder.io") !== -1)
    ) {
      robotsTag.setAttribute('content', 'index, follow');
    }

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

    document.documentElement.lang = i18n.language;
  }, [i18n.language, i18n, t]);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <div className="min-h-screen bg-[#020617] relative">
      <div className="neural-bg" />

      <Navigation onContactClick={openContact} />

      <main>
        <HeroSection onContactClick={openContact} />
        <HowItWorksSection />
        <ServicesSection />
        <WhyUsSection />
        <CTASection onContactClick={openContact} />
      </main>

      <Footer onContactClick={openContact} />
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
    </div>
  );
};

export default LandingPage;
