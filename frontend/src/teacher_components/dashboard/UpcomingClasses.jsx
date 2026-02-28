import { Card, CardContent, CardHeader, CardTitle } from "@/teacher_components/ui/card";
import { Badge } from "@/teacher_components/ui/badge";
import { Clock, MapPin, Users } from "lucide-react";

const upcomingClasses = [
  {
    id: 1,
    subject: "Advanced Mathematics",
    class: "Class 10-A",
    time: "09:00 - 10:30 AM",
    room: "Room 204",
    students: 32,
    status: "upcoming",
  },
  {
    id: 2,
    subject: "Algebra Fundamentals",
    class: "Class 9-B",
    time: "11:00 - 12:30 PM",
    room: "Room 108",
    students: 28,
    status: "upcoming",
  },
  {
    id: 3,
    subject: "Geometry",
    class: "Class 11-A",
    time: "02:00 - 03:30 PM",
    room: "Room 301",
    students: 25,
    status: "upcoming",
  },
];

export function UpcomingClasses() {
  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-4 p-3 sm:p-6">
        <CardTitle className="font-display text-sm sm:text-base md:text-lg">Today's Classes</CardTitle>
        <Badge variant="secondary" className="font-normal text-xs">
          3 classes
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-4 p-3 sm:p-6 pt-0">
        {upcomingClasses.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 md:p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-200 cursor-pointer group opacity-0 animate-fade-in"
            style={{ animationDelay: `${(index + 4) * 0.1}s` }}
          >
            {/* Time indicator */}
            <div className="hidden sm:flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-primary text-primary-foreground flex-shrink-0">
              <span className="text-xs font-medium">
                {item.time.split(" - ")[0].split(" ")[0]}
              </span>
              <span className="text-xs opacity-75">
                {item.time.split(" - ")[0].split(" ")[1]}
              </span>
            </div>

            {/* Class info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-xs sm:text-sm md:text-base text-foreground group-hover:text-primary transition-colors truncate">
                    {item.subject}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.class}</p>
                </div>
                <Badge
                  variant="outline"
                  className="hidden sm:flex shrink-0 border-accent text-accent text-xs"
                >
                  Upcoming
                </Badge>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="truncate">{item.time}</span>
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  {item.room}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  {item.students} students
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

