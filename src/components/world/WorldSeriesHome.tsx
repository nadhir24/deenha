import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    heritageItems,
    newSeriesItems,
    worldItemHref,
    type WorldSeriesItem,
} from '../../data/worldSeries';

type WorldSlide = {
    id: 'heritage' | 'cities' | 'new';
    eyebrow: string;
    title: string;
    desc: string;
    meta: string[];
    figure: string;
    bg: string;
    label: string;
    href?: string;
    cta: string;
    unlockOnCta?: boolean;
};

const worlds: WorldSlide[] = [
    {
        id: 'heritage',
        eyebrow: 'World 01 — Wastra Nusantara',
        title: 'Heritage Textile',
        desc: 'Batik, songket, tenun. Wastra yang ditelusuri asalnya, lalu diterjemahkan jadi pakaian sehari-hari.',
        meta: ['5 Series', 'Live'],
        figure: '/proto/img/figure-heritage-alpha.png',
        bg: '/proto/img/bg-heritage.jpg',
        label: 'Heritage',
        href: '/world/heritage',
        cta: 'Jelajahi dunia ini →',
    },
    {
        id: 'cities',
        eyebrow: 'World 02 — Kota Islam Dunia',
        title: 'Cities of Islam',
        desc: 'Cordoba, Istanbul, Samarkand, Demak, Aceh. Arsitektur dan sejarahnya jadi motif.',
        meta: ['3 Series', 'Live'],
        figure: '/proto/img/figure-cities-alpha.png',
        bg: '/proto/img/bg-cities.jpg',
        label: 'Cities',
        href: '/world/new-series',
        cta: 'Jelajahi dunia ini →',
    },
    {
        id: 'new',
        eyebrow: 'World 03 — Studio',
        title: 'New Arrival',
        desc: 'Abstract & studio studies — coming into focus. Scroll untuk melihat pintu yang sudah buka.',
        meta: ['Soon', 'Abstract'],
        figure: '/proto/img/figure-new-alpha.png',
        bg: '/proto/img/bg-new.jpg',
        label: 'New Arrival',
        cta: 'Scroll ke showcase →',
        unlockOnCta: true,
    },
];

const essentialAssets = worlds.flatMap((w) => [w.figure, w.bg]).filter(Boolean) as string[];

const showcaseItems: Array<WorldSeriesItem & { worldLabel: string }> = [
    ...heritageItems.map((it) => ({ ...it, worldLabel: 'Heritage Textile' })),
    ...newSeriesItems.map((it) => ({ ...it, worldLabel: 'Cities of Islam' })),
];

