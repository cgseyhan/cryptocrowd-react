import { storyblokEditable } from '@storyblok/react';
import Services from '../pages/Services';

const ServicesSection = ({ blok }) => (
  <div {...(storyblokEditable(blok) || {})}>
    <Services blok={blok} />
  </div>
);

export default ServicesSection;
