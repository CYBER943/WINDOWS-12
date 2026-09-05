import React, { useState, useRef } from 'react';
import { Icon } from '../ui/Icon';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { motion, PanInfo } from 'motion/react';

export const ExplorerApp: React.FC<{ windowId: string }> = () => {
  const { fileSystem, openApp, moveFile } = useStore();
  const [currentFolder, setCurrentFolder] = useState<string>('root');
  
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPath = () => {
    if (currentFolder === 'root') return [{ id: 'root', name: 'This PC' }];
    const folder = fileSystem.find(f => f.id === currentFolder);
    if (!folder) return [{ id: 'root', name: 'This PC' }];
    // Basic single level for now
    return [{ id: 'root', name: 'This PC' }, { id: folder.id, name: folder.name }];
  };

  const children = fileSystem.filter(f => f.parentId === currentFolder);
  const folders = children.filter(f => f.type === 'folder');
  const files = children.filter(f => f.type !== 'folder');

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, draggedId: string) => {
    if (!containerRef.current) return;
    
    // Find if we dropped on a folder
    const folderElements = containerRef.current.querySelectorAll('[data-folder-id]');
    
    // Basic collision detection
    for (const el of Array.from(folderElements)) {
      const rect = el.getBoundingClientRect();
      const dropX = info.point.x;
      const dropY = info.point.y;
      
      const targetFolderId = el.getAttribute('data-folder-id');
      
      if (
        dropX >= rect.left && 
        dropX <= rect.right && 
        dropY >= rect.top && 
        dropY <= rect.bottom &&
        targetFolderId &&
        targetFolderId !== draggedId
      ) {
        // Move the file
        moveFile(draggedId, targetFolderId);
        break;
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] dark:bg-[#191919] text-gray-900 dark:text-gray-100 select-none">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-2 pt-2 bg-[#e5e5e5] dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#fcfcfc] dark:bg-[#202020] rounded-t-lg border border-b-0 border-gray-200 dark:border-white/10 text-sm">
          <Icon name="HardDrive" size={16} className="text-gray-500" />
          <span>{currentFolder === 'root' ? 'Local Disk (C:)' : fileSystem.find(f => f.id === currentFolder)?.name}</span>
          <button className="ml-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5" onClick={() => setCurrentFolder('root')}>
            <Icon name="X" size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 border-r border-gray-200 dark:border-white/10 flex flex-col bg-[#f5f5f5] dark:bg-[#202020]">
          <div className="p-2 space-y-1">
            {/* Quick Access */}
            <div>
              <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer" onClick={() => setCurrentFolder('root')}>
                <Icon name="ChevronDown" size={14} />
                Home
              </div>
              <div className="pl-6 space-y-1 mt-1">
                {fileSystem.filter(f => f.parentId === 'root' && f.type === 'folder').map(folder => (
                  <button 
                    key={folder.id}
                    onClick={() => setCurrentFolder(folder.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded text-left",
                      currentFolder === folder.id ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                  >
                    <Icon name={folder.icon as any || 'Folder'} size={20} className="text-blue-500 fill-blue-500/20" /> {folder.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="my-2 border-t border-gray-200 dark:border-white/10" />

            {/* This PC */}
            <div>
              <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer" onClick={() => setCurrentFolder('root')}>
                <Icon name="ChevronDown" size={14} />
                This PC
              </div>
              <div className="pl-6 space-y-1 mt-1">
                <button 
                  onClick={() => setCurrentFolder('root')}
                  className={cn(
                    "w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded text-left",
                    currentFolder === 'root' ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  <Icon name="HardDrive" size={20} className="text-gray-500" /> Local Disk (C:)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white dark:bg-[#191919]">
          {/* Toolbar */}
          <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 bg-[#f5f5f5] dark:bg-[#202020]">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              {currentPath().map((segment, index) => (
                <React.Fragment key={segment.id}>
                  {index > 0 && <Icon name="ChevronRight" size={16} />}
                  <button 
                    onClick={() => setCurrentFolder(segment.id)}
                    className="font-medium text-sm hover:text-blue-500 transition-colors"
                  >
                    {segment.name}
                  </button>
                </React.Fragment>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  useStore.getState().createFile({
                    name: `New Folder ${folders.length + 1}`,
                    type: 'folder',
                    parentId: currentFolder,
                    icon: 'Folder'
                  });
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-200"
              >
                <Icon name="FolderPlus" size={16} className="text-blue-500" /> New Folder
              </button>
              <button 
                onClick={() => {
                  useStore.getState().createFile({
                    name: `New Text File.txt`,
                    type: 'file',
                    parentId: currentFolder,
                    icon: 'FileText'
                  });
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-200"
              >
                <Icon name="FilePlus" size={16} className="text-blue-500" /> New File
              </button>
            </div>
          </div>

          {/* Files Area */}
          <div className="flex-1 p-6 overflow-y-auto" ref={containerRef}>
            {folders.length > 0 && (
              <>
                <h2 className="text-lg font-medium mb-4">Folders</h2>
                <div className="flex flex-wrap gap-4 mb-8">
                  {folders.map((folder) => (
                    <motion.div 
                      key={folder.id} 
                      drag
                      dragMomentum={false}
                      onDragEnd={(e, info) => handleDragEnd(e, info, folder.id)}
                      data-folder-id={folder.id}
                      onDoubleClick={() => setCurrentFolder(folder.id)}
                      className="w-24 h-28 flex flex-col items-center justify-start gap-2 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors group text-center cursor-pointer relative z-10"
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentFolder === 'recycle-bin') {
                            useStore.getState().deleteFile(folder.id);
                          } else {
                            useStore.getState().moveFile(folder.id, 'recycle-bin');
                          }
                        }}
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md z-20 hover:bg-red-600"
                      >
                        <Icon name="X" size={12} />
                      </button>
                      <Icon name={folder.icon as any || 'Folder'} size={48} className="text-blue-500 fill-blue-500/20 group-hover:scale-105 transition-transform" />
                      <span className="text-sm truncate w-full">{folder.name}</span>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {files.length > 0 && (
              <>
                <h2 className="text-lg font-medium mb-4">Files</h2>
                <div className="flex flex-wrap gap-4">
                  {files.map((file) => (
                    <motion.div 
                      key={file.id} 
                      drag
                      dragMomentum={false}
                      onDragEnd={(e, info) => handleDragEnd(e, info, file.id)}
                      onDoubleClick={() => {
                        if (file.appId) openApp(file.appId);
                        else openApp('notepad');
                      }}
                      className="w-24 h-28 flex flex-col items-center justify-start gap-2 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors group text-center cursor-pointer relative z-10"
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentFolder === 'recycle-bin') {
                            useStore.getState().deleteFile(file.id);
                          } else {
                            useStore.getState().moveFile(file.id, 'recycle-bin');
                          }
                        }}
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md z-20 hover:bg-red-600"
                      >
                        <Icon name="X" size={12} />
                      </button>
                      <Icon name={file.icon as any || 'File'} size={48} className="text-gray-500 group-hover:scale-105 transition-transform" />
                      <span className="text-sm truncate w-full">{file.name}</span>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
            
            {folders.length === 0 && files.length === 0 && (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <Icon name="FolderOpen" size={48} className="mb-2 opacity-50" />
                <p>This folder is empty.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
