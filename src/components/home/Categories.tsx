import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';

const Categories = () => {
    return (
        <section className="py-24 bg-white" id="collections">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">
                        Our Collections
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
                        Exquisite Variety
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                        >
                            <Link
                                to={`/shop?category=${category.name}`}
                                className="group relative h-[500px] overflow-hidden cursor-pointer block"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    {/* Sophisticated Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-end p-10 text-white text-center">
                                    <div
                                        className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700"
                                    >
                                        <h3 className="font-display text-4xl md:text-3xl font-normal mb-2 italic">
                                            {category.name}
                                        </h3>
                                        <div className="w-8 h-[1px] bg-accent-gold mx-auto mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                            Explore Collection
                                        </span>
                                    </div>
                                </div>

                                {/* Subtle Frame on Hover */}
                                <div className="absolute inset-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
