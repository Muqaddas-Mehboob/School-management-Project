import { DashboardLayout } from "@/teacher_components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/teacher_components/ui/card";
import { Badge } from "@/teacher_components/ui/badge";
import { Button } from "@/teacher_components/ui/button";
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
import { Input } from "@/teacher_components/ui/input";
import { useState } from "react";

const gradesData = [
  {
    id: 1,
    name: "Sarah Johnson",
    quiz1: 95,
    quiz2: 88,
    midterm: 92,
    project: 98,
    final: null,
  },
  {
    id: 2,
    name: "Michael Chen",
    quiz1: 82,
    quiz2: 85,
    midterm: 78,
    project: 88,
    final: null,
  },
  {
    id: 3,
    name: "Emily Davis",
    quiz1: 90,
    quiz2: 92,
    midterm: 88,
    project: 95,
    final: null,
  },
  {
    id: 4,
    name: "James Wilson",
    quiz1: 75,
    quiz2: 78,
    midterm: 72,
    project: 80,
    final: null,
  },
  {
    id: 5,
    name: "Olivia Brown",
    quiz1: 98,
    quiz2: 100,
    midterm: 96,
    project: 100,
    final: null,
  },
  {
    id: 6,
    name: "William Taylor",
    quiz1: 68,
    quiz2: 72,
    midterm: 65,
    project: 75,
    final: null,
  },
];

const getGradeLetter = (score) => {
  if (score >= 93) return "A";
  if (score >= 90) return "A-";
  if (score >= 87) return "B+";
  if (score >= 83) return "B";
  if (score >= 80) return "B-";
  if (score >= 77) return "C+";
  if (score >= 73) return "C";
  if (score >= 70) return "C-";
  if (score >= 67) return "D+";
  if (score >= 60) return "D";
  return "F";
};

const getGradeColor = (score) => {
  if (score >= 90) return "text-success";
  if (score >= 80) return "text-info";
  if (score >= 70) return "text-warning";
  return "text-destructive";
};

export default function Grades() {
  const [selectedClass, setSelectedClass] = useState("10-A");

  const calculateAverage = (student) => {
    const scores = [
      student.quiz1,
      student.quiz2,
      student.midterm,
      student.project,
    ].filter((s) => s !== null);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  return (
    <DashboardLayout pageTitle="Grades">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-32 sm:w-40 h-8 sm:h-10 text-xs sm:text-sm">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10-A">Class 10-A</SelectItem>
            <SelectItem value="9-B">Class 9-B</SelectItem>
            <SelectItem value="11-A">Class 11-A</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-1 sm:gap-2">
          <Button variant="outline" className="h-8 sm:h-10 text-xs sm:text-sm px-2 sm:px-4">Export Grades</Button>
          <Button className="bg-primary hover:bg-primary/90 h-8 sm:h-10 text-xs sm:text-sm px-2 sm:px-4">Save Changes</Button>
        </div>
      </div>

      {/* Gradebook */}
      <Card className="border-border/50">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <CardTitle className="font-display text-sm sm:text-base md:text-lg">
              Gradebook - Class {selectedClass}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">Advanced Mathematics</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-6">
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px] sm:min-w-[180px] text-xs sm:text-sm">Student</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Quiz 1</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Quiz 2</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Midterm</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Project</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Final</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Average</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gradesData.map((student, index) => {
                  const avg = calculateAverage(student);
                  return (
                    <TableRow
                      key={student.id}
                      className="opacity-0 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell className="p-2 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-xs flex-shrink-0">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="font-medium text-xs sm:text-sm truncate">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-2 sm:p-4">
                        <Input
                          type="number"
                          defaultValue={student.quiz1}
                          className="w-12 sm:w-16 text-center mx-auto text-xs sm:text-sm h-7 sm:h-10"
                        />
                      </TableCell>
                      <TableCell className="text-center p-2 sm:p-4">
                        <Input
                          type="number"
                          defaultValue={student.quiz2}
                          className="w-12 sm:w-16 text-center mx-auto text-xs sm:text-sm h-7 sm:h-10"
                        />
                      </TableCell>
                      <TableCell className="text-center p-2 sm:p-4">
                        <Input
                          type="number"
                          defaultValue={student.midterm}
                          className="w-12 sm:w-16 text-center mx-auto text-xs sm:text-sm h-7 sm:h-10"
                        />
                      </TableCell>
                      <TableCell className="text-center p-2 sm:p-4">
                        <Input
                          type="number"
                          defaultValue={student.project}
                          className="w-12 sm:w-16 text-center mx-auto text-xs sm:text-sm h-7 sm:h-10"
                        />
                      </TableCell>
                      <TableCell className="text-center p-2 sm:p-4">
                        <Input
                          type="number"
                          placeholder="—"
                          className="w-12 sm:w-16 text-center mx-auto text-xs sm:text-sm h-7 sm:h-10"
                        />
                      </TableCell>
                      <TableCell className="text-center p-2 sm:p-4">
                        <span
                          className={`font-semibold text-xs sm:text-sm ${getGradeColor(avg)}`}
                        >
                          {avg}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center p-2 sm:p-4">
                        <Badge
                          variant="secondary"
                          className={`${getGradeColor(avg)} font-bold text-xs`}
                        >
                          {getGradeLetter(avg)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Grade Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
        <Card className="border-border/50">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="font-display text-sm sm:text-base md:text-lg">
              Grade Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {[
                { grade: "A", count: 2, color: "bg-success" },
                { grade: "B", count: 2, color: "bg-info" },
                { grade: "C", count: 1, color: "bg-warning" },
                { grade: "D", count: 1, color: "bg-destructive/70" },
              ].map((item) => (
                <div key={item.grade} className="flex items-center gap-2 sm:gap-4">
                  <span className="w-6 sm:w-8 font-bold text-xs sm:text-sm">{item.grade}</span>
                  <div className="flex-1 h-3 sm:h-4 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{
                        width: `${(item.count / gradesData.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground w-6 sm:w-8">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="font-display text-sm sm:text-base md:text-lg">Class Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0">
            <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground text-xs sm:text-sm">Class Average</span>
              <span className="font-bold text-base sm:text-lg">84.5%</span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground text-xs sm:text-sm">Highest Score</span>
              <span className="font-bold text-base sm:text-lg text-success">98.5%</span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground text-xs sm:text-sm">Lowest Score</span>
              <span className="font-bold text-base sm:text-lg text-destructive">70.0%</span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground text-xs sm:text-sm">Passing Rate</span>
              <span className="font-bold text-base sm:text-lg">100%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

