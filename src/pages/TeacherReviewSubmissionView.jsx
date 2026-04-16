import React, { useState } from "react";
import { ChevronLeft, FileText, Check, Search, MessageSquare } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const MOCK_SUBMISSIONS = [
  { id: 1, name: "Ananya S.", prn: "22110CSE014", status: "graded", file: "Network_Lab4_Ananya.pdf", grade: "9.5/10" },
  { id: 2, name: "Sahil M.", prn: "22110CSE032", status: "pending", file: "Lab4_Sahil.zip", grade: "" },
  { id: 3, name: "Rohan P.", prn: "22110CSE027", status: "pending", file: "22110CSE027_Lab4.pdf", grade: "" },
  { id: 4, name: "Aditi K.", prn: "22110CSE005", status: "missing", file: "No Submission", grade: "" },
];

export default function TeacherReviewSubmissionView() {
  const { setActivePage, showToast } = useAppContext();
  const [submissions] = useState(MOCK_SUBMISSIONS);

  const bgGrade = (status) => {
    switch (status) {
      case 'graded': return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400";
      case 'pending': return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
      case 'missing': return "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400";
      default: return "";
    }
  };

  return (
    <div className="mx-auto max-w-6xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActivePage("review")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="font-display text-2xl font-bold dark:text-white">Review Submissions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Network Security Lab 4 · 58/64 Submitted</p>
          </div>
        </div>
        
        <div className="relative w-64 hidden sm:block">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
           <input
             type="text"
             placeholder="Search student..."
             className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
           />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
              <th className="p-4 pl-6">Student</th>
              <th className="p-4">Submission</th>
              <th className="p-4">Status</th>
              <th className="p-4">Grade</th>
              <th className="p-4 text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {submissions.map((sub, i) => (
              <tr key={i} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <td className="p-4 pl-6">
                  <p className="font-bold text-slate-800 dark:text-white">{sub.name}</p>
                  <p className="text-xs text-slate-500">{sub.prn}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className={sub.status === 'missing' ? 'text-slate-300' : 'text-[#4C6EF5]'} />
                    <span className={sub.status === 'missing' ? 'text-slate-400 italic' : 'text-slate-700 dark:text-slate-300 font-medium'}>
                      {sub.file}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${bgGrade(sub.status)}`}>
                    {sub.status}
                  </span>
                </td>
                <td className="p-4">
                  {sub.status === 'missing' ? '-' : (
                    <input 
                      type="text" 
                      defaultValue={sub.grade}
                      placeholder="e.g 8/10"
                      className="w-16 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-center font-bold focus:border-[#4C6EF5] focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                    />
                  )}
                </td>
                <td className="p-4 text-right pr-6">
                   {sub.status !== 'missing' && (
                     <div className="flex justify-end gap-2">
                       <button 
                         title="Add Comment"
                         className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
                       >
                         <MessageSquare size={14} />
                       </button>
                       <button 
                         onClick={() => showToast("Grade saved successfully", "ok")}
                         title="Save Grade"
                         className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4C6EF5] text-white hover:bg-[#3b5bdb] transition-colors"
                       >
                         <Check size={14} />
                       </button>
                     </div>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
