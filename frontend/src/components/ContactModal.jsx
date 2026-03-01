import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const FORMSPREE_URL = "https://formspree.io/f/mqedjvzr";

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    gdpr: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(FORMSPREE_URL, {
        ...formData,
        source: "contact_modal",
      });
      toast.success("Vielen Dank! Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      onClose();
    } catch (error) {
      toast.error("Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.");
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid="contact-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        data-testid="contact-modal"
        className="popup-enter relative w-full max-w-lg glass-card p-8 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          data-testid="contact-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">
            Book Your Free Strategy Call
          </h3>
          <p className="text-slate-400 text-sm">
            Fill out the form below and we'll contact you within 24 hours.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                data-testid="contact-name-input"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-dark"
                placeholder="Max Mustermann"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                data-testid="contact-email-input"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-dark"
                placeholder="max@mustermann.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                data-testid="contact-phone-input"
                value={formData.phone}
                onChange={handleChange}
                className="input-dark"
                placeholder="+49 123 4567890"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Company</label>
              <input
                type="text"
                name="company"
                data-testid="contact-company-input"
                value={formData.company}
                onChange={handleChange}
                className="input-dark"
                placeholder="Muster GmbH"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Message *</label>
            <textarea
              name="message"
              data-testid="contact-message-input"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="input-dark resize-none"
              placeholder="Erzählen Sie uns von Ihrem Unternehmen und was Sie mit KI erreichen wollen..."
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="gdpr"
              id="gdpr"
              checked={formData.gdpr}
              onChange={handleChange}
              required
              className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/20"
            />
            <label htmlFor="gdpr" className="text-xs text-slate-400 leading-tight">
              Ich stimme zu, dass meine Angaben aus dem Kontaktformular zur Beantwortung meiner Anfrage erhoben und verarbeitet werden. Die Daten werden nach abgeschlossener Bearbeitung Ihrer Anfrage gelöscht. Hinweis: Sie können Ihre Einwilligung jederzeit für die Zukunft per E-Mail an info@optimis-ai.com widerrufen. Detaillierte Informationen zum Umgang mit Nutzerdaten finden Sie in unserer{" "}
              <Link to="/privacy-policy" className="text-cyan-400 hover:underline" onClick={onClose}>
                Datenschutzerklärung
              </Link>.
            </label>
          </div>

          <button
            type="submit"
            data-testid="contact-submit-button"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Wird gesendet...
              </>
            ) : (
              <>
                <Send size={18} />
                Book My Strategy Call
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center mt-4">
          By submitting, you agree to our Privacy Policy and Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default ContactModal;
