import { useState } from "react";
import { X, Gift, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const FORMSPREE_URL = "https://formspree.io/f/mqedjvzr";

const LeadPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gdpr) {
      toast.error("Bitte akzeptieren Sie die Datenschutzbestimmungen.");
      return;
    }
    setIsSubmitting(true);

    try {
      await axios.post(FORMSPREE_URL, {
        name,
        email,
        source: "popup",
      });
      toast.success("Vielen Dank! Wir haben Ihre Anfrage erhalten.");
      onClose();
    } catch (error) {
      toast.error("Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.");
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      data-testid="lead-popup-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Popup */}
      <div
        data-testid="lead-popup"
        className="popup-enter relative w-full max-w-md glass-card overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          data-testid="lead-popup-close"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Gradient Header */}
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
            <Gift size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Get Your Free AI Voice Agent Demo
          </h3>
          <p className="text-slate-400 text-sm">
            Discover how AI can automate your business and save on operating costs.
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
                placeholder="Max Mustermann"
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
                placeholder="max@mustermann.com"
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
                Ich stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage erhoben werden. Informationen finden Sie in der{" "}
                <Link to="/privacy-policy" className="text-cyan-400 hover:underline" onClick={onClose}>
                  Datenschutzerklärung
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
                  Wird gesendet...
                </>
              ) : (
                <>
                  Get Free Demo
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-slate-500 text-center mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadPopup;
