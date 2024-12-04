import React from "react";

type ErrorBoundaryState = {
    hasError: boolean;
  };
  
  type ErrorBoundaryProps = {
    children: React.ReactNode;
  };
  
  
  class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: any) {
      // Update state so the next render shows the fallback UI
      return { hasError: true };
    }
  
    componentDidCatch(error: any, info: any) {
      // Log the error or send it to an error tracking service
      console.error("ErrorBoundary caught an error:", error, info);
    }
  
    render() {
      if (this.state?.hasError) {
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children;
    }
  }

export default ErrorBoundary;