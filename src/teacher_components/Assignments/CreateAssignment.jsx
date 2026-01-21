import { useState } from 'react';
import { X } from 'lucide-react';

export function CreateAssignment({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalPoints, setTotalPoints] = useState('100');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      title,
      subject,
      dueDate: new Date(dueDate),
      totalPoints: parseInt(totalPoints),
      description
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 border-b flex items-center justify-between" style={{ borderColor: '#e5e7eb' }}>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl" style={{ color: '#0e2038' }}>Create New Assignment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 md:p-5 lg:p-6">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {/* Title */}
            <div>
              <label className="block text-[10px] xs:text-xs sm:text-sm mb-1 sm:mb-2" style={{ color: '#0e2038' }}>
                Assignment Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
                style={{ borderColor: '#e5e7eb' }}
                placeholder="Enter assignment title"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[10px] xs:text-xs sm:text-sm mb-1 sm:mb-2" style={{ color: '#0e2038' }}>
                Subject *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
                style={{ borderColor: '#e5e7eb' }}
                required
              >
                <option value="">Select subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Art">Art</option>
                <option value="Physical Education">Physical Education</option>
              </select>
            </div>

            {/* Due Date and Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div>
                <label className="block text-[10px] xs:text-xs sm:text-sm mb-1 sm:mb-2" style={{ color: '#0e2038' }}>
                  Due Date *
                </label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
                  style={{ borderColor: '#e5e7eb' }}
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] xs:text-xs sm:text-sm mb-1 sm:mb-2" style={{ color: '#0e2038' }}>
                  Total Points *
                </label>
                <input
                  type="number"
                  value={totalPoints}
                  onChange={(e) => setTotalPoints(e.target.value)}
                  className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
                  style={{ borderColor: '#e5e7eb' }}
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] xs:text-xs sm:text-sm mb-1 sm:mb-2" style={{ color: '#0e2038' }}>
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none text-[10px] xs:text-xs sm:text-sm"
                style={{ borderColor: '#e5e7eb' }}
                rows={6}
                placeholder="Enter assignment instructions and requirements"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-5 md:mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 border rounded-lg hover:bg-gray-50 transition-colors text-[10px] xs:text-xs sm:text-sm"
              style={{ borderColor: '#e5e7eb', color: '#0e2038' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-white hover:opacity-90 transition-opacity text-[10px] xs:text-xs sm:text-sm"
              style={{ backgroundColor: '#ff9900' }}
            >
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
