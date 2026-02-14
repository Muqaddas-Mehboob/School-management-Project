import { useState } from "react";
import { SettingsSidebar } from "./layout/SettingsSidebar";
import { SettingsHeader } from "./layout/SettingsHeader";
import { SettingsFooter } from "./layout/SettingsFooter";

export function SettingsLayout({ children, activeSection, onSectionChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSectionChange = (section) => {
    onSectionChange(section);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="min-h-screen flex bg-background ">
      {/* Sidebar - Desktop & Mobile */}
      <SettingsSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <SettingsHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>

        {/* Footer */}
        <SettingsFooter />
      </div>
    </div>
  );
}
