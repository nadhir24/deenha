import { motion } from 'framer-motion';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { useTikTokLive } from '../../hooks/useTikTokLive';
import { useTranslation } from 'react-i18next';

const AnnouncementBar = () => {
    const { t } = useTranslation();
    const { settings, loading: settingsLoading } = useSiteSettings();
    const { isLive } = useTikTokLive();

    const baseAnnouncements = settings.announcements || [
        t('announcement.shipping'),
        t('announcement.free_shipping'),
        t('announcement.discount'),
        t('announcement.new_collection')
    ];

    // Prepend Live message if active
    const announcements = isLive
        ? [t('announcement.live_tiktok'), ...baseAnnouncements]
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
                        <span key={i} className={`mx-12 text-[9px] uppercase font-bold tracking-[0.3em] flex items-center gap-2 ${text.includes('LIVE') || text.includes('🔴') ? 'text-white' : ''}`}>
                            {(text.includes('LIVE') || text.includes('🔴')) && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                            {text}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default AnnouncementBar;


