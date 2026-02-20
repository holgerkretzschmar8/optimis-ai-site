import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does AI voice technology work?",
      answer: "Our AI voice agents use advanced natural language processing and speech synthesis to have human-like conversations. They can understand context, respond naturally, and handle complex conversations including appointment booking, lead qualification, and customer support. The technology is trained on millions of conversations to ensure natural, effective interactions.",
    },
    {
      question: "Does it integrate with my CRM?",
      answer: "Yes! We integrate with all major CRM platforms including Salesforce, HubSpot, Zoho, Pipedrive, and many more. Our team handles the entire integration process, ensuring your AI systems sync seamlessly with your existing workflows. Custom integrations are also available for enterprise clients.",
    },
    {
      question: "Is it compliant and secure?",
      answer: "Absolutely. We take security and compliance seriously. Our systems are SOC 2 compliant, GDPR ready, and HIPAA compliant for healthcare clients. All data is encrypted in transit and at rest, and we maintain strict access controls. We can provide detailed security documentation upon request.",
    },
    {
      question: "How long does setup take?",
      answer: "Most implementations are completed within 1-2 weeks. This includes initial consultation, system configuration, CRM integration, testing, and launch. More complex enterprise deployments may take 3-4 weeks. We pride ourselves on fast deployment without sacrificing quality.",
    },
    {
      question: "Do you customize solutions?",
      answer: "Every solution we build is customized to your specific business needs. We don't believe in one-size-fits-all templates. Our team works with you to understand your processes, brand voice, and goals to create AI systems that feel like a natural extension of your team.",
    },
    {
      question: "What kind of support do you provide?",
      answer: "All plans include dedicated support. Starter plans receive email support with 24-hour response times. Growth plans include 24/7 priority support and weekly optimization calls. Enterprise clients get a dedicated success manager and on-call support. We're committed to your success.",
    },
  ];

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="section"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider text-sm">
            FAQ
          </p>
          <h2
            data-testid="faq-title"
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            Common{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            Everything you need to know about our AI automation solutions.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                data-testid={`faq-item-${index}`}
                className="glass-card border-white/10 px-6 rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="text-left text-white hover:text-cyan-400 py-6 text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
