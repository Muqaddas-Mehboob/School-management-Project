import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  FileText, 
  Download, 
  Filter,
  ChevronDown,
  ChevronUp,
  Edit,
  Save,
  Users,
  BarChart3,
  Calendar,
  MessageSquare
} from 'lucide-react';

export function ProgressReport() {
  const [userRole, setUserRole] = useState('student'); // 'student' or 'teacher'
  const [selectedTerm, setSelectedTerm] = useState('current');
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Student Progress Data
  const studentProgress = {
    overallpercentage: 85,
    overallGrade: 'A',
    rank: '5th out of 120 students',
    attendance: '94%',
    subjects: [
      {
        id: 1,
        name: 'Mathematics',
        grade: 'A',
        percentage: 88,
        teacher: 'Mr. Anderson',
        assignments: { completed: 12, total: 12, avgScore: 87 },
        exams: [
          { name: 'Mid-term', score: 85, total: 100, date: 'Jan 15' },
          { name: 'Quiz 1', score: 92, total: 100, date: 'Dec 10' }
        ],
        attendance: '96%',
        strengths: ['Problem Solving', 'Calculus'],
        improvements: ['Show more work in solutions'],
        teacherComment: 'Excellent performance. Shows strong analytical skills.'
      },
      {
        id: 2,
        name: 'Physics',
        grade: 'A-',
        percentage: 85,
        teacher: 'Dr. Williams',
        assignments: { completed: 11, total: 12, avgScore: 84 },
        exams: [
          { name: 'Mid-term', score: 82, total: 100, date: 'Jan 18' },
          { name: 'Lab Test', score: 88, total: 100, date: 'Dec 15' }
        ],
        attendance: '94%',
        strengths: ['Theoretical Understanding', 'Lab Work'],
        improvements: ['Practice more numerical problems'],
        teacherComment: 'Good progress. Needs to focus on problem-solving speed.'
      },
      {
        id: 3,
        name: 'Chemistry',
        grade: 'B+',
        percentage: 82,
        teacher: 'Dr. Brown',
        assignments: { completed: 10, total: 12, avgScore: 80 },
        exams: [
          { name: 'Mid-term', score: 78, total: 100, date: 'Jan 20' },
          { name: 'Practical', score: 85, total: 100, date: 'Dec 12' }
        ],
        attendance: '92%',
        strengths: ['Organic Chemistry', 'Lab Skills'],
        improvements: ['Review inorganic chemistry concepts'],
        teacherComment: 'Consistent effort. Focus on regular revision.'
      },
      {
        id: 4,
        name: 'English Literature',
        grade: 'A',
        percentage: 90,
        teacher: 'Ms. Parker',
        assignments: { completed: 12, total: 12, avgScore: 89 },
        exams: [
          { name: 'Mid-term', score: 87, total: 100, date: 'Jan 22' },
          { name: 'Essay', score: 92, total: 100, date: 'Dec 18' }
        ],
        attendance: '98%',
        strengths: ['Critical Analysis', 'Writing Skills'],
        improvements: ['None'],
        teacherComment: 'Outstanding work. Excellent analytical abilities.'
      },
    ]
  };

  // Teacher View - Students List
  const studentsData = [
    { id: 1, name: 'Sarah Johnson', grade: 'A', gpa: 3.8, attendance: '94%', status: 'excellent' },
    { id: 2, name: 'Michael Chen', grade: 'A-', gpa: 3.6, attendance: '96%', status: 'good' },
    { id: 3, name: 'Emma Davis', grade: 'B+', gpa: 3.4, attendance: '88%', status: 'satisfactory' },
    { id: 4, name: 'James Wilson', grade: 'B', gpa: 3.2, attendance: '90%', status: 'satisfactory' },
    { id: 5, name: 'Olivia Martinez', grade: 'A+', gpa: 4.0, attendance: '98%', status: 'excellent' },
  ];

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
    if (grade.startsWith('B')) return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
    if (grade.startsWith('C')) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
    return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return 'bg-green-500 dark:bg-green-600';
      case 'good': return 'bg-blue-500 dark:bg-blue-600';
      case 'satisfactory': return 'bg-yellow-500 dark:bg-yellow-600';
      default: return 'bg-red-500 dark:bg-red-600';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0e2038] dark:text-white">
              Progress Report
            </h1>
            <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              {userRole === 'student' 
                ? 'Track your academic performance and progress' 
                : 'Monitor and evaluate student performance'}
            </p>
          </div>
          <div className="flex gap-3">
            {/* Role Toggle (Demo purposes) */}
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm md:text-base bg-white dark:bg-gray-800 text-[#0e2038] dark:text-white focus:ring-2 focus:ring-[#ff9900] dark:focus:ring-orange-500"
            >
              <option value="student">Student View</option>
              <option value="teacher">Teacher View</option>
            </select>
          </div>
        </div>
      </div>

      {/* STUDENT VIEW */}
      {userRole === 'student' && (
        <>
          {/* Overall Performance Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-[#ff9900] dark:text-orange-500" />
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400">Overall Percentage</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0e2038] dark:text-white">
                {studentProgress.overallpercentage}
              </p>
              <p className={`text-xs mt-1 font-semibold px-2 py-1 rounded-full inline-block ${getGradeColor(studentProgress.overallGrade)}`}>
                Grade {studentProgress.overallGrade}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400">Class Rank</p>
              </div>
              <p className="text-xs sm:text-sm md:text-base font-bold text-[#0e2038] dark:text-white">
                {studentProgress.rank}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-500 dark:text-green-400" />
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400">Attendance</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                {studentProgress.attendance}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400">Subjects</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0e2038] dark:text-white">
                {studentProgress.subjects.length}
              </p>
            </div>
          </div>

          {/* Term Filter and Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-[#ff9900] dark:text-orange-500" />
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm md:text-base bg-white dark:bg-gray-700 text-[#0e2038] dark:text-white"
                >
                  <option value="current">Current Term (Spring 2026)</option>
                  <option value="fall2025">Fall 2025</option>
                  <option value="spring2025">Spring 2025</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#ff9900] dark:bg-orange-600 text-white rounded-lg hover:bg-[#e68a00] dark:hover:bg-orange-700 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-xs sm:text-sm md:text-base">Download Report</span>
              </button>
            </div>
          </div>

          {/* Subject-wise Progress */}
          <div className="space-y-4">
            {studentProgress.subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Subject Header */}
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-lg ${getStatusColor('excellent')} flex items-center justify-center`}>
                          <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#0e2038] dark:text-white">
                          {subject.name}
                        </h3>
                        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {subject.teacher} • Attendance: {subject.attendance}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg sm:text-xl md:text-2xl font-bold px-3 py-1 rounded-full ${getGradeColor(subject.grade)}`}>
                          {subject.grade}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {subject.percentage}%
                        </p>
                      </div>
                      {expandedSubject === subject.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedSubject === subject.id && (
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/50">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        {/* Assignments */}
                        <div>
                          <h4 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] dark:text-white mb-2">
                            Assignments
                          </h4>
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                            <div className="flex justify-between text-[10px] xs:text-xs sm:text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-400">Completed</span>
                              <span className="font-semibold text-[#0e2038] dark:text-white">
                                {subject.assignments.completed}/{subject.assignments.total}
                              </span>
                            </div>
                            <div className="flex justify-between text-[10px] xs:text-xs sm:text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Average Score</span>
                              <span className="font-semibold text-[#ff9900] dark:text-orange-500">
                                {subject.assignments.avgScore}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Exams */}
                        <div>
                          <h4 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] dark:text-white mb-2">
                            Exam Scores
                          </h4>
                          <div className="space-y-2">
                            {subject.exams.map((exam, idx) => (
                              <div
                                key={idx}
                                className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-xs sm:text-sm font-semibold text-[#0e2038] dark:text-white">
                                      {exam.name}
                                    </p>
                                    <p className="text-[9px] xs:text-xs text-gray-600 dark:text-gray-400">
                                      {exam.date}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm sm:text-base font-bold text-[#ff9900] dark:text-orange-500">
                                      {exam.score}/{exam.total}
                                    </p>
                                    <p className="text-[9px] xs:text-xs text-gray-600 dark:text-gray-400">
                                      {((exam.score / exam.total) * 100).toFixed(0)}%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        {/* Strengths */}
                        <div>
                          <h4 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] dark:text-white mb-2">
                            Strengths
                          </h4>
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                            <ul className="space-y-1">
                              {subject.strengths.map((strength, idx) => (
                                <li key={idx} className="text-[10px] xs:text-xs sm:text-sm text-green-700 dark:text-green-400 flex items-start gap-2">
                                  <span className="text-green-500 dark:text-green-400">✓</span>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Areas for Improvement */}
                        <div>
                          <h4 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] dark:text-white mb-2">
                            Areas for Improvement
                          </h4>
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
                            <ul className="space-y-1">
                              {subject.improvements.map((improvement, idx) => (
                                <li key={idx} className="text-[10px] xs:text-xs sm:text-sm text-yellow-700 dark:text-yellow-400 flex items-start gap-2">
                                  <span className="text-yellow-500 dark:text-yellow-400">→</span>
                                  {improvement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Teacher Comment */}
                        <div>
                          <h4 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] dark:text-white mb-2 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-[#ff9900] dark:text-orange-500" />
                            Teacher's Comment
                          </h4>
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                            <p className="text-[10px] xs:text-xs sm:text-sm text-blue-700 dark:text-blue-400 italic">
                              "{subject.teacherComment}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* TEACHER VIEW */}
      {userRole === 'teacher' && (
        <>
          {/* Class Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#ff9900] dark:text-orange-500" />
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Students</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0e2038] dark:text-white">120</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400" />
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400">Class Average</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">3.6</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400">A Grade Students</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">45</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400">Reports Pending</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">8</p>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-[#ff9900] dark:text-orange-500" />
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm md:text-base bg-white dark:bg-gray-700 text-[#0e2038] dark:text-white">
                  <option>All Students</option>
                  <option>Grade A</option>
                  <option>Grade B</option>
                  <option>Below Average</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm md:text-base bg-white dark:bg-gray-700 text-[#0e2038] dark:text-white">
                  <option>Spring 2026</option>
                  <option>Fall 2025</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-xs sm:text-sm md:text-base">Export All</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#ff9900] dark:bg-orange-600 text-white rounded-lg hover:bg-[#e68a00] dark:hover:bg-orange-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span className="text-xs sm:text-sm md:text-base">Bulk Edit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="text-left py-3 px-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Student Name
                    </th>
                    <th className="text-center py-3 px-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Grade
                    </th>
                    <th className="text-center py-3 px-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                      GPA
                    </th>
                    <th className="text-center py-3 px-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Attendance
                    </th>
                    <th className="text-center py-3 px-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {studentsData.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#ff9900] dark:bg-orange-600 flex items-center justify-center text-white font-semibold text-xs">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-xs sm:text-sm md:text-base font-medium text-[#0e2038] dark:text-white">
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getGradeColor(student.grade)}`}>
                          {student.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-xs sm:text-sm md:text-base font-bold text-[#0e2038] dark:text-white">
                          {student.gpa}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
                          {student.attendance}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(student.status)}`} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="text-[#ff9900] dark:text-orange-500 hover:text-[#e68a00] dark:hover:text-orange-600 text-xs sm:text-sm font-medium"
                          >
                            View Details
                          </button>
                          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 text-xs sm:text-sm font-medium">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Detail Modal */}
          {selectedStudent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038] dark:text-white">
                      {selectedStudent.name} - Progress Report
                    </h3>
                    <button
                      onClick={() => setSelectedStudent(null)}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Current Grade</p>
                      <p className="text-xl font-bold text-[#0e2038] dark:text-white">{selectedStudent.grade}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">GPA</p>
                      <p className="text-xl font-bold text-[#0e2038] dark:text-white">{selectedStudent.gpa}</p>
                    </div>
                  </div>
                  <textarea
                    placeholder="Add teacher's comment..."
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-xs sm:text-sm md:text-base mb-4 resize-none bg-white dark:bg-gray-700 text-[#0e2038] dark:text-white"
                    rows={4}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedStudent(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-[#ff9900] dark:bg-orange-600 text-white rounded-lg hover:bg-[#e68a00] dark:hover:bg-orange-700 transition-colors">
                      Save Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProgressReport;