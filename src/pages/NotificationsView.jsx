import React from "react";
import { useEffect } from "react";
import { Bell, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { HOVER_EFFECT } from "../constants/ui";
import EmptyState from "../components/common/EmptyState";

export default function NotificationsView() {
  const { alerts, setAlerts, markAlertsAsRead } = useAppContext();

  useEffect(() => {
    markAlertsAsRead();
  }, [markAlertsAsRead]);

  return (
    <div className="mx-auto max-w-4xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold dark:text-white">
            Notifications
          </h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Stay updated with your latest alerts
          </p>
        </div>
        {alerts.length > 0 ? (
          <button
            className="text-sm font-bold text-slate-500 transition-colors hover:text-slate-800 dark:hover:text-slate-200"
            onClick={() => setAlerts([])}
          >
            Clear All
          </button>
        ) : null}
      </div>

      <div
        className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}
      >
        <div className="space-y-3 p-4">
          {alerts.length === 0 ? (
            <EmptyState
              icon={Bell}
              title="All caught up!"
              desc="No new notifications at this time."
            />
          ) : (
            alerts.map((alert) => {
              const Icon = alert.icon;

              return (
                <div
                  key={alert.id}
                  className="group relative flex gap-4 rounded-xl border-l-4 bg-slate-50 p-4 transition-colors dark:bg-slate-700/50"
                  style={{ borderLeftColor: alert.color }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: alert.bg, color: alert.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">
                      {alert.title}
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {alert.msg}
                    </p>
                  </div>
                  <button
                    className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 opacity-0 transition-all hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] group-hover:opacity-100 dark:hover:bg-white/5"
                    onClick={() =>
                      setAlerts(alerts.filter((item) => item.id !== alert.id))
                    }
                    aria-label="Dismiss"
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
