const PricingSection = ({ onContactClick }) => {
  const plans = [
    {
      name: "Starter",
      price: "$69,99",
      period: "/month",
      description: "Perfect for small-scale businesses with up to 30 calls/day",
      features: [
        "800 minutes (0,10 €/min top-up)",
        "1 phone number",
        "1 user license",
        "Email support",
        "Monthly performance reports",
        "Standard analytics dashboard",
      ],
      popular: false,
    },
    {
      name: "Growth",
      price: "$249,99",
      period: "/month",
      description:
        "For growing businesses ready to scale their AI infrastructure with 30-150 calls/day",
      features: [
        "FREE customized AI Implementation Roadmap Plan",
        "3 phone numbers",
        "3 concurrent calls",
        "Priority support (24/7)",
        "Custom voice parameterisation",
        "Advanced analytics & reporting",
        "FREE Website Build and Optimisation",
        "Multi-Lingual Voice Assistant",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description:
        "Full-scale costumized AI voice agent setup (more than 100 calls/day) and further AI Automation Assistance",
      features: [
        "Custom minutes",
        "Unlimited phone numbers",
        "unlimited concurrent calls",
        "Priority support",
        "Custom voice parameterisation",
        "Advanced analytics & reporting",
        "FREE Website Build and Optimisation",
        "FREE customized AI Implementation Roadmap Plan",
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
          All plans include a 30-day money-back guarantee. Custom enterprise
          solutions available.
        </p>
      </div>
    </section>
  );
};
