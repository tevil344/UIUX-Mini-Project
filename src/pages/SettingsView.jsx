import React from "react";
import { LogOut } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { SETTINGS_DATA } from "../data/mockData";
import { HOVER_EFFECT } from "../constants/ui";
import Toggle from "../components/common/Toggle";

function SettingRow({ label, sub, action }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 last:border-0 dark:border-slate-700">
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{sub}</p>
      </div>
      <div>{action}</div>
    </div>
  );
}

export default function SettingsView() {
  const { user, showToast, setActiveModal, darkMode, setDarkMode, logout } = useAppContext();

  return (
    <div className="mx-auto max-w-4xl animate-fade-in-up space-y-6 pb-12">
      <div>
        <h2 className="font-display text-3xl font-bold dark:text-white">{SETTINGS_DATA.title}</h2>
        <p className="mt-1 text-slate-500">{SETTINGS_DATA.description}</p>
      </div>

      <div className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/80">
          <h3 className="font-display font-bold text-slate-800 dark:text-slate-100">{SETTINGS_DATA.profileTitle}</h3>
        </div>
        <SettingRow
          label={SETTINGS_DATA.rows.fullName}
          sub={user?.name}
          action={<button className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600" onClick={() => setActiveModal("profile-modal")}>Edit</button>}
        />
        <SettingRow
          label={SETTINGS_DATA.rows.email}
          sub={user?.email}
          action={<button className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600" onClick={() => setActiveModal("profile-modal")}>Edit</button>}
        />
      </div>

      <div className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${HOVER_EFFECT}`}>
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/80">
          <h3 className="font-display font-bold text-slate-800 dark:text-slate-100">{SETTINGS_DATA.preferencesTitle}</h3>
        </div>
        <SettingRow
          label={SETTINGS_DATA.rows.darkMode.label}
          sub={SETTINGS_DATA.rows.darkMode.description}
          action={<Toggle checked={darkMode} onChange={(event) => { setDarkMode(event.target.checked); showToast(`Dark Mode ${event.target.checked ? "ON" : "OFF"}`, "info"); }} />}
        />
        <SettingRow
          label={SETTINGS_DATA.rows.notifications.label}
          sub={SETTINGS_DATA.rows.notifications.description}
          action={<Toggle checked={true} onChange={() => showToast("Preferences updated", "ok")} />}
        />
      </div>

      <div className="pt-6">
        <button onClick={logout} className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-900/20 dark:hover:bg-red-900/40">
          <LogOut size={16} />
          {SETTINGS_DATA.rows.signOut}
        </button>
      </div>
    </div>
  );
}
