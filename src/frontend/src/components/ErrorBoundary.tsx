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

      // Use inline styles as fallback in case CSS tokens haven't loaded yet.
      // This prevents a fully white / unstyled error screen.
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "var(--background, #1a0f00)",
            color: "var(--foreground, #f5c842)",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              maxWidth: "440px",
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Om symbol */}
            <div style={{ fontSize: "56px", lineHeight: 1 }} aria-hidden="true">
              ॐ
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <h1
                style={{ fontSize: "22px", fontWeight: 600, margin: 0 }}
                className="font-display text-foreground"
              >
                Spiritual Connect
              </h1>
              <p
                style={{ fontSize: "14px", opacity: 0.7, margin: 0 }}
                className="text-muted-foreground"
              >
                Something went wrong while loading the app.
              </p>
              {this.state.error && (
                <p
                  style={{
                    fontSize: "11px",
                    opacity: 0.55,
                    fontFamily: "monospace",
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    margin: 0,
                    wordBreak: "break-all",
                  }}
                  className="text-muted-foreground bg-muted rounded"
                >
                  {this.state.error.message}
                </p>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                data-ocid="error_boundary.retry_button"
                onClick={this.handleRetry}
                style={{
                  background: "#b45309",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Try Again
              </button>
              <button
                type="button"
                data-ocid="error_boundary.reload_button"
                onClick={() => window.location.reload()}
                style={{
                  background: "transparent",
                  color: "inherit",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "6px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
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
