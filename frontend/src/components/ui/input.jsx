import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 xxs:h-10 xs:h-11 sm:h-12 w-full rounded-lg border border-input bg-background px-2 xxs:px-2.5 xs:px-3 sm:px-4 py-1.5 xxs:py-2 xs:py-2.5 sm:py-3 text-[9px] xxs:text-[10px] xs:text-xs sm:text-sm md:text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

