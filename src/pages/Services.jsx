import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import InteractiveHoverText from '../components/InteractiveHoverText';

const FALLBACK_SERVICES = [
  {
    title: "KOL & Influencer Marketing",
    features: [
      "Access to 500+ global & local influencers",
      "Campaign strategy & execution",
      "Performance tracking"
    ],
    result: "10M+ campaign views"
  },
  {
    title: "Community Management",
    features: [
      "Telegram, Discord moderation",
      "24/7 active support",
      "Engagement & growth tactics"
    ],
    result: "70K+ users managed"
  },
  {
    title: "Social Media Growth",
    features: [
      "X (Twitter) management",
      "Content planning & posting",
      "Viral growth strategies"
    ],
    result: "+36K followers growth"
  },
  {
    title: "Content Creation",
    features: [
      "Visuals, videos, threads",
      "Voice-over & localization",
      "Web3-native storytelling"
    ],
    result: "Millions of impressions"
  },
  {
    title: "Growth Campaigns",
    features: [
      "Airdrops, Galxe, quests",
      "Giveaway & AMA planning",
      "User acquisition funnels"
    ],
    result: "High participation rates"
  },
  {
    title: "Strategy & Consulting",
    features: [
      "Go-to-market strategy",
      "Localization",
      "Growth roadmap"
    ],
    result: "Proven scaling frameworks"
  }
];

/**
 * Normalize CMS service items to match the expected shape.
 * Features may come as newline-separated text from Storyblok.
 */
function normalizeServices(blokServices) {
  return blokServices.map((s) => ({
    title: s.title,
    features: Array.isArray(s.features)
      ? s.features
      : (s.features || '').split('\n').filter(Boolean),
    result: s.result,
  }));
}

export default function Services({ blok }) {
  const SERVICES_DATA = blok?.services?.length
    ? normalizeServices(blok.services)
    : FALLBACK_SERVICES;
  const subtitle = blok?.subtitle || 'Everything You Need for Web3 Growth';

  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const throttleRef = useRef(false);

  // Check if section is visible in viewport
  const isSectionVisible = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    // Section is "active" when its top is within 250px of viewport top
    // and its bottom is still below viewport bottom edge
    return rect.top <= 250 && rect.bottom >= window.innerHeight * 0.5;
  }, []);

  useEffect(() => {
    // Use IntersectionObserver to lock/unlock
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLocked(entry.isIntersecting && entry.intersectionRatio > 0.3);
      },
      { threshold: [0.3, 0.5, 0.7] }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onWheel = (e) => {
      if (!isSectionVisible()) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentIdx = activeIndex;

      // If at boundaries, let page scroll normally
      if (direction === -1 && currentIdx === 0) return;
      if (direction === 1 && currentIdx === SERVICES_DATA.length - 1) return;

      // We're in the middle — intercept
      e.preventDefault();
      e.stopImmediatePropagation();

      if (throttleRef.current) return;
      throttleRef.current = true;

      setActiveIndex(prev => {
        const next = prev + direction;
        return Math.max(0, Math.min(SERVICES_DATA.length - 1, next));
      });

      setTimeout(() => { throttleRef.current = false; }, 400);
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () => window.removeEventListener('wheel', onWheel, { capture: true });
  }, [activeIndex, isSectionVisible]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative h-screen w-full bg-surfaceLow scroll-mt-32"
    >
      {/* Diagonal stripe */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-diagonal-stripes" />

      <div className="w-full h-full flex flex-col overflow-hidden brutalist-border-b bg-surfaceLow">
        <div className="container mx-auto max-w-[1600px] px-4 md:px-12 flex flex-col justify-center h-full relative z-10 pt-16 md:pt-24 lg:pt-0">
          
          {/* Header */}
          <div className="mb-4 lg:mb-12 flex flex-col justify-center items-center text-center">
            <p className="text-accentBlue tracking-[0.3em] font-mono text-xs md:text-base uppercase mb-4 md:mb-8 flex justify-center items-center gap-4 neon-glow-blue select-none">
              <span className="w-8 md:w-16 h-[1px] bg-accentBlue/40"></span>
              {subtitle}
              <span className="w-8 md:w-16 h-[1px] bg-accentBlue/40"></span>
            </p>
            <div className="mb-4">
              <InteractiveHoverText
                as="h2"
                align="items-center"
                lines={["SERVICES"]}
                baseColor=""
                hoverColor="#343cbb"
                className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-center"
              />
            </div>
            
            {/* Scroll Indicator */}
            <div className={`transition-opacity duration-500 font-mono text-[14px] tracking-widest text-[color:var(--color-text)] opacity-90 uppercase flex items-center gap-2 ${activeIndex === SERVICES_DATA.length - 1 ? 'opacity-0' : ''}`}>
               <span className="animate-bounce">↓</span> Scroll to explore <span className="animate-bounce">↓</span>
            </div>
          </div>

          {/* Expanding Accordion Container */}
          <div className="flex flex-col xl:flex-row w-full gap-2 xl:gap-4 h-[500px] md:h-[550px] xl:h-[600px]">
            {SERVICES_DATA.map((service, idx) => {
              const isActive = activeIndex === idx;

              return (
                <motion.div
                  layout
                  key={idx}
                  transition={{ layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  className={`relative overflow-hidden cursor-default border border-[color:var(--color-border)] flex flex-col justify-between ${isActive ? 'flex-[4] bg-[color:var(--color-surface-variant)] shadow-[0_0_30px_rgba(52,60,187,0.15)]' : 'flex-1 bg-transparent'}`}
                >
                  {/* Number Indicator */}
                  <motion.div layout="position" className="p-4 md:px-6 md:pt-6 flex justify-between items-start z-20 absolute top-0 left-0">
                    <span className={`font-display text-2xl md:text-3xl font-bold tracking-tighter transition-all ${isActive ? 'text-accentBlue drop-shadow-[0_0_8px_rgba(52,60,187,0.6)]' : 'opacity-30'}`}>
                      0{idx + 1}
                    </span>
                  </motion.div>

                  {/* Text Container */}
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start px-4 md:px-8 pointer-events-none">
                    <div
                      className="w-[280px] xl:w-[350px] flex flex-col items-start text-left"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                        transition: isActive
                          ? 'opacity 0.35s ease-out 0.15s, transform 0.35s ease-out 0.15s'
                          : 'opacity 0.1s ease-out, transform 0.1s ease-out',
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                    >
                      <h3 className="font-display font-bold uppercase text-2xl xl:text-3xl mb-4 tracking-tight leading-tight md:leading-none w-full text-left">
                        {service.title}
                      </h3>
                      <ul className="space-y-3 font-mono text-xs xl:text-sm uppercase tracking-widest opacity-80 mb-6 w-full border-t border-[color:var(--color-border)] pt-4 flex flex-col items-start">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-3 w-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-accentBlue/80 inline-block shrink-0 shadow-[0_0_8px_rgba(52,60,187,0.8)]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 border-t border-[color:var(--color-border)] w-full flex flex-col items-start text-left">
                        <span className="text-accentBlue font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs block mb-1 opacity-80">
                          Mini Result
                        </span>
                        <span className="font-display text-xl md:text-3xl font-bold tracking-tighter w-full">
                          {service.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
