import { Phone, MessageSquare, Calendar, Workflow, Cpu, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Phone,
      title: "AI Voice Agents",
      description: "Human-like inbound & outbound AI callers that qualify and close leads around the clock.",
      features: ["Natural conversations", "Multi-language support", "CRM integration"],
    },
    {
      icon: MessageSquare,
      title: "AI Chatbots",
      description: "24/7 intelligent website chat automation that engages visitors and converts them to customers.",
      features: ["Instant responses", "Lead qualification", "Seamless handoff"],
    },
    {
      icon: Calendar,
      title: "AI Appointment Setters",
      description: "Automatically qualify prospects and book meetings directly into your calendar.",
      features: ["Smart scheduling", "Timezone aware", "Calendar sync"],
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Integrate AI into CRMs, pipelines, and internal systems to eliminate manual tasks.",
      features: ["Process automation", "Data sync", "Custom triggers"],
    },
    {
      icon: Cpu,
      title: "Custom AI Systems",
      description: "Tailored AI infrastructure designed specifically for your scaling business needs.",
      features: ["Custom models", "API development", "Enterprise scale"],
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
            Our Services
          </p>
          <h2
            data-testid="services-title"
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            AI Solutions That{" "}
            <span className="gradient-text">Drive Results</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            From voice agents to complete workflow automation, we build and deploy AI systems that work 24/7.
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
