import { Cpu, Wrench, Zap, TrendingUp, HeadphonesIcon, BarChart3 } from "lucide-react";

const WhyUsSection = () => {
  const reasons = [
    {
      icon: Cpu,
      title: "Enterprise-Grade AI Models",
      description: "We use the latest GPT-4, Claude, and custom-trained models for superior performance.",
    },
    {
      icon: Wrench,
      title: "Custom-Built Systems",
      description: "No cookie-cutter templates. Every solution is engineered for your specific needs.",
    },
    {
      icon: Zap,
      title: "Fast Deployment",
      description: "Go live in days, not months. Our streamlined process gets you results quickly.",
    },
    {
      icon: TrendingUp,
      title: "Ongoing Optimization",
      description: "We continuously monitor and improve your AI systems for peak performance.",
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Support Team",
      description: "Your success is our priority. Get expert support whenever you need it.",
    },
    {
      icon: BarChart3,
      title: "Data-Driven Performance",
      description: "Real-time analytics and reporting so you always know your ROI.",
    },
  ];

  return (
    <section
      id="why-us"
      data-testid="why-us-section"
      className="section"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider text-sm">
              Why Optimis AI
            </p>
            <h2
              data-testid="why-us-title"
              className="text-3xl lg:text-4xl font-bold mb-6"
            >
              The{" "}
              <span className="gradient-text">Optimis Advantage</span>
            </h2>
            <p className="text-slate-400 mb-8 text-base lg:text-lg">
              We&apos;re not just another AI agency. We&apos;re your strategic partner in building intelligent systems that drive measurable business growth.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-3xl font-bold gradient-text">50+</p>
                <p className="text-sm text-slate-500">AI Systems Deployed</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">98%</p>
                <p className="text-sm text-slate-500">Client Retention</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">5x</p>
                <p className="text-sm text-slate-500">Average ROI</p>
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
