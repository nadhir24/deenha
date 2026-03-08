import { useState } from 'react';
import SEOHead from '../components/SEOHead';

const faqs = [
  {
    category: "Product & Fabric Details",
    questions: [
      {
        question: "What makes Deenha Voal Scarves special?",
        answer: "Our Premium Voal Scarves (like the Eliza series) are crafted from high-quality cotton voal. They are lightweight, easy to shape, and stay upright on the forehead all day without the need for excessive starch or pins."
      },
      {
        question: "How do I care for my Luna Silk Scarf?",
        answer: "Silk and Satin collections require delicate care. We recommend hand washing with a mild detergent (or hijab wash) and avoiding direct sunlight when drying to preserve the fabric's natural sheen and softness."
      },
      {
        question: "Are Deenha Bergos travel-friendly?",
        answer: "Yes! Our Bergo collections, like the Amira and Mariam series, are designed for 'instant' modesty. They are made from breathable, ironless materials, making them the perfect companion for travel or daily errands."
      },
      {
        question: "What is included in a Deenha Pray Set?",
        answer: "Our Premium Pray Sets (like the Fatima series) include a high-quality prayer robe (mukena) and a matching compact travel pouch, ensuring you can pray comfortably and stylishly wherever you are."
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
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship worldwide! International shipping rates and delivery times vary by destination. Please contact our WhatsApp support for a manual shipping quote for overseas orders."
      }
    ]
  },
  {
    category: "Gifting & Hampers",
    questions: [
      {
        question: "Can I customize a Deenha Hamper?",
        answer: "We offer curated hampers for special occasions like Ramadan and Eid. For custom corporate gifting or special requests, please reach out to our team via WhatsApp to discuss personalized packaging and product selections."
      },
      {
        question: "Does the hamper include a greeting card?",
        answer: "Every Deenha Signature Gift Box and Hamper comes with an elegant greeting card. You can request a custom message to be written during the checkout process via WhatsApp."
      }
    ]
  }
];

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-black/5">
            <button
                className="flex w-full items-center justify-between py-6 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{question}</span>
                <span className="ml-6 flex h-7 items-center">
                    {isOpen ? (
                        <svg className="h-4 w-4 text-accent-gold" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                        </svg>
                    ) : (
                        <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                    )}
                </span>
            </button>
            {isOpen && (
                <div className="pb-6 pr-12">
                    <p className="text-sm leading-relaxed text-secondary italic">{answer}</p>
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
        description="Find answers to common questions about Deenha's Voal scarves, Silk collections, Bergos, and shipping. Learn about our premium fabrics and care instructions."
        jsonLd={faqSchema}
      />
      <div className="bg-white py-44">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">Help Center</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-8">Frequently Asked Questions</h2>
            <p className="text-secondary text-sm leading-relaxed max-w-lg mb-20">
              Find everything you need to know about our collections, materials, and services. For further assistance, our atelier team is available via WhatsApp.
            </p>
          </div>
          
          <div className="space-y-24">
            {faqs.map((section, sectionIdx) => (
              <div key={sectionIdx} className="grid lg:grid-cols-3 gap-12 border-t border-black/5 pt-16">
                <div>
                    <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-accent-gold">{section.category}</h3>
                </div>
                <div className="lg:col-span-2 divide-y divide-black/5">
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
