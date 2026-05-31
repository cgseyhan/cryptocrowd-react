import { storyblokEditable } from '@storyblok/react';
import Hero from '../components/Hero';

const HeroSection = ({ blok }) => (
  <div {...(storyblokEditable(blok) || {})}>
    <Hero blok={blok} />
  </div>
);

export default HeroSection;
