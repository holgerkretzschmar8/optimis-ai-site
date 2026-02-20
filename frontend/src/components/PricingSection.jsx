import { useState } from "react";
import { Check, X, Info } from "lucide-react";

const PricingSection = ({ onContactClick }) => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Solo",
      description: "Geeignet für 1-20 Anrufe/Tag",
      price: isYearly ? "84" : "99",
      period: "/ Monat",
      cta: "Jetzt starten",
      popular: false,
      included: [
        { text: "1000 Minuten", subtext: "jede weitere €0,15" },
        { text: "keine Parallelanrufe", disabled: true },
        { text: "1 Telefonnr.", subtext: "jede weitere €7/Monat" },
        { text: "∞ Assistenten" },
        { text: "1 User" },
      ],
      features: [
        "20+ Stimmen",
        "25+ Sprachen",
        "Begleiteter Einstieg (4 Std.)",
      ],
    },
    {
      name: "Team",
      description: "Geeignet für 20-100 Anrufe/Tag",
      price: isYearly ? "254" : "299",
      period: "/ Monat",
      cta: "Jetzt starten",
      popular: true,
      included: [
        { text: "3000 Minuten", subtext: "jede weitere €0,12" },
        { text: "5 gleichz. Anrufe" },
        { text: "3 Telefonnr.", subtext: "jede weitere €5/Monat" },
        { text: "∞ Assistenten" },
        { text: "∞ User" },
      ],
      features: [
        "Alles in Solo",
        "Eigener SIP Trunk",
        "Outbound Anrufe",
      ],
    },
    {
      name: "Business",
      description: "Geeignet ab 100 Anrufe/Tag",
      price: "individuell",
      period: "",
      cta: "Demo buchen",
      popular: false,
      included: [
        { text: "Individuell Minuten" },
        { text: "Individuell gleichz. Anrufe" },
        { text: "Individuell Telefonnr." },
        { text: "∞ Assistenten" },
        { text: "∞ User" },
      ],
      features: [
        "Alles in Team",
        "Eigene Stimme",
        "Single Sign-on (SSO)",
        "Individueller SLA",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="section bg-white text-slate-900"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            data-testid="pricing-title"
            className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900"
          >
            Preise
          </h2>
          <div className="flex items-center justify-center gap-2 text-slate-600 mb-8">
            <Check size={16} className="text-slate-900" />
            <span className="text-sm font-medium">30 Tage Geld-zurück-Garantie</span>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <div className="bg-slate-100 p-1 rounded-full flex items-center">
              <button
                onClick={() => setIsYearly(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isYearly ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                }`}
              >
                Jährlich
                <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                  -15%
                </span>
              </button>
              <button
                onClick={() => setIsYearly(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !isYearly ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                }`}
              >
                Monatlich
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-4 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              data-testid={`pricing-card-${index}`}
              className={`bg-white border border-slate-200 rounded-2xl p-6 flex flex-col relative transition-all duration-300 ${
                plan.popular ? "ring-2 ring-blue-600 shadow-xl lg:scale-105 z-10" : "shadow-sm hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Beliebt
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500">{plan.description}</p>
              </div>

              <div className="mb-6 h-16 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">
                  {plan.price}
                </span>
                {plan.price !== "individuell" && (
                  <>
                    <span className="text-2xl font-bold text-slate-900">€</span>
                    <span className="text-slate-500 text-sm">{plan.period}</span>
                  </>
                )}
              </div>

              <button
                data-testid={`pricing-cta-${index}`}
                onClick={onContactClick}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all mb-8 ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {plan.cta}
              </button>

              <div className="space-y-6 flex-grow">
                {/* Included Section */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Inkludiert
                  </h4>
                  <ul className="space-y-3">
                    {plan.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {item.disabled ? (
                          <X size={14} className="text-slate-300 mt-1 flex-shrink-0" />
                        ) : (
                          <Check size={14} className="text-blue-600 mt-1 flex-shrink-0" />
                        )}
                        <div>
                          <p className={`text-sm ${item.disabled ? "text-slate-300 line-through" : "text-slate-700 font-medium"}`}>
                            {item.text}
                          </p>
                          {item.subtext && (
                            <p className="text-[10px] text-slate-400">{item.subtext}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features Section */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Features
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={14} className="text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-slate-700 font-medium">{feature}</span>
                        {feature.includes("SIP Trunk") || feature.includes("Einstieg") || feature.includes("SLA") ? (
                          <Info size={12} className="text-slate-300 mt-1 flex-shrink-0 cursor-help" />
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onContactClick}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
          >
            Expertengespräch buchen
            <div className="flex -space-x-2 ml-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
              ))}
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
