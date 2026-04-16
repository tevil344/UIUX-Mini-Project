import React from "react";
export default function EmptyState({ icon: Icon, title, desc, action }) {
  return (
    <div className="flex w-full animate-fade-in-up flex-col items-center justify-center p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <Icon size={32} />
      </div>
      <h3 className="mb-1 text-lg font-bold text-slate-800 dark:text-slate-200">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {desc}
      </p>
      {action}
    </div>
  );
}
