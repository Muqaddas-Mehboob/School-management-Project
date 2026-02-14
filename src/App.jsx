
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./teacher_pages/Dashboard.jsx";
import Classes from "./teacher_pages/Classes.jsx";
import Students from "./teacher_pages/Students.jsx";
import Attendance from "./teacher_pages/Attendance.jsx";
import Grades from "./teacher_pages/Grades.jsx";
import Schedule from "./teacher_pages/Schedule.jsx";
import Assignments from "./teacher_pages/Assignments.jsx";
import Messages from "./teacher_pages/Messages.jsx";
import Settings from "./teacher_pages/Settings.jsx";
import Notifications from "./teacher_pages/Notifications.jsx";
import NotFound from "./teacher_pages/NotFound.jsx";
import { Toaster } from "./teacher_components/ui/toaster.tsx";

const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teacherdashboard" element={<Dashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* <Route path="/messages" element={<Messages />} /> */}
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
);

export default App;

