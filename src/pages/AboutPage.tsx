import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* ─── SVG Decorative Icons ─── */
const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const MosqueIcon = () => (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-8 h-8 opacity-20">
        <path d="M32 4c-6 0-12 8-12 16h24c0-8-6-16-12-16zM16 20v4H8v32h48V24h-8v-4H16zm16 32H20V36c0-4.4 3.6-8 8-8s8 3.6 8 8v16h-8z" />
    </svg>
);

/* ─── Animation Variants ─── */
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
};

const letterAnimation = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const floatingAnimation = {
    animate: {
        y: [0, -15, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
};

const pulseGlow = {
    animate: {
        boxShadow: [
            "0 0 0 0 rgba(201, 168, 108, 0)",
            "0 0 30px 10px rgba(201, 168, 108, 0.15)",
            "0 0 0 0 rgba(201, 168, 108, 0)"
        ],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
};

/* ─── Animated Title Component ─── */
const AnimatedTitle = ({ text, className = '' }: { text: string; className?: string }) => (
    <motion.div
        className={`flex flex-wrap justify-center gap-x-2 ${className}`}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
    >
        {text.split(' ').map((word, i) => (
            <motion.span key={i} variants={letterAnimation} className="inline-block">
                {word}
            </motion.span>
        ))}
    </motion.div>
);

/* ─── Decorative Divider ─── */
const IslamicDivider = () => (
    <motion.div
        className="flex items-center justify-center gap-3 my-12"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-accent-gold/50" />
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            <div className="w-3 h-3 border border-accent-gold/40 rotate-45" />
        </motion.div>
        <div className="h-px w-8 md:w-12 bg-accent-gold/30" />
        <StarIcon />
        <div className="h-px w-8 md:w-12 bg-accent-gold/30" />
        <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            <div className="w-3 h-3 border border-accent-gold/40 rotate-45" />
        </motion.div>
        <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-accent-gold/50" />
    </motion.div>
);

/* ─── Counter Animation Component ─── */
const AnimatedCounter = ({ value, suffix = '' }: { value: string; suffix?: string }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="inline-block"
    >
        {value}{suffix}
    </motion.span>
);

/* ─── Main Component ─── */
const AboutPage = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const companyDetails = [
        { icon: '🏷️', label: 'Merk', value: 'DEENHA' },
        { icon: '🏢', label: 'Nama Perusahaan', value: 'PT. Rekasarana Jaya Madhani (PT.RJM)' },
        { icon: '👤', label: 'Pendiri Usaha', value: 'Nurlita Chaerani & Dede Nurul Hadian' },
        { icon: '📅', label: 'Berdiri Sejak', value: 'September 2019' },
        { icon: '👗', label: 'Deskripsi Usaha', value: 'Usaha Fashion Wanita Muslimah' },
        { icon: '🧵', label: 'Bisnis yang Dijalankan', value: 'Produksi dan Penjualan berbagai jenis busana fashion wanita muslimah — Pakaian, Hijab, maupun Asesoris' },
        { icon: '🏭', label: 'Kapasitas Produksi', value: '500 pcs/bulan' },
        { icon: '🎯', label: 'Segmentasi Pasar', value: 'Menengah ke Atas — Harga berkisar mulai dari Rp 245.000' },
        { icon: '🛒', label: 'Metode Penjualan', value: 'Toko, Pameran, Internet, Media Sosial' },
    ];

    const teamBreakdown = [
        { role: 'Perancang Busana', count: 2 },
        { role: 'Pembuat Pola', count: 1 },
        { role: 'Penjahit', count: 10 },
        { role: 'Website Admin', count: 1 },
        { role: 'Offline Admin', count: 2 },
    ];

    return (
        <main className="pt-32 overflow-hidden">

            {/* ═══════════════════════════════════════════════
                SECTION 1: HERO
            ═══════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative py-28 md:py-36 overflow-hidden min-h-[70vh] flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/about-mv0WDDrgBvfyNZW3.jpg"
                        alt="Deenha Model"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
                </div>

                {/* Animated background pattern */}
                <div className="absolute inset-0 islamic-pattern opacity-[0.05] z-1" />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white z-2"
                    style={{ y: heroY, opacity: heroOpacity }}
                />

                {/* Floating decorative elements */}
                <motion.div
                    className="absolute top-20 left-10 text-accent-gold/20 z-10"
                    {...floatingAnimation}
                >
                    <MosqueIcon />
                </motion.div>
                <motion.div
                    className="absolute bottom-20 right-10 text-accent-gold/20 z-10"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <MosqueIcon />
                </motion.div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.span
                        className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.6em] mb-8 block"
                        initial={{ opacity: 0, letterSpacing: '0.2em' }}
                        animate={{ opacity: 1, letterSpacing: '0.6em' }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        Tentang Kami
                    </motion.span>

                    <AnimatedTitle
                        text="DEENHA"
                        className="font-display text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight mb-4"
                    />

                    <motion.div
                        className="w-20 h-0.5 bg-accent-gold mx-auto mb-8"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    />

                    <motion.p
                        className="font-display text-xl md:text-2xl italic text-primary max-w-2xl mx-auto font-medium"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        Elegant Modest Fashion — Syar'i namun Tetap Elegan
                    </motion.p>

                    {/* Scroll indicator */}
                    <motion.div
                        className="mt-16"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-6 h-10 border-2 border-accent-gold/30 rounded-full mx-auto flex justify-center">
                            <motion.div
                                className="w-1.5 h-3 bg-accent-gold/50 rounded-full mt-2"
                                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION 2: SEJARAH (HISTORY)
            ═══════════════════════════════════════════════ */}
            <section className="py-20 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left: Decorative Image/Card */}
                        <motion.div
                            className="relative"
                            variants={fadeInLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="relative bg-gradient-to-br from-surface-accent to-[#f0e6dc] rounded-2xl p-10 md:p-14 shadow-soft overflow-hidden"
                                {...pulseGlow}
                            >
                                {/* Decorative corner patterns */}
                                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-accent-gold/20 rounded-tl-2xl" />
                                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-accent-gold/20 rounded-br-2xl" />

                                <motion.div
                                    className="text-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-4 block">
                                        Didirikan
                                    </span>
                                    <motion.p
                                        className="font-display text-6xl md:text-7xl text-primary/80 font-normal mb-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                    >
                                        2019
                                    </motion.p>
                                    <p className="text-secondary text-sm tracking-widest uppercase">September</p>
                                </motion.div>

                                <IslamicDivider />

                                <div className="space-y-4 text-center">
                                    <p className="font-display text-lg italic text-primary/70">Pendiri</p>
                                    <motion.div
                                        className="space-y-2"
                                        variants={staggerContainer}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        <motion.p variants={fadeInUp} className="text-primary font-medium text-lg">
                                            Nurlita Chaerani
                                        </motion.p>
                                        <motion.p variants={fadeInUp} className="text-secondary text-sm">&</motion.p>
                                        <motion.p variants={fadeInUp} className="text-primary font-medium text-lg">
                                            Dede Nurul Hadian
                                        </motion.p>
                                    </motion.div>
                                </div>

                                <IslamicDivider />

                                <motion.div
                                    className="text-center"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <p className="text-secondary text-xs tracking-widest uppercase mb-2">Badan Hukum</p>
                                    <p className="font-display text-primary text-lg">PT. Rekasarana Jaya Madhani</p>
                                    <p className="text-accent-gold text-sm font-medium">(PT.RJM)</p>
                                </motion.div>
                            </motion.div>

                            {/* Floating accent shape */}
                            <motion.div
                                className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-gold/5 rounded-full -z-10"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute -top-4 -right-4 w-24 h-24 bg-accent-rose/10 rounded-full -z-10"
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                            />
                        </motion.div>

                        {/* Right: Story Text */}
                        <motion.div
                            variants={fadeInRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">
                                Sejarah
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight mb-10">
                                Sejarah Berdirinya <span className="italic text-accent-gold">DEENHA</span>
                            </h2>

                            <motion.div
                                className="space-y-6 text-secondary leading-relaxed text-base md:text-lg"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <motion.p variants={fadeInUp}>
                                    <strong className="text-primary">DEENHA</strong> adalah merek bisnis fashion muslim wanita,
                                    yang memproduksi berbagai jenis Hijab, Pakaian serta Asesoris wanita muslimah yang berdiri
                                    sejak <strong className="text-accent-gold">September 2019</strong>.
                                </motion.p>
                                <motion.p variants={fadeInUp}>
                                    Pendiri usaha ini adalah <strong className="text-primary">Nurlita Chaerani</strong>, yang barn
                                    saja Hijrah dari pekerjaan sebelumnya sebagai pejabat di salah satu bank swasta di Bandung
                                    serta memiliki usaha lain di bidang Wedding Make Up. Usaha ini juga di dukung oleh suami
                                    bernama <strong className="text-primary">Dede Nurul Hadian</strong>, yang sampai saat ini
                                    Alhamdulillah masih bekerja sebagai Pilot Senior di salah satu Perusahaan Penerbangan
                                    Swasta Nasional Indonesia.
                                </motion.p>
                                <motion.p variants={fadeInUp}>
                                    Usaha ini sudah memiliki legalitas perusahaan dengan nama{' '}
                                    <strong className="text-primary">PT. Rekasarana Jaya Madhani</strong>.
                                </motion.p>
                                <motion.div
                                    variants={fadeInUp}
                                    className="bg-surface-accent border-l-4 border-accent-gold/40 p-5 rounded-r-lg"
                                >
                                    <p className="font-display italic text-primary text-lg mb-2">Arti Nama "DEENHA"</p>
                                    <p className="text-secondary">
                                        Kata DEENHA merupakan bagian nama anggota keluarga dari pendiri perusahaan.
                                    </p>
                                </motion.div>
                                <motion.p variants={fadeInUp}>
                                    DEENHA akan merubah paradigma sebagian masyarakat dan anak muda yang ingin tampil syar'i
                                    tetapi tetap modis dan elegan. DEENHA membuat desainnya dengan konsep cerita tentang
                                    budaya, panorama, dan sejarah Indonesia pada khususnya dan Internasional pada umumnya,
                                    yang dituangkan pada produk <strong className="text-accent-gold">DEENHA Signature</strong>.
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION 3: VISI & MISI
            ═══════════════════════════════════════════════ */}
            <section className="py-20 md:py-32 bg-gradient-to-b from-surface-accent to-white relative overflow-hidden">
                {/* Animated background shapes */}
                <motion.div
                    className="absolute top-0 left-1/4 w-72 h-72 bg-accent-gold/5 rounded-full blur-3xl"
                    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-rose/5 rounded-full blur-3xl"
                    animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
                    transition={{ duration: 12, repeat: Infinity, delay: 2 }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-20"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">
                            Tujuan Kami
                        </span>
                        <AnimatedTitle
                            text="Visi & Misi"
                            className="font-display text-4xl md:text-6xl font-normal tracking-tight"
                        />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                        {/* Visi Card */}
                        <motion.div
                            className="group relative"
                            variants={fadeInLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="relative bg-white rounded-2xl p-8 md:p-10 shadow-soft border border-accent-gold/10 overflow-hidden h-full"
                                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(201, 168, 108, 0.2)" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                {/* Gold top accent bar */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold via-accent-rose to-accent-gold"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                />

                                {/* Hover background effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/0 to-accent-gold/0 group-hover:from-accent-gold/5 group-hover:to-transparent transition-all duration-500" />

                                <div className="relative z-10">
                                    <motion.div
                                        className="w-16 h-16 bg-accent-gold/10 rounded-2xl flex items-center justify-center mb-6"
                                        whileHover={{ rotate: 12, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <span className="text-3xl">👁️</span>
                                    </motion.div>

                                    <h3 className="font-display text-3xl mb-6 text-primary">
                                        Visi
                                    </h3>

                                    <p className="text-secondary leading-relaxed text-lg">
                                        Menjadi perusahaan <strong className="text-accent-gold">Fashion Syar'i Terbaik</strong> di dunia.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Misi Card */}
                        <motion.div
                            className="group relative"
                            variants={fadeInRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="relative bg-white rounded-2xl p-8 md:p-10 shadow-soft border border-accent-gold/10 overflow-hidden h-full"
                                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(201, 168, 108, 0.2)" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-rose via-accent-gold to-accent-rose"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7, duration: 0.8 }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/0 to-accent-rose/0 group-hover:from-accent-rose/5 group-hover:to-transparent transition-all duration-500" />

                                <div className="relative z-10">
                                    <motion.div
                                        className="w-16 h-16 bg-accent-rose/10 rounded-2xl flex items-center justify-center mb-6"
                                        whileHover={{ rotate: -12, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <span className="text-3xl">🎯</span>
                                    </motion.div>

                                    <h3 className="font-display text-3xl mb-6 text-primary">
                                        Misi
                                    </h3>

                                    <p className="text-secondary leading-relaxed text-lg">
                                        DEENHA sebagai inspirasi wanita muslimah dalam berpakaian sesuai dengan{' '}
                                        <strong className="text-accent-gold">Syariat Agama Islam</strong> namun tetap elegan.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION 4: DETAIL INFORMASI PERUSAHAAN
            ═══════════════════════════════════════════════ */}
            <section className="py-20 md:py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-20"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">
                            Detail Informasi
                        </span>
                        <AnimatedTitle
                            text="Profil Perusahaan"
                            className="font-display text-4xl md:text-6xl font-normal tracking-tight"
                        />
                    </motion.div>

                    {/* Company Details Grid */}
                    <motion.div
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {companyDetails.map((item, index) => (
                            <motion.div
                                key={index}
                                className="group relative"
                                variants={scaleIn}
                            >
                                <motion.div
                                    className="relative bg-surface-secondary rounded-xl p-6 border border-transparent hover:border-accent-gold/20 transition-all duration-500 h-full overflow-hidden"
                                    whileHover={{ y: -4, backgroundColor: "#FDF8F5" }}
                                >
                                    {/* Animated corner accent */}
                                    <motion.div
                                        className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-accent-gold/10 border-l-[40px] border-l-transparent"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    />

                                    <div className="flex items-start gap-4">
                                        <motion.span
                                            className="text-2xl flex-shrink-0 mt-1"
                                            whileHover={{ scale: 1.3, rotate: 10 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            {item.icon}
                                        </motion.span>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-accent-gold font-bold mb-2">
                                                {item.label}
                                            </p>
                                            <p className="text-primary font-medium leading-relaxed">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Team & Product Section */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Tenaga Kerja */}
                        <motion.div
                            variants={fadeInLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="bg-gradient-to-br from-surface-accent to-white rounded-2xl p-8 md:p-10 border border-accent-gold/10 shadow-soft h-full"
                                whileHover={{ boxShadow: "0 20px 40px -12px rgba(201, 168, 108, 0.15)" }}
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <motion.span
                                        className="text-3xl"
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    >
                                        👥
                                    </motion.span>
                                    <h3 className="font-display text-2xl text-primary">Tenaga Kerja</h3>
                                </div>

                                <motion.div
                                    className="space-y-4"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    {teamBreakdown.map((member, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center justify-between py-3 border-b border-accent-gold/10 last:border-0 group/item"
                                            variants={fadeInUp}
                                        >
                                            <div className="flex items-center gap-3">
                                                <motion.div
                                                    className="w-2 h-2 bg-accent-gold rounded-full"
                                                    whileHover={{ scale: 2 }}
                                                />
                                                <span className="text-secondary group-hover/item:text-primary transition-colors duration-300">
                                                    {member.role}
                                                </span>
                                            </div>
                                            <motion.span
                                                className="bg-accent-gold/10 text-accent-gold px-3 py-1 rounded-full text-sm font-bold"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <AnimatedCounter value={String(member.count)} suffix=" Orang" />
                                            </motion.span>
                                        </motion.div>
                                    ))}

                                    <motion.div
                                        className="flex items-center justify-between pt-4 mt-2 border-t-2 border-accent-gold/20"
                                        variants={fadeInUp}
                                    >
                                        <span className="text-primary font-bold">Total</span>
                                        <span className="bg-accent-gold text-white px-4 py-1.5 rounded-full text-sm font-bold">
                                            <AnimatedCounter value="16" suffix=" Orang" />
                                        </span>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Produk DEENHA */}
                        <motion.div
                            variants={fadeInRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="bg-gradient-to-br from-[#f5ede6] to-white rounded-2xl p-8 md:p-10 border border-accent-rose/10 shadow-soft h-full"
                                whileHover={{ boxShadow: "0 20px 40px -12px rgba(212, 165, 165, 0.15)" }}
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <motion.span
                                        className="text-3xl"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        ✨
                                    </motion.span>
                                    <h3 className="font-display text-2xl text-primary">Produk DEENHA</h3>
                                </div>

                                <motion.div
                                    className="space-y-6"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <motion.p variants={fadeInUp} className="text-secondary leading-relaxed text-lg">
                                        Pakaian muslim wanita serta hijab dengan <strong className="text-primary">desain printing yang
                                            menarik</strong> dan memiliki karakteristik sendiri.
                                    </motion.p>
                                    <motion.div
                                        variants={fadeInUp}
                                        className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-accent-gold/10"
                                    >
                                        <p className="text-xs uppercase tracking-widest text-accent-gold font-bold mb-3">
                                            Bahan Unggulan
                                        </p>
                                        <p className="text-secondary leading-relaxed">
                                            Penggunaan material dari bahan <strong className="text-primary">Organik yang ramah
                                                lingkungan</strong> untuk produk Signature-nya.
                                        </p>
                                    </motion.div>

                                    <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 pt-4">
                                        {['Hijab', 'Pakaian', 'Asesoris'].map((item, i) => (
                                            <motion.div
                                                key={i}
                                                className="text-center py-4 bg-white rounded-xl shadow-card border border-accent-gold/5"
                                                whileHover={{ y: -4, scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <p className="text-sm font-medium text-primary">{item}</p>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION 5: INFORMASI KONTAK
            ═══════════════════════════════════════════════ */}
            <section className="py-20 md:py-32 bg-gradient-to-b from-surface-accent via-[#f5ede6] to-surface-accent relative overflow-hidden">
                {/* Animated background blobs */}
                <motion.div
                    className="absolute top-1/4 left-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"
                    animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent-rose/5 rounded-full blur-3xl"
                    animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
                    transition={{ duration: 18, repeat: Infinity }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-20"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">
                            Hubungi Kami
                        </span>
                        <AnimatedTitle
                            text="Informasi Kontak"
                            className="font-display text-4xl md:text-6xl font-normal tracking-tight"
                        />
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Office */}
                        <motion.div variants={scaleIn}>
                            <motion.div
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-accent-gold/10 shadow-soft text-center h-full"
                                whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="w-14 h-14 bg-accent-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="text-2xl">🏢</span>
                                </motion.div>
                                <h4 className="font-display text-lg text-primary mb-2">Office</h4>
                                <p className="text-secondary text-sm leading-relaxed">
                                    Komplek Adi Bumi Graha, Bandung 40292
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Workshop */}
                        <motion.div variants={scaleIn}>
                            <motion.div
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-accent-gold/10 shadow-soft text-center h-full"
                                whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="w-14 h-14 bg-accent-rose/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="text-2xl">🏭</span>
                                </motion.div>
                                <h4 className="font-display text-lg text-primary mb-2">Workshop</h4>
                                <p className="text-secondary text-sm leading-relaxed">
                                    Bumi Panyileukan Cileunyi, Bandung 40614
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Phone */}
                        <motion.div variants={scaleIn}>
                            <motion.div
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-accent-gold/10 shadow-soft text-center h-full"
                                whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="w-14 h-14 bg-accent-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="text-2xl">📞</span>
                                </motion.div>
                                <h4 className="font-display text-lg text-primary mb-2">Phone</h4>
                                <a href="tel:081919234222" className="text-secondary hover:text-accent-gold transition-colors text-sm">
                                    081919234222
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={scaleIn}>
                            <motion.div
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-accent-gold/10 shadow-soft text-center h-full"
                                whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="w-14 h-14 bg-accent-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="text-2xl">✉️</span>
                                </motion.div>
                                <h4 className="font-display text-lg text-primary mb-2">Email</h4>
                                <a href="mailto:deenha.official@gmail.com" className="text-secondary hover:text-accent-gold transition-colors text-sm">
                                    deenha.official@gmail.com
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Website */}
                        <motion.div variants={scaleIn}>
                            <motion.div
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-accent-gold/10 shadow-soft text-center h-full"
                                whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="w-14 h-14 bg-accent-rose/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="text-2xl">🌐</span>
                                </motion.div>
                                <h4 className="font-display text-lg text-primary mb-2">Website</h4>
                                <a href="https://www.deenha.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent-gold transition-colors text-sm">
                                    www.deenha.com
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Social Media */}
                        <motion.div variants={scaleIn}>
                            <motion.div
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-accent-gold/10 shadow-soft text-center h-full"
                                whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="w-14 h-14 bg-accent-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="text-2xl">📱</span>
                                </motion.div>
                                <h4 className="font-display text-lg text-primary mb-2">Social Media</h4>
                                <div className="space-y-1">
                                    <a href="https://instagram.com/deenha.official" target="_blank" rel="noopener noreferrer" className="block text-secondary hover:text-accent-gold transition-colors text-sm">
                                        IG: @deenha.official
                                    </a>
                                    <a href="https://facebook.com/deenha.official" target="_blank" rel="noopener noreferrer" className="block text-secondary hover:text-accent-gold transition-colors text-sm">
                                        FB: deenha.official
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Google Maps Embed */}
                    <motion.div
                        className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-soft border border-accent-gold/10 h-[450px]"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.897702605416!2d107.66769392658578!3d-6.94262069652474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c2a04f4402cb%3A0xceefe3531a163cf0!2sAdibumi%20Graha!5e1!3m2!1sid!2sid!4v1772008205320!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
