import React, { useState, useEffect } from 'react';
import { useStore, APPS } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { Power, Settings as SettingsIcon, User, Search, FileText } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

export const StartMenu: React.FC = () => {
  const { startMenuOpen, openApp, toggleStartMenu } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  if (!startMenuOpen) return null;

  const filteredApps = APPS.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[700px] rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-white/70 dark:bg-black/70 backdrop-blur-3xl border border-white/20 dark:border-white/10 z-[100]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search Bar */}
      <div className="p-8 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for apps, settings, and documents"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-full bg-white/50 dark:bg-white/10 border-b-2 border-transparent focus:border-blue-500 focus:outline-none transition-colors dark:text-white placeholder:text-gray-500"
            autoFocus
          />
        </div>
      </div>

      {/* Pinned Apps */}
      <div className="flex-1 px-8 py-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Pinned</h3>
          <button className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">All apps &gt;</button>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {filteredApps.map(app => {
            const Icon = (LucideIcons as Record<string, React.ElementType>)[app.icon];
            return (
              <button
                key={app.id}
                onClick={() => openApp(app.id)}
                className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                  {Icon && <Icon size={24} />}
                </div>
                <span className="text-xs text-gray-800 dark:text-gray-200 truncate w-full text-center">{app.name}</span>
              </button>
            )
          })}
        </div>

        {/* Recommended */}
        <div className="flex items-center justify-between mt-8 mb-4">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Recommended</h3>
          <button className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">More &gt;</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {/* Mock Recommended Files */}
          {[1, 2, 3, 4].map(i => (
            <button key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition-colors text-left">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded">
                <FileText size={20} className="text-blue-500" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm text-gray-800 dark:text-gray-200 truncate">Concept_Design_v{i}.txt</span>
                <span className="text-xs text-gray-500 truncate">1h ago</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-16 mt-auto border-t border-white/20 dark:border-white/10 bg-white/30 dark:bg-black/30 flex items-center justify-between px-8">
        <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">User</span>
        </button>
        <button 
          onClick={toggleStartMenu} 
          className="p-2 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition-colors text-gray-800 dark:text-gray-200"
          title="Power"
        >
          <Power size={18} />
        </button>
      </div>
    </motion.div>
  );
};
