import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { StudentLayout } from "./layouts/StudentLayout";
import Dashboard from "./teacher_pages/Dashboard.jsx";
import Classes from "./teacher_pages/Classes.jsx";
import ProgressReport from "./teacher_components/ProgressReport/ProgressReport.jsx";
import Students from "./teacher_pages/Students.jsx";
import Attendance from "./teacher_pages/Attendance.jsx";
import Grades from "./teacher_pages/Grades.jsx";
import Schedule from "./teacher_pages/Schedule.jsx";
import Assignments from "./teacher_pages/Assignments.jsx";
import Messages from "./teacher_pages/Messages.jsx";
import Settings from "./teacher_pages/Settings.jsx";

import Dashboard from "./teacher_pages/Dashboard.jsx";
import Classes from "./teacher_pages/Classes.jsx";
import ProgressReport from "./teacher_components/ProgressReport/ProgressReport.jsx";
import Students from "./teacher_pages/Students.jsx";
import Attendance from "./teacher_pages/Attendance.jsx";
import Grades from "./teacher_pages/Grades.jsx";
import Schedule from "./teacher_pages/Schedule.jsx";
import Assignments from "./teacher_pages/Assignments.jsx";
import Messages from "./teacher_pages/Messages.jsx";
import Settings from "./teacher_pages/Settings.jsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student/*" element={<StudentLayout />} />
          <Route path="/teacherdashboard" element={<Dashboard />} />
          <Route path="/teacherdashboard/classes" element={<Classes />} />
          <Route path="/teacherdashboard/students" element={<Students />} />
          <Route path="/teacherdashboard/attendance" element={<Attendance />} />
          <Route path="/teacherdashboard/grades" element={<Grades />} />
          <Route path="/teacherdashboard/schedule" element={<Schedule />} />
          <Route path="/teacherdashboard/assignments" element={<Assignments />} />
          <Route path="/teacherdashboard/ProgressReport" element={<ProgressReport />} />
          <Route path="/teacherdashboard/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;