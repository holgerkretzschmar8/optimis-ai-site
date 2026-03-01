import { Phone, MessageSquare, Calendar, Workflow, Cpu, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ServicesSection = () => {
  const { t } = useTranslation();
  const services = [
    {
      icon: Phone,
      title: t('services.items.voice.title'),
      description: t('services.items.voice.description'),
      features: t('services.items.voice.features', { returnObjects: true }),
    },
    {
      icon: MessageSquare,
      title: t('services.items.chatbots.title'),
      description: t('services.items.chatbots.description'),
      features: t('services.items.chatbots.features', { returnObjects: true }),
    },
    {
      icon: Calendar,
      title: t('services.items.appointment.title'),
      description: t('services.items.appointment.description'),
      features: t('services.items.appointment.features', { returnObjects: true }),
    },
    {
      icon: Workflow,
      title: t('services.items.workflow.title'),
      description: t('services.items.workflow.description'),
      features: t('services.items.workflow.features', { returnObjects: true }),
    },
    {
      icon: Cpu,
      title: t('services.items.custom.title'),
      description: t('services.items.custom.description'),
      features: t('services.items.custom.features', { returnObjects: true }),
    },
  ];

  return (
    <section
      id="services"
      data-testid="services-section"
      className="section"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider text-sm">
            {t('services.badge')}
          </p>
          <h2
            data-testid="services-title"
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            {t('services.title').split('That')[0]} That{" "}
            <span className="gradient-text">{t('services.title').split('That')[1]}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              data-testid={`service-card-${index}`}
              className="service-card glass-card p-8 group cursor-pointer"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all">
                <service.icon className="text-cyan-400" size={28} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className="inline-flex items-center gap-2 text-cyan-400 font-medium text-sm group-hover:gap-3 transition-all">
                Learn More
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
