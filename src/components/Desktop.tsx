import React, { useState } from 'react';
import { useStore, APPS } from '../store/useStore';
import { Window } from './Window';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

export const Desktop: React.FC = () => {
  const { windows, closeMenus, settings, openApp } = useStore();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const desktopIcons = [
    { id: 'recycle', name: 'Recycle Bin', icon: Folder },
    { id: 'explorer', name: 'File Explorer', icon: Folder, appId: 'explorer' },
    { id: 'readme', name: 'readme.txt', icon: FileText, appId: 'notepad' },
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
              "w-20 h-24 flex flex-col items-center justify-start gap-1 p-1 rounded-sm cursor-default hover:bg-white/10 transition-colors",
              selectedIcon === icon.id ? "bg-white/20 border border-white/30" : "border border-transparent"
            )}
          >
            <icon.icon size={36} className="text-white drop-shadow-md mt-1" />
            <span className="text-xs text-white text-center break-words w-full drop-shadow-md select-none line-clamp-2">
              {icon.name}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {windows.map((window) => (
          <Window key={window.id} id={window.id} />
        ))}
      </AnimatePresence>
    </div>
  );
};

