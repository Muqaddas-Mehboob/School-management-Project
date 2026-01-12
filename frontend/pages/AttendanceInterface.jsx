import React, { useState } from 'react';
import { BarChart3, Users, BookOpen, FileText, Settings, LogOut, Search, Bell, ChevronDown } from 'lucide-react';

const AttendanceInterface = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: BarChart3, active: true },
    { name: 'Students', icon: Users, active: false },
    { name: 'Classes', icon: BookOpen, active: false },
    { name: 'Reports', icon: FileText, active: false },
  ];

  const weeklyData = [
    { month: 'Jan', value: 30 },
    { month: 'Feb', value: 45 },
    { month: 'Mar', value: 60 },
    { month: 'Apr', value: 75 },
    { month: 'May', value: 95 },
    { month: 'Jun', value: 120 },
    { month: 'Jul', value: 135 },
    { month: 'Aug', value: 145 },
    { month: 'Sep', value: 160 },
    { month: 'Oct', value: 210 },
    { month: 'Nov', value: 240 },
    { month: 'Dec', value: 250 },
  ];

  const maxValue = Math.max(...weeklyData.map(d => d.value));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            {/* Logo space */}
          </div>
          <nav className="mt-8 flex-1 px-3 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  item.name === 'Dashboard'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>
          <div className="px-3 space-y-2">
            <button className="w-full group flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </button>
            <button className="w-full group flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome back, Zohaib Ali
              </h1>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-semibold">
                    Z
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    Zohaib Ali
                  </span>
                  <ChevronDown className="hidden sm:block h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Total Students</h3>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">510</p>
              <p className="text-sm text-green-600 font-medium">+15 New this year</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Present Today</h3>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900">490</p>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Absent Today</h3>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900">20</p>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Leaves</h3>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900">5</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Weekly Attendance Trend */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Weekly Attendance Trend</h2>
                <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <span>This week</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              
              <div className="relative h-64 sm:h-80">
                <svg className="w-full h-full" viewBox="0 0 800 300">
                  {/* Grid lines */}
                  <line x1="40" y1="250" x2="760" y2="250" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="200" x2="760" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="150" x2="760" y2="150" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="100" x2="760" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="50" x2="760" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Y-axis labels */}
                  <text x="10" y="255" fontSize="12" fill="#6b7280">0</text>
                  <text x="10" y="205" fontSize="12" fill="#6b7280">50</text>
                  <text x="10" y="155" fontSize="12" fill="#6b7280">100</text>
                  <text x="10" y="105" fontSize="12" fill="#6b7280">150</text>
                  <text x="10" y="55" fontSize="12" fill="#6b7280">200</text>
                  <text x="10" y="20" fontSize="12" fill="#6b7280">250</text>
                  
                  {/* Line chart */}
                  <polyline
                    points={weeklyData.map((d, i) => {
                      const x = 60 + (i * 60);
                      const y = 250 - (d.value / maxValue) * 200;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                  />
                  
                  {/* Data points */}
                  {weeklyData.map((d, i) => {
                    const x = 60 + (i * 60);
                    const y = 250 - (d.value / maxValue) * 200;
                    return (
                      <circle key={i} cx={x} cy={y} r="4" fill="#000000" />
                    );
                  })}
                  
                  {/* X-axis labels */}
                  {weeklyData.map((d, i) => {
                    const x = 60 + (i * 60);
                    return (
                      <text key={i} x={x} y="275" fontSize="12" fill="#6b7280" textAnchor="middle">
                        {d.month}
                      </text>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Absent Reason By Category */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Absent Reason By Category</h2>
                <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <span>This year</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex justify-center mb-6">
                <svg width="240" height="240" viewBox="0 0 240 240">
                  {/* Donut chart segments */}
                  <circle cx="120" cy="120" r="90" fill="none" stroke="#ff6b6b" strokeWidth="40" strokeDasharray="84.78 565.49" transform="rotate(-90 120 120)" />
                  <circle cx="120" cy="120" r="90" fill="none" stroke="#4c6ef5" strokeWidth="40" strokeDasharray="164.93 565.49" strokeDashoffset="-84.78" transform="rotate(-90 120 120)" />
                  <circle cx="120" cy="120" r="90" fill="none" stroke="#7950f2" strokeWidth="40" strokeDasharray="125.66 565.49" strokeDashoffset="-249.71" transform="rotate(-90 120 120)" />
                  <circle cx="120" cy="120" r="90" fill="none" stroke="#ffa94d" strokeWidth="40" strokeDasharray="186.92 565.49" strokeDashoffset="-375.37" transform="rotate(-90 120 120)" />
                  
                  {/* Center white circle */}
                  <circle cx="120" cy="120" r="65" fill="white" />
                </svg>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-sm text-gray-700">Illness</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">15.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-700">Events</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">29.1%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-gray-700">Family Trip</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">22.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span className="text-sm text-gray-700">Others</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">33%</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceInterface;
