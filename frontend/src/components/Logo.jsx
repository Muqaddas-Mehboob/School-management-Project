import { GraduationCap } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-1 xxs:gap-1.5 xs:gap-2 sm:gap-3">
      <div className="w-6 h-6 xxs:w-7 xxs:h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
        <GraduationCap className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 sm:w-6 sm:h-6 text-primary-foreground" />
      </div>
      <span className="text-xs xxs:text-sm xs:text-base sm:text-xl font-bold text-hero-foreground break-words">EduManage</span>
    </div>
  );
};