const WorldLoader = ({ onReady }: { onReady: () => void }) => {
    const reduceMotion = useReducedMotion();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let loaded = 0;
        let cancelled = false;
        const total = Math.max(essentialAssets.length, 1);
        const done = () => {
            loaded += 1;
            const next = Math.min(100, Math.round((loaded / total) * 100));
            if (!cancelled) setProgress(next);
            if (loaded >= total && !cancelled) {
                window.setTimeout(onReady, reduceMotion ? 0 : 380);
            }
        };

        essentialAssets.forEach((src) => {
            const image = new Image();
            image.onload = image.onerror = done;
            image.src = src;
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
            className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col justify-between bg-[#0b0b0c] px-6 py-8 text-[#f4f1ec] md:px-12 md:py-10"
            role="status"
            aria-live="polite"
            aria-label={`Preparing DEENHA World Series, ${progress}%`}
        >
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">DEENHA</p>
            <div>
                <p className="mb-3 text-sm text-[#f4f1ec]/60">Preparing the worlds</p>
                <div className="flex items-end justify-between gap-8">
                    <span className="font-display text-[clamp(4rem,13vw,10rem)] leading-none">{progress}</span>
                    <span className="pb-2 text-sm text-[#f4f1ec]/60">%</span>
                </div>
                <div className="mt-5 h-px w-full bg-white/20">
                    <div className="h-full bg-[#c9a227] transition-[width] duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </motion.div>
    );
};

const CharacterSelect = ({
    unlocked,
    onUnlock,
}: {
    unlocked: boolean;
    onUnlock: () => void;
}) => {
    const reduceMotion = useReducedMotion();
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const lastWheel = useRef(0);

    const order = useMemo(() => [current, (current + 1) % 3, (current + 2) % 3], [current]);
    const positions = ['active', 'right', 'left'] as const;

    const go = (next: number) => {
        setCurrent((next + 3) % 3);
    };

    // Single unlock truth: landing on slide 3 opens parent showcase + page scroll.
    useEffect(() => {
        if (current === 2 && !unlocked) onUnlock();
    }, [current, unlocked, onUnlock]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') go(current + 1);
            if (e.key === 'ArrowLeft') go(current - 1);
        };
        const onWheel = (e: WheelEvent) => {
            if (!unlocked) {
                e.preventDefault();
                if (Date.now() - lastWheel.current < 520) return;
                lastWheel.current = Date.now();
                go(current + (e.deltaY > 0 ? 1 : -1));
            }
        };

        const onTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
        };
        const onTouchEnd = (e: TouchEvent) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
            touchStartX.current = null;
        };

        window.addEventListener('keydown', onKey);
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchend', onTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('wheel', onWheel as EventListener);
            window.removeEventListener('touchstart', onTouchStart as EventListener);
            window.removeEventListener('touchend', onTouchEnd as EventListener);
        };
    }, [current, unlocked]);

    const charClass = (pos: (typeof positions)[number]) => {
        switch (pos) {
            case 'active':
                return 'character-active';
            case 'left':
                return 'character-left';
            case 'right':
                return 'character-right';
            default:
                return 'character-back';
        }
    };

    const active = worlds[current];

    return (
        <div className="relative h-[100dvh] w-full overflow-hidden bg-[#0b0b0c] text-[#f4f1ec]">
            {worlds.map((w, i) => (
                <motion.div
                    key={w.id}
                    className="absolute inset-0 bg-cover bg-center md:bg-center"
                    style={{
                        backgroundImage: `url(${w.bg})`,
                        backgroundPosition: 'center top',
                    }}
                    initial={false}
                    animate={{ opacity: current === i ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.9 }}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0c]/45 via-[#0b0b0c]/15 to-[#0b0b0c]/92 md:from-[#0b0b0c]/30 md:via-transparent md:to-[#0b0b0c]/90" />

            <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex justify-between px-5 py-5 md:px-10 md:py-7">
                <span className="font-display text-sm tracking-[0.22em]">DEENHA</span>
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-[#f4f1ec]/60">World Series</span>
            </div>

            <div
                className="absolute inset-x-0 bottom-[34%] top-[12%] flex items-end justify-center md:bottom-[12%] md:top-[8%]"
                style={{ perspective: '1400px' }}
            >
                {order.map((idx, pos) => {
                    const w = worlds[idx];
                    return (
                        <motion.div
                            key={w.id}
                            className={`character ${charClass(positions[pos])}`}
                            onClick={() => go(idx)}
                            initial={false}
                            animate={{ opacity: 1 }}
                            transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img
                                src={w.figure}
                                alt={w.title}
                                draggable={false}
                                className="h-full w-full object-contain object-bottom drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]"
                            />
                            <span className="character-label">{w.label}</span>
                        </motion.div>
                    );
                })}
            </div>

            {/* Mobile-first copy: bottom sheet so it never covers the face/torso */}
            <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-[4.75rem] pt-16 md:px-0 md:pb-0 md:pt-0">
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/85 to-transparent md:hidden" />
                {worlds.map((w, i) => (
                    <motion.div
                        key={w.id}
                        className="relative mx-auto max-w-[420px] md:absolute md:bottom-[18%] md:left-[clamp(26px,6vw,80px)] md:mx-0 md:max-w-[420px]"
                        initial={false}
                        animate={{
                            opacity: current === i ? 1 : 0,
                            y: current === i ? 0 : 16,
                            pointerEvents: current === i ? 'auto' : 'none',
                        }}
                        transition={{ duration: 0.45, delay: current === i ? 0.08 : 0 }}
                        style={{ display: current === i ? 'block' : 'none' }}
                    >
                        <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#f4f1ec]/65 md:text-[0.65rem] md:tracking-[0.24em]">
                            {w.eyebrow}
                        </span>
                        <h2 className="mt-2 font-display text-[clamp(1.85rem,7vw,4.5rem)] leading-[0.95] md:mt-3">
                            {w.title}
                        </h2>
                        <p className="mt-3 max-w-[36ch] text-[0.8125rem] leading-relaxed text-[#f4f1ec]/78 md:mt-4 md:text-sm md:text-[#f4f1ec]/80">
                            {w.desc}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3 md:mt-5 md:gap-4">
                            {w.meta.map((m) => (
                                <span key={m} className="text-[0.62rem] uppercase tracking-[0.18em] text-[#c9a227] md:text-[0.65rem] md:tracking-[0.2em]">
                                    {m}
                                </span>
                            ))}
                        </div>
                        {w.href ? (
                            <Link
                                to={w.href}
                                className="mt-5 inline-flex text-[0.65rem] uppercase tracking-[0.24em] text-[#f4f1ec] transition-colors hover:text-[#c9a227] md:mt-6"
                            >
                                {w.cta}
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    onUnlock();
                                    window.requestAnimationFrame(() => {
                                        document.getElementById('showcase')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
                                    });
                                }}
                                className="mt-5 text-[0.65rem] uppercase tracking-[0.24em] text-[#f4f1ec] transition-colors hover:text-[#c9a227] md:mt-6"
                            >
                                {w.cta}
                            </button>
                        )}
                    </motion.div>
                ))}
            </div>

            {worlds.map((w, i) => (
                <motion.div
                    key={`idx-${w.id}`}
                    className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 text-right md:right-[clamp(26px,6vw,80px)] md:block"
                    initial={false}
                    animate={{ opacity: current === i ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="font-display text-[clamp(5rem,12vw,11rem)] leading-none text-[#f4f1ec]/10">0{i + 1}</span>
                    <span className="block text-[0.65rem] uppercase tracking-[0.24em] text-[#f4f1ec]/40">World</span>
                </motion.div>
            ))}

            <button
                type="button"
                onClick={() => go(current - 1)}
                className="fixed left-3 top-[42%] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#f4f1ec]/15 bg-[#0b0b0c]/40 text-[#f4f1ec] backdrop-blur-md transition hover:border-[#c9a227] hover:text-[#c9a227] md:left-4 md:top-1/2 md:flex md:h-12 md:w-12"
                aria-label="Previous world"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M15 5l-7 7 7 7" />
                </svg>
            </button>
            <button
                type="button"
                onClick={() => go(current + 1)}
                className="fixed right-3 top-[42%] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#f4f1ec]/15 bg-[#0b0b0c]/40 text-[#f4f1ec] backdrop-blur-md transition hover:border-[#c9a227] hover:text-[#c9a227] md:right-4 md:top-1/2 md:flex md:h-12 md:w-12"
                aria-label="Next world"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div className="fixed bottom-5 left-0 right-0 z-30 flex flex-col items-center gap-2 md:bottom-8 md:gap-3">
                <div className="flex justify-center gap-3">
                    {worlds.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => go(i)}
                            className={`h-px w-7 transition-colors ${current === i ? 'bg-[#c9a227]' : 'bg-[#f4f1ec]/20'}`}
                            aria-label={`Go to world ${i + 1}`}
                        />
                    ))}
                </div>
                <div className="text-center text-[0.58rem] uppercase tracking-[0.2em] text-[#f4f1ec]/45 md:text-[0.6rem] md:tracking-[0.24em]">
                    {unlocked ? 'Scroll untuk menjelajah' : `Slide ${current + 1}/3 — dunia ke-3 membuka scroll`}
                </div>
            </div>

            {/* keep active for a11y readers */}
            <span className="sr-only">{active.title}</span>
        </div>
    );
};

