import React from 'react';
import { motion } from 'framer-motion';

const FALLBACK = {
  headline: "STILL HAVE QUESTIONS?",
  highlight_text: "LET'S TALK.",
  description: "We know that no two projects are the same. Jump on a discovery call so we can truly understand your specific needs and outline a roadmap tailored just for you.",
  button_text: "BOOK A CALL",
  button_url: "https://zcal.co/cryptocrowdtr/firstmeeting",
};

export default function CTA({ blok }) {
  const data = { ...FALLBACK, ...blok };
  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center relative z-10 bg-background brutalist-border-b">
      
      {/* Diagonal stripe background — CSS utility, no inline style */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-diagonal-stripes" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter mb-8 uppercase relative z-10 leading-none">
          {data.headline} <br/> <span className="text-accentBlue neon-glow-blue italic">{data.highlight_text}</span>
        </h2>
        
        <p className="max-w-3xl text-lg md:text-xl mb-12 relative z-10 opacity-80 font-mono leading-relaxed">
          {data.description}
        </p>

        <motion.a 
          href={data.button_url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative outline-none cursor-pointer group z-10 mt-4 flex"
        >
          <div className="absolute inset-0 bg-accentBlue/20 translate-x-3 translate-y-3 pointer-events-none transition-transform duration-300 border border-accentBlue/30"></div>
          
          <div className="relative z-10 px-16 py-8 bg-background border border-accentBlue text-xl md:text-2xl font-bold tracking-[0.2em] uppercase transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(0,82,255,0.8)] flex items-center gap-4 group-hover:bg-accentBlue group-hover:text-background">
            {data.button_text}
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
