import { motion } from 'framer-motion';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { useTikTokLive } from '../../hooks/useTikTokLive';

const AnnouncementBar = () => {
    const { settings, loading: settingsLoading } = useSiteSettings();
    const { isLive } = useTikTokLive();

    const baseAnnouncements = settings.announcements || [
        "🌍 International Shipping Available",
        "✨ Complimentary Shipping on Orders over Rp 500.000",
        "🎁 Use DEENHA10 for 10% off your first purchase",
        "✨ Discover the New Signature Collection"
    ];

    // Prepend Live message if active
    const announcements = isLive
        ? ["🔴 LIVE ON TIKTOK! JOIN NOW FOR EXCLUSIVE DEALS", ...baseAnnouncements]
        : baseAnnouncements;

    if (settingsLoading && !settings.announcements) return <div className="h-[36px] bg-primary" />;

    return (
        <div className={`text-white py-2 border-b border-white/10 relative z-[70] h-[36px] transition-colors duration-1000 ${isLive ? 'bg-[#FE2C55]' : 'bg-primary'}`}>
            <div className="flex overflow-hidden whitespace-nowrap">
                <motion.div
                    className="flex"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {[...announcements, ...announcements].map((text, i) => (
                        <span key={i} className={`mx-12 text-[9px] uppercase font-bold tracking-[0.3em] flex items-center gap-2 ${text.includes('LIVE') ? 'text-white' : ''}`}>
                            {text.includes('LIVE') && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                            {text}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
