import { useState, useEffect } from "react";
import { DashboardLayout } from "../teacher_components/layout/DashboardLayout";
import { Plus, Menu } from "lucide-react";
import { AssignmentList } from "../teacher_components/Assignments/AssignmentList";
import { AssignmentDetail } from "../teacher_components/Assignments/AssignmentDetail";
import { CreateAssignment } from "../teacher_components/Assignments/CreateAssignment";

const mockAssignments = [
  {
    id: "1",
    title: "Essay: The American Revolution",
    subject: "History",
    dueDate: new Date(2025, 11, 28),
    totalPoints: 100,
    submissions: 18,
    totalStudents: 25,
    description:
      "Write a 5-page essay analyzing the causes and effects of the American Revolution. Include at least 3 primary sources.",
    status: "active",
  },
  {
    id: "2",
    title: "Math Problem Set Chapter 5",
    subject: "Mathematics",
    dueDate: new Date(2025, 11, 30),
    totalPoints: 50,
    submissions: 22,
    totalStudents: 25,
    description:
      "Complete problems 1-20 from Chapter 5. Show all work for full credit.",
    status: "active",
  },
  {
    id: "3",
    title: "Science Lab Report",
    subject: "Science",
    dueDate: new Date(2025, 11, 27),
    totalPoints: 75,
    submissions: 25,
    totalStudents: 25,
    description:
      "Submit a detailed lab report on the photosynthesis experiment conducted last week.",
    status: "active",
  },
  {
    id: "4",
    title: "Reading Comprehension Quiz",
    subject: "English",
    dueDate: new Date(2026, 0, 5),
    totalPoints: 30,
    submissions: 0,
    totalStudents: 25,
    description:
      'Complete the online quiz covering chapters 1-5 of "To Kill a Mockingbird".',
    status: "upcoming",
  },
  {
    id: "5",
    title: "Historical Timeline Project",
    subject: "History",
    dueDate: new Date(2025, 11, 20),
    totalPoints: 100,
    submissions: 25,
    totalStudents: 25,
    description: "Create a visual timeline of major events from 1750-1850.",
    status: "past",
  },
  {
    id: "6",
    title: "Physics Motion Lab",
    subject: "Science",
    dueDate: new Date(2025, 11, 29),
    totalPoints: 60,
    submissions: 20,
    totalStudents: 25,
    description: "Complete the motion and velocity lab worksheet.",
    status: "active",
  },
  {
    id: "7",
    title: "Shakespeare Essay",
    subject: "English",
    dueDate: new Date(2026, 0, 3),
    totalPoints: 80,
    submissions: 5,
    totalStudents: 25,
    description: "Analyze the themes in Romeo and Juliet.",
    status: "upcoming",
  },
  {
    id: "8",
    title: "Algebra Quiz 3",
    subject: "Mathematics",
    dueDate: new Date(2025, 11, 26),
    totalPoints: 40,
    submissions: 25,
    totalStudents: 25,
    description: "Quiz covering quadratic equations.",
    status: "past",
  },
  {
    id: "9",
    title: "World War II Presentation",
    subject: "History",
    dueDate: new Date(2026, 0, 8),
    totalPoints: 90,
    submissions: 0,
    totalStudents: 25,
    description: "Create a 10-minute presentation on WWII events.",
    status: "upcoming",
  },
  {
    id: "10",
    title: "Chemistry Worksheet",
    subject: "Science",
    dueDate: new Date(2025, 11, 28),
    totalPoints: 45,
    submissions: 15,
    totalStudents: 25,
    description: "Complete problems on chemical reactions.",
    status: "active",
  },
  {
    id: "11",
    title: "Geometry Proofs",
    subject: "Mathematics",
    dueDate: new Date(2025, 11, 31),
    totalPoints: 55,
    submissions: 10,
    totalStudents: 25,
    description: "Solve geometric proof problems 1-15.",
    status: "active",
  },
  {
    id: "12",
    title: "Poetry Analysis",
    subject: "English",
    dueDate: new Date(2025, 11, 25),
    totalPoints: 50,
    submissions: 25,
    totalStudents: 25,
    description: "Analyze three poems from the Romantic era.",
    status: "past",
  },
  {
    id: "13",
    title: "Civil Rights Essay",
    subject: "History",
    dueDate: new Date(2025, 11, 29),
    totalPoints: 85,
    submissions: 17,
    totalStudents: 25,
    description: "Write about the Civil Rights Movement.",
    status: "active",
  },
  {
    id: "14",
    title: "Biology Cell Structure",
    subject: "Science",
    dueDate: new Date(2026, 0, 6),
    totalPoints: 70,
    submissions: 3,
    totalStudents: 25,
    description: "Complete cell structure diagram and labeling.",
    status: "upcoming",
  },
  {
    id: "15",
    title: "Calculus Practice Set",
    subject: "Mathematics",
    dueDate: new Date(2025, 11, 27),
    totalPoints: 65,
    submissions: 23,
    totalStudents: 25,
    description: "Practice problems on derivatives.",
    status: "active",
  },
  {
    id: "16",
    title: "Grammar Exercise",
    subject: "English",
    dueDate: new Date(2025, 11, 24),
    totalPoints: 35,
    submissions: 25,
    totalStudents: 25,
    description: "Complete grammar worksheets 1-3.",
    status: "past",
  },
  {
    id: "17",
    title: "Ancient Greece Report",
    subject: "History",
    dueDate: new Date(2026, 0, 10),
    totalPoints: 95,
    submissions: 0,
    totalStudents: 25,
    description: "Research paper on Ancient Greek civilization.",
    status: "upcoming",
  },
  {
    id: "18",
    title: "Ecology Project",
    subject: "Science",
    dueDate: new Date(2025, 11, 30),
    totalPoints: 80,
    submissions: 12,
    totalStudents: 25,
    description: "Create an ecosystem model and presentation.",
    status: "active",
  },
];
const mockSubmissions = {
  1: [
    {
      id: "s1",
      studentName: "Emma Johnson",
      studentAvatar: "EJ",
      submittedAt: new Date(2025, 11, 26, 14, 30),
      grade: 95,
      status: "graded",
    },
    {
      id: "s2",
      studentName: "Michael Chen",
      studentAvatar: "MC",
      submittedAt: new Date(2025, 11, 26, 16, 20),
      grade: null,
      status: "submitted",
    },
    {
      id: "s3",
      studentName: "Sarah Williams",
      studentAvatar: "SW",
      submittedAt: null,
      grade: null,
      status: "missing",
    },
    {
      id: "s4",
      studentName: "James Martinez",
      studentAvatar: "JM",
      submittedAt: new Date(2025, 11, 25, 10, 15),
      grade: 88,
      status: "graded",
    },
  ],
};

