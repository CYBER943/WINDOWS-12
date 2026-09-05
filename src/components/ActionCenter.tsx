import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './ui/Icon';
import { cn } from '../lib/utils';

export const ActionCenter: React.FC = () => {
  const { actionCenterOpen, settings, updateSettings, notifications, removeNotification, clearAllNotifications } = useStore();
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(80);

  if (!actionCenterOpen) return null;

  const quickActions = [
    { id: 'wifi', name: 'Wi-Fi', icon: 'Wifi', active: true, color: 'bg-blue-500 text-white', inactive: 'bg-black/5 dark:bg-white/10' },
    { id: 'bt', name: 'Bluetooth', icon: 'Bluetooth', active: false, color: 'bg-blue-500 text-white', inactive: 'bg-black/5 dark:bg-white/10' },
    { id: 'theme', name: settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode', icon: settings.theme === 'dark' ? 'Moon' : 'Sun', active: settings.theme === 'dark', color: 'bg-blue-500 text-white', inactive: 'bg-black/5 dark:bg-white/10', action: () => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' }) },
    { id: 'batt', name: 'Battery saver', icon: 'Battery', active: false, color: 'bg-green-500 text-white', inactive: 'bg-black/5 dark:bg-white/10' },
    { 
      id: 'focus', 
      name: settings.focusMode ? 'Focusing...' : 'Focus Session', 
      icon: 'Moon', 
      active: settings.focusMode, 
      color: 'bg-purple-500 text-white', 
      inactive: 'bg-black/5 dark:bg-white/10', 
      action: () => updateSettings({ focusMode: !settings.focusMode }) 
    },
  ];

  const formatTime = (ms: number) => {
    const d = new Date(ms);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      className="absolute bottom-16 right-4 w-[400px] h-[650px] rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-white/70 dark:bg-black/70 backdrop-blur-3xl border border-white/20 dark:border-white/10 z-[100] text-gray-900 dark:text-gray-100 p-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Notifications Section */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-semibold text-sm">Notifications</h3>
        {notifications.length > 0 && (
          <button 
            onClick={() => clearAllNotifications()}
            className="text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto mb-4 pr-1 -mr-1 space-y-2">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-gray-500"
            >
              <Icon name="BellOff" size={32} className="mb-2 opacity-50" />
              <p className="text-sm">No new notifications</p>
            </motion.div>
          ) : (
            notifications.map((notif) => (
              <motion.div
                layout
                key={notif.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                className="p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-white/40 dark:border-white/10 shadow-sm relative group"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <Icon name={notif.appId === 'mail' ? 'Mail' : notif.appId === 'defender' ? 'Shield' : 'Settings'} size={12} />
                    <span className="capitalize">{notif.appId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400">{formatTime(notif.timestamp)}</span>
                    <button 
                      onClick={() => removeNotification(notif.id)}
                      className="opacity-0 group-hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 p-0.5 rounded transition-all"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                </div>
                <h4 className="font-medium text-sm leading-tight mb-1">{notif.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">{notif.message}</p>
                {notif.actionButton && (
                  <button className="text-xs font-medium bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
                    {notif.actionButton.label}
                  </button>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="h-px bg-gray-200 dark:bg-white/10 w-full my-4" />

      {/* Quick Settings Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4 shrink-0">
        {quickActions.map(action => (
          <button
            key={action.id}
            onClick={() => action.action?.()}
            className={cn(
              "flex flex-col items-start p-3 rounded-xl border border-transparent transition-all h-20 justify-between",
              action.active ? action.color : action.inactive,
              !action.active && "hover:bg-black/10 dark:hover:bg-white/20"
            )}
          >
            <Icon name={action.icon as any} size={18} />
            <span className="text-xs font-semibold leading-tight">{action.name}</span>
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-4 mb-4 shrink-0">
        <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 p-2 px-3 rounded-xl">
          <Icon name="Sun" size={16} className="text-gray-600 dark:text-gray-400 shrink-0" />
          <input 
            type="range" 
            min="0" max="100" 
            value={brightness}
            onChange={(e) => setBrightness(parseInt(e.target.value))}
            className="flex-1 h-1 rounded-full appearance-none bg-gray-300 dark:bg-gray-600 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-700 dark:[&::-webkit-slider-thumb]:bg-white"
          />
        </div>
        <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 p-2 px-3 rounded-xl">
          <Icon name="Volume2" size={16} className="text-gray-600 dark:text-gray-400 shrink-0" />
          <input 
            type="range" 
            min="0" max="100" 
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="flex-1 h-1 rounded-full appearance-none bg-gray-300 dark:bg-gray-600 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-700 dark:[&::-webkit-slider-thumb]:bg-white"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 shrink-0">
        <span className="text-xs text-gray-500 font-medium pl-1">95% (1 hr 30 min)</span>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors">
            <Icon name="Edit2" size={16} />
          </button>
          <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors">
            <Icon name="Settings" size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
