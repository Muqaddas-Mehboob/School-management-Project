import { useState } from 'react';
import { Eye, EyeOff, Shield, Smartphone } from 'lucide-react';

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  /* ---------- Reusable Components ---------- */

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${enabled ? 'bg-primary' : 'bg-muted'}`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-background shadow transition-transform
          ${enabled ? 'translate-x-5' : 'translate-x-1'}`}
      />
    </button>
  );

  const PasswordInput = ({ label, name, value, onChange, showPassword, toggleShow }) => (
    <div className="space-y-2">
      <label className="text-sm text-foreground">{label}</label>

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 pr-10
                     text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );

  /* ---------- UI ---------- */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Privacy & Security</h2>
        <p className="text-sm text-muted-foreground">
          Manage your password and security preferences
        </p>
      </div>

      {/* Change Password */}
      <section className="rounded-lg border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Shield className="h-5 w-5 text-foreground" />
          <h3 className="text-base font-medium text-foreground">Change Password</h3>
        </div>

        <div className="space-y-4">
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            showPassword={showCurrentPassword}
            toggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
          />

          <PasswordInput
            label="New Password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            showPassword={showNewPassword}
            toggleShow={() => setShowNewPassword(!showNewPassword)}
          />

          <PasswordInput
            label="Confirm New Password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            showPassword={showConfirmPassword}
            toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>

        <button
          onClick={handleChangePassword}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2
                     text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Update Password
        </button>
      </section>

      {/* Two Factor Authentication */}
      <section className="rounded-lg border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Smartphone className="h-5 w-5 text-foreground" />
          <h3 className="text-base font-medium text-foreground">
            Two-Factor Authentication
          </h3>
        </div>

        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h4 className="text-sm font-medium text-foreground">
              Enable Two-Factor Authentication
            </h4>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>

          <ToggleSwitch
            enabled={twoFactorEnabled}
            onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
          />
        </div>

        {twoFactorEnabled && (
          <div className="mt-4 rounded-lg bg-muted p-4">
            <p className="text-sm text-foreground">
              Two-factor authentication is enabled. You’ll receive a verification code
              on your registered device.
            </p>

            <button className="mt-3 text-sm font-medium text-primary hover:opacity-80">
              Configure 2FA Settings →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
