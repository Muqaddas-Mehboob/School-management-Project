import React, { useState } from "react";
import { FileText, Calendar, TrendingUp, Award, BarChart3 } from "lucide-react";

export function Exams() {
  const [selectedExam, setSelectedExam] = useState(null);

  const upcomingExams = [
    {
      id: 1,
      subject: "Mathematics",
      date: "Feb 20, 2026",
      time: "09:00 AM",
      duration: "2 hours",
      room: "201",
      syllabus: "Chapters 4-6: Calculus, Trigonometry",
      totalMarks: 100,
    },
    {
      id: 2,
      subject: "Physics",
      date: "Feb 22, 2026",
      time: "10:00 AM",
      duration: "2 hours",
      room: "305",
      syllabus: "Chapters 7-9: Mechanics, Waves",
      totalMarks: 100,
    },
    {
      id: 3,
      subject: "Chemistry",
      date: "Feb 25, 2026",
      time: "09:00 AM",
      duration: "2 hours",
      room: "308",
      syllabus: "Chapters 5-7: Organic Chemistry",
      totalMarks: 100,
    },
  ];

  const completedExams = [
    {
      id: 4,
      subject: "English Literature",
      date: "Jan 30, 2026",
      totalMarks: 100,
      scored: 87,
      grade: "A",
      remarks: "Excellent analysis and writing",
    },
    {
      id: 5,
      subject: "History",
      date: "Jan 25, 2026",
      totalMarks: 100,
      scored: 92,
      grade: "A+",
      remarks: "Outstanding performance",
    },
    {
      id: 6,
      subject: "Biology",
      date: "Jan 20, 2026",
      totalMarks: 100,
      scored: 78,
      grade: "B+",
      remarks: "Good work, focus on diagrams",
    },
  ];

  const performanceStats = {
    averageScore: 85.7,
    totalExams: 15,
    highestScore: 95,
    lowestScore: 72,
    lastexamscore: 82,
  };

  const subjectPerformance = [
    { subject: "Mathematics", average: 88, color: "bg-blue-500" },
    { subject: "Physics", average: 85, color: "bg-purple-500" },
    { subject: "Chemistry", average: 82, color: "bg-green-500" },
    { subject: "English", average: 90, color: "bg-yellow-500" },
    { subject: "History", average: 87, color: "bg-red-500" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0e2038]">
          Exams & Results
        </h1>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600 mt-1">
          View exam schedules, marks, and performance analytics
        </p>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#ff9900]" />
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">
              Avg Score
            </p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0e2038]">
            {performanceStats.averageScore}%
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">
              Total Exams
            </p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0e2038]">
            {performanceStats.totalExams}
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-green-500" />
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">
              Highest
            </p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
            {performanceStats.highestScore}%
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-red-500" />
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">
              Lowest
            </p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
            {performanceStats.lowestScore}%
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-purple-500" />
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">
              LAST EXAM SCORE
            </p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">
            {performanceStats.lastexamscore}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Upcoming Exams */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#ff9900]" />
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
                Upcoming Exams
              </h2>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {upcomingExams.map((exam) => (
              <div
                key={exam.id}
                onClick={() => setSelectedExam(exam)}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#ff9900] transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038]">
                    {exam.subject}
                  </h3>
                  <span className="text-[10px] xs:text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full whitespace-nowrap">
                    {exam.totalMarks} marks
                  </span>
                </div>
                <div className="space-y-1 text-[9px] xs:text-xs sm:text-sm text-gray-600">
                  <p>
                    📅 {exam.date} at {exam.time}
                  </p>
                  <p>⏱️ Duration: {exam.duration}</p>
                  <p>🚪 Room: {exam.room}</p>
                  <p className="text-[#0e2038] font-medium mt-2">
                    📖 {exam.syllabus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#ff9900]" />
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
                Subject Performance
              </h2>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {subjectPerformance.map((subject, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm md:text-base text-[#0e2038] font-medium">
                    {subject.subject}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#ff9900]">
                    {subject.average}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${subject.color} h-3 rounded-full transition-all`}
                    style={{ width: `${subject.average}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#ff9900]" />
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
              Recent Results
            </h2>
          </div>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600">
                    Subject
                  </th>
                  <th className="text-left py-3 px-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="text-center py-3 px-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600">
                    Score
                  </th>
                  <th className="text-center py-3 px-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600">
                    Grade
                  </th>
                  <th className="text-left py-3 px-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {completedExams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-xs sm:text-sm md:text-base font-medium text-[#0e2038]">
                      {exam.subject}
                    </td>
                    <td className="py-3 px-4 text-[10px] xs:text-xs sm:text-sm text-gray-600">
                      {exam.date}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-xs sm:text-sm md:text-base font-bold text-[#ff9900]">
                        {exam.scored}/{exam.totalMarks}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-[10px] xs:text-xs font-semibold ${
                          exam.grade.startsWith("A")
                            ? "bg-green-100 text-green-700"
                            : exam.grade.startsWith("B")
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {exam.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[10px] xs:text-xs sm:text-sm text-gray-600">
                      {exam.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
