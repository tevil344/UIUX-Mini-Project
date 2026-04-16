import { AlertCircle, Check, Info } from "lucide-react";
import { COLORS } from "../constants/ui";

export const MOCK_USER = {
  name: "Prathmesh M.",
  initials: "PM",
  prn: "22110XXXX",
  division: "TY Computer Engineering - Div B",
  email: "student@pccoe.org",
  academicYear: "AY 2024-25",
};

export const AUTH_CONTENT = {
  brandSubtext: "PCCoE - Comp. Eng.",
  heroTitle: "Academic tracking without the clutter.",
  heroDescription:
    "Create an account, then manage assignments, labs, grades, and exam timelines from a single dashboard.",
  featureTitle: "What you can track",
  featureItems: [
    "Assignment submissions and deadlines.",
    "Lab attendance, progress trends, grades, and exam dates.",
  ],
  loginTitle: "Sign in",
  signupTitle: "Create your account",
  loginDescription: "Use the email and password from the account you created.",
  signupDescription:
    "Set up your local account first. All fields are validated before submission.",
  loginSwitchPrompt: "Need an account first? ",
  signupSwitchPrompt: "Already registered? ",
  loginSwitchAction: "Create one",
  signupSwitchAction: "Sign in",
};

export const DASHBOARD_DATA = {
  title: "Dashboard",
  subtitlePrefix: "Welcome back",
  subtitleSuffix: "Semester 6",
  stats: [
    {
      label: "Assignments",
      value: "9",
      sub: "Up 2 this week",
      color: COLORS.primary,
      icon: "CheckCircle2",
      targetPage: "assignments",
    },
    {
      label: "Avg Score",
      value: "91%",
      sub: "Up 4% vs last",
      color: COLORS.success,
      icon: "Award",
      targetPage: "grades",
    },
    {
      label: "Pending",
      value: "3",
      sub: "Due soon",
      color: COLORS.warning,
      subColor: COLORS.error,
      icon: "Clock",
      targetPage: "assignments",
    },
    {
      label: "Lab Attend",
      value: "96%",
      sub: "All clear",
      color: COLORS.secondary,
      icon: "Microscope",
      targetPage: "labs",
    },
  ],
  recentAssignmentsTitle: "Recent Assignments",
  recentAssignmentFilters: ["All", "UI/UX Lab", "OS Lab", "Cloud Lab"],
  recentAssignments: [
    {
      id: 1,
      name: "UI Components Design",
      subject: "UI/UX Lab",
      due: "Apr 5, 2025",
      status: "Submitted",
      color: COLORS.success,
      bg: COLORS.successLight,
    },
    {
      id: 2,
      name: "CPU Scheduling Algo",
      subject: "OS Lab",
      due: "Apr 10, 2025",
      status: "Overdue",
      color: COLORS.error,
      bg: COLORS.errorLight,
    },
    {
      id: 3,
      name: "Cloud Storage Design",
      subject: "Cloud Lab",
      due: "Apr 15, 2025",
      status: "Pending",
      color: COLORS.warning,
      bg: COLORS.warningLight,
    },
  ],
  subjectProgressTitle: "Subject Progress",
  subjectProgress: [
    { name: "UI/UX Lab", prog: 91, color: COLORS.success },
    { name: "Web Dev", prog: 78, color: COLORS.primary },
    { name: "Cloud Computing", prog: 65, color: COLORS.secondary },
  ],
  quickActionsTitle: "Quick Actions",
  upcomingDeadlinesTitle: "Upcoming Deadlines",
  upcomingDeadlinesBadge: "3 Soon",
  upcomingDeadlines: [
    {
      title: "React Hooks",
      meta: "Web Dev - Assign. 5",
      due: "Apr 8",
      dueColor: "yellow",
      targetPage: "assignments",
    },
    {
      title: "OS Scheduling",
      meta: "OS Lab - Assign. 6",
      due: "Overdue",
      dueColor: "red",
      targetPage: "assignments",
    },
    {
      title: "Mid Sem Exam",
      meta: "All Subjects",
      due: "Apr 20",
      dueColor: "primary",
      targetPage: "exams",
    },
  ],
};

