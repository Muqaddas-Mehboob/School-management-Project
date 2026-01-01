import { useState } from 'react';

export function AppearanceSettings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'English',
    timezone: 'UTC-5 (Eastern Time)',
    dateFormat: 'MM/DD/YYYY',
    reduceMotion: false,
    highContrast: false
  });

  const handleThemeChange = (theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const handleToggle = (field) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none flex-shrink-0"
      style={{ backgroundColor: enabled ? '#ff9900' : '#cbd5e0' }}
    >
      <span
        className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform shadow ${
          enabled ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2" style={{ color: '#0e2038' }}>
          Appearance & Language
        </h2>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">
          Customize your display preferences
        </p>
      </div>

      {/* Display Settings */}
      <div className="bg-white rounded-lg border p-4 sm:p-6 mb-4 sm:mb-6" style={{ borderColor: '#e2e8f0' }}>
        <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base mb-1" style={{ color: '#0e2038' }}>
          Display Settings
        </h3>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          Customize how the dashboard looks
        </p>

        {/* Theme */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-[10px] xs:text-xs sm:text-sm mb-3" style={{ color: '#0e2038' }}>
            Theme
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <button
              onClick={() => handleThemeChange('light')}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-[10px] xs:text-xs sm:text-sm border-2 transition-all"
              style={{
                borderColor: settings.theme === 'light' ? '#ff9900' : '#e2e8f0',
                backgroundColor: settings.theme === 'light' ? '#fff5e6' : 'white',
                color: '#0e2038'
              }}
            >
              Light
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-[10px] xs:text-xs sm:text-sm border-2 transition-all"
              style={{
                borderColor: settings.theme === 'dark' ? '#ff9900' : '#e2e8f0',
                backgroundColor: settings.theme === 'dark' ? '#fff5e6' : 'white',
                color: '#0e2038'
              }}
            >
              Dark
            </button>
            <button
              onClick={() => handleThemeChange('auto')}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-[10px] xs:text-xs sm:text-sm border-2 transition-all"
              style={{
                borderColor: settings.theme === 'auto' ? '#ff9900' : '#e2e8f0',
                backgroundColor: settings.theme === 'auto' ? '#fff5e6' : 'white',
                color: '#0e2038'
              }}
            >
              Auto
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-[10px] xs:text-xs sm:text-sm mb-2" style={{ color: '#0e2038' }}>
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
            style={{ borderColor: '#e2e8f0', '--tw-ring-color': '#ff9900' }}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Chinese</option>
          </select>
        </div>

        {/* Time Zone */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-[10px] xs:text-xs sm:text-sm mb-2" style={{ color: '#0e2038' }}>
            Time Zone
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
            style={{ borderColor: '#e2e8f0', '--tw-ring-color': '#ff9900' }}
          >
            <option>UTC-5 (Eastern Time)</option>
            <option>UTC-6 (Central Time)</option>
            <option>UTC-7 (Mountain Time)</option>
            <option>UTC-8 (Pacific Time)</option>
            <option>UTC+0 (London)</option>
            <option>UTC+1 (Paris)</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className="block text-[10px] xs:text-xs sm:text-sm mb-2" style={{ color: '#0e2038' }}>
            Date Format
          </label>
          <select
            value={settings.dateFormat}
            onChange={(e) => setSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
            style={{ borderColor: '#e2e8f0', '--tw-ring-color': '#ff9900' }}
          >
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>
      </div>

      {/* Accessibility */}
      <div className="bg-white rounded-lg border p-4 sm:p-6" style={{ borderColor: '#e2e8f0' }}>
        <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base mb-4 sm:mb-6" style={{ color: '#0e2038' }}>
          Accessibility
        </h3>

        {/* Reduce Motion */}
        <div className="flex items-center justify-between gap-3 py-3 sm:py-4 border-b" style={{ borderColor: '#e2e8f0' }}>
          <div className="flex-1 min-w-0">
            <h4 className="text-[10px] xs:text-xs sm:text-sm mb-1 truncate" style={{ color: '#0e2038' }}>
              Reduce Motion
            </h4>
            <p className="text-[9px] xs:text-xs sm:text-sm text-gray-500">
              Minimize animations and transitions
            </p>
          </div>
          <ToggleSwitch 
            enabled={settings.reduceMotion} 
            onChange={() => handleToggle('reduceMotion')} 
          />
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between gap-3 pt-3 sm:pt-4">
          <div className="flex-1 min-w-0">
            <h4 className="text-[10px] xs:text-xs sm:text-sm mb-1 truncate" style={{ color: '#0e2038' }}>
              High Contrast
            </h4>
            <p className="text-[9px] xs:text-xs sm:text-sm text-gray-500">
              Increase contrast for better visibility
            </p>
          </div>
          <ToggleSwitch 
            enabled={settings.highContrast} 
            onChange={() => handleToggle('highContrast')} 
          />
        </div>
      </div>
    </div>
  );
}
