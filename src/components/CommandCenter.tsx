import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './ui/Icon';
import { useStore, APPS } from '../store/useStore';
import { cn } from '../lib/utils';

export const CommandCenter: React.FC = () => {
  const { commandCenterOpen, closeMenus, openApp, updateSettings, settings } = useStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandCenterOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [commandCenterOpen]);

  const executeCommand = (cmd: string) => {
    const q = cmd.toLowerCase().trim();
    if (q === 'dark mode') updateSettings({ theme: 'dark' });
    else if (q === 'light mode') updateSettings({ theme: 'light' });
    else if (q === 'wifi off' || q === 'wifi on') {
      // Mock toggling wifi
    }
    // Simple math
    else if (/^[0-9+\-*/().\s]+$/.test(q)) {
      try {
        // eslint-disable-next-line no-new-func
        const result = new Function(`return ${q}`)();
        return `Result: ${result}`;
      } catch (e) {
        // ignore
      }
    }
    return null;
  };

  const getFilteredItems = () => {
    const items: Array<{ id: string; type: string; title: string; subtitle: string; icon: string; action: () => void }> = [];
    const lowerQuery = query.toLowerCase();

    // 1. Math/Commands
    if (query) {
      const cmdResult = executeCommand(query);
      if (cmdResult) {
        items.push({
          id: 'calc-result',
          type: 'Calculations',
          title: cmdResult,
          subtitle: 'Press Enter to copy',
          icon: 'Calculator',
          action: () => {
             navigator.clipboard.writeText(cmdResult.replace('Result: ', ''));
             closeMenus();
          }
        });
      }
      
      // Settings search mapping
      const settingsMap: Record<string, { title: string; subtitle: string; icon: string; action: () => void }> = {
        'dark mode': { title: 'Turn on Dark Mode', subtitle: 'System Settings > Personalization', icon: 'Moon', action: () => { updateSettings({ theme: 'dark' }); closeMenus(); } },
        'light mode': { title: 'Turn on Light Mode', subtitle: 'System Settings > Personalization', icon: 'Sun', action: () => { updateSettings({ theme: 'light' }); closeMenus(); } },
        'taskbar': { title: 'Taskbar Settings', subtitle: 'System Settings > Personalization', icon: 'LayoutDashboard', action: () => { openApp('settings'); closeMenus(); } },
        'dock': { title: 'Enable Floating Dock', subtitle: 'System Settings > Personalization', icon: 'LayoutDashboard', action: () => { updateSettings({ taskbarStyle: 'dock' }); closeMenus(); } },
        'wallpaper': { title: 'Change Wallpaper', subtitle: 'System Settings > Personalization', icon: 'Image', action: () => { openApp('settings'); closeMenus(); } },
        'wifi': { title: 'Network & Internet', subtitle: 'System Settings > Network', icon: 'Wifi', action: () => { openApp('settings'); closeMenus(); } },
        'bluetooth': { title: 'Bluetooth & Devices', subtitle: 'System Settings > Bluetooth', icon: 'Bluetooth', action: () => { openApp('settings'); closeMenus(); } },
      };

      Object.entries(settingsMap).forEach(([key, setting]) => {
        if (key.includes(lowerQuery) || lowerQuery.includes(key)) {
          items.push({
            id: `setting-${key}`,
            type: 'Settings',
            ...setting
          });
        }
      });
    }

    // 2. Apps
    APPS.forEach(app => {
      if (!query || app.name.toLowerCase().includes(lowerQuery)) {
        items.push({
          id: `app-${app.id}`,
          type: 'Applications',
          title: app.name,
          subtitle: 'System App',
          icon: app.icon,
          action: () => {
            openApp(app.id);
            closeMenus();
          }
        });
      }
    });

    // 3. Mock Files
    const mockFiles = [
      { name: 'Q3_Project_Presentation.pptx', folder: 'Documents/Work', icon: 'FileText' },
      { name: 'Financial_Report_2026.xlsx', folder: 'Documents/Finance', icon: 'FileSpreadsheet' },
      { name: 'Vacation_Ideas.docx', folder: 'Documents/Personal', icon: 'FileText' },
      { name: 'logo_concept_v2.png', folder: 'Pictures/Design', icon: 'Image' },
      { name: 'Windows_12_Blueprint.pdf', folder: 'Downloads', icon: 'File' },
      { name: 'index.html', folder: 'Projects/WebDesktop', icon: 'Code' },
    ];

    if (query) {
      mockFiles.forEach(file => {
        if (file.name.toLowerCase().includes(lowerQuery) || file.folder.toLowerCase().includes(lowerQuery)) {
          items.push({
            id: `file-${file.name}`,
            type: 'Files',
            title: file.name,
            subtitle: file.folder,
            icon: file.icon,
            action: () => {
              openApp('explorer');
              closeMenus();
            }
          });
        }
      });
    }

    // If empty query, show "Recent items" mock
    if (!query) {
      mockFiles.slice(0, 3).forEach(file => {
        items.push({
          id: `recent-${file.name}`,
          type: 'Recent Items',
          title: file.name,
          subtitle: file.folder,
          icon: file.icon,
          action: () => {
            openApp('explorer');
            closeMenus();
          }
        });
      });
    }

    return items;
  };

  const items = getFilteredItems();

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((s) => (s + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((s) => (s - 1 + items.length) % items.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[selectedIndex]) {
        items[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      closeMenus();
    }
  };

  return (
    <AnimatePresence>
      {commandCenterOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeMenus}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white/70 dark:bg-[#1c1c1c]/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center px-4 py-4 border-b border-gray-200 dark:border-white/10">
              <Icon name="Search" size={24} className="text-gray-500 dark:text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search apps, files, settings, or calculate..."
                className="flex-1 bg-transparent border-none outline-none text-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="px-2 py-1 rounded bg-black/5 dark:bg-white/10">ESC</span>
                <span>to close</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {items.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No results found for "{query}"</p>
                  <p className="text-sm mt-1">Try searching for apps, settings, or basic math like "25 * 48"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.from(new Set(items.map(i => i.type))).map(type => (
                    <div key={type} className="space-y-1">
                      <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {type}
                      </div>
                      {items.filter(i => i.type === type).map((item) => {
                        const globalIndex = items.findIndex(i => i.id === item.id);
                        return (
                          <button
                            key={item.id}
                            className={cn(
                              "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-left",
                              globalIndex === selectedIndex
                                ? "bg-purple-500/10 dark:bg-white/10"
                                : "hover:bg-black/5 dark:hover:bg-white/5"
                            )}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            onClick={item.action}
                          >
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center shadow-sm",
                              globalIndex === selectedIndex ? "bg-purple-500 text-white" : "bg-white dark:bg-black/20 text-gray-700 dark:text-gray-300"
                            )}>
                              <Icon name={item.icon as any} size={20} />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <div className={cn(
                                "font-medium text-sm truncate",
                                globalIndex === selectedIndex ? "text-purple-600 dark:text-white" : "text-gray-900 dark:text-gray-100"
                              )}>
                                {item.title}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {item.subtitle}
                              </div>
                            </div>
                            {globalIndex === selectedIndex && (
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">↵</span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* AI Assistant Banner */}
            <div className="px-4 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-t border-purple-500/20 flex items-center gap-3">
              <Icon name="Sparkles" size={16} className="text-purple-500" />
              <span className="text-xs font-medium text-purple-600 dark:text-purple-300">
                AI Native Search Enabled. Try asking "Find my projects from last week"
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
