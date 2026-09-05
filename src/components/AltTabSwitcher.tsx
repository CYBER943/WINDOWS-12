import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore, APPS } from '../store/useStore';
import { Icon } from './ui/Icon';
import { cn } from '../lib/utils';

export const AltTabSwitcher: React.FC = () => {
  const { windows, activeDesktopId, focusWindow } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [altPressed, setAltPressed] = useState(false);

  // Only consider unminimized windows on the current desktop, sorted by zIndex (most recent first)
  const currentWindows = useMemo(() => {
    return windows
      .filter(w => w.desktopId === activeDesktopId && !w.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex);
  }, [windows, activeDesktopId, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setAltPressed(true);
      }
      
      if (e.key === 'Tab' && e.altKey) {
        e.preventDefault(); // Prevent native alt-tab (browser usually blocks this, but just in case, or for custom shortcuts)
        
        if (currentWindows.length === 0) return;
        
        if (!isOpen) {
          setIsOpen(true);
          setSelectedIndex(currentWindows.length > 1 ? 1 : 0);
        } else {
          setSelectedIndex((prev) => (e.shiftKey ? (prev - 1 + currentWindows.length) % currentWindows.length : (prev + 1) % currentWindows.length));
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setAltPressed(false);
        if (isOpen) {
          setIsOpen(false);
          const selectedWindow = currentWindows[selectedIndex];
          if (selectedWindow) {
            focusWindow(selectedWindow.id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // If alt is lost (e.g. window blur)
    const handleBlur = () => {
      if (isOpen) {
        setAltPressed(false);
        setIsOpen(false);
      }
    };
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isOpen, selectedIndex, currentWindows, focusWindow]);

  if (!isOpen || currentWindows.length === 0) return null;

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="bg-white/40 dark:bg-black/60 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-2xl flex max-w-4xl flex-wrap justify-center gap-4 pointer-events-auto"
      >
        {currentWindows.map((w, idx) => {
          const app = APPS.find(a => a.id === w.appId);
          if (!app) return null;
          
          const isSelected = idx === selectedIndex;

          return (
            <div 
              key={w.id} 
              className={cn(
                "flex flex-col items-center p-4 rounded-xl transition-all duration-200 w-40",
                isSelected ? "bg-white/30 dark:bg-white/10 shadow-lg ring-2 ring-blue-500/50" : "bg-transparent opacity-70"
              )}
            >
              <div className="w-full aspect-video bg-white/20 dark:bg-black/40 rounded-lg mb-3 border border-white/10 dark:border-white/5 flex items-center justify-center shadow-inner relative overflow-hidden">
                <Icon name={app.icon as any} size={32} className="text-gray-800 dark:text-gray-200 z-10 drop-shadow-md" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center truncate w-full">
                {w.title}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
