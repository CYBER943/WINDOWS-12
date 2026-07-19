import React from 'react';
import { useStore } from '../../store/useStore';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';

const wallpapers = [
  'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2940&auto=format&fit=crop', // Windows 11-like blue abstract
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop', // Abstract landscape
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2940&auto=format&fit=crop', // Gradient
  'https://images.unsplash.com/photo-1683009427041-d810728a7cce?q=80&w=2940&auto=format&fit=crop', // Dark textured
];

export const SettingsApp: React.FC<{ windowId: string }> = () => {
  const { settings, updateSettings } = useStore();

  return (
    <div className="flex h-full bg-[#fafafa] dark:bg-[#202020] text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 dark:border-white/10 p-4">
        <h2 className="font-semibold text-xl mb-6">Settings</h2>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition-colors">
            <Icon name="Desktop" size={20} />
            System
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-black/5 dark:bg-white/10 text-sm font-medium">
            <Icon name="Paint" size={20} className="text-blue-500" />
            Personalization
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition-colors">
            <Icon name="Assistant" size={20} />
            AI & Copilot
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition-colors">
            <Icon name="Security" size={20} />
            Privacy & Security
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h3 className="text-3xl font-light mb-8">Personalization</h3>
        
        {/* Theme Toggle */}
        <div className="mb-8 p-6 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
          <h4 className="text-sm font-semibold mb-4">Choose your mode</h4>
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => updateSettings({ theme: 'light' })}
              className={cn(
                "flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                settings.theme === 'light' ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-white/10 hover:border-blue-300"
              )}
            >
              <Icon name="Sun" size={24} />
              <span className="font-medium">Light</span>
            </button>
            <button 
              onClick={() => updateSettings({ theme: 'dark' })}
              className={cn(
                "flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                settings.theme === 'dark' ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-white/10 hover:border-blue-300"
              )}
            >
              <Icon name="Sleep" size={24} />
              <span className="font-medium">Dark</span>
            </button>
          </div>

          <h4 className="text-sm font-semibold mb-4">Accent Color</h4>
          <div className="flex flex-wrap gap-3">
             {['#0078d4', '#881798', '#0099bc', '#c239b3', '#00cc6a', '#ff8c00', '#e81123', '#68768a'].map(color => (
               <button
                 key={color}
                 onClick={() => updateSettings({ accentColor: color })}
                 className={cn(
                   "w-10 h-10 rounded-full transition-transform hover:scale-110 relative outline-none",
                   settings.accentColor === color || (!settings.accentColor && color === '#0078d4') ? "ring-2 ring-offset-2 dark:ring-offset-[#252525]" : ""
                 )}
                 style={{ backgroundColor: color, '--tw-ring-color': color } as React.CSSProperties}
               >
                 {(settings.accentColor === color || (!settings.accentColor && color === '#0078d4')) && (
                   <span className="absolute inset-0 flex items-center justify-center text-white">✓</span>
                 )}
               </button>
             ))}
          </div>
        </div>

        {/* Wallpaper */}
        <div className="p-6 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
          <h4 className="text-sm font-semibold mb-4">Background</h4>
          <div className="grid grid-cols-2 gap-4">
            {wallpapers.map((url, i) => (
              <button 
                key={i}
                onClick={() => updateSettings({ wallpaper: url })}
                className={cn(
                  "relative aspect-video rounded-lg overflow-hidden border-2 transition-all",
                  settings.wallpaper === url ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-[#202020]" : "border-transparent hover:border-blue-300"
                )}
              >
                <img src={url} alt={`Wallpaper ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
