import { Check, ArrowRight } from "lucide-react";

const PricingSection = ({ onContactClick }) => {
  const plans = [
    {
      name: "Starter",
      price: "$2,997",
      period: "/month",
      description: "Perfect for small businesses starting with AI automation.",
      features: [
        "1 AI Voice Agent OR Chatbot",
        "Up to 500 conversations/month",
        "Basic CRM integration",
        "Email support",
        "Monthly performance reports",
        "Standard analytics dashboard",
      ],
      popular: false,
    },
    {
      name: "Growth",
      price: "$5,997",
      period: "/month",
      description: "For growing businesses ready to scale their AI operations.",
      features: [
        "2 AI Voice Agents + Chatbot",
        "Up to 2,000 conversations/month",
        "Advanced CRM integrations",
        "Priority support (24/7)",
        "Weekly optimization calls",
        "Advanced analytics & reporting",
        "Custom workflow automation",
        "A/B testing & optimization",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Full-scale AI infrastructure for enterprise operations.",
      features: [
        "Unlimited AI agents",
        "Unlimited conversations",
        "Custom AI model training",
        "Dedicated success manager",
        "24/7 priority support",
        "Custom integrations",
        "White-label options",
        "SLA guarantees",
        "On-premise deployment options",
      ],
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="section bg-[#0f172a]/30"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider text-sm">
            Pricing Plans
          </p>
          <h2
            data-testid="pricing-title"
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            Invest in{" "}
            <span className="gradient-text">Your Growth</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            Transparent pricing with no hidden fees. Choose the plan that fits your business needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              data-testid={`pricing-card-${index}`}
              className={`glass-card p-8 relative ${
                plan.popular ? "pricing-popular lg:scale-105" : ""
              }`}
            >
              {/* Plan Name */}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-500">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-cyan-400" />
                    </div>
                    <span className="text-sm text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                data-testid={`pricing-cta-${index}`}
                onClick={onContactClick}
                className={`w-full py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  plan.popular
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                Get Started
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-slate-500 mt-8">
          All plans include a 14-day money-back guarantee. Custom enterprise solutions available.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
