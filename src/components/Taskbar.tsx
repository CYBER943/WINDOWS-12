import React, { useState, useEffect } from 'react';
import { useStore, APPS } from '../store/useStore';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { Wifi, Volume2, Battery, ChevronUp, FolderOpen, Globe, FileText, Calculator, Settings as SettingsIcon, Cloud, Terminal, Palette, Bot } from 'lucide-react';
import { motion } from 'motion/react';

const Icons: Record<string, React.ElementType> = {
  FolderOpen,
  Globe,
  FileText,
  Calculator,
  Settings: SettingsIcon,
  Terminal,
  Palette,
  Bot,
};

export const Taskbar: React.FC = () => {
  const { windows, openApp, toggleStartMenu, startMenuOpen, actionCenterOpen, toggleActionCenter, widgetsOpen, toggleWidgets, focusWindow } = useStore();
  const [time, setTime] = useState(new Date());

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
      className="absolute bottom-0 left-0 right-0 h-12 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-t border-white/20 dark:border-white/10 flex items-center justify-between px-2 z-[90]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left items - Widgets */}
      <div className="flex items-center h-full w-48">
        <button 
          onClick={toggleWidgets}
          className={cn(
            "h-full px-2 flex items-center gap-2 transition-colors rounded-md group text-sm text-gray-800 dark:text-gray-200",
            widgetsOpen ? "bg-white/60 dark:bg-white/20" : "hover:bg-white/40 dark:hover:bg-white/10"
          )}
        >
          <Cloud size={20} className="text-blue-500" />
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
            "w-10 h-10 flex items-center justify-center rounded-md transition-all",
            startMenuOpen ? "bg-white/60 dark:bg-white/20" : "hover:bg-white/40 dark:hover:bg-white/10"
          )}
        >
          {/* Custom Windows-like Start Icon */}
          <div className="grid grid-cols-2 gap-0.5 w-5 h-5 hover:scale-105 transition-transform duration-200">
            <div className="bg-[#00a4ef] rounded-sm"></div>
            <div className="bg-[#00a4ef] rounded-sm"></div>
            <div className="bg-[#00a4ef] rounded-sm"></div>
            <div className="bg-[#00a4ef] rounded-sm"></div>
          </div>
        </button>

        {/* Taskbar Apps */}
        {allTaskbarApps.map(app => {
          const Icon = Icons[app.icon];
          const isOpen = openAppIds.includes(app.id);
          const activeWindow = windows.find(w => w.appId === app.id && w.isFocused);

          return (
            <button
              key={app.id}
              onClick={() => {
                const w = windows.find(w => w.appId === app.id);
                if (w) focusWindow(w.id);
                else openApp(app.id);
              }}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-md transition-all relative group",
                activeWindow ? "bg-white/60 dark:bg-white/20" : "hover:bg-white/40 dark:hover:bg-white/10"
              )}
            >
              {Icon && <Icon size={22} className={cn(
                "text-gray-800 dark:text-gray-100 group-hover:-translate-y-0.5 transition-transform",
                app.id === 'edge' ? "text-blue-500" : "",
                app.id === 'explorer' ? "text-yellow-500" : ""
              )} />}
              
              {/* Indicator dot for open apps */}
              {isOpen && (
                <div className={cn(
                  "absolute bottom-0 h-1 w-2 rounded-full transition-all duration-300",
                  activeWindow ? "w-4 bg-blue-500" : "bg-gray-400 dark:bg-gray-500"
                )}></div>
              )}
            </button>
          )
        })}
      </div>

      {/* Right items - System Tray */}
      <div className="flex items-center justify-end h-full w-48 gap-1 pr-2">
        <button className="h-full px-2 flex items-center justify-center hover:bg-white/40 dark:hover:bg-white/10 transition-colors rounded-md text-gray-800 dark:text-gray-200">
          <ChevronUp size={16} />
        </button>
        
        <div 
          onClick={toggleActionCenter}
          className={cn(
            "h-full px-2 flex items-center gap-3 transition-colors rounded-md cursor-pointer text-gray-800 dark:text-gray-200",
            actionCenterOpen ? "bg-white/60 dark:bg-white/20" : "hover:bg-white/40 dark:hover:bg-white/10"
          )}
        >
          <Wifi size={16} />
          <Volume2 size={16} />
          <Battery size={16} />
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
