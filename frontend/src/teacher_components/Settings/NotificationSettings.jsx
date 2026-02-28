import { useState } from "react";

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
    monthlyReport: true,
  });

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Notifications
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage how you receive notifications and updates
        </p>
      </div>

      <section className="rounded-lg border border-border bg-background p-6 space-y-6">
        {/* General */}
        <NotificationGroup title="General Notifications">
          <NotificationItem
            title="Email Notifications"
            description="Receive notifications via email"
            enabled={notifications.emailNotifications}
            onChange={() => handleToggle("emailNotifications")}
          />
          <NotificationItem
            title="Push Notifications"
            description="Receive push notifications on your device"
            enabled={notifications.pushNotifications}
            onChange={() => handleToggle("pushNotifications")}
          />
          <NotificationItem
            title="SMS Notifications"
            description="Receive important alerts via text message"
            enabled={notifications.smsNotifications}
            onChange={() => handleToggle("smsNotifications")}
          />
        </NotificationGroup>

        {/* Activity */}
        <NotificationGroup title="Activity Notifications">
          <NotificationItem
            title="Assignment Submissions"
            description="Notify when students submit assignments"
            enabled={notifications.assignmentSubmissions}
            onChange={() => handleToggle("assignmentSubmissions")}
          />
          <NotificationItem
            title="Grade Updates"
            description="Notify when grades are posted"
            enabled={notifications.gradeUpdates}
            onChange={() => handleToggle("gradeUpdates")}
          />
          <NotificationItem
            title="Student Messages"
            description="Notify when you receive new messages"
            enabled={notifications.studentMessages}
            onChange={() => handleToggle("studentMessages")}
          />
          <NotificationItem
            title="Attendance Alerts"
            description="Notify about attendance issues"
            enabled={notifications.attendanceAlerts}
            onChange={() => handleToggle("attendanceAlerts")}
          />
        </NotificationGroup>

        {/* System */}
        <NotificationGroup title="System & Reports" last>
          <NotificationItem
            title="Weekly Digest"
            description="Get a weekly summary of activities"
            enabled={notifications.weeklyDigest}
            onChange={() => handleToggle("weeklyDigest")}
          />
          <NotificationItem
            title="Monthly Report"
            description="Receive detailed monthly reports"
            enabled={notifications.monthlyReport}
            onChange={() => handleToggle("monthlyReport")}
            noBorder
          />
        </NotificationGroup>
      </section>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function NotificationGroup({ title, children, last }) {
  return (
    <div className={!last ? "pb-6 border-b border-border" : ""}>
      <h3 className="mb-4 text-sm font-medium text-foreground">
        {title}
      </h3>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}

function NotificationItem({ title, description, enabled, onChange, noBorder }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-4 ${
        noBorder ? "" : ""
      }`}
    >
      <div className="min-w-0">
        <h4 className="text-sm font-medium text-foreground truncate">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <ToggleSwitch enabled={enabled} onChange={onChange} />
    </div>
  );
}

function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${enabled ? "bg-primary" : "bg-muted"}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-background shadow transition
          ${enabled ? "translate-x-5" : "translate-x-1"}`}
      />
    </button>
  );
}
