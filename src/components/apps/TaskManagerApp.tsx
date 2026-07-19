import React, { useState, useEffect } from 'react';
import { useStore, APPS } from '../../store/useStore';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

export const TaskManagerApp: React.FC<{ windowId: string }> = ({ windowId }) => {
  const { windows, closeWindow, focusWindow } = useStore();
  const [cpuUsage, setCpuUsage] = useState<number[]>(Array(20).fill(15));
  const [memUsage, setMemUsage] = useState<number[]>(Array(20).fill(40));
  const [activeTab, setActiveTab] = useState<'processes' | 'performance'>('processes');

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const next = [...prev.slice(1), Math.floor(Math.random() * 20) + 5];
        return next;
      });
      setMemUsage(prev => {
        const next = [...prev.slice(1), 40 + Math.floor(Math.random() * 5)];
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const openAppIds = windows.map(w => w.appId);
  const openApps = Array.from(new Set(openAppIds)).map(id => APPS.find(a => a.id === id)!);

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#202020] text-gray-900 dark:text-gray-100">
      {/* Tabs */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20">
        <button 
          onClick={() => setActiveTab('processes')}
          className={cn("px-4 py-1.5 rounded text-sm transition-colors", activeTab === 'processes' ? "bg-white dark:bg-white/10 shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5")}
        >
          Processes
        </button>
        <button 
          onClick={() => setActiveTab('performance')}
          className={cn("px-4 py-1.5 rounded text-sm transition-colors", activeTab === 'performance' ? "bg-white dark:bg-white/10 shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5")}
        >
          Performance
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'processes' && (
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-white/80 dark:bg-[#2d2d2d] sticky top-0 border-b border-gray-200 dark:border-white/10 shadow-sm">
              <tr>
                <th className="py-2 px-4 font-semibold w-1/2">Name</th>
                <th className="py-2 px-4 font-semibold w-1/4">Status</th>
                <th className="py-2 px-4 font-semibold text-right">CPU</th>
                <th className="py-2 px-4 font-semibold text-right">Memory</th>
              </tr>
            </thead>
            <tbody>
              {openApps.map(app => (
                <tr key={app.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-2 px-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white">
                      <Icon name="Activity" size={14} />
                    </div>
                    {app.name}
                  </td>
                  <td className="py-2 px-4 text-green-600 dark:text-green-400">Running</td>
                  <td className="py-2 px-4 text-right">{(Math.random() * 2).toFixed(1)}%</td>
                  <td className="py-2 px-4 text-right">{Math.floor(Math.random() * 50) + 10} MB</td>
                </tr>
              ))}
              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                <td className="py-2 px-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center text-white">
                    <Icon name="Activity" size={14} />
                  </div>
                  System Idle Process
                </td>
                <td className="py-2 px-4 text-gray-500">Running</td>
                <td className="py-2 px-4 text-right">{100 - cpuUsage[cpuUsage.length - 1]}%</td>
                <td className="py-2 px-4 text-right">4 MB</td>
              </tr>
            </tbody>
          </table>
        )}

        {activeTab === 'performance' && (
          <div className="flex h-full">
            <div className="w-1/3 border-r border-gray-200 dark:border-white/10 p-2 space-y-1">
              <div className="p-3 bg-white dark:bg-white/10 rounded border-l-4 border-blue-500 cursor-pointer">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold flex items-center gap-2"><Icon name="Cpu" size={16}/> CPU</span>
                  <span className="text-xl">{cpuUsage[cpuUsage.length - 1]}%</span>
                </div>
                <div className="h-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cpuUsage.map((val, i) => ({ val, i }))}>
                      <YAxis domain={[0, 100]} hide />
                      <Line type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold flex items-center gap-2"><Icon name="Database" size={16}/> Memory</span>
                  <span className="text-xl">{memUsage[memUsage.length - 1]}%</span>
                </div>
                <div className="h-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={memUsage.map((val, i) => ({ val, i }))}>
                      <YAxis domain={[0, 100]} hide />
                      <Line type="monotone" dataKey="val" stroke="#8b5cf6" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="w-2/3 p-6 bg-white dark:bg-transparent">
              <h2 className="text-2xl font-light mb-6 flex items-center gap-2"><Icon name="Cpu" size={24}/> CPU</h2>
              <div className="h-48 border border-gray-200 dark:border-white/20 mb-6 p-2 rounded">
                 <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cpuUsage.map((val, i) => ({ val, i }))}>
                    <YAxis domain={[0, 100]} hide />
                    <Line type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Utilization</p>
                  <p className="text-xl">{cpuUsage[cpuUsage.length - 1]}%</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Speed</p>
                  <p className="text-xl">3.20 GHz</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Processes</p>
                  <p className="text-xl">{openApps.length + 42}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Up time</p>
                  <p className="text-xl">0:01:45:22</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
