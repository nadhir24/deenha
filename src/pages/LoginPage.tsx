import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/admin');
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 bg-surface-secondary flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white p-12 shadow-2xl"
            >
                <div className="text-center mb-12">
                    <img src="/assets/logo.png" alt="DEENHA" className="h-16 w-auto mx-auto mb-6 brightness-0" />
                    <h1 className="font-display text-3xl italic">Atelier Portal</h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-secondary mt-2">Employee & Admin Access</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 text-[11px] font-bold tracking-widest uppercase text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                            placeholder="ADMIN@DEENHA.COM"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent-gold transition-all duration-500 shadow-xl disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Enter Atelier'}
                    </button>
                </form>

                <p className="text-center mt-12 text-[9px] uppercase tracking-widest text-secondary leading-relaxed">
                    Access restricted to authorized Deenha personnel only.
                    Unauthorized attempts are logged.
                </p>
            </motion.div>
        </main>
    );
};

export default LoginPage;
