import { Card, CardContent, CardHeader, CardTitle } from "@/teacher_components/ui/card";
import { FileText, MessageSquare, ClipboardCheck, Star } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "submission",
    icon: FileText,
    title: "New submission",
    description: "Sarah J. submitted Algebra Quiz",
    time: "5 min ago",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    id: 2,
    type: "message",
    icon: MessageSquare,
    title: "New message",
    description: "Parent inquiry from Mr. Smith",
    time: "15 min ago",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: 3,
    type: "attendance",
    icon: ClipboardCheck,
    title: "Attendance marked",
    description: "Class 10-A attendance completed",
    time: "1 hour ago",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    id: 4,
    type: "grade",
    icon: Star,
    title: "Grade updated",
    description: "Test results for Class 9-B posted",
    time: "2 hours ago",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

export function RecentActivity() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2 sm:pb-4 p-3 sm:p-6">
        <CardTitle className="font-display text-sm sm:text-base md:text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-start gap-2 sm:gap-3 opacity-0 animate-fade-in"
                style={{ animationDelay: `${(index + 6) * 0.1}s` }}
              >
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${activity.bg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm text-foreground truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