export const ASSIGNMENTS_DATA = {
  title: "Assignments",
  description: "Manage and submit your coursework.",
  tabs: ["All", "Submitted", "Pending", "Overdue"],
  items: [
    {
      id: 1,
      name: "Reusable UI Components",
      sub: "Assignment 9",
      subject: "UI/UX Lab",
      due: "Apr 5, 2025",
      score: "-",
      status: "Submitted",
      stColor: COLORS.success,
      stBg: COLORS.successLight,
      subBg: COLORS.primaryLight,
      subText: COLORS.primary,
    },
    {
      id: 2,
      name: "Figma Prototype",
      sub: "Assignment 8",
      subject: "UI/UX Lab",
      due: "Mar 29, 2025",
      score: "88/100",
      status: "Submitted",
      stColor: COLORS.success,
      stBg: COLORS.successLight,
      subBg: COLORS.primaryLight,
      subText: COLORS.primary,
    },
    {
      id: 3,
      name: "React Hooks Basics",
      sub: "Assignment 5",
      subject: "Web Dev",
      due: "Apr 8, 2025",
      score: "-",
      status: "Pending",
      stColor: COLORS.warning,
      stBg: COLORS.warningLight,
      subBg: COLORS.secondaryLight,
      subText: COLORS.secondary,
    },
    {
      id: 4,
      name: "Database Normalization",
      sub: "Assignment 4",
      subject: "DBMS",
      due: "Mar 22, 2025",
      score: "91/100",
      status: "Submitted",
      stColor: COLORS.success,
      stBg: COLORS.successLight,
      subBg: "#f1f3f5",
      subText: "#868e96",
    },
    {
      id: 5,
      name: "OS Scheduling Algo",
      sub: "Assignment 6",
      subject: "OS Lab",
      due: "Apr 10, 2025",
      score: "-",
      status: "Overdue",
      stColor: COLORS.error,
      stBg: COLORS.errorLight,
      subBg: "#f1f3f5",
      subText: "#868e96",
    },
  ],
};

export const LABS_DATA = {
  title: "Lab Sessions",
  description: "Track lab attendance and experiments",
  stats: [
    { label: "Sessions Attended", value: "23", color: COLORS.success },
    { label: "Absent", value: "1", color: COLORS.error },
    { label: "Attendance %", value: "96%", color: COLORS.secondary },
  ],
  sessions: [
    {
      date: "Apr 2, 2025",
      subject: "UI/UX Lab",
      experiment: "Assignment 9 - UI Components",
      status: "Present",
      remarks: "Submitted on time",
      bg: COLORS.primaryLight,
      color: COLORS.primary,
    },
    {
      date: "Mar 26, 2025",
      subject: "UI/UX Lab",
      experiment: "Assignment 8 - Figma Prototype",
      status: "Present",
      remarks: "-",
      bg: COLORS.primaryLight,
      color: COLORS.primary,
    },
    {
      date: "Mar 20, 2025",
      subject: "OS Lab",
      experiment: "CPU Scheduling Simulation",
      status: "Absent",
      remarks: "Medical Leave",
      bg: "#f1f3f5",
      color: "#868e96",
    },
  ],
};

export const PROGRESS_DATA = {
  title: "Progress Tracker",
  description: "Detailed view of your academic performance",
  subjects: [
    { label: "UI/UX Design Lab", pct: 91, color: COLORS.success },
    { label: "Web Development", pct: 78, color: COLORS.primary },
    { label: "Cloud Computing", pct: 65, color: COLORS.secondary },
    { label: "DBMS", pct: 85, color: COLORS.success },
    { label: "Operating Systems", pct: 42, color: COLORS.warning },
  ],
  summary: {
    gpa: "8.6",
    bestLabel: "Best",
    bestSubject: "UI/UX Lab",
  },
};

export const EXAMS_DATA = {
  title: "Exams",
  description: "Upcoming and past examination schedule",
  noticeTitle: "Mid-Semester Exams Starting Apr 20",
  noticeText:
    "Make sure to carry your hall ticket and college ID. Report 15 minutes before.",
  items: [
    {
      day: "20",
      mon: "Apr",
      name: "UI/UX Design - Mid Sem",
      meta: "Hall 3 - 10:00 AM - 1:00 PM - 100 Marks",
      status: "Upcoming",
      stC: COLORS.warning,
      stBg: COLORS.warningLight,
      upcoming: true,
      daysAway: 17,
    },
    {
      day: "22",
      mon: "Apr",
      name: "Database Management - Mid Sem",
      meta: "Hall 1 - 10:00 AM - 1:00 PM - 100 Marks",
      status: "Upcoming",
      stC: COLORS.warning,
      stBg: COLORS.warningLight,
      upcoming: true,
      daysAway: 19,
    },
    {
      day: "24",
      mon: "Apr",
      name: "Cloud Computing - Mid Sem",
      meta: "Hall 2 - 10:00 AM - 1:00 PM - 100 Marks",
      status: "Upcoming",
      stC: COLORS.warning,
      stBg: COLORS.warningLight,
      upcoming: true,
      daysAway: 21,
    },
    {
      day: "10",
      mon: "Mar",
      name: "Web Development - Unit Test",
      meta: "Hall 4 - 9:00 AM - 11:00 AM - 50 Marks",
      status: "Completed",
      stC: COLORS.success,
      stBg: COLORS.successLight,
      upcoming: false,
      score: "38/50",
    },
    {
      day: "5",
      mon: "Mar",
      name: "OS Theory - Unit Test",
      meta: "Hall 1 - 9:00 AM - 11:00 AM - 50 Marks",
      status: "Completed",
      stC: COLORS.success,
      stBg: COLORS.successLight,
      upcoming: false,
      score: "29/50",
    },
  ],
};

