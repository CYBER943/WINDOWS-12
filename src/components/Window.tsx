import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { useStore, APPS } from '../store/useStore';
import { X, Minus, Maximize, Minimize2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '../lib/utils';
import { NotepadApp } from './apps/NotepadApp';
import { CalculatorApp } from './apps/CalculatorApp';
import { BrowserApp } from './apps/BrowserApp';
import { SettingsApp } from './apps/SettingsApp';
import { ExplorerApp } from './apps/ExplorerApp';
import { TerminalApp } from './apps/TerminalApp';
import { PaintApp } from './apps/PaintApp';
import { AssistantApp } from './apps/AssistantApp';
import { TaskManagerApp } from './apps/TaskManagerApp';
import { CodeEditorApp } from './apps/CodeEditorApp';

const AppComponents: Record<string, React.FC<{ windowId: string }>> = {
  NotepadApp,
  CalculatorApp,
  BrowserApp,
  SettingsApp,
  ExplorerApp,
  TerminalApp,
  PaintApp,
  AssistantApp,
  TaskManagerApp,
  CodeEditorApp
};

interface WindowProps {
  id: string;
}

export const Window: React.FC<WindowProps> = ({ id }) => {
  const windowState = useStore((state) => state.windows.find((w) => w.id === id));
  const { 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    focusWindow,
    updateWindowPosition,
    updateWindowSize
  } = useStore();
  
  const windowRef = useRef<HTMLDivElement>(null);
  const dragConstraintsRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    dragConstraintsRef.current = document.getElementById('desktop-area') as HTMLDivElement;
  }, []);

  if (!windowState) return null;

  const app = APPS.find(a => a.id === windowState.appId);
  if (!app) return null;

  const AppComponent = AppComponents[app.component];
  const Icon = (LucideIcons as Record<string, React.ElementType>)[app.icon];

  const handleDragEnd = (e: any, info: any) => {
    const newX = windowState.x + info.offset.x;
    const newY = windowState.y + info.offset.y;
    
    // Snap zones
    const threshold = 15;
    if (info.point.x < threshold) {
      // Snap Left
      updateWindowPosition(id, 0, 0);
      updateWindowSize(id, window.innerWidth / 2, window.innerHeight - 48);
      if (windowState.isMaximized) maximizeWindow(id);
    } else if (info.point.x > window.innerWidth - threshold) {
      // Snap Right
      updateWindowPosition(id, window.innerWidth / 2, 0);
      updateWindowSize(id, window.innerWidth / 2, window.innerHeight - 48);
      if (windowState.isMaximized) maximizeWindow(id);
    } else if (info.point.y < threshold) {
      // Snap Top (Maximize)
      if (!windowState.isMaximized) maximizeWindow(id);
    } else {
      updateWindowPosition(id, newX, newY);
    }
  };

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: windowState.isMinimized ? 0 : 1, 
        scale: windowState.isMinimized ? 0.9 : 1,
        x: windowState.isMaximized ? 0 : windowState.x,
        y: windowState.isMaximized ? 0 : windowState.y,
        width: windowState.isMaximized ? '100%' : windowState.width,
        height: windowState.isMaximized ? '100%' : windowState.height,
        pointerEvents: windowState.isMinimized ? 'none' : 'auto',
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", bounce: 0.1, duration: 0.3 }}
      style={{ zIndex: windowState.zIndex }}
      className={cn(
        "absolute rounded-xl overflow-hidden flex flex-col shadow-2xl border border-white/10",
        "bg-white/70 dark:bg-black/70 backdrop-blur-2xl",
        windowState.isMaximized ? "rounded-none !top-0 !left-0 border-none" : ""
      )}
      onMouseDown={() => focusWindow(id)}
      drag={!windowState.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, left: 0, right: window.innerWidth - windowState.width, bottom: window.innerHeight - windowState.height - 48 }}
      dragElastic={0}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
    >
      {/* Title Bar */}
      <div 
        className={cn(
          "h-10 flex items-center justify-between px-3 select-none",
          "bg-white/30 dark:bg-black/30 backdrop-blur-md border-b border-white/10 cursor-grab active:cursor-grabbing",
          windowState.isFocused ? "bg-white/50 dark:bg-black/50" : ""
        )}
        onPointerDown={(e) => {
           if (windowState.isMaximized) return;
           dragControls.start(e);
        }}
        onDoubleClick={() => maximizeWindow(id)}
      >
        <div className="flex items-center gap-2 pointer-events-none">
          {Icon && <Icon size={16} className="text-gray-700 dark:text-gray-300" />}
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{windowState.title}</span>
        </div>
        
        {/* Window Controls */}
        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300"
          >
            <Minus size={16} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300"
          >
            {windowState.isMaximized ? <Minimize2 size={14} /> : <Maximize size={14} />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-500 hover:text-white transition-colors text-gray-700 dark:text-gray-300"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="flex-1 overflow-auto relative bg-white/50 dark:bg-black/50" onPointerDown={(e) => e.stopPropagation()}>
        {AppComponent ? <AppComponent windowId={id} /> : <div className="p-4 text-white">App Content</div>}
      </div>
      
      {/* Simple Resize Handle */}
      {!windowState.isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onPointerDown={(e) => {
            e.stopPropagation();
            // Implement simple resize logic here or use a library. 
            // For simplicity, omitting manual resize implementation in this concept 
            // but providing the visual indicator.
          }}
        />
      )}
    </motion.div>
  );
};
