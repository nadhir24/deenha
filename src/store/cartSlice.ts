import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../data/products';

export interface CartItem extends Product {
    selectedSize: string;
    selectedColor: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

const loadCart = (): CartItem[] => {
    try {
        const saved = localStorage.getItem('deenha-cart');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const saveCart = (items: CartItem[]) => {
    try {
        localStorage.setItem('deenha-cart', JSON.stringify(items));
    } catch { /* localStorage unavailable */ }
};

const initialState: CartState = {
    items: loadCart(),
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{ product: Product; size: string; color: string; quantity?: number }>) {
            const { product, size, color, quantity = 1 } = action.payload;
            const existing = state.items.findIndex(
                item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
            );
            if (existing > -1) {
                state.items[existing].quantity += quantity;
            } else {
                state.items.push({ ...product, selectedSize: size, selectedColor: color, quantity });
            }
            state.isOpen = true;
            saveCart(state.items);
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items.splice(action.payload, 1);
            saveCart(state.items);
        },
        clearCart(state) {
            state.items = [];
            saveCart(state.items);
        },
        setCartOpen(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
    },
    selectors: {
        selectCartItems: (state) => state.items,
        selectCartTotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        selectCartCount: (state) => state.items.reduce((count, item) => count + item.quantity, 0),
        selectCartOpen: (state) => state.isOpen,
    },
});

export const { addToCart, removeFromCart, clearCart, setCartOpen } = cartSlice.actions;
export const { selectCartItems, selectCartTotal, selectCartCount, selectCartOpen } = cartSlice.selectors;
export default cartSlice.reducer;