export const GRADES_DATA = {
  title: "Grades",
  description: "Assignment and exam score breakdown",
  cards: [
    {
      title: "UI/UX Design Lab",
      avg: "91%",
      avgColor: COLORS.success,
      rows: [
        { label: "Assignment 9 - Components", score: "95/100", color: COLORS.success },
        { label: "Assignment 8 - Prototype", score: "88/100", color: COLORS.success },
        { label: "Assignment 7 - Color Theory", score: "90/100", color: COLORS.success },
      ],
    },
    {
      title: "Web Development",
      avg: "78%",
      avgColor: COLORS.primary,
      rows: [
        { label: "Assignment 5 - React Hooks", score: "Pending", color: COLORS.warning },
        { label: "Assignment 4 - Node.js API", score: "82/100", color: COLORS.primary },
        { label: "Unit Test - March", score: "38/50", color: COLORS.primary },
      ],
    },
    {
      title: "Cloud Computing",
      avg: "65%",
      avgColor: COLORS.secondary,
      rows: [
        { label: "Assignment 3 - Storage", score: "Upcoming", color: "#868e96" },
        { label: "Assignment 2 - Docker", score: "70/100", color: COLORS.secondary },
        { label: "Assignment 1 - Intro AWS", score: "75/100", color: COLORS.secondary },
      ],
    },
    {
      title: "DBMS",
      avg: "85%",
      avgColor: COLORS.success,
      rows: [
        { label: "Assignment 4 - Normalization", score: "91/100", color: COLORS.success },
        { label: "Assignment 3 - ER Diagram", score: "86/100", color: COLORS.success },
        { label: "Assignment 2 - SQL Joins", score: "82/100", color: COLORS.success },
      ],
    },
    {
      title: "Operating Systems",
      avg: "42%",
      avgColor: COLORS.error,
      rows: [
        { label: "Assignment 6 - CPU Sched", score: "Overdue", color: COLORS.error },
        { label: "Unit Test - March", score: "29/50", color: COLORS.warning },
        { label: "Assignment 5 - Memory", score: "-", color: "#868e96" },
      ],
    },
  ],
  overview: {
    title: "Overall GPA Estimate",
    value: "8.6",
    note: "Based on current scores",
    progressLabel: "Semester Progress",
    progressValue: "72%",
  },
};

export const TIMETABLE_DATA = {
  title: "Timetable",
  description: "Semester 6 - Weekly Schedule",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  legend: [
    { label: "UI/UX & Web", color: COLORS.primary, bg: COLORS.primaryLight },
    { label: "DBMS", color: COLORS.success, bg: COLORS.successLight },
    { label: "Cloud", color: COLORS.secondary, bg: COLORS.secondaryLight },
    { label: "OS", color: COLORS.warning, bg: COLORS.warningLight },
  ],
  schedule: [
    {
      time: "9:00 - 10:00",
      slots: ["UI/UX Theory", "DBMS", "Cloud Computing", "Web Dev", "OS Theory"],
    },
    {
      time: "10:00 - 11:00",
      slots: ["DBMS", "UI/UX Theory", "OS Theory", "Cloud Computing", "Web Dev"],
    },
    {
      time: "11:00 - 12:00",
      slots: ["Break", "Break", "Break", "Break", "Break"],
      isBreak: true,
    },
    {
      time: "12:00 - 1:00",
      slots: ["Cloud Lab", "OS Lab", "DBMS Lab", "UI/UX Lab", "Web Dev Lab"],
    },
    {
      time: "1:00 - 2:00",
      slots: ["Cloud Lab", "OS Lab", "DBMS Lab", "UI/UX Lab", "Web Dev Lab"],
    },
    {
      time: "2:00 - 3:00",
      slots: ["Free", "Project Work", "Free", "Project Work", "Free"],
      isNeutral: true,
    },
  ],
};

export const SETTINGS_DATA = {
  title: "Settings",
  description: "Manage your account preferences",
  profileTitle: "Profile",
  preferencesTitle: "Appearance & Preferences",
  rows: {
    fullName: "Full Name",
    email: "Email",
    darkMode: {
      label: "Dark Mode",
      description: "Switch to dark theme",
    },
    notifications: {
      label: "Notifications",
      description: "Receive email alerts",
    },
    signOut: "Sign Out",
  },
};

