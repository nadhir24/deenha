import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTikTokLive } from '../../hooks/useTikTokLive';

const PromoPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLive, loading } = useTikTokLive();

    useEffect(() => {
        // Only trigger the popup if we're live and they haven't seen it THIS session
        if (!loading && isLive) {
            const hasSeenPopup = sessionStorage.getItem('hasSeenPromo');
            const hasSeenRamadan = sessionStorage.getItem('hasSeenRamadan');

            // Show after a delay if Ramadan popup (the main one) has been dealt with
            const timer = setTimeout(() => {
                if (!hasSeenPopup && hasSeenRamadan) {
                    setIsOpen(true);
                }
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isLive, loading]);

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
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 cursor-pointer"
                    onClick={handleClose}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Popup Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-2xl bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row cursor-default max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors group shadow-md"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image Side */}
                        <div className="w-full md:w-1/2 h-56 sm:h-64 md:h-auto relative bg-surface-secondary shrink-0 overflow-hidden">
                            <motion.img
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                src="/images/best-seller-YNqByrwR79CoVBqN.jpg"
                                alt="DEENHA TikTok Live"
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Gradient overlay for mobile */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent md:hidden" />

                            {/* TikTok Live Badge on image */}
                            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.74.02 1.48-.04 2.97-.04 4.44-.38-.05-.77-.01-1.14.04-1.57.21-3.05 1.48-3.3 3.08-.25 1.61.5 3.26 1.82 4.16 1.02.7 2.34.88 3.54.47 1.1-.38 1.98-1.27 2.32-2.36.14-.49.2-1 .18-1.51l-.02-9.56Z" />
                                </svg>
                                <span className="text-white text-[9px] font-bold uppercase tracking-wider">Live Now</span>
                            </div>

                            {/* Discount badge on image */}
                            <motion.div
                                initial={{ scale: 0, rotate: -12 }}
                                animate={{ scale: 1, rotate: -12 }}
                                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                                className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 bg-red-500 text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center shadow-xl"
                            >
                                <span className="text-lg md:text-2xl font-black leading-none">50%</span>
                                <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-wider">OFF</span>
                            </motion.div>
                        </div>

                        {/* Text Side */}
                        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center items-center text-center">
                            {/* TikTok Icon */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-12 h-12 md:w-14 md:h-14 bg-black rounded-xl flex items-center justify-center mb-4 shadow-lg"
                            >
                                <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.74.02 1.48-.04 2.97-.04 4.44-.38-.05-.77-.01-1.14.04-1.57.21-3.05 1.48-3.3 3.08-.25 1.61.5 3.26 1.82 4.16 1.02.7 2.34.88 3.54.47 1.1-.38 1.98-1.27 2.32-2.36.14-.49.2-1 .18-1.51l-.02-9.56Z" />
                                </svg>
                            </motion.div>

                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] text-red-500 mb-2 md:mb-3 flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                Sedang Live
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="font-display text-2xl md:text-3xl mb-3 md:mb-4 leading-tight"
                            >
                                Join Live <br />
                                <span className="italic font-light text-accent-gold">TikTok Sekarang!</span>
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mb-4 md:mb-6"
                            >
                                <div className="flex items-baseline justify-center gap-2 mb-1">
                                    <span className="text-3xl md:text-4xl font-black text-primary">50%</span>
                                    <span className="text-sm md:text-base font-bold text-primary uppercase">OFF</span>
                                </div>
                                <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-secondary">
                                    Diskon Spesial Selama Live
                                </div>
                            </motion.div>

                            {/* Benefits list */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 }}
                                className="w-full space-y-2 mb-5 md:mb-6 text-left max-w-[240px]"
                            >
                                {[
                                    "Harga spesial hanya di Live",
                                    "Gratis ongkir se-Indonesia",
                                    "Bonus exclusive gift"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[10px] md:text-[11px] text-secondary font-medium">{item}</span>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleJoinLive();
                                }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-black text-white py-3 md:py-3.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#FE2C55] transition-all duration-500 shadow-xl flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.74.02 1.48-.04 2.97-.04 4.44-.38-.05-.77-.01-1.14.04-1.57.21-3.05 1.48-3.3 3.08-.25 1.61.5 3.26 1.82 4.16 1.02.7 2.34.88 3.54.47 1.1-.38 1.98-1.27 2.32-2.36.14-.49.2-1 .18-1.51l-.02-9.56Z" />
                                </svg>
                                Join Live Sekarang
                            </motion.button>

                            <button
                                onClick={handleClose}
                                className="mt-3 md:mt-4 text-[8px] md:text-[9px] uppercase font-bold tracking-widest text-secondary/50 hover:text-primary transition-colors"
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
