import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Award, Edit, Save, X } from 'lucide-react';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const studentInfo = {
    name: 'Sarah Johnson',
    grade: 'Grade 10',
    section: 'A',
    studentId: 'STU2024-1234',
    email: 'sarah.johnson@eduportal.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: 'March 15, 2010',
    address: '123 Education Street, Learning City, LC 12345',
    parentName: 'Michael Johnson',
    parentEmail: 'michael.johnson@email.com',
    parentPhone: '+1 (555) 987-6543',
  };

  const academicHistory = [
    { year: '2025-2026', grade: 'Grade 10', Average_Score: 83, status: 'Current' },
    { year: '2024-2025', grade: 'Grade 9', Average_Score: 80, status: 'Completed' },
    { year: '2023-2024', grade: 'Grade 8', Average_Score: 81, status: 'Completed' },
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Prize - Science Fair',
      date: 'Dec 2025',
      category: 'Academic Excellence',
      icon: '🏆',
    },
    {
      id: 2,
      title: 'Perfect Attendance Award',
      date: 'Nov 2025',
      category: 'Attendance',
      icon: '⭐',
    },
    {
      id: 3,
      title: 'Mathematics Olympiad - Gold Medal',
      date: 'Oct 2025',
      category: 'Competition',
      icon: '🥇',
    },
    {
      id: 4,
      title: 'Student of the Month',
      date: 'Sep 2025',
      category: 'Recognition',
      icon: '🎖️',
    },
  ];

  const subjects = [
    { name: 'Mathematics', grade: 'A', teacher: 'Mr. Anderson' },
    { name: 'Physics', grade: 'A-', teacher: 'Dr. Williams' },
    { name: 'Chemistry', grade: 'B+', teacher: 'Dr. Brown' },
    { name: 'English Literature', grade: 'A', teacher: 'Ms. Parker' },
    { name: 'History', grade: 'A+', teacher: 'Mr. Davis' },
    { name: 'Biology', grade: 'B+', teacher: 'Dr. Martinez' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0e2038]">
          Student Profile
        </h1>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600 mt-1">
          Manage your personal details, academic history, and achievements
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-[#ff9900] flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
                {studentInfo.name}
              </h2>
              <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 mt-1">
                {studentInfo.grade} - Section {studentInfo.section}
              </p>
              <p className="text-[9px] xs:text-xs sm:text-sm text-gray-500 mt-1">
                ID: {studentInfo.studentId}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#ff9900] text-white rounded-lg hover:bg-[#e68a00] transition-colors"
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4" />
                  <span className="text-xs sm:text-sm md:text-base">Cancel</span>
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  <span className="text-xs sm:text-sm md:text-base">Edit Profile</span>
                </>
              )}
            </button>

            {isEditing && (
              <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Save className="w-4 h-4" />
                <span className="text-xs sm:text-sm md:text-base">Save Changes</span>
              </button>
            )}

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Current Score</span>
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#ff9900]">{academicHistory.map((year) =>{ if (year.status === 'Current') {
                      return year.Average_Score
             
                  }})}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Attendance</span>
                  <span className="text-xs sm:text-sm md:text-base font-bold text-green-600">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Achievements</span>
                  <span className="text-xs sm:text-sm md:text-base font-bold text-purple-600">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
                Personal Information
              </h3>
            </div>
            <div className="p-4 grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#ff9900] shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      defaultValue={studentInfo.email}
                      className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm md:text-base"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm md:text-base text-[#0e2038] mt-1">
                      {studentInfo.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#ff9900] shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Phone</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      defaultValue={studentInfo.phone}
                      className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm md:text-base"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm md:text-base text-[#0e2038] mt-1">
                      {studentInfo.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#ff9900] shrink-0 mt-1" />
                <div>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Date of Birth</p>
                  <p className="text-xs sm:text-sm md:text-base text-[#0e2038] mt-1">
                    {studentInfo.dateOfBirth}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ff9900] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Address</p>
                  {isEditing ? (
                    <textarea
                      defaultValue={studentInfo.address}
                      className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm md:text-base resize-none"
                      rows={2}
                    />
                  ) : (
                    <p className="text-xs sm:text-sm md:text-base text-[#0e2038] mt-1">
                      {studentInfo.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
                Parent/Guardian Information
              </h3>
            </div>
            <div className="p-4 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Name</p>
                <p className="text-xs sm:text-sm md:text-base text-[#0e2038] mt-1">
                  {studentInfo.parentName}
                </p>
              </div>
              <div>
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Email</p>
                <p className="text-xs sm:text-sm md:text-base text-[#0e2038] mt-1">
                  {studentInfo.parentEmail}
                </p>
              </div>
              <div>
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Phone</p>
                <p className="text-xs sm:text-sm md:text-base text-[#0e2038] mt-1">
                  {studentInfo.parentPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Current Subjects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
                Current Subjects
              </h3>
            </div>
            <div className="p-4">
              <div className="grid sm:grid-cols-2 gap-3">
                {subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038]">
                        {subject.name}
                      </p>
                      <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">
                        {subject.teacher}
                      </p>
                    </div>
                    <span
                      className={`text-xs sm:text-sm md:text-base font-bold px-3 py-1 rounded-full ${
                        subject.grade.startsWith('A')
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {subject.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
                Academic History
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {academicHistory.map((year, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038]">
                        {year.year}
                      </p>
                      <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">{year.grade}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs sm:text-sm md:text-base font-bold text-[#ff9900]">
                        Avreage Score: {year.Average_Score}
                      </p>
                      <span
                        className={`text-[9px] xs:text-xs px-2 py-1 rounded-full ${
                          year.status === 'Current'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {year.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ff9900]" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0e2038]">
                  Achievements & Awards
                </h3>
              </div>
            </div>
            <div className="p-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-[#ff9900] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] mb-1">
                          {achievement.title}
                        </h4>
                        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600">
                          {achievement.category}
                        </p>
                        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-500 mt-1">
                          {achievement.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
