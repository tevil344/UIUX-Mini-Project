import React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Info,
  XCircle,
} from "lucide-react";
import { COLORS } from "../../constants/ui";

const styles = {
  ok: { bg: COLORS.success, icon: CheckCircle2 },
  error: { bg: COLORS.error, icon: XCircle },
  info: { bg: COLORS.primary, icon: Info },
  warn: { bg: COLORS.warning, icon: AlertCircle, text: "#7d4a00" },
  export: { bg: "#ebfbee", text: "#2b8a3e", icon: Download },
};

export default function ToastContainer({ toasts }) {
  return (
    <div className="pointer-events-none fixed right-6 top-6 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => {
        const style = styles[toast.type] || styles.info;
        const Icon = style.icon;

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex min-w-[250px] items-center gap-3 rounded-lg border border-black/5 px-4 py-3 text-sm font-semibold shadow-lg shadow-black/10 transition-all animate-fade-in-up"
            style={{
              backgroundColor: style.bg,
              color: style.text || "#fff",
            }}
            role="alert"
          >
            <Icon size={18} />
            <span className="flex-1">{toast.msg}</span>
          </div>
        );
      })}
    </div>
  );
}
