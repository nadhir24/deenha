import { motion } from 'framer-motion';

const AnnouncementBar = () => {
    const announcements = [
        "🌍 International Shipping Available",
        "✨ Complimentary Shipping on Orders over Rp 500.000",
        "🎁 Use DEENHA10 for 10% off your first purchase",
        "✨ Discover the New Signature Collection"
    ];

    return (
        <div className="bg-primary text-white py-2 border-b border-white/10 relative z-[70] h-[36px]">
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
                        <span key={i} className="mx-12 text-[9px] uppercase font-bold tracking-[0.3em]">
                            {text}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
