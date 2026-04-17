import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_7f9de4cc-23e2-4dee-b34f-6c95288f12e2/artifacts/5siww960_Screenshot%202026-02-17%20at%2022.30.43.png";
const VOXALIO_URL = "https://voxalio.de/";

const Footer = ({ onContactClick }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const sectionBasePath = location.pathname.startsWith("/en") ? "/en" : "";

  const links = {
    services: [
      { label: t('services.items.chatbots.title'), href: `${sectionBasePath}/#services` },
      { label: t('services.items.voice.title'), href: VOXALIO_URL, external: true },
      { label: t('services.items.workflow.title'), href: `${sectionBasePath}/#services` },
    ],
    company: [
      { label: t('nav.howItWorks'), href: `${sectionBasePath}/#how-it-works` },
      { label: t('nav.whyUs'), href: `${sectionBasePath}/#why-us` },
      { label: t('common.bookCall'), onClick: onContactClick },
    ],
    support: [
      { label: t('common.contact'), onClick: onContactClick },
      { label: t('common.privacyPolicy'), href: "/privacy-policy", isInternal: true },
      { label: t('common.termsOfService'), href: "/terms-of-service", isInternal: true },
    ],
  };

  return (
    <footer data-testid="footer" className="bg-[#020617] border-t border-white/5">
      <div className="container-custom pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <img
              src={LOGO_URL}
              alt="Optimis AI"
              className="h-10 w-auto mb-8"
            />
            <p className="text-slate-400 text-sm mb-8 max-w-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="space-y-4">
              <a href="mailto:info@optimis-ai.com" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center group-hover:bg-slate-700/50 transition-colors">
                  <Mail size={14} />
                </div>
                info@optimis-ai.com
              </a>
              <a href="tel:+4915757111880" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center group-hover:bg-slate-700/50 transition-colors">
                  <Phone size={14} />
                </div>
                +49 157 57111880
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                {t('footer.location')}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">{t('footer.servicesTitle')}</h4>
              <ul className="space-y-4">
                {links.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">{t('footer.companyTitle')}</h4>
              <ul className="space-y-4">
                {links.company.map((link) => (
                  <li key={link.label}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">{t('footer.supportTitle')}</h4>
              <ul className="space-y-4">
                {links.support.map((link) => (
                  <li key={link.label}>
                    {link.isInternal ? (
                      <Link
                        to={link.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              data-testid="social-linkedin"
              className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              data-testid="social-twitter"
              className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
