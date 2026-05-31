import React from 'react';

/** 
 * Global background layer: 
 * - Precision micro-grid with intersection dots
 * - Vignette fade
 * - 3 ambient glow orbs (slow drift, very low opacity)
 * - Full-page noise texture 
 */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-background overflow-hidden pointer-events-none">
      {/* Micro-grid + intersection dots */}
      <div className="grid-bg gpu-layer" aria-hidden="true" />
      
      {/* Vignette overlay */}
      <div className="grid-vignette gpu-layer" aria-hidden="true" />

      {/* ── Ambient Glow Orbs ──────────────────────────── */}
      {/* Orb 1 — Top right, large */}
      <div
        className="absolute ambient-orb-1"
        aria-hidden="true"
        style={{
          top: '5%',
          right: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,82,255,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.06,
        }}
      />
      {/* Orb 2 — Bottom left, medium */}
      <div
        className="absolute ambient-orb-2"
        aria-hidden="true"
        style={{
          bottom: '15%',
          left: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,60,187,0.15) 0%, transparent 70%)',
          filter: 'blur(70px)',
          opacity: 0.04,
        }}
      />
      {/* Orb 3 — Center right, medium */}
      <div
        className="absolute ambient-orb-3"
        aria-hidden="true"
        style={{
          top: '40%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,82,255,0.10) 0%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.05,
        }}
      />

      {/* ── Noise Texture (film grain) ─────────────────── */}
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}
