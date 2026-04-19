import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6">
            {/* Om symbol */}
            <div
              className="text-6xl text-primary select-none"
              aria-hidden="true"
            >
              ॐ
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-2xl font-semibold text-foreground">
                Spiritual Connect
              </h1>
              <p className="text-muted-foreground text-sm">
                Something went wrong while loading the app.
              </p>
              {this.state.error && (
                <p className="text-xs text-muted-foreground/70 font-mono bg-muted rounded px-3 py-2 mt-2 break-all">
                  {this.state.error.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                data-ocid="error_boundary.retry_button"
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Try Again
              </button>
              <button
                type="button"
                data-ocid="error_boundary.reload_button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
