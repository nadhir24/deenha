import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const BrandStory = () => {
    const { t } = useTranslation();

    const ethos = [
        {
            number: '01',
            title: t('brand_story.ethos_1_title'),
            text: t('brand_story.ethos_1_desc')
        },
        {
            number: '02',
            title: t('brand_story.ethos_2_title'),
            text: t('brand_story.ethos_2_desc')
        },
        {
            number: '03',
            title: t('brand_story.ethos_3_title'),
            text: t('brand_story.ethos_3_desc')
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-primary transition-colors duration-300 overflow-hidden" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Story Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    {/* Image Column */}
                    <motion.div
                        className="relative order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="aspect-[4/5] overflow-hidden bg-surface-secondary dark:bg-white/5 shadow-2xl">
                            <img
                                src="/images/our-mission-d951KpkZjLHz3841.jpg"
                                alt="Deenha Brand Story"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent-gold/5 -z-10" />
                    </motion.div>

                    {/* Text Column */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">
                            {t('brand_story.narrative_label')}
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-8 text-primary dark:text-white">
                            {t('brand_story.heading_1')} <span className="italic">{t('brand_story.heading_2')}</span>
                        </h2>
                        <div className="space-y-6 text-secondary dark:text-white/60 leading-relaxed text-lg">
                            <p>{t('brand_story.p1')}</p>
                            <p>{t('brand_story.p2')}</p>
                            <p className="font-medium text-primary dark:text-white/80">
                                {t('brand_story.p3')}
                            </p>
                        </div>
                        <div className="mt-10 border-t border-black/5 dark:border-white/10 pt-8">
                            <p className="font-display italic text-xl text-primary dark:text-white">{t('brand_story.team_sign')}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Our Ethos Section */}
                <div className="pt-20 border-t border-black/5 dark:border-white/10">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">
                            {t('brand_story.core_philosophy')}
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-primary dark:text-white">
                            {t('brand_story.our_ethos')}
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
                        {ethos.map((item, index) => (
                            <motion.div
                                key={item.number}
                                className="relative group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <span className="absolute -top-10 left-0 font-display text-8xl text-black/[0.03] dark:text-white/[0.03] pointer-events-none group-hover:text-accent-gold/10 transition-colors duration-500">
                                    {item.number}
                                </span>
                                <h3 className="font-display text-2xl mb-4 text-primary dark:text-white relative z-10">
                                    {item.title}
                                </h3>
                                <p className="text-secondary dark:text-white/60 leading-relaxed text-sm lg:text-base relative z-10">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandStory;
