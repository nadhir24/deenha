import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heritageItems, newSeriesItems, abstractItems } from '../../data/worldSeries';

const worlds = [
    {
        id: 'heritage',
        eyebrow: 'World 01 — Wastra Nusantara',
        title: 'Heritage Textile',
        desc: 'Batik, songket, tenun. Wastra yang ditelusuri asalnya, lalu diterjemahkan jadi pakaian sehari-hari.',
        meta: ['5 Series', 'Live'],
        figure: '/proto/img/figure-heritage-alpha.png',
        bg: '/proto/img/bg-heritage.jpg',
        label: 'Heritage',
    },
    {
        id: 'cities',
        eyebrow: 'World 02 — Kota Islam Dunia',
        title: 'Cities of Islam',
        desc: 'Cordoba, Istanbul, Samarkand, Demak, Aceh. Arsitektur dan sejarahnya jadi motif.',
        meta: ['4 Series', 'New Series'],
        figure: '/proto/img/figure-cities-alpha.png',
        bg: '/proto/img/bg-cities.jpg',
        label: 'Cities',
    },
    {
        id: 'new',
        eyebrow: 'World 03 — Studio',
        title: 'New Arrival',
        desc: 'Abstract, monogram, dan eksperimen studio di luar dua lini utama.',
        meta: ['3 Series', 'Abstract'],
        figure: '/proto/img/figure-new-alpha.png',
        bg: '/proto/img/bg-new.jpg',
        label: 'New Arrival',
    },
];

const essentialAssets = worlds.flatMap((w) => [w.figure, w.bg]).filter(Boolean) as string[];

const showcaseItems = [
    ...heritageItems.slice(0, 3).map((it) => ({ ...it, world: 'Heritage Textile' })),
    ...newSeriesItems.slice(0, 2).map((it) => ({ ...it, world: 'Cities of Islam' })),
    ...abstractItems.slice(0, 1).map((it) => ({ ...it, world: 'New Arrival' })),
];

