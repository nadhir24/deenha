import { Link } from 'react-router-dom';
import { abstractItems, heritageItems, newSeriesItems } from '../data/worldSeries';
import { useSiteSettings } from '../hooks/useSiteSettings';
import SEOHead from '../components/SEOHead';

const groups = [
    { key: 'heritage', title: 'Heritage Textile Worlds', description: 'A living archive of pattern, material, and contemporary drape.', items: heritageItems, href: '/world/heritage' },
    { key: 'new_series', title: 'New Series', description: 'Collections shaped by place, atmosphere, and visual memory.', items: newSeriesItems, href: '/world/new-series' },
    { key: 'abstract', title: 'Abstract New Arrivals', description: 'A space for future studies in color, fold, light, and texture.', items: abstractItems, href: '/world/abstract' },
];

const WorldPage = () => {
    const { settings } = useSiteSettings();
    const visibleGroups = groups.filter((group) => settings.world_series?.worlds?.[group.key] !== false);

    return (
        <main className="min-h-[100dvh] bg-world-paper px-5 pb-24 pt-32 text-world-ink md:px-12">
            <SEOHead title="DEENHA World Series" description="Explore DEENHA Heritage Textile Worlds, New Series, and Abstract New Arrivals." canonicalPath="/world" />
            <div className="mx-auto max-w-[1440px]">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-gold">DEENHA World Series</p>
                <h1 className="mt-5 max-w-3xl font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.86] tracking-[-0.05em]">Enter the worlds.</h1>
                <p className="mt-8 max-w-xl text-base leading-7 text-world-muted">Three spaces for textile, place, and visual exploration. Scarves is the first collection open to the public.</p>

                <div className="mt-20 grid gap-16">
                    {visibleGroups.map((group) => (
                        <section key={group.title}>
                            <div className="flex flex-col justify-between gap-5 border-t border-world-border pt-5 md:flex-row md:items-end">
                                <div>
                                    <h2 className="font-display text-4xl md:text-6xl">{group.title}</h2>
                                    <p className="mt-3 max-w-lg text-sm leading-6 text-world-muted">{group.description}</p>
                                </div>
                                <Link to={group.href} className="text-xs font-semibold uppercase tracking-[0.16em] text-world-ink underline decoration-world-gold underline-offset-8">Explore</Link>
                            </div>
                            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {group.items.filter((item) => settings.world_series?.collections?.[item.slug.replace(/-/g, '_')] !== false).map((item) => (
                                    <Link key={item.slug} to={`${group.href}/${item.slug}`} className="group relative min-h-72 overflow-hidden bg-world-ink text-world-paper">
                                        {item.image && <img src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-85" />}
                                        <div className="absolute inset-0 bg-gradient-to-t from-world-ink via-world-ink/15 to-transparent" />
                                        <div className="relative flex h-full min-h-72 flex-col justify-end p-6">
                                            <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-paper/60">{item.eyebrow}</p>
                                            <h3 className="mt-2 font-display text-4xl">{item.title}</h3>
                                            <p className="mt-2 max-w-xs text-sm leading-6 text-world-paper/70">{item.description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default WorldPage;
