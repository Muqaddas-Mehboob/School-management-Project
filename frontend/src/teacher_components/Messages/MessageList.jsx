
import { Search } from 'lucide-react';
import { useState } from 'react';

export function MessageList({ conversations, selectedConversation, onSelectConversation }) {
  const [searchvalue, setsearchvalue] = useState("")
   const filtered = conversations.filter(item =>
    item.studentName.toLowerCase().includes(searchvalue.toLowerCase())
  );
  const formatTime = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${Math.floor(hours)}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden max-w-[98vw]">
      {/* Search */}
      <div className="p-4 border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={searchvalue}
            onChange={(e) => setsearchvalue(e.target.value)}
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: '#e5e7eb', '--tw-ring-color': '#0e2038' }}
          />
        </div>

      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filtered && filtered.map(conversation => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className="w-full p-4 border-b hover:bg-gray-50 transition-colors text-left"
            style={{
              borderColor: '#e5e7eb',
              backgroundColor: selectedConversation?.id === conversation.id ? '#f0f4f8' : undefined
            }}
          >
            <div className="flex gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                style={{ backgroundColor: '#0e2038' }}
              >
                {conversation.studentAvatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-gray-900 truncate pr-2">
                    {conversation.studentName}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {formatTime(conversation.timestamp)}
                  </span>
                </div>
                {conversation.subject && (
                  <p className="text-xs mb-1" style={{ color: '#0e2038' }}>
                    {conversation.subject}
                  </p>
                )}
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread && (
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                  style={{ backgroundColor: '#0e2038' }}
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}