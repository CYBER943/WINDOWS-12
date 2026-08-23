import React, { useState } from 'react';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';

export const TimelineApp: React.FC<{ windowId: string }> = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const recentSearches = [
    'Figma mockups',
    'Project specs',
    'Yesterday morning'
  ];

  const searchTags = [
    { label: 'Apps', icon: 'Box', color: 'text-blue-500' },
    { label: 'Files', icon: 'FileText', color: 'text-orange-500' },
    { label: 'Web', icon: 'Globe', color: 'text-purple-500' },
    { label: 'Images', icon: 'Pictures', color: 'text-green-500' },
  ];

  const timelineEvents = [
    { id: 1, time: '10:45 AM', type: 'app', title: 'Opened Code Editor', icon: 'Box', color: 'text-blue-500' },
    { id: 2, time: '10:30 AM', type: 'file', title: 'Edited "project_specs.md"', icon: 'FileText', color: 'text-orange-500' },
    { id: 3, time: '09:15 AM', type: 'web', title: 'Browsed Figma - Concept Design', icon: 'Globe', color: 'text-purple-500' },
    { id: 4, time: 'Yesterday', type: 'image', title: 'Saved "screenshot_42.png"', icon: 'Pictures', color: 'text-green-500' },
    { id: 5, time: 'Yesterday', type: 'app', title: 'Played Xbox - Starfield', icon: 'Box', color: 'text-green-600' },
    { id: 6, time: 'Mon, 12th', type: 'file', title: 'Created Folder "Assets"', icon: 'Folder', color: 'text-yellow-500' },
  ];

  const filteredEvents = timelineEvents.filter(event => {
    if (filter !== 'all' && event.type !== filter && filter !== 'apps' && filter !== 'files' && filter !== 'web' && filter !== 'images') return false;
    // Map internal types to filter categories if needed, or simply use the string comparison
    if (filter === 'apps' && event.type !== 'app') return false;
    if (filter === 'files' && event.type !== 'file') return false;
    if (filter === 'web' && event.type !== 'web') return false;
    if (filter === 'images' && event.type !== 'image') return false;
    
    if (search && !event.title.toLowerCase().includes(search.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 font-sans">
      <div className="p-6 pb-2 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-[#252525]/80 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Icon name="Timeline" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Smart Recall</h1>
              <p className="text-sm text-gray-500">Powered by Agentic AI</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search past activities..."
                className="pl-9 pr-4 py-2 w-72 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-[#252525] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-50 p-2"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {!search ? (
                      <>
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Recent Searches
                        </div>
                        <div className="space-y-1 mb-2">
                          {recentSearches.map((s, i) => (
                            <button
                              key={i}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-sm text-left transition-colors text-gray-700 dark:text-gray-300"
                              onClick={() => {
                                setSearch(s);
                                setIsSearchFocused(false);
                              }}
                            >
                              <Icon name="History" size={16} className="text-gray-400" />
                              {s}
                            </button>
                          ))}
                        </div>
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-t border-gray-100 dark:border-white/10 mt-2 pt-3">
                          Filter By Type
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          {searchTags.map((tag, i) => (
                            <button
                              key={i}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-sm transition-colors text-gray-700 dark:text-gray-300"
                              onClick={() => {
                                setFilter(tag.label.toLowerCase());
                                setIsSearchFocused(false);
                              }}
                            >
                              <Icon name={tag.icon as any} size={16} className={tag.color} />
                              {tag.label}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        Press Enter to search for "{search}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {['all', 'apps', 'files', 'web'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "pb-2 text-sm font-medium transition-colors border-b-2",
                filter === f
                  ? "border-purple-500 text-purple-600 dark:text-purple-400"
                  : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-300 dark:bg-white/10 z-0"></div>
          
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="relative z-10 flex items-start gap-6 group cursor-pointer">
                <div className="w-16 pt-1 text-right text-xs font-semibold text-gray-500 shrink-0">
                  {event.time}
                </div>
                <div className={cn("w-4 h-4 rounded-full border-2 border-white dark:border-[#1a1a1a] shadow-sm mt-1 shrink-0", event.color, event.color.replace('text', 'bg').replace('500', '100').replace('600', '200'))}></div>
                <div className="flex-1 bg-white dark:bg-[#252525] p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-0.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-gray-100 dark:bg-white/5", event.color)}>
                      <Icon name={event.icon as any} size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                      <p className="text-xs text-gray-500">Click to restore context</p>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-500">
                    <Icon name="Maximize2" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
