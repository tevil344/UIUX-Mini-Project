import React from "react";
import { ChevronLeft, Save, UploadCloud, FileType, Plus } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function TeacherCourseManageView() {
  const { setActivePage, showToast } = useAppContext();

  const handleSave = () => {
    showToast("Course changes saved effectively", "ok");
    setActivePage("course-content");
  };

  return (
    <div className="mx-auto max-w-4xl animate-fade-in-up space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setActivePage("course-content")}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h2 className="font-display text-2xl font-bold dark:text-white">Manage Module</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Unit 1: Introduction to Networks</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Module Title</label>
            <input 
              type="text" 
              defaultValue="Unit 1: Introduction to Networks"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-[#4C6EF5] focus:outline-none focus:ring-1 focus:ring-[#4C6EF5] dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label>
            <textarea 
              rows={4}
              defaultValue="Foundations of computer networking protocols and the OSI model."
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-[#4C6EF5] focus:outline-none focus:ring-1 focus:ring-[#4C6EF5] dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Attached Resources</label>
            <div className="mt-3 flex flex-col gap-3">
              {['OSI_Model_Notes.pdf', 'Lab_1_Setup.docx'].map((file, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-600/50 dark:bg-slate-700/30">
                  <div className="flex items-center gap-3">
                    <FileType size={18} className="text-[#4C6EF5]" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{file}</span>
                  </div>
                  <button className="text-xs font-bold text-rose-500 hover:underline">Remove</button>
                </div>
              ))}
              
              <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#4C6EF5]/30 bg-[#4C6EF5]/5 py-4 text-sm font-bold text-[#4C6EF5] transition-colors hover:bg-[#4C6EF5]/10">
                <UploadCloud size={18} />
                Upload New Resource
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-700">
            <button 
              onClick={() => setActivePage("course-content")}
              className="rounded-xl px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-[#4C6EF5] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#4C6EF5]/20 transition-all hover:bg-[#3b5bdb] hover:-translate-y-0.5"
            >
              <Save size={16} />
              Save Changes
            </button>
        </div>
      </div>
    </div>
  );
}
