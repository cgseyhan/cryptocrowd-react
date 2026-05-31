import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'light';
    return true;
  });

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-auto md:right-auto md:inset-0 md:pointer-events-none z-50 flex md:justify-center">
      <div className="md:container md:relative w-full h-full">

        {/* Desktop: vertically centered in the gap between screen edge and container right border */}
        <div className="pointer-events-auto flex md:absolute md:top-1/2 md:-translate-y-1/2 md:-right-14 lg:-right-20 xl:-right-[100px]">
          <div className="flex items-center gap-4 rotate-0 md:-rotate-90 origin-bottom-right">

            <span className={`font-mono text-xs tracking-widest uppercase transition-colors ${!isLight ? 'text-accentBlue neon-glow-blue' : 'text-[color:var(--color-text)]'}`}>
              Dark
            </span>

            <button
              onClick={() => setIsLight(!isLight)}
              aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
              className="w-20 h-8 border border-white/30 bg-background/80 backdrop-blur-xl rounded-full p-1 relative flex items-center shadow-[0_0_20px_rgba(0,0,0,0.8)] overflow-hidden group cursor-pointer gpu-layer"
            >
              <div className="absolute inset-0 opacity-20 bg-diagonal-stripes" />
              <motion.div
                animate={{ x: isLight ? 48 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-6 h-6 rounded-full bg-accentBlue relative z-10 flex items-center justify-center shadow-[0_0_15px_rgba(52,60,187,0.8)]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-90" />
              </motion.div>
            </button>

            <span className={`font-mono text-xs tracking-widest uppercase transition-colors ${isLight ? 'text-accentBlue font-bold drop-shadow-[0_0_8px_rgba(52,60,187,0.8)]' : 'text-[color:var(--color-text)]'}`}>
              Light
            </span>

          </div>
        </div>

      </div>
    </div>
  );
}
