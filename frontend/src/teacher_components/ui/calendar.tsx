import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "../../lib/utils";
import { buttonVariants } from "../ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-1.5 xs:p-2 sm:p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-2 xs:space-y-3 sm:space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-2 xs:space-y-3 sm:space-y-4",
        caption: "flex justify-center pt-0.5 xs:pt-1 relative items-center",
        caption_label: "text-[10px] xs:text-xs sm:text-sm font-medium",
        nav: "space-x-0.5 xs:space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-0.5 xs:left-1",
        nav_button_next: "absolute right-0.5 xs:right-1",
        table: "w-full border-collapse space-y-0.5 xs:space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 font-normal text-[9px] xs:text-[0.75rem] sm:text-[0.8rem]",
        row: "flex w-full mt-1 xs:mt-2",
        cell: "h-6 w-6 xs:h-7 xs:w-7 sm:h-9 sm:w-9 text-center text-[9px] xs:text-xs sm:text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-6 w-6 xs:h-7 xs:w-7 sm:h-9 sm:w-9 p-0 font-normal aria-selected:opacity-100 text-[9px] xs:text-xs sm:text-sm"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      teacher_components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
