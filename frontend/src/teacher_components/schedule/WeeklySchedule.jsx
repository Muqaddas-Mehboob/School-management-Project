export function WeeklySchedule({ weekStart, events, onDayClick }) {
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8);
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const getDateForDay = (dayIndex) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + dayIndex);
    return date;
  };

  const getEventsForDay = (dayIndex) => {
    const dayDate = getDateForDay(dayIndex);
    return events
      .filter((event) => {
        const eventDate = new Date(event.startTime);
        return eventDate.toDateString() === dayDate.toDateString();
      })
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  };

  const getEventPosition = (event) => {
    const startHour =
      event.startTime.getHours() + event.startTime.getMinutes() / 60;
    const endHour =
      event.endTime.getHours() + event.endTime.getMinutes() / 60;
    const top = (startHour - 8) * 80;
    const height = (endHour - startHour) * 80;

    return { top, height };
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background border-b border-border">
          <div className="flex">
            <div className="w-20 flex-shrink-0 border-r border-border" />

            {weekDays.map((day, index) => {
              const date = getDateForDay(index);
              const isToday =
                date.toDateString() === new Date().toDateString();

              return (
                <button
                  key={day}
                  onClick={() => onDayClick(date)}
                  className="
                    flex-1 p-4 border-r border-border
                    hover:bg-muted
                    transition-colors
                  "
                >
                  <div className="text-sm text-muted-foreground">{day}</div>

                  <div
                    className={`
                      text-lg
                      ${
                        isToday
                          ? "w-8 h-8 rounded-full flex items-center justify-center mx-auto bg-primary text-primary-foreground"
                          : "text-foreground"
                      }
                    `}
                  >
                    {date.getDate()}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Grid */}
        <div className="flex">
          {/* Time Labels */}
          <div className="w-20 flex-shrink-0">
            {timeSlots.map((hour) => (
              <div
                key={hour}
                className="
                  h-20 border-b border-r border-border
                  text-xs text-muted-foreground
                  pr-2 pt-1 text-right
                "
              >
                {hour === 12
                  ? "12 PM"
                  : hour > 12
                  ? `${hour - 12} PM`
                  : `${hour} AM`}
              </div>
            ))}
          </div>

          {/* Days */}
          {weekDays.map((day, dayIndex) => (
            <div
              key={day}
              className="flex-1 relative border-r border-border"
            >
              {/* Grid Lines */}
              {timeSlots.map((hour) => (
                <div
                  key={hour}
                  className="h-20 border-b border-border"
                />
              ))}

              {/* Events */}
              <div className="absolute inset-0 pointer-events-none">
                {getEventsForDay(dayIndex).map((event) => {
                  const { top, height } = getEventPosition(event);

                  return (
                    <div
                      key={event.id}
                      className="
                        absolute left-1 right-1
                        rounded-lg p-2 overflow-hidden
                        pointer-events-auto cursor-pointer
                        hover:opacity-90 transition-opacity
                       text-primary-foreground
                      "
                      style={{
                        background:`${event.color}`,
                        top: `${top}px`,
                        height: `${height}px`,
                        minHeight: "40px",
                      }}
                    >
                      <div className="text-sm">
                        <div className="truncate font-medium">
                          {event.title}
                        </div>

                        <div className="text-xs opacity-90">
                          {formatTime(event.startTime)} -{" "}
                          {formatTime(event.endTime)}
                        </div>

                        {event.location && (
                          <div className="text-xs opacity-80 truncate">
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
