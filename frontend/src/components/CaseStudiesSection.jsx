import { TrendingUp, ArrowUpRight } from "lucide-react";

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: "Med Spa Chain Transformation",
      industry: "Healthcare & Beauty",
      image: "https://images.unsplash.com/photo-1767706508368-14e0f1b84ad0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtZWRpY2FsJTIwc3BhJTIwaW50ZXJpb3IlMjBkYXJrfGVufDB8fHx8MTc3MTM2NTI1MHww&ixlib=rb-4.1.0&q=85",
      problem: "High call volume overwhelming front desk, missed appointments, and lost revenue.",
      solution: "Deployed AI voice agents for 24/7 booking and AI chatbots for instant responses.",
      results: [
        { metric: "212%", label: "Increase in Booked Appointments" },
        { metric: "45%", label: "Reduction in No-Shows" },
        { metric: "3x", label: "ROI in First Quarter" },
      ],
    },
    {
      title: "Law Firm Client Intake Revolution",
      industry: "Legal Services",
      image: "https://images.unsplash.com/photo-1694253988732-816ab6e60caa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMG1lZXRpbmclMjBkYXJrJTIwbW9kZXxlbnwwfHx8fDE3NzEzNjUyNDl8MA&ixlib=rb-4.1.0&q=85",
      problem: "Slow lead response times and manual intake processes causing qualified leads to go cold.",
      solution: "Implemented AI-powered lead qualification and automated intake workflows.",
      results: [
        { metric: "68%", label: "Reduction in Staffing Costs" },
        { metric: "5 min", label: "Average Response Time (was 24hrs)" },
        { metric: "89%", label: "Client Satisfaction Score" },
      ],
    },
    {
      title: "Solar Company Lead Gen Overhaul",
      industry: "Renewable Energy",
      image: "https://images.unsplash.com/photo-1762958266463-6af778b56beb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA5MzV8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBzb2xhciUyMHBhbmVsfGVufDB8fHx8MTc3MTM2NTI1Mnww&ixlib=rb-4.1.0&q=85",
      problem: "Sales team overwhelmed with unqualified leads, wasting time on dead-end prospects.",
      solution: "Deployed AI outbound calling for lead qualification before human handoff.",
      results: [
        { metric: "340%", label: "Increase in Qualified Leads" },
        { metric: "52%", label: "Improvement in Close Rate" },
        { metric: "$2.4M", label: "Additional Revenue Generated" },
      ],
    },
  ];

  return (
    <section
      id="case-studies"
      data-testid="case-studies-section"
      className="section bg-[#0f172a]/30"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider text-sm">
            Case Studies
          </p>
          <h2
            data-testid="case-studies-title"
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            Real Results from{" "}
            <span className="gradient-text">Real Clients</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            See how businesses like yours achieved transformational growth with our AI systems.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.title}
              data-testid={`case-study-card-${index}`}
              className="case-study-card glass-card overflow-hidden"
            >
              <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                {/* Image */}
                <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent lg:bg-gradient-to-l" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      {study.industry}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {study.title}
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">The Challenge</p>
                      <p className="text-slate-400 text-sm">{study.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Our Solution</p>
                      <p className="text-slate-400 text-sm">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4">
                    {study.results.map((result) => (
                      <div key={result.label} className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp size={14} className="text-green-400" />
                          <span className="text-xl lg:text-2xl font-bold gradient-text">
                            {result.metric}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button className="btn-secondary inline-flex items-center gap-2">
            View All Case Studies
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
