import React from "react";
import { SearchX } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { LABS_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";
import EmptyState from "../components/common/EmptyState";

export default function LabSessionsView() {
  const { searchQuery, searchFilter } = useAppContext();

  const sessions = LABS_DATA.sessions
    .filter((item) => searchFilter === "All" || item.subject.includes(searchFilter))
    .filter(
      (item) =>
        item.experiment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div>
        <h2 className="font-display text-3xl font-bold dark:text-white">{LABS_DATA.title}</h2>
        <p className="mt-1 text-slate-500 dark:text-slate-400">{LABS_DATA.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {LABS_DATA.stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl border border-slate-100 border-t-4 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}
            style={{ borderTopColor: stat.color }}
          >
            <p className="mb-2 text-xs font-bold uppercase text-slate-400">{stat.label}</p>
            <h3 className="font-display text-3xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
        <div className="border-b border-slate-100 p-4 dark:border-slate-700">
          <h3 className="font-display font-bold text-slate-800 dark:text-slate-100">Lab Session Log</h3>
        </div>

        {sessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase text-slate-400 dark:border-slate-700 dark:bg-slate-800/50">
                  <th className="p-3 pl-5">Date</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Experiment</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm dark:divide-slate-700/50">
                {sessions.map((session) => (
                  <tr key={`${session.date}-${session.experiment}`} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="p-3 pl-5 text-slate-600 dark:text-slate-400">{session.date}</td>
                    <td className="p-3">
                      <span className="rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ backgroundColor: session.bg, color: session.color }}>
                        {session.subject}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{session.experiment}</td>
                    <td className="p-3">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold"
                        style={{
                          backgroundColor: session.status === "Present" ? COLORS.successLight : COLORS.errorLight,
                          color: session.status === "Present" ? "#2f9e44" : "#e03131",
                        }}
                      >
                        {session.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={SearchX} title="No sessions found" desc="Try adjusting your search query." />
        )}
      </div>
    </div>
  );
}
