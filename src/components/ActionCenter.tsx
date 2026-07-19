import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './ui/Icon';
import { cn } from '../lib/utils';

export const ActionCenter: React.FC = () => {
  const { actionCenterOpen, settings, updateSettings } = useStore();
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(80);

  if (!actionCenterOpen) return null;

  const quickActions = [
    { id: 'wifi', name: 'Wi-Fi', icon: 'Wifi', active: true, color: 'bg-blue-500 text-white', inactive: 'bg-black/5 dark:bg-white/10' },
    { id: 'bt', name: 'Bluetooth', icon: 'Bluetooth', active: false, color: 'bg-blue-500 text-white', inactive: 'bg-black/5 dark:bg-white/10' },
    { id: 'theme', name: settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode', icon: settings.theme === 'dark' ? 'Moon' : 'Sun', active: settings.theme === 'dark', color: 'bg-blue-500 text-white', inactive: 'bg-black/5 dark:bg-white/10', action: () => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' }) },
    { id: 'batt', name: 'Battery saver', icon: 'Battery', active: false, color: 'bg-green-500 text-white', inactive: 'bg-black/5 dark:bg-white/10' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      className="absolute bottom-16 right-4 w-[360px] rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-white/70 dark:bg-black/70 backdrop-blur-3xl border border-white/20 dark:border-white/10 z-[100] text-gray-900 dark:text-gray-100 p-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Quick Settings Grid */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {quickActions.map(action => (
          <button
            key={action.id}
            onClick={() => action.action?.()}
            className={cn(
              "flex flex-col items-start p-3 rounded-lg border border-transparent transition-all",
              action.active ? action.color : action.inactive,
              !action.active && "hover:border-gray-300 dark:hover:border-gray-500"
            )}
          >
            <Icon name={action.icon as any} size={18} className="mb-2" />
            <span className="text-xs font-semibold">{action.name}</span>
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Sun" size={18} className="text-gray-600 dark:text-gray-400" />
          <input 
            type="range" 
            min="0" max="100" 
            value={brightness}
            onChange={(e) => setBrightness(parseInt(e.target.value))}
            className="flex-1 h-1.5 rounded-full appearance-none bg-gray-300 dark:bg-gray-600 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <Icon name="Volume2" size={18} className="text-gray-600 dark:text-gray-400" />
          <input 
            type="range" 
            min="0" max="100" 
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="flex-1 h-1.5 rounded-full appearance-none bg-gray-300 dark:bg-gray-600 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-white/10">
        <span className="text-xs text-gray-500 font-medium">95% (1 hr 30 min)</span>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
            <Icon name="Edit2" size={16} />
          </button>
          <button className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
            <Icon name="Settings" size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
