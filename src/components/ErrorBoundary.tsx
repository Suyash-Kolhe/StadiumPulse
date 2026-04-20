import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public props: Props;
  public state: State;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-6 bg-black/40 border border-danger/20 rounded-[32px] backdrop-blur-xl">
          <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-danger" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white uppercase italic">System Fault Detected</h2>
            <p className="text-text-muted text-sm max-w-md mx-auto">
              The Command Center encountered an unexpected telemetry error. System integrity remains stable.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black uppercase text-xs rounded-full hover:bg-accent transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            Reboot Command View
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
