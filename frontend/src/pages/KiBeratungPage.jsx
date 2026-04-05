import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeEuro,
  CheckCircle2,
  Clock3,
  FlaskConical,
  MapPin,
  MessageSquareMore,
  PhoneCall,
  Workflow,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_7f9de4cc-23e2-4dee-b34f-6c95288f12e2/artifacts/5siww960_Screenshot%202026-02-17%20at%2022.30.43.png";
const FORMSPREE_URL = "https://formspree.io/f/mqedjvzr";

const trustItems = [
  { icon: FlaskConical, text: "Kostenloser Pilot" },
  { icon: BadgeEuro, text: "Erst Ergebnis dann Zahlung" },
  { icon: Clock3, text: "Live in 2–4 Wochen" },
  { icon: MapPin, text: "Made in München" },
];

const processSteps = [
  {
    title: "Erstgespräch",
    detail: "Kostenlos",
    description: "Wir verstehen Ihr Unternehmen, Ihre Prozesse und die realistischen Einsatzfelder für KI.",
  },
  {
    title: "Foundation Check",
    detail: "Kostenlos",
    description: "Wir prüfen Datenlage, Tools und Abläufe, damit ein Pilot sauber und schnell starten kann.",
  },
  {
    title: "Pilotphase",
    detail: "Risikofrei",
    description: "Wir bauen einen ersten Anwendungsfall und testen ihn in Ihrer echten Umgebung.",
  },
  {
    title: "Partnerschaft",
    detail: "Erst dann zahlen",
    description: "Wenn Ergebnisse sichtbar sind, skalieren wir die Lösung gemeinsam in Ihrem Unternehmen.",
  },
];

const services = [
  {
    icon: MessageSquareMore,
    title: "KI Chatbot",
    description: "Für Website, Support und Lead-Qualifizierung – schnell eingebunden und sofort einsatzbereit.",
  },
  {
    icon: PhoneCall,
    title: "Voice Agent",
    description: "Automatisiert Anrufe, Vorqualifizierung und Terminvereinbarung mit natürlicher Sprache.",
  },
  {
    icon: Workflow,
    title: "Workflow-Automatisierung",
    description: "Verbindet Ihre Systeme und reduziert manuelle Schritte in Vertrieb, Service und Backoffice.",
  },
];

const interestOptions = [
  "KI Chatbot",
  "Voice Agent",
  "Workflow-Automatisierung",
  "Mehreres",
  "Bin unsicher",
];

