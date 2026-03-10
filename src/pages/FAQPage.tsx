import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import { useTranslation } from 'react-i18next';
import { useFAQs } from '../hooks/useFAQs';

const FAQPage = () => {
    const { t } = useTranslation();
    const { faqs, loading } = useFAQs();
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Get unique categories
    const categories = Array.from(new Set(faqs.map(f => f.category)));

    return (
        <main className="pt-44 pb-24 bg-white">
            <SEOHead
                title="FAQ - Frequently Asked Questions"
                description="Find answers to common questions about DEENHA hijabs, shipping, materials, and caring for your premium modest wear."
                canonicalPath="/faq"
            />

            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <header className="mb-20 text-center">
                    <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">Assistance</span>
                    <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight mb-8 italic">Help Center</h1>
                    <p className="text-secondary text-sm leading-relaxed max-w-xl mx-auto">
                        Your questions answered. If you can''t find what you''re looking for, our team is always available via WhatsApp for personalized assistance.
                    </p>
                </header>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-pulse text-accent-gold text-xs uppercase tracking-widest">Loading...</div>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {categories.map(category => (
                            <section key={category} className="space-y-6">
                                <h2 className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary/40 border-b border-black/5 pb-4">
                                    {category}
                                </h2>
                                <div className="space-y-4">
                                    {faqs.filter(f => f.category === category).map((faq) => (
                                        <div
                                            key={faq.id}
                                            className="border-b border-black/5 last:border-0"
                                        >
                                            <button
                                                onClick={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
                                                className="w-full py-6 flex justify-between items-center text-left group"
                                            >
                                                <span className="font-display text-xl group-hover:text-accent-gold transition-colors duration-500 italic">
                                                    {faq.question}
                                                </span>
                                                <motion.span
                                                    animate={{ rotate: openIndex === faq.id ? 45 : 0 }}
                                                    className="text-2xl font-light text-secondary/40"
                                                >
                                                    +
                                                </motion.span>
                                            </button>
                                            <AnimatePresence>
                                                {openIndex === faq.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="pb-8 text-secondary text-sm leading-relaxed max-w-2xl font-light">
                                                            {faq.answer}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default FAQPage;
