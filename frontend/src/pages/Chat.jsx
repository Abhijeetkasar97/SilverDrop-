import React, { useState, useRef, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'mentor', text: 'Hello! How can I help you today?' },
    { id: 2, sender: 'student', text: 'I have a question about React hooks.' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: 'mentor', text: input.trim() },
    ]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '24px auto',
        border: '1px solid #ddd',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
      }}
    >
      <header
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid #ddd',
          fontWeight: 'bold',
          fontSize: 18,
          backgroundColor: '#3182ce',
          color: 'white',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        Chat with Mentor
      </header>

      <div
        style={{
          flex: 1,
          padding: 20,
          overflowY: 'auto',
          backgroundColor: '#f7fafc',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {messages.map(({ id, sender, text }) => (
          <div
            key={id}
            style={{
              alignSelf: sender === 'mentor' ? 'flex-start' : 'flex-end',
              backgroundColor: sender === 'mentor' ? '#bee3f8' : '#90cdf4',
              color: '#1a202c',
              padding: '10px 14px',
              borderRadius: 16,
              maxWidth: '70%',
              wordBreak: 'break-word',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{
          display: 'flex',
          padding: '12px 20px',
          borderTop: '1px solid #ddd',
          backgroundColor: 'white',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          style={{
            flex: 1,
            resize: 'none',
            borderRadius: 16,
            border: '1px solid #ccc',
            padding: '8px 12px',
            fontSize: 14,
            fontFamily: 'inherit',
            outline: 'none',
            marginRight: 12,
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: 16,
            padding: '8px 16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
