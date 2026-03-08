import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';

const articles = [
    {
        id: 1,
        title: "The Ultimate Guide to Premium Voal: Why the Eliza Series is a Wardrobe Essential",
        excerpt: "Discover the secrets behind high-quality voal fabric. Learn why it stays upright on your forehead and how to style it for maximum elegance.",
        category: "Fabric Guide",
        date: "March 9, 2026",
        image: "/images/image-1-m5KMww5a1eHrGa7j.jpg",
        slug: "guide-to-premium-voal"
    },
    {
        id: 2,
        title: "Mastering the Luna Silk: Elegant Draping for Special Occasions",
        excerpt: "Silk scarves offer a natural sheen and sophisticated drape. Here is your step-by-step guide to maintaining the luxury look of your Luna Silk collection.",
        category: "Style Tips",
        date: "March 8, 2026",
        image: "/images/image-2-A85ewwvLJairzx6O.jpg",
        slug: "mastering-luna-silk"
    },
    {
        id: 3,
        title: "Travel Modesty Made Simple: Why Our Bergo and Pray Set are Must-Haves",
        excerpt: "Traveling doesn't mean compromising on modesty. Explore how our ironless Bergos and compact Pray Sets make every journey more peaceful.",
        category: "Lifestyle",
        date: "March 7, 2026",
        image: "/images/bergo-A1aPwKX8JgfWab9g.png",
        slug: "travel-modesty-essentials"
    }
];

const JournalPage = () => {
    const journalSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "DEENHA Official Journal",
        "description": "Expert guides on premium modest fashion, fabric care, and hijab styling tips by DEENHA.",
        "publisher": {
            "@type": "Organization",
            "name": "DEENHA Official Store"
        },
        "blogPost": articles.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "datePublished": "2026-03-09",
            "image": `https://www.deenha.com${post.image}`,
            "abstract": post.excerpt
        }))
    };

    return (
        <main className="pt-44 pb-24 bg-white">
            <SEOHead
                title="Journal - Style Guides & Fabric Insights"
                description="Explore the DEENHA Journal for expert advice on hijab fabrics, styling tips, and modest fashion trends. Learn more about our Premium Voal and Silk collections."
                canonicalPath="/journal"
                jsonLd={journalSchema}
            />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <header className="mb-20 text-center max-w-3xl mx-auto">
                    <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">The Atelier Stories</span>
                    <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight mb-8 italic">DEENHA Journal</h1>
                    <p className="text-secondary text-sm leading-relaxed">
                        An editorial space dedicated to the art of modest living. From deep-dives into our premium fabrics to curated styling guides, discover the essence of Deenha.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {articles.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group cursor-pointer"
                        >
                            <Link to={`/journal/${post.slug}`}>
                                <div className="aspect-[16/10] overflow-hidden bg-surface-secondary mb-8">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest">
                                        <span className="text-accent-gold">{post.category}</span>
                                        <span className="text-secondary/40">•</span>
                                        <span className="text-secondary/60">{post.date}</span>
                                    </div>
                                    <h2 className="font-display text-2xl group-hover:text-accent-gold transition-colors duration-500 leading-snug">
                                        {post.title}
                                    </h2>
                                    <p className="text-secondary text-sm leading-relaxed line-clamp-3 italic opacity-80">
                                        {post.excerpt}
                                    </p>
                                    <div className="pt-4 flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-primary group-hover:gap-4 transition-all duration-500">
                                        Read Full Story
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default JournalPage;
