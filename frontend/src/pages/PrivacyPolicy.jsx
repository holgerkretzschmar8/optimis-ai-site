import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const title = `${t('common.privacyPolicy')} | Optimis AI`;
    document.title = title;

    const updateMetaTag = (selector, content) => {
      const tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute('content', content);
      }
    };

    updateMetaTag('meta[name="description"]', t('common.privacyPolicyDescription'));
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', t('common.privacyPolicyDescription'));
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', t('common.privacyPolicyDescription'));

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

    updateLinkTag('link[hreflang="de"]', 'href', 'https://www.optimis-ai.com/privacy-policy');
    updateLinkTag('link[hreflang="en"]', 'href', 'https://www.optimis-ai.com/en/privacy-policy');
    updateLinkTag('link[hreflang="x-default"]', 'href', 'https://www.optimis-ai.com/privacy-policy');

    // Update Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    const canonicalUrl = i18n.language === 'en'
      ? 'https://www.optimis-ai.com/en/privacy-policy'
      : 'https://www.optimis-ai.com/privacy-policy';
    canonicalTag.setAttribute('href', canonicalUrl);

    document.documentElement.lang = i18n.language;
  }, [i18n.language, t, i18n]);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  const isDe = i18n.language === 'de';

  return (
    <div className="min-h-screen bg-[#020617] relative flex flex-col">
      <div className="neural-bg" />
      
      <Navigation onContactClick={openContact} />
      
      <main className="flex-grow pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 gradient-text text-center lg:text-left">
            {isDe ? 'Datenschutzerklärung' : 'PRIVACY POLICY'}
          </h1>
          <p className="text-slate-400 mb-8 text-center lg:text-left">
            {isDe ? 'Stand: 28.02.2026' : 'Effective Date: 28.02.2026'}
          </p>
          
          <div className="space-y-12 text-slate-300">
            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '1. Informationen zum Verantwortlichen (Art. 13 DSGVO)' : '1. Controller Information (Art. 13 GDPR)'}
              </h2>
              <div className="space-y-2">
                <p>{isDe ? 'Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO):' : 'Controller within the meaning of the General Data Protection Regulation (GDPR):'}</p>
                <div className="bg-white/5 p-4 rounded-xl mt-2">
                  <p className="text-white font-bold">Optimis AI</p>
                  <p>{isDe ? 'Geschäftsführer: Holger Kretzschmar' : 'Managing Director: Holger Kretzschmar'}</p>
                  <p>Fichtenstr. 6</p>
                  <p>82178 Puchheim</p>
                  <p>{isDe ? 'Deutschland' : 'Germany'}</p>
                  <p className="mt-2">Email: info@optimis-ai.com</p>
                  <p>Phone: +49 157 57111880</p>
                </div>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '2. Allgemeine Informationen zur Datenverarbeitung' : '2. General Information on Data Processing'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Wir verarbeiten personenbezogene Daten gemäß:' : 'We process personal data in accordance with:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Verordnung (EU) 2016/679 (Datenschutz-Grundverordnung – DSGVO)' : 'Regulation (EU) 2016/679 (General Data Protection Regulation – GDPR)'}</li>
                  <li>{isDe ? 'Bundesdatenschutzgesetz (BDSG)' : 'German Federal Data Protection Act (BDSG)'}</li>
                  <li>{isDe ? 'Geltende Telekommunikations- und Digitale-Dienste-Gesetze' : 'Applicable telecommunications and digital services laws'}</li>
                </ul>
                <p>{isDe ? 'Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.' : 'Personal data means any information relating to an identified or identifiable natural person.'}</p>
                <p>{isDe ? 'Wir verarbeiten personenbezogene Daten nur in dem Umfang, der für die Bereitstellung unserer Dienste, den Betrieb unserer Website und die Erfüllung vertraglicher Pflichten erforderlich ist.' : 'We process personal data only to the extent necessary to provide our services, operate our website, and fulfill contractual obligations.'}</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '3. Datenerfassung beim Besuch unserer Website' : '3. Data Collected When Visiting Our Website'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Beim Besuch unserer Website erfasst unser Hosting-Anbieter automatisch:' : 'When you visit our website, our hosting provider automatically collects:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'IP-Adresse' : 'IP address'}</li>
                  <li>{isDe ? 'Datum und Uhrzeit des Zugriffs' : 'Date and time of access'}</li>
                  <li>{isDe ? 'Browsertyp und -version' : 'Browser type and version'}</li>
                  <li>{isDe ? 'Betriebssystem' : 'Operating system'}</li>
                  <li>{isDe ? 'Referrer-URL' : 'Referrer URL'}</li>
                  <li>{isDe ? 'Besuchte Seiten' : 'Accessed pages'}</li>
                </ul>
                <p><strong>{isDe ? 'Rechtsgrundlage:' : 'Legal basis:'}</strong></p>
                <p>{isDe ? 'Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und stabilen Betrieb der Website).' : 'Art. 6(1)(f) GDPR (legitimate interest in secure and stable operation of the website).'}</p>
                <p>{isDe ? 'Logdateien werden aus Sicherheitsgründen gespeichert und automatisch gelöscht.' : 'Log files are stored for security reasons and automatically deleted.'}</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '4. Kontaktformulare und E-Mail-Kommunikation' : '4. Contact Forms and Email Communication'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Bei Kontaktaufnahme per Formular oder E-Mail verarbeiten wir:' : 'If you contact us via contact form or email, we process:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Name' : 'Name'}</li>
                  <li>{isDe ? 'E-Mail-Adresse' : 'Email address'}</li>
                  <li>{isDe ? 'Firmenname (falls angegeben)' : 'Company name (if provided)'}</li>
                  <li>{isDe ? 'Nachrichteninhalt' : 'Message content'}</li>
                </ul>
                <p><strong>{isDe ? 'Rechtsgrundlage:' : 'Legal basis:'}</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)' : 'Art. 6(1)(b) GDPR (pre-contractual measures)'}</li>
                  <li>{isDe ? 'Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Kommunikation)' : 'Art. 6(1)(f) GDPR (legitimate interest in communication)'}</li>
                </ul>
                <p>{isDe ? 'Daten werden gelöscht, sobald die Anfrage geklärt ist, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.' : 'Data is deleted once the request is resolved unless statutory retention obligations apply.'}</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '5. Verarbeitung von Kundendaten (KI-Dienste)' : '5. Processing of Client Data (AI Services)'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Bei der Bereitstellung von KI-Voice-Agents, Chatbots oder Automatisierungsdiensten verarbeiten wir möglicherweise personenbezogene Daten im Auftrag unserer Kunden.' : 'When providing AI voice agents, chatbots, or automation services, we may process personal data on behalf of our clients.'}</p>
                <p>{isDe ? 'Dies kann umfassen:' : 'This may include:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Anrufaufzeichnungen' : 'Call recordings'}</li>
                  <li>{isDe ? 'Sprachdaten' : 'Voice data'}</li>
                  <li>{isDe ? 'Transkripte' : 'Transcripts'}</li>
                  <li>{isDe ? 'Kundennamen und Kontaktdaten' : 'Customer names and contact details'}</li>
                  <li>{isDe ? 'CRM-Daten' : 'CRM data'}</li>
                  <li>{isDe ? 'Supportanfragen' : 'Support inquiries'}</li>
                </ul>
                <p>{isDe ? 'In diesen Fällen:' : 'In such cases:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Ist der Kunde der Verantwortliche' : 'The client is the data controller'}</li>
                  <li>{isDe ? 'Agieren wir als Auftragsverarbeiter gemäß Art. 28 DSGVO' : 'We act as data processor under Art. 28 GDPR'}</li>
                  <li>{isDe ? 'Wird ein separater Auftragsverarbeitungsvertrag (AVV) geschlossen' : 'A separate Data Processing Agreement (DPA) is concluded'}</li>
                </ul>
                <p>{isDe ? 'Wir verarbeiten Daten ausschließlich nach dokumentierten Anweisungen des Kunden.' : 'We process data exclusively according to documented client instructions.'}</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '6. Einsatz von KI-Systemen' : '6. Use of AI Systems'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Unsere Dienste können KI-Systeme umfassen, die Eingabedaten verarbeiten, um automatisierte Antworten zu generieren.' : 'Our services may involve AI systems that process input data to generate automated responses.'}</p>
                <p>{isDe ? 'KI-Verarbeitung kann umfassen:' : 'AI processing may include:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Verarbeitung natürlicher Sprache' : 'Natural language processing'}</li>
                  <li>{isDe ? 'Spracherkennung' : 'Voice recognition'}</li>
                  <li>{isDe ? 'Text-zu-Sprache-Generierung' : 'Text-to-speech generation'}</li>
                  <li>{isDe ? 'Automatisierte Workflow-Ausführung' : 'Automated workflow execution'}</li>
                </ul>
                <p>{isDe ? 'KI-Ausgaben werden automatisch generiert und erfordern möglicherweise menschliche Aufsicht.' : 'AI outputs are generated automatically and may require human oversight.'}</p>
                <p><strong>{isDe ? 'Rechtsgrundlage:' : 'Legal basis:'}</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)' : 'Art. 6(1)(b) GDPR (contract performance)'}</li>
                  <li>{isDe ? 'Art. 6 Abs. 1 lit. f DSGVO (berechtigte Geschäftsinteressen)' : 'Art. 6(1)(f) GDPR (legitimate business interests)'}</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '7. Einsatz von Drittanbietern' : '7. Use of Third-Party Service Providers'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Wir nutzen Drittanbieter für:' : 'We use third-party service providers for:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Hosting-Dienste' : 'Hosting services'}</li>
                  <li>{isDe ? 'Cloud-Infrastruktur' : 'Cloud infrastructure'}</li>
                  <li>{isDe ? 'KI-Modell-Anbieter' : 'AI model providers'}</li>
                  <li>{isDe ? 'Telekommunikationsdienste' : 'Telecommunication services'}</li>
                  <li>{isDe ? 'E-Mail-Dienste' : 'Email services'}</li>
                </ul>
                <p>{isDe ? 'Diese Anbieter können personenbezogene Daten in unserem Auftrag verarbeiten.' : 'These providers may process personal data on our behalf.'}</p>
                <p>{isDe ? 'Sofern erforderlich:' : 'Where required:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Werden Auftragsverarbeitungsverträge geschlossen' : 'Data Processing Agreements are concluded'}</li>
                  <li>{isDe ? 'Werden Datentransfers außerhalb der EU durch Standardvertragsklauseln (Art. 46 DSGVO) abgesichert' : 'Data transfers outside the EU are safeguarded by Standard Contractual Clauses (Art. 46 GDPR)'}</li>
                </ul>
                <p>{isDe ? 'Eine Liste der Unterauftragsverarbeiter kann auf Anfrage zur Verfügung gestellt werden.' : 'A list of subprocessors can be provided upon request.'}</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '8. Cookies und Tracking-Technologien' : '8. Cookies and Tracking Technologies'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Unsere Website kann Cookies und ähnliche Technologien verwenden.' : 'Our website may use cookies and similar technologies.'}</p>
                <p>{isDe ? 'Kategorien:' : 'Categories:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Essenzielle Cookies (erforderlich für den Betrieb)' : 'Essential cookies (necessary for operation)'}</li>
                  <li>{isDe ? 'Analyse-Cookies (nur mit Einwilligung)' : 'Analytics cookies (only with consent)'}</li>
                  <li>{isDe ? 'Marketing-Cookies (nur mit Einwilligung)' : 'Marketing cookies (only with consent)'}</li>
                </ul>
                <p><strong>{isDe ? 'Rechtsgrundlage:' : 'Legal basis:'}</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? '§ 25 TTDSG (Telekommunikation-Telemedien-Datenschutz-Gesetz)' : '§ 25 TTDSG (German Telecommunications-Telemedia Data Protection Act)'}</li>
                  <li>{isDe ? 'Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)' : 'Art. 6(1)(a) GDPR (consent)'}</li>
                </ul>
                <p>{isDe ? 'Nutzer können die Einwilligung jederzeit über den Cookie-Banner widerrufen.' : 'Users may withdraw consent at any time via the cookie banner.'}</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '9. Datenspeicherung' : '9. Data Retention'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Wir speichern personenbezogene Daten nur so lange wie nötig für:' : 'We store personal data only as long as necessary for:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Vertragserfüllung' : 'Contract fulfillment'}</li>
                  <li>{isDe ? 'Gesetzliche Aufbewahrungspflichten' : 'Legal retention obligations'}</li>
                  <li>{isDe ? 'Berechtigte Geschäftszwecke' : 'Legitimate business purposes'}</li>
                </ul>
                <p>{isDe ? 'Gesetzliche Aufbewahrungsfristen (z. B. Handels- und Steuerrecht) können eine Speicherung von bis zu 10 Jahren erfordern.' : 'Statutory retention periods (e.g., commercial and tax law) may require storage for up to 10 years.'}</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '10. Datentransfers außerhalb der EU' : '10. Data Transfers Outside the EU'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Falls personenbezogene Daten in Länder außerhalb der EU/des EWR übertragen werden, geschieht dies nur, wenn:' : 'If personal data is transferred to countries outside the EU/EEA, this is done only if:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Ein Angemessenheitsbeschluss vorliegt (Art. 45 DSGVO), oder' : 'An adequacy decision exists (Art. 45 GDPR), or'}</li>
                  <li>{isDe ? 'Standardvertragsklauseln implementiert sind (Art. 46 DSGVO)' : 'Standard Contractual Clauses are implemented (Art. 46 GDPR)'}</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '11. Betroffenenrechte (Art. 15–22 DSGVO)' : '11. Data Subject Rights (Art. 15–22 GDPR)'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Einzelpersonen haben das Recht auf:' : 'Individuals have the right to:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Auskunft (Art. 15 DSGVO)' : 'Access their data (Art. 15 GDPR)'}</li>
                  <li>{isDe ? 'Berichtigung (Art. 16 DSGVO)' : 'Rectification (Art. 16 GDPR)'}</li>
                  <li>{isDe ? 'Löschung (Art. 17 DSGVO)' : 'Erasure (Art. 17 GDPR)'}</li>
                  <li>{isDe ? 'Einschränkung der Verarbeitung (Art. 18 DSGVO)' : 'Restriction of processing (Art. 18 GDPR)'}</li>
                  <li>{isDe ? 'Datenübertragbarkeit (Art. 20 DSGVO)' : 'Data portability (Art. 20 GDPR)'}</li>
                  <li>{isDe ? 'Widerspruch (Art. 21 DSGVO)' : 'Object to processing (Art. 21 GDPR)'}</li>
                </ul>
                <p>{isDe ? 'Beruht die Verarbeitung auf einer Einwilligung, kann diese jederzeit widerrufen werden.' : 'Where processing is based on consent, consent may be withdrawn at any time.'}</p>
                <p>{isDe ? 'Anfragen können gesendet werden an: info@optimis-ai.com' : 'Requests can be sent to: info@optimis-ai.com'}</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '12. Beschwerderecht' : '12. Right to Lodge a Complaint'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Sie haben das Recht, eine Beschwerde bei einer Aufsichtsbehörde einzureichen.' : 'You have the right to lodge a complaint with a supervisory authority.'}</p>
                <p>{isDe ? 'Für Deutschland ist die zuständige Behörde im Regelfall: Die Datenschutzbehörde Ihres Bundeslandes.' : 'For Germany, the competent authority is generally: The data protection authority of your federal state (Bundesland).'}</p>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '13. Datensicherheit' : '13. Data Security'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Wir implementieren angemessene technische und organisatorische Maßnahmen (TOMs) gemäß Art. 32 DSGVO, einschließlich:' : 'We implement appropriate technical and organizational measures (TOMs) in accordance with Art. 32 GDPR, including:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isDe ? 'Verschlüsselung' : 'Encryption'}</li>
                  <li>{isDe ? 'Zugangskontrollen' : 'Access controls'}</li>
                  <li>{isDe ? 'Rollenbasierte Berechtigungen' : 'Role-based permissions'}</li>
                  <li>{isDe ? 'Sichere Hosting-Infrastruktur' : 'Secure hosting infrastructure'}</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-white/5 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '14. Automatisierte Entscheidungsfindung' : '14. Automated Decision-Making'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Sofern nicht ausdrücklich in einer separaten Vereinbarung angegeben, führen wir keine vollautomatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO durch, die rechtliche Wirkungen entfaltet.' : 'Unless explicitly stated in a separate agreement, we do not conduct fully automated decision-making within the meaning of Art. 22 GDPR that produces legal effects.'}</p>
              </div>
            </section>

            <section className="pb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {isDe ? '15. Änderungen dieser Datenschutzerklärung' : '15. Changes to This Privacy Policy'}
              </h2>
              <div className="space-y-4">
                <p>{isDe ? 'Wir behalten uns das Recht vor, diese Datenschutzerklärung zu aktualisieren, um rechtliche oder technische Änderungen abzubilden.' : 'We reserve the right to update this Privacy Policy to reflect legal or technical changes.'}</p>
              </div>
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
