import { useState } from "react";
import { Gift, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const FORMSPREE_URL = "https://formspree.io/f/mqedjvzr";

const LeadPopup = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gdpr) {
      toast.error(t('common.errorOccurred'));
      return;
    }
    setIsSubmitting(true);

    try {
      await axios.post(FORMSPREE_URL, {
        name,
        email,
        source: "popup",
      });
      toast.success(t('leadPopup.success') || t('common.vielenDank'));
      onClose();
    } catch (error) {
      toast.error(t('common.errorOccurred'));
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-md bg-slate-950/95 border-white/10 backdrop-blur-xl p-0 overflow-hidden" 
        data-testid="lead-popup"
      >
        {/* Gradient Header */}
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-8 text-center relative">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Gift size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {t('leadPopup.title')}
          </h3>
          <p className="text-slate-400 text-sm">
            {t('leadPopup.description')}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                data-testid="popup-name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-dark"
                placeholder={t('contactModal.placeholders.name')}
              />
            </div>
            <div>
              <input
                type="email"
                data-testid="popup-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-dark"
                placeholder={t('contactModal.placeholders.email')}
              />
            </div>

            <div className="flex items-start gap-3 mt-4">
              <input
                type="checkbox"
                id="gdpr-popup"
                checked={gdpr}
                onChange={(e) => setGdpr(e.target.checked)}
                required
                className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/20"
              />
              <label htmlFor="gdpr-popup" className="text-[10px] text-slate-400 leading-tight">
                {t('leadPopup.gdpr')}{" "}
                <Link to="/privacy-policy" className="text-cyan-400 hover:underline" onClick={onClose}>
                  {t('common.privacyPolicy')}
                </Link>.
              </label>
            </div>

            <button
              type="submit"
              data-testid="popup-submit-button"
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
                  {t('leadPopup.submit')}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-slate-500 text-center mt-4">
            {t('common.noSpam')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadPopup;
