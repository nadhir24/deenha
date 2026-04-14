import SEOHead from '../components/SEOHead';

const SizeGuidePage = () => {
    return (
        <main className="pt-44 pb-24 bg-white dark:bg-primary transition-colors duration-300">
            <SEOHead title={`Size Guide - DEENHA`} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block text-center">Perfect Fit</span>
                <h1 className="font-display text-5xl md:text-7xl font-normal tracking-tight mb-16 italic text-primary dark:text-white text-center">Size Guide</h1>
                
                <div className="space-y-20 text-secondary dark:text-white/75">
                    <section>
                        <h2 className="font-display text-3xl mb-8 text-primary dark:text-white text-center">Signature Scarves</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-black/10 dark:border-white/10">
                                        <th className="py-4 text-[10px] uppercase tracking-widest font-bold">Type</th>
                                        <th className="py-4 text-[10px] uppercase tracking-widest font-bold">Dimensions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-black/5 dark:border-white/5">
                                        <td className="py-4">Square Scarf (Premium Voal)</td>
                                        <td className="py-4">110 cm x 110 cm</td>
                                    </tr>
                                    <tr className="border-b border-black/5 dark:border-white/5">
                                        <td className="py-4">Large Square Scarf</td>
                                        <td className="py-4">140 cm x 140 cm</td>
                                    </tr>
                                    <tr className="border-b border-black/5 dark:border-white/5">
                                        <td className="py-4">Pashmina</td>
                                        <td className="py-4">180 cm x 75 cm</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    
                    <section>
                        <h2 className="font-display text-3xl mb-8 text-primary dark:text-white text-center">Dresses & Abayas</h2>
                        <p className="text-center mb-8 italic">One size fits most (Regular Fit)</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-black/10 dark:border-white/10">
                                        <th className="py-4 text-[10px] uppercase tracking-widest font-bold">Measurement</th>
                                        <th className="py-4 text-[10px] uppercase tracking-widest font-bold">Size (cm)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-black/5 dark:border-white/5">
                                        <td className="py-4">Bust</td>
                                        <td className="py-4">105 - 110 cm</td>
                                    </tr>
                                    <tr className="border-b border-black/5 dark:border-white/5">
                                        <td className="py-4">Dress Length</td>
                                        <td className="py-4">140 - 145 cm</td>
                                    </tr>
                                    <tr className="border-b border-black/5 dark:border-white/5">
                                        <td className="py-4">Sleeve Length</td>
                                        <td className="py-4">58 - 60 cm</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default SizeGuidePage;
