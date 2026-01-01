import { ArrowLeft, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SettingsHeader({ onMenuClick }) {
  return (
    <header className="bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 justify-between">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Back to Dashboard Button */}
      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
        <Link className="flex items-center gap-2" to="/teacherdashboard">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-[10px] xs:text-xs sm:text-sm">Back to Dashboard</span>
        </Link>
      </button>
    </header>
  );
}
