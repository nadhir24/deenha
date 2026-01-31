import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem extends Product {
    selectedSize: string;
    selectedColor: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
    removeFromCart: (index: number) => void;
    cartTotal: number;
    cartCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product: Product, size: string, color: string, quantity: number = 1) => {
        setCartItems(prev => {
            const existingItemIndex = prev.findIndex(item =>
                item.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
            );

            if (existingItemIndex > -1) {
                const newItems = [...prev];
                newItems[existingItemIndex].quantity += quantity;
                setIsCartOpen(true);
                return newItems;
            }

            setIsCartOpen(true);
            return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity }];
        });
    };

    const removeFromCart = (index: number) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartTotal, cartCount, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
