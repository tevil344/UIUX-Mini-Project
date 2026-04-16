import React from "react";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { TEACHER_TIMETABLE_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";

export default function TeacherTimetableView() {
  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold dark:text-white">{TEACHER_TIMETABLE_DATA.title}</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">{TEACHER_TIMETABLE_DATA.description}</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <ExternalLink size={16} />
            Sync Google Calendar
          </button>
        </div>
      </div>

      <div className={`overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold uppercase text-slate-400 dark:border-slate-700 dark:bg-slate-800/50">
                <th className="p-4 pl-6 w-24">Time</th>
                {TEACHER_TIMETABLE_DATA.days.map(day => (
                  <th key={day} className="p-4">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {TEACHER_TIMETABLE_DATA.schedule.map((row, i) => (
                <tr key={i} className="group">
                  <td className="p-4 pl-6 text-xs font-bold text-slate-400">{row.time}</td>
                  {TEACHER_TIMETABLE_DATA.days.map(day => (
                    <td key={day} className="p-2">
                       {row[day] !== 'Free' ? (
                        <div className={`rounded-2xl p-4 transition-all ${
                          row[day].includes('Lab') 
                            ? 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/40 dark:text-amber-400' 
                            : row[day].includes('Theory')
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-900/40 dark:text-indigo-400'
                            : 'bg-slate-50 text-slate-600 border border-slate-100 dark:bg-slate-700/50 dark:border-slate-600 dark:text-slate-300'
                        }`}>
                          <p className="text-xs font-bold">{row[day]}</p>
                          <div className="mt-1 flex items-center gap-1.5 text-[10px] opacity-70">
                            <MapPin size={10} /> {row[day].includes('Lab') ? 'Lab 402' : 'LT-101'}
                          </div>
                        </div>
                       ) : (
                        <div className="flex h-full items-center justify-center p-4 text-[10px] font-medium text-slate-300 uppercase tracking-widest">
                          -
                        </div>
                       )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
