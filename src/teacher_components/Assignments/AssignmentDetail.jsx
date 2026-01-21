import { ArrowLeft, Calendar, Award, Clock, Download } from 'lucide-react';

export function AssignmentDetail({ assignment, submissions, onBack }) {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatSubmissionDate = (date) => {
    if (!date) return 'Not submitted';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const colors = {
      submitted: '#3b82f6',
      graded: '#22c55e',
      missing: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const gradedCount = submissions.filter(s => s.status === 'graded').length;
  const averageGrade = submissions.filter(s => s.grade !== null).reduce((acc, s) => acc + (s.grade || 0), 0) / gradedCount || 0;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-2 sm:p-3 md:p-4 lg:p-6 border-b" style={{ backgroundColor: '#0e2038', borderColor: '#1a3a5c' }}>
        <button
          onClick={onBack}
          className="lg:hidden text-white mb-2 sm:mb-3 md:mb-4 flex items-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          <span>Back to list</span>
        </button>
        
        <h2 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2">{assignment.title}</h2>
        <p className="text-white/70 text-[10px] xs:text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4">{assignment.subject}</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="bg-white/10 rounded-lg p-2 sm:p-3">
            <div className="flex items-center gap-1 sm:gap-2 text-white/70 text-[9px] xs:text-[10px] sm:text-xs mb-0.5 sm:mb-1">
              <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              <span>Due Date</span>
            </div>
            <p className="text-white text-[10px] xs:text-xs sm:text-sm">{formatDate(assignment.dueDate)}</p>
          </div>

          <div className="bg-white/10 rounded-lg p-2 sm:p-3">
            <div className="flex items-center gap-1 sm:gap-2 text-white/70 text-[9px] xs:text-[10px] sm:text-xs mb-0.5 sm:mb-1">
              <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              <span>Points</span>
            </div>
            <p className="text-white text-[10px] xs:text-xs sm:text-sm">{assignment.totalPoints}</p>
          </div>

          <div className="bg-white/10 rounded-lg p-2 sm:p-3">
            <div className="flex items-center gap-1 sm:gap-2 text-white/70 text-[9px] xs:text-[10px] sm:text-xs mb-0.5 sm:mb-1">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              <span>Submissions</span>
            </div>
            <p className="text-white text-[10px] xs:text-xs sm:text-sm">{assignment.submissions}/{assignment.totalStudents}</p>
          </div>

          <div className="bg-white/10 rounded-lg p-2 sm:p-3">
            <div className="flex items-center gap-1 sm:gap-2 text-white/70 text-[9px] xs:text-[10px] sm:text-xs mb-0.5 sm:mb-1">
              <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              <span>Avg Grade</span>
            </div>
            <p className="text-white text-[10px] xs:text-xs sm:text-sm">{gradedCount > 0 ? averageGrade.toFixed(1) : '--'}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-6">
        {/* Description */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h3 className="text-sm sm:text-base md:text-lg mb-1 sm:mb-2" style={{ color: '#0e2038' }}>Description</h3>
          <p className="text-gray-600 text-[10px] xs:text-xs sm:text-sm">{assignment.description}</p>
        </div>

        {/* Submissions */}
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
            <h3 className="text-sm sm:text-base md:text-lg" style={{ color: '#0e2038' }}>Student Submissions</h3>
            <button 
              className="text-[10px] xs:text-xs sm:text-sm px-2 sm:px-3 py-1 rounded hover:opacity-80 transition-opacity flex items-center gap-1 sm:gap-2"
              style={{ color: '#ff9900' }}
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              Export
            </button>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            {submissions.map(submission => (
              <div
                key={submission.id}
                className="border rounded-lg p-2 sm:p-3 md:p-4 hover:shadow-md transition-shadow"
                style={{ borderColor: '#e5e7eb' }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 text-[10px] xs:text-xs sm:text-sm"
                    style={{ backgroundColor: '#0e2038' }}
                  >
                    {submission.studentAvatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 text-[10px] xs:text-xs sm:text-sm">{submission.studentName}</h4>
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500">{formatSubmissionDate(submission.submittedAt)}</p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {submission.grade !== null && (
                      <div className="text-right">
                        <div className="text-sm sm:text-base md:text-lg" style={{ color: '#0e2038' }}>
                          {submission.grade}/{assignment.totalPoints}
                        </div>
                        <div className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500">
                          {((submission.grade / assignment.totalPoints) * 100).toFixed(0)}%
                        </div>
                      </div>
                    )}

                    <div
                      className="px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[8px] xs:text-[9px] sm:text-xs text-white"
                      style={{ backgroundColor: getStatusBadge(submission.status) }}
                    >
                      {submission.status}
                    </div>

                    {submission.status === 'submitted' && (
                      <button
                        className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded text-white hover:opacity-90 transition-opacity text-[10px] xs:text-xs sm:text-sm"
                        style={{ backgroundColor: '#ff9900' }}
                      >
                        Grade
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}