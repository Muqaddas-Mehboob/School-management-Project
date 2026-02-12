import React, { useState } from 'react';
import { Calendar, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function Attendance() {
  const [viewMode, setViewMode] = useState('daily');

  const attendanceStats = {
    totalDays: 120,
    present: 113,
    absent: 4,
    late: 3,
    percentage: 94.2,
  };

  const dailyRecords = [
    { date: 'Feb 10, 2026', day: 'Monday', status: 'present', classes: 6 },
    { date: 'Feb 7, 2026', day: 'Friday', status: 'present', classes: 6 },
    { date: 'Feb 6, 2026', day: 'Thursday', status: 'late', classes: 6, lateTime: '08:15 AM' },
    { date: 'Feb 5, 2026', day: 'Wednesday', status: 'present', classes: 6 },
    { date: 'Feb 4, 2026', day: 'Tuesday', status: 'present', classes: 6 },
    { date: 'Feb 3, 2026', day: 'Monday', status: 'absent', classes: 6, reason: 'Sick' },
  ];

  const monthlyBreakdown = [
    { month: 'February 2026', present: 6, absent: 1, late: 1, total: 8 },
    { month: 'January 2026', present: 18, absent: 1, late: 1, total: 20 },
    { month: 'December 2025', present: 19, absent: 0, late: 1, total: 20 },
    { month: 'November 2025', present: 20, absent: 1, late: 0, total: 21 },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return (
          <span className="flex items-center gap-1 text-[10px] xs:text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Present
          </span>
        );
      case 'absent':
        return (
          <span className="flex items-center gap-1 text-[10px] xs:text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
            <XCircle className="w-3 h-3" />
            Absent
          </span>
        );
      case 'late':
        return (
          <span className="flex items-center gap-1 text-[10px] xs:text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
            <Clock className="w-3 h-3" />
            Late
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0e2038]">
          Attendance Tracking
        </h1>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600 mt-1">
          View your attendance records and statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Total Days</p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0e2038]">
            {attendanceStats.totalDays}
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Present</p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
            {attendanceStats.present}
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Absent</p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
            {attendanceStats.absent}
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-500" />
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Late</p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">
            {attendanceStats.late}
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#ff9900]" />
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Rate</p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#ff9900]">
            {attendanceStats.percentage}%
          </p>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200 px-4">
          <div className="flex gap-2 overflow-x-auto">
            {['daily', 'weekly', 'monthly'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-3 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap border-b-2 transition-colors ${
                  viewMode === mode
                    ? 'border-[#ff9900] text-[#ff9900]'
                    : 'border-transparent text-gray-600 hover:text-[#0e2038]'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)} View
              </button>
            ))}
          </div>
        </div>

        {/* Daily View */}
        {viewMode === 'daily' && (
          <div className="p-4">
            <div className="space-y-3">
              {dailyRecords.map((record, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#ff9900] transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0e2038]">
                        {new Date(record.date).getDate()}
                      </p>
                      <p className="text-[9px] xs:text-xs text-gray-600">
                        {new Date(record.date).toLocaleDateString('en-US', { month: 'short' })}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038]">
                        {record.day}
                      </p>
                      <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">
                        {record.classes} classes scheduled
                      </p>
                      {record.lateTime && (
                        <p className="text-[9px] xs:text-xs sm:text-sm text-yellow-600 mt-1">
                          Arrived at {record.lateTime}
                        </p>
                      )}
                      {record.reason && (
                        <p className="text-[9px] xs:text-xs sm:text-sm text-red-600 mt-1">
                          Reason: {record.reason}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>{getStatusBadge(record.status)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monthly View */}
        {viewMode === 'monthly' && (
          <div className="p-4">
            <div className="space-y-4">
              {monthlyBreakdown.map((month, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038]">
                      {month.month}
                    </h3>
                    <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600">
                      {month.total} school days
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                        {month.present}
                      </p>
                      <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">Present</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
                        {month.absent}
                      </p>
                      <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">Absent</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">
                        {month.late}
                      </p>
                      <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">Late</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] xs:text-xs sm:text-sm mb-1">
                      <span className="text-gray-600">Attendance Rate</span>
                      <span className="font-semibold text-[#ff9900]">
                        {((month.present / month.total) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#ff9900] h-2 rounded-full"
                        style={{ width: `${(month.present / month.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekly View Placeholder */}
        {viewMode === 'weekly' && (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Weekly view coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
