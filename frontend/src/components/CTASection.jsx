import { ArrowRight, Calendar, Sparkles } from "lucide-react";

const CTASection = ({ onContactClick }) => {
  return (
    <section
      data-testid="cta-section"
      className="section"
    >
      <div className="container-custom">
        <div className="cta-gradient glass-card rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Limited Spots Available</span>
            </div>

            {/* Headline */}
            <h2
              data-testid="cta-headline"
              className="text-3xl lg:text-5xl font-bold mb-6"
            >
              Ready to Optimize Your{" "}
              <span className="gradient-text">Revenue With AI?</span>
            </h2>

            <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-base lg:text-lg">
              Join the businesses that are already using AI to scale faster, reduce costs, and close more deals.
            </p>

            {/* CTA Button */}
            <button
              data-testid="final-cta-button"
              onClick={onContactClick}
              className="btn-primary text-base lg:text-lg px-10 py-4 inline-flex items-center gap-3"
            >
              <Calendar size={20} />
              Book Your Free Voice-Agent Demo
              <ArrowRight size={20} />
            </button>

            {/* Urgency Text */}
            <p className="text-sm text-slate-500 mt-6">
              Limited onboarding slots available monthly. Secure your spot today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
