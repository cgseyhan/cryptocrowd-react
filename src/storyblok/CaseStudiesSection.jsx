import { storyblokEditable } from '@storyblok/react';
import CaseStudies from '../pages/CaseStudies';

const CaseStudiesSection = ({ blok }) => (
  <div {...(storyblokEditable(blok) || {})}>
    <CaseStudies blok={blok} />
  </div>
);

export default CaseStudiesSection;
