import React from 'react';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';

export const XboxApp: React.FC<{ windowId: string }> = () => {
  return (
    <div className="flex h-full bg-[#101010] text-gray-100 font-sans selection:bg-[#107c10] selection:text-white">
      {/* Sidebar */}
      <div className="w-64 flex flex-col bg-[#1a1a1a] border-r border-[#2d2d2d]">
        <div className="p-4 flex items-center gap-3 text-lg font-bold">
          <div className="w-8 h-8 rounded-full bg-[#107c10] flex items-center justify-center">
            <Icon name="Gamepad2" size={20} className="text-white" />
          </div>
          XBOX
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-6 mt-4">
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 bg-[#2d2d2d] rounded-md text-sm font-semibold hover:bg-[#3d3d3d] transition-colors">
              <Icon name="Gamepad2" size={18} /> Game Pass
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 rounded-md text-sm font-semibold hover:bg-[#2d2d2d] hover:text-gray-200 transition-colors">
              <Icon name="Users" size={18} /> Social
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 rounded-md text-sm font-semibold hover:bg-[#2d2d2d] hover:text-gray-200 transition-colors">
              <Icon name="Trophy" size={18} /> Achievements
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 rounded-md text-sm font-semibold hover:bg-[#2d2d2d] hover:text-gray-200 transition-colors">
              <Icon name="Download" size={18} /> Cloud Gaming
            </button>
          </div>

          <div>
            <h3 className="px-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Installed</h3>
            <div className="space-y-1">
              <div className="group flex items-center gap-3 px-3 py-2 hover:bg-[#2d2d2d] rounded-md cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-gray-800 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Game" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate group-hover:text-white text-gray-300">Halo Infinite</p>
                  <p className="text-[10px] text-gray-500 truncate">Ready to play</p>
                </div>
                <Icon name="Play" size={14} className="text-[#107c10] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="group flex items-center gap-3 px-3 py-2 hover:bg-[#2d2d2d] rounded-md cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-gray-800 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2865&auto=format&fit=crop" className="w-full h-full object-cover" alt="Game" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate group-hover:text-white text-gray-300">Forza Horizon 5</p>
                  <p className="text-[10px] text-gray-500 truncate">Ready to play</p>
                </div>
                <Icon name="Play" size={14} className="text-[#107c10] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#2d2d2d]">
          <div className="flex items-center gap-3 hover:bg-[#2d2d2d] p-2 rounded-md cursor-pointer transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-0.5">
              <div className="w-full h-full bg-[#1a1a1a] rounded-full flex items-center justify-center">
                <Icon name="Users" size={20} className="text-gray-300" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold">Player123</p>
              <p className="text-xs text-[#107c10] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#107c10]"></span> Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent z-10" />
          <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2942&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="Hero" />
          
          <div className="absolute bottom-12 left-12 z-20 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#107c10] rounded text-xs font-bold uppercase tracking-wider mb-4">
              Included with Game Pass
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">Starfield</h1>
            <p className="text-gray-300 text-lg mb-8 line-clamp-2">In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom.</p>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-[#107c10] hover:bg-[#128f12] text-white px-8 py-3 rounded font-bold transition-colors">
                <Icon name="Play" size={20} className="fill-current" /> Play
              </button>
              <button className="bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white px-6 py-3 rounded font-bold transition-colors">
                View details
              </button>
            </div>
          </div>
        </div>

        <div className="px-12 py-8 space-y-12">
          {/* Section: DirectStorage & AI Optimization */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/40 to-purple-900/20 border border-white/5 flex items-center justify-between">
             <div>
               <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                 <span className="text-blue-400">✨ AI Auto-Optimization</span> Active
               </h3>
               <p className="text-gray-400 text-sm max-w-lg">
                 Your games are running with Windows 12 AI Frame Generation and DirectStorage 1.2 for faster load times and smoother framerates.
               </p>
             </div>
             <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded font-semibold text-sm transition-colors">
               Manage Settings
             </button>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-6">Recently added to Game Pass</h2>
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden mb-3 relative">
                    <img src={`https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2940&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={`Game ${i}`} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#107c10] flex items-center justify-center">
                         <Icon name="Download" size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-200 group-hover:text-white">Awesome Game {i}</h3>
                  <p className="text-sm text-gray-500">Action & Adventure</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
