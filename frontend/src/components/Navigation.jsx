import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_7f9de4cc-23e2-4dee-b34f-6c95288f12e2/artifacts/5siww960_Screenshot%202026-02-17%20at%2022.30.43.png";

const Navigation = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "/#services" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Industries", href: "/#industries" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
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
          {/* Logo */}
          <Link to="/" data-testid="logo" className="flex items-center">
            <img
              src={LOGO_URL}
              alt="Optimis AI"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
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

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              data-testid="nav-cta-button"
              onClick={onContactClick}
              className="btn-primary text-sm"
            >
              Book Strategy Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
              Book Strategy Call
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
