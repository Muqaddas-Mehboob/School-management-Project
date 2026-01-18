import { ArrowLeft, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SettingsHeader({ onMenuClick }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3 sm:px-6 sm:py-4">
      
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-md p-2 text-foreground transition hover:bg-muted lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Back Button */}
      <Link
        to="/teacherdashboard"
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Dashboard</span>
      </Link>
    </header>
  );
}
