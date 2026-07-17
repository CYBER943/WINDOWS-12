import React, { useState } from 'react';
import { History, Search, Calendar, FileText, Image as ImageIcon, Video, Box, Folder, Globe, Maximize2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';

export const TimelineApp: React.FC<{ windowId: string }> = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const timelineEvents = [
    { id: 1, time: '10:45 AM', type: 'app', title: 'Opened Code Editor', icon: Box, color: 'text-blue-500' },
    { id: 2, time: '10:30 AM', type: 'file', title: 'Edited "project_specs.md"', icon: FileText, color: 'text-orange-500' },
    { id: 3, time: '09:15 AM', type: 'web', title: 'Browsed Figma - Concept Design', icon: Globe, color: 'text-purple-500' },
    { id: 4, time: 'Yesterday', type: 'image', title: 'Saved "screenshot_42.png"', icon: ImageIcon, color: 'text-green-500' },
    { id: 5, time: 'Yesterday', type: 'app', title: 'Played Xbox - Starfield', icon: Box, color: 'text-green-600' },
    { id: 6, time: 'Mon, 12th', type: 'file', title: 'Created Folder "Assets"', icon: Folder, color: 'text-yellow-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 font-sans">
      <div className="p-6 pb-2 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-[#252525]/80 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <History size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Smart Recall</h1>
              <p className="text-sm text-gray-500">Powered by Agentic AI</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search past activities..."
                className="pl-9 pr-4 py-2 w-64 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
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
            {timelineEvents.map((event) => (
              <div key={event.id} className="relative z-10 flex items-start gap-6 group cursor-pointer">
                <div className="w-16 pt-1 text-right text-xs font-semibold text-gray-500 shrink-0">
                  {event.time}
                </div>
                <div className={cn("w-4 h-4 rounded-full border-2 border-white dark:border-[#1a1a1a] shadow-sm mt-1 shrink-0", event.color, event.color.replace('text', 'bg').replace('500', '100').replace('600', '200'))}></div>
                <div className="flex-1 bg-white dark:bg-[#252525] p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-0.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-gray-100 dark:bg-white/5", event.color)}>
                      <event.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                      <p className="text-xs text-gray-500">Click to restore context</p>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-500">
                    <Maximize2 size={16} />
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
