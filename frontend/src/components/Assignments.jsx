import React, { useState } from 'react';
import { ClipboardList, Upload, CheckCircle, Clock, AlertTriangle, FileText, Calendar } from 'lucide-react';

export function Assignments() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const assignments = [
    {
      id: 1,
      title: 'Chapter 5 Problem Set',
      subject: 'Mathematics',
      teacher: 'Mr. Anderson',
      dueDate: 'Feb 11, 2026',
      status: 'pending',
      description: 'Complete problems 1-25 from Chapter 5',
      totalMarks: 50,
      urgent: true,
    },
    {
      id: 2,
      title: 'Lab Report - Chemical Reactions',
      subject: 'Chemistry',
      teacher: 'Dr. Brown',
      dueDate: 'Feb 15, 2026',
      status: 'pending',
      description: 'Write a detailed lab report on the chemical reactions experiment',
      totalMarks: 100,
      urgent: false,
    },
    {
      id: 3,
      title: 'Essay on Shakespeare',
      subject: 'English Literature',
      teacher: 'Ms. Parker',
      dueDate: 'Feb 13, 2026',
      status: 'pending',
      description: 'Write a 1500-word essay analyzing themes in Hamlet',
      totalMarks: 100,
      urgent: false,
    },
    {
      id: 4,
      title: 'Physics Worksheet #12',
      subject: 'Physics',
      teacher: 'Dr. Williams',
      dueDate: 'Feb 8, 2026',
      status: 'graded',
      description: 'Solve problems related to Newton\'s laws',
      totalMarks: 50,
      score: 45,
      feedback: 'Excellent work! Minor calculation error in question 8.',
      submittedDate: 'Feb 7, 2026',
    },
    {
      id: 5,
      title: 'History Research Project',
      subject: 'History',
      teacher: 'Mr. Davis',
      dueDate: 'Feb 3, 2026',
      status: 'submitted',
      description: 'Research and present on World War II',
      totalMarks: 100,
      submittedDate: 'Feb 2, 2026',
    },
  ];

  const filteredAssignments = assignments.filter(
    (a) => filterStatus === 'all' || a.status === filterStatus
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-[10px] xs:text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'submitted':
        return (
          <span className="flex items-center gap-1 text-[10px] xs:text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
            <Upload className="w-3 h-3" />
            Submitted
          </span>
        );
      case 'graded':
        return (
          <span className="flex items-center gap-1 text-[10px] xs:text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Graded
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
          Assignments & Homework
        </h1>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600 mt-1">
          Track and submit your assignments
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200 px-4">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'all', label: 'All Assignments' },
              { id: 'pending', label: 'Pending' },
              { id: 'submitted', label: 'Submitted' },
              { id: 'graded', label: 'Graded' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterStatus(filter.id)}
                className={`px-4 py-3 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap border-b-2 transition-colors ${
                  filterStatus === filter.id
                    ? 'border-[#ff9900] text-[#ff9900]'
                    : 'border-transparent text-gray-600 hover:text-[#0e2038]'
                }`}
              >
                {filter.label}
                {filter.id !== 'all' && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-[9px] xs:text-xs">
                    {assignments.filter((a) => a.status === filter.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-[#ff9900] transition-colors"
          >
            <div className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038]">
                          {assignment.title}
                        </h3>
                        {assignment.urgent && (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">
                        {assignment.subject} • {assignment.teacher}
                      </p>
                    </div>
                    {getStatusBadge(assignment.status)}
                  </div>

                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-700 mb-3">
                    {assignment.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[9px] xs:text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: {assignment.dueDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Total Marks: {assignment.totalMarks}
                    </div>
                    {assignment.score !== undefined && (
                      <div className="flex items-center gap-1 font-semibold text-green-600">
                        Score: {assignment.score}/{assignment.totalMarks}
                      </div>
                    )}
                  </div>

                  {assignment.feedback && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-green-800 mb-1">
                        Teacher Feedback:
                      </p>
                      <p className="text-[9px] xs:text-xs sm:text-sm text-green-700">
                        {assignment.feedback}
                      </p>
                    </div>
                  )}

                  {assignment.submittedDate && (
                    <p className="text-[9px] xs:text-xs sm:text-sm text-gray-500 mt-2">
                      Submitted on {assignment.submittedDate}
                    </p>
                  )}
                </div>

                {assignment.status === 'pending' && (
                  <button
                    onClick={() => {
                      setSelectedAssignment(assignment);
                      setShowUploadModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#ff9900] text-white rounded-lg hover:bg-[#e68a00] transition-colors whitespace-nowrap"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="text-xs sm:text-sm md:text-base">Upload Work</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038] mb-4">
              Submit Assignment
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4">
              {selectedAssignment.title}
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 hover:border-[#ff9900] transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-[9px] xs:text-xs sm:text-sm text-gray-500">
                PDF, DOC, DOCX (Max 10MB)
              </p>
            </div>

            <textarea
              placeholder="Add a note for your teacher (optional)"
              className="w-full border border-gray-300 rounded-lg p-3 text-xs sm:text-sm md:text-base mb-4 resize-none"
              rows={3}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                }}
                className="flex-1 px-4 py-2 bg-[#ff9900] text-white rounded-lg hover:bg-[#e68a00] transition-colors text-xs sm:text-sm md:text-base"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
