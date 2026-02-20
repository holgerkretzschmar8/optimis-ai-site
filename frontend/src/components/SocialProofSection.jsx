import { useEffect, useState, useRef } from "react";

const SocialProofSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { value: 300, suffix: "%", label: "Faster Lead Response" },
    { value: 40, suffix: "%", label: "Reduction in Operating Costs" },
    { value: 24, suffix: "/7", label: "AI Sales & Support Agents" },
    { value: 10, suffix: "K+", label: "Conversations Automated" },
  ];

  const logos = [
    "TechCorp", "InnovateCo", "GrowthLabs", "ScaleUp", "FutureTech", "DataDriven"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="social-proof-section"
      className="section bg-[#0f172a]/50"
    >
      <div className="container-custom">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              data-testid={`stat-card-${index}`}
              className="stats-card glass-card p-6 lg:p-8 text-center"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${index * 0.1}s`,
              }}
            >
              <div className="stat-number text-3xl lg:text-4xl font-bold gradient-text mb-2">
                {isVisible ? (
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <p className="text-sm lg:text-base text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-8 uppercase tracking-wider">
            Trusted by innovative companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {logos.map((logo, index) => (
              <div
                key={logo}
                data-testid={`client-logo-${index}`}
                className="px-6 py-3 rounded-lg bg-slate-800/30 border border-white/5"
                style={{
                  opacity: isVisible ? 0.7 : 0,
                  transition: `opacity 0.6s ease ${index * 0.1 + 0.5}s`,
                }}
              >
                <span className="text-slate-400 font-semibold text-lg">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ target, suffix, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default SocialProofSection;
