import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShopSection from '../components/home/ShopSection';
import SEOHead from '../components/SEOHead';
import { heritageItems, worldItemHref } from '../data/worldSeries';

const ScarvesPage = () => {
    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <main className="bg-world-paper pb-20 pt-32 text-world-ink">
            <SEOHead
                title="Scarves Collection"
                description="DEENHA scarves — wastra heritage and daily modest dressing. Explore series stories, then shop the pieces."
                canonicalPath="/scarves"
            />

            <div className="mx-auto max-w-[1440px] px-5 md:px-12">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-gold">The open collection</p>
                <h1 className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.86] tracking-[-0.05em]">Scarves</h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-world-muted">
                    Printed stories for contemporary modest dressing. Mulai dari dunia tekstil, lanjut ke rak harian.
                </p>
            </div>

            {/* From the Worlds — editorial strip, not a raw shop clone header */}
            <section className="mx-auto mt-14 max-w-[1440px] px-5 md:px-12">
                <div className="flex items-end justify-between gap-6 border-b border-world-border pb-5">
                    <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-world-gold">From the Worlds</p>
                        <h2 className="mt-2 font-display text-3xl md:text-4xl">Heritage series</h2>
                    </div>
                    <Link to="/world/heritage" className="hidden text-xs uppercase tracking-[0.14em] text-world-ink underline decoration-world-gold underline-offset-8 sm:inline">
                        All heritage
                    </Link>
                </div>
                <div className="mt-6 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible">
                    {heritageItems.map((item) => (
                        <Link
                            key={item.slug}
                            to={worldItemHref(item)}
                            className="group relative min-w-[9.5rem] flex-shrink-0 overflow-hidden bg-world-ink text-world-paper md:min-w-0"
                        >
                            <div className="relative aspect-[3/4]">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-world-ink via-transparent to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-3">
                                    <p className="font-display text-xl">{item.title}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <div className="mx-auto mt-16 max-w-[1440px] px-5 md:px-12">
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-world-gold">Shop the rack</p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl">Available scarves</h2>
            </div>
            <ShopSection initialCategory="Scarves" hideHeader />
        </main>
    );
};

export default ScarvesPage;
