
import { useState } from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '../teacher_components/layout/DashboardLayout';
import { MessageList } from '../teacher_components/Messages/MessageList';
import { MessageThread } from '../teacher_components/Messages/MessageThread';
import { ComposeArea } from '../teacher_components/Messages/ComposeArea';

const mockConversations = [
  {
    id: '1',
    studentName: 'Emma Johnson',
    studentAvatar: 'EJ',
    lastMessage: 'Thank you for the feedback on my essay!',
    timestamp: new Date(2025, 11, 26, 10, 30),
    unread: true,
    subject: 'Essay Feedback'
  },
  {
    id: '2',
    studentName: 'Michael Chen',
    studentAvatar: 'MC',
    lastMessage: 'Can we schedule a meeting to discuss my grade?',
    timestamp: new Date(2025, 11, 26, 9, 15),
    unread: true,
    subject: 'Grade Discussion'
  },
  {
    id: '3',
    studentName: 'Sarah Williams',
    studentAvatar: 'SW',
    lastMessage: 'I submitted the homework. Please let me know if you received it.',
    timestamp: new Date(2025, 11, 25, 16, 45),
    unread: false,
    subject: 'Homework Submission'
  },
  {
    id: '4',
    studentName: 'James Martinez',
    studentAvatar: 'JM',
    lastMessage: 'Will there be a review session before the exam?',
    timestamp: new Date(2025, 11, 25, 14, 20),
    unread: false,
    subject: 'Exam Preparation'
  },
  {
    id: '5',
    studentName: 'Olivia Brown',
    studentAvatar: 'OB',
    lastMessage: 'Thank you for your help with the assignment.',
    timestamp: new Date(2025, 11, 24, 11, 30),
    unread: false,
    subject: 'Assignment Help'
  }
];

const mockMessages = {
  '1': [
    {
      id: 'm1',
      senderId: '1',
      senderName: 'Emma Johnson',
      text: 'Hello, I had a question about the essay assignment.',
      timestamp: new Date(2025, 11, 25, 14, 0),
      isTeacher: false
    },
    {
      id: 'm2',
      senderId: 'teacher',
      senderName: 'You',
      text: 'Hi Emma! Of course, what would you like to know?',
      timestamp: new Date(2025, 11, 25, 14, 15),
      isTeacher: true
    },
    {
      id: 'm3',
      senderId: '1',
      senderName: 'Emma Johnson',
      text: 'I wanted to clarify the citation format we should use.',
      timestamp: new Date(2025, 11, 25, 14, 20),
      isTeacher: false
    },
    {
      id: 'm4',
      senderId: 'teacher',
      senderName: 'You',
      text: 'Please use MLA format for this assignment. Make sure to include a works cited page as well.',
      timestamp: new Date(2025, 11, 25, 14, 25),
      isTeacher: true
    },
    {
      id: 'm5',
      senderId: '1',
      senderName: 'Emma Johnson',
      text: 'Thank you for the feedback on my essay!',
      timestamp: new Date(2025, 11, 26, 10, 30),
      isTeacher: false
    }
  ],
  '2': [
    {
      id: 'm6',
      senderId: '2',
      senderName: 'Michael Chen',
      text: 'Hi, I received my test results and was hoping to discuss them with you.',
      timestamp: new Date(2025, 11, 26, 9, 0),
      isTeacher: false
    },
    {
      id: 'm7',
      senderId: '2',
      senderName: 'Michael Chen',
      text: 'Can we schedule a meeting to discuss my grade?',
      timestamp: new Date(2025, 11, 26, 9, 15),
      isTeacher: false
    }
  ]
};

export default function App() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const [showSidebar, setShowSidebar] = useState(false);
const [showMessageList, setShowMessageList] = useState(true);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowMessageList(false);
  };

  const handleBackToList = () => {
    setShowMessageList(true);
    setSelectedConversation(null);
  };

  const handleSendMessage = (text) => {
    if (!selectedConversation || !text.trim()) return;

    const newMessage = {
      id: `m${Date.now()}`,
      senderId: 'teacher',
      senderName: 'You',
      text,
      timestamp: new Date(),
      isTeacher: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [
        ...(prev[selectedConversation.id] || []),
        newMessage
      ]
    }));

    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, lastMessage: text, timestamp: new Date(), unread: false }
          : conv
      )
    );
  };

  return (
    <DashboardLayout pageTitle="Messages">
    <div className="max-h-[92vh] flex" style={{ backgroundColor: '#0e2038' }}>
      {/* Navigation Sidebar */}

      {/* Mobile Header */}
      {/* <div className="lg:hidden fixed top-0 left-0 right-0 z-40 p-4 flex items-center gap-3" style={{ backgroundColor: '#0e2038' }}>
        <button
          onClick={() => setShowSidebar(true)}
          className="text-white p-2"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl">Messages</h1>
      </div> */}

      {/* Message List Panel */}
      <div 
        className={`w-full lg:w-96 bg-white border-r flex flex-col ${
          showMessageList ? 'block' : 'hidden lg:flex'
        }`}
        style={{ borderColor: '#e5e7eb' }}
      >
        <div className="pt-20 max-sm:pt-10 lg:pt-0 flex-1 flex flex-col overflow-hidden">
          <MessageList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
          />
        </div>
      </div>

      {/* Main Content */}
      <div 
        className={`flex-1 flex flex-col bg-white sticky ${
          !showMessageList ? 'block' : 'hidden lg:flex'
        }`}
      >
        {selectedConversation ? (
          <>
            {/* Back to Messages List Button */}
            {/* <div className="p-3 sm:p-4 border-b bg-white" style={{ borderColor: '#e5e7eb' }}>
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Back to Messages List</span>
              </button>
            </div> */}

            {/* Header */}
            <div className="p-3 sm:p-4 lg:p-6 border-b flex gap-4 " style={{ backgroundColor: '#0e2038', borderColor: '#1a3a5c' }}>
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-white hover:text-yellow-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                {/* <span className="text-xs sm:text-sm">Back to Messages List</span> */}
              </button>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white text-xs sm:text-sm lg:text-base flex-shrink-0"
                  style={{ backgroundColor: '#1a3a5c' }}
                >
                  {selectedConversation.studentAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white text-sm sm:text-base lg:text-xl truncate">{selectedConversation.studentName}</h2>
                  {selectedConversation.subject && (
                    <p className="text-white/70 text-xs sm:text-sm truncate">{selectedConversation.subject}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <MessageThread
              messages={messages[selectedConversation.id] || []}
            />

            {/* Compose Area */}
            <ComposeArea onSend={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 px-4 text-center">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
}
