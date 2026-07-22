import { Link, useParams } from 'react-router-dom';
import { abstractItems, heritageItems, newSeriesItems } from '../data/worldSeries';
import { useSiteSettings } from '../hooks/useSiteSettings';
import SEOHead from '../components/SEOHead';

const maps = {
    heritage: { title: 'Heritage Textile Worlds', copy: 'Five textile environments, each centered on pattern, material, drape, and contemporary wearability.', items: heritageItems },
    'new-series': { title: 'New Series', copy: 'Contemporary collections inspired by place, atmosphere, architecture, and visual memory.', items: newSeriesItems },
    abstract: { title: 'Abstract New Arrivals', copy: 'A configurable gallery for future photography exploring color, fold, light, and movement.', items: abstractItems },
};

const WorldCollectionPage = () => {
    const { group } = useParams<{ group: keyof typeof maps }>();
    const { settings } = useSiteSettings();
    const content = group ? maps[group] : undefined;
    if (!content) return null;

    return (
        <main className="min-h-[100dvh] bg-world-ink px-5 pb-24 pt-32 text-world-paper md:px-12">
            <SEOHead title={content.title} description={content.copy} canonicalPath={`/world/${group}`} />
            <div className="mx-auto max-w-[1440px]">
                <Link to="/world" className="text-xs uppercase tracking-[0.16em] text-world-paper/55">All worlds</Link>
                <h1 className="mt-8 max-w-5xl font-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.84] tracking-[-0.05em]">{content.title}</h1>
                <p className="mt-8 max-w-xl text-base leading-7 text-world-paper/65">{content.copy}</p>
                <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {content.items.filter((item) => settings.world_series?.collections?.[item.slug.replace(/-/g, '_')] !== false).map((item, index) => (
                        <Link key={item.slug} to={`/world/${group}/${item.slug}`} className={`group relative overflow-hidden bg-world-charcoal ${index === 0 ? 'md:col-span-2 xl:col-span-2' : ''}`}>
                            <div className={`${index === 0 ? 'min-h-[34rem]' : 'min-h-[25rem]'} relative`}>
                                {item.image ? <img src={item.image} alt={item.title} loading={index === 0 ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-80" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(113,128,147,.6),transparent_38%),radial-gradient(circle_at_75%_70%,rgba(169,101,78,.35),transparent_42%)]" />}
                                <div className="absolute inset-0 bg-gradient-to-t from-world-ink via-transparent to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-6 md:p-9"><p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-paper/60">{item.eyebrow}</p><h2 className="mt-3 font-display text-5xl md:text-6xl">{item.title}</h2><p className="mt-3 max-w-md text-sm leading-6 text-world-paper/65">{item.description}</p></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default WorldCollectionPage;
