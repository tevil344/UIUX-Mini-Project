import React from "react";
import { Users, Calendar, Clock, ChevronRight } from "lucide-react";
import { TEACHER_ATTENDANCE_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";
import { useAppContext } from "../context/AppContext";

export default function TeacherAttendanceView() {
  const { setActivePage } = useAppContext();

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold dark:text-white">{TEACHER_ATTENDANCE_DATA.title}</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">{TEACHER_ATTENDANCE_DATA.description}</p>
        </div>
        <button
          onClick={() => setActivePage("attendance-marker")}
          className="rounded-xl bg-[#4C6EF5] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#4C6EF5]/20 transition-all hover:bg-[#3b5bdb] hover:-translate-y-0.5"
        >
          Take New Attendance
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TEACHER_ATTENDANCE_DATA.sessions.map((session) => (
          <div key={session.id} className={`group rounded-3xl border border-slate-100 bg-white p-6 transition-all hover:border-[#4C6EF5]/30 hover:shadow-xl ${HOVER_EFFECT} dark:border-slate-700 dark:bg-slate-800`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-[#4C6EF5] transition-colors group-hover:bg-[#4C6EF5] group-hover:text-white dark:bg-slate-700">
                <Users size={24} />
              </div>
              <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                session.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {session.status}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{session.subject}</h3>
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={14} /> {session.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={14} /> {session.time}
                </div>
              </div>
              
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Present</span>
                  <span className="text-slate-800 dark:text-white">{session.present}/{session.total}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div 
                    className="h-full rounded-full bg-[#4C6EF5]" 
                    style={{ width: `${(session.present / session.total) * 100}%` }} 
                  />
                </div>
              </div>

              <button 
                onClick={() => setActivePage("attendance-details")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                View Details
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
