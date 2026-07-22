import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { newSeriesItems, heritageItems } from '../../data/worldSeries';
import { useSiteSettings } from '../../hooks/useSiteSettings';

const essentialAssets = [
    heritageItems[0]?.image,
].filter(Boolean) as string[];

const WorldLoader = ({ onReady }: { onReady: () => void }) => {
    const reduceMotion = useReducedMotion();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!essentialAssets.length) {
            onReady();
            return;
        }

        let loaded = 0;
        let cancelled = false;
        const done = () => {
            loaded += 1;
            const next = Math.round((loaded / essentialAssets.length) * 100);
            if (!cancelled) setProgress(next);
            if (loaded >= essentialAssets.length && !cancelled) {
                window.setTimeout(onReady, reduceMotion ? 0 : 380);
            }
        };

        essentialAssets.forEach((src) => {
            if (/\.mp4(?:$|\?)/i.test(src)) {
                const video = document.createElement('video');
                video.preload = 'metadata';
                video.onloadedmetadata = done;
                video.onerror = done;
                video.src = src;
            } else {
                const image = new Image();
                image.onload = done;
                image.onerror = done;
                image.src = src;
            }
        });

        const safety = window.setTimeout(() => {
            if (!cancelled) {
                setProgress(100);
                onReady();
            }
        }, 5000);

        return () => {
            cancelled = true;
            window.clearTimeout(safety);
        };
    }, [onReady, reduceMotion]);

    return (
        <motion.div
            exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col justify-between bg-world-ink px-6 py-8 text-world-paper md:px-12 md:py-10"
            role="status"
            aria-live="polite"
            aria-label={`Preparing DEENHA World Series, ${progress}%`}
        >
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">DEENHA</p>
            <div>
                <p className="mb-3 text-sm text-world-paper/60">Preparing the collection</p>
                <div className="flex items-end justify-between gap-8">
                    <span className="font-display text-[clamp(4rem,13vw,10rem)] leading-none">{progress}</span>
                    <span className="pb-2 text-sm text-world-paper/60">%</span>
                </div>
                <div className="mt-5 h-px w-full bg-white/20">
                    <div className="h-full bg-world-gold transition-[width] duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </motion.div>
    );
};

const WorldPortal = ({
    title,
    subtitle,
    to,
    accent,
    index,
}: {
    title: string;
    subtitle: string;
    to: string;
    accent: string;
    index: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 + index * 0.12, duration: 0.75 }}
        className="world-portal-wrap"
    >
        <Link
            to={to}
            className="world-portal group"
            style={{ '--portal-accent': accent } as React.CSSProperties}
            aria-label={`Explore ${title}`}
        >
            <span className="world-portal-orbit" aria-hidden="true" />
            <span className="relative z-10 block max-w-[15rem]">
                <span className="block text-[0.6875rem] uppercase tracking-[0.16em] text-world-paper/55">{subtitle}</span>
                <span className="mt-3 block font-display text-3xl leading-none md:text-4xl">{title}</span>
            </span>
        </Link>
    </motion.div>
);

const WorldEntrance = () => {
    const reduceMotion = useReducedMotion();
    const { settings } = useSiteSettings();
    const hero = heritageItems[0];
    const portals = useMemo(() => [
        { key: 'heritage', title: 'Heritage', subtitle: 'Textile Worlds', to: '/world/heritage', accent: '#B59A62' },
        { key: 'new_series', title: 'New Series', subtitle: `${newSeriesItems.length} stories`, to: '/world/new-series', accent: '#A9654E' },
        { key: 'abstract', title: 'Abstract', subtitle: 'New Arrival', to: '/world/abstract', accent: '#718093' },
    ].filter((portal) => settings.world_series?.worlds?.[portal.key] !== false), [settings]);

    return (
        <main className="world-root min-h-[100dvh] bg-world-ink text-world-paper">
            <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 pb-16 pt-24 md:px-12 md:pt-28">
                <div className="world-ambient" aria-hidden="true" />
                <motion.div
                    className="absolute inset-y-[8%] left-1/2 w-[min(68vw,54rem)] -translate-x-1/2 overflow-hidden rounded-[50%_50%_12%_12%/32%_32%_10%_10%] opacity-70 md:w-[min(42vw,38rem)]"
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    transition={{ duration: 1.4 }}
                >
                    {hero?.image && <img src={hero.image} alt="DEENHA Songket scarf editorial" className="h-full w-full object-cover object-top grayscale-[12%]" />}
                    <div className="absolute inset-0 bg-gradient-to-b from-world-ink/10 via-transparent to-world-ink" />
                </motion.div>

                <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-end gap-8 lg:grid-cols-[0.9fr_1.2fr_0.9fr] lg:gap-12">
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        className="self-center lg:pb-16"
                    >
                        <p className="mb-5 text-[0.6875rem] uppercase tracking-[0.16em] text-world-gold">Heritage You Can Wear</p>
                        <h1 className="max-w-[11ch] font-display text-[clamp(3.5rem,7vw,7rem)] leading-[0.88] tracking-[-0.045em]">
                            DEENHA World Series
                        </h1>
                        <p className="mt-7 max-w-[28rem] text-sm leading-7 text-world-paper/68 md:text-base">
                            Explore worlds shaped by textile, place, memory, and contemporary modest fashion.
                        </p>
                    </motion.div>

                    <div className="hidden lg:block lg:min-h-[38rem]" aria-hidden="true" />

                    <div className="grid gap-4 self-center lg:pb-12">
                        {portals.map(({ key, ...portal }, index) => <WorldPortal key={key} {...portal} index={index} />)}
                    </div>
                </div>

                <div className="relative z-20 mt-8 flex items-center gap-4 text-xs text-world-paper/50 lg:absolute lg:bottom-6 lg:left-12 lg:mt-0">
                    <span className="h-px w-10 bg-world-gold" />
                    <span>Scarves collection currently open</span>
                </div>
            </section>
        </main>
    );
};

const WorldSeriesHome = () => {
    const [ready, setReady] = useState(false);
    const onReady = useMemo(() => () => setReady(true), []);

    return (
        <>
            <AnimatePresence>{!ready && <WorldLoader onReady={onReady} />}</AnimatePresence>
            <WorldEntrance />
        </>
    );
};

export default WorldSeriesHome;
