import { useState } from 'react';

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    assignmentSubmissions: true,
    gradeUpdates: true,
    studentMessages: true,
    attendanceAlerts: true,
    weeklyDigest: true,
    monthlyReport: true
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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

  const NotificationItem = ({ title, description, enabled, onChange }) => (
    <div className="flex items-center justify-between gap-3 py-3 sm:py-4 border-b" style={{ borderColor: '#e2e8f0' }}>
      <div className="flex-1 min-w-0">
        <h4 className="text-[10px] xs:text-xs sm:text-sm mb-1 truncate" style={{ color: '#0e2038' }}>
          {title}
        </h4>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-500">{description}</p>
      </div>
      <ToggleSwitch enabled={enabled} onChange={onChange} />
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2" style={{ color: '#0e2038' }}>
          Notifications
        </h2>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">
          Manage how you receive notifications and updates
        </p>
      </div>

      <div className="bg-white rounded-lg border p-4 sm:p-6" style={{ borderColor: '#e2e8f0' }}>
        {/* General Notifications */}
        <div className="mb-6">
          <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base mb-3 sm:mb-4" style={{ color: '#0e2038' }}>
            General Notifications
          </h3>
          
          <NotificationItem
            title="Email Notifications"
            description="Receive notifications via email"
            enabled={notifications.emailNotifications}
            onChange={() => handleToggle('emailNotifications')}
          />
          
          <NotificationItem
            title="Push Notifications"
            description="Receive push notifications on your device"
            enabled={notifications.pushNotifications}
            onChange={() => handleToggle('pushNotifications')}
          />
          
          <NotificationItem
            title="SMS Notifications"
            description="Receive important alerts via text message"
            enabled={notifications.smsNotifications}
            onChange={() => handleToggle('smsNotifications')}
          />
        </div>

        {/* Activity Notifications */}
        <div className="mb-6">
          <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base mb-3 sm:mb-4" style={{ color: '#0e2038' }}>
            Activity Notifications
          </h3>
          
          <NotificationItem
            title="Assignment Submissions"
            description="Notify when students submit assignments"
            enabled={notifications.assignmentSubmissions}
            onChange={() => handleToggle('assignmentSubmissions')}
          />
          
          <NotificationItem
            title="Grade Updates"
            description="Notify when grades are posted"
            enabled={notifications.gradeUpdates}
            onChange={() => handleToggle('gradeUpdates')}
          />
          
          <NotificationItem
            title="Student Messages"
            description="Notify when you receive new messages"
            enabled={notifications.studentMessages}
            onChange={() => handleToggle('studentMessages')}
          />
          
          <NotificationItem
            title="Attendance Alerts"
            description="Notify about attendance issues"
            enabled={notifications.attendanceAlerts}
            onChange={() => handleToggle('attendanceAlerts')}
          />
        </div>

        {/* System Updates */}
        <div>
          <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base mb-3 sm:mb-4" style={{ color: '#0e2038' }}>
            System & Reports
          </h3>
          
          <NotificationItem
            title="Weekly Digest"
            description="Get a weekly summary of activities"
            enabled={notifications.weeklyDigest}
            onChange={() => handleToggle('weeklyDigest')}
          />
          
          <div className="flex items-center justify-between gap-3 pt-3 sm:pt-4">
            <div className="flex-1 min-w-0">
              <h4 className="text-[10px] xs:text-xs sm:text-sm mb-1 truncate" style={{ color: '#0e2038' }}>
                Monthly Report
              </h4>
              <p className="text-[9px] xs:text-xs sm:text-sm text-gray-500">Receive detailed monthly reports</p>
            </div>
            <ToggleSwitch 
              enabled={notifications.monthlyReport} 
              onChange={() => handleToggle('monthlyReport')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
