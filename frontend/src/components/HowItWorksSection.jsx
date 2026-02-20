import { Target, Wrench, Rocket } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: Target,
      title: "Strategy & System Mapping",
      description: "We analyze your business processes, identify automation opportunities, and design a custom AI roadmap tailored to your goals.",
    },
    {
      number: "02",
      icon: Wrench,
      title: "Build & Integration",
      description: "Our team develops and integrates AI systems seamlessly with your existing tools, CRM, and workflows with zero disruption.",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Launch, Optimize & Scale",
      description: "We deploy your AI systems, monitor performance, and continuously optimize to maximize ROI and scale with your growth.",
    },
  ];

  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="section bg-[#0f172a]/30"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider text-sm">
            How It Works
          </p>
          <h2
            data-testid="how-it-works-title"
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            Your Path to{" "}
            <span className="gradient-text">AI Automation</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            A proven 3-step process that transforms your business operations.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                data-testid={`step-card-${index}`}
                className="relative"
              >
                {/* Card */}
                <div className="glass-card p-8 text-center lg:text-left h-full">
                  {/* Step Number Badge */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-6 relative z-10">
                    <step.icon size={28} className="text-white" />
                  </div>

                  {/* Number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-white/5">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-cyan-500"
                    >
                      <path
                        d="M12 5v14M19 12l-7 7-7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
