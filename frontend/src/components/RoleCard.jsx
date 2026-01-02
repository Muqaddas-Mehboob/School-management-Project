import { cn } from "@/lib/utils";

const roleColors = {
  teacher: {
    border: "border-role-teacher",
    bg: "bg-role-teacher/10",
    text: "text-role-teacher",
  },
  student: {
    border: "border-role-student",
    bg: "bg-role-student/10",
    text: "text-role-student",
  },
  admin: {
    border: "border-role-admin",
    bg: "bg-role-admin/10",
    text: "text-role-admin",
  },
};

export const RoleCard = ({ icon: Icon, label, role, selected, onClick }) => {
  const colors = roleColors[role];
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 xxs:gap-0.5 xs:gap-1 sm:gap-1.5 p-0.5 xxs:p-1 xs:p-1.5 sm:p-2 md:p-3 rounded-lg border-2 transition-all duration-200 flex-1 min-w-0 min-w-[30px] xxs:min-w-[40px] xs:min-w-[50px] sm:min-w-[60px] shrink-0",
        selected
          ? `${colors.border} ${colors.bg} ${colors.text}`
          : "border-border bg-background text-muted-foreground hover:border-muted-foreground/50 hover:bg-muted/50"
      )}
      aria-label={`Select ${label} role`}
    >
      <Icon className="w-2 h-2 xxs:w-2.5 xxs:h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
      <span className="text-[6px] xxs:text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-medium text-center leading-tight break-words overflow-hidden text-ellipsis line-clamp-2">{label}</span>
    </button>
  );
};

