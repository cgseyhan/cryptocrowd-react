import { storyblokEditable } from '@storyblok/react';
import MarqueePartners from '../components/MarqueePartners';

const PartnersSection = ({ blok }) => (
  <div {...(storyblokEditable(blok) || {})}>
    <MarqueePartners blok={blok} />
  </div>
);

export default PartnersSection;
