import { Check, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PricingSection({ onContactClick }) {
  const { t } = useTranslation();
  const plans = [
    {
      name: t('pricing.plans.starter.name'),
      price: t('pricing.plans.starter.price'),
      originalPrice: t('pricing.plans.starter.originalPrice'),
      trial: t('pricing.plans.starter.trial'),
      period: t('pricing.period'),
      description: t('pricing.plans.starter.description'),
      features: t('pricing.plans.starter.features', { returnObjects: true }),
      popular: false,
    },
    {
      name: t('pricing.plans.growth.name'),
      price: t('pricing.plans.growth.price'),
      originalPrice: t('pricing.plans.growth.originalPrice'),
      trial: t('pricing.plans.growth.trial'),
      period: t('pricing.period'),
      description: t('pricing.plans.growth.description'),
      features: t('pricing.plans.growth.features', { returnObjects: true }),
      popular: true,
    },
    {
      name: t('pricing.plans.enterprise.name'),
      price: t('pricing.plans.enterprise.price'),
      period: "",
      description: t('pricing.plans.enterprise.description'),
      features: t('pricing.plans.enterprise.features', { returnObjects: true }),
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
                {plan.originalPrice && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg text-slate-500 line-through">
                      {plan.originalPrice}
                    </span>
                    <span className="inline-block bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-full">
                      -80%
                    </span>
                  </div>
                )}
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-slate-500">{plan.period}</span>
                {plan.trial && (
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <p className="text-sm font-semibold text-cyan-400 ml-px">
                      + {plan.trial} testing
                    </p>
                  </div>
                )}
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
                {t('common.getStarted')}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          {t('pricing.guarantee')}
        </p>
      </div>
    </section>
  );
}
