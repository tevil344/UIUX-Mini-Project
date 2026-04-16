import React from "react";
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  MoreVertical,
  MoreHorizontal,
  ChevronRight,
  TrendingDown,
  FileText
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

function StatCard({ title, value, subtext, icon: Icon, trend, trendValue, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-[#4C6EF5]/30 hover:shadow-xl hover:shadow-[#4C6EF5]/5 dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-[#4C6EF5] transition-colors group-hover:bg-[#4C6EF5] group-hover:text-white dark:bg-slate-700">
          <Icon size={24} />
        </div>
        <button className="text-slate-400 hover:text-slate-600" onClick={(e) => e.stopPropagation()}>
          <MoreVertical size={20} />
        </button>
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-800 dark:text-white">{value}</span>
          {trend && (
            <span className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend === 'up' ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
              {trendValue}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-400">{subtext}</p>
      </div>
    </div>
  );
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">{title}</h2>
      <button 
        onClick={onAction}
        className="text-sm font-bold text-[#4C6EF5] hover:underline"
      >
        {action}
      </button>
    </div>
  );
}

export default function TeacherDashboardView() {
  const { user, setActivePage } = useAppContext();

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Teacher Console · <span className="font-bold text-[#4C6EF5]">{user?.division}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Download Reports
          </button>
          <button 
            onClick={() => setActivePage('course-content')}
            className="rounded-xl bg-[#4C6EF5] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#4C6EF5]/20 transition-all hover:bg-[#3b5bdb] hover:-translate-y-0.5"
          >
            + Create Assignment
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Students" 
          value="64" 
          subtext="Active in your division" 
          icon={Users} 
          trend="up" 
          trendValue="+2 this week"
          onClick={() => setActivePage('attendance')}
        />
        <StatCard 
          title="Avg. Class Performance" 
          value="78.5%" 
          subtext="Based on last 3 assessments" 
          icon={TrendingUp} 
          trend="up" 
          trendValue="4.2%"
          onClick={() => setActivePage('gradebook')}
        />
        <StatCard 
          title="Pending Submissions" 
          value="12" 
          subtext="Require grading" 
          icon={Clock} 
          onClick={() => setActivePage('review')}
        />
        <StatCard 
          title="Course Completion" 
          value="65%" 
          subtext="Syllabus progress" 
          icon={BookOpen} 
          onClick={() => setActivePage('course-content')}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Activity / Announcements */}
        <div className="lg:col-span-2">
          <SectionHeader 
            title="Active Assignments" 
            action="View All" 
            onAction={() => setActivePage('review')}
          />
          <div className="space-y-4">
            {[
              { title: "Network Security Lab 4", division: "Div A & B", due: "Today, 11:59 PM", status: "Grading", submissions: "58/64" },
              { title: "Database Normalization Quiz", division: "Div B", due: "Oct 12, 2024", status: "Active", submissions: "42/64" },
              { title: "Software Eng. Case Study", division: "Div B", due: "Oct 15, 2024", status: "Scheduled", submissions: "0/64" },
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={() => setActivePage('review')}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 transition-all hover:border-[#4C6EF5]/20 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 dark:bg-slate-700">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{item.title}</h4>
                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Users size={12} /> {item.division}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> Due: {item.due}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-slate-800 dark:text-slate-200">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submissions</p>
                    <p className="text-sm font-bold">{item.submissions}</p>
                  </div>
                  <div className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Grading' ? 'bg-amber-100 text-amber-600' : 
                    item.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status}
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar content */}
        <div className="space-y-8">
          <div>
            <SectionHeader 
              title="Upcoming Classes" 
              action="Calendar" 
              onAction={() => setActivePage('timetable')}
            />
            <div className="rounded-3xl border border-slate-100 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <div className="space-y-6">
                {[
                  { time: "09:00 AM", subject: "Discrete Mathematics", room: "LT-201", type: "Lecture" },
                  { time: "11:15 AM", subject: "Data Structures Lab", room: "Lab 402", type: "Practical" },
                  { time: "02:30 PM", subject: "Theory of Comp.", room: "LT-104", type: "Lecture" },
                ].map((item, i) => (
                  <div key={i} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-[#4C6EF5]" />
                    <div className="absolute left-[3px] top-4 h-full w-px bg-slate-100 dark:bg-slate-700" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.time}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{item.subject}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{item.room} · {item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <SectionHeader title="Recent Alerts" action="Clear All" />
            <div className="space-y-3">
              {[
                "3 students requested a deadline extension",
                "Placement cell added a new schedule",
                "System maintenance on Sunday midnight"
              ].map((text, i) => (
                <div key={i} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600 dark:bg-slate-700/50 dark:text-slate-300">
                  <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
