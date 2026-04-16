import React from "react";
import { useCallback, useState } from "react";
import {
  ArrowLeft,
  Bell,
  LogOut,
  Menu,
  Search,
  Upload,
  X,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { STUDENT_NAV_ITEMS, TEACHER_NAV_ITEMS } from "../../constants/navigation";
import { COLORS } from "../../constants/ui";
import AiChatWidget from "../common/AiChatWidget";

export default function MainLayout({ children }) {
  const {
    user,
    activePage,
    setActivePage,
    alerts,
    searchQuery,
    setSearchQuery,
    searchFilter,
    setSearchFilter,
    setActiveModal,
    logout,
    showToast,
  } = useAppContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const unreadAlertsCount = alerts.filter((alert) => !alert.read).length;

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleNavClick = useCallback(
    (id) => {
      setActivePage(id);
      setIsSidebarOpen(false);
      setSearchQuery("");
      setSearchFilter("All");
    },
    [setActivePage, setSearchFilter, setSearchQuery],
  );

  const navItems = user?.role === "teacher" ? TEACHER_NAV_ITEMS : STUDENT_NAV_ITEMS;

  return (
    <>
      {isSidebarOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      ) : null}

      <nav
        className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col bg-[#1a1a2e] transition-transform duration-300 ease-in-out dark:bg-[#0f172a] lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 p-6">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl font-display text-white shadow-lg shadow-[#4C6EF5]/20"
            style={{ backgroundColor: COLORS.primary }}
          >
            PC
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-white">
              StudentHub
            </h1>
            <p className="text-xs text-white/40">PCCoE · Comp. Eng.</p>
          </div>
          <button
            className="ml-auto text-white/50 hover:text-white lg:hidden"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4 h-px w-full bg-white/10" />

        <div className="custom-scrollbar flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {navItems.map((item, index) => {
            if (item.group) {
              return (
                <div key={`${item.group}-${index}`} className="px-4 pb-1 pt-4">
                  <span className="text-[10px] font-bold tracking-widest text-white/30">
                    {item.group}
                  </span>
                </div>
              );
            }

            const isActive = activePage === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/50 ${
                  isActive
                    ? "text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
                style={{
                  backgroundColor: isActive ? `${COLORS.primary}33` : "transparent",
                }}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="flex items-center gap-3">
                  {isActive ? (
                    <div
                      className="absolute left-0 h-8 w-1 rounded-r-full"
                      style={{ backgroundColor: COLORS.primary }}
                    />
                  ) : null}
                  <Icon size={18} className={isActive ? "text-[#4C6EF5]" : ""} />
                  {item.name}
                </div>

                {item.id === "notifications" && unreadAlertsCount > 0 ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unreadAlertsCount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          className="group mt-auto flex cursor-pointer items-center justify-between border-t border-white/10 p-4 transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none"
          onClick={() => setActivePage("settings")}
          tabIndex={0}
          role="button"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setActivePage("settings");
            }
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm"
              style={{ backgroundColor: COLORS.primary }}
            >
              {user.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">{user.name}</p>
              <p className="truncate text-xs text-white/40">TY · Comp. Eng.</p>
            </div>
          </div>

          <button
            onClick={(event) => {
              event.stopPropagation();
              logout();
              showToast("Signed out securely");
            }}
            className="p-2 text-white/30 transition-colors hover:text-red-400 focus:text-red-400 focus:outline-none"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      <div className="relative flex h-screen flex-1 flex-col overflow-hidden">
        <header className="z-10 flex h-20 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white/50 px-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50 md:px-8">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="p-2 text-slate-800 dark:text-slate-200 lg:hidden"
              onClick={toggleSidebar}
              aria-label="Open Sidebar"
            >
              <Menu size={24} />
            </button>

            {activePage !== "dashboard" ? (
              <button
                onClick={() => setActivePage("dashboard")}
                className="mr-2 flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-slate-600 transition-colors hover:text-[#4C6EF5] focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] dark:bg-slate-800 dark:text-slate-300"
                aria-label="Go Back to Dashboard"
              >
                <ArrowLeft size={16} />
                <span className="hidden text-sm font-bold sm:inline">Back</span>
              </button>
            ) : null}

            {["assignments", "labs"].includes(activePage) && (
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <div className="relative hidden md:block">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-48 rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 lg:w-64"
                    aria-label="Global Search"
                  />
                </div>

                <select
                  value={searchFilter}
                  onChange={(event) => setSearchFilter(event.target.value)}
                  className="hidden cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 lg:block"
                >
                  <option value="All">All Subjects</option>
                  <option value="UI/UX Lab">UI/UX Lab</option>
                  <option value="Web Dev">Web Dev</option>
                  <option value="Cloud Lab">Cloud Lab</option>
                  <option value="DBMS">DBMS</option>
                  <option value="OS Lab">OS Lab</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              onClick={() => setActivePage("notifications")}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadAlertsCount > 0 ? (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white dark:border-slate-800">
                  {unreadAlertsCount}
                </span>
              ) : null}
            </button>

            {user?.role !== "teacher" && (
              <button
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-sm shadow-[#4C6EF5]/30 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                style={{ backgroundColor: COLORS.primary }}
                onClick={() => setActiveModal("submit-modal")}
              >
                <Upload size={16} />
                <span className="hidden sm:inline">Submit</span>
              </button>
            )}
          </div>
        </header>

        <main className="custom-scrollbar relative z-0 flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
      
      {/* Global AI Chat Assistant */}
      <AiChatWidget />
    </>
  );
}
