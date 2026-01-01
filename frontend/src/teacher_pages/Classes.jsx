import { DashboardLayout } from "@/teacher_components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/teacher_components/ui/card";
import { Badge } from "@/teacher_components/ui/badge";
import { Button } from "@/teacher_components/ui/button";
import { Users, Clock, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const classes = [
  {
    id: 1,
    name: "Advanced Mathematics",
    grade: "Class 10-A",
    students: 32,
    schedule: "Mon, Wed, Fri - 9:00 AM",
    room: "Room 204",
    progress: 68,
    color: "from-primary to-primary/70",
  },
  {
    id: 2,
    name: "Algebra Fundamentals",
    grade: "Class 9-B",
    students: 28,
    schedule: "Tue, Thu - 11:00 AM",
    room: "Room 108",
    progress: 45,
    color: "from-info to-info/70",
  },
  {
    id: 3,
    name: "Geometry",
    grade: "Class 11-A",
    students: 25,
    schedule: "Mon, Wed - 2:00 PM",
    room: "Room 301",
    progress: 82,
    color: "from-success to-success/70",
  },
  {
    id: 4,
    name: "Calculus I",
    grade: "Class 12-A",
    students: 22,
    schedule: "Tue, Thu, Fri - 10:00 AM",
    room: "Room 405",
    progress: 35,
    color: "from-accent to-accent/70",
  },
  {
    id: 5,
    name: "Statistics",
    grade: "Class 11-B",
    students: 30,
    schedule: "Mon, Fri - 3:00 PM",
    room: "Room 202",
    progress: 56,
    color: "from-destructive/80 to-destructive/50",
  },
  {
    id: 6,
    name: "Pre-Algebra",
    grade: "Class 8-A",
    students: 35,
    schedule: "Wed, Thu - 9:00 AM",
    room: "Room 105",
    progress: 72,
    color: "from-primary/80 to-info/70",
  },
];

export default function Classes() {
  return (
    <DashboardLayout pageTitle="My Classes">
      {/* Summary cards */}
      <div className="grid grid-cols-1 min-[10px]:grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
        <Card className="border-border/50 opacity-0 animate-fade-in">
          <CardContent className="p-3 sm:p-4 md:p-6 flex items-center gap-2 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-display font-bold">6</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Classes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 opacity-0 animate-fade-in stagger-1">
          <CardContent className="p-3 sm:p-4 md:p-6 flex items-center gap-2 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-display font-bold">172</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Students</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 opacity-0 animate-fade-in stagger-2">
          <CardContent className="p-3 sm:p-4 md:p-6 flex items-center gap-2 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-display font-bold">18</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Hours/Week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes grid */}
      <div className="grid grid-cols-1 min-[10px]:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {classes.map((classItem, index) => (
          <Card
            key={classItem.id}
            className="border-border/50 hover-lift group opacity-0 animate-fade-in overflow-hidden"
            style={{ animationDelay: `${(index + 3) * 0.1}s` }}
          >
            {/* Gradient header */}
            <div
              className={`h-1 sm:h-2 bg-gradient-to-r ${classItem.color}`}
            />
            <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-6">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <CardTitle className="font-display text-sm sm:text-base md:text-lg group-hover:text-primary transition-colors truncate">
                    {classItem.name}
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {classItem.grade}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0">{classItem.room}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-4 p-3 sm:p-6 pt-0">
              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  {classItem.students} students
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  {classItem.schedule.split(" - ")[1]}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm mb-1 sm:mb-2">
                  <span className="text-muted-foreground">
                    Syllabus Progress
                  </span>
                  <span className="font-medium">{classItem.progress}%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${classItem.color} transition-all duration-500`}
                    style={{ width: `${classItem.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}

