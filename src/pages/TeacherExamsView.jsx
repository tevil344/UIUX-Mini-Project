import React from "react";
import { FileText, MapPin, Clock, ShieldCheck, AlertCircle } from "lucide-react";
import { TEACHER_EXAMS_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";

export default function TeacherExamsView() {
  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold dark:text-white">{TEACHER_EXAMS_DATA.title}</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">{TEACHER_EXAMS_DATA.description}</p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Upcoming Responsibilities</h3>
        <div className="space-y-4">
          {TEACHER_EXAMS_DATA.upcoming.map((item, i) => (
            <div key={i} className={`flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-6 transition-all hover:border-[#4C6EF5]/20 hover:shadow-lg ${HOVER_EFFECT} dark:border-slate-700 dark:bg-slate-800`}>
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 dark:bg-slate-700">
                  <ShieldCheck size={24} className={item.duty === 'Invigilation' ? 'text-[#4C6EF5]' : 'text-emerald-500'} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">{item.subject}</h4>
                  <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">{item.duty}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {item.hall}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</p>
                <p className="text-lg font-bold text-slate-800 dark:text-white">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
