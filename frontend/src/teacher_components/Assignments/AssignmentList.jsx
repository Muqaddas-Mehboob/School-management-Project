import { Calendar, Users, FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function AssignmentList({ assignments, selectedAssignment, onSelectAssignment }) {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY_COUNT = 3;

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#22c55e';
      case 'upcoming':
        return '#3b82f6';
      case 'past':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const displayedAssignments = showAll 
    ? assignments 
    : assignments.slice(0, INITIAL_DISPLAY_COUNT);

  const hasMore = assignments.length > INITIAL_DISPLAY_COUNT;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {assignments.length === 0 ? (
          <div className="p-6 sm:p-8 text-center text-gray-400">
            <FileText className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
            <p className="text-[10px] xs:text-xs sm:text-sm">No assignments found</p>
          </div>
        ) : (
          displayedAssignments.map(assignment => (
            <button
              key={assignment.id}
              onClick={() => onSelectAssignment(assignment)}
              className="w-full p-2 sm:p-3 md:p-4 border-b hover:bg-gray-50 transition-colors text-left"
              style={{
                borderColor: '#e5e7eb',
                backgroundColor: selectedAssignment?.id === assignment.id ? '#fff7ed' : undefined,
                borderLeft: selectedAssignment?.id === assignment.id ? '3px solid #ff9900' : '3px solid transparent'
              }}
            >
              <div className="flex items-start justify-between mb-1 sm:mb-2">
                <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base text-gray-900 pr-2 flex-1">
                  {assignment.title}
                </h3>
                <div 
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[8px] xs:text-[9px] sm:text-xs text-white flex-shrink-0"
                  style={{ backgroundColor: getStatusColor(assignment.status) }}
                >
                  {assignment.status}
                </div>
              </div>

              <p className="text-[9px] xs:text-[10px] sm:text-xs mb-2 sm:mb-3" style={{ color: '#ff9900' }}>
                {assignment.subject}
              </p>

              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-[9px] xs:text-[10px] sm:text-xs text-gray-600">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  <span>{formatDate(assignment.dueDate)}</span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  <span>{assignment.submissions}/{assignment.totalStudents}</span>
                </div>
              </div>

              <div className="mt-1.5 sm:mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1 sm:h-1.5 md:h-2">
                  <div
                    className="h-1 sm:h-1.5 md:h-2 rounded-full transition-all"
                    style={{
                      width: `${(assignment.submissions / assignment.totalStudents) * 100}%`,
                      backgroundColor: '#ff9900'
                    }}
                  />
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Read More Button */}
      {hasMore && (
        <div className="border-t p-3 sm:p-4 bg-white" style={{ borderColor: '#e5e7eb' }}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-2 sm:py-2.5 rounded text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-[10px] xs:text-xs sm:text-sm"
            style={{ border: '1px solid #e5e7eb' }}
          >
            <span>{showAll ? 'Show Less' : `Read More (${assignments.length - INITIAL_DISPLAY_COUNT} more)`}</span>
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
}