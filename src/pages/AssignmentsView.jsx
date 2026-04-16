import React, { useState } from "react";
import { Inbox, Upload } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { ASSIGNMENTS_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";
import EmptyState from "../components/common/EmptyState";

export default function AssignmentsView() {
  const { setActiveModal, searchQuery, searchFilter } = useAppContext();
  const [activeTab, setActiveTab] = useState("All");

  const filtered = ASSIGNMENTS_DATA.items
    .filter((item) => activeTab === "All" || item.status === activeTab)
    .filter((item) => searchFilter === "All" || item.subject.includes(searchFilter))
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold dark:text-white">{ASSIGNMENTS_DATA.title}</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">{ASSIGNMENTS_DATA.description}</p>
        </div>
        <button
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-sm transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          style={{ backgroundColor: COLORS.primary }}
          onClick={() => setActiveModal("submit-modal")}
        >
          <Upload size={16} />
          New Submission
        </button>
      </div>

      <div className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
        <div className="hide-scrollbar flex gap-2 overflow-x-auto bg-slate-50/50 p-2 dark:bg-slate-800/50 md:p-4">
          {ASSIGNMENTS_DATA.tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold transition-colors focus:outline-none ${
                activeTab === tab
                  ? "border border-slate-200 bg-white text-[#4C6EF5] shadow-sm dark:border-slate-600 dark:bg-slate-700"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-white text-xs font-bold uppercase text-slate-400 dark:border-slate-700 dark:bg-slate-800">
                    <th className="p-4 pl-6">Details</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                  {filtered.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="p-4 pl-6">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.name}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{item.sub}</p>
                      </td>
                      <td className="p-4">
                        <span className="rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ backgroundColor: item.subBg, color: item.subText }}>
                          {item.subject}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400">{item.due}</td>
                      <td className="p-4 text-sm font-bold text-slate-800 dark:text-slate-200">{item.score}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold" style={{ backgroundColor: item.stBg, color: item.stColor }}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button
                          className="rounded-lg px-3 py-1.5 text-xs font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                          style={{
                            backgroundColor: item.status === "Overdue" ? COLORS.error : COLORS.primary,
                            opacity: item.status === "Submitted" ? 0.7 : 1,
                          }}
                          onClick={() => {
                            if (item.status !== "Submitted") {
                              setActiveModal("submit-modal");
                            }
                          }}
                        >
                          {item.status === "Overdue" ? "Submit Now" : item.status === "Submitted" ? "View" : "Submit"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 md:hidden dark:divide-slate-700/50">
              {filtered.map((item) => (
                <div key={item.id} className="space-y-3 p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{item.sub}</p>
                    </div>
                    <span className="h-fit rounded-full px-2.5 py-1 text-xs font-bold" style={{ backgroundColor: item.stBg, color: item.stColor }}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-md px-2 py-1 font-medium" style={{ backgroundColor: item.subBg, color: item.subText }}>
                      {item.subject}
                    </span>
                    <button
                      className="rounded-lg px-3 py-1 font-bold text-white focus:outline-none"
                      style={{
                        backgroundColor: item.status === "Overdue" ? COLORS.error : COLORS.primary,
                        opacity: item.status === "Submitted" ? 0.7 : 1,
                      }}
                      onClick={() => {
                        if (item.status !== "Submitted") {
                          setActiveModal("submit-modal");
                        }
                      }}
                    >
                      {item.status === "Submitted" ? "View" : "Submit"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState icon={Inbox} title="No assignments found" desc="No assignments match your current filter criteria." />
        )}
      </div>
    </div>
  );
}