const WorldLoader = ({ onReady }: { onReady: () => void }) => {
    const reduceMotion = useReducedMotion();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
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

const CharacterSelect = ({ onUnlock }: { onUnlock: () => void }) => {
    const reduceMotion = useReducedMotion();
    const [current, setCurrent] = useState(0);
    const [unlocked, setUnlocked] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const order = useMemo(() => [current, (current + 1) % 3, (current + 2) % 3], [current]);
    const positions = ['active', 'right', 'left'] as const;

    const go = (next: number) => {
        setCurrent((next + 3) % 3);
    };

    useEffect(() => {
        if (current === 2 && !unlocked) {
            setUnlocked(true);
        }
    }, [current, unlocked]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') go(current + 1);
            if (e.key === 'ArrowLeft') go(current - 1);
        };
        const onWheel = (e: WheelEvent) => {
            if (!unlocked) {
                e.preventDefault();
                if (Date.now() - (window as any).__lastWheel < 520) return;
                (window as any).__lastWheel = Date.now();
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
            window.removeEventListener('wheel', onWheel as any);
            window.removeEventListener('touchstart', onTouchStart as any);
            window.removeEventListener('touchend', onTouchEnd as any);
        };
    }, [current, unlocked]);

    const charClass = (pos: typeof positions[number]) => {
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

    return (
        <div className="relative h-[100dvh] w-full overflow-hidden bg-[#0b0b0c] text-[#f4f1ec]">
            {/* backgrounds */}
            {worlds.map((w, i) => (
                <motion.div
                    key={w.id}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${w.bg})` }}
                    initial={false}
                    animate={{ opacity: current === i ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.9 }}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0c]/30 via-transparent to-[#0b0b0c]/90" />

            {/* topbar */}
            <div className="fixed left-0 right-0 top-0 z-30 flex justify-between px-6 py-6 md:px-10 md:py-7">
                <span className="font-display text-sm tracking-[0.22em]">DEENHA</span>
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-[#f4f1ec]/60">World Series</span>
            </div>

            {/* characters */}
            <div className="absolute inset-0 flex items-end justify-center pb-0 md:pb-8" style={{ perspective: '1400px' }}>
                {order.map((idx, pos) => {
                    const w = worlds[idx];
                    return (
                        <motion.div
                            key={w.id}
                            className={`character ${charClass(positions[pos])}`}
                            onClick={() => go(idx)}
                            initial={false}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img
                                src={w.figure}
                                alt={w.title}
                                className="h-full w-full object-contain object-bottom drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]"
                            />
                            <span className="character-label">{w.label}</span>
                        </motion.div>
                    );
                })}
            </div>

            {/* copy */}
            {worlds.map((w, i) => (
                <motion.div
                    key={w.id}
                    className="absolute bottom-[18%] left-6 z-20 max-w-[420px] md:left-[clamp(26px,6vw,80px)]"
                    initial={false}
                    animate={{ opacity: current === i ? 1 : 0, y: current === i ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: current === i ? 0.15 : 0 }}
                >
                    <span className="text-[0.65rem] uppercase tracking-[0.24em] text-[#f4f1ec]/60">{w.eyebrow}</span>
                    <h2 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.95]">{w.title}</h2>
                    <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-[#f4f1ec]/80">{w.desc}</p>
                    <div className="mt-5 flex gap-4">
                        {w.meta.map((m) => (
                            <span key={m} className="text-[0.65rem] uppercase tracking-[0.2em] text-[#c9a227]">{m}</span>
                        ))}
                    </div>
                    <button
                        onClick={() => (i === 2 ? onUnlock() : go(i + 1))}
                        className="mt-6 text-[0.65rem] uppercase tracking-[0.24em] text-[#f4f1ec] transition-colors hover:text-[#c9a227]"
                    >
                        {i === 2 ? 'Scroll ke showcase →' : 'Jelajahi dunia ini →'}
                    </button>
                </motion.div>
            ))}

            {/* world index */}
            {worlds.map((w, i) => (
                <motion.div
                    key={w.id}
                    className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 text-right md:right-[clamp(26px,6vw,80px)] md:block"
                    initial={false}
                    animate={{ opacity: current === i ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="font-display text-[clamp(5rem,12vw,11rem)] leading-none text-[#f4f1ec]/10">0{i + 1}</span>
                    <span className="block text-[0.65rem] uppercase tracking-[0.24em] text-[#f4f1ec]/40">World</span>
                </motion.div>
            ))}

            {/* arrows */}
            <button
                onClick={() => go(current - 1)}
                className="fixed left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f4f1ec]/15 bg-[#0b0b0c]/40 text-[#f4f1ec] backdrop-blur-md transition hover:border-[#c9a227] hover:text-[#c9a227] md:flex"
                aria-label="Previous world"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M15 5l-7 7 7 7" />
                </svg>
            </button>
            <button
                onClick={() => go(current + 1)}
                className="fixed right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f4f1ec]/15 bg-[#0b0b0c]/40 text-[#f4f1ec] backdrop-blur-md transition hover:border-[#c9a227] hover:text-[#c9a227] md:flex"
                aria-label="Next world"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* dots */}
            <div className="fixed bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
                {worlds.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => go(i)}
                        className={`h-px w-7 transition-colors ${current === i ? 'bg-[#c9a227]' : 'bg-[#f4f1ec]/20'}`}
                        aria-label={`Go to world ${i + 1}`}
                    />
                ))}
            </div>

            <div className="fixed bottom-14 left-0 right-0 z-30 text-center text-[0.6rem] uppercase tracking-[0.24em] text-[#f4f1ec]/40">
                {unlocked ? 'Scroll untuk menjelajah' : `Slide ${current + 1}/3 — dunia ke-3 membuka scroll`}
            </div>
        </div>
    );
};

const Showcase = () => {
    return (
        <section className="relative z-10 bg-[#0b0b0c] px-6 py-24 text-[#f4f1ec] md:px-[clamp(24px,6vw,80px)] md:py-32">
            <div className="mb-12">
                <span className="text-[0.65rem] uppercase tracking-[0.24em] text-[#f4f1ec]/60">Explore the Worlds</span>
                <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight">Three doors, one wardrobe.</h2>
                <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-[#f4f1ec]/70">
                    Setiap dunia membawa ceritanya sendiri. Pilih wastra, kota, atau eksperimen studio — semuanya dirancang untuk dipakai setiap hari.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {showcaseItems.map((item) => (
                    <Link
                        key={item.slug}
                        to={`/world/${item.slug}`}
                        className="group relative aspect-[3/4] overflow-hidden border border-[#f4f1ec]/10"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover brightness-[0.72] transition duration-1000 group-hover:scale-105 group-hover:brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/40 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5">
                            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#f4f1ec]/70">{item.world}</span>
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

    return (
        <div className="min-h-[100dvh] bg-[#0b0b0c]">
            <AnimatePresence>{!ready && <WorldLoader onReady={onReady} />}</AnimatePresence>
            {ready && (
                <>
                    <CharacterSelect onUnlock={() => setUnlocked(true)} />
                    <motion.div
                        initial={false}
                        animate={unlocked ? { y: 0, opacity: 1 } : { y: '100vh', opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Showcase />
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default WorldSeriesHome;
