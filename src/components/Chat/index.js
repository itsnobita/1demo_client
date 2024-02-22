import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([inputValue, ...messages]);
      setInputValue('');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          flex: 1,
          overflowY: 'scroll',
          padding: '10px',
          borderBottom: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column-reverse', // Reverse the order of the messages
        }}
      >
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: '8px', marginRight: '8px', border: '1px solid #ccc' }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: '8px', backgroundColor: '#4caf50', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
