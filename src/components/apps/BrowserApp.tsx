import React, { useState } from 'react';
import { Icon } from '../ui/Icon';

export const BrowserApp: React.FC<{ windowId: string }> = () => {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [inputUrl, setInputUrl] = useState('https://www.wikipedia.org');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputUrl;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    setUrl(finalUrl);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#202020]">
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-white/10 bg-[#f1f1f1] dark:bg-[#2d2d2d]">
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
            <Icon name="ArrowLeft" size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 opacity-50">
            <Icon name="ArrowRight" size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
            <Icon name="Restart" size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
            <Icon name="Home" size={16} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 relative flex items-center">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full h-8 pl-8 pr-8 rounded-full bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-white/10 focus:border-blue-500 focus:outline-none text-sm dark:text-white"
          />
          <Icon name="Search" size={14} className="absolute left-3 text-gray-400" />
          <Icon name="Star" size={14} className="absolute right-3 text-gray-400" />
        </form>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white relative">
        {/* We use an iframe but restrict it. Note many modern sites block iframes via X-Frame-Options */}
        <iframe 
          src={url}
          className="absolute inset-0 w-full h-full border-none"
          title="Browser"
          sandbox="allow-same-origin allow-scripts allow-forms"
        />
      </div>
    </div>
  );
};
