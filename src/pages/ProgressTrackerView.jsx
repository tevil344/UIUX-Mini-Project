import React from "react";
import { Download } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { PROGRESS_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";

export default function ProgressTrackerView() {
  const { showToast } = useAppContext();

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold dark:text-white">{PROGRESS_DATA.title}</h2>
          <p className="mt-1 text-slate-500">{PROGRESS_DATA.description}</p>
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          style={{ backgroundColor: COLORS.primary }}
          onClick={() => showToast("Export Report downloaded", "export")}
        >
          <Download size={16} />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:col-span-2 ${HOVER_EFFECT}`}>
          <h3 className="mb-6 font-display font-bold text-slate-800 dark:text-slate-100">Subject-wise Progress</h3>
          <div className="space-y-6">
            {PROGRESS_DATA.subjects.map((subject) => (
              <div key={subject.label}>
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span className="text-slate-700 dark:text-slate-300">{subject.label}</span>
                  <span className="text-slate-500">{subject.pct}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div className="h-full rounded-full transition-all" style={{ width: `${subject.pct}%`, backgroundColor: subject.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
            <h3 className="mb-4 font-display font-bold text-slate-800 dark:text-slate-100">Overall Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-600 dark:bg-slate-700/50">
                <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">GPA Est.</p>
                <p className="font-display text-2xl font-bold dark:text-white">{PROGRESS_DATA.summary.gpa}</p>
              </div>
              <div className="rounded-xl border border-green-100 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
                <p className="mb-1 text-[10px] font-bold uppercase text-green-600">{PROGRESS_DATA.summary.bestLabel}</p>
                <p className="mt-2 text-sm font-bold text-green-900 dark:text-green-100">{PROGRESS_DATA.summary.bestSubject}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
