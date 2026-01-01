import { LogOut } from 'lucide-react';

export function SettingsFooter() {
  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      console.log('Signing out...');
      alert('Signed out successfully!');
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving changes...');
    alert('Changes saved successfully!');
  };

  return (
    <footer className="bg-white border-t px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Sign Out Button */}
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors order-2 sm:order-1"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-[10px] xs:text-xs sm:text-sm">Sign Out</span>
        </button>

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg text-white text-[10px] xs:text-xs sm:text-sm transition-opacity hover:opacity-90 order-1 sm:order-2"
          style={{ backgroundColor: '#ff9900' }}
        >
          Save Changes
        </button>
      </div>
    </footer>
  );
}
