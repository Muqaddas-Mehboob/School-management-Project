import React, { useState } from 'react';
import { BookOpen, User, Calendar, Lock, Unlock, Save, Edit2, Plus, Trash2 } from 'lucide-react';

export default function StudentProgressReport() {
  const [isTeacher, setIsTeacher] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [student, setStudent] = useState({
    name: '',
    grade: '',
    studentId: '',
    reportDate: new Date().toISOString().split('T')[0]
  });

  const [subjects, setSubjects] = useState([]);
  const [overallRemarks, setOverallRemarks] = useState('');

  const handleStudentChange = (field, value) => {
    if (!isTeacher || !isEditing) return;
    setStudent({ ...student, [field]: value });
  };

  const handleSubjectChange = (id, field, value) => {
    if (!isTeacher || !isEditing) return;
    setSubjects(subjects.map(sub => 
      sub.id === id ? { ...sub, [field]: value } : sub
    ));
  };

  const addSubject = () => {
    if (!isTeacher || !isEditing) return;
    const newSubject = {
      id: Date.now(),
      name: '',
      grade: '',
      score: '',
      attendance: '',
      remarks: ''
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id) => {
    if (!isTeacher || !isEditing) return;
    setSubjects(subjects.filter(sub => sub.id !== id));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Progress report saved successfully!');
  };

  const toggleRole = () => {
    setIsTeacher(!isTeacher);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Role Toggle */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={toggleRole}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isTeacher
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300'
            }`}
          >
            {isTeacher ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            {isTeacher ? 'Teacher Mode' : 'Student/Parent View'}
          </button>
        </div>

        {/* Main Report Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <BookOpen className="w-8 h-8" />
                Student Progress Report
              </h1>
              {isTeacher && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditing ? 'Cancel Edit' : 'Edit Report'}
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <div className="flex-1">
                  <p className="text-sm opacity-90">Student Name</p>
                  {isEditing && isTeacher ? (
                    <input
                      type="text"
                      value={student.name}
                      onChange={(e) => handleStudentChange('name', e.target.value)}
                      placeholder="Enter name"
                      className="w-full mt-1 px-3 py-1 rounded border-2 border-white text-indigo-600 font-semibold"
                    />
                  ) : (
                    <p className="font-semibold">{student.name || 'Not set'}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <div className="flex-1">
                  <p className="text-sm opacity-90">Grade</p>
                  {isEditing && isTeacher ? (
                    <input
                      type="text"
                      value={student.grade}
                      onChange={(e) => handleStudentChange('grade', e.target.value)}
                      placeholder="e.g., 10th Grade"
                      className="w-full mt-1 px-3 py-1 rounded border-2 border-white text-indigo-600 font-semibold"
                    />
                  ) : (
                    <p className="font-semibold">{student.grade || 'Not set'}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <div className="flex-1">
                  <p className="text-sm opacity-90">Report Date</p>
                  {isEditing && isTeacher ? (
                    <input
                      type="date"
                      value={student.reportDate}
                      onChange={(e) => handleStudentChange('reportDate', e.target.value)}
                      className="w-full mt-1 px-3 py-1 rounded border-2 border-white text-indigo-600 font-semibold"
                    />
                  ) : (
                    <p className="font-semibold">{student.reportDate || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>
            
            {isEditing && isTeacher && (
              <div className="mt-4">
                <p className="text-sm opacity-90">Student ID</p>
                <input
                  type="text"
                  value={student.studentId}
                  onChange={(e) => handleStudentChange('studentId', e.target.value)}
                  placeholder="e.g., STU-2024-1001"
                  className="mt-1 px-3 py-2 rounded border-2 border-white text-indigo-600 font-semibold"
                />
              </div>
            )}
          </div>

          {/* Subject Details */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Subject Performance</h2>
              {isEditing && isTeacher && (
                <button
                  onClick={addSubject}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Subject
                </button>
              )}
            </div>
            
            {subjects.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No subjects added yet</p>
                {isTeacher && (
                  <p className="text-gray-500 text-sm mt-2">
                    Click "Edit Report" and then "Add Subject" to get started
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 transition-all relative"
                  >
                    {isEditing && isTeacher && (
                      <button
                        onClick={() => removeSubject(subject.id)}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pr-12">
                      {isEditing && isTeacher ? (
                        <input
                          type="text"
                          value={subject.name}
                          onChange={(e) => handleSubjectChange(subject.id, 'name', e.target.value)}
                          placeholder="Subject name"
                          className="text-xl font-bold text-gray-800 mb-2 md:mb-0 border-2 border-gray-300 rounded px-3 py-1"
                        />
                      ) : (
                        <h3 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">
                          {subject.name || 'Unnamed Subject'}
                        </h3>
                      )}
                      
                      <div className="flex gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Grade</p>
                          {isEditing && isTeacher ? (
                            <input
                              type="text"
                              value={subject.grade}
                              onChange={(e) => handleSubjectChange(subject.id, 'grade', e.target.value)}
                              placeholder="A+"
                              className="w-16 text-center font-bold text-2xl text-indigo-600 border-2 border-indigo-300 rounded px-2"
                            />
                          ) : (
                            <p className="font-bold text-2xl text-indigo-600">{subject.grade || '-'}</p>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Score</p>
                          {isEditing && isTeacher ? (
                            <input
                              type="number"
                              value={subject.score}
                              onChange={(e) => handleSubjectChange(subject.id, 'score', e.target.value)}
                              placeholder="85"
                              className="w-16 text-center font-bold text-2xl text-green-600 border-2 border-green-300 rounded px-2"
                            />
                          ) : (
                            <p className="font-bold text-2xl text-green-600">
                              {subject.score ? `${subject.score}%` : '-'}
                            </p>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Attendance</p>
                          {isEditing && isTeacher ? (
                            <input
                              type="text"
                              value={subject.attendance}
                              onChange={(e) => handleSubjectChange(subject.id, 'attendance', e.target.value)}
                              placeholder="95%"
                              className="w-16 text-center font-bold text-2xl text-blue-600 border-2 border-blue-300 rounded px-2"
                            />
                          ) : (
                            <p className="font-bold text-2xl text-blue-600">{subject.attendance || '-'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Teacher's Remarks:</p>
                      {isEditing && isTeacher ? (
                        <textarea
                          value={subject.remarks}
                          onChange={(e) => handleSubjectChange(subject.id, 'remarks', e.target.value)}
                          placeholder="Enter teacher's remarks about student performance..."
                          className="w-full text-gray-600 border-2 border-gray-300 rounded-lg p-3 min-h-20"
                        />
                      ) : (
                        <p className="text-gray-600 leading-relaxed">
                          {subject.remarks || 'No remarks added yet'}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Overall Performance */}
            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Overall Performance Summary</h3>
              {isEditing && isTeacher ? (
                <textarea
                  value={overallRemarks}
                  onChange={(e) => setOverallRemarks(e.target.value)}
                  placeholder="Enter overall performance summary and recommendations..."
                  className="w-full text-gray-700 leading-relaxed border-2 border-indigo-300 rounded-lg p-3 min-h-32"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {overallRemarks || 'No overall remarks added yet'}
                </p>
              )}
            </div>

            {/* Save Button */}
            {isEditing && isTeacher && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            )}

            {/* Footer */}
            {student.studentId && (
              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>Student ID: {student.studentId}</p>
                  <p>Generated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow-md">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> {isTeacher 
              ? 'You are viewing this report in Teacher Mode. Click "Edit Report" to modify grades and remarks.'
              : 'You are viewing this report in Student/Parent view. Only teachers can edit this report.'}
          </p>
        </div>
      </div>
    </div>
  );
}