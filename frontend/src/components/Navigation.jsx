import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_7f9de4cc-23e2-4dee-b34f-6c95288f12e2/artifacts/5siww960_Screenshot%202026-02-17%20at%2022.30.43.png";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const nextLang = currentLang === "en" ? "de" : "en";
    let nextPath = location.pathname;

    if (nextLang === "de") {
      if (!nextPath.startsWith("/de")) {
        nextPath = `/de${nextPath === "/" ? "" : nextPath}`;
      }
    } else if (nextPath.startsWith("/de")) {
      nextPath = nextPath.replace(/^\/de/, "") || "/";
    }

    i18n.changeLanguage(nextLang);
    navigate(nextPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/10 hover:border-cyan-500/50 transition-all group"
      aria-label="Toggle Language"
    >
      <img
        src={currentLang === "en" ? "https://flagcdn.com/w20/us.png" : "https://flagcdn.com/w20/de.png"}
        alt={currentLang.toUpperCase()}
        className="w-5 h-auto rounded-sm object-cover"
      />
      <span className="text-xs font-bold text-slate-300 group-hover:text-white uppercase">
        {currentLang}
      </span>
    </button>
  );
};

const Navigation = ({ onContactClick }) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const homePath = location.pathname.startsWith("/de") ? "/de" : "/";
  const sectionBasePath = homePath === "/de" ? "/de" : "";

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === homePath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(homePath);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.services'), href: `${sectionBasePath}/#services` },
    { label: t('nav.howItWorks'), href: `${sectionBasePath}/#how-it-works` },
    { label: t('nav.whyUs'), href: `${sectionBasePath}/#why-us` },
  ];

  return (
    <nav
      data-testid="navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#020617]/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link
            to={homePath}
            onClick={handleLogoClick}
            data-testid="logo"
            className="flex items-center"
          >
            <div className="h-12 w-[170px] shrink-0 overflow-hidden lg:h-14 lg:w-[190px]">
              <img
                src={LOGO_URL}
                alt="Optimis AI"
                className="h-full w-full scale-[1.16] object-cover object-center"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                className="nav-link text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <LanguageToggle />
            <button
              data-testid="nav-cta-button"
              onClick={onContactClick}
              className="btn-primary text-sm"
            >
              {t('common.bookCall')}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <LanguageToggle />
            <button
              data-testid="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden mobile-menu-overlay bg-[#020617]/95 border-t border-white/10"
        >
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium text-slate-300 hover:text-white transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <button
              data-testid="mobile-cta-button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onContactClick();
              }}
              className="btn-primary w-full text-center mt-4"
            >
              {t('common.bookCall')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
