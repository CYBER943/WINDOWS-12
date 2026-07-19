import React from 'react';
import { useStore, APPS } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './ui/Icon';
import { cn } from '../lib/utils';

export const TaskView: React.FC = () => {
  const { taskViewOpen, windows, focusWindow, closeWindow, toggleTaskView } = useStore();

  if (!taskViewOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      className="absolute inset-0 z-[80] bg-black/40 backdrop-blur-md p-12 flex flex-col"
      onClick={toggleTaskView}
    >
      <div className="flex justify-center gap-8 mb-12" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-48 h-32 rounded-xl bg-white/20 border-2 border-blue-500 overflow-hidden relative shadow-lg">
            <img src={useStore.getState().settings.wallpaper} className="w-full h-full object-cover opacity-80" alt="Desktop 1" />
            <div className="absolute inset-0 flex items-center justify-center font-medium text-white shadow-black drop-shadow-md">
              Desktop 1
            </div>
          </div>
          <div className="h-1 w-8 bg-blue-500 rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-48 h-32 rounded-xl bg-black/40 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center relative shadow-lg">
            <Icon name="Plus" size={32} className="text-white" />
          </div>
          <div className="h-1 w-8 bg-transparent" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-wrap justify-center gap-8 items-start content-start">
          <AnimatePresence>
            {windows.map((w) => {
              const app = APPS.find(a => a.id === w.appId);
              if (!app) return null;
              return (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group cursor-pointer w-[300px]"
                  onClick={() => {
                    focusWindow(w.id);
                    toggleTaskView();
                  }}
                >
                  <div className="flex items-center gap-2 mb-2 text-white drop-shadow-md bg-black/50 w-fit px-3 py-1 rounded-full backdrop-blur-md">
                    <Icon name={app.icon as any} size={16} />
                    <span className="text-sm font-medium">{w.title}</span>
                  </div>
                  
                  <div className="aspect-video bg-white/10 border border-white/20 rounded-xl overflow-hidden shadow-2xl relative group-hover:border-blue-400 group-hover:ring-4 ring-blue-500/30 transition-all">
                    {/* Simulated window content preview placeholder */}
                    <div className="absolute inset-0 bg-white dark:bg-[#202020] opacity-90" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon name={app.icon as any} size={48} className="text-gray-400 dark:text-gray-600" />
                    </div>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(w.id);
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
