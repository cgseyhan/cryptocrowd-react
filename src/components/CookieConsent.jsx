import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cryptoCrowd_cookieConsent');
    if (!consent) {
      // Small delay for dramatic effect
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cryptoCrowd_cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cryptoCrowd_cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[100] md:max-w-sm"
        >
          <div className="bg-background/60 backdrop-blur-xl border border-[color:var(--color-border)] p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] font-mono gpu-layer">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-accentBlue animate-pulse" />
              <h3 className="text-white font-bold tracking-widest uppercase text-sm">
                Cookie Protocol
              </h3>
            </div>
            
            {/* Body */}
            <p className="text-[rgb(var(--color-text))] opacity-80 text-xs leading-relaxed mb-6">
              We deploy advanced analytical cookies to optimize your browsing metrics and deliver targeted Web3 experiences. Read our <a href="/privacy" className="text-accentBlue hover:text-white transition-colors underline underline-offset-4">Privacy Policy</a> to understand data utilization.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAccept}
                className="flex-1 bg-accentBlue hover:bg-white text-white hover:text-black py-3 px-4 font-display font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_0_15px_rgba(52,60,187,0.5)] hover:shadow-[0_0_25px_rgba(255,255,255,0.7)]"
              >
                Accept All
              </button>
              <button 
                onClick={handleDecline}
                className="flex-1 border border-white/20 hover:border-white/60 text-[rgb(var(--color-text))] hover:text-white py-3 px-4 uppercase tracking-widest text-xs transition-colors duration-300"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
