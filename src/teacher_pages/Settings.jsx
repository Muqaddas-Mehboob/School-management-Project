import { useState } from 'react';
import { SettingsLayout } from '../teacher_components/Settings/Settingslayout';
import { ProfileSettings } from '../teacher_components/Settings/ProfileSettings';
import { NotificationSettings } from '../teacher_components/Settings/NotificationSettings';
import { SecuritySettings } from '../teacher_components/Settings/SecuritySettings';
import { AppearanceSettings } from '../teacher_components/Settings/AppearanceSettings';

export default function App() {
  const [activeSection, setActiveSection] = useState('appearance');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'appearance':
        return <AppearanceSettings />;
      default:
        return <AppearanceSettings />;
    }
  };

  return (
    <SettingsLayout 
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </SettingsLayout>
  );
}
