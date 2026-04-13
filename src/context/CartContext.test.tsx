import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from './CartContext';
import { Product } from '../data/products';

const mockProduct: Product = {
    id: 1,
    name: 'Test Scarf',
    price: 189000,
    image: '/images/test.jpg',
    category: 'Scarves',
    size: ['110x110'],
    color: 'Dusty Rose',
    colorHex: '#D4A5A5',
};

const TestComponent = () => {
    const { cartItems, addToCart, removeFromCart, cartTotal, cartCount, clearCart, isCartOpen } = useCart();
    return (
        <div>
            <span data-testid="count">{cartCount}</span>
            <span data-testid="total">{cartTotal}</span>
            <span data-testid="items">{cartItems.length}</span>
            <span data-testid="open">{isCartOpen ? 'open' : 'closed'}</span>
            <button data-testid="add" onClick={() => addToCart(mockProduct, '110x110', 'Dusty Rose')}>Add</button>
            <button data-testid="add2" onClick={() => addToCart(mockProduct, 'M', 'Black')}>Add Different</button>
            <button data-testid="add-qty" onClick={() => addToCart(mockProduct, '110x110', 'Dusty Rose', 3)}>Add 3</button>
            <button data-testid="remove" onClick={() => removeFromCart(0)}>Remove</button>
            <button data-testid="clear" onClick={() => clearCart()}>Clear</button>
        </div>
    );
};

describe('CartContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should start with empty cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        expect(screen.getByTestId('count').textContent).toBe('0');
        expect(screen.getByTestId('total').textContent).toBe('0');
        expect(screen.getByTestId('items').textContent).toBe('0');
    });

    it('should add item to cart', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await user.click(screen.getByTestId('add'));

        expect(screen.getByTestId('count').textContent).toBe('1');
        expect(screen.getByTestId('total').textContent).toBe('189000');
        expect(screen.getByTestId('open').textContent).toBe('open');
    });

    it('should increment quantity for same product/size/color', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await user.click(screen.getByTestId('add'));
        await user.click(screen.getByTestId('add'));

        expect(screen.getByTestId('count').textContent).toBe('2');
        expect(screen.getByTestId('items').textContent).toBe('1'); // still 1 unique item
        expect(screen.getByTestId('total').textContent).toBe('378000');
    });

    it('should add as separate item for different size/color', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await user.click(screen.getByTestId('add'));
        await user.click(screen.getByTestId('add2'));

        expect(screen.getByTestId('items').textContent).toBe('2');
        expect(screen.getByTestId('count').textContent).toBe('2');
    });

    it('should add custom quantity', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await user.click(screen.getByTestId('add-qty'));

        expect(screen.getByTestId('count').textContent).toBe('3');
        expect(screen.getByTestId('total').textContent).toBe('567000');
    });

    it('should remove item from cart', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await user.click(screen.getByTestId('add'));
        expect(screen.getByTestId('count').textContent).toBe('1');

        await user.click(screen.getByTestId('remove'));
        expect(screen.getByTestId('count').textContent).toBe('0');
        expect(screen.getByTestId('items').textContent).toBe('0');
    });

    it('should clear all items', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await user.click(screen.getByTestId('add'));
        await user.click(screen.getByTestId('add2'));
        expect(screen.getByTestId('items').textContent).toBe('2');

        await user.click(screen.getByTestId('clear'));
        expect(screen.getByTestId('items').textContent).toBe('0');
        expect(screen.getByTestId('count').textContent).toBe('0');
        expect(screen.getByTestId('total').textContent).toBe('0');
    });

    it('should persist cart to localStorage', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await user.click(screen.getByTestId('add'));

        const stored = localStorage.getItem('deenha-cart');
        expect(stored).not.toBeNull();
        const parsed = JSON.parse(stored!);
        expect(parsed).toHaveLength(1);
        expect(parsed[0].name).toBe('Test Scarf');
    });

    it('should load cart from localStorage on mount', async () => {
        const savedCart = [{ ...mockProduct, selectedSize: '110x110', selectedColor: 'Dusty Rose', quantity: 2 }];
        localStorage.setItem('deenha-cart', JSON.stringify(savedCart));

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        expect(screen.getByTestId('count').textContent).toBe('2');
        expect(screen.getByTestId('items').textContent).toBe('1');
    });

    it('should throw when useCart is used outside CartProvider', () => {
        const BadComponent = () => {
            useCart();
            return null;
        };

        expect(() => render(<BadComponent />)).toThrow('useCart must be used within a CartProvider');
    });
});
