import React, { useState } from 'react';
import { Users, GraduationCap, UserCog, BookOpen, Calendar, FileText, BarChart3, Settings, ChevronDown, Bell, Plus, UserPlus, PlusCircle, CalendarCheck, FileBarChart, Menu, X } from 'lucide-react';

// Add global styles to make it full screen
const globalStyles = `
  body, html, #root {
    margin: 0 !important;
    padding: 0 !important;
    height: 100vh !important;
    width: 100vw !important;
    overflow: hidden !important;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = globalStyles;
  document.head.appendChild(styleSheet);
}

// Mock data
const statsData = [
  { icon: Users, label: 'Total Students', value: '2,847', change: '+12%', color: 'bg-blue-100', iconColor: 'text-blue-600' },
  { icon: GraduationCap, label: 'Total Teachers', value: '142', change: '+3%', color: 'bg-purple-100', iconColor: 'text-purple-600' },
  { icon: BookOpen, label: 'Total Classes', value: '48', change: '0%', color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { icon: Calendar, label: 'Attendance Rate', value: '94.2%', change: '+2%', color: 'bg-green-100', iconColor: 'text-green-600' }
];

const enrollmentData = [
  { month: 'Jan', value: 240 },
  { month: 'Feb', value: 180 },
  { month: 'Mar', value: 280 },
  { month: 'Apr', value: 220 },
  { month: 'May', value: 310 },
  { month: 'Jun', value: 320 },
  { month: 'Jul', value: 180 },
  { month: 'Aug', value: 240 },
  { month: 'Sep', value: 290 },
  { month: 'Oct', value: 230 },
  { month: 'Nov', value: 270 },
  { month: 'Dec', value: 260 }
];

const attendanceData = [
  { grade: 'Grade 8', value: 25, color: '#3B82F6' },
  { grade: 'Grade 9', value: 20, color: '#8B5CF6' },
  { grade: 'Grade 10', value: 22, color: '#F59E0B' },
  { grade: 'Grade 11', value: 18, color: '#10B981' },
  { grade: 'Grade 12', value: 15, color: '#EC4899' }
];

const recentAdmissions = [
  { name: 'Emma Smith', class: 'Grade 10-A', date: 'Jan 15, 2024', status: 'Active', avatar: 'E' },
  { name: 'Michael Johnson', class: 'Grade 9-B', date: 'Jan 14, 2024', status: 'Active', avatar: 'M' },
  { name: 'Sarah Williams', class: 'Grade 11-C', date: 'Jan 13, 2024', status: 'Pending', avatar: 'S' },
  { name: 'David Brown', class: 'Grade 6-A', date: 'Jan 12, 2024', status: 'Active', avatar: 'D' },
  { name: 'Olivia Taylor', class: 'Grade 11-B', date: 'Jan 11, 2024', status: 'Active', avatar: 'O' }
];

const pendingActions = [
  { title: 'Approve 12 Leave Requests', desc: 'Student leave applications pending approval', due: 'Due Today', icon: Users, color: 'bg-yellow-50 border-yellow-200', iconColor: 'text-yellow-600', textColor: 'text-yellow-700' },
  { title: 'Review Exam Results', desc: 'Grade 10 mid-term results need verification', due: 'Urgent', icon: FileText, color: 'bg-red-50 border-red-200', iconColor: 'text-red-600', textColor: 'text-red-700' },
  { title: 'Complete Teacher Onboarding', desc: '3 new teachers need profile completion', due: 'Due Jan 20', icon: UserPlus, color: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-600', textColor: 'text-blue-700' },
  { title: 'Schedule Parent-Teacher Meeting', desc: 'Quarterly meeting dates to be finalized', due: 'Due Jan 25', icon: CalendarCheck, color: 'bg-green-50 border-green-200', iconColor: 'text-green-600', textColor: 'text-green-700' },
  { title: 'Update System Settings', desc: 'Configure new academic year parameters', due: 'Due Jan 30', icon: Settings, color: 'bg-purple-50 border-purple-200', iconColor: 'text-purple-600', textColor: 'text-purple-700' }
];

const quickActions = [
  { icon: UserPlus, label: 'Add Student', color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
  { icon: GraduationCap, label: 'Add Teacher', color: 'bg-purple-50', iconColor: 'text-purple-600' },
  { icon: PlusCircle, label: 'Create Class', color: 'bg-blue-50', iconColor: 'text-blue-600' },
  { icon: CalendarCheck, label: 'Schedule Exam', color: 'bg-green-50', iconColor: 'text-green-600' },
  { icon: FileBarChart, label: 'View Reports', color: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { icon: UserCog, label: 'Manage Users', color: 'bg-pink-50', iconColor: 'text-pink-600' }
];

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/' },
    { 
      id: 'school', 
      label: 'School Management', 
      icon: BookOpen, 
      submenu: [
        { id: 'admins', label: 'Admins' },
        { id: 'teachers', label: 'Teachers' },
        { id: 'parents', label: 'Parents' },
        { id: 'students', label: 'Students' }
      ]
    },
    { 
      id: 'academic', 
      label: 'Academic Structure', 
      icon: GraduationCap,
      submenu: [
        { id: 'classes', label: 'Classes' },
        { id: 'sections', label: 'Sections' },
        { id: 'subjects', label: 'Subjects' }
      ]
    },
    { id: 'attendance', label: 'Attendance Management', icon: Calendar },
    { id: 'examination', label: 'Examination Management', icon: FileText },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const toggleSubmenu = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return <DashboardContent />;
      case 'admins':
        return <UserManagement title="Admin Management" type="admin" />;
      case 'teachers':
        return <UserManagement title="Teacher Management" type="teacher" />;
      case 'parents':
        return <UserManagement title="Parent Management" type="parent" />;
      case 'students':
        return <UserManagement title="Student Management" type="student" />;
      case 'classes':
        return <AcademicContent title="Classes Management" />;
      case 'sections':
        return <AcademicContent title="Sections Management" />;
      case 'subjects':
        return <AcademicContent title="Subjects Management" />;
      case 'attendance':
        return <AttendanceContent />;
      case 'examination':
        return <ExaminationContent />;
      case 'reports':
        return <ReportsContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  const handleMenuClick = (id, hasSubmenu) => {
    if (hasSubmenu) {
      toggleSubmenu(id);
    } else {
      setActiveMenu(id);
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800 text-white transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
            <div>
              <h1 className="font-bold">EduPortal</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
          <button onClick={() => setIsMobileSidebarOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-140px)]">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleMenuClick(item.id, !!item.submenu)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeMenu === item.id ? 'bg-slate-700' : 'hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.submenu && (
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${openSubmenu === item.id ? 'rotate-180' : ''}`}
                  />
                )}
              </button>
              
              {item.submenu && openSubmenu === item.id && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.id}
                      onClick={() => {
                        setActiveMenu(subitem.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeMenu === subitem.id ? 'bg-slate-700' : 'hover:bg-slate-700/50'
                      }`}
                    >
                      {subitem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-semibold">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu size={24} />
              </button>
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search students, teachers, classes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Users className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-semibold text-white">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};

const DashboardContent = () => {
  const maxValue = Math.max(...enrollmentData.map(d => d.value));
  const total = attendanceData.reduce((sum, d) => sum + d.value, 0);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back, John! Here's what's happening in your school today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-start justify-between">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className={stat.iconColor} size={24} />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold mt-4">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg">Student Enrollment</h3>
              <p className="text-sm text-gray-600">Monthly growth trend</p>
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <div className="flex items-end justify-between gap-2 h-64">
            {enrollmentData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-orange-500 rounded-t-lg transition-all hover:bg-orange-600" 
                     style={{ height: `${(data.value / maxValue) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Donut */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg">Attendance Overview</h3>
              <p className="text-sm text-gray-600">By class distribution</p>
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <svg width="280" height="280" viewBox="0 0 280 280">
              {attendanceData.map((data, index) => {
                const percentage = (data.value / total) * 100;
                const previousPercentage = attendanceData.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 100, 0);
                const startAngle = (previousPercentage / 100) * 360 - 90;
                const endAngle = ((previousPercentage + percentage) / 100) * 360 - 90;
                
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                
                const x1 = 140 + 100 * Math.cos(startRad);
                const y1 = 140 + 100 * Math.sin(startRad);
                const x2 = 140 + 100 * Math.cos(endRad);
                const y2 = 140 + 100 * Math.sin(endRad);
                
                const largeArc = percentage > 50 ? 1 : 0;
                
                return (
                  <path
                    key={index}
                    d={`M 140 140 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={data.color}
                    className="hover:opacity-80 transition-opacity"
                  />
                );
              })}
              <circle cx="140" cy="140" r="60" fill="white" />
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {attendanceData.map((data, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></div>
                <span className="text-sm text-gray-700">{data.grade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <button key={index} className={`${action.color} p-4 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center gap-2`}>
              <action.icon className={action.iconColor} size={24} />
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admissions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Recent Admissions</h3>
          <p className="text-sm text-gray-600 mb-4">Latest student enrollments</p>
          <div className="space-y-3">
            {recentAdmissions.map((student, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white ${
                    index % 5 === 0 ? 'bg-blue-500' : 
                    index % 5 === 1 ? 'bg-purple-500' : 
                    index % 5 === 2 ? 'bg-orange-500' : 
                    index % 5 === 3 ? 'bg-teal-500' : 'bg-pink-500'
                  }`}>
                    {student.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{student.date}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {student.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Pending Actions</h3>
          <p className="text-sm text-gray-600 mb-4">Tasks requiring your attention</p>
          <div className="space-y-3">
            {pendingActions.map((action, index) => (
              <div key={index} className={`${action.color} p-4 rounded-lg border`}>
                <div className="flex items-start gap-3">
                  <div className={`${action.iconColor} p-2 bg-white rounded-lg`}>
                    <action.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{action.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{action.desc}</p>
                    <p className={`text-xs ${action.textColor} font-medium mt-2`}>{action.due}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserManagement = ({ title, type }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">Manage {type} accounts and profiles</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
        <Plus size={20} />
        Add {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-gray-600">Content for {title} will be displayed here...</p>
    </div>
  </div>
);

const AcademicContent = ({ title }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">Manage academic structure and curriculum</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
        <Plus size={20} />
        Add New
      </button>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-gray-600">Content for {title} will be displayed here...</p>
    </div>
  </div>
);

const AttendanceContent = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Attendance Management</h2>
      <p className="text-gray-600">Track and manage student attendance</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-gray-600">Attendance tracking interface will be displayed here...</p>
    </div>
  </div>
);

const ExaminationContent = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Examination Management</h2>
      <p className="text-gray-600">Manage exams, results, and assessments</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-gray-600">Examination management interface will be displayed here...</p>
    </div>
  </div>
);

const ReportsContent = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
      <p className="text-gray-600">View comprehensive reports and analytics</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-gray-600">Reports and analytics will be displayed here...</p>
    </div>
  </div>
);

const SettingsContent = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      <p className="text-gray-600">Configure system settings and preferences</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-gray-600">Settings interface will be displayed here...</p>
    </div>
  </div>
);

export default AdminDashboard;