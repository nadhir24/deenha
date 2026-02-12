import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PromoPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after 2 seconds
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem('hasSeenPromo');
            if (!hasSeenPopup) {
                setIsOpen(true);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenPromo', 'true');
    };

    const handleJoinLive = () => {
        window.open('https://www.tiktok.com/@deenha.official', '_blank');
        handleClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Popup Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-black/5 rounded-full transition-colors group"
                        >
                            <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image Side */}
                        <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto relative bg-surface-secondary">
                            <img
                                src="/images/tiktok_live.png"
                                alt="TikTok Live Promo"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                        </div>

                        {/* Text Side */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center text-center">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-[10px] uppercase font-bold tracking-[0.4em] text-accent-gold mb-4"
                            >
                                Exclusive Offer
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="font-display text-3xl md:text-4xl mb-6 leading-tight"
                            >
                                Join Live <br />
                                <span className="italic font-light">TikTok Sekarang</span>
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mb-10"
                            >
                                <div className="text-5xl font-bold text-primary mb-2">50%</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest text-secondary">
                                    Diskon Spesial Selama Live
                                </div>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={handleJoinLive}
                                className="w-full bg-primary text-white py-4 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-accent-gold transition-all duration-500 shadow-xl"
                            >
                                Join Live Sekarang
                            </motion.button>

                            <button
                                onClick={handleClose}
                                className="mt-6 text-[9px] uppercase font-bold tracking-widest text-secondary hover:text-primary transition-colors"
                            >
                                Nanti Saja
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PromoPopup;
