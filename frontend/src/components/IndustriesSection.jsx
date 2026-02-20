import { Home, Scale, Heart, Sun, Shield, Megaphone, ShoppingCart } from "lucide-react";

const IndustriesSection = () => {
  const industries = [
    { icon: Home, name: "Real Estate", description: "Lead qualification & follow-up" },
    { icon: Scale, name: "Law Firms", description: "Client intake & scheduling" },
    { icon: Heart, name: "Med Spas", description: "Appointment booking & reminders" },
    { icon: Sun, name: "Solar", description: "Lead gen & qualification calls" },
    { icon: Shield, name: "Insurance", description: "Quote generation & follow-up" },
    { icon: Megaphone, name: "Marketing Agencies", description: "Client communication & reporting" },
    { icon: ShoppingCart, name: "E-commerce", description: "Customer support & upselling" },
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
            Industries We Serve
          </p>
          <h2
            data-testid="industries-title"
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            AI Solutions for{" "}
            <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            Specialized AI automation tailored to your industry&apos;s unique challenges.
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
