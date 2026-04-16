import React from "react";
import { Download } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { GRADES_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";

function GradeCard({ title, rows, avg, avgColor }) {
  return (
    <div className={`relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
      <div className="absolute left-0 top-0 h-1 w-full" style={{ backgroundColor: avgColor }} />
      <div className="flex-1 p-5">
        <h3 className="mb-4 font-display text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={`${title}-${row.label}`} className="last:pb-0 flex items-center justify-between rounded border-b border-slate-50 px-2 pb-3 text-sm transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-700/50 dark:hover:bg-slate-700/50">
              <span className="text-slate-600 dark:text-slate-300">{row.label}</span>
              <span className="font-bold" style={{ color: row.color || COLORS.primary }}>{row.score}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/80">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Average</span>
        <span className="font-display text-xl font-bold" style={{ color: avgColor }}>{avg}</span>
      </div>
    </div>
  );
}

export default function GradesView() {
  const { showToast } = useAppContext();

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold dark:text-white">{GRADES_DATA.title}</h2>
          <p className="mt-1 text-slate-500">{GRADES_DATA.description}</p>
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          style={{ backgroundColor: COLORS.primary }}
          onClick={() => showToast("Transcript download started", "export")}
        >
          <Download size={16} />
          Transcript
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {GRADES_DATA.cards.map((card) => (
          <GradeCard key={card.title} {...card} />
        ))}

        <div className={`relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#4C6EF5] to-[#7950f2] p-6 text-white shadow-md ${HOVER_EFFECT}`}>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-white/80">{GRADES_DATA.overview.title}</h3>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold">{GRADES_DATA.overview.value}</span>
              <span className="text-sm text-white/60">{GRADES_DATA.overview.note}</span>
            </div>
          </div>
          <div className="mt-8">
            <div className="mb-2 flex justify-between text-sm font-bold">
              <span>{GRADES_DATA.overview.progressLabel}</span>
              <span>{GRADES_DATA.overview.progressValue}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: GRADES_DATA.overview.progressValue }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
