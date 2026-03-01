import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_7f9de4cc-23e2-4dee-b34f-6c95288f12e2/artifacts/5siww960_Screenshot%202026-02-17%20at%2022.30.43.png";

const Footer = ({ onContactClick }) => {
  const links = {
    services: [
      { label: "AI Voice Agents", href: "/#services" },
      { label: "AI Chatbots", href: "/#services" },
      { label: "Appointment Setters", href: "/#services" },
      { label: "Workflow Automation", href: "/#services" },
      { label: "Custom AI Systems", href: "/#services" },
    ],
    company: [
      { label: "About Us", href: "/#" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
    support: [
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", onClick: onContactClick },
      { label: "Privacy Policy", href: "/privacy-policy", isInternal: true },
      { label: "Terms of Service", href: "/terms-of-service", isInternal: true },
    ],
  };

  return (
    <footer
      data-testid="footer"
      className="bg-[#0f172a]/50 border-t border-white/5"
    >
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src={LOGO_URL}
              alt="Optimis AI"
              className="h-10 w-auto mb-6"
            />
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              Advanced AI automation systems that optimize revenue and efficiency for modern businesses.
            </p>
            <div className="space-y-3">
              <a href="mailto:info@optimis-ai.com" className="flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                <Mail size={16} />
                info@optimis-ai.com
              </a>
              <a href="tel:+4915757111880" className="flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                <Phone size={16} />
                +49 157 57111880
              </a>
              <p className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin size={16} />
                Munich, Germany
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.label}>
                  {link.isInternal ? (
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Optimis AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              data-testid="social-linkedin"
              className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              data-testid="social-twitter"
              className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all"
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
