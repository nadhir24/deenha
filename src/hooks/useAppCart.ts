import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { Product } from '../data/products';
import {
    addToCart as addAction,
    removeFromCart as removeAction,
    clearCart as clearAction,
    setCartOpen,
    selectCartItems,
    selectCartTotal,
    selectCartCount,
    selectCartOpen,
} from '../store/cartSlice';

/** Drop-in replacement for useCart() from CartContext — uses Redux */
export function useCart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectCartOpen);

    const addToCart = useCallback(
        (product: Product, size: string, color: string, quantity = 1) => {
            dispatch(addAction({ product, size, color, quantity }));
        },
        [dispatch]
    );

    const removeFromCart = useCallback(
        (index: number) => dispatch(removeAction(index)),
        [dispatch]
    );

    const clearCart = useCallback(() => dispatch(clearAction()), [dispatch]);

    const setIsCartOpen = useCallback(
        (isOpen: boolean) => dispatch(setCartOpen(isOpen)),
        [dispatch]
    );

    return { cartItems, addToCart, removeFromCart, cartTotal, cartCount, isCartOpen, setIsCartOpen, clearCart };
}
