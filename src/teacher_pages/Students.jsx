import { useState } from "react";
import { DashboardLayout } from "@/teacher_components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/teacher_components/ui/card";
import { Input } from "@/teacher_components/ui/input";
import { Button } from "@/teacher_components/ui/button";
import { Badge } from "@/teacher_components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/teacher_components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/teacher_components/ui/table";
import { Search, Filter, Mail, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/teacher_components/ui/dropdown-menu";

const students = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@school.edu",
    class: "Class 10-A",
    grade: "A",
    attendance: 98,
    status: "active",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@school.edu",
    class: "Class 10-A",
    grade: "B+",
    attendance: 94,
    status: "active",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "e.davis@school.edu",
    class: "Class 9-B",
    grade: "A-",
    attendance: 96,
    status: "active",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "j.wilson@school.edu",
    class: "Class 11-A",
    grade: "B",
    attendance: 88,
    status: "warning",
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "o.brown@school.edu",
    class: "Class 10-A",
    grade: "A+",
    attendance: 100,
    status: "active",
  },
  {
    id: 6,
    name: "William Taylor",
    email: "w.taylor@school.edu",
    class: "Class 12-A",
    grade: "C+",
    attendance: 82,
    status: "warning",
  },
  {
    id: 7,
    name: "Sophia Martinez",
    email: "s.martinez@school.edu",
    class: "Class 9-B",
    grade: "B+",
    attendance: 91,
    status: "active",
  },
  {
    id: 8,
    name: "Benjamin Lee",
    email: "b.lee@school.edu",
    class: "Class 11-B",
    grade: "A",
    attendance: 95,
    status: "active",
  },
];

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [studentList, setStudentList] = useState(students);

  const filteredStudents = studentList.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesClass =
      classFilter === "all" || student.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const updateStudentStatus = (studentId, newStatus) => {
    setStudentList((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status: newStatus } : student
      )
    );
  };

  return (
    <DashboardLayout pageTitle="Students">
      <Card className="border-border/50">
        <CardHeader className="pb-2 sm:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <CardTitle className="font-display text-base sm:text-lg">
              Student Roster
            </CardTitle>
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              <div className="relative flex-1 sm:flex-none min-w-[120px]">
                <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-7 sm:pl-9 w-full sm:w-48 md:w-64 text-xs sm:text-sm h-8 sm:h-10"
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-24 sm:w-32 h-8 sm:h-10 text-xs sm:text-sm">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Class 10-A">Class 10-A</SelectItem>
                  <SelectItem value="Class 9-B">Class 9-B</SelectItem>
                  <SelectItem value="Class 11-A">Class 11-A</SelectItem>
                  <SelectItem value="Class 12-A">Class 12-A</SelectItem>
                  <SelectItem value="Class 11-B">Class 11-B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-6">
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm min-w-[150px]">Student</TableHead>
                  <TableHead className="hidden sm:table-cell text-xs sm:text-sm">Class</TableHead>
                  <TableHead className="text-xs sm:text-sm">Grade</TableHead>
                  <TableHead className="hidden md:table-cell text-xs sm:text-sm">
                    Attendance
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-xs sm:text-sm">Status</TableHead>
                  <TableHead className="w-8 sm:w-12 text-xs sm:text-sm"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow
                    key={student.id}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell className="p-2 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-xs sm:text-sm flex-shrink-0">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-xs sm:text-sm truncate">{student.name}</p>
                          <p className="text-xs text-muted-foreground hidden sm:block truncate">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell p-2 sm:p-4">
                      <Badge variant="secondary" className="text-xs"> {student.class}</Badge>
                    </TableCell>
                    <TableCell className="p-2 sm:p-4">
                      <span className="font-semibold text-xs sm:text-sm">{student.grade}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell p-2 sm:p-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className={`w-12 sm:w-16 h-1.5 sm:h-2 rounded-full overflow-hidden ${
                          student.status === "active"
                            ? "bg-success/20"
                            : student.status === "warning"
                            ? "bg-warning/20"
                            : "bg-destructive/20"
                        }`}>
                          <div
                            className={`h-full rounded-full ${
                              student.status === "active"
                                ? "bg-success"
                                : student.status === "warning"
                                ? "bg-warning"
                                : "bg-destructive"
                            }`}
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {student.attendance}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell p-2 sm:p-4">
                      <Select
                        value={student.status}
                        onValueChange={(newStatus) =>
                          updateStudentStatus(student.id, newStatus)
                        }
                      >
                        <SelectTrigger className={`w-32 h-7 sm:h-9 text-xs sm:text-sm font-medium ${
                          student.status === "active"
                            ? "bg-success/10 text-success border-success/30"
                            : student.status === "warning"
                            ? "bg-warning/10 text-warning border-warning/30"
                            : "bg-destructive/10 text-destructive border-destructive/30"
                        }`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-success"></div>
                              Active
                            </div>
                          </SelectItem>
                          <SelectItem value="warning">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-warning"></div>
                              Weak
                            </div>
                          </SelectItem>
                          <SelectItem value="risk">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-destructive"></div>
                              At Risk
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="p-2 sm:p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-10 sm:w-10">
                            <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-xs sm:text-sm">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Grades</DropdownMenuItem>
                          <DropdownMenuItem>Attendance History</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

