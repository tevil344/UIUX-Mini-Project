import React from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { INITIAL_ALERTS } from "../data/mockData";
import { apiService } from "../services/apiService";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("All");
  const [activeModal, setActiveModal] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("sh_theme") === "dark",
  );
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  useEffect(() => {
    const session = apiService.getSession();
    if (session) {
      setUser(session);
    }
    setIsAuthLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("sh_theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const showToast = useCallback((msg, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);

  const login = async (email, password) => {
    const userData = await apiService.login(email, password);
    setUser(userData);
  };

  const logout = async () => {
    await apiService.logout();
    localStorage.removeItem("sh_chat_history");
    setUser(null);
    setActivePage("dashboard");
  };

  const markAlertsAsRead = useCallback(() => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthLoading,
    setUser,
    activePage,
    setActivePage,
    searchQuery,
    setSearchQuery,
    searchFilter,
    setSearchFilter,
    darkMode,
    setDarkMode,
    activeModal,
    setActiveModal,
    alerts,
    setAlerts,
    markAlertsAsRead,
    toasts,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
