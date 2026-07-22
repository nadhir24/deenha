import { Link, useParams } from 'react-router-dom';
import { abstractItems, heritageItems, newSeriesItems, type WorldSeriesItem } from '../data/worldSeries';
import { trackMarketplaceClick } from '../lib/analytics';
import TextileVideo from '../components/world/TextileVideo';
import { useSiteSettings } from '../hooks/useSiteSettings';
import SEOHead from '../components/SEOHead';

const allItems = [...heritageItems, ...newSeriesItems, ...abstractItems];

const WorldDetailPage = () => {
    const { group, slug } = useParams<{ group: string; slug: string }>();
    const { settings } = useSiteSettings();
    const expectedKind = group === 'heritage' ? 'heritage' : group === 'new-series' ? 'new-series' : group === 'abstract' ? 'abstract' : undefined;
    const item = allItems.find((entry) => entry.slug === slug && entry.kind === expectedKind && settings.world_series?.collections?.[entry.slug.replace(/-/g, '_')] !== false);
    const isSongket = item?.slug === 'songket';

    if (!item) {
        return <main className="grid min-h-[70dvh] place-items-center bg-world-paper px-6 text-world-ink"><div><h1 className="font-display text-5xl">World not found</h1><Link to="/world" className="mt-6 inline-block underline">Return to worlds</Link></div></main>;
    }

    return (
        <main className="min-h-[100dvh] bg-world-paper text-world-ink">
            <SEOHead title={`${item.title} - DEENHA World Series`} description={item.description} canonicalPath={`/world/${group}/${item.slug}`} ogImage={item.image} />
            <section className="relative min-h-[78dvh] overflow-hidden bg-world-ink text-world-paper">
                {item.image && <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover opacity-55" />}
                <div className="absolute inset-0 bg-gradient-to-t from-world-ink via-world-ink/30 to-world-ink/10" />
                <div className="relative mx-auto flex min-h-[78dvh] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-32 md:px-12 md:pb-20">
                    <Link to={group === 'heritage' ? '/world/heritage' : group === 'new-series' ? '/world/new-series' : '/world/abstract'} className="mb-8 text-xs uppercase tracking-[0.16em] text-world-paper/65">Back to {item.eyebrow}</Link>
                    <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-gold">{item.eyebrow}</p>
                    <h1 className="mt-4 max-w-4xl font-display text-[clamp(4rem,10vw,10rem)] leading-[0.82] tracking-[-0.05em]">{item.title}</h1>
                    <p className="mt-8 max-w-xl text-base leading-7 text-world-paper/75">{item.description}</p>
                </div>
            </section>

            {isSongket ? <SongketStory item={item} /> : <StoryPlaceholder item={item} />}
        </main>
    );
};

const SongketStory = ({ item }: { item: WorldSeriesItem }) => (
    <>
        <section className="bg-world-paper text-world-ink">
            <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-12 md:py-32">
                <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                    <div className="lg:sticky lg:top-28 lg:self-start"><p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-gold">The textile</p><h2 className="mt-5 font-display text-5xl leading-none md:text-7xl">Threads of ceremony, translated for today.</h2></div>
                    <div className="space-y-16 text-base leading-8 text-world-muted">
                        <p>Explore the Songket scarf through pattern, drape, and surface. This collection keeps the textile at the center, then brings it into a contemporary wardrobe.</p>
                        <div className="grid gap-4 sm:grid-cols-2">{heritageItems[0] && [6376, 6379, 6374, 6372].map((number) => <img key={number} src={`${'/images/Warisan%20Nusantara-20260211T044846Z-1-001/Warisan%20Nusantara/Songket%20Scarves%20Series'}/IMG_${number}.jpg`} alt={`Songket detail ${number}`} loading="lazy" className="aspect-square w-full object-cover" />)}</div>
                        <div className="border-t border-world-border pt-8"><h3 className="font-display text-4xl text-world-ink">Discover the collection</h3><p className="mt-4">Explore the available scarves and choose the piece that speaks to your everyday wardrobe.</p><div className="mt-8 flex flex-wrap gap-3"><a href="https://shopee.co.id/deenha" target="_blank" rel="noreferrer" onClick={() => trackMarketplaceClick({ marketplace: 'shopee', productName: item.title, collection: 'Scarves', pageLocation: window.location.pathname, worldType: item.kind })} className="bg-world-ink px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-world-paper">Shop on Shopee</a><a href="https://www.tokopedia.com/deenha" target="_blank" rel="noreferrer" onClick={() => trackMarketplaceClick({ marketplace: 'tokopedia', productName: item.title, collection: 'Scarves', pageLocation: window.location.pathname, worldType: item.kind })} className="border border-world-ink px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em]">Shop on Tokopedia</a></div></div>
                    </div>
                </div>
            </div>
        </section>
        {item.video && <TextileVideo src={item.video} poster={item.image} label="Songket textile film" />}
    </>
);

const StoryPlaceholder = ({ item }: { item: WorldSeriesItem }) => (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-12 md:py-32"><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-gold">Coming into focus</p><h2 className="mt-5 font-display text-5xl leading-none md:text-7xl">A new visual world.</h2></div><div className="space-y-8 text-base leading-8 text-world-muted"><p>{item.kind === 'abstract' ? 'An evolving study of color, folds, light, and textile movement.' : 'A contemporary collection shaped by atmosphere, place, and visual memory.'}</p><div className="grid min-h-72 place-items-center bg-world-ink text-center text-world-paper"><p className="font-display text-4xl">{item.title}</p></div></div></div></section>
);

export default WorldDetailPage;
