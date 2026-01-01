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
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Changing password...');
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
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

  const PasswordInput = ({ label, name, value, onChange, showPassword, toggleShow }) => (
    <div>
      <label className="block text-[10px] xs:text-xs sm:text-sm mb-2" style={{ color: '#0e2038' }}>
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 sm:px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
          style={{ borderColor: '#e2e8f0', '--tw-ring-color': '#ff9900' }}
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Eye className="w-3 h-3 sm:w-4 sm:h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2" style={{ color: '#0e2038' }}>
          Privacy & Security
        </h2>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">
          Manage your password and security preferences
        </p>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg border p-4 sm:p-6 mb-4 sm:mb-6" style={{ borderColor: '#e2e8f0' }}>
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#0e2038' }} />
          <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base" style={{ color: '#0e2038' }}>
            Change Password
          </h3>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
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
          className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg text-white text-[10px] xs:text-xs sm:text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#ff9900' }}
        >
          Update Password
        </button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg border p-4 sm:p-6" style={{ borderColor: '#e2e8f0' }}>
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#0e2038' }} />
          <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base" style={{ color: '#0e2038' }}>
            Two-Factor Authentication
          </h3>
        </div>

        <div className="flex items-center justify-between gap-3 py-3 sm:py-4 border-b" style={{ borderColor: '#e2e8f0' }}>
          <div className="flex-1 min-w-0">
            <h4 className="text-[10px] xs:text-xs sm:text-sm mb-1 truncate" style={{ color: '#0e2038' }}>
              Enable Two-Factor Authentication
            </h4>
            <p className="text-[9px] xs:text-xs sm:text-sm text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>
          <ToggleSwitch enabled={twoFactorEnabled} onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} />
        </div>

        {twoFactorEnabled && (
          <div className="mt-4 p-3 sm:p-4 rounded-lg" style={{ backgroundColor: '#fff5e6' }}>
            <p className="text-[9px] xs:text-xs sm:text-sm text-gray-700 mb-3">
              Two-factor authentication is enabled. You'll receive a verification code via your registered phone number.
            </p>
            <button className="text-[9px] xs:text-xs sm:text-sm transition-opacity hover:opacity-80" style={{ color: '#ff9900' }}>
              Configure 2FA Settings →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
