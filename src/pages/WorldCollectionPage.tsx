import { Link, useParams } from 'react-router-dom';
import { abstractItems, heritageItems, newSeriesItems, worldItemHref } from '../data/worldSeries';
import { useSiteSettings } from '../hooks/useSiteSettings';
import SEOHead from '../components/SEOHead';

const maps = {
    heritage: {
        title: 'Heritage Textile Worlds',
        copy: 'Wastra Nusantara — songket, parang, lombok, kawung, borneo — dibaca ulang untuk dipakai setiap hari.',
        items: heritageItems,
    },
    'new-series': {
        title: 'Cities of Islam',
        copy: 'Kota dan memori visual: Hagia Sophia, Cairo, Arabic. Ornament dan atmosfer, bukan kostum.',
        items: newSeriesItems,
    },
    abstract: {
        title: 'Abstract New Arrivals',
        copy: 'Studio studies — coming soon. Belum dibuka di World Series publik.',
        items: abstractItems,
    },
};

const WorldCollectionPage = () => {
    const { group } = useParams<{ group: keyof typeof maps }>();
    const { settings } = useSiteSettings();
    const content = group ? maps[group] : undefined;
    if (!content) {
        return (
            <main className="grid min-h-[70dvh] place-items-center bg-world-paper px-6 text-world-ink">
                <div>
                    <h1 className="font-display text-5xl">Collection not found</h1>
                    <Link to="/" className="mt-6 inline-block underline">
                        Return home
                    </Link>
                </div>
            </main>
        );
    }

    const items = content.items.filter(
        (item) => settings.world_series?.collections?.[item.slug.replace(/-/g, '_')] !== false,
    );

    return (
        <main className="min-h-[100dvh] bg-world-ink px-5 pb-24 pt-32 text-world-paper md:px-12">
            <SEOHead title={content.title} description={content.copy} canonicalPath={`/world/${group}`} />
            <div className="mx-auto max-w-[1440px]">
                <Link to="/" className="text-xs uppercase tracking-[0.16em] text-world-paper/55">
                    Home · World Series
                </Link>
                <h1 className="mt-8 max-w-5xl font-display text-[clamp(3rem,9vw,8rem)] leading-[0.84] tracking-[-0.05em]">
                    {content.title}
                </h1>
                <p className="mt-8 max-w-xl text-base leading-7 text-world-paper/65">{content.copy}</p>

                {items.length === 0 ? (
                    <div className="mt-20 border border-world-paper/15 p-10 text-world-paper/70">
                        <p className="font-display text-3xl">Coming soon</p>
                        <p className="mt-4 max-w-md text-sm leading-6">
                            Series ini belum dibuka. Jelajahi Heritage atau Cities of Islam dari beranda.
                        </p>
                        <Link to="/" className="mt-8 inline-block text-xs uppercase tracking-[0.16em] text-world-gold underline underline-offset-8">
                            Back to home
                        </Link>
                    </div>
                ) : (
                    <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {items.map((item, index) => (
                            <Link
                                key={item.slug}
                                to={worldItemHref(item)}
                                className={`group relative overflow-hidden bg-world-charcoal ${index === 0 ? 'md:col-span-2 xl:col-span-2' : ''}`}
                            >
                                <div className={`${index === 0 ? 'min-h-[28rem] md:min-h-[34rem]' : 'min-h-[22rem] md:min-h-[25rem]'} relative`}>
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            loading={index === 0 ? 'eager' : 'lazy'}
                                            className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(113,128,147,.6),transparent_38%),radial-gradient(circle_at_75%_70%,rgba(169,101,78,.35),transparent_42%)]" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-world-ink via-transparent to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                                        <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-paper/60">{item.eyebrow}</p>
                                        <h2 className="mt-3 font-display text-4xl md:text-6xl">{item.title}</h2>
                                        <p className="mt-3 max-w-md text-sm leading-6 text-world-paper/65">{item.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default WorldCollectionPage;
