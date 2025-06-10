'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', response.status, errorData); // Log API error details
        setMessages(prev => [...prev, { role: 'assistant', content: `API Hatası: ${errorData.error || 'Bilinmeyen bir hata oluştu.'}` }]);
      } else {
        const data = await response.json();
        const assistantMessage: Message = { role: 'assistant', content: data.response };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Fetch Error:', error); // Log fetch errors
      setMessages(prev => [...prev, { role: 'assistant', content: 'Mesaj gönderilirken bir hata oluştu.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-light-beige-brown rounded-2xl shadow-lg flex flex-col overflow-hidden relative">
      <div className="p-4 bg-dark-grey-blue text-white font-semibold text-center rounded-t-2xl">LumeAI Asistanı</div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-light-beige-brown pb-20">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 shadow-sm ${
                message.role === 'user'
                  ? 'bg-muted-purplish-brown text-white rounded-3xl rounded-br-none'
                  : 'bg-white text-gray-800 rounded-3xl rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 shadow-sm">
              Düşünüyor...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-[#dddad5] p-2 rounded-full shadow-md mx-4 mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1 outline-none bg-[#dddad5] text-gray-800 px-2"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-muted-purplish-brown text-white rounded-full p-2 hover:bg-muted-purplish-brown/80 focus:outline-none disabled:opacity-50 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.874L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}