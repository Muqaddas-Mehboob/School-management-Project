import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
} from "lucide-react";
import { DashboardLayout } from "../teacher_components/layout/DashboardLayout";
import { WeeklySchedule } from "../teacher_components/schedule/WeeklySchedule";
import { DaySchedule } from "../teacher_components/schedule/DaySchedule";
import { AddEventModal } from "../teacher_components/schedule/AddEventModal";

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

export default function Schedule() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.setDate(diff));
  });

  const [events, setEvents] = useState(mockEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState("week");

  const navigateWeek = (dir) => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + (dir === "next" ? 7 : -7));
    setCurrentWeekStart(d);
  };

  const navigateDay = (dir) => {
    if (!selectedDate) return;
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + (dir === "next" ? 1 : -1));
    setSelectedDate(d);
  };

  const getWeekRange = () => {
    const end = new Date(currentWeekStart);
    end.setDate(currentWeekStart.getDate() + 6);
    return `${currentWeekStart.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  return (
    <DashboardLayout pageTitle="Schedule">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-background border-b border-border p-2 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                Schedule
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage your classes and events
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="
                flex items-center gap-2
                px-3 sm:px-4 py-2
                rounded-lg
                bg-primary
                text-primary-foreground
                hover:bg-primary/90
                transition-colors
                text-xs sm:text-sm
              "
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Event</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  viewMode === "week"
                    ? navigateWeek("prev")
                    : navigateDay("prev")
                }
                className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-xs sm:text-sm">
                  {viewMode === "week"
                    ? getWeekRange()
                    : selectedDate?.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                </span>
              </div>

              <button
                onClick={() =>
                  viewMode === "week"
                    ? navigateWeek("next")
                    : navigateDay("next")
                }
                className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* View Switch */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("week")}
                className={`
                  px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors
                  ${
                    viewMode === "week"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }
                `}
              >
                Week
              </button>

              <button
                onClick={() => {
                  setViewMode("day");
                  if (!selectedDate) setSelectedDate(new Date());
                }}
                className={`
                  px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors
                  ${
                    viewMode === "day"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }
                `}
              >
                Day
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-background">
          {viewMode === "week" ? (
            <WeeklySchedule
              weekStart={currentWeekStart}
              events={events}
              onDayClick={(d) => {
                setSelectedDate(d);
                setViewMode("day");
              }}
            />
          ) : (
            <DaySchedule date={selectedDate || new Date()} events={events} />
          )}
        </div>
      </div>

      {showAddModal && (
        <AddEventModal
          onClose={() => setShowAddModal(false)}
          onAdd={(e) =>
            setEvents((prev) => [...prev, { ...e, id: Date.now().toString() }])
          }
        />
      )}
    </DashboardLayout>
  );
}
