import { motion } from 'framer-motion';

const AboutPage = () => {
    const ethos = [
        {
            number: '01',
            title: 'Empowering Confidence',
            text: 'Deenha is crafted to elevate the confidence of every woman. With its elegant designs, soft textures, and vibrant hues, Deenha embraces femininity, making you feel graceful and poised with every wear.'
        },
        {
            number: '02',
            title: 'Global Inspiration',
            text: 'Deenha draws inspiration from global heritage, blending timeless designs with cultural richness from around the world. Each piece reflects a unique story, creating an elegant fusion of tradition and contemporary style.'
        },
        {
            number: '03',
            title: 'Our Mission',
            text: "Our mission is to create high-quality clothing for Muslim women, blending elegance and comfort to empower every wearer with confidence and style."
        }
    ];

    return (
        <main className="pt-44">
            {/* Header / Hero Section for About Page */}
            <section className="bg-surface-secondary py-24 mb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">
                        Our Identity
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight mb-8 italic">
                        The Story of Deenha
                    </h1>
                </div>
            </section>

            <section className="py-12 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main Story Grid */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                        {/* Image Column */}
                        <motion.div
                            className="relative order-2 lg:order-1"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <div className="aspect-[4/5] overflow-hidden bg-surface-secondary shadow-2xl">
                                <img
                                    src="/images/our-mission-d951KpkZjLHz3841.jpg"
                                    alt="Deenha Brand Story"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent-gold/5 -z-10" />
                        </motion.div>

                        {/* Text Column */}
                        <motion.div
                            className="order-1 lg:order-2"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">
                                The Narrative
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-5xl font-normal tracking-tight mb-8">
                                Elegance in Every <span className="italic">Thread</span>
                            </h2>
                            <div className="space-y-6 text-secondary leading-relaxed text-lg">
                                <p>
                                    Deenha Hijab offers a stunning collection that embodies elegance and sophistication.
                                    Crafted with the utmost care, each piece is designed with soft and vibrant materials,
                                    ensuring both comfort and style.
                                </p>
                                <p>
                                    Our scarves come in a variety of exquisite motifs, making it easy to find
                                    the perfect match for any occasion. Not just limited to scarves, Deenha also
                                    presents a beautifully curated range of pray sets and dresses, each piece
                                    reflecting timeless elegance and attention to detail.
                                </p>
                                <p className="font-medium text-primary">
                                    Whether you're looking to elevate your daily wear or prepare for a special event,
                                    Deenha Hijab brings you a world of versatility and grace.
                                </p>
                            </div>
                            <div className="mt-10 border-t border-black/5 pt-8">
                                <p className="font-display italic text-xl text-primary">— THE DEENHA TEAM</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Our Ethos Section */}
                    <div className="pt-20 border-t border-black/5 mb-24">
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">
                                Core Philosophy
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight">Our Ethos</h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
                            {ethos.map((item, index) => (
                                <motion.div
                                    key={item.number}
                                    className="relative group"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <span className="absolute -top-10 left-0 font-display text-8xl text-black/[0.03] pointer-events-none group-hover:text-accent-gold/10 transition-colors duration-500">
                                        {item.number}
                                    </span>
                                    <h3 className="font-display text-2xl mb-4 text-primary relative z-10">
                                        {item.title}
                                    </h3>
                                    <p className="text-secondary leading-relaxed text-sm lg:text-base relative z-10">
                                        {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
