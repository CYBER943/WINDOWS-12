import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './ui/Icon';
import { format } from 'date-fns';

export const WidgetsPanel: React.FC = () => {
  const { widgetsOpen } = useStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000); // update every min
    return () => clearInterval(interval);
  }, []);

  if (!widgetsOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.95 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      className="absolute top-12 bottom-16 left-4 w-[800px] rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-white/50 dark:bg-black/50 backdrop-blur-3xl border border-white/20 dark:border-white/10 z-[100] p-6"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center font-medium text-lg text-white font-mono bg-blue-600 rounded-full">
            12
          </div>
          <span className="font-semibold text-lg text-gray-900 dark:text-white">{format(time, 'h:mm a')}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 transition-colors text-gray-800 dark:text-gray-200">
            <Icon name="Plus" size={18} />
          </button>
          <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-white">
            <Icon name="User" size={16} />
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search the web"
          className="w-full h-12 pl-12 pr-4 rounded-full bg-white/80 dark:bg-white/10 border border-white/30 dark:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="columns-2 gap-4 space-y-4">
          
          {/* Weather Widget */}
          <div className="bg-white/70 dark:bg-[#202020]/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/30 dark:border-white/5 break-inside-avoid">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1"><Icon name="Cloud" size={14} /> WEATHER</span>
              <Icon name="MoreHorizontal" size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-light text-gray-900 dark:text-white">72°</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">San Francisco, CA</p>
              </div>
              <Icon name="Cloud" size={48} className="text-blue-400" />
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs text-gray-600 dark:text-gray-400">
              <div><p>M</p><Icon name="Cloud" size={16} className="mx-auto my-1"/><p>71°</p></div>
              <div><p>T</p><Icon name="Sun" size={16} className="mx-auto my-1 text-yellow-500"/><p>75°</p></div>
              <div><p>W</p><Icon name="Sun" size={16} className="mx-auto my-1 text-yellow-500"/><p>76°</p></div>
              <div><p>T</p><Icon name="Cloud" size={16} className="mx-auto my-1"/><p>70°</p></div>
              <div><p>F</p><Icon name="Cloud" size={16} className="mx-auto my-1"/><p>68°</p></div>
            </div>
          </div>

          {/* AI Suggestions Widget */}
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-900/20 dark:to-blue-900/20 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-purple-500/20 dark:border-purple-500/10 break-inside-avoid">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">✨ COPILOT+</span>
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium mb-3">Looks like you have a Team Sync soon. Would you like me to prepare the presentation notes from yesterday?</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-xs font-semibold hover:bg-purple-700 transition-colors">Yes, prepare notes</button>
              <button className="px-3 py-1.5 bg-black/5 dark:bg-white/10 rounded-md text-xs font-semibold hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-gray-800 dark:text-gray-200">Dismiss</button>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white/70 dark:bg-[#202020]/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/30 dark:border-white/5 break-inside-avoid">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1"><Icon name="Calendar" size={14} /> CALENDAR</span>
              <Icon name="MoreHorizontal" size={16} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{format(time, 'EEEE, MMMM d')}</h3>
            <div className="mt-4 space-y-3">
              <div className="flex gap-3 relative before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-blue-500 before:rounded-full pl-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Team Sync</p>
                  <p className="text-xs text-gray-500">10:00 AM - 11:00 AM</p>
                </div>
              </div>
              <div className="flex gap-3 relative before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-purple-500 before:rounded-full pl-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Design Review</p>
                  <p className="text-xs text-gray-500">1:00 PM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stocks Widget */}
          <div className="bg-white/70 dark:bg-[#202020]/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/30 dark:border-white/5 break-inside-avoid">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1"><Icon name="TrendingUp" size={14} /> STOCKS</span>
              <Icon name="MoreHorizontal" size={16} className="text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div><p className="font-semibold text-gray-900 dark:text-white">MSFT</p><p className="text-xs text-gray-500">Microsoft Corp.</p></div>
                <div className="text-right"><p className="font-semibold text-gray-900 dark:text-white">415.32</p><p className="text-xs text-green-500">+1.24%</p></div>
              </div>
              <div className="flex justify-between items-center">
                <div><p className="font-semibold text-gray-900 dark:text-white">AAPL</p><p className="text-xs text-gray-500">Apple Inc.</p></div>
                <div className="text-right"><p className="font-semibold text-gray-900 dark:text-white">172.60</p><p className="text-xs text-red-500">-0.45%</p></div>
              </div>
            </div>
          </div>
          
          {/* Add Sun to import for Weather Widget */}
        </div>
      </div>
    </motion.div>
  );
};
