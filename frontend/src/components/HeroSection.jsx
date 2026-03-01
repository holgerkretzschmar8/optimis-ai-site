import { ArrowRight, Play, Shield, Zap, Clock } from "lucide-react";

const HeroSection = ({ onContactClick }) => {
  const trustIndicators = [
    { icon: Shield, text: "Enterprise-Grade Security" },
    { icon: Zap, text: "24/7 AI Automation" },
    { icon: Clock, text: "Same-Week Deployment" },
  ];

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale brightness-[0.4] contrast-125"
        >
          <source src="https://cdn.builder.io/o/assets%2Fb6ada3fcbf6a4608a81d82bb64ba566b%2F83b6eaac4cad4c2281a3678d64543138?alt=media&token=9fe40824-29b6-4ba3-97bf-6005ed53fcbc&apiKey=b6ada3fcbf6a4608a81d82bb64ba566b" type="video/mp4" />
        </video>
        {/* Extra layer to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-transparent to-[#020617]" />
      </div>

      {/* Animated Neural Network Background */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[150px] animate-orb-1" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/25 rounded-full blur-[120px] animate-orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] animate-orb-3" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        
        {/* Animated particles */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={`${20 + i * 15}%`}
              x2="100%"
              y2={`${25 + i * 15}%`}
              stroke="url(#line-gradient)"
              strokeWidth="1"
              className="animate-line"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-10 animate-fade-in-up">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm text-cyan-400 font-medium tracking-wide">AI Automation Agency</span>
          </div>

          {/* Main Headline */}
          <h1
            data-testid="hero-headline"
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="block text-white">Advanced AI Systems</span>
            <span className="block mt-2">
              That{" "}
              <span className="gradient-text animate-gradient">Optimize Revenue</span>
            </span>
            <span className="block text-white mt-2">& Efficiency</span>
          </h1>

          {/* Subheadline */}
          <p
            data-testid="hero-subheadline"
            className="text-xl lg:text-2xl text-slate-400 mb-6 max-w-3xl mx-auto animate-fade-in-up font-light"
            style={{ animationDelay: "0.2s" }}
          >
            We design intelligent automation for modern businesses.
          </p>

          <p 
            className="text-base lg:text-lg text-slate-500 mb-12 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Deploy AI voice agents, chatbots, and workflow automation that scale your business 24/7 without increasing overhead.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              data-testid="hero-cta-primary"
              onClick={onContactClick}
              className="btn-primary inline-flex items-center justify-center gap-2 text-base lg:text-lg px-10 py-4"
            >
              Book a Free Strategy Call
              <ArrowRight size={20} />
            </button>
            <a
              href="#how-it-works"
              data-testid="hero-cta-secondary"
              className="btn-secondary inline-flex items-center justify-center gap-2 text-base lg:text-lg px-10 py-4"
            >
              <Play size={20} />
              See How It Works
            </a>
          </div>

          {/* Trust Indicators */}
          <div 
            className="flex flex-wrap gap-8 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            {trustIndicators.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-sm text-slate-400"
              >
                <item.icon size={18} className="text-cyan-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
