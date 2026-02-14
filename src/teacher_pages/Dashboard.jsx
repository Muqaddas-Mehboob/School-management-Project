import { DashboardLayout } from "@/teacher_components/layout/DashboardLayout";
import { StatsCard } from "@/teacher_components/dashboard/StatsCard";
import { UpcomingClasses } from "@/teacher_components/dashboard/UpcomingClasses";
import { RecentActivity } from "@/teacher_components/dashboard/RecentActivity";
import { QuickActions } from "@/teacher_components/dashboard/QuickActions";
import { AttendanceOverview } from "@/teacher_components/dashboard/AttendanceOverview";
import { Users, BookOpen, ClipboardCheck, GraduationCap } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout pageTitle="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 min-[10px]:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
        <StatsCard
          title="Total Students"
          value="156"
          change="+12 this month"
          changeType="positive"
          icon={Users}
          delay={0}
        />
        <StatsCard
          title="Active Classes"
          value="8"
          change="2 today"
          changeType="neutral"
          icon={BookOpen}
          delay={1}
        />
        <StatsCard
          title="Attendance Rate"
          value="94.2%"
          change="+2.1% vs last week"
          changeType="positive"
          icon={ClipboardCheck}
          delay={2}
        />
        <StatsCard
          title="Average Grade"
          value="B+"
          change="3.4 GPA"
          changeType="positive"
          icon={GraduationCap}
          delay={3}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Left column - 2/3 width */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
          <UpcomingClasses />
          <AttendanceOverview />
        </div>

        {/* Right column - 1/3 width */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}

