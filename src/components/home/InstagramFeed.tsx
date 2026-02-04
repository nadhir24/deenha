import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInstagram } from '../../hooks/useInstagram';

const InstagramFeed = () => {
    const { posts, loading } = useInstagram();

    return (
        <section className="py-24 bg-surface-secondary overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-accent-gold text-[11px] uppercase font-bold tracking-[0.5em] mb-4 block">
                        Our Atmosphere
                    </span>
                    <h2 className="font-display text-4xl md:text-6xl italic font-normal tracking-tight mb-6">
                        The Atelier Journal
                    </h2>
                    <a
                        href="https://www.instagram.com/deenha.official/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary hover:text-accent-gold transition-colors duration-500 border-b border-primary/20 pb-1"
                    >
                        Follow @deenha.official
                    </a>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-square bg-black/5 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {posts.map((post, idx) => (
                            <InstagramItem key={post.id} post={post} idx={idx} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

const InstagramItem = ({ post, idx }: { post: any; idx: number }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <motion.a
            href={post.post_url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group shadow-lg bg-surface-secondary"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Base Image */}
            <img
                src={post.image_url}
                alt="Deenha Instagram"
                className={`w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-110 ${isHovered && post.is_video ? 'opacity-0' : 'opacity-100'}`}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800';
                }}
            />

            {/* Video Player on Hover */}
            {post.is_video && post.video_url && (
                <video
                    ref={videoRef}
                    src={post.video_url}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    muted
                    loop
                    playsInline
                />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                <div className="text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white text-[9px] font-bold tracking-[0.4em] uppercase border border-white/30 px-5 py-2 flex items-center gap-2">
                        {post.is_video && (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                        {post.is_video ? 'Play Reel' : 'View Post'}
                    </span>
                </div>
            </div>
        </motion.a>
    );
};

export default InstagramFeed;
