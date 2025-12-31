import React from 'react';

export default function StudentProgressReport() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-12">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
          Student Progress Report
        </h1>

        {/* Student Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Student Name:
            </label>
            <input
              type="text"
              className="w-full border-b-2 border-gray-400 focus:border-orange-500 outline-none py-2"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Student's Roll no:
            </label>
            <input
              type="text"
              className="w-full border-b-2 border-gray-400 focus:border-orange-500 outline-none py-2"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Department:
            </label>
            <input
              type="text"
              className="w-full border-b-2 border-gray-400 focus:border-orange-500 outline-none py-2"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Semester:
            </label>
            <input
              type="text"
              className="w-full border-b-2 border-gray-400 focus:border-orange-500 outline-none py-2"
              placeholder=""
            />
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Performance Overview
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="border border-orange-500 px-4 py-3 text-left font-semibold">
                    Course
                  </th>
                  <th className="border border-orange-500 px-4 py-3 text-left font-semibold">
                    Grade
                  </th>
                  <th className="border border-orange-500 px-4 py-3 text-left font-semibold">
                    GPA
                  </th>
                  <th className="border border-orange-500 px-4 py-3 text-left font-semibold">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      <input
                        type="text"
                        className="w-full outline-none bg-transparent"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <input
                        type="text"
                        className="w-full outline-none bg-transparent"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <input
                        type="text"
                        className="w-full outline-none bg-transparent"
                        placeholder=""
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <input
                        type="text"
                        className="w-full outline-none bg-transparent"
                        placeholder=""
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Attendance Summary
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center">
              <label className="text-gray-700 font-medium mr-4 whitespace-nowrap">
                Total Days:
              </label>
              <input
                type="text"
                className="flex-1 border-b-2 border-gray-400 focus:border-orange-500 outline-none py-2"
                placeholder=""
              />
            </div>
            <div className="flex items-center">
              <label className="text-gray-700 font-medium mr-4 whitespace-nowrap">
                Present:
              </label>
              <input
                type="text"
                className="flex-1 border-b-2 border-gray-400 focus:border-orange-500 outline-none py-2"
                placeholder=""
              />
            </div>
            <div className="flex items-center">
              <label className="text-gray-700 font-medium mr-4 whitespace-nowrap">
                Absent:
              </label>
              <input
                type="text"
                className="flex-1 border-b-2 border-gray-400 focus:border-orange-500 outline-none py-2"
                placeholder=""
              />
            </div>
          </div>
        </div>

        {/* Supervisor's Signature */}
        <div className="mt-12 flex justify-end">
          <div className="text-center">
            <div className="border-b-2 border-gray-400 w-48 mb-2"></div>
            <p className="text-gray-700 font-medium">Supervisor's Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
}