import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Menu } from "lucide-react";
import { Button } from "@/teacher_components/ui/button";

export function DashboardLayout({ children, pageTitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-40 xs:w-48 sm:w-56 md:w-64 transform transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Header */}
        <Header pageTitle={pageTitle}>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
          </Button>
        </Header>

        {/* Page content */}
        <main className="flex-1 p-1 xs:p-2 sm:p-4 md:p-6 lg:p-8 overflow-auto max-w-[98vw]">
          <div className="max-w-7xl mx-auto animate-fade-in w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

