import { Home, Scale, Heart, Sun, Shield, Megaphone, ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";

const IndustriesSection = () => {
  const { t } = useTranslation();
  const industries = [
    { icon: Home, name: t('industries.items.realEstate.name'), description: t('industries.items.realEstate.description') },
    { icon: Scale, name: t('industries.items.lawFirms.name'), description: t('industries.items.lawFirms.description') },
    { icon: Heart, name: t('industries.items.medSpas.name'), description: t('industries.items.medSpas.description') },
    { icon: Sun, name: t('industries.items.solar.name'), description: t('industries.items.solar.description') },
    { icon: Shield, name: t('industries.items.insurance.name'), description: t('industries.items.insurance.description') },
    { icon: Megaphone, name: t('industries.items.marketing.name'), description: t('industries.items.marketing.description') },
    { icon: ShoppingCart, name: t('industries.items.ecommerce.name'), description: t('industries.items.ecommerce.description') },
  ];

  return (
    <section
      id="industries"
      data-testid="industries-section"
      className="section"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider text-sm">
            {t('industries.badge')}
          </p>
          <h2
            data-testid="industries-title"
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            {t('industries.titleMain')}{" "}
            <span className="gradient-text">{t('industries.titleGradient')}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            {t('industries.description')}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {industries.map((industry, index) => (
            <div
              key={industry.name}
              data-testid={`industry-card-${index}`}
              className="industry-card glass-card p-6 text-center cursor-pointer group"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-800/50 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-all">
                <industry.icon size={24} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="font-semibold text-white mb-2">{industry.name}</h3>
              <p className="text-xs text-slate-500">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
