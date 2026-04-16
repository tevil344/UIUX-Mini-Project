import React from "react";
import { useAppContext, AppProvider } from "./context/AppContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ToastContainer from "./components/common/ToastContainer";
import Modals from "./components/modals/Modals";
import MainLayout from "./components/layout/MainLayout";
import PageRouter from "./components/layout/PageRouter";
import AuthView from "./pages/AuthView";
import { Loader2 } from "lucide-react";

function AppContent() {
  const { user, isAuthLoading, activePage, darkMode, toasts, activeModal } =
    useAppContext();

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="animate-spin text-[#4C6EF5]" size={32} />
      </div>
    );
  }

  return (
    <div className={darkMode && user ? "dark" : ""}>
      <div className="flex h-screen w-full overflow-hidden bg-[#eef0f8] font-sans text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100">
        {!user ? (
          <AuthView />
        ) : (
          <MainLayout>
            <PageRouter activePage={activePage} />
          </MainLayout>
        )}

        {activeModal && user ? <Modals /> : null}
        <ToastContainer toasts={toasts} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
