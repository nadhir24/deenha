import { Link, useParams } from 'react-router-dom';
import {
    abstractItems,
    heritageItems,
    newSeriesItems,
    worldGroupPath,
    type WorldSeriesItem,
} from '../data/worldSeries';
import { trackMarketplaceClick } from '../lib/analytics';
import TextileVideo from '../components/world/TextileVideo';
import { useSiteSettings } from '../hooks/useSiteSettings';
import SEOHead from '../components/SEOHead';

const allItems = [...heritageItems, ...newSeriesItems, ...abstractItems];

const WorldDetailPage = () => {
    const { group, slug } = useParams<{ group: string; slug: string }>();
    const { settings } = useSiteSettings();
    const expectedKind =
        group === 'heritage' ? 'heritage' : group === 'new-series' ? 'new-series' : group === 'abstract' ? 'abstract' : undefined;
    const item = allItems.find(
        (entry) =>
            entry.slug === slug &&
            entry.kind === expectedKind &&
            settings.world_series?.collections?.[entry.slug.replace(/-/g, '_')] !== false,
    );

    if (!item) {
        return (
            <main className="grid min-h-[70dvh] place-items-center bg-world-paper px-6 text-world-ink">
                <div>
                    <h1 className="font-display text-5xl">World not found</h1>
                    <Link to="/" className="mt-6 inline-block underline">
                        Return home
                    </Link>
                </div>
            </main>
        );
    }

    const backHref = `/world/${worldGroupPath(item.kind)}`;
    const gallery = (item.gallery && item.gallery.length > 0 ? item.gallery : item.image ? [item.image] : []).slice(0, 8);

    return (
        <main className="min-h-[100dvh] bg-world-paper text-world-ink">
            <SEOHead
                title={`${item.title} - DEENHA World Series`}
                description={item.description}
                canonicalPath={`/world/${group}/${item.slug}`}
                ogImage={item.image}
            />
            <section className="relative min-h-[70dvh] overflow-hidden bg-world-ink text-world-paper md:min-h-[78dvh]">
                {item.image && (
                    <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover opacity-55" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-world-ink via-world-ink/30 to-world-ink/10" />
                <div className="relative mx-auto flex min-h-[70dvh] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-32 md:min-h-[78dvh] md:px-12 md:pb-20">
                    <Link to={backHref} className="mb-8 text-xs uppercase tracking-[0.16em] text-world-paper/65">
                        Back to {item.eyebrow}
                    </Link>
                    <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-gold">{item.eyebrow}</p>
                    <h1 className="mt-4 max-w-4xl font-display text-[clamp(3.25rem,10vw,10rem)] leading-[0.82] tracking-[-0.05em]">
                        {item.title}
                    </h1>
                    <p className="mt-8 max-w-xl text-base leading-7 text-world-paper/75">{item.description}</p>
                </div>
            </section>

            <CollectionStory item={item} gallery={gallery} />
            {item.video && <TextileVideo src={item.video} poster={item.image} label={`${item.title} textile film`} />}
        </main>
    );
};

const CollectionStory = ({ item, gallery }: { item: WorldSeriesItem; gallery: string[] }) => {
    const headline =
        item.kind === 'heritage'
            ? 'Textile at the center, wardrobe around it.'
            : item.kind === 'new-series'
              ? 'Place, light, and ornament — worn daily.'
              : 'A study still coming into focus.';

    const body =
        item.kind === 'heritage'
            ? `Explore ${item.title} through pattern, drape, and surface. This series keeps the wastra readable, then brings it into contemporary modest dressing.`
            : item.kind === 'new-series'
              ? `${item.title} draws from Islamic city memory — architecture, calligraphy, atmosphere — without turning the garment into costume.`
              : item.description;

    return (
        <section className="bg-world-paper text-world-ink">
            <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-12 md:py-28">
                <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-gold">The collection</p>
                        <h2 className="mt-5 font-display text-4xl leading-none md:text-6xl lg:text-7xl">{headline}</h2>
                    </div>
                    <div className="space-y-12 text-base leading-8 text-world-muted md:space-y-16">
                        <p>{body}</p>
                        {gallery.length > 0 ? (
                            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                                {gallery.map((src, index) => (
                                    <img
                                        key={`${src}-${index}`}
                                        src={src}
                                        alt={`${item.title} detail ${index + 1}`}
                                        loading={index < 2 ? 'eager' : 'lazy'}
                                        className={`w-full object-cover ${index === 0 ? 'aspect-[4/5] sm:col-span-2 sm:aspect-[21/9]' : 'aspect-square'}`}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="grid min-h-72 place-items-center bg-world-ink text-center text-world-paper">
                                <p className="font-display text-4xl">{item.title}</p>
                            </div>
                        )}
                        <div className="border-t border-world-border pt-8">
                            <h3 className="font-display text-3xl text-world-ink md:text-4xl">Discover the pieces</h3>
                            <p className="mt-4">
                                Lanjutkan ke Scarves untuk belanja harian, atau marketplace resmi DEENHA.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    to="/scarves"
                                    className="bg-world-ink px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-world-paper"
                                >
                                    Shop Scarves
                                </Link>
                                <a
                                    href="https://shopee.co.id/deenha"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() =>
                                        trackMarketplaceClick({
                                            marketplace: 'shopee',
                                            productName: item.title,
                                            collection: 'Scarves',
                                            pageLocation: window.location.pathname,
                                            worldType: item.kind,
                                        })
                                    }
                                    className="border border-world-ink px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em]"
                                >
                                    Shopee
                                </a>
                                <a
                                    href="https://www.tokopedia.com/deenha"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() =>
                                        trackMarketplaceClick({
                                            marketplace: 'tokopedia',
                                            productName: item.title,
                                            collection: 'Scarves',
                                            pageLocation: window.location.pathname,
                                            worldType: item.kind,
                                        })
                                    }
                                    className="border border-world-ink px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em]"
                                >
                                    Tokopedia
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorldDetailPage;
