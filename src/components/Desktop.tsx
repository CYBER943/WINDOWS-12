import React, { useState, useRef } from 'react';
import { useStore, APPS } from '../store/useStore';
import { Window } from './Window';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Icon } from './ui/Icon';
import { cn } from '../lib/utils';

export const Desktop: React.FC = () => {
  const { windows, closeMenus, settings, openApp, snapPreview, fileSystem, moveFile } = useStore();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, draggedId: string) => {
    if (!containerRef.current) return;
    
    // Find if we dropped on a folder
    const folderElements = containerRef.current.querySelectorAll('[data-folder-id]');
    
    // Basic collision detection
    for (const el of Array.from(folderElements)) {
      const rect = el.getBoundingClientRect();
      const dropX = info.point.x;
      const dropY = info.point.y;
      
      const targetFolderId = el.getAttribute('data-folder-id');
      
      if (
        dropX >= rect.left && 
        dropX <= rect.right && 
        dropY >= rect.top && 
        dropY <= rect.bottom &&
        targetFolderId &&
        targetFolderId !== draggedId
      ) {
        // Move the file
        moveFile(draggedId, targetFolderId);
        break;
      }
    }
  };

  // Calculate snap preview bounds
  let snapStyle = {};
  if (snapPreview === 'left') snapStyle = { left: 8, top: 8, bottom: '56px', width: 'calc(50% - 12px)' };
  if (snapPreview === 'right') snapStyle = { right: 8, top: 8, bottom: '56px', width: 'calc(50% - 12px)' };
  if (snapPreview === 'top') snapStyle = { left: 8, right: 8, top: 8, bottom: '56px' };

  const desktopItems = fileSystem.filter(f => f.parentId === 'desktop');

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
      <div className="absolute inset-0 p-2 flex flex-col flex-wrap gap-2 content-start z-0 pointer-events-none" ref={containerRef}>
        {desktopItems.map(icon => (
          <motion.div
            key={icon.id}
            drag
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd(e, info, icon.id)}
            data-folder-id={icon.type === 'folder' ? icon.id : undefined}
            className={cn(
              "w-24 h-28 flex flex-col items-center justify-start gap-2 p-2 rounded-xl cursor-default transition-colors duration-200 group pointer-events-auto",
              selectedIcon === icon.id ? "bg-white/20 shadow-sm" : "hover:bg-white/10"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(icon.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (icon.appId) {
                openApp(icon.appId);
              } else if (icon.type === 'folder') {
                openApp('explorer'); // In the future, pass folder ID to explorer
              } else if (icon.type === 'file') {
                openApp('notepad'); // Open files in notepad for now
              }
            }}
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-200 flex items-center justify-center",
              icon.type === 'folder' ? "bg-transparent shadow-none" : "bg-gradient-to-tr from-purple-500 to-blue-500"
            )}>
              <Icon 
                name={icon.icon ? (icon.icon as any) : icon.type === 'folder' ? 'Folder' : 'File'} 
                size={icon.type === 'folder' ? 56 : 32} 
                className={cn(
                  "drop-shadow-sm", 
                  icon.type === 'folder' ? "text-blue-400 fill-blue-400/20" : "text-white"
                )} 
              />
            </div>
            <span className="text-xs text-white text-center break-words w-full drop-shadow-md select-none line-clamp-2 font-medium">
              {icon.name}
            </span>
          </motion.div>
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
        {windows
          .filter(window => window.desktopId === useStore.getState().activeDesktopId)
          .map((window) => (
            <Window key={window.id} id={window.id} />
        ))}
      </AnimatePresence>
    </div>
  );
};

