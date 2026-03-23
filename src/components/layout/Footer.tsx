import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    const footerLinks = [
        {
            title: t('footer.shop'),
            links: [
                { name: t('footer.links.scarf'), href: '/shop?category=Scarves' },
                { name: t('footer.links.dress'), href: '/shop?category=Dresses' },
                { name: t('footer.links.bergo'), href: '/shop?category=Bergo' },
                { name: t('footer.links.mukena'), href: '/shop?category=Pray Set' },
                { name: t('footer.links.new_arrival'), href: '/shop?badge=new' },
            ]
        },
        {
            title: t('footer.support'),
            links: [
                { name: t('footer.links.contact_us'), href: '/contact' },
                { name: t('footer.links.shipping_info'), href: '/shipping' },
                { name: t('footer.links.returns'), href: '/returns' },
                { name: t('footer.links.size_guide'), href: '/size-guide' },
                { name: t('footer.links.faq'), href: '/faq' },
            ]
        },
        {
            title: t('footer.company'),
            links: [
                { name: t('footer.links.about_us'), href: '/about' },
                { name: t('footer.links.our_story'), href: '/about#story' },
                { name: t('footer.links.journal'), href: '/journal' },
            ]
        }
    ];

    return (
        <footer className="bg-white dark:bg-primary border-t border-black/5 dark:border-white/5 pt-24 pb-12 transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1">
                        <Link to="/" className="inline-block mb-8">
                            <img src="/assets/logo.png" alt="DEENHA" className="h-16 w-auto brightness-0 dark:invert transition-all duration-300" width={215} height={215} />
                        </Link>
                        <p className="text-secondary dark:text-white/60 text-[11px] leading-relaxed tracking-wide max-w-[200px]">
                            {t('footer.description')}
                        </p>
                    </div>

                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-primary dark:text-white">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-[11px] font-medium text-secondary dark:text-white/60 hover:text-primary dark:hover:text-white transition-colors uppercase tracking-widest"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-12 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex items-center gap-8">
                        <a
                            href="https://www.instagram.com/deenha.official/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group transition-transform hover:scale-110"
                            title="Instagram"
                        >
                            <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-accent-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0-3.668-.014-4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.tiktok.com/@deenha.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group transition-transform hover:scale-110"
                            title="TikTok"
                        >
                            <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-accent-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.74.02 1.48-.04 2.97-.04 4.44-.38-.05-.77-.01-1.14.04-1.57.21-3.05 1.48-3.3 3.08-.25 1.61.5 3.26 1.82 4.16 1.02.7 2.34.88 3.54.47 1.1-.38 1.98-1.27 2.32-2.36.14-.49.2-1 .18-1.51l-.02-9.56Z" />
                            </svg>
                        </a>
                        <a
                            href="https://shopee.co.id/deenha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group transition-transform hover:scale-110"
                            title="Shopee"
                        >
                            <img src="/assets/shopee.png" alt="Shopee" className="h-6 w-auto grayscale group-hover:grayscale-0 transition-all duration-500" width={1024} height={671} loading="lazy" />
                        </a>
                        <a
                            href="https://www.tokopedia.com/deenha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group transition-transform hover:scale-110"
                            title="Tokopedia"
                        >
                            <img src="/assets/tokopedia.png" alt="Tokopedia" className="h-6 w-auto grayscale group-hover:grayscale-0 transition-all duration-500" width={800} height={800} loading="lazy" />
                        </a>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-6">
                        <div className="flex items-center gap-6 opacity-80 grayscale hover:opacity-100 transition-opacity duration-500">
                            <img src="/assets/qris.png" alt="QRIS" className="h-10 w-auto" width={960} height={155} loading="lazy" />
                            <img src="/assets/bca.png" alt="BCA" className="h-8 w-auto" width={1024} height={768} loading="lazy" />
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-secondary">
                            {t('footer.rights')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
