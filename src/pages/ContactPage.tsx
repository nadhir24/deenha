import SEOHead from '../components/SEOHead';

const ContactPage = () => {
    
    return (
        <main className="pt-44 pb-24 bg-white dark:bg-primary transition-colors duration-300">
            <SEOHead title={`Contact Us - DEENHA`} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">Get in Touch</span>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight mb-8 italic text-primary dark:text-white">Contact Us</h1>
                
                <div className="grid md:grid-cols-2 gap-20 mt-24 text-left">
                    <div>
                        <h2 className="font-display text-3xl mb-8 text-primary dark:text-white">Customer Support</h2>
                        <p className="text-secondary dark:text-white/75 mb-8 leading-relaxed">
                            Our team is available to assist you with order inquiries, product details, and more.
                        </p>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-[10px] uppercase font-bold tracking-widest text-accent-gold mb-2">WhatsApp</h3>
                                <a href="https://wa.me/6281919234222" className="text-xl font-medium text-primary dark:text-white hover:text-accent-gold transition-colors">+62 819 1923 4222</a>
                            </div>
                            <div>
                                <h3 className="text-[10px] uppercase font-bold tracking-widest text-accent-gold mb-2">Email</h3>
                                <p className="text-xl font-medium text-primary dark:text-white">care@deenha.com</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-surface-secondary dark:bg-white/5 p-12 rounded-sm">
                        <h2 className="font-display text-3xl mb-8 text-primary dark:text-white">Atelier Address</h2>
                        <p className="text-secondary dark:text-white/75 leading-relaxed text-lg">
                            Komplek Adi Bumi Graha<br />
                            Bandung, West Java<br />
                            Indonesia 40292
                        </p>
                        <div className="mt-12">
                            <h3 className="text-[10px] uppercase font-bold tracking-widest text-accent-gold mb-4">Opening Hours</h3>
                            <p className="text-secondary dark:text-white/75 text-sm uppercase tracking-widest">Mon - Sat: 09:00 - 17:00 (GMT+7)</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;
