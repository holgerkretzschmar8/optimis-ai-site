import { Check, ArrowRight } from "lucide-react";

const PricingSection = ({ onContactClick }) => {
  const plans = [
    {
      name: "Solo",
      price: "99 €",
      period: "/month",
      description: "Suitable for 1–20 calls/day",
      features: [
        "1000 minutes (€0.15 per additional)",
        "No parallel calls",
        "1 phone number (€7/mo additional)",
        "Unlimited assistants",
        "1 user",
        "20+ voices",
        "25+ languages",
        "Guided onboarding (4 hrs)",
      ],
      popular: false,
    },
    {
      name: "Team",
      price: "299 €",
      period: "/month",
      description: "Suitable for 20–100 calls/day",
      features: [
        "3000 minutes (€0.12 per additional)",
        "5 concurrent calls",
        "3 phone numbers (€5/mo additional)",
        "Unlimited assistants",
        "Unlimited users",
        "Everything in Solo",
        "Connect own SIP",
        "Outbound calls",
      ],
      popular: true,
    },
    {
      name: "Business",
      price: "Custom",
      period: "",
      description: "Suitable from 100+ calls/day",
      features: [
        "Custom minutes",
        "Custom concurrent calls",
        "Custom phone numbers",
        "Unlimited assistants",
        "Unlimited users",
        "Everything in Team",
        "Custom voice",
        "Single Sign-On (SSO)",
        "Custom SLA",
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
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider text-sm">
            Pricing Plans
          </p>

          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Invest in <span className="gradient-text">Your Growth</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            Transparent pricing with no hidden fees. Choose the plan that fits
            your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card p-8 relative ${
                plan.popular ? "pricing-popular lg:scale-105" : ""
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-slate-500">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                      <Check size={12} className="text-cyan-400" />
                    </div>
                    <span className="text-sm text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onContactClick}
                className={`w-full py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  plan.popular ? "btn-primary" : "btn-secondary"
                }`}
              >
                Get Started
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          All plans include a 14-day money-back guarantee. Custom enterprise
          solutions available.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;