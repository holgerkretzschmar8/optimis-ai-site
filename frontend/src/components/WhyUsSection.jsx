import { Cpu, Wrench, Zap, TrendingUp, HeadphonesIcon, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyUsSection = ({ onShowPopup }) => {
  const { t } = useTranslation();
  const reasons = [
    {
      icon: Cpu,
      title: t('whyUs.items.models.title'),
      description: t('whyUs.items.models.description'),
    },
    {
      icon: Wrench,
      title: t('whyUs.items.custom.title'),
      description: t('whyUs.items.custom.description'),
    },
    {
      icon: Zap,
      title: t('whyUs.items.deployment.title'),
      description: t('whyUs.items.deployment.description'),
    },
    {
      icon: TrendingUp,
      title: t('whyUs.items.optimization.title'),
      description: t('whyUs.items.optimization.description'),
    },
    {
      icon: HeadphonesIcon,
      title: t('whyUs.items.support.title'),
      description: t('whyUs.items.support.description'),
    },
    {
      icon: BarChart3,
      title: t('whyUs.items.performance.title'),
      description: t('whyUs.items.performance.description'),
    },
  ];

  return (
    <section
      id="why-us"
      data-testid="why-us-section"
      className="section"
      onMouseEnter={onShowPopup}
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider text-sm" data-testid="why-us-label">
              {t('whyUs.badge')}
            </p>
            <h2
              data-testid="why-us-title"
              className="text-3xl lg:text-4xl font-bold mb-6"
            >
              {t('whyUs.titleMain')} <span className="gradient-text">{t('whyUs.titleGradient')}</span>
            </h2>
            <p className="text-slate-400 mb-8 text-base lg:text-lg">
              {t('whyUs.description')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-3xl font-bold gradient-text">50+</p>
                <p className="text-sm text-slate-500">{t('whyUs.stats.deployed')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">98%</p>
                <p className="text-sm text-slate-500">{t('whyUs.stats.retention')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">5x</p>
                <p className="text-sm text-slate-500">{t('whyUs.stats.roi')}</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                data-testid={`why-us-card-${index}`}
                className="glass-card p-6 group hover:border-cyan-500/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-all">
                  <reason.icon size={20} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
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
      </div>
    </section>
  );
};

export default WhyUsSection;
