import { Settings, User, Bell, Lock, Palette, X } from "lucide-react";

export function SettingsSidebar({
  activeSection,
  onSectionChange,
  isOpen,
  onClose,
}) {
  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Privacy & Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <aside
      className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-64 flex flex-col
        transform transition-transform duration-300 ease-in-out
        bg-sidebar text-sidebar-foreground
        border-r border-sidebar-border
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-sidebar-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Settings className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>

          <div>
            <h1 className="text-base sm:text-lg font-semibold">
              Settings
            </h1>
            <p className="text-[10px] xs:text-xs sm:text-sm hidden sm:block text-sidebar-muted">
              Teacher Dashboard
            </p>
          </div>
        </div>

        {/* Close button - Mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center gap-3
                px-3 sm:px-4 py-2.5 sm:py-3
                rounded-lg mb-1
              
                text-left transition-all
                ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary  "
                    : "text-sidebprimary hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }
              `}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isActive ? "text-white" : "text-sidebar-muted"}` } />
              <span className={`text-[10px] xs:text-xs sm:text-sm truncate ${isActive ? "text-white" : "text-sidebar-muted"}`} >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 sm:p-6 border-t border-sidebar-border">
        <p className="text-sidebar-muted text-[9px] xs:text-xs sm:text-sm mb-1">
          Need help?
        </p>
        <button className="text-[10px] xs:text-xs sm:text-sm hover:text-sidebar-foreground transition-colors">
          Contact Support
        </button>
      </div>
    </aside>
  );
}
