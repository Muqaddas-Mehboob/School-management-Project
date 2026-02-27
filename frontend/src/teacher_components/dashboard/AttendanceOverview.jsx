import { Card, CardContent, CardHeader, CardTitle } from "@/teacher_components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", present: 145, absent: 11 },
  { day: "Tue", present: 150, absent: 6 },
  { day: "Wed", present: 142, absent: 14 },
  { day: "Thu", present: 148, absent: 8 },
  { day: "Fri", present: 147, absent: 9 },
];

export function AttendanceOverview() {
  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-col xs:flex-row items-start xs:items-center justify-between pb-1.5 xs:pb-2 sm:pb-4 p-2 xs:p-3 sm:p-6 gap-1.5 xs:gap-2">
        <CardTitle className="font-display text-xs xs:text-sm sm:text-base md:text-lg">
          Weekly Attendance
        </CardTitle>
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-4 text-[9px] xs:text-[10px] sm:text-xs md:text-sm flex-wrap">
          <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-2">
            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-3 sm:h-3 rounded-full bg-primary flex-shrink-0" />
            <span className="text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-2">
            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-3 sm:h-3 rounded-full bg-destructive/60 flex-shrink-0" />
            <span className="text-muted-foreground">Absent</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2 xs:p-3 sm:p-6 pt-0">
        <div className="h-32 xs:h-40 sm:h-48 md:h-56 lg:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 8 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 8 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: "10px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontSize: "10px" }}
              />
              <Bar
                dataKey="present"
                fill="hsl(var(--primary))"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="absent"
                fill="hsl(var(--destructive) / 0.6)"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

