import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppMetadata, WindowState, SystemSettings } from '../types';

export const APPS: AppMetadata[] = [
  {
    id: 'explorer',
    name: 'File Explorer',
    icon: 'FolderOpen',
    component: 'ExplorerApp',
    defaultWidth: 800,
    defaultHeight: 500,
  },
  {
    id: 'edge',
    name: 'Browser',
    icon: 'Browser',
    component: 'BrowserApp',
    defaultWidth: 1000,
    defaultHeight: 600,
  },
  {
    id: 'notepad',
    name: 'Notepad',
    icon: 'File',
    component: 'NotepadApp',
    defaultWidth: 600,
    defaultHeight: 400,
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: 'Calculator',
    component: 'CalculatorApp',
    defaultWidth: 320,
    defaultHeight: 500,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: 'Terminal',
    component: 'TerminalApp',
    defaultWidth: 700,
    defaultHeight: 450,
  },
  {
    id: 'paint',
    name: 'Paint',
    icon: 'Paint',
    component: 'PaintApp',
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: 'assistant',
    name: 'AI Assistant',
    icon: 'Assistant',
    component: 'AssistantApp',
    defaultWidth: 400,
    defaultHeight: 600,
  },
  {
    id: 'taskmanager',
    name: 'Task Manager',
    icon: 'Activity',
    component: 'TaskManagerApp',
    defaultWidth: 650,
    defaultHeight: 500,
  },
  {
    id: 'codeeditor',
    name: 'Code Editor',
    icon: 'Code',
    component: 'CodeEditorApp',
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: 'Settings',
    component: 'SettingsApp',
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: 'security',
    name: 'Windows Security',
    icon: 'Security',
    component: 'SecurityApp',
    defaultWidth: 700,
    defaultHeight: 500,
  },
  {
    id: 'xbox',
    name: 'Xbox',
    icon: 'Xbox',
    component: 'XboxApp',
    defaultWidth: 850,
    defaultHeight: 600,
  },
  {
    id: 'timeline',
    name: 'Smart Recall',
    icon: 'Timeline',
    component: 'TimelineApp',
    defaultWidth: 800,
    defaultHeight: 600,
  }
];

interface DesktopState {
  windows: WindowState[];
  desktops: import('../types').VirtualDesktop[];
  activeDesktopId: string;
  fileSystem: import('../types').FileSystemItem[];
  notifications: import('../types').AppNotification[];
  startMenuOpen: boolean;
  actionCenterOpen: boolean;
  widgetsOpen: boolean;
  taskViewOpen: boolean;
  commandCenterOpen: boolean;
  snapPreview: string | null;
  settings: SystemSettings;
  
  // Actions
  addNotification: (notification: Omit<import('../types').AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  markAllNotificationsRead: () => void;
  addDesktop: () => void;
  switchDesktop: (id: string) => void;
  closeDesktop: (id: string) => void;
  createFile: (file: Omit<import('../types').FileSystemItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteFile: (id: string) => void;
  updateFile: (id: string, updates: Partial<import('../types').FileSystemItem>) => void;
  moveFile: (id: string, newParentId: string) => void;
  openApp: (appId: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  toggleStartMenu: () => void;
  toggleActionCenter: () => void;
  toggleWidgets: () => void;
  toggleTaskView: () => void;
  toggleCommandCenter: () => void;
  closeMenus: () => void;
  setSnapPreview: (preview: string | null) => void;
  updateSettings: (settings: Partial<SystemSettings>) => void;
}

let nextZIndex = 10;

export const useStore = create<DesktopState>()(
  persist(
    (set, get) => ({
      windows: [],
      desktops: [{ id: 'desktop-1', name: 'Desktop 1' }],
      activeDesktopId: 'desktop-1',
      fileSystem: [
        { id: 'desktop', name: 'Desktop', type: 'folder', parentId: 'root', createdAt: Date.now(), updatedAt: Date.now() },
        { id: 'documents', name: 'Documents', type: 'folder', parentId: 'root', createdAt: Date.now(), updatedAt: Date.now() },
        { id: 'downloads', name: 'Downloads', type: 'folder', parentId: 'root', createdAt: Date.now(), updatedAt: Date.now() },
        { id: 'pictures', name: 'Pictures', type: 'folder', parentId: 'root', createdAt: Date.now(), updatedAt: Date.now() },
        { id: 'recycle-bin', name: 'Recycle Bin', type: 'folder', parentId: 'root', createdAt: Date.now(), updatedAt: Date.now() },
        
        // Initial Desktop Shortcuts
        { id: 'shortcut-pc', name: 'This PC', type: 'shortcut', appId: 'explorer', icon: 'Desktop', parentId: 'desktop', createdAt: Date.now(), updatedAt: Date.now() },
        { id: 'shortcut-settings', name: 'Settings', type: 'shortcut', appId: 'settings', icon: 'Settings', parentId: 'desktop', createdAt: Date.now(), updatedAt: Date.now() },
        { id: 'shortcut-edge', name: 'Microsoft Edge', type: 'shortcut', appId: 'edge', icon: 'Browser', parentId: 'desktop', createdAt: Date.now(), updatedAt: Date.now() },
        
        // Inside Documents
        { id: 'doc-1', name: 'Work', type: 'folder', parentId: 'documents', createdAt: Date.now(), updatedAt: Date.now() },
        { id: 'doc-2', name: 'Personal', type: 'folder', parentId: 'documents', createdAt: Date.now(), updatedAt: Date.now() },
        { id: 'file-doc-1', name: 'Q3_Report.docx', type: 'file', parentId: 'documents', icon: 'FileText', createdAt: Date.now(), updatedAt: Date.now() },
        
        // Inside Pictures
        { id: 'pic-1', name: 'Wallpapers', type: 'folder', parentId: 'pictures', createdAt: Date.now(), updatedAt: Date.now() },
        { id: 'file-pic-1', name: 'logo.png', type: 'file', parentId: 'pictures', icon: 'Image', createdAt: Date.now(), updatedAt: Date.now() },
        
        // Inside Downloads
        { id: 'file-dl-1', name: 'installer.exe', type: 'file', parentId: 'downloads', icon: 'Download', createdAt: Date.now(), updatedAt: Date.now() },
      ],
      notifications: [
        {
          id: 'notif-1',
          appId: 'system',
          title: 'Windows Update',
          message: 'A new feature update (26H2) is ready to install.',
          timestamp: Date.now() - 3600000,
          read: false,
          actionButton: { label: 'Restart now', actionId: 'update' }
        },
        {
          id: 'notif-2',
          appId: 'defender',
          title: 'Security Scan Complete',
          message: 'No threats were found on your system.',
          timestamp: Date.now() - 7200000,
          read: true
        },
        {
          id: 'notif-3',
          appId: 'mail',
          title: 'Sarah Jenkins',
          message: 'Meeting notes from the Q3 planning session are attached.',
          timestamp: Date.now() - 1500000,
          read: false,
          actionButton: { label: 'Reply', actionId: 'reply-mail' }
        }
      ],
      startMenuOpen: false,
      actionCenterOpen: false,
      widgetsOpen: false,
      taskViewOpen: false,
      commandCenterOpen: false,
      snapPreview: null,
      settings: {
        theme: 'dark',
        wallpaper: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2940&auto=format&fit=crop',
        isLocked: true,
        focusMode: false,
      },

      addNotification: (notif) => set(state => {
        if (state.settings.focusMode) return state; // Suppress notifications in focus mode
        return {
          notifications: [
            { ...notif, id: `notif-${Date.now()}`, timestamp: Date.now(), read: false },
            ...state.notifications
          ]
        };
      }),
      
      removeNotification: (id) => set(state => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      
      clearAllNotifications: () => set({ notifications: [] }),
      
      markAllNotificationsRead: () => set(state => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),

      createFile: (file) => set(state => ({
        fileSystem: [...state.fileSystem, { ...file, id: `file-${Date.now()}`, createdAt: Date.now(), updatedAt: Date.now() }]
      })),
      
      deleteFile: (id) => set(state => ({
        fileSystem: state.fileSystem.filter(f => f.id !== id && f.parentId !== id) // Also deletes immediate children if folder
      })),
      
      updateFile: (id, updates) => set(state => ({
        fileSystem: state.fileSystem.map(f => f.id === id ? { ...f, ...updates, updatedAt: Date.now() } : f)
      })),
      
      moveFile: (id, newParentId) => set(state => ({
        fileSystem: state.fileSystem.map(f => f.id === id ? { ...f, parentId: newParentId, updatedAt: Date.now() } : f)
      })),

      addDesktop: () => {
        set((state) => {
          const newId = `desktop-${Date.now()}`;
          return {
            desktops: [...state.desktops, { id: newId, name: `Desktop ${state.desktops.length + 1}` }],
            activeDesktopId: newId,
          };
        });
      },

      switchDesktop: (id: string) => {
        set({ activeDesktopId: id, taskViewOpen: false });
      },

      closeDesktop: (id: string) => {
        set((state) => {
          if (state.desktops.length <= 1) return state; // Don't close last desktop
          
          const filteredDesktops = state.desktops.filter(d => d.id !== id);
          
          // Move windows from closing desktop to the first available desktop
          const targetDesktopId = filteredDesktops[0].id;
          const updatedWindows = state.windows.map(w => 
            w.desktopId === id ? { ...w, desktopId: targetDesktopId } : w
          );
          
          return {
            desktops: filteredDesktops,
            windows: updatedWindows,
            activeDesktopId: state.activeDesktopId === id ? targetDesktopId : state.activeDesktopId
          };
        });
      },

      openApp: (appId: string) => {
        const { windows, activeDesktopId } = get();
        const app = APPS.find((a) => a.id === appId);
        if (!app) return;

        const existingWindow = windows.find((w) => w.appId === appId);
        if (existingWindow) {
          set((state) => ({
            activeDesktopId: existingWindow.desktopId, // switch to desktop where app is open
            windows: state.windows.map((w) =>
              w.id === existingWindow.id
                ? { ...w, isMinimized: false, isFocused: true, zIndex: ++nextZIndex }
                : { ...w, isFocused: false }
            ),
            startMenuOpen: false,
            widgetsOpen: false,
            taskViewOpen: false,
          }));
          return;
        }

        const newWindow: WindowState = {
          id: `${appId}-${Date.now()}`,
          appId,
          title: app.name,
          isMinimized: false,
          isMaximized: false,
          isFocused: true,
          x: window.innerWidth / 2 - (app.defaultWidth || 600) / 2 + (windows.length * 20),
          y: window.innerHeight / 2 - (app.defaultHeight || 400) / 2 + (windows.length * 20),
          width: app.defaultWidth || 600,
          height: app.defaultHeight || 400,
          zIndex: ++nextZIndex,
          desktopId: activeDesktopId,
        };

        set((state) => ({
          windows: [...state.windows.map(w => ({ ...w, isFocused: false })), newWindow],
          startMenuOpen: false,
          widgetsOpen: false,
          taskViewOpen: false,
        }));
      },

      closeWindow: (id: string) => {
        set((state) => {
          const remaining = state.windows.filter((w) => w.id !== id);
          if (remaining.length > 0) {
            const highestZ = Math.max(...remaining.map(w => w.zIndex));
            return {
              windows: remaining.map(w => w.zIndex === highestZ ? { ...w, isFocused: true } : w)
            };
          }
          return { windows: remaining };
        });
      },

      minimizeWindow: (id: string) => {
        set((state) => {
          const updated = state.windows.map((w) =>
            w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
          );
          const remainingUnminimized = updated.filter(w => !w.isMinimized);
          if (remainingUnminimized.length > 0) {
            const highestZ = Math.max(...remainingUnminimized.map(w => w.zIndex));
            return {
              windows: updated.map(w => w.zIndex === highestZ ? { ...w, isFocused: true } : w)
            };
          }
          return { windows: updated };
        });
      },

      maximizeWindow: (id: string) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id
              ? { ...w, isMaximized: !w.isMaximized, isFocused: true, zIndex: ++nextZIndex }
              : { ...w, isFocused: false }
          ),
        }));
      },

      focusWindow: (id: string) => {
        set((state) => {
          const target = state.windows.find(w => w.id === id);
          if (target?.isFocused) return state;
          
          return {
            windows: state.windows.map((w) =>
              w.id === id
                ? { ...w, isFocused: true, isMinimized: false, zIndex: ++nextZIndex }
                : { ...w, isFocused: false }
            ),
            startMenuOpen: false,
            actionCenterOpen: false,
            widgetsOpen: false,
            taskViewOpen: false,
            commandCenterOpen: false,
          };
        });
      },

      updateWindowPosition: (id: string, x: number, y: number) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, x, y } : w
          ),
        }));
      },

      updateWindowSize: (id: string, width: number, height: number) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, width, height } : w
          ),
        }));
      },

      toggleStartMenu: () => {
        set((state) => ({
          startMenuOpen: !state.startMenuOpen,
          actionCenterOpen: false,
          widgetsOpen: false,
          commandCenterOpen: false,
        }));
      },
      
      toggleActionCenter: () => {
        set((state) => ({
          actionCenterOpen: !state.actionCenterOpen,
          startMenuOpen: false,
          widgetsOpen: false,
          commandCenterOpen: false,
        }));
      },

      toggleWidgets: () => {
        set((state) => ({
          widgetsOpen: !state.widgetsOpen,
          startMenuOpen: false,
          actionCenterOpen: false,
          taskViewOpen: false,
          commandCenterOpen: false,
        }));
      },

      toggleTaskView: () => {
        set((state) => ({
          taskViewOpen: !state.taskViewOpen,
          startMenuOpen: false,
          actionCenterOpen: false,
          widgetsOpen: false,
          commandCenterOpen: false,
        }));
      },
      
      toggleCommandCenter: () => {
        set((state) => ({
          commandCenterOpen: !state.commandCenterOpen,
          startMenuOpen: false,
          actionCenterOpen: false,
          widgetsOpen: false,
          taskViewOpen: false,
        }));
      },

      closeMenus: () => {
        set({ startMenuOpen: false, actionCenterOpen: false, widgetsOpen: false, taskViewOpen: false, commandCenterOpen: false });
      },

      setSnapPreview: (preview) => {
        set({ snapPreview: preview });
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
    }),
    {
      name: 'win12-storage',
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);

