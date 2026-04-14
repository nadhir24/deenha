import SEOHead from '../components/SEOHead';

const ShippingPage = () => {
    return (
        <main className="pt-44 pb-24 bg-white dark:bg-primary transition-colors duration-300">
            <SEOHead title={`Shipping Info - DEENHA`} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block text-center text-white/50">Delivery</span>
                <h1 className="font-display text-5xl md:text-7xl font-normal tracking-tight mb-16 italic text-primary dark:text-white text-center underline decoration-accent-gold/20">Shipping Info</h1>
                
                <div className="space-y-16 text-secondary dark:text-white/75 leading-relaxed">
                    <section>
                        <h2 className="font-display text-2xl mb-6 text-primary dark:text-white">Domestic Shipping (Indonesia)</h2>
                        <p className="mb-4">We deliver to all cities across Indonesia using JNE, J&T, and SiCepat. Standard shipping typically takes 2-5 business days depending on your location.</p>
                        <p className="font-medium text-accent-gold uppercase tracking-widest text-xs">Free shipping for orders over Rp 500.000</p>
                    </section>
                    
                    <section>
                        <h2 className="font-display text-2xl mb-6 text-primary dark:text-white">International Shipping</h2>
                        <p className="mb-4">DEENHA ships worldwide. We use DHL Express and EMS for reliable international delivery. Shipping times vary by country (typically 5-10 business days).</p>
                        <p>Customs duties and taxes are the responsibility of the recipient.</p>
                    </section>
                    
                    <section>
                        <h2 className="font-display text-2xl mb-6 text-primary dark:text-white">Order Processing</h2>
                        <p>Orders are processed within 1-2 business days after payment confirmation. You will receive a tracking number via email/WhatsApp once your package has been dispatched.</p>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default ShippingPage;
