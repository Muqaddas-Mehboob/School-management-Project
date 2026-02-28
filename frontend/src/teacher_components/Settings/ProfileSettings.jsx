import { useState } from "react";
import { Camera } from "lucide-react";

export function ProfileSettings() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@school.edu",
    username: "johnsmith",
    phoneNumber: "+1 (555) 123-4567",
    department: "Mathematics",
    employeeId: "TCH-2024-001",
    bio: "Passionate mathematics teacher with 10+ years of experience in secondary education.",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Profile Information
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and account details
        </p>
      </div>

      <section className="rounded-lg border border-border bg-background p-6">
        {/* Profile Picture */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium text-foreground">
            Profile Picture
          </label>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-lg font-semibold text-foreground">
              JS
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Camera className="h-4 w-4" />
              Change Photo
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <Input
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
          />
          <Input
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            disabled
          />
        </div>

        {/* Bio */}
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={4}
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground
              focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </section>
    </div>
  );
}

/* Reusable Input */
function Input({ label, name, value, onChange, type = "text", disabled }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-lg border border-border px-4 py-2 text-sm
          text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary
          ${disabled ? "bg-muted text-muted-foreground" : ""}`}
      />
    </div>
  );
}
