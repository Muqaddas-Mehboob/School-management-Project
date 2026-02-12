import React, { useState } from 'react';
import { Bell, Calendar, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function Notifications() {
  const [filterType, setFilterType] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'exam',
      title: 'Mid-term Exam Schedule Released',
      message: 'Your mid-term exam schedule has been published. Mathematics exam is on Feb 20.',
      time: '2 hours ago',
      read: false,
      important: true,
      icon: Calendar,
      color: 'bg-red-500',
    },
    {
      id: 2,
      type: 'assignment',
      title: 'New Assignment Posted',
      message: 'Dr. Brown posted a new assignment: Lab Report - Chemical Reactions',
      time: '4 hours ago',
      read: false,
      important: false,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      id: 3,
      type: 'timetable',
      title: 'Timetable Change',
      message: 'Physics class has been moved from Room 305 to Room 310 on Feb 11.',
      time: '6 hours ago',
      read: false,
      important: true,
      icon: AlertCircle,
      color: 'bg-yellow-500',
    },
    {
      id: 4,
      type: 'grade',
      title: 'Exam Results Published',
      message: 'Your English Literature exam results are now available. Score: 87/100',
      time: '1 day ago',
      read: true,
      important: false,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      id: 5,
      type: 'announcement',
      title: 'Science Fair Registration Open',
      message: 'Register for the annual Science Fair by Feb 25. Limited spots available!',
      time: '1 day ago',
      read: false,
      important: false,
      icon: Bell,
      color: 'bg-purple-500',
    },
    {
      id: 6,
      type: 'assignment',
      title: 'Assignment Graded',
      message: 'Your Physics Worksheet #12 has been graded. Score: 45/50',
      time: '2 days ago',
      read: true,
      important: false,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      id: 7,
      type: 'resource',
      title: 'New Study Material Available',
      message: 'Mr. Anderson uploaded Calculus Chapter 5 notes to Learning Resources',
      time: '2 days ago',
      read: true,
      important: false,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      id: 8,
      type: 'event',
      title: 'Library Hours Extended',
      message: 'Library will remain open until 10 PM during exam week (Feb 20-28)',
      time: '3 days ago',
      read: true,
      important: false,
      icon: Clock,
      color: 'bg-indigo-500',
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (filterType === 'unread') return !notification.read;
    if (filterType === 'important') return notification.important;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0e2038]">
              Notifications & Alerts
            </h1>
            <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600 mt-1">
              Stay updated with important announcements and updates
            </p>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg">
              <Bell className="w-4 h-4" />
              <span className="text-xs sm:text-sm md:text-base font-semibold">
                {unreadCount} unread
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200 px-4">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'all', label: 'All Notifications', count: notifications.length },
              { id: 'unread', label: 'Unread', count: unreadCount },
              { id: 'important', label: 'Important', count: notifications.filter(n => n.important).length },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterType(filter.id)}
                className={`px-4 py-3 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap border-b-2 transition-colors ${
                  filterType === filter.id
                    ? 'border-[#ff9900] text-[#ff9900]'
                    : 'border-transparent text-gray-600 hover:text-[#0e2038]'
                }`}
              >
                {filter.label}
                <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-[9px] xs:text-xs">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm border transition-colors ${
                notification.read
                  ? 'border-gray-200 hover:border-gray-300'
                  : 'border-[#ff9900] bg-orange-50/30'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 ${notification.color} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1">
                        <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] flex items-center gap-2">
                          {notification.title}
                          {notification.important && (
                            <span className="text-[9px] xs:text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                              Important
                            </span>
                          )}
                          {!notification.read && (
                            <span className="w-2 h-2 bg-[#ff9900] rounded-full" />
                          )}
                        </h3>
                      </div>
                      <span className="text-[9px] xs:text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-gray-700">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {!notification.read && (
                <div className="px-4 pb-4">
                  <button className="text-[10px] xs:text-xs sm:text-sm text-[#ff9900] hover:text-[#e68a00] font-medium">
                    Mark as read
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 mb-2">
            No notifications found
          </h3>
          <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500">
            You're all caught up! Check back later for updates.
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] mb-3">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-[10px] xs:text-xs sm:text-sm transition-colors">
            Mark all as read
          </button>
          <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-[10px] xs:text-xs sm:text-sm transition-colors">
            Notification settings
          </button>
          <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-[10px] xs:text-xs sm:text-sm transition-colors">
            Clear read notifications
          </button>
        </div>
      </div>
    </div>
  );
}
