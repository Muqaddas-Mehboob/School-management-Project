
import { useEffect, useState } from "react";





export function AppearanceSettings() {
  const defaultSettings = {
  theme: "light",
  language: "English",
  timezone: "UTC-5 (Eastern Time)",
  dateFormat: "MM/DD/YYYY",
  reduceMotion: false,
  highContrast: false,
};
  const [settings, setSettings] = useState(() => {
  const saved = localStorage.getItem("settings");
  return saved ? JSON.parse(saved) : defaultSettings;
});
  useEffect(() => {
    if(localStorage.getItem("settings")) {
      setSettings(JSON.parse(localStorage.getItem("settings")));
      console.log(settings)
    }
  },[]);
  useEffect(() => {
    console.log(settings)
    const root = document.documentElement;

    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);
  const handleThemeChange = (theme) => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const handleToggle = (field) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${enabled ? "bg-primary" : "bg-muted"}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-background shadow transition-transform
          ${enabled ? "translate-x-5" : "translate-x-1"}`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Appearance & Language
        </h2>
        <p className="text-sm text-muted-foreground">
          Customize your display preferences
        </p>
      </div>

      {/* Display Settings */}
      <section className="rounded-lg border border-border bg-background p-6 space-y-6">
        <div>
          <h3 className="text-base font-medium text-foreground">
            Display Settings
          </h3>
          <p className="text-sm text-muted-foreground">
            Customize how the dashboard looks
          </p>
        </div>

        {/* Theme */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["light", "dark", "default"].map((mode) => (
              <button
                key={mode}
                onClick={() => handleThemeChange(mode)}
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition
                  ${
                    settings.theme === mode
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, language: e.target.value }))
            }
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm
              text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Chinese</option>
          </select>
        </div>

        {/* Time Zone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Time Zone
          </label>
          <select
            value={settings.timezone}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, timezone: e.target.value }))
            }
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm
              text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
          <label className="block text-sm font-medium text-foreground mb-2">
            Date Format
          </label>
          <select
            value={settings.dateFormat}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, dateFormat: e.target.value }))
            }
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm
              text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>
      </section>

      {/* Accessibility */}
      <section className="rounded-lg border border-border bg-background p-6 space-y-4">
        <h3 className="text-base font-medium text-foreground">
          Accessibility
        </h3>

        {/* Reduce Motion */}
        <div className="flex items-center justify-between border-b border-border py-4">
          <div>
            <h4 className="text-sm font-medium text-foreground">
              Reduce Motion
            </h4>
            <p className="text-sm text-muted-foreground">
              Minimize animations and transitions
            </p>
          </div>
          <ToggleSwitch
            enabled={settings.reduceMotion}
            onChange={() => handleToggle("reduceMotion")}
          />
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between pt-4">
          <div>
            <h4 className="text-sm font-medium text-foreground">
              High Contrast
            </h4>
            <p className="text-sm text-muted-foreground">
              Increase contrast for better visibility
            </p>
          </div>
          <ToggleSwitch
            enabled={settings.highContrast}
            onChange={() => handleToggle("highContrast")}
          />
        </div>
      </section>
    </div>
  );
}
