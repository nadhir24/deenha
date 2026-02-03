import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
    type: 'video' | 'image';
    src: string;
    title: string;
    subtitle: string;
    description: string;
}

const slides: Slide[] = [
    {
        type: 'video',
        src: "/video/promo_video.mp4",
        title: "",
        subtitle: "",
        description: "."
    },
    {
        type: 'video',
        src: "/video/summer_collection.mp4",
        title: "",
        subtitle: "",
        description: "."
    },
    {
        type: 'video',
        src: "/video/vintage_flower.mp4",
        title: "",
        subtitle: "",
        description: "  ."
    },
    {
        type: 'video',
        src: "/video/pashmina_crinkle.mp4",
        title: "",
        subtitle: "",
        description: ""
    },
    {
        type: 'video',
        src: "/video/hampers_mukena.mp4",
        title: "",
        subtitle: "",
        description: ""
    },
    {
        type: 'image',
        src: "/images/page.webp",
        title: " ",
        subtitle: " ",
        description: ""
    },
    {
        type: 'image',
        src: "/images/best-seller-YNqByrwR79CoVBqN.jpg",
        title: " ",
        subtitle: " ",
        description: ""
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Auto advance slides
    useEffect(() => {
        const currentSlideData = slides[currentSlide];

        // Only set timer for images, let videos play until finish
        if (currentSlideData.type === 'image') {
            const timer = setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 6000); // 6 seconds for images
            return () => clearTimeout(timer);
        }
    }, [currentSlide]);

    // Handle video playback on slide change
    useEffect(() => {
        if (videoRef.current && slides[currentSlide].type === 'video') {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {
                // Autoplay might be blocked, that's okay
            });
        }
        setIsVideoLoaded(false);
    }, [currentSlide]);

    const handleVideoLoad = () => {
        setIsVideoLoaded(true);
    };

    const handleVideoEnded = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Background Media Slider */}
            <div className="absolute inset-0 z-0">
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
                            <>
                                <video
                                    ref={videoRef}
                                    src={slides[currentSlide].src}
                                    className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    autoPlay
                                    muted={isMuted}
                                    playsInline
                                    onLoadedData={handleVideoLoad}
                                    onEnded={handleVideoEnded}
                                />
                                {/* Fallback while video loads */}
                                {!isVideoLoaded && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-black to-primary animate-pulse" />
                                )}
                            </>
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

                        {/* Premium Gradient Overlays - Luxury Fashion Style */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Sound Toggle Button - For Videos */}
            {slides[currentSlide].type === 'video' && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    onClick={toggleMute}
                    className="absolute top-32 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                    title={isMuted ? "Unmute" : "Mute"}
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
                <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/60 flex items-center gap-2">
                    {slides[currentSlide].type === 'video' ? (
                        <>
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            Now Playing
                        </>
                    ) : (
                        <>
                            <span className="w-2 h-2 bg-accent-gold rounded-full" />
                            Lookbook
                        </>
                    )}
                </span>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center">
                {/* Text Content */}
                <div className="min-h-[350px] flex flex-col justify-center items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center"
                        >
                            {/* Text removed for clean look */}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Static Elements */}
                <div className="mt-12 flex flex-col items-center">
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                        <motion.a
                            href="/shop"
                            className="bg-accent-gold text-white rounded-none px-12 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Shop Collection
                        </motion.a>
                        <motion.a
                            href="/about"
                            className="border border-white/40 text-white rounded-none px-12 py-4 text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-500"
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Our Story
                        </motion.a>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex gap-3 items-center">
                        {slides.map((slide, index) => (
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
                    <span className="text-[10px] uppercase font-bold tracking-[0.5em] -rotate-90 origin-center translate-y-8">Scroll</span>
                </motion.div>
            </div>

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
