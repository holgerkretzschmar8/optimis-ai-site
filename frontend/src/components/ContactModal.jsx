import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const FORMSPREE_URL = "https://formspree.io/f/mqedjvzr";

const ContactModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
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
      toast.success(t('contactModal.success'));
      setFormData({ name: "", email: "", phone: "", company: "", message: "", gdpr: false });
      onClose();
    } catch (error) {
      toast.error(t('contactModal.error') || t('common.errorOccurred'));
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-slate-950/95 border-white/10 backdrop-blur-xl p-0 overflow-hidden" data-testid="contact-modal">
        <div className="p-8">
          {/* Header */}
          <DialogHeader className="text-center mb-8">
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              {t('contactModal.title')}
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-sm">
              {t('contactModal.description')}
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">{t('contactModal.labels.name')}</label>
                <input
                  type="text"
                  name="name"
                  data-testid="contact-name-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-dark"
                  placeholder={t('contactModal.placeholders.name')}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">{t('contactModal.labels.email')}</label>
                <input
                  type="email"
                  name="email"
                  data-testid="contact-email-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-dark"
                  placeholder={t('contactModal.placeholders.email')}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">{t('contactModal.labels.phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  data-testid="contact-phone-input"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-dark"
                  placeholder={t('contactModal.placeholders.phone')}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">{t('contactModal.labels.company')}</label>
                <input
                  type="text"
                  name="company"
                  data-testid="contact-company-input"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-dark"
                  placeholder={t('contactModal.placeholders.company')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">{t('contactModal.labels.message')}</label>
              <textarea
                name="message"
                data-testid="contact-message-input"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="input-dark resize-none"
                placeholder={t('contactModal.placeholders.message')}
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
                {t('contactModal.gdpr')}{" "}
                <Link to="/privacy-policy" className="text-cyan-400 hover:underline" onClick={onClose}>
                  {t('common.privacyPolicy')}
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
                  {t('common.sending')}
                </>
              ) : (
                <>
                  <Send size={18} />
                  {t('contactModal.submit')}
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-slate-500 text-center mt-4">
            {t('contactModal.footer')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
