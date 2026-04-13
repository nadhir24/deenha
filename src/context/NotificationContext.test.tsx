import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NotificationProvider, useNotification } from './NotificationContext';

const TestComponent = () => {
    const { showNotification } = useNotification();
    return (
        <div>
            <button data-testid="success" onClick={() => showNotification('Success message', 'success')}>Success</button>
            <button data-testid="error" onClick={() => showNotification('Error message', 'error')}>Error</button>
            <button data-testid="info" onClick={() => showNotification('Info message', 'info')}>Info</button>
            <button data-testid="default" onClick={() => showNotification('Default message')}>Default</button>
        </div>
    );
};

describe('NotificationContext', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should show success notification', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => { fireEvent.click(screen.getByTestId('success')); });
        expect(screen.getByText('Success message')).toBeInTheDocument();
    });

    it('should show error notification', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => { fireEvent.click(screen.getByTestId('error')); });
        expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should auto-remove notification after 3 seconds', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => { fireEvent.click(screen.getByTestId('success')); });
        expect(screen.getByText('Success message')).toBeInTheDocument();

        act(() => { vi.advanceTimersByTime(3100); });
        expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });

    it('should default to success type', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => { fireEvent.click(screen.getByTestId('default')); });
        expect(screen.getByText('Default message')).toBeInTheDocument();
    });

    it('should show multiple notifications', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        act(() => {
            fireEvent.click(screen.getByTestId('success'));
            fireEvent.click(screen.getByTestId('error'));
        });

        expect(screen.getByText('Success message')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should throw when used outside provider', () => {
        const BadComponent = () => {
            useNotification();
            return null;
        };
        expect(() => render(<BadComponent />)).toThrow('useNotification must be used within a NotificationProvider');
    });
});
