import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './ui/Icon';
import { cn } from '../lib/utils';

export const LockScreen: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const [time, setTime] = useState(new Date());
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!settings.isLocked) return null;

  const handleUnlockClick = () => {
    setIsUnlocking(true);
  };

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pin === '1234' || pin === '') {
      updateSettings({ isLocked: false });
      setPin('');
      setIsUnlocking(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div 
      className="absolute inset-0 z-[1000] overflow-hidden flex flex-col items-center select-none"
      style={{
        backgroundImage: `url(${settings.wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={() => !isUnlocking && handleUnlockClick()}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      <AnimatePresence mode="wait">
        {!isUnlocking ? (
          <motion.div 
            key="clock"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="z-10 mt-24 flex flex-col items-center text-white drop-shadow-lg"
          >
            <h1 className="text-8xl font-medium tracking-tighter">{format(time, 'h:mm')}</h1>
            <p className="text-2xl font-medium mt-2">{format(time, 'EEEE, MMMM d')}</p>
          </motion.div>
        ) : (
          <motion.div 
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 mt-32 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md mb-6 flex items-center justify-center overflow-hidden border-2 border-white/30 shadow-xl">
              <div className="w-full h-full bg-gradient-to-tr from-blue-400 to-purple-500" />
            </div>
            <h2 className="text-3xl font-semibold text-white drop-shadow-md mb-8">Guest User</h2>
            
            <form onSubmit={handleLogin} className="relative flex items-center group">
              <input 
                type="password" 
                placeholder="PIN (try 1234)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                autoFocus
                className={cn(
                  "w-64 h-10 px-4 rounded-md bg-black/40 border focus:outline-none focus:bg-white/90 focus:text-black text-white text-center tracking-widest transition-all",
                  error ? "border-red-500" : "border-white/30 focus:border-transparent"
                )}
              />
              <button 
                type="submit"
                className="absolute right-1 w-8 h-8 flex items-center justify-center rounded bg-white/20 text-white hover:bg-white/30 transition-colors opacity-0 group-focus-within:opacity-100"
              >
                <Icon name="ArrowRight" size={16} />
              </button>
            </form>
            
            {error && <p className="text-red-300 text-sm mt-4 font-medium bg-black/40 px-3 py-1 rounded">Incorrect PIN. Try 1234 or leave blank.</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-6 right-8 z-10 flex gap-4 text-white drop-shadow-md">
        <Icon name="Wifi" size={24} />
        <Icon name="Battery" size={24} />
      </div>
    </div>
  );
};
