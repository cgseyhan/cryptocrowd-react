import React from 'react';
import { motion } from 'framer-motion';
import InteractiveHoverText from '../components/InteractiveHoverText';

/* ── Fallback blog posts ── */
const FALLBACK_POSTS = [
  {
    tag: 'Featured',
    title: 'How We Scaled a Layer 2 to 10M+ Views',
    tagline: 'KOL networking · Aggressive growth tactics · Community moat',
    is_featured: true,
  },
  {
    tag: 'Market Analysis',
    title: 'Narrative Rotation Cycles',
    tagline: 'Liquidity trends · Next major cycle shifts',
    is_featured: false,
  },
  {
    tag: 'Operations',
    title: 'Beyond Discord',
    tagline: 'Autonomous growth networks · Scalable ops',
    is_featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Blog({ blok }) {
  const posts = blok?.posts?.length ? blok.posts : FALLBACK_POSTS;
  const sidebarTitle = blok?.sidebar_title || 'BLOG';
  const sidebarDescription = blok?.sidebar_description || 'Deep dives, tactical strategies, and growth marketing guides.';
  const featured = posts.find((p) => p.is_featured) || posts[0];
  const others = posts.filter((p) => p !== featured).slice(0, 2);

  return (
    <section className="relative z-10 w-full brutalist-border-b bg-background flex flex-col md:flex-row min-h-[80vh] overflow-hidden">
      {/* Crosshatch grid — CSS utility, no inline style */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-crosshatch" />
      
      {/* Title Sidebar */}
      <div className="w-full md:w-1/3 p-10 md:p-16 border-r border-[color:var(--color-border)] flex flex-col justify-start bg-background relative z-10">
        <div id="blog" className="mb-4 flex flex-col items-start gap-1">
          <InteractiveHoverText
            as="h2"
            align="items-start"
            lines={[sidebarTitle]}
            baseColor=""
            hoverColor="#343cbb"
            className="font-display text-5xl lg:text-7xl font-black uppercase tracking-tighter"
          />
        </div>
        <div className="w-12 h-1 bg-accentBlue mt-4 mb-6 shadow-[0_0_10px_rgba(52,60,187,0.8)]" />
        <p className="font-mono text-base leading-relaxed max-w-sm opacity-80">
          {sidebarDescription}
        </p>
      </div>

      {/* Grid Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 bg-[color:var(--color-surface-variant)]"
      >
        {/* Large Box (Featured) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 border-b border-[color:var(--color-border)] glass-card p-12 md:p-20 flex flex-col justify-end group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,82,255,0.08)] relative overflow-hidden cursor-pointer"
          style={{ minHeight: '400px' }}
        >
          {/* Hover glow line at top */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accentBlue transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accentBlue/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-accentBlue/20 transition-all duration-700" />

          <div className="inline-flex px-4 py-2 border border-accentBlue/40 text-accentBlue text-[14px] font-bold tracking-[0.2em] mb-auto relative z-10 items-center justify-center w-max uppercase opacity-90">
            Featured
          </div>

          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-4 relative z-10 uppercase tracking-tight mt-12 group-hover:text-accentBlue transition-colors duration-300 leading-[0.9]">
            {featured.title}
          </h3>

          {/* Short tagline only — no full body */}
          <p className="text-[14px] relative z-10 opacity-90 max-w-lg font-mono tracking-wide">
            {featured.tagline}
          </p>

          <div 
            className="mt-8 flex items-center gap-3 font-mono text-[14px] uppercase tracking-widest transition-colors z-10"
            style={{ color: '#2c34a0' }}
          >
            <span className="opacity-90">[ Read Intel ]</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </motion.div>

        {others.map((post, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className={`${idx === 0 ? 'border-r border-[color:var(--color-border)] border-b md:border-b-0' : ''} glass-card p-10 md:p-16 flex flex-col group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,82,255,0.08)] relative overflow-hidden cursor-pointer`}
          style={{ minHeight: '320px' }}
        >
          <div className="inline-flex px-3 py-1.5 border border-[color:var(--color-border)] text-[14px] font-mono tracking-[0.2em] mb-auto relative z-10 uppercase w-max opacity-90">
            {post.tag}
          </div>
          <div className="mt-auto">
            <h3 className="font-display text-2xl md:text-3xl font-black mb-2 relative z-10 uppercase tracking-tight group-hover:text-accentBlue transition-colors leading-tight">
              {post.title}
            </h3>
            <p className="text-[14px] font-mono relative z-10 opacity-90 mb-6 leading-relaxed">
              {post.tagline}
            </p>
            <div 
              className="opacity-30 group-hover:opacity-100 transition-all"
              style={{ color: '#2c34a0' }}
            >
              <svg className="w-5 h-5 transform -rotate-45 group-hover:scale-110 transition-transform opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </div>
        </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
