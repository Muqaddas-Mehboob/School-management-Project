import React from 'react';
import { Calendar, ClipboardList, TrendingUp, Award, Clock, BookOpen, AlertCircle } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Overall Grade', value: 'A', icon: TrendingUp, color: 'bg-blue-500' },
    { label: 'Attendance Rate', value: '94%', icon: Calendar, color: 'bg-green-500' },
    { label: 'Pending Assignments', value: '3', icon: ClipboardList, color: 'bg-orange-500' },
    { label: 'Achievements', value: '12', icon: Award, color: 'bg-purple-500' },
  ];

  const todaySchedule = [
    { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Anderson', room: '201' },
    { time: '09:15 - 10:15', subject: 'Physics', teacher: 'Dr. Williams', room: '305' },
    { time: '10:30 - 11:30', subject: 'English Literature', teacher: 'Ms. Parker', room: '102' },
    { time: '12:00 - 13:00', subject: 'Chemistry', teacher: 'Dr. Brown', room: '308' },
  ];

  const recentAnnouncements = [
    { id: 1, title: 'Mid-term Exams Schedule Released', date: '2 hours ago', priority: 'high' },
    { id: 2, title: 'Science Fair Registration Open', date: '1 day ago', priority: 'medium' },
    { id: 3, title: 'Library Hours Extended for Exam Week', date: '2 days ago', priority: 'low' },
  ];

  const upcomingDeadlines = [
    { subject: 'Mathematics', task: 'Chapter 5 Problem Set', due: 'Tomorrow', urgent: true },
    { subject: 'English', task: 'Essay on Shakespeare', due: 'Feb 8', urgent: false },
    { subject: 'Physics', task: 'Lab Report #3', due: 'Feb 10', urgent: false },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0e2038]">
          Welcome Back, Sarah!
        </h1>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600 mt-1">
          Here's what's happening with your studies today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">{stat.label}</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0e2038] mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#ff9900]" />
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
                Today's Schedule
              </h2>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {todaySchedule.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-[9px] xs:text-xs sm:text-sm font-medium text-[#ff9900] whitespace-nowrap">
                  {item.time}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] truncate">
                    {item.subject}
                  </p>
                  <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">
                    {item.teacher} • Room {item.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#ff9900]" />
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
                Upcoming Deadlines
              </h2>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {upcomingDeadlines.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  item.urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'
                }`}
              >
                <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-600">
                  {item.subject}
                </p>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] mt-1">
                  {item.task}
                </p>
                <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600 mt-1">
                  Due: {item.due}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#ff9900]" />
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
              Recent Announcements
            </h2>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentAnnouncements.map((announcement) => (
            <div key={announcement.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038]">
                      {announcement.title}
                    </p>
                    <span
                      className={`text-[9px] xs:text-xs px-2 py-0.5 rounded-full ${
                        announcement.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : announcement.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600 mt-1">
                    {announcement.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
