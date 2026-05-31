import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import InteractiveHoverText from '../components/InteractiveHoverText';

const FALLBACK_STUDIES = [
  {
    id: 1,
    client: "Web3 Privacy",
    title: "Data Ownership Protocol",
    description: "Successfully scaled community engagement and boosted local adoption in just 3 months.",
    tags: ["KOL Campaigns", "Community Operations", "Giveaway & AMA Events", "Content Production"],
    metrics: [
      { value: "45K+", label: "Local Testnet Users" },
      { value: "4M+", label: "Content Views" },
      { value: "12K+", label: "Local Followers" }
    ],
    color: "#343cbb"
  },
  {
    id: 2,
    client: "Modular Blockchain Infrastructure",
    title: "Caldera",
    description: "Increased visibility and positioned Caldera within the Turkish Web3 ecosystem.",
    tags: ["Local Social Media Management", "Global & Local Community Moderation", "Awareness Campaigns"],
    metrics: [
      { value: "2.5M+", label: "Content Views" },
      { value: "4.8K+", label: "Local Followers" }
    ],
    color: "#343cbb"
  },
  {
    id: 3,
    client: "DeFi",
    title: "Tea-Fi",
    description: "Boosted engagement and increased active platform participation.",
    tags: ["X (Twitter) Management", "Telegram & Discord Moderation", "Community Growth"],
    metrics: [
      { value: "2M+", label: "Content Views" },
      { value: "3.6K+", label: "Local Followers" }
    ],
    color: "#343cbb"
  },
  {
    id: 4,
    client: "Launchpad",
    title: "Gems",
    description: "Strengthened global presence and scaled community participation.",
    tags: ["Global Community Management", "Growth Strategy", "Campaign Execution"],
    metrics: [
      { value: "28K", label: "Telegram Members" },
      { value: "20K", label: "Galxe Participants" },
      { value: "37K", label: "Twitter Followers" }
    ],
    color: "#343cbb"
  }
];

/**
 * Normalize CMS case study items to match the expected shape.
 * Tags may come as comma-separated text from Storyblok.
 */
function normalizeStudies(blokStudies) {
  return blokStudies.map((s, idx) => ({
    id: idx + 1,
    client: s.client,
    title: s.title,
    description: s.description,
    tags: Array.isArray(s.tags)
      ? s.tags
      : (s.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
    metrics: (s.metrics || []).map((m) => ({
      value: m.value,
      label: m.label,
    })),
    color: s.color || '#343cbb',
  }));
}

const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function CaseStudies({ blok }) {
  const CASE_STUDIES = blok?.studies?.length
    ? normalizeStudies(blok.studies)
    : FALLBACK_STUDIES;
  const badgeText = blok?.badge_text || '10M+ VIEWS';

  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 items, so wrap index safely
  const imageIndex = Math.abs(page % CASE_STUDIES.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 10000);
    return () => clearInterval(timer);
  }, [page]); // resets timer on manual interaction

  const currentStudy = CASE_STUDIES[imageIndex];

  return (
    <section id="case-studies" className="w-full min-h-[80vh] py-24 bg-background flex flex-col justify-center items-center overflow-hidden brutalist-border-b relative group scroll-mt-32">
      
      {/* Dot-matrix background — CSS utility, no inline style */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-dot-matrix" style={{ backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 z-10 w-full max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center mb-16 gap-8 relative z-20 text-center"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-8 md:w-12 h-[1px] bg-white/30" />
              <span className="text-sm font-bold tracking-[0.3em] text-white/70 uppercase">{badgeText}</span>
              <span className="w-8 md:w-12 h-[1px] bg-white/30" />
            </div>
            <div className="flex flex-row gap-4 lg:gap-6 justify-center items-center">
              <InteractiveHoverText
                as="h2"
                align="items-center"
                lines={["CASE"]}
                className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tight text-center"
              />
              <InteractiveHoverText
                as="h2"
                align="items-center"
                lines={["STUDIES"]}
                baseColor="#343cbb"
                hoverColor="dynamic-mask"
                className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-center"
              />
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous case study"
              className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ArrowRight className="w-6 h-6 rotate-180" />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next case study"
              className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative min-h-[500px] w-full flex items-center justify-center overflow-visible perspective-[1000px]">
          
          {/* Ambient glow — softer, gradient radial */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none transition-all duration-1000 z-0 opacity-15"
            style={{
              background: `radial-gradient(ellipse at center, ${currentStudy.color} 0%, transparent 70%)`,
              filter: 'blur(60px)'
            }}
          />

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={{
                enter: (direction) => ({
                  x: direction > 0 ? '100%' : '-100%',
                  opacity: 0,
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                  opacity: 1,
                },
                exit: (direction) => ({
                  zIndex: 0,
                  x: direction < 0 ? '100%' : '-100%',
                  opacity: 0,
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.6 },
                opacity: { duration: 0.5 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              style={{ willChange: "transform, opacity" }}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
                  paginate(1);
                } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
                  paginate(-1);
                }
              }}
              className="absolute w-full h-full glass-card p-8 md:p-14 flex flex-col md:flex-row gap-8 md:gap-20 cursor-grab active:cursor-grabbing hover:border-accentBlue/30 transition-all duration-500 transform-gpu will-change-transform z-10"
            >
               {/* Left Content */}
               <div className="flex-1 flex flex-col justify-center relative z-10">
                  <span className="text-[14px] border border-white/20 px-3 py-1 w-max font-mono mb-6" style={{ color: currentStudy.color, borderColor: currentStudy.color }}>
                    {currentStudy.client}
                  </span>
                  
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[color:var(--color-text)] mb-6 uppercase leading-[1.1]">
                    {currentStudy.title}
                  </h3>
                  
                  <p className="text-[color:var(--color-text)] opacity-70 text-[14px] max-w-xl font-body leading-relaxed mb-6 pointer-events-none">
                    {currentStudy.description}
                  </p>
                  
                  {currentStudy.tags && (
                    <div className="flex flex-wrap gap-2 mb-8 z-20">
                      {currentStudy.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-mono px-3 py-1 bg-[color:var(--color-text)]/5 border border-[color:var(--color-text)]/10 text-[color:var(--color-text)]/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
               </div>

               {/* Right Metrics — numbers are the visual focal point */}
               <div className="flex-1 border-t md:border-t-0 md:border-l border-[color:var(--color-border)] pt-8 md:pt-0 md:pl-16 flex flex-col justify-center gap-10 pointer-events-none">
                  {currentStudy.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-[color:var(--color-text)] opacity-90 text-[14px] font-mono uppercase tracking-[0.25em]">{metric.label}</span>
                      <span
                        className="font-display font-black tracking-tighter leading-none"
                        style={{
                          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                          color: i === 0 ? currentStudy.color : 'rgb(var(--color-text))',
                          textShadow: i === 0 ? `0 0 40px ${currentStudy.color}55` : 'none',
                        }}
                      >
                        {metric.value}
                      </span>
                    </div>
                  ))}
               </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-12 gap-3 relative z-20">
          {CASE_STUDIES.map((_, i) => (
            <button 
              key={i}
              onClick={() => {
                const diff = i - imageIndex;
                if (diff !== 0) {
                   setPage([page + diff, diff > 0 ? 1 : -1]);
                }
              }}
              className={`h-1.5 transition-all duration-300 ${i === imageIndex ? 'w-12 bg-white' : 'w-4 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
