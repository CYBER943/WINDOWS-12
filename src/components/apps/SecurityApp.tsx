import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';

export const SecurityApp: React.FC<{ windowId: string }> = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState('Today at 9:41 AM');

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setLastScan('Just now');
    }, 3000);
  };

  const navItems = [
    { id: 'dashboard', label: 'Security at a glance', icon: 'Security' },
    { id: 'virus', label: 'Virus & threat protection', icon: 'ShieldAlert' },
    { id: 'account', label: 'Account protection', icon: 'UserCheck' },
    { id: 'firewall', label: 'Firewall & network protection', icon: 'Wifi' },
    { id: 'device', label: 'Device security', icon: 'HardDrive' },
  ];

  return (
    <div className="flex h-full bg-[#f3f3f3] dark:bg-[#202020] text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 dark:border-white/10 bg-white/50 dark:bg-[#2d2d2d]/50 p-4">
        <div className="flex items-center gap-3 mb-6 px-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
          <Icon name="ShieldCheck" size={24} />
          Windows Security
        </div>
        <div className="space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left",
                activeTab === item.id 
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 before:absolute before:left-0 before:h-4 before:w-1 before:bg-blue-600 before:rounded-r-full relative" 
                  : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
              )}
            >
              <Icon name={item.icon as any} size={20} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[#fafafa] dark:bg-[#1a1a1a] p-8">
        <h2 className="text-3xl font-light mb-8">
          {navItems.find(i => i.id === activeTab)?.label}
        </h2>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#252525] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col items-center text-center">
              <Icon name="ShieldCheck" size={48} className="text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Virus & threat protection</h3>
              <p className="text-sm text-gray-500 mb-4">No actions needed.</p>
              <p className="text-xs text-gray-400 mt-auto">Last scan: {lastScan}</p>
            </div>
            <div className="bg-white dark:bg-[#252525] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col items-center text-center">
              <Icon name="UserCheck" size={48} className="text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Account protection</h3>
              <p className="text-sm text-gray-500 mb-4">No actions needed.</p>
            </div>
            <div className="bg-white dark:bg-[#252525] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col items-center text-center">
              <Icon name="Wifi" size={48} className="text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Firewall & network protection</h3>
              <p className="text-sm text-gray-500 mb-4">No actions needed.</p>
            </div>
            <div className="bg-white dark:bg-[#252525] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col items-center text-center">
              <Icon name="HardDrive" size={48} className="text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Device security</h3>
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-1 justify-center">
                <Icon name="AlertTriangle" size={14} className="text-yellow-500"/> Copilot+ NPU features disabled
              </p>
              <button className="text-sm text-blue-600 hover:underline">Review settings</button>
            </div>
          </div>
        )}

        {activeTab === 'virus' && (
          <div className="max-w-2xl">
            <div className="bg-white dark:bg-[#252525] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm mb-6">
              <div className="flex items-start gap-4">
                <Icon name="ShieldCheck" size={32} className="text-green-500 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Current threats</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">No current threats found.</p>
                  <p className="text-sm text-gray-500 mb-2">Last scan: {lastScan}</p>
                  <p className="text-sm text-gray-500 mb-4">0 threats found.</p>
                  <button 
                    onClick={handleScan}
                    disabled={isScanning}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md font-medium transition-colors"
                  >
                    {isScanning ? 'Scanning...' : 'Quick scan'}
                  </button>
                </div>
              </div>
            </div>
            <h4 className="font-semibold text-lg mb-4">Protection settings</h4>
            <div className="bg-white dark:bg-[#252525] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm divide-y divide-gray-200 dark:divide-white/10">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h5 className="font-medium">Real-time protection</h5>
                  <p className="text-sm text-gray-500">Locates and stops malware from installing or running.</p>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 bg-white w-3 h-3 rounded-full" />
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h5 className="font-medium">Cloud-delivered protection</h5>
                  <p className="text-sm text-gray-500">Provides increased and faster protection.</p>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 bg-white w-3 h-3 rounded-full" />
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h5 className="font-medium flex items-center gap-2">AI-powered Behavioral Analysis <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">New</span></h5>
                  <p className="text-sm text-gray-500">Uses local NPU to detect zero-day threats in real-time.</p>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 bg-white w-3 h-3 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholders for other tabs */}
        {['account', 'firewall', 'device'].includes(activeTab) && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">This section is available in the full version of Windows 12 Concept.</p>
          </div>
        )}
      </div>
    </div>
  );
};
