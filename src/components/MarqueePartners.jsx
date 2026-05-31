import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import venomLogo from '../assets/venom-light.svg';
import dopLogo from '../assets/dop-light.svg';
import gemsLogo from '../assets/gems-light.svg';
import oasysLogo from '../assets/oasys-light.svg';

const FALLBACK_PARTNERS = [
  { name: "DOP", logo: dopLogo },
  { name: "GEMS", logo: gemsLogo },
  { name: "VENOM", logo: venomLogo },
  { name: "OASYS", logo: oasysLogo }
];

/**
 * Normalize CMS partner items.
 * Logo may be a Storyblok asset object { filename } or a plain URL string.
 */
function normalizePartners(blokPartners) {
  return blokPartners.map((p) => ({
    name: p.name,
    logo: typeof p.logo === 'string' ? p.logo : p.logo?.filename || '',
  }));
}

export default function MarqueePartners({ blok }) {
  const PARTNERS = blok?.partners?.length
    ? normalizePartners(blok.partners)
    : FALLBACK_PARTNERS;
  const label = blok?.label || 'Trusted by leading Web3 teams';

  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 2);
    }
    
    // Recalculate on window resize
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth / 2);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Frame loop for continuous animation
  useAnimationFrame((t, delta) => {
    if (!width) return;
    
    let moveBy = 0.05 * delta;
    let newX = x.get() - moveBy;
    
    // Infinite loop wrap
    if (newX <= -width) {
      newX += width;
    } else if (newX > 0) {
      newX -= width;
    }
    
    x.set(newX);
  });

  // Pan handler for user dragging
  const handlePan = (e, info) => {
    if (!width) return;
    let newX = x.get() + info.delta.x;
    
    // Infinite loop wrap during drag
    if (newX <= -width) {
      newX += width;
    } else if (newX > 0) {
      newX -= width;
    }
    
    x.set(newX);
  };

  return (
    <section className="w-full min-h-[30vh] py-24 brutalist-border-b bg-black/40 overflow-hidden flex flex-col justify-center items-center relative">
      {/* Horizontal lines — CSS utility, no inline style */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-h-lines" />
      <p className="text-center text-base uppercase tracking-[0.3em] text-white mb-16 font-bold flex justify-center items-center gap-4 select-none pointer-events-none relative z-10">
        <span className="w-8 h-[1px] bg-white/20"></span>
        {label}
        <span className="w-8 h-[1px] bg-white/20"></span>
      </p>
      
      {/* Marquee Container */}
      <div className="w-full flex">
        <motion.div 
          ref={containerRef}
          className="flex whitespace-nowrap gap-32 w-max items-center cursor-grab active:cursor-grabbing hover:opacity-90 transition-opacity"
          style={{ x, touchAction: "none" }}
          onPan={handlePan}
        >
          {PARTNERS.map((partner, i) => (
            <motion.div 
              key={i} 
              initial="initial"
              whileHover="hover"
              className="relative font-display font-medium text-white transition-all duration-300 pb-4 px-6 flex items-center justify-center shrink-0 select-none cursor-grab active:cursor-grabbing group"
            >
              <motion.svg
                className="absolute overflow-visible w-[120%] -left-[10%] h-[160%] -top-[30%] text-[#343cbb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0 drop-shadow-[0_0_8px_rgba(52,60,187,0.5)]"
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 30, 70 C 10, 50 15, 20 50, 15 C 100, 10 180, 15 185, 45 C 190, 80 140, 90 90, 85 C 40, 80 15, 55 35, 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  variants={{
                    initial: { pathLength: 0 },
                    hover: { pathLength: 1, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                />
              </motion.svg>

              <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                {partner.logo ? (
                   <img src={partner.logo} alt={partner.name} className="h-16 w-auto object-contain select-none theme-logo" draggable="false" />
                ) : (
                   <span className="text-6xl select-none">{partner.name}</span>
                )}
              </div>
            </motion.div>
          ))}
          {/* Duplicate set for seamless looping */}
           {PARTNERS.map((partner, i) => (
            <motion.div 
              key={`dup-${i}`} 
              initial="initial"
              whileHover="hover"
              className="relative font-display font-medium text-white transition-all duration-300 pb-4 px-6 flex items-center justify-center shrink-0 select-none cursor-grab active:cursor-grabbing group"
            >
              <motion.svg
                className="absolute overflow-visible w-[120%] -left-[10%] h-[160%] -top-[30%] text-[#343cbb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0 drop-shadow-[0_0_8px_rgba(52,60,187,0.5)]"
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 30, 70 C 10, 50 15, 20 50, 15 C 100, 10 180, 15 185, 45 C 190, 80 140, 90 90, 85 C 40, 80 15, 55 35, 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  variants={{
                    initial: { pathLength: 0 },
                    hover: { pathLength: 1, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                />
              </motion.svg>

              <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                {partner.logo ? (
                   <img src={partner.logo} alt={partner.name} className="h-16 w-auto object-contain select-none theme-logo" draggable="false" />
                ) : (
                   <span className="text-6xl select-none">{partner.name}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
