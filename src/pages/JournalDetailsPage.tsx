import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
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
    "eid-2026-palette-guide": {
        title: "Eid 2026: Choosing the Perfect Palette for Your Family Moments",
        category: "Collections",
        date: "March 8, 2026",
        image: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/Arabic_Series/MAIN_1770873530013_DSCF5668%20Copy.jpg",
        content: `
            <p>Eid is more than a celebration; it's a collection of memories. This year, the trend shifts toward earthy tones and deep, serene colors that symbolize peace and heritage.</p>
            
            <h3>The Arabic Series: A Journey in Color</h3>
            <p>Our Arabic Series features deep maroons, sandy beiges, and midnight blues. For families looking to coordinate, we recommend choosing one "anchor" color—like our Desert Sand—and having family members mix and match within that tonal range.</p>

            <h3>Why Texture Matters</h3>
            <p>In photos, flat colors can often look dull. The intricate patterns in our Arabic Series add depth and dimension to your festive outfit, ensuring you look radiant in every family portrait.</p>
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
        `
    },
    "monogram-professional-style": {
        title: "The Power of Monogram: Elevating Your Professional Modest Look",
        category: "Style Tips",
        date: "March 6, 2026",
        image: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/Monogram_D_Series/1770655455962_IMG_3048.jpg",
        content: `
            <p>In a professional setting, your attire is your silent introduction. The Monogram D Series was created for the woman who wants to project confidence and refined taste without sacrificing her values.</p>
            
            <h3>The Subtlety of the 'D'</h3>
            <p>Our monogram is designed to be elegant, not overwhelming. It creates a pattern that looks like a classic geometric print from a distance, revealing the DEENHA identity only upon closer look. This makes it perfect for pairing with structured blazers and tailored trousers.</p>

            <h3>Choosing Your Professional Shade</h3>
            <p>For the office, we recommend our Cool Grey or Midnight Navy Monogram scarves. These colors are authoritative yet approachable, allowing the monogram detail to serve as a sophisticated accent to your professional ensemble.</p>
        `
    }
};

const JournalDetailsPage = () => {
    const { slug } = useParams();
    const article = articles[slug as keyof typeof articles];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!article) {
        return (
            <div className="pt-44 pb-24 text-center">
                <h1 className="text-2xl font-display">Story Not Found</h1>
                <Link to="/journal" className="mt-4 text-accent-gold uppercase text-[10px] font-bold tracking-widest block">Back to Journal</Link>
            </div>
        );
    }

    const shareUrl = window.location.href;
    const shareText = `Check out this article from DEENHA: ${article.title}`;

    const shareWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard! You can now share it on Instagram.');
    };

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

                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-12 leading-tight italic">
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
                        className="prose prose-lg max-w-none journal-content text-secondary italic leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    <div className="mt-20 pt-12 border-t border-black/5 flex justify-between items-center">
                        <div className="flex gap-6 items-center">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary opacity-40">Share Story:</span>
                            <button 
                                onClick={copyLink}
                                className="text-[10px] uppercase font-bold tracking-widest hover:text-accent-gold transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
                                Instagram (Copy Link)
                            </button>
                            <button 
                                onClick={shareWhatsApp}
                                className="text-[10px] uppercase font-bold tracking-widest hover:text-accent-gold transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default JournalDetailsPage;
