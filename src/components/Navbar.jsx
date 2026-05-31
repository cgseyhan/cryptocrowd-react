import React, { useCallback } from 'react';
import Logo from './Logo';
import { useLenisScroll } from '../context/LenisContext';

const FALLBACK_NAV_LINKS = [
  { label: 'Case Studies', id: 'case-studies' },
  { label: 'Services',     id: 'services'     },
  { label: 'The Team',     id: 'team'         },
  { label: 'Blog',         id: 'blog'         },
  { label: 'FAQ',          id: 'faq'          },
];

export default function Navbar({ blok }) {
  const NAV_LINKS = blok?.nav_links?.length
    ? blok.nav_links.map((l) => ({ label: l.label, id: l.id || l.anchor }))
    : FALLBACK_NAV_LINKS;
  const ctaUrl = blok?.cta_url || 'https://zcal.co/cryptocrowdtr/firstmeeting';
  const ctaText = blok?.cta_text || 'SCHEDULE MEETING';
  const lenis = useLenisScroll();

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.2, lock: true });
    } else {
      const target = document.getElementById(id);
      if (target) {
        const topPos = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
      }
    }
    window.history.pushState(null, '', `#${id}`);
  }, [lenis]);

  return (
    <nav className="sticky top-0 z-50 w-full brutalist-border-b bg-background/80 backdrop-blur-md gpu-layer">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3" aria-label="CryptoCrowd – back to top">
          <Logo className="text-2xl" />
        </a>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 font-body text-sm font-medium tracking-widest uppercase text-[color:var(--color-text)]">
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className="hover:text-accentBlue transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Schedule a meeting with CryptoCrowd"
          className="hidden md:flex px-6 py-2.5 bg-accentBlue text-background font-bold tracking-[0.1em] text-sm clip-chamfer transition-colors uppercase glow-button-blue hover:bg-blue-400 items-center justify-center"
        >
          {ctaText}
        </a>
      </div>
    </nav>
  );
}
