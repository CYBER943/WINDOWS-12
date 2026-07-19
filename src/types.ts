import { IconName } from './lib/icons';

export interface AppMetadata {
  id: string;
  name: string;
  icon: IconName;
  component: string;
  defaultWidth?: number;
  defaultHeight?: number;
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
}

export interface SystemSettings {
  theme: 'light' | 'dark';
  wallpaper: string;
  accentColor?: string;
  isLocked: boolean;
}

export interface FileData {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

