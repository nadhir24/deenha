import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductManager from '../components/admin/ProductManager';
import InstagramManager from '../components/admin/InstagramManager';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Products');

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <main className="min-h-screen bg-surface-secondary pt-32 pb-20">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-2 block">
                            Management Workspace
                        </span>
                        <h1 className="font-display text-4xl md:text-5xl">Atelier Admin</h1>
                        <p className="text-secondary text-[11px] uppercase tracking-widest mt-2">
                            Logged in as: <span className="text-primary font-bold">{user?.email}</span> ({user?.role})
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="text-[10px] uppercase font-bold tracking-[0.3em] bg-white border border-black/10 px-8 py-4 hover:bg-black hover:text-white transition-all duration-500 shadow-sm"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 shadow-sm border border-black/5">
                            <h3 className="text-[10px] uppercase font-bold tracking-widest text-secondary mb-6">Quick Stats</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-secondary opacity-60 mb-1">Total Products</p>
                                    <p className="text-2xl font-display">24</p>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-secondary opacity-60 mb-1">Orders Today</p>
                                    <p className="text-2xl font-display">12</p>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-secondary opacity-60 mb-1">Revenue (MoM)</p>
                                    <p className="text-2xl font-display">+18%</p>
                                </div>
                            </div>
                        </div>

                        <nav className="bg-white p-4 shadow-sm border border-black/5 flex flex-col space-y-2">
                            {['Products', 'Instagram', 'Orders', 'Settings'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setActiveTab(item)}
                                    className={`text-left px-4 py-3 text-[10px] uppercase font-bold tracking-widest transition-colors ${activeTab === item ? 'bg-primary text-white' : 'text-secondary hover:bg-surface-secondary'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white shadow-xl border border-black/5 overflow-hidden"
                        >
                            <div className="p-0">
                                {activeTab === 'Products' && <ProductManager />}
                                {activeTab === 'Instagram' && <InstagramManager />}
                                {['Orders', 'Settings'].includes(activeTab) && (
                                    <div className="p-20 text-center">
                                        <p className="text-secondary text-[10px] uppercase tracking-[0.4em]">Section Coming Soon</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;
