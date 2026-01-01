import { Bell, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/teacher_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/teacher_components/ui/dropdown-menu";

export function Header({ pageTitle, children }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border">
      <div className="flex items-center justify-between h-10 xs:h-12 sm:h-14 md:h-16 px-1 xs:px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center gap-1 xs:gap-2 sm:gap-4 min-w-0 flex-1">
          {children}
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-foreground truncate">
              {pageTitle}
            </h1>
            <p className="text-[9px] xs:text-xs sm:text-sm text-muted-foreground hidden xs:block truncate">
              Welcome back, John!
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10">
                <Bell className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
                <span className="absolute top-0.5 right-0.5 xs:top-1 xs:right-1 w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] max-w-[280px] xs:w-64 sm:w-80">
              <DropdownMenuLabel className="text-xs xs:text-sm">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
                <p className="font-medium text-[10px] xs:text-xs sm:text-sm">New assignment submitted</p>
                <p className="text-[9px] xs:text-xs text-muted-foreground">
                  Sarah Johnson submitted "Algebra Quiz 3"
                </p>
                <p className="text-[9px] xs:text-xs text-muted-foreground">5 minutes ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
                <p className="font-medium text-[10px] xs:text-xs sm:text-sm">Meeting reminder</p>
                <p className="text-[9px] xs:text-xs text-muted-foreground">
                  Staff meeting in 30 minutes
                </p>
                <p className="text-[9px] xs:text-xs text-muted-foreground">25 minutes ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
                <p className="font-medium text-[10px] xs:text-xs sm:text-sm">Grade report ready</p>
                <p className="text-[9px] xs:text-xs text-muted-foreground">
                  Class 10-A report is ready for review
                </p>
                <p className="text-[9px] xs:text-xs text-muted-foreground">1 hour ago</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-primary cursor-pointer justify-center text-[10px] xs:text-xs sm:text-sm">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-0.5 xs:gap-1 sm:gap-2 px-0.5 xs:px-1 sm:px-2 h-7 xs:h-8 sm:h-10">
                <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-[9px] xs:text-xs sm:text-sm font-semibold">
                  JD
                </div>
                <ChevronDown className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 text-muted-foreground hidden xs:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] max-w-[200px] xs:w-48 sm:w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-[10px] xs:text-xs sm:text-sm">John Doe</span>
                  <span className="text-[9px] xs:text-xs font-normal text-muted-foreground">
                    john.doe@school.edu
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={"/settings"}><DropdownMenuItem className="text-[10px] xs:text-xs sm:text-sm">Profile</DropdownMenuItem></Link>
              <Link to={"/settings"}><DropdownMenuItem className="text-[10px] xs:text-xs sm:text-sm">Settings</DropdownMenuItem></Link>
              <DropdownMenuItem className="text-[10px] xs:text-xs sm:text-sm">Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive text-[10px] xs:text-xs sm:text-sm">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

