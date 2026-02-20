import { useState } from "react";
import { X, Gift, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const LeadPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${BACKEND_URL}/api/leads`, {
        name,
        email,
        source: "popup",
      });
      toast.success("Success! Check your email for your free AI assessment.");
      onClose();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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
            Get Your Free AI Assessment
          </h3>
          <p className="text-slate-400 text-sm">
            Discover how AI can automate your business and save 40%+ on operating costs.
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
                placeholder="Your Name"
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
                placeholder="Your Email"
              />
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
                  Sending...
                </>
              ) : (
                <>
                  Get Free Assessment
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
