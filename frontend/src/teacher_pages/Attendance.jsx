import { useState } from "react";
import { format } from "date-fns";
import { DashboardLayout } from "@/teacher_components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/teacher_components/ui/card";
import { Button } from "@/teacher_components/ui/button";
import { Badge } from "@/teacher_components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/teacher_components/ui/select";
import { Calendar as CalendarIcon, Check, X, Clock } from "lucide-react";
import { Calendar } from "@/teacher_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/teacher_components/ui/popover";

const studentsAttendance = [
  { id: 1, name: "Sarah Johnson", status: "present" },
  { id: 2, name: "Michael Chen", status: "present" },
  { id: 3, name: "Emily Davis", status: "absent" },
  { id: 4, name: "James Wilson", status: "present" },
  { id: 5, name: "Olivia Brown", status: "late" },
  { id: 6, name: "William Taylor", status: "present" },
  { id: 7, name: "Sophia Martinez", status: "present" },
  { id: 8, name: "Benjamin Lee", status: "absent" },
];

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState(
    studentsAttendance.reduce(
      (acc, student) => ({
        ...acc,
        [student.id]: student.status,
      }),
      {}
    )
  );

  const updateAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const stats = {
    present: Object.values(attendance).filter((s) => s === "present").length,
    absent: Object.values(attendance).filter((s) => s === "absent").length,
    late: Object.values(attendance).filter((s) => s === "late").length,
  };

  return (
    <DashboardLayout pageTitle="Attendance">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap w-full sm:w-auto">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[calc(50%-0.25rem)] min-w-[80px] sm:w-32 md:w-40 h-7 sm:h-8 md:h-10 text-[10px] xs:text-xs sm:text-sm">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10-A">Class 10-A</SelectItem>
              <SelectItem value="9-B">Class 9-B</SelectItem>
              <SelectItem value="11-A">Class 11-A</SelectItem>
              <SelectItem value="12-A">Class 12-A</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[calc(50%-0.25rem)] min-w-[80px] sm:w-auto h-7 sm:h-8 md:h-10 text-[10px] xs:text-xs sm:text-sm justify-start text-left font-normal px-2 sm:px-3"
              >
                <CalendarIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="truncate">
                  {format(selectedDate, "PPP")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                className="min-w-[200px] max-w-[280px]"
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button className="bg-primary hover:bg-primary/90 h-7 sm:h-8 md:h-10 text-[10px] xs:text-xs sm:text-sm px-2 sm:px-3 md:px-4 w-full sm:w-auto">
          Save Attendance
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 mb-4 sm:mb-6">
        <Card className="border-border/50 opacity-0 animate-fade-in">
          <CardContent className="p-1.5 sm:p-2 md:p-3 lg:p-4 flex items-center gap-1 sm:gap-2 md:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-display font-bold leading-tight">{stats.present}</p>
              <p className="text-[9px] xs:text-xs sm:text-sm text-muted-foreground leading-tight">Present</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 opacity-0 animate-fade-in stagger-1">
          <CardContent className="p-1.5 sm:p-2 md:p-3 lg:p-4 flex items-center gap-1 sm:gap-2 md:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-destructive" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-display font-bold leading-tight">{stats.absent}</p>
              <p className="text-[9px] xs:text-xs sm:text-sm text-muted-foreground leading-tight">Absent</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 opacity-0 animate-fade-in stagger-2">
          <CardContent className="p-1.5 sm:p-2 md:p-3 lg:p-4 flex items-center gap-1 sm:gap-2 md:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-warning" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-display font-bold leading-tight">{stats.late}</p>
              <p className="text-[9px] xs:text-xs sm:text-sm text-muted-foreground leading-tight">Late</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance list */}
      <Card className="border-border/50">
        <CardHeader className="p-2 sm:p-3 md:p-6">
          <CardTitle className="font-display text-xs sm:text-sm md:text-base lg:text-lg">
            Class {selectedClass} - Attendance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-3 md:p-6 pt-0">
          <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
            {studentsAttendance.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-1.5 sm:p-2 md:p-3 lg:p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors opacity-0 animate-fade-in gap-1 sm:gap-2"
                style={{ animationDelay: `${(index + 3) * 0.05}s` }}
              >
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-[9px] xs:text-xs sm:text-sm flex-shrink-0">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[10px] xs:text-xs sm:text-sm truncate">{student.name}</p>
                    <Badge
                      variant="secondary"
                      className={`mt-0.5 sm:mt-1 text-[8px] xs:text-[9px] sm:text-xs px-1 sm:px-1.5 py-0 ${
                        attendance[student.id] === "present"
                          ? "bg-success/10 text-success"
                          : attendance[student.id] === "absent"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {attendance[student.id]}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant={
                      attendance[student.id] === "present"
                        ? "default"
                        : "outline"
                    }
                    className={`h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 p-0 ${
                      attendance[student.id] === "present"
                        ? "bg-success hover:bg-success/90 text-success-foreground"
                        : ""
                    }`}
                    onClick={() => updateAttendance(student.id, "present")}
                  >
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={
                      attendance[student.id] === "absent"
                        ? "default"
                        : "outline"
                    }
                    className={`h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 p-0 ${
                      attendance[student.id] === "absent"
                        ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        : ""
                    }`}
                    onClick={() => updateAttendance(student.id, "absent")}
                  >
                    <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={
                      attendance[student.id] === "late" ? "default" : "outline"
                    }
                    className={`h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 p-0 ${
                      attendance[student.id] === "late"
                        ? "bg-warning hover:bg-warning/90 text-warning-foreground"
                        : ""
                    }`}
                    onClick={() => updateAttendance(student.id, "late")}
                  >
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

