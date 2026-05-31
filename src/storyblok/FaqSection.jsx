import { storyblokEditable } from '@storyblok/react';
import FAQ from '../pages/FAQ';

const FaqSection = ({ blok }) => (
  <div {...(storyblokEditable(blok) || {})}>
    <FAQ blok={blok} />
  </div>
);

export default FaqSection;
