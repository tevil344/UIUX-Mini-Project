import React, { useState } from "react";
import { Check, X, Clock, Search, Save, ChevronLeft } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { COLORS, HOVER_EFFECT } from "../constants/ui";

const MOCK_STUDENTS = [
  { id: 1, prn: "22110CSE014", name: "Ananya S.", status: "present" },
  { id: 2, prn: "22110CSE027", name: "Rohan P.", status: "absent" },
  { id: 3, prn: "22110CSE005", name: "Aditi K.", status: "present" },
  { id: 4, prn: "22110CSE032", name: "Sahil M.", status: "late" },
  { id: 5, prn: "22110CSE019", name: "Nisha R.", status: "present" },
];

export default function TeacherTakeAttendanceView() {
  const { setActivePage, showToast } = useAppContext();
  const [students, setStudents] = useState(MOCK_STUDENTS);

  const handleStatusChange = (id, newStatus) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const saveAttendance = () => {
    showToast("Attendance saved successfully", "ok");
    setActivePage("attendance");
  };

  const presentCount = students.filter(s => s.status === 'present').length;

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
          <h2 className="font-display text-2xl font-bold dark:text-white">Record Attendance</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">UI/UX Lab · TY Div A · Today, 10:00 AM</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
           <input
             type="text"
             placeholder="Search student..."
             className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
           />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
            Total Present: <span className="text-[#4C6EF5]">{presentCount}/{students.length}</span>
          </span>
          <button 
            onClick={saveAttendance}
            className="flex items-center gap-2 rounded-xl bg-[#4C6EF5] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-[#4C6EF5]/20 transition-all hover:bg-[#3b5bdb] hover:-translate-y-0.5"
          >
            <Save size={16} />
            Save Attendance
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
              <th className="p-4 pl-6">Student</th>
              <th className="p-4">PRN</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {students.map((student) => (
              <tr key={student.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <td className="p-4 pl-6 font-bold text-slate-800 dark:text-white">{student.name}</td>
                <td className="p-4 text-slate-500 dark:text-slate-400">{student.prn}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => handleStatusChange(student.id, 'present')}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${student.status === 'present' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600'}`}
                    >
                      <Check size={16} />
                    </button>
                    <button 
                      onClick={() => handleStatusChange(student.id, 'late')}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${student.status === 'late' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600'}`}
                    >
                      <Clock size={16} />
                    </button>
                    <button 
                       onClick={() => handleStatusChange(student.id, 'absent')}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${student.status === 'absent' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600'}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
