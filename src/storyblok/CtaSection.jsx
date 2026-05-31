import { storyblokEditable } from '@storyblok/react';
import CTA from '../components/CTA';

const CtaSection = ({ blok }) => (
  <div {...(storyblokEditable(blok) || {})}>
    <CTA blok={blok} />
  </div>
);

export default CtaSection;
