import React from "react";
import { CheckSquare, Clock, Users, ChevronRight, FileText } from "lucide-react";
import { TEACHER_REVIEW_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";
import { useAppContext } from "../context/AppContext";

export default function TeacherReviewView() {
  const { setActivePage } = useAppContext();

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold dark:text-white">{TEACHER_REVIEW_DATA.title}</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">{TEACHER_REVIEW_DATA.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        {TEACHER_REVIEW_DATA.items.map((item) => (
          <div key={item.id} className={`flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-6 transition-all hover:border-[#4C6EF5]/20 hover:shadow-lg ${HOVER_EFFECT} dark:border-slate-700 dark:bg-slate-800`}>
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 dark:bg-slate-700">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 dark:text-white">{item.title}</h4>
                <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Users size={14} /> {item.subject}</span>
                  <span className="flex items-center gap-1 font-bold text-rose-500"><Clock size={14} /> Deadline: {item.deadline}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-amber-500">{item.pending}</span>
                  <span className="text-sm text-slate-400">/ {item.total}</span>
                </div>
              </div>
              <button
                onClick={() => setActivePage("review-submissions")}
                className="rounded-xl bg-[#4C6EF5] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#4C6EF5]/10 transition-all hover:bg-[#3b5bdb] hover:-translate-y-0.5"
              >
                Review Submissions
              </button>
              <ChevronRight size={20} className="text-slate-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
