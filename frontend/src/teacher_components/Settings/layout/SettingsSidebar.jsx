import { Settings, User, Bell, Lock, Palette, X } from 'lucide-react';

export function SettingsSidebar({ activeSection, onSectionChange, isOpen, onClose }) {
  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Privacy & Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-64 flex flex-col transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ backgroundColor: '#0e2038' }}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b flex items-center justify-between" style={{ borderColor: '#1a3a5c' }}>
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#ff9900' }}
            >
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white text-base sm:text-lg">Settings</h1>
              <p className="text-gray-400 text-[10px] xs:text-xs sm:text-sm hidden sm:block">Teacher Dashboard</p>
            </div>
          </div>
          
          {/* Close button - Mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg mb-1 transition-all text-left"
                style={{
                  backgroundColor: isActive ? '#ff9900' : 'transparent',
                  color: isActive ? 'white' : '#a0aec0'
                }}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-[10px] xs:text-xs sm:text-sm truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t" style={{ borderColor: '#1a3a5c' }}>
          <p className="text-gray-400 text-[9px] xs:text-xs sm:text-sm mb-1">Need help?</p>
          <button className="text-white text-[10px] xs:text-xs sm:text-sm hover:text-gray-300 transition-colors">
            Contact Support
          </button>
        </div>
      </aside>
    </>
  );
}
