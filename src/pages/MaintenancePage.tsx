import { motion } from 'framer-motion';

const MaintenancePage = () => {

    return (
        <div className="min-h-screen bg-white dark:bg-primary flex flex-col items-center justify-center relative overflow-hidden px-6 transition-colors duration-500">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-gold/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-gold/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16"
                >
                    <img
                        src="/assets/logo.png"
                        alt="DEENHA"
                        className="h-24 w-auto brightness-0 dark:invert transition-all duration-500"
                    />
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="text-[10px] md:text-[12px] uppercase font-bold text-accent-gold mb-8 tracking-[0.5em] block">
                        Seeking Excellence
                    </span>

                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-normal leading-tight mb-10 tracking-tight text-primary dark:text-white uppercase">
                        Enhancing Your <br />
                        <span className="italic font-light">Experience</span>
                    </h1>

                    <div className="w-12 h-[1px] bg-accent-gold mx-auto mb-10" />

                    <p className="text-secondary dark:text-white/60 text-sm md:text-lg leading-relaxed mb-16 px-4 font-light italic max-w-lg mx-auto">
                        Kami sedang melakukan pemeliharaan sistem berkala untuk memastikan pengalaman berbelanja Anda tetap istimewa dan lancar. Silakan kembali sesaat lagi.
                    </p>

                    {/* Footer Info */}
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 dark:text-white/20">
                            <span>Instagram</span>
                            <span className="w-1 h-1 bg-accent-gold rounded-full" />
                            <span>WhatsApp</span>
                            <span className="w-1 h-1 bg-accent-gold rounded-full" />
                            <span>TikTok</span>
                        </div>

                        <a
                            href="https://wa.me/6281919234222"
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
                    className="absolute bottom-12 text-[9px] uppercase tracking-[0.3em] text-secondary/40 font-medium"
                >
                    &copy; 2026 DEENHA HIJAB. ALL RIGHTS RESERVED.
                </motion.p>
            </div>
        </div>
    );
};

export default MaintenancePage;