const KiBeratungPage = () => {
  const { i18n } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    i18n.changeLanguage("de");

    const title = "KI-Beratung | Optimis AI";
    const description = "Optimis AI aus München implementiert KI-Chatbots, Voice Agents und Workflow-Automatisierungen – kostenlos testen, erst zahlen wenn Sie Ergebnisse sehen.";

    document.title = title;

    const updateMetaTag = (selector, content) => {
      const tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute("content", content);
      }
    };

    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="keywords"]', "KI Agentur München, KI Chatbot, Voice Agent, Workflow-Automatisierung, Optimis AI");
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

    const englishAlternate = document.querySelector('link[rel="alternate"][hreflang="en"]');
    if (englishAlternate) {
      englishAlternate.remove();
    }

    ensureAlternateLink("de", "https://www.optimis-ai.com/ki-beratung");
    ensureAlternateLink("x-default", "https://www.optimis-ai.com/ki-beratung");

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", "https://www.optimis-ai.com/ki-beratung");

    document.documentElement.lang = "de";
  }, [i18n]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await axios.post(FORMSPREE_URL, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        company: formData.company,
        interest: formData.interest,
        message: formData.message,
        source: "ki_beratung_landing_page",
        page: "/ki-beratung",
      });

      setIsSubmitted(true);

      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {"send_to": "AW-18065908893/CKLVCK7wpZYcEJ3Jv6ZD", "value": 1.0, "currency": "EUR"});
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        interest: "",
        message: "",
      });
    } catch (error) {
      setSubmitError("Das Senden hat gerade nicht funktioniert. Bitte versuchen Sie es erneut.");
      console.error("Error submitting KI-Beratung lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] relative">
      <div className="neural-bg" />

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-20 flex items-center">
            <div className="h-12 w-[170px] shrink-0 overflow-hidden lg:h-14 lg:w-[190px]" aria-label="Optimis AI">
              <img
                src={LOGO_URL}
                alt="Optimis AI"
                className="h-full w-full scale-[1.16] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="ki-beratung-hero relative min-h-screen flex items-center overflow-hidden pt-24">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale-0 brightness-[0.5] contrast-[1.1]"
            >
              <source src="https://cdn.builder.io/o/assets%2Fb6ada3fcbf6a4608a81d82bb64ba566b%2F94003049cb6e4893be80e7b11a27eaff?alt=media&token=a027c45d-0764-4ff9-b553-6af3339fa42f&apiKey=b6ada3fcbf6a4608a81d82bb64ba566b" type="video/mp4" />
            </video>
            <div className="absolute inset-0 ki-beratung-video-overlay" />
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="ki-beratung-orb ki-beratung-orb-primary" />
            <div className="ki-beratung-orb ki-beratung-orb-secondary" />
            <div className="ki-beratung-orb ki-beratung-orb-tertiary" />
            <div className="ki-beratung-grid-pattern" />
          </div>

          <div className="container-custom relative z-10 py-16">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 animate-fade-in-up">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm text-cyan-400 font-medium tracking-wide">KI-Agentur aus München</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-8 animate-fade-in-up">
                <span className="block text-white">KI, die wirklich in</span>
                <span className="block mt-2 gradient-text animate-gradient">Ihrem Unternehmen funktioniert</span>
              </h1>

              <p className="text-xl lg:text-2xl text-slate-300 mb-10 max-w-4xl mx-auto animate-fade-in-up font-light">
                Wir implementieren KI-Chatbots, Voice Agents und Workflow-Automatisierungen – kostenlos testen, erst zahlen wenn Sie Ergebnisse sehen.
              </p>

              <a
                href="#beratung-formular"
                className="btn-primary inline-flex items-center justify-center gap-2 text-base lg:text-lg px-10 py-4 animate-fade-in-up"
              >
                Kostenlose Beratung anfordern
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>

        <section className="section pt-0">
          <div className="container-custom">
            <div className="ki-beratung-trust-bar grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {trustItems.map((item) => (
                <div key={item.text} className="ki-beratung-trust-item">
                  <item.icon size={18} className="text-cyan-400 shrink-0" />
                  <span className="text-sm font-medium text-slate-200">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="ablauf">
          <div className="container-custom">
            <div className="max-w-3xl mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4">So funktioniert es</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Ein klarer Weg von der Idee bis zum messbaren Ergebnis</h2>
              <p className="text-lg text-slate-400">Sie starten ohne Risiko und entscheiden erst dann über die Zusammenarbeit, wenn der Pilot in Ihrem Unternehmen funktioniert.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, index) => (
                <article key={step.title} className="glass-card ki-beratung-step-card p-8">
                  <div className="ki-beratung-step-number">0{index + 1}</div>
                  <h3 className="text-2xl text-white mt-6 mb-2">{step.title}</h3>
                  <p className="text-cyan-400 font-medium mb-4">{step.detail}</p>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section pt-0" id="leistungen">
          <div className="container-custom">
            <div className="max-w-3xl mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4">Leistungen</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Drei Hebel, mit denen wir KI schnell in Ihr Unternehmen bringen</h2>
              <p className="text-lg text-slate-400">Wir setzen nur Lösungen um, die konkret zu Ihren Prozessen, Ihrem Team und Ihren Zielen passen.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="glass-card ki-beratung-service-card p-8">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                    <service.icon size={26} className="text-cyan-400" />
                  </div>
                  <h3 className="text-2xl text-white mb-4">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="beratung-formular">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4">Kostenlose Beratung</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Lassen Sie uns Ihren passenden KI-Pilot identifizieren</h2>
                <p className="text-lg text-slate-400 mb-8">Teilen Sie uns kurz mit, wofür Sie sich interessieren. Wir melden uns mit einem konkreten nächsten Schritt für Ihr Unternehmen.</p>

                <div className="glass-card p-6 md:p-8">
                  <h3 className="text-white text-xl mb-5">Was Sie im Erstgespräch bekommen</h3>
                  <ul className="space-y-4 text-slate-300">
                    <li className="flex gap-3">
                      <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-1" />
                      <span>Eine Einschätzung, welcher KI-Use-Case bei Ihnen am schnellsten echten Mehrwert bringt.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-1" />
                      <span>Eine realistische Empfehlung für Chatbot, Voice Agent oder Workflow-Automatisierung.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-1" />
                      <span>Klarheit darüber, wie ein kostenloser Pilot in Ihrem Unternehmen aussehen kann.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="glass-card ki-beratung-form-panel p-8 md:p-10">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="ki-beratung-input-label">Vorname</label>
                        <input
                          id="firstName"
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="input-dark"
                          placeholder="Max"
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="ki-beratung-input-label">Nachname</label>
                        <input
                          id="lastName"
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="input-dark"
                          placeholder="Mustermann"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="ki-beratung-input-label">E-Mail</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="input-dark"
                          placeholder="max@unternehmen.de"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="ki-beratung-input-label">Unternehmen</label>
                        <input
                          id="company"
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="input-dark"
                          placeholder="Beispiel GmbH"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="interest" className="ki-beratung-input-label">Was interessiert Sie?</label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        required
                        className="input-dark ki-beratung-select"
                      >
                        <option value="" disabled>Bitte auswählen</option>
                        {interestOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="ki-beratung-input-label">Weitere Informationen (optional)</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="input-dark resize-none"
                        placeholder="Worum geht es bei Ihrem Vorhaben?"
                      />
                    </div>

                    {submitError ? <p className="text-sm text-rose-400">{submitError}</p> : null}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full inline-flex items-center justify-center gap-2 text-base"
                    >
                      {isSubmitting ? "Wird gesendet..." : "Kostenlose Beratung anfordern"}
                    </button>
                  </form>
                ) : (
                  <div className="ki-beratung-success-card text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={30} className="text-cyan-400" />
                    </div>
                    <h3 className="text-3xl text-white mb-4">Vielen Dank für Ihre Anfrage.</h3>
                    <p className="text-lg text-slate-300 max-w-md mx-auto mb-4">Wir melden uns zeitnah bei Ihnen, um die nächsten sinnvollen Schritte für Ihren KI-Pilot zu besprechen.</p>
                    <p className="text-sm text-slate-500">Alternativ erreichen Sie uns direkt unter info@optimis-ai.com.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-[#020617]">
        <div className="container-custom py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Optimis AI</p>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="ki-beratung-footer-link">Impressum</Link>
            <Link to="/de/privacy-policy" className="ki-beratung-footer-link">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KiBeratungPage;
