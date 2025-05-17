import React, { useState, useEffect, useRef } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { from: 'admin', text: 'Welcome to support chat!', time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: 'mentor', text: input.trim(), time: new Date() }]);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '400px',
        background: '#1e1e1e',
        color: 'white',
        borderRadius: '8px',
        padding: '10px',
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '10px',
          paddingRight: '5px',
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.from === 'admin' ? 'left' : 'right',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: msg.from === 'admin' ? '#444' : '#0084ff',
                padding: '8px 12px',
                borderRadius: '15px',
                maxWidth: '70%',
                wordWrap: 'break-word',
              }}
            >
              {msg.text}
            </div>
            <div style={{ fontSize: '10px', color: '#aaa', marginTop: '2px' }}>
              {msg.time.toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '5px 0 0 5px',
            border: 'none',
            outline: 'none',
          }}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '8px 15px',
            backgroundColor: '#0084ff',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '0 5px 5px 0',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
