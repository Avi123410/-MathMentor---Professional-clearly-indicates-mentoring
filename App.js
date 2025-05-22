import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message };
    setChatLog([...chatLog, userMessage]);
    setMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.answer };
      setChatLog(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: "Error: Unable to get response." };
      setChatLog(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Math Chatbot Tutor</h2>
      <div 
        style={{ 
          border: '1px solid #ccc', 
          padding: 10, 
          height: 400, 
          overflowY: 'scroll', 
          marginBottom: 10,
          backgroundColor: '#f9f9f9'
        }}
      >
        {chatLog.map((chat, index) => (
          <div 
            key={index} 
            style={{ 
              textAlign: chat.sender === 'user' ? 'right' : 'left', 
              margin: '10px 0' 
            }}
          >
            <span 
              style={{ 
                display: 'inline-block', 
                padding: 10, 
                borderRadius: 10, 
                backgroundColor: chat.sender === 'user' ? '#007bff' : '#e4e6eb', 
                color: chat.sender === 'user' ? 'white' : 'black',
                maxWidth: '80%'
              }}
            >
              {chat.text}
            </span>
          </div>
        ))}
      </div>
      <input 
        type="text" 
        placeholder="Ask a math question..." 
        value={message} 
        onChange={e => setMessage(e.target.value)} 
        onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }} 
        style={{ width: '80%', padding: 10, fontSize: 16 }}
      />
      <button onClick={sendMessage} style={{ padding: '10px 20px', marginLeft: 10 }}>Send</button>
    </div>
  );
}

export default App;
