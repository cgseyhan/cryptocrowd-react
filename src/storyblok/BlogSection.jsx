import { storyblokEditable } from '@storyblok/react';
import Blog from '../pages/Blog';

const BlogSection = ({ blok }) => (
  <div {...(storyblokEditable(blok) || {})}>
    <Blog blok={blok} />
  </div>
);

export default BlogSection;
