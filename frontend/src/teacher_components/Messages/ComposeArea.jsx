import { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

export function ComposeArea({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t p-4" style={{ borderColor: '#e5e7eb' }}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-end gap-2 lg:gap-3">
          <button
            type="button"
            className="hidden sm:block p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full px-3 py-2 lg:px-4 lg:py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 text-sm lg:text-base"
              style={{ 
                borderColor: '#e5e7eb',
                '--tw-ring-color': '#0e2038'
              }}
              rows={1}
            />
          </div>

          <button
            type="button"
            className="hidden sm:block p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Add emoji"
          >
            <Smile className="w-5 h-5" />
          </button>

          <button
            type="submit"
            className="px-4 py-2 lg:px-6 lg:py-3 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: '#0e2038' }}
            disabled={!message.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}