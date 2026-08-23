import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './ui/Icon';

export const ClipboardManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<{ id: string; text: string; time: string }[]>([
    { id: '1', text: 'import { useState } from "react";', time: '2m ago' },
    { id: '2', text: 'https://github.com/microsoft', time: '1hr ago' },
    { id: '3', text: 'Meeting at 3 PM', time: 'Yesterday' }
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Simulate Win+V using Ctrl+Shift+V as typical browser shortcut replacement
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyV') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.code === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="fixed bottom-16 right-4 w-80 bg-white/70 dark:bg-[#1c1c1c]/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl z-[150] overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-white/10">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="Clipboard" size={16} className="text-blue-500" />
              Clipboard
            </h3>
            <button className="text-xs text-blue-500 hover:underline font-medium" onClick={() => setItems([])}>
              Clear all
            </button>
          </div>
          <div className="p-2 max-h-96 overflow-y-auto space-y-2">
            {items.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Icon name="Clipboard" size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Clipboard is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCopy(item.text)}
                  className="w-full p-3 bg-white dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl text-left transition-colors group relative"
                >
                  <p className="text-sm text-gray-900 dark:text-gray-100 line-clamp-2 mb-1 pr-6">{item.text}</p>
                  <span className="text-xs text-gray-500">{item.time}</span>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="Copy" size={14} className="text-gray-400" />
                  </div>
                </button>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
