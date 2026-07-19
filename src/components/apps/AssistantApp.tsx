import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../ui/Icon';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export const AssistantApp: React.FC<{ windowId: string }> = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Hi! I am Copilot+, powered by Agentic AI. I can search your Smart Recall timeline, adjust PC settings, or help with tasks across your apps. What can I do for you?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock response
    setTimeout(() => {
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'bot', 
        text: `I'm a concept assistant, so I can't actually do much yet, but I heard you say: "${userMsg.text}"` 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
            <Icon name="Assistant" size={24} />
          </div>
          <div>
            <h2 className="font-semibold text-lg leading-tight">Copilot+</h2>
            <p className="text-xs text-gray-500">Agentic AI & Smart Recall</p>
          </div>
        </div>
        <button 
          onClick={() => useStore.getState().openApp('timeline')}
          className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-3 py-1.5 rounded-full font-semibold border border-purple-200 dark:border-purple-800 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
        >
          Search Timeline
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-tr from-blue-500 to-purple-500'}`}>
                {msg.sender === 'user' ? <Icon name="User" size={16} className="text-white" /> : <Icon name="Assistant" size={16} className="text-white" />}
              </div>
              <div 
                className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm shadow-md' 
                    : 'bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-white/10 rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/50 dark:bg-black/20 backdrop-blur-md border-t border-gray-200 dark:border-white/10">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full h-12 pl-4 pr-24 rounded-full bg-white dark:bg-[#2d2d2d] border border-gray-300 dark:border-white/20 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm transition-all"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <button type="button" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 transition-colors">
              <Icon name="Mic" size={18} />
            </button>
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
            >
              <Icon name="Send" size={16} className="-ml-0.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
