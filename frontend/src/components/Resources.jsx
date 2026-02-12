import React, { useState } from 'react';
import { BookOpen, Download, FileText, Video, FileImage, Folder, Search } from 'lucide-react';

export function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Calculus Chapter 5 - Derivatives',
      subject: 'Mathematics',
      type: 'notes',
      size: '2.4 MB',
      uploadDate: 'Feb 8, 2026',
      teacher: 'Mr. Anderson',
      downloads: 45,
    },
    {
      id: 2,
      title: 'Newton\'s Laws of Motion - Lecture Recording',
      subject: 'Physics',
      type: 'video',
      size: '156 MB',
      uploadDate: 'Feb 7, 2026',
      teacher: 'Dr. Williams',
      duration: '42:30',
    },
    {
      id: 3,
      title: 'Organic Chemistry Reactions - Presentation',
      subject: 'Chemistry',
      type: 'presentation',
      size: '8.5 MB',
      uploadDate: 'Feb 6, 2026',
      teacher: 'Dr. Brown',
      slides: 35,
    },
    {
      id: 4,
      title: 'Shakespeare\'s Hamlet - Analysis Notes',
      subject: 'English Literature',
      type: 'notes',
      size: '1.8 MB',
      uploadDate: 'Feb 5, 2026',
      teacher: 'Ms. Parker',
      downloads: 67,
    },
    {
      id: 5,
      title: 'World War II - Documentary Video',
      subject: 'History',
      type: 'video',
      size: '230 MB',
      uploadDate: 'Feb 4, 2026',
      teacher: 'Mr. Davis',
      duration: '58:15',
    },
    {
      id: 6,
      title: 'Cell Biology - Study Guide',
      subject: 'Biology',
      type: 'notes',
      size: '3.2 MB',
      uploadDate: 'Feb 3, 2026',
      teacher: 'Dr. Martinez',
      downloads: 52,
    },
  ];

  const getResourceIcon = (type) => {
    switch (type) {
      case 'notes':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'presentation':
        return <FileImage className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || resource.type === filterType;
    return matchesSearch && matchesType;
  });

  const recentlyAccessed = [
    { title: 'Calculus Chapter 5', subject: 'Mathematics', date: 'Today' },
    { title: 'Physics Lab Manual', subject: 'Physics', date: 'Yesterday' },
    { title: 'Chemistry Notes', subject: 'Chemistry', date: '2 days ago' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0e2038]">
          Learning Resources
        </h1>
        <p className="text-[9px] xs:text-xs sm:text-sm text-gray-600 mt-1">
          Access notes, presentations, recorded lectures, and study materials
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base focus:ring-2 focus:ring-[#ff9900] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'all', label: 'All' },
              { id: 'notes', label: 'Notes' },
              { id: 'videos', label: 'Videos' },
              { id: 'presentations', label: 'Presentations' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterType(filter.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm md:text-base font-medium whitespace-nowrap transition-colors ${
                  filterType === filter.id
                    ? 'bg-[#ff9900] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Resources List */}
        <div className="lg:col-span-3 space-y-4">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-[#ff9900] transition-colors"
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-gray-50 rounded-lg">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] mb-1">
                      {resource.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-[9px] xs:text-xs sm:text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Folder className="w-3 h-3" />
                        {resource.subject}
                      </span>
                      <span>•</span>
                      <span>{resource.teacher}</span>
                      <span>•</span>
                      <span>{resource.uploadDate}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[9px] xs:text-xs sm:text-sm text-gray-500">
                      <span>Size: {resource.size}</span>
                      {resource.duration && <span>Duration: {resource.duration}</span>}
                      {resource.slides && <span>{resource.slides} slides</span>}
                      {resource.downloads && <span>{resource.downloads} downloads</span>}
                    </div>
                  </div>
                  <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-[#ff9900] text-white rounded-lg hover:bg-[#e68a00] transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs sm:text-sm md:text-base">
                      Download
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Recently Accessed */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038]">
                Recently Accessed
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {recentlyAccessed.map((item, index) => (
                <div key={index} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-[#0e2038] mb-1">
                    {item.title}
                  </p>
                  <p className="text-[9px] xs:text-xs text-gray-600">{item.subject}</p>
                  <p className="text-[9px] xs:text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] mb-4">
              Resource Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Total Resources</span>
                <span className="text-xs sm:text-sm md:text-base font-bold text-[#0e2038]">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600">Downloaded</span>
                <span className="text-xs sm:text-sm md:text-base font-bold text-[#ff9900]">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600">New This Week</span>
                <span className="text-xs sm:text-sm md:text-base font-bold text-green-600">12</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#0e2038] mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-[10px] xs:text-xs sm:text-sm transition-colors">
                📚 Browse by Subject
              </button>
              <button className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-[10px] xs:text-xs sm:text-sm transition-colors">
                🎥 Video Library
              </button>
              <button className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-[10px] xs:text-xs sm:text-sm transition-colors">
                📖 Study Guides
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
