import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const ThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
        throw new Error('Test error');
    }
    return <div data-testid="child">Child content</div>;
};

describe('ErrorBoundary', () => {
    beforeEach(() => {
        // Suppress React error boundary console.error noise
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should render children when no error', () => {
        render(
            <ErrorBoundary>
                <ThrowingComponent shouldThrow={false} />
            </ErrorBoundary>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should render fallback UI when child throws', () => {
        render(
            <ErrorBoundary>
                <ThrowingComponent shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.queryByTestId('child')).not.toBeInTheDocument();
        expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
        expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('should render custom fallback when provided', () => {
        render(
            <ErrorBoundary fallback={<div data-testid="custom-fallback">Custom error</div>}>
                <ThrowingComponent shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
        expect(screen.queryByText('Something Went Wrong')).not.toBeInTheDocument();
    });

    it('should recover when Try Again is clicked', async () => {
        const user = userEvent.setup();
        let shouldThrow = true;

        const ConditionalThrower = () => {
            if (shouldThrow) throw new Error('Test error');
            return <div data-testid="recovered">Recovered</div>;
        };

        const { rerender } = render(
            <ErrorBoundary>
                <ConditionalThrower />
            </ErrorBoundary>
        );

        expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();

        // Fix the error condition before clicking Try Again
        shouldThrow = false;
        await user.click(screen.getByText('Try Again'));

        // After reset, it re-renders children
        rerender(
            <ErrorBoundary>
                <ConditionalThrower />
            </ErrorBoundary>
        );

        expect(screen.getByTestId('recovered')).toBeInTheDocument();
    });
});
