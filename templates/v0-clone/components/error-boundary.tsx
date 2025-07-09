"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive" className="m-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            <div className="space-y-2">
              <p>
                An error occurred while processing your request. This might be due to:
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Vercel free tier function timeout (10s limit)</li>
                <li>API rate limits from external services</li>
                <li>Network connectivity issues</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => this.setState({ hasError: false })}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="sm"
                >
                  Refresh Page
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}