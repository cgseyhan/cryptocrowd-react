import React, { useState, useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { useStoryblok, storyblokEditable } from '@storyblok/react';
import { LenisProvider } from './context/LenisContext';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

// Sections
import Hero from './components/Hero';
import MarqueePartners from './components/MarqueePartners';
import CTA from './components/CTA';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Company from './pages/Company';
import FAQ from './pages/FAQ';
import CaseStudies from './pages/CaseStudies';

// Stable options object — avoids recreating on every render
const LENIS_OPTIONS = { lerp: 0.1, duration: 1.5, smoothWheel: true };

// Safe fetch removed, using native useStoryblok

/**
 * Find a specific section blok from the story body by component type.
 */
function findBlok(body, componentType) {
  if (!Array.isArray(body)) return null;
  return body.find((b) => b.component === componentType) || null;
}

/**
 * Wrapper that adds storyblokEditable for Visual Editor click-to-edit.
 */
function Editable({ blok, children }) {
  if (!blok) return children;
  try {
    return <div {...(storyblokEditable(blok) || {})}>{children}</div>;
  } catch {
    return children;
  }
}

export default function App() {
  // Fetch the "home" story from Storyblok (draft for Visual Editor)
  // This hook ensures the Visual Editor live-updates work properly
  const story = useStoryblok('home', { version: 'draft' });

  const body = story?.content?.body;
  const globalData = story?.content?.global_settings || null;

  const heroBlok = findBlok(body, 'hero_section');
  const partnersBlok = findBlok(body, 'partners_section');
  const caseStudiesBlok = findBlok(body, 'case_studies_section');
  const servicesBlok = findBlok(body, 'services_section');
  const teamBlok = findBlok(body, 'team_section');
  const blogBlok = findBlok(body, 'blog_section');
  const faqBlok = findBlok(body, 'faq_section');
  const ctaBlok = findBlok(body, 'cta_section');

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisProvider>
        <AnimatedBackground />
        <ThemeToggle />

        <div className="relative z-10 w-full min-h-screen container mx-auto">
          <div className="brutalist-container min-h-screen flex flex-col bg-background/50">
            <Navbar blok={globalData} />

            <main className="w-full flex-1 flex flex-col">
              <Editable blok={heroBlok}>
                <Hero blok={heroBlok} />
              </Editable>

              <Editable blok={partnersBlok}>
                <MarqueePartners blok={partnersBlok} />
              </Editable>

              <Editable blok={caseStudiesBlok}>
                <CaseStudies blok={caseStudiesBlok} />
              </Editable>

              <Editable blok={servicesBlok}>
                <Services blok={servicesBlok} />
              </Editable>

              <Editable blok={teamBlok}>
                <Company blok={teamBlok} />
              </Editable>

              <Editable blok={blogBlok}>
                <Blog blok={blogBlok} />
              </Editable>

              <Editable blok={faqBlok}>
                <FAQ blok={faqBlok} />
              </Editable>

              <Editable blok={ctaBlok}>
                <CTA blok={ctaBlok} />
              </Editable>
            </main>

            <Footer blok={globalData} />
          </div>
        </div>
      </LenisProvider>
    </ReactLenis>
  );
}
