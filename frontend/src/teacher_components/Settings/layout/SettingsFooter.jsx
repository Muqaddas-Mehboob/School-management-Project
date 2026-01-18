import { LogOut } from "lucide-react";

export function SettingsFooter() {
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      console.log("Signing out...");
    }
  };

  const handleSaveChanges = () => {
    console.log("Saving changes...");
    alert("Changes saved successfully!");
  };

  return (
    <footer className="bg-background border-t border-border px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="
            flex items-center gap-2
            text-destructive
            hover:text-destructive/80
            transition-colors
            order-2 sm:order-1
          "
        >
          <LogOut className="w-4 h-4" />
          <span className="text-[10px] xs:text-xs sm:text-sm">
            Sign Out
          </span>
        </button>

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          className="
            w-full sm:w-auto
            px-4 sm:px-6 py-2
            rounded-lg
            bg-primary
            text-primary-foreground
            text-[10px] xs:text-xs sm:text-sm
            transition-opacity
            hover:opacity-90
            order-1 sm:order-2
          "
        >
          Save Changes
        </button>
      </div>
    </footer>
  );
}
