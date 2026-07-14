export interface AppMetadata {
  id: string;
  name: string;
  icon: string; // We'll use lucide-react icon names or custom SVG
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
  isLocked: boolean;
}

export interface FileData {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

