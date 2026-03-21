import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Check } from "lucide-react";

export default function PricingSection({ onContactClick }) {
  const { t } = useTranslation();
  const [isAnnualBilling, setIsAnnualBilling] = useState(true);

  const plans = [
    {
      name: t('pricing.plans.starter.name'),
      monthlyPrice: t('pricing.plans.starter.monthlyPrice'),
      annualPrice: t('pricing.plans.starter.annualPrice'),
      period: t('pricing.plans.starter.period'),
      billing: t('pricing.plans.starter.billing'),
      annualBilling: t('pricing.plans.starter.annualBilling'),
      features: t('pricing.plans.starter.features', { returnObjects: true }),
      cta: t('pricing.plans.starter.cta'),
      note: t('pricing.plans.starter.note'),
      popular: false,
    },
    {
      name: t('pricing.plans.professional.name'),
      monthlyPrice: t('pricing.plans.professional.monthlyPrice'),
      annualPrice: t('pricing.plans.professional.annualPrice'),
      period: t('pricing.plans.professional.period'),
      billing: t('pricing.plans.professional.billing'),
      annualBilling: t('pricing.plans.professional.annualBilling'),
      features: t('pricing.plans.professional.features', { returnObjects: true }),
      cta: t('pricing.plans.professional.cta'),
      note: t('pricing.plans.professional.note'),
      popular: true,
    },
    {
      name: t('pricing.plans.enterprise.name'),
      monthlyPrice: t('pricing.plans.enterprise.monthlyPrice'),
      annualPrice: t('pricing.plans.enterprise.annualPrice'),
      period: t('pricing.plans.enterprise.period'),
      billing: t('pricing.plans.enterprise.billing'),
      annualBilling: t('pricing.plans.enterprise.annualBilling'),
      features: t('pricing.plans.enterprise.features', { returnObjects: true }),
      cta: t('pricing.plans.enterprise.cta'),
      note: t('pricing.plans.enterprise.note'),
      popular: false,
    },
  ];

  return (
    <section id="pricing" data-testid="pricing-section" className="section bg-[#0f172a]/30">
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
            <span className={`text-sm font-medium ${!isAnnualBilling ? 'text-white' : 'text-slate-300'}`}>
              {t('pricing.monthlyBilling')}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isAnnualBilling}
              aria-label={t('pricing.annualBilling')}
              onClick={() => setIsAnnualBilling(!isAnnualBilling)}
              className={`relative flex h-6 w-11 items-center rounded-full p-0.5 shadow-inner transition-colors ${isAnnualBilling ? 'bg-cyan-500' : 'bg-white/10'}`}
            >
              <span className={`h-5 w-5 rounded-full bg-white transition-transform ${isAnnualBilling ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnualBilling ? 'text-white' : 'text-slate-300'}`}>
              {t('pricing.annualBilling')}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card p-8 relative ${plan.popular ? 'pricing-popular lg:scale-105' : ''}`}
            >
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>

              <div className="mb-8">
                <div className="mb-3 flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">
                    {isAnnualBilling ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <p className="text-sm text-cyan-400 font-medium">
                  {isAnnualBilling ? plan.annualBilling : plan.billing}
                </p>
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
                className={`w-full py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
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
