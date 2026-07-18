import { motion } from 'framer-motion';

const SHOPEE_URL = 'https://shopee.co.id/deenha';
const TOKOPEDIA_URL = 'https://www.tokopedia.com/deenha';
const WHATSAPP_URL = 'https://wa.me/6281919234222';
const INSTAGRAM_URL = 'https://www.instagram.com/deenha.official/';

const MaintenancePage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-primary flex flex-col items-center justify-center relative overflow-hidden px-6 transition-colors duration-500">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-gold/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-gold/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center py-20">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-14"
                >
                    <img
                        src="/assets/logo.png"
                        alt="DEENHA"
                        className="h-20 w-auto brightness-0 dark:invert transition-all duration-500"
                    />
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full flex flex-col items-center"
                >
                    <span className="text-[10px] md:text-[12px] uppercase font-bold text-accent-gold mb-8 tracking-[0.5em] block">
                        Coming Soon
                    </span>

                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-normal leading-tight mb-10 tracking-tight text-primary dark:text-white uppercase">
                        Website Under <br />
                        <span className="italic font-light">Construction</span>
                    </h1>

                    <div className="w-12 h-[1px] bg-accent-gold mx-auto mb-10" />

                    <p className="text-secondary dark:text-white/75 text-sm md:text-lg leading-relaxed mb-12 px-4 font-light italic max-w-lg mx-auto">
                        Website resmi kami sedang dalam tahap pembangunan. Sementara ini, Anda tetap bisa berbelanja koleksi DEENHA melalui official store kami di Shopee & Tokopedia.
                    </p>

                    {/* Marketplace Redirect Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mb-14">
                        <a
                            href={SHOPEE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto flex-1 bg-[#EE4D2D] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] hover:opacity-90 transition-all duration-300 shadow-xl rounded-sm"
                        >
                            Belanja di Shopee
                        </a>
                        <a
                            href={TOKOPEDIA_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto flex-1 bg-[#42B549] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] hover:opacity-90 transition-all duration-300 shadow-xl rounded-sm"
                        >
                            Belanja di Tokopedia
                        </a>
                    </div>

                    {/* Footer Info */}
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 dark:text-white/20">
                            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">Instagram</a>
                            <span className="w-1 h-1 bg-accent-gold rounded-full" />
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">WhatsApp</a>
                        </div>

                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-accent-gold text-white px-12 py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black dark:hover:bg-white dark:hover:text-primary transition-all duration-500 shadow-xl"
                        >
                            Contact Concierge
                        </a>
                    </div>
                </motion.div>

                {/* Copyright */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-16 text-[9px] uppercase tracking-[0.3em] text-secondary/40 font-medium"
                >
                    &copy; 2026 DEENHA HIJAB. ALL RIGHTS RESERVED.
                </motion.p>
            </div>
        </div>
    );
};

export default MaintenancePage;
