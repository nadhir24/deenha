import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const RamadanPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem('hasSeenRamadan');
            if (!hasSeenPopup) {
                setIsOpen(true);
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenRamadan', 'true');
    };

    const handleShopNow = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleClose();
    };

    // Floating star animation variants
    const starVariants = {
        animate: (i: number) => ({
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
            transition: {
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
            }
        })
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
                        className="absolute inset-0 bg-black/85 backdrop-blur-md"
                    />

                    {/* Popup Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-[720px] bg-[#1A1A1A] overflow-hidden shadow-2xl shadow-[#D4AF37]/10 flex flex-col md:flex-row cursor-default max-h-[90vh] overflow-y-auto"
                    >
                        {/* Decorative border glow */}
                        <div className="absolute inset-0 border border-[#D4AF37]/20 pointer-events-none z-20" />

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 md:top-4 md:right-4 z-30 p-2 bg-black/30 hover:bg-black/60 rounded-full transition-all duration-300 group backdrop-blur-sm border border-white/10"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-[#D4AF37] group-hover:rotate-90 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image Side */}
                        <div className="w-full md:w-[45%] h-56 sm:h-64 md:h-auto relative shrink-0 overflow-hidden">
                            <motion.img
                                initial={{ scale: 1.15 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                src="/images/ramadan_banner.jpg"
                                alt="DEENHA Ramadan Collection"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#1A1A1A]" />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/40 via-transparent to-transparent md:from-transparent" />

                            {/* Floating stars */}
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    variants={starVariants}
                                    animate="animate"
                                    className="absolute text-[#D4AF37]"
                                    style={{
                                        top: `${15 + i * 20}%`,
                                        left: `${10 + i * 18}%`,
                                        fontSize: `${6 + i * 2}px`
                                    }}
                                >
                                    ✦
                                </motion.div>
                            ))}
                        </div>

                        {/* Text Side */}
                        <div className="w-full md:w-[55%] p-6 sm:p-8 md:p-10 flex flex-col justify-center items-center text-center relative">
                            {/* Background decorative Islamic pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <pattern id="islamicPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path fill="#D4AF37" d="M20 0L24.47 15.53L40 20L24.47 24.47L20 40L15.53 24.47L0 20L15.53 15.53Z" />
                                    </pattern>
                                    <rect width="200" height="200" fill="url(#islamicPattern)" />
                                </svg>
                            </div>

                            {/* Crescent Moon Icon */}
                            <motion.div
                                initial={{ opacity: 0, y: -10, rotate: -20 }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="mb-3 md:mb-4"
                            >
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37] mx-auto" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05zm-9.5 6.69A8.14 8.14 0 014.2 5.86a10.14 10.14 0 008.1 9.69 10.14 10.14 0 01-.16 4.14z" />
                                </svg>
                                <div className="flex items-center justify-center gap-2 mt-1">
                                    <motion.span
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-[#D4AF37] text-[6px]"
                                    >✦</motion.span>
                                    <motion.span
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                        className="text-[#D4AF37] text-[8px]"
                                    >✦</motion.span>
                                    <motion.span
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                        className="text-[#D4AF37] text-[6px]"
                                    >✦</motion.span>
                                </div>
                            </motion.div>

                            {/* Label */}
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.5em] text-[#D4AF37] mb-3 md:mb-4"
                            >
                                Ramadan 1447 H
                            </motion.span>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-4 md:mb-5"
                            />

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="font-display text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4 leading-tight text-white"
                            >
                                Marhaban Ya <br />
                                <span className="italic font-light text-[#D4AF37]">Ramadhan</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-[11px] sm:text-xs md:text-sm leading-relaxed text-white/60 mb-5 md:mb-7 max-w-[280px] font-light"
                            >
                                Sambut bulan penuh berkah dengan koleksi terbaru dari DEENHA. Tampil anggun dan syar'i dengan sentuhan elegan yang memancarkan keindahan.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="w-full max-w-[260px]"
                            >
                                <Link
                                    to="/shop"
                                    onClick={handleShopNow}
                                    className="block w-full bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-white py-3 md:py-3.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] hover:from-[#E5C048] hover:to-[#D4AF37] transition-all duration-500 shadow-lg shadow-[#D4AF37]/20 text-center"
                                >
                                    Lihat Koleksi Ramadan
                                </Link>
                            </motion.div>

                            <motion.a
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                href="https://wa.me/6281234567890?text=Assalamualaikum%2C%20saya%20tertarik%20dengan%20koleksi%20Ramadan%20DEENHA"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="mt-3 md:mt-4 flex items-center justify-center gap-2 text-[10px] md:text-[11px] uppercase font-bold tracking-[0.2em] text-green-400 hover:text-green-300 transition-colors group"
                            >
                                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat via WhatsApp
                            </motion.a>

                            <button
                                onClick={handleClose}
                                className="mt-4 md:mt-5 text-[8px] md:text-[9px] uppercase font-bold tracking-widest text-white/30 hover:text-white/60 transition-colors"
                            >
                                Tap untuk menutup
                            </button>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mt-4"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RamadanPopup;
