import { useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_7f9de4cc-23e2-4dee-b34f-6c95288f12e2/artifacts/5siww960_Screenshot%202026-02-17%20at%2022.30.43.png";

const ImpressumPage = () => {
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');

  useEffect(() => {
    window.scrollTo(0, 0);

    const title = "Impressum | Optimis AI";
    const description = "Impressum von Optimis AI mit Anbieterkennzeichnung und Kontaktinformationen.";

    document.title = title;

    const updateMetaTag = (selector, content) => {
      const tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute("content", content);
      }
    };

    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);

    const robotsTag = document.querySelector('meta[name="robots"]');
    if (
      robotsTag &&
      (window.location.hostname.indexOf("optimis-ai.com") !== -1 ||
        window.location.hostname.indexOf("builder.io") !== -1)
    ) {
      robotsTag.setAttribute("content", "index, follow");
    }

    const ensureAlternateLink = (hreflang, href) => {
      let tag = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", "alternate");
        tag.setAttribute("hreflang", hreflang);
        document.head.appendChild(tag);
      }
      tag.setAttribute("href", href);
    };

    ensureAlternateLink("de", "https://www.optimis-ai.com/impressum");
    ensureAlternateLink("en", "https://www.optimis-ai.com/en/imprint");
    ensureAlternateLink("x-default", "https://www.optimis-ai.com/impressum");

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    const canonicalUrl = isEnglish
      ? "https://www.optimis-ai.com/en/imprint"
      : "https://www.optimis-ai.com/impressum";
    canonicalTag.setAttribute("href", canonicalUrl);

    document.documentElement.lang = isEnglish ? "en" : "de";
  }, [isEnglish]);

  return (
    <div className="min-h-screen bg-[#020617] relative flex flex-col">
      <div className="neural-bg" />

      <header className="relative z-10 border-b border-white/10 bg-[#020617]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center">
          <div className="h-12 w-[170px] shrink-0 overflow-hidden lg:h-14 lg:w-[190px]" aria-label="Optimis AI">
            <img
              src={LOGO_URL}
              alt="Optimis AI"
              className="h-full w-full scale-[1.16] object-cover object-center"
            />
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-grow px-6 py-16 lg:px-12">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4">Impressum</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-10">Anbieterkennzeichnung</h1>

          <div className="space-y-10 text-slate-300">
            <section className="border-b border-white/5 pb-8">
              <h2 className="text-2xl text-white mb-4">Angaben gemäß § 5 DDG</h2>
              <div className="space-y-2 text-lg">
                <p className="text-white font-semibold">Optimis AI</p>
                <p>Holger Kretzschmar</p>
                <p>Fichtenstr. 6</p>
                <p>82178 Puchheim</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-2xl text-white mb-4">Kontakt</h2>
              <div className="space-y-4">
                <a href="mailto:info@optimis-ai.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                  <Mail size={18} className="text-cyan-400" />
                  info@optimis-ai.com
                </a>
                <a href="tel:+4915757111880" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                  <Phone size={18} className="text-cyan-400" />
                  +49 157 57111880
                </a>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-2xl text-white mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
              <p>Holger Kretzschmar, Anschrift wie oben.</p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-4">EU-Streitbeilegung</h2>
              <p className="leading-relaxed">Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
            </section>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
            <Link to={isEnglish ? '/en/ai-consulting' : '/ki-beratung'} className="ki-beratung-footer-link">
              {isEnglish ? 'Back to AI Consulting' : 'Zurück zur KI-Beratung'}
            </Link>
            <Link to={isEnglish ? '/en/privacy-policy' : '/privacy-policy'} className="ki-beratung-footer-link">
              {isEnglish ? 'Privacy Policy' : 'Datenschutz'}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImpressumPage;
