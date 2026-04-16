import React from "react";
import { MoreHorizontal, Search } from "lucide-react";
import { TEACHER_GRADEBOOK_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";

export default function TeacherGradebookView() {
  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold dark:text-white">{TEACHER_GRADEBOOK_DATA.title}</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">{TEACHER_GRADEBOOK_DATA.division}</p>
        </div>
      </div>

      <div className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-[#4C6EF5] focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-white text-xs font-bold uppercase text-slate-400 dark:border-slate-700 dark:bg-slate-800">
                {TEACHER_GRADEBOOK_DATA.columns.map(col => (
                  <th key={col} className="p-4 first:pl-6 last:pr-6">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {TEACHER_GRADEBOOK_DATA.students.map((student) => (
                <tr key={student.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="p-4 pl-6 text-sm font-bold text-slate-800 dark:text-slate-200">{student.name}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{student.prn}</td>
                  <td className="p-4 text-sm font-bold text-[#4C6EF5]">{student.avg}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{student.attendance}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      student.status === 'Excellent' ? 'bg-emerald-100 text-emerald-600' : 
                      student.status === 'At Risk' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
