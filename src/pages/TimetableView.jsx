import React from "react";
import { Download } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { TIMETABLE_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";

export default function TimetableView() {
  const { showToast } = useAppContext();

  const getSlotStyle = (name) => {
    if (name.includes("UI/UX") || name.includes("Web Dev")) return { bg: COLORS.primaryLight, color: COLORS.primary };
    if (name.includes("DBMS")) return { bg: COLORS.successLight, color: COLORS.success };
    if (name.includes("Cloud")) return { bg: COLORS.secondaryLight, color: COLORS.secondary };
    if (name.includes("OS")) return { bg: COLORS.warningLight, color: COLORS.warning };
    return { bg: "#f1f3f5", color: "#868e96" };
  };

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold dark:text-white">{TIMETABLE_DATA.title}</h2>
          <p className="mt-1 text-slate-500">{TIMETABLE_DATA.description}</p>
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          style={{ backgroundColor: COLORS.primary }}
          onClick={() => showToast("PDF Download Started", "export")}
        >
          <Download size={16} />
          Download
        </button>
      </div>

      <div className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
          {TIMETABLE_DATA.legend.map((legend) => (
            <div key={legend.label} className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: legend.bg, color: legend.color }}>
              {legend.label}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-6 border-b border-slate-200 text-sm font-bold text-white dark:border-slate-700" style={{ backgroundColor: COLORS.primary }}>
              <div className="border-r border-white/20 p-4">Time</div>
              {TIMETABLE_DATA.days.map((day) => (
                <div key={day} className="border-r border-white/20 p-4 text-center">{day}</div>
              ))}
            </div>

            {TIMETABLE_DATA.schedule.map((row, rowIndex) => (
              <div key={row.time} className={`grid grid-cols-6 border-b border-slate-100 dark:border-slate-700 ${rowIndex % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-slate-50/50 dark:bg-slate-800/50"}`}>
                <div className="flex items-center justify-center border-r border-slate-100 p-4 text-center text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-300">{row.time}</div>
                {row.slots.map((slot, index) => {
                  const style = getSlotStyle(slot);
                  const isNeutral = row.isBreak || row.isNeutral;
                  return (
                    <div key={`${row.time}-${index}`} className="border-r border-slate-100 p-2 dark:border-slate-700">
                      <div className={`flex h-full w-full rounded-xl p-3 transition-colors ${isNeutral ? "items-center justify-center text-center" : "cursor-default flex-col justify-center items-start hover:shadow-inner"}`} style={{ backgroundColor: style.bg }}>
                        <span className="text-xs font-bold" style={{ color: style.color }}>{slot}</span>
                        {!isNeutral ? (
                          <span className="mt-2 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase" style={{ backgroundColor: `${style.color}22`, color: style.color }}>
                            {slot.includes("Lab") ? "LAB" : "THEORY"}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
