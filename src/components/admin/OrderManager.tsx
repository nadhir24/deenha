import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../../context/NotificationContext';

interface OrderItem {
    id: number;
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    order_number: string;
    items: OrderItem[];
    total_price: number;
    status: 'pending' | 'paid' | 'shipped' | 'cancelled';
    created_at: string;
    customer_phone?: string;
    stock_deducted: boolean;
}

const OrderManager = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id: number, newStatus: string) => {
        try {
            const order = orders.find(o => o.id === id);
            if (!order) return;

            const isDeductionStatus = newStatus === 'paid' || newStatus === 'shipped';
            const isCancelStatus = newStatus === 'cancelled';

            // 1. Stock Deduction Logic
            if (isDeductionStatus && !order.stock_deducted) {
                // Deduct stock
                for (const item of order.items) {
                    const { data: product } = await supabase.from('products').select('*').eq('id', item.id).single();
                    if (!product) continue;

                    let updatePayload: any = {};
                    if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
                        const updatedVariants = product.variants.map((v: any) => {
                            if (v.color === item.color) {
                                return { ...v, stock: Math.max(0, (v.stock || 0) - item.quantity) };
                            }
                            return v;
                        });
                        const totalStock = updatedVariants.reduce((sum: number, v: any) => sum + (Number(v.stock) || 0), 0);
                        updatePayload = { variants: updatedVariants, stock: totalStock };
                    } else {
                        updatePayload = { stock: Math.max(0, (product.stock || 0) - item.quantity) };
                    }
                    await supabase.from('products').update(updatePayload).eq('id', item.id);
                }

                // Update order in DB with stock_deducted flag
                const { error } = await supabase
                    .from('orders')
                    .update({ status: newStatus, stock_deducted: true })
                    .eq('id', id);
                if (error) throw error;

                setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus as any, stock_deducted: true } : o));
            }
            else if (isCancelStatus && order.stock_deducted) {
                // Restore stock if it was previously deducted
                for (const item of order.items) {
                    const { data: product } = await supabase.from('products').select('*').eq('id', item.id).single();
                    if (!product) continue;

                    let updatePayload: any = {};
                    if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
                        const updatedVariants = product.variants.map((v: any) => {
                            if (v.color === item.color) {
                                return { ...v, stock: (v.stock || 0) + item.quantity };
                            }
                            return v;
                        });
                        const totalStock = updatedVariants.reduce((sum: number, v: any) => sum + (Number(v.stock) || 0), 0);
                        updatePayload = { variants: updatedVariants, stock: totalStock };
                    } else {
                        updatePayload = { stock: (product.stock || 0) + item.quantity };
                    }
                    await supabase.from('products').update(updatePayload).eq('id', item.id);
                }

                // Update order in DB - unset stock_deducted flag
                const { error } = await supabase
                    .from('orders')
                    .update({ status: newStatus, stock_deducted: false })
                    .eq('id', id);
                if (error) throw error;

                setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus as any, stock_deducted: false } : o));
            }
            else {
                // Just update status for other cases
                const { error } = await supabase
                    .from('orders')
                    .update({ status: newStatus })
                    .eq('id', id);
                if (error) throw error;
                setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus as any } : o));
            }

            showNotification(`Order marked as ${newStatus}`, 'success');
        } catch (err) {
            console.error('Error updating order:', err);
            showNotification('Failed to update status', 'error');
        }
    };

    const deleteOrder = async (id: number) => {
        if (!confirm('Are you sure you want to delete this order record?')) return;
        try {
            const { error } = await supabase
                .from('orders')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setOrders(orders.filter(o => o.id !== id));
        } catch (err) {
            console.error('Error deleting order:', err);
        }
    };

    const filteredOrders = orders.filter(o => filter === 'all' || o.status === filter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'paid': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="p-20 text-center">
                <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent animate-spin mx-auto mb-4" />
                <p className="text-secondary text-[10px] uppercase tracking-widest">Loading Orders...</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-display text-2xl">Customer Orders</h2>
                <div className="flex gap-2">
                    {['all', 'pending', 'paid', 'shipped', 'cancelled'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest border transition-all ${filter === s ? 'bg-primary text-white' : 'bg-white text-secondary hover:border-black'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-black/5">
                            <th className="py-4 text-[10px] uppercase tracking-widest text-secondary font-bold">Order info</th>
                            <th className="py-4 text-[10px] uppercase tracking-widest text-secondary font-bold">Items</th>
                            <th className="py-4 text-[10px] uppercase tracking-widest text-secondary font-bold">Total</th>
                            <th className="py-4 text-[10px] uppercase tracking-widest text-secondary font-bold">Status</th>
                            <th className="py-4 text-[10px] uppercase tracking-widest text-secondary font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {filteredOrders.map((order) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="border-b border-black/5 hover:bg-surface-secondary/50 transition-colors"
                                >
                                    <td className="py-6">
                                        <p className="font-bold text-sm mb-1">{order.order_number}</p>
                                        <p className="text-[10px] text-secondary">
                                            {new Date(order.created_at).toLocaleString('id-ID')}
                                        </p>
                                    </td>
                                    <td className="py-6">
                                        <div className="space-y-1">
                                            {order.items.map((item, i) => (
                                                <p key={i} className="text-[11px] text-secondary">
                                                    {item.quantity}x {item.name} <span className="opacity-60">({item.size}, {item.color})</span>
                                                </p>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-6 font-medium text-sm">
                                        Rp {order.total_price.toLocaleString('id-ID')}
                                    </td>
                                    <td className="py-6">
                                        <span className={`px-3 py-1 text-[9px] uppercase font-bold tracking-widest rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                                className="text-[10px] border border-black/10 px-2 py-1 outline-none focus:border-accent-gold"
                                            >
                                                <option value="pending">Set Pending</option>
                                                <option value="paid">Set Paid</option>
                                                <option value="shipped">Set Shipped</option>
                                                <option value="cancelled">Set Cancelled</option>
                                            </select>
                                            <button
                                                onClick={() => deleteOrder(order.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
                {filteredOrders.length === 0 && (
                    <div className="py-20 text-center text-secondary text-[11px] uppercase tracking-widest">
                        No orders found
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderManager;
