import { useTranslation } from "react-i18next";
import { ArrowRight, Check } from "lucide-react";

export default function PricingSection({ onContactClick }) {
  const { t } = useTranslation();
  const plans = [
    {
      name: t('pricing.plans.starter.name'),
      price: t('pricing.plans.starter.price'),
      period: t('pricing.plans.starter.period'),
      billing: t('pricing.plans.starter.billing'),
      features: t('pricing.plans.starter.features', { returnObjects: true }),
      cta: t('pricing.plans.starter.cta'),
      note: t('pricing.plans.starter.note'),
      popular: false,
    },
    {
      name: t('pricing.plans.professional.name'),
      price: t('pricing.plans.professional.price'),
      period: t('pricing.plans.professional.period'),
      billing: t('pricing.plans.professional.billing'),
      features: t('pricing.plans.professional.features', { returnObjects: true }),
      cta: t('pricing.plans.professional.cta'),
      note: t('pricing.plans.professional.note'),
      popular: true,
    },
    {
      name: t('pricing.plans.enterprise.name'),
      price: t('pricing.plans.enterprise.price'),
      period: t('pricing.plans.enterprise.period'),
      billing: t('pricing.plans.enterprise.billing'),
      features: t('pricing.plans.enterprise.features', { returnObjects: true }),
      cta: t('pricing.plans.enterprise.cta'),
      note: t('pricing.plans.enterprise.note'),
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
            {t('pricing.badge')}
          </p>

          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t('pricing.titleMain')} <span className="gradient-text">{t('pricing.titleGradient')}</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            {t('pricing.description')}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              className="relative flex h-5 w-10 items-center rounded-full bg-white/10 p-0.5 shadow-inner"
            >
              <span className="h-4 w-4 rounded-full bg-white" />
            </button>
            <span className="text-sm text-slate-300">{t('pricing.annualBilling')}</span>
          </div>
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

              <div className="mb-8">
                <div className="mb-3">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <p className="text-sm text-cyan-400 font-medium">{plan.billing}</p>
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
                {plan.cta}
                <ArrowRight size={16} />
              </button>

              <p className="text-center text-xs text-slate-500 mt-3">{plan.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