export const INITIAL_ALERTS = [
  {
    id: 1,
    title: "Assignment 9 Graded",
    msg: "You scored 95/100 on UI Components.",
    type: "ok",
    icon: Check,
    color: COLORS.success,
    bg: COLORS.successLight,
    read: false,
  },
  {
    id: 2,
    title: "Deadline in 2 days",
    msg: "React Hooks due April 8.",
    type: "warn",
    icon: AlertCircle,
    color: COLORS.warning,
    bg: COLORS.warningLight,
    read: false,
  },
  {
    id: 3,
    title: "Lab Rescheduled",
    msg: "UI/UX Lab moved to Thursday.",
    type: "info",
    icon: Info,
    color: COLORS.primary,
    bg: COLORS.primaryLight,
    read: false,
  },
];

// Teacher Specific Data
export const TEACHER_GRADEBOOK_DATA = {
  title: "Class Gradebook",
  description: "Manage and track student performance across all subjects.",
  division: "TY Computer Engineering - Div A",
  students: [
    { id: "S001", name: "Ananya S.", prn: "22110CSE014", avg: "92%", attendance: "98%", status: "Excellent" },
    { id: "S002", name: "Rohan P.", prn: "22110CSE027", avg: "74%", attendance: "85%", status: "Average" },
    { id: "S003", name: "Aditi K.", prn: "22110CSE005", avg: "88%", attendance: "92%", status: "Good" },
    { id: "S004", name: "Sahil M.", prn: "22110CSE032", avg: "65%", attendance: "78%", status: "At Risk" },
    { id: "S005", name: "Nisha R.", prn: "22110CSE019", avg: "95%", attendance: "100%", status: "Excellent" },
  ],
  columns: ["Student Name", "PRN", "Avg. Score", "Attendance", "Overall Status", "Actions"]
};

export const TEACHER_ATTENDANCE_DATA = {
  title: "Attendance Management",
  description: "Track and update laboratory and lecture attendance.",
  sessions: [
    { id: 1, subject: "UI/UX Lab", date: "Today", time: "12:00 PM", present: 58, total: 64, status: "In Progress" },
    { id: 2, subject: "DBMS Lecture", date: "Yesterday", time: "09:00 AM", present: 62, total: 64, status: "Completed" },
    { id: 3, subject: "OS Lab", date: "Apr 5, 2025", time: "02:00 PM", present: 55, total: 64, status: "Completed" },
  ]
};

export const TEACHER_REVIEW_DATA = {
  title: "Assignment Review",
  description: "Review and grade pending submissions from students.",
  items: [
    { id: 1, title: "UI Components Design", subject: "UI/UX Lab", pending: 12, total: 64, deadline: "Apr 8, 2025" },
    { id: 2, title: "SQL Joins Practice", subject: "DBMS", pending: 5, total: 64, deadline: "Apr 10, 2025" },
    { id: 3, title: "CPU Scheduling", subject: "OS Lab", pending: 24, total: 64, deadline: "Apr 12, 2025" },
  ]
};

export const TEACHER_COURSE_CONTENT_DATA = {
  title: "Course Content",
  description: "Upload and manage syllabus, notes, and laboratory manuals.",
  modules: [
    { id: 1, name: "Module 1: Introduction to Design", files: 4, lastUpdated: "Mar 15, 2025" },
    { id: 2, name: "Module 2: Typography & Colors", files: 6, lastUpdated: "Mar 22, 2025" },
    { id: 3, name: "Module 3: Prototyping in Figma", files: 3, lastUpdated: "Apr 1, 2025" },
  ]
};

export const TEACHER_TIMETABLE_DATA = {
  title: "Teaching Schedule",
  description: "Your personalized weekly teaching and lab schedule.",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  schedule: [
    { time: "09:00 AM", Mon: "Theory: DBMS", Tue: "Theory: UI/UX", Wed: "Meeting", Thu: "Theory: OS", Fri: "Theory: Web" },
    { time: "11:00 AM", Mon: "Free", Tue: "Free", Wed: "Free", Thu: "Free", Fri: "Free" },
    { time: "12:00 PM", Mon: "Lab: UI/UX", Tue: "Lab: UI/UX", Wed: "Lab: DBMS", Thu: "Lab: OS", Fri: "Lab: Web" },
    { time: "03:00 PM", Mon: "Student Hours", Tue: "Project Guide", Wed: "Student Hours", Thu: "Project Guide", Fri: "Admin" },
  ]
};

export const TEACHER_EXAMS_DATA = {
  title: "Exam Management",
  description: "Manage scheduling, seating arrangements, and paper setting.",
  upcoming: [
    { subject: "UI/UX Design", date: "Apr 20", duty: "Invigilation", hall: "LT-102" },
    { subject: "DBMS", date: "Apr 22", duty: "Paper Setting", hall: "-" },
    { subject: "OS Lab", date: "Apr 25", duty: "External", hall: "Lab 402" },
  ]
};
