import React from "react";
import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Hash,
  Loader2,
  Lock,
  Mail,
  User,
  Users,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { AUTH_CONTENT } from "../data/mockData";
import { apiService } from "../services/apiService";
import { sanitizeAuthDraft, validateAuthInput } from "../utils/auth";

const DIVISIONS = ["Div A", "Div B"];

function Field({
  label,
  type = "text",
  icon: Icon,
  value,
  placeholder,
  error,
  onChange,
  maxLength,
  autoComplete,
  children,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        {children || (
          <input
            type={type}
            maxLength={maxLength}
            autoComplete={autoComplete}
            className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-4 text-sm transition-all focus:border-[#4C6EF5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/20 ${
              error ? "border-red-400" : "border-slate-200"
            }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}

export default function AuthView() {
  const { login, showToast } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ 
    email: "", 
    password: "", 
    name: "", 
    prn: "", 
    employeeId: "", 
    division: "TY Computer Engineering - Div A" 
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const setField = (field, value) => {
    const nextDraft = sanitizeAuthDraft({ ...form, role, [field]: value });
    setForm(nextDraft);
    setErrors((prev) => ({ ...prev, [field]: null, auth: null }));
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    const mode = isLogin ? "login" : "register";
    const validation = validateAuthInput({ ...form, role }, mode);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(validation.values.email, validation.values.password);
        showToast("Signed in", "ok");
      } else {
        await apiService.register(validation.values);
        await login(validation.values.email, validation.values.password);
        showToast("Account created", "ok");
      }
    } catch (error) {
      setErrors({ auth: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-50">
      <div className="absolute left-0 top-0 h-1/2 w-full origin-top-left -skew-y-6 -translate-y-10 scale-110 bg-gradient-to-br from-[#4C6EF5] to-[#7950f2]" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#4C6EF5]/10 blur-3xl" />
      <div className="absolute right-[-5rem] top-1/4 h-80 w-80 rounded-full bg-[#7950f2]/10 blur-3xl" />

      <div className="z-10 mx-4 flex w-full max-w-4xl animate-fade-in-up flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
        <div className="relative hidden w-5/12 flex-col justify-between overflow-hidden bg-slate-900 p-10 text-white md:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-slate-900" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#4C6EF5]/30 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4C6EF5] font-display font-bold text-white shadow-lg shadow-[#4C6EF5]/30">PC</div>
              <div>
                <h1 className="font-display text-xl font-bold leading-none">StudentHub</h1>
                <p className="mt-1 text-xs text-white/50">{AUTH_CONTENT.brandSubtext}</p>
              </div>
            </div>

            <h2 className="mb-4 font-display text-3xl font-bold">{AUTH_CONTENT.heroTitle}</h2>
            <p className="mb-8 text-sm leading-relaxed text-slate-400">{AUTH_CONTENT.heroDescription}</p>
          </div>

          <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50">{AUTH_CONTENT.featureTitle}</h4>
            <div className="space-y-3 text-sm text-slate-300">
              {AUTH_CONTENT.featureItems.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center p-8 md:w-7/12 md:p-12">
          <div className="mb-6 flex flex-col gap-6">
            <div className="flex items-center gap-3 md:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4C6EF5] font-display font-bold text-white">PC</div>
              <div>
                <h1 className="font-display text-xl font-bold text-slate-800">StudentHub</h1>
                <p className="mt-0.5 text-xs text-slate-500">PCCoE</p>
              </div>
            </div>

            <div className="inline-flex w-fit self-start rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => { setRole("student"); setErrors({}); }}
                className={`rounded-lg px-6 py-2 text-sm font-bold transition-all ${role === "student" ? "bg-white text-[#4C6EF5] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => { setRole("teacher"); setErrors({}); }}
                className={`rounded-lg px-6 py-2 text-sm font-bold transition-all ${role === "teacher" ? "bg-white text-[#4C6EF5] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Teacher
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 font-display text-3xl font-bold text-slate-800">
              {isLogin ? AUTH_CONTENT.loginTitle : AUTH_CONTENT.signupTitle}
            </h2>
            <p className="text-sm text-slate-500">
              {isLogin ? AUTH_CONTENT.loginDescription : AUTH_CONTENT.signupDescription}
            </p>
          </div>

          {errors.auth ? (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle size={16} />
              {errors.auth}
            </div>
          ) : null}

          <form onSubmit={handleAuth} className="space-y-4" noValidate>
            {!isLogin ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Full Name" icon={User} value={form.name} placeholder="Prathmesh M." error={errors.name} maxLength={80} autoComplete="name" onChange={(event) => setField("name", event.target.value)} />
                {role === "student" ? (
                  <Field label="PRN" icon={Hash} value={form.prn} placeholder="22110XXXX" error={errors.prn} maxLength={24} autoComplete="off" onChange={(event) => setField("prn", event.target.value)} />
                ) : (
                  <Field label="Employee ID" icon={Hash} value={form.employeeId} placeholder="EDU-T-XXXX" error={errors.employeeId} maxLength={24} autoComplete="off" onChange={(event) => setField("employeeId", event.target.value)} />
                )}
                {role === "teacher" && (
                  <div className="md:col-span-2">
                    <Field label="Assigned Division" icon={Users} error={errors.division}>
                      <select
                        value={form.division}
                        onChange={(event) => setField("division", event.target.value)}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:border-[#4C6EF5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/20"
                      >
                        {DIVISIONS.map(div => (
                          <option key={div} value={`TY Computer Engineering - ${div}`}>{div}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                )}
              </div>
            ) : null}

            <Field label="Email" type="email" icon={Mail} value={form.email} placeholder="yourname@college.edu" error={errors.email} maxLength={120} autoComplete="email" onChange={(event) => setField("email", event.target.value)} />
            <Field label="Password" type="password" icon={Lock} value={form.password} placeholder="••••••••" error={errors.password} maxLength={72} autoComplete={isLogin ? "current-password" : "new-password"} onChange={(event) => setField("password", event.target.value)} />

            <button type="submit" disabled={isLoading} className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4C6EF5] py-3 font-bold text-white shadow-lg shadow-[#4C6EF5]/20 transition-all hover:bg-[#3b5bdb] focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] focus:ring-offset-2 disabled:opacity-70">
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              {isLogin ? AUTH_CONTENT.loginSwitchPrompt : AUTH_CONTENT.signupSwitchPrompt}
              <button type="button" className="font-bold text-[#4C6EF5] hover:underline focus:outline-none" onClick={() => { setIsLogin((prev) => !prev); setErrors({}); }}>
                {isLogin ? AUTH_CONTENT.loginSwitchAction : AUTH_CONTENT.signupSwitchAction}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
