import React from "react";
import { Component } from "react";
import { AlertCircle } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-slate-800">
          <AlertCircle size={48} className="mb-4 text-red-500" />
          <h1 className="mb-2 text-2xl font-bold">Something went wrong.</h1>
          <p className="mb-6 max-w-md text-center text-slate-500">
            An unexpected error occurred. Please reload.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[#4C6EF5] px-6 py-2 font-bold text-white shadow-sm"
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
