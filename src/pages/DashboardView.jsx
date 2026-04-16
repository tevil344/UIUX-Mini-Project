import React, { useState } from "react";
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  MessageCircle,
  Microscope,
  Search,
  SearchX,
  Upload,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { DASHBOARD_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";
import EmptyState from "../components/common/EmptyState";

const iconMap = {
  CheckCircle2,
  Award,
  Clock,
  Microscope,
};

export default function DashboardView() {
  const { user, setActivePage, showToast, setActiveModal } = useAppContext();
  const [dashSearch, setDashSearch] = useState("");
  const [dashFilter, setDashFilter] = useState("All");

  const recentTasks = DASHBOARD_DATA.recentAssignments
    .filter((item) => dashFilter === "All" || item.subject.includes(dashFilter))
    .filter(
      (item) =>
        item.name.toLowerCase().includes(dashSearch.toLowerCase()) ||
        item.subject.toLowerCase().includes(dashSearch.toLowerCase()),
    );

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div>
        <h2 className="font-display text-3xl font-bold dark:text-white">{DASHBOARD_DATA.title}</h2>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          {DASHBOARD_DATA.subtitlePrefix}, {user?.name.split(" ")[0]} - {DASHBOARD_DATA.subtitleSuffix}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_DATA.stats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <div
              key={stat.label}
              tabIndex={0}
              role="button"
              aria-label={`View ${stat.label}`}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}
              style={{ borderTop: `3px solid ${stat.color}` }}
              onClick={() => setActivePage(stat.targetPage)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setActivePage(stat.targetPage);
                }
              }}
            >
              <div className="mb-2 flex items-start justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                <Icon size={20} color={stat.color} />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-3xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</h3>
                <ChevronRight className="text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" size={20} />
              </div>
              <p className="mt-1 text-xs font-bold" style={{ color: stat.subColor || COLORS.success }}>{stat.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-4 dark:border-slate-700 sm:flex-row sm:items-center">
              <h3 className="font-display font-bold text-slate-800 dark:text-slate-100">{DASHBOARD_DATA.recentAssignmentsTitle}</h3>
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={dashSearch}
                    onChange={(event) => setDashSearch(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/50 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
                  />
                </div>
                <select
                  value={dashFilter}
                  onChange={(event) => setDashFilter(event.target.value)}
                  className="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/50 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300"
                >
                  {DASHBOARD_DATA.recentAssignmentFilters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter === "All" ? "All" : filter.replace(" Lab", "")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {recentTasks.length > 0 ? (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-400 dark:border-slate-700 dark:bg-slate-800/50">
                        <th className="p-3 pl-4">Assignment</th>
                        <th className="p-3">Subject</th>
                        <th className="p-3">Due</th>
                        <th className="p-3">Status</th>
                        <th className="p-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm dark:divide-slate-700/50">
                      {recentTasks.map((task) => (
                        <tr key={task.id} tabIndex={0} className="group cursor-pointer transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:hover:bg-slate-700/50 dark:focus:bg-slate-700" onClick={() => setActivePage("assignments")}>
                          <td className="p-3 pl-4">
                            <div className="font-bold text-slate-800 transition-colors group-hover:text-[#4C6EF5] dark:text-slate-200">{task.name}</div>
                          </td>
                          <td className="p-3">
                            <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">{task.subject}</span>
                          </td>
                          <td className="p-3 font-medium text-slate-600 dark:text-slate-400">{task.due}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold" style={{ backgroundColor: task.bg, color: task.color }}>
                              {task.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              className="rounded-lg px-3 py-1.5 text-xs font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                              style={{
                                backgroundColor: task.status === "Overdue" ? COLORS.error : COLORS.primary,
                                opacity: task.status === "Submitted" ? 0.8 : 1,
                              }}
                              onClick={(event) => {
                                event.stopPropagation();
                                if (task.status !== "Submitted") {
                                  setActiveModal("submit-modal");
                                }
                              }}
                            >
                              {task.status === "Overdue" ? "Submit Now" : task.status === "Submitted" ? "View" : "Submit"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col divide-y divide-slate-100 md:hidden dark:divide-slate-700">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="cursor-pointer space-y-3 p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50" onClick={() => setActivePage("assignments")}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{task.name}</p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{task.subject} - {task.due}</p>
                        </div>
                        <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold" style={{ backgroundColor: task.bg, color: task.color }}>{task.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <EmptyState
                icon={SearchX}
                title="No tasks found"
                desc="No assignments match your search filter."
                action={<button onClick={() => { setDashSearch(""); setDashFilter("All"); }} className="text-sm font-bold text-[#4C6EF5]">Clear Search</button>}
              />
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
              <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-700">
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-100">{DASHBOARD_DATA.subjectProgressTitle}</h3>
                <button className="text-xs font-bold text-slate-500 hover:text-[#4C6EF5]" onClick={() => setActivePage("progress")}>Details →</button>
              </div>
              <div className="space-y-4 p-4">
                {DASHBOARD_DATA.subjectProgress.map((subject) => (
                  <div key={subject.name}>
                    <div className="mb-1.5 flex justify-between text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300">{subject.name}</span>
                      <span className="text-slate-500 dark:text-slate-400">{subject.prog}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                      <div className="h-full rounded-full transition-all" style={{ width: `${subject.prog}%`, backgroundColor: subject.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
              <div className="border-b border-slate-100 p-4 dark:border-slate-700">
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-100">{DASHBOARD_DATA.quickActionsTitle}</h3>
              </div>
              <div className="grid flex-1 content-start grid-cols-2 gap-3 p-4">
                <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#4C6EF5] text-sm font-bold text-white transition-colors hover:bg-[#3b5bdb] focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]" onClick={() => setActiveModal("submit-modal")}><Upload size={16} /> Submit</button>
                <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#4C6EF5] text-sm font-bold text-[#4C6EF5] transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-700" onClick={() => setActivePage("timetable")}><Calendar size={16} /> Timetable</button>
                <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#40c057] text-sm font-bold text-white transition-colors hover:bg-[#2f9e44]" onClick={() => showToast("Attendance marked", "ok")}><CheckCircle2 size={16} /> Check-in</button>
                <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700" onClick={() => setActiveModal("mentor-modal")}><MessageCircle size={16} /> Mentor</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4C6EF5] to-[#7950f2] p-6 text-center text-white shadow-md ${HOVER_EFFECT}`}>
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 bg-white/20 text-xl font-bold shadow-inner">{user?.initials}</div>
            <h3 className="font-display text-lg font-bold">{user?.name}</h3>
            <p className="mt-1 text-xs text-white/80">{user?.prn} • {user?.division.split("-")[0].trim()}</p>
          </div>

          <div className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
            <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-700">
              <h3 className="font-display font-bold text-slate-800 dark:text-slate-100">{DASHBOARD_DATA.upcomingDeadlinesTitle}</h3>
              <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold text-yellow-700">{DASHBOARD_DATA.upcomingDeadlinesBadge}</span>
            </div>
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {DASHBOARD_DATA.upcomingDeadlines.map((item) => {
                  const badgeClass = item.dueColor === "red" ? "bg-red-100 text-red-600" : item.dueColor === "primary" ? "bg-[#e8edff] text-[#4C6EF5]" : "bg-yellow-100 text-yellow-700";
                  return (
                    <tr key={item.title} className="group cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50" onClick={() => setActivePage(item.targetPage)}>
                      <td className="p-3">
                        <div className="text-xs font-bold text-slate-800 transition-colors group-hover:text-[#4C6EF5] dark:text-slate-200">{item.title}</div>
                        <div className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">{item.meta}</div>
                      </td>
                      <td className="p-3 text-right">
                        <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${badgeClass}`}>{item.due}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
