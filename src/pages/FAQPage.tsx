import { useState } from 'react';
import SEOHead from '../components/SEOHead';

const faqs = [
  {
    category: "Hijab Styles & Types",
    questions: [
      {
        question: "What is an Instant Chiffon Hijab?",
        answer: "Our Instant Chiffon Hijab is designed for ease and elegance. It's a pre-sewn style that you can simply slip on in under 30 seconds, providing a polished look without the need for pins or complex wrapping."
      },
      {
        question: "Do I need pins for the Jersey Hijab?",
        answer: "No pins needed! Our Jersey Hijabs are made from a high-quality, stretchy fabric that stays in place all day. The non-slip material ensures you can move freely with confidence."
      },
      {
        question: "Is Chiffon good for hot weather?",
        answer: "Absolutely. Chiffon is one of our most recommended fabrics for summer. It is lightweight, airy, and breathable, allowing for excellent airflow to keep you cool while maintaining modesty."
      },
      {
        question: "What is the difference between Voal and Chiffon?",
        answer: "Voal is a soft, slightly textured cotton-blend fabric that holds its shape well, making it easy to style. Chiffon is more flowy and sheer (opaque when layered), offering a more formal, draped look."
      }
    ]
  },
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer: "We process orders within 1-2 business days. Shipping within Bandung usually takes 1-2 days, while other cities in Indonesia may take 2-5 days depending on the courier service selected."
      },
      {
        question: "Can I track my order?",
        answer: "Yes, once your order is shipped, you will receive a tracking number via email or WhatsApp so you can monitor your package's journey."
      }
    ]
  },
  {
    category: "Product Care",
    questions: [
      {
        question: "How should I wash my Chiffon Hijabs?",
        answer: "We recommend hand washing your Chiffon hijabs in cold water with mild detergent. If using a machine, place them in a laundry bag on a delicate cycle. Hang to dry to maintain their quality."
      },
      {
        question: "Can I iron my pleats?",
        answer: "For pleated items, we recommend steaming instead of ironing to preserve the pleat structure. If you must iron, use a low heat setting and avoid pressing down hard on the pleats."
      }
    ]
  }
];

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                className="flex w-full items-center justify-between py-6 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-base font-semibold leading-7 text-gray-900">{question}</span>
                <span className="ml-6 flex h-7 items-center">
                    {isOpen ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                    )}
                </span>
            </button>
            {isOpen && (
                <div className="pb-6 pr-12">
                    <p className="text-base leading-7 text-gray-600">{answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.flatMap(section => 
      section.questions.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  };

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions - Deenha"
        description="Find answers to common questions about Deenha's hijabs, fabrics, shipping, and more. Learn about our instant chiffon, jersey styles, and care instructions."
        jsonLd={faqSchema}
      />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Have questions? We're here to help. If you can't find what you're looking for, feel free to contact us.
            </p>
          </div>
          
          <div className="mt-20 max-w-3xl mx-auto space-y-16">
            {faqs.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{section.category}</h3>
                <div className="divide-y divide-gray-200">
                  {section.questions.map((faq, faqIdx) => (
                    <FAQItem key={faqIdx} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
