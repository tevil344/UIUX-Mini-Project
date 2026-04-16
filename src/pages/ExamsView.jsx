import React from "react";
import { AlertCircle, Bell, Clock } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { EXAMS_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";

export default function ExamsView() {
  const { setActiveModal } = useAppContext();

  return (
    <div className="mx-auto max-w-4xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-bold dark:text-white">{EXAMS_DATA.title}</h2>
        <p className="text-slate-500">{EXAMS_DATA.description}</p>
      </div>

      <div className={`flex items-start gap-3 rounded-r-xl border-l-4 p-4 shadow-sm ${HOVER_EFFECT}`} style={{ backgroundColor: COLORS.warningLight, borderLeftColor: COLORS.warning }}>
        <AlertCircle size={20} className="mt-0.5" style={{ color: COLORS.warning }} />
        <div>
          <h4 className="text-sm font-bold text-yellow-900">{EXAMS_DATA.noticeTitle}</h4>
          <p className="mt-1 text-xs text-yellow-800/80">{EXAMS_DATA.noticeText}</p>
        </div>
      </div>

      <div className="space-y-4">
        {EXAMS_DATA.items.map((exam) => (
          <div
            key={exam.name}
            tabIndex={0}
            className={`relative flex cursor-pointer flex-col gap-6 overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center sm:p-6 ${HOVER_EFFECT}`}
            onClick={() => {
              if (exam.upcoming) {
                setActiveModal("mentor-modal");
              }
            }}
          >
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl shadow-inner" style={{ backgroundColor: exam.upcoming ? COLORS.primaryLight : COLORS.successLight }}>
              <span className="font-display text-2xl font-bold leading-none" style={{ color: exam.upcoming ? COLORS.primary : COLORS.success }}>{exam.day}</span>
              <span className="mt-1 text-xs font-bold uppercase tracking-widest" style={{ color: exam.upcoming ? COLORS.primary : COLORS.success }}>{exam.mon}</span>
            </div>

            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100">{exam.name}</h3>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Clock size={14} />{exam.meta}</p>
              <div className="mt-3">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: exam.stBg, color: exam.stC }}>{exam.status}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 sm:items-end sm:border-t-0 sm:pt-0 dark:border-slate-700">
              {exam.upcoming ? (
                <>
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 sm:w-auto"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveModal("mentor-modal");
                    }}
                  >
                    <Bell size={14} />
                    Set Reminder
                  </button>
                  <p className="text-xs font-bold" style={{ color: COLORS.primary }}>{exam.daysAway} days away</p>
                </>
              ) : (
                <div className="min-w-[100px] rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-center dark:border-slate-700 dark:bg-slate-700/50">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Score</p>
                  <p className="font-display text-lg font-bold" style={{ color: exam.score.includes("29") ? COLORS.warning : COLORS.primary }}>{exam.score}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
