import { Card, CardContent, CardHeader, CardTitle } from "@/teacher_components/ui/card";
import { Button } from "@/teacher_components/ui/button";
import { Link } from "react-router-dom";
import { Plus, ClipboardCheck, FileText, MessageSquare } from "lucide-react";

const actions = [
  {
    icon: ClipboardCheck,
    label: "Take Attendance",
    path: "/attendance",
    color: "bg-success/10 text-success hover:bg-success/20",
  },
  {
    icon: Plus,
    label: "Create Assignment",
    path: "/Assignments",
    color: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  {
    icon: FileText,
    label: "Enter Grades",
    path: "/grades",
    color: "bg-accent/10 text-accent hover:bg-accent/20",
  },
  {
    icon: MessageSquare,
    label: "Send Message",
    path: "/messages",
    color: "bg-info/10 text-info hover:bg-info/20",
  },
];

export function QuickActions() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2 sm:pb-4 p-3 sm:p-6">
        <CardTitle className="font-display text-sm sm:text-base md:text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} to={action.path}>
                <Button
                  variant="ghost"
                  className={`w-full h-auto flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 ${action.color} opacity-0 animate-fade-in transition-all duration-200`}
                  style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs font-medium text-center">
                    {action.label}
                  </span>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

