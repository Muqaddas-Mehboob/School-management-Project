import { Clock, MapPin, BookOpen } from 'lucide-react';

export function DaySchedule({ date, events }) {
  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.startTime);
    return eventDate.toDateString() === date.toDateString();
  }).sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'class':
        return <BookOpen className="w-5 h-5" />;
      case 'meeting':
        return <Clock className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <div className="h-full overflow-auto bg-white">
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        {/* Day Header */}
        <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#0e2038' }}>
          <h2 className="text-2xl text-white mb-2">
            {date.toLocaleDateString('en-US', { weekday: 'long' })}
          </h2>
          <p className="text-white/70">
            {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div className="mt-4 text-white/90">
            <span className="text-3xl">{dayEvents.length}</span> event{dayEvents.length !== 1 ? 's' : ''} scheduled
          </div>
        </div>

        {/* Events List */}
        {dayEvents.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No events scheduled for this day</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dayEvents.map((event, index) => {
              const isFirstEvent = index === 0;
              const previousEvent = index > 0 ? dayEvents[index - 1] : null;
              const gap = previousEvent 
                ? (event.startTime.getTime() - previousEvent.endTime.getTime()) / (1000 * 60)
                : 0;

              return (
                <div key={event.id}>
                  {!isFirstEvent && gap > 30 && (
                    <div className="flex items-center gap-4 py-3">
                      <div className="flex-shrink-0 w-24 text-sm text-gray-400 text-right">
                        {Math.floor(gap)} min
                      </div>
                      <div className="flex-1 border-t border-dashed" style={{ borderColor: '#e5e7eb' }} />
                      <div className="flex-shrink-0 text-sm text-gray-400">Break</div>
                    </div>
                  )}
                  
                  <div
                    className="rounded-lg overflow-hidden border-l-4 hover:shadow-lg transition-shadow"
                    style={{ borderLeftColor: event.color }}
                  >
                    <div className="p-4 lg:p-6 bg-white border border-l-0 rounded-r-lg" style={{ borderColor: '#e5e7eb' }}>
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        {/* Time */}
                        <div className="flex-shrink-0 lg:w-32">
                          <div className="flex items-center gap-2 lg:flex-col lg:items-start">
                            <Clock className="w-4 h-4 lg:hidden" style={{ color: event.color }} />
                            <div className="text-sm" style={{ color: '#0e2038' }}>
                              {formatTime(event.startTime)}
                            </div>
                            <div className="hidden lg:block text-sm text-gray-400">to</div>
                            <div className="text-sm text-gray-500">
                              {formatTime(event.endTime)}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="text-lg lg:text-xl mb-1" style={{ color: '#0e2038' }}>
                                {event.title}
                              </h3>
                              {event.subject && (
                                <p className="text-sm" style={{ color: '#ff9900' }}>
                                  {event.subject}
                                </p>
                              )}
                            </div>
                            <div
                              className="px-3 py-1 rounded-full text-xs text-white flex items-center gap-1"
                              style={{ backgroundColor: event.color }}
                            >
                              {getTypeIcon(event.type)}
                              <span className="capitalize">{event.type}</span>
                            </div>
                          </div>

                          {event.description && (
                            <p className="text-gray-600 mb-3">{event.description}</p>
                          )}

                          {event.location && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}