import { Link } from 'react-router-dom';

const Footer = () => {
    const footerLinks = {
        Shop: [
            { name: 'Scarves', href: '/shop?category=Scarves' },
            { name: 'Dresses', href: '/shop?category=Dresses' },
            { name: 'Bergo', href: '/shop?category=Bergo' },
            { name: 'Pray Set', href: '/shop?category=Pray Set' },
            { name: 'New Arrivals', href: '/shop?badge=new' },
        ],
        Support: [
            { name: 'Contact Us', href: '/contact' },
            { name: 'Shipping Info', href: '/shipping' },
            { name: 'Returns', href: '/returns' },
            { name: 'Size Guide', href: '/size-guide' },
            { name: 'FAQ', href: '/faq' },
        ],
        Company: [
            { name: 'About Us', href: '/about' },
            { name: 'Our Story', href: '/about#story' },
        ],
    };

    return (
        <footer className="bg-white border-t border-black/5 pt-24 pb-12">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                {/* Content Sections */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="col-span-1">
                        <Link to="/" className="inline-block mb-8">
                            <img src="/assets/logo.png" alt="DEENHA" className="h-16 w-auto brightness-0" />
                        </Link>
                        <p className="text-secondary text-[11px] leading-relaxed tracking-wide max-w-[200px]">
                            Crafting exquisite modesty for the modern woman who values elegance and tradition.
                        </p>
                    </div>

                    {/* Links Grid */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-primary">
                                {title}
                            </h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-[11px] font-medium text-secondary hover:text-primary transition-colors uppercase tracking-widest"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-12">
                    {/* Socials & Marketplaces */}
                    <div className="flex items-center gap-8">
                        <a
                            href="https://www.instagram.com/deenha.official/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group transition-transform hover:scale-110"
                            title="Instagram"
                        >
                            <svg className="w-5 h-5 text-primary group-hover:text-accent-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a
                            href="https://shopee.co.id/deenha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group transition-transform hover:scale-110"
                            title="Shopee"
                        >
                            <img src="/assets/shopee.png" alt="Shopee" className="h-6 w-auto grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </a>
                        <a
                            href="https://www.tokopedia.com/deenha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group transition-transform hover:scale-110"
                            title="Tokopedia"
                        >
                            <img src="/assets/tokopedia.png" alt="Tokopedia" className="h-6 w-auto grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </a>
                    </div>

                    {/* Legal & Payments */}
                    <div className="flex flex-col items-center md:items-end gap-6">
                        <div className="flex items-center gap-6 opacity-80 grayscale hover:opacity-100 transition-opacity duration-500">
                            {/* QRIS */}
                            <img src="/assets/qris.png" alt="QRIS" className="h-10 w-auto" />
                            {/* BCA */}
                            <img src="/assets/bca.png" alt="BCA" className="h-8 w-auto" />
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-secondary">
                            © 2026 DEENHA. ALL RIGHTS RESERVED.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
