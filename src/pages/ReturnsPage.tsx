import SEOHead from '../components/SEOHead';

const ReturnsPage = () => {
    return (
        <main className="pt-44 pb-24 bg-white dark:bg-primary transition-colors duration-300">
            <SEOHead title={`Returns & Exchanges - DEENHA`} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block text-center">Satisfaction Guarantee</span>
                <h1 className="font-display text-5xl md:text-7xl font-normal tracking-tight mb-16 italic text-primary dark:text-white text-center">Returns</h1>
                
                <div className="space-y-16 text-secondary dark:text-white/75 leading-relaxed">
                    <section>
                        <h2 className="font-display text-2xl mb-6 text-primary dark:text-white">7-Day Return Policy</h2>
                        <p>If you are not entirely satisfied with your purchase, you may return the item(s) within 7 days of receiving your order for an exchange or store credit.</p>
                    </section>
                    
                    <section>
                        <h2 className="font-display text-2xl mb-6 text-primary dark:text-white">Conditions for Return</h2>
                        <ul className="list-disc pl-5 space-y-4">
                            <li>Items must be in original condition: unworn, unwashed, and with all tags attached.</li>
                            <li>Sale items and hampers are final sale and cannot be returned.</li>
                            <li>Original packaging must be included.</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h2 className="font-display text-2xl mb-6 text-primary dark:text-white">How to Initiate a Return</h2>
                        <p>Please contact our Customer Support via WhatsApp with your order number and reason for return. We will guide you through the process.</p>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default ReturnsPage;
