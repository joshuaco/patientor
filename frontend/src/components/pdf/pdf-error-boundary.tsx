import type { ReactNode } from 'react';
import { Component } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class PDFErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('PDF Generation Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-medium rounded-lg">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Error al generar PDF
        </div>
      );
    }

    return this.props.children;
  }
}

export default PDFErrorBoundary;
