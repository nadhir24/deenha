import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

const NotFoundPage = () => {
    return (
        <main className="min-h-screen bg-white flex items-center justify-center px-6 pt-20">
            <SEOHead title="Page Not Found" description="The page you are looking for does not exist." />
            
            <div className="max-w-xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">Error 404</span>
                    
                    <h1 className="font-display text-5xl md:text-7xl font-normal tracking-tight mb-8 italic">
                        Lost in Elegance
                    </h1>
                    
                    <p className="text-secondary text-sm leading-relaxed mb-12 max-w-sm mx-auto italic">
                        The page you are seeking has drifted away. Like a silk scarf in the breeze, it is no longer where it was once found.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link 
                            to="/" 
                            className="text-[10px] uppercase font-bold tracking-[0.3em] bg-primary text-white px-10 py-5 hover:bg-accent-gold transition-all duration-500 w-full sm:w-auto"
                        >
                            Return to Home
                        </Link>
                        <Link 
                            to="/shop" 
                            className="text-[10px] uppercase font-bold tracking-[0.3em] border border-black/10 px-10 py-5 hover:border-accent-gold transition-all duration-500 w-full sm:w-auto"
                        >
                            Browse Atelier
                        </Link>
                    </div>
                </motion.div>
                
                {/* Decorative Element */}
                <motion.div 
                    className="mt-24 opacity-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <img src="/assets/logo.png" alt="DEENHA" className="h-20 mx-auto grayscale" />
                </motion.div>
            </div>
        </main>
    );
};

export default NotFoundPage;
