import React from 'react';
import linkedinIcon from '../assets/linkedin.svg';
import xIcon from '../assets/x.svg';
import Logo from './Logo';

const FALLBACK = {
  description: "CryptoCrowd is the Web3 industry's leading marketing consulting firm. Since 2020, CryptoCrowd has become the go-to agency for blockchain's most trusted brands.",
  twitter_url: '#',
  linkedin_url: '#',
  cta_url: 'https://zcal.co/cryptocrowdtr/firstmeeting',
};

export default function Footer({ blok }) {
  const data = { ...FALLBACK, ...blok };
  return (
    <footer className="w-full bg-background border-t border-white/10 z-10 relative">
      <div className="container mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-4">
        {/* Left Column - Brand & Socials (formerly Right) */}
        <div className="p-12 md:p-16 flex flex-col justify-start md:col-span-2 border-b md:border-b-0 md:brutalist-border-r">
          <div className="mb-8">
            <Logo className="text-3xl" />
          </div>
          <p className="font-mono text-[rgb(var(--color-text))] opacity-80 text-sm leading-relaxed mb-10 max-w-md">
            {data.description}
          </p>

          {/* Social Icons Area - Enlarged */}
          <div className="flex items-center gap-6 mt-auto">
            <a href={data.twitter_url} target="_blank" rel="noreferrer" className="hover:scale-110 hover:opacity-100 transition-all duration-300 opacity-80">
              <img src={xIcon} alt="X (Twitter)" className="w-8 h-8 invert dark:invert-0" />
            </a>
            <a href={data.linkedin_url} target="_blank" rel="noreferrer" className="hover:scale-110 hover:opacity-100 transition-all duration-300 opacity-80">
              <img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8 invert dark:invert-0" />
            </a>
          </div>
        </div>

        {/* Right Column - Navigation Links */}
        <div className="p-12 md:p-16 flex flex-col justify-start md:col-span-2">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 font-display font-bold text-xl uppercase tracking-widest text-white mt-auto md:mt-0">
            <a href="#case-studies" className="hover:text-accentBlue hover:translate-x-2 transition-all">Case Studies</a>
            <a href="#blog" className="hover:text-accentBlue hover:translate-x-2 transition-all">Blog</a>
            <a href="#services" className="hover:text-accentBlue hover:translate-x-2 transition-all">Services</a>
            <a href="#faq" className="hover:text-accentBlue hover:translate-x-2 transition-all">FAQ</a>
            <a href="#team" className="hover:text-accentBlue hover:translate-x-2 transition-all">The Team</a>
            <a
              href={data.cta_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accentBlue hover:translate-x-2 transition-all"
            >
              Book a Call ↗
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="w-full border-t border-white/10 p-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-white uppercase tracking-[0.2em]">
        <p>© {new Date().getFullYear()} CRYPTOCROWD WEB3 MARKETING AGENCY.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white">Privacy Policy</a>
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
}
