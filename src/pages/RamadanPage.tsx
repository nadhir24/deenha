import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Benefits from '../components/home/Benefits';
import FeaturedProducts from '../components/home/FeaturedProducts';

const RamadanPage = () => {
    return (
        <main className="bg-[#FCFCFC] dark:bg-primary transition-colors duration-300">
            <SEOHead
                title="Ramadan Collection 2026 - DEENHA"
                description="Rayakan bulan suci dengan koleksi Ramadan 2026 DEENHA. Mukena, Scarves, dan Hampers eksklusif dengan sentuhan warisan budaya."
                canonicalPath="/ramadan"
            />
            {/* Hero Section - Split Layout for Premium Feel */}
            <section className="relative min-h-[90vh] grid grid-cols-1 lg:grid-cols-2">
                {/* Left Content */}
                <div className="relative z-10 flex flex-col justify-center px-6 lg:px-20 py-20 bg-white dark:bg-primary order-2 lg:order-1 transition-colors duration-300">
                    {/* Decorative Islamic Pattern Watermark */}
                    <div className="absolute top-0 left-0 w-64 h-64 opacity-[0.03] pointer-events-none">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M100 0L122.47 77.53L200 100L122.47 122.47L100 200L77.53 122.47L0 100L77.53 77.53Z" />
                        </svg>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                            <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-[0.3em]">
                                The Holy Month
                            </span>
                        </div>

                        <h1 className="font-display text-6xl lg:text-8xl text-[#1A1A1A] dark:text-white leading-[1.1] mb-8">
                            Graceful <br />
                            <span className="italic text-[#D4AF37] font-serif">Modesty</span> <br />
                            For Ramadan
                        </h1>

                        <p className="text-gray-600 dark:text-white/75 text-lg leading-relaxed max-w-lg mb-12 font-light">
                            Embrace the spiritual journey with our exclusive 2026 Ramadan Collection.
                            Featuring heritage motifs, breathable luxurious fabrics, and timeless silhouettes
                            crafted for your comfort during prayers and gatherings.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link
                                to="/shop"
                                className="group relative px-10 py-5 bg-[#1A1A1A] text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/20"
                            >
                                <span className="relative z-10 text-sm font-bold tracking-[0.2em] uppercase">Shop Collection</span>
                                <div className="absolute inset-0 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </Link>

                            <button className="group flex items-center gap-3 px-6 py-5 text-[#1A1A1A] dark:text-white hover:text-[#D4AF37] transition-colors">
                                <span className="text-sm font-bold tracking-[0.2em] uppercase">View Lookbook</span>
                                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Image - Hero Visual */}
                <div className="relative h-[60vh] lg:h-auto overflow-hidden order-1 lg:order-2">
                    <div className="absolute inset-0 bg-black/10 z-10"></div>
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        src="/images/hampers-1-dWxvylrBJ6IBxzqB.jpg"
                        alt="Ramadan Collection"
                        className="w-full h-full object-cover"
                    />

                    {/* Floating Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute bottom-12 left-12 z-20 bg-white/90 dark:bg-primary/90 backdrop-blur-md p-8 max-w-xs shadow-xl border-l-4 border-[#D4AF37] hidden md:block"
                    >
                        <p className="font-display text-2xl mb-2 text-[#1A1A1A] dark:text-white">Hampers Series</p>
                        <p className="text-sm text-gray-600 dark:text-white/75 mb-4">The perfect gift of elegance for your loved ones.</p>
                        <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest border-b border-[#D4AF37] pb-1">Discover</span>
                    </motion.div>
                </div>
            </section>

            {/* Ornamental Section Break */}
            <div className="relative py-24 overflow-hidden bg-white dark:bg-primary transition-colors duration-300">
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <span className="font-display text-[20vw] leading-none select-none text-[#D4AF37]">KAREEM</span>
                </div>

                <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Prayer Sets', img: '/images/prayset-mnlWv3KxDvf1NbQn.png', desc: 'Comfortable & Elegant' },
                            { title: 'Heritage Scarves', img: '/images/heritage-design-Aq2WvB4Gj1flwP1L.jpg', desc: 'Timeless Motifs' },
                            { title: 'Signature Dresses', img: '/images/dress-YD0l6pXPkZSqM41l.png', desc: 'Modest Sophistication' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="group relative aspect-[4/5] overflow-hidden bg-[#F5F5F5] dark:bg-white/5"
                            >
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full border-t border-white/10">
                                    <p className="text-white/75 text-xs uppercase tracking-[0.2em] mb-2">{item.desc}</p>
                                    <h3 className="font-display text-2xl text-white italic">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reuse Benefits */}
            <Benefits />

            {/* Products Section */}
            <section className="py-24 bg-[#FCFCFC] dark:bg-primary transition-colors duration-300">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#D4AF37]/30 mb-6">
                        <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-[#1A1A1A] dark:text-white mb-4">
                        Ramadan Essentials
                    </h2>
                    <p className="text-gray-500 dark:text-white/40 font-light max-w-xl mx-auto">
                        Curated pieces to elevate your style during this blessed month.
                    </p>
                </div>
                <FeaturedProducts />
            </section>
        </main>
    );
};

export default RamadanPage;
