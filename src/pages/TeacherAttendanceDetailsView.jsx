import React from "react";
import { ChevronLeft, Info, Calendar, Users, Activity } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function TeacherAttendanceDetailsView() {
  const { setActivePage } = useAppContext();

  return (
    <div className="mx-auto max-w-5xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setActivePage("attendance")}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h2 className="font-display text-2xl font-bold dark:text-white">Session Details</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Database Management · Lecture</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <Users size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">Attendance Rate</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-800 dark:text-white">88%</p>
          <p className="mt-1 text-xs text-emerald-500 font-bold">+2% from average</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <Activity size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">Present Students</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-800 dark:text-white">56 <span className="text-sm text-slate-400">/ 64</span></p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <Calendar size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">Date Logged</span>
          </div>
          <p className="mt-3 text-lg font-bold text-slate-800 dark:text-white">Oct 14, 2024</p>
          <p className="text-sm text-slate-400">09:00 AM</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 dark:text-white">Absentees</h3>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            {["Rohan P. (22110CSE027)", "Vikram S. (22110CSE041)", "Neha A. (22110CSE012)"].map((student, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0 dark:border-slate-700">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{student}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
