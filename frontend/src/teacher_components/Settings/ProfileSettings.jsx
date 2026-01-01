import { useState } from 'react';
import { Camera } from 'lucide-react';

export function ProfileSettings() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@school.edu',
    username: 'johnsmith',
    phoneNumber: '+1 (555) 123-4567',
    department: 'Mathematics',
    employeeId: 'TCH-2024-001',
    bio: 'Passionate mathematics teacher with 10+ years of experience in secondary education.'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2" style={{ color: '#0e2038' }}>
          Profile Information
        </h2>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">
          Manage your personal information and account details
        </p>
      </div>

      <div className="bg-white rounded-lg border p-4 sm:p-6" style={{ borderColor: '#e2e8f0' }}>
        {/* Profile Picture */}
        <div className="mb-6">
          <label className="block text-[10px] xs:text-xs sm:text-sm mb-3" style={{ color: '#0e2038' }}>
            Profile Picture
          </label>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl flex-shrink-0"
              style={{ backgroundColor: '#0e2038' }}
            >
              JS
            </div>
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-[10px] xs:text-xs sm:text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#ff9900' }}
            >
              <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Change Photo</span>
            </button>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div>
            <label className="block text-[10px] xs:text-xs sm:text-sm mb-2" style={{ color: '#0e2038' }}>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
              style={{ borderColor: '#e2e8f0', '--tw-ring-color': '#ff9900' }}
            />
          </div>
          <div>
            <label className="block text-[10px] xs:text-xs sm:text-sm mb-2" style={{ color: '#0e2038' }}>
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
              style={{ borderColor: '#e2e8f0', '--tw-ring-color': '#ff9900' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div>
            <label className="block text-[10px] xs:text-xs sm:text-sm mb-2" style={{ color: '#0e2038' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
              style={{ borderColor: '#e2e8f0', '--tw-ring-color': '#ff9900' }}
            />
          </div>
          <div>
            <label className="block text-[10px] xs:text-xs sm:text-sm mb-2" style={{ color: '#0e2038' }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
              style={{ borderColor: '#e2e8f0', '--tw-ring-color': '#ff9900' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div>
            <label className="block text-[10px] xs:text-xs sm:text-sm mb-2" style={{ color: '#0e2038' }}>
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm"
              style={{ borderColor: '#e2e8f0', '--tw-ring-color': '#ff9900' }}
            />
          </div>
          <div>
            <label className="block text-[10px] xs:text-xs sm:text-sm mb-2" style={{ color: '#0e2038' }}>
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm bg-gray-50"
              style={{ borderColor: '#e2e8f0', '--tw-ring-color': '#ff9900' }}
              disabled
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[10px] xs:text-xs sm:text-sm mb-2" style={{ color: '#0e2038' }}>
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-[10px] xs:text-xs sm:text-sm resize-none"
            style={{ borderColor: '#e2e8f0', '--tw-ring-color': '#ff9900' }}
          />
        </div>
      </div>
    </div>
  );
}
