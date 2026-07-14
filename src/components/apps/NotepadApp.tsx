import React, { useState, useEffect } from 'react';
import { FileText, Save } from 'lucide-react';
import { set, get } from 'idb-keyval';

export const NotepadApp: React.FC<{ windowId: string }> = () => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    get('notepad-content').then(val => {
      if (val) setContent(val);
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await set('notepad-content', content);
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#202020] text-gray-900 dark:text-gray-100">
      <div className="flex items-center gap-2 p-1 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#2d2d2d]">
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors"
        >
          <Save size={16} className={isSaving ? 'text-green-500' : ''} />
          {isSaving ? 'Saved' : 'Save'}
        </button>
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1" />
        <span className="text-xs text-gray-500">Auto-saves to IndexedDB</span>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 w-full p-4 resize-none focus:outline-none bg-transparent"
        placeholder="Start typing..."
        spellCheck="false"
      />
    </div>
  );
};
