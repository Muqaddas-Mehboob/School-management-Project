import { useState } from 'react';
import { Sidebar } from '../teacher_components/layout/Sidebar';
import { DashboardLayout } from '../teacher_components/layout/DashboardLayout';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Menu } from 'lucide-react';
import { WeeklySchedule } from '../teacher_components/schedule/WeeklySchedule';
import { DaySchedule } from '../teacher_components/schedule/DaySchedule';
import { AddEventModal } from '../teacher_components/schedule/AddEventModal';

const mockEvents = [
  // Monday
  {
    id: '1',
    title: 'Mathematics 101',
    type: 'class',
    subject: 'Mathematics',
    startTime: new Date(2025, 11, 29, 9, 0),
    endTime: new Date(2025, 11, 29, 10, 0),
    location: 'Room 204',
    description: 'Algebra and Equations',
    color: '#3b82f6'
  },
  {
    id: '2',
    title: 'History 201',
    type: 'class',
    subject: 'History',
    startTime: new Date(2025, 11, 29, 10, 30),
    endTime: new Date(2025, 11, 29, 11, 30),
    location: 'Room 305',
    description: 'American Revolution',
    color: '#8b5cf6'
  },
  {
    id: '3',
    title: 'Lunch Break',
    type: 'event',
    startTime: new Date(2025, 11, 29, 12, 0),
    endTime: new Date(2025, 11, 29, 13, 0),
    location: 'Cafeteria',
    color: '#10b981'
  },
  {
    id: '4',
    title: 'Science Lab',
    type: 'class',
    subject: 'Science',
    startTime: new Date(2025, 11, 29, 13, 0),
    endTime: new Date(2025, 11, 29, 14, 30),
    location: 'Lab 101',
    description: 'Chemistry Experiments',
    color: '#f59e0b'
  },
  // Tuesday
  {
    id: '5',
    title: 'Mathematics 102',
    type: 'class',
    subject: 'Mathematics',
    startTime: new Date(2025, 11, 30, 9, 0),
    endTime: new Date(2025, 11, 30, 10, 0),
    location: 'Room 204',
    description: 'Geometry',
    color: '#3b82f6'
  },
  {
    id: '6',
    title: 'Parent-Teacher Meeting',
    type: 'meeting',
    startTime: new Date(2025, 11, 30, 10, 30),
    endTime: new Date(2025, 11, 30, 11, 30),
    location: 'Conference Room A',
    description: 'Discuss student progress',
    color: '#ef4444'
  },
  {
    id: '7',
    title: 'English Literature',
    type: 'class',
    subject: 'English',
    startTime: new Date(2025, 11, 30, 13, 0),
    endTime: new Date(2025, 11, 30, 14, 0),
    location: 'Room 108',
    description: 'Shakespeare Studies',
    color: '#ec4899'
  },
  // Wednesday
  {
    id: '8',
    title: 'Mathematics 101',
    type: 'class',
    subject: 'Mathematics',
    startTime: new Date(2025, 11, 31, 9, 0),
    endTime: new Date(2025, 11, 31, 10, 0),
    location: 'Room 204',
    description: 'Algebra and Equations',
    color: '#3b82f6'
  },
  {
    id: '9',
    title: 'Faculty Meeting',
    type: 'meeting',
    startTime: new Date(2025, 11, 31, 14, 0),
    endTime: new Date(2025, 11, 31, 15, 0),
    location: 'Main Hall',
    description: 'Monthly faculty discussion',
    color: '#ef4444'
  },
  // Thursday
  {
    id: '10',
    title: 'History 201',
    type: 'class',
    subject: 'History',
    startTime: new Date(2026, 0, 1, 10, 30),
    endTime: new Date(2026, 0, 1, 11, 30),
    location: 'Room 305',
    description: 'Civil War Period',
    color: '#8b5cf6'
  },
  {
    id: '11',
    title: 'Science Lab',
    type: 'class',
    subject: 'Science',
    startTime: new Date(2026, 0, 1, 13, 0),
    endTime: new Date(2026, 0, 1, 14, 30),
    location: 'Lab 101',
    description: 'Physics Demonstrations',
    color: '#f59e0b'
  },
  // Friday
  {
    id: '12',
    title: 'Mathematics 102',
    type: 'class',
    subject: 'Mathematics',
    startTime: new Date(2026, 0, 2, 9, 0),
    endTime: new Date(2026, 0, 2, 10, 0),
    location: 'Room 204',
    description: 'Trigonometry',
    color: '#3b82f6'
  },
  {
    id: '13',
    title: 'Sports Day Planning',
    type: 'event',
    startTime: new Date(2026, 0, 2, 14, 0),
    endTime: new Date(2026, 0, 2, 15, 30),
    location: 'Sports Field',
    description: 'Organize annual sports day',
    color: '#10b981'
  }
];

