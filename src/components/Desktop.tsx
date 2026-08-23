import React, { useState } from 'react';
import { useStore, APPS } from '../store/useStore';
import { Window } from './Window';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './ui/Icon';
import { cn } from '../lib/utils';

export const Desktop: React.FC = () => {
  const { windows, closeMenus, settings, openApp, snapPreview } = useStore();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  // Calculate snap preview bounds
  let snapStyle = {};
  if (snapPreview === 'left') snapStyle = { left: 8, top: 8, bottom: '56px', width: 'calc(50% - 12px)' };
  if (snapPreview === 'right') snapStyle = { right: 8, top: 8, bottom: '56px', width: 'calc(50% - 12px)' };
  if (snapPreview === 'top') snapStyle = { left: 8, right: 8, top: 8, bottom: '56px' };

  const desktopIcons = [
    { id: 'this-pc', name: 'This PC', icon: 'Desktop', appId: 'explorer' },
    { id: 'settings', name: 'Settings', icon: 'Settings', appId: 'settings' },
    { id: 'about', name: 'About Windows 12', icon: 'CircleHelp', appId: 'notepad' },
    { id: 'edge', name: 'Microsoft Edge', icon: 'Browser', appId: 'edge' },
    { id: 'feedback', name: 'Feedback', icon: 'MessageSquare', appId: 'notepad' },
  ];

  return (
    <div 
      className="absolute inset-0 overflow-hidden" 
      onClick={() => {
        closeMenus();
        setSelectedIcon(null);
      }}
      id="desktop-area"
      style={{
        backgroundImage: `url(${settings.wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Desktop Icons Area */}
      <div className="absolute inset-0 p-2 flex flex-col flex-wrap gap-2 content-start z-0">
        {desktopIcons.map(icon => (
          <div
            key={icon.id}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(icon.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (icon.appId) {
                openApp(icon.appId);
              }
            }}
            className={cn(
              "w-24 h-28 flex flex-col items-center justify-start gap-2 p-2 rounded-xl cursor-default transition-all duration-200 group",
              selectedIcon === icon.id ? "bg-white/20 shadow-sm" : "hover:bg-white/10"
            )}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-blue-500 shadow-md group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
              <Icon name={icon.icon as any} size={32} className="text-white drop-shadow-sm" />
            </div>
            <span className="text-xs text-white text-center break-words w-full drop-shadow-md select-none line-clamp-2 font-medium">
              {icon.name}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {snapPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 bg-white/20 dark:bg-white/10 backdrop-blur-md border-2 border-white/40 dark:border-white/20 rounded-xl pointer-events-none"
            style={snapStyle}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {windows.map((window) => (
          <Window key={window.id} id={window.id} />
        ))}
      </AnimatePresence>
    </div>
  );
};

