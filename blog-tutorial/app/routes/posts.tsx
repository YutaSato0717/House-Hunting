import React, { useState } from 'react';
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
function Posts() {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      setMessages([...messages, messageInput]);
      setMessageInput('');
    }
  };

  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ position: 'fixed', top: '0', width: '100%', background: 'rgba(254,204,27,0.5)', textAlign: 'center', padding: '10px', borderBottom: '1px solid #000' }}>
        <h1 style={{ fontSize: '3rem', textTransform: 'uppercase', textShadow: '2px 2px #000' }}>
        <span className="block uppercase text-brock-500 drop-shadow-md letterspacing">
                掲示板
                </span>
        </h1>
      </div>
      <div style={{ marginTop: '60px', padding: '10px', width: '100%' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ border: '1px solid #0074d9', padding: '5px', marginBottom: '5px', width: '80%', textAlign: 'left' }}>
            {message}
          </div>
        ))}
      </div>
      <input
        type="text"
        id="message-input"
        placeholder="メッセージを入力"
        value={messageInput}
        onChange={handleMessageChange}
        style={{ marginBottom: '10px', padding: '5px', border: '1px solid #000' }}
      />
      <button style={{ padding: '5px', backgroundColor: '#0074d9', color: '#fff', border: '1px solid #0074d9', cursor: 'pointer' }} onClick={handleSendMessage}>
        送信
      </button>
    </div>

  );
}

export default Posts;