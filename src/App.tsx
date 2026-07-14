import React, { useEffect } from 'react';
import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { ActionCenter } from './components/ActionCenter';
import { WidgetsPanel } from './components/WidgetsPanel';
import { LockScreen } from './components/LockScreen';
import { useStore } from './store/useStore';

export default function App() {
  const { settings } = useStore();

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Prevent default context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative text-gray-900 dark:text-white bg-black">
      <LockScreen />
      <Desktop />
      <StartMenu />
      <ActionCenter />
      <WidgetsPanel />
      <Taskbar />
    </div>
  );
}

