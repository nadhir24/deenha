import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-primary transition-colors duration-300">
            <div className="max-w-md w-full px-6 py-12 text-center">
              <h1 className="font-display text-3xl text-primary dark:text-white mb-4 uppercase tracking-widest">
                Something Went Wrong
              </h1>
              <p className="text-primary dark:text-white/80 mb-8 text-sm leading-relaxed">
                We encountered an unexpected error. Please try again or contact support if the problem persists.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                  <p className="text-xs text-red-600 dark:text-red-400 font-mono text-left break-words">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              <button
                onClick={this.resetError}
                className="px-8 py-3 bg-accent-gold text-primary font-display text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-accent-gold/90 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
