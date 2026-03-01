import { Target, Wrench, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

const HowItWorksSection = () => {
  const { t } = useTranslation();
  const steps = [
    {
      number: "01",
      icon: Target,
      title: t('howItWorks.steps.step1.title'),
      description: t('howItWorks.steps.step1.description'),
    },
    {
      number: "02",
      icon: Wrench,
      title: t('howItWorks.steps.step2.title'),
      description: t('howItWorks.steps.step2.description'),
    },
    {
      number: "03",
      icon: Rocket,
      title: t('howItWorks.steps.step3.title'),
      description: t('howItWorks.steps.step3.description'),
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
            {t('howItWorks.badge')}
          </p>
          <h2
            data-testid="how-it-works-title"
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            {t('howItWorks.titleMain')}{" "}
            <span className="gradient-text">{t('howItWorks.titleGradient')}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            {t('howItWorks.description')}
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
