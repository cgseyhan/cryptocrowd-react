import { storyblokEditable } from '@storyblok/react';
import Company from '../pages/Company';

const TeamSection = ({ blok }) => (
  <div {...(storyblokEditable(blok) || {})}>
    <Company blok={blok} />
  </div>
);

export default TeamSection;
