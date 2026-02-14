import React, { useState } from 'react';
import '../src/index.css';
import { Sidebar } from './components/Sidebar';
import { ProgressReport } from './components/ProgressReport';
import { Dashboard } from './components/Dashboard';
import { Attendance } from './components/Attendance';
import { Assignments } from './components/Assignments';
import { Exams } from './components/Exams';
import { Resources } from './components/Resources';
import { Notifications } from './components/Notifications';
import { Profile } from './components/Profile';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'attendance':
        return <Attendance />;
      case 'assignments':
        return <Assignments />;
      case 'exams':
        return <Exams />;
      case 'resources':
        return <Resources />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      case 'Progress Report':
        return <ProgressReport />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className=" flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}