export default function App() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.setDate(diff));
  });
  
  const [events, setEvents] = useState(mockEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('week');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  const navigateDay = (direction) => {
    if (!selectedDate) return;
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const handleAddEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    setEvents([...events, newEvent]);
    setShowAddModal(false);
  };

  const getWeekRange = () => {
    const endDate = new Date(currentWeekStart);
    endDate.setDate(currentWeekStart.getDate() + 6);
    
    return `${currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setViewMode('day');
  };

  return (
    <DashboardLayout pageTitle="Schedule">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b p-2 sm:p-3 md:p-4 lg:p-6" style={{ borderColor: '#e5e7eb' }}>
          <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Mobile Menu Button */}
                {/* <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden p-1.5 sm:p-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#0e2038' }}
                >
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button> */}
              
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl" style={{ color: '#0e2038' }}>Schedule</h1>
                <p className="text-[9px] xs:text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Manage your classes and events</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-white flex items-center gap-1 sm:gap-2 hover:opacity-90 transition-opacity text-[10px] xs:text-xs sm:text-sm"
              style={{ backgroundColor: '#ff9900' }}
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Add Event</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => viewMode === 'week' ? navigateWeek('prev') : navigateDay('prev')}
                className="p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                style={{ color: '#0e2038' }}
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
              
              <div className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg" style={{ backgroundColor: '#f3f4f6', color: '#0e2038' }}>
                <div className="flex items-center gap-1 sm:gap-2">
                  <CalendarIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  <span className="text-[10px] xs:text-xs sm:text-sm md:text-base">
                    {viewMode === 'week' 
                      ? getWeekRange() 
                      : selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => viewMode === 'week' ? navigateWeek('next') : navigateDay('next')}
                className="p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                style={{ color: '#0e2038' }}
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="flex gap-1 sm:gap-2">
              <button
                onClick={() => setViewMode('week')}
                className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg text-[10px] xs:text-xs sm:text-sm transition-colors"
                style={{
                  backgroundColor: viewMode === 'week' ? '#ff9900' : 'transparent',
                  color: viewMode === 'week' ? 'white' : '#0e2038'
                }}
              >
                Week
              </button>
              <button
                onClick={() => {
                  setViewMode('day');
                  if (!selectedDate) setSelectedDate(new Date());
                }}
                className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg text-[10px] xs:text-xs sm:text-sm transition-colors"
                style={{
                  backgroundColor: viewMode === 'day' ? '#ff9900' : 'transparent',
                  color: viewMode === 'day' ? 'white' : '#0e2038'
                }}
              >
                Day
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Content */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'week' ? (
            <WeeklySchedule
              weekStart={currentWeekStart}
              events={events}
              onDayClick={handleDayClick}
            />
          ) : (
            <DaySchedule
              date={selectedDate || new Date()}
              events={events}
            />
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <AddEventModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddEvent}
        />
      )}
    </DashboardLayout>
  );
}