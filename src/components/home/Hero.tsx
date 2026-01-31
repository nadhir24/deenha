import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        image: "/images/page.webp",
        title: "Feel Confident",
        subtitle: "Look Radiant",
        description: "Discover premium modest fashion crafted for the modern woman. Elegant designs that celebrate your unique style."
    },
    {
        image: "/images/new-arrival-mv0WD7ngy7FZoWXE.jpg",
        title: "Summer 2024",
        subtitle: "New Collection",
        description: "Explore our latest pieces designed for elegance and maximum comfort in every occasion."
    },
    {
        image: "/images/best-seller-YNqByrwR79CoVBqN.jpg",
        title: "Best Loved",
        subtitle: "Signature Styles",
        description: "Join our global community of women who choose quality and sophistication every day."
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image Slider */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <motion.img
                            src={slides[currentSlide].image}
                            alt="Background"
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1.05 }}
                            transition={{ duration: 6, ease: "linear" }}
                        />
                        {/* Premium Gradient Overlay inspired by high-end fashion sites */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
                        <div className="absolute inset-0 bg-black/10" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center">
                {/* Text Content - Elegant & Balanced */}
                <div className="min-h-[350px] flex flex-col justify-center items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="flex flex-col items-center"
                        >
                            {/* Decorative Line */}
                            <motion.div
                                className="w-12 h-[1px] bg-accent-gold mb-8"
                                initial={{ width: 0 }}
                                animate={{ width: 48 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            />

                            {/* Main Title - Playfair Display */}
                            <div className="mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                                <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight mb-2 italic">
                                    {slides[currentSlide].title}
                                </h1>
                                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] uppercase text-accent-gold">
                                    {slides[currentSlide].subtitle}
                                </h2>
                            </div>

                            {/* Description - Modern Sans-serif with tight balance */}
                            <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-md">
                                {slides[currentSlide].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Static Elements - Fixed for stability */}
                <div className="mt-12 flex flex-col items-center">
                    {/* CTA Buttons - Luxury Style */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                        <motion.a
                            href="/shop"
                            className="bg-accent-gold text-white rounded-none px-12 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Explore Now
                        </motion.a>
                        <motion.a
                            href="/about"
                            className="border border-white/40 text-white rounded-none px-12 py-4 text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-500"
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Our Story
                        </motion.a>
                    </div>

                    {/* Minimal Slider Indicators */}
                    <div className="flex gap-4">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`group relative py-4 focus:outline-none`}
                            >
                                <div className={`h-[2px] transition-all duration-500 ${currentSlide === index ? 'w-16 bg-accent-gold' : 'w-8 bg-white/20 group-hover:bg-white/40'}`} />
                                <span className={`absolute -top-4 left-0 text-[10px] font-bold tracking-widest transition-opacity duration-500 ${currentSlide === index ? 'opacity-100 text-accent-gold' : 'opacity-0'}`}>
                                    0{index + 1}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator - Minimalist */}
                <div className="absolute bottom-12 flex flex-col items-center gap-4 text-white/40">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-accent-gold to-transparent" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.5em] -rotate-90 origin-center translate-y-8">Scroll</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
