import { IconName } from './lib/icons';

export interface AppMetadata {
  id: string;
  name: string;
  icon: IconName;
  component: string;
  defaultWidth?: number;
  defaultHeight?: number;
}

export interface VirtualDesktop {
  id: string;
  name: string;
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isSnapped?: boolean;
  previousBounds?: { x: number; y: number; width: number; height: number };
  desktopId: string;
}

export interface SystemSettings {
  theme: 'light' | 'dark';
  wallpaper: string;
  accentColor?: string;
  taskbarStyle?: 'full' | 'dock';
  isLocked: boolean;
  focusMode: boolean;
}

export interface AppNotification {
  id: string;
  appId: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  actionButton?: {
    label: string;
    actionId: string;
  };
}

export type FileType = 'file' | 'folder' | 'shortcut';

export interface FileSystemItem {
  id: string;
  name: string;
  type: FileType;
  parentId: string; // 'root' for top level (C:)
  content?: string;
  appId?: string; // For shortcuts
  icon?: IconName;
  createdAt: number;
  updatedAt: number;
}

export interface FileData {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

