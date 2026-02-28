import { useEffect, useRef } from 'react';

export function MessageThread({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatMessageTime = (date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex-1 overflow-y-auto max-h-[60vh] p-4 lg:p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.isTeacher ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] lg:max-w-xl ${message.isTeacher ? 'order-2' : 'order-1'}`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="text-sm"
                  style={{ color: message.isTeacher ? '#0e2038' : '#6b7280' }}
                >
                  {message.senderName}
                </span>
                <span className="text-xs text-gray-400 hidden sm:inline">
                  {formatMessageTime(message.timestamp)}
                </span>
              </div>
              <div
                className="rounded-lg px-3 py-2 lg:px-4 lg:py-3"
                style={{
                  backgroundColor: message.isTeacher ? '#0e2038' : '#f3f4f6',
                  color: message.isTeacher ? 'white' : '#1f2937'
                }}
              >
                <p>{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}