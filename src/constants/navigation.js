import {
  Award,
  Bell,
  BookOpen,
  Calendar,
  CheckSquare,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Microscope,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

export const STUDENT_NAV_ITEMS = [
  { group: "MAIN" },
  { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { name: "Assignments", icon: BookOpen, id: "assignments" },
  { name: "Lab Sessions", icon: Microscope, id: "labs" },
  { name: "Progress Tracker", icon: TrendingUp, id: "progress" },
  { group: "ACADEMIC" },
  { name: "Timetable", icon: Calendar, id: "timetable" },
  { name: "Exams", icon: FileText, id: "exams" },
  { name: "Grades", icon: Award, id: "grades" },
  { group: "ACCOUNT" },
  { name: "Notifications", icon: Bell, id: "notifications" },
  { name: "Settings", icon: Settings, id: "settings" },
];

export const TEACHER_NAV_ITEMS = [
  { group: "MANAGEMENT" },
  { name: "Class Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { name: "Gradebook", icon: Award, id: "gradebook" },
  { name: "Attendance", icon: Users, id: "attendance" },
  { name: "Course Content", icon: ClipboardList, id: "course-content" },
  { group: "ACADEMIC" },
  { name: "Schedule", icon: Calendar, id: "timetable" },
  { name: "Manage Exams", icon: FileText, id: "exams" },
  { name: "Review Work", icon: CheckSquare, id: "review" },
  { group: "ACCOUNT" },
  { name: "Notifications", icon: Bell, id: "notifications" },
  { name: "Settings", icon: Settings, id: "settings" },
];
