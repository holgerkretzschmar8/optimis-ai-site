import { MessageCircleMore, MonitorSmartphone, Bot, BadgeCheck, Handshake } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyUsSection = () => {
  const { t } = useTranslation();
  const reasons = [
    {
      icon: MessageCircleMore,
      title: t('whyUs.items.consultation.title'),
      description: t('whyUs.items.consultation.description'),
    },
    {
      icon: MonitorSmartphone,
      title: t('whyUs.items.website.title'),
      description: t('whyUs.items.website.description'),
    },
    {
      icon: Bot,
      title: t('whyUs.items.pilot.title'),
      description: t('whyUs.items.pilot.description'),
    },
    {
      icon: BadgeCheck,
      title: t('whyUs.items.commercial.title'),
      description: t('whyUs.items.commercial.description'),
    },
    {
      icon: Handshake,
      title: t('whyUs.items.partner.title'),
      description: t('whyUs.items.partner.description'),
    },
  ];

  return (
    <section
      id="why-us"
      data-testid="why-us-section"
      className="section"
    >
      <div className="container-custom">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider text-sm" data-testid="why-us-label">
            {t('whyUs.badge')}
          </p>
          <h2
            data-testid="why-us-title"
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            {t('whyUs.titleMain')} <span className="gradient-text">{t('whyUs.titleGradient')}</span>
          </h2>
          <p className="text-slate-400 mb-6 text-base lg:text-lg">
            {t('whyUs.description')}
          </p>
          <p className="text-slate-300 text-base lg:text-lg leading-relaxed">
            {t('whyUs.statement')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              data-testid={`why-us-card-${index}`}
              className="glass-card p-6 h-full"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4">
                <reason.icon size={20} className="text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">
                {reason.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
