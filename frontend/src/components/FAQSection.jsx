import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const { t } = useTranslation();
  const faqs = [
    {
      question: t('faq.items.q1.q'),
      answer: t('faq.items.q1.a'),
    },
    {
      question: t('faq.items.q2.q'),
      answer: t('faq.items.q2.a'),
    },
    {
      question: t('faq.items.q3.q'),
      answer: t('faq.items.q3.a'),
    },
    {
      question: t('faq.items.q4.q'),
      answer: t('faq.items.q4.a'),
    },
    {
      question: t('faq.items.q5.q'),
      answer: t('faq.items.q5.a'),
    },
    {
      question: t('faq.items.q6.q'),
      answer: t('faq.items.q6.a'),
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
            {t('faq.badge')}
          </p>
          <h2
            data-testid="faq-title"
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            {t('faq.titleMain')}{" "}
            <span className="gradient-text">{t('faq.titleGradient')}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            {t('faq.description')}
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