const Showcase = () => {
    return (
        <section id="showcase" className="relative z-10 bg-[#0b0b0c] px-6 py-24 text-[#f4f1ec] md:px-[clamp(24px,6vw,80px)] md:py-32">
            <div className="mb-12">
                <span className="text-[0.65rem] uppercase tracking-[0.24em] text-[#f4f1ec]/60">Explore the Worlds</span>
                <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight">Pintu yang sudah terbuka.</h2>
                <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-[#f4f1ec]/70">
                    Heritage dan Cities of Islam siap dijelajah. Abstract / New Arrival menyusul — untuk sekarang, pilih series di bawah.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {showcaseItems.map((item) => (
                    <Link
                        key={item.slug}
                        to={worldItemHref(item)}
                        className="group relative aspect-[3/4] overflow-hidden border border-[#f4f1ec]/10 bg-[#141414]"
                    >
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.title}
                                loading="lazy"
                                className="h-full w-full object-cover brightness-[0.72] transition duration-1000 group-hover:scale-105 group-hover:brightness-90"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2a2624] to-[#0b0b0c]">
                                <span className="font-display text-3xl text-[#f4f1ec]/40">{item.title}</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/40 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5">
                            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#f4f1ec]/70">{item.worldLabel}</span>
                            <h3 className="mt-1 font-display text-2xl">{item.title}</h3>
                            <p className="mt-1 text-xs leading-relaxed text-[#f4f1ec]/80">{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

const WorldSeriesHome = () => {
    const [ready, setReady] = useState(false);
    const [unlocked, setUnlocked] = useState(false);
    const reduceMotion = useReducedMotion();
    const onReady = useMemo(() => () => setReady(true), []);
    const onUnlock = useMemo(() => () => setUnlocked(true), []);

    // Lock document scroll until slide 3.
    useEffect(() => {
        if (!ready) return;
        const prev = document.body.style.overflow;
        if (!unlocked) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = prev || '';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [ready, unlocked]);

    return (
        <div className="min-h-[100dvh] bg-[#0b0b0c]">
            <AnimatePresence>{!ready && <WorldLoader onReady={onReady} />}</AnimatePresence>
            {ready && (
                <>
                    <CharacterSelect unlocked={unlocked} onUnlock={onUnlock} />
                    {unlocked && (
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Showcase />
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
};

export default WorldSeriesHome;
