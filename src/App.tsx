import React, { useEffect } from 'react';
import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { ActionCenter } from './components/ActionCenter';
import { WidgetsPanel } from './components/WidgetsPanel';
import { TaskView } from './components/TaskView';
import { LockScreen } from './components/LockScreen';
import { CommandCenter } from './components/CommandCenter';
import { ClipboardManager } from './components/ClipboardManager';
import { AltTabSwitcher } from './components/AltTabSwitcher';
import { useStore } from './store/useStore';

export default function App() {
  const { settings, toggleCommandCenter } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle command center on Ctrl+Space or Cmd+Space
      if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
        e.preventDefault();
        toggleCommandCenter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandCenter]);

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
      <TaskView />
      <StartMenu />
      <ActionCenter />
      <WidgetsPanel />
      <CommandCenter />
      <ClipboardManager />
      <AltTabSwitcher />
      <Taskbar />
    </div>
  );
}

