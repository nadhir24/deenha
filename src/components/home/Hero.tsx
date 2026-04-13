import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { useTranslation } from 'react-i18next';

interface Slide {
    type: 'video' | 'image';
    src: string;
    title: string;
    subtitle: string;
    description: string;
}

const DEFAULT_SLIDES: Slide[] = [
    {
        type: 'video',
        src: "/videos/promo_video.mp4",
        title: "The Art of Modesty",
        subtitle: "New Collection",
        description: "Where elegance meets devotion"
    },
    {
        type: 'video',
        src: "/videos/summer_collection.mp4",
        title: "Warisan Nusantara",
        subtitle: "Heritage Series",
        description: "Inspired by Indonesian textile traditions"
    },
    {
        type: 'video',
        src: "/videos/vintage_flower.mp4",
        title: "Vintage Florals",
        subtitle: "Timeless Beauty",
        description: "Delicate prints for the modern woman"
    },
    {
        type: 'video',
        src: "/videos/pashmina_crinkle.mp4",
        title: "Pashmina Crinkle",
        subtitle: "Everyday Luxury",
        description: "Effortless style, exceptional comfort"
    },
    {
        type: 'video',
        src: "/videos/hampers_mukena.mp4",
        title: "Luxury Hampers",
        subtitle: "The Perfect Gift",
        description: "Curated sets for every occasion"
    }
];

const VideoSlide = ({ src, onLoaded, isMuted }: { src: string; onLoaded: () => void; isMuted: boolean }) => {
    return (
        <video
            src={src}
            className="w-full h-full object-cover transition-opacity duration-1000 opacity-100"
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={onLoaded}
        />
    );
};

const Hero = () => {
    const { t } = useTranslation();
    const { settings, loading: settingsLoading } = useSiteSettings();
    const slides = settings.hero_slides || DEFAULT_SLIDES;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax Transforms
    const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scaleVideo = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    if (settingsLoading && !settings.hero_slides) return <div className="h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-2 border-white/20 border-t-white animate-spin rounded-full"></div></div>;

    const handleVideoEnded = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Layer 1: Background Media Slider (Back) */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: yVideo, scale: scaleVideo }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        {slides[currentSlide].type === 'video' ? (
                            <VideoSlide
                                src={slides[currentSlide].src}
                                onLoaded={handleVideoEnded}
                                isMuted={isMuted}
                            />
                        ) : (
                            <motion.img
                                src={slides[currentSlide].src}
                                alt="Background"
                                className="w-full h-full object-cover"
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1.0 }}
                                transition={{ duration: 6, ease: "linear" }}
                            />
                        )}

                        {/* Premium Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Layer 3: Main Content (Front) */}
            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center"
                style={{ y: yText, opacity: opacityText }}
            >
                {/* Text Content */}
                <div className="min-h-[350px] flex flex-col justify-center items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            {slides[currentSlide].subtitle && (
                                <motion.span
                                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                                    animate={{ opacity: 1, letterSpacing: "0.5em" }}
                                    className="text-[10px] md:text-[12px] uppercase font-bold text-accent-gold mb-6 tracking-[0.5em]"
                                >
                                    {slides[currentSlide].subtitle}
                                </motion.span>
                            )}
                            {slides[currentSlide].title && (
                                <motion.h1
                                    className="font-display text-4xl md:text-7xl lg:text-8xl font-normal leading-tight mb-8 tracking-tighter"
                                >
                                    {slides[currentSlide].title.split(' ').map((word: string, i: number) => (
                                        <span key={i} className={i % 2 === 1 ? 'italic font-light' : ''}>
                                            {word}{' '}
                                        </span>
                                    ))}
                                </motion.h1>
                            )}
                            {slides[currentSlide].description && (
                                <motion.p
                                    className="text-[12px] md:text-[14px] uppercase tracking-[0.3em] font-medium text-white/80 max-w-xl mx-auto"
                                >
                                    {slides[currentSlide].description}
                                </motion.p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Static Elements */}
                <div className="mt-12 flex flex-col items-center">
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                        <motion.a
                            href="/shop"
                            className="text-[11px] uppercase tracking-[0.4em] font-medium text-white border-b border-white/50 pb-2 hover:border-accent-gold hover:text-accent-gold transition-all duration-500"
                            whileHover={{ y: -2 }}
                        >
                            {t('hero.view_collection')}
                        </motion.a>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex gap-3 items-center">
                        {slides.map((slide: Slide, index: number) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className="group relative py-4 focus:outline-none"
                                title={slide.title}
                            >
                                <div className="relative">
                                    {/* Video indicator dot */}
                                    {slide.type === 'video' && (
                                        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${currentSlide === index ? 'bg-red-500' : 'bg-white/30'}`} />
                                    )}
                                    <div className={`h-[2px] transition-all duration-500 ${currentSlide === index
                                        ? 'w-12 bg-accent-gold'
                                        : 'w-6 bg-white/20 group-hover:bg-white/40'
                                        }`} />
                                </div>
                                <span className={`absolute -bottom-4 left-0 text-[9px] font-bold tracking-widest transition-opacity duration-500 ${currentSlide === index ? 'opacity-100 text-accent-gold' : 'opacity-0'
                                    }`}>
                                    0{index + 1}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 flex flex-col items-center gap-4 text-white/40"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-accent-gold to-transparent" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.5em] -rotate-90 origin-center translate-y-8">{t('hero.scroll')}</span>
                </motion.div>
            </motion.div>

            {/* Sound Toggle Button - For Videos */}
            {slides[currentSlide].type === 'video' && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    onClick={toggleMute}
                    className="absolute top-32 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                    title={isMuted ? t('hero.unmute') : t('hero.mute')}
                >
                    {isMuted ? (
                        <svg className="w-5 h-5 text-white group-hover:text-accent-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-white group-hover:text-accent-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                    )}
                </motion.button>
            )}

            {/* Video/Image Indicator Badge */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-32 left-6 z-20"
            >
                <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/75 flex items-center gap-2">
                    {slides[currentSlide].type === 'video' ? (
                        <>
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            {t('hero.playing')}
                        </>
                    ) : (
                        <>
                            <span className="w-2 h-2 bg-accent-gold rounded-full" />
                            {t('hero.catalog')}
                        </>
                    )}
                </span>
            </motion.div>

            {/* Progress Bar for Video */}
            {slides[currentSlide].type === 'video' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                    <motion.div
                        className="h-full bg-accent-gold"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5 }}
                        layoutId="activeSlideIndicator"
                    />
                </div>
            )}
        </section>
    );
};


export default Hero;
