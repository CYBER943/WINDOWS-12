import React, { useState, useEffect } from 'react';
import { useStore, APPS } from '../store/useStore';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { Icon } from './ui/Icon';
import { motion, AnimatePresence } from 'motion/react';

export const Taskbar: React.FC = () => {
  const { windows, openApp, toggleStartMenu, startMenuOpen, actionCenterOpen, toggleActionCenter, widgetsOpen, toggleWidgets, focusWindow, toggleTaskView } = useStore();
  const [time, setTime] = useState(new Date());
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);
  let hoverTimeout: any;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const openAppIds = windows.map(w => w.appId);
  const openApps = Array.from(new Set(openAppIds)).map(id => APPS.find(a => a.id === id)!);
  
  const pinnedAppIds = ['edge', 'explorer', 'settings', 'terminal', 'paint', 'assistant'];
  const allTaskbarAppIds = Array.from(new Set([...pinnedAppIds, ...openAppIds]));
  const allTaskbarApps = allTaskbarAppIds.map(id => APPS.find(a => a.id === id)!).filter(Boolean);

  return (
    <div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2 h-14 bg-white/70 dark:bg-[#1a1a1a]/80 backdrop-blur-3xl border border-white/20 dark:border-white/5 flex items-center justify-between px-2 z-[90] rounded-2xl shadow-2xl transition-all duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left items - Widgets */}
      <div className="flex items-center h-full mr-4">
        <button 
          onClick={toggleWidgets}
          className={cn(
            "h-full px-2 flex items-center gap-2 transition-colors rounded-md group text-sm text-gray-800 dark:text-gray-200",
            widgetsOpen ? "bg-white/60 dark:bg-white/20" : "hover:bg-white/40 dark:hover:bg-white/10"
          )}
        >
          <Icon name="Cloud" size={20} className="text-blue-500" />
          <div className="flex flex-col items-start leading-none">
            <span className="font-semibold text-xs">72°</span>
            <span className="text-[10px] text-gray-500">Sunny</span>
          </div>
        </button>
      </div>

      {/* Center items - Apps */}
      <div className="flex items-center justify-center gap-1 h-full flex-1">
        <button 
          onClick={toggleStartMenu}
          className={cn(
            "w-11 h-11 flex items-center justify-center rounded-xl transition-all",
            useStore.getState().startMenuOpen ? "bg-white/60 dark:bg-white/10 shadow-inner" : "hover:bg-white/40 dark:hover:bg-white/5"
          )}
        >
          {/* Custom Windows-like Start Icon */}
          <div className="grid grid-cols-2 gap-0.5 w-[22px] h-[22px] hover:scale-105 transition-transform duration-200">
            <div className="bg-[#00a4ef] rounded-[3px] shadow-sm"></div>
            <div className="bg-[#00a4ef] rounded-[3px] shadow-sm"></div>
            <div className="bg-[#00a4ef] rounded-[3px] shadow-sm"></div>
            <div className="bg-[#00a4ef] rounded-[3px] shadow-sm"></div>
          </div>
        </button>

        <button 
          onClick={toggleTaskView}
          className={cn(
            "w-11 h-11 flex items-center justify-center rounded-xl transition-all relative group text-gray-800 dark:text-gray-100",
            useStore.getState().taskViewOpen ? "bg-white/60 dark:bg-white/10 shadow-inner" : "hover:bg-white/40 dark:hover:bg-white/5"
          )}
        >
          <Icon name="LayoutGrid" size={24} className="group-hover:-translate-y-0.5 transition-transform drop-shadow-sm" />
        </button>

        {/* Taskbar Apps */}
        {allTaskbarApps.map(app => {
          const isOpen = openAppIds.includes(app.id);
          const activeWindow = windows.find(w => w.appId === app.id && w.isFocused);
          const appWindows = windows.filter(w => w.appId === app.id);

          return (
            <div 
              key={app.id} 
              className="relative flex items-center justify-center"
              onMouseEnter={() => {
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(() => setHoveredAppId(app.id), 400);
              }}
              onMouseLeave={() => {
                clearTimeout(hoverTimeout);
                setHoveredAppId(null);
              }}
            >
              <AnimatePresence>
                {hoveredAppId === app.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-16 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-xl p-3 shadow-2xl z-[100] min-w-[160px] flex flex-col items-center gap-2 pointer-events-none"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold mb-1 w-full justify-start text-gray-800 dark:text-gray-200">
                       <Icon name={app.icon as any} size={16} />
                       {app.name}
                    </div>
                    {isOpen ? (
                      <div className="w-40 aspect-video bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-md overflow-hidden relative shadow-inner">
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Icon name={app.icon as any} size={32} className="text-gray-300 dark:text-gray-700" />
                        </div>
                        <div className="absolute top-1 left-2 text-[10px] text-gray-500 font-medium">
                           {appWindows[0]?.title || app.name}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">Not running</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => {
                  const w = windows.find(w => w.appId === app.id);
                  if (w) focusWindow(w.id);
                  else openApp(app.id);
                }}
                className={cn(
                  "w-11 h-11 flex items-center justify-center rounded-xl transition-all relative group",
                  activeWindow ? "bg-white/60 dark:bg-white/10 shadow-inner" : "hover:bg-white/40 dark:hover:bg-white/5"
                )}
              >
                <Icon name={app.icon as any} size={20} className={cn(
                  "text-gray-800 dark:text-gray-100 group-hover:-translate-y-0.5 transition-transform drop-shadow-sm",
                  app.id === 'edge' ? "text-blue-500" : "",
                  app.id === 'explorer' ? "text-yellow-500" : ""
                )} />
                
                {/* Indicator dot for open apps */}
                {isOpen && (
                  <div className={cn(
                    "absolute bottom-0 h-1 w-2 rounded-full transition-all duration-300",
                    activeWindow ? "w-4 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "bg-gray-400 dark:bg-gray-500"
                  )}></div>
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* Right items - System Tray */}
      <div className="flex items-center justify-end h-full gap-1 pl-2">
        <button className="h-full px-2 flex items-center justify-center hover:bg-white/40 dark:hover:bg-white/10 transition-colors rounded-md text-gray-800 dark:text-gray-200">
          <Icon name="ChevronUp" size={16} />
        </button>
        
        <div 
          onClick={toggleActionCenter}
          className={cn(
            "h-full px-2 flex items-center gap-3 transition-colors rounded-md cursor-pointer text-gray-800 dark:text-gray-200",
            actionCenterOpen ? "bg-white/60 dark:bg-white/20" : "hover:bg-white/40 dark:hover:bg-white/10"
          )}
        >
          <Icon name="Wifi" size={16} />
          <Icon name="Volume2" size={16} />
          <Icon name="Battery" size={16} />
        </div>

        <div className="h-full px-2 flex flex-col justify-center items-end hover:bg-white/40 dark:hover:bg-white/10 transition-colors rounded-md cursor-pointer text-[11px] font-medium text-gray-800 dark:text-gray-200 text-right select-none leading-tight">
          <span>{format(time, 'h:mm a')}</span>
          <span>{format(time, 'M/d/yyyy')}</span>
        </div>
      </div>
    </div>
  );
};
;