export default function App() {
  const [assignments, setassignments] = useState(mockAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredAssignments =
    activeTab === "all"
      ? assignments
      : assignments.filter((a) => a.status === activeTab);

  const handleCreateAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: String(assignments.length + 1),
      status: "active",
      totalStudents: 25,
      submissions: 0,
    };

    setassignments((prev) => [...prev, newAssignment]);
    setShowCreateModal(false);
  };

  return (
    <DashboardLayout pageTitle="Assignments">
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div
            className="bg-card border-b p-2 sm:p-3 md:p-4 lg:p-6"
            style={{ borderColor: "#e5e7eb" }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                {/* Mobile Menu Button */}

                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground">
                    Assignments
                  </h1>
                  <p className="text-[9px] xs:text-xs sm:text-sm text-muted-foreground  mt-0.5 sm:mt-1">
                    Manage and track student assignments
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-white flex items-center gap-1 sm:gap-2 hover:opacity-90 transition-opacity text-[10px] xs:text-xs sm:text-sm"
                style={{ backgroundColor: "#ff9900" }}
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">New Assignment</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b" style={{ borderColor: "#e5e7eb" }}>
              <div className="flex overflow-x-auto ">
                {[
                  { key: "all", label: "All" },
                  { key: "active", label: "Active" },
                  { key: "upcoming", label: "Upcoming" },
                  { key: "past", label: "Past" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 whitespace-nowrap transition-colors text-[10px] xs:text-xs sm:text-sm border-b-2 ${
    activeTab === tab.key
      ? "border-primary text-primary"
      : "border-transparent text-muted-foreground hover:text-foreground"
  }
`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Assignment List */}
            <div
              className={`w-full lg:w-96 xl:w-1/3 bg-card border-r flex flex-col ${
                selectedAssignment ? "hidden lg:flex" : "flex"
              }`}
              style={{ borderColor: "#e5e7eb" }}
            >
              <AssignmentList
                assignments={filteredAssignments}
                selectedAssignment={selectedAssignment}
                onSelectAssignment={setSelectedAssignment}
              />
            </div>

            {/* Assignment Detail */}
            <div
              className={`flex-1 bg-card ${
                selectedAssignment ? "block" : "hidden lg:block"
              }`}
            >
              {selectedAssignment ? (
                <AssignmentDetail
                  assignment={selectedAssignment}
                  submissions={mockSubmissions[selectedAssignment.id] || []}
                  onBack={() => setSelectedAssignment(null)}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground px-4 text-center">
                  <div>
                    <p className="text-xs sm:text-sm mb-2">
                      Select an assignment to view details
                    </p>
                    <p className="text-[10px] xs:text-xs sm:text-sm">
                      or create a new one
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create Assignment Modal */}
        {showCreateModal && (
          <CreateAssignment
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateAssignment}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
