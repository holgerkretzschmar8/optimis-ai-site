import { Phone, MessageSquare, Workflow, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const VOXALIO_URL = "https://voxalio.de/";

const ServicesSection = () => {
  const { t } = useTranslation();
  const services = [
    {
      icon: MessageSquare,
      title: t('services.items.chatbots.title'),
      description: t('services.items.chatbots.description'),
      linkHint: t('services.items.chatbots.linkHint'),
      features: t('services.items.chatbots.features', { returnObjects: true }),
    },
    {
      icon: Phone,
      title: t('services.items.voice.title'),
      description: t('services.items.voice.description'),
      linkHint: t('services.items.voice.linkHint'),
      features: t('services.items.voice.features', { returnObjects: true }),
      href: VOXALIO_URL,
    },
    {
      icon: Workflow,
      title: t('services.items.workflow.title'),
      description: t('services.items.workflow.description'),
      features: t('services.items.workflow.features', { returnObjects: true }),
    },
  ];

  return (
    <section id="services" data-testid="services-section" className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider text-sm">
            {t('services.badge')}
          </p>
          <h2 data-testid="services-title" className="text-3xl lg:text-4xl font-bold mb-6">
            {t('services.titleMain')} <span className="gradient-text">{t('services.titleGradient')}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            {t('services.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const CardComponent = service.href ? "a" : "div";

            return (
              <CardComponent
                key={service.title}
                data-testid={`service-card-${index}`}
                className="service-card glass-card p-8 h-full"
                {...(service.href ? { href: service.href, target: "_blank", rel: "noreferrer" } : {})}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-6">
                  <service.icon className="text-cyan-400" size={28} />
                </div>

                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {service.title}
                    {service.href && <ArrowUpRight size={18} className="text-cyan-400" />}
                  </h3>
                </div>

                <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                {service.linkHint && (
                  <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm leading-relaxed text-cyan-100">
                    {service.linkHint}
                  </div>
                )}

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardComponent>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
