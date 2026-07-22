import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';

interface TextileVideoProps {
    src: string;
    poster?: string;
    label: string;
}

const TextileVideo = ({ src, poster, label }: TextileVideoProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const reduceMotion = useReducedMotion();
    const [duration, setDuration] = useState(0);
    const [scrubEnabled, setScrubEnabled] = useState(false);
    const [playing, setPlaying] = useState(false);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) video.pause();
        }, { threshold: 0.05 });
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    useMotionValueEvent(scrollYProgress, 'change', (progress) => {
        const video = videoRef.current;
        if (!video || reduceMotion || !scrubEnabled || !duration) return;
        const storyProgress = Math.min(1, Math.max(0, (progress - 0.28) / 0.48));
        const nextTime = storyProgress * duration;
        if (Math.abs(video.currentTime - nextTime) > 0.05) video.currentTime = nextTime;
    });

    return (
        <section ref={sectionRef} className="relative min-h-[190dvh] bg-world-ink text-world-paper">
            <div className="sticky top-0 flex min-h-[100dvh] items-center overflow-hidden">
                <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                    poster={poster}
                    src={src}
                    aria-label={label}
                    onLoadedMetadata={(event) => {
                        const video = event.currentTarget;
                        setDuration(video.duration);
                        setScrubEnabled(video.seekable.length > 0 && window.matchMedia('(min-width: 768px)').matches);
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-world-ink/75 via-world-ink/15 to-world-ink/40" />
                <motion.div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-12">
                    <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-gold">Songket film</p>
                    <h2 className="mt-5 max-w-[9ch] font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.88] tracking-[-0.05em]">Follow the textile.</h2>
                    <p className="mt-6 max-w-md text-sm leading-7 text-world-paper/70">The camera moves from the worn silhouette into the pattern, folds, and surface detail.</p>
                    {!scrubEnabled && !reduceMotion && (
                        <button onClick={() => {
                            const video = videoRef.current;
                            if (!video) return;
                            if (playing) video.pause(); else video.play();
                            setPlaying(!playing);
                        }} className="mt-8 border border-world-paper/40 px-5 py-3 text-xs uppercase tracking-[0.12em]">{playing ? 'Pause film' : 'Play film'}</button>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default TextileVideo;
