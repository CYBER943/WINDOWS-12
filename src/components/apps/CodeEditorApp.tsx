import React, { useState } from 'react';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';

export const CodeEditorApp: React.FC<{ windowId: string }> = ({ windowId }) => {
  const [code, setCode] = useState(`function helloWorld() {
  console.log("Hello, Windows 12 Concept!");
}

helloWorld();
`);

  const lines = code.split('\n');

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm">
      {/* Menu Bar */}
      <div className="flex items-center gap-4 px-4 py-1.5 bg-[#333333] text-[13px]">
        <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer transition-colors">File</span>
        <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer transition-colors">Edit</span>
        <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer transition-colors">Selection</span>
        <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer transition-colors">View</span>
        <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer transition-colors">Go</span>
        <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer transition-colors">Run</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 border-r border-[#252526]">
          <div className="p-2 cursor-pointer text-white/50 hover:text-white transition-colors"><Icon name="File" size={24} /></div>
          <div className="p-2 cursor-pointer text-white/50 hover:text-white transition-colors"><Icon name="Search" size={24} /></div>
          <div className="p-2 cursor-pointer text-white/50 hover:text-white transition-colors"><Icon name="FolderOpen" size={24} /></div>
          <div className="flex-1" />
          <div className="p-2 cursor-pointer text-white/50 hover:text-white transition-colors"><Icon name="Settings" size={24} /></div>
        </div>

        {/* Sidebar */}
        <div className="w-48 bg-[#252526] flex flex-col border-r border-[#333333]">
          <div className="px-4 py-2 text-[11px] font-semibold text-white/50 uppercase tracking-wide">Explorer</div>
          <div className="px-4 py-1 text-[13px] hover:bg-white/5 cursor-pointer text-white flex items-center gap-2">
            <span className="text-yellow-400">JS</span> main.js
          </div>
          <div className="px-4 py-1 text-[13px] hover:bg-white/5 cursor-pointer flex items-center gap-2">
            <span className="text-blue-400">TS</span> utils.ts
          </div>
          <div className="px-4 py-1 text-[13px] hover:bg-white/5 cursor-pointer flex items-center gap-2">
            <span className="text-red-400">{}</span> package.json
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          {/* Tabs */}
          <div className="flex bg-[#252526]">
            <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 text-white flex items-center gap-2">
              <span className="text-yellow-400 text-xs">JS</span> main.js
            </div>
            <div className="px-4 py-2 hover:bg-[#2a2d2e] cursor-pointer text-white/50 flex items-center gap-2">
              <span className="text-blue-400 text-xs">TS</span> utils.ts
            </div>
          </div>
          
          {/* Editor */}
          <div className="flex-1 flex overflow-auto relative">
            <div className="w-12 bg-[#1e1e1e] flex flex-col items-end pr-4 py-4 text-[#858585] select-none text-right font-mono text-[14px] leading-relaxed">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent text-[#d4d4d4] font-mono text-[14px] leading-relaxed outline-none resize-none py-4 px-2 whitespace-pre"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-4 text-xs font-sans">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Icon name="FolderOpen" size={12}/> concept-project</span>
          <span className="flex items-center gap-1"><Icon name="Close" size={12}/> 0 <Icon name="AlertTriangle" size={12}/> 0</span>
        </div>
        <div className="flex gap-4">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>JavaScript</span>
        </div>
      </div>
    </div>
  );
};
