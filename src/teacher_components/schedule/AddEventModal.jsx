import { useState } from 'react';
import { X } from 'lucide-react';

export function AddEventModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('class');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3b82f6');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    onAdd({
      title,
      type,
      subject: type === 'class' ? subject : undefined,
      startTime: startDateTime,
      endTime: endDateTime,
      location,
      description,
      color
    });
  };

  const colorOptions = [
    { value: '#3b82f6', label: 'Blue' },
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#f59e0b', label: 'Orange' },
    { value: '#10b981', label: 'Green' },
    { value: '#ef4444', label: 'Red' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10" style={{ borderColor: '#e5e7eb' }}>
          <h2 className="text-2xl" style={{ color: '#0e2038' }}>Add New Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#0e2038' }}>
                Event Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#e5e7eb', '--tw-ring-color': '#ff9900' }}
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Type and Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: '#0e2038' }}>
                  Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: '#e5e7eb', '--tw-ring-color': '#ff9900' }}
                  required
                >
                  <option value="class">Class</option>
                  <option value="meeting">Meeting</option>
                  <option value="event">Event</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#0e2038' }}>
                  Color *
                </label>
                <div className="flex gap-2">
                  {colorOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setColor(option.value)}
                      className="w-10 h-10 rounded-lg border-2 transition-all hover:scale-110"
                      style={{
                        backgroundColor: option.value,
                        borderColor: color === option.value ? '#0e2038' : 'transparent'
                      }}
                      title={option.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Subject (only for classes) */}
            {type === 'class' && (
              <div>
                <label className="block text-sm mb-2" style={{ color: '#0e2038' }}>
                  Subject *
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: '#e5e7eb', '--tw-ring-color': '#ff9900' }}
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
            )}

            {/* Date */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#0e2038' }}>
                Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#e5e7eb', '--tw-ring-color': '#ff9900' }}
                required
              />
            </div>

            {/* Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: '#0e2038' }}>
                  Start Time *
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: '#e5e7eb', '--tw-ring-color': '#ff9900' }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#0e2038' }}>
                  End Time *
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: '#e5e7eb', '--tw-ring-color': '#ff9900' }}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#0e2038' }}>
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#e5e7eb', '--tw-ring-color': '#ff9900' }}
                placeholder="Room number or location"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#0e2038' }}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                style={{ borderColor: '#e5e7eb', '--tw-ring-color': '#ff9900' }}
                rows={3}
                placeholder="Additional details about the event"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#e5e7eb', color: '#0e2038' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#ff9900' }}
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
