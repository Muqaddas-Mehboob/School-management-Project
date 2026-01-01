import { Card, CardContent } from "@/teacher_components/ui/card";

export function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  delay = 0,
}) {
  const changeColors = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card
      className="hover-lift stat-card-shadow border-border/50 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <CardContent className="p-2 xs:p-2.5 sm:p-3 md:p-4 lg:p-6">
        <div className="flex items-start justify-between gap-1.5 xs:gap-2">
          <div className="space-y-0.5 xs:space-y-1 sm:space-y-2 min-w-0 flex-1">
            <p className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold text-foreground leading-tight">
              {value}
            </p>
            <p className={`text-[9px] xs:text-[10px] sm:text-xs md:text-sm ${changeColors[changeType]} truncate`}>{change}</p>
          </div>
          <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

