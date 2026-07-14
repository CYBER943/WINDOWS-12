import React from 'react';
import { 
  Folder, 
  File, 
  Image as ImageIcon, 
  Music, 
  Video, 
  ChevronRight, 
  ChevronDown,
  HardDrive,
  Download,
  FileText
} from 'lucide-react';

export const ExplorerApp: React.FC<{ windowId: string }> = () => {
  return (
    <div className="flex h-full bg-[#fcfcfc] dark:bg-[#191919] text-gray-900 dark:text-gray-100 select-none">
      {/* Sidebar */}
      <div className="w-56 border-r border-gray-200 dark:border-white/10 flex flex-col bg-[#f5f5f5] dark:bg-[#202020]">
        <div className="p-2 space-y-1">
          {/* Quick Access */}
          <div>
            <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer">
              <ChevronDown size={14} />
              Home
            </div>
            <div className="pl-6 space-y-1 mt-1">
              <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-black/5 dark:hover:bg-white/10 text-left">
                <Folder size={16} className="text-blue-500 fill-blue-500/20" /> Desktop
              </button>
              <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-black/5 dark:hover:bg-white/10 text-left">
                <Download size={16} className="text-blue-500 fill-blue-500/20" /> Downloads
              </button>
              <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-black/5 dark:hover:bg-white/10 text-left">
                <FileText size={16} className="text-blue-500 fill-blue-500/20" /> Documents
              </button>
              <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-black/5 dark:hover:bg-white/10 text-left">
                <ImageIcon size={16} className="text-blue-500 fill-blue-500/20" /> Pictures
              </button>
            </div>
          </div>

          <div className="my-2 border-t border-gray-200 dark:border-white/10" />

          {/* This PC */}
          <div>
            <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer">
              <ChevronDown size={14} />
              This PC
            </div>
            <div className="pl-6 space-y-1 mt-1">
              <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded bg-black/5 dark:bg-white/10 text-left">
                <HardDrive size={16} className="text-gray-500" /> Local Disk (C:)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#191919]">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center px-4 gap-4 bg-[#f5f5f5] dark:bg-[#202020]">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">This PC</span>
            <ChevronRight size={16} />
            <span className="text-sm">Local Disk (C:)</span>
          </div>
        </div>

        {/* Files Area */}
        <div className="flex-1 p-6">
          <h2 className="text-lg font-medium mb-4">Folders</h2>
          <div className="grid grid-cols-4 gap-4">
            {['Users', 'Windows', 'Program Files', 'Concept Data'].map((name) => (
              <button key={name} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors group text-center">
                <Folder size={48} className="text-yellow-400 fill-yellow-400/20 group-hover:scale-105 transition-transform" />
                <span className="text-sm truncate w-full">{name}</span>
              </button>
            ))}
          </div>

          <h2 className="text-lg font-medium mb-4 mt-8">Files</h2>
          <div className="grid grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors group text-center">
              <FileText size={48} className="text-blue-500 group-hover:scale-105 transition-transform" />
              <span className="text-sm truncate w-full">readme.txt</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors group text-center">
              <ImageIcon size={48} className="text-green-500 group-hover:scale-105 transition-transform" />
              <span className="text-sm truncate w-full">screenshot.png</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
