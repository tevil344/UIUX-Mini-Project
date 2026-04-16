import React from "react";
import { ClipboardList, Plus, File, MoreVertical, Calendar } from "lucide-react";
import { TEACHER_COURSE_CONTENT_DATA } from "../data/mockData";
import { COLORS, HOVER_EFFECT } from "../constants/ui";
import { useAppContext } from "../context/AppContext";

export default function TeacherCourseContentView() {
  const { setActivePage } = useAppContext();

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold dark:text-white">{TEACHER_COURSE_CONTENT_DATA.title}</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">{TEACHER_COURSE_CONTENT_DATA.description}</p>
        </div>
        <button
          onClick={() => setActivePage("course-manage")}
          className="flex items-center gap-2 rounded-xl bg-[#4C6EF5] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#4C6EF5]/20 transition-all hover:bg-[#3b5bdb] hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {TEACHER_COURSE_CONTENT_DATA.modules.map((module) => (
          <div key={module.id} className={`flex flex-col rounded-3xl border border-slate-100 bg-white p-6 transition-all hover:border-[#4C6EF5]/20 hover:shadow-xl ${HOVER_EFFECT} dark:border-slate-700 dark:bg-slate-800`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <ClipboardList size={24} />
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{module.name}</h3>
            
            <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <File size={14} /> {module.files} Files
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar size={14} /> Updated: {module.lastUpdated}
                </div>
              </div>
              <button 
                onClick={() => setActivePage("course-manage")}
                className="text-sm font-bold text-[#4C6EF5] hover:underline"
              >
                Manage
              </button>
            </div>
          </div>
        ))}

        {/* Create Module UI */}
        <button 
          onClick={() => setActivePage("course-manage")}
          className="flex h-full min-h-[180px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 transition-all hover:border-[#4C6EF5]/50 hover:bg-[#4C6EF5]/5 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700">
            <Plus size={24} />
          </div>
          <p className="font-bold text-slate-500">Create New Module</p>
        </button>
      </div>
    </div>
  );
}
