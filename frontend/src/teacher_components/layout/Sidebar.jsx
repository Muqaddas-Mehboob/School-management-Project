import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardCheck,
  GraduationCap,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  X,
  School,
} from "lucide-react";
import { Button } from "@/teacher_components/ui/button";

export function Sidebar({ onClose }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/teacherDashboard" },
    { icon: BookOpen, label: "My Classes", path: "/teacherDash/classes" },
    { icon: Users, label: "Students", path: "/teacherDash/students" },
    { icon: ClipboardCheck, label: "Attendance", path: "/teacherDash/attendance" },
    { icon: GraduationCap, label: "Grades", path: "/teacherDash/grades" },
    { icon: Calendar, label: "Schedule", path: "/teacherDash/schedule" },
    { icon: FileText, label: "Assignments", path: "/teacherDash/Assignments" },
    // { icon: MessageSquare, label: "Messages", path: "/messages" },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: "Settings", path: "/teacherDash/settings" },
  ];

  return (
    <div className="h-full bg-sidebar flex flex-col sidebar-glow">
      {/* Logo section */}
      <div className="p-2 xs:p-3 sm:p-4 md:p-6 flex items-center justify-between border-b border-sidebar-border">
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 min-w-0">
          <div className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-xl bg-sidebar-primary flex items-center justify-center flex-shrink-0">
            <School className="w-3 h-3 xs:w-4 xs:h-4 sm:w-6 sm:h-6 text-sidebar-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-xs xs:text-sm sm:text-base md:text-lg text-sidebar-foreground truncate">
              EduPortal
            </h1>
            <p className="text-[9px] xs:text-xs text-sidebar-muted truncate">Teacher Dashboard</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10 flex-shrink-0"
          onClick={onClose}
        >
          <X className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-1.5 xs:p-2 sm:p-4 space-y-0.5 xs:space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-1.5 xs:gap-2 sm:gap-3 px-1.5 xs:px-2 sm:px-4 py-1.5 xs:py-2 sm:py-3 rounded-lg transition-all duration-200 group text-[10px] xs:text-xs sm:text-sm ${
                isActive(item.path)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Icon
                className={`w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 transition-transform duration-200 flex-shrink-0 ${
                  isActive(item.path) ? "" : "group-hover:scale-110"
                }`}
              />
              <span className="font-medium truncate">{item.label}</span>
              {isActive(item.path) && (
                <div className="ml-auto w-1 h-1 xs:w-1.5 xs:h-1.5 rounded-full bg-sidebar-primary-foreground animate-pulse-subtle flex-shrink-0" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-1.5 xs:p-2 sm:p-4 border-t border-sidebar-border space-y-0.5 xs:space-y-1">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-1.5 xs:gap-2 sm:gap-3 px-1.5 xs:px-2 sm:px-4 py-1.5 xs:py-2 sm:py-3 rounded-lg transition-all duration-200 text-[10px] xs:text-xs sm:text-sm ${
                isActive(item.path)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium truncate">{item.label}</span>
            </NavLink>
          );
        })}
        <button className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 px-1.5 xs:px-2 sm:px-4 py-1.5 xs:py-2 sm:py-3 rounded-lg transition-all duration-200 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent w-full text-[10px] xs:text-xs sm:text-sm">
          <LogOut className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="font-medium truncate">Log Out</span>
        </button>
      </div>

      {/* User profile mini */}
      <div className="p-1.5 xs:p-2 sm:p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 p-1.5 xs:p-2 sm:p-3 rounded-lg bg-sidebar-accent/50">
          <div className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center text-sidebar-primary-foreground font-semibold text-[9px] xs:text-xs sm:text-sm flex-shrink-0">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sidebar-foreground truncate text-[10px] xs:text-xs sm:text-sm">
              John Doe
            </p>
            <p className="text-[9px] xs:text-xs text-sidebar-muted truncate">
              Mathematics Teacher
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

