import React from "react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { apiService } from "../../services/apiService";
import Skeleton from "../common/Skeleton";
import AssignmentsView from "../../pages/AssignmentsView";
import DashboardView from "../../pages/DashboardView";
import TeacherDashboardView from "../../pages/TeacherDashboardView";
import TeacherGradebookView from "../../pages/TeacherGradebookView";
import TeacherAttendanceView from "../../pages/TeacherAttendanceView";
import TeacherReviewView from "../../pages/TeacherReviewView";
import TeacherCourseContentView from "../../pages/TeacherCourseContentView";
import TeacherTimetableView from "../../pages/TeacherTimetableView";
import TeacherExamsView from "../../pages/TeacherExamsView";
import ExamsView from "../../pages/ExamsView";
import GradesView from "../../pages/GradesView";
import LabSessionsView from "../../pages/LabSessionsView";
import NotificationsView from "../../pages/NotificationsView";
import ProgressTrackerView from "../../pages/ProgressTrackerView";
import SettingsView from "../../pages/SettingsView";
import TimetableView from "../../pages/TimetableView";
import TeacherTakeAttendanceView from "../../pages/TeacherTakeAttendanceView";
import TeacherAttendanceDetailsView from "../../pages/TeacherAttendanceDetailsView";
import TeacherCourseManageView from "../../pages/TeacherCourseManageView";
import TeacherReviewSubmissionView from "../../pages/TeacherReviewSubmissionView";

const loadingPages = [
  "dashboard",
  "assignments",
  "labs",
  "timetable",
  "exams",
  "grades",
  "progress",
  "settings",
  "gradebook",
  "attendance",
  "review",
  "course-content",
];

export default function PageRouter({ activePage }) {
  const [isFetching, setIsFetching] = useState(false);
  const { searchQuery, searchFilter, user } = useAppContext();

  useEffect(() => {
    let isMounted = true;

    setIsFetching(true);
    apiService.fetchData(activePage).finally(() => {
      if (isMounted) {
        setIsFetching(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [activePage, searchFilter, searchQuery]);

  if (isFetching && loadingPages.includes(activePage)) {
    return (
      <div className="mx-auto max-w-7xl animate-fade-in-up space-y-6">
        <div>
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-32 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Skeleton className="h-96 w-full lg:col-span-2" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  switch (activePage) {
    case "dashboard":
      return user?.role === "teacher" ? <TeacherDashboardView /> : <DashboardView />;
    case "gradebook":
      return <TeacherGradebookView />;
    case "attendance":
      return <TeacherAttendanceView />;
    case "review":
      return <TeacherReviewView />;
    case "course-content":
      return <TeacherCourseContentView />;
    case "assignments":
      return <AssignmentsView />;
    case "attendance-marker":
      return <TeacherTakeAttendanceView />;
    case "attendance-details":
      return <TeacherAttendanceDetailsView />;
    case "course-manage":
      return <TeacherCourseManageView />;
    case "review-submissions":
      return <TeacherReviewSubmissionView />;
    case "labs":
      return <LabSessionsView />;
    case "progress":
      return <ProgressTrackerView />;
    case "timetable":
      return user?.role === "teacher" ? <TeacherTimetableView /> : <TimetableView />;
    case "exams":
      return user?.role === "teacher" ? <TeacherExamsView /> : <ExamsView />;
    case "grades":
      return <GradesView />;
    case "notifications":
      return <NotificationsView />;
    case "settings":
      return <SettingsView />;
    default:
      return <DashboardView />;
  }
}
