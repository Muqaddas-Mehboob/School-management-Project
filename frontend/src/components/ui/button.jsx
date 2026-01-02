import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Export buttonVariants first to avoid Fast Refresh issues
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 xxs:gap-1.5 xs:gap-2 whitespace-nowrap rounded-lg text-[8px] xxs:text-[10px] xs:text-xs sm:text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:w-3 [&_svg]:h-3 xxs:[&_svg]:w-3.5 xxs:[&_svg]:h-3.5 xs:[&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        login: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl w-full",
      },
      size: {
        default: "h-8 xxs:h-9 xs:h-10 px-2 xxs:px-3 xs:px-4 py-1 xxs:py-1.5 xs:py-2",
        sm: "h-7 xxs:h-8 xs:h-9 rounded-md px-2 xxs:px-2.5 xs:px-3",
        lg: "h-10 xxs:h-11 xs:h-12 sm:h-13 rounded-lg px-3 xxs:px-4 xs:px-6 sm:px-8 py-2 xxs:py-2.5 xs:py-3 sm:py-3.5",
        icon: "h-8 xxs:h-9 xs:h-10 w-8 xxs:w-9 xs:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };

