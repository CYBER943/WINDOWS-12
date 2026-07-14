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
    icon: 'Globe',
    component: 'BrowserApp',
    defaultWidth: 1000,
    defaultHeight: 600,
  },
  {
    id: 'notepad',
    name: 'Notepad',
    icon: 'FileText',
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
    icon: 'Palette',
    component: 'PaintApp',
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: 'assistant',
    name: 'AI Assistant',
    icon: 'Bot',
    component: 'AssistantApp',
    defaultWidth: 400,
    defaultHeight: 600,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: 'Settings',
    component: 'SettingsApp',
    defaultWidth: 700,
    defaultHeight: 500,
  }
];

interface DesktopState {
  windows: WindowState[];
  startMenuOpen: boolean;
  actionCenterOpen: boolean;
  widgetsOpen: boolean;
  settings: SystemSettings;
  
  // Actions
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
  closeMenus: () => void;
  updateSettings: (settings: Partial<SystemSettings>) => void;
}

let nextZIndex = 10;

export const useStore = create<DesktopState>()(
  persist(
    (set, get) => ({
      windows: [],
      startMenuOpen: false,
      actionCenterOpen: false,
      widgetsOpen: false,
      settings: {
        theme: 'dark',
        wallpaper: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2940&auto=format&fit=crop',
        isLocked: true,
      },

      openApp: (appId: string) => {
        const { windows } = get();
        const app = APPS.find((a) => a.id === appId);
        if (!app) return;

        const existingWindow = windows.find((w) => w.appId === appId);
        if (existingWindow) {
          set((state) => ({
            windows: state.windows.map((w) =>
              w.id === existingWindow.id
                ? { ...w, isMinimized: false, isFocused: true, zIndex: ++nextZIndex }
                : { ...w, isFocused: false }
            ),
            startMenuOpen: false,
            widgetsOpen: false,
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
        };

        set((state) => ({
          windows: [...state.windows.map(w => ({ ...w, isFocused: false })), newWindow],
          startMenuOpen: false,
          widgetsOpen: false,
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
        }));
      },
      
      toggleActionCenter: () => {
        set((state) => ({
          actionCenterOpen: !state.actionCenterOpen,
          startMenuOpen: false,
          widgetsOpen: false,
        }));
      },

      toggleWidgets: () => {
        set((state) => ({
          widgetsOpen: !state.widgetsOpen,
          startMenuOpen: false,
          actionCenterOpen: false,
        }));
      },
      
      closeMenus: () => {
        set({ startMenuOpen: false, actionCenterOpen: false, widgetsOpen: false });
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

