import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const articles = {
    "guide-to-premium-voal": {
        title: "The Ultimate Guide to Premium Voal: Why the Eliza Series is a Wardrobe Essential",
        category: "Fabric Guide",
        date: "March 9, 2026",
        image: "/images/image-1-m5KMww5a1eHrGa7j.jpg",
        content: `
            <p>Voal has long been a favorite among hijab-wearing women, but not all voal is created equal. At DEENHA, we spent months sourcing the perfect blend for our Eliza series. The result? A fabric that redefined our expectations of what a daily scarf can be.</p>
            
            <h3>What makes Premium Voal different?</h3>
            <p>Most standard voal scarves can feel stiff or, conversely, too limp to hold a shape. Premium voal is characterized by its high thread count and unique weave. This gives the Eliza series its signature "stay-up" quality—it stands perfectly on the forehead without needing pins to hold the peak in place.</p>

            <h3>Styling your Eliza Scarf</h3>
            <p>The beauty of the Eliza series lies in its versatility. For a professional look, try the classic wrap-around style. The fabric's natural grip ensures it won't slip throughout the day, even without an underscarf.</p>
            
            <p>For a more casual weekend look, a loose drape allows the soft texture of the voal to shine. Because it's so breathable, it's the ideal choice for outdoor gatherings or busy days running errands in the city.</p>

            <h3>How to care for your Voal</h3>
            <p>To keep your Eliza series looking new, we recommend hand washing in cool water. Avoid wringing the fabric; instead, lay it flat to dry. This preserves the delicate fibers and ensures the scarf keeps its perfect shape for years to come.</p>
        `
    },
    "mastering-luna-silk": {
        title: "Mastering the Luna Silk: Elegant Draping for Special Occasions",
        category: "Style Tips",
        date: "March 8, 2026",
        image: "/images/image-2-A85ewwvLJairzx6O.jpg",
        content: `
            <p>There is something undeniably sophisticated about the natural sheen of silk. The Luna Silk Scarf collection was designed for those moments that require an extra touch of luxury—weddings, Eid celebrations, and formal dinners.</p>
            
            <h3>The Art of the Silk Drape</h3>
            <p>Silk is famous for its flow. Unlike voal, which is structured, silk is all about movement. To master the Luna Silk, focus on styles that allow the fabric to "puddle" slightly at the shoulders. A single-side pin at the shoulder can create a stunning, asymmetrical look that highlights the fabric's glow.</p>

            <h3>Staying Comfortable in Silk</h3>
            <p>One common misconception is that silk is "hot." On the contrary, pure high-quality silk is a natural fiber that regulates temperature. Our Luna collection uses a silk-blend that offers the breathability of cotton with the luster of silk, making it comfortable even for long events.</p>

            <h3>Maintenance Tips</h3>
            <p>Silk is precious. Always use a steamer instead of a hot iron to remove wrinkles. Steaming protects the fibers and restores the natural bounce of the fabric. Store your Luna scarves hanging up or rolled loosely to prevent permanent creases.</p>
        `
    },
    "travel-modesty-essentials": {
        title: "Travel Modesty Made Simple: Why Our Bergo and Pray Set are Must-Haves",
        category: "Lifestyle",
        date: "March 7, 2026",
        image: "/images/bergo-A1aPwKX8JgfWab9g.png",
        content: `
            <p>Traveling as a hijabi often involves a delicate balance: you want to be comfortable for long flights, but you also need to be ready for prayer and sudden outings. This is where the DEENHA Travel System comes in.</p>
            
            <h3>The Magic of the Ironless Bergo</h3>
            <p>Our Mariam and Amira Bergos are the ultimate travel companions. Made from a specialized knit that resists wrinkles, you can pull them straight out of your suitcase and look instantly polished. The pin-less design means no more fumbling with small accessories at airport security or in a moving vehicle.</p>

            <h3>The Compact Pray Set</h3>
            <p>Finding a clean, comfortable place to pray while traveling can be a challenge. Our Fatima Pray Set is designed to be your "spiritual sanctuary" on the go. It's crafted from ultra-lightweight fabric that folds down into a tiny pouch, easily fitting into your carry-on or handbag.</p>

            <h3>Packing Like a Pro</h3>
            <p>When packing for a 3-day trip, we recommend:
            <ul>
                <li>1 Amira Bergo for the flight</li>
                <li>1 Eliza Voal Scarf for a formal dinner</li>
                <li>1 Fatima Travel Pray Set</li>
            </ul>
            With these three items, you are covered for every scenario without overpacking.</p>
        `
    }
};

const JournalDetailsPage = () => {
    const { slug } = useParams();
    const article = articles[slug as keyof typeof articles];

    if (!article) {
        return (
            <div className="pt-44 pb-24 text-center">
                <h1 className="text-2xl font-display">Story Not Found</h1>
                <Link to="/journal" className="mt-4 text-accent-gold uppercase text-[10px] font-bold tracking-widest block">Back to Journal</Link>
            </div>
        );
    }

    return (
        <main className="pt-44 pb-24 bg-white">
            <SEOHead
                title={`${article.title} - DEENHA Journal`}
                description={article.title}
                ogImage={`https://www.deenha.com${article.image}`}
            />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="max-w-3xl mx-auto">
                    <Link to="/journal" className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.3em] text-secondary hover:text-accent-gold transition-colors mb-12">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back to Journal
                    </Link>

                    <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest mb-6">
                        <span className="text-accent-gold">{article.category}</span>
                        <span className="text-secondary/40">•</span>
                        <span className="text-secondary/60">{article.date}</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-12 leading-tight">
                        {article.title}
                    </h1>

                    <div className="aspect-[16/9] overflow-hidden bg-surface-secondary mb-16">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div 
                        className="prose prose-lg max-w-none journal-content text-secondary italic leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    <div className="mt-20 pt-12 border-t border-black/5 flex justify-between items-center">
                        <div className="flex gap-4">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary opacity-40">Share:</span>
                            <button className="text-[10px] uppercase font-bold tracking-widest hover:text-accent-gold transition-colors">Instagram</button>
                            <button className="text-[10px] uppercase font-bold tracking-widest hover:text-accent-gold transition-colors">WhatsApp</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default JournalDetailsPage;
