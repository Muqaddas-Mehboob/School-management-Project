import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { Sidebar } from "../components/Sidebar";
import { Dashboard } from "../components/Dashboard";
import { Attendance } from "../components/Attendance";
import { Assignments } from "../components/Assignments";
import { Exams } from "../components/Exams";
import { Resources } from "../components/Resources";
import { Notifications } from "../components/Notifications";
import { Profile } from "../components/Profile";
import { ProgressReport } from "../components/ProgressReport";

const idToPath = {
  'dashboard':       '/student',
  'attendance':      '/student/attendance',
  'assignments':     '/student/assignments',
  'exams':           '/student/exams',
  'resources':       '/student/resources',
  'Progress Report': '/student/progress-report',
  'notifications':   '/student/notifications',
  'profile':         '/student/profile',
};

const pathToId = {
  '/student':                 'dashboard',
  '/student/attendance':      'attendance',
  '/student/assignments':     'assignments',
  '/student/exams':           'exams',
  '/student/resources':       'resources',
  '/student/progress-report': 'Progress Report',
  '/student/notifications':   'notifications',
  '/student/profile':         'profile',
};

export function StudentLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentView = pathToId[location.pathname] || 'dashboard';

  const setCurrentView = (id) => {
    const path = idToPath[id] || '/student';
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="exams" element={<Exams />} />
          <Route path="resources" element={<Resources />} />
          <Route path="progress-report" element={<ProgressReport />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}