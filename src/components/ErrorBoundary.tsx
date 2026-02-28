"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Keep this for easier debugging and future reporting integration.
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  private resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
          <h1 style={{ marginBottom: "0.5rem" }}>Something went wrong</h1>
          <p style={{ marginBottom: "1rem" }}>
            An unexpected error occurred while rendering this page.
          </p>
          {process.env.NODE_ENV !== "production" && this.state.error ? (
            <pre
              style={{
                background: "#111827",
                color: "#f9fafb",
                padding: "1rem",
                borderRadius: "0.5rem",
                overflowX: "auto",
                marginBottom: "1rem",
              }}
            >
              {this.state.error.message}
            </pre>
          ) : null}
          <button
            type="button"
            onClick={this.resetError}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
