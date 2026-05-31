import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import InteractiveHoverText from './InteractiveHoverText';
import HeroModel from './HeroModel';

/* ── Fallback data (used when Storyblok is not configured) ── */
const FALLBACK = {
  tagline: 'Web3 Growth Infrastructure',
  headline_line1: 'Scale Your',
  headline_line2: 'Web3 Vision.',
  description: 'We execute high-impact KOL campaigns, build resilient global communities, and drive explosive growth for top-tier Web3 projects.',
  description_suffix: 'No fluff — Just scalable results.',
  cta_primary_text: 'BOOK A CALL',
  cta_primary_url: 'https://zcal.co/cryptocrowdtr/firstmeeting',
  cta_secondary_text: 'CASE STUDIES',
  cta_secondary_anchor: '#case-studies',
  watermark_text: '10M+',
};

/* ── Animation variants ───────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const GRID_LINES = Array.from({ length: 15 });

export default function Hero({ blok }) {
  const data = { ...FALLBACK, ...blok };
  return (
    <section className="relative w-full brutalist-border-b grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

      {/* ── Left Column ──────────────────────────────────── */}
      <div className="relative p-8 md:p-16 lg:p-24 flex flex-col justify-center min-h-[85vh] lg:min-h-[calc(100vh-175px)] brutalist-border-r bg-background/50 backdrop-blur-sm z-10 transform-gpu overflow-hidden">

        {/* Subtle vertical grid lines */}
        <div className="hero-bg" aria-hidden="true">
          {GRID_LINES.map((_, i) => (
            <div key={i} className="w-px h-full bg-[rgb(var(--color-text))]" />
          ))}
        </div>

        {/* Watermark stat — huge number behind content */}
        <div
          className="absolute -bottom-8 -right-8 font-display font-black select-none pointer-events-none z-0 leading-none"
          style={{
            fontSize: 'clamp(8rem, 18vw, 18rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(52, 60, 187, 0.12)',
          }}
          aria-hidden="true"
        >
          {data.watermark_text}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start relative z-10"
        >
          {/* Tag line */}
          <motion.div variants={itemVariants} className="mb-10 flex items-center gap-4">
            <div className="w-12 h-px bg-accentBlue shrink-0" />
            <span className="text-sm uppercase tracking-[0.35em] font-semibold text-accentBlue neon-glow-blue">
              {data.tagline}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="mb-8 w-full">
            <InteractiveHoverText
              as="h1"
              lines={[data.headline_line1, data.headline_line2]}
              hoverColor="#0052FF"
              className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight"
              style={{ lineHeight: '0.9' }}
            />
          </motion.div>

          {/* Sub-copy */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg max-w-md text-[color:var(--color-text)] mb-12 font-body leading-relaxed opacity-60"
          >
            {data.description}
            <br /><span className="opacity-50 text-sm">{data.description_suffix}</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 relative z-20">
            {/* PRIMARY */}
            <a
              href={data.cta_primary_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a discovery call with CryptoCrowd"
              className="group px-8 py-4 text-white font-black tracking-[0.15em] text-sm clip-chamfer uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:brightness-110 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #0052FF 0%, #343cbb 100%)',
                boxShadow: '0 0 30px rgba(0,82,255,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              {data.cta_primary_text}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </a>

            {/* SECONDARY */}
            <a
              href={data.cta_secondary_anchor}
              className="group px-8 py-4 border border-[color:var(--color-border)] clip-chamfer-reverse uppercase font-bold tracking-[0.15em] text-sm text-[color:var(--color-text)] flex items-center justify-center transition-all duration-300 hover:border-accentBlue/60 hover:text-accentBlue hover:-translate-y-1"
            >
              {data.cta_secondary_text}
            </a>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Right Column — 3D Interactive Model ───────────── */}
      <div className="relative flex min-h-[60vh] lg:min-h-[calc(100vh-175px)] bg-background overflow-hidden" aria-hidden="true">

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accentBlue/5 z-0" />

        {/* 3D Model */}
        <HeroModel />

        {/* Corner crosshairs */}
        {[
          'top-0 left-0',
          'top-0 right-0 rotate-90',
          'bottom-0 right-0 rotate-180',
          'bottom-0 left-0 -rotate-90',
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none z-20`}>
            <div className="absolute top-0 left-0 w-full h-px bg-[color:var(--color-border)] opacity-40" />
            <div className="absolute top-0 left-0 w-px h-full bg-[color:var(--color-border)] opacity-40" />
          </div>
        ))}
      </div>
    </section>
  );
}